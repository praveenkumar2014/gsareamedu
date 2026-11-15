'use client';
import { signOut } from 'next-auth/react';
export function Logout(){return <button className="text-sm font-semibold hover:underline" onClick={()=>signOut({callbackUrl:'/'})}>Sign out</button>}
