import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Luta, ConsensoPrevisao } from '@/types';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const luta = await queryOne<Luta & {
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
      vencedor_nome: string | null;
      evento_nome: string;
      evento_data: string;
    }>(
      `SELECT
        l.*,
        e.nome as evento_nome,
        e.data_evento as evento_data,
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
        COALESCE(l2.empates, 0) as lutador2_empates,
        v.nome as vencedor_nome
      FROM lutas l
      JOIN eventos e ON e.id = l.evento_id
      JOIN lutadores l1 ON l1.id = l.lutador1_id
      JOIN lutadores l2 ON l2.id = l.lutador2_id
      LEFT JOIN lutadores v ON v.id = l.vencedor_id
      WHERE l.id = $1`,
      [id]
    );

    if (!luta) {
      return NextResponse.json(
        { error: 'Luta não encontrada' },
        { status: 404 }
      );
    }

    // Buscar consenso de previsões
    let consenso: ConsensoPrevisao[] = [];
    let totalPrevisoes = 0;

    try {
      consenso = await query<ConsensoPrevisao>(
        `SELECT
          p.luta_id,
          p.vencedor_previsto_id as lutador_escolhido_id,
          lut.nome as lutador_nome,
          COUNT(*)::integer as total_votos,
          ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0), 1)::float as percentual
        FROM previsoes p
        JOIN lutadores lut ON lut.id = p.vencedor_previsto_id
        WHERE p.luta_id = $1
        GROUP BY p.luta_id, p.vencedor_previsto_id, lut.nome`,
        [id]
      );
      totalPrevisoes = consenso.reduce((acc, c) => acc + c.total_votos, 0);
    } catch {
      // Ignore consensus errors if previsoes table schema changed
    }

    return NextResponse.json({
      ...luta,
      evento: {
        nome: luta.evento_nome,
        data: luta.evento_data,
      },
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
      vencedor: luta.vencedor_id ? { id: luta.vencedor_id, nome: luta.vencedor_nome } : null,
      consenso,
      total_previsoes: totalPrevisoes,
    });
  } catch (error) {
    console.error('Erro ao buscar luta:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar luta' },
      { status: 500 }
    );
  }
}
