---
paths:
  - "prisma/**"
  - "src/lib/db.ts"
  - "src/lib/prisma.ts"
---

# Database Rules

## Dual DB Pattern

| Layer | Import | When to Use |
|-------|--------|-------------|
| Raw SQL | `import { query, queryOne, transaction } from '@/lib/db'` | Most API routes, performance-critical queries |
| Prisma | `import { prisma } from '@/lib/prisma'` | AI company system, complex relations, admin operations |

**MUST NOT** create new Pool instances — use the global singleton in `db.ts`.

## Raw SQL Pattern
```typescript
// Read many
const noticias = await query<Noticia>(
  'SELECT id, titulo, categoria FROM noticias WHERE status = $1 ORDER BY created_at DESC LIMIT $2',
  ['publicado', 20]
);

// Read one
const lutador = await queryOne<Lutador>(
  'SELECT * FROM lutadores WHERE id = $1',
  [id]
);

// Transaction
const result = await transaction(async (client) => {
  await client.query('UPDATE eventos SET status = $1 WHERE id = $2', ['finalizado', eventoId]);
  await client.query('INSERT INTO atividades (usuario_id, tipo, titulo) VALUES ($1, $2, $3)', [userId, 'evento', 'Evento finalizado']);
  return { success: true };
});
```

**MUST** always use parameterized queries (`$1, $2, $3`).
**MUST NOT** use string interpolation in SQL.

## Table Names (Portuguese)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `noticias` | News articles | titulo, subtitulo, conteudo, categoria, fonte_nome, publicado_em, visualizacoes |
| `lutadores` | Fighters | nome, apelido, categoria_peso, pais, vitorias, derrotas, empates |
| `eventos` | Events | nome, data, local, status (agendado/ao_vivo/finalizado/cancelado) |
| `lutas` | Fights | evento_id, lutador1_id, lutador2_id, resultado, metodo |
| `analises` | AI analyses | slug, titulo, artigo_conteudo, tactical_breakdown (JSON), fight_prediction (JSON) |
| `comentarios` | Comments | noticia_id, autor_nome, autor_fingerprint, conteudo, status |
| `previsoes` | Predictions | usuario_id, luta_id, lutador_escolhido_id, confianca |
| `usuarios_arena` | Arena users | nome, email, fingerprint, nivel, pontos, vitorias, derrotas |
| `atividades` | Activities | usuario_id, tipo, titulo, descricao, dados (JSON) |
| `amizades` | Friendships | usuario_id, amigo_id, status (pendente/aceita/recusada) |

## AI Company Tables (Prisma)

| Model | Table | Key Fields |
|-------|-------|------------|
| `Agent` | `agents` | name, role, level, agentLevel, xp, status |
| `AgentTask` | `agent_tasks` | agentId, type, input, output, status |
| `Approval` | `approvals` | taskId, agentId, actionType, status |
| `AgentLog` | `agent_logs` | agentId, level, message |
| `AgentCostLog` | `agent_cost_logs` | agentId, tokensInput, tokensOutput, costUsd |
| `AgentEvent` | `agent_events` | type, payload, status |
| `CompanyPrompt` | `company_prompts` | prompt, ceoAnalysis, status |
| `PerformanceReview` | `performance_reviews` | agentId, weeklyScore, action |
| `RemediationPlan` | `remediation_plans` | analysis, actions, status |

## Schema Conventions
- All table names in Portuguese (except AI company models which use English in Prisma but map to Portuguese-ish table names)
- UUIDs for IDs (`@default(dbgenerated("uuid_generate_v4()"))`)
- Timestamps: `created_at`, `updated_at` with `@db.Timestamptz(6)`
- Indexes: prefix with `idx_` + table + column: `@@index([created_at(sort: Desc)], map: "idx_noticias_created")`
- Enums in Portuguese where applicable: `status_amizade`, etc.

## Prisma Client
- Generated to `src/generated/prisma` (NOT default location)
- Import: `import { PrismaClient } from '@/generated/prisma'`
- After schema changes: `npx prisma generate`
- Migrations: `npx prisma migrate dev --name descricao`
