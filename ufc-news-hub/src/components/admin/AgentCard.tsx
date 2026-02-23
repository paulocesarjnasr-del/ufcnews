import Image from 'next/image';
import type { Agent } from '@/lib/admin/types';
import { StatusBadge } from './StatusBadge';
import { ModelBadge } from './ModelBadge';
import { AgentIcon } from './AgentIcon';
import { AlertTriangle } from 'lucide-react';
import { formatLastRun } from '@/lib/admin/utils';

interface AgentCardProps {
  agent: Agent;
  onClick: (id: string) => void;
  isSelected: boolean;
  isActive?: boolean;
  isMissionMode?: boolean;
}

export function AgentCard({ agent, onClick, isSelected, isActive, isMissionMode }: AgentCardProps) {
  const levelStyles = {
    executive: 'border-2 border-ufc-red/30 bg-gradient-to-br from-dark-card to-red-950/20',
    director: 'border border-dark-border bg-gradient-to-br from-dark-card to-dark-cardHover',
    agent: 'border border-dark-border/50 bg-dark-card',
  };

  const missionStyles = isMissionMode
    ? isActive
      ? 'mission-glow scale-[1.03] ring-2 ring-ufc-red/60 opacity-100 z-10 relative'
      : 'opacity-40 grayscale-[30%] hover:opacity-40 pointer-events-auto'
    : '';

  return (
    <div
      onClick={() => onClick(agent.id)}
      className={`neu-card-hover p-4 cursor-pointer transition-all duration-300 ${levelStyles[agent.level]} ${
        isSelected ? 'ring-2 ring-ufc-red shadow-lg shadow-ufc-red/10' : ''
      } ${missionStyles}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          {agent.avatarUrl ? (
            <div className="w-10 h-10 rounded-xl neu-inset overflow-hidden flex-shrink-0">
              <Image
                src={agent.avatarUrl}
                alt={agent.humanName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl neu-inset flex-shrink-0"
              style={{ color: agent.color }}
            >
              <AgentIcon name={agent.icon} className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-dark-text font-bold text-sm">{agent.humanName}</h3>
            <p className="text-dark-textMuted text-xs">
              {agent.codename} — {agent.role}
            </p>
          </div>
        </div>
        {isMissionMode && isActive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            ACTIVE
          </span>
        ) : (
          <StatusBadge status={agent.status} />
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <ModelBadge modelId={agent.model} />
      </div>

      <p className="text-dark-textMuted text-xs leading-relaxed mb-3 line-clamp-2">{agent.desc}</p>

      <div className="flex items-center justify-between text-xs text-dark-textMuted">
        <span>{(agent._count?.tasks ?? agent.tasksCompleted).toLocaleString()} tarefas</span>
        {agent.lastRunAt && (
          <span>{formatLastRun(agent.lastRunAt)}</span>
        )}
      </div>

      {/* XP Bar */}
      <div className="mt-2">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="text-dark-textMuted">
            L{agent.agentLevel} {agent.levelTitle}
          </span>
          <span className="text-dark-textMuted/60">
            {agent.agentLevel >= 4 ? 'MAX' : `${agent.xp}/${agent.xpToNextLevel} XP`}
          </span>
        </div>
        <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden neu-inset">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(() => {
              const lvl = agent.agentLevel;
              if (lvl >= 4) return 100;
              const thresholds: Record<number, [number, number]> = { 1: [0, 100], 2: [100, 500], 3: [500, 2000] };
              const [start, end] = thresholds[lvl] || [0, 100];
              const range = end - start;
              return Math.min(100, Math.max(0, ((agent.xp - start) / (range || 1)) * 100));
            })()}%` }}
          />
        </div>
      </div>

      {/* Weekly Score */}
      {agent.weeklyScore > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xs ${
                  star <= Math.round(agent.weeklyScore)
                    ? 'text-yellow-400'
                    : 'text-dark-border'
                }`}
              >
                *
              </span>
            ))}
          </div>
          <span className="text-dark-textMuted/60 text-[10px]">
            {agent.weeklyScore.toFixed(1)}/5.0
          </span>
        </div>
      )}

      {agent._count && agent._count.approvals > 0 && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-400 bg-orange-500/10 rounded-lg px-2.5 py-1.5">
          <AlertTriangle className="w-3 h-3" />
          <span>
            {agent._count.approvals} pendente{agent._count.approvals > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {agent.warnings > 0 && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 rounded-lg px-2.5 py-1.5">
          <AlertTriangle className="w-3 h-3" />
          <span>{agent.warnings} warning{agent.warnings > 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
}
