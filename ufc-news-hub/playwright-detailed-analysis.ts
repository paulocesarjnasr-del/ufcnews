import { chromium, Browser, Page } from 'playwright';

const BASE_URL = 'http://localhost:3010';

interface TestResult {
  test: string;
  passed: boolean;
  details: string;
}

async function runDetailedAnalysis() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║     ANÁLISE DETALHADA - UFC NEWS HUB COM PLAYWRIGHT          ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  const results: TestResult[] = [];
  const apiCalls: Array<{ url: string; status: number; responseTime: number }> = [];

  // Interceptar chamadas de API
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/')) {
      apiCalls.push({
        url: url.replace(BASE_URL, ''),
        status: response.status(),
        responseTime: 0,
      });
    }
  });

  try {
    // =============================================
    // TESTE 1: Verificar APIs Principais
    // =============================================
    console.log('┌─────────────────────────────────────────────────────────────┐');
    console.log('│ TESTE 1: APIs do Backend                                    │');
    console.log('└─────────────────────────────────────────────────────────────┘\n');

    const apiTests = [
      { endpoint: '/api/eventos', expected: ['eventos', 'total'] },
      { endpoint: '/api/eventos/proximo', expected: ['nome', 'lutas'] },
      { endpoint: '/api/ranking', expected: ['ranking'] },
      { endpoint: '/api/eventos/calendario', expected: [] },
    ];

    for (const test of apiTests) {
      try {
        const start = Date.now();
        const response = await page.request.get(`${BASE_URL}${test.endpoint}`);
        const elapsed = Date.now() - start;
        const data = await response.json().catch(() => ({}));

        const hasExpected = test.expected.every((key) => key in data);
        const passed = response.status() === 200 && hasExpected;

        console.log(`   ${passed ? '✅' : '❌'} ${test.endpoint}`);
        console.log(`      Status: ${response.status()} | Tempo: ${elapsed}ms`);

        if (data.eventos) console.log(`      → ${data.eventos.length} eventos`);
        if (data.lutas) console.log(`      → ${data.lutas.length} lutas`);
        if (data.ranking) console.log(`      → ${data.ranking.length} no ranking`);
        if (data.nome) console.log(`      → Evento: ${data.nome}`);
        if (data.error) console.log(`      ⚠️ Erro: ${data.error}`);

        results.push({
          test: `API ${test.endpoint}`,
          passed,
          details: `Status ${response.status()}, ${elapsed}ms`,
        });
      } catch (e: any) {
        console.log(`   ❌ ${test.endpoint}: ${e.message}`);
        results.push({
          test: `API ${test.endpoint}`,
          passed: false,
          details: e.message,
        });
      }
    }

    // =============================================
    // TESTE 2: Página de Calendário e Navegação
    // =============================================
    console.log('\n┌─────────────────────────────────────────────────────────────┐');
    console.log('│ TESTE 2: Calendário e Navegação para Evento                 │');
    console.log('└─────────────────────────────────────────────────────────────┘\n');

    await page.goto(`${BASE_URL}/calendario`, { waitUntil: 'networkidle' });

    // Verificar título da página
    const calendarioH1 = await page.locator('h1').first().textContent();
    console.log(`   📅 Título encontrado: "${calendarioH1}"`);

    // Encontrar link para evento
    const eventLinks = await page.locator('a[href*="/calendario/evento/"]').all();
    console.log(`   🔗 Links de eventos encontrados: ${eventLinks.length}`);

    if (eventLinks.length > 0) {
      const firstEventHref = await eventLinks[0].getAttribute('href');
      console.log(`   → Primeiro evento: ${firstEventHref}`);

      // Navegar para a página do evento
      await page.goto(`${BASE_URL}${firstEventHref}`, { waitUntil: 'networkidle' });

      const eventPageH1 = await page.locator('h1').first().textContent();
      const hasError = (await page.content()).toLowerCase().includes('não encontrado') ||
                       (await page.content()).toLowerCase().includes('nao encontrado');

      console.log(`\n   📍 Página de Evento:`);
      console.log(`      Título: "${eventPageH1}"`);
      console.log(`      Carregou corretamente: ${hasError ? '❌ Não' : '✅ Sim'}`);

      // Verificar elementos da página de evento
      const fightCards = await page.locator('[class*="fight"], [class*="FightCard"], [class*="luta"]').count();
      console.log(`      Elementos de luta: ${fightCards}`);

      results.push({
        test: 'Página de Evento',
        passed: !hasError,
        details: hasError ? 'Evento não encontrado' : `Carregou: ${eventPageH1}`,
      });
    }

    // =============================================
    // TESTE 3: Sistema Arena - Todas as Páginas
    // =============================================
    console.log('\n┌─────────────────────────────────────────────────────────────┐');
    console.log('│ TESTE 3: Sistema Arena - Páginas                            │');
    console.log('└─────────────────────────────────────────────────────────────┘\n');

    const arenaPages = [
      { url: '/arena', expectedContent: ['Arena', 'Previsoes'] },
      { url: '/arena/login', expectedContent: ['Login', 'email', 'senha'] },
      { url: '/arena/registro', expectedContent: ['Cadastro', 'username'] },
      { url: '/arena/ligas', expectedContent: ['Liga', 'ligas'] },
      { url: '/arena/duelos', expectedContent: ['Duelo', 'desafio'] },
      { url: '/arena/ranking', expectedContent: ['Ranking', 'posicao'] },
    ];

    for (const arenaPage of arenaPages) {
      await page.goto(`${BASE_URL}${arenaPage.url}`, { waitUntil: 'networkidle' });
      const content = await page.content();
      const contentLower = content.toLowerCase();

      // Verificar se a página carregou (não é 404)
      const is404 = contentLower.includes('this page could not be found') ||
                    (contentLower.includes('"status":404') && !contentLower.includes('arena'));

      // Verificar conteúdo esperado
      const hasExpectedContent = arenaPage.expectedContent.some((text) =>
        contentLower.includes(text.toLowerCase())
      );

      const passed = !is404 && hasExpectedContent;

      // Capturar o título ou primeiro H1
      const h1Text = await page.locator('h1').first().textContent().catch(() => 'Sem H1');

      console.log(`   ${passed ? '✅' : '❌'} ${arenaPage.url}`);
      console.log(`      → Título: "${h1Text}"`);

      if (is404) {
        console.log(`      ⚠️ Página retornou 404`);
      }

      results.push({
        test: `Arena ${arenaPage.url}`,
        passed,
        details: `Título: ${h1Text}`,
      });
    }

    // =============================================
    // TESTE 4: APIs da Arena
    // =============================================
    console.log('\n┌─────────────────────────────────────────────────────────────┐');
    console.log('│ TESTE 4: APIs do Sistema Arena                              │');
    console.log('└─────────────────────────────────────────────────────────────┘\n');

    const arenaApis = [
      '/api/arena/ranking',
      '/api/arena/ligas',
      '/api/arena/duelos',
    ];

    for (const api of arenaApis) {
      try {
        const response = await page.request.get(`${BASE_URL}${api}`);
        const status = response.status();
        const data = await response.json().catch(() => ({}));

        console.log(`   ${status === 200 ? '✅' : status === 401 ? '🔒' : '❌'} [${status}] ${api}`);

        if (status === 401) {
          console.log(`      → Requer autenticação (esperado)`);
        } else if (data.error) {
          console.log(`      → Erro: ${data.error}`);
        } else if (data.ranking) {
          console.log(`      → ${data.ranking.length} usuários no ranking`);
        } else if (data.ligas) {
          console.log(`      → ${data.ligas.length} ligas`);
        }

        results.push({
          test: `API Arena ${api}`,
          passed: status === 200 || status === 401,
          details: `Status ${status}`,
        });
      } catch (e: any) {
        console.log(`   ❌ ${api}: ${e.message}`);
      }
    }

    // =============================================
    // RESUMO FINAL
    // =============================================
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║                    RESUMO DA ANÁLISE                         ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;

    console.log(`   ✅ Testes aprovados: ${passed}`);
    console.log(`   ❌ Testes falhados: ${failed}`);
    console.log(`   📊 Taxa de sucesso: ${((passed / results.length) * 100).toFixed(1)}%\n`);

    if (failed > 0) {
      console.log('   ⚠️ Testes que falharam:');
      results.filter((r) => !r.passed).forEach((r) => {
        console.log(`      - ${r.test}: ${r.details}`);
      });
    }

    // =============================================
    // EXPLICAÇÃO DAS MUDANÇAS
    // =============================================
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║               MUDANÇAS IMPLEMENTADAS                         ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    console.log('   1. CORREÇÃO DO SCHEMA DE PREVISÕES:');
    console.log('      ───────────────────────────────────────────────────────');
    console.log('      ANTES: As queries usavam "lutador_escolhido_id"');
    console.log('      DEPOIS: As queries usam "vencedor_previsto_id"');
    console.log('      MOTIVO: O novo sistema Arena usa um nome diferente');
    console.log('              para a coluna de previsão do vencedor\n');

    console.log('   2. TRATAMENTO DE ERROS COM TRY/CATCH:');
    console.log('      ───────────────────────────────────────────────────────');
    console.log('      ANTES: Se a coluna não existisse, a API falhava com 500');
    console.log('      DEPOIS: O erro é capturado e o consenso retorna vazio');
    console.log('      MOTIVO: Permite que o site funcione mesmo com schemas');
    console.log('              diferentes no banco de dados\n');

    console.log('   3. ARQUIVOS MODIFICADOS:');
    console.log('      ───────────────────────────────────────────────────────');
    console.log('      • /api/eventos/[id]/route.ts');
    console.log('      • /api/eventos/[id]/card/route.ts');
    console.log('      • /api/eventos/proximo/route.ts');
    console.log('      • /api/lutas/[id]/route.ts');
    console.log('      • /api/lutas/[id]/previsoes/route.ts');
    console.log('      • /api/ranking/route.ts\n');

    console.log('   4. SISTEMA ARENA (NOVO):');
    console.log('      ───────────────────────────────────────────────────────');
    console.log('      Páginas criadas para o sistema de previsões com login:');
    console.log('      • /arena - Página inicial');
    console.log('      • /arena/login - Autenticação');
    console.log('      • /arena/registro - Criação de conta');
    console.log('      • /arena/dashboard - Painel do usuário');
    console.log('      • /arena/ligas - Sistema de ligas');
    console.log('      • /arena/duelos - Desafios 1v1');
    console.log('      • /arena/ranking - Ranking global');
    console.log('      • /arena/perfil/[username] - Perfil público\n');

  } catch (error: any) {
    console.error('\n❌ ERRO DURANTE ANÁLISE:', error.message);
  } finally {
    await browser.close();
  }
}

runDetailedAnalysis();
