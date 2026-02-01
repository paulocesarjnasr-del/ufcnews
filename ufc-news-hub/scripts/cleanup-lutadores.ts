import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

async function cleanup() {
  console.log('🧹 Limpando lutadores com nomes mal formatados...\n');
  
  try {
    // Deletar lutadores com quebras de linha no nome
    const deleted = await pool.query(`
      DELETE FROM lutadores
      WHERE nome LIKE '%\\n%'
         OR nome LIKE '%\\r%'
         OR LENGTH(nome) > 50
    `);
    console.log(`Lutadores deletados: ${deleted.rowCount}`);
    
    // Contar lutadores restantes
    const count = await pool.query('SELECT COUNT(*) FROM lutadores');
    console.log(`Lutadores restantes: ${count.rows[0].count}`);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await pool.end();
  }
}

cleanup();
