import { query } from './db';
import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } from './constants';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // segundos até reset
}

/**
 * Verifica se o usuário pode criar um novo comentário (rate limiting)
 */
export async function checkRateLimit(
  fingerprint: string
): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW);

  // Contar comentários recentes deste fingerprint
  const result = await query<{ count: string }>(
    `SELECT COUNT(*) as count
     FROM comentarios_rate_limit
     WHERE fingerprint = $1 AND created_at > $2`,
    [fingerprint, windowStart.toISOString()]
  );

  const count = parseInt(result[0]?.count || '0', 10);
  const allowed = count < RATE_LIMIT_MAX;
  const remaining = Math.max(0, RATE_LIMIT_MAX - count);

  // Calcular tempo até reset (encontrar o comentário mais antigo na janela)
  let resetIn = 0;
  if (!allowed) {
    const oldest = await query<{ created_at: string }>(
      `SELECT created_at
       FROM comentarios_rate_limit
       WHERE fingerprint = $1 AND created_at > $2
       ORDER BY created_at ASC
       LIMIT 1`,
      [fingerprint, windowStart.toISOString()]
    );

    if (oldest[0]) {
      const oldestTime = new Date(oldest[0].created_at).getTime();
      const resetTime = oldestTime + RATE_LIMIT_WINDOW;
      resetIn = Math.ceil((resetTime - Date.now()) / 1000);
    }
  }

  return { allowed, remaining, resetIn };
}

/**
 * Registra uma ação no rate limit
 */
export async function recordRateLimitAction(fingerprint: string): Promise<void> {
  await query(
    `INSERT INTO comentarios_rate_limit (fingerprint) VALUES ($1)`,
    [fingerprint]
  );
}

/**
 * Lista de palavras/padrões de spam comuns
 */
const SPAM_PATTERNS = [
  // Links suspeitos
  /bit\.ly/i,
  /tinyurl/i,
  /goo\.gl/i,
  // Padrões de spam comum
  /ganhe\s+dinheiro/i,
  /renda\s+extra/i,
  /trabalhe\s+em\s+casa/i,
  /clique\s+aqui/i,
  /acesse\s+agora/i,
  /promoção\s+imperdível/i,
  /oferta\s+exclusiva/i,
  // Crypto spam
  /bitcoin/i,
  /crypto/i,
  /investimento\s+garantido/i,
  // Casino/apostas
  /casino/i,
  /aposte\s+agora/i,
  /bet365/i,
  // Viagra e similares
  /viagra/i,
  /cialis/i,
  // Repetição excessiva de caracteres
  /(.)\1{5,}/,
  // Muitas letras maiúsculas seguidas
  /[A-Z]{10,}/,
];

/**
 * Verifica se o texto contém padrões de spam
 */
export function containsSpam(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Conta o número de URLs no texto
 */
export function countUrls(text: string): number {
  const urlPattern = /https?:\/\/[^\s]+|www\.[^\s]+/gi;
  const matches = text.match(urlPattern);
  return matches ? matches.length : 0;
}

/**
 * Verifica se o conteúdo é suspeito (muitos URLs ou spam)
 */
export function isSuspiciousContent(text: string): {
  suspicious: boolean;
  reason?: string;
} {
  // Verificar spam
  if (containsSpam(text)) {
    return { suspicious: true, reason: 'Conteúdo identificado como spam' };
  }

  // Verificar excesso de URLs
  const urlCount = countUrls(text);
  if (urlCount > 2) {
    return { suspicious: true, reason: 'Muitos links no comentário' };
  }

  // Verificar conteúdo muito curto com URL
  if (text.length < 50 && urlCount > 0) {
    return { suspicious: true, reason: 'Comentário curto com link' };
  }

  return { suspicious: false };
}

/**
 * Valida o nome do autor
 */
export function validateAuthorName(name: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Nome muito curto (mínimo 2 caracteres)' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Nome muito longo (máximo 50 caracteres)' };
  }

  // Verificar se contém apenas letras, espaços e alguns caracteres especiais
  if (!/^[\p{L}\s.\-']+$/u.test(trimmed)) {
    return { valid: false, error: 'Nome contém caracteres inválidos' };
  }

  return { valid: true };
}

/**
 * Valida o conteúdo do comentário
 */
export function validateContent(content: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = content.trim();

  if (trimmed.length < 3) {
    return { valid: false, error: 'Comentário muito curto (mínimo 3 caracteres)' };
  }

  if (trimmed.length > 2000) {
    return { valid: false, error: 'Comentário muito longo (máximo 2000 caracteres)' };
  }

  const suspicion = isSuspiciousContent(trimmed);
  if (suspicion.suspicious) {
    return { valid: false, error: suspicion.reason };
  }

  return { valid: true };
}

/**
 * Limpa registros antigos de rate limit
 */
export async function cleanupOldRateLimits(): Promise<number> {
  const result = await query<{ count: string }>(
    `WITH deleted AS (
       DELETE FROM comentarios_rate_limit
       WHERE created_at < NOW() - INTERVAL '1 hour'
       RETURNING *
     )
     SELECT COUNT(*) as count FROM deleted`
  );

  return parseInt(result[0]?.count || '0', 10);
}
