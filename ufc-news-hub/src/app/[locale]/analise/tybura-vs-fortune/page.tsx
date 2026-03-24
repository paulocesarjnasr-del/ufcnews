'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'tybura-vs-fortune',
  evento_id: null,
  slug: 'tybura-vs-fortune',
  titulo: 'Tybura vs Fortune',
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
    nome: 'Marcin Tybura',
    record: '27-10-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Tyrell Fortune',
    record: '17-3-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Pesado (265 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'prelims',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  prelims_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      categoria_peso: 'Peso Pesado (265 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Tybura',
        record: '27-10-0',
        ranking: '#8 HW',
      },
      fighter2: {
        nome: 'Fortune',
        record: '17-3-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.55,
          valueB: 3.20,
          maxVal: 7,
          format: 'decimal',
          note: 'Tybura tem volume levemente superior, consistente ao longo de 23 lutas no UFC',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 48,
          valueB: 45,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao similar, ambos conectam quase metade dos golpes',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.40,
          valueB: 3.10,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Numeros estimados para Fortune com base no circuito regional e Bellator',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 55,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
          note: 'Tybura tem defesa de strikes acima da media dos peso-pesado',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.39,
          valueB: 2.50,
          maxVal: 5,
          format: 'decimal',
          note: 'Fortune, ex-wrestler NCAA Division II, busca mais quedas',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 33,
          valueB: 42,
          maxVal: 100,
          format: 'percent',
          note: 'Fortune converte mais takedowns, reflexo do background de wrestling',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 79,
          valueB: 65,
          maxVal: 100,
          format: 'percent',
          note: 'Tybura tem uma das melhores defesas de takedown da historia da divisao (top 5 all-time)',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '40 anos', fighter2: '35 anos', note: '5 anos de diferenca, fator relevante na divisao mais pesada' },
        { label: 'Altura', fighter1: '1,91m (6\'3")', fighter2: '1,88m (6\'2")', note: null },
        { label: 'Envergadura', fighter1: '198cm (78")', fighter2: '196cm (77")', note: 'Tybura tem leve vantagem de alcance' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'S4 Fight Club / Lodz, Polonia', fighter2: 'Tempe, Arizona (ex-Blackzilians)', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Tybura',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Ante Delija',
            result: 'L',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocauteado no primeiro round em Paris. Derrota preocupante contra estreante da divisao.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Mick Parkin',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria solida por pontos em Londres contra prospect ingles promissor.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Jhonata Diniz',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Paralisacao medica no fim do segundo round apos cotoveladas no solo no UFC 309.',
          },
          {
            date: 'Ago 2024',
            opponent: 'Serghei Spivac',
            result: 'L',
            method: 'Sub R1 (Armbar)',
            opponent_rank: '#12 HW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Finalizado rapidamente por armbar. Segunda luta entre os dois, desta vez Spivac venceu.',
          },
          {
            date: 'Mar 2024',
            opponent: 'Tai Tuivasa',
            result: 'W',
            method: 'Sub R1 (RNC)',
            opponent_rank: '#14 HW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Finalizou Tuivasa com mata-leao no primeiro round, mostrando jiu-jitsu afiado.',
          },
        ],
      },
      fighter2: {
        nome: 'Fortune',
        recent_fights: [
          {
            date: '2025',
            opponent: 'Demoreo Dennis',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao rapida no primeiro round no circuito regional antes de assinar com o UFC.',
          },
          {
            date: '2025',
            opponent: 'Tony Lopez',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Mais uma finalizacao rapida em combate regional, mantendo atividade antes da estreia no UFC.',
          },
          {
            date: '2025',
            opponent: 'Myron Dennis',
            result: 'W',
            method: 'Sub R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao por submissao no primeiro round, dominancia total contra oponente regional.',
          },
          {
            date: '2024',
            opponent: 'Denis Goltsov',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Vitoria por pontos no PFL contra veterano pesado russo. Teste de nivel mais alto.',
          },
          {
            date: '2022',
            opponent: 'Daniel James',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute rapido no Bellator, mantendo seu historico de finalizacoes.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 68,
          valueB: 60,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Tybura tem 3.55 SLpM com 48% de precisao no UFC, testado contra os melhores peso-pesado do mundo. Fortune tem poder, mas nunca enfrentou strikers de elite.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 62,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Fortune tem 65% de vitorias por KO/TKO (11 nocautes em 17 vitorias). Tybura tem 10 KOs em 27 vitorias (37%). Fortune bate mais pesado.',
        },
        {
          label: 'Wrestling',
          valueA: 60,
          valueB: 78,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Fortune foi campeao NCAA Division II, competiu pela selecao americana de wrestling. Tybura compensa com 79% de defesa de takedown no UFC.',
        },
        {
          label: 'Jiu-Jitsu e Submissoes',
          valueA: 72,
          valueB: 45,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Tybura tem 7 vitorias por submissao, incluindo finalizacao recente de Tuivasa. Faixa preta de judo com transicoes perigosas. Fortune tem apenas 1 sub na carreira.',
        },
        {
          label: 'Defesa Geral',
          valueA: 70,
          valueB: 55,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Tybura tem 55% de defesa de strikes e 79% de defesa de takedown. Sobreviveu contra Aspinall, Gane, Blaydes. Fortune foi nocauteado por Timothy Johnson e finalizado.',
        },
        {
          label: 'Experiencia no Octagon',
          valueA: 90,
          valueB: 30,
          labelA: 'Excelente',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Tybura tem 23 lutas no UFC desde 2016, incluindo duelos contra campeoes e top 5. Fortune faz sua estreia absoluta no Octagon aos 35 anos.',
        },
      ],
      insight: 'Tybura e o veterano completo com quase uma decada no UFC, jiu-jitsu perigoso e defesa de takedown elite. Fortune traz wrestling de nivel olimpico, poder de nocaute e atletismo, mas nunca pisou no Octagon. A grande questao e: o wrestling de Fortune vai funcionar contra a defesa de takedown historica de Tybura? E se a luta ficar em pe, a experiencia do polones sera decisiva?',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Tybura',
        ko_tko: { count: 10, percent: 37 },
        submission: { count: 7, percent: 26 },
        decision: { count: 10, percent: 37 },
        total_wins: 27,
      },
      fighter2: {
        nome: 'Fortune',
        ko_tko: { count: 11, percent: 65 },
        submission: { count: 1, percent: 6 },
        decision: { count: 5, percent: 29 },
        total_wins: 17,
      },
      insight: 'Tybura e um dos lutadores mais equilibrados da divisao, com vitorias divididas igualmente entre KO (37%), submissao (26%) e decisao (37%). Pode vencer de qualquer forma. Fortune e um finalizador nato: 65% das vitorias por nocaute. Se ele conectar limpo, a luta pode acabar. Porem, quando Fortune nao consegue o nocaute, ele tende a ir para decisao, o que favorece a experiencia e QI de luta de Tybura.',
    },

    previsao_final: {
      winner_name: 'Tybura',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Tybura tem a vantagem massiva de experiencia no UFC, com 23 lutas contra a elite da divisao. Sua defesa de takedown de 79% deve neutralizar o wrestling de Fortune, e seu jiu-jitsu oferece perigo constante se a luta for ao chao. Fortune traz poder explosivo e atletismo, mas estrear no UFC aos 35 anos contra um top 8 ranqueado e um teste brutal. O polones ja mostrou que sabe lidar com poder (finalizou Tuivasa) e deve usar o jab, a distancia e a experiencia para vencer nos pontos. Porem, a derrota recente por KO contra Delija levanta duvidas sobre o queixo de Tybura aos 40 anos, e Fortune tem mao pesada.',
      x_factor: {
        title: 'A defesa de takedown de Tybura contra o wrestling de Fortune',
        description: 'Tybura tem a quinta melhor defesa de takedown da historia dos peso-pesado do UFC (79%). Fortune construiu sua carreira no wrestling, com titulo NCAA Division II. Se Tybura defender as quedas, a luta fica no territorio dele. Se Fortune conseguir derrubar, o jogo muda completamente.',
      },
      upset_alert: {
        title: 'Fortune tem poder para nocautear qualquer um',
        description: 'Com 65% de vitorias por KO/TKO, Fortune nao precisa de muitas oportunidades. Tybura foi nocauteado por Delija em setembro de 2025, e aos 40 anos, a resistencia ao impacto pode estar diminuindo. Um overhand direito ou um uppercut no clinch pode encerrar a noite cedo.',
      },
      probabilities: {
        fighter1: { nome: 'Tybura', percent: 55 },
        fighter2: { nome: 'Fortune', percent: 43 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT,
  evento_data: 'March 28, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Heavyweight (265 lbs)',
  fight_prediction: {
    ...analisePT.fight_prediction,
    predictedMethod: 'Unanimous Decision',
    confidence: 'MEDIUM',
  },
  prelims_analysis: {
    hero: {
      ...analisePT.prelims_analysis.hero,
      evento_data: 'March 28, 2026',
      categoria_peso: 'Heavyweight (265 lbs)',
    },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 3.55, valueB: 3.20, maxVal: 7, format: 'decimal', note: 'Tybura has slightly higher volume, consistent across 23 UFC fights' },
        { label: 'Striking Accuracy (%)', valueA: 48, valueB: 45, maxVal: 100, format: 'percent', note: 'Similar accuracy, both land nearly half their shots' },
        { label: 'Strikes Absorbed/Min', valueA: 3.40, valueB: 3.10, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Estimated numbers for Fortune based on regional/Bellator competition' },
        { label: 'Strike Defense (%)', valueA: 55, valueB: 50, maxVal: 100, format: 'percent', note: 'Tybura has above-average strike defense for heavyweight' },
        { label: 'Takedowns Per 15 Min', valueA: 1.39, valueB: 2.50, maxVal: 5, format: 'decimal', note: 'Fortune, a former NCAA Division II wrestler, looks for more takedowns' },
        { label: 'Takedown Accuracy (%)', valueA: 33, valueB: 42, maxVal: 100, format: 'percent', note: 'Fortune converts more takedowns, reflecting his wrestling pedigree' },
        { label: 'Takedown Defense (%)', valueA: 79, valueB: 65, maxVal: 100, format: 'percent', note: 'Tybura has one of the best takedown defense records in division history (top 5 all-time)' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '40 years old', fighter2: '35 years old', note: '5-year gap, relevant factor in the heaviest division' },
        { label: 'Height', fighter1: '6\'3" (1.91m)', fighter2: '6\'2" (1.88m)', note: null },
        { label: 'Reach', fighter1: '78" (198cm)', fighter2: '77" (196cm)', note: 'Tybura has a slight reach advantage' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
        { label: 'Gym', fighter1: 'S4 Fight Club / Lodz, Poland', fighter2: 'Tempe, Arizona (ex-Blackzilians)', note: null },
      ],
    },
    historico_lutas: {
      fighter1: {
        nome: 'Tybura',
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Ante Delija', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out in the first round in Paris. Concerning loss against a division newcomer.' },
          { date: 'Mar 2025', opponent: 'Mick Parkin', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Solid points win in London against a promising British prospect.' },
          { date: 'Nov 2024', opponent: 'Jhonata Diniz', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Doctor stoppage at the end of round two after ground elbows at UFC 309.' },
          { date: 'Aug 2024', opponent: 'Serghei Spivac', result: 'L', method: 'Sub R1 (Armbar)', opponent_rank: '#12 HW', quality_score: 3, quality_label: 'Good', note: 'Submitted quickly by armbar. Second fight between them, Spivac won this time.' },
          { date: 'Mar 2024', opponent: 'Tai Tuivasa', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: '#14 HW', quality_score: 3, quality_label: 'Good', note: 'Submitted Tuivasa with a rear-naked choke in the first round, showing sharp BJJ.' },
        ],
      },
      fighter2: {
        nome: 'Fortune',
        recent_fights: [
          { date: '2025', opponent: 'Demoreo Dennis', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Quick first-round finish on the regional circuit before signing with the UFC.' },
          { date: '2025', opponent: 'Tony Lopez', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Another quick regional finish, staying active before UFC debut.' },
          { date: '2025', opponent: 'Myron Dennis', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round submission, total dominance against a regional opponent.' },
          { date: '2024', opponent: 'Denis Goltsov', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'Decision win in the PFL against a veteran Russian heavyweight. Higher-level test.' },
          { date: '2022', opponent: 'Daniel James', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Quick knockout in Bellator, continuing his finishing streak.' },
        ],
      },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Stand-up Striking', valueA: 68, valueB: 60, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Tybura has 3.55 SLpM at 48% accuracy in the UFC, tested against the best heavyweights in the world. Fortune has power but has never faced elite strikers.' },
        { label: 'Knockout Power', valueA: 62, valueB: 72, labelA: 'Good', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Fortune has 65% KO/TKO wins (11 knockouts in 17 wins). Tybura has 10 KOs in 27 wins (37%). Fortune hits harder.' },
        { label: 'Wrestling', valueA: 60, valueB: 78, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Fortune was an NCAA Division II champion and competed for Team USA. Tybura compensates with 79% takedown defense in the UFC.' },
        { label: 'Jiu-Jitsu & Submissions', valueA: 72, valueB: 45, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Tybura has 7 submission wins, including a recent finish of Tuivasa. Judo black belt with dangerous transitions. Fortune has only 1 sub in his career.' },
        { label: 'Overall Defense', valueA: 70, valueB: 55, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Tybura has 55% strike defense and 79% takedown defense. Survived against Aspinall, Gane, Blaydes. Fortune was KOd by Timothy Johnson and submitted.' },
        { label: 'Octagon Experience', valueA: 90, valueB: 30, labelA: 'Excellent', labelB: 'Poor', advantage: 'fighter1', advantage_note: 'Tybura has 23 UFC fights since 2016, including bouts against champions and top 5. Fortune makes his absolute Octagon debut at 35.' },
      ],
      insight: 'Tybura is the complete veteran with nearly a decade in the UFC, dangerous jiu-jitsu, and elite takedown defense. Fortune brings Olympic-level wrestling, knockout power, and athleticism, but has never set foot in the Octagon. The big question: will Fortune\'s wrestling work against Tybura\'s historic takedown defense? And if the fight stays standing, will the Pole\'s experience be the deciding factor?',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Tybura', ko_tko: { count: 10, percent: 37 }, submission: { count: 7, percent: 26 }, decision: { count: 10, percent: 37 }, total_wins: 27 },
      fighter2: { nome: 'Fortune', ko_tko: { count: 11, percent: 65 }, submission: { count: 1, percent: 6 }, decision: { count: 5, percent: 29 }, total_wins: 17 },
      insight: 'Tybura is one of the most balanced fighters in the division, with wins split equally between KO (37%), submission (26%), and decision (37%). He can win any way. Fortune is a natural finisher: 65% of wins by knockout. If he lands clean, the fight could end. However, when Fortune can\'t get the KO, he tends to go to decision, which favors Tybura\'s experience and fight IQ.',
    },
    previsao_final: {
      winner_name: 'Tybura',
      winner_side: 'fighter1',
      predicted_method: 'Unanimous Decision',
      confidence_score: 5,
      confidence_label: 'MEDIUM',
      explanation: 'Tybura has a massive UFC experience advantage, with 23 fights against the division\'s elite. His 79% takedown defense should neutralize Fortune\'s wrestling, and his jiu-jitsu offers constant danger if the fight hits the mat. Fortune brings explosive power and athleticism, but debuting in the UFC at 35 against a ranked top 8 is a brutal test. The Pole has shown he can handle power (submitted Tuivasa) and should use the jab, distance, and experience to win on points. However, the recent KO loss to Delija raises questions about Tybura\'s chin at 40, and Fortune has heavy hands.',
      x_factor: { title: 'Tybura\'s takedown defense vs Fortune\'s wrestling', description: 'Tybura has the 5th best takedown defense in UFC heavyweight history (79%). Fortune built his career on wrestling, with an NCAA Division II title. If Tybura stuffs the takedowns, the fight stays in his territory. If Fortune gets him down, the game changes completely.' },
      upset_alert: { title: 'Fortune has knockout power to finish anyone', description: 'With 65% KO/TKO wins, Fortune doesn\'t need many opportunities. Tybura was knocked out by Delija in September 2025, and at 40, his ability to absorb damage may be declining. A right overhand or an uppercut in the clinch could end the night early.' },
      probabilities: { fighter1: { nome: 'Tybura', percent: 55 }, fighter2: { nome: 'Fortune', percent: 43 }, draw: 2 },
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
