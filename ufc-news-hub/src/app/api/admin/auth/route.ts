import { NextRequest, NextResponse } from 'next/server';
import { createToken, validateToken } from '@/lib/admin-sessions';

// POST /api/admin/auth — Login (no password required for now)
export async function POST(request: NextRequest) {
  try {
    // Accept any request, no password check
    await request.json().catch(() => ({}));
    const token = createToken();
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: 'Erro no servidor.' },
      { status: 500 }
    );
  }
}

// GET /api/admin/auth — Validate token
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || !validateToken(token)) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: true });
}

// DELETE /api/admin/auth — Logout (no server state to clean, just confirm)
export async function DELETE() {
  return NextResponse.json({ ok: true });
}
