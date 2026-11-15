# gsareamedu
GUIDESOFT IT SOLUTIONS INNOVATIONS
GUIDESOFT Education & AI
Product and engineering handover
Document status: Build-ready baseline / Phase 0
Product owner: GUIDESOFT
Deployment targets: Local development and Ubuntu VPS with Coolify
Architecture principle: Modular monolith first; extract services only when scale justifies it
Reference: User-supplied Scaler company case study, used for business-model inspiration only.
1. Product vision
GUIDESOFT Education & AI is an industry-oriented learning, skills, career and enterprise training platform. It connects learners, instructors, mentors, employers and business administrators in one measurable ecosystem.

The platform must help a learner discover a skill, enrol in a program, learn through structured content and live sessions, complete practical work, demonstrate competency, receive career support and continue learning. It must also allow GUIDESOFT to operate the business: lead management, admissions, payments, academic delivery, support, reporting and partner relationships.

This is a new GUIDESOFT product. Do not copy Scaler source code, private systems, protected content, brand assets, course materials or proprietary workflows. Use publicly observable business patterns as inspiration and independently design the implementation.
2. Product family
Product area	Purpose	Primary users
GUIDESOFT Academy	Structured professional programs	Learners, instructors
GUIDESOFT AI School	AI, data, automation and agent skills	Learners, mentors
GUIDESOFT Career	Career preparation, jobs and internships	Learners, employers
GUIDESOFT Labs	Practical projects, portfolios and challenges	Learners, mentors
GUIDESOFT Enterprise	Corporate learning and workforce development	Companies, admins
GUIDESOFT Marketplace	Instructor-led courses and learning resources	Creators, learners
GUIDESOFT Certification	Assessments and verifiable credentials	Learners, employers


Treat these as product areas within one platform and one identity system, not seven separately deployed apps at launch.
3. Build principles
1. Audit the repository, machine and target VPS before changing anything.
2. Preserve unrelated files and services. Never run destructive cleanup.
3. Build a working vertical slice before adding every module.
4. Prefer open-source components and self-hostable infrastructure.
5. Keep secrets out of source control and logs.
6. Use GUIDESOFT naming, logo and visual identity supplied by the owner.
7. No fake integrations, placeholder success states or invented business metrics.
8. All user-facing flows must have loading, empty, error and success states.
9. All critical operations must be auditable.
10. Do not promise job placement, salary outcomes or guaranteed results unless supported by a real, approved policy and evidence.
4. Recommended stack
Use the simplest maintainable stack and confirm versions at implementation time.
- Web application: Next.js + TypeScript
- UI: Tailwind CSS + accessible component primitives
- Backend: Next.js server-side modules initially; separate FastAPI service only where Python/AI workloads justify it
- Database: PostgreSQL
- ORM and migrations: Prisma or Drizzle; select one and use consistently
- Authentication: Auth.js or another actively maintained self-hostable-compatible solution; document provider and session decisions
- Background work: PostgreSQL-backed queue initially; Redis only where needed
- File/object storage: S3-compatible storage such as MinIO
- Video: external provider integration behind an adapter; do not assume self-hosted video is inexpensive
- Search: PostgreSQL full-text search first; add dedicated search only after measurement
- Observability: structured logs, health checks, metrics and error reporting
- Deployment: Docker, Docker Compose for local, Coolify-compatible deployment for VPS
- Testing: unit, integration, end-to-end and accessibility checks
Do not add Kubernetes, microservices, Kafka, vector databases or multiple model-serving stacks to the MVP without a measured requirement.
5. Repository structure
guidesoft-education-ai/
├── apps/
│   └── web/                    # Learner, instructor, employer and admin UI
├── packages/
│   ├── ui/                     # Shared design system
│   ├── config/                 # Shared lint, TypeScript and app config
│   └── contracts/              # Shared schemas and API contracts
├── services/
│   └── ai-worker/              # Optional isolated AI/background worker
├── prisma/                     # Or selected ORM schema and migrations
├── docs/
│   ├── PRD.md
│   ├── SPEC.md
│   ├── ARCHITECTURE.md
│   ├── AGENT.md
│   ├── SKILLS.md
│   ├── SITEMAP.md
│   ├── SCRIPT-MAP.md
│   ├── DATA-MODEL.md
│   ├── API.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── ROADMAP.md
│   ├── ACCEPTANCE-TESTS.md
│   └── RESEARCH-MAP.md
├── scripts/
├── infra/
│   └── docker/
├── .env.example
├── docker-compose.yml
└── README.md
The agent may adapt this structure after repository inspection, but must record deviations.
6. Local quick start (target workflow)
Prerequisites: Git, Node.js LTS, package manager, Docker Engine/Desktop and Docker Compose.
git clone <YOUR_GUIDESOFT_REPOSITORY_URL> guidesoft-education-ai
cd guidesoft-education-ai
cp .env.example .env
docker compose up -d postgres
pnpm install
pnpm db:migrate
pnpm dev
The exact commands must be reconciled with the generated package scripts and selected ORM. Do not run commands that do not exist.
7. VPS deployment overview
1. Provision and secure Ubuntu LTS.
2. Audit existing services, ports, disk, memory, firewall, Docker networks and backups.
3. Create a dedicated deployment directory and database/storage volumes.
4. Configure secrets in Coolify environment settings.
5. Deploy the application using a pinned image or Git-based build.
6. Configure domain, TLS, health checks, backup and restore testing.
7. Run migrations as a controlled release step.
8. Verify critical user journeys before announcing production.
See docs/DEPLOYMENT.md. Never overwrite an existing production service or volume without explicit approval and a tested backup.
8. Delivery phases
- Phase 0: discovery, requirements confirmation and risk review
- Phase 1: identity, public site, program catalogue, lead capture and admin basics
- Phase 2: enrolment, learner portal, LMS, assignments and payments
- Phase 3: instructor/mentor workflows, assessments and certificates
- Phase 4: career services, employer portal and enterprise cohorts
- Phase 5: AI learning assistant, analytics and marketplace
- Phase 6: scale, optimization, localization and mobile experience
9. Definition of done
A feature is done only when its permissions, validation, persistence, error states, audit events, tests, accessibility, documentation and deployment implications are complete. A mock screen is not a completed feature.
10. Documentation index
- PRD.md — business goals, personas, scope and success measures
- SPEC.md — functional requirements and acceptance criteria
- ARCHITECTURE.md — system design and technical decisions
- AGENT.md — instructions for autonomous coding agents
- SKILLS.md — required capabilities and implementation standards
- SITEMAP.md — public and authenticated navigation
- SCRIPT-MAP.md — commands, scripts and safe execution map
- DATA-MODEL.md — core entities and relationships
- API.md — API conventions and endpoint plan
- SECURITY.md — security, privacy and access-control baseline
- DEPLOYMENT.md — local, staging and VPS deployment
- ROADMAP.md — phased execution plan
- ACCEPTANCE-TESTS.md — testable release criteria
- RESEARCH-MAP.md — market validation and evidence to collect

## Implemented baseline and quick start

The original handover above describes the product vision, not a claim that all phases are complete. This repository now contains a modular Next.js application, Drizzle/PostgreSQL schema and migration, Auth.js credentials sessions, published program catalogue, enquiries, learner registration and enrolment, an admin overview, plain-text lessons and saved learner completion. No payment, assignments, placement, certificates or external integrations are implied. See [docs/ROADMAP.md](docs/ROADMAP.md) for scope and release gaps.

Requirements: Node 22, npm, Docker Compose. Copy `.env.example` to `.env`, replace the password in both `POSTGRES_PASSWORD` and `DATABASE_URL` (use URL-safe characters), and generate a unique `NEXTAUTH_SECRET` with `openssl rand -base64 32`. For local shell commands load the file with `set -a; . ./.env; set +a` (Next.js is rooted in `apps/web`, so the root `.env` is not automatically loaded). Then:

```sh
docker compose up -d postgres
npm ci
npm run db:migrate
npm run db:validate
npm run dev
```

Open http://localhost:3000. The catalogue is intentionally empty until an administrator publishes a program. Create the first admin once, using a secure environment or secret manager, not command history:

```sh
# Supply ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in the environment securely.
npm run admin:create
```

The admin command creates a new account, not an elevation of an existing email. Passwords must be 12–72 characters and no more than 72 UTF-8 bytes. See [deployment](docs/DEPLOYMENT.md) and [security](docs/SECURITY.md) before exposing the service publicly. For checks, run `npm run typecheck`, `npm run lint`, `npm run build`, `npm test` with a **dedicated migrated test database**, and `npm run test:e2e` with a running server, Playwright Chromium installed, and `TEST_ADMIN_EMAIL`/`TEST_ADMIN_PASSWORD` set. The end-to-end test creates records in that database; never run it against production.

## Planning and launch readiness

See [the master checklist](docs/MASTER-CHECKLIST.md) for prioritized tasks, current status and launch gates, and [the Phase 0 audit](docs/PHASE-0-AUDIT.md) for evidence and open risks. The existing slice is not production-ready. It supports plain-text lessons but does not process payments, deliver assignments or provide real course content by default.

## Reconciliation with the earlier main branch

The earlier public-only root `src/app` scaffold and its handover documents are retained for reference. The active application and npm scripts use `apps/web`; the root scaffold is not deployed by those scripts. The previous main README and its flat ESLint config are preserved in [docs/MAIN-BASELINE.md](docs/MAIN-BASELINE.md) and `docs/legacy-eslint.config.mjs`; the active app uses the root `.eslintrc.json`. The root Dockerfile and CI target the active application; see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) before deployment. The earlier Vercel and Coolify instructions have not been verified for this monorepo.
