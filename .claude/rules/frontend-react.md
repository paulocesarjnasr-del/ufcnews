---
paths:
  - "src/components/**"
  - "src/app/**/page.tsx"
  - "src/app/**/layout.tsx"
---

# Frontend React Rules

## Component Pattern
```tsx
'use client'; // Only if needed (hooks, state, event handlers)

import { useState } from 'react';
import { SomeIcon } from 'lucide-react';
import type { SomeType } from '@/types/some-type';

interface ComponentProps {
  // Typed props — never `any`
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Named export, no default
}
```

## Server vs Client Components
- **Default to Server Components** — no `'use client'` unless needed
- Add `'use client'` ONLY when using: `useState`, `useEffect`, `onClick`, SWR hooks, browser APIs
- Pages (`page.tsx`) should be server components when possible
- Move interactivity to small client sub-components

## Data Fetching
```tsx
// Client-side: Use SWR hooks from src/hooks/
import { useNoticias } from '@/hooks/useNoticias';
import { useLutadores } from '@/hooks/useLutadores';
import { useEventos } from '@/hooks/useEventos';

// Or raw SWR:
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(r => r.json());
const { data, error, isLoading } = useSWR('/api/endpoint', fetcher);
```

## Neumorphism Design System
```tsx
// Card container
<div className="neu-card p-6">

// Interactive card (hover lift effect)
<div className="neu-card-hover p-6 cursor-pointer">

// Button
<button className="neu-button px-6 py-3 text-white">

// Inset area (inputs, stat boxes)
<div className="neu-inset p-4">

// NEVER use raw shadow-* classes — use neu-* classes
```

## Color Tokens
```tsx
// Headings & accents
<h2 className="font-heading text-2xl text-ufc-gold">

// Primary CTA
<button className="bg-ufc-red text-white">

// Body text
<p className="text-dark-text">

// Card background
<div className="bg-dark-card border border-dark-border">
```

## Typography
- Headings: `font-heading` (Bebas Neue) + `text-ufc-gold` or `text-white`
- Body: `font-sans` (Inter) + `text-dark-text` or `text-gray-300`
- Small/meta: `text-sm text-gray-400`

## Animations
```tsx
// Available animation classes
className="animate-pulse-red"   // Red glow pulse
className="animate-slide-up"    // Slide up entrance
className="animate-fade-in"     // Fade in
className="animate-shimmer"     // Loading shimmer
className="animate-flip-down"   // Flip down reveal
```

## Loading & Error States
```tsx
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

if (isLoading) return <LoadingSkeleton />;
if (error) return <div className="text-red-400">Erro ao carregar dados</div>;
```

## Responsive Design
- Mobile-first: base styles, then `sm:` → `md:` → `lg:`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## Icons
```tsx
import { Trophy, Clock, MapPin } from 'lucide-react';
<Trophy className="w-5 h-5 text-ufc-gold" />
```
