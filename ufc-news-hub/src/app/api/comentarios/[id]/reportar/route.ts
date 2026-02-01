import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Comentario } from '@/types';
import { REPORT_THRESHOLD } from '@/lib/constants';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/comentarios/[id]/reportar
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verificar se o comentário existe
    const comentario = await queryOne<Comentario>(
      `SELECT id, reportado_count, status FROM comentarios WHERE id = $1`,
      [id]
    );

    if (!comentario) {
      return NextResponse.json(
        { error: 'Comentário não encontrado' },
        { status: 404 }
      );
    }

    if (comentario.status !== 'aprovado') {
      return NextResponse.json(
        { error: 'Este comentário já foi removido' },
        { status: 400 }
      );
    }

    // Incrementar contador de reports
    const newCount = comentario.reportado_count + 1;
    const newStatus = newCount >= REPORT_THRESHOLD ? 'rejeitado' : 'aprovado';

    await query(
      `UPDATE comentarios
       SET reportado_count = $1, status = $2, updated_at = NOW()
       WHERE id = $3`,
      [newCount, newStatus, id]
    );

    const wasHidden = newCount >= REPORT_THRESHOLD;

    return NextResponse.json({
      success: true,
      reportado_count: newCount,
      hidden: wasHidden,
      message: wasHidden
        ? 'Comentário ocultado após múltiplas denúncias'
        : 'Denúncia registrada. Obrigado pelo feedback.',
    });
  } catch (error) {
    console.error('Erro ao reportar comentário:', error);
    return NextResponse.json(
      { error: 'Erro ao reportar comentário' },
      { status: 500 }
    );
  }
}
