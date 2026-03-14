# Arena v2 — M7: Analytics & Stats Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an analytics page with accuracy history per event (line chart), method distribution (donut), and global ranking.

**Architecture:** 3 new API endpoints (historico, metodos, ranking) doing aggregate queries on existing tables. 3 new chart components. 1 new page at `/arena/analytics`. Charts use CSS-only (no recharts dependency to keep bundle light for casuals).

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, raw SQL, CSS-only charts

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (section M7)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/api/arena/analytics/historico/route.ts` | CREATE | Accuracy per event for logged user |
| `src/app/api/arena/analytics/metodos/route.ts` | CREATE | Method distribution (KO/Sub/Dec) |
| `src/app/api/arena/analytics/ranking/route.ts` | CREATE | Global ranking top 50 |
| `src/components/arena/AccuracyHistory.tsx` | CREATE | Bar chart of accuracy per event |
| `src/components/arena/MethodDistribution.tsx` | CREATE | Donut chart of methods |
| `src/components/arena/GlobalRanking.tsx` | CREATE | Ranked user list |
| `src/app/arena/analytics/page.tsx` | CREATE | Analytics page combining all 3 |

---

### Task 1: Create 3 analytics APIs

**Files:**
- Create: `src/app/api/arena/analytics/historico/route.ts`
- Create: `src/app/api/arena/analytics/metodos/route.ts`
- Create: `src/app/api/arena/analytics/ranking/route.ts`

**historico:** Returns per-event accuracy for the logged user.
```sql
SELECT ep.evento_id, e.nome, e.data_evento,
       ep.pontos_totais, ep.acertos, ep.total_lutas
FROM evento_pontuacao ep
JOIN eventos e ON e.id = ep.evento_id
JOIN usuarios_arena u ON u.id = ep.usuario_id
WHERE u.id = $1
ORDER BY e.data_evento ASC
LIMIT 20
```

**metodos:** Returns method distribution of correct predictions.
```sql
SELECT
  CASE
    WHEN l.metodo::text LIKE 'KO%' OR l.metodo::text LIKE 'TKO%' THEN 'KO/TKO'
    WHEN l.metodo::text = 'Submission' THEN 'Submission'
    WHEN l.metodo::text LIKE 'Decision%' THEN 'Decision'
    ELSE 'Outro'
  END as metodo_grupo,
  COUNT(*)::int as total
FROM previsoes p
JOIN lutas l ON l.id = p.luta_id
WHERE p.usuario_id = $1
  AND p.acertou_vencedor = true
GROUP BY metodo_grupo
```

**ranking:** Global ranking, computed from usuarios_arena.
```sql
SELECT u.id, u.username, u.display_name, u.avatar_url, u.nivel,
       u.pontos_totais, u.previsoes_corretas, u.total_previsoes,
       CASE WHEN u.total_previsoes > 0
         THEN ROUND(u.previsoes_corretas::numeric / u.total_previsoes * 100, 1)
         ELSE 0 END AS taxa_acerto,
       ROW_NUMBER() OVER (ORDER BY u.pontos_totais DESC) as posicao
FROM usuarios_arena u
WHERE u.total_previsoes > 0
ORDER BY u.pontos_totais DESC
LIMIT 50
```

Auth: historico + metodos require auth (`getUsuarioAtual()` 0 args). ranking is public.

- [ ] **Step 1: Create all 3 routes**
- [ ] **Step 2: Commit**

---

### Task 2: Create chart components

**Files:**
- Create: `src/components/arena/AccuracyHistory.tsx`
- Create: `src/components/arena/MethodDistribution.tsx`
- Create: `src/components/arena/GlobalRanking.tsx`

**AccuracyHistory:** CSS-only bar chart. Each event = one bar. Height = accuracy %. Color = ufc-red. Label = event name below. Shows accuracy % on hover/top.

**MethodDistribution:** CSS-only donut using conic-gradient. 3 segments: KO/TKO (red), Submission (blue), Decision (yellow). Legend below.

**GlobalRanking:** Numbered list. Top 3 get gold/silver/bronze. Each row: position, username, points, accuracy. Current user highlighted. Paginated view (show top 50).

All fetch their own data from the APIs above.

- [ ] **Step 1: Create all 3 components**
- [ ] **Step 2: Commit**

---

### Task 3: Create /arena/analytics page

**Files:**
- Create: `src/app/arena/analytics/page.tsx`

Client component that renders all 3 chart components. Auth-gated: if not logged in, show message to login.

```tsx
'use client';

import { useArenaAuth } from '@/hooks/useArenaAuth';
import { AccuracyHistory } from '@/components/arena/AccuracyHistory';
import { MethodDistribution } from '@/components/arena/MethodDistribution';
import { GlobalRanking } from '@/components/arena/GlobalRanking';

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useArenaAuth();
  // ... loading/auth states
  // Render 3 sections: Historico, Metodos, Ranking Global
}
```

- [ ] **Step 1: Create page**
- [ ] **Step 2: Lint + typecheck**
- [ ] **Step 3: Commit**
