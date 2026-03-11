/**
 * Pre-computes analysis sections from scraped data.
 * These sections use exact numbers from UFCStats — no AI hallucination possible.
 */
import type { EnhancedFighterProfile } from './ufcstats-scraper';
import type { DerivedMetrics, FighterComparison } from './derived-metrics';
import type {
  ComparacaoEstatisticaSectionData,
  DistribuicaoVitoriasSectionData,
  OponenteComumSectionData,
  StatBarData,
  TaleOfTapeRow,
} from '@/types/analise';

interface FighterDBData {
  nome: string;
  apelido: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
  nocautes: number;
  finalizacoes: number;
  decisoes: number;
  altura: string | null;
  envergadura: string | null;
  idade: number | null;
  academia: string | null;
  stance?: string | null;
}

export function computeStatComparison(
  f1Profile: EnhancedFighterProfile,
  f2Profile: EnhancedFighterProfile,
): ComparacaoEstatisticaSectionData {
  const s1 = f1Profile;
  const s2 = f2Profile;

  const stats: StatBarData[] = [
    {
      label: 'Sig Strikes/min',
      valueA: s1.slpm ?? 0,
      valueB: s2.slpm ?? 0,
      maxVal: Math.max((s1.slpm ?? 0), (s2.slpm ?? 0)) * 1.2 || 8,
      format: 'decimal',
    },
    {
      label: 'Strike Accuracy',
      valueA: s1.strAcc ?? 0,
      valueB: s2.strAcc ?? 0,
      maxVal: 100,
      format: 'percent',
    },
    {
      label: 'Strikes Absorvidos/min',
      valueA: s1.sapm ?? 0,
      valueB: s2.sapm ?? 0,
      maxVal: Math.max((s1.sapm ?? 0), (s2.sapm ?? 0)) * 1.2 || 6,
      format: 'decimal',
      reverseWinner: true,
    },
    {
      label: 'Strike Defense',
      valueA: s1.strDef ?? 0,
      valueB: s2.strDef ?? 0,
      maxVal: 100,
      format: 'percent',
    },
    {
      label: 'TD Average/15min',
      valueA: s1.tdAvg ?? 0,
      valueB: s2.tdAvg ?? 0,
      maxVal: Math.max((s1.tdAvg ?? 0), (s2.tdAvg ?? 0)) * 1.2 || 3,
      format: 'decimal',
    },
    {
      label: 'TD Accuracy',
      valueA: s1.tdAcc ?? 0,
      valueB: s2.tdAcc ?? 0,
      maxVal: 100,
      format: 'percent',
    },
    {
      label: 'TD Defense',
      valueA: s1.tdDef ?? 0,
      valueB: s2.tdDef ?? 0,
      maxVal: 100,
      format: 'percent',
    },
    {
      label: 'Sub Average/15min',
      valueA: s1.subAvg ?? 0,
      valueB: s2.subAvg ?? 0,
      maxVal: Math.max((s1.subAvg ?? 0), (s2.subAvg ?? 0)) * 1.2 || 3,
      format: 'decimal',
    },
  ];

  const tale_of_tape: TaleOfTapeRow[] = [
    { label: 'Altura', fighter1: s1.height || 'N/A', fighter2: s2.height || 'N/A' },
    { label: 'Alcance', fighter1: s1.reach || 'N/A', fighter2: s2.reach || 'N/A' },
    { label: 'Stance', fighter1: s1.stance || 'N/A', fighter2: s2.stance || 'N/A' },
  ];

  return { stats, tale_of_tape };
}

export function computeWinDistribution(
  f1: FighterDBData,
  f2: FighterDBData,
): DistribuicaoVitoriasSectionData {
  const calc = (f: FighterDBData) => {
    const total = f.vitorias || 1;
    return {
      nome: f.nome,
      total_wins: f.vitorias,
      ko_tko: { count: f.nocautes, percent: Math.round((f.nocautes / total) * 100) },
      submission: { count: f.finalizacoes, percent: Math.round((f.finalizacoes / total) * 100) },
      decision: { count: f.decisoes, percent: Math.round((f.decisoes / total) * 100) },
    };
  };

  return {
    fighter1: calc(f1),
    fighter2: calc(f2),
    insight: '', // will be filled by AI
  };
}

export function computeCommonOpponent(
  comparison: FighterComparison,
  f1Name: string,
  f2Name: string,
): OponenteComumSectionData | null {
  if (!comparison.commonOpponents || comparison.commonOpponents.length === 0) {
    return null;
  }

  // Pick the most recent/relevant common opponent
  const opp = comparison.commonOpponents[0];

  return {
    oponente_nome: opp.opponent,
    fighter1_result: {
      resultado: opp.fighter1Result,
      metodo: '',
      duracao: '',
      contexto: '',
      performance: '',
      evento: '',
      data: '',
    },
    fighter2_result: {
      resultado: opp.fighter2Result,
      metodo: '',
      duracao: '',
      contexto: '',
      performance: '',
      evento: '',
      data: '',
    },
    insight: '', // AI will fill
  };
}
