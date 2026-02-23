import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { ceoDailyBrief } from '@/lib/ai-company/daily-brief';

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const briefing = await ceoDailyBrief();
    return NextResponse.json({ success: true, briefing });
  } catch (error) {
    console.error('Error running daily brief:', error);
    return NextResponse.json({ error: 'Failed to run daily brief' }, { status: 500 });
  }
}
