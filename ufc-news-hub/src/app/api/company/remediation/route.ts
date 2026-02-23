import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { listRemediationPlans, analyzeForRemediation } from '@/lib/ai-company/remediation';

// GET: List remediation plans
export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const status = req.nextUrl.searchParams.get('status') || undefined;
    const plans = await listRemediationPlans(status);
    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Error listing remediation plans:', error);
    return NextResponse.json({ error: 'Failed to list plans' }, { status: 500 });
  }
}

// POST: Manually trigger remediation analysis from a report
export async function POST(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { report, promptId } = await req.json();
    if (!report) {
      return NextResponse.json({ error: 'report is required' }, { status: 400 });
    }

    const planId = await analyzeForRemediation(report, promptId);
    if (!planId) {
      return NextResponse.json({ message: 'No actionable problems found', planId: null });
    }

    return NextResponse.json({ planId, message: 'Remediation plan created' });
  } catch (error) {
    console.error('Error creating remediation plan:', error);
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
  }
}
