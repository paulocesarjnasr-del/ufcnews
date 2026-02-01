import { NextRequest, NextResponse } from 'next/server';
import { registrarUsuario, criarCookieToken } from '@/lib/arena/auth';
import { RegistroArenaRequest } from '@/types/arena';

export async function POST(request: NextRequest) {
  try {
    const body: RegistroArenaRequest = await request.json();
    const { username, email, senha, display_name } = body;

    const resultado = await registrarUsuario(username, email, senha, display_name);

    if ('error' in resultado) {
      return NextResponse.json({ error: resultado.error }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      usuario: resultado.usuario,
    });

    response.headers.set('Set-Cookie', criarCookieToken(resultado.token));

    return response;
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
