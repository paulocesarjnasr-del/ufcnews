---
name: new-component
description: Create a new React component with UFC News Hub neumorphism styling
---

# New Component: $ARGUMENTS

## Steps

1. **Determine placement**
   - `src/components/ui/` — Reusable UI components
   - `src/components/admin/` — Admin panel components
   - `src/components/arena/` — Gamification components
   - `src/components/analise/` — Fight analysis components
   - `src/components/calendario/` — Calendar/event components
   - `src/components/lutadores/` — Fighter-related components
   - `src/components/comments/` — Comment system components
   - `src/components/houston/` — AI Company dashboard components

2. **Create the component file**
   ```
   ufc-news-hub/src/components/{domain}/YourComponent.tsx
   ```

3. **Follow this template**:
   ```tsx
   'use client'; // Only if using hooks, state, or event handlers

   import { useState } from 'react'; // Only what you need
   import { SomeIcon } from 'lucide-react';

   interface YourComponentProps {
     title: string;
     // ... typed props, never use `any`
   }

   export function YourComponent({ title }: YourComponentProps) {
     return (
       <div className="neu-card p-6">
         <h2 className="font-heading text-xl text-ufc-gold mb-4">
           {title}
         </h2>
         <div className="neu-inset p-4">
           {/* Content */}
         </div>
         <button className="neu-button mt-4 px-6 py-2 text-white">
           Ação
         </button>
       </div>
     );
   }
   ```

4. **Neumorphism classes reference**:
   | Class | Use For |
   |-------|---------|
   | `neu-card` | Card containers, sections |
   | `neu-card-hover` | Interactive cards (clickable) |
   | `neu-button` | Buttons, CTAs |
   | `neu-inset` | Inset areas: inputs, stat boxes, embedded content |

5. **Color tokens**:
   | Token | Use For |
   |-------|---------|
   | `text-ufc-red` / `bg-ufc-red` | Primary actions, UFC branding |
   | `text-ufc-gold` / `bg-ufc-gold` | Accents, headings, highlights |
   | `bg-dark-bg` | Page background |
   | `bg-dark-card` | Card surfaces |
   | `border-dark-border` | Borders |
   | `text-dark-text` | Body text |

6. **Data fetching** — Use SWR hooks:
   ```tsx
   import useSWR from 'swr';

   const fetcher = (url: string) => fetch(url).then(r => r.json());

   export function YourComponent() {
     const { data, error, isLoading } = useSWR('/api/your-endpoint', fetcher);
     if (isLoading) return <LoadingSkeleton />;
     if (error) return <div className="text-red-400">Erro ao carregar</div>;
     // ...
   }
   ```

7. **Verify**
   ```bash
   cd ufc-news-hub
   npm run lint && npx tsc --noEmit
   ```

## Rules
- Named exports only (no `export default`)
- `'use client'` only when needed (hooks, state, events)
- Typography: `font-heading` for titles, `font-sans` for body
- Always handle loading + error states
- Mobile-first: base → `sm:` → `md:` → `lg:`
