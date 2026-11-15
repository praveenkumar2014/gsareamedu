import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../../../../../lib/db';
import { currentUser } from '../../../../../../lib/auth';
import { lessons } from '../../../../../../lib/schema';
import { LessonForm } from '../../../../../../components/lesson-forms';
export const dynamic='force-dynamic';
export default async function EditLesson({params}:{params:Promise<{id:string;lessonId:string}>}) {
 const user=await currentUser(); if(!user) redirect('/login'); if(user.role!=='ADMIN') redirect('/portal');
 const {id,lessonId}=await params; if(!z.uuid().safeParse(id).success || !z.uuid().safeParse(lessonId).success) notFound();
 const [lesson]=await db.select().from(lessons).where(and(eq(lessons.id,lessonId),eq(lessons.programId,id))); if(!lesson) notFound();
 return <div className="container-site max-w-2xl py-16"><Link href={`/admin/programs/${id}`} className="text-sm font-semibold text-teal underline">← Back to program</Link><h1 className="mt-8 text-4xl font-semibold">Lesson management</h1><p className="mt-3 text-slate-600">Unpublishing hides this lesson from learners but keeps their recorded progress.</p><LessonForm programId={id} lesson={lesson}/></div>;
}
