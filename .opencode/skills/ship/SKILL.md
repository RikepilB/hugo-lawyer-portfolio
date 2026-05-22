---
name: ship
description: Run typecheck, lint, tests, create atomic commits, push branch, and open PR. Use when asked to ship changes, merge to develop, create a PR, or finalize a feature.
---

# Ship Skill

Commits atomic changes, runs verification, pushes branch, and opens PR.

## Workflow

### Pre-flight
1. Run `gh auth status` — if stale GITHUB_TOKEN set, unset it
2. Confirm current branch is clean (`git status`)

### Verification
1. `bun run typecheck` — must pass
2. `bun run lint --fix` — auto-fix what you can, report remaining
3. `bun run build` — must succeed
4. `bash scripts/security-scan.sh` — must pass (no secrets)

### Atomic Commits
1. Review unstaged changes with `git diff --cached`
2. Bundle only related changes per commit
3. Use conventional commits format: `feat:`, `fix:`, `refactor:`, `docs:`
4. Subject ≤ 70 chars, imperative mood

### Push & PR
1. `git push -u origin HEAD`
2. `gh pr create --fill` — auto-populated from commit messages
3. Verify PR opened in browser or confirm via CLI

### Post-Ship
1. Append to `progress.txt` via the `/progress` skill
2. Confirm Netlify deploy triggered

## Rules

- **Never bundle unrelated changes** in one commit
- **Never force push** to develop/main
- **Always verify** before declaring done
- If any step fails, STOP and report — do not continue