import { generateText, stepCountIs } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { logCost } from '../cost-guard';

const MODEL_MAP = {
  'opus-4.6': 'claude-opus-4-6',
  'sonnet-4.5': 'claude-sonnet-4-5-20250929',
  'haiku-4.5': 'claude-haiku-4-5-20251001',
} as const;

export type AgentModelKey = keyof typeof MODEL_MAP;

export interface AgentConfig {
  id: string;
  humanName: string;
  codename: string;
  model: AgentModelKey;
  systemPrompt: string;
  tools?: Record<string, unknown>;
  enableReflection?: boolean; // default: true for sonnet/opus, false for haiku
  onToolCall?: (toolName: string, args: Record<string, unknown>) => void;
}

export interface ToolCallResult {
  toolName: string;
  args: Record<string, unknown>;
  result: unknown;
}

export interface AgentResult {
  text: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
  toolResults?: ToolCallResult[];
}

// Tools that perform mutations or require approval (vs. read-only data tools)
const ACTION_TOOL_NAMES = new Set([
  'publishArticle',
  'createPoll',
  'moderateComment',
  'updateFighterData',
  'backfillFighterData',
  'runDatabaseMigration',
  'fixColumnSchema',
  'runNpmAuditFix',
  'processEventResults',
  'openArenaPredictions',
  'finalizeDuels',
  'syncEventCards',
  'updateFightResults',
]);

export class BaseAgent {
  config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  get model() {
    return anthropic(MODEL_MAP[this.config.model]);
  }

  async execute(instruction: string): Promise<AgentResult> {
    const hasTools =
      this.config.tools && Object.keys(this.config.tools).length > 0;

    const toolNames = hasTools ? Object.keys(this.config.tools!) : [];
    const dataTools = toolNames.filter(t => !ACTION_TOOL_NAMES.has(t));
    const actionTools = toolNames.filter(t => ACTION_TOOL_NAMES.has(t));

    let toolInstruction: string;

    if (hasTools && actionTools.length > 0) {
      // TWO-PHASE EXECUTION: Phase 1 collects data, Phase 2 forces action tool call
      // This guarantees publishArticle/createPoll gets called (instruction-based approaches fail)
      return this.executeTwoPhase(instruction, dataTools, actionTools);
    } else if (hasTools) {
      // Standard workflow for read-only agents
      const hasWebTools = toolNames.includes('searchWeb');
      const webSearchRule = hasWebTools
        ? `\n\n⚠️ REGRA CRÍTICA — WEB SEARCH OBRIGATÓRIO:\n- Você TEM a tool searchWeb. Você DEVE chamá-la ANTES de escrever qualquer análise.\n- FLUXO OBRIGATÓRIO: (1) Consulte o banco local (queryFighters/queryEvents/etc) → (2) Chame searchWeb com termos relevantes → (3) Se searchWeb retornar URLs úteis, chame fetchWebPage para ler o conteúdo completo → (4) CRUZE os dados do banco local com os dados da web → (5) Quando houver conflito, os dados da WEB são mais confiáveis (nosso banco pode estar desatualizado) → (6) Escreva sua análise citando AMBAS as fontes.\n- Se você NÃO chamar searchWeb, seu output será REJEITADO.\n- Nosso banco de dados pode ter dados desatualizados. A internet é a fonte da verdade.`
        : '';
      toolInstruction = `INSTRUÇÃO: ${instruction}\n\nREGRAS OBRIGATÓRIAS:\n1. Chame TODAS as tools disponíveis ANTES de escrever qualquer texto.\n2. Seus tools disponíveis: [${toolNames.join(', ')}]\n3. Após receber os resultados das tools, escreva sua análise CITANDO os dados reais retornados.\n4. NUNCA invente dados. NUNCA diga "vou verificar" ou "estou analisando" — CHAME a tool.\n5. Se uma tool falhar, inclua o erro real no output.${webSearchRule}`;
    } else {
      toolInstruction = instruction;
    }

    console.log(`[BaseAgent:${this.config.id}] Executing with ${toolNames.length} tools: [${toolNames.join(', ')}] (data: ${dataTools.length}, action: ${actionTools.length})`);
    console.log(`[BaseAgent:${this.config.id}] Model: ${MODEL_MAP[this.config.model]}`);
    console.log(`[BaseAgent:${this.config.id}] System prompt length: ${this.config.systemPrompt.length} chars`);

    let result;
    try {
      result = await generateText({
        model: this.model,
        system: this.config.systemPrompt,
        prompt: toolInstruction,
        temperature: this.config.model === 'opus-4.6' ? 0.3 : 0.5,
        ...(hasTools
          ? {
              tools: this.config.tools as Parameters<typeof generateText>[0]['tools'],
              stopWhen: stepCountIs(8),
            }
          : {}),
      });
    } catch (err) {
      console.error(`[BaseAgent:${this.config.id}] generateText FAILED:`, err instanceof Error ? err.message : err);
      throw err;
    }

    console.log(`[BaseAgent:${this.config.id}] Steps: ${result.steps?.length}`);
    if (result.steps) {
      for (let i = 0; i < result.steps.length; i++) {
        const step = result.steps[i];
        console.log(`[BaseAgent:${this.config.id}] Step ${i}: toolCalls=${step.toolCalls?.length ?? 0}, toolResults=${step.toolResults?.length ?? 0}`);
        if (step.toolCalls) {
          for (const tc of step.toolCalls) {
            console.log(`[BaseAgent:${this.config.id}]   -> called: ${tc.toolName}`);
            // Emit tool call event for real-time visibility
            if (this.config.onToolCall) {
              try {
                this.config.onToolCall(tc.toolName, ((tc as Record<string, unknown>).input ?? {}) as Record<string, unknown>);
              } catch {
                // Don't let callback errors break execution
              }
            }
          }
        }
      }
    }
    console.log(`[BaseAgent:${this.config.id}] Text length: ${result.text.length}`);

    // Collect tool results from all steps
    const toolResults: ToolCallResult[] = [];
    if (result.steps) {
      for (const step of result.steps) {
        // Log raw structure for debugging
        console.log(`[BaseAgent:${this.config.id}] Step raw toolResults count:`, step.toolResults?.length ?? 0);
        if (step.toolResults && step.toolResults.length > 0) {
          console.log(`[BaseAgent:${this.config.id}] First toolResult keys:`, JSON.stringify(Object.keys(step.toolResults[0])));
          console.log(`[BaseAgent:${this.config.id}] First toolResult:`, JSON.stringify(step.toolResults[0]).slice(0, 500));
        }
        if (step.toolCalls && step.toolCalls.length > 0) {
          console.log(`[BaseAgent:${this.config.id}] First toolCall keys:`, JSON.stringify(Object.keys(step.toolCalls[0])));
        }

        // Try to extract tool results - handle different SDK formats
        if (step.toolResults) {
          for (const tr of step.toolResults) {
            const raw = tr as Record<string, unknown>;
            toolResults.push({
              toolName: (raw.toolName ?? raw.name ?? 'unknown') as string,
              args: (raw.args ?? raw.input ?? {}) as Record<string, unknown>,
              result: raw.result ?? raw.output ?? raw.content ?? raw,
            });
          }
        }
      }
    }
    console.log(`[BaseAgent:${this.config.id}] Total toolResults collected: ${toolResults.length}`);

    // ALWAYS append raw tool data to output — never trust the agent to include it
    let finalText = result.text;
    const toolDataSection = toolResults.length > 0
      ? toolResults
          .map((tr) => {
            let resultStr: string;
            try {
              resultStr = typeof tr.result === 'string' ? tr.result : JSON.stringify(tr.result, null, 2);
            } catch {
              resultStr = String(tr.result);
            }
            return `### [Tool: ${tr.toolName}]\n${resultStr}`;
          })
          .join('\n\n')
      : '';

    // Reflection: validate agent output against tool data (if enabled)
    // SKIP reflection if the agent called action tools — the correction would strip them
    const hasActionToolCalls = toolResults.some(tr => ACTION_TOOL_NAMES.has(tr.toolName));
    if (hasActionToolCalls) {
      console.log(`[BaseAgent:${this.config.id}] Skipping reflection — action tools called: ${toolResults.filter(tr => ACTION_TOOL_NAMES.has(tr.toolName)).map(tr => tr.toolName).join(', ')}`);
    }
    const shouldReflect = !hasActionToolCalls && (this.config.enableReflection ?? (this.config.model !== 'haiku-4.5'));
    if (shouldReflect && toolResults.length > 0 && result.text.length > 0) {
      try {
        const validation = await this.validateOutput(result.text, toolResults, toolDataSection);
        if (!validation.valid) {
          console.log(`[BaseAgent:${this.config.id}] Reflection FAILED (score: ${validation.score}). Re-executing with correction...`);

          // Re-execute with correction prompt (max 1 retry)
          const correctionResult = await generateText({
            model: this.model,
            system: this.config.systemPrompt,
            prompt: `CORREÇÃO NECESSÁRIA — Sua resposta anterior tinha problemas de validação:
${validation.issues}

DADOS REAIS DAS TOOLS (use SOMENTE estes dados):
${toolDataSection}

INSTRUÇÃO ORIGINAL: ${instruction}

REGRAS:
1. CITE somente dados que aparecem nos DADOS REAIS acima
2. NÃO invente números ou métricas
3. Se um dado não está disponível, diga "dado não disponível"
4. Corrija as inconsistências apontadas`,
            temperature: 0.2,
          });

          finalText = correctionResult.text;
          console.log(`[BaseAgent:${this.config.id}] Correction complete. New text length: ${finalText.length}`);

          // Log correction cost
          if (correctionResult.usage) {
            logCost({
              agentId: this.config.id,
              model: this.config.model,
              tokensInput: correctionResult.usage.inputTokens ?? 0,
              tokensOutput: correctionResult.usage.outputTokens ?? 0,
            }).catch(() => {});
          }
        } else {
          console.log(`[BaseAgent:${this.config.id}] Reflection PASSED (score: ${validation.score})`);
        }
      } catch (reflectionErr) {
        console.warn(`[BaseAgent:${this.config.id}] Reflection failed, using original output:`, reflectionErr instanceof Error ? reflectionErr.message : reflectionErr);
        // Use original output if reflection fails
      }
    }

    if (toolResults.length > 0) {
      // ALWAYS inject tool data — the agent may write long text that ignores the actual results
      finalText = (finalText ? finalText + '\n\n' : '') + '---\n## DADOS REAIS (output das tools executadas)\n\n' + toolDataSection;
    } else if (hasTools && toolNames.length > 0) {
      // Agent had tools available but didn't call ANY — flag this explicitly
      console.warn(`[BaseAgent:${this.config.id}] WARNING: Agent has ${toolNames.length} tools but called NONE`);
      finalText = finalText + '\n\n---\n⚠️ AVISO: Este agente NÃO chamou nenhuma tool. Os dados acima podem ser inventados.';
    }

    // Log cost for monitoring
    const inputTokens = result.usage?.inputTokens ?? 0;
    const outputTokens = result.usage?.outputTokens ?? 0;
    if (inputTokens > 0 || outputTokens > 0) {
      logCost({
        agentId: this.config.id,
        model: this.config.model,
        tokensInput: inputTokens,
        tokensOutput: outputTokens,
      }).catch(() => {}); // fire-and-forget
    }

    return {
      text: finalText,
      usage: result.usage
        ? { inputTokens, outputTokens }
        : undefined,
      toolResults: toolResults.length > 0 ? toolResults : undefined,
    };
  }

  /**
   * Two-phase execution for agents with ACTION tools (publishArticle, createPoll, etc.)
   * Phase 1: Collect data using read-only tools
   * Phase 2: Force the action tool call with toolChoice constraint
   * This guarantees the action tool gets called — instruction-only approaches fail.
   */
  private async executeTwoPhase(
    instruction: string,
    dataToolNames: string[],
    actionToolNames: string[],
  ): Promise<AgentResult> {
    const allTools = this.config.tools as Record<string, unknown>;
    const primaryAction = actionToolNames[0]; // e.g. 'publishArticle'

    // --- PHASE 1: Collect data with read-only tools ---
    const dataToolsOnly: Record<string, unknown> = {};
    for (const name of dataToolNames) {
      if (allTools[name]) dataToolsOnly[name] = allTools[name];
    }

    const hasWebTools = dataToolNames.includes('searchWeb');
    const webSearchPhase1 = hasWebTools
      ? `\n\n⚠️ WEB SEARCH OBRIGATÓRIO:\n- Você DEVE chamar searchWeb com termos relevantes da instrução.\n- Se searchWeb retornar URLs úteis, chame fetchWebPage para ler o conteúdo.\n- FLUXO: banco local PRIMEIRO → searchWeb DEPOIS → fetchWebPage se necessário → CRUZE os dados.\n- Quando banco local e web conflitarem, a WEB é mais confiável (banco pode estar desatualizado).\n- Se você NÃO chamar searchWeb, a missão será REJEITADA.`
      : '';
    const phase1Prompt = `INSTRUÇÃO: ${instruction}\n\nFASE 1 — COLETA DE DADOS:\nChame TODAS as tools de dados disponíveis para coletar informações necessárias: [${dataToolNames.join(', ')}]\nNÃO escreva texto longo. Apenas colete os dados. Após receber os dados, escreva um RESUMO BREVE dos dados coletados.\nNUNCA invente dados.${webSearchPhase1}`;

    console.log(`[BaseAgent:${this.config.id}] TWO-PHASE: Phase 1 — collecting data with ${dataToolNames.length} tools: [${dataToolNames.join(', ')}]`);

    let phase1Result;
    try {
      phase1Result = await generateText({
        model: this.model,
        system: this.config.systemPrompt,
        prompt: phase1Prompt,
        temperature: this.config.model === 'opus-4.6' ? 0.3 : 0.5,
        tools: dataToolsOnly as Parameters<typeof generateText>[0]['tools'],
        stopWhen: stepCountIs(8),
      });
    } catch (err) {
      console.error(`[BaseAgent:${this.config.id}] Phase 1 FAILED:`, err instanceof Error ? err.message : err);
      throw err;
    }

    // Collect tool results from Phase 1
    const phase1ToolResults: ToolCallResult[] = [];
    if (phase1Result.steps) {
      for (const step of phase1Result.steps) {
        // Emit tool call events
        if (step.toolCalls && this.config.onToolCall) {
          for (const tc of step.toolCalls) {
            try {
              this.config.onToolCall(tc.toolName, ((tc as Record<string, unknown>).input ?? {}) as Record<string, unknown>);
            } catch { /* ignore */ }
          }
        }
        if (step.toolResults) {
          for (const tr of step.toolResults) {
            const raw = tr as Record<string, unknown>;
            phase1ToolResults.push({
              toolName: (raw.toolName ?? raw.name ?? 'unknown') as string,
              args: (raw.args ?? raw.input ?? {}) as Record<string, unknown>,
              result: raw.result ?? raw.output ?? raw.content ?? raw,
            });
          }
        }
      }
    }

    console.log(`[BaseAgent:${this.config.id}] Phase 1 done: ${phase1ToolResults.length} tool results, text: ${phase1Result.text.length} chars`);

    // Build data section from Phase 1 results
    const collectedData = phase1ToolResults.length > 0
      ? phase1ToolResults
          .map((tr) => {
            let resultStr: string;
            try {
              resultStr = typeof tr.result === 'string' ? tr.result : JSON.stringify(tr.result, null, 2);
            } catch {
              resultStr = String(tr.result);
            }
            return `### [${tr.toolName}]\n${resultStr}`;
          })
          .join('\n\n')
      : '(nenhum dado coletado)';

    // Log Phase 1 cost
    if (phase1Result.usage) {
      logCost({
        agentId: this.config.id,
        model: this.config.model,
        tokensInput: phase1Result.usage.inputTokens ?? 0,
        tokensOutput: phase1Result.usage.outputTokens ?? 0,
      }).catch(() => {});
    }

    // --- PHASE 2: Force action tool call ---
    const actionToolsOnly: Record<string, unknown> = {};
    for (const name of actionToolNames) {
      if (allTools[name]) actionToolsOnly[name] = allTools[name];
    }

    // Build phase 2 prompt with all collected data
    let phase2Prompt: string;
    if (primaryAction === 'publishArticle') {
      phase2Prompt = `INSTRUÇÃO ORIGINAL: ${instruction}

DADOS COLETADOS (use SOMENTE estes dados — NUNCA invente):
${collectedData}

ANÁLISE DO AGENTE:
${phase1Result.text.slice(0, 3000)}

AÇÃO OBRIGATÓRIA: Chame publishArticle AGORA com os seguintes argumentos:
- title: título do artigo em PT-BR (max 80 chars, gancho forte)
- subtitle: subtítulo descritivo
- body: artigo COMPLETO de 500+ palavras em markdown, usando SOMENTE dados reais acima
- tags: array de tags relevantes (ex: ["UFC", "Preview", "Strickland", "Hernandez"])

REGRAS DE ESTILO OBRIGATÓRIAS:
- ZERO EMOJIS em todo o artigo. NUNCA use 📊🥊🔥🎯🏆🔮📺 ou qualquer emoji
- Subheadings (##) em CAIXA ALTA, sem emojis. Ex: "## COMPARAÇÃO TÉCNICA", "## ANÁLISE TÁTICA"
- Estilo Bleacher Report: ousado, direto, opiniões fortes com personalidade
- Fale COM o leitor ("Você sabe o que acontece quando...")
- Use **negrito** para nomes, stats e frases de impacto
- Tabelas limpas, sem decoração — só dados
- Hot takes com dados pra sustentar
- Assinatura final: "Lucas Braga — UFC News"

Baseie o artigo inteiramente nos DADOS COLETADOS acima. NÃO invente estatísticas.`;
    } else if (primaryAction === 'createPoll') {
      phase2Prompt = `INSTRUÇÃO ORIGINAL: ${instruction}

DADOS COLETADOS:
${collectedData}

AÇÃO OBRIGATÓRIA: Chame createPoll AGORA com question e options baseados nos dados acima.`;
    } else {
      phase2Prompt = `INSTRUÇÃO ORIGINAL: ${instruction}

DADOS COLETADOS:
${collectedData}

AÇÃO OBRIGATÓRIA: Chame ${primaryAction} AGORA com os argumentos necessários baseados nos dados coletados.`;
    }

    console.log(`[BaseAgent:${this.config.id}] TWO-PHASE: Phase 2 — forcing ${primaryAction} with toolChoice`);

    let phase2Result;
    try {
      phase2Result = await generateText({
        model: this.model,
        system: this.config.systemPrompt,
        prompt: phase2Prompt,
        temperature: 0.4,
        tools: actionToolsOnly as Parameters<typeof generateText>[0]['tools'],
        toolChoice: { type: 'tool', toolName: primaryAction },
        stopWhen: stepCountIs(2),
      });
    } catch (err) {
      console.error(`[BaseAgent:${this.config.id}] Phase 2 FAILED:`, err instanceof Error ? err.message : err);
      throw err;
    }

    // Collect Phase 2 tool results
    const phase2ToolResults: ToolCallResult[] = [];
    if (phase2Result.steps) {
      for (const step of phase2Result.steps) {
        if (step.toolCalls) {
          for (const tc of step.toolCalls) {
            console.log(`[BaseAgent:${this.config.id}] Phase 2 called: ${tc.toolName}`);
            if (this.config.onToolCall) {
              try {
                this.config.onToolCall(tc.toolName, ((tc as Record<string, unknown>).input ?? {}) as Record<string, unknown>);
              } catch { /* ignore */ }
            }
          }
        }
        if (step.toolResults) {
          for (const tr of step.toolResults) {
            const raw = tr as Record<string, unknown>;
            phase2ToolResults.push({
              toolName: (raw.toolName ?? raw.name ?? 'unknown') as string,
              args: (raw.args ?? raw.input ?? {}) as Record<string, unknown>,
              result: raw.result ?? raw.output ?? raw.content ?? raw,
            });
          }
        }
      }
    }

    const actionCalled = phase2ToolResults.some(tr => ACTION_TOOL_NAMES.has(tr.toolName));
    console.log(`[BaseAgent:${this.config.id}] Phase 2 done: ${primaryAction} called = ${actionCalled}, ${phase2ToolResults.length} tool results`);

    // Log Phase 2 cost
    if (phase2Result.usage) {
      logCost({
        agentId: this.config.id,
        model: this.config.model,
        tokensInput: phase2Result.usage.inputTokens ?? 0,
        tokensOutput: phase2Result.usage.outputTokens ?? 0,
      }).catch(() => {});
    }

    // Merge all tool results
    const allToolResults = [...phase1ToolResults, ...phase2ToolResults];
    const toolDataSection = allToolResults
      .map((tr) => {
        let resultStr: string;
        try {
          resultStr = typeof tr.result === 'string' ? tr.result : JSON.stringify(tr.result, null, 2);
        } catch {
          resultStr = String(tr.result);
        }
        return `### [Tool: ${tr.toolName}]\n${resultStr}`;
      })
      .join('\n\n');

    // Build final text: Phase 2 text + raw tool data
    let finalText = phase2Result.text || phase1Result.text;
    if (allToolResults.length > 0) {
      finalText = (finalText ? finalText + '\n\n' : '') + '---\n## DADOS REAIS (output das tools executadas)\n\n' + toolDataSection;
    }

    // Combine usage from both phases
    const totalInput = (phase1Result.usage?.inputTokens ?? 0) + (phase2Result.usage?.inputTokens ?? 0);
    const totalOutput = (phase1Result.usage?.outputTokens ?? 0) + (phase2Result.usage?.outputTokens ?? 0);

    return {
      text: finalText,
      usage: { inputTokens: totalInput, outputTokens: totalOutput },
      toolResults: allToolResults.length > 0 ? allToolResults : undefined,
    };
  }

  /**
   * Validate agent output against actual tool data using Haiku (cheap & fast).
   * Returns { valid, score, issues } where score 0-1 and issues is a string.
   */
  private async validateOutput(
    agentText: string,
    toolResults: ToolCallResult[],
    toolDataSection: string,
  ): Promise<{ valid: boolean; score: number; issues: string }> {
    const HAIKU = anthropic(MODEL_MAP['haiku-4.5']);

    const validationResult = await generateText({
      model: HAIKU,
      system: 'Voce e um validador de qualidade. Sua funcao e comparar o texto de um agente AI com os dados reais retornados pelas tools. Responda SOMENTE em JSON valido.',
      prompt: `TEXTO DO AGENTE (a validar):
${agentText.slice(0, 3000)}

DADOS REAIS DAS TOOLS:
${toolDataSection.slice(0, 4000)}

TOOLS CHAMADAS: ${toolResults.map(t => t.toolName).join(', ')}

VALIDE:
1. O agente cita numeros/dados que EXISTEM nos dados reais das tools?
2. O agente inventou dados que NAO aparecem nos outputs das tools?
3. As conclusoes fazem sentido dado os dados reais?
4. O agente reportou falsos positivos ou falsos negativos?

RESPONDA EM JSON:
{
  "score": 0.0 a 1.0 (1.0 = perfeitamente alinhado com os dados),
  "valid": true/false (true se score >= 0.7),
  "issues": "lista de problemas encontrados ou 'nenhum' se tudo ok"
}`,
      temperature: 0,
    });

    // Log validation cost
    if (validationResult.usage) {
      logCost({
        agentId: this.config.id,
        model: 'haiku-4.5',
        tokensInput: validationResult.usage.inputTokens ?? 0,
        tokensOutput: validationResult.usage.outputTokens ?? 0,
      }).catch(() => {});
    }

    try {
      const jsonText = validationResult.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(jsonText);
      return {
        valid: parsed.valid ?? parsed.score >= 0.7,
        score: typeof parsed.score === 'number' ? parsed.score : 0.5,
        issues: parsed.issues || 'unknown',
      };
    } catch {
      // If Haiku returns bad JSON, assume valid (don't block on validation failure)
      console.warn(`[BaseAgent:${this.config.id}] Validation returned non-JSON, assuming valid`);
      return { valid: true, score: 0.8, issues: 'validation parse error — assuming valid' };
    }
  }
}
