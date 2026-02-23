import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const encoder = new TextEncoder();
  let lastChecked = new Date(Date.now() - 5000);

  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(async () => {
        try {
          const recentLogs = await prisma.agentLog.findMany({
            where: { createdAt: { gt: lastChecked } },
            include: {
              agent: { select: { humanName: true, icon: true, color: true, codename: true } },
            },
            orderBy: { createdAt: 'asc' },
          });

          for (const log of recentLogs) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(log)}\n\n`)
            );
          }

          if (recentLogs.length > 0) {
            lastChecked = recentLogs[recentLogs.length - 1].createdAt;
          }
        } catch {
          // silent fail
        }
      }, 2000);

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
