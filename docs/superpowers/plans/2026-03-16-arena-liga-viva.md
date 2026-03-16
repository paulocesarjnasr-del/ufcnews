# Arena Liga Viva Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Arena leagues from static member lists into living communities with online status, pick pressure, custom banners, and leave confirmation.

**Architecture:** Modify existing liga API and page to include member online status + pick tracking. Add Vercel Blob for banner uploads. All new components are `'use client'` and follow neumorphism design system.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, raw SQL via `query()`/`queryOne()`, `@vercel/blob`, Canvas API for image resize.

**Spec:** `docs/superpowers/specs/2026-03-16-arena-liga-viva-design.md`

---

## Chunk 1: Schema, Types, and Auth

### Task 1: Database Migration

**Files:**
- Modify: `ufc-news-hub/prisma/schema.prisma`

- [ ] **Step 1: Add `ultimo_acesso` to Prisma schema**

In `prisma/schema.prisma`, find the `usuarios_arena` model and add:

```prisma
  ultimo_acesso DateTime? @default(now()) @db.Timestamptz(6)
```

Add it after the `last_login_at` field.

- [ ] **Step 2: Run the migration via raw SQL**

Run against the database:

```bash
cd ufc-news-hub && npx prisma db execute --stdin <<< "ALTER TABLE usuarios_arena ADD COLUMN IF NOT EXISTS ultimo_acesso TIMESTAMPTZ DEFAULT NOW();"
```

- [ ] **Step 3: Regenerate Prisma client**

```bash
cd ufc-news-hub && npx prisma generate
```

- [ ] **Step 4: Verify with typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add ufc-news-hub/prisma/schema.prisma ufc-news-hub/src/generated/prisma
git commit -m "feat(arena): add ultimo_acesso column to usuarios_arena"
```

---

### Task 2: Add New Types

**Files:**
- Modify: `ufc-news-hub/src/types/arena.ts`

- [ ] **Step 1: Add `PrevisaoResumida` interface**

Add after the `PrevisaoEventoResumo` interface (around line 252):

```typescript
export interface PrevisaoResumida {
  luta_id: string;
  vencedor_nome: string;
  metodo_previsto: string | null;
  round_previsto: number | null;
  pontos_confianca: number;
}
```

- [ ] **Step 2: Add `MembroLiga` interface**

Add after `PrevisaoResumida`:

```typescript
export interface MembroLiga {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  nivel: string;
  is_admin: boolean;
  ultimo_acesso: string | null;
  picks_status: 'done' | 'pending' | null;
  picks_data?: PrevisaoResumida[];
  pontos_temporada: number;
  posicao_atual: number;
}
```

- [ ] **Step 3: Add `EventoAtualLiga` interface**

Add after `MembroLiga`:

```typescript
export interface EventoAtualLiga {
  id: string;
  nome: string;
  data: string;
  total_membros: number;
  membros_com_picks: number;
}
```

- [ ] **Step 4: Add `LigaVivaResponse` interface**

Add after `EventoAtualLiga`:

```typescript
export interface LigaVivaResponse {
  liga: LigaComDetalhes;
  membros: MembroLiga[];
  is_membro: boolean;
  minha_posicao: number | null;
  pode_entrar: boolean;
  evento_atual: EventoAtualLiga | null;
}
```

- [ ] **Step 5: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add ufc-news-hub/src/types/arena.ts
git commit -m "feat(arena): add MembroLiga, EventoAtualLiga, PrevisaoResumida types"
```

---

### Task 3: Update Auth to Track `ultimo_acesso`

**Files:**
- Modify: `ufc-news-hub/src/lib/arena/auth.ts:185-208`

- [ ] **Step 1: Add `ultimo_acesso` to SELECT in `getUsuarioAtual()`**

In `auth.ts`, find the `getUsuarioAtual()` function (line 185). Update the SELECT query to include `ultimo_acesso`:

```typescript
export async function getUsuarioAtual(): Promise<UsuarioArena | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('arena_token')?.value;

  if (!token) return null;

  const payload = await verificarToken(token);
  if (!payload) return null;

  const usuario = await queryOne<UsuarioArena>(
    `SELECT id, username, display_name, avatar_url, bio, email,
            pontos_totais, xp_total, nivel,
            streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
            total_previsoes, previsoes_corretas, previsoes_perfeitas,
            underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
            total_amigos, total_ligas, titulos_ganhos,
            picks_publicos, notificacoes_ativas,
            created_at, last_login_at, ultimo_acesso
     FROM usuarios_arena WHERE id = $1`,
    [payload.id]
  );

  // Throttle: update ultimo_acesso if > 5 min old (fire-and-forget)
  if (usuario) {
    const cincoMin = 5 * 60 * 1000;
    const ultimoAcesso = usuario.ultimo_acesso ? new Date(usuario.ultimo_acesso).getTime() : 0;
    if (Date.now() - ultimoAcesso > cincoMin) {
      query('UPDATE usuarios_arena SET ultimo_acesso = NOW() WHERE id = $1', [usuario.id])
        .catch(() => {});
    }
  }

  return usuario;
}
```

- [ ] **Step 2: Add `ultimo_acesso` to `UsuarioArena` interface**

In `types/arena.ts`, add `ultimo_acesso` to the `UsuarioArena` interface after `last_login_at`:

```typescript
  ultimo_acesso: string | null;
```

- [ ] **Step 3: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add ufc-news-hub/src/lib/arena/auth.ts ufc-news-hub/src/types/arena.ts
git commit -m "feat(arena): track ultimo_acesso in getUsuarioAtual with 5min throttle"
```

---

## Chunk 2: API Changes

### Task 4: Expand GET Liga API with Member Status

**Files:**
- Modify: `ufc-news-hub/src/app/api/arena/ligas/[ligaId]/route.ts`

- [ ] **Step 1: Update the GET handler's member query**

Replace the membros query (lines 83-100) to include `ultimo_acesso`:

```typescript
    const membros = await query<LigaMembro & {
      usuario_username: string;
      usuario_display_name: string | null;
      usuario_avatar: string | null;
      usuario_nivel: string;
      usuario_ultimo_acesso: string | null;
    }>(
      `SELECT
        lm.*,
        u.username as usuario_username,
        u.display_name as usuario_display_name,
        u.avatar_url as usuario_avatar,
        u.nivel as usuario_nivel,
        u.ultimo_acesso as usuario_ultimo_acesso
      FROM liga_membros lm
      JOIN usuarios_arena u ON u.id = lm.usuario_id
      WHERE lm.liga_id = $1
      ORDER BY lm.pontos_temporada DESC, lm.eventos_participados DESC`,
      [ligaId]
    );
```

- [ ] **Step 2: Add evento_atual query**

After fetching membros, add:

```typescript
    // Find next upcoming event
    const eventoAtual = await queryOne<{ id: string; nome: string; data: string }>(
      `SELECT id, nome, data FROM eventos
       WHERE status = 'agendado' AND data > NOW()
       ORDER BY data ASC LIMIT 1`
    );
```

- [ ] **Step 3: Add picks status query**

After the evento query:

```typescript
    // Get pick status for each member (if there's an active event)
    let memberPickStatus: Record<string, boolean> = {};
    let membrosComPicks = 0;

    if (eventoAtual) {
      const membroIds = membros.map(m => m.usuario_id);
      const picksFeitos = await query<{ usuario_id: string }>(
        `SELECT DISTINCT usuario_id FROM previsoes
         WHERE evento_id = $1 AND usuario_id = ANY($2::uuid[])`,
        [eventoAtual.id, membroIds]
      );
      for (const p of picksFeitos) {
        memberPickStatus[p.usuario_id] = true;
      }
      membrosComPicks = picksFeitos.length;
    }
```

- [ ] **Step 4: Add picks_data query (conditional)**

After picks status:

```typescript
    // If mostrar_picks_antes is true, fetch pick details for members who have picked
    let memberPicksData: Record<string, Array<{ luta_id: string; vencedor_nome: string; metodo_previsto: string | null; round_previsto: number | null; pontos_confianca: number }>> = {};

    if (eventoAtual && liga.mostrar_picks_antes) {
      const membrosComPickIds = Object.keys(memberPickStatus);
      if (membrosComPickIds.length > 0) {
        const allPicks = await query<{
          usuario_id: string;
          luta_id: string;
          vencedor_nome: string;
          metodo_previsto: string | null;
          round_previsto: number | null;
          pontos_confianca: number;
        }>(
          `SELECT p.usuario_id, p.luta_id, l.nome as vencedor_nome,
                  p.metodo_previsto, p.round_previsto, p.pontos_confianca
           FROM previsoes p
           LEFT JOIN lutadores l ON l.id = p.vencedor_previsto_id
           WHERE p.evento_id = $1 AND p.usuario_id = ANY($2::uuid[])`,
          [eventoAtual.id, membrosComPickIds]
        );

        for (const pick of allPicks) {
          if (!memberPicksData[pick.usuario_id]) {
            memberPicksData[pick.usuario_id] = [];
          }
          memberPicksData[pick.usuario_id].push({
            luta_id: pick.luta_id,
            vencedor_nome: pick.vencedor_nome,
            metodo_previsto: pick.metodo_previsto,
            round_previsto: pick.round_previsto,
            pontos_confianca: pick.pontos_confianca,
          });
        }
      }
    }
```

- [ ] **Step 5: Update the response shape**

Replace the `membrosComPosicao` mapping and response (lines 103-135):

```typescript
    const membrosFormatados = membros.map((m, index) => ({
      id: m.usuario_id,
      username: m.usuario_username,
      display_name: m.usuario_display_name,
      avatar_url: m.usuario_avatar,
      nivel: m.usuario_nivel,
      is_admin: m.is_admin,
      ultimo_acesso: m.usuario_ultimo_acesso,
      picks_status: eventoAtual
        ? (memberPickStatus[m.usuario_id] ? 'done' as const : 'pending' as const)
        : null,
      picks_data: liga.mostrar_picks_antes ? memberPicksData[m.usuario_id] : undefined,
      pontos_temporada: m.pontos_temporada || 0,
      posicao_atual: index + 1,
    }));

    return NextResponse.json({
      liga: {
        ...liga,
        criador: {
          id: liga.criador_id,
          username: liga.criador_username,
          display_name: liga.criador_display_name,
          avatar_url: liga.criador_avatar,
        },
        campeao: liga.campeao_id ? {
          id: liga.campeao_id,
          username: liga.campeao_username,
          display_name: liga.campeao_display_name,
          avatar_url: liga.campeao_avatar,
        } : null,
      },
      membros: membrosFormatados,
      is_membro: isMembro,
      minha_posicao: minhasPosicao,
      pode_entrar: !isMembro && liga.total_membros < liga.max_membros,
      evento_atual: eventoAtual ? {
        id: eventoAtual.id,
        nome: eventoAtual.nome,
        data: eventoAtual.data,
        total_membros: membros.length,
        membros_com_picks: membrosComPicks,
      } : null,
    });
```

- [ ] **Step 6: Fix DELETE handler to decrement total_membros**

In the DELETE handler (line 190-194), add the decrement inside a transaction. Replace:

```typescript
    // Remover membro
    await query(
      `DELETE FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );
```

With:

```typescript
    // Remover membro e decrementar total_membros (em transaction)
    const { transaction } = await import('@/lib/db');
    await transaction(async (client) => {
      await client.query(
        `DELETE FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
        [ligaId, usuario.id]
      );
      await client.query(
        `UPDATE ligas SET total_membros = GREATEST(total_membros - 1, 0) WHERE id = $1`,
        [ligaId]
      );
    });
```

- [ ] **Step 7: Verify typecheck + lint**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

- [ ] **Step 8: Commit**

```bash
git add ufc-news-hub/src/app/api/arena/ligas/[ligaId]/route.ts
git commit -m "feat(arena): expand GET liga API with member status, picks, and evento_atual"
```

---

### Task 5: Banner Upload API

**Files:**
- Create: `ufc-news-hub/src/app/api/arena/ligas/[ligaId]/banner/route.ts`

- [ ] **Step 1: Install @vercel/blob**

```bash
cd ufc-news-hub && npm install @vercel/blob
```

- [ ] **Step 2: Create banner upload route**

Create `src/app/api/arena/ligas/[ligaId]/banner/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface RouteParams {
  params: Promise<{ ligaId: string }>;
}

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check if user is admin of this liga
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro?.is_admin) {
      return NextResponse.json({ error: 'Apenas o criador pode alterar o banner' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('banner') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Formato invalido. Use JPEG, PNG ou WebP' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Imagem muito grande. Maximo 2MB' }, { status: 400 });
    }

    // Delete old banner if exists
    const liga = await queryOne<{ imagem_url: string | null }>(
      `SELECT imagem_url FROM ligas WHERE id = $1`,
      [ligaId]
    );

    if (liga?.imagem_url) {
      try {
        await del(liga.imagem_url);
      } catch {
        // Old blob may not exist, ignore
      }
    }

    // Upload new banner
    const blob = await put(`arena/ligas/${ligaId}/banner.${file.type.split('/')[1]}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    // Save URL to database
    await query(
      `UPDATE ligas SET imagem_url = $1 WHERE id = $2`,
      [blob.url, ligaId]
    );

    return NextResponse.json({ success: true, banner_url: blob.url });
  } catch (error) {
    console.error('[API /arena/ligas/banner] Error:', error);
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro?.is_admin) {
      return NextResponse.json({ error: 'Apenas o criador pode alterar o banner' }, { status: 403 });
    }

    const liga = await queryOne<{ imagem_url: string | null }>(
      `SELECT imagem_url FROM ligas WHERE id = $1`,
      [ligaId]
    );

    if (liga?.imagem_url) {
      try {
        await del(liga.imagem_url);
      } catch {
        // Ignore if blob doesn't exist
      }
    }

    await query(
      `UPDATE ligas SET imagem_url = NULL WHERE id = $1`,
      [ligaId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API /arena/ligas/banner DELETE] Error:', error);
    return NextResponse.json({ error: 'Erro ao remover banner' }, { status: 500 });
  }
}
```

- [ ] **Step 3: Verify typecheck + lint**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add ufc-news-hub/src/app/api/arena/ligas/[ligaId]/banner/route.ts ufc-news-hub/package.json ufc-news-hub/package-lock.json
git commit -m "feat(arena): add banner upload/delete API with Vercel Blob"
```

---

## Chunk 3: Frontend Components

### Task 6: Utility Function `formatUltimoAcesso`

**Files:**
- Create: `ufc-news-hub/src/lib/arena/format.ts`

- [ ] **Step 1: Create format utility**

```typescript
export function formatUltimoAcesso(timestamp: string | null): { text: string; isOnline: boolean } {
  if (!timestamp) return { text: 'Nunca acessou', isOnline: false };

  const diff = Date.now() - new Date(timestamp).getTime();
  const min = Math.floor(diff / 60_000);

  if (min < 5) return { text: 'Online', isOnline: true };
  if (min < 60) return { text: `Ha ${min}min`, isOnline: false };

  const hours = Math.floor(min / 60);
  if (hours < 24) return { text: `Ha ${hours}h`, isOnline: false };

  const days = Math.floor(hours / 24);
  if (days < 30) return { text: `Ha ${days}d`, isOnline: false };

  return { text: `Ha ${Math.floor(days / 30)}m`, isOnline: false };
}
```

- [ ] **Step 2: Commit**

```bash
git add ufc-news-hub/src/lib/arena/format.ts
git commit -m "feat(arena): add formatUltimoAcesso utility"
```

---

### Task 7: `MembroCard` Component

**Files:**
- Create: `ufc-news-hub/src/components/arena/MembroCard.tsx`

- [ ] **Step 1: Create MembroCard component**

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NIVEL_CONFIG, type NivelUsuario, type MembroLiga } from '@/types/arena';
import { formatUltimoAcesso } from '@/lib/arena/format';

interface MembroCardProps {
  membro: MembroLiga;
  isCurrentUser: boolean;
  showPicksDetail: boolean;
  posicao: number;
}

export function MembroCard({ membro, isCurrentUser, showPicksDetail, posicao }: MembroCardProps) {
  const [expanded, setExpanded] = useState(false);
  const nivelConfig = NIVEL_CONFIG[membro.nivel as NivelUsuario];
  const { text: acessoText, isOnline } = formatUltimoAcesso(membro.ultimo_acesso);
  const displayName = membro.display_name || membro.username;

  const canExpand = showPicksDetail && membro.picks_status === 'done' && membro.picks_data && membro.picks_data.length > 0;

  return (
    <div className={`px-4 py-3 ${isCurrentUser ? 'bg-ufc-red/5' : ''}`}>
      <div className="flex items-center gap-3">
        {/* Position */}
        <div className="w-6 text-center font-display text-sm text-dark-textMuted">
          {posicao}
        </div>

        {/* Avatar */}
        <Link
          href={`/arena/perfil/${membro.username}`}
          className="w-9 h-9 rounded-full overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-ufc-red transition-all"
        >
          {membro.avatar_url ? (
            <Image
              src={membro.avatar_url}
              alt={membro.username}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-dark-textMuted text-sm font-bold">
              {membro.username.charAt(0).toUpperCase()}
            </span>
          )}
        </Link>

        {/* Name + Level */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/arena/perfil/${membro.username}`}
              className={`font-medium truncate hover:underline ${isCurrentUser ? 'text-ufc-red' : 'text-white'}`}
            >
              {displayName}
            </Link>
            {membro.is_admin && (
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-ufc-red/20 text-ufc-red">
                Criador
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-dark-textMuted">
            <span>{nivelConfig?.icone} {membro.nivel}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              {isOnline && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
              <span className={isOnline ? 'text-green-400' : ''}>{acessoText}</span>
            </span>
          </div>
        </div>

        {/* Picks Status + Points */}
        <div className="flex items-center gap-3">
          {membro.picks_status !== null && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              membro.picks_status === 'done'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {membro.picks_status === 'done' ? 'Fez picks' : 'Pendente'}
            </span>
          )}
          <div className="text-right min-w-[40px]">
            <p className="font-bold text-ufc-gold text-sm">{membro.pontos_temporada}</p>
            <p className="text-[10px] text-dark-textMuted">pts</p>
          </div>
          {canExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-dark-textMuted hover:text-white p-1"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded picks detail */}
      {expanded && membro.picks_data && (
        <div className="mt-3 ml-[60px] space-y-1">
          {membro.picks_data.map((pick) => (
            <div key={pick.luta_id} className="flex items-center gap-2 text-xs text-dark-textMuted">
              <span className="text-white font-medium">{pick.vencedor_nome}</span>
              {pick.metodo_previsto && (
                <span className="text-dark-textMuted">via {pick.metodo_previsto}</span>
              )}
              {pick.round_previsto && (
                <span className="text-dark-textMuted">R{pick.round_previsto}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add ufc-news-hub/src/components/arena/MembroCard.tsx
git commit -m "feat(arena): add MembroCard component with online status and picks"
```

---

### Task 8: `PicksPressure` Component

**Files:**
- Create: `ufc-news-hub/src/components/arena/PicksPressure.tsx`

- [ ] **Step 1: Create PicksPressure component**

```typescript
'use client';

import { Target } from 'lucide-react';
import type { EventoAtualLiga, MembroLiga } from '@/types/arena';

interface PicksPressureProps {
  eventoAtual: EventoAtualLiga;
  membros: MembroLiga[];
  mostrarNomesPendentes: boolean;
}

export function PicksPressure({ eventoAtual, membros, mostrarNomesPendentes }: PicksPressureProps) {
  const { total_membros, membros_com_picks } = eventoAtual;
  const percent = total_membros > 0 ? Math.round((membros_com_picks / total_membros) * 100) : 0;
  const todosProntos = membros_com_picks === total_membros;

  const pendentes = membros
    .filter(m => m.picks_status === 'pending')
    .map(m => m.display_name || m.username);

  return (
    <div className={`neu-card rounded-xl p-4 mb-4 border-l-4 ${
      todosProntos ? 'border-l-green-500' : 'border-l-yellow-500'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Target className={`w-4 h-4 ${todosProntos ? 'text-green-400' : 'text-yellow-400'}`} />
        <span className="text-sm font-medium text-white">
          {eventoAtual.nome}
        </span>
        <span className="text-sm text-dark-textMuted">
          {todosProntos
            ? 'Todos prontos!'
            : `${membros_com_picks}/${total_membros} fizeram picks`
          }
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            todosProntos ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Pending names */}
      {!todosProntos && mostrarNomesPendentes && pendentes.length > 0 && (
        <p className="text-xs text-dark-textMuted mt-2">
          Faltam: {pendentes.join(', ')}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add ufc-news-hub/src/components/arena/PicksPressure.tsx
git commit -m "feat(arena): add PicksPressure component with social pressure bar"
```

---

### Task 9: `SairLigaModal` Component

**Files:**
- Create: `ufc-news-hub/src/components/arena/SairLigaModal.tsx`

- [ ] **Step 1: Create SairLigaModal component**

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, X } from 'lucide-react';

interface SairLigaModalProps {
  ligaId: string;
  ligaNome: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SairLigaModal({ ligaId, ligaNome, isOpen, onClose }: SairLigaModalProps) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleSair() {
    setIsLeaving(true);
    setError('');

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/arena/ligas');
      } else {
        const data = await res.json();
        setError(data.error || 'Erro ao sair da liga');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsLeaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="neu-card rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-white uppercase">Sair da liga?</h3>
          <button onClick={onClose} className="text-dark-textMuted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-dark-textMuted mb-6">
          Tem certeza que quer sair de <strong className="text-white">{ligaNome}</strong>?
          Seus picks serao mantidos mas voce nao podera ver o ranking da liga.
        </p>

        {error && (
          <p className="text-sm text-red-400 mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="neu-button flex-1 rounded-lg px-4 py-2.5 text-sm text-dark-textMuted hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSair}
            disabled={isLeaving}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {isLeaving ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add ufc-news-hub/src/components/arena/SairLigaModal.tsx
git commit -m "feat(arena): add SairLigaModal with confirmation dialog"
```

---

### Task 10: `BannerUpload` Component

**Files:**
- Create: `ufc-news-hub/src/components/arena/BannerUpload.tsx`

- [ ] **Step 1: Create BannerUpload component**

```typescript
'use client';

import { useState, useRef } from 'react';
import { Upload, Trash2, X } from 'lucide-react';

interface BannerUploadProps {
  ligaId: string;
  currentBanner: string | null;
  onUpload: (url: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

async function resizeImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Scale down maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
        'image/webp',
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export function BannerUpload({ ligaId, currentBanner, onUpload, isOpen, onClose }: BannerUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  async function handleFileSelect(file: File) {
    setError('');
    try {
      const resized = await resizeImage(file, 1200, 400, 0.8);
      const previewUrl = URL.createObjectURL(resized);
      setPreview(previewUrl);
    } catch {
      setError('Erro ao processar imagem');
    }
  }

  async function handleUpload() {
    if (!preview) return;
    setIsUploading(true);
    setError('');

    try {
      // Get the resized blob from the preview
      const response = await fetch(preview);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('banner', blob, 'banner.webp');

      const res = await fetch(`/api/arena/ligas/${ligaId}/banner`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onUpload(data.banner_url);
        setPreview(null);
        onClose();
      } else {
        setError(data.error || 'Erro ao fazer upload');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemove() {
    setIsRemoving(true);
    setError('');

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/banner`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onUpload(null);
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || 'Erro ao remover banner');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="neu-card rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-white uppercase">Banner da Liga</h3>
          <button onClick={onClose} className="text-dark-textMuted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div
          className="w-full h-32 rounded-lg mb-4 bg-dark-bg flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-dark-border hover:border-ufc-red transition-colors"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files[0];
            if (file) handleFileSelect(file);
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : currentBanner ? (
            <img src={currentBanner} alt="Banner atual" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-dark-textMuted">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Clique ou arraste uma imagem</p>
              <p className="text-xs mt-1">JPEG, PNG ou WebP (max 2MB)</p>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />

        {error && (
          <p className="text-sm text-red-400 mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          {currentBanner && (
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {isRemoving ? 'Removendo...' : 'Remover'}
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="neu-button rounded-lg px-4 py-2.5 text-sm text-dark-textMuted"
          >
            Cancelar
          </button>
          {preview && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="rounded-lg px-4 py-2.5 text-sm font-medium bg-ufc-red hover:bg-ufc-redLight text-white disabled:opacity-50 transition-colors"
            >
              {isUploading ? 'Enviando...' : 'Salvar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add ufc-news-hub/src/components/arena/BannerUpload.tsx
git commit -m "feat(arena): add BannerUpload with client-side resize and Vercel Blob"
```

---

### Task 11: `LigaHeader` Component

**Files:**
- Create: `ufc-news-hub/src/components/arena/LigaHeader.tsx`

- [ ] **Step 1: Create LigaHeader component**

```typescript
'use client';

import { useState } from 'react';
import { Copy, Settings, LogOut, Lock, Globe, Check } from 'lucide-react';
import { BannerUpload } from './BannerUpload';
import type { Liga } from '@/types/arena';

interface LigaHeaderProps {
  liga: Liga & {
    criador: { id: string; username: string; display_name: string | null; avatar_url: string | null };
  };
  isAdmin: boolean;
  isMembro: boolean;
  onSairClick: () => void;
  onBannerUpdate: (url: string | null) => void;
}

export function LigaHeader({ liga, isAdmin, isMembro, onSairClick, onBannerUpdate }: LigaHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [showBannerUpload, setShowBannerUpload] = useState(false);

  function copyInviteLink() {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${baseUrl}/arena/ligas/join/${liga.codigo_convite}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const createdDate = new Date(liga.created_at).toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <div className="neu-card rounded-xl overflow-hidden mb-6">
        {/* Banner */}
        <div
          className="relative h-32 bg-gradient-to-r from-ufc-red to-red-900"
          style={liga.imagem_url ? {
            backgroundImage: `url(${liga.imagem_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 to-transparent" />

          {/* Liga name over banner */}
          <div className="absolute bottom-4 left-5 right-5">
            <h1 className="font-display text-3xl uppercase text-white drop-shadow-lg">
              {liga.nome}
            </h1>
          </div>
        </div>

        {/* Info + Actions */}
        <div className="px-5 py-4">
          {/* Meta info */}
          <div className="flex items-center gap-3 text-sm text-dark-textMuted mb-4">
            <span className="flex items-center gap-1">
              {liga.tipo === 'privada' ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
              {liga.tipo === 'privada' ? 'Privada' : 'Publica'}
            </span>
            <span>·</span>
            <span>{liga.total_membros} membros</span>
            <span>·</span>
            <span>Criada em {createdDate}</span>
          </div>

          {/* Actions */}
          {isMembro && (
            <div className="flex items-center gap-3">
              {liga.codigo_convite && (
                <button
                  onClick={copyInviteLink}
                  className="neu-button flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-dark-textMuted" />
                  )}
                  <span className={copied ? 'text-green-400' : 'text-dark-textMuted'}>
                    {copied ? 'Link copiado!' : 'Copiar convite'}
                  </span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => setShowBannerUpload(true)}
                  className="neu-button flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-dark-textMuted hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              )}

              {!isAdmin && (
                <button
                  onClick={onSairClick}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors ml-auto"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Banner Upload Modal */}
      <BannerUpload
        ligaId={liga.id}
        currentBanner={liga.imagem_url}
        onUpload={onBannerUpdate}
        isOpen={showBannerUpload}
        onClose={() => setShowBannerUpload(false)}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add ufc-news-hub/src/components/arena/LigaHeader.tsx
git commit -m "feat(arena): add LigaHeader with banner, invite link, and edit controls"
```

---

## Chunk 4: Page Integration

### Task 12: Rewrite Liga Page

**Files:**
- Modify: `ufc-news-hub/src/app/arena/ligas/[id]/page.tsx`

- [ ] **Step 1: Update imports and interfaces**

Replace the entire `page.tsx` file with the new version that uses all the new components. Key changes:

1. Import new components: `LigaHeader`, `PicksPressure`, `MembroCard`, `SairLigaModal`
2. Update `LigaResponse` interface to include `evento_atual` and use `MembroLiga` type
3. Replace inline header with `<LigaHeader />`
4. Add `<PicksPressure />` before member list
5. Replace inline member rows with `<MembroCard />`
6. Add `<SairLigaModal />`

The full rewrite of `page.tsx`:

```typescript
'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Crown } from 'lucide-react';

import { useArenaAuth } from '@/hooks/useArenaAuth';
import { LigaChat } from '@/components/arena/LigaChat';
import { LigaHeader } from '@/components/arena/LigaHeader';
import { PicksPressure } from '@/components/arena/PicksPressure';
import { MembroCard } from '@/components/arena/MembroCard';
import { SairLigaModal } from '@/components/arena/SairLigaModal';
import type { Liga, MembroLiga, EventoAtualLiga } from '@/types/arena';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface LigaDetalhes extends Liga {
  criador: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  campeao: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface LigaResponse {
  liga: LigaDetalhes;
  membros: MembroLiga[];
  is_membro: boolean;
  minha_posicao: number | null;
  pode_entrar: boolean;
  evento_atual: EventoAtualLiga | null;
}

export default function LigaPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { usuario, isAuthenticated } = useArenaAuth();
  const [liga, setLiga] = useState<LigaDetalhes | null>(null);
  const [membros, setMembros] = useState<MembroLiga[]>([]);
  const [eventoAtual, setEventoAtual] = useState<EventoAtualLiga | null>(null);
  const [isMembro, setIsMembro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [showSairModal, setShowSairModal] = useState(false);
  const [error, setError] = useState('');

  const fetchLiga = useCallback(async () => {
    try {
      const res = await fetch(`/api/arena/ligas/${id}`);
      if (res.ok) {
        const data: LigaResponse = await res.json();
        setLiga(data.liga);
        setMembros(data.membros || []);
        setIsMembro(data.is_membro || false);
        setEventoAtual(data.evento_atual || null);
      } else if (res.status === 404) {
        router.push('/arena/ligas');
      }
    } catch (err) {
      console.error('Erro ao carregar liga:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchLiga();
  }, [fetchLiga]);

  async function handleEntrar() {
    if (!isAuthenticated) {
      router.push('/arena/login');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const res = await fetch('/api/arena/ligas/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liga_id: id }),
      });

      const data = await res.json();

      if (res.ok) {
        fetchLiga();
      } else {
        setError(data.error || 'Erro ao entrar na liga');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsJoining(false);
    }
  }

  function handleBannerUpdate(url: string | null) {
    if (liga) {
      setLiga({ ...liga, imagem_url: url });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
      </div>
    );
  }

  if (!liga) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="font-display text-2xl text-white">Liga nao encontrada</h1>
        <Link href="/arena/ligas" className="mt-4 inline-block text-ufc-red hover:text-ufc-redLight">
          &larr; Voltar para Ligas
        </Link>
      </div>
    );
  }

  // Check if current user is admin
  const isAdmin = membros.some(m => m.id === usuario?.id && m.is_admin);

  const sortedMembros = [...membros].sort(
    (a, b) => (a.posicao_atual || 999) - (b.posicao_atual || 999)
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header with banner */}
      <LigaHeader
        liga={liga}
        isAdmin={isAdmin}
        isMembro={isMembro}
        onSairClick={() => setShowSairModal(true)}
        onBannerUpdate={handleBannerUpdate}
      />

      {/* Join button for non-members */}
      {!isMembro && liga.tipo === 'publica' && (
        <div className="neu-card rounded-xl p-4 mb-6 text-center">
          <button
            onClick={handleEntrar}
            disabled={isJoining}
            className="neu-button rounded-lg bg-ufc-red px-8 py-3 text-sm font-medium text-white hover:bg-ufc-redLight transition-colors disabled:opacity-50"
          >
            {isJoining ? 'Entrando...' : 'Entrar na Liga'}
          </button>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      )}

      {/* Picks Pressure */}
      {eventoAtual && isMembro && (
        <PicksPressure
          eventoAtual={eventoAtual}
          membros={membros}
          mostrarNomesPendentes={true}
        />
      )}

      {/* Member Ranking */}
      <div className="neu-card rounded-xl overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-dark-border flex items-center gap-2">
          <Crown className="w-5 h-5 text-ufc-gold" />
          <h2 className="font-display text-lg uppercase text-white">
            Membros
          </h2>
          <span className="text-sm text-dark-textMuted ml-auto">
            {liga.total_membros}
          </span>
        </div>

        {sortedMembros.length === 0 ? (
          <div className="p-8 text-center text-dark-textMuted">
            Nenhum membro ainda
          </div>
        ) : (
          <div className="divide-y divide-dark-border/50">
            {sortedMembros.map((membro, index) => (
              <MembroCard
                key={membro.id}
                membro={membro}
                isCurrentUser={membro.id === usuario?.id}
                showPicksDetail={liga.mostrar_picks_antes}
                posicao={index + 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chat */}
      {isMembro && <LigaChat ligaId={id} />}

      {/* Back link */}
      <div className="mt-6 text-center">
        <Link href="/arena/ligas" className="text-sm text-dark-textMuted hover:text-ufc-red">
          &larr; Voltar para Ligas
        </Link>
      </div>

      {/* Leave Modal */}
      <SairLigaModal
        ligaId={liga.id}
        ligaNome={liga.nome}
        isOpen={showSairModal}
        onClose={() => setShowSairModal(false)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck + lint**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

- [ ] **Step 3: Verify build**

```bash
cd ufc-news-hub && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add ufc-news-hub/src/app/arena/ligas/[id]/page.tsx
git commit -m "feat(arena): rewrite liga page with LigaHeader, PicksPressure, MembroCard, SairLigaModal"
```

---

### Task 13: Add Vercel Blob domain to next.config

**Files:**
- Modify: `ufc-news-hub/next.config.js` (or `.mjs`/`.ts`)

- [ ] **Step 1: Add Vercel Blob hostname to image domains**

Find the `images.remotePatterns` config and add:

```javascript
{
  protocol: 'https',
  hostname: '*.public.blob.vercel-storage.com',
}
```

- [ ] **Step 2: Verify build still works**

```bash
cd ufc-news-hub && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add ufc-news-hub/next.config.*
git commit -m "fix(arena): add Vercel Blob domain to Next.js image config"
```

---

### Task 14: Final Verification

- [ ] **Step 1: Run full verification suite**

```bash
cd ufc-news-hub && npm run lint && npx tsc --noEmit && npm run build
```

Expected: All pass with no errors.

- [ ] **Step 2: Manual test checklist**

If dev server is running (`npm run dev`):

1. Navigate to `/arena/ligas/[id]` - verify new header with banner area
2. Verify member cards show online status and pick status
3. Verify PicksPressure bar appears if there's an upcoming event
4. Verify "Copiar convite" copies full URL
5. Verify "Sair" button shows confirmation modal (hidden for creator)
6. Verify banner upload works for creator
