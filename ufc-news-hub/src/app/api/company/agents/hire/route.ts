import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { humanName, codename, role, title, model, systemPrompt, reportsTo, icon, color, desc } =
      await req.json();

    if (!humanName || !codename || !role || !title || !model || !systemPrompt) {
      return NextResponse.json(
        { error: 'Missing required fields: humanName, codename, role, title, model, systemPrompt' },
        { status: 400 }
      );
    }

    const agentId = codename.toLowerCase().replace(/\s+/g, '-');

    // Check if agent already exists
    const existing = await prisma.agent.findUnique({ where: { id: agentId } });
    if (existing) {
      return NextResponse.json(
        { error: `Agent with id "${agentId}" already exists` },
        { status: 409 }
      );
    }

    const newAgent = await prisma.agent.create({
      data: {
        id: agentId,
        humanName,
        codename,
        role,
        title,
        model,
        systemPrompt,
        level: 'agent',
        status: 'idle',
        icon: icon || 'bot',
        color: color || '#6B7280',
        desc: desc || '',
        reportsTo: reportsTo || null,
        reports: [],
        // XP System — starts as Trainee
        agentLevel: 1,
        levelTitle: 'Trainee',
        xp: 0,
        xpToNextLevel: 100,
        hiredAt: new Date(),
      },
    });

    // Update parent's reports array if reportsTo is set
    if (reportsTo) {
      const parent = await prisma.agent.findUnique({ where: { id: reportsTo } });
      if (parent) {
        await prisma.agent.update({
          where: { id: reportsTo },
          data: { reports: [...parent.reports, agentId] },
        });
      }
    }

    await prisma.agentLog.create({
      data: {
        agentId: newAgent.id,
        level: 'info',
        message: `CONTRATADO como ${role} (Trainee). Bem-vindo a UFC AI Company!`,
      },
    });

    return NextResponse.json(newAgent);
  } catch (error) {
    console.error('Error hiring agent:', error);
    return NextResponse.json({ error: 'Failed to hire agent' }, { status: 500 });
  }
}
