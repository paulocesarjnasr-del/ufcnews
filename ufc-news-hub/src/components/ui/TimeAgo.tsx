'use client';

import { useState, useEffect } from 'react';
import { formatTimeAgo, isNewNews } from '@/lib/utils';

interface TimeAgoProps {
  date: Date | string;
  className?: string;
  showNewBadge?: boolean;
}

export function TimeAgo({ date, className, showNewBadge = false }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    // Calcular tempo inicial
    setTimeAgo(formatTimeAgo(date));
    setIsNew(isNewNews(date));

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(date));
      setIsNew(isNewNews(date));
    }, 30000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span className={className}>
      {showNewBadge && isNew && (
        <span className="mr-2 inline-flex animate-pulse-red items-center rounded bg-ufc-red px-1.5 py-0.5 text-xs font-bold text-white">
          NOVO
        </span>
      )}
      <span className="text-dark-textMuted">{timeAgo}</span>
    </span>
  );
}
