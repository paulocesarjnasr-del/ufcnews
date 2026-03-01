'use client';

import Image from 'next/image';
import { ReelNoticia } from '@/types';
import { ReelCaption } from './ReelCaption';
import { ReelActions } from './ReelActions';

interface ReelSlideProps {
  noticia: ReelNoticia;
  isActive: boolean;
  onToggleLike: () => void;
  onOpenComments: () => void;
}

export function ReelSlide({ noticia, isActive, onToggleLike, onOpenComments }: ReelSlideProps) {
  return (
    <div className="relative h-[60vh] w-full flex-shrink-0 overflow-hidden rounded-2xl md:h-[70vh]">
      {/* Background Image */}
      {noticia.imagem_url ? (
        <Image
          src={noticia.imagem_url}
          alt={noticia.titulo}
          fill
          className="object-cover"
          priority={isActive}
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ufc-red/30 via-dark-bg to-dark-bg" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="rounded-full bg-ufc-red/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {noticia.categoria}
        </span>
      </div>

      {/* Caption */}
      <ReelCaption noticia={noticia} />

      {/* Actions */}
      <ReelActions
        noticia={noticia}
        onToggleLike={onToggleLike}
        onOpenComments={onOpenComments}
      />
    </div>
  );
}
