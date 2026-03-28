import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'brasil-vs-thainara', evento_id: null, slug: 'brasil-vs-thainara', titulo: 'Brasil vs Thainara', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Palha Feminino (115 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decisao Unanime', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Bruna Brasil', record: '11-6-1', ultimasLutas: [{ result: 'W', opponent: 'Lucrezia Ria', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  fighter2_info: { nome: 'Alexia Thainara', record: '13-1-0', ultimasLutas: [{ result: 'W', opponent: 'Nicolle Caliari', method: 'KO R1', event: 'DWCS' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,63m', envergadura: '165cm', idade: 30, academia: 'Brasil' }, fighter2: { altura: '1,60m', envergadura: '160cm', idade: 25, academia: 'Brasil' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Palha Feminino (115 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Bruna Brasil', record: '11-6-1', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-02/BRASIL_BRUNA_L_02-07.png?itok=afUQXzT9' }, fighter2: { nome: 'Alexia Thainara', record: '13-1-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-09/THAINARA_ALEXIA_R_09-27.png?itok=aT_FWNEf' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.00, valueB: 3.50, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 45, valueB: 42, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 1.50, valueB: 0.80, maxVal: 3, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 65, valueB: 55, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '30 anos', fighter2: '25 anos', note: 'Thainara mais nova' },
        { label: 'Experiencia', fighter1: '18 lutas profissionais', fighter2: '14 lutas profissionais', note: 'Revanche: Brasil venceu Thainara em 2019' },
        { label: 'UFC Record', fighter1: '3-3 UFC', fighter2: '2-0 UFC (sub McCann R1, UD Suphisara)', note: 'Thainara impressionou no debut' },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Brasil', recent_fights: [
        { date: 'Fev 2026', opponent: 'Ketlen Souza', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda derrota seguida.' },
        { date: 'Fev 2025', opponent: 'Cong Wang', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 312. Perdeu por decisao.' },
        { date: 'Ago 2025', opponent: 'Ming Shi', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Road to UFC.' },
        { date: 'Jul 2024', opponent: 'Molly McCann', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 304. Venceu veterana.' },
        { date: 'Fev 2024', opponent: 'Konklak Suphisara', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Derrota.' },
        { date: 'Jul 2023', opponent: 'Shauna Bannon', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria.' },
        { date: 'Abr 2023', opponent: 'Denise Gomes', result: 'L', method: 'TKO R2 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Nocauteada.' },
      ] },
      fighter2: { nome: 'Thainara', recent_fights: [
        { date: 'Set 2025', opponent: 'Konklak Suphisara', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Segunda vitoria UFC.' },
        { date: 'Mar 2025', opponent: 'Molly McCann', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Submeteu McCann no R1. Impressionante.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Experiencia UFC', valueA: 65, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Brasil tem 3-3 no UFC. Thainara tem 2-0 com sub de McCann no R1. Ambas ja testadas.' },
        { label: 'Striking', valueA: 62, valueB: 60, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Niveis similares. Brasil com mais volume, Thainara com mais poder.' },
        { label: 'Grappling', valueA: 65, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Brasil e mais completa no chao. Thainara e primariamente striker.' },
        { label: 'Poder de KO', valueA: 50, valueB: 68, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Thainara nocauteou no DWCS. Poder pra divisao feminina.' },
      ],
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Brasil', ko_tko: { count: 3, percent: 27 }, submission: { count: 3, percent: 27 }, decision: { count: 5, percent: 46 }, total_wins: 11 },
      fighter2: { nome: 'Thainara', ko_tko: { count: 5, percent: 38 }, submission: { count: 8, percent: 62 }, decision: { count: 0, percent: 0 }, total_wins: 13 },
      insight: 'Brasil e mais versatil e tende a decisoes (46%). Thainara e finalizadora (62% sub, 38% KO) com sequencia de 11 vitorias. Revanche: Brasil venceu Thainara por guilhotina em 2019.',
    },
    previsao_final: {
      winner_name: 'Bruna Brasil', winner_side: 'fighter1', predicted_method: 'Decisao Unanime', confidence_score: 6, confidence_label: 'MEDIA',
      explanation: 'Brasil e mais experiente (16 lutas vs 7), mais completa, e ja tem 3-2 no UFC. Thainara tem poder no debut (KO no DWCS) mas a diferenca de experiencia e significativa. Brasil deve controlar o ritmo e vencer nos pontos.',
      x_factor: { title: 'Debut de Thainara', description: 'O debut no UFC e imprevisivel. A pressao pode afetar positiva ou negativamente.' },
      upset_alert: { title: 'Poder de Thainara', description: '60% KO rate. Se conectar algo pesado no R1, pode surpreender a mais experiente.' },
      probabilities: { fighter1: { nome: 'Brasil', percent: 62 }, fighter2: { nome: 'Thainara', percent: 36 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'Brasil (-180)', reasoning: 'Favorita pela experiencia. Preco justo.' },
        method: { pick: 'Brasil por Decisao (-120)', reasoning: '46% das vitorias por decisao. Controle e experiencia por 3 rounds.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Luta feminina de strawweight tende a ir a distancia. Brasil controla sem forcar finish.' },
        best_value: 'Over 2.5 rounds. Luta vai pros juizes com Brasil controlando.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
