import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { LutadorExpandido, LutaComLutadores, Lutador } from '@/types';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const lutador = await queryOne<LutadorExpandido>(
      `SELECT * FROM lutadores WHERE id = $1`,
      [id]
    );

    if (!lutador) {
      return NextResponse.json(
        { error: 'Lutador não encontrado' },
        { status: 404 }
      );
    }

    // Buscar lutas recentes
    const lutas = await query<{
      id: string;
      evento_id: string;
      evento_nome: string;
      evento_data: string;
      lutador1_id: string;
      lutador2_id: string;
      categoria_peso: string;
      vencedor_id: string | null;
      metodo: string | null;
      round_final: number | null;
      tempo_final: string | null;
      status: string;
      oponente_id: string;
      oponente_nome: string;
      oponente_apelido: string;
      oponente_imagem: string;
      is_titulo: boolean;
    }>(
      `SELECT
        l.id,
        l.evento_id,
        e.nome as evento_nome,
        e.data_evento as evento_data,
        l.lutador1_id,
        l.lutador2_id,
        l.categoria_peso,
        l.vencedor_id,
        l.metodo,
        l.round_final,
        l.tempo_final,
        l.status,
        l.is_titulo,
        CASE
          WHEN l.lutador1_id = $1 THEN l.lutador2_id
          ELSE l.lutador1_id
        END as oponente_id,
        CASE
          WHEN l.lutador1_id = $1 THEN l2.nome
          ELSE l1.nome
        END as oponente_nome,
        CASE
          WHEN l.lutador1_id = $1 THEN l2.apelido
          ELSE l1.apelido
        END as oponente_apelido,
        CASE
          WHEN l.lutador1_id = $1 THEN l2.imagem_url
          ELSE l1.imagem_url
        END as oponente_imagem
      FROM lutas l
      JOIN eventos e ON e.id = l.evento_id
      JOIN lutadores l1 ON l1.id = l.lutador1_id
      JOIN lutadores l2 ON l2.id = l.lutador2_id
      WHERE l.lutador1_id = $1 OR l.lutador2_id = $1
      ORDER BY e.data_evento DESC
      LIMIT 10`,
      [id]
    );

    // Formatar lutas com resultado para o lutador
    const lutasFormatadas = lutas.map(luta => {
      let resultado = 'Agendada';
      if (luta.status === 'finalizada') {
        if (luta.vencedor_id === id) {
          resultado = 'Vitória';
        } else if (luta.vencedor_id) {
          resultado = 'Derrota';
        } else {
          resultado = 'Sem resultado';
        }
      }

      return {
        id: luta.id,
        evento: {
          id: luta.evento_id,
          nome: luta.evento_nome,
          data: luta.evento_data,
        },
        oponente: {
          id: luta.oponente_id,
          nome: luta.oponente_nome,
          apelido: luta.oponente_apelido,
          imagem_url: luta.oponente_imagem,
        },
        categoria_peso: luta.categoria_peso,
        resultado,
        metodo: luta.metodo,
        round: luta.round_final,
        tempo: luta.tempo_final,
        status: luta.status,
        is_titulo: luta.is_titulo,
      };
    });

    // Calcular record
    const record = `${lutador.vitorias || 0}-${lutador.derrotas || 0}-${lutador.empates || 0}`;

    return NextResponse.json({
      ...lutador,
      record,
      lutas_recentes: lutasFormatadas,
    });
  } catch (error) {
    console.error('Erro ao buscar lutador:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar lutador' },
      { status: 500 }
    );
  }
}
