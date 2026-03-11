import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const data: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'teste-holloway-oliveira',
  evento_id: null,
  slug: 'teste-holloway-oliveira',
  titulo: 'Holloway vs Oliveira 2: A Redencao de Um Round',
  subtitulo: '11 anos depois, dois lendarios se reencontram',
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
    predictedMethod: 'TKO Round 4',
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
    record: '34-10-0',
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
  // Full Analysis (14 sections)
  // ===========================
  full_analysis: {
    // -------------------------------------------------
    // 1. HERO SECTION
    // -------------------------------------------------
    hero: {
      evento_nome: 'UFC 326',
      evento_data: '7 de Marco, 2026',
      evento_local: 'T-Mobile Arena, Las Vegas',
      categoria_peso: 'Peso Leve',
      num_rounds: 5,
      titulo_em_jogo: 'Titulo BMF',
      tagline: 'A Redencao de Um Round',
      tagline_sub: '11 anos depois, dois lendarios se reencontram',
      fighter1: {
        nome_completo: 'Max "Blessed" Holloway',
        apelido: 'Blessed',
        sobrenome: 'Holloway',
        record: '27-8-0',
        ranking: '#4 LW',
        info_extra: 'Waianae, Hawaii | 34 anos',
        imagem_fullbody_url:
          'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-07/HOLLOWAY_MAX_L_BMF_BELT_07-19.png?itok=9vwP11K9',
      },
      fighter2: {
        nome_completo: 'Charles "Do Bronx" Oliveira',
        apelido: 'Do Bronx',
        sobrenome: 'Oliveira',
        record: '36-11-0',
        ranking: '#3 LW',
        info_extra: 'Guarulhos, SP, Brasil | 36 anos',
        imagem_fullbody_url:
          'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/OLIVEIRA_CHARLES_L_10-11.png?itok=-8FrNvYo',
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Saskatoon, 2015: 99 Segundos Que Definiram Tudo</h3>
        <p>Em 20 de junho de 2015, no SaskTel Centre em Saskatoon, Canada, um jovem Max Holloway de 23 anos enfrentou Charles Oliveira. O que deveria ser um teste para ambos durou <strong>apenas 99 segundos</strong>. Holloway aplicou um TKO devastador no primeiro round.</p>
        <p>Mas a historia por tras e mais profunda. Oliveira sofreu uma <strong>lesao no pescoco</strong> durante a luta que quase encerrou sua carreira. Em entrevistas posteriores, Charles revelou: <em>"Pensei que ia ficar paralisado. Nao sentia minhas pernas."</em> Ele ficou afastado por meses e carregou as consequencias por anos.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Evolucao: Dois Caminhos Lendarios</h3>
        <p><strong class="text-ufc-red">Holloway</strong> saiu daquela luta e construiu uma das maiores sequencias da historia do UFC. 13 vitorias consecutivas no peso-pena, destronou Jose Aldo duas vezes, conquistou o titulo BMF com um nocaute espetacular sobre Justin Gaethje no UFC 300, um dos momentos mais iconicos do esporte.</p>
        <p><strong class="text-blue-400">Oliveira</strong> transformou-se completamente. De lutador inconsistente com 3 derrotas em 4 lutas, reconstruiu-se para emplacar uma sequencia de <strong>11 vitorias consecutivas</strong>, conquistar o cinturao dos leves, e se tornar o recordista de mais finalizacoes e mais bonus da historia do UFC.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Onde Os Dois Se Encontram</h3>
        <p><strong class="text-ufc-red">Holloway</strong> vem de uma vitoria solida sobre Poirier nos leves, mas ficou 8 meses parado por lesao na mao direita. Quer provar que e elite de verdade no peso leve e nao apenas um visitante do peso-pena. Uma vitoria aqui consolida o titulo BMF e coloca ele na fila pelo cinturao dos leves.</p>
        <p><strong class="text-blue-400">Oliveira</strong> vem de um Performance of the Night contra Gamrot, mas carrega o peso do KO brutal que sofreu de Topuria. Uma vitoria sobre Holloway seria a prova definitiva de que Do Bronx ainda e um dos melhores do mundo. Uma derrota pode significar o inicio do fim para um lutador de 36 anos com muitos quilometros rodados.</p>
      `,
      stakes: [],
      prognostico: {
        fighter1_vence: {
          titulo: 'A Ascensao Final do Blessed',
          subtitulo: 'Primeira defesa do BMF e terceira vitoria seguida nos leves. A fila do cinturao fica impossivel de ignorar.',
          consequencias: [
            {
              tag: 'BMF',
              texto: 'Primeira defesa bem-sucedida do titulo BMF, consolidando o legado que comecou com o nocaute mais iconico da historia do UFC 300 sobre Gaethje. Ninguem vai questionar quem e o Bad Motherfucker.',
            },
            {
              tag: 'RANKING',
              texto: 'Sobe de #4 para top 2 dos leves. Com vitorias sobre Gaethje, Poirier e Oliveira, tres ex-campeoes derrotados nos leves. O argumento por uma disputa de titulo contra o vencedor de Topuria vs Gaethje fica irrecusavel.',
            },
            {
              tag: 'MONEY FIGHT',
              texto: 'McGregor fica elegivel em 20 de marco, 13 dias apos o UFC 326. Holloway ja disse publicamente que quer essa luta. Com o BMF no ombro e sequencia de vitorias, seria a luta mais lucrativa possivel antes de ir atras do cinturao.',
            },
            {
              tag: 'NARRATIVA',
              texto: 'Venceu Oliveira em 99 segundos como promessa em 2015, e vence novamente como lenda em 2026. A historia se completa: o menino de Waianae que ja e GOAT indiscutivel do peso-pena agora persegue a coroa dos leves.',
            },
          ],
          proxima_luta: 'Conor McGregor no International Fight Week (julho 2026) ou disputa pelo cinturao indisputado contra o vencedor de Topuria vs Gaethje',
        },
        fighter2_vence: {
          titulo: 'A Vinganca de 11 Anos',
          subtitulo: 'De quase ficar paralisado em 99 segundos a vencer Holloway e se tornar o primeiro brasileiro BMF da historia.',
          consequencias: [
            {
              tag: 'HISTORICO',
              texto: 'Primeiro brasileiro a conquistar o titulo BMF. Oliveira ja detém os recordes de mais finalizacoes (22) e mais bonus (21) da historia do UFC. O BMF seria a cereja do bolo de um curriculo sem igual.',
            },
            {
              tag: 'REDENCAO',
              texto: 'Prova que o KO brutal de Topuria no UFC 317 foi um acidente de percurso, nao o inicio do fim. Aos 36 anos, com 47 lutas no UFC, mostra que ainda e elite com uma vitoria sobre um dos melhores da historia.',
            },
            {
              tag: 'CINTURAO',
              texto: 'Oliveira ja declarou: "quem vencer aqui merece a disputa pelo cinturao." Como #3 dos leves com vitoria sobre o #4, a proxima parada e a disputa pelo titulo indisputado contra Topuria ou Gaethje. Chance real de ser bicampeao.',
            },
            {
              tag: 'O DETALHE',
              texto: 'Se vencer por submissao? O mundo do MMA explode. Seria a primeira finalizacao sobre Holloway desde 2012, quebrando uma invencibilidade de 14 anos. Uma guilhotina ou um arm-triangle do Do Bronx aqui entra pra historia.',
            },
          ],
          proxima_luta: 'Disputa pelo cinturao indisputado dos leves contra o vencedor de Topuria vs Gaethje (verao 2026)',
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
            method: 'UD',
            opponent_rank: '#6 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Dominio tecnico completo',
          },
          {
            date: 'Ago 2023',
            opponent: 'Korean Zombie',
            result: 'W',
            method: 'KO R3',
            opponent_rank: 'Lenda',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Finish limpo contra lenda em declinio',
          },
          {
            date: 'Abr 2024',
            opponent: 'Justin Gaethje',
            result: 'W',
            method: 'KO R5',
            opponent_rank: '#3 LW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'NOCAUTE DO ANO. Momento mais alto da carreira.',
          },
          {
            date: 'Out 2024',
            opponent: 'Ilia Topuria',
            result: 'L',
            method: 'KO R3',
            opponent_rank: 'Campeao',
            quality_score: 5,
            quality_label: 'Excelente',
            note: '1o knockdown da carreira. Derrota de alto nivel.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Dustin Poirier',
            result: 'W',
            method: 'UD',
            opponent_rank: '#5 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Vitoria solida mas sem finish. Lesionou a mao.',
          },
        ],
        full_fight_history: [
          { date: 'Fev 2012', opponent: 'Dustin Poirier', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Primeira luta no UFC' },
          { date: 'Jun 2012', opponent: 'Pat Schilling', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, note: 'Finish rapido' },
          { date: 'Out 2012', opponent: 'Justin Lawrence', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Jan 2013', opponent: 'Leonard Garcia', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Abr 2013', opponent: 'Dennis Bermudez', result: 'L', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Ago 2013', opponent: 'Conor McGregor', result: 'L', method: 'UD', opponent_rank: '#15 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Antes da ascensao do McGregor' },
          { date: 'Jan 2014', opponent: 'Will Chope', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, note: '' },
          { date: 'Mar 2014', opponent: 'Andre Fili', result: 'W', method: 'Sub R2', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Jun 2014', opponent: 'Clay Collard', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, note: '' },
          { date: 'Nov 2014', opponent: 'Akira Corassani', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Abr 2015', opponent: 'Cole Miller', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Jun 2015', opponent: 'Charles Oliveira', result: 'W', method: 'TKO R1', opponent_rank: '#9 FW', quality_score: 3, quality_label: 'Bom', note: 'A primeira luta. 99 segundos.' },
          { date: 'Abr 2016', opponent: 'Cub Swanson', result: 'W', method: 'UD', opponent_rank: '#4 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Vitoria sobre veterano top 5' },
          { date: 'Jul 2016', opponent: 'Ricardo Lamas', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Dez 2016', opponent: 'Anthony Pettis', result: 'W', method: 'TKO R3', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Interim title' },
          { date: 'Jun 2017', opponent: 'Jose Aldo', result: 'W', method: 'TKO R3', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Conquistou o titulo peso-pena' },
          { date: 'Dez 2017', opponent: 'Jose Aldo', result: 'W', method: 'UD', opponent_rank: '#1 FW', quality_score: 5, quality_label: 'Excelente', note: 'Defesa dominante' },
          { date: 'Abr 2018', opponent: 'Khabib Nurmagomedov', result: 'L', method: 'Cancelada', opponent_rank: 'Campeao LW', quality_score: 5, quality_label: 'Excelente', note: 'Luta cancelada por lesao' },
          { date: 'Dez 2018', opponent: 'Brian Ortega', result: 'W', method: 'TKO R4', opponent_rank: '#1 FW', quality_score: 5, quality_label: 'Excelente', note: 'Masterclass' },
          { date: 'Jul 2019', opponent: 'Frankie Edgar', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Out 2019', opponent: 'Dustin Poirier', result: 'L', method: 'UD', opponent_rank: '#3 LW', quality_score: 5, quality_label: 'Excelente', note: 'Primeira tentativa nos leves' },
          { date: 'Abr 2020', opponent: 'Alexander Volkanovski', result: 'L', method: 'UD', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu o titulo' },
          { date: 'Jul 2020', opponent: 'Alexander Volkanovski', result: 'L', method: 'SD', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Split controversa' },
          { date: 'Jan 2021', opponent: 'Calvin Kattar', result: 'W', method: 'UD', opponent_rank: '#6 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Recorde de strikes: 445' },
          { date: 'Nov 2021', opponent: 'Yair Rodriguez', result: 'W', method: 'UD', opponent_rank: '#3 FW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Jul 2022', opponent: 'Alexander Volkanovski', result: 'L', method: 'UD', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Trilogia' },
        ],
        layoff_warning: '8 MESES SEM LUTAR (lesao na mao direita)',
        momentum_score: 7.8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note:
          'Historicamente volta MELHOR apos pausas. Pos-Poirier 1: 13 vitorias seguidas.',
      },
      fighter2: {
        nome: 'Charles Oliveira',
        color: 'blue',
        recent_fights: [
          {
            date: 'Jun 2023',
            opponent: 'Beneil Dariush',
            result: 'W',
            method: 'KO R1',
            opponent_rank: '#6 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Nocaute brutal. Statement.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Arman Tsarukyan',
            result: 'L',
            method: 'SD',
            opponent_rank: '#1 LW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Split controversa. Muitos acharam que venceu.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Michael Chandler',
            result: 'W',
            method: 'UD',
            opponent_rank: '#9 LW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Controlou mas nao finalizou.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Ilia Topuria',
            result: 'L',
            method: 'KO R1',
            opponent_rank: 'Campeao',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Nocauteado em 2:27. Brutal.',
          },
          {
            date: 'Out 2025',
            opponent: 'Mateusz Gamrot',
            result: 'W',
            method: 'Sub R2',
            opponent_rank: '#7 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Performance of the Night. Voltou dominante.',
          },
        ],
        full_fight_history: [
          { date: 'Ago 2010', opponent: 'Darren Meza', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, note: 'Estreia no UFC' },
          { date: 'Jan 2011', opponent: 'Efrain Escudero', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Jun 2011', opponent: 'Nik Lentz', result: 'L', method: 'UD', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Nov 2011', opponent: 'Jonathan Brookins', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Fev 2012', opponent: 'Eric Wisely', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, note: '' },
          { date: 'Jun 2012', opponent: 'Cub Swanson', result: 'L', method: 'KO R2', opponent_rank: '#7 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'KO brutal' },
          { date: 'Nov 2012', opponent: 'Frankie Edgar', result: 'L', method: 'UD', opponent_rank: '#2 FW', quality_score: 5, quality_label: 'Excelente', note: '' },
          { date: 'Ago 2013', opponent: 'Andy Ogle', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, note: '' },
          { date: 'Mai 2014', opponent: 'Hatsu Hioki', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Out 2014', opponent: 'Nik Lentz', result: 'W', method: 'Sub R1', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Revanche dominante' },
          { date: 'Jun 2015', opponent: 'Max Holloway', result: 'L', method: 'TKO R1', opponent_rank: '#7 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Lesao no pescoco. 99 segundos.' },
          { date: 'Dez 2015', opponent: 'Myles Jury', result: 'W', method: 'Sub R1', opponent_rank: '#13 LW', quality_score: 3, quality_label: 'Bom', note: 'Volta aos leves' },
          { date: 'Mar 2017', opponent: 'Will Brooks', result: 'W', method: 'Sub R1', opponent_rank: '#14 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Dez 2017', opponent: 'Paul Felder', result: 'L', method: 'UD', opponent_rank: '#9 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Fev 2018', opponent: 'Clay Guida', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Dez 2018', opponent: 'Christos Giagos', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, note: '' },
          { date: 'Fev 2019', opponent: 'David Teymur', result: 'W', method: 'Sub R1', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bom', note: '' },
          { date: 'Jun 2019', opponent: 'Nik Lentz', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '3a vitoria sobre Lentz' },
          { date: 'Nov 2019', opponent: 'Jared Gordon', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '' },
          { date: 'Mar 2020', opponent: 'Kevin Lee', result: 'W', method: 'Sub R3', opponent_rank: '#8 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Inicio da sequencia historica' },
          { date: 'Dez 2020', opponent: 'Tony Ferguson', result: 'W', method: 'UD', opponent_rank: '#3 LW', quality_score: 4, quality_label: 'Muito Bom', note: '' },
          { date: 'Mai 2021', opponent: 'Michael Chandler', result: 'W', method: 'TKO R2', opponent_rank: '#4 LW', quality_score: 5, quality_label: 'Excelente', note: 'Conquistou o titulo!' },
          { date: 'Dez 2021', opponent: 'Dustin Poirier', result: 'W', method: 'Sub R3', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Defesa lendaria' },
          { date: 'Mai 2022', opponent: 'Justin Gaethje', result: 'W', method: 'Sub R1', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo na balanca mas venceu' },
          { date: 'Out 2022', opponent: 'Islam Makhachev', result: 'L', method: 'Sub R2', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo' },
        ],
        layoff_warning: null,
        momentum_score: 7.2,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note:
          'Padrao classico: cai e levanta. SEMPRE volta forte de derrotas.',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Holloway',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '2W-1L',
      },
      fighter2: {
        nome: 'Oliveira',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '0W-2L',
      },
      oponentes_em_comum_count: { fighter1: 7, fighter2: 3 },
      oponentes_em_comum_note: 'Holloway venceu 7 de 10 oponentes em comum, Oliveira 3 de 10. Mas a diferenca esta no COMO: Holloway venceu a maioria por decisao (volume e controle), enquanto Oliveira perdeu justamente contra fighters com alto volume de strikes, o padrao que Holloway explora.',
    },

    // -------------------------------------------------
    // 5. OPONENTE EM COMUM (Topuria Spotlight)
    // -------------------------------------------------
    oponente_comum: {
      oponente_nome: 'Ilia Topuria',
      fighter1_result: {
        resultado: 'Derrota',
        metodo: 'KO R3 (1:34)',
        duracao: '2 rounds completos + 1:34',
        contexto:
          'Competitivo ate o final. Primeiro knockdown em 34 lutas profissionais.',
        performance:
          'Conectou golpes significativos, pressionou Topuria, foi competitivo por rounds inteiros antes de ser finalizado.',
        evento: 'UFC 308',
        data: 'Out 2024',
      },
      fighter2_result: {
        resultado: 'Derrota',
        metodo: 'KO R1 (2:27)',
        duracao: '2 minutos e 27 segundos',
        contexto:
          'Cortado cedo, dominado desde o inicio, nunca ameacou.',
        performance:
          'Nao conseguiu implementar nenhum aspecto do gameplan. Overwhelmed pela pressao de Topuria.',
        evento: 'UFC 305',
        data: 'Jun 2025',
      },
      insight:
        'Holloway absorveu MUITO mais de Topuria antes de cair. Sugere queixo mais duravel e melhor gestao de pressao. Oliveira foi overwhelmed instantaneamente. Nao pela durabilidade do queixo, mas pela incapacidade de lidar com a pressao inicial.',
    },

    // -------------------------------------------------
    // 6. COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig Strikes/min',
          valueA: 7.17,
          valueB: 3.35,
          maxVal: 8,
          format: 'decimal',
          note: 'Holloway conecta 2.14x mais strikes por minuto. Diferenca MASSIVA.',
        },
        {
          label: 'Strike Accuracy',
          valueA: 47,
          valueB: 54,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Strikes Absorvidos/min',
          valueA: 4.75,
          valueB: 4.47,
          maxVal: 6,
          format: 'decimal',
          note: 'Ambos absorvem bastante. Holloway compensa com volume superior.',
          reverseWinner: true,
        },
        {
          label: 'Strike Defense',
          valueA: 59,
          valueB: 49,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'TD Average/15min',
          valueA: 0.55,
          valueB: 2.37,
          maxVal: 3,
          format: 'decimal',
        },
        {
          label: 'TD Accuracy',
          valueA: 38,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'TD Defense',
          valueA: 83,
          valueB: 56,
          maxVal: 100,
          format: 'percent',
          note: '83% TDD vs grappler que precisa de takedown para vencer. Metrica mais importante da luta.',
        },
        {
          label: 'Sub Average/15min',
          valueA: 0.3,
          valueB: 2.6,
          maxVal: 3,
          format: 'decimal',
        },
      ],
      tale_of_tape: [
        { label: 'Altura', fighter1: '5\'11" (180cm)', fighter2: '5\'10" (178cm)', note: null },
        { label: 'Alcance', fighter1: '69" (175cm)', fighter2: '74" (188cm)', note: 'Oliveira +5"' },
        { label: 'Idade', fighter1: '34 anos', fighter2: '36 anos', note: null },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Gym', fighter1: 'Gracie Technics', fighter2: 'Chute Boxe Diego Lima', note: null },
      ],
    },

    // -------------------------------------------------
    // 7. PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        { label: 'Striking', valueA: 95, valueB: 68, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Holloway conecta 7.17 strikes/min com 56% de precisao. Oliveira e mais explosivo mas menos consistente.' },
        { label: 'Volume', valueA: 97, valueB: 45, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Holloway produz 2.14x mais volume. Essa diferenca e devastadora em lutas de 5 rounds.' },
        { label: 'Grappling', valueA: 55, valueB: 92, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Oliveira tem 22 finalizacoes, recorde absoluto do UFC. Jiu-jitsu ofensivo de outro nivel.' },
        { label: 'Cardio', valueA: 90, valueB: 65, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Holloway ACELERA nos championship rounds. Oliveira historicamente cai apos o R3.' },
        { label: 'Defesa', valueA: 82, valueB: 58, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: '83% TDD e apenas 1 finalizacao sofrida em 35 lutas (Poirier, 2012, na estreia). Nao e finalizado ha mais de 14 anos.' },
        { label: 'Finalizacao', valueA: 72, valueB: 88, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: '89% das vitorias de Oliveira terminam antes da decisao. Quando ele entra, ele finaliza.' },
      ],
      fighter1_total: 491,
      fighter2_total: 416,
      insight: 'Holloway domina 4 das 6 categorias, mas as 2 que Oliveira domina (Grappling e Finishing) sao justamente as que podem encerrar a luta instantaneamente. A questao central: Holloway consegue manter a luta nas areas onde tem vantagem, ou Oliveira arrasta pra onde ele e letal?',
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
      insight:
        'Oliveira finaliza 89% das vitorias. Holloway vai pra decisao se nao nocautear. Se a luta ficar em pe por 5 rounds, Holloway vence por pontos. Se for ao chao, Oliveira finaliza.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 9,
          danger_label: 'VANTAGEM: OLIVEIRA',
          color: 'red',
          title: 'Territorio do Oliveira',
          description:
            'Oliveira e mais perigoso nos rounds iniciais. A maioria de suas submissoes veio no R1-R2. Se ele conseguir um takedown limpo aqui, o perigo de finalizacao e maximo. Holloway precisa sobreviver esse trecho mantendo a luta em pe a todo custo.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'ROUND DECISIVO',
          color: 'gold',
          title: 'O Round Pivo',
          description:
            'Round de transicao. Se Oliveira nao finalizou, comeca a cansar. Se Holloway sobreviveu, comeca a acelerar. Este round define quem controla o ritmo nos championship rounds. Historicamente, ambos tem momentos decisivos no R3.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 10,
          danger_label: 'VANTAGEM: HOLLOWAY',
          color: 'green',
          title: 'Territorio do Holloway',
          description:
            'Holloway AUMENTA o output nos championship rounds. Lembrem do KO sobre Gaethje no R5. Se a luta chegar aqui em pe, Holloway tem vantagem esmagadora. O cardio de Oliveira historicamente cai significativamente apos o R3.',
        },
      ],
    },

    // -------------------------------------------------
    // 10. INTANGIVEIS & RED FLAGS
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'AlertTriangle',
          title: 'Mao direita lesionada',
          fighter: 'Holloway',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description:
            'Lesao na mao direita contra Poirier. 8 meses de recuperacao. Pode limitar o poder ou mudar a estrategia.',
        },
        {
          icon: 'Clock',
          title: 'Layoff 8 meses',
          fighter: 'Holloway',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description:
            'Maior pausa recente. Porem, historicamente volta melhor apos layoffs longos.',
        },
        {
          icon: 'TrendingUp',
          title: 'Transicao de peso',
          fighter: 'Holloway',
          risk_level: 'RISCO BAIXO',
          risk_color: 'green',
          description:
            'Ja lutou nos leves varias vezes (Gaethje, Poirier 2x). Corpo adaptado.',
        },
        {
          icon: 'Zap',
          title: 'KO losses recentes',
          fighter: 'Oliveira',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description:
            'Nocauteado por Topuria em R1. Historico de ser dropped por Chandler, Poirier, Gaethje. Queixo questionavel.',
        },
        {
          icon: 'Brain',
          title: 'Recuperacao mental',
          fighter: 'Oliveira',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description:
            'Voltou com Performance of the Night contra Gamrot. Mentalmente resiliente como sempre.',
        },
        {
          icon: 'MapPin',
          title: 'Fator casa',
          fighter: 'Oliveira',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description:
            'Luta em Las Vegas, nao no Brasil. Sem vantagem de torcida. Holloway tambem nao luta em casa.',
        },
        {
          icon: 'Shield',
          title: 'Quase impossivel de finalizar',
          fighter: 'Holloway',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description:
            'Apenas 1 finalizacao sofrida em 35 lutas, na estreia contra Poirier em 2012. Ha mais de 14 anos ninguem consegue finalizar Holloway por submissao, incluindo grapplers de elite.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Holloway',
        total_probability: 80,
        scenarios: [
          {
            name: 'Morte por Mil Cortes',
            probability: 40,
            method: 'TKO R4-5 ou UD',
            description:
              'Volume absurdo destroi Oliveira. Acumula dano, pressiona nos championship rounds. Referee stoppage tardio ou decisao dominante.',
          },
          {
            name: 'O Repeat do Gaethje',
            probability: 20,
            method: 'KO/TKO R3-5',
            description:
              'Timing shot preciso quando Oliveira avanca. Replica o nocaute do UFC 300: paciencia seguida de explosao.',
          },
          {
            name: 'Volume Implacavel',
            probability: 15,
            method: 'UD Dominante',
            description:
              'Mantem a luta em pe por 5 rounds, vence todos ou quase todos. Sem finish, mas controle total.',
          },
          {
            name: 'O Counter do Blessed',
            probability: 5,
            method: 'KO R1-3',
            description:
              'Counter limpo quando Oliveira avanca para o clinch. Flash KO improvavel mas possivel.',
          },
        ],
      },
      fighter2: {
        nome: 'Oliveira',
        total_probability: 17,
        scenarios: [
          {
            name: 'Anaconda do Bronx',
            probability: 25,
            method: 'Sub R1-3',
            description:
              'Consegue takedown, transiciona para as costas ou meia-guarda, aplica finalizacao. Caminho mais provavel de vitoria.',
          },
          {
            name: 'Scramble Mortal',
            probability: 10,
            method: 'Sub em Transicao',
            description:
              'Submissao durante scramble ou transicao. Oliveira e letal nesses momentos caoticos: guilhotina, arm-triangle.',
          },
          {
            name: 'Flash KO',
            probability: 8,
            method: 'KO R1-2',
            description:
              'Pega Holloway com golpe de poder nos rounds iniciais. Improvavel dado o queixo do Holloway, mas Oliveira tem nocaute.',
          },
          {
            name: 'Pressao Total',
            probability: 5,
            method: 'Decisao',
            description:
              'Chain wrestling + clinch contro a grade. Acumula pontos por controle. Cenario muito improvavel contra o TDD de Holloway.',
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
      predicted_method: 'TKO tardio ou Decisao',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation:
        'Holloway vence pela combinacao de volume superior (2.14x mais strikes/min), TDD elite (83%), e dominancia nos championship rounds. Oliveira precisa finalizar cedo, mas contra alguem que so foi finalizado 1 vez em 35 lutas (na estreia, em 2012) e nao sofre submissao ha mais de 14 anos. O cenario mais provavel: Holloway sobrevive os rounds iniciais, acumula dano progressivo, e finaliza por TKO no R4 quando o cardio de Oliveira cede e o dano acumulado cobra seu preco. A mao direita lesionada e a unica variavel que reduz a confianca.',
      x_factor: {
        title: 'X-Factor',
        description:
          'A mao direita de Holloway. Se estiver 100%, e o Holloway do UFC 300. Se nao, pode depender mais do jab e volume com a esquerda.',
      },
      upset_alert: {
        title: 'Upset Alert',
        description:
          'Se Oliveira conseguir um takedown limpo nos primeiros 2 rounds. Com Holloway no chao, o jogo muda completamente.',
      },
      probabilities: {
        fighter1: { nome: 'Holloway', percent: 65 },
        fighter2: { nome: 'Oliveira', percent: 32 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Max Holloway', reasoning: 'Volume superior (7.17 vs 3.35 strikes/min) e dominancia historica nos championship rounds favorecem Holloway. A linha de -180 a -200 reflete bem a vantagem real.' },
        method: { pick: 'Vitoria por TKO/KO', reasoning: 'Holloway tem 44% de finish rate por KO e o queixo de Oliveira foi comprometido nas ultimas lutas (KO por Topuria, dropped por Chandler e Gaethje). O dano acumulado nos rounds tardios favorece um finish.' },
        over_under: { pick: 'Over', rounds: 2, reasoning: 'Holloway nao e finalizado ha mais de 14 anos e tem 83% de TDD. A probabilidade de Oliveira finalizar cedo e baixa. 73% das lutas do Holloway passam do R2.' },
        best_value: 'Over 2.5 rounds e a aposta mais segura. Holloway nao e finalizado cedo desde 2012 e seu TDD neutraliza a principal arma do Oliveira. Combine com Holloway ML para um parlay de valor.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'A Mao Direita do Holloway',
          icon: 'Target',
          description:
            'Observe se Holloway favorece a esquerda nos primeiros rounds. Se a direita nao aparecer com potencia, significa que a lesao ainda afeta. Se vier forte, e o Holloway do UFC 300 e Oliveira esta em perigo serio.',
        },
        {
          num: 2,
          title: 'O Primeiro Takedown Attempt',
          icon: 'ArrowRight',
          description:
            'Quando Oliveira tenta o primeiro takedown? Se for no R1 e Holloway defender, a confianca muda. Se Oliveira esperar demais, esta jogando o jogo do Holloway. O timing e a reacao ao primeiro attempt define a dinamica da luta inteira.',
        },
        {
          num: 3,
          title: 'Rounds 4 e 5',
          icon: 'Clock',
          description:
            'Se chegarmos ao R4, Holloway vence. O historico e claro: ele AUMENTA o output quando adversarios desaceleram. A questao e se Oliveira consegue finalizar antes. Se nao, a luta esta decidida.',
        },
        {
          num: 4,
          title: 'O Queixo do Oliveira',
          icon: 'AlertTriangle',
          description:
            "Oliveira foi dropped por Chandler, Poirier e Gaethje. KO'd por Topuria. Contra o volume do Holloway (7.17 strikes/min), o dano acumulado pode ser devastador. Observe a reacao dele ao primeiro golpe limpo. Vai dizer muito.",
        },
        {
          num: 5,
          title: 'O Fator Submission',
          icon: 'Shield',
          description:
            'Holloway so foi finalizado 1 vez em 35 lutas (Poirier, 2012, na estreia) e nao sofre submissao ha mais de 14 anos. Oliveira tem 22 finalizacoes, mais que qualquer outro na historia do UFC. Se Oliveira levar ao chao, vamos ver se consegue fazer o que ninguem faz desde 2012.',
        },
      ],
    },

    // -------------------------------------------------
    // 14. CREATOR KIT
    // -------------------------------------------------
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'HOLLOWAY vs OLIVEIRA 2',
          content:
            'UFC 326 | 7 de Marco | T-Mobile Arena\n\n11 anos depois, dois lendarios se reencontram.\n\nEm 2015, Holloway nocauteou Oliveira em 99 segundos.\n\nDesde entao, ambos se tornaram campeoes e lendas do esporte.\n\nAgora, pelo titulo BMF, a redencao esta em jogo.',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'NUMEROS QUE IMPORTAM',
          content:
            'Holloway: 7.17 strikes/min (2x mais que Oliveira)\n\nHolloway: 83% TDD (vs grappler que PRECISA de TD)\n\nOliveira: 22 subs (recorde UFC) vs Holloway: apenas 1 sub sofrida em 35 lutas (2012)\n\n14 anos sem ser finalizado.',
          color: 'blue',
        },
        {
          slide_number: 3,
          title: 'PREVISAO',
          content:
            'Max Holloway por TKO no Round 4.\n\nVolume destroi. Championship rounds decidem.\n\n65% Holloway | 32% Oliveira | 3% Draw\n\nConfianca: 7/10 (Media-Alta)\n\nX-Factor: A mao direita do Holloway.',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/6',
          text: 'HOLLOWAY vs OLIVEIRA 2: A analise completa.\n\n11 anos atras, Holloway nocauteou Oliveira em 99 segundos. Oliveira quase ficou paralisado.\n\nDesde entao, ambos se tornaram lendas.\n\nAgora, pelo titulo BMF no UFC 326.\n\nThread com TUDO que voce precisa saber:',
        },
        {
          num: '2/6',
          text: 'OS NUMEROS NAO MENTEM:\n\nHolloway conecta 7.17 sig strikes/min, 2.14x MAIS que Oliveira.\n\n83% de defesa de takedown vs um grappler que precisa de TD pra vencer.\n\nE o stat mais insano: apenas 1 sub sofrida em 35 lutas (Poirier, 2012). 14 anos sem ser finalizado.',
        },
        {
          num: '3/6',
          text: 'O TESTE TOPURIA:\n\nHolloway durou 2 rounds completos + 1:34. Competitivo. Primeiro knockdown em 34 lutas.\n\nOliveira durou 2:27. Dominado desde o primeiro segundo.\n\nIsso diz MUITO sobre a durabilidade e gestao de pressao de cada um.',
        },
        {
          num: '4/6',
          text: 'OS DANGER ZONES:\n\nR1-R2: VANTAGEM OLIVEIRA. Maioria das subs vem aqui.\nR3: ROUND DECISIVO. Quem controla aqui, controla a luta.\nR4-R5: VANTAGEM HOLLOWAY. Ele ACELERA nos championship rounds.\n\nSe chegar ao R4 em pe, acabou.',
        },
        {
          num: '5/6',
          text: 'RED FLAGS:\n\nHolloway: Mao direita lesionada + 8 meses parado. MAS historicamente volta MELHOR.\n\nOliveira: Queixo questionado (KO Topuria, dropped por Chandler, Poirier, Gaethje). Contra 7+ strikes/min do Holloway, e preocupante.',
        },
        {
          num: '6/6',
          text: 'PREVISAO FINAL:\n\nMax Holloway por TKO Round 4.\n\n65% Holloway | 32% Oliveira | 3% Draw\nConfianca: 7/10\n\nVolume destroi. Championship rounds decidem. A lenda do Blessed continua.\n\nX-Factor: A mao direita.\nUpset scenario: TD limpo no R1-2.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"11 anos atras, Holloway nocauteou Oliveira em 99 segundos. Oliveira quase ficou paralisado. Agora, no UFC 326, pelo titulo BMF, os dois lendarios se reencontram. Aqui esta TUDO que voce precisa saber."',
        },
        {
          time: '10-25s',
          title: 'Os Numeros',
          text: '"Holloway conecta 7 strikes por minuto, o DOBRO do Oliveira. Defende 83% dos takedowns contra um cara que PRECISA de takedown pra vencer. E o mais insano: apenas 1 sub sofrida em 35 lutas, la em 2012. 14 anos sem ser finalizado. Contra o cara com mais subs da historia do UFC."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"Rounds 1 e 2 sao territorio perigoso. E onde Oliveira finaliza. Se sobreviver? Rounds 4 e 5 sao do Holloway. Ele ACELERA quando todo mundo cansa. Lembrem do KO do Gaethje no round 5."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Mas atencao: Holloway vem de 8 meses parado com lesao na mao direita. E Oliveira? Nocauteado por Topuria, queixo questionado. Contra o volume do Holloway, e um risco serio."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Holloway por TKO no round 4. Volume destroi, championship rounds decidem. 65% Holloway, 32% Oliveira. Concorda? Comenta ai. E salva esse video pra assistir depois da luta."',
        },
      ],
      tiktok: [
        {
          hook: '99 segundos. Em 2015, Holloway DESTRUIU Oliveira tao rapido que quase encerrou a carreira dele. Agora, 11 anos depois...',
          body: 'Oliveira quase ficou paralisado naquela luta. Mas voltou, emplacou 11 vitorias seguidas, virou campeao. Holloway? 13 vitorias seguidas, titulo BMF, nocaute do ano. Agora os dois se reencontram no UFC 326. So que dessa vez, Oliveira quer vinganca.',
          cta: 'Quem vence? Comenta BLESSED ou DO BRONX. Segue pra mais analises antes do UFC 326.',
        },
        {
          hook: 'O stat mais INSANO do UFC 326: Holloway conecta 7 strikes por minuto. Oliveira? So 3. O DOBRO.',
          body: 'E piora pro Do Bronx. Holloway defende 83% dos takedowns, e so foi finalizado 1 vez em 35 lutas, la em 2012, na estreia. 14 anos sem ser finalizado. E ele vai enfrentar o cara com mais finalizacoes da HISTORIA do UFC. Algo tem que ceder.',
          cta: 'Salva esse video e volta depois da luta pra ver se acertamos. Segue pra a analise completa.',
        },
        {
          hook: 'Se a luta chegar ao round 4, JA ERA pro Oliveira. E eu vou te explicar por que.',
          body: 'Holloway ACELERA nos championship rounds. Lembra do nocaute no Gaethje no round 5? Ele e o unico cara que fica MAIS perigoso quando todo mundo cansa. Oliveira? O cardio dele cai apos o R3, historicamente. Se nao finalizar cedo, vira alvo.',
          cta: 'Concorda ou discorda? Comenta ai embaixo. Link da analise completa na bio.',
        },
      ],
      headlines: [
        '99 Segundos em 2015. 25 Minutos em 2026? Holloway vs Oliveira 2 Pode Definir Uma Era',
        'Holloway Conecta o DOBRO de Strikes. Oliveira Tem o DOBRO de Finalizacoes. Quem Impoe o Ritmo?',
        '14 Anos Sem Ser Finalizado: O Stat de Holloway Que Torna Essa Luta Fascinante',
        'O Round 3 Vai Decidir Tudo: Por Que Holloway vs Oliveira 2 Tem Um Ponto de Virada Claro',
        'Do Bronx Quer Vinganca. Blessed Quer a Coroa. UFC 326 Tem a Luta da Decada',
        'Teste Topuria: Por Que Holloway Durou 7x Mais Que Oliveira Contra o Campeao',
      ],
    },

    // -------------------------------------------------
    // BETTING VALUE (optional, null for this test page)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '-230',
        fighter2_odds: '+185',
        fighter1_name: 'Max Holloway',
        fighter2_name: 'Charles Oliveira',
        source: 'Media de DraftKings, FanDuel e BetMGM (marco 2026)',
      },
      edges: [
        {
          icon: 'Flame',
          titulo: 'Sequencia de Volume Historica',
          stat_headline: '75+ SIG STRIKES EM 17/17 LUTAS DESDE 2016',
          contexto: 'Max Holloway conectou 75 ou mais significant strikes em TODAS as suas 17 lutas desde junho de 2016. A media e de ~165 por luta. Nao importa o oponente, o estilo, ou a duracao: o volume e garantido. Contra Kattar foram 274. Contra Volkanovski 3, foram 220.',
          implicacao_aposta: 'Over em sig strikes de Holloway tem historico perfeito de 100% desde 2016. Qualquer prop de volume do Holloway merece atencao.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Target',
          titulo: 'Oliveira Absorve Volume Massivo',
          stat_headline: 'ABSORVEU 131 STRIKES vs POIRIER, 122 vs CHANDLER',
          contexto: 'Quando Oliveira enfrenta strikers de alto volume, ele absorve quantidades absurdas. Contra Poirier foram 131 sig strikes, contra Chandler 122. Holloway conecta 7.17 sig strikes/min, o dobro da media do UFC. A combinacao sugere que Holloway vai acumular um volume brutal.',
          implicacao_aposta: 'Props de total de strikes na luta tendem a ir pra cima. Se a luta durar 3+ rounds, espere numeros muito altos de strikes totais.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Clock',
          titulo: 'Discrepancia Modelo vs Mercado na Duracao',
          stat_headline: '72% PROBABILIDADE DE DECISAO vs 36% DO MERCADO',
          contexto: 'O modelo da CBS Sports projeta 72% de chance de ir a decisao. O mercado implica apenas 36%. Essa e uma discrepancia MASSIVA. "Goes to Distance YES" paga +178 em algumas casas. Considerando que Holloway so foi finalizado 1 vez em 14 anos e defende 83% dos takedowns, o mercado parece subestimar a durabilidade dele.',
          implicacao_aposta: 'Goes to Distance YES a +178 pode ser a melhor aposta de valor do card inteiro. O mercado superestima a chance de finalizacao do Oliveira contra um oponente com esse perfil defensivo.',
          edge_level: 'forte',
          fighter_side: 'neutral',
        },
        {
          icon: 'Zap',
          titulo: 'Over 3.5 Rounds a Odds Positivas',
          stat_headline: 'OVER 3.5 ROUNDS PAGANDO +108',
          contexto: 'Holloway nao e finalizado (1 sub em 35 lutas, 2012). Defende 83% dos TDs. 5 das ultimas 7 lutas dele foram a decisao. Over 2.5 ta -175 (caro), mas Over 3.5 a +108 oferece valor. Se a luta chegar ao R3, o historico mostra que Holloway controla dali pra frente.',
          implicacao_aposta: 'Over 3.5 rounds a +108 combina valor com probabilidade. Pagar -175 no Over 2.5 ja nao compensa, mas +108 no Over 3.5 sim.',
          edge_level: 'moderado',
          fighter_side: 'neutral',
        },
        {
          icon: 'Shield',
          titulo: 'Defesa Anti-Finalizacao',
          stat_headline: '14 ANOS SEM SER FINALIZADO (DESDE 2012)',
          contexto: 'A ultima (e unica) finalizacao sofrida por Holloway foi contra Dustin Poirier em fevereiro de 2012, na estreia do Max no UFC. Desde entao, 34 lutas sem ser finalizado. Contra o lutador com mais subs da historia do UFC (22), isso cria uma dinamica unica.',
          implicacao_aposta: 'Oliveira por Submission a +330 parece atrativo mas e uma armadilha contra ESSE oponente especifico. Nao confunda o historico geral de Oliveira com a probabilidade contra Holloway.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Activity',
          titulo: 'Queixo Questionado do Oliveira',
          stat_headline: 'DROPPED EM 4 DAS ULTIMAS 7 LUTAS',
          contexto: 'Oliveira foi derrubado (dropped) por Chandler, Poirier, Gaethje e nocauteado por Topuria. Contra um volume de 7+ strikes por minuto do Holloway nos championship rounds, a durabilidade do queixo e uma preocupacao real. Holloway nunca tinha sido dropped ate Topuria.',
          implicacao_aposta: 'Holloway por KO/TKO a +170 ganha valor quando se considera que Oliveira e vulneravel a volume acumulado, especialmente nos rounds finais.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
      ],
      value_picks: [
        {
          tipo: 'Over/Under',
          pick: 'Over 3.5 Rounds',
          odds: '+108',
          confianca: 'alta',
          raciocinio: 'Se Holloway sobrevive os 2 primeiros rounds (provavel dado seu TDD de 83% e anti-sub de 14 anos), ele controla o R3 em diante. Over 2.5 a -175 ja esta precificado, mas Over 3.5 a +108 oferece odds positivas com probabilidade favoravel.',
        },
        {
          tipo: 'Duracao',
          pick: 'Goes to Distance: YES',
          odds: '+178',
          confianca: 'media',
          edge_vs_mercado: 'Modelo CBS: 72% de decisao vs mercado implicando apenas 36%',
          raciocinio: 'Holloway nao e finalizado ha 14 anos, defende 83% dos TDs, e 5 das ultimas 7 lutas dele foram a decisao. O mercado superestima a capacidade do Oliveira de finalizar ESSE oponente especifico. +178 paga bem, mas decisao exige 5 rounds completos, cenario menos provavel que Over 3.5.',
        },
        {
          tipo: 'Metodo',
          pick: 'Holloway por KO/TKO',
          odds: '+170',
          confianca: 'media',
          edge_vs_mercado: 'Oliveira dropped em 4 das ultimas 7 lutas + Holloway 7.17 sig strikes/min',
          raciocinio: 'O volume acumulado do Holloway nos championship rounds contra um queixo que ja mostrou fragilidade cria um cenario real de TKO tardio. O nocaute do Gaethje no R5 e o exemplo perfeito do que pode acontecer.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Holloway ML',
          odds: '-230',
          confianca: 'alta',
          raciocinio: 'Holloway e favorito por razoes solidas: volume superior, anti-wrestling elite, durabilidade comprovada. -230 nao e "valor" em termos de odds, mas e a aposta correta para quem busca probabilidade. Melhor como perna de parlay do que aposta isolada.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Oliveira por Submission',
        descricao: 'Oliveira por Sub a +330 parece tentador por causa do historico (22 subs no UFC). Mas lembre: Holloway NAO foi finalizado em 34 lutas consecutivas (14 anos). Defende 83% dos takedowns. So 1 submission sofrida na carreira inteira (estreia, 2012). A probabilidade real contra ESSE oponente e significativamente menor do que +330 sugere. Nao caia na narrativa geral sem considerar o matchup especifico.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade. Odds podem variar entre casas e no momento da luta.',
    },
  },
};

export default function TesteHollowayOliveiraPage() {
  return <FullAnalysisView analise={data} />;
}
