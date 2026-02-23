import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { prisma } from '@/lib/prisma';
import { BaseAgent, type AgentModelKey } from './agents/base-agent';
import { getAgentTools } from './agents';
import { logCost, checkCostCap } from './cost-guard';
import { awardTaskXP } from './xp-engine';
import { emitEvent } from './event-bus';

const CEO_MODEL = anthropic('claude-opus-4-6');

// ==========================================
// TYPES
// ==========================================

export interface RemediationAction {
  agentId: string;
  instruction: string;
  priority: 'high' | 'medium' | 'low';
  autoApprove: boolean;
}

interface RemediationAnalysis {
  shouldRemediate: boolean;
  analysis: string;
  actions: RemediationAction[];
}

// ==========================================
// ANALYZE FOR REMEDIATION
// ==========================================

/**
 * CEO analyzes a consolidated report and identifies actionable problems.
 * Called after CEO consolidation in the orchestrator.
 */
export async function analyzeForRemediation(
  report: string,
  promptId?: string,
): Promise<string | null> {
  // Cost check
  const cap = await checkCostCap();
  if (cap.blocked) {
    console.warn('[Remediation] Blocked by cost cap');
    return null;
  }

  // Fetch available agents
  const agents = await prisma.agent.findMany({
    where: { status: { in: ['active', 'idle'] } },
    select: { id: true, humanName: true, desc: true },
  });

  const agentList = agents
    .filter(a => a.id !== 'ceo')
    .map(a => {
      const toolNames = Object.keys(getAgentTools(a.id));
      return `- ${a.id} (${a.humanName}): ${a.desc} [Tools: ${toolNames.join(', ')}]`;
    })
    .join('\n');

  const result = await generateText({
    model: CEO_MODEL,
    system: `Voce e o CEO Ricardo da UFC AI Company. Sua funcao agora e analisar o relatorio consolidado e identificar problemas ACIONAVEIS que os agentes podem resolver automaticamente.

REGRAS:
1. So proponha acoes que AGENTES podem executar com suas TOOLS
2. NAO proponha acoes como "aumentar trafego" ou "contratar mais gente"
3. Cada acao deve ter um agentId valido e instrucao especifica com tools a usar
4. Priorize: data quality issues, missing data, security issues, performance
5. Se o relatorio nao tem problemas acionaveis, retorne shouldRemediate: false`,
    prompt: `RELATORIO CONSOLIDADO:
${report.slice(0, 6000)}

AGENTES DISPONIVEIS:
${agentList}

Analise e retorne SOMENTE JSON valido:
{
  "shouldRemediate": true/false,
  "analysis": "resumo dos problemas identificados",
  "actions": [
    {
      "agentId": "id-do-agente",
      "instruction": "instrucao especifica incluindo quais tools chamar",
      "priority": "high/medium/low",
      "autoApprove": false
    }
  ]
}`,
    temperature: 0.2,
  });

  // Log cost
  if (result.usage) {
    logCost({
      agentId: 'ceo',
      model: 'opus-4.6',
      tokensInput: result.usage.inputTokens ?? 0,
      tokensOutput: result.usage.outputTokens ?? 0,
    }).catch(() => {});
  }

  // Parse
  let analysis: RemediationAnalysis;
  try {
    const jsonText = result.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    analysis = JSON.parse(jsonText);
  } catch {
    console.warn('[Remediation] CEO returned non-JSON, skipping');
    return null;
  }

  if (!analysis.shouldRemediate || !analysis.actions || analysis.actions.length === 0) {
    console.log('[Remediation] No actionable problems found');
    return null;
  }

  // Validate agentIds exist
  const validAgentIds = new Set(agents.map(a => a.id));
  const validActions = analysis.actions.filter(a => validAgentIds.has(a.agentId));
  if (validActions.length === 0) {
    console.warn('[Remediation] No valid agent IDs in actions');
    return null;
  }

  // Create RemediationPlan
  const plan = await prisma.remediationPlan.create({
    data: {
      promptId: promptId || null,
      analysis: analysis.analysis,
      actions: JSON.stringify(validActions),
      status: 'pending',
    },
  });

  console.log(`[Remediation] Plan created: ${plan.id} with ${validActions.length} actions`);

  // Emit event for dashboard notification
  await emitEvent('report.generated', {
    planId: plan.id,
    actionCount: validActions.length,
    analysis: analysis.analysis.slice(0, 200),
  });

  return plan.id;
}

// ==========================================
// EXECUTE REMEDIATION PLAN
// ==========================================

/**
 * Execute an approved remediation plan.
 * Dispatches agent tasks in waves respecting priorities.
 */
export async function executeRemediationPlan(planId: string): Promise<{
  success: boolean;
  results: Array<{ agentId: string; status: string; output?: string; error?: string }>;
}> {
  const plan = await prisma.remediationPlan.findUnique({ where: { id: planId } });
  if (!plan) return { success: false, results: [{ agentId: 'system', status: 'error', error: 'Plan not found' }] };
  if (plan.status !== 'approved') return { success: false, results: [{ agentId: 'system', status: 'error', error: `Plan status is ${plan.status}, expected approved` }] };

  // Cost check
  const cap = await checkCostCap();
  if (cap.blocked) {
    return { success: false, results: [{ agentId: 'system', status: 'error', error: 'Cost cap reached' }] };
  }

  // Parse actions
  let actions: RemediationAction[];
  try {
    actions = JSON.parse(plan.actions);
  } catch {
    return { success: false, results: [{ agentId: 'system', status: 'error', error: 'Invalid actions JSON' }] };
  }

  // Mark as executing
  await prisma.remediationPlan.update({
    where: { id: planId },
    data: { status: 'executing', executedAt: new Date() },
  });

  const results: Array<{ agentId: string; status: string; output?: string; error?: string }> = [];

  // Sort by priority: high first
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  actions.sort((a, b) => (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2));

  // Execute in waves by priority
  const waves: RemediationAction[][] = [];
  let currentPriority = actions[0]?.priority;
  let currentWave: RemediationAction[] = [];
  for (const action of actions) {
    if (action.priority !== currentPriority) {
      waves.push(currentWave);
      currentWave = [];
      currentPriority = action.priority;
    }
    currentWave.push(action);
  }
  if (currentWave.length > 0) waves.push(currentWave);

  for (const wave of waves) {
    // Re-check cost cap between waves
    const waveCap = await checkCostCap();
    if (waveCap.blocked) {
      results.push({ agentId: 'system', status: 'error', error: 'Cost cap reached mid-execution' });
      break;
    }

    // Execute wave in parallel
    await Promise.all(
      wave.map(async (action) => {
        try {
          const agentData = await prisma.agent.findUnique({ where: { id: action.agentId } });
          if (!agentData) {
            results.push({ agentId: action.agentId, status: 'error', error: 'Agent not found' });
            return;
          }

          const agentTools = getAgentTools(action.agentId);
          const agent = new BaseAgent({
            id: agentData.id,
            humanName: agentData.humanName,
            codename: agentData.codename,
            model: agentData.model as AgentModelKey,
            systemPrompt: agentData.systemPrompt,
            tools: agentTools,
          });

          // Create task record
          const task = await prisma.agentTask.create({
            data: {
              agentId: action.agentId,
              type: 'remediation',
              input: `[REMEDIATION] ${action.instruction}`.slice(0, 500),
              status: 'running',
              modelUsed: agentData.model,
            },
          });

          await prisma.agent.update({
            where: { id: action.agentId },
            data: { status: 'active', lastRunAt: new Date() },
          });

          const startTime = Date.now();
          const result = await agent.execute(action.instruction);
          const durationMs = Date.now() - startTime;

          await prisma.agentTask.update({
            where: { id: task.id },
            data: {
              status: 'completed',
              output: result.text,
              completedAt: new Date(),
              durationMs,
              tokensInput: result.usage?.inputTokens,
              tokensOutput: result.usage?.outputTokens,
            },
          });

          await prisma.agent.update({
            where: { id: action.agentId },
            data: { status: 'idle', tasksCompleted: { increment: 1 } },
          });

          await awardTaskXP(task.id);

          results.push({
            agentId: action.agentId,
            status: 'completed',
            output: result.text.slice(0, 500),
          });
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          results.push({ agentId: action.agentId, status: 'error', error: errMsg });

          // Reset agent status
          await prisma.agent.update({
            where: { id: action.agentId },
            data: { status: 'idle' },
          }).catch(() => {});
        }
      }),
    );
  }

  // CEO verification step
  const successResults = results.filter(r => r.status === 'completed');
  let verificationSummary = '';
  if (successResults.length > 0) {
    try {
      const verification = await generateText({
        model: CEO_MODEL,
        system: 'Voce e o CEO Ricardo. Verifique se as acoes de remediacao foram bem-sucedidas e resuma os resultados.',
        prompt: `PLANO ORIGINAL: ${plan.analysis}

RESULTADOS DA EXECUCAO:
${results.map(r => `- ${r.agentId}: ${r.status}${r.output ? ` — ${r.output.slice(0, 200)}` : ''}${r.error ? ` — ERROR: ${r.error}` : ''}`).join('\n')}

Faca uma verificacao rapida: os problemas identificados foram resolvidos? Resuma em 2-3 frases.`,
        temperature: 0.2,
      });
      verificationSummary = verification.text;

      if (verification.usage) {
        logCost({
          agentId: 'ceo',
          model: 'opus-4.6',
          tokensInput: verification.usage.inputTokens ?? 0,
          tokensOutput: verification.usage.outputTokens ?? 0,
        }).catch(() => {});
      }
    } catch {
      verificationSummary = 'Verificacao do CEO falhou.';
    }
  }

  // Update plan with results
  await prisma.remediationPlan.update({
    where: { id: planId },
    data: {
      status: 'completed',
      results: JSON.stringify({
        actions: results,
        verification: verificationSummary,
        completedAt: new Date().toISOString(),
      }),
    },
  });

  return { success: results.some(r => r.status === 'completed'), results };
}

// ==========================================
// LIST PLANS
// ==========================================

export async function listRemediationPlans(status?: string) {
  const where: Record<string, unknown> = {};
  if (status) where.status = status;

  return prisma.remediationPlan.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
}
