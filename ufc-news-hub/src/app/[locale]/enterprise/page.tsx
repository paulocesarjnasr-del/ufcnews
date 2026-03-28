'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import {
  ArrowRight, BarChart3, Brain, CheckCircle2, ChevronDown, ChevronUp,
  Clock, Database, FileText, Globe, Layers, Mic, Monitor, MousePointerClick,
  Search, Share2, Shield, Sparkles, Target, TrendingUp, Users, Video, Zap,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// Expandable FAQ
// ═══════════════════════════════════════════════════════════

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-neutral-200 py-5 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-900 font-medium pr-4">{q}</p>
        {open ? <ChevronUp className="h-4 w-4 text-neutral-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-neutral-400 flex-shrink-0" />}
      </div>
      {open && <p className="mt-3 text-xs leading-relaxed text-neutral-600">{a}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Value Card
// ═══════════════════════════════════════════════════════════

function ValueCard({ icon: Icon, before, after, metric, description }: {
  icon: React.ElementType;
  before: string;
  after: string;
  metric: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-md hover:border-ufc-red/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ufc-red/10">
          <Icon className="h-5 w-5 text-ufc-red" />
        </div>
        <p className="font-display text-sm uppercase text-neutral-900">{metric}</p>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 rounded-lg bg-neutral-50 p-3 text-center border border-neutral-200">
          <p className="text-[9px] uppercase text-neutral-400 mb-1">Without Us</p>
          <p className="font-display text-lg text-neutral-400">{before}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-ufc-red flex-shrink-0" />
        <div className="flex-1 rounded-lg bg-emerald-50 p-3 text-center border border-emerald-200">
          <p className="text-[9px] uppercase text-emerald-600 mb-1">With Us</p>
          <p className="font-display text-lg text-emerald-600">{after}</p>
        </div>
      </div>
      <p className="text-xs text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Pipeline Step
// ═══════════════════════════════════════════════════════════

function PipelineStep({ num, icon: Icon, title, description, detail }: {
  num: string;
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ufc-red/10 border border-ufc-red/20 z-10">
          <Icon className="h-4 w-4 text-ufc-red" />
        </div>
        <div className="border-l border-dashed border-neutral-300 flex-1 min-h-[16px]" />
      </div>
      <div className="pb-8 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-ufc-red/60">{num}</span>
          <p className="font-display text-sm uppercase text-neutral-900">{title}</p>
        </div>
        <p className="text-xs text-neutral-700 mb-1">{description}</p>
        <p className="text-[11px] text-neutral-500 italic">{detail}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════

export default function EnterprisePage() {
  return (
    <main className="relative min-h-screen bg-[#f8f8f8] text-neutral-900">

      {/* ──────── HERO ──────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(210,10,10,0.2)_0%,_transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ufc-red/40 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-20 md:pb-24 md:pt-32">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-ufc-red/15 px-4 py-1.5 border border-ufc-red/30">
              <Sparkles className="h-3.5 w-3.5 text-ufc-red" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red">
                Combat Sports Intelligence Engine
              </span>
            </div>

            <h1 className="font-display text-4xl uppercase tracking-wide text-white md:text-6xl lg:text-7xl leading-[0.95]">
              Your Audience Wants<br />
              <span className="text-ufc-red">Data-Driven</span> Fight Analysis.<br />
              <span className="text-neutral-400">You Don&apos;t Have Time</span> To Build It.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              We deliver publication-ready pre-fight analysis and post-event recaps every week.
              15 sections per fight. Verified stats. Creator kit included.
              Your brand, your voice, zero research time.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/analise/evento/evloev-vs-murphy"
                className="inline-flex items-center gap-2 rounded-full bg-ufc-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-700 shadow-[0_0_20px_rgba(210,10,10,0.3)] hover:shadow-[0_0_30px_rgba(210,10,10,0.5)]"
              >
                See Live Example
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/recap/emmett-vs-vallejos"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-600 bg-neutral-800 px-6 py-3 text-sm font-bold uppercase tracking-wider text-neutral-200 transition-all hover:border-ufc-red/40 hover:text-white"
              >
                See Post-Event Recap
              </Link>
            </div>

            {/* Trust numbers */}
            <div className="mt-12 grid grid-cols-3 gap-6 md:gap-10">
              <div className="text-center">
                <p className="font-display text-3xl text-ufc-red md:text-4xl">15</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-400">Sections Per Fight</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl text-amber-400 md:text-4xl">78%</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-400">Prediction Accuracy</p>
                <p className="mt-0.5 text-[9px] text-neutral-500">21/27 winners across 2 events, tracked and audited publicly</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl text-emerald-400 md:text-4xl">0h</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-400">Research Time For You</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── THE PROBLEM ──────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">The Problem</p>
          <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
            Fight Content Without Data<br />Is Just <span className="text-neutral-400">Noise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <Clock className="h-5 w-5 text-ufc-red mb-3" />
            <p className="font-display text-sm uppercase text-neutral-900 mb-2">The Time Problem</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Proper pre-fight research takes 8-15 hours per card. Scraping stats, cross-referencing records, analyzing matchups, building narratives. Most creators skip it because they can&apos;t afford the time.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <TrendingUp className="h-5 w-5 text-ufc-red mb-3" />
            <p className="font-display text-sm uppercase text-neutral-900 mb-2">The Quality Gap</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your audience can tell the difference between &ldquo;I think Evloev wins&rdquo; and &ldquo;Evloev has landed 40 takedowns in 9 UFC fights with a 67% accuracy rate.&rdquo; Posts with verified stats consistently outperform opinion-only content because data builds trust, and trust drives subscriptions.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <Users className="h-5 w-5 text-ufc-red mb-3" />
            <p className="font-display text-sm uppercase text-neutral-900 mb-2">The Scale Problem</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              A UFC card has 14 fights. Even if you research the main event deeply, the prelims get ignored. Your competitors who cover the full card get more search traffic, more clicks, and more subscribers. You can&apos;t do it all alone.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── VALUE PROPOSITION ──────── */}
      <section className="relative overflow-hidden bg-neutral-100">
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">Direct Value Proposition</p>
            <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
              Our Service <span className="text-ufc-red">&rarr;</span> Your Revenue
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs text-neutral-500">
              Every deliverable maps directly to a monetizable output for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ValueCard
              icon={FileText}
              before="2-3 posts/week"
              after="8-12 posts/week"
              metric="Content Volume"
              description="Each fight analysis has 15 sections. One card = enough material for carousels, tweet threads, YouTube breakdowns, TikTok scripts, and podcast segments. Going from 2-3 generic posts to 8-12 data-driven posts is a direct multiplier on reach and impressions."
            />
            <ValueCard
              icon={Clock}
              before="8-15 hours"
              after="0 hours"
              metric="Research Time Saved"
              description="We run 15-22 web searches per fight, cross-reference common opponents, pull live stats, and validate every data point. The 8-15h estimate comes from what it takes to manually scrape UFCStats, check records, find recent interviews, and structure it all. We automate the entire pipeline."
            />
            <ValueCard
              icon={MousePointerClick}
              before="Opinion-based"
              after="Data-backed"
              metric="Content Quality"
              description="Posts with verifiable stats (strike rates, takedown accuracy, win methods) give your audience a reason to trust and share your content. Instead of 'I think X wins', you publish '67% takedown accuracy across 9 UFC fights.' That specificity is what drives saves, shares, and return visits."
            />
            <ValueCard
              icon={BarChart3}
              before="Inconsistent"
              after="Every card"
              metric="Publishing Consistency"
              description="UFC runs ~42 events per year. Missing even one card means your audience goes elsewhere. We deliver pre-fight + post-event content on schedule for every event, so you never have a gap in your publishing calendar."
            />
            <ValueCard
              icon={Globe}
              before="Main event only"
              after="Full 14-fight card"
              metric="Coverage Depth"
              description="Most creators only cover 1-2 fights. We cover all 14: main card gets 15-section deep analysis, prelims get 6 sections each. More fights covered = more keywords indexed = more search traffic to your pages."
            />
            <ValueCard
              icon={Share2}
              before="Write + Design"
              after="Copy + Post"
              metric="Time to Publish"
              description="Creator Kit delivers ready-to-post content for 5 platforms: Instagram carousels, Twitter/X threads, YouTube scripts with B-roll cues, TikTok hooks, and podcast talking points. No rewriting needed. Copy, customize your voice, publish."
            />
          </div>

          {/* Revenue math */}
          <div className="mt-10 rounded-2xl bg-neutral-900 p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 mb-4">The Math</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <p className="font-display text-2xl text-amber-400">4x</p>
                <p className="text-xs text-neutral-300 mt-1">Content output. Going from 2-3 posts to 8-12 posts per week means 4x more touchpoints with your audience. Each touchpoint is a chance for engagement, a share, or a new follower.</p>
              </div>
              <div>
                <p className="font-display text-2xl text-amber-400">15h</p>
                <p className="text-xs text-neutral-300 mt-1">Saved per card. That&apos;s 60+ hours per month you can reinvest into video production, community building, or sponsorship outreach instead of stat-hunting.</p>
              </div>
              <div>
                <p className="font-display text-2xl text-amber-400">42</p>
                <p className="text-xs text-neutral-300 mt-1">UFC events per year, all covered. Zero gaps in your content calendar. Consistent publishing is the #1 factor in algorithm-driven platforms like YouTube and Instagram.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── NOT A WRAPPER: THE PIPELINE ──────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">How It Works</p>
          <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
            This Is Not &ldquo;AI-Generated Content&rdquo;
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
            AI is the last mile, not the product. Here&apos;s what happens before a single word is written.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8">
          <div>
            <PipelineStep num="01" icon={Search} title="Live Data Scraping" description="We pull real-time fighter stats, records, and rankings from multiple verified sources." detail="UFCStats.com, official rankings, odds aggregators" />
            <PipelineStep num="02" icon={Database} title="Proprietary Fighter Database" description="500+ fighters with full career stats, fight history, and performance metrics stored in our database." detail="SLpM, strike accuracy, TD avg, sub avg, and 12 more data points per fighter" />
            <PipelineStep num="03" icon={Search} title="Deep Research Phase" description="15-22 targeted web searches per fight. Recent interviews, injury reports, camp changes, training footage analysis." detail="Every claim is sourced. No hallucinated stats. No guesswork." />
            <PipelineStep num="04" icon={Layers} title="6-Layer Intelligence Briefing" description="Raw data is structured into a layered briefing: stats, narrative, momentum, common opponents, danger zones, and intangibles." detail="This briefing is the foundation. The analysis is built on verified intelligence, not prompts." />
          </div>
          <div>
            <PipelineStep num="05" icon={Brain} title="Analysis Generation" description="15 modular sections per fight: hero, narrative, stats comparison, skill profiles, win distribution, danger zones, victory paths, prediction, and more." detail="Each section has its own data contract and validation schema" />
            <PipelineStep num="06" icon={Shield} title="Mechanical Validation" description="7 automated checks per analysis: file exists, fighter names match, view type correct, event consistency, no duplicates." detail="If validation fails, the specific fight is re-analyzed automatically" />
            <PipelineStep num="07" icon={Target} title="Prediction Tracking" description="Every prediction is tracked against real results. Our accuracy is audited publicly after every event." detail="78% winner accuracy across 27 fights (2 events). Full transparency, no cherry-picking." />
            <PipelineStep num="08" icon={FileText} title="Creator Kit Generation" description="Ready-to-publish content for 5 platforms: Instagram, Twitter/X, YouTube, TikTok, Podcast. Copy, paste, post." detail="Each platform gets format-optimized content with character counts and B-roll suggestions" />
          </div>
        </div>
      </section>

      {/* ──────── WHAT YOU GET ──────── */}
      <section className="relative overflow-hidden bg-neutral-100">
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">Weekly Deliverables</p>
            <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
              What You Receive <span className="text-ufc-red">Every Card</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { icon: FileText, title: 'Pre-Fight Analysis (Main Card)', desc: '15-section deep analysis for each main card fight. Stats, narrative, predictions, danger zones, victory paths, creator kit.' },
              { icon: FileText, title: 'Pre-Fight Analysis (Prelims)', desc: '6-section analysis for every prelim and early prelim fight. Full card coverage, not just the main event.' },
              { icon: BarChart3, title: 'Post-Event Recap', desc: 'Prediction accuracy audit, fight results with comparison, headlines, star of the night, ranking movements, what\'s next matchmaking.' },
              { icon: Share2, title: 'Creator Kit (Pre-Fight)', desc: 'Instagram carousels, tweet threads, video scripts, TikTok hooks, podcast talking points. Per fight. Ready to post.' },
              { icon: Share2, title: 'Creator Kit (Post-Event)', desc: 'Results-based content for all 5 platforms. Quotable stats, narrative threads, replay guide, model autopsy.' },
              { icon: Target, title: 'Prediction Model Transparency', desc: 'Public accuracy tracking. Confidence calibration report. Pattern analysis. Your audience sees the receipts.' },
              { icon: TrendingUp, title: 'Division Impact Report', desc: 'How each event reshapes the weight class. Title picture implications. Ranking movements with narrative context.' },
              { icon: Monitor, title: 'White-Label Ready', desc: 'Your brand, your domain, your colors. We provide the intelligence. You own the presentation.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 rounded-xl bg-white border border-neutral-200 p-4 hover:border-ufc-red/30 hover:shadow-sm transition-all">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ufc-red/10">
                  <item.icon className="h-4 w-4 text-ufc-red" />
                </div>
                <div>
                  <p className="text-sm text-neutral-900 font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── LIVE DEMO ──────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">Live Demo</p>
          <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
            Don&apos;t Take Our Word For It.<br /><span className="text-ufc-red">See The Product.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs text-neutral-500">
            These are real analyses from real events. Not mockups. Not demos. This is exactly what you would receive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/analise/evento/evloev-vs-murphy"
            className="group rounded-2xl bg-white border border-neutral-200 p-6 transition-all duration-300 hover:border-ufc-red/40 hover:shadow-md"
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-ufc-red/70 mb-2">Pre-Fight Analysis</p>
            <p className="font-display text-xl uppercase text-neutral-900 group-hover:text-ufc-red transition-colors">
              Evloev vs Murphy
            </p>
            <p className="text-xs text-neutral-500 mt-1">UFC London | March 21, 2026</p>
            <p className="text-xs text-neutral-600 mt-3">Full event overview with 14 fight analyses. Main card (15 sections each) + Prelims (6 sections each).</p>
            <div className="mt-4 flex items-center gap-1 text-ufc-red text-xs font-medium">
              View Live <ArrowRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            href="/recap/emmett-vs-vallejos"
            className="group rounded-2xl bg-white border border-neutral-200 p-6 transition-all duration-300 hover:border-emerald-400 hover:shadow-md"
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Post-Event Recap</p>
            <p className="font-display text-xl uppercase text-neutral-900 group-hover:text-emerald-600 transition-colors">
              Emmett vs Vallejos
            </p>
            <p className="text-xs text-neutral-500 mt-1">UFC Vegas 114 | March 14, 2026</p>
            <p className="text-xs text-neutral-600 mt-3">Full recap: prediction accuracy (71%), creator kit, narrative threads, replay guide, model autopsy, division impact.</p>
            <div className="mt-4 flex items-center gap-1 text-emerald-600 text-xs font-medium">
              View Live <ArrowRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            href="/analise/evloev-vs-murphy"
            className="group rounded-2xl bg-white border border-neutral-200 p-6 transition-all duration-300 hover:border-amber-400 hover:shadow-md md:col-span-2"
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600 mb-2">Deep Dive: Single Fight</p>
            <p className="font-display text-xl uppercase text-neutral-900 group-hover:text-amber-600 transition-colors">
              Evloev vs Murphy: 15-Section Full Analysis
            </p>
            <p className="text-xs text-neutral-600 mt-3">
              See what a complete single-fight analysis looks like: narrative, stats, skills, danger zones, predictions, creator kit, and more. This is the depth your audience craves.
            </p>
            <div className="mt-4 flex items-center gap-1 text-amber-600 text-xs font-medium">
              View Full Analysis <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* ──────── THE ALTERNATIVE: COST COMPARISON ──────── */}
      <section className="relative overflow-hidden bg-neutral-100">
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">The Alternative</p>
            <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
              One Freelance Article Costs More<br />Than <span className="text-ufc-red">Everything We Deliver</span>
            </h2>
          </div>

          {/* Single Article vs Our Monthly */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
            {/* Freelancer Side */}
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-4">One Freelance Article</p>
              <p className="font-display text-4xl text-neutral-900">$200 <span className="text-lg text-neutral-400">- $750</span></p>
              <p className="text-xs text-neutral-500 mt-2 mb-6">Average rate for a single sports analysis article from a freelance writer</p>
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                  <span className="text-xs text-neutral-500">One article, one fight</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                  <span className="text-xs text-neutral-500">No creator kit or social media formatting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                  <span className="text-xs text-neutral-500">No prediction tracking or accuracy audit</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                  <span className="text-xs text-neutral-500">No post-event recap</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                  <span className="text-xs text-neutral-500">No dashboard or card monitoring</span>
                </div>
              </div>
              <p className="text-[10px] text-neutral-400 mt-4">Sources: Editorial Freelancers Association, Freedom With Writing, The Athletic</p>
            </div>

            {/* Our Service Side */}
            <div className="rounded-2xl bg-white border-2 border-ufc-red/30 p-6 shadow-md">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ufc-red mb-4">Our Professional Plan (Monthly)</p>
              <p className="font-display text-4xl text-neutral-900">$199<span className="text-lg text-neutral-400">/mo</span></p>
              <p className="text-xs text-neutral-500 mt-2 mb-6">Everything below, every card, every month</p>
              <div className="space-y-3 pt-4 border-t border-ufc-red/10">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-700 font-medium">14 fight analyses per card (pre-fight)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-700 font-medium">Post-event recap with accuracy audit</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-700 font-medium">Creator kit for 5 platforms (IG, X, YT, TikTok, Podcast)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-700 font-medium">Dashboard + card change alerts</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-700 font-medium">Custom branding + dedicated support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-neutral-700">
              A single freelance article about <span className="font-semibold">one fight</span> costs as much as our entire monthly service covering <span className="font-semibold text-ufc-red">every fight on the card</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── ELEVATE YOUR CONTENT ──────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">For Creators</p>
          <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
            This Is How You <span className="text-ufc-red">Level Up</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
            Your audience can tell the difference between opinion and intelligence. This is the tool that makes that difference.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white border border-neutral-200 p-6 shadow-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ufc-red/10 mb-4">
              <TrendingUp className="h-6 w-6 text-ufc-red" />
            </div>
            <p className="font-display text-sm uppercase text-neutral-900 mb-2">Go From Opinion to Authority</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Anyone can say &ldquo;I think Evloev wins.&rdquo; Only you can say &ldquo;Evloev has 40 takedowns in 9 UFC fights, and against their common opponent Dan Ige, he won 30-26 while Murphy won 29-28.&rdquo; Data makes you the expert your audience trusts.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-neutral-200 p-6 shadow-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ufc-red/10 mb-4">
              <Globe className="h-6 w-6 text-ufc-red" />
            </div>
            <p className="font-display text-sm uppercase text-neutral-900 mb-2">Cover Every Fight, Every Week</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your competitors cover the main event. You cover all 14 fights with the same depth. More fights covered means more searchable content, more keywords indexed, and more people finding you. Scale is the unfair advantage.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-neutral-200 p-6 shadow-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ufc-red/10 mb-4">
              <Sparkles className="h-6 w-6 text-ufc-red" />
            </div>
            <p className="font-display text-sm uppercase text-neutral-900 mb-2">Publish Instantly, Not Eventually</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pre-fight analysis 3-4 days before the event. Post-event recap within 6 hours. Creator kit formatted for 5 platforms. While others are still researching, you&apos;re already posting. Speed wins in algorithm-driven platforms.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-neutral-900 p-6 md:p-8 text-center">
          <p className="text-xs text-ufc-red font-bold uppercase tracking-wider mb-2">The Bottom Line</p>
          <p className="text-lg text-white font-medium md:text-xl">
            You didn&apos;t start creating content to spend 15 hours researching stats.
          </p>
          <p className="text-sm text-neutral-400 mt-2 max-w-lg mx-auto">
            You started because you love the sport and have something to say. We handle the research, the data, the formatting. You handle the voice, the personality, the audience. That&apos;s how you grow.
          </p>
        </div>
      </section>

      {/* ──────── YOUR DASHBOARD ──────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">Your Dashboard</p>
          <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
            Everything In <span className="text-ufc-red">One Place</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs text-neutral-500">
            Every subscriber gets a personal dashboard to oversee all deliverables, track card changes, and access content the moment it&apos;s ready.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ufc-red/10">
                <Monitor className="h-4 w-4 text-ufc-red" />
              </div>
              <p className="text-sm text-neutral-900 font-medium">Content Hub</p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Access all pre-fight analyses, post-event recaps, and creator kits from a single dashboard. Filter by event, date, or weight class. Every deliverable organized and ready to use.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ufc-red/10">
                <Shield className="h-4 w-4 text-ufc-red" />
              </div>
              <p className="text-sm text-neutral-900 font-medium">Card Monitor & Alerts</p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Automated monitoring of UFC card changes. When a fight is cancelled, an opponent changes, or a bout is added, you get an email alert immediately. No more scrambling to update your content.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ufc-red/10">
                <Target className="h-4 w-4 text-ufc-red" />
              </div>
              <p className="text-sm text-neutral-900 font-medium">Prediction Tracking</p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Track our prediction accuracy across every event. See which picks hit, which missed, and why. Full transparency with a public accuracy audit after every card.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ufc-red/10">
                <Clock className="h-4 w-4 text-ufc-red" />
              </div>
              <p className="text-sm text-neutral-900 font-medium">Delivery Schedule</p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pre-fight analysis delivered 3-4 days before the event. Post-event recap within 6 hours. Creator kit ready to publish the moment content drops. Your dashboard shows delivery status in real time.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── PRICING ──────── */}
      <section className="relative overflow-hidden bg-neutral-100">
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70 mb-3">Pricing</p>
            <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-4xl">
              Built For <span className="text-ufc-red">Serious</span> Combat Sports Media
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-xs text-neutral-500">
              All plans include a personal dashboard, card change alerts, and prediction tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Tier 1 - Starter */}
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Starter</p>
              <p className="font-display text-3xl text-neutral-900 mt-2">$79<span className="text-sm text-neutral-400">/mo</span></p>
              <p className="text-[10px] text-neutral-500 mt-1">Main card coverage</p>
              <div className="mt-6 space-y-2">
                {[
                  'Main card analysis (6 fights)',
                  'Post-event recap (basic)',
                  'Creator kit (3 platforms: IG, X, YT)',
                  'Prediction tracking',
                  'Personal dashboard',
                  'Card change alerts (email)',
                  'Email support (48h response)',
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-neutral-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 2 - Professional (TARGET) */}
            <div className="rounded-2xl bg-white border-2 border-ufc-red/40 p-6 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ufc-red px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                Best Value
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ufc-red">Professional</p>
              <p className="font-display text-3xl text-neutral-900 mt-2">$199<span className="text-sm text-neutral-400">/mo</span></p>
              <p className="text-[10px] text-neutral-500 mt-1">Full card coverage</p>
              <div className="mt-6 space-y-2">
                {[
                  'Full card analysis (14 fights)',
                  'Post-event recap + Model autopsy',
                  'Creator kit (all 5 platforms)',
                  'Narrative threads + Replay guide',
                  'Division impact report',
                  'Prediction tracking + accuracy audit',
                  'Personal dashboard',
                  'Card change alerts (email)',
                  'Custom branding (your name, your voice)',
                  'Email support (24h response)',
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-neutral-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 3 - All-Access (ANCHOR) */}
            <div className="rounded-2xl bg-white border border-amber-300 p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">All-Access</p>
              <p className="font-display text-3xl text-neutral-900 mt-2">$449<span className="text-sm text-neutral-400">/mo</span></p>
              <p className="text-[10px] text-neutral-500 mt-1">Full card + strategy consulting</p>
              <div className="mt-6 space-y-2">
                {[
                  'Everything in Professional',
                  'On-demand fighter analysis (any fighter, any time)',
                  'Monthly strategy call (30-45 min)',
                  'Content performance audit (your metrics)',
                  'Personalized algorithm recommendations',
                  'Priority card change alerts',
                  'Dedicated support (Slack or WhatsApp)',
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-neutral-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Context */}
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-500">
              A freelance sports writer charges $200-750 per article. Our Professional plan covers 14 fights + recap + creator kit for $199/mo.
            </p>
            <p className="text-[10px] text-neutral-400 mt-1">
              That&apos;s 98% less than doing it yourself. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── FAQ ──────── */}
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl uppercase text-neutral-900 md:text-3xl">Questions</h2>
        </div>
        <div>
          <FAQ
            q="How is this different from ChatGPT or other AI writing tools?"
            a="ChatGPT generates text from its training data. We run a 8-step intelligence pipeline: live data scraping, proprietary fighter database with 500+ athletes, 15-22 targeted web searches per fight, 6-layer intelligence briefing, validated analysis generation, mechanical quality checks, prediction tracking, and creator kit formatting. The AI writes the final output, but the intelligence driving it is real, verified, and proprietary. You cannot replicate this with a prompt."
          />
          <FAQ
            q="How accurate are the predictions?"
            a="78% winner accuracy across our last 2 events (21 of 27 fights correct). UFC London: 85% (11/13). UFC Vegas 114: 71% (10/14). We track and publish our accuracy after every event in the Model Autopsy section. When we're wrong, we explain exactly why. Full transparency, no cherry-picking."
          />
          <FAQ
            q="Can I use this content as if it were my own?"
            a="Yes. White-label means your brand, your voice, your audience. We deliver the intelligence and content. You publish under your name. Your audience never needs to know where the research came from."
          />
          <FAQ
            q="What if a fight gets cancelled or changed?"
            a="We monitor card changes and update analyses accordingly. If a fight is cancelled, you receive an updated analysis for the replacement bout. If the entire card shifts, we re-run the pipeline."
          />
          <FAQ
            q="Do you cover only UFC?"
            a="Currently UFC-focused. Expansion to Bellator, PFL, and ONE Championship is on the roadmap for Q3 2026."
          />
          <FAQ
            q="How quickly do I receive the post-event recap?"
            a="Within 6 hours of the event ending. Pre-fight analyses are delivered 3-4 days before the event to give you time to schedule posts."
          />
        </div>
      </section>

      {/* ──────── FINAL CTA ──────── */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(210,10,10,0.15)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl px-6 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl uppercase text-white md:text-5xl">
            Stop Researching.<br /><span className="text-ufc-red">Start Publishing.</span>
          </h2>
          <p className="mt-4 text-sm text-neutral-300">
            Your next card is days away. Your competitors are already posting.
          </p>
          <div className="mt-8">
            <a
              href="mailto:contact@combatsportsintel.com"
              className="inline-flex items-center gap-2 rounded-full bg-ufc-red px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-700 shadow-[0_0_25px_rgba(210,10,10,0.4)] hover:shadow-[0_0_40px_rgba(210,10,10,0.6)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-[10px] text-neutral-400">
            No commitment. See a full sample for your next event before you decide.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-6 py-8 text-center">
        <p className="text-[10px] text-neutral-400">
          Combat Sports Intelligence Engine &middot; Built for serious combat sports media
        </p>
      </footer>
    </main>
  );
}
