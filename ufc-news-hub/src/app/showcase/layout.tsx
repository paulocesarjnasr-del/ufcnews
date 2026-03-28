import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFC Fight Analysis | Powered by AI',
  description: 'AI-powered pre-fight analysis with deep statistical breakdowns, prediction models, and betting insights.',
  openGraph: {
    title: 'UFC Fight Analysis | AI-Powered Intelligence',
    description: 'Deep pre-fight analysis with statistics, predictions, and betting insights.',
    type: 'website',
    siteName: 'UFC News Hub',
  },
  robots: { index: false, follow: false },
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <NextIntlClientProvider locale="en" messages={enMessages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
