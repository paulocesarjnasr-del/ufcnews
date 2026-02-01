import Anthropic from '@anthropic-ai/sdk';
import { ClassificationResult, CategoriaNoticia } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CLASSIFICATION_PROMPT = `
Você é um especialista em UFC/MMA. Analise esta notícia e execute as tarefas abaixo.

## NOTÍCIA
**Título:** {titulo}
**Descrição:** {descricao}

## LISTA DE LUTADORES UFC ATIVOS
{lista_lutadores}

## TAREFAS

### 1. VERIFICAÇÃO UFC
Esta notícia é EXCLUSIVAMENTE sobre o UFC (Ultimate Fighting Championship)?
- Responda "true" SOMENTE se a notícia menciona:
  - UFC explicitamente no título ou conteúdo
  - Lutadores que estão NA LISTA ACIMA (e estão lutando no UFC)
  - Eventos UFC (UFC 300, UFC Fight Night, etc.)
  - Dana White ou executivos do UFC
- Responda "false" se a notícia é sobre:
  - BOXING/BOXE (Naoya Inoue, Tyson Fury, Canelo, Terence Crawford, etc.)
  - Bellator, ONE Championship, PFL, Rizin, ou outras organizações de MMA
  - Lutadores que NÃO estão na lista acima
  - Grappling/BJJ puro (Gordon Ryan, Craig Jones, etc.) sem contexto UFC

### 2. EXTRAÇÃO DE ENTIDADES (MUITO IMPORTANTE!)
Identifique ABSOLUTAMENTE TODOS os lutadores da lista acima que são mencionados na notícia.
- Leia o título E a descrição COMPLETA com atenção
- Procure por TODOS os nomes de lutadores, não apenas o principal
- Use os nomes EXATAMENTE como aparecem na lista fornecida
- Se um apelido é usado (ex: "The Baddy" = Paddy Pimblett, "Bones" = Jon Jones), vincule ao nome real
- Inclua lutadores mencionados em QUALQUER contexto (oponentes, comparações, eventos futuros)
- NÃO PULE NENHUM LUTADOR - mesmo se mencionado apenas uma vez
- Exemplo: Se a notícia diz "Paddy lutará contra Gaethje pelo cinturão de Topuria", retorne: ["Paddy Pimblett", "Justin Gaethje", "Ilia Topuria"]

### 3. CLASSIFICAÇÃO
Classifique em UMA categoria:
- "lutadores": Notícias sobre contratos, lesões, mudança de categoria, rankings, declarações pessoais de lutadores, aposentadorias
- "lutas": Anúncios de lutas, cards de eventos, cancelamentos de lutas, resultados, pesagens, locais de eventos
- "backstage": Drama, brigas fora do octógono, problemas legais, vida pessoal, treinos, relacionamentos entre lutadores, bastidores

### 4. SUBTÍTULO ATRATIVO
Crie um subtítulo que:
- Tenha NO MÁXIMO 2 frases curtas
- Seja chamativo e gere curiosidade
- Use linguagem direta e impactante
- NÃO repita o título
- Escreva em português do Brasil

## FORMATO DE RESPOSTA (JSON VÁLIDO)
{
  "eh_ufc": boolean,
  "lutadores_mencionados": ["Nome Completo 1", "Nome Completo 2"],
  "categoria": "lutadores" | "lutas" | "backstage",
  "subtitulo": "Subtítulo atrativo aqui. Segunda frase opcional."
}

RESPONDA APENAS O JSON, SEM TEXTO ADICIONAL.
`;

export async function classifyNews(
  titulo: string,
  descricao: string,
  lutadores: string[]
): Promise<ClassificationResult> {
  // Limitar a lista de lutadores para não exceder o contexto
  const lutadoresStr = lutadores.slice(0, 500).join(', ');

  const prompt = CLASSIFICATION_PROMPT.replace('{titulo}', titulo)
    .replace('{descricao}', descricao)
    .replace('{lista_lutadores}', lutadoresStr);

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      temperature: 0.1,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      // Limpar a resposta para garantir JSON válido
      let jsonText = content.text.trim();

      // Remover possíveis marcadores de código
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3);
      }

      jsonText = jsonText.trim();

      const result = JSON.parse(jsonText);

      // Validar e normalizar resultado
      return {
        eh_ufc: Boolean(result.eh_ufc),
        lutadores_mencionados: Array.isArray(result.lutadores_mencionados)
          ? result.lutadores_mencionados
          : [],
        categoria: validateCategoria(result.categoria),
        subtitulo: String(result.subtitulo || ''),
      };
    }

    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Erro ao classificar notícia:', error);

    // Fallback em caso de erro - REJEITAR notícia (não assumir que é UFC)
    // Isso evita que notícias de outras organizações (PFL, Bellator, Boxing) apareçam
    return {
      eh_ufc: false,
      lutadores_mencionados: [],
      categoria: 'backstage',
      subtitulo: descricao.slice(0, 150),
    };
  }
}

function validateCategoria(categoria: string): CategoriaNoticia {
  const valid: CategoriaNoticia[] = ['lutadores', 'lutas', 'backstage'];
  if (valid.includes(categoria as CategoriaNoticia)) {
    return categoria as CategoriaNoticia;
  }
  return 'backstage';
}

// Função para classificação em lote (mais eficiente para múltiplas notícias)
export async function classifyNewsBatch(
  noticias: Array<{ titulo: string; descricao: string }>,
  lutadores: string[]
): Promise<ClassificationResult[]> {
  // Processar em paralelo com limite de concorrência
  const BATCH_SIZE = 5;
  const results: ClassificationResult[] = [];

  for (let i = 0; i < noticias.length; i += BATCH_SIZE) {
    const batch = noticias.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map((n) => classifyNews(n.titulo, n.descricao, lutadores))
    );
    results.push(...batchResults);

    // Pequeno delay entre batches para evitar rate limiting
    if (i + BATCH_SIZE < noticias.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return results;
}
