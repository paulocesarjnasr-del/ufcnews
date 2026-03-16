import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface RouteParams {
  params: Promise<{ ligaId: string }>;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

function getExtension(contentType: string): string {
  switch (contentType) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'image/webp': return 'webp';
    default: return 'bin';
  }
}

// ═══════════════════════════════════════════════════════════════
// POST - Upload banner da liga
// ═══════════════════════════════════════════════════════════════

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;

    // Auth check
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check is_admin in liga_membros
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro?.is_admin) {
      return NextResponse.json(
        { error: 'Apenas o criador pode alterar o banner' },
        { status: 403 }
      );
    }

    // Parse FormData
    const formData = await request.formData();
    const bannerFile = formData.get('banner');

    if (!bannerFile || !(bannerFile instanceof File)) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    // Validate content type
    const contentType = bannerFile.type;
    if (!(ALLOWED_TYPES as readonly string[]).includes(contentType)) {
      return NextResponse.json(
        { error: 'Formato invalido. Use JPEG, PNG ou WebP' },
        { status: 400 }
      );
    }

    // Validate file size
    if (bannerFile.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Imagem muito grande. Maximo 2MB' },
        { status: 400 }
      );
    }

    // Fetch current imagem_url to delete old blob if it exists
    const liga = await queryOne<{ imagem_url: string | null }>(
      `SELECT imagem_url FROM ligas WHERE id = $1`,
      [ligaId]
    );

    if (liga?.imagem_url) {
      try {
        await del(liga.imagem_url);
      } catch (err) {
        // Log but do not block upload if old blob deletion fails
        console.warn('[banner] Failed to delete old blob:', err);
      }
    }

    // Upload new blob
    const extension = getExtension(contentType);
    const pathname = `arena/ligas/${ligaId}/banner.${extension}`;

    const blob = await put(pathname, bannerFile, {
      access: 'public',
      addRandomSuffix: true,
      contentType,
    });

    // Save URL to ligas.imagem_url
    await query(
      `UPDATE ligas SET imagem_url = $1 WHERE id = $2`,
      [blob.url, ligaId]
    );

    return NextResponse.json({ success: true, banner_url: blob.url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[banner POST] Erro ao fazer upload:', msg, error);
    return NextResponse.json({ error: `Erro ao fazer upload: ${msg}` }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════════
// DELETE - Remover banner da liga
// ═══════════════════════════════════════════════════════════════

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;

    // Auth check
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check is_admin in liga_membros
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro?.is_admin) {
      return NextResponse.json(
        { error: 'Apenas o criador pode alterar o banner' },
        { status: 403 }
      );
    }

    // Fetch current imagem_url
    const liga = await queryOne<{ imagem_url: string | null }>(
      `SELECT imagem_url FROM ligas WHERE id = $1`,
      [ligaId]
    );

    if (liga?.imagem_url) {
      await del(liga.imagem_url);
    }

    // Set imagem_url = NULL
    await query(
      `UPDATE ligas SET imagem_url = NULL WHERE id = $1`,
      [ligaId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[banner DELETE] Erro ao remover banner:', error);
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 });
  }
}
