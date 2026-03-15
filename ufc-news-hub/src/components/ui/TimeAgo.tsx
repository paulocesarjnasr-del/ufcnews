'use client';

import { useMemo } from 'react';
import { formatTimeAgo, isNewNews } from '@/lib/utils';

interface TimeAgoProps {
  date: Date | string;
  className?: string;
  showNewBadge?: boolean;
}

export function TimeAgo({ date, className, showNewBadge = false }: TimeAgoProps) {
  // Calculate once on render — no interval needed for news timestamps
  // News timestamps don't change, and "2 hours ago" vs "2 hours 1 min ago" doesn't matter
  const timeAgo = useMemo(() => formatTimeAgo(date), [date]);
  const isNew = useMemo(() => isNewNews(date), [date]);

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
