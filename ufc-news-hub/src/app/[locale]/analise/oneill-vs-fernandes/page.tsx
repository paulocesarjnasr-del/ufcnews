import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'oneill-vs-fernandes', evento_id: null, slug: 'oneill-vs-fernandes', titulo: 'O\'Neill vs Fernandes', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Mosca Feminino (125 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decisao Unanime', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Casey O\'Neill', record: '10-2-0', ultimasLutas: [{ result: 'W', opponent: 'Luana Santos', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  fighter2_info: { nome: 'Gabriella Fernandes', record: '11-3-0', ultimasLutas: [{ result: 'L', opponent: 'Fatima Kline', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,63m', envergadura: '163cm', idade: 26, academia: 'Australia/USA' }, fighter2: { altura: '1,60m', envergadura: '160cm', idade: 28, academia: 'Brasil' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Mosca Feminino (125 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Casey O\'Neill', record: '10-2-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/ONEILL_CASEY_L_03-28.png?itok=MDa0OiVE' }, fighter2: { nome: 'Gabriella Fernandes', record: '11-3-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-08/FERNANDES_GABRIELLA_L_08-09.png?itok=7Gt6QPap' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.50, valueB: 3.80, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 42, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 2.20, valueB: 1.50, maxVal: 4, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 60, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '26 anos', fighter2: '28 anos', note: 'O\'Neill mais nova' },
        { label: 'Sequencia', fighter1: '19 MESES fora por lesao no joelho, voltou com vitoria', fighter2: 'Vem de derrota', note: 'O\'Neill ficou fora o ano inteiro de 2025' },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'O\'Neill', recent_fights: [
        { date: 'Ago 2024', opponent: 'Luana Santos', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 305. Retorno apos lesao no joelho. Vitoria solida.' },
        { date: 'Dez 2023', opponent: 'Ariane Lipski', result: 'L', method: 'Sub R2 (armbar)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 296. Submetida por armbar.' },
        { date: 'Mar 2023', opponent: 'Jennifer Maia', result: 'L', method: 'Decisao Unanime', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bom', note: 'UFC 286. Primeira derrota. Maia controlou.' },
        { date: 'Fev 2022', opponent: 'Roxanne Modafferi', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 271. Luta apertada.' },
        { date: 'Out 2021', opponent: 'Antonina Shevchenko', result: 'W', method: 'TKO R2 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'POTN. Irma da campeao.' },
        { date: 'Jun 2021', opponent: 'Lara Procopio', result: 'W', method: 'Sub R3 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Submissao.' },
        { date: 'Fev 2021', opponent: 'Shana Dobson', result: 'W', method: 'TKO R2 (socos)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC. TKO.' },
      ] },
      fighter2: { nome: 'Fernandes', recent_fights: [
        { date: 'Ago 2025', opponent: 'Julija Stoliarenko', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceira vitoria seguida.' },
        { date: 'Nov 2024', opponent: 'Cong Wang', result: 'W', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Upset. Submeteu Wang Cong que era favorita.' },
        { date: 'Jun 2024', opponent: 'Carli Judice', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira vitoria UFC. Apertada.' },
        { date: 'Jun 2023', opponent: 'Tereza Bleda', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda derrota UFC.' },
        { date: 'Fev 2023', opponent: 'Jasmine Jasudavicius', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Derrota.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Striking', valueA: 68, valueB: 58, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'O\'Neill e mais tecnica e com mais volume.' },
        { label: 'Wrestling', valueA: 72, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'O\'Neill media mais takedowns e tem melhor controle.' },
        { label: 'Experiencia UFC', valueA: 65, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'O\'Neill era prospect top antes da lesao. Mais experiencia no nivel UFC.' },
        { label: 'Cardio', valueA: 65, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'even' },
      ],
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'O\'Neill', ko_tko: { count: 3, percent: 30 }, submission: { count: 3, percent: 30 }, decision: { count: 4, percent: 40 }, total_wins: 10 },
      fighter2: { nome: 'Fernandes', ko_tko: { count: 4, percent: 36 }, submission: { count: 3, percent: 27 }, decision: { count: 4, percent: 37 }, total_wins: 11 },
      insight: 'Perfis equilibrados. O\'Neill e mais versatil. Fernandes e competitiva mas sem vantagem clara.',
    },
    previsao_final: {
      winner_name: 'Casey O\'Neill', winner_side: 'fighter1', predicted_method: 'Decisao Unanime', confidence_score: 6, confidence_label: 'MEDIA',
      explanation: 'O\'Neill era prospect top do peso-mosca antes da lesao. Voltou com vitoria solida. Fernandes e competitiva mas sem o nivel tecnico pra superar O\'Neill. O wrestling e o volume devem decidir por 3 rounds.',
      x_factor: { title: '19 Meses Fora por Lesao no Joelho', description: 'O\'Neill ficou fora o ANO INTEIRO de 2025 por lesao no joelho. Voltou com vitoria em outubro mas a questao e se esta 100%. Ring rust de quase 2 anos e significativo.' },
      upset_alert: { title: 'Fernandes E Dura', description: 'Fernandes tem 11-3 e nunca foi finalizada facilmente. Pode tornar competitiva.' },
      probabilities: { fighter1: { nome: 'O\'Neill', percent: 62 }, fighter2: { nome: 'Fernandes', percent: 36 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'O\'Neill (-200)', reasoning: 'Favorita pela tecnica e experiencia. Preco justo.' },
        method: { pick: 'O\'Neill por Decisao (-130)', reasoning: 'Tende a lutas de controle. Fernandes e dura pra ser finalizada.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Luta feminina de flyweight tende a ir a distancia. Ambas sao duras.' },
        best_value: 'Over 2.5 rounds. Luta vai pros juizes quase certamente.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
