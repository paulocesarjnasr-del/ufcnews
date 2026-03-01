'use client';

import { ReelNoticia } from '@/types';

interface ReelCaptionProps {
  noticia: ReelNoticia;
}

export function ReelCaption({ noticia }: ReelCaptionProps) {
  const caption = noticia.reel_caption || noticia.titulo;
  const timeAgo = getTimeAgo(noticia.publicado_em);

  return (
    <div className="absolute bottom-6 left-4 right-20 z-10 md:bottom-10 md:left-8">
      <p className="text-lg font-bold leading-tight text-white drop-shadow-lg md:text-2xl">
        {caption}
      </p>
      <p className="mt-2 text-sm text-white/70">
        {noticia.fonte_nome} · {timeAgo}
      </p>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `há ${diffMin}min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH}h`;
  return `há ${Math.floor(diffH / 24)}d`;
}
