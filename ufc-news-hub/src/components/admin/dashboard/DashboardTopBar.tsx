'use client';

import { NAV_ITEMS, type SectionId } from './DashboardSidebar';

interface DashboardTopBarProps {
  activeSection: SectionId;
}

export function DashboardTopBar({ activeSection }: DashboardTopBarProps) {
  const current = NAV_ITEMS.find((item) => item.id === activeSection);
  const Icon = current?.icon;

  return (
    <header className="h-14 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-sm flex items-center px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-ufc-red" />}
        <h1 className="text-white font-display text-xl tracking-wide">
          {current?.label || 'Dashboard'}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span className="text-xs text-gray-500">
          Admin Dashboard
        </span>
      </div>
    </header>
  );
}
