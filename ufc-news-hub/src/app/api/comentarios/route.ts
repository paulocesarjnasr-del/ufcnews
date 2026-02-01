import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Comentario, NovoComentario } from '@/types';
import {
  generateFingerprint,
  sanitizeContent,
  buildCommentTree,
  countTotalComments,
} from '@/lib/comments';
import {
  checkRateLimit,
  recordRateLimitAction,
  validateAuthorName,
  validateContent,
} from '@/lib/moderation';
import { MAX_COMMENT_DEPTH } from '@/lib/constants';

// GET /api/comentarios?noticia_id={id}
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const noticiaId = searchParams.get('noticia_id');

    if (!noticiaId) {
      return NextResponse.json(
        { error: 'noticia_id é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar todos os comentários aprovados da notícia
    const comentarios = await query<Comentario>(
      `SELECT
         id, noticia_id, parent_id, autor_nome, autor_email,
         conteudo, status, reportado_count, created_at
       FROM comentarios
       WHERE noticia_id = $1 AND status = 'aprovado'
       ORDER BY created_at DESC`,
      [noticiaId]
    );

    // Construir árvore de comentários
    const tree = buildCommentTree(comentarios);
    const total = countTotalComments(tree);

    return NextResponse.json({
      comentarios: tree,
      total,
    });
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar comentários' },
      { status: 500 }
    );
  }
}

// POST /api/comentarios
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<NovoComentario> & {
      honeypot?: string;
    };

    // Verificar honeypot (campo oculto para bots)
    if (body.honeypot) {
      // Bot detectado - retornar sucesso falso
      return NextResponse.json({ success: true, id: 'fake-id' });
    }

    // Validar campos obrigatórios
    if (!body.noticia_id || !body.autor_nome || !body.conteudo) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: noticia_id, autor_nome, conteudo' },
        { status: 400 }
      );
    }

    // Gerar fingerprint a partir dos headers
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';
    const acceptLanguage = request.headers.get('accept-language') || '';

    const fingerprint = body.fingerprint || generateFingerprint(userAgent, ip, acceptLanguage);

    // Verificar rate limit
    const rateLimit = await checkRateLimit(fingerprint);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Limite de comentários atingido. Tente novamente em ${rateLimit.resetIn} segundos.`,
          resetIn: rateLimit.resetIn,
        },
        { status: 429 }
      );
    }

    // Validar nome do autor
    const nameValidation = validateAuthorName(body.autor_nome);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

    // Sanitizar e validar conteúdo
    const sanitizedContent = sanitizeContent(body.conteudo);
    const contentValidation = validateContent(sanitizedContent);
    if (!contentValidation.valid) {
      return NextResponse.json(
        { error: contentValidation.error },
        { status: 400 }
      );
    }

    // Verificar se a notícia existe
    const noticia = await queryOne<{ id: string }>(
      'SELECT id FROM noticias WHERE id = $1',
      [body.noticia_id]
    );

    if (!noticia) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    // Se for uma resposta, verificar se o comentário pai existe e a profundidade
    let parentId = body.parent_id || null;
    if (parentId) {
      const parentComment = await queryOne<Comentario>(
        `SELECT id, parent_id FROM comentarios WHERE id = $1 AND status = 'aprovado'`,
        [parentId]
      );

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Comentário pai não encontrado' },
          { status: 404 }
        );
      }

      // Calcular profundidade do pai
      let depth = 1;
      let currentParentId: string | null = parentComment.parent_id;
      while (currentParentId) {
        depth++;
        const parent = await queryOne<{ parent_id: string | null }>(
          'SELECT parent_id FROM comentarios WHERE id = $1',
          [currentParentId]
        );
        currentParentId = parent?.parent_id || null;
      }

      // Se a profundidade exceder o máximo, responder ao comentário raiz mais próximo
      if (depth >= MAX_COMMENT_DEPTH) {
        // Encontrar o comentário raiz mais próximo do limite
        let rootId = parentId;
        let currentId: string | null = parentComment.parent_id;
        while (currentId) {
          const parent = await queryOne<{ id: string; parent_id: string | null }>(
            'SELECT id, parent_id FROM comentarios WHERE id = $1',
            [currentId]
          );
          if (!parent) break;
          rootId = parent.id;
          currentId = parent.parent_id;
        }
        parentId = rootId;
      }
    }

    // Criar o comentário
    const result = await queryOne<Comentario>(
      `INSERT INTO comentarios
         (noticia_id, parent_id, autor_nome, autor_email, autor_fingerprint, conteudo, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'aprovado')
       RETURNING id, noticia_id, parent_id, autor_nome, autor_email, conteudo, status, reportado_count, created_at`,
      [
        body.noticia_id,
        parentId,
        body.autor_nome.trim(),
        body.autor_email?.trim() || null,
        fingerprint,
        sanitizedContent,
      ]
    );

    // Registrar ação no rate limit
    await recordRateLimitAction(fingerprint);

    return NextResponse.json({
      success: true,
      comentario: result,
    });
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return NextResponse.json(
      { error: 'Erro ao criar comentário' },
      { status: 500 }
    );
  }
}
