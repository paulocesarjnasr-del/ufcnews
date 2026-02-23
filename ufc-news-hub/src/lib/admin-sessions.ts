import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ═══════════════════════════════════════
// HMAC-signed token auth for admin
// No server-side state — tokens are self-validating
// Survives HMR, restarts, everything
// ═══════════════════════════════════════

const SECRET = process.env.ADMIN_PASSWORD || 'ufc-admin-2024';
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Create a signed token: "timestamp.hmac"
export function createToken(): string {
  const ts = Date.now().toString();
  const sig = createHmac('sha256', SECRET).update(ts).digest('hex');
  return `${ts}.${sig}`;
}

// Validate a signed token (pure computation, no state)
export function validateToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;

  const dotIndex = token.indexOf('.');
  const ts = token.substring(0, dotIndex);
  const sig = token.substring(dotIndex + 1);

  if (!ts || !sig) return false;

  const timestamp = parseInt(ts, 10);
  if (isNaN(timestamp)) return false;

  // Check expiry
  if (Date.now() - timestamp > TOKEN_TTL_MS) return false;

  // Check signature
  const expected = createHmac('sha256', SECRET).update(ts).digest('hex');
  return sig === expected;
}

// Helper for API routes — validates the Authorization header
export function requireAdmin(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || !validateToken(token)) {
    return NextResponse.json(
      { error: 'Não autorizado. Faça login em /admin.' },
      { status: 401 }
    );
  }
  return null;
}
