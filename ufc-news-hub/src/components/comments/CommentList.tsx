'use client';

import { ComentarioComRespostas } from '@/types';
import { CommentCard } from './CommentCard';
import { CommentSkeletonList } from './CommentSkeleton';

interface CommentListProps {
  comentarios: ComentarioComRespostas[];
  noticiaId: string;
  isLoading: boolean;
  onReply: (dados: {
    noticia_id: string;
    parent_id?: string;
    autor_nome: string;
    autor_email?: string;
    conteudo: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onReport: (id: string) => Promise<{ success: boolean; error?: string; hidden?: boolean }>;
  isSubmitting: boolean;
}

export function CommentList({
  comentarios,
  noticiaId,
  isLoading,
  onReply,
  onReport,
  isSubmitting,
}: CommentListProps) {
  if (isLoading) {
    return <CommentSkeletonList count={3} />;
  }

  if (comentarios.length === 0) {
    return (
      <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-dark-textMuted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-dark-text">
          Nenhum comentário ainda
        </h3>
        <p className="mt-2 text-sm text-dark-textMuted">
          Seja o primeiro a comentar nesta notícia!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comentarios.map((comentario) => (
        <CommentCard
          key={comentario.id}
          comentario={comentario}
          noticiaId={noticiaId}
          depth={0}
          onReply={onReply}
          onReport={onReport}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
}
