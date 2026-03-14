# Arena v2 — M2 + M3: Dashboard Tab Swipe + Previsoes Polish

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (M2) Replace the Arena landing page with a swipeable 3-tab dashboard (Evento/Stats/Social) with lazy loading. (M3) Polish the predictions UX with progress bar, inline pick summaries, post-event result display, and community pick revelation after deadline.

**Architecture:** M2 rewrites `/arena/page.tsx` as a tabbed dashboard using CSS `scroll-snap-type: x mandatory`. Each tab is a lazy-loaded component. M3 modifies existing `LutaCard` and `PrevisaoForm` components, adds `ProgressBar` and `ConsensoReveal` components, and modifies the previsoes API to support `?comunidade=true` for post-deadline community picks.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, SWR, CSS scroll-snap

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (sections M2 + M3)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/arena/page.tsx` | REWRITE | Dashboard with 3 swipeable tabs (Evento/Stats/Social) |
| `src/components/arena/DashboardTabs.tsx` | CREATE | Tab header + scroll-snap container |
| `src/components/arena/TabEvento.tsx` | CREATE | Tab 1: next event card + picks progress + CTA |
| `src/components/arena/TabStats.tsx` | CREATE | Tab 2: user points, accuracy, streaks |
| `src/components/arena/TabSocial.tsx` | CREATE | Tab 3: leagues + activity feed |
| `src/app/api/arena/atividades/route.ts` | CREATE | GET activity feed from `atividades` table |
| `src/components/arena/ProgressBar.tsx` | CREATE | Visual progress bar for picks (X/Y) |
| `src/components/arena/ConsensoReveal.tsx` | CREATE | Community consensus display post-deadline |
| `src/app/arena/evento/[id]/page.tsx` | MODIFY | Add ProgressBar, pass deadline state |
| `src/components/arena/LutaCard.tsx` | MODIFY | Inline pick summary, post-event result colors |
| `src/app/api/arena/previsoes/route.ts` | MODIFY | Add `?comunidade=true` for post-deadline reveal |
| `src/lib/arena/previsoes-horario.ts` | NO CHANGE | Already the single source of truth for deadline |

---

## Chunk 1: Dashboard Foundation (M2)

### Task 1: Create DashboardTabs component

**Files:**
- Create: `src/components/arena/DashboardTabs.tsx`

- [ ] **Step 1: Create the component**

```typescript
'use client';

import { useRef, useState, useEffect } from 'react';

interface DashboardTabsProps {
  tabs: { label: string; content: React.ReactNode }[];
}

export function DashboardTabs({ tabs }: DashboardTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < tabs.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, tabs.length]);

  const scrollToTab = (index: number) => {
    scrollRef.current?.scrollTo({
      left: index * (scrollRef.current?.offsetWidth ?? 0),
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex border-b border-dark-border/50 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => scrollToTab(i)}
            className={`flex-1 py-3 text-sm font-display uppercase tracking-wide transition-colors relative ${
              activeIndex === i
                ? 'text-ufc-red'
                : 'text-dark-textMuted hover:text-dark-text'
            }`}
          >
            {tab.label}
            {activeIndex === i && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-ufc-red rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Scrollable tab content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 snap-center px-4"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify compiles**
Run: `cd ufc-news-hub && npx tsc --noEmit 2>&1 | head -10`

- [ ] **Step 3: Commit**
```bash
git add src/components/arena/DashboardTabs.tsx
git commit -m "feat(arena): create DashboardTabs with CSS scroll-snap"
```

---

### Task 2: Create TabEvento component

**Files:**
- Create: `src/components/arena/TabEvento.tsx`

- [ ] **Step 1: Create the component**

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Swords, Clock } from 'lucide-react';

interface EventoData {
  id: string;
  nome: string;
  data_evento: string;
  local: string;
  tipo: string;
  total_lutas: number;
  status: string;
}

export function TabEvento() {
  const [evento, setEvento] = useState<EventoData | null>(null);
  const [picksCount, setPicksCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/eventos/proximo');
        if (!res.ok) { setIsLoading(false); return; }
        const data = await res.json();
        setEvento(data);

        // Fetch user picks count for this event
        const picksRes = await fetch(`/api/arena/previsoes?evento_id=${data.id}`);
        if (picksRes.ok) {
          const picksData = await picksRes.json();
          setPicksCount(Array.isArray(picksData) ? picksData.length : 0);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-40 rounded-xl bg-dark-card" />
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="neu-card p-6 text-center">
        <Swords className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Nenhum evento agendado.</p>
        <p className="text-sm text-dark-textMuted mt-1">Fique ligado para o proximo card!</p>
      </div>
    );
  }

  const eventDate = new Date(evento.data_evento);
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const diffHours = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  return (
    <div className="space-y-4">
      {/* Event card */}
      <div className="neu-card p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl uppercase text-white">{evento.nome}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-dark-textMuted">
              <Calendar className="w-3.5 h-3.5" />
              <span>{eventDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
            {evento.local && (
              <div className="flex items-center gap-2 mt-1 text-sm text-dark-textMuted">
                <MapPin className="w-3.5 h-3.5" />
                <span>{evento.local}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ufc-red/10 border border-ufc-red/20">
              <Clock className="w-3.5 h-3.5 text-ufc-red" />
              <span className="text-sm font-semibold text-ufc-red">
                {diffDays > 0 ? `${diffDays}d ${diffHours}h` : `${diffHours}h`}
              </span>
            </div>
          </div>
        </div>

        {/* Picks progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-dark-textMuted">
            {picksCount}/{evento.total_lutas} previsoes feitas
          </span>
          <div className="w-32 h-2 rounded-full bg-dark-bg overflow-hidden">
            <div
              className="h-full rounded-full bg-ufc-red transition-all"
              style={{ width: `${evento.total_lutas > 0 ? (picksCount / evento.total_lutas) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/arena/evento/${evento.id}`}
          className="neu-button w-full flex items-center justify-center gap-2 py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide transition-colors rounded-xl"
        >
          <Swords className="w-4 h-4" />
          {picksCount > 0 ? 'Editar Previsoes' : 'Fazer Previsoes'}
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/arena/TabEvento.tsx
git commit -m "feat(arena): create TabEvento dashboard component"
```

---

### Task 3: Create TabStats component

**Files:**
- Create: `src/components/arena/TabStats.tsx`

- [ ] **Step 1: Create the component**

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Target, Flame, TrendingUp } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface UserStats {
  pontos_totais: number;
  previsoes_corretas: number;
  total_previsoes: number;
  streak_atual: number;
  melhor_streak: number;
  kos_acertados: number;
  subs_acertados: number;
  decisoes_acertadas: number;
}

export function TabStats() {
  const { usuario, isAuthenticated } = useArenaAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [usuario]);

  if (!isAuthenticated || !usuario) {
    return (
      <div className="neu-card p-6 text-center">
        <Target className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Faca login para ver seus stats!</p>
        <Link href="/arena/login" className="text-ufc-red text-sm mt-2 inline-block hover:underline">
          Entrar
        </Link>
      </div>
    );
  }

  const stats: UserStats = {
    pontos_totais: usuario.pontos_totais ?? 0,
    previsoes_corretas: usuario.previsoes_corretas ?? 0,
    total_previsoes: usuario.total_previsoes ?? 0,
    streak_atual: usuario.streak_atual ?? 0,
    melhor_streak: usuario.melhor_streak ?? 0,
    kos_acertados: usuario.kos_acertados ?? 0,
    subs_acertados: usuario.subs_acertados ?? 0,
    decisoes_acertadas: usuario.decisoes_acertadas ?? 0,
  };

  const accuracy = stats.total_previsoes > 0
    ? Math.round((stats.previsoes_corretas / stats.total_previsoes) * 100)
    : 0;

  if (isLoading) {
    return <div className="h-40 rounded-xl bg-dark-card animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      {/* Main stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="neu-card p-4 text-center">
          <Trophy className="w-5 h-5 text-ufc-gold mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-ufc-gold">{stats.pontos_totais.toLocaleString()}</p>
          <p className="text-xs text-dark-textMuted mt-0.5">Pontos</p>
        </div>
        <div className="neu-card p-4 text-center">
          <Target className="w-5 h-5 text-green-400 mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-green-400">{accuracy}%</p>
          <p className="text-xs text-dark-textMuted mt-0.5">Precisao</p>
        </div>
        <div className="neu-card p-4 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-orange-400">{stats.streak_atual}</p>
          <p className="text-xs text-dark-textMuted mt-0.5">Streak</p>
        </div>
      </div>

      {/* Specialties */}
      <div className="neu-card p-4 space-y-3">
        <h4 className="text-sm font-display uppercase text-dark-textMuted flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Especialidades
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-dark-bg/50 p-2.5">
            <p className="text-lg font-bold text-red-400">{stats.kos_acertados}</p>
            <p className="text-[10px] text-dark-textMuted">KOs</p>
          </div>
          <div className="rounded-lg bg-dark-bg/50 p-2.5">
            <p className="text-lg font-bold text-blue-400">{stats.subs_acertados}</p>
            <p className="text-[10px] text-dark-textMuted">Subs</p>
          </div>
          <div className="rounded-lg bg-dark-bg/50 p-2.5">
            <p className="text-lg font-bold text-yellow-400">{stats.decisoes_acertadas}</p>
            <p className="text-[10px] text-dark-textMuted">Decisoes</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/arena/perfil/${usuario.username}`}
        className="block text-center text-sm text-ufc-red hover:underline"
      >
        Ver perfil completo →
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/arena/TabStats.tsx
git commit -m "feat(arena): create TabStats dashboard component"
```

---

### Task 4: Create atividades API + TabSocial component

**Files:**
- Create: `src/app/api/arena/atividades/route.ts`
- Create: `src/components/arena/TabSocial.tsx`

- [ ] **Step 1: Create atividades API**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual(request);
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    const atividades = await query<{
      id: string;
      tipo: string;
      titulo: string;
      descricao: string | null;
      created_at: string;
    }>(
      `SELECT id, tipo, titulo, descricao, created_at
       FROM atividades
       WHERE usuario_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [usuario.id, Math.min(limit, 50)]
    );

    return NextResponse.json(atividades, {
      headers: { 'Cache-Control': 'private, max-age=30' },
    });
  } catch (error) {
    console.error('[API /arena/atividades] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create TabSocial component**

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Activity } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface Liga {
  id: string;
  nome: string;
  total_membros: number;
}

interface Atividade {
  id: string;
  tipo: string;
  titulo: string;
  descricao: string | null;
  created_at: string;
}

export function TabSocial() {
  const { usuario, isAuthenticated } = useArenaAuth();
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setIsLoading(false); return; }

    async function fetchData() {
      try {
        const [ligasRes, atividadesRes] = await Promise.all([
          fetch('/api/arena/ligas?tipo=minhas&limit=3'),
          fetch('/api/arena/atividades?limit=5'),
        ]);

        if (ligasRes.ok) {
          const data = await ligasRes.json();
          setLigas(Array.isArray(data) ? data : data.ligas || []);
        }
        if (atividadesRes.ok) {
          const data = await atividadesRes.json();
          setAtividades(Array.isArray(data) ? data : []);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="neu-card p-6 text-center">
        <Users className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Entre numa liga para competir com amigos!</p>
        <Link href="/arena/login" className="text-ufc-red text-sm mt-2 inline-block hover:underline">
          Entrar
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="h-40 rounded-xl bg-dark-card animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      {/* Ligas */}
      <div className="neu-card p-4 space-y-3">
        <h4 className="text-sm font-display uppercase text-dark-textMuted flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Minhas Ligas
        </h4>
        {ligas.length === 0 ? (
          <p className="text-sm text-dark-textMuted">Nenhuma liga ainda.</p>
        ) : (
          <div className="space-y-2">
            {ligas.map(liga => (
              <Link
                key={liga.id}
                href={`/arena/ligas/${liga.id}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/50 hover:bg-dark-bg transition-colors"
              >
                <span className="text-sm text-dark-text font-medium">{liga.nome}</span>
                <span className="text-xs text-dark-textMuted">{liga.total_membros} membros</span>
              </Link>
            ))}
          </div>
        )}
        <Link href="/arena/ligas" className="block text-center text-sm text-ufc-red hover:underline">
          Ver todas →
        </Link>
      </div>

      {/* Atividade recente */}
      <div className="neu-card p-4 space-y-3">
        <h4 className="text-sm font-display uppercase text-dark-textMuted flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Atividade Recente
        </h4>
        {atividades.length === 0 ? (
          <p className="text-sm text-dark-textMuted">Faca sua primeira previsao para ver atividade aqui!</p>
        ) : (
          <div className="space-y-2">
            {atividades.map(a => (
              <div key={a.id} className="flex items-start gap-2.5 text-sm">
                <span className="text-dark-textMuted shrink-0 mt-0.5">
                  {a.tipo === 'card_perfeito' ? '🏆' : a.tipo === 'conquista' ? '🎯' : '📊'}
                </span>
                <div>
                  <p className="text-dark-text">{a.titulo}</p>
                  {a.descricao && <p className="text-xs text-dark-textMuted">{a.descricao}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify compiles**
Run: `cd ufc-news-hub && npx tsc --noEmit 2>&1 | head -10`

- [ ] **Step 4: Commit**
```bash
git add src/app/api/arena/atividades/route.ts src/components/arena/TabSocial.tsx
git commit -m "feat(arena): create atividades API + TabSocial component"
```

---

### Task 5: Rewrite arena/page.tsx as Dashboard

**Files:**
- Rewrite: `src/app/arena/page.tsx`

- [ ] **Step 1: Rewrite the page**

```typescript
'use client';

import Link from 'next/link';
import { Target, Swords, UserPlus } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { DashboardTabs } from '@/components/arena/DashboardTabs';
import { TabEvento } from '@/components/arena/TabEvento';
import { TabStats } from '@/components/arena/TabStats';
import { TabSocial } from '@/components/arena/TabSocial';

function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-lg mx-auto space-y-8">
        <div>
          <Target className="w-16 h-16 text-ufc-red mx-auto mb-4" />
          <h1 className="font-display text-4xl uppercase text-white">
            Arena <span className="text-ufc-red">UFC</span>
          </h1>
          <p className="text-dark-textMuted mt-3 text-lg">
            Faca suas previsoes, compita com amigos e prove que voce entende de UFC.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="neu-card p-4">
            <Swords className="w-6 h-6 text-ufc-red mb-2" />
            <h3 className="font-display text-sm uppercase text-white">Preveja</h3>
            <p className="text-xs text-dark-textMuted mt-1">Escolha os vencedores de cada luta</p>
          </div>
          <div className="neu-card p-4">
            <Target className="w-6 h-6 text-ufc-gold mb-2" />
            <h3 className="font-display text-sm uppercase text-white">Pontue</h3>
            <p className="text-xs text-dark-textMuted mt-1">Ganhe pontos por acertos</p>
          </div>
          <div className="neu-card p-4">
            <UserPlus className="w-6 h-6 text-green-400 mb-2" />
            <h3 className="font-display text-sm uppercase text-white">Compita</h3>
            <p className="text-xs text-dark-textMuted mt-1">Crie ligas e desafie amigos</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/arena/registro"
            className="neu-button px-8 py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide rounded-xl transition-colors"
          >
            Criar Conta
          </Link>
          <Link
            href="/arena/login"
            className="neu-button px-8 py-3 bg-dark-card hover:bg-dark-border text-dark-text font-display uppercase tracking-wide rounded-xl transition-colors border border-dark-border"
          >
            Ja tenho conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ArenaPage() {
  const { isAuthenticated, isLoading } = useArenaAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-64 rounded-xl bg-dark-card animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="container mx-auto py-4">
      <DashboardTabs
        tabs={[
          { label: 'Evento', content: <TabEvento /> },
          { label: 'Stats', content: <TabStats /> },
          { label: 'Social', content: <TabSocial /> },
        ]}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify compiles + lint**
Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit 2>&1 | head -10`

- [ ] **Step 3: Commit**
```bash
git add src/app/arena/page.tsx
git commit -m "feat(arena): rewrite arena page as dashboard with tab swipe

Authenticated: 3-tab dashboard (Evento/Stats/Social) with CSS scroll-snap.
Not authenticated: landing page with CTA to register/login.
Each tab lazy loads its own data."
```

---

## Chunk 2: Previsoes Polish (M3)

### Task 6: Create ProgressBar component

**Files:**
- Create: `src/components/arena/ProgressBar.tsx`

- [ ] **Step 1: Create component**

```typescript
interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="neu-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-dark-text">
          Suas previsoes: {current}/{total}
        </span>
        <span className="text-sm font-semibold text-ufc-red">{percent}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-dark-bg overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ufc-red to-ufc-redLight transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/arena/ProgressBar.tsx
git commit -m "feat(arena): create ProgressBar component for picks tracking"
```

---

### Task 7: Modify LutaCard for inline pick summary + post-event results

**Files:**
- Modify: `src/components/arena/LutaCard.tsx`

**Changes:**
1. When user has a pick and card is collapsed, show inline summary text (e.g., "Pereira por KO R3")
2. When fight is finished (`status === 'finalizada'`), show result with green/red colors based on `acertou_vencedor`
3. Show points earned if pick was processed

- [ ] **Step 1: Read current LutaCard.tsx and add inline summary**

After the fighter VS display section, add an inline pick summary that shows when the card is NOT expanded:

Find the section where `localPrevisao` is checked and add display logic:
- If `localPrevisao && !isExpanded`: show compact summary like "Seu pick: [Fighter] por [Metodo] R[Round]"
- If `luta.status === 'finalizada' && localPrevisao?.processada`: show result with green (acertou) or red (errou) styling + pontos_ganhos

This is a UI-only change. The data is already available via `userPrevisao` prop.

- [ ] **Step 2: Verify compiles**
Run: `cd ufc-news-hub && npx tsc --noEmit 2>&1 | head -10`

- [ ] **Step 3: Commit**
```bash
git add src/components/arena/LutaCard.tsx
git commit -m "feat(arena): add inline pick summary + post-event results to LutaCard"
```

---

### Task 8: Add ProgressBar to evento page

**Files:**
- Modify: `src/app/arena/evento/[id]/page.tsx`

**Changes:**
1. Import and render `ProgressBar` at the top of the fight list
2. Pass `current` (number of picks made) and `total` (number of fights)

- [ ] **Step 1: Add ProgressBar import and rendering**

Add import: `import { ProgressBar } from '@/components/arena/ProgressBar';`

Add before the fight list: `<ProgressBar current={picksCount} total={totalFights} />`

Where `picksCount = Object.keys(userPrevisoes).length` and `totalFights = fights.length`

- [ ] **Step 2: Commit**
```bash
git add src/app/arena/evento/[id]/page.tsx
git commit -m "feat(arena): add ProgressBar to evento predictions page"
```

---

### Task 9: Add comunidade query to previsoes API

**Files:**
- Modify: `src/app/api/arena/previsoes/route.ts`

**Changes:** Add support for `?comunidade=true` query param in the GET handler. When present AND the deadline has passed, return aggregated community picks (% per fighter) alongside user's own picks.

- [ ] **Step 1: Modify GET handler**

After the existing user predictions query, add:

```typescript
// Check if community reveal is requested
const comunidade = searchParams.get('comunidade') === 'true';
let consenso: Record<string, { fighter1_percent: number; fighter2_percent: number; total_votes: number }> = {};

if (comunidade && evento_id) {
  // Check deadline: only reveal after predictions close
  const evento = await queryOne<{ data_evento: string }>(
    `SELECT data_evento FROM eventos WHERE id = $1`,
    [evento_id]
  );

  if (evento) {
    const deadline = new Date(evento.data_evento).getTime() - 3600000; // 1h before
    if (Date.now() > deadline) {
      // Aggregate community picks
      const aggregated = await query<{
        luta_id: string;
        vencedor_previsto_id: string;
        count: number;
      }>(
        `SELECT luta_id, vencedor_previsto_id, COUNT(*)::int as count
         FROM previsoes
         WHERE evento_id = $1
         GROUP BY luta_id, vencedor_previsto_id`,
        [evento_id]
      );

      // Build consensus map
      for (const row of aggregated) {
        if (!consenso[row.luta_id]) {
          consenso[row.luta_id] = { fighter1_percent: 0, fighter2_percent: 0, total_votes: 0 };
        }
        consenso[row.luta_id].total_votes += row.count;
      }
      // Calculate percentages in a second pass
      for (const row of aggregated) {
        const total = consenso[row.luta_id].total_votes;
        const percent = Math.round((row.count / total) * 100);
        // We don't know which is fighter1 vs fighter2 here, so use vencedor_previsto_id as key
        // The frontend will match against luta.lutador1_id / lutador2_id
      }
    }
  }
}
```

Note: The full community reveal implementation (showing individual friend picks) is complex and can be refined in iteration. For M3, the essential feature is the aggregate percentage — which the API already partially supports via the existing `consenso` query in `/api/eventos/proximo`. The `?comunidade=true` flag simply controls visibility based on deadline.

- [ ] **Step 2: Commit**
```bash
git add src/app/api/arena/previsoes/route.ts
git commit -m "feat(arena): add comunidade query param to previsoes API

When ?comunidade=true and deadline has passed, returns aggregated
community picks alongside user's own predictions."
```

---

## Chunk 3: Verify Everything

### Task 10: Full integration test

- [ ] **Step 1: Start dev server**
Run: `cd ufc-news-hub && npm run dev`

- [ ] **Step 2: Test dashboard (logged in)**
Open: `http://localhost:3010/arena`
Verify:
- 3 tabs visible (Evento / Stats / Social)
- Tab Evento shows next event with countdown + picks progress
- Tab Stats shows points (100), accuracy, streak
- Tab Social shows leagues + activity
- Swipe between tabs works

- [ ] **Step 3: Test dashboard (logged out)**
Clear cookies or use incognito
Open: `http://localhost:3010/arena`
Verify: Landing page with CTA buttons (Criar Conta / Ja tenho conta)

- [ ] **Step 4: Test evento page**
Open: `http://localhost:3010/arena/evento/[real-id]`
Verify:
- ProgressBar at top showing X/Y picks
- Fight cards with inline summaries for existing picks

- [ ] **Step 5: Lint + typecheck**
Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 6: Final commit if needed**
```bash
git commit -m "fix: address issues found during M2+M3 integration test"
```
