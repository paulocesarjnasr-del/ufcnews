import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { prisma } from '@/lib/prisma';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { promptId } = await req.json();

    if (!promptId) {
      return NextResponse.json({ error: 'promptId required' }, { status: 400 });
    }

    // Get the prompt record
    const promptRow = await prisma.companyPrompt.findUnique({ where: { id: promptId } });
    if (!promptRow) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Get CEO system prompt
    const ceo = await prisma.agent.findUnique({ where: { id: 'ceo' } });
    if (!ceo) {
      return NextResponse.json({ error: 'CEO not found' }, { status: 500 });
    }

    // Get all completed task outputs for this prompt
    const tasks = await prisma.agentTask.findMany({
      where: { id: { in: promptRow.tasks }, status: 'completed', output: { not: null } },
      include: { agent: { select: { humanName: true, codename: true } } },
      orderBy: { createdAt: 'asc' },
    });

    if (tasks.length === 0) {
      return NextResponse.json({ error: 'No completed tasks found' }, { status: 400 });
    }

    const agentOutputs = tasks
      .map((t) => `=== ${t.agent.humanName} (${t.agent.codename}) ===\n${t.output}`)
      .join('\n\n---\n\n');

    // Generate consolidation
    const result = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      system: ceo.systemPrompt,
      prompt: `TAREFA: Consolidar os resultados de todos os agentes em um RELATÓRIO EXECUTIVO profissional.

PROMPT ORIGINAL DO ADMIN: "${promptRow.prompt}"

RESULTADOS DOS AGENTES (${tasks.length} completaram):

${agentOutputs}

═══════════════════════════════════
DIRETRIZES DE FORMATAÇÃO (OBRIGATÓRIO)
═══════════════════════════════════

Você DEVE produzir um relatório usando Markdown rico. Siga estas regras:

1. **Estrutura do relatório:**
   - Comece com um header H1 com o título do relatório
   - Use H2 (##) para seções principais
   - Use H3 (###) para subseções
   - Cada seção deve ser clara e autocontida

2. **Tabelas são OBRIGATÓRIAS** quando houver dados comparativos, métricas, ou listas estruturadas:
   - Use tabelas Markdown reais (com | e ---)
   - Exemplos de quando usar tabela: status de sistemas, métricas, comparações, dados de lutadores, cronogramas
   - Formato:
     | Coluna 1 | Coluna 2 | Coluna 3 |
     |----------|----------|----------|
     | dado     | dado     | dado     |

3. **Formatação de texto:**
   - Use **negrito** para métricas importantes, nomes de agentes, e pontos críticos
   - Use bullet points (- ) para listas de itens
   - Use > blockquotes para alertas ou avisos importantes
   - Use \`código\` para nomes de campos, tabelas, ou valores técnicos

4. **Estrutura recomendada:**
   - Resumo Executivo (2-3 linhas do panorama geral)
   - Status / Métricas Principais (tabela)
   - Análise Detalhada (seções por tema)
   - Problemas Identificados (se houver, com severidade)
   - Recomendações (priorizadas: alta/média/baixa)
   - Créditos (tabela: agente | contribuição)

5. **Tom:** Profissional, direto, sem enrolação. Dados primeiro, narrativa depois.

6. **Regra de ouro:** Se uma informação pode ser apresentada em tabela, APRESENTE EM TABELA. Relatórios com paredes de texto são proibidos.

INSTRUCOES DE CONTEUDO:
- Integre informações de TODOS os agentes — organize por tema, não por agente
- Destaque pontos críticos primeiro
- Se houver conflitos entre agentes, mostre ambos os lados
- Não repita informações — sintetize
- Se dados estiverem incompletos, diga claramente o que falta e por quê
- NÃO invente dados. Se não tem, diga que não tem.
- NÃO use JSON no output. Apenas Markdown.`,
      temperature: 0.3,
    });

    // Save consolidation as a CEO task
    await prisma.agentTask.create({
      data: {
        agentId: 'ceo',
        type: 'consolidation',
        input: `Consolidar resultados de ${tasks.length} agentes para: "${promptRow.prompt.slice(0, 200)}"`,
        output: result.text,
        status: 'completed',
        completedAt: new Date(),
        modelUsed: 'sonnet-4.5',
        tokensInput: result.usage?.inputTokens,
        tokensOutput: result.usage?.outputTokens,
      },
    });

    // Update company_prompts summary
    await prisma.companyPrompt.update({
      where: { id: promptId },
      data: { summary: result.text },
    });

    return NextResponse.json({
      success: true,
      summary: result.text,
      tokensInput: result.usage?.inputTokens,
      tokensOutput: result.usage?.outputTokens,
    });
  } catch (error) {
    console.error('Consolidation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
