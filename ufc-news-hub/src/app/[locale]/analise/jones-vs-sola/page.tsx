'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'jones-vs-sola',
  evento_id: null,
  slug: 'jones-vs-sola',
  titulo: 'Jones vs Sola',
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
    nome: 'Mason Jones',
    record: '17-2-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Axel Sola',
    record: '11-0-1',
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
        nome: 'Jones',
        record: '17-2-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Sola',
        record: '11-0-1',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 5.61,
          valueB: 5.16,
          maxVal: 8,
          format: 'decimal',
          note: 'Ambos com volume altissimo de strikes, luta tende a ser uma guerra em pe',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 44,
          valueB: 44,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao identica, os dois acertam quase metade dos golpes',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.52,
          valueB: 3.88,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Jones absorve mais golpes, ficou perto de ser finalizado por Oki no R1',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 52,
          valueB: 56,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa de strikes abaixo da media para ambos, luta aberta',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 2.75,
          valueB: 1.20,
          maxVal: 5,
          format: 'decimal',
          note: 'Jones usa o wrestling como arma principal quando a trocacao complica',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 45,
          valueB: 33,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 80,
          valueB: 65,
          maxVal: 100,
          format: 'percent',
          note: 'Jones tem defesa de takedown elite, dificil de derrubar',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '30 anos', fighter2: '28 anos', note: null },
        { label: 'Altura', fighter1: '1,78m (5\'10")', fighter2: '1,88m (6\'2")', note: 'Sola tem 10cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '188cm (74")', fighter2: '188cm (74")', note: 'Envergadura identica apesar da diferenca de altura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Canhoto', note: 'Dinamica ortodoxo vs southpaw' },
        { label: 'Academia', fighter1: 'Composed MMA / Pais de Gales', fighter2: 'Boxing Squad / Nice, Franca', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Jones',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Bolaji Oki',
            result: 'W',
            method: 'TKO R2 (cotoveladas)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Quase foi finalizado no R1, mas voltou devastador com quedas e cotoveladas no R2. Performance of the Night.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Jeremy Stephens',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Dominou com wrestling nos rounds finais contra veterano da divisao no retorno ao UFC.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Michael Pagani',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria no Cage Warriors antes de retornar ao UFC, controle total por 3 rounds.',
          },
          {
            date: 'Jul 2022',
            opponent: 'Ludovit Klein',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Dominado por 3 rounds em Londres, resultado que levou Jones a sair do UFC temporariamente.',
          },
          {
            date: 'Out 2021',
            opponent: 'David Onama',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Primeira vitoria no UFC contra prospect que depois se destacou na divisao.',
          },
        ],
      },
      fighter2: {
        nome: 'Sola',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Rhys McKee',
            result: 'W',
            method: 'TKO R3 (soco no corpo)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC impressionante. Dobrou McKee com soco no corpo devastador no terceiro round.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Ghiles Oudelha',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Defesa do titulo ARES FC 31 em Marselha, dominou com wrestling e pressao por 5 rounds.',
          },
          {
            date: 'Jan 2025',
            opponent: 'Lucas Caio',
            result: 'W',
            method: 'TKO R2 (cotoveladas do crucifixo)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Defesa de titulo no ARES FC 28, parou Caio com cotoveladas da posicao de crucifixo no segundo round.',
          },
          {
            date: 'Set 2024',
            opponent: 'Soslan Gagloev',
            result: 'W',
            method: 'TKO R2 (ground and pound)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'ARES FC 25, parou Gagloev com ground and pound no segundo round.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Daguir Imavov',
            result: 'D',
            method: 'Empate Majoritario',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'ARES FC 22, luta de titulo extremamente competitiva que terminou empatada apos 5 rounds.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 78,
          valueB: 76,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'even',
          advantage_note: 'Ambos sao excelentes strikers com volume alto. Jones tem mais experiencia no UFC, Sola traz poder no corpo.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 72,
          valueB: 78,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sola tem 55% de vitorias por KO/TKO, incluindo nocaute por soco no corpo no UFC. Jones finaliza mais no chao.',
        },
        {
          label: 'Wrestling Ofensivo',
          valueA: 80,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Jones dominou Stephens e Oki com quedas e controle. Sua principal arma quando a trocacao complica.',
        },
        {
          label: 'Defesa e Grappling',
          valueA: 75,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Jones tem 80% de defesa de takedown e e perigoso no chao com cotoveladas. Sola ainda nao foi testado nesse aspecto no UFC.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 72,
          valueB: 76,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sola mantem pressao constante e tem experiencia em lutas de 5 rounds como campeao ARES. Jones as vezes desacelera.',
        },
        {
          label: 'Experiencia no Octagon',
          valueA: 72,
          valueB: 40,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Jones tem 6 lutas no UFC (4V-2D) incluindo retorno triunfal. Sola tem apenas 1 luta no Octagon.',
        },
      ],
      insight: 'Jones e o lutador mais completo com wrestling superior e experiencia no UFC, enquanto Sola compensa com poder de finalizacao e ritmo incansavel. A chave da luta e se Jones consegue levar para o chao ou se Sola mantem a distancia com seu jab e ataques ao corpo.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Jones',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 3, percent: 18 },
        decision: { count: 6, percent: 35 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'Sola',
        ko_tko: { count: 6, percent: 55 },
        submission: { count: 1, percent: 9 },
        decision: { count: 4, percent: 36 },
        total_wins: 11,
      },
      insight: 'Jones tem perfil mais versatil com vitorias divididas entre KO (47%), decisao (35%) e finalizacao (18%), mostrando capacidade de vencer de varias formas. Sola e mais dependente do poder, com 55% de nocautes e apenas 1 finalizacao. Se a luta for para o chao, Jones tem vantagem clara nas opcoes.',
    },

    previsao_final: {
      winner_name: 'Jones',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Mason Jones tem a vantagem do wrestling e da experiencia no Octagon, dois fatores que costumam ser decisivos contra estreantes em ascensao. Sola e um prospecto perigoso com poder real nas maos e no corpo, mas ainda nao foi testado contra um grappler do nivel de Jones. O gales deve misturar wrestling com striking nos rounds 2 e 3 para acumular pontos nos cartoes. Porem, o poder de Sola e a dinamica southpaw tornam esta luta muito mais competitiva do que as odds sugerem.',
      x_factor: {
        title: 'O wrestling de Jones contra um striker',
        description: 'Jones provou contra Stephens e Oki que pode dominar rounds inteiros no chao. Se conseguir impor esse jogo contra Sola, que nunca enfrentou um wrestler desse calibre, a luta pode ser unilateral.',
      },
      upset_alert: {
        title: 'Sola tem poder para acabar a luta a qualquer momento',
        description: 'O frances dobrou Rhys McKee com um soco no corpo e tem 6 nocautes na carreira. Se Jones entrar descuidado na troca como fez no R1 contra Oki, Sola pode capitalizar com um unico golpe bem colocado.',
      },
      probabilities: {
        fighter1: { nome: 'Jones', percent: 54 },
        fighter2: { nome: 'Sola', percent: 44 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Jones (-120)', reasoning: 'Jones tem wrestling superior e experiencia no octogono (3-2 no UFC). Leve favorito, preco justo. Sola e perigoso mas nunca enfrentou esse nivel de wrestling.' },
        method: { pick: 'Jones por Decisao', reasoning: 'Jones tende a lutas que vao a distancia quando o wrestling funciona. Sola tem queixo forte e nao sera facilmente finalizado. Decisao e o cenario mais provavel.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Luta equilibrada com estilos contrastantes. Jones quer controlar, Sola quer trocar. A dinamica favorece uma luta que vai longe.' },
        best_value: 'Over 2.5 rounds e a aposta mais segura. Ambos sao duros e o equilibrio da luta sugere ida aos juizes.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT,
  titulo: 'Jones vs Sola',
  evento_data: 'March 21, 2026',
  evento_local: 'The O2 Arena, London, United Kingdom',
  categoria_peso: 'Lightweight (155 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, predictedMethod: 'Unanimous Decision', confidence: 'MEDIUM' },
  prelims_analysis: {
    hero: {
      ...analisePT.prelims_analysis.hero,
      evento_data: 'March 21, 2026',
      categoria_peso: 'Lightweight (155 lbs)',
    },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 5.61, valueB: 5.16, maxVal: 8, format: 'decimal', note: 'Both with extremely high strike volume, fight likely to be a war on the feet' },
        { label: 'Striking Accuracy (%)', valueA: 44, valueB: 44, maxVal: 100, format: 'percent', note: 'Identical accuracy, both land nearly half their shots' },
        { label: 'Strikes Absorbed/Min', valueA: 4.52, valueB: 3.88, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Jones absorbs more strikes, was nearly finished by Oki in R1' },
        { label: 'Strike Defense (%)', valueA: 52, valueB: 56, maxVal: 100, format: 'percent', note: 'Below-average strike defense for both, wide-open fight' },
        { label: 'Takedowns Per 15 Min', valueA: 2.75, valueB: 1.20, maxVal: 5, format: 'decimal', note: 'Jones uses wrestling as his primary weapon when striking gets complicated' },
        { label: 'Takedown Accuracy (%)', valueA: 45, valueB: 33, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 80, valueB: 65, maxVal: 100, format: 'percent', note: 'Jones has elite takedown defense, very hard to take down' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '30 years old', fighter2: '28 years old', note: null },
        { label: 'Height', fighter1: '5\'10" (1.78m)', fighter2: '6\'2" (1.88m)', note: 'Sola has a 10cm height advantage' },
        { label: 'Reach', fighter1: '74" (188cm)', fighter2: '74" (188cm)', note: 'Identical reach despite the height difference' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Southpaw', note: 'Orthodox vs southpaw dynamic' },
        { label: 'Gym', fighter1: 'Composed MMA / Wales', fighter2: 'Boxing Squad / Nice, France', note: null },
      ],
    },
    historico_lutas: {
      fighter1: {
        nome: 'Jones',
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Bolaji Oki', result: 'W', method: 'TKO R2 (elbows)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Nearly got finished in R1, but came back devastating with takedowns and elbows in R2. Performance of the Night.' },
          { date: 'May 2025', opponent: 'Jeremy Stephens', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Dominated with wrestling in the final rounds against the division veteran on his UFC return.' },
          { date: 'Jul 2024', opponent: 'Michael Pagani', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Win at Cage Warriors before returning to the UFC, total control for 3 rounds.' },
          { date: 'Jul 2022', opponent: 'Ludovit Klein', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'Dominated for 3 rounds in London, a result that led Jones to leave the UFC temporarily.' },
          { date: 'Oct 2021', opponent: 'David Onama', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First UFC win against a prospect who later became a standout in the division.' },
        ],
      },
      fighter2: {
        nome: 'Sola',
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Rhys McKee', result: 'W', method: 'TKO R3 (body shot)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Impressive UFC debut. Folded McKee with a devastating body shot in the third round.' },
          { date: 'Jun 2025', opponent: 'Ghiles Oudelha', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'ARES FC 31 title defense in Marseille, dominated with wrestling and pressure for 5 rounds.' },
          { date: 'Jan 2025', opponent: 'Lucas Caio', result: 'W', method: 'TKO R2 (elbows from crucifix)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Title defense at ARES FC 28, stopped Caio with elbows from the crucifix position in the second round.' },
          { date: 'Sep 2024', opponent: 'Soslan Gagloev', result: 'W', method: 'TKO R2 (ground and pound)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'ARES FC 25, stopped Gagloev with ground and pound in the second round.' },
          { date: 'Jun 2024', opponent: 'Daguir Imavov', result: 'D', method: 'Majority Draw', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'ARES FC 22, extremely competitive title fight that ended in a draw after 5 rounds.' },
        ],
      },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Stand-up Striking', valueA: 78, valueB: 76, labelA: 'Very Good', labelB: 'Very Good', advantage: 'even', advantage_note: 'Both are excellent strikers with high volume. Jones has more UFC experience, Sola brings body shot power.' },
        { label: 'Knockout Power', valueA: 72, valueB: 78, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Sola has 55% wins by KO/TKO, including a body shot KO in the UFC. Jones finishes more on the ground.' },
        { label: 'Offensive Wrestling', valueA: 80, valueB: 55, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Jones dominated Stephens and Oki with takedowns and control. His primary weapon when the striking gets tough.' },
        { label: 'Defense & Grappling', valueA: 75, valueB: 60, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Jones has 80% takedown defense and is dangerous on the ground with elbows. Sola hasn\'t been tested in this area in the UFC.' },
        { label: 'Cardio & Pace', valueA: 72, valueB: 76, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Sola maintains constant pressure and has experience in 5-round fights as ARES champion. Jones sometimes slows down.' },
        { label: 'Octagon Experience', valueA: 72, valueB: 40, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Jones has 6 UFC fights (4W-2L) including a triumphant return. Sola has just 1 octagon fight.' },
      ],
      insight: 'Jones is the more complete fighter with superior wrestling and UFC experience, while Sola compensates with finishing power and relentless pace. The key to this fight is whether Jones can take it to the ground or if Sola can maintain distance with his jab and body attacks.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Jones', ko_tko: { count: 8, percent: 47 }, submission: { count: 3, percent: 18 }, decision: { count: 6, percent: 35 }, total_wins: 17 },
      fighter2: { nome: 'Sola', ko_tko: { count: 6, percent: 55 }, submission: { count: 1, percent: 9 }, decision: { count: 4, percent: 36 }, total_wins: 11 },
      insight: 'Jones has a more versatile profile with wins split between KO (47%), decision (35%), and submission (18%), showing he can win in multiple ways. Sola relies more on power, with 55% knockouts and just 1 submission. If the fight goes to the ground, Jones has a clear advantage in options.',
    },
    previsao_final: {
      winner_name: 'Jones',
      winner_side: 'fighter1',
      predicted_method: 'Unanimous Decision',
      confidence_score: 5,
      confidence_label: 'MEDIUM',
      explanation: 'Mason Jones has the wrestling and octagon experience advantage, two factors that tend to be decisive against rising newcomers. Sola is a dangerous prospect with real power in his hands and body, but he hasn\'t been tested against a grappler of Jones\'s caliber. The Welshman should mix wrestling with striking in rounds 2 and 3 to accumulate points on the scorecards. However, Sola\'s power and the southpaw dynamic make this fight much more competitive than the odds suggest.',
      x_factor: {
        title: 'Jones\'s wrestling against a striker',
        description: 'Jones proved against Stephens and Oki that he can dominate entire rounds on the ground. If he can impose that game against Sola, who has never faced a wrestler of this caliber, the fight could be one-sided.',
      },
      upset_alert: {
        title: 'Sola has the power to end it at any moment',
        description: 'The Frenchman folded Rhys McKee with a body shot and has 6 career knockouts. If Jones gets reckless in the exchanges like he did in R1 against Oki, Sola can capitalize with a single well-placed shot.',
      },
      probabilities: {
        fighter1: { nome: 'Jones', percent: 54 },
        fighter2: { nome: 'Sola', percent: 44 },
        draw: 2,
      },
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
