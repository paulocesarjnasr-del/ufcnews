'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAdminAuth } from '../AdminAuthContext';
import { DashboardSidebar, type SectionId } from './DashboardSidebar';
import { DashboardTopBar } from './DashboardTopBar';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

function SectionFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 animate-spin text-ufc-red" />
    </div>
  );
}

// Dynamic imports so each section is its own chunk
const OverviewSection = dynamic(() => import('./sections/OverviewSection').then(m => ({ default: m.OverviewSection })), { loading: () => <SectionFallback /> });
const ClientesSection = dynamic(() => import('./sections/ClientesSection').then(m => ({ default: m.ClientesSection })), { loading: () => <SectionFallback /> });
const CardMonitorSection = dynamic(() => import('./sections/CardMonitorSection').then(m => ({ default: m.CardMonitorSection })), { loading: () => <SectionFallback /> });
const PipelineSection = dynamic(() => import('./sections/PipelineSection').then(m => ({ default: m.PipelineSection })), { loading: () => <SectionFallback /> });
const AICompanySection = dynamic(() => import('./sections/AICompanySection').then(m => ({ default: m.AICompanySection })), { loading: () => <SectionFallback /> });
const LandingPageSection = dynamic(() => import('./sections/LandingPageSection').then(m => ({ default: m.LandingPageSection })), { loading: () => <SectionFallback /> });
const SiteVercelSection = dynamic(() => import('./sections/SiteVercelSection').then(m => ({ default: m.SiteVercelSection })), { loading: () => <SectionFallback /> });

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { logout } = useAdminAuth();

  const sectionParam = (searchParams.get('section') || 'overview') as SectionId;
  const validSections: SectionId[] = [
    'overview', 'clientes', 'card-monitor', 'pipeline',
    'ai-company', 'landing-page', 'site-vercel',
  ];
  const activeSection = validSections.includes(sectionParam) ? sectionParam : 'overview';

  const [collapsed, setCollapsed] = useState(false);

  // Restore collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-sidebar-collapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  const handleToggleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('dashboard-sidebar-collapsed', String(next));
      return next;
    });
  }, []);

  const handleSectionChange = useCallback((section: SectionId) => {
    router.push(`/admin?section=${section}`);
  }, [router]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        onLogout={handleLogout}
      />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-56'}`}
      >
        <DashboardTopBar activeSection={activeSection} />

        <main className="p-6">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'clientes' && <ClientesSection />}
          {activeSection === 'card-monitor' && <CardMonitorSection />}
          {activeSection === 'pipeline' && <PipelineSection />}
          {activeSection === 'ai-company' && <AICompanySection />}
          {activeSection === 'landing-page' && <LandingPageSection />}
          {activeSection === 'site-vercel' && <SiteVercelSection />}
        </main>
      </div>
    </div>
  );
}

export function DashboardShell() {
  return (
    <Suspense fallback={<SectionFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
