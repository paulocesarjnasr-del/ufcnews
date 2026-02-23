import { MODELS } from '@/lib/admin/agents';
import type { AgentModel } from '@/lib/admin/types';

interface ModelBadgeProps {
  modelId: AgentModel;
  showName?: boolean;
}

export function ModelBadge({ modelId, showName }: ModelBadgeProps) {
  const m = MODELS[modelId];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${m.bg} ${m.textColor}`}>
      {m.tag}
      {showName && <span className="font-normal normal-case tracking-normal">{m.name}</span>}
    </span>
  );
}
