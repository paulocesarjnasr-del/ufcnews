import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'garbrandt-vs-xiao',
  evento_id: null,
  slug: 'garbrandt-vs-xiao',
  titulo: 'Garbrandt vs Xiao Long',
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
    nome: 'Cody Garbrandt',
    record: '14-7-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Xiao Long',
    record: '27-10-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC 326',
  evento_data: '7 de Marco, 2026',
  evento_local: 'T-Mobile Arena, Las Vegas',
  categoria_peso: 'Peso Galo',
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
      evento_nome: 'UFC 326',
      evento_data: '7 de Marco, 2026',
      categoria_peso: 'Peso Galo',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Garbrandt',
        record: '14-7-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Xiao Long',
        record: '27-10-0',
        ranking: undefined,
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 2.88,
          valueB: 5.25,
          maxVal: 7,
          format: 'decimal',
          note: 'Xiao Long tem volume muito superior, quase o dobro de strikes por minuto',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 39,
          valueB: 46,
          maxVal: 100,
          format: 'percent',
          note: 'Ambos com precisao abaixo da media da divisao, Xiao Long levemente superior',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.64,
          valueB: 4.20,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Garbrandt absorve menos strikes, mas ambos sao atingidos com frequencia',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 59,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
          note: 'Garbrandt defende significativamente melhor, Xiao Long deixa muitas aberturas',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.13,
          valueB: 0.69,
          maxVal: 5,
          format: 'decimal',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 34,
          valueB: 25,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 78,
          valueB: 79,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de takedown praticamente identica entre os dois',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '34 anos', fighter2: '27 anos', note: '7 anos de diferenca' },
        { label: 'Altura', fighter1: '1,73m (5\'8")', fighter2: '1,73m (5\'8")', note: null },
        { label: 'Envergadura', fighter1: '166cm (65.5")', fighter2: '178cm (70")', note: 'Xiao Long tem 4.5 polegadas a mais de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Team Alpha Male', fighter2: 'UFC PI Shanghai', note: null },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Garbrandt',
        recent_fights: [
          {
            date: 'Jun 2025',
            opponent: 'Raoni Barcelos',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Barcelos controlou o ritmo por 3 rounds, Garbrandt nao conseguiu impor seu jogo',
          },
          {
            date: 'Abr 2024',
            opponent: 'Deiveson Figueiredo',
            result: 'L',
            method: 'Sub R2',
            opponent_rank: '#5 BW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Finalizado com mata-leao no UFC 300 contra ex-campeao dos moscas',
          },
          {
            date: 'Dez 2023',
            opponent: 'Brian Kelleher',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'KO devastador com soco de direita no primeiro round no UFC 296',
          },
          {
            date: 'Mar 2023',
            opponent: 'Trevin Jones',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao contra substituto de curto prazo, sem grandes emocoes',
          },
          {
            date: 'Dez 2021',
            opponent: 'Kai Kara-France',
            result: 'L',
            method: 'KO R1',
            opponent_rank: '#8 FLW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Nocauteado na estreia nos moscas, foi sua ultima luta antes de voltar ao peso galo',
          },
        ],
      },
      fighter2: {
        nome: 'Xiao Long',
        recent_fights: [
          {
            date: 'Ago 2025',
            opponent: 'Su Young You',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Perdeu uma batalha equilibrada de strikes no UFC Shanghai',
          },
          {
            date: 'Nov 2024',
            opponent: 'Quang Le',
            result: 'W',
            method: 'KO R3',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'KO brutal com soco de direita no terceiro round no UFC Macau, sua primeira vitoria no UFC',
          },
          {
            date: 'Jun 2024',
            opponent: 'ChangHo Lee',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Final do Road to UFC, perdeu por split contra o sul-coreano na Arabia Saudita',
          },
          {
            date: 'Ago 2023',
            opponent: 'Shuya Kamikubo',
            result: 'W',
            method: 'Decisao Majoritaria',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Semifinal do Road to UFC, garantiu contrato com o UFC',
          },
          {
            date: 'Mai 2023',
            opponent: 'Shohei Nose',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Quartas de final do Road to UFC, vitoria apertada contra japones',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Poder de Nocaute',
          valueA: 82,
          valueB: 48,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Garbrandt tem 11 KOs na carreira, poder explosivo nas maos. Xiao Long tem apenas 5 KOs em 27 vitorias.',
        },
        {
          label: 'Volume de Striking',
          valueA: 45,
          valueB: 80,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Xiao Long lanca 5.25 strikes significativos por minuto, volume muito superior ao de Garbrandt (2.88).',
        },
        {
          label: 'Defesa Geral',
          valueA: 70,
          valueB: 50,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Garbrandt tem 59% de defesa de strikes e 78% de defesa de takedown. Xiao Long defende apenas 50% dos strikes.',
        },
        {
          label: 'Grappling e Submissao',
          valueA: 35,
          valueB: 65,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Xiao Long tem 9 finalizacoes na carreira incluindo armbars e mata-leoes. Garbrandt nunca venceu por submissao.',
        },
        {
          label: 'Experiencia em Alto Nivel',
          valueA: 88,
          valueB: 32,
          labelA: 'Muito Bom',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Ex-campeao do UFC, lutou contra Cruz, Dillashaw, Font, Figueiredo. Xiao Long tem apenas 3 lutas no UFC.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 50,
          valueB: 68,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Xiao Long mantem ritmo alto por 3 rounds. Garbrandt historicamente perde eficiencia em rounds tardios.',
        },
      ],
      insight: 'Garbrandt tem vantagem clara em poder de nocaute e experiencia, mas Xiao Long compensa com volume, cardio e versatilidade no grappling. Se a luta for para a distancia, o ritmo de Xiao Long pode ser decisivo.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Garbrandt',
        ko_tko: { count: 11, percent: 79 },
        submission: { count: 0, percent: 0 },
        decision: { count: 3, percent: 21 },
        total_wins: 14,
      },
      fighter2: {
        nome: 'Xiao Long',
        ko_tko: { count: 5, percent: 19 },
        submission: { count: 9, percent: 33 },
        decision: { count: 13, percent: 48 },
        total_wins: 27,
      },
      insight: 'Perfis completamente opostos: Garbrandt depende quase exclusivamente do nocaute (79% das vitorias por KO/TKO), enquanto Xiao Long e um lutador completo com vitorias distribuidas entre decisao (48%), finalizacao (33%) e nocaute (19%). Se Garbrandt nao conseguir o KO, Xiao Long tem mais ferramentas para buscar a vitoria.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Garbrandt',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Garbrandt entra como azarao nas odds, mas sua experiencia e tecnica de striking superior devem ser suficientes para lidar com um Xiao Long que ainda nao mostrou muito no Octagon. O chines tem volume, mas a qualidade dos golpes de Garbrandt e sua defesa superior podem fazer a diferenca nos cartoes dos juizes. Porem, a idade e a sequencia recente de derrotas tornam esta previsao incerta.',
      x_factor: {
        title: 'O queixo de Garbrandt',
        description: 'Garbrandt tem 4 derrotas por KO/TKO na carreira e demonstrou vulnerabilidade quando absorve golpes limpos. Se Xiao Long encontrar o timing certo com seu volume, pode surpreender.',
      },
      upset_alert: {
        title: 'Xiao Long tem o volume para sufocar',
        description: 'Com 5.25 strikes significativos por minuto contra 2.88 de Garbrandt, Xiao Long pode simplesmente sufocar o ex-campeao com pressao constante e vencer nos pontos se Garbrandt nao conseguir o nocaute cedo.',
      },
      probabilities: {
        fighter1: { nome: 'Garbrandt', percent: 48 },
        fighter2: { nome: 'Xiao Long', percent: 50 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
