import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error('[Google OAuth] GOOGLE_CLIENT_ID ou GOOGLE_REDIRECT_URI nao configurados');
    return NextResponse.redirect(new URL('/arena/login?error=google_nao_configurado', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3010'));
  }

  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'online',
    prompt: 'select_account',
  });

  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return NextResponse.redirect(googleUrl);
}
