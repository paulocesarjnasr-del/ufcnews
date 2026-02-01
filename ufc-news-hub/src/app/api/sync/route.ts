import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { fetchRSSFeed } from '@/lib/rss-parser';
import { classifyNews } from '@/lib/keyword-classifier';
import { checkDuplicate, checkDuplicateByUrl } from '@/lib/deduplication';
import { SyncResult, Lutador } from '@/types';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createSyncLog(): Promise<string> {
  const result = await pool.query(
    `INSERT INTO sync_logs (status) VALUES ('running') RETURNING id`
  );
  return result.rows[0].id;
}

async function updateSyncLog(
  id: string,
  data: {
    status: 'completed' | 'error';
    noticias_processadas?: number;
    noticias_adicionadas?: number;
    noticias_duplicadas?: number;
    noticias_rejeitadas?: number;
    erro?: string;
  }
): Promise<void> {
  const fields: string[] = ['finished_at = NOW()', `status = '${data.status}'`];

  if (data.noticias_processadas !== undefined) {
    fields.push(`noticias_processadas = ${data.noticias_processadas}`);
  }
  if (data.noticias_adicionadas !== undefined) {
    fields.push(`noticias_adicionadas = ${data.noticias_adicionadas}`);
  }
  if (data.noticias_duplicadas !== undefined) {
    fields.push(`noticias_duplicadas = ${data.noticias_duplicadas}`);
  }
  if (data.noticias_rejeitadas !== undefined) {
    fields.push(`noticias_rejeitadas = ${data.noticias_rejeitadas}`);
  }
  if (data.erro) {
    fields.push(`erro = '${data.erro.replace(/'/g, "''")}'`);
  }

  await pool.query(`UPDATE sync_logs SET ${fields.join(', ')} WHERE id = $1`, [
    id,
  ]);
}

async function getAllLutadores(): Promise<Lutador[]> {
  const result = await pool.query('SELECT * FROM lutadores WHERE ativo = true');
  return result.rows;
}

async function saveNoticia(data: {
  titulo: string;
  subtitulo: string;
  conteudo_completo: string;
  imagem_url: string | null;
  fonte_url: string;
  categoria: string;
  hash_deduplicacao: string;
  publicado_em: Date;
}): Promise<{ id: string }> {
  const result = await pool.query(
    `
    INSERT INTO noticias (
      titulo,
      subtitulo,
      conteudo_completo,
      imagem_url,
      fonte_url,
      categoria,
      hash_deduplicacao,
      publicado_em
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `,
    [
      data.titulo,
      data.subtitulo,
      data.conteudo_completo,
      data.imagem_url,
      data.fonte_url,
      data.categoria,
      data.hash_deduplicacao,
      data.publicado_em,
    ]
  );
  return result.rows[0];
}

async function saveNoticiaEntidade(
  noticiaId: string,
  lutadorId: string
): Promise<void> {
  await pool.query(
    `
    INSERT INTO noticia_entidades (noticia_id, lutador_id)
    VALUES ($1, $2)
    ON CONFLICT (noticia_id, lutador_id) DO NOTHING
  `,
    [noticiaId, lutadorId]
  );
}

export async function POST(): Promise<NextResponse<SyncResult>> {
  const syncLogId = await createSyncLog();
  console.log(`\n=== INICIANDO SINCRONIZAÇÃO (${syncLogId}) ===\n`);

  let adicionadas = 0;
  let duplicadas = 0;
  let rejeitadas = 0;
  let processadas = 0;

  try {
    // 1. Buscar RSS
    console.log('Buscando feed RSS...');
    const rssItems = await fetchRSSFeed();
    console.log(`${rssItems.length} itens encontrados\n`);

    if (rssItems.length === 0) {
      await updateSyncLog(syncLogId, {
        status: 'completed',
        noticias_processadas: 0,
        noticias_adicionadas: 0,
        noticias_duplicadas: 0,
        noticias_rejeitadas: 0,
      });

      return NextResponse.json({
        success: true,
        processadas: 0,
        adicionadas: 0,
        duplicadas: 0,
        rejeitadas: 0,
      });
    }

    // 2. Carregar lista de lutadores do banco
    console.log('Carregando lutadores...');
    const lutadores = await getAllLutadores();
    const lutadoresParaClassificacao = lutadores.map((l) => ({
      nome: l.nome,
      apelido: l.apelido,
    }));
    console.log(`${lutadores.length} lutadores carregados\n`);

    // 3. Processar cada notícia
    for (const item of rssItems) {
      processadas++;
      console.log(`\n[${processadas}/${rssItems.length}] ${item.title}`);

      // 3.0 Verificar duplicata por URL primeiro (rápido)
      const urlDuplicate = await checkDuplicateByUrl(item.link, pool);
      if (urlDuplicate) {
        console.log('  -> DUPLICADA (URL já existe)');
        duplicadas++;
        continue;
      }

      // 3.1 Classificar por palavras-chave
      console.log('  -> Classificando...');
      const classification = classifyNews(
        item.title,
        item.description,
        lutadoresParaClassificacao
      );

      // 3.2 Verificar se é UFC
      if (!classification.eh_ufc) {
        console.log('  -> REJEITADA (não é UFC)');
        rejeitadas++;
        continue;
      }

      // 3.3 Verificar duplicata por hash
      const dedup = await checkDuplicate(
        item.title,
        classification.lutadores_mencionados,
        pool
      );

      if (dedup.isDuplicate) {
        console.log(`  -> DUPLICADA (${dedup.reason})`);
        duplicadas++;
        continue;
      }

      // 3.4 Salvar notícia
      console.log(
        `  -> Categoria: ${classification.categoria} | Lutadores: ${classification.lutadores_mencionados.length}`
      );
      try {
        const noticia = await saveNoticia({
          titulo: item.title,
          subtitulo: classification.subtitulo,
          conteudo_completo: item.description,
          imagem_url: item.enclosure?.url || null,
          fonte_url: item.link,
          categoria: classification.categoria,
          hash_deduplicacao: dedup.hash,
          publicado_em: new Date(item.pubDate),
        });

        // 3.5 Salvar relações com lutadores
        for (const nomeLutador of classification.lutadores_mencionados) {
          const lutador = lutadores.find(
            (l) => l.nome.toLowerCase() === nomeLutador.toLowerCase()
          );
          if (lutador) {
            await saveNoticiaEntidade(noticia.id, lutador.id);
          }
        }

        console.log('  -> ADICIONADA');
        adicionadas++;
      } catch (error: unknown) {
        // Pode ser erro de constraint (duplicata)
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('duplicate') || errorMessage.includes('unique')) {
          console.log('  -> DUPLICADA (constraint)');
          duplicadas++;
        } else {
          console.error('  -> ERRO:', errorMessage);
          rejeitadas++;
        }
      }

    }

    // 4. Atualizar log
    await updateSyncLog(syncLogId, {
      status: 'completed',
      noticias_processadas: processadas,
      noticias_adicionadas: adicionadas,
      noticias_duplicadas: duplicadas,
      noticias_rejeitadas: rejeitadas,
    });

    console.log(`\n=== SINCRONIZAÇÃO CONCLUÍDA ===`);
    console.log(`Processadas: ${processadas}`);
    console.log(`Adicionadas: ${adicionadas}`);
    console.log(`Duplicadas: ${duplicadas}`);
    console.log(`Rejeitadas: ${rejeitadas}\n`);

    return NextResponse.json({
      success: true,
      processadas,
      adicionadas,
      duplicadas,
      rejeitadas,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Erro na sincronização:', errorMessage);

    await updateSyncLog(syncLogId, {
      status: 'error',
      noticias_processadas: processadas,
      noticias_adicionadas: adicionadas,
      noticias_duplicadas: duplicadas,
      noticias_rejeitadas: rejeitadas,
      erro: errorMessage,
    });

    return NextResponse.json(
      {
        success: false,
        processadas,
        adicionadas,
        duplicadas,
        rejeitadas,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// GET para verificar último sync
export async function GET(): Promise<NextResponse> {
  try {
    const result = await pool.query(`
      SELECT *
      FROM sync_logs
      ORDER BY started_at DESC
      LIMIT 1
    `);

    return NextResponse.json(result.rows[0] || null);
  } catch (error) {
    console.error('Erro ao buscar último sync:', error);
    return NextResponse.json({ error: 'Erro ao buscar sync' }, { status: 500 });
  }
}
