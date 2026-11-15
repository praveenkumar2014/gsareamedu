import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { eq, asc } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../../../lib/db';
import { currentUser } from '../../../../lib/auth';
import { programs, lessons } from '../../../../lib/schema';
import { ProgramForm } from '../../../../components/admin-forms';
import { LessonForm } from '../../../../components/lesson-forms';
export const dynamic='force-dynamic';
export default async function EditProgram({params}:{params:Promise<{id:string}>}) {
 const user=await currentUser(); if(!user) redirect('/login'); if(user.role!=='ADMIN') redirect('/portal');
 const {id}=await params; if(!z.uuid().safeParse(id).success) notFound(); const [program]=await db.select().from(programs).where(eq(programs.id,id)); if(!program) notFound(); const items=await db.select({id:lessons.id,title:lessons.title,position:lessons.position,published:lessons.published}).from(lessons).where(eq(lessons.programId,id)).orderBy(asc(lessons.position),asc(lessons.createdAt),asc(lessons.id));
 return <div className="container-site max-w-2xl py-16"><Link className="text-sm font-semibold text-teal underline" href="/admin">← Admin overview</Link><p className="eyebrow mt-8">Program management</p><h1 className="mt-3 text-4xl font-semibold">Edit program</h1><p className="mt-3 text-slate-600">Unpublishing removes the program from the public catalogue; existing enrolments remain in learners’ portals.</p><div className="mt-8"><ProgramForm program={program}/></div><section className="mt-12"><h2 className="text-2xl font-semibold">Lessons</h2><p className="mt-2 text-sm text-slate-600">Only published lessons are visible to enrolled learners. Content is plain text.</p>{items.length===0?<p className="mt-4 text-slate-600">No lessons yet.</p>:<ul className="mt-4 space-y-3">{items.map(item=><li key={item.id} className="card flex items-center justify-between gap-3"><div><strong>{item.position}. {item.title}</strong><span className="block text-sm text-slate-600">{item.published?'Published':'Draft'}</span></div><Link prefetch={false} className="text-sm font-semibold text-teal underline" href={`/admin/programs/${program.id}/lessons/${item.id}`} aria-label={`Edit lesson ${item.title}`}>Edit</Link></li>)}</ul>}<LessonForm programId={program.id}/></section></div>;
}
