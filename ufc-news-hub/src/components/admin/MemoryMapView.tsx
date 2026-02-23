import type { Agent } from '@/lib/admin/types';
import { DATABASES } from '@/lib/admin/connections';
import { AgentIcon } from './AgentIcon';

interface MemoryMapViewProps {
  agents: Record<string, Agent>;
}

export function MemoryMapView({ agents }: MemoryMapViewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-dark-text text-lg font-bold">Memoria Compartilhada</h3>
        <p className="text-dark-textMuted text-sm">
          7 bancos de dados que conectam todos os agentes. Quem le e quem escreve.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {DATABASES.map((db) => (
          <div key={db.id} className="neu-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl neu-inset text-ufc-red">
                <AgentIcon name={db.icon} className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-dark-text font-bold text-sm">{db.name}</h4>
                <p className="text-dark-textMuted text-xs">{db.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h5 className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                  Leitores (READ)
                </h5>
                <div className="flex flex-wrap gap-1">
                  {db.readers.map((id) => {
                    const a = agents[id];
                    if (!a) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px]"
                      >
                        <AgentIcon name={a.icon} className="w-3 h-3" />
                        {a.humanName.split(' ')[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <h5 className="text-green-400 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                  Escritores (WRITE)
                </h5>
                <div className="flex flex-wrap gap-1">
                  {db.writers.map((id) => {
                    const a = agents[id];
                    if (!a) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-300 text-[10px]"
                      >
                        <AgentIcon name={a.icon} className="w-3 h-3" />
                        {a.humanName.split(' ')[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
