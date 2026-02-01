import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

async function cleanup() {
  console.log('🧹 Limpando eventos duplicados e com dados ruins...\n');
  
  try {
    // Deletar lutas órfãs primeiro (foreign key constraint)
    const deletedLutas = await pool.query(`
      DELETE FROM lutas
      WHERE evento_id IN (
        SELECT id FROM eventos
        WHERE local_evento LIKE '%\\n%' 
           OR cidade LIKE '%\\n%'
           OR nome != 'UFC 315'
      )
    `);
    console.log(`Lutas deletadas: ${deletedLutas.rowCount}`);
    
    // Deletar eventos com dados ruins (exceto UFC 315 original)
    const deletedEventos = await pool.query(`
      DELETE FROM eventos
      WHERE local_evento LIKE '%\\n%' 
         OR cidade LIKE '%\\n%'
         OR nome != 'UFC 315'
    `);
    console.log(`Eventos deletados: ${deletedEventos.rowCount}`);
    
    // Contar eventos restantes
    const count = await pool.query('SELECT COUNT(*) FROM eventos');
    console.log(`\nEventos restantes: ${count.rows[0].count}`);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await pool.end();
  }
}

cleanup();
