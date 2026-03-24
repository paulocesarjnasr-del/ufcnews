'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'wood-vs-keita',
  evento_id: null,
  slug: 'wood-vs-keita',
  titulo: 'Wood vs Keita',
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
    nome: 'Nathaniel Wood',
    record: '22-6-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Losene Keita',
    record: '16-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Pena (145 lbs)',
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
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Wood',
        record: '22-6-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Keita',
        record: '16-1-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 5.75,
          valueB: 4.80,
          maxVal: 8,
          format: 'decimal',
          note: 'Wood e uma metralhadora na trocacao, quase 6 golpes significativos por minuto',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 48,
          valueB: 52,
          maxVal: 100,
          format: 'percent',
          note: 'Keita conecta com mais precisao, reflexo de seu background no boxe',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.10,
          valueB: 3.50,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Keita absorve menos golpes, indicando movimentacao superior',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 55,
          valueB: 58,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.50,
          valueB: 0.80,
          maxVal: 5,
          format: 'decimal',
          note: 'Wood tem background de grappling mais solido e usa quedas para controlar',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 73,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
          note: 'Wood tem precisao elite nos takedowns, conecta quase 3 em cada 4 tentativas',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 72,
          valueB: 68,
          maxVal: 100,
          format: 'percent',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '28 anos', note: 'Keita tem 4 anos a menos' },
        { label: 'Altura', fighter1: '1,68m (5\'6")', fighter2: '1,76m (5\'9")', note: 'Keita tem 8cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '175cm (68.9")', fighter2: '176cm (69.3")', note: null },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Great Britain Top Team / Londres', fighter2: 'Lamiro Fight Club / Kortrijk, Belgica', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Wood',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Jose Miguel Delgado',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria segura por pontos no UFC 321, manteve sequencia de 3 vitorias consecutivas.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Morgan Charriere',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Superou o frances em sua casa no UFC Paris, demonstrando maturidade e controle tatico.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Daniel Pineda',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria no UFC 304 em Manchester, manteve ritmo alto por 3 rounds diante da torcida inglesa.',
          },
          {
            date: 'Out 2023',
            opponent: 'Muhammad Naimov',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota por pontos no UFC 294 em Abu Dhabi, Naimov controlou com clinch e controle no chao.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Andre Fili',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria solida por pontos no UFC Londres contra veterano da divisao.',
          },
        ],
      },
      fighter2: {
        nome: 'Keita',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Patricio Pitbull',
            result: 'NC',
            method: 'Cancelado (excesso peso)',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Estreia no UFC cancelada por pesar 149lbs, 3 libras acima do limite. Sinal de alerta na disciplina.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Ronald Paradeiser',
            result: 'W',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Final do torneio Oktagon e titulo dos meio-leves. Conquista tripla coroa: 2x peso leve + peso pena.',
          },
          {
            date: 'Set 2024',
            opponent: 'Mateusz Legierski',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Semifinal do torneio Oktagon, vitoria calculada por pontos contra polones.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Predrag Bogdanovic',
            result: 'W',
            method: 'KO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute devastador nas quartas de final do torneio Oktagon.',
          },
          {
            date: 'Jun 2022',
            opponent: 'Ivan Buchinger',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'Campeao Oktagon',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Destronou o duplo campeao Buchinger no primeiro round para conquistar o titulo.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 82,
          valueB: 80,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'even',
          advantage_note: 'Wood tem volume absurdo com 5.75 SLpM. Keita tem 10 KOs na carreira e precisao superior. Trocacao de altissimo nivel.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 65,
          valueB: 85,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Keita tem 10 nocautes em 16 vitorias (63%), incluindo nocautes contra campeoes do Oktagon. Wood tem 8 KOs mas contra adversarios inferiores.',
        },
        {
          label: 'Wrestling e Grappling',
          valueA: 76,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Wood tem 73% de precisao de takedown e 5 finalizacoes na carreira. Keita e principalmente um striker com pouco grappling ofensivo.',
        },
        {
          label: 'Defesa Geral',
          valueA: 72,
          valueB: 65,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Wood tem defesa de takedown de 72% e mais experiencia defensiva. Keita nunca foi testado por um grappler de elite.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 80,
          valueB: 72,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Wood mantem ritmo alto por 3 rounds inteiros, suas ultimas 3 vitorias foram todas por decisao unanime.',
        },
        {
          label: 'Experiencia no Octagon',
          valueA: 85,
          valueB: 25,
          labelA: 'Muito Bom',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Wood tem 13 lutas no UFC (10V-3D) e ja enfrentou top 15. Keita nunca lutou no Octagon, sua estreia foi cancelada.',
        },
      ],
      insight: 'Wood e o lutador mais completo e experiente, com vantagens claras no grappling, cardio e maturidade no Octagon. Keita traz poder explosivo de nocaute e a confianca de um campeao invicto, mas a transicao do Oktagon para o UFC e um salto enorme. A chave e se Keita consegue conectar limpo nos dois primeiros rounds antes que o cardio de Wood tome conta.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Wood',
        ko_tko: { count: 8, percent: 36 },
        submission: { count: 5, percent: 23 },
        decision: { count: 9, percent: 41 },
        total_wins: 22,
      },
      fighter2: {
        nome: 'Keita',
        ko_tko: { count: 10, percent: 63 },
        submission: { count: 0, percent: 0 },
        decision: { count: 6, percent: 37 },
        total_wins: 16,
      },
      insight: 'Perfis opostos na forma de vencer. Wood e bem distribuido entre decisao (41%), KO (36%) e finalizacao (23%), mostrando versatilidade total. Keita depende do poder com 63% de nocautes e zero finalizacoes, mas tambem sabe pontuar com 37% de decisoes. Se a luta for para a distancia, favorece Wood. Se Keita conectar cedo, pode acabar rapido.',
    },

    previsao_final: {
      winner_name: 'Wood',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Nathaniel Wood luta em casa em Londres com 3 vitorias consecutivas e 13 lutas de experiencia no Octagon. Keita e talentoso e perigoso, mas nunca pisou no cage do UFC e perdeu sua unica chance de estrear por nao bater o peso. A pressao de uma estreia em territorio hostil, combinada com o ritmo implacavel de Wood e seu grappling superior, devem ser fatores decisivos. Porem, o poder de Keita e real e Wood ja mostrou vulnerabilidade contra strikers pesados.',
      x_factor: {
        title: 'Londres e a torcida de Wood',
        description: 'Wood nunca perdeu em casa na Inglaterra pelo UFC. A energia da O2 Arena vai empurrar o ingles, especialmente nos rounds finais quando o cardio pode fazer a diferenca.',
      },
      upset_alert: {
        title: 'Keita tem o poder para apagar qualquer um',
        description: 'Com 10 nocautes em 16 vitorias, incluindo nocautes contra campeoes do Oktagon, Keita pode resolver a luta com um unico golpe. Se Wood subestimar o poder do belga e entrar na troca franca, pode ser surpreendido.',
      },
      probabilities: {
        fighter1: { nome: 'Wood', percent: 62 },
        fighter2: { nome: 'Keita', percent: 36 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Wood (+190)', reasoning: 'Wood e underdog com 10-3 no UFC e 3 vitorias seguidas. Veterano com BJJ black belt e fight IQ superior. Keita nunca lutou no UFC e tem historico de problemas com peso. A +190, Wood oferece valor real.' },
        method: { pick: 'Wood por Decisao', reasoning: 'Wood ganhou as ultimas 3 por decisao unanime. Sabe controlar ritmo e frustrar power punchers. Se Keita chegar drenado do corte de peso, o veteranismo de Wood prevalece nos rounds finais.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'As ultimas 3 vitorias de Wood foram todas por decisao. Ele sabe fazer a luta chegar aos juizes. Keita tem poder pra acabar cedo, mas Wood tem queixo e experiencia pra sobreviver.' },
        best_value: 'Wood ML a +190 e a melhor aposta de azarao nas prelims. Veterano de 13 lutas UFC contra estreante com problemas de peso.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT,
  evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Featherweight (145 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, predictedMethod: 'Unanimous Decision', confidence: 'MEDIUM' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: 'Featherweight (145 lbs)' },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 5.75, valueB: 4.80, maxVal: 8, format: 'decimal', note: 'Wood is a machine gun on the feet, nearly 6 significant strikes per minute' },
        { label: 'Striking Accuracy (%)', valueA: 48, valueB: 52, maxVal: 100, format: 'percent', note: 'Keita lands with more precision, a reflection of his boxing background' },
        { label: 'Strikes Absorbed/Min', valueA: 4.10, valueB: 3.50, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Keita absorbs fewer shots, indicating superior movement' },
        { label: 'Strike Defense (%)', valueA: 55, valueB: 58, maxVal: 100, format: 'percent' },
        { label: 'Takedowns Per 15 Min', valueA: 1.50, valueB: 0.80, maxVal: 5, format: 'decimal', note: 'Wood has a more solid grappling background and uses takedowns to control' },
        { label: 'Takedown Accuracy (%)', valueA: 73, valueB: 40, maxVal: 100, format: 'percent', note: 'Wood has elite takedown accuracy, lands nearly 3 out of every 4 attempts' },
        { label: 'Takedown Defense (%)', valueA: 72, valueB: 68, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '32 years old', fighter2: '28 years old', note: 'Keita is 4 years younger' },
        { label: 'Height', fighter1: '5\'6" (1.68m)', fighter2: '5\'9" (1.76m)', note: 'Keita has an 8cm height advantage' },
        { label: 'Reach', fighter1: '68.9" (175cm)', fighter2: '69.3" (176cm)', note: null },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
        { label: 'Gym', fighter1: 'Great Britain Top Team / London', fighter2: 'Lamiro Fight Club / Kortrijk, Belgium', note: null },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Wood', recent_fights: [
        { date: 'Oct 2025', opponent: 'Jose Miguel Delgado', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Safe points win at UFC 321, maintained 3-fight win streak.' },
        { date: 'Mar 2025', opponent: 'Morgan Charriere', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'Beat the Frenchman in his own backyard at UFC Paris, showing maturity and tactical control.' },
        { date: 'Jul 2024', opponent: 'Daniel Pineda', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Win at UFC 304 in Manchester, maintained high pace for 3 rounds in front of the English crowd.' },
        { date: 'Oct 2023', opponent: 'Muhammad Naimov', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Points loss at UFC 294 in Abu Dhabi, Naimov controlled with clinch and ground control.' },
        { date: 'Jul 2023', opponent: 'Andre Fili', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Solid points win at UFC London against a division veteran.' },
      ] },
      fighter2: { nome: 'Keita', recent_fights: [
        { date: 'Sep 2025', opponent: 'Patricio Pitbull', result: 'NC', method: 'Canceled (missed weight)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'UFC debut canceled for weighing 149lbs, 3 pounds over the limit. Discipline red flag.' },
        { date: 'Dec 2024', opponent: 'Ronald Paradeiser', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Won the Oktagon lightweight tournament and title. Triple crown: 2x lightweight + featherweight.' },
        { date: 'Sep 2024', opponent: 'Mateusz Legierski', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Oktagon tournament semifinal, calculated points win against the Pole.' },
        { date: 'Jul 2024', opponent: 'Predrag Bogdanovic', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Devastating knockout in the Oktagon tournament quarterfinals.' },
        { date: 'Jun 2022', opponent: 'Ivan Buchinger', result: 'W', method: 'TKO R1', opponent_rank: 'Oktagon Champion', quality_score: 3, quality_label: 'Good', note: 'Dethroned the dual champion Buchinger in the first round to capture the title.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Stand-up Striking', valueA: 82, valueB: 80, labelA: 'Very Good', labelB: 'Very Good', advantage: 'even', advantage_note: 'Wood has absurd volume at 5.75 SLpM. Keita has 10 career KOs and superior precision. Elite-level striking matchup.' },
        { label: 'Knockout Power', valueA: 65, valueB: 85, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Keita has 10 KOs in 16 wins (63%), including knockouts against Oktagon champions. Wood has 8 KOs but against inferior opposition.' },
        { label: 'Wrestling & Grappling', valueA: 76, valueB: 55, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Wood has 73% takedown accuracy and 5 career submissions. Keita is primarily a striker with little offensive grappling.' },
        { label: 'Overall Defense', valueA: 72, valueB: 65, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Wood has 72% takedown defense and more defensive experience. Keita has never been tested by an elite grappler.' },
        { label: 'Cardio & Pace', valueA: 80, valueB: 72, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Wood maintains a high pace for 3 full rounds, his last 3 wins were all unanimous decisions.' },
        { label: 'Octagon Experience', valueA: 85, valueB: 25, labelA: 'Very Good', labelB: 'Poor', advantage: 'fighter1', advantage_note: 'Wood has 13 UFC fights (10W-3L) and has faced top 15 opponents. Keita has never fought in the octagon, his debut was canceled.' },
      ],
      insight: 'Wood is the more complete and experienced fighter, with clear advantages in grappling, cardio, and octagon maturity. Keita brings explosive knockout power and the confidence of an undefeated champion, but the transition from Oktagon to UFC is a massive leap. The key is whether Keita can land clean in the first two rounds before Wood\'s cardio takes over.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Wood', ko_tko: { count: 8, percent: 36 }, submission: { count: 5, percent: 23 }, decision: { count: 9, percent: 41 }, total_wins: 22 },
      fighter2: { nome: 'Keita', ko_tko: { count: 10, percent: 63 }, submission: { count: 0, percent: 0 }, decision: { count: 6, percent: 37 }, total_wins: 16 },
      insight: 'Opposite profiles in how they win. Wood is well-distributed between decision (41%), KO (36%), and submission (23%), showing total versatility. Keita relies on power with 63% knockouts and zero submissions, but also knows how to score with 37% decisions. If the fight goes the distance, it favors Wood. If Keita connects early, it could end fast.',
    },
    previsao_final: {
      winner_name: 'Wood', winner_side: 'fighter1', predicted_method: 'Unanimous Decision', confidence_score: 6, confidence_label: 'MEDIUM',
      explanation: 'Nathaniel Wood fights at home in London with 3 consecutive wins and 13 fights of octagon experience. Keita is talented and dangerous, but has never stepped inside the UFC cage and lost his only chance to debut by missing weight. The pressure of debuting in hostile territory, combined with Wood\'s relentless pace and superior grappling, should be decisive factors. However, Keita\'s power is real and Wood has shown vulnerability against heavy strikers.',
      x_factor: { title: 'London and Wood\'s home crowd', description: 'Wood has never lost at home in England in the UFC. The O2 Arena energy will push the Brit, especially in the late rounds when cardio can make the difference.' },
      upset_alert: { title: 'Keita has the power to shut anyone\'s lights off', description: 'With 10 KOs in 16 wins, including knockouts against Oktagon champions, Keita can end the fight with a single shot. If Wood underestimates the Belgian\'s power and trades openly, he could be surprised.' },
      probabilities: { fighter1: { nome: 'Wood', percent: 62 }, fighter2: { nome: 'Keita', percent: 36 }, draw: 2 },
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
