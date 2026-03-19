# Arena Ao Vivo Redesign + Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Ao Vivo page with LiveCurrentFight card, ranking movement arrows, and live chat (global + per-liga with tab switcher).

**Architecture:** Two sub-projects in sequence. Sub-project 1: visual redesign + ranking arrows (frontend only). Sub-project 2: chat system (new DB table + API + component). Page controller uses existing 15s polling for results, separate 5s polling for chat.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, SWR, PostgreSQL, raw SQL via `query()` from `@/lib/db`

**Spec:** `docs/superpowers/specs/2026-03-19-arena-ao-vivo.md`

**No test framework.** Verification: `cd ufc-news-hub && npx tsc --noEmit && npm run lint && npm run build`

---

## Sub-project 1: Visual Redesign + Ranking Arrows

### Task 1: Create LiveCurrentFight component

**Files:**
- Create: `ufc-news-hub/src/components/arena/LiveCurrentFight.tsx`

- [ ] **Step 1: Create the component**

Uses flat types matching the `/api/arena/live` response (NOT LutaComLutadores). Read the existing types from `ufc-news-hub/src/app/arena/live/page.tsx` lines 15-43 (`UserPick`, `Luta`) — the component reuses those exact interfaces.

```typescript
'use client';

import Image from 'next/image';
import { Zap } from 'lucide-react';
import { sobrenome } from '@/components/arena/shared';

interface UserPick {
  vencedor_previsto_id: string;
  acertou_vencedor: boolean | null;
  pontos_ganhos: number;
}

interface LiveLuta {
  luta_id: string;
  ordem: number;
  tipo: string;
  status: string;
  vencedor_id: string | null;
  metodo: string | null;
  round_final: number | null;
  lutador1_id: string;
  lutador1_nome: string;
  lutador2_id: string;
  lutador2_nome: string;
  userPick: UserPick | null;
}

interface LiveCurrentFightProps {
  luta: LiveLuta;
}

function tipoLabel(tipo: string): string {
  const map: Record<string, string> = {
    main_event: 'MAIN EVENT', co_main: 'CO-MAIN', card_principal: 'MAIN CARD',
    preliminar: 'PRELIMINAR', early_prelim: 'EARLY PRELIM',
  };
  return map[tipo] ?? tipo.toUpperCase();
}

export function LiveCurrentFight({ luta }: LiveCurrentFightProps) {
  const isLive = luta.status === 'ao_vivo';
  const isFinished = luta.status === 'finalizada';
  const isNext = !isLive && !isFinished;
  const pick = luta.userPick;

  const winnerIs1 = luta.vencedor_id === luta.lutador1_id;
  const winnerIs2 = luta.vencedor_id === luta.lutador2_id;

  return (
    <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-5 space-y-4">
      {/* Status + Type */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-display uppercase tracking-widest text-white/40">
          {tipoLabel(luta.tipo)}
        </span>
        {isLive && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ufc-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-[10px] font-bold text-white uppercase">Em Andamento</span>
          </div>
        )}
        {isFinished && (
          <span className="text-[10px] font-bold text-green-400 uppercase bg-green-400/10 px-2.5 py-1 rounded-full">
            Finalizada
          </span>
        )}
        {isNext && (
          <span className="text-[10px] font-bold text-white/30 uppercase bg-white/5 px-2.5 py-1 rounded-full">
            Proxima
          </span>
        )}
      </div>

      {/* Fighters */}
      <div className="flex items-center justify-between gap-4">
        <div className={`flex-1 text-center space-y-2 ${isFinished && winnerIs1 ? '' : isFinished ? 'opacity-40' : ''}`}>
          <div className="font-display text-xl uppercase text-white">
            {sobrenome(luta.lutador1_nome)}
          </div>
          {isFinished && winnerIs1 && (
            <div className="text-xs text-green-400 font-semibold">VENCEDOR</div>
          )}
        </div>

        <div className="text-white/20 font-display text-lg">VS</div>

        <div className={`flex-1 text-center space-y-2 ${isFinished && winnerIs2 ? '' : isFinished ? 'opacity-40' : ''}`}>
          <div className="font-display text-xl uppercase text-white">
            {sobrenome(luta.lutador2_nome)}
          </div>
          {isFinished && winnerIs2 && (
            <div className="text-xs text-green-400 font-semibold">VENCEDOR</div>
          )}
        </div>
      </div>

      {/* Method + Round (if finished) */}
      {isFinished && luta.metodo && (
        <div className="text-center text-sm text-white/50">
          {luta.metodo}{luta.round_final ? ` · R${luta.round_final}` : ''}
        </div>
      )}

      {/* User pick */}
      {pick && (
        <div className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border ${
          pick.acertou_vencedor === true ? 'bg-green-500/10 border-green-500/30 text-green-400' :
          pick.acertou_vencedor === false ? 'bg-red-500/10 border-red-500/30 text-red-400' :
          'bg-white/5 border-white/10 text-white/50'
        }`}>
          <Zap className="w-3.5 h-3.5" />
          <span className="text-sm">
            Seu pick: <span className="font-semibold">
              {pick.vencedor_previsto_id === luta.lutador1_id ? sobrenome(luta.lutador1_nome) : sobrenome(luta.lutador2_nome)}
            </span>
          </span>
          {pick.acertou_vencedor !== null && (
            <span className="text-xs font-bold ml-1">
              {pick.acertou_vencedor ? `+${pick.pontos_ganhos} pts` : '0 pts'}
            </span>
          )}
          {pick.acertou_vencedor === null && (
            <span className="text-xs text-white/30 ml-1">Em andamento</span>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add "ufc-news-hub/src/components/arena/LiveCurrentFight.tsx"
git commit -m "feat: add LiveCurrentFight component for ao vivo page"
```

---

### Task 2: Add movement arrows to LiveLeaderboard

**Files:**
- Modify: `ufc-news-hub/src/components/arena/LiveLeaderboard.tsx`

- [ ] **Step 1: Read the current file and add `movimentos` prop**

Add to `LiveLeaderboardProps`:
```typescript
interface LiveLeaderboardProps {
  leaderboard: LeaderboardEntry[];
  meuUsuarioId: string | null;
  movimentos?: Record<string, number>;  // userId → delta (positive = moved up)
}
```

- [ ] **Step 2: Add arrow rendering in each row**

After the username/display_name span in each leaderboard row, add:
```typescript
{movimentos?.[entry.usuario_id] != null && movimentos[entry.usuario_id] !== 0 && (
  <span className={`text-xs font-bold ml-1 ${
    movimentos[entry.usuario_id] > 0 ? 'text-green-400' : 'text-red-400'
  }`}>
    {movimentos[entry.usuario_id] > 0 ? '↑' : '↓'}
    {Math.abs(movimentos[entry.usuario_id])}
  </span>
)}
```

- [ ] **Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add "ufc-news-hub/src/components/arena/LiveLeaderboard.tsx"
git commit -m "feat: add movement arrows to LiveLeaderboard"
```

---

### Task 3: Rewrite live/page.tsx controller

**Files:**
- Modify: `ufc-news-hub/src/app/arena/live/page.tsx`

- [ ] **Step 1: Read the current file fully, then rewrite**

The rewrite keeps:
- SWR polling logic (15s live, 0 finalized)
- `EventResultView` but refactored to use `LiveCurrentFight` and pass `movimentos` to `LiveLeaderboard`
- Countdown/no-event view
- Recent events list
- `EventInfo`, `LiveData`, `Luta`, `UserPick`, `LeaderboardEntry`, `EventoRecente` types

Adds:
- `useRef<Map<string, number>>` for previous ranking positions
- Movement delta calculation on each SWR data update
- `LiveCurrentFight` rendering — select fight: first `ao_vivo`, or last `finalizada`, or first `agendada`
- Import EventHeader for the live event header (map `local_evento` to `local`)
- Fetch user's first liga in parallel: `GET /api/arena/ligas?tipo=minhas&limit=1`
- `LiveChat` component placeholder (will be added in Task 6)

The ranking movement logic:
```typescript
const prevPositions = useRef<Map<string, number>>(new Map());
const [movimentos, setMovimentos] = useState<Record<string, number>>({});

// Inside SWR onSuccess or useEffect watching data:
useEffect(() => {
  if (!data?.leaderboard) return;
  const newMovimentos: Record<string, number> = {};
  data.leaderboard.forEach((entry, i) => {
    const pos = i + 1;
    const prev = prevPositions.current.get(entry.usuario_id);
    if (prev !== undefined && prev !== pos) {
      newMovimentos[entry.usuario_id] = prev - pos; // positive = moved up
    }
  });
  // Update ref for next comparison
  const newMap = new Map<string, number>();
  data.leaderboard.forEach((entry, i) => newMap.set(entry.usuario_id, i + 1));
  prevPositions.current = newMap;
  if (Object.keys(newMovimentos).length > 0) setMovimentos(newMovimentos);
}, [data?.leaderboard]);
```

Current fight selection:
```typescript
const currentFight = useMemo(() => {
  if (!data?.lutas) return null;
  const live = data.lutas.find(l => l.status === 'ao_vivo');
  if (live) return live;
  const finished = [...data.lutas].filter(l => l.status === 'finalizada').sort((a, b) => b.ordem - a.ordem);
  if (finished.length > 0) return finished[0];
  const upcoming = [...data.lutas].filter(l => l.status !== 'finalizada').sort((a, b) => a.ordem - b.ordem);
  return upcoming[0] ?? null;
}, [data?.lutas]);
```

- [ ] **Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add "ufc-news-hub/src/app/arena/live/page.tsx"
git commit -m "refactor: live page with LiveCurrentFight, ranking arrows, EventHeader"
```

---

## Sub-project 2: Live Chat

### Task 4: Create chat_evento table

**Files:**
- Create: `ufc-news-hub/prisma/migrations/YYYYMMDD_chat_evento/migration.sql` (or run directly)

- [ ] **Step 1: Run SQL to create the table**

Since the project uses raw SQL pattern alongside Prisma, create the table directly:

```bash
cd ufc-news-hub && node -e "
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query(\`
  CREATE TABLE IF NOT EXISTS chat_evento (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
    mensagem TEXT NOT NULL CHECK (char_length(mensagem) <= 280),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS idx_chat_evento_evento_created ON chat_evento(evento_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_chat_evento_usuario ON chat_evento(usuario_id);
\`).then(() => { console.log('chat_evento table created'); pool.end(); }).catch(e => { console.error(e); pool.end(); });
"
```

- [ ] **Step 2: Add model to Prisma schema**

Add to `ufc-news-hub/prisma/schema.prisma`:
```prisma
model chat_evento {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  evento_id  String   @db.Uuid
  usuario_id String   @db.Uuid
  mensagem   String
  created_at DateTime @default(now()) @db.Timestamptz()

  evento  eventos        @relation(fields: [evento_id], references: [id], onDelete: Cascade)
  usuario usuarios_arena @relation(fields: [usuario_id], references: [id], onDelete: Cascade)

  @@index([evento_id, created_at(sort: Desc)])
  @@index([usuario_id])
}
```

Also add the reverse relation to the `eventos` and `usuarios_arena` models:
- In `eventos`: `chat_evento chat_evento[]`
- In `usuarios_arena`: `chat_evento chat_evento[]`

- [ ] **Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add "ufc-news-hub/prisma/schema.prisma"
git commit -m "feat: add chat_evento table and Prisma model"
```

---

### Task 5: Create chat API endpoint

**Files:**
- Create: `ufc-news-hub/src/app/api/arena/live/chat/route.ts`

- [ ] **Step 1: Create GET + POST handlers**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface ChatMessage {
  id: string;
  usuario_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  mensagem: string;
  created_at: string;
}

export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventoId = searchParams.get('evento_id');
    const after = searchParams.get('after');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 100);

    if (!eventoId) {
      return NextResponse.json({ error: 'evento_id obrigatorio' }, { status: 400 });
    }

    const mensagens = await query<ChatMessage>(
      `SELECT * FROM (
        SELECT c.id, c.usuario_id, u.username, u.display_name, u.avatar_url,
               c.mensagem, c.created_at
        FROM chat_evento c
        JOIN usuarios_arena u ON u.id = c.usuario_id
        WHERE c.evento_id = $1
          ${after ? 'AND c.created_at > $3' : ''}
        ORDER BY c.created_at DESC
        LIMIT $2
      ) sub ORDER BY sub.created_at ASC`,
      after ? [eventoId, limit, after] : [eventoId, limit]
    );

    const onlineResult = await queryOne<{ count: number }>(
      `SELECT COUNT(DISTINCT usuario_id)::int as count
       FROM chat_evento
       WHERE evento_id = $1 AND created_at > NOW() - interval '5 minutes'`,
      [eventoId]
    );

    return NextResponse.json(
      { mensagens, online_count: onlineResult?.count ?? 0 },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('[API /arena/live/chat GET] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const body = await request.json() as { evento_id?: string; mensagem?: string };
    const { evento_id, mensagem: rawMsg } = body;

    if (!evento_id || !rawMsg) {
      return NextResponse.json({ error: 'evento_id e mensagem obrigatorios' }, { status: 400 });
    }

    const mensagem = rawMsg.trim();
    if (mensagem.length < 1 || mensagem.length > 280) {
      return NextResponse.json({ error: 'Mensagem deve ter entre 1 e 280 caracteres' }, { status: 400 });
    }

    // Verify evento exists and is active
    const evento = await queryOne<{ status: string }>(
      `SELECT status FROM eventos WHERE id = $1`,
      [evento_id]
    );
    if (!evento || (evento.status !== 'ao_vivo' && evento.status !== 'agendado')) {
      return NextResponse.json({ error: 'Evento nao encontrado ou finalizado' }, { status: 400 });
    }

    // Rate limit: 1 message per 2 seconds
    const lastMsg = await queryOne<{ created_at: string }>(
      `SELECT created_at FROM chat_evento WHERE usuario_id = $1 AND evento_id = $2 ORDER BY created_at DESC LIMIT 1`,
      [usuario.id, evento_id]
    );
    if (lastMsg) {
      const diff = Date.now() - new Date(lastMsg.created_at).getTime();
      if (diff < 2000) {
        return NextResponse.json({ error: 'Aguarde 2 segundos entre mensagens' }, { status: 429 });
      }
    }

    const novaMensagem = await queryOne<ChatMessage>(
      `WITH inserted AS (
        INSERT INTO chat_evento (evento_id, usuario_id, mensagem)
        VALUES ($1, $2, $3)
        RETURNING *
      )
      SELECT i.id, i.usuario_id, u.username, u.display_name, u.avatar_url,
             i.mensagem, i.created_at
      FROM inserted i
      JOIN usuarios_arena u ON u.id = i.usuario_id`,
      [evento_id, usuario.id, mensagem]
    );

    return NextResponse.json(novaMensagem, { status: 201 });
  } catch (error) {
    console.error('[API /arena/live/chat POST] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add "ufc-news-hub/src/app/api/arena/live/chat/route.ts"
git commit -m "feat: add live chat API (GET/POST) with rate limiting"
```

---

### Task 6: Update liga chat API with `after` param

**Files:**
- Modify: `ufc-news-hub/src/app/api/arena/ligas/[ligaId]/chat/route.ts`

- [ ] **Step 1: Read the file and update GET to support `after` and `limit` params**

In the GET handler, change `_request: NextRequest` to `request: NextRequest` and extract searchParams:

```typescript
export async function GET(request: NextRequest, { params }: RouteParams) {
  // ... auth + member check stays the same ...

  const { searchParams } = new URL(request.url);
  const after = searchParams.get('after');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 100);
```

Update the SQL query to use `after` filter:
```sql
SELECT * FROM (
  SELECT * FROM liga_chat
  WHERE liga_id = $1
    ${after ? 'AND created_at > $3' : ''}
  ORDER BY created_at DESC
  LIMIT $2
) lc
JOIN usuarios_arena ua ON ua.id = lc.usuario_id
ORDER BY lc.created_at ASC
```

With params: `after ? [ligaId, limit, after] : [ligaId, limit]`

- [ ] **Step 2: Update POST message limit from 500 to 280**

Change line 142 from `mensagem.length > 500` to `mensagem.length > 280` and update the error message.

- [ ] **Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add "ufc-news-hub/src/app/api/arena/ligas/[ligaId]/chat/route.ts"
git commit -m "feat: liga chat supports after param for incremental polling, align 280 char limit"
```

---

### Task 7: Create LiveChat component

**Files:**
- Create: `ufc-news-hub/src/components/arena/LiveChat.tsx`

- [ ] **Step 1: Create the component**

```typescript
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  usuario_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  mensagem: string;
  created_at: string;
}

interface ChatResponse {
  mensagens: ChatMessage[];
  online_count?: number;
}

interface LiveChatProps {
  eventoId: string;
  ligaId?: string;
  ligaNome?: string;
}

const fetcher = (url: string) => fetch(url).then(r => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
});

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h`;
}

export function LiveChat({ eventoId, ligaId, ligaNome }: LiveChatProps) {
  const [activeTab, setActiveTab] = useState<'geral' | 'liga'>('geral');
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastTimestampRef = useRef<string | null>(null);

  // Build SWR URL based on active tab
  const chatUrl = activeTab === 'geral'
    ? `/api/arena/live/chat?evento_id=${eventoId}&limit=50${lastTimestampRef.current ? `&after=${encodeURIComponent(lastTimestampRef.current)}` : ''}`
    : ligaId
      ? `/api/arena/ligas/${ligaId}/chat?limit=50${lastTimestampRef.current ? `&after=${encodeURIComponent(lastTimestampRef.current)}` : ''}`
      : null;

  const { data } = useSWR<ChatResponse>(
    chatUrl,
    fetcher,
    { refreshInterval: 5000, revalidateOnFocus: false, dedupingInterval: 3000 }
  );

  // Merge new messages
  useEffect(() => {
    if (!data?.mensagens?.length) return;
    setLocalMessages(prev => {
      const existingIds = new Set(prev.map(m => m.id));
      const newMsgs = data.mensagens.filter(m => !existingIds.has(m.id));
      if (newMsgs.length === 0) return prev;
      const merged = [...prev, ...newMsgs];
      // Keep last 100 messages max
      return merged.slice(-100);
    });
    const lastMsg = data.mensagens[data.mensagens.length - 1];
    if (lastMsg) lastTimestampRef.current = lastMsg.created_at;
  }, [data?.mensagens]);

  // Reset when tab changes
  useEffect(() => {
    setLocalMessages([]);
    lastTimestampRef.current = null;
  }, [activeTab]);

  // Auto-scroll (only if near bottom)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localMessages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isSending || cooldown) return;

    const mensagem = input.trim();
    if (mensagem.length > 280) return;

    setIsSending(true);
    setInput('');

    try {
      const url = activeTab === 'geral'
        ? '/api/arena/live/chat'
        : `/api/arena/ligas/${ligaId}/chat`;

      const body = activeTab === 'geral'
        ? { evento_id: eventoId, mensagem }
        : { mensagem };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const msg = await res.json() as ChatMessage;
        setLocalMessages(prev => [...prev, msg]);
        lastTimestampRef.current = msg.created_at;
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        // Cooldown
        setCooldown(true);
        setTimeout(() => setCooldown(false), 2000);
      }
    } catch { /* silent */ }
    setIsSending(false);
  }, [input, isSending, cooldown, activeTab, eventoId, ligaId]);

  const onlineCount = (data as ChatResponse & { online_count?: number })?.online_count ?? 0;

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-white/40" />
          {ligaId ? (
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('geral')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'geral' ? 'bg-ufc-red text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                Geral
              </button>
              <button
                onClick={() => setActiveTab('liga')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'liga' ? 'bg-ufc-red text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {ligaNome ?? 'Liga'}
              </button>
            </div>
          ) : (
            <span className="text-xs font-display uppercase text-white/50">Chat ao Vivo</span>
          )}
        </div>
        {onlineCount > 0 && (
          <span className="text-[10px] text-white/30">{onlineCount} online</span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollContainerRef} className="h-72 overflow-y-auto px-4 py-3 space-y-2.5">
        {localMessages.length === 0 && (
          <div className="flex items-center justify-center h-full text-sm text-white/20">
            Nenhuma mensagem ainda. Comece a conversa!
          </div>
        )}
        {localMessages.map(msg => (
          <div key={msg.id} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-bold text-white/30 shrink-0 mt-0.5">
              {(msg.display_name ?? msg.username).slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-white/70">{msg.display_name ?? msg.username}</span>
              <span className="text-xs text-white/20 ml-1.5">{timeAgo(msg.created_at)}</span>
              <p className="text-sm text-white/60 break-words">{msg.mensagem}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Digite sua mensagem..."
          maxLength={280}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-ufc-red/50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isSending || cooldown}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-ufc-red hover:bg-ufc-redLight disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add "ufc-news-hub/src/components/arena/LiveChat.tsx"
git commit -m "feat: add LiveChat component with global + liga tabs"
```

---

### Task 8: Integrate LiveChat into live page

**Files:**
- Modify: `ufc-news-hub/src/app/arena/live/page.tsx`

- [ ] **Step 1: Add LiveChat import and rendering**

Import: `import { LiveChat } from '@/components/arena/LiveChat';`

Add state for liga:
```typescript
const [liga, setLiga] = useState<{ id: string; nome: string } | null>(null);
```

Fetch liga in useEffect (alongside existing data):
```typescript
useEffect(() => {
  fetch('/api/arena/ligas?tipo=minhas&limit=1')
    .then(r => r.ok ? r.json() : null)
    .then((d: { ligas?: Array<{ id: string; nome: string }> } | null) => {
      if (d?.ligas?.[0]) setLiga(d.ligas[0]);
    })
    .catch(() => {});
}, []);
```

Add LiveChat after leaderboard in EventResultView JSX:
```typescript
<LiveChat
  eventoId={eventoId}
  ligaId={liga?.id}
  ligaNome={liga?.nome}
/>
```

- [ ] **Step 2: Verify full build**

Run: `cd ufc-news-hub && npm run lint && npx tsc --noEmit && npm run build`

- [ ] **Step 3: Commit**

```bash
git add "ufc-news-hub/src/app/arena/live/page.tsx"
git commit -m "feat: integrate LiveChat into ao vivo page"
```

---

### Task 9: Deploy and verify

- [ ] **Step 1: Full build**

Run: `cd ufc-news-hub && npm run build`

- [ ] **Step 2: Deploy**

Run: `cd /Users/gabz_cresta/Desktop/ufcnews && npx vercel --prod`

- [ ] **Step 3: Push to GitHub**

```bash
git push
```
