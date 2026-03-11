import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'holloway-vs-oliveira-2',
  evento_id: null,
  slug: 'holloway-vs-oliveira-2',
  titulo: 'Holloway vs Oliveira 2: A Vinganca de Uma Decada',
  subtitulo: '11 anos depois, o BMF encontra o recordista de finalizacoes',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '', envergadura: '', idade: 0, academia: '' },
      fighter2: { altura: '', envergadura: '', idade: 0, academia: '' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Max Holloway',
    record: '27-8-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Charles Oliveira',
    record: '36-11-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC 326',
  evento_data: '7 de Marco, 2026',
  evento_local: 'T-Mobile Arena, Las Vegas',
  categoria_peso: 'Peso Leve',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 sections)
  // ===========================
  full_analysis: {
    // -------------------------------------------------
    // 1. HERO SECTION
    // -------------------------------------------------
    hero: {
      evento_nome: 'UFC 326',
      evento_data: '7 de Marco, 2026',
      evento_local: 'T-Mobile Arena, Las Vegas',
      categoria_peso: 'Peso Leve (155 lbs)',
      num_rounds: 5,
      titulo_em_jogo: 'Titulo BMF',
      tagline: 'A Vinganca de Uma Decada',
      tagline_sub: '99 segundos em 2015. 25 minutos em 2026. A historia se completa.',
      fighter1: {
        nome_completo: 'Max "Blessed" Holloway',
        apelido: 'Blessed',
        sobrenome: 'Holloway',
        record: '27-8-0',
        ranking: '#4 Peso Leve',
        info_extra: 'Waianae, Hawaii | 34 anos',
        imagem_fullbody_url:
          'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-07/HOLLOWAY_MAX_L_BMF_BELT_07-19.png?itok=9vwP11K9',
      },
      fighter2: {
        nome_completo: 'Charles "Do Bronx" Oliveira',
        apelido: 'Do Bronx',
        sobrenome: 'Oliveira',
        record: '36-11-0',
        ranking: '#3 Peso Leve',
        info_extra: 'Guaruja, SP, Brasil | 36 anos',
        imagem_fullbody_url:
          'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/OLIVEIRA_CHARLES_L_10-11.png?itok=-8FrNvYo',
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Saskatoon, 2015: Os 99 Segundos Que Quase Acabaram Com Tudo</h3>
        <p>20 de agosto de 2015. SaskTel Centre, Saskatoon, Canada. Um <strong class="text-ufc-red">Holloway</strong> de 23 anos e um <strong class="text-blue-400">Oliveira</strong> de 25 anos se encontram no main event de um Fight Night. A luta mal comeca: Oliveira tenta um takedown, Holloway defende, e quando Charles se levanta, algo horrivel acontece. Oliveira agarra o proprio pescoco e desaba. A luta e interrompida com 1:39 de primeiro round. TKO por lesao.</p>
        <p>Nos bastidores, a cena era assustadora. <strong class="text-blue-400">Oliveira</strong> foi colocado em uma maca com colar cervical, levado de ambulancia. Ele perdeu sensibilidade no lado esquerdo do corpo. Em entrevistas anos depois, Charles revelou: <em>"Achei que minha carreira tinha acabado. Achei que ia ficar paralisado."</em> Ninguem nunca soube exatamente o que causou a lesao. Um micro-rasgo no esofago? Uma compressao cervical? O misterio persiste ate hoje.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Duas Jornadas Lendarias</h3>
        <p><strong class="text-ufc-red">Holloway</strong> saiu daquela luta e entrou em modo demolidor. Emplacou 13 vitorias consecutivas no peso-pena, destronou Jose Aldo duas vezes, e se tornou o recordista absoluto de golpes significativos da historia do UFC com mais de 3.650. Em 2024, no UFC 300, nocauteou Justin Gaethje com um dos golpes mais iconicos da historia do esporte para conquistar o titulo BMF. Subiu para o peso leve e dominou Dustin Poirier na trilogia.</p>
        <p><strong class="text-blue-400">Oliveira</strong> voltou daquela noite em Saskatoon e reconstruiu tudo do zero. De lutador inconsistente com 7 derrotas em 20 lutas, virou uma maquina de finalizacoes. Emplacou 11 vitorias consecutivas, conquistou o cinturao dos peso leve, e se tornou o recordista absoluto de finalizacoes (21), bonus (21) e vitorias (24) na historia do UFC. Uma transformacao que desafia qualquer narrativa esportiva.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Marcos 2026: O Acerto de Contas</h3>
        <p><strong class="text-ufc-red">Holloway</strong> vem de uma vitoria solida sobre Poirier no UFC 318, mas ficou parado por conta de uma lesao na mao direita. A pausa de 8 meses e a mais longa desde 2021, mas historicamente Max volta ainda melhor apos pausas. Ele quer provar que nao e apenas um visitante no peso leve. Uma vitoria sobre o #3 do mundo consolida o BMF e abre a porta para uma disputa pelo cinturao indisputado.</p>
        <p><strong class="text-blue-400">Oliveira</strong> vem de um Performance of the Night contra Gamrot no Rio de Janeiro, finalizando com um rear-naked choke no segundo round. Mas o fantasma do KO brutal de Topuria no UFC 317 ainda paira. Charles sempre respondeu apos derrotas. Depois de perder para Islam, finalizou Dariush em 4 minutos. Depois de perder para Tsarukyan, venceu Chandler e Gamrot. Esse padrao e o DNA do Do Bronx: cair e levantar.</p>
      `,
      stakes: [
        {
          dimensao: 'Ranking',
          fighter1: '#4 LW, campeao BMF',
          fighter2: '#3 LW, ex-campeao',
        },
        {
          dimensao: 'Objetivo',
          fighter1: 'Primeira defesa do BMF, consolidar-se no peso leve',
          fighter2: 'Vingar a derrota de 2015, conquistar o BMF',
        },
        {
          dimensao: 'Legado',
          fighter1: 'GOAT do peso-pena buscando coroa dupla',
          fighter2: 'Maior finalizador da historia buscando mais um titulo',
        },
        {
          dimensao: 'Risco',
          fighter1: 'Ser finalizado pela primeira vez desde 2012',
          fighter2: 'Segundo KO consecutivo, questoes sobre o queixo',
        },
        {
          dimensao: 'Title Shot',
          fighter1: 'Vitoria = top 2 LW, irrecusavel para disputa de titulo',
          fighter2: 'Vitoria = volta ao topo, disputa pelo cinturao em 2026',
        },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O BLESSED CONSOLIDA O TRONO',
          subtitulo: 'Venceu em 99 segundos como prospect. Vence em 25 minutos como lenda. A historia se completa.',
          consequencias: [
            {
              tag: 'BMF',
              texto: 'Primeira defesa bem-sucedida do titulo BMF. Com vitorias sobre Gaethje, Poirier e Oliveira, tres ex-campeoes derrotados consecutivamente. O BMF deixa de ser simbolico e vira sinonimo do Holloway.',
            },
            {
              tag: 'RANKING',
              texto: 'Sobe para top 2 dos peso leve. Com tres vitorias sobre ex-campeoes, o argumento por uma disputa de titulo contra Topuria ou o campeao dos peso leve fica impossivel de negar.',
            },
            {
              tag: 'LEGADO',
              texto: 'Se consolida como o maior peso-pena de todos os tempos E uma forca real nos peso leve. Apenas Conor McGregor conquistou titulos em duas categorias, e Holloway estaria a uma luta de igualar esse feito.',
            },
            {
              tag: 'MONEY FIGHT',
              texto: 'Uma luta contra McGregor no International Fight Week seria a maior luta possivel no MMA moderno. Duas lendas, dois ex-campeoes, historia antiga. O dinheiro e a fama estariam garantidos.',
            },
          ],
          proxima_luta: 'Disputa pelo cinturao dos peso leve ou McGregor no International Fight Week (julho 2026)',
        },
        fighter2_vence: {
          titulo: 'A VINGANCA DE 11 ANOS',
          subtitulo: 'De quase ficar paralisado em 99 segundos a conquistar o BMF sobre o homem que o colocou na maca.',
          consequencias: [
            {
              tag: 'HISTORICO',
              texto: 'Primeiro brasileiro a conquistar o titulo BMF. Somado aos recordes de mais finalizacoes (21), mais bonus (21) e mais vitorias (24) do UFC, o curriculo de Oliveira se torna absolutamente inigualavel.',
            },
            {
              tag: 'REDENCAO',
              texto: 'Prova que o KO de Topuria no UFC 317 foi acidente de percurso. Aos 36 anos, com mais de 45 lutas profissionais, mostra que ainda e elite ao vencer um dos maiores lutadores da historia do esporte.',
            },
            {
              tag: 'CINTURAO',
              texto: 'Como #3 dos peso leve com vitoria sobre o #4, fica na posicao perfeita para disputar o cinturao. Seria a chance de ser bicampeao, algo que apenas ele e poucos outros conseguiram na historia.',
            },
            {
              tag: 'NARRATIVA',
              texto: 'Se vencer por finalizacao, seria a primeira submission sobre Holloway desde Poirier em 2012. Quatorze anos de invencibilidade no ground game quebrados pelo maior finalizador da historia. O script nao pode ser melhor.',
            },
          ],
          proxima_luta: 'Disputa pelo cinturao indisputado dos peso leve contra o campeao (verao/outono 2026)',
        },
      },
    },

    // -------------------------------------------------
    // 3. MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Max Holloway',
        color: 'red',
        recent_fights: [
          {
            date: 'Abr 2023',
            opponent: 'Arnold Allen',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#6 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Dominio completo em 5 rounds. Encerrou a sequencia invicta de Allen no UFC.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Chan Sung Jung',
            result: 'W',
            method: 'KO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocauteou o Korean Zombie com direitazo limpo. Jung se aposentou apos a luta.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Justin Gaethje',
            result: 'W',
            method: 'KO R5',
            opponent_rank: '#3 LW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'NOCAUTE DO ANO. Conquistou o titulo BMF com um dos finishes mais iconicos da historia.',
          },
          {
            date: 'Out 2024',
            opponent: 'Ilia Topuria',
            result: 'L',
            method: 'KO R3',
            opponent_rank: 'Campeao FW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Primeiro knockdown da carreira. Derrota contra o campeao invicto em Abu Dhabi.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Dustin Poirier',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#5 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Trilogia contra rival historico. Vitoria solida mas lesionou a mao direita.',
          },
        ],
        full_fight_history: [
          { date: 'Fev 2012', opponent: 'Dustin Poirier', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Estreia no UFC. Finalizado no primeiro round.' },
          { date: 'Jun 2012', opponent: 'Pat Schilling', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute rapido na segunda luta.' },
          { date: 'Out 2012', opponent: 'Justin Lawrence', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Jan 2013', opponent: 'Leonard Garcia', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Abr 2013', opponent: 'Dennis Bermudez', result: 'L', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Ago 2013', opponent: 'Conor McGregor', result: 'L', method: 'UD', opponent_rank: '#15 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Antes da explosao de McGregor.' },
          { date: 'Jan 2014', opponent: 'Will Chope', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: '' },
          { date: 'Mar 2014', opponent: 'Andre Fili', result: 'W', method: 'Sub R2', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Jun 2014', opponent: 'Clay Collard', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: '' },
          { date: 'Nov 2014', opponent: 'Akira Corassani', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Abr 2015', opponent: 'Cole Miller', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Ago 2015', opponent: 'Charles Oliveira', result: 'W', method: 'TKO R1', opponent_rank: '#9 FW', quality_score: 3, quality_label: 'Bom', note: 'A primeira luta. 99 segundos. Lesao misteriosa.' },
          { date: 'Abr 2016', opponent: 'Cub Swanson', result: 'W', method: 'UD', opponent_rank: '#4 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Jul 2016', opponent: 'Ricardo Lamas', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Dez 2016', opponent: 'Anthony Pettis', result: 'W', method: 'TKO R3', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Titulo interino' },
          { date: 'Jun 2017', opponent: 'Jose Aldo', result: 'W', method: 'TKO R3', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Conquistou o titulo peso-pena!' },
          { date: 'Dez 2017', opponent: 'Jose Aldo', result: 'W', method: 'UD', opponent_rank: '#1 FW', quality_score: 5, quality_label: 'Excelente', note: 'Defesa dominante contra a lenda.' },
          { date: 'Dez 2018', opponent: 'Brian Ortega', result: 'W', method: 'TKO R4', opponent_rank: '#1 FW', quality_score: 5, quality_label: 'Excelente', note: 'Masterclass. 290 golpes significativos.' },
          { date: 'Jul 2019', opponent: 'Frankie Edgar', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Abr 2019', opponent: 'Dustin Poirier', result: 'L', method: 'UD', opponent_rank: '#3 LW', quality_score: 5, quality_label: 'Excelente', note: 'Primeira tentativa nos peso leve.' },
          { date: 'Abr 2020', opponent: 'Alexander Volkanovski', result: 'L', method: 'UD', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu o titulo.' },
          { date: 'Jul 2020', opponent: 'Alexander Volkanovski', result: 'L', method: 'SD', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Split controversa.' },
          { date: 'Jan 2021', opponent: 'Calvin Kattar', result: 'W', method: 'UD', opponent_rank: '#6 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Recorde historico: 445 golpes significativos!' },
          { date: 'Nov 2021', opponent: 'Yair Rodriguez', result: 'W', method: 'UD', opponent_rank: '#3 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Jul 2022', opponent: 'Alexander Volkanovski', result: 'L', method: 'UD', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Trilogia contra Volkanovski.' },
          { date: 'Abr 2023', opponent: 'Arnold Allen', result: 'W', method: 'UD', opponent_rank: '#6 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Dominio completo.' },
          { date: 'Ago 2023', opponent: 'Chan Sung Jung', result: 'W', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Korean Zombie se aposentou.' },
          { date: 'Abr 2024', opponent: 'Justin Gaethje', result: 'W', method: 'KO R5', opponent_rank: '#3 LW', quality_score: 5, quality_label: 'Excelente', note: 'Nocaute do ano. BMF conquistado.' },
          { date: 'Out 2024', opponent: 'Ilia Topuria', result: 'L', method: 'KO R3', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Primeiro knockdown da carreira.' },
          { date: 'Jul 2025', opponent: 'Dustin Poirier', result: 'W', method: 'UD', opponent_rank: '#5 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Trilogia. Poirier se aposentou.' },
        ],
        layoff_warning: '8 meses sem lutar (lesao na mao direita apos UFC 318)',
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note:
          'Holloway venceu 4 das ultimas 5 lutas, com a unica derrota sendo para o campeao invicto Topuria. Nocauteou Gaethje, dominou Poirier, e esta em uma das melhores fases da carreira nos peso leve. Historicamente, Holloway volta ainda melhor apos pausas: depois da derrota para Poirier em 2019, emplacou 4 vitorias seguidas incluindo o recorde de 445 golpes.',
      },
      fighter2: {
        nome: 'Charles Oliveira',
        color: 'blue',
        recent_fights: [
          {
            date: 'Jun 2023',
            opponent: 'Beneil Dariush',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: '#6 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Nocaute devastador com head kick seguido de socos. Finish em 4:10 do primeiro round.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Arman Tsarukyan',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: '#1 LW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Split controversa. Muitos especialistas viram vitoria do Oliveira.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Michael Chandler',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#9 LW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Controlou a luta inteira mas nao conseguiu finalizar. Vitoria segura.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Ilia Topuria',
            result: 'L',
            method: 'KO R1',
            opponent_rank: 'Campeao',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Nocauteado em 2:27 do primeiro round. A pior derrota da carreira.',
          },
          {
            date: 'Out 2025',
            opponent: 'Mateusz Gamrot',
            result: 'W',
            method: 'Sub R2',
            opponent_rank: '#7 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Performance of the Night. Rear-naked choke aos 2:48. Voltou dominante no Rio.',
          },
        ],
        full_fight_history: [
          { date: 'Ago 2010', opponent: 'Darren Meza', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC.' },
          { date: 'Jan 2011', opponent: 'Efrain Escudero', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Jun 2011', opponent: 'Nik Lentz', result: 'L', method: 'UD', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Nov 2011', opponent: 'Jonathan Brookins', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Fev 2012', opponent: 'Eric Wisely', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: '' },
          { date: 'Jun 2012', opponent: 'Cub Swanson', result: 'L', method: 'KO R2', opponent_rank: '#7 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'KO brutal.' },
          { date: 'Nov 2012', opponent: 'Frankie Edgar', result: 'L', method: 'UD', opponent_rank: '#2 FW', quality_score: 5, quality_label: 'Excelente', note: '' },
          { date: 'Ago 2013', opponent: 'Andy Ogle', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: '' },
          { date: 'Mai 2014', opponent: 'Hatsu Hioki', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Out 2014', opponent: 'Nik Lentz', result: 'W', method: 'Sub R1', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Revanche dominante.' },
          { date: 'Ago 2015', opponent: 'Max Holloway', result: 'L', method: 'TKO R1', opponent_rank: '#7 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Lesao no pescoco. Quase paralisado.' },
          { date: 'Dez 2015', opponent: 'Myles Jury', result: 'W', method: 'Sub R1', opponent_rank: '#13 LW', quality_score: 3, quality_label: 'Bom', note: 'Volta aos peso leve.' },
          { date: 'Mar 2017', opponent: 'Will Brooks', result: 'W', method: 'Sub R1', opponent_rank: '#14 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Dez 2017', opponent: 'Paul Felder', result: 'L', method: 'UD', opponent_rank: '#9 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Fev 2018', opponent: 'Clay Guida', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Dez 2018', opponent: 'Christos Giagos', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: '' },
          { date: 'Fev 2019', opponent: 'David Teymur', result: 'W', method: 'Sub R1', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Jun 2019', opponent: 'Nik Lentz', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Nov 2019', opponent: 'Jared Gordon', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Mar 2020', opponent: 'Kevin Lee', result: 'W', method: 'Sub R3', opponent_rank: '#8 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Inicio da sequencia historica.' },
          { date: 'Dez 2020', opponent: 'Tony Ferguson', result: 'W', method: 'UD', opponent_rank: '#3 LW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Mai 2021', opponent: 'Michael Chandler', result: 'W', method: 'TKO R2', opponent_rank: '#4 LW', quality_score: 5, quality_label: 'Excelente', note: 'Conquistou o titulo dos peso leve!' },
          { date: 'Dez 2021', opponent: 'Dustin Poirier', result: 'W', method: 'Sub R3', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Defesa do titulo com finalizacao classica.' },
          { date: 'Mai 2022', opponent: 'Justin Gaethje', result: 'W', method: 'Sub R1', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo na balanca mas venceu a luta.' },
          { date: 'Out 2022', opponent: 'Islam Makhachev', result: 'L', method: 'Sub R2', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo. Arm triangle choke.' },
          { date: 'Jun 2023', opponent: 'Beneil Dariush', result: 'W', method: 'TKO R1', opponent_rank: '#6 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Voltou com nocaute brutal.' },
          { date: 'Abr 2024', opponent: 'Arman Tsarukyan', result: 'L', method: 'SD', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Split controversa.' },
          { date: 'Nov 2024', opponent: 'Michael Chandler', result: 'W', method: 'UD', opponent_rank: '#9 LW', quality_score: 3, quality_label: 'Bom', note: 'Controlou a luta inteira.' },
          { date: 'Jun 2025', opponent: 'Ilia Topuria', result: 'L', method: 'KO R1', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Nocauteado em 2:27.' },
          { date: 'Out 2025', opponent: 'Mateusz Gamrot', result: 'W', method: 'Sub R2', opponent_rank: '#7 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Performance of the Night.' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note:
          'Oliveira alternou vitorias e derrotas nas ultimas 6 lutas, mas com um detalhe crucial: as derrotas foram para o #1 do mundo (Tsarukyan, por split) e para o campeao invicto (Topuria). E o padrao classico do Do Bronx se repete. Apos perder para Islam, finalizou Dariush em 4 minutos. Apos perder para Topuria, voltou com um Performance of the Night contra Gamrot. A resiliencia e o DNA desse lutador.',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Holloway',
        media_oponentes: 4.0,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '2W-1L',
      },
      fighter2: {
        nome: 'Oliveira',
        media_oponentes: 4.2,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '1W-2L',
      },
      oponentes_em_comum_count: { fighter1: 3, fighter2: 3 },
      oponentes_em_comum_note:
        'Holloway e Oliveira compartilham tres oponentes recentes de alto calibre: Dustin Poirier, Justin Gaethje e Ilia Topuria. Holloway venceu Gaethje por KO e Poirier por decisao, enquanto Oliveira finalizou Gaethje e Poirier. Ambos perderam para Topuria por nocaute. O confronto direto contra esses tres nomes mostra que Holloway tem a vantagem em pe (KO sobre Gaethje) enquanto Oliveira domina no chao (finalizou ambos).',
    },

    // -------------------------------------------------
    // 5. OPONENTE EM COMUM (Dustin Poirier)
    // -------------------------------------------------
    oponente_comum: {
      oponente_nome: 'Dustin Poirier',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '49-46, 49-46, 48-47',
        duracao: '5 rounds (25:00)',
        contexto: 'Holloway venceu a trilogia contra seu maior rival historico. Controlou a luta com volume alto de golpes, usando jab e combinacoes longas para manter Poirier na distancia. Nos rounds finais, Holloway acelerou enquanto Poirier desacelerou, demonstrando o cardio superior que e sua marca registrada.',
        performance: 'Vitoria solida mas sem finish. Holloway mostrou que evoluiu como lutador de peso leve, usando mais wrestling defensivo e controle de distancia do que nas lutas anteriores contra Poirier. A lesao na mao direita no quarto round pode ter custado um finish.',
        evento: 'UFC 318',
        data: 'Jul 2025',
      },
      fighter2_result: {
        resultado: 'Vitoria por Finalizacao (Rear-Naked Choke)',
        metodo: 'Sub R3 (4:12)',
        duracao: '2 rounds completos + 4:12',
        contexto: 'Oliveira defendeu o cinturao dos peso leve contra o #1 Poirier. Perdeu os dois primeiros rounds no striking, mas no terceiro usou o clinch para derrubar Poirier e rapidamente transicionou para as costas. Um rear-naked choke perfeito forçou o tap.',
        performance: 'A luta mostrou a essencia do Do Bronx: aceita apanhar em pe para encontrar a abertura no grappling. Poirier estava vencendo a luta ate o momento em que foi para o chao. A capacidade de Oliveira de virar lutas que esta perdendo e o que o torna tao perigoso.',
        evento: 'UFC 269',
        data: 'Dez 2021',
      },
      insight: 'A comparacao revela a diferenca fundamental entre os dois lutadores. Holloway venceu Poirier pelo volume e cardio, mantendo a luta em pe por 25 minutos. Oliveira venceu levando a luta para o chao e finalizando no terceiro round. Para Holloway ganhar, precisa manter a luta em pe. Para Oliveira ganhar, precisa levar para o chao. A luta contra Poirier funciona como um espelho perfeito do que cada um precisa fazer nesse confronto.',
    },

    // -------------------------------------------------
    // 6. COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 7.17,
          valueB: 3.54,
          maxVal: 8,
          format: 'decimal',
          note: 'Holloway acerta mais que o dobro de golpes significativos por minuto. E o maior volume da historia do UFC.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 47,
          valueB: 53,
          maxVal: 100,
          format: 'percent',
          note: 'Oliveira e mais preciso apesar do volume menor. Holloway compensa com quantidade absurda.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.75,
          valueB: 3.19,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Holloway absorve mais golpes, mas isso reflete seu estilo de pressao constante e luta longa.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 59,
          valueB: 51,
          maxVal: 100,
          format: 'percent',
          note: 'Holloway tem defesa de strikes superior apesar de estar sempre na linha de fogo.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.27,
          valueB: 2.32,
          maxVal: 5,
          format: 'decimal',
          note: 'Oliveira tenta quase 9x mais takedowns. A luta no chao e o territorio dele.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 53,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 84,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Holloway defende 84% dos takedowns. Esse e o numero mais importante da luta inteira.',
        },
        {
          label: 'Submissoes por 15 Min',
          valueA: 0.33,
          valueB: 2.6,
          maxVal: 3,
          format: 'decimal',
          note: 'Oliveira tenta quase 8x mais finalizacoes. O maior finalizador da historia do UFC.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '34 anos',
          fighter2: '36 anos',
          note: 'Holloway e 2 anos mais novo.',
        },
        {
          label: 'Altura',
          fighter1: '1.80m (5\'11")',
          fighter2: '1.78m (5\'10")',
          note: null,
        },
        {
          label: 'Envergadura',
          fighter1: '175cm (69")',
          fighter2: '188cm (74")',
          note: 'Oliveira tem 13cm (5 polegadas) de vantagem na envergadura. Enorme.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: null,
        },
        {
          label: 'Academia',
          fighter1: 'Gracie Technics / Legacy Muay Thai',
          fighter2: 'Chute Boxe Diego Lima',
          note: null,
        },
      ],
    },

    // -------------------------------------------------
    // 7. PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        {
          label: 'Volume de Striking',
          valueA: 97,
          valueB: 55,
          labelA: 'Excelente',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Holloway acerta 7.17 golpes significativos por minuto, mais que o dobro de Oliveira. Detem o recorde de todos os tempos do UFC com 3.650+ golpes significativos na carreira.',
        },
        {
          label: 'Grappling Ofensivo',
          valueA: 30,
          valueB: 95,
          labelA: 'Ruim',
          labelB: 'Excelente',
          advantage: 'fighter2',
          advantage_note: 'Oliveira tem 21 finalizacoes na carreira, recorde absoluto do UFC. Tenta 2.6 submissoes a cada 15 minutos. Seu jogo no chao e historicamente dominante.',
        },
        {
          label: 'Cardio e Resistencia',
          valueA: 95,
          valueB: 65,
          labelA: 'Excelente',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Holloway e um dos maiores cardio machines da historia. Acelerou no R5 contra Gaethje e Poirier. Oliveira pode desacelerar nos rounds tardios se nao finalizar.',
        },
        {
          label: 'Defesa de Takedown',
          valueA: 85,
          valueB: 50,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Holloway defende 84% dos takedowns segundo UFCStats. Esse numero e crucial: se Oliveira nao conseguir derrubar, fica em desvantagem nos pes.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 45,
          valueB: 92,
          labelA: 'Medio',
          labelB: 'Excelente',
          advantage: 'fighter2',
          advantage_note: 'Oliveira consegue finalizar de qualquer posicao. Tem KOs, submissions e vitorias por decisao. Se a luta vai para o chao, nenhuma posicao e segura contra o Do Bronx.',
        },
        {
          label: 'QI de Luta e Adaptacao',
          valueA: 88,
          valueB: 80,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter1',
          advantage_note: 'Ambos sao altamente inteligentes. Holloway ajusta o gameplan round a round. Oliveira tem a capacidade unica de virar lutas que esta perdendo. Leve vantagem para Holloway pela consistencia.',
        },
      ],
      insight: 'Esse confronto e o classico striker vs grappler em sua forma mais pura. Holloway domina absolutamente tudo que envolve striking, volume e cardio. Oliveira domina absolutamente tudo que envolve chao, finalizacoes e grappling. Quem impuser seu jogo vence. A defesa de takedown de 84% do Holloway contra as 2.32 tentativas de takedown por 15 minutos do Oliveira e O numero que define essa luta.',
    },

    // -------------------------------------------------
    // 8. DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Holloway',
        ko_tko: { count: 12, percent: 44 },
        submission: { count: 2, percent: 7 },
        decision: { count: 13, percent: 48 },
        total_wins: 27,
      },
      fighter2: {
        nome: 'Oliveira',
        ko_tko: { count: 10, percent: 28 },
        submission: { count: 22, percent: 61 },
        decision: { count: 4, percent: 11 },
        total_wins: 36,
      },
      insight: 'A diferenca nos metodos de vitoria conta a historia completa. Holloway tem distribuicao equilibrada entre KOs (44%) e decisoes (48%), mostrando que ele pode finalizar mas tambem dominar 5 rounds. Oliveira e um monstro de finalizacoes: 61% das vitorias por submission, recorde absoluto do UFC. Apenas 11% das vitorias de Oliveira vao para os juizes, o que significa que quando ele esta vencendo, ele finaliza. A questao e: se Holloway sobreviver os primeiros rounds e levar para as decisoes, esta no territorio dele. Se Oliveira conseguir levar pro chao, a historia muda completamente.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM: OLIVEIRA',
          color: 'green',
          title: 'A Emboscada do Do Bronx',
          description: 'O primeiro round e o territorio mais perigoso para Holloway. Oliveira tem 10 finalizacoes e KOs no primeiro round ao longo da carreira. Charles costuma sair agressivo tentando levar a luta para o chao cedo. Se conseguir o takedown nos primeiros 2 minutos, a ameaca de submissao e real e imediata. Holloway precisa sobreviver a investida inicial e estabelecer seu jab sem ser derrubado.',
        },
        {
          rounds: 'R2-R3',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Zona de Transicao',
          description: 'Aqui a luta se define. Se Oliveira nao conseguiu o takedown no R1, ele vai intensificar as tentativas. Mas o volume de Holloway comeca a acumular dano. E o periodo onde Oliveira precisa tomar riscos maiores para mudar a dinamica, o que pode abrir brechas para contra-ataques do Holloway. Se chegarmos ao R3 com a luta em pe, o momentum muda.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM: HOLLOWAY',
          color: 'red',
          title: 'O Championship Rounds do Blessed',
          description: 'Os rounds de campeonato sao o reino de Holloway. Max acelerou no R5 contra Gaethje (nocaute), contra Kattar (dominou), contra Allen (acelerou). Oliveira historicamente desacelera nas lutas longas e nunca venceu uma luta por decisao unanime em 5 rounds nos peso leve. Se a luta ainda esta em pe no R4, Holloway tem vantagem enorme pelo cardio e pela pressao acumulada.',
        },
      ],
    },

    // -------------------------------------------------
    // 10. INTANGIVEIS
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'AlertTriangle',
          title: 'Lesao na Mao Direita',
          fighter: 'Holloway',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Holloway lesionou a mao direita durante a luta contra Poirier no UFC 318. Ficou 8 meses parado para recuperacao. A mao direita e responsavel por varios de seus nocautes, incluindo o finish sobre Gaethje. Se a mao nao estiver 100%, pode afetar o poder de nocaute e a disposicao para trocar socos pesados.',
        },
        {
          icon: 'Target',
          title: 'O Queixo Sob Suspeita',
          fighter: 'Oliveira',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Oliveira foi nocauteado por Topuria no UFC 317 em apenas 2:27. Somado ao KO sofrido de Cub Swanson em 2012 e outros momentos de vulnerabilidade, a resistencia de queixo do Do Bronx e uma preocupacao real. Holloway acerta 7.17 golpes por minuto. Se o queixo de Oliveira nao aguentar o volume, pode ser noite curta.',
        },
        {
          icon: 'Clock',
          title: 'Layoff de 8 Meses',
          fighter: 'Holloway',
          risk_level: 'RISCO BAIXO',
          risk_color: 'green',
          description: 'Holloway esta parado desde julho de 2025. Porem, o historico mostra que Max volta melhor apos pausas. Depois de perder para Poirier em 2019, voltou e emplacou 4 vitorias seguidas incluindo o recorde contra Kattar. A pausa pode ter sido positiva para o corpo de 34 anos.',
        },
        {
          icon: 'TrendingUp',
          title: 'Padrao de Resiliencia',
          fighter: 'Oliveira',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Oliveira tem um padrao notavel: SEMPRE volta forte apos derrotas. Apos perder para Makhachev, nocauteou Dariush em 4 minutos. Apos perder para Topuria, finalizou Gamrot com Performance of the Night. Esse padrao historico sugere que o Do Bronx esta motivado e perigoso vindo da derrota.',
        },
        {
          icon: 'MapPin',
          title: 'Las Vegas, Territorio Neutro',
          fighter: 'Holloway',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'T-Mobile Arena em Las Vegas. Territorio neutro, mas Holloway tem historico forte em Vegas com 5 vitorias, incluindo o nocaute sobre Gaethje no UFC 300 na mesma arena. A torcida americana tende a apoiar Holloway, mas Oliveira sempre traz uma energia especial em lutas grandes.',
        },
        {
          icon: 'Shield',
          title: 'Defesa Anti-Submission',
          fighter: 'Holloway',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Holloway nao foi finalizado desde 2012, quando Poirier o pegou na sua estreia no UFC. Sao 14 anos sem ser finalizado. Nenhum lutador no UFC atual tem essa marca. Contra Oliveira, que busca finalizacoes obsessivamente, essa estatistica e talvez o fator mais importante da luta inteira.',
        },
        {
          icon: 'Brain',
          title: 'Fator Psicologico da Revanche',
          fighter: 'Oliveira',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Para Oliveira, essa luta carrega um peso emocional unico. A primeira luta quase encerrou sua carreira com uma lesao misteriosa no pescoco. Vingar essa noite pode ser uma motivacao extra, mas tambem pode gerar pressao desnecessaria. Se o lado emocional prevalecer sobre a estrategia, Oliveira pode tomar decisoes precipitadas.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Holloway',
        total_probability: 57,
        scenarios: [
          {
            name: 'Morte por Mil Cortes',
            probability: 28,
            method: 'Decisao Unanime',
            description: 'Holloway mantem a luta em pe por 25 minutos, usando jab, combinacoes e footwork para frustrar as tentativas de takedown de Oliveira. O volume de 7+ golpes por minuto acumula dano progressivo. Nos rounds finais, o cardio superior faz a diferenca. Oliveira desacelera, Holloway acelera. Os juizes nao tem duvida.',
          },
          {
            name: 'O Nocaute Tardio',
            probability: 17,
            method: 'TKO R4-R5',
            description: 'Holloway domina os primeiros rounds com volume, e quando o ritmo de Oliveira cai nos championship rounds, Max encontra a abertura para um finish. O padrao e classico: contra Gaethje, o nocaute veio no R5 apos dominio. O queixo de Oliveira, ja questionavel, nao aguenta a pressao acumulada.',
          },
          {
            name: 'Blitz no Primeiro Round',
            probability: 12,
            method: 'KO/TKO R1-R2',
            description: 'Holloway surpreende com agressividade inicial, conecta um golpe limpo no queixo de Oliveira, e Charles nao consegue se recuperar. Cenario menos provavel pois Holloway raramente busca o nocaute cedo, mas o queixo fragil de Oliveira torna isso uma possibilidade real.',
          },
        ],
      },
      fighter2: {
        nome: 'Oliveira',
        total_probability: 40,
        scenarios: [
          {
            name: 'A Finalizacao Lendaria',
            probability: 20,
            method: 'Sub R1-R3',
            description: 'Oliveira consegue o takedown, transiciona para as costas ou monta, e aplica uma das suas finalizacoes assinatura. Um rear-naked choke, guilhotina ou arm-triangle. Contra Holloway, que nao foi finalizado desde 2012, isso seria historico. Oliveira precisa de um momento de genialidade no grappling para criar a abertura.',
          },
          {
            name: 'O Nocaute Surpresa',
            probability: 12,
            method: 'KO R1-R2',
            description: 'Oliveira conecta um golpe certeiro no inicio da luta, como fez contra Dariush. A envergadura de 188cm (5 polegadas a mais que Holloway) permite ataques de distancia inesperados. Um overhand, um head kick, ou um uppercut no clinch. Se conectar limpo, Oliveira tem poder para finalizar.',
          },
          {
            name: 'Dominio no Clinch',
            probability: 8,
            method: 'Decisao ou TKO tardio',
            description: 'Oliveira usa o clinch para neutralizar o volume de Holloway, trabalha joelhadas e cotovelos, e consegue takedowns a partir do corpo a corpo. Cenario mais raro pois Oliveira raramente vence por decisao, mas se conseguir controlar o clinch, pode acumular pontos suficientes.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // 12. PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Max Holloway',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Holloway vence essa luta mantendo-a em pe, o que sua defesa de takedown de 84% sugere que ele conseguira. O volume absurdo de 7.17 golpes por minuto vai acumular dano progressivo em Oliveira, cujo queixo ja mostrou fragilidade contra Topuria. Os championship rounds sao o territorio do Holloway. Charles precisa de um momento de genialidade no grappling para mudar o curso, e ele tem capacidade para isso, por isso a confianca nao e ALTA. Mas se a luta permanecer em pe por 3+ rounds, Holloway domina.',
      x_factor: {
        title: 'A Envergadura de Oliveira',
        description: 'Oliveira tem 13cm a mais de envergadura que Holloway (188cm vs 175cm). Essa e a maior desvantagem de alcance que Holloway enfrentou na carreira. Se Oliveira usar a envergadura para aplicar jabs longos e ameacas de chutes, pode frustrar a entrada de Holloway e criar angulos para takedowns. Esse e o fator que pode mudar completamente a previsao.',
      },
      upset_alert: {
        title: 'Upset Alert: Oliveira por Finalizacao',
        description: 'Se Oliveira conseguir um takedown limpo nos primeiros 2 rounds e transicionar para as costas, o recorde de 14 anos sem ser finalizado do Holloway pode acabar. Oliveira tem 21 finalizacoes na carreira e ja submeteu lutadores com defesa de takedown melhor. Um momento de descuido e tudo que Charles precisa.',
      },
      probabilities: {
        fighter1: { nome: 'Holloway', percent: 57 },
        fighter2: { nome: 'Oliveira', percent: 40 },
        draw: 3,
      },
      value_picks: {
        moneyline: {
          pick: 'Holloway (-230)',
          reasoning: 'Favorito com preco justo. A defesa de takedown de 84% e o volume de striking dao vantagem clara em pe. Porem, o preco e um pouco salgado para moneyline puro.',
        },
        method: {
          pick: 'Holloway por Decisao (+200)',
          reasoning: 'Cinco das sete ultimas vitorias de Holloway vieram por decisao. Contra um lutador perigoso no chao como Oliveira, Max pode optar por nao arriscar e dominar nos pontos. O preco de +200 oferece valor real.',
        },
        over_under: {
          pick: 'Over 3.5 Rounds',
          rounds: 3.5,
          reasoning: 'Holloway leva lutas para a distancia naturalmente. Oliveira tem poder de finish, mas a defesa de takedown de 84% do Holloway sugere que Charles tera dificuldade para impor seu jogo cedo. A luta provavelmente vai alem do terceiro round.',
        },
        best_value: 'Melhor aposta de valor: Holloway por Decisao a +200. Cinco das ultimas sete vitorias dele foram por decisao, e contra um grapppler perigoso como Oliveira, ir para os juizes e o caminho mais seguro.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'A Defesa de Takedown do Holloway nos Primeiros 3 Minutos',
          icon: 'Shield',
          description: 'Se Holloway defender os primeiros takedowns de Oliveira, a confianca de Charles pode cair drasticamente. Oliveira tende a recuar quando seu plano A falha nos primeiros minutos. Fique de olho nos primeiros sprawls e na capacidade de Holloway de voltar para os pes rapidamente apos tentativas de clinch.',
        },
        {
          num: 2,
          title: 'O Jab do Holloway e o Controle de Distancia',
          icon: 'Target',
          description: 'Holloway precisa manter distancia media para usar seu volume. Se Oliveira conseguir encurtar a distancia e forçar o clinch, a luta muda. Observe como Holloway usa o jab para manter Oliveira longe e se ele consegue circular para fora quando Charles avanca.',
        },
        {
          num: 3,
          title: 'O Cardio de Oliveira Pos-Round 3',
          icon: 'Activity',
          description: 'Oliveira nunca venceu uma luta de 5 rounds por decisao unanime nos peso leve. Se a luta chegar ao R4 sem finalizacao, preste atencao no ritmo de Charles. Se ele comecar a recuar e diminuir as tentativas de takedown, e sinal de que o tanque esta esvaziando.',
        },
        {
          num: 4,
          title: 'A Mao Direita do Holloway',
          icon: 'AlertTriangle',
          description: 'Holloway lesionou a mao direita contra Poirier. Se ele evitar trocar com a direita nos primeiros rounds ou parecer favorecendo o lado esquerdo, pode ser sinal de que a lesao nao sarou completamente. Se a mao estiver 100%, espere o Holloway de sempre. Se nao, o volume pode cair.',
        },
        {
          num: 5,
          title: 'As Transicoes do Oliveira no Chao',
          icon: 'Flame',
          description: 'Se Oliveira conseguir o takedown, observe a velocidade das transicoes. Charles e letal quando consegue montar ou pegar as costas. Se ele ficar preso na guarda de Holloway sem conseguir avançar posicao, a luta vai voltar para os pes e o round e do Max. A velocidade das transicoes define se o takedown realmente importa.',
        },
      ],
    },

    // -------------------------------------------------
    // 14. CREATOR KIT
    // -------------------------------------------------
    creator_kit: {
      headlines: [
        'HOLLOWAY VS OLIVEIRA 2: 11 anos separam 99 segundos de 25 minutos',
        'O HOMEM QUE QUASE PARALISOU OLIVEIRA QUER FAZE-LO DE NOVO',
        'BMF vs RECORDISTA: O confronto mais aguardado de 2026',
        '84% de defesa de takedown vs 21 finalizacoes. Quem vence?',
        'A VINGANCA DE UMA DECADA: Oliveira busca redencao contra Holloway',
        'STRIKER vs GRAPPLER: A versao mais pura desse confronto na historia do UFC',
      ],
      instagram: [
        {
          slide_number: 1,
          title: 'UFC 326: HOLLOWAY VS OLIVEIRA 2',
          content: 'TITULO BMF EM JOGO\n\n7 de Marco, 2026\nT-Mobile Arena, Las Vegas\n\n11 anos depois, a revanche\nque ninguem esperava.',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'MAX HOLLOWAY',
          content: '27-8-0 | #4 Peso Leve | Campeao BMF\n\n7.17 golpes significativos por minuto\n3.650+ golpes na carreira (RECORDE UFC)\n84% defesa de takedown\n4W nas ultimas 5 lutas\n\nNocauteou Gaethje. Dominou Poirier.\nAgora quer provar que e elite nos peso leve.',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'CHARLES OLIVEIRA',
          content: '36-11-0 | #3 Peso Leve | Ex-Campeao\n\n21 finalizacoes (RECORDE UFC)\n21 bonus (RECORDE UFC)\n24 vitorias no UFC (RECORDE)\n\nSempre volta forte apos derrotas.\nFinalzou Gamrot com POTN na ultima luta.\n\nQuer vingar os 99 segundos de 2015.',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'O NUMERO QUE DEFINE A LUTA',
          content: '84% vs 2.32\n\nDefesa de takedown do Holloway\nvs\nTakedowns por 15min do Oliveira\n\nSe Holloway manter em pe: domina.\nSe Oliveira levar pro chao: finaliza.\n\nSimples assim.',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'HOLLOWAY vence por Decisao Unanime\n\nConfianca: MEDIA-ALTA (7/10)\n\nO volume de strikes vai acumular\ndano em Oliveira. O cardio de Max\nfaz a diferenca nos rounds finais.\n\nMas cuidado: Oliveira so precisa\nde UM momento no chao.',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/6',
          text: 'THREAD: Holloway vs Oliveira 2. A analise completa do main event do UFC 326.\n\nEm 2015, Holloway venceu em 99 segundos. Oliveira quase ficou paralisado.\n\n11 anos depois, ambos se tornaram lendas. Agora se reencontram pelo titulo BMF.',
        },
        {
          num: '2/6',
          text: 'HOLLOWAY nos numeros:\n\n7.17 golpes sig/min (RECORDE UFC)\n3.650+ golpes na carreira (RECORDE)\n84% defesa de takedown\n4W-1L nas ultimas 5\n\nUnica derrota: Topuria (campeao invicto)\n\nO maior striker da historia do UFC. Ponto.',
        },
        {
          num: '3/6',
          text: 'OLIVEIRA nos numeros:\n\n21 finalizacoes (RECORDE UFC)\n21 bonus (RECORDE UFC)\n2.6 submissions/15min\n3W-2L nas ultimas 5\n\nDerrotas: Tsarukyan (split) e Topuria (KO)\n\nSEMPRE volta forte apos derrotas. Performance of the Night na ultima.',
        },
        {
          num: '4/6',
          text: 'A CHAVE DA LUTA:\n\nHolloway defende 84% dos takedowns.\nOliveira tenta 2.32 TDs por 15min.\n\nSe fica em pe: Holloway domina com volume.\nSe vai pro chao: Oliveira e letal.\n\nHolloway nao e finalizado desde 2012.\nOliveira tem 21 subs na carreira.\n\nAlgo tem que ceder.',
        },
        {
          num: '5/6',
          text: 'MINHA PREVISAO:\n\nHolloway por Decisao Unanime. Confianca 7/10.\n\nO volume acumula dano. O cardio faz diferenca nos R4-R5. A defesa de takedown frustra Oliveira.\n\nMAS: se Oliveira conseguir o TD cedo e transicionar, tudo muda. Esse e o X-factor.',
        },
        {
          num: '6/6',
          text: 'APOSTA DE VALOR:\n\nHolloway por Decisao a +200. 5 das ultimas 7 vitorias dele foram nos pontos.\n\nOver 3.5 rounds tambem tem valor. A defesa de takedown do Holloway sugere que nao acaba cedo.\n\nNao aposte em Oliveira por sub se ele nao conseguir derrubar.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Em 2015, uma luta durou 99 segundos e quase paralisou Charles Oliveira. 11 anos depois, ele e Max Holloway se reencontram no UFC 326. Titulo BMF em jogo. E vai ser MUITO diferente."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"De um lado, Holloway. 7 golpes por minuto, recorde absoluto do UFC, 84% de defesa de takedown. Do outro, Oliveira. 21 finalizacoes, maior finalizador da historia, e um cara que SEMPRE volta forte apos derrotas. Finalzou Gamrot na ultima com Performance of the Night."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"A conta e simples: se a luta fica em pe, Holloway domina com volume. Se vai pro chao, Oliveira e perigoso demais. A defesa de takedown de 84% do Max e a chave. Mas Oliveira so precisa de UM momento. UM takedown que vire posicao. E foi assim que ele finalizou Poirier, Gaethje, Gamrot."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Duas red flags: Holloway lesionou a mao direita contra Poirier e ficou 8 meses parado. E Oliveira levou KO do Topuria no primeiro round. O queixo dele e uma preocupacao real contra 7 golpes por minuto."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Holloway por decisao. O volume acumula dano, o cardio faz diferenca nos rounds finais, e a defesa de takedown frustra Oliveira. Mas nao durmam no Do Bronx. Se conseguir o takedown, e historia. Comenta aqui: Holloway ou Oliveira? Seguee pra mais analises de UFC."',
        },
      ],
      tiktok: [
        {
          hook: 'O cara que QUASE PARALISOU o Oliveira vai lutar contra ele de novo!',
          body: 'Em 2015, Holloway venceu Oliveira em 99 segundos e Charles quase ficou paralisado com uma lesao no pescoco. 11 anos depois, os dois se tornaram lendas e agora se encontram de novo pelo titulo BMF no UFC 326. Holloway acerta 7 golpes por minuto, recorde absoluto. Oliveira tem 21 finalizacoes, tambem recorde. Se fica em pe, Holloway massacra. Se vai pro chao, Oliveira finaliza. A defesa de takedown de 84% do Max e a chave.',
          cta: 'Comenta: Holloway mantém em pe ou Oliveira leva pro chao? Siga pra ver a analise completa!',
        },
        {
          hook: 'Esse NUMERO define a luta mais esperada de 2026!',
          body: '84%. Esse e o percentual de defesa de takedown do Max Holloway. Charles Oliveira tenta 2.32 takedowns a cada 15 minutos e tem 21 finalizacoes na carreira. Se Oliveira nao conseguir derrubar, ele esta lutando o jogo do Holloway. E Holloway acerta 7 golpes significativos por minuto. SETE. E o maior volume da HISTORIA do UFC. O queixo do Oliveira ja mostrou fragilidade contra Topuria. Faca as contas.',
          cta: 'Qual e sua aposta? Decisao do Holloway ou finalizacao do Oliveira? Comenta!',
        },
        {
          hook: 'O Oliveira SEMPRE volta forte apos derrotas. Sempre.',
          body: 'Perdeu pra Makhachev? Nocauteou Dariush em 4 minutos. Perdeu pra Tsarukyan? Venceu Chandler por decisao. Perdeu pra Topuria por KO no primeiro round? Voltou e ganhou Performance of the Night contra Gamrot. Esse padrao e ASSUSTADOR. Charles Oliveira tem DNA de comeback. E agora, vindo de uma derrota, ele encara Holloway pelo BMF. Se a historia se repetir, Max tem motivos pra se preocupar.',
          cta: 'Voce acredita no padrao? Oliveira vai surpreender? Siga e comenta!',
        },
      ],
    },

    // -------------------------------------------------
    // 15. BETTING VALUE (set to null per protocol)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // 16. RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '-230',
        fighter2_odds: '+185',
        fighter1_name: 'Holloway',
        fighter2_name: 'Oliveira',
        source: 'Media de DraftKings (-220), FanDuel (-225) e BetMGM (-235) em marco 2026',
      },
      edges: [
        {
          icon: 'Flame',
          titulo: 'Volume de Strikes Historico',
          stat_headline: '7.17 GOLPES SIGNIFICATIVOS POR MINUTO, RECORDE ABSOLUTO DO UFC',
          contexto: 'Holloway acerta mais que o dobro de golpes significativos por minuto que Oliveira (7.17 vs 3.54). Detem o recorde da carreira com mais de 3.650 golpes significativos, mais de 1.000 a frente do segundo colocado. Esse volume nao e apenas impressionante, e historicamente sem precedentes.',
          implicacao_aposta: 'O volume favorece Over em total de strikes para Holloway e sugere que a luta vai ter muita acao em pe. Props de Over em golpes significativos para Holloway tendem a acertar com consistencia altissima.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Shield',
          titulo: 'Defesa de Takedown Elite',
          stat_headline: '84% DE DEFESA DE TAKEDOWN PARA HOLLOWAY',
          contexto: 'Holloway defende 84% dos takedowns segundo UFCStats. Oliveira tem 40% de precisao nos takedowns. A matematica sugere que Oliveira conseguira no maximo 1-2 takedowns por round, e Holloway tende a voltar para os pes rapidamente mesmo quando derrubado.',
          implicacao_aposta: 'Esse numero e o principal motivo para acreditar que a luta vai para os rounds tardios. Apostas em Over 3.5 rounds ganham forca com essa estatistica. Oliveira por finalizacao nos primeiros rounds e uma armadilha se voce considerar esse numero.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Target',
          titulo: 'Queixo de Oliveira Pos-Topuria',
          stat_headline: 'OLIVEIRA FOI NOCAUTEADO EM 2:27 NO UFC 317',
          contexto: 'Oliveira foi nocauteado por Topuria no primeiro round do UFC 317. Historicamente, Oliveira ja foi parado por strikes por Cub Swanson e mostrou momentos de vulnerabilidade no trocacao contra Chandler e Gaethje antes de finalizar. Contra um striker de volume como Holloway, a durabilidade e uma preocupacao real.',
          implicacao_aposta: 'Metodo de vitoria: Holloway por KO/TKO pode oferecer valor se as odds estiverem em +300 ou mais. O queixo de Oliveira combinado com o volume do Holloway cria uma abertura para finish em pe.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Clock',
          titulo: 'Holloway Domina Rounds Tardios',
          stat_headline: '5 DAS ULTIMAS 7 VITORIAS DE HOLLOWAY POR DECISAO',
          contexto: 'Holloway frequentemente leva lutas para decisao e domina nos rounds de campeonato. Contra Allen (UD), Poirier (UD), Kattar (UD com 445 golpes), Volkanovski (performances fortes nos R4-R5). Oliveira nunca venceu uma luta de 5 rounds por decisao unanime nos peso leve.',
          implicacao_aposta: 'Holloway por Decisao a +200 e talvez a melhor aposta de valor do card inteiro. O preco esta generoso para o metodo de vitoria mais provavel do favorito.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'TrendingUp',
          titulo: 'Padrao de Resiliencia do Oliveira',
          stat_headline: 'OLIVEIRA SEMPRE VENCE A LUTA SEGUINTE APOS UMA DERROTA',
          contexto: 'Oliveira tem um padrao historico notavel: apos perder para Makhachev, nocauteou Dariush. Apos perder para Tsarukyan, venceu Chandler. Apos perder para Topuria, finalizou Gamrot com POTN. Esse padrao sugere que a motivacao pos-derrota e real e mensuravel.',
          implicacao_aposta: 'Esse padrao favorece Oliveira moneyline como underdog. A +185, o preco reflete parcialmente essa resiliencia, mas se voce acredita no padrao historico, ha valor no underdog. Oliveira moneyline pode ser uma aposta inteligente em small stakes.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Crosshair',
          titulo: 'Envergadura Historica de Oliveira',
          stat_headline: '188CM DE ENVERGADURA VS 175CM DO HOLLOWAY (13CM DE DIFERENCA)',
          contexto: 'Oliveira tem a maior vantagem de envergadura que Holloway ja enfrentou na carreira. 5 polegadas a mais de alcance e significativo no peso leve. Oliveira pode usar jabs longos e ameacas de chutes para controlar a distancia e criar angulos para takedowns.',
          implicacao_aposta: 'Esse e o X-factor que pode afetar a confianca em props de distancia. Se Oliveira usar a envergadura para controlar, os numeros de striking do Holloway podem ser menores que o usual. Considere under em golpes significativos do Holloway se esse prop estiver disponivel.',
          edge_level: 'leve',
          fighter_side: 'fighter2',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Holloway por Decisao',
          odds: '+200',
          confianca: 'alta',
          edge_vs_mercado: '5 das 7 ultimas vitorias de Holloway foram por decisao. O preco de +200 esta subvalorizado para o metodo mais provavel do favorito.',
          raciocinio: 'Holloway naturalmente leva lutas para a distancia. Contra um grappler perigoso como Oliveira, ir para decisao e o caminho mais seguro. A defesa de takedown de 84% mantem a luta em pe, e o volume acumula pontos nos scorecards. Historicamente, Max sabe vencer lutas de 5 rounds.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Over 3.5 Rounds',
          odds: '-120 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'A defesa de takedown de 84% do Holloway e o fato de 5 das 7 ultimas vitorias irem a decisao fazem Over 3.5 muito provavel.',
          raciocinio: 'Holloway nao e um finalizador rapido. Oliveira pode ser, mas precisa conseguir o takedown primeiro, e a defesa de 84% sugere que isso nao vai acontecer nos primeiros rounds. A luta provavelmente vai alem do R3. O unico cenario de Under e Oliveira conectar um golpe certeiro ou conseguir um takedown limpo nos primeiros 2 rounds.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Oliveira ML (+185)',
          odds: '+185',
          confianca: 'baixa',
          edge_vs_mercado: 'O padrao historico de Oliveira apos derrotas e o maior diferencial de envergadura que Holloway ja enfrentou criam valor no underdog.',
          raciocinio: 'Aposta especulativa baseada no padrao de resiliencia do Oliveira e na combinacao unica de habilidades que ele traz (wrestling + submissions + envergadura). Se Oliveira conseguir impor o clinch e o grappling, tem ferramentas para vencer. O preco de +185 compensa o risco para quem quer apostar no underdog.',
        },
        {
          tipo: 'Duracao',
          pick: 'Luta vai para Decisao',
          odds: '+150 (estimado)',
          confianca: 'media',
          raciocinio: 'Combina com a analise de Over 3.5 rounds mas e mais especifico. Holloway frequentemente vai para decisao, e a defesa de takedown dificulta a finalizacao de Oliveira. Porem, Holloway tambem pode parar Oliveira nos rounds tardios se o queixo ceder, por isso a confianca e media e nao alta.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Oliveira por Finalizacao nos Primeiros 2 Rounds',
        descricao: 'A narrativa e sedutora: o maior finalizador da historia contra um striker. Mas os numeros contam outra historia. Holloway nao foi finalizado desde 2012 (14 anos). Sua defesa de takedown de 84% e elite. Oliveira precisa primeiro derrubar, depois transicionar, depois finalizar, tudo contra um lutador que historicamente volta para os pes rapidamente. Apostar em Oliveira por submission antes do R3 e ignorar 14 anos de evidencia estatistica. Se voce gosta de Oliveira, aposte no moneyline. Nao no metodo especifico.',
      },
      disclaimer: 'Analise estatistica para fins informativos e de entretenimento. Aposte com responsabilidade. Resultados passados nao garantem desempenho futuro.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
