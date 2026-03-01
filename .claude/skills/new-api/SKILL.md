---
name: new-api
description: Create a new API endpoint following UFC News Hub patterns
---

# New API Endpoint: $ARGUMENTS

## Steps

1. **Plan the endpoint**
   - Determine HTTP method (GET for reads, POST for mutations, DELETE for removals)
   - Determine path: `src/app/api/{domain}/{action}/route.ts`
   - Identify which DB pattern to use:
     - **Raw SQL** (`query<T>()` from `@/lib/db`) — for most endpoints
     - **Prisma** (`import { prisma } from '@/lib/prisma'`) — for AI company system

2. **Create the route file**
   ```
   ufc-news-hub/src/app/api/{domain}/route.ts
   ```

3. **Follow this template** (raw SQL pattern):
   ```typescript
   import { NextRequest, NextResponse } from 'next/server';
   import { query, queryOne } from '@/lib/db';

   export async function GET(request: NextRequest) {
     try {
       const { searchParams } = new URL(request.url);
       const limit = parseInt(searchParams.get('limit') || '20');

       const items = await query<YourType>(
         `SELECT id, campo1, campo2
          FROM sua_tabela
          WHERE status = $1
          ORDER BY created_at DESC
          LIMIT $2`,
         ['ativo', limit]
       );

       return NextResponse.json(items, {
         headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
       });
     } catch (error) {
       console.error('[API /your-endpoint] Error:', error);
       return NextResponse.json(
         { error: 'Erro interno do servidor' },
         { status: 500 }
       );
     }
   }
   ```

4. **For admin routes**, add auth:
   ```typescript
   import { requireAdmin } from '@/lib/admin-sessions';

   export async function POST(request: NextRequest) {
     const admin = requireAdmin(request);
     if (!admin) {
       return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
     }
     // ... rest of handler
   }
   ```

5. **For AI Company routes** (Prisma pattern):
   ```typescript
   import { prisma } from '@/lib/prisma';
   // Use prisma.noticias.findMany(), prisma.lutadores.findFirst(), etc.
   ```

6. **Add types** if needed in `src/types/`

7. **Verify**
   ```bash
   cd ufc-news-hub
   npm run lint && npx tsc --noEmit
   curl http://localhost:3010/api/your-endpoint  # manual test
   ```

## Conventions
- Error messages in Portuguese: `"Erro interno do servidor"`, `"Não encontrado"`, `"Não autorizado"`
- Always use parameterized queries (`$1, $2`) — NEVER string interpolation
- Add `Cache-Control` headers on GET endpoints
- Use `Promise.all()` for parallel queries
- Column/table names in Portuguese
