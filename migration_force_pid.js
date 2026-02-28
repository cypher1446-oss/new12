const { Client } = require('pg');

async function migrate() {
    const client = new Client({
        connectionString: 'postgresql://postgres.czzbduzmwzoumgzfryou:WnL4TDs1sSTFAJs7@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        console.log('Connected to database');

        const query = `
      -- Add force_pid_as_uid to projects
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS force_pid_as_uid BOOLEAN DEFAULT FALSE;
    `;

        await client.query(query);
        console.log('Migration successful: force_pid_as_uid column added.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
