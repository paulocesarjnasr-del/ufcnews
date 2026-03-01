import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const HAIKU = anthropic('claude-haiku-4-5-20251001');

const ABERTURAS = [
  'Uai sô,', 'Nó,', 'Caralho,', 'É o bonde!', 'Papo reto:', 'Acabou!',
  'Eita,', 'Que isso,', 'Tá ligado?', 'Firmeza,', 'Bixo,', 'Irmão,',
  'Parça,', 'Cê tá doido,', 'Da hora,', 'Mermão,', 'Chapa,', 'Qual é,',
  'Brabo!', 'Vixi,',
];

function pickAbertura(): string {
  return ABERTURAS[Math.floor(Math.random() * ABERTURAS.length)];
}

export async function generateReelCaption(
  titulo: string,
  subtitulo: string | null
): Promise<string> {
  const input = subtitulo ? `${titulo} — ${subtitulo}` : titulo;
  const abertura = pickAbertura();

  try {
    const { text } = await generateText({
      model: HAIKU,
      maxOutputTokens: 80,
      prompt: `Voce eh um social media viral de UFC no Brasil. Gere uma legenda PROVOCATIVA para essa noticia — o objetivo eh gerar cliques, risadas, debates e compartilhamentos.

REGRAS OBRIGATORIAS:
- COMECE a legenda com: "${abertura}" — use essa abertura exata
- Max 80 caracteres no total
- Portugues BR informal com girias de DIFERENTES regioes
- Use emojis estrategicamente (1-2 max)
- NUNCA repita o titulo original — reformule completamente
- NUNCA use "mano" ou "mlk" — essas palavras sao PROIBIDAS
- Tom: ironico, polemico, zoeiro, chocante ou hype extremo
- Provoque reacao: "COMO ASSIM?!", "kkkk", "serio isso?"

GIRIAS PRA USAR:
- Paulista: véi, da hora, firmeza, tá ligado, bixo, truta, é nóis
- Carioca: caralho, é o bonde, mermão, cria, papo reto, qual é zé
- Mineiro: uai, trem, sô, bão demais, nó, cê tá doido, ocê
- Nordestino: vixe, oxe, mainha, arretado, abestado
- Geral BR: parça, brabo, pelas, zé, irmão, chapa, comédia

Titulo da noticia: ${input}

Retorne APENAS a legenda comecando com "${abertura}". Nada mais.`,
    });

    const trimmed = text.trim().replace(/^["']|["']$/g, '');
    return trimmed.length > 100 ? trimmed.slice(0, 97) + '...' : trimmed;
  } catch (error) {
    console.error('[reel-caption] Failed to generate caption:', error);
    return titulo.length > 80 ? titulo.slice(0, 77) + '...' : titulo;
  }
}
