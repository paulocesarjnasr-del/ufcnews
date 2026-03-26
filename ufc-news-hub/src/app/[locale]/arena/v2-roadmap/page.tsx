'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Shield,
  Lock,
  Key,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Code2,
  Server,
  Database,
  Layers,
  Cookie,
  Fingerprint,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Clock,
  Users,
  Trophy,
  Swords,
  BarChart3,
  Settings,
  Layout,
  Smartphone,
  Globe,
  Download,
  Loader2,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

type SectionStatus = 'planning' | 'in-progress' | 'done' | 'blocked';

interface RoadmapSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: SectionStatus;
  statusLabel: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
}

// ═══════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════

function useRoadmapSections(): RoadmapSection[] {
  const t = useTranslations('arena');
  return [
    {
      id: 'login',
      title: 'Login & Auth',
      subtitle: t('roadmap_login_subtitle'),
      icon: <Lock className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P0',
    },
    {
      id: 'registro',
      title: t('roadmap_registro'),
      subtitle: t('roadmap_registro_subtitle'),
      icon: <Users className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P0',
    },
    {
      id: 'layout',
      title: t('roadmap_layout'),
      subtitle: t('roadmap_layout_subtitle'),
      icon: <Layout className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P1',
    },
    {
      id: 'previsoes',
      title: t('roadmap_predictions'),
      subtitle: t('roadmap_predictions_subtitle'),
      icon: <Swords className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P1',
    },
    {
      id: 'perfil',
      title: t('roadmap_profile'),
      subtitle: t('roadmap_profile_subtitle'),
      icon: <Fingerprint className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P2',
    },
    {
      id: 'ligas',
      title: t('roadmap_leagues'),
      subtitle: t('roadmap_leagues_subtitle'),
      icon: <Trophy className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P2',
    },
    {
      id: 'live',
      title: t('roadmap_live'),
      subtitle: t('roadmap_live_subtitle'),
      icon: <Zap className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P3',
    },
    {
      id: 'analytics',
      title: t('roadmap_analytics'),
      subtitle: t('roadmap_analytics_subtitle'),
      icon: <BarChart3 className="h-5 w-5" />,
      status: 'planning',
      statusLabel: t('roadmap_status_planning'),
      priority: 'P3',
    },
  ];
}

// ═══════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════

function StatusBadge({ status, label }: { status: SectionStatus; label: string }) {
  const colors: Record<SectionStatus, string> = {
    planning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    done: 'bg-green-500/20 text-green-400 border-green-500/30',
    blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${
        status === 'planning' ? 'bg-yellow-400' :
        status === 'in-progress' ? 'bg-blue-400 animate-pulse' :
        status === 'done' ? 'bg-green-400' : 'bg-red-400'
      }`} />
      {label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    P0: 'bg-red-500/20 text-red-400',
    P1: 'bg-orange-500/20 text-orange-400',
    P2: 'bg-blue-500/20 text-blue-400',
    P3: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${colors[priority] || colors.P3}`}>
      {priority}
    </span>
  );
}

function BeforeAfterBlock({
  title,
  before,
  after,
  icon,
}: {
  title: string;
  before: { label: string; code: string; issues: string[] };
  after: { label: string; code: string; benefits: string[] };
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-dark-textMuted uppercase tracking-wider">
        {icon}
        {title}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-4 w-4 text-red-400" />
            <span className="text-sm font-bold text-red-400 uppercase">{before.label}</span>
          </div>
          <pre className="rounded-lg bg-black/40 p-3 text-xs text-gray-300 overflow-x-auto font-mono leading-relaxed">
            {before.code}
          </pre>
          <div className="mt-3 space-y-1.5">
            {before.issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-red-300/80">
                <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0 text-red-400" />
                {issue}
              </div>
            ))}
          </div>
        </div>

        {/* AFTER */}
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span className="text-sm font-bold text-green-400 uppercase">{after.label}</span>
          </div>
          <pre className="rounded-lg bg-black/40 p-3 text-xs text-gray-300 overflow-x-auto font-mono leading-relaxed">
            {after.code}
          </pre>
          <div className="mt-3 space-y-1.5">
            {after.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-green-300/80">
                <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-green-400" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram({
  title,
  steps,
}: {
  title: string;
  steps: { label: string; detail: string; icon: React.ReactNode; color: string }[];
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-dark-textMuted uppercase tracking-wider">{title}</h4>
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${step.color}`}>
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-dark-text">{step.label}</div>
              <div className="text-xs text-dark-textMuted truncate">{step.detail}</div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-dark-textMuted/50 shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolCard({
  name,
  purpose,
  install,
  icon,
}: {
  name: string;
  purpose: string;
  install: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="neu-card p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-display text-sm uppercase text-dark-text">{name}</span>
      </div>
      <p className="text-xs text-dark-textMuted">{purpose}</p>
      <code className="block rounded bg-black/30 px-2 py-1 text-[11px] text-green-400 font-mono">
        {install}
      </code>
    </div>
  );
}

function LayerSection({
  layerName,
  icon,
  color,
  children,
}: {
  layerName: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border ${color} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-display text-base uppercase tracking-wide text-dark-text">
            {layerName}
          </span>
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 text-dark-textMuted" />
        ) : (
          <ChevronRight className="h-4 w-4 text-dark-textMuted" />
        )}
      </button>
      {open && <div className="border-t border-dark-border/30 p-4 space-y-6">{children}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Login Section (Full Plan)
// ═══════════════════════════════════════════════════════════════

function LoginPlan() {
  const t = useTranslations('arena');
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="rounded-xl border border-ufc-red/30 bg-gradient-to-br from-ufc-red/10 to-transparent p-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-6 w-6 text-ufc-red" />
          <h3 className="font-display text-2xl uppercase text-dark-text">
            Login & Auth <span className="text-ufc-red">v2.0</span>
          </h3>
        </div>
        <p className="text-sm text-dark-textMuted leading-relaxed max-w-2xl">
          {t('roadmap_login_desc')}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status="planning" label={t('roadmap_status_in_planning')} />
          <PriorityBadge priority="P0" />
          <span className="rounded-full border border-dark-border/50 px-2.5 py-0.5 text-xs text-dark-textMuted">
            {t('roadmap_files_impacted', { count: 3 })}
          </span>
          <span className="rounded-full border border-dark-border/50 px-2.5 py-0.5 text-xs text-dark-textMuted">
            ~400 {t('roadmap_lines')}
          </span>
        </div>
      </div>

      {/* Ferramentas / Dependencias */}
      <div className="space-y-3">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <Settings className="h-4 w-4 text-ufc-red" />
          {t('roadmap_tools_deps')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolCard
            name="bcrypt"
            purpose={t('roadmap_bcrypt_purpose')}
            install="npm install bcrypt @types/bcrypt"
            icon={<Key className="h-4 w-4 text-yellow-400" />}
          />
          <ToolCard
            name="jose"
            purpose={t('roadmap_jose_purpose')}
            install="npm install jose"
            icon={<Shield className="h-4 w-4 text-blue-400" />}
          />
          <ToolCard
            name="rate-limiter"
            purpose={t('roadmap_ratelimiter_purpose')}
            install={t('roadmap_ratelimiter_install')}
            icon={<ShieldAlert className="h-4 w-4 text-red-400" />}
          />
        </div>
      </div>

      {/* Medidas de Seguranca */}
      <div className="space-y-4">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-ufc-red" />
          {t('roadmap_security_measures')}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: t('roadmap_sec_bcrypt_title'),
              desc: t('roadmap_sec_bcrypt_desc'),
              severity: t('roadmap_severity_critical'),
              severityClass: 'critico',
              icon: <Key className="h-4 w-4" />,
            },
            {
              title: t('roadmap_sec_jwt_title'),
              desc: t('roadmap_sec_jwt_desc'),
              severity: t('roadmap_severity_critical'),
              severityClass: 'critico',
              icon: <Shield className="h-4 w-4" />,
            },
            {
              title: t('roadmap_sec_ratelimit_title'),
              desc: t('roadmap_sec_ratelimit_desc'),
              severity: t('roadmap_severity_high'),
              severityClass: 'alto',
              icon: <Clock className="h-4 w-4" />,
            },
            {
              title: t('roadmap_sec_cookie_title'),
              desc: t('roadmap_sec_cookie_desc'),
              severity: t('roadmap_severity_medium'),
              severityClass: 'medio',
              icon: <Cookie className="h-4 w-4" />,
            },
            {
              title: t('roadmap_sec_email_title'),
              desc: t('roadmap_sec_email_desc'),
              severity: t('roadmap_severity_medium'),
              severityClass: 'medio',
              icon: <Globe className="h-4 w-4" />,
            },
            {
              title: t('roadmap_sec_password_title'),
              desc: t('roadmap_sec_password_desc'),
              severity: t('roadmap_severity_medium'),
              severityClass: 'medio',
              icon: <Lock className="h-4 w-4" />,
            },
          ].map((item, i) => (
            <div key={i} className="neu-card p-4 flex gap-3">
              <div className={`mt-0.5 ${
                item.severityClass === 'critico' ? 'text-red-400' :
                item.severityClass === 'alto' ? 'text-orange-400' : 'text-yellow-400'
              }`}>
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-dark-text">{item.title}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    item.severityClass === 'critico' ? 'bg-red-500/20 text-red-400' :
                    item.severityClass === 'alto' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-dark-textMuted mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Camadas: React, API, DB */}
      <div className="space-y-3">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <Layers className="h-4 w-4 text-ufc-red" />
          {t('roadmap_implementation_by_layer')}
        </h4>

        {/* REACT / FRONTEND */}
        <LayerSection
          layerName="React / Frontend"
          icon={<Smartphone className="h-5 w-5 text-blue-400" />}
          color="border-blue-500/20"
        >
          <BeforeAfterBlock
            title={t('roadmap_login_form')}
            icon={<Code2 className="h-4 w-4" />}
            before={{
              label: t('roadmap_v1_current'),
              code: `// arena/login/page.tsx (atual)
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  // Sem validacao client-side
  const result = await login(email, senha);

  if (result.success) {
    router.push('/arena');
  } else {
    setError(result.error || 'Erro');
  }
  setIsLoading(false);
};

// Input sem feedback visual
<input type="email" ... />
<input type="password" ... />`,
              issues: [
                t('roadmap_login_issue_1'),
                t('roadmap_login_issue_2'),
                t('roadmap_login_issue_3'),
                t('roadmap_login_issue_4'),
                t('roadmap_login_issue_5'),
              ],
            }}
            after={{
              label: t('roadmap_v2_planned'),
              code: `// arena/login/page.tsx (v2.0)
const [showPassword, setShowPassword] = useState(false);
const [fieldErrors, setFieldErrors] = useState({});

const validateField = (field, value) => {
  if (field === 'email') {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(value)
      ? null : 'Email invalido';
  }
  if (field === 'senha') {
    return value.length >= 8
      ? null : 'Minimo 8 caracteres';
  }
};

// Inputs com feedback em tempo real
<div className={borderClass(fieldErrors.email)}>
  <input type="email" onBlur={validate} />
  {fieldErrors.email && <ErrorMsg />}
</div>

// Toggle mostrar senha
<button onClick={() => setShowPassword(!s)}>
  {showPassword ? <EyeOff /> : <Eye />}
</button>

// Rate limit feedback
{rateLimited && (
  <CountdownTimer seconds={remaining} />
)}`,
              benefits: [
                t('roadmap_login_benefit_1'),
                t('roadmap_login_benefit_2'),
                t('roadmap_login_benefit_3'),
                t('roadmap_login_benefit_4'),
                t('roadmap_login_benefit_5'),
              ],
            }}
          />

          <BeforeAfterBlock
            title={t('roadmap_hook_auth')}
            icon={<Code2 className="h-4 w-4" />}
            before={{
              label: t('roadmap_v1_current'),
              code: `// hooks/useArenaAuth.ts (atual)
const login = async (email, senha) => {
  const res = await fetch('/api/arena/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json();

  if (res.ok) {
    setState({ usuario: data.usuario, ... });
    return { success: true };
  }
  return { success: false, error: data.error };
};

// Logout ignora erros silenciosamente
const logout = async () => {
  try { await fetch('...logout'); } catch {}
  setState({ usuario: null, ... });
};`,
              issues: [
                t('roadmap_auth_issue_1'),
                t('roadmap_auth_issue_2'),
                t('roadmap_auth_issue_3'),
                t('roadmap_auth_issue_4'),
              ],
            }}
            after={{
              label: t('roadmap_v2_planned'),
              code: `// hooks/useArenaAuth.ts (v2.0)
interface AuthState {
  usuario: UsuarioArena | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  rateLimitedUntil: number | null; // timestamp
}

const login = async (email, senha) => {
  const res = await fetch('/api/arena/auth/login', ...);

  if (res.status === 429) {
    const retryAfter = res.headers.get('Retry-After');
    setState(s => ({
      ...s,
      rateLimitedUntil: Date.now() + Number(retryAfter) * 1000,
      error: 'Muitas tentativas. Aguarde.',
    }));
    return { success: false, rateLimited: true };
  }
  // ... resto da logica
};

// SWR para cache da sessao
const { data: usuario, mutate } = useSWR(
  '/api/arena/auth/me',
  fetcher,
  { revalidateOnFocus: true,
    dedupingInterval: 30000 }
);`,
              benefits: [
                t('roadmap_auth_benefit_1'),
                t('roadmap_auth_benefit_2'),
                t('roadmap_auth_benefit_3'),
                t('roadmap_auth_benefit_4'),
              ],
            }}
          />
        </LayerSection>

        {/* API / BACKEND */}
        <LayerSection
          layerName="API / Backend"
          icon={<Server className="h-5 w-5 text-green-400" />}
          color="border-green-500/20"
        >
          <ArchitectureDiagram
            title={t('roadmap_login_flow')}
            steps={[
              {
                label: 'POST /api/arena/auth/login',
                detail: t('roadmap_flow_receive'),
                icon: <Globe className="h-4 w-4 text-white" />,
                color: 'bg-blue-500/30',
              },
              {
                label: 'Rate Limiter Check',
                detail: t('roadmap_flow_ratelimit'),
                icon: <ShieldAlert className="h-4 w-4 text-white" />,
                color: 'bg-red-500/30',
              },
              {
                label: t('roadmap_flow_validation'),
                detail: t('roadmap_flow_validation_detail'),
                icon: <CheckCircle2 className="h-4 w-4 text-white" />,
                color: 'bg-yellow-500/30',
              },
              {
                label: t('roadmap_flow_query_db'),
                detail: 'queryOne: SELECT * FROM usuarios_arena WHERE email = $1',
                icon: <Database className="h-4 w-4 text-white" />,
                color: 'bg-purple-500/30',
              },
              {
                label: 'bcrypt.compare()',
                detail: t('roadmap_flow_bcrypt'),
                icon: <Key className="h-4 w-4 text-white" />,
                color: 'bg-orange-500/30',
              },
              {
                label: 'jose: SignJWT',
                detail: t('roadmap_flow_jwt'),
                icon: <Shield className="h-4 w-4 text-white" />,
                color: 'bg-green-500/30',
              },
              {
                label: 'Set-Cookie',
                detail: 'arena_token=JWT; HttpOnly; Secure; SameSite=Strict',
                icon: <Cookie className="h-4 w-4 text-white" />,
                color: 'bg-cyan-500/30',
              },
            ]}
          />

          <BeforeAfterBlock
            title={t('roadmap_password_hash')}
            icon={<Key className="h-4 w-4" />}
            before={{
              label: t('roadmap_v1_sha256'),
              code: `// lib/arena/auth.ts (atual)
async function hashSenha(senha: string) {
  const encoder = new TextEncoder();
  // Salt FIXO para todos os usuarios
  const data = encoder.encode(
    senha + process.env.AUTH_SECRET
        || 'arena-ufc-secret'
  );
  const hashBuffer = await crypto.subtle
    .digest('SHA-256', data);
  const hashArray = Array.from(
    new Uint8Array(hashBuffer)
  );
  return hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}`,
              issues: [
                t('roadmap_hash_issue_1'),
                t('roadmap_hash_issue_2'),
                t('roadmap_hash_issue_3'),
                t('roadmap_hash_issue_4'),
              ],
            }}
            after={{
              label: t('roadmap_v2_bcrypt'),
              code: `// lib/arena/auth.ts (v2.0)
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function hashSenha(
  senha: string
): Promise<string> {
  // Salt UNICO gerado automaticamente
  // por usuario — impossivel rainbow table
  return bcrypt.hash(senha, SALT_ROUNDS);
}

async function verificarSenha(
  senha: string,
  hash: string
): Promise<boolean> {
  // bcrypt extrai o salt do proprio hash
  return bcrypt.compare(senha, hash);
}

// Hash resultante (~60 chars):
// $2b$10$N9qo8uLOickgx2ZMRZoMye...`,
              benefits: [
                t('roadmap_hash_benefit_1'),
                t('roadmap_hash_benefit_2'),
                t('roadmap_hash_benefit_3'),
                t('roadmap_hash_benefit_4'),
              ],
            }}
          />

          <BeforeAfterBlock
            title={t('roadmap_session_token')}
            icon={<Shield className="h-4 w-4" />}
            before={{
              label: t('roadmap_v1_base64'),
              code: `// lib/arena/auth.ts (atual)
function gerarToken(usuarioId: string) {
  const payload = {
    id: usuarioId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  // QUALQUER UM pode decodificar e forjar
  return Buffer.from(
    JSON.stringify(payload)
  ).toString('base64');
}

function verificarToken(token: string) {
  const json = Buffer.from(token, 'base64')
    .toString('utf-8');
  const payload = JSON.parse(json);
  // So checa expiracao — SEM verificacao
  // de assinatura!
  if (payload.exp < Date.now()) return null;
  return { id: payload.id };
}`,
              issues: [
                t('roadmap_token_issue_1'),
                t('roadmap_token_issue_2'),
                t('roadmap_token_issue_3'),
                t('roadmap_token_issue_4'),
              ],
            }}
            after={{
              label: t('roadmap_v2_jwt'),
              code: `// lib/arena/auth.ts (v2.0)
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET // obrigatorio em prod
);

async function gerarToken(
  usuarioId: string
): Promise<string> {
  return new SignJWT({ sub: usuarioId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

async function verificarToken(
  token: string
): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(
      token, JWT_SECRET
    );
    return payload as { sub: string };
  } catch {
    return null; // expirado ou invalido
  }
}`,
              benefits: [
                t('roadmap_token_benefit_1'),
                t('roadmap_token_benefit_2'),
                t('roadmap_token_benefit_3'),
                t('roadmap_token_benefit_4'),
              ],
            }}
          />

          <BeforeAfterBlock
            title="Rate Limiting"
            icon={<ShieldAlert className="h-4 w-4" />}
            before={{
              label: t('roadmap_v1_none'),
              code: `// NADA implementado.
// Qualquer um pode tentar infinitas
// combinacoes de email/senha.
//
// Ataque de forca bruta:
// 1000 tentativas/segundo = possivel
// nenhum feedback de bloqueio`,
              issues: [
                t('roadmap_rate_issue_1'),
                t('roadmap_rate_issue_2'),
                t('roadmap_rate_issue_3'),
                t('roadmap_rate_issue_4'),
              ],
            }}
            after={{
              label: t('roadmap_v2_sliding_window'),
              code: `// lib/arena/rate-limiter.ts (v2.0)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();

const LIMITS = {
  perEmail: { max: 5, windowMs: 15 * 60 * 1000 },
  perIP:    { max: 20, windowMs: 15 * 60 * 1000 },
};

export function checkRateLimit(
  ip: string, email: string
): { allowed: boolean; retryAfter?: number } {
  const emailKey = \`login:email:\${email}\`;
  const ipKey = \`login:ip:\${ip}\`;

  // Checa ambos os limites
  for (const [key, limit] of [
    [emailKey, LIMITS.perEmail],
    [ipKey, LIMITS.perIP],
  ]) {
    const entry = loginAttempts.get(key);
    if (entry && entry.count >= limit.max) {
      const retryAfter = Math.ceil(
        (entry.resetAt - Date.now()) / 1000
      );
      return { allowed: false, retryAfter };
    }
  }
  return { allowed: true };
}`,
              benefits: [
                t('roadmap_rate_benefit_1'),
                t('roadmap_rate_benefit_2'),
                t('roadmap_rate_benefit_3'),
                t('roadmap_rate_benefit_4'),
              ],
            }}
          />
        </LayerSection>

        {/* DATABASE */}
        <LayerSection
          layerName="Database"
          icon={<Database className="h-5 w-5 text-purple-400" />}
          color="border-purple-500/20"
        >
          <BeforeAfterBlock
            title={t('roadmap_db_column')}
            icon={<Database className="h-4 w-4" />}
            before={{
              label: 'v1.0 — SHA-256 hex (64 chars)',
              code: `-- Formato atual do hash:
-- 64 caracteres hex (SHA-256)
SELECT senha_hash FROM usuarios_arena
WHERE email = 'user@email.com';

-- Resultado:
-- 'a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5
--  d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'

-- Todos os usuarios com mesma senha
-- tem o MESMO hash (salt fixo)`,
              issues: [
                t('roadmap_db_issue_1'),
                t('roadmap_db_issue_2'),
                t('roadmap_db_issue_3'),
              ],
            }}
            after={{
              label: 'v2.0 — bcrypt hash (60 chars)',
              code: `-- Formato novo do hash:
-- 60 caracteres com salt embutido
SELECT senha_hash FROM usuarios_arena
WHERE email = 'user@email.com';

-- Resultado:
-- '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZA
--  gQb3Q/3H.YQ/7v0F6OpWC1AeHpS'
--   ^    ^  ^-- salt unico (22 chars)
--   |    +-- cost factor (10 rounds)
--   +-- algoritmo (2b = bcrypt)

-- Migracao: rodar script que re-hash
-- senhas no proximo login de cada user`,
              benefits: [
                t('roadmap_db_benefit_1'),
                t('roadmap_db_benefit_2'),
                t('roadmap_db_benefit_3'),
                t('roadmap_db_benefit_4'),
              ],
            }}
          />

          <div className="neu-card p-4 space-y-3">
            <h5 className="text-sm font-medium text-dark-text flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-400" />
              {t('roadmap_migration_strategy')}
            </h5>
            <div className="space-y-2 text-xs text-dark-textMuted leading-relaxed">
              <p>
                <strong className="text-dark-text">{t('roadmap_migration_problem_label')}:</strong> {t('roadmap_migration_problem')}
              </p>
              <div className="rounded-lg bg-black/30 p-3 font-mono text-green-400 text-[11px]">
{`// No login, detectar formato do hash:
async function loginUsuario(email, senha) {
  const user = await queryOne(
    'SELECT * FROM usuarios_arena WHERE email = $1',
    [email]
  );

  // Hash antigo = 64 chars hex (SHA-256)
  if (user.senha_hash.length === 64) {
    // Verificar com SHA-256 antigo
    const oldHash = await hashSenhaLegacy(senha);
    if (oldHash !== user.senha_hash) {
      return { error: 'Credenciais invalidas' };
    }
    // Re-hash com bcrypt e salvar
    const newHash = await bcrypt.hash(senha, 10);
    await query(
      'UPDATE usuarios_arena SET senha_hash = $1 WHERE id = $2',
      [newHash, user.id]
    );
  } else {
    // Hash novo = bcrypt (comeca com $2b$)
    const valid = await bcrypt.compare(
      senha, user.senha_hash
    );
    if (!valid) {
      return { error: 'Credenciais invalidas' };
    }
  }
  // ... gerar JWT e retornar
}`}
              </div>
              <p>
                <strong className="text-dark-text">{t('roadmap_migration_result_label')}:</strong> {t('roadmap_migration_result')}
              </p>
            </div>
          </div>
        </LayerSection>
      </div>

      {/* Arquivos Impactados */}
      <div className="space-y-3">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <Code2 className="h-4 w-4 text-ufc-red" />
          {t('roadmap_files_title')}
        </h4>
        <div className="space-y-2">
          {[
            {
              file: 'src/lib/arena/auth.ts',
              action: t('roadmap_action_rewrite'),
              detail: 'hashSenha → bcrypt, gerarToken → jose JWT, verificarToken → jwtVerify, criarCookieToken → +Secure +Strict',
              color: 'text-red-400',
            },
            {
              file: 'src/app/api/arena/auth/login/route.ts',
              action: t('roadmap_action_modify'),
              detail: t('roadmap_file_login_detail'),
              color: 'text-orange-400',
            },
            {
              file: 'src/app/api/arena/auth/registro/route.ts',
              action: t('roadmap_action_modify'),
              detail: t('roadmap_file_registro_detail'),
              color: 'text-orange-400',
            },
            {
              file: 'src/app/arena/login/page.tsx',
              action: t('roadmap_action_modify'),
              detail: t('roadmap_file_login_page_detail'),
              color: 'text-yellow-400',
            },
            {
              file: 'src/app/arena/registro/page.tsx',
              action: t('roadmap_action_modify'),
              detail: t('roadmap_file_registro_page_detail'),
              color: 'text-yellow-400',
            },
            {
              file: 'src/hooks/useArenaAuth.ts',
              action: t('roadmap_action_modify'),
              detail: t('roadmap_file_hook_detail'),
              color: 'text-yellow-400',
            },
            {
              file: 'src/lib/arena/rate-limiter.ts',
              action: t('roadmap_action_create'),
              detail: t('roadmap_file_ratelimiter_detail'),
              color: 'text-green-400',
            },
          ].map((item, i) => (
            <div key={i} className="neu-card p-3 flex items-start gap-3">
              <span className={`text-xs font-bold uppercase shrink-0 mt-0.5 ${item.color}`}>
                {item.action}
              </span>
              <div className="min-w-0">
                <code className="text-sm text-dark-text font-mono">{item.file}</code>
                <p className="text-xs text-dark-textMuted mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist de Implementacao */}
      <div className="space-y-3">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-ufc-red" />
          {t('roadmap_implementation_order')}
        </h4>
        <div className="space-y-2">
          {[
            { step: 1, task: t('roadmap_step1_task'), detail: 'npm install bcrypt @types/bcrypt jose', done: false },
            { step: 2, task: t('roadmap_step2_task'), detail: t('roadmap_step2_detail'), done: false },
            { step: 3, task: t('roadmap_step3_task'), detail: 'Sliding window Map, checkRateLimit(), recordAttempt()', done: false },
            { step: 4, task: t('roadmap_step4_task'), detail: t('roadmap_step4_detail'), done: false },
            { step: 5, task: t('roadmap_step5_task'), detail: t('roadmap_step5_detail'), done: false },
            { step: 6, task: t('roadmap_step6_task'), detail: t('roadmap_step6_detail'), done: false },
            { step: 7, task: t('roadmap_step7_task'), detail: t('roadmap_step7_detail'), done: false },
            { step: 8, task: t('roadmap_step8_task'), detail: t('roadmap_step8_detail'), done: false },
            { step: 9, task: t('roadmap_step9_task'), detail: t('roadmap_step9_detail'), done: false },
            { step: 10, task: t('roadmap_step10_task'), detail: t('roadmap_step10_detail'), done: false },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                item.done
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-dark-border/50 text-dark-textMuted'
              }`}>
                {item.done ? <CheckCircle2 className="h-4 w-4" /> : item.step}
              </div>
              <div>
                <span className={`text-sm font-medium ${item.done ? 'text-green-400 line-through' : 'text-dark-text'}`}>
                  {item.task}
                </span>
                <p className="text-xs text-dark-textMuted mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Variables */}
      <div className="neu-card p-4 border border-yellow-500/20">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-bold text-yellow-400 uppercase">{t('roadmap_new_env_vars')}</span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-green-400">+</span>
            <span className="text-dark-text">JWT_SECRET</span>
            <span className="text-dark-textMuted">= &quot;{t('roadmap_env_generate')}: openssl rand -base64 32&quot;</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">~</span>
            <span className="text-dark-text">AUTH_SECRET</span>
            <span className="text-dark-textMuted">= {t('roadmap_env_auth_secret_note')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Placeholder sections
// ═══════════════════════════════════════════════════════════════

function ComingSoonSection({ title }: { title: string }) {
  const t = useTranslations('arena');
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="neu-inset rounded-full p-4 mb-4">
        <Clock className="h-8 w-8 text-dark-textMuted" />
      </div>
      <h3 className="font-display text-xl uppercase text-dark-textMuted mb-2">
        {title}
      </h3>
      <p className="text-sm text-dark-textMuted/60">
        {t('roadmap_coming_soon')}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════════

export default function ArenaV2RoadmapPage() {
  const t = useTranslations('arena');
  const roadmapSections = useRoadmapSections();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const renderSectionContent = (id: string) => {
    switch (id) {
      case 'login':
        return <LoginPlan />;
      default:
        return <ComingSoonSection title={roadmapSections.find(s => s.id === id)?.title || ''} />;
    }
  };

  const handleExportPDF = async () => {
    if (!activeSection) return;
    setIsExporting(true);
    try {
      const { exportSectionPDF } = await import('@/lib/pdf-export');
      exportSectionPDF(activeSection);
    } catch (error) {
      console.error('[PDF Export] Error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-dark-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-ufc-red/5 via-transparent to-blue-500/5" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/arena"
                className="text-sm text-dark-textMuted hover:text-ufc-red transition-colors"
              >
                &larr; Arena
              </Link>
              <span className="text-dark-border">/</span>
              <span className="text-sm text-ufc-red font-medium">Roadmap v2.0</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-dark-text mb-3">
              Arena <span className="text-ufc-red">v2.0</span>
            </h1>
            <p className="text-dark-textMuted leading-relaxed max-w-xl">
              {t('roadmap_hero_desc')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                {t('roadmap_p0_critical')}
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                {t('roadmap_p1_high')}
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                {t('roadmap_p2_medium')}
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-gray-400" />
                {t('roadmap_p3_low')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {roadmapSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(isActive ? null : section.id)}
                className={`neu-card p-4 text-left transition-all duration-200 ${
                  isActive
                    ? 'ring-1 ring-ufc-red/50 shadow-[0_0_20px_rgba(210,10,10,0.15)]'
                    : 'hover:shadow-[0_0_15px_rgba(210,10,10,0.1)]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isActive ? 'bg-ufc-red/20 text-ufc-red' : 'bg-dark-border/30 text-dark-textMuted'
                  }`}>
                    {section.icon}
                  </div>
                  <PriorityBadge priority={section.priority} />
                </div>
                <h3 className="font-display text-base uppercase text-dark-text mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-dark-textMuted mb-3">{section.subtitle}</p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={section.status} label={section.statusLabel} />
                  {isActive ? (
                    <ChevronDown className="h-4 w-4 text-ufc-red" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-dark-textMuted" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Section Content */}
        {activeSection && (
          <div className="space-y-4">
            {/* Export Button */}
            <div className="flex justify-end">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="neu-button flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-dark-text transition-all hover:text-ufc-red hover:shadow-[0_0_15px_rgba(210,10,10,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('roadmap_generating_pdf')}
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {t('roadmap_export_pdf')}
                  </>
                )}
              </button>
            </div>

            {/* Section content */}
            <div className="neu-card p-6 sm:p-8">
              {renderSectionContent(activeSection)}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-dark-textMuted/50 pb-8">
          {t('roadmap_footer')}
        </div>
      </div>
    </div>
  );
}
