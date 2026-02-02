# UFC News Hub

Hub de Noticias do UFC com atualizacao automatica, design viciante e experiencia de usuario impecavel.

## Stack

- **Frontend:** Next.js 15 com App Router, React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco de Dados:** PostgreSQL (via Docker)
- **IA:** Claude API (Anthropic) para classificacao e processamento
- **Fonte de Dados:** RSS Feed do MMAJunkie

## Requisitos

- Node.js 18+
- Docker e Docker Compose
- Chave API da Anthropic (Claude)

## Instalacao

### 1. Iniciar o PostgreSQL

```bash
docker-compose up -d
```

Aguarde alguns segundos para o banco inicializar.

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variaveis de ambiente

Edite o arquivo `.env.local` e adicione sua chave da API Anthropic:

```env
ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
```

### 4. Inicializar o banco de dados

```bash
npm run db:init
```

### 5. Popular lutadores

```bash
npm run db:seed
```

Este script vai buscar a lista de lutadores do UFC e popular o banco de dados.

### 6. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 7. Acessar a aplicacao

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 8. Primeira sincronizacao de noticias

Clique no botao "Atualizar" no header ou execute:

```bash
npm run sync
```

## Scripts Disponiveis

| Script | Descricao |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run start` | Inicia servidor de producao |
| `npm run db:init` | Inicializa schema do banco |
| `npm run db:seed` | Popula tabela de lutadores |
| `npm run sync` | Sincroniza noticias manualmente |

## Estrutura do Projeto

```
ufc-news-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── lutadores/         # Pagina de lutadores
│   │   ├── lutas/             # Pagina de lutas
│   │   ├── backstage/         # Pagina de backstage
│   │   └── noticia/[id]/      # Pagina individual
│   ├── components/            # Componentes React
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilitarios e integrações
│   └── types/                 # Tipos TypeScript
├── scripts/                   # Scripts de manutencao
├── docker-compose.yml         # Configuracao Docker
└── package.json
```

## API Endpoints

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/api/noticias` | GET | Lista noticias com paginacao |
| `/api/noticias/[id]` | GET | Detalhes de uma noticia |
| `/api/sync` | POST | Sincroniza noticias do RSS |
| `/api/sync` | GET | Status da ultima sincronizacao |
| `/api/cron` | POST | Endpoint para cron job |

## Categorias de Noticias

- **Lutadores:** Contratos, lesoes, rankings, declaracoes
- **Lutas:** Anuncios de lutas, cards, resultados
- **Backstage:** Drama, bastidores, vida pessoal

## Sincronizacao Automatica

Para sincronizacao automatica a cada 15 minutos, configure um cron job:

```bash
*/15 * * * * curl -X POST http://localhost:3000/api/cron?secret=ufc-news-cron-secret
```

## Variaveis de Ambiente

| Variavel | Descricao | Padrao |
|----------|-----------|--------|
| `DATABASE_URL` | URL de conexao PostgreSQL | - |
| `ANTHROPIC_API_KEY` | Chave API Claude | - |
| `RSS_FEED_URL` | URL do feed RSS | MMAJunkie |
| `SYNC_INTERVAL_MINUTES` | Intervalo de sync | 15 |
| `NEWS_MAX_AGE_HOURS` | Idade maxima das noticias | 24 |
| `CRON_SECRET` | Secret para endpoint cron | ufc-news-cron-secret |

## Funcionalidades

- Design dark mode viciante com estetica UFC
- Classificacao automatica de noticias via IA
- Deduplicacao inteligente de conteudo
- Infinite scroll com carregamento automatico
- Auto-refresh a cada 5 minutos
- Indicador de noticias novas (< 1 hora)
- Responsivo para mobile, tablet e desktop
- Relacionamento noticia-lutador
- Noticias relacionadas

## Troubleshooting

### Erro de conexao com banco

Verifique se o Docker esta rodando:

```bash
docker ps
```

Se o container nao estiver rodando:

```bash
docker-compose up -d
```

### Erro na API Claude

Verifique se a chave `ANTHROPIC_API_KEY` esta correta no `.env.local`.

### Noticias nao aparecem

Execute a sincronizacao manual:

```bash
npm run sync
```

Ou clique no botao "Atualizar" no header.

## Licenca

MIT
# test
