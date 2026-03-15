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
    <div className="absolute bottom-6 right-4 z-10 flex flex-col items-center gap-5 md:bottom-10 md:right-6">
      {/* Like */}
      <ReelLikeButton
        liked={noticia.user_liked}
        count={noticia.likes_count}
        onToggle={onToggleLike}
      />

      {/* Comments */}
      <button
        onClick={onOpenComments}
        className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        aria-label="Comentários"
      >
        <MessageCircle className="h-7 w-7 text-white hover:text-ufc-gold transition-colors" />
        <span className="text-xs font-semibold text-white">{noticia.comments_count}</span>
      </button>

      {/* Source link */}
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
