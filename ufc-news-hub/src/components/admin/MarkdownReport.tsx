'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownReportProps {
  content: string;
}

const components: Components = {
  // Headers
  h1: ({ children }) => (
    <h1 className="text-ufc-red text-lg font-bold mt-4 mb-2 pb-1 border-b border-ufc-red/20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-ufc-red text-base font-bold mt-4 mb-1.5">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-dark-text text-sm font-bold mt-3 mb-1">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-dark-text text-xs font-bold mt-2 mb-1 uppercase tracking-wider">
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="text-dark-textMuted text-xs leading-relaxed mb-2">
      {children}
    </p>
  ),

  // Bold / Italic
  strong: ({ children }) => (
    <strong className="text-dark-text font-bold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-dark-textMuted italic">{children}</em>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="space-y-1 mb-2 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1 mb-2 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-dark-textMuted text-xs leading-relaxed flex items-start gap-1.5">
      <span className="text-ufc-red/60 mt-0.5 shrink-0">•</span>
      <span className="flex-1">{children}</span>
    </li>
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-3 rounded-xl neu-inset">
      <table className="w-full text-xs border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ufc-red/10 border-b border-ufc-red/20">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-dark-border/30">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-dark-cardHover/50 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-[10px] font-bold text-ufc-red uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-xs text-dark-textMuted whitespace-nowrap">
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="border-dark-border/50 my-3" />
  ),

  // Blockquote (used for alerts/callouts)
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-ufc-red/40 pl-3 my-2 bg-ufc-red/5 rounded-r-lg py-2 pr-3">
      {children}
    </blockquote>
  ),

  // Code (inline + block)
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <pre className="neu-inset rounded-xl p-3 my-2 overflow-x-auto">
          <code className="text-[11px] text-dark-text font-mono leading-relaxed">
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code className="bg-dark-bg/80 text-ufc-red px-1.5 py-0.5 rounded text-[11px] font-mono">
        {children}
      </code>
    );
  },

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ufc-red hover:text-ufc-red/80 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
};

export function MarkdownReport({ content }: MarkdownReportProps) {
  return (
    <div className="markdown-report">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
