import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
const globalDb = globalThis as unknown as { pool?: Pool };
const pool = globalDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== 'production') globalDb.pool = pool;
export const db = drizzle(pool);
