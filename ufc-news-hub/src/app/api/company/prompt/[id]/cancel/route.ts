import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    // Find the prompt
    const prompt = await prisma.companyPrompt.findUnique({
      where: { id },
    });

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Get task IDs from prompt — the `tasks` field is a String[] of task IDs
    const taskIds = (prompt.tasks || []) as string[];

    if (taskIds.length === 0) {
      return NextResponse.json({ error: 'No tasks associated with this prompt' }, { status: 400 });
    }

    // Cancel all pending/running tasks
    const result = await prisma.agentTask.updateMany({
      where: {
        id: { in: taskIds },
        status: { in: ['pending', 'running', 'awaiting_approval'] },
      },
      data: {
        status: 'failed',
        error: 'Cancelled by admin',
        completedAt: new Date(),
      },
    });

    // Also reject any pending approvals for these tasks
    await prisma.approval.updateMany({
      where: {
        taskId: { in: taskIds },
        status: 'pending',
      },
      data: {
        status: 'rejected',
        reviewedBy: 'system:cancelled',
        reviewedAt: new Date(),
        reviewNote: 'Mission cancelled by admin',
      },
    });

    // Update prompt status
    await prisma.companyPrompt.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    // Reset all involved agents to idle
    const tasks = await prisma.agentTask.findMany({
      where: { id: { in: taskIds } },
      select: { agentId: true },
    });
    const agentIds = [...new Set(tasks.map(t => t.agentId))];

    await prisma.agent.updateMany({
      where: { id: { in: agentIds }, status: 'active' },
      data: { status: 'idle' },
    });

    // Log cancellation
    await prisma.agentLog.create({
      data: {
        agentId: 'ceo',
        level: 'warn',
        message: `Mission CANCELLED by admin. ${result.count} tasks cancelled.`,
      },
    });

    return NextResponse.json({
      success: true,
      cancelledTasks: result.count,
      totalTasks: taskIds.length,
    });
  } catch (error) {
    console.error('Error cancelling mission:', error);
    return NextResponse.json({ error: 'Failed to cancel mission' }, { status: 500 });
  }
}
