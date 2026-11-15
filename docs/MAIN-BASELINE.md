# Previous main-branch foundation (historical)

This is the pre-merge main-branch README, retained for context. It describes the earlier public-only scaffold and its deployment instructions have not been verified for the current monorepo. See the root README and MASTER-CHECKLIST.md for current status and launch blockers.

# GUIDESOFT Education & AI

**GUIDESOFT IT SOLUTIONS & SERVICES** · Learn. Build. Advance.

This repository contains the product handover and an initial responsive public application foundation.

## Product areas
- GUIDESOFT Academy — professional programs
- GUIDESOFT AI School — AI, data and automation
- GUIDESOFT Career — career development
- GUIDESOFT Labs — practical projects
- GUIDESOFT Enterprise — workforce learning
- GUIDESOFT Marketplace — future instructor-led content marketplace
- GUIDESOFT Certification — assessments and credentials

## Stack
Next.js 15, React 19, TypeScript and a custom responsive CSS design system. The initial release deliberately keeps the stack lean.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. Production build: `npm run build`.

## Deploy
Connect this repository to Vercel (root directory `.`, framework Next.js, build `npm run build`, install `npm install`) or deploy via Coolify using the included Dockerfile. Configure secrets only in your hosting provider; never commit `.env`.

## Current release scope
The working baseline is a public marketing/catalogue landing page. Learner accounts, LMS authoring/delivery, dashboards, assessments, payments, certificates, AI tutor, enterprise tenancy and database persistence are not yet implemented. Do not represent these as live services until their workflows, permissions, provider integrations and tests are complete.

## Product and engineering handover
See `docs/IMPLEMENTATION_STATUS.md` and `docs/PRODUCT_HANDOVER.md`. The original requirements and phased vision remain in project history and docs.
