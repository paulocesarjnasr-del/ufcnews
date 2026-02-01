import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import * as cheerio from 'cheerio';

const UFC_BASE_URL = 'https://www.ufc.com';

// Timeout helper
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs)),
  ]);
}

async function fetchWithRetry(url: string, retries = 2, timeoutMs = 8000): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'UFCNewsHub-Bot/1.0 (News Aggregator; educational project)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      if (i === retries - 1) return null;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  return null;
}

async function fetchFighterData(nome: string): Promise<{
  imageUrl: string | null;
  record: { wins: number; losses: number; draws: number } | null;
}> {
  try {
    // Convert name to URL slug format
    const slug = nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const fighterUrl = `${UFC_BASE_URL}/athlete/${slug}`;
    const html = await fetchWithRetry(fighterUrl);

    if (!html) return { imageUrl: null, record: null };

    const $ = cheerio.load(html);

    // Get image
    let imageUrl: string | null =
      $('.hero-profile__image img').attr('src') ||
      $('.c-hero--athlete img').attr('src') ||
      $('img[alt*="' + nome.split(' ')[0] + '"]').first().attr('src') ||
      $('.hero-profile-wrap img').attr('src') || null;

    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = null;
    }

    // Get record
    let record: { wins: number; losses: number; draws: number } | null = null;
    const recordText = $('.hero-profile__division-body').text() ||
      $('.c-hero--athlete__record').text() ||
      $('[class*="record"]').first().text() || '';

    const recordMatch = recordText.match(/(\d+)-(\d+)-(\d+)/);
    if (recordMatch) {
      record = {
        wins: parseInt(recordMatch[1]),
        losses: parseInt(recordMatch[2]),
        draws: parseInt(recordMatch[3]),
      };
    }

    return { imageUrl, record };
  } catch {
    return { imageUrl: null, record: null };
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit') || '20';
    const limit = Math.min(parseInt(limitParam), 50);

    // Find fighters missing images or with 0-0-0 records
    const fightersToUpdate = await query<{ id: string; nome: string; imagem_url: string | null; vitorias: number }>(
      `SELECT id, nome, imagem_url, COALESCE(vitorias, 0) as vitorias
       FROM lutadores
       WHERE imagem_url IS NULL OR (vitorias = 0 AND derrotas = 0 AND empates = 0)
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    let updated = 0;
    let imagesAdded = 0;
    let recordsUpdated = 0;

    for (const fighter of fightersToUpdate) {
      const data = await withTimeout(
        fetchFighterData(fighter.nome),
        10000,
        { imageUrl: null, record: null }
      );

      let needsUpdate = false;
      const updates: string[] = [];
      const values: (string | number)[] = [];

      if (data.imageUrl && !fighter.imagem_url) {
        updates.push(`imagem_url = $${updates.length + 1}`);
        values.push(data.imageUrl);
        needsUpdate = true;
        imagesAdded++;
      }

      if (data.record && fighter.vitorias === 0) {
        updates.push(`vitorias = $${updates.length + 1}`);
        values.push(data.record.wins);
        updates.push(`derrotas = $${updates.length + 1}`);
        values.push(data.record.losses);
        updates.push(`empates = $${updates.length + 1}`);
        values.push(data.record.draws);
        needsUpdate = true;
        recordsUpdated++;
      }

      if (needsUpdate && updates.length > 0) {
        values.push(fighter.id);
        await query(
          `UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${values.length}`,
          values
        );
        updated++;
      }

      // Small delay to avoid overwhelming UFC.com
      await new Promise(r => setTimeout(r, 300));
    }

    return NextResponse.json({
      success: true,
      fightersChecked: fightersToUpdate.length,
      fightersUpdated: updated,
      imagesAdded,
      recordsUpdated,
    });
  } catch (error) {
    console.error('Erro ao atualizar lutadores:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Preview fighters that need updates
    const missing = await query<{ nome: string; imagem_url: string | null; vitorias: number; derrotas: number }>(
      `SELECT nome, imagem_url, COALESCE(vitorias, 0) as vitorias, COALESCE(derrotas, 0) as derrotas
       FROM lutadores
       WHERE imagem_url IS NULL OR (vitorias = 0 AND derrotas = 0 AND empates = 0)
       ORDER BY created_at DESC
       LIMIT 50`
    );

    return NextResponse.json({
      fightersNeedingUpdate: missing.length,
      fighters: missing,
      message: 'Use POST to update these fighters from UFC.com',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
