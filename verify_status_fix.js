const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
        env[key.trim()] = value.join('=').trim();
    }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function testFix() {
    console.log('--- Verifying Status Update Fix ---');

    // 1. Setup Test Client & Project if needed
    let { data: client } = await supabase.from('clients').select('id').eq('name', 'Status Fix Client').single();
    if (!client) {
        const { data: newClient } = await supabase.from('clients').insert([{ name: 'Status Fix Client' }]).select().single();
        client = newClient;
    }

    const projectCode = 'FIX_' + Math.floor(Math.random() * 10000);
    const { data: project } = await supabase.from('projects').insert([{
        client_id: client.id,
        project_name: 'Status Fix Project',
        project_code: projectCode,
        pid_prefix: 'STFIX',
        pid_counter: 1,
        pid_padding: 2,
        base_url: 'https://example.com/survey?pid=[PID]&uid=[UID]',
        status: 'active'
    }]).select().single();

    console.log('Project Created:', project.project_code);

    // 2. Simulate Hit (Start tracking)
    const trackUrl = `${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/track?pid=${project.project_code}&uid=fixuser123`;
    console.log('Simulating tracking hit...');
    const trackResp = await fetch(trackUrl, { redirect: 'manual' });
    const redirectUrl = trackResp.headers.get('location');
    console.log('Track Redirect:', redirectUrl);

    // Extract the generated PID from the redirect URL
    const generatedPid = new URL(redirectUrl).searchParams.get('pid');
    const oiSession = new URL(redirectUrl).searchParams.get('oi_session');
    console.log('Generated PID:', generatedPid);
    console.log('OI Session:', oiSession);

    // 3. Simulate Callback using the Generated PID
    // This mimics a vendor redirecting back using the PID they were sent
    const completeUrl = `${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/complete?pid=${generatedPid}&uid=fixuser123&oi_session=${oiSession}`;
    console.log('\nSimulating completion with Generated PID...');
    const compResp = await fetch(completeUrl);
    console.log('Complete Hit Status:', compResp.status);

    // 4. Verify DB status
    const { data: response } = await supabase
        .from('responses')
        .select('status, project_code, client_pid')
        .eq('oi_session', oiSession)
        .single();

    console.log('\nResponse in DB:');
    console.log('  Status:', response.status);
    console.log('  Internal Code:', response.project_code);
    console.log('  Client PID:', response.client_pid);

    if (response.status === 'complete') {
        console.log('\n✅ FIX VERIFIED: Status updated to "complete" using Client PID lookup!');
    } else {
        console.log('\n❌ FIX FAILED: Status is still', response.status);
    }
}

testFix();
