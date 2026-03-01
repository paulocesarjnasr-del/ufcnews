# Arena Intro Cinematica Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a cinematic AI-generated video intro overlay to `/arena` that plays once per session and reveals the existing page unchanged.

**Architecture:** Fullscreen overlay component (`ArenaIntro`) renders on top of the arena page. Video plays, then fades out. `sessionStorage` prevents replay. Admin endpoint triggers AI video generation. New `intro_video_url` column on `eventos` table.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 3, Lucide React, raw SQL via `@/lib/db.ts`

**Key Constraints:**
- PRESERVE existing arena page 100% — zero visual changes to current content
- No test framework — verify with `npm run lint && npx tsc --noEmit`
- Video must be `muted` + `playsInline` for mobile autoplay
- Never use `any` type
- Admin auth via `requireAdmin(request)` from `@/lib/admin-sessions.ts`

**Design Doc:** `docs/plans/2026-03-01-arena-intro-design.md`

---

## Task 1: Add `intro_video_url` Column to Database

**Files:**
- Modify: `prisma/schema.prisma` (line ~189, after `broadcast_info`)
- Modify: `src/types/index.ts` (line ~184, Evento interface)

**Step 1: Add column to Prisma schema**

In `prisma/schema.prisma`, inside the `eventos` model, add after `broadcast_info`:

```prisma
  intro_video_url       String?            @db.VarChar(500)
```

**Step 2: Add column to TypeScript Evento interface**

In `src/types/index.ts`, add to the `Evento` interface before the closing `}`:

```typescript
  intro_video_url?: string | null;
```

Also add to `EventoComLutas` awareness — no change needed since it `extends Evento`.

**Step 3: Run the migration**

Run: `cd ufc-news-hub && npx prisma db push`

This adds the column without creating a migration file (project uses `db push` pattern, no migrations folder exists).

**Step 4: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`
Expected: No errors

**Step 5: Commit**

```bash
git add prisma/schema.prisma src/types/index.ts
git commit -m "feat(arena): add intro_video_url column to eventos table"
```

---

## Task 2: Create `ArenaIntro` Component

**Files:**
- Create: `src/components/arena/ArenaIntro.tsx`

**Step 1: Create the component**

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { SkipForward } from 'lucide-react';

interface ArenaIntroProps {
  videoUrl: string;
  onComplete: () => void;
}

export function ArenaIntro({ videoUrl, onComplete }: ArenaIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Show skip button after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Timeout: if video hasn't loaded in 3 seconds, skip
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 2) {
        handleComplete();
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  function handleComplete() {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  }

  function handleError() {
    setHasError(true);
    onComplete();
  }

  if (hasError) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Skip button - appears after 1.5s */}
      {showSkip && !isFadingOut && (
        <button
          onClick={handleComplete}
          className="absolute bottom-8 right-8 z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium hover:bg-white/20 hover:text-white transition-all animate-fade-in"
        >
          Pular
          <SkipForward className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/arena/ArenaIntro.tsx
git commit -m "feat(arena): create ArenaIntro video overlay component"
```

---

## Task 3: Integrate ArenaIntro into Arena Page

**Files:**
- Modify: `src/app/arena/page.tsx`

**Step 1: Add intro state and logic**

At the top of the `ArenaPage` component (after existing state declarations), add:

```tsx
import { ArenaIntro } from '@/components/arena/ArenaIntro';
```

Add state:

```tsx
const [showIntro, setShowIntro] = useState(false);
```

Add effect after `fetchProximoEvento` completes — check if we should show intro:

```tsx
useEffect(() => {
  if (!proximoEvento?.intro_video_url) return;

  const alreadySeen = sessionStorage.getItem('arena-intro-seen');
  if (!alreadySeen) {
    setShowIntro(true);
  }
}, [proximoEvento]);
```

Add handler:

```tsx
function handleIntroComplete() {
  sessionStorage.setItem('arena-intro-seen', 'true');
  setShowIntro(false);
}
```

**Step 2: Render the overlay**

At the very beginning of the return JSX (before the existing `<div className="min-h-screen...">`), add:

```tsx
{showIntro && proximoEvento?.intro_video_url && (
  <ArenaIntro
    videoUrl={proximoEvento.intro_video_url}
    onComplete={handleIntroComplete}
  />
)}
```

**Step 3: Update the proximoEvento type**

The state type in arena/page.tsx already includes `poster_url` and `horario_main_card` as extra fields. Add `intro_video_url`:

Change:
```tsx
const [proximoEvento, setProximoEvento] = useState<EventoComLutas & { poster_url?: string; horario_main_card?: string } | null>(null);
```

To:
```tsx
const [proximoEvento, setProximoEvento] = useState<EventoComLutas & { poster_url?: string; horario_main_card?: string; intro_video_url?: string } | null>(null);
```

**Step 4: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`
Expected: No errors

**Step 5: Manual test**

1. Start dev server: `npm run dev`
2. In browser console on `/arena`, run: `sessionStorage.removeItem('arena-intro-seen')`
3. Set a test video URL on an event: `UPDATE eventos SET intro_video_url = 'https://example.com/test.mp4' WHERE id = '<event-id>'`
4. Refresh `/arena` — video overlay should appear
5. Click "Pular" — overlay fades, arena page visible
6. Refresh — intro should NOT appear again (sessionStorage set)
7. New incognito tab — intro should appear again

**Step 6: Commit**

```bash
git add src/app/arena/page.tsx
git commit -m "feat(arena): integrate ArenaIntro overlay into arena landing page"
```

---

## Task 4: Create Admin Endpoint for Setting Intro Video URL

**Files:**
- Create: `src/app/api/admin/intro-video/route.ts`

**Step 1: Create the endpoint**

This endpoint handles two operations:
- `POST` — Set `intro_video_url` on an event (admin uploads/pastes URL)
- `DELETE` — Remove `intro_video_url` from an event

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query, queryOne } from '@/lib/db';

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json() as { evento_id?: string; video_url?: string };
    const { evento_id, video_url } = body;

    if (!evento_id || !video_url) {
      return NextResponse.json(
        { error: 'evento_id e video_url obrigatorios' },
        { status: 400 }
      );
    }

    // Verify event exists
    const evento = await queryOne<{ id: string; nome: string }>(
      'SELECT id, nome FROM eventos WHERE id = $1',
      [evento_id]
    );

    if (!evento) {
      return NextResponse.json({ error: 'Evento nao encontrado' }, { status: 404 });
    }

    // Update intro_video_url
    await query(
      'UPDATE eventos SET intro_video_url = $1 WHERE id = $2',
      [video_url, evento_id]
    );

    return NextResponse.json({
      message: `Intro video definido para ${evento.nome}`,
      evento_id,
      video_url,
    });
  } catch (error) {
    console.error('[API /admin/intro-video] Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const evento_id = searchParams.get('evento_id');

    if (!evento_id) {
      return NextResponse.json({ error: 'evento_id obrigatorio' }, { status: 400 });
    }

    await query(
      'UPDATE eventos SET intro_video_url = NULL WHERE id = $1',
      [evento_id]
    );

    return NextResponse.json({ message: 'Intro video removido' });
  } catch (error) {
    console.error('[API /admin/intro-video] Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/api/admin/intro-video/route.ts
git commit -m "feat(arena): create admin endpoint for managing intro video URL"
```

---

## Task 5: Create Admin Endpoint for AI Video Generation

**Files:**
- Create: `src/app/api/admin/gerar-intro/route.ts`

**Step 1: Create the generation endpoint**

This endpoint:
1. Fetches main event fighters' images
2. Calls an AI video generation API (placeholder for now — the exact API will be configured via env var)
3. Saves the resulting video URL to the event

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query, queryOne } from '@/lib/db';

interface MainEventData {
  luta_id: string;
  lutador1_nome: string;
  lutador2_nome: string;
  lutador1_imagem: string | null;
  lutador2_imagem: string | null;
  is_titulo: boolean;
  categoria_peso: string;
}

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json() as { evento_id?: string; prompt_extra?: string };
    const { evento_id, prompt_extra } = body;

    if (!evento_id) {
      return NextResponse.json({ error: 'evento_id obrigatorio' }, { status: 400 });
    }

    // Fetch event
    const evento = await queryOne<{ id: string; nome: string }>(
      'SELECT id, nome FROM eventos WHERE id = $1',
      [evento_id]
    );

    if (!evento) {
      return NextResponse.json({ error: 'Evento nao encontrado' }, { status: 404 });
    }

    // Fetch main event fight with fighter images
    const mainEvent = await queryOne<MainEventData>(
      `SELECT l.id as luta_id,
              l1.nome as lutador1_nome, l2.nome as lutador2_nome,
              l1.imagem_url as lutador1_imagem, l2.imagem_url as lutador2_imagem,
              l.is_titulo, l.categoria_peso
       FROM lutas l
       JOIN lutadores l1 ON l1.id = l.lutador1_id
       JOIN lutadores l2 ON l2.id = l.lutador2_id
       WHERE l.evento_id = $1
       ORDER BY
         CASE WHEN l.tipo = 'main_event' THEN 0
              WHEN l.is_titulo THEN 1
              ELSE 2 END,
         l.ordem DESC
       LIMIT 1`,
      [evento_id]
    );

    if (!mainEvent) {
      return NextResponse.json(
        { error: 'Nenhuma luta encontrada para este evento' },
        { status: 404 }
      );
    }

    if (!mainEvent.lutador1_imagem || !mainEvent.lutador2_imagem) {
      return NextResponse.json(
        { error: 'Lutadores do main event nao possuem imagem' },
        { status: 400 }
      );
    }

    // Build prompt for AI video generation
    const basePrompt = `Cinematic UFC fighter entrance intro. Two MMA fighters facing each other in dramatic slow motion. Dark arena background with red and gold accent lighting. Professional broadcast quality. Camera slowly pushing in. Intense atmosphere. 5 seconds.`;
    const fullPrompt = prompt_extra ? `${basePrompt} ${prompt_extra}` : basePrompt;

    // Call AI video generation API
    // Supports: RUNWAY_API_KEY, KLING_API_KEY, or WAVESPEED_API_KEY
    const videoUrl = await generateVideo({
      prompt: fullPrompt,
      image1Url: mainEvent.lutador1_imagem,
      image2Url: mainEvent.lutador2_imagem,
      eventName: evento.nome,
    });

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Falha ao gerar video. Verifique API key e tente novamente.' },
        { status: 500 }
      );
    }

    // Save to DB
    await query(
      'UPDATE eventos SET intro_video_url = $1 WHERE id = $2',
      [videoUrl, evento_id]
    );

    return NextResponse.json({
      message: `Intro video gerado para ${evento.nome}`,
      video_url: videoUrl,
      lutador1: mainEvent.lutador1_nome,
      lutador2: mainEvent.lutador2_nome,
    });
  } catch (error) {
    console.error('[API /admin/gerar-intro] Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════
// AI Video Generation (pluggable backend)
// ═══════════════════════════════════════════════

interface GenerateVideoParams {
  prompt: string;
  image1Url: string;
  image2Url: string;
  eventName: string;
}

async function generateVideo(params: GenerateVideoParams): Promise<string | null> {
  // Try available APIs in order of preference
  if (process.env.RUNWAY_API_KEY) {
    return generateWithRunway(params);
  }

  console.error('[gerar-intro] Nenhuma API key de video configurada. Defina RUNWAY_API_KEY.');
  return null;
}

async function generateWithRunway(params: GenerateVideoParams): Promise<string | null> {
  try {
    const apiKey = process.env.RUNWAY_API_KEY;

    // Create generation task
    const createResponse = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06',
      },
      body: JSON.stringify({
        model: 'gen4_turbo',
        promptImage: params.image1Url,
        promptText: params.prompt,
        duration: 5,
        ratio: '16:9',
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('[gerar-intro] Runway create failed:', errorText);
      return null;
    }

    const createData = await createResponse.json() as { id?: string };
    const taskId = createData.id;

    if (!taskId) {
      console.error('[gerar-intro] Runway did not return task ID');
      return null;
    }

    // Poll for completion (max 5 minutes)
    const maxAttempts = 60;
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000));

      const statusResponse = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Runway-Version': '2024-11-06',
        },
      });

      if (!statusResponse.ok) continue;

      const statusData = await statusResponse.json() as {
        status?: string;
        output?: string[];
        failure?: string;
      };

      if (statusData.status === 'SUCCEEDED' && statusData.output?.[0]) {
        return statusData.output[0];
      }

      if (statusData.status === 'FAILED') {
        console.error('[gerar-intro] Runway generation failed:', statusData.failure);
        return null;
      }
    }

    console.error('[gerar-intro] Runway generation timed out');
    return null;
  } catch (error) {
    console.error('[gerar-intro] Runway error:', error);
    return null;
  }
}
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/api/admin/gerar-intro/route.ts
git commit -m "feat(arena): create admin endpoint for AI video generation (Runway)"
```

---

## Final Verification

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run build`

**Manual Testing Checklist:**
- [ ] `/arena` without `intro_video_url` — no intro, page loads normally
- [ ] `/arena` with `intro_video_url` — video overlay plays, skip button appears after 1.5s
- [ ] Click "Pular" — overlay fades out in 500ms, arena page visible
- [ ] Let video end — same fade-out behavior
- [ ] Refresh page — intro does NOT play again (sessionStorage)
- [ ] New incognito tab — intro plays again
- [ ] Invalid video URL — fallback: intro skipped silently
- [ ] Mobile: video autoplays (muted + playsInline)
- [ ] Admin: `POST /api/admin/intro-video` with token — sets video URL
- [ ] Admin: `DELETE /api/admin/intro-video?evento_id=X` — removes video URL
- [ ] `POST /api/admin/gerar-intro` with RUNWAY_API_KEY — generates video
