'use client';
import { useFormStatus } from 'react-dom';
export function Submit({children}:{children:string}) {const {pending}=useFormStatus(); return <button className="button" disabled={pending} type="submit">{pending?'Please wait…':children}</button>;}
