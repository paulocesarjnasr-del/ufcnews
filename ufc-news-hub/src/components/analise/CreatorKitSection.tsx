'use client';

import { useState } from 'react';
import { Instagram, MessageCircle, Video, Smartphone, Type, Copy, Check } from 'lucide-react';
import type { CreatorKitSectionData } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

const slideColorMap = {
  red: 'from-ufc-red/20 to-dark-bg border-ufc-red/30',
  blue: 'from-blue-400/20 to-dark-bg border-blue-400/30',
  gold: 'from-ufc-gold/20 to-dark-bg border-ufc-gold/30',
};

const slideTitleColor = {
  red: 'text-ufc-red',
  blue: 'text-blue-400',
  gold: 'text-ufc-gold',
};

function HeadlineItem({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-dark-border bg-dark-bg p-4">
      <p className="text-sm font-semibold text-dark-text">{text}</p>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 rounded-lg border border-dark-border bg-dark-card px-3 py-1.5 text-xs text-dark-textMuted hover:text-dark-text transition-colors"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function CreatorKitSection({ data }: { data: CreatorKitSectionData }) {
  const [activeTab, setActiveTab] = useState<'instagram' | 'twitter' | 'video' | 'tiktok' | 'headlines'>('instagram');

  const tabs = [
    { id: 'instagram' as const, label: 'Instagram Cards', Icon: Instagram },
    { id: 'twitter' as const, label: 'Twitter Thread', Icon: MessageCircle },
    { id: 'video' as const, label: 'Video Script', Icon: Video },
    { id: 'tiktok' as const, label: 'TikTok/Reels', Icon: Smartphone },
    { id: 'headlines' as const, label: 'Headlines', Icon: Type },
  ];

  return (
    <section>
      <SectionHeader number="13" title="Creator" accent="Kit" />

      {/* Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-ufc-red text-white'
                : 'bg-dark-card text-dark-textMuted hover:text-dark-text border border-dark-border'
            }`}
          >
            <tab.Icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
        {activeTab === 'instagram' && (
          <div className="space-y-6">
            <h3 className="font-display text-lg uppercase text-dark-text">Instagram Cards</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {data.instagram.map((slide) => {
                const colorClass = slideColorMap[slide.color] || slideColorMap.red;
                const titleClass = slideTitleColor[slide.color] || slideTitleColor.red;
                return (
                  <div key={slide.slide_number} className={`rounded-lg bg-gradient-to-br border p-5 ${colorClass}`}>
                    <p className={`font-display text-lg uppercase mb-2 ${titleClass}`}>SLIDE {slide.slide_number}</p>
                    <p className="text-sm text-dark-text font-bold mb-2">{slide.title}</p>
                    <p className="text-xs text-dark-textMuted whitespace-pre-line">{slide.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div className="space-y-6">
            <h3 className="font-display text-lg uppercase text-dark-text">Twitter Thread ({data.twitter.length} tweets)</h3>
            <div className="space-y-4">
              {data.twitter.map((tweet) => (
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

        {activeTab === 'video' && (
          <div className="space-y-6">
            <h3 className="font-display text-lg uppercase text-dark-text">Video Script (60 segundos)</h3>
            <div className="space-y-4">
              {data.video.map((section) => (
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

        {activeTab === 'tiktok' && data.tiktok && (
          <div className="space-y-6">
            <h3 className="font-display text-lg uppercase text-dark-text">TikTok/Reels Scripts</h3>
            <div className="space-y-4">
              {data.tiktok.map((script, i) => (
                <div key={i} className="rounded-lg border border-dark-border bg-dark-bg p-5">
                  <div className="mb-3">
                    <span className="rounded bg-ufc-red/20 px-2 py-1 text-xs font-bold text-ufc-red">Script {i + 1}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ufc-gold mb-1">Hook (3s)</p>
                      <p className="text-sm font-bold text-dark-text">{script.hook}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted mb-1">Corpo</p>
                      <p className="text-sm text-dark-textMuted">{script.body}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-green-400 mb-1">CTA</p>
                      <p className="text-sm text-green-400">{script.cta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tiktok' && !data.tiktok && (
          <p className="text-sm text-dark-textMuted">TikTok scripts nao disponiveis para esta analise.</p>
        )}

        {activeTab === 'headlines' && data.headlines && (
          <div className="space-y-6">
            <h3 className="font-display text-lg uppercase text-dark-text">Headlines Prontas</h3>
            <div className="space-y-3">
              {data.headlines.map((headline, i) => (
                <HeadlineItem key={i} text={headline} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'headlines' && !data.headlines && (
          <p className="text-sm text-dark-textMuted">Headlines nao disponiveis para esta analise.</p>
        )}
      </div>
    </section>
  );
}
