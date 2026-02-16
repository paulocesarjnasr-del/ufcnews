'use client';

import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { TacticalBreakdown } from '@/components/houston/TacticalBreakdown';
import { FightPrediction } from '@/components/houston/FightPrediction';

export default function HoustonPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <span className="text-dark-text">UFC Houston</span>
        </div>

        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-xl border border-dark-border bg-gradient-to-r from-dark-card via-dark-bg to-dark-card p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,10,10,0.15),transparent_70%)]" />
          <div className="relative z-10 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-ufc-red">
              UFC Fight Night • 21 de Fevereiro, 2026 • Houston, TX
            </p>
            <h1 className="font-display text-4xl uppercase text-dark-text md:text-6xl lg:text-7xl">
              <span className="text-ufc-red">Strickland</span> vs{' '}
              <span className="text-blue-400">Hernandez</span>
            </h1>
            <p className="mt-4 text-lg text-dark-textMuted">
              Middleweight Main Event • Toyota Center
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <span className="rounded-full bg-ufc-red/20 px-4 py-2 text-sm font-bold text-ufc-red">
                5 Rounds
              </span>
              <span className="rounded-full bg-dark-border px-4 py-2 text-sm text-dark-textMuted">
                ESPN / ESPN+
              </span>
            </div>
          </div>
        </div>

        {/* Fight Card Info */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Strickland Card */}
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ufc-red bg-dark-border text-2xl font-bold text-dark-text">
                SS
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ufc-red">"Tarzan"</p>
                <h2 className="font-display text-2xl uppercase text-dark-text">Sean Strickland</h2>
                <p className="text-sm text-dark-textMuted">🇺🇸 Anaheim, California</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-dark-text">29-7</p>
                <p className="text-xs text-dark-textMuted">Record</p>
              </div>
              <div>
                <p className="font-display text-2xl text-ufc-red">#2</p>
                <p className="text-xs text-dark-textMuted">MW Ranking</p>
              </div>
              <div>
                <p className="font-display text-2xl text-dark-text">6'1"</p>
                <p className="text-xs text-dark-textMuted">Altura</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <StatBar label="Sig. Strikes/min" value={5.95} max={8} color="red" />
              <StatBar label="Strike Accuracy" value={42} max={100} suffix="%" color="red" />
              <StatBar label="Strike Defense" value={60} max={100} suffix="%" color="red" />
              <StatBar label="TD Defense" value={76} max={100} suffix="%" color="red" />
            </div>
            <div className="mt-4 rounded bg-dark-bg p-3">
              <p className="text-xs text-dark-textMuted mb-1">Ultimas 5 Lutas</p>
              <div className="flex gap-1">
                {['L', 'W', 'L', 'W', 'W'].map((r, i) => (
                  <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-xs font-bold ${
                    r === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>{r}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-dark-textMuted space-y-1">
                <p>❌ L - Du Plessis (UD) UFC 312</p>
                <p>✅ W - Costa (SD) UFC 302</p>
                <p>❌ L - Du Plessis (SD) UFC 297</p>
                <p>✅ W - Adesanya (UD) UFC 293</p>
                <p>✅ W - Magomedov (TKO R2) UFC on ESPN</p>
              </div>
            </div>
          </div>

          {/* Hernandez Card */}
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-400 bg-dark-border text-2xl font-bold text-dark-text">
                AH
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-blue-400">"Fluffy"</p>
                <h2 className="font-display text-2xl uppercase text-dark-text">Anthony Hernandez</h2>
                <p className="text-sm text-dark-textMuted">🇺🇸 Oakland, California</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-dark-text">15-2</p>
                <p className="text-xs text-dark-textMuted">Record (UFC)</p>
              </div>
              <div>
                <p className="font-display text-2xl text-blue-400">#5</p>
                <p className="text-xs text-dark-textMuted">MW Ranking</p>
              </div>
              <div>
                <p className="font-display text-2xl text-dark-text">6'0"</p>
                <p className="text-xs text-dark-textMuted">Altura</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <StatBar label="Sig. Strikes/min" value={4.59} max={8} color="blue" />
              <StatBar label="Strike Accuracy" value={62} max={100} suffix="%" color="blue" />
              <StatBar label="Strike Defense" value={49} max={100} suffix="%" color="blue" />
              <StatBar label="TD Average/15min" value={6.46} max={10} color="blue" />
            </div>
            <div className="mt-4 rounded bg-dark-bg p-3">
              <p className="text-xs text-dark-textMuted mb-1">Ultimas 5 Lutas</p>
              <div className="flex gap-1">
                {['W', 'W', 'W', 'W', 'W'].map((r, i) => (
                  <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-xs font-bold ${
                    r === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>{r}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-dark-textMuted space-y-1">
                <p>✅ W - Dolidze (SUB R4) UFC on ESPN</p>
                <p>✅ W - Allen (UD) UFC FN</p>
                <p>✅ W - Pereira (TKO R5) UFC FN</p>
                <p>✅ W - Kopylov (SUB R2) UFC 298</p>
                <p>✅ W - Shahbazyan (TKO R3) UFC FN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="mx-auto mb-12 max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded bg-category-lutas/20 px-2 py-1 text-xs font-bold uppercase tracking-wider text-category-lutas">
              Lutas
            </span>
            <span className="text-sm text-dark-textMuted">13 de Fevereiro, 2026</span>
          </div>

          <h2 className="mb-6 font-display text-3xl uppercase leading-tight text-dark-text md:text-4xl">
            UFC Houston: Strickland Busca Redenção Contra Hernandez em Ascensão Meteórica
          </h2>

          <div className="prose prose-invert max-w-none space-y-4 text-lg leading-relaxed text-dark-text">
            <p>
              O UFC retorna a Houston no dia 21 de fevereiro com um main event que coloca frente a frente dois momentos 
              completamente distintos na divisão dos médios: <strong>Sean Strickland</strong>, o ex-campeão buscando 
              recuperar seu lugar entre a elite, contra <strong>Anthony "Fluffy" Hernandez</strong>, o homem mais quente 
              do middleweight com uma sequência de 8 vitórias consecutivas.
            </p>
            <p>
              Strickland (29-7) vem de uma derrota por decisão unânime para Dricus du Plessis no UFC 312, sua segunda 
              derrota para o sul-africano. Apesar do revés, Strickland demonstrou que ainda é um dos lutadores mais 
              perigosos da divisão, com seu volume de striking incansável e pressão constante. O ex-campeão precisa 
              de uma vitória dominante para se manter na conversa por uma terceira luta pelo título.
            </p>
            <p>
              Do outro lado, Hernandez (15-2 no UFC) está vivendo o melhor momento de sua carreira. Com 8 vitórias 
              consecutivas, incluindo finalizações sobre Roman Dolidze e Roman Kopylov, e um impressionante TKO sobre 
              Michel Pereira no quinto round, "Fluffy" provou que pertence ao topo da divisão. Sua vitória por decisão 
              unânime sobre Brendan Allen em fevereiro de 2025 foi particularmente significativa, mostrando que pode 
              vencer lutadores de elite mesmo quando a luta vai para os juízes.
            </p>
            <p>
              Este confronto é um teste definitivo para ambos: para Strickland, é a chance de provar que ainda pode 
              dominar contenders de alto nível; para Hernandez, é a oportunidade de catapultar-se para uma disputa de 
              título com uma vitória sobre um ex-campeão.
            </p>
            <p>
              A dinâmica estilística promete um combate fascinante. Strickland é um dos melhores boxeadores do MMA, 
              com volume extraordinário e uma defesa de takedown sólida. Hernandez, por sua vez, é um finalizador nato 
              com 9 finalizações na carreira, mas também demonstrou evolução significativa no striking, como evidenciado 
              pelo TKO sobre Pereira.
            </p>
            <p>
              O Toyota Center em Houston será o palco para o que promete ser uma das melhores lutas do primeiro 
              semestre de 2026. Com implicações diretas no ranking dos médios e potencialmente na próxima disputa 
              de título, este é um card imperdível para qualquer fã do UFC.
            </p>
          </div>
        </article>

        {/* Tactical Breakdown */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
            🔬 Análise <span className="text-ufc-red">Tática</span>
          </h2>
          <TacticalBreakdown />
        </section>

        {/* Prediction */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
            🎯 Previsão <span className="text-ufc-red">Data-Driven</span>
          </h2>
          <FightPrediction />
        </section>

        {/* Pereira vs Ankalaev Sidebar */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
            📺 Também no <span className="text-ufc-gold">UFC YouTube</span>
          </h2>
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <span className="rounded bg-ufc-gold/20 px-2 py-1 text-xs font-bold uppercase text-ufc-gold">
                  UFC Classics
                </span>
                <h3 className="mt-3 font-display text-2xl uppercase text-dark-text">
                  Alex Pereira vs Magomed Ankalaev 2
                </h3>
                <p className="mt-2 text-dark-textMuted">
                  O UFC republicou a revanche entre Pereira e Ankalaev — a luta onde "Poatan" perdeu o cinturão dos 
                  meio-pesados por decisão unânime no UFC 313. Esta repostagem no YouTube sinaliza a construção 
                  narrativa para a trilogia no UFC 320, onde Pereira recuperou o título com um TKO devastador no 
                  primeiro round.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded bg-dark-bg p-3 text-center">
                    <p className="font-display text-xl text-dark-text">Alex Pereira</p>
                    <p className="text-sm text-dark-textMuted">🇧🇷 15-2 (UFC)</p>
                    <p className="text-xs text-ufc-gold">Campeão LHW</p>
                  </div>
                  <div className="rounded bg-dark-bg p-3 text-center">
                    <p className="font-display text-xl text-dark-text">Magomed Ankalaev</p>
                    <p className="text-sm text-dark-textMuted">🇷🇺 20-2-1</p>
                    <p className="text-xs text-dark-textMuted">#1 LHW</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-dark-textMuted">
                  <strong className="text-ufc-red">Narrativa UFC:</strong> Com 602k views em 1 dia, o UFC está 
                  claramente preparando o terreno para Pereira vs Ankalaev 4. A rivalidade já é uma das maiores 
                  da história da divisão.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatBar({ label, value, max, suffix = '', color }: { 
  label: string; value: number; max: number; suffix?: string; color: 'red' | 'blue' 
}) {
  const pct = (value / max) * 100;
  const barColor = color === 'red' ? 'bg-ufc-red' : 'bg-blue-400';

  return (
    <div>
      <div className="flex justify-between text-xs text-dark-textMuted mb-1">
        <span>{label}</span>
        <span className="text-dark-text font-medium">{value}{suffix}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-dark-border">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  );
}
