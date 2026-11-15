import {test} from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
test('migration constraints and audit transaction on PostgreSQL',async()=>{
 assert.ok(process.env.DATABASE_URL,'Set DATABASE_URL to a dedicated migrated test database');
 const pool=new Pool({connectionString:process.env.DATABASE_URL}); const client=await pool.connect();
 const user=randomUUID(), program=randomUUID(), enrollment=randomUUID(), audit=randomUUID();
 try {
  await client.query('BEGIN');
  const leadId=randomUUID();
  const lead=await client.query('INSERT INTO leads (id,name,email,message) VALUES ($1,$2,$3,$4) RETURNING status',[leadId,'Test',`${leadId}@example.com`,'A test enquiry']);
  assert.equal(lead.rows[0].status,'NEW');
  await client.query("UPDATE leads SET status='CONTACTED' WHERE id=$1",[leadId]);
  assert.equal((await client.query('SELECT status FROM leads WHERE id=$1',[leadId])).rows[0].status,'CONTACTED');
  await client.query('INSERT INTO users (id,name,email,password_hash) VALUES ($1,$2,$3,$4)',[user,'Test',`${user}@example.com`,'not-a-login']);
  await client.query('INSERT INTO programs (id,title,description,area,published) VALUES ($1,$2,$3,$4,true)',[program,'Test program','A test description','ACADEMY']);
  await client.query('INSERT INTO enrollments (id,user_id,program_id) VALUES ($1,$2,$3)',[enrollment,user,program]);
  await client.query('INSERT INTO audit_events (id,actor_id,action,target) VALUES ($1,$2,$3,$4)',[audit,user,'enrollment.create',enrollment]);
  const lesson=randomUUID(),progress=randomUUID();
  await client.query('INSERT INTO lessons (id,program_id,title,content,position,published) VALUES ($1,$2,$3,$4,$5,true)',[lesson,program,'Lesson one','Useful lesson content',1]);
  await client.query('INSERT INTO lesson_progress (id,user_id,lesson_id) VALUES ($1,$2,$3)',[progress,user,lesson]);
  const completed=await client.query('SELECT completed_at FROM lesson_progress WHERE user_id=$1 AND lesson_id=$2',[user,lesson]); assert.ok(completed.rows[0].completed_at);
  await client.query('SAVEPOINT duplicate_progress');
  await assert.rejects(client.query('INSERT INTO lesson_progress (id,user_id,lesson_id) VALUES ($1,$2,$3)',[randomUUID(),user,lesson]),{code:'23505'});
  await client.query('ROLLBACK TO SAVEPOINT duplicate_progress');
  const r=await client.query('SELECT e.id,a.action FROM enrollments e JOIN audit_events a ON a.target=e.id WHERE e.id=$1',[enrollment]); assert.equal(r.rows[0].action,'enrollment.create');
  await assert.rejects(client.query('INSERT INTO enrollments (id,user_id,program_id) VALUES ($1,$2,$3)',[randomUUID(),user,program]),{code:'23505'});
 } finally {await client.query('ROLLBACK');client.release();await pool.end();}
});
