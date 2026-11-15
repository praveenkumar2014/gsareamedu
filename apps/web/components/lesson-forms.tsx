'use client';
import { useActionState, useEffect, useState } from 'react';
import { saveLesson, completeLesson, type AdminActionState } from '../app/actions';
import { Submit } from './submit';
import { Notice } from '../../../packages/ui';
const initial:AdminActionState={status:'idle',message:''};
type Lesson={id:string;title:string;content:string;position:number;published:boolean};
export function LessonForm({programId,lesson}:{programId:string;lesson?:Lesson}) {
 const [state,action]=useActionState(saveLesson,initial);const isEditing=Boolean(lesson);
 const [title,setTitle]=useState(lesson?.title??''),[content,setContent]=useState(lesson?.content??''),[position,setPosition]=useState(String(lesson?.position??1)),[visibility,setVisibility]=useState(lesson?.published?'published':'draft');
 useEffect(()=>{setTitle(lesson?.title??'');setContent(lesson?.content??'');setPosition(String(lesson?.position??1));setVisibility(lesson?.published?'published':'draft');},[lesson?.id,lesson?.title,lesson?.content,lesson?.position,lesson?.published]);
 useEffect(()=>{if(state.status==='success' && !isEditing){setTitle('');setContent('');setPosition('1');setVisibility('draft');}},[state,isEditing]);
 return <form action={action} className="card mt-6 space-y-4"><h2 className="text-xl font-semibold">{lesson?'Edit lesson':'Add a lesson'}</h2>{state.status!=='idle' && <Notice kind={state.status==='success'?'success':'error'}>{state.message}</Notice>}{state.status==='success' && !isEditing && <button type="button" className="text-sm font-semibold text-teal underline" onClick={()=>window.location.reload()}>Refresh lesson list</button>}<input type="hidden" name="programId" value={programId}/>{lesson && <input type="hidden" name="lessonId" value={lesson.id}/>}<label className="label">Lesson title<input className="field" name="title" value={title} onChange={e=>setTitle(e.target.value)} required minLength={3} maxLength={120}/></label><label className="label">Lesson content <span className="font-normal text-slate-600">(plain text)</span><textarea className="field" name="content" value={content} onChange={e=>setContent(e.target.value)} required minLength={10} maxLength={10000} rows={8}/></label><label className="label">Lesson order<input className="field" name="position" type="number" min={1} max={10000} step={1} value={position} onChange={e=>setPosition(e.target.value)} required/></label><label className="label">Lesson visibility<select name="visibility" className="field" value={visibility} onChange={e=>setVisibility(e.target.value)}><option value="draft">Draft — hidden from learners</option><option value="published">Published — visible to enrolled learners</option></select></label><Submit>{lesson?'Save lesson changes':'Save lesson'}</Submit></form>;
}
export function CompleteLessonForm({lessonId}:{lessonId:string}) {
 const [state,action]=useActionState(completeLesson,initial);
 return <form action={action} className="mt-8 space-y-4"><input type="hidden" name="lessonId" value={lessonId}/>{state.status!=='idle' && <Notice kind={state.status==='success'?'success':'error'}>{state.message}</Notice>}{state.status!=='success' && <Submit>Mark complete</Submit>}</form>;
}
