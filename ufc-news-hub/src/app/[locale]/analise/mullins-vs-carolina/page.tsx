'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'mullins-vs-carolina',
  evento_id: null,
  slug: 'mullins-vs-carolina',
  titulo: 'Mullins vs Carolina',
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
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Melissa Mullins',
    record: '7-2-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Luana Carolina',
    record: '11-5-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Galo Feminino (135 lbs)',
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
      categoria_peso: 'Peso Galo Feminino (135 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Mullins',
        record: '7-2-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Carolina',
        record: '11-5-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.80,
          valueB: 4.65,
          maxVal: 7,
          format: 'decimal',
          note: 'Carolina tem volume superior de strikes, quase 5 golpes significativos por minuto',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 44,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
          note: 'Carolina conecta metade dos golpes, precisao acima da media da divisao',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.60,
          valueB: 4.00,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Mullins absorve menos golpes, indicando boa movimentacao defensiva',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 52,
          valueB: 47,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.20,
          valueB: 0.15,
          maxVal: 5,
          format: 'decimal',
          note: 'Mullins busca mais takedowns, Carolina quase nunca tenta levar ao chao',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 40,
          valueB: 25,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 65,
          valueB: 76,
          maxVal: 100,
          format: 'percent',
          note: 'Carolina tem excelente defesa de takedown, 76%, dificil de derrubar',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '34 anos', fighter2: '32 anos', note: null },
        { label: 'Altura', fighter1: '1,70m (5\'7")', fighter2: '1,67m (5\'6")', note: null },
        { label: 'Envergadura', fighter1: '173cm (68")', fighter2: '175cm (69")', note: 'Carolina tem leve vantagem no alcance' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'Gym01 / Coventry, Inglaterra', fighter2: 'Tata Fight Team / Brasil', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Mullins',
        recent_fights: [
          {
            date: 'Nov 2024',
            opponent: 'Klaudia Sygula',
            result: 'W',
            method: 'TKO R2 (1:20)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Primeira finalizacao no UFC, parou Sygula com strikes no segundo round. Resposta forte apos derrota.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Nora Cornolle',
            result: 'L',
            method: 'TKO R2 (3:06)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Parada no segundo round por strikes, exposta no striking contra francesa mais tecnica.',
          },
          {
            date: 'Out 2023',
            opponent: 'Irina Alekseeva',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia no UFC com vitoria solida por pontos em 3 rounds, controle tatico.',
          },
          {
            date: 'Mai 2023',
            opponent: 'Daria Zhelezniakova',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota por pontos antes de entrar no UFC, combate competitivo mas insuficiente.',
          },
          {
            date: 'Dez 2022',
            opponent: 'Mariam Torchinava',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute no primeiro round no circuito europeu, mostrando poder surpreendente.',
          },
        ],
      },
      fighter2: {
        nome: 'Carolina',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Michelle Montague',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota com deducao de ponto por upkick ilegal. Primeira luta no peso galo, adaptacao complicada.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Lucie Pudilova',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Vitoria solida contra veterana da divisao, dominou com striking tecnico por 3 rounds.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Julija Stoliarenko',
            result: 'W',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'TKO no terceiro round, finalizacao por strikes apos dominar a luta inteira.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Ivana Petrovic',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria por pontos em luta competitiva, manteve sequencia positiva no UFC.',
          },
          {
            date: 'Mar 2023',
            opponent: 'Joanne Wood',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: '#12 FLW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Derrota por decisao dividida contra veterana escocesa no UFC 286. Luta competitiva, perdeu por margem apertada.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 58,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Carolina tem faixa preta de Muay Thai e volume de 4.65 SLpM com 50% de precisao. Mullins e competente mas menos tecnica.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 58,
          valueB: 60,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'even',
          advantage_note: 'Ambas tem TKOs recentes, Mullins parou Sygula e Carolina parou Stoliarenko. Poder similar na divisao.',
        },
        {
          label: 'Wrestling e Grappling',
          valueA: 55,
          valueB: 52,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'even',
          advantage_note: 'Mullins busca mais takedowns (1.20/15min) mas Carolina defende 76%. Jiu-jitsu competitivo para ambas.',
        },
        {
          label: 'Defesa Geral',
          valueA: 55,
          valueB: 58,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'even',
          advantage_note: 'Mullins foi parada por Cornolle e Carolina perdeu por decisao. Ambas tem vulnerabilidades mas nenhuma e fragil.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 60,
          valueB: 68,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Carolina tem 10 lutas no UFC e ja lutou 5 rounds. Experiencia em manter ritmo alto por toda a luta.',
        },
        {
          label: 'Experiencia no UFC',
          valueA: 45,
          valueB: 78,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Carolina tem 10 lutas no UFC (6V-4D) incluindo lutas contra ranqueadas. Mullins tem 3 lutas (2V-1D). Diferenca enorme.',
        },
      ],
      insight: 'Carolina e a lutadora mais experiente e completa, com faixa preta de Muay Thai, 10 lutas no UFC e volume de strikes superior. Mullins traz coragem e poder de finalizacao, mas falta experiencia no alto nivel. A brasileira vem de derrota e precisa da vitoria para manter seu lugar na divisao, o que pode gerar urgencia extra.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Mullins',
        ko_tko: { count: 4, percent: 57 },
        submission: { count: 0, percent: 0 },
        decision: { count: 3, percent: 43 },
        total_wins: 7,
      },
      fighter2: {
        nome: 'Carolina',
        ko_tko: { count: 3, percent: 27 },
        submission: { count: 1, percent: 9 },
        decision: { count: 7, percent: 64 },
        total_wins: 11,
      },
      insight: 'Mullins vence 57% por KO/TKO e 43% por decisao, perfil direto sem finalizacoes. Carolina e uma decisora com 64% das vitorias por pontos, complementadas por 3 KOs e 1 finalizacao. Carolina e mais consistente e completa, enquanto Mullins depende mais do poder nos golpes.',
    },

    previsao_final: {
      winner_name: 'Carolina',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Luana Carolina tem vantagem significativa em experiencia (10 lutas no UFC vs 3), volume de strikes (4.65 vs 3.80 SLpM) e versatilidade. Sua faixa preta de Muay Thai deve dar vantagem tecnica na trocacao contra Mullins, que foi parada por strikes por Cornolle. Carolina vem de derrota e tem motivacao extra, enquanto Mullins viaja para Londres com menos experiencia no Octagon. Porem, Mullins luta em casa e mostrou capacidade de finalizacao ao parar Sygula. Se a inglesa conectar no tempo certo, pode surpreender.',
      x_factor: {
        title: 'A experiencia de Carolina no UFC',
        description: 'Com 10 lutas no Octagon contra apenas 3 de Mullins, Carolina sabe lidar com a pressao, o ritmo e os juizes do UFC. Essa maturidade competitiva e insubstituivel e deve aparecer nos momentos decisivos da luta.',
      },
      upset_alert: {
        title: 'Mullins em casa com poder de finalizacao',
        description: 'Mullins parou Sygula com strikes no R2 e tem 57% de vitorias por KO/TKO. A torcida da O2 Arena vai empurrar a inglesa e, se Carolina mostrar as mesmas lacunas defensivas que apareceram contra Montague, Mullins pode capitalizar.',
      },
      probabilities: {
        fighter1: { nome: 'Mullins', percent: 40 },
        fighter2: { nome: 'Carolina', percent: 58 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: "Women's Bantamweight (135 lbs)",
  fight_prediction: { ...analisePT.fight_prediction, predictedMethod: 'Unanimous Decision', confidence: 'MEDIUM' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: "Women's Bantamweight (135 lbs)" },
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 3.80, valueB: 4.65, maxVal: 7, format: 'decimal', note: 'Carolina has superior strike volume, nearly 5 significant strikes per minute' },
      { label: 'Striking Accuracy (%)', valueA: 44, valueB: 50, maxVal: 100, format: 'percent', note: 'Carolina lands half her shots, above-average accuracy for the division' },
      { label: 'Strikes Absorbed/Min', valueA: 3.60, valueB: 4.00, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Mullins absorbs fewer strikes, indicating good defensive movement' },
      { label: 'Strike Defense (%)', valueA: 52, valueB: 47, maxVal: 100, format: 'percent' },
      { label: 'Takedowns Per 15 Min', valueA: 1.20, valueB: 0.15, maxVal: 5, format: 'decimal', note: 'Mullins looks for more takedowns, Carolina almost never tries to take it down' },
      { label: 'Takedown Accuracy (%)', valueA: 40, valueB: 25, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 65, valueB: 76, maxVal: 100, format: 'percent', note: 'Carolina has excellent takedown defense at 76%, hard to take down' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '34 years old', fighter2: '32 years old', note: null },
      { label: 'Height', fighter1: '5\'7" (1.70m)', fighter2: '5\'6" (1.67m)', note: null },
      { label: 'Reach', fighter1: '68" (173cm)', fighter2: '69" (175cm)', note: 'Carolina has a slight reach advantage' },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Gym', fighter1: 'Gym01 / Coventry, England', fighter2: 'Tata Fight Team / Brazil', note: null },
    ] },
    historico_lutas: {
      fighter1: { nome: 'Mullins', recent_fights: [
        { date: 'Nov 2024', opponent: 'Klaudia Sygula', result: 'W', method: 'TKO R2 (1:20)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First UFC finish, stopped Sygula with strikes in the second round. Strong response after a loss.' },
        { date: 'Apr 2024', opponent: 'Nora Cornolle', result: 'L', method: 'TKO R2 (3:06)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Stopped in the second round by strikes, exposed in striking against a more technical Frenchwoman.' },
        { date: 'Oct 2023', opponent: 'Irina Alekseeva', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut with a solid points win over 3 rounds, tactical control.' },
        { date: 'May 2023', opponent: 'Daria Zhelezniakova', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Points loss before joining the UFC, competitive but insufficient.' },
        { date: 'Dec 2022', opponent: 'Mariam Torchinava', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round knockout on the European circuit, showing surprising power.' },
      ] },
      fighter2: { nome: 'Carolina', recent_fights: [
        { date: 'Sep 2025', opponent: 'Michelle Montague', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Lost with a point deduction for an illegal upkick. First fight at bantamweight, complicated adjustment.' },
        { date: 'Jul 2024', opponent: 'Lucie Pudilova', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'Solid win against a division veteran, dominated with technical striking for 3 rounds.' },
        { date: 'Feb 2024', opponent: 'Julija Stoliarenko', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Third-round TKO, finish by strikes after dominating the entire fight.' },
        { date: 'Jul 2023', opponent: 'Ivana Petrovic', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Points win in a competitive fight, maintained positive streak in the UFC.' },
        { date: 'Mar 2023', opponent: 'Joanne Wood', result: 'L', method: 'Split Decision', opponent_rank: '#12 FLW', quality_score: 3, quality_label: 'Good', note: 'Split decision loss against the Scottish veteran at UFC 286. Competitive fight, lost by a narrow margin.' },
      ] },
    },
    perfil_habilidades: { skills: [
      { label: 'Stand-up Striking', valueA: 58, valueB: 72, labelA: 'Good', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Carolina has a Muay Thai black belt and volume of 4.65 SLpM at 50% accuracy. Mullins is competent but less technical.' },
      { label: 'Finishing Power', valueA: 58, valueB: 60, labelA: 'Good', labelB: 'Good', advantage: 'even', advantage_note: 'Both have recent TKOs, Mullins stopped Sygula and Carolina stopped Stoliarenko. Similar power in the division.' },
      { label: 'Wrestling & Grappling', valueA: 55, valueB: 52, labelA: 'Good', labelB: 'Average', advantage: 'even', advantage_note: 'Mullins attempts more takedowns (1.20/15min) but Carolina defends 76%. Competitive jiu-jitsu for both.' },
      { label: 'Overall Defense', valueA: 55, valueB: 58, labelA: 'Good', labelB: 'Good', advantage: 'even', advantage_note: 'Mullins was stopped by Cornolle and Carolina lost by decision. Both have vulnerabilities but neither is fragile.' },
      { label: 'Cardio & Pace', valueA: 60, valueB: 68, labelA: 'Good', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Carolina has 10 UFC fights and has fought 5 rounds. Experience in maintaining a high pace throughout.' },
      { label: 'UFC Experience', valueA: 45, valueB: 78, labelA: 'Average', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Carolina has 10 UFC fights (6W-4L) including fights against ranked opponents. Mullins has 3 fights (2W-1L). Huge difference.' },
    ], insight: 'Carolina is the more experienced and complete fighter, with a Muay Thai black belt, 10 UFC fights, and superior strike volume. Mullins brings courage and finishing power, but lacks high-level experience. The Brazilian is coming off a loss and needs the win to maintain her spot in the division, which could generate extra urgency.' },
    distribuicao_vitorias: {
      fighter1: { nome: 'Mullins', ko_tko: { count: 4, percent: 57 }, submission: { count: 0, percent: 0 }, decision: { count: 3, percent: 43 }, total_wins: 7 },
      fighter2: { nome: 'Carolina', ko_tko: { count: 3, percent: 27 }, submission: { count: 1, percent: 9 }, decision: { count: 7, percent: 64 }, total_wins: 11 },
      insight: 'Mullins wins 57% by KO/TKO and 43% by decision, a straightforward profile with no submissions. Carolina is a decision fighter with 64% of wins on points, supplemented by 3 KOs and 1 submission. Carolina is more consistent and complete, while Mullins relies more on power in her strikes.',
    },
    previsao_final: {
      winner_name: 'Carolina', winner_side: 'fighter2', predicted_method: 'Unanimous Decision', confidence_score: 6, confidence_label: 'MEDIUM',
      explanation: 'Luana Carolina has a significant experience advantage (10 UFC fights vs 3), superior strike volume (4.65 vs 3.80 SLpM), and versatility. Her Muay Thai black belt should give her a technical edge in the striking against Mullins, who was stopped by strikes from Cornolle. Carolina is coming off a loss and has extra motivation, while Mullins travels to London with less octagon experience. However, Mullins fights at home and showed finishing ability when she stopped Sygula. If the Brit connects at the right time, she could surprise.',
      x_factor: { title: 'Carolina\'s UFC experience', description: 'With 10 octagon fights against just 3 for Mullins, Carolina knows how to handle the pressure, the pace, and the judges in the UFC. That competitive maturity is irreplaceable and should show up in the decisive moments.' },
      upset_alert: { title: 'Mullins at home with finishing power', description: 'Mullins stopped Sygula with strikes in R2 and has 57% wins by KO/TKO. The O2 Arena crowd will push the Brit and if Carolina shows the same defensive gaps she did against Montague, Mullins could capitalize.' },
      probabilities: { fighter1: { nome: 'Mullins', percent: 40 }, fighter2: { nome: 'Carolina', percent: 58 }, draw: 2 },
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
