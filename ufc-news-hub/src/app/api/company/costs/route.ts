import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

// Model pricing (per 1M tokens)
const MODEL_COSTS: Record<string, { input: number; output: number }> = {
  'opus-4.6': { input: 15, output: 75 },
  'sonnet-4.5': { input: 3, output: 15 },
  'haiku-4.5': { input: 0.80, output: 4 },
};

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const hours = parseInt(req.nextUrl.searchParams.get('hours') || '24', 10);
    const since = new Date(Date.now() - hours * 3600000);

    const tasks = await prisma.agentTask.findMany({
      where: { createdAt: { gte: since } },
      select: {
        agentId: true,
        modelUsed: true,
        tokensInput: true,
        tokensOutput: true,
        agent: { select: { humanName: true, codename: true, icon: true, color: true, model: true } },
      },
    });

    // Aggregate by agent
    const byAgent: Record<string, {
      agentId: string;
      humanName: string;
      codename: string;
      icon: string;
      color: string;
      model: string;
      tasks: number;
      tokensInput: number;
      tokensOutput: number;
      costUsd: number;
    }> = {};

    let totalCost = 0;
    let totalTokensInput = 0;
    let totalTokensOutput = 0;

    for (const task of tasks) {
      const rate = MODEL_COSTS[task.modelUsed || task.agent.model] || MODEL_COSTS['sonnet-4.5'];
      const inputCost = ((task.tokensInput || 0) / 1_000_000) * rate.input;
      const outputCost = ((task.tokensOutput || 0) / 1_000_000) * rate.output;
      const taskCost = inputCost + outputCost;

      totalCost += taskCost;
      totalTokensInput += task.tokensInput || 0;
      totalTokensOutput += task.tokensOutput || 0;

      if (!byAgent[task.agentId]) {
        byAgent[task.agentId] = {
          agentId: task.agentId,
          humanName: task.agent.humanName,
          codename: task.agent.codename,
          icon: task.agent.icon,
          color: task.agent.color,
          model: task.agent.model,
          tasks: 0,
          tokensInput: 0,
          tokensOutput: 0,
          costUsd: 0,
        };
      }
      byAgent[task.agentId].tasks++;
      byAgent[task.agentId].tokensInput += task.tokensInput || 0;
      byAgent[task.agentId].tokensOutput += task.tokensOutput || 0;
      byAgent[task.agentId].costUsd += taskCost;
    }

    const agentCosts = Object.values(byAgent).sort((a, b) => b.costUsd - a.costUsd);

    return NextResponse.json({
      period: `${hours}h`,
      totalCost,
      totalTokensInput,
      totalTokensOutput,
      totalTasks: tasks.length,
      byAgent: agentCosts,
    });
  } catch (error) {
    console.error('Error fetching costs:', error);
    return NextResponse.json({ error: 'Failed to fetch costs' }, { status: 500 });
  }
}
