import 'dotenv/config';
import { queryOne } from '../src/lib/db';

async function main() {
  const a = await queryOne<{ full_analysis: string }>(
    `SELECT full_analysis FROM analises WHERE slug = 'ufc-326-holloway-vs-oliveira'`
  );
  if (!a) { console.log('Not found'); process.exit(0); }
  const fa = typeof a.full_analysis === 'string' ? JSON.parse(a.full_analysis) : a.full_analysis;

  console.log('=== HERO ===');
  console.log(JSON.stringify(fa.hero, null, 2));

  console.log('\n=== NARRATIVA (first 1000 chars) ===');
  console.log(fa.narrativa?.html_content?.substring(0, 1000));
  console.log('\nStakes:', JSON.stringify(fa.narrativa?.stakes, null, 2));

  console.log('\n=== INTANGIVEIS ===');
  for (const it of fa.intangiveis?.items || []) {
    console.log(`- ${it.title} | ${it.risk_level} | ${it.description?.substring(0, 80)}`);
  }

  console.log('\n=== PREVISAO FINAL ===');
  console.log(JSON.stringify(fa.previsao_final, null, 2));

  process.exit(0);
}

main().catch(console.error);
