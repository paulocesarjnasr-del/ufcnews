import { NextRequest } from 'next/server';
import { pool, query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Track SSE connections to avoid pool exhaustion (pool max: 20)
const globalForSSE = globalThis as unknown as { __sseCount?: number };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventoId = searchParams.get('evento_id');

  if (!eventoId) {
    return new Response(JSON.stringify({ error: 'evento_id obrigatorio' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Limit concurrent SSE connections to protect the PG pool
  const sseCount = globalForSSE.__sseCount ?? 0;
  if (sseCount >= 5) {
    return new Response(JSON.stringify({ error: 'Limite de conexoes SSE atingido' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  globalForSSE.__sseCount = sseCount + 1;

  // Get current fight for initial counts
  const lutas = await query<{ luta_id: string }>(
    `SELECT id AS luta_id
     FROM lutas WHERE evento_id = $1
     ORDER BY CASE WHEN status = 'ao_vivo' THEN 0 ELSE 1 END, ordem DESC
     LIMIT 1`,
    [eventoId]
  );
  const currentLutaId = lutas[0]?.luta_id ?? null;

  // Dedicated PG connection for LISTEN
  const pgClient = await pool.connect();
  await pgClient.query('SET search_path TO public');

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      function send(event: string, data: unknown) {
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {
          // Controller may be closed
        }
      }

      // Send initial counts for current fight
      if (currentLutaId) {
        try {
          const result = await pgClient.query(
            `SELECT lutador_id, COUNT(*)::int AS count
             FROM reacoes_luta WHERE luta_id = $1
             GROUP BY lutador_id`,
            [currentLutaId]
          );
          const counts: Record<string, number> = {};
          for (const row of result.rows as Array<{ lutador_id: string; count: number }>) {
            counts[row.lutador_id] = row.count;
          }
          send('counts', { luta_id: currentLutaId, counts });
        } catch (err) {
          console.error('[SSE] Error fetching initial counts:', err);
        }
      }

      // LISTEN on reactions channel
      try {
        await pgClient.query('LISTEN reacoes_channel');
      } catch (err) {
        console.error('[SSE] LISTEN error:', err);
        pgClient.release();
        globalForSSE.__sseCount = Math.max(0, (globalForSSE.__sseCount ?? 1) - 1);
        controller.close();
        return;
      }

      // Forward PG notifications to SSE
      const onNotification = (msg: { channel: string; payload?: string }) => {
        if (msg.channel === 'reacoes_channel' && msg.payload) {
          try {
            const data = JSON.parse(msg.payload) as Record<string, unknown>;
            send('reaction', data);
          } catch {
            // Invalid payload
          }
        }
      };

      pgClient.on('notification', onNotification);

      // Heartbeat every 15s
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      // Cleanup on client disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        pgClient.removeListener('notification', onNotification);
        pgClient.query('UNLISTEN reacoes_channel').catch(() => {});
        pgClient.release();
        globalForSSE.__sseCount = Math.max(0, (globalForSSE.__sseCount ?? 1) - 1);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-store',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
