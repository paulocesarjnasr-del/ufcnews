import { NextRequest, NextResponse } from 'next/server';
import { loginOuCriarComGoogle, criarCookieToken } from '@/lib/arena/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3010';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    console.error('[Google Callback] Codigo ausente no callback');
    return NextResponse.redirect(new URL('/arena/login?error=google_sem_codigo', BASE_URL));
  }

  try {
    // Passo 1: Troca o code por access_token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error('[Google Callback] Erro ao trocar code por token:', errorBody);
      return NextResponse.redirect(new URL('/arena/login?error=google_token_falhou', BASE_URL));
    }

    const tokenData: { access_token: string } = await tokenResponse.json();

    // Passo 2: Busca dados do usuario no Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userResponse.ok) {
      console.error('[Google Callback] Erro ao buscar perfil do usuario');
      return NextResponse.redirect(new URL('/arena/login?error=google_perfil_falhou', BASE_URL));
    }

    const googleUser: { sub: string; email: string; name: string; picture: string } = await userResponse.json();

    // Passo 3: Cria ou busca usuario no banco
    const result = await loginOuCriarComGoogle(googleUser);

    if ('error' in result) {
      console.error('[Google Callback] Erro na auth:', result.error);
      return NextResponse.redirect(new URL(`/arena/login?error=${encodeURIComponent(result.error)}`, BASE_URL));
    }

    // Passo 4: Seta cookie e redireciona pra Arena
    const response = NextResponse.redirect(new URL('/arena', BASE_URL));
    response.headers.set('Set-Cookie', criarCookieToken(result.token));

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    console.error('[Google Callback] Erro inesperado:', msg);
    console.error('[Google Callback] Stack:', stack);
    return NextResponse.redirect(new URL('/arena/login?error=google_erro_interno', BASE_URL));
  }
}
