import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query } from '@/lib/db';

// ═══════════════════════════════════════════════════════════
// GET: Pipeline status for current event
// ═══════════════════════════════════════════════════════════

interface PipelineStep {
  id: string;
  nome: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  detalhes: string;
}

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    // Get next upcoming event
    const evento = await query<{
      id: string;
      nome: string;
      data_evento: string;
      status: string;
    }>(
      `SELECT id, nome, data_evento, status FROM eventos
       WHERE data_evento >= NOW() - INTERVAL '2 days'
       ORDER BY data_evento ASC LIMIT 1`
    ).catch(() => []);

    if (!evento[0]) {
      return NextResponse.json({
        evento: null,
        steps: [],
        message: 'Nenhum evento proximo encontrado',
      });
    }

    const ev = evento[0];

    // Check how many analyses exist for this event
    const [mainCardAnalyses, prelimAnalyses, lutasCount] = await Promise.all([
      query<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM analises
         WHERE evento_nome ILIKE $1 AND analysis_type = 'single_fight'`,
        [`%${ev.nome.split(':')[0].trim()}%`]
      ).catch(() => [{ count: '0' }]),
      query<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM analises
         WHERE evento_nome ILIKE $1 AND analysis_type = 'prelims'`,
        [`%${ev.nome.split(':')[0].trim()}%`]
      ).catch(() => [{ count: '0' }]),
      query<{ total: string; main: string; prelim: string }>(
        `SELECT
          COUNT(*)::text AS total,
          COUNT(*) FILTER (WHERE tipo IN ('main_event', 'co_main', 'card_principal'))::text AS main,
          COUNT(*) FILTER (WHERE tipo IN ('preliminar', 'early_prelim'))::text AS prelim
         FROM lutas WHERE evento_id = $1 AND status != 'cancelada'`,
        [ev.id]
      ).catch(() => [{ total: '0', main: '0', prelim: '0' }]),
    ]);

    const mainCount = parseInt(mainCardAnalyses[0]?.count || '0', 10);
    const prelimCount = parseInt(prelimAnalyses[0]?.count || '0', 10);
    const totalLutas = parseInt(lutasCount[0]?.total || '0', 10);
    const mainLutas = parseInt(lutasCount[0]?.main || '0', 10);
    const prelimLutas = parseInt(lutasCount[0]?.prelim || '0', 10);

    // Check for card snapshot (card scraper ran)
    const snapshot = await query<{ id: string }>(
      `SELECT id FROM card_snapshots WHERE evento_nome ILIKE $1 AND is_latest = true LIMIT 1`,
      [`%${ev.nome.split(':')[0].trim()}%`]
    ).catch(() => []);

    const hasSnapshot = snapshot.length > 0;
    const mainDone = mainCount >= mainLutas && mainLutas > 0;
    const prelimDone = prelimCount >= prelimLutas && prelimLutas > 0;

    // Check for event page
    const eventPage = await query<{ id: string }>(
      `SELECT id FROM analises
       WHERE evento_nome ILIKE $1 AND analysis_type = 'full_card' LIMIT 1`,
      [`%${ev.nome.split(':')[0].trim()}%`]
    ).catch(() => []);

    const hasEventPage = eventPage.length > 0;

    const steps: PipelineStep[] = [
      {
        id: 'card-scraper',
        nome: 'Card Scraper',
        status: hasSnapshot ? 'completed' : 'pending',
        detalhes: hasSnapshot
          ? `Card capturado: ${totalLutas} lutas`
          : 'Aguardando scrape do card',
      },
      {
        id: 'fight-analyst-main',
        nome: 'Fight Analyst Main Card',
        status: mainDone ? 'completed' : mainCount > 0 ? 'running' : 'pending',
        detalhes: `${mainCount}/${mainLutas} analises main card`,
      },
      {
        id: 'fight-analyst-prelims',
        nome: 'Fight Analyst Prelims',
        status: prelimDone ? 'completed' : prelimCount > 0 ? 'running' : 'pending',
        detalhes: `${prelimCount}/${prelimLutas} analises prelims`,
      },
      {
        id: 'card-validator',
        nome: 'Card Validator',
        status: mainDone && prelimDone ? 'completed' : 'pending',
        detalhes: mainDone && prelimDone ? 'Validacao completa' : 'Aguardando analises',
      },
      {
        id: 'event-page',
        nome: 'Event Page Generator',
        status: hasEventPage ? 'completed' : 'pending',
        detalhes: hasEventPage ? 'Pagina do evento gerada' : 'Aguardando validacao',
      },
    ];

    return NextResponse.json({
      evento: {
        id: ev.id,
        nome: ev.nome,
        data: ev.data_evento,
        status: ev.status,
      },
      steps,
    });
  } catch (error) {
    console.error('[API /admin/pipeline] GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar status do pipeline' }, { status: 500 });
  }
}
