---
name: fix-issue
description: Fix a GitHub issue end-to-end for UFC News Hub
---

# Fix Issue: $ARGUMENTS

## Steps

1. **Understand the issue**
   - Read the issue description carefully
   - Identify affected files and systems (API, frontend, scraper, AI company, DB)

2. **Locate relevant code**
   ```bash
   cd ufc-news-hub
   grep -r "KEYWORD" src/ --include="*.ts" --include="*.tsx" -l
   ```

3. **Plan the fix**
   - Identify root cause
   - Check if the issue touches the dual DB pattern (raw SQL vs Prisma)
   - Verify you're editing the right layer (API route → lib → component)
   - If >3 files affected, write a plan first

4. **Implement the fix**
   - Make minimal, focused changes
   - Follow project conventions:
     - Portuguese table/column names in DB queries
     - `zodSchema()` wrapper for AI tools
     - `neu-card` / `neu-button` for UI elements
     - `query<T>()` / `queryOne<T>()` for raw SQL

5. **Verify**
   ```bash
   cd ufc-news-hub
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
   - Manually test the affected endpoint/page if possible

6. **Commit**
   ```bash
   cd ufc-news-hub
   git add -A
   git commit -m "fix: brief description of what was fixed"
   ```

## Important
- No test framework exists — rely on lint, typecheck, and build
- If stuck after 3 attempts, STOP and document what failed
- Check for related issues in adjacent code while fixing
