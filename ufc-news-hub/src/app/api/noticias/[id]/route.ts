import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import { Noticia, Lutador, NoticiaComLutadores } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [noticia, lutadores] = await Promise.all([
      queryOne<Noticia>(
        `SELECT id, titulo, subtitulo, conteudo_completo, imagem_url,
                fonte_url, fonte_nome, categoria, publicado_em, created_at
         FROM noticias WHERE id = $1`,
        [id]
      ),
      query<Lutador>(
        `SELECT l.id, l.nome, l.apelido, l.categoria_peso, l.imagem_url, l.url_perfil
         FROM lutadores l
         JOIN noticia_entidades ne ON l.id = ne.lutador_id
         WHERE ne.noticia_id = $1
         ORDER BY l.nome`,
        [id]
      ),
    ]);

    if (!noticia) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    const response: NoticiaComLutadores = {
      ...noticia,
      lutadores,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícia' },
      { status: 500 }
    );
  }
}
