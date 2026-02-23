import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { prisma } from '@/lib/prisma';

const CEO_MODEL = anthropic('claude-opus-4-6');

export async function ceoDailyBrief() {
  const ceoAgent = await prisma.agent.findUnique({ where: { id: 'ceo' } });
  if (!ceoAgent) throw new Error('CEO agent not found');

  const agents = await prisma.agent.findMany({
    where: { firedAt: null },
    include: { _count: { select: { tasks: true } } },
  });

  const yesterdayTasks = await prisma.agentTask.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 86400000) } },
    include: { agent: { select: { humanName: true } } },
  });

  const pendingApprovals = await prisma.approval.findMany({
    where: { status: 'pending' },
  });

  const completedYesterday = yesterdayTasks.filter((t) => t.status === 'completed');
  const failedYesterday = yesterdayTasks.filter((t) => t.status === 'failed');

  const briefing = await generateText({
    model: CEO_MODEL,
    system: ceoAgent.systemPrompt,
    prompt: `
DAILY BRIEFING — ${new Date().toLocaleDateString('pt-BR')}

AGENTS STATUS:
${agents
  .map(
    (a) =>
      `- ${a.humanName} (L${a.agentLevel}/${a.levelTitle}): ${a.status}, score: ${a.weeklyScore.toFixed(1)}, XP: ${a.xp}`
  )
  .join('\n')}

YESTERDAY:
- Tasks completadas: ${completedYesterday.length}
- Tasks falharam: ${failedYesterday.length}
- Aprovacoes pendentes: ${pendingApprovals.length}

Gere um briefing executivo com:
1. Estado geral da empresa (1 frase)
2. Top performers de ontem
3. Problemas detectados
4. Prioridades para hoje
5. Recomendacoes
`,
    temperature: 0.3,
  });

  await prisma.agentLog.create({
    data: {
      agentId: 'ceo',
      level: 'info',
      message: `DAILY BRIEF: ${briefing.text}`,
    },
  });

  return briefing.text;
}
