'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';


const analisePT: PrelimsAnalise = {
  id: 'kondratavicius-vs-trocoli',
  evento_id: null,
  slug: 'kondratavicius-vs-trocoli',
  titulo: 'Kondratavicius vs Trocoli',
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
    predictedMethod: 'KO/TKO R1',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Mantas Kondratavicius',
    record: '8-1-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Antonio Trocoli',
    record: '12-6-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Medio (185 lbs)',
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
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Kondratavicius',
        record: '8-1-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Trocoli',
        record: '12-6-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 5.45,
          valueB: 3.20,
          maxVal: 8,
          format: 'decimal',
          note: 'Kondratavicius e muito mais ativo no striking, quase o dobro do volume de Trocoli',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 58,
          valueB: 42,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao significativamente superior do lituano, conecta quase 6 em cada 10',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.20,
          valueB: 5.80,
          maxVal: 8,
          format: 'decimal',
          reverseWinner: true,
          note: 'Trocoli absorve quase 6 golpes por minuto, numero extremamente preocupante',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 55,
          valueB: 38,
          maxVal: 100,
          format: 'percent',
          note: 'Trocoli defende menos de 40% dos strikes, vulnerabilidade enorme',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.90,
          valueB: 1.10,
          maxVal: 5,
          format: 'decimal',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 50,
          valueB: 33,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 70,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Kondratavicius defende takedowns de forma solida',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '26 anos', fighter2: '35 anos', note: 'Kondratavicius e 9 anos mais jovem' },
        { label: 'Altura', fighter1: '1,91m (6\'3")', fighter2: '1,96m (6\'5")', note: 'Trocoli tem 5cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '192cm (75.5")', fighter2: '209cm (82")', note: 'Trocoli tem 6.5 polegadas a mais de envergadura, diferenca enorme' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Fighter House / Kaunas, Lituania', fighter2: 'Team Malvado / Brasil', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Kondratavicius',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Djani Barbir',
            result: 'W',
            method: 'TKO R1 (socos, 1:06)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'TKO em 66 segundos no DWCS contra invicto. Ganhou contrato com o UFC de forma dominante.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Michael Tchamou',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute no primeiro round contra um dos melhores strikers do Cage Warriors.',
          },
          {
            date: 'Jan 2024',
            opponent: 'Kirill Lumivouri',
            result: 'W',
            method: 'Sub R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao no primeiro round, mostrou versatilidade alem do striking.',
          },
          {
            date: 'Jun 2023',
            opponent: 'Virgil Augene',
            result: 'L',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Unica derrota da carreira no ARES FC. Foi parado no primeiro round.',
          },
          {
            date: 'Fev 2023',
            opponent: 'Titos Mokbel',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Mais um nocaute no primeiro round, padrao de finalizacao rapida.',
          },
        ],
      },
      fighter2: {
        nome: 'Trocoli',
        recent_fights: [
          {
            date: 'Dez 2025',
            opponent: 'Mansur Abdul-Malik',
            result: 'L',
            method: 'Sub R1 (guilhotina, 1:09)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizado em pouco mais de 1 minuto no UFC 323. Terceira derrota consecutiva.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Tresean Gore',
            result: 'L',
            method: 'Sub R1 (guilhotina, 1:23)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizado novamente por guilhotina no primeiro round. Padrao preocupante.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Shara Magomedov',
            result: 'L',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Aguento 3 rounds contra Shara Bullet em Riyadh, aceito em cima da hora. Adversario de altissimo nivel.',
          },
          {
            date: 'Nov 2021',
            opponent: 'Reslley Isael',
            result: 'W',
            method: 'Sub R1 (mata-leao, 2:10)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Ultima vitoria da carreira, finalizacao rapida no Brazilian Fighting Series. Desde entao, 3 derrotas consecutivas no UFC.',
          },
          {
            date: 'Jul 2019',
            opponent: 'Kenneth Bergh',
            result: 'NC',
            method: 'NC (falhou teste antidoping)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Venceu por finalizacao no DWCS e ganhou contrato, mas resultado foi anulado por falha no antidoping. Contrato rescindido.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 78,
          valueB: 62,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Kondratavicius tem precisao superior (58%) e volume maior. Trocoli depende mais de finalizacoes no chao do que striking.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 82,
          valueB: 72,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Kondratavicius tem poder de nocaute superior com 75% de vitorias por KO. Trocoli tem apenas 25% de KOs e depende mais de finalizacoes.',
        },
        {
          label: 'Wrestling e Grappling',
          valueA: 55,
          valueB: 50,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'even',
          advantage_note: 'Nenhum dos dois e um grappler de elite. Trocoli foi finalizado duas vezes por guilhotina, vulnerabilidade clara.',
        },
        {
          label: 'Defesa Geral',
          valueA: 60,
          valueB: 35,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Trocoli defende apenas 38% dos strikes e foi finalizado 3 vezes em sequencia. Defesa muito preocupante.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 55,
          valueB: 52,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'even',
          advantage_note: 'Ambos preferem resolver no primeiro round. Se a luta for para a distancia, nenhum tem vantagem clara.',
        },
        {
          label: 'Experiencia no Octagon',
          valueA: 30,
          valueB: 55,
          labelA: 'Ruim',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Trocoli tem 3 lutas no UFC (0V-3D) e enfrentou Shara Magomedov. Kondratavicius faz sua estreia no Octagon.',
        },
      ],
      insight: 'Kondratavicius e um finalizador nato que nunca precisou dos juizes, vencendo 100% das suas lutas por nocaute ou finalizacao. Trocoli tem experiencia no UFC mas vem de 3 derrotas consecutivas (todas por finalizacao no R1) com defesa em colapso total. O lituano entra como favorito claro apesar de ser estreante.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Kondratavicius',
        ko_tko: { count: 6, percent: 75 },
        submission: { count: 2, percent: 25 },
        decision: { count: 0, percent: 0 },
        total_wins: 8,
      },
      fighter2: {
        nome: 'Trocoli',
        ko_tko: { count: 3, percent: 25 },
        submission: { count: 5, percent: 42 },
        decision: { count: 4, percent: 33 },
        total_wins: 12,
      },
      insight: 'Kondratavicius nunca venceu por decisao. Todas as suas 8 vitorias foram por nocaute (75%) ou finalizacao (25%), todas no primeiro round. Trocoli e mais um finalizador de chao com 42% de vitorias por submissao e apenas 25% por KO, mas vem sendo finalizado sistematicamente nos ultimos 3 combates. Essa luta provavelmente vai ser decidida nos primeiros minutos.',
    },

    previsao_final: {
      winner_name: 'Kondratavicius',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Mantas Kondratavicius e um prospecto genuino com 100% de finalizacoes na carreira e poder explosivo que ganhou um contrato no DWCS em 66 segundos. Trocoli vem de 3 derrotas consecutivas, todas por finalizacao no primeiro round, com defesa de strikes de apenas 38%. O brasileiro tem experiencia e poder, mas esta em queda livre no momentum. O lituano deve impor seu ritmo desde o primeiro segundo e aproveitar as lacunas defensivas de Trocoli para buscar o nocaute rapido.',
      x_factor: {
        title: 'A taxa de finalizacao de Kondratavicius',
        description: '100% de finalizacoes na carreira. Kondratavicius nunca precisou dos juizes e termina lutas com brutalidade. Se Trocoli nao tiver respeito maximo pelo poder do lituano, vai para o chao rápido.',
      },
      upset_alert: {
        title: 'O alcance de Trocoli pode fazer a diferenca',
        description: 'Com 6.5 polegadas a mais de envergadura e 5cm de altura, Trocoli pode manter distancia e usar o jab. Apesar de vir de 3 derrotas, aguentou 3 rounds contra Shara Magomedov e tem experiencia no Octagon. Se Kondratavicius entrar sem respeitar o alcance, pode ser surpreendido.',
      },
      probabilities: {
        fighter1: { nome: 'Kondratavicius', percent: 68 },
        fighter2: { nome: 'Trocoli', percent: 30 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Kondratavicius (-800)', reasoning: 'Favorito massivo e justificado. 100% de finalizacoes, TKO em 66 segundos no DWCS. Trocoli 0-3 no UFC com 3 derrotas no R1. O preco e alto mas o risco e baixo.' },
        method: { pick: 'Kondratavicius por KO/TKO R1', reasoning: 'Kondratavicius nunca precisou de mais de 1 round. Trocoli tem 38% de defesa de strikes e foi finalizado nas ultimas 3. A convergencia e total.' },
        over_under: { pick: 'Under 1.5 Rounds', rounds: 1.5, reasoning: 'As ultimas 3 derrotas de Trocoli foram todas no R1 (Magomedov, Gore, Abdul-Malik). Kondratavicius finaliza no R1 sistematicamente. Probabilidade altissima de acabar cedo.' },
        best_value: 'Kondratavicius por KO/TKO R1 e quase certo. O preco nao vai ser bom, mas combinado com Under 1.5 pode render.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Middleweight (185 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM-HIGH' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: 'Middleweight (185 lbs)' },
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 5.45, valueB: 3.20, maxVal: 8, format: 'decimal', note: 'Kondratavicius is far more active in striking, nearly double Trocoli\'s volume' },
      { label: 'Striking Accuracy (%)', valueA: 58, valueB: 42, maxVal: 100, format: 'percent', note: 'Significantly superior accuracy from the Lithuanian, landing nearly 6 out of 10' },
      { label: 'Strikes Absorbed/Min', valueA: 3.20, valueB: 5.80, maxVal: 8, format: 'decimal', reverseWinner: true, note: 'Trocoli absorbs nearly 6 strikes per minute, an extremely concerning number' },
      { label: 'Strike Defense (%)', valueA: 55, valueB: 38, maxVal: 100, format: 'percent', note: 'Trocoli defends less than 40% of strikes, a massive vulnerability' },
      { label: 'Takedowns Per 15 Min', valueA: 0.90, valueB: 1.10, maxVal: 5, format: 'decimal' },
      { label: 'Takedown Accuracy (%)', valueA: 50, valueB: 33, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 70, valueB: 55, maxVal: 100, format: 'percent', note: 'Kondratavicius defends takedowns solidly' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '26 years old', fighter2: '35 years old', note: 'Kondratavicius is 9 years younger' },
      { label: 'Height', fighter1: '6\'3" (1.91m)', fighter2: '6\'5" (1.96m)', note: 'Trocoli has a 5cm height advantage' },
      { label: 'Reach', fighter1: '75.5" (192cm)', fighter2: '82" (209cm)', note: 'Trocoli has 6.5 inches more reach, a massive difference' },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Gym', fighter1: 'Fighter House / Kaunas, Lithuania', fighter2: 'Team Malvado / Brazil', note: null },
    ] },
    historico_lutas: {
      fighter1: { nome: 'Kondratavicius', recent_fights: [
        { date: 'Sep 2025', opponent: 'Djani Barbir', result: 'W', method: 'TKO R1 (punches, 1:06)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'TKO in 66 seconds on DWCS against an undefeated fighter. Earned UFC contract dominantly.' },
        { date: 'Mar 2025', opponent: 'Michael Tchamou', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First-round knockout against one of Cage Warriors\' best strikers.' },
        { date: 'Jan 2024', opponent: 'Kirill Lumivouri', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round submission, showed versatility beyond striking.' },
        { date: 'Jun 2023', opponent: 'Virgil Augene', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Only career loss at ARES FC. Was stopped in the first round.' },
        { date: 'Feb 2023', opponent: 'Titos Mokbel', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Another first-round knockout, pattern of quick finishes.' },
      ] },
      fighter2: { nome: 'Trocoli', recent_fights: [
        { date: 'Dec 2025', opponent: 'Mansur Abdul-Malik', result: 'L', method: 'Sub R1 (guillotine, 1:09)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted in just over 1 minute at UFC 323. Third consecutive loss.' },
        { date: 'Nov 2024', opponent: 'Tresean Gore', result: 'L', method: 'Sub R1 (guillotine, 1:23)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted again by guillotine in the first round. Concerning pattern.' },
        { date: 'Jun 2024', opponent: 'Shara Magomedov', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Very Good', note: 'Lasted 3 rounds against Shara Bullet in Riyadh, accepted on short notice. Elite-level opponent.' },
        { date: 'Nov 2021', opponent: 'Reslley Isael', result: 'W', method: 'Sub R1 (RNC, 2:10)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Last career win, quick submission. Since then, 3 consecutive UFC losses.' },
        { date: 'Jul 2019', opponent: 'Kenneth Bergh', result: 'NC', method: 'NC (failed drug test)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Won by submission on DWCS and earned contract, but result was overturned for failing drug test. Contract rescinded.' },
      ] },
    },
    perfil_habilidades: { skills: [
      { label: 'Stand-up Striking', valueA: 78, valueB: 62, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Kondratavicius has superior accuracy (58%) and higher volume. Trocoli relies more on ground submissions than striking.' },
      { label: 'Knockout Power', valueA: 82, valueB: 72, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Kondratavicius has superior knockout power with 75% wins by KO. Trocoli has just 25% KOs and relies more on submissions.' },
      { label: 'Wrestling & Grappling', valueA: 55, valueB: 50, labelA: 'Good', labelB: 'Average', advantage: 'even', advantage_note: 'Neither is an elite grappler. Trocoli was submitted twice by guillotine, a clear vulnerability.' },
      { label: 'Overall Defense', valueA: 60, valueB: 35, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Trocoli defends only 38% of strikes and was submitted 3 times in a row. Very concerning defense.' },
      { label: 'Cardio & Pace', valueA: 55, valueB: 52, labelA: 'Good', labelB: 'Average', advantage: 'even', advantage_note: 'Both prefer to finish in the first round. If the fight goes long, neither has a clear advantage.' },
      { label: 'Octagon Experience', valueA: 30, valueB: 55, labelA: 'Poor', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Trocoli has 3 UFC fights (0W-3L) and faced Shara Magomedov. Kondratavicius makes his octagon debut.' },
    ], insight: 'Kondratavicius is a natural finisher who has never needed the judges, winning 100% of his fights by knockout or submission. Trocoli has UFC experience but comes off 3 consecutive losses (all by submission in R1) with his defense in total collapse. The Lithuanian enters as the clear favorite despite being a debutant.' },
    distribuicao_vitorias: {
      fighter1: { nome: 'Kondratavicius', ko_tko: { count: 6, percent: 75 }, submission: { count: 2, percent: 25 }, decision: { count: 0, percent: 0 }, total_wins: 8 },
      fighter2: { nome: 'Trocoli', ko_tko: { count: 3, percent: 25 }, submission: { count: 5, percent: 42 }, decision: { count: 4, percent: 33 }, total_wins: 12 },
      insight: 'Kondratavicius has never gone to a decision. All 8 wins were by knockout (75%) or submission (25%), all in the first round. Trocoli is more of a ground finisher with 42% wins by submission and just 25% by KO, but has been systematically submitted in his last 3 bouts. This fight will likely be decided in the opening minutes.',
    },
    previsao_final: {
      winner_name: 'Kondratavicius', winner_side: 'fighter1', predicted_method: 'KO/TKO R1', confidence_score: 7, confidence_label: 'MEDIUM-HIGH',
      explanation: 'Mantas Kondratavicius is a genuine prospect with a 100% finish rate and explosive power that earned him a DWCS contract in 66 seconds. Trocoli comes off 3 consecutive losses, all by submission in the first round, with just 38% strike defense. The Brazilian has experience and power, but is in freefall momentum. The Lithuanian should impose his pace from the opening bell and exploit Trocoli\'s defensive gaps to find a quick knockout.',
      x_factor: { title: 'Kondratavicius\'s finish rate', description: '100% career finishes. Kondratavicius has never needed judges and ends fights with brutality. If Trocoli doesn\'t show maximum respect for the Lithuanian\'s power, he\'s hitting the canvas fast.' },
      upset_alert: { title: 'Trocoli\'s reach could make the difference', description: 'With 6.5 inches more reach and 5cm of height, Trocoli can maintain distance and use the jab. Despite coming off 3 losses, he lasted 3 rounds against Shara Magomedov and has octagon experience. If Kondratavicius enters without respecting the reach, he could be surprised.' },
      probabilities: { fighter1: { nome: 'Kondratavicius', percent: 68 }, fighter2: { nome: 'Trocoli', percent: 30 }, draw: 2 },
      value_picks: undefined,
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt');
  const analise = lang === 'en' ? analiseEN : analisePT;
  return <PrelimsAnalysisView analise={analise} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
