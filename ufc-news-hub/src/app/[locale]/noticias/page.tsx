'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { ReelsContainer } from '@/components/reels/ReelsContainer';

export default function NoticiasPage() {
  return (
    <>
      {/* Mobile: full-screen reels, no header/padding */}
      <div className="md:hidden">
        <ReelsContainer />
      </div>

      {/* Desktop: normal layout with header */}
      <div className="hidden md:block">
        <MainLayout>
          <ReelsContainer />
        </MainLayout>
      </div>
    </>
  );
}
