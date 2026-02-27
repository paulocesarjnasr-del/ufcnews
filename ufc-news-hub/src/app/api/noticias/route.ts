import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Noticia, NoticiasPaginadas, CategoriaNoticia } from '@/types';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoria = searchParams.get('categoria') as CategoriaNoticia | null;
    const pagina = parseInt(searchParams.get('pagina') || '1', 10);
    const porPagina = parseInt(
      searchParams.get('porPagina') || String(ITEMS_PER_PAGE),
      10
    );
    const offset = (pagina - 1) * porPagina;

    let whereClause = 'WHERE eh_sobre_ufc = true';
    const baseParams: (string | number)[] = [];
    let paramIndex = 1;

    if (categoria && ['lutadores', 'lutas', 'backstage'].includes(categoria)) {
      whereClause += ` AND categoria = $${paramIndex}`;
      baseParams.push(categoria);
      paramIndex++;
    }

    const [noticias, countResult] = await Promise.all([
      query<Noticia>(
        `SELECT id, titulo, subtitulo, imagem_url, fonte_url, fonte_nome,
                categoria, publicado_em, created_at, visualizacoes
         FROM noticias ${whereClause}
         ORDER BY publicado_em DESC
         LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
        [...baseParams, porPagina, offset]
      ),
      query<{ total: string }>(
        `SELECT COUNT(*) as total FROM noticias ${whereClause}`,
        baseParams
      ),
    ]);

    const total = parseInt(countResult[0]?.total || '0', 10);

    const response: NoticiasPaginadas = {
      noticias,
      total,
      pagina,
      porPagina,
      totalPaginas: Math.ceil(total / porPagina),
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícias' },
      { status: 500 }
    );
  }
}
