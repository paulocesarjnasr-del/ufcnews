import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';
import { awardTaskXP } from '@/lib/ai-company/xp-engine';

async function fetchArticleImage(title: string): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;

  // Try multiple search strategies from specific to broad
  const searchQueries = buildImageSearchQueries(title);

  for (const query of searchQueries) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${key}` } }
      );

      if (!res.ok) continue;
      const data = await res.json();

      if (data.results && data.results.length >= 3) {
        // Prefer photos that look like actual combat sports
        const fightWords = ['box', 'fight', 'ring', 'glove', 'kick', 'punch', 'martial', 'cage', 'octagon', 'sparr', 'knock'];
        const relevant = data.results.filter((r: { alt_description?: string; description?: string }) => {
          const desc = ((r.alt_description || r.description || '')).toLowerCase();
          return fightWords.some(kw => desc.includes(kw));
        });
        const pool = relevant.length >= 2 ? relevant : data.results;
        const photo = pool[Math.floor(Math.random() * Math.min(pool.length, 5))];
        return `${photo.urls.raw}&w=1200&h=675&fit=crop&q=80`;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function buildImageSearchQueries(title: string): string[] {
  const stopWords = ['vs', 'e', 'de', 'do', 'da', 'no', 'na', 'em', 'the', 'a', 'an', 'for', 'ufc', 'fight', 'night', 'preview', 'odds', 'analise'];
  const keywords = title
    .replace(/[—\-:|\[\]()]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.includes(w.toLowerCase()))
    .slice(0, 3)
    .join(' ');

  return [
    `MMA cage fight ${keywords}`,
    `MMA cage fight`,
    `kickboxing fight`,
    `mixed martial arts`,
  ];
}

async function handleApproval(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const { action, reviewedBy = 'gabriel', reviewNote } = await req.json();

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const approval = await prisma.approval.update({
      where: { id },
      data: {
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewedBy,
        reviewedAt: new Date(),
        reviewNote: reviewNote || null,
      },
      include: { task: true, agent: true },
    });

    if (action === 'approve') {
      await executeApprovedAction(approval);

      // Only mark task as completed if ALL approvals for this task are resolved
      const remainingPending = await prisma.approval.count({
        where: { taskId: approval.taskId, status: 'pending' },
      });

      if (remainingPending === 0) {
        await prisma.agentTask.update({
          where: { id: approval.taskId },
          data: { status: 'completed', completedAt: new Date() },
        });

        await prisma.agent.update({
          where: { id: approval.agentId },
          data: { tasksCompleted: { increment: 1 } },
        });

        // Award XP once (only when all approvals resolved)
        try {
          await awardTaskXP(approval.taskId);
        } catch {
          // XP award failure is non-critical
        }
      }

      await prisma.agentLog.create({
        data: {
          agentId: approval.agentId,
          level: 'info',
          message: `Acao "${approval.actionType}" APROVADA por ${reviewedBy}${remainingPending > 0 ? ` (${remainingPending} aprovação(ões) pendente(s))` : ''}`,
        },
      });
    } else {
      await prisma.agentTask.update({
        where: { id: approval.taskId },
        data: {
          status: 'failed',
          error: `Rejeitado por ${reviewedBy}: ${reviewNote || 'sem motivo'}`,
          completedAt: new Date(),
        },
      });

      await prisma.agentLog.create({
        data: {
          agentId: approval.agentId,
          level: 'warn',
          message: `Acao "${approval.actionType}" REJEITADA por ${reviewedBy}: ${reviewNote || 'sem motivo'}`,
        },
      });
    }

    return NextResponse.json({ success: true, approval });
  } catch (error) {
    console.error('Error processing approval:', error);
    return NextResponse.json(
      { error: 'Failed to process approval' },
      { status: 500 }
    );
  }
}

// Support both PATCH and POST (MissionConsole sends POST)
export const PATCH = handleApproval;
export const POST = handleApproval;

async function executeApprovedAction(approval: {
  actionType: string;
  payload: string;
  agentId: string;
  taskId: string;
}) {
  const payload = JSON.parse(approval.payload);

  switch (approval.actionType) {
    case 'review_output':
      // No-op — delegation-level review. Just marks the output as admin-approved.
      break;

    case 'publish_article': {
      // Fetch article image from Unsplash
      const imageUrl = await fetchArticleImage(payload.title);

      // Prevent duplicate articles — check if similar title from AI Company exists in last 2 hours
      const recentDupe = await prisma.noticias.findFirst({
        where: {
          fonte_nome: 'UFC AI Company',
          titulo: { startsWith: payload.title.slice(0, 40) },
          publicado_em: { gte: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        },
      });
      if (recentDupe) {
        // Update existing instead of creating duplicate
        await prisma.noticias.update({
          where: { id: recentDupe.id },
          data: {
            titulo: payload.title,
            subtitulo: payload.subtitle || recentDupe.subtitulo,
            conteudo_completo: payload.body,
            ...(imageUrl && !recentDupe.imagem_url ? { imagem_url: imageUrl } : {}),
          },
        });
      } else {
        await prisma.noticias.create({
          data: {
            titulo: payload.title,
            subtitulo: payload.subtitle || null,
            conteudo_completo: payload.body,
            imagem_url: imageUrl,
            categoria: 'lutas',
            fonte_url: `ai-company-${Date.now()}`,
            fonte_nome: 'UFC AI Company',
            publicado_em: new Date(),
          },
        });
      }
      break;
    }

    case 'moderate_comment':
      await prisma.comentarios.update({
        where: { id: payload.commentId },
        data: { status: payload.action },
      });
      break;

    case 'update_fighter':
      if (payload.fighterId) {
        const updates: Record<string, unknown> = {};
        if (payload.updates) {
          for (const [key, value] of Object.entries(payload.updates)) {
            updates[key] = value;
          }
        }
        await prisma.lutadores.update({
          where: { id: payload.fighterId },
          data: updates,
        });
      }
      break;

    case 'create_poll': {
      // Embed poll into the most recent AI Company article instead of creating a separate noticia
      const recentArticle = await prisma.noticias.findFirst({
        where: {
          fonte_nome: 'UFC AI Company',
          NOT: { titulo: { startsWith: '[POLL]' } },
        },
        orderBy: { publicado_em: 'desc' },
      });

      const pollMarker = `\n\n---\n\n<!-- POLL:${JSON.stringify({ question: payload.question, options: payload.options, relatedEvent: payload.relatedEvent })} -->`;

      if (recentArticle && recentArticle.conteudo_completo) {
        // Append poll to existing article
        await prisma.noticias.update({
          where: { id: recentArticle.id },
          data: {
            conteudo_completo: recentArticle.conteudo_completo + pollMarker,
          },
        });
      } else {
        // No article found — create standalone (fallback)
        await prisma.noticias.create({
          data: {
            titulo: `[POLL] ${payload.question}`,
            subtitulo: payload.options?.join(' | ') || '',
            conteudo_completo: pollMarker,
            categoria: 'lutas',
            fonte_url: `ai-company-poll-${Date.now()}`,
            fonte_nome: 'UFC AI Company',
            publicado_em: new Date(),
          },
        });
      }
      break;
    }

    default:
      console.warn(`Unknown action type: ${approval.actionType}`);
  }
}
