import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'grasso-vs-barber',
  evento_id: null,
  slug: 'grasso-vs-barber',
  titulo: 'Grasso vs Barber II: A Revanche de 5 Anos',
  subtitulo: 'As trajetorias se inverteram completamente desde 2021. Quem se adaptou melhor?',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,63m', envergadura: '163cm', idade: 33, academia: 'Lobo Gym' },
      fighter2: { altura: '1,68m', envergadura: '173cm', idade: 27, academia: 'Colorado' },
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
      { factor: 'Momentum', edge: 'fighter2', impact: 9, description: 'Barber com 7 vitorias seguidas vs Grasso com 2 derrotas seguidas.' },
      { factor: 'Volume de Strikes', edge: 'fighter2', impact: 7, description: 'Barber com 5.44 SLpM vs 4.49 de Grasso.' },
      { factor: 'Experiencia de Titulo', edge: 'fighter1', impact: 6, description: 'Grasso lutou 3x pelo titulo contra Shevchenko.' },
    ],
    xFactor: {
      title: 'A Versao 2026 de Barber',
      description: 'Barber aos 27 nao e a mesma de 2021 aos 22. 7 vitorias seguidas, mais atletica, mais madura.',
    },
  },
  fighter1_info: {
    nome: 'Alexa Grasso',
    record: '16-4-1',
    ultimasLutas: [
      { result: 'L', opponent: 'Natalia Silva', method: 'Decisao Unanime', event: 'UFC 315' },
      { result: 'L', opponent: 'Valentina Shevchenko', method: 'Decisao Unanime', event: 'UFC 306' },
      { result: 'D', opponent: 'Valentina Shevchenko', method: 'Empate Dividido', event: 'Noche UFC' },
    ],
  },
  fighter2_info: {
    nome: 'Maycee Barber',
    record: '16-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Karine Silva', method: 'Decisao Unanime', event: 'UFC 323' },
      { result: 'W', opponent: 'Rose Namajunas', method: 'Decisao Unanime', event: 'UFC 317' },
      { result: 'W', opponent: 'Amanda Ribas', method: 'TKO R2', event: 'UFC Fight Night' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Mosca Feminino (125 lbs)',
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
      categoria_peso: 'Peso Mosca Feminino (125 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'A Revanche de 5 Anos',
      tagline_sub: 'Grasso venceu em 2021. Desde entao, tudo mudou. Trajetorias invertidas, mesma rivalidade.',
      fighter1: {
        nome_completo: 'Alexa Grasso',
        apelido: '',
        sobrenome: 'Grasso',
        record: '16-4-1',
        ranking: '#3 Peso Mosca Feminino',
        info_extra: 'Guadalajara, Mexico | 33 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/GRASSO_ALEXA_L_03-28.png?itok=yNu__dee',
      },
      fighter2: {
        nome_completo: 'Maycee "The Future" Barber',
        apelido: 'The Future',
        sobrenome: 'Barber',
        record: '16-3-0',
        ranking: '#5 Peso Mosca Feminino',
        info_extra: 'Colorado, EUA | 27 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/BARBER_MAYCEE_L_12-06.png?itok=PsAi5oK3',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Fevereiro de 2021: O Comeco</h3>
        <p class="mb-4">
          No UFC 258, <strong class="text-ufc-red">Alexa Grasso</strong> enfrentou uma <strong class="text-blue-400">Maycee Barber</strong> de 22 anos que ainda se recuperava de uma lesao no joelho. Grasso venceu por decisao unanime e parecia destinada a grandes coisas. Barber, com tres derrotas em quatro lutas, parecia enterrada.
        </p>
        <p class="mb-4">
          Cinco anos depois, as trajetorias se inverteram de forma dramatica. Grasso subiu ao topo: venceu Shevchenko por submissao e se tornou campeao do peso-mosca em marco de 2023. Mas desde entao, a queda foi vertiginosa: empate na revanche com Shevchenko, derrota por decisao no UFC 306, e outra derrota contra Natalia Silva. A mexicana perdeu o titulo e vem de duas derrotas consecutivas.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Barber: A Fenix</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Maycee Barber</strong> fez o caminho contrario. Depois de 2021, encadeou SETE vitorias consecutivas que incluem nomes como Rose Namajunas, Amanda Ribas, e Karine Silva. Aos 27 anos, Barber e uma lutadora completamente diferente: mais atletica, mais paciente, mais madura. A "Future" que parecia precoce demais em 2021 finalmente chegou ao nivel que o apelido prometia.
        </p>
        <p class="mb-4">
          A revanche e perfeita: Grasso descendo, Barber subindo. A favorita de 2021 virou azarao. A derrotada virou favorita. Quem se adaptou melhor em 5 anos?
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#3 Peso Mosca', fighter2: '#5 Peso Mosca' },
        { dimensao: 'Sequencia', fighter1: '2 derrotas seguidas', fighter2: '7 vitorias seguidas' },
        { dimensao: 'Objetivo', fighter1: 'Parar a queda e se manter relevante', fighter2: 'Vingar 2021 e buscar titulo' },
        { dimensao: 'Risco', fighter1: '3a derrota seguida pode tirar do top 5', fighter2: 'Perder pra mesma adversaria 2x' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A EXPERIENCIA PREVALECE',
          subtitulo: 'Grasso usa a experiencia de titulo para frustrar Barber e virar a narrativa',
          consequencias: [
            { tag: 'RANKING', texto: 'Grasso para a queda e se mantem no top 3, possivelmente em eliminatoria pelo titulo' },
            { tag: 'NARRATIVA', texto: 'Prova que 2x contra Shevchenko nao destruiu a confianca' },
          ],
          proxima_luta: 'Grasso vs vencedora de uma eliminatoria pelo titulo',
        },
        fighter2_vence: {
          titulo: 'THE FUTURE CHEGOU',
          subtitulo: 'Barber vinga a derrota de 2021 e consolida a sequencia de 8 vitorias',
          consequencias: [
            { tag: 'TITULO', texto: 'Barber com 8 vitorias seguidas entra na conversa pelo titulo do peso-mosca' },
            { tag: 'EVOLUCAO', texto: 'Prova que a versao 2026 de Barber e incomparavel com a de 2021' },
          ],
          proxima_luta: 'Barber vs campeao ou eliminatoria pelo titulo',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Alexa Grasso',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Natalia Silva', result: 'L', method: 'Decisao Unanime', opponent_rank: '#8 FLW', quality_score: 3, quality_label: 'Bom', note: 'Segunda derrota seguida. Grasso nao conseguiu impor o jogo e foi superada no volume.' },
          { date: 'Set 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'Decisao Unanime', opponent_rank: 'Ex-campeao', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu o titulo na trilogia. Dominada no chao por Shevchenko por quase 15 minutos.' },
          { date: 'Set 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'Empate Dividido', opponent_rank: 'Ex-campeao', quality_score: 5, quality_label: 'Excelente', note: 'Revanche pelo titulo terminou empatada. Grasso reteve.' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Submissao R4 (face crank)', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Surpreendeu o mundo com submissao sobre Shevchenko. Ganhou o titulo.' },
        ],
        full_fight_history: [
          { date: 'Nov 2016', opponent: 'Heather Jo Clark', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC' },
          { date: 'Fev 2017', opponent: 'Felice Herrig', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira derrota' },
          { date: 'Ago 2017', opponent: 'Randa Markos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida' },
          { date: 'Mai 2018', opponent: 'Tatiana Suarez', result: 'L', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Submetida pela wrestler' },
          { date: 'Jun 2019', opponent: 'Karolina Kowalkiewicz', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida' },
          { date: 'Set 2019', opponent: 'Carla Esparza', result: 'L', method: 'MD', opponent_rank: '#5 SW', quality_score: 3, quality_label: 'Bom', note: 'Decisao majoritaria' },
          { date: 'Ago 2020', opponent: 'Ji Yeon Kim', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mudou pra flyweight' },
          { date: 'Fev 2021', opponent: 'Maycee Barber', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira luta contra Barber' },
          { date: 'Mar 2022', opponent: 'Joanne Wood', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submissao rapida' },
          { date: 'Out 2022', opponent: 'Viviane Araujo', result: 'W', method: 'UD', opponent_rank: '#6 FLW', quality_score: 3, quality_label: 'Bom', note: 'Ganhou shot pelo titulo' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Sub R4 (face crank)', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'GANHOU TITULO' },
          { date: 'Set 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'SD (empate)', opponent_rank: 'Ex-campeao', quality_score: 5, quality_label: 'Excelente', note: 'Reteve titulo por empate' },
          { date: 'Set 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'UD', opponent_rank: 'Ex-campeao', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo na trilogia' },
          { date: 'Mai 2025', opponent: 'Natalia Silva', result: 'L', method: 'UD', opponent_rank: '#8 FLW', quality_score: 3, quality_label: 'Bom', note: 'Segunda derrota seguida' },
        ],
        momentum_score: 3,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'descending',
        momentum_note: 'Grasso esta em queda. Perdeu o titulo e depois perdeu pra Natalia Silva. Duas derrotas seguidas depois de ter sido campeao. Aos 33 anos, a janela esta se fechando. Mas a experiencia de 3 lutas contra Shevchenko e um ativo que poucas no peso-mosca tem.',
      },
      fighter2: {
        nome: 'Maycee Barber',
        color: 'blue',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Karine Silva', result: 'W', method: 'Decisao Unanime', opponent_rank: '#7 FLW', quality_score: 3, quality_label: 'Bom', note: 'Setima vitoria seguida. Dominou a brasileira por 3 rounds.' },
          { date: 'Jun 2025', opponent: 'Rose Namajunas', result: 'W', method: 'Decisao Unanime', opponent_rank: '#4 FLW', quality_score: 4, quality_label: 'Muito Bom', note: 'Venceu a ex-campeao de duas divisoes. A vitoria mais impressionante da sequencia.' },
          { date: 'Fev 2025', opponent: 'Amanda Ribas', result: 'W', method: 'TKO R2', opponent_rank: '#9 FLW', quality_score: 3, quality_label: 'Bom', note: 'Finalizou Ribas no segundo round com ground and pound.' },
          { date: 'Out 2024', opponent: 'Taila Santos', result: 'W', method: 'Decisao Unanime', opponent_rank: '#5 FLW', quality_score: 4, quality_label: 'Muito Bom', note: 'Dominou a brasileira que ja desafiou o titulo.' },
        ],
        full_fight_history: [
          { date: 'Nov 2018', opponent: 'Hannah Cifers', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC' },
          { date: 'Mar 2019', opponent: 'JJ Aldrich', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda vitoria' },
          { date: 'Out 2019', opponent: 'Gillian Robertson', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'R1 finish' },
          { date: 'Jan 2020', opponent: 'Roxanne Modafferi', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Upset. Lesao no joelho durante a luta.' },
          { date: 'Fev 2021', opponent: 'Alexa Grasso', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Segunda derrota seguida. Vindo de lesao.' },
          { date: 'Jul 2021', opponent: 'Miranda Maverick', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Comeco da sequencia de vitorias' },
          { date: 'Abr 2022', opponent: 'Montana De La Rosa', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Controle por 3 rounds' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceira seguida' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida apertada' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'TKO R2', opponent_rank: '#9 FLW', quality_score: 3, quality_label: 'Bom', note: 'Finalizacao por strikes' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Decisao unanime' },
          { date: 'Out 2024', opponent: 'Taila Santos', result: 'W', method: 'UD', opponent_rank: '#5 FLW', quality_score: 4, quality_label: 'Muito Bom', note: 'Ex-desafiante ao titulo' },
          { date: 'Jun 2025', opponent: 'Rose Namajunas', result: 'W', method: 'UD', opponent_rank: '#4 FLW', quality_score: 4, quality_label: 'Muito Bom', note: 'Ex-campeao dupla' },
          { date: 'Dez 2025', opponent: 'Karine Silva', result: 'W', method: 'UD', opponent_rank: '#7 FLW', quality_score: 3, quality_label: 'Bom', note: '7a vitoria seguida' },
        ],
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Barber esta em ascensao meteoritica. 7 vitorias seguidas contra oponentes de qualidade crescente (Santos, Ribas, Namajunas, Karine Silva). Aos 27, e mais atletica e madura do que em 2021. A confianca esta no teto.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Grasso', media_oponentes: 4, media_oponentes_label: 'Muito Bom', aproveitamento: '8-4-1 (62%)', contra_top5: '1W-2L-1D' },
      fighter2: { nome: 'Barber', media_oponentes: 3, media_oponentes_label: 'Bom', aproveitamento: '9-3 (75%)', contra_top5: '3W-1L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum recentes significativos. Grasso enfrentou Shevchenko 3 vezes (elite absoluta). Barber enfrentou Namajunas e Santos (top 5). Grasso tem experiencia contra oponentes de nivel mais alto mas vem de resultados piores.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.49, valueB: 5.44, maxVal: 7, format: 'decimal', note: 'Barber tem volume significativamente maior' },
        { label: 'Precisao de Strikes (%)', valueA: 43, valueB: 47, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.80, valueB: 4.20, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 55, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.50, valueB: 1.80, maxVal: 4, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 65, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '33 anos', fighter2: '27 anos', note: 'Barber 6 anos mais nova' },
        { label: 'Altura', fighter1: '1,63m', fighter2: '1,68m', note: 'Barber 5cm mais alta' },
        { label: 'Envergadura', fighter1: '163cm', fighter2: '173cm', note: 'Barber com 10cm a mais' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'Lobo Gym, Guadalajara', fighter2: 'Colorado', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 75, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Grasso e mais tecnica com combinacoes. Barber e mais atletica com volume. Estilos diferentes mas nivel similar.' },
        { label: 'Poder de Nocaute', valueA: 55, valueB: 68, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Barber tem 44% KO rate e nocauteou Ribas. Grasso raramente finaliza (56% decisao).' },
        { label: 'Wrestling', valueA: 55, valueB: 70, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Barber media 1.80 TDs/15min. Mais agressiva no grappling ofensivo.' },
        { label: 'Jiu-Jitsu', valueA: 72, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Grasso submeteu SHEVCHENKO. Tem jiu-jitsu perigoso quando chega ao chao.' },
        { label: 'Cardio e Ritmo', valueA: 70, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Barber mantem volume alto por 3 rounds. Aos 27, o atletismo e superior.' },
        { label: 'Experiencia de Elite', valueA: 82, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: '3 lutas contra Shevchenko. Grasso lutou no nivel mais alto possivel da divisao.' },
      ],
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Grasso', ko_tko: { count: 3, percent: 19 }, submission: { count: 4, percent: 25 }, decision: { count: 9, percent: 56 }, total_wins: 16 },
      fighter2: { nome: 'Barber', ko_tko: { count: 7, percent: 44 }, submission: { count: 2, percent: 12 }, decision: { count: 7, percent: 44 }, total_wins: 16 },
      insight: 'Perfis diferentes. Grasso e mais de decisao (56%) com submissoes perigosas (25%). Barber e equilibrada entre KO (44%) e decisao (44%). Barber tem mais poder e finalizacoes por strikes. Grasso e mais perigosa no chao.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 6, danger_label: 'VANTAGEM BARBER', color: 'green', title: 'Energia e Explosao', description: 'Barber entra com volume alto e atletismo. No R1, a diferenca de juventude e explosividade e mais evidente. Se Barber pressionar com volume, Grasso vai precisar ser inteligente pra nao ficar pra tras nos cartoes.' },
        { rounds: 'R2', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Adaptacao', description: 'Grasso tende a melhorar conforme a luta avanca. A experiencia de lutas de 5 rounds contra Shevchenko da compostura. Se Grasso encontrar o ritmo e comecar a conectar combinacoes, o R2 pode equilibrar.' },
        { rounds: 'R3', danger_level: 5, danger_label: 'VANTAGEM BARBER', color: 'green', title: 'Decisao nos Cartoes', description: 'Se Barber venceu os primeiros 2 rounds com volume, o R3 e dela. Grasso precisaria de uma finalizacao pra virar. Mas se Grasso estiver competitiva, o R3 vira um round decisivo nos cartoes.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: '7 Vitorias Seguidas', fighter: 'Barber', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Barber vem de 7 vitorias consecutivas com qualidade crescente (Santos, Namajunas, Karine). O momentum e a confianca sao reais.' },
        { icon: 'Clock', title: 'Inversao de Trajetorias', fighter: 'Ambos', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'Em 2021, Grasso era favorita e venceu. Agora Barber e favorita. As trajetorias se inverteram completamente em 5 anos.' },
        { icon: 'Brain', title: 'Experiencia de Titulo', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Grasso lutou 3x contra Shevchenko pelo titulo. Essa experiencia em lutas de altissimo nivel e um ativo que Barber nao tem.' },
        { icon: 'Zap', title: 'Jiu-Jitsu de Grasso', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Grasso submeteu Valentina Shevchenko. Se a luta for ao chao, Grasso e perigosa. Barber precisa evitar o chao.' },
        { icon: 'Activity', title: 'Atletismo de Barber', fighter: 'Barber', risk_level: 'POSITIVO', risk_color: 'green', description: 'Aos 27, Barber e fisicamente superior. Mais rapida, mais explosiva, com melhor cardio. A juventude e um fator real.' },
        { icon: 'AlertTriangle', title: '2 Derrotas Seguidas', fighter: 'Grasso', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Grasso vem de 2 derrotas. A confianca pode estar abalada. Perder pra terceira vez seguida seria devastador pra carreira.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Grasso',
        total_probability: 40,
        scenarios: [
          { name: 'Submissao Oportunista', probability: 15, method: 'Submissao R2-R3', description: 'Grasso encontra uma abertura no chao e aplica uma submissao. Ela ja provou que pode submeter qualquer uma com o face crank em Shevchenko.' },
          { name: 'Tecnica e Experiencia', probability: 15, method: 'Decisao Unanime', description: 'Grasso usa a experiencia pra controlar o ritmo, conectar combinacoes precisas e frustrar o volume de Barber.' },
          { name: 'Contragolpe Perfeito', probability: 10, method: 'KO/TKO R2-R3', description: 'Barber entra com volume e Grasso encontra o timing pra um contragolpe limpo que machuca.' },
        ],
      },
      fighter2: {
        nome: 'Barber',
        total_probability: 58,
        scenarios: [
          { name: 'Volume e Atletismo', probability: 30, method: 'Decisao Unanime', description: 'Barber usa o volume superior (5.44 SLpM) e o atletismo pra pressionar Grasso por 3 rounds. Ganha nos cartoes com atividade.' },
          { name: 'TKO por Acumulo', probability: 15, method: 'TKO R2-R3', description: 'Barber acumula dano com strikes e o volume eventualmente forca a interrupcao ou um finish tardio.' },
          { name: 'Ground and Pound', probability: 13, method: 'TKO R2', description: 'Barber leva ao chao e domina com ground and pound, como fez contra Ribas.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Maycee Barber',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'As trajetorias falam mais alto que qualquer estatistica. Barber aos 27 vem de 7 vitorias seguidas incluindo Namajunas e Santos. Grasso aos 33 vem de 2 derrotas. A Barber de 2021 era uma garota de 22 anos com joelho lesionado. A Barber de 2026 e uma lutadora completa no pico atletico. O volume de strikes (5.44 vs 4.49 SLpM) e a diferenca de energia devem ser decisivos. Mas Grasso tem o jiu-jitsu pra surpreender se a luta for ao chao.',
      x_factor: {
        title: 'O Jiu-Jitsu de Grasso',
        description: 'Grasso submeteu SHEVCHENKO. Se a luta for ao chao por qualquer razao, Grasso e letal. Barber precisa manter em pe a todo custo.',
      },
      upset_alert: {
        title: 'Grasso Ja Venceu Essa Luta',
        description: 'Em 2021, Grasso dominou Barber por decisao. A experiencia da primeira luta e um fator que pode dar a Grasso leituras sobre o estilo de Barber, mesmo que Barber tenha evoluido muito.',
      },
      probabilities: {
        fighter1: { nome: 'Grasso', percent: 40 },
        fighter2: { nome: 'Barber', percent: 58 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Barber (-160)', reasoning: 'Barber e favorita justificada com 7 vitorias seguidas contra Grasso vindo de 2 derrotas. O preco e justo.' },
        method: { pick: 'Vai para Decisao (-150)', reasoning: 'Grasso tende a lutas de decisao (56% das vitorias). Barber ganhou 4 das ultimas 5 por decisao. Probabilidade alta de ir aos juizes.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Ambas tem experiencia em lutas que vao a distancia. Finalizacao precoce e improvavel.' },
        best_value: 'Over 2.5 rounds e a aposta mais segura. Ambas preferem lutas longas.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Volume de Barber no R1', icon: 'Activity', description: 'Barber tem 5.44 SLpM contra 4.49 de Grasso. Se Barber impor volume alto desde o comeco, vai dominar os cartoes. Observe se Grasso consegue acompanhar o ritmo.' },
        { num: 2, title: 'O Jiu-Jitsu de Grasso', icon: 'Target', description: 'Grasso submeteu Shevchenko. Se a luta for ao chao, Grasso e perigosa. Observe se ela busca clinch ou takedowns pra usar o grappling.' },
        { num: 3, title: 'Ajustes da Revanche', icon: 'Brain', description: 'Ambas lutaram em 2021. Grasso venceu. Observe quais ajustes Barber fez: mais wrestling? Mais pressao? Diferente stance? A evolucao em 5 anos e a narrativa.' },
        { num: 4, title: 'A Confianca de Grasso', icon: 'Shield', description: 'Grasso vem de 2 derrotas. Observe a linguagem corporal nos primeiros minutos. Se entrar hesitante, Barber vai sentir sangue. Se entrar confiante, a experiencia pode prevalecer.' },
        { num: 5, title: 'O Cardio no R3', icon: 'Clock', description: 'Se a luta estiver apertada indo pro R3, observe quem tem mais gas. Barber aos 27 deveria ter vantagem atletica. Mas Grasso lutou 5 rounds contra Shevchenko e sabe administrar energia.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'A REVANCHE', content: 'GRASSO vs BARBER II\nUFC Seattle | Peso Mosca\n\n16-4-1 vs 16-3\nGrasso venceu em 2021.\nBarber vem de 7 VITORIAS SEGUIDAS.\nAs trajetorias se inverteram.', color: 'red' },
        { slide_number: 2, title: 'GRASSO: A QUEDA', content: 'Ex-campeao peso-mosca\nSubmeteu Shevchenko\nMas perdeu o titulo\ne 2 lutas seguidas.\n33 anos. Em recuperacao.', color: 'red' },
        { slide_number: 3, title: 'BARBER: THE FUTURE', content: '7 vitorias seguidas\nVenceu Namajunas e Santos\n27 anos, no pico atletico\nFavorita -160\nA evolucao em 5 anos e REAL.', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'BARBER por Decisao Unanime\n\nConfianca: MEDIA\n58% Barber / 40% Grasso\n\nVolume e atletismo vencem.\nMas cuidado com o jiu-jitsu\nde quem submeteu Shevchenko.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Grasso vs Barber II: a revanche de 5 anos. Em 2021, Grasso venceu facil. Desde entao: Grasso perdeu titulo + 2 lutas. Barber ganhou 7 SEGUIDAS. As trajetorias se inverteram completamente.' },
        { num: '2/4', text: 'Barber em 2021: 22 anos, joelho lesionado, 3 derrotas em 4. Barber em 2026: 27 anos, 7 vitorias seguidas, venceu Namajunas e Santos. A mesma pessoa? Dificilmente.' },
        { num: '3/4', text: 'Mas nao durmam na Grasso. Ela SUBMETEU Shevchenko. Se a luta for ao chao, Barber esta em perigo. O jiu-jitsu de Grasso e a arma secreta.' },
        { num: '4/4', text: 'Pick: Barber por decisao. O volume (5.44 SLpM), a juventude e o momentum de 7 vitorias devem ser demais. Mas Grasso por sub nao seria surpresa.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Em 2021, Grasso dominou Barber por decisao. 5 anos depois, TUDO mudou. Grasso perdeu o titulo e 2 lutas. Barber ganhou 7 seguidas. A revanche mais justa do UFC.' },
        { time: '10-30s', title: 'As Trajetorias', text: 'Grasso subiu ao topo: titulo, Shevchenko 3 vezes. Depois caiu: perdeu titulo, 2 derrotas seguidas. Barber fez o caminho contrario: de 3 derrotas em 4 lutas pra 7 vitorias seguidas incluindo Namajunas.' },
        { time: '30-45s', title: 'Previsao', text: 'Barber por decisao. O volume, a juventude e o momentum falam mais alto. Mas Grasso tem o jiu-jitsu pra surpreender qualquer uma.' },
        { time: '45-55s', title: 'CTA', text: 'Quem se adaptou melhor em 5 anos? Comenta e segue pra analise completa.' },
      ],
      tiktok: [
        { hook: 'Ela perdeu essa luta em 2021. Agora volta com 7 VITORIAS SEGUIDAS.', body: 'Barber levou uma surra de Grasso em 2021. Desde entao: 7 vitorias seguidas. Namajunas, Santos, Ribas. Grasso? Perdeu o titulo e 2 lutas. As trajetorias se inverteram COMPLETAMENTE. A Barber de 2026 NAO e a mesma de 2021.', cta: 'Barber vinga ou Grasso repete? Comenta!' },
        { hook: 'Essa mulher SUBMETEU a melhor lutadora de todos os tempos.', body: 'Grasso submeteu Valentina Shevchenko com face crank no R4. VALENTINA. Se Grasso levar a luta ao chao contra Barber, qualquer coisa pode acontecer. O jiu-jitsu dela e a arma secreta que ninguem esta falando.', cta: 'Grasso por sub seria o upset do card? Comenta!' },
      ],
      headlines: [
        'Grasso vs Barber II: As Trajetorias Que Se Inverteram em 5 Anos',
        'A Revanche Mais Justa do UFC: De Favorita a Azarao',
        'Barber Com 7 Vitorias Seguidas: The Future Finalmente Chegou?',
        'Grasso Submeteu Shevchenko. Pode Surpreender Barber no Chao?',
        'UFC Seattle: A Evolucao de 5 Anos Que Mudou Tudo no Peso-Mosca',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+135',
        fighter2_odds: '-160',
        fighter1_name: 'Alexa Grasso',
        fighter2_name: 'Maycee Barber',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Momentum de Barber', stat_headline: '7 VITORIAS SEGUIDAS (SANTOS, RIBAS, NAMAJUNAS, KARINE)', contexto: 'Barber esta no melhor momento da carreira. Qualidade crescente dos oponentes.', implicacao_aposta: 'Favorece Barber. O momentum e a confianca sao reais.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Volume de Strikes', stat_headline: 'BARBER 5.44 SLpM VS GRASSO 4.49 SLpM', contexto: 'Barber tem volume significativamente maior. Em lutas de 3 rounds, volume ganha nos cartoes.', implicacao_aposta: 'Favorece Barber por decisao.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Jiu-Jitsu de Grasso', stat_headline: 'SUBMETEU VALENTINA SHEVCHENKO NO R4', contexto: 'Grasso tem jiu-jitsu genuinamente perigoso. Se a luta for ao chao, qualquer coisa pode acontecer.', implicacao_aposta: 'Grasso por sub tem valor como longshot.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Clock', titulo: 'Idade: 27 vs 33', stat_headline: 'BARBER 6 ANOS MAIS NOVA NO PICO ATLETICO', contexto: 'A diferenca de idade e significativa em termos de atletismo e recuperacao.', implicacao_aposta: 'Favorece Barber em lutas de alto volume.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-180', confianca: 'alta', raciocinio: 'Grasso tem 56% das vitorias por decisao. Barber ganhou 4 das ultimas 5 por decisao. Finalizacao cedo e improvavel.' },
        { tipo: 'Moneyline', pick: 'Barber (-160)', odds: '-160', confianca: 'media', raciocinio: 'Favorita justificada. 7 vitorias contra Grasso em declinio. Preco justo.' },
        { tipo: 'Metodo', pick: 'Grasso por Submissao', odds: '+500', confianca: 'baixa', edge_vs_mercado: 'Longshot com valor. Grasso submeteu Shevchenko. Se a luta for ao chao, a possibilidade e real.', raciocinio: 'Aposta de risco/recompensa. Se Grasso encontrar o back ou um scramble, o jiu-jitsu pode decidir.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Barber por KO',
        descricao: 'Barber tem 44% KO rate mas suas ultimas 4 vitorias foram por decisao. No nivel UFC, ela nao esta finalizando. Apostar em Barber por KO e ir contra o padrao recente.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
