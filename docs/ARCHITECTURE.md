# Architecture and audit

Phase 0 inspection: repository contained only README.md and one commit (71dd29a); no docs, application, or existing services. Sandbox: Node 22/npm 10, no Docker or PostgreSQL binaries, no target VPS details. No VPS audit was possible. Unrelated files were preserved.

One Next.js app serves React server components, Auth.js routes and server actions; Drizzle uses a PostgreSQL connection pool. Shared packages contain contracts, UI and TypeScript configuration. SQL migrations live in `drizzle/`, rather than the optional `prisma/` shown in the README. npm workspaces replace the illustrative pnpm commands. No optional AI worker or storage service was created. The owner has not supplied a logo or visual identity; the text wordmark and palette are provisional, not an asserted official logo.

Prisma engine downloads were inaccessible in the build sandbox; Drizzle was selected instead. Tests used PostgreSQL 18 via an ephemeral local embedded binary; the Compose target is PostgreSQL 16. Docker/Coolify and the VPS are not verified here. See deployment and security before release.
