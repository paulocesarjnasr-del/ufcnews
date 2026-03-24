import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'fernandez-vs-bellato',
  evento_id: null,
  slug: 'fernandez-vs-bellato',
  titulo: 'Fernandez vs Bellato',
  subtitulo: null,
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,85m', envergadura: '1,93m', idade: 30, academia: 'Dante Rivera BJJ' },
      fighter2: { altura: '1,91m', envergadura: '1,91m', idade: 30, academia: 'KO Squad' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'KO/TKO R2',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: 'Poder de Nocaute', description: 'Fernandez tem 83% de nocautes na carreira e pode encerrar a luta a qualquer momento.' },
  },
  fighter1_info: {
    nome: 'Luke Fernandez',
    record: '6-0-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Rodolfo Bellato',
    record: '12-3-1 (1 NC)',
    ultimasLutas: [],
  },
  evento_nome: 'UFC 326',
  evento_data: '7 de Marco, 2026',
  evento_local: 'T-Mobile Arena, Las Vegas',
  categoria_peso: 'Meio-Pesado',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'prelims',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  prelims_analysis: {
    // =============================================
    // SECTION 1: HERO
    // =============================================
    hero: {
      evento_nome: 'UFC 326',
      evento_data: '7 de Marco, 2026',
      categoria_peso: 'Meio-Pesado',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Fernandez',
        record: '6-0-0',
      },
      fighter2: {
        nome: 'Bellato',
        record: '12-3-1 (1 NC)',
      },
    },

    // =============================================
    // SECTION 2: COMPARACAO ESTATISTICA
    // =============================================
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.50,
          valueB: 6.28,
          maxVal: 8,
          format: 'decimal',
          note: 'Fernandez sem dados de UFC; estimativa baseada no perfil de lutador de CFFC. Bellato tem volume altissimo no UFC.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 55,
          valueB: 62,
          maxVal: 100,
          format: 'percent',
          note: 'Bellato conecta 62% dos golpes significativos no UFC.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.00,
          valueB: 6.31,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Bellato absorve praticamente o mesmo volume que descarrega, indicando trocacoes violentas.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 55,
          valueB: 46,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de strikes de Bellato (46%) esta abaixo da media da divisao.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 2.00,
          valueB: 1.06,
          maxVal: 5,
          format: 'decimal',
          note: 'Fernandez tem base de wrestling universitario e deve buscar quedas.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 50,
          valueB: 92,
          maxVal: 100,
          format: 'percent',
          note: 'Bellato tem 92% de aproveitamento em quedas no UFC (amostragem pequena).',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 65,
          valueB: 39,
          maxVal: 100,
          format: 'percent',
          note: 'Bellato sofre com takedowns: apenas 39% de defesa no UFC.',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '30 anos', fighter2: '30 anos', note: 'Mesma idade' },
        { label: 'Altura', fighter1: '1,85m (6\'1")', fighter2: '1,91m (6\'3")', note: 'Bellato 5cm mais alto' },
        { label: 'Envergadura', fighter1: '1,93m (76")', fighter2: '1,91m (75")', note: 'Fernandez tem 1" a mais de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Dante Rivera BJJ', fighter2: 'KO Squad', note: null },
      ],
    },

    // =============================================
    // SECTION 3: HISTORICO DE LUTAS
    // =============================================
    historico_lutas: {
      fighter1: {
        nome: 'Fernandez',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Rafael Pergentino',
            result: 'W',
            method: 'KO R1 (0:15)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'DWCS. Nocaute fulminante em 15 segundos garantiu o contrato com o UFC.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Christian Edwards',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Defesa do titulo CFFC. Venceu por decisao em 4 rounds, mostrando habilidade em lutas longas.',
          },
          {
            date: 'Out 2024',
            opponent: 'Gregg Ellis',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Defesa do titulo CFFC contra ex-campeao de peso medio do CFFC.',
          },
          {
            date: 'Dez 2023',
            opponent: 'Peter New',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Conquistou o titulo meio-pesado do CFFC em apenas sua terceira luta profissional.',
          },
          {
            date: 'Jun 2023',
            opponent: 'Jesse Romans',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Segunda luta profissional. Nocaute rapido em pouco mais de dois minutos.',
          },
        ],
      },
      fighter2: {
        nome: 'Bellato',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Navajo Stirling',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota clara por decisao. Stirling controlou a distancia com footwork superior.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Paul Craig',
            result: 'NC',
            method: 'No Contest (upkick ilegal)',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Luta anulada apos upkick ilegal de Craig no primeiro round. Resultado inconclusivo.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Jimmy Crute',
            result: 'D',
            method: 'Empate Majoritario',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'UFC 312. Luta competitiva que terminou empatada. Bellato mostrou resiliencia mas faltou volume.',
          },
          {
            date: 'Dez 2023',
            opponent: 'Ihor Potieria',
            result: 'W',
            method: 'TKO R2 (4:17)',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Estreia no UFC. Finalizou Potieria com strikes no segundo round. Melhor performance no octogono.',
          },
        ],
      },
    },

    // =============================================
    // SECTION 4: PERFIL DE HABILIDADES
    // =============================================
    perfil_habilidades: {
      skills: [
        {
          label: 'Wrestling Ofensivo',
          valueA: 80,
          valueB: 45,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Fernandez e ex-wrestler universitario e deve dominar a luta agarrada.',
        },
        {
          label: 'Striking em Pe',
          valueA: 70,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'even',
          advantage_note: 'Bellato tem mais volume, mas Fernandez tem mais precisao e poder de nocaute.',
        },
        {
          label: 'Jiu-Jitsu / Grappling',
          valueA: 60,
          valueB: 70,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Bellato tem background de jiu-jitsu com 4 finalizacoes na carreira.',
        },
        {
          label: 'Defesa de Takedown',
          valueA: 65,
          valueB: 38,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Bellato tem apenas 39% de defesa de takedown no UFC. Vulnerabilidade clara.',
        },
        {
          label: 'Cardio / Resistencia',
          valueA: 60,
          valueB: 68,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Bellato tem mais experiencia em lutas de 3 rounds no UFC. Fernandez tem apenas uma decisao na carreira.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 85,
          valueB: 75,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter1',
          advantage_note: 'Fernandez finalizou 83% das lutas (5 nocautes em 6 vitorias). Poder explosivo.',
        },
      ],
      insight: 'Fernandez tem vantagem clara no wrestling e no poder de finalizacao, enquanto Bellato traz mais experiencia e equilibrio no jiu-jitsu. A defesa de takedown fragil de Bellato pode ser o fator decisivo nesta luta.',
    },

    // =============================================
    // SECTION 5: DISTRIBUICAO DE VITORIAS
    // =============================================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Fernandez',
        ko_tko: { count: 5, percent: 83 },
        submission: { count: 0, percent: 0 },
        decision: { count: 1, percent: 17 },
        total_wins: 6,
      },
      fighter2: {
        nome: 'Bellato',
        ko_tko: { count: 7, percent: 58 },
        submission: { count: 4, percent: 33 },
        decision: { count: 1, percent: 8 },
        total_wins: 12,
      },
      insight: 'Dois finalizadores perigosos. Fernandez tem perfil mais concentrado em nocautes (83%), enquanto Bellato e mais versatil com 7 nocautes e 4 finalizacoes. Apenas 2 das 18 vitorias combinadas foram por decisao, o que indica alta probabilidade de finalizacao nesta luta.',
    },

    // =============================================
    // SECTION 6: PREVISAO FINAL
    // =============================================
    previsao_final: {
      winner_name: 'Fernandez',
      winner_side: 'fighter1',
      predicted_method: 'TKO R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Fernandez e um prospecto invicto com poder explosivo e base de wrestling que deve explorar a maior fraqueza de Bellato: a defesa de takedown (39%). Se Fernandez conseguir levar a luta para o chao, pode desgastar Bellato com ground-and-pound e buscar a finalizacao. Bellato tem experiencia, mas nao vence desde dezembro de 2023 e entra nesta luta precisando provar que ainda pertence ao plantel do UFC.',
      x_factor: {
        title: 'Estreia no UFC de Fernandez',
        description: 'O fator incognita e real. Fernandez nunca lutou no octogono do UFC, e a pressao da estreia em um card de PPV pode afetar sua performance. Por outro lado, lutadores invictos com pedigree de wrestling costumam se adaptar bem ao nivel do UFC.',
      },
      upset_alert: {
        title: 'Jiu-jitsu de Bellato no chao',
        description: 'Se Fernandez levar a luta para o chao sem cuidado, pode cair nas armadilhas de jiu-jitsu de Bellato, que tem 4 finalizacoes na carreira. Uma guilhotina ou triangulo no scramble e totalmente possivel.',
      },
      probabilities: {
        fighter1: { nome: 'Fernandez', percent: 62 },
        fighter2: { nome: 'Bellato', percent: 36 },
        draw: 2,
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
