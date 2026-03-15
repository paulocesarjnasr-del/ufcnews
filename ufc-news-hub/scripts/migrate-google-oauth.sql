-- Migração: Adicionar suporte a Google OAuth na Arena
-- Data: 2026-03-14
--
-- Execução:
--   psql $DATABASE_URL -f scripts/migrate-google-oauth.sql
--
-- O que faz:
--   1. Adiciona coluna google_id (UNIQUE) na tabela usuarios_arena
--   2. Torna senha_hash opcional (NULL) para usuarios OAuth

-- Adicionar coluna google_id
ALTER TABLE usuarios_arena ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE;

-- Tornar senha_hash nullable (usuarios Google não têm senha)
ALTER TABLE usuarios_arena ALTER COLUMN senha_hash DROP NOT NULL;
