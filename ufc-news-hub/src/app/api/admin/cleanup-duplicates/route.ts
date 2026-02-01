import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface DuplicateFight {
  evento_id: string;
  lutador1_id: string;
  lutador2_id: string;
  count: string;
}

export async function POST() {
  try {
    // Find duplicate fights (same evento_id, lutador1_id, lutador2_id)
    const duplicates = await query<DuplicateFight>(
      `SELECT evento_id, lutador1_id, lutador2_id, COUNT(*) as count
       FROM lutas
       GROUP BY evento_id, lutador1_id, lutador2_id
       HAVING COUNT(*) > 1`
    );

    // Also find reversed duplicates (fighter1 and fighter2 swapped)
    const reversedDuplicates = await query<DuplicateFight>(
      `SELECT DISTINCT l1.evento_id, l1.lutador1_id, l1.lutador2_id, '2' as count
       FROM lutas l1
       JOIN lutas l2 ON l1.evento_id = l2.evento_id
         AND l1.lutador1_id = l2.lutador2_id
         AND l1.lutador2_id = l2.lutador1_id
         AND l1.id < l2.id`
    );

    let deletedCount = 0;

    // Delete exact duplicates (keep one, delete the rest)
    for (const dup of duplicates) {
      // Get all IDs for this duplicate group
      const fights = await query<{ id: string }>(
        `SELECT id FROM lutas
         WHERE evento_id = $1 AND lutador1_id = $2 AND lutador2_id = $3
         ORDER BY created_at ASC`,
        [dup.evento_id, dup.lutador1_id, dup.lutador2_id]
      );

      // Keep the first one, delete the rest
      if (fights.length > 1) {
        const idsToDelete = fights.slice(1).map(f => f.id);
        await query(
          `DELETE FROM lutas WHERE id = ANY($1::uuid[])`,
          [idsToDelete]
        );
        deletedCount += idsToDelete.length;
      }
    }

    // Delete reversed duplicates (where fighter1 and fighter2 are swapped)
    for (const dup of reversedDuplicates) {
      // Get the reversed fight
      const reversedFight = await query<{ id: string }>(
        `SELECT id FROM lutas
         WHERE evento_id = $1 AND lutador1_id = $2 AND lutador2_id = $3
         LIMIT 1`,
        [dup.evento_id, dup.lutador2_id, dup.lutador1_id]
      );

      if (reversedFight.length > 0) {
        await query(`DELETE FROM lutas WHERE id = $1`, [reversedFight[0].id]);
        deletedCount++;
      }
    }

    // Try to add the records_atualizados column if it doesn't exist
    try {
      await query(`ALTER TABLE lutas ADD COLUMN IF NOT EXISTS records_atualizados BOOLEAN DEFAULT FALSE`);
      await query(`UPDATE lutas SET records_atualizados = TRUE WHERE vencedor_id IS NOT NULL`);
    } catch {
      // Column might already exist or other error, ignore
    }

    return NextResponse.json({
      success: true,
      duplicatesFound: duplicates.length,
      reversedDuplicatesFound: reversedDuplicates.length,
      fightsDeleted: deletedCount,
    });
  } catch (error) {
    console.error('Erro ao limpar duplicatas:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Preview duplicates without deleting
  try {
    const duplicates = await query<{ evento_nome: string; lut1_nome: string; lut2_nome: string; count: string }>(
      `SELECT e.nome as evento_nome, lut1.nome as lut1_nome, lut2.nome as lut2_nome, COUNT(*) as count
       FROM lutas l
       JOIN eventos e ON l.evento_id = e.id
       JOIN lutadores lut1 ON l.lutador1_id = lut1.id
       JOIN lutadores lut2 ON l.lutador2_id = lut2.id
       GROUP BY e.nome, lut1.nome, lut2.nome, l.lutador1_id, l.lutador2_id
       HAVING COUNT(*) > 1`
    );

    return NextResponse.json({
      duplicates,
      message: 'Use POST to clean up these duplicates',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
