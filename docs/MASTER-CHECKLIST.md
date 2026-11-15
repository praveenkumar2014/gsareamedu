# GUIDESOFT master checklist

**Owner:** GUIDESOFT · **Baseline reviewed:** 2026-11-14 · **Release decision:** NOT READY FOR PRODUCTION

This is the working plan for the product in the root README. The list is a structured baseline, not a guarantee that every unknown has been discovered; add tasks as research and implementation reveal them. The seven product areas share one platform. A role, navigation link, schema or mock screen alone is not a completed product.

## How to read this plan

- **Priority P0** = required before a public paid-learning launch, or a decision needed to establish that launch. P0 is a priority, not README Phase 0.
- **P1** = important next capability; promote to P0 if it is promised for the first launch or required by law or policy.
- **P2** = later improvement, conditional on evidence, demand and owner approval.
- **Status:** `Done` = completed and evidence identified; `Partial` = exists but incomplete or not release-verified; `Not started`; `Blocked` = depends on an external decision or environment. Unchecked boxes include both partial and unstarted work. Do not change a task to Done without recording implementation and verification evidence.
- **Ownership:** Engineering implements and tests; Owner approves business choices, content and accounts; Operations runs the business; Legal/finance advisers review applicable obligations. One person may wear multiple hats.
- **Every feature** must satisfy the README definition of done: permissions, validation, real persistence, loading/empty/error/success states, auditable critical operations, tests, accessibility, documentation and deployment implications.

## Current snapshot

- **Partial:** public landing page, seven area links, published-program catalogue, enquiry form, learner sign-up/sign-in, single enrolment per user/program, learner list of enrolled programs, admin program draft/edit/publish/unpublish, enquiry status and audit views, and plain-text lessons with learner completion tracking. See `apps/web/app/`, `apps/web/lib/` and `drizzle/`.
- **Important:** enrolment currently creates a database record immediately; there is no payment, approval, pricing or paid access entitlement logic. Admin-authored text lessons can be shown only to enrolled learners, but no actual curricula are supplied. Do not use this flow to sell or represent a paid program.
- **Partial:** five role names exist, but only learner and admin flows have meaningful enforcement; instructor, mentor and employer workflows are not implemented. There is no role-management UI.
- **Partial:** registration uses bcrypt and Auth.js sessions, admin actions check the current database role, and selected writes have transactional audit events. Account recovery, email verification, admin MFA, revocable sessions, full abuse controls, privacy processes and secure operational readiness remain open.
- **Latest verification:** build, typecheck, lint, migration-history check, PostgreSQL 18 migrations/integration, contract tests, browser journey, landing-page axe scan and npm audit passed; see `docs/ACCEPTANCE-TESTS.md`. Docker/Compose, Coolify, PostgreSQL 16 and any target VPS remain unverified.
- See `docs/PHASE-0-AUDIT.md` for evidence, risk and environment constraints. The owner has not supplied an official visual identity, first program, pricing, providers or production infrastructure.

## README Phase 0 — discovery, decisions and risk

- [x] **P0-01 · Done · Engineering** — Inspect repository, Git history, README, existing documentation and local runtime; preserve unrelated work. Evidence: `docs/PHASE-0-AUDIT.md`.
- [x] **P0-02 · Done · Engineering** — Produce this prioritized baseline and distinguish current evidence from assumptions. Review and update it as work proceeds.
- [ ] **P0-03 · Blocked · Owner + Operations** — Define first audience, launch geography, delivery language, initial program and what the customer receives. Validate demand with prospective learners; do not invent outcomes.
- [ ] **P0-04 · Blocked · Owner + Finance** — Approve business model, price/currency/tax treatment, payment and refund rules, admission rules, delivery costs, support capacity and launch budget. Free and paid enrolment must be explicitly distinguished.
- [ ] **P0-05 · Blocked · Owner** — Provide approved GUIDESOFT name usage, logo, visual identity, legitimate contact details and program content/rights; existing text wordmark is provisional.
- [ ] **P0-06 · Not started · Owner + Legal** — Review applicable local requirements, terms, privacy notices, consent, marketing communications, child/minor handling, accessibility, taxes, refunds and retention/deletion rules with appropriate advisers. No legal compliance is assumed.
- [ ] **P0-07 · Blocked · Owner + Engineering** — Select hosting/domain and provider accounts for email, payment, video and storage; agree budget, data location and support ownership. Configure secrets through a secret manager or deployment settings, never in chat or Git.
- [ ] **P0-08 · Blocked · Engineering + Owner** — Audit target VPS/services, ports, firewall, volumes, backups and recovery before any deployment; never overwrite existing services or data without approval and a tested backup.

## README Phase 1 — identity, public site, catalogue, leads and admin

- [ ] **P0-11 · Partial · Engineering** — Complete responsive public site, navigation, approved brand, discoverability, program details, honest availability and accessible contact details. Provide clear empty, loading and error states.
- [ ] **P0-12 · Partial · Engineering** — Program draft/edit/publish/unpublish, validation, enrolment-history preservation and transactional audit events are implemented. Remaining: pagination beyond the latest 50, comprehensive accessibility/negative-path testing, production hardening and review of all administrative changes.
- [ ] **P0-13 · Partial · Engineering** — Secure identity lifecycle: verification, password reset and expiry, secure delivery, rate limits, abuse prevention, account lockout recovery, session revocation, logout and reauthentication. Prevent account enumeration as appropriate.
- [ ] **P0-14 · Partial · Engineering** — Implement least-privilege RBAC, admin MFA and authorized role/account administration; test access for all roles and disabled/deleted accounts. Document how privileged access is granted and removed.
- [ ] **P0-15 · Partial · Engineering + Operations** — Enquiry status (new/contacted/closed), admin-only access and transactional audit are implemented. Remaining: spam controls, assignment/follow-up, pagination beyond 50, retention, deletion and support procedures.
- [ ] **P0-16 · Not started · Engineering + Owner** — Publish approved terms, privacy, refund and contact information; capture only necessary consent and support user data requests.
- [ ] **P0-17 · Partial · Engineering** — Improve audit coverage for critical identity, administrative and access changes; protect logs from sensitive data, restrict access and establish retention and review.

## README Phase 2 — enrolment, learner portal, LMS, assignments and payments

- [ ] **P0-21 · Blocked · Owner + Engineering** — Define free versus paid offers, admission, access and cancellation rules. Enforce them server-side; remove any route that grants paid access before verified entitlement.
- [ ] **P0-22 · Partial · Engineering** — Programs, enrolments, lessons and lesson completion are persisted with PostgreSQL migrations. Cohorts, paid access rights, enrolment states and price snapshots remain unimplemented.
- [ ] **P0-23 · Blocked · Owner + Engineering** — Integrate an approved real payment provider in test and live modes: verified webhooks/signatures, idempotency, retries, pending/failed/cancelled states, reconciliation, refunds and access revocation. Never store card details; do not claim a payment succeeded without verification.
- [ ] **P0-24 · Partial · Engineering + Owner** — Admins can author, edit, order and publish plain-text lessons; enrolled learners can read published lessons and record completion. Real approved content, video/storage, richer accessible materials, resume experience and comprehensive review remain open.
- [ ] **P0-25 · Not started · Engineering** — Implement assignment instructions, submission, safe file handling where needed, feedback, deadlines and learner-visible status; guard every resource by entitlement and role.
- [ ] **P0-26 · Not started · Engineering + Operations** — Implement learner support and operational notification delivery with retries/failure visibility; verify email ownership before sensitive delivery.
- [ ] **P0-27 · Partial · Engineering** — Browser tests exercise enrolment, draft privacy, unauthorized lesson access and persistent completion. Test complete free and paid journeys, including duplicate requests, expired access, webhook replay, failed/refunded payment and database failure. Do not test real transactions without explicit approval.

## Cross-cutting release gate — before real customers or money

These tasks span the README phases; they do not replace them. Reassess gate scope if the owner chooses a limited non-paid pilot.

- [ ] **P0-31 · Not started · Engineering** — Review authentication/session configuration, CSRF, authorization, input validation, secrets, dependency and container vulnerabilities, upload safety, security headers, abuse limits and threat model. Arrange independent review proportionate to risk.
- [ ] **P0-32 · Not started · Engineering + Operations** — Implement privacy rights workflows, minimal data collection, retention/deletion, access logging and approved notices; verify backup and provider data handling.
- [ ] **P0-33 · Partial · Engineering** — Cover critical journeys and negative paths with unit, integration and browser tests against isolated databases and provider sandbox; run keyboard, screen-reader and mobile checks and document accessibility issues.
- [ ] **P0-34 · Not started · Engineering** — Automate CI checks, repeatable migrations, tested rollback/recovery, dependency updates, secret scanning and deployment approvals. Do not expose test credentials or production data.
- [ ] **P0-35 · Partial · Engineering + Operations** — Set up structured logs without secrets, error reporting, readiness/liveness checks, metrics, alerts, on-call contact and incident response. Test service and provider failure scenarios.
- [ ] **P0-36 · Blocked · Operations + Engineering** — Provision isolated staging/production, HTTPS, least-privilege secrets, secure database/network, encrypted backups, agreed recovery objectives and a successful restore drill. Validate Docker/Coolify and target VPS before cutover.
- [ ] **P0-37 · Blocked · Owner + Operations** — Approve actual content, prices, policies, support process, staffing and provider contracts; run a controlled pilot and resolve critical findings.
- [ ] **P0-38 · Not started · Owner + Engineering + Operations** — Document launch sign-off, unresolved risks, rollback, support contacts and post-launch monitoring. No launch or live payment activation without explicit owner approval.

## README Phase 3 — instructors, mentors, assessments and certificates

- [ ] **P1-41 · Not started · Engineering + Owner** — Instructor/mentor onboarding, role-specific permissions, course authoring, review/publication and assignment feedback.
- [ ] **P1-42 · Not started · Engineering + Operations** — Scheduling and real live-session provider integration; time zones, cancellation, recordings, access and failure handling.
- [ ] **P1-43 · Not started · Engineering + Owner** — Assessment rules, attempts, grading, review and appeals; validate academic integrity appropriate to program.
- [ ] **P1-44 · Not started · Engineering + Owner** — Approved certificate issuance, verification, revocation and evidence of competency; do not imply accreditation without approval.

## README Phase 4 — career, employers and enterprise

- [ ] **P1-51 · Not started · Owner + Engineering** — Define career support, employer vetting, learner consent and privacy boundaries. No guarantees of jobs or salary.
- [ ] **P1-52 · Not started · Engineering** — Build approved career preparation, portfolio and opportunity workflows, with moderation and access control.
- [ ] **P1-53 · Not started · Engineering + Operations** — Build enterprise organizations, memberships, cohorts, reporting and billing only after owner defines tenancy, contracts and data ownership.

## README Phase 5 — AI, analytics and marketplace

- [ ] **P1-61 · Not started · Owner + Engineering** — Define AI use cases, approved providers, data handling, safety, evaluations, human escalation and cost limits; clearly label AI output and failures.
- [ ] **P1-62 · Not started · Engineering + Owner** — Add privacy-aware analytics and operational reporting with defined event meanings and validated numbers; no invented business metrics.
- [ ] **P2-63 · Not started · Owner + Engineering** — Define marketplace creator onboarding, content rights, review, pricing, payouts, disputes and compliance before implementing real transactions.

## README Phase 6 — scale, localization and mobile

- [ ] **P1-71 · Not started · Owner + Engineering** — Set measurable traffic scenarios (registered, monthly active and concurrent users), availability, recovery and cost targets; load-test the complete critical path and identify bottlenecks.
- [ ] **P2-72 · Not started · Engineering** — Scale stateless app instances, PostgreSQL and connection pooling, background jobs, storage/CDN and caching only where measurements justify them. Remain modular-monolith-first; no Kubernetes, Kafka, microservices or vector DB without a measured requirement.
- [ ] **P2-73 · Not started · Owner + Engineering** — Plan localization, accessible content, low-bandwidth/mobile use and platform-specific applications based on evidence.
- [ ] **P2-74 · Not started · Operations** — Review unit economics, learning completion, support load, security incidents, churn and reliability using real data; prioritize improvements with the owner.

## Next execution order and dependencies

1. Resolve **P0-03/04** enough to define the first offer; engineering can independently progress identity security, course model, access control, testing and operational foundations in parallel.
2. Complete **P0-13/14/21/22/24** before exposing course access. **P0-23** requires a selected payment provider and cannot be declared complete without sandbox verification; live activation additionally requires owner approval.
3. Complete remaining P0 release gates, real content and policy approvals; perform staging verification and restore drill, then request explicit launch sign-off.
4. Implement later README phases according to approved business priority; update status and evidence after every meaningful change.

## Decision register (no secrets)

| Decision | Status | Needed before |
|---|---|---|
| First audience, offer, geography and language | Open | Curriculum, onboarding and launch scope |
| Program content, instructors, rights and official visual assets | Open | Publishing real offerings |
| Price/currency, taxes, refund and admission policy | Open | Payment and commercial launch |
| Legal/privacy/retention and minor policy | Open | Public launch |
| Payment, email, video, storage and hosting providers | Open | Real integrations and staging |
| Domain, budget, support owner, launch date and capacity goals | Open | Infrastructure and launch |

Do not place passwords, access tokens or provider credentials in this document or chat.

## Latest implementation update — 2026-11-14

Phase 1 admin work now supports program drafts, editing, publication and unpublication, plus enquiry status updates. A database migration adds persisted enquiry status. Existing enrolments remain when a program is unpublished; catalogue visibility and future enrolments are restricted to published programs. An end-to-end test covers the lifecycle and learner access. P0-12 and P0-15 remain **Partial** until the remaining checks and operational requirements above are complete. The application remains **not production-ready**.

## Phase 2 lesson foundation — 2026-11-14

Admin-authored plain-text lessons have ordering, draft/publication and edit controls. A learner must be enrolled to read a published lesson and can mark it complete; access and completion are checked server-side and persisted, with audit events. Existing enrolments remain when a program is unpublished; unpublishing a lesson hides it while retaining completion records. After adding a lesson, use **Refresh lesson list** to see it in the admin list. Tests cover core access and completion; assignments, payment, video, course content and commercial entitlement rules remain open. The application remains **not production-ready**.
