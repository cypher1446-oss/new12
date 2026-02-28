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

async function testPidAsUid() {
    console.log('--- Verifying PID-as-UID Feature ---');

    // 1. Setup Test Client & Project with force_pid_as_uid: true
    let { data: client } = await supabase.from('clients').select('id').eq('name', 'PID-as-UID Client').single();
    if (!client) {
        const { data: newClient } = await supabase.from('clients').insert([{ name: 'PID-as-UID Client' }]).select().single();
        client = newClient;
    }

    const projectCode = 'PUID_' + Math.floor(Math.random() * 10000);
    const { data: project } = await supabase.from('projects').insert([{
        client_id: client.id,
        project_name: 'PID-as-UID Project',
        project_code: projectCode,
        pid_prefix: 'AUTO',
        pid_counter: 1,
        pid_padding: 2,
        force_pid_as_uid: true, // THE CORE FEATURE TOGGLE
        base_url: 'https://client-survey.com/start?pid=[PID]&uid=[UID]',
        status: 'active'
    }]).select().single();

    console.log('Project Created:', project.project_code, '(Force PID as UID: ENABLED)');

    // 2. Simulate Hit with a RANDOM UID
    const randomUid = 'random-user-' + Math.random().toString(36).substring(7);
    const trackUrl = `${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/track?pid=${project.project_code}&uid=${randomUid}`;

    console.log(`Simulating hit with random uid: ${randomUid}...`);
    const trackResp = await fetch(trackUrl, { redirect: 'manual' });
    const redirectUrl = trackResp.headers.get('location');
    console.log('\nFinal Redirect URL:', redirectUrl);

    // 3. Verify the UID in the redirect URL
    const urlObj = new URL(redirectUrl);
    const sentPid = urlObj.searchParams.get('pid');
    const sentUid = urlObj.searchParams.get('uid');

    console.log('  PID in URL:', sentPid);
    console.log('  UID in URL:', sentUid);

    if (sentUid === 'AUTO01' && sentUid !== randomUid) {
        console.log('\n✅ SUCCESS: The random UID was IGNORED and the generated PID (AUTO01) was forced as the client UID!');
    } else {
        console.log('\n❌ FAILURE: The UID was not correctly replaced by the generated PID.');
    }

    // Double check DB persistence of the toggle
    const { data: fetchedProject } = await supabase.from('projects').select('force_pid_as_uid').eq('id', project.id).single();
    if (fetchedProject.force_pid_as_uid === true) {
        console.log('✅ DB Check: force_pid_as_uid correctly saved as TRUE.');
    } else {
        console.log('❌ DB Check: force_pid_as_uid was NOT saved correctly.');
    }
}

testPidAsUid();
