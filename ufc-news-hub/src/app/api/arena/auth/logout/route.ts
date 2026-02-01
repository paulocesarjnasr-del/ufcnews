import { NextResponse } from 'next/server';
import { removerCookieToken } from '@/lib/arena/auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.headers.set('Set-Cookie', removerCookieToken());
  return response;
}
