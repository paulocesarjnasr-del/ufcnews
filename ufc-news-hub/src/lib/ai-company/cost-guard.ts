import { prisma } from '@/lib/prisma';

// Cost per 1M tokens (USD) - Claude model pricing
const MODEL_COSTS: Record<string, { input: number; output: number }> = {
  'opus-4.6':   { input: 15.0,  output: 75.0  },
  'sonnet-4.5': { input: 3.0,   output: 15.0  },
  'haiku-4.5':  { input: 0.80,  output: 4.0   },
};

const DEFAULT_DAILY_CAP_USD = parseFloat(process.env.DAILY_COST_CAP_USD || '5');

/**
 * Calculate cost in USD from token usage
 */
export function calculateCost(
  model: string,
  tokensInput: number,
  tokensOutput: number,
): number {
  const pricing = MODEL_COSTS[model] || MODEL_COSTS['sonnet-4.5'];
  return (
    (tokensInput / 1_000_000) * pricing.input +
    (tokensOutput / 1_000_000) * pricing.output
  );
}

/**
 * Log cost after agent execution
 */
export async function logCost(params: {
  agentId: string;
  model: string;
  tokensInput: number;
  tokensOutput: number;
  taskId?: string;
}): Promise<void> {
  const costUsd = calculateCost(params.model, params.tokensInput, params.tokensOutput);
  try {
    await prisma.agentCostLog.create({
      data: {
        agentId: params.agentId,
        model: params.model,
        tokensInput: params.tokensInput,
        tokensOutput: params.tokensOutput,
        costUsd,
        taskId: params.taskId,
      },
    });
  } catch {
    // Don't let cost logging break execution
    console.error(`[CostGuard] Failed to log cost for ${params.agentId}`);
  }
}

/**
 * Check if daily cost cap has been reached
 */
export async function checkCostCap(): Promise<{
  totalToday: number;
  limit: number;
  blocked: boolean;
  remainingBudget: number;
}> {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  try {
    const result = await prisma.agentCostLog.aggregate({
      _sum: { costUsd: true },
      where: { createdAt: { gte: todayStart } },
    });

    const totalToday = result._sum.costUsd || 0;
    const limit = DEFAULT_DAILY_CAP_USD;

    return {
      totalToday: Math.round(totalToday * 10000) / 10000,
      limit,
      blocked: totalToday >= limit,
      remainingBudget: Math.max(0, Math.round((limit - totalToday) * 10000) / 10000),
    };
  } catch {
    // If we can't check, allow execution but warn
    console.error('[CostGuard] Failed to check cost cap — allowing execution');
    return {
      totalToday: 0,
      limit: DEFAULT_DAILY_CAP_USD,
      blocked: false,
      remainingBudget: DEFAULT_DAILY_CAP_USD,
    };
  }
}

/**
 * Get cost breakdown by agent for today
 */
export async function getDailyCostBreakdown(): Promise<
  Array<{ agentId: string; totalCost: number; totalTokens: number; callCount: number }>
> {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const logs = await prisma.agentCostLog.groupBy({
    by: ['agentId'],
    _sum: { costUsd: true, tokensInput: true, tokensOutput: true },
    _count: true,
    where: { createdAt: { gte: todayStart } },
    orderBy: { _sum: { costUsd: 'desc' } },
  });

  return logs.map((l) => ({
    agentId: l.agentId,
    totalCost: Math.round((l._sum.costUsd || 0) * 10000) / 10000,
    totalTokens: (l._sum.tokensInput || 0) + (l._sum.tokensOutput || 0),
    callCount: l._count,
  }));
}
