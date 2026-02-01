// Script para sincronização manual via CLI
// Uso: npm run sync

async function syncRSS() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  console.log('Iniciando sincronização manual...\n');
  console.log(`URL: ${baseUrl}/api/sync\n`);

  try {
    const response = await fetch(`${baseUrl}/api/sync`, {
      method: 'POST',
    });

    const result = await response.json();

    if (result.success) {
      console.log('\n=== SINCRONIZAÇÃO CONCLUÍDA COM SUCESSO ===\n');
      console.log(`Notícias processadas: ${result.processadas}`);
      console.log(`Notícias adicionadas: ${result.adicionadas}`);
      console.log(`Notícias duplicadas: ${result.duplicadas}`);
      console.log(`Notícias rejeitadas: ${result.rejeitadas}`);
    } else {
      console.error('\n=== ERRO NA SINCRONIZAÇÃO ===\n');
      console.error(result.error);
    }
  } catch (error) {
    console.error('Erro ao executar sincronização:', error);
    console.log('\nVerifique se o servidor está rodando em:', baseUrl);
    process.exit(1);
  }
}

syncRSS();
