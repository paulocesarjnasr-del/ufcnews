import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const schema = `
-- Tabela de Comentários
CREATE TABLE IF NOT EXISTS comentarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    noticia_id UUID NOT NULL REFERENCES noticias(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comentarios(id) ON DELETE CASCADE,

    -- Autor (anônimo)
    autor_nome VARCHAR(50) NOT NULL,
    autor_email VARCHAR(255),
    autor_fingerprint VARCHAR(64) NOT NULL,

    -- Conteúdo
    conteudo TEXT NOT NULL,

    -- Moderação
    status VARCHAR(20) DEFAULT 'aprovado',
    reportado_count INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes para performance
CREATE INDEX IF NOT EXISTS idx_comentarios_noticia ON comentarios(noticia_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_parent ON comentarios(parent_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_created ON comentarios(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comentarios_status ON comentarios(status);
CREATE INDEX IF NOT EXISTS idx_comentarios_fingerprint ON comentarios(autor_fingerprint);

-- Tabela de Rate Limit para Comentários
CREATE TABLE IF NOT EXISTS comentarios_rate_limit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fingerprint VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para limpeza e consulta de rate limit
CREATE INDEX IF NOT EXISTS idx_rate_limit_fingerprint ON comentarios_rate_limit(fingerprint);
CREATE INDEX IF NOT EXISTS idx_rate_limit_created ON comentarios_rate_limit(created_at);

-- Trigger para atualizar updated_at em comentários
CREATE OR REPLACE FUNCTION update_comentarios_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_comentarios_updated_at ON comentarios;
CREATE TRIGGER update_comentarios_updated_at
    BEFORE UPDATE ON comentarios
    FOR EACH ROW
    EXECUTE FUNCTION update_comentarios_updated_at();

-- Função para limpar rate limits antigos (mais de 1 hora)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
    DELETE FROM comentarios_rate_limit
    WHERE created_at < NOW() - INTERVAL '1 hour';
END;
$$ language 'plpgsql';
`;

async function addComentariosSchema() {
  console.log('Adicionando schema de comentários ao banco de dados...\n');

  try {
    await pool.query(schema);
    console.log('Schema de comentários criado com sucesso!\n');

    // Verificar tabelas criadas
    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('comentarios', 'comentarios_rate_limit')
      ORDER BY table_name
    `);

    console.log('Tabelas verificadas:');
    tables.rows.forEach((row) => {
      console.log(`  - ${row.table_name}`);
    });

    // Verificar índices
    const indexes = await pool.query(`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename IN ('comentarios', 'comentarios_rate_limit')
      ORDER BY indexname
    `);

    console.log('\nÍndices criados:');
    indexes.rows.forEach((row) => {
      console.log(`  - ${row.indexname}`);
    });

    console.log('\nMigração de comentários concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao criar schema de comentários:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addComentariosSchema();
