import { NextResponse } from 'next/server';

// Endpoint para ser chamado por um cron job externo
// Exemplo: curl -X POST http://localhost:3000/api/cron?secret=YOUR_SECRET

export async function POST(request: Request) {
  // Verificar secret para segurança básica
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expectedSecret = process.env.CRON_SECRET || 'ufc-news-cron-secret';

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Chamar endpoint de sync
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/sync`, {
      method: 'POST',
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      sync: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro no cron:', error);
    return NextResponse.json(
      { error: 'Erro na sincronização' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Cron endpoint ativo',
    usage: 'POST /api/cron?secret=YOUR_SECRET',
  });
}
