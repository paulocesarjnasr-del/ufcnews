import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { CriarLigaRequest, Liga, LigaComDetalhes } from '@/types/arena';

// GET - Listar ligas (públicas ou do usuário)
export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    const { searchParams } = new URL(request.url);

    const tipo = searchParams.get('tipo'); // 'minhas', 'publicas', 'todas'
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereClause = "WHERE l.status = 'ativa'";
    const params: unknown[] = [];
    let paramIndex = 1;

    if (tipo === 'minhas' && usuario) {
      whereClause += ` AND EXISTS (SELECT 1 FROM liga_membros lm WHERE lm.liga_id = l.id AND lm.usuario_id = $${paramIndex++})`;
      params.push(usuario.id);
    } else if (tipo === 'publicas' || !usuario) {
      whereClause += ` AND l.tipo = 'publica'`;
    }

    const ligas = await query<Liga & {
      criador_username: string;
      criador_avatar: string | null;
      campeao_username: string | null;
      campeao_avatar: string | null;
      minha_posicao?: number;
    }>(
      `SELECT
        l.*,
        u.username as criador_username,
        u.avatar_url as criador_avatar,
        c.username as campeao_username,
        c.avatar_url as campeao_avatar
        ${usuario ? `, lm.posicao_atual as minha_posicao` : ''}
      FROM ligas l
      JOIN usuarios_arena u ON u.id = l.criador_id
      LEFT JOIN usuarios_arena c ON c.id = l.campeao_id
      ${usuario ? `LEFT JOIN liga_membros lm ON lm.liga_id = l.id AND lm.usuario_id = '${usuario.id}'` : ''}
      ${whereClause}
      ORDER BY l.total_membros DESC, l.created_at DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      ligas,
      total: ligas.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar ligas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar nova liga
export async function POST(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body: CriarLigaRequest = await request.json();
    const {
      nome,
      descricao,
      tipo = 'privada',
      max_membros = 0, // 0 = ilimitado
      apenas_main_card = false,
      mostrar_picks_antes = false,
    } = body;

    // Validações
    if (!nome || nome.length < 3 || nome.length > 50) {
      return NextResponse.json(
        { error: 'Nome da liga deve ter entre 3 e 50 caracteres' },
        { status: 400 }
      );
    }

    if (descricao && descricao.length > 200) {
      return NextResponse.json(
        { error: 'Descrição deve ter no máximo 200 caracteres' },
        { status: 400 }
      );
    }

    // Criar liga
    const liga = await queryOne<Liga>(
      `INSERT INTO ligas (
        nome, descricao, criador_id, tipo, max_membros,
        apenas_main_card, mostrar_picks_antes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [nome, descricao || null, usuario.id, tipo, max_membros, apenas_main_card, mostrar_picks_antes]
    );

    if (!liga) {
      return NextResponse.json(
        { error: 'Erro ao criar liga' },
        { status: 500 }
      );
    }

    // Adicionar criador como membro e admin
    await query(
      `INSERT INTO liga_membros (liga_id, usuario_id, is_admin)
       VALUES ($1, $2, true)`,
      [liga.id, usuario.id]
    );

    // Criar primeira temporada
    await query(
      `INSERT INTO liga_temporadas (liga_id, numero_temporada, inicio)
       VALUES ($1, 1, NOW())`,
      [liga.id]
    );

    // Conquista: League Founder
    await query(
      `INSERT INTO conquistas (usuario_id, tipo, detalhes)
       VALUES ($1, 'league_founder', $2)
       ON CONFLICT (usuario_id, tipo) DO NOTHING`,
      [usuario.id, JSON.stringify({ liga_id: liga.id, nome: liga.nome })]
    );

    // Atividade
    await query(
      `INSERT INTO atividades (usuario_id, tipo, titulo, descricao, dados)
       VALUES ($1, 'liga_criada', $2, $3, $4)`,
      [
        usuario.id,
        `Criou a liga "${liga.nome}"`,
        tipo === 'publica' ? 'Liga pública - qualquer um pode entrar!' : 'Liga privada - apenas com convite',
        JSON.stringify({ liga_id: liga.id }),
      ]
    );

    return NextResponse.json({
      success: true,
      liga,
    });
  } catch (error) {
    console.error('Erro ao criar liga:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
