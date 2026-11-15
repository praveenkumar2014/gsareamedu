import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
async function main() { if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required'); const pool = new Pool({connectionString:process.env.DATABASE_URL}); try { await migrate(drizzle(pool), { migrationsFolder:'./drizzle' }); } finally { await pool.end(); } }
main().catch(e => { console.error(e); process.exitCode=1; });
