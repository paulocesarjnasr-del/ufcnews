import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'ANTHROPIC_API_KEY'] as const;

export async function GET() {
  const env = Object.fromEntries(
    REQUIRED_ENV_VARS.map((key) => [key, !!process.env[key]])
  );

  try {
    await pool.query('SELECT 1');

    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        db: 'connected',
        env,
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  } catch (error: unknown) {
    console.error('[API /health] Erro ao verificar saude do sistema:', error);

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        db: 'disconnected',
        env,
      },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
}
