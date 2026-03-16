export function formatUltimoAcesso(timestamp: string | null): { text: string; isOnline: boolean } {
  if (!timestamp) return { text: 'Nunca acessou', isOnline: false };

  const diff = Date.now() - new Date(timestamp).getTime();
  const min = Math.floor(diff / 60_000);

  if (min < 5) return { text: 'Online', isOnline: true };
  if (min < 60) return { text: `Ha ${min}min`, isOnline: false };

  const hours = Math.floor(min / 60);
  if (hours < 24) return { text: `Ha ${hours}h`, isOnline: false };

  const days = Math.floor(hours / 24);
  if (days < 30) return { text: `Ha ${days}d`, isOnline: false };

  return { text: `Ha ${Math.floor(days / 30)}m`, isOnline: false };
}
