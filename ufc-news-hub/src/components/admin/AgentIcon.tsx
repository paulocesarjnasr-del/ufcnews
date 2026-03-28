import {
  Crown,
  Shield,
  Newspaper,
  BarChart3,
  Settings,
  PenTool,
  Flame,
  Earth,
  Eye,
  TrendingUp,
  Radio,
  Dog,
  Scale,
  HeartPulse,
  FileText,
  Swords,
  CalendarDays,
  Target,
  MessageSquare,
  Monitor,
  ListTodo,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  AlertTriangle,
  Hand,
  CornerDownLeft,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Crown,
  Shield,
  Newspaper,
  BarChart3,
  Settings,
  PenTool,
  Flame,
  Earth,
  Eye,
  TrendingUp,
  Radio,
  Dog,
  Scale,
  HeartPulse,
  FileText,
  Swords,
  CalendarDays,
  Target,
  MessageSquare,
  Monitor,
  ListTodo,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  AlertTriangle,
  Hand,
  CornerDownLeft,
  HelpCircle,
};

interface AgentIconProps {
  name: string;
  className?: string;
}

export function AgentIcon({ name, className = 'w-5 h-5' }: AgentIconProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
