import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

async function updateEventNames() {
  console.log('🔄 Atualizando nomes dos eventos...\n');

  try {
    // Buscar todos os eventos
    const result = await pool.query(`
      SELECT id, nome, ufc_slug FROM eventos
    `);

    for (const evento of result.rows) {
      const { id, nome, ufc_slug } = evento;
      let novoNome = nome;

      // Verificar se é um evento PPV (ufc-324)
      const ppvMatch = ufc_slug?.match(/^ufc-(\d+)$/i);
      if (ppvMatch) {
        novoNome = `UFC ${ppvMatch[1]}`;
      }
      // Verificar se é um Fight Night
      else if (ufc_slug?.toLowerCase().includes('fight-night')) {
        // Manter o nome atual se já estiver no formato correto
        if (!nome.toUpperCase().startsWith('UFC FIGHT NIGHT')) {
          novoNome = `UFC FIGHT NIGHT: ${nome.toUpperCase()}`;
        }
      }

      // Atualizar se o nome mudou
      if (novoNome !== nome) {
        await pool.query(`UPDATE eventos SET nome = $1 WHERE id = $2`, [novoNome, id]);
        console.log(`✅ ${nome} → ${novoNome}`);
      }
    }

    // Atualizar tipo dos eventos
    await pool.query(`
      UPDATE eventos
      SET tipo = 'PPV'
      WHERE ufc_slug ~ '^ufc-[0-9]+$'
    `);

    await pool.query(`
      UPDATE eventos
      SET tipo = 'Fight Night'
      WHERE ufc_slug LIKE '%fight-night%'
    `);

    console.log('\n✅ Nomes e tipos atualizados!');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await pool.end();
  }
}

updateEventNames();
