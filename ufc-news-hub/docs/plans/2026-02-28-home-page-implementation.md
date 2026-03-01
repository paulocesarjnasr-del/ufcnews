# Home Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a new Home page (`/`) with cinematic hero, poll system with comments, and exploration CTAs. Move current news page to `/noticias`.

**Architecture:** New independent page with dedicated components under `src/components/home/`. Poll system uses 3 new raw SQL tables + 5 API routes. Arena auth is optional (hybrid: logged in uses profile, guests comment freely). Existing `/api/eventos/proximo` provides hero data.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS 3, SWR, raw SQL via `query()`/`queryOne()` from `@/lib/db`, `useArenaAuth` for optional auth.

---

### Task 1: Create Database Tables for Poll System

**Files:**
- Create: `src/app/api/admin/migrate-enquetes/route.ts`

**Step 1: Create migration API route**

This project uses raw SQL (not Prisma migrations) for custom tables. Create an admin-protected migration endpoint.

```typescript
// src/app/api/admin/migrate-enquetes/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS enquetes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        evento_id UUID REFERENCES eventos(id),
        luta_id UUID REFERENCES lutas(id),
        pergunta TEXT NOT NULL,
        opcao_a_id UUID REFERENCES lutadores(id),
        opcao_a_nome VARCHAR(100) NOT NULL,
        opcao_b_id UUID REFERENCES lutadores(id),
        opcao_b_nome VARCHAR(100) NOT NULL,
        ativa BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS votos_enquete (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        enquete_id UUID NOT NULL REFERENCES enquetes(id) ON DELETE CASCADE,
        opcao CHAR(1) NOT NULL CHECK (opcao IN ('a', 'b')),
        usuario_id UUID REFERENCES usuarios_arena(id),
        guest_id VARCHAR(64),
        ip_address INET,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_votos_enquete_usuario
        ON votos_enquete(enquete_id, usuario_id)
        WHERE usuario_id IS NOT NULL
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_votos_enquete_guest
        ON votos_enquete(enquete_id, guest_id)
        WHERE guest_id IS NOT NULL
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_votos_enquete_enquete
        ON votos_enquete(enquete_id)
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS comentarios_enquete (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        enquete_id UUID NOT NULL REFERENCES enquetes(id) ON DELETE CASCADE,
        usuario_id UUID REFERENCES usuarios_arena(id),
        guest_nome VARCHAR(50),
        conteudo TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comentarios_enquete_enquete
        ON comentarios_enquete(enquete_id, created_at DESC)
    `);

    await client.query('COMMIT');

    return NextResponse.json({ success: true, message: 'Tables enquetes, votos_enquete, comentarios_enquete created' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[migrate-enquetes] Error:', error);
    return NextResponse.json({ error: 'Migration failed', details: String(error) }, { status: 500 });
  } finally {
    client.release();
  }
}
```

**Step 2: Run migration**

```bash
cd ufc-news-hub && npm run dev
# In another terminal:
curl -X POST http://localhost:3010/api/admin/migrate-enquetes
```

Expected: `{"success":true,"message":"Tables enquetes, votos_enquete, comentarios_enquete created"}`

**Step 3: Verify tables exist**

```bash
# Using psql or the postgres MCP tool:
SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%enquete%';
```

Expected: 3 tables listed.

**Step 4: Commit**

```bash
git add src/app/api/admin/migrate-enquetes/route.ts
git commit -m "feat: add migration for enquetes, votos_enquete, comentarios_enquete tables"
```

---

### Task 2: Create Poll Types

**Files:**
- Create: `src/types/enquete.ts`

**Step 1: Create type definitions**

```typescript
// src/types/enquete.ts

export interface Enquete {
  id: string;
  evento_id: string;
  luta_id: string;
  pergunta: string;
  opcao_a_id: string;
  opcao_a_nome: string;
  opcao_b_id: string;
  opcao_b_nome: string;
  ativa: boolean;
  created_at: string;
}

export interface EnqueteComDetalhes extends Enquete {
  opcao_a_foto: string | null;
  opcao_a_apelido: string | null;
  opcao_a_vitorias: number;
  opcao_a_derrotas: number;
  opcao_a_empates: number;
  opcao_b_foto: string | null;
  opcao_b_apelido: string | null;
  opcao_b_vitorias: number;
  opcao_b_derrotas: number;
  opcao_b_empates: number;
  evento_nome: string;
  total_votos: number;
  votos_a: number;
  votos_b: number;
}

export interface VotoEnquete {
  id: string;
  enquete_id: string;
  opcao: 'a' | 'b';
  usuario_id: string | null;
  guest_id: string | null;
  created_at: string;
}

export interface ComentarioEnquete {
  id: string;
  enquete_id: string;
  usuario_id: string | null;
  guest_nome: string | null;
  conteudo: string;
  created_at: string;
  autor_nome: string;  // computed: display_name or guest_nome
  autor_avatar: string | null;  // from usuarios_arena or null
}

export interface ResultadoEnquete {
  total_votos: number;
  votos_a: number;
  votos_b: number;
  percentual_a: number;
  percentual_b: number;
}
```

**Step 2: Verify types compile**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/types/enquete.ts
git commit -m "feat: add TypeScript types for enquete system"
```

---

### Task 3: Create Poll API Routes

**Files:**
- Create: `src/app/api/enquetes/ativa/route.ts`
- Create: `src/app/api/enquetes/[id]/votar/route.ts`
- Create: `src/app/api/enquetes/[id]/resultado/route.ts`
- Create: `src/app/api/enquetes/[id]/comentarios/route.ts`

**Step 1: GET /api/enquetes/ativa**

```typescript
// src/app/api/enquetes/ativa/route.ts
import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import type { EnqueteComDetalhes } from '@/types/enquete';

export async function GET() {
  try {
    const enquete = await queryOne<EnqueteComDetalhes>(`
      SELECT
        e.*,
        la.imagem_url as opcao_a_foto,
        la.apelido as opcao_a_apelido,
        COALESCE(la.vitorias, 0) as opcao_a_vitorias,
        COALESCE(la.derrotas, 0) as opcao_a_derrotas,
        COALESCE(la.empates, 0) as opcao_a_empates,
        lb.imagem_url as opcao_b_foto,
        lb.apelido as opcao_b_apelido,
        COALESCE(lb.vitorias, 0) as opcao_b_vitorias,
        COALESCE(lb.derrotas, 0) as opcao_b_derrotas,
        COALESCE(lb.empates, 0) as opcao_b_empates,
        ev.nome as evento_nome,
        COALESCE(v.total_votos, 0)::integer as total_votos,
        COALESCE(v.votos_a, 0)::integer as votos_a,
        COALESCE(v.votos_b, 0)::integer as votos_b
      FROM enquetes e
      JOIN lutadores la ON la.id = e.opcao_a_id
      JOIN lutadores lb ON lb.id = e.opcao_b_id
      JOIN eventos ev ON ev.id = e.evento_id
      LEFT JOIN LATERAL (
        SELECT
          COUNT(*)::integer as total_votos,
          COUNT(*) FILTER (WHERE opcao = 'a')::integer as votos_a,
          COUNT(*) FILTER (WHERE opcao = 'b')::integer as votos_b
        FROM votos_enquete
        WHERE enquete_id = e.id
      ) v ON true
      WHERE e.ativa = true
      ORDER BY e.created_at DESC
      LIMIT 1
    `);

    if (!enquete) {
      return NextResponse.json({ enquete: null }, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' },
      });
    }

    return NextResponse.json({ enquete }, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15' },
    });
  } catch (error) {
    console.error('[API /enquetes/ativa] Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar enquete ativa' }, { status: 500 });
  }
}
```

**Step 2: POST /api/enquetes/[id]/votar**

```typescript
// src/app/api/enquetes/[id]/votar/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

interface VotarBody {
  opcao: 'a' | 'b';
  guestId?: string;
  usuarioId?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as VotarBody;
    const { opcao, guestId, usuarioId } = body;

    if (!opcao || !['a', 'b'].includes(opcao)) {
      return NextResponse.json({ error: 'Opcao invalida' }, { status: 400 });
    }

    if (!guestId && !usuarioId) {
      return NextResponse.json({ error: 'guestId ou usuarioId necessario' }, { status: 400 });
    }

    // Check enquete exists and is active
    const enquete = await queryOne<{ id: string; ativa: boolean }>(
      'SELECT id, ativa FROM enquetes WHERE id = $1',
      [id]
    );

    if (!enquete) {
      return NextResponse.json({ error: 'Enquete nao encontrada' }, { status: 404 });
    }

    if (!enquete.ativa) {
      return NextResponse.json({ error: 'Enquete encerrada' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    // Check for duplicate vote
    if (usuarioId) {
      const existing = await queryOne<{ id: string }>(
        'SELECT id FROM votos_enquete WHERE enquete_id = $1 AND usuario_id = $2',
        [id, usuarioId]
      );
      if (existing) {
        return NextResponse.json({ error: 'Voce ja votou nesta enquete' }, { status: 409 });
      }
    } else if (guestId) {
      const existing = await queryOne<{ id: string }>(
        'SELECT id FROM votos_enquete WHERE enquete_id = $1 AND guest_id = $2',
        [id, guestId]
      );
      if (existing) {
        return NextResponse.json({ error: 'Voce ja votou nesta enquete' }, { status: 409 });
      }
    }

    // Insert vote
    await query(
      `INSERT INTO votos_enquete (enquete_id, opcao, usuario_id, guest_id, ip_address)
       VALUES ($1, $2, $3, $4, $5::inet)`,
      [id, opcao, usuarioId || null, guestId || null, ip]
    );

    // Return updated counts
    const resultado = await queryOne<{ total_votos: number; votos_a: number; votos_b: number }>(
      `SELECT
        COUNT(*)::integer as total_votos,
        COUNT(*) FILTER (WHERE opcao = 'a')::integer as votos_a,
        COUNT(*) FILTER (WHERE opcao = 'b')::integer as votos_b
      FROM votos_enquete
      WHERE enquete_id = $1`,
      [id]
    );

    return NextResponse.json({ success: true, resultado });
  } catch (error) {
    console.error('[API /enquetes/votar] Error:', error);
    return NextResponse.json({ error: 'Erro ao registrar voto' }, { status: 500 });
  }
}
```

**Step 3: GET /api/enquetes/[id]/resultado**

```typescript
// src/app/api/enquetes/[id]/resultado/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import type { ResultadoEnquete } from '@/types/enquete';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const resultado = await queryOne<{ total_votos: number; votos_a: number; votos_b: number }>(
      `SELECT
        COUNT(*)::integer as total_votos,
        COUNT(*) FILTER (WHERE opcao = 'a')::integer as votos_a,
        COUNT(*) FILTER (WHERE opcao = 'b')::integer as votos_b
      FROM votos_enquete
      WHERE enquete_id = $1`,
      [id]
    );

    if (!resultado) {
      return NextResponse.json({ error: 'Enquete nao encontrada' }, { status: 404 });
    }

    const total = resultado.total_votos || 1; // avoid division by zero
    const response: ResultadoEnquete = {
      total_votos: resultado.total_votos,
      votos_a: resultado.votos_a,
      votos_b: resultado.votos_b,
      percentual_a: Math.round((resultado.votos_a / total) * 1000) / 10,
      percentual_b: Math.round((resultado.votos_b / total) * 1000) / 10,
    };

    return NextResponse.json(response, {
      headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=5' },
    });
  } catch (error) {
    console.error('[API /enquetes/resultado] Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar resultado' }, { status: 500 });
  }
}
```

**Step 4: GET + POST /api/enquetes/[id]/comentarios**

```typescript
// src/app/api/enquetes/[id]/comentarios/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import type { ComentarioEnquete } from '@/types/enquete';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const pagina = parseInt(searchParams.get('pagina') || '1', 10);
    const porPagina = Math.min(parseInt(searchParams.get('porPagina') || '20', 10), 50);
    const offset = (pagina - 1) * porPagina;

    const comentarios = await query<ComentarioEnquete>(
      `SELECT
        ce.id,
        ce.enquete_id,
        ce.usuario_id,
        ce.guest_nome,
        ce.conteudo,
        ce.created_at,
        COALESCE(ua.display_name, ua.username, ce.guest_nome, 'Anonimo') as autor_nome,
        ua.avatar_url as autor_avatar
      FROM comentarios_enquete ce
      LEFT JOIN usuarios_arena ua ON ua.id = ce.usuario_id
      WHERE ce.enquete_id = $1
      ORDER BY ce.created_at DESC
      LIMIT $2 OFFSET $3`,
      [id, porPagina, offset]
    );

    const countResult = await queryOne<{ total: number }>(
      'SELECT COUNT(*)::integer as total FROM comentarios_enquete WHERE enquete_id = $1',
      [id]
    );

    return NextResponse.json({
      comentarios,
      total: countResult?.total || 0,
      pagina,
      totalPaginas: Math.ceil((countResult?.total || 0) / porPagina),
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=10' },
    });
  } catch (error) {
    console.error('[API /enquetes/comentarios] GET Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar comentarios' }, { status: 500 });
  }
}

interface ComentarioBody {
  conteudo: string;
  guestNome?: string;
  usuarioId?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as ComentarioBody;
    const { conteudo, guestNome, usuarioId } = body;

    if (!conteudo || conteudo.trim().length < 3) {
      return NextResponse.json({ error: 'Comentario muito curto (min 3 caracteres)' }, { status: 400 });
    }

    if (conteudo.length > 500) {
      return NextResponse.json({ error: 'Comentario muito longo (max 500 caracteres)' }, { status: 400 });
    }

    if (!usuarioId && (!guestNome || guestNome.trim().length < 2)) {
      return NextResponse.json({ error: 'Nome necessario para comentar' }, { status: 400 });
    }

    // Rate limit: check last comment from same IP in last 60s
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    // Simple rate limit via recent comment check (not IP-based to keep it simple)

    const comentario = await queryOne<ComentarioEnquete>(
      `INSERT INTO comentarios_enquete (enquete_id, usuario_id, guest_nome, conteudo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, usuarioId || null, guestNome?.trim() || null, conteudo.trim()]
    );

    return NextResponse.json({ success: true, comentario }, { status: 201 });
  } catch (error) {
    console.error('[API /enquetes/comentarios] POST Error:', error);
    return NextResponse.json({ error: 'Erro ao criar comentario' }, { status: 500 });
  }
}
```

**Step 5: Verify all routes compile**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

Expected: No errors.

**Step 6: Commit**

```bash
git add src/app/api/enquetes/
git commit -m "feat: add API routes for enquete system (ativa, votar, resultado, comentarios)"
```

---

### Task 4: Create useEnquete Hook

**Files:**
- Create: `src/hooks/useEnquete.ts`

**Step 1: Create the hook**

```typescript
// src/hooks/useEnquete.ts
'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import type { EnqueteComDetalhes, ResultadoEnquete, ComentarioEnquete } from '@/types/enquete';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface UseEnqueteReturn {
  enquete: EnqueteComDetalhes | null;
  resultado: ResultadoEnquete | null;
  comentarios: ComentarioEnquete[];
  totalComentarios: number;
  isLoading: boolean;
  jaVotou: boolean;
  votar: (opcao: 'a' | 'b') => Promise<{ success: boolean; error?: string }>;
  comentar: (conteudo: string, guestNome?: string) => Promise<{ success: boolean; error?: string }>;
  refreshComentarios: () => void;
}

function getGuestId(): string {
  if (typeof window === 'undefined') return '';
  let guestId = localStorage.getItem('enquete_guest_id');
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem('enquete_guest_id', guestId);
  }
  return guestId;
}

function getVotoCookie(enqueteId: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`enquete_voto_${enqueteId}`);
}

function setVotoCookie(enqueteId: string, opcao: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`enquete_voto_${enqueteId}`, opcao);
}

export function useEnquete(usuarioId?: string | null): UseEnqueteReturn {
  const [isVoting, setIsVoting] = useState(false);

  // Fetch active poll
  const { data: enqueteData, isLoading: loadingEnquete } = useSWR<{ enquete: EnqueteComDetalhes | null }>(
    '/api/enquetes/ativa',
    fetcher,
    { refreshInterval: 60_000, revalidateOnFocus: false }
  );

  const enquete = enqueteData?.enquete || null;
  const enqueteId = enquete?.id;

  // Fetch comments
  const {
    data: comentariosData,
    mutate: mutateComentarios,
  } = useSWR(
    enqueteId ? `/api/enquetes/${enqueteId}/comentarios` : null,
    fetcher,
    { refreshInterval: 30_000, revalidateOnFocus: false }
  );

  // Check if already voted
  const jaVotou = enqueteId ? !!getVotoCookie(enqueteId) : false;

  // Compute resultado from enquete data
  const resultado: ResultadoEnquete | null = enquete ? {
    total_votos: enquete.total_votos,
    votos_a: enquete.votos_a,
    votos_b: enquete.votos_b,
    percentual_a: enquete.total_votos > 0
      ? Math.round((enquete.votos_a / enquete.total_votos) * 1000) / 10
      : 50,
    percentual_b: enquete.total_votos > 0
      ? Math.round((enquete.votos_b / enquete.total_votos) * 1000) / 10
      : 50,
  } : null;

  const votar = useCallback(async (opcao: 'a' | 'b') => {
    if (!enqueteId || isVoting) return { success: false, error: 'Enquete indisponivel' };
    setIsVoting(true);

    try {
      const guestId = getGuestId();
      const res = await fetch(`/api/enquetes/${enqueteId}/votar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opcao, guestId, usuarioId: usuarioId || undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        setVotoCookie(enqueteId, opcao);
        return { success: true };
      }

      return { success: false, error: data.error };
    } catch {
      return { success: false, error: 'Erro de conexao' };
    } finally {
      setIsVoting(false);
    }
  }, [enqueteId, isVoting, usuarioId]);

  const comentar = useCallback(async (conteudo: string, guestNome?: string) => {
    if (!enqueteId) return { success: false, error: 'Enquete indisponivel' };

    try {
      const res = await fetch(`/api/enquetes/${enqueteId}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conteudo,
          guestNome: guestNome || undefined,
          usuarioId: usuarioId || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await mutateComentarios();
        return { success: true };
      }

      return { success: false, error: data.error };
    } catch {
      return { success: false, error: 'Erro de conexao' };
    }
  }, [enqueteId, usuarioId, mutateComentarios]);

  return {
    enquete,
    resultado,
    comentarios: comentariosData?.comentarios || [],
    totalComentarios: comentariosData?.total || 0,
    isLoading: loadingEnquete,
    jaVotou,
    votar,
    comentar,
    refreshComentarios: () => mutateComentarios(),
  };
}
```

**Step 2: Verify compiles**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/hooks/useEnquete.ts
git commit -m "feat: add useEnquete hook for poll data fetching and voting"
```

---

### Task 5: Create HeroCinematico Component

**Files:**
- Create: `src/components/home/HeroCinematico.tsx`

**Step 1: Create the component**

Full cinematic hero with face-off layout, animated countdown, glow effects, and slide-in animations. Uses data from `/api/eventos/proximo` via SWR.

Key details:
- Background: radial gradient `#1a1a2e` → `#0d0d15` with SVG octagon pattern at 5% opacity
- Fighter photos: circular with `ufc.gold` border, red glow shadow, hover scale
- "VS" text: Bebas Neue 64px, `ufc.red` with pulsing glow
- Countdown: individual `neu-inset` blocks with flip animation on number change
- Entry animations: fighters slide in from sides, VS scales in, countdown fades in
- Mobile: vertical layout, 2x2 countdown grid
- Fallback: if no upcoming event, show message "Nenhum evento agendado"
- CTA button: links to `/calendario/evento/[id]`

Data source: `useSWR('/api/eventos/proximo')` — reuse existing API, extract main event fight (highest `ordem` value).

Countdown: `useEffect` with `setInterval(1000)`, compute days/hours/min/sec from `data_evento - Date.now()`.

```bash
# Approximate structure — implement with full Tailwind classes
# Component ~200-250 lines
```

**Step 2: Verify compiles**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 3: Commit**

```bash
git add src/components/home/HeroCinematico.tsx
git commit -m "feat: add HeroCinematico component with countdown and face-off"
```

---

### Task 6: Create EnqueteWidget Components

**Files:**
- Create: `src/components/home/EnqueteWidget.tsx`
- Create: `src/components/home/EnqueteVotacao.tsx`
- Create: `src/components/home/EnqueteResultado.tsx`
- Create: `src/components/home/EnqueteComentarios.tsx`

**Step 1: Create EnqueteVotacao (pre-vote view)**

Two fighter cards side by side with photo, name, record, and "VOTAR" button. On click, calls `votar(opcao)` and transitions to resultado view.

Key details:
- Cards: `neu-card` with hover glow in fighter's color
- Photos: circular, same style as hero but smaller (~100px)
- Record: `W-L-D` format below name
- Button: `neu-button` full width, `ufc.red` accent
- Click animation: card "selects" with ring before transitioning

**Step 2: Create EnqueteResultado (post-vote view)**

Animated bars showing vote percentages. Smooth transition from 0% to actual value.

Key details:
- Two horizontal bars, full width
- Bar A: gradient `ufc.red`, bar B: gradient `ufc.gold`
- Percentage text at end of each bar
- Total votes count below
- Animation: CSS transition `width` 800ms ease-out
- Winner (higher %) gets subtle glow

**Step 3: Create EnqueteComentarios**

List of comments + input form. Detect Arena auth for auto-name.

Key details:
- Comment list: scrollable max-height with `neu-inset` background
- Each comment: author name (bold), text, relative time
- Logged-in users: show avatar + display_name, no name field needed
- Guests: show input for "Seu nome" + comment text
- Submit button: `neu-button`
- Character count: show remaining (max 500)
- SWR refresh every 30s

**Step 4: Create EnqueteWidget (container)**

Wraps all sub-components, manages state transitions (votacao → resultado).

Key details:
- Uses `useEnquete(usuario?.id)` hook
- Uses `useArenaAuth()` to check if logged in
- Loading skeleton while fetching
- Title: "QUEM VENCE O MAIN EVENT?" in Bebas Neue
- `neu-card` wrapper with padding
- If no active poll, show nothing (return null)

**Step 5: Verify compiles**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 6: Commit**

```bash
git add src/components/home/
git commit -m "feat: add EnqueteWidget with voting, results, and comments"
```

---

### Task 7: Create CTAExplorar Component

**Files:**
- Create: `src/components/home/CTAExplorar.tsx`

**Step 1: Create the component**

Grid of 5 cards linking to main sections, each with icon, title, dynamic subtitle, and unique accent color.

Cards:
1. Noticias (Newspaper, `ufc.red`, `/noticias`) — subtitle from `/api/noticias/contadores` total
2. Arena (Target, `ufc.gold`, `/arena`) — "Faca suas previsoes"
3. Analises (BarChart3, teal, `/analises`) — "Analises semanais"
4. Lutadores (Users, blue, `/fighters`) — subtitle from contadores
5. Calendario (Calendar, purple, `/calendario`) — "Proximos eventos"

Key details:
- Section title: "EXPLORE O UFC NEWS HUB" in Bebas Neue
- Grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Cards: `neu-card-hover` with icon, title (Bebas), subtitle (Inter muted)
- Hover: `scale(1.03)` + glow shadow in card's accent color
- Each card uses `Link` with `prefetch={true}`
- Fetch contadores via `useSWR('/api/noticias/contadores')`

**Step 2: Verify compiles**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 3: Commit**

```bash
git add src/components/home/CTAExplorar.tsx
git commit -m "feat: add CTAExplorar component with dynamic section cards"
```

---

### Task 8: Move Current Home to /noticias and Create New Home Page

**Files:**
- Modify: `src/app/page.tsx` (replace with new Home)
- Create: `src/app/noticias/page.tsx` (move old home here)
- Create: `src/app/noticias/layout.tsx` (if needed for TabNavigation)
- Check: `src/app/lutadores/page.tsx`, `src/app/lutas/page.tsx`, `src/app/backstage/page.tsx` — verify they still work

**Step 1: Copy current page.tsx to noticias/page.tsx**

Move the entire contents of `src/app/page.tsx` to `src/app/noticias/page.tsx`. Adjust imports if needed. This page should continue to use `MainLayout` with `TabNavigation`.

**Step 2: Create new Home page at src/app/page.tsx**

```typescript
// src/app/page.tsx
import { Header } from '@/components/ui/Header';
import { HeroCinematico } from '@/components/home/HeroCinematico';
import { EnqueteWidget } from '@/components/home/EnqueteWidget';
import { CTAExplorar } from '@/components/home/CTAExplorar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <HeroCinematico />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <EnqueteWidget />
          <CTAExplorar />
        </div>
      </main>
    </div>
  );
}
```

Note: Home does NOT use `MainLayout` (no TabNavigation). It uses Header directly.

**Step 3: Verify category pages still work**

Check that `/lutadores`, `/lutas`, `/backstage` pages still render correctly. They should have their own `useNoticias({ categoria: '...' })` calls and not depend on `/` route.

**Step 4: Verify compiles and lint**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 5: Commit**

```bash
git add src/app/page.tsx src/app/noticias/
git commit -m "feat: create new Home page, move news to /noticias"
```

---

### Task 9: Update Header Navigation

**Files:**
- Modify: `src/components/ui/Header.tsx`

**Step 1: Update mainNav array**

Change the nav items to add Home and update Noticias route:

```typescript
// BEFORE:
const mainNav = [
  { href: '/', label: 'Noticias', icon: Newspaper },
  { href: '/fighters', label: 'Lutadores', icon: Users },
  // ...
];

// AFTER:
const mainNav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/noticias', label: 'Noticias', icon: Newspaper },
  { href: '/fighters', label: 'Lutadores', icon: Users },
  { href: '/analises', label: 'Análises', icon: BarChart3 },
  { href: '/arena', label: 'Arena', icon: Target },
  { href: '/calendario', label: 'Calendario', icon: Calendar },
];
```

Add `Home` to the lucide-react import: `import { Home, Newspaper, Users, BarChart3, Target, Calendar } from 'lucide-react'`

**Step 2: Update isActive logic**

The current `isActive` function uses `pathname === '/'` for the home route. Now Home is at `/` and Noticias is at `/noticias`, so update:

```typescript
const isActive = (href: string) => {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
};
```

This already works correctly since `/noticias` starts with `/noticias`.

**Step 3: Verify compiles**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 4: Commit**

```bash
git add src/components/ui/Header.tsx
git commit -m "feat: add Home tab to header navigation, update Noticias to /noticias"
```

---

### Task 10: Update TabNavigation for /noticias Base Route

**Files:**
- Modify: `src/components/ui/TabNavigation.tsx`

**Step 1: Update tab hrefs**

```typescript
// BEFORE:
const tabs: Tab[] = [
  { href: '/', label: 'Todas', countKey: 'todas', icon: LayoutGrid },
  { href: '/lutadores', label: 'Lutadores', countKey: 'lutadores', icon: Users },
  // ...
];

// AFTER:
const tabs: Tab[] = [
  { href: '/noticias', label: 'Todas', countKey: 'todas', icon: LayoutGrid },
  { href: '/lutadores', label: 'Lutadores', countKey: 'lutadores', icon: Users },
  { href: '/lutas', label: 'Lutas', countKey: 'lutas', icon: Swords },
  { href: '/backstage', label: 'Backstage', countKey: 'backstage', icon: Clapperboard },
];
```

**Step 2: Verify the isActive logic works with new routes**

The `isActive` comparison `pathname === tab.href` should work since `/noticias === '/noticias'`.

**Step 3: Commit**

```bash
git add src/components/ui/TabNavigation.tsx
git commit -m "refactor: update TabNavigation hrefs from / to /noticias"
```

---

### Task 11: Update Internal Links

**Files:**
- Search and update all internal links pointing to `/` that should now point to `/noticias`

**Step 1: Search for links to root**

```bash
cd ufc-news-hub && grep -rn "href=\"/\"" src/ --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v ".next"
```

**Step 2: Evaluate each match**

For each link found:
- If it's a "back to news" or "see all news" link → change to `/noticias`
- If it's a logo/home link → keep as `/`
- If it's in Header nav → already handled in Task 9

Common places to check:
- News card "back" links
- Breadcrumbs
- Footer links
- 404 page "go home" links

**Step 3: Verify compiles**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: update internal links from / to /noticias where appropriate"
```

---

### Task 12: Create Seed Enquete for Testing

**Files:**
- Create: `src/app/api/admin/seed-enquete/route.ts`

**Step 1: Create seed endpoint**

This creates a test poll linked to the next upcoming event's main event fight.

```typescript
// src/app/api/admin/seed-enquete/route.ts
import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function POST() {
  try {
    // Get next event
    const evento = await queryOne<{ id: string; nome: string }>(
      `SELECT id, nome FROM eventos
       WHERE status = 'agendado' AND data_evento > NOW()
       ORDER BY data_evento ASC LIMIT 1`
    );

    if (!evento) {
      return NextResponse.json({ error: 'No upcoming event found' }, { status: 404 });
    }

    // Get main event fight
    const luta = await queryOne<{
      id: string;
      lutador1_id: string;
      lutador2_id: string;
      l1_nome: string;
      l2_nome: string;
    }>(
      `SELECT l.id, l.lutador1_id, l.lutador2_id,
              l1.nome as l1_nome, l2.nome as l2_nome
       FROM lutas l
       JOIN lutadores l1 ON l1.id = l.lutador1_id
       JOIN lutadores l2 ON l2.id = l.lutador2_id
       WHERE l.evento_id = $1
       ORDER BY l.ordem DESC
       LIMIT 1`,
      [evento.id]
    );

    if (!luta) {
      return NextResponse.json({ error: 'No fights found for event' }, { status: 404 });
    }

    // Deactivate existing polls
    await query('UPDATE enquetes SET ativa = false WHERE ativa = true', []);

    // Create new poll
    const enquete = await queryOne<{ id: string }>(
      `INSERT INTO enquetes (evento_id, luta_id, pergunta, opcao_a_id, opcao_a_nome, opcao_b_id, opcao_b_nome, ativa)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING id`,
      [
        evento.id,
        luta.id,
        `Quem vence o main event do ${evento.nome}?`,
        luta.lutador1_id,
        luta.l1_nome,
        luta.lutador2_id,
        luta.l2_nome,
      ]
    );

    return NextResponse.json({
      success: true,
      enquete_id: enquete?.id,
      evento: evento.nome,
      luta: `${luta.l1_nome} vs ${luta.l2_nome}`,
    });
  } catch (error) {
    console.error('[seed-enquete] Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

**Step 2: Run seed**

```bash
curl -X POST http://localhost:3010/api/admin/seed-enquete
```

**Step 3: Commit**

```bash
git add src/app/api/admin/seed-enquete/route.ts
git commit -m "feat: add seed endpoint to create test poll from next event"
```

---

### Task 13: Full Integration Test and Visual Verification

**Step 1: Start dev server**

```bash
cd ufc-news-hub && npm run dev
```

**Step 2: Run migrations and seed**

```bash
curl -X POST http://localhost:3010/api/admin/migrate-enquetes
curl -X POST http://localhost:3010/api/admin/seed-enquete
```

**Step 3: Test all pages**

- `http://localhost:3010/` — New Home page (hero + enquete + CTAs)
- `http://localhost:3010/noticias` — News page (moved from /)
- `http://localhost:3010/lutadores` — Fighter news category
- `http://localhost:3010/lutas` — Fight news category
- `http://localhost:3010/backstage` — Backstage news category

**Step 4: Test enquete flow**

1. Vote on poll → verify result bars animate
2. Refresh page → verify vote persists (cookie)
3. Add comment as guest → verify it appears
4. Check mobile layout (resize browser)

**Step 5: Final verification**

```bash
cd ufc-news-hub && npm run lint && npx tsc --noEmit && npm run build
```

**Step 6: Run ui-reviewer agent**

Use the `ui-reviewer` sub-agent to validate neumorphism consistency, dark mode, Tailwind patterns, and responsiveness across the new Home page.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: complete Home page with hero, enquete, and CTAs"
```
