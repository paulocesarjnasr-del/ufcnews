'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'dyer-vs-oliveira',
  evento_id: null,
  slug: 'dyer-vs-oliveira',
  titulo: 'Dyer vs Oliveira',
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
    nome: 'Shanelle Dyer',
    record: '6-1-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Ravena Oliveira',
    record: '7-3-1',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Palha Feminino (115 lbs)',
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
      categoria_peso: 'Peso Palha Feminino (115 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Dyer',
        record: '6-1-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Oliveira',
        record: '7-3-1',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.80,
          valueB: 5.20,
          maxVal: 8,
          format: 'decimal',
          note: 'Ambas com volume alto para a divisao feminina, luta tende a ser agitada',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 46,
          valueB: 42,
          maxVal: 100,
          format: 'percent',
          note: 'Dyer conecta com mais precisao, fruto do background de Muay Thai',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.50,
          valueB: 5.10,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Oliveira absorve mais golpes, foi finalizada no terceiro round contra Luciano',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 48,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
          note: 'Dyer tem defesa superior, embora ambas ainda tenham muito a melhorar',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.60,
          valueB: 0.80,
          maxVal: 5,
          format: 'decimal',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 33,
          valueB: 35,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 70,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Dyer defende takedowns de forma mais consistente',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '24 anos', fighter2: '29 anos', note: 'Dyer e 5 anos mais jovem' },
        { label: 'Altura', fighter1: '1,67m (5\'6")', fighter2: '1,65m (5\'5")', note: null },
        { label: 'Envergadura', fighter1: '167cm (65.7")', fighter2: '165cm (65")', note: null },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'Great Britain Top Team / Inglaterra', fighter2: 'Galpao da Luta / Salvador, Brasil', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Dyer',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Carol Foro',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota na DWCS mas ganhou contrato mesmo assim. Foi derrubada 2 vezes no R1 mas se recuperou com coragem impressionante.',
          },
          {
            date: 'Set 2024',
            opponent: 'Valentina Scatizzi',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao dividida no PFL Europe 3 Playoffs, mostrando competitividade em luta acirrada.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Mariam Torchinava',
            result: 'W',
            method: 'KO R1 (head kick, 3:53)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute por chute na cabeca no PFL Europe, mostrando tecnica de Muay Thai de alto nivel.',
          },
          {
            date: 'Dez 2023',
            opponent: 'Liliya Kazak',
            result: 'W',
            method: 'TKO R3 (1:08)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'TKO no terceiro round no Ares 18, mostrando capacidade de manter pressao.',
          },
          {
            date: 'Set 2023',
            opponent: 'Luisa Fernanda Cifuentes',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por pontos no PFL Europe Playoffs, mostrando capacidade de lutar 3 rounds completos.',
          },
        ],
      },
      fighter2: {
        nome: 'Oliveira',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Stephanie Luciano',
            result: 'L',
            method: 'Sub R3 (mata-leao, 2:50)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizada no terceiro round, fadiga pareceu ser fator. Ainda sem vitoria no UFC.',
          },
          {
            date: 'Out 2023',
            opponent: 'Tainara Lisboa',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC por decisao unanime. Nao conseguiu impor seu jogo de strikes contra veterana.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Simone da Silva',
            result: 'W',
            method: 'KO/TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute no primeiro round no LKC 5, antes de assinar com o UFC.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Raquel de Andrade',
            result: 'W',
            method: 'KO/TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute rapido no MC Fight, mostrando poder impressionante para a divisao.',
          },
          {
            date: 'Jan 2022',
            opponent: 'Sheila Amaral',
            result: 'W',
            method: 'Submissao R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao no primeiro round no Demo Fight 11, unica vitoria por submissao na carreira.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 72,
          valueB: 68,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Dyer treina Muay Thai desde os 9 anos e tem tecnica mais refinada. Oliveira tem poder bruto mas menos tecnica.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 72,
          valueB: 78,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Oliveira tem 86% de vitorias por KO/TKO, poder raro na divisao feminina. Dyer tambem tem 67% de KOs, ambas perigosas.',
        },
        {
          label: 'Wrestling e Grappling',
          valueA: 50,
          valueB: 45,
          labelA: 'Medio',
          labelB: 'Medio',
          advantage: 'even',
          advantage_note: 'Nenhuma das duas e forte no grappling. Ambas preferem resolver em pe, a luta tende a ficar na trocacao.',
        },
        {
          label: 'Defesa Geral',
          valueA: 58,
          valueB: 42,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Dyer mostrou resiliencia incrivel ao se recuperar de 2 quedas contra Foro. Oliveira foi finalizada no R3 por Luciano.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 68,
          valueB: 52,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Dyer lutou 3 rounds contra Foro e melhorou nos rounds finais. Oliveira foi finalizada no R3, possivel problema de cardio.',
        },
        {
          label: 'Experiencia no UFC',
          valueA: 25,
          valueB: 35,
          labelA: 'Ruim',
          labelB: 'Medio',
          advantage: 'fighter2',
          advantage_note: 'Oliveira tem 2 lutas no UFC (0V-2D). Dyer faz sua estreia oficial no Octagon. Nenhuma tem vantagem significativa.',
        },
      ],
      insight: 'Duas strikers com poder de nocaute acima da media para a divisao feminina. Dyer tem tecnica superior com background de Muay Thai e melhor cardio, enquanto Oliveira traz poder bruto explosivo nos primeiros rounds. Dyer precisa sobreviver ao inicio e impor seu ritmo. Se a luta passar do R2, a vantagem muda completamente para a inglesa.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Dyer',
        ko_tko: { count: 4, percent: 67 },
        submission: { count: 0, percent: 0 },
        decision: { count: 2, percent: 33 },
        total_wins: 6,
      },
      fighter2: {
        nome: 'Oliveira',
        ko_tko: { count: 6, percent: 86 },
        submission: { count: 1, percent: 14 },
        decision: { count: 0, percent: 0 },
        total_wins: 7,
      },
      insight: 'Duas nocauteadoras na divisao mais leve do UFC feminino. Oliveira tem o indice mais impressionante com 86% de vitorias por KO/TKO, numero raro entre mulheres. Dyer tem 67% de nocautes. Nenhuma das duas vence por decisao com frequencia (Oliveira nunca venceu nos pontos). Esta luta tem alta probabilidade de finalizacao por strikes.',
    },

    previsao_final: {
      winner_name: 'Dyer',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Shanelle Dyer tem a vantagem de lutar em casa na O2 Arena e demonstrou resiliencia incrivel ao se recuperar de duas quedas contra Carol Foro no DWCS. Seu Muay Thai e tecnicamente superior ao striking de Oliveira e seu cardio e visivelmente melhor. Oliveira tem poder explosivo mas vem de 2 derrotas consecutivas no UFC e mostrou vulnerabilidade no cardio ao ser finalizada no terceiro round. Se Dyer sobreviver ao primeiro round e impor seu ritmo nos rounds 2 e 3, deve acumular pontos suficientes para a vitoria. Porem, o poder de Oliveira no inicio da luta torna qualquer previsao incerta.',
      x_factor: {
        title: 'A resiliencia de Dyer',
        description: 'Ser derrubada 2 vezes no primeiro round da DWCS e voltar para lutar os 3 rounds completos mostra uma mentalidade de guerreira. Em casa, com a torcida empurrando, essa resiliencia pode ser o fator decisivo se Oliveira conectar cedo.',
      },
      upset_alert: {
        title: 'Oliveira tem poder para surpreender qualquer uma',
        description: 'Com 86% de vitorias por nocaute, Oliveira e uma das maiores nocauteadoras da divisao. Se conectar limpo nos primeiros minutos como fez nas suas 6 vitorias por KO no circuito regional, pode acabar com a luta antes de Dyer ter tempo de se adaptar.',
      },
      probabilities: {
        fighter1: { nome: 'Dyer', percent: 55 },
        fighter2: { nome: 'Oliveira', percent: 43 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Dyer (-500)', reasoning: 'Dyer e favorita massiva com 7.67 strikes/min contra 1.40 de Oliveira. O volume e tecnica de Muay Thai sao incomparaveis. O preco e alto mas justificado.' },
        method: { pick: 'Dyer por Decisao', reasoning: 'Dyer tende a lutas de volume. Oliveira e dura e tem 66% de precisao de takedown pra sobreviver. A dinamica favorece ida aos juizes com Dyer dominando nos pontos.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Oliveira e dura e tem experiencia de 3 rounds. Dyer domina no volume mas pode nao ter poder pra finalizar. Decisao e o cenario mais provavel.' },
        best_value: 'Over 2.5 rounds combinado com Dyer por decisao. O volume de Dyer vai dominar mas Oliveira e resistente o suficiente pra sobreviver.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: "Women's Strawweight (115 lbs)",
  fight_prediction: { ...analisePT.fight_prediction, predictedMethod: 'Unanimous Decision', confidence: 'MEDIUM' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: "Women's Strawweight (115 lbs)" },
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 4.80, valueB: 5.20, maxVal: 8, format: 'decimal', note: 'Both with high volume for the women\'s division, fight is likely to be action-packed' },
      { label: 'Striking Accuracy (%)', valueA: 46, valueB: 42, maxVal: 100, format: 'percent', note: 'Dyer lands with more precision, a reflection of her Muay Thai background' },
      { label: 'Strikes Absorbed/Min', valueA: 4.50, valueB: 5.10, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Oliveira absorbs more strikes, was submitted in the third round against Luciano' },
      { label: 'Strike Defense (%)', valueA: 48, valueB: 40, maxVal: 100, format: 'percent', note: 'Dyer has superior defense, although both still have room to improve' },
      { label: 'Takedowns Per 15 Min', valueA: 0.60, valueB: 0.80, maxVal: 5, format: 'decimal' },
      { label: 'Takedown Accuracy (%)', valueA: 33, valueB: 35, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 70, valueB: 55, maxVal: 100, format: 'percent', note: 'Dyer defends takedowns more consistently' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '24 years old', fighter2: '29 years old', note: 'Dyer is 5 years younger' },
      { label: 'Height', fighter1: '5\'6" (1.67m)', fighter2: '5\'5" (1.65m)', note: null },
      { label: 'Reach', fighter1: '65.7" (167cm)', fighter2: '65" (165cm)', note: null },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Gym', fighter1: 'Great Britain Top Team / England', fighter2: 'Galpao da Luta / Salvador, Brazil', note: null },
    ] },
    historico_lutas: {
      fighter1: { nome: 'Dyer', recent_fights: [
        { date: 'Sep 2025', opponent: 'Carol Foro', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Lost on DWCS but earned a contract anyway. Was dropped twice in R1 but recovered with incredible courage.' },
        { date: 'Sep 2024', opponent: 'Valentina Scatizzi', result: 'W', method: 'Split Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Split decision win at PFL Europe 3 Playoffs, showing competitiveness in a tight fight.' },
        { date: 'Jun 2024', opponent: 'Mariam Torchinava', result: 'W', method: 'KO R1 (head kick, 3:53)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Head kick knockout at PFL Europe, showing high-level Muay Thai technique.' },
        { date: 'Dec 2023', opponent: 'Liliya Kazak', result: 'W', method: 'TKO R3 (1:08)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Third-round TKO at Ares 18, showing the ability to maintain pressure.' },
        { date: 'Sep 2023', opponent: 'Luisa Fernanda Cifuentes', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Points win at PFL Europe Playoffs, showing the ability to fight 3 full rounds.' },
      ] },
      fighter2: { nome: 'Oliveira', recent_fights: [
        { date: 'Oct 2025', opponent: 'Stephanie Luciano', result: 'L', method: 'Sub R3 (RNC, 2:50)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted in the third round, fatigue seemed to be a factor. Still winless in the UFC.' },
        { date: 'Oct 2023', opponent: 'Tainara Lisboa', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut by unanimous decision. Couldn\'t impose her striking against the veteran.' },
        { date: 'Aug 2023', opponent: 'Simone da Silva', result: 'W', method: 'KO/TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round knockout at LKC 5, before signing with the UFC.' },
        { date: 'Jul 2023', opponent: 'Raquel de Andrade', result: 'W', method: 'KO/TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Quick knockout at MC Fight, showing impressive power for the division.' },
        { date: 'Jan 2022', opponent: 'Sheila Amaral', result: 'W', method: 'Submission R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round submission at Demo Fight 11, only career submission win.' },
      ] },
    },
    perfil_habilidades: { skills: [
      { label: 'Stand-up Striking', valueA: 72, valueB: 68, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Dyer has trained Muay Thai since age 9 and has more refined technique. Oliveira has raw power but less technique.' },
      { label: 'Knockout Power', valueA: 72, valueB: 78, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Oliveira has 86% wins by KO/TKO, rare power in the women\'s division. Dyer also has 67% KOs, both are dangerous.' },
      { label: 'Wrestling & Grappling', valueA: 50, valueB: 45, labelA: 'Average', labelB: 'Average', advantage: 'even', advantage_note: 'Neither is strong in grappling. Both prefer to settle it on the feet, fight is likely to stay in the striking.' },
      { label: 'Overall Defense', valueA: 58, valueB: 42, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Dyer showed incredible resilience recovering from 2 knockdowns against Foro. Oliveira was submitted in R3 by Luciano.' },
      { label: 'Cardio & Pace', valueA: 68, valueB: 52, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Dyer fought 3 rounds against Foro and improved in the later rounds. Oliveira was submitted in R3, possible cardio issue.' },
      { label: 'UFC Experience', valueA: 25, valueB: 35, labelA: 'Poor', labelB: 'Average', advantage: 'fighter2', advantage_note: 'Oliveira has 2 UFC fights (0W-2L). Dyer makes her official octagon debut. Neither has a significant advantage.' },
    ], insight: 'Two strikers with above-average knockout power for the women\'s division. Dyer has superior technique with a Muay Thai background and better cardio, while Oliveira brings explosive raw power in the early rounds. Dyer needs to survive the opening and impose her pace. If the fight passes R2, the advantage shifts completely to the Brit.' },
    distribuicao_vitorias: {
      fighter1: { nome: 'Dyer', ko_tko: { count: 4, percent: 67 }, submission: { count: 0, percent: 0 }, decision: { count: 2, percent: 33 }, total_wins: 6 },
      fighter2: { nome: 'Oliveira', ko_tko: { count: 6, percent: 86 }, submission: { count: 1, percent: 14 }, decision: { count: 0, percent: 0 }, total_wins: 7 },
      insight: 'Two knockout artists in the UFC\'s lightest women\'s division. Oliveira has the most impressive rate at 86% wins by KO/TKO, a rare number among women. Dyer has 67% knockouts. Neither wins by decision often (Oliveira has never won on points). This fight has a high probability of a stoppage by strikes.',
    },
    previsao_final: {
      winner_name: 'Dyer', winner_side: 'fighter1', predicted_method: 'Unanimous Decision', confidence_score: 5, confidence_label: 'MEDIUM',
      explanation: 'Shanelle Dyer has the advantage of fighting at home in the O2 Arena and demonstrated incredible resilience recovering from two knockdowns against Carol Foro on DWCS. Her Muay Thai is technically superior to Oliveira\'s striking and her cardio is visibly better. Oliveira has explosive power but comes off 2 consecutive UFC losses and showed vulnerability in cardio when submitted in the third round. If Dyer survives the first round and imposes her pace in rounds 2 and 3, she should accumulate enough points for the win. However, Oliveira\'s power at the start makes any prediction uncertain.',
      x_factor: { title: 'Dyer\'s resilience', description: 'Getting dropped twice in the first round of DWCS and coming back to fight all 3 full rounds shows a warrior\'s mentality. At home, with the crowd pushing, that resilience could be the deciding factor if Oliveira connects early.' },
      upset_alert: { title: 'Oliveira has the power to surprise anyone', description: 'With 86% wins by knockout, Oliveira is one of the biggest knockout artists in the division. If she connects clean in the opening minutes like she did in her 6 KO wins on the regional circuit, she could end the fight before Dyer has time to adapt.' },
      probabilities: { fighter1: { nome: 'Dyer', percent: 55 }, fighter2: { nome: 'Oliveira', percent: 43 }, draw: 2 },
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
