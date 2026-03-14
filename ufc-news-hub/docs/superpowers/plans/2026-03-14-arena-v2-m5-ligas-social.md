# Arena v2 — M5: Ligas & Social Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activate league chat (DB table exists, needs API + frontend), create invite-via-link page, and fix the N+1 query in amigos API.

**Architecture:** Create chat API (`/api/arena/ligas/[ligaId]/chat`) for GET/POST messages. Create `LigaChat` component with polling (10s). Replace placeholder in liga detail page. Create `/arena/ligas/join/[codigo]` page for link-based invites. Fix N+1 in amigos GET.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, raw SQL, polling

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (section M5)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/api/arena/ligas/[ligaId]/chat/route.ts` | CREATE | GET messages (paginated) + POST new message |
| `src/components/arena/LigaChat.tsx` | CREATE | Chat UI with polling, message list, input |
| `src/app/arena/ligas/[id]/page.tsx` | MODIFY | Replace chat placeholder with LigaChat |
| `src/app/arena/ligas/join/[codigo]/page.tsx` | CREATE | Join league via shareable link |
| `src/app/api/arena/amigos/route.ts` | MODIFY | Fix N+1 query in GET handler |

---

### Task 1: Create liga chat API

**Files:**
- Create: `src/app/api/arena/ligas/[ligaId]/chat/route.ts`

**Context:** `liga_chat` table exists with: id, liga_id, usuario_id, mensagem, created_at. Indexed on (liga_id, created_at DESC).

- [ ] **Step 1: Create route**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ligaId: string }> }
) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const { ligaId } = await params;

    // Verify membership
    const membro = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );
    if (!membro) {
      return NextResponse.json({ error: 'Nao e membro desta liga' }, { status: 403 });
    }

    const mensagens = await query<{
      id: string;
      usuario_id: string;
      username: string;
      display_name: string | null;
      avatar_url: string | null;
      mensagem: string;
      created_at: string;
    }>(
      `SELECT c.id, c.usuario_id, u.username, u.display_name, u.avatar_url, c.mensagem, c.created_at
       FROM liga_chat c
       JOIN usuarios_arena u ON u.id = c.usuario_id
       WHERE c.liga_id = $1
       ORDER BY c.created_at DESC
       LIMIT 50`,
      [ligaId]
    );

    return NextResponse.json(mensagens.reverse(), {
      headers: { 'Cache-Control': 'private, max-age=5' },
    });
  } catch (error) {
    console.error('[API /arena/ligas/chat GET] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ligaId: string }> }
) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const { ligaId } = await params;
    const body = await request.json();
    const mensagem = (body.mensagem || '').trim();

    if (!mensagem || mensagem.length > 500) {
      return NextResponse.json({ error: 'Mensagem invalida (1-500 caracteres)' }, { status: 400 });
    }

    // Verify membership
    const membro = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );
    if (!membro) {
      return NextResponse.json({ error: 'Nao e membro desta liga' }, { status: 403 });
    }

    const result = await queryOne<{ id: string; created_at: string }>(
      `INSERT INTO liga_chat (liga_id, usuario_id, mensagem)
       VALUES ($1, $2, $3)
       RETURNING id, created_at`,
      [ligaId, usuario.id, mensagem]
    );

    return NextResponse.json({
      id: result?.id,
      usuario_id: usuario.id,
      username: usuario.username,
      display_name: usuario.display_name,
      mensagem,
      created_at: result?.created_at,
    }, { status: 201 });
  } catch (error) {
    console.error('[API /arena/ligas/chat POST] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/api/arena/ligas/[ligaId]/chat/
git commit -m "feat(arena): create liga chat API (GET + POST messages)"
```

---

### Task 2: Create LigaChat component

**Files:**
- Create: `src/components/arena/LigaChat.tsx`

- [ ] **Step 1: Create component**

```typescript
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface Mensagem {
  id: string;
  usuario_id: string;
  username: string;
  display_name: string | null;
  mensagem: string;
  created_at: string;
}

interface LigaChatProps {
  ligaId: string;
}

export function LigaChat({ ligaId }: LigaChatProps) {
  const { usuario } = useArenaAuth();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const lastFetchRef = useRef<string>('');

  const fetchMensagens = useCallback(async () => {
    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/chat`);
      if (res.ok) {
        const data = await res.json();
        const newData = JSON.stringify(data);
        if (newData !== lastFetchRef.current) {
          lastFetchRef.current = newData;
          setMensagens(Array.isArray(data) ? data : []);
        }
      }
    } catch { /* silent */ }
    setIsLoading(false);
  }, [ligaId]);

  // Initial fetch + polling (10s)
  useEffect(() => {
    fetchMensagens();

    // Only poll when tab is visible
    let interval: NodeJS.Timeout | null = null;

    const startPolling = () => {
      interval = setInterval(fetchMensagens, 10000);
    };
    const stopPolling = () => {
      if (interval) clearInterval(interval);
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchMensagens();
        startPolling();
      } else {
        stopPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [fetchMensagens]);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const text = input.trim();
    setInput('');
    setIsSending(true);

    // Optimistic add
    const optimistic: Mensagem = {
      id: `temp-${Date.now()}`,
      usuario_id: usuario?.id || '',
      username: usuario?.username || '',
      display_name: usuario?.display_name || null,
      mensagem: text,
      created_at: new Date().toISOString(),
    };
    setMensagens(prev => [...prev, optimistic]);

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem: text }),
      });

      if (res.ok) {
        const saved = await res.json();
        setMensagens(prev => prev.map(m => m.id === optimistic.id ? { ...saved } : m));
      } else {
        setMensagens(prev => prev.filter(m => m.id !== optimistic.id));
      }
    } catch {
      setMensagens(prev => prev.filter(m => m.id !== optimistic.id));
    }
    setIsSending(false);
  };

  if (isLoading) {
    return <div className="h-48 rounded-xl bg-dark-card animate-pulse" />;
  }

  return (
    <div className="neu-card flex flex-col" style={{ height: '20rem' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-dark-border/50">
        <MessageCircle className="w-4 h-4 text-ufc-red" />
        <span className="text-sm font-display uppercase text-dark-text">Chat da Liga</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {mensagens.length === 0 ? (
          <p className="text-sm text-dark-textMuted text-center mt-8">
            Seja o primeiro a mandar mensagem!
          </p>
        ) : (
          mensagens.map((msg) => {
            const isOwn = msg.usuario_id === usuario?.id;
            return (
              <div key={msg.id} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                {!isOwn && (
                  <span className="text-[10px] text-dark-textMuted mb-0.5">
                    {msg.display_name || msg.username}
                  </span>
                )}
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  isOwn
                    ? 'bg-ufc-red/20 text-white'
                    : 'bg-dark-bg/80 text-dark-text'
                }`}>
                  {msg.mensagem}
                </div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 border-t border-dark-border/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escrever mensagem..."
            maxLength={500}
            className="flex-1 bg-dark-bg/50 rounded-lg px-3 py-2 text-sm text-dark-text placeholder-dark-textMuted border border-dark-border/50 focus:border-ufc-red/50 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className="p-2 rounded-lg bg-ufc-red hover:bg-ufc-redLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/arena/LigaChat.tsx
git commit -m "feat(arena): create LigaChat component with polling + optimistic updates"
```

---

### Task 3: Replace chat placeholder in liga detail page

**Files:**
- Modify: `src/app/arena/ligas/[id]/page.tsx`

**Changes:**
1. Import `LigaChat` from `@/components/arena/LigaChat`
2. Find the chat placeholder section (should say "Chat em breve" or similar)
3. Replace with `<LigaChat ligaId={ligaId} />`
4. The `ligaId` is already available from params

- [ ] **Step 1: Modify page**
- [ ] **Step 2: Commit**
```bash
git add src/app/arena/ligas/[id]/page.tsx
git commit -m "feat(arena): activate live chat in liga detail page"
```

---

### Task 4: Create join-via-link page

**Files:**
- Create: `src/app/arena/ligas/join/[codigo]/page.tsx`

- [ ] **Step 1: Create page**

```typescript
'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface PageProps {
  params: Promise<{ codigo: string }>;
}

export default function JoinLigaPage({ params }: PageProps) {
  const { codigo } = use(params);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [status, setStatus] = useState<'loading' | 'joining' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push(`/arena/login?redirect=/arena/ligas/join/${codigo}`);
      return;
    }

    async function joinLiga() {
      setStatus('joining');
      try {
        const res = await fetch('/api/arena/ligas/entrar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigo_convite: codigo }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage(data.liga?.nome || 'Liga');
          setTimeout(() => {
            router.push(`/arena/ligas/${data.liga?.id || ''}`);
          }, 2000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Erro ao entrar na liga');
        }
      } catch {
        setStatus('error');
        setMessage('Erro de conexao');
      }
    }

    joinLiga();
  }, [codigo, isAuthenticated, authLoading, router]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-sm mx-auto neu-card p-8 space-y-4">
        {(status === 'loading' || status === 'joining') && (
          <>
            <Loader2 className="w-12 h-12 text-ufc-red mx-auto animate-spin" />
            <p className="text-dark-text">Entrando na liga...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
            <p className="text-white font-display text-lg uppercase">Bem-vindo!</p>
            <p className="text-dark-textMuted text-sm">Voce entrou na {message}</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-400 mx-auto" />
            <p className="text-white font-display text-lg uppercase">Ops!</p>
            <p className="text-dark-textMuted text-sm">{message}</p>
            <button
              onClick={() => router.push('/arena/ligas')}
              className="neu-button px-6 py-2 bg-dark-card text-dark-text text-sm rounded-lg border border-dark-border"
            >
              Ver Ligas
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/arena/ligas/join/
git commit -m "feat(arena): create join-via-link page for leagues

Users can join leagues by visiting /arena/ligas/join/[codigo].
Redirects to login if not authenticated, auto-joins on load."
```

---

### Task 5: Fix N+1 query in amigos API

**Files:**
- Modify: `src/app/api/arena/amigos/route.ts`

**Changes:** The GET handler currently loops through each friend and runs `queryOne` per friend (N+1). Replace with a single JOIN query.

Find the N+1 pattern and replace with:
```sql
SELECT a.id as amizade_id, a.status, a.created_at,
       u.id, u.username, u.display_name, u.avatar_url, u.nivel, u.pontos_totais
FROM amizades a
JOIN usuarios_arena u ON (
  CASE WHEN a.usuario_id = $1 THEN a.amigo_id ELSE a.usuario_id END = u.id
)
WHERE (a.usuario_id = $1 OR a.amigo_id = $1)
  AND a.status = 'aceita'
ORDER BY u.username
```

- [ ] **Step 1: Read and fix the query**
- [ ] **Step 2: Commit**
```bash
git add src/app/api/arena/amigos/route.ts
git commit -m "fix(arena): replace N+1 query in amigos API with single JOIN"
```

---

### Task 6: Lint + verify

- [ ] **Step 1:** `cd ufc-news-hub && npm run lint && npx tsc --noEmit`
- [ ] **Step 2:** Test chat: `curl -s http://localhost:3010/api/arena/ligas/[liga-id]/chat`
