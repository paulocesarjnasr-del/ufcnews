import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { calculateWeeklyScores } from '@/lib/ai-company/xp-engine';

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await calculateWeeklyScores();
    return NextResponse.json({ success: true, message: 'Weekly review completed' });
  } catch (error) {
    console.error('Error running weekly review:', error);
    return NextResponse.json({ error: 'Failed to run weekly review' }, { status: 500 });
  }
}
