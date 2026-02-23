import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { processCompanyPrompt, type PromptEvent } from '@/lib/ai-company/orchestrator';

export const maxDuration = 300; // 5 minutes — allows time for human approval gates during pipeline

export async function POST(req: Request) {
  const authError = requireAdmin(req as NextRequest);
  if (authError) return authError;

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: PromptEvent) => {
          const chunk = `event: ${event.type}\ndata: ${JSON.stringify(event.data)}\n\n`;
          controller.enqueue(encoder.encode(chunk));
        };

        try {
          await processCompanyPrompt(prompt.trim(), send);
        } catch (error: unknown) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error';
          send({
            type: 'done',
            data: { error: errMsg },
          });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
