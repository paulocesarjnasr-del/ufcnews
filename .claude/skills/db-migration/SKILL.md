---
name: db-migration
description: Safe database migration workflow for UFC News Hub
---

# Database Migration: $ARGUMENTS

## Context

UFC News Hub uses a **dual DB pattern**:
- **Raw SQL** via `src/lib/db.ts` — most routes
- **Prisma** via `src/lib/prisma.ts` — AI company system

Schema source of truth: `ufc-news-hub/prisma/schema.prisma`
All table/column names are in **Portuguese**.

## Steps

### 1. Plan the migration
- What tables/columns are changing?
- Will this break existing API routes using raw SQL?
- Will this break Prisma queries?
- Is the migration reversible?

### 2. Modify the Prisma schema
Edit `ufc-news-hub/prisma/schema.prisma`:
- Use Portuguese for table/column names
- Add `@@index` for columns used in WHERE/ORDER BY
- Add `@@map("nome_da_tabela")` for mapping model names

### 3. Generate and review the migration
```bash
cd ufc-news-hub
npx prisma migrate dev --name descricao_da_mudanca
```
- Review the generated SQL in `prisma/migrations/`
- Verify it won't drop data or break constraints

### 4. Regenerate the Prisma client
```bash
cd ufc-news-hub
npx prisma generate
```

### 5. Update raw SQL queries
Search for affected tables/columns in raw SQL:
```bash
grep -rn "nome_da_tabela\|nome_da_coluna" src/ --include="*.ts"
```
Update all `query()` and `queryOne()` calls to match new schema.

### 6. Update TypeScript types
- Check `src/types/` for affected type definitions
- Update interfaces to match new schema

### 7. Verify everything
```bash
cd ufc-news-hub
npx prisma generate       # Regenerate client
npm run lint              # Lint check
npx tsc --noEmit          # Type check
npm run build             # Build check
```

### 8. Test data integrity
```sql
-- Run against local DB to verify migration
SELECT COUNT(*) FROM nova_tabela;
SELECT * FROM tabela_modificada LIMIT 5;
```

## Safety Rules
- **NEVER** drop columns/tables without confirming with the user
- **NEVER** modify existing migrations that are already committed
- **ALWAYS** back up data before destructive migrations: `pg_dump`
- **ALWAYS** update BOTH raw SQL queries AND Prisma usage
- For production: use `npx prisma migrate deploy` (not `dev`)

## Common Table Names Reference
| Table | Purpose |
|-------|---------|
| `noticias` | News articles |
| `lutadores` | Fighters |
| `eventos` | Events |
| `lutas` | Fights |
| `comentarios` | Comments |
| `analises` | AI fight analyses |
| `previsoes` | User predictions |
| `usuarios_arena` | Gamification users |
| `agents` | AI company agents |
| `agent_tasks` | Agent task queue |
| `approvals` | Approval workflow |
