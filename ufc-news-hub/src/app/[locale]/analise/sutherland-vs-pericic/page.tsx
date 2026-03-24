'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: PrelimsAnalise = {
  id: 'sutherland-vs-pericic',
  evento_id: null,
  slug: 'sutherland-vs-pericic',
  titulo: 'Sutherland vs Pericic',
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
    predictedMethod: 'KO/TKO R1',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Louie Sutherland',
    record: '10-4-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Brando Pericic',
    record: '5-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
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
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: '21 de Marco, 2026',
      categoria_peso: 'Peso Pesado (265 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Sutherland',
        record: '10-4-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Pericic',
        record: '5-1-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.20,
          valueB: 6.15,
          maxVal: 8,
          format: 'decimal',
          note: 'Pericic tem volume explosivo, mais de 6 strikes significativos por minuto na estreia',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 45,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Pericic conecta com mais precisao, fruto do background de kickboxing profissional',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.80,
          valueB: 2.50,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Pericic absorve muito menos golpes, finalizou rapido sem dar tempo de reacao',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 48,
          valueB: 60,
          maxVal: 100,
          format: 'percent',
          note: 'Sutherland tem defesa abaixo da media, foi finalizado por heel hook na estreia no UFC',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.80,
          valueB: 0.50,
          maxVal: 5,
          format: 'decimal',
          note: 'Sutherland tenta mais takedowns, pode ser seu caminho para a vitoria',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 42,
          valueB: 33,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 55,
          valueB: 70,
          maxVal: 100,
          format: 'percent',
          note: 'Pericic treina com Israel Adesanya e equipe de elite do City Kickboxing',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '31 anos', note: 'Idades muito proximas, ambos na faixa dos 30' },
        { label: 'Altura', fighter1: '1,91m (6\'3")', fighter2: '1,96m (6\'5")', note: 'Pericic tem 5cm de vantagem' },
        { label: 'Envergadura', fighter1: '193cm (76")', fighter2: '198cm (78")', note: 'Pericic tem 5cm a mais de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Great Britain Top Team / Inglaterra', fighter2: 'City Kickboxing / Auckland, NZ', note: 'Pericic treina com Adesanya e Volk' },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Sutherland',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Valter Walker',
            result: 'L',
            method: 'Sub R1 (heel hook, 1:24)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizado com heel hook em apenas 1:24 do primeiro round no UFC 321. Estreia no UFC desastrosa.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Luke Newland',
            result: 'W',
            method: 'TKO R1 (socos)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Conquistou o titulo do Levels Fight League 18 com nocaute no primeiro round.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Luis Carlos de Brito',
            result: 'W',
            method: 'TKO R1 (socos)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute no primeiro round no Levels Fight League 16, empilhando vitorias no circuito regional.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Renato Rangel',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por pontos no Levels Fight League 15, mostrou paciencia em luta mais longa.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Slim Trabelsi',
            result: 'L',
            method: 'Decisao Unanime (30-27 x3)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Dominado por 3 rounds no Bellator Champions Series em Paris contra wrestler frances.',
          },
        ],
      },
      fighter2: {
        nome: 'Pericic',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Elisha Ellison',
            result: 'W',
            method: 'TKO R1 (1:55)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia explosiva no UFC em Perth. Derrubou e finalizou com ground-and-pound em menos de 2 minutos. Performance of the Night.',
          },
          {
            date: 'Out 2024',
            opponent: 'Orion Kenny',
            result: 'W',
            method: 'TKO R1 (ground and pound, 1:08)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao explosiva no SFL 1, derrubou e finalizou com ground and pound em pouco mais de 1 minuto.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Tumanako Phillips',
            result: 'W',
            method: 'TKO R1 (socos, 0:17)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute em apenas 17 segundos no HEX Fight Series 30. Finalizacao relampago.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Randall Rayment',
            result: 'L',
            method: 'Sub R2 (mata-leao, 1:36)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Unica derrota da carreira. Finalizado por mata-leao no segundo round no Shuriken Fight Series.',
          },
          {
            date: 'Nov 2019',
            opponent: 'Kelvin Fitial',
            result: 'W',
            method: 'Sub R1 (mata-leao, 3:26)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao por mata-leao no primeiro round no Diamondback FC, uma das primeiras lutas profissionais.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 62,
          valueB: 82,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Pericic tem 18-2 no kickboxing profissional com multiplos titulos. Striking e sua arma principal e esta em outro patamar tecnico.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 72,
          valueB: 85,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Pericic tem 80% de vitorias por KO/TKO. Sutherland tambem tem poder, mas e menos consistente.',
        },
        {
          label: 'Wrestling e Grappling',
          valueA: 50,
          valueB: 48,
          labelA: 'Medio',
          labelB: 'Medio',
          advantage: 'even',
          advantage_note: 'Ambos sao principalmente strikers. Nenhum dos dois tem wrestling de alto nivel, mas Sutherland tenta mais takedowns.',
        },
        {
          label: 'Defesa Geral',
          valueA: 42,
          valueB: 60,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Sutherland foi finalizado por heel hook na estreia no UFC e dominado por decisao no Bellator. Pericic treina com elite do CKB e absorve menos golpes.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 50,
          valueB: 55,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Como peso pesado, ambos preferem resolver cedo. Pericic nunca passou do R1 nas suas vitorias.',
        },
        {
          label: 'Experiencia no Octagon',
          valueA: 45,
          valueB: 35,
          labelA: 'Medio',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Sutherland tem 1 luta no UFC (0V-1D), Pericic tem 1 vitoria por KO. Ambos sao novatos no Octagon.',
        },
      ],
      insight: 'Pericic e tecnicamente superior no striking com background de kickboxing profissional e treinamento na elite do City Kickboxing. Sutherland tem poder mas e inconsistente defensivamente. Esta luta provavelmente nao vai para os cartoes.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Sutherland',
        ko_tko: { count: 8, percent: 80 },
        submission: { count: 0, percent: 0 },
        decision: { count: 2, percent: 20 },
        total_wins: 10,
      },
      fighter2: {
        nome: 'Pericic',
        ko_tko: { count: 4, percent: 80 },
        submission: { count: 1, percent: 20 },
        decision: { count: 0, percent: 0 },
        total_wins: 5,
      },
      insight: 'Dois nocauteadores na divisao mais pesada do UFC. Sutherland tem 80% de KOs e Pericic impressionantes 80%, com zero vitorias por decisao. Pericic nunca precisou dos juizes para vencer. Esta luta tem tudo para acabar antes do gongo final.',
    },

    previsao_final: {
      winner_name: 'Pericic',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R1',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Brando Pericic tem vantagem tecnica clara no striking com background de kickboxing profissional (18-2) e treinamento no City Kickboxing com Israel Adesanya. Sutherland tem poder mas e vulneravel defensivamente, tendo sido dominado no Bellator e finalizado por heel hook na estreia no UFC. Pericic e mais alto, tem mais alcance e treina com uma equipe de nivel mundial. A unica chance de Sutherland e conectar um golpe limpo aproveitando a torcida em casa, mas Pericic deve ser tecnico demais para permitir isso.',
      x_factor: {
        title: 'O treinamento do City Kickboxing',
        description: 'Pericic treina diariamente com ex-campeoes como Adesanya e Volkanovski. Esse nivel de sparring prepara para qualquer adversario, especialmente contra um striker menos tecnico como Sutherland.',
      },
      upset_alert: {
        title: 'Sutherland em casa com a torcida',
        description: 'Sutherland luta na Inglaterra com o apoio da O2 Arena. Ele tem poder real nas maos e, como peso pesado, um unico soco pode mudar tudo. Se conectar cedo antes de Pericic encontrar seu ritmo, pode surpreender.',
      },
      probabilities: {
        fighter1: { nome: 'Sutherland', percent: 35 },
        fighter2: { nome: 'Pericic', percent: 63 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Pericic (-275)', reasoning: 'Pericic treina no City Kickboxing com Adesanya e Volkanovski. Nivel de sparring incomparavel. Favorito justo mas o preco nao oferece muito valor.' },
        method: { pick: 'Pericic por KO/TKO R1', reasoning: 'Ambos tem 100% de finish rate. Pericic e mais tecnico, mais rapido e tem melhor footwork. O KO no primeiro round e o cenario mais provavel nessa luta de peso pesado.' },
        over_under: { pick: 'Under 1.5 Rounds', rounds: 1.5, reasoning: 'Dois pesos pesados com 100% de finalizacao nas vitorias. Nenhuma das vitorias combinadas foi pra decisao. Alguem vai dormir cedo.' },
        best_value: 'Under 1.5 rounds e a aposta mais segura. Luta de pesos pesados finalizadores, os dois buscam o nocaute. Dificilmente chega ao R2.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Heavyweight (265 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: 'Heavyweight (265 lbs)' },
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 4.20, valueB: 6.15, maxVal: 8, format: 'decimal', note: 'Pericic has explosive volume, over 6 significant strikes per minute on debut' },
      { label: 'Striking Accuracy (%)', valueA: 45, valueB: 55, maxVal: 100, format: 'percent', note: 'Pericic lands with more precision, a product of his professional kickboxing background' },
      { label: 'Strikes Absorbed/Min', valueA: 3.80, valueB: 2.50, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Pericic absorbs far fewer shots, finished fast without giving opponents time to react' },
      { label: 'Strike Defense (%)', valueA: 48, valueB: 60, maxVal: 100, format: 'percent', note: 'Sutherland has below-average defense, was submitted by heel hook on his UFC debut' },
      { label: 'Takedowns Per 15 Min', valueA: 1.80, valueB: 0.50, maxVal: 5, format: 'decimal', note: 'Sutherland attempts more takedowns, could be his path to victory' },
      { label: 'Takedown Accuracy (%)', valueA: 42, valueB: 33, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 55, valueB: 70, maxVal: 100, format: 'percent', note: 'Pericic trains with Israel Adesanya and the elite City Kickboxing team' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '32 years old', fighter2: '31 years old', note: 'Very close in age, both in their 30s' },
      { label: 'Height', fighter1: '6\'3" (1.91m)', fighter2: '6\'5" (1.96m)', note: 'Pericic has a 5cm advantage' },
      { label: 'Reach', fighter1: '76" (193cm)', fighter2: '78" (198cm)', note: 'Pericic has 5cm more reach' },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Gym', fighter1: 'Great Britain Top Team / England', fighter2: 'City Kickboxing / Auckland, NZ', note: 'Pericic trains with Adesanya and Volk' },
    ] },
    historico_lutas: {
      fighter1: { nome: 'Sutherland', recent_fights: [
        { date: 'Oct 2025', opponent: 'Valter Walker', result: 'L', method: 'Sub R1 (heel hook, 1:24)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted by heel hook in just 1:24 of the first round at UFC 321. Disastrous UFC debut.' },
        { date: 'Jun 2025', opponent: 'Luke Newland', result: 'W', method: 'TKO R1 (punches)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Won the Levels Fight League 18 title with a first-round knockout.' },
        { date: 'Feb 2025', opponent: 'Luis Carlos de Brito', result: 'W', method: 'TKO R1 (punches)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round knockout at Levels Fight League 16, stacking wins on the regional circuit.' },
        { date: 'Dec 2024', opponent: 'Renato Rangel', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Points win at Levels Fight League 15, showed patience in a longer fight.' },
        { date: 'May 2024', opponent: 'Slim Trabelsi', result: 'L', method: 'Unanimous Decision (30-27 x3)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Dominated for 3 rounds at Bellator Champions Series in Paris against a French wrestler.' },
      ] },
      fighter2: { nome: 'Pericic', recent_fights: [
        { date: 'Sep 2025', opponent: 'Elisha Ellison', result: 'W', method: 'TKO R1 (1:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Explosive UFC debut in Perth. Dropped and finished with ground-and-pound in under 2 minutes. Performance of the Night.' },
        { date: 'Oct 2024', opponent: 'Orion Kenny', result: 'W', method: 'TKO R1 (ground and pound, 1:08)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Explosive finish at SFL 1, dropped and finished with ground and pound in just over 1 minute.' },
        { date: 'May 2024', opponent: 'Tumanako Phillips', result: 'W', method: 'TKO R1 (punches, 0:17)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Knockout in just 17 seconds at HEX Fight Series 30. Lightning finish.' },
        { date: 'Apr 2024', opponent: 'Randall Rayment', result: 'L', method: 'Sub R2 (RNC, 1:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Only career loss. Submitted by rear-naked choke in the second round at Shuriken Fight Series.' },
        { date: 'Nov 2019', opponent: 'Kelvin Fitial', result: 'W', method: 'Sub R1 (RNC, 3:26)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Rear-naked choke submission in the first round at Diamondback FC.' },
      ] },
    },
    perfil_habilidades: { skills: [
      { label: 'Stand-up Striking', valueA: 62, valueB: 82, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Pericic is 18-2 in professional kickboxing with multiple titles. Striking is his primary weapon and he\'s on another technical level.' },
      { label: 'Knockout Power', valueA: 72, valueB: 85, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Pericic has 80% wins by KO/TKO. Sutherland also has power but is less consistent.' },
      { label: 'Wrestling & Grappling', valueA: 50, valueB: 48, labelA: 'Average', labelB: 'Average', advantage: 'even', advantage_note: 'Both are primarily strikers. Neither has high-level wrestling, but Sutherland attempts more takedowns.' },
      { label: 'Overall Defense', valueA: 42, valueB: 60, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Sutherland was submitted by heel hook on debut and dominated by decision at Bellator. Pericic trains with CKB elite and absorbs fewer strikes.' },
      { label: 'Cardio & Pace', valueA: 50, valueB: 55, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'As heavyweights, both prefer to finish early. Pericic has never gone past R1 in his wins.' },
      { label: 'Octagon Experience', valueA: 45, valueB: 35, labelA: 'Average', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Sutherland has 1 UFC fight (0W-1L), Pericic has 1 KO win. Both are octagon rookies.' },
    ], insight: 'Pericic is technically superior in striking with a professional kickboxing background and training at the elite City Kickboxing gym. Sutherland has power but is defensively inconsistent. This fight probably won\'t go to the scorecards.' },
    distribuicao_vitorias: {
      fighter1: { nome: 'Sutherland', ko_tko: { count: 8, percent: 80 }, submission: { count: 0, percent: 0 }, decision: { count: 2, percent: 20 }, total_wins: 10 },
      fighter2: { nome: 'Pericic', ko_tko: { count: 4, percent: 80 }, submission: { count: 1, percent: 20 }, decision: { count: 0, percent: 0 }, total_wins: 5 },
      insight: 'Two knockout artists in the UFC\'s heaviest division. Sutherland has 80% KOs and Pericic an impressive 80% with zero decision wins. Pericic has never needed the judges to win. This fight has everything to end before the final bell.',
    },
    previsao_final: {
      winner_name: 'Pericic', winner_side: 'fighter2', predicted_method: 'KO/TKO R1', confidence_score: 6, confidence_label: 'MEDIUM',
      explanation: 'Brando Pericic has a clear technical striking advantage with a professional kickboxing background (18-2) and training at City Kickboxing with Israel Adesanya. Sutherland has power but is defensively vulnerable, having been dominated at Bellator and submitted by heel hook on his UFC debut. Pericic is taller, has more reach, and trains with a world-class team. Sutherland\'s only chance is to land a clean shot riding the home crowd energy, but Pericic should be too technical to allow that.',
      x_factor: { title: 'City Kickboxing training', description: 'Pericic trains daily with former champions like Adesanya and Volkanovski. That level of sparring prepares you for any opponent, especially against a less technical striker like Sutherland.' },
      upset_alert: { title: 'Sutherland at home with the crowd', description: 'Sutherland fights in England with the O2 Arena behind him. He has real power and as a heavyweight, one punch can change everything. If he connects early before Pericic finds his rhythm, he could surprise.' },
      probabilities: { fighter1: { nome: 'Sutherland', percent: 35 }, fighter2: { nome: 'Pericic', percent: 63 }, draw: 2 },
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
