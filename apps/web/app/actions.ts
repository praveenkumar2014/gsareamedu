'use server';
import { redirect } from 'next/navigation';
import { eq, and } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { db } from '../lib/db';
import { users, programs, leads, enrollments, auditEvents, lessons, lessonProgress } from '../lib/schema';
import { currentUser } from '../lib/auth';
import { registrationSchema, leadSchema, programFormSchema, leadStatusSchema, lessonFormSchema } from '../../../packages/contracts';
const fields=(form:FormData) => Object.fromEntries(form.entries());
const idSchema = z.uuid();
async function requireAdmin() {
 const user=await currentUser();
 if (!user) redirect('/login');
 if (user.role!=='ADMIN') redirect('/portal');
 return user;
}
export async function register(form:FormData) {
 const parsed=registrationSchema.safeParse(fields(form)); if(!parsed.success) redirect('/register?status=invalid');
 try {const passwordHash=await hash(parsed.data.password,12); await db.transaction(async tx=>{const [user]=await tx.insert(users).values({name:parsed.data.name,email:parsed.data.email,passwordHash}).returning(); await tx.insert(auditEvents).values({actorId:user.id,action:'user.register',target:user.id});});} catch {redirect('/register?status=error');}
 redirect('/login?status=registered');
}
export async function submitLead(form:FormData) {
 const parsed=leadSchema.safeParse(fields(form)); if(!parsed.success) redirect('/?status=invalid#contact');
 try {await db.transaction(async tx=>{const [lead]=await tx.insert(leads).values(parsed.data).returning(); await tx.insert(auditEvents).values({action:'lead.create',target:lead.id});});} catch {redirect('/?status=error#contact');}
 redirect('/?status=sent#contact');
}
export type AdminActionState = { status:'idle'|'success'|'error'; message:string };
export async function createProgram(_previous:AdminActionState, form:FormData):Promise<AdminActionState> {
 const user=await requireAdmin();
 const parsed=programFormSchema.safeParse(fields(form)); if(!parsed.success) return {status:'error',message:'Check the submitted details and try again.'};
 const {visibility,...data}=parsed.data; const published=visibility==='published';
 try {await db.transaction(async tx=>{const [program]=await tx.insert(programs).values({...data,published}).returning(); await tx.insert(auditEvents).values({actorId:user.id,action:published?'program.publish':'program.create_draft',target:program.id});});} catch {return {status:'error',message:'The program could not be saved. Please try again.'};}
 return {status:'success',message:published?'Program published.':'Draft saved. It is not visible in the public catalogue.'};
}
export async function updateProgram(_previous:AdminActionState, form:FormData):Promise<AdminActionState> {
 const user=await requireAdmin(); const id=idSchema.safeParse(form.get('id')); if(!id.success) return {status:'error',message:'Invalid program.'};
 const parsed=programFormSchema.safeParse(fields(form)); if(!parsed.success) return {status:'error',message:'Check the submitted details and try again.'};
 const {visibility,...data}=parsed.data; const published=visibility==='published'; let found=false;
 try {await db.transaction(async tx=>{const [previous]=await tx.select().from(programs).where(eq(programs.id,id.data)).for('update'); if(!previous) return; found=true; await tx.update(programs).set({...data,published}).where(eq(programs.id,id.data)); const action=previous.published!==published?(published?'program.publish':'program.unpublish'):'program.update'; await tx.insert(auditEvents).values({actorId:user.id,action,target:id.data});});} catch {return {status:'error',message:'The changes could not be saved. Please try again.'};}
 if(!found) return {status:'error',message:'The program was not found.'}; return {status:'success',message:'Program changes saved.'};
}
export async function updateLeadStatus(_previous:AdminActionState, form:FormData):Promise<AdminActionState> {
 const user=await requireAdmin(); const id=idSchema.safeParse(form.get('id')); const status=leadStatusSchema.safeParse(form.get('status'));
 if(!id.success || !status.success) return {status:'error',message:'Invalid enquiry or status.'}; let found=false;
 try {await db.transaction(async tx=>{const [previous]=await tx.select().from(leads).where(eq(leads.id,id.data)).for('update'); if(!previous) return; found=true; if(previous.status!==status.data) {await tx.update(leads).set({status:status.data}).where(eq(leads.id,id.data)); await tx.insert(auditEvents).values({actorId:user.id,action:`lead.status.${status.data}`,target:id.data});}});} catch {return {status:'error',message:'The enquiry could not be saved. Please try again.'};}
 if(!found) return {status:'error',message:'The enquiry was not found.'}; return {status:'success',message:'Enquiry status saved.'};
}
export async function saveLesson(_previous:AdminActionState, form:FormData):Promise<AdminActionState> {
 const user=await requireAdmin(); const programId=idSchema.safeParse(form.get('programId')); const rawId=form.get('lessonId');
 const lessonId=rawId ? idSchema.safeParse(rawId) : null;
 if(!programId.success || (lessonId && !lessonId.success)) return {status:'error',message:'Invalid program or lesson.'};
 const parsed=lessonFormSchema.safeParse(fields(form)); if(!parsed.success) return {status:'error',message:'Check the lesson details and try again.'};
 const {visibility,...data}=parsed.data; const published=visibility==='published'; let found=false;
 try {await db.transaction(async tx=>{
  const [program]=await tx.select({id:programs.id}).from(programs).where(eq(programs.id,programId.data)).for('update'); if(!program) return;
  if(lessonId?.success) {
   const [previous]=await tx.select().from(lessons).where(and(eq(lessons.id,lessonId.data),eq(lessons.programId,program.id))).for('update'); if(!previous) return;
   found=true; await tx.update(lessons).set({...data,published}).where(eq(lessons.id,previous.id));
   const action=previous.published!==published?(published?'lesson.publish':'lesson.unpublish'):'lesson.update';
   await tx.insert(auditEvents).values({actorId:user.id,action,target:previous.id});
  } else {
   found=true; const [lesson]=await tx.insert(lessons).values({...data,programId:program.id,published}).returning();
   await tx.insert(auditEvents).values({actorId:user.id,action:published?'lesson.publish':'lesson.create_draft',target:lesson.id});
  }
 });} catch {return {status:'error',message:'The lesson could not be saved. Please try again.'};}
 if(!found) return {status:'error',message:'The program or lesson was not found.'};
 return {status:'success',message:lessonId?'Lesson changes saved.':published?'Lesson published.':'Lesson draft saved.'};
}
export async function completeLesson(_previous:AdminActionState, form:FormData):Promise<AdminActionState> {
 const user=await currentUser(); if(!user) redirect('/login');
 if(user.role!=='LEARNER') return {status:'error',message:'Only enrolled learners can complete lessons.'};
 const lessonId=idSchema.safeParse(form.get('lessonId')); if(!lessonId.success) return {status:'error',message:'Invalid lesson.'};
 let result:'unavailable'|'completed'|'exists'='unavailable';
 try {await db.transaction(async tx=>{
  const [lesson]=await tx.select().from(lessons).where(and(eq(lessons.id,lessonId.data),eq(lessons.published,true))).for('update'); if(!lesson) return;
  const [enrollment]=await tx.select({id:enrollments.id}).from(enrollments).where(and(eq(enrollments.userId,user.id),eq(enrollments.programId,lesson.programId))); if(!enrollment) return;
  const [row]=await tx.insert(lessonProgress).values({userId:user.id,lessonId:lesson.id}).onConflictDoNothing().returning();
  if(!row) {result='exists';return;} await tx.insert(auditEvents).values({actorId:user.id,action:'lesson.complete',target:lesson.id}); result='completed';
 });} catch {return {status:'error',message:'Progress could not be saved. Please try again.'};}
 if(result==='unavailable') return {status:'error',message:'This lesson is unavailable.'};
 return {status:'success',message:result==='exists'?'This lesson is already marked complete.':'Lesson marked complete.'};
}
export async function enroll(form:FormData) {
 const user=await currentUser(); if(!user) redirect('/login'); if(user.role!=='LEARNER') redirect('/programs?status=role');
 const id=idSchema.safeParse(form.get('programId')); if(!id.success) redirect('/programs?status=invalid');
 let result='enrolled';
 try {await db.transaction(async tx=>{const [p]=await tx.select().from(programs).where(and(eq(programs.id,id.data),eq(programs.published,true))).for('update'); if(!p) {result='unavailable';return;} const [row]=await tx.insert(enrollments).values({userId:user.id,programId:id.data}).onConflictDoNothing().returning(); if(!row){result='exists';return;} await tx.insert(auditEvents).values({actorId:user.id,action:'enrollment.create',target:row.id});});} catch {redirect('/programs?status=error');}
 if(result==='enrolled' || result==='exists') redirect(`/portal?status=${result}`); redirect('/programs?status=unavailable');
}
