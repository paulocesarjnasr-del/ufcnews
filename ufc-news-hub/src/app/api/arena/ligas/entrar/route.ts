import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { Liga } from '@/types/arena';

// POST - Entrar em uma liga (pública ou com código)
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
    const { liga_id, codigo_convite } = body;

    if (!liga_id && !codigo_convite) {
      return NextResponse.json(
        { error: 'ID da liga ou código de convite é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar liga
    let liga: Liga | null = null;

    if (codigo_convite) {
      liga = await queryOne<Liga>(
        `SELECT * FROM ligas WHERE codigo_convite = $1 AND status = 'ativa'`,
        [codigo_convite.toUpperCase()]
      );

      if (!liga) {
        return NextResponse.json(
          { error: 'Código de convite inválido ou liga não encontrada' },
          { status: 404 }
        );
      }
    } else {
      liga = await queryOne<Liga>(
        `SELECT * FROM ligas WHERE id = $1 AND status = 'ativa'`,
        [liga_id]
      );

      if (!liga) {
        return NextResponse.json(
          { error: 'Liga não encontrada' },
          { status: 404 }
        );
      }

      // Se liga privada sem código, não permitir
      if (liga.tipo === 'privada' && !codigo_convite) {
        return NextResponse.json(
          { error: 'Esta liga requer um código de convite' },
          { status: 403 }
        );
      }
    }

    // Verificar se já é membro
    const jaMembro = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [liga.id, usuario.id]
    );

    if (jaMembro) {
      return NextResponse.json(
        { error: 'Você já é membro desta liga' },
        { status: 400 }
      );
    }

    // Verificar se liga está cheia (max_membros = 0 significa ilimitado)
    if (liga.max_membros > 0 && liga.total_membros >= liga.max_membros) {
      return NextResponse.json(
        { error: 'Esta liga está cheia' },
        { status: 400 }
      );
    }

    // Adicionar membro
    await query(
      `INSERT INTO liga_membros (liga_id, usuario_id)
       VALUES ($1, $2)`,
      [liga.id, usuario.id]
    );

    // Criar notificação para o criador
    await query(
      `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
       VALUES ($1, 'membro_entrou', $2, $3, $4)`,
      [
        liga.criador_id,
        `${usuario.display_name || usuario.username} entrou na liga`,
        `Novo membro na liga "${liga.nome}"`,
        JSON.stringify({ liga_id: liga.id, usuario_id: usuario.id }),
      ]
    );

    // Atividade
    await query(
      `INSERT INTO atividades (usuario_id, tipo, titulo, dados)
       VALUES ($1, 'entrou_liga', $2, $3)`,
      [
        usuario.id,
        `Entrou na liga "${liga.nome}"`,
        JSON.stringify({ liga_id: liga.id }),
      ]
    );

    return NextResponse.json({
      success: true,
      liga: {
        id: liga.id,
        nome: liga.nome,
      },
    });
  } catch (error) {
    console.error('Erro ao entrar na liga:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
