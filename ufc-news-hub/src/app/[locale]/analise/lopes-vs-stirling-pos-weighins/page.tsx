import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'lopes-vs-stirling-pos-weighins', evento_id: null, slug: 'lopes-vs-stirling-pos-weighins', titulo: 'Lopes vs Stirling (Pos Weigh-Ins)', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Meio-Pesado (205 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'Decisao Unanime', confidence: 'MEDIA-ALTA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Bruno Lopes', record: '14-2-0', ultimasLutas: [{ result: 'W', opponent: 'William Knight', method: 'TKO R1', event: 'UFC Fight Night' }] },
  fighter2_info: { nome: 'Navajo Stirling', record: '8-0-0', ultimasLutas: [{ result: 'W', opponent: 'Antonio Trocoli', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,88m', envergadura: '193cm', idade: 30, academia: 'Brasil' }, fighter2: { altura: '1,85m', envergadura: '190cm', idade: 28, academia: 'City Kickboxing, Auckland' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Meio-Pesado (205 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Bruno Lopes', record: '14-2-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/2/LOPES_BRUNO_L_01-11.png?itok=0ZAo1l_Y' }, fighter2: { nome: 'Navajo Stirling', record: '8-0-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/STIRLING_NAVAJO_L_03-28.png?itok=BJ1MVXPh' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.20, valueB: 3.50, maxVal: 6, format: 'decimal' },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 58, maxVal: 100, format: 'percent', note: 'Stirling e mais defensivo e calculado' },
        { label: 'Takedowns por 15 Min', valueA: 1.20, valueB: 2.80, maxVal: 4, format: 'decimal', note: 'Stirling usa wrestling como base do controle' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 72, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '30 anos', fighter2: '28 anos', note: null },
        { label: 'Gym', fighter1: 'Brasil', fighter2: 'City Kickboxing (Adesanya, Volkanovski)', note: 'Stirling treina com os melhores do mundo' },
        { label: 'UFC Record', fighter1: 'DWCS 2024, 1-0 UFC', fighter2: 'DWCS 2024, 3-0 UFC (todas decisao)', note: 'Stirling e mais testado' },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Lopes', recent_fights: [
        { date: 'Mai 2025', opponent: 'Dustin Jacoby', result: 'L', method: 'KO R1 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no R1. Vulnerabilidade defensiva exposta.' },
        { date: 'Jan 2025', opponent: 'Magomed Gadzhiyasulov', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC com vitoria solida.' },
      ] },
      fighter2: { nome: 'Stirling', recent_fights: [
        { date: 'Set 2025', opponent: 'Rodolfo Bellato', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceira vitoria UFC. Controle por 3 rounds.' },
        { date: 'Mai 2025', opponent: 'Ivan Erslan', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 315. Segunda vitoria.' },
        { date: 'Dez 2024', opponent: 'George Tokkos', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC. Controle metodico.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Gym/Coaching', valueA: 55, valueB: 90, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'City Kickboxing e o melhor gym do mundo. Stirling treina com Adesanya, Volkanovski, Hooker.' },
        { label: 'Wrestling/Controle', valueA: 55, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Stirling venceu 3 seguidas por decisao com controle. Metodico.' },
        { label: 'Poder de KO', valueA: 70, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Lopes nocauteou Knight no R1. Mais explosivo que Stirling.' },
        { label: 'Consistencia', valueA: 50, valueB: 75, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: '3-0 UFC, todas decisao. Stirling nao perde.' },
      ],
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Lopes', ko_tko: { count: 8, percent: 67 }, submission: { count: 2, percent: 17 }, decision: { count: 2, percent: 16 }, total_wins: 12 },
      fighter2: { nome: 'Stirling', ko_tko: { count: 3, percent: 38 }, submission: { count: 2, percent: 24 }, decision: { count: 3, percent: 38 }, total_wins: 8 },
      insight: 'Lopes e finalizador (67% KO). Stirling e mais equilibrado e tende a decisoes no UFC (3 de 3). Se Stirling controlar, vai pra decisao. Se Lopes conectar, pode acabar rapido.',
    },
    previsao_final: {
      winner_name: 'Navajo Stirling', winner_side: 'fighter2', predicted_method: 'Decisao Unanime', confidence_score: 7, confidence_label: 'MEDIA-ALTA',
      explanation: 'Stirling e 3-0 no UFC com todas as vitorias por decisao. Treina no City Kickboxing com os melhores do mundo. Metodico, controlador, e consistente. Lopes tem poder mas nunca enfrentou alguem tao bem preparado tecnicamente. O controle de Stirling deve prevalecer por 3 rounds. ATUALIZACAO POS WEIGH-INS: Ambos bateram o peso em 205 lbs. Detalhe importante: Stirling e do City Kickboxing, o mesmo gym de Adesanya que luta no main event desta noite. Isso significa que Stirling fez camp completo com seu parceiro de treino se preparando para o evento principal, e a energia do gym vai estar altissima. A presenca de Adesanya no main event cria motivacao extra para Stirling performar diante dos olhos do mundo. A confianca se mantem MEDIA-ALTA.',
      x_factor: { title: 'City Kickboxing no Main Event', description: 'Stirling treina com Adesanya, que luta no main event. O gym inteiro esta em Seattle esta semana, o que gera um boost de energia e suporte incomparavel para Stirling.' },
      upset_alert: { title: 'Poder de Lopes', description: 'Lopes tem 67% KO rate e nocauteou Knight no R1. Se conectar pesado, o controle de Stirling nao importa.' },
      probabilities: { fighter1: { nome: 'Lopes', percent: 35 }, fighter2: { nome: 'Stirling', percent: 63 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'Stirling (-200)', reasoning: '3-0 UFC. City Kickboxing com Adesanya no main event. Metodico. Favorito justo.' },
        method: { pick: 'Stirling por Decisao (-120)', reasoning: '3 de 3 UFC por decisao. Padrao claro que a pesagem nao muda.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Stirling sempre vai a distancia no UFC. Controle por 3 rounds.' },
        best_value: 'Over 2.5 rounds continua sendo a melhor aposta. Stirling controla sem forcar o finish. Padrao consistente.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
