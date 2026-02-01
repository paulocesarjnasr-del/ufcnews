'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/ui/Header';
import { TabNavigation } from '@/components/ui/TabNavigation';
import { ContadorCategorias } from '@/types';

interface MainLayoutProps {
  children: ReactNode;
  contadores?: ContadorCategorias;
}

export function MainLayout({ children, contadores }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <TabNavigation contadores={contadores} />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
