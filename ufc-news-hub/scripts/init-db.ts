import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const schema = `
-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Remover tipos e tabelas existentes (para resetar se necessário)
DROP TABLE IF EXISTS sync_logs CASCADE;
DROP TABLE IF EXISTS noticia_entidades CASCADE;
DROP TABLE IF EXISTS noticias CASCADE;
DROP TABLE IF EXISTS lutadores CASCADE;
DROP TYPE IF EXISTS categoria_noticia CASCADE;

-- Enum para categorias
CREATE TYPE categoria_noticia AS ENUM ('lutadores', 'lutas', 'backstage');

-- Tabela de Lutadores (controle de qualidade)
CREATE TABLE lutadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL UNIQUE,
    apelido VARCHAR(255),
    categoria_peso VARCHAR(100),
    url_perfil VARCHAR(500),
    imagem_url VARCHAR(500),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por nome
CREATE INDEX idx_lutadores_nome ON lutadores USING gin(to_tsvector('portuguese', nome));
CREATE INDEX idx_lutadores_nome_lower ON lutadores (LOWER(nome));

-- Tabela de Notícias
CREATE TABLE noticias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(500) NOT NULL,
    subtitulo TEXT,
    conteudo_completo TEXT,
    imagem_url VARCHAR(500),
    fonte_url VARCHAR(500) NOT NULL UNIQUE,
    fonte_nome VARCHAR(100) DEFAULT 'MMAJunkie',
    categoria categoria_noticia NOT NULL,
    hash_deduplicacao VARCHAR(64) UNIQUE,
    eh_sobre_ufc BOOLEAN DEFAULT true,
    visualizacoes INTEGER DEFAULT 0,
    publicado_em TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_noticias_categoria ON noticias (categoria);
CREATE INDEX idx_noticias_publicado ON noticias (publicado_em DESC);
CREATE INDEX idx_noticias_created ON noticias (created_at DESC);
CREATE INDEX idx_noticias_hash ON noticias (hash_deduplicacao);

-- Tabela de Entidades (relacionamento notícia-lutador)
CREATE TABLE noticia_entidades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    noticia_id UUID REFERENCES noticias(id) ON DELETE CASCADE,
    lutador_id UUID REFERENCES lutadores(id) ON DELETE CASCADE,
    tipo_mencao VARCHAR(50) DEFAULT 'mencionado',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(noticia_id, lutador_id)
);

CREATE INDEX idx_noticia_entidades_noticia ON noticia_entidades (noticia_id);
CREATE INDEX idx_noticia_entidades_lutador ON noticia_entidades (lutador_id);

-- Tabela de Log de Sincronização
CREATE TABLE sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finished_at TIMESTAMP WITH TIME ZONE,
    noticias_processadas INTEGER DEFAULT 0,
    noticias_adicionadas INTEGER DEFAULT 0,
    noticias_duplicadas INTEGER DEFAULT 0,
    noticias_rejeitadas INTEGER DEFAULT 0,
    erro TEXT,
    status VARCHAR(50) DEFAULT 'running'
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lutadores_updated_at
    BEFORE UPDATE ON lutadores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
`;

async function initDatabase() {
  console.log('Iniciando criação do schema do banco de dados...\n');

  try {
    await pool.query(schema);
    console.log('Schema criado com sucesso!\n');

    // Verificar tabelas criadas
    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('Tabelas criadas:');
    tables.rows.forEach((row) => {
      console.log(`  - ${row.table_name}`);
    });

    console.log('\nBanco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar schema:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
