import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { RankingPrevisor, PrevisaoComDetalhes, Lutador } from '@/types';

interface Params {
  params: Promise<{ fingerprint: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { fingerprint } = await params;

    // Buscar dados do previsor
    const previsor = await queryOne<RankingPrevisor & { posicao: number }>(
      `SELECT
        rp.*,
        (SELECT COUNT(*) + 1
         FROM ranking_previsores
         WHERE pontos_total > rp.pontos_total)::integer as posicao
      FROM ranking_previsores rp
      WHERE rp.usuario_fingerprint = $1`,
      [fingerprint]
    );

    if (!previsor) {
      return NextResponse.json(
        { error: 'Previsor não encontrado' },
        { status: 404 }
      );
    }

    // Buscar previsões recentes
    const previsoes = await query<PrevisaoComDetalhes & {
      lutador_nome: string;
      lutador_apelido: string;
      lutador_imagem: string;
      evento_nome: string;
      evento_data: string;
      oponente_nome: string;
    }>(
      `SELECT
        p.*,
        lut.nome as lutador_nome,
        lut.apelido as lutador_apelido,
        lut.imagem_url as lutador_imagem,
        e.nome as evento_nome,
        e.data_evento as evento_data,
        CASE
          WHEN p.lutador_escolhido_id = l.lutador1_id THEN l2.nome
          ELSE l1.nome
        END as oponente_nome
      FROM previsoes p
      JOIN lutas l ON l.id = p.luta_id
      JOIN eventos e ON e.id = l.evento_id
      JOIN lutadores lut ON lut.id = p.lutador_escolhido_id
      JOIN lutadores l1 ON l1.id = l.lutador1_id
      JOIN lutadores l2 ON l2.id = l.lutador2_id
      WHERE p.usuario_fingerprint = $1
      ORDER BY p.created_at DESC
      LIMIT 20`,
      [fingerprint]
    );

    // Histórico por evento
    const historicoEventos = await query<{
      evento_id: string;
      evento_nome: string;
      total_previsoes: number;
      acertos: number;
      pontos: number;
    }>(
      `SELECT
        e.id as evento_id,
        e.nome as evento_nome,
        COUNT(*)::integer as total_previsoes,
        COUNT(CASE WHEN p.acertou_vencedor THEN 1 END)::integer as acertos,
        SUM(COALESCE(p.pontos_ganhos, 0))::integer as pontos
      FROM previsoes p
      JOIN lutas l ON l.id = p.luta_id
      JOIN eventos e ON e.id = l.evento_id
      WHERE p.usuario_fingerprint = $1
      GROUP BY e.id, e.nome
      ORDER BY MAX(p.created_at) DESC
      LIMIT 10`,
      [fingerprint]
    );

    // Formatar previsões
    const previsoesFormatadas = previsoes.map(p => ({
      ...p,
      lutador_escolhido: {
        id: p.lutador_escolhido_id,
        nome: p.lutador_nome,
        apelido: p.lutador_apelido,
        imagem_url: p.lutador_imagem,
      } as Lutador,
      evento: {
        nome: p.evento_nome,
        data: p.evento_data,
      },
      oponente: p.oponente_nome,
    }));

    return NextResponse.json({
      ...previsor,
      previsoes_recentes: previsoesFormatadas,
      historico_eventos: historicoEventos,
    });
  } catch (error) {
    console.error('Erro ao buscar perfil do previsor:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar perfil do previsor' },
      { status: 500 }
    );
  }
}
