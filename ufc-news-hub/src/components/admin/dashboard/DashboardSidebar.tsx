'use client';

import {
  LayoutDashboard,
  Users,
  Shield,
  GitBranch,
  Bot,
  Earth,
  Server,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Newspaper,
  Calendar,
  Swords,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export type SectionId =
  | 'overview'
  | 'clientes'
  | 'card-monitor'
  | 'pipeline'
  | 'ai-company'
  | 'landing-page'
  | 'site-vercel';

interface NavItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'card-monitor', label: 'Card Monitor', icon: Shield },
  { id: 'pipeline', label: 'Pipeline Clientes', icon: GitBranch },
  { id: 'ai-company', label: 'AI Company', icon: Bot },
  { id: 'landing-page', label: 'Landing Page', icon: Earth },
  { id: 'site-vercel', label: 'Site / Vercel', icon: Server },
];

interface DashboardSidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

export function DashboardSidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse,
  onLogout,
}: DashboardSidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-40
        bg-[#0d0d14] border-r border-[#1e1e2e]
        flex flex-col transition-all duration-300
        ${collapsed ? 'w-16' : 'w-56'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[#1e1e2e] shrink-0">
        <div className="w-8 h-8 bg-ufc-red/20 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-ufc-red font-bold text-sm">U</span>
        </div>
        {!collapsed && (
          <span className="font-display text-white text-lg tracking-wide truncate">
            UFC HUB
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              title={collapsed ? item.label : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-200 group relative
                ${isActive
                  ? 'bg-ufc-red/10 text-ufc-red'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a2e]'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-ufc-red rounded-r" />
              )}
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-ufc-red' : ''}`} />
              {!collapsed && (
                <span className={`text-sm truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Site Content Links (admin-only, requires cookie) */}
      {!collapsed && (
        <div className="px-2 pb-2 border-t border-[#1e1e2e] pt-3">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">
            Conteudo do Site
          </p>
          <div className="space-y-0.5">
            {[
              { href: '/noticias', label: 'Noticias', icon: Newspaper },
              { href: '/calendario', label: 'Calendario', icon: Calendar },
              { href: '/lutadores', label: 'Lutadores', icon: Swords },
              { href: '/analises', label: 'Analises', icon: Trophy },
              { href: '/enterprise', label: 'Enterprise', icon: Earth },
            ].map((link) => {
              const LinkIcon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-[#1a1a2e] transition-colors text-xs"
                >
                  <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="px-2 pb-4 space-y-1 border-t border-[#1e1e2e] pt-4">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-[#1a1a2e] transition-colors"
          title={collapsed ? 'Expandir' : 'Recolher'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="text-sm">Recolher</span>
            </>
          )}
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          title={collapsed ? 'Sair' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Sair</span>}
        </button>
      </div>
    </aside>
  );
}

export { NAV_ITEMS };
