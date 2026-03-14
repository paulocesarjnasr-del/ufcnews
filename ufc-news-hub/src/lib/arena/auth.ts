/**
 * Arena Auth - Sistema de autenticacao
 * bcrypt para senhas, JWT (jose) para tokens
 */

import { query, queryOne } from '@/lib/db';
import type { UsuarioArena } from '@/types/arena';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

const SALT_ROUNDS = 10;
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.AUTH_SECRET || 'arena-ufc-secret-change-me'
);
const TOKEN_EXPIRY = '7d';

// ═══════════════════════════════════════════════════════════════
// Password Hashing (bcrypt)
// ═══════════════════════════════════════════════════════════════

async function hashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, SALT_ROUNDS);
}

async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  // Detect legacy SHA-256 hash (64 chars hex)
  if (hash.length === 64 && /^[a-f0-9]+$/.test(hash)) {
    return verificarSenhaLegacy(senha, hash);
  }
  // bcrypt hash (starts with $2b$)
  return bcrypt.compare(senha, hash);
}

// Legacy SHA-256 verification (for gradual migration)
async function verificarSenhaLegacy(senha: string, hash: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(senha + (process.env.AUTH_SECRET || 'arena-ufc-secret'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const senhaHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return senhaHash === hash;
}

// Migrate legacy hash to bcrypt
async function migrarHashSenha(usuarioId: string, senha: string): Promise<void> {
  const newHash = await hashSenha(senha);
  await query(
    `UPDATE usuarios_arena SET senha_hash = $1 WHERE id = $2`,
    [newHash, usuarioId]
  );
  console.info(`[AUTH] Hash migrado para bcrypt: usuario ${usuarioId}`);
}

// ═══════════════════════════════════════════════════════════════
// JWT Token (jose)
// ═══════════════════════════════════════════════════════════════

async function gerarToken(usuarioId: string): Promise<string> {
  return new SignJWT({ sub: usuarioId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

async function verificarToken(token: string): Promise<{ id: string } | null> {
  try {
    // Try JWT first
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.sub) {
      return { id: payload.sub as string };
    }
    return null;
  } catch {
    // Fallback: try legacy Base64 token (for sessions created before migration)
    try {
      const json = Buffer.from(token, 'base64').toString('utf-8');
      const legacy = JSON.parse(json) as { exp?: number; id?: string };
      if (legacy.exp && legacy.exp > Date.now() && legacy.id) {
        return { id: legacy.id };
      }
    } catch {
      // Invalid token
    }
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// Registration
// ═══════════════════════════════════════════════════════════════

export async function registrarUsuario(
  username: string,
  email: string,
  senha: string,
  displayName?: string
): Promise<{ usuario: UsuarioArena; token: string } | { error: string }> {
  // Validations
  if (!username || username.length < 3 || username.length > 30) {
    return { error: 'Username deve ter entre 3 e 30 caracteres' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: 'Username so pode conter letras, numeros e underscore' };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Email invalido' };
  }
  if (!senha || senha.length < 8) {
    return { error: 'Senha deve ter pelo menos 8 caracteres' };
  }

  const existente = await queryOne<{ id: string }>(
    `SELECT id FROM usuarios_arena WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)`,
    [username, email]
  );

  if (existente) {
    return { error: 'Username ou email ja esta em uso' };
  }

  const senhaHash = await hashSenha(senha);
  const usuario = await queryOne<UsuarioArena>(
    `INSERT INTO usuarios_arena (username, email, senha_hash, display_name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [username.toLowerCase(), email.toLowerCase(), senhaHash, displayName || username]
  );

  if (!usuario) {
    return { error: 'Erro ao criar usuario' };
  }

  const token = await gerarToken(usuario.id);
  return { usuario, token };
}

// ═══════════════════════════════════════════════════════════════
// Login (with gradual hash migration)
// ═══════════════════════════════════════════════════════════════

export async function loginUsuario(
  email: string,
  senha: string
): Promise<{ usuario: UsuarioArena; token: string } | { error: string }> {
  const usuario = await queryOne<UsuarioArena & { senha_hash: string | null }>(
    `SELECT * FROM usuarios_arena WHERE LOWER(email) = LOWER($1)`,
    [email]
  );

  if (!usuario) {
    return { error: 'Email ou senha incorretos' };
  }

  // Google-only account
  if (!usuario.senha_hash) {
    return { error: 'Esta conta usa login com Google. Clique em "Continuar com Google".' };
  }

  const senhaCorreta = await verificarSenha(senha, usuario.senha_hash);
  if (!senhaCorreta) {
    return { error: 'Email ou senha incorretos' };
  }

  // Gradual migration: if legacy hash, re-hash with bcrypt
  if (usuario.senha_hash.length === 64 && /^[a-f0-9]+$/.test(usuario.senha_hash)) {
    await migrarHashSenha(usuario.id, senha);
  }

  await query(
    `UPDATE usuarios_arena SET last_login_at = NOW() WHERE id = $1`,
    [usuario.id]
  );

  const token = await gerarToken(usuario.id);
  const { senha_hash: _, ...usuarioSemSenha } = usuario;
  return { usuario: usuarioSemSenha as UsuarioArena, token };
}

// ═══════════════════════════════════════════════════════════════
// Session / Cookie
// ═══════════════════════════════════════════════════════════════

export async function getUsuarioAtual(): Promise<UsuarioArena | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('arena_token')?.value;

  if (!token) return null;

  const payload = await verificarToken(token);
  if (!payload) return null;

  const usuario = await queryOne<UsuarioArena>(
    `SELECT id, username, display_name, avatar_url, bio, email,
            pontos_totais, xp_total, nivel,
            streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
            total_previsoes, previsoes_corretas, previsoes_perfeitas,
            underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
            total_amigos, total_ligas, titulos_ganhos,
            picks_publicos, notificacoes_ativas,
            created_at, last_login_at
     FROM usuarios_arena WHERE id = $1`,
    [payload.id]
  );

  return usuario;
}

export async function getUsuarioById(id: string): Promise<UsuarioArena | null> {
  return queryOne<UsuarioArena>(
    `SELECT id, username, display_name, avatar_url, bio, email,
            pontos_totais, xp_total, nivel,
            streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
            total_previsoes, previsoes_corretas, previsoes_perfeitas,
            underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
            total_amigos, total_ligas, titulos_ganhos,
            picks_publicos, notificacoes_ativas,
            created_at, last_login_at
     FROM usuarios_arena WHERE id = $1`,
    [id]
  );
}

export async function getUsuarioByUsername(username: string): Promise<UsuarioArena | null> {
  return queryOne<UsuarioArena>(
    `SELECT id, username, display_name, avatar_url, bio,
            pontos_totais, xp_total, nivel,
            streak_atual, melhor_streak,
            total_previsoes, previsoes_corretas,
            total_amigos, total_ligas, titulos_ganhos,
            picks_publicos, created_at
     FROM usuarios_arena WHERE LOWER(username) = LOWER($1)`,
    [username]
  );
}

export function criarCookieToken(token: string): string {
  const maxAge = 7 * 24 * 60 * 60;
  const isProduction = process.env.NODE_ENV === 'production';
  const secure = isProduction ? '; Secure' : '';
  return `arena_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export function removerCookieToken(): string {
  return 'arena_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0';
}

// ═══════════════════════════════════════════════════════════════
// Google OAuth
// ═══════════════════════════════════════════════════════════════

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

async function gerarUsernameUnico(email: string): Promise<string> {
  const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20) || 'usuario';

  const existente = await queryOne<{ id: string }>(
    `SELECT id FROM usuarios_arena WHERE LOWER(username) = LOWER($1)`,
    [base]
  );

  if (!existente) return base;

  for (let i = 0; i < 100; i++) {
    const sufixo = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const candidato = `${base.slice(0, 25)}_${sufixo}`;
    const existe = await queryOne<{ id: string }>(
      `SELECT id FROM usuarios_arena WHERE LOWER(username) = LOWER($1)`,
      [candidato]
    );
    if (!existe) return candidato;
  }

  return `${base.slice(0, 20)}_${Date.now().toString(36)}`;
}

export async function loginOuCriarComGoogle(
  googleUser: GoogleUserInfo
): Promise<{ usuario: UsuarioArena; token: string } | { error: string }> {
  let usuario = await queryOne<UsuarioArena>(
    `SELECT id, username, display_name, avatar_url, bio, email,
            pontos_totais, xp_total, nivel,
            streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
            total_previsoes, previsoes_corretas, previsoes_perfeitas,
            underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
            total_amigos, total_ligas, titulos_ganhos,
            picks_publicos, notificacoes_ativas,
            created_at, last_login_at
     FROM usuarios_arena WHERE google_id = $1`,
    [googleUser.sub]
  );

  if (!usuario) {
    usuario = await queryOne<UsuarioArena>(
      `SELECT id, username, display_name, avatar_url, bio, email,
              pontos_totais, xp_total, nivel,
              streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
              total_previsoes, previsoes_corretas, previsoes_perfeitas,
              underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
              total_amigos, total_ligas, titulos_ganhos,
              picks_publicos, notificacoes_ativas,
              created_at, last_login_at
       FROM usuarios_arena WHERE LOWER(email) = LOWER($1)`,
      [googleUser.email]
    );

    if (usuario) {
      await query(
        `UPDATE usuarios_arena SET google_id = $1, avatar_url = COALESCE(avatar_url, $2), last_login_at = NOW() WHERE id = $3`,
        [googleUser.sub, googleUser.picture, usuario.id]
      );
      usuario.avatar_url = usuario.avatar_url || googleUser.picture;
    }
  }

  if (!usuario) {
    const username = await gerarUsernameUnico(googleUser.email);
    usuario = await queryOne<UsuarioArena>(
      `INSERT INTO usuarios_arena (username, email, display_name, avatar_url, google_id, senha_hash)
       VALUES ($1, $2, $3, $4, $5, NULL)
       RETURNING id, username, display_name, avatar_url, bio, email,
                 pontos_totais, xp_total, nivel,
                 streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
                 total_previsoes, previsoes_corretas, previsoes_perfeitas,
                 underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
                 total_amigos, total_ligas, titulos_ganhos,
                 picks_publicos, notificacoes_ativas,
                 created_at, last_login_at`,
      [username, googleUser.email.toLowerCase(), googleUser.name, googleUser.picture, googleUser.sub]
    );
  } else {
    await query(
      `UPDATE usuarios_arena SET last_login_at = NOW() WHERE id = $1`,
      [usuario.id]
    );
  }

  if (!usuario) {
    return { error: 'Erro ao criar usuario com Google' };
  }

  const token = await gerarToken(usuario.id);
  return { usuario, token };
}

export { verificarToken };
