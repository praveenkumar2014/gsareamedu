'use client';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProgram, updateProgram, updateLeadStatus, type AdminActionState } from '../app/actions';
import { ProgramFields } from './program-fields';
import { Submit } from './submit';
import { Notice } from '../../../packages/ui';
import { areas, leadStatuses, leadStatusNames } from '../../../packages/contracts';
const initial:AdminActionState={status:'idle',message:''};
function useRefreshOnSuccess(state:AdminActionState) { const router=useRouter(); useEffect(()=>{if(state.status==='success') router.refresh();},[state,router]); }
function Feedback({state}:{state:AdminActionState}){return state.status==='idle'?null:<Notice kind={state.status==='success'?'success':'error'}>{state.message}</Notice>}
type Program = {id:string; title:string; description:string; area:typeof areas[number]; published:boolean};
export function ProgramForm({program}:{program?:Program}) {
 const [state,action]=useActionState(program?updateProgram:createProgram,initial); const [formKey,setFormKey]=useState(0); useRefreshOnSuccess(state);
 useEffect(()=>{if(!program && state.status==='success') setFormKey(key=>key+1);},[state,program]);
 return <form id={program?undefined:'new-program'} action={action} className="card space-y-4">{program ? <input type="hidden" name="id" value={program.id}/> : <><h2 className="text-xl font-semibold">Add a program</h2><p className="text-sm text-slate-600">Save a draft or publish when the details are ready.</p></>}<Feedback state={state}/><ProgramFields key={formKey} {...program}/><Submit>{program?'Save changes':'Save program'}</Submit></form>;
}
export function LeadStatusForm({id,name,status}:{id:string;name:string;status:typeof leadStatuses[number]}) {
 const [state,action]=useActionState(updateLeadStatus,initial); useRefreshOnSuccess(state);
 return <form action={action} className="mt-4 space-y-3"><input type="hidden" name="id" value={id}/><Feedback state={state}/><label className="label">Status for {name}<select name="status" className="field" defaultValue={status}>{leadStatuses.map(s=><option key={s} value={s}>{leadStatusNames[s]}</option>)}</select></label><Submit>Save enquiry status</Submit></form>;
}
