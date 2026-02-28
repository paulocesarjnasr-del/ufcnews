import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function POST() {
  try {
    // 1. Get next upcoming event
    const evento = await queryOne<{ id: string; nome: string }>(
      `SELECT id, nome FROM eventos
       WHERE status = 'agendado' AND data_evento > NOW()
       ORDER BY data_evento ASC LIMIT 1`
    );

    if (!evento) {
      return NextResponse.json({ error: 'No upcoming event found' }, { status: 404 });
    }

    // 2. Get main event fight (prefer tipo='main_event', fallback to lowest ordem which is the headliner)
    const luta = await queryOne<{
      id: string;
      lutador1_id: string;
      lutador2_id: string;
      l1_nome: string;
      l2_nome: string;
    }>(
      `SELECT l.id, l.lutador1_id, l.lutador2_id,
              l1.nome as l1_nome, l2.nome as l2_nome
       FROM lutas l
       JOIN lutadores l1 ON l1.id = l.lutador1_id
       JOIN lutadores l2 ON l2.id = l.lutador2_id
       WHERE l.evento_id = $1
       ORDER BY
         CASE WHEN l.tipo = 'main_event' THEN 0
              WHEN l.tipo = 'co_main' THEN 1
              ELSE 2 END,
         l.ordem ASC
       LIMIT 1`,
      [evento.id]
    );

    if (!luta) {
      return NextResponse.json({ error: 'No fights found for event' }, { status: 404 });
    }

    // 3. Deactivate existing active polls
    await query('UPDATE enquetes SET ativa = false WHERE ativa = true', []);

    // 4. Create new active poll
    const enquete = await queryOne<{ id: string }>(
      `INSERT INTO enquetes (evento_id, luta_id, pergunta, opcao_a_id, opcao_a_nome, opcao_b_id, opcao_b_nome, ativa)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING id`,
      [
        evento.id,
        luta.id,
        `Quem vence o main event do ${evento.nome}?`,
        luta.lutador1_id,
        luta.l1_nome,
        luta.lutador2_id,
        luta.l2_nome,
      ]
    );

    return NextResponse.json({
      success: true,
      enquete_id: enquete?.id,
      evento: evento.nome,
      luta: `${luta.l1_nome} vs ${luta.l2_nome}`,
    });
  } catch (error) {
    console.error('[seed-enquete] Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
