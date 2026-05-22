# ScoutLane — Architecture & Workflow

## Architecture: Modular Monolith

ScoutLane is a **Modular Monolith** inside Next.js App Router:
- Single deployable unit, single PostgreSQL database
- Domain modules: `jobs/`, `applicants/`, `pipeline/`, `templates/`, `settings/`
- Shared infrastructure in `src/lib/` (auth, db, email, storage, llm)
- No network boundaries between modules — all call Prisma directly

## Module Boundaries

- A service module **must not import** another service module directly
- Shared business logic lives in `src/lib/` (e.g., `src/lib/jobs/status.ts`)
- Cross-module data access goes through the shared Prisma client (`src/lib/db/prisma.ts`)
- New service modules follow the split-by-CRUD pattern:

```
src/server/services/orders/{index,create,read,update,delete}.ts
```

## API Routes

- API routes (`src/app/api/`) **must be thin** — validate input, delegate to service layer
- No business logic in route handlers
- Server Components that need data call services directly (no fetch to self)

## Infrastructure Clients

- Database (Prisma), GCS, Resend, LLM clients live in `src/lib/`
- **Never import infrastructure clients from page components** — use the service layer
- The Prisma client is at `@/generated/prisma/client` (not `@prisma/client`)

## Clean Code Practices

- **Barrel exports** — every lib/service module has an `index.ts` that re-exports public symbols
- **Page-specific components** go in `_components/` (Next.js private folder) co-located with the page
- **Server Components by default** — mark `"use client"` only when needed (forms, dnd, charts)
- **Thin pages** — pages should read like orchestration, not contain business logic
- **Zod schemas** in `src/schemas/` — imported by both server and client
- **No circular dependencies** — barrel exports make this easy to check

## Database Discipline

- **Migrations must be additive** — never modify or delete a migration once pushed
- Schema changes get their own commit with `pnpm prisma:migrate --name <desc>`
- Run `pnpm prisma:generate` after any schema change (auto-runs on postinstall)
- Job status is derived (see `src/lib/jobs/status.ts`) — do not store it as a column
- Pipeline stage names are user-defined; they map to `ApplicationStatus` by `stage.name.toUpperCase()`

## Git Workflow

| When | Action |
|------|--------|
| Starting a feature | Branch: `feat/<feature-name>` or `fix/<bug-description>` |
| After a feature unit compiles | Pre-commit gate: `pnpm typecheck && pnpm lint` must pass |
| Schema changes | Separate migration commit: `feat: add X column to Y` |
| Refactoring | Separate branch — never mix with feature work |
| Before merging | Run full CI: `pnpm lint && pnpm typecheck && pnpm test` |

### Commit Messages

Conventional commits format:
```
<type>: <short description>

<optional body>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

## CI Sequence

`lint → typecheck → test` (defined in `.github/workflows/ci.yml`)

Always run locally before pushing:
1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`

## Key Reminders

- **No tests exist yet** — Vitest is wired up but has zero test files. Start writing tests for new code.
- **Workers are stubs** — `src/server/workers/` is greenfield (planned: parse-resume, send-email, dispatch-webhook)
- **Form builder** UI exists but does not persist to DB yet (migration for `customFields` column was just added)
- **Auth split** — `auth.config.ts` (Edge-safe, no Prisma) vs `auth.ts` (full instance). Never import `auth.ts` in middleware.
