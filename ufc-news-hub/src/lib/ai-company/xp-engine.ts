import { prisma } from '@/lib/prisma';

// ═══════════════════════════════════════
// LEVEL SYSTEM
// ═══════════════════════════════════════

export const LEVELS: Record<number, { title: string; xpRequired: number; maxTasksPerDay: number }> = {
  1: { title: 'Trainee', xpRequired: 0, maxTasksPerDay: 10 },
  2: { title: 'Specialist', xpRequired: 100, maxTasksPerDay: 25 },
  3: { title: 'Senior', xpRequired: 500, maxTasksPerDay: 50 },
  4: { title: 'Lead', xpRequired: 2000, maxTasksPerDay: 100 },
};

// Model pricing (per 1M tokens)
const MODEL_COSTS: Record<string, { input: number; output: number }> = {
  'opus-4.6': { input: 15, output: 75 },
  'sonnet-4.5': { input: 3, output: 15 },
  'haiku-4.5': { input: 0.80, output: 4 },
};

// ═══════════════════════════════════════
// XP CALCULATION PER TASK
// ═══════════════════════════════════════

interface TaskForXP {
  status: string;
  durationMs: number | null;
  tokensInput: number | null;
  tokensOutput: number | null;
  approvals?: { status: string }[];
}

interface AgentForXP {
  avgResponseTime: number;
}

export function calculateTaskXP(task: TaskForXP, agent: AgentForXP): number {
  let xp = 0;

  // Base XP por completar task
  if (task.status === 'completed') {
    xp += 10;

    // Bonus por velocidade (se completou mais rapido que media)
    if (task.durationMs && agent.avgResponseTime > 0 && task.durationMs < agent.avgResponseTime * 0.8) {
      xp += 5;
    }

    // Bonus por eficiencia de tokens (menos tokens = melhor)
    const totalTokens = (task.tokensInput || 0) + (task.tokensOutput || 0);
    if (totalTokens < 1000) xp += 3;

    // Bonus se task foi aprovada pelo humano (alta qualidade)
    if (task.approvals?.some(a => a.status === 'approved')) {
      xp += 15;
    }
  }

  // Penalidade por falha
  if (task.status === 'failed') {
    xp -= 5;
  }

  // Penalidade se output foi rejeitado pelo humano
  if (task.approvals?.some(a => a.status === 'rejected')) {
    xp -= 10;
  }

  return xp;
}

// ═══════════════════════════════════════
// COST CALCULATION
// ═══════════════════════════════════════

interface TaskForCost {
  modelUsed: string | null;
  tokensInput: number | null;
  tokensOutput: number | null;
}

export function calculateCost(tasks: TaskForCost[]): number {
  return tasks.reduce((total, task) => {
    const rate = MODEL_COSTS[task.modelUsed || ''] || MODEL_COSTS['sonnet-4.5'];
    const inputCost = ((task.tokensInput || 0) / 1_000_000) * rate.input;
    const outputCost = ((task.tokensOutput || 0) / 1_000_000) * rate.output;
    return total + inputCost + outputCost;
  }, 0);
}

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════

function getWeekStart(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Monday start
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 604800000;
  return Math.ceil(diff / oneWeek);
}

// ═══════════════════════════════════════
// PROMOTION / DEMOTION
// ═══════════════════════════════════════

export async function promoteAgent(agentId: string) {
  const agent = await prisma.agent.findUnique({ where: { id: agentId } });
  if (!agent || agent.agentLevel >= 4) return;

  const newLevel = agent.agentLevel + 1;
  const levelInfo = LEVELS[newLevel];

  await prisma.agent.update({
    where: { id: agentId },
    data: {
      agentLevel: newLevel,
      levelTitle: levelInfo.title,
      xpToNextLevel: LEVELS[Math.min(newLevel + 1, 4)]?.xpRequired || 9999,
      promotedAt: new Date(),
      consecutiveWeeksAboveTarget: 0,
    },
  });

  await prisma.agentLog.create({
    data: {
      agentId,
      level: 'info',
      message: `PROMOVIDO para ${levelInfo.title} (L${newLevel})!`,
      metadata: JSON.stringify({ from: agent.agentLevel, to: newLevel }),
    },
  });
}

export async function demoteAgent(agentId: string) {
  const agent = await prisma.agent.findUnique({ where: { id: agentId } });
  if (!agent || agent.agentLevel <= 1) return;

  const newLevel = agent.agentLevel - 1;
  const levelInfo = LEVELS[newLevel];

  await prisma.agent.update({
    where: { id: agentId },
    data: {
      agentLevel: newLevel,
      levelTitle: levelInfo.title,
      xpToNextLevel: LEVELS[Math.min(newLevel + 1, 4)]?.xpRequired || 100,
      demotedAt: new Date(),
      consecutiveWeeksBelowTarget: 0,
    },
  });

  await prisma.agentLog.create({
    data: {
      agentId,
      level: 'warn',
      message: `REBAIXADO para ${levelInfo.title} (L${newLevel}) por baixa performance.`,
      metadata: JSON.stringify({ from: agent.agentLevel, to: newLevel }),
    },
  });
}

// ═══════════════════════════════════════
// WEEKLY SCORE CALCULATION
// ═══════════════════════════════════════

export async function calculateWeeklyScores() {
  const agents = await prisma.agent.findMany({
    where: { firedAt: null },
  });
  const weekStart = getWeekStart();

  for (const agent of agents) {
    const tasks = await prisma.agentTask.findMany({
      where: {
        agentId: agent.id,
        createdAt: { gte: weekStart },
      },
      include: { approvals: true },
    });

    if (tasks.length === 0) continue;

    const completed = tasks.filter((t) => t.status === 'completed');
    const failed = tasks.filter((t) => t.status === 'failed');
    const approved = tasks.filter((t) => t.approvals?.some(a => a.status === 'approved'));
    const rejected = tasks.filter((t) => t.approvals?.some(a => a.status === 'rejected'));

    // Success Rate (0-5)
    const successRate = tasks.length > 0 ? (completed.length / tasks.length) * 5 : 0;

    // Quality Score (0-5) — baseado em aprovacoes
    const qualityScore =
      approved.length + rejected.length > 0
        ? (approved.length / (approved.length + rejected.length)) * 5
        : 3; // default se nao teve aprovacoes

    // Efficiency Score (0-5) — baseado em velocidade
    const avgTime =
      completed.reduce((sum, t) => sum + (t.durationMs || 0), 0) / (completed.length || 1);
    const efficiencyScore = Math.min(5, Math.max(0, 5 - avgTime / 60000));

    // Weekly Score (media ponderada)
    const weeklyScore = successRate * 0.4 + qualityScore * 0.35 + efficiencyScore * 0.25;

    // XP earned this week
    const xpEarned = tasks.reduce((sum, t) => sum + calculateTaskXP(t, agent), 0);

    // Check promotion/demotion
    let action: string | null = null;

    if (weeklyScore >= 3.5) {
      const newConsecutive = agent.consecutiveWeeksAboveTarget + 1;
      await prisma.agent.update({
        where: { id: agent.id },
        data: {
          consecutiveWeeksAboveTarget: newConsecutive,
          consecutiveWeeksBelowTarget: 0,
          warnings: 0,
        },
      });

      if (agent.agentLevel === 1 && newConsecutive >= 2 && agent.xp + xpEarned >= 100) {
        action = 'promoted';
        await promoteAgent(agent.id);
      } else if (
        agent.agentLevel === 2 &&
        weeklyScore >= 4.0 &&
        newConsecutive >= 3 &&
        agent.xp + xpEarned >= 500
      ) {
        action = 'promoted';
        await promoteAgent(agent.id);
      } else if (
        agent.agentLevel === 3 &&
        weeklyScore >= 4.5 &&
        newConsecutive >= 4 &&
        agent.xp + xpEarned >= 2000
      ) {
        action = 'promoted';
        await promoteAgent(agent.id);
      }
    } else if (weeklyScore < 2.5) {
      const newConsecutive = agent.consecutiveWeeksBelowTarget + 1;
      await prisma.agent.update({
        where: { id: agent.id },
        data: {
          consecutiveWeeksBelowTarget: newConsecutive,
          consecutiveWeeksAboveTarget: 0,
        },
      });

      if (newConsecutive === 1) {
        action = 'warning';
        await prisma.agent.update({
          where: { id: agent.id },
          data: { warnings: { increment: 1 } },
        });
      } else if (newConsecutive >= 2 && agent.agentLevel > 1) {
        action = 'demoted';
        await demoteAgent(agent.id);
      }
      // NUNCA demissao automatica — so manual pelo admin
    }

    // Save weekly XP — clamp to prevent overflow past level threshold
    let weeklyNewXp = agent.xp + Math.max(0, xpEarned);
    const weeklyNextThreshold = LEVELS[agent.agentLevel + 1]?.xpRequired;
    if (agent.agentLevel < 4 && weeklyNextThreshold && weeklyNewXp >= weeklyNextThreshold) {
      // If promotion didn't happen above, cap at threshold - 1
      if (action !== 'promoted') {
        weeklyNewXp = weeklyNextThreshold - 1;
      }
    }
    if (weeklyNewXp < 0) weeklyNewXp = 0;

    await prisma.agent.update({
      where: { id: agent.id },
      data: {
        xp: weeklyNewXp,
        weeklyScore,
        weeklyTaskCount: tasks.length,
        weeklySuccessRate: tasks.length > 0 ? completed.length / tasks.length : 0,
        avgResponseTime: avgTime,
      },
    });

    // Total tokens and cost
    const tokensUsed = tasks.reduce(
      (s, t) => s + (t.tokensInput || 0) + (t.tokensOutput || 0),
      0,
    );

    // Save performance review
    await prisma.performanceReview.create({
      data: {
        agentId: agent.id,
        weekNumber: getWeekNumber(),
        year: new Date().getFullYear(),
        tasksCompleted: completed.length,
        tasksFailed: failed.length,
        avgResponseTimeMs: Math.round(avgTime),
        tokensUsed,
        costUsd: calculateCost(tasks),
        successRate: successRate / 5,
        qualityScore: qualityScore / 5,
        efficiencyScore: efficiencyScore / 5,
        weeklyScore,
        xpEarned: Math.max(0, xpEarned),
        action,
      },
    });
  }

  // Employee of the Week
  await electEmployeeOfTheWeek();
}

// ═══════════════════════════════════════
// EMPLOYEE OF THE WEEK
// ═══════════════════════════════════════

async function electEmployeeOfTheWeek() {
  const weekNumber = getWeekNumber();
  const year = new Date().getFullYear();

  const reviews = await prisma.performanceReview.findMany({
    where: { weekNumber, year },
    include: { agent: true },
    orderBy: { weeklyScore: 'desc' },
  });

  if (reviews.length === 0) return;

  const topReview = reviews[0];
  await prisma.performanceReview.update({
    where: { id: topReview.id },
    data: { action: 'employee_of_week' },
  });

  await prisma.agentLog.create({
    data: {
      agentId: topReview.agentId,
      level: 'info',
      message: `FUNCIONARIO DA SEMANA! Score: ${topReview.weeklyScore.toFixed(1)}/5.0`,
    },
  });
}

// ═══════════════════════════════════════
// AWARD XP AFTER TASK (called from orchestrator)
// ═══════════════════════════════════════

export async function awardTaskXP(taskId: string) {
  const task = await prisma.agentTask.findUnique({
    where: { id: taskId },
    include: { agent: true, approvals: true },
  });

  if (!task) return;

  const agent = task.agent;
  let xp = calculateTaskXP(task, agent);
  if (xp === 0) return;

  // ── Quality multiplier ──
  if (xp > 0 && agent.weeklySuccessRate > 0.95) {
    xp = Math.round(xp * 1.5);
  } else if (xp > 0 && agent.weeklySuccessRate > 0.9) {
    xp = Math.round(xp * 1.2);
  }

  // ── Streak bonus (consecutive completed tasks, +2 per task, cap +20) ──
  if (xp > 0) {
    const recentTasks = await prisma.agentTask.findMany({
      where: { agentId: agent.id, status: { not: 'pending' } },
      orderBy: { createdAt: 'desc' },
      take: 11, // up to 10 streak + current
      select: { id: true, status: true },
    });
    // Count consecutive completed before this task
    let streak = 0;
    for (const t of recentTasks) {
      if (t.id === taskId) continue;
      if (t.status === 'completed') {
        streak++;
      } else {
        break;
      }
    }
    const streakBonus = Math.min(streak * 2, 20);
    xp += streakBonus;
  }

  // ── Calculate new XP with floor ──
  let newXp = agent.xp + xp;
  // XP floor: can't drop below the threshold of the previous level
  const currentLevelThreshold = LEVELS[agent.agentLevel]?.xpRequired ?? 0;
  if (newXp < currentLevelThreshold) {
    newXp = currentLevelThreshold;
  }
  // Absolute floor at 0
  if (newXp < 0) newXp = 0;

  // ── Auto-Promotion check ──
  let newLevel = agent.agentLevel;
  let promoted = false;
  while (newLevel < 4 && LEVELS[newLevel + 1] && newXp >= LEVELS[newLevel + 1].xpRequired) {
    newLevel++;
    promoted = true;
  }

  if (promoted) {
    const levelInfo = LEVELS[newLevel];
    const nextThreshold = LEVELS[Math.min(newLevel + 1, 4)]?.xpRequired ?? 9999;
    await prisma.agent.update({
      where: { id: agent.id },
      data: {
        xp: newXp,
        agentLevel: newLevel,
        levelTitle: levelInfo.title,
        xpToNextLevel: newLevel >= 4 ? 9999 : nextThreshold,
        promotedAt: new Date(),
        consecutiveWeeksAboveTarget: 0,
      },
    });
    await prisma.agentLog.create({
      data: {
        agentId: agent.id,
        level: 'info',
        message: `AUTO-PROMOTED to ${levelInfo.title} (L${newLevel})! XP: ${newXp}`,
        metadata: JSON.stringify({ from: agent.agentLevel, to: newLevel, xp: newXp }),
      },
    });
    return;
  }

  // ── Auto-Demotion check (3+ consecutive failed tasks) ──
  let demoted = false;
  if (xp < 0 && agent.agentLevel > 1) {
    const lastThreeTasks = await prisma.agentTask.findMany({
      where: { agentId: agent.id, status: { not: 'pending' } },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { status: true },
    });
    const allFailed = lastThreeTasks.length >= 3 && lastThreeTasks.every(t => t.status === 'failed');
    if (allFailed) {
      const demotedLevel = agent.agentLevel - 1;
      const levelInfo = LEVELS[demotedLevel];
      const demotedXp = levelInfo.xpRequired; // Set XP to start of lower level
      const nextThreshold = LEVELS[Math.min(demotedLevel + 1, 4)]?.xpRequired ?? 100;
      await prisma.agent.update({
        where: { id: agent.id },
        data: {
          xp: demotedXp,
          agentLevel: demotedLevel,
          levelTitle: levelInfo.title,
          xpToNextLevel: nextThreshold,
          demotedAt: new Date(),
          consecutiveWeeksBelowTarget: 0,
        },
      });
      await prisma.agentLog.create({
        data: {
          agentId: agent.id,
          level: 'warn',
          message: `AUTO-DEMOTED to ${levelInfo.title} (L${demotedLevel}) — 3 consecutive failures. XP reset to ${demotedXp}`,
          metadata: JSON.stringify({ from: agent.agentLevel, to: demotedLevel, xp: demotedXp }),
        },
      });
      demoted = true;
    }
  }

  // ── Standard XP update (no promotion/demotion) ──
  if (!demoted) {
    // SAFETY: Clamp XP to level ceiling — NEVER exceed next level threshold without promoting
    // This is a defensive check: promotion should have already happened above,
    // but if somehow it didn't, cap XP at (threshold - 1) to prevent overflow display
    const currentLevel = agent.agentLevel;
    const nextLevelThreshold = LEVELS[currentLevel + 1]?.xpRequired;
    if (currentLevel < 4 && nextLevelThreshold && newXp >= nextLevelThreshold) {
      // This should never happen since we check promotion above, but just in case
      newXp = nextLevelThreshold - 1;
    }

    await prisma.agent.update({
      where: { id: agent.id },
      data: {
        xp: newXp,
        xpToNextLevel: currentLevel >= 4 ? 9999 : (LEVELS[currentLevel + 1]?.xpRequired ?? 9999),
      },
    });
  }
}
