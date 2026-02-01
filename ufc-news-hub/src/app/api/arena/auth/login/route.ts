import { NextRequest, NextResponse } from 'next/server';
import { loginUsuario, criarCookieToken } from '@/lib/arena/auth';
import { LoginArenaRequest } from '@/types/arena';

export async function POST(request: NextRequest) {
  try {
    const body: LoginArenaRequest = await request.json();
    const { email, senha } = body;

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const resultado = await loginUsuario(email, senha);

    if ('error' in resultado) {
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
