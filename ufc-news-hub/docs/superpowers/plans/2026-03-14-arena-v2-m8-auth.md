# Arena v2 — M8: Auth Hardening Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate from SHA-256 + Base64 tokens to bcrypt + JWT (HMAC-SHA256). Add rate limiting. Gradual hash migration on login.

**Architecture:** Rewrite `auth.ts` core functions: hashSenha → bcrypt, gerarToken → jose JWT, verificarToken → jwtVerify. Add rate limiter (in-memory Map with TTL). Login detects legacy hash (64 chars hex) and re-hashes with bcrypt. Cookie gets Secure + SameSite=Strict.

**Tech Stack:** bcrypt, jose (JWT), Next.js 15, raw SQL

**Spec:** `docs/superpowers/specs/2026-03-14-arena-v2-design.md` (section M8)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/arena/auth.ts` | REWRITE | bcrypt + JWT + gradual migration |
| `src/lib/arena/rate-limiter.ts` | CREATE | In-memory rate limiting per IP + email |
| `src/app/api/arena/auth/login/route.ts` | MODIFY | Add rate limiting |
| `src/app/api/arena/auth/registro/route.ts` | MODIFY | Add input validation |

**Dependencies:** `npm install bcrypt jose` + `npm install -D @types/bcrypt`

---

### Task 1: Install dependencies

- [ ] `cd ufc-news-hub && npm install bcrypt jose && npm install -D @types/bcrypt`
- [ ] Commit: `git commit -m "chore: add bcrypt + jose dependencies for auth hardening"`

### Task 2: Create rate limiter

- [ ] Create `src/lib/arena/rate-limiter.ts`
- [ ] Commit

### Task 3: Rewrite auth.ts with bcrypt + JWT + migration

- [ ] Rewrite `src/lib/arena/auth.ts`
- [ ] Commit

### Task 4: Add rate limiting to login route

- [ ] Modify `src/app/api/arena/auth/login/route.ts`
- [ ] Commit

### Task 5: Lint + typecheck + test

- [ ] `npm run lint && npx tsc --noEmit`
- [ ] Test login with existing user
