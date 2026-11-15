# Acceptance tests

Automated: contracts reject invalid data and unsafe password byte lengths; PostgreSQL integration verifies migration, foreign-key-backed enrolment, uniqueness and audit persistence; Playwright covers landing accessibility (axe WCAG A/AA), enquiry, admin publication, unauthorized access, registration, login, enrolment, refresh persistence and duplicate enrolment. Run against a dedicated migrated database with an admin and running app as described in README. Playwright needs a Chromium installation and OS libraries.

Manual release checks still required: keyboard and screen-reader testing across all pages, responsive devices, failure/retry paths, rate limiting and abuse tests, TLS, backup/restore, production environment, permissions for every role and owner review. Automated accessibility checks cannot establish accessibility conformance. Do not mark full product phases complete based on this core slice.

## Verification in this workspace

On 2026-11-14: the initial migration was applied and checked on a temporary PostgreSQL 18 instance; unit and PostgreSQL integration tests passed, and the Playwright journey and landing-page axe scan passed against the production build. `build`, `typecheck`, `lint`, `db:validate` and `npm audit` passed. A simple source-pattern scan found no private keys or common token patterns; it is not a comprehensive secret audit. PostgreSQL 16 Compose, Docker image building, Coolify and a target VPS were not available for verification. Install Playwright's Chromium and system dependencies using `npx playwright install --with-deps chromium` where supported. A browser test cannot replace manual accessibility or security review.

## Phase 1 admin update — 2026-11-14

Fresh PostgreSQL 18 test and preview databases received both migrations; unit and PostgreSQL integration tests, production build, lint, typecheck and migration-history validation passed. A browser test exercised enquiry status, draft visibility, editing and publication, learner enrolment and duplicate handling, unpublication, retained enrolment, role checks and a landing-page axe scan. The test does not establish full accessibility, security or production readiness. Compose/PostgreSQL 16 and the target VPS remain unverified.

## Phase 2 lesson foundation — 2026-11-14

On the temporary PostgreSQL 18 database, the lessons migration applied and migration-history validation, unit/integration tests, production build, lint and typecheck passed. The browser journey exercised admin draft and published lessons, lesson editing, denial of direct access before enrolment, draft privacy after enrolment, completion and persistence, and continued access after program unpublication. The landing page axe scan remains a limited automated check; full accessibility, security, PostgreSQL 16/Compose, VPS and paid journeys are not verified.
