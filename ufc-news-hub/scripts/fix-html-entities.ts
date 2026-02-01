/**
 * Script para corrigir entidades HTML nos títulos existentes no banco
 */

import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  let decoded = text;

  // Decodificar entidades numericas (ex: &#8211; &#124;)
  decoded = decoded.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));

  // Decodificar entidades hexadecimais (ex: &#x2013;)
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  // Decodificar entidades nomeadas comuns
  decoded = decoded
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&hellip;/g, '...');

  return decoded;
}

async function fixHtmlEntities(): Promise<void> {
  console.log('Corrigindo entidades HTML nos titulos...\n');

  try {
    // Buscar todas as noticias que tem entidades HTML no titulo
    const result = await pool.query(`
      SELECT id, titulo, subtitulo
      FROM noticias
      WHERE titulo LIKE '%&#%' OR titulo LIKE '%&amp;%' OR titulo LIKE '%&quot;%'
         OR subtitulo LIKE '%&#%' OR subtitulo LIKE '%&amp;%' OR subtitulo LIKE '%&quot;%'
    `);

    console.log(`${result.rows.length} noticias encontradas com entidades HTML\n`);

    let updated = 0;

    for (const row of result.rows) {
      const newTitulo = decodeHtmlEntities(row.titulo);
      const newSubtitulo = decodeHtmlEntities(row.subtitulo);

      if (newTitulo !== row.titulo || newSubtitulo !== row.subtitulo) {
        await pool.query(
          'UPDATE noticias SET titulo = $1, subtitulo = $2 WHERE id = $3',
          [newTitulo, newSubtitulo, row.id]
        );
        console.log(`Atualizado: ${newTitulo.substring(0, 60)}...`);
        updated++;
      }
    }

    console.log(`\n${updated} noticias atualizadas!`);

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await pool.end();
  }
}

fixHtmlEntities();
