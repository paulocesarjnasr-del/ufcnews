'use client';

import { useState } from 'react';
import Link from 'next/link';
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

const roadmapSections: RoadmapSection[] = [
  {
    id: 'login',
    title: 'Login & Auth',
    subtitle: 'Seguranca, tokens, sessoes',
    icon: <Lock className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P0',
  },
  {
    id: 'registro',
    title: 'Registro',
    subtitle: 'Validacao, onboarding, UX',
    icon: <Users className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P0',
  },
  {
    id: 'layout',
    title: 'Layout & Navegacao',
    subtitle: 'Header, sidebar, mobile',
    icon: <Layout className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P1',
  },
  {
    id: 'previsoes',
    title: 'Previsoes',
    subtitle: 'UX de picks, visual cards',
    icon: <Swords className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P1',
  },
  {
    id: 'perfil',
    title: 'Perfil',
    subtitle: 'Stats, historico, avatar',
    icon: <Fingerprint className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P2',
  },
  {
    id: 'ligas',
    title: 'Ligas & Social',
    subtitle: 'Rankings, amigos, desafios',
    icon: <Trophy className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P2',
  },
  {
    id: 'live',
    title: 'Live & Resultados',
    subtitle: 'Real-time, notificacoes',
    icon: <Zap className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P3',
  },
  {
    id: 'analytics',
    title: 'Analytics & Stats',
    subtitle: 'Dashboards, metricas',
    icon: <BarChart3 className="h-5 w-5" />,
    status: 'planning',
    statusLabel: 'Planejando',
    priority: 'P3',
  },
];

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
          Reestruturacao completa do sistema de autenticacao da Arena.
          Migrar de SHA-256 + base64 tokens para bcrypt + JWT assinado com HMAC.
          Adicionar rate limiting, validacao robusta e protecao contra brute force.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status="planning" label="Em Planejamento" />
          <PriorityBadge priority="P0" />
          <span className="rounded-full border border-dark-border/50 px-2.5 py-0.5 text-xs text-dark-textMuted">
            3 arquivos impactados
          </span>
          <span className="rounded-full border border-dark-border/50 px-2.5 py-0.5 text-xs text-dark-textMuted">
            ~400 linhas
          </span>
        </div>
      </div>

      {/* Ferramentas / Dependencias */}
      <div className="space-y-3">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <Settings className="h-4 w-4 text-ufc-red" />
          Ferramentas & Dependencias
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolCard
            name="bcrypt"
            purpose="Hash de senhas com salt unico automatico. Lento por design — resiste a ataques de forca bruta com GPU."
            install="npm install bcrypt @types/bcrypt"
            icon={<Key className="h-4 w-4 text-yellow-400" />}
          />
          <ToolCard
            name="jose"
            purpose="Biblioteca JWT moderna para Node.js. Suporta HMAC-SHA256 (HS256) para assinar e verificar tokens."
            install="npm install jose"
            icon={<Shield className="h-4 w-4 text-blue-400" />}
          />
          <ToolCard
            name="rate-limiter"
            purpose="Protecao contra brute force. Limita tentativas de login por IP/email com janela deslizante."
            install="Implementacao custom com Map + TTL"
            icon={<ShieldAlert className="h-4 w-4 text-red-400" />}
          />
        </div>
      </div>

      {/* Medidas de Seguranca */}
      <div className="space-y-4">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-ufc-red" />
          Medidas de Seguranca
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: 'Hash bcrypt com salt unico',
              desc: 'Cada senha gera um salt diferente. Custo computacional alto (10 rounds). Impossivel usar rainbow tables.',
              severity: 'critico',
              icon: <Key className="h-4 w-4" />,
            },
            {
              title: 'JWT assinado com HMAC-SHA256',
              desc: 'Token assinado com secret do servidor. Impossivel forjar sem a chave. Payload verificavel.',
              severity: 'critico',
              icon: <Shield className="h-4 w-4" />,
            },
            {
              title: 'Rate limiting por IP + email',
              desc: '5 tentativas por email a cada 15 minutos. 20 tentativas por IP a cada 15 minutos. Lockout progressivo.',
              severity: 'alto',
              icon: <Clock className="h-4 w-4" />,
            },
            {
              title: 'Cookie Secure + SameSite=Strict',
              desc: 'Cookie so trafega em HTTPS. SameSite=Strict previne CSRF. HttpOnly ja esta implementado.',
              severity: 'medio',
              icon: <Cookie className="h-4 w-4" />,
            },
            {
              title: 'Validacao de email com regex',
              desc: 'Regex robusto para formato de email. Rejeita emails invalidos antes de bater no banco.',
              severity: 'medio',
              icon: <Globe className="h-4 w-4" />,
            },
            {
              title: 'Senha forte obrigatoria',
              desc: 'Minimo 8 chars, 1 maiuscula, 1 numero. Indicador visual de forca no formulario.',
              severity: 'medio',
              icon: <Lock className="h-4 w-4" />,
            },
          ].map((item, i) => (
            <div key={i} className="neu-card p-4 flex gap-3">
              <div className={`mt-0.5 ${
                item.severity === 'critico' ? 'text-red-400' :
                item.severity === 'alto' ? 'text-orange-400' : 'text-yellow-400'
              }`}>
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-dark-text">{item.title}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    item.severity === 'critico' ? 'bg-red-500/20 text-red-400' :
                    item.severity === 'alto' ? 'bg-orange-500/20 text-orange-400' :
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
          Implementacao por Camada
        </h4>

        {/* REACT / FRONTEND */}
        <LayerSection
          layerName="React / Frontend"
          icon={<Smartphone className="h-5 w-5 text-blue-400" />}
          color="border-blue-500/20"
        >
          <BeforeAfterBlock
            title="Formulario de Login"
            icon={<Code2 className="h-4 w-4" />}
            before={{
              label: 'v1.0 — Atual',
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
                'Zero validacao antes do submit — qualquer input vai pro servidor',
                'Sem indicador de forca de senha',
                'Sem feedback visual nos campos (borda verde/vermelho)',
                'Sem "esqueci minha senha" (nao existe fluxo de recovery)',
                'Sem "mostrar senha" toggle',
              ],
            }}
            after={{
              label: 'v2.0 — Planejado',
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
                'Validacao em tempo real com onBlur — feedback instantaneo',
                'Toggle mostrar/esconder senha com icone Eye/EyeOff',
                'Borda verde/vermelha nos campos conforme validacao',
                'Contador de rate limit visivel quando bloqueado',
                'Mensagens de erro especificas por campo',
              ],
            }}
          />

          <BeforeAfterBlock
            title="Hook useArenaAuth"
            icon={<Code2 className="h-4 w-4" />}
            before={{
              label: 'v1.0 — Atual',
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
                'Sem retry logic para falhas de rede',
                'Logout swallows errors — usuario nao sabe se falhou',
                'Sem estado de "rate limited" — so mostra erro generico',
                'fetchUsuario nao tem cache/dedup — chama a cada mount',
              ],
            }}
            after={{
              label: 'v2.0 — Planejado',
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
                'Estado rateLimitedUntil para countdown visual',
                'SWR para cache/dedup de sessao (nao chama /me repetido)',
                'revalidateOnFocus revalida ao voltar pra aba',
                'Logout com feedback de erro se falhar',
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
            title="Fluxo de Login v2.0"
            steps={[
              {
                label: 'POST /api/arena/auth/login',
                detail: 'Recebe { email, senha }',
                icon: <Globe className="h-4 w-4 text-white" />,
                color: 'bg-blue-500/30',
              },
              {
                label: 'Rate Limiter Check',
                detail: 'Verifica IP + email contra limites (5/15min)',
                icon: <ShieldAlert className="h-4 w-4 text-white" />,
                color: 'bg-red-500/30',
              },
              {
                label: 'Validacao de Input',
                detail: 'Email regex + senha nao vazia',
                icon: <CheckCircle2 className="h-4 w-4 text-white" />,
                color: 'bg-yellow-500/30',
              },
              {
                label: 'Query DB por Email',
                detail: 'queryOne: SELECT * FROM usuarios_arena WHERE email = $1',
                icon: <Database className="h-4 w-4 text-white" />,
                color: 'bg-purple-500/30',
              },
              {
                label: 'bcrypt.compare()',
                detail: 'Compara senha com hash armazenado (10 rounds)',
                icon: <Key className="h-4 w-4 text-white" />,
                color: 'bg-orange-500/30',
              },
              {
                label: 'jose: SignJWT',
                detail: 'Cria JWT com { sub: id, exp: 7d } assinado HS256',
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
            title="Hash de Senha"
            icon={<Key className="h-4 w-4" />}
            before={{
              label: 'v1.0 — SHA-256 + salt fixo',
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
                'SHA-256 e rapido — GPU faz bilhoes de hashes/segundo',
                'Salt fixo — mesma senha = mesmo hash (rainbow table)',
                'Fallback hardcoded: "arena-ufc-secret"',
                'Se DB vazar, senhas sao faceis de quebrar',
              ],
            }}
            after={{
              label: 'v2.0 — bcrypt com salt unico',
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
                'Salt unico por usuario — gerado automaticamente',
                '10 rounds = ~100ms por hash (lento por design)',
                'bcrypt.compare() extrai salt do hash armazenado',
                'Padrao da industria — usado por GitHub, Stripe, etc.',
              ],
            }}
          />

          <BeforeAfterBlock
            title="Token de Sessao"
            icon={<Shield className="h-4 w-4" />}
            before={{
              label: 'v1.0 — Base64 sem assinatura',
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
                'Base64 NAO e criptografia — e encoding reverso',
                'Qualquer um pode criar { id: "admin-id", exp: futuro }',
                'Sem assinatura = sem como verificar autenticidade',
                'Atacante so precisa saber o formato do JSON',
              ],
            }}
            after={{
              label: 'v2.0 — JWT com HMAC-SHA256',
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
                'HMAC-SHA256 — assinatura criptografica real',
                'Impossivel forjar sem process.env.JWT_SECRET',
                'jose verifica expiracao + assinatura automaticamente',
                'Padrao JWT (RFC 7519) — auditavel e confiavel',
              ],
            }}
          />

          <BeforeAfterBlock
            title="Rate Limiting"
            icon={<ShieldAlert className="h-4 w-4" />}
            before={{
              label: 'v1.0 — Nenhum',
              code: `// NADA implementado.
// Qualquer um pode tentar infinitas
// combinacoes de email/senha.
//
// Ataque de forca bruta:
// 1000 tentativas/segundo = possivel
// nenhum feedback de bloqueio`,
              issues: [
                'Zero protecao contra brute force',
                'Atacante pode testar milhares de senhas automaticamente',
                'Sem lockout de conta apos tentativas falhas',
                'Sem log de tentativas suspeitas',
              ],
            }}
            after={{
              label: 'v2.0 — Sliding window por IP + email',
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
                '5 tentativas por email a cada 15 minutos',
                '20 tentativas por IP a cada 15 minutos',
                'Header Retry-After na resposta 429',
                'Map com auto-cleanup via TTL (sem crescer infinito)',
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
            title="Coluna senha_hash"
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
                'Hash de 64 chars — facil de identificar como SHA-256',
                'Salt fixo = senhas iguais geram hashes iguais',
                'Vulneravel a rainbow tables pre-computadas',
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
                'Salt embutido no hash — nao precisa coluna extra',
                'Coluna VARCHAR(255) ja comporta (60 chars)',
                'Migracao gradual: re-hash no proximo login',
                'Sem mudanca de schema necessaria',
              ],
            }}
          />

          <div className="neu-card p-4 space-y-3">
            <h5 className="text-sm font-medium text-dark-text flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-400" />
              Estrategia de Migracao de Hashes
            </h5>
            <div className="space-y-2 text-xs text-dark-textMuted leading-relaxed">
              <p>
                <strong className="text-dark-text">Problema:</strong> Nao da pra converter SHA-256 → bcrypt
                sem a senha original. Precisamos de uma migracao <em>gradual</em>.
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
                <strong className="text-dark-text">Resultado:</strong> Cada usuario que fizer login
                tera seu hash automaticamente migrado. Apos 30 dias, rodar script para forcar
                reset de senha nos usuarios que nao logaram.
              </p>
            </div>
          </div>
        </LayerSection>
      </div>

      {/* Arquivos Impactados */}
      <div className="space-y-3">
        <h4 className="font-display text-lg uppercase text-dark-text flex items-center gap-2">
          <Code2 className="h-4 w-4 text-ufc-red" />
          Arquivos Impactados
        </h4>
        <div className="space-y-2">
          {[
            {
              file: 'src/lib/arena/auth.ts',
              action: 'Reescrever',
              detail: 'hashSenha → bcrypt, gerarToken → jose JWT, verificarToken → jwtVerify, criarCookieToken → +Secure +Strict',
              color: 'text-red-400',
            },
            {
              file: 'src/app/api/arena/auth/login/route.ts',
              action: 'Modificar',
              detail: 'Adicionar rate limiting, validacao de input, migracao de hash legacy',
              color: 'text-orange-400',
            },
            {
              file: 'src/app/api/arena/auth/registro/route.ts',
              action: 'Modificar',
              detail: 'bcrypt.hash(), validacao de email regex, senha forte obrigatoria',
              color: 'text-orange-400',
            },
            {
              file: 'src/app/arena/login/page.tsx',
              action: 'Modificar',
              detail: 'Validacao client-side, toggle senha, feedback visual, rate limit countdown',
              color: 'text-yellow-400',
            },
            {
              file: 'src/app/arena/registro/page.tsx',
              action: 'Modificar',
              detail: 'Indicador de forca de senha, validacao em tempo real',
              color: 'text-yellow-400',
            },
            {
              file: 'src/hooks/useArenaAuth.ts',
              action: 'Modificar',
              detail: 'Estado rateLimitedUntil, SWR para sessao, error handling melhorado',
              color: 'text-yellow-400',
            },
            {
              file: 'src/lib/arena/rate-limiter.ts',
              action: 'Criar',
              detail: 'Rate limiter com sliding window, Map + TTL, cleanup automatico',
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
          Ordem de Implementacao
        </h4>
        <div className="space-y-2">
          {[
            { step: 1, task: 'Instalar bcrypt + jose', detail: 'npm install bcrypt @types/bcrypt jose', done: false },
            { step: 2, task: 'Reescrever auth.ts', detail: 'hashSenha (bcrypt), gerarToken (JWT), verificarToken (jwtVerify), cookie flags', done: false },
            { step: 3, task: 'Criar rate-limiter.ts', detail: 'Sliding window Map, checkRateLimit(), recordAttempt()', done: false },
            { step: 4, task: 'Atualizar login route', detail: 'Rate limiting + migracao de hash legacy + validacao', done: false },
            { step: 5, task: 'Atualizar registro route', detail: 'bcrypt.hash() + validacao email/senha forte', done: false },
            { step: 6, task: 'Atualizar login page UI', detail: 'Validacao client-side, toggle senha, countdown rate limit', done: false },
            { step: 7, task: 'Atualizar registro page UI', detail: 'Indicador de forca, validacao real-time', done: false },
            { step: 8, task: 'Atualizar useArenaAuth hook', detail: 'SWR, rateLimitedUntil, error states', done: false },
            { step: 9, task: 'Adicionar JWT_SECRET ao .env', detail: 'Gerar secret forte, documentar no .env.example', done: false },
            { step: 10, task: 'Testar migracao de hash', detail: 'Login com hash antigo → verificar re-hash para bcrypt', done: false },
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
          <span className="text-sm font-bold text-yellow-400 uppercase">Variaveis de Ambiente Novas</span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-green-400">+</span>
            <span className="text-dark-text">JWT_SECRET</span>
            <span className="text-dark-textMuted">= &quot;gerar com: openssl rand -base64 32&quot;</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">~</span>
            <span className="text-dark-text">AUTH_SECRET</span>
            <span className="text-dark-textMuted">= manter para migracao legacy, remover apos 30 dias</span>
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
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="neu-inset rounded-full p-4 mb-4">
        <Clock className="h-8 w-8 text-dark-textMuted" />
      </div>
      <h3 className="font-display text-xl uppercase text-dark-textMuted mb-2">
        {title}
      </h3>
      <p className="text-sm text-dark-textMuted/60">
        Plano detalhado sera adicionado em breve
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════════

export default function ArenaV2RoadmapPage() {
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
              Reestruturacao completa da Arena — seguranca, UX, performance.
              Clique em cada sessao para ver o plano detalhado com antes/depois,
              ferramentas e checklist de implementacao.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                P0 — Critico
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                P1 — Alto
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                P2 — Medio
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                <span className="h-2 w-2 rounded-full bg-gray-400" />
                P3 — Baixo
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
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Exportar PDF
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
          Arena v2.0 Roadmap — UFC News Hub — Atualizado em 13 de Marco, 2026
        </div>
      </div>
    </div>
  );
}
