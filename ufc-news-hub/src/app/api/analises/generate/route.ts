import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { generateFightAnalysis, generateSlug } from '@/lib/generate-analysis';

export const maxDuration = 60; // Allow up to 60s for Claude API call

export async function POST(request: Request) {
  // Auth check
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expectedSecret = process.env.CRON_SECRET || 'ufc-news-cron-secret';

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Optional: specify evento_id in body
    let eventoId: string | null = null;
    try {
      const body = await request.json();
      eventoId = body?.evento_id || null;
    } catch {
      // No body, use next upcoming event
    }

    // 1. Get the event
    let evento;
    if (eventoId) {
      evento = await queryOne<Record<string, unknown>>(
        `SELECT * FROM eventos WHERE id = $1`, [eventoId]
      );
    } else {
      evento = await queryOne<Record<string, unknown>>(
        `SELECT * FROM eventos WHERE status = 'agendado' AND data_evento > NOW() ORDER BY data_evento ASC LIMIT 1`
      );
    }

    if (!evento) {
      return NextResponse.json({ error: 'No upcoming event found' }, { status: 404 });
    }

    // 2. Check if analysis already exists for this event
    const existing = await queryOne<{ id: string }>(
      `SELECT id FROM analises WHERE evento_id = $1`, [evento.id]
    );
    if (existing) {
      return NextResponse.json({ 
        error: 'Analysis already exists for this event',
        analise_id: existing.id 
      }, { status: 409 });
    }

    // 3. Get the main event fight with fighter details
    const mainFight = await queryOne<Record<string, unknown>>(`
      SELECT l.*, 
        l.categoria_peso, l.rounds, l.is_titulo, l.tipo,
        l.lutador1_id, l.lutador2_id
      FROM lutas l
      WHERE l.evento_id = $1 AND l.tipo = 'main_event'
      LIMIT 1
    `, [evento.id]);

    if (!mainFight) {
      return NextResponse.json({ error: 'No main event fight found for this event' }, { status: 404 });
    }

    // 4. Get fighter details
    const fighter1 = await queryOne<Record<string, unknown>>(
      `SELECT * FROM lutadores WHERE id = $1`, [mainFight.lutador1_id]
    );
    const fighter2 = await queryOne<Record<string, unknown>>(
      `SELECT * FROM lutadores WHERE id = $1`, [mainFight.lutador2_id]
    );

    if (!fighter1 || !fighter2) {
      return NextResponse.json({ error: 'Fighter data not found' }, { status: 404 });
    }

    // 5. Generate analysis with Claude
    console.log(`[ANALYSIS] Generating analysis for ${evento.nome}: ${fighter1.nome} vs ${fighter2.nome}`);
    
    const analysis = await generateFightAnalysis(
      {
        id: evento.id as string,
        nome: evento.nome as string,
        slug: evento.slug as string,
        data_evento: evento.data_evento as string,
        local_evento: evento.local_evento as string | null,
        cidade: evento.cidade as string | null,
        pais: evento.pais as string | null,
        tipo: evento.tipo as string,
        onde_assistir: evento.onde_assistir as string | null,
      },
      {
        id: mainFight.id as string,
        categoria_peso: mainFight.categoria_peso as string,
        rounds: mainFight.rounds as number,
        is_titulo: mainFight.is_titulo as boolean,
        tipo: mainFight.tipo as string,
        lutador1: fighter1 as never,
        lutador2: fighter2 as never,
      }
    );

    // 6. Generate slug
    const slug = generateSlug(evento.nome as string);

    // 7. Save to database
    const result = await queryOne<{ id: string }>(`
      INSERT INTO analises (
        evento_id, slug, titulo, subtitulo, 
        lutador1_id, lutador2_id,
        artigo_conteudo, tactical_breakdown, fight_prediction,
        fighter1_info, fighter2_info,
        evento_nome, evento_data, evento_local,
        categoria_peso, num_rounds, is_titulo, broadcast,
        status
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6,
        $7, $8, $9,
        $10, $11,
        $12, $13, $14,
        $15, $16, $17, $18,
        'publicado'
      ) RETURNING id
    `, [
      evento.id,
      slug,
      analysis.titulo,
      analysis.subtitulo,
      fighter1.id,
      fighter2.id,
      analysis.artigo_conteudo,
      JSON.stringify(analysis.tactical_breakdown),
      JSON.stringify(analysis.fight_prediction),
      JSON.stringify(analysis.fighter1_info),
      JSON.stringify(analysis.fighter2_info),
      evento.nome,
      evento.data_evento,
      `${evento.local_evento || ''}, ${evento.cidade || ''}`,
      mainFight.categoria_peso,
      mainFight.rounds,
      mainFight.is_titulo,
      evento.onde_assistir,
    ]);

    console.log(`[ANALYSIS] Analysis saved with id: ${result?.id}`);

    return NextResponse.json({
      success: true,
      analise_id: result?.id,
      slug,
      titulo: analysis.titulo,
      evento: evento.nome,
    });

  } catch (error) {
    console.error('[ANALYSIS] Error generating analysis:', error);
    return NextResponse.json(
      { error: 'Failed to generate analysis', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
