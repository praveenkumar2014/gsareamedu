'use client';
import { useState, useEffect } from 'react';
import { areas, areaNames } from '../../../packages/contracts';
type ProgramFieldsProps = { title?:string; description?:string; area?:typeof areas[number]; published?:boolean };
export function ProgramFields({title='',description='',area='ACADEMY',published=false}:ProgramFieldsProps) {
 const [currentTitle,setTitle]=useState(title),[currentDescription,setDescription]=useState(description),[currentArea,setArea]=useState<string>(area),[visibility,setVisibility]=useState(published?'published':'draft');
 useEffect(()=>{setTitle(title);setDescription(description);setArea(area);setVisibility(published?'published':'draft');},[title,description,area,published]);
 return <><label className="label">Title<input className="field" name="title" value={currentTitle} onChange={e=>setTitle(e.target.value)} required minLength={3} maxLength={120}/></label><label className="label">Product area<select name="area" value={currentArea} onChange={e=>setArea(e.target.value)} className="field">{areas.map(a=><option value={a} key={a}>{areaNames[a]}</option>)}</select></label><label className="label">Description<textarea className="field" name="description" value={currentDescription} onChange={e=>setDescription(e.target.value)} required minLength={10} maxLength={2000} rows={4}/></label><label className="label">Visibility<select name="visibility" className="field" value={visibility} onChange={e=>setVisibility(e.target.value)}><option value="draft">Draft — not in the public catalogue</option><option value="published">Published — visible in the public catalogue</option></select></label></>;
}
