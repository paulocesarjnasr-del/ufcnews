import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const status = req.nextUrl.searchParams.get('status') || 'pending';
    const reviewedBy = req.nextUrl.searchParams.get('reviewedBy');
    const limitParam = req.nextUrl.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const where: Record<string, unknown> = { status };
    if (reviewedBy) where.reviewedBy = reviewedBy;

    const approvals = await prisma.approval.findMany({
      where,
      include: {
        task: true,
        agent: { select: { humanName: true, codename: true, icon: true, color: true } },
      },
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: limit } : {}),
    });

    return NextResponse.json(approvals);
  } catch (error) {
    console.error('Error fetching approvals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch approvals' },
      { status: 500 }
    );
  }
}
