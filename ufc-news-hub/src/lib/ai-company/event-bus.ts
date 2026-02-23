import { prisma } from '@/lib/prisma';
import { checkCostCap } from './cost-guard';
import { getPipeline, type PipelineStep } from './pipelines';
import { getAgentTools } from './agents';
import { BaseAgent, type AgentModelKey } from './agents/base-agent';
import { awardTaskXP } from './xp-engine';

/**
 * Emit an event into the event bus (write to DB)
 */
export async function emitEvent(
  type: string,
  payload: Record<string, unknown> = {},
): Promise<string> {
  const event = await prisma.agentEvent.create({
    data: {
      type,
      payload: JSON.stringify(payload),
      status: 'pending',
    },
  });
  console.log(`[EventBus] Emitted: ${type} (${event.id})`);
  return event.id;
}

/**
 * Process all pending events — called by cron or API
 */
export async function processEvents(): Promise<{
  processed: number;
  skipped: number;
  errors: string[];
}> {
  const results = { processed: 0, skipped: 0, errors: [] as string[] };

  // Check cost cap before processing anything
  const costStatus = await checkCostCap();
  if (costStatus.blocked) {
    console.warn(`[EventBus] BLOCKED by cost cap: $${costStatus.totalToday}/$${costStatus.limit}`);
    return { ...results, errors: [`Cost cap reached: $${costStatus.totalToday}/$${costStatus.limit}`] };
  }

  // Fetch pending events (oldest first, max 10 per batch)
  const pendingEvents = await prisma.agentEvent.findMany({
    where: { status: 'pending' },
    orderBy: { triggeredAt: 'asc' },
    take: 10,
  });

  if (pendingEvents.length === 0) return results;

  console.log(`[EventBus] Processing ${pendingEvents.length} pending events`);

  for (const event of pendingEvents) {
    // Re-check cost cap between events
    const cap = await checkCostCap();
    if (cap.blocked) {
      console.warn(`[EventBus] Cost cap hit mid-batch, stopping`);
      results.errors.push(`Cost cap reached after ${results.processed} events`);
      break;
    }

    try {
      await prisma.agentEvent.update({
        where: { id: event.id },
        data: { status: 'processing' },
      });

      const pipeline = getPipeline(event.type);
      if (!pipeline) {
        console.log(`[EventBus] No pipeline for event type: ${event.type}`);
        await prisma.agentEvent.update({
          where: { id: event.id },
          data: { status: 'completed', processedAt: new Date() },
        });
        results.skipped++;
        continue;
      }

      const payload = JSON.parse(event.payload);
      await executePipeline(pipeline, payload);

      await prisma.agentEvent.update({
        where: { id: event.id },
        data: { status: 'completed', processedAt: new Date() },
      });
      results.processed++;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[EventBus] Error processing event ${event.id}:`, errMsg);
      await prisma.agentEvent.update({
        where: { id: event.id },
        data: { status: 'failed', error: errMsg, processedAt: new Date() },
      });
      results.errors.push(`Event ${event.id}: ${errMsg}`);
    }
  }

  return results;
}

/**
 * Get the unique step identifier (stepId or fallback to agentId)
 */
function getStepKey(step: PipelineStep): string {
  return step.stepId || step.agentId;
}

/**
 * Execute a pipeline of agent steps, respecting dependencies.
 * Uses stepId (not agentId) for tracking — allows same agent in multiple steps.
 */
async function executePipeline(
  steps: PipelineStep[],
  eventPayload: Record<string, unknown>,
): Promise<void> {
  const completedOutputs = new Map<string, string>();
  const executed = new Set<string>();

  let remaining = [...steps];

  while (remaining.length > 0) {
    const ready = remaining.filter((step) =>
      step.dependsOn.every((dep) => executed.has(dep)),
    );

    if (ready.length === 0) {
      // Fallback: execute remaining sequentially
      for (const step of remaining) {
        await executeStep(step, eventPayload, completedOutputs);
        executed.add(getStepKey(step));
      }
      break;
    }

    // Execute ready steps in parallel
    await Promise.all(
      ready.map(async (step) => {
        await executeStep(step, eventPayload, completedOutputs);
        executed.add(getStepKey(step));
      }),
    );

    remaining = remaining.filter((s) => !executed.has(getStepKey(s)));
  }
}

/**
 * Execute a single pipeline step
 */
async function executeStep(
  step: PipelineStep,
  eventPayload: Record<string, unknown>,
  completedOutputs: Map<string, string>,
): Promise<void> {
  // Check cost cap
  const cap = await checkCostCap();
  if (cap.blocked) {
    console.warn(`[EventBus] Step ${step.agentId} blocked by cost cap`);
    return;
  }

  // Load agent from DB
  const agentData = await prisma.agent.findUnique({ where: { id: step.agentId } });
  if (!agentData) {
    console.error(`[EventBus] Agent not found: ${step.agentId}`);
    return;
  }

  // Build context from dependencies
  let instruction = step.instruction;
  const contextParts: string[] = [];
  for (const depId of step.dependsOn) {
    const output = completedOutputs.get(depId);
    if (output) contextParts.push(`[Output de ${depId}]:\n${output}`);
  }
  if (contextParts.length > 0) {
    instruction = `CONTEXTO DOS AGENTES ANTERIORES:\n${contextParts.join('\n---\n')}\n\n${instruction}`;
  }

  // Inject event payload
  instruction = `EVENTO: ${JSON.stringify(eventPayload)}\n\n${instruction}`;

  console.log(`[EventBus] Executing step: ${step.agentId}`);

  const agentTools = getAgentTools(step.agentId);
  const agent = new BaseAgent({
    id: agentData.id,
    humanName: agentData.humanName,
    codename: agentData.codename,
    model: agentData.model as AgentModelKey,
    systemPrompt: agentData.systemPrompt,
    tools: agentTools,
  });

  let taskId: string | null = null;
  try {
    // Create task record
    const task = await prisma.agentTask.create({
      data: {
        agentId: step.agentId,
        type: 'event_pipeline',
        input: instruction.slice(0, 500),
        status: 'running',
        modelUsed: agentData.model,
      },
    });
    taskId = task.id;

    await prisma.agent.update({
      where: { id: step.agentId },
      data: { status: 'active', lastRunAt: new Date() },
    });

    const startTime = Date.now();
    const result = await agent.execute(instruction);
    const durationMs = Date.now() - startTime;

    completedOutputs.set(getStepKey(step), result.text);

    // Separate all _requiresApproval actions
    const allActions = result.toolResults?.filter((tr) => {
      const res = tr.result as Record<string, unknown> | null;
      return res && res._requiresApproval === true;
    }) || [];

    // Auto-approved actions: log for audit trail (transparency)
    const autoApprovedActions = step.autoApprove ? allActions : [];
    const pendingActions = step.autoApprove ? [] : allActions;

    // Create audit records for auto-approved actions
    for (const action of autoApprovedActions) {
      const actionResult = action.result as Record<string, unknown>;
      await prisma.approval.create({
        data: {
          taskId: task.id,
          agentId: step.agentId,
          actionType: (actionResult.actionType as string) || 'unknown',
          description: `[AUTO-APPROVED] ${(actionResult.description as string) || ''}`,
          payload: JSON.stringify(actionResult.payload || {}),
          status: 'approved',
          reviewedBy: 'system:auto-approve',
          reviewedAt: new Date(),
          reviewNote: 'Auto-approved: pipeline low-risk action',
        },
      });
    }

    if (pendingActions.length > 0) {
      for (const action of pendingActions) {
        const actionResult = action.result as Record<string, unknown>;
        await prisma.approval.create({
          data: {
            taskId: task.id,
            agentId: step.agentId,
            actionType: (actionResult.actionType as string) || 'unknown',
            description: (actionResult.description as string) || 'Pipeline action',
            payload: JSON.stringify(actionResult.payload || {}),
            status: 'pending',
          },
        });
      }
      await prisma.agentTask.update({
        where: { id: task.id },
        data: { status: 'awaiting_approval', output: result.text, durationMs, tokensInput: result.usage?.inputTokens, tokensOutput: result.usage?.outputTokens },
      });
      // Do NOT increment tasksCompleted for awaiting_approval
      await prisma.agent.update({
        where: { id: step.agentId },
        data: { status: 'idle' },
      });
    } else {
      await prisma.agentTask.update({
        where: { id: task.id },
        data: { status: 'completed', output: result.text, completedAt: new Date(), durationMs, tokensInput: result.usage?.inputTokens, tokensOutput: result.usage?.outputTokens },
      });
      // Only increment tasksCompleted on actual completion
      await prisma.agent.update({
        where: { id: step.agentId },
        data: { status: 'idle', tasksCompleted: { increment: 1 } },
      });
      // Award XP for completed pipeline tasks
      await awardTaskXP(task.id);
    }

    console.log(`[EventBus] Step ${step.agentId} done in ${durationMs}ms`);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[EventBus] Step ${step.agentId} failed:`, errMsg);
    // Mark task as failed (not stuck in 'running')
    if (taskId) {
      await prisma.agentTask.update({
        where: { id: taskId },
        data: { status: 'failed', error: errMsg, completedAt: new Date() },
      }).catch(() => {});
    }
    await prisma.agent.update({
      where: { id: step.agentId },
      data: { status: 'idle' },
    });
  }
}
