'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

import { SectionHeader } from './SectionHeader';
import type { CreatorKitSectionData, InstagramSlide } from '@/types/analise';

// ═══════════════════════════════════════════════════════════════
// Copy Button (internal)
// ═══════════════════════════════════════════════════════════════

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-dark-border/50 text-dark-textMuted hover:text-dark-text transition-colors"
      aria-label="Copiar"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// Slide color map
// ═══════════════════════════════════════════════════════════════

const slideColorClasses: Record<InstagramSlide['color'], string> = {
  red: 'bg-gradient-to-br from-ufc-red/20 to-dark-card border border-ufc-red/30',
  blue: 'bg-gradient-to-br from-blue-400/20 to-dark-card border border-blue-400/30',
  gold: 'bg-gradient-to-br from-ufc-gold/20 to-dark-card border border-ufc-gold/30',
};

// ═══════════════════════════════════════════════════════════════
// Tab Content Components
// ═══════════════════════════════════════════════════════════════

function InstagramTab({ slides }: { slides: InstagramSlide[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {slides.map((slide) => (
        <div
          key={slide.slide_number}
          className={`min-w-[280px] max-w-[320px] flex-shrink-0 rounded-xl p-6 ${slideColorClasses[slide.color]}`}
        >
          <span className="text-[10px] uppercase tracking-wider text-dark-textMuted">
            Slide {slide.slide_number}
          </span>
          <h4 className="font-display text-lg uppercase text-dark-text mt-2">
            {slide.title}
          </h4>
          <p className="text-sm text-dark-textMuted mt-3 whitespace-pre-line leading-relaxed">
            {slide.content}
          </p>
          <div className="mt-4 flex justify-end">
            <CopyButton text={`${slide.title}\n\n${slide.content}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TwitterTab({ tweets }: { tweets: { num: string; text: string }[] }) {
  return (
    <div className="space-y-3">
      {tweets.map((tweet) => (
        <div key={tweet.num} className="neu-card p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-xs text-dark-textMuted">{tweet.num}</span>
              <p className="text-sm text-dark-text mt-1 leading-relaxed">
                {tweet.text}
              </p>
            </div>
            <CopyButton text={tweet.text} />
          </div>
          <div className="flex justify-end mt-2">
            <span
              className={`text-[10px] ${
                tweet.text.length > 280
                  ? 'text-ufc-red'
                  : 'text-dark-textMuted'
              }`}
            >
              {tweet.text.length}/280
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VideoScriptTab({
  sections,
}: {
  sections: { time: string; title: string; text: string }[];
}) {
  return (
    <div className="space-y-0 relative">
      {sections.map((section, i) => (
        <div key={section.time} className="flex gap-4">
          {/* Left: time badge + connecting line */}
          <div className="relative flex flex-col items-center">
            <span className="bg-ufc-red/20 text-ufc-red text-xs font-bold px-2 py-1 rounded flex-shrink-0 w-16 text-center z-10">
              {section.time}
            </span>
            {i < sections.length - 1 && (
              <div className="border-l-2 border-dark-border flex-1 min-h-[16px]" />
            )}
          </div>

          {/* Right: content card */}
          <div className="neu-card p-4 flex-1 mb-4">
            <h4 className="font-display text-sm uppercase text-dark-text">
              {section.title}
            </h4>
            <p className="text-sm text-dark-textMuted mt-2 italic leading-relaxed">
              &ldquo;{section.text}&rdquo;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TikTokTab({
  scripts,
}: {
  scripts: { hook: string; body: string; cta: string }[];
}) {
  return (
    <div className="space-y-4">
      {scripts.map((script, i) => (
        <div key={`tiktok-${script.hook.slice(0, 30)}`} className="neu-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-dark-textMuted font-medium">
              Script {i + 1}
            </span>
            <CopyButton
              text={`HOOK: ${script.hook}\n\n${script.body}\n\nCTA: ${script.cta}`}
            />
          </div>

          {/* Hook */}
          <div className="bg-ufc-red/10 border-l-2 border-ufc-red p-3 rounded-r-lg">
            <span className="text-[10px] uppercase tracking-wider text-ufc-red font-bold">
              HOOK
            </span>
            <p className="text-sm text-dark-text mt-1">{script.hook}</p>
          </div>

          {/* Body */}
          <p className="mt-3 text-sm text-dark-textMuted leading-relaxed">
            {script.body}
          </p>

          {/* CTA */}
          <div className="bg-ufc-gold/10 border-l-2 border-ufc-gold p-3 rounded-r-lg mt-3">
            <span className="text-[10px] uppercase tracking-wider text-ufc-gold font-bold">
              CTA
            </span>
            <p className="text-sm text-dark-text mt-1">{script.cta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeadlinesTab({ headlines }: { headlines: string[] }) {
  return (
    <div className="space-y-2">
      {headlines.map((headline) => (
        <div key={headline} className="neu-card p-4 flex items-center justify-between">
          <span className="text-sm text-dark-text font-medium">{headline}</span>
          <CopyButton text={headline} />
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

type TabId = 'instagram' | 'twitter' | 'video' | 'tiktok' | 'headlines';

interface TabDef {
  id: TabId;
  label: string;
}

export function CreatorKitSection({ data }: { data: CreatorKitSectionData }) {
  const [activeTab, setActiveTab] = useState<TabId>('instagram');

  const tabs: TabDef[] = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'twitter', label: 'Twitter/X' },
    { id: 'video', label: 'Video Script' },
    ...(data.tiktok ? [{ id: 'tiktok' as const, label: 'TikTok' }] : []),
    ...(data.headlines ? [{ id: 'headlines' as const, label: 'Headlines' }] : []),
  ];

  return (
    <section>
      <SectionHeader number="13" title="Creator" accent="Kit" />

      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl bg-dark-bg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-dark-card text-ufc-red shadow-md'
                : 'text-dark-textMuted hover:text-dark-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'instagram' && <InstagramTab slides={data.instagram} />}
      {activeTab === 'twitter' && <TwitterTab tweets={data.twitter} />}
      {activeTab === 'video' && <VideoScriptTab sections={data.video} />}
      {activeTab === 'tiktok' && data.tiktok && (
        <TikTokTab scripts={data.tiktok} />
      )}
      {activeTab === 'headlines' && data.headlines && (
        <HeadlinesTab headlines={data.headlines} />
      )}
    </section>
  );
}
