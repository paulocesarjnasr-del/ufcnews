import { chromium, Browser, Page } from 'playwright';

interface APIResponse {
  url: string;
  status: number;
  data?: any;
  error?: string;
}

async function analyzeWebsite() {
  console.log('🔍 ANÁLISE DO SITE UFC NEWS HUB COM PLAYWRIGHT\n');
  console.log('='.repeat(60));

  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  const apiResponses: APIResponse[] = [];

  // Interceptar todas as chamadas de API
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/')) {
      try {
        const data = await response.json().catch(() => null);
        apiResponses.push({
          url: url.replace('http://localhost:3010', ''),
          status: response.status(),
          data: data,
        });
      } catch {
        apiResponses.push({
          url: url.replace('http://localhost:3010', ''),
          status: response.status(),
          error: 'Não foi possível parsear JSON',
        });
      }
    }
  });

  try {
    // =============================================
    // TESTE 1: Página Principal
    // =============================================
    console.log('\n📍 TESTE 1: Página Principal (/)\n');
    await page.goto('http://localhost:3010', { waitUntil: 'networkidle' });

    const mainTitle = await page.title();
    console.log(`   Título da página: ${mainTitle}`);

    const hasHeader = await page.locator('header').count();
    console.log(`   Header presente: ${hasHeader > 0 ? '✅ Sim' : '❌ Não'}`);

    // =============================================
    // TESTE 2: Página de Calendário
    // =============================================
    console.log('\n📍 TESTE 2: Página de Calendário (/calendario)\n');
    apiResponses.length = 0; // Limpar respostas anteriores

    await page.goto('http://localhost:3010/calendario', { waitUntil: 'networkidle' });

    const calendarioTitle = await page.locator('h1').first().textContent();
    console.log(`   Título: ${calendarioTitle || 'Não encontrado'}`);

    // Verificar se há cards de eventos
    const eventCards = await page.locator('[class*="card"], [class*="Card"], a[href*="/calendario/evento"]').count();
    console.log(`   Cards de eventos encontrados: ${eventCards}`);

    // Mostrar chamadas de API
    console.log('\n   📡 Chamadas de API na página de calendário:');
    apiResponses.forEach((r) => {
      console.log(`      ${r.status === 200 ? '✅' : '❌'} [${r.status}] ${r.url}`);
      if (r.status !== 200 && r.data?.error) {
        console.log(`         Erro: ${r.data.error}`);
      }
    });

    // =============================================
    // TESTE 3: Clicar em um Evento
    // =============================================
    console.log('\n📍 TESTE 3: Navegação para Detalhes do Evento\n');
    apiResponses.length = 0;

    // Procurar por link de evento
    const eventLink = page.locator('a[href*="/calendario/evento/"]').first();
    const eventLinkExists = await eventLink.count() > 0;

    if (eventLinkExists) {
      const href = await eventLink.getAttribute('href');
      console.log(`   Link encontrado: ${href}`);

      await eventLink.click();
      await page.waitForLoadState('networkidle');

      const currentUrl = page.url();
      console.log(`   URL atual: ${currentUrl}`);

      // Verificar se a página carregou corretamente
      const pageContent = await page.content();
      const hasEventoNaoEncontrado = pageContent.includes('nao encontrado') || pageContent.includes('não encontrado');

      if (hasEventoNaoEncontrado) {
        console.log('   ❌ ERRO: Página mostra "evento não encontrado"');
      } else {
        console.log('   ✅ Página de evento carregou corretamente');
      }

      // Verificar elementos da página
      const eventName = await page.locator('h1').first().textContent();
      console.log(`   Nome do evento: ${eventName || 'Não encontrado'}`);

      // Verificar se há lutas
      const fights = await page.locator('[class*="fight"], [class*="luta"], [class*="card"]').count();
      console.log(`   Elementos de luta encontrados: ${fights}`);

      // Mostrar chamadas de API
      console.log('\n   📡 Chamadas de API na página de evento:');
      apiResponses.forEach((r) => {
        console.log(`      ${r.status === 200 ? '✅' : '❌'} [${r.status}] ${r.url}`);
        if (r.status !== 200 && r.data?.error) {
          console.log(`         Erro: ${r.data.error}`);
        }
        if (r.status === 200 && r.data) {
          if (r.data.nome) {
            console.log(`         Evento: ${r.data.nome}`);
          }
          if (r.data.lutas) {
            console.log(`         Lutas: ${r.data.lutas.length}`);
          }
          if (r.data.evento?.nome) {
            console.log(`         Evento: ${r.data.evento.nome}`);
          }
          if (r.data.main_card) {
            console.log(`         Main Card: ${r.data.main_card.length} lutas`);
          }
        }
      });
    } else {
      console.log('   ⚠️ Nenhum link de evento encontrado na página de calendário');
    }

    // =============================================
    // TESTE 4: Páginas da Arena
    // =============================================
    console.log('\n📍 TESTE 4: Sistema Arena\n');
    apiResponses.length = 0;

    // Testar página principal da Arena
    await page.goto('http://localhost:3010/arena', { waitUntil: 'networkidle' });
    const arenaLoaded = !(await page.content()).includes('404');
    console.log(`   /arena: ${arenaLoaded ? '✅ Carregou' : '❌ Erro 404'}`);

    // Testar página de login
    await page.goto('http://localhost:3010/arena/login', { waitUntil: 'networkidle' });
    const loginForm = await page.locator('form, input[type="email"], input[type="password"]').count();
    console.log(`   /arena/login: ${loginForm > 0 ? '✅ Formulário presente' : '⚠️ Sem formulário'}`);

    // Testar página de registro
    await page.goto('http://localhost:3010/arena/registro', { waitUntil: 'networkidle' });
    const registerForm = await page.locator('form, input').count();
    console.log(`   /arena/registro: ${registerForm > 0 ? '✅ Formulário presente' : '⚠️ Sem formulário'}`);

    // Testar página de ligas
    await page.goto('http://localhost:3010/arena/ligas', { waitUntil: 'networkidle' });
    const ligasContent = await page.content();
    console.log(`   /arena/ligas: ${!ligasContent.includes('404') ? '✅ Carregou' : '❌ Erro 404'}`);

    // Testar página de duelos
    await page.goto('http://localhost:3010/arena/duelos', { waitUntil: 'networkidle' });
    const duelosContent = await page.content();
    console.log(`   /arena/duelos: ${!duelosContent.includes('404') ? '✅ Carregou' : '❌ Erro 404'}`);

    // =============================================
    // TESTE 5: APIs Críticas
    // =============================================
    console.log('\n📍 TESTE 5: APIs Críticas\n');

    const apisToTest = [
      '/api/eventos',
      '/api/eventos/proximo',
      '/api/ranking',
    ];

    for (const apiUrl of apisToTest) {
      try {
        const response = await page.request.get(`http://localhost:3010${apiUrl}`);
        const data = await response.json().catch(() => null);

        console.log(`   ${response.status() === 200 ? '✅' : '❌'} [${response.status()}] ${apiUrl}`);

        if (response.status() === 200 && data) {
          if (data.eventos) console.log(`      → ${data.eventos.length} eventos`);
          if (data.ranking) console.log(`      → ${data.ranking.length} usuários no ranking`);
          if (data.nome) console.log(`      → Próximo evento: ${data.nome}`);
          if (data.lutas) console.log(`      → ${data.lutas.length} lutas`);
        }

        if (response.status() !== 200 && data?.error) {
          console.log(`      Erro: ${data.error}`);
        }
      } catch (e: any) {
        console.log(`   ❌ ${apiUrl}: ${e.message}`);
      }
    }

    // =============================================
    // RESUMO FINAL
    // =============================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DAS MUDANÇAS IMPLEMENTADAS\n');

    console.log('1. CORREÇÕES DE SCHEMA DO BANCO DE DADOS:');
    console.log('   As APIs foram atualizadas para usar "vencedor_previsto_id"');
    console.log('   em vez de "lutador_escolhido_id" nas queries de previsões.');
    console.log('   Arquivos corrigidos:');
    console.log('   - /api/eventos/[id]/route.ts');
    console.log('   - /api/eventos/[id]/card/route.ts');
    console.log('   - /api/eventos/proximo/route.ts');
    console.log('   - /api/lutas/[id]/route.ts');
    console.log('   - /api/lutas/[id]/previsoes/route.ts');
    console.log('   - /api/ranking/route.ts');

    console.log('\n2. TRATAMENTO DE ERROS:');
    console.log('   Todas as queries de consenso agora têm try/catch');
    console.log('   para evitar erros quando a tabela tem schema diferente.');

    console.log('\n3. SISTEMA ARENA:');
    console.log('   Páginas criadas para o novo sistema de previsões:');
    console.log('   - /arena (página inicial)');
    console.log('   - /arena/login (autenticação)');
    console.log('   - /arena/registro (criação de conta)');
    console.log('   - /arena/dashboard (painel do usuário)');
    console.log('   - /arena/ligas (ligas de competição)');
    console.log('   - /arena/duelos (desafios 1v1)');
    console.log('   - /arena/perfil/[username] (perfil público)');

    console.log('\n' + '='.repeat(60));

  } catch (error: any) {
    console.error('\n❌ ERRO DURANTE ANÁLISE:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeWebsite();
