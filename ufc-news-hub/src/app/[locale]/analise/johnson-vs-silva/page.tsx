import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'johnson-vs-silva',
  evento_id: null,
  slug: 'johnson-vs-silva',
  titulo: 'Johnson vs Silva',
  subtitulo: null,
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
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Charles Johnson',
    record: '18-8-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Bruno Silva',
    record: '15-7-2',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Mosca',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'prelims',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // PrelimsAnalysisData (6 Sections)
  // ===========================
  prelims_analysis: {
    // ── Section 1: Hero ──
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      categoria_peso: 'Peso Mosca',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Johnson',
        record: '18-8-0',
        ranking: '#14 FLW',
      },
      fighter2: {
        nome: 'Silva',
        record: '15-7-2',
        ranking: '#15 FLW',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.68,
          valueB: 3.54,
          maxVal: 7,
          format: 'decimal',
          note: 'Johnson produz mais de um strike significativo a mais por minuto, um volume de pressao muito superior para a divisao mosca',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 49,
          valueB: 49,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao identica entre os dois, ambos acertando quase metade dos golpes significativos',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.94,
          valueB: 4.08,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Silva absorve um pouco mais de strikes por minuto, mas ambos sao atingidos com frequencia, o que pode gerar trocacoes explosivas',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 56,
          valueB: 52,
          maxVal: 100,
          format: 'percent',
          note: 'Johnson defende 4% a mais dos strikes recebidos, diferencial moderado que favorece o trabalho de distancia',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.55,
          valueB: 1.92,
          maxVal: 4,
          format: 'decimal',
          note: 'Silva busca o takedown com quase quatro vezes a frequencia de Johnson, indicando clara intencao de levar a luta para o chao',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 20,
          valueB: 25,
          maxVal: 100,
          format: 'percent',
          note: 'Ambos com eficiencia baixa de takedown, mas Silva conecta com um pouco mais de regularidade',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 67,
          valueB: 60,
          maxVal: 100,
          format: 'percent',
          note: 'Johnson defende melhor as quedas, podendo frustrar a estrategia de grappling de Silva e manter a luta onde quer',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '34 anos',
          fighter2: '35 anos',
          note: 'Veteranos experientes, ambos na reta final da janela competitiva',
        },
        {
          label: 'Altura',
          fighter1: '1,75m (5\'9")',
          fighter2: '1,63m (5\'4")',
          note: 'Johnson com 12cm de vantagem, diferenca enorme para peso mosca',
        },
        {
          label: 'Envergadura',
          fighter1: '178cm (70")',
          fighter2: '165cm (65")',
          note: 'Johnson com 13cm a mais de envergadura, alcance muito superior',
        },
        {
          label: 'Stance',
          fighter1: 'Switch',
          fighter2: 'Ortodoxa',
          note: 'Johnson alterna guardas livremente, complicando a leitura de Silva',
        },
        {
          label: 'Academia',
          fighter1: 'St. Charles MMA',
          fighter2: 'American Top Team',
          note: null,
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Johnson',
        recent_fights: [
          {
            date: 'Jan 2026',
            opponent: 'Alex Perez',
            result: 'L',
            method: 'TKO R1',
            opponent_rank: '#10 FLW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Parado no primeiro round por um ex-desafiante ao titulo. Nocaute rapido que levanta questoes sobre durabilidade.',
          },
          {
            date: 'Ago 2025',
            opponent: 'Lone\'er Kavanagh',
            result: 'W',
            method: 'KO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute devastador no segundo round, premiado com Performance da Noite. Poder de nocaute real.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Ramazon Temirov',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota frustrante por decisao contra oponente nao ranqueado. Nao conseguiu impor seu jogo.',
          },
          {
            date: 'Out 2024',
            opponent: 'Su Mudaerji',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#15 FLW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Vitoria solida contra ranqueado, usando volume e movimentacao lateral para acumular pontos.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Joshua Van',
            result: 'W',
            method: 'KO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute no terceiro round contra o mesmo Van que depois finalizou Silva. Oponente em comum importante.',
          },
        ],
      },
      fighter2: {
        nome: 'Silva',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'HyunSung Park',
            result: 'W',
            method: 'Sub R3',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizou com submissao no terceiro round. Voltou a vencer apos duas derrotas seguidas.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Joshua Van',
            result: 'L',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Parado no terceiro round apos comecar bem. Padrao preocupante de queda no cardio nos rounds finais.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Manel Kape',
            result: 'L',
            method: 'TKO R3',
            opponent_rank: '#8 FLW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Enfrentou oponente de elite, ex-campeao do RIZIN. Parado no terceiro por chute no corpo e socos.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Cody Durden',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Uppercut destruidor seguido de ground and pound. Performance da Noite em vitoria empolgante.',
          },
          {
            date: 'Mar 2023',
            opponent: 'Tyson Nam',
            result: 'W',
            method: 'Sub Tec R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Submissao tecnica rapida no segundo round contra veterano em fim de carreira. Performance da Noite.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 78,
          valueB: 58,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Johnson produz 4.68 SLpM contra 3.54 de Silva, com background de boxe profissional e capacidade de alternar guardas. A diferenca de envergadura amplifica essa vantagem.',
        },
        {
          label: 'Grappling Ofensivo',
          valueA: 38,
          valueB: 65,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Silva busca takedowns com quase quatro vezes a frequencia (1.92 vs 0.55/15min) e tem 5 submissoes na carreira. Seu jogo de chao e a melhor arma.',
        },
        {
          label: 'Defesa de Takedown',
          valueA: 68,
          valueB: 55,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Johnson defende 67% dos takedowns contra 60% de Silva. Pode frustrar a estrategia do Bulldog de levar a luta ao solo.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 70,
          valueB: 45,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Silva foi finalizado no terceiro round em duas lutas consecutivas (Van e Kape). O padrao de queda de rendimento e uma vulnerabilidade critica contra o volume de Johnson.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 68,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Silva carrega poder real nas maos, com 4 bonus de Performance da Noite. Johnson tambem nocauteia, mas Silva finaliza com mais frequencia proporcionalmente.',
        },
        {
          label: 'Controle de Distancia',
          valueA: 76,
          valueB: 40,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Com 5 polegadas a mais de envergadura e stance switch, Johnson controla a distancia com facilidade. Silva precisa entrar no bolso para causar dano.',
        },
      ],
      insight: 'Johnson domina em 4 das 6 categorias, com superioridade clara no striking e controle de distancia. Silva compensa com grappling ofensivo e poder de finalizacao, mas o cardio fragil e um problema estrutural contra o ritmo alto de Johnson.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Johnson',
        ko_tko: { count: 8, percent: 44 },
        submission: { count: 3, percent: 17 },
        decision: { count: 7, percent: 39 },
        total_wins: 18,
      },
      fighter2: {
        nome: 'Silva',
        ko_tko: { count: 6, percent: 40 },
        submission: { count: 5, percent: 33 },
        decision: { count: 4, percent: 27 },
        total_wins: 15,
      },
      insight: 'Os dois finalizam lutas, mas com perfis distintos. Johnson combina poder de nocaute (44% KO) com a capacidade de vencer decisoes (39%), mostrando versatilidade. Silva e um finalizador nato: 73% das vitorias vem por KO ou submissao, com apenas 27% por decisao. Quando Silva vence, geralmente alguem cai.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Johnson',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Johnson tem as ferramentas para vencer essa luta de forma confortavel. Sua vantagem de 5 polegadas de altura e 5 de envergadura, combinada com volume de strikes superior (4.68 vs 3.54 SLpM), melhor defesa de strikes e capacidade de alternar guardas, deve controlar a distancia durante tres rounds. Silva precisa transformar isso em uma luta de curta distancia ou grappling, mas sua precisao de takedown de apenas 25% contra a defesa de 67% de Johnson nao inspira confianca. O fator mais preocupante para Silva sao as duas finalizacoes sofridas no terceiro round (Van e Kape), que mostram um problema de cardio contra um oponente que mantem ritmo alto.',
      x_factor: {
        title: 'O turnaround relampago de Johnson',
        description: 'Johnson volta a lutar apenas 49 dias apos ser nocauteado por Alex Perez no primeiro round. Retornos rapidos apos nocautes sao uma faca de dois gumes: podem indicar urgencia competitiva e fome de vitoria, ou revelar um queixo comprometido e falta de recuperacao adequada.',
      },
      upset_alert: {
        title: 'O Bulldog nos dois primeiros rounds',
        description: 'Silva e mais perigoso quando a luta nao chega ao terceiro round. Com 4 bonus de Performance da Noite e poder real de finalizacao, se ele conseguir encurtar distancia cedo e trabalhar no clinch ou no chao, pode surpreender um Johnson que vem de nocaute recente. O melhor MMA de Silva acontece nos 10 primeiros minutos.',
      },
      probabilities: {
        fighter1: { nome: 'Johnson', percent: 58 },
        fighter2: { nome: 'Silva', percent: 40 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
