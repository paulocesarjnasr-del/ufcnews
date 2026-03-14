# Arena v2 — M1: Layout & Navegacao Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Arena layout with a mobile-first bottom navigation bar (Home, Evento, Ligas, Perfil) so users never get lost. The "Evento" tab dynamically links to the next upcoming event. When an event is `ao_vivo`, the tab morphs into "AO VIVO" with a red pulse indicator.

**Architecture:** Rewrite `arena/layout.tsx` to include a bottom nav bar (mobile) that doubles as horizontal tabs (desktop). Create a `useProximoEvento()` hook with SWR for the dynamic Evento tab link. Use `usePathname()` to highlight the active tab. Keep the existing top bar (logo + points + avatar).

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS 3, Lucide icons, SWR, `usePathname()`

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (section M1)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/arena/layout.tsx` | REWRITE | Top bar + bottom nav + active tab highlight + AO VIVO state |
| `src/components/arena/BottomNav.tsx` | CREATE | Bottom navigation component (4 tabs, mobile-first) |
| `src/hooks/useProximoEvento.ts` | CREATE | SWR hook to fetch next event ID for Evento tab link |

---

## Chunk 1: Create useProximoEvento Hook

### Task 1: Create useProximoEvento hook

**Files:**
- Create: `src/hooks/useProximoEvento.ts`

**Context:** The "Evento" tab needs to link to `/arena/evento/[id]` with the real event ID. The API `/api/eventos/proximo` only returns `agendado` events — it will NOT return `ao_vivo` events. So this hook needs to fetch from TWO sources: the next agendado event AND check for a live event.

**IMPORTANT:** Before creating this hook, Task 1 also requires a small API change: the hook fetches `/api/eventos/proximo` which filters `WHERE status = 'agendado'`. We need a separate lightweight query for live events. The simplest approach: the hook makes a second SWR call to `/api/eventos/proximo?include_live=true` — but modifying that API is out of M1 scope. Instead, the hook will fetch `/api/arena/live` (which we'll create in M6). For NOW, `isAoVivo` defaults to `false` and will be activated when M6 is implemented. The hook is designed so M6 just needs to exist.

**Pragmatic approach for M1:** Use a single SWR call. The `isAoVivo` flag is wired but won't trigger until the API supports it. We add a TODO comment for M6.

- [ ] **Step 1: Create the hook file**

```typescript
'use client';

import useSWR from 'swr';

interface ProximoEvento {
  id: string;
  nome: string;
  status: string;
  data_evento: string;
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
});

export function useProximoEvento() {
  const { data, error, isLoading } = useSWR<ProximoEvento | null>(
    '/api/eventos/proximo',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      refreshInterval: 300000,
      onError: () => {}, // silently handle 404 (no event)
    }
  );

  // TODO(M6): Add second SWR call to detect ao_vivo events.
  // Current API /api/eventos/proximo only returns 'agendado'.
  // When M6 is implemented, either:
  // 1. Modify /api/eventos/proximo to include ao_vivo, OR
  // 2. Add separate /api/arena/live/status endpoint
  const isAoVivo = data?.status === 'ao_vivo'; // Will be false until M6

  return {
    evento: data ?? null,
    isLoading,
    error,
    isAoVivo: data?.status === 'ao_vivo',
  };
}
```

- [ ] **Step 2: Verify compiles**

Run: `cd ufc-news-hub && npx tsc --noEmit 2>&1 | grep -i "useProximoEvento\|error" | head -10`
Expected: No errors related to useProximoEvento

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useProximoEvento.ts
git commit -m "feat(arena): create useProximoEvento hook with SWR

Fetches next event ID for dynamic Evento tab link in bottom nav.
Includes isAoVivo flag for live event state detection."
```

---

## Chunk 2: Create BottomNav Component

### Task 2: Create BottomNav component

**Files:**
- Create: `src/components/arena/BottomNav.tsx`

**Context:** Mobile-first bottom navigation with 4 tabs: Home, Evento, Ligas, Perfil. Inspired by FanDuel. Uses `usePathname()` for active tab highlighting. Receives `eventoId`, `isAoVivo`, and `username` as props from the layout.

- [ ] **Step 1: Create the component file**

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Swords, Trophy, User } from 'lucide-react';

interface BottomNavProps {
  eventoId: string | null;
  isAoVivo: boolean;
  username: string | null;
}

interface NavTab {
  label: string;
  liveLabel?: string;
  href: string;
  icon: React.ReactNode;
  matchPaths: string[];
}

export function BottomNav({ eventoId, isAoVivo, username }: BottomNavProps) {
  const pathname = usePathname();

  const tabs: NavTab[] = [
    {
      label: 'Home',
      href: '/arena',
      icon: <Home className="w-5 h-5" />,
      matchPaths: ['/arena'],
    },
    {
      label: 'Evento',
      liveLabel: 'AO VIVO',
      href: isAoVivo
        ? '/arena/live'
        : eventoId
          ? `/arena/evento/${eventoId}`
          : '/arena',
      icon: <Swords className="w-5 h-5" />,
      matchPaths: ['/arena/evento', '/arena/live'],
    },
    {
      label: 'Ligas',
      href: '/arena/ligas',
      icon: <Trophy className="w-5 h-5" />,
      matchPaths: ['/arena/ligas'],
    },
    {
      label: 'Perfil',
      href: username ? `/arena/perfil/${username}` : '/arena/login',
      icon: <User className="w-5 h-5" />,
      matchPaths: ['/arena/perfil'],
    },
  ];

  const isActive = (tab: NavTab) => {
    if (tab.matchPaths[0] === '/arena' && pathname === '/arena') return true;
    return tab.matchPaths.some(p => p !== '/arena' && pathname.startsWith(p));
  };

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card/95 backdrop-blur-md border-t border-dark-border/50 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const active = isActive(tab);
            const showLive = tab.liveLabel && isAoVivo;

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  active
                    ? 'text-ufc-red'
                    : 'text-dark-textMuted hover:text-dark-text'
                }`}
              >
                <div className="relative">
                  {tab.icon}
                  {showLive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span className={`text-[10px] font-medium ${showLive ? 'text-red-400' : ''}`}>
                  {showLive ? tab.liveLabel : tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop horizontal tabs (inside top sub-header) */}
      <nav className="hidden md:flex items-center gap-1">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const showLive = tab.liveLabel && isAoVivo;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-ufc-red/10 text-ufc-red'
                  : 'text-dark-textMuted hover:text-dark-text hover:bg-white/5'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {showLive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
              <span>{showLive ? tab.liveLabel : tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer for mobile bottom nav (prevents content from being hidden) */}
      <div className="h-16 md:hidden" />
    </>
  );
}
```

- [ ] **Step 2: Verify compiles**

Run: `cd ufc-news-hub && npx tsc --noEmit 2>&1 | grep -i "BottomNav\|error" | head -10`
Expected: No errors related to BottomNav

- [ ] **Step 3: Commit**

```bash
git add src/components/arena/BottomNav.tsx
git commit -m "feat(arena): create BottomNav component

Mobile-first bottom nav with 4 tabs (Home, Evento, Ligas, Perfil).
Active tab highlighted via usePathname(). Evento tab morphs to
AO VIVO with red pulse indicator when event is live."
```

---

## Chunk 3: Rewrite Arena Layout

### Task 3: Rewrite arena/layout.tsx

**Files:**
- Rewrite: `src/app/arena/layout.tsx`

**Context:** Current layout has top bar only (logo + points + avatar). New layout keeps the top bar AND adds the BottomNav. Top bar on desktop also includes the nav tabs (hidden on mobile). The layout provides bottom padding on mobile so content doesn't hide behind the fixed bottom nav.

- [ ] **Step 1: Rewrite layout.tsx**

Replace the entire file content:

```typescript
'use client';

import Link from 'next/link';
import { Target, Trophy } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { BottomNav } from '@/components/arena/BottomNav';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { useProximoEvento } from '@/hooks/useProximoEvento';

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  const { usuario, isAuthenticated, logout } = useArenaAuth();
  const { evento, isAoVivo } = useProximoEvento();

  return (
    <>
      {/* Global Header */}
      <Header />

      {/* Arena Sub-Header */}
      <div className="sticky top-16 z-40 w-full bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
        <div className="container mx-auto flex h-12 items-center justify-between px-4">
          {/* Left: Arena UFC logo */}
          <Link href="/arena" className="flex items-center gap-2 group">
            <Target className="w-5 h-5 text-ufc-red transition-transform group-hover:scale-110" />
            <span className="font-display text-lg text-white tracking-wide">
              Arena <span className="text-ufc-red">UFC</span>
            </span>
          </Link>

          {/* Center: Desktop nav tabs */}
          <div className="hidden md:block">
            <BottomNav
              eventoId={evento?.id ?? null}
              isAoVivo={isAoVivo}
              username={usuario?.username ?? null}
            />
          </div>

          {/* Right: Points badge + UserAvatar */}
          <div className="flex items-center gap-3">
            {isAuthenticated && usuario && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ufc-gold/10 border border-ufc-gold/20">
                <Trophy className="w-3.5 h-3.5 text-ufc-gold" />
                <span className="text-sm font-semibold text-ufc-gold">
                  {(usuario.pontos_totais ?? 0).toLocaleString()} pts
                </span>
              </div>
            )}
            <UserAvatar usuario={usuario} onLogout={logout} />
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="pb-16 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav
          eventoId={evento?.id ?? null}
          isAoVivo={isAoVivo}
          username={usuario?.username ?? null}
        />
      </div>
    </>
  );
}
```

**Key changes from v1:**
- Added `BottomNav` import and usage (mobile + desktop)
- Added `useProximoEvento` hook for dynamic Evento tab
- Desktop: nav tabs appear centered in the sub-header
- Mobile: bottom fixed nav bar
- `<main>` gets `pb-16 md:pb-0` to avoid content hiding behind mobile bottom nav
- BottomNav renders its own spacer div on mobile

- [ ] **Step 2: Verify compiles**

Run: `cd ufc-news-hub && npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Verify lint**

Run: `cd ufc-news-hub && npm run lint 2>&1 | tail -5`
Expected: Clean

- [ ] **Step 4: Commit**

```bash
git add src/app/arena/layout.tsx
git commit -m "feat(arena): rewrite layout with bottom nav + desktop tabs

Mobile: fixed bottom nav with 4 tabs (Home, Evento, Ligas, Perfil).
Desktop: horizontal tabs in sub-header. Evento tab dynamically links
to next event via useProximoEvento hook. Morphs to AO VIVO when
event is live with red pulse indicator."
```

---

## Chunk 4: Visual Test

### Task 4: Manual visual verification

**Context:** Verify the layout works correctly on both mobile and desktop viewports.

- [ ] **Step 1: Start dev server**

Run: `cd ufc-news-hub && npm run dev`

- [ ] **Step 2: Test desktop (>768px)**

Open: `http://localhost:3010/arena`
Verify:
- Top bar shows: Arena UFC logo | nav tabs (Home, Evento, Ligas, Perfil) | points + avatar
- Nav tabs highlight correctly based on current page
- Clicking "Evento" navigates to `/arena/evento/[id]` with real event ID
- No bottom nav visible on desktop

- [ ] **Step 3: Test mobile (<768px)**

Open DevTools → Toggle device toolbar → Select iPhone 14
Verify:
- Top bar shows: Arena UFC logo | points + avatar (no nav tabs)
- Bottom nav is fixed at bottom with 4 tabs + icons
- Active tab is highlighted in red
- Content is not hidden behind bottom nav (padding works)

- [ ] **Step 4: Test navigation flow**

Navigate:
1. `/arena` → Home tab should be active
2. Click Evento → `/arena/evento/[id]` → Evento tab should be active
3. Click Ligas → `/arena/ligas` → Ligas tab should be active
4. Click Perfil → redirects to login or profile page

- [ ] **Step 5: Run lint + typecheck final**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`
Expected: Clean

---

## What This Enables

With the layout + navigation working:
- Users never get lost — 4 clear tabs always visible
- Every Arena page inherits the same navigation structure
- Evento tab dynamically points to the right event
- Foundation for M2 (Dashboard), M3 (Previsoes), M5 (Ligas), M6 (Live)
- "AO VIVO" indicator ready for M6 (Live & Resultados)
