import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Noticia, Lutador, NoticiaComLutadores } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar notícia
    const noticia = await queryOne<Noticia>(
      `
      SELECT
        id,
        titulo,
        subtitulo,
        conteudo_completo,
        imagem_url,
        fonte_url,
        fonte_nome,
        categoria,
        publicado_em,
        created_at,
        visualizacoes
      FROM noticias
      WHERE id = $1
    `,
      [id]
    );

    if (!noticia) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    // Incrementar visualizações
    await query(
      `UPDATE noticias SET visualizacoes = visualizacoes + 1 WHERE id = $1`,
      [id]
    );

    // Buscar lutadores mencionados
    const lutadores = await query<Lutador>(
      `
      SELECT
        l.id,
        l.nome,
        l.apelido,
        l.categoria_peso,
        l.imagem_url,
        l.url_perfil
      FROM lutadores l
      JOIN noticia_entidades ne ON l.id = ne.lutador_id
      WHERE ne.noticia_id = $1
      ORDER BY l.nome
    `,
      [id]
    );

    // Buscar notícias relacionadas (mesma categoria, excluindo a atual)
    const relacionadas = await query<Noticia>(
      `
      SELECT
        id,
        titulo,
        subtitulo,
        imagem_url,
        categoria,
        publicado_em
      FROM noticias
      WHERE categoria = $1
        AND id != $2
        AND eh_sobre_ufc = true
      ORDER BY publicado_em DESC
      LIMIT 3
    `,
      [noticia.categoria, id]
    );

    const response: NoticiaComLutadores & { relacionadas: Noticia[] } = {
      ...noticia,
      lutadores,
      relacionadas,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícia' },
      { status: 500 }
    );
  }
}
