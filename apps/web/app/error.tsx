'use client';
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <div className="container-site py-16"><h1 className="text-3xl font-semibold">Something went wrong</h1><p className="my-5">We couldn’t load this page. Please try again.</p><button className="button" onClick={reset}>Try again</button></div>}
