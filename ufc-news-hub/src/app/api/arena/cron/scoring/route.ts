import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import {
  processarPrevisoesLuta,
  processarEventoFinalizado,
  atualizarPontuacaoEvento,
} from '@/lib/arena/pontuacao';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`[SCORING CRON] Iniciando - ${new Date().toISOString()}`);

  try {
    // ═══════════════════════════════════════════════════════════════
    // PHASE 0: Event status management
    // ═══════════════════════════════════════════════════════════════

    // Fix events stuck in ao_vivo where all fights are done → finalizado
    const stuckAoVivo = await query<{ id: string; nome: string }>(
      `SELECT e.id, e.nome FROM eventos e
       WHERE e.status = 'ao_vivo'
         AND NOT EXISTS (
           SELECT 1 FROM lutas l
           WHERE l.evento_id = e.id AND l.status != 'finalizada'
         )
         AND EXISTS (SELECT 1 FROM lutas l WHERE l.evento_id = e.id)`
    );
    for (const ev of stuckAoVivo) {
      await query(`UPDATE eventos SET status = 'finalizado' WHERE id = $1`, [ev.id]);
      console.log(`[SCORING CRON] Status fix: ${ev.nome} ao_vivo → finalizado`);
    }

    // Detect events that should be ao_vivo (date within 6h buffer for timezone, has fights)
    const shouldBeAoVivo = await query<{ id: string; nome: string }>(
      `SELECT e.id, e.nome FROM eventos e
       WHERE e.status = 'agendado'
         AND e.data_evento <= NOW() + INTERVAL '6 hours'
         AND EXISTS (SELECT 1 FROM lutas l WHERE l.evento_id = e.id)`
    );
    for (const ev of shouldBeAoVivo) {
      await query(`UPDATE eventos SET status = 'ao_vivo' WHERE id = $1`, [ev.id]);
      console.log(`[SCORING CRON] Status fix: ${ev.nome} agendado → ao_vivo`);
    }

    // Fix old events still agendado that should be finalizado (>2 days past)
    const oldAgendado = await query<{ id: string; nome: string }>(
      `SELECT e.id, e.nome FROM eventos e
       WHERE e.status = 'agendado'
         AND e.data_evento < NOW() - INTERVAL '2 days'`
    );
    for (const ev of oldAgendado) {
      await query(`UPDATE eventos SET status = 'finalizado' WHERE id = $1`, [ev.id]);
      console.log(`[SCORING CRON] Status fix: ${ev.nome} agendado (old) → finalizado`);
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 1: Per-fight scoring (for live events mid-card)
    // ═══════════════════════════════════════════════════════════════
    const lutasParaProcessar = await query<{
      luta_id: string;
      evento_id: string;
      evento_nome: string;
    }>(
      `SELECT DISTINCT l.id as luta_id, l.evento_id, e.nome as evento_nome
       FROM lutas l
       JOIN previsoes p ON p.luta_id = l.id
       JOIN eventos e ON e.id = l.evento_id
       WHERE l.status = 'finalizada'
         AND l.vencedor_id IS NOT NULL
         AND p.processada = false`
    );

    const eventosAfetados = new Set<string>();
    const lutasProcessadas: Array<{
      luta_id: string;
      evento_nome: string;
      previsoesProcessadas: number;
      pontosDistribuidos: number;
      conquistasDesbloqueadas: number;
    }> = [];

    for (const luta of lutasParaProcessar) {
      console.log(
        `[SCORING CRON] Processando luta ${luta.luta_id} (${luta.evento_nome})`
      );

      const resultado = await processarPrevisoesLuta(luta.luta_id);

      // Stamp processada_em for predictions now marked processada
      await query(
        `UPDATE previsoes SET processada_em = NOW()
         WHERE luta_id = $1 AND processada = true AND processada_em IS NULL`,
        [luta.luta_id]
      );

      lutasProcessadas.push({
        luta_id: luta.luta_id,
        evento_nome: luta.evento_nome,
        ...resultado,
      });

      eventosAfetados.add(luta.evento_id);

      console.log(
        `[SCORING CRON] Luta ${luta.luta_id}: ${resultado.previsoesProcessadas} previsoes, ` +
        `${resultado.pontosDistribuidos} pontos, ${resultado.conquistasDesbloqueadas} conquistas`
      );
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 2: Check if affected events are now fully complete
    // ═══════════════════════════════════════════════════════════════
    const eventosFinalizados: string[] = [];

    for (const eventoId of eventosAfetados) {
      const remaining = await queryOne<{ count: number }>(
        `SELECT COUNT(*)::int as count FROM lutas
         WHERE evento_id = $1 AND status != 'finalizada'`,
        [eventoId]
      );

      if (remaining && remaining.count === 0) {
        console.log(
          `[SCORING CRON] Evento ${eventoId} totalmente finalizado — rodando finalizacao completa`
        );

        // Update event-level leaderboard first
        await atualizarPontuacaoEvento(eventoId);

        // processarEventoFinalizado covers card perfeito + liga rankings
        // (verificarCardPerfeito and atualizarRankingsLigas are not individually exported)
        await processarEventoFinalizado(eventoId);

        eventosFinalizados.push(eventoId);
        console.log(`[SCORING CRON] Evento ${eventoId} finalizacao completa concluida`);
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 3: Fallback — event-level pass for finalized eventos
    // missed by per-fight processing (predictions added after fights,
    // or events marked finalizado without going through ao_vivo)
    // ═══════════════════════════════════════════════════════════════
    const eventosFallback = await query<{ id: string; nome: string }>(
      `SELECT DISTINCT e.id, e.nome
       FROM eventos e
       JOIN previsoes p ON p.evento_id = e.id
       WHERE e.status = 'finalizado'
         AND p.processada = false`
    );

    const resultadosFallback = [];

    for (const evento of eventosFallback) {
      // Skip events already fully handled in Phase 2
      if (eventosFinalizados.includes(evento.id)) continue;

      console.log(`[SCORING CRON] Fallback processando: ${evento.nome} (${evento.id})`);

      const resultado = await processarEventoFinalizado(evento.id);

      await query(
        `UPDATE previsoes SET processada_em = NOW()
         WHERE evento_id = $1 AND processada = true AND processada_em IS NULL`,
        [evento.id]
      );

      resultadosFallback.push({
        evento_id: evento.id,
        evento_nome: evento.nome,
        ...resultado,
      });

      console.log(
        `[SCORING CRON] ${evento.nome}: ${resultado.previsoesProcessadas} previsoes, ` +
        `${resultado.pontosDistribuidos} pontos, ${resultado.conquistasDesbloqueadas} conquistas`
      );
    }

    if (lutasProcessadas.length === 0 && resultadosFallback.length === 0) {
      console.log('[SCORING CRON] Nenhuma luta ou evento para processar');
      return NextResponse.json({
        success: true,
        message: 'Nada para processar',
        lutas_processadas: 0,
        eventos_processados: 0,
      });
    }

    return NextResponse.json(
      {
        success: true,
        lutas_processadas: lutasProcessadas.length,
        eventos_finalizados: eventosFinalizados.length,
        eventos_fallback: resultadosFallback.length,
        lutas: lutasProcessadas,
        fallback: resultadosFallback,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('[SCORING CRON] Erro:', error);
    return NextResponse.json(
      {
        error: 'Erro ao processar scoring',
        details: error instanceof Error ? error.message : 'Unknown',
      },
      { status: 500 }
    );
  }
}
