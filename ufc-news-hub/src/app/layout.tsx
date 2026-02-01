import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Bebas Neue para títulos (estilo UFC)
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UFC News Hub - Noticias, Previsoes e Rankings do UFC',
  description:
    'A plataforma #1 para fas de UFC no Brasil. Noticias em tempo real, Arena de Previsoes, Calendario de Eventos e Rankings.',
  keywords: ['UFC', 'MMA', 'noticias', 'lutadores', 'lutas', 'previsoes', 'ranking', 'Dana White'],
  authors: [{ name: 'UFC News Hub' }],
  manifest: '/manifest.json',
  themeColor: '#D20A0A',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'UFC News',
  },
  openGraph: {
    title: 'UFC News Hub',
    description: 'A plataforma #1 para fas de UFC no Brasil',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'UFC News Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UFC News Hub',
    description: 'A plataforma #1 para fas de UFC no Brasil',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bebasNeue.variable} dark`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-body min-h-screen bg-dark-bg text-dark-text">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registered:', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
