import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { AmigoComDetalhes } from '@/types/arena';

// GET - Listar amigos
export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'aceita'; // 'aceita', 'pendente', 'todas'

    // Amigos aceitos (onde eu enviei ou recebi)
    let amigosQuery = `
      SELECT
        a.id as amizade_id,
        CASE WHEN a.usuario_id = $1 THEN a.amigo_id ELSE a.usuario_id END as amigo_id,
        a.status,
        COALESCE(a.accepted_at, a.created_at) as desde
      FROM amizades a
      WHERE (a.usuario_id = $1 OR a.amigo_id = $1)
    `;

    if (status === 'aceita') {
      amigosQuery += ` AND a.status = 'aceita'`;
    } else if (status === 'pendente') {
      amigosQuery += ` AND a.status = 'pendente'`;
    }

    const amizades = await query<{
      amizade_id: string;
      amigo_id: string;
      status: string;
      desde: string;
    }>(amigosQuery, [usuario.id]);

    // Buscar detalhes dos amigos
    const amigosDetalhados: AmigoComDetalhes[] = [];

    for (const amizade of amizades) {
      const amigo = await queryOne<{
        id: string;
        username: string;
        display_name: string | null;
        avatar_url: string | null;
        nivel: string;
        pontos_totais: number;
        streak_atual: number;
      }>(
        `SELECT id, username, display_name, avatar_url, nivel, pontos_totais, streak_atual
         FROM usuarios_arena WHERE id = $1`,
        [amizade.amigo_id]
      );

      if (amigo) {
        amigosDetalhados.push({
          amizade_id: amizade.amizade_id,
          amigo: {
            id: amigo.id,
            username: amigo.username,
            display_name: amigo.display_name,
            avatar_url: amigo.avatar_url,
            nivel: amigo.nivel as any,
            pontos_totais: amigo.pontos_totais,
            streak_atual: amigo.streak_atual,
          } as any,
          status: amizade.status as any,
          desde: amizade.desde,
        });
      }
    }

    // Separar solicitações pendentes recebidas
    const solicitacoesPendentes = await query<{
      amizade_id: string;
      remetente_id: string;
      remetente_username: string;
      remetente_display_name: string | null;
      remetente_avatar: string | null;
      created_at: string;
    }>(
      `SELECT
        a.id as amizade_id,
        u.id as remetente_id,
        u.username as remetente_username,
        u.display_name as remetente_display_name,
        u.avatar_url as remetente_avatar,
        a.created_at
      FROM amizades a
      JOIN usuarios_arena u ON u.id = a.usuario_id
      WHERE a.amigo_id = $1 AND a.status = 'pendente'
      ORDER BY a.created_at DESC`,
      [usuario.id]
    );

    return NextResponse.json({
      amigos: amigosDetalhados.filter(a => a.status === 'aceita'),
      solicitacoes_pendentes: solicitacoesPendentes,
      total_amigos: amigosDetalhados.filter(a => a.status === 'aceita').length,
    });
  } catch (error) {
    console.error('Erro ao buscar amigos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Enviar solicitação de amizade
export async function POST(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { username, usuario_id } = body;

    if (!username && !usuario_id) {
      return NextResponse.json(
        { error: 'Username ou ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar usuário alvo
    let alvo: { id: string; username: string } | null = null;

    if (usuario_id) {
      alvo = await queryOne<{ id: string; username: string }>(
        `SELECT id, username FROM usuarios_arena WHERE id = $1`,
        [usuario_id]
      );
    } else {
      alvo = await queryOne<{ id: string; username: string }>(
        `SELECT id, username FROM usuarios_arena WHERE LOWER(username) = LOWER($1)`,
        [username]
      );
    }

    if (!alvo) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    if (alvo.id === usuario.id) {
      return NextResponse.json(
        { error: 'Você não pode adicionar a si mesmo' },
        { status: 400 }
      );
    }

    // Verificar se já existe amizade ou solicitação
    const existente = await queryOne<{ id: string; status: string }>(
      `SELECT id, status FROM amizades
       WHERE (usuario_id = $1 AND amigo_id = $2) OR (usuario_id = $2 AND amigo_id = $1)`,
      [usuario.id, alvo.id]
    );

    if (existente) {
      if (existente.status === 'aceita') {
        return NextResponse.json(
          { error: 'Vocês já são amigos' },
          { status: 400 }
        );
      }
      if (existente.status === 'pendente') {
        return NextResponse.json(
          { error: 'Já existe uma solicitação pendente' },
          { status: 400 }
        );
      }
      if (existente.status === 'bloqueada') {
        return NextResponse.json(
          { error: 'Não foi possível enviar a solicitação' },
          { status: 400 }
        );
      }
    }

    // Criar solicitação
    await query(
      `INSERT INTO amizades (usuario_id, amigo_id, status)
       VALUES ($1, $2, 'pendente')`,
      [usuario.id, alvo.id]
    );

    // Notificar
    await query(
      `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
       VALUES ($1, 'solicitacao_amizade', $2, 'Clique para aceitar ou recusar', $3)`,
      [
        alvo.id,
        `${usuario.display_name || usuario.username} quer ser seu amigo`,
        JSON.stringify({ remetente_id: usuario.id }),
      ]
    );

    return NextResponse.json({
      success: true,
      mensagem: 'Solicitação enviada!',
    });
  } catch (error) {
    console.error('Erro ao enviar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
