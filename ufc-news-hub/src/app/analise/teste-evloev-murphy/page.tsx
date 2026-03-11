import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const data: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'teste-evloev-murphy',
  evento_id: null,
  slug: 'teste-evloev-murphy',
  titulo: 'Evloev vs Murphy: Dois Invictos, Uma Chance no Titulo',
  subtitulo: 'O eliminatorio que decide o proximo desafiante de Volkanovski',
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
    predictedMethod: 'Decision',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Movsar Evloev',
    record: '19-0-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Lerone Murphy',
    record: '17-0-1',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night 270',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres',
  categoria_peso: 'Peso Pena',
  num_rounds: 5,
  is_titulo: false,
  broadcast: 'Paramount+',
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 sections)
  // ===========================
  full_analysis: {
    // -------------------------------------------------
    // HERO SECTION
    // -------------------------------------------------
    hero: {
      evento_nome: 'UFC Fight Night 270',
      evento_data: '21 de Marco, 2026',
      evento_local: 'The O2 Arena, Londres, Inglaterra',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Dois Invictos. Uma Chance no Titulo.',
      tagline_sub: 'O eliminatorio mais importante do peso pena desde Max vs Volk',
      fighter1: {
        nome_completo: 'Movsar Evloev',
        apelido: '',
        sobrenome: 'Evloev',
        record: '19-0-0',
        ranking: '#1 Peso Pena',
        info_extra: 'Ingushetia, Russia | 32 anos',
        imagem_fullbody_url: 'https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/5/EVLOEV_MOVSAR_L_12-07.png?itok=MzjR9V9I',
      },
      fighter2: {
        nome_completo: 'Lerone Murphy',
        apelido: 'The Miracle',
        sobrenome: 'Murphy',
        record: '17-0-1',
        ranking: '#3 Peso Pena',
        info_extra: 'Manchester, Inglaterra | 34 anos',
        imagem_fullbody_url: 'https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2025-08/MURPHY_LERONE_L_08-16.png?itok=cu3I5bg9',
      },
    },

    // -------------------------------------------------
    // NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3>O Eliminatorio Que o Peso Pena Precisava</h3>
        <p>Dois lutadores invictos. 36 lutas profissionais sem derrota entre eles. E apenas um caminho ate Alexander Volkanovski e o cinturao do peso pena. UFC Fight Night 270, em Londres, coloca frente a frente os dois nomes que o UFC vem construindo como os proximos desafiantes: Movsar Evloev (#1) e Lerone Murphy (#3).</p>
        <p>A dinamica e fascinante: Evloev e o fantasma que ninguem consegue vencer, um wrestler greco-romano que sufoca adversarios com pressao implacavel e controle posicional. Murphy e o milagre ambulante, um striker que literalmente sobreviveu a dois tiros na cara aos 21 anos e construiu uma carreira invicta com nocautes devastadores e decisoes dominantes.</p>
        <p>O proprio Volkanovski ja declarou que quer o vencedor. A divisao inteira esta parada esperando essa luta acontecer. E acontece na casa do Murphy, no O2 Arena em Londres, o que adiciona uma camada extra de pressao e vantagem.</p>
        <p><strong>O problema do Evloev:</strong> ele esta parado ha 15 meses. Sua ultima luta foi em dezembro de 2024, contra Aljamain Sterling. Em 2025, uma doenca que atacou seu sistema cardiovascular o tirou de combate por mais de 3 meses. Ele mesmo admitiu que nao sabia se voltaria a lutar. Ring rust contra um cara que lutou duas vezes em 2025? E um risco real.</p>
        <p><strong>O problema do Murphy:</strong> defesa de takedown de 51%. Contra o cara com o 3o maior numero de takedowns da historia do peso pena (40 no UFC). Se Evloev conseguir levar a luta pro chao, Murphy nao tem as ferramentas para se levantar consistentemente.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#1 do peso pena, proximo desafiante natural', fighter2: '#3, precisa dessa vitoria pra pular a fila' },
        { dimensao: 'Invencibilidade', fighter1: '19-0, perfeito. Uma derrota aqui atrasa ANOS', fighter2: '17-0-1, nunca perdeu. Derrota em casa seria devastadora' },
        { dimensao: 'Title Shot', fighter1: 'Vitoria = luta pelo titulo garantida', fighter2: 'Vitoria em Londres = titulo + momento perfeito' },
        { dimensao: 'Legado', fighter1: 'Pode se tornar o 1o campeao do Caucaso no peso pena', fighter2: 'De sobrevivente de tiroteio a campeao do UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O FANTASMA INVENCIVEL',
          subtitulo: 'Evloev prova que o wrestling de elite ainda reina no peso pena',
          consequencias: [
            { tag: 'TITULO', texto: 'Evloev vs Volkanovski em meados de 2026, provavelmente no UFC 303 ou UFC International Fight Week. Seria a maior luta da carreira de Evloev e um teste completamente diferente de tudo que ele ja enfrentou.' },
            { tag: 'RANKING', texto: 'Murphy cai para #5-6 mas continua na conversa do titulo. Uma vitoria contra Diego Lopes ou Yair Rodriguez o recoloca no caminho.' },
            { tag: 'NARRATIVA', texto: 'A historia de "o cara que ninguem quer enfrentar" se consolida. 20-0 contra a elite do peso pena (Sterling, Allen, Lopes, Murphy) e um curriculo absurdo.' },
            { tag: 'PROXIMA LUTA', texto: 'Se vencer dominando com wrestling, coloca pressao imensa em Volkanovski pra mostrar que pode lidar com um grappler de elite.' },
          ],
          proxima_luta: 'Evloev vs Volkanovski pelo titulo do peso pena (UFC 303 ou International Fight Week 2026)',
        },
        fighter2_vence: {
          titulo: 'O MILAGRE DE LONDRES',
          subtitulo: 'Murphy nocauteia o invicto na propria casa e reescreve sua historia',
          consequencias: [
            { tag: 'TITULO', texto: 'Murphy vs Volkanovski no segundo semestre de 2026, possivelmente na Australia. A narrativa de "sobrevivente de tiroteio desafia o campeao" seria a maior historia do UFC no ano.' },
            { tag: 'RANKING', texto: 'Evloev cai para #3-4 mas com 19-1, uma vitoria o recoloca. Provavelmente enfrenta Arnold Allen ou Diego Lopes em seguida.' },
            { tag: 'LEGADO', texto: 'Murphy se torna o primeiro britanico a ganhar title shot no peso pena desde nenhum. Seria historico para o MMA do Reino Unido.' },
            { tag: 'MERCADO', texto: 'Uma vitoria com nocaute em Londres transformaria Murphy em uma das maiores estrelas do UFC na Europa. PPV sell-out garantido pra qualquer luta dele no UK.' },
          ],
          proxima_luta: 'Murphy vs Volkanovski pelo titulo do peso pena (possivelmente na Australia, Q3/Q4 2026)',
        },
      },
    },

    // -------------------------------------------------
    // MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Movsar Evloev',
        color: 'red',
        recent_fights: [
          {
            date: 'Dez 2024',
            opponent: 'Aljamain Sterling',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#5 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Dominou o ex-campeao com wrestling superior. 4 takedowns, 7:32 de controle. Provou que compete com a elite absoluta.',
          },
          {
            date: 'Jan 2024',
            opponent: 'Arnold Allen',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#7 FW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Vitoria solida mas menos dominante. Allen apresentou resistencia no wrestling e competiu na trocacao. Vitoria clara mas nao esmagadora.',
          },
          {
            date: 'Mai 2023',
            opponent: 'Diego Lopes',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#12 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Fight of the Night. Lopes e perigoso em pe e no chao, mas Evloev controlou o ritmo. A melhor performance em pe da carreira do Evloev no UFC.',
          },
          {
            date: 'Jun 2022',
            opponent: 'Dan Ige',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#10 FW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Dominio absoluto. 30-26 em um scorecard. Ige nao teve nenhum momento na luta. Demonstracao perfeita de wrestling e controle.',
          },
        ],
        full_fight_history: [
          { date: 'Dez 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, note: '' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'UD', opponent_rank: '#7 FW', quality_score: 3, note: '' },
          { date: 'Mai 2023', opponent: 'Diego Lopes', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 4, note: '' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#10 FW', quality_score: 5, note: '' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'UD', opponent_rank: 'NR', quality_score: 3, note: '' },
          { date: 'Jan 2021', opponent: 'Nik Lentz', result: 'W', method: 'SD', opponent_rank: 'NR', quality_score: 2, note: '' },
          { date: 'Jul 2020', opponent: 'Mike Grundy', result: 'W', method: 'UD', opponent_rank: 'NR', quality_score: 2, note: '' },
          { date: 'Out 2019', opponent: 'Enrique Barzola', result: 'W', method: 'UD', opponent_rank: 'NR', quality_score: 2, note: '' },
          { date: 'Abr 2019', opponent: 'SeungWoo Choi', result: 'W', method: 'UD', opponent_rank: 'NR', quality_score: 2, note: '' },
        ],
        layoff_warning: 'ALERTA: 15 meses parado. Doenca cardiovascular em 2025 o tirou por 3+ meses. Admitiu que nao sabia se voltaria a lutar.',
        momentum_score: 6,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'resilient',
        momentum_note: '9 vitorias seguidas no UFC sao impressionantes, mas o layoff de 15 meses e a doenca cardiovascular criam incerteza real sobre sua condicao fisica. Historicamente dominante, mas a inatividade e o maior ponto de interrogacao.',
      },
      fighter2: {
        nome: 'Lerone Murphy',
        color: 'blue',
        recent_fights: [
          {
            date: 'Ago 2025',
            opponent: 'Aaron Pico',
            result: 'W',
            method: 'KO (cotovelo giratório)',
            opponent_rank: '#8 FW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Nocaute do ano. Cotovelo giratório no primeiro round contra um dos prospectos mais perigosos do UFC. Finalizacao espetacular que elevou seu status.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Josh Emmett',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#9 FW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Main event de 5 rounds, controlou Emmett com striking inteligente. Nao foi espetacular mas mostrou maturidade e gas pra 25 minutos.',
          },
          {
            date: 'Out 2024',
            opponent: 'Dan Ige',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#11 FW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Luta mais apertada do que o esperado. Scorecards todos 29-28. Ige foi competitivo, mas Murphy ganhou os momentos chave.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Edson Barboza',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#12 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Main event de 5 rounds contra um dos strikers mais perigosos do UFC. Controlou a distancia e venceu de forma convincente. Barboza e sempre um teste perigoso.',
          },
        ],
        full_fight_history: [
          { date: 'Ago 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1', opponent_rank: '#8 FW', quality_score: 5, note: '' },
          { date: 'Abr 2025', opponent: 'Josh Emmett', result: 'W', method: 'UD', opponent_rank: '#9 FW', quality_score: 3, note: '' },
          { date: 'Out 2024', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#11 FW', quality_score: 3, note: '' },
          { date: 'Mai 2024', opponent: 'Edson Barboza', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 4, note: '' },
          { date: 'Jul 2023', opponent: 'Josh Culibao', result: 'W', method: 'UD', opponent_rank: 'NR', quality_score: 2, note: '' },
          { date: 'Mar 2023', opponent: 'Gabriel Santos', result: 'W', method: 'SD', opponent_rank: 'NR', quality_score: 2, note: '' },
          { date: 'Out 2021', opponent: 'Makwan Amirkhani', result: 'W', method: 'KO R2', opponent_rank: 'NR', quality_score: 3, note: '' },
          { date: 'Jan 2021', opponent: 'Douglas Silva de Andrade', result: 'W', method: 'UD', opponent_rank: 'NR', quality_score: 2, note: '' },
          { date: 'Jul 2020', opponent: 'Ricardo Ramos', result: 'W', method: 'KO R1', opponent_rank: 'NR', quality_score: 3, note: '' },
          { date: 'Set 2019', opponent: 'Zubaira Tukhugov', result: 'D', method: 'Split Draw', opponent_rank: 'NR', quality_score: 2, note: '' },
        ],
        layoff_warning: null,
        momentum_score: 9,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: '9 vitorias consecutivas desde o empate na estreia. Duas lutas em 2025, incluindo o nocaute do ano contra Pico. Ativo, confiante, e lutando em casa. Momentum perfeito.',
      },
    },

    // -------------------------------------------------
    // NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Evloev',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '9W-0L (100%)',
        contra_top5: '1W-0L',
      },
      fighter2: {
        nome: 'Murphy',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '9W-0L-1D (95%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Dan Ige e o unico oponente em comum. Evloev dominou (30-26 em um scorecard). Murphy venceu de forma mais apertada (todos 29-28). Essa comparacao sugere que Evloev tem um nivel de dominio maior, mas Murphy enfrentou Ige 2 anos depois.',
    },

    // -------------------------------------------------
    // OPONENTE EM COMUM
    // -------------------------------------------------
    oponente_comum: {
      oponente_nome: 'Dan Ige',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '30-26, 30-27, 30-27',
        duracao: '3 rounds (15:00)',
        contexto: 'Evloev dominou Ige em todos os aspectos. Superioridade no wrestling, controle de posicao e ground and pound. Ige nao teve nenhum round competitivo.',
        performance: 'Dominio absoluto. Um dos scorecards teve 30-26, indicando que um juiz viu um 10-8 round.',
        evento: 'UFC Fight Night: Volkov vs Rozenstruik',
        data: 'Junho 2022',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '29-28, 29-28, 29-28',
        duracao: '3 rounds (15:00)',
        contexto: 'Murphy venceu, mas de forma mais competitiva. Todos os scorecards foram 29-28, indicando que Ige ganhou pelo menos um round claro.',
        performance: 'Vitoria consistente mas sem dominio. Murphy controlou os momentos chave mas Ige foi competitivo durante toda a luta.',
        evento: 'UFC 308: Topuria vs Holloway',
        data: 'Outubro 2024',
      },
      insight: 'MMA math nao funciona, mas essa comparacao revela tendencias importantes. Evloev sufoca oponentes com wrestling e controle, resultando em scorecards mais unilaterais. Murphy vence com striking e inteligencia tatica, mas permite que oponentes sejam competitivos. Contra Dan Ige, a diferenca de dominio e clara: 30-26 vs 29-28. Isso sugere que quando o wrestling do Evloev funciona, ele e MUITO mais dominante do que Murphy em pe.',
    },

    // -------------------------------------------------
    // COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.99, valueB: 4.48, maxVal: 6, format: 'decimal', note: 'Murphy conecta mais em pe, Evloev complementa com ground and pound' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.66, valueB: 2.51, maxVal: 6, format: 'decimal', note: 'Numeros similares. Ambos sao defensivamente solidos', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 60, valueB: 61, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por Luta', valueA: 4.80, valueB: 1.41, maxVal: 6, format: 'decimal', note: '3.4x mais takedowns por luta. A diferenca mais gritante do matchup' },
        { label: 'Precisao de Takedown (%)', valueA: 49, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 59, valueB: 51, maxVal: 100, format: 'percent', note: 'A vulnerabilidade chave de Murphy: 51% TDD contra 4.8 TDs/luta' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '34 anos', note: null },
        { label: 'Altura', fighter1: '1.70m (5\'7")', fighter2: '1.75m (5\'9")', note: 'Murphy tem 2 polegadas de vantagem' },
        { label: 'Envergadura', fighter1: '184cm (72.5")', fighter2: '187cm (73.5")', note: 'Vantagem leve de Murphy' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'American Top Team', fighter2: 'Manchester Top Team', note: null },
        { label: 'Sequencia', fighter1: '19 vitorias (carreira inteira)', fighter2: '9 vitorias + 1 empate (nunca perdeu)', note: null },
      ],
    },

    // -------------------------------------------------
    // PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        {
          label: 'Wrestling',
          valueA: 95,
          valueB: 45,
          labelA: 'Excelente',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'A maior vantagem do matchup. Evloev tem base de greco-romana com titulo de Mestre do Esporte, 40 takedowns no UFC (3o maior da historia do FW). Murphy tem apenas faixa azul de BJJ e 51% de defesa de takedown.',
        },
        {
          label: 'Striking em Pe',
          valueA: 60,
          valueB: 85,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Murphy e mais preciso (53% vs 48%), mais variado (spinning back elbow, kicks, straight punches) e tem poder de nocaute real. Evloev melhora a cada luta na trocacao mas nao e um striker natural.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 30,
          valueB: 75,
          labelA: 'Ruim',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Evloev tem 0 finalizacoes em 9 lutas no UFC. ZERO. Murphy tem 3 nocautes no UFC incluindo o KO do ano contra Pico. A capacidade de encerrar a luta e exclusiva do Murphy nesse matchup.',
        },
        {
          label: 'Cardio / Gas',
          valueA: 90,
          valueB: 85,
          labelA: 'Excelente',
          labelB: 'Muito Bom',
          advantage: 'fighter1',
          advantage_note: 'Ambos tem cardio excelente pra 5 rounds. Evloev mantem pressao constante de wrestling sem desacelerar. Murphy venceu dois main events de 5 rounds. Vantagem leve pro Evloev pelo estilo mais desgastante, MAS o layoff de 15 meses e a doenca cardiovascular criam duvida.',
        },
        {
          label: 'Controle / Grappling',
          valueA: 92,
          valueB: 40,
          labelA: 'Excelente',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Evloev tem media de ~118 segundos de controle por round. Quando coloca no chao, mantem posicao com 86% de precisao no ground and pound. Murphy nao tem ferramentas pra se levantar de baixo contra esse nivel de controle.',
        },
        {
          label: 'Defesa / QI de Luta',
          valueA: 80,
          valueB: 80,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'even',
          advantage_note: 'Ambos sao inteligentes e maduros. Evloev nunca se coloca em posicoes de risco. Murphy le distancia muito bem e faz ajustes entre rounds. Empate tecnico aqui.',
        },
      ],
      insight: 'O matchup classico: wrestling elite vs striking elite. A luta sera decidida por ONDE ela acontece. No chao, Evloev domina. Em pe, Murphy domina. A questao central e simples: Murphy consegue manter a luta em pe por 25 minutos contra o melhor wrestler da divisao?',
    },

    // -------------------------------------------------
    // DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Evloev',
        ko_tko: { count: 3, percent: 16 },
        submission: { count: 4, percent: 21 },
        decision: { count: 12, percent: 63 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Murphy',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 0, percent: 0 },
        decision: { count: 9, percent: 53 },
        total_wins: 17,
      },
      insight: 'A diferenca mais reveladora: Murphy tem 47% de vitorias por nocaute e ZERO finalizacoes. Evloev tem 63% de decisoes e ZERO finalizacoes no UFC. Evloev ganha pontos, Murphy pode encerrar a luta. Se Murphy conectar limpo, ele tem poder pra acabar. Se Evloev controlar, ele acumula rounds. A pergunta e: qual estilo prevalece por 25 minutos?',
    },

    // -------------------------------------------------
    // DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Feeling Out Round',
          description: 'O round mais imprevisivel. Murphy pode surpreender com algo nao ortodoxo (spinning back elbow, como fez contra Pico). Evloev normalmente usa o R1 pra estabelecer o wrestling. Se Murphy nao defender o primeiro takedown, o tom da luta inteira muda.',
        },
        {
          rounds: 'R2-R3',
          danger_level: 8,
          danger_label: 'VANTAGEM EVLOEV',
          color: 'red',
          title: 'A Zona de Imposicao',
          description: 'Aqui Evloev aplica pressao maxima. Chain wrestling, cage grinding, controle posicional. Se Murphy chegar ao R4 em pe e com energia, ele esta no caminho certo. Se estiver preso contra a grade por 10 minutos, provavelmente ja perdeu 2 rounds.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 6,
          danger_label: 'VANTAGEM MURPHY',
          color: 'green',
          title: 'O Championship Test',
          description: 'Se a luta estiver apertada, os championship rounds decidem. Ambos tem gas, mas Evloev nunca enfrentou 25 minutos apos 15 meses parado com problemas cardiovasculares. Murphy venceu dois main events de 5 rounds em 2024-2025. Vantagem sutil pra Murphy nos rounds finais SE ele estiver competitivo.',
        },
      ],
    },

    // -------------------------------------------------
    // INTANGIVEIS
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'AlertTriangle',
          title: 'Ring Rust do Evloev (15 meses)',
          fighter: 'Evloev',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: '15 meses sem lutar, mais uma doenca cardiovascular que o tirou por 3+ meses em 2025. Evloev admitiu que nao sabia se voltaria. Ring rust contra um lutador ativo que lutou duas vezes em 2025 e um fator real que as odds podem nao capturar completamente.',
        },
        {
          icon: 'Zap',
          title: 'Fator Casa para Murphy',
          fighter: 'Murphy',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'O2 Arena, Londres. Murphy e de Manchester. A torcida sera esmagadoramente pro-Murphy. Historicamente, lutadores do UK performam acima da media em casa. A energia pode ser o diferencial nos rounds apertados.',
        },
        {
          icon: 'Shield',
          title: 'Mentalidade de Sobrevivente',
          fighter: 'Murphy',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Murphy levou dois tiros na cara aos 21 anos e voltou 3 meses depois pra treinar MMA. Tem uma bala alojada na lingua ate hoje. Quando o UFC fez um hype reel, ele disse "ja sobrevivi pior". Essa mentalidade nao aparece em nenhuma estatistica mas importa em momentos de adversidade.',
        },
        {
          icon: 'Activity',
          title: 'Cardio Pos-Doenca do Evloev',
          fighter: 'Evloev',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'A doenca que afetou o sistema cardiovascular do Evloev em 2025 e a maior incognita dessa luta. Ele disse que "cardio leve o deixava sem ar". Mesmo recuperado, 25 minutos de wrestling contra um oponente fresco em altitude zero (Londres) e um teste brutal pra um sistema cardiovascular que foi comprometido.',
        },
        {
          icon: 'Target',
          title: 'Zero Finalizacoes no UFC do Evloev',
          fighter: 'Evloev',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: '9 lutas, 9 decisoes. Evloev nunca finalizou ninguem no UFC. Isso significa que Murphy sempre tera 5 rounds inteiros pra trabalhar. Nao existe risco de nocaute ou finalizacao vindo do Evloev. A questao e se Murphy aguenta ser controlado por 25 minutos.',
        },
      ],
    },

    // -------------------------------------------------
    // CAMINHOS DE VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Evloev',
        total_probability: 62,
        scenarios: [
          {
            name: 'Decisao por Controle',
            probability: 50,
            method: 'Decisao Unanime',
            description: 'O cenario mais provavel. Evloev usa chain wrestling pra acumular tempo de controle, ganha 3 dos 5 rounds com takedowns e ground and pound. Murphy se levanta algumas vezes mas nao o suficiente pra vencer os rounds.',
          },
          {
            name: 'Dominacao Total',
            probability: 8,
            method: 'Decisao Unanime (49-46 ou melhor)',
            description: 'Evloev implementa o gameplan perfeito: takedowns em todos os rounds, controle esmagador, Murphy nao consegue se levantar. Similar ao que fez contra Dan Ige (30-26). Menos provavel porque Murphy e um nivel acima de Ige.',
          },
          {
            name: 'Finalizacao Tardia',
            probability: 4,
            method: 'Submission R4-R5',
            description: 'Cenario raro. Murphy, cansado de se defender de takedowns por 15+ minutos, comete um erro no chao e Evloev pega um rear-naked choke ou guillotine. Possivel mas improvavel dado que Evloev nao finalizou ninguem no UFC.',
          },
        ],
      },
      fighter2: {
        nome: 'Murphy',
        total_probability: 35,
        scenarios: [
          {
            name: 'Nocaute em Pe',
            probability: 15,
            method: 'KO/TKO R1-R3',
            description: 'Murphy conecta algo nao ortodoxo (spinning back elbow, overhand) que Evloev nao ve chegando. Mais provavel nos rounds iniciais quando Murphy esta fresco e Evloev ainda esta se adaptando apos 15 meses parado.',
          },
          {
            name: 'Decisao por Striking',
            probability: 15,
            method: 'Decisao Unanime ou Dividida',
            description: 'Murphy defende takedowns suficientes (precisa de 50%+ de TDD) e vence os rounds com striking superior. Os championship rounds em casa com a torcida podem ser o diferencial. Requer que o takedown defense funcione melhor do que o historico sugere.',
          },
          {
            name: 'TKO Tardio por Volume',
            probability: 5,
            method: 'TKO R4-R5',
            description: 'A doenca cardiovascular cobra seu preco. Evloev desacelera nos championship rounds, Murphy sente a fraqueza e acelera com combinacoes. O corner ou o arbitro para a luta. Depende inteiramente do estado fisico do Evloev.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Movsar Evloev',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Evloev e o lutador mais completo e tem a vantagem estilistica mais clara do matchup: wrestling de elite contra defesa de takedown de 51%. Historicamente, quando wrestlers de alto nivel enfrentam strikers com TDD vulneravel, o wrestling prevalece. Mas a confianca e apenas MEDIA por causa de fatores reais: 15 meses parado, doenca cardiovascular, Murphy lutando em casa, e o fato de que Murphy tem poder pra acabar a luta a qualquer momento.',
      x_factor: {
        title: 'O Cardio Pos-Doenca',
        description: 'Se o sistema cardiovascular do Evloev estiver 100%, ele vence por decisao confortavel. Se houver qualquer queda de ritmo nos rounds finais, Murphy tem a capacidade de capitalizar. Essa e a variavel que ninguem pode prever ate a luta acontecer.',
      },
      upset_alert: {
        title: 'Upset Alert: Murphy por KO',
        description: 'Murphy nunca perdeu. Tem nocautes espetaculares (Pico, Amirkhani). Luta em casa. E o underdog e e 2-0 como underdog no UFC. Se defender os takedowns no R1 e estabelecer a trocacao, Evloev entra em territorio desconhecido. A combinacao de ring rust + fator casa + poder de finalizacao faz de Murphy um underdog muito perigoso.',
      },
      probabilities: {
        fighter1: { nome: 'Evloev', percent: 62 },
        fighter2: { nome: 'Murphy', percent: 35 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Evloev ML (-270)', reasoning: 'Wrestling de elite contra TDD de 51%. A matematica favorece Evloev, mas -270 nao oferece valor proporcional ao risco do ring rust.' },
        method: { pick: 'Evloev por Decisao (-140 estimado)', reasoning: '9/9 lutas de Evloev no UFC foram a decisao. Este e o cenario mais provavel E paga melhor que o ML puro.' },
        over_under: { pick: 'Over 2.5 rounds', rounds: 2.5, reasoning: 'Evloev nao finaliza. 16 dos 19 lutas combinadas no UFC foram a distancia. Over e quase certeza.' },
        best_value: 'Evloev por Decisao e a melhor aposta valor-probabilidade. Murphy por KO/TKO a odds positivas e a melhor aposta de risco-recompensa.',
      },
    },

    // -------------------------------------------------
    // O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Primeiro Takedown',
          icon: 'Target',
          description: 'O momento mais importante da luta inteira. Se Evloev conseguir um takedown nos primeiros 2 minutos e controlar, Murphy fica em modo de recuperacao. Se Murphy defender e conectar um contragolpe limpo, Evloev vai reconsiderar a estrategia. Fique de olho na REACAO de cada um apos o primeiro takedown attempt.',
        },
        {
          num: 2,
          title: 'Respiracao do Evloev no R3',
          icon: 'Activity',
          description: 'A doenca cardiovascular e a incognita. Observe a respiracao do Evloev entre os rounds, especialmente antes do R3 e R4. Se ele estiver ofegante mais do que o normal, Murphy precisa acelerar imediatamente. O corner do Evloev vai monitorar isso de perto.',
        },
        {
          num: 3,
          title: 'Cage Work vs Scrambles',
          icon: 'Shield',
          description: 'Evloev quer a luta contra a grade. Murphy quer scrambles rapidos pra se levantar. Conte quantas vezes Murphy consegue se levantar apos ser pressionado contra a cage. Se a taxa for abaixo de 30%, Evloev esta dominando. Se for acima de 50%, Murphy esta no caminho certo.',
        },
        {
          num: 4,
          title: 'O Fator Torcida',
          icon: 'Zap',
          description: 'O2 Arena vai estar lotado de britanicos torcendo pro Murphy. Observe se a energia da torcida afeta os juizes em rounds apertados. Historicamente, lutadores do UK ganham decisoes divididas em casa com mais frequencia. Se a luta for pra decisao apertada, o fator casa pode ser determinante.',
        },
        {
          num: 5,
          title: 'Spinning Attacks do Murphy',
          icon: 'Flame',
          description: 'O cotovelo giratorio que nocauteou Pico nao foi acidente. Murphy treina tecnicas nao ortodoxas e as usa em momentos inesperados. Se Evloev entrar com a cabeça baixa pro takedown e Murphy girar... pode ser highlight reel. Fique atento a qualquer tecnica giratoria, especialmente quando Evloev avanca pra clinch.',
        },
      ],
    },

    // -------------------------------------------------
    // CREATOR KIT
    // -------------------------------------------------
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'O Duelo', content: '19-0 vs 17-0-1\nDois invictos. Uma chance no titulo.\nEvloev vs Murphy.\nUFC Fight Night 270, Londres.', color: 'red' },
        { slide_number: 2, title: 'O Wrestler', content: 'EVLOEV:\n4.8 takedowns por luta\n40 TDs no UFC (3o mais da historia do FW)\n9/9 lutas por decisao\nNinguem consegue vencer esse cara', color: 'red' },
        { slide_number: 3, title: 'O Striker', content: 'MURPHY:\n47% de vitorias por nocaute\nCotovelo giratorio que destruiu Pico\n9 vitorias seguidas\nSobreviveu a 2 tiros na cara. Nada o assusta.', color: 'blue' },
        { slide_number: 4, title: 'A Chave', content: 'TDD de Murphy: 51%\nTakedowns de Evloev: 4.8/luta\n\nSe Murphy nao defender...\nEvloev sufoca.\n\nSe Murphy defender...\nEvloev nao tem Plan B.', color: 'gold' },
        { slide_number: 5, title: 'Previsao', content: 'PREVISAO:\nEvloev por Decisao\n62% Evloev | 35% Murphy\n\nMAS: 15 meses parado + doenca cardiovascular + Murphy em casa = upset real\n\nSalva e volta depois da luta', color: 'gold' },
      ],
      twitter: [
        {
          num: '1/5',
          text: 'EVLOEV vs MURPHY: Thread com TUDO que voce precisa saber.\n\n19-0 vs 17-0-1. Dois invictos. Um title shot em jogo. O peso pena finalmente tem seu eliminatorio.\n\nUFC Fight Night 270, O2 Arena, Londres. 21 de marco.',
        },
        {
          num: '2/5',
          text: 'OS STATS:\n\nEvloev: 4.8 takedowns/luta, 3o mais da historia do FW, ~118s de controle por round\n\nMurphy: 4.48 sig strikes/min, 53% precisao, 3 KOs no UFC incluindo o nocaute do ano\n\nO classico wrestler vs striker.',
        },
        {
          num: '3/5',
          text: 'A VULNERABILIDADE:\n\nMurphy tem 51% de defesa de takedown. Contra um cara que aplica 4.8 TDs por luta.\n\nFaca a matematica. Se Evloev acertar metade, sao ~2.4 takedowns por round. Murphy nao tem as ferramentas pra lidar com isso.\n\nA NAO SER que ele conecte algo antes.',
        },
        {
          num: '4/5',
          text: 'O RED FLAG DO EVLOEV:\n\n15 meses sem lutar. Uma doenca que atacou o sistema cardiovascular em 2025. Ele admitiu: "nao sabia se voltaria a lutar".\n\n25 minutos de wrestling intenso apos tudo isso? Em Londres? E uma incognita REAL.',
        },
        {
          num: '5/5',
          text: 'PREVISAO: Evloev por Decisao (62/35)\n\nMas Murphy e o underdog mais perigoso do card. Nunca perdeu, nocauteia, luta em casa.\n\nMelhor aposta: Over 2.5 rounds (9/9 lutas de Evloev foram decisao).\n\nVolta depois da luta pra ver se acertei.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"19-0 contra 17-0-1. Dois lutadores que NUNCA perderam. E so um pode sair de Londres com a chance de lutar pelo titulo do peso pena. Aqui esta tudo que voce precisa saber sobre Evloev vs Murphy."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Evloev e o wrestler mais dominante do peso pena. 4.8 takedowns por luta, 40 no total, controle de quase 2 minutos por round. Murphy? O oposto. Striker puro. 47% das vitorias por nocaute, incluindo aquele cotovelo giratorio que DESTRUIU Aaron Pico. O classico grappler vs striker."',
        },
        {
          time: '25-40s',
          title: 'A Vulnerabilidade',
          text: '"Aqui e onde fica interessante. Murphy tem 51% de defesa de takedown. Contra o cara que mais derruba no peso pena. Se Evloev levar pro chao, domina. Mas se Murphy defender e conectar em pe? Evloev nunca foi nocauteado, mas tambem nunca enfrentou um striker com esse poder."',
        },
        {
          time: '40-50s',
          title: 'O Red Flag',
          text: '"Mas o elefante na sala: Evloev esta parado ha 15 meses. Teve uma doenca que atacou o sistema cardiovascular. Disse que nao sabia se voltaria a lutar. E agora vai fazer 25 minutos de wrestling intenso? Em Londres? Contra um cara que lutou duas vezes em 2025?"',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Evloev por decisao, 62 a 35. O wrestling e muito superior. Mas Murphy em casa, com poder de nocaute, e 15 meses de ring rust do Evloev? Esse pode ser O upset de 2026. Comenta quem voce acha que vence. E salva esse video."',
        },
      ],
      tiktok: [
        {
          hook: 'Murphy levou DOIS TIROS NA CARA aos 21 anos. Tem uma bala alojada na lingua ate hoje. E agora vai enfrentar o unico invicto do peso pena.',
          body: 'Evloev e 19-0. Nunca perdeu. 9 lutas no UFC, 9 decisoes. O cara e uma maquina de wrestling que ninguem consegue vencer. Mas Murphy e 17-0-1, lutando em CASA em Londres, e tem um cotovelo giratorio que nocauteou Aaron Pico em 3 minutos. Algo tem que ceder.',
          cta: 'Quem vence? Comenta EVLOEV ou MURPHY. Segue pra mais analises do UFC Londres.',
        },
        {
          hook: 'Evloev esteve DOENTE por 3 meses em 2025. Disse que nao sabia se voltaria a lutar. Agora vai fazer 25 minutos de wrestling?',
          body: 'A doenca atacou o sistema cardiovascular dele. Cardio leve o deixava sem ar. E agora, 15 meses depois da ultima luta, ele quer controlar Lerone Murphy por 5 rounds no O2 Arena lotado? Murphy lutou DUAS vezes em 2025. A diferenca de atividade e absurda.',
          cta: 'Ring rust vai custar caro? Comenta o que voce acha. Link da analise completa na bio.',
        },
        {
          hook: '51%. Esse e o numero que pode decidir TUDO na luta principal do UFC Londres.',
          body: '51% e a defesa de takedown do Murphy. Evloev aplica 4.8 takedowns por luta. E o 3o maior da HISTORIA do peso pena. Se Murphy nao melhorar esse numero DRASTICAMENTE, vai passar 15 minutos de costas pro chao olhando pro teto do O2 Arena. Mas se defender? Evloev tem ZERO finalizacoes no UFC. Zero.',
          cta: 'Salva esse video e volta depois da luta pra ver se acertamos.',
        },
      ],
      headlines: [
        '51% de TDD vs 4.8 Takedowns/Luta: O Numero Que Decide Evloev vs Murphy',
        'De Dois Tiros na Cara ao Title Shot: A Historia Insana de Lerone Murphy',
        '15 Meses Parado + Doenca Cardiovascular: Evloev Pode Aguentar 25 Minutos?',
        'Dois Invictos, Uma Chance no Titulo: Por Que UFC Londres e a Luta Mais Importante de 2026',
        'Evloev Tem 0 Finalizacoes no UFC. Murphy Tem o Nocaute do Ano. Quem Impoe o Estilo?',
        '19-0 Encontra 17-0-1: O Eliminatorio do Peso Pena Que a Divisao Esperava',
      ],
    },

    // -------------------------------------------------
    // BETTING VALUE (null, usando radar_apostador)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '-270',
        fighter2_odds: '+220',
        fighter1_name: 'Movsar Evloev',
        fighter2_name: 'Lerone Murphy',
        source: 'Media de DraftKings, FanDuel e Caesars (marco 2026)',
      },
      edges: [
        {
          icon: 'Target',
          titulo: 'Evloev por Decisao: O Cenario Quase Garantido',
          stat_headline: '9/9 LUTAS NO UFC POR DECISAO (100%)',
          contexto: 'Evloev nunca finalizou ninguem no UFC. Todas as 9 lutas foram a distancia. Isso nao e coincidencia, e estilo. Ele controla, acumula pontos, e vence nos scorecards. "Evloev por Decisao" e provavelmente a aposta com maior probabilidade de acerto nesse card.',
          implicacao_aposta: 'Evloev por Decisao deve pagar melhor que o Moneyline puro e tem probabilidade similar. E a aposta mais inteligente se voce gosta do Evloev.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Shield',
          titulo: 'TDD de Murphy vs Volume de Evloev',
          stat_headline: '51% TDD vs 4.8 TAKEDOWNS POR LUTA',
          contexto: 'Murphy defende apenas metade dos takedowns que recebe. Evloev aplica quase 5 por luta e e o 3o com mais takedowns da historia do peso pena no UFC (40 totais). A matematica e brutal: se Evloev tentar 5 e acertar metade, sao 2.5 takedowns por luta, cada um com ~2 minutos de controle.',
          implicacao_aposta: 'Qualquer prop relacionada a takedowns de Evloev deve ir pro over. Se houver prop de "tempo de controle total", over e valor.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Clock',
          titulo: 'Over 2.5 Rounds: Quase Certeza',
          stat_headline: '16 DE 19 LUTAS COMBINADAS NO UFC FORAM A DISTANCIA',
          contexto: 'Evloev foi a decisao em 9/9 lutas. Murphy foi a decisao em 7/10. Das 19 lutas combinadas no UFC, 16 foram a distancia (84%). Evloev nao finaliza e Murphy so foi finalizado... nunca. A chance de finalizacao antes do R3 e minima.',
          implicacao_aposta: 'Over 2.5 rounds deve estar heavy juice (-250 ou mais), o que tira o valor. Mas se voce encontrar Over 3.5 a odds razoaveis, pode valer.',
          edge_level: 'forte',
          fighter_side: 'neutral',
        },
        {
          icon: 'Zap',
          titulo: 'Murphy Underdog em Casa',
          stat_headline: 'MURPHY E 2-0 COMO UNDERDOG NO UFC',
          contexto: 'Murphy nunca perdeu como underdog. Na O2 Arena, com torcida britãnica lotada, o fator casa e real. Historicamente, lutadores do UK ganham decisoes divididas em casa com mais frequencia. Se a luta for pra split decision, Murphy tem vantagem ambiental.',
          implicacao_aposta: 'Murphy ML a +220 tem valor se voce acredita que o ring rust de 15 meses e a doenca cardiovascular do Evloev vao pesar. E uma aposta de risco-recompensa, nao de probabilidade.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Activity',
          titulo: 'Ring Rust de 15 Meses + Doenca',
          stat_headline: 'EVLOEV NAO LUTA DESDE DEZEMBRO 2024',
          contexto: 'Evloev esta parado ha mais de 15 meses. Em 2025, uma doenca que atacou seu sistema cardiovascular o tirou por 3+ meses. Ele admitiu que nao sabia se voltaria. Lutadores que voltam de layoffs longos tem historico misto no UFC, especialmente em main events de 5 rounds.',
          implicacao_aposta: 'O mercado pode estar subvalorizando o ring rust. Se voce acha que -270 e muito juice pra um cara com 15 meses parado e problemas de saude, Murphy ML a +220 oferece risco-recompensa atrativo.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Flame',
          titulo: 'Murphy por KO/TKO',
          stat_headline: '47% DE VITORIAS POR NOCAUTE (8 KOs EM 17)',
          contexto: 'Murphy tem poder real. O cotovelo giratorio contra Pico foi o nocaute do ano. 47% das vitorias por KO/TKO. Contra um Evloev que nunca foi nocauteado, mas que vem de 15 meses parado? Se Murphy conectar limpo nos primeiros 2 rounds quando Evloev ainda esta "frio", o upset pode acontecer.',
          implicacao_aposta: 'Murphy por KO/TKO em odds positivas e a aposta de upset mais logica. Nao e provavel, mas o payout compensa o risco se voce acredita no fator casa + ring rust.',
          edge_level: 'leve',
          fighter_side: 'fighter2',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Evloev por Decisao',
          odds: '-140 (estimado)',
          confianca: 'alta',
          raciocinio: '9/9 lutas de Evloev no UFC foram a decisao. Ele nao finaliza, mas nao perde. E o cenario mais provavel com margem significativa. Paga melhor que o ML puro (-270) e tem probabilidade similar.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Over 2.5 Rounds',
          odds: '-250 (estimado)',
          confianca: 'alta',
          raciocinio: '84% das lutas combinadas foram a distancia. Evloev nao finaliza (0/9). Murphy nunca foi finalizado. O juice e alto, mas a probabilidade e altissima. Melhor como perna de parlay.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Murphy ML (upset play)',
          odds: '+220',
          confianca: 'baixa',
          edge_vs_mercado: 'Ring rust de 15 meses + doenca cardiovascular podem nao estar precificados',
          raciocinio: 'Aposta de risco-recompensa, nao de probabilidade. Se o cardio do Evloev falhar nos championship rounds e Murphy estiver em pe, a torcida de Londres pode empurrar. Murphy e 2-0 como underdog. +220 paga bem se der certo.',
        },
        {
          tipo: 'Metodo',
          pick: 'Murphy por KO/TKO',
          odds: '+450 (estimado)',
          confianca: 'baixa',
          raciocinio: 'A aposta de "home run". Murphy tem 47% de vitorias por nocaute e o cotovelo giratorio que destruiu Pico. Se conectar algo nao ortodoxo contra um Evloev enferrujado nos primeiros rounds, paga 4.5x. Baixissima probabilidade mas alto retorno.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Evloev ML a -270',
        descricao: 'Evloev e favorito por razoes solidas, mas -270 significa que voce precisa apostar $270 pra ganhar $100. Com 15 meses de inatividade, doenca cardiovascular, e Murphy lutando em casa com poder de nocaute, o risco nao justifica o retorno. Se voce gosta de Evloev, aposte "Evloev por Decisao" que paga melhor com probabilidade similar. O ML puro so faz sentido como perna de parlay.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade. Odds podem variar entre casas e no momento da luta.',
    },
  },
};

export default function TesteEvloevMurphyPage() {
  return <FullAnalysisView analise={data} />;
}
