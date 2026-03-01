# CLAUDE.md — UFC News Hub

> Plataforma de agregação de notícias UFC em Português com gamificação e sistema multi-agente de IA.

## Quick Reference

```bash
cd ufc-news-hub && npm run dev      # Dev server :3010
cd ufc-news-hub && npm run build    # Production build
cd ufc-news-hub && npm run lint     # ESLint
cd ufc-news-hub && npx tsc --noEmit # Type-check (no test framework)
```

## Shortcuts

| Alias | Meaning |
|-------|---------|
| **QPLAN** | Analyze codebase, draft implementation plan, list pros/cons. Confirm before coding. |
| **QCODE** | Implement the plan. Run `npm run lint` and `npx tsc --noEmit` after. |
| **QCHECK** | Act as skeptical senior engineer. Review all changes for bugs, security, performance. |
| **QFIX** | Diagnose the error, fix it, verify with lint + typecheck. |
| **QGIT** | Stage changes, write conventional commit message, commit. |
| **QPERF** | Audit: bundle size, DB query count, missing indexes, N+1 queries. |
| **QSEC** | Security audit: auth gaps, SQL injection, exposed secrets, XSS. |

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **Tailwind CSS 3**
- **Prisma 7** with `@prisma/adapter-pg` → generated to `src/generated/prisma`
- **Vercel AI SDK v6** (`ai` + `@ai-sdk/anthropic`) — uses `inputSchema` + `zodSchema()`, NOT `parameters`
- **SWR** for client data fetching (no Redux/Zustand)
- **Cheerio** + **RSS Parser** + **Playwright** for scraping
- Path alias: `@/*` → `./src/*`

## Rules (RFC 2119)

### MUST
- **R-1** All DB table/column names in **Portuguese** (noticias, lutadores, eventos, lutas, etc.)
- **R-2** Use `query<T>()` / `queryOne<T>()` from `src/lib/db.ts` for raw SQL; Prisma for AI company system
- **R-3** Use `zodSchema()` wrapper for AI tool `inputSchema` — never bare `z.object()`
- **R-4** Run `npm run lint` + `npx tsc --noEmit` before considering work done
- **R-5** Use `Promise.all()` for parallel DB queries; add `Cache-Control` headers on API responses
- **R-6** Follow neumorphism dark-mode design: `neu-card`, `neu-button`, `neu-inset`, `neu-card-hover`

### SHOULD
- **R-7** Keep API routes thin — business logic in `src/lib/`
- **R-8** Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`
- **R-9** Plan before coding for changes touching >3 files

### MUST NOT
- **R-10** Never use `any` type — use `unknown` + type guards
- **R-11** Never commit `.env` files or hardcode secrets
- **R-12** Never modify Prisma migrations after they're committed
- **R-13** Never use `@ts-ignore` — fix the type properly

## Architecture

See @ufc-news-hub/src/lib/db.ts for raw SQL pattern.
See @ufc-news-hub/prisma/schema.prisma for full schema.
See @ufc-news-hub/src/lib/ai-company/orchestrator.ts for CEO agent.

### Dual DB Access
1. **Raw SQL** — `src/lib/db.ts` → `query<T>()`, `queryOne<T>()`, `transaction()` (PG Pool, max 20)
2. **Prisma Client** — `src/lib/prisma.ts` → AI company system + admin routes

### Key Directories
```
ufc-news-hub/src/
├── app/            # Pages + API routes (~69 endpoints)
│   ├── api/        # noticias/, lutadores/, eventos/, lutas/, analises/, company/, admin/
│   └── (pages)     # /, /lutadores, /lutas, /analises, /calendario, /backstage, /admin
├── components/     # ui/, admin/, arena/, analise/, calendario/, lutadores/, comments/, houston/
├── hooks/          # useNoticias, useArenaAuth, useComentarios, useEventos, useLutadores...
├── lib/            # db.ts, prisma.ts, rss-parser.ts, ai-company/, arena/, admin/
│   └── ai-company/ # orchestrator.ts, agents/, tools/, event-bus.ts, xp-engine.ts, cost-guard.ts
├── generated/prisma # Prisma client output
└── types/          # TypeScript type definitions
```

### AI Company System (14 agents)
- **Hierarchy**: `executive` → `director` → `agent` (field: `Agent.level`)
- **XP System**: `agentLevel` 1-4 (Trainee→Lead) — NOT the same as hierarchy `level`
- **SSE events**: `ceo_thinking`, `task_created`, `agent_start`, `agent_tool_call`, `agent_done`, `approval_needed`, `done`
- **Tools**: 30+ tools in `src/lib/ai-company/tools/index.ts` using `zodSchema()` wrapper
- **Approval workflow**: tasks can require admin approval; 3s polling, 30min timeout

### Auth
- **Admin**: HMAC tokens in `src/lib/admin-sessions.ts` → `requireAdmin(request)`, 8h TTL
- **Arena**: separate token auth via `useArenaAuth` hook
- ⚠️ Some admin routes may lack auth — always verify

### Design System
- Dark-mode only, **neumorphism** styling
- CSS: `neu-card`, `neu-button`, `neu-inset`, `neu-card-hover`
- Colors: `ufc.red`, `ufc.gold`, `dark.bg`, `dark.card`, `dark.border`, `dark.text`
- Fonts: **Bebas Neue** (headings), **Inter** (body)
- Animations: `pulse-red`, `slide-up`, `fade-in`, `shimmer`, `flip-down`

### Domain Values (Portuguese)
- **News categories**: `lutadores`, `lutas`, `backstage`
- **Event statuses**: `agendado`, `ao_vivo`, `finalizado`, `cancelado`
- **Arena levels**: `iniciante` → `amateur` → `contender` → `challenger` → `elite` → `champion` → `legend`
- **Agent task statuses**: `pending`, `running`, `completed`, `failed`, `awaiting_approval`

## Gotchas ⚠️

1. **`zodSchema()` wrapper** — AI SDK v6 requires `inputSchema: zodSchema(z.object({...}))`, NOT `parameters: z.object({...})`. Claude gets this wrong constantly.
2. **`level` vs `agentLevel`** — `level` = hierarchy string (executive/director/agent). `agentLevel` = XP level int (1-4). Mixing these up breaks the AI company system.
3. **No test framework** — There are NO automated tests. Verify with `lint` + `tsc --noEmit` + manual testing.
4. **Prisma output path** — Client generated to `src/generated/prisma`, not the default location. Imports: `import { PrismaClient } from '@/generated/prisma'`.
5. **Port 3010** — Dev server runs on 3010, not 3000. Some scripts hardcode `localhost:3010`.
6. **Global Pool singleton** — `src/lib/db.ts` uses `globalThis` pattern to avoid multiple pools in dev. Don't create new Pool instances.
7. **Image domains** — 17 remote hosts configured in `next.config.js`. New image sources need to be added there.
8. **Default admin password** — `ADMIN_PASSWORD` defaults to `ufc-admin-2024` if not set. Security risk.

## Workflow

1. **Plan** → Use QPLAN for anything non-trivial
2. **Implement** → Small incremental changes, run QCODE
3. **Verify** → `npm run lint && npx tsc --noEmit && npm run build`
4. **Commit** → QGIT with conventional commit message

### When Stuck (3 Attempts Rule)
**CRITICAL**: After 3 failed attempts at the same problem → **STOP**.
1. Document what was tried and what failed
2. List what you think the root cause is
3. Suggest alternative approaches
4. Ask the user for guidance

## Environment Variables

**Required**: `DATABASE_URL`, `ANTHROPIC_API_KEY`
**Optional**: `ADMIN_PASSWORD` (default: `ufc-admin-2024`), `RSS_FEED_URL`, `SYNC_INTERVAL_MINUTES`, `CRON_SECRET`

## Modular Rules

See @.claude/rules/code-style.md for TypeScript conventions.
See @.claude/rules/api-conventions.md for API route patterns.
See @.claude/rules/frontend-react.md for component patterns.
See @.claude/rules/ai-company.md for AI agent system.
See @.claude/rules/database.md for dual DB pattern.
