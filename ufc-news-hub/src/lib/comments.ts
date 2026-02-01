import { Comentario, ComentarioComRespostas } from '@/types';
import crypto from 'crypto';

/**
 * Gera um fingerprint baseado nos dados do navegador (server-side fallback)
 */
export function generateFingerprint(
  userAgent: string,
  ip: string,
  acceptLanguage: string = ''
): string {
  const data = `${userAgent}|${ip}|${acceptLanguage}`;
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 64);
}

/**
 * Gera URL do Gravatar baseado no email
 */
export function getGravatarUrl(email: string | null, size: number = 80): string {
  if (!email) {
    // Retorna avatar padrão do Gravatar (mystery person)
    return `https://www.gravatar.com/avatar/?d=mp&s=${size}`;
  }

  const hash = crypto
    .createHash('md5')
    .update(email.toLowerCase().trim())
    .digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?d=mp&s=${size}`;
}

/**
 * Sanitiza o conteúdo do comentário removendo HTML e scripts
 */
export function sanitizeContent(text: string): string {
  return text
    // Remove tags HTML
    .replace(/<[^>]*>/g, '')
    // Remove caracteres de controle exceto newlines
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normaliza múltiplas quebras de linha
    .replace(/\n{3,}/g, '\n\n')
    // Remove espaços em branco excessivos
    .replace(/[ \t]+/g, ' ')
    // Trim final
    .trim();
}

/**
 * Constrói a árvore de comentários a partir de uma lista plana
 */
export function buildCommentTree(
  flatComments: Comentario[]
): ComentarioComRespostas[] {
  const commentMap = new Map<string, ComentarioComRespostas>();
  const rootComments: ComentarioComRespostas[] = [];

  // Primeiro passo: criar mapa de todos os comentários
  flatComments.forEach((comment) => {
    commentMap.set(comment.id, {
      ...comment,
      respostas: [],
    });
  });

  // Segundo passo: organizar em árvore
  flatComments.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!;

    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      // É uma resposta - adicionar ao pai
      const parent = commentMap.get(comment.parent_id)!;
      parent.respostas.push(commentWithReplies);
    } else {
      // É um comentário raiz
      rootComments.push(commentWithReplies);
    }
  });

  // Ordenar recursivamente por data (mais recentes primeiro no nível raiz, mais antigos primeiro nas respostas)
  const sortComments = (
    comments: ComentarioComRespostas[],
    isRoot: boolean = true
  ): ComentarioComRespostas[] => {
    const sorted = [...comments].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      // Raiz: mais recentes primeiro; Respostas: mais antigos primeiro (cronológico)
      return isRoot ? dateB - dateA : dateA - dateB;
    });

    sorted.forEach((comment) => {
      if (comment.respostas.length > 0) {
        comment.respostas = sortComments(comment.respostas, false);
      }
    });

    return sorted;
  };

  return sortComments(rootComments, true);
}

/**
 * Calcula a profundidade de um comentário na árvore
 */
export function calculateDepth(
  commentId: string,
  flatComments: Comentario[]
): number {
  const commentMap = new Map(flatComments.map((c) => [c.id, c]));
  let depth = 0;
  let currentId: string | null = commentId;

  while (currentId) {
    const comment = commentMap.get(currentId);
    if (comment?.parent_id) {
      depth++;
      currentId = comment.parent_id;
    } else {
      break;
    }
  }

  return depth;
}

/**
 * Conta o total de comentários incluindo respostas
 */
export function countTotalComments(comments: ComentarioComRespostas[]): number {
  return comments.reduce((total, comment) => {
    return total + 1 + countTotalComments(comment.respostas);
  }, 0);
}

/**
 * Gera as iniciais do nome do autor
 */
export function getAuthorInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Verifica se um email é válido (validação básica)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
