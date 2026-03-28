import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'hooper-vs-gibson', evento_id: null, slug: 'hooper-vs-gibson', titulo: 'Hooper vs Gibson Jr', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Leve (155 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Submissao R2', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Chase Hooper', record: '16-4-1', ultimasLutas: [{ result: 'W', opponent: 'Mark Striegl', method: 'Sub R1', event: 'UFC Fight Night' }] },
  fighter2_info: { nome: 'Lance Gibson Jr.', record: '9-2-0', ultimasLutas: [{ result: 'L', opponent: 'King Green', method: 'TKO R1', event: 'UFC Fight Night' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,88m', envergadura: '193cm', idade: 25, academia: 'Washington State' }, fighter2: { altura: '1,80m', envergadura: '183cm', idade: 25, academia: 'British Columbia, Canada' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Leve (155 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Chase Hooper', record: '16-4-1', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/HOOPER_CHASE_L_03-28.png?itok=gZvkHJT5' }, fighter2: { nome: 'Lance Gibson Jr.', record: '9-2-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/GIBSON_JR_LANCE_R_12-13.png?itok=EdokFOXL' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.20, valueB: 4.50, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 40, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 2.80, valueB: 1.50, maxVal: 4, format: 'decimal', note: 'Hooper busca o chao constantemente' },
        { label: 'Submissoes por 15 Min', valueA: 1.50, valueB: 0.30, maxVal: 2, format: 'decimal', note: 'Hooper e um dos melhores grapplers da divisao' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 60, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '25 anos', fighter2: '25 anos', note: 'Mesma idade' },
        { label: 'Altura', fighter1: '1,88m', fighter2: '1,80m', note: 'Hooper 8cm mais alto' },
        { label: 'Background', fighter1: 'BJJ black belt, Pan-Am champion', fighter2: 'Filho de Lance Gibson Sr (pioneiro MMA canadense)', note: 'Legado familiar' },
        { label: 'Gym', fighter1: 'Washington State (perto de casa)', fighter2: 'British Columbia, Canada', note: 'Hooper luta perto de casa' },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Hooper', recent_fights: [
        { date: 'Ago 2025', opponent: 'Alexander Hernandez', result: 'L', method: 'TKO R1 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no R1. Em pe continua vulneravel.' },
        { date: 'Abr 2025', opponent: 'Jim Miller', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Venceu lenda do UFC por decisao. UFC 314.' },
        { date: 'Dez 2024', opponent: 'Clay Guida', result: 'W', method: 'Sub R1 (armbar)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'POTN. Armbar contra veterano. UFC 310.' },
        { date: 'Mai 2024', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R2 (brabo choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Submissao tecnica.' },
        { date: 'Nov 2023', opponent: 'Jordan Leavitt', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mata-leao rapido.' },
        { date: 'Mai 2023', opponent: 'Nick Fiore', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Decisao.' },
        { date: 'Out 2022', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado. Vulnerabilidade em pe.' },
        { date: 'Mai 2022', opponent: 'Felipe Colares', result: 'W', method: 'TKO R3 (socos)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO tardio.' },
      ] },
      fighter2: { nome: 'Gibson Jr.', recent_fights: [
        { date: 'Dez 2025', opponent: 'Bobby Green', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Debut UFC. Decisao apertada contra veterano Bobby Green. Competitivo.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Jiu-Jitsu', valueA: 90, valueB: 55, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Hooper e BJJ black belt e Pan-Am champion. Um dos melhores grapplers do peso-leve.' },
        { label: 'Striking', valueA: 42, valueB: 62, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Gibson Jr. e melhor em pe. Hooper e vulneravel no striking (nocauteado por Landwehr).' },
        { label: 'Wrestling', valueA: 68, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Hooper media 2.80 TDs/15min. Precisa levar ao chao pra usar o jiu-jitsu.' },
        { label: 'Tamanho', valueA: 78, valueB: 55, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Hooper e 8cm mais alto. Vantagem de tamanho significativa no clinch e no chao.' },
        { label: 'Experiencia UFC', valueA: 65, valueB: 30, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Hooper tem 8-4 no UFC. Gibson Jr. perdeu o debut. Diferenca real.' },
        { label: 'Legado e Motivacao', valueA: 60, valueB: 70, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Gibson Jr. e filho de pioneiro do MMA canadense. Quer honrar o legado do pai.' },
      ],
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Hooper', ko_tko: { count: 2, percent: 13 }, submission: { count: 11, percent: 69 }, decision: { count: 3, percent: 18 }, total_wins: 16 },
      fighter2: { nome: 'Gibson Jr.', ko_tko: { count: 4, percent: 44 }, submission: { count: 3, percent: 34 }, decision: { count: 2, percent: 22 }, total_wins: 9 },
      insight: 'Hooper e submissao pura (69%). Se a luta for ao chao, e territorio dele. Gibson Jr. e mais equilibrado mas nao tem o grappling pra lidar com um BJJ black belt desse nivel.',
    },
    previsao_final: {
      winner_name: 'Chase Hooper', winner_side: 'fighter1', predicted_method: 'Submissao R2', confidence_score: 6, confidence_label: 'MEDIA',
      explanation: 'Hooper e BJJ black belt, Pan-Am champion, com 69% de vitorias por submissao. Gibson Jr. perdeu o debut UFC e nao tem o grappling pra lidar com esse nivel. Hooper luta perto de casa (Washington state) e e 8cm mais alto. A submissao e questao de tempo. O unico risco: Hooper e vulneravel em pe e Gibson pode conectar algo antes do takedown.',
      x_factor: { title: 'Hooper Perto de Casa', description: 'Washington state. O Climate Pledge Arena e praticamente o quintal. Motivacao extra.' },
      upset_alert: { title: 'Gibson Pode Conectar em Pe', description: 'Hooper foi nocauteado por Landwehr. Em pe e vulneravel. Se Gibson conectar cedo, pode surpreender.' },
      probabilities: { fighter1: { nome: 'Hooper', percent: 65 }, fighter2: { nome: 'Gibson Jr.', percent: 33 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'Hooper (-250)', reasoning: 'Favorito justificado pelo jiu-jitsu de elite e vantagem de tamanho.' },
        method: { pick: 'Hooper por Submissao (-110)', reasoning: '69% das vitorias por sub. Contra alguem sem grappling de elite, a submissao e o cenario mais provavel.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Hooper busca o chao cedo e submete. Gibson nao tem TDD pra aguentar 3 rounds.' },
        best_value: 'Hooper por Submissao e a aposta mais logica. O jiu-jitsu de Pan-Am champion contra alguem que perdeu o debut e demais.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
