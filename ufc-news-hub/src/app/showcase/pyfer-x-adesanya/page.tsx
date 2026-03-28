'use client';

import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

// ============================================================
// SHARED METADATA
// ============================================================
const sharedMeta = {
  id: 'adesanya-vs-pyfer',
  evento_id: null,
  slug: 'adesanya-vs-pyfer',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,93m', envergadura: '203cm', idade: 36, academia: 'City Kickboxing' },
      fighter2: { altura: '1,88m', envergadura: '190cm', idade: 29, academia: 'Team Balance' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1' as const,
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Israel Adesanya',
    record: '24-5-0',
    ultimasLutas: [
      { result: 'L' as const, opponent: 'Nassourdine Imavov', method: 'TKO R2', event: 'UFC Fight Night 250' },
      { result: 'L' as const, opponent: 'Dricus Du Plessis', method: 'Sub R4', event: 'UFC 305' },
      { result: 'L' as const, opponent: 'Sean Strickland', method: 'Decisao Unanime', event: 'UFC 293' },
    ],
  },
  fighter2_info: {
    nome: 'Joe Pyfer',
    record: '15-3-0',
    ultimasLutas: [
      { result: 'W' as const, opponent: 'Abusupiyan Magomedov', method: 'Sub R2', event: 'UFC 320' },
      { result: 'W' as const, opponent: 'Kelvin Gastelum', method: 'Decisao Unanime', event: 'UFC 316' },
      { result: 'W' as const, opponent: 'Marc-Andre Barriault', method: 'KO R1', event: 'UFC 303' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// ============================================================
// SHARED FIGHT HISTORY DATA
// ============================================================
const adesanyaFullHistory = [
  { date: 'Feb 2018', opponent: 'Rob Wilkinson', result: 'W' as const, method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: '' },
  { date: 'Jun 2018', opponent: 'Marvin Vettori', result: 'W' as const, method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: '' },
  { date: 'Nov 2018', opponent: 'Derek Brunson', result: 'W' as const, method: 'TKO R1', opponent_rank: '#9 MW', quality_score: 3, quality_label: 'Good', note: '' },
  { date: 'Feb 2019', opponent: 'Anderson Silva', result: 'W' as const, method: 'UD', opponent_rank: '#15 MW', quality_score: 3, quality_label: 'Good', note: '' },
  { date: 'Apr 2019', opponent: 'Kelvin Gastelum', result: 'W' as const, method: 'UD', opponent_rank: '#5 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Oct 2019', opponent: 'Robert Whittaker', result: 'W' as const, method: 'KO R2', opponent_rank: 'Champion MW', quality_score: 5, quality_label: 'Excellent', note: '' },
  { date: 'Mar 2020', opponent: 'Yoel Romero', result: 'W' as const, method: 'UD', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Sep 2020', opponent: 'Paulo Costa', result: 'W' as const, method: 'TKO R2', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Mar 2021', opponent: 'Jan Blachowicz', result: 'L' as const, method: 'UD', opponent_rank: 'Champion LHW', quality_score: 5, quality_label: 'Excellent', note: '' },
  { date: 'Jun 2021', opponent: 'Marvin Vettori', result: 'W' as const, method: 'UD', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Feb 2022', opponent: 'Robert Whittaker', result: 'W' as const, method: 'UD', opponent_rank: '#1 MW', quality_score: 5, quality_label: 'Excellent', note: '' },
  { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W' as const, method: 'UD', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L' as const, method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Apr 2023', opponent: 'Alex Pereira', result: 'W' as const, method: 'KO R2', opponent_rank: 'Champion MW', quality_score: 5, quality_label: 'Excellent', note: '' },
  { date: 'Sep 2023', opponent: 'Sean Strickland', result: 'L' as const, method: 'UD', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
  { date: 'Aug 2024', opponent: 'Dricus Du Plessis', result: 'L' as const, method: 'Sub R4', opponent_rank: 'Champion MW', quality_score: 5, quality_label: 'Excellent', note: '' },
  { date: 'Feb 2025', opponent: 'Nassourdine Imavov', result: 'L' as const, method: 'TKO R2', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Very Good', note: '' },
];

const pyferFullHistory = [
  { date: 'Aug 2022', opponent: 'Alen Amedovski', result: 'W' as const, method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: '' },
  { date: 'Mar 2023', opponent: 'Gerald Meerschaert', result: 'W' as const, method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: '' },
  { date: 'Oct 2023', opponent: 'Abdul Razak Alhassan', result: 'W' as const, method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: '' },
  { date: 'Feb 2024', opponent: 'Jack Hermansson', result: 'L' as const, method: 'UD', opponent_rank: '#12 MW', quality_score: 3, quality_label: 'Good', note: '' },
  { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W' as const, method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: '' },
  { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W' as const, method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: '' },
  { date: 'Oct 2025', opponent: 'Abusupiyan Magomedov', result: 'W' as const, method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: '' },
];

// ============================================================
// SHARED STATS
// ============================================================
const sharedStats = [
  { label: 'Sig. Strikes per Minute', valueA: 3.93, valueB: 3.72, maxVal: 6, format: 'decimal' as const },
  { label: 'Strike Accuracy (%)', valueA: 48, valueB: 41, maxVal: 100, format: 'percent' as const },
  { label: 'Strikes Absorbed/Min', valueA: 3.11, valueB: 3.48, maxVal: 6, format: 'decimal' as const, reverseWinner: true },
  { label: 'Strike Defense (%)', valueA: 56, valueB: 52, maxVal: 100, format: 'percent' as const },
  { label: 'Takedowns per 15 Min', valueA: 0.05, valueB: 1.45, maxVal: 4, format: 'decimal' as const },
  { label: 'Takedown Accuracy (%)', valueA: 14, valueB: 83, maxVal: 100, format: 'percent' as const },
  { label: 'Takedown Defense (%)', valueA: 77, valueB: 50, maxVal: 100, format: 'percent' as const },
  { label: 'Submissions per 15 Min', valueA: 0.1, valueB: 0.87, maxVal: 3, format: 'decimal' as const },
];

const sharedDistribuicao = {
  fighter1: {
    nome: 'Adesanya',
    ko_tko: { count: 16, percent: 67 },
    submission: { count: 0, percent: 0 },
    decision: { count: 8, percent: 33 },
    total_wins: 24,
  },
  fighter2: {
    nome: 'Pyfer',
    ko_tko: { count: 9, percent: 60 },
    submission: { count: 4, percent: 27 },
    decision: { count: 2, percent: 13 },
    total_wins: 15,
  },
};

const sharedOdds = {
  fighter1_odds: '-130',
  fighter2_odds: '+110',
  fighter1_name: 'Israel Adesanya',
  fighter2_name: 'Joe Pyfer',
};

const sharedProbabilities = {
  fighter1: { nome: 'Adesanya', percent: 52 },
  fighter2: { nome: 'Pyfer', percent: 45 },
  draw: 3,
};

// ============================================================
// ENGLISH ANALYSIS DATA
// ============================================================
const analise: FullSingleAnalise = {
  ...sharedMeta,
  titulo: 'Adesanya vs Pyfer: The Last Test for the Stylebender',
  subtitulo: 'The former champion looks to snap a 3-fight losing streak against the young #14 ranked knockout artist',

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: 'March 28, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Middleweight (185 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Renaissance or Retirement?',
      tagline_sub: 'Three straight losses. A hungry young contender. Izzy\'s career on the line in Seattle.',
      fighter1: {
        nome_completo: 'Israel "The Last Stylebender" Adesanya',
        apelido: 'The Last Stylebender',
        sobrenome: 'Adesanya',
        record: '24-5-0',
        ranking: '#4 Middleweight',
        info_extra: 'Auckland, New Zealand | 36 years old',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=YGc30Vwe',
      },
      fighter2: {
        nome_completo: 'Joe "Bodybagz" Pyfer',
        apelido: 'Bodybagz',
        sobrenome: 'Pyfer',
        record: '15-3-0',
        ranking: '#14 Middleweight',
        info_extra: 'Allentown, Pennsylvania | 29 years old',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=prLW4_bl',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">The Twilight of a King</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Israel Adesanya</strong> was once the most dominant middleweight in UFC history. A two-time champion whose reign included five title defenses and performances that redefined what was possible in MMA striking. Today, at 36 years old, he arrives in Seattle with three consecutive losses and a question nobody wants to ask out loud: is it over?
        </p>
        <p class="mb-4">
          The fall began in September 2023, when Sean Strickland, a massive underdog at +450, dismantled Adesanya's reign with a simple gameplan: constant pressure, jab to the face, and a total refusal to give space. Then came Dricus Du Plessis, who submitted Izzy in the fourth round at UFC 305 in Perth. And the most recent, perhaps the most painful: Nassourdine Imavov knocked Adesanya out in the second round in Saudi Arabia, in February 2025. An overhand right to the jaw, followed by a left uppercut as Izzy was falling. Brutal. Fast. Definitive.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Bodybagz: The New Wave of Middleweight</h3>
        <p class="mb-4">
          On the other side stands <strong class="text-blue-400">Joe Pyfer</strong>, 29 years old, nicknamed "Bodybagz", with a life story that rivals any movie script. He grew up homeless in Allentown, Pennsylvania, overcame an extremely difficult childhood, and channeled everything into MMA. Today, with 15 wins (9 by knockout, 4 by submission), Pyfer is one of the most dangerous prospects at middleweight. Since his loss to Jack Hermansson in February 2024, he has three straight wins, including a devastating knockout of Barriault in the first round and an impressive submission of Magomedov.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">What Is at Stake</h3>
        <p class="mb-4">
          For Adesanya, this is not just another fight. It is possibly his last chance to prove he still belongs among the elite. Four losses in the last five fights would mean, for many, the definitive sign that time has passed. For Pyfer, the opportunity is enormous. Beating a former champion with Adesanya's name, in a 5-round main event, is the kind of win that catapults a fighter from #14 to the top 10. The experience gap is absurd: Adesanya has 13 UFC fights against the best in the world. Pyfer has 7 UFC fights and has never gone 5 rounds. But in MMA, youth and raw power sometimes outweigh resumes.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#4 Middleweight', fighter2: '#14 Middleweight' },
        { dimensao: 'Streak', fighter1: '3 consecutive losses', fighter2: '3 consecutive wins' },
        { dimensao: 'Goal', fighter1: 'Snap losing streak, prove relevance', fighter2: 'Break into top 10, build name recognition' },
        { dimensao: 'Narrative', fighter1: 'Final chapter or renaissance?', fighter2: 'The young gun who topples a legend' },
        { dimensao: 'Risk', fighter1: 'Fourth straight loss, retirement pressure', fighter2: 'Loss in 5-round main event exposes inexperience' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'THE STYLEBENDER REBORN',
          subtitulo: 'Adesanya uses distance, experience and fight IQ to dominate the young Pyfer',
          consequencias: [
            { tag: 'RANKING', texto: 'Adesanya stays in the top 5 and breathes new life into his career. Becomes an option for big fights again.' },
            { tag: 'LEGACY', texto: 'Redemption narrative: the former champion who refused to quit and beat a dangerous young fighter.' },
            { tag: 'DIVISION', texto: 'Pyfer returns to being a long-term project. Loss is not disastrous given the experience gap.' },
          ],
          proxima_luta: 'Adesanya vs a top 10 opponent like Brendan Allen or Caio Borralho',
        },
        fighter2_vence: {
          titulo: 'THE NEW ERA OF MIDDLEWEIGHT',
          subtitulo: 'Pyfer knocks out the former champion and enters the top 10 radar',
          consequencias: [
            { tag: 'RANKING', texto: 'Pyfer jumps to the top 8 with a win over a former champion in the main event.' },
            { tag: 'LEGACY', texto: 'Adesanya accumulates a fourth straight loss. Retirement pressure becomes enormous.' },
            { tag: 'DIVISION', texto: 'Pyfer establishes himself as the next name to watch at middleweight, at 29 years old.' },
          ],
          proxima_luta: 'Pyfer vs a top 5 like Nassourdine Imavov or Robert Whittaker',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Israel Adesanya',
        color: 'red',
        recent_fights: [
          { date: 'Feb 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2 (punches)', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Very Good', note: 'Knocked out in the second round by an overhand right followed by an uppercut. Adesanya was doing well in the first round but got caught clean.' },
          { date: 'Aug 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Sub R4 (rear-naked choke)', opponent_rank: 'Champion MW', quality_score: 5, quality_label: 'Excellent', note: 'Competitive fight for three rounds, Adesanya dominated with body shots in R3, but Du Plessis connected in R4, took the back and finished.' },
          { date: 'Sep 2023', opponent: 'Sean Strickland', result: 'L', method: 'Unanimous Decision (49-46)', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Very Good', note: 'Historic upset. Strickland used jab and constant pressure. Adesanya could not find his rhythm at any point. Unanimous scores 49-46.' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Very Good', note: 'Adesanya was winning on the scorecards when Pereira landed a devastating left hook in R5. Third loss to Pereira counting kickboxing.' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'Unanimous Decision', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Very Good', note: 'Controlled title defense. Adesanya used distance and precise counters for 5 rounds without being threatened.' },
        ],
        full_fight_history: adesanyaFullHistory,
        layoff_warning: 'Approximately 13 months since last fight (February 2025). Moderate layoff, but coming off three losses and two recent knockouts.',
        momentum_score: 2,
        momentum_label: 'Declining',
        momentum_trend: 'descending',
        momentum_note: 'Adesanya is at the lowest point of his career. Three consecutive losses, two by knockout/TKO and one by submission. The loss to Imavov was particularly concerning because it happened fast, in the second round, against a non-champion opponent. Adesanya\'s chin, once considered elite, appears compromised at 36. His only win in the last five fights was the KO of Pereira in the rematch, in April 2023, nearly three years ago.',
      },
      fighter2: {
        nome: 'Joe Pyfer',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Sub R2 (face crank)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Impressive submission win in the second round against a dangerous striker. Showed grappling evolution.' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Dominated Gastelum with two knockdowns over three rounds. First decision win in the UFC.' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1 (1:25)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Lightning knockout in the first round. Impressive raw power.' },
          { date: 'Feb 2024', opponent: 'Jack Hermansson', result: 'L', method: 'Unanimous Decision', opponent_rank: '#12 MW', quality_score: 3, quality_label: 'Good', note: 'First 5-round fight, lost by decision. Hermansson controlled with wrestling and experience. Pyfer visibly tired in the final rounds.' },
          { date: 'Oct 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2 (arm-triangle)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Technical submission in the second round. Showed versatility beyond striking.' },
        ],
        full_fight_history: pyferFullHistory,
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Rising',
        momentum_trend: 'ascending',
        momentum_note: 'Pyfer has three consecutive wins since the Hermansson loss, showing clear evolution with each fight. He went from a pure knockout artist to someone who can win by decision (Gastelum) and submission (Magomedov). The streak is against mid-level opponents, which limits the excitement, but the technical evolution is real. At 29, he is at the ideal development stage.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Adesanya',
        media_oponentes: 5,
        media_oponentes_label: 'Excellent',
        aproveitamento: '13W-5L (72%)',
        contra_top5: '8W-4L',
      },
      fighter2: {
        nome: 'Pyfer',
        media_oponentes: 2,
        media_oponentes_label: 'Average',
        aproveitamento: '6W-1L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Kelvin Gastelum is the only relevant common opponent. Adesanya beat Gastelum in 2019 by unanimous decision in an epic 5-round fight (Fight of the Year). Pyfer beat Gastelum in 2025 by unanimous decision with two knockdowns. The 2019 Gastelum was a completely different fighter (top 5, coming off knocking out Bisping) compared to the 2025 Gastelum (unranked, in decline). The direct comparison is limited.',
    },

    oponente_comum: {
      oponente_nome: 'Kelvin Gastelum',
      fighter1_result: {
        resultado: 'Win by Unanimous Decision',
        metodo: '48-46, 48-46, 48-46',
        duracao: '5 rounds (25:00)',
        contexto: 'Considered one of the greatest fights in UFC history. Gastelum dropped Adesanya in the fourth round and nearly finished him. Adesanya recovered and dominated the fifth round to seal the interim title victory. A 25-minute war with heavy exchanges and dramatic moments in every round.',
        performance: 'Adesanya showed tremendous heart, recovery ability and elite fight IQ. Won a real war against a Gastelum who was at his peak.',
        evento: 'UFC 236',
        data: 'Apr 2019',
      },
      fighter2_result: {
        resultado: 'Win by Unanimous Decision',
        metodo: 'Scorecards not available',
        duracao: '3 rounds (15:00)',
        contexto: 'Pyfer controlled the fight with pressure, dropped Gastelum twice with power shots, and won clearly over three rounds. Gastelum offered no significant resistance and was clearly in the declining phase of his career.',
        performance: 'Pyfer showed maturity by not desperately chasing the knockout after the knockdowns, controlling the pace and winning on points. But Gastelum\'s level at this stage was far inferior to 2019.',
        evento: 'UFC 316',
        data: 'Jun 2025',
      },
      insight: 'The comparison is unfair but it exists. Adesanya faced an elite Gastelum in 2019, who dropped him and nearly finished him, and won an epic 5-round fight. Pyfer faced a declining Gastelum in 2025 and won with two knockdowns. The context is completely different, but Pyfer showed something Adesanya also showed: the power to hurt Gastelum and the intelligence not to get carried away.',
    },

    comparacao_estatistica: {
      stats: sharedStats,
      tale_of_tape: [
        { label: 'Age', fighter1: '36 years old', fighter2: '29 years old', note: 'Pyfer 7 years younger' },
        { label: 'Height', fighter1: '6\'4" (1.93m)', fighter2: '6\'2" (1.88m)', note: 'Adesanya 2 inches taller' },
        { label: 'Reach', fighter1: '80" (203cm)', fighter2: '75" (190cm)', note: 'Adesanya with 5-inch reach advantage' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
        { label: 'Gym', fighter1: 'City Kickboxing, Auckland', fighter2: 'Team Balance, Philadelphia', note: null },
        { label: 'UFC Debut', fighter1: 'February 2018', fighter2: 'August 2022', note: 'Adesanya with 4+ more years of UFC experience' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Technical Striking', valueA: 88, valueB: 62, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Adesanya is one of the most technical strikers in UFC history. World-class footwork, timing and angle variation. Pyfer is more technically limited, relying more on raw power.' },
        { label: 'Knockout Power', valueA: 72, valueB: 85, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Pyfer has 9 KOs in 15 wins (60%). Real one-punch power. Adesanya has 16 career KOs but has fewer knockout finishes in recent years.' },
        { label: 'Offensive Grappling', valueA: 25, valueB: 55, labelA: 'Poor', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Adesanya almost never attempts takedowns (0.05 per 15 min). Pyfer has 4 career submissions and averages 1.45 TDs per 15 min. Clear advantage in offensive grappling.' },
        { label: 'Takedown Defense', valueA: 80, valueB: 50, labelA: 'Very Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Adesanya with 77% career TD defense. Pyfer was dominated by Hermansson on the ground, with only 50% defense.' },
        { label: 'Cardio & Endurance', valueA: 78, valueB: 58, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Adesanya has fought 5 rounds multiple times and always maintained pace. Pyfer visibly tired in the final rounds against Hermansson, his only 5-round fight.' },
        { label: 'Fight IQ & Experience', valueA: 92, valueB: 48, labelA: 'Excellent', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Adesanya has 18 UFC fights against the best in the world, five title defenses and proven mid-fight adjustments. Pyfer has 7 UFC fights against mid-level opponents.' },
      ],
      insight: 'The matchup reveals an interesting dynamic: Adesanya is superior in nearly every technical area, especially striking, experience and cardio. But Pyfer holds the advantage in raw power and offensive grappling. The big question is not technical, it is physical: can Adesanya\'s chin still withstand Pyfer\'s power? Technically, Adesanya should dominate. Physically, Pyfer could end it at any moment.',
    },

    distribuicao_vitorias: {
      ...sharedDistribuicao,
      insight: 'Two natural finishers, but with different styles. Adesanya built 67% of his wins by knockout throughout his career, but has not finished anyone by KO in the UFC since the Pereira rematch in April 2023. Zero submissions in his entire career. Pyfer is more diversified: 60% by KO, 27% by submission, showing he can end the fight in multiple ways. The crucial difference: Pyfer finishes fights early (average of 7 minutes per fight), Adesanya historically needs time to find his timing.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 8,
          danger_label: 'PYFER ADVANTAGE',
          color: 'green',
          title: 'Dangerous Territory for Adesanya',
          description: 'The first two rounds are where Pyfer is most lethal. Of his 9 KO wins, most came in the first two rounds. Barriault fell at 1:25 of R1. Adesanya, on the other hand, was knocked out by Imavov in R2 and suffered a TKO from Pereira in R5 when caught. Adesanya\'s chin is under question, and Pyfer brings the kind of power that can exploit that weakness early. If Adesanya survives the first 10 minutes without being hurt, the dynamic changes completely.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'EVEN',
          color: 'gold',
          title: 'The Transition Round',
          description: 'The third round is where experience starts to weigh in. Pyfer has never won a fight that reached R3, except by decision against Gastelum. Adesanya, despite his bad phase, has hundreds of minutes of championship distance experience. If both reach R3 without significant damage, the round serves as a transition point, with Adesanya starting to find his timing and Pyfer starting to burn energy.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'ADESANYA ADVANTAGE',
          color: 'red',
          title: 'Championship Rounds: The Veteran\'s Territory',
          description: 'The final rounds are where Adesanya\'s experience becomes a weapon. Pyfer lost his only 5-round fight (Hermansson) and visibly tired in the final rounds. Adesanya has fought 5 rounds seven times in the UFC and always maintained his pace. If the fight gets here without a knockout, Adesanya will be the heavy favorite, with more gas, more experience and the ability to find openings against a tired opponent.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'AlertTriangle', title: 'Compromised Chin', fighter: 'Adesanya', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Adesanya was knocked out/TKO\'d in two of his last three fights (Pereira R5, Imavov R2). At 36, the ability to absorb impact naturally diminishes. Against Pyfer\'s power, this is the biggest concern of the fight.' },
        { icon: 'Clock', title: '13-Month Layoff', fighter: 'Adesanya', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Adesanya has not fought since February 2025. For a 36-year-old fighter coming off a knockout, the layoff can affect timing and reflexes. However, it also provided time for physical and mental recovery.' },
        { icon: 'TrendingUp', title: 'Three Straight Wins with Evolution', fighter: 'Pyfer', risk_level: 'POSITIVE', risk_color: 'green', description: 'Pyfer is on an ascending streak: KO, decision and submission in his last three. The diversification of methods shows maturity and real game evolution.' },
        { icon: 'Brain', title: 'Main Event Experience', fighter: 'Adesanya', risk_level: 'POSITIVE', risk_color: 'green', description: 'Adesanya has headlined 12 UFC events, including title fights against the best in the world. Pyfer has never fought in a UFC main event. The pressure of being in a 5-round main event against a name like Adesanya is completely new to him.' },
        { icon: 'Zap', title: 'Pyfer\'s Knockout Power', fighter: 'Pyfer', risk_level: 'POSITIVE', risk_color: 'green', description: 'Pyfer reportedly broke Francis Ngannou\'s punching machine record. With 60% of his wins by KO, he brings one-punch knockout power that can end the fight at any moment, especially against a questioned chin.' },
        { icon: 'Activity', title: '5-Round Cardio', fighter: 'Pyfer', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'The only time Pyfer fought 5 rounds (Hermansson), he lost and visibly tired. Against Adesanya\'s championship round pace, fatigue could be a decisive factor.' },
        { icon: 'Shield', title: 'Reach Advantage', fighter: 'Adesanya', risk_level: 'POSITIVE', risk_color: 'green', description: 'Adesanya has a 5-inch reach advantage (80" vs 75"). In a pure striking fight, this allows him to control distance and land jabs and front kicks without entering Pyfer\'s danger zone.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Adesanya',
        total_probability: 52,
        scenarios: [
          { name: 'Distance Masterclass', probability: 28, method: 'Unanimous Decision', description: 'Adesanya uses his 80-inch reach to keep Pyfer at the end of his punches, lands jabs, front kicks and counters. Frustrates the young fighter with movement and takes a clear decision, especially in the later rounds when Pyfer\'s cardio fades.' },
          { name: 'Deadly Counter Strike', probability: 14, method: 'KO/TKO R3-R5', description: 'Pyfer advances aggressively, Adesanya finds the timing on the counter (left hook or check hook) and finishes when the young fighter is tired and less defensive in the middle or late rounds.' },
          { name: 'Championship Round Dominance', probability: 10, method: 'Split Decision', description: 'Even fight in the early rounds, with Pyfer winning some moments. But Adesanya takes control in R4-R5 when experience and cardio make the difference, winning a close decision.' },
        ],
      },
      fighter2: {
        nome: 'Pyfer',
        total_probability: 45,
        scenarios: [
          { name: 'Early Round Bomb', probability: 22, method: 'KO/TKO R1-R2', description: 'Pyfer closes the distance early, absorbs some jabs, and lands a power shot on Adesanya\'s jaw. With the veteran\'s questioned chin, a single clean shot can end it all in the first 10 minutes.' },
          { name: 'Pressure and Accumulation', probability: 13, method: 'TKO R2-R3', description: 'Pyfer maintains constant pressure, similar to what Strickland did. Pushes Adesanya to the fence, mixes punches and clinch, and accumulates damage until the referee intervenes.' },
          { name: 'Ground Versatility', probability: 10, method: 'Submission R2-R3', description: 'Pyfer surprises with a takedown, uses the grappling he showed against Magomedov and Alhassan, and finds a submission. Adesanya has zero offensive ground game experience and may be vulnerable if put on his back.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Israel Adesanya',
      winner_side: 'fighter1',
      predicted_method: 'Unanimous Decision or late TKO',
      confidence_score: 5,
      confidence_label: 'MEDIUM',
      explanation: 'This is a fight that is hard to predict with high confidence. Adesanya, even at 36 and coming off three losses, has clear technical advantages over Pyfer: better striking, more experience, better cardio, and a 5-inch reach advantage. The quality jump from the opponents Pyfer has faced (declining Gastelum, Barriault, Magomedov) to Adesanya is enormous. However, Adesanya\'s chin is the biggest unknown. If it were intact, this would be a high-confidence prediction. Since it is not, Pyfer has a real path to victory with his knockout power. I predict Adesanya using distance and experience to control the fight, especially in the later rounds, but with real risk of being knocked out in the first two rounds.',
      x_factor: {
        title: 'The 5-Inch Reach Advantage',
        description: 'Adesanya has an 80-inch reach versus Pyfer\'s 75. In UFC terms, this is a massive advantage. If Adesanya uses jabs, front kicks and side kicks to maintain distance, Pyfer will have enormous difficulty getting into striking range. The entire fight could be decided by this physical difference.',
      },
      upset_alert: {
        title: 'Glass Chin?',
        description: 'If Pyfer lands a clean power shot in the first two rounds, especially an overhand or left hook, Adesanya could go down. Two TKOs in his last three fights do not lie. Pyfer does not need many chances, he needs one.',
      },
      probabilities: sharedProbabilities,
      value_picks: {
        moneyline: { pick: 'Pyfer (+110)', reasoning: 'If the odds stay in this range, Pyfer as a slight underdog offers real value given his knockout power and Adesanya\'s questioned chin.' },
        method: { pick: 'Fight goes to decision', reasoning: 'Despite both having knockout power, Adesanya historically favors long fights (8 decisions in 24 wins) and the reach can maintain distance.' },
        over_under: { pick: 'Under 4.5 rounds', rounds: 4.5, reasoning: 'Adesanya was finished in two of his last three fights. Pyfer finishes most of his fights early. The probability of a finish is higher than normal.' },
        best_value: 'Pyfer inside the distance (+250 estimated) offers the best value. If Pyfer wins, it will probably be by knockout in the early rounds.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Adesanya\'s Jab and Front Kick in the First 2 Minutes', icon: 'Target', description: 'If Adesanya starts the fight using jab and front kick to maintain distance, it is a sign the gameplan is working. If Pyfer can close distance easily in those first minutes, the fight is in his territory. Pay attention to the reach: Adesanya needs to use it or he will waste his biggest weapon.' },
        { num: 2, title: 'Adesanya\'s Reaction to the First Hard Shot', icon: 'Shield', description: 'The most revealing moment of the fight will be when Pyfer lands the first clean power shot. Adesanya\'s chin reaction will dictate everything. If he absorbs it well, confidence rises and he can dominate. If he wobbles, Pyfer will smell blood and come with everything.' },
        { num: 3, title: 'Pyfer\'s Gas Tank in R3', icon: 'Activity', description: 'Pyfer tired against Hermansson in the final rounds. If the fight reaches the third round, watch Pyfer\'s strike volume and posture. If his hands start dropping and footwork becomes heavy, Adesanya will capitalize.' },
        { num: 4, title: 'Pyfer Attempting Takedowns', icon: 'Crosshair', description: 'Pyfer has 83% takedown accuracy and 1.45 per 15 minutes. If he mixes takedowns with striking, he can break Adesanya\'s rhythm in a way that pure strikers like Cannonier could not. Watch for when and how Pyfer changes levels.' },
        { num: 5, title: 'Adesanya\'s Body Language Between Rounds', icon: 'Brain', description: 'An Adesanya who is having fun, dancing and taunting is a dangerous Adesanya. An Adesanya who is quiet, sitting on the stool and breathing heavily is a sign that age is weighing on him. Body language between rounds will tell the real story.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'MAIN EVENT SEATTLE', content: 'ADESANYA vs PYFER\nUFC Fight Night | March 28\nClimate Pledge Arena, Seattle\n\n3 straight losses vs 3 straight wins\nThe former champion fights for survival.', color: 'red' },
        { slide_number: 2, title: 'ADESANYA: THE NUMBERS', content: '#4 middleweight ranking\n24-5 career record (16 KOs)\n2x UFC champion\n5 title defenses\n3.93 sig. strikes per minute\n80" reach\nBUT: 3 straight losses\n2 knockouts suffered in last 3', color: 'red' },
        { slide_number: 3, title: 'PYFER: BODYBAGZ', content: '#14 middleweight ranking\n15-3 career record (9 KOs, 4 subs)\n3 straight wins\n60% knockout finish rate\n83% takedown accuracy\n29 years old, on the rise\nBroke Ngannou\'s punching machine record', color: 'blue' },
        { slide_number: 4, title: 'THE BIG QUESTION', content: 'ADESANYA\'S CHIN\n\nImavov: TKO R2 (Feb 2025)\nDu Plessis: Sub R4 (Aug 2024)\nStrickland: UD (Sep 2023)\nPereira: TKO R5 (Nov 2022)\n\n1 win in last 5 fights\nHas time passed?\nOr does the Stylebender still live?', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'ADESANYA by Unanimous Decision\n\nConfidence: MEDIUM\n52% Adesanya / 45% Pyfer\n\nReach and experience\nshould control distance.\nBut one single Pyfer punch\ncould change everything.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Adesanya vs Pyfer Saturday in Seattle. The most dominant middleweight champion of the last decade, with 3 straight losses, against the 29-year-old knockout artist. Full analysis:' },
        { num: '2/6', text: 'The number that defines this fight: 5 INCHES. Adesanya has 80" reach. Pyfer has 75". If Izzy uses that advantage with jab and front kick, Pyfer will spend the night trying to get into range. Distance is everything.' },
        { num: '3/6', text: 'The other side of the coin: Adesanya was KO/TKO\'d in 2 of his last 3 fights. At 36, the chin is not the same. Pyfer has 9 KOs in 15 wins and one-punch power. One clean entry is all it takes.' },
        { num: '4/6', text: 'Detail nobody talks about: Pyfer has 83% takedown accuracy and 4 career submissions. He is not just a knockout artist. If he mixes takedowns with striking, he can break Adesanya\'s rhythm in a new way.' },
        { num: '5/6', text: 'Pyfer\'s problem: he has never won a fight that went past R2 by finish. Against Hermansson (5 rounds), he tired and lost. Adesanya has had 7 five-round fights in the UFC. Championship rounds = veteran territory.' },
        { num: '6/6', text: 'My pick: Adesanya by decision, but with MEDIUM confidence. Reach, experience and championship rounds favor Izzy. But Pyfer inside the distance in R1-R2 is the value bet of the card. A fight that could end at any second.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Israel Adesanya was the most dominant middleweight in MMA. Five title defenses. Otherworldly striking. Today, three straight losses and a question: is it over? Saturday in Seattle, he needs to answer against Joe Pyfer.' },
        { time: '10-25s', title: 'Context', text: 'Adesanya is 36, 24-5, and was knocked out twice in his last three fights. The chin is not the same. Pyfer is 29, 15-3, nine KOs and rising with three straight wins. The reach difference is 5 inches in Izzy\'s favor. But Pyfer brings power to compensate.' },
        { time: '25-40s', title: 'Technical Analysis', text: 'The key to the fight: distance. If Adesanya keeps Pyfer at the end of his punches with jab and front kick, he dominates. More technique, more experience, better cardio. But if Pyfer closes the distance and connects, Adesanya\'s chin is vulnerable. Imavov proved that in February. Two completely different scenarios depending on who controls the space.' },
        { time: '40-55s', title: 'Championship Rounds', text: 'Here is the decisive factor: Pyfer has never won a fight that went past R2 by finish. Against Hermansson in 5 rounds, he tired and lost. Adesanya has had seven 5-round fights in the UFC. If it reaches R4 without a knockout, Izzy is the heavy favorite.' },
        { time: '55-70s', title: 'Prediction & Value', text: 'My call: Adesanya by decision, medium confidence. But Pyfer inside the distance in the early rounds is the value bet. If you believe Izzy\'s chin is done, Pyfer by KO R1-R2 pays well. The most unpredictable fight on the card.' },
      ],
      tiktok: [
        { hook: 'Adesanya with THREE straight losses. The guy who was UNTOUCHABLE at middleweight.', body: 'Strickland by decision. Du Plessis by submission. Imavov by knockout in R2. Three different ways to lose. Now he faces Joe Pyfer, 29 years old, 9 KOs in 15 fights, who broke Ngannou\'s punching machine record. Can Adesanya\'s chin hold up?', cta: 'Comment IZZY or PYFER!' },
        { hook: 'FIVE inches. That is the difference that could save Adesanya.', body: 'Adesanya has 80 inches of reach. Pyfer has 75. That is 5 inches. If Izzy uses jab and front kick to maintain distance, Pyfer NEVER gets in. But if Pyfer closes, one punch to the jaw is all it takes. Two completely different realities.', cta: 'Who controls the distance? Comment!' },
        { hook: 'Pyfer has NEVER won a fight that went past R2 by finish.', body: 'Against Hermansson in 5 rounds, Pyfer TIRED and lost. Adesanya has had SEVEN 5-round fights in the UFC. If it reaches the fourth round without a knockout, Izzy dominates. But Pyfer only needs one moment. ONE punch. And with Adesanya\'s chin in question, that moment could come at any second.', cta: 'Knockout or decision? Comment!' },
      ],
      headlines: [
        'Adesanya vs Pyfer: Renaissance or Retirement for the Stylebender in Seattle?',
        'Adesanya\'s Chin vs Pyfer\'s Power: The Fight That Defines a Career',
        '5-Inch Advantage: Why Reach Could Save Adesanya',
        'From 3 Straight Losses to Main Event: Israel Adesanya\'s Dilemma',
        'Pyfer Bodybagz: The Knockout Artist Who Could Retire Adesanya',
        'UFC Seattle: Why Pyfer by KO Is the Value Bet of the Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        ...sharedOdds,
        source: 'Average from DraftKings and sportsbooks (March 2026)',
      },
      edges: [
        { icon: 'Shield', titulo: 'Massive Reach Advantage', stat_headline: '80" VS 75": 5-INCH DIFFERENCE', contexto: 'Adesanya has one of the longest reaches at middleweight. Against a shorter-armed opponent like Pyfer, this advantage allows controlling distance with jab and front kick efficiently.', implicacao_aposta: 'Favors Adesanya by decision and Over on rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Adesanya\'s Compromised Chin', stat_headline: '2 TKO/KOs SUFFERED IN LAST 3 FIGHTS', contexto: 'Adesanya was finished by Pereira (TKO R5) and Imavov (TKO R2). At 36, impact absorption diminishes. Against Pyfer\'s one-punch power, this is the biggest risk factor.', implicacao_aposta: 'Favors Pyfer inside the distance. KO/TKO Pyfer R1-R2 props have value.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: '5-Round Cardio', stat_headline: 'PYFER LOST HIS ONLY 5-ROUND FIGHT (HERMANSSON)', contexto: 'Pyfer visibly tired in the final rounds against Hermansson. Adesanya has had 7 five-round fights in the UFC. If the fight goes past R3, Adesanya\'s cardio and experience advantage grows exponentially.', implicacao_aposta: 'Over 2.5 rounds significantly favors Adesanya.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Pyfer\'s Offensive Grappling', stat_headline: '83% TAKEDOWN ACCURACY, 4 CAREER SUBMISSIONS', contexto: 'Pyfer is not just a knockout artist. He has 4 submissions and high takedown accuracy. He can mix levels and break Adesanya\'s striking rhythm in a way pure strikers could not.', implicacao_aposta: 'Pyfer by submission is a hidden value bet.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Adesanya\'s Layoff and Age', stat_headline: '13 MONTHS WITHOUT FIGHTING, 36 YEARS OLD, COMING OFF KO', contexto: 'A concerning combination. Fighters returning from knockout after a long layoff at 36 historically have reduced performance. Timing and reflexes may not be the same.', implicacao_aposta: 'Adds risk to Adesanya as favorite. The -130 line may not reflect the real risk.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Method', pick: 'Pyfer by KO/TKO', odds: '+250 (estimated)', confianca: 'media', edge_vs_mercado: 'Adesanya\'s compromised chin + Pyfer\'s power = real probability higher than odds suggest.', raciocinio: 'If Pyfer wins, the probability of it being by knockout in the early rounds is very high. Adesanya\'s chin was tested and failed twice recently. At +250, the return compensates the risk.' },
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-140 (estimated)', confianca: 'media', edge_vs_mercado: 'Despite Adesanya\'s recent KOs, he tends to start fights slowly.', raciocinio: 'Adesanya is a counter-striker who needs time to find his timing. Pyfer, despite his power, may take time to close the distance against the reach. Likely the first rounds will be a feeling-out process.' },
        { tipo: 'Duration', pick: 'Does not go to decision', odds: '+120 (estimated)', confianca: 'baixa', edge_vs_mercado: 'Adesanya was finished in 2 of his last 3 fights. Pyfer finishes 87% of wins.', raciocinio: 'Historically, Adesanya fights went to decision. But the current phase suggests he is more vulnerable to finishes. With Pyfer bringing power and grappling, the chance of a finish is higher than history suggests.' },
      ],
      armadilha: {
        titulo: 'Trap: Adesanya by KO',
        descricao: 'Adesanya\'s last knockout in the UFC was against Alex Pereira in April 2023, nearly three years ago. In recent fights, his offensive finishing power has visibly diminished. Betting on Adesanya by KO is betting against the recent trend. If Adesanya wins, it will probably be by decision.',
      },
      disclaimer: 'Statistical analysis for informational purposes. Bet responsibly.',
    },
  },
};

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function ShowcasePage() {
  return (
    <>
      <FullAnalysisView analise={analise} />
      {/* Branding footer for outreach */}
      <div className="bg-dark-bg border-t border-dark-border py-8 px-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          AI-powered fight analysis by
        </p>
        <p className="font-display text-2xl uppercase tracking-wider text-ufc-red">
          UFC News Hub
        </p>
        <p className="text-xs text-gray-600 mt-2">
          15-section deep analysis with statistical models, prediction engines, and betting intelligence
        </p>
      </div>
    </>
  );
}
