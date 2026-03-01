---
name: deploy-check
description: Pre-deployment checklist for UFC News Hub
---

# Pre-Deployment Check

Run all checks from `ufc-news-hub/` directory.

## Checklist

### 1. Lint
```bash
cd ufc-news-hub && npm run lint
```
**MUST pass with zero errors.** Warnings are acceptable but should be minimized.

### 2. TypeScript
```bash
cd ufc-news-hub && npx tsc --noEmit
```
**MUST pass with zero errors.**

### 3. Build
```bash
cd ufc-news-hub && npm run build
```
**MUST succeed.** Check output for:
- ❌ Build errors (fix immediately)
- ⚠️ Pages >300kB First Load JS (investigate)
- ⚠️ Long build times on specific routes (check data fetching)

### 4. Environment Variables
Verify these are set in Vercel dashboard:
- `DATABASE_URL` — PostgreSQL connection string
- `ANTHROPIC_API_KEY` — For AI company system
- `ADMIN_PASSWORD` — **MUST NOT be the default** `ufc-admin-2024`
- `CRON_SECRET` — For cron job authentication
- `RSS_FEED_URL` — RSS feed source

### 5. Database
```bash
cd ufc-news-hub && npx prisma migrate status
```
- All migrations applied?
- Schema in sync? (`npx prisma db pull` to verify)

### 6. Image Domains
Check `next.config.js` — all remote image hosts must be listed in `images.remotePatterns`.

### 7. Security Quick Check
- [ ] No `.env` files in git: `git ls-files | grep -i env`
- [ ] Admin routes protected: `grep -r "requireAdmin" src/app/api/admin/`
- [ ] No hardcoded secrets: `grep -rn "ufc-admin-2024\|sk-ant-\|password" src/ --include="*.ts"`

### 8. Git Status
```bash
git status        # Clean working tree?
git log --oneline -5  # Recent commits make sense?
```

## Output

Report as:
```
✅ Lint: passed
✅ TypeScript: passed
✅ Build: passed (total: XXkB)
✅ Env vars: verified
✅ DB migrations: up to date
✅ Security: no issues found
🟡 Warning: [any warnings]
```
