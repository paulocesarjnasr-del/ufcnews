import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

/**
 * Converte URL de imagem de corpo inteiro para headshot
 *
 * De: https://ufc.com/images/styles/event_fight_card_upper_body_of_standing_athlete/s3/.../FIGHTER_NAME_L_DATE.png
 * Para: https://ufc.com/images/styles/event_results_athlete_headshot/s3/.../FIGHTER_NAME_DATE.png
 */
function convertToHeadshot(url: string): string {
  if (!url) return url;

  // Se já é headshot, retornar como está
  if (url.includes('event_results_athlete_headshot')) {
    return url;
  }

  // Se é imagem placeholder/silhouette, retornar null
  if (url.includes('SILHOUETTE') || url.includes('no-profile-image')) {
    return '';
  }

  // Trocar o estilo de imagem
  let newUrl = url.replace(
    'event_fight_card_upper_body_of_standing_athlete',
    'event_results_athlete_headshot'
  );

  // Também tentar outros estilos de corpo inteiro
  newUrl = newUrl.replace(
    'athlete_bio_full_body',
    'event_results_athlete_headshot'
  );

  newUrl = newUrl.replace(
    'teaser',
    'event_results_athlete_headshot'
  );

  // Remover sufixo _L ou _R do nome do arquivo (indicam pose esquerda/direita)
  // Padrão: NAME_L_DATE.png ou NAME_R_DATE.png -> NAME_DATE.png
  newUrl = newUrl.replace(/_[LR]_(\d{2}-\d{2}\.png)/, '_$1');

  return newUrl;
}

async function fixFighterImages() {
  console.log('🖼️ Corrigindo imagens dos lutadores para headshots...\n');

  try {
    // Buscar todos os lutadores com imagens
    const fighters = await pool.query(`
      SELECT id, nome, imagem_url
      FROM lutadores
      WHERE imagem_url IS NOT NULL AND imagem_url != ''
    `);

    console.log(`📊 Encontrados ${fighters.rows.length} lutadores com imagens\n`);

    let updated = 0;
    let skipped = 0;

    for (const fighter of fighters.rows) {
      const oldUrl = fighter.imagem_url;
      const newUrl = convertToHeadshot(oldUrl);

      if (newUrl !== oldUrl) {
        if (newUrl === '') {
          // Limpar URLs de placeholder
          await pool.query(
            `UPDATE lutadores SET imagem_url = NULL WHERE id = $1`,
            [fighter.id]
          );
          console.log(`🗑️ ${fighter.nome}: removida imagem placeholder`);
        } else {
          await pool.query(
            `UPDATE lutadores SET imagem_url = $1 WHERE id = $2`,
            [newUrl, fighter.id]
          );
          console.log(`✅ ${fighter.nome}: convertida para headshot`);
        }
        updated++;
      } else {
        skipped++;
      }
    }

    console.log(`\n✅ Correção concluída!`);
    console.log(`📊 Resultados:`);
    console.log(`   - Atualizadas: ${updated}`);
    console.log(`   - Já corretas: ${skipped}`);

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await pool.end();
  }
}

fixFighterImages();
