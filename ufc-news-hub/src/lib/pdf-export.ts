import { jsPDF } from 'jspdf';

// ═══════════════════════════════════════════════════════════════
// PDF Export - Generates clean text-based PDFs from structured data
// ═══════════════════════════════════════════════════════════════

const COLORS = {
  red: [220, 38, 38] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  yellow: [234, 179, 8] as [number, number, number],
  blue: [59, 130, 246] as [number, number, number],
  default: [60, 60, 60] as [number, number, number],
  heading: [30, 30, 30] as [number, number, number],
  muted: [120, 120, 120] as [number, number, number],
  codeBg: [245, 245, 245] as [number, number, number],
  divider: [200, 200, 200] as [number, number, number],
};

const PAGE = {
  marginLeft: 20,
  marginRight: 20,
  marginTop: 25,
  marginBottom: 20,
  width: 210, // A4
  height: 297,
};

const CONTENT_WIDTH = PAGE.width - PAGE.marginLeft - PAGE.marginRight;

class PDFBuilder {
  private doc: jsPDF;
  private y: number;
  private pageNum: number;

  constructor() {
    this.doc = new jsPDF({ unit: 'mm', format: 'a4' });
    this.y = PAGE.marginTop;
    this.pageNum = 1;
    this.doc.setFont('helvetica');
  }

  private checkPageBreak(neededHeight: number) {
    if (this.y + neededHeight > PAGE.height - PAGE.marginBottom) {
      this.doc.addPage();
      this.pageNum++;
      this.y = PAGE.marginTop;
      this.addFooter();
    }
  }

  private addFooter() {
    this.doc.setFontSize(8);
    this.doc.setTextColor(...COLORS.muted);
    this.doc.text(
      `Arena v2.0 Roadmap — UFC News Hub — Pagina ${this.pageNum}`,
      PAGE.width / 2,
      PAGE.height - 10,
      { align: 'center' }
    );
  }

  addTitle(text: string) {
    this.checkPageBreak(15);
    this.doc.setFontSize(22);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...COLORS.red);
    this.doc.text(text, PAGE.marginLeft, this.y);
    this.y += 10;
  }

  addSubtitle(text: string) {
    this.checkPageBreak(10);
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...COLORS.muted);
    const lines = this.doc.splitTextToSize(text, CONTENT_WIDTH);
    this.doc.text(lines, PAGE.marginLeft, this.y);
    this.y += lines.length * 5 + 3;
  }

  addHeading(text: string) {
    this.checkPageBreak(12);
    this.y += 4;
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...COLORS.heading);
    this.doc.text(text.toUpperCase(), PAGE.marginLeft, this.y);
    this.y += 8;
  }

  addSubheading(text: string, color: 'red' | 'green' | 'yellow' | 'blue' | 'default' = 'default') {
    this.checkPageBreak(10);
    this.y += 2;
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...(COLORS[color] || COLORS.heading));
    this.doc.text(text, PAGE.marginLeft, this.y);
    this.y += 6;
  }

  addParagraph(text: string) {
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...COLORS.default);
    const lines = this.doc.splitTextToSize(text, CONTENT_WIDTH);
    this.checkPageBreak(lines.length * 4.5 + 2);
    this.doc.text(lines, PAGE.marginLeft, this.y);
    this.y += lines.length * 4.5 + 2;
  }

  addBullet(text: string, color: 'red' | 'green' | 'yellow' | 'blue' | 'default' = 'default') {
    const bulletChar = color === 'red' ? '✗' : color === 'green' ? '✓' : '•';
    const bulletColor = COLORS[color] || COLORS.default;

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    const lines = this.doc.splitTextToSize(text, CONTENT_WIDTH - 8);
    this.checkPageBreak(lines.length * 4.5 + 1);

    this.doc.setTextColor(...bulletColor);
    this.doc.text(bulletChar, PAGE.marginLeft + 2, this.y);
    this.doc.setTextColor(...COLORS.default);
    this.doc.text(lines, PAGE.marginLeft + 8, this.y);
    this.y += lines.length * 4.5 + 1;
  }

  addLabelValue(label: string, value: string) {
    this.doc.setFontSize(10);
    const lines = this.doc.splitTextToSize(value, CONTENT_WIDTH - 45);
    this.checkPageBreak(lines.length * 4.5 + 1);

    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...COLORS.heading);
    this.doc.text(label + ':', PAGE.marginLeft + 4, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...COLORS.default);
    this.doc.text(lines, PAGE.marginLeft + 45, this.y);
    this.y += lines.length * 4.5 + 1;
  }

  addStatusItem(label: string, severity: string, description: string) {
    const severityColor = severity === 'CRITICO' ? COLORS.red :
      severity === 'ALTO' ? COLORS.yellow : COLORS.blue;

    this.doc.setFontSize(10);
    const descLines = this.doc.splitTextToSize(description, CONTENT_WIDTH - 8);
    this.checkPageBreak(descLines.length * 4.5 + 8);

    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...COLORS.heading);
    this.doc.text(label, PAGE.marginLeft + 4, this.y);

    this.doc.setFontSize(8);
    this.doc.setTextColor(...severityColor);
    const labelWidth = this.doc.getTextWidth(label);
    this.doc.text(`[${severity}]`, PAGE.marginLeft + 6 + labelWidth, this.y);
    this.y += 5;

    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...COLORS.muted);
    this.doc.text(descLines, PAGE.marginLeft + 4, this.y);
    this.y += descLines.length * 4 + 3;
  }

  addCode(code: string) {
    this.doc.setFontSize(8);
    this.doc.setFont('courier', 'normal');
    const lines = code.split('\n');
    const totalHeight = lines.length * 3.8 + 6;

    this.checkPageBreak(Math.min(totalHeight, 80));

    // Background
    this.doc.setFillColor(...COLORS.codeBg);
    const blockHeight = Math.min(lines.length * 3.8 + 4, PAGE.height - PAGE.marginBottom - this.y - 2);
    this.doc.roundedRect(PAGE.marginLeft, this.y - 2, CONTENT_WIDTH, blockHeight, 1, 1, 'F');

    this.doc.setTextColor(50, 50, 50);
    let linesRendered = 0;
    for (const line of lines) {
      if (this.y + 4 > PAGE.height - PAGE.marginBottom) {
        this.doc.addPage();
        this.pageNum++;
        this.y = PAGE.marginTop;
        this.addFooter();
        this.doc.setFillColor(...COLORS.codeBg);
        const remainingLines = lines.length - linesRendered;
        this.doc.roundedRect(PAGE.marginLeft, this.y - 2, CONTENT_WIDTH, remainingLines * 3.8 + 4, 1, 1, 'F');
        this.doc.setFont('courier', 'normal');
        this.doc.setFontSize(8);
        this.doc.setTextColor(50, 50, 50);
      }
      const truncated = line.substring(0, 85);
      this.doc.text(truncated, PAGE.marginLeft + 3, this.y + 1);
      this.y += 3.8;
      linesRendered++;
    }
    this.y += 4;
  }

  addDivider() {
    this.checkPageBreak(6);
    this.y += 2;
    this.doc.setDrawColor(...COLORS.divider);
    this.doc.setLineWidth(0.3);
    this.doc.line(PAGE.marginLeft, this.y, PAGE.width - PAGE.marginRight, this.y);
    this.y += 4;
  }

  addSpacer(mm: number = 4) {
    this.y += mm;
  }

  save(filename: string) {
    // Add footer to all pages
    const totalPages = this.doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setTextColor(...COLORS.muted);
      this.doc.text(
        `Arena v2.0 Roadmap — UFC News Hub — Pagina ${i} de ${totalPages}`,
        PAGE.width / 2,
        PAGE.height - 10,
        { align: 'center' }
      );
    }
    this.doc.save(filename);
  }
}

// ═══════════════════════════════════════════════════════════════
// Login & Auth Section PDF Content
// ═══════════════════════════════════════════════════════════════

export function exportLoginAuthPDF() {
  const pdf = new PDFBuilder();

  // ── Header ──
  pdf.addTitle('Arena v2.0 — Login & Auth');
  pdf.addSubtitle(
    'Reestruturacao completa do sistema de autenticacao da Arena. ' +
    'Migrar de SHA-256 + base64 tokens para bcrypt + JWT assinado com HMAC. ' +
    'Adicionar rate limiting, validacao robusta e protecao contra brute force.'
  );
  pdf.addLabelValue('Prioridade', 'P0 — Critico');
  pdf.addLabelValue('Status', 'Em Planejamento');
  pdf.addLabelValue('Arquivos impactados', '7 arquivos (~400 linhas)');
  pdf.addDivider();

  // ── Ferramentas ──
  pdf.addHeading('Ferramentas & Dependencias');

  pdf.addSubheading('bcrypt');
  pdf.addParagraph('Hash de senhas com salt unico automatico. Lento por design — resiste a ataques de forca bruta com GPU.');
  pdf.addCode('npm install bcrypt @types/bcrypt');
  pdf.addSpacer();

  pdf.addSubheading('jose');
  pdf.addParagraph('Biblioteca JWT moderna para Node.js. Suporta HMAC-SHA256 (HS256) para assinar e verificar tokens.');
  pdf.addCode('npm install jose');
  pdf.addSpacer();

  pdf.addSubheading('Rate Limiter (custom)');
  pdf.addParagraph('Protecao contra brute force. Limita tentativas de login por IP/email com janela deslizante.');
  pdf.addCode('Implementacao custom com Map + TTL');
  pdf.addDivider();

  // ── Medidas de Seguranca ──
  pdf.addHeading('Medidas de Seguranca');

  pdf.addStatusItem(
    'Hash bcrypt com salt unico',
    'CRITICO',
    'Cada senha gera um salt diferente. Custo computacional alto (10 rounds). Impossivel usar rainbow tables.'
  );
  pdf.addStatusItem(
    'JWT assinado com HMAC-SHA256',
    'CRITICO',
    'Token assinado com secret do servidor. Impossivel forjar sem a chave. Payload verificavel.'
  );
  pdf.addStatusItem(
    'Rate limiting por IP + email',
    'ALTO',
    '5 tentativas por email a cada 15 minutos. 20 tentativas por IP a cada 15 minutos. Lockout progressivo.'
  );
  pdf.addStatusItem(
    'Cookie Secure + SameSite=Strict',
    'MEDIO',
    'Cookie so trafega em HTTPS. SameSite=Strict previne CSRF. HttpOnly ja esta implementado.'
  );
  pdf.addStatusItem(
    'Validacao de email com regex',
    'MEDIO',
    'Regex robusto para formato de email. Rejeita emails invalidos antes de bater no banco.'
  );
  pdf.addStatusItem(
    'Senha forte obrigatoria',
    'MEDIO',
    'Minimo 8 chars, 1 maiuscula, 1 numero. Indicador visual de forca no formulario.'
  );
  pdf.addDivider();

  // ── REACT / FRONTEND ──
  pdf.addHeading('Camada: React / Frontend');

  pdf.addSubheading('Formulario de Login — ANTES (v1.0)', 'red');
  pdf.addCode(
`// arena/login/page.tsx (atual)
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
<input type="password" ... />`
  );
  pdf.addBullet('Zero validacao antes do submit — qualquer input vai pro servidor', 'red');
  pdf.addBullet('Sem indicador de forca de senha', 'red');
  pdf.addBullet('Sem feedback visual nos campos (borda verde/vermelho)', 'red');
  pdf.addBullet('Sem "esqueci minha senha" (nao existe fluxo de recovery)', 'red');
  pdf.addBullet('Sem "mostrar senha" toggle', 'red');
  pdf.addSpacer();

  pdf.addSubheading('Formulario de Login — DEPOIS (v2.0)', 'green');
  pdf.addCode(
`// arena/login/page.tsx (v2.0)
const [showPassword, setShowPassword] = useState(false);
const [fieldErrors, setFieldErrors] = useState({});

const validateField = (field, value) => {
  if (field === 'email') {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(value) ? null : 'Email invalido';
  }
  if (field === 'senha') {
    return value.length >= 8 ? null : 'Minimo 8 caracteres';
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
{rateLimited && <CountdownTimer seconds={remaining} />}`
  );
  pdf.addBullet('Validacao em tempo real com onBlur — feedback instantaneo', 'green');
  pdf.addBullet('Toggle mostrar/esconder senha com icone Eye/EyeOff', 'green');
  pdf.addBullet('Borda verde/vermelha nos campos conforme validacao', 'green');
  pdf.addBullet('Contador de rate limit visivel quando bloqueado', 'green');
  pdf.addBullet('Mensagens de erro especificas por campo', 'green');
  pdf.addDivider();

  pdf.addSubheading('Hook useArenaAuth — ANTES (v1.0)', 'red');
  pdf.addCode(
`// hooks/useArenaAuth.ts (atual)
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
};`
  );
  pdf.addBullet('Sem retry logic para falhas de rede', 'red');
  pdf.addBullet('Logout swallows errors — usuario nao sabe se falhou', 'red');
  pdf.addBullet('Sem estado de "rate limited" — so mostra erro generico', 'red');
  pdf.addBullet('fetchUsuario nao tem cache/dedup — chama a cada mount', 'red');
  pdf.addSpacer();

  pdf.addSubheading('Hook useArenaAuth — DEPOIS (v2.0)', 'green');
  pdf.addCode(
`// hooks/useArenaAuth.ts (v2.0)
interface AuthState {
  usuario: UsuarioArena | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  rateLimitedUntil: number | null;
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
  '/api/arena/auth/me', fetcher,
  { revalidateOnFocus: true, dedupingInterval: 30000 }
);`
  );
  pdf.addBullet('Estado rateLimitedUntil para countdown visual', 'green');
  pdf.addBullet('SWR para cache/dedup de sessao (nao chama /me repetido)', 'green');
  pdf.addBullet('revalidateOnFocus revalida ao voltar pra aba', 'green');
  pdf.addBullet('Logout com feedback de erro se falhar', 'green');
  pdf.addDivider();

  // ── API / BACKEND ──
  pdf.addHeading('Camada: API / Backend');

  pdf.addSubheading('Fluxo de Login v2.0');
  pdf.addParagraph('1. POST /api/arena/auth/login → Recebe { email, senha }');
  pdf.addParagraph('2. Rate Limiter Check → Verifica IP + email contra limites (5/15min)');
  pdf.addParagraph('3. Validacao de Input → Email regex + senha nao vazia');
  pdf.addParagraph('4. Query DB por Email → SELECT * FROM usuarios_arena WHERE email = $1');
  pdf.addParagraph('5. bcrypt.compare() → Compara senha com hash armazenado (10 rounds)');
  pdf.addParagraph('6. jose: SignJWT → Cria JWT com { sub: id, exp: 7d } assinado HS256');
  pdf.addParagraph('7. Set-Cookie → arena_token=JWT; HttpOnly; Secure; SameSite=Strict');
  pdf.addSpacer();

  pdf.addSubheading('Hash de Senha — ANTES (v1.0)', 'red');
  pdf.addCode(
`// lib/arena/auth.ts (atual)
async function hashSenha(senha: string) {
  const encoder = new TextEncoder();
  // Salt FIXO para todos os usuarios
  const data = encoder.encode(
    senha + process.env.AUTH_SECRET || 'arena-ufc-secret'
  );
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}`
  );
  pdf.addBullet('SHA-256 e rapido — GPU faz bilhoes de hashes/segundo', 'red');
  pdf.addBullet('Salt fixo — mesma senha = mesmo hash (rainbow table)', 'red');
  pdf.addBullet('Fallback hardcoded: "arena-ufc-secret"', 'red');
  pdf.addBullet('Se DB vazar, senhas sao faceis de quebrar', 'red');
  pdf.addSpacer();

  pdf.addSubheading('Hash de Senha — DEPOIS (v2.0)', 'green');
  pdf.addCode(
`// lib/arena/auth.ts (v2.0)
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function hashSenha(senha: string): Promise<string> {
  // Salt UNICO gerado automaticamente por usuario
  return bcrypt.hash(senha, SALT_ROUNDS);
}

async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  // bcrypt extrai o salt do proprio hash
  return bcrypt.compare(senha, hash);
}

// Hash resultante (~60 chars):
// $2b$10$N9qo8uLOickgx2ZMRZoMye...`
  );
  pdf.addBullet('Salt unico por usuario — gerado automaticamente', 'green');
  pdf.addBullet('10 rounds = ~100ms por hash (lento por design)', 'green');
  pdf.addBullet('bcrypt.compare() extrai salt do hash armazenado', 'green');
  pdf.addBullet('Padrao da industria — usado por GitHub, Stripe, etc.', 'green');
  pdf.addDivider();

  pdf.addSubheading('Token de Sessao — ANTES (v1.0)', 'red');
  pdf.addCode(
`// lib/arena/auth.ts (atual)
function gerarToken(usuarioId: string) {
  const payload = {
    id: usuarioId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  // QUALQUER UM pode decodificar e forjar
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function verificarToken(token: string) {
  const json = Buffer.from(token, 'base64').toString('utf-8');
  const payload = JSON.parse(json);
  // So checa expiracao — SEM verificacao de assinatura!
  if (payload.exp < Date.now()) return null;
  return { id: payload.id };
}`
  );
  pdf.addBullet('Base64 NAO e criptografia — e encoding reverso', 'red');
  pdf.addBullet('Qualquer um pode criar { id: "admin-id", exp: futuro }', 'red');
  pdf.addBullet('Sem assinatura = sem como verificar autenticidade', 'red');
  pdf.addBullet('Atacante so precisa saber o formato do JSON', 'red');
  pdf.addSpacer();

  pdf.addSubheading('Token de Sessao — DEPOIS (v2.0)', 'green');
  pdf.addCode(
`// lib/arena/auth.ts (v2.0)
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET // obrigatorio em prod
);

async function gerarToken(usuarioId: string): Promise<string> {
  return new SignJWT({ sub: usuarioId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

async function verificarToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { sub: string };
  } catch {
    return null; // expirado ou invalido
  }
}`
  );
  pdf.addBullet('HMAC-SHA256 — assinatura criptografica real', 'green');
  pdf.addBullet('Impossivel forjar sem process.env.JWT_SECRET', 'green');
  pdf.addBullet('jose verifica expiracao + assinatura automaticamente', 'green');
  pdf.addBullet('Padrao JWT (RFC 7519) — auditavel e confiavel', 'green');
  pdf.addDivider();

  pdf.addSubheading('Rate Limiting — ANTES (v1.0)', 'red');
  pdf.addParagraph('NADA implementado. Qualquer um pode tentar infinitas combinacoes de email/senha. Ataque de forca bruta com 1000 tentativas/segundo e possivel.');
  pdf.addBullet('Zero protecao contra brute force', 'red');
  pdf.addBullet('Atacante pode testar milhares de senhas automaticamente', 'red');
  pdf.addBullet('Sem lockout de conta apos tentativas falhas', 'red');
  pdf.addBullet('Sem log de tentativas suspeitas', 'red');
  pdf.addSpacer();

  pdf.addSubheading('Rate Limiting — DEPOIS (v2.0)', 'green');
  pdf.addCode(
`// lib/arena/rate-limiter.ts (v2.0)
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
  for (const [key, limit] of [[emailKey, LIMITS.perEmail], [ipKey, LIMITS.perIP]]) {
    const entry = loginAttempts.get(key);
    if (entry && entry.count >= limit.max) {
      const retryAfter = Math.ceil((entry.resetAt - Date.now()) / 1000);
      return { allowed: false, retryAfter };
    }
  }
  return { allowed: true };
}`
  );
  pdf.addBullet('5 tentativas por email a cada 15 minutos', 'green');
  pdf.addBullet('20 tentativas por IP a cada 15 minutos', 'green');
  pdf.addBullet('Header Retry-After na resposta 429', 'green');
  pdf.addBullet('Map com auto-cleanup via TTL (sem crescer infinito)', 'green');
  pdf.addDivider();

  // ── DATABASE ──
  pdf.addHeading('Camada: Database');

  pdf.addSubheading('Coluna senha_hash — ANTES (v1.0)', 'red');
  pdf.addCode(
`-- Formato atual do hash: 64 caracteres hex (SHA-256)
SELECT senha_hash FROM usuarios_arena WHERE email = 'user@email.com';

-- Resultado:
-- 'a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'

-- Todos os usuarios com mesma senha tem o MESMO hash (salt fixo)`
  );
  pdf.addBullet('Hash de 64 chars — facil de identificar como SHA-256', 'red');
  pdf.addBullet('Salt fixo = senhas iguais geram hashes iguais', 'red');
  pdf.addBullet('Vulneravel a rainbow tables pre-computadas', 'red');
  pdf.addSpacer();

  pdf.addSubheading('Coluna senha_hash — DEPOIS (v2.0)', 'green');
  pdf.addCode(
`-- Formato novo: 60 caracteres com salt embutido (bcrypt)
SELECT senha_hash FROM usuarios_arena WHERE email = 'user@email.com';

-- Resultado:
-- '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgQb3Q/3H.YQ/7v0F6OpWC1AeHpS'
--   ^    ^  ^-- salt unico (22 chars)
--   |    +-- cost factor (10 rounds)
--   +-- algoritmo (2b = bcrypt)

-- Migracao: re-hash senhas no proximo login de cada user`
  );
  pdf.addBullet('Salt embutido no hash — nao precisa coluna extra', 'green');
  pdf.addBullet('Coluna VARCHAR(255) ja comporta (60 chars)', 'green');
  pdf.addBullet('Migracao gradual: re-hash no proximo login', 'green');
  pdf.addBullet('Sem mudanca de schema necessaria', 'green');
  pdf.addDivider();

  pdf.addSubheading('Estrategia de Migracao de Hashes');
  pdf.addParagraph(
    'Problema: Nao da pra converter SHA-256 para bcrypt sem a senha original. ' +
    'Precisamos de uma migracao gradual.'
  );
  pdf.addCode(
`// No login, detectar formato do hash:
async function loginUsuario(email, senha) {
  const user = await queryOne(
    'SELECT * FROM usuarios_arena WHERE email = $1', [email]
  );

  // Hash antigo = 64 chars hex (SHA-256)
  if (user.senha_hash.length === 64) {
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
    const valid = await bcrypt.compare(senha, user.senha_hash);
    if (!valid) return { error: 'Credenciais invalidas' };
  }
  // ... gerar JWT e retornar
}`
  );
  pdf.addParagraph(
    'Resultado: Cada usuario que fizer login tera seu hash automaticamente migrado. ' +
    'Apos 30 dias, rodar script para forcar reset de senha nos usuarios que nao logaram.'
  );
  pdf.addDivider();

  // ── Arquivos Impactados ──
  pdf.addHeading('Arquivos Impactados');

  const files = [
    { file: 'src/lib/arena/auth.ts', action: 'REESCREVER', detail: 'hashSenha → bcrypt, gerarToken → jose JWT, verificarToken → jwtVerify, criarCookieToken → +Secure +Strict' },
    { file: 'src/app/api/arena/auth/login/route.ts', action: 'MODIFICAR', detail: 'Adicionar rate limiting, validacao de input, migracao de hash legacy' },
    { file: 'src/app/api/arena/auth/registro/route.ts', action: 'MODIFICAR', detail: 'bcrypt.hash(), validacao de email regex, senha forte obrigatoria' },
    { file: 'src/app/arena/login/page.tsx', action: 'MODIFICAR', detail: 'Validacao client-side, toggle senha, feedback visual, rate limit countdown' },
    { file: 'src/app/arena/registro/page.tsx', action: 'MODIFICAR', detail: 'Indicador de forca de senha, validacao em tempo real' },
    { file: 'src/hooks/useArenaAuth.ts', action: 'MODIFICAR', detail: 'SWR, rateLimitedUntil, error states' },
    { file: 'src/lib/arena/rate-limiter.ts', action: 'CRIAR', detail: 'Rate limiter com sliding window, Map + TTL, cleanup automatico' },
  ];

  for (const f of files) {
    pdf.addLabelValue(f.action, f.file);
    pdf.addParagraph(f.detail);
    pdf.addSpacer(1);
  }
  pdf.addDivider();

  // ── Checklist ──
  pdf.addHeading('Ordem de Implementacao');

  const steps = [
    'Instalar bcrypt + jose (npm install bcrypt @types/bcrypt jose)',
    'Reescrever auth.ts — hashSenha (bcrypt), gerarToken (JWT), verificarToken (jwtVerify), cookie flags',
    'Criar rate-limiter.ts — Sliding window Map, checkRateLimit(), recordAttempt()',
    'Atualizar login route — Rate limiting + migracao de hash legacy + validacao',
    'Atualizar registro route — bcrypt.hash() + validacao email/senha forte',
    'Atualizar login page UI — Validacao client-side, toggle senha, countdown rate limit',
    'Atualizar registro page UI — Indicador de forca, validacao real-time',
    'Atualizar useArenaAuth hook — SWR, rateLimitedUntil, error states',
    'Adicionar JWT_SECRET ao .env — Gerar secret forte com: openssl rand -base64 32',
    'Testar migracao de hash — Login com hash antigo, verificar re-hash para bcrypt',
  ];

  steps.forEach((step, i) => {
    pdf.addParagraph(`${i + 1}. [ ] ${step}`);
  });
  pdf.addSpacer();

  // ── Env vars ──
  pdf.addHeading('Variaveis de Ambiente');
  pdf.addLabelValue('+ JWT_SECRET', 'Gerar com: openssl rand -base64 32');
  pdf.addLabelValue('~ AUTH_SECRET', 'Manter para migracao legacy, remover apos 30 dias');

  // Save
  pdf.save('Arena-v2-Login-Auth.pdf');
}

// ═══════════════════════════════════════════════════════════════
// Export dispatcher
// ═══════════════════════════════════════════════════════════════

export function exportSectionPDF(sectionId: string) {
  if (sectionId === 'login') {
    return exportLoginAuthPDF();
  }

  // Placeholder for future sections
  const pdf = new PDFBuilder();
  pdf.addTitle(`Arena v2.0 — ${sectionId}`);
  pdf.addParagraph('Plano detalhado sera adicionado em breve.');
  pdf.save(`Arena-v2-${sectionId}.pdf`);
}
