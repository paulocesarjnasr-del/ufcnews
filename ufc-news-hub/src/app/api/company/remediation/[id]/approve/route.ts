import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';
import { emitEvent } from '@/lib/ai-company/event-bus';

// POST: Admin approves a remediation plan
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const { reviewedBy = 'gabriel' } = await req.json().catch(() => ({}));

    const plan = await prisma.remediationPlan.findUnique({ where: { id } });
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }
    if (plan.status !== 'pending') {
      return NextResponse.json({ error: `Plan status is ${plan.status}, expected pending` }, { status: 400 });
    }

    await prisma.remediationPlan.update({
      where: { id },
      data: {
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: reviewedBy,
      },
    });

    // Emit event so the pipeline can react
    await emitEvent('remediation.approved', { planId: id, approvedBy: reviewedBy });

    return NextResponse.json({ success: true, message: 'Plan approved. Use /execute to run it.' });
  } catch (error) {
    console.error('Error approving plan:', error);
    return NextResponse.json({ error: 'Failed to approve plan' }, { status: 500 });
  }
}
