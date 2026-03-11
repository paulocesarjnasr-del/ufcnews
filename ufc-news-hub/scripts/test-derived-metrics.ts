/**
 * Test the full pipeline: Enhanced Scraper → Derived Metrics → Formatted Output
 * Run: npx tsx scripts/test-derived-metrics.ts "Fighter1" "Fighter2"
 */
import { getEnhancedFighterProfile } from '../src/lib/ufcstats-scraper';
import {
  calculateDerivedMetrics,
  compareFighters,
  formatEnhancedDataPackage,
  formatHeadToHeadComparison,
} from '../src/lib/derived-metrics';

async function main() {
  const name1 = process.argv[2] || 'Brandon Moreno';
  const name2 = process.argv[3] || 'Lone\'er Kavanagh';
  const maxFights = 5;

  console.log(`\n🔍 Scraping enhanced profiles (${maxFights} fights each)...\n`);
  console.time('Total pipeline');

  const [profile1, profile2] = await Promise.all([
    getEnhancedFighterProfile(name1, maxFights),
    getEnhancedFighterProfile(name2, maxFights),
  ]);

  if (!profile1 || !profile2) {
    console.error('❌ Failed to get one or both profiles');
    console.error(`  ${name1}: ${profile1 ? 'OK' : 'FAILED'}`);
    console.error(`  ${name2}: ${profile2 ? 'OK' : 'FAILED'}`);
    process.exit(1);
  }

  console.log('\n📊 Calculating derived metrics...\n');
  const metrics1 = calculateDerivedMetrics(profile1);
  const metrics2 = calculateDerivedMetrics(profile2);

  console.log('\n⚔️ Comparing fighters...\n');
  const comparison = compareFighters(profile1, metrics1, profile2, metrics2);

  console.log('\n' + '═'.repeat(70));
  console.log(formatEnhancedDataPackage('FIGHTER 1', profile1, metrics1));
  console.log('\n' + '═'.repeat(70));
  console.log(formatEnhancedDataPackage('FIGHTER 2', profile2, metrics2));
  console.log('\n' + '═'.repeat(70));
  console.log(formatHeadToHeadComparison(profile1, metrics1, profile2, metrics2, comparison));

  console.timeEnd('Total pipeline');
  console.log('\n✅ Pipeline test complete!');
}

main().catch(console.error);
