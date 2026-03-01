'use client';

import { Heart } from 'lucide-react';

interface ReelLikeButtonProps {
  liked: boolean;
  count: number;
  onToggle: () => void;
}

export function ReelLikeButton({ liked, count, onToggle }: ReelLikeButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="flex flex-col items-center gap-1 transition-transform active:scale-90"
      aria-label={liked ? 'Remover like' : 'Dar like'}
    >
      <Heart
        className={`h-7 w-7 transition-all duration-200 ${
          liked
            ? 'fill-ufc-red text-ufc-red animate-like-pop'
            : 'text-white hover:text-ufc-red'
        }`}
      />
      <span className="text-xs font-semibold text-white">{count}</span>
    </button>
  );
}
