import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { prisma } from '@/lib/prisma';
import { BaseAgent, type AgentModelKey } from './agents/base-agent';
import { getAgentTools } from './agents';
import { awardTaskXP } from './xp-engine';
import { checkCostCap, logCost } from './cost-guard';
import { analyzeForRemediation } from './remediation';

const CEO_MODEL = anthropic('claude-opus-4-6');

// Action types that are auto-approved (low risk, no human review needed)
const AUTO_APPROVE_ACTIONS = new Set([
  'process_event_results',
  'open_arena_predictions',
  'finalize_duels',
  'sync_event_cards',
  'update_fight_results',
  'backfill_fighter_data',
]);

// ==========================================
// TYPES
// ==========================================

interface Delegation {
  agentId: string;
  instruction: string;
  priority: 'high' | 'medium' | 'low';
  requiresApproval: boolean;
  approvalReason?: string;
  dependsOn: string[];
}

interface CeoAnalysis {
  analysis: string;
  delegations: Delegation[];
  estimatedTime: string;
  risks: string[];
}

export interface PromptEvent {
  type: 'ceo_thinking' | 'ceo_analysis' | 'task_created' | 'agent_start' | 'agent_done' | 'agent_error' | 'approval_needed' | 'approval_resolved' | 'consolidating' | 'done' | 'agent_tool_call';
  data: Record<string, unknown>;
}

// ==========================================
// APPROVAL GATE — polls DB until admin approves/rejects
// ==========================================

const APPROVAL_POLL_MS = 3000;
const APPROVAL_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

async function waitForApproval(
  approvalId: string,
  onEvent?: (event: PromptEvent) => void,
): Promise<'approved' | 'rejected' | 'timeout'> {
  const start = Date.now();
  let pollCount = 0;
  while (Date.now() - start < APPROVAL_TIMEOUT_MS) {
    const approval = await prisma.approval.findUnique({
      where: { id: approvalId },
      select: { status: true },
    });
    if (approval?.status === 'approved') return 'approved';
    if (approval?.status === 'rejected') return 'rejected';

    // Send heartbeat every ~15s to keep SSE alive (every 5 polls)
    pollCount++;
    if (pollCount % 5 === 0 && onEvent) {
      onEvent({ type: 'consolidating' as PromptEvent['type'], data: { message: `Aguardando aprovação... (${Math.floor((Date.now() - start) / 1000)}s)` } });
    }

    await new Promise((r) => setTimeout(r, APPROVAL_POLL_MS));
  }
  return 'timeout';
}

// ==========================================
// LOGGING HELPER
// ==========================================

async function logActivity(
  agentId: string,
  level: string,
  message: string,
  metadata?: Record<string, unknown>,
) {
  try {
    await prisma.agentLog.create({
      data: {
        agentId,
        level,
        message,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch {
    // Don't let logging failures break the flow
  }
}

// ==========================================
// CEO ORCHESTRATOR
// ==========================================

export async function processCompanyPrompt(
  prompt: string,
  onEvent: (event: PromptEvent) => void,
) {
  // 1. Save prompt to DB
  const companyPrompt = await prisma.companyPrompt.create({
    data: { userId: 'admin', prompt, status: 'processing' },
  });

  onEvent({ type: 'ceo_thinking', data: { promptId: companyPrompt.id } });

  // Log: CEO received prompt
  await logActivity('ceo', 'info', `Recebeu prompt: "${prompt.substring(0, 80)}${prompt.length > 80 ? '...' : ''}"`);

  // 2. Reset stale error agents back to idle before fetching
  await prisma.agent.updateMany({
    where: { status: 'error' },
    data: { status: 'idle' },
  });

  // Fetch available agents from DB (idle or active)
  const agents = await prisma.agent.findMany({
    where: { status: { in: ['active', 'idle'] } },
  });

  // 3. CEO analyzes the prompt
  const ceoAgent = agents.find((a) => a.id === 'ceo');
  if (!ceoAgent) throw new Error('CEO agent not found in database');

  // Set CEO active while analyzing
  await prisma.agent.update({
    where: { id: 'ceo' },
    data: { status: 'active', lastRunAt: new Date() },
  });

  const ceoResult = await generateText({
    model: CEO_MODEL,
    system: ceoAgent.systemPrompt,
    prompt: `
PROMPT DO ADMIN: "${prompt}"

EQUIPE DISPONIVEL (com suas TOOLS reais):
${agents
  .filter((a) => a.id !== 'ceo')
  .map((a) => {
    const agentToolNames = Object.keys(getAgentTools(a.id));
    return `- ${a.id} | ${a.humanName} (${a.codename}): ${a.desc} [STATUS: ${a.status}] [TOOLS: ${agentToolNames.length > 0 ? agentToolNames.join(', ') : 'nenhuma'}]`;
  })
  .join('\n')}

Analise o prompt e decida:
1. Quais agentes devem trabalhar nesta tarefa?
2. Em que ordem? Use dependsOn para criar PIPELINE quando um agente precisa dos dados de outro.
3. Que instrucoes especificas cada um recebe?
4. Quais acoes precisam de aprovacao humana?

REGRA CRITICA — PIPELINE DE DADOS:
- Se um agente PRECISA dos resultados de outro para trabalhar, use "dependsOn" com o agentId do agente anterior.
- Exemplo: Sofia coleta dados → Beatriz compila stats (dependsOn: ["analytics-dir"]) → Rafael analisa (dependsOn: ["stats-compiler"])
- O sistema AUTOMATICAMENTE injeta os outputs dos agentes anteriores como contexto para os dependentes.
- Se os agentes podem trabalhar de forma INDEPENDENTE, deixe dependsOn vazio para rodar em paralelo.
- NUNCA delegue tarefas sequenciais com dependsOn vazio — isso faz eles rodarem em paralelo SEM dados!

REGRA CRITICA — TOOLS:
- Na "instruction", SEMPRE liste QUAIS TOOLS o agente deve chamar.
- NUNCA delegue sem especificar quais tools devem ser usadas.
- Se um agente nao tem a tool necessaria, NAO delegue para ele.

REGRA CRITICA — PUBLICAR CONTEUDO:
- Quando delegar ESCRITA + PUBLICAÇÃO de artigo ao news-writer ou translator:
  - A instruction DEVE dizer EXPLICITAMENTE: "Escreva um artigo COMPLETO de 500+ palavras em [idioma]. Depois chame publishArticle com titulo, subtitulo e corpo completo para publicar."
  - Especifique: tema, angulo, idioma, e que o artigo deve ser COMPLETO (nao resumo).
  - O agente DEVE chamar publishArticle no final — sem isso, o artigo NAO sera publicado.
- Quando delegar CRIAÇÃO de poll ao social-engager:
  - A instruction DEVE dizer: "Crie uma enquete e chame createPoll para publicar."

RESPONDA SOMENTE EM JSON VALIDO (sem markdown, sem backticks):
{
  "analysis": "sua analise do prompt em 1-2 frases",
  "delegations": [
    {
      "agentId": "id-do-agente-exato-da-lista",
      "instruction": "instrucao especifica INCLUINDO quais tools chamar",
      "priority": "high | medium | low",
      "requiresApproval": false,
      "approvalReason": "",
      "dependsOn": ["agentId-do-agente-que-precisa-completar-antes"]
    }
  ],
  "estimatedTime": "tempo estimado",
  "risks": ["riscos identificados"]
}`,
    temperature: 0.3,
  });

  // 4. Parse CEO analysis
  let analysis: CeoAnalysis;
  try {
    const jsonText = ceoResult.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    analysis = JSON.parse(jsonText);
  } catch {
    analysis = {
      analysis: ceoResult.text.slice(0, 200),
      delegations: [],
      estimatedTime: 'N/A',
      risks: ['CEO returned non-JSON response'],
    };
  }

  // Log CEO analysis cost
  if (ceoResult.usage) {
    logCost({
      agentId: 'ceo',
      model: 'opus-4.6',
      tokensInput: ceoResult.usage.inputTokens ?? 0,
      tokensOutput: ceoResult.usage.outputTokens ?? 0,
    }).catch(() => {});
  }

  // CEO done analyzing → back to idle + increment tasks
  await prisma.agent.update({
    where: { id: 'ceo' },
    data: { status: 'idle', tasksCompleted: { increment: 1 } },
  });

  // Log: CEO analysis complete
  await logActivity('ceo', 'info', `Analise completa. Delegando para ${analysis.delegations.length} agente(s).`);

  onEvent({
    type: 'ceo_analysis',
    data: {
      promptId: companyPrompt.id,
      analysis: analysis.analysis,
      delegations: analysis.delegations.map((d) => ({
        agentId: d.agentId,
        priority: d.priority,
        requiresApproval: d.requiresApproval,
        dependsOn: d.dependsOn || [],
      })),
      estimatedTime: analysis.estimatedTime,
      risks: analysis.risks,
    },
  });

  // 5. Create tasks for each delegation
  const taskEntries: Array<{ taskId: string; delegation: Delegation }> = [];

  for (const delegation of analysis.delegations) {
    const agentExists = agents.find((a) => a.id === delegation.agentId);
    if (!agentExists) continue;

    const task = await prisma.agentTask.create({
      data: {
        agentId: delegation.agentId,
        type: 'delegated',
        input: delegation.instruction,
        status: 'pending',
      },
    });

    taskEntries.push({ taskId: task.id, delegation });

    // Log: task delegated
    await logActivity(
      delegation.agentId,
      'info',
      `Tarefa recebida: "${delegation.instruction.substring(0, 100)}${delegation.instruction.length > 100 ? '...' : ''}"`,
      { taskId: task.id },
    );

    onEvent({
      type: 'task_created',
      data: {
        taskId: task.id,
        agentId: delegation.agentId,
        agentName: agentExists.humanName,
        agentCodename: agentExists.codename,
        instruction: delegation.instruction,
        priority: delegation.priority,
      },
    });
  }

  // 6. Update prompt with CEO analysis
  await prisma.companyPrompt.update({
    where: { id: companyPrompt.id },
    data: {
      ceoAnalysis: JSON.stringify(analysis),
      tasks: taskEntries.map((t) => t.taskId),
      status: 'delegated',
    },
  });

  // 7. Execute tasks in dependency waves
  // Build a map of agentId -> taskEntry for dependency resolution
  const taskByAgent = new Map<string, { taskId: string; delegation: Delegation }>();
  for (const t of taskEntries) {
    taskByAgent.set(t.delegation.agentId, t);
  }

  // Separate into waves based on dependencies
  const executed = new Set<string>(); // agentIds that have been executed
  const completedOutputs = new Map<string, string>(); // agentId -> output text

  // Keep executing waves until all tasks are done
  let remaining = [...taskEntries];
  while (remaining.length > 0) {
    // Find tasks whose dependencies are all satisfied
    const ready = remaining.filter((t) => {
      const deps = t.delegation.dependsOn || [];
      return deps.every((depId) => executed.has(depId));
    });

    if (ready.length === 0) {
      // No tasks ready but some remaining = circular dependency or missing dep
      // Execute remaining sequentially as fallback
      for (const t of remaining) {
        const enriched = enrichWithContext(t.delegation, completedOutputs);
        await executeAgentTask(t.taskId, enriched, agents, onEvent);
        executed.add(t.delegation.agentId);
        // Collect output
        const completedTask = await prisma.agentTask.findUnique({ where: { id: t.taskId }, select: { output: true, status: true } });
        if (completedTask?.output && completedTask.status !== 'failed') {
          completedOutputs.set(t.delegation.agentId, completedTask.output);
        }
      }
      break;
    }

    // Execute ready tasks in parallel, enriched with context from previous waves
    await Promise.all(
      ready.map(async (t) => {
        const enriched = enrichWithContext(t.delegation, completedOutputs);
        await executeAgentTask(t.taskId, enriched, agents, onEvent);
      }),
    );

    // Handle approval gates for this wave
    for (const t of ready) {
      let task = await prisma.agentTask.findUnique({
        where: { id: t.taskId },
        select: { status: true, output: true },
      });
      const agentData = agents.find((a) => a.id === t.delegation.agentId);
      let taskFailed = false;

      // Case 1: Tool-level approval (e.g. publishArticle returned _requiresApproval)
      if (task?.status === 'awaiting_approval') {
        const pendingApprovals = await prisma.approval.findMany({
          where: { taskId: t.taskId, status: 'pending' },
        });
        for (const pa of pendingApprovals) {
          onEvent({
            type: 'approval_needed',
            data: {
              approvalId: pa.id,
              taskId: t.taskId,
              agentId: t.delegation.agentId,
              agentName: agentData?.humanName || t.delegation.agentId,
              agentCodename: agentData?.codename || '',
              actionType: pa.actionType,
              description: pa.description,
              payload: pa.payload,
              requiresApproval: true,
            },
          });
        }
        // Wait for all pending approvals to resolve
        for (const pa of pendingApprovals) {
          const result = await waitForApproval(pa.id, onEvent);
          onEvent({
            type: 'approval_resolved',
            data: {
              approvalId: pa.id,
              taskId: t.taskId,
              agentId: t.delegation.agentId,
              agentName: agentData?.humanName || t.delegation.agentId,
              result,
            },
          });
          // If rejected/timeout, fail the task and stop waiting for remaining approvals
          if (result === 'rejected' || result === 'timeout') {
            await prisma.agentTask.update({
              where: { id: t.taskId },
              data: {
                status: 'failed',
                error: result === 'timeout' ? 'Timeout: aprovação não recebida' : 'Ação rejeitada pelo admin',
                completedAt: new Date(),
              },
            });
            taskFailed = true;
            break;
          }
        }
        // Re-read task after approvals resolved
        task = await prisma.agentTask.findUnique({
          where: { id: t.taskId },
          select: { status: true, output: true },
        });
      }

      // Case 2: Delegation-level approval (CEO flagged requiresApproval on this delegation)
      // Skip if task already failed from Case 1 or if task was already handled as awaiting_approval
      if (!taskFailed && t.delegation.requiresApproval && task?.status === 'completed' && task.output) {
        // Revert tasksCompleted that was incremented in executeAgentTask
        // (the approval route will re-increment it when admin approves)
        await prisma.agent.update({
          where: { id: t.delegation.agentId },
          data: { tasksCompleted: { decrement: 1 } },
        });

        const approval = await prisma.approval.create({
          data: {
            taskId: t.taskId,
            agentId: t.delegation.agentId,
            actionType: 'review_output',
            description: `Revisar output de ${agentData?.humanName || t.delegation.agentId}${t.delegation.approvalReason ? `: ${t.delegation.approvalReason}` : ''}`,
            payload: JSON.stringify({ output: task.output.slice(0, 10000) }),
            status: 'pending',
          },
        });

        await prisma.agentTask.update({
          where: { id: t.taskId },
          data: { status: 'awaiting_approval' },
        });

        onEvent({
          type: 'approval_needed',
          data: {
            approvalId: approval.id,
            taskId: t.taskId,
            agentId: t.delegation.agentId,
            agentName: agentData?.humanName || t.delegation.agentId,
            agentCodename: agentData?.codename || '',
            actionType: 'review_output',
            description: approval.description,
            output: task.output,
            requiresApproval: true,
          },
        });

        const result = await waitForApproval(approval.id, onEvent);
        onEvent({
          type: 'approval_resolved',
          data: {
            approvalId: approval.id,
            taskId: t.taskId,
            agentId: t.delegation.agentId,
            agentName: agentData?.humanName || t.delegation.agentId,
            result,
          },
        });

        if (result === 'rejected' || result === 'timeout') {
          await prisma.agentTask.update({
            where: { id: t.taskId },
            data: {
              status: 'failed',
              error: result === 'timeout' ? 'Timeout: aprovação não recebida em 30 minutos' : 'Output rejeitado pelo admin',
              completedAt: new Date(),
            },
          });
          taskFailed = true;
        }
      }

      // Collect final output for next wave
      executed.add(t.delegation.agentId);
      if (!taskFailed) {
        const finalTask = await prisma.agentTask.findUnique({
          where: { id: t.taskId },
          select: { output: true, status: true },
        });
        if (finalTask?.output && finalTask.status !== 'failed') {
          completedOutputs.set(t.delegation.agentId, finalTask.output);
        }
      }
    }

    // Remove executed tasks from remaining
    remaining = remaining.filter((t) => !executed.has(t.delegation.agentId));
  }

  // 8. Build consolidated summary via CEO
  const completedTasks = await prisma.agentTask.findMany({
    where: { id: { in: taskEntries.map((t) => t.taskId) } },
    include: { agent: true },
  });

  const successTasks = completedTasks.filter((t) => (t.status === 'completed' || t.status === 'awaiting_approval') && t.output);
  const failedTasks = completedTasks.filter((t) => t.status === 'failed');
  const awaitingTasks = completedTasks.filter((t) => t.status === 'awaiting_approval');

  let summary: string;

  if (successTasks.length > 0) {
    onEvent({
      type: 'consolidating',
      data: { message: 'CEO consolidando resultados de todos os agentes...' },
    });

    await prisma.agent.update({
      where: { id: 'ceo' },
      data: { status: 'active' },
    });

    await logActivity('ceo', 'info', 'Iniciou consolidacao dos resultados.');

    const agentOutputs = successTasks
      .map((t) => `=== ${t.agent.humanName} (${t.agent.codename}) ===\n${t.output}`)
      .join('\n\n---\n\n');

    const failedInfo = failedTasks.length > 0
      ? `\n\nAGENTES QUE FALHARAM:\n${failedTasks.map((t) => `- ${t.agent.humanName}: ${t.error}`).join('\n')}`
      : '';

    const awaitingInfo = awaitingTasks.length > 0
      ? `\n\nACOES AGUARDANDO APROVACAO DO ADMIN:\n${awaitingTasks.map((t) => `- ${t.agent.humanName}: aguardando aprovacao`).join('\n')}`
      : '';

    try {
      const consolidation = await generateText({
        model: CEO_MODEL,
        system: ceoAgent.systemPrompt,
        prompt: `
TAREFA: Consolidar os resultados de todos os agentes em um RELATORIO UNICO e coeso.

PROMPT ORIGINAL DO ADMIN: "${prompt}"

RESULTADOS DOS AGENTES (${successTasks.length} completaram, ${failedTasks.length} falharam):

${agentOutputs}
${failedInfo}
${awaitingInfo}

FORMATO OBRIGATORIO DO RELATORIO:

## RESUMO EXECUTIVO
[2-3 linhas com o resultado principal]

## RESULTADOS
[Use TABELAS markdown para dados comparativos]
[Use **bold** para destacar numeros importantes]

## PROBLEMAS ENCONTRADOS
[Lista com bullets, cada item com severidade: Critico | Alto | Medio]

## PROXIMOS PASSOS
[Acoes recomendadas priorizadas]

## CREDITOS
| Agente | Contribuicao |
|--------|-------------|
[1 linha por agente que participou]

REGRAS:
- Use tabelas markdown (GFM) sempre que comparar dados
- Use **bold** em numeros e metricas importantes
- Maximo 1 pagina (nao repetir informacoes)
- NAO liste output bruto dos agentes — sintetize
- Organize por temas/areas, nao por agente
- Se houver acoes aguardando aprovacao, mencione-as claramente na secao PROXIMOS PASSOS
- Escreva em PT-BR

Escreva o relatorio em markdown formatado. NAO use JSON.`,
        temperature: 0.3,
      });

      summary = consolidation.text;

      await prisma.agentTask.create({
        data: {
          agentId: 'ceo',
          type: 'consolidation',
          input: `Consolidar resultados de ${successTasks.length} agentes para: "${prompt.slice(0, 200)}"`,
          output: summary,
          status: 'completed',
          completedAt: new Date(),
          modelUsed: 'opus-4.6',
          tokensInput: consolidation.usage?.inputTokens,
          tokensOutput: consolidation.usage?.outputTokens,
        },
      });

      // Log CEO consolidation cost
      if (consolidation.usage) {
        logCost({
          agentId: 'ceo',
          model: 'opus-4.6',
          tokensInput: consolidation.usage.inputTokens ?? 0,
          tokensOutput: consolidation.usage.outputTokens ?? 0,
        }).catch(() => {});
      }

      await logActivity('ceo', 'info', `Consolidacao completa. ${successTasks.length} agentes contribuiram.`);
    } catch {
      summary = successTasks
        .map((t) => `**${t.agent.humanName} (${t.agent.codename}):**\n${(t.output ?? '').slice(0, 500)}`)
        .join('\n\n---\n\n');
    }

    await prisma.agent.update({
      where: { id: 'ceo' },
      data: { status: 'idle', tasksCompleted: { increment: 1 } },
    });
  } else {
    summary = 'Nenhum agente completou tarefas com sucesso.';
  }

  await prisma.companyPrompt.update({
    where: { id: companyPrompt.id },
    data: { status: 'completed', summary, completedAt: new Date() },
  });

  // CEO Auto-Remediation: analyze the consolidated report for actionable problems
  let remediationPlanId: string | null = null;
  if (successTasks.length > 0 && summary.length > 100) {
    try {
      remediationPlanId = await analyzeForRemediation(summary, companyPrompt.id);
      if (remediationPlanId) {
        await logActivity('ceo', 'info', `Remediation plan criado: ${remediationPlanId}`);
      }
    } catch (err) {
      console.warn('[Orchestrator] Remediation analysis failed:', err instanceof Error ? err.message : err);
    }
  }

  onEvent({
    type: 'done',
    data: {
      promptId: companyPrompt.id,
      summary,
      tasksCompleted: successTasks.length,
      tasksFailed: failedTasks.length,
      remediationPlanId,
    },
  });
}

// ==========================================
// CONTEXT INJECTION FOR PIPELINE
// ==========================================

function enrichWithContext(
  delegation: Delegation,
  completedOutputs: Map<string, string>,
): Delegation {
  const deps = delegation.dependsOn || [];
  if (deps.length === 0 || completedOutputs.size === 0) return delegation;

  // Collect outputs from dependencies
  const contextParts: string[] = [];
  for (const depAgentId of deps) {
    const output = completedOutputs.get(depAgentId);
    if (output) {
      contextParts.push(`[Output de ${depAgentId}]:\n${output}`);
    }
  }

  // Also include any other completed outputs as background context
  for (const [agentId, output] of completedOutputs) {
    if (!deps.includes(agentId)) {
      contextParts.push(`[Output de ${agentId} (background)]:\n${output.slice(0, 500)}`);
    }
  }

  if (contextParts.length === 0) return delegation;

  const context = `CONTEXTO — RESULTADOS DOS AGENTES ANTERIORES:\n${contextParts.join('\n\n---\n\n')}\n\n---\n\nSUA TAREFA (use os dados acima como base):\n`;

  return {
    ...delegation,
    instruction: context + delegation.instruction,
  };
}

// ==========================================
// AGENT TASK EXECUTION
// ==========================================

async function executeAgentTask(
  taskId: string,
  delegation: Delegation,
  agents: Array<{ id: string; humanName: string; codename: string; model: string; systemPrompt: string }>,
  onEvent: (event: PromptEvent) => void,
) {
  const agentData = agents.find((a) => a.id === delegation.agentId);
  if (!agentData) return;

  // Cost cap check — block execution if daily limit reached
  const costStatus = await checkCostCap();
  if (costStatus.blocked) {
    await logActivity(delegation.agentId, 'warning', `BLOCKED by cost cap: $${costStatus.totalToday}/$${costStatus.limit} used today`);
    await prisma.agentTask.update({
      where: { id: taskId },
      data: { status: 'failed', error: `Cost cap reached: $${costStatus.totalToday}/$${costStatus.limit}`, completedAt: new Date() },
    });
    onEvent({
      type: 'agent_error',
      data: { taskId, agentId: delegation.agentId, agentName: agentData.humanName, error: `Cost cap reached ($${costStatus.totalToday}/$${costStatus.limit})` },
    });
    return;
  }

  onEvent({
    type: 'agent_start',
    data: {
      taskId,
      agentId: delegation.agentId,
      agentName: agentData.humanName,
      agentCodename: agentData.codename,
    },
  });

  // Mark task as running
  await prisma.agentTask.update({
    where: { id: taskId },
    data: { status: 'running', modelUsed: agentData.model },
  });

  // Update agent status to active + lastRunAt
  await prisma.agent.update({
    where: { id: delegation.agentId },
    data: { status: 'active', lastRunAt: new Date() },
  });

  // Log: agent started
  await logActivity(delegation.agentId, 'info', 'Iniciou execucao...', { taskId });

  try {
    const startTime = Date.now();

    // Get agent-specific tools
    const agentTools = getAgentTools(agentData.id);

    const agent = new BaseAgent({
      id: agentData.id,
      humanName: agentData.humanName,
      codename: agentData.codename,
      model: agentData.model as AgentModelKey,
      systemPrompt: agentData.systemPrompt,
      tools: agentTools,
      onToolCall: (toolName: string, args: Record<string, unknown>) => {
        // Emit SSE event for real-time tool call visibility
        const argsPreview = Object.entries(args)
          .map(([k, v]) => `${k}: ${typeof v === 'string' ? v.slice(0, 50) : JSON.stringify(v).slice(0, 50)}`)
          .join(', ')
          .slice(0, 100);
        onEvent({
          type: 'agent_tool_call',
          data: {
            taskId,
            agentId: delegation.agentId,
            agentName: agentData.humanName,
            agentCodename: agentData.codename,
            toolName,
            argsPreview,
          },
        });
      },
    });

    const result = await agent.execute(delegation.instruction);
    const durationMs = Date.now() - startTime;

    // Check if any tool result requires approval
    const allActions = result.toolResults?.filter(
      (tr) => {
        const res = tr.result as Record<string, unknown> | null;
        return res && res._requiresApproval === true;
      }
    ) || [];

    // Separate auto-approved vs needs-human-approval
    const autoApproved = allActions.filter((tr) => {
      const res = tr.result as Record<string, unknown>;
      return AUTO_APPROVE_ACTIONS.has(res.actionType as string);
    });
    const pendingActions = allActions.filter((tr) => {
      const res = tr.result as Record<string, unknown>;
      return !AUTO_APPROVE_ACTIONS.has(res.actionType as string);
    });

    // Log auto-approved actions (transparency)
    for (const action of autoApproved) {
      const actionResult = action.result as Record<string, unknown>;
      await prisma.approval.create({
        data: {
          taskId,
          agentId: delegation.agentId,
          actionType: (actionResult.actionType as string) || 'unknown',
          description: `[AUTO-APPROVED] ${(actionResult.description as string) || ''}`,
          payload: JSON.stringify(actionResult.payload || {}),
          status: 'approved',
          reviewedBy: 'system:auto-approve',
          reviewedAt: new Date(),
          reviewNote: 'Auto-approved: low-risk action',
        },
      });
      await logActivity(delegation.agentId, 'info', `AUTO-APPROVED: ${actionResult.actionType}`, { taskId });
    }

    if (pendingActions.length > 0) {
      // Create approval entries for each action
      for (const action of pendingActions) {
        const actionResult = action.result as Record<string, unknown>;
        const approval = await prisma.approval.create({
          data: {
            taskId,
            agentId: delegation.agentId,
            actionType: (actionResult.actionType as string) || 'unknown',
            description: (actionResult.description as string) || 'Acao pendente de aprovacao',
            payload: JSON.stringify(actionResult.payload || {}),
            status: 'pending',
          },
        });

        // Log: awaiting approval
        await logActivity(
          delegation.agentId,
          'info',
          `AGUARDANDO APROVACAO: ${actionResult.actionType}`,
          { approvalId: approval.id, taskId },
        );
      }

      // Task is awaiting approval
      await prisma.agentTask.update({
        where: { id: taskId },
        data: {
          status: 'awaiting_approval',
          output: result.text,
          durationMs,
          tokensInput: result.usage?.inputTokens,
          tokensOutput: result.usage?.outputTokens,
        },
      });

      // Agent back to idle
      await prisma.agent.update({
        where: { id: delegation.agentId },
        data: { status: 'idle', lastRunAt: new Date() },
      });

      // Log
      await logActivity(
        delegation.agentId,
        'info',
        `Completou em ${(durationMs / 1000).toFixed(1)}s — ${pendingActions.length} acao(oes) aguardando aprovacao`,
        { taskId, durationMs },
      );

      onEvent({
        type: 'agent_done',
        data: {
          taskId,
          agentId: delegation.agentId,
          agentName: agentData.humanName,
          agentCodename: agentData.codename,
          output: result.text.slice(0, 500),
          durationMs,
          tokensInput: result.usage?.inputTokens,
          tokensOutput: result.usage?.outputTokens,
          awaitingApproval: pendingActions.length,
        },
      });
    } else {
      // Task completed without needing approval
      await prisma.agentTask.update({
        where: { id: taskId },
        data: {
          status: 'completed',
          output: result.text,
          completedAt: new Date(),
          durationMs,
          tokensInput: result.usage?.inputTokens,
          tokensOutput: result.usage?.outputTokens,
        },
      });

      // Increment agent tasks completed + set back to idle
      await prisma.agent.update({
        where: { id: delegation.agentId },
        data: { tasksCompleted: { increment: 1 }, status: 'idle' },
      });

      // Award XP for completed task
      await awardTaskXP(taskId);

      const tokensUsed = (result.usage?.inputTokens ?? 0) + (result.usage?.outputTokens ?? 0);

      // Log: agent completed
      await logActivity(
        delegation.agentId,
        'info',
        `Completou em ${(durationMs / 1000).toFixed(1)}s (${tokensUsed} tokens)`,
        { taskId, durationMs, tokensUsed },
      );

      onEvent({
        type: 'agent_done',
        data: {
          taskId,
          agentId: delegation.agentId,
          agentName: agentData.humanName,
          agentCodename: agentData.codename,
          output: result.text.slice(0, 500),
          durationMs,
          tokensInput: result.usage?.inputTokens,
          tokensOutput: result.usage?.outputTokens,
        },
      });
    }
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';

    await prisma.agentTask.update({
      where: { id: taskId },
      data: {
        status: 'failed',
        error: errMsg,
        completedAt: new Date(),
      },
    });

    // Set agent to error status
    await prisma.agent.update({
      where: { id: delegation.agentId },
      data: { status: 'error' },
    });

    // Log: agent failed
    await logActivity(
      delegation.agentId,
      'error',
      `Falhou: ${errMsg}`,
      { taskId, error: error instanceof Error ? error.stack : String(error) },
    );

    onEvent({
      type: 'agent_error',
      data: {
        taskId,
        agentId: delegation.agentId,
        agentName: agentData.humanName,
        error: errMsg,
      },
    });
  }
}
