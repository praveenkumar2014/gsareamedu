# Phase 0 audit and risk review

Reviewed 2026-11-14 on branch `arena/ef324469-gsareamedu`, based on commit `71dd29a036ce632b03db699859254ec9a6e1f766`. The original tracked repository history contains the README handover; the current working tree also contains the uncommitted vertical-slice implementation and documentation from earlier work. These are preserved. No target VPS details or access were supplied; it has not been audited.

## Runtime and repository

- Sandbox: Node 22.22.3, npm 10.9.8; Docker and PostgreSQL command-line tools are not installed. At review, approximately 17 GB of filesystem space and 3.5 GiB available memory were reported; these are transient sandbox observations, not deployment capacity guarantees.
- The implementation uses an npm-workspace Next.js/TypeScript/Tailwind modular monolith, Drizzle schema and SQL migrations in `drizzle/`, PostgreSQL, Auth.js credentials, shared contracts/UI, Dockerfile and Compose configuration. `drizzle/` and npm replace the README's illustrative Prisma/pnpm structure; the optional AI worker is not present. See `ARCHITECTURE.md`.
- No owner-provided logo/brand assets or real course content were located. Existing brand styling is provisional. External provider accounts, pricing, policies and operational ownership are not established in the repository.

## Evidence from this review

| Check | Result | Meaning |
|---|---|---|
| `npm run typecheck`, `npm run lint`, `npm run build` | Passed | Compilation and lint pass in this environment; not a production readiness certification. |
| `npm run db:validate` | Passed | Drizzle migration-history check; not a live database migration test. |
| `node --import tsx --test tests/contracts.test.ts` | 2 passed | Contract validation only. |
| `npm audit` | 0 reported vulnerabilities at review | Point-in-time dependency advisory check, not a penetration test. |
| PostgreSQL integration/migration and browser E2E | Not rerun | No running database/browser setup in this review. Previous isolated PostgreSQL 18 and E2E results are recorded in `ACCEPTANCE-TESTS.md`; do not imply a fresh pass. |
| Docker, Compose, Coolify, production deployment and VPS | Not verified | Docker/VPS unavailable; PostgreSQL 16 target and restore procedures need testing in an appropriate environment. |

## Principal risks and decisions

1. **Paid access:** enrolment currently immediately persists access without a charge, verified entitlement or lesson delivery. Block paid launch until payment, refund and access state are designed and tested.
2. **Identity and abuse:** email verification, recovery, MFA, session revocation, distributed rate limits and account lifecycle are incomplete. Existing email-keyed login throttling can be abused for lockouts.
3. **Privacy and operations:** legal notices, consent, retention/deletion, incident response, support, safe audit retention, backups and restore drills require implementation and owner review.
4. **Missing business inputs:** first audience, curriculum and rights, pricing, providers, support staff and approved branding are open decisions. No income, learner counts, outcomes or placement guarantees are assumed.
5. **Verification limits:** current automated accessibility testing covers the landing page only; browser/device, screen-reader, security, load and production infrastructure checks remain outstanding.
6. **Scale:** no concurrency target or cost envelope has been set and no load test has been run. A million registered users is not the same as a million concurrent users.

Local/repository discovery and the checklist are complete. **Phase 0 as a whole remains open** until owner decisions, requirements validation and target VPS review are completed. See `MASTER-CHECKLIST.md` for owners, priorities, dependencies and launch gates.
