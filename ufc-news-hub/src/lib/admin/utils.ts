export function formatLastRun(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Nunca';

  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return `${diffSec} seg atras`;
  if (diffMin < 60) return `${diffMin} min atras`;
  if (diffHours < 24) return `${diffHours}h atras`;
  return `${diffDays}d atras`;
}
