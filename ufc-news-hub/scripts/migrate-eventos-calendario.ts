import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const migration = `
-- ============================================
-- MIGRAÇÃO: Colunas para Calendário UFC
-- ============================================

-- Adicionar colunas de scraping à tabela eventos
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS ufc_slug VARCHAR(100);
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS poster_url VARCHAR(500);
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS horario_early_prelims VARCHAR(20);
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS horario_prelims VARCHAR(20);
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS horario_main_card VARCHAR(20);
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS last_scraped_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS broadcast_info JSONB DEFAULT '{}';

-- Índice para busca por ufc_slug
CREATE INDEX IF NOT EXISTS idx_eventos_ufc_slug ON eventos(ufc_slug);

-- Índice para ordenação por data (se não existir com nome diferente)
CREATE INDEX IF NOT EXISTS idx_eventos_data_desc ON eventos(data_evento DESC);

-- Adicionar coluna para destacar main event na tabela lutas
ALTER TABLE lutas ADD COLUMN IF NOT EXISTS lutador1_nome_display VARCHAR(100);
ALTER TABLE lutas ADD COLUMN IF NOT EXISTS lutador2_nome_display VARCHAR(100);
ALTER TABLE lutas ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- View melhorada: Próximo evento com detalhes do main event
DROP VIEW IF EXISTS v_proximo_evento_detalhado;
CREATE OR REPLACE VIEW v_proximo_evento_detalhado AS
SELECT
    e.*,
    COUNT(l.id) as total_lutas,
    (
        SELECT json_build_object(
            'id', main.id,
            'categoria_peso', main.categoria_peso,
            'is_titulo', main.is_titulo,
            'rounds', main.rounds,
            'lutador1', json_build_object(
                'id', l1.id,
                'nome', l1.nome,
                'apelido', l1.apelido,
                'imagem_url', l1.imagem_url,
                'pais', l1.pais,
                'vitorias', l1.vitorias,
                'derrotas', l1.derrotas,
                'empates', l1.empates
            ),
            'lutador2', json_build_object(
                'id', l2.id,
                'nome', l2.nome,
                'apelido', l2.apelido,
                'imagem_url', l2.imagem_url,
                'pais', l2.pais,
                'vitorias', l2.vitorias,
                'derrotas', l2.derrotas,
                'empates', l2.empates
            )
        )
        FROM lutas main
        JOIN lutadores l1 ON l1.id = main.lutador1_id
        JOIN lutadores l2 ON l2.id = main.lutador2_id
        WHERE main.evento_id = e.id AND main.tipo = 'main_event'
        LIMIT 1
    ) as main_event
FROM eventos e
LEFT JOIN lutas l ON l.evento_id = e.id
WHERE e.status = 'agendado' AND e.data_evento > NOW()
GROUP BY e.id
ORDER BY e.data_evento ASC
LIMIT 1;

-- View: Eventos por mês para calendário
DROP VIEW IF EXISTS v_eventos_por_mes;
CREATE OR REPLACE VIEW v_eventos_por_mes AS
SELECT
    EXTRACT(YEAR FROM e.data_evento) as ano,
    EXTRACT(MONTH FROM e.data_evento) as mes,
    TO_CHAR(e.data_evento, 'TMMonth') as nome_mes,
    json_agg(
        json_build_object(
            'id', e.id,
            'nome', e.nome,
            'slug', e.slug,
            'data_evento', e.data_evento,
            'local_evento', e.local_evento,
            'cidade', e.cidade,
            'pais', e.pais,
            'tipo', e.tipo,
            'status', e.status,
            'imagem_url', e.imagem_url,
            'poster_url', e.poster_url,
            'total_lutas', (SELECT COUNT(*) FROM lutas WHERE evento_id = e.id)
        ) ORDER BY e.data_evento
    ) as eventos
FROM eventos e
WHERE e.data_evento >= NOW() - INTERVAL '1 year'
GROUP BY
    EXTRACT(YEAR FROM e.data_evento),
    EXTRACT(MONTH FROM e.data_evento),
    TO_CHAR(e.data_evento, 'TMMonth')
ORDER BY ano DESC, mes DESC;
`;

async function runMigration() {
  console.log('📅 Executando migração para Calendário UFC...\n');

  try {
    await pool.query(migration);
    console.log('✅ Migração executada com sucesso!\n');

    // Verificar novas colunas
    const columns = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'eventos'
      AND column_name IN ('ufc_slug', 'poster_url', 'horario_early_prelims', 'horario_prelims', 'horario_main_card', 'last_scraped_at', 'broadcast_info')
      ORDER BY column_name
    `);

    console.log('📋 Novas colunas em eventos:');
    columns.rows.forEach((row) => {
      console.log(`  ✓ ${row.column_name} (${row.data_type})`);
    });

    // Verificar views criadas
    const views = await pool.query(`
      SELECT viewname
      FROM pg_views
      WHERE schemaname = 'public'
      AND viewname IN ('v_proximo_evento_detalhado', 'v_eventos_por_mes')
    `);

    console.log('\n📊 Views criadas:');
    views.rows.forEach((row) => {
      console.log(`  ✓ ${row.viewname}`);
    });

    console.log('\n🎯 Migração do Calendário concluída!');
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
