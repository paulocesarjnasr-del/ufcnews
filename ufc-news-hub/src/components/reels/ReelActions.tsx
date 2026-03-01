'use client';

import { MessageCircle, Bookmark } from 'lucide-react';
import { ReelNoticia } from '@/types';
import { ReelLikeButton } from './ReelLikeButton';

interface ReelActionsProps {
  noticia: ReelNoticia;
  onToggleLike: () => void;
  onOpenComments: () => void;
}

export function ReelActions({ noticia, onToggleLike, onOpenComments }: ReelActionsProps) {
  return (
    <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/4 flex-col items-center gap-6 md:right-6">
      <ReelLikeButton
        liked={noticia.user_liked}
        count={noticia.likes_count}
        onToggle={onToggleLike}
      />

      <button
        onClick={onOpenComments}
        className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        aria-label="Comentários"
      >
        <MessageCircle className="h-7 w-7 text-white hover:text-ufc-gold transition-colors" />
        <span className="text-xs font-semibold text-white">{noticia.comments_count}</span>
      </button>

      <a
        href={noticia.fonte_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        aria-label="Ler notícia completa"
      >
        <Bookmark className="h-6 w-6 text-white hover:text-ufc-gold transition-colors" />
        <span className="text-[10px] font-medium text-white/70">Fonte</span>
      </a>
    </div>
  );
}
