import { prisma } from '@/lib/prisma';
import type { EventAnalysisData } from '@/components/analise/EventAnalysisView';

/**
 * Enriches event analysis data with fighter photos from the database.
 * Single query using WHERE nome IN (...) on the unique nome index.
 * Returns a new object (does not mutate the original).
 */
export async function enrichEventWithPhotos(
  data: EventAnalysisData,
): Promise<EventAnalysisData> {
  const allFights = [...data.main_card, ...data.prelims];
  const names = allFights.flatMap((f) => [f.fighter1.nome, f.fighter2.nome]);

  const fighters = await prisma.lutadores.findMany({
    where: { nome: { in: names } },
    select: { nome: true, imagem_url: true },
  });

  const photoMap = new Map(
    fighters
      .filter((f) => f.imagem_url)
      .map((f) => [f.nome, f.imagem_url!]),
  );

  // Log missing fighters for debugging
  const missing = names.filter((n) => !photoMap.has(n));
  if (missing.length > 0) {
    console.warn(
      `[enrich-event-photos] Fotos nao encontradas para: ${missing.join(', ')}`,
    );
  }

  function enrichFight<T extends { fighter1: { nome: string; record: string; foto_url?: string }; fighter2: { nome: string; record: string; foto_url?: string } }>(fight: T): T {
    return {
      ...fight,
      fighter1: { ...fight.fighter1, foto_url: photoMap.get(fight.fighter1.nome) },
      fighter2: { ...fight.fighter2, foto_url: photoMap.get(fight.fighter2.nome) },
    };
  }

  return {
    ...data,
    main_card: data.main_card.map(enrichFight),
    prelims: data.prelims.map(enrichFight),
  };
}
