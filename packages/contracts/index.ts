import { z } from 'zod';
export const areas = ['ACADEMY','AI_SCHOOL','CAREER','LABS','ENTERPRISE','MARKETPLACE','CERTIFICATION'] as const;
export const areaNames: Record<(typeof areas)[number], string> = { ACADEMY:'Academy', AI_SCHOOL:'AI School', CAREER:'Career', LABS:'Labs', ENTERPRISE:'Enterprise', MARKETPLACE:'Marketplace', CERTIFICATION:'Certification' };
const email = z.string().trim().email().max(254).transform(s => s.toLowerCase());
export const registrationSchema = z.object({name:z.string().trim().min(2).max(100), email, password:z.string().min(12).max(72).refine(s => new TextEncoder().encode(s).length <= 72, 'Password must be at most 72 UTF-8 bytes')});
export const leadSchema = z.object({name:z.string().trim().min(2).max(100), email, message:z.string().trim().min(10).max(2000)});
export const programSchema = z.object({title:z.string().trim().min(3).max(120), description:z.string().trim().min(10).max(2000), area:z.enum(areas)});

export const programFormSchema = programSchema.extend({visibility:z.enum(['draft','published'])});
export const leadStatuses = ['NEW','CONTACTED','CLOSED'] as const;
export const leadStatusSchema = z.enum(leadStatuses);
export const leadStatusNames: Record<(typeof leadStatuses)[number],string> = { NEW:'New', CONTACTED:'Contacted', CLOSED:'Closed' };
export const lessonFormSchema = z.object({title:z.string().trim().min(3).max(120),content:z.string().trim().min(10).max(10000),position:z.coerce.number().int().min(1).max(10000),visibility:z.enum(['draft','published'])});
