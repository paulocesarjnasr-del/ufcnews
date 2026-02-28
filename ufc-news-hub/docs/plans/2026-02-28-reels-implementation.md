# Reels News Feed — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `/noticias` grid with a horizontal Reels-style feed featuring AI captions, likes, comments, and 24h auto-cleanup.

**Architecture:** New API routes (`/api/news/reels`, `/api/news/[id]/like`) serve 24h news with engagement counts. RSS sync pipeline generates `reel_caption` via Claude Haiku. React components handle horizontal navigation with touch/keyboard/arrows. Existing comments system reused unchanged.

**Tech Stack:** Next.js 15 App Router, raw SQL via `src/lib/db.ts`, SWR, CSS transitions for slide animation, `@ai-sdk/anthropic` for caption generation, `useFingerprint` hook for likes.

---

## Task 1: Database Migration — Add `reel_caption` and `news_likes`

**Files:**
- Create: `src/app/api/admin/migrate-reels/route.ts`

**Step 1: Create migration endpoint**

```typescript
// src/app/api/admin/migrate-reels/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-sessions';

export async function POST(request: Request) {
  const admin = await requireAdmin(request as any);
  if (admin instanceof NextResponse) return admin;

  try {
    // Add reel_caption column
    await query(`
      ALTER TABLE noticias
      ADD COLUMN IF NOT EXISTS reel_caption VARCHAR(100)
    `);

    // Create news_likes table
    await query(`
      CREATE TABLE IF NOT EXISTS news_likes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        noticia_id UUID NOT NULL REFERENCES noticias(id) ON DELETE CASCADE,
        user_fingerprint VARCHAR(128) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(noticia_id, user_fingerprint)
      )
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_news_likes_noticia ON news_likes(noticia_id)
    `);

    return NextResponse.json({ success: true, message: 'Reels migration complete' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

**Step 2: Run migration locally**

```bash
curl -X POST http://localhost:3010/api/admin/migrate-reels \
  -H "Authorization: Bearer $(curl -s -X POST http://localhost:3010/api/admin/auth -H 'Content-Type: application/json' -d '{"password":"'"$ADMIN_PASSWORD"'"}' | jq -r .token)"
```

Expected: `{"success": true, "message": "Reels migration complete"}`

**Step 3: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add src/app/api/admin/migrate-reels/route.ts
git commit -m "feat: add reels DB migration (reel_caption + news_likes)"
```

---

## Task 2: Types — Add Reels types

**Files:**
- Modify: `src/types/index.ts`

**Step 1: Add ReelNoticia interface after existing Noticia (line ~34)**

```typescript
export interface ReelNoticia {
  id: string;
  titulo: string;
  reel_caption: string | null;
  imagem_url: string | null;
  fonte_url: string;
  fonte_nome: string;
  categoria: CategoriaNoticia;
  publicado_em: string;
  likes_count: number;
  user_liked: boolean;
  comments_count: number;
}
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add ReelNoticia type"
```

---

## Task 3: Caption Generator — `src/lib/reel-caption.ts`

**Files:**
- Create: `src/lib/reel-caption.ts`

**Step 1: Create caption generator**

```typescript
// src/lib/reel-caption.ts
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function generateReelCaption(
  titulo: string,
  subtitulo: string | null
): Promise<string> {
  try {
    const input = subtitulo ? `${titulo}. ${subtitulo}` : titulo;

    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      maxTokens: 60,
      prompt: `Gere uma legenda curta e chamativa estilo reels de Instagram sobre essa notícia de UFC, em português do Brasil. Máximo 80 caracteres. Use emojis quando fizer sentido. Tom: urgente e empolgante. Retorne APENAS a legenda, nada mais.

Título da notícia: ${input}`,
    });

    const caption = text.trim();
    if (caption.length > 100) {
      return caption.slice(0, 97) + '...';
    }
    return caption;
  } catch (error) {
    console.error('Erro ao gerar reel caption:', error);
    // Fallback: titulo truncado
    return titulo.length > 80 ? titulo.slice(0, 77) + '...' : titulo;
  }
}
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/lib/reel-caption.ts
git commit -m "feat: add reel caption generator with Claude Haiku"
```

---

## Task 4: Integrate Caption into RSS Sync

**Files:**
- Modify: `src/app/api/sync/route.ts:240-263`

**Step 1: Add import at top of file (after line 7)**

```typescript
import { generateReelCaption } from '@/lib/reel-caption';
```

**Step 2: After `saveNoticia()` call succeeds (after line 251, inside the try block), add caption generation**

Insert after `const noticia = await saveNoticia({...});` and before the fighter relations loop:

```typescript
        // Generate reel caption
        try {
          const caption = await generateReelCaption(item.title, classification.subtitulo);
          await pool.query(
            'UPDATE noticias SET reel_caption = $1 WHERE id = $2',
            [caption, noticia.id]
          );
          console.log(`  -> Caption: ${caption}`);
        } catch (captionError) {
          console.error('  -> Erro ao gerar caption:', captionError);
        }
```

**Step 3: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add src/app/api/sync/route.ts
git commit -m "feat: generate reel captions during RSS sync"
```

---

## Task 5: API Route — `GET /api/news/reels`

**Files:**
- Create: `src/app/api/news/reels/route.ts`

**Step 1: Create reels API endpoint**

```typescript
// src/app/api/news/reels/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ReelNoticia } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const fingerprint = request.headers.get('x-user-fingerprint') || '';

    const noticias = await query<ReelNoticia>(
      `SELECT
        n.id,
        n.titulo,
        n.reel_caption,
        n.imagem_url,
        n.fonte_url,
        n.fonte_nome,
        n.categoria,
        n.publicado_em,
        COALESCE(l.likes_count, 0)::int AS likes_count,
        CASE WHEN ul.id IS NOT NULL THEN true ELSE false END AS user_liked,
        COALESCE(c.comments_count, 0)::int AS comments_count
      FROM noticias n
      LEFT JOIN (
        SELECT noticia_id, COUNT(*) AS likes_count
        FROM news_likes
        GROUP BY noticia_id
      ) l ON l.noticia_id = n.id
      LEFT JOIN news_likes ul ON ul.noticia_id = n.id AND ul.user_fingerprint = $1
      LEFT JOIN (
        SELECT noticia_id, COUNT(*) AS comments_count
        FROM comentarios
        WHERE status = 'aprovado'
        GROUP BY noticia_id
      ) c ON c.noticia_id = n.id
      WHERE n.eh_sobre_ufc = true
        AND n.publicado_em >= NOW() - INTERVAL '24 hours'
      ORDER BY n.publicado_em DESC`,
      [fingerprint]
    );

    return NextResponse.json({ noticias }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar reels:', error);
    return NextResponse.json({ error: 'Erro ao buscar reels' }, { status: 500 });
  }
}
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/app/api/news/reels/route.ts
git commit -m "feat: add GET /api/news/reels endpoint"
```

---

## Task 6: API Route — Like/Unlike

**Files:**
- Create: `src/app/api/news/[id]/like/route.ts`

**Step 1: Create like/unlike endpoint**

```typescript
// src/app/api/news/[id]/like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { fingerprint } = body;

    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    }

    await query(
      `INSERT INTO news_likes (noticia_id, user_fingerprint)
       VALUES ($1, $2)
       ON CONFLICT (noticia_id, user_fingerprint) DO NOTHING`,
      [id, fingerprint]
    );

    const result = await queryOne<{ count: string }>(
      'SELECT COUNT(*) as count FROM news_likes WHERE noticia_id = $1',
      [id]
    );

    return NextResponse.json({
      liked: true,
      likes_count: parseInt(result?.count || '0', 10),
    });
  } catch (error) {
    console.error('Erro ao dar like:', error);
    return NextResponse.json({ error: 'Erro ao dar like' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { fingerprint } = body;

    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    }

    await query(
      'DELETE FROM news_likes WHERE noticia_id = $1 AND user_fingerprint = $2',
      [id, fingerprint]
    );

    const result = await queryOne<{ count: string }>(
      'SELECT COUNT(*) as count FROM news_likes WHERE noticia_id = $1',
      [id]
    );

    return NextResponse.json({
      liked: false,
      likes_count: parseInt(result?.count || '0', 10),
    });
  } catch (error) {
    console.error('Erro ao remover like:', error);
    return NextResponse.json({ error: 'Erro ao remover like' }, { status: 500 });
  }
}
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/app/api/news/[id]/like/route.ts
git commit -m "feat: add POST/DELETE /api/news/[id]/like"
```

---

## Task 7: Cron — Add 24h Cleanup

**Files:**
- Modify: `src/app/api/cron/route.ts:11-88` (inside `runSync` function)

**Step 1: Add cleanup step after event sync (after line 46, before weekly analysis)**

Insert after the eventos sync block and before the Tuesday analysis check:

```typescript
  // 2.5. Cleanup old news (>24h)
  console.log('[CRON] Limpando notícias > 24h...');
  try {
    const deleteResult = await fetch(`${baseUrl}/api/news/cleanup`, {
      method: 'POST',
    });
    const cleanupData = await deleteResult.json();
    (results as Record<string, unknown>).cleanup = cleanupData;
    console.log('[CRON] Cleanup:', cleanupData);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[CRON] Erro no cleanup:', errorMsg);
    results.errors.push(`Cleanup: ${errorMsg}`);
  }
```

**Step 2: Create cleanup API route**

```typescript
// src/app/api/news/cleanup/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    const deleted = await query<{ id: string }>(
      `DELETE FROM noticias
       WHERE publicado_em < NOW() - INTERVAL '24 hours'
         AND eh_sobre_ufc = true
       RETURNING id`
    );

    console.log(`[CLEANUP] ${deleted.length} notícias antigas deletadas`);

    return NextResponse.json({
      success: true,
      deleted: deleted.length,
    });
  } catch (error) {
    console.error('Erro no cleanup:', error);
    return NextResponse.json(
      { error: 'Erro no cleanup' },
      { status: 500 }
    );
  }
}
```

**Step 3: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add src/app/api/cron/route.ts src/app/api/news/cleanup/route.ts
git commit -m "feat: add 24h news cleanup to cron job"
```

---

## Task 8: Hook — `useReels`

**Files:**
- Create: `src/hooks/useReels.ts`

**Step 1: Create useReels hook**

```typescript
// src/hooks/useReels.ts
'use client';

import useSWR from 'swr';
import { useCallback } from 'react';
import { ReelNoticia } from '@/types';
import { AUTO_REFRESH_INTERVAL } from '@/lib/constants';
import { useFingerprint } from './useFingerprint';

interface ReelsResponse {
  noticias: ReelNoticia[];
}

export function useReels() {
  const fingerprint = useFingerprint();

  const { data, error, isLoading, mutate } = useSWR<ReelsResponse>(
    fingerprint ? '/api/news/reels' : null,
    (url: string) =>
      fetch(url, {
        headers: { 'x-user-fingerprint': fingerprint },
      }).then((res) => res.json()),
    {
      refreshInterval: AUTO_REFRESH_INTERVAL,
      revalidateOnFocus: false,
    }
  );

  const toggleLike = useCallback(
    async (noticiaId: string) => {
      if (!data || !fingerprint) return;

      const noticia = data.noticias.find((n) => n.id === noticiaId);
      if (!noticia) return;

      const wasLiked = noticia.user_liked;

      // Optimistic update
      mutate(
        {
          noticias: data.noticias.map((n) =>
            n.id === noticiaId
              ? {
                  ...n,
                  user_liked: !wasLiked,
                  likes_count: wasLiked ? n.likes_count - 1 : n.likes_count + 1,
                }
              : n
          ),
        },
        false
      );

      try {
        await fetch(`/api/news/${noticiaId}/like`, {
          method: wasLiked ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint }),
        });
      } catch {
        // Revert on error
        mutate();
      }
    },
    [data, fingerprint, mutate]
  );

  return {
    noticias: data?.noticias || [],
    isLoading,
    error,
    fingerprint,
    toggleLike,
    refresh: () => mutate(),
  };
}
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/hooks/useReels.ts
git commit -m "feat: add useReels hook with optimistic like"
```

---

## Task 9: Components — ReelSlide, ReelCaption, ReelActions, ReelLikeButton

**Files:**
- Create: `src/components/reels/ReelSlide.tsx`
- Create: `src/components/reels/ReelCaption.tsx`
- Create: `src/components/reels/ReelActions.tsx`
- Create: `src/components/reels/ReelLikeButton.tsx`

These are the atomic building blocks. Each is a presentational component. Full implementation code will be written inline — see design doc for layout reference.

**Key details:**
- `ReelSlide` — wraps `next/image` with fill + object-cover, gradient overlay, positions Caption (bottom-left) and Actions (right side)
- `ReelCaption` — displays `reel_caption || titulo`, fonte_nome, TimeAgo. Font: bold, text-shadow
- `ReelActions` — vertical stack of LikeButton, comment count button, external link
- `ReelLikeButton` — heart icon with scale animation on click via CSS `@keyframes like-pop`

**Step 1: Create all four components**

(Full code written during execution — components are pure presentational, no complex logic)

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/reels/
git commit -m "feat: add ReelSlide, ReelCaption, ReelActions, ReelLikeButton"
```

---

## Task 10: Components — ReelComments (drawer)

**Files:**
- Create: `src/components/reels/ReelComments.tsx`

**Key details:**
- Modal/drawer that slides up from bottom (translateY animation)
- Reuses existing `CommentSection` component from `src/components/comments/CommentSection.tsx`
- Backdrop overlay with onClick to close
- Close button at top
- Body scroll lock when open

**Step 1: Create ReelComments drawer**

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/reels/ReelComments.tsx
git commit -m "feat: add ReelComments drawer component"
```

---

## Task 11: Components — ReelProgress, ReelEndScreen, ReelEmptyState

**Files:**
- Create: `src/components/reels/ReelProgress.tsx`
- Create: `src/components/reels/ReelEndScreen.tsx`
- Create: `src/components/reels/ReelEmptyState.tsx`

**Key details:**
- `ReelProgress` — dots row, active dot highlighted in ufc-red, clickable to jump
- `ReelEndScreen` — SVG octagon with animated stroke-dashoffset, glow pulse, "Voltar ao início" button
- `ReelEmptyState` — centered message with boxing glove emoji, "Nenhuma notícia nova hoje"

**Step 1: Create all three components**

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/reels/
git commit -m "feat: add ReelProgress, ReelEndScreen, ReelEmptyState"
```

---

## Task 12: Component — ReelsContainer (main orchestrator)

**Files:**
- Create: `src/components/reels/ReelsContainer.tsx`

**Key details:**
- State: `currentIndex`, `showComments`, `showEndScreen`
- Uses `useReels()` hook
- Desktop: arrow buttons (hidden on mobile via `hidden md:flex`)
- Mobile: touch handlers with 50px threshold for swipe
- Keyboard: ArrowLeft/ArrowRight via useEffect keydown listener
- Slide transition: wrapper div with `transform: translateX(-${currentIndex * 100}%)` and `transition: transform 0.4s ease-out`
- When `currentIndex === noticias.length` → show EndScreen
- Loading state: shimmer skeleton
- Empty state: ReelEmptyState

**Step 1: Create ReelsContainer**

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/reels/ReelsContainer.tsx
git commit -m "feat: add ReelsContainer with swipe, arrows, keyboard nav"
```

---

## Task 13: Replace `/noticias` Page

**Files:**
- Modify: `src/app/noticias/page.tsx` (full rewrite)

**Step 1: Replace page content**

```typescript
// src/app/noticias/page.tsx
'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { ReelsContainer } from '@/components/reels/ReelsContainer';

export default function NoticiasPage() {
  return (
    <MainLayout>
      <ReelsContainer />
    </MainLayout>
  );
}
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npx tsc --noEmit && npm run lint
```

**Step 3: Commit**

```bash
git add src/app/noticias/page.tsx
git commit -m "feat: replace /noticias grid with Reels feed"
```

---

## Task 14: Visual Polish & Animations

**Files:**
- Modify: `tailwind.config.ts` — add `like-pop` keyframe animation
- Review all components for design consistency

**Step 1: Add animations to tailwind config**

Add to `keyframes` section:
```javascript
'like-pop': {
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.3)' },
  '100%': { transform: 'scale(1)' },
},
'slide-from-bottom': {
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
},
'draw-octagon': {
  '0%': { strokeDashoffset: '800' },
  '100%': { strokeDashoffset: '0' },
},
```

Add to `animation` section:
```javascript
'like-pop': 'like-pop 0.3s ease-out',
'slide-from-bottom': 'slide-from-bottom 0.3s ease-out',
'draw-octagon': 'draw-octagon 2s ease-out forwards',
```

**Step 2: Verify**

```bash
cd ufc-news-hub && npm run lint && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add reels animations (like-pop, drawer, octagon)"
```

---

## Task 15: Full Build Verification

**Step 1: Run full build**

```bash
cd ufc-news-hub && npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Manual test checklist**

- [ ] `/noticias` shows Reels feed (not old grid)
- [ ] Arrow navigation works on desktop
- [ ] Swipe navigation works on mobile (devtools toggle)
- [ ] Keyboard arrows navigate slides
- [ ] Like button toggles with animation
- [ ] Like count updates optimistically
- [ ] Comments drawer opens from bottom
- [ ] Can post a comment with nickname
- [ ] External link opens in new tab
- [ ] Progress dots update on navigation
- [ ] End screen shows after last slide
- [ ] "Voltar ao início" resets to first slide
- [ ] Empty state shows if no news in 24h
- [ ] Other pages (Arena, Calendario, Lutadores) still work

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete reels news feed implementation"
```
