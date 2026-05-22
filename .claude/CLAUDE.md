# CLAUDE.md

This file provides strict, comprehensive guidance to Claude Code (claude.ai/code) and compatible AI agents working in this repository.

## 🦍 Git Worktree Workflow (/caveman)

**Never push directly to main production branches. Avoid changing branches inside a shared directory to prevent agent overlap.**

1. **Isolation First:** For any new non-trivial task, use the `/caveman` skill to spawn a clean Git Worktree in a sibling directory (`../.worktrees/branch-name`) branched from `main`.
2. **Local Syncing:** When work in a worktree folder completes, run `git add . && git commit` inside that folder, push the branch, and open a PR targeting `main`.
3. **Main Tree Sync:** Return to the primary project directory, run `git checkout main && git pull origin main`, and safely tear down the completed worktree using `git worktree remove`.

## 🛠️ The Command Pipeline Flow

You must strictly respond to and execute the following slash commands to maintain a controlled, sandboxed workflow:

*   **/ultraplan** -> Read all current project criteria and generate a high-level, modular roadmap split into isolated parallel tracks. Stop and wait for human authorization before writing any functional code.
*   **/goal** -> Lock your execution context to a single, specific track from the `/ultraplan`. List the files you intend to modify and refuse to touch any outside code.
*   **/agents** -> Deploy your specialized internal task force sequentially:
    *   *Awesome Claude* (Systems Architect): Drafts data structures, state boundaries, and logical control loops.
    *   *Superpower* (UI/UX Specialist): Applies high-craft structural rules, typography scaling, and semantic layouts.
    *   *GSD - Get Shit Done* (Principal Engineer): Converts specifications into ultra-clean, minimal file diffs.
*   **/codex review** -> Act as a ruthless code auditor. Scan the generated diff for authorization leaks, race conditions, and error-handling gaps. Present a Pass/Fail grade.
*   **/codex rescue** -> Emergency fallback mode. Halt feature generation, digest the active runtime error or crash log, and provide a single-sentence root cause along with a precise structural fix.

## 📝 Session Progress Reporting

When a goal completes or an agent session ends, you MUST append a concise markdown summary to `docs/session-reports/<YYYY-MM-DD>-<task-slug>.md`. The report must feature:
1. **Goal** — Verbatim task prompt.
2. **What Landed** — Bullet list of commits/file updates.
3. **What's Still Open** — Pending items for the project backlog.
4. **Next Recommended Action** — Single directional sentence.
5. **Risks/Blockers** — Bullet list or "None".

## 📦 Project Configuration Reference

*   **Package Manager:** Always use `pnpm` (verify via `pnpm-lock.yaml`). Never execute `npm install`. If legacy `npx` tools are mandatory, enforce `--min-release-age=7d`.
*   **Commands:**
    *   `pnpm dev` - Start local development server.
    *   `pnpm build` - Run production compilation sequence.
    *   `pnpm lint` - Run code linter/formatter.
    *   `pnpm typecheck` - Run strict compiler type-checking checks.
    *   `pnpm test` - Run unit/integration test runner suite.
    *   `pnpm test:e2e` - Run browser-automation end-to-end testing.

## 📐 Architecture & Modular Design

*   **Modular Monolith:** Organize code by clean domain features. Strictly avoid cross-service circular imports.
*   **Decoupled Services:** Isolate persistence logic from interface components. Keep your endpoints thin and delegate heavy business logic execution to specialized service engines.
*   **State Integrity:** Enforce defensive type guards, compile-time validation schemas (e.g., Zod), and strict, explicit error boundaries at application integration points.

## 🎨 High-Craft UI/UX Design Skills

When building or reviewing interfaces, you must actively mount and follow the design guidelines found within your advanced skill library:
*   `shadcn/` -> Maintain atomic component composition, consistent theme variable scoping, accessible form behaviors, and radix primitives.
*   `impeccable/` & `ui-ux-pro-max-skill` -> Eliminate generic "AI slop" layouts. Enforce strict typographic hierarchies, fluid white space ratios, systematic color contrast, interactive motion micro-interactions, and accessible tap/click hit targets.
*   `ckm-design-system/` -> Adhere to global design tokens and semantic layout rules.