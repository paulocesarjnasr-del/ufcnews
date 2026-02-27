import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ContadorCategorias } from '@/types';

let cachedContadores: ContadorCategorias | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000;

export async function GET() {
  try {
    const now = Date.now();

    if (cachedContadores && (now - cacheTimestamp) < CACHE_DURATION_MS) {
      return NextResponse.json(cachedContadores, {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
        },
      });
    }

    const result = await query<{
      todas: string;
      lutadores: string;
      lutas: string;
      backstage: string;
    }>(`
      SELECT
        COUNT(*) FILTER (WHERE eh_sobre_ufc = true) as todas,
        COUNT(*) FILTER (WHERE categoria = 'lutadores' AND eh_sobre_ufc = true) as lutadores,
        COUNT(*) FILTER (WHERE categoria = 'lutas' AND eh_sobre_ufc = true) as lutas,
        COUNT(*) FILTER (WHERE categoria = 'backstage' AND eh_sobre_ufc = true) as backstage
      FROM noticias
    `);

    const contadores: ContadorCategorias = {
      todas: parseInt(result[0]?.todas || '0', 10),
      lutadores: parseInt(result[0]?.lutadores || '0', 10),
      lutas: parseInt(result[0]?.lutas || '0', 10),
      backstage: parseInt(result[0]?.backstage || '0', 10),
    };

    cachedContadores = contadores;
    cacheTimestamp = now;

    return NextResponse.json(contadores, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar contadores:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contadores' },
      { status: 500 }
    );
  }
}
