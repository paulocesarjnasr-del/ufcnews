# Arena Restructure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the /arena section to fix UX issues: add global navigation, eliminate dashboard, simplify predictions UX with visual multiple-choice, add real-time live results, and GymRats-style leagues.

**Architecture:** Incremental refactor in 7 phases. Each phase is independently deployable. Shared Arena layout via `arena/layout.tsx`. All arena pages use the global Header + Arena sub-header. No DB schema changes needed.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 3, Lucide React icons, Cheerio (scraping), raw SQL via `query()`/`queryOne()` from `@/lib/db.ts`

**Key Constraints:**
- No test framework - verify with `npm run lint && npx tsc --noEmit`
- PRESERVE: Landing page (background + countdown + main event), OctagonPortalLayout (login/registro)
- Neumorphism: `neu-card`, `neu-button`, `neu-inset` classes
- Portuguese DB columns, Portuguese UI text
- Never use `any` type - use `unknown` + type guards
- Prisma output at `src/generated/prisma`, but arena uses raw SQL via `@/lib/db.ts`

**Design Doc:** `docs/plans/2026-03-01-arena-restructure-design.md`

---

## Phase 1: Navigation and Layout

### Task 1.1: Create Arena Layout

**Files:**
- Create: `src/app/arena/layout.tsx`

**Step 1: Create the shared arena layout**

This layout wraps ALL /arena/* pages. It renders the global `<Header />` plus a slim Arena sub-header with logo + avatar/login.

```tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface ArenaLayoutProps {
  children: ReactNode;
}

export default function ArenaLayout({ children }: ArenaLayoutProps) {
  const { usuario, isAuthenticated, isLoading, logout } = useArenaAuth();

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Global header with all site navigation */}
      <Header />

      {/* Arena sub-header */}
      <div className="sticky top-16 z-40 border-b border-dark-border/50 bg-dark-bg/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Arena logo */}
            <Link href="/arena" className="font-display text-lg uppercase tracking-wider">
              <span className="text-white">Arena</span>
              <span className="text-ufc-red ml-1">UFC</span>
            </Link>

            {/* XP bar + Avatar (when logged in) */}
            <div className="flex items-center gap-4">
              {isAuthenticated && usuario && (
                <div className="hidden sm:flex items-center gap-3">
                  {/* Mini XP bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-dark-textMuted font-medium">
                      {usuario.pontos_totais} pts
                    </span>
                  </div>
                </div>
              )}

              {/* Avatar / Login */}
              {!isLoading && (
                <UserAvatar usuario={usuario} onLogout={logout} />
              )}
              {isLoading && (
                <div className="w-10 h-10 rounded-full bg-dark-card animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`
Expected: No errors

**Step 3: Commit**

```
git add src/app/arena/layout.tsx
git commit -m "feat(arena): create shared layout with global header + arena sub-header"
```

---

### Task 1.2: Update Arena Landing Page to Use Layout

**Files:**
- Modify: `src/app/arena/page.tsx`

**Step 1: Remove the inline header from arena/page.tsx**

The layout now handles the header. Remove:
- The `<header>` element with ArenaMenu and UserAvatar (lines ~97-118)
- ArenaMenu import
- UserAvatar import (moved to layout)
- The `relative z-10` wrapper div that contained the header

Keep the background image section and main content EXACTLY as-is. The page should start with the background, then the `<main>` content.

**Key changes:**
- Remove: `import { ArenaMenu } from '@/components/arena/ArenaMenu'`
- Remove: `import { UserAvatar } from '@/components/arena/UserAvatar'`
- Keep: `useArenaAuth` (still needed for `isAuthenticated` check on CTA buttons)
- Remove: entire `<header>` block (lines ~97-118)
- Remove: the `<div className="relative z-10">` wrapper (keep its children)
- Change: "Ver Fight Card Completo" link from `/calendario/evento/${proximoEvento.id}` to `/arena/evento/${proximoEvento.id}`

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`
Expected: No errors

**Step 3: Manual test**

Open http://localhost:3010/arena
- Global header visible at top with all nav tabs (Home, Noticias, etc.)
- "Arena" tab highlighted in red
- Arena sub-header below with "Arena UFC" + avatar
- Background poster + countdown + main event UNCHANGED

**Step 4: Commit**

```
git add src/app/arena/page.tsx
git commit -m "refactor(arena): remove inline header, use shared layout"
```

---

### Task 1.3: Update UserAvatar Dropdown Options

**Files:**
- Modify: `src/components/arena/UserAvatar.tsx`

**Step 1: Clean up dropdown menu options**

Replace current menu items with clean Lucide-icon options:
- Import Lucide icons: `User, Trophy, History, ImageIcon, LogOut`
- Menu items (logged in): Meu Perfil, Minhas Ligas, Historico, Mudar Avatar, Sair
- Remove: "Configuracoes" link (page doesn't exist)
- Each item gets a Lucide icon

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/components/arena/UserAvatar.tsx
git commit -m "refactor(arena): clean up UserAvatar dropdown with Lucide icons"
```

---

### Task 1.4: Remove ArenaMenu Component

**Files:**
- Delete: `src/components/arena/ArenaMenu.tsx`
- Modify: Any files still importing ArenaMenu (check with grep)

**Step 1: Search for ArenaMenu usage**

Run: `grep -r "ArenaMenu" src/ --include="*.tsx" --include="*.ts" -l`

Remove all imports and usages. Files likely affected:
- `src/app/arena/perfil/avatar/page.tsx` (has its own header with ArenaMenu)

**Step 2: Update avatar page to remove ArenaMenu**

The avatar page has its own inline header with ArenaMenu. Remove the entire header section - the layout.tsx handles this now.

**Step 3: Delete ArenaMenu**

```bash
rm src/components/arena/ArenaMenu.tsx
```

**Step 4: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 5: Commit**

```
git add -A
git commit -m "refactor(arena): remove ArenaMenu, all pages use shared layout"
```

---

### Task 1.5: Update All Arena Sub-Pages to Use Layout

**Files to check and modify:**
- `src/app/arena/evento/[id]/page.tsx` - remove `<Header />` import and usage
- `src/app/arena/perfil/[username]/page.tsx` - remove `<Header />` import and usage
- `src/app/arena/perfil/avatar/page.tsx` - remove inline header entirely
- `src/app/arena/ligas/page.tsx` - check for Header usage
- `src/app/arena/ligas/criar/page.tsx` - check for Header usage
- `src/app/arena/ligas/[id]/page.tsx` - check for Header usage
- `src/app/arena/historico/page.tsx` - check for Header usage
- `src/app/arena/como-funciona/page.tsx` - check for Header usage

**Step 1: Search and remove duplicate headers**

Run: `grep -r "import.*Header" src/app/arena/ --include="*.tsx" -l`

For each file found, remove the `<Header />` component - the arena layout.tsx provides it.

Also check for files that have their own inline `<header>` elements (like avatar/page.tsx).

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Manual test**

Navigate to multiple arena pages - all should show global header + arena sub-header consistently.

**Step 4: Commit**

```
git add -A
git commit -m "refactor(arena): remove duplicate headers from all sub-pages"
```

---

## Phase 2: Eliminate Dashboard + Simplify Registration

### Task 2.1: Update Auth Redirects

**Files:**
- Modify: `src/app/arena/login/page.tsx` - change redirect from `/arena/dashboard` to `/arena`
- Modify: `src/app/arena/registro/page.tsx` - change redirect from `/arena/dashboard` to `/arena`

**Step 1: Update login page redirect**

In `login/page.tsx`, find the line `router.push('/arena/dashboard')` and change to `router.push('/arena')`.
Also find the `useEffect` that redirects authenticated users and change it.

**Step 2: Update registro page redirect**

In `registro/page.tsx`, same change: `router.push('/arena/dashboard')` to `router.push('/arena')`.

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 4: Commit**

```
git add src/app/arena/login/page.tsx src/app/arena/registro/page.tsx
git commit -m "fix(arena): redirect login/registro to /arena instead of /arena/dashboard"
```

---

### Task 2.2: Simplify Registration Form

**Files:**
- Modify: `src/app/arena/registro/page.tsx`

**Step 1: Remove "Nome de Exibicao" field**

Remove the form field block for `displayName` (lines ~133-147).
In `handleSubmit`, remove `formData.displayName || undefined` from the registro call - just pass `undefined`.

**Step 2: Remove "Por que criar uma conta?" card**

Delete the entire benefits card section (lines ~217-244), the `<div className="neu-card mt-6 p-6...">` block.

**Step 3: Clean up formData state**

Remove `displayName` from the `useState` initial value.

**Step 4: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 5: Manual test**

Open http://localhost:3010/arena/registro
- Only 4 fields: Username, Email, Senha, Confirmar Senha
- No "Nome de Exibicao" field
- No "Por que criar conta" card
- OctagonPortalLayout visual PRESERVED

**Step 6: Commit**

```
git add src/app/arena/registro/page.tsx
git commit -m "refactor(arena): simplify registration - remove display name and benefits card"
```

---

### Task 2.3: Delete Dashboard Page

**Files:**
- Delete: `src/app/arena/dashboard/page.tsx`

**Step 1: Check for links to dashboard**

Run: `grep -r "arena/dashboard" src/ --include="*.tsx" --include="*.ts" -l`

Update any remaining links to point to `/arena` instead of `/arena/dashboard`.

**Step 2: Delete dashboard**

```bash
rm src/app/arena/dashboard/page.tsx
```

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 4: Commit**

```
git add -A
git commit -m "refactor(arena): delete dashboard page, arena home is the dashboard"
```

---

## Phase 3: Fight Card Predictions UX

### Task 3.1: Update Fight Card Link

**Files:**
- Modify: `src/app/arena/page.tsx`

**Step 1: Change "Ver Fight Card" link**

Find the Link component with `href={/calendario/evento/${proximoEvento.id}}` and change to `href={/arena/evento/${proximoEvento.id}}`.

Note: This may have already been done in Task 1.2. Verify first.

**Step 2: Verify and commit if needed**

---

### Task 3.2: Rewrite PrevisaoForm with Visual Multiple Choice

**Files:**
- Rewrite: `src/components/arena/PrevisaoForm.tsx`

**Step 1: Rewrite the entire component**

Replace dropdown selects with visual button-based selection matching the LutadorOption pattern.

Key changes:
- Method selection: 3 `neu-button` pills (KO/TKO, Finalizacao, Decisao) instead of dropdown
- Round selection: numbered circle buttons (1-3 or 1-5) instead of dropdown
- Remove "Cancelar" button
- Remove "Pontos possiveis" summary card
- Single action button: "Confirmar Previsao"
- Add `slide-up` animation per section
- Use Lucide icons where appropriate
- Determine round count: if `luta.tipo === 'main_event' || luta.is_titulo` then 5 rounds, else 3

The LutadorOption sub-component can stay largely the same (it already has the visual selection pattern).

Simplified methods array:
```tsx
const METODOS = [
  { value: 'KO/TKO', label: 'KO/TKO', icon: Zap },
  { value: 'Submission', label: 'Finalizacao', icon: Lock },
  { value: 'Decision', label: 'Decisao', icon: Scale },
];
```

Method and round buttons should use the same selection pattern as fighters:
- Unselected: `neu-button border-2 border-dark-border bg-dark-bg text-dark-textMuted`
- Selected: `neu-button border-2 border-ufc-red bg-ufc-red/10 text-ufc-red`

API call stays to `POST /api/arena/previsoes` (the arena endpoint, not the old `/api/previsoes`).

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/components/arena/PrevisaoForm.tsx
git commit -m "feat(arena): rewrite PrevisaoForm with visual multiple-choice buttons"
```

---

### Task 3.3: Update LutaCard - Remove Tapology, Adjust Rounds

**Files:**
- Modify: `src/components/arena/LutaCard.tsx`

**Step 1: Remove Tapology link and function**

- Delete the `getTapologyUrl` function (lines 10-20)
- Remove the Tapology `<a>` link from `LutadorDisplay` component (lines 299-309)

**Step 2: Verify round display matches rule**

The header shows `luta.rounds` from DB. If DB is incorrect, the display rule should override:
- `luta.tipo === 'main_event' || luta.is_titulo` -> show "5 rounds"
- Everything else -> show "3 rounds"

Add computed rounds in LutaCard:
```tsx
const displayRounds = (luta.tipo === 'main_event' || luta.is_titulo) ? 5 : 3;
```

Use `displayRounds` in the header display instead of `luta.rounds`.

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 4: Commit**

```
git add src/components/arena/LutaCard.tsx
git commit -m "refactor(arena): remove Tapology links, fix round display rules"
```

---

### Task 3.4: Update Arena Event Page Layout

**Files:**
- Modify: `src/app/arena/evento/[id]/page.tsx`

**Step 1: Remove duplicate Header**

The layout handles the header now. Remove `<Header />` import and usage.

**Step 2: Update to use Arena auth instead of fingerprint**

Currently uses `useFingerprint` and `useUserName` (old system). Should use `useArenaAuth` instead.

Replace:
- `useFingerprint()` -> use `usuario?.id` from `useArenaAuth()`
- `useUserName()` -> use `usuario?.username` from `useArenaAuth()`
- Update API calls to use arena endpoints (`/api/arena/previsoes`)

**Step 3: Simplify prediction fetching**

Current code fetches predictions one-by-one in a loop. Change to fetch all at once:
```tsx
const res = await fetch(`/api/arena/previsoes?evento_id=${id}`);
```

**Step 4: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 5: Commit**

```
git add src/app/arena/evento/[id]/page.tsx
git commit -m "refactor(arena): update event page to use arena auth and layout"
```

---

## Phase 4: Profile Cleanup

### Task 4.1: Redesign Profile Page

**Files:**
- Rewrite: `src/app/arena/perfil/[username]/page.tsx`

**Step 1: Redesign the profile page**

Remove tabs (stats/conquistas). Show everything in a single scrollable page:

1. **Header card**: Avatar + username + nivel + XP bar + "Editar Perfil" button (neu-card)
2. **Stats row**: 3 compact cards (Pontos, Acertos, Taxa de Acerto) - no duplication
3. **Sequences card**: Atual/Melhor streak in one card
4. **Specialties card**: KO/Sub/Dec/Underdog counts with Lucide icons
5. **Achievements grid**: All 18 achievements inline. Unlocked = colored with icon. Locked = gray with lock icon

Use Lucide icons throughout: `Trophy, Flame, Target, Swords, Lock, Award, TrendingUp`

Remove the duplicate quick stats grid that appeared in the header AND the content.

Remove `<Header />` import (layout handles it).

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/arena/perfil/[username]/page.tsx
git commit -m "feat(arena): redesign profile page - flat layout, no duplicated stats"
```

---

### Task 4.2: Create Edit Profile Page

**Files:**
- Create: `src/app/arena/perfil/editar/page.tsx`

**Step 1: Create the edit profile page**

Simple form with:
- Username (readonly, displayed but not editable)
- Bio (textarea, max 200 chars)
- Botao "Salvar" (neu-button bg-ufc-red)
- Link "Cancelar" -> back to profile

Uses `PATCH /api/arena/perfil` to save.
Requires authentication (redirect to login if not).

**Step 2: Verify API endpoint exists**

Check that `PATCH /api/arena/perfil` handles `bio` field. If not, add support.

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 4: Commit**

```
git add src/app/arena/perfil/editar/page.tsx
git commit -m "feat(arena): create edit profile page"
```

---

### Task 4.3: Fix Avatar Page

**Files:**
- Modify: `src/app/arena/perfil/avatar/page.tsx`

**Step 1: Remove inline header**

The layout handles the header. Remove the entire `<header>` block.

**Step 2: Fix fighter image proportions**

Change the fighter grid from `aspect-square` to `aspect-[3/4]` for proper UFC photo proportions.

In the grid container, change:
```tsx
// FROM
<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-96 overflow-y-auto">

// Each button: add proper aspect ratio
<button className="relative aspect-[3/4] rounded-lg overflow-hidden...">
```

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 4: Commit**

```
git add src/app/arena/perfil/avatar/page.tsx
git commit -m "fix(arena): fix avatar page - remove duplicate header, fix image proportions"
```

---

## Phase 5: Weekly Event Logic

### Task 5.1: Create Weekly Event API

**Files:**
- Create: `src/app/api/eventos/semanal/route.ts`

**Step 1: Create the endpoint**

```tsx
import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  try {
    const agora = new Date();

    // Calcular domingo 12:00 de Brasilia (UTC-3) desta semana
    const hoje = new Date(agora.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const diaDaSemana = hoje.getDay(); // 0 = domingo

    // Se eh domingo e antes das 12h, o "domingo de corte" eh hoje
    // Se eh domingo apos 12h, o "domingo de corte" ja passou, mostrar proximo
    const domingoCorte = new Date(hoje);
    if (diaDaSemana === 0) {
      domingoCorte.setHours(12, 0, 0, 0);
    } else {
      // Proximo domingo
      domingoCorte.setDate(hoje.getDate() + (7 - diaDaSemana));
      domingoCorte.setHours(12, 0, 0, 0);
    }

    // Converter de volta para UTC para comparacao com DB
    const domingoCorteUTC = new Date(domingoCorte.getTime() + (3 * 60 * 60 * 1000)); // Brasilia = UTC-3

    if (agora < domingoCorteUTC) {
      // Antes do domingo 12h: mostrar evento mais recente (esta semana ou passado recente)
      const evento = await queryOne<Record<string, unknown>>(`
        SELECT e.*,
          (SELECT COUNT(*) FROM lutas l WHERE l.evento_id = e.id) as total_lutas
        FROM eventos e
        WHERE e.data_evento >= NOW() - INTERVAL '7 days'
        ORDER BY e.data_evento DESC
        LIMIT 1
      `);

      if (evento) {
        // Buscar lutas do evento com lutadores
        const lutas = await query<Record<string, unknown>>(`
          SELECT l.*,
            l1.id as lutador1_id, l1.nome as lutador1_nome, l1.apelido as lutador1_apelido,
            l1.imagem_url as lutador1_imagem, l1.vitorias as lutador1_vitorias,
            l1.derrotas as lutador1_derrotas,
            l2.id as lutador2_id, l2.nome as lutador2_nome, l2.apelido as lutador2_apelido,
            l2.imagem_url as lutador2_imagem, l2.vitorias as lutador2_vitorias,
            l2.derrotas as lutador2_derrotas
          FROM lutas l
          LEFT JOIN lutadores l1 ON l.lutador1_id = l1.id
          LEFT JOIN lutadores l2 ON l.lutador2_id = l2.id
          WHERE l.evento_id = $1
          ORDER BY l.ordem DESC
        `, [evento.id]);

        return NextResponse.json({ ...evento, lutas });
      }
    }

    // Fallback: proximo evento futuro (same as /api/eventos/proximo)
    const proximo = await queryOne<Record<string, unknown>>(`
      SELECT e.*,
        (SELECT COUNT(*) FROM lutas l WHERE l.evento_id = e.id) as total_lutas
      FROM eventos e
      WHERE e.data_evento > NOW()
      ORDER BY e.data_evento ASC
      LIMIT 1
    `);

    if (!proximo) {
      return NextResponse.json(null);
    }

    const lutas = await query<Record<string, unknown>>(`
      SELECT l.*,
        l1.id as lutador1_id, l1.nome as lutador1_nome, l1.apelido as lutador1_apelido,
        l1.imagem_url as lutador1_imagem, l1.vitorias as lutador1_vitorias,
        l1.derrotas as lutador1_derrotas,
        l2.id as lutador2_id, l2.nome as lutador2_nome, l2.apelido as lutador2_apelido,
        l2.imagem_url as lutador2_imagem, l2.vitorias as lutador2_vitorias,
        l2.derrotas as lutador2_derrotas
      FROM lutas l
      LEFT JOIN lutadores l1 ON l.lutador1_id = l1.id
      LEFT JOIN lutadores l2 ON l.lutador2_id = l2.id
      WHERE l.evento_id = $1
      ORDER BY l.ordem DESC
    `, [proximo.id]);

    return NextResponse.json({ ...proximo, lutas });
  } catch (error) {
    console.error('[API /eventos/semanal] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

NOTE: The exact SQL and data shape should match what `/api/eventos/proximo` returns today. Check that endpoint first and mirror its response format.

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/api/eventos/semanal/route.ts
git commit -m "feat(arena): create weekly event API endpoint"
```

---

### Task 5.2: Update Arena Page to Use Weekly API

**Files:**
- Modify: `src/app/arena/page.tsx`

**Step 1: Change API call**

In `fetchProximoEvento()`, change:
```tsx
// FROM
const res = await fetch('/api/eventos/proximo');
// TO
const res = await fetch('/api/eventos/semanal');
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/arena/page.tsx
git commit -m "feat(arena): use weekly event API for arena landing"
```

---

## Phase 6: Real-Time Live Results

### Task 6.1: Create Live Results Scraper

**Files:**
- Create: `src/lib/scrape-results.ts`

**Step 1: Create the scraping utility**

Uses Cheerio to parse Google search results for UFC fight outcomes. Searches for "UFC [event name] results" and extracts winner, method, round from the Google sports card.

Key function:
```tsx
export async function scrapeUFCResults(eventName: string): Promise<ScrapedResult[]>
```

Interface:
```tsx
interface ScrapedResult {
  lutador1_nome: string;
  lutador2_nome: string;
  vencedor_nome: string;
  metodo: string;
  round: number | null;
  tempo: string | null;
}
```

Uses `fetch` + `cheerio.load()` (both available in the project).

Fallback: if Google scraping fails, try ESPN UFC results page.

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/lib/scrape-results.ts
git commit -m "feat(arena): create UFC results scraper utility"
```

---

### Task 6.2: Create Admin Scrape Results Endpoint

**Files:**
- Create: `src/app/api/admin/scrape-results/route.ts`

**Step 1: Create the admin endpoint**

POST endpoint (admin-only via `requireAdmin(request)`) that:
1. Takes `evento_id` in body
2. Fetches event name from DB
3. Calls `scrapeUFCResults(eventName)`
4. Matches scraped results to DB fights (by fighter names)
5. Updates `lutas` table: `vencedor_id`, `metodo`, `round_final`, `tempo_final`, `status = 'finalizada'`
6. Optionally triggers `processarPrevisoesLuta()` from `@/lib/arena/pontuacao.ts`
7. Returns count of updated fights

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/api/admin/scrape-results/route.ts
git commit -m "feat(arena): create admin endpoint for scraping UFC results"
```

---

### Task 6.3: Create Live Event API

**Files:**
- Create: `src/app/api/eventos/[id]/live/route.ts`

**Step 1: Create lightweight polling endpoint**

GET endpoint that returns current fight statuses for an event. Optimized for frequent polling:
- No-cache headers
- Minimal data: fight id, status, vencedor_id, metodo, round_final, tempo_final
- Only returns fights, not full event data

```tsx
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const lutas = await query<Record<string, unknown>>(`
    SELECT l.id, l.ordem, l.tipo, l.status, l.vencedor_id, l.metodo,
           l.round_final, l.tempo_final,
           l1.nome as lutador1_nome, l2.nome as lutador2_nome
    FROM lutas l
    LEFT JOIN lutadores l1 ON l.lutador1_id = l1.id
    LEFT JOIN lutadores l2 ON l.lutador2_id = l2.id
    WHERE l.evento_id = $1
    ORDER BY l.ordem ASC
  `, [id]);

  const evento = await queryOne<{ status: string }>(`
    SELECT status FROM eventos WHERE id = $1
  `, [id]);

  return NextResponse.json(
    { lutas, evento_status: evento?.status },
    { headers: { 'Cache-Control': 'no-cache, no-store' } }
  );
}
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/api/eventos/[id]/live/route.ts
git commit -m "feat(arena): create live event polling endpoint"
```

---

### Task 6.4: Add Live Polling to Arena Landing

**Files:**
- Modify: `src/app/arena/page.tsx`

**Step 1: Add polling logic**

When event status is 'ao_vivo', poll `/api/eventos/[id]/live` every 30 seconds and update fight statuses in the UI.

Add a new state for live results and a polling effect:
```tsx
const [liveResults, setLiveResults] = useState<LiveResult[] | null>(null);

useEffect(() => {
  if (!proximoEvento || proximoEvento.status !== 'ao_vivo') return;

  const poll = async () => {
    const res = await fetch(`/api/eventos/${proximoEvento.id}/live`);
    if (res.ok) {
      const data = await res.json();
      setLiveResults(data.lutas);
    }
  };

  poll(); // Initial fetch
  const interval = setInterval(poll, 30000);
  return () => clearInterval(interval);
}, [proximoEvento]);
```

**Step 2: Add live results display**

When `proximoEvento.status === 'ao_vivo'`, show the fight card with live statuses instead of the normal landing.

Display each fight with status indicator:
- Finalizada: green check + winner + method + round
- Em andamento: red pulsing dot
- Pendente: gray hourglass

Show user's prediction alongside each result.

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 4: Commit**

```
git add src/app/arena/page.tsx
git commit -m "feat(arena): add live results polling to arena landing"
```

---

## Phase 7: Leagues (GymRats Style)

### Task 7.1: Simplify Create League Page

**Files:**
- Rewrite: `src/app/arena/ligas/criar/page.tsx`

**Step 1: Simplify to 2 fields**

The create league page should be dead simple (GymRats style):
- Input: Nome da Liga
- Toggle: Liga Publica (on/off switch)
- Button: "Criar Liga" (neu-button bg-ufc-red)

Remove: descricao, max_membros, apenas_main_card, mostrar_picks_antes fields.

API call stays the same (`POST /api/arena/ligas`) but with minimal body:
```tsx
body: JSON.stringify({
  nome: nomeLiga,
  tipo: isPublica ? 'publica' : 'privada',
})
```

Requires auth. Use arena layout (no duplicate header).

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/arena/ligas/criar/page.tsx
git commit -m "feat(arena): simplify create league to 2 fields GymRats style"
```

---

### Task 7.2: Redesign Leagues List Page

**Files:**
- Rewrite: `src/app/arena/ligas/page.tsx`

**Step 1: Clean list design**

Two sections:
1. **Minhas Ligas** - cards with league name, position, members count
2. **Ligas Publicas** - explorable list with "Entrar" button

Each league card: neu-card with league name, member count, your position (if member).

Remove duplicate header. CTA to create league.

Input for entering via invite code at the top.

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/arena/ligas/page.tsx
git commit -m "feat(arena): redesign leagues list page GymRats style"
```

---

### Task 7.3: Clean Up League Detail Page

**Files:**
- Modify: `src/app/arena/ligas/[id]/page.tsx`

**Step 1: Simplify to ranking + chat**

Two main sections:
1. **Ranking** - numbered list with position, avatar, username, points
2. **Chat** - simple message list + input field

Header shows league name + invite code (copyable).

Remove duplicate header. Use arena layout.

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Commit**

```
git add src/app/arena/ligas/[id]/page.tsx
git commit -m "feat(arena): clean up league detail with ranking + chat"
```

---

### Task 7.4: Remove Broken Links

**Files:**
- Search all arena files for links to non-existent pages

**Step 1: Find broken links**

Run: `grep -r "arena/amigos\|arena/conquistas\|arena/configuracoes\|arena/duelos" src/ --include="*.tsx" -l`

Remove or redirect all broken links. The UserAvatar dropdown should no longer have "Configuracoes".

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`

**Step 3: Final build verification**

Run: `cd ufc-news-hub && npm run build`

This is the final check. All pages should build without errors.

**Step 4: Commit**

```
git add -A
git commit -m "fix(arena): remove all broken links to non-existent pages"
```

---

## Final Verification

### Task FINAL: End-to-End Manual Testing

**Checklist:**
- [ ] `/arena` - Global header visible, Arena tab highlighted, poster + countdown preserved
- [ ] `/arena` - Sub-header shows "Arena UFC" + login button (or avatar when logged in)
- [ ] `/arena/login` - OctagonPortalLayout preserved, login works, redirects to /arena
- [ ] `/arena/registro` - Only 4 fields, no "Nome Exibicao", no "Por que criar conta"
- [ ] `/arena/registro` - Register works, saves to DB, redirects to /arena
- [ ] `/arena` (logged in) - Sub-header shows points + avatar
- [ ] Avatar dropdown - Shows: Perfil, Ligas, Historico, Mudar Avatar, Sair
- [ ] `/arena/evento/[id]` - Fight card with visual prediction buttons
- [ ] Prediction flow: click fighter -> click method -> click round -> Confirmar
- [ ] Rounds: main_event/titulo = 5, others = 3
- [ ] No Tapology links anywhere
- [ ] `/arena/perfil/[username]` - No duplicated stats, conquistas inline
- [ ] `/arena/perfil/editar` - Works (no more "usuario nao encontrado")
- [ ] `/arena/perfil/avatar` - Fighter images not distorted
- [ ] `/arena/ligas` - Clean list
- [ ] `/arena/ligas/criar` - Only 2 fields
- [ ] No 404 links anywhere in arena
- [ ] `npm run build` passes
