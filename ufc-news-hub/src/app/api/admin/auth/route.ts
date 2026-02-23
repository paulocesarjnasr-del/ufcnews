import { NextRequest, NextResponse } from 'next/server';
import { createToken, validateToken } from '@/lib/admin-sessions';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ufc-admin-2024';

// POST /api/admin/auth — Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Senha incorreta.' },
        { status: 401 }
      );
    }

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
