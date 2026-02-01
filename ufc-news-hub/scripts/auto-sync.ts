/**
 * Script de Sincronização Automática
 *
 * Este script roda em segundo plano e busca novas notícias
 * automaticamente a cada X minutos.
 *
 * Uso: npm run auto-sync
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const SYNC_URL = 'http://localhost:3000/api/sync';
const INTERVAL_MINUTES = parseInt(process.env.SYNC_INTERVAL_MINUTES || '5', 10);
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

async function syncNews(): Promise<void> {
  const now = new Date();
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`⏰ [${formatTime(now)}] Iniciando sincronização...`);
  console.log('═'.repeat(60));

  try {
    const response = await fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.success) {
      console.log(`\n✅ Sincronização concluída!`);
      console.log(`   📊 Processadas:  ${result.processadas}`);
      console.log(`   ➕ Adicionadas:  ${result.adicionadas}`);
      console.log(`   🔄 Duplicadas:   ${result.duplicadas}`);
      console.log(`   ❌ Rejeitadas:   ${result.rejeitadas}`);

      if (result.adicionadas > 0) {
        console.log(`\n🎉 ${result.adicionadas} notícia(s) nova(s) adicionada(s)!`);
      }
    } else {
      console.log(`\n⚠️  Sincronização com problemas: ${result.error || 'Erro desconhecido'}`);
    }

  } catch (error) {
    console.error(`\n❌ Erro na sincronização:`, error instanceof Error ? error.message : error);
    console.log(`   Verifique se o servidor Next.js está rodando em http://localhost:3000`);
  }

  // Próxima sincronização
  const nextSync = new Date(Date.now() + INTERVAL_MS);
  console.log(`\n⏳ Próxima sincronização: ${formatTime(nextSync)}`);
  console.log('─'.repeat(60));
}

async function main(): Promise<void> {
  console.clear();
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           UFC NEWS HUB - SINCRONIZAÇÃO AUTOMÁTICA          ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  📅 Data: ${formatDate(new Date())}                                    ║`);
  console.log(`║  ⏱️  Intervalo: ${INTERVAL_MINUTES} minutos                                   ║`);
  console.log(`║  🔗 Fonte: MMAMania RSS                                    ║`);
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log('║  Pressione Ctrl+C para parar                               ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  // Primeira sincronização imediata
  await syncNews();

  // Configurar intervalo
  setInterval(syncNews, INTERVAL_MS);

  // Manter processo rodando
  process.on('SIGINT', () => {
    console.log('\n\n👋 Sincronização automática encerrada.');
    process.exit(0);
  });
}

main().catch(console.error);
