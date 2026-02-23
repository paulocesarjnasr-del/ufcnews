import { NextResponse } from 'next/server';
import { processEvents, emitEvent } from '@/lib/ai-company/event-bus';
import { getRegisteredEventTypes } from '@/lib/ai-company/pipelines';

/**
 * POST /api/company/events/process
 * Process all pending events in the event bus.
 * Called by cron or manually.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expectedSecret = process.env.CRON_SECRET || 'ufc-news-cron-secret';

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = await processEvents();
    return NextResponse.json({
      success: results.errors.length === 0,
      ...results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process events', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}

/**
 * GET /api/company/events/process
 * Emit an event manually (for testing/admin use).
 * Query params: type, payload (JSON string)
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  if (!type) {
    return NextResponse.json({
      usage: 'GET /api/company/events/process?type=event.finalized&payload={"eventoId":"..."}',
      registeredTypes: getRegisteredEventTypes(),
    });
  }

  const payloadStr = url.searchParams.get('payload') || '{}';
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(payloadStr);
  } catch {
    return NextResponse.json({ error: 'Invalid payload JSON' }, { status: 400 });
  }

  const eventId = await emitEvent(type, payload);
  return NextResponse.json({ eventId, type, payload, status: 'emitted' });
}
