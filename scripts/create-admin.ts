import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { hash } from 'bcryptjs';
import { users, auditEvents } from '../apps/web/lib/schema';
import { registrationSchema } from '../packages/contracts';
async function main() {
 const parsed=registrationSchema.safeParse({name:process.env.ADMIN_NAME,email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD});
 if(!process.env.DATABASE_URL || !parsed.success) throw new Error('Set DATABASE_URL, ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (12–72 characters).');
 const pool=new Pool({connectionString:process.env.DATABASE_URL}); const db=drizzle(pool);
 try { const passwordHash=await hash(parsed.data.password,12); await db.transaction(async tx=>{const [user]=await tx.insert(users).values({...parsed.data,passwordHash,role:'ADMIN'}).returning(); await tx.insert(auditEvents).values({actorId:user.id,action:'admin.bootstrap',target:user.id});}); console.log('Administrator created.'); } finally {await pool.end();}
}
main().catch(()=>{console.error('Unable to create administrator. Check configuration and whether the email already exists.');process.exitCode=1;});
