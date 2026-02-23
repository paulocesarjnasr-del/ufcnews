import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const agentId = req.nextUrl.searchParams.get('agentId');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10);

    const where: Record<string, unknown> = {};
    if (agentId) where.agentId = agentId;

    const reviews = await prisma.performanceReview.findMany({
      where,
      include: {
        agent: {
          select: {
            humanName: true,
            codename: true,
            icon: true,
            color: true,
            agentLevel: true,
            levelTitle: true,
            xp: true,
            weeklyScore: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Get current rankings
    const agents = await prisma.agent.findMany({
      where: { firedAt: null },
      select: {
        id: true,
        humanName: true,
        codename: true,
        icon: true,
        color: true,
        model: true,
        agentLevel: true,
        levelTitle: true,
        xp: true,
        xpToNextLevel: true,
        weeklyScore: true,
        weeklyTaskCount: true,
        weeklySuccessRate: true,
        warnings: true,
        tasksCompleted: true,
        promotedAt: true,
        demotedAt: true,
      },
      orderBy: { weeklyScore: 'desc' },
    });

    // Find employee of the week
    const latestEotw = await prisma.performanceReview.findFirst({
      where: { action: 'employee_of_week' },
      include: { agent: { select: { humanName: true, codename: true, icon: true, color: true } } },
      orderBy: { createdAt: 'desc' },
    });

    // Recent promotions/demotions
    const recentActions = await prisma.performanceReview.findMany({
      where: { action: { in: ['promoted', 'demoted', 'warning'] } },
      include: { agent: { select: { humanName: true, codename: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      reviews,
      rankings: agents,
      employeeOfTheWeek: latestEotw,
      recentActions,
    });
  } catch (error) {
    console.error('Error fetching performance:', error);
    return NextResponse.json({ error: 'Failed to fetch performance' }, { status: 500 });
  }
}
