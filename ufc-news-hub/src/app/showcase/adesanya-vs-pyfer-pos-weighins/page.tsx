import { translateAnalysis } from '@/lib/translate-analysis';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'adesanya-vs-pyfer-pos-weighins',
  evento_id: null,
  slug: 'adesanya-vs-pyfer-pos-weighins',
  titulo: 'Adesanya vs Pyfer: Pos Weigh-Ins | Whittaker no Camp, Wrestling Novo e a Cirurgia na Coluna',
  subtitulo: 'Adesanya entre -130 e -163. Odds MUITO mais apertadas do que se pensava. Whittaker treinando COM Izzy, tecnica de takedown do Ruffy, e a cirurgia de disco de Pyfer que ninguem discute.',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,93m', envergadura: '203cm', idade: 36, academia: 'City Kickboxing' },
      fighter2: { altura: '1,88m', envergadura: '188cm', idade: 29, academia: 'Marquez MMA, Philadelphia' },
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
      { factor: 'Whittaker Simulando Pyfer no Camp', edge: 'fighter1', impact: 9, description: 'Robert Whittaker, pressure fighter com wrestling elite, treinou COM Adesanya no CKB por semanas. E o simulador perfeito de Pyfer. Izzy drilou contra esse arquetipo diariamente.' },
      { factor: 'Cirurgia de Disco de Pyfer', edge: 'fighter1', impact: 8, description: 'Pyfer fez cirurgia de disco no inicio de 2025. "Duas cirurgias nas costas apos minha ultima luta." Problemas na coluna sao wildcards pra movimentacao explosiva em 5 rounds.' },
      { factor: 'Modelo First Strike: 65% Pyfer', edge: 'fighter2', impact: 8, description: 'O modelo do First Strike Podcast da 65% pra Pyfer, contra os 45% implicitos pelas odds. Divergencia significativa entre modelo analitico e mercado.' },
      { factor: 'Recorde de PowerKube', edge: 'fighter2', impact: 7, description: 'Pyfer quebrou o recorde do Francis Ngannou no PowerKube (170.218 vs 129.161), sendo 85 lbs mais leve. O poder e historico.' },
    ],
    xFactor: {
      title: 'Adesanya Pode Lutar Wrestling Pela Primeira Vez',
      description: 'Adesanya aprendeu um takedown novo de Mauricio Ruffy. Disse estar "particularmente empolgado pra mostrar seu wrestling". Em 17 lutas no UFC, Izzy NUNCA tentou wrestling seriamente. Se ele realmente misturar, Pyfer nao tem filme pra estudar.',
    },
  },
  fighter1_info: {
    nome: 'Israel Adesanya',
    apelido: 'The Last Stylebender',
    record: '24-5-0',
    ranking: '#4 Peso Medio',
    ultimasLutas: [
      { result: 'L', opponent: 'Nassourdine Imavov', method: 'TKO R2', event: 'UFC Fight Night 250' },
      { result: 'L', opponent: 'Dricus Du Plessis', method: 'Sub R4 (RNC)', event: 'UFC 305' },
      { result: 'L', opponent: 'Sean Strickland', method: 'Decisao Unanime', event: 'UFC 293' },
    ],
  },
  fighter2_info: {
    nome: 'Joe Pyfer',
    apelido: 'Bodybagz',
    record: '15-3-0',
    ranking: '#14 Peso Medio',
    ultimasLutas: [
      { result: 'W', opponent: 'Abusupiyan Magomedov', method: 'Sub R2 (face crank)', event: 'UFC 320' },
      { result: 'W', opponent: 'Kelvin Gastelum', method: 'Decisao Unanime', event: 'UFC 316' },
      { result: 'W', opponent: 'Marc-Andre Barriault', method: 'KO R1', event: 'UFC 303' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 5,
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
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Tecnicas Esquecidas vs Poder Historico',
      tagline_sub: 'Adesanya resgatou tecnicas do kickboxing na China. Pyfer quebrou o recorde de Ngannou no PowerKube. Odds apertadas: -130 a -163.',
      fighter1: {
        nome_completo: 'Israel "The Last Stylebender" Adesanya',
        apelido: 'The Last Stylebender',
        sobrenome: 'Adesanya',
        record: '24-5-0',
        ranking: '#4 Peso Medio',
        info_extra: 'Lagos, Nigeria / Auckland, Nova Zelandia | 36 anos | City Kickboxing',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/ADESANYA_ISRAEL_L_03-28.png?itok=krImOvG1',
      },
      fighter2: {
        nome_completo: 'Joe "Bodybagz" Pyfer',
        apelido: 'Bodybagz',
        sobrenome: 'Pyfer',
        record: '15-3-0',
        ranking: '#14 Peso Medio',
        info_extra: 'Allentown, PA | Marquez MMA, Philadelphia | 29 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=prLW4_bl',
      },
    },

    narrativa: {
      html_content: `
        <!-- INTELLIGENCE: CAMP ADESANYA -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">O Camp Mais Estrategico da Carreira de Izzy</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-ufc-red/10 via-ufc-red/5 to-ufc-red/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-3">BASTIDORES DO CAMP</p>
              <p class="text-sm text-white/70 leading-relaxed mb-4">
                <strong class="text-ufc-red">Robert Whittaker</strong> esta treinando COM Adesanya no City Kickboxing. Leia essa frase de novo. O homem que Izzy venceu duas vezes, um dos melhores pressure fighters com wrestling da historia do peso medio, agora e sparring partner diario. E Whittaker nao e qualquer sparring: ele e um SIMULADOR PERFEITO de Pyfer. Pressao constante, transicoes pra wrestling, poder nas maos. Izzy drilou contra esse arquetipo por semanas.
              </p>
              <p class="text-sm text-white/70 leading-relaxed mb-4">
                Mas nao para ai. <strong class="text-ufc-red">Adesanya</strong> aprendeu um takedown novo de Mauricio Ruffy. Disse estar "particularmente empolgado pra mostrar seu wrestling". Em 17 lutas no UFC, a media de takedowns de Izzy e 0.05 por 15 minutos. Basicamente zero. Se ele realmente misturar wrestling nessa luta, a equipe de Pyfer NAO tem filme pra estudar. E uma arma que simplesmente nao existia antes.
              </p>
              <p class="text-sm text-white/70 leading-relaxed mb-4">
                Adesanya tambem esta resgatando "tecnicas esquecidas" da epoca do kickboxing profissional na China. Tecnicas que ele nunca usou no UFC. Isso significa que a equipe de Pyfer no Marquez MMA tem menos material pra preparar. E um camp de reinvencao: Izzy esta tentando se tornar imprevisivel pela primeira vez em anos.
              </p>
              <p class="text-sm text-white/70 leading-relaxed">
                O aspecto mental tambem mudou. Adesanya treinou com <strong class="text-ufc-red">David Goggins</strong> em uma sessao de condicionamento mental que terminou com Izzy vomitando. Parece detalhezinho, mas enderecar a fortaleza mental diretamente apos tres derrotas seguidas e exatamente o que um veterano inteligente faria. O plano de jogo dele e claro: "Eu vou direto nele. Ataco ele imediatamente. Quando ele tenta me acertar, eu nao estou la." E depois: "Afogo ele nos championship rounds."
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Whittaker no Camp</p>
                <p class="font-display text-lg text-white mb-2">SIMULADOR PERFEITO</p>
                <p class="text-xs text-white/50 leading-relaxed">Pressure fighter com wrestling de elite. O arquetipo exato de Pyfer. Semanas de sparring diario.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Takedown do Ruffy</p>
                <p class="font-display text-lg text-white mb-2">ARMA NOVA</p>
                <p class="text-xs text-white/50 leading-relaxed">0.05 TDs por 15 min na carreira. Se Izzy realmente lutar, a equipe de Pyfer nao tem filme pra estudar.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">David Goggins</p>
                <p class="font-display text-lg text-white mb-2">MENTAL</p>
                <p class="text-xs text-white/50 leading-relaxed">Sessao de condicionamento mental que terminou em vomito. Enderecando a fortaleza psicologica diretamente apos 3 derrotas.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- INTELLIGENCE: PYFER MEDICAL + LIMITATIONS -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">O Corpo Reconstruido de Pyfer</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-300"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3">HISTORICO MEDICO CRITICO</p>
              <p class="text-sm text-white/70 leading-relaxed mb-4">
                <strong class="text-blue-400">Pyfer</strong> fez CIRURGIA DE DISCO no inicio de 2025. Saiu do UFC Mexico City por causa disso. Nas proprias palavras: "Duas cirurgias nas costas depois da minha ultima luta." Diz que esta no melhor shape de sempre agora, mas problemas de coluna sao wildcards pra movimentacao explosiva, especialmente em uma luta de 5 rounds.
              </p>
              <p class="text-sm text-white/70 leading-relaxed mb-4">
                Antes disso, Pyfer fez CIRURGIA TRIPLA NO COTOVELO. Disseram que ele nunca mais ia socar. Fez 15 meses de reabilitacao. A resiliencia e real, mas o historico de cirurgias tambem e. Estamos falando de um lutador de 29 anos com mais tempo na mesa de cirurgia do que a maioria dos veteranos de 36.
              </p>
              <p class="text-sm text-white/70 leading-relaxed">
                E tem a limitacao fundamental: <strong class="text-blue-400">Pyfer e flat-footed</strong>. Ele nao se movimenta lateralmente de forma eficiente. Nao consegue cortar o cage contra adversarios moveis. Contra Hermansson, que e um lutador mediocre em footwork, Pyfer ja teve dificuldades. Agora vai enfrentar o melhor gerenciador de distancia da historia do peso medio. Adesanya nao para de se mover. A geometria dessa luta e um pesadelo pra Pyfer.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-amber-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-amber-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Cirurgia de Disco (2025)</p>
                <p class="font-display text-lg text-white mb-2">COLUNA</p>
                <p class="text-xs text-white/50 leading-relaxed">Duas cirurgias nas costas. Saiu do UFC Mexico City. Problemas de coluna afetam explosividade, sprawl, e resistencia em 5 rounds. Pyfer diz estar saudavel, mas coluna e wildcard.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-amber-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-amber-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Cirurgia Tripla no Cotovelo</p>
                <p class="font-display text-lg text-white mb-2">RESILIENCIA</p>
                <p class="text-xs text-white/50 leading-relaxed">Disseram que nunca mais ia socar. 15 meses de reabilitacao. Voltou e quebrou o recorde de Ngannou no PowerKube. A determinacao e absurda, mas o desgaste no corpo e real.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- INTELLIGENCE: HERMANSSON BLUEPRINT -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">O Blueprint Hermansson: A Unica Derrota Longa</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-400/5"></div>
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-blue-400/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/70 leading-relaxed mb-4">
                A unica luta de 5 rounds de <strong class="text-blue-400">Pyfer</strong> foi contra Jack Hermansson. E ele PERDEU. 48-47 nas tres cartelas. Pyfer dominou R1 e R2 com pressao e poder. Mas no R3, a magia acabou. Hermansson comecou a usar calf kicks sistematicamente e o cardio de Pyfer desmoronou. Rounds 3, 4 e 5 foram de Hermansson.
              </p>
              <p class="text-sm text-white/70 leading-relaxed">
                O proprio Hermansson disse apos a luta: <em class="text-white/80">"Eu sabia que meu condicionamento era superior."</em> Essa frase deveria assombrar qualquer apostador pensando em Pyfer nessa luta. Hermansson nao e um atleta de cardio excepcional. Se ele conseguiu superar Pyfer com condicionamento, o que <strong class="text-ufc-red">Adesanya</strong>, com 7 main events de 5 rounds no curriculo, pode fazer?
              </p>
            </div>
          </div>
        </div>

        <!-- INTELLIGENCE: MODELO VS MERCADO -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">O Modelo vs O Mercado: A Grande Divergencia</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-emerald-400/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">DADOS CRITICOS DE ODDS</p>
              <div class="grid grid-cols-2 gap-6 mb-4">
                <div class="text-center">
                  <p class="text-xs text-white/40 mb-1">Odds Reais</p>
                  <p class="font-display text-3xl text-ufc-red">-130 a -163</p>
                  <p class="text-[10px] text-white/30 mt-1">Adesanya leve favorito</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-white/40 mb-1">Modelo First Strike</p>
                  <p class="font-display text-3xl text-blue-400">65% PYFER</p>
                  <p class="text-[10px] text-white/30 mt-1">Divergencia MASSIVA</p>
                </div>
              </div>
              <p class="text-sm text-white/60 leading-relaxed mb-4">
                As odds reais sao entre -130 e -163 pra <strong class="text-ufc-red">Adesanya</strong>, com <strong class="text-blue-400">Pyfer</strong> entre +102 e +130. E uma luta MUITO mais apertada do que a narrativa sugere. No DraftKings, 66% das apostas e 65% do dinheiro estao no Adesanya. O publico esta apostando no nome, nao no matchup.
              </p>
              <p class="text-sm text-white/60 leading-relaxed">
                Enquanto isso, o modelo do First Strike Podcast da 65% de probabilidade pra PYFER. Contra os ~55% implicitos pelas odds. Essa e uma das maiores divergencias modelo-mercado do card. O modelo pesa o declinio recente de Adesanya (3 derrotas, queixo comprometido, 14 meses parado) mais do que o mercado, que esta reagindo ao nome e a reputacao.
              </p>
            </div>
          </div>
        </div>

        <!-- INTELLIGENCE: ADESANYA LOSSES DECODED -->
        <div>
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">As 3 Derrotas Decodificadas</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/20 to-ufc-red/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">STRICKLAND</p>
                <p class="font-display text-lg text-white mb-2">PRESSAO E SUFOCAMENTO</p>
                <p class="text-xs text-white/50 leading-relaxed">NAO foi falha de cardio. Strickland sufocou Izzy com pressao constante e volume. Izzy pareceu desconectado mentalmente, nao fisicamente.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/20 to-ufc-red/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">DU PLESSIS</p>
                <p class="font-display text-lg text-white mb-2">ERRO NO CHAO R4</p>
                <p class="text-xs text-white/50 leading-relaxed">Izzy estava VENCENDO nos strikes. Foi derrubado e submetido no R4 por um erro especifico de ground game. Nao foi declinio, foi vulnerabilidade pontual.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/20 to-ufc-red/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">IMAVOV</p>
                <p class="font-display text-lg text-white mb-2">"6 POLEGADAS LONGE DEMAIS"</p>
                <p class="text-xs text-white/50 leading-relaxed">O coach identificou o erro: Izzy foi pego no meio da troca de base, "seis polegadas a frente do que deveria". Um overhand right conectou limpo. Erro tecnico, nao declinio geral.</p>
              </div>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-white/3 via-white/5 to-white/3"></div>
            <div class="relative p-5 text-center">
              <p class="text-sm text-white/60">A narrativa de "declinio" e REAL, mas as causas sao especificas. Nenhuma derrota foi por cardio ou por ser superado tecnicamente no striking. Pyfer nao e nenhum dos 3 arquetipo que venceu Izzy. Ele nao tem o smothering de Strickland, o wrestling/jiu-jitsu de Du Plessis, ou o timing de contragolpe de Imavov. Pyfer e um brawler flat-footed. E o pior arquetipo possivel contra o melhor gerenciador de distancia da historia do peso medio.</p>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#4 Peso Medio', fighter2: '#14 Peso Medio' },
        { dimensao: 'Sequencia', fighter1: '3 derrotas seguidas', fighter2: '3 vitorias seguidas' },
        { dimensao: 'Camp', fighter1: 'Whittaker como sparring, tecnicas do kickboxing, Goggins mental', fighter2: 'Pos cirurgia de disco, reabilitacao completa' },
        { dimensao: 'Risco', fighter1: '4a derrota seguida = conversa real de aposentadoria', fighter2: 'Perder contra veterano em "declinio" mata momentum' },
        { dimensao: 'Modelo vs Mercado', fighter1: 'Favorito nas odds (-130 a -163)', fighter2: 'Favorito no modelo First Strike (65%)' },
        { dimensao: 'Legado', fighter1: 'Redencao ou capitulo final', fighter2: 'Maior vitoria da carreira se vencer' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O STYLEBENDER RENASCIDO',
          subtitulo: 'Adesanya prova que as derrotas foram contra elite e que o Izzy contra o resto da divisao ainda domina',
          consequencias: [
            { tag: 'VALIDACAO', texto: 'As 3 derrotas foram contra top 5 (Strickland, Du Plessis, Imavov). Contra o #14, Izzy mostra o gap de nivel.' },
            { tag: 'WRESTLING', texto: 'Se Izzy realmente usar wrestling, abre um capitulo completamente novo na carreira aos 36 anos.' },
            { tag: 'PROXIMA', texto: 'Izzy vs top 5 MW: Brendan Allen, Imavov rematch, ou perdedor de Chimaev/Strickland.' },
          ],
          proxima_luta: 'Adesanya vs top 5 MW (Brendan Allen ou Imavov rematch)',
        },
        fighter2_vence: {
          titulo: 'BODYBAGZ DERRUBA A LENDA',
          subtitulo: 'Pyfer prova que o modelo analitico estava certo e que Adesanya esta acabado',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Pyfer entra no top 10 com a maior vitoria da carreira. Main event contra um ex-campeao.' },
            { tag: 'DECLINIO', texto: '4a derrota seguida de Adesanya. A conversa de aposentadoria se torna inevitavel.' },
            { tag: 'PROXIMA', texto: 'Pyfer vs top 7 MW em posicao de title eliminator.' },
          ],
          proxima_luta: 'Pyfer vs top 5-7 MW',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Israel Adesanya',
        color: 'red',
        recent_fights: [
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2 (0:30)', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Pego no meio da troca de base. Coach identificou: "6 polegadas a frente do que deveria." Erro tecnico, nao colapso.' },
          { date: 'Ago 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Submissao R4 (RNC, 3:38)', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Estava vencendo nos strikes. Derrubado e submetido no R4. Erro de ground game, nao de cardio.' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'Decisao Unanime', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Strickland sufocou com pressao e volume. Izzy desconectado mentalmente. Nao houve falha fisica.' },
          { date: 'Fev 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'KO de vinganca. Gancho devastador no R2. Ultima finalizacao da carreira.' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'Decisao Unanime', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo controlada.' },
        ],
        full_fight_history: [
          { date: 'Fev 2018', opponent: 'Rob Wilkinson', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC na Australia' },
          { date: 'Jun 2018', opponent: 'Marvin Vettori', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao apertada' },
          { date: 'Nov 2018', opponent: 'Derek Brunson', result: 'W', method: 'TKO R1', opponent_rank: '#9 MW', quality_score: 3, quality_label: 'Bom', note: 'KO de contragolpe' },
          { date: 'Fev 2019', opponent: 'Anderson Silva', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Passagem de tocha' },
          { date: 'Abr 2019', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD (5 rounds)', opponent_rank: '#4 MW', quality_score: 5, quality_label: 'Excelente', note: 'Titulo interino. Hall da Fama UFC. FOTN' },
          { date: 'Out 2019', opponent: 'Robert Whittaker', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Unificou titulo' },
          { date: 'Mar 2020', opponent: 'Yoel Romero', result: 'W', method: 'UD', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa controversa' },
          { date: 'Set 2020', opponent: 'Paulo Costa', result: 'W', method: 'TKO R2', opponent_rank: '#1 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Dominio total como AZARAO' },
          { date: 'Mar 2021', opponent: 'Jan Blachowicz', result: 'L', method: 'UD', opponent_rank: 'Campeao LHW', quality_score: 5, quality_label: 'Excelente', note: 'Tentou titulo LHW, perdeu' },
          { date: 'Jun 2021', opponent: 'Marvin Vettori', result: 'W', method: 'UD (5 rounds)', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo' },
          { date: 'Fev 2022', opponent: 'Robert Whittaker', result: 'W', method: 'UD (5 rounds)', opponent_rank: '#1 MW', quality_score: 5, quality_label: 'Excelente', note: 'Masterclass defensiva' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo' },
          { date: 'Fev 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'KO vinganca, recuperou titulo' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'UD', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Upset, perdeu titulo' },
          { date: 'Ago 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Sub R4', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Primeira submissao da carreira' },
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocauteado por overhand mid-stance-switch' },
        ],
        momentum_score: 3,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'descending',
        momentum_note: 'Tres derrotas seguidas contra qualidade elite (Strickland #4, Du Plessis campeao, Imavov #7). 14 meses parado. Primeiro corte de peso em mais de um ano. Porem, nenhuma das 3 derrotas foi por falha de cardio ou por ser superado tecnicamente no striking. O camp com Whittaker, as tecnicas do kickboxing, e o trabalho mental com Goggins sugerem reinvencao, nao resignacao. Como azarao, Izzy e 4-2 no UFC (incluindo a destruicao de Paulo Costa).',
      },
      fighter2: {
        nome: 'Joe Pyfer',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Submissao R2 (face crank)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sub por face crank. Mostrou versatilidade. POTN bonus.' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '2 knockdowns. Primeira decisao no UFC. Mas Gastelum e gatekeeper em declinio.' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1 (1:25)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Uppercut devastador. POTN bonus.' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'Decisao Unanime (48-47 x3)', opponent_rank: '#8 MW', quality_score: 3, quality_label: 'Bom', note: 'Dominou R1-R2, CANSOU R3-R5. Hermansson: "Eu sabia que meu condicionamento era superior." Blueprint exposto.' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao rapida contra poder puro.' },
        ],
        full_fight_history: [
          { date: 'Set 2022', opponent: 'Alen Amedovski', result: 'W', method: 'TKO R1 (3:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC' },
          { date: 'Abr 2023', opponent: 'Gerald Meerschaert', result: 'W', method: 'TKO R1 (3:15)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segundo KO R1' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2 (arm triangle)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Grappling' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'UD (48-47 x3)', opponent_rank: '#8 MW', quality_score: 3, quality_label: 'Bom', note: 'Cansou nos rounds finais' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1 (1:25)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Uppercut devastador, POTN' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '2 knockdowns, primeira decisao' },
          { date: 'Out 2025', opponent: 'Abus Magomedov', result: 'W', method: 'Sub R2 (face crank)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Face crank, POTN' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Tres vitorias seguidas com 2 bonus de Performance. A diversidade de finalizacoes (KO, decisao com knockdowns, submissao) mostra evolucao. Mas o nivel de oposicao permanece questionavel: nenhum adversario era ranqueado. A unica luta contra ranqueado (Hermansson #8) ele PERDEU porque cansou. Cirurgia de disco no inicio de 2025 acrescenta incerteza. Transformacao espiritual ("experiencia fora do corpo, Deus me deu direcao") pode significar mais disciplina ou menos instinto assassino.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Adesanya',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '13W-5L (72%)',
        contra_top5: '7W-4L',
      },
      fighter2: {
        nome: 'Pyfer',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '6W-1L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos enfrentaram Kelvin Gastelum. Adesanya venceu por decisao unanime em 5 rounds no UFC 236 (abril 2019), numa luta epica pelo titulo interino que entrou pro Hall da Fama. Pyfer venceu por decisao unanime com 2 knockdowns em junho 2025. A diferenca: Gastelum de 2019 era top 5 e estava no auge. O de 2025 era gatekeeper em fim de carreira. Adesanya enfrentou a elite por 7 anos. Pyfer nunca enfrentou um top 5.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.94, valueB: 3.63, maxVal: 6, format: 'decimal', note: 'Volume similar. Adesanya com leve vantagem em output.' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 46, maxVal: 100, format: 'percent', note: 'Quase identica. Ambos acertam pouco menos da metade.' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.00, valueB: 2.80, maxVal: 5, format: 'decimal', reverseWinner: true, note: 'DIFERENCA CRITICA. Adesanya absorve 40% MENOS. O footwork e a distancia fazem esse gap.' },
        { label: 'Defesa de Strikes (%)', valueA: 56, valueB: 50, maxVal: 100, format: 'percent', note: 'Adesanya defende mais. Pyfer flat-footed absorve mais.' },
        { label: 'Takedowns por 15 Min', valueA: 0.05, valueB: 1.23, maxVal: 3, format: 'decimal', note: 'Pyfer tenta TDs. Adesanya quase nunca (0.05). Mas Ruffy ensinou TD novo...' },
        { label: 'Defesa de Takedown (%)', valueA: 77, valueB: 60, maxVal: 100, format: 'percent', note: 'Adesanya com TDD forte (77%). Pyfer vulneravel (60%).' },
        { label: 'Knockdowns por 15 Min', valueA: 0.80, valueB: 1.20, maxVal: 2, format: 'decimal', note: 'Pyfer derruba MUITO mais. Top 4 do peso medio. Recorde de PowerKube acima de Ngannou.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '36 anos', fighter2: '29 anos', note: '7 anos de diferenca. Mas Pyfer tem mais cirurgias que Izzy.' },
        { label: 'Altura', fighter1: '1,93m (6\'4")', fighter2: '1,88m (6\'2")', note: '5cm mais alto. Vantagem de angulo nos jabs.' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '188cm (74")', note: '5 POLEGADAS a mais de reach. Diferenca enorme que define a geometria da luta.' },
        { label: 'Stance', fighter1: 'Switch (ortodoxo/southpaw)', fighter2: 'Ortodoxo (flat-footed)', note: 'Adesanya muda de base constantemente. Pyfer e estacionario.' },
        { label: 'Academia', fighter1: 'City Kickboxing, Auckland', fighter2: 'Marquez MMA, Philadelphia', note: 'CKB: Volkanovski, Hooker, Whittaker (convidado). Marquez: Sean Brady, Petroski.' },
        { label: 'Cirurgias Recentes', fighter1: 'Nenhuma', fighter2: 'Disco (2025) + Tripla cotovelo (anterior)', note: 'Pyfer com historico cirurgico significativo.' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 90, valueB: 72, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya e o melhor striker tecnico da historia do MW. Jab, timing, angulos, switch stance. Mesmo apos 3 derrotas, a tecnica permanece elite. Resgatando tecnicas do kickboxing na China que a equipe de Pyfer nao tem filme.' },
        { label: 'Poder de Nocaute Puro', valueA: 68, valueB: 92, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Pyfer quebrou o RECORDE DO NGANNOU no PowerKube (170.218 vs 129.161), sendo 85 lbs mais leve. 1.2 knockdowns/15min. O poder e historico. Adesanya tem 1 KO nas ultimas 7 lutas.' },
        { label: 'Defesa e Footwork', valueA: 88, valueB: 45, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'A diferenca mais brutal do matchup. Adesanya e o melhor gerenciador de distancia da historia do MW. Pyfer e FLAT-FOOTED, nao se move lateralmente, nao corta cage. Pesadelo estilístico.' },
        { label: 'Wrestling/Grappling', valueA: 52, valueB: 62, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Pyfer treina com Sean Brady e Petroski (Marquez MMA). Submeteu Magomedov. Adesanya com 77% TDD mas foi submetido por Du Plessis. O takedown novo de Ruffy e a wildcard.' },
        { label: 'Cardio em 5 Rounds', valueA: 78, valueB: 48, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Adesanya: 7 main events de 5 rounds. Pyfer PERDEU a unica luta de 5 rounds (Hermansson). Hermansson disse: "Eu sabia que meu condicionamento era superior." Cirurgia de disco acrescenta incerteza.' },
        { label: 'Experiencia de Elite', valueA: 95, valueB: 35, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Abismo. Adesanya enfrentou Pereira 2x, Whittaker 2x, Du Plessis, Strickland, Imavov, Gastelum. Pyfer: Barriault, Gastelum gatekeeper, Magomedov. Nunca enfrentou top 5. Nunca fez main event.' },
      ],
      insight: 'O matchup estilístico favorece Adesanya em quase tudo exceto poder puro. A vantagem de footwork vs flat-footedness e a maior assimetria dessa luta. Mas o modelo First Strike ve algo diferente: pesa o declinio, o queixo comprometido, e os 14 meses parado mais que o mercado. A verdade provavelmente esta entre os dois.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Adesanya',
        ko_tko: { count: 16, percent: 67 },
        submission: { count: 0, percent: 0 },
        decision: { count: 8, percent: 33 },
        total_wins: 24,
      },
      fighter2: {
        nome: 'Pyfer',
        ko_tko: { count: 9, percent: 60 },
        submission: { count: 4, percent: 27 },
        decision: { count: 2, percent: 13 },
        total_wins: 15,
      },
      insight: 'Numeros enganosos. Adesanya com 67% KO na carreira, mas no UFC tende a ir pra decisao (8 de 13 vitorias). Ultima finalizacao: Pereira KO R2, fevereiro 2023. Tres anos sem finalizar. Pyfer e finalizador nato: apenas 2 decisoes em 15 vitorias. Se a luta for longa, favorece Adesanya. Se for curta, favorece Pyfer. Historico do MW Under: 53.6% cash rate.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 7,
          danger_label: 'VANTAGEM PYFER',
          color: 'green',
          title: 'A Janela do Poder Historico',
          description: 'Pyfer e mais perigoso aqui. 1.2 knockdowns/15min, recorde de PowerKube. Adesanya voltando de 14 meses parado com primeiro corte de peso em mais de um ano. Se Pyfer pegar Izzy mid-stance-switch (como Imavov fez), o queixo comprometido pode nao aguentar. O coach de Izzy identificou o erro exato contra Imavov. Se corrigiu, a janela diminui. Se nao, e o round mais perigoso da noite.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'ROUND DECISIVO',
          color: 'gold',
          title: 'O Ponto de Virada',
          description: 'Se Pyfer nao finalizou ate aqui, o blueprint Hermansson entra em acao. Calf kicks, volume, e condicionamento comecam a dominar. Pyfer cansou contra HERMANSSON no R3. Contra Adesanya, que e MUITO mais eficiente em energia, a queda pode ser mais drastica. A cirurgia de disco acrescenta incerteza: a coluna aguenta 15+ minutos de alta intensidade?',
        },
        {
          rounds: 'R4-R5',
          danger_level: 3,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'Territorio Desconhecido pra Pyfer',
          description: 'Pyfer NUNCA esteve no R4 ou R5. Adesanya viveu 7 main events de 5 rounds. O fight IQ, a gestao de energia, e a experiencia de championship rounds sao incomparaveis. Se Izzy "afoga" Pyfer como prometeu, esses rounds sao dominio. Adesanya declarou: "Vou afoga-lo nos championship rounds." E o plano explicito.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Target', title: 'Whittaker Como Simulador de Pyfer', fighter: 'Adesanya', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Robert Whittaker (pressure fighter, wrestling de elite, poder nas maos) treinou COM Adesanya no CKB por semanas. E o simulador PERFEITO do arquetipo de Pyfer. Izzy drilou contra esse estilo diariamente. Vantagem de preparacao massiva.' },
        { icon: 'Zap', title: 'Recorde de PowerKube Acima de Ngannou', fighter: 'Pyfer', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Pyfer registrou 170.218 unidades no PowerKube contra 129.161 de Ngannou, sendo 85 lbs mais leve. O poder e literalmente historico. Contra um queixo comprometido, um power shot limpo pode acabar com tudo instantaneamente.' },
        { icon: 'AlertTriangle', title: 'Cirurgia de Disco em 2025', fighter: 'Pyfer', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Duas cirurgias nas costas apos a ultima luta. Saiu do UFC Mexico City por isso. Problemas de coluna afetam explosividade, sprawl, e resistencia. Diz estar saudavel, mas 5 rounds e o teste definitivo.' },
        { icon: 'Brain', title: 'Queixo Comprometido + Mid-Stance-Switch', fighter: 'Adesanya', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Imavov acertou Izzy no meio da troca de base. O coach identificou "6 polegadas a frente do que deveria." Se Pyfer pegar o mesmo momento, com poder de recorde PowerKube, pode ser fatal. O queixo de Izzy aos 36 nao e o mesmo.' },
        { icon: 'Activity', title: 'Cardio: Blueprint Hermansson', fighter: 'Pyfer', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Pyfer PERDEU a unica luta de 5 rounds. Cansou contra Hermansson a partir do R3. Hermansson: "Eu sabia que meu condicionamento era superior." Em 5 rounds contra Adesanya, o cardio e a maior vulnerabilidade.' },
        { icon: 'TrendingUp', title: 'Modelo First Strike: 65% Pyfer', fighter: 'Pyfer', risk_level: 'POSITIVO', risk_color: 'green', description: 'O modelo analitico do First Strike Podcast da 65% pra Pyfer vs 45% implicito pelas odds. A divergencia e uma das maiores do card. O modelo pesa o declinio, queixo, e inatividade mais que o mercado.' },
        { icon: 'Shield', title: 'Transformacao Espiritual de Pyfer', fighter: 'Pyfer', risk_level: 'NEUTRO', risk_color: 'neutral', description: '"Tive uma experiencia fora do corpo. Deus me deu direcao." Pyfer diz ter feito "um 180 total" na vida. Pode significar mais disciplina e paciencia, ou pode significar menos instinto assassino. A resposta so vem no octogono.' },
        { icon: 'Zap', title: 'Tecnicas Esquecidas do Kickboxing na China', fighter: 'Adesanya', risk_level: 'POSITIVO', risk_color: 'green', description: 'Izzy resgatou tecnicas da epoca do kickboxing profissional na China. Material que a equipe de Pyfer nao tem como estudar. Combinado com o takedown do Ruffy, Adesanya esta tentando ser imprevisivel pela primeira vez em anos.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Adesanya',
        total_probability: 55,
        scenarios: [
          { name: 'Masterclass de Distancia', probability: 30, method: 'Decisao Unanime', description: 'Adesanya usa 5 polegadas de reach pra manter Pyfer flat-footed na ponta do jab. Contragolpes precisos, footwork lateral, dominando nos pontos. Pyfer cansa a partir do R3 (blueprint Hermansson). Izzy controla os championship rounds confortavelmente.' },
          { name: 'TKO Tardio por Acumulo', probability: 14, method: 'TKO R4-R5', description: 'Adesanya acumula dano com jabs, body shots, e possivelmente wrestling (Ruffy). No R4-R5, Pyfer ja esta esgotado pelo cardio e a coluna pos-cirurgia nao aguenta. O arbitro para.' },
          { name: 'Contragolpe Preciso', probability: 11, method: 'KO R3-R5', description: 'Pyfer entra desesperado buscando nocaute e Adesanya acerta um contragolpe limpo. Tecnicas "esquecidas" do kickboxing que Pyfer nao esperava. Probabilidade menor porque Izzy tem 1 KO em 7 lutas recentes.' },
        ],
      },
      fighter2: {
        nome: 'Pyfer',
        total_probability: 43,
        scenarios: [
          { name: 'PowerKube Conecta Limpo', probability: 22, method: 'KO/TKO R1-R2', description: 'Pyfer fecha distancia e acerta um power shot no queixo comprometido de Adesanya. Pode ser no mid-stance-switch (como Imavov fez). O recorde de PowerKube contra a durabilidade diminuida de Izzy. Um shot limpo e o suficiente.' },
          { name: 'Pressao e Volume ao Estilo Strickland', probability: 12, method: 'Decisao Unanime', description: 'Pyfer mantem pressao constante, nao deixa Izzy encontrar ritmo, e vence nos pontos. Problema: Pyfer NAO e Strickland em cage-cutting. E flat-footed. E cardio e fraco em lutas longas. Possivel mas improvavel.' },
          { name: 'Ground and Pound', probability: 9, method: 'TKO R2-R3', description: 'Pyfer muda pro wrestling. Treina com Sean Brady no Marquez MMA. Adesanya mostrou vulnerabilidade no chao contra Du Plessis. Se derrubar, pode dominar com GnP.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Israel Adesanya',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Essa e uma luta MUITO mais apertada do que a narrativa de "ex-campeao vs prospect" sugere. As odds reais (-130 a -163 pra Adesanya, +102 a +130 pra Pyfer) refletem isso. O modelo First Strike da 65% pro Pyfer, contra 55% implicito pelas odds. Adesanya tem vantagens claras em footwork (vs flat-footed), experiencia em 5 rounds (vs blueprint Hermansson), e reach (5 polegadas). Mas o queixo comprometido, 14 meses parado, e o poder historico de PowerKube de Pyfer sao riscos reais. Adesanya treinou especificamente contra o arquetipo de Pyfer (Whittaker no camp), tem armas novas (wrestling do Ruffy, tecnicas do kickboxing), e um plano claro ("afoga-lo nos championship rounds"). A confianca e MEDIA, nao ALTA, porque o poder de Pyfer e uma constante: um shot limpo contra o queixo comprometido pode acabar com tudo, independente da preparacao.',
      x_factor: {
        title: 'Wrestling Inedito de Adesanya',
        description: 'Se Izzy realmente misturar wrestling pela primeira vez na carreira UFC, a equipe de Pyfer nao tem NENHUM material pra estudar. Zero filme. 0.05 takedowns por 15 minutos na carreira inteira. Uma tentativa de takedown de Adesanya seria o equivalente a um plot twist no meio da luta.',
      },
      upset_alert: {
        title: 'O PowerKube Nao Liga Pra Preparacao',
        description: 'Pyfer quebrou o recorde de Ngannou. 170.218 unidades de forca. Contra o queixo que foi nocauteado por Imavov no R2. Preparacao, Whittaker no camp, tecnicas esquecidas: nada disso importa se Pyfer conectar limpo nos primeiros 2 rounds. Poder desse nivel e o maior equalizador do MMA.',
      },
      probabilities: {
        fighter1: { nome: 'Adesanya', percent: 55 },
        fighter2: { nome: 'Pyfer', percent: 43 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Pyfer ML (+120)', reasoning: 'O modelo First Strike da 65% pro Pyfer. As odds implicam ~45%. Se o modelo estiver mais perto da realidade do que o mercado, +120 e valor genuino. O publico esta apostando o nome, nao o matchup. 66% das apostas no DraftKings estao em Adesanya.' },
        method: { pick: 'Adesanya por Decisao (+160)', reasoning: 'Se o game plan de Adesanya funcionar (distancia, jab, championship rounds), decisao e o caminho mais provavel. Izzy tem 1 KO nas ultimas 7 lutas. A finalizacao nao vem com facilidade. +160 e bom valor pra o cenario mais logico de vitoria dele.' },
        over_under: { pick: 'Over 3.5 Rounds (-130)', rounds: 3.5, reasoning: 'Se Adesanya controlar a distancia, a luta vai longe. A unica finalizacao tardia de Pyfer foi CONTRA ele (Hermansson UD). -130 e justo pra uma luta que estatisticamente tende a ir longe se Izzy estiver minimamente competitivo.' },
        best_value: 'Pyfer ML a +120 e a aposta de melhor valor se voce acredita no modelo First Strike (65% Pyfer). O publico esta apostando o nome "Adesanya", nao analisando que ele perdeu 3 seguidas, tem queixo comprometido, e esta parado ha 14 meses. Se prefere seguranca, Adesanya por Decisao a +160 e o cenario mais logico de vitoria. Armadilha: Adesanya KO/TKO a +350 (1 KO em 7 lutas, o poder de finish DECLINOU).',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Izzy Tenta Takedown?', icon: 'Target', description: 'A primeira tentativa de takedown de Adesanya na luta inteira sera o maior sinal do camp. Se ele realmente misturar o wrestling do Ruffy, Pyfer esta enfrentando um lutador que nao existe nos filmes. Observe nos primeiros 3 minutos.' },
        { num: 2, title: 'Footwork de Pyfer nos Primeiros 2 Minutos', icon: 'Activity', description: 'Pyfer e flat-footed. Observe se ele consegue cortar o cage contra Adesanya. Se Izzy estiver se movendo livremente nos angulos, a geometria da luta ja esta definida. Se Pyfer conseguir encurtar, a luta muda completamente.' },
        { num: 3, title: 'A Coluna de Pyfer no R3', icon: 'AlertTriangle', description: 'Cirurgia de disco em 2025. O R3 e onde o corpo comeca a reclamar. Observe se Pyfer comeca a se movimentar com menos explosividade, se o sprawl fica mais lento, se a postura muda. Qualquer sinal de desconforto na coluna e red flag massiva.' },
        { num: 4, title: 'Adesanya Mid-Stance-Switch', icon: 'Zap', description: 'Imavov acertou Izzy EXATAMENTE no momento da troca de base. O coach identificou o erro. Se Adesanya nao esta trocando de stance no R1-R2, e sinal de que corrigiu. Se esta trocando, observe se Pyfer esta mirando esse momento.' },
        { num: 5, title: 'Linguagem Corporal no R4', icon: 'Brain', description: 'Pyfer nunca chegou no R4. Se chegar, a linguagem corporal conta tudo. Ombros caidos, respiracao pesada, passos pesados = blueprint Hermansson confirmado. Postura ereta, mao alta = Pyfer evoluiu. A coluna e o cardio decidem.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'ODDS REAIS', content: 'ADESANYA vs PYFER\nPOS WEIGH-INS\n\nOdds REAIS: Adesanya -130 a -163\nPyfer +102 a +130\n\nMUITO mais apertado do que voce pensa.\n\nModelo First Strike: 65% PYFER.\nO mercado: 55% Adesanya.\n\nQuem esta certo?', color: 'gold' },
        { slide_number: 2, title: 'O CAMP DE IZZY', content: 'WHITTAKER treinando COM Adesanya.\nPressure fighter com wrestling = simulador PERFEITO de Pyfer.\n\nTakedown NOVO do Mauricio Ruffy.\n0.05 TDs por 15 min na carreira.\nSe usar, Pyfer nao tem filme.\n\nTecnicas "esquecidas" do kickboxing.\nDavid Goggins pro mental.\n\nReinvencao total.', color: 'red' },
        { slide_number: 3, title: 'O CORPO DE PYFER', content: 'CIRURGIA DE DISCO em 2025.\nSaiu do UFC Mexico City.\n"Duas cirurgias nas costas."\n\nCIRURGIA TRIPLA no cotovelo antes.\n15 meses de reabilitacao.\n\nMAS: quebrou recorde de NGANNOU\nno PowerKube (170.218 vs 129.161)\nsendo 85 lbs mais leve.\n\nO poder e HISTORICO.', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'ADESANYA por Decisao\nConfianca: MEDIA (6/10)\n55% Adesanya / 43% Pyfer\n\nMelhor valor: Pyfer ML +120\n(modelo da 65%, odds dao 45%)\n\nSeguranca: Izzy por Decisao +160\n\nArmadilha: Izzy KO/TKO +350\n(1 KO em 7 lutas, poder declinou)', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'POS WEIGH-INS: Adesanya vs Pyfer. As odds REAIS sao -130 a -163 pro Izzy, NAO -300. Pyfer a +102 a +130. E MUITO mais apertado do que a narrativa sugere. Thread de inteligencia:' },
        { num: '2/6', text: 'CAMP ADESANYA: Robert Whittaker esta treinando COM Izzy no CKB. Pressure fighter + wrestling = simulador PERFEITO de Pyfer. Adesanya aprendeu takedown do Ruffy (0.05 TDs/15min na carreira). Se usar, a equipe de Pyfer nao tem filme. David Goggins pro mental.' },
        { num: '3/6', text: 'PYFER: Cirurgia de DISCO em 2025. "Duas cirurgias nas costas." Saiu do UFC Mexico City. Antes: cirurgia TRIPLA no cotovelo (15 meses reab). MAS quebrou recorde de NGANNOU no PowerKube (170.218 vs 129.161). Corpo reconstruido com poder historico.' },
        { num: '4/6', text: 'DIVERGENCIA: Modelo First Strike da 65% PYFER vs 45% implicito pelas odds. Uma das maiores divergencias do card. DraftKings: 66% das apostas em Adesanya. O publico aposta o nome. O modelo pesa as 3 derrotas, queixo comprometido, 14 meses parado.' },
        { num: '5/6', text: 'BLUEPRINT HERMANSSON: Pyfer PERDEU a unica luta de 5 rounds (48-47 x3). Cansou no R3. Hermansson: "Eu sabia que meu condicionamento era superior." Se HERMANSSON superou Pyfer em cardio, o que Izzy com 7 main events de 5 rounds faz?' },
        { num: '6/6', text: 'Pick: Adesanya por Decisao. Confianca MEDIA. Melhor valor: Pyfer ML +120 (modelo vs mercado). Seguranca: Izzy Decisao +160. Armadilha: Izzy KO +350 (1 KO em 7 lutas). Over 3.5 rounds -130. A luta mais inteligente de analisar do card.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'As odds de Adesanya vs Pyfer NAO sao -300. Sao -130 a -163. E um modelo analitico da 65% pro PYFER. Essa luta e MUITO mais apertada do que voce pensa.' },
        { time: '10-30s', title: 'Camp Intel', text: 'Whittaker esta treinando COM Izzy. Simulador perfeito de Pyfer: pressao e wrestling. Adesanya aprendeu takedown do Ruffy, 0.05 TDs na carreira. Se usar, Pyfer nao tem filme. Tecnicas esquecidas do kickboxing. Goggins pro mental. Reinvencao aos 36.' },
        { time: '30-50s', title: 'Pyfer Intel', text: 'Cirurgia de disco em 2025. Duas cirurgias nas costas. MAS quebrou recorde de Ngannou no PowerKube. O poder e historico. Blueprint Hermansson: Pyfer PERDEU a unica luta de 5 rounds porque cansou. Em 5 contra Izzy, o cardio e a maior vulnerabilidade.' },
        { time: '50-65s', title: 'Modelo vs Mercado', text: 'First Strike Podcast: 65% Pyfer. Mercado: 55% Adesanya. 66% do dinheiro no DraftKings em Izzy. O publico aposta o nome. O modelo pesa o queixo comprometido e 14 meses parado. Quem esta certo?' },
        { time: '65-75s', title: 'Previsao', text: 'Adesanya por decisao. Confianca MEDIA. Melhor valor: Pyfer ML +120. Over 3.5 rounds. Armadilha: Izzy KO a +350, ele nao finaliza mais.' },
        { time: '75-85s', title: 'CTA', text: 'Voce confia no modelo ou no mercado? Comenta e segue pra mais intel do UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'As odds desse main event MENTEM. Todo mundo acha que Adesanya e grande favorito. Nao e.', body: 'As odds reais sao -130 a -163. E um modelo analitico da 65% pro PYFER. Whittaker esta treinando COM Izzy como simulador. Pyfer fez cirurgia de disco em 2025. Quebrou recorde de Ngannou no PowerKube. O publico aposta o nome, nao o matchup. Essa luta e MUITO mais apertada do que parece.', cta: 'Voce esta no time do modelo ou do mercado? Comenta!' },
        { hook: 'Pyfer quebrou o recorde de NGANNOU no PowerKube. Sendo 85 lbs mais leve.', body: '170.218 unidades de forca. Contra o queixo que Imavov nocauteou em 30 segundos. Adesanya treinou com Whittaker, aprendeu wrestling do Ruffy, resgatou tecnicas do kickboxing. Mas nada disso importa se Pyfer conectar limpo nos primeiros 2 rounds. O poder historico contra a tecnica esquecida.', cta: 'Quem leva? Poder ou tecnica? Comenta!' },
      ],
      headlines: [
        'Whittaker Treinando COM Adesanya: O Simulador Perfeito de Pyfer',
        'Cirurgia de Disco, Recorde de Ngannou e a Luta Mais Apertada do Card',
        'Modelo First Strike: 65% Pyfer. O Publico Apostando o Nome, Nao o Matchup.',
        'As 3 Derrotas de Izzy Decodificadas: Nenhuma Foi o Que Voce Pensa',
        'Adesanya Pode Lutar Wrestling Pela Primeira Vez na Carreira UFC',
        'Blueprint Hermansson: Por Que 5 Rounds Sao Pesadelo Pra Pyfer',
      ],
      podcast: [
        {
          timestamp: '0:00-8:00',
          title: 'O Camp Mais Estrategico da Carreira de Izzy',
          talking_points: [
            'Whittaker treinando COM Adesanya no CKB. O simulador perfeito: pressure fighter com wrestling de elite. Semanas de sparring diario contra o arquetipo de Pyfer.',
            'Takedown novo do Ruffy. 0.05 TDs/15min na carreira inteira. Se Izzy usar wrestling, a equipe de Pyfer nao tem NENHUM filme. Zero.',
            'Tecnicas esquecidas do kickboxing na China. Material inedito que nao esta nos tapes. David Goggins pro mental apos 3 derrotas.',
            'Game plan declarado: "Vou direto nele, ataco imediatamente. Quando tenta me acertar, nao estou la. Afogo ele nos championship rounds."',
          ],
          discussion_questions: [
            'Whittaker como sparring e vantagem real ou exagero da narrativa?',
            'Voce acredita que Adesanya realmente vai tentar wrestling? Seria a maior surpresa da noite.',
          ],
        },
        {
          timestamp: '8:00-15:00',
          title: 'O Corpo Reconstruido e o Modelo vs Mercado',
          talking_points: [
            'Pyfer: cirurgia de disco (2025), cirurgia tripla no cotovelo (anterior). Corpo reconstruido mas com desgaste significativo.',
            'Recorde de PowerKube de Ngannou QUEBRADO (170.218 vs 129.161). 85 lbs mais leve. O poder e historico.',
            'Blueprint Hermansson: Pyfer PERDEU a unica luta de 5 rounds. Cansou no R3. "Eu sabia que meu condicionamento era superior."',
            'Modelo First Strike: 65% Pyfer vs 45% implicito pelas odds. DraftKings: 66% do dinheiro em Adesanya. O publico apostando o nome.',
            'Melhor valor: Pyfer ML +120 se confia no modelo. Seguranca: Izzy Decisao +160. Armadilha: Izzy KO +350.',
          ],
          discussion_questions: [
            'A cirurgia de disco e um risco real ou Pyfer ja provou que supera problemas fisicos?',
            'Voce confia mais no modelo analitico ou na sabedoria do mercado?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-130 a -163',
        fighter2_odds: '+102 a +130',
        fighter1_name: 'Israel Adesanya',
        fighter2_name: 'Joe Pyfer',
        source: 'Range de DraftKings, FanDuel e BetMGM (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Modelo First Strike vs Mercado', stat_headline: 'MODELO: 65% PYFER. ODDS IMPLICITAS: 45% PYFER. DIVERGENCIA DE 20 PONTOS.', contexto: 'O First Strike Podcast usa modelo analitico que pesa declinio recente, queixo comprometido, e inatividade mais do que o mercado. 66% das apostas no DraftKings estao em Adesanya. O publico esta apostando o nome.', implicacao_aposta: 'Pyfer ML a +120 pode ser valor genuino. Se o modelo estiver mais perto da realidade, o mercado esta subvalorizando Pyfer em 20 pontos percentuais.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Flat-Footed vs Melhor Footwork da Historia do MW', stat_headline: 'ADESANYA ABSORVE 2.00 STRIKES/MIN VS 2.80 DE PYFER. 40% MENOS.', contexto: 'Pyfer e flat-footed. Nao se move lateralmente. Nao corta cage. Contra Hermansson, ja teve problemas. Adesanya e o melhor gerenciador de distancia da historia do peso medio. Com 5 polegadas de reach a mais. A geometria e um pesadelo pra Pyfer.', implicacao_aposta: 'Favorece Over rounds e Adesanya por Decisao. Se Pyfer nao consegue fechar distancia, a luta vai longe.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Blueprint Hermansson: Cardio Exposto', stat_headline: 'PYFER PERDEU A UNICA LUTA DE 5 ROUNDS. CANSOU NO R3. HERMANSSON: "EU SABIA."', contexto: 'Contra Hermansson, Pyfer dominou R1-R2 e depois desmoronou. Cirurgia de disco em 2025 acrescenta incerteza sobre a resistencia da coluna em 25 minutos de alta intensidade.', implicacao_aposta: 'Over 3.5 rounds a -130 e solido. Pyfer raramente vai longe, mas quando vai, perde. A duracao favorece Adesanya.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Recorde de PowerKube vs Queixo Comprometido', stat_headline: 'PYFER: 170.218 UNIDADES NO POWERKUBE. NGANNOU: 129.161. DIFERENCA DE 85 LBS.', contexto: 'Pyfer tem poder HISTORICO. Adesanya foi nocauteado por Imavov no R2, mid-stance-switch. O coach identificou o erro especifico. Se Pyfer pegar esse mesmo momento, o recorde de PowerKube contra o queixo comprometido e combinacao letal.', implicacao_aposta: 'Pyfer por KO/TKO R1-R2 a +300 e alto risco/alta recompensa. O poder e real e o queixo e vulneravel.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Props de Duracao da Luta', stat_headline: 'UNDER 3.5 RDS +104 A +106. OVER 3.5 -130 A -143. FIGHT NOT GO DISTANCE -148.', contexto: 'Historicamente, MW Under bets tem 53.6% cash rate. Fight not going to distance a -148 e interessante. Adesanya tem 1 KO em 7 lutas mas o poder de Pyfer e real. O mercado esta dividido.', implicacao_aposta: 'Over 3.5 rounds e a aposta mais consistente se voce acredita no footwork de Izzy. Fight not go distance -148 se voce acredita no poder de Pyfer.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Pyfer ML (+120)', odds: '+120', confianca: 'media', edge_vs_mercado: 'Modelo First Strike: 65% Pyfer vs 45% implicito. 20 pontos de divergencia. O publico apostando o nome, nao o matchup.', raciocinio: 'A melhor aposta de valor do card se voce confia no modelo analitico. O mercado esta reagindo ao nome "Adesanya" mais do que aos fatos: 3 derrotas seguidas, queixo comprometido, 14 meses parado. +120 pra um lutador com poder historico e 43% de probabilidade real e valor.' },
        { tipo: 'Metodo', pick: 'Adesanya por Decisao', odds: '+160', confianca: 'media', raciocinio: 'Se o game plan de Adesanya funcionar (distancia, jab, championship rounds), decisao e o caminho mais provavel. 1 KO em 7 lutas, o poder de finish declinou. +160 e bom valor pro cenario mais logico de vitoria dele.' },
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-130', confianca: 'alta', raciocinio: 'A aposta mais solida. Se Adesanya controlar a distancia (footwork elite vs flat-footed), a luta vai longe. Pyfer nunca venceu uma luta que foi alem do R2. Blueprint Hermansson. -130 e justo.' },
        { tipo: 'Prop', pick: 'Pyfer KO/TKO R1-R2', odds: '+300', confianca: 'baixa', edge_vs_mercado: 'Se Pyfer pegar Izzy mid-stance-switch como Imavov fez, com recorde de PowerKube, e game over. Alto risco, alto retorno.', raciocinio: 'Aposta de risco/recompensa. O cenario existe: poder historico vs queixo comprometido. Mas Izzy drilou contra esse arquetipo com Whittaker por semanas. A preparacao e real.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Adesanya KO/TKO (+300 a +350)',
        descricao: 'Izzy tem 1 KO nas ultimas 7 lutas. A ultima finalizacao foi Pereira em fevereiro de 2023, tres anos atras. O poder de finish declinou significativamente. Contra um lutador que fez cirurgia tripla no cotovelo e voltou a socar com recorde de PowerKube, apostar que ADESANYA vai nocautear e ignorar os dados. Se Izzy vencer, e por decisao.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  
  
  return <FullAnalysisView analise={translateAnalysis(analise)} />;
}
