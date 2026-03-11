/**
 * Derived Metrics Engine
 *
 * Takes an EnhancedFighterProfile (career stats + per-fight detailed data)
 * and calculates advanced metrics: trends, distributions, patterns,
 * career arc, opponent quality, and head-to-head comparisons.
 */
import type { EnhancedFighterProfile, FightDetailStats, StrikePair } from './ufcstats-scraper';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type Trend = 'improving' | 'declining' | 'stable';
export type OpponentQuality = 'elite' | 'strong' | 'average' | 'weak';

export interface DerivedMetrics {
  // ─── TRENDING (last 3 vs career) ───
  recentSigStrPerMin: number;
  recentStrAccuracy: number;
  recentAbsorptionRate: number;
  trendingSigStr: Trend;
  trendingAccuracy: Trend;
  trendingAbsorption: Trend;

  // ─── STRIKING DISTRIBUTION ───
  strikingDifferential: number;        // SLpM - SApM
  headStrikeRate: number;              // % of sig str targeting head
  bodyStrikeRate: number;
  legStrikeRate: number;
  distanceStrikeRate: number;          // % thrown at distance
  clinchStrikeRate: number;
  groundStrikeRate: number;

  // ─── GRAPPLING ───
  avgCtrlTimeSec: number;              // average control time per fight
  avgTdLanded: number;                 // average TDs landed per fight
  avgSubAtt: number;                   // average sub attempts per fight
  avgReversals: number;

  // ─── ROUND-BY-ROUND PATTERNS ───
  sigStrByRound: number[];             // sig strikes landed per round (avg)
  outputDropoffPct: number;            // % drop from R1 to last round
  lateRoundSurge: boolean;             // output increases in later rounds?
  firstRoundFinishRate: number;        // % of finishes in R1
  goesToDecisionRate: number;          // % of fights that go the distance
  avgFightTimeSec: number;             // average fight duration

  // ─── KNOCKDOWN DATA ───
  kdLandedPerFight: number;
  kdAbsorbedPerFight: number;          // from opponent's data in the same fight
  knockdownRatio: number;              // kd landed / kd absorbed

  // ─── CAREER ARC ───
  currentStreak: number;               // positive = wins, negative = losses
  streakType: 'win' | 'loss' | 'none';
  lastLoss: { opponent: string; method: string; date: string } | null;
  finishRate: number;                  // % of wins by finish (KO/TKO + SUB)
  recentFinishRate: number;            // finish rate in last 5
  totalUfcFights: number;

  // ─── OPPONENT QUALITY ───
  avgOpponentWinPct: number | null;    // null if unknown
  recentOpponentQuality: OpponentQuality;

  // ─── CONTEXTUAL ───
  stance: string | null;
  fightCamp: string | null;
}

export interface FighterComparison {
  commonOpponents: {
    opponent: string;
    fighter1Result: string;            // "W by KO/TKO R2"
    fighter2Result: string;
  }[];
  advantages: {
    category: string;
    edge: 'fighter1' | 'fighter2' | 'even';
    detail: string;
  }[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATION HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function safeDivide(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}

function pctOf(pair: StrikePair): number {
  return pair.attempted === 0 ? 0 : Math.round((pair.landed / pair.attempted) * 100);
}

function sumPairs(pairs: StrikePair[]): StrikePair {
  return pairs.reduce(
    (acc, p) => ({ landed: acc.landed + p.landed, attempted: acc.attempted + p.attempted }),
    { landed: 0, attempted: 0 }
  );
}

function determineTrend(recent: number, career: number, thresholdPct: number = 15): Trend {
  if (career === 0) return 'stable';
  const diff = ((recent - career) / career) * 100;
  if (diff > thresholdPct) return 'improving';
  if (diff < -thresholdPct) return 'declining';
  return 'stable';
}

/** Convert round + time to total seconds (e.g., R3 2:30 = 12min30s = 750s) */
function fightDurationSec(roundFinished: number, timeFinished: string): number {
  const completedRounds = Math.max(0, roundFinished - 1);
  const match = timeFinished.match(/(\d+):(\d+)/);
  const lastRoundSec = match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 300;
  return completedRounds * 300 + lastRoundSec;
}

function isFinish(method: string): boolean {
  const m = method.toUpperCase();
  return m.includes('KO') || m.includes('TKO') || m.includes('SUB');
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CALCULATION
// ═══════════════════════════════════════════════════════════════════════════════

export function calculateDerivedMetrics(
  profile: EnhancedFighterProfile,
  dbData?: { academia?: string | null; stance?: string | null }
): DerivedMetrics {
  const fights = profile.fightHistory;
  const hasFights = fights.length > 0;
  const hasDetailedFights = fights.filter(f => f.totals.sigStr.attempted > 0).length;

  // Fights with actual detailed stats (not empty fallbacks)
  const detailedFights = fights.filter(f => f.totals.sigStr.attempted > 0);
  const recent3 = detailedFights.slice(0, 3);
  const recent5 = detailedFights.slice(0, 5);

  // ─── TRENDING ───
  const calcSigStrPerMin = (fightList: FightDetailStats[]): number => {
    if (fightList.length === 0) return 0;
    let totalLanded = 0;
    let totalTimeSec = 0;
    for (const f of fightList) {
      totalLanded += f.totals.sigStr.landed;
      totalTimeSec += fightDurationSec(f.roundFinished, f.timeFinished);
    }
    return totalTimeSec === 0 ? 0 : Math.round((totalLanded / (totalTimeSec / 60)) * 100) / 100;
  };

  const calcAccuracy = (fightList: FightDetailStats[]): number => {
    const allSigStr = sumPairs(fightList.map(f => f.totals.sigStr));
    return pctOf(allSigStr);
  };

  const calcAbsorption = (fightList: FightDetailStats[]): number => {
    // We don't have opponent's strikes directly, but we can estimate from SApM career stat
    // For now, return career SApM as baseline
    return profile.sapm ?? 0;
  };

  const recentSigStrPerMin = calcSigStrPerMin(recent3);
  const recentStrAccuracy = calcAccuracy(recent3);
  const careerSigStrPerMin = profile.slpm ?? 0;
  const careerStrAccuracy = profile.strAcc ?? 0;
  const recentAbsorptionRate = profile.sapm ?? 0; // Career average (can't derive per-fight absorbed from our fighter's page alone)

  // ─── STRIKING DISTRIBUTION ───
  const allHead = sumPairs(detailedFights.map(f => f.totals.head));
  const allBody = sumPairs(detailedFights.map(f => f.totals.body));
  const allLeg = sumPairs(detailedFights.map(f => f.totals.leg));
  const totalByTarget = allHead.landed + allBody.landed + allLeg.landed;

  const allDistance = sumPairs(detailedFights.map(f => f.totals.distance));
  const allClinch = sumPairs(detailedFights.map(f => f.totals.clinch));
  const allGround = sumPairs(detailedFights.map(f => f.totals.ground));
  const totalByPosition = allDistance.landed + allClinch.landed + allGround.landed;

  // ─── GRAPPLING ───
  const avgCtrlTimeSec = hasFights
    ? Math.round(detailedFights.reduce((s, f) => s + f.totals.ctrlTimeSec, 0) / detailedFights.length)
    : 0;
  const avgTdLanded = hasFights
    ? Math.round(detailedFights.reduce((s, f) => s + f.totals.td.landed, 0) / detailedFights.length * 10) / 10
    : 0;
  const avgSubAtt = hasFights
    ? Math.round(detailedFights.reduce((s, f) => s + f.totals.subAtt, 0) / detailedFights.length * 10) / 10
    : 0;
  const avgReversals = hasFights
    ? Math.round(detailedFights.reduce((s, f) => s + f.totals.rev, 0) / detailedFights.length * 10) / 10
    : 0;

  // ─── ROUND-BY-ROUND PATTERNS ───
  // Aggregate sig strikes by round number across all fights
  const roundBuckets: Record<number, number[]> = {};
  for (const fight of detailedFights) {
    for (const round of fight.rounds) {
      if (!roundBuckets[round.round]) roundBuckets[round.round] = [];
      roundBuckets[round.round].push(round.sigStr.landed);
    }
  }
  const sigStrByRound = Object.keys(roundBuckets)
    .sort((a, b) => Number(a) - Number(b))
    .map(r => {
      const vals = roundBuckets[Number(r)];
      return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length * 10) / 10;
    });

  const r1Output = sigStrByRound[0] ?? 0;
  const lastOutput = sigStrByRound.length > 0 ? sigStrByRound[sigStrByRound.length - 1] : 0;
  const outputDropoffPct = r1Output > 0 ? Math.round(((r1Output - lastOutput) / r1Output) * 100) : 0;
  const lateRoundSurge = sigStrByRound.length >= 3 &&
    sigStrByRound[sigStrByRound.length - 1] > sigStrByRound[0];

  // Finish rates
  const wins = fights.filter(f => f.result === 'W');
  const finishes = wins.filter(f => isFinish(f.method));
  const r1Finishes = finishes.filter(f => f.roundFinished === 1);
  const decisions = fights.filter(f =>
    f.method.includes('DEC') || f.method.includes('Decision')
  );

  const firstRoundFinishRate = wins.length > 0 ? Math.round((r1Finishes.length / wins.length) * 100) : 0;
  const goesToDecisionRate = fights.length > 0 ? Math.round((decisions.length / fights.length) * 100) : 0;
  const finishRate = wins.length > 0 ? Math.round((finishes.length / wins.length) * 100) : 0;

  const recent5Wins = recent5.filter(f => f.result === 'W');
  const recent5Finishes = recent5Wins.filter(f => isFinish(f.method));
  const recentFinishRate = recent5Wins.length > 0
    ? Math.round((recent5Finishes.length / recent5Wins.length) * 100)
    : 0;

  // Average fight time
  const avgFightTimeSec = fights.length > 0
    ? Math.round(fights.reduce((s, f) => s + fightDurationSec(f.roundFinished, f.timeFinished), 0) / fights.length)
    : 0;

  // ─── KNOCKDOWNS ───
  const totalKdLanded = detailedFights.reduce((s, f) => s + f.totals.kd, 0);
  const kdLandedPerFight = hasDetailedFights ? Math.round(totalKdLanded / hasDetailedFights * 100) / 100 : 0;
  // KD absorbed: we can't directly get this from our fighter's stats page
  // (we'd need opponent data). Approximate as 0 for now — will improve in future.
  const kdAbsorbedPerFight = 0;
  const knockdownRatio = totalKdLanded > 0 ? totalKdLanded : 0;

  // ─── CAREER ARC ───
  let currentStreak = 0;
  let streakType: 'win' | 'loss' | 'none' = 'none';
  if (fights.length > 0) {
    const firstResult = fights[0].result;
    if (firstResult === 'W' || firstResult === 'L') {
      streakType = firstResult === 'W' ? 'win' : 'loss';
      for (const f of fights) {
        if (f.result === firstResult) currentStreak++;
        else break;
      }
      if (streakType === 'loss') currentStreak = -currentStreak;
    }
  }

  const lastLossIdx = fights.findIndex(f => f.result === 'L');
  const lastLoss = lastLossIdx >= 0
    ? {
        opponent: fights[lastLossIdx].opponent,
        method: fights[lastLossIdx].method,
        date: fights[lastLossIdx].eventDate,
      }
    : null;

  // ─── OPPONENT QUALITY ───
  // Simple heuristic based on context (event type, streak)
  const recentOpponents = fights.slice(0, 5).map(f => f.opponent);
  // We'll mark as "strong" by default since these fighters are in the UFC
  const recentOpponentQuality: OpponentQuality = 'strong';

  return {
    recentSigStrPerMin,
    recentStrAccuracy,
    recentAbsorptionRate,
    trendingSigStr: determineTrend(recentSigStrPerMin, careerSigStrPerMin),
    trendingAccuracy: determineTrend(recentStrAccuracy, careerStrAccuracy),
    trendingAbsorption: determineTrend(recentAbsorptionRate, profile.sapm ?? 0, 10),

    strikingDifferential: Math.round(((profile.slpm ?? 0) - (profile.sapm ?? 0)) * 100) / 100,
    headStrikeRate: totalByTarget > 0 ? Math.round((allHead.landed / totalByTarget) * 100) : 0,
    bodyStrikeRate: totalByTarget > 0 ? Math.round((allBody.landed / totalByTarget) * 100) : 0,
    legStrikeRate: totalByTarget > 0 ? Math.round((allLeg.landed / totalByTarget) * 100) : 0,
    distanceStrikeRate: totalByPosition > 0 ? Math.round((allDistance.landed / totalByPosition) * 100) : 0,
    clinchStrikeRate: totalByPosition > 0 ? Math.round((allClinch.landed / totalByPosition) * 100) : 0,
    groundStrikeRate: totalByPosition > 0 ? Math.round((allGround.landed / totalByPosition) * 100) : 0,

    avgCtrlTimeSec,
    avgTdLanded,
    avgSubAtt,
    avgReversals,

    sigStrByRound,
    outputDropoffPct,
    lateRoundSurge,
    firstRoundFinishRate,
    goesToDecisionRate,
    avgFightTimeSec,

    kdLandedPerFight,
    kdAbsorbedPerFight,
    knockdownRatio,

    currentStreak,
    streakType,
    lastLoss,
    finishRate,
    recentFinishRate,
    totalUfcFights: profile.totalUfcFights,

    avgOpponentWinPct: null,
    recentOpponentQuality,

    stance: profile.stance || dbData?.stance || null,
    fightCamp: dbData?.academia || null,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FIGHTER COMPARISON
// ═══════════════════════════════════════════════════════════════════════════════

export function compareFighters(
  profile1: EnhancedFighterProfile,
  metrics1: DerivedMetrics,
  profile2: EnhancedFighterProfile,
  metrics2: DerivedMetrics,
): FighterComparison {
  // ─── COMMON OPPONENTS ───
  const opponentMap1 = new Map<string, FightDetailStats>();
  for (const f of profile1.fightHistory) {
    opponentMap1.set(f.opponent.toLowerCase(), f);
  }
  const commonOpponents: FighterComparison['commonOpponents'] = [];
  for (const f of profile2.fightHistory) {
    const match = opponentMap1.get(f.opponent.toLowerCase());
    if (match) {
      commonOpponents.push({
        opponent: f.opponent,
        fighter1Result: `${match.result} by ${match.method} R${match.roundFinished}`,
        fighter2Result: `${f.result} by ${f.method} R${f.roundFinished}`,
      });
    }
  }

  // ─── ADVANTAGES ───
  const advantages: FighterComparison['advantages'] = [];

  const addAdvantage = (
    category: string,
    val1: number,
    val2: number,
    higherIsBetter: boolean,
    detail: (winner: string, diff: number) => string
  ) => {
    const diff = Math.abs(val1 - val2);
    if (diff < 0.01) {
      advantages.push({ category, edge: 'even', detail: 'Praticamente iguais' });
    } else {
      const f1Better = higherIsBetter ? val1 > val2 : val1 < val2;
      const edge = f1Better ? 'fighter1' : 'fighter2';
      const winner = f1Better ? profile1.name : profile2.name;
      advantages.push({ category, edge, detail: detail(winner, diff) });
    }
  };

  addAdvantage('Volume de Striking',
    profile1.slpm ?? 0, profile2.slpm ?? 0, true,
    (w, d) => `${w} lanca ${d.toFixed(1)} golpes significativos a mais por minuto`
  );

  addAdvantage('Precisao de Striking',
    metrics1.recentStrAccuracy, metrics2.recentStrAccuracy, true,
    (w, d) => `${w} conecta ${d}% a mais dos golpes (ultimas 3 lutas)`
  );

  addAdvantage('Defesa de Striking',
    profile1.strDef ?? 0, profile2.strDef ?? 0, true,
    (w, d) => `${w} evita ${d}% mais golpes`
  );

  addAdvantage('Absorcao de Dano',
    profile1.sapm ?? 0, profile2.sapm ?? 0, false,
    (w, d) => `${w} absorve ${d.toFixed(1)} golpes a menos por minuto`
  );

  addAdvantage('Takedowns',
    metrics1.avgTdLanded, metrics2.avgTdLanded, true,
    (w, d) => `${w} encaixa ${d.toFixed(1)} TDs a mais por luta`
  );

  addAdvantage('Defesa de Takedown',
    profile1.tdDef ?? 0, profile2.tdDef ?? 0, true,
    (w, d) => `${w} defende ${d}% mais TDs`
  );

  addAdvantage('Controle no Ground',
    metrics1.avgCtrlTimeSec, metrics2.avgCtrlTimeSec, true,
    (w, d) => `${w} controla ${Math.floor(d / 60)}:${String(Math.round(d % 60)).padStart(2, '0')} a mais por luta`
  );

  addAdvantage('Taxa de Finalizacao',
    metrics1.finishRate, metrics2.finishRate, true,
    (w, d) => `${w} finaliza ${d}% mais das vitorias`
  );

  addAdvantage('Cardio (Queda de Output)',
    metrics1.outputDropoffPct, metrics2.outputDropoffPct, false,
    (w, d) => `${w} cai ${d}% menos de output nos rounds finais`
  );

  addAdvantage('Knockdowns',
    metrics1.kdLandedPerFight, metrics2.kdLandedPerFight, true,
    (w, d) => `${w} derruba ${d.toFixed(1)} a mais por luta`
  );

  return { commonOpponents, advantages };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORMAT FOR PROMPT — Human-readable data package for Claude
// ═══════════════════════════════════════════════════════════════════════════════

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(Math.round(s)).padStart(2, '0')}`;
}

function trendArrow(t: Trend): string {
  if (t === 'improving') return '↑ IMPROVING';
  if (t === 'declining') return '↓ DECLINING';
  return '→ STABLE';
}

export function formatEnhancedDataPackage(
  label: string,
  profile: EnhancedFighterProfile,
  metrics: DerivedMetrics,
): string {
  const lines: string[] = [];
  const h = (text: string) => lines.push(text);
  const l = (text: string) => lines.push(`  ${text}`);

  h(`${label} COMPLETE DATA PACKAGE (${profile.name} — ${profile.record}):`);
  h('');

  // Career Stats
  h('CAREER STATS (UFCStats.com verified):');
  l(`SLpM: ${profile.slpm ?? 'N/A'} | Str. Accuracy: ${profile.strAcc ?? 'N/A'}% | SApM: ${profile.sapm ?? 'N/A'} | Str. Defense: ${profile.strDef ?? 'N/A'}%`);
  l(`TD Avg/15min: ${profile.tdAvg ?? 'N/A'} | TD Accuracy: ${profile.tdAcc ?? 'N/A'}% | TD Defense: ${profile.tdDef ?? 'N/A'}%`);
  l(`Sub. Avg/15min: ${profile.subAvg ?? 'N/A'} | Stance: ${profile.stance ?? 'N/A'} | Height: ${profile.height ?? 'N/A'} | Reach: ${profile.reach ?? 'N/A'}`);
  h('');

  // Trending
  h('TRENDING (Last 3 fights vs career):');
  l(`SLpM: ${metrics.recentSigStrPerMin} (career: ${profile.slpm ?? 'N/A'}) ${trendArrow(metrics.trendingSigStr)}`);
  l(`Str Acc: ${metrics.recentStrAccuracy}% (career: ${profile.strAcc ?? 'N/A'}%) ${trendArrow(metrics.trendingAccuracy)}`);
  l(`Striking Differential: ${metrics.strikingDifferential > 0 ? '+' : ''}${metrics.strikingDifferential} (${metrics.strikingDifferential > 0 ? 'lands more than absorbs' : 'absorbs more than lands'})`);
  h('');

  // Striking Distribution
  h('STRIKING DISTRIBUTION (from fight detail data):');
  l(`By Target: Head ${metrics.headStrikeRate}% | Body ${metrics.bodyStrikeRate}% | Leg ${metrics.legStrikeRate}%`);
  l(`By Position: Distance ${metrics.distanceStrikeRate}% | Clinch ${metrics.clinchStrikeRate}% | Ground ${metrics.groundStrikeRate}%`);
  h('');

  // Grappling
  h('GRAPPLING DEEP DIVE:');
  l(`Avg Control Time/fight: ${formatTime(metrics.avgCtrlTimeSec)}`);
  l(`Avg TD Landed/fight: ${metrics.avgTdLanded}`);
  l(`Avg Sub Attempts/fight: ${metrics.avgSubAtt}`);
  l(`Avg Reversals/fight: ${metrics.avgReversals}`);
  h('');

  // Round-by-Round
  h('ROUND-BY-ROUND PATTERN:');
  if (metrics.sigStrByRound.length > 0) {
    l(metrics.sigStrByRound.map((v, i) => `R${i + 1}: ${v} sig str`).join(' | '));
    l(`Output Dropoff: ${metrics.outputDropoffPct}% from R1 to last round`);
    l(`Late Round Surge: ${metrics.lateRoundSurge ? 'YES — output increases in later rounds' : 'NO — output decreases'}`);
  }
  l(`First Round Finish Rate: ${metrics.firstRoundFinishRate}%`);
  l(`Goes to Decision: ${metrics.goesToDecisionRate}% of fights`);
  l(`Avg Fight Duration: ${formatTime(metrics.avgFightTimeSec)}`);
  h('');

  // Knockdowns
  h('KNOCKDOWN DATA:');
  l(`KD Landed/fight: ${metrics.kdLandedPerFight}`);
  h('');

  // Fight History
  h(`FIGHT HISTORY (last ${profile.fightHistory.length} fights):`);
  for (const fight of profile.fightHistory) {
    const t = fight.totals;
    const sigStrLine = t.sigStr.attempted > 0
      ? `SigStr: ${t.sigStr.landed}/${t.sigStr.attempted} (${t.sigStrPct}%)`
      : 'No detailed stats';
    const tdLine = t.td.attempted > 0
      ? `TD: ${t.td.landed}/${t.td.attempted}`
      : `TD: ${t.td.landed}/${t.td.attempted}`;
    const ctrlLine = `Ctrl: ${formatTime(t.ctrlTimeSec)}`;

    l(`${fight.result} vs ${fight.opponent} | ${fight.method} R${fight.roundFinished} ${fight.timeFinished} | ${fight.eventName} (${fight.eventDate})`);
    if (t.sigStr.attempted > 0) {
      l(`  ${sigStrLine} | ${tdLine} | ${ctrlLine}`);
      l(`  Head: ${t.head.landed}/${t.head.attempted} | Body: ${t.body.landed}/${t.body.attempted} | Leg: ${t.leg.landed}/${t.leg.attempted} | Dist: ${t.distance.landed}/${t.distance.attempted} | Clinch: ${t.clinch.landed}/${t.clinch.attempted} | Ground: ${t.ground.landed}/${t.ground.attempted}`);
    }
  }
  h('');

  // Career Arc
  h('CAREER ARC:');
  l(`Current Streak: ${metrics.currentStreak > 0 ? `W${metrics.currentStreak}` : metrics.currentStreak < 0 ? `L${Math.abs(metrics.currentStreak)}` : 'None'}`);
  if (metrics.lastLoss) {
    l(`Last Loss: ${metrics.lastLoss.opponent} via ${metrics.lastLoss.method} (${metrics.lastLoss.date})`);
  } else {
    l(`Last Loss: None in scraped history`);
  }
  l(`Finish Rate: ${metrics.finishRate}% | Recent (last 5): ${metrics.recentFinishRate}%`);
  l(`Total UFC Fights: ${metrics.totalUfcFights}`);

  return lines.join('\n');
}

export function formatHeadToHeadComparison(
  profile1: EnhancedFighterProfile,
  metrics1: DerivedMetrics,
  profile2: EnhancedFighterProfile,
  metrics2: DerivedMetrics,
  comparison: FighterComparison,
): string {
  const lines: string[] = [];
  const h = (text: string) => lines.push(text);
  const l = (text: string) => lines.push(`  ${text}`);

  h('HEAD-TO-HEAD COMPARISON:');
  h('');

  if (comparison.commonOpponents.length > 0) {
    h('COMMON OPPONENTS:');
    for (const co of comparison.commonOpponents) {
      l(`${co.opponent}: ${profile1.name.split(' ').pop()} ${co.fighter1Result} | ${profile2.name.split(' ').pop()} ${co.fighter2Result}`);
    }
    h('');
  }

  h('ADVANTAGES BY CATEGORY:');
  for (const adv of comparison.advantages) {
    const edgeLabel = adv.edge === 'fighter1'
      ? `→ ${profile1.name.split(' ').pop()} ADVANTAGE`
      : adv.edge === 'fighter2'
      ? `→ ${profile2.name.split(' ').pop()} ADVANTAGE`
      : '→ EVEN';
    l(`${adv.category}: ${adv.detail} ${edgeLabel}`);
  }

  return lines.join('\n');
}