'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ComentarioComRespostas } from '@/types';
import { CommentForm } from './CommentForm';
import { formatTimeAgo } from '@/lib/utils';
import { MAX_COMMENT_DEPTH } from '@/lib/constants';

interface CommentCardProps {
  comentario: ComentarioComRespostas;
  noticiaId: string;
  depth?: number;
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

function getGravatarUrl(email: string | null, size: number = 80): string {
  if (!email) {
    return `https://www.gravatar.com/avatar/?d=mp&s=${size}`;
  }
  // Simple hash for client-side (not cryptographically secure, just for display)
  let hash = 0;
  const str = email.toLowerCase().trim();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  const hashStr = Math.abs(hash).toString(16).padStart(32, '0');
  return `https://www.gravatar.com/avatar/${hashStr}?d=mp&s=${size}`;
}

function getAuthorInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function CommentCard({
  comentario,
  noticiaId,
  depth = 0,
  onReply,
  onReport,
  isSubmitting,
}: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Calcular indentação (máximo 4 níveis)
  const indentLevel = Math.min(depth, MAX_COMMENT_DEPTH);
  const indentClass =
    indentLevel === 0
      ? ''
      : indentLevel === 1
        ? 'ml-4 sm:ml-8'
        : indentLevel === 2
          ? 'ml-8 sm:ml-12'
          : indentLevel === 3
            ? 'ml-12 sm:ml-16'
            : 'ml-12 sm:ml-16';

  const hasReplies = comentario.respostas.length > 0;
  const canReply = depth < MAX_COMMENT_DEPTH;

  const handleReport = async () => {
    if (isReporting || reportStatus === 'success') return;

    setIsReporting(true);
    const result = await onReport(comentario.id);

    if (result.success) {
      setReportStatus('success');
    } else {
      setReportStatus('error');
      setTimeout(() => setReportStatus('idle'), 3000);
    }
    setIsReporting(false);
  };

  const handleReplySubmit = async (dados: {
    noticia_id: string;
    parent_id?: string;
    autor_nome: string;
    autor_email?: string;
    conteudo: string;
  }) => {
    const result = await onReply(dados);
    if (result.success) {
      setIsReplying(false);
    }
    return result;
  };

  return (
    <div className={`${indentClass} ${depth > 0 ? 'border-l-2 border-dark-border pl-4' : ''}`}>
      <div className="rounded-lg bg-dark-card p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-dark-border">
            {comentario.autor_email ? (
              <Image
                src={getGravatarUrl(comentario.autor_email, 80)}
                alt={comentario.autor_nome}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-dark-textMuted">
                {getAuthorInitials(comentario.autor_nome)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Author and date */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-dark-text">
                {comentario.autor_nome}
              </span>
              <span className="text-xs text-dark-textMuted">
                {formatTimeAgo(comentario.created_at)}
              </span>
            </div>

            {/* Content */}
            <div className="mt-2 whitespace-pre-wrap text-sm text-dark-text">
              {comentario.conteudo}
            </div>

            {/* Actions */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
              {canReply && (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center gap-1 text-dark-textMuted transition-colors hover:text-ufc-red"
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
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <span>Responder</span>
                </button>
              )}

              <button
                onClick={handleReport}
                disabled={isReporting || reportStatus === 'success'}
                className={`flex items-center gap-1 transition-colors ${
                  reportStatus === 'success'
                    ? 'text-green-500'
                    : reportStatus === 'error'
                      ? 'text-ufc-red'
                      : 'text-dark-textMuted hover:text-ufc-red'
                }`}
              >
                {reportStatus === 'success' ? (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Reportado</span>
                  </>
                ) : (
                  <>
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
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                    <span>{isReporting ? 'Reportando...' : 'Reportar'}</span>
                  </>
                )}
              </button>

              {hasReplies && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="flex items-center gap-1 text-dark-textMuted transition-colors hover:text-dark-text"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    {isCollapsed
                      ? `Mostrar ${comentario.respostas.length} resposta${comentario.respostas.length > 1 ? 's' : ''}`
                      : 'Ocultar respostas'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reply form */}
      {isReplying && (
        <div className="mt-4 ml-4 sm:ml-8">
          <CommentForm
            noticiaId={noticiaId}
            parentId={comentario.id}
            onSubmit={handleReplySubmit}
            onCancel={() => setIsReplying(false)}
            isSubmitting={isSubmitting}
            isReply
            replyingTo={comentario.autor_nome}
          />
        </div>
      )}

      {/* Nested replies */}
      {hasReplies && !isCollapsed && (
        <div className="mt-4 space-y-4">
          {comentario.respostas.map((resposta) => (
            <CommentCard
              key={resposta.id}
              comentario={resposta}
              noticiaId={noticiaId}
              depth={depth + 1}
              onReply={onReply}
              onReport={onReport}
              isSubmitting={isSubmitting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
