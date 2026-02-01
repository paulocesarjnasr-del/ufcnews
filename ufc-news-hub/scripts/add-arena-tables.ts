import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const schema = `
-- ============================================
-- UFC NEWS HUB - Arena de Previsões Schema
-- ============================================

-- Extensão para UUID (caso não exista)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para status de evento
DO $$ BEGIN
    CREATE TYPE status_evento AS ENUM ('agendado', 'ao_vivo', 'finalizado', 'cancelado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum para status de luta
DO $$ BEGIN
    CREATE TYPE status_luta AS ENUM ('agendada', 'ao_vivo', 'finalizada', 'cancelada');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum para tipo de luta
DO $$ BEGIN
    CREATE TYPE tipo_luta AS ENUM ('main_event', 'co_main', 'card_principal', 'preliminar', 'early_prelim');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum para método de vitória
DO $$ BEGIN
    CREATE TYPE metodo_vitoria AS ENUM ('KO/TKO', 'Submission', 'Decision - Unanimous', 'Decision - Split', 'Decision - Majority', 'DQ', 'No Contest', 'Draw');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- Tabela de Eventos UFC
-- ============================================
CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    data_evento TIMESTAMP WITH TIME ZONE NOT NULL,
    local_evento VARCHAR(255),
    cidade VARCHAR(100),
    pais VARCHAR(100),
    tipo VARCHAR(50) DEFAULT 'PPV',
    status status_evento DEFAULT 'agendado',
    imagem_url VARCHAR(500),
    descricao TEXT,
    onde_assistir VARCHAR(255) DEFAULT 'UFC Fight Pass, Combate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para eventos
CREATE INDEX IF NOT EXISTS idx_eventos_data ON eventos (data_evento DESC);
CREATE INDEX IF NOT EXISTS idx_eventos_status ON eventos (status);
CREATE INDEX IF NOT EXISTS idx_eventos_slug ON eventos (slug);

-- ============================================
-- Tabela de Lutas
-- ============================================
CREATE TABLE IF NOT EXISTS lutas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evento_id UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    lutador1_id UUID NOT NULL REFERENCES lutadores(id),
    lutador2_id UUID NOT NULL REFERENCES lutadores(id),
    categoria_peso VARCHAR(50) NOT NULL,
    ordem INTEGER DEFAULT 0,
    tipo tipo_luta DEFAULT 'card_principal',
    rounds INTEGER DEFAULT 3,
    vencedor_id UUID REFERENCES lutadores(id),
    metodo metodo_vitoria,
    round_final INTEGER,
    tempo_final VARCHAR(10),
    status status_luta DEFAULT 'agendada',
    is_titulo BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT check_lutadores_diferentes CHECK (lutador1_id != lutador2_id)
);

-- Índices para lutas
CREATE INDEX IF NOT EXISTS idx_lutas_evento ON lutas (evento_id);
CREATE INDEX IF NOT EXISTS idx_lutas_status ON lutas (status);
CREATE INDEX IF NOT EXISTS idx_lutas_lutador1 ON lutas (lutador1_id);
CREATE INDEX IF NOT EXISTS idx_lutas_lutador2 ON lutas (lutador2_id);
CREATE INDEX IF NOT EXISTS idx_lutas_ordem ON lutas (evento_id, ordem DESC);

-- ============================================
-- Tabela de Previsões
-- ============================================
CREATE TABLE IF NOT EXISTS previsoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    luta_id UUID NOT NULL REFERENCES lutas(id) ON DELETE CASCADE,
    usuario_fingerprint VARCHAR(64) NOT NULL,
    usuario_nome VARCHAR(50) NOT NULL,
    lutador_escolhido_id UUID NOT NULL REFERENCES lutadores(id),
    metodo_previsto metodo_vitoria,
    round_previsto INTEGER,
    pontos_ganhos INTEGER DEFAULT 0,
    acertou_vencedor BOOLEAN,
    acertou_metodo BOOLEAN,
    acertou_round BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(luta_id, usuario_fingerprint)
);

-- Índices para previsões
CREATE INDEX IF NOT EXISTS idx_previsoes_luta ON previsoes (luta_id);
CREATE INDEX IF NOT EXISTS idx_previsoes_usuario ON previsoes (usuario_fingerprint);
CREATE INDEX IF NOT EXISTS idx_previsoes_lutador ON previsoes (lutador_escolhido_id);

-- ============================================
-- Tabela de Ranking de Previsores
-- ============================================
CREATE TABLE IF NOT EXISTS ranking_previsores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_fingerprint VARCHAR(64) UNIQUE NOT NULL,
    usuario_nome VARCHAR(50) NOT NULL,
    total_previsoes INTEGER DEFAULT 0,
    acertos_vencedor INTEGER DEFAULT 0,
    acertos_metodo INTEGER DEFAULT 0,
    acertos_round INTEGER DEFAULT 0,
    pontos_total INTEGER DEFAULT 0,
    taxa_acerto DECIMAL(5,2) DEFAULT 0,
    melhor_sequencia INTEGER DEFAULT 0,
    sequencia_atual INTEGER DEFAULT 0,
    nivel VARCHAR(50) DEFAULT 'Novato',
    badges TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para ranking
CREATE INDEX IF NOT EXISTS idx_ranking_pontos ON ranking_previsores (pontos_total DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_taxa ON ranking_previsores (taxa_acerto DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_fingerprint ON ranking_previsores (usuario_fingerprint);

-- ============================================
-- Expandir tabela de Lutadores
-- ============================================
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS pais VARCHAR(50);
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS idade INTEGER;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS altura VARCHAR(20);
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS envergadura VARCHAR(20);
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS vitorias INTEGER DEFAULT 0;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS derrotas INTEGER DEFAULT 0;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS empates INTEGER DEFAULT 0;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS nocautes INTEGER DEFAULT 0;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS finalizacoes INTEGER DEFAULT 0;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS decisoes INTEGER DEFAULT 0;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS ranking_divisao INTEGER;
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS academia VARCHAR(255);
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS estilo_luta VARCHAR(100);
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS cidade_natal VARCHAR(100);
ALTER TABLE lutadores ADD COLUMN IF NOT EXISTS data_nascimento DATE;

-- Índices adicionais para lutadores
CREATE INDEX IF NOT EXISTS idx_lutadores_pais ON lutadores (pais);
CREATE INDEX IF NOT EXISTS idx_lutadores_ranking ON lutadores (categoria_peso, ranking_divisao);

-- ============================================
-- Triggers para updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_eventos_updated_at ON eventos;
CREATE TRIGGER update_eventos_updated_at
    BEFORE UPDATE ON eventos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_lutas_updated_at ON lutas;
CREATE TRIGGER update_lutas_updated_at
    BEFORE UPDATE ON lutas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_previsoes_updated_at ON previsoes;
CREATE TRIGGER update_previsoes_updated_at
    BEFORE UPDATE ON previsoes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ranking_updated_at ON ranking_previsores;
CREATE TRIGGER update_ranking_updated_at
    BEFORE UPDATE ON ranking_previsores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Views úteis
-- ============================================

-- View: Próximo evento com contagem de lutas
CREATE OR REPLACE VIEW v_proximo_evento AS
SELECT
    e.*,
    COUNT(l.id) as total_lutas,
    COUNT(CASE WHEN l.tipo = 'main_event' THEN 1 END) as tem_main_event
FROM eventos e
LEFT JOIN lutas l ON l.evento_id = e.id
WHERE e.status = 'agendado' AND e.data_evento > NOW()
GROUP BY e.id
ORDER BY e.data_evento ASC
LIMIT 1;

-- View: Consenso de previsões por luta
CREATE OR REPLACE VIEW v_consenso_previsoes AS
SELECT
    p.luta_id,
    p.lutador_escolhido_id,
    lut.nome as lutador_nome,
    COUNT(*) as total_votos,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY p.luta_id), 1) as percentual
FROM previsoes p
JOIN lutadores lut ON lut.id = p.lutador_escolhido_id
GROUP BY p.luta_id, p.lutador_escolhido_id, lut.nome;

-- View: Top 10 Previsores
CREATE OR REPLACE VIEW v_top_previsores AS
SELECT
    rp.*,
    RANK() OVER (ORDER BY pontos_total DESC) as posicao
FROM ranking_previsores rp
WHERE total_previsoes >= 5
ORDER BY pontos_total DESC
LIMIT 10;
`;

async function addArenaTables() {
  console.log('🏆 Adicionando tabelas da Arena de Previsões...\n');

  try {
    await pool.query(schema);
    console.log('✅ Schema da Arena criado com sucesso!\n');

    // Verificar tabelas criadas
    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('eventos', 'lutas', 'previsoes', 'ranking_previsores')
      ORDER BY table_name
    `);

    console.log('📋 Novas tabelas criadas:');
    tables.rows.forEach((row) => {
      console.log(`  ✓ ${row.table_name}`);
    });

    // Verificar colunas adicionadas em lutadores
    const lutadorColumns = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'lutadores'
      AND column_name IN ('pais', 'idade', 'altura', 'envergadura', 'vitorias', 'derrotas', 'empates', 'nocautes', 'finalizacoes', 'decisoes', 'ranking_divisao', 'academia', 'estilo_luta')
      ORDER BY column_name
    `);

    console.log('\n📊 Colunas adicionadas em lutadores:');
    lutadorColumns.rows.forEach((row) => {
      console.log(`  ✓ ${row.column_name}`);
    });

    console.log('\n🎯 Arena de Previsões pronta para uso!');
  } catch (error) {
    console.error('❌ Erro ao criar schema:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addArenaTables();
