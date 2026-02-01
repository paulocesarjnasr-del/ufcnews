-- =============================================
-- Migration 005: Correções de Sync
-- Data: 2026-02-01
-- =============================================

-- PROBLEMA 1: Colunas de records dos lutadores
-- O código usava vitorias_ko, vitorias_sub, vitorias_dec
-- Mas o schema usa nocautes, finalizacoes, decisoes
-- Código corrigido para usar as colunas corretas.

-- Garantir que as colunas existem (caso não existam por algum motivo)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'lutadores' AND column_name = 'nocautes') THEN
        ALTER TABLE lutadores ADD COLUMN nocautes INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'lutadores' AND column_name = 'finalizacoes') THEN
        ALTER TABLE lutadores ADD COLUMN finalizacoes INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'lutadores' AND column_name = 'decisoes') THEN
        ALTER TABLE lutadores ADD COLUMN decisoes INTEGER DEFAULT 0;
    END IF;
END $$;

-- PROBLEMA 4: Slugs duplicados
-- Agora o código gera slugs com data: evento-nome-YYYY-MM-DD
-- E usa UPSERT para evitar erros de duplicação

-- Criar índice para melhorar performance de busca por ufc_slug
CREATE INDEX IF NOT EXISTS idx_eventos_ufc_slug_unique ON eventos(ufc_slug);

-- PROBLEMA 3: Poster do evento
-- Garantir que a coluna poster_url existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'eventos' AND column_name = 'poster_url') THEN
        ALTER TABLE eventos ADD COLUMN poster_url VARCHAR(500);
    END IF;
END $$;

-- Adicionar coluna fonte_nome se não existir (para seed de notícias)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'noticias' AND column_name = 'fonte_nome') THEN
        ALTER TABLE noticias ADD COLUMN fonte_nome VARCHAR(100) DEFAULT 'MMAMania';
    END IF;
END $$;

-- Criar índice para busca rápida de notícias por fonte
CREATE INDEX IF NOT EXISTS idx_noticias_fonte ON noticias(fonte_nome);

-- Adicionar comentário na migration
COMMENT ON COLUMN eventos.poster_url IS 'URL do poster/imagem principal do evento, extraída automaticamente do UFC.com';
COMMENT ON COLUMN lutadores.nocautes IS 'Número de vitórias por KO/TKO';
COMMENT ON COLUMN lutadores.finalizacoes IS 'Número de vitórias por finalização';
COMMENT ON COLUMN lutadores.decisoes IS 'Número de vitórias por decisão';

-- Log da migration
DO $$
BEGIN
    RAISE NOTICE 'Migration 005_fix_sync_issues concluída com sucesso';
END $$;
