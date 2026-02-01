'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { NewsCard } from '@/components/ui/NewsCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useNoticia } from '@/hooks/useNoticias';
import { formatDate, getInitials } from '@/lib/utils';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Noticia, Lutador } from '@/types';
import { CommentSection } from '@/components/comments/CommentSection';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NoticiaPage({ params }: PageProps) {
  const { id } = use(params);
  const { noticia, isLoading, error } = useNoticia(id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error || !noticia) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-2xl font-bold text-dark-text">
            Noticia nao encontrada
          </h1>
          <p className="mb-6 text-dark-textMuted">
            A noticia que voce procura nao existe ou foi removida.
          </p>
          <Link
            href="/"
            className="rounded-md bg-ufc-red px-4 py-2 text-white transition-colors hover:bg-ufc-redDark"
          >
            Voltar para Home
          </Link>
        </div>
      </MainLayout>
    );
  }

  const { lutadores, relacionadas } = noticia as {
    lutadores?: Lutador[];
    relacionadas?: Noticia[];
  } & Noticia;

  return (
    <MainLayout>
      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="group mb-4 inline-flex items-center gap-2 text-dark-textMuted transition-colors hover:text-ufc-red"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Voltar</span>
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <CategoryBadge categoria={noticia.categoria} />
          </div>
        </div>

        {/* Imagem Hero */}
        <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
          <Image
            src={noticia.imagem_url || PLACEHOLDER_IMAGE}
            alt={noticia.titulo}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Titulo */}
        <h1 className="mb-4 font-display text-3xl uppercase leading-tight text-dark-text md:text-4xl lg:text-5xl">
          {noticia.titulo}
        </h1>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-dark-textMuted">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(noticia.publicado_em)}
          </span>

          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <TimeAgo date={noticia.publicado_em} />
          </span>

          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            {noticia.fonte_nome}
          </span>
        </div>

        {/* Separador */}
        <hr className="mb-6 border-dark-border" />

        {/* Conteudo */}
        <div className="prose prose-invert mb-8 max-w-none">
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-dark-text">
            {noticia.conteudo_completo || noticia.subtitulo}
          </p>
        </div>

        {/* Separador */}
        <hr className="mb-6 border-dark-border" />

        {/* Lutadores Mencionados */}
        {lutadores && lutadores.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl uppercase text-dark-text">
              Lutadores Mencionados
            </h2>
            <div className="flex flex-wrap gap-4">
              {lutadores.map((lutador) => (
                <div
                  key={lutador.id}
                  className="flex flex-col items-center rounded-lg border border-dark-border bg-dark-card p-4 transition-all hover:border-ufc-red/30"
                >
                  {lutador.imagem_url ? (
                    <Image
                      src={lutador.imagem_url}
                      alt={lutador.nome}
                      width={64}
                      height={64}
                      className="mb-2 h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-dark-border text-lg font-bold text-dark-textMuted">
                      {getInitials(lutador.nome)}
                    </div>
                  )}
                  <span className="text-center text-sm font-medium text-dark-text">
                    {lutador.nome}
                  </span>
                  {lutador.categoria_peso && (
                    <span className="text-xs text-dark-textMuted">
                      {lutador.categoria_peso}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fonte Original */}
        <section className="mb-8">
          <a
            href={noticia.fonte_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-dark-border px-4 py-2 text-sm text-dark-textMuted transition-all hover:border-ufc-red hover:text-ufc-red"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Ver noticia original em {noticia.fonte_nome}
          </a>
        </section>

        {/* Separador */}
        <hr className="mb-8 border-dark-border" />

        {/* Noticias Relacionadas */}
        {relacionadas && relacionadas.length > 0 && (
          <section>
            <h2 className="mb-6 font-display text-xl uppercase text-dark-text">
              Noticias Relacionadas
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((relacionada) => (
                <NewsCard key={relacionada.id} noticia={relacionada} />
              ))}
            </div>
          </section>
        )}

        {/* Separador antes dos comentários */}
        <hr className="my-8 border-dark-border" />

        {/* Seção de Comentários */}
        <CommentSection noticiaId={noticia.id} />
      </article>
    </MainLayout>
  );
}
