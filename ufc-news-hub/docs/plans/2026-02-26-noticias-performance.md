# Noticias Performance Optimization

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce news page load time from ~75ms+ per request (3 sequential DB queries, no cache) to ~20ms first load and 0ms on repeat visits within 5 minutes.

**Architecture:** Split the monolithic `/api/noticias` endpoint into two routes (news + counters), run independent queries in parallel, add HTTP cache headers on all API responses, add server-side memory cache for counters, and replace the brute-force fighter matching with a Map-based lookup system.

**Tech Stack:** Next.js 15 API routes, PostgreSQL, SWR (client-side), Prisma schema (indexes)

---

## Phase 1: Performance (Cache + Parallel Queries)

### Task 1: Add composite database index

The main news query filters by `eh_sobre_ufc = true` and sorts by `publicado_em DESC`, but there is no composite index for this. The DB does a full table scan every time.

**Files:**
- Modify: `prisma/schema.prisma:404-408` (noticias indexes)

**Step 1: Add the composite index to the schema**

In `prisma/schema.prisma`, inside the `model noticias` block, add this line after the existing indexes:

```prisma
  @@index([eh_sobre_ufc, publicado_em(sort: Desc)], map: "idx_noticias_ufc_publicado")
  @@index([eh_sobre_ufc, categoria, publicado_em(sort: Desc)], map: "idx_noticias_ufc_cat_publicado")
```

The first index covers: `WHERE eh_sobre_ufc = true ORDER BY publicado_em DESC` (homepage).
The second covers: `WHERE eh_sobre_ufc = true AND categoria = 'lutas' ORDER BY publicado_em DESC` (filtered tabs).

**Step 2: Generate and apply the migration**

Run:
```bash
cd ufc-news-hub && npx prisma migrate dev --name add_noticias_composite_indexes
```

Expected: Migration created and applied successfully.

**Step 3: Commit**

```bash
git add prisma/
git commit -m "perf: add composite indexes on noticias (eh_sobre_ufc + publicado_em)"
```

---

### Task 2: Create separate counters route with memory cache

Move the heavy category-counting query out of `/api/noticias` into its own route with a 10-minute server-side memory cache + HTTP cache.

**Files:**
- Create: `src/app/api/noticias/contadores/route.ts`

**Step 1: Create the counters route**

Create `src/app/api/noticias/contadores/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ContadorCategorias } from '@/types';

// Server-side memory cache (survives across requests, resets on deploy)
let cachedContadores: ContadorCategorias | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    const now = Date.now();

    // Return from memory cache if still valid
    if (cachedContadores && (now - cacheTimestamp) < CACHE_DURATION_MS) {
      return NextResponse.json(cachedContadores, {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
        },
      });
    }

    // Only hits DB once every 10 minutes
    const result = await query<{
      todas: string;
      lutadores: string;
      lutas: string;
      backstage: string;
    }>(`
      SELECT
        COUNT(*) FILTER (WHERE eh_sobre_ufc = true) as todas,
        COUNT(*) FILTER (WHERE categoria = 'lutadores' AND eh_sobre_ufc = true) as lutadores,
        COUNT(*) FILTER (WHERE categoria = 'lutas' AND eh_sobre_ufc = true) as lutas,
        COUNT(*) FILTER (WHERE categoria = 'backstage' AND eh_sobre_ufc = true) as backstage
      FROM noticias
    `);

    const contadores: ContadorCategorias = {
      todas: parseInt(result[0]?.todas || '0', 10),
      lutadores: parseInt(result[0]?.lutadores || '0', 10),
      lutas: parseInt(result[0]?.lutas || '0', 10),
      backstage: parseInt(result[0]?.backstage || '0', 10),
    };

    // Update memory cache
    cachedContadores = contadores;
    cacheTimestamp = now;

    return NextResponse.json(contadores, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar contadores:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contadores' },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/noticias/contadores/
git commit -m "feat: separate counters route with 10min memory cache"
```

---

### Task 3: Optimize `/api/noticias/route.ts` — parallel queries + cache + remove counters

Remove the counters query (now in its own route), run the news + count queries in parallel with `Promise.all`, and add Cache-Control header.

**Files:**
- Modify: `src/app/api/noticias/route.ts` (full rewrite)

**Step 1: Replace the entire file content**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Noticia, NoticiasPaginadas, CategoriaNoticia } from '@/types';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoria = searchParams.get('categoria') as CategoriaNoticia | null;
    const pagina = parseInt(searchParams.get('pagina') || '1', 10);
    const porPagina = parseInt(
      searchParams.get('porPagina') || String(ITEMS_PER_PAGE),
      10
    );
    const offset = (pagina - 1) * porPagina;

    // Build WHERE clause
    let whereClause = 'WHERE eh_sobre_ufc = true';
    const baseParams: (string | number)[] = [];
    let paramIndex = 1;

    if (categoria && ['lutadores', 'lutas', 'backstage'].includes(categoria)) {
      whereClause += ` AND categoria = $${paramIndex}`;
      baseParams.push(categoria);
      paramIndex++;
    }

    // Run BOTH queries in parallel (instead of sequential)
    const [noticias, countResult] = await Promise.all([
      // Query 1: Fetch news page
      query<Noticia>(
        `SELECT id, titulo, subtitulo, imagem_url, fonte_url, fonte_nome,
                categoria, publicado_em, created_at, visualizacoes
         FROM noticias ${whereClause}
         ORDER BY publicado_em DESC
         LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
        [...baseParams, porPagina, offset]
      ),
      // Query 2: Count total (for pagination)
      query<{ total: string }>(
        `SELECT COUNT(*) as total FROM noticias ${whereClause}`,
        baseParams
      ),
    ]);

    const total = parseInt(countResult[0]?.total || '0', 10);

    const response: NoticiasPaginadas = {
      noticias,
      total,
      pagina,
      porPagina,
      totalPaginas: Math.ceil(total / porPagina),
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícias' },
      { status: 500 }
    );
  }
}
```

Key changes:
- Removed the `contadoresQuery` entirely (now in `/api/noticias/contadores`)
- `Promise.all` runs queries 1 and 2 at the same time
- Added `Cache-Control` header (5 min cache)
- Response type is now `NoticiasPaginadas` without `contadores`

**Step 2: Commit**

```bash
git add src/app/api/noticias/route.ts
git commit -m "perf: parallel queries + cache-control on /api/noticias, remove counters"
```

---

### Task 4: Simplify `/api/noticias/[id]/route.ts` — remove views + related + add cache

Remove the views increment (not used yet, inflated by bots), remove related news (not useful without good matching), keep only the article fetch + fighter lookup. Add Cache-Control.

**Files:**
- Modify: `src/app/api/noticias/[id]/route.ts` (full rewrite)

**Step 1: Replace the entire file content**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Noticia, Lutador, NoticiaComLutadores } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch article + mentioned fighters in parallel
    const [noticia, lutadores] = await Promise.all([
      queryOne<Noticia>(
        `SELECT id, titulo, subtitulo, conteudo_completo, imagem_url,
                fonte_url, fonte_nome, categoria, publicado_em, created_at
         FROM noticias WHERE id = $1`,
        [id]
      ),
      query<Lutador>(
        `SELECT l.id, l.nome, l.apelido, l.categoria_peso, l.imagem_url, l.url_perfil
         FROM lutadores l
         JOIN noticia_entidades ne ON l.id = ne.lutador_id
         WHERE ne.noticia_id = $1
         ORDER BY l.nome`,
        [id]
      ),
    ]);

    if (!noticia) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    const response: NoticiaComLutadores = {
      ...noticia,
      lutadores,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícia' },
      { status: 500 }
    );
  }
}
```

Changes:
- Removed views increment (was 1 of 4 queries, inflated by bots)
- Removed related news query (was wrong — just grabbed latest same-category)
- `Promise.all` for article + fighters (2 queries in parallel instead of 4 sequential)
- Added `Cache-Control`
- Removed `visualizacoes` from SELECT (not needed in frontend)

**Step 2: Commit**

```bash
git add src/app/api/noticias/\[id\]/route.ts
git commit -m "perf: simplify article route — parallel queries, remove views/related, add cache"
```

---

### Task 5: Update `useNoticias.ts` — fetch counters separately + disable refetch on focus

The hook currently expects counters inside the `/api/noticias` response. Now counters come from a separate route. Also disable `revalidateOnFocus` to stop refetching when switching tabs.

**Files:**
- Modify: `src/hooks/useNoticias.ts` (full rewrite)

**Step 1: Replace the entire file content**

```typescript
'use client';

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Noticia, NoticiasPaginadas, ContadorCategorias, CategoriaNoticia } from '@/types';
import { ITEMS_PER_PAGE, AUTO_REFRESH_INTERVAL } from '@/lib/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseNoticiasOptions {
  categoria?: CategoriaNoticia;
  porPagina?: number;
  refreshInterval?: number;
}

interface UseNoticiasReturn {
  noticias: Noticia[];
  contadores: ContadorCategorias | undefined;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | undefined;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function useNoticias(options: UseNoticiasOptions = {}): UseNoticiasReturn {
  const {
    categoria,
    porPagina = ITEMS_PER_PAGE,
    refreshInterval = AUTO_REFRESH_INTERVAL,
  } = options;

  // Counters from separate route (cached 10min server-side)
  const { data: contadores } = useSWR<ContadorCategorias>(
    '/api/noticias/contadores',
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000, // 10 minutes (matches server cache)
      revalidateOnFocus: false,
    }
  );

  const getKey = (pageIndex: number, previousPageData: NoticiasPaginadas | null) => {
    if (previousPageData && previousPageData.noticias.length === 0) return null;

    const params = new URLSearchParams({
      pagina: String(pageIndex + 1),
      porPagina: String(porPagina),
    });

    if (categoria) {
      params.set('categoria', categoria);
    }

    return `/api/noticias?${params.toString()}`;
  };

  const {
    data,
    error,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<NoticiasPaginadas>(
    getKey,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: false,
      revalidateFirstPage: true,
    }
  );

  const allNoticias = data ? data.flatMap((page) => page?.noticias || []) : [];
  const noticias = [...new Map(allNoticias.filter(n => n?.id).map(n => [n.id, n])).values()];

  const hasMore = data
    ? data[data.length - 1]?.pagina < data[data.length - 1]?.totalPaginas
    : false;

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    noticias,
    contadores,
    isLoading: isLoading && !data,
    isLoadingMore: isLoadingMore || false,
    error,
    hasMore,
    loadMore: () => setSize(size + 1),
    refresh: () => mutate(),
  };
}

// Hook for a single article (unchanged)
export function useNoticia(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/noticias/${id}` : null,
    fetcher
  );

  return {
    noticia: data,
    isLoading,
    error,
    refresh: () => mutate(),
  };
}
```

Changes:
- New `useSWR` call for `/api/noticias/contadores` (separate from news)
- `revalidateOnFocus: false` on both SWR hooks
- Counters refresh every 10 minutes (matches server cache)
- Removed `contadores` from `NoticiasPaginadas` type expectation
- `isValidating` removed from destructuring (unused)

**Step 2: Verify type compatibility**

Check that `NoticiasPaginadas` in `src/types/index.ts` does NOT require `contadores`. It shouldn't — the original type only has `noticias, total, pagina, porPagina, totalPaginas`. The `& { contadores: ContadorCategorias }` was an intersection added in the hook. We removed it.

**Step 3: Commit**

```bash
git add src/hooks/useNoticias.ts
git commit -m "perf: fetch counters separately, disable revalidateOnFocus"
```

---

## Phase 2: Fighter Matching (Map-based VLOOKUP)

### Task 6: Rewrite `findMatchingFighters` with Map-based lookup

Replace the brute-force loop (tests every fighter against text) with a Map-based system. Build the Map once with full names, unique last names, and unique nicknames. Then extract word combinations from the text and look them up.

**Files:**
- Modify: `src/lib/keyword-classifier.ts:441-481` (replace `findMatchingFighters`)

**Step 1: Replace the `findMatchingFighters` function (lines 441-481)**

Delete the old function and replace with:

```typescript
interface FighterLookupMap {
  fullNames: Map<string, string>;        // "alex pereira" → "Alex Pereira"
  uniqueLastNames: Map<string, string>;  // "adesanya" → "Israel Adesanya" (only if unique)
  uniqueNicknames: Map<string, string>;  // "poatan" → "Alex Pereira" (only if unique)
}

function buildFighterMap(
  lutadores: Array<{ nome: string; apelido: string | null }>
): FighterLookupMap {
  const fullNames = new Map<string, string>();
  const lastNameCounts = new Map<string, string[]>(); // track how many fighters share a last name
  const nicknameCounts = new Map<string, string[]>();

  for (const lutador of lutadores) {
    const normalizedFull = normalizeText(lutador.nome);

    // Full name — always unique enough
    fullNames.set(normalizedFull, lutador.nome);

    // Last name — track duplicates
    const parts = lutador.nome.split(' ');
    if (parts.length > 1) {
      const lastName = normalizeText(parts[parts.length - 1]);
      if (lastName.length > 4) {
        const existing = lastNameCounts.get(lastName) || [];
        existing.push(lutador.nome);
        lastNameCounts.set(lastName, existing);
      }
    }

    // Nickname — track duplicates
    if (lutador.apelido && lutador.apelido.length > 2) {
      const normalizedNick = normalizeText(lutador.apelido);
      const existing = nicknameCounts.get(normalizedNick) || [];
      existing.push(lutador.nome);
      nicknameCounts.set(normalizedNick, existing);
    }
  }

  // Only keep last names that belong to exactly 1 fighter
  const uniqueLastNames = new Map<string, string>();
  for (const [lastName, fighters] of lastNameCounts) {
    if (fighters.length === 1) {
      uniqueLastNames.set(lastName, fighters[0]);
    }
  }

  // Only keep nicknames that belong to exactly 1 fighter
  const uniqueNicknames = new Map<string, string>();
  for (const [nickname, fighters] of nicknameCounts) {
    if (fighters.length === 1) {
      uniqueNicknames.set(nickname, fighters[0]);
    }
  }

  return { fullNames, uniqueLastNames, uniqueNicknames };
}

function extractTextNgrams(text: string): string[] {
  // Split into words, generate 1-word, 2-word, and 3-word combinations
  const words = text.split(/\s+/).filter(w => w.length > 1);
  const ngrams: string[] = [];

  for (let i = 0; i < words.length; i++) {
    // Single word (for last names and nicknames)
    ngrams.push(words[i]);
    // Bigram (most fighter names: "alex pereira", "israel adesanya")
    if (i + 1 < words.length) {
      ngrams.push(`${words[i]} ${words[i + 1]}`);
    }
    // Trigram (names like "charles do bronx" or "jose aldo junior")
    if (i + 2 < words.length) {
      ngrams.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
    // 4-gram (for longer names)
    if (i + 3 < words.length) {
      ngrams.push(`${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`);
    }
  }

  return ngrams;
}

function findMatchingFighters(
  text: string,
  lutadores: Array<{ nome: string; apelido: string | null }>
): string[] {
  const normalizedText = normalizeText(text);
  const fighterMap = buildFighterMap(lutadores);
  const ngrams = extractTextNgrams(normalizedText);
  const matched = new Set<string>();

  for (const ngram of ngrams) {
    // Priority 1: Full name match (most reliable)
    const fullMatch = fighterMap.fullNames.get(ngram);
    if (fullMatch) {
      matched.add(fullMatch);
      continue;
    }

    // Priority 2: Unique nickname match
    const nickMatch = fighterMap.uniqueNicknames.get(ngram);
    if (nickMatch) {
      matched.add(nickMatch);
      continue;
    }

    // Priority 3: Unique last name match (only if no ambiguity)
    const lastNameMatch = fighterMap.uniqueLastNames.get(ngram);
    if (lastNameMatch) {
      matched.add(lastNameMatch);
    }
  }

  return [...matched];
}
```

How this works (the "VLOOKUP" approach):

1. `buildFighterMap()` runs once per classification batch — creates 3 Maps:
   - Full names: always included (exact match required)
   - Last names: only if UNIQUE (no other fighter shares it)
   - Nicknames: only if UNIQUE
2. `extractTextNgrams()` breaks the article text into word combinations
3. `findMatchingFighters()` looks up each combination in the Maps

Example:
```
Text: "Alex Pereira nocauteia Adesanya"
Ngrams: ["alex", "pereira", "nocauteia", "adesanya",
         "alex pereira", "pereira nocauteia", "nocauteia adesanya"]

Lookups:
  "alex pereira" → fullNames.get() → "Alex Pereira" ✅
  "adesanya" → uniqueLastNames.get() → "Israel Adesanya" ✅
  "pereira" → uniqueLastNames has it? NO (3 fighters share "Pereira") → skip ✅
```

**Step 2: Optimize batch classification**

In the same file, update `classifyNewsBatch` (line 674-679) to build the Map once for the whole batch instead of once per article:

```typescript
export function classifyNewsBatch(
  noticias: Array<{ titulo: string; descricao: string }>,
  lutadores: Array<{ nome: string; apelido: string | null }>
): ClassificationResult[] {
  return noticias.map((n) => classifyNews(n.titulo, n.descricao, lutadores));
}
```

Note: The Map is built inside `findMatchingFighters` which is called per article. For batch optimization, we could hoist the Map build. But since `classifyNewsBatch` calls `classifyNews` which has other logic, the current structure is acceptable. The Map build is O(n) on fighters count (~800), which is fast. The real win is the O(1) lookups replacing O(n) scans.

**Step 3: Commit**

```bash
git add src/lib/keyword-classifier.ts
git commit -m "fix: replace brute-force fighter matching with Map-based lookup"
```

---

## Performance Impact Summary

```
BEFORE:
  /api/noticias     → 3 queries sequential, no cache     ~75ms every time
  /api/noticias/123 → 4 queries sequential, no cache     ~80ms every time
  Tab switch         → refetches everything
  Fighter matching   → O(n*m) brute force, wrong results

AFTER:
  /api/noticias         → 2 queries parallel, 5min cache  ~20ms (0ms cached)
  /api/noticias/contadores → 1 query, 10min memory cache  ~0ms (DB hit 1x/10min)
  /api/noticias/123     → 2 queries parallel, 5min cache  ~15ms (0ms cached)
  Tab switch            → no refetch (uses cached data)
  Fighter matching      → O(ngrams) Map lookup, correct results
```
