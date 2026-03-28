import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  id: 'brasil-vs-thainara-pos-weighins', evento_id: null, slug: 'brasil-vs-thainara-pos-weighins', titulo: 'Brasil vs Thainara (Pos Weigh-Ins)', subtitulo: null, lutador1_id: null, lutador2_id: null, artigo_conteudo: '',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', evento_local: 'Climate Pledge Arena, Seattle, Washington', categoria_peso: 'Peso Palha Feminino (115 lbs)', status: 'published',
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'Submissao ou Decisao Unanime', confidence: 'MEDIA-ALTA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Bruna Brasil', record: '11-6-1', ultimasLutas: [{ result: 'L', opponent: 'Ketlen Souza', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  fighter2_info: { nome: 'Alexia Thainara', record: '13-1-0', ultimasLutas: [{ result: 'W', opponent: 'Loma Lookboonmee', method: 'Decisao Unanime', event: 'UFC Fight Night' }] },
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '1,68m', envergadura: '166cm', idade: 32, academia: 'The Fighting Nerds / Brasil' }, fighter2: { altura: '1,63m', envergadura: '170cm', idade: 30, academia: 'Brasil' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  num_rounds: 3, is_titulo: false, broadcast: null, analysis_type: 'prelims', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  prelims_analysis: {
    hero: { evento_nome: 'UFC Fight Night: Adesanya vs Pyfer', evento_data: '28 de Marco, 2026', categoria_peso: 'Peso Palha Feminino (115 lbs)', num_rounds: 3, is_titulo: false, fighter1: { nome: 'Bruna Brasil', record: '11-6-1', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-02/BRASIL_BRUNA_L_02-07.png?itok=afUQXzT9' }, fighter2: { nome: 'Alexia Thainara', record: '13-1-0', ranking: 'N/R', imagem_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-09/THAINARA_ALEXIA_R_09-27.png?itok=aT_FWNEf' } },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 2.66, valueB: 5.73, maxVal: 8, format: 'decimal', note: 'Thainara tem volume massivo, mais que o dobro de Brasil' },
        { label: 'Precisao de Strikes (%)', valueA: 56, valueB: 40, maxVal: 100, format: 'percent', note: 'Brasil e mais cirurgica mas lanca muito menos' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.66, valueB: 2.82, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Numeros proximos na absorcao' },
        { label: 'Defesa de Strikes (%)', valueA: 52, valueB: 70, maxVal: 100, format: 'percent', note: 'Thainara defende 70% dos golpes, numero excepcional' },
        { label: 'Takedowns por 15 Min', valueA: 1.46, valueB: 3.32, maxVal: 5, format: 'decimal', note: 'Thainara busca mais que o dobro de takedowns' },
        { label: 'Precisao de Takedown (%)', valueA: 64, valueB: 85, maxVal: 100, format: 'percent', note: 'Thainara converte 85% dos takedowns. Absurdo.' },
        { label: 'Defesa de Takedown (%)', valueA: 53, valueB: 85, maxVal: 100, format: 'percent', note: 'Brasil com 53% e vulneravel. Thainara com 85% e elite.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '30 anos', note: null },
        { label: 'Altura', fighter1: '1,68m', fighter2: '1,63m', note: 'Brasil tem 5cm a mais de altura' },
        { label: 'Envergadura', fighter1: '166cm', fighter2: '170cm', note: 'Thainara tem leve vantagem de alcance apesar de ser mais baixa' },
        { label: 'Historico', fighter1: '11-6-1, 2 derrotas seguidas', fighter2: '13-1-0, 11 vitorias seguidas', note: 'REVANCHE: Brasil venceu Thainara por guilhotina em 2019' },
      ],
    },
    historico_lutas: {
      fighter1: { nome: 'Brasil', recent_fights: [
        { date: 'Fev 2026', opponent: 'Ketlen Souza', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda derrota seguida. Turnaround de menos de 2 meses para esta luta.' },
        { date: 'Ago 2025', opponent: 'Shi Ming', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Road to UFC em Shanghai.' },
        { date: 'Fev 2025', opponent: 'Wang Cong', result: 'L', method: 'Decisao Unanime', opponent_rank: '#15 WSW', quality_score: 3, quality_label: 'Bom', note: 'UFC 312. Dominada completamente (27-30 x3).' },
        { date: 'Jul 2024', opponent: 'Molly McCann', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 304. Venceu veterana.' },
        { date: 'Fev 2024', opponent: 'Loma Lookboonmee', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota por decisao.' },
      ] },
      fighter2: { nome: 'Thainara', recent_fights: [
        { date: 'Set 2025', opponent: 'Loma Lookboonmee', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou com 110 strikes, 5 TDs, 10min de controle.' },
        { date: 'Mar 2025', opponent: 'Molly McCann', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Mata-leao no R1. POTN ($50k).' },
        { date: 'Set 2024', opponent: 'Rose Conceicao', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Contender Series. Garantiu contrato UFC.' },
        { date: 'Nov 2019', opponent: 'Bruna Brasil', result: 'L', method: 'Sub R3 (guilhotina 0:33)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UNICA derrota profissional. Guilhotina de Brasil no Thunder Fight 20.' },
      ] },
    },
    perfil_habilidades: {
      skills: [
        { label: 'Striking em Pe', valueA: 60, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Thainara tem volume absurdo de 5.73 SLpM e 70% de defesa. Brasil e mais precisa (56%) mas produz muito menos.' },
        { label: 'Jiu-Jitsu e Submissoes', valueA: 55, valueB: 88, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Thainara e faixa preta com 8 vitorias por finalizacao (5 mata-leoes, 3 armbars). Brasil tem faixa marrom e 2 subs.' },
        { label: 'Wrestling e Takedowns', valueA: 52, valueB: 82, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Thainara converte 85% dos takedowns e defende 85%. Brasil converte 64% e defende 53%. Abismo.' },
        { label: 'Defesa Geral', valueA: 52, valueB: 78, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Thainara defende 70% dos strikes e 85% dos TDs. Brasil fica em 52% e 53%.' },
        { label: 'Cardio e Ritmo', valueA: 62, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Thainara manteve volume alto por 3 rounds contra Lookboonmee. Brasil tende a cair nos rounds finais.' },
        { label: 'Experiencia no UFC', valueA: 65, valueB: 48, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Brasil tem 8 lutas no UFC contra apenas 2 de Thainara. Mas a qualidade de Thainara compensa parcialmente.' },
      ],
      insight: 'Thainara domina em praticamente todas as categorias tecnicas. Brasil tem vantagem em experiencia no UFC com 8 lutas, mas seus numeros em todas as metricas sao inferiores. A unica vantagem concreta de Brasil e a historia entre as duas: a guilhotina de 2019. Mas a Thainara de 2026 e uma lutadora completamente diferente, com 11 vitorias seguidas desde aquela derrota.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Brasil', ko_tko: { count: 3, percent: 27 }, submission: { count: 2, percent: 18 }, decision: { count: 6, percent: 55 }, total_wins: 11 },
      fighter2: { nome: 'Thainara', ko_tko: { count: 0, percent: 0 }, submission: { count: 8, percent: 62 }, decision: { count: 5, percent: 38 }, total_wins: 13 },
      insight: 'Thainara e finalizadora nata (62% sub, 8 finalizacoes incluindo 5 mata-leoes e 3 armbars) com zero nocautes. Brasil e mais diversificada com 3 KOs, 2 subs e 6 decisoes. Quando Thainara leva ao chao, fecha. Brasil precisa manter distancia a todo custo.',
    },
    previsao_final: {
      winner_name: 'Alexia Thainara', winner_side: 'fighter2', predicted_method: 'Submissao ou Decisao Unanime', confidence_score: 7, confidence_label: 'MEDIA-ALTA',
      explanation: 'Thainara evoluiu demais desde a derrota para Brasil em 2019. Em 11 lutas consecutivas desde aquela guilhotina, nao perdeu. Seus numeros no UFC sao impressionantes: 5.73 SLpM, 85% de precisao em takedowns, 85% de defesa de takedowns e 70% de defesa de strikes. Brasil, por outro lado, vem de 2 derrotas seguidas (Wang Cong e Ketlen Souza) e esta lutando com turnaround de menos de 2 meses. A defesa de takedown de Brasil (53%) e preocupante contra alguem que converte 85%. Se Thainara decidir derrubar, vai derrubar, e no chao ela e faixa preta com 8 finalizacoes. ATUALIZACAO POS WEIGH-INS: Ambas bateram o peso em 115 lbs sem problemas. O contexto desta luta e fascinante: e uma REVANCHE. Brasil venceu Thainara por guilhotina em 2019, a unica derrota profissional de Thainara. Desde aquele dia, Thainara acumulou 11 vitorias seguidas, chegou ao UFC, submeteu McCann no debut e ganhou POTN. Brasil vem de 2 derrotas seguidas e aceita o turnaround rapido. A narrativa de vinganca esta toda do lado de Thainara. A confianca se mantem MEDIA-ALTA, reforçada pela diferenca de momento entre as duas.',
      x_factor: {
        title: 'A vinganca pessoal de Thainara',
        description: 'Brasil e a unica pessoa que derrotou Thainara profissionalmente. Essa luta carrega peso emocional enorme. Thainara trabalhou em construcao civil antes de chegar ao UFC e agora tem a chance de apagar a unica mancha do seu cartel contra a mesma pessoa, no maior palco do esporte.',
      },
      upset_alert: {
        title: 'A guilhotina de 2019 ainda mora na memoria',
        description: 'Brasil ja provou que sabe finalizar Thainara. Se conseguir encaixar o clinch e buscar a guilhotina novamente, pode repetir a historia. Thainara vai ter que administrar a ansiedade de revanche sem se expor demais nas trocas.',
      },
      probabilities: { fighter1: { nome: 'Brasil', percent: 28 }, fighter2: { nome: 'Thainara', percent: 70 }, draw: 2 },
      value_picks: {
        moneyline: { pick: 'Thainara (-250)', reasoning: 'Favorita pesada e justificada. 11 vitorias seguidas, 85% TD accuracy, faixa preta. Brasil vem de 2 derrotas. O preco e justo.' },
        method: { pick: 'Thainara por Submissao (+120)', reasoning: '62% das vitorias de Thainara sao por finalizacao. Brasil tem 53% TDD. Se for ao chao, Thainara fecha.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Thainara submeteu McCann no R1 e tem 85% de precisao em TDs. Se conseguir levar ao chao cedo, pode acabar rapido. Revanche adiciona urgencia.' },
        best_value: 'Thainara por Submissao oferece valor. A revanche traz motivacao extra e Brasil e vulneravel a takedowns (53% TDD contra 85% precision).',
      },
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
