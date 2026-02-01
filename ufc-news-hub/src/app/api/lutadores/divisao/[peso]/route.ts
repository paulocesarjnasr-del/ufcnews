import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { LutadorExpandido } from '@/types';

interface Params {
  params: Promise<{ peso: string }>;
}

const CATEGORIAS_PESO: Record<string, string[]> = {
  'strawweight': ['Strawweight', 'Peso Palha', '115'],
  'flyweight': ['Flyweight', 'Peso Mosca', '125'],
  'bantamweight': ['Bantamweight', 'Peso Galo', '135'],
  'featherweight': ['Featherweight', 'Peso Pena', '145'],
  'lightweight': ['Lightweight', 'Peso Leve', '155'],
  'welterweight': ['Welterweight', 'Peso Meio-Médio', '170'],
  'middleweight': ['Middleweight', 'Peso Médio', '185'],
  'light-heavyweight': ['Light Heavyweight', 'Peso Meio-Pesado', '205'],
  'heavyweight': ['Heavyweight', 'Peso Pesado', '265'],
  'womens-strawweight': ["Women's Strawweight", 'Peso Palha Feminino'],
  'womens-flyweight': ["Women's Flyweight", 'Peso Mosca Feminino'],
  'womens-bantamweight': ["Women's Bantamweight", 'Peso Galo Feminino'],
  'womens-featherweight': ["Women's Featherweight", 'Peso Pena Feminino'],
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { peso } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Encontrar variações do nome da categoria
    const pesoLower = peso.toLowerCase();
    const variacoes = CATEGORIAS_PESO[pesoLower] || [peso];

    // Construir condição WHERE com todas as variações
    const conditions = variacoes.map((_, i) => `categoria_peso ILIKE $${i + 1}`).join(' OR ');
    const values = variacoes.map(v => `%${v}%`);

    const lutadores = await query<LutadorExpandido>(
      `SELECT *
      FROM lutadores
      WHERE ${conditions}
      ORDER BY
        CASE WHEN ranking_divisao IS NOT NULL THEN ranking_divisao ELSE 999 END ASC,
        (COALESCE(vitorias, 0) - COALESCE(derrotas, 0)) DESC,
        nome ASC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset]
    );

    const totalResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count
      FROM lutadores
      WHERE ${conditions}`,
      values
    );

    // Buscar campeão da divisão (ranking = 0 ou 1)
    const campeao = lutadores.find(l => l.ranking_divisao === 0 || l.ranking_divisao === 1);

    return NextResponse.json({
      divisao: peso,
      lutadores,
      campeao: campeao || null,
      total: parseInt(totalResult[0]?.count || '0'),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar lutadores da divisão:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar lutadores da divisão' },
      { status: 500 }
    );
  }
}
