import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../../../lib/db';
import { currentUser } from '../../../../lib/auth';
import { enrollments, lessons, lessonProgress } from '../../../../lib/schema';
import { CompleteLessonForm } from '../../../../components/lesson-forms';
import { Notice } from '../../../../../../packages/ui';
export const dynamic='force-dynamic';
export default async function LearnerLesson({params}:{params:Promise<{id:string}>}) {
 const user=await currentUser(); if(!user) redirect('/login'); if(user.role!=='LEARNER') notFound();const {id}=await params;if(!z.uuid().safeParse(id).success) notFound();
 const [lesson]=await db.select({id:lessons.id,programId:lessons.programId,title:lessons.title,content:lessons.content,completedAt:lessonProgress.completedAt}).from(lessons).innerJoin(enrollments,and(eq(enrollments.programId,lessons.programId),eq(enrollments.userId,user.id))).leftJoin(lessonProgress,and(eq(lessonProgress.lessonId,lessons.id),eq(lessonProgress.userId,user.id))).where(and(eq(lessons.id,id),eq(lessons.published,true)));if(!lesson) notFound();
 return <div className="container-site max-w-3xl py-16"><Link href={`/portal/programs/${lesson.programId}`} className="text-sm font-semibold text-teal underline">← Back to lessons</Link><p className="eyebrow mt-8">Lesson</p><h1 className="mt-3 text-4xl font-semibold">{lesson.title}</h1><article className="card mt-8"><p className="whitespace-pre-wrap break-words leading-8 text-slate-700">{lesson.content}</p></article><div className="mt-6">{lesson.completedAt?<Notice kind="success">You marked this lesson complete.</Notice>:<CompleteLessonForm lessonId={lesson.id}/>}</div></div>;
}
