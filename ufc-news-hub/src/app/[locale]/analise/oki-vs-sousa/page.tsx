import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'oki-vs-sousa',
  evento_id: null,
  slug: 'oki-vs-sousa',
  titulo: 'Oki vs Sousa',
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
    predictedWinner: 'fighter2',
    predictedMethod: 'TKO R2',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Bolaji Oki',
    record: '10-3-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Manoel Sousa',
    record: '13-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Leve',
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
      categoria_peso: 'Peso Leve',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Oki',
        record: '10-3-0',
      },
      fighter2: {
        nome: 'Sousa',
        record: '13-1-0',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 6.59,
          valueB: 3.23,
          maxVal: 9,
          format: 'decimal',
          note: 'Oki tem volume absurdo, mais que o dobro de Sousa. Um dos maiores volumes da divisao, ritmo que pode sobrecarregar qualquer oponente na trocacao.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 44,
          valueB: 58,
          maxVal: 100,
          format: 'percent',
          note: 'Sousa e muito mais preciso, acertando quase 6 em cada 10 golpes. Oki prioriza volume sobre precisao, diferenca de 14 pontos percentuais.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 5.15,
          valueB: 1.31,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Oki absorve quase quatro vezes mais strikes por minuto. Defesa porosa e o maior risco nesta luta, ja que Sousa tem poder para capitalizar.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 61,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Numeros parecidos na defesa percentual, mas contexto importa: Sousa simplesmente nao enfrenta tanto volume quanto Oki recebe regularmente.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.01,
          valueB: 0.00,
          maxVal: 4,
          format: 'decimal',
          note: 'Oki tem alguma ofensiva de takedown com 60% de precisao. Sousa nunca tentou takedown no registro oficial, preferindo resolver tudo em pe.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 60,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Oki converte 60% quando busca quedas, numero respeitavel. Sousa nao tem registro de takedowns na base de dados do UFC.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 66,
          valueB: 62,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de takedown equilibrada. Nenhum dos dois se destaca, mas como nenhum busca a queda com frequencia, pode nao ser fator decisivo.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '29 anos',
          fighter2: '28 anos',
          note: 'Praticamente a mesma idade, ambos no auge fisico da carreira',
        },
        {
          label: 'Altura',
          fighter1: '1,78m (5\'10")',
          fighter2: '1,75m (5\'9")',
          note: 'Oki com leve vantagem de 3cm, pouca diferenca nesta divisao',
        },
        {
          label: 'Envergadura',
          fighter1: '178cm (70")',
          fighter2: '178cm (70")',
          note: 'Envergadura identica, nenhum dos dois tera vantagem de alcance',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: 'Ambos ortodoxos, luta espelho tradicional',
        },
        {
          label: 'Academia',
          fighter1: 'Valon Team (Belgica)',
          fighter2: 'Academia Octogono / O.C.T MMA (Brasil)',
          note: null,
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Oki',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Chris Jones',
            result: 'L',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Parado por TKO no segundo round. Oki foi atingido limpo demais e nao conseguiu se recuperar. Padrao preocupante de finalizacoes contra ele.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Ricky Aswell',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao usando volume alto de strikes durante tres rounds. Mostrou seu jogo preferido de pressao constante.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Hayisaer Duncan',
            result: 'L',
            method: 'Sub Guilhotina R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizado com guilhotina no primeiro round. Vulnerabilidade no grappling ficou exposta de forma clara.',
          },
          {
            date: 'Out 2024',
            opponent: 'Gilberto Cuamba',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia no UFC com vitoria apertada por decisao dividida. Mostrou coracao e volume, mas nao convenceu plenamente.',
          },
        ],
      },
      fighter2: {
        nome: 'Sousa',
        recent_fights: [
          {
            date: 'Ago 2025',
            opponent: 'Jose Perez',
            result: 'W',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria no DWCS que garantiu o contrato com o UFC. Virou uma luta dificil, mostrando resiliencia e poder de finalizacao tardio.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Lucas Barros',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria solida no LFA por decisao. Demonstrou maturidade tatica, controlando o ritmo sem precisar arriscar.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Derek Colgan',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Unica derrota da carreira, no Bellator. Perdeu por decisao em luta competitiva. Mostrou que pontos sao sua fraqueza.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Steve Wilde',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute devastador no primeiro round no Bellator. Poder de uma so pancada em exibicao completa.',
          },
          {
            date: 'Set 2023',
            opponent: 'Pedro Laia',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria confortavel por decisao no PFL. Sousa controlou o ritmo sem grandes dificuldades.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Volume de Strikes',
          valueA: 88,
          valueB: 55,
          labelA: 'Excelente',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Oki e uma metralhadora com 6.59 strikes por minuto, um dos volumes mais altos da divisao. Sousa prefere eficiencia sobre quantidade.',
        },
        {
          label: 'Precisao e Timing',
          valueA: 45,
          valueB: 78,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sousa acerta 58% dos golpes com timing preciso, contra apenas 44% de Oki. Qualidade sobre quantidade define esta diferenca.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 48,
          valueB: 80,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sousa tem 8 KO/TKOs em 13 vitorias (62%). Oki tem volume mas nao possui o mesmo poder de impacto para apagar oponentes.',
        },
        {
          label: 'Defesa e Absorcao',
          valueA: 35,
          valueB: 72,
          labelA: 'Ruim',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Oki absorve 5.15 strikes por minuto, um dos piores indices da divisao. Sousa absorve apenas 1.31, quatro vezes menos.',
        },
        {
          label: 'Grappling',
          valueA: 55,
          valueB: 40,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Oki tem 60% de precisao em takedowns e alguma ofensiva no chao. Sousa nunca buscou takedown no registro, mas tem 3 submissoes na carreira.',
        },
        {
          label: 'Mentalidade e Resiliencia',
          valueA: 60,
          valueB: 75,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sousa viveu em sua academia por 8 anos para realizar o sonho do UFC. Virou a luta contra Perez no DWCS quando estava perdendo. Oki tem duas derrotas por finalizacao que mostram fragilidade sob pressao.',
        },
      ],
      insight: 'Sousa leva vantagem em 4 das 6 categorias, especialmente nas areas mais decisivas: precisao, poder e defesa. O unico trunfo real de Oki e seu volume absurdo, mas contra um oponente preciso e poderoso como Sousa, volume sem defesa pode ser uma receita para desastre.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Oki',
        ko_tko: { count: 5, percent: 50 },
        submission: { count: 1, percent: 10 },
        decision: { count: 4, percent: 40 },
        total_wins: 10,
      },
      fighter2: {
        nome: 'Sousa',
        ko_tko: { count: 8, percent: 62 },
        submission: { count: 3, percent: 23 },
        decision: { count: 2, percent: 15 },
        total_wins: 13,
      },
      insight: 'Sousa e um finalizador nato: 85% das suas vitorias terminam antes da decisao dos juizes (8 KOs + 3 submissoes em 13 vitorias). Oki divide suas vitorias entre nocautes e decisoes, com metade delas indo para os pontos. A diferenca no poder de finalizacao e clara e favorece o brasileiro, que tem mais caminhos para encerrar a luta antes do tempo.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Sousa',
      winner_side: 'fighter2',
      predicted_method: 'TKO R2',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Sousa entra como favorito justificado nesta luta. A combinacao de precisao superior (58% vs 44%), poder de nocaute comprovado (8 KOs em 13 vitorias) e a defesa absurdamente porosa de Oki (5.15 strikes absorvidos por minuto) cria um cenario perigoso para o belga. Oki vai trazer volume e pressao como sempre faz, mas cada troca favorece Sousa, que precisa de menos golpes para causar dano real. O padrao de Oki sendo finalizado em suas derrotas (TKO no segundo round e guilhotina no primeiro) sugere que quando enfrenta adversarios com poder real, seu volume nao compensa a falta de defesa. Sousa deve encontrar o timing no segundo round, quando Oki comeca a abrir a guarda para manter seu ritmo altissimo. A vitoria notavel de Sousa sobre Mauricio Ruffy no inicio da carreira tambem mostra que ele ja venceu prospectos de alto nivel.',
      x_factor: {
        title: 'A estreia de Sousa no UFC',
        description: 'Sousa faz sua estreia no octogono apos anos percorrendo circuitos regionais e vivendo dentro da academia por 8 anos. O nervosismo da estreia pode afetar seu timing, ou a motivacao de finalmente chegar ao maior palco do MMA pode liberar sua melhor performance. No DWCS, ele ja mostrou capacidade de virar lutas adversas.',
      },
      upset_alert: {
        title: 'O tsunami de volume de Oki',
        description: 'Oki tem 6.59 strikes significativos por minuto, numero que pode sufocar qualquer oponente. Se Sousa nao conseguir manter a compostura sob essa pressao constante, o volume pode acumular dano e criar uma vitoria por pontos para Oki. Sousa nunca enfrentou alguem com esse ritmo de producao.',
      },
      probabilities: {
        fighter1: { nome: 'Oki', percent: 35 },
        fighter2: { nome: 'Sousa', percent: 63 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
