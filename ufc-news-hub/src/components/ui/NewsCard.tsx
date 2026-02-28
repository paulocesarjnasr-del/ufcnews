'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, isNewNews } from '@/lib/utils';
import { Noticia } from '@/types';
import { CategoryBadge } from './CategoryBadge';
import { TimeAgo } from './TimeAgo';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { ChevronRight, BarChart3 } from 'lucide-react';

interface NewsCardProps {
  noticia: Noticia;
  featured?: boolean;
}

export const NewsCard = memo(function NewsCard({ noticia, featured = false }: NewsCardProps) {
  const isNew = isNewNews(noticia.publicado_em);
  const isPoll = noticia.titulo.startsWith('[POLL]');

  return (
    <Link
      href={`/noticia/${noticia.id}`}
      className={cn(
        'group relative flex flex-col overflow-hidden neu-card-hover',
        featured && 'sm:col-span-2 lg:col-span-2'
      )}
    >
      {/* Imagem */}
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-[21/9]' : 'aspect-video'
        )}
      >
        <Image
          src={noticia.imagem_url || PLACEHOLDER_IMAGE}
          alt={noticia.titulo}
          fill
          priority={featured}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent" />

        {/* Badge NOVO */}
        {isNew && (
          <div className="absolute right-3 top-3">
            <span className="animate-pulse-red rounded bg-ufc-red px-2 py-1 text-xs font-bold text-white shadow-lg">
              NOVO
            </span>
          </div>
        )}

        {/* Badge de categoria sobre a imagem */}
        <div className="absolute bottom-3 left-3">
          <CategoryBadge categoria={noticia.categoria} />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-4">
        {/* Título */}
        <h2
          className={cn(
            'font-display uppercase leading-tight text-dark-text transition-colors group-hover:text-ufc-red',
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          )}
        >
          {noticia.titulo}
        </h2>

        {/* Subtítulo / Poll indicator */}
        {isPoll ? (
          <div className="mt-2 flex items-center gap-2 text-ufc-red">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Vote agora</span>
          </div>
        ) : noticia.subtitulo ? (
          <p
            className={cn(
              'mt-2 line-clamp-2 text-dark-textMuted',
              featured ? 'text-base' : 'text-sm'
            )}
          >
            {noticia.subtitulo}
          </p>
        ) : null}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <TimeAgo
              date={noticia.publicado_em}
              className="text-sm"
            />
            {noticia.fonte_nome === 'UFC AI Company' && (
              <span className="text-xs text-ufc-red font-medium">• Por Lucas Braga</span>
            )}
          </div>

          {/* Seta indicadora */}
          <span className="text-dark-textMuted transition-transform group-hover:translate-x-1 group-hover:text-ufc-red">
            <ChevronRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
});
