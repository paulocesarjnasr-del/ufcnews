'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAutorStorage } from '@/hooks/useComentarios';
import {
  COMMENT_MAX_LENGTH,
  COMMENT_MIN_LENGTH,
  AUTHOR_NAME_MAX,
  AUTHOR_NAME_MIN,
} from '@/lib/constants';

interface CommentFormProps {
  noticiaId: string;
  parentId?: string;
  onSubmit: (dados: {
    noticia_id: string;
    parent_id?: string;
    autor_nome: string;
    autor_email?: string;
    conteudo: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onCancel?: () => void;
  isSubmitting: boolean;
  isReply?: boolean;
  replyingTo?: string;
}

export function CommentForm({
  noticiaId,
  parentId,
  onSubmit,
  onCancel,
  isSubmitting,
  isReply = false,
  replyingTo,
}: CommentFormProps) {
  const { getAutor, saveAutor } = useAutorStorage();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  // Carregar dados salvos do localStorage
  useEffect(() => {
    const saved = getAutor();
    if (saved.nome) setNome(saved.nome);
    if (saved.email) setEmail(saved.email);
  }, [getAutor]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações client-side
    if (nome.trim().length < AUTHOR_NAME_MIN) {
      setError(`Nome deve ter no mínimo ${AUTHOR_NAME_MIN} caracteres`);
      return;
    }

    if (nome.trim().length > AUTHOR_NAME_MAX) {
      setError(`Nome deve ter no máximo ${AUTHOR_NAME_MAX} caracteres`);
      return;
    }

    if (conteudo.trim().length < COMMENT_MIN_LENGTH) {
      setError(`Comentário deve ter no mínimo ${COMMENT_MIN_LENGTH} caracteres`);
      return;
    }

    if (conteudo.trim().length > COMMENT_MAX_LENGTH) {
      setError(`Comentário deve ter no máximo ${COMMENT_MAX_LENGTH} caracteres`);
      return;
    }

    // Honeypot check
    if (honeypot) {
      // Bot detected, pretend success
      setConteudo('');
      return;
    }

    const result = await onSubmit({
      noticia_id: noticiaId,
      parent_id: parentId,
      autor_nome: nome.trim(),
      autor_email: email.trim() || undefined,
      conteudo: conteudo.trim(),
    });

    if (result.success) {
      // Salvar dados do autor
      saveAutor({ nome: nome.trim(), email: email.trim() });
      // Limpar conteúdo
      setConteudo('');
      // Se for resposta, chamar onCancel para fechar o form
      if (isReply && onCancel) {
        onCancel();
      }
    } else {
      setError(result.error || 'Erro ao enviar comentário');
    }
  };

  const caracteresRestantes = COMMENT_MAX_LENGTH - conteudo.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isReply && replyingTo && (
        <div className="text-sm text-dark-textMuted">
          Respondendo a <span className="font-medium text-ufc-red">{replyingTo}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Nome */}
        <div>
          <label
            htmlFor={`nome-${parentId || 'root'}`}
            className="mb-1 block text-sm font-medium text-dark-text"
          >
            Nome <span className="text-ufc-red">*</span>
          </label>
          <input
            type="text"
            id={`nome-${parentId || 'root'}`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            maxLength={AUTHOR_NAME_MAX}
            className="w-full rounded-md border border-dark-border bg-dark-bg px-3 py-2 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none focus:ring-1 focus:ring-ufc-red"
            disabled={isSubmitting}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor={`email-${parentId || 'root'}`}
            className="mb-1 block text-sm font-medium text-dark-text"
          >
            Email <span className="text-dark-textMuted">(opcional)</span>
          </label>
          <input
            type="email"
            id={`email-${parentId || 'root'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full rounded-md border border-dark-border bg-dark-bg px-3 py-2 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none focus:ring-1 focus:ring-ufc-red"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Honeypot field - hidden from real users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Conteúdo */}
      <div>
        <label
          htmlFor={`conteudo-${parentId || 'root'}`}
          className="mb-1 block text-sm font-medium text-dark-text"
        >
          Comentário <span className="text-ufc-red">*</span>
        </label>
        <textarea
          id={`conteudo-${parentId || 'root'}`}
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder={isReply ? 'Escreva sua resposta...' : 'Escreva seu comentário...'}
          rows={isReply ? 3 : 4}
          maxLength={COMMENT_MAX_LENGTH}
          className="w-full resize-none rounded-md border border-dark-border bg-dark-bg px-3 py-2 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none focus:ring-1 focus:ring-ufc-red"
          disabled={isSubmitting}
        />
        <div className="mt-1 flex justify-between text-xs text-dark-textMuted">
          <span>
            {caracteresRestantes < 200 && (
              <span className={caracteresRestantes < 50 ? 'text-ufc-red' : ''}>
                {caracteresRestantes} caracteres restantes
              </span>
            )}
          </span>
          <span>
            {conteudo.length}/{COMMENT_MAX_LENGTH}
          </span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-md bg-ufc-red/10 px-3 py-2 text-sm text-ufc-red">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !nome.trim() || !conteudo.trim()}
          className="rounded-md bg-ufc-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ufc-red/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Enviando...
            </span>
          ) : isReply ? (
            'Responder'
          ) : (
            'Comentar'
          )}
        </button>

        {isReply && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-md px-4 py-2 text-sm font-medium text-dark-textMuted transition-colors hover:text-dark-text"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
