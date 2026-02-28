'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useNoticia } from '@/hooks/useNoticias';
import { formatDate } from '@/lib/utils';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Noticia } from '@/types';
import { CommentSection } from '@/components/comments/CommentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{ id: string }>;
}

function PollWidget({ poll }: { poll: { question: string; options: string[]; relatedEvent?: string } }) {
  const [voted, setVoted] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>(() => poll.options.map(() => Math.floor(Math.random() * 50) + 5));
  const total = votes.reduce((a, b) => a + b, 0);

  const handleVote = (idx: number) => {
    if (voted !== null) return;
    setVoted(idx);
    setVotes(prev => prev.map((v, i) => i === idx ? v + 1 : v));
  };

  return (
    <div className="mb-8">
      <div className="neu-card p-6">
        <h2 className="font-display text-xl uppercase text-dark-text mb-4">{poll.question}</h2>
        <div className="space-y-3">
          {poll.options.map((opt, i) => {
            const pct = total > 0 ? Math.round((votes[i] / (total + (voted !== null ? 1 : 0))) * 100) : 0;
            return (
              <button
                key={i}
                onClick={() => handleVote(i)}
                disabled={voted !== null}
                className={`w-full text-left rounded-lg p-3 transition-all relative overflow-hidden ${
                  voted === i
                    ? 'border-2 border-ufc-red bg-ufc-red/10'
                    : voted !== null
                    ? 'border border-dark-border bg-dark-card/50'
                    : 'border border-dark-border bg-dark-card hover:border-ufc-red/50 cursor-pointer'
                }`}
              >
                {voted !== null && (
                  <div
                    className="absolute inset-0 bg-ufc-red/10 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <span className="text-sm text-dark-text font-medium">{opt}</span>
                  {voted !== null && (
                    <span className="text-sm font-bold text-dark-textMuted ml-2">{pct}%</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {voted !== null && (
          <p className="text-xs text-dark-textMuted mt-3">{total + 1} votos</p>
        )}
        {poll.relatedEvent && (
          <p className="text-xs text-dark-textMuted mt-2">{poll.relatedEvent}</p>
        )}
      </div>
    </div>
  );
}

// Strip emojis from headings for clean professional look
function stripEmojis(node: React.ReactNode): React.ReactNode {
  if (typeof node === 'string') {
    return node.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1FAFF}]/gu, '').trim();
  }
  return node;
}

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-display text-3xl uppercase tracking-wide text-dark-text mt-8 mb-4">{stripEmojis(children)}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-display text-2xl uppercase tracking-wide text-ufc-red mt-10 mb-4 border-l-4 border-ufc-red pl-4">{stripEmojis(children)}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-display text-xl uppercase tracking-wide text-dark-text mt-6 mb-3">{stripEmojis(children)}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-lg leading-relaxed text-dark-text mb-4">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-ufc-red font-bold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="text-dark-textMuted italic">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-ufc-red underline hover:text-ufc-redDark" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-dark-text">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 text-dark-text">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-lg leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-ufc-red pl-4 my-4 italic text-dark-textMuted">{children}</blockquote>
  ),
  hr: () => (
    <hr className="my-8 border-dark-border" />
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-dark-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-dark-card border-b border-dark-border">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-bold text-ufc-red uppercase text-xs tracking-wider">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-dark-text border-t border-dark-border/50">{children}</td>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="hover:bg-dark-cardHover/30 transition-colors">{children}</tr>
  ),
};

function ArticleContent({ content, fallback }: { content?: string | null; fallback?: string | null }) {
  const text = content || fallback || '';

  // Detect standalone poll JSON (old format)
  if (text.startsWith('{')) {
    try {
      const parsed = JSON.parse(text);
      if (parsed.type === 'poll' && parsed.options) {
        return <PollWidget poll={parsed} />;
      }
    } catch { /* not JSON, render as text */ }
  }

  // Split content into segments: markdown text and embedded polls
  const pollRegex = /<!-- POLL:(.*?) -->/g;
  const segments: Array<{ type: 'markdown' | 'poll'; content: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = pollRegex.exec(text)) !== null) {
    // Add markdown before this poll
    if (match.index > lastIndex) {
      segments.push({ type: 'markdown', content: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'poll', content: match[1] });
    lastIndex = match.index + match[0].length;
  }
  // Add remaining markdown after last poll
  if (lastIndex < text.length) {
    segments.push({ type: 'markdown', content: text.slice(lastIndex) });
  }

  // Also detect old-style markdown polls (## 📊 ENQUETE: ...)
  const processedSegments: Array<{ type: 'markdown' | 'poll'; content: string }> = [];
  for (const seg of segments) {
    if (seg.type === 'markdown') {
      const enqueteRegex = /---\s*\n+## 📊 ENQUETE: (.+?)\n\n((?:\d+\. .+\n?)+)/g;
      let segLastIndex = 0;
      let enqueteMatch;
      while ((enqueteMatch = enqueteRegex.exec(seg.content)) !== null) {
        if (enqueteMatch.index > segLastIndex) {
          processedSegments.push({ type: 'markdown', content: seg.content.slice(segLastIndex, enqueteMatch.index) });
        }
        const question = enqueteMatch[1];
        const options = enqueteMatch[2].trim().split('\n').map(l => l.replace(/^\d+\.\s*/, ''));
        processedSegments.push({ type: 'poll', content: JSON.stringify({ question, options }) });
        segLastIndex = enqueteMatch.index + enqueteMatch[0].length;
      }
      if (segLastIndex < seg.content.length) {
        processedSegments.push({ type: 'markdown', content: seg.content.slice(segLastIndex) });
      }
    } else {
      processedSegments.push(seg);
    }
  }

  const finalSegments = processedSegments.length > 0 ? processedSegments : segments.length > 0 ? segments : [{ type: 'markdown' as const, content: text }];

  // Markdown content
  const hasMarkdown = text.includes('#') || text.includes('**') || text.includes('|');

  if (!hasMarkdown && finalSegments.length === 1 && finalSegments[0].type === 'markdown') {
    return (
      <div className="mb-8">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-dark-text">{text}</p>
      </div>
    );
  }

  return (
    <div className="mb-8 max-w-none">
      {finalSegments.map((seg, i) => {
        if (seg.type === 'poll') {
          try {
            const pollData = JSON.parse(seg.content);
            return <PollWidget key={`poll-${i}`} poll={pollData} />;
          } catch {
            return null;
          }
        }
        const trimmed = seg.content.trim();
        if (!trimmed) return null;
        return (
          <div key={`md-${i}`} className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{trimmed}</ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
}

export default function NoticiaPage({ params }: PageProps) {
  const { id } = use(params);
  const { noticia, isLoading, error } = useNoticia(id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error || !noticia) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-2xl font-bold text-dark-text">
            Noticia nao encontrada
          </h1>
          <p className="mb-6 text-dark-textMuted">
            A noticia que voce procura nao existe ou foi removida.
          </p>
          <Link
            href="/noticias"
            className="rounded-md bg-ufc-red px-4 py-2 text-white transition-colors hover:bg-ufc-redDark"
          >
            Voltar para Noticias
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/noticias"
            className="group mb-4 inline-flex items-center gap-2 text-dark-textMuted transition-colors hover:text-ufc-red"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Voltar</span>
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <CategoryBadge categoria={noticia.categoria} />
          </div>
        </div>

        {/* Imagem Hero */}
        <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
          <Image
            src={noticia.imagem_url || PLACEHOLDER_IMAGE}
            alt={noticia.titulo}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Titulo */}
        <h1 className="mb-4 font-display text-3xl uppercase leading-tight text-dark-text md:text-4xl lg:text-5xl">
          {noticia.titulo}
        </h1>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-dark-textMuted">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(noticia.publicado_em)}
          </span>

          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <TimeAgo date={noticia.publicado_em} />
          </span>

          {noticia.fonte_nome === 'UFC AI Company' ? (
            <span className="flex items-center gap-1 text-ufc-red font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Por Lucas Braga — UFC News
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              {noticia.fonte_nome}
            </span>
          )}
        </div>

        {/* Audio Player — só para artigos com conteúdo completo */}
        {noticia.conteudo_completo && (
          <AudioPlayer noticiaId={noticia.id} />
        )}

        {/* Separador */}
        <hr className="mb-6 border-dark-border" />

        {/* Conteudo */}
        <ArticleContent content={noticia.conteudo_completo} fallback={noticia.subtitulo} />

        {/* Separador */}
        <hr className="mb-6 border-dark-border" />

        {/* Fonte Original — só mostra para notícias de outros sites */}
        {noticia.fonte_nome !== 'UFC AI Company' && (
          <section className="mb-8">
            <a
              href={noticia.fonte_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-dark-border px-4 py-2 text-sm text-dark-textMuted transition-all hover:border-ufc-red hover:text-ufc-red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Ver noticia original em {noticia.fonte_nome}
            </a>
          </section>
        )}

        {/* Separador */}
        <hr className="mb-8 border-dark-border" />

        {/* Separador antes dos comentários */}
        <hr className="my-8 border-dark-border" />

        {/* Seção de Comentários */}
        <CommentSection noticiaId={noticia.id} />
      </article>
    </MainLayout>
  );
}
