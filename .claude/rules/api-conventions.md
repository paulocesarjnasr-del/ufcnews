---
paths:
  - "src/app/api/**"
---

# API Route Conventions

## File Structure
- Route file: `src/app/api/{domain}/{action}/route.ts`
- Dynamic routes: `src/app/api/{domain}/[id]/route.ts`
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`

## Request Handling
```typescript
import { NextRequest, NextResponse } from 'next/server';

// Query params
const { searchParams } = new URL(request.url);
const limit = parseInt(searchParams.get('limit') || '20');

// Body params
const body = await request.json();

// Dynamic route params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
}
```

## Response Patterns
```typescript
// Success
return NextResponse.json(data, {
  headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
});

// Error
return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

// Empty success
return NextResponse.json({ success: true });
```

## Auth on Admin Routes
```typescript
import { requireAdmin } from '@/lib/admin-sessions';

export async function POST(request: NextRequest) {
  const admin = requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  // ...
}
```

## Database Queries
- **MUST** use parameterized queries: `query('SELECT * FROM noticias WHERE id = $1', [id])`
- **MUST NOT** use string interpolation: `` query(`SELECT * FROM noticias WHERE id = '${id}'`) ``
- Use `Promise.all()` for parallel queries
- Add `Cache-Control` headers on read-only GET endpoints

## Error Messages
Always in Portuguese:
- `"Erro interno do servidor"` — 500
- `"Não encontrado"` — 404
- `"Não autorizado"` — 401
- `"Parâmetros inválidos"` — 400
- `"Método não permitido"` — 405

## SSE Streaming (Company routes)
```typescript
const encoder = new TextEncoder();
const stream = new ReadableStream({
  async start(controller) {
    const send = (event: string, data: unknown) => {
      controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
    };
    // ... logic
    controller.close();
  }
});

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  }
});
```
