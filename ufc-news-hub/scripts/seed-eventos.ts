import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

// Dados do proximo evento UFC (exemplo: UFC 315)
const EVENTO = {
  nome: 'UFC 315: Du Plessis vs Chimaev',
  slug: 'ufc-315',
  data_evento: '2025-02-08T23:00:00Z', // Ajustar para data real
  local_evento: 'T-Mobile Arena',
  cidade: 'Las Vegas',
  pais: 'USA',
  tipo: 'PPV',
  status: 'agendado',
  onde_assistir: 'UFC Fight Pass, Combate, PPV',
  descricao: 'Dricus du Plessis defende seu titulo dos pesos medios contra Khamzat Chimaev',
};

// Lutadores para o evento (com dados expandidos)
const LUTADORES = [
  {
    nome: 'Dricus Du Plessis',
    apelido: 'Stillknocks',
    categoria_peso: 'Middleweight',
    pais: 'South Africa',
    idade: 30,
    altura: '6\'0"',
    envergadura: '76"',
    vitorias: 22,
    derrotas: 2,
    empates: 0,
    nocautes: 8,
    finalizacoes: 8,
    decisoes: 6,
    ranking_divisao: 0, // Campeao
    academia: 'Combat Brothers',
    estilo_luta: 'Striking, Grappling',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-08/DU_PLESSIS_DRICUS_L_08-17.png',
  },
  {
    nome: 'Khamzat Chimaev',
    apelido: 'Borz',
    categoria_peso: 'Middleweight',
    pais: 'Russia',
    idade: 30,
    altura: '6\'2"',
    envergadura: '75"',
    vitorias: 13,
    derrotas: 0,
    empates: 0,
    nocautes: 6,
    finalizacoes: 6,
    decisoes: 1,
    ranking_divisao: 3,
    academia: 'AllStars Training Center',
    estilo_luta: 'Wrestling, Striking',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-10/CHIMAEV_KHAMZAT_L_10-26.png',
  },
  {
    nome: 'Merab Dvalishvili',
    apelido: 'The Machine',
    categoria_peso: 'Bantamweight',
    pais: 'Georgia',
    idade: 34,
    altura: '5\'6"',
    envergadura: '67"',
    vitorias: 18,
    derrotas: 4,
    empates: 0,
    nocautes: 2,
    finalizacoes: 2,
    decisoes: 14,
    ranking_divisao: 0,
    academia: 'Serra-Longo',
    estilo_luta: 'Wrestling',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/DVALISHVILI_MERAB_L_09-14.png',
  },
  {
    nome: 'Umar Nurmagomedov',
    apelido: '',
    categoria_peso: 'Bantamweight',
    pais: 'Russia',
    idade: 28,
    altura: '5\'7"',
    envergadura: '70"',
    vitorias: 18,
    derrotas: 0,
    empates: 0,
    nocautes: 3,
    finalizacoes: 9,
    decisoes: 6,
    ranking_divisao: 2,
    academia: 'American Kickboxing Academy',
    estilo_luta: 'Grappling, Wrestling',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-08/NURMAGOMEDOV_UMAR_L_08-03.png',
  },
  {
    nome: 'Ciryl Gane',
    apelido: 'Bon Gamin',
    categoria_peso: 'Heavyweight',
    pais: 'France',
    idade: 34,
    altura: '6\'4"',
    envergadura: '81"',
    vitorias: 12,
    derrotas: 2,
    empates: 0,
    nocautes: 8,
    finalizacoes: 1,
    decisoes: 3,
    ranking_divisao: 2,
    academia: 'MMA Factory',
    estilo_luta: 'Muay Thai, Kickboxing',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-07/GANE_CIRYL_L_07-27.png',
  },
  {
    nome: 'Alexander Volkov',
    apelido: 'Drago',
    categoria_peso: 'Heavyweight',
    pais: 'Russia',
    idade: 36,
    altura: '6\'7"',
    envergadura: '80"',
    vitorias: 38,
    derrotas: 11,
    empates: 0,
    nocautes: 26,
    finalizacoes: 6,
    decisoes: 6,
    ranking_divisao: 5,
    academia: 'Fedor Team',
    estilo_luta: 'Kickboxing, Striking',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/VOLKOV_ALEXANDER_L_09-28.png',
  },
  {
    nome: 'Mackenzie Dern',
    apelido: '',
    categoria_peso: "Women's Strawweight",
    pais: 'USA',
    idade: 31,
    altura: '5\'4"',
    envergadura: '63"',
    vitorias: 14,
    derrotas: 5,
    empates: 0,
    nocautes: 0,
    finalizacoes: 8,
    decisoes: 6,
    ranking_divisao: 5,
    academia: 'Dern BJJ',
    estilo_luta: 'Brazilian Jiu-Jitsu',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-08/DERN_MACKENZIE_L_08-03.png',
  },
  {
    nome: 'Amanda Ribas',
    apelido: '',
    categoria_peso: "Women's Strawweight",
    pais: 'Brasil',
    idade: 31,
    altura: '5\'4"',
    envergadura: '64"',
    vitorias: 13,
    derrotas: 4,
    empates: 0,
    nocautes: 1,
    finalizacoes: 5,
    decisoes: 7,
    ranking_divisao: 8,
    academia: 'Nova Uniao',
    estilo_luta: 'Muay Thai, BJJ',
    imagem_url: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-07/RIBAS_AMANDA_L_07-13.png',
  },
];

// Lutas do card
const LUTAS = [
  {
    lutador1: 'Dricus Du Plessis',
    lutador2: 'Khamzat Chimaev',
    categoria_peso: 'Middleweight',
    tipo: 'main_event',
    rounds: 5,
    is_titulo: true,
    ordem: 12,
  },
  {
    lutador1: 'Merab Dvalishvili',
    lutador2: 'Umar Nurmagomedov',
    categoria_peso: 'Bantamweight',
    tipo: 'co_main',
    rounds: 5,
    is_titulo: true,
    ordem: 11,
  },
  {
    lutador1: 'Ciryl Gane',
    lutador2: 'Alexander Volkov',
    categoria_peso: 'Heavyweight',
    tipo: 'card_principal',
    rounds: 3,
    is_titulo: false,
    ordem: 10,
  },
  {
    lutador1: 'Mackenzie Dern',
    lutador2: 'Amanda Ribas',
    categoria_peso: "Women's Strawweight",
    tipo: 'card_principal',
    rounds: 3,
    is_titulo: false,
    ordem: 9,
  },
];

async function seedEventos() {
  console.log('🥊 Iniciando seed de eventos UFC...\n');

  try {
    // 1. Inserir/atualizar lutadores
    console.log('📝 Inserindo lutadores...');
    const lutadorIds: Record<string, string> = {};

    for (const lutador of LUTADORES) {
      const result = await pool.query(
        `INSERT INTO lutadores (
          nome, apelido, categoria_peso, pais, idade, altura, envergadura,
          vitorias, derrotas, empates, nocautes, finalizacoes, decisoes,
          ranking_divisao, academia, estilo_luta, imagem_url, ativo
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, true)
        ON CONFLICT (nome)
        DO UPDATE SET
          apelido = EXCLUDED.apelido,
          categoria_peso = EXCLUDED.categoria_peso,
          pais = EXCLUDED.pais,
          idade = EXCLUDED.idade,
          altura = EXCLUDED.altura,
          envergadura = EXCLUDED.envergadura,
          vitorias = EXCLUDED.vitorias,
          derrotas = EXCLUDED.derrotas,
          empates = EXCLUDED.empates,
          nocautes = EXCLUDED.nocautes,
          finalizacoes = EXCLUDED.finalizacoes,
          decisoes = EXCLUDED.decisoes,
          ranking_divisao = EXCLUDED.ranking_divisao,
          academia = EXCLUDED.academia,
          estilo_luta = EXCLUDED.estilo_luta,
          imagem_url = EXCLUDED.imagem_url,
          updated_at = NOW()
        RETURNING id`,
        [
          lutador.nome,
          lutador.apelido || null,
          lutador.categoria_peso,
          lutador.pais,
          lutador.idade,
          lutador.altura,
          lutador.envergadura,
          lutador.vitorias,
          lutador.derrotas,
          lutador.empates,
          lutador.nocautes,
          lutador.finalizacoes,
          lutador.decisoes,
          lutador.ranking_divisao,
          lutador.academia,
          lutador.estilo_luta,
          lutador.imagem_url,
        ]
      );
      lutadorIds[lutador.nome] = result.rows[0].id;
      console.log(`  ✓ ${lutador.nome}`);
    }

    // 2. Inserir evento
    console.log('\n📅 Inserindo evento...');
    const eventoResult = await pool.query(
      `INSERT INTO eventos (
        nome, slug, data_evento, local_evento, cidade, pais, tipo, status, onde_assistir, descricao
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (slug)
      DO UPDATE SET
        nome = EXCLUDED.nome,
        data_evento = EXCLUDED.data_evento,
        local_evento = EXCLUDED.local_evento,
        cidade = EXCLUDED.cidade,
        pais = EXCLUDED.pais,
        tipo = EXCLUDED.tipo,
        status = EXCLUDED.status,
        onde_assistir = EXCLUDED.onde_assistir,
        descricao = EXCLUDED.descricao,
        updated_at = NOW()
      RETURNING id`,
      [
        EVENTO.nome,
        EVENTO.slug,
        EVENTO.data_evento,
        EVENTO.local_evento,
        EVENTO.cidade,
        EVENTO.pais,
        EVENTO.tipo,
        EVENTO.status,
        EVENTO.onde_assistir,
        EVENTO.descricao,
      ]
    );
    const eventoId = eventoResult.rows[0].id;
    console.log(`  ✓ ${EVENTO.nome} (ID: ${eventoId})`);

    // 3. Inserir lutas
    console.log('\n🥊 Inserindo lutas...');
    for (const luta of LUTAS) {
      const lutador1Id = lutadorIds[luta.lutador1];
      const lutador2Id = lutadorIds[luta.lutador2];

      if (!lutador1Id || !lutador2Id) {
        console.log(`  ⚠ Pulando luta: ${luta.lutador1} vs ${luta.lutador2} (lutador nao encontrado)`);
        continue;
      }

      await pool.query(
        `INSERT INTO lutas (
          evento_id, lutador1_id, lutador2_id, categoria_peso, tipo, rounds, is_titulo, ordem, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'agendada')
        ON CONFLICT DO NOTHING`,
        [
          eventoId,
          lutador1Id,
          lutador2Id,
          luta.categoria_peso,
          luta.tipo,
          luta.rounds,
          luta.is_titulo,
          luta.ordem,
        ]
      );
      console.log(`  ✓ ${luta.lutador1} vs ${luta.lutador2}`);
    }

    console.log('\n✅ Seed concluido com sucesso!');
    console.log(`\n📊 Resumo:`);
    console.log(`   - ${LUTADORES.length} lutadores`);
    console.log(`   - 1 evento`);
    console.log(`   - ${LUTAS.length} lutas`);

  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedEventos();
