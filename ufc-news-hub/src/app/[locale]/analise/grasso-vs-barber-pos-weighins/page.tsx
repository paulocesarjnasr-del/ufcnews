import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'grasso-vs-barber-pos-weighins',
  evento_id: null,
  slug: 'grasso-vs-barber-pos-weighins',
  titulo: 'Grasso vs Barber II: Pos Weigh-Ins | Compostura vs Energia',
  subtitulo: 'Ambas bateram o peso sem problemas. Grasso composta como sempre. Barber elétrica. As odds confirmam: Barber favorita a -180.',
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
      { factor: 'Weigh-In Demeanor', edge: 'fighter2', impact: 5, description: 'Barber pareceu fired up e confiante. Energia de quem sabe que o momento e dela.' },
    ],
    xFactor: {
      title: 'A Versao 2026 de Barber',
      description: 'Barber aos 27 nao e a mesma de 2021 aos 22. 7 vitorias seguidas, mais atletica, mais madura. Na pesagem, a energia dela era contagiante.',
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
      tagline: 'Pos Weigh-Ins: Compostura vs Energia',
      tagline_sub: 'Ambas bateram o peso. Grasso composta, Barber elétrica. A revanche de 5 anos esta definida.',
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
        <!-- WEIGH-IN UPDATE -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Atualizacao Pos Weigh-Ins</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-emerald-400/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">PESAGEM CONFIRMADA</p>
              <p class="text-sm text-white/60 leading-relaxed">
                Ambas bateram o peso sem problemas. <strong class="text-ufc-red">Grasso</strong> pesou com compostura e tranquilidade, como quem ja fez isso dezenas de vezes. A expressao era de foco profundo. <strong class="text-blue-400">Barber</strong> pesou e pareceu absolutamente elétrica: energia pura, olhar de fome, linguagem corporal de quem sabe que o momento e dela. No face off, Barber manteve o olhar fixo e sorriu. Grasso manteve a calma. Dois estilos de preparacao mental completamente diferentes.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Grasso na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">COMPOSTA</p>
                <p class="text-xs text-white/50 leading-relaxed">Sem drama. Sem bravata. Grasso pesou com a tranquilidade de quem lutou 3 vezes contra Shevchenko. A experiencia aparece na calma. Pode ser um sinal positivo de preparacao mental, ou pode refletir a falta de energia que a sequencia de derrotas trouxe.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-blue-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Barber na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">FIRED UP</p>
                <p class="text-xs text-white/50 leading-relaxed">Energia pura. Barber parecia pronta pra lutar na hora da pesagem. Sorrindo, confiante, com aquele brilho no olhar de quem vem de 7 vitorias seguidas. A juventude e o momentum irradiam da linguagem corporal.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- NARRATIVA ORIGINAL -->
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
          A pesagem confirmou a narrativa: Barber pareceu fired up e pronta. Grasso pareceu composta mas sem aquela energia extra. As trajetorias continuam invertidas.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#3 Peso Mosca', fighter2: '#5 Peso Mosca' },
        { dimensao: 'Sequencia', fighter1: '2 derrotas seguidas', fighter2: '7 vitorias seguidas' },
        { dimensao: 'Objetivo', fighter1: 'Parar a queda e se manter relevante', fighter2: 'Vingar 2021 e buscar titulo' },
        { dimensao: 'Risco', fighter1: '3a derrota seguida pode tirar do top 5', fighter2: 'Perder pra mesma adversaria 2x' },
        { dimensao: 'Pesagem', fighter1: 'Composta e tranquila', fighter2: 'Elétrica e confiante' },
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
        momentum_note: 'Grasso esta em queda. Perdeu o titulo e depois perdeu pra Natalia Silva. Duas derrotas seguidas depois de ter sido campeao. Aos 33 anos, a janela esta se fechando. Na pesagem, Grasso pareceu composta, o que pode ser experiencia ou simplesmente falta da energia extra necessaria pra essa revanche.',
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
        momentum_note: 'Barber esta em ascensao meteoritica. 7 vitorias seguidas contra oponentes de qualidade crescente. Na pesagem, a energia e a confianca eram visiveis. Barber sabe que esse e o momento dela.',
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
      insight: 'Perfis diferentes. Grasso e mais de decisao (56%) com submissoes perigosas (25%). Barber e equilibrada entre KO (44%) e decisao (44%). A pesagem nao muda esse perfil: espere uma luta de 3 rounds que provavelmente vai pros juizes.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 6, danger_label: 'VANTAGEM BARBER', color: 'green', title: 'Energia e Explosao', description: 'Barber pareceu fired up na pesagem. No R1, a diferenca de juventude e explosividade e mais evidente. Se Barber pressionar com volume, Grasso vai precisar ser inteligente pra nao ficar pra tras nos cartoes.' },
        { rounds: 'R2', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Adaptacao', description: 'Grasso tende a melhorar conforme a luta avanca. A experiencia de lutas de 5 rounds contra Shevchenko da compostura. Se Grasso encontrar o ritmo e comecar a conectar combinacoes, o R2 pode equilibrar.' },
        { rounds: 'R3', danger_level: 5, danger_label: 'VANTAGEM BARBER', color: 'green', title: 'Decisao nos Cartoes', description: 'Se Barber venceu os primeiros 2 rounds com volume, o R3 e dela. Grasso precisaria de uma finalizacao pra virar. Mas se Grasso estiver competitiva, o R3 vira um round decisivo nos cartoes.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: '7 Vitorias Seguidas', fighter: 'Barber', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Barber vem de 7 vitorias consecutivas com qualidade crescente. Na pesagem, a confianca era visivel.' },
        { icon: 'Zap', title: 'Energia na Pesagem', fighter: 'Barber', risk_level: 'POSITIVO', risk_color: 'green', description: 'Barber pareceu elétrica e fired up na pesagem. A energia de quem sabe que o momento e dela. Isso pode se traduzir em volume alto desde o R1.' },
        { icon: 'Brain', title: 'Experiencia de Titulo', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Grasso lutou 3x contra Shevchenko pelo titulo. Essa experiencia em lutas de altissimo nivel e um ativo que Barber nao tem.' },
        { icon: 'Shield', title: 'Compostura na Pesagem', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Grasso pesou com calma e compostura. Pode indicar preparacao mental solida ou simplesmente a experiencia de quem ja fez isso muitas vezes.' },
        { icon: 'Zap', title: 'Jiu-Jitsu de Grasso', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Grasso submeteu Valentina Shevchenko. Se a luta for ao chao, Grasso e perigosa. Barber precisa evitar o chao.' },
        { icon: 'AlertTriangle', title: '2 Derrotas Seguidas', fighter: 'Grasso', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Grasso vem de 2 derrotas. A confianca pode estar abalada. Perder pra terceira vez seguida seria devastador pra carreira.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Grasso',
        total_probability: 38,
        scenarios: [
          { name: 'Submissao Oportunista', probability: 14, method: 'Submissao R2-R3', description: 'Grasso encontra uma abertura no chao e aplica uma submissao. Ela ja provou que pode submeter qualquer uma com o face crank em Shevchenko.' },
          { name: 'Tecnica e Experiencia', probability: 14, method: 'Decisao Unanime', description: 'Grasso usa a experiencia pra controlar o ritmo, conectar combinacoes precisas e frustrar o volume de Barber.' },
          { name: 'Contragolpe Perfeito', probability: 10, method: 'KO/TKO R2-R3', description: 'Barber entra com volume e Grasso encontra o timing pra um contragolpe limpo que machuca.' },
        ],
      },
      fighter2: {
        nome: 'Barber',
        total_probability: 60,
        scenarios: [
          { name: 'Volume e Atletismo', probability: 32, method: 'Decisao Unanime', description: 'Barber usa o volume superior (5.44 SLpM) e o atletismo pra pressionar Grasso por 3 rounds. A energia da pesagem se traduz em atividade nos cartoes.' },
          { name: 'TKO por Acumulo', probability: 16, method: 'TKO R2-R3', description: 'Barber acumula dano com strikes e o volume eventualmente forca a interrupcao.' },
          { name: 'Ground and Pound', probability: 12, method: 'TKO R2', description: 'Barber leva ao chao e domina com ground and pound, como fez contra Ribas.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Maycee Barber',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'A pesagem confirmou a narrativa sem grandes surpresas. Barber pareceu fired up e confiante, Grasso pareceu composta e calma. As trajetorias continuam falando mais alto: Barber com 7 vitorias e pico atletico aos 27, Grasso com 2 derrotas aos 33. As odds se mantiveram em Barber -180. A previsao nao muda: Barber por decisao com volume e atletismo. Mas Grasso por sub continua sendo a arma secreta.',
      x_factor: {
        title: 'O Jiu-Jitsu de Grasso',
        description: 'Grasso submeteu SHEVCHENKO. Se a luta for ao chao por qualquer razao, Grasso e letal. Barber precisa manter em pe a todo custo.',
      },
      upset_alert: {
        title: 'Grasso Ja Venceu Essa Luta',
        description: 'Em 2021, Grasso dominou Barber por decisao. A experiencia da primeira luta e um fator que pode dar a Grasso leituras sobre o estilo de Barber, mesmo que Barber tenha evoluido muito.',
      },
      probabilities: {
        fighter1: { nome: 'Grasso', percent: 38 },
        fighter2: { nome: 'Barber', percent: 60 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Barber (-180)', reasoning: 'Barber e favorita justificada com 7 vitorias seguidas, pesagem confiante, contra Grasso vindo de 2 derrotas. Preco justo a -180.' },
        method: { pick: 'Vai para Decisao (-150)', reasoning: 'Grasso tende a lutas de decisao (56% das vitorias). Barber ganhou 4 das ultimas 5 por decisao. Probabilidade alta de ir aos juizes.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Ambas tem experiencia em lutas que vao a distancia. Finalizacao precoce e improvavel. Ambas pareceram bem na pesagem.' },
        best_value: 'Over 2.5 rounds continua sendo a aposta mais segura. A pesagem nao mudou o perfil da luta.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Energia de Barber no R1', icon: 'Activity', description: 'Barber pareceu fired up na pesagem. Observe se essa energia se traduz em volume alto desde os primeiros segundos. Se sim, Grasso vai ficar pra tras nos cartoes cedo.' },
        { num: 2, title: 'O Jiu-Jitsu de Grasso', icon: 'Target', description: 'Grasso submeteu Shevchenko. Se a luta for ao chao, Grasso e perigosa. Observe se ela busca clinch ou takedowns pra usar o grappling.' },
        { num: 3, title: 'A Compostura de Grasso Sob Pressao', icon: 'Brain', description: 'Grasso pareceu composta na pesagem. Se manter essa calma sob a pressao de Barber, pode encontrar aberturas. Se a compostura virar passividade, perde nos cartoes.' },
        { num: 4, title: 'Ajustes da Revanche', icon: 'Shield', description: 'Ambas lutaram em 2021. Grasso venceu. Observe quais ajustes Barber fez: mais wrestling? Mais pressao? Diferente stance? A evolucao em 5 anos e a narrativa.' },
        { num: 5, title: 'O Cardio no R3', icon: 'Clock', description: 'Se a luta estiver apertada indo pro R3, observe quem tem mais gas. Barber aos 27 deveria ter vantagem atletica.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'POS WEIGH-INS', content: 'GRASSO vs BARBER II\nPOS PESAGEM\n\nGrasso: composta, calma\nBarber: fired up, elétrica\n\nOdds: Barber -180 / Grasso +150\nAmbas bateram o peso.', color: 'gold' },
        { slide_number: 2, title: 'PREVISAO MANTIDA', content: 'BARBER por Decisao Unanime\n\nConfianca: MEDIA\n60% Barber / 38% Grasso\n\nA pesagem confirmou:\nBarber com energia, Grasso composta.\nAs trajetorias nao mentem.\n\nMelhor aposta: Over 2.5 Rounds', color: 'blue' },
      ],
      twitter: [
        { num: '1/3', text: 'POS WEIGH-INS: Grasso vs Barber II. Ambas bateram o peso. Grasso composta e calma. Barber fired up e elétrica. A energia da pesagem confirmou as trajetorias: Barber no pico, Grasso em recuperacao.' },
        { num: '2/3', text: 'Odds se mantiveram: Barber -180, Grasso +150. A pesagem nao mudou nada drasticamente. Previsao se mantem: Barber por decisao com volume. Mas Grasso por sub continua sendo o wildcard.' },
        { num: '3/3', text: 'Melhor aposta pos weigh-ins: Over 2.5 rounds. Ambas pareceram bem fisicamente. Luta de decisao. Barber pelo volume, Grasso pela experiencia. Vai aos juizes.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Grasso vs Barber II: ambas bateram o peso. Grasso composta. Barber elétrica. A pesagem confirmou tudo.' },
        { time: '10-25s', title: 'Pesagem', text: 'Grasso pesou com a calma de quem lutou 3x contra Shevchenko. Barber pareceu pronta pra lutar na hora. A energia e a confianca eram visiveis. Odds: Barber -180, Grasso +150.' },
        { time: '25-35s', title: 'Previsao', text: 'Previsao se mantem: Barber por decisao. Compostura vs energia. Volume vs experiencia. Over 2.5 rounds e a aposta.' },
      ],
      tiktok: [
        { hook: 'Na pesagem, uma pesou com CALMA e a outra com FOGO.', body: 'Grasso: composta, tranquila, experiencia de quem lutou 3x contra Shevchenko. Barber: elétrica, fired up, energia de quem vem de 7 VITORIAS SEGUIDAS. As trajetorias continuam invertidas. Barber favorita a -180. Previsao: Barber por decisao. Mas Grasso SUBMETEU Shevchenko. Se a luta for ao chao, qualquer coisa acontece.', cta: 'Compostura ou energia? Comenta!' },
      ],
      headlines: [
        'Pos Weigh-Ins: Grasso Composta, Barber Elétrica na Pesagem',
        'Grasso vs Barber II: Pesagem Confirma As Trajetorias Invertidas',
        'Barber -180 Pos Pesagem: A Energia e o Volume Sao Demais?',
        'O Jiu-Jitsu de Grasso Continua Sendo a Arma Secreta da Revanche',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+150',
        fighter2_odds: '-180',
        fighter1_name: 'Alexa Grasso',
        fighter2_name: 'Maycee Barber',
        source: 'Media de casas de apostas pos weigh-ins (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Momentum e Energia de Barber', stat_headline: '7 VITORIAS SEGUIDAS + PESAGEM FIRED UP', contexto: 'Barber pareceu elétrica na pesagem. A energia confirma o momentum de 7 vitorias seguidas.', implicacao_aposta: 'Favorece Barber. O momentum e a confianca sao reais e visiveis.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Volume de Strikes', stat_headline: 'BARBER 5.44 SLpM VS GRASSO 4.49 SLpM', contexto: 'Barber tem volume significativamente maior. Em lutas de 3 rounds, volume ganha nos cartoes.', implicacao_aposta: 'Favorece Barber por decisao.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Jiu-Jitsu de Grasso', stat_headline: 'SUBMETEU VALENTINA SHEVCHENKO NO R4', contexto: 'Grasso tem jiu-jitsu genuinamente perigoso. Se a luta for ao chao, qualquer coisa pode acontecer.', implicacao_aposta: 'Grasso por sub a +500 tem valor como longshot.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Compostura de Grasso', stat_headline: 'COMPOSTA E CALMA NA PESAGEM', contexto: 'Grasso pesou com tranquilidade. Pode ser experiencia ou pode ser falta de energia. Ambiguo.', implicacao_aposta: 'Nao muda as odds significativamente.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-180', confianca: 'alta', raciocinio: 'Grasso tem 56% das vitorias por decisao. Barber ganhou 4 das ultimas 5 por decisao. Ambas pareceram bem na pesagem. Vai a distancia.' },
        { tipo: 'Moneyline', pick: 'Barber (-180)', odds: '-180', confianca: 'media', raciocinio: 'Favorita justificada. Pesagem confirmou a narrativa. Preco justo.' },
        { tipo: 'Metodo', pick: 'Grasso por Submissao', odds: '+500', confianca: 'baixa', edge_vs_mercado: 'Longshot com valor. Grasso submeteu Shevchenko. Se a luta for ao chao, a possibilidade e real.', raciocinio: 'Aposta de risco/recompensa. Se Grasso encontrar o back ou um scramble, o jiu-jitsu pode decidir.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Barber por KO',
        descricao: 'Barber tem 44% KO rate mas suas ultimas 4 vitorias foram por decisao. No nivel UFC, ela nao esta finalizando. Apostar em Barber por KO e ir contra o padrao recente, mesmo com a energia da pesagem.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
