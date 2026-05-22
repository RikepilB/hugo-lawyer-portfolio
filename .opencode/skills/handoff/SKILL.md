---
name: handoff
description: Write or update handoff.md with current session state, pending tasks, and resume instructions. Use when ending a session, switching contexts, or preparing for another agent to continue work.
---

# Handoff Skill

Documents session state so the next session (or another agent) can resume quickly.

## When to Use

- End of every session
- Before switching to a different task
- When multiple agents work in parallel
- If you hit a usage limit mid-task

## Workflow

### Read Existing handoff.md (if exists)
```
cat handoff.md
```
Skip sections that are already documented.

### Write/Update handoff.md

```markdown
# Handoff — {timestamp}

## Current State
{what was being worked on}

## Completed This Session
- {task 1}
- {task 2}

## Pending Tasks
- [ ] {task 1}
- [ ] {task 2}

## Files Modified
- `src/path/file1.ts`
- `src/path/file2.ts`

## Next Steps
1. {exact command or action to take next}
2. {second action}

## Resume Command
```bash
# Paste exact command to resume
```

## Blockers
- {none|description}
- {relevant env vars, auth status}

## Notes
{anything the next session needs to know}
```

### Write to `.planning/current-plan.md` (for multi-step tasks)

```markdown
# Plan — {task name}

- [ ] Step 1: {description} — `command to run`
- [ ] Step 2: {description} — `command to run`
- [ ] Step 3: {description} — `command to run`

## Resume
If stopped at step N, run: `exact command`
```

## Rules

- Be specific — "fix CORS" is not enough, say "check Vercel headers config for /api/*"
- Include exact commands for resume
- Note any auth state or env vars needed
- handoff.md is gitignored — never commit secrets here
- Update before every session end, even if incomplete