import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { executeRemediationPlan } from '@/lib/ai-company/remediation';

// POST: Execute an approved remediation plan
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const result = await executeRemediationPlan(id);

    return NextResponse.json({
      success: result.success,
      results: result.results,
    });
  } catch (error) {
    console.error('Error executing remediation plan:', error);
    return NextResponse.json({ error: 'Failed to execute plan' }, { status: 500 });
  }
}
