# Fighter Reactions Real-Time — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace emoji reaction buttons with fighter photos that broadcast reactions in real-time via SSE + PG LISTEN/NOTIFY.

**Architecture:** POST endpoint inserts reaction + PG NOTIFY. SSE stream endpoint opens dedicated PG connection with LISTEN. Client renders fighter photos from currentFight, sends POST on click, receives reactions from SSE stream. Counters persist in DB, update via SSE.

**Tech Stack:** Next.js 15 App Router, PostgreSQL (LISTEN/NOTIFY), SSE (ReadableStream), SWR, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-20-fighter-reactions-design.md`

---

### Task 1: Database — Criar tabela `reacoes_luta`

**Files:**
- Create: `src/app/api/admin/migrations/reacoes-luta/route.ts` (one-time migration endpoint)

- [ ] **Step 1: Criar migration endpoint**

```typescript
// src/app/api/admin/migrations/reacoes-luta/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS reacoes_luta (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        luta_id UUID NOT NULL REFERENCES lutas(id) ON DELETE CASCADE,
        lutador_id UUID NOT NULL REFERENCES lutadores(id) ON DELETE CASCADE,
        usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await query(`CREATE INDEX IF NOT EXISTS idx_reacoes_luta_luta_id ON reacoes_luta(luta_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_reacoes_luta_created ON reacoes_luta(created_at)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_reacoes_luta_usuario ON reacoes_luta(usuario_id, created_at)`);

    return NextResponse.json({ ok: true, message: 'Tabela reacoes_luta criada' });
  } catch (error) {
    console.error('[Migration reacoes_luta]', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

- [ ] **Step 2: Executar migration**

Run: `curl -X POST http://localhost:3010/api/admin/migrations/reacoes-luta`
Expected: `{"ok":true,"message":"Tabela reacoes_luta criada"}`

- [ ] **Step 3: Verificar tabela no banco**

Run: `curl "http://localhost:3010/api/admin/migrations/reacoes-luta"` (ou verificar via psql)
Verificar que a tabela existe com os indices corretos.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/migrations/reacoes-luta/route.ts
git commit -m "feat: create reacoes_luta table migration"
```

---

### Task 2: API — POST `/api/arena/live/reactions`

**Files:**
- Create: `src/app/api/arena/live/reactions/route.ts`

**Depends on:** Task 1 (tabela precisa existir)

- [ ] **Step 1: Criar endpoint POST**

```typescript
// src/app/api/arena/live/reactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function POST(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const body = await request.json() as { luta_id?: string; lutador_id?: string };
    const { luta_id, lutador_id } = body;

    if (!luta_id || !lutador_id) {
      return NextResponse.json({ error: 'luta_id e lutador_id obrigatorios' }, { status: 400 });
    }

    // Validar que a luta existe e aceita reacoes
    const luta = await queryOne<{ status: string; updated_at: string }>(
      `SELECT status::text, updated_at FROM lutas WHERE id = $1`,
      [luta_id]
    );

    if (!luta) {
      return NextResponse.json({ error: 'Luta nao encontrada' }, { status: 404 });
    }

    // Permitir reacoes em lutas ao_vivo, agendadas, ou finalizadas ha menos de 5 min
    const isFinalizadaRecente = luta.status === 'finalizada' &&
      (Date.now() - new Date(luta.updated_at).getTime()) < 5 * 60 * 1000;

    if (luta.status !== 'ao_vivo' && luta.status !== 'agendada' && !isFinalizadaRecente) {
      return NextResponse.json({ error: 'Luta nao aceita reacoes' }, { status: 400 });
    }

    // Cooldown 500ms por usuario
    const lastReaction = await queryOne<{ created_at: string }>(
      `SELECT created_at FROM reacoes_luta
       WHERE usuario_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [usuario.id]
    );

    if (lastReaction) {
      const diff = Date.now() - new Date(lastReaction.created_at).getTime();
      if (diff < 500) {
        return NextResponse.json({ error: 'Aguarde entre reacoes' }, { status: 429 });
      }
    }

    // INSERT + NOTIFY
    await query(
      `INSERT INTO reacoes_luta (luta_id, lutador_id, usuario_id)
       VALUES ($1, $2, $3)`,
      [luta_id, lutador_id, usuario.id]
    );

    // PG NOTIFY com payload JSON
    const payload = JSON.stringify({
      luta_id,
      lutador_id,
      username: usuario.display_name || usuario.username,
    });
    await query(`SELECT pg_notify('reacoes_channel', $1)`, [payload]);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('[API /arena/live/reactions POST] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Testar POST com curl**

Run:
```bash
# Substituir cookie e IDs reais
curl -X POST http://localhost:3010/api/arena/live/reactions \
  -H "Content-Type: application/json" \
  -H "Cookie: arena_token=SEU_TOKEN" \
  -d '{"luta_id":"ID_REAL","lutador_id":"ID_REAL"}'
```
Expected: `{"ok":true}` com status 201

- [ ] **Step 3: Testar validacoes (sem auth, cooldown, luta invalida)**

Verificar que retorna 401 sem cookie, 429 se muito rapido, 400 se luta finalizada ha mais de 5 min.

- [ ] **Step 4: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 5: Commit**

```bash
git add src/app/api/arena/live/reactions/route.ts
git commit -m "feat: POST /api/arena/live/reactions with PG NOTIFY"
```

---

### Task 3: API — GET `/api/arena/live/reactions/counts`

**Files:**
- Modify: `src/app/api/arena/live/reactions/route.ts` (adicionar GET handler)

**Depends on:** Task 1

- [ ] **Step 1: Adicionar GET handler no mesmo arquivo**

Adicionar ao `src/app/api/arena/live/reactions/route.ts`:

```typescript
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lutaId = searchParams.get('luta_id');

    if (!lutaId) {
      return NextResponse.json({ error: 'luta_id obrigatorio' }, { status: 400 });
    }

    const counts = await query<{ lutador_id: string; count: number }>(
      `SELECT lutador_id, COUNT(*)::int AS count
       FROM reacoes_luta
       WHERE luta_id = $1
       GROUP BY lutador_id`,
      [lutaId]
    );

    const result: Record<string, number> = {};
    for (const row of counts) {
      result[row.lutador_id] = row.count;
    }

    return NextResponse.json(
      { counts: result },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('[API /arena/live/reactions GET] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Testar GET**

Run: `curl "http://localhost:3010/api/arena/live/reactions?luta_id=ID_REAL"`
Expected: `{"counts":{"lutador-uuid-1":5,"lutador-uuid-2":3}}` (ou `{"counts":{}}` se nenhuma reacao)

- [ ] **Step 3: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/app/api/arena/live/reactions/route.ts
git commit -m "feat: GET /api/arena/live/reactions counts endpoint"
```

---

### Task 4: API — SSE Stream `/api/arena/live/reactions/stream`

**Files:**
- Create: `src/app/api/arena/live/reactions/stream/route.ts`

**Depends on:** Task 2 (NOTIFY precisa funcionar)

- [ ] **Step 1: Criar SSE endpoint com PG LISTEN**

```typescript
// src/app/api/arena/live/reactions/stream/route.ts
import { NextRequest } from 'next/server';
import { pool } from '@/lib/db';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventoId = searchParams.get('evento_id');

  if (!eventoId) {
    return new Response(JSON.stringify({ error: 'evento_id obrigatorio' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Obter luta atual para enviar contadores iniciais
  const lutas = await query<{ luta_id: string; status: string }>(
    `SELECT id AS luta_id, status::text
     FROM lutas WHERE evento_id = $1
     ORDER BY CASE WHEN status = 'ao_vivo' THEN 0 ELSE 1 END, ordem DESC
     LIMIT 1`,
    [eventoId]
  );
  const currentLutaId = lutas[0]?.luta_id ?? null;

  // Pool separado para SSE (evita esgotar o pool principal de 20 conexoes)
  // Maximo 5 conexoes SSE simultaneas — apos isso, rejeita novas
  const sseCount = (globalThis as unknown as { __sseCount?: number }).__sseCount ?? 0;
  if (sseCount >= 5) {
    return new Response(JSON.stringify({ error: 'Limite de conexoes SSE atingido' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  (globalThis as unknown as { __sseCount: number }).__sseCount = sseCount + 1;

  const pgClient = await pool.connect();
  await pgClient.query('SET search_path TO public');

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      function send(event: string, data: unknown) {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      }

      // Enviar contadores iniciais da luta atual
      if (currentLutaId) {
        try {
          const result = await pgClient.query(
            `SELECT lutador_id, COUNT(*)::int AS count
             FROM reacoes_luta WHERE luta_id = $1
             GROUP BY lutador_id`,
            [currentLutaId]
          );
          const counts: Record<string, number> = {};
          for (const row of result.rows) {
            counts[row.lutador_id] = row.count;
          }
          send('counts', { luta_id: currentLutaId, counts });
        } catch (err) {
          console.error('[SSE] Error fetching initial counts:', err);
        }
      }

      // LISTEN no canal de reacoes
      try {
        await pgClient.query('LISTEN reacoes_channel');
      } catch (err) {
        console.error('[SSE] LISTEN error:', err);
        pgClient.release();
        controller.close();
        return;
      }

      // Handler para notificacoes PG
      const onNotification = (msg: { channel: string; payload?: string }) => {
        if (msg.channel === 'reacoes_channel' && msg.payload) {
          try {
            const data = JSON.parse(msg.payload);
            send('reaction', data);
          } catch {
            // payload invalido, ignorar
          }
        }
      };

      pgClient.on('notification', onNotification);

      // Heartbeat a cada 15s para manter conexao viva
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      // Cleanup quando cliente desconecta
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        pgClient.removeListener('notification', onNotification);
        pgClient.query('UNLISTEN reacoes_channel').catch(() => {});
        pgClient.release();
        // Decrementar contador SSE
        const g = globalThis as unknown as { __sseCount: number };
        g.__sseCount = Math.max(0, (g.__sseCount ?? 1) - 1);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-store',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
```

- [ ] **Step 2: Testar SSE com curl**

Run (em terminal separado):
```bash
curl -N "http://localhost:3010/api/arena/live/reactions/stream?evento_id=ID_REAL"
```
Expected: Recebe `event: counts` inicial e depois `event: reaction` quando alguem posta via POST.

- [ ] **Step 3: Testar ciclo completo**

1. Abrir SSE em um terminal
2. Enviar POST reaction em outro terminal
3. Verificar que o SSE recebe a reaction

- [ ] **Step 4: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 5: Commit**

```bash
git add src/app/api/arena/live/reactions/stream/route.ts
git commit -m "feat: SSE stream for reactions via PG LISTEN/NOTIFY"
```

---

### Task 5: API — Adicionar fotos dos lutadores no `/api/arena/live`

**Files:**
- Modify: `src/app/api/arena/live/route.ts:106-128` (SQL query de lutas)
- Modify: `src/app/arena/live/page.tsx:24-37` (interface Luta)

**Depends on:** Nenhum

- [ ] **Step 1: Adicionar imagem_url ao SQL das lutas**

No arquivo `src/app/api/arena/live/route.ts`, modificar o SELECT da query de lutas (linhas 107-127) para incluir:

```sql
lut1.imagem_url AS lutador1_foto,
lut2.imagem_url AS lutador2_foto,
```

Adicionar logo apos a linha `COALESCE(l.is_titulo, false) AS is_titulo`.

- [ ] **Step 2: Atualizar interface FightResult no route.ts**

Adicionar ao interface `FightResult` (linha 9-24):

```typescript
lutador1_foto: string | null;
lutador2_foto: string | null;
```

- [ ] **Step 3: Atualizar interface Luta no page.tsx**

Adicionar ao interface `Luta` (linhas 24-37) do `src/app/arena/live/page.tsx`:

```typescript
lutador1_foto: string | null;
lutador2_foto: string | null;
```

- [ ] **Step 4: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 5: Testar endpoint**

Run: `curl "http://localhost:3010/api/arena/live?evento_id=ID_REAL" | jq '.lutas[0] | {lutador1_foto, lutador2_foto}'`
Expected: URLs de imagem ou null

- [ ] **Step 6: Commit**

```bash
git add src/app/api/arena/live/route.ts src/app/arena/live/page.tsx
git commit -m "feat: include fighter photos in /api/arena/live response"
```

---

### Task 6: Componente — Refatorar `FloatingReactions.tsx`

**Files:**
- Modify: `src/components/arena/FloatingReactions.tsx` (rewrite completo)

**Depends on:** Tasks 2, 3, 4, 5

Este e o task principal. O componente sera reescrito completamente.

- [ ] **Step 1: Reescrever FloatingReactions com fotos + SSE**

```typescript
// src/components/arena/FloatingReactions.tsx
'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

interface CurrentFightData {
  luta_id: string;
  status: string;
  lutador1_id: string;
  lutador1_nome: string;
  lutador1_foto: string | null;
  lutador2_id: string;
  lutador2_nome: string;
  lutador2_foto: string | null;
}

interface FloatingReactionsProps {
  currentFight: CurrentFightData | null;
  eventoId: string;
  isAuthenticated: boolean;
  username?: string;
}

interface FloatingReaction {
  id: number;
  lutadorId: string;
  foto: string | null;
  nome: string;
  side: 'red' | 'blue';
  x: number;
}

// ═══════════════════════════════════════════════════════════════
// Fighter Avatar (with fallback)
// ═══════════════════════════════════════════════════════════════

function FighterAvatar({
  foto,
  nome,
  side,
  size = 40,
}: {
  foto: string | null;
  nome: string;
  side: 'red' | 'blue';
  size?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const borderColor = side === 'red' ? 'border-ufc-red' : 'border-blue-400';
  const bgColor = side === 'red' ? 'bg-ufc-red' : 'bg-blue-500';
  const initial = nome.charAt(0).toUpperCase();

  if (!foto || imgError) {
    return (
      <div
        className={`rounded-full ${bgColor} flex items-center justify-center text-white font-bold text-sm border-2 ${borderColor}`}
        style={{ width: size, height: size }}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={`rounded-full overflow-hidden border-2 ${borderColor}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={foto}
        alt={nome}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={() => setImgError(true)}
        unoptimized
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

export function FloatingReactions({ currentFight, eventoId, isAuthenticated, username }: FloatingReactionsProps) {
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [cooldown, setCooldown] = useState(false);
  const [showLoginHint, setShowLoginHint] = useState(false);
  const nextIdRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const eventSourceRef = useRef<EventSource | null>(null);
  const prevLutaIdRef = useRef<string | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // SSE connection
  useEffect(() => {
    if (!eventoId) return;

    const es = new EventSource(`/api/arena/live/reactions/stream?evento_id=${eventoId}`);
    eventSourceRef.current = es;

    es.addEventListener('counts', (e) => {
      try {
        const data = JSON.parse(e.data) as { luta_id: string; counts: Record<string, number> };
        if (currentFight && data.luta_id === currentFight.luta_id) {
          setCounts(data.counts);
        }
      } catch { /* ignore */ }
    });

    es.addEventListener('reaction', (e) => {
      try {
        const data = JSON.parse(e.data) as { luta_id: string; lutador_id: string; username: string };
        if (!currentFight || data.luta_id !== currentFight.luta_id) return;

        // Dedup: se e do proprio usuario, pular animacao e contador
        // (ja foram aplicados optimistic no handleClick)
        if (username && data.username === username) return;

        const isF1 = data.lutador_id === currentFight.lutador1_id;
        const side: 'red' | 'blue' = isF1 ? 'red' : 'blue';
        const foto = isF1 ? currentFight.lutador1_foto : currentFight.lutador2_foto;
        const nome = isF1 ? currentFight.lutador1_nome : currentFight.lutador2_nome;

        addFloatingReaction(data.lutador_id, foto, nome, side);

        // Incrementar contador local (so de outros usuarios)
        setCounts(prev => ({
          ...prev,
          [data.lutador_id]: (prev[data.lutador_id] || 0) + 1,
        }));
      } catch { /* ignore */ }
    });

    es.onerror = () => {
      // EventSource reconecta automaticamente
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventoId, currentFight?.luta_id]);

  // Reset quando luta muda
  useEffect(() => {
    if (!currentFight) return;
    if (prevLutaIdRef.current && prevLutaIdRef.current !== currentFight.luta_id) {
      setReactions([]);
      setCounts({});
      // Buscar contadores da nova luta
      fetch(`/api/arena/live/reactions?luta_id=${currentFight.luta_id}`)
        .then(r => r.json())
        .then((data: { counts: Record<string, number> }) => setCounts(data.counts))
        .catch(() => {});
    }
    prevLutaIdRef.current = currentFight.luta_id;
  }, [currentFight?.luta_id, currentFight]);

  const addFloatingReaction = useCallback((lutadorId: string, foto: string | null, nome: string, side: 'red' | 'blue') => {
    const id = nextIdRef.current++;
    const x = 20 + Math.random() * 60;
    setReactions(prev => [...prev.slice(-30), { id, lutadorId, foto, nome, side, x }]);

    const timeout = setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
      timeoutsRef.current.delete(timeout);
    }, 2000);
    timeoutsRef.current.add(timeout);
  }, []);

  // Detectar se luta finalizada ha mais de 5 min (botoes desabilitados)
  const isDisabled = useMemo(() => {
    if (!currentFight || currentFight.status !== 'finalizada') return false;
    // Sem timestamp de finalizacao no client, desabilitar todas as finalizadas
    // (o servidor valida a janela de 5 min)
    return true;
  }, [currentFight]);

  const handleClick = useCallback(async (lutadorId: string, foto: string | null, nome: string, side: 'red' | 'blue') => {
    if (!isAuthenticated) {
      setShowLoginHint(true);
      setTimeout(() => setShowLoginHint(false), 2000);
      return;
    }

    if (cooldown || !currentFight || isDisabled) return;

    // Cooldown visual
    setCooldown(true);
    setTimeout(() => setCooldown(false), 500);

    // Optimistic: animacao local imediata
    addFloatingReaction(lutadorId, foto, nome, side);
    setCounts(prev => ({
      ...prev,
      [lutadorId]: (prev[lutadorId] || 0) + 1,
    }));

    // POST para API
    try {
      const res = await fetch('/api/arena/live/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ luta_id: currentFight.luta_id, lutador_id: lutadorId }),
      });

      if (!res.ok) {
        // Reverter incremento optimistic em caso de erro
        setCounts(prev => ({
          ...prev,
          [lutadorId]: Math.max(0, (prev[lutadorId] || 1) - 1),
        }));
      }
    } catch {
      setCounts(prev => ({
        ...prev,
        [lutadorId]: Math.max(0, (prev[lutadorId] || 1) - 1),
      }));
    }
  }, [isAuthenticated, cooldown, currentFight, addFloatingReaction]);

  if (!currentFight) return null;

  const f1Count = counts[currentFight.lutador1_id] || 0;
  const f2Count = counts[currentFight.lutador2_id] || 0;

  return (
    <div className="relative">
      {/* Floating reactions area */}
      <div className="absolute bottom-full left-0 right-0 h-40 pointer-events-none overflow-hidden">
        {reactions.map(r => (
          <div
            key={r.id}
            className="absolute animate-float-up"
            style={{ left: `${r.x}%`, bottom: 0 }}
          >
            <FighterAvatar foto={r.foto} nome={r.nome} side={r.side} size={40} />
          </div>
        ))}
      </div>

      {/* Fighter reaction buttons */}
      <div className="flex items-center justify-center gap-4 py-2">
        {/* Fighter 1 (Red) */}
        <button
          onClick={() => handleClick(
            currentFight.lutador1_id,
            currentFight.lutador1_foto,
            currentFight.lutador1_nome,
            'red'
          )}
          disabled={cooldown || isDisabled}
          className={`flex flex-col items-center gap-1 transition-all ${
            cooldown || isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
          }`}
          aria-label={`Reagir com ${currentFight.lutador1_nome}`}
        >
          <FighterAvatar
            foto={currentFight.lutador1_foto}
            nome={currentFight.lutador1_nome}
            side="red"
            size={48}
          />
          <span className="text-xs text-ufc-red font-bold tabular-nums">
            {f1Count > 0 ? f1Count.toLocaleString() : ''}
          </span>
        </button>

        {/* VS divider */}
        <span className="text-xs text-dark-textMuted font-display uppercase tracking-widest">vs</span>

        {/* Fighter 2 (Blue) */}
        <button
          onClick={() => handleClick(
            currentFight.lutador2_id,
            currentFight.lutador2_foto,
            currentFight.lutador2_nome,
            'blue'
          )}
          disabled={cooldown || isDisabled}
          className={`flex flex-col items-center gap-1 transition-all ${
            cooldown || isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
          }`}
          aria-label={`Reagir com ${currentFight.lutador2_nome}`}
        >
          <FighterAvatar
            foto={currentFight.lutador2_foto}
            nome={currentFight.lutador2_nome}
            side="blue"
            size={48}
          />
          <span className="text-xs text-blue-400 font-bold tabular-nums">
            {f2Count > 0 ? f2Count.toLocaleString() : ''}
          </span>
        </button>
      </div>

      {/* Login hint */}
      {showLoginHint && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dark-card border border-dark-border rounded-lg px-3 py-1.5 text-xs text-dark-textMuted shadow-lg">
          Faca login para reagir
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/arena/FloatingReactions.tsx
git commit -m "feat: refactor FloatingReactions with fighter photos + SSE real-time"
```

---

### Task 7: Integracao — Conectar FloatingReactions na page

**Files:**
- Modify: `src/app/arena/live/page.tsx:386` (onde FloatingReactions e renderizado)
- Modify: `src/app/arena/live/page.tsx:107-115` (props de EventResultView)

**Depends on:** Tasks 5, 6

- [ ] **Step 1: Adicionar useArenaAuth na page**

Adicionar import no topo de `src/app/arena/live/page.tsx`:

```typescript
import { useArenaAuth } from '@/hooks/useArenaAuth';
```

- [ ] **Step 2: Usar hook dentro de EventResultView**

Dentro da funcao `EventResultView`, adicionar logo apos os hooks existentes (apos linha 164):

```typescript
const { isAuthenticated } = useArenaAuth();
```

- [ ] **Step 3: Passar props para FloatingReactions**

Modificar linha 386, trocar:

```typescript
<FloatingReactions />
```

Por:

```typescript
<FloatingReactions
  currentFight={currentFight}
  eventoId={eventoId}
  isAuthenticated={isAuthenticated}
/>
```

- [ ] **Step 4: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 5: Testar visual no browser**

1. Abrir `http://localhost:3010/arena/live`
2. Verificar que as fotos dos lutadores aparecem no lugar dos emojis
3. Clicar numa foto — verificar animacao flutuante
4. Abrir segunda aba — verificar que reacoes aparecem nas duas

- [ ] **Step 6: Commit**

```bash
git add src/app/arena/live/page.tsx
git commit -m "feat: connect FloatingReactions with currentFight + auth props"
```

---

### Task 8: Passar username para dedup SSE

**Files:**
- Modify: `src/app/arena/live/page.tsx:835-836` (useArenaAuth + props)

**Depends on:** Task 7

A dedup ja esta implementada no componente (Task 6): o handler SSE `reaction` faz `if (username && data.username === username) return;` pra pular reacoes do proprio usuario. Falta apenas passar a prop `username` na page.

- [ ] **Step 1: Extrair username do useArenaAuth**

No `page.tsx`, modificar o destructuring do hook (ja adicionado no Task 7):

```typescript
const { isAuthenticated, usuario } = useArenaAuth();
```

- [ ] **Step 2: Passar username para FloatingReactions**

Modificar o JSX:

```typescript
<FloatingReactions
  currentFight={currentFight}
  eventoId={eventoId}
  isAuthenticated={isAuthenticated}
  username={usuario?.username}
/>
```

- [ ] **Step 3: Lint + typecheck**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 4: Testar em 2 abas**

1. Aba 1: clicar em fighter — ver 1 animacao (optimistic) + 1 incremento no contador
2. Aba 2: ver 1 animacao (via SSE) + 1 incremento no contador
3. Verificar que Aba 1 NAO recebe duplicata (nem animacao extra nem contador duplo)

- [ ] **Step 5: Commit**

```bash
git add src/app/arena/live/page.tsx
git commit -m "fix: pass username to FloatingReactions for SSE dedup"
```

---

### Task 9: Build final + cleanup

**Files:**
- Todos os arquivos modificados

**Depends on:** Todas as tasks anteriores

- [ ] **Step 1: Lint + typecheck completo**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit`

- [ ] **Step 2: Build de producao**

Run: `cd ufc-news-hub && npm run build`
Expected: Build completo sem erros

- [ ] **Step 3: Testar fluxo completo no browser**

1. Abrir `/arena/live` em 2 browsers/abas diferentes (1 logado, 1 nao logado)
2. Browser logado: clicar em foto do lutador → animacao sobe, contador incrementa
3. Browser nao logado: ver animacao do outro usuario, tooltip "Faca login" ao clicar
4. Verificar que contadores estao sincronizados entre abas
5. Se possivel: mudar status de luta no banco e verificar que fotos trocam

- [ ] **Step 4: Remover migration endpoint (opcional)**

Se quiser, remover `src/app/api/admin/migrations/reacoes-luta/route.ts` apos migration executada. Ou manter para re-execucao segura (usa IF NOT EXISTS).

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "feat: fighter photo reactions with real-time SSE broadcast"
```
