import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

interface LutadorInfo {
  id: string;
  nome: string;
  apelido: string | null;
  imagem_url: string | null;
  pais: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
  ranking_divisao: number | null;
}

interface LutaCard {
  id: string;
  ordem: number;
  tipo: string;
  categoria_peso: string;
  rounds: number;
  is_titulo: boolean;
  status: string;
  lutador1: LutadorInfo;
  lutador2: LutadorInfo;
  vencedor_id: string | null;
  metodo: string | null;
  round_final: number | null;
  tempo_final: string | null;
  consenso: Array<{
    lutador_id: string;
    lutador_nome: string;
    total_votos: number;
    percentual: number;
  }>;
  total_previsoes: number;
}

interface EventoCard {
  evento: {
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
    onde_assistir: string | null;
  };
  main_card: LutaCard[];
  prelims: LutaCard[];
  early_prelims: LutaCard[];
  horarios: {
    main_card: string | null;
    prelims: string | null;
    early_prelims: string | null;
  };
  total_lutas: number;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Buscar evento
    const evento = await queryOne<{
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
      onde_assistir: string | null;
      horario_main_card: string | null;
      horario_prelims: string | null;
      horario_early_prelims: string | null;
    }>(
      `SELECT
        id, nome, slug, data_evento, local_evento, cidade, pais, tipo, status,
        imagem_url, poster_url, onde_assistir, horario_main_card, horario_prelims, horario_early_prelims
      FROM eventos
      WHERE id = $1`,
      [id]
    );

    if (!evento) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
    }

    // Buscar todas as lutas do evento com lutadores
    const lutas = await query<{
      id: string;
      ordem: number;
      tipo: string;
      categoria_peso: string;
      rounds: number;
      is_titulo: boolean;
      status: string;
      vencedor_id: string | null;
      metodo: string | null;
      round_final: number | null;
      tempo_final: string | null;
      lutador1: string;
      lutador2: string;
    }>(
      `SELECT
        l.id, l.ordem, l.tipo, l.categoria_peso, l.rounds, l.is_titulo, l.status,
        l.vencedor_id, l.metodo, l.round_final, l.tempo_final,
        json_build_object(
          'id', l1.id,
          'nome', l1.nome,
          'apelido', l1.apelido,
          'imagem_url', l1.imagem_url,
          'pais', l1.pais,
          'vitorias', COALESCE(l1.vitorias, 0),
          'derrotas', COALESCE(l1.derrotas, 0),
          'empates', COALESCE(l1.empates, 0),
          'ranking_divisao', l1.ranking_divisao
        ) as lutador1,
        json_build_object(
          'id', l2.id,
          'nome', l2.nome,
          'apelido', l2.apelido,
          'imagem_url', l2.imagem_url,
          'pais', l2.pais,
          'vitorias', COALESCE(l2.vitorias, 0),
          'derrotas', COALESCE(l2.derrotas, 0),
          'empates', COALESCE(l2.empates, 0),
          'ranking_divisao', l2.ranking_divisao
        ) as lutador2
      FROM lutas l
      JOIN lutadores l1 ON l1.id = l.lutador1_id
      JOIN lutadores l2 ON l2.id = l.lutador2_id
      WHERE l.evento_id = $1
      ORDER BY l.ordem ASC`,
      [id]
    );

    // Buscar consenso de previsões para cada luta
    const lutasComConsenso: LutaCard[] = await Promise.all(
      lutas.map(async (luta) => {
        let consenso: Array<{
          vencedor_previsto_id: string;
          lutador_nome: string;
          total_votos: string;
          percentual: string;
        }> = [];

        try {
          consenso = await query<{
            vencedor_previsto_id: string;
            lutador_nome: string;
            total_votos: string;
            percentual: string;
          }>(
            `SELECT
              p.vencedor_previsto_id,
              lut.nome as lutador_nome,
              COUNT(*) as total_votos,
              ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0), 1) as percentual
            FROM previsoes p
            JOIN lutadores lut ON lut.id = p.vencedor_previsto_id
            WHERE p.luta_id = $1
            GROUP BY p.vencedor_previsto_id, lut.nome
            ORDER BY total_votos DESC`,
            [luta.id]
          );
        } catch {
          // Ignore consensus errors if previsoes table schema changed
        }

        const totalPrevisoes = consenso.reduce(
          (acc, c) => acc + parseInt(c.total_votos),
          0
        );

        return {
          ...luta,
          lutador1: typeof luta.lutador1 === 'string' ? JSON.parse(luta.lutador1) : luta.lutador1,
          lutador2: typeof luta.lutador2 === 'string' ? JSON.parse(luta.lutador2) : luta.lutador2,
          consenso: consenso.map((c) => ({
            lutador_id: c.vencedor_previsto_id,
            lutador_nome: c.lutador_nome,
            total_votos: parseInt(c.total_votos),
            percentual: parseFloat(c.percentual),
          })),
          total_previsoes: totalPrevisoes,
        };
      })
    );

    // Separar por tipo de card
    const mainCard = lutasComConsenso.filter(
      (l) => l.tipo === 'main_event' || l.tipo === 'co_main' || l.tipo === 'card_principal'
    );
    const prelims = lutasComConsenso.filter((l) => l.tipo === 'preliminar');
    const earlyPrelims = lutasComConsenso.filter((l) => l.tipo === 'early_prelim');

    // Formatar horários para BRT
    const formatToBRT = (isoString: string | null): string | null => {
      if (!isoString) return null;
      try {
        const date = new Date(isoString);
        return date.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' BRT';
      } catch {
        return null;
      }
    };

    const response: EventoCard = {
      evento: {
        id: evento.id,
        nome: evento.nome,
        slug: evento.slug,
        data_evento: evento.data_evento,
        local_evento: evento.local_evento,
        cidade: evento.cidade,
        pais: evento.pais,
        tipo: evento.tipo,
        status: evento.status,
        imagem_url: evento.imagem_url,
        poster_url: evento.poster_url,
        onde_assistir: evento.onde_assistir,
      },
      main_card: mainCard,
      prelims: prelims,
      early_prelims: earlyPrelims,
      horarios: {
        main_card: formatToBRT(evento.horario_main_card),
        prelims: formatToBRT(evento.horario_prelims),
        early_prelims: formatToBRT(evento.horario_early_prelims),
      },
      total_lutas: lutasComConsenso.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar fight card:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar fight card' },
      { status: 500 }
    );
  }
}
