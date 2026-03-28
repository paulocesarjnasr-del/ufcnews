import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'erosa-vs-douglas',
  evento_id: null,
  slug: 'erosa-vs-douglas',
  titulo: 'Erosa vs Douglas: O Veterano da Casa Contra o Debutante de 36 Segundos',
  subtitulo: 'Julian Erosa luta em casa em Seattle contra Lerryan Douglas que nocauteou em 36 segundos no DWCS',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,80m', envergadura: '190cm', idade: 34, academia: 'Xtreme Couture, Yakima' },
      fighter2: { altura: '1,78m', envergadura: '183cm', idade: 30, academia: 'Bloodline Combat Sports, Huntington Beach' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: 'Experiencia UFC', edge: 'fighter1', impact: 8, description: 'Erosa tem 8-4 no seu terceiro stint UFC. 17 lutas no octogono. Douglas faz o debut.' },
      { factor: 'Luta em casa', edge: 'fighter1', impact: 7, description: 'Erosa nasceu em Seattle e luta em Yakima, WA. O Climate Pledge Arena e o quintal dele.' },
      { factor: 'Poder de KO', edge: 'fighter2', impact: 7, description: 'Douglas tem 5 KOs consecutivos incluindo 36 segundos no DWCS. Poder genuino.' },
    ],
    xFactor: {
      title: 'O KO de 36 Segundos',
      description: 'Douglas nocauteou Cam Teague em 36 segundos no DWCS. 7o mais rapido da historia do programa. 5 KOs seguidos. O poder e real.',
    },
  },
  fighter1_info: {
    nome: 'Julian Erosa',
    record: '31-13-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Melquizael Costa', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Darren Elkins', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Christian Rodriguez', method: 'Sub R1', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Lerryan Douglas',
    record: '13-5-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Cam Teague', method: 'KO R1 (0:36)', event: 'DWCS' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Pena (145 lbs)',
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
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Veterano da Casa vs 36 Segundos',
      tagline_sub: 'Erosa luta em Seattle com 17 lutas UFC de experiencia. Douglas traz 5 KOs consecutivos e poder brutal.',
      fighter1: {
        nome_completo: 'Julian "Juicy J" Erosa',
        apelido: 'Juicy J',
        sobrenome: 'Erosa',
        record: '31-13-0',
        ranking: 'N/R Peso Pena',
        info_extra: 'Seattle/Yakima, Washington | 34 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/EROSA_JULIAN_L_03-28.png?itok=mSlDuCCd',
      },
      fighter2: {
        nome_completo: 'Lerryan "Gunslinger" Douglas',
        apelido: 'Gunslinger',
        sobrenome: 'Douglas',
        record: '13-5-0',
        ranking: 'N/R Peso Pena',
        info_extra: 'Huntington Beach, CA | Bloodline Combat Sports (Cub Swanson) | 30 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-09/DOUGLAS_LERRYAN_R_09-09.png?itok=oQ15ZOce',
      },
    },

    narrativa: {
      html_content: `
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">Juicy J em Casa</span>
          </h3>
          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ufc-red to-ufc-red/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-ufc-red">Julian Erosa</strong> nasceu em Seattle e cresceu em Yakima. O Climate Pledge Arena e o quintal dele. Com 31-13 e 8-4 no seu terceiro stint no UFC, Erosa e um veterano que sabe exatamente como funciona o octogono. Tres finalizacoes consecutivas no R1 (Ramos, Rodriguez, Elkins) antes de perder por decisao contra Costa numa luta que rendeu FOTN. Erosa nao e prospect. E um mainstay da divisao que sempre entrega entretenimento. Potencial FOTN em qualquer luta.
              </p>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">O Gunslinger de 36 Segundos</span>
          </h3>
          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-blue-400/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-blue-400">Lerryan Douglas</strong> ganhou o contrato UFC com um nocaute de 36 segundos sobre Cam Teague no DWCS. O 7o mais rapido da historia do programa. Douglas treina com o Hall of Famer Cub Swanson no Bloodline Combat Sports em Huntington Beach. Aos 30, tem 5 KOs consecutivos e poder genuino nas maos. Mas nunca lutou no UFC. O debut e o grande teste.
              </p>
            </div>
          </div>

          <div class="rounded-xl bg-amber-400/[0.04] border border-amber-400/10 p-5">
            <p class="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold mb-2">Bastidor</p>
            <p class="text-sm text-white/50">Douglas treina com Cub Swanson, Hall of Famer do UFC. Swanson e um dos melhores peso-pena da historia e traz experiencia invaluavel pro camp. O nivel de coaching e real. Mas Erosa disse em entrevista que acredita ser um "matchup favoravel" e que esta focado em buscar o finish em casa.</p>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Contexto', fighter1: 'Veterano lutando em casa (Seattle)', fighter2: 'Debut UFC apos DWCS' },
        { dimensao: 'Experiencia', fighter1: '17 lutas no UFC, 8-4 no stint atual', fighter2: '0 lutas UFC, 5 KOs seguidos' },
        { dimensao: 'Potencial', fighter1: 'FOTN candidate', fighter2: 'Poder de KO de 36 segundos' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'JUICY J DOMINA EM CASA',
          subtitulo: 'Erosa usa a experiencia e a torcida pra controlar o debutante',
          consequencias: [
            { tag: 'SEQUENCIA', texto: 'Erosa volta a vencer e se consolida como gatekeeper premium.' },
          ],
          proxima_luta: 'Erosa vs oponente ranqueado no proximo card',
        },
        fighter2_vence: {
          titulo: 'O GUNSLINGER SILENCIA SEATTLE',
          subtitulo: 'Douglas nocauteia Erosa no debut e cala a torcida da casa',
          consequencias: [
            { tag: 'IMPACTO', texto: 'Debut com KO sobre veterano. Douglas entra no radar do peso-pena.' },
          ],
          proxima_luta: 'Douglas vs prospect do peso-pena',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Julian Erosa',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu por decisao mas rendeu FOTN. Luta super competitiva.' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceira finalizacao consecutiva no R1.' },
          { date: 'Dez 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Submissao rapida no R1.' },
          { date: 'Out 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira de tres finalizacoes no R1 seguidas.' },
        ],
        full_fight_history: [
          { date: 'Jun 2020', opponent: 'Sean Woodson', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Retorno ao UFC (3o stint)' },
          { date: 'Fev 2021', opponent: 'Nate Landwehr', result: 'W', method: 'TKO R1 (0:56)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finish rapido' },
          { date: 'Jun 2021', opponent: 'SeungWoo Choi', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado' },
          { date: 'Set 2021', opponent: 'Charles Jourdain', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submissao tardia' },
          { date: 'Fev 2022', opponent: 'Steven Peterson', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida' },
          { date: 'Set 2022', opponent: 'Hakeem Dawodu', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao unanime' },
          { date: 'Dez 2022', opponent: 'Alex Caceres', result: 'L', method: 'TKO R1', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocauteado por veterano' },
          { date: 'Abr 2023', opponent: 'Fernando Padilla', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceira derrota' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Comeco da sequencia' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Sub R1' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceiro R1 finish seguido' },
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'FOTN, perdeu por decisao' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Erosa vem de 3 finalizacoes no R1 seguidas antes da derrota por decisao contra Costa (FOTN). Sempre entrega entretenimento. Luta em casa em Seattle com motivacao extra.',
      },
      fighter2: {
        nome: 'Lerryan Douglas',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Ruim', note: 'KO de 36 segundos no DWCS. 7o mais rapido da historia do programa. Ganhou contrato UFC.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS, contrato UFC' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Douglas vem de 5 KOs consecutivos e um contrato UFC ganho de forma espetacular (36 segundos). Treina com Cub Swanson no Bloodline Combat Sports. O poder e real mas o debut UFC e o grande teste.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Erosa', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '8W-4L (67%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Douglas', media_oponentes: 1, media_oponentes_label: 'Ruim', aproveitamento: 'Debut UFC', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Erosa tem 17 lutas UFC contra oponentes variados. Douglas nunca lutou no octogono. A diferenca de experiencia e massiva.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.80, valueB: 0, maxVal: 6, format: 'decimal', note: 'Douglas sem dados UFC. Erosa tem volume alto.' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 0, maxVal: 100, format: 'percent', note: 'Sem dados UFC pra Douglas.' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.20, valueB: 0, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 1.50, valueB: 0, maxVal: 3, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 65, valueB: 0, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '34 anos', fighter2: '30 anos', note: 'Douglas 4 anos mais novo' },
        { label: 'Altura', fighter1: '1,80m (5\'11")', fighter2: '1,78m (5\'10")', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '190cm (75")', fighter2: '183cm (72")', note: 'Erosa com 3 polegadas a mais' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Treinador', fighter1: 'Xtreme Couture / Yakima', fighter2: 'Cub Swanson / Bloodline Combat Sports', note: 'Douglas treina com Hall of Famer' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking', valueA: 70, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Erosa tem volume. Douglas tem poder. Niveis similares mas estilos diferentes.' },
        { label: 'Poder de KO', valueA: 62, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Douglas tem 5 KOs consecutivos. KO de 36 segundos no DWCS. O poder e genuino.' },
        { label: 'Grappling', valueA: 68, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Erosa tem submissoes diversas e sabe trabalhar no chao. Douglas e primariamente striker.' },
        { label: 'Experiencia UFC', valueA: 85, valueB: 20, labelA: 'Excelente', labelB: 'Ruim', advantage: 'fighter1', advantage_note: '17 lutas UFC vs debut. A diferenca e um abismo. Erosa sabe como funciona o octogono.' },
        { label: 'Cardio', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Erosa lutou 3 rounds varias vezes. Douglas tende a acabar rapido. Se for longo, Erosa tem vantagem.' },
        { label: 'Fator Casa', valueA: 80, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Erosa nasceu em Seattle. O Climate Pledge Arena e o quintal dele. Motivacao maxima.' },
      ],
      insight: 'Erosa tem experiencia, versatilidade e a torcida. Douglas tem poder explosivo e juventude. Se Douglas conectar cedo, acabou. Se Erosa sobreviver a explosao inicial, a experiencia e o grappling dominam.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Erosa', ko_tko: { count: 12, percent: 39 }, submission: { count: 13, percent: 42 }, decision: { count: 6, percent: 19 }, total_wins: 31 },
      fighter2: { nome: 'Douglas', ko_tko: { count: 10, percent: 77 }, submission: { count: 1, percent: 8 }, decision: { count: 2, percent: 15 }, total_wins: 13 },
      insight: 'Erosa e versatil: 39% KO + 42% sub + 19% decisao. Pode vencer de qualquer forma. Douglas e nocauteador puro: 77% KO. Se Douglas conectar, acabou. Se nao, Erosa tem mais opcoes.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1 (0-2min)', danger_level: 7, danger_label: 'VANTAGEM DOUGLAS', color: 'green', title: 'O Flash KO', description: 'Douglas tem 5 KOs consecutivos e poder genuino. Os primeiros 2 minutos sao a janela dele. Se conectar algo limpo, pode acabar como no DWCS.' },
        { rounds: 'R1 (2min+)', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'A Adaptacao', description: 'Se Erosa sobreviver os primeiros minutos, a experiencia comeca a pesar. Erosa pode buscar takedowns ou clinch pra neutralizar.' },
        { rounds: 'R2-R3', danger_level: 4, danger_label: 'VANTAGEM EROSA', color: 'red', title: 'O Veterano', description: 'Se chegar ao R2, Erosa esta no controle. 17 lutas UFC de experiencia contra um debutante que tende a acabar rapido. A torcida de Seattle empurra.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Luta em casa', fighter: 'Erosa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Erosa nasceu em Seattle. O Climate Pledge Arena e o quintal. Motivacao maxima.' },
        { icon: 'Zap', title: '5 KOs consecutivos', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Douglas nocauteou 5 seguidos incluindo 36 segundos no DWCS. O poder e real.' },
        { icon: 'Brain', title: 'Treina com Cub Swanson', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Hall of Famer como treinador. O nivel de coaching e altissimo.' },
        { icon: 'AlertTriangle', title: 'Debut no UFC', fighter: 'Douglas', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Nunca lutou no octogono. A pressao do debut contra um veterano em casa e enorme.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Erosa',
        total_probability: 58,
        scenarios: [
          { name: 'Experiencia e Versatilidade', probability: 25, method: 'Decisao Unanime', description: 'Erosa usa a experiencia pra neutralizar o poder de Douglas. Takedowns, clinch, e volume por 3 rounds.' },
          { name: 'Submissao', probability: 18, method: 'Sub R1-R2', description: 'Erosa encontra uma submissao quando Douglas entra pra troca. 13 subs na carreira.' },
          { name: 'TKO de Volume', probability: 15, method: 'TKO R2-R3', description: 'Erosa acumula dano com volume e finaliza nos rounds finais.' },
        ],
      },
      fighter2: {
        nome: 'Douglas',
        total_probability: 40,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 22, method: 'KO/TKO R1', description: 'Douglas conecta como no DWCS. Um power shot limpo contra Erosa (que absorve 4.20 strikes/min) pode encerrar rapido.' },
          { name: 'Volume e Pressao', probability: 10, method: 'Decisao', description: 'Douglas usa a juventude pra pressionar e vencer nos pontos. Menos provavel dado o estilo.' },
          { name: 'TKO por Acumulo', probability: 8, method: 'TKO R2', description: 'Douglas machuca Erosa no R1 e finaliza no R2.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Julian Erosa',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Erosa tem 17 lutas UFC de experiencia, luta em casa em Seattle, e e mais versatil que Douglas. O debutante tem poder genuino (5 KOs seguidos) mas nunca enfrentou alguem com a experiencia e o grappling de Erosa. Se Erosa sobreviver os primeiros minutos e levar a luta pro meio do round, a experiencia prevalece. Mas Douglas com Cub Swanson no corner nao e facil e o poder de KO e real.',
      x_factor: {
        title: 'FOTN Potential',
        description: 'Erosa e o tipo de lutador que faz FOTN em qualquer card. Contra um debutante explosivo em casa, espere fireworks. Essa luta pode roubar a noite.',
      },
      upset_alert: {
        title: 'Douglas Tem Poder Real',
        description: '36 segundos no DWCS. 5 KOs seguidos. Se Douglas conectar limpo nos primeiros minutos, a experiencia de Erosa nao importa. Um soco muda tudo.',
      },
      probabilities: {
        fighter1: { nome: 'Erosa', percent: 58 },
        fighter2: { nome: 'Douglas', percent: 40 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Erosa (-170)', reasoning: 'Favorito justo pela experiencia e fator casa. Mas -170 nao oferece grande valor.' },
        method: { pick: 'Luta nao vai a Decisao (+110)', reasoning: 'Erosa tem 81% finish rate (39% KO + 42% sub). Douglas tem 77% KO. Alta probabilidade de finalizacao.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Ambos sao finalizadores. Erosa vinha de 3 finishes no R1 seguidos. Douglas nocauteia em 36 segundos. Provavelmente acaba antes do R3.' },
        best_value: 'Under 2.5 Rounds e a melhor aposta. Ambos buscam o finish cedo. FOTN potential.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os primeiros 2 minutos', icon: 'Zap', description: 'Douglas e mais perigoso cedo. Se Erosa sobreviver sem ser abalado, a luta muda pro lado dele.' },
        { num: 2, title: 'O grappling de Erosa', icon: 'Target', description: 'Erosa tem 13 submissoes na carreira. Se levar ao chao, Douglas esta em territorio desconhecido.' },
        { num: 3, title: 'A torcida de Seattle', icon: 'MapPin', description: 'Erosa e de Seattle. O Climate Pledge Arena vai ser ensurdecedor quando ele entrar. A energia pode ser decisiva.' },
        { num: 4, title: 'O corner de Douglas', icon: 'Brain', description: 'Cub Swanson no corner. Hall of Famer com experiencia invaluavel. Os ajustes entre rounds podem mudar a luta.' },
        { num: 5, title: 'FOTN?', icon: 'Activity', description: 'Erosa faz FOTN em qualquer card. Contra um debutante explosivo? Espere uma luta emocionante independente do resultado.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'VETERANO DA CASA', content: 'EROSA vs DOUGLAS\nUFC Seattle | Peso Pena\n\n31-13 vs 13-5\n\nErosa: nascido em Seattle\n17 lutas UFC, 8-4\n\nDouglas: KO de 36 segundos\nno DWCS. Debut UFC.\n\nFOTN potential.', color: 'red' },
        { slide_number: 2, title: 'PREVISAO', content: 'EROSA por Decisao\n\nConfianca: MEDIA\n58% Erosa / 40% Douglas\n\nExperiencia e fator casa.\nMas Douglas tem poder REAL.\nEspere fireworks.', color: 'gold' },
      ],
      twitter: [
        { num: '1/3', text: 'Erosa vs Douglas: o veterano da casa contra o debutante de 36 segundos. Erosa nasceu em Seattle, 17 lutas UFC. Douglas nocauteou em 36s no DWCS e treina com Cub Swanson. FOTN potential.' },
        { num: '2/3', text: 'Erosa tinha 3 finishes no R1 seguidos antes de perder pra Costa (FOTN). Douglas tem 5 KOs consecutivos. Ambos buscam o finish. Under 2.5 e a aposta.' },
        { num: '3/3', text: 'Pick: Erosa por decisao. Experiencia e fator casa. Mas se Douglas conectar cedo como fez no DWCS, pode calar Seattle. Luta imperdivel.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'O cara nasceu em Seattle e luta em casa contra alguem que nocauteou em 36 SEGUNDOS no Contender Series. FOTN do card.' },
        { time: '10-25s', title: 'Matchup', text: 'Erosa: 17 lutas UFC, 3 finishes no R1 seguidos, versatil. Douglas: debut UFC, 5 KOs seguidos, treina com Cub Swanson.' },
        { time: '25-35s', title: 'Previsao', text: 'Erosa por decisao. Experiencia vence. Mas Under 2.5 e a aposta real. Ambos buscam o finish.' },
      ],
      tiktok: [
        { hook: 'Esse cara nocauteou em 36 SEGUNDOS e agora faz o debut no UFC.', body: 'Lerryan Douglas. 36 segundos no DWCS. 5 KOs seguidos. Treina com Cub Swanson, Hall of Famer. Mas o debut e contra Julian Erosa que nasceu em SEATTLE e tem 17 lutas UFC. Veterano da casa contra o debutante explosivo. FOTN potential.', cta: 'Quem leva: experiencia ou poder? Comenta!' },
      ],
      headlines: [
        'Erosa vs Douglas: O Veterano de Seattle Contra o Debutante de 36 Segundos',
        'FOTN Potential: Ambos Buscam o Finish no Peso-Pena',
        'Douglas Treina Com Cub Swanson e Traz 5 KOs Consecutivos',
        'Erosa em Casa: 17 Lutas UFC e a Torcida de Seattle Empurrando',
        'UFC Seattle: A Luta que Pode Roubar a Noite',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-170',
        fighter2_odds: '+145',
        fighter1_name: 'Julian Erosa',
        fighter2_name: 'Lerryan Douglas',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Brain', titulo: 'Experiencia UFC Massiva', stat_headline: 'EROSA TEM 17 LUTAS UFC, DOUGLAS TEM 0', contexto: 'A diferenca de experiencia no octogono e um abismo. Erosa sabe como funciona.', implicacao_aposta: 'Favorece Erosa em lutas longas. Se passar do R1, a experiencia domina.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: '5 KOs Consecutivos de Douglas', stat_headline: '36 SEGUNDOS NO DWCS, 7O MAIS RAPIDO DA HISTORIA', contexto: 'Douglas tem poder genuino. 5 nocautes seguidos. O KO do DWCS foi brutal.', implicacao_aposta: 'Favorece Douglas por KO cedo. Under 1.5 tem valor se voce acredita no poder.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'MapPin', titulo: 'Erosa em Casa em Seattle', stat_headline: 'NASCEU EM SEATTLE, CLIMATE PLEDGE ARENA E O QUINTAL', contexto: 'Fator casa real. A torcida vai empurrar Erosa em momentos decisivos.', implicacao_aposta: 'Boost emocional pra Erosa. Pode fazer diferenca em rounds apertados.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '+100', confianca: 'media', raciocinio: 'Erosa vinha de 3 finishes no R1. Douglas tem 77% KO rate. Ambos buscam o finish. Alta probabilidade de acabar antes do R3.' },
        { tipo: 'Moneyline', pick: 'Douglas (+145)', odds: '+145', confianca: 'baixa', edge_vs_mercado: 'Se voce acredita no poder explosivo do debut, +145 tem valor. Douglas pode surpreender.', raciocinio: 'Debutantes com poder sao imprevisiveis. Douglas tem 5 KOs seguidos.' },
        { tipo: 'Prop', pick: 'FOTN Bonus', odds: '+300', confianca: 'media', raciocinio: 'Erosa faz FOTN em qualquer card. A ultima derrota (vs Costa) foi FOTN. Contra um debutante explosivo em casa, espere fogo.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Douglas por Decisao',
        descricao: 'Douglas tem apenas 15% das vitorias por decisao (2 em 13). Ele quase nunca vai pros juizes. Ou nocauteia ou nao. Apostar em Douglas por decisao e ir contra o padrao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
