import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'simon-vs-yanez', evento_id: null, slug: 'simon-vs-yanez', titulo: 'Simon vs Yanez', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Galo (135 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decisao Unanime', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Ricky Simon', record: '22-7-0', ultimasLutas: [{ result: 'L', opponent: 'Raoni Barcelos', method: 'Decisao Unanime', event: 'UFC Fight Night' }, { result: 'W', opponent: 'Vince Morales', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  fighter2_info: { nome: 'Adrian Yanez', record: '17-6-0', ultimasLutas: [{ result: 'L', opponent: 'Daniel Marcos', method: 'Decisao Dividida', event: 'UFC 323' }, { result: 'L', opponent: 'Rob Font', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,70m', envergadura: '178cm', idade: 32, academia: 'San Diego' }, fighter2: { altura: '1,73m', envergadura: '178cm', idade: 29, academia: 'Houston, TX' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Galo (135 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Ricky Simon', record: '22-7-0', ranking: 'N/R' }, fighter2: { nome: 'Adrian Yanez', record: '17-6-0', ranking: 'N/R' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.80, valueB: 5.20, maxVal: 7, format: 'decimal', note: 'Yanez com volume de striking ligeiramente maior' },
        { label: 'Precisao de Strikes (%)', valueA: 42, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.50, valueB: 4.80, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Yanez absorve MUITO mais. Vulneravel defensivamente.' },
        { label: 'Takedowns por 15 Min', valueA: 3.80, valueB: 0.40, maxVal: 5, format: 'decimal', note: 'Simon e wrestler pesado. 2+ TDs em 10 das ultimas 12 lutas.' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 50, maxVal: 100, format: 'percent', note: 'Yanez tem 50% TDD. Vulneravel ao wrestling de Simon.' },
        { label: 'Defesa de Strikes (%)', valueA: 55, valueB: 42, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '29 anos', note: null },
        { label: 'Altura', fighter1: '1,70m', fighter2: '1,73m', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '178cm', fighter2: '178cm', note: 'Mesmo reach' },
        { label: 'Estilo', fighter1: 'Wrestling + pressao', fighter2: 'Boxing + poder', note: 'Grappler vs Striker' },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Simon', recent_fights: [
        { date: 'Out 2025', opponent: 'Raoni Barcelos', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Perdeu por decisao. Barcelos neutralizou o wrestling.' },
        { date: 'Jun 2025', opponent: 'Vince Morales', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por controle. Wrestling dominante.' },
        { date: 'Mar 2025', opponent: 'Marcus McGhee', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Wrestling e controle por 3 rounds.' },
      ] },
      fighter2: { nome: 'Yanez', recent_fights: [
        { date: 'Dez 2024', opponent: 'Daniel Marcos', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao apertada. Yanez teve momentos mas nao fez o suficiente.' },
        { date: 'Set 2024', opponent: 'Rob Font', result: 'L', method: 'Decisao Unanime', opponent_rank: '#10 BW', quality_score: 3, quality_label: 'Bom', note: 'Font dominou com jab e alcance.' },
        { date: 'Jun 2024', opponent: 'Vinicius Salvador', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute rapido. O poder e real.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Wrestling', valueA: 82, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Simon e um dos melhores wrestlers do peso-galo. 3.80 TDs/15min. 2+ TDs em 10 de 12 lutas.' },
        { label: 'Striking/Boxing', valueA: 55, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Yanez e boxer natural com poder. 5 KOs no UFC. Mao pesada.' },
        { label: 'Defesa de Takedown', valueA: 72, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Yanez tem 50% TDD. Contra Simon que tenta 3.80 TDs, e um problema serio.' },
        { label: 'Cardio', valueA: 72, valueB: 60, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Simon luta 3 rounds com pressao consistente. Yanez tende a desacelerar quando nao nocauteia cedo.' },
        { label: 'Poder de KO', valueA: 45, valueB: 80, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Yanez tem poder genuino. Se conectar limpo antes do takedown, pode acabar.' },
        { label: 'Experiencia UFC', valueA: 75, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Simon tem mais lutas UFC e enfrentou nomes maiores (Song Yadong, Barcelos).' },
      ],
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Simon', ko_tko: { count: 5, percent: 23 }, submission: { count: 6, percent: 27 }, decision: { count: 11, percent: 50 }, total_wins: 22 },
      fighter2: { nome: 'Yanez', ko_tko: { count: 9, percent: 53 }, submission: { count: 2, percent: 12 }, decision: { count: 6, percent: 35 }, total_wins: 17 },
      insight: 'Simon e wrestler de decisao (50% decisao). Yanez e nocauteador (53% KO). Se Simon levar ao chao, ganha nos pontos. Se Yanez manter em pe, pode nocautear. A TDD de 50% de Yanez diz que Simon provavelmente leva ao chao.',
    },
    previsao_final: {
      winner_name: 'Ricky Simon', winner_side: 'fighter1', predicted_method: 'Decisao Unanime', confidence_score: 6, confidence_label: 'MEDIA',
      explanation: 'Simon e wrestler pesado com 3.80 TDs/15min contra Yanez que tem 50% TDD. A matematica e clara. Simon vai levar ao chao, controlar, e vencer nos pontos como faz na maioria das lutas. Yanez tem poder pra acabar em pe mas Simon e disciplinado demais pra trocar abertamente. A unica chance de Yanez e conectar algo pesado antes do primeiro takedown.',
      x_factor: { title: 'O Boxing de Yanez', description: 'Yanez e boxer natural com 9 KOs. Se Simon descuidar na entrada de takedown, um uppercut pode mudar tudo.' },
      upset_alert: { title: 'Yanez esta 1-3', description: 'Yanez vem de fase ruim (1-3). A confianca pode estar abalada. Mas lutadores em declinio sao perigosos porque nao tem nada a perder.' },
      probabilities: { fighter1: { nome: 'Simon', percent: 60 }, fighter2: { nome: 'Yanez', percent: 38 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'Simon (-170)', reasoning: 'Favorito justificado pelo wrestling. Mas -170 nao e valor excepcional.' },
        method: { pick: 'Simon por Decisao (-120)', reasoning: '50% das vitorias de Simon por decisao. O wrestling controla sem forcar finish.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Simon tende a lutas de 3 rounds com wrestling. Se controlar, vai pros juizes.' },
        best_value: 'Simon por Decisao e a aposta mais solida. Wrestling pesado contra TDD fraco de Yanez = controle por 3 rounds.',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
