# Git Workflow

## Branch Strategy

**Never push directly to `master` or `origin/master`.** The workflow is strictly:

1. **Pull latest:** `git checkout main && git pull origin main`
2. **Feature branch:** Create from `main` (e.g. `git checkout -b feat/my-thing`)
3. **Work + commit** on the feature branch
4. **Push feature branch** and open a **PR targeting `main`**
5. **CI gates** must pass: `lint → typecheck → test → build`
6. **Merge PR into `main`**
7. **Sync to `master`:** Once merged to `main`, open a PR from `main` → `master` to deploy to production
8. **Vercel auto-deploys** from `master`

> `main` = integration branch. `master` = production/public branch. Always PR into `main` first, then promote to `master`.

## Commit Message Format
```
<type>: <description>

<optional body>
```

Types: feat, fix, refactor, docs, test, chore, perf, ci

Note: Attribution disabled globally via ~/.claude/settings.json.

## Pull Request Workflow

When creating PRs:
1. Analyze full commit history (not just latest commit)
2. Use `git diff [base-branch]...HEAD` to see all changes
3. Draft comprehensive PR summary
4. Include test plan with TODOs
5. Push with `-u` flag if new branch

> For the full development process (planning, TDD, code review) before git operations,
> see [development-workflow.md](./development-workflow.md).
