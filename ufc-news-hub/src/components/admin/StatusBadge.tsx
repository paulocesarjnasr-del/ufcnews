import { STATUS_CONFIG } from '@/lib/admin/agents';
import type { AgentStatus } from '@/lib/admin/types';

interface StatusBadgeProps {
  status: AgentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot} ${c.pulse ? 'animate-pulse' : ''}`} />
      {c.label}
    </span>
  );
}
