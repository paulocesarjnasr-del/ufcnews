import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface RouteParams {
  params: Promise<{ eventoId: string }>;
}

// GET - Buscar todas as previsões de um evento (card de previsões)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventoId } = await params;
    const usuario = await getUsuarioAtual();

    // Buscar lutas do evento
    const lutas = await query<{
      id: string;
      ordem: number;
      tipo: string;
      categoria_peso: string;
      is_titulo: boolean;
      rounds: number;
      lutador1_id: string;
      lutador1_nome: string;
      lutador1_foto: string | null;
      lutador1_pais: string | null;
      lutador1_record: string;
      lutador2_id: string;
      lutador2_nome: string;
      lutador2_foto: string | null;
      lutador2_pais: string | null;
      lutador2_record: string;
      status: string;
      vencedor_id: string | null;
      metodo: string | null;
    }>(
      `SELECT
        l.id, l.ordem, l.tipo, l.categoria_peso, l.is_titulo, l.rounds,
        l.lutador1_id,
        COALESCE(l.lutador1_nome_display, lut1.nome) as lutador1_nome,
        lut1.imagem_url as lutador1_foto,
        lut1.pais as lutador1_pais,
        CONCAT(lut1.vitorias, '-', lut1.derrotas, '-', lut1.empates) as lutador1_record,
        l.lutador2_id,
        COALESCE(l.lutador2_nome_display, lut2.nome) as lutador2_nome,
        lut2.imagem_url as lutador2_foto,
        lut2.pais as lutador2_pais,
        CONCAT(lut2.vitorias, '-', lut2.derrotas, '-', lut2.empates) as lutador2_record,
        l.status, l.vencedor_id, l.metodo
      FROM lutas l
      JOIN lutadores lut1 ON lut1.id = l.lutador1_id
      JOIN lutadores lut2 ON lut2.id = l.lutador2_id
      WHERE l.evento_id = $1
      ORDER BY l.ordem ASC`,
      [eventoId]
    );

    // Buscar previsões do usuário atual (se logado)
    let minhasPrevisoes: Record<string, {
      vencedor_previsto_id: string;
      metodo_previsto: string | null;
      round_previsto: number | null;
      pontos_confianca: number;
      processada: boolean;
      acertou_vencedor: boolean | null;
      pontos_ganhos: number;
    }> = {};

    if (usuario) {
      const previsoes = await query<{
        luta_id: string;
        vencedor_previsto_id: string;
        metodo_previsto: string | null;
        round_previsto: number | null;
        pontos_confianca: number;
        processada: boolean;
        acertou_vencedor: boolean | null;
        pontos_ganhos: number;
      }>(
        `SELECT luta_id, vencedor_previsto_id, metodo_previsto, round_previsto,
                pontos_confianca, processada, acertou_vencedor, pontos_ganhos
         FROM previsoes
         WHERE usuario_id = $1 AND evento_id = $2`,
        [usuario.id, eventoId]
      );

      minhasPrevisoes = previsoes.reduce((acc, p) => {
        acc[p.luta_id] = {
          vencedor_previsto_id: p.vencedor_previsto_id,
          metodo_previsto: p.metodo_previsto,
          round_previsto: p.round_previsto,
          pontos_confianca: p.pontos_confianca,
          processada: p.processada,
          acertou_vencedor: p.acertou_vencedor,
          pontos_ganhos: p.pontos_ganhos,
        };
        return acc;
      }, {} as typeof minhasPrevisoes);
    }

    // Buscar consenso de previsões (% de cada lutador)
    const consenso = await query<{
      luta_id: string;
      lutador_id: string;
      total: number;
      percentual: number;
    }>(
      `SELECT
        luta_id,
        vencedor_previsto_id as lutador_id,
        COUNT(*) as total,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY luta_id), 1) as percentual
      FROM previsoes
      WHERE evento_id = $1
      GROUP BY luta_id, vencedor_previsto_id`,
      [eventoId]
    );

    const consensoPorLuta: Record<string, Record<string, number>> = {};
    for (const c of consenso) {
      if (!consensoPorLuta[c.luta_id]) {
        consensoPorLuta[c.luta_id] = {};
      }
      consensoPorLuta[c.luta_id][c.lutador_id] = c.percentual;
    }

    // Buscar info do evento
    const evento = await query<{
      id: string;
      nome: string;
      data_evento: string;
      local_evento: string;
      cidade: string;
      status: string;
    }>(
      `SELECT id, nome, data_evento, local_evento, cidade, status
       FROM eventos WHERE id = $1`,
      [eventoId]
    );

    // Verificar se ainda dá tempo de fazer previsões
    const eventoData = new Date(evento[0]?.data_evento || '');
    const deadline = new Date(eventoData.getTime() - 60 * 60 * 1000);
    const podePrever = new Date() < deadline;

    return NextResponse.json({
      evento: evento[0],
      lutas,
      minhas_previsoes: minhasPrevisoes,
      consenso: consensoPorLuta,
      pode_prever: podePrever,
      deadline: deadline.toISOString(),
      total_previsores: Math.max(...Object.values(consenso).map(c => c.total), 0),
    });
  } catch (error) {
    console.error('Erro ao buscar previsões do evento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
