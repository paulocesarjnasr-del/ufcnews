/**
 * Fetches fighter image URLs from UFC.com athlete pages.
 * Extracts full-body and headshot image URLs.
 */

export interface FighterImageUrls {
  fullBodyUrl: string | null;
  headshotUrl: string | null;
}

export async function getFighterImageUrls(ufcSlug: string): Promise<FighterImageUrls> {
  const url = `https://www.ufc.com/athlete/${ufcSlug}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    if (!res.ok) {
      console.info(`[UFC-IMAGES] Failed to fetch ${url}: ${res.status}`);
      return { fullBodyUrl: null, headshotUrl: null };
    }

    const html = await res.text();

    // Extract full body image (athlete_bio_full_body style)
    const fullBodyMatch = html.match(
      /https?:\/\/ufc\.com\/images\/styles\/athlete_bio_full_body\/[^"'\s)]+/
    );

    // Extract headshot (event_results_athlete_headshot style)
    const headshotMatch = html.match(
      /https?:\/\/ufc\.com\/images\/styles\/event_results_athlete_headshot\/[^"'\s)]+/
    );

    // Fallback: try any athlete image pattern
    const fallbackFullBody = html.match(
      /https?:\/\/[^"'\s]+athlete_bio_full_body[^"'\s)]+/
    );

    return {
      fullBodyUrl: fullBodyMatch?.[0] || fallbackFullBody?.[0] || null,
      headshotUrl: headshotMatch?.[0] || null,
    };
  } catch (error) {
    console.error(`[UFC-IMAGES] Error fetching images for ${ufcSlug}:`, error);
    return { fullBodyUrl: null, headshotUrl: null };
  }
}

/**
 * Builds the UFC slug from a fighter's name.
 * e.g., "Max Holloway" -> "max-holloway"
 */
export function buildUfcSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
