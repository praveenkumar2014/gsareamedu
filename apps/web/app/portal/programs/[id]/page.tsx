import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { and, asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../../../lib/db';
import { currentUser } from '../../../../lib/auth';
import { enrollments, programs, lessons, lessonProgress } from '../../../../lib/schema';
import { Notice } from '../../../../../../packages/ui';
export const dynamic='force-dynamic';
export default async function LearnerProgram({params}:{params:Promise<{id:string}>}) {
 const user=await currentUser(); if(!user) redirect('/login'); if(user.role!=='LEARNER') notFound(); const {id}=await params;if(!z.uuid().safeParse(id).success) notFound();
 const [program]=await db.select({id:programs.id,title:programs.title}).from(enrollments).innerJoin(programs,eq(enrollments.programId,programs.id)).where(and(eq(enrollments.userId,user.id),eq(programs.id,id)));if(!program) notFound();
 const items=await db.select({id:lessons.id,title:lessons.title,position:lessons.position,completedAt:lessonProgress.completedAt}).from(lessons).leftJoin(lessonProgress,and(eq(lessonProgress.lessonId,lessons.id),eq(lessonProgress.userId,user.id))).where(and(eq(lessons.programId,id),eq(lessons.published,true))).orderBy(asc(lessons.position),asc(lessons.createdAt),asc(lessons.id));
 return <div className="container-site max-w-3xl py-16"><Link href="/portal" className="text-sm font-semibold text-teal underline">← My learning</Link><p className="eyebrow mt-8">Your program</p><h1 className="mt-3 text-4xl font-semibold">{program.title}</h1><h2 className="mt-10 text-2xl font-semibold">Lessons</h2>{items.length===0?<div className="mt-5"><Notice>No published lessons yet. Please check back later.</Notice></div>:<ol className="mt-5 space-y-3">{items.map(item=><li key={item.id} className="card flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-semibold">{item.position}. {item.title}</h3><p className="mt-1 text-sm text-slate-600">{item.completedAt?'Completed':'Not completed'}</p></div><Link prefetch={false} href={`/portal/lessons/${item.id}`} className="text-sm font-semibold text-teal underline" aria-label={`Open lesson ${item.title}`}>Open lesson</Link></li>)}</ol>}</div>;
}
