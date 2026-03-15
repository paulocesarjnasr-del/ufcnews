import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const LEVELS: Record<number, { title: string; xpRequired: number }> = {
  1: { title: 'Trainee', xpRequired: 0 },
  2: { title: 'Specialist', xpRequired: 100 },
  3: { title: 'Senior', xpRequired: 500 },
  4: { title: 'Lead', xpRequired: 2000 },
};

/**
 * POST /api/admin/normalize-xp
 * Scans all agents and fixes any XP/level inconsistencies:
 * - Promotes agents whose XP exceeds their level cap
 * - Clamps XP to level ceiling for agents at max (L4)
 * - Fixes xpToNextLevel field
 */
export async function POST(_req: NextRequest) {
  try {
    const agents = await prisma.agent.findMany({ where: { firedAt: null } });
    const fixes: Array<{ id: string; name: string; action: string; from: string; to: string }> = [];

    for (const agent of agents) {
      let newLevel = agent.agentLevel;
      let newXp = agent.xp;

      // Check if agent should be promoted (XP >= next level threshold)
      while (newLevel < 4 && LEVELS[newLevel + 1] && newXp >= LEVELS[newLevel + 1].xpRequired) {
        newLevel++;
      }

      // For L4 agents, cap XP at 2000 (the L4 threshold) — no infinite accumulation
      if (newLevel >= 4) {
        // L4 max cap — XP stays but is display-capped
        newXp = Math.min(newXp, 9999);
      }

      // Compute correct xpToNextLevel
      const nextThreshold = newLevel >= 4 ? 9999 : (LEVELS[newLevel + 1]?.xpRequired ?? 9999);

      // Check if anything changed
      if (newLevel !== agent.agentLevel || nextThreshold !== agent.xpToNextLevel) {
        const levelInfo = LEVELS[newLevel];

        await prisma.agent.update({
          where: { id: agent.id },
          data: {
            agentLevel: newLevel,
            levelTitle: levelInfo.title,
            xp: newXp,
            xpToNextLevel: nextThreshold,
            ...(newLevel > agent.agentLevel ? { promotedAt: new Date() } : {}),
          },
        });

        if (newLevel > agent.agentLevel) {
          await prisma.agentLog.create({
            data: {
              agentId: agent.id,
              level: 'info',
              message: `NORMALIZE: Promoted from L${agent.agentLevel} to L${newLevel} (${levelInfo.title}). XP: ${newXp}`,
              metadata: JSON.stringify({ from: agent.agentLevel, to: newLevel, xp: newXp }),
            },
          });
        }

        fixes.push({
          id: agent.id,
          name: agent.humanName,
          action: newLevel > agent.agentLevel ? 'promoted' : 'fixed_threshold',
          from: `L${agent.agentLevel} (xp=${agent.xp}, next=${agent.xpToNextLevel})`,
          to: `L${newLevel} (xp=${newXp}, next=${nextThreshold})`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalAgents: agents.length,
      fixes: fixes.length,
      details: fixes,
    });
  } catch (error) {
    console.error('Error normalizing XP:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
