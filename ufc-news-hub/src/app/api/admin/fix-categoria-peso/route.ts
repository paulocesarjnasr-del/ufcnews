import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    // Find all duplicated categoria_peso values
    const duped = await query<{ id: string; categoria_peso: string }>(
      `SELECT id, categoria_peso FROM lutas
       WHERE length(categoria_peso) > 0
         AND length(categoria_peso) % 2 = 0
         AND left(categoria_peso, length(categoria_peso)/2) = right(categoria_peso, length(categoria_peso)/2)`
    );

    return NextResponse.json({
      message: 'Duplicated categoria_peso values found. Use POST to fix.',
      count: duped.length,
      examples: duped.slice(0, 5).map(d => ({
        id: d.id,
        current: d.categoria_peso,
        fixed: d.categoria_peso.substring(0, d.categoria_peso.length / 2),
      })),
    });
  } catch (error) {
    console.error('Error checking categoria_peso:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    // Fix all duplicated categoria_peso values in one query
    const result = await query<{ count: string }>(
      `WITH fixed AS (
        UPDATE lutas
        SET categoria_peso = left(categoria_peso, length(categoria_peso)/2)
        WHERE length(categoria_peso) > 0
          AND length(categoria_peso) % 2 = 0
          AND left(categoria_peso, length(categoria_peso)/2) = right(categoria_peso, length(categoria_peso)/2)
        RETURNING id
      )
      SELECT count(*) as count FROM fixed`
    );

    const fixedCount = parseInt(result[0]?.count || '0');

    return NextResponse.json({
      success: true,
      fixed: fixedCount,
      message: `Fixed ${fixedCount} duplicated categoria_peso values`,
    });
  } catch (error) {
    console.error('Error fixing categoria_peso:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
