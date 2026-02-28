import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const HAIKU = anthropic('claude-haiku-4-5-20251001');

export async function generateReelCaption(
  titulo: string,
  subtitulo: string | null
): Promise<string> {
  const input = subtitulo ? `${titulo} — ${subtitulo}` : titulo;

  try {
    const { text } = await generateText({
      model: HAIKU,
      maxOutputTokens: 60,
      prompt: `Gere uma legenda curta e chamativa estilo reels de Instagram sobre essa notícia de UFC, em português do Brasil. Máximo 80 caracteres. Use emojis quando fizer sentido. Tom: urgente e empolgante. Retorne APENAS a legenda, nada mais.\n\nTítulo da notícia: ${input}`,
    });

    const trimmed = text.trim();
    return trimmed.length > 100 ? trimmed.slice(0, 97) + '...' : trimmed;
  } catch (error) {
    console.error('[reel-caption] Failed to generate caption:', error);
    return titulo.length > 80 ? titulo.slice(0, 77) + '...' : titulo;
  }
}
