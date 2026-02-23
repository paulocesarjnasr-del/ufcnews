import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

export async function GET() {
  try {
    const [totalsRes, recentRes, rateRes] = await Promise.all([
      pool.query(`
        SELECT 
          COUNT(*) as total,
          COUNT(imagem_url) FILTER (WHERE imagem_url IS NOT NULL AND imagem_url != '' AND imagem_url NOT LIKE '%dicebear%') as fotos,
          COUNT(pais) FILTER (WHERE pais IS NOT NULL AND pais != '' AND pais NOT IN ('Unknown', 'N/A')) as pais,
          COUNT(cidade_natal) FILTER (WHERE cidade_natal IS NOT NULL AND cidade_natal != '' AND cidade_natal NOT IN ('Unknown', 'N/A')) as cidade,
          COUNT(academia) FILTER (WHERE academia IS NOT NULL AND academia != '' AND academia NOT IN ('Independent', 'Unknown', 'N/A', 'None')) as academia,
          COUNT(categoria_peso) FILTER (WHERE categoria_peso IS NOT NULL AND categoria_peso != '' AND categoria_peso NOT IN ('Unknown', 'N/A')) as categoria,
          COUNT(estilo_luta) FILTER (WHERE estilo_luta IS NOT NULL AND estilo_luta != '' AND estilo_luta NOT IN ('Unknown', 'N/A')) as estilo,
          COUNT(ranking_divisao) FILTER (WHERE ranking_divisao IS NOT NULL) as ranking,
          COUNT(slpm) FILTER (WHERE slpm IS NOT NULL AND slpm > 0) as stats,
          COUNT(vitorias) FILTER (WHERE vitorias IS NOT NULL AND (vitorias > 0 OR derrotas > 0)) as record,
          COUNT(nocautes) FILTER (WHERE nocautes IS NOT NULL AND (nocautes > 0 OR finalizacoes > 0 OR decisoes > 0)) as ko_data,
          COUNT(stance) FILTER (WHERE stance IS NOT NULL AND stance != '' AND stance NOT IN ('Unknown', 'N/A')) as stance
        FROM lutadores
      `),
      pool.query(`
        SELECT nome, pais, academia, categoria_peso, estilo_luta, cidade_natal,
          imagem_url IS NOT NULL AND imagem_url != '' as tem_foto,
          updated_at
        FROM lutadores 
        WHERE updated_at > NOW() - INTERVAL '60 seconds'
        ORDER BY updated_at DESC
        LIMIT 20
      `),
      pool.query(`
        SELECT 
          COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '60 seconds') as last_min,
          COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '300 seconds') as last_5min
        FROM lutadores
      `),
    ]);

    return NextResponse.json({
      totals: totalsRes.rows[0],
      recent: recentRes.rows,
      rate: rateRes.rows[0],
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
