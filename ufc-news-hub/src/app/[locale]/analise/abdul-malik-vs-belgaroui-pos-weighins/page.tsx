import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'abdul-malik-vs-belgaroui-pos-weighins',
  evento_id: null,
  slug: 'abdul-malik-vs-belgaroui-pos-weighins',
  titulo: 'Abdul-Malik vs Belgaroui: Pos Weigh-Ins | O Tamanho e Real',
  subtitulo: 'No face off, a diferenca de 8cm de Belgaroui (1,96m) ficou GRITANTE. Abdul-Malik nem piscou. Ambos em 185.',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,88m', envergadura: '203cm', idade: 28, academia: 'Columbia, Maryland' },
      fighter2: { altura: '1,96m', envergadura: '198cm', idade: 31, academia: 'Glover Teixeira MMA' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: 'Tamanho Visivel', edge: 'fighter2', impact: 8, description: 'No face off, os 8cm ficaram gritantes. Belgaroui e ENORME pro peso-medio.' },
      { factor: 'Wrestling', edge: 'fighter1', impact: 8, description: 'Abdul-Malik nem piscou diante do tamanho. Confianca no wrestling.' },
      { factor: 'Kickboxing de GLORY', edge: 'fighter2', impact: 7, description: 'Belgaroui venceu Pereira e treina com ele. Nivel de striking incomparavel.' },
    ],
    xFactor: {
      title: 'O Face Off Disse Tudo',
      description: 'Belgaroui ENORME olhando pra baixo. Abdul-Malik sem medo olhando pra cima. A dinamica visual e a historia da luta: tamanho vs determinacao.',
    },
  },
  fighter1_info: {
    nome: 'Mansur Abdul-Malik',
    record: '9-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Antonio Trocoli', method: 'Sub R1 (guilhotina, 1:09)', event: 'UFC 323' },
      { result: 'D', opponent: 'Cody Brundage', method: 'Empate Majoritario', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Nick Klein', method: 'TKO R2', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Yousri Belgaroui',
    record: '11-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Azamat Bekoev', method: 'TKO R3', event: 'UFC Vancouver' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Pos Weigh-Ins: O Tamanho e Real',
      tagline_sub: 'No face off, Belgaroui (1,96m) olhava pra BAIXO. Abdul-Malik nem piscou. A pick em continua 50/50.',
      fighter1: {
        nome_completo: 'Mansur Abdul-Malik',
        apelido: '',
        sobrenome: 'Abdul-Malik',
        record: '9-0-1',
        ranking: 'N/R Peso Medio',
        info_extra: 'Columbia, Maryland | 28 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/ABDUL-MALIK_MANSUR_L_03-28.png?itok=E7MoTnaG',
      },
      fighter2: {
        nome_completo: 'Yousri "Baby Face Assassin" Belgaroui',
        apelido: 'Baby Face Assassin',
        sobrenome: 'Belgaroui',
        record: '11-2-0',
        ranking: 'N/R Peso Medio',
        info_extra: 'Holanda/Tunisia | Glover Teixeira MMA | 31 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/BELGAROUI_YOUSRI_R_10-18.png?itok=g7i7Fdzt',
      },
    },

    narrativa: {
      html_content: `
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Atualizacao Pos Weigh-Ins</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-emerald-400/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">PESAGEM E FACE OFF</p>
              <p class="text-sm text-white/60 leading-relaxed">
                Ambos bateram 185 sem problemas. Mas o face off contou a historia: <strong class="text-blue-400">Belgaroui</strong> com 1,96m olhava pra BAIXO enquanto <strong class="text-ufc-red">Abdul-Malik</strong> olhava pra CIMA. A diferenca de 8cm que ja sabiamos ficou absolutamente gritante ao vivo. Belgaroui parecia um meio-pesado ao lado de Abdul-Malik. Mas o detalhe crucial: Abdul-Malik NAO piscou. Nenhum sinal de intimidacao. O wrestler invicto olhou pra cima com a mesma determinacao de quem ja superou adversidades maiores que tamanho.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Abdul-Malik no Face Off</p>
                <p class="font-display text-lg text-white mb-2">SEM MEDO</p>
                <p class="text-xs text-white/50 leading-relaxed">Olhou pra cima e nao piscou. A confianca no wrestling e no plano de jogo e evidente. 28 anos, invicto, e sem intimidacao pelo tamanho.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-blue-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Belgaroui no Face Off</p>
                <p class="font-display text-lg text-white mb-2">IMPONENTE</p>
                <p class="text-xs text-white/50 leading-relaxed">1,96m no peso-medio. Olhava pra baixo literalmente. O tamanho e uma vantagem visual e fisica inegavel. Treina com Pereira. Confiante e tranquilo.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-6">
            <span class="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">O Que Nao Mudou</span>
          </h3>
          <div class="relative rounded-xl overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-1 bg-amber-400 rounded-full"></div>
            <div class="pl-5 py-3">
              <p class="text-sm text-white/50 leading-[1.8]">Essa continua sendo a pick em do card. Odds basicamente 50/50. O face off confirmou o que ja sabiamos: Belgaroui e ENORME e Abdul-Malik nao tem medo. Wrestling D1 vs Kickboxing GLORY. Quem dita onde a luta acontece ganha. A pesagem nao mudou a dinamica fundamental.</p>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Odds', fighter1: '-118 (basicamente 50/50)', fighter2: '+105' },
        { dimensao: 'Estilo', fighter1: 'Wrestling D1, sem medo do tamanho', fighter2: 'Kickboxing GLORY, 1,96m (GRITANTE ao vivo)' },
        { dimensao: 'Face Off', fighter1: 'Olhou pra cima, nao piscou', fighter2: 'Olhou pra baixo, imponente' },
        { dimensao: 'UFC Record', fighter1: '4-0 (3 finishes)', fighter2: '1-0 (TKO R3)' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O WRESTLING RESOLVE',
          subtitulo: 'Abdul-Malik leva ao chao e controla. Tamanho nao funciona de costas.',
          consequencias: [
            { tag: 'INVICTO', texto: 'Abdul-Malik prova que wrestling anula tamanho e kickboxing de elite.' },
          ],
          proxima_luta: 'Abdul-Malik vs oponente ranqueado',
        },
        fighter2_vence: {
          titulo: 'O TAMANHO E O STRIKING VENCEM',
          subtitulo: 'Belgaroui usa a altura e o jab pra dominar na distancia. Confirmado no face off.',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Belgaroui sobe rapidamente com 2-0 no UFC.' },
          ],
          proxima_luta: 'Belgaroui vs oponente ranqueado',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1 (guilhotina, 1:09)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina em 69 segundos.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Empate Majoritario', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate controverso.' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Resiliencia e poder.' },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrubado mas respondeu' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'MD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate' },
          { date: 'Dez 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Abdul-Malik nao piscou diante do tamanho de Belgaroui. A confianca do invicto e real. 4-0 com 3 finalizacoes no UFC.',
      },
      fighter2: {
        nome: 'Yousri Belgaroui',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Venceu wrestler por TKO.' },
        ],
        full_fight_history: [
          { date: 'Out 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Belgaroui imponente no face off. O tamanho e ainda mais impressionante ao vivo. Treina com Pereira diariamente. Confiante e tranquilo.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Abdul-Malik', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '4W-0L-1D (90%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Belgaroui', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '1W-0L (100%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum no MMA. O face off confirmou: Wrestling D1 vs Kickboxing GLORY com diferenca de tamanho gritante.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.50, valueB: 3.80, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 55, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.80, valueB: 2.50, maxVal: 5, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 62, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 3.20, valueB: 0.50, maxVal: 5, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 70, valueB: 65, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '28 anos', fighter2: '31 anos', note: 'Abdul-Malik mais jovem' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,96m (6\'5")', note: 'Belgaroui 8cm MAIS ALTO (GRITANTE no face off)' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '198cm (78")', note: 'Abdul-Malik com reach maior apesar de menor' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Background', fighter1: 'Wrestling D1, Maryland', fighter2: 'Kickboxing GLORY (27-7), venceu Pereira', note: 'Grappling vs Striking' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 62, valueB: 85, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Kickboxer profissional. Venceu Pereira. O tamanho ficou GRITANTE no face off.' },
        { label: 'Wrestling Ofensivo', valueA: 82, valueB: 45, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Abdul-Malik nao piscou. A confianca no wrestling e a arma.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 75, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Ambos tem poder.' },
        { label: 'Defesa de Takedown', valueA: 70, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Belgaroui defendeu no debut mas Abdul-Malik e mais persistente.' },
        { label: 'Tamanho e Fisico', valueA: 65, valueB: 90, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'No face off, a diferenca era absurda. 1,96m olhando pra baixo.' },
        { label: 'Mentalidade', valueA: 80, valueB: 72, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Abdul-Malik nem piscou diante do gigante. Isso conta.' },
      ],
      insight: 'A pesagem e o face off confirmaram a dinamica sem mudar nada. O tamanho de Belgaroui e real e impressionante ao vivo. A determinacao de Abdul-Malik tambem. Luta genuinamente 50/50.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Abdul-Malik', ko_tko: { count: 5, percent: 56 }, submission: { count: 3, percent: 33 }, decision: { count: 1, percent: 11 }, total_wins: 9 },
      fighter2: { nome: 'Belgaroui', ko_tko: { count: 8, percent: 73 }, submission: { count: 1, percent: 9 }, decision: { count: 2, percent: 18 }, total_wins: 11 },
      insight: 'Ambos finalizadores. A pesagem nao muda o perfil. Se ficar em pe, Belgaroui com 73% KO. Se for ao chao, Abdul-Malik com mix de TKO e sub.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 6, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Quem Dita o Plano', description: 'O R1 decide tudo. No face off, Belgaroui era enorme. Abdul-Malik nao tinha medo. Os primeiros 2 minutos sao criticos.' },
        { rounds: 'R2', danger_level: 5, danger_label: 'VANTAGEM BELGAROUI', color: 'green', title: 'Cardio e Adaptacao', description: 'Se Belgaroui sobreviver o wrestling, o R2 e dele. Kickboxers melhoram com o tempo.' },
        { rounds: 'R3', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Round Decisivo', description: 'Se estiver apertado, o R3 decide. Quem for mais determinado ganha.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Activity', title: 'Tamanho GRITANTE no Face Off', fighter: 'Belgaroui', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '1,96m olhando pra baixo. A diferenca visual era absurda. O tamanho e uma vantagem REAL no cage.' },
        { icon: 'Brain', title: 'Abdul-Malik Nem Piscou', fighter: 'Abdul-Malik', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Diante de um gigante, Abdul-Malik olhou pra cima sem medo. A mentalidade de quem nao se intimida.' },
        { icon: 'Zap', title: 'Belgaroui Venceu Pereira', fighter: 'Belgaroui', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Venceu Pereira no GLORY e treina com ele. Nivel de striking de classe mundial.' },
        { icon: 'Target', title: 'Wrestling D1', fighter: 'Abdul-Malik', risk_level: 'POSITIVO', risk_color: 'green', description: '3.20 TDs/15min. A arma pra anular o tamanho e o kickboxing.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 46,
        scenarios: [
          { name: 'Wrestling e Ground Control', probability: 22, method: 'Decisao Unanime', description: 'Abdul-Malik fecha o gap de tamanho e leva ao chao repetidamente.' },
          { name: 'Ground and Pound', probability: 14, method: 'TKO R1-R2', description: 'Abdul-Malik derruba o gigante e finaliza com GnP.' },
          { name: 'Guilhotina', probability: 10, method: 'Sub R1-R2', description: 'Belgaroui abaixa a cabeca e Abdul-Malik encaixa a guilhotina.' },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 52,
        scenarios: [
          { name: 'Kickboxing de Distancia', probability: 25, method: 'Decisao Unanime', description: 'Belgaroui usa o tamanho (ainda mais evidente no face off) e o jab pra vencer nos pontos.' },
          { name: 'Nocaute no Striking', probability: 18, method: 'KO/TKO R2-R3', description: 'Belgaroui conecta com a vantagem de altura e poder. Contragolpe devastador.' },
          { name: 'TKO Tardio', probability: 9, method: 'TKO R3', description: 'Belgaroui acumula dano e encerra no R3.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Yousri Belgaroui',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'A pesagem e o face off confirmaram a dinamica sem mudar a previsao. O tamanho de Belgaroui e AINDA MAIS impressionante ao vivo (1,96m olhando pra baixo), mas Abdul-Malik nem piscou, mostrando a mentalidade do wrestler invicto. A previsao se mantem: Belgaroui por decisao com o kickboxing e o tamanho controlando a distancia. Mas a confianca continua MEDIA porque Abdul-Malik pode anular tudo com wrestling persistente. Pick em genuina.',
      x_factor: {
        title: 'O Face Off Visual',
        description: 'A diferenca de tamanho ao vivo era GRITANTE. Se Belgaroui usar o jab e manter distancia, Abdul-Malik vai ter que percorrer muita distancia pra chegar no takedown. Mas Abdul-Malik olhou pra cima sem medo. Isso conta.',
      },
      upset_alert: {
        title: 'Abdul-Malik e Persistente e Sem Medo',
        description: 'O face off mostrou: Abdul-Malik nao se intimida. Vai tentar o takedown 4, 5, 6 vezes se precisar. A persistencia pode quebrar a defesa de Belgaroui ao longo de 3 rounds.',
      },
      probabilities: {
        fighter1: { nome: 'Abdul-Malik', percent: 46 },
        fighter2: { nome: 'Belgaroui', percent: 52 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Belgaroui (+105)', reasoning: 'Coin flip com leve edge pro kickboxer. O tamanho ao vivo e IMPRESSIONANTE. +105 e valor minimo.' },
        method: { pick: 'Vai para Decisao (-130)', reasoning: 'Luta apertada entre estilos opostos. Nenhum vai dominar facilmente.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Luta equilibrada, ambos com gas. Vai a distancia.' },
        best_value: 'Over 2.5 rounds continua sendo a aposta mais segura. A pesagem nao mudou nada na dinamica. Luta de 3 rounds apertada.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A distancia no cage', icon: 'Activity', description: 'O face off mostrou: Belgaroui e ENORME. Se manter distancia com o jab, Abdul-Malik vai ter dificuldade. Observe se Abdul-Malik consegue fechar o gap.' },
        { num: 2, title: 'O primeiro takedown', icon: 'Target', description: 'Abdul-Malik nao piscou diante do tamanho. Vai tentar o takedown cedo. Se completar, esta no jogo. Se Belgaroui defender, a distancia favorece o kickboxer.' },
        { num: 3, title: 'O jab de Belgaroui', icon: 'Zap', description: 'Com 1,96m e kickboxing GLORY, o jab e a arma principal. O face off mostrou: essa altura e real e intimidante.' },
        { num: 4, title: 'A mentalidade de Abdul-Malik', icon: 'Brain', description: 'Nem piscou diante do gigante. Observe se essa confianca se traduz em agressividade desde o R1.' },
        { num: 5, title: 'O R3 se estiver apertado', icon: 'Shield', description: 'Pick em. O R3 provavelmente decide. Observe quem tem mais urgencia e determinacao.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'POS WEIGH-INS', content: 'ABDUL-MALIK vs BELGAROUI\nPOS PESAGEM\n\nNo face off:\nBelgaroui OLHANDO PRA BAIXO (1,96m)\nAbdul-Malik NEM PISCOU\n\nO tamanho e GRITANTE ao vivo.\nA determinacao tambem.', color: 'gold' },
        { slide_number: 2, title: 'PREVISAO MANTIDA', content: 'BELGAROUI por Decisao\n\nConfianca: MEDIA\n52% Belgaroui / 46% Abdul-Malik\n\nPick em genuina.\nO tamanho ao vivo impressiona.\nMas o wrestling sem medo tambem.\n\nMelhor aposta: Over 2.5 Rounds', color: 'gold' },
      ],
      twitter: [
        { num: '1/3', text: 'POS WEIGH-INS: Abdul-Malik vs Belgaroui. No face off, a diferenca de 8cm era ABSURDA. Belgaroui olhando pra baixo, Abdul-Malik olhando pra cima SEM PISCAR. A luta mais equilibrada do card.' },
        { num: '2/3', text: 'A pesagem confirmou sem mudar nada. O tamanho de Belgaroui e REAL e impressionante ao vivo. A determinacao de Abdul-Malik tambem e REAL. 50/50 genuino.' },
        { num: '3/3', text: 'Pick se mantem: Belgaroui por decisao. Over 2.5 rounds. Mas se Abdul-Malik fechar o gap e levar ao chao, qualquer coisa acontece. Pick em do card.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'No face off, Belgaroui com 1,96m olhava PRA BAIXO e Abdul-Malik olhava PRA CIMA sem piscar. A luta mais equilibrada do card.' },
        { time: '10-25s', title: 'Analise', text: 'A pesagem nao mudou nada. O tamanho e real, a determinacao tambem. Wrestling D1 vs Kickboxing GLORY. Over 2.5 rounds. Pick em.' },
      ],
      tiktok: [
        { hook: 'No face off, um olhava PRA BAIXO e o outro PRA CIMA sem medo.', body: 'Belgaroui: 1,96m no peso-medio. GLORY kickboxing 27-7. Venceu PEREIRA. No face off, olhava pra baixo. Abdul-Malik: 1,88m. Wrestling D1. Invicto. Olhou pra CIMA e nao piscou. A luta mais equilibrada do card. 50/50 genuino.', cta: 'Tamanho ou wrestling? Comenta!' },
      ],
      headlines: [
        'Pos Weigh-Ins: O Tamanho de Belgaroui e GRITANTE Mas Abdul-Malik Nao Piscou',
        'Face Off Confirmou: 1,96m vs Wrestling D1 e a Pick Em do Card',
        'Belgaroui Olhando Pra Baixo, Abdul-Malik Sem Medo: A Previa Perfeita',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-118',
        fighter2_odds: '+105',
        fighter1_name: 'Mansur Abdul-Malik',
        fighter2_name: 'Yousri Belgaroui',
        source: 'Media de casas de apostas pos weigh-ins (marco 2026)',
      },
      edges: [
        { icon: 'Activity', titulo: 'Tamanho GRITANTE no Face Off', stat_headline: 'BELGAROUI 1,96M OLHANDO PRA BAIXO. A DIFERENCA ERA ABSURDA.', contexto: 'O face off confirmou: o tamanho e REAL e impressionante ao vivo. Vantagem de distancia enorme.', implicacao_aposta: 'Favorece Belgaroui na distancia. O jab e a altura controlam o cage.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Abdul-Malik Nem Piscou', stat_headline: 'OLHOU PRA CIMA SEM MEDO DIANTE DO GIGANTE', contexto: 'A mentalidade do wrestler invicto. Nao se intimida. Vai tentar o takedown ate conseguir.', implicacao_aposta: 'Abdul-Malik por decisao (wrestling control) tem valor se conseguir levar ao chao.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Kickboxing GLORY de Belgaroui', stat_headline: '27-7 NO GLORY. VENCEU PEREIRA. TREINA COM PEREIRA.', contexto: 'O nivel de striking e de classe mundial. Agora com o tamanho confirmado ao vivo, a vantagem em pe e clara.', implicacao_aposta: 'Se ficar em pe, Belgaroui domina. Under so tem valor se Abdul-Malik conectar algo pesado.', edge_level: 'forte', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-140', confianca: 'media', raciocinio: 'Luta equilibrada de estilos. Nenhum domina facilmente. A pesagem confirmou: ambos prontos, vai a distancia.' },
        { tipo: 'Moneyline', pick: 'Belgaroui (+105)', odds: '+105', confianca: 'media', edge_vs_mercado: 'O tamanho ao vivo e mais impressionante que nos numeros. +105 tem leve valor.', raciocinio: 'Kickboxing, tamanho, treino com Pereira. A +105, vale.' },
        { tipo: 'Metodo', pick: 'Abdul-Malik por Decisao', odds: '+200', confianca: 'baixa', raciocinio: 'Se o wrestling funcionar sem finish, pode ganhar nos pontos. Abdul-Malik sem medo confirma a intencao.' },
      ],
      armadilha: {
        titulo: 'Armadilha: KO Rapido de Qualquer Lado',
        descricao: 'O face off mostrou tamanho vs determinacao, nao bravata. Luta tecnica e equilibrada. Apostas em Under 1.5 sao arriscadas pra essa dinamica.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
