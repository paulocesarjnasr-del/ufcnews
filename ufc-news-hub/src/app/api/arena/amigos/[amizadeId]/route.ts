import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface RouteParams {
  params: Promise<{ amizadeId: string }>;
}

// PATCH - Aceitar ou recusar solicitação de amizade
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { amizadeId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { acao } = body; // 'aceitar' ou 'recusar'

    if (!acao || !['aceitar', 'recusar'].includes(acao)) {
      return NextResponse.json(
        { error: 'Ação inválida. Use "aceitar" ou "recusar"' },
        { status: 400 }
      );
    }

    // Buscar amizade
    const amizade = await queryOne<{
      id: string;
      usuario_id: string;
      amigo_id: string;
      status: string;
    }>(
      `SELECT * FROM amizades WHERE id = $1`,
      [amizadeId]
    );

    if (!amizade) {
      return NextResponse.json(
        { error: 'Solicitação não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se é o destinatário (amigo_id)
    if (amizade.amigo_id !== usuario.id) {
      return NextResponse.json(
        { error: 'Apenas o destinatário pode responder a solicitação' },
        { status: 403 }
      );
    }

    if (amizade.status !== 'pendente') {
      return NextResponse.json(
        { error: 'Esta solicitação já foi respondida' },
        { status: 400 }
      );
    }

    if (acao === 'aceitar') {
      await query(
        `UPDATE amizades SET status = 'aceita', accepted_at = NOW() WHERE id = $1`,
        [amizadeId]
      );

      // Notificar remetente
      await query(
        `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
         VALUES ($1, 'amizade_aceita', $2, 'Vocês agora são amigos!', $3)`,
        [
          amizade.usuario_id,
          `${usuario.display_name || usuario.username} aceitou sua solicitação`,
          JSON.stringify({ amigo_id: usuario.id }),
        ]
      );

      return NextResponse.json({
        success: true,
        status: 'aceita',
      });
    } else {
      // Recusar - deletar a solicitação
      await query(`DELETE FROM amizades WHERE id = $1`, [amizadeId]);

      return NextResponse.json({
        success: true,
        status: 'recusada',
      });
    }
  } catch (error) {
    console.error('Erro ao responder solicitação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Remover amigo
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { amizadeId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar se a amizade existe e o usuário faz parte
    const amizade = await queryOne<{ id: string; usuario_id: string; amigo_id: string }>(
      `SELECT * FROM amizades WHERE id = $1 AND (usuario_id = $2 OR amigo_id = $2)`,
      [amizadeId, usuario.id]
    );

    if (!amizade) {
      return NextResponse.json(
        { error: 'Amizade não encontrada' },
        { status: 404 }
      );
    }

    await query(`DELETE FROM amizades WHERE id = $1`, [amizadeId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover amigo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
