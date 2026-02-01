import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { AtualizarPerfilRequest, UsuarioArena } from '@/types/arena';

// GET - Retorna perfil do usuário atual
export async function GET() {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    return NextResponse.json({ usuario });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PATCH - Atualiza perfil do usuário atual
export async function PATCH(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body: AtualizarPerfilRequest = await request.json();
    const { display_name, bio, avatar_url, picks_publicos, notificacoes_ativas } = body;

    // Validações
    if (display_name !== undefined && (display_name.length < 2 || display_name.length > 50)) {
      return NextResponse.json(
        { error: 'Nome deve ter entre 2 e 50 caracteres' },
        { status: 400 }
      );
    }

    if (bio !== undefined && bio.length > 200) {
      return NextResponse.json(
        { error: 'Bio deve ter no máximo 200 caracteres' },
        { status: 400 }
      );
    }

    // Construir query de update
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (display_name !== undefined) {
      updates.push(`display_name = $${paramIndex++}`);
      values.push(display_name);
    }
    if (bio !== undefined) {
      updates.push(`bio = $${paramIndex++}`);
      values.push(bio);
    }
    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramIndex++}`);
      values.push(avatar_url);
    }
    if (picks_publicos !== undefined) {
      updates.push(`picks_publicos = $${paramIndex++}`);
      values.push(picks_publicos);
    }
    if (notificacoes_ativas !== undefined) {
      updates.push(`notificacoes_ativas = $${paramIndex++}`);
      values.push(notificacoes_ativas);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum campo para atualizar' },
        { status: 400 }
      );
    }

    values.push(usuario.id);

    const usuarioAtualizado = await queryOne<UsuarioArena>(
      `UPDATE usuarios_arena
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, username, display_name, avatar_url, bio, email,
                 pontos_totais, xp_total, nivel,
                 streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
                 total_previsoes, previsoes_corretas, previsoes_perfeitas,
                 underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
                 total_amigos, total_ligas, titulos_ganhos,
                 picks_publicos, notificacoes_ativas,
                 created_at, last_login_at`,
      values
    );

    return NextResponse.json({
      success: true,
      usuario: usuarioAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
