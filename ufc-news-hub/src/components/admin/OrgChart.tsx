import type { Agent } from '@/lib/admin/types';
import { AgentCard } from './AgentCard';

interface OrgChartProps {
  agents: Record<string, Agent>;
  selectedAgent: string | null;
  onSelect: (id: string) => void;
  activeAgentIds?: string[];
  processing?: boolean;
}

export function OrgChart({ agents, selectedAgent, onSelect, activeAgentIds = [], processing = false }: OrgChartProps) {
  const isMissionMode = processing || activeAgentIds.length > 0;
  const activeSet = new Set(activeAgentIds);

  const ceo = agents.ceo;
  const cso = agents.cso;
  const directors = [agents['content-dir'], agents['analytics-dir'], agents['ops-dir']];

  return (
    <div className="space-y-6">
      {/* Executive Row */}
      <div className="flex justify-center gap-4">
        <div className="w-72">
          <AgentCard
            agent={ceo}
            onClick={onSelect}
            isSelected={selectedAgent === ceo.id}
            isActive={activeSet.has(ceo.id)}
            isMissionMode={isMissionMode}
          />
        </div>
        <div className="w-72">
          <AgentCard
            agent={cso}
            onClick={onSelect}
            isSelected={selectedAgent === cso.id}
            isActive={activeSet.has(cso.id)}
            isMissionMode={isMissionMode}
          />
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center">
        <div className={`w-px h-6 bg-dark-border transition-opacity duration-300 ${isMissionMode ? 'opacity-40' : ''}`} />
      </div>

      {/* Directors + their teams */}
      <div className="grid grid-cols-3 gap-4">
        {directors.map((dir) => {
          const dirActive = activeSet.has(dir.id);
          const teamHasActive = dir.reports.some((agentId) => activeSet.has(agentId));

          return (
            <div key={dir.id} className="space-y-3">
              <AgentCard
                agent={dir}
                onClick={onSelect}
                isSelected={selectedAgent === dir.id}
                isActive={dirActive}
                isMissionMode={isMissionMode}
              />
              <div className="flex justify-center">
                <div className={`w-px h-4 bg-dark-border/50 transition-opacity duration-300 ${isMissionMode && !dirActive && !teamHasActive ? 'opacity-30' : ''}`} />
              </div>
              <div className={`space-y-2 pl-4 border-l border-dark-border/50 transition-opacity duration-300 ${isMissionMode && !dirActive && !teamHasActive ? 'opacity-60' : ''}`}>
                {dir.reports.map((agentId) => (
                  <AgentCard
                    key={agentId}
                    agent={agents[agentId]}
                    onClick={onSelect}
                    isSelected={selectedAgent === agentId}
                    isActive={activeSet.has(agentId)}
                    isMissionMode={isMissionMode}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
