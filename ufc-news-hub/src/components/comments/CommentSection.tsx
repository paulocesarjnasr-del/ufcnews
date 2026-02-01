'use client';

import { useComentarios } from '@/hooks/useComentarios';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface CommentSectionProps {
  noticiaId: string;
}

export function CommentSection({ noticiaId }: CommentSectionProps) {
  const {
    comentarios,
    total,
    isLoading,
    error,
    criarComentario,
    reportarComentario,
    isSubmitting,
  } = useComentarios(noticiaId);

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl uppercase text-dark-text">
          Comentários {total > 0 && <span className="text-ufc-red">({total})</span>}
        </h2>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 rounded-lg border border-ufc-red/30 bg-ufc-red/10 p-4 text-sm text-ufc-red">
          Erro ao carregar comentários. Tente recarregar a página.
        </div>
      )}

      {/* New comment form */}
      <div className="mb-8 rounded-lg border border-dark-border bg-dark-card p-4 sm:p-6">
        <h3 className="mb-4 text-sm font-medium text-dark-text">
          Deixe seu comentário
        </h3>
        <CommentForm
          noticiaId={noticiaId}
          onSubmit={criarComentario}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Comments list */}
      <CommentList
        comentarios={comentarios}
        noticiaId={noticiaId}
        isLoading={isLoading}
        onReply={criarComentario}
        onReport={reportarComentario}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}
