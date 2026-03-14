import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { processarEventoFinalizado } from '@/lib/arena/pontuacao';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`[SCORING CRON] Iniciando - ${new Date().toISOString()}`);

  try {
    const eventosParaProcessar = await query<{ id: string; nome: string }>(
      `SELECT DISTINCT e.id, e.nome
       FROM eventos e
       JOIN previsoes p ON p.evento_id = e.id
       WHERE e.status = 'finalizado'
         AND p.processada = false`
    );

    if (eventosParaProcessar.length === 0) {
      console.log('[SCORING CRON] Nenhum evento para processar');
      return NextResponse.json({
        success: true,
        message: 'Nenhum evento para processar',
        eventos_processados: 0,
      });
    }

    const resultados = [];

    for (const evento of eventosParaProcessar) {
      console.log(`[SCORING CRON] Processando: ${evento.nome} (${evento.id})`);

      const resultado = await processarEventoFinalizado(evento.id);

      await query(
        `UPDATE previsoes SET processada_em = NOW()
         WHERE evento_id = $1 AND processada = true AND processada_em IS NULL`,
        [evento.id]
      );

      resultados.push({
        evento_id: evento.id,
        evento_nome: evento.nome,
        ...resultado,
      });

      console.log(
        `[SCORING CRON] ${evento.nome}: ${resultado.previsoesProcessadas} previsoes, ` +
        `${resultado.pontosDistribuidos} pontos, ${resultado.conquistasDesbloqueadas} conquistas`
      );
    }

    return NextResponse.json({
      success: true,
      eventos_processados: resultados.length,
      resultados,
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });

  } catch (error) {
    console.error('[SCORING CRON] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao processar scoring', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
