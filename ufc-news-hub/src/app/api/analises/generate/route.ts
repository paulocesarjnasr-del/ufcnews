import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { generateFightAnalysis, generateFullCardAnalysis, generateSlug } from '@/lib/generate-analysis';

export const maxDuration = 300; // Allow up to 5 minutes for full card (5-6 fights)

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

    // 3. Get ALL main card fights
    const mainCardFights = await query<Record<string, unknown>>(`
      SELECT l.*, l.categoria_peso, l.rounds, l.is_titulo, l.tipo, l.ordem,
             l.lutador1_id, l.lutador2_id
      FROM lutas l
      WHERE l.evento_id = $1 AND l.tipo IN ('main_event','co_main','card_principal')
      ORDER BY l.ordem DESC
    `, [evento.id]);

    if (!mainCardFights || mainCardFights.length === 0) {
      return NextResponse.json({ error: 'No main card fights found for this event' }, { status: 404 });
    }

    // 4. Get fighter details for all fights in parallel
    const fighterPromises = mainCardFights.flatMap((fight: Record<string, unknown>) => [
      queryOne<Record<string, unknown>>(`SELECT * FROM lutadores WHERE id = $1`, [fight.lutador1_id]),
      queryOne<Record<string, unknown>>(`SELECT * FROM lutadores WHERE id = $1`, [fight.lutador2_id]),
    ]);
    const allFighters = await Promise.all(fighterPromises);

    // Build fight data with fighter details
    const fightsData = mainCardFights.map((fight: Record<string, unknown>, index: number) => {
      const fighter1 = allFighters[index * 2];
      const fighter2 = allFighters[index * 2 + 1];
      if (!fighter1 || !fighter2) {
        throw new Error(`Fighter data not found for fight ${fight.id}`);
      }
      return {
        id: fight.id as string,
        categoria_peso: fight.categoria_peso as string,
        rounds: fight.rounds as number,
        is_titulo: fight.is_titulo as boolean,
        tipo: fight.tipo as string,
        ordem: fight.ordem as number,
        lutador1: fighter1 as never,
        lutador2: fighter2 as never,
      };
    });

    const eventData = {
      id: evento.id as string,
      nome: evento.nome as string,
      slug: evento.slug as string,
      data_evento: evento.data_evento as string,
      local_evento: evento.local_evento as string | null,
      cidade: evento.cidade as string | null,
      pais: evento.pais as string | null,
      tipo: evento.tipo as string,
      onde_assistir: evento.onde_assistir as string | null,
    };

    // 5. Single fight fallback vs full card analysis
    if (mainCardFights.length === 1) {
      // Single fight — use old behavior
      const fight = fightsData[0];
      console.log(`[ANALYSIS] Generating single fight analysis for ${evento.nome}: ${(fight.lutador1 as Record<string, unknown>).nome} vs ${(fight.lutador2 as Record<string, unknown>).nome}`);

      const analysis = await generateFightAnalysis(eventData, fight);

      const slug = generateSlug(evento.nome as string);

      const result = await queryOne<{ id: string }>(`
        INSERT INTO analises (
          evento_id, slug, titulo, subtitulo,
          lutador1_id, lutador2_id,
          artigo_conteudo, tactical_breakdown, fight_prediction,
          fighter1_info, fighter2_info,
          evento_nome, evento_data, evento_local,
          categoria_peso, num_rounds, is_titulo, broadcast,
          analysis_type,
          status
        ) VALUES (
          $1, $2, $3, $4,
          $5, $6,
          $7, $8, $9,
          $10, $11,
          $12, $13, $14,
          $15, $16, $17, $18,
          'single_fight',
          'publicado'
        ) RETURNING id
      `, [
        evento.id,
        slug,
        analysis.titulo,
        analysis.subtitulo,
        (fight.lutador1 as Record<string, unknown>).id,
        (fight.lutador2 as Record<string, unknown>).id,
        analysis.artigo_conteudo,
        JSON.stringify(analysis.tactical_breakdown),
        JSON.stringify(analysis.fight_prediction),
        JSON.stringify(analysis.fighter1_info),
        JSON.stringify(analysis.fighter2_info),
        evento.nome,
        evento.data_evento,
        `${evento.local_evento || ''}, ${evento.cidade || ''}`,
        fight.categoria_peso,
        fight.rounds,
        fight.is_titulo,
        evento.onde_assistir,
      ]);

      console.log(`[ANALYSIS] Single fight analysis saved with id: ${result?.id}`);

      return NextResponse.json({
        success: true,
        analise_id: result?.id,
        slug,
        titulo: analysis.titulo,
        evento: evento.nome,
        analysis_type: 'single_fight',
      });
    }

    // Full card analysis (multiple fights)
    console.log(`[ANALYSIS] Generating full card analysis for ${evento.nome} (${fightsData.length} fights)`);

    const fullCardResult = await generateFullCardAnalysis(eventData, fightsData);

    const slug = generateSlug(evento.nome as string) + '-preview';

    // Main event: find by fight_type, fallback to first
    const mainEventAnalysis = fullCardResult.fights_analysis.find(f => f.fight_type === 'main_event') || fullCardResult.fights_analysis[0];
    const mainFight = fightsData.find(f => f.tipo === 'main_event') || fightsData[0];

    const result = await queryOne<{ id: string }>(`
      INSERT INTO analises (
        evento_id, slug, titulo, subtitulo,
        lutador1_id, lutador2_id,
        artigo_conteudo, tactical_breakdown, fight_prediction,
        fighter1_info, fighter2_info,
        evento_nome, evento_data, evento_local,
        categoria_peso, num_rounds, is_titulo, broadcast,
        fights_analysis, card_overview, analysis_type,
        status
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6,
        $7, $8, $9,
        $10, $11,
        $12, $13, $14,
        $15, $16, $17, $18,
        $19, $20, $21,
        'publicado'
      ) RETURNING id
    `, [
      evento.id,
      slug,
      fullCardResult.titulo || `${evento.nome} - Preview Completo`,
      fullCardResult.subtitulo || `Análise completa do card principal`,
      (mainFight.lutador1 as Record<string, unknown>).id,
      (mainFight.lutador2 as Record<string, unknown>).id,
      (fullCardResult.card_overview as Record<string, unknown>).card_summary || '',
      JSON.stringify(mainEventAnalysis.tactical_breakdown),
      JSON.stringify(mainEventAnalysis.fight_prediction),
      JSON.stringify(mainEventAnalysis.fighter1_info),
      JSON.stringify(mainEventAnalysis.fighter2_info),
      evento.nome,
      evento.data_evento,
      `${evento.local_evento || ''}, ${evento.cidade || ''}`,
      mainFight.categoria_peso,
      mainFight.rounds,
      mainFight.is_titulo,
      evento.onde_assistir,
      JSON.stringify(fullCardResult.fights_analysis),
      JSON.stringify(fullCardResult.card_overview),
      'full_card',
    ]);

    console.log(`[ANALYSIS] Full card analysis saved with id: ${result?.id}`);

    return NextResponse.json({
      success: true,
      analise_id: result?.id,
      slug,
      titulo: fullCardResult.titulo,
      evento: evento.nome,
      analysis_type: 'full_card',
      total_fights: fightsData.length,
    });

  } catch (error) {
    console.error('[ANALYSIS] Error generating analysis:', error);
    return NextResponse.json(
      { error: 'Failed to generate analysis', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
