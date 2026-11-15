import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { eq, sql } from 'drizzle-orm';
import { db } from './db';
import { users, loginAttempts, auditEvents } from './schema';
export const authOptions: NextAuthOptions = {
 secret: process.env.NEXTAUTH_SECRET,
 session: { strategy:'jwt', maxAge: 60*60*8 },
 pages: {signIn:'/login'},
 providers: [CredentialsProvider({name:'Email', credentials:{email:{label:'Email',type:'email'},password:{label:'Password',type:'password'}}, async authorize(credentials) {
  const email = (credentials?.email || '').trim().toLowerCase().slice(0,254); const password=credentials?.password || '';
  if (!email || new TextEncoder().encode(password).length > 72) return null;
  const [attempt] = await db.select().from(loginAttempts).where(eq(loginAttempts.email,email));
  if (attempt?.lockedUntil && attempt.lockedUntil > new Date()) return null;
  const [user] = await db.select().from(users).where(eq(users.email,email));
  const ok = await compare(password, user?.passwordHash || '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxvFDoA5X2DgYqJ6sMT2gq7W3zi');
  if (!user || !ok) {
    await db.insert(loginAttempts).values({email,failures:1}).onConflictDoUpdate({target:loginAttempts.email,set:{failures:sql`case when ${loginAttempts.lockedUntil} < now() then 1 else ${loginAttempts.failures} + 1 end`,lockedUntil:sql`case when ${loginAttempts.lockedUntil} < now() then null when ${loginAttempts.failures} + 1 >= 5 then now() + interval '15 minutes' else null end`,updatedAt:new Date()}});
    return null;
  }
  await db.transaction(async tx=>{await tx.delete(loginAttempts).where(eq(loginAttempts.email,email)); await tx.insert(auditEvents).values({actorId:user.id,action:'auth.login',target:user.id});});
  return {id:user.id,name:user.name,email:user.email};
 }})],
 callbacks: { async session({session,token}) { if (session.user && token.sub) (session.user as typeof session.user & {id:string}).id=token.sub; return session; } }
};
export async function currentUser() { const session=await getServerSession(authOptions); const id=(session?.user as {id?:string}|undefined)?.id; if (!id) return null; const [user]=await db.select({id:users.id,name:users.name,email:users.email,role:users.role}).from(users).where(eq(users.id,id)); return user || null; }
