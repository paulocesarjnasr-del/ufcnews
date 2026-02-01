import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { LutadorExpandido, LutaComLutadores } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',');

    if (!ids || ids.length !== 2) {
      return NextResponse.json(
        { error: 'Parâmetro ids deve conter exatamente 2 IDs separados por vírgula' },
        { status: 400 }
      );
    }

    const [id1, id2] = ids;

    // Buscar dados dos dois lutadores
    const [lutador1, lutador2] = await Promise.all([
      queryOne<LutadorExpandido>(`SELECT * FROM lutadores WHERE id = $1`, [id1]),
      queryOne<LutadorExpandido>(`SELECT * FROM lutadores WHERE id = $1`, [id2]),
    ]);

    if (!lutador1 || !lutador2) {
      return NextResponse.json(
        { error: 'Um ou mais lutadores não encontrados' },
        { status: 404 }
      );
    }

    // Buscar confrontos diretos
    const confrontos = await query<{
      id: string;
      evento_nome: string;
      evento_data: string;
      vencedor_id: string | null;
      metodo: string | null;
      round_final: number | null;
    }>(
      `SELECT
        l.id,
        e.nome as evento_nome,
        e.data_evento as evento_data,
        l.vencedor_id,
        l.metodo,
        l.round_final
      FROM lutas l
      JOIN eventos e ON e.id = l.evento_id
      WHERE (l.lutador1_id = $1 AND l.lutador2_id = $2)
         OR (l.lutador1_id = $2 AND l.lutador2_id = $1)
      ORDER BY e.data_evento DESC`,
      [id1, id2]
    );

    // Calcular estatísticas de comparação
    const calcularStats = (l: LutadorExpandido) => ({
      record: `${l.vitorias || 0}-${l.derrotas || 0}-${l.empates || 0}`,
      taxa_vitoria: l.vitorias && (l.vitorias + l.derrotas) > 0
        ? Math.round((l.vitorias / (l.vitorias + l.derrotas)) * 100)
        : 0,
      taxa_finalizacao: l.vitorias && l.vitorias > 0
        ? Math.round(((l.nocautes || 0) + (l.finalizacoes || 0)) / l.vitorias * 100)
        : 0,
    });

    const stats1 = calcularStats(lutador1);
    const stats2 = calcularStats(lutador2);

    return NextResponse.json({
      lutador1: {
        ...lutador1,
        stats: stats1,
      },
      lutador2: {
        ...lutador2,
        stats: stats2,
      },
      confrontos_diretos: confrontos,
      total_confrontos: confrontos.length,
      comparacao: {
        mesma_categoria: lutador1.categoria_peso === lutador2.categoria_peso,
        mesmo_pais: lutador1.pais === lutador2.pais,
        diferenca_idade: lutador1.idade && lutador2.idade
          ? Math.abs(lutador1.idade - lutador2.idade)
          : null,
      },
    });
  } catch (error) {
    console.error('Erro ao comparar lutadores:', error);
    return NextResponse.json(
      { error: 'Erro ao comparar lutadores' },
      { status: 500 }
    );
  }
}
