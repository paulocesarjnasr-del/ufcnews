---
name: fight-analyst
description: Generate detailed 15-section pre-fight analysis for UFC main card fights
---

# Fight Analyst: $ARGUMENTS

## Overview

Generate a complete 15-section pre-fight analysis for the specified UFC fight(s). This skill delegates to the `fight-analyst-maincard` agent.

## Steps

1. **Parse the request**
   - Identify: fighter names, event name/number, fight type (single fight or full main card)
   - If only an event is specified, look up all main card fights

2. **Research (3 parallel agents)**
   Launch 3 research sub-agents simultaneously:
   - **Fighter A Profile**: record, stats, last 5 fights, training camp, injuries, UFC.com fullbody image
   - **Fighter B Profile**: same pattern
   - **Event & Matchup Context**: odds, common opponents, preview analysis, rematch history

3. **Compile briefing**
   Organize research into 6 layers: Raw Stats, Fight History, Momentum, Competition Level, Narrative, Intangibles & Betting.

4. **Generate analysis page**
   Create the page at `src/app/analise/[slug]/page.tsx` with:
   - Import `FullAnalysisView` from `@/components/analise/FullAnalysisView`
   - Import `FullSingleAnalise` type from `@/types/analise`
   - Define `const analise: FullSingleAnalise` with all 15 sections populated
   - Render `<FullAnalysisView analise={analise} />`

5. **Verify**
   ```bash
   cd ufc-news-hub && npx tsc --noEmit
   ```

## Data Contract

See @.claude/rules/fight-analyst-sections.md for the complete 15-section data specification.
See @.claude/agents/fight-analyst-maincard.md for rules, writing style, and quality checklist.

## Important

- **NEVER invent statistics.** Every number must come from research.
- **ALL text in Brazilian Portuguese.** Conversational, opinionated, expert tone.
- **No travessoes** (— or –) in prose text.
- **No banned words:** contendor, contender, penas, leves, pesos-pesados
- **Use fighter names,** never "Lutador 1" or "Lutador 2"
- Components already exist. DO NOT create inline components, CSS, or Tailwind in the page.
- `fighter1 = RED`, `fighter2 = BLUE` (hardcoded in components)
- Run quality checklist before delivering (see agent file)

## Triggers

- "fight analyst: [Fighter A] vs [Fighter B]"
- "analise main card [event]"
- "fight analyst main card: [event]"
- "analise [Fighter A] vs [Fighter B]"
- "gera analise para [event/fight]"
- "roda o fight analyst"
