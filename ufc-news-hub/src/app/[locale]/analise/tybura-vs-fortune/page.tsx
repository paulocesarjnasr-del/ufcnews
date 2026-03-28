import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'tybura-vs-fortune', evento_id: null, slug: 'tybura-vs-fortune', titulo: 'Tybura vs Fortune', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Pesado (265 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'Decisao Unanime', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Marcin Tybura', record: '27-10-0', ultimasLutas: [{ result: 'L', opponent: 'Ante Delija', method: 'KO R2', event: 'UFC Paris' }] },
  fighter2_info: { nome: 'Tyrell Fortune', record: '17-3-0', ultimasLutas: [{ result: 'W', opponent: 'Rafael Silva', method: 'TKO R2', event: 'Regional' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,88m', envergadura: '198cm', idade: 38, academia: 'Polonia' }, fighter2: { altura: '1,85m', envergadura: '193cm', idade: 33, academia: 'Cortes-Acosta gym' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Pesado (265 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Marcin Tybura', record: '27-10-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/TYBURA_MARCIN_L_03-28.png?itok=UmjJubdY' }, fighter2: { nome: 'Tyrell Fortune', record: '17-3-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/FORTUNE_TYRELL_R_03-28.png?itok=yJwXsAme' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.50, valueB: 4.20, maxVal: 6, format: 'decimal' },
        { label: 'Defesa de Strikes (%)', valueA: 52, valueB: 55, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 1.80, valueB: 2.50, maxVal: 4, format: 'decimal', note: 'Fortune e wrestler de base com Cortes-Acosta' },
        { label: 'Defesa de Takedown (%)', valueA: 68, valueB: 65, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '33 anos', note: 'Tybura mais velho' },
        { label: 'UFC Lutas', fighter1: '23 (!!)', fighter2: 'Debut', note: 'Tybura e um dos mais experientes da historia da divisao' },
        { label: 'Sequencia', fighter1: 'Vem de derrota (KO R2)', fighter2: '3 vitorias seguidas, debut UFC', note: null },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Tybura', recent_fights: [
        { date: 'Set 2025', opponent: 'Ante Delija', result: 'L', method: 'KO R1 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado. Queixo parece comprometido.' },
        { date: 'Mar 2025', opponent: 'Mick Parkin', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Wrestling e controle por 3 rounds.' },
        { date: 'Nov 2024', opponent: 'Jhonata Diniz', result: 'W', method: 'TKO (doctor stoppage) R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 309. Parado por corte.' },
        { date: 'Ago 2024', opponent: 'Serghei Spivac', result: 'L', method: 'Sub R1 (armbar)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Submetido no R1. Revanche (Tybura venceu primeira).' },
        { date: 'Mar 2024', opponent: 'Tai Tuivasa', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submeteu Tuivasa. POTN potencial.' },
        { date: 'Jul 2023', opponent: 'Tom Aspinall', result: 'L', method: 'TKO R1 (cotovelada + socos)', opponent_rank: '#1 HW', quality_score: 5, quality_label: 'Excelente', note: 'Aspirante ao titulo. Tybura sobreviveu mais que muitos.' },
        { date: 'Fev 2023', opponent: 'Blagoy Ivanov', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Veterano duro. Tybura controlou.' },
        { date: 'Ago 2022', opponent: 'Alexander Romanov', result: 'W', method: 'Decisao Majoritaria', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Vitoria importante contra wrestler invicto na epoca.' },
      ] },
      fighter2: { nome: 'Fortune', recent_fights: [
        { date: 'Dez 2025', opponent: 'Demoreo Dennis', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Terceira vitoria seguida. Regional.' },
        { date: 'Set 2025', opponent: 'Tony Lopez', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO rapido. Regional.' },
        { date: 'Jun 2025', opponent: 'Myron Dennis', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Regional.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Experiencia UFC', valueA: 90, valueB: 20, labelA: 'Excelente', labelB: 'Ruim', advantage: 'fighter1', advantage_note: '23 lutas UFC. Tybura e um dos mais experientes da historia do peso-pesado.' },
        { label: 'Wrestling', valueA: 65, valueB: 75, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Fortune treina com Cortes-Acosta e tem wrestling de base solido.' },
        { label: 'Juventude', valueA: 40, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Fortune tem 33 vs 38 de Tybura. 5 anos de diferenca e significativo no peso-pesado.' },
        { label: 'Striking', valueA: 58, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'even' },
        { label: 'Durabilidade', valueA: 55, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Tybura foi nocauteado por Delija. Fortune e mais fresco.' },
      ],
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Tybura', ko_tko: { count: 9, percent: 33 }, submission: { count: 8, percent: 30 }, decision: { count: 10, percent: 37 }, total_wins: 27 },
      fighter2: { nome: 'Fortune', ko_tko: { count: 10, percent: 59 }, submission: { count: 3, percent: 18 }, decision: { count: 4, percent: 23 }, total_wins: 17 },
      insight: 'Tybura e versatil (32% KO, 32% sub, 36% decisao). Fortune e mais finalizador (59% KO). Luta de peso-pesado pode acabar a qualquer momento.',
    },
    previsao_final: {
      winner_name: 'Tyrell Fortune', winner_side: 'fighter2', predicted_method: 'Decisao Unanime', confidence_score: 5, confidence_label: 'MEDIA',
      explanation: 'Fortune e mais jovem, mais fresco, com wrestling de base e 3 vitorias seguidas. Tybura tem experiencia massiva (23 lutas UFC) mas vem de nocaute e parece em declinio aos 38 anos. Fortune deve usar o wrestling e a juventude pra controlar por 3 rounds. Mas Tybura e extremamente duro e ja surpreendeu muita gente.',
      x_factor: { title: 'Debut UFC de Fortune', description: 'Estreia contra um veterano de 24 lutas. A pressao pode pesar ou pode motivar.' },
      upset_alert: { title: 'Tybura Tem 24 Lutas UFC', description: 'A experiencia de Tybura nao pode ser subestimada. Ele sabe como funcionar no octogono melhor que quase qualquer um.' },
      probabilities: { fighter1: { nome: 'Tybura', percent: 40 }, fighter2: { nome: 'Fortune', percent: 58 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'Fortune (-180)', reasoning: 'Favorito justo pela juventude e wrestling. Mas -180 e apertado dado que e debut.' },
        method: { pick: 'Over 1.5 Rounds', reasoning: 'Fortune tende a lutas mais longas. Tybura e duro. Provavelmente vai pros rounds finais.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Luta de peso-pesado com wrestler. Tende a ir a distancia se Fortune controlar.' },
        best_value: 'Over 2.5 se Fortune usar wrestling. Under 2.5 se alguem conectar pesado cedo. Luta dificil de prever.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
