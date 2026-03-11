/**
 * Quick test script for the enhanced scraper.
 * Run: npx tsx scripts/test-enhanced-scraper.ts
 */
import { getEnhancedFighterProfile } from '../src/lib/ufcstats-scraper';

async function main() {
  const name = process.argv[2] || 'Brandon Moreno';
  const maxFights = parseInt(process.argv[3] || '3');

  console.log(`\n🔍 Testing enhanced scraper for: ${name} (last ${maxFights} fights)\n`);
  console.time('Total time');

  const profile = await getEnhancedFighterProfile(name, maxFights);

  console.timeEnd('Total time');

  if (!profile) {
    console.error('❌ Failed to get profile');
    process.exit(1);
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log(`📊 ${profile.name} (${profile.record})`);
  console.log(`   Nickname: ${profile.nickname || 'None'}`);
  console.log(`   Height: ${profile.height} | Reach: ${profile.reach} | Stance: ${profile.stance}`);
  console.log(`   DOB: ${profile.dob}`);
  console.log(`   Total UFC fights: ${profile.totalUfcFights}`);
  console.log('═══════════════════════════════════════════════');

  console.log('\n📈 Career Stats:');
  console.log(`   SLpM: ${profile.slpm} | Str Acc: ${profile.strAcc}%`);
  console.log(`   SApM: ${profile.sapm} | Str Def: ${profile.strDef}%`);
  console.log(`   TD Avg: ${profile.tdAvg} | TD Acc: ${profile.tdAcc}% | TD Def: ${profile.tdDef}%`);
  console.log(`   Sub Avg: ${profile.subAvg}`);

  console.log(`\n🥊 Fight History (${profile.fightHistory.length} fights with detail data):\n`);

  for (const fight of profile.fightHistory) {
    const emoji = fight.result === 'W' ? '✅' : fight.result === 'L' ? '❌' : '➖';
    console.log(`${emoji} ${fight.result} vs ${fight.opponent} | ${fight.method} R${fight.roundFinished} ${fight.timeFinished} | ${fight.eventName}`);
    console.log(`   📅 ${fight.eventDate}`);

    const t = fight.totals;
    if (t.sigStr.attempted > 0) {
      console.log(`   📊 Totals:`);
      console.log(`      KD: ${t.kd} | Sig Str: ${t.sigStr.landed}/${t.sigStr.attempted} (${t.sigStrPct}%) | Total Str: ${t.totalStr.landed}/${t.totalStr.attempted}`);
      console.log(`      TD: ${t.td.landed}/${t.td.attempted} (${t.tdPct}%) | Sub Att: ${t.subAtt} | Rev: ${t.rev} | Ctrl: ${Math.floor(t.ctrlTimeSec / 60)}:${String(t.ctrlTimeSec % 60).padStart(2, '0')}`);
      console.log(`      🎯 By Target: Head ${t.head.landed}/${t.head.attempted} | Body ${t.body.landed}/${t.body.attempted} | Leg ${t.leg.landed}/${t.leg.attempted}`);
      console.log(`      📍 By Position: Distance ${t.distance.landed}/${t.distance.attempted} | Clinch ${t.clinch.landed}/${t.clinch.attempted} | Ground ${t.ground.landed}/${t.ground.attempted}`);
    }

    if (fight.rounds.length > 0) {
      console.log(`   📊 Per Round:`);
      for (const r of fight.rounds) {
        console.log(`      R${r.round}: SigStr ${r.sigStr.landed}/${r.sigStr.attempted} (${r.sigStrPct}%) | TD ${r.td.landed}/${r.td.attempted} | Ctrl ${Math.floor(r.ctrlTimeSec / 60)}:${String(r.ctrlTimeSec % 60).padStart(2, '0')} | Head ${r.head.landed}/${r.head.attempted} Body ${r.body.landed}/${r.body.attempted} Leg ${r.leg.landed}/${r.leg.attempted}`);
      }
    }
    console.log('');
  }

  console.log('✅ Scraper test complete!');
}

main().catch(console.error);
