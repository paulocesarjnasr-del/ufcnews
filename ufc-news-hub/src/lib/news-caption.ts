import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const HAIKU = anthropic('claude-haiku-4-5-20251001');

interface NewsCaptions {
  subtitulo: string;
  reel_caption: string;
}

function cleanDescription(desc: string | null): string | null {
  if (!desc) return null;
  // Getty/AP photo captions are not real descriptions
  if (/^[A-Z]{2,}, [A-Z]/.test(desc) && desc.includes(':')) return null;
  // Too short to be useful
  if (desc.length < 30) return null;
  return desc;
}

const CAPTION_SYSTEM = `Voce e a voz do maior perfil brasileiro de UFC, com 500k seguidores que confiam em voce pra saber tudo que acontece no MMA.
Voce assiste TODAS as lutas, conhece os bastidores, e tem opiniao sobre tudo. Voce e o amigo que sempre sabe o contexto.
Voce mistura informacao com personalidade. Sabe quando ser serio (resultado de luta, lesao grave) e quando soltar uma observacao espirituosa (situacao absurda, drama desnecessario, ironia da vida).
Voce NUNCA inventa relacoes entre lutadores. Se nao sabe, descreve o que aconteceu e pronto.
Voce nunca e seco nem robotico. Mesmo quando a noticia e simples, voce encontra o angulo que faz o fa parar e pensar "boa, nao tinha visto por esse lado".
Nunca use travessoes (em dash ou en dash). Use virgula ou ponto.`;

function buildCaptionPrompt(context: string, hasVisualImage: boolean): string {
  const imageInstruction = hasVisualImage
    ? `\nVOCE ESTA VENDO A FOTO DA NOTICIA. As legendas DEVEM descrever/combinar com o que esta na imagem. Se a foto mostra um lutador comemorando, a legenda deve refletir vitoria. Se mostra encarada, deve refletir tensao. NUNCA contradiga o visual.\n`
    : '';

  return `${imageInstruction}
NOTICIA ORIGINAL (em ingles):
${context}

=== LEGENDA 1: SUBTITULO (aparece no card da noticia) ===
- Max 120 caracteres
- REESCREVA em portugues BR. Nunca traduzir literalmente
- Comece pelo FATO (o que aconteceu), mas adicione o TEMPERO (por que o fa liga, o que torna interessante)
- Opiniao, ironia e humor sao bem vindos quando a noticia pede. Use seu senso critico pra decidir o tom
- Se o titulo for vago (ex: "Breaking Barriers"), crie algo baseado no contexto do UFC
- NUNCA retorne o titulo original em ingles. SEMPRE reescreva em portugues
- NUNCA use travessoes (em dash ou en dash). Use virgula ou ponto

=== LEGENDA 2: REEL CAPTION (aparece sobre a foto no reel) ===
- Max 80 caracteres
- Frase que faz o fa parar o scroll. Pode ser o fato nu e cru, uma provocacao, uma ironia
- A reel caption TEM que ser sobre a MESMA noticia do titulo acima
- NUNCA retorne o titulo original. SEMPRE em portugues
- Pode ser engracada, provocativa ou dramatica. Adapte ao tom da noticia

REGRAS DE TOM:
- Noticia seria (lesao, aposentadoria, resultado): respeite, mas nao seja seco. Encontre o angulo humano
- Noticia absurda ou drama (beef, reclamacao, bastidores): pode soltar ironia, humor, provocacao
- Noticia factual (odds, pesagem, card anunciado): seja direto mas com personalidade, nao um comunicado de imprensa
- NUNCA soe como bot de noticias. Voce e um fa com credibilidade, nao um jornalista sem opiniao

REGRAS DE EMOJI:
- Emoji quando fizer sentido pro contexto (💰 dinheiro, 👀 algo surpreendente, 😂 algo ridiculo)
- Max 1 emoji por caption. Nao force, mas tambem nao tenha medo de usar quando combina
- Emojis genericos sem contexto (🔥💪🥊 em toda noticia) nao acrescentam. Use com intencao

REGRAS DE CONTEXTO UFC:
- NUNCA assumir rivalidade ou amizade entre lutadores se o texto nao diz explicitamente
- Se o titulo diz "shows up at camp" ou "training together", NAO traduzir como "rival" ou "inimigo"
- Pelo menos 1 detalhe especifico da noticia (nome, numero, fato)

=== EXEMPLOS DE BOAS CAPTIONS (note a variedade de tom) ===

TITULO: Khamzat Chimaev's Fight Camp Turns Into PUBG Lobby After Arman Tsarukyan Shows Up
SUBTITULO: Tsarukyan apareceu na camp do Khamzat e o treino virou campo de guerra entre parceiros
REEL: Arman virou sparring de luxo na camp do Khamzat 👀

TITULO: UFC 326 results: Charles Oliveira beats Max Holloway for BMF belt
SUBTITULO: Do Bronx vence Holloway e leva o BMF, mas a luta nao entregou o que prometeu
REEL: Do Bronx leva o BMF, mas ninguem saiu satisfeito

TITULO: Dana White Announces Every Main Event Until The White House Card
SUBTITULO: Dana abriu o calendario e entregou todos os main events ate o card na Casa Branca
REEL: Dana nao guardou segredo nenhum dessa vez

TITULO: Worst broken jaw in UFC history? Toothless Harry Hardwick wants milkshakes, not tears
SUBTITULO: Hardwick quebrou a mandibula, perdeu os dentes e ainda embolsou bonus de 100 mil
REEL: Sem dentes, mandibula quebrada, e 100 mil no bolso 💰

TITULO: Eryk Anders retires after UFC 326
SUBTITULO: Anders pendura as luvas apos 20 lutas no octogono e despedida com derrota
REEL: 20 lutas no UFC e Anders encerra a carreira

TITULO: 'I thought I was a shoo-in': Colby Covington says UFC did not offer him White House card fight
SUBTITULO: Colby jurava que ia pro card da Casa Branca, mas o UFC nem ligou
REEL: Colby ficou no vacuo pro card da Casa Branca 😂

TITULO: UFC AND FBI PARTNER FOR HISTORIC FIRST EXCLUSIVE TRAINING SEMINAR
SUBTITULO: UFC e FBI juntos num seminario de treinamento inedito, Dana expandindo pra todo lado
REEL: Ate o FBI ta treinando com o UFC agora

FORMATO (exatamente assim, uma linha cada):
SUBTITULO: [legenda em portugues]
REEL: [legenda em portugues]`;
}

async function isImageAccessible(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const contentType = response.headers.get('content-type') || '';
    return response.ok && contentType.startsWith('image/');
  } catch {
    return false;
  }
}

function parseCaptions(text: string, titulo: string): NewsCaptions {
  const lines = text.trim().split('\n');
  let subtitulo = '';
  let reelCaption = '';

  for (const line of lines) {
    if (line.startsWith('SUBTITULO:')) {
      subtitulo = line.replace('SUBTITULO:', '').trim().replace(/^["']|["']$/g, '');
    } else if (line.startsWith('REEL:')) {
      reelCaption = line.replace('REEL:', '').trim().replace(/^["']|["']$/g, '');
    }
  }

  if (subtitulo.length > 130) {
    subtitulo = subtitulo.slice(0, 117) + '...';
  }
  if (reelCaption.length > 100) {
    reelCaption = reelCaption.slice(0, 97) + '...';
  }

  // Reject if AI returned the original title (failed to rewrite)
  const isTitleCopy = subtitulo === titulo || subtitulo.toLowerCase() === titulo.toLowerCase();
  const isReelTitleCopy = reelCaption === titulo || reelCaption.toLowerCase() === titulo.toLowerCase();

  return {
    subtitulo: (subtitulo && !isTitleCopy) ? subtitulo : generateFallbackSubtitle(titulo),
    reel_caption: (reelCaption && !isReelTitleCopy) ? reelCaption : generateFallbackSubtitle(titulo),
  };
}

export async function generateNewsCaptions(
  titulo: string,
  descricao: string | null,
  imagemUrl: string | null
): Promise<NewsCaptions> {
  const cleanDesc = cleanDescription(descricao);
  const context = cleanDesc ? `${titulo}\n\nConteudo: ${cleanDesc.slice(0, 300)}` : titulo;

  const hasImage = !!(imagemUrl && imagemUrl.startsWith('http'));

  try {
    // Check if image is accessible for vision (3s timeout)
    const imageAccessible = hasImage ? await isImageAccessible(imagemUrl!) : false;

    if (imageAccessible) {
      // Multimodal: send the actual image to Haiku so it can SEE the photo
      const { text } = await generateText({
        model: HAIKU,
        system: CAPTION_SYSTEM,
        maxOutputTokens: 200,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', image: new URL(imagemUrl!) },
              { type: 'text', text: buildCaptionPrompt(context, true) },
            ],
          },
        ],
      });
      return parseCaptions(text, titulo);
    }

    // Fallback: text-only (image inaccessible or no image)
    const { text } = await generateText({
      model: HAIKU,
      system: CAPTION_SYSTEM,
      maxOutputTokens: 200,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: buildCaptionPrompt(context, false) },
          ],
        },
      ],
    });
    return parseCaptions(text, titulo);
  } catch (error) {
    console.error('[news-caption] Failed to generate captions:', error);
    return {
      subtitulo: generateFallbackSubtitle(descricao || titulo),
      reel_caption: titulo.length > 80 ? titulo.slice(0, 77) + '...' : titulo,
    };
  }
}

function generateFallbackSubtitle(text: string): string {
  const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= 120) return clean;
  const truncated = clean.slice(0, 120);
  const lastEnd = Math.max(truncated.lastIndexOf('.'), truncated.lastIndexOf('!'), truncated.lastIndexOf('?'));
  return lastEnd > 50 ? truncated.slice(0, lastEnd + 1) : truncated + '...';
}
