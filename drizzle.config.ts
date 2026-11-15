import { defineConfig } from 'drizzle-kit';
export default defineConfig({ dialect:'postgresql', schema:'./apps/web/lib/schema.ts', out:'./drizzle', dbCredentials: { url: process.env.DATABASE_URL || 'postgresql://localhost/guidesoft' } });
