'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/Header';
import {
  TrendingUp,
  Target,
  Shield,
  Swords,
  AlertTriangle,
  Eye,
  Zap,
  Clock,
  Activity,
  Brain,
  MapPin,
  BarChart3,
  MessageCircle,
  Video,
  Instagram,
  Twitter,
  ArrowRight,
} from 'lucide-react';

/* ====================================================================
   HELPER: Horizontal Stat Bar
   ==================================================================== */
function StatBar({
  label,
  valueA,
  valueB,
  maxVal,
  nameA,
  nameB,
  note,
  format,
  reverseWinner,
}: {
  label: string;
  valueA: number;
  valueB: number;
  maxVal: number;
  nameA: string;
  nameB: string;
  note?: string;
  format?: (v: number) => string;
  reverseWinner?: boolean;
}) {
  const fmt = format || ((v: number) => String(v));
  const aWins = reverseWinner ? valueA < valueB : valueA > valueB;
  const bWins = reverseWinner ? valueB < valueA : valueB > valueA;
  const tie = valueA === valueB;
  return (
    <div className="mb-5">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className={`font-semibold ${aWins && !tie ? 'text-ufc-red' : 'text-dark-textMuted'}`}>
          {fmt(valueA)}
        </span>
        <span className="text-xs uppercase tracking-wider text-dark-textMuted">{label}</span>
        <span className={`font-semibold ${bWins && !tie ? 'text-blue-400' : 'text-dark-textMuted'}`}>
          {fmt(valueB)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex h-3 flex-1 justify-end overflow-hidden rounded-l-full bg-dark-bg">
          <div
            className={`h-full rounded-l-full transition-all ${aWins ? 'bg-ufc-red' : 'bg-ufc-red/40'}`}
            style={{ width: `${(valueA / maxVal) * 100}%` }}
          />
        </div>
        <div className="flex h-3 flex-1 overflow-hidden rounded-r-full bg-dark-bg">
          <div
            className={`h-full rounded-r-full transition-all ${bWins ? 'bg-blue-400' : 'bg-blue-400/40'}`}
            style={{ width: `${(valueB / maxVal) * 100}%` }}
          />
        </div>
      </div>
      {note && <p className="mt-1 text-xs italic text-dark-textMuted">{note}</p>}
    </div>
  );
}

/* ====================================================================
   HELPER: Section Header
   ==================================================================== */
function SectionHeader({ number, title, accent }: { number: string; title: string; accent?: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ufc-red/20 font-display text-lg text-ufc-red">
        {number}
      </span>
      <h2 className="font-display text-2xl uppercase tracking-wide text-dark-text md:text-3xl">
        {title} {accent && <span className="text-ufc-red">{accent}</span>}
      </h2>
    </div>
  );
}

/* ====================================================================
   HELPER: Skill Bar
   ==================================================================== */
function SkillBar({ label, valueA, valueB }: { label: string; valueA: number; valueB: number }) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wider text-dark-textMuted">
        <span>{label}</span>
        <span>
          <span className={valueA >= valueB ? 'text-ufc-red font-bold' : ''}>{valueA}</span>
          {' / '}
          <span className={valueB >= valueA ? 'text-blue-400 font-bold' : ''}>{valueB}</span>
        </span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-dark-bg">
        <div className="absolute inset-y-0 left-0 rounded-full bg-ufc-red/70" style={{ width: `${valueA}%` }} />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-blue-400/50 border-r-2 border-blue-400"
          style={{ width: `${valueB}%` }}
        />
        <div className="absolute inset-y-0 left-0 rounded-full bg-ufc-red" style={{ width: `${Math.min(valueA, valueB)}%` }} />
      </div>
      <div className="mt-0.5 flex justify-between">
        <div className="h-1 rounded-full bg-ufc-red" style={{ width: `${valueA}%`, maxWidth: '48%' }} />
        <div className="h-1 rounded-full bg-blue-400" style={{ width: `${valueB}%`, maxWidth: '48%' }} />
      </div>
    </div>
  );
}

/* ====================================================================
   MAIN PAGE COMPONENT
   ==================================================================== */
export default function EvloevVsMurphyPage() {
  const [creatorTab, setCreatorTab] = useState<'instagram' | 'twitter' | 'video'>('instagram');

  return (
    <div className="min-h-screen bg-dark-bg font-body text-dark-text">
      <Header />

      {/* ============================================================
          SECTION 1: HERO
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-dark-border">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ufc-red/20 via-ufc-red/5 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-400/20 via-blue-400/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,10,10,0.08),transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm uppercase tracking-widest text-dark-textMuted">
            <span className="rounded-full bg-ufc-red/20 px-3 py-1 text-xs font-bold text-ufc-red">UFC FIGHT NIGHT 270</span>
            <span>21 de Marco, 2026</span>
            <span className="hidden sm:inline">|</span>
            <span>The O2 Arena, Londres</span>
          </div>

          <div className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-dark-textMuted">
            <span className="rounded border border-dark-border px-2 py-0.5">Peso Pena</span>
            <span className="rounded border border-dark-border px-2 py-0.5">5 Rounds</span>
            <span className="rounded border border-ufc-gold/50 bg-ufc-gold/10 px-2 py-0.5 text-ufc-gold font-bold">
              #1 Contender
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
            <div className="text-center md:text-right md:flex-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-ufc-red">#1 Peso Pena</p>
              <p className="font-display text-5xl uppercase text-dark-text md:text-7xl lg:text-8xl">Evloev</p>
              <p className="mt-2 text-sm text-dark-textMuted">19-0-0 | #1 FW | Ingushetia, Russia | 32 anos</p>
            </div>

            <div className="flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dark-border bg-dark-card font-display text-3xl text-ufc-gold">
                VS
              </div>
            </div>

            <div className="text-center md:text-left md:flex-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">Lerone &quot;The Miracle&quot; Murphy</p>
              <p className="font-display text-5xl uppercase text-dark-text md:text-7xl lg:text-8xl">Murphy</p>
              <p className="mt-2 text-sm text-dark-textMuted">17-0-1 | #3 FW | Manchester, Inglaterra | 34 anos</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="font-display text-xl uppercase tracking-wider text-ufc-gold md:text-2xl">
              &quot;Invictos Colidem em Londres&quot;
            </p>
            <p className="mt-2 text-sm text-dark-textMuted">
              O wrestler perfeito contra o striker que nunca perde. O vencedor desafia Volkanovski.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-20">
        {/* ============================================================
            SECTION 2: NARRATIVA DA LUTA
            ============================================================ */}
        <section>
          <SectionHeader number="01" title="O Contexto Que Ninguem" accent="Te Conta" />

          <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
            <div
              className="prose prose-invert max-w-none text-dark-textMuted prose-headings:text-dark-text prose-strong:text-dark-text prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `
                  <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Dois Invictos, Uma Vaga</h3>
                  <p>A divisao dos penas do UFC esta travada. Alexander Volkanovski segura o cinturao, mas dois contenders invictos estao prontos para desafiar. O problema? Sao dois. E so um pode ir. O UFC fez o que tinha que fazer: colocou o #1 contra o #3, em Londres, na casa do Murphy, pra resolver de uma vez.</p>
                  <p>Movsar Evloev construiu um cartel de 19-0 na base da disciplina, controle e wrestling sufocante. Treina na American Top Team, veio da escola dagestanesa de Greco-Romana, e nunca perdeu um round de forma convincente. O problema? Ninguem sabe se ele ainda e o mesmo. Um virus misterioso em 2025 quase encerrou sua carreira. Ele ficou meses sem conseguir treinar, foi afastado do card do UFC Abu Dhabi, e chegou a temer que nunca mais lutaria.</p>
                  <p>Lerone Murphy e o oposto em estilo. Cresceu nas ruas de Manchester, sobreviveu a um tiro na cabeca aos 18 anos (o apelido "The Miracle" nao e marketing), e construiu sua carreira com striking tecnico e poder de finalizacao. O KO de cotovelo giratoria sobre Aaron Pico em agosto de 2025 foi o nocaute do ano e colocou Murphy no mapa global.</p>
                  <p>Agora, em casa, no O2 Arena, Murphy tem a chance de se tornar o primeiro britanico a desafiar pelo titulo dos penas desde Michael Bisping (que era middleweight). E Evloev? Volta de 15 meses parado querendo provar que o virus nao tirou nada dele.</p>
                `,
              }}
            />

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="py-3 px-4 text-left font-display uppercase tracking-wider text-dark-textMuted">Dimensao</th>
                    <th className="py-3 px-4 text-left font-display uppercase tracking-wider text-ufc-red">Evloev</th>
                    <th className="py-3 px-4 text-left font-display uppercase tracking-wider text-blue-400">Murphy</th>
                  </tr>
                </thead>
                <tbody className="text-dark-textMuted">
                  <tr className="border-b border-dark-border/50">
                    <td className="py-3 px-4 font-semibold text-dark-text">Objetivo</td>
                    <td className="py-3 px-4">Provar que o virus nao tirou nada. Title shot.</td>
                    <td className="py-3 px-4">Se tornar o primeiro britanico contender dos penas.</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-3 px-4 font-semibold text-dark-text">Narrativa</td>
                    <td className="py-3 px-4">&quot;Voltei mais forte que nunca&quot;</td>
                    <td className="py-3 px-4">&quot;E a minha hora, na minha casa&quot;</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-3 px-4 font-semibold text-dark-text">Risco</td>
                    <td className="py-3 px-4">15 meses parado + efeitos do virus</td>
                    <td className="py-3 px-4">TDD de 51% contra wrestler elite</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-dark-text">Recompensa</td>
                    <td className="py-3 px-4">Title shot vs Volkanovski</td>
                    <td className="py-3 px-4">Title shot vs Volkanovski + heroi nacional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: MOMENTO ATUAL
            ============================================================ */}
        <section>
          <SectionHeader number="02" title="Momento" accent="Atual" />

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Evloev Timeline */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-ufc-red" />
                <h3 className="font-display text-xl uppercase text-ufc-red">Movsar Evloev</h3>
                <span className="text-xs text-dark-textMuted">Ultimas 5 Lutas</span>
              </div>

              <div className="space-y-4">
                {[
                  { date: 'Dez 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'UD', rank: 'Ex-Campeao BW', score: 8, note: 'Outgrappled o ex-campeao dos galos. 4/5 takedowns, +6min de controle.' },
                  { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'UD', rank: '#5 FW', score: 8, note: 'Dominio completo sobre top 5. Wrestling impecavel.' },
                  { date: 'Mai 2023', opponent: 'Diego Lopes', result: 'W', method: 'UD', rank: '#12 FW', score: 7, note: 'Fight of the Night. Luta competitiva, mas Evloev controlou.' },
                  { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'UD', rank: '#10 FW', score: 6, note: 'Dominio ABSOLUTO. 30-26 em um cartao. Cotoveladas pesadas do top.' },
                  { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'UD', rank: '#14 FW', score: 5, note: 'Vitoria solida. Continuou subindo no ranking.' },
                ].map((fight, i) => (
                  <div key={i} className="rounded-lg border border-dark-border/50 bg-dark-bg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${fight.result === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {fight.result}
                        </span>
                        <div>
                          <span className="font-semibold text-dark-text">{fight.opponent}</span>
                          <span className="ml-2 text-xs text-dark-textMuted">{fight.rank}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-dark-textMuted">{fight.date}</span>
                        <p className="text-xs font-semibold text-dark-text">{fight.method}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-dark-textMuted">Qualidade</span>
                      <div className="flex-1 h-2 rounded-full bg-dark-card overflow-hidden">
                        <div
                          className={`h-full rounded-full ${fight.score >= 9 ? 'bg-ufc-gold' : fight.score >= 7 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${fight.score * 10}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-dark-textMuted">{fight.score}/10</span>
                    </div>
                    <p className="text-xs italic text-dark-textMuted">{fight.note}</p>
                  </div>
                ))}
              </div>

              {/* Layoff Warning */}
              <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-400" />
                <span className="text-sm font-bold text-red-400">15 MESES SEM LUTAR (virus + problemas respiratorios)</span>
              </div>

              <div className="mt-4 rounded-lg border border-dark-border/50 bg-dark-bg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-dark-textMuted">Momentum Score</span>
                  <span className="font-display text-xl text-ufc-red">6.5/10</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-dark-card">
                  <div className="h-full rounded-full bg-gradient-to-r from-ufc-red to-ufc-gold" style={{ width: '65%' }} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs font-bold uppercase text-yellow-500">Incerto</span>
                </div>
                <p className="mt-2 text-xs text-dark-textMuted">
                  Invicto e dominante, mas a inatividade de 15 meses e um virus que quase encerrou sua carreira sao red flags serias. A qualidade esta la, a questao e o condicionamento.
                </p>
              </div>
            </div>

            {/* Murphy Timeline */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-blue-400" />
                <h3 className="font-display text-xl uppercase text-blue-400">Lerone Murphy</h3>
                <span className="text-xs text-dark-textMuted">Ultimas 5 Lutas</span>
              </div>

              <div className="space-y-4">
                {[
                  { date: 'Ago 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1', rank: 'Debute UFC', score: 6, note: 'Spinning back elbow DEVASTADOR em 3:21. Nocaute do ano.' },
                  { date: 'Abr 2025', opponent: 'Josh Emmett', result: 'W', method: 'UD', rank: '#9 FW', score: 7, note: 'Vitoria por decisao em 5 rounds contra veterano duro.' },
                  { date: 'Out 2024', opponent: 'Dan Ige', result: 'W', method: 'UD', rank: '#14 FW', score: 6, note: 'Luta APERTADA. Ige quase finalizou Murphy no R1. Recuperou nos rounds finais.' },
                  { date: 'Mai 2024', opponent: 'Edson Barboza', result: 'W', method: 'UD', rank: '#12 FW', score: 7, note: 'Fight of the Night. Striking tecnico superior contra veterano perigoso.' },
                  { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'UD', rank: 'NR', score: 4, note: 'Vitoria tranquila contra oponente menor.' },
                ].map((fight, i) => (
                  <div key={i} className="rounded-lg border border-dark-border/50 bg-dark-bg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${fight.result === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {fight.result}
                        </span>
                        <div>
                          <span className="font-semibold text-dark-text">{fight.opponent}</span>
                          <span className="ml-2 text-xs text-dark-textMuted">{fight.rank}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-dark-textMuted">{fight.date}</span>
                        <p className="text-xs font-semibold text-dark-text">{fight.method}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-dark-textMuted">Qualidade</span>
                      <div className="flex-1 h-2 rounded-full bg-dark-card overflow-hidden">
                        <div
                          className={`h-full rounded-full ${fight.score >= 9 ? 'bg-ufc-gold' : fight.score >= 7 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${fight.score * 10}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-dark-textMuted">{fight.score}/10</span>
                    </div>
                    <p className="text-xs italic text-dark-textMuted">{fight.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-dark-border/50 bg-dark-bg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-dark-textMuted">Momentum Score</span>
                  <span className="font-display text-xl text-blue-400">8.5/10</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-dark-card">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-300" style={{ width: '85%' }} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs font-bold uppercase text-green-400">Ascendente Forte</span>
                </div>
                <p className="mt-2 text-xs text-dark-textMuted">
                  Ativo, melhorando a cada luta, com o KO do ano no bolso. Luta em casa. Murphy esta no melhor momento da carreira e com confianca em alta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: NIVEL DE COMPETICAO
            ============================================================ */}
        <section>
          <SectionHeader number="03" title="Nivel de" accent="Competicao" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="mb-4 font-display text-lg uppercase text-ufc-red">Evloev</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Media oponentes</span>
                  <span className="font-bold text-ufc-gold">6.8/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Aproveitamento</span>
                  <span className="font-bold text-green-400">5W-0L (100%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Contra top 5</span>
                  <span className="font-bold text-dark-text">2W-0L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Ex-campeoes derrotados</span>
                  <span className="font-bold text-ufc-gold">1 (Sterling)</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="mb-4 font-display text-lg uppercase text-blue-400">Murphy</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Media oponentes</span>
                  <span className="font-bold text-dark-text">6.0/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Aproveitamento</span>
                  <span className="font-bold text-green-400">5W-0L (100%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Contra top 5</span>
                  <span className="font-bold text-dark-textMuted">0 lutas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-textMuted">Finalizacoes recentes</span>
                  <span className="font-bold text-ufc-gold">1 (Pico KO)</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-ufc-gold/30 bg-ufc-gold/5 p-6 md:col-span-2 lg:col-span-1">
              <h3 className="mb-4 font-display text-lg uppercase text-ufc-gold">Interpretacao</h3>
              <p className="text-sm text-dark-textMuted">
                Evloev enfrentou oposicao ligeiramente superior, incluindo um ex-campeao (Sterling) e um top 5 (Allen). Murphy ainda nao testou ninguem do calibre de Sterling ou Allen. Esta luta e o maior teste da carreira de Murphy e o primeiro combate de Evloev em 15 meses.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: SPOTLIGHT DAN IGE
            ============================================================ */}
        <section>
          <SectionHeader number="04" title="Spotlight:" accent="Dan Ige" />
          <p className="mb-6 -mt-4 text-sm text-dark-textMuted">Unico oponente em comum significativo</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-ufc-red/30 bg-dark-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="font-display text-sm text-ufc-red">ME</span>
                </div>
                <div>
                  <h4 className="font-display text-lg uppercase text-ufc-red">Evloev vs Ige</h4>
                  <p className="text-xs text-dark-textMuted">UFC Vegas 56 | Jun 2022</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-dark-textMuted">
                <p><span className="font-bold text-green-400">Resultado:</span> UD (30-26, 30-27, 30-27)</p>
                <p><span className="font-bold text-dark-text">Dominio:</span> Total e absoluto. Um juiz deu 30-26.</p>
                <p><span className="font-bold text-dark-text">Contexto:</span> Ige tentou ser agressivo no inicio, mas Evloev rapidamente assumiu controle com takedowns e cotoveladas pesadas do top position no R2. R3 foi uma clinica de wrestling.</p>
                <p><span className="font-bold text-dark-text">Highlights:</span> Cotoveladas devastadoras do ground-and-pound. Ige nunca ameacou de verdade.</p>
              </div>
            </div>

            <div className="rounded-lg border border-blue-400/30 bg-dark-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="font-display text-sm text-blue-400">LM</span>
                </div>
                <div>
                  <h4 className="font-display text-lg uppercase text-blue-400">Murphy vs Ige</h4>
                  <p className="text-xs text-dark-textMuted">UFC 308 | Out 2024</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-dark-textMuted">
                <p><span className="font-bold text-green-400">Resultado:</span> UD (29-28, 29-28, 29-28)</p>
                <p><span className="font-bold text-dark-text">Dominio:</span> APERTADO. Todos os juizes deram 29-28.</p>
                <p><span className="font-bold text-dark-text">Contexto:</span> Ige QUASE finalizou Murphy no primeiro round com um golpe pesado que o derrubou. Murphy se recuperou, venceu o R2 a distancia, e roubou o R3 com uma reversao e golpes pesados no final.</p>
                <p><span className="font-bold text-dark-text">Red Flag:</span> Murphy foi machucado e quase finalizado por um lutador que Evloev dominou completamente.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-ufc-gold/30 bg-ufc-gold/5 p-5">
            <div className="flex items-start gap-3">
              <Eye className="mt-0.5 h-5 w-5 flex-shrink-0 text-ufc-gold" />
              <div>
                <h4 className="font-display text-sm uppercase text-ufc-gold mb-1">Insight Chave</h4>
                <p className="text-sm text-dark-textMuted">
                  A diferenca de performance contra Dan Ige e gritante. Evloev DOMINOU (30-26 em um cartao). Murphy quase PERDEU (quase finalizado no R1, venceu apertado). Isso sugere que Evloev e um nivel acima quando impoe seu wrestling. A grande pergunta: Murphy evoluiu desde outubro de 2024? E Evloev ainda e o mesmo depois do virus?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: COMPARACAO ESTATISTICA PROFUNDA
            ============================================================ */}
        <section>
          <SectionHeader number="05" title="Comparacao" accent="Estatistica" />

          <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-wider text-dark-textMuted">
              <span className="text-ufc-red font-bold">Evloev</span>
              <span className="text-blue-400 font-bold">Murphy</span>
            </div>

            <StatBar
              label="Sig Strikes/min"
              valueA={3.99}
              valueB={4.48}
              maxVal={6}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => v.toFixed(2)}
              note="Murphy conecta mais strikes por minuto. Vantagem no striking puro."
            />
            <StatBar
              label="Strike Accuracy"
              valueA={48}
              valueB={54}
              maxVal={100}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => `${v}%`}
              note="Murphy e mais preciso. 6 pontos percentuais de diferenca."
            />
            <StatBar
              label="Strikes Absorvidos/min"
              valueA={2.66}
              valueB={2.51}
              maxVal={6}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => v.toFixed(2)}
              reverseWinner
            />
            <StatBar
              label="Strike Defense"
              valueA={61}
              valueB={62}
              maxVal={100}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => `${v}%`}
              note="Praticamente identicos em defesa de strikes. Paridade."
            />
            <StatBar
              label="TD Average/15min"
              valueA={4.67}
              valueB={1.41}
              maxVal={6}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => v.toFixed(2)}
              note="Evloev tenta 3.3x MAIS takedowns. A estatistica mais importante da luta."
            />
            <StatBar
              label="TD Accuracy"
              valueA={48}
              valueB={54}
              maxVal={100}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => `${v}%`}
            />
            <StatBar
              label="TD Defense"
              valueA={61}
              valueB={51}
              maxVal={100}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => `${v}%`}
              note="Murphy defende apenas 51% dos takedowns. Contra Evloev que tenta 4.67/15min, isso e CRITICO."
            />
            <StatBar
              label="Sub Average/15min"
              valueA={0.22}
              valueB={0.54}
              maxVal={2}
              nameA="Evloev"
              nameB="Murphy"
              format={(v) => v.toFixed(2)}
            />
          </div>

          <div className="mt-8 rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
            <h3 className="mb-6 font-display text-xl uppercase text-dark-text text-center">
              Tale of the <span className="text-ufc-red">Tape</span>
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Altura', a: '5\'7" (170cm)', b: '5\'9" (175cm)', note: 'Murphy +2"' },
                { label: 'Alcance', a: '72.5" (184cm)', b: '73.5" (187cm)', note: 'Murphy +1"' },
                { label: 'Leg Reach', a: '36" (91cm)', b: '39" (99cm)', note: 'Murphy +3"' },
                { label: 'Idade', a: '32 anos', b: '34 anos', note: null },
                { label: 'Stance', a: 'Freestyle (Switch)', b: 'Ortodoxo (Kickboxer)', note: null },
                { label: 'Gym', a: 'American Top Team (FL)', b: 'Manchester Top Team (UK)', note: null },
              ].map((row, i) => (
                <div key={i} className="flex items-center border-b border-dark-border/30 pb-3">
                  <div className="flex-1 text-right">
                    <span className="text-sm font-semibold text-dark-text">{row.a}</span>
                  </div>
                  <div className="mx-4 w-32 text-center">
                    <span className="text-xs uppercase tracking-wider text-dark-textMuted">{row.label}</span>
                    {row.note && (
                      <p className="text-[10px] text-ufc-gold">{row.note}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-dark-text">{row.b}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: PERFIL DE HABILIDADES
            ============================================================ */}
        <section>
          <SectionHeader number="06" title="Perfil de" accent="Habilidades" />

          <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
            <div className="mb-6 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded-full bg-ufc-red" />
                <span className="text-dark-textMuted">Evloev</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded-full bg-blue-400" />
                <span className="text-dark-textMuted">Murphy</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <SkillBar label="Striking" valueA={62} valueB={82} />
                <SkillBar label="Volume" valueA={72} valueB={78} />
                <SkillBar label="Grappling" valueA={92} valueB={55} />
              </div>
              <div>
                <SkillBar label="Cardio" valueA={80} valueB={78} />
                <SkillBar label="Defense" valueA={78} valueB={70} />
                <SkillBar label="Finishing" valueA={35} valueB={75} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-lg bg-dark-bg p-4">
                <p className="font-display text-2xl text-ufc-red">419</p>
                <p className="text-xs text-dark-textMuted">Evloev Total Score</p>
              </div>
              <div className="rounded-lg bg-dark-bg p-4">
                <p className="font-display text-2xl text-blue-400">438</p>
                <p className="text-xs text-dark-textMuted">Murphy Total Score</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 8: DISTRIBUICAO DE VITORIAS
            ============================================================ */}
        <section>
          <SectionHeader number="07" title="Distribuicao de" accent="Vitorias" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="mb-4 font-display text-lg uppercase text-ufc-red">Evloev (19W)</h3>

              <div className="mb-4 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">KO/TKO</span>
                    <span className="font-bold text-ufc-red">3 (16%)</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-ufc-red" style={{ width: '16%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">Submissao</span>
                    <span className="font-bold text-purple-400">4 (21%)</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-purple-400" style={{ width: '21%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">Decisao</span>
                    <span className="font-bold text-ufc-gold">12 (63%)</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-ufc-gold" style={{ width: '63%' }} />
                  </div>
                </div>
              </div>

              <div className="flex h-6 overflow-hidden rounded-full">
                <div className="bg-ufc-red" style={{ width: '16%' }} />
                <div className="bg-purple-400" style={{ width: '21%' }} />
                <div className="bg-ufc-gold" style={{ width: '63%' }} />
              </div>
            </div>

            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="mb-4 font-display text-lg uppercase text-blue-400">Murphy (17W)</h3>

              <div className="mb-4 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">KO/TKO</span>
                    <span className="font-bold text-ufc-red">8 (47%)</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-ufc-red" style={{ width: '47%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">Submissao</span>
                    <span className="font-bold text-purple-400">2 (12%)</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-purple-400" style={{ width: '12%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">Decisao</span>
                    <span className="font-bold text-ufc-gold">7 (41%)</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-ufc-gold" style={{ width: '41%' }} />
                  </div>
                </div>
              </div>

              <div className="flex h-6 overflow-hidden rounded-full">
                <div className="bg-ufc-red" style={{ width: '47%' }} />
                <div className="bg-purple-400" style={{ width: '12%' }} />
                <div className="bg-ufc-gold" style={{ width: '41%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-dark-border bg-dark-card p-5">
            <div className="flex items-start gap-3">
              <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-ufc-gold" />
              <p className="text-sm text-dark-textMuted">
                <span className="font-bold text-dark-text">Insight:</span> Evloev vence 63% das lutas por decisao e TODAS as 9 lutas do UFC foram por decisao. Nenhum finish no octagon. Murphy tem 47% de KOs e 7 finalizacoes no primeiro round. Se Murphy nao for derrubado, tem poder pra nocautear. Se Evloev levar ao chao, vai ser uma longa noite pra Murphy.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 9: DANGER ZONES
            ============================================================ */}
        <section>
          <SectionHeader number="08" title="Danger" accent="Zones" />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl text-red-400">R1-R2</span>
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400">PERIGO 8/10</span>
              </div>
              <h4 className="mb-3 font-display text-sm uppercase tracking-wider text-red-400">
                Zona Explosiva do Murphy
              </h4>
              <p className="text-sm text-dark-textMuted">
                Murphy e mais perigoso nos rounds iniciais. 7 das suas finalizacoes vieram no R1. O spinning back elbow no Pico, o KO do Amirkhani: tudo no inicio. Se Murphy conectar um golpe limpo antes de Evloev impor o ritmo de wrestling, pode acabar rapido. Evloev precisa sobreviver o striking inicial e impor o clinch.
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-dark-bg">
                <div className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="rounded-lg border border-ufc-gold/30 bg-ufc-gold/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl text-ufc-gold">R3</span>
                <span className="rounded-full bg-ufc-gold/20 px-3 py-1 text-xs font-bold text-ufc-gold">PIVO 7/10</span>
              </div>
              <h4 className="mb-3 font-display text-sm uppercase tracking-wider text-ufc-gold">
                O Round Que Define Tudo
              </h4>
              <p className="text-sm text-dark-textMuted">
                Se Evloev ja estabeleceu o wrestling nos dois primeiros, R3 e onde Murphy comeca a se cansar da luta no chao. Se Murphy manteve a luta em pe, R3 e onde Evloev comeca a questionar se consegue derrubar. Este round define se vai ser uma decisao de controle (Evloev) ou um finish (Murphy).
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-dark-bg">
                <div className="h-full rounded-full bg-gradient-to-r from-ufc-gold to-yellow-400" style={{ width: '70%' }} />
              </div>
            </div>

            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl text-green-400">R4-R5</span>
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400">EVLOEV 8/10</span>
              </div>
              <h4 className="mb-3 font-display text-sm uppercase tracking-wider text-green-400">
                Territory do Wrestler
              </h4>
              <p className="text-sm text-dark-textMuted">
                Se a luta chegar aqui, favorece Evloev. Seu cardio e construido pra 5 rounds e o wrestling acumulativo drena a energia de qualquer striker. Murphy nunca lutou contra um wrestler desse calibre por 5 rounds. A preocupacao: o virus de 2025 comprometeu o cardio de Evloev? Se sim, estes rounds mudam completamente.
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-dark-bg">
                <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 10: INTANGIVEIS & RED FLAGS
            ============================================================ */}
        <section>
          <SectionHeader number="09" title="Intangiveis &" accent="Red Flags" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                icon: AlertTriangle,
                title: 'Virus Misterioso',
                fighter: 'Evloev',
                risk: 'RISCO ALTO',
                riskColor: 'text-red-400 bg-red-500/10 border-red-500/30',
                desc: 'Um virus em 2025 devastou o sistema cardiovascular de Evloev. Ficou meses sem treinar. Temeu que sua carreira tivesse acabado. Ninguem sabe se o cardio voltou ao nivel anterior.',
              },
              {
                icon: Clock,
                title: 'Layoff 15 Meses',
                fighter: 'Evloev',
                risk: 'RISCO ALTO',
                riskColor: 'text-red-400 bg-red-500/10 border-red-500/30',
                desc: 'Ultima luta em dezembro de 2024. 15 meses e muito tempo longe do octagon. Ring rust e real, especialmente contra um oponente invicto e ativo.',
              },
              {
                icon: Zap,
                title: 'Quase Finalizado por Ige',
                fighter: 'Murphy',
                risk: 'RISCO MEDIO',
                riskColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
                desc: 'Dan Ige quase finalizou Murphy no R1 do UFC 308. Se um lutador fora do top 10 quase nocauteou Murphy, o que Evloev pode fazer no clinch?',
              },
              {
                icon: MapPin,
                title: 'Fator Casa',
                fighter: 'Murphy',
                risk: 'POSITIVO',
                riskColor: 'text-green-400 bg-green-500/10 border-green-500/30',
                desc: 'Murphy luta em Londres, na Inglaterra. A torcida britanica sera esmagadora. Historicamente, lutadores UK performam melhor em casa no O2 Arena.',
              },
              {
                icon: Brain,
                title: 'Mentalidade do Sobrevivente',
                fighter: 'Murphy',
                risk: 'POSITIVO',
                riskColor: 'text-green-400 bg-green-500/10 border-green-500/30',
                desc: 'Sobreviveu a um tiro na cabeca aos 18 anos. O apelido "The Miracle" nao e marketing. Essa mentalidade de sobrevivente pode ser decisiva em momentos de pressao.',
              },
              {
                icon: Shield,
                title: 'Nenhum Finish no UFC',
                fighter: 'Evloev',
                risk: 'RISCO MEDIO',
                riskColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
                desc: '9 lutas no UFC, 9 decisoes. Evloev nunca finalizou ninguem no octagon. Contra Murphy, pode precisar de 5 rounds completos de dominancia.',
              },
              {
                icon: TrendingUp,
                title: 'TDD Vulneravel',
                fighter: 'Murphy',
                risk: 'RISCO ALTO',
                riskColor: 'text-red-400 bg-red-500/10 border-red-500/30',
                desc: '51% de defesa de takedown e preocupante contra alguem que tenta 4.67 TDs/15min. Se nao melhorou o TDD, Evloev vai controlar a luta no chao.',
              },
              {
                icon: Activity,
                title: 'KO do Ano no Bolso',
                fighter: 'Murphy',
                risk: 'POSITIVO',
                riskColor: 'text-green-400 bg-green-500/10 border-green-500/30',
                desc: 'O spinning back elbow no Pico deu confianca maxima. Murphy chega no pico (sem trocadilho) da carreira. Confianca e uma arma perigosa.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`rounded-lg border p-5 ${item.riskColor}`}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase">{item.risk}</span>
                  </div>
                  <h4 className="mb-1 font-display text-sm uppercase text-dark-text">{item.title}</h4>
                  <p className="mb-2 text-[10px] uppercase tracking-wider text-dark-textMuted">{item.fighter}</p>
                  <p className="text-xs text-dark-textMuted">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 11: CAMINHOS PARA VITORIA
            ============================================================ */}
        <section>
          <SectionHeader number="10" title="Caminhos Para" accent="Vitoria" />

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-ufc-red" />
                <h3 className="font-display text-lg uppercase text-ufc-red">Evloev: 55% Total</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: 'Cobertor Molhado',
                    prob: 30,
                    method: 'UD Dominante',
                    desc: 'Wrestling sufocante por 5 rounds. Takedowns repetidos, controle do top, cotoveladas do ground-and-pound. Drena a energia do Murphy e vence por pontos com dominio esmagador.',
                  },
                  {
                    name: 'Clinch Contra a Grade',
                    prob: 12,
                    method: 'UD Apertada',
                    desc: 'Se nao conseguir takedowns limpos, Evloev pode usar o clinch contra a cerca pra neutralizar o striking do Murphy. Vence rounds por controle, nao por dano.',
                  },
                  {
                    name: 'Ground-and-Pound Pesado',
                    prob: 8,
                    method: 'TKO R3-5',
                    desc: 'Acumula dano do top position ate o referee parar. Improvavel dado o historico (0 finishes no UFC), mas contra um Murphy cansado de defender takedowns por 3 rounds, possivel.',
                  },
                  {
                    name: 'Submissao Oportunista',
                    prob: 5,
                    method: 'Sub R2-4',
                    desc: 'Pega uma guilhotina ou arm-triangle durante transicao. Evloev tem 4 subs na carreira. Possivel se Murphy ficar descuidado tentando se levantar.',
                  },
                ].map((scenario, i) => (
                  <div key={i} className="rounded-lg border border-ufc-red/20 bg-dark-card p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-display text-sm uppercase text-ufc-red">{scenario.name}</h4>
                      <span className="rounded-full bg-ufc-red/20 px-3 py-1 text-xs font-bold text-ufc-red">{scenario.prob}%</span>
                    </div>
                    <p className="mb-1 text-xs font-semibold text-dark-text">{scenario.method}</p>
                    <p className="text-xs text-dark-textMuted">{scenario.desc}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dark-bg">
                      <div className="h-full rounded-full bg-ufc-red" style={{ width: `${scenario.prob}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-blue-400" />
                <h3 className="font-display text-lg uppercase text-blue-400">Murphy: 42% Total</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: 'Flash KO Precoce',
                    prob: 18,
                    method: 'KO R1-2',
                    desc: 'Conecta um golpe limpo nos primeiros rounds antes de Evloev impor o wrestling. Spinning back elbow, overhand, uppercut no clinch break. Murphy tem poder pra apagar qualquer um.',
                  },
                  {
                    name: 'Anti-Wrestling Perfeito',
                    prob: 12,
                    method: 'UD ou TKO R4-5',
                    desc: 'Defende takedowns, usa footwork e distancia, castiga Evloev com strikes a distancia. Se Murphy neutralizar o wrestling, vence por pontos ou para no final.',
                  },
                  {
                    name: 'Counter no Clinch',
                    prob: 8,
                    method: 'KO R2-3',
                    desc: 'Quando Evloev avanca pro clinch/takedown, Murphy pega com uma joelhada, uppercut ou cotovelo. Transicao ofensiva no momento que Evloev esta vulneravel.',
                  },
                  {
                    name: 'Cardio Advantage',
                    prob: 4,
                    method: 'TKO R4-5',
                    desc: 'Se o virus realmente comprometeu o cardio de Evloev, Murphy pode ser o mais fresco nos rounds finais. Improvavel contra Evloev saudavel, mas possivel dado o historico medico.',
                  },
                ].map((scenario, i) => (
                  <div key={i} className="rounded-lg border border-blue-400/20 bg-dark-card p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-display text-sm uppercase text-blue-400">{scenario.name}</h4>
                      <span className="rounded-full bg-blue-400/20 px-3 py-1 text-xs font-bold text-blue-400">{scenario.prob}%</span>
                    </div>
                    <p className="mb-1 text-xs font-semibold text-dark-text">{scenario.method}</p>
                    <p className="text-xs text-dark-textMuted">{scenario.desc}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dark-bg">
                      <div className="h-full rounded-full bg-blue-400" style={{ width: `${scenario.prob}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 12: PREVISAO FINAL
            ============================================================ */}
        <section>
          <SectionHeader number="11" title="Previsao" accent="Final" />

          <div className="rounded-xl border-2 border-ufc-red/30 bg-gradient-to-br from-dark-card via-dark-card to-ufc-red/5 p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-2">Previsao</p>
              <h3 className="font-display text-5xl uppercase text-ufc-red md:text-6xl">Movsar Evloev</h3>
              <p className="mt-3 font-display text-2xl uppercase text-ufc-gold">Decisao Unanime</p>
            </div>

            <div className="mx-auto max-w-md mb-8">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-dark-textMuted">Confianca</span>
                <span className="font-bold text-ufc-gold">MEDIA (6/10)</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-4 flex-1 rounded-sm ${i < 6 ? 'bg-ufc-gold' : 'bg-dark-border'}`}
                  />
                ))}
              </div>
            </div>

            <div className="mx-auto max-w-3xl mb-8">
              <p className="text-sm leading-relaxed text-dark-textMuted">
                A matematica favorece Evloev. Ele tem 4.67 takedowns por 15 minutos contra uma defesa de apenas 51%. Historicamente, wrestlers dagestaneses com esse nivel de controle sufocam strikers. Evloev ja provou que pode neutralizar ex-campeoes (Sterling) e top 5s (Allen) com seu estilo. O cenario mais provavel: Evloev usa os primeiros minutos pra fechar a distancia, consegue o primeiro takedown no R1, e passa o resto da luta controlando de cima, acumulando pontos e drenando a energia do Murphy. A confianca e MEDIA porque o layoff de 15 meses e o virus sao incognitas enormes. Se o cardio de Evloev estiver comprometido, Murphy tem todas as ferramentas pra vencer em pe.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <div className="rounded-lg border border-ufc-gold/30 bg-ufc-gold/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-ufc-gold" />
                  <h4 className="font-display text-sm uppercase text-ufc-gold">X-Factor</h4>
                </div>
                <p className="text-sm text-dark-textMuted">
                  O cardio de Evloev pos-virus. Se voltou ao nivel anterior, e uma vitoria confortavel. Se nao, Murphy nocauteia um Evloev cansado nos rounds finais.
                </p>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h4 className="font-display text-sm uppercase text-red-400">Upset Alert</h4>
                </div>
                <p className="text-sm text-dark-textMuted">
                  Murphy conecta um golpe de poder nos primeiros 2 rounds, antes de Evloev impor o wrestling. O spinning back elbow, um uppercut no clinch break, ou um counter na entrada do takedown. Se Murphy acertar, tem nocaute pra finalizar.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-md">
              <h4 className="mb-4 text-center font-display text-sm uppercase tracking-wider text-dark-textMuted">
                Probabilidades
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-ufc-red">Evloev</span>
                    <span className="font-bold text-ufc-red">55%</span>
                  </div>
                  <div className="h-5 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-ufc-red" style={{ width: '55%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-blue-400">Murphy</span>
                    <span className="font-bold text-blue-400">42%</span>
                  </div>
                  <div className="h-5 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-blue-400" style={{ width: '42%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-dark-textMuted">Draw/NC</span>
                    <span className="font-bold text-dark-textMuted">3%</span>
                  </div>
                  <div className="h-5 overflow-hidden rounded-full bg-dark-bg">
                    <div className="h-full rounded-full bg-dark-textMuted" style={{ width: '3%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 13: O QUE OBSERVAR
            ============================================================ */}
        <section>
          <SectionHeader number="12" title="O Que" accent="Observar" />

          <div className="space-y-4">
            {[
              {
                num: 1,
                title: 'O Primeiro Takedown',
                icon: Target,
                desc: 'Quando e como Evloev tenta o primeiro takedown define TUDO. Se conseguir no R1, o tom esta dado: vai ser uma longa noite de wrestling. Se Murphy defender e contra-atacar, a confianca muda e o fator casa entra em jogo. Fique de olho no timing da primeira tentativa.',
              },
              {
                num: 2,
                title: 'O Cardio de Evloev nos R3-R5',
                icon: Activity,
                desc: 'O virus de 2025 devastou o sistema cardiovascular de Evloev. Ele diz que esta recuperado. Mas so a luta vai provar. Se no R3 Evloev comecar a desacelerar as tentativas de takedown ou ficar parado no clinch, significa que o virus deixou marcas. Se estiver fresco? Murphy tem um problema serio.',
              },
              {
                num: 3,
                title: 'TDD do Murphy Sob Pressao',
                icon: Shield,
                desc: '51% de defesa de takedown e a estatistica mais preocupante pra Murphy. Mas numeros de carreira podem enganar. Se Murphy treinou especificamente pra neutralizar o wrestling dagestaneso (hip escapes, underhooks, sprawl), pode surpreender. Os primeiros 2 takedown attempts dizem tudo.',
              },
              {
                num: 4,
                title: 'A Torcida do O2 Arena',
                icon: MapPin,
                desc: 'Lutadores britanicos performam excepcionalmente no O2 Arena. A energia da torcida pode dar a Murphy aquele 5% extra de adrenalina que faz a diferenca numa luta apertada. Se Murphy estiver perdendo nos pontos, a torcida pode motivar um finish desesperado nos rounds finais.',
              },
              {
                num: 5,
                title: 'O Poder do Murphy nos Momentos de Transicao',
                icon: Zap,
                desc: 'Os momentos mais perigosos pra Evloev nao sao no striking puro, mas nas transicoes: quando se levanta de um takedown, quando quebra o clinch, quando avanca para fechar distancia. Sao nessas fracoes de segundo que Murphy pode conectar o golpe que muda tudo. O cotovelo no Pico veio exatamente numa transicao.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.num} className="flex gap-4 rounded-lg border border-dark-border bg-dark-card p-5 md:p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ufc-red/10">
                      <span className="font-display text-xl text-ufc-red">{item.num}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-ufc-gold" />
                      <h4 className="font-display text-sm uppercase text-dark-text">{item.title}</h4>
                    </div>
                    <p className="text-sm text-dark-textMuted">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 14: CREATOR KIT
            ============================================================ */}
        <section>
          <SectionHeader number="13" title="Creator" accent="Kit" />

          <div className="mb-6 flex gap-2">
            {[
              { id: 'instagram' as const, label: 'Instagram Cards', icon: Instagram },
              { id: 'twitter' as const, label: 'Twitter Thread', icon: Twitter },
              { id: 'video' as const, label: 'Video Script', icon: Video },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCreatorTab(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    creatorTab === tab.id
                      ? 'bg-ufc-red text-white'
                      : 'bg-dark-card text-dark-textMuted hover:text-dark-text border border-dark-border'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
            {creatorTab === 'instagram' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg uppercase text-dark-text">Instagram Cards</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-gradient-to-br from-ufc-red/20 to-dark-bg border border-ufc-red/30 p-5">
                    <p className="font-display text-lg uppercase text-ufc-red mb-2">SLIDE 1</p>
                    <p className="text-sm text-dark-text font-bold mb-2">EVLOEV vs MURPHY</p>
                    <p className="text-xs text-dark-textMuted">
                      UFC Fight Night 270 | 21 de Marco | O2 Arena, Londres{'\n\n'}
                      Dois invictos. Uma vaga pro titulo.{'\n\n'}
                      Evloev: 19-0. #1 do ranking. Wrestler perfeito.{'\n\n'}
                      Murphy: 17-0-1. #3 do ranking. Nocaute do ano no bolso.{'\n\n'}
                      Um deles vai perder o invicto. Quem sera?
                    </p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-blue-400/20 to-dark-bg border border-blue-400/30 p-5">
                    <p className="font-display text-lg uppercase text-blue-400 mb-2">SLIDE 2</p>
                    <p className="text-sm text-dark-text font-bold mb-2">O NUMERO QUE DEFINE TUDO</p>
                    <p className="text-xs text-dark-textMuted">
                      Evloev tenta 4.67 takedowns a cada 15 minutos.{'\n\n'}
                      Murphy defende apenas 51% dos takedowns.{'\n\n'}
                      Faca as contas.{'\n\n'}
                      MAS Murphy tem 8 KOs e conecta 4.48 strikes/min.{'\n\n'}
                      Se ficar em pe: vantagem Murphy.{'\n'}
                      Se for ao chao: vantagem Evloev.{'\n\n'}
                      Onde a luta acontece decide tudo.
                    </p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-ufc-gold/20 to-dark-bg border border-ufc-gold/30 p-5">
                    <p className="font-display text-lg uppercase text-ufc-gold mb-2">SLIDE 3</p>
                    <p className="text-sm text-dark-text font-bold mb-2">PREVISAO</p>
                    <p className="text-xs text-dark-textMuted">
                      Evloev por decisao unanime.{'\n\n'}
                      Wrestling sufoca. Controle domina.{'\n\n'}
                      55% Evloev | 42% Murphy | 3% Draw{'\n\n'}
                      Confianca: 6/10 (Media){'\n\n'}
                      X-Factor: O cardio de Evloev pos-virus.{'\n'}
                      Upset: Murphy KO nos primeiros 2 rounds.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {creatorTab === 'twitter' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg uppercase text-dark-text">Twitter Thread (6 tweets)</h3>
                <div className="space-y-4">
                  {[
                    {
                      num: '1/6',
                      text: 'EVLOEV vs MURPHY: A analise completa.\n\nDois invictos. Uma vaga pro titulo dos penas. O2 Arena, Londres.\n\n19-0 vs 17-0-1. Wrestler vs Striker. Russia vs Inglaterra.\n\nThread com TUDO que voce precisa saber sobre a luta mais importante dos penas em 2026:',
                    },
                    {
                      num: '2/6',
                      text: 'A ESTATISTICA QUE DEFINE TUDO:\n\nEvloev tenta 4.67 takedowns a cada 15 min.\nMurphy defende apenas 51%.\n\nIsso significa que Evloev provavelmente derruba Murphy pelo menos 2x por round.\n\nMAS Murphy conecta 4.48 strikes/min com 54% de precisao. Se ficar em pe, e outra historia.',
                    },
                    {
                      num: '3/6',
                      text: 'O TESTE DAN IGE (oponente em comum):\n\nEvloev DOMINOU Ige. 30-26 em um cartao.\n\nMurphy quase PERDEU pra Ige. Quase nocauteado no R1. Venceu 29-28.\n\nA diferenca de performance contra o mesmo oponente e GRITANTE.',
                    },
                    {
                      num: '4/6',
                      text: 'O ELEFANTE NA SALA:\n\nEvloev ficou 15 meses parado. Um virus em 2025 quase encerrou sua carreira. Ficou meses sem conseguir treinar.\n\nEle diz que esta recuperado. Mas so a luta vai provar.\n\nSe o cardio nao voltou, Murphy nocauteia nos rounds finais.',
                    },
                    {
                      num: '5/6',
                      text: 'DANGER ZONES:\n\nR1-R2: PERIGO MURPHY. 7 das finalizacoes dele vieram no R1. Spinning back elbow no Pico. Poder explosivo.\n\nR3: ROUND PIVO. Define se e wrestling ou striking fight.\n\nR4-R5: TERRITORY EVLOEV (se o cardio aguentar).',
                    },
                    {
                      num: '6/6',
                      text: 'PREVISAO FINAL:\n\nEvloev por Decisao Unanime.\n\n55% Evloev | 42% Murphy | 3% Draw\nConfianca: 6/10 (media por causa do layoff)\n\nX-Factor: Cardio de Evloev pos-virus.\nUpset: Murphy KO no R1-2.\n\nDeixa teu palpite nos comments.',
                    },
                  ].map((tweet) => (
                    <div key={tweet.num} className="rounded-lg border border-dark-border bg-dark-bg p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-bold text-blue-400">{tweet.num}</span>
                      </div>
                      <p className="text-sm text-dark-textMuted whitespace-pre-line">{tweet.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {creatorTab === 'video' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg uppercase text-dark-text">Video Script (60 segundos)</h3>
                <div className="space-y-4">
                  {[
                    {
                      time: '0-10s',
                      title: 'Hook',
                      text: '"Dois invictos entram, so um sai com o invicto intacto. Evloev, 19-0, o wrestler perfeito. Murphy, 17-0-1, o cara que sobreviveu a um tiro na cabeca e agora tem o nocaute do ano. No O2 Arena, em Londres, o vencedor desafia Volkanovski. Aqui esta TUDO que voce precisa saber."',
                    },
                    {
                      time: '10-25s',
                      title: 'A Dinamica',
                      text: '"Evloev tenta quase 5 takedowns a cada 15 minutos. Murphy defende apenas metade. Faca as contas. Se essa luta for ao chao, Evloev domina. MAS, se Murphy defender e manter em pe, ele conecta 4 strikes e meio por minuto com 54% de precisao. E tem 8 KOs na carreira, incluindo o spinning back elbow insano no Pico."',
                    },
                    {
                      time: '25-40s',
                      title: 'O Elefante na Sala',
                      text: '"Mas tem uma incognita enorme: Evloev ficou 15 meses parado. Um virus em 2025 quase acabou com a carreira dele. Ele diz que voltou 100%. Mas contra o mesmo Dan Ige, Evloev DOMINOU com um 30-26. Murphy quase PERDEU, quase nocauteado no primeiro round. A diferenca e real."',
                    },
                    {
                      time: '40-50s',
                      title: 'Danger Zones',
                      text: '"Rounds 1 e 2 sao o territorio do Murphy. E onde ele finaliza. Se passar? Rounds 4 e 5 sao do Evloev. O wrestling acumulativo drena. A questao e: o cardio de Evloev aguentou o virus?"',
                    },
                    {
                      time: '50-60s',
                      title: 'Previsao + CTA',
                      text: '"Minha previsao: Evloev por decisao. Wrestling sufoca. 55% Evloev, 42% Murphy. Confianca media por causa do layoff. Mas se Murphy acertar nos primeiros rounds, pode ser o upset da noite. Concorda? Comenta ai. Salva pra assistir depois da luta."',
                    },
                  ].map((section) => (
                    <div key={section.time} className="rounded-lg border border-dark-border bg-dark-bg p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded bg-ufc-red/20 px-2 py-1 text-xs font-bold text-ufc-red">{section.time}</span>
                        <span className="font-display text-sm uppercase text-dark-text">{section.title}</span>
                      </div>
                      <p className="text-sm italic text-dark-textMuted">{section.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            FOOTER DISCLAIMER
            ============================================================ */}
        <div className="mt-12 rounded-lg border border-dark-border bg-dark-bg p-6 text-center">
          <p className="text-xs text-dark-textMuted">
            <span className="font-bold text-ufc-gold">UFC NEWS HUB</span> | Analise estatistica e tatica.
            Dados baseados em ufcstats.com, ufc.com e fontes publicas.
          </p>
          <p className="mt-2 text-[10px] text-dark-textMuted">
            Evloev vs Murphy | UFC Fight Night 270 | 21 de Marco, 2026 | The O2 Arena, Londres
          </p>
        </div>
      </div>
    </div>
  );
}
