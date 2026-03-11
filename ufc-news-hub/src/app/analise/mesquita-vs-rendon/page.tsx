import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'mesquita-vs-rendon',
  evento_id: null,
  slug: 'mesquita-vs-rendon',
  titulo: 'Mesquita vs Rendon',
  subtitulo: null,
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '5\'4"', envergadura: 'N/D', idade: 34, academia: 'American Top Team' },
      fighter2: { altura: '5\'8"', envergadura: '68"', idade: 34, academia: 'ECR Fight Center' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'Finalizacao R2',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: 'Grappling historico', description: 'Mesquita e a maior campeao da historia do jiu-jitsu feminino, com 10 titulos mundiais IBJJF no faixa preta. Comecou a treinar aos 5 anos de idade. Esse nivel de expertise no chao nao tem paralelo na divisao.' },
  },
  fighter1_info: {
    nome: 'Bia Mesquita',
    record: '6-0-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Irina Alekseeva', method: 'Sub R2 (RNC)', event: 'UFC Fight Night 261' },
      { result: 'W', opponent: 'Sierra Dinwoodie', method: 'TKO R2', event: 'LFA 211' },
      { result: 'W', opponent: 'Hope Chase', method: 'DQ R2', event: 'LFA 203' },
    ],
  },
  fighter2_info: {
    nome: 'Montserrat Rendon',
    record: '7-1-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Alice Pereira', method: 'Dec Dividida', event: 'Noche UFC' },
      { result: 'L', opponent: 'Daria Zhelezniakova', method: 'Dec Unanime', event: 'UFC on ESPN 53' },
      { result: 'W', opponent: 'Tamires Vidal', method: 'Dec Dividida', event: 'UFC Fight Night' },
    ],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Galo Feminino',
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
      categoria_peso: 'Peso Galo Feminino (135 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Mesquita',
        record: '6-0-0',
      },
      fighter2: {
        nome: 'Rendon',
        record: '7-1-0',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.50,
          valueB: 4.60,
          maxVal: 7,
          format: 'decimal',
          note: 'Rendon tem volume de strikes superior. Com 4.6 SLpM, ela produz mais de um strike a mais por minuto na trocacao.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 39,
          valueB: 37,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao baixa para ambas, abaixo dos 40%. Nenhuma das duas e sniper na trocacao.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 5.03,
          valueB: 4.20,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Mesquita absorveu bastante no debut, mas dominou no chao. Numero inflado por amostra de apenas uma luta no UFC.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 46,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de strikes similar. Ambas abaixo dos 50%, area vulneravel para as duas.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 4.50,
          valueB: 3.00,
          maxVal: 6,
          format: 'decimal',
          note: 'Mesquita vive de takedowns. Derrubou Alekseeva multiplas vezes. Rendon tambem busca quedas com frequencia (3.0/15min).',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 66,
          valueB: 60,
          maxVal: 100,
          format: 'percent',
          note: 'Ambas acima dos 60% de precisao. Essa luta pode ir para o chao rapidamente com duas grapplers ativas.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 60,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de takedown moderada para ambas. Mesquita com leve vantagem, crucial se Rendon tentar levar para o chao.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '34 anos',
          fighter2: '34 anos',
          note: 'Mesma idade, ambas veteranas entrando no prime do MMA',
        },
        {
          label: 'Altura',
          fighter1: '1,63m (5\'4")',
          fighter2: '1,73m (5\'8")',
          note: 'Rendon com 10cm de vantagem na altura, significativo para manter distancia',
        },
        {
          label: 'Envergadura',
          fighter1: 'N/D',
          fighter2: '173cm (68")',
          note: 'Rendon com envergadura conhecida de 68 polegadas, vantagem provavel no alcance',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: null,
        },
        {
          label: 'Academia',
          fighter1: 'American Top Team',
          fighter2: 'ECR Fight Center',
          note: 'Mesquita treina com Pantoja na ATT, uma das melhores academias do mundo',
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Mesquita',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Irina Alekseeva',
            result: 'W',
            method: 'Sub R2 (Rear-Naked Choke)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Debut no UFC impressionante. Derrubou Alekseeva rapidamente, montou e dominou ate finalizar com mata-leao no segundo round. Performance da Noite.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Sierra Dinwoodie',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Conquistou o cinturao peso-galo do LFA com nocaute tecnico. Mostrou evolucao no striking para alguem que veio do jiu-jitsu.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Hope Chase',
            result: 'W',
            method: 'DQ R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por desqualificacao da oponente no LFA. Mesquita dominava completamente antes da infracao.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Fernanda Araujo',
            result: 'W',
            method: 'Sub R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Mais uma finalizacao no LFA. Padrao de dominancia total no chao contra oposicao de nivel regional.',
          },
          {
            date: 'Out 2024',
            opponent: 'Shannel Butler',
            result: 'W',
            method: 'Sub R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao rapida no primeiro round pelo LFA. Butler nao teve chance alguma no chao contra a decacampea mundial.',
          },
        ],
      },
      fighter2: {
        nome: 'Rendon',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Alice Pereira',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria apertada por split decision no Noche UFC. Usou experiencia para superar estreante, mas nao convenceu.',
          },
          {
            date: 'Mar 2024',
            opponent: 'Daria Zhelezniakova',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Derrota clara por decisao unanime. Zhelezniakova controlou o ritmo da luta e Rendon nao conseguiu impor seu jogo de pressao.',
          },
          {
            date: 'Set 2023',
            opponent: 'Tamires Vidal',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Debut no UFC com vitoria apertada por split decision. Luta equilibrada contra a brasileira que poderia ter ido para qualquer lado.',
          },
          {
            date: 'Abr 2023',
            opponent: 'Jazmyne Dillon',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria dominante por decisao unanime no Combate Global antes de assinar com o UFC.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 35,
          valueB: 50,
          labelA: 'Medio',
          labelB: 'Medio',
          advantage: 'fighter2',
          advantage_note: 'Rendon tem volume maior (4.6 SLpM), mais experiencia em trocacao no UFC e vantagem de alcance. Mesquita comecou o MMA tarde e nao e natural na trocacao.',
        },
        {
          label: 'Jiu-Jitsu / Finalizacoes',
          valueA: 98,
          valueB: 55,
          labelA: 'Excelente',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: '10 titulos mundiais IBJJF no faixa preta. Comecou a treinar jiu-jitsu aos 5 anos. A maior campeao da historia do jiu-jitsu feminino contra uma faixa roxa de 12 campeonatos nacionais. Abismo tecnico.',
        },
        {
          label: 'Wrestling / Takedowns',
          valueA: 75,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Mesquita derrubou Alekseeva com facilidade no debut. Rendon tambem busca takedowns (60% acc, 3.0/15min) mas nao tem a mesma fluidez de transicao.',
        },
        {
          label: 'Controle no Chao',
          valueA: 95,
          valueB: 55,
          labelA: 'Excelente',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Mesquita montou e controlou Alekseeva por minutos no debut. Seu controle posicional e de outro nivel, com 3 decadas de experiencia no tatame.',
        },
        {
          label: 'Cardio / Resistencia',
          valueA: 60,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Rendon ja lutou tres rounds em todas as suas lutas no UFC e manteve ritmo constante. Mesquita nunca viu o terceiro round na carreira, finalizando antes.',
        },
        {
          label: 'Experiencia no UFC',
          valueA: 28,
          valueB: 55,
          labelA: 'Ruim',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Rendon tem 3 lutas no UFC, todas de 3 rounds. Mesquita fez apenas uma luta no octogono, e nunca passou do segundo round na carreira inteira.',
        },
      ],
      insight: 'A vantagem de Mesquita no grappling e historica, literalmente a maior campeao mundial do jiu-jitsu feminino. Rendon compensa com mais experiencia no octogono, volume de strikes superior e a dureza de quem nunca foi finalizada. A questao central: Rendon consegue manter a luta em pe por 15 minutos?',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Mesquita',
        ko_tko: { count: 1, percent: 17 },
        submission: { count: 4, percent: 66 },
        decision: { count: 1, percent: 17 },
        total_wins: 6,
      },
      fighter2: {
        nome: 'Rendon',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 0, percent: 0 },
        decision: { count: 7, percent: 100 },
        total_wins: 7,
      },
      insight: 'O contraste nao poderia ser mais extremo. Mesquita finaliza 83% das suas lutas (KO/TKO ou submissao), com 4 submissoes em 6 vitorias, reflexo direto dos seus 10 titulos mundiais de jiu-jitsu. Rendon NUNCA finalizou ninguem na carreira profissional, vencendo 100% das vezes por decisao dos juizes. Se a luta for para o chao, Mesquita tem uma vantagem de finalizacao que Rendon simplesmente nao possui.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Mesquita',
      winner_side: 'fighter1',
      predicted_method: 'Finalizacao R2',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Mesquita possui o melhor jiu-jitsu de toda a divisao peso-galo feminino, com credenciais que nenhuma outra atleta do plantel pode sequer se aproximar. Dez titulos mundiais IBJJF, treino na American Top Team ao lado de Pantoja, e um debut no UFC onde dominou e finalizou sem dificuldade. Rendon e dura, competitiva e nunca foi finalizada, mas nunca enfrentou uma grappler desse calibre. A brasileira deve conseguir o takedown no primeiro ou segundo round e progredir ate encontrar a finalizacao, provavelmente com um estrangulamento depois de tomar as costas.',
      x_factor: {
        title: '30 anos de jiu-jitsu contra 0 finalizacoes',
        description: 'Mesquita treina jiu-jitsu desde os 5 anos de idade e acumulou 10 titulos mundiais IBJJF no faixa preta. Rendon nunca finalizou ninguem em 8 lutas profissionais. Quando a luta for para o chao, sera como uma partida de xadrez entre uma grande mestre e uma amadora.',
      },
      upset_alert: {
        title: 'Tamanho, volume e experiencia no octogono',
        description: 'Rendon tem 4 polegadas de vantagem na altura, 68 polegadas de envergadura, e 4.6 strikes por minuto. Com 3 lutas no UFC contra apenas 1 de Mesquita, a mexicana sabe como usar o octogono. Se ela conseguir manter distancia com jabs e front kicks e evitar o clinch, pode frustrar a brasileira e buscar mais uma decisao dividida.',
      },
      probabilities: {
        fighter1: { nome: 'Mesquita', percent: 70 },
        fighter2: { nome: 'Rendon', percent: 28 },
        draw: 2,
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
