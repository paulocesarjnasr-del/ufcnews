# Arena v2 — M4: Perfil Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add event history and share button to the existing Arena profile page. The profile already shows stats, streaks, conquistas — now with scoring working (Z2), these show real data. M4 adds: (1) list of past events with scores, (2) share button to copy profile link.

**Architecture:** Create a new API endpoint `/api/arena/perfil/[username]/historico` that queries `evento_pontuacao` joined with `eventos`. Create an `EventoHistorico` component to display the list. Add a share button to the profile page.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, raw SQL

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (section M4)

**Note:** Grafico de evolucao (recharts) deferred — adds dependency + complexity. Historico list is sufficient for M4 scope.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/api/arena/perfil/[username]/historico/route.ts` | CREATE | GET event history for user |
| `src/components/arena/EventoHistorico.tsx` | CREATE | Renders event history list |
| `src/app/arena/perfil/[username]/page.tsx` | MODIFY | Add historico section + share button |

---

### Task 1: Create historico API

**Files:**
- Create: `src/app/api/arena/perfil/[username]/historico/route.ts`

- [ ] **Step 1: Create the route**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const historico = await query<{
      evento_id: string;
      evento_nome: string;
      evento_data: string;
      pontos_totais: number;
      acertos: number;
      total_lutas: number;
      card_perfeito: boolean;
    }>(
      `SELECT
        ep.evento_id,
        e.nome as evento_nome,
        e.data_evento as evento_data,
        ep.pontos_totais,
        ep.acertos,
        ep.total_lutas,
        COALESCE(ep.card_perfeito, false) as card_perfeito
      FROM evento_pontuacao ep
      JOIN eventos e ON e.id = ep.evento_id
      JOIN usuarios_arena u ON u.id = ep.usuario_id
      WHERE u.username = $1
      ORDER BY e.data_evento DESC
      LIMIT 20`,
      [username]
    );

    return NextResponse.json(historico, {
      headers: { 'Cache-Control': 'public, s-maxage=60' },
    });
  } catch (error) {
    console.error('[API /arena/perfil/historico] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/api/arena/perfil/[username]/historico/
git commit -m "feat(arena): create perfil historico API endpoint"
```

---

### Task 2: Create EventoHistorico component

**Files:**
- Create: `src/components/arena/EventoHistorico.tsx`

- [ ] **Step 1: Create component**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Calendar, Trophy, Star } from 'lucide-react';

interface HistoricoItem {
  evento_id: string;
  evento_nome: string;
  evento_data: string;
  pontos_totais: number;
  acertos: number;
  total_lutas: number;
  card_perfeito: boolean;
}

interface EventoHistoricoProps {
  username: string;
}

export function EventoHistorico({ username }: EventoHistoricoProps) {
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistorico() {
      try {
        const res = await fetch(`/api/arena/perfil/${username}/historico`);
        if (res.ok) {
          const data = await res.json();
          setHistorico(Array.isArray(data) ? data : []);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchHistorico();
  }, [username]);

  if (isLoading) {
    return <div className="h-32 rounded-xl bg-dark-card animate-pulse" />;
  }

  if (historico.length === 0) {
    return (
      <div className="neu-card p-4 text-center">
        <Calendar className="w-8 h-8 text-dark-textMuted mx-auto mb-2" />
        <p className="text-sm text-dark-textMuted">Nenhum evento no historico ainda.</p>
        <p className="text-xs text-dark-textMuted mt-1">Participe de um evento para ver seus resultados aqui!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {historico.map((item) => {
        const date = new Date(item.evento_data);
        const accuracy = item.total_lutas > 0
          ? Math.round((item.acertos / item.total_lutas) * 100)
          : 0;

        return (
          <div key={item.evento_id} className="neu-card p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-sm uppercase text-white truncate">{item.evento_nome}</h4>
                  {item.card_perfeito && (
                    <Star className="w-4 h-4 text-ufc-gold shrink-0" />
                  )}
                </div>
                <p className="text-xs text-dark-textMuted mt-0.5">
                  {date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-lg font-bold text-ufc-gold">{item.pontos_totais}</p>
                <p className="text-xs text-dark-textMuted">
                  {item.acertos}/{item.total_lutas} ({accuracy}%)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/arena/EventoHistorico.tsx
git commit -m "feat(arena): create EventoHistorico component"
```

---

### Task 3: Add historico + share to perfil page

**Files:**
- Modify: `src/app/arena/perfil/[username]/page.tsx`

**Changes:**
1. Import `EventoHistorico` from `@/components/arena/EventoHistorico`
2. Import `Share2` from `lucide-react`
3. Add a share button next to "Editar Perfil" (or in its place for non-own profiles)
4. Add `<EventoHistorico username={username} />` section after the conquistas grid

For the share button:
```tsx
<button
  onClick={() => {
    navigator.clipboard.writeText(`${window.location.origin}/arena/perfil/${username}`);
    // Optional: show toast/feedback
  }}
  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-sm text-dark-textMuted hover:text-dark-text transition-colors"
>
  <Share2 className="w-4 h-4" />
  Compartilhar
</button>
```

- [ ] **Step 1: Add imports and modify page**
- [ ] **Step 2: Verify compiles + lint**
- [ ] **Step 3: Commit**
```bash
git add src/app/arena/perfil/[username]/page.tsx
git commit -m "feat(arena): add event history + share button to profile page"
```
