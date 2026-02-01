-- =============================================
-- ARENA UFC - Schema Completo
-- Sistema de previsões, ligas e competições
-- =============================================

-- Tipos ENUM para Arena
DO $$ BEGIN
    CREATE TYPE nivel_usuario AS ENUM (
        'iniciante',      -- 0-999 XP
        'amateur',        -- 1000-2999 XP
        'contender',      -- 3000-5999 XP
        'challenger',     -- 6000-9999 XP
        'elite',          -- 10000-14999 XP
        'champion',       -- 15000-24999 XP
        'legend'          -- 25000+ XP
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE status_liga AS ENUM ('ativa', 'pausada', 'encerrada');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE tipo_liga AS ENUM ('publica', 'privada');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE status_duelo AS ENUM ('pendente', 'aceito', 'recusado', 'finalizado', 'cancelado');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE status_amizade AS ENUM ('pendente', 'aceita', 'bloqueada');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE tipo_conquista AS ENUM (
        'sniper',              -- 5 previsões perfeitas
        'on_fire',             -- Streak de 10 main events
        'dog_whisperer',       -- 3 underdogs seguidos
        'giant_slayer',        -- Underdog +500
        'champion',            -- Ganhou temporada de liga
        'knockout_artist',     -- 10 KO/TKOs corretos
        'submission_specialist', -- 10 subs corretas
        'analyst',             -- 70%+ precisão em 50+ lutas
        'globetrotter',        -- 20 eventos diferentes
        'first_blood',         -- Primeira previsão
        'social_butterfly',    -- 10 amigos
        'league_founder',      -- Criou uma liga
        'perfect_card',        -- Card perfeito
        'underdog_hunter',     -- 10 underdogs corretos
        'main_event_master',   -- 20 main events corretos
        'streak_5',            -- Streak de 5
        'streak_10',           -- Streak de 10
        'streak_20'            -- Streak de 20
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- TABELA: usuarios_arena (Perfil na Arena)
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios_arena (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Dados básicos
    username VARCHAR(30) UNIQUE NOT NULL,
    display_name VARCHAR(50),
    avatar_url TEXT,
    bio VARCHAR(200),

    -- Autenticação (simplificado - pode expandir depois)
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,

    -- Estatísticas gerais
    pontos_totais INTEGER DEFAULT 0,
    xp_total INTEGER DEFAULT 0,
    nivel nivel_usuario DEFAULT 'iniciante',

    -- Streaks
    streak_atual INTEGER DEFAULT 0,
    melhor_streak INTEGER DEFAULT 0,
    streak_main_event INTEGER DEFAULT 0,
    melhor_streak_main_event INTEGER DEFAULT 0,

    -- Precisão
    total_previsoes INTEGER DEFAULT 0,
    previsoes_corretas INTEGER DEFAULT 0,
    previsoes_perfeitas INTEGER DEFAULT 0, -- vencedor + método + round

    -- Contadores específicos
    underdogs_acertados INTEGER DEFAULT 0,
    kos_acertados INTEGER DEFAULT 0,
    subs_acertados INTEGER DEFAULT 0,
    decisoes_acertadas INTEGER DEFAULT 0,

    -- Social
    total_amigos INTEGER DEFAULT 0,
    total_ligas INTEGER DEFAULT 0,
    titulos_ganhos INTEGER DEFAULT 0,

    -- Configurações
    picks_publicos BOOLEAN DEFAULT true,
    notificacoes_ativas BOOLEAN DEFAULT true,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,

    -- Índices
    CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]{3,30}$')
);

CREATE INDEX IF NOT EXISTS idx_usuarios_arena_pontos ON usuarios_arena(pontos_totais DESC);
CREATE INDEX IF NOT EXISTS idx_usuarios_arena_xp ON usuarios_arena(xp_total DESC);
CREATE INDEX IF NOT EXISTS idx_usuarios_arena_username ON usuarios_arena(username);

-- =============================================
-- TABELA: amizades
-- =============================================
CREATE TABLE IF NOT EXISTS amizades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
    amigo_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
    status status_amizade DEFAULT 'pendente',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,

    CONSTRAINT amizade_unica UNIQUE (usuario_id, amigo_id),
    CONSTRAINT nao_auto_amigo CHECK (usuario_id != amigo_id)
);

CREATE INDEX IF NOT EXISTS idx_amizades_usuario ON amizades(usuario_id);
CREATE INDEX IF NOT EXISTS idx_amizades_amigo ON amizades(amigo_id);

-- =============================================
-- TABELA: ligas
-- =============================================
CREATE TABLE IF NOT EXISTS ligas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Dados básicos
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(200),
    imagem_url TEXT,

    -- Criador e configuração
    criador_id UUID NOT NULL REFERENCES usuarios_arena(id),
    tipo tipo_liga DEFAULT 'privada',
    codigo_convite VARCHAR(8) UNIQUE,

    -- Status
    status status_liga DEFAULT 'ativa',
    temporada_atual INTEGER DEFAULT 1,

    -- Configurações
    max_membros INTEGER DEFAULT 50,
    apenas_main_card BOOLEAN DEFAULT false,
    mostrar_picks_antes BOOLEAN DEFAULT false, -- Mostrar picks dos outros antes do deadline

    -- Estatísticas
    total_membros INTEGER DEFAULT 1,
    total_eventos_disputados INTEGER DEFAULT 0,

    -- Campeão atual
    campeao_id UUID REFERENCES usuarios_arena(id),
    campeao_desde TIMESTAMPTZ,
    defesas_titulo INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT nome_liga_valido CHECK (LENGTH(nome) >= 3)
);

CREATE INDEX IF NOT EXISTS idx_ligas_criador ON ligas(criador_id);
CREATE INDEX IF NOT EXISTS idx_ligas_codigo ON ligas(codigo_convite);
CREATE INDEX IF NOT EXISTS idx_ligas_status ON ligas(status);

-- =============================================
-- TABELA: liga_membros
-- =============================================
CREATE TABLE IF NOT EXISTS liga_membros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    liga_id UUID NOT NULL REFERENCES ligas(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,

    -- Pontuação na temporada
    pontos_temporada INTEGER DEFAULT 0,
    posicao_atual INTEGER DEFAULT 0,

    -- Histórico
    melhor_posicao INTEGER,
    pior_posicao INTEGER,
    eventos_participados INTEGER DEFAULT 0,

    -- Permissões
    is_admin BOOLEAN DEFAULT false,

    -- Timestamps
    joined_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT membro_unico UNIQUE (liga_id, usuario_id)
);

CREATE INDEX IF NOT EXISTS idx_liga_membros_liga ON liga_membros(liga_id);
CREATE INDEX IF NOT EXISTS idx_liga_membros_usuario ON liga_membros(usuario_id);
CREATE INDEX IF NOT EXISTS idx_liga_membros_pontos ON liga_membros(liga_id, pontos_temporada DESC);

-- =============================================
-- TABELA: liga_temporadas (Histórico)
-- =============================================
CREATE TABLE IF NOT EXISTS liga_temporadas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    liga_id UUID NOT NULL REFERENCES ligas(id) ON DELETE CASCADE,
    numero_temporada INTEGER NOT NULL,

    -- Período
    inicio TIMESTAMPTZ NOT NULL,
    fim TIMESTAMPTZ,

    -- Campeão da temporada
    campeao_id UUID REFERENCES usuarios_arena(id),
    pontos_campeao INTEGER,

    -- Estatísticas
    total_participantes INTEGER,
    total_previsoes INTEGER,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT temporada_unica UNIQUE (liga_id, numero_temporada)
);

-- =============================================
-- TABELA: previsoes
-- =============================================
CREATE TABLE IF NOT EXISTS previsoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Relacionamentos
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
    luta_id UUID NOT NULL REFERENCES lutas(id) ON DELETE CASCADE,
    evento_id UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,

    -- Previsão
    vencedor_previsto_id UUID REFERENCES lutadores(id),
    metodo_previsto metodo_vitoria,
    round_previsto INTEGER CHECK (round_previsto BETWEEN 1 AND 5),

    -- Confiança (pontos apostados)
    pontos_confianca INTEGER DEFAULT 100 CHECK (pontos_confianca BETWEEN 10 AND 500),

    -- Resultados (preenchido após a luta)
    processada BOOLEAN DEFAULT false,
    acertou_vencedor BOOLEAN,
    acertou_metodo BOOLEAN,
    acertou_round BOOLEAN,

    -- Pontuação ganha
    pontos_base INTEGER DEFAULT 0,
    multiplicador_metodo DECIMAL(3,2) DEFAULT 1.0,
    multiplicador_round DECIMAL(3,2) DEFAULT 1.0,
    multiplicador_underdog DECIMAL(3,2) DEFAULT 1.0,
    multiplicador_confianca DECIMAL(3,2) DEFAULT 1.0,
    pontos_ganhos INTEGER DEFAULT 0,
    xp_ganho INTEGER DEFAULT 0,

    -- Odds no momento da previsão (para cálculo de underdog)
    odds_vencedor_previsto DECIMAL(6,2),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT previsao_unica UNIQUE (usuario_id, luta_id)
);

CREATE INDEX IF NOT EXISTS idx_previsoes_usuario ON previsoes(usuario_id);
CREATE INDEX IF NOT EXISTS idx_previsoes_luta ON previsoes(luta_id);
CREATE INDEX IF NOT EXISTS idx_previsoes_evento ON previsoes(evento_id);
CREATE INDEX IF NOT EXISTS idx_previsoes_processada ON previsoes(processada) WHERE processada = false;

-- =============================================
-- TABELA: previsoes_liga (Pontuação por liga)
-- =============================================
CREATE TABLE IF NOT EXISTS previsoes_liga (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    previsao_id UUID NOT NULL REFERENCES previsoes(id) ON DELETE CASCADE,
    liga_id UUID NOT NULL REFERENCES ligas(id) ON DELETE CASCADE,
    pontos_ganhos INTEGER DEFAULT 0,

    CONSTRAINT previsao_liga_unica UNIQUE (previsao_id, liga_id)
);

-- =============================================
-- TABELA: duelos
-- =============================================
CREATE TABLE IF NOT EXISTS duelos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Participantes
    desafiante_id UUID NOT NULL REFERENCES usuarios_arena(id),
    desafiado_id UUID NOT NULL REFERENCES usuarios_arena(id),

    -- Evento do duelo
    evento_id UUID NOT NULL REFERENCES eventos(id),

    -- Status e resultado
    status status_duelo DEFAULT 'pendente',
    vencedor_id UUID REFERENCES usuarios_arena(id),

    -- Pontuação final
    pontos_desafiante INTEGER DEFAULT 0,
    pontos_desafiado INTEGER DEFAULT 0,
    acertos_desafiante INTEGER DEFAULT 0,
    acertos_desafiado INTEGER DEFAULT 0,

    -- Mensagem opcional
    mensagem_desafio VARCHAR(200),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    aceito_em TIMESTAMPTZ,
    finalizado_em TIMESTAMPTZ,

    CONSTRAINT duelo_diferente CHECK (desafiante_id != desafiado_id)
);

CREATE INDEX IF NOT EXISTS idx_duelos_desafiante ON duelos(desafiante_id);
CREATE INDEX IF NOT EXISTS idx_duelos_desafiado ON duelos(desafiado_id);
CREATE INDEX IF NOT EXISTS idx_duelos_evento ON duelos(evento_id);
CREATE INDEX IF NOT EXISTS idx_duelos_status ON duelos(status);

-- =============================================
-- TABELA: conquistas
-- =============================================
CREATE TABLE IF NOT EXISTS conquistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
    tipo tipo_conquista NOT NULL,

    -- Detalhes específicos (JSON para flexibilidade)
    detalhes JSONB,

    -- Timestamp
    desbloqueada_em TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT conquista_unica UNIQUE (usuario_id, tipo)
);

CREATE INDEX IF NOT EXISTS idx_conquistas_usuario ON conquistas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_conquistas_tipo ON conquistas(tipo);

-- =============================================
-- TABELA: atividades (Feed social)
-- =============================================
CREATE TABLE IF NOT EXISTS atividades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,

    -- Tipo de atividade
    tipo VARCHAR(50) NOT NULL, -- 'previsao_perfeita', 'conquista', 'duelo_vencido', 'liga_campeao', etc.

    -- Conteúdo
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    dados JSONB, -- Dados extras (IDs relacionados, etc.)

    -- Visibilidade
    publica BOOLEAN DEFAULT true,

    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_atividades_usuario ON atividades(usuario_id);
CREATE INDEX IF NOT EXISTS idx_atividades_created ON atividades(created_at DESC);

-- =============================================
-- TABELA: liga_chat (Mensagens da liga)
-- =============================================
CREATE TABLE IF NOT EXISTS liga_chat (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    liga_id UUID NOT NULL REFERENCES ligas(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,

    mensagem TEXT NOT NULL CHECK (LENGTH(mensagem) <= 500),

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_liga_chat_liga ON liga_chat(liga_id, created_at DESC);

-- =============================================
-- TABELA: notificacoes
-- =============================================
CREATE TABLE IF NOT EXISTS notificacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,

    tipo VARCHAR(50) NOT NULL, -- 'duelo_recebido', 'liga_convite', 'conquista', etc.
    titulo VARCHAR(100) NOT NULL,
    mensagem TEXT,
    dados JSONB,

    lida BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notificacoes_usuario ON notificacoes(usuario_id, lida, created_at DESC);

-- =============================================
-- TABELA: evento_pontuacao (Cache de pontuação por evento)
-- =============================================
CREATE TABLE IF NOT EXISTS evento_pontuacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evento_id UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,

    -- Pontuação do evento
    pontos_totais INTEGER DEFAULT 0,
    acertos INTEGER DEFAULT 0,
    total_lutas INTEGER DEFAULT 0,

    -- Detalhes
    previsoes_perfeitas INTEGER DEFAULT 0,
    card_perfeito BOOLEAN DEFAULT false,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT evento_usuario_unico UNIQUE (evento_id, usuario_id)
);

CREATE INDEX IF NOT EXISTS idx_evento_pontuacao_evento ON evento_pontuacao(evento_id, pontos_totais DESC);
CREATE INDEX IF NOT EXISTS idx_evento_pontuacao_usuario ON evento_pontuacao(usuario_id);

-- =============================================
-- FUNCTIONS E TRIGGERS
-- =============================================

-- Função para atualizar nível baseado em XP
CREATE OR REPLACE FUNCTION atualizar_nivel()
RETURNS TRIGGER AS $$
BEGIN
    NEW.nivel := CASE
        WHEN NEW.xp_total >= 25000 THEN 'legend'
        WHEN NEW.xp_total >= 15000 THEN 'champion'
        WHEN NEW.xp_total >= 10000 THEN 'elite'
        WHEN NEW.xp_total >= 6000 THEN 'challenger'
        WHEN NEW.xp_total >= 3000 THEN 'contender'
        WHEN NEW.xp_total >= 1000 THEN 'amateur'
        ELSE 'iniciante'
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_atualizar_nivel ON usuarios_arena;
CREATE TRIGGER trigger_atualizar_nivel
    BEFORE UPDATE OF xp_total ON usuarios_arena
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_nivel();

-- Função para gerar código de convite único
CREATE OR REPLACE FUNCTION gerar_codigo_convite()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.codigo_convite IS NULL AND NEW.tipo = 'privada' THEN
        NEW.codigo_convite := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_codigo_convite ON ligas;
CREATE TRIGGER trigger_codigo_convite
    BEFORE INSERT ON ligas
    FOR EACH ROW
    EXECUTE FUNCTION gerar_codigo_convite();

-- Função para atualizar contador de membros da liga
CREATE OR REPLACE FUNCTION atualizar_contador_membros()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE ligas SET total_membros = total_membros + 1 WHERE id = NEW.liga_id;
        UPDATE usuarios_arena SET total_ligas = total_ligas + 1 WHERE id = NEW.usuario_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE ligas SET total_membros = total_membros - 1 WHERE id = OLD.liga_id;
        UPDATE usuarios_arena SET total_ligas = total_ligas - 1 WHERE id = OLD.usuario_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_contador_membros ON liga_membros;
CREATE TRIGGER trigger_contador_membros
    AFTER INSERT OR DELETE ON liga_membros
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_contador_membros();

-- Função para atualizar contador de amigos
CREATE OR REPLACE FUNCTION atualizar_contador_amigos()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND NEW.status = 'aceita' AND OLD.status = 'pendente' THEN
        UPDATE usuarios_arena SET total_amigos = total_amigos + 1 WHERE id = NEW.usuario_id;
        UPDATE usuarios_arena SET total_amigos = total_amigos + 1 WHERE id = NEW.amigo_id;
    ELSIF TG_OP = 'DELETE' AND OLD.status = 'aceita' THEN
        UPDATE usuarios_arena SET total_amigos = total_amigos - 1 WHERE id = OLD.usuario_id;
        UPDATE usuarios_arena SET total_amigos = total_amigos - 1 WHERE id = OLD.amigo_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_contador_amigos ON amizades;
CREATE TRIGGER trigger_contador_amigos
    AFTER UPDATE OR DELETE ON amizades
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_contador_amigos();

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers de updated_at
DROP TRIGGER IF EXISTS update_usuarios_arena_updated_at ON usuarios_arena;
CREATE TRIGGER update_usuarios_arena_updated_at
    BEFORE UPDATE ON usuarios_arena
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ligas_updated_at ON ligas;
CREATE TRIGGER update_ligas_updated_at
    BEFORE UPDATE ON ligas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_previsoes_updated_at ON previsoes;
CREATE TRIGGER update_previsoes_updated_at
    BEFORE UPDATE ON previsoes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DADOS INICIAIS (Conquistas disponíveis)
-- =============================================

-- Nada a inserir aqui, as conquistas são desbloqueadas dinamicamente

COMMIT;
