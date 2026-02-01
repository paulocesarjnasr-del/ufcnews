import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Noticia, NoticiasPaginadas, ContadorCategorias, CategoriaNoticia } from '@/types';
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

    // Query base
    let whereClause = 'WHERE eh_sobre_ufc = true';
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (categoria && ['lutadores', 'lutas', 'backstage'].includes(categoria)) {
      whereClause += ` AND categoria = $${paramIndex}`;
      params.push(categoria);
      paramIndex++;
    }

    // Buscar notícias
    const noticiasQuery = `
      SELECT
        id,
        titulo,
        subtitulo,
        imagem_url,
        fonte_url,
        fonte_nome,
        categoria,
        publicado_em,
        created_at,
        visualizacoes
      FROM noticias
      ${whereClause}
      ORDER BY publicado_em DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(porPagina, offset);

    const noticias = await query<Noticia>(noticiasQuery, params);

    // Contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM noticias
      ${whereClause}
    `;
    const countResult = await query<{ total: string }>(
      countQuery,
      params.slice(0, paramIndex - 1)
    );
    const total = parseInt(countResult[0]?.total || '0', 10);

    // Contar por categoria
    const contadoresQuery = `
      SELECT
        COUNT(*) FILTER (WHERE eh_sobre_ufc = true) as todas,
        COUNT(*) FILTER (WHERE categoria = 'lutadores' AND eh_sobre_ufc = true) as lutadores,
        COUNT(*) FILTER (WHERE categoria = 'lutas' AND eh_sobre_ufc = true) as lutas,
        COUNT(*) FILTER (WHERE categoria = 'backstage' AND eh_sobre_ufc = true) as backstage
      FROM noticias
    `;
    const contadoresResult = await query<{
      todas: string;
      lutadores: string;
      lutas: string;
      backstage: string;
    }>(contadoresQuery);

    const contadores: ContadorCategorias = {
      todas: parseInt(contadoresResult[0]?.todas || '0', 10),
      lutadores: parseInt(contadoresResult[0]?.lutadores || '0', 10),
      lutas: parseInt(contadoresResult[0]?.lutas || '0', 10),
      backstage: parseInt(contadoresResult[0]?.backstage || '0', 10),
    };

    const response: NoticiasPaginadas & { contadores: ContadorCategorias } = {
      noticias,
      total,
      pagina,
      porPagina,
      totalPaginas: Math.ceil(total / porPagina),
      contadores,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícias' },
      { status: 500 }
    );
  }
}
