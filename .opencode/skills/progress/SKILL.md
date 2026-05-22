---
name: progress
description: Append a session block to progress.txt with completed tasks, files touched, test/build status, and next steps. Use when asked to log work, update progress, or record session state.
---

# Progress Tracker

Appends a dated session block to `progress.txt` summarizing what was accomplished.

## Workflow

1. Read existing `progress.txt` to understand current state
2. Identify completed tasks from the session
3. Append new session block with:
   - **Date/time** in Spanish locale format
   - **Completed tasks** with bullet points
   - **Files modified** (list paths)
   - **Tests run** (pass/fail/skip)
   - **Build status** (success/failure)
   - **Next steps** (pending work with owners)
   - **Blockers** (if any)
4. Stage and commit: `git add progress.txt && git commit -m "docs: update progress.txt"`

## Session Block Format

```
### Sesión — {date}

**Completado:**
- {task 1}
- {task 2}

**Archivos modificados:**
- `src/path/file1.ts`
- `src/path/file2.ts`

**Tests:** {pass}/{fail}/{skip} — {test command output}
**Build:** {success|failed} — {build output}

**Próximos pasos:**
- [ ] {pending task 1}
- [ ] {pending task 2}

**Bloqueadores:** {none|description}
```

## Rules

- Always read progress.txt first before appending
- Use Spanish for all text
- Be specific — avoid vague descriptions like "various fixes"
- If no progress.txt exists, create one in the project root
- Commit immediately after appending