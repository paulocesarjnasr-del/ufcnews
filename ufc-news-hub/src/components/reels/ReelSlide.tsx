'use client';

import { useState } from 'react';
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
  const [imgError, setImgError] = useState(false);
  const hasImage = noticia.imagem_url && !imgError;

  return (
    <div
      className="relative h-[60vh] w-full flex-shrink-0 overflow-hidden rounded-2xl md:h-[70vh]"
      role="article"
      aria-label={noticia.reel_caption || noticia.titulo}
    >
      {hasImage ? (
        <>
          {/* Blurred background — fills the entire slide */}
          <Image
            src={noticia.imagem_url!}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover scale-110 blur-xl brightness-50"
            sizes="100vw"
            onError={() => setImgError(true)}
          />

          {/* Main image — centered, not cropped */}
          <Image
            src={noticia.imagem_url!}
            alt={noticia.titulo}
            fill
            className="object-contain z-[1]"
            priority={isActive}
            sizes="(max-width: 768px) 100vw, 80vw"
            onError={() => setImgError(true)}
          />
        </>
      ) : (
        /* Gradient fallback when no image */
        <div className="absolute inset-0 bg-gradient-to-br from-ufc-red/20 via-dark-card to-dark-bg">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <polygon
                points="37,7 83,7 113,37 113,83 83,113 37,113 7,83 7,37"
                fill="none"
                stroke="#D20A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Gradient Overlay — always on top for text readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="rounded-full bg-ufc-red/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {noticia.categoria}
        </span>
      </div>

      {/* Caption — absolute positioned at bottom-left */}
      <ReelCaption noticia={noticia} />

      {/* Actions — absolute positioned at bottom-right (Instagram style) */}
      <ReelActions
        noticia={noticia}
        onToggleLike={onToggleLike}
        onOpenComments={onOpenComments}
      />
    </div>
  );
}
