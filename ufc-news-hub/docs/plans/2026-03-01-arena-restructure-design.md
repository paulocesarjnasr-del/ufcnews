# Arena Restructure Design

> Data: 2026-03-01
> Status: Aprovado
> Abordagem: Refactor Incremental (7 fases)
> Referencia UX: GymRats (simplicidade de criar/entrar ligas, interagir)

## Principios

1. **Simplicidade GymRats**: Menos campos, menos cliques, menos telas
2. **Preservar o que funciona**: Landing (poster + countdown + main event), OctagonPortalLayout (login/registro)
3. **Neumorfismo**: `neu-card`, `neu-button`, `neu-inset`, Lucide icons, animacoes
4. **Sem duplicacao**: Informacao aparece UMA vez, no lugar certo
5. **Tudo dentro do /arena**: Fight card, previsoes, ligas - nada redireciona para /calendario

---

## Fase 1: Navegacao e Layout

### Mudancas
- **arena/layout.tsx** (NOVO): Layout compartilhado que injeta Header global + sub-header Arena em TODAS as paginas do /arena
- **arena/page.tsx**: Remover header proprio, usar layout.tsx. PRESERVAR background + countdown + main event + botoes
- **Sub-header Arena**: "Arena UFC" esquerda + Avatar/Login direita. Sem ArenaMenu (3 pontinhos removido)
- **UserAvatar dropdown**: Opcoes limpas com Lucide icons: Perfil, Ligas, Historico, Mudar Avatar, Sair

### Arquivos afetados
- CRIAR: `src/app/arena/layout.tsx`
- EDITAR: `src/app/arena/page.tsx` (remover header inline)
- EDITAR: `src/components/arena/UserAvatar.tsx` (limpar opcoes, Lucide icons)
- DELETAR: `src/components/arena/ArenaMenu.tsx`
- EDITAR: todas as sub-paginas do arena que usam ArenaMenu

### API/DB: Nenhuma mudanca

---

## Fase 2: Eliminar Dashboard + Simplificar Registro

### Mudancas
- **DELETAR**: `arena/dashboard/page.tsx`
- **Login/Registro redirect**: Apos auth, redirect para `/arena` (nao `/arena/dashboard`)
- **Sub-header logado**: Mostra mini XP bar + pontos + avatar
- **Registro**: Remover campo "Nome de Exibicao" e card "Por que criar conta?"
- **PRESERVAR**: OctagonPortalLayout visual no login e registro

### Arquivos afetados
- DELETAR: `src/app/arena/dashboard/page.tsx`
- EDITAR: `src/app/arena/registro/page.tsx` (remover campos extras)
- EDITAR: `src/app/arena/login/page.tsx` (redirect para /arena)
- EDITAR: `src/hooks/useArenaAuth.ts` (ajustar redirects se necessario)

### API
- `POST /api/arena/auth/registro`: Campo `display_name` vira opcional (username = display)
- DB: Sem mudanca de schema

---

## Fase 3: Fight Card dentro do Arena

### Mudancas
- **arena/page.tsx**: Link "Ver Fight Card" aponta para `/arena/evento/[id]`
- **arena/evento/[id]/page.tsx**: Refatorar com novo layout (usar arena layout.tsx)
- **PrevisaoForm.tsx**: REESCREVER - trocar dropdowns por botoes visuais
- **LutaCard.tsx**: Remover link Tapology, integrar previsao inline

### Novo PrevisaoForm
- Selecao de lutador: botoes `neu-card` com `border-2 border-ufc-red` quando selecionado
- Metodo: 3 botoes pill `neu-button` (KO/TKO, Finalizacao, Decisao)
- Round: botoes circulares (1-3 ou 1-5 dependendo de main_event/titulo)
- Unico botao de acao: "Confirmar Previsao"
- Animacoes: `slide-up` para cada secao

### Regra de rounds
- Main Event OU Titulo: 5 rounds
- Tudo resto: 3 rounds

### Arquivos afetados
- EDITAR: `src/app/arena/page.tsx` (mudar link)
- EDITAR: `src/app/arena/evento/[id]/page.tsx` (usar arena layout)
- REESCREVER: `src/components/arena/PrevisaoForm.tsx`
- EDITAR: `src/components/arena/LutaCard.tsx` (remover Tapology, ajustar)

### API
- `POST /api/arena/previsoes`: Simplificar `metodo_previsto` para 3 valores: 'KO/TKO', 'Submission', 'Decision'
- DB: Sem mudanca de schema

---

## Fase 4: Perfil Limpo + Avatar

### Mudancas
- **perfil/[username]/page.tsx**: Redesign - stats UMA vez, conquistas inline (sem tabs)
- **CRIAR**: `arena/perfil/editar/page.tsx` (hoje nao existe, da erro)
- **avatar/page.tsx**: Consertar proporcao das imagens (aspect-[3/4]), atualizar preview

### Perfil redesenhado
- Header: Avatar + username + nivel + XP bar + "Editar Perfil"
- Stats: 3 cards em row (Pontos, Acertos, Taxa)
- Sequencias: Card unico com atual/melhor
- Especialidades: Card unico com KO/Sub/Dec/Underdog
- Conquistas: Grid inline (desbloqueadas em cor, locked com "???")

### Arquivos afetados
- REESCREVER: `src/app/arena/perfil/[username]/page.tsx`
- CRIAR: `src/app/arena/perfil/editar/page.tsx`
- EDITAR: `src/app/arena/perfil/avatar/page.tsx` (proporcao imagens)

### API
- `PATCH /api/arena/perfil`: Verificar suporte para bio, email
- `GET /api/arena/perfil/[username]`: Verificar retorno correto
- DB: Sem mudanca

---

## Fase 5: Logica de Evento Semanal

### Mudancas
- **CRIAR**: `GET /api/eventos/semanal` - retorna evento da semana
- **arena/page.tsx**: Trocar `/api/eventos/proximo` por `/api/eventos/semanal`

### Logica
```
Se agora < domingo 12:00 Brasilia:
  retorna evento mais recente (mesmo que finalizado)
Se agora >= domingo 12:00:
  retorna proximo evento futuro
Fallback:
  retorna proximo evento futuro
```

### Arquivos afetados
- CRIAR: `src/app/api/eventos/semanal/route.ts`
- EDITAR: `src/app/arena/page.tsx` (trocar endpoint)

### API: Novo endpoint
### DB: Sem mudanca

---

## Fase 6: Real-Time ao Vivo

### Mudancas
- **CRIAR**: `GET /api/eventos/[id]/live` - retorna lutas com status em tempo real
- **CRIAR**: `POST /api/admin/scrape-results` - scraping Google para resultados UFC
- **arena/page.tsx**: Polling 30s quando evento esta 'ao_vivo'
- **UI ao vivo**: Lutas com status (finalizada + resultado, em andamento, pendente)

### Scraping
- Fonte: Google search "UFC [nome evento] results"
- Parser: Cheerio (ja instalado no projeto)
- Dados: vencedor, metodo, round, tempo
- Fallback: admin insere manualmente

### Polling
- Intervalo: 30 segundos
- Condicao: so quando `evento.status === 'ao_vivo'`
- Endpoint: `/api/eventos/[id]/live` (lightweight, no-cache)

### Arquivos afetados
- CRIAR: `src/app/api/eventos/[id]/live/route.ts`
- CRIAR: `src/app/api/admin/scrape-results/route.ts`
- CRIAR: `src/lib/scrape-results.ts` (logica de scraping)
- EDITAR: `src/app/arena/page.tsx` (adicionar polling ao vivo)

### API: 2 novos endpoints
### DB: Usa campos existentes em `lutas` (vencedor_id, metodo, round_final, tempo_final, status)

---

## Fase 7: Ligas (Estilo GymRats)

### Mudancas
- **ligas/page.tsx**: Redesign - lista limpa (minhas ligas + explorar publicas)
- **ligas/criar/page.tsx**: Simplificar para 2 campos (nome + toggle publico/privado)
- **ligas/[id]/page.tsx**: Ranking + chat simples
- **Remover**: Links quebrados para /arena/amigos e /arena/conquistas

### Criar Liga simplificado
- Nome da liga (unico campo obrigatorio)
- Toggle publico/privado
- Botao "Criar Liga"
- Sem: descricao, max membros, config avancada

### Tela da Liga
- Codigo de convite visivel no header
- Ranking da temporada (posicao, nome, pontos)
- Chat simples (mensagens + input)

### Arquivos afetados
- REESCREVER: `src/app/arena/ligas/page.tsx`
- REESCREVER: `src/app/arena/ligas/criar/page.tsx`
- EDITAR: `src/app/arena/ligas/[id]/page.tsx`

### API
- `POST /api/arena/ligas`: Simplificar body (so nome + tipo)
- DB: Sem mudanca

---

## Resumo de Mudancas por Tipo

### Arquivos a CRIAR (7)
1. `src/app/arena/layout.tsx`
2. `src/app/arena/perfil/editar/page.tsx`
3. `src/app/api/eventos/semanal/route.ts`
4. `src/app/api/eventos/[id]/live/route.ts`
5. `src/app/api/admin/scrape-results/route.ts`
6. `src/lib/scrape-results.ts`

### Arquivos a DELETAR (2)
1. `src/app/arena/dashboard/page.tsx`
2. `src/components/arena/ArenaMenu.tsx`

### Arquivos a REESCREVER (5)
1. `src/components/arena/PrevisaoForm.tsx`
2. `src/app/arena/perfil/[username]/page.tsx`
3. `src/app/arena/ligas/page.tsx`
4. `src/app/arena/ligas/criar/page.tsx`

### Arquivos a EDITAR (10+)
1. `src/app/arena/page.tsx`
2. `src/app/arena/evento/[id]/page.tsx`
3. `src/app/arena/registro/page.tsx`
4. `src/app/arena/login/page.tsx`
5. `src/components/arena/UserAvatar.tsx`
6. `src/components/arena/LutaCard.tsx`
7. `src/app/arena/perfil/avatar/page.tsx`
8. `src/app/arena/ligas/[id]/page.tsx`
9. `src/hooks/useArenaAuth.ts`

### Mudancas de API
- 2 endpoints novos (eventos/semanal, eventos/[id]/live, admin/scrape-results)
- 2 endpoints editados (arena/previsoes, arena/ligas)

### Mudancas de DB
- NENHUMA alteracao de schema
- Todos os campos necessarios ja existem

---

## O que NAO muda (preservar)
- Background image com gradient overlay (arena/page.tsx)
- Countdown component
- Main event preview com fotos
- OctagonPortalLayout (login/registro visual)
- Sistema de pontuacao (pontuacao.ts)
- Sistema de auth (auth.ts, cookies, tokens)
- Prisma schema
- Todas as tabelas do banco

Sources:
- [GymRats App](https://www.gymrats.app/)
- [GymRats Features](https://www.gymrats.app/features)
