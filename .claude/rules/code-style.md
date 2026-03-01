# Code Style Rules

## TypeScript
- Strict mode — no `any` types. Use `unknown` + type guards.
- `import type { ... }` for type-only imports
- Named exports only (no `export default` except Next.js pages/layouts)
- Interfaces over types for object shapes: `interface FighterProps { ... }`
- Use `const` by default, `let` only when reassignment is needed

## Import Order
1. React / Next.js
2. Third-party libraries (`ai`, `swr`, `date-fns`, `lucide-react`)
3. Internal aliases (`@/lib/`, `@/components/`, `@/hooks/`)
4. Relative imports
5. Type imports last

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { query } from '@/lib/db';
import { FighterCard } from '@/components/lutadores/FighterCard';
import { formatDate } from './utils';
import type { Lutador } from '@/types/lutador';
```

## Naming
- **Files**: PascalCase for components (`FighterCard.tsx`), camelCase for utils (`rss-parser.ts`)
- **Functions**: camelCase (`fetchNoticias`, `calcularPontuacao`)
- **Components**: PascalCase (`NewsGrid`, `EventCalendar`)
- **Types/Interfaces**: PascalCase (`NoticiaResponse`, `LutadorStats`)
- **Constants**: UPPER_SNAKE for env-like (`MAX_RETRIES`), camelCase for others
- **DB columns**: snake_case Portuguese (`created_at`, `categoria_peso`, `publicado_em`)

## Error Handling
```typescript
// API routes: try/catch with typed error response
try {
  const data = await query<Noticia>('SELECT ...', [params]);
  return NextResponse.json(data);
} catch (error) {
  console.error('[API /noticias] Error:', error);
  return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
}
```

## Comments
- Use `// ═══` section dividers for large files (follow `tools/index.ts` pattern)
- JSDoc for exported functions with non-obvious behavior
- No commented-out code — delete it
