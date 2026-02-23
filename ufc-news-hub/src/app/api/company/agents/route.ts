import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    // Auto-reset agents stuck in 'error' for more than 1 hour → back to 'idle'
    await prisma.agent.updateMany({
      where: {
        status: 'error',
        lastRunAt: { lt: new Date(Date.now() - 60 * 60 * 1000) },
      },
      data: { status: 'idle' },
    });

    const agents = await prisma.agent.findMany({
      orderBy: [
        { level: 'asc' },
        { humanName: 'asc' },
      ],
      include: {
        _count: {
          select: {
            tasks: true,
            logs: true,
            approvals: {
              where: { status: 'pending' },
            },
          },
        },
      },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
