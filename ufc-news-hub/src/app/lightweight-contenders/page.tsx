'use client';

import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { LWTacticalBreakdown } from '@/components/lightweight/LWTacticalBreakdown';
import { LWFightPrediction } from '@/components/lightweight/LWFightPrediction';

function StatBar({ label, value, max, suffix = '', color }: { 
  label: string; value: number; max: number; suffix?: string; color: 'green' | 'orange' 
}) {
  const pct = (value / max) * 100;
  const barColor = color === 'green' ? 'bg-green-400' : 'bg-orange-400';

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

export default function LightweightContendersPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <span className="text-dark-text">Lightweight Contenders</span>
        </div>

        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-xl border border-dark-border bg-gradient-to-r from-dark-card via-dark-bg to-dark-card p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.12),transparent_70%)]" />
          <div className="relative z-10 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-ufc-gold">
              UFC YouTube Classics • Construção Narrativa para Revanche
            </p>
            <h1 className="font-display text-4xl uppercase text-dark-text md:text-6xl lg:text-7xl">
              <span className="text-green-400">Gamrot</span> vs{' '}
              <span className="text-orange-400">Tsarukyan</span>
            </h1>
            <p className="mt-2 text-lg text-dark-textMuted">
              A Revanche que Definirá o Próximo Desafiante dos Leves
            </p>
            <p className="mt-4 text-sm text-dark-textMuted">
              Lightweight Division • 403k views em 4 dias no YouTube
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <span className="rounded-full bg-green-400/20 px-4 py-2 text-sm font-bold text-green-400">
                🇵🇱 Gamrot venceu a primeira
              </span>
              <span className="rounded-full bg-orange-400/20 px-4 py-2 text-sm font-bold text-orange-400">
                🇬🇪 Tsarukyan evoluiu massivamente
              </span>
            </div>
          </div>
        </div>

        {/* Fighter Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Gamrot Card */}
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-400 bg-dark-border text-2xl font-bold text-dark-text">
                MG
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-green-400">&quot;Gamer&quot;</p>
                <h2 className="font-display text-2xl uppercase text-dark-text">Mateusz Gamrot</h2>
                <p className="text-sm text-dark-textMuted">🇵🇱 Bielsko-Biała, Poland</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-dark-text">25-4</p>
                <p className="text-xs text-dark-textMuted">Record</p>
              </div>
              <div>
                <p className="font-display text-2xl text-green-400">#4</p>
                <p className="text-xs text-dark-textMuted">LW Ranking</p>
              </div>
              <div>
                <p className="font-display text-2xl text-dark-text">5&apos;10&quot;</p>
                <p className="text-xs text-dark-textMuted">Altura</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <StatBar label="Sig. Strikes/min" value={3.29} max={6} color="green" />
              <StatBar label="Strike Accuracy" value={52} max={100} suffix="%" color="green" />
              <StatBar label="Strike Defense" value={60} max={100} suffix="%" color="green" />
              <StatBar label="TD Average/15min" value={5.15} max={8} color="green" />
              <StatBar label="TD Defense" value={83} max={100} suffix="%" color="green" />
            </div>
            <div className="mt-4 rounded bg-dark-bg p-3">
              <p className="text-xs text-dark-textMuted mb-1">Últimas 5 Lutas</p>
              <div className="flex gap-1">
                {['L', 'W', 'L', 'W', 'W'].map((r, i) => (
                  <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-xs font-bold ${
                    r === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>{r}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-dark-textMuted space-y-1">
                <p>❌ L - Oliveira (SUB R2) UFC FN Out 2025</p>
                <p>✅ W - Klein (UD) UFC on ESPN Mai 2025</p>
                <p>❌ L - Hooker (SD) UFC 305 Ago 2024</p>
                <p>✅ W - Dos Anjos (UD) UFC 299 Mar 2024</p>
                <p>✅ W - Fiziev (TKO inj R2) UFC FN Set 2023</p>
              </div>
            </div>
          </div>

          {/* Tsarukyan Card */}
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-400 bg-dark-border text-2xl font-bold text-dark-text">
                AT
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-orange-400">&quot;Ahalkalakets&quot;</p>
                <h2 className="font-display text-2xl uppercase text-dark-text">Arman Tsarukyan</h2>
                <p className="text-sm text-dark-textMuted">🇬🇪 Tbilisi, Georgia</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-dark-text">23-3</p>
                <p className="text-xs text-dark-textMuted">Record</p>
              </div>
              <div>
                <p className="font-display text-2xl text-orange-400">#1</p>
                <p className="text-xs text-dark-textMuted">LW Ranking</p>
              </div>
              <div>
                <p className="font-display text-2xl text-dark-text">5&apos;7&quot;</p>
                <p className="text-xs text-dark-textMuted">Altura</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <StatBar label="Sig. Strikes/min" value={3.85} max={6} color="orange" />
              <StatBar label="Strike Accuracy" value={50} max={100} suffix="%" color="orange" />
              <StatBar label="Strike Defense" value={55} max={100} suffix="%" color="orange" />
              <StatBar label="Knockdown Avg" value={0.31} max={0.5} color="orange" />
              <StatBar label="TD Defense" value={75} max={100} suffix="%" color="orange" />
            </div>
            <div className="mt-4 rounded bg-dark-bg p-3">
              <p className="text-xs text-dark-textMuted mb-1">Últimas 5 Lutas</p>
              <div className="flex gap-1">
                {['W', 'W', 'W', 'W', 'W'].map((r, i) => (
                  <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-xs font-bold bg-green-500/20 text-green-400`}>{r}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-dark-textMuted space-y-1">
                <p>✅ W - Hooker (SUB R2) UFC FN Nov 2025</p>
                <p>✅ W - Oliveira (SD) UFC 300 Abr 2024</p>
                <p>✅ W - Dariush (KO R1) UFC on ESPN Dez 2023</p>
                <p>✅ W - Silva (TKO R3) UFC on ESPN Jun 2023</p>
                <p>✅ W - Ismagulov (UD) UFC FN Dez 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="mx-auto mb-12 max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded bg-category-lutas/20 px-2 py-1 text-xs font-bold uppercase tracking-wider text-category-lutas">
              Análise
            </span>
            <span className="text-sm text-dark-textMuted">14 de Fevereiro, 2026</span>
          </div>

          <h2 className="mb-6 font-display text-3xl uppercase leading-tight text-dark-text md:text-4xl">
            UFC Reposta Gamrot vs Tsarukyan: A Revanche dos Leves Está a Caminho?
          </h2>

          <div className="prose prose-invert max-w-none space-y-4 text-lg leading-relaxed text-dark-text">
            <p>
              O UFC repostou a luta completa entre <strong>Mateusz Gamrot</strong> e <strong>Arman Tsarukyan</strong> no 
              YouTube, acumulando impressionantes 403 mil visualizações em apenas 4 dias. Esse tipo de repostagem no 
              canal oficial raramente é aleatório — o UFC está claramente plantando as sementes para uma revanche entre 
              dois dos melhores lightweight contenders do mundo.
            </p>
            <p>
              Na primeira luta, realizada em junho de 2022, Gamrot dominou com seu wrestling superior, controlando 
              Tsarukyan por três rounds para vencer por decisão unânime. Porém, o cenário de 2026 é drasticamente 
              diferente. Tsarukyan, com apenas 25 anos na época, se transformou em uma máquina de destruição: desde 
              a derrota, emplacou 5 vitórias consecutivas que incluem um nocaute devastador sobre Beneil Dariush no 
              primeiro round, uma vitória histórica sobre Charles Oliveira por decisão dividida no UFC 300, e uma 
              finalização de Dan Hooker com um arm-triangle choke no segundo round.
            </p>
            <p>
              Gamrot (25-4), por sua vez, vive um momento de incerteza. Apesar de manter um recorde impressionante, 
              sofreu duas derrotas em suas últimas quatro lutas: perdeu por decisão dividida para Dan Hooker no UFC 305 
              e foi finalizado por Charles Oliveira com um rear-naked choke no segundo round. O dado revelador é que 
              ambos esses adversários — Hooker e Oliveira — foram derrotados por Tsarukyan.
            </p>
            <p>
              A análise de oponentes em comum pinta um quadro inequívoco: Tsarukyan venceu Oliveira e Hooker; Gamrot 
              perdeu para ambos. Se a MMA math funcionasse perfeitamente, Tsarukyan seria favorito absoluto. A questão 
              é: o wrestling de Gamrot — com 5.15 takedowns por 15 minutos e 83% de defesa — ainda pode ser o 
              equalizador?
            </p>
            <p>
              Com a divisão dos leves em transição e Islam Makhachev mantendo o cinturão, tanto Gamrot (#4) quanto 
              Tsarukyan (#1) precisam de uma vitória de statement para consolidar sua posição. Uma revanche não apenas 
              resolveria a questão pendente entre eles, mas seria provavelmente a luta eliminatória definitiva para o 
              próximo title shot na divisão mais competitiva do UFC.
            </p>
            <p>
              A repostagem da luta original no YouTube é o primeiro passo de um playbook que o UFC já usou antes — 
              vide Pereira vs Ankalaev 2 (917k views em 3 dias, sinalizando a construção para a quarta luta). O 
              padrão é claro: reposta a luta, gera buzz, anuncia a revanche. Fiquem atentos.
            </p>
          </div>
        </article>

        {/* Tactical Breakdown */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
            🔬 Análise <span className="text-orange-400">Tática</span>
          </h2>
          <LWTacticalBreakdown />
        </section>

        {/* Prediction */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
            🎯 Previsão <span className="text-orange-400">Data-Driven</span>
          </h2>
          <LWFightPrediction />
        </section>

        {/* YouTube Context */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
            📺 Contexto do <span className="text-ufc-gold">UFC YouTube</span>
          </h2>
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="space-y-4">
              <div className="rounded bg-dark-bg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-dark-text">🎬 Gamrot vs Tsarukyan | FULL FIGHT</span>
                  <span className="text-sm text-dark-textMuted">4 dias atrás</span>
                </div>
                <p className="text-sm text-dark-textMuted">403k views • 27 min — UFC repostou a luta completa de junho 2022</p>
              </div>
              <div className="rounded bg-dark-bg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-dark-text">🎬 Pereira vs Ankalaev 2 | UFC Classics</span>
                  <span className="text-sm text-dark-textMuted">3 dias atrás</span>
                </div>
                <p className="text-sm text-dark-textMuted">917k views • 9:29 — Construção para a 4ª luta da rivalidade</p>
              </div>
              <div className="rounded bg-dark-bg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-dark-text">🎬 Strickland vs Hernandez | Full Fight Marathon</span>
                  <span className="text-sm text-dark-textMuted">6 dias atrás</span>
                </div>
                <p className="text-sm text-dark-textMuted">208k views • 2h — Build-up para UFC Houston em 21 de fevereiro</p>
              </div>
              <div className="mt-4 rounded border border-ufc-gold/30 bg-dark-bg p-4">
                <p className="text-sm text-dark-text">
                  <strong className="text-ufc-gold">📊 Padrão identificado:</strong> O UFC está usando reposts de full fights 
                  para construir narrativas simultâneas em 3 divisões — Middleweight (Houston), Light Heavyweight (Pereira/Ankalaev), 
                  e agora Lightweight (Gamrot/Tsarukyan). Cada repost é o prenúncio de um anúncio de luta.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
