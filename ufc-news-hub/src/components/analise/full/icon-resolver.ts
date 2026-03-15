import {
  TrendingUp, Target, Shield, Swords, AlertTriangle, Eye, Zap, Clock,
  Activity, Brain, MapPin, BarChart3, MessageCircle, Video, ArrowRight,
  Flame, Crosshair,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp, Target, Shield, Swords, AlertTriangle, Eye, Zap, Clock,
  Activity, Brain, MapPin, BarChart3, MessageCircle, Video, ArrowRight,
  Flame, Crosshair,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Target;
}
