import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Evento, LutaComLutadores, ConsensoPrevisao } from '@/types';

export async function GET() {
  try {
    const evento = await queryOne<Evento & { total_lutas: number; poster_url: string | null; horario_main_card: string | null }>(
      `SELECT
        e.*,
        e.poster_url,
        e.horario_main_card,
        COUNT(l.id)::integer as total_lutas
      FROM eventos e
      LEFT JOIN lutas l ON l.evento_id = e.id
      WHERE e.status = 'agendado' AND e.data_evento > NOW()
      GROUP BY e.id
      ORDER BY e.data_evento ASC
      LIMIT 1`
    );

    if (!evento) {
      return NextResponse.json(
        { error: 'Nenhum evento agendado encontrado' },
        { status: 404 }
      );
    }

    // Buscar lutas do evento
    const lutas = await query<LutaComLutadores & {
      lutador1_nome: string;
      lutador1_apelido: string;
      lutador1_imagem: string;
      lutador1_categoria: string;
      lutador1_pais: string;
      lutador1_vitorias: number;
      lutador1_derrotas: number;
      lutador1_empates: number;
      lutador2_nome: string;
      lutador2_apelido: string;
      lutador2_imagem: string;
      lutador2_categoria: string;
      lutador2_pais: string;
      lutador2_vitorias: number;
      lutador2_derrotas: number;
      lutador2_empates: number;
    }>(
      `SELECT
        l.*,
        l1.nome as lutador1_nome,
        l1.apelido as lutador1_apelido,
        l1.imagem_url as lutador1_imagem,
        l1.categoria_peso as lutador1_categoria,
        l1.pais as lutador1_pais,
        COALESCE(l1.vitorias, 0) as lutador1_vitorias,
        COALESCE(l1.derrotas, 0) as lutador1_derrotas,
        COALESCE(l1.empates, 0) as lutador1_empates,
        l2.nome as lutador2_nome,
        l2.apelido as lutador2_apelido,
        l2.imagem_url as lutador2_imagem,
        l2.categoria_peso as lutador2_categoria,
        l2.pais as lutador2_pais,
        COALESCE(l2.vitorias, 0) as lutador2_vitorias,
        COALESCE(l2.derrotas, 0) as lutador2_derrotas,
        COALESCE(l2.empates, 0) as lutador2_empates
      FROM lutas l
      JOIN lutadores l1 ON l1.id = l.lutador1_id
      JOIN lutadores l2 ON l2.id = l.lutador2_id
      WHERE l.evento_id = $1
      ORDER BY l.ordem DESC`,
      [evento.id]
    );

    // Buscar consenso
    const lutaIds = lutas.map(l => l.id);
    let consensoMap: Record<string, ConsensoPrevisao[]> = {};
    let totalPrevisoesMap: Record<string, number> = {};

    if (lutaIds.length > 0) {
      try {
        const consenso = await query<ConsensoPrevisao>(
          `SELECT
            p.luta_id,
            p.vencedor_previsto_id as lutador_escolhido_id,
            lut.nome as lutador_nome,
            COUNT(*)::integer as total_votos,
            ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (PARTITION BY p.luta_id), 0), 1)::float as percentual
          FROM previsoes p
          JOIN lutadores lut ON lut.id = p.vencedor_previsto_id
          WHERE p.luta_id = ANY($1)
          GROUP BY p.luta_id, p.vencedor_previsto_id, lut.nome`,
          [lutaIds]
        );

        consenso.forEach(c => {
          if (!consensoMap[c.luta_id]) {
            consensoMap[c.luta_id] = [];
          }
          consensoMap[c.luta_id].push(c);
          totalPrevisoesMap[c.luta_id] = (totalPrevisoesMap[c.luta_id] || 0) + c.total_votos;
        });
      } catch {
        // Ignore consensus errors if table schema changed
      }
    }

    const lutasFormatadas = lutas.map(luta => ({
      ...luta,
      lutador1: {
        id: luta.lutador1_id,
        nome: luta.lutador1_nome,
        apelido: luta.lutador1_apelido,
        imagem_url: luta.lutador1_imagem,
        categoria_peso: luta.lutador1_categoria,
        pais: luta.lutador1_pais,
        vitorias: luta.lutador1_vitorias,
        derrotas: luta.lutador1_derrotas,
        empates: luta.lutador1_empates,
      },
      lutador2: {
        id: luta.lutador2_id,
        nome: luta.lutador2_nome,
        apelido: luta.lutador2_apelido,
        imagem_url: luta.lutador2_imagem,
        categoria_peso: luta.lutador2_categoria,
        pais: luta.lutador2_pais,
        vitorias: luta.lutador2_vitorias,
        derrotas: luta.lutador2_derrotas,
        empates: luta.lutador2_empates,
      },
      consenso: consensoMap[luta.id] || [],
      total_previsoes: totalPrevisoesMap[luta.id] || 0,
    }));

    return NextResponse.json({
      ...evento,
      lutas: lutasFormatadas,
    });
  } catch (error) {
    console.error('Erro ao buscar próximo evento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar próximo evento' },
      { status: 500 }
    );
  }
}
