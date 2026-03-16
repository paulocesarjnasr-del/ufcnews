# Arena Gestao da Liga Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow liga creators to manage members (expel) and edit all liga configs via a unified tabbed modal.

**Architecture:** Add PATCH handler to existing liga route, create new expel endpoint, build tabbed management modal with embedded banner upload, configs form, and member list with expel functionality. Fix existing pode_entrar bug with max_membros=0.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, raw SQL via `query()`/`queryOne()`/`transaction()`, neumorphism design system.

**Spec:** `docs/superpowers/specs/2026-03-16-arena-gestao-liga-design.md`

---

## Chunk 1: Types + Bug Fix + APIs

### Task 1: Add missing fields to Liga type + fix pode_entrar bug

**Files:**
- Modify: `ufc-news-hub/src/types/arena.ts`
- Modify: `ufc-news-hub/src/app/api/arena/ligas/[ligaId]/route.ts`

- [ ] **Step 1: Add fields to Liga interface**

In `src/types/arena.ts`, find the `Liga` interface and add these fields after `defesas_titulo`:

```typescript
  ranking_tipo: string;
  chat_ativo: boolean;
  revelar_picks_ao_vivo: boolean;
  updated_at: string;
```

- [ ] **Step 2: Fix pode_entrar bug in GET handler**

In `src/app/api/arena/ligas/[ligaId]/route.ts`, fix BOTH occurrences of `pode_entrar`:

Line 77 (private liga response):
```typescript
pode_entrar: liga.max_membros === 0 || liga.total_membros < liga.max_membros,
```

Line 206 (full response):
```typescript
pode_entrar: !isMembro && (liga.max_membros === 0 || liga.total_membros < liga.max_membros),
```

- [ ] **Step 3: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/types/arena.ts "src/app/api/arena/ligas/[ligaId]/route.ts"
git commit -m "fix(arena): add missing Liga type fields + fix pode_entrar with max_membros=0"
```

---

### Task 2: PATCH handler for editing liga configs

**Files:**
- Modify: `ufc-news-hub/src/app/api/arena/ligas/[ligaId]/route.ts`

- [ ] **Step 1: Add PATCH handler**

Add this handler after the DELETE handler in the same file:

```typescript
// PATCH - Editar configs da liga
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check admin
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro?.is_admin) {
      return NextResponse.json({ error: 'Apenas o criador pode editar a liga' }, { status: 403 });
    }

    const body = await request.json() as Record<string, unknown>;

    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    // nome
    if (body.nome !== undefined) {
      const nome = String(body.nome).trim();
      if (!nome || nome.length > 50) {
        return NextResponse.json({ error: 'Nome deve ter entre 1 e 50 caracteres' }, { status: 400 });
      }
      updates.push(`nome = $${paramIndex++}`);
      values.push(nome);
    }

    // descricao
    if (body.descricao !== undefined) {
      const desc = body.descricao ? String(body.descricao).trim() : null;
      if (desc && desc.length > 200) {
        return NextResponse.json({ error: 'Descricao deve ter no maximo 200 caracteres' }, { status: 400 });
      }
      updates.push(`descricao = $${paramIndex++}`);
      values.push(desc);
    }

    // tipo
    if (body.tipo !== undefined) {
      if (body.tipo !== 'publica' && body.tipo !== 'privada') {
        return NextResponse.json({ error: 'Tipo deve ser publica ou privada' }, { status: 400 });
      }
      updates.push(`tipo = $${paramIndex++}`);
      values.push(body.tipo);
    }

    // max_membros
    if (body.max_membros !== undefined) {
      const max = Number(body.max_membros);
      if (isNaN(max) || max < 0) {
        return NextResponse.json({ error: 'max_membros deve ser >= 0 (0 = ilimitado)' }, { status: 400 });
      }
      if (max > 0) {
        const liga = await queryOne<{ total_membros: number }>(
          `SELECT total_membros FROM ligas WHERE id = $1`, [ligaId]
        );
        if (liga && max < liga.total_membros) {
          return NextResponse.json(
            { error: `max_membros (${max}) nao pode ser menor que membros atuais (${liga.total_membros})` },
            { status: 400 }
          );
        }
      }
      updates.push(`max_membros = $${paramIndex++}`);
      values.push(max);
    }

    // booleans
    for (const field of ['mostrar_picks_antes', 'apenas_main_card', 'chat_ativo', 'revelar_picks_ao_vivo'] as const) {
      if (body[field] !== undefined) {
        updates.push(`${field} = $${paramIndex++}`);
        values.push(Boolean(body[field]));
      }
    }

    // ranking_tipo
    if (body.ranking_tipo !== undefined) {
      if (body.ranking_tipo !== 'pontos' && body.ranking_tipo !== 'percentual') {
        return NextResponse.json({ error: 'ranking_tipo deve ser pontos ou percentual' }, { status: 400 });
      }
      updates.push(`ranking_tipo = $${paramIndex++}`);
      values.push(body.ranking_tipo);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Nenhum campo para atualizar' }, { status: 400 });
    }

    values.push(ligaId);
    const sql = `UPDATE ligas SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;
    const updated = await queryOne<Liga>(sql, values);

    return NextResponse.json({ success: true, liga: updated });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[PATCH /arena/ligas] Erro:', msg);
    return NextResponse.json({ error: `Erro ao atualizar liga: ${msg}` }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/api/arena/ligas/[ligaId]/route.ts"
git commit -m "feat(arena): add PATCH handler for editing liga configs"
```

---

### Task 3: Expel member API

**Files:**
- Create: `ufc-news-hub/src/app/api/arena/ligas/[ligaId]/membros/[userId]/route.ts`

- [ ] **Step 1: Create expel endpoint**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { queryOne, transaction } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface RouteParams {
  params: Promise<{ ligaId: string; userId: string }>;
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId, userId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check admin
    const admin = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!admin?.is_admin) {
      return NextResponse.json({ error: 'Apenas o criador pode expulsar membros' }, { status: 403 });
    }

    // Cannot expel yourself
    if (userId === usuario.id) {
      return NextResponse.json({ error: 'Voce nao pode expulsar a si mesmo' }, { status: 403 });
    }

    // Check target is member
    const target = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, userId]
    );

    if (!target) {
      return NextResponse.json({ error: 'Membro nao encontrado nesta liga' }, { status: 404 });
    }

    // Remove member + decrement count in transaction
    await transaction(async (client) => {
      await client.query(
        `DELETE FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
        [ligaId, userId]
      );
      await client.query(
        `UPDATE ligas SET total_membros = GREATEST(total_membros - 1, 0) WHERE id = $1`,
        [ligaId]
      );
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[DELETE /arena/ligas/membros] Erro:', msg);
    return NextResponse.json({ error: `Erro ao expulsar membro: ${msg}` }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/api/arena/ligas/[ligaId]/membros/[userId]/route.ts"
git commit -m "feat(arena): add expel member API endpoint"
```

---

## Chunk 2: Frontend Components

### Task 4: BannerUpload embedded mode

**Files:**
- Modify: `ufc-news-hub/src/components/arena/BannerUpload.tsx`

- [ ] **Step 1: Add embedded prop**

Add `embedded?: boolean` to `BannerUploadProps`. Then change the render:

If `embedded` is true, skip the backdrop wrapper and render content directly. The early `if (!isOpen) return null` stays the same.

Replace the outer `<div className="fixed inset-0...">` wrapper logic:

```typescript
// In BannerUploadProps:
interface BannerUploadProps {
  ligaId: string;
  currentBanner: string | null;
  onUpload: (url: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

// In the return, wrap the content:
if (embedded) {
  return <div className="space-y-5">{/* inner content without backdrop */}</div>;
}

// else: existing modal with backdrop
return (
  <div className="fixed inset-0 z-50 ...">
    ...
  </div>
);
```

Extract the inner content (everything inside `neu-card rounded-2xl`) into a variable `content` and render it in both paths to avoid duplication. Skip the header (title + X button) in embedded mode since the parent modal already has tabs.

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/arena/BannerUpload.tsx
git commit -m "feat(arena): add embedded mode to BannerUpload component"
```

---

### Task 5: ConfirmarExpulsaoModal component

**Files:**
- Create: `ufc-news-hub/src/components/arena/ConfirmarExpulsaoModal.tsx`

- [ ] **Step 1: Create component**

```typescript
'use client';

import { useState } from 'react';
import { UserMinus, X } from 'lucide-react';

interface ConfirmarExpulsaoModalProps {
  ligaId: string;
  userId: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
  onExpulso: () => void;
}

export function ConfirmarExpulsaoModal({
  ligaId, userId, username, isOpen, onClose, onExpulso,
}: ConfirmarExpulsaoModalProps) {
  const [isExpelling, setIsExpelling] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleExpulsar() {
    setIsExpelling(true);
    setError('');

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/membros/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onExpulso();
        onClose();
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error || 'Erro ao expulsar membro');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsExpelling(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="neu-card rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-white uppercase">Expulsar membro?</h3>
          <button onClick={onClose} className="text-dark-textMuted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-dark-textMuted mb-6">
          Tem certeza que quer expulsar <strong className="text-white">{username}</strong>?
          Ele podera entrar novamente se tiver o link de convite.
        </p>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="neu-button flex-1 rounded-lg px-4 py-2.5 text-sm text-dark-textMuted hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleExpulsar}
            disabled={isExpelling}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 transition-colors"
          >
            <UserMinus className="w-4 h-4" />
            {isExpelling ? 'Expulsando...' : 'Expulsar'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

Note: z-index is `z-[60]` because this modal appears ON TOP of the GerenciarLigaModal (which uses `z-50`).

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/arena/ConfirmarExpulsaoModal.tsx
git commit -m "feat(arena): add ConfirmarExpulsaoModal component"
```

---

### Task 6: GerenciarLigaModal component

**Files:**
- Create: `ufc-news-hub/src/components/arena/GerenciarLigaModal.tsx`

- [ ] **Step 1: Create component**

This is the main modal with 3 tabs (Banner, Configs, Membros). Full code:

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ImageIcon, Settings, Users, UserMinus, Eye, EyeOff, Swords, BarChart3, Trophy, MessageCircle, Globe, Lock } from 'lucide-react';
import type { Liga, MembroLiga, NivelUsuario } from '@/types/arena';
import { NIVEL_CONFIG } from '@/types/arena';
import { BannerUpload } from './BannerUpload';
import { ConfirmarExpulsaoModal } from './ConfirmarExpulsaoModal';

interface GerenciarLigaModalProps {
  liga: Liga;
  membros: MembroLiga[];
  isOpen: boolean;
  onClose: () => void;
  onBannerUpdate: (url: string | null) => void;
  onLigaUpdate: (fields: Partial<Liga>) => void;
  onMembroExpulso: (userId: string) => void;
}

type Tab = 'banner' | 'configs' | 'membros';

export function GerenciarLigaModal({
  liga, membros, isOpen, onClose, onBannerUpdate, onLigaUpdate, onMembroExpulso,
}: GerenciarLigaModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('configs');

  // Configs form state
  const [nome, setNome] = useState(liga.nome);
  const [descricao, setDescricao] = useState(liga.descricao || '');
  const [tipo, setTipo] = useState(liga.tipo);
  const [maxMembros, setMaxMembros] = useState(liga.max_membros);
  const [mostrarPicks, setMostrarPicks] = useState(liga.mostrar_picks_antes);
  const [apenasMainCard, setApenasMainCard] = useState(liga.apenas_main_card);
  const [rankingTipo, setRankingTipo] = useState(liga.ranking_tipo || 'pontos');
  const [chatAtivo, setChatAtivo] = useState(liga.chat_ativo ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Expel state
  const [expelTarget, setExpelTarget] = useState<{ userId: string; username: string } | null>(null);

  if (!isOpen) return null;

  async function handleSaveConfigs() {
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/arena/ligas/${liga.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          descricao: descricao.trim() || null,
          tipo,
          max_membros: maxMembros,
          mostrar_picks_antes: mostrarPicks,
          apenas_main_card: apenasMainCard,
          ranking_tipo: rankingTipo,
          chat_ativo: chatAtivo,
        }),
      });

      const data = await res.json() as { success?: boolean; liga?: Liga; error?: string };

      if (res.ok && data.success) {
        onLigaUpdate(data.liga || {
          nome: nome.trim(),
          descricao: descricao.trim() || null,
          tipo,
          max_membros: maxMembros,
          mostrar_picks_antes: mostrarPicks,
          apenas_main_card: apenasMainCard,
          ranking_tipo: rankingTipo,
          chat_ativo: chatAtivo,
        });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      } else {
        setSaveError(data.error || 'Erro ao salvar');
      }
    } catch {
      setSaveError('Erro de conexao');
    } finally {
      setIsSaving(false);
    }
  }

  function handleExpulso() {
    if (expelTarget) {
      onMembroExpulso(expelTarget.userId);
      setExpelTarget(null);
    }
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'banner', label: 'Banner', icon: <ImageIcon size={16} /> },
    { key: 'configs', label: 'Configs', icon: <Settings size={16} /> },
    { key: 'membros', label: 'Membros', icon: <Users size={16} /> },
  ];

  const nonAdminMembros = membros.filter(m => !m.is_admin);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div
          className="neu-card rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="font-display text-xl uppercase text-white">Gerenciar Liga</h2>
            <button onClick={onClose} className="text-dark-textMuted hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-5 pt-4">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-ufc-red/20 text-ufc-red'
                    : 'text-dark-textMuted hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-5">

            {/* ── Banner tab ── */}
            {activeTab === 'banner' && (
              <BannerUpload
                ligaId={liga.id}
                currentBanner={liga.imagem_url}
                onUpload={onBannerUpdate}
                isOpen={true}
                onClose={() => {}}
                embedded={true}
              />
            )}

            {/* ── Configs tab ── */}
            {activeTab === 'configs' && (
              <div className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Nome da Liga</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    maxLength={50}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-ufc-red"
                  />
                </div>

                {/* Descricao */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Descricao</label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={200}
                    rows={2}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-ufc-red"
                  />
                  <span className="text-[10px] text-dark-textMuted">{descricao.length}/200</span>
                </div>

                {/* Tipo */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Tipo</label>
                  <div className="flex gap-2">
                    {(['publica', 'privada'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTipo(t)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${
                          tipo === t
                            ? 'border-ufc-red bg-ufc-red/10 text-white'
                            : 'border-dark-border text-dark-textMuted hover:text-white'
                        }`}
                      >
                        {t === 'publica' ? <Globe size={14} /> : <Lock size={14} />}
                        {t === 'publica' ? 'Publica' : 'Privada'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max membros */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Max Membros (0 = ilimitado)</label>
                  <input
                    type="number"
                    value={maxMembros}
                    onChange={(e) => setMaxMembros(Number(e.target.value))}
                    min={0}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-ufc-red"
                  />
                </div>

                {/* Ranking tipo */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Ranking</label>
                  <div className="flex gap-2">
                    {([{ value: 'pontos', label: 'Por Pontos', icon: Trophy }, { value: 'percentual', label: 'Por Percentual', icon: BarChart3 }] as const).map(r => (
                      <button
                        key={r.value}
                        onClick={() => setRankingTipo(r.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${
                          rankingTipo === r.value
                            ? 'border-ufc-red bg-ufc-red/10 text-white'
                            : 'border-dark-border text-dark-textMuted hover:text-white'
                        }`}
                      >
                        <r.icon size={14} />
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Boolean toggles */}
                <div className="space-y-2">
                  {[
                    { label: 'Mostrar picks antes do evento', desc: 'Membros podem ver os picks uns dos outros', icon: mostrarPicks ? Eye : EyeOff, value: mostrarPicks, set: setMostrarPicks },
                    { label: 'Apenas Main Card', desc: 'Previsoes so do main card', icon: Swords, value: apenasMainCard, set: setApenasMainCard },
                    { label: 'Chat ativo', desc: 'Membros podem conversar na liga', icon: MessageCircle, value: chatAtivo, set: setChatAtivo },
                  ].map(toggle => (
                    <button
                      key={toggle.label}
                      type="button"
                      onClick={() => toggle.set(!toggle.value)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
                    >
                      <toggle.icon className={`w-5 h-5 mt-0.5 shrink-0 ${toggle.value ? 'text-ufc-red' : 'text-white/30'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">{toggle.label}</div>
                        <div className="text-[11px] text-white/30 mt-0.5">{toggle.desc}</div>
                      </div>
                      <div className={`relative w-10 h-6 rounded-full transition-colors shrink-0 mt-0.5 ${toggle.value ? 'bg-ufc-red' : 'bg-white/10'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${toggle.value ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Save */}
                {saveError && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{saveError}</p>
                )}
                {saveSuccess && (
                  <p className="text-sm text-green-400 bg-green-900/20 border border-green-800 rounded-lg px-3 py-2">Alteracoes salvas!</p>
                )}
                <button
                  onClick={handleSaveConfigs}
                  disabled={isSaving}
                  className="w-full neu-button rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {isSaving ? 'Salvando...' : 'Salvar alteracoes'}
                </button>
              </div>
            )}

            {/* ── Membros tab ── */}
            {activeTab === 'membros' && (
              <div className="space-y-2">
                {membros.length === 0 ? (
                  <p className="text-center text-dark-textMuted py-4">Nenhum membro</p>
                ) : (
                  membros.map(membro => {
                    const nivelConfig = NIVEL_CONFIG[membro.nivel as NivelUsuario];
                    const displayName = membro.display_name || membro.username;

                    return (
                      <div
                        key={membro.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0">
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
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-white truncate block">
                            {displayName}
                          </span>
                          <span className="text-xs text-dark-textMuted">
                            {nivelConfig?.icone} {membro.nivel}
                          </span>
                        </div>

                        {membro.is_admin ? (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-ufc-red/20 text-ufc-red">
                            Criador
                          </span>
                        ) : (
                          <button
                            onClick={() => setExpelTarget({ userId: membro.id, username: displayName })}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-red-400 hover:bg-red-900/20 transition-colors"
                          >
                            <UserMinus size={14} />
                            Expulsar
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expel confirmation (on top of this modal) */}
      <ConfirmarExpulsaoModal
        ligaId={liga.id}
        userId={expelTarget?.userId || ''}
        username={expelTarget?.username || ''}
        isOpen={!!expelTarget}
        onClose={() => setExpelTarget(null)}
        onExpulso={handleExpulso}
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
git add src/components/arena/GerenciarLigaModal.tsx
git commit -m "feat(arena): add GerenciarLigaModal with tabs (banner, configs, membros)"
```

---

## Chunk 3: Integration

### Task 7: Update LigaHeader

**Files:**
- Modify: `ufc-news-hub/src/components/arena/LigaHeader.tsx`

- [ ] **Step 1: Replace BannerUpload with onGerenciarClick**

Changes:
1. Remove import of `BannerUpload`
2. Remove `bannerOpen` state
3. Replace `onBannerUpdate` prop with `onGerenciarClick: () => void`
4. Button "Editar" calls `onGerenciarClick()` instead of `setBannerOpen(true)`
5. Remove `<BannerUpload>` render at the bottom

Updated props interface:
```typescript
interface LigaHeaderProps {
  liga: Liga & {
    criador: {
      id: string;
      username: string;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
  isAdmin: boolean;
  isMembro: boolean;
  onSairClick: () => void;
  onGerenciarClick: () => void;
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

Expected: will fail because page.tsx still passes `onBannerUpdate`. This is expected — Task 8 fixes it.

- [ ] **Step 3: Commit (skip if typecheck fails — combine with Task 8)**

---

### Task 8: Update Liga page

**Files:**
- Modify: `ufc-news-hub/src/app/arena/ligas/[id]/page.tsx`

- [ ] **Step 1: Add imports and state**

Add import:
```typescript
import { GerenciarLigaModal } from '@/components/arena/GerenciarLigaModal';
```

Add state:
```typescript
const [showGerenciarModal, setShowGerenciarModal] = useState(false);
```

- [ ] **Step 2: Add handlers**

After `handleBannerUpdate`, add:
```typescript
function handleLigaUpdate(fields: Partial<Liga>) {
  setLiga((prev) => prev ? { ...prev, ...fields } as LigaDetalhes : prev);
}

function handleMembroExpulso(userId: string) {
  setMembros((prev) => prev.filter((m) => m.id !== userId));
  setLiga((prev) => prev ? { ...prev, total_membros: Math.max((prev.total_membros || 1) - 1, 0) } : prev);
}
```

- [ ] **Step 3: Update LigaHeader props**

Replace:
```typescript
onBannerUpdate={handleBannerUpdate}
```
With:
```typescript
onGerenciarClick={() => setShowGerenciarModal(true)}
```

- [ ] **Step 4: Add GerenciarLigaModal render**

After `<SairLigaModal>`, add:
```typescript
{isAdmin && (
  <GerenciarLigaModal
    liga={liga}
    membros={membros}
    isOpen={showGerenciarModal}
    onClose={() => setShowGerenciarModal(false)}
    onBannerUpdate={handleBannerUpdate}
    onLigaUpdate={handleLigaUpdate}
    onMembroExpulso={handleMembroExpulso}
  />
)}
```

- [ ] **Step 5: Verify typecheck + lint**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint 2>&1 | grep error
```

- [ ] **Step 6: Commit**

```bash
git add src/components/arena/LigaHeader.tsx "src/app/arena/ligas/[id]/page.tsx"
git commit -m "feat(arena): integrate GerenciarLigaModal into liga page"
```

---

### Task 9: Final Verification + Deploy

- [ ] **Step 1: Run full verification**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint 2>&1 | grep -c "error" && npm run build 2>&1 | tail -3
```

- [ ] **Step 2: Commit any remaining fixes**

- [ ] **Step 3: Push + deploy**

```bash
cd /Users/gabz_cresta/Desktop/ufcnews && git push gabriel main && npx vercel --prod --yes 2>&1 | tail -3
```

- [ ] **Step 4: Test on production**

1. Login em `https://ufc-news.vercel.app/arena/login`
2. Entrar na liga
3. Clicar "Editar" → verificar 3 abas
4. Aba Banner: upload funciona
5. Aba Configs: editar nome, salvar → nome atualiza
6. Aba Membros: ver lista, botao expulsar aparece pra nao-admins
