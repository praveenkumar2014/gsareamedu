import { redirect } from 'next/navigation';
import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db } from '../../lib/db';
import { currentUser } from '../../lib/auth';
import { leads, programs, auditEvents } from '../../lib/schema';
import { areaNames } from '../../../../packages/contracts';
import { ProgramForm, LeadStatusForm } from '../../components/admin-forms';
export const dynamic='force-dynamic';
export default async function Admin() {
 const user=await currentUser(); if(!user) redirect('/login'); if(user.role!=='ADMIN') redirect('/portal');
 const [allLeads,allPrograms,events]=await Promise.all([db.select().from(leads).orderBy(desc(leads.createdAt)).limit(50),db.select().from(programs).orderBy(desc(programs.createdAt)).limit(50),db.select().from(auditEvents).orderBy(desc(auditEvents.createdAt)).limit(50)]);
 return <div className="container-site py-16"><p className="eyebrow">Operations</p><h1 className="mt-3 text-4xl font-semibold">Admin overview</h1><p className="mt-3 text-slate-600">Manage programs and review recent enquiries and activity. Lists show the latest 50 records.</p>

 <div className="mt-8 grid items-start gap-8 lg:grid-cols-2"><ProgramForm/>
 <section className="card"><h2 className="text-xl font-semibold">Recent programs</h2>{allPrograms.length===0?<p className="mt-4 text-slate-600">No programs yet.</p>:<ul className="mt-4 divide-y divide-slate-100">{allPrograms.map(p=><li key={p.id} className="flex items-center justify-between gap-4 py-3"><div><strong>{p.title}</strong><span className="block text-sm text-slate-600">{areaNames[p.area]} · {p.published?'Published':'Draft'}</span></div><Link prefetch={false} className="text-sm font-semibold text-teal underline" href={`/admin/programs/${p.id}`} aria-label={`Edit ${p.title}`}>Edit</Link></li>)}</ul>}</section>
 <section id="enquiries" className="card"><h2 className="text-xl font-semibold">Recent enquiries</h2>{allLeads.length===0?<p className="mt-4 text-slate-600">No enquiries yet.</p>:<ul className="mt-4 divide-y divide-slate-100">{allLeads.map(l=><li key={l.id} className="py-4"><strong>{l.name}</strong> <span className="break-all text-sm text-slate-600">{l.email}</span><p className="mt-1 whitespace-pre-wrap text-sm">{l.message}</p><LeadStatusForm id={l.id} name={l.name} status={l.status}/></li>)}</ul>}</section>
 <section className="card"><h2 className="text-xl font-semibold">Recent audit events</h2>{events.length===0?<p className="mt-4 text-slate-600">No activity yet.</p>:<ul className="mt-4 divide-y divide-slate-100">{events.map(e=><li key={e.id} className="py-3 text-sm"><strong>{e.action}</strong><span className="block break-all text-slate-600">{e.createdAt.toISOString()} · {e.target}</span></li>)}</ul>}</section></div></div>;
}
