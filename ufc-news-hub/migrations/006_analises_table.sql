-- Migration: Create analises table for weekly UFC analysis content
-- Run: psql $DATABASE_URL < migrations/006_analises_table.sql

CREATE TABLE IF NOT EXISTS public.analises (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
    evento_id uuid REFERENCES public.eventos(id) ON DELETE SET NULL,
    slug character varying(255) NOT NULL UNIQUE,
    titulo character varying(500) NOT NULL,
    subtitulo text,
    
    -- Main event fighters info
    lutador1_id uuid REFERENCES public.lutadores(id),
    lutador2_id uuid REFERENCES public.lutadores(id),
    
    -- Full article content (HTML or markdown)
    artigo_conteudo text NOT NULL,
    
    -- Structured JSON data for components
    tactical_breakdown jsonb NOT NULL DEFAULT '{}',
    -- Expected shape: { stats: [{label, fighter1Value, fighter2Value, advantage, suffix?}], 
    --   radarData: [{axis, fighter1, fighter2}],
    --   taleOfTape: {fighter1: {altura, envergadura, idade, academia}, fighter2: {...}},
    --   pathsToVictory: {fighter1: [str], fighter2: [str]},
    --   dangerZones: [{round, description}] }
    
    fight_prediction jsonb NOT NULL DEFAULT '{}',
    -- Expected shape: { predictedWinner: 'fighter1'|'fighter2', predictedMethod: str, confidence: str,
    --   fighter1Scenarios: [{method, probability, description}],
    --   fighter2Scenarios: [{method, probability, description}],
    --   keyFactors: [{factor, edge, impact, description}],
    --   xFactor: {title, description, details} }
    
    -- Fighter display info (denormalized for fast rendering)
    fighter1_info jsonb NOT NULL DEFAULT '{}',
    fighter2_info jsonb NOT NULL DEFAULT '{}',
    -- Expected shape: { nome, apelido, pais, record, ranking, imagem_url, ultimasLutas: [{result, opponent, method, event}] }
    
    -- Event meta
    evento_nome character varying(255),
    evento_data timestamp with time zone,
    evento_local character varying(255),
    categoria_peso character varying(100),
    num_rounds integer DEFAULT 5,
    is_titulo boolean DEFAULT false,
    broadcast character varying(255),
    
    -- Status
    status character varying(20) DEFAULT 'publicado',
    
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analises_slug ON public.analises (slug);
CREATE INDEX IF NOT EXISTS idx_analises_evento ON public.analises (evento_id);
CREATE INDEX IF NOT EXISTS idx_analises_created ON public.analises (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analises_status ON public.analises (status);

-- Update trigger
CREATE TRIGGER update_analises_updated_at 
    BEFORE UPDATE ON public.analises 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
