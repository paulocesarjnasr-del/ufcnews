# Arena v2 — M6: Live & Resultados Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a live event experience where users see fight results appear in real-time (polling 15-30s), see if they got their picks right, and watch the leaderboard update as the event progresses.

**Architecture:** (1) Add `ao_vivo` status detection in sync-eventos (time-based: event is live when current time is between `horario_prelims` and last fight finished). (2) Create `/arena/live` page that polls `/api/eventos/[id]/live` (already exists) every 15s. (3) Add scoring trigger after each fight finishes in the cron, not just after the whole event. (4) Update `useProximoEvento` to detect `ao_vivo` events.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, polling, raw SQL

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (section M6)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/api/sync-eventos/route.ts` | MODIFY | Add ao_vivo status detection (time-based) |
| `src/app/arena/live/page.tsx` | CREATE | Live event page with polling |
| `src/components/arena/LiveResultCard.tsx` | CREATE | Individual fight result card (correct/wrong) |
| `src/components/arena/LiveLeaderboard.tsx` | CREATE | Event leaderboard component |
| `src/app/api/arena/live/route.ts` | CREATE | Aggregated live data (results + picks + leaderboard) |
| `src/app/api/arena/cron/scoring/route.ts` | MODIFY | Add per-fight scoring (not just per-event) |
| `src/hooks/useProximoEvento.ts` | MODIFY | Query ao_vivo events too |

---

### Task 1: Add ao_vivo detection to sync-eventos

**Files:**
- Modify: `src/app/api/sync-eventos/route.ts`

**Context:** Currently event status goes from `agendado` directly to `finalizado`. Need intermediate `ao_vivo` state.

**Logic:** After syncing an event, check:
- If `status = 'agendado'` AND `data_evento <= NOW() + 1h` (event started or about to start): set `ao_vivo`
- If `status = 'ao_vivo'` AND all fights have `status = 'finalizada'`: set `finalizado`
- The existing `checkAndUpdateEventStatus` function already checks fight completion

Find the section where event status is determined (around line 134-140 where it does date comparison) and add ao_vivo logic.

Add this function or inline logic:
```typescript
// Determine event status based on time and fight completion
function determineEventStatus(
  dataEvento: Date,
  now: Date,
  allFightsFinalized: boolean,
  hasSomeFinalizedFights: boolean
): 'agendado' | 'ao_vivo' | 'finalizado' {
  if (allFightsFinalized && dataEvento < now) return 'finalizado';
  if (hasSomeFinalizedFights || (dataEvento <= new Date(now.getTime() + 3600000))) {
    // Event has started (some fights done) or starts within 1h
    if (dataEvento < now) return 'ao_vivo';
  }
  return 'agendado';
}
```

Also update the UPDATE query for eventos to use the new status logic.

- [ ] **Step 1: Read sync-eventos and add ao_vivo detection**
- [ ] **Step 2: Verify compiles**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat(arena): add ao_vivo event status detection in sync-eventos"
```

---

### Task 2: Update useProximoEvento to find ao_vivo events

**Files:**
- Modify: `src/hooks/useProximoEvento.ts`

**Change:** Add a second SWR call that checks for ao_vivo events. The simplest approach: modify the hook to first check for ao_vivo, then fall back to agendado.

```typescript
// Add a second fetch for live events
const { data: liveEvento } = useSWR<ProximoEvento | null>(
  '/api/eventos/proximo?status=ao_vivo',
  fetcher,
  { refreshInterval: 30000, onError: () => {} }
);

// Live event takes priority
const evento = liveEvento ?? agendadoEvento;
const isAoVivo = !!liveEvento;
```

BUT: the `/api/eventos/proximo` API only queries `status = 'agendado'`. We need to modify it to accept a `?status=` param OR create a simpler endpoint.

**Pragmatic approach:** Modify `/api/eventos/proximo` to accept `?include_live=true` which also includes `ao_vivo` events (prioritized over agendado).

Modify the SQL in `/api/eventos/proximo/route.ts`:
```sql
-- Old:
WHERE e.status = 'agendado' AND e.data_evento > NOW()

-- New (when include_live=true):
WHERE e.status IN ('agendado', 'ao_vivo')
ORDER BY CASE WHEN e.status = 'ao_vivo' THEN 0 ELSE 1 END, e.data_evento ASC
LIMIT 1
```

Then update useProximoEvento to use `?include_live=true`.

- [ ] **Step 1: Modify /api/eventos/proximo to support include_live**
- [ ] **Step 2: Update useProximoEvento hook**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat(arena): detect ao_vivo events in useProximoEvento hook"
```

---

### Task 3: Create live data API

**Files:**
- Create: `src/app/api/arena/live/route.ts`

**Context:** `/api/eventos/[id]/live` already exists but returns raw fight data. We need a higher-level endpoint that combines: fight results + user's picks + event leaderboard.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function GET(request: NextRequest) {
  const eventoId = request.nextUrl.searchParams.get('evento_id');
  if (!eventoId) {
    return NextResponse.json({ error: 'evento_id obrigatorio' }, { status: 400 });
  }

  try {
    const usuario = await getUsuarioAtual();

    // 1. Fight results
    const lutas = await query<{
      id: string; ordem: number; tipo: string; status: string;
      vencedor_id: string | null; metodo: string | null;
      round_final: number | null; tempo_final: string | null;
      lutador1_id: string; lutador1_nome: string;
      lutador2_id: string; lutador2_nome: string;
    }>(
      `SELECT l.id, l.ordem, l.tipo, l.status,
              l.vencedor_id, l.metodo::text, l.round_final, l.tempo_final,
              l.lutador1_id, l1.nome as lutador1_nome,
              l.lutador2_id, l2.nome as lutador2_nome
       FROM lutas l
       JOIN lutadores l1 ON l1.id = l.lutador1_id
       JOIN lutadores l2 ON l2.id = l.lutador2_id
       WHERE l.evento_id = $1
       ORDER BY l.ordem DESC`,
      [eventoId]
    );

    // 2. User's picks (if authenticated)
    let userPicks: Record<string, {
      vencedor_previsto_id: string;
      acertou_vencedor: boolean | null;
      pontos_ganhos: number;
    }> = {};

    if (usuario) {
      const picks = await query<{
        luta_id: string;
        vencedor_previsto_id: string;
        acertou_vencedor: boolean | null;
        pontos_ganhos: number;
      }>(
        `SELECT luta_id, vencedor_previsto_id, acertou_vencedor, pontos_ganhos
         FROM previsoes WHERE evento_id = $1 AND usuario_id = $2`,
        [eventoId, usuario.id]
      );
      for (const p of picks) {
        userPicks[p.luta_id] = p;
      }
    }

    // 3. Leaderboard (top 20)
    const leaderboard = await query<{
      usuario_id: string; username: string; display_name: string | null;
      pontos_totais: number; acertos: number; total_lutas: number;
    }>(
      `SELECT ep.usuario_id, u.username, u.display_name,
              ep.pontos_totais, ep.acertos, ep.total_lutas
       FROM evento_pontuacao ep
       JOIN usuarios_arena u ON u.id = ep.usuario_id
       WHERE ep.evento_id = $1
       ORDER BY ep.pontos_totais DESC
       LIMIT 20`,
      [eventoId]
    );

    // 4. Event info
    const evento = await queryOne<{ nome: string; status: string }>(
      `SELECT nome, status FROM eventos WHERE id = $1`,
      [eventoId]
    );

    const finalizadas = lutas.filter(l => l.status === 'finalizada').length;

    return NextResponse.json({
      evento_nome: evento?.nome,
      evento_status: evento?.status,
      lutas_finalizadas: finalizadas,
      total_lutas: lutas.length,
      lutas,
      user_picks: userPicks,
      leaderboard,
      meu_usuario_id: usuario?.id || null,
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('[API /arena/live] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 1: Create route**
- [ ] **Step 2: Commit**
```bash
git commit -m "feat(arena): create aggregated live data API"
```

---

### Task 4: Create LiveResultCard + LiveLeaderboard components

**Files:**
- Create: `src/components/arena/LiveResultCard.tsx`
- Create: `src/components/arena/LiveLeaderboard.tsx`

LiveResultCard: shows a finished fight with result + if user's pick was correct (green/red).
LiveLeaderboard: ranked list of users by event points.

- [ ] **Step 1: Create both components**
- [ ] **Step 2: Commit**

---

### Task 5: Create /arena/live page

**Files:**
- Create: `src/app/arena/live/page.tsx`

**Features:**
- Header: "AO VIVO — [Event Name]" with red pulse dot
- Polls `/api/arena/live?evento_id=X` every 15s (pauses when tab hidden)
- Shows: lutas finalizadas count, list of LiveResultCards, LiveLeaderboard
- If no event ao_vivo: show "Nenhum evento ao vivo. Proximo: [name] em [countdown]"
- Uses `useProximoEvento` to get the live event ID

- [ ] **Step 1: Create page**
- [ ] **Step 2: Commit**

---

### Task 6: Add per-fight scoring trigger to cron

**Files:**
- Modify: `src/app/api/arena/cron/scoring/route.ts`

**Change:** Currently only processes events where ALL predictions are unprocessed. For live scoring, we need to process individual fights as they finish.

Add a second check: find fights that are `finalizada` with `vencedor_id IS NOT NULL` that have unprocessed predictions, even if the event isn't fully done yet.

```sql
-- Find individual fights with unprocessed predictions
SELECT DISTINCT l.id as luta_id, l.evento_id
FROM lutas l
JOIN previsoes p ON p.luta_id = l.id
WHERE l.status = 'finalizada'
  AND l.vencedor_id IS NOT NULL
  AND p.processada = false
```

Then call `processarPrevisoesLuta(lutaId)` for each.

After all individual fights processed, check if all fights of the event are done → if yes, run `atualizarPontuacaoEvento()` + `verificarCardPerfeito()` + `atualizarRankingsLigas()`.

- [ ] **Step 1: Modify cron route**
- [ ] **Step 2: Commit**

---

### Task 7: Lint + integration test

- [ ] **Step 1:** `npm run lint && npx tsc --noEmit`
- [ ] **Step 2:** Start dev server, verify `/arena/live` loads
- [ ] **Step 3:** Verify scoring cron processes individual fights
