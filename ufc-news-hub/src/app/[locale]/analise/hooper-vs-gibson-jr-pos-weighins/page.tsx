import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'hooper-vs-gibson-jr-pos-weighins',
  evento_id: null,
  slug: 'hooper-vs-gibson-jr-pos-weighins',
  titulo: 'Hooper vs Gibson Jr. (Pos Weigh-Ins)',
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
    predictedMethod: 'Submission',
    confidence: 'ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Chase Hooper',
    record: '16-4-1',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Lance Gibson Jr.',
    record: '9-2-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
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
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      categoria_peso: 'Peso Leve (155 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Hooper',
        record: '16-4-1',
        ranking: undefined,
      },
      fighter2: {
        nome: 'Gibson Jr.',
        record: '9-2-0',
        ranking: undefined,
      },
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.53, valueB: 3.20, maxVal: 7, format: 'decimal', note: 'Hooper tem volume ofensivo muito superior, quase 4.5 golpes significativos por minuto' },
        { label: 'Precisao de Strikes (%)', valueA: 51, valueB: 45, maxVal: 100, format: 'percent', note: 'Hooper conecta pouco mais da metade dos golpes, precisao solida para um grappler' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.96, valueB: 3.50, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Hooper absorve menos strikes, reflexo de levar a luta ao chao com frequencia' },
        { label: 'Defesa de Strikes (%)', valueA: 38, valueB: 42, maxVal: 100, format: 'percent', note: 'Ambos tem defesa de strikes abaixo da media, area vulneravel para os dois' },
        { label: 'Takedowns por 15 Min', valueA: 2.59, valueB: 1.50, maxVal: 5, format: 'decimal', note: 'Hooper busca takedowns com muito mais frequencia, refletindo seu jogo baseado em grappling' },
        { label: 'Precisao de Takedown (%)', valueA: 35, valueB: 40, maxVal: 100, format: 'percent', note: 'Gibson converte em percentual maior, mas tenta com menos frequencia' },
        { label: 'Defesa de Takedown (%)', valueA: 53, valueB: 55, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '26 anos', fighter2: '31 anos', note: 'Hooper e 5 anos mais jovem' },
        { label: 'Altura', fighter1: '1,85m (6\'1")', fighter2: '1,78m (5\'9")', note: 'Hooper tem 7cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '188cm (74")', fighter2: '184cm (72")', note: 'Hooper com 4cm a mais de alcance' },
        { label: 'Stance', fighter1: 'Canhoto (Southpaw)', fighter2: 'Ortodoxa', note: 'Dinamica canhoto vs ortodoxo' },
        { label: 'Academia', fighter1: 'Combat Sport and Fitness / Washington', fighter2: 'Gibson MMA / Port Moody, BC, Canada', note: 'Hooper luta em casa em Seattle' },
      ],
    },

    historico_lutas: {
      fighter1: {
        nome: 'Hooper',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Alexander Hernandez', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Parado rapidamente no primeiro round. Hernandez explorou o striking fragil de Hooper antes que pudesse levar ao chao.' },
          { date: 'Abr 2025', opponent: 'Jim Miller', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida por decisao contra um dos veteranos mais respeitados do UFC. Mostrou maturidade tatica ao longo de 3 rounds.' },
          { date: 'Dez 2024', opponent: 'Clay Guida', result: 'W', method: 'Sub R1 (armbar)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Armbar fulminante no primeiro round contra veterano do UFC. Ganhou Performance da Noite.' },
          { date: 'Mai 2024', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R2 (D\'Arce choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizou com um D\'Arce choke no segundo round. Neutralizou o striking perigoso de Borshchev levando ao chao.' },
          { date: 'Nov 2023', opponent: 'Jordan Leavitt', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mata-leao no primeiro round, finalizacao rapida mostrando elite no grappling.' },
        ],
      },
      fighter2: {
        nome: 'Gibson Jr.',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'King Green', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Estreia no UFC por split decision em luta catchweight (160 lbs). Combate competitivo contra veterano, resultado apertado.' },
          { date: 'Mar 2023', opponent: 'Vladimir Tokov', result: 'L', method: 'KO R1 (0:62)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado em 62 segundos no Bellator 293. Primeira derrota profissional, expondo vulnerabilidade no queixo.' },
          { date: 'Out 2022', opponent: 'Nainoa Dung', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mata-leao no primeiro round no Bellator, finalizacao rapida mostrando habilidade no chao.' },
          { date: 'Mai 2022', opponent: 'Raymond Pina', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO no segundo round no Bellator 268. Gibson mostrou poder nos punhos em finalizacao por strikes.' },
          { date: 'Nov 2021', opponent: 'Marcus Surin', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no primeiro round no Bellator, consolidando sequencia de finalizacoes rapidas.' },
        ],
      },
    },

    perfil_habilidades: {
      skills: [
        { label: 'Jiu-Jitsu e Grappling', valueA: 88, valueB: 62, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Hooper tem 8 vitorias por finalizacao com variedade absurda: armbar, RNC, D\'Arce, triangle, heel hook. Nivel elite no chao. Gibson tem 3 subs mas contra competicao inferior.' },
        { label: 'Striking em Pe', valueA: 42, valueB: 58, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Gibson tem 4 KOs na carreira e poder real nas maos. Hooper foi nocauteado por Hernandez e tem defesa de strikes de 38%. O pe de Hooper e seu ponto fraco.' },
        { label: 'Wrestling Ofensivo', valueA: 65, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Hooper tenta 2.59 takedowns por 15 min e precisa levar ao chao para aplicar seu jogo. Precisao de 35% e baixa, mas o volume compensa.' },
        { label: 'Poder de Finalizacao (KO)', valueA: 35, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Gibson nocauteou 4 oponentes e Tokov provou que Gibson tambem pode ser nocauteado. Hooper quase nunca para alguem em pe, suas finalizacoes vem do chao.' },
        { label: 'Cardio e Resistencia', valueA: 72, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Hooper ja venceu por decisao unanime contra Jim Miller em 3 rounds e tem 12 lutas no UFC. Gibson tem 6 de 9 vitorias no R1, nunca foi testado em ritmo alto por 3 rounds.' },
        { label: 'Experiencia no UFC', valueA: 78, valueB: 30, labelA: 'Muito Bom', labelB: 'Ruim', advantage: 'fighter1', advantage_note: 'Hooper tem 12 lutas no UFC (8V-4D) desde 2019. Gibson fez apenas 1 luta no UFC e perdeu. A diferenca de quilometragem no Octagon e enorme.' },
      ],
      insight: 'Essa luta se resume a uma pergunta simples: Gibson consegue manter a luta em pe? Se sim, tem poder para machucar Hooper, que possui defesa de strikes fragil e ja foi parado por Hernandez. Mas se Hooper conseguir o takedown, o jogo muda completamente. Hooper e um dos melhores finalizadores da divisao e Gibson nunca enfrentou alguem com esse nivel de jiu-jitsu. A experiencia de 12 lutas no UFC contra apenas 1 de Gibson tambem pesa muito.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Hooper', ko_tko: { count: 4, percent: 25 }, submission: { count: 8, percent: 50 }, decision: { count: 4, percent: 25 }, total_wins: 16 },
      fighter2: { nome: 'Gibson Jr.', ko_tko: { count: 4, percent: 44 }, submission: { count: 3, percent: 34 }, decision: { count: 2, percent: 22 }, total_wins: 9 },
      insight: 'Hooper e dominantemente um finalizador: 50% das vitorias por submission, com variedade impressionante de tecnicas (armbar, RNC, D\'Arce, heel hook, triangle). Gibson tem perfil mais equilibrado entre KO (44%) e submission (34%), com poder real nas maos. Ambos sao finishers, mas por caminhos diferentes. Hooper quer o chao, Gibson quer conectar em pe.',
    },

    previsao_final: {
      winner_name: 'Hooper',
      winner_side: 'fighter1',
      predicted_method: 'Submission R2',
      confidence_score: 8,
      confidence_label: 'ALTA',
      explanation: 'Hooper luta em casa em Seattle, tem 12 lutas de experiencia no UFC contra apenas 1 de Gibson, e possui um jiu-jitsu de nivel elite com 8 vitorias por finalizacao. A chave da luta e o takedown: Hooper tenta com frequencia (2.59 por 15 min) e, uma vez no chao, Gibson nunca enfrentou um grappler desse calibre. A preocupacao para Hooper e o caminho ate o takedown, ja que Gibson tem poder nos punhos (4 KOs) e Hooper tem defesa de strikes fragil (38%). Se Hooper sobreviver os primeiros minutos em pe e conseguir agarrar Gibson, o jiu-jitsu deve ser decisivo. ATUALIZACAO POS WEIGH-INS: Ambos bateram o peso em 155 lbs sem problemas. O fator mais importante da pesagem e o contexto: Hooper e do estado de Washington e esta lutando em casa. O UFC.com publicou um artigo destacado sobre ele: "Chase Hooper Finally Knows He Belongs". A motivacao extra de lutar diante da torcida de casa, combinada com o reconhecimento do UFC, eleva a confianca. Hooper parece estar no melhor momento mental e fisico da carreira. A confianca sobe de MEDIA-ALTA para ALTA.',
      x_factor: {
        title: 'Hooper lutando em casa em Seattle com artigo do UFC',
        description: 'Hooper treina no estado de Washington e tera o Climate Pledge Arena inteiro torcendo por ele. O UFC.com publicou artigo "Chase Hooper Finally Knows He Belongs", sinalizando que a organizacao esta investindo no momento dele. Lutadores com esse tipo de push em casa historicamente entregam performances especiais.',
      },
      upset_alert: {
        title: 'O poder de Gibson nos primeiros minutos',
        description: 'Gibson nocauteou Surin e outros no primeiro round. Se ele conectar limpo antes de Hooper fechar a distancia, pode repetir o que Hernandez fez. Hooper tem a defesa de strikes mais baixa entre os dois (38%) e ja provou que pode ser parado cedo.',
      },
      probabilities: {
        fighter1: { nome: 'Hooper', percent: 67 },
        fighter2: { nome: 'Gibson Jr.', percent: 30 },
        draw: 3,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
