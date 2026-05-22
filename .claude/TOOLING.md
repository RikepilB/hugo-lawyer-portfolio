# Tooling Reference

Inventory of plugins, slash commands, agents, skills, and MCPs available in this workspace, and when to reach for each. Update this file when you enable/disable a plugin or add/remove an agent.

## Config layers (where things live)

| Layer | Path | Purpose |
|---|---|---|
| Global user | `~/.claude/settings.json` | `enabledPlugins`, model, hooks, statusLine |
| Global agents | `~/.claude/agents/*.md` | Hand-installed agents (currently the `gsd-*` family) |
| Global skills | `~/.claude/skills/*/` | Hand-installed skills (currently `agent-browser`, `trx`) |
| Global commands | `~/.claude/commands/*.md` | Custom slash commands (currently `gsd/`) |
| Plugin cache | `~/.claude/plugins/cache/claude-plugins-official/<plugin>/` | Plugin-shipped content — disable the plugin, don't delete files |
| Project | `<project>/.claude/agents/`, `<project>/.claude/skills/` | Project-scoped agents/skills |
| Project local | `<project>/.claude/settings.local.json` | Per-project permissions |
| Per-project state | `~/.claude.json` | MCP servers, trust state |

## Plugins enabled

Set in `~/.claude/settings.json` → `enabledPlugins`:

| Plugin | Use for |
|---|---|
| `superpowers` | Workflow skills (brainstorming, TDD, debugging, plans, worktrees) |
| `context7` | Library docs MCP — prefer over web search for React/Next.js/Prisma/etc. |
| `playwright` | Browser automation MCP |
| `frontend-design` | High-craft UI generation skill |
| `skill-creator` | Authoring/measuring custom skills |
| `code-simplifier` | Refactor recently-changed code |
| `figma` | Figma read/write + Code Connect *(consider disabling — not used here)* |
| `supabase` | Supabase Auth/DB/Edge Fns *(consider disabling — this app uses Prisma + plain Postgres)* |

## Slash commands

### Built-in
`/help` `/init` `/clear` `/config` `/model` `/plugin` `/exit`

### GSD workflow (under `~/.claude/commands/gsd/`)
Phase-driven planning + execution. Most-used:

| Command | When |
|---|---|
| `/gsd:new-project` | Brand-new project — gather context, write PROJECT.md |
| `/gsd:new-milestone` | Start a new milestone cycle |
| `/gsd:discuss-phase` | Talk through a phase before planning |
| `/gsd:plan-phase` | Generate PLAN.md for the current phase |
| `/gsd:execute-phase` | Run all plans in a phase (wave-based parallelization) |
| `/gsd:quick` | One-shot task with atomic commits, skip optional agents |
| `/gsd:debug` | Persistent debugging across context resets |
| `/gsd:autonomous` | Run all remaining phases hands-off |
| `/gsd:progress` | "Where am I, what's next?" |
| `/gsd:do <text>` | Routes freeform input to the right gsd command |
| `/gsd:note` / `/gsd:add-todo` | Capture ideas without context-switching |
| `/gsd:ui-phase` / `/gsd:ui-review` | Design contract + retroactive UI audit |
| `/gsd:verify-work` | Conversational UAT for built features |
| `/gsd:map-codebase` | Parallel agents → structured codebase docs |

Full list: `ls ~/.claude/commands/gsd/`.

### Superpowers / utility
| Command | When |
|---|---|
| `/review` | Review a PR |
| `/security-review` | Security audit of pending branch changes |
| `/simplify` | Refactor changed code |
| `/loop <interval> <cmd>` | Recurring task ("every 5m check deploys") |
| `/schedule` | Cron-style remote agents |
| `/update-config` | Edit `settings.json` (permissions, hooks, env) |
| `/fewer-permission-prompts` | Auto-allowlist common safe commands |
| `/keybindings-help` | Customize keyboard shortcuts |

## Agents

### Project-local (`.claude/agents/`)

| Agent | When |
|---|---|
| `planner` | Non-trivial feature/refactor — get a step-by-step plan first |
| `architect` | Module boundaries, new domain, data flow decisions |
| `tdd-guide` | About to write a feature/bugfix — enforces tests first |
| `test-writer` | Add tests to existing code |
| `code-reviewer` | Just wrote code — sanity check |
| `security-reviewer` | Auth, API input, secrets, uploads — anything OWASP-adjacent |
| `database-reviewer` | SQL, Prisma migration, schema design, slow query |
| `build-error-resolver` | Build/typecheck red — minimal-diff fix |
| `refactor-cleaner` | Dead code, duplicates (knip/ts-prune) |
| `e2e-runner` | Critical user flow needs Playwright/Agent Browser coverage |
| `doc-updater` | Update docs/codemaps after a feature lands |

Not useful for ScoutLane (candidates to delete): `chief-of-staff`, `data-analyst`.

### Built-in (always available)

| Agent | When |
|---|---|
| `Explore` | Read-only search across the codebase |
| `Plan` | Architect-style planning agent |
| `general-purpose` | Open-ended research / multi-step lookup |
| `gsd-*` (12 specialists) | Auto-invoked by `/gsd:*` commands — don't call directly |

## Skills (via the `Skill` tool)

### Workflow (use proactively)
| Skill | Trigger |
|---|---|
| `superpowers:using-superpowers` | Auto-runs at session start — finds skills |
| `superpowers:brainstorming` | Before any creative work (new feature/component/behavior) |
| `superpowers:writing-plans` | You have a spec → before touching code |
| `superpowers:executing-plans` | Plan to execute with review checkpoints |
| `superpowers:test-driven-development` | Implementing any feature/bugfix |
| `superpowers:systematic-debugging` | Any bug, test failure, unexpected behavior |
| `superpowers:verification-before-completion` | Before claiming "done" — run verification first |
| `superpowers:using-git-worktrees` | Starting feature work that needs isolation |
| `superpowers:dispatching-parallel-agents` | 2+ truly independent tasks |
| `superpowers:subagent-driven-development` | Plan with independent tasks → fan out |
| `superpowers:receiving-code-review` / `requesting-code-review` | Around review checkpoints |
| `superpowers:finishing-a-development-branch` | Tests green → ready to merge/PR |

### Frontend / UI (`.claude/skills/deploy/01-DESIGN/`)
| Skill | Use for |
|---|---|
| `frontend-design:frontend-design` | Production-grade, non-generic UI components |
| `shadcn` (rules: composition, forms, icons, styling) | Before touching `src/components/ui/*` |
| `ckm-design-system` / `ckm-ui-styling` | Design tokens, semantic tokens, Tailwind v4 |
| `impeccable` | Visual polish pass — typography, color, motion, layout |
| `tailwind-design-system`, `frontend-patterns`, `vercel-react-best-practices` | Broader frontend craft |

### Specialty
| Skill | Trigger |
|---|---|
| `claude-api` | Building anything with `@anthropic-ai/sdk` — adds prompt caching, model migrations |
| `agent-browser` | Browser automation (preferred over raw Playwright) |
| `simplify` | Code-quality pass on changed code |
| `skill-creator:skill-creator` | Create/evaluate your own skills |
| `update-config`, `fewer-permission-prompts`, `keybindings-help` | Settings utilities |

Not used here: `trx` (transcription), `figma:*` (no Figma workflow), `supabase:*` (no Supabase).

## MCPs

Configured in `~/.claude.json` per-project under `mcpServers`. Currently visible across projects:

| MCP | Use for |
|---|---|
| **context7** (plugin) | Live library docs lookups |
| **playwright** (plugin) | Browser automation primitives |
| **figma** (plugin) | Figma file read/write *(disable with plugin if unused)* |
| **supabase** (plugin) | Supabase project ops *(disable with plugin if unused)* |
| **TestSprite** | Auto-generate + run frontend/backend test plans *(consider removing — Vitest+Playwright already in place)* |
| **github** | GitHub repo/PR/issue ops |
| **Neon** | Neon Postgres branching + SQL execution |

Remove an MCP: `claude mcp remove <name>` or edit `~/.claude.json` directly.

## Decision tree

```
New feature/refactor?            → /gsd:plan-phase  or  Agent(planner)
Stuck on a bug?                   → Skill(superpowers:systematic-debugging)
Writing UI?                       → Skill(superpowers:brainstorming) → frontend-design + shadcn
Touching auth/API input/uploads?  → Agent(security-reviewer) AFTER writing
SQL/migration?                    → Agent(database-reviewer)
Build red?                        → Agent(build-error-resolver)
About to say "done"?              → Skill(superpowers:verification-before-completion)
Library docs uncertain?           → context7 MCP (don't web-search)
```

## Cleanup recipes

```bash
# Disable a plugin (turns off its commands/agents/skills/MCPs at once)
# Edit ~/.claude/settings.json → "enabledPlugins": { "<name>@claude-plugins-official": false }
# Or interactively:
#   /plugin

# Remove a project agent or skill (just delete the file)
rm .claude/agents/chief-of-staff.md
rm .claude/agents/data-analyst.md

# Remove a user-level skill you installed yourself
rm -rf ~/.claude/skills/trx

# Remove an MCP server
claude mcp remove TestSprite

# Auto-allowlist commands you keep approving
# (run in Claude Code)
/fewer-permission-prompts
```
