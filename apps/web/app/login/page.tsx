import Link from 'next/link';
import { LoginForm } from '../../components/login-form';
import { Notice } from '../../../../packages/ui';
export default async function Login({searchParams}:{searchParams:Promise<{status?:string}>}) {const {status}=await searchParams; return <div className="container-site max-w-xl py-16"><p className="eyebrow">Welcome back</p><h1 className="mt-3 text-4xl font-semibold">Sign in</h1><p className="mt-3 text-slate-600">New here? <Link href="/register" className="text-teal underline">Create a learner account</Link>.</p>{status==='registered' && <div className="mt-6"><Notice kind="success">Account created. Sign in to continue.</Notice></div>}<LoginForm/></div>}
