import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'tavares-vs-anders',
  evento_id: null,
  slug: 'tavares-vs-anders',
  titulo: 'Tavares vs Anders',
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
    nome: 'Brad Tavares',
    record: '21-12-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Eryk Anders',
    record: '17-9-0, 1 NC',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Medio',
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
      categoria_peso: 'Peso Medio',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Tavares',
        record: '21-12-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Anders',
        record: '17-9-0, 1 NC',
        ranking: undefined,
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.42,
          valueB: 3.51,
          maxVal: 6,
          format: 'decimal',
          note: 'Volume de striking praticamente identico entre os dois veteranos. Nenhum dos dois e um atirador de alto volume.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 43,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Anders conecta com 5% a mais de precisao, especialmente perigoso com a mao esquerda vindo do stance canhoto',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.36,
          valueB: 3.51,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Tavares absorve menos dano por minuto, refletindo sua defesa mais conservadora e movimentacao lateral',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 54,
          valueB: 47,
          maxVal: 100,
          format: 'percent',
          note: 'Tavares defende 7% a mais dos strikes, vantagem clara na trocacao prolongada',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.73,
          valueB: 1.75,
          maxVal: 5,
          format: 'decimal',
          note: 'Anders busca mais que o dobro de quedas, usando seu background de futebol americano para pressionar',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 26,
          valueB: 24,
          maxVal: 100,
          format: 'percent',
          note: 'Ambos com eficiencia muito baixa de takedown, abaixo de 30%. Nenhum dos dois e um wrestler dominante.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 81,
          valueB: 80,
          maxVal: 100,
          format: 'percent',
          note: 'Ambos com defesa de takedown excelente acima de 80%. A luta provavelmente fica em pe.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '38 anos',
          fighter2: '38 anos',
          note: 'Ambos veteranos de 38 anos, carreiras na fase final',
        },
        {
          label: 'Altura',
          fighter1: '1,85m (6\'1")',
          fighter2: '1,85m (6\'1")',
          note: 'Mesma altura, sem vantagem para nenhum dos lados',
        },
        {
          label: 'Envergadura',
          fighter1: '188cm (74")',
          fighter2: '190cm (75")',
          note: 'Anders com 1 polegada a mais de alcance, vantagem minima',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxo',
          fighter2: 'Canhoto',
          note: 'Dinamica ortodoxo vs canhoto cria angulos para ambos',
        },
        {
          label: 'Academia',
          fighter1: 'Xtreme Couture / HQ MMA Hawaii',
          fighter2: 'Fight Ready MMA / Spartan Fitness',
          note: null,
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Tavares',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Robert Bryczek',
            result: 'L',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Parado por strikes no terceiro round contra jovem polones em ascensao. Mostrou sinais de desgaste fisico.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Gerald Meerschaert',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria solida que igualou o recorde de Michael Bisping com 16 vitorias no peso medio do UFC.',
          },
          {
            date: 'Out 2024',
            opponent: 'Junyong Park',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota apertada por split decision contra sul-coreano. Luta muito equilibrada que poderia ter ido para qualquer lado.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Gregory Rodrigues',
            result: 'L',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Parado no terceiro round pelo Robocop. Padrao preocupante de finalizacoes sofridas no R3.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Chris Weidman',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Dominou o ex-campeao Weidman com jab e controle de distancia por tres rounds no UFC 292.',
          },
        ],
      },
      fighter2: {
        nome: 'Anders',
        recent_fights: [
          {
            date: 'Ago 2025',
            opponent: 'Christian Leroy Duncan',
            result: 'L',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Nocauteado no primeiro round por cotovelazo giratoria e ground and pound. Derrota brutal.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Chris Weidman',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Nocauteou o ex-campeao Weidman no UFC 310 com ground and pound no segundo round.',
          },
          {
            date: 'Mar 2024',
            opponent: 'Jamie Pickett',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao sobre adversario de nivel inferior. Performance sem brilho.',
          },
          {
            date: 'Jun 2023',
            opponent: 'Marc-Andre Barriault',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota por decisao em luta premiada como Luta da Noite. Competitiva do inicio ao fim.',
          },
          {
            date: 'Dez 2022',
            opponent: 'Kyle Daukaus',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute devastador no segundo round, mostrando o poder que o torna perigoso em qualquer momento.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking Tecnico',
          valueA: 70,
          valueB: 60,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Tavares e mais tecnico com jab, combinacoes e movimentacao lateral. Trabalha melhor na media e longa distancia.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 45,
          valueB: 80,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Anders tem 10 nocautes em 17 vitorias (59%). Poder legitimo, especialmente na mao esquerda cruzada do canhoto.',
        },
        {
          label: 'Wrestling e Controle',
          valueA: 45,
          valueB: 55,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Anders usa o background de linebacker da Universidade do Alabama para pressionar e encurtar distancia.',
        },
        {
          label: 'Defesa e Anti-Wrestling',
          valueA: 80,
          valueB: 78,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'even',
          advantage_note: 'Ambos com defesa de takedown acima de 80%. Muito dificil derrubar qualquer um dos dois.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 72,
          valueB: 50,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Tavares mantem ritmo consistente por 3 rounds. Anders tende a gastar energia cedo e cair de producao.',
        },
        {
          label: 'Durabilidade',
          valueA: 68,
          valueB: 55,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Tavares e conhecido pela durabilidade lendaria com 27+ lutas no UFC no peso medio (recorde historico). Anders vem de um KO brutal no R1.',
        },
      ],
      insight: 'A luta resume o classico confronto de volume contra poder. Tavares leva vantagem na tecnica, cardio e durabilidade, enquanto Anders compensa com poder puro de nocaute e pressao fisica. Se a luta passar do segundo round, Tavares tende a tomar controle. Anders precisa resolver cedo.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Tavares',
        ko_tko: { count: 5, percent: 24 },
        submission: { count: 2, percent: 10 },
        decision: { count: 14, percent: 66 },
        total_wins: 21,
      },
      fighter2: {
        nome: 'Anders',
        ko_tko: { count: 10, percent: 59 },
        submission: { count: 1, percent: 6 },
        decision: { count: 6, percent: 35 },
        total_wins: 17,
      },
      insight: 'Perfis de vitoria diametralmente opostos. Tavares e o rei das decisoes: 66% das suas vitorias vem nos cartoes dos juizes, acumulando rounds com volume e controle. Anders e um nocauteador nato com 59% das vitorias por KO/TKO, capaz de acabar a luta com um unico golpe. Curiosidade: ambos nocautearam Chris Weidman, mas Tavares por decisao e Anders por TKO no R2.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Tavares',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Tavares deve controlar essa luta pela gestao de distancia e acumulacao de pontos ao longo dos tres rounds. Sua defesa de takedown elite (81%) neutraliza qualquer ameaca de wrestling de Anders, e sua capacidade de absorver menos dano indica que consegue regular o ritmo sem se expor ao poder do canhoto. Com 27+ aparicoes no peso medio do UFC, a experiencia de Tavares no octogono e incomparavel. O fator cardio tambem pesa: se Anders nao resolver nos dois primeiros rounds, a tendencia e que Tavares tome conta com volume e movimentacao.',
      x_factor: {
        title: 'O Recorde Historico do Peso Medio',
        description: 'Tavares esta a uma vitoria de superar Michael Bisping como o maior vencedor da historia do peso medio do UFC. Essa motivacao historica, combinada com a experiencia de quem ja passou por praticamente tudo no octogono, pode fazer diferenca em rounds disputados.',
      },
      upset_alert: {
        title: 'A Mao Esquerda do Ya Boi',
        description: 'Anders vem de um KO brutal sofrido no R1, mas nao se engane: seu poder de nocaute (10 KOs em 17 vitorias) e real. A dinamica ortodoxo vs canhoto abre espaco para a cruzada de esquerda, e Tavares foi finalizado por TKO em duas das ultimas cinco lutas. Se Anders conectar limpo nos dois primeiros rounds, pode virar tudo.',
      },
      probabilities: {
        fighter1: { nome: 'Tavares', percent: 58 },
        fighter2: { nome: 'Anders', percent: 40 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
