import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Previsao, Lutador, ConsensoPrevisao } from '@/types';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Buscar previsões e consenso com tratamento de erro para diferentes schemas
    let previsoes: Array<Previsao & {
      lutador_nome: string;
      lutador_apelido: string;
      lutador_imagem: string;
    }> = [];
    let consenso: ConsensoPrevisao[] = [];
    let metodos: Array<{ metodo: string; total: number }> = [];
    let totalPrevisoes = 0;

    try {
      previsoes = await query<Previsao & {
        lutador_nome: string;
        lutador_apelido: string;
        lutador_imagem: string;
      }>(
        `SELECT
          p.*,
          p.vencedor_previsto_id as lutador_escolhido_id,
          lut.nome as lutador_nome,
          lut.apelido as lutador_apelido,
          lut.imagem_url as lutador_imagem
        FROM previsoes p
        JOIN lutadores lut ON lut.id = p.vencedor_previsto_id
        WHERE p.luta_id = $1
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3`,
        [id, limit, offset]
      );

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
        GROUP BY p.luta_id, p.vencedor_previsto_id, lut.nome
        ORDER BY total_votos DESC`,
        [id]
      );

      metodos = await query<{ metodo: string; total: number }>(
        `SELECT
          metodo_previsto as metodo,
          COUNT(*)::integer as total
        FROM previsoes
        WHERE luta_id = $1 AND metodo_previsto IS NOT NULL
        GROUP BY metodo_previsto
        ORDER BY total DESC`,
        [id]
      );

      totalPrevisoes = consenso.reduce((acc, c) => acc + c.total_votos, 0);
    } catch {
      // Ignore errors if previsoes table schema changed
    }

    const previsoesFormatadas = previsoes.map(p => ({
      ...p,
      lutador_escolhido: {
        id: (p as any).lutador_escolhido_id || (p as any).vencedor_previsto_id,
        nome: p.lutador_nome,
        apelido: p.lutador_apelido,
        imagem_url: p.lutador_imagem,
      } as Lutador,
    }));

    return NextResponse.json({
      previsoes: previsoesFormatadas,
      consenso,
      metodos_populares: metodos,
      total: totalPrevisoes,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar previsões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar previsões' },
      { status: 500 }
    );
  }
}
