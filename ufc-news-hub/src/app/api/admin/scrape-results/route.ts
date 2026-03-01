import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query, queryOne } from '@/lib/db';
import { scrapeUFCResults, mapMethodToDB, matchFighterName } from '@/lib/scrape-results';
import { processarPrevisoesLuta } from '@/lib/arena/pontuacao';

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json() as { evento_id?: string };
    const { evento_id } = body;

    if (!evento_id) {
      return NextResponse.json({ error: 'evento_id obrigatorio' }, { status: 400 });
    }

    // Fetch event
    const evento = await queryOne<{ id: string; nome: string; status: string }>(
      'SELECT id, nome, status FROM eventos WHERE id = $1',
      [evento_id]
    );

    if (!evento) {
      return NextResponse.json({ error: 'Evento nao encontrado' }, { status: 404 });
    }

    // Fetch fights
    const lutas = await query<{
      id: string;
      lutador1_id: string;
      lutador2_id: string;
      lutador1_nome: string;
      lutador2_nome: string;
      status: string;
    }>(
      `SELECT l.id, l.lutador1_id, l.lutador2_id,
              l1.nome as lutador1_nome, l2.nome as lutador2_nome,
              l.status
       FROM lutas l
       JOIN lutadores l1 ON l1.id = l.lutador1_id
       JOIN lutadores l2 ON l2.id = l.lutador2_id
       WHERE l.evento_id = $1
       ORDER BY l.ordem DESC`,
      [evento_id]
    );

    // Scrape results
    const scraped = await scrapeUFCResults(evento.nome);

    if (scraped.length === 0) {
      return NextResponse.json({
        message: 'Nenhum resultado encontrado pelo scraper',
        lutas_total: lutas.length,
        resultados_scraped: 0,
        lutas_atualizadas: 0,
      });
    }

    let lutasAtualizadas = 0;
    const detalhes: { luta_id: string; lutador1: string; lutador2: string; vencedor: string; metodo: string }[] = [];

    for (const result of scraped) {
      // Find matching fight in DB
      const matchedLuta = lutas.find(luta => {
        const match1 = matchFighterName(result.lutador1_nome, luta.lutador1_nome) ||
                        matchFighterName(result.lutador1_nome, luta.lutador2_nome);
        const match2 = matchFighterName(result.lutador2_nome, luta.lutador1_nome) ||
                        matchFighterName(result.lutador2_nome, luta.lutador2_nome);
        return match1 && match2;
      });

      if (!matchedLuta) continue;
      if (matchedLuta.status === 'finalizada') continue;

      // Determine winner ID
      let vencedorId: string | null = null;
      if (matchFighterName(result.vencedor_nome, matchedLuta.lutador1_nome)) {
        vencedorId = matchedLuta.lutador1_id;
      } else if (matchFighterName(result.vencedor_nome, matchedLuta.lutador2_nome)) {
        vencedorId = matchedLuta.lutador2_id;
      }

      const metodo = mapMethodToDB(result.metodo);

      // Update fight in DB
      await query(
        `UPDATE lutas
         SET vencedor_id = $1,
             metodo = $2,
             round_final = $3,
             tempo_final = $4,
             status = 'finalizada'
         WHERE id = $5`,
        [vencedorId, metodo, result.round, result.tempo, matchedLuta.id]
      );

      lutasAtualizadas++;
      detalhes.push({
        luta_id: matchedLuta.id,
        lutador1: matchedLuta.lutador1_nome,
        lutador2: matchedLuta.lutador2_nome,
        vencedor: result.vencedor_nome,
        metodo: metodo || result.metodo,
      });

      // Process predictions for this fight
      try {
        await processarPrevisoesLuta(matchedLuta.id);
      } catch (err) {
        console.error(`[scrape-results] Erro ao processar previsoes da luta ${matchedLuta.id}:`, err);
      }
    }

    // Update event status if all fights are finalized
    const lutasPendentes = await queryOne<{ count: number }>(
      `SELECT COUNT(*)::integer as count FROM lutas WHERE evento_id = $1 AND status != 'finalizada'`,
      [evento_id]
    );

    if (lutasPendentes && lutasPendentes.count === 0) {
      await query(`UPDATE eventos SET status = 'finalizado' WHERE id = $1`, [evento_id]);
    }

    return NextResponse.json({
      message: `${lutasAtualizadas} lutas atualizadas`,
      lutas_total: lutas.length,
      resultados_scraped: scraped.length,
      lutas_atualizadas: lutasAtualizadas,
      detalhes,
    });
  } catch (error) {
    console.error('[API /admin/scrape-results] Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
