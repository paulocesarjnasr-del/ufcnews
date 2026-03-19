# Arena Home Redesign — Spec

**Date:** 2026-03-18
**Status:** Draft
**Goal:** Redesign the logged-in Arena Home (`/arena`) with 3 distinct states, a live ranking component, and a cleaner information hierarchy focused on driving user action.

---

## Context

The Arena is pivoting from B2C to B2B (sold to UFC creators/influencers). The logged-in Home must guide followers to make picks immediately. The current implementation has 9 sections with no clear hierarchy, confusing first-time users and burying the primary CTA.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Ranking type | Global (pontos_totais) | Stable, accumulated across events |
| "New user" detection | `total_previsoes === 0` | Simple, accurate, data already in auth |
| Empty ligas behavior | Show CTA if user has >= 1 pick | Drives viralidade without distracting new users |
| Implementation approach | Component extraction (Approach B) | Small focused files, LiveRanking reusable for Ao Vivo |

## Architecture

### State Machine

```
HomeLogado controller
  ├── total_previsoes === 0         → HomeNew
  ├── allDone (picks === totalLutas) → HomeComplete
  └── default                       → HomeInProgress
```

### New Files

```
src/components/arena/
├── HomeNew.tsx           ~80 lines
├── HomeInProgress.tsx    ~120 lines
├── HomeComplete.tsx      ~100 lines
├── LiveRanking.tsx       ~90 lines
├── MinhasLigas.tsx       ~70 lines
└── UserStats.tsx         ~30 lines

src/hooks/
└── useEventoPicks.ts     ~40 lines
```

### Modified Files

```
src/app/arena/page.tsx                    — rewrite HomeLogado as thin controller, delete FightTicker, delete old HomeLogado
src/app/api/arena/analytics/ranking/route.ts — add limit, include_user_id, total_participantes
```

### Deleted Code

- `FightTicker` component + `generateTickerMessages` function (distractive, no action)
- Solo/Com Amigos cards (premature decision for new users)
- 3-icon footer (Evento, Analises, Ligas) — duplicates BottomNav
- "Picks feitos" dimmed list (noise)
- Inline picks fetch logic in HomeLogado (extracted to hook)

---

## Component Specs

### HomeNew

**Trigger:** `usuario.total_previsoes === 0`

**Sections (top to bottom):**
1. Event header — EventoNome + local + Countdown (bg-black/60 backdrop-blur card)
2. Welcome card — "Bem-vindo a Arena!" + "Preveja o resultado de cada luta e ganhe pontos se acertar"
3. CTA — "Comecar Agora" bg-ufc-red, subtitle "X lutas no card"
4. Scoring pills — 3-col grid: "+100 acerto", "+50 metodo", "+50 round"
5. LiveRanking — top 3, read-only (user not in ranking yet)

**No event fallback:** Title "Arena UFC", subtitle "Fique ligado para o proximo card", LiveRanking only.

**Excluded:** Stats (all zero), ligas (no picks yet), ticker, Solo/Com Amigos.

### HomeInProgress

**Trigger:** `total_previsoes > 0` AND `picksCount < totalLutas`

**Sections (top to bottom):**
1. Event header — same compact card, or "Ao Vivo" badge if live
2. Progress + CTA block:
   - Visual progress bar with "7/11 picks"
   - Button "Completar Palpites — 4 lutas restantes" (bg-ufc-red, animate-pulse-red)
   - Next unpicked fight preview: extends existing `FightPreview` component with optional `showDetails?: boolean` prop that adds `categoria_peso` and rounds below the names, plus larger avatars. No new component needed. Clickable to `/arena/evento/[id]`
3. LiveRanking — top 3 + user position highlighted with star
4. MinhasLigas — liga cards or CTA "Crie uma liga" (showCtaIfEmpty because picksCount > 0)
5. UserStats — compact line: "1.200 pts . 67% acc . 3 streak"

**No event fallback:** "Nenhum evento agendado", LiveRanking, MinhasLigas, UserStats.

### HomeComplete

**Trigger:** `picksCount >= totalLutas` AND `totalLutas > 0`

**Sections (top to bottom):**
1. Event header — same compact card with countdown or "Ao Vivo"
2. Celebration card — Trophy icon, "Card Completo!", "11/11 picks . 2.200 pts possiveis", outline button "Ver/Editar Previsoes"
3. Virality card — Share icon, "Desafie seus amigos!", "Crie uma liga e veja quem acerta mais". Two buttons: "Criar Liga" + "Copiar Link"
4. LiveRanking — top 3 + user position
5. MinhasLigas — if has leagues, show them

**Excluded:** Stats (user knows them), progress bar (100%), picks list (accessible via edit).

### LiveRanking

**Props:**
```typescript
interface LiveRankingProps {
  limit?: number;           // default 3
  highlightUserId?: string; // logged-in user ID
  showTotal?: boolean;      // show "230 participantes" footer (default true)
}
```

**Data source:** `GET /api/arena/analytics/ranking?limit=3&include_user_id=X`

**Rendering:**
- Header: "Ranking" + "ver tudo ->" link
- #1 with gold medal, #2 silver medal, #3 bronze medal
- If user not in top N: dotted separator + "#45 star gabz — 800 pts" with bg highlight
- If user in top N: highlight inline
- Footer: "230 participantes"

**Cache:** SWR, refreshInterval 30s.

**Loading:** Shimmer skeleton matching component height. **Error:** Hidden (fail silently, section disappears).

### MinhasLigas

**Props:**
```typescript
interface MinhasLigasProps {
  showCtaIfEmpty?: boolean;
}
```

**Data source:** `GET /api/arena/ligas?tipo=minhas`

**Has leagues:** Header "Suas Ligas". Horizontal scroll of cards: liga `nome` + "#`minha_posicao` de `total_membros`". Last card: "+ Criar Liga". Auth is assumed (component only renders inside HomeLogado).

**No leagues + showCtaIfEmpty:** Card with Users icon, "Crie uma liga e desafie amigos", button to `/arena/ligas/criar`.

**Loading:** Shimmer skeleton matching component height. **Error:** Hidden (fail silently, section disappears).

### UserStats

**Props:** None (reads from useArenaAuth)

**Rendering:** Single line: `Trophy 1.200 pts . Target 67% acc . Flame 3 streak`. Colors: gold, green, orange. text-sm, compact.

---

## API Changes

### GET /api/arena/analytics/ranking

**New query params:**
- `limit` (number, default 50) — max rows in top ranking
- `include_user_id` (string, optional) — if this user is not in the top N, append them with their calculated position

**New response shape:**
```typescript
{
  ranking: Array<{
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    nivel: string;
    pontos_totais: number;
    previsoes_corretas: number;
    total_previsoes: number;
    taxa_acerto: number;
    posicao: number;
  }>;
  user_position?: {           // only if include_user_id provided and user not in top N
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    nivel: string;
    pontos_totais: number;
    previsoes_corretas: number;
    total_previsoes: number;
    taxa_acerto: number;
    posicao: number;
  } | null;
  total_participantes: number;  // COUNT of users with >= 1 prediction
}
```

**SQL approach:** Use window function `ROW_NUMBER() OVER (ORDER BY pontos_totais DESC)` for position. Subquery for user position if not in top N. COUNT for total. Add `avatar_url` to the SELECT (column exists in `usuarios_arena` but is currently omitted from the ranking query).

**`include_user_id` edge case:** If the user has `total_previsoes === 0` (no scored predictions), they fail the `WHERE total_previsoes > 0` filter. In this case, `user_position` returns `null`. The `LiveRanking` component handles this gracefully — in `HomeNew` the user is not highlighted; in `HomeInProgress`/`HomeComplete` the user will have >= 1 prediction so the subquery works.

### New Hook: useEventoPicks

```typescript
// src/hooks/useEventoPicks.ts
function useEventoPicks(eventoId: string | undefined): {
  picks: Record<string, string>;  // lutaId -> vencedorId
  picksLoading: boolean;
}
```

Wraps existing fetch logic from HomeLogado into a reusable SWR hook. Key: `evento-picks-${eventoId}`. When `eventoId` is undefined, returns `{ picks: {}, picksLoading: false }` without fetching.

---

## What Gets Removed from arena/page.tsx

1. `FightTicker` component (~45 lines)
2. `generateTickerMessages` function (~58 lines)
3. Old `HomeLogado` function (~280 lines)
4. Inline picks fetch logic (moved to hook)

## What Stays in arena/page.tsx

1. Types (Lutador, Luta, Evento)
2. Helpers (tipoOrder, sortLutas, sobrenome)
3. `OctagonTexture` component
4. `Countdown` component
5. `EventoNome` component
6. `FightPreview` component
7. `HomeLanding` (not-logged-in page)
8. New thin `HomeLogado` controller (~30 lines)
9. Main `ArenaPage` export

---

## No Database Changes

All data already exists. Only the ranking API response shape changes.
