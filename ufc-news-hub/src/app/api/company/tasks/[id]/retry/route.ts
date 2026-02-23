import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';
import { BaseAgent, type AgentModelKey } from '@/lib/ai-company/agents/base-agent';
import { getAgentTools } from '@/lib/ai-company/agents';
import { awardTaskXP } from '@/lib/ai-company/xp-engine';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    // Find original task
    const originalTask = await prisma.agentTask.findUnique({
      where: { id },
      include: { agent: true },
    });

    if (!originalTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (originalTask.status !== 'failed') {
      return NextResponse.json({ error: 'Only failed tasks can be retried' }, { status: 400 });
    }

    // Create new task with same input
    const newTask = await prisma.agentTask.create({
      data: {
        agentId: originalTask.agentId,
        type: 'retry',
        input: originalTask.input,
        status: 'pending',
        parentTaskId: originalTask.id,
      },
    });

    // Mark original as retried
    await prisma.agentTask.update({
      where: { id },
      data: { error: `${originalTask.error} [Retried → ${newTask.id}]` },
    });

    // Log the retry
    await prisma.agentLog.create({
      data: {
        agentId: originalTask.agentId,
        level: 'info',
        message: `Task retry criada: ${newTask.id} (original: ${id})`,
      },
    });

    // Fire-and-forget: execute the agent in the background
    const agentData = originalTask.agent;
    executeRetry(newTask.id, agentData, originalTask.input).catch((err) => {
      console.error(`[Retry] Background execution failed for task ${newTask.id}:`, err);
    });

    return NextResponse.json({ success: true, newTaskId: newTask.id, agentId: originalTask.agentId });
  } catch (error) {
    console.error('Error retrying task:', error);
    return NextResponse.json({ error: 'Failed to retry task' }, { status: 500 });
  }
}

async function executeRetry(
  taskId: string,
  agentData: { id: string; humanName: string; codename: string; model: string; systemPrompt: string },
  instruction: string,
) {
  await prisma.agentTask.update({
    where: { id: taskId },
    data: { status: 'running', modelUsed: agentData.model },
  });

  await prisma.agent.update({
    where: { id: agentData.id },
    data: { status: 'active', lastRunAt: new Date() },
  });

  try {
    const startTime = Date.now();
    const agentTools = getAgentTools(agentData.id);

    const agent = new BaseAgent({
      id: agentData.id,
      humanName: agentData.humanName,
      codename: agentData.codename,
      model: agentData.model as AgentModelKey,
      systemPrompt: agentData.systemPrompt,
      tools: agentTools,
    });

    const result = await agent.execute(instruction);
    const durationMs = Date.now() - startTime;

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

    await prisma.agent.update({
      where: { id: agentData.id },
      data: { tasksCompleted: { increment: 1 }, status: 'idle' },
    });

    await awardTaskXP(taskId);

    await prisma.agentLog.create({
      data: {
        agentId: agentData.id,
        level: 'info',
        message: `Retry completou em ${(durationMs / 1000).toFixed(1)}s`,
        metadata: JSON.stringify({ taskId, durationMs }),
      },
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';

    await prisma.agentTask.update({
      where: { id: taskId },
      data: { status: 'failed', error: errMsg, completedAt: new Date() },
    });

    await prisma.agent.update({
      where: { id: agentData.id },
      data: { status: 'error' },
    });

    await prisma.agentLog.create({
      data: {
        agentId: agentData.id,
        level: 'error',
        message: `Retry falhou: ${errMsg}`,
        metadata: JSON.stringify({ taskId }),
      },
    });
  }
}
