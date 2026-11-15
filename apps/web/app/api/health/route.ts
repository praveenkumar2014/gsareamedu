import { db } from '../../../lib/db';
import { sql } from 'drizzle-orm';
export async function GET() { try {await db.execute(sql`select 1`); return Response.json({status:'ok'});} catch {return Response.json({status:'unavailable'},{status:503});} }
