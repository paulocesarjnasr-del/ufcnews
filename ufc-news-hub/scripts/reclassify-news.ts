/**
 * Script para re-classificar todas as notícias existentes
 * usando o classificador de keywords atualizado
 */

import { Pool } from 'pg';
import { classifyNews } from '../src/lib/keyword-classifier';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface Noticia {
  id: string;
  titulo: string;
  conteudo_completo: string;
  categoria: string;
  subtitulo: string;
}

interface Lutador {
  id: string;
  nome: string;
  apelido: string | null;
}

async function main() {
  console.log('🔄 Iniciando re-classificação de notícias...\n');

  try {
    // 1. Buscar todos os lutadores ativos
    console.log('📋 Carregando lutadores...');
    const lutadoresResult = await pool.query(
      'SELECT id, nome, apelido FROM lutadores WHERE ativo = true'
    );
    const lutadores: Lutador[] = lutadoresResult.rows;
    console.log(`   ${lutadores.length} lutadores carregados\n`);

    const lutadoresParaClassificacao = lutadores.map((l) => ({
      nome: l.nome,
      apelido: l.apelido,
    }));

    // 2. Buscar todas as notícias
    console.log('📰 Carregando notícias...');
    const noticiasResult = await pool.query(
      'SELECT id, titulo, conteudo_completo, categoria, subtitulo FROM noticias ORDER BY publicado_em DESC'
    );
    const noticias: Noticia[] = noticiasResult.rows;
    console.log(`   ${noticias.length} notícias encontradas\n`);

    // 3. Estatísticas antes
    const beforeStats = {
      lutas: noticias.filter((n) => n.categoria === 'lutas').length,
      lutadores: noticias.filter((n) => n.categoria === 'lutadores').length,
      backstage: noticias.filter((n) => n.categoria === 'backstage').length,
    };

    console.log('📊 Distribuição ANTES:');
    console.log(`   lutas:     ${beforeStats.lutas} (${((beforeStats.lutas / noticias.length) * 100).toFixed(1)}%)`);
    console.log(`   lutadores: ${beforeStats.lutadores} (${((beforeStats.lutadores / noticias.length) * 100).toFixed(1)}%)`);
    console.log(`   backstage: ${beforeStats.backstage} (${((beforeStats.backstage / noticias.length) * 100).toFixed(1)}%)`);
    console.log('');

    // 4. Re-classificar cada notícia
    let updated = 0;
    let categoriaChanged = 0;
    let lutadoresUpdated = 0;

    const afterStats = {
      lutas: 0,
      lutadores: 0,
      backstage: 0,
    };

    console.log('🔄 Re-classificando...\n');

    for (let i = 0; i < noticias.length; i++) {
      const noticia = noticias[i];

      // Classificar
      const classification = classifyNews(
        noticia.titulo,
        noticia.conteudo_completo,
        lutadoresParaClassificacao
      );

      // Contar nova categoria
      afterStats[classification.categoria]++;

      // Verificar se mudou
      const categoriaChangedFlag = noticia.categoria !== classification.categoria;
      const subtituloChanged = noticia.subtitulo !== classification.subtitulo;

      if (categoriaChangedFlag || subtituloChanged) {
        // Atualizar notícia
        await pool.query(
          `UPDATE noticias SET categoria = $1, subtitulo = $2 WHERE id = $3`,
          [classification.categoria, classification.subtitulo, noticia.id]
        );
        updated++;

        if (categoriaChangedFlag) {
          categoriaChanged++;
          console.log(`   [${i + 1}/${noticias.length}] ${noticia.titulo.substring(0, 50)}...`);
          console.log(`       ${noticia.categoria} -> ${classification.categoria}`);
        }
      }

      // Atualizar relações com lutadores
      if (classification.lutadores_mencionados.length > 0) {
        // Remover relações antigas
        await pool.query(
          'DELETE FROM noticia_entidades WHERE noticia_id = $1',
          [noticia.id]
        );

        // Adicionar novas relações
        for (const nomeLutador of classification.lutadores_mencionados) {
          const lutador = lutadores.find(
            (l) => l.nome.toLowerCase() === nomeLutador.toLowerCase()
          );
          if (lutador) {
            await pool.query(
              `INSERT INTO noticia_entidades (noticia_id, lutador_id)
               VALUES ($1, $2)
               ON CONFLICT (noticia_id, lutador_id) DO NOTHING`,
              [noticia.id, lutador.id]
            );
          }
        }
        lutadoresUpdated++;
      }

      // Progress indicator
      if ((i + 1) % 10 === 0) {
        process.stdout.write(`   Processadas: ${i + 1}/${noticias.length}\r`);
      }
    }

    console.log('\n');

    // 5. Estatísticas depois
    console.log('📊 Distribuição DEPOIS:');
    console.log(`   lutas:     ${afterStats.lutas} (${((afterStats.lutas / noticias.length) * 100).toFixed(1)}%)`);
    console.log(`   lutadores: ${afterStats.lutadores} (${((afterStats.lutadores / noticias.length) * 100).toFixed(1)}%)`);
    console.log(`   backstage: ${afterStats.backstage} (${((afterStats.backstage / noticias.length) * 100).toFixed(1)}%)`);
    console.log('');

    // 6. Resumo
    console.log('✅ Re-classificação concluída!');
    console.log(`   Total de notícias: ${noticias.length}`);
    console.log(`   Categorias alteradas: ${categoriaChanged}`);
    console.log(`   Registros atualizados: ${updated}`);
    console.log(`   Relações de lutadores atualizadas: ${lutadoresUpdated}`);

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await pool.end();
  }
}

main();
