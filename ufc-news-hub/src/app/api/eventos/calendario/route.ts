import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface EventoResumo {
  id: string;
  nome: string;
  slug: string;
  data_evento: string;
  local_evento: string;
  cidade: string;
  pais: string;
  tipo: string;
  status: string;
  imagem_url: string | null;
  poster_url: string | null;
  total_lutas: number;
}

interface MesEventos {
  ano: number;
  mes: number;
  nome_mes: string;
  eventos: EventoResumo[];
}

// Nomes dos meses em português
const nomesMeses = [
  '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

async function buscarEventosPorStatus(statusFiltro: 'agendado' | 'finalizado', ordem: 'ASC' | 'DESC'): Promise<MesEventos[]> {
  const result = await query<{
    ano: number;
    mes: number;
    eventos: string;
  }>(
    `SELECT
      EXTRACT(YEAR FROM e.data_evento)::int as ano,
      EXTRACT(MONTH FROM e.data_evento)::int as mes,
      json_agg(
        json_build_object(
          'id', e.id,
          'nome', e.nome,
          'slug', e.slug,
          'data_evento', e.data_evento,
          'local_evento', e.local_evento,
          'cidade', e.cidade,
          'pais', e.pais,
          'tipo', e.tipo,
          'status', e.status,
          'imagem_url', e.imagem_url,
          'poster_url', e.poster_url,
          'total_lutas', (SELECT COUNT(*) FROM lutas WHERE evento_id = e.id)
        ) ORDER BY e.data_evento ${ordem}
      ) as eventos
    FROM eventos e
    WHERE e.status = $1
    GROUP BY
      EXTRACT(YEAR FROM e.data_evento),
      EXTRACT(MONTH FROM e.data_evento)
    ORDER BY ano ${ordem}, mes ${ordem}`,
    [statusFiltro]
  );

  return result.map((row) => ({
    ano: row.ano,
    mes: row.mes,
    nome_mes: nomesMeses[row.mes],
    eventos: typeof row.eventos === 'string' ? JSON.parse(row.eventos) : row.eventos,
  }));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo'); // 'futuros', 'passados', ou null para ambos

    // Buscar eventos futuros (agendados) - ordem cronológica ASC
    const eventosFuturos = tipo !== 'passados' ? await buscarEventosPorStatus('agendado', 'ASC') : [];

    // Buscar eventos passados (finalizados) - ordem cronológica DESC (mais recente primeiro)
    const eventosPassados = tipo !== 'futuros' ? await buscarEventosPorStatus('finalizado', 'DESC') : [];

    // Buscar próximo evento para destaque
    const proximoEvento = await query<{
      id: string;
      nome: string;
      slug: string;
      data_evento: string;
      local_evento: string;
      cidade: string;
      pais: string;
      tipo: string;
      status: string;
      imagem_url: string | null;
      poster_url: string | null;
      horario_main_card: string | null;
      horario_prelims: string | null;
      horario_early_prelims: string | null;
      main_event: string | null;
    }>(
      `SELECT
        e.*,
        (
          SELECT json_build_object(
            'id', l.id,
            'categoria_peso', l.categoria_peso,
            'is_titulo', l.is_titulo,
            'rounds', l.rounds,
            'lutador1', json_build_object(
              'id', l1.id,
              'nome', l1.nome,
              'apelido', l1.apelido,
              'imagem_url', l1.imagem_url,
              'pais', l1.pais,
              'vitorias', l1.vitorias,
              'derrotas', l1.derrotas,
              'empates', l1.empates
            ),
            'lutador2', json_build_object(
              'id', l2.id,
              'nome', l2.nome,
              'apelido', l2.apelido,
              'imagem_url', l2.imagem_url,
              'pais', l2.pais,
              'vitorias', l2.vitorias,
              'derrotas', l2.derrotas,
              'empates', l2.empates
            )
          )
          FROM lutas l
          JOIN lutadores l1 ON l1.id = l.lutador1_id
          JOIN lutadores l2 ON l2.id = l.lutador2_id
          WHERE l.evento_id = e.id AND l.tipo = 'main_event'
          LIMIT 1
        ) as main_event
      FROM eventos e
      WHERE e.status = 'agendado' AND e.data_evento > NOW()
      ORDER BY e.data_evento ASC
      LIMIT 1`
    );

    // Calcular totais
    const totalFuturos = eventosFuturos.reduce((acc, m) => acc + m.eventos.length, 0);
    const totalPassados = eventosPassados.reduce((acc, m) => acc + m.eventos.length, 0);

    return NextResponse.json({
      proximo_evento: proximoEvento[0]
        ? {
            ...proximoEvento[0],
            main_event:
              typeof proximoEvento[0].main_event === 'string'
                ? JSON.parse(proximoEvento[0].main_event)
                : proximoEvento[0].main_event,
          }
        : null,
      eventos_futuros: eventosFuturos,
      eventos_passados: eventosPassados,
      total_futuros: totalFuturos,
      total_passados: totalPassados,
      total_eventos: totalFuturos + totalPassados,
    });
  } catch (error) {
    console.error('Erro ao buscar calendário:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar calendário de eventos' },
      { status: 500 }
    );
  }
}
