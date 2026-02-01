import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { Liga } from '@/types/arena';

interface RouteParams {
  params: Promise<{ ligaId: string }>;
}

// POST - Enviar convite para um usuario
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se o usuario atual e membro/admin da liga
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro) {
      return NextResponse.json(
        { error: 'Você não é membro desta liga' },
        { status: 403 }
      );
    }

    // Buscar a liga
    const liga = await queryOne<Liga>(
      `SELECT * FROM ligas WHERE id = $1 AND status = 'ativa'`,
      [ligaId]
    );

    if (!liga) {
      return NextResponse.json(
        { error: 'Liga não encontrada' },
        { status: 404 }
      );
    }

    // Buscar o usuario alvo
    const usuarioAlvo = await queryOne<{ id: string; username: string; display_name: string | null }>(
      `SELECT id, username, display_name FROM usuarios_arena WHERE LOWER(username) = LOWER($1)`,
      [username.trim()]
    );

    if (!usuarioAlvo) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se o usuario alvo ja e membro
    const jaEMembro = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuarioAlvo.id]
    );

    if (jaEMembro) {
      return NextResponse.json(
        { error: 'Este usuário já é membro da liga' },
        { status: 400 }
      );
    }

    // Verificar se ja existe um convite pendente
    const conviteExistente = await queryOne<{ id: string }>(
      `SELECT id FROM notificacoes
       WHERE usuario_id = $1
       AND tipo = 'convite_liga'
       AND dados->>'liga_id' = $2
       AND lida = false`,
      [usuarioAlvo.id, ligaId]
    );

    if (conviteExistente) {
      return NextResponse.json(
        { error: 'Já existe um convite pendente para este usuário' },
        { status: 400 }
      );
    }

    // Criar notificacao de convite
    await query(
      `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
       VALUES ($1, 'convite_liga', $2, $3, $4)`,
      [
        usuarioAlvo.id,
        `Convite para liga "${liga.nome}"`,
        `${usuario.display_name || usuario.username} te convidou para entrar na liga "${liga.nome}"`,
        JSON.stringify({
          liga_id: liga.id,
          liga_nome: liga.nome,
          codigo_convite: liga.codigo_convite,
          convidado_por: usuario.id,
          convidado_por_nome: usuario.display_name || usuario.username,
        }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: `Convite enviado para ${usuarioAlvo.display_name || usuarioAlvo.username}`,
    });
  } catch (error) {
    console.error('Erro ao enviar convite:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// GET - Buscar usuarios para convidar
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();
    const { searchParams } = new URL(request.url);
    const busca = searchParams.get('q');

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    if (!busca || busca.length < 2) {
      return NextResponse.json({ usuarios: [] });
    }

    // Verificar se o usuario atual e membro da liga
    const membro = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro) {
      return NextResponse.json(
        { error: 'Você não é membro desta liga' },
        { status: 403 }
      );
    }

    // Buscar usuarios que NAO sao membros da liga
    const usuarios = await query<{
      id: string;
      username: string;
      display_name: string | null;
      avatar_url: string | null;
      nivel: string;
    }>(
      `SELECT u.id, u.username, u.display_name, u.avatar_url, u.nivel
       FROM usuarios_arena u
       WHERE (LOWER(u.username) LIKE LOWER($1) OR LOWER(u.display_name) LIKE LOWER($1))
       AND u.id NOT IN (
         SELECT usuario_id FROM liga_membros WHERE liga_id = $2
       )
       ORDER BY u.username
       LIMIT 10`,
      [`%${busca}%`, ligaId]
    );

    return NextResponse.json({ usuarios });
  } catch (error) {
    console.error('Erro ao buscar usuarios:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
