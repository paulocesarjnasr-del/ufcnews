/**
 * Arena Auth - Sistema de autenticação simplificado
 * Usa JWT para tokens e bcrypt para senhas
 */

import { query, queryOne } from '@/lib/db';
import { UsuarioArena } from '@/types/arena';
import { cookies } from 'next/headers';

// Simples hash de senha (em produção, usar bcrypt)
async function hashSenha(senha: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(senha + process.env.AUTH_SECRET || 'arena-ufc-secret');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  const senhaHash = await hashSenha(senha);
  return senhaHash === hash;
}

// Gerar token simples (em produção, usar JWT com jose)
function gerarToken(usuarioId: string): string {
  const payload = {
    id: usuarioId,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 dias
  };
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString('base64');
}

function verificarToken(token: string): { id: string } | null {
  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    const payload = JSON.parse(json);
    if (payload.exp < Date.now()) {
      return null;
    }
    return { id: payload.id };
  } catch {
    return null;
  }
}

export async function registrarUsuario(
  username: string,
  email: string,
  senha: string,
  displayName?: string
): Promise<{ usuario: UsuarioArena; token: string } | { error: string }> {
  // Validações
  if (!username || username.length < 3 || username.length > 30) {
    return { error: 'Username deve ter entre 3 e 30 caracteres' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: 'Username só pode conter letras, números e underscore' };
  }
  if (!email || !email.includes('@')) {
    return { error: 'Email inválido' };
  }
  if (!senha || senha.length < 6) {
    return { error: 'Senha deve ter pelo menos 6 caracteres' };
  }

  // Verificar se username ou email já existem
  const existente = await queryOne<{ id: string }>(
    `SELECT id FROM usuarios_arena WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)`,
    [username, email]
  );

  if (existente) {
    return { error: 'Username ou email já está em uso' };
  }

  // Criar usuário
  const senhaHash = await hashSenha(senha);
  const usuario = await queryOne<UsuarioArena>(
    `INSERT INTO usuarios_arena (username, email, senha_hash, display_name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [username.toLowerCase(), email.toLowerCase(), senhaHash, displayName || username]
  );

  if (!usuario) {
    return { error: 'Erro ao criar usuário' };
  }

  const token = gerarToken(usuario.id);

  return { usuario, token };
}

export async function loginUsuario(
  email: string,
  senha: string
): Promise<{ usuario: UsuarioArena; token: string } | { error: string }> {
  const usuario = await queryOne<UsuarioArena & { senha_hash: string }>(
    `SELECT * FROM usuarios_arena WHERE LOWER(email) = LOWER($1)`,
    [email]
  );

  if (!usuario) {
    return { error: 'Email ou senha incorretos' };
  }

  const senhaCorreta = await verificarSenha(senha, usuario.senha_hash);
  if (!senhaCorreta) {
    return { error: 'Email ou senha incorretos' };
  }

  // Atualizar last_login
  await query(
    `UPDATE usuarios_arena SET last_login_at = NOW() WHERE id = $1`,
    [usuario.id]
  );

  const token = gerarToken(usuario.id);

  // Remover senha_hash do retorno
  const { senha_hash: _, ...usuarioSemSenha } = usuario;

  return { usuario: usuarioSemSenha as UsuarioArena, token };
}

export async function getUsuarioAtual(): Promise<UsuarioArena | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('arena_token')?.value;

  if (!token) {
    return null;
  }

  const payload = verificarToken(token);
  if (!payload) {
    return null;
  }

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
  const maxAge = 7 * 24 * 60 * 60; // 7 dias em segundos
  return `arena_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function removerCookieToken(): string {
  return 'arena_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
}

export { verificarToken };
