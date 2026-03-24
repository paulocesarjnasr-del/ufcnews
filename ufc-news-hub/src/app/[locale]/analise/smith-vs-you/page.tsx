import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'smith-vs-you',
  evento_id: null,
  slug: 'smith-vs-you',
  titulo: 'Smith vs You',
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
    predictedMethod: 'TKO R2',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Elijah Smith',
    record: '9-1-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'SuYoung You',
    record: '16-3-0, 2 NC',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
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
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      categoria_peso: 'Peso Galo',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Smith',
        record: '9-1-0',
      },
      fighter2: {
        nome: 'You',
        record: '16-3-0, 2 NC',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.45,
          valueB: 0,
          maxVal: 7,
          format: 'decimal',
          note: 'Smith traz volume agressivo de strikes, com 4.45 golpes significativos por minuto. Dados de You ainda limitados no UFC, mas seu perfil indica preferencia pelo grappling sobre trocacao',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 47,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Smith conecta 47% dos golpes significativos, precisao moderada que compensa pelo volume alto e poder explosivo',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.40,
          valueB: 0,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Smith absorve 3.40 strikes por minuto, taxa administravel que mostra que ele troca golpes abertamente mas nao e um alvo facil',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 47,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de strikes moderada de Smith. You nao tem dados UFC suficientes, mas seu estilo de clinch e takedown pode ajudar a evitar trocacao prolongada',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 3.51,
          valueB: 0,
          maxVal: 5,
          format: 'decimal',
          note: 'Smith busca takedowns com frequencia alta (3.51/15min), surpreendente para alguem com tanto poder de nocaute. Demonstra habilidade de wrestling versatil',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 53,
          valueB: 46.7,
          maxVal: 100,
          format: 'percent',
          note: 'Smith converte 53% dos takedowns contra 46.7% de You. Ambos eficientes ao derrubar, mas Smith leva vantagem na conversao',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 57,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de takedown de Smith e mediocre (57%), abrindo uma porta para o jiu-jitsu de You. A defesa de You registra 0% no UFC, dado alarmante',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '23 anos',
          fighter2: '30 anos',
          note: 'Smith com 7 anos a menos, um prospecto explosivo contra um veterano experiente',
        },
        {
          label: 'Altura',
          fighter1: '1,75m (5\'9")',
          fighter2: '1,73m (5\'8")',
          note: 'Praticamente mesma altura, diferenca minima que nao sera fator determinante',
        },
        {
          label: 'Envergadura',
          fighter1: '180cm (71")',
          fighter2: '165cm (65")',
          note: 'Smith com 6 polegadas a mais de envergadura, vantagem massiva para controlar distancia e conectar jabs',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: 'Ambos ortodoxos, facilitando a leitura mutua mas sem complicacoes de stance switching',
        },
        {
          label: 'Academia',
          fighter1: 'Victory MMA',
          fighter2: 'Von Jiu Jitsu',
          note: 'Victory MMA em Colorado Springs prepara atletas completos. Von Jiu Jitsu em Seul foca no grappling de elite',
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Smith',
        recent_fights: [
          {
            date: 'Nov 2025',
            opponent: 'Rinya Kazama',
            result: 'W',
            method: 'KO R1 (Slam)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute historico por slam no primeiro round, apenas o 15o na historia do UFC. Premiado com Performance da Noite. Poder atletico absurdo.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Chris Morales',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC com vitoria solida por decisao. Mostrou maturidade e adaptacao ao nivel da organizacao em luta completa.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Tema Tau',
            result: 'W',
            method: 'Decisao Unanime (DWCS)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria no Contender Series que garantiu o contrato com o UFC. Performance controlada e inteligente contra oponente limitado.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Adversario Regional',
            result: 'W',
            method: 'KO R2',
            opponent_rank: 'Regional',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute no circuito regional mostrando o poder que trouxe ao UFC. Parte da sequencia de 7 vitorias consecutivas.',
          },
        ],
      },
      fighter2: {
        nome: 'You',
        recent_fights: [
          {
            date: 'Nov 2025',
            opponent: 'Xiao Long',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC em Shanghai com vitoria por decisao. Controle de grappling dominante, mas nao conseguiu finalizar.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Terrance Cunningham',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria no UFC por decisao. Mesmo padrao: grappling sufocante sem finalizacao no nivel UFC.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Baergeng',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'Road to UFC',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Venceu a final do Road to UFC com performance dominante de controle. Campeao do torneio, garantindo vaga no plantel.',
          },
          {
            date: 'Set 2024',
            opponent: 'Amangeldy',
            result: 'W',
            method: 'Decisao (Titulo Naiza FC)',
            opponent_rank: 'Regional',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Conquistou titulo regional na Naiza FC. Dominancia no grappling contra competicao limitada do circuito asiatico.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Ishizuka',
            result: 'W',
            method: 'Decisao (Titulo DEEP)',
            opponent_rank: 'Regional',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Titulo do DEEP no Japao por decisao. Campeonato respeitado mas nivel inferior ao plantel UFC. Faixa preta de BJJ em acao.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 75,
          valueB: 35,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Smith produz 4.45 SLpM com poder explosivo real, incluindo um nocaute por slam historico. You tem apenas 1 KO em 16 vitorias e prefere evitar trocacao prolongada. Vantagem enorme na distancia.',
        },
        {
          label: 'Grappling Ofensivo',
          valueA: 60,
          valueB: 82,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'You e faixa preta de BJJ com 5 submissoes e media de 2:07 de controle por round. Seu apelido "You-Jitsu" resume a identidade: grappling sufocante e persistente. Smith tambem busca takedowns (3.51/15min) mas sem o jiu-jitsu refinado.',
        },
        {
          label: 'Defesa de Takedown',
          valueA: 55,
          valueB: 20,
          labelA: 'Medio',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Smith defende 57% dos takedowns, numero mediocre mas funcional. You registra 0% de defesa de takedown no UFC, dado alarmante que sugere vulnerabilidade total quando colocado de costas.',
        },
        {
          label: 'Atletismo e Explosao',
          valueA: 88,
          valueB: 55,
          labelA: 'Excelente',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Com 23 anos, Smith e um atleta fenomenal. Filho do veterano UFC Gilbert Smith, carrega genetica de elite. O slam KO contra Kazama (15o na historia do UFC) prova explosao fisica acima do comum.',
        },
        {
          label: 'Controle de Distancia',
          valueA: 72,
          valueB: 38,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Smith tem 6 polegadas a mais de envergadura (71" vs 65"), vantagem massiva para manter distancia com jabs e diretos longos. You precisa entrar no corpo a corpo para aplicar seu jogo, e essa diferenca dificulta demais.',
        },
        {
          label: 'Experiencia UFC',
          valueA: 35,
          valueB: 50,
          labelA: 'Medio',
          labelB: 'Medio',
          advantage: 'fighter2',
          advantage_note: 'Ambos sao novatos no UFC, mas You tem 19 lutas profissionais contra 10 de Smith. A experiencia em torneios como Road to UFC e titulos regionais (DEEP, Naiza FC) da uma ligeira maturidade competitiva.',
        },
      ],
      insight: 'Smith domina em 4 das 6 categorias com vantagens claras no striking, atletismo e controle de distancia. You compensa com grappling ofensivo de elite e leve vantagem em experiencia, mas sua defesa de takedown alarmante (0% no UFC) e falta de finalizacao no octogono sao vulnerabilidades serias contra um atleta tao explosivo quanto Smith.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Smith',
        ko_tko: { count: 5, percent: 56 },
        submission: { count: 1, percent: 11 },
        decision: { count: 3, percent: 33 },
        total_wins: 9,
      },
      fighter2: {
        nome: 'You',
        ko_tko: { count: 1, percent: 6 },
        submission: { count: 5, percent: 31 },
        decision: { count: 10, percent: 63 },
        total_wins: 16,
      },
      insight: 'Perfis completamente opostos. Smith e um finalizador nato com 56% das vitorias por KO/TKO, incluindo o memoravel slam contra Kazama. Apenas 1 das 16 vitorias de You veio por nocaute, com 63% por decisao e 31% por submissao. Smith quer encerrar cedo, You quer controlar e acumular rounds. A luta sera definida por quem consegue impor seu ritmo.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Smith',
      winner_side: 'fighter1',
      predicted_method: 'TKO R2',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Smith e o favorito claro nessa luta, e as odds de -250 refletem isso com precisao. Sua vantagem de 6 polegadas de envergadura permite controlar a distancia contra um grappler que precisa desesperadamente entrar no corpo a corpo. O atletismo explosivo de Smith, combinado com 4.45 SLpM e poder de nocaute real (56% de vitorias por KO), cria um problema imenso para You na trocacao. You vai tentar transformar isso em uma luta de grappling, mas sua precisao de takedown de 46.7% contra a defesa de 57% de Smith nao garante controle do chao. O ponto mais critico: You nao finalizou ninguem no UFC ate agora, vencendo por decisao em suas duas aparicoes. Contra um atleta tao perigoso quanto Smith, controlar sem finalizar e arriscado. Smith deve usar jabs longos, ameacas de takedown proprias e explosoes atleticas para dominar a trocacao e encontrar a finalizacao no segundo round.',
      x_factor: {
        title: 'O legado de Gilbert Smith',
        description: 'Elijah e filho do veterano UFC Gilbert Smith, crescendo dentro do esporte e treinando desde crianca. Aos 23 anos, esta em sequencia de 7 vitorias e ja produziu um dos nocautes mais espetaculares da historia recente do UFC (slam KO, 15o da historia). Essa combinacao de genetica, ambiente e juventude cria um teto absurdamente alto.',
      },
      upset_alert: {
        title: 'O jiu-jitsu de You no chao',
        description: 'Se You conseguir encaixar o takedown e chegar as costas de Smith, tudo muda. Com faixa preta de BJJ e 5 submissoes na carreira, You e letal no chao. A defesa de takedown de Smith (57%) nao e elite, e se You sobreviver ao striking inicial e arrastar a luta para o grappling, pode estrangular o favorito. O caminho para a surpresa passa exclusivamente pelo jiu-jitsu.',
      },
      probabilities: {
        fighter1: { nome: 'Smith', percent: 68 },
        fighter2: { nome: 'You', percent: 30 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
