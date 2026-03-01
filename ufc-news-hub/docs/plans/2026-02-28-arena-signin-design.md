# Arena Sign-In Redesign — "Octagon Portal"

**Date:** 2026-02-28
**Status:** Approved

## Overview

Redesign both Arena auth pages (`/arena/login` and `/arena/registro`) with a fullscreen "Octagon Portal" visual experience. Pure CSS animations, neumorphism design system, no external dependencies beyond what already exists.

## Layout

- **Fullscreen** (`min-h-screen`) — no global Header, immersive experience
- **Split-view** desktop: left panel (visual) + right panel (form), 50/50
- **Stacked** mobile: compact visual top (200px) + full-width form below
- Background: `dark.bg` (#0A0A0A)

## Left Panel — "The Portal"

- Background `dark.card` with overflow hidden
- **Animated octagon SVG** — drawn with `stroke-dashoffset` animation
- Pulsing red glow around octagon (reuse `pulse-glow`)
- **CSS particles** — 6-8 small circles floating upward (`@keyframes float`)
- **Scan-line** — reuse `.mission-scan-line`
- **Text**: "ENTRE NA ARENA" in Bebas Neue with `.text-gradient-ufc`
- Subtext: "Previsões • Ligas • Rankings" in Inter muted
- **Grid background**: reuse `.dashboard-grid-bg`

## Right Panel — Form

- `neu-card` styled container
- **Icon**: Octagon from lucide-react in UFC red
- **Title**: "Entrar" (login) / "Criar Conta" (register) in Bebas Neue
- **Inputs**: `neu-inset` style (depressed, `dark.bg` background)
- **Submit button**: `bg-ufc-red` with glow hover
- **Links**: toggle between login/registro, back to arena
- **Animation**: staggered `slide-up-fade` on form elements

## New CSS Animations

- `@keyframes float` — particles rising (6s infinite)
- `@keyframes glow-pulse-border` — subtle form border glow

## Pages

### Login (`/arena/login`)
Fields: Email + Senha + "Entrar" button

### Registro (`/arena/registro`)
Fields: Username + Display Name + Email + Senha + Confirmar Senha + "Criar Conta" button + Benefits list

## What Does NOT Change

- All auth logic (`useArenaAuth` hook, API routes)
- Client-side validations
- Redirect behavior after auth
- Types/interfaces

## Responsive Behavior

- **Desktop (md+)**: Horizontal split 50/50, large octagon
- **Mobile**: Compact visual panel (200px) on top, full-width form below
