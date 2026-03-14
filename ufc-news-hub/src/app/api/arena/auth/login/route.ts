import { NextRequest, NextResponse } from 'next/server';
import { loginUsuario, criarCookieToken } from '@/lib/arena/auth';
import { checkRateLimit, recordAttempt } from '@/lib/arena/rate-limiter';
import { LoginArenaRequest } from '@/types/arena';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const body: LoginArenaRequest = await request.json();
    const { email, senha } = body;

    const rateCheck = checkRateLimit(ip, email || '');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente mais tarde.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfter || 900) }
        }
      );
    }

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const resultado = await loginUsuario(email, senha);

    if ('error' in resultado) {
      recordAttempt(ip, email);
      return NextResponse.json({ error: resultado.error }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      usuario: resultado.usuario,
    });

    response.headers.set('Set-Cookie', criarCookieToken(resultado.token));

    return response;
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
