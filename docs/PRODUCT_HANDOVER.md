# GUIDESOFT Education & AI — Product handover

> Historical main-branch snapshot, retained during reconciliation. Its implementation and release statements describe the earlier public-only scaffold, not the current monorepo. See [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) for current status and release blockers.

## Product promise
A connected learning journey: discover a goal, choose a structured program, practice through projects, receive feedback, demonstrate capability and keep progressing.

## Primary audiences
1. Individual learners changing or advancing careers.
2. Working professionals upgrading their technology and AI skills.
3. Instructors and mentors delivering structured cohorts.
4. Employers and organizations developing workforce capability.
5. GUIDESOFT operations managing admissions, delivery and learner support.

## Product areas
Academy, AI School, Career, Labs, Enterprise, Marketplace and Certification share one identity and platform. Start as a modular monolith.

## First release shipped
A responsive brand-led public website with program areas, learning approach, enterprise enquiry and contact links.

## Build sequence
1. Discovery: validate target learner segment, program economics, outcomes, price, delivery capacity and competition.
2. Public conversion: program detail pages, enquiry capture, consent, CRM pipeline and analytics.
3. Learner operations: authentication, profile, application, enrolment, cohort and payment records.
4. Learning delivery: curriculum, modules, lessons, attendance, assignments, submissions and mentor feedback.
5. Assessment: rubrics, grading, completion criteria and verifiable credentials.
6. Career services: portfolio, mock interviews, career resources and employer opportunities.
7. Enterprise: tenant isolation, organization admins, cohorts, reports and contracts.
8. AI learning support: approved model adapter, data minimization, safety, costs, telemetry and learner controls.

## Commercial readiness checks
- Define first audience and one high-value flagship program.
- Interview prospective learners and employers; record evidence, not assumptions.
- Specify curriculum, instructor capacity, project briefs and support SLAs.
- Model acquisition cost, delivery cost, refund exposure, margin and cash runway.
- Publish transparent pricing, refund terms, privacy notice and terms before payments.
- Track qualified leads, application conversion, enrolment, attendance, completion, project quality, learner satisfaction and repeat/referral rates.
- Never guarantee employment, salary, accreditation or outcomes without documented substantiation.

## Operational roles
Learner, instructor, mentor, admissions, support, employer contact and platform admin. Each server-side action requires role checks and audit logging.

## Security baseline
Use managed secrets, least-privilege access, secure session handling, CSRF protections where applicable, server-side validation, rate limits, data retention controls, backups and tested restore procedures. Do not store payment-card data; use a compliant payment provider when introduced.

## Explicit non-goals of the current release
No registration/login, LMS, payment checkout, CRM database, AI chatbot, student dashboard, course authoring or certificate issuance is currently implemented.
