---
name: deploy-verify
description: Diagnose deployment failures, apply fixes, redeploy to preview, and verify production health. Use when deployment fails, CORS issues appear, 5xx errors hit, or Vercel/Netlify deploy breaks.
---

# Deploy Verifier

Fixes deployment issues and verifies the fix in production.

## Common Patterns

### CORS Issues
- Check `vite.config.ts` for proper headers
- Verify Supabase URL matches production
- Check Netlify/_headers file

### Framework Preset Overrides
- Check `vercel.json` for conflicting settings
- Verify `package.json` framework detection

### Env Var Issues
- `VITE_*` vars bundled into client JS — public only
- Server vars need Netlify env vars set separately
- Missing `SUPABASE_SERVICE_ROLE_KEY` breaks signup trigger + signed URLs

### Edge Runtime (Cloudflare Workers)
- Auth.js v5 edge compatibility issues
- Check `middleware.ts` for unsupported APIs

## Workflow

### 1. Diagnose
```
# Get deploy logs
vercel logs --token=$VERCEL_TOKEN
# Check Netlify deploy log in UI

# Common fixes
curl -I https://empenalo.netlify.app/api/health
curl -I https://empenalo.netlify.app/api/solicitudes
```

### 2. Apply Minimal Fix
- One logical change per commit
- Atomic commits only
- No bundling unrelated fixes

### 3. Redeploy to Preview
```
# Vercel
vercel deploy --token=$VERCEL_TOKEN --preview

# Netlify — push to preview branch or redeploy via CLI
netlify deploy --dir=dist --prod
```

### 4. Verify Production Health
```
curl -f https://empenalo.netlify.app || echo "FAILED"
curl -f https://empenalo.netlify.app/api/health || echo "HEALTH FAILED"
```

### 5. Open Fix PR
- Use `/ship` skill after fix is verified
- Include root cause in PR body

## Rules

- Document every fix in `.planning/deploy-fixes.md` (append)
- Root cause + solution + verification steps
- Never deploy without verification
- If same fix pattern repeats 3x, suggest a skill or pre-deploy hook