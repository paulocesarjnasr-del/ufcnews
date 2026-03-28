import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'musayev-vs-bahamondes-pos-weighins',
  evento_id: null,
  slug: 'musayev-vs-bahamondes-pos-weighins',
  titulo: 'Musayev vs Bahamondes (Pos Weigh-Ins)',
  subtitulo: null,
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Leve (155 lbs)',
  status: 'published',
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'KO/TKO R2',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: { nome: 'Tofiq Musayev', record: '22-6-0', ultimasLutas: [{ result: 'L', opponent: 'Myktybek Orolbai', method: 'Sub R1 (kimura)', event: 'UFC on ABC 8' }] },
  fighter2_info: { nome: 'Ignacio Bahamondes', record: '17-6-0', ultimasLutas: [{ result: 'L', opponent: 'Rafael Fiziev', method: 'Decisao Unanime', event: 'UFC on ABC 8' }, { result: 'W', opponent: 'Jalin Turner', method: 'Sub R1 (triangulo)', event: 'UFC 313' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,80m', envergadura: '183cm', idade: 36, academia: 'Azerbaijan' }, fighter2: { altura: '1,88m', envergadura: '198cm', idade: 26, academia: 'Chile/USA' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
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
      fighter1: { nome: 'Tofiq Musayev', record: '22-6-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-06/MUSAYEV_TOFIQ_L_06-21.png?itok=eEnLq97J' },
      fighter2: { nome: 'Ignacio Bahamondes', record: '17-6-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/BAHAMONDES_IGNACIO_L_03-28.png?itok=SHgs079A' },
    },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.20, valueB: 5.50, maxVal: 7, format: 'decimal', note: 'Bahamondes tem volume altissimo com 3 POTN seguidos' },
        { label: 'Precisao de Strikes (%)', valueA: 45, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.50, valueB: 3.20, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Musayev absorve muito mais' },
        { label: 'Defesa de Strikes (%)', valueA: 42, valueB: 55, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.80, valueB: 0.50, maxVal: 3, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 68, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '36 anos', fighter2: '26 anos', note: 'Bahamondes 10 anos mais novo' },
        { label: 'Altura', fighter1: '1,80m', fighter2: '1,88m', note: 'Bahamondes 8cm mais alto' },
        { label: 'Envergadura', fighter1: '183cm', fighter2: '198cm', note: 'Bahamondes com 15cm (6 polegadas) a mais' },
        { label: 'Background', fighter1: 'Ex-campeao RIZIN, 18 KOs', fighter2: '3 finishes R1 seguidos com 3 POTN', note: 'Ambos sao nocauteadores' },
      ],
    },
    historico_lutas: {
      fighter1: {
        nome: 'Musayev',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Myktybek Orolbai', result: 'L', method: 'Sub R1 (kimura)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Submetido no debut UFC por kimura. Grappling e a fraqueza clara.' },
          { date: 'Dez 2023', opponent: 'Patricky Freire', result: 'W', method: 'Decisao Unanime', opponent_rank: 'Ex-campeao Bellator', quality_score: 4, quality_label: 'Muito Bom', note: 'Final do RIZIN Grand Prix. Venceu com mao quebrada no R2. Conquistou o titulo.' },
          { date: 'Out 2023', opponent: 'Juri Ohara', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO rapido no RIZIN Grand Prix semifinal.' },
          { date: 'Jul 2023', opponent: 'Yusuke Yachi', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO devastador no RIZIN. O poder de nocaute em acao.' },
          { date: 'Mar 2023', opponent: 'Roberto de Souza', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mais um nocaute. 18 KOs em 22 vitorias.' },
        ],
      },
      fighter2: {
        nome: 'Bahamondes',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Rafael Fiziev', result: 'L', method: 'Decisao Unanime', opponent_rank: '#8 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Primeira derrota em 4 lutas. Fiziev e elite.' },
          { date: 'Mar 2025', opponent: 'Jalin Turner', result: 'W', method: 'Sub R1 (triangulo)', opponent_rank: '#12 LW', quality_score: 3, quality_label: 'Bom', note: 'Terceiro finish R1 seguido. Terceiro POTN seguido.' },
          { date: 'Set 2024', opponent: 'Manuel Torres', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segundo POTN consecutivo. UFC 306.' },
          { date: 'Abr 2024', opponent: 'Christos Giagos', result: 'W', method: 'KO R1 (head kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Head kick devastador. Primeiro POTN da sequencia.' },
          { date: 'Ago 2023', opponent: 'Ludovit Klein', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu por decisao.' },
          { date: 'Abr 2023', opponent: 'Trey Ogden', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UFC 287.' },
          { date: 'Fev 2022', opponent: 'Zhu Rong', result: 'W', method: 'Sub R3 (brabo choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Submissao.' },
          { date: 'Ago 2021', opponent: 'Roosevelt Roberts', result: 'W', method: 'KO R3 (spinning wheel kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Chute giratorio ICONICA. Um dos KOs mais bonitos do ano.' },
          { date: 'Abr 2021', opponent: 'John Makdessi', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Derrota apertada.' },
        ],
      },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Poder de KO', valueA: 85, valueB: 88, labelA: 'Excelente', labelB: 'Excelente', advantage: 'even', advantage_note: 'Musayev tem 18 KOs em 22 vitorias (82%). Bahamondes tem 3 POTN seguidos. Ambos destroem.' },
        { label: 'Tamanho e Reach', valueA: 50, valueB: 85, labelA: 'Medio', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Bahamondes e 8cm mais alto com 15cm mais de reach. Vantagem MASSIVA na distancia. No face-off ficou evidente a diferenca de tamanho.' },
        { label: 'Grappling', valueA: 50, valueB: 68, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Bahamondes submeteu Turner com triangulo. Musayev foi submetido por Orolbai. Fraqueza vs forca.' },
        { label: 'Experiencia UFC', valueA: 25, valueB: 65, labelA: 'Ruim', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Bahamondes tem 9 lutas UFC. Musayev tem 1 (derrota). A diferenca e enorme.' },
        { label: 'Experiencia Global', valueA: 85, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Musayev e ex-campeao RIZIN. Lutou no Japao, Russia, Azerbaijan. Experiencia de vida e real.' },
        { label: 'Juventude e Atletismo', valueA: 45, valueB: 82, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Bahamondes tem 26 anos contra 36 de Musayev. A diferenca atletica e significativa.' },
      ],
      insight: 'Bahamondes e mais alto, mais jovem, mais experiente no UFC, e vem de 3 POTN seguidos. Musayev tem poder e experiencia global (RIZIN) mas foi submetido no debut. A vantagem de tamanho de Bahamondes (15cm de reach) e a maior desse matchup. No face-off da pesagem, a diferenca de tamanho entre os dois ficou ainda mais evidente.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Musayev', ko_tko: { count: 18, percent: 82 }, submission: { count: 2, percent: 9 }, decision: { count: 2, percent: 9 }, total_wins: 22 },
      fighter2: { nome: 'Bahamondes', ko_tko: { count: 10, percent: 59 }, submission: { count: 4, percent: 24 }, decision: { count: 3, percent: 17 }, total_wins: 17 },
      insight: 'Musayev e nocauteador puro (82% KO). Bahamondes e mais versatil (59% KO + 24% sub). Bahamondes mostrou que pode submeter (Turner) e nocautear (Giagos, Torres). Musayev depende do poder.',
    },
    previsao_final: {
      winner_name: 'Ignacio Bahamondes',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R2',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Bahamondes e mais alto (8cm), tem 15cm mais de reach, e 10 anos mais novo. Vem de 3 finishes no R1 com 3 POTN seguidos. Musayev tem poder (18 KOs) e experiencia global mas foi submetido no debut UFC e nunca enfrentou alguem com o tamanho e a versatilidade de Bahamondes. O tamanho e a experiencia UFC fazem a diferenca. Mas Musayev tem o poder pra acabar a qualquer momento. ATUALIZACAO POS WEIGH-INS: Ambos bateram o peso em 155 lbs sem problemas. A linha de Bahamondes subiu de -295 para -335, indicando dinheiro pesado chegando nele. No face-off, a diferenca de tamanho ficou brutal: Bahamondes com 8cm de altura e 15cm de reach a mais engoliu Musayev visualmente. A confianca sobe ligeiramente porque a pesagem confirmou que o tamanho e ainda mais impactante ao vivo.',
      x_factor: {
        title: '3 POTN Seguidos de Bahamondes',
        description: 'Bahamondes ganhou bonus de Performance em 3 lutas consecutivas (Giagos KO, Torres TKO, Turner Sub). Nivel de finish extremamente alto.',
      },
      upset_alert: {
        title: '18 KOs de Musayev',
        description: 'Musayev tem 82% de vitorias por KO. Ex-campeao RIZIN com poder genuino. Se conectar limpo, o tamanho de Bahamondes nao importa.',
      },
      probabilities: {
        fighter1: { nome: 'Musayev', percent: 32 },
        fighter2: { nome: 'Bahamondes', percent: 66 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Bahamondes (-335)', reasoning: 'Linha subiu de -295 para -335 apos pesagem. Favorito pesado e justificado pelo tamanho e momentum. Mas -335 nao oferece valor. So em parlay.' },
        method: { pick: 'Luta nao vai a Decisao (+100)', reasoning: 'Musayev tem 82% KO rate. Bahamondes tem 3 finishes R1 seguidos. Probabilidade MUITO alta de acabar antes dos juizes.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Dois nocauteadores explosivos. Bahamondes vinha de 3 finishes no R1. Musayev tem 82% KO. Nao vai longe.' },
        best_value: 'Under 2.5 Rounds continua sendo a aposta mais logica. A pesagem so confirmou que a diferenca de tamanho e real e que o dinheiro esta indo pro Bahamondes.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
