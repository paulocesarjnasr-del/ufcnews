import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { generateFullAnalysis, generateSlug } from '@/lib/generate-analysis';

export const maxDuration = 300; // 5 minutes for premium analysis

export async function POST(request: Request) {
  // Auth check (disabled for now — re-enable with CRON_SECRET when in production)
  // const url = new URL(request.url);
  // const secret = url.searchParams.get('secret');
  // if (secret !== process.env.CRON_SECRET) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const body = await request.json();
    const { evento_id, luta_id } = body;

    if (!evento_id) {
      return NextResponse.json({ error: 'evento_id is required' }, { status: 400 });
    }

    // 1. Get the event
    const evento = await queryOne<Record<string, unknown>>(
      `SELECT * FROM eventos WHERE id = $1`, [evento_id]
    );

    if (!evento) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // 2. Get the fight (specific or main event)
    let fight;
    if (luta_id) {
      fight = await queryOne<Record<string, unknown>>(
        `SELECT * FROM lutas WHERE id = $1`, [luta_id]
      );
    } else {
      fight = await queryOne<Record<string, unknown>>(
        `SELECT * FROM lutas WHERE evento_id = $1 AND tipo = 'main_event' ORDER BY ordem DESC LIMIT 1`,
        [evento_id]
      );
    }

    if (!fight) {
      return NextResponse.json({ error: 'Fight not found' }, { status: 404 });
    }

    // 3. Get fighter details
    const [fighter1, fighter2] = await Promise.all([
      queryOne<Record<string, unknown>>(`SELECT * FROM lutadores WHERE id = $1`, [fight.lutador1_id]),
      queryOne<Record<string, unknown>>(`SELECT * FROM lutadores WHERE id = $1`, [fight.lutador2_id]),
    ]);

    if (!fighter1 || !fighter2) {
      return NextResponse.json({ error: 'Fighter data not found' }, { status: 404 });
    }

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

    const fightData = {
      id: fight.id as string,
      categoria_peso: fight.categoria_peso as string,
      rounds: fight.rounds as number,
      is_titulo: fight.is_titulo as boolean,
      tipo: fight.tipo as string,
      ordem: fight.ordem as number,
      lutador1: fighter1 as never,
      lutador2: fighter2 as never,
    };

    console.log(`[GENERATE-FULL] Starting premium analysis: ${fighter1.nome} vs ${fighter2.nome}`);

    // 4. Generate full analysis
    const fullAnalysis = await generateFullAnalysis(eventData, fightData);

    // 5. Build slug
    const f1Last = (fighter1.nome as string).split(' ').pop()?.toLowerCase() || 'f1';
    const f2Last = (fighter2.nome as string).split(' ').pop()?.toLowerCase() || 'f2';
    const slug = generateSlug(`${evento.nome}-${f1Last}-vs-${f2Last}`);

    // 6. Check if analysis with this slug already exists
    const existing = await queryOne<{ id: string }>(
      `SELECT id FROM analises WHERE slug = $1`, [slug]
    );

    let result;
    if (existing) {
      // Update existing
      result = await queryOne<{ id: string }>(`
        UPDATE analises SET
          full_analysis = $1,
          analysis_type = 'full_single',
          fighter1_info = $2,
          fighter2_info = $3,
          updated_at = NOW()
        WHERE slug = $4
        RETURNING id
      `, [
        JSON.stringify(fullAnalysis),
        JSON.stringify({ nome: fighter1.nome, record: `${fighter1.vitorias}-${fighter1.derrotas}-${fighter1.empates}` }),
        JSON.stringify({ nome: fighter2.nome, record: `${fighter2.vitorias}-${fighter2.derrotas}-${fighter2.empates}` }),
        slug,
      ]);
    } else {
      // Insert new
      result = await queryOne<{ id: string }>(`
        INSERT INTO analises (
          evento_id, slug, titulo, subtitulo,
          lutador1_id, lutador2_id,
          artigo_conteudo, tactical_breakdown, fight_prediction,
          fighter1_info, fighter2_info,
          evento_nome, evento_data, evento_local,
          categoria_peso, num_rounds, is_titulo, broadcast,
          full_analysis, analysis_type,
          status
        ) VALUES (
          $1, $2, $3, $4,
          $5, $6,
          $7, $8, $9,
          $10, $11,
          $12, $13, $14,
          $15, $16, $17, $18,
          $19, 'full_single',
          'publicado'
        ) RETURNING id
      `, [
        evento.id,
        slug,
        `${fighter1.nome} vs ${fighter2.nome}`,
        fullAnalysis.hero.tagline,
        fighter1.id,
        fighter2.id,
        fullAnalysis.narrativa.html_content,
        '{}',
        '{}',
        JSON.stringify({ nome: fighter1.nome, record: `${fighter1.vitorias}-${fighter1.derrotas}-${fighter1.empates}`, ultimasLutas: [] }),
        JSON.stringify({ nome: fighter2.nome, record: `${fighter2.vitorias}-${fighter2.derrotas}-${fighter2.empates}`, ultimasLutas: [] }),
        evento.nome,
        evento.data_evento,
        [evento.local_evento, evento.cidade].filter(Boolean).join(', '),
        fight.categoria_peso,
        fight.rounds,
        fight.is_titulo,
        evento.onde_assistir,
        JSON.stringify(fullAnalysis),
      ]);
    }

    // 7. Save fighter images if found
    if (fullAnalysis.hero.fighter1.imagem_fullbody_url) {
      await queryOne(`UPDATE lutadores SET imagem_fullbody_url = $1 WHERE id = $2`,
        [fullAnalysis.hero.fighter1.imagem_fullbody_url, fighter1.id]);
    }
    if (fullAnalysis.hero.fighter2.imagem_fullbody_url) {
      await queryOne(`UPDATE lutadores SET imagem_fullbody_url = $1 WHERE id = $2`,
        [fullAnalysis.hero.fighter2.imagem_fullbody_url, fighter2.id]);
    }

    console.log(`[GENERATE-FULL] Analysis saved: ${slug} (id: ${result?.id})`);

    return NextResponse.json({
      success: true,
      analise_id: result?.id,
      slug,
      url: `/analise/${slug}`,
      fighter1: fighter1.nome,
      fighter2: fighter2.nome,
      analysis_type: 'full_single',
    });

  } catch (error) {
    console.error('[GENERATE-FULL] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate analysis', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
