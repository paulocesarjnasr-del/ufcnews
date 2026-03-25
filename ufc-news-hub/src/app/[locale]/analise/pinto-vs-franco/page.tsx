'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';


const analisePT: PrelimsAnalise = {
  id: 'pinto-vs-franco',
  evento_id: null,
  slug: 'pinto-vs-franco',
  titulo: 'Pinto vs Franco',
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
    predictedMethod: 'TKO R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Mario Pinto',
    record: '11-0-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Felipe Franco',
    record: '10-1-0',
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
        nome: 'Pinto',
        record: '11-0-0',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Franco',
        record: '10-1-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 5.80,
          valueB: 4.20,
          maxVal: 8,
          format: 'decimal',
          note: 'Pinto tem volume impressionante para um peso pesado, quase 6 golpes por minuto',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 73,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Pinto tem precisao absurda de 73%, numero de elite na divisao',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.40,
          valueB: 4.10,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Pinto absorve menos por ser mais tecnico e finalizar rapido',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 58,
          valueB: 45,
          maxVal: 100,
          format: 'percent',
          note: 'Franco tem defesa abaixo da media, pode ser exposto contra striker de elite',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.50,
          valueB: 1.80,
          maxVal: 5,
          format: 'decimal',
          note: 'Franco tem background de jiu-jitsu e pode tentar levar ao chao',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 50,
          valueB: 45,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 70,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Pinto defende takedowns de forma solida e e perigoso quando levantado',
        },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '28 anos', fighter2: '25 anos', note: 'Ambos jovens para a divisao' },
        { label: 'Altura', fighter1: '1,96m (6\'5")', fighter2: '1,85m (6\'1")', note: 'Pinto tem 11cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '201cm (79")', fighter2: '193cm (76")', note: 'Pinto tem 3 polegadas a mais de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Fightzone London / Londres', fighter2: 'Galpao da Luta / Salvador, Brasil', note: null },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Pinto',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Jhonata Diniz',
            result: 'W',
            method: 'TKO R2 (ground-and-pound)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Dominou no ground-and-pound contra compatriota no UFC Rio. Manteve invencibilidade.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Austen Lane',
            result: 'W',
            method: 'KO R2 (0:39)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia no UFC com nocaute em 39 segundos do R2. Overhand right devastador.',
          },
          {
            date: 'Out 2024',
            opponent: 'Lucas Triverio Camacho',
            result: 'W',
            method: 'KO R1 (1:43)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute rapido no DWCS, garantiu contrato com o UFC.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Kasim Aras',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria por decisao unanime em luta de 5 rounds pelo titulo do Levels Fight League.',
          },
          {
            date: 'Out 2023',
            opponent: 'Benjamin Sehic',
            result: 'W',
            method: 'TKO R3 (1:18)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'TKO no terceiro round no Levels Fight League, defendendo titulo.',
          },
        ],
      },
      fighter2: {
        nome: 'Franco',
        recent_fights: [
          {
            date: 'Fev 2026',
            opponent: 'Douglas Felipe Santos',
            result: 'W',
            method: 'Sub R1 (mata-leao, 4:05)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao no primeiro round na cena regional brasileira, recuperacao apos derrota no DWCS.',
          },
          {
            date: 'Dez 2025',
            opponent: 'Kleberson Tavares',
            result: 'W',
            method: 'TKO R1 (0:32)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'TKO em 32 segundos, mostrou poder explosivo na volta apos derrota no DWCS.',
          },
          {
            date: 'Set 2025',
            opponent: 'Freddy Vidal',
            result: 'L',
            method: 'Sub R3 (mata-leao, 4:48)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota no DWCS por finalizacao no terceiro round. Perdeu a chance de contrato na primeira tentativa.',
          },
          {
            date: 'Ago 2024',
            opponent: 'Murilo dos Santos Ferreira',
            result: 'W',
            method: 'Sub R1 (arm-triangle, 1:10)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao por arm-triangle no circuito regional brasileiro.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Luis Henrique Conceicao',
            result: 'W',
            method: 'TKO R1 (2:21)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'TKO rapido no primeiro round em evento regional no nordeste.',
          },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 82,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Pinto tem 73% de precisao de strikes no UFC e poder nas duas maos. Franco e mais bruto e menos tecnico.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 85,
          valueB: 72,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Pinto nocauteou Lane com 39 segundos e tem 7 KOs na carreira. Seu overhand right e devastador na divisao.',
        },
        {
          label: 'Wrestling e Grappling',
          valueA: 62,
          valueB: 65,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Franco tem background de jiu-jitsu com competicoes na Bahia. Venceu por finalizacao recentemente. Leve vantagem no chao.',
        },
        {
          label: 'Defesa Geral',
          valueA: 68,
          valueB: 45,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Pinto defende melhor no geral. Franco foi finalizado no DWCS e tem defesa de strikes preocupante.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 62,
          valueB: 55,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Pinto mostrou capacidade de manter ritmo no R2 contra Diniz. Franco perdeu no R3 do DWCS por fadiga.',
        },
        {
          label: 'Experiencia no Octagon',
          valueA: 55,
          valueB: 20,
          labelA: 'Bom',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Pinto tem 2 lutas no UFC (2V-0D) com 2 finalizacoes. Franco faz sua estreia no UFC em aviso curto.',
        },
      ],
      insight: 'Pinto e claramente o favorito com striking mais tecnico, experiencia no Octagon e invencibilidade. Franco traz coragem e poder de finalizacao no chao, mas o salto de qualidade do circuito regional brasileiro para o UFC e enorme. A vantagem fisica de Pinto em altura e alcance deve ser decisiva.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Pinto',
        ko_tko: { count: 7, percent: 64 },
        submission: { count: 1, percent: 9 },
        decision: { count: 3, percent: 27 },
        total_wins: 11,
      },
      fighter2: {
        nome: 'Franco',
        ko_tko: { count: 6, percent: 60 },
        submission: { count: 4, percent: 40 },
        decision: { count: 0, percent: 0 },
        total_wins: 10,
      },
      insight: 'Ambos sao finalizadores que preferem resolver cedo. Pinto tem 64% de KOs e Franco 60%, com Franco adicionando 40% de finalizacoes por submissao. Nenhuma vitoria por decisao de Franco indica que ele sempre busca a finalizacao. Esta luta tem potencial explosivo.',
    },

    previsao_final: {
      winner_name: 'Pinto',
      winner_side: 'fighter1',
      predicted_method: 'TKO R2',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Mario Pinto e um dos prospectos mais empolgantes da divisao, invicto com 11-0 e 73% de precisao de strikes. Ele tem vantagem fisica enorme com 11cm de altura e 3 polegadas de envergadura sobre Franco, alem de 2 vitorias no UFC contra 0 do adversario. Franco e valente e tem poder, mas aceita a luta em aviso curto contra um rival que luta em casa. O nivel de oposicao de Franco no circuito regional brasileiro e incomparavel com o que Pinto ja enfrentou. O portugues radicado em Londres deve usar seu alcance para dominar na distancia e buscar a finalizacao no segundo round.',
      x_factor: {
        title: 'A precisao elite de Pinto',
        description: 'Com 73% de precisao de strikes no UFC, Pinto conecta quase 3 em cada 4 golpes. Contra um adversario com defesa de strikes de 45%, isso e uma receita para nocaute.',
      },
      upset_alert: {
        title: 'Franco pode surpreender no chao',
        description: 'Franco tem background de jiu-jitsu e 4 vitorias por finalizacao. Se conseguir levar Pinto ao chao com um takedown inesperado, tem as ferramentas para buscar a submissao. Nao seria a primeira vez que um estreante em aviso curto surpreende.',
      },
      probabilities: {
        fighter1: { nome: 'Pinto', percent: 72 },
        fighter2: { nome: 'Franco', percent: 26 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Pinto (-900)', reasoning: 'Pinto e 11-0 com 73% de precisao de strikes e 2-0 no UFC com KOs dominantes. Franco e short-notice e nunca lutou no UFC. O preco e altissimo mas o risco e minimo.' },
        method: { pick: 'Pinto por KO/TKO', reasoning: 'Pinto nocauteou Lane e Diniz no UFC. Franco tem 45% de defesa de strikes. A vantagem de alcance de Pinto (11cm mais alto) vai permitir dominar na distancia e buscar o finish.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'As 2 lutas de Pinto no UFC terminaram por KO. Franco aceita em short-notice sem preparacao especifica. A finalizacao antes do R3 e altamente provavel.' },
        best_value: 'Pinto por KO/TKO e a aposta mais segura. O preco nao oferece valor no moneyline, mas combinado com round (R1 ou R2) pode render.',
      },
    },
  },
};

const analiseEN: PrelimsAnalise = {
  ...analisePT, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Heavyweight (265 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM-HIGH' },
  prelims_analysis: {
    hero: { ...analisePT.prelims_analysis.hero, evento_data: 'March 21, 2026', categoria_peso: 'Heavyweight (265 lbs)' },
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 5.80, valueB: 4.20, maxVal: 8, format: 'decimal', note: 'Pinto has impressive volume for a heavyweight, nearly 6 strikes per minute' },
      { label: 'Striking Accuracy (%)', valueA: 73, valueB: 48, maxVal: 100, format: 'percent', note: 'Pinto has an absurd 73% accuracy, an elite number in the division' },
      { label: 'Strikes Absorbed/Min', valueA: 3.40, valueB: 4.10, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Pinto absorbs less because he\'s more technical and finishes fast' },
      { label: 'Strike Defense (%)', valueA: 58, valueB: 45, maxVal: 100, format: 'percent', note: 'Franco has below-average defense, could be exposed against an elite striker' },
      { label: 'Takedowns Per 15 Min', valueA: 1.50, valueB: 1.80, maxVal: 5, format: 'decimal', note: 'Franco has a jiu-jitsu background and may try to take it to the ground' },
      { label: 'Takedown Accuracy (%)', valueA: 50, valueB: 45, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 70, valueB: 55, maxVal: 100, format: 'percent', note: 'Pinto defends takedowns solidly and is dangerous when standing' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '28 years old', fighter2: '25 years old', note: 'Both young for the division' },
      { label: 'Height', fighter1: '6\'5" (1.96m)', fighter2: '6\'1" (1.85m)', note: 'Pinto has an 11cm height advantage' },
      { label: 'Reach', fighter1: '79" (201cm)', fighter2: '76" (193cm)', note: 'Pinto has 3 inches more reach' },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Gym', fighter1: 'Fightzone London / London', fighter2: 'Galpao da Luta / Salvador, Brazil', note: null },
    ] },
    historico_lutas: {
      fighter1: { nome: 'Pinto', recent_fights: [
        { date: 'Oct 2025', opponent: 'Jhonata Diniz', result: 'W', method: 'TKO R2 (ground-and-pound)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Dominated with ground-and-pound against his compatriot at UFC Rio. Kept his undefeated record.' },
        { date: 'Mar 2025', opponent: 'Austen Lane', result: 'W', method: 'KO R2 (0:39)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut with a knockout 39 seconds into R2. Devastating overhand right.' },
        { date: 'Oct 2024', opponent: 'Lucas Triverio Camacho', result: 'W', method: 'KO R1 (1:43)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Quick knockout on DWCS, earned UFC contract.' },
        { date: 'Feb 2024', opponent: 'Kasim Aras', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Unanimous decision win in a 5-round Levels Fight League title fight.' },
        { date: 'Oct 2023', opponent: 'Benjamin Sehic', result: 'W', method: 'TKO R3 (1:18)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Third-round TKO at Levels Fight League, defending the title.' },
      ] },
      fighter2: { nome: 'Franco', recent_fights: [
        { date: 'Feb 2026', opponent: 'Douglas Felipe Santos', result: 'W', method: 'Sub R1 (RNC, 4:05)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round submission on the Brazilian regional scene, recovery after DWCS loss.' },
        { date: 'Dec 2025', opponent: 'Kleberson Tavares', result: 'W', method: 'TKO R1 (0:32)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'TKO in 32 seconds, showed explosive power on his return after the DWCS loss.' },
        { date: 'Sep 2025', opponent: 'Freddy Vidal', result: 'L', method: 'Sub R3 (RNC, 4:48)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Lost on DWCS by third-round submission. Missed the contract on his first attempt.' },
        { date: 'Aug 2024', opponent: 'Murilo dos Santos Ferreira', result: 'W', method: 'Sub R1 (arm-triangle, 1:10)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Arm-triangle submission on the Brazilian regional circuit.' },
        { date: 'Jul 2024', opponent: 'Luis Henrique Conceicao', result: 'W', method: 'TKO R1 (2:21)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Quick first-round TKO at a regional event in northeastern Brazil.' },
      ] },
    },
    perfil_habilidades: { skills: [
      { label: 'Stand-up Striking', valueA: 82, valueB: 60, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Pinto has 73% striking accuracy in the UFC and power in both hands. Franco is more raw and less technical.' },
      { label: 'Knockout Power', valueA: 85, valueB: 72, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Pinto knocked out Lane in 39 seconds and has 7 career KOs. His overhand right is devastating in the division.' },
      { label: 'Wrestling & Grappling', valueA: 62, valueB: 65, labelA: 'Good', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Franco has a jiu-jitsu background with competitions in Bahia. Won by submission recently. Slight ground advantage.' },
      { label: 'Overall Defense', valueA: 68, valueB: 45, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Pinto defends better overall. Franco was submitted on DWCS and has concerning strike defense.' },
      { label: 'Cardio & Pace', valueA: 62, valueB: 55, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Pinto showed the ability to maintain pace into R2 against Diniz. Franco lost in R3 on DWCS from fatigue.' },
      { label: 'Octagon Experience', valueA: 55, valueB: 20, labelA: 'Good', labelB: 'Poor', advantage: 'fighter1', advantage_note: 'Pinto has 2 UFC fights (2W-0L) with 2 finishes. Franco makes his UFC debut on short notice.' },
    ], insight: 'Pinto is clearly the favorite with more technical striking, octagon experience, and an undefeated record. Franco brings courage and ground submission power, but the leap from the Brazilian regional circuit to the UFC is enormous. Pinto\'s physical advantages in height and reach should be decisive.' },
    distribuicao_vitorias: {
      fighter1: { nome: 'Pinto', ko_tko: { count: 7, percent: 64 }, submission: { count: 1, percent: 9 }, decision: { count: 3, percent: 27 }, total_wins: 11 },
      fighter2: { nome: 'Franco', ko_tko: { count: 6, percent: 60 }, submission: { count: 4, percent: 40 }, decision: { count: 0, percent: 0 }, total_wins: 10 },
      insight: 'Both are finishers who prefer to end things early. Pinto has 64% KOs and Franco 60%, with Franco adding 40% submissions. Zero decision wins for Franco indicates he always looks for the finish. This fight has explosive potential.',
    },
    previsao_final: {
      winner_name: 'Pinto', winner_side: 'fighter1', predicted_method: 'TKO R2', confidence_score: 7, confidence_label: 'MEDIUM-HIGH',
      explanation: 'Mario Pinto is one of the most exciting heavyweight prospects, undefeated at 11-0 with 73% striking accuracy. He has a massive physical advantage with 11cm of height and 3 inches of reach over Franco, plus 2 UFC wins versus 0 for his opponent. Franco is brave and has power, but is taking this fight on short notice against a rival fighting at home. Franco\'s level of opposition on the Brazilian regional circuit is incomparable to what Pinto has already faced. The Portuguese fighter based in London should use his reach to dominate from distance and look for the finish in the second round.',
      x_factor: { title: 'Pinto\'s elite accuracy', description: 'With 73% striking accuracy in the UFC, Pinto lands nearly 3 out of every 4 shots. Against an opponent with 45% strike defense, that\'s a recipe for a knockout.' },
      upset_alert: { title: 'Franco could surprise on the ground', description: 'Franco has a jiu-jitsu background and 4 submission wins. If he can take Pinto down with an unexpected takedown, he has the tools to look for the submission. It wouldn\'t be the first time a short-notice debutant pulled off an upset.' },
      probabilities: { fighter1: { nome: 'Pinto', percent: 72 }, fighter2: { nome: 'Franco', percent: 26 }, draw: 2 },
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
