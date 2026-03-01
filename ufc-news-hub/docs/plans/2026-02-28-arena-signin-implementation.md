# Arena Sign-In "Octagon Portal" Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign both Arena auth pages (`/arena/login` and `/arena/registro`) with an immersive fullscreen "Octagon Portal" experience using animated octagon SVG, CSS particles, and neumorphism form styling.

**Architecture:** Shared `OctagonPortalLayout` component wraps both login and registro pages, providing the split-view layout with animated left panel. Each page supplies its own form content as children. New CSS animations added to `globals.css` and `tailwind.config.ts`.

**Tech Stack:** React 19, Next.js 15 App Router, Tailwind CSS 3, lucide-react (already installed), existing `useArenaAuth` hook

---

### Task 1: Add New CSS Animations

**Files:**
- Modify: `src/app/globals.css` (add at end of `@layer utilities`)
- Modify: `tailwind.config.ts` (add `float` and `glow-pulse-border` animations)

**Step 1: Add `float` and `glow-pulse-border` keyframes to `tailwind.config.ts`**

In the `animation` object, add:
```typescript
'float': 'float 6s ease-in-out infinite',
'glow-pulse-border': 'glow-pulse-border 3s ease-in-out infinite',
```

In the `keyframes` object, add:
```typescript
'float': {
  '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
  '10%': { opacity: '1' },
  '90%': { opacity: '1' },
  '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
},
'glow-pulse-border': {
  '0%, 100%': { boxShadow: '0 0 10px rgba(210, 10, 10, 0.1), 8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(45,45,45,0.1)' },
  '50%': { boxShadow: '0 0 25px rgba(210, 10, 10, 0.25), 8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(45,45,45,0.1)' },
},
```

**Step 2: Add staggered float delays to `globals.css`**

At end of `@layer utilities`, add:
```css
/* Octagon Portal floating particles */
.float-particle:nth-child(1) { animation-delay: 0s; left: 10%; }
.float-particle:nth-child(2) { animation-delay: 1s; left: 25%; }
.float-particle:nth-child(3) { animation-delay: 2s; left: 45%; }
.float-particle:nth-child(4) { animation-delay: 0.5s; left: 65%; }
.float-particle:nth-child(5) { animation-delay: 3s; left: 80%; }
.float-particle:nth-child(6) { animation-delay: 1.5s; left: 35%; }
.float-particle:nth-child(7) { animation-delay: 2.5s; left: 55%; }
.float-particle:nth-child(8) { animation-delay: 4s; left: 90%; }
```

**Step 3: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`
Expected: PASS

**Step 4: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat: add float and glow-pulse-border animations for arena sign-in"
```

---

### Task 2: Create OctagonPortalLayout Component

**Files:**
- Create: `src/components/arena/OctagonPortalLayout.tsx`

**Step 1: Create the shared layout component**

This component provides:
- Fullscreen split-view (left: animated octagon portal, right: children form)
- Animated octagon SVG with `draw-octagon` animation
- Floating CSS particles
- Scan-line effect
- Dashboard grid background
- "ENTRE NA ARENA" text with gradient
- Responsive: stacked on mobile, split on desktop

```tsx
'use client';

import { Octagon } from 'lucide-react';
import Link from 'next/link';

interface OctagonPortalLayoutProps {
  children: React.ReactNode;
}

export function OctagonPortalLayout({ children }: OctagonPortalLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col md:flex-row">
      {/* Left Panel — The Portal */}
      <div className="relative w-full md:w-1/2 h-[200px] md:h-auto md:min-h-screen bg-dark-card overflow-hidden flex items-center justify-center">
        {/* Grid background */}
        <div className="absolute inset-0 dashboard-grid-bg" />

        {/* Scan-line */}
        <div className="absolute inset-0 mission-scan-line" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="float-particle absolute bottom-0 w-1 h-1 rounded-full bg-ufc-red/60 animate-float"
            />
          ))}
        </div>

        {/* Octagon SVG */}
        <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
          <div className="relative">
            <svg
              viewBox="0 0 200 200"
              className="w-24 h-24 md:w-40 md:h-40 animate-pulse-glow rounded-full"
            >
              <polygon
                points="80,5 120,5 155,25 175,60 175,140 155,175 120,195 80,195 45,175 25,140 25,60 45,25"
                fill="none"
                stroke="#D20A0A"
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset="800"
                className="animate-draw-octagon"
              />
              <polygon
                points="80,5 120,5 155,25 175,60 175,140 155,175 120,195 80,195 45,175 25,140 25,60 45,25"
                fill="none"
                stroke="rgba(210,10,10,0.15)"
                strokeWidth="1"
              />
            </svg>
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Octagon className="w-8 h-8 md:w-12 md:h-12 text-ufc-red/80" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center px-4">
            <h1 className="font-display text-2xl md:text-5xl uppercase tracking-wider text-gradient-ufc">
              Entre na Arena
            </h1>
            <p className="mt-2 text-xs md:text-sm text-dark-textMuted tracking-widest uppercase">
              Previsões • Ligas • Rankings
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-bg to-transparent md:hidden" />
      </div>

      {/* Right Panel — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 min-h-[60vh] md:min-h-screen">
        <div className="w-full max-w-md">
          {children}

          {/* Back to Arena */}
          <div className="mt-6 text-center">
            <Link
              href="/arena"
              className="text-sm text-dark-textMuted hover:text-ufc-red transition-colors"
            >
              ← Voltar para Arena
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`
Expected: PASS

**Step 3: Commit**

```bash
git add src/components/arena/OctagonPortalLayout.tsx
git commit -m "feat: create OctagonPortalLayout with animated octagon, particles, scan-line"
```

---

### Task 3: Redesign Login Page

**Files:**
- Modify: `src/app/arena/login/page.tsx` (full rewrite)

**Step 1: Rewrite the login page**

Replace the entire file. Key changes:
- Remove `<Header />` — fullscreen immersive
- Wrap in `<OctagonPortalLayout>`
- Use `neu-card` for form container
- Use `neu-inset` for inputs
- Add staggered `slide-up-fade` animation on form elements
- Use `Octagon` icon from lucide-react at top of form
- Keep ALL existing auth logic (`useArenaAuth`, validation, redirect, loading states)

The form content (inside OctagonPortalLayout) should be:
- Octagon icon in red
- "Entrar" title in Bebas Neue
- Subtitle in muted text
- Error display (same pattern, neu-styled)
- Email input with `neu-inset` styling
- Password input with `neu-inset` styling
- Submit button with red glow on hover
- "Não tem conta? Criar conta" link

Loading state: show within the layout (not separate page with Header).

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/arena/login/page.tsx
git commit -m "feat: redesign arena login with Octagon Portal fullscreen layout"
```

---

### Task 4: Redesign Registro Page

**Files:**
- Modify: `src/app/arena/registro/page.tsx` (full rewrite)

**Step 1: Rewrite the registration page**

Replace the entire file. Key changes:
- Remove `<Header />` — fullscreen immersive
- Wrap in `<OctagonPortalLayout>`
- Use `neu-card` for form container
- Use `neu-inset` for inputs
- Add staggered `slide-up-fade` animation on form elements
- Benefits section integrated below form (inside the neu-card, or as separate section)
- Keep ALL existing auth logic (`useArenaAuth`, validation, redirect, loading states)

The form content should be:
- Octagon icon in red
- "Criar Conta" title in Bebas Neue
- Subtitle in muted text
- Error display
- Username input with helper text
- Display Name input (optional)
- Email input
- Password input
- Confirm Password input
- Submit button with red glow
- Benefits checklist (styled with neu-inset background)
- "Já tem conta? Fazer login" link

**Step 2: Verify**

Run: `cd ufc-news-hub && npx tsc --noEmit && npm run lint`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/arena/registro/page.tsx
git commit -m "feat: redesign arena registro with Octagon Portal fullscreen layout"
```

---

### Task 5: Visual QA & Final Verification

**Step 1: Run full verification**

```bash
cd ufc-news-hub && npm run lint && npx tsc --noEmit && npm run build
```
Expected: All PASS with no errors

**Step 2: Manual visual check**

- Open `http://localhost:3010/arena/login` — verify octagon animates, particles float, form is neumorphic
- Open `http://localhost:3010/arena/registro` — verify same visual treatment, all fields present
- Test responsive: resize browser to mobile width — verify stacked layout
- Test auth flow: attempt login with wrong creds → error shows correctly
- Test links: "Criar conta" / "Fazer login" navigate between pages
- Test "← Voltar para Arena" links

**Step 3: Final commit if any polish needed**

```bash
git add -A
git commit -m "fix: polish arena sign-in visual details"
```

---

## Summary of Files Changed

| File | Action |
|------|--------|
| `tailwind.config.ts` | Add `float` and `glow-pulse-border` animations |
| `src/app/globals.css` | Add float particle position utilities |
| `src/components/arena/OctagonPortalLayout.tsx` | **NEW** — shared fullscreen layout |
| `src/app/arena/login/page.tsx` | Rewrite with new design |
| `src/app/arena/registro/page.tsx` | Rewrite with new design |

## Dependencies

- No new npm packages needed
- `lucide-react` already installed (has `Octagon` icon)
- All CSS animations reuse or extend existing patterns
