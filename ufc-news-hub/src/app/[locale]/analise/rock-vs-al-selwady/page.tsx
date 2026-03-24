'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'rock-vs-al-selwady',
  evento_id: null,
  slug: 'rock-vs-al-selwady',
  titulo: 'Rock vs Al-Selwady',
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
    predictedMethod: 'KO/TKO R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Shem Rock',
    record: '12-2-1',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Abdul-Kareem Al-Selwady',
    record: '15-4-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Leve (155 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'prelims',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  prelims_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: '21 de Marco, 2026',
      categoria_peso: 'Peso Leve (155 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Rock',
        record: '12-2-1',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Al-Selwady',
        record: '15-4-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 2.10,
          valueB: 4.85,
          maxVal: 7,
          format: 'decimal',
          note: 'Al-Selwady tem mais que o dobro do volume de strikes, Rock depende do grappling',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 35,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Rock conecta apenas 35% dos golpes, indicando striking inferior',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.20,
          valueB: 3.90,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Rock absorveu muitos golpes na derrota para Aliev, falta de defesa em pe',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 42,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 2.80,
          valueB: 0.90,
          maxVal: 5,
          format: 'decimal',
          note: 'Rock precisa dos takedowns para impor seu jiu-jitsu de nivel mundial',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 38,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 72,
          valueB: 75,
          maxVal: 100,
          format: 'percent',
          note: 'Al-Selwady defende bem takedowns, pode frustrar o plano de jogo de Rock',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '30 anos', note: null },
        { label: 'Altura', fighter1: '1,80m (5\'11")', fighter2: '1,73m (5\'8")', note: 'Rock tem 7cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '185cm (73")', fighter2: '175cm (69")', note: 'Rock tem 4 polegadas a mais de envergadura' },
        { label: 'Stance', fighter1: 'Canhoto', fighter2: 'Ortodoxo', note: 'Dinamica southpaw vs ortodoxo' },
        { label: 'Academia', fighter1: 'Next Generation MMA / Liverpool, Inglaterra', fighter2: 'Fortis MMA / Dallas, EUA', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Rock',
        recent_fights: [
          {
            date: 'Nov 2025',
            opponent: 'Nurullo Aliev',
            result: 'L',
            method: 'Decisao Unanime (30-27 x3)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC dominada por Aliev. Nao conseguiu impor o grappling e foi superado em pe por 3 rounds.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Attila Korkmaz',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao dividida no Oktagon MMA 71, mostrando capacidade de lutar 3 rounds completos.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Jaroslav Pokorny',
            result: 'W',
            method: 'Sub R1 (mata-leao)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao tecnica por mata-leao no primeiro round no Oktagon MMA 58.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Stefano Catacoli',
            result: 'W',
            method: 'Sub R1 (mata-leao)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Mais uma finalizacao por mata-leao no primeiro round no Oktagon MMA 56.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Jan Malach',
            result: 'W',
            method: 'Sub R1 (mata-leao)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao por mata-leao no Oktagon MMA 45, terceira consecutiva por submissao.',
          },
        ],
      },
      fighter2: {
        nome: 'Al-Selwady',
        recent_fights: [
          {
            date: 'Mar 2024',
            opponent: 'Loik Radzhabov',
            result: 'L',
            method: 'KO R3 (0:49)',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Nocauteado no inicio do terceiro round na estreia do UFC. Luta que estava competitiva ate o golpe fatal. Ficou inativo desde entao com duas lutas canceladas.',
          },
          {
            date: 'Ago 2023',
            opponent: 'George Hardwick',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria por decisao unanime no DWCS, garantiu contrato com o UFC vencendo um prospecto forte.',
          },
          {
            date: 'Fev 2023',
            opponent: 'Micheal Murphy',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao unanime em luta de 5 rounds no Fury FC 75.',
          },
          {
            date: 'Set 2022',
            opponent: 'Chris Pecero',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'TKO no primeiro round no Fury FC 69, finalizacao por socos.',
          },
          {
            date: 'Fev 2022',
            opponent: 'Nick Compton',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao unanime no Fury FC 58, parte da sequencia de 5 vitorias antes do DWCS.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 38,
          valueB: 75,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Al-Selwady vem do kickboxing com todos os titulos nacionais da Jordania. Rock e limitado em pe, apenas 35% de precisao.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 30,
          valueB: 78,
          labelA: 'Ruim',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Al-Selwady tem 8 KOs em 15 vitorias (53%). Rock tem apenas 2 KOs na carreira, seu jogo nao e baseado em poder.',
        },
        {
          label: 'Jiu-Jitsu e Submissao',
          valueA: 92,
          valueB: 40,
          labelA: 'Excelente',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Rock e especialista em jiu-jitsu com 9 finalizacoes, incluindo 7 por mata-leao ou variacao. Grappling de nivel mundial.',
        },
        {
          label: 'Wrestling e Takedowns',
          valueA: 55,
          valueB: 50,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Rock precisa do takedown para ganhar. Tem volume alto de tentativas mas precisao de 38%. Tudo depende de conseguir levar ao chao.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 65,
          valueB: 58,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Rock mantem pressao constante buscando o clinch. Al-Selwady foi nocauteado no R3 por Radzhabov, possivel sinal de fadiga tardia.',
        },
        {
          label: 'Experiencia no UFC',
          valueA: 30,
          valueB: 50,
          labelA: 'Ruim',
          labelB: 'Medio',
          advantage: 'fighter2',
          advantage_note: 'Al-Selwady tem 1 luta no UFC (0V-1D) mas muito mais experiencia profissional (15-4). Rock tambem perdeu a unica luta no Octagon de forma dominante.',
        },
      ],
      insight: 'Luta classica de striker vs grappler. Al-Selwady quer manter em pe onde tem vantagem esmagadora. Rock precisa desesperadamente do takedown para usar seu jiu-jitsu de nivel mundial. Se Rock encostar, e perigoso demais no chao. Se Al-Selwady manter distancia, pode dominar em pe.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Rock',
        ko_tko: { count: 2, percent: 17 },
        submission: { count: 9, percent: 75 },
        decision: { count: 1, percent: 8 },
        total_wins: 12,
      },
      fighter2: {
        nome: 'Al-Selwady',
        ko_tko: { count: 8, percent: 53 },
        submission: { count: 2, percent: 13 },
        decision: { count: 5, percent: 34 },
        total_wins: 15,
      },
      insight: 'Perfis completamente opostos. Rock vence 75% das lutas por finalizacao, um especialista puro de submissao. Al-Selwady vence 53% por nocaute, um striker nato. Se Rock conseguir o takedown, a finalizacao provavelmente vem. Se Al-Selwady manter distancia, o nocaute e questao de tempo.',
    },

    previsao_final: {
      winner_name: 'Al-Selwady',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Al-Selwady tem vantagem clara no striking com volume, precisao e poder de nocaute significativamente superiores. Rock foi completamente dominado em pe na sua estreia no UFC contra Aliev, mostrando que a transicao do grappling puro para o MMA de alto nivel ainda nao esta completa. Al-Selwady tem defesa de takedown de 75%, o que dificulta o plano de jogo de Rock. Porem, o jiu-jitsu de Rock e genuinamente de elite e uma unica queda pode mudar tudo. Rock luta em casa em territorio britanico, o que da confianca extra.',
      x_factor: {
        title: 'O jiu-jitsu de nivel mundial de Rock',
        description: 'Com 9 finalizacoes na carreira, 7 delas por mata-leao ou variacao, Rock e provavelmente o melhor grappler da divisao. Se encostar e levar ao chao, Al-Selwady esta em perigo real. Uma unica queda pode decidir a luta.',
      },
      upset_alert: {
        title: 'Rock pode surpreender com o fator casa',
        description: 'Rock luta em casa na O2 Arena em Londres e a torcida britanica vai empurrar o ingles. Se conseguir sobreviver ao striking inicial e impor o clinch contra a grade, seu jiu-jitsu pode ser decisivo. Al-Selwady foi nocauteado no R3 antes.',
      },
      probabilities: {
        fighter1: { nome: 'Rock', percent: 38 },
        fighter2: { nome: 'Al-Selwady', percent: 60 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Al-Selwady (-135)', reasoning: 'Favorito leve com volume de striking superior (4.14/min). Multi-campeao regional com background diverso. O preco e justo pra uma luta equilibrada.' },
        method: { pick: 'Al-Selwady por TKO R2', reasoning: 'Al-Selwady acumula dano com volume de strikes. Rock tem output baixo em pe e precisa do takedown pra ser perigoso. Se nao conseguir derrubar, o acumulo de dano leva ao TKO tardio.' },
        over_under: { pick: 'Over 1.5 Rounds', rounds: 1.5, reasoning: 'Ambos perderam suas estreias e sao cautelosos. Rock vai tentar impor grappling, Al-Selwady vai manter em pe. A dinamica favorece uma luta que passa do R1.' },
        best_value: 'Over 1.5 rounds e a aposta mais segura. Luta equilibrada entre dois caras buscando a primeira vitoria UFC, nenhum dos dois vai se arriscar cedo.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Lightweight (155 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: 'Lightweight (155 lbs)' },
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 2.10, valueB: 4.85, maxVal: 7, format: 'decimal', note: 'Al-Selwady has more than double the strike volume, Rock relies on grappling' },
      { label: 'Striking Accuracy (%)', valueA: 35, valueB: 48, maxVal: 100, format: 'percent', note: 'Rock lands just 35% of strikes, indicating inferior striking' },
      { label: 'Strikes Absorbed/Min', valueA: 4.20, valueB: 3.90, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Rock absorbed many strikes in the loss to Aliev, lacking stand-up defense' },
      { label: 'Strike Defense (%)', valueA: 42, valueB: 50, maxVal: 100, format: 'percent' },
      { label: 'Takedowns Per 15 Min', valueA: 2.80, valueB: 0.90, maxVal: 5, format: 'decimal', note: 'Rock needs takedowns to impose his world-class jiu-jitsu' },
      { label: 'Takedown Accuracy (%)', valueA: 38, valueB: 40, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 72, valueB: 75, maxVal: 100, format: 'percent', note: 'Al-Selwady defends takedowns well, could frustrate Rock\'s gameplan' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '32 years old', fighter2: '30 years old', note: null },
      { label: 'Height', fighter1: '5\'11" (1.80m)', fighter2: '5\'8" (1.73m)', note: 'Rock has a 7cm height advantage' },
      { label: 'Reach', fighter1: '73" (185cm)', fighter2: '69" (175cm)', note: 'Rock has 4 inches more reach' },
      { label: 'Stance', fighter1: 'Southpaw', fighter2: 'Orthodox', note: 'Southpaw vs orthodox dynamic' },
      { label: 'Gym', fighter1: 'Next Generation MMA / Liverpool, England', fighter2: 'Fortis MMA / Dallas, USA', note: null },
    ] },
    historico_lutas: {
      fighter1: { nome: 'Rock', recent_fights: [
        { date: 'Nov 2025', opponent: 'Nurullo Aliev', result: 'L', method: 'Unanimous Decision (30-27 x3)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut dominated by Aliev. Couldn\'t impose his grappling and was outclassed on the feet for 3 rounds.' },
        { date: 'May 2025', opponent: 'Attila Korkmaz', result: 'W', method: 'Split Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Split decision win at Oktagon MMA 71, showed the ability to fight 3 full rounds.' },
        { date: 'Jun 2024', opponent: 'Jaroslav Pokorny', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Technical rear-naked choke submission in the first round at Oktagon MMA 58.' },
        { date: 'Apr 2024', opponent: 'Stefano Catacoli', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Another rear-naked choke in the first round at Oktagon MMA 56.' },
        { date: 'Jul 2023', opponent: 'Jan Malach', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Rear-naked choke at Oktagon MMA 45, third consecutive submission.' },
      ] },
      fighter2: { nome: 'Al-Selwady', recent_fights: [
        { date: 'Mar 2024', opponent: 'Loik Radzhabov', result: 'L', method: 'KO R3 (0:49)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'Knocked out early in the third round on his UFC debut. Fight was competitive until the fatal blow. Been inactive since with two canceled bouts.' },
        { date: 'Aug 2023', opponent: 'George Hardwick', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Unanimous decision win on DWCS, earned UFC contract by beating a strong prospect.' },
        { date: 'Feb 2023', opponent: 'Micheal Murphy', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Unanimous decision win in a 5-round fight at Fury FC 75.' },
        { date: 'Sep 2022', opponent: 'Chris Pecero', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round TKO at Fury FC 69, finish by punches.' },
        { date: 'Feb 2022', opponent: 'Nick Compton', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Unanimous decision at Fury FC 58, part of 5-fight win streak before DWCS.' },
      ] },
    },
    perfil_habilidades: { skills: [
      { label: 'Stand-up Striking', valueA: 38, valueB: 75, labelA: 'Average', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Al-Selwady comes from kickboxing with all Jordanian national titles. Rock is limited on the feet, just 35% accuracy.' },
      { label: 'Knockout Power', valueA: 30, valueB: 78, labelA: 'Poor', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Al-Selwady has 8 KOs in 15 wins (53%). Rock has just 2 career KOs, his game isn\'t based on power.' },
      { label: 'Jiu-Jitsu & Submissions', valueA: 92, valueB: 40, labelA: 'Excellent', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Rock is a jiu-jitsu specialist with 9 submissions, including 7 by RNC or variation. World-class grappling.' },
      { label: 'Wrestling & Takedowns', valueA: 55, valueB: 50, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Rock needs the takedown to win. Has high volume of attempts but just 38% accuracy. Everything depends on getting it to the ground.' },
      { label: 'Cardio & Pace', valueA: 65, valueB: 58, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Rock maintains constant pressure seeking the clinch. Al-Selwady was KO\'d in R3 by Radzhabov, possible sign of late fatigue.' },
      { label: 'UFC Experience', valueA: 30, valueB: 50, labelA: 'Poor', labelB: 'Average', advantage: 'fighter2', advantage_note: 'Al-Selwady has 1 UFC fight (0W-1L) but much more professional experience (15-4). Rock also lost his only octagon fight dominantly.' },
    ], insight: 'A classic striker vs grappler matchup. Al-Selwady wants to keep it standing where he has an overwhelming advantage. Rock desperately needs the takedown to use his world-class jiu-jitsu. If Rock gets a grip, he\'s too dangerous on the ground. If Al-Selwady maintains distance, he can dominate on the feet.' },
    distribuicao_vitorias: {
      fighter1: { nome: 'Rock', ko_tko: { count: 2, percent: 17 }, submission: { count: 9, percent: 75 }, decision: { count: 1, percent: 8 }, total_wins: 12 },
      fighter2: { nome: 'Al-Selwady', ko_tko: { count: 8, percent: 53 }, submission: { count: 2, percent: 13 }, decision: { count: 5, percent: 34 }, total_wins: 15 },
      insight: 'Completely opposite profiles. Rock wins 75% by submission, a pure submission specialist. Al-Selwady wins 53% by knockout, a natural striker. If Rock gets the takedown, the submission is likely coming. If Al-Selwady keeps distance, the knockout is a matter of time.',
    },
    previsao_final: {
      winner_name: 'Al-Selwady', winner_side: 'fighter2', predicted_method: 'KO/TKO R2', confidence_score: 6, confidence_label: 'MEDIUM',
      explanation: 'Al-Selwady has a clear striking advantage with significantly superior volume, accuracy, and knockout power. Rock was completely dominated on the feet in his UFC debut against Aliev, showing that his transition from pure grappling to high-level MMA isn\'t complete yet. Al-Selwady has 75% takedown defense, which complicates Rock\'s gameplan. However, Rock\'s jiu-jitsu is genuinely elite and a single takedown can change everything. Rock fights at home on British soil, which gives him extra confidence.',
      x_factor: { title: 'Rock\'s world-class jiu-jitsu', description: 'With 9 career submissions, 7 of them by RNC or variation, Rock is probably the best grappler in the division. If he gets a grip and takes it down, Al-Selwady is in real danger. A single takedown can decide the fight.' },
      upset_alert: { title: 'Rock could surprise with the home factor', description: 'Rock fights at home in the O2 Arena in London and the British crowd will push the Brit. If he can survive the initial striking and impose the clinch against the cage, his jiu-jitsu could be decisive. Al-Selwady was KO\'d in R3 before.' },
      probabilities: { fighter1: { nome: 'Rock', percent: 38 }, fighter2: { nome: 'Al-Selwady', percent: 60 }, draw: 2 },
      value_picks: undefined,
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  const analise = lang === 'en' ? analiseEN : analisePT;
  return <PrelimsAnalysisView analise={analise} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
