'use client';

import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

// ═══════════════════════════════════════════════════════════════
// SHARED (non-translatable) data fragments
// ═══════════════════════════════════════════════════════════════

const sharedMeta = {
  id: 'abdul-malik-vs-belgaroui' as const,
  evento_id: null,
  slug: 'abdul-malik-vs-belgaroui',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  is_titulo: false,
  broadcast: null,
  status: 'published' as const,
  analysis_type: 'full_single' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const sharedHeroFighters = {
  fighter1: {
    nome_completo: 'Mansur Abdul-Malik',
    apelido: '',
    sobrenome: 'Abdul-Malik',
    record: '9-0-1',
    imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/ABDUL-MALIK_MANSUR_L_12-06.png?itok=r58rf4-K',
  },
  fighter2: {
    nome_completo: 'Yousri "Baby Face Assassin" Belgaroui',
    apelido: 'Baby Face Assassin',
    sobrenome: 'Belgaroui',
    record: '9-3-0',
    imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/BELGAROUI_YOUSRI_R_10-18.png?itok=g7i7Fdzt',
  },
};

const sharedTacticalBreakdown = {
  stats: [],
  radarData: [],
  taleOfTape: {
    fighter1: { altura: '1,88m', envergadura: '203cm', idade: 28, academia: 'Xtreme Couture' },
    fighter2: { altura: '1,98m', envergadura: '198cm', idade: 33, academia: 'Teixeira MMA & Fitness' },
  },
  pathsToVictory: { fighter1: [], fighter2: [] },
  dangerZones: [],
};

const sharedFightPrediction = {
  predictedWinner: 'fighter1' as const,
  confidence: 'MEDIA' as const,
  fighter1Scenarios: [],
  fighter2Scenarios: [],
  keyFactors: [],
};

const sharedStats = [
  { label: 'Sig. Strikes por Minuto', valueA: 5.29, valueB: 3.50, maxVal: 7, format: 'decimal' as const },
  { label: 'Precisao de Strikes (%)', valueA: 54, valueB: 50, maxVal: 100, format: 'percent' as const },
  { label: 'Strikes Absorvidos/Min', valueA: 3.50, valueB: 3.00, maxVal: 6, format: 'decimal' as const, reverseWinner: true },
  { label: 'Defesa de Strikes (%)', valueA: 49, valueB: 55, maxVal: 100, format: 'percent' as const },
  { label: 'Takedowns por 15 Min', valueA: 2.50, valueB: 0.00, maxVal: 5, format: 'decimal' as const },
  { label: 'Precisao de Takedown (%)', valueA: 50, valueB: 0, maxVal: 100, format: 'percent' as const },
  { label: 'Defesa de Takedown (%)', valueA: 82, valueB: 50, maxVal: 100, format: 'percent' as const },
];

const sharedDistribuicaoNumbers = {
  fighter1: {
    ko_tko: { count: 7, percent: 78 },
    submission: { count: 2, percent: 22 },
    decision: { count: 0, percent: 0 },
    total_wins: 9,
  },
  fighter2: {
    ko_tko: { count: 7, percent: 78 },
    submission: { count: 0, percent: 0 },
    decision: { count: 2, percent: 22 },
    total_wins: 9,
  },
};

const sharedOdds = {
  fighter1_odds: '-120',
  fighter2_odds: '+105',
  fighter1_name: 'Mansur Abdul-Malik',
  fighter2_name: 'Yousri Belgaroui',
};

const sharedProbabilities = {
  fighter1: { nome: 'Abdul-Malik', percent: 55 },
  fighter2: { nome: 'Belgaroui', percent: 42 },
  draw: 3,
};

// ═══════════════════════════════════════════════════════════════
// PT — Portuguese (original)
// ═══════════════════════════════════════════════════════════════

const analisePT: FullSingleAnalise = {
  ...sharedMeta,
  titulo: 'Abdul-Malik vs Belgaroui: O Invicto Contra o Assassino de Kickboxers',
  subtitulo: 'Prospect invicto do wrestling enfrenta ex-rival de Pereira e Adesanya no kickboxing',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 3,
  tactical_breakdown: sharedTacticalBreakdown,
  fight_prediction: {
    ...sharedFightPrediction,
    predictedMethod: 'TKO ou Decisao',
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Mansur Abdul-Malik',
    record: '9-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Antonio Trocoli', method: 'Sub R1 (guilhotina)', event: 'UFC 323' },
      { result: 'D', opponent: 'Cody Brundage', method: 'Draw Majoritario', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Nick Klein', method: 'TKO R2', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Dusko Todorovic', method: 'TKO R1', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Yousri Belgaroui',
    apelido: 'Baby Face Assassin',
    record: '9-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Azamat Bekoev', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Taiga Iwasaki', method: 'TKO R3', event: 'DWCS' },
      { result: 'W', opponent: 'Giorgi Kvelidze', method: 'TKO R1', event: 'LFL' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Wrestling vs Kickboxing: O Choque de Estilos',
      tagline_sub: 'O prospect invicto enfrenta o ex-rival de Pereira e Adesanya na mais pura guerra de estilos',
      fighter1: {
        ...sharedHeroFighters.fighter1,
        ranking: 'N/R Peso Medio',
        info_extra: 'Columbia, Maryland | 28 anos',
      },
      fighter2: {
        ...sharedHeroFighters.fighter2,
        ranking: 'N/R Peso Medio',
        info_extra: 'Amsterdam, Holanda | 33 anos',
      },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Wrestler Invicto vs O Striker de Elite</h3>
        <p>Essa luta e sobre uma pergunta que nunca fica velha no MMA: o que acontece quando um wrestler de alto nivel enfrenta um striker de classe mundial? <strong class="text-ufc-red">Abdul-Malik</strong> traz credenciais legitimas de wrestling Division I pela Universidade de Maryland, onde competiu no peso-pesado. Desde que estreou no UFC, em novembro de 2024, nocauteou Dusko Todorovic no primeiro round, parou Nick Klein no segundo, sobreviveu a uma controversia contra Cody Brundage (empate majoritario apos revisao da comissao da Georgia), e finalizou Antonio Trocoli com uma guilhotina em pe em apenas 69 segundos.</p>
        <p>Do outro lado, <strong class="text-blue-400">Belgaroui</strong> representa algo raro no MMA moderno: um kickboxer de elite do circuito Glory que ja enfrentou os melhores do mundo. Estamos falando de um cara que VENCEU Alex Pereira por decisao unanime em 2017, perdeu duas vezes para Pereira pelo titulo, e enfrentou Israel Adesanya duas vezes no kickboxing. Aos 33 anos, com 1,98m de altura, Belgaroui finalmente chegou ao UFC em outubro de 2025 e parou Azamat Bekoev no terceiro round com um TKO convincente.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Conexao com Pereira e o Timing Perfeito</h3>
        <p>Hoje, Belgaroui treina ao lado de Alex Pereira na Teixeira MMA & Fitness, em Connecticut, sob a supervisao de Glover Teixeira. A ironia? Essa luta acontece no mesmo card em que Adesanya, outro ex-adversario de Belgaroui no kickboxing, faz a luta principal. O holandes ja enfrentou tanto Adesanya quanto Pereira, e agora busca construir seu proprio legado no MMA.</p>
        <p>Para <strong class="text-ufc-red">Abdul-Malik</strong>, esse e o teste mais perigoso da carreira. Belgaroui e o oponente mais alto, mais experiente em combate de alto nivel, e com o striking mais refinado que ele ja enfrentou. Para <strong class="text-blue-400">Belgaroui</strong>, a questao e clara: pode o striking de elite sobreviver ao wrestling de elite? Ou o jovem prospect vai arrastar o veterano para o chao e tirar todas as suas armas?</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Primeiro passo para o top 15', fighter2: 'Vitoria sobre invicto = credibilidade instantanea' },
        { dimensao: 'Objetivo', fighter1: 'Manter o 0 no cartel', fighter2: 'Provar que pertence ao UFC' },
        { dimensao: 'Narrativa', fighter1: 'Prospect mais perigoso do peso medio', fighter2: 'Veterano do kickboxing conquista o MMA' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota contra striker de elite', fighter2: 'Ser dominado no wrestling na segunda luta do UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O PROSPECT CONFIRMA O HYPE',
          subtitulo: 'Abdul-Malik passa no teste de striking e prova que e para valer',
          consequencias: [
            { tag: 'CARTEL', texto: 'Mantem o invicto e sobe para 10-0-1, consolidando-se como um dos nomes mais quentes do peso medio.' },
            { tag: 'RANKING', texto: 'Com 5 vitorias consecutivas (4 no UFC), entra na conversa para um top 15 ainda em 2026.' },
            { tag: 'NARRATIVA', texto: 'Prova versatilidade ao vencer um striker de classe mundial, silenciando duvidas sobre sua trocacao.' },
          ],
          proxima_luta: 'Adversario ranqueado no top 15, possivelmente alguem como Brendan Allen ou Nassourdine Imavov.',
        },
        fighter2_vence: {
          titulo: 'O BABY FACE ASSASSIN CHEGA PARA FICAR',
          subtitulo: 'Belgaroui prova que o kickboxing de elite traduz para o MMA',
          consequencias: [
            { tag: 'CREDIBILIDADE', texto: 'Vencer um invicto com pedigree de wrestling em apenas sua segunda luta no UFC e um statement enorme.' },
            { tag: 'SEQUENCIA', texto: 'Emenda a quinta vitoria consecutiva e ganha momento para lutas maiores no peso medio.' },
            { tag: 'HISTORIA', texto: 'Ex-rival de Pereira e Adesanya no kickboxing comecando a escrever seu proprio capitulo no MMA.' },
          ],
          proxima_luta: 'Oponente de medio escalao ranqueado, possivelmente alguem como Michel Pereira ou Roman Dolidze.',
        },
      },
    },
    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1 (guilhotina em pe, 1:09)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Trocoli era 0-2 no UFC. Abdul-Malik mostrou versatilidade ao finalizar com guilhotina em pe apos tentativa de takedown.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Draw Majoritario (revisado pela comissao)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Originalmente venceu por decisao unanime, mas choque de cabecas no R3 levou a revisao e empate majoritario pela comissao da Georgia.' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2 (socos, 3:24)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Klein aceitou a luta como substituto de curto prazo. Abdul-Malik teve um primeiro round complicado, mas se recuperou e finalizou no segundo.' },
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (socos, 2:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC com Performance of the Night. Dominou Todorovic com pressao e poder, finalizando no primeiro round.' },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC. Performance of the Night.' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Klein era substituto de curto prazo.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Draw Majoritario', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Resultado controverso apos revisao.' },
          { date: 'Dez 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina em pe em 69 segundos.' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Abdul-Malik esta em uma trajetoria clara de ascensao. Tres finalizacoes em quatro lutas no UFC, incluindo uma submissao impressionante contra Trocoli. O empate contra Brundage e o unico ponto de interrogacao, mas o contexto (choque de cabecas acidental) explica o resultado. A finalizacao rapida contra Trocoli em dezembro mostra que esta afiado e pronto para um salto de qualidade nos adversarios.',
      },
      fighter2: {
        nome: 'Yousri Belgaroui',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3 (socos, 0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC em Vancouver. Trabalhou com jab longo, absorveu 4 takedowns mas nunca ficou preso no chao, e parou Bekoev no terceiro round.' },
          { date: 'Set 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Contender Series. Vitoria por TKO no terceiro round, garantindo contrato com o UFC.' },
          { date: 'Out 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Levels Fight League. Nocaute rapido no primeiro round contra adversario regional.' },
          { date: 'Ago 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Contender Series. Perdeu por decisao, nao conseguiu contrato com o UFC na primeira tentativa.' },
        ],
        full_fight_history: [
          { date: '2021', opponent: 'Badreddine Diani', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no MMA. UAE Warriors.' },
          { date: '2021', opponent: 'Sallah-Eddine Dekhissi', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UAE Warriors.' },
          { date: 'Mar 2022', opponent: 'Samir Zaidi', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UAE Warriors.' },
          { date: 'Jul 2022', opponent: 'Mohamad Osseili', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira derrota no MMA. UAE Warriors.' },
          { date: 'Fev 2023', opponent: 'Bogdan Kotlovyanov', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Levels Fight League.' },
          { date: 'Fev 2023', opponent: 'Stefan Pretorius', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UAE Warriors.' },
          { date: 'Ago 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'DWCS. Nao ganhou contrato.' },
          { date: 'Out 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'LFL.' },
          { date: 'Set 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS. Ganhou contrato com UFC.' },
          { date: 'Out 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC. TKO no terceiro round.' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Belgaroui esta em uma sequencia de quatro vitorias consecutivas, a melhor da carreira no MMA. Seu background no kickboxing profissional de alto nivel (27-7 no Glory, com lutas contra Pereira e Adesanya) da a ele uma experiencia de combate que os numeros do MMA nao capturam. A estreia no UFC foi solida, mostrando paciencia e tecnica de striker de elite. O que falta e experiencia contra wrestlers de alto nivel no MMA.',
      },
    },
    nivel_competicao: {
      fighter1: {
        nome: 'Abdul-Malik',
        media_oponentes: 1.5,
        media_oponentes_label: 'Ruim',
        aproveitamento: '3W-0L-1D (87%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Belgaroui',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nao ha oponentes em comum entre os dois lutadores. Ambos estao no inicio de suas carreiras no UFC com poucos dados comparativos diretos. Abdul-Malik enfrentou oponentes sem ranking em todas as suas lutas, assim como Belgaroui na sua unica luta no UFC. A diferenca real esta no background: Abdul-Malik vem do wrestling Division I, enquanto Belgaroui traz uma carreira inteira no kickboxing profissional de alto nivel contra nomes como Alex Pereira e Israel Adesanya.',
    },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { ...sharedStats[0], note: 'Abdul-Malik tem volume altissimo. Belgaroui tem apenas 1 luta no UFC para referencia.' },
        { ...sharedStats[1], note: 'Ambos com precisao moderada. Dados de Belgaroui limitados a uma luta.' },
        { ...sharedStats[2], note: 'Abdul-Malik absorve bastante pelo volume alto que produz.' },
        { ...sharedStats[3], note: 'Defesa de strikes de Abdul-Malik e vulneravel. Belgaroui tem background de kickboxer.' },
        { ...sharedStats[4], note: 'Abdul-Malik e wrestler por formacao. Belgaroui nao tentou takedowns no UFC.' },
        { ...sharedStats[5], note: 'Abdul-Malik tem ferramentas de wrestling. Belgaroui nao e lutador de takedown.' },
        { ...sharedStats[6], note: 'Belgaroui sofreu 4 takedowns contra Bekoev. Numero preocupante contra um wrestler real.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '28 anos', fighter2: '33 anos', note: 'Abdul-Malik 5 anos mais novo' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,98m (6\'6")', note: 'Belgaroui 10cm mais alto' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '198cm (78")', note: 'Abdul-Malik tem envergadura MAIOR apesar de ser mais baixo' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Xtreme Couture (Las Vegas)', fighter2: 'Teixeira MMA & Fitness (Connecticut)', note: 'Ambos em camps de elite' },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 82, valueB: 25, labelA: 'Muito Bom', labelB: 'Ruim', advantage: 'fighter1', advantage_note: 'Abdul-Malik foi wrestler Division I na University of Maryland. Belgaroui e puramente striker.' },
        { label: 'Striking em Pe', valueA: 60, valueB: 88, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Belgaroui tem carreira profissional no Glory com 27 vitorias. Nivel tecnico muito superior na trocacao.' },
        { label: 'Defesa de Takedown', valueA: 75, valueB: 45, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Belgaroui sofreu 4 takedowns contra Bekoev. Contra um wrestler de verdade, sera muito pior.' },
        { label: 'Controle no Chao', valueA: 72, valueB: 35, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Base de wrestling da a Abdul-Malik controle superior. Belgaroui ainda esta aprendendo o jogo de chao.' },
        { label: 'Poder de Nocaute', valueA: 78, valueB: 75, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'even', advantage_note: 'Ambos tem poder real. Abdul-Malik com 7 KOs em 9 vitorias. Belgaroui com historico de KOs no kickboxing.' },
        { label: 'Cardio e Ritmo', valueA: 68, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Belgaroui tem experiencia em lutas longas de kickboxing. Abdul-Malik tende a finalizar cedo.' },
      ],
      insight: 'Esse confronto e definido pela dicotomia classica wrestling vs striking. Abdul-Malik tem vantagem enorme no chao e no clinch, enquanto Belgaroui domina amplamente a distancia em pe. A luta sera decidida por quem consegue impor seu jogo: se Abdul-Malik levar ao chao, domina. Se Belgaroui mantiver em pe, tem as ferramentas para vencer.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Abdul-Malik', ...sharedDistribuicaoNumbers.fighter1 },
      fighter2: { nome: 'Belgaroui', ...sharedDistribuicaoNumbers.fighter2 },
      insight: 'Os numeros sao quase espelhados: ambos tem 7 nocautes em 9 vitorias (78%). A diferenca esta no complemento: Abdul-Malik tem 2 submissoes e zero decisoes, provando que SEMPRE finaliza. Belgaroui nunca finalizou por submissao, com suas duas outras vitorias por decisao. Abdul-Malik literalmente nunca precisou dos juizes para vencer. Isso sugere uma luta com alto potencial de finalizacao, ja que nenhum dos dois e lutador de pontos.',
    },
    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 7, danger_label: 'VANTAGEM ABDUL-MALIK', color: 'red', title: 'O Teste do Takedown', description: 'O primeiro round vai definir a luta inteira. Abdul-Malik vai testar o takedown cedo e com forca. Se conseguir levar Belgaroui ao chao nos primeiros dois minutos, pode dominar a luta dali em diante. Belgaroui precisa sobreviver as tentativas iniciais, manter distancia com o jab longo e estabelecer ritmo. A pressao de Abdul-Malik no R1 e historicamente muito forte, com duas de suas vitorias no UFC sendo finalizacoes no primeiro round.' },
        { rounds: 'R2', danger_level: 6, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Adaptacao e Ajustes', description: 'Se a luta chegar ao segundo round, significa que nenhum dos dois conseguiu impor seu jogo de forma dominante. Belgaroui tende a melhorar conforme a luta avanca, como mostrou contra Bekoev, parando o oponente no R3. Abdul-Malik mostrou contra Klein que pode se recuperar de um primeiro round complicado e fechar no segundo. Round crucial de adaptacao.' },
        { rounds: 'R3', danger_level: 7, danger_label: 'VANTAGEM BELGAROUI', color: 'green', title: 'Territorio do Striker', description: 'Se essa luta chegar ao terceiro round, a vantagem muda para Belgaroui. Suas duas ultimas vitorias (Bekoev e Iwasaki) vieram justamente no terceiro round. O cardio de kickboxer e a experiencia em rounds tardios favorecem o holandes. Se Abdul-Malik nao conseguiu o takedown ou a finalizacao nos dois primeiros rounds, provavelmente estara cansado e vulneravel ao striking de elite de Belgaroui.' },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'Brain', title: 'Experiencia em Combate de Alto Nivel', fighter: 'Belgaroui', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Belgaroui enfrentou Alex Pereira tres vezes e Israel Adesanya duas vezes no kickboxing profissional. Essa experiencia contra lutadores de calibre mundial da a ele uma calma sob pressao que poucos estreantes do UFC possuem. Ele ja viu de tudo em termos de strikes.' },
        { icon: 'Shield', title: 'Defesa de Takedown Preocupante', fighter: 'Belgaroui', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Belgaroui sofreu 4 takedowns contra Azamat Bekoev, que nao e considerado um wrestler de alto nivel. Contra Abdul-Malik, um wrestler Division I de verdade, esse numero pode ser muito pior. A defesa de takedown e a maior vulnerabilidade de Belgaroui nessa luta.' },
        { icon: 'TrendingUp', title: 'Curva de Evolucao Rapida', fighter: 'Abdul-Malik', risk_level: 'POSITIVO', risk_color: 'green', description: 'Abdul-Malik mostra evolucao a cada luta. Nocauteou na estreia, parou no segundo round na segunda, e mostrou submissao na quarta luta. A versatilidade crescente e um sinal de um lutador que esta absorvendo tudo no treino e aplicando no octogono.' },
        { icon: 'AlertTriangle', title: 'Defesa de Strikes Vulneravel', fighter: 'Abdul-Malik', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Com apenas 49% de defesa de strikes, Abdul-Malik absorve muitos golpes. Contra um kickboxer de elite como Belgaroui, isso pode ser extremamente perigoso. O holandes tem precisao e poder para capitalizar essa abertura defensiva.' },
        { icon: 'Zap', title: 'Vantagem de Tamanho Extrema', fighter: 'Belgaroui', risk_level: 'POSITIVO', risk_color: 'green', description: 'Com 1,98m de altura, Belgaroui e 10cm mais alto que Abdul-Malik. O jab longo e os chutes de distancia se beneficiam enormemente dessa diferenca. Porem, curiosamente, Abdul-Malik tem envergadura maior (203cm vs 198cm), o que pode neutralizar parte dessa vantagem em distancias medias.' },
        { icon: 'Clock', title: 'Pouca Experiencia no UFC', fighter: 'Belgaroui', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Essa sera apenas a segunda luta de Belgaroui no UFC. Apesar da vasta experiencia no kickboxing, o MMA do UFC e um animal diferente. A pressao, o ritmo, as regras do octogono: tudo e diferente do ringue do Glory.' },
        { icon: 'MapPin', title: 'Terreno Neutro em Seattle', fighter: 'Ambos', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'Seattle e terreno neutro para ambos. Abdul-Malik treina em Las Vegas e e de Maryland, Belgaroui treina em Connecticut e e de Amsterdam. Nenhum tera vantagem de torcida significativa.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 55,
        scenarios: [
          { name: 'Dominacao por Wrestling', probability: 25, method: 'Decisao Unanime ou TKO por ground and pound', description: 'Abdul-Malik pressiona desde o inicio, encosta Belgaroui na grade, completa takedowns repetidos e controla no chao. Com o wrestling superior, pode acumular rounds de controle ou encontrar um TKO por ground and pound.' },
          { name: 'Finalizacao por Submissao', probability: 12, method: 'Sub R1-R2 (guilhotina ou RNC)', description: 'Similar ao que fez contra Trocoli. Se Belgaroui tentar se levantar de um takedown sem cuidado, Abdul-Malik pode encaixar uma guilhotina ou estrangulamento. A transicao do wrestling para submissoes tem sido um ponto de evolucao claro.' },
          { name: 'Nocaute no Clinch', probability: 10, method: 'TKO R1-R2 (socos na curta distancia)', description: 'Abdul-Malik tem poder real nas maos e pode usar o clinch dirty boxing para tirar Belgaroui da distancia confortavel. Na distancia curta, a altura de Belgaroui se torna desvantagem e o poder de Abdul-Malik prevalece.' },
          { name: 'Guerra de Atrito', probability: 8, method: 'Decisao Dividida', description: 'Cenario onde nenhum consegue impor seu jogo claramente. Abdul-Malik mistura takedowns com striking, Belgaroui defende alguns e conecta em pe. Luta apertada decidida nos detalhes.' },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 42,
        scenarios: [
          { name: 'Masterclass de Striking', probability: 18, method: 'Decisao Unanime', description: 'Belgaroui usa o jab longo, front kicks e teeps para manter Abdul-Malik na distancia. Sprawla os takedowns e pontua com combinacoes limpas. Experiencia de kickboxer de elite permite que ele controle a distancia por 15 minutos.' },
          { name: 'Nocaute Tecnico Tardio', probability: 14, method: 'TKO R3 (socos)', description: 'Padrao das ultimas lutas de Belgaroui: paciencia nos primeiros rounds, finalizacao tardia. Se Abdul-Malik gastar energia em takedowns e nao conseguir controlar, Belgaroui pode encontrar o momento para soltar as maos no terceiro round.' },
          { name: 'Counter Devastador', probability: 7, method: 'KO R1-R2', description: 'Abdul-Malik avanca para o takedown com a cabeca baixa e Belgaroui conecta um uppercut ou joelhada no timing perfeito. Risco real para quem entra com tanta pressao contra um counter-striker treinado no Glory.' },
          { name: 'Vitoria nos Detalhes', probability: 3, method: 'Decisao Dividida', description: 'Luta equilibrada onde Belgaroui consegue defender takedowns suficientes e conecta os golpes mais significativos, levando a decisao apertada.' },
        ],
      },
    },
    previsao_final: {
      winner_name: 'Mansur Abdul-Malik',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Abdul-Malik e o favorito porque tem a ferramenta que mais muda o rumo de lutas no MMA: wrestling de alto nivel. A defesa de takedown de Belgaroui foi preocupante contra Bekoev (sofreu 4 takedowns), e Abdul-Malik e um wrestler significativamente melhor. A estrategia mais provavel e Abdul-Malik pressionar, buscar o clinch e os takedowns, e controlar no chao. Porem, Belgaroui tem as ferramentas para criar problemas serios em pe, e a confianca aqui e MEDIA porque esse e o salto de qualidade mais significativo para ambos os lutadores. Qualquer resultado e possivel.',
      x_factor: {
        title: 'O Jab de 1,98m',
        description: 'Belgaroui tem uma das maiores vantagens de altura do peso medio no UFC. Se ele conseguir manter Abdul-Malik na ponta do jab e impedir a entrada para o takedown, a vantagem de wrestling se torna irrelevante. O jab longo contra um lutador que avanca com a cabeca baixa para buscar takedowns pode ser devastador.',
      },
      upset_alert: {
        title: 'Belgaroui TKO R3',
        description: 'Se Abdul-Malik gastar energia nos primeiros rounds tentando takedowns sem sucesso, Belgaroui pode capitalizar no terceiro round com seu padrao tipico de finalizacao tardia. As duas ultimas vitorias de Belgaroui foram por TKO no terceiro round, e a fadiga do wrestling pode abrir a guarda de Abdul-Malik para golpes limpos.',
      },
      probabilities: sharedProbabilities,
      value_picks: {
        moneyline: { pick: 'Abdul-Malik (-120)', reasoning: 'O preco de favorito leve e justo. Wrestling tende a prevalecer nesse tipo de confronto de estilos.' },
        method: { pick: 'Nao vai a decisao', reasoning: 'Ambos tem taxa de finalizacao de 78% por KO/TKO. Alta probabilidade de nocaute ou finalizacao.' },
        over_under: { pick: 'Over 1.5 rounds', rounds: 1.5, reasoning: 'Abdul-Malik pode demorar para encontrar o takedown contra o alcance de Belgaroui. Provavel que passe do primeiro round.' },
        best_value: 'Over 1.5 rounds e a aposta mais segura. Ambos sao finalizadores, mas Belgaroui tem experiencia para sobreviver ao primeiro round.',
      },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 2 Minutos Definem Tudo', icon: 'Clock', description: 'Se Abdul-Malik conseguir o primeiro takedown nos primeiros 2 minutos, isso vai ditar o ritmo da luta inteira. Se Belgaroui sprawlar e manter em pe, a confianca do holandes vai crescer a cada segundo. Preste atencao na primeira tentativa de takedown: se for bem sucedida, espere dominacao. Se falhar, espere problemas para Abdul-Malik.' },
        { num: 2, title: 'O Jab de Belgaroui como Arma Principal', icon: 'Target', description: 'Com 1,98m e background de kickboxing profissional, Belgaroui tem um dos jabs mais longos da divisao. Observe se ele consegue manter Abdul-Malik na ponta desse jab. Se o americano estiver tomando jabs limpos e nao conseguindo fechar distancia, e sinal de que Belgaroui esta controlando a luta.' },
        { num: 3, title: 'Reacao de Belgaroui ao Primeiro Takedown', icon: 'Shield', description: 'Contra Bekoev, Belgaroui sofreu 4 takedowns mas se levantou relativamente rapido. Contra um wrestler Division I como Abdul-Malik, levantar vai ser muito mais dificil. Observe COMO Belgaroui reage ao primeiro takedown: se conseguir se levantar em menos de 30 segundos, e um boa sinal. Se ficar preso por mais de um minuto, a luta pode estar definida.' },
        { num: 4, title: 'Fadiga de Wrestling no R3', icon: 'Activity', description: 'Se a luta chegar ao terceiro round, observe o nivel de energia de Abdul-Malik. Wrestlling ofensivo gasta muita energia, e se ele tentou multiplos takedowns nos dois primeiros rounds, pode estar vulneravel. As duas ultimas vitorias de Belgaroui vieram justamente no R3, entao o terceiro round e o momento de maior perigo para Abdul-Malik.' },
        { num: 5, title: 'O Fator Pereira/Teixeira no Corner', icon: 'Brain', description: 'Belgaroui treina diariamente com Alex Pereira e Glover Teixeira. Isso significa que ele provavelmente praticou defesa de takedown contra wrestlers de alto nivel no camp. Observe se os ajustes de corner entre rounds refletem uma preparacao especifica contra wrestling, com sprawls e trabalho de grade.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'WRESTLER vs KICKBOXER', content: 'Abdul-Malik (9-0-1) vs Belgaroui (9-3)\n\nO prospect invicto do wrestling\ncontra o ex-rival de Pereira no Glory\n\nUFC Seattle | 28 de Marco', color: 'gold' },
        { slide_number: 2, title: 'ABDUL-MALIK', content: '7 nocautes em 9 vitorias (78%)\nWrestler Division I (Maryland)\n3 finalizacoes em 4 lutas no UFC\nGuilhotina em pe em 69 segundos\n\nTreina na Xtreme Couture', color: 'red' },
        { slide_number: 3, title: 'BELGAROUI', content: '27-7 no kickboxing profissional (Glory)\nJa VENCEU Alex Pereira\nJa enfrentou Israel Adesanya 2x\n1,98m de altura\n\nTreina com Pereira na Teixeira MMA', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE DA LUTA', content: 'Se Abdul-Malik levar ao chao = domina\nSe Belgaroui mantiver em pe = perigo\n\nBelgaroui sofreu 4 TDs na estreia\nContra um wrestler de verdade...\n\nPrevisao: Abdul-Malik (55%)', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Abdul-Malik vs Belgaroui e o choque de estilos mais puro do card de Seattle. Um wrestler invicto contra o cara que JA VENCEU Alex Pereira no kickboxing. Thread rapida:' },
        { num: '2/5', text: 'Abdul-Malik: 9-0-1, ZERO decisoes. Esse cara SEMPRE finaliza. 7 KOs + 2 subs. Wrestler Division I pela Maryland que nocauteia no MMA. Guilhotina em pe de 69 segundos na ultima luta. O hype e real.' },
        { num: '3/5', text: 'Belgaroui: 1,98m, 27-7 no Glory, treina com Pereira e Glover Teixeira. Mas... sofreu 4 takedowns contra Bekoev na estreia. Contra um wrestler Division I, esse numero pode ser o dobro.' },
        { num: '4/5', text: 'O X-Factor: o jab de 1,98m. Se Belgaroui conseguir manter Abdul-Malik na distancia com aquele jab de kickboxer de elite, pode frustrar o wrestling inteiro. Se nao conseguir, vai pro chao e e noite longa.' },
        { num: '5/5', text: 'Minha previsao: Abdul-Malik por decisao ou TKO tardio (55/42). O wrestling vai ser dificil de negar. Mas se chegar ao R3 com Belgaroui em pe, cuidado. As duas ultimas vitorias do holandes foram TKO no R3.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Voces conhecem o cara que VENCEU Alex Pereira no kickboxing? Pois e, ele agora luta no UFC, e nesse sabado enfrenta um wrestler invicto que nunca precisou dos juizes pra vencer.' },
        { time: '10-25s', title: 'Contexto', text: 'Abdul-Malik tem 9-0-1 com 7 nocautes e 2 finalizacoes. Zero decisoes. E wrestler Division I. Do outro lado, Belgaroui e um kickboxer do Glory com 27 vitorias, que ja lutou contra Pereira E Adesanya. E hoje treina com os dois.' },
        { time: '25-45s', title: 'Analise', text: 'A chave e simples: se Abdul-Malik levar ao chao, domina. Se Belgaroui manter em pe, perigo. O problema? Belgaroui sofreu 4 takedowns na estreia contra Bekoev, que nao e wrestler de verdade. Contra Abdul-Malik, um wrestler Division I treinando na Xtreme Couture... a matematica nao e boa pro holandes.' },
        { time: '45-60s', title: 'Previsao e CTA', text: 'Minha previsao: Abdul-Malik por decisao ou TKO tardio, 55 a 42. Mas cuidado com o R3, que e onde Belgaroui acorda. Quem voces tem nessa? Comenta ai!' },
      ],
      tiktok: [
        { hook: 'O cara que VENCEU Pereira no kickboxing ta no UFC agora.', body: 'Belgaroui venceu Pereira em 2017 e enfrentou Adesanya duas vezes. Agora enfrenta um wrestler invicto que NUNCA foi pra decisao. Abdul-Malik tem 7 KOs em 9 lutas e um wrestling Division I assassino.', cta: 'Quem vence: o striker de elite ou o wrestler invicto? Comenta!' },
        { hook: '69 segundos. Esse foi o tempo da ultima luta de Abdul-Malik.', body: 'Guilhotina em pe no primeiro round. Antes disso, TKO R1 na estreia, TKO R2 na segunda. Esse cara e uma maquina de finalizacao. Agora enfrenta um kickboxer do Glory de 1,98m que treina com Pereira.', cta: 'Abdul-Malik mantem o invicto ou Belgaroui surpreende?' },
        { hook: '1,98m. Esse e o tamanho do cara que Abdul-Malik vai enfrentar.', body: 'Belgaroui e gigante pro peso medio, tem experiencia no Glory contra os melhores do mundo, e treina com Pereira e Glover. Mas sofreu 4 takedowns na estreia. Contra um wrestler Division I? Boa sorte.', cta: 'Tamanho ou wrestling? Qual prevalece no MMA? Comenta!' },
      ],
      headlines: [
        'Abdul-Malik vs Belgaroui: O Invicto Contra o Assassino de Kickboxers',
        'Ex-rival de Pereira enfrenta maior teste no UFC contra wrestler Division I',
        'Abdul-Malik busca manter invicto contra gigante do Glory em Seattle',
        'O cara que venceu Pereira no kickboxing pode sobreviver ao wrestling de elite?',
        'Choque de estilos puro: wrestling Division I vs kickboxing Glory no UFC Seattle',
        'Belgaroui, o parceiro de treino de Pereira, enfrenta a prova de fogo contra wrestler invicto',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...sharedOdds, source: 'Media de casas de apostas (marco 2026)' },
      edges: [
        { icon: 'Target', titulo: 'Wrestling como Diferencial', stat_headline: 'ABDUL-MALIK: WRESTLER DIVISION I COM 82% DE DEFESA DE TAKEDOWN', contexto: 'Abdul-Malik traz pedigree de wrestling Division I pela University of Maryland. Sua capacidade de levar a luta ao chao e controlar ali e vastamente superior a qualquer oponente que Belgaroui ja enfrentou no MMA.', implicacao_aposta: 'Favorece Abdul-Malik por decisao ou TKO por ground and pound.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Takedown de Belgaroui', stat_headline: 'BELGAROUI SOFREU 4 TAKEDOWNS CONTRA BEKOEV NA ESTREIA', contexto: 'Bekoev nao e considerado um wrestler de alto nivel. Se Belgaroui sofreu 4 takedowns contra ele, os numeros contra um wrestler Division I podem ser muito piores.', implicacao_aposta: 'Reforco para a tese de Abdul-Malik dominando no chao. Reduz a confianca em Belgaroui por moneyline.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Background de Kickboxing de Elite', stat_headline: '27-7 NO GLORY COM VITORIA SOBRE ALEX PEREIRA', contexto: 'Belgaroui tem experiencia de alto nivel contra os melhores strikers do mundo. A calma e a tecnica em pe sao de nivel incomparavel para essa etapa de carreira no UFC.', implicacao_aposta: 'Se a luta ficar em pe, Belgaroui tem vantagem tecnica significativa. Props de KO do Belgaroui podem ter valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Padrao de Finalizacao Tardia de Belgaroui', stat_headline: 'ULTIMAS 2 VITORIAS POR TKO NO ROUND 3', contexto: 'Tanto contra Bekoev quanto contra Iwasaki, Belgaroui finalizou no terceiro round. Isso sugere que ele e um lutador de ritmo lento que melhora conforme a luta avanca.', implicacao_aposta: 'Props de Belgaroui por TKO R3 podem ter valor como aposta de risco.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Flame', titulo: 'Taxa de Finalizacao Combinada', stat_headline: 'AMBOS TEM 78% DE VITORIAS POR KO/TKO', contexto: 'Abdul-Malik nunca foi a decisao. Belgaroui finaliza com frequencia. Ambos sao lutadores que buscam finalizar, nao pontuar.', implicacao_aposta: 'Luta com grande chance de nao ir a decisao. O mercado de "nao vai a distancia" pode ter valor.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Duracao', pick: 'Luta nao vai a decisao', odds: '-130 (estimado)', confianca: 'alta', edge_vs_mercado: 'Ambos finalizam em 78% das lutas. Abdul-Malik NUNCA foi a decisao.', raciocinio: 'Com Abdul-Malik tendo zero decisoes em 9 vitorias e Belgaroui finalizando na maioria das lutas, a probabilidade de finalizacao e muito alta. A combinacao de wrestling agressivo com striking de elite quase sempre produz uma finalizacao.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-160 (estimado)', confianca: 'media', edge_vs_mercado: 'Belgaroui sobreviveu 3 rounds contra Bekoev. Abdul-Malik levou 2 rounds para parar Klein.', raciocinio: 'Apesar de ambos serem finalizadores, Belgaroui tem experiencia suficiente para sobreviver ao primeiro round. O alcance e a defesa basica devem mante-lo em pe pelo menos ate o segundo round.' },
        { tipo: 'Moneyline', pick: 'Abdul-Malik (-120)', odds: '-120', confianca: 'media', edge_vs_mercado: 'Preco justo para favorito com vantagem de wrestling significativa.', raciocinio: 'O wrestling de Abdul-Malik e a vantagem mais tangivel da luta. A defesa de takedown fraca de Belgaroui combinada com o wrestling Division I do americano torna o preco de -120 acessivel e justo.' },
      ],
      armadilha: { titulo: 'Armadilha: Belgaroui por KO no R1', descricao: 'Apesar do background impressionante de kickboxing, Belgaroui nunca nocauteou ninguem no primeiro round no MMA em nivel UFC. Suas finalizacoes sao tardias (R3). Apostar em um KO rapido do holandes e ir contra o padrao das suas lutas. O mais provavel e que Abdul-Malik teste o takedown cedo e Belgaroui precise de tempo para se adaptar.' },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade e dentro dos seus limites financeiros.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// EN — English
// ═══════════════════════════════════════════════════════════════

const analiseEN: FullSingleAnalise = {
  ...sharedMeta,
  titulo: 'Abdul-Malik vs Belgaroui: The Undefeated vs The Kickboxing Assassin',
  subtitulo: 'Undefeated wrestling prospect faces former Pereira and Adesanya kickboxing rival',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: 'March 28, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Middleweight (185 lbs)',
  num_rounds: 3,
  tactical_breakdown: sharedTacticalBreakdown,
  fight_prediction: {
    ...sharedFightPrediction,
    predictedMethod: 'TKO or Decision',
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Mansur Abdul-Malik',
    record: '9-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Antonio Trocoli', method: 'Sub R1 (guillotine)', event: 'UFC 323' },
      { result: 'D', opponent: 'Cody Brundage', method: 'Majority Draw', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Nick Klein', method: 'TKO R2', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Dusko Todorovic', method: 'TKO R1', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Yousri Belgaroui',
    apelido: 'Baby Face Assassin',
    record: '9-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Azamat Bekoev', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Taiga Iwasaki', method: 'TKO R3', event: 'DWCS' },
      { result: 'W', opponent: 'Giorgi Kvelidze', method: 'TKO R1', event: 'LFL' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: 'March 28, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Middleweight (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Wrestling vs Kickboxing: The Ultimate Style Clash',
      tagline_sub: 'The undefeated prospect faces Pereira and Adesanya\'s former kickboxing rival in the purest style war',
      fighter1: {
        ...sharedHeroFighters.fighter1,
        ranking: 'N/R Middleweight',
        info_extra: 'Columbia, Maryland | 28 years old',
      },
      fighter2: {
        ...sharedHeroFighters.fighter2,
        ranking: 'N/R Middleweight',
        info_extra: 'Amsterdam, Netherlands | 33 years old',
      },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">The Undefeated Wrestler vs The Elite Striker</h3>
        <p>This fight is about a question that never gets old in MMA: what happens when a high-level wrestler faces a world-class striker? <strong class="text-ufc-red">Abdul-Malik</strong> brings legitimate Division I wrestling credentials from the University of Maryland, where he competed at heavyweight. Since his UFC debut in November 2024, he knocked out Dusko Todorovic in the first round, stopped Nick Klein in the second, survived a controversy against Cody Brundage (majority draw after review by the Georgia commission), and submitted Antonio Trocoli with a standing guillotine in just 69 seconds.</p>
        <p>On the other side, <strong class="text-blue-400">Belgaroui</strong> represents something rare in modern MMA: an elite kickboxer from the Glory circuit who has faced the best in the world. We are talking about a man who BEAT Alex Pereira by unanimous decision in 2017, lost twice to Pereira for the title, and faced Israel Adesanya twice in kickboxing. At 33 years old, standing 6'6", Belgaroui finally arrived in the UFC in October 2025 and stopped Azamat Bekoev in the third round with a convincing TKO.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Pereira Connection and Perfect Timing</h3>
        <p>Today, Belgaroui trains alongside Alex Pereira at Teixeira MMA & Fitness in Connecticut, under the guidance of Glover Teixeira. The irony? This fight takes place on the same card where Adesanya, another former kickboxing rival of Belgaroui, headlines. The Dutchman has faced both Adesanya and Pereira, and now seeks to build his own legacy in MMA.</p>
        <p>For <strong class="text-ufc-red">Abdul-Malik</strong>, this is the most dangerous test of his career. Belgaroui is the tallest, most experienced in high-level combat, and most technically refined striker he has ever faced. For <strong class="text-blue-400">Belgaroui</strong>, the question is clear: can elite striking survive elite wrestling? Or will the young prospect drag the veteran to the ground and strip away all his weapons?</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'First step toward the top 15', fighter2: 'Win over an undefeated fighter = instant credibility' },
        { dimensao: 'Goal', fighter1: 'Keep the 0 on the record', fighter2: 'Prove he belongs in the UFC' },
        { dimensao: 'Narrative', fighter1: 'Most dangerous middleweight prospect', fighter2: 'Kickboxing veteran conquers MMA' },
        { dimensao: 'Risk', fighter1: 'First loss against an elite striker', fighter2: 'Getting wrestle-dominated in his second UFC fight' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'THE PROSPECT CONFIRMS THE HYPE',
          subtitulo: 'Abdul-Malik passes the striking test and proves he is for real',
          consequencias: [
            { tag: 'RECORD', texto: 'Keeps the undefeated streak and moves to 10-0-1, cementing himself as one of the hottest names at middleweight.' },
            { tag: 'RANKING', texto: 'With 5 consecutive wins (4 in the UFC), he enters the conversation for a top 15 spot in 2026.' },
            { tag: 'NARRATIVE', texto: 'Proves versatility by beating a world-class striker, silencing doubts about his stand-up game.' },
          ],
          proxima_luta: 'A ranked top 15 opponent, possibly someone like Brendan Allen or Nassourdine Imavov.',
        },
        fighter2_vence: {
          titulo: 'THE BABY FACE ASSASSIN IS HERE TO STAY',
          subtitulo: 'Belgaroui proves that elite kickboxing translates to MMA',
          consequencias: [
            { tag: 'CREDIBILITY', texto: 'Beating an undefeated fighter with wrestling pedigree in just his second UFC fight is a massive statement.' },
            { tag: 'STREAK', texto: 'Extends his winning streak to five and builds momentum for bigger middleweight fights.' },
            { tag: 'LEGACY', texto: 'Former kickboxing rival of Pereira and Adesanya begins writing his own chapter in MMA.' },
          ],
          proxima_luta: 'A mid-tier ranked opponent, possibly someone like Michel Pereira or Roman Dolidze.',
        },
      },
    },
    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          { date: 'Dec 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1 (standing guillotine, 1:09)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Trocoli was 0-2 in the UFC. Abdul-Malik showed versatility by finishing with a standing guillotine after a takedown attempt.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Majority Draw (revised by commission)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Originally won by unanimous decision, but a clash of heads in R3 led to a review and majority draw by the Georgia commission.' },
          { date: 'Feb 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2 (punches, 3:24)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Klein accepted the fight as a short-notice replacement. Abdul-Malik had a rough first round but recovered and finished in the second.' },
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (punches, 2:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut with Performance of the Night. Dominated Todorovic with pressure and power, finishing in the first round.' },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut. Performance of the Night.' },
          { date: 'Feb 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Klein was a short-notice replacement.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Majority Draw', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Controversial result after review.' },
          { date: 'Dec 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Standing guillotine in 69 seconds.' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'On the Rise',
        momentum_trend: 'ascending',
        momentum_note: 'Abdul-Malik is on a clear upward trajectory. Three finishes in four UFC fights, including an impressive submission against Trocoli. The draw against Brundage is the only question mark, but the context (accidental clash of heads) explains the result. The quick finish against Trocoli in December shows he is sharp and ready for a significant step up in opposition.',
      },
      fighter2: {
        nome: 'Yousri Belgaroui',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3 (punches, 0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut in Vancouver. Worked behind the long jab, absorbed 4 takedowns but never stayed down, and stopped Bekoev in the third round.' },
          { date: 'Sep 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Contender Series. TKO victory in the third round, earning a UFC contract.' },
          { date: 'Oct 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Levels Fight League. Quick first-round knockout against a regional opponent.' },
          { date: 'Aug 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Contender Series. Lost by decision, did not earn a UFC contract on the first attempt.' },
        ],
        full_fight_history: [
          { date: '2021', opponent: 'Badreddine Diani', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'MMA debut. UAE Warriors.' },
          { date: '2021', opponent: 'Sallah-Eddine Dekhissi', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UAE Warriors.' },
          { date: 'Mar 2022', opponent: 'Samir Zaidi', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UAE Warriors.' },
          { date: 'Jul 2022', opponent: 'Mohamad Osseili', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First MMA loss. UAE Warriors.' },
          { date: 'Feb 2023', opponent: 'Bogdan Kotlovyanov', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Levels Fight League.' },
          { date: 'Feb 2023', opponent: 'Stefan Pretorius', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UAE Warriors.' },
          { date: 'Aug 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'DWCS. Did not earn contract.' },
          { date: 'Oct 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'LFL.' },
          { date: 'Sep 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'DWCS. Earned UFC contract.' },
          { date: 'Oct 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut. TKO in the third round.' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'On the Rise',
        momentum_trend: 'ascending',
        momentum_note: 'Belgaroui is on a four-fight winning streak, the best of his MMA career. His background in high-level professional kickboxing (27-7 in Glory, with fights against Pereira and Adesanya) gives him combat experience that MMA numbers do not capture. His UFC debut was solid, showing patience and elite striker technique. What he lacks is experience against high-level wrestlers in MMA.',
      },
    },
    nivel_competicao: {
      fighter1: {
        nome: 'Abdul-Malik',
        media_oponentes: 1.5,
        media_oponentes_label: 'Poor',
        aproveitamento: '3W-0L-1D (87%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Belgaroui',
        media_oponentes: 1,
        media_oponentes_label: 'Poor',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'There are no common opponents between the two fighters. Both are in the early stages of their UFC careers with limited direct comparative data. Abdul-Malik has faced unranked opponents in all his fights, as has Belgaroui in his only UFC bout. The real difference lies in their backgrounds: Abdul-Malik comes from Division I wrestling, while Belgaroui brings an entire career in high-level professional kickboxing against names like Alex Pereira and Israel Adesanya.',
    },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { ...sharedStats[0], note: 'Abdul-Malik has extremely high volume. Belgaroui has only 1 UFC fight for reference.' },
        { ...sharedStats[1], note: 'Both with moderate accuracy. Belgaroui data limited to one fight.' },
        { ...sharedStats[2], note: 'Abdul-Malik absorbs a lot due to his high output volume.' },
        { ...sharedStats[3], note: 'Abdul-Malik\'s strike defense is vulnerable. Belgaroui has a kickboxing background.' },
        { ...sharedStats[4], note: 'Abdul-Malik is a wrestler by training. Belgaroui did not attempt takedowns in the UFC.' },
        { ...sharedStats[5], note: 'Abdul-Malik has wrestling tools. Belgaroui is not a takedown fighter.' },
        { ...sharedStats[6], note: 'Belgaroui absorbed 4 takedowns against Bekoev. Concerning number against a real wrestler.' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '28 years', fighter2: '33 years', note: 'Abdul-Malik 5 years younger' },
        { label: 'Height', fighter1: '6\'2" (1.88m)', fighter2: '6\'6" (1.98m)', note: 'Belgaroui 4 inches taller' },
        { label: 'Reach', fighter1: '80" (203cm)', fighter2: '78" (198cm)', note: 'Abdul-Malik has LONGER reach despite being shorter' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
        { label: 'Gym', fighter1: 'Xtreme Couture (Las Vegas)', fighter2: 'Teixeira MMA & Fitness (Connecticut)', note: 'Both at elite camps' },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Offensive Wrestling', valueA: 82, valueB: 25, labelA: 'Very Good', labelB: 'Poor', advantage: 'fighter1', advantage_note: 'Abdul-Malik was a Division I wrestler at the University of Maryland. Belgaroui is purely a striker.' },
        { label: 'Stand-up Striking', valueA: 60, valueB: 88, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Belgaroui has a professional Glory career with 27 wins. Far superior technical level on the feet.' },
        { label: 'Takedown Defense', valueA: 75, valueB: 45, labelA: 'Very Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Belgaroui absorbed 4 takedowns against Bekoev. Against a real wrestler, it will be much worse.' },
        { label: 'Ground Control', valueA: 72, valueB: 35, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Wrestling base gives Abdul-Malik superior control. Belgaroui is still learning the ground game.' },
        { label: 'Knockout Power', valueA: 78, valueB: 75, labelA: 'Very Good', labelB: 'Very Good', advantage: 'even', advantage_note: 'Both have real power. Abdul-Malik with 7 KOs in 9 wins. Belgaroui with a KO track record in kickboxing.' },
        { label: 'Cardio & Pace', valueA: 68, valueB: 72, labelA: 'Good', labelB: 'Good', advantage: 'even', advantage_note: 'Belgaroui has experience in long kickboxing fights. Abdul-Malik tends to finish early.' },
      ],
      insight: 'This matchup is defined by the classic wrestling vs striking dichotomy. Abdul-Malik has a massive advantage on the ground and in the clinch, while Belgaroui dominates at range on the feet. The fight will be decided by who can impose their game: if Abdul-Malik takes it to the ground, he dominates. If Belgaroui keeps it standing, he has the tools to win.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Abdul-Malik', ...sharedDistribuicaoNumbers.fighter1 },
      fighter2: { nome: 'Belgaroui', ...sharedDistribuicaoNumbers.fighter2 },
      insight: 'The numbers are nearly mirrored: both have 7 knockouts in 9 wins (78%). The difference is in the complement: Abdul-Malik has 2 submissions and zero decisions, proving he ALWAYS finishes. Belgaroui has never submitted anyone, with his other two wins by decision. Abdul-Malik has literally never needed the judges to win. This suggests a fight with high finish potential, since neither is a points fighter.',
    },
    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 7, danger_label: 'ABDUL-MALIK ADVANTAGE', color: 'red', title: 'The Takedown Test', description: 'The first round will define the entire fight. Abdul-Malik will test the takedown early and hard. If he can take Belgaroui down in the first two minutes, he can dominate from there. Belgaroui needs to survive the initial attempts, maintain distance with the long jab, and establish rhythm. Abdul-Malik\'s R1 pressure is historically very strong, with two of his UFC wins being first-round finishes.' },
        { rounds: 'R2', danger_level: 6, danger_label: 'BALANCED', color: 'gold', title: 'Adaptation & Adjustments', description: 'If the fight reaches the second round, it means neither fighter has imposed their game dominantly. Belgaroui tends to improve as the fight progresses, as he showed against Bekoev, stopping his opponent in R3. Abdul-Malik showed against Klein that he can recover from a rough first round and close in the second. A crucial round of adaptation.' },
        { rounds: 'R3', danger_level: 7, danger_label: 'BELGAROUI ADVANTAGE', color: 'green', title: 'The Striker\'s Territory', description: 'If this fight reaches the third round, the advantage shifts to Belgaroui. His last two wins (Bekoev and Iwasaki) came in the third round. The kickboxer\'s cardio and experience in late rounds favor the Dutchman. If Abdul-Malik could not secure the takedown or finish in the first two rounds, he will likely be tired and vulnerable to Belgaroui\'s elite striking.' },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'Brain', title: 'High-Level Combat Experience', fighter: 'Belgaroui', risk_level: 'MASSIVE POSITIVE', risk_color: 'green', description: 'Belgaroui has faced Alex Pereira three times and Israel Adesanya twice in professional kickboxing. This experience against world-caliber fighters gives him a composure under pressure that few UFC newcomers possess. He has seen it all in terms of striking.' },
        { icon: 'Shield', title: 'Concerning Takedown Defense', fighter: 'Belgaroui', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Belgaroui absorbed 4 takedowns against Azamat Bekoev, who is not considered a high-level wrestler. Against Abdul-Malik, a real Division I wrestler, that number could be much worse. Takedown defense is Belgaroui\'s biggest vulnerability in this fight.' },
        { icon: 'TrendingUp', title: 'Rapid Evolution Curve', fighter: 'Abdul-Malik', risk_level: 'POSITIVE', risk_color: 'green', description: 'Abdul-Malik shows improvement with every fight. He knocked out in his debut, stopped his opponent in round two in his second fight, and showed submission skills in his fourth. The growing versatility is a sign of a fighter absorbing everything in training and applying it in the octagon.' },
        { icon: 'AlertTriangle', title: 'Vulnerable Strike Defense', fighter: 'Abdul-Malik', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'With only 49% strike defense, Abdul-Malik absorbs a lot of strikes. Against an elite kickboxer like Belgaroui, this could be extremely dangerous. The Dutchman has the accuracy and power to capitalize on this defensive opening.' },
        { icon: 'Zap', title: 'Extreme Size Advantage', fighter: 'Belgaroui', risk_level: 'POSITIVE', risk_color: 'green', description: 'At 6\'6", Belgaroui is 4 inches taller than Abdul-Malik. The long jab and distance kicks benefit enormously from this difference. However, interestingly, Abdul-Malik has a longer reach (80" vs 78"), which could neutralize part of this advantage at medium range.' },
        { icon: 'Clock', title: 'Limited UFC Experience', fighter: 'Belgaroui', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'This will be only Belgaroui\'s second UFC fight. Despite vast kickboxing experience, UFC MMA is a different animal. The pressure, the pace, the octagon rules: everything is different from the Glory ring.' },
        { icon: 'MapPin', title: 'Neutral Ground in Seattle', fighter: 'Both', risk_level: 'NEUTRAL', risk_color: 'neutral', description: 'Seattle is neutral ground for both. Abdul-Malik trains in Las Vegas and is from Maryland, Belgaroui trains in Connecticut and is from Amsterdam. Neither will have a significant crowd advantage.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 55,
        scenarios: [
          { name: 'Wrestling Domination', probability: 25, method: 'Unanimous Decision or TKO via ground and pound', description: 'Abdul-Malik pressures from the start, pins Belgaroui against the cage, completes repeated takedowns, and controls on the ground. With superior wrestling, he can accumulate rounds of control or find a TKO via ground and pound.' },
          { name: 'Submission Finish', probability: 12, method: 'Sub R1-R2 (guillotine or RNC)', description: 'Similar to what he did against Trocoli. If Belgaroui tries to get up from a takedown carelessly, Abdul-Malik can lock in a guillotine or choke. The transition from wrestling to submissions has been a clear evolution point.' },
          { name: 'Clinch Knockout', probability: 10, method: 'TKO R1-R2 (close-range punches)', description: 'Abdul-Malik has real power in his hands and can use clinch dirty boxing to take Belgaroui out of his comfortable range. At close range, Belgaroui\'s height becomes a disadvantage and Abdul-Malik\'s power prevails.' },
          { name: 'War of Attrition', probability: 8, method: 'Split Decision', description: 'Scenario where neither can clearly impose their game. Abdul-Malik mixes takedowns with striking, Belgaroui defends some and connects on the feet. A tight fight decided by details.' },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 42,
        scenarios: [
          { name: 'Striking Masterclass', probability: 18, method: 'Unanimous Decision', description: 'Belgaroui uses the long jab, front kicks, and teeps to keep Abdul-Malik at distance. He sprawls takedowns and scores with clean combinations. Elite kickboxing experience allows him to control distance for 15 minutes.' },
          { name: 'Late Technical Knockout', probability: 14, method: 'TKO R3 (punches)', description: 'Pattern from Belgaroui\'s recent fights: patience in early rounds, late finish. If Abdul-Malik burns energy on takedowns without securing control, Belgaroui can find the moment to let his hands go in the third round.' },
          { name: 'Devastating Counter', probability: 7, method: 'KO R1-R2', description: 'Abdul-Malik shoots for the takedown with his head down and Belgaroui lands a perfectly-timed uppercut or knee. Real risk for someone pressing so hard against a Glory-trained counter-striker.' },
          { name: 'Win on Details', probability: 3, method: 'Split Decision', description: 'Balanced fight where Belgaroui defends enough takedowns and lands the more significant strikes, winning a close decision.' },
        ],
      },
    },
    previsao_final: {
      winner_name: 'Mansur Abdul-Malik',
      winner_side: 'fighter1',
      predicted_method: 'Unanimous Decision or late TKO',
      confidence_score: 5,
      confidence_label: 'MEDIUM',
      explanation: 'Abdul-Malik is the favorite because he has the tool that changes fights the most in MMA: high-level wrestling. Belgaroui\'s takedown defense was concerning against Bekoev (absorbed 4 takedowns), and Abdul-Malik is a significantly better wrestler. The most likely strategy is Abdul-Malik pressing, seeking the clinch and takedowns, and controlling on the ground. However, Belgaroui has the tools to create serious problems on the feet, and confidence here is MEDIUM because this is the most significant step up for both fighters. Any outcome is possible.',
      x_factor: {
        title: 'The 6\'6" Jab',
        description: 'Belgaroui has one of the biggest height advantages at middleweight in the UFC. If he can keep Abdul-Malik at the end of his jab and prevent takedown entries, the wrestling advantage becomes irrelevant. The long jab against a fighter who rushes forward with his head down for takedowns can be devastating.',
      },
      upset_alert: {
        title: 'Belgaroui TKO R3',
        description: 'If Abdul-Malik burns energy in the first rounds attempting takedowns unsuccessfully, Belgaroui can capitalize in the third round with his typical late-finish pattern. Belgaroui\'s last two wins were by TKO in the third round, and wrestling fatigue could open Abdul-Malik\'s guard to clean strikes.',
      },
      probabilities: sharedProbabilities,
      value_picks: {
        moneyline: { pick: 'Abdul-Malik (-120)', reasoning: 'The slight favorite price is fair. Wrestling tends to prevail in this type of style clash.' },
        method: { pick: 'Does not go to decision', reasoning: 'Both have a 78% finish rate by KO/TKO. High probability of knockout or finish.' },
        over_under: { pick: 'Over 1.5 rounds', rounds: 1.5, reasoning: 'Abdul-Malik may take time to find the takedown against Belgaroui\'s reach. Likely goes past the first round.' },
        best_value: 'Over 1.5 rounds is the safest bet. Both are finishers, but Belgaroui has the experience to survive the first round.',
      },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'The First 2 Minutes Define Everything', icon: 'Clock', description: 'If Abdul-Malik gets the first takedown within the first 2 minutes, it will dictate the pace of the entire fight. If Belgaroui sprawls and keeps it standing, the Dutchman\'s confidence will grow with every second. Pay attention to the first takedown attempt: if successful, expect domination. If it fails, expect trouble for Abdul-Malik.' },
        { num: 2, title: 'Belgaroui\'s Jab as the Main Weapon', icon: 'Target', description: 'At 6\'6" with a professional kickboxing background, Belgaroui has one of the longest jabs in the division. Watch if he can keep Abdul-Malik at the end of that jab. If the American is eating clean jabs and cannot close distance, it is a sign Belgaroui is controlling the fight.' },
        { num: 3, title: 'Belgaroui\'s Reaction to the First Takedown', icon: 'Shield', description: 'Against Bekoev, Belgaroui absorbed 4 takedowns but got up relatively quickly. Against a Division I wrestler like Abdul-Malik, getting up will be much harder. Watch HOW Belgaroui reacts to the first takedown: if he gets up in under 30 seconds, it is a good sign. If he is stuck for over a minute, the fight may be decided.' },
        { num: 4, title: 'Wrestling Fatigue in R3', icon: 'Activity', description: 'If the fight reaches the third round, watch Abdul-Malik\'s energy level. Offensive wrestling burns a lot of energy, and if he attempted multiple takedowns in the first two rounds, he may be vulnerable. Belgaroui\'s last two wins came in R3, so the third round is the moment of greatest danger for Abdul-Malik.' },
        { num: 5, title: 'The Pereira/Teixeira Factor in the Corner', icon: 'Brain', description: 'Belgaroui trains daily with Alex Pereira and Glover Teixeira. This means he has likely practiced takedown defense against high-level wrestlers in camp. Watch if corner adjustments between rounds reflect specific preparation against wrestling, with sprawls and cage work.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'WRESTLER vs KICKBOXER', content: 'Abdul-Malik (9-0-1) vs Belgaroui (9-3)\n\nThe undefeated wrestling prospect\nvs Pereira\'s former Glory rival\n\nUFC Seattle | March 28', color: 'gold' },
        { slide_number: 2, title: 'ABDUL-MALIK', content: '7 KOs in 9 wins (78%)\nDivision I Wrestler (Maryland)\n3 finishes in 4 UFC fights\nStanding guillotine in 69 seconds\n\nTrains at Xtreme Couture', color: 'red' },
        { slide_number: 3, title: 'BELGAROUI', content: '27-7 in professional kickboxing (Glory)\nBEAT Alex Pereira\nFaced Israel Adesanya 2x\n6\'6" tall\n\nTrains with Pereira at Teixeira MMA', color: 'blue' },
        { slide_number: 4, title: 'THE KEY TO THE FIGHT', content: 'If Abdul-Malik takes it down = dominates\nIf Belgaroui keeps it standing = danger\n\nBelgaroui absorbed 4 TDs in debut\nAgainst a real wrestler...\n\nPrediction: Abdul-Malik (55%)', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Abdul-Malik vs Belgaroui is the purest style clash on the Seattle card. An undefeated wrestler vs the guy who BEAT Alex Pereira in kickboxing. Quick thread:' },
        { num: '2/5', text: 'Abdul-Malik: 9-0-1, ZERO decisions. This guy ALWAYS finishes. 7 KOs + 2 subs. Division I wrestler from Maryland who knocks people out in MMA. Standing guillotine in 69 seconds in his last fight. The hype is real.' },
        { num: '3/5', text: 'Belgaroui: 6\'6", 27-7 in Glory, trains with Pereira and Glover Teixeira. But... he absorbed 4 takedowns against Bekoev in his debut. Against a Division I wrestler, that number could double.' },
        { num: '4/5', text: 'The X-Factor: the 6\'6" jab. If Belgaroui can keep Abdul-Malik at distance with that elite kickboxer jab, he can frustrate the wrestling entirely. If not, he is going to the floor and it is a long night.' },
        { num: '5/5', text: 'My prediction: Abdul-Malik by decision or late TKO (55/42). The wrestling will be hard to deny. But if it reaches R3 with Belgaroui standing, watch out. The Dutchman\'s last two wins were TKO in R3.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'You know the guy who BEAT Alex Pereira in kickboxing? Well, he is now in the UFC, and this Saturday he faces an undefeated wrestler who has never needed the judges to win.' },
        { time: '10-25s', title: 'Context', text: 'Abdul-Malik is 9-0-1 with 7 knockouts and 2 submissions. Zero decisions. A Division I wrestler. On the other side, Belgaroui is a Glory kickboxer with 27 wins who has fought Pereira AND Adesanya. And today he trains with both of them.' },
        { time: '25-45s', title: 'Analysis', text: 'The key is simple: if Abdul-Malik takes it down, he dominates. If Belgaroui keeps it standing, danger. The problem? Belgaroui absorbed 4 takedowns in his debut against Bekoev, who is not a real wrestler. Against Abdul-Malik, a Division I wrestler training at Xtreme Couture... the math is not good for the Dutchman.' },
        { time: '45-60s', title: 'Prediction & CTA', text: 'My prediction: Abdul-Malik by decision or late TKO, 55 to 42. But watch out for R3, that is where Belgaroui wakes up. Who do you have in this one? Drop a comment!' },
      ],
      tiktok: [
        { hook: 'The guy who BEAT Pereira in kickboxing is in the UFC now.', body: 'Belgaroui beat Pereira in 2017 and faced Adesanya twice. Now he faces an undefeated wrestler who has NEVER gone to decision. Abdul-Malik has 7 KOs in 9 fights and killer Division I wrestling.', cta: 'Who wins: the elite striker or the undefeated wrestler? Comment!' },
        { hook: '69 seconds. That is how long Abdul-Malik\'s last fight lasted.', body: 'Standing guillotine in the first round. Before that, TKO R1 in his debut, TKO R2 in his second fight. This guy is a finishing machine. Now he faces a 6\'6" Glory kickboxer who trains with Pereira.', cta: 'Does Abdul-Malik keep the undefeated streak or does Belgaroui surprise?' },
        { hook: '6\'6". That is the size of the guy Abdul-Malik is about to fight.', body: 'Belgaroui is huge for middleweight, has Glory experience against the best in the world, and trains with Pereira and Glover. But he absorbed 4 takedowns in his debut. Against a Division I wrestler? Good luck.', cta: 'Size or wrestling? Which prevails in MMA? Comment!' },
      ],
      headlines: [
        'Abdul-Malik vs Belgaroui: The Undefeated vs The Kickboxing Assassin',
        'Former Pereira rival faces biggest UFC test against Division I wrestler',
        'Abdul-Malik seeks to stay undefeated against Glory giant in Seattle',
        'Can the man who beat Pereira in kickboxing survive elite wrestling?',
        'Pure style clash: Division I wrestling vs Glory kickboxing at UFC Seattle',
        'Belgaroui, Pereira\'s training partner, faces trial by fire against undefeated wrestler',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...sharedOdds, source: 'Average from sportsbooks (March 2026)' },
      edges: [
        { icon: 'Target', titulo: 'Wrestling as the Differentiator', stat_headline: 'ABDUL-MALIK: DIVISION I WRESTLER WITH 82% TAKEDOWN DEFENSE', contexto: 'Abdul-Malik brings Division I wrestling pedigree from the University of Maryland. His ability to take the fight to the ground and control there is vastly superior to any opponent Belgaroui has faced in MMA.', implicacao_aposta: 'Favors Abdul-Malik by decision or TKO via ground and pound.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Belgaroui\'s Takedown Defense', stat_headline: 'BELGAROUI ABSORBED 4 TAKEDOWNS AGAINST BEKOEV IN HIS DEBUT', contexto: 'Bekoev is not considered a high-level wrestler. If Belgaroui absorbed 4 takedowns against him, the numbers against a Division I wrestler could be much worse.', implicacao_aposta: 'Reinforces the thesis of Abdul-Malik dominating on the ground. Reduces confidence in Belgaroui on the moneyline.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Elite Kickboxing Background', stat_headline: '27-7 IN GLORY WITH A WIN OVER ALEX PEREIRA', contexto: 'Belgaroui has high-level experience against the best strikers in the world. His composure and technique on the feet are at an incomparable level for this stage of a UFC career.', implicacao_aposta: 'If the fight stays standing, Belgaroui has a significant technical advantage. Belgaroui KO props may have value.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Belgaroui\'s Late Finish Pattern', stat_headline: 'LAST 2 WINS BY TKO IN ROUND 3', contexto: 'Against both Bekoev and Iwasaki, Belgaroui finished in the third round. This suggests he is a slow-paced fighter who improves as the fight progresses.', implicacao_aposta: 'Belgaroui by TKO R3 props may have value as a risk bet.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Flame', titulo: 'Combined Finish Rate', stat_headline: 'BOTH HAVE 78% OF WINS BY KO/TKO', contexto: 'Abdul-Malik has never gone to decision. Belgaroui finishes frequently. Both are fighters who seek to finish, not score points.', implicacao_aposta: 'Fight with a high chance of not going to decision. The "does not go the distance" market may have value.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Duration', pick: 'Fight does not go to decision', odds: '-130 (estimated)', confianca: 'alta', edge_vs_mercado: 'Both finish in 78% of fights. Abdul-Malik has NEVER gone to decision.', raciocinio: 'With Abdul-Malik having zero decisions in 9 wins and Belgaroui finishing most of his fights, the finish probability is very high. The combination of aggressive wrestling with elite striking almost always produces a finish.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-160 (estimated)', confianca: 'media', edge_vs_mercado: 'Belgaroui survived 3 rounds against Bekoev. Abdul-Malik needed 2 rounds to stop Klein.', raciocinio: 'Despite both being finishers, Belgaroui has enough experience to survive the first round. His reach and basic defense should keep him standing at least until the second round.' },
        { tipo: 'Moneyline', pick: 'Abdul-Malik (-120)', odds: '-120', confianca: 'media', edge_vs_mercado: 'Fair price for a favorite with a significant wrestling advantage.', raciocinio: 'Abdul-Malik\'s wrestling is the most tangible advantage of the fight. Belgaroui\'s weak takedown defense combined with Abdul-Malik\'s Division I wrestling makes the -120 price accessible and fair.' },
      ],
      armadilha: { titulo: 'Trap: Belgaroui by KO in R1', descricao: 'Despite the impressive kickboxing background, Belgaroui has never knocked anyone out in the first round in UFC-level MMA. His finishes are late (R3). Betting on a quick KO from the Dutchman goes against the pattern of his fights. Most likely, Abdul-Malik will test the takedown early and Belgaroui will need time to adapt.' },
      disclaimer: 'Statistical analysis for informational and educational purposes. Bet responsibly and within your financial limits.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// FR — French
// ═══════════════════════════════════════════════════════════════

const analiseFR: FullSingleAnalise = {
  ...sharedMeta,
  titulo: 'Abdul-Malik vs Belgaroui: L\'Invaincu Contre l\'Assassin du Kickboxing',
  subtitulo: 'Le prospect invaincu du wrestling affronte l\'ancien rival de Pereira et Adesanya en kickboxing',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 mars 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Poids Moyen (185 lbs)',
  num_rounds: 3,
  tactical_breakdown: sharedTacticalBreakdown,
  fight_prediction: {
    ...sharedFightPrediction,
    predictedMethod: 'TKO ou Decision',
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Mansur Abdul-Malik',
    record: '9-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Antonio Trocoli', method: 'Sub R1 (guillotine)', event: 'UFC 323' },
      { result: 'D', opponent: 'Cody Brundage', method: 'Match nul majoritaire', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Nick Klein', method: 'TKO R2', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Dusko Todorovic', method: 'TKO R1', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Yousri Belgaroui',
    apelido: 'Baby Face Assassin',
    record: '9-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Azamat Bekoev', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Taiga Iwasaki', method: 'TKO R3', event: 'DWCS' },
      { result: 'W', opponent: 'Giorgi Kvelidze', method: 'TKO R1', event: 'LFL' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 mars 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Poids Moyen (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Wrestling vs Kickboxing: Le Choc des Styles',
      tagline_sub: 'Le prospect invaincu affronte l\'ancien rival de Pereira et Adesanya dans la plus pure guerre de styles',
      fighter1: {
        ...sharedHeroFighters.fighter1,
        ranking: 'N/R Poids Moyen',
        info_extra: 'Columbia, Maryland | 28 ans',
      },
      fighter2: {
        ...sharedHeroFighters.fighter2,
        ranking: 'N/R Poids Moyen',
        info_extra: 'Amsterdam, Pays-Bas | 33 ans',
      },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Le Lutteur Invaincu vs Le Striker d'Elite</h3>
        <p>Ce combat pose une question qui ne vieillit jamais en MMA: que se passe-t-il quand un lutteur de haut niveau affronte un striker de classe mondiale? <strong class="text-ufc-red">Abdul-Malik</strong> apporte des references legitimes de wrestling Division I de l'Universite du Maryland, ou il a concuru en poids lourd. Depuis ses debuts a l'UFC en novembre 2024, il a mis KO Dusko Todorovic au premier round, arrete Nick Klein au deuxieme, survecu a une controverse contre Cody Brundage (match nul majoritaire apres revision de la commission de Georgie), et soumis Antonio Trocoli avec une guillotine debout en seulement 69 secondes.</p>
        <p>De l'autre cote, <strong class="text-blue-400">Belgaroui</strong> represente quelque chose de rare dans le MMA moderne: un kickboxeur d'elite du circuit Glory qui a affronte les meilleurs du monde. On parle d'un homme qui a BATTU Alex Pereira par decision unanime en 2017, perdu deux fois contre Pereira pour le titre, et affronte Israel Adesanya deux fois en kickboxing. A 33 ans, mesurant 1,98m, Belgaroui est finalement arrive a l'UFC en octobre 2025 et a arrete Azamat Bekoev au troisieme round par TKO convaincant.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Connexion Pereira et le Timing Parfait</h3>
        <p>Aujourd'hui, Belgaroui s'entraine aux cotes d'Alex Pereira a Teixeira MMA & Fitness au Connecticut, sous la supervision de Glover Teixeira. L'ironie? Ce combat a lieu sur la meme carte ou Adesanya, un autre ancien adversaire de Belgaroui en kickboxing, fait le combat principal. Le Neerlandais a affronte Adesanya et Pereira, et cherche maintenant a construire son propre heritage en MMA.</p>
        <p>Pour <strong class="text-ufc-red">Abdul-Malik</strong>, c'est le test le plus dangereux de sa carriere. Belgaroui est l'adversaire le plus grand, le plus experimente en combat de haut niveau, et avec le striking le plus raffine qu'il ait jamais affronte. Pour <strong class="text-blue-400">Belgaroui</strong>, la question est claire: le striking d'elite peut-il survivre au wrestling d'elite? Ou le jeune prospect va-t-il trainer le veteran au sol et lui enlever toutes ses armes?</p>
      `,
      stakes: [
        { dimensao: 'Classement', fighter1: 'Premier pas vers le top 15', fighter2: 'Victoire sur un invaincu = credibilite instantanee' },
        { dimensao: 'Objectif', fighter1: 'Garder le 0 au palmare', fighter2: 'Prouver qu\'il a sa place a l\'UFC' },
        { dimensao: 'Recit', fighter1: 'Prospect le plus dangereux des poids moyens', fighter2: 'Veteran du kickboxing conquiert le MMA' },
        { dimensao: 'Risque', fighter1: 'Premiere defaite contre un striker d\'elite', fighter2: 'Etre domine au wrestling lors de son deuxieme combat UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'LE PROSPECT CONFIRME LE BATTAGE MEDIATIQUE',
          subtitulo: 'Abdul-Malik reussit le test du striking et prouve qu\'il est serieux',
          consequencias: [
            { tag: 'PALMARES', texto: 'Maintient son invincibilite et passe a 10-0-1, se consolidant comme l\'un des noms les plus chauds des poids moyens.' },
            { tag: 'CLASSEMENT', texto: 'Avec 5 victoires consecutives (4 a l\'UFC), il entre dans la conversation pour un top 15 des 2026.' },
            { tag: 'RECIT', texto: 'Prouve sa polyvalence en battant un striker de classe mondiale, faisant taire les doutes sur son jeu debout.' },
          ],
          proxima_luta: 'Un adversaire classe dans le top 15, possiblement quelqu\'un comme Brendan Allen ou Nassourdine Imavov.',
        },
        fighter2_vence: {
          titulo: 'LE BABY FACE ASSASSIN EST LA POUR RESTER',
          subtitulo: 'Belgaroui prouve que le kickboxing d\'elite se traduit en MMA',
          consequencias: [
            { tag: 'CREDIBILITE', texto: 'Battre un invaincu avec un pedigree de wrestling en seulement son deuxieme combat UFC est une declaration enorme.' },
            { tag: 'SERIE', texto: 'Enchaine une cinquieme victoire consecutive et gagne de l\'elan pour de plus grands combats chez les poids moyens.' },
            { tag: 'HERITAGE', texto: 'Ancien rival de Pereira et Adesanya en kickboxing commence a ecrire son propre chapitre en MMA.' },
          ],
          proxima_luta: 'Un adversaire de niveau intermediaire classe, possiblement quelqu\'un comme Michel Pereira ou Roman Dolidze.',
        },
      },
    },
    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          { date: 'Dec 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1 (guillotine debout, 1:09)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Trocoli etait 0-2 a l\'UFC. Abdul-Malik a montre sa polyvalence en finissant avec une guillotine debout apres une tentative de takedown.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Match nul majoritaire (revise par la commission)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'A l\'origine victoire par decision unanime, mais un choc de tetes au R3 a conduit a une revision et un match nul majoritaire par la commission de Georgie.' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2 (coups de poing, 3:24)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Klein a accepte le combat comme remplacant de derniere minute. Abdul-Malik a eu un premier round difficile mais s\'est repris et a fini au deuxieme.' },
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (coups de poing, 2:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Debut UFC avec Performance of the Night. A domine Todorovic avec pression et puissance, finissant au premier round.' },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Debut UFC. Performance of the Night.' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Klein etait un remplacant de derniere minute.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Match nul majoritaire', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Resultat controverse apres revision.' },
          { date: 'Dec 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Guillotine debout en 69 secondes.' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'En Ascension',
        momentum_trend: 'ascending',
        momentum_note: 'Abdul-Malik est sur une trajectoire ascendante claire. Trois finitions en quatre combats UFC, dont une soumission impressionnante contre Trocoli. Le match nul contre Brundage est le seul point d\'interrogation, mais le contexte (choc de tetes accidentel) explique le resultat. La finition rapide contre Trocoli en decembre montre qu\'il est affute et pret pour un saut de qualite dans l\'opposition.',
      },
      fighter2: {
        nome: 'Yousri Belgaroui',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3 (coups de poing, 0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Debut UFC a Vancouver. A travaille derriere le jab long, encaisse 4 takedowns mais n\'est jamais reste au sol, et a arrete Bekoev au troisieme round.' },
          { date: 'Sep 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Contender Series. Victoire par TKO au troisieme round, obtenant un contrat UFC.' },
          { date: 'Oct 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Levels Fight League. KO rapide au premier round contre un adversaire regional.' },
          { date: 'Aou 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Contender Series. Defaite aux points, n\'a pas obtenu de contrat UFC a la premiere tentative.' },
        ],
        full_fight_history: [
          { date: '2021', opponent: 'Badreddine Diani', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Debut MMA. UAE Warriors.' },
          { date: '2021', opponent: 'Sallah-Eddine Dekhissi', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'UAE Warriors.' },
          { date: 'Mar 2022', opponent: 'Samir Zaidi', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'UAE Warriors.' },
          { date: 'Jul 2022', opponent: 'Mohamad Osseili', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Premiere defaite en MMA. UAE Warriors.' },
          { date: 'Fev 2023', opponent: 'Bogdan Kotlovyanov', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Levels Fight League.' },
          { date: 'Fev 2023', opponent: 'Stefan Pretorius', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'UAE Warriors.' },
          { date: 'Aou 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'DWCS. N\'a pas obtenu de contrat.' },
          { date: 'Oct 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'LFL.' },
          { date: 'Sep 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'DWCS. Contrat UFC obtenu.' },
          { date: 'Oct 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Debut UFC. TKO au troisieme round.' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'En Ascension',
        momentum_trend: 'ascending',
        momentum_note: 'Belgaroui est sur une serie de quatre victoires consecutives, la meilleure de sa carriere MMA. Son experience en kickboxing professionnel de haut niveau (27-7 au Glory, avec des combats contre Pereira et Adesanya) lui donne une experience de combat que les chiffres MMA ne capturent pas. Ses debuts UFC ont ete solides, montrant patience et technique de striker d\'elite. Ce qui manque, c\'est l\'experience contre des lutteurs de haut niveau en MMA.',
      },
    },
    nivel_competicao: {
      fighter1: {
        nome: 'Abdul-Malik',
        media_oponentes: 1.5,
        media_oponentes_label: 'Faible',
        aproveitamento: '3W-0L-1D (87%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Belgaroui',
        media_oponentes: 1,
        media_oponentes_label: 'Faible',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Il n\'y a pas d\'adversaires communs entre les deux combattants. Les deux sont au debut de leur carriere UFC avec peu de donnees comparatives directes. Abdul-Malik a affronte des adversaires non classes dans tous ses combats, tout comme Belgaroui dans son unique combat UFC. La vraie difference reside dans leurs parcours: Abdul-Malik vient du wrestling Division I, tandis que Belgaroui apporte une carriere entiere en kickboxing professionnel de haut niveau contre des noms comme Alex Pereira et Israel Adesanya.',
    },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { ...sharedStats[0], note: 'Abdul-Malik a un volume extremement eleve. Belgaroui n\'a qu\'un seul combat UFC pour reference.' },
        { ...sharedStats[1], note: 'Les deux avec une precision moderee. Donnees de Belgaroui limitees a un combat.' },
        { ...sharedStats[2], note: 'Abdul-Malik absorbe beaucoup en raison de son volume eleve.' },
        { ...sharedStats[3], note: 'La defense de strikes d\'Abdul-Malik est vulnerable. Belgaroui a un parcours de kickboxeur.' },
        { ...sharedStats[4], note: 'Abdul-Malik est un lutteur de formation. Belgaroui n\'a pas tente de takedowns a l\'UFC.' },
        { ...sharedStats[5], note: 'Abdul-Malik a des outils de wrestling. Belgaroui n\'est pas un combattant de takedown.' },
        { ...sharedStats[6], note: 'Belgaroui a subi 4 takedowns contre Bekoev. Chiffre inquietant contre un vrai lutteur.' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '28 ans', fighter2: '33 ans', note: 'Abdul-Malik 5 ans plus jeune' },
        { label: 'Taille', fighter1: '1,88m (6\'2")', fighter2: '1,98m (6\'6")', note: 'Belgaroui 10cm plus grand' },
        { label: 'Allonge', fighter1: '203cm (80")', fighter2: '198cm (78")', note: 'Abdul-Malik a une allonge PLUS GRANDE malgre sa taille inferieure' },
        { label: 'Garde', fighter1: 'Orthodoxe', fighter2: 'Orthodoxe', note: null },
        { label: 'Salle', fighter1: 'Xtreme Couture (Las Vegas)', fighter2: 'Teixeira MMA & Fitness (Connecticut)', note: 'Les deux dans des camps d\'elite' },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Offensif', valueA: 82, valueB: 25, labelA: 'Tres Bon', labelB: 'Faible', advantage: 'fighter1', advantage_note: 'Abdul-Malik etait lutteur Division I a l\'Universite du Maryland. Belgaroui est purement un striker.' },
        { label: 'Striking Debout', valueA: 60, valueB: 88, labelA: 'Bon', labelB: 'Tres Bon', advantage: 'fighter2', advantage_note: 'Belgaroui a une carriere professionnelle au Glory avec 27 victoires. Niveau technique tres superieur en pieds.' },
        { label: 'Defense de Takedown', valueA: 75, valueB: 45, labelA: 'Tres Bon', labelB: 'Moyen', advantage: 'fighter1', advantage_note: 'Belgaroui a subi 4 takedowns contre Bekoev. Contre un vrai lutteur, ce sera bien pire.' },
        { label: 'Controle au Sol', valueA: 72, valueB: 35, labelA: 'Bon', labelB: 'Moyen', advantage: 'fighter1', advantage_note: 'La base de wrestling donne a Abdul-Malik un controle superieur. Belgaroui apprend encore le jeu au sol.' },
        { label: 'Puissance de KO', valueA: 78, valueB: 75, labelA: 'Tres Bon', labelB: 'Tres Bon', advantage: 'even', advantage_note: 'Les deux ont une vraie puissance. Abdul-Malik avec 7 KOs en 9 victoires. Belgaroui avec un historique de KOs en kickboxing.' },
        { label: 'Cardio & Rythme', valueA: 68, valueB: 72, labelA: 'Bon', labelB: 'Bon', advantage: 'even', advantage_note: 'Belgaroui a l\'experience des longs combats de kickboxing. Abdul-Malik tend a finir tot.' },
      ],
      insight: 'Cet affrontement est defini par la dichotomie classique wrestling vs striking. Abdul-Malik a un avantage enorme au sol et dans le clinch, tandis que Belgaroui domine largement a distance debout. Le combat sera decide par celui qui impose son jeu: si Abdul-Malik l\'amene au sol, il domine. Si Belgaroui le garde debout, il a les outils pour gagner.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Abdul-Malik', ...sharedDistribuicaoNumbers.fighter1 },
      fighter2: { nome: 'Belgaroui', ...sharedDistribuicaoNumbers.fighter2 },
      insight: 'Les chiffres sont presque identiques: les deux ont 7 KOs en 9 victoires (78%). La difference est dans le complement: Abdul-Malik a 2 soumissions et zero decisions, prouvant qu\'il FINIT TOUJOURS. Belgaroui n\'a jamais soumis personne, ses deux autres victoires etant par decision. Abdul-Malik n\'a litteralement jamais eu besoin des juges pour gagner. Cela suggere un combat avec un fort potentiel de finition, car aucun des deux n\'est un combattant aux points.',
    },
    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 7, danger_label: 'AVANTAGE ABDUL-MALIK', color: 'red', title: 'Le Test du Takedown', description: 'Le premier round va definir tout le combat. Abdul-Malik va tester le takedown tot et fort. S\'il parvient a amener Belgaroui au sol dans les deux premieres minutes, il peut dominer a partir de la. Belgaroui doit survivre aux tentatives initiales, maintenir la distance avec le jab long et etablir son rythme. La pression d\'Abdul-Malik au R1 est historiquement tres forte, avec deux de ses victoires UFC etant des finitions au premier round.' },
        { rounds: 'R2', danger_level: 6, danger_label: 'EQUILIBRE', color: 'gold', title: 'Adaptation et Ajustements', description: 'Si le combat atteint le deuxieme round, cela signifie qu\'aucun des deux n\'a impose son jeu de maniere dominante. Belgaroui a tendance a s\'ameliorer au fil du combat, comme il l\'a montre contre Bekoev en arretant son adversaire au R3. Abdul-Malik a montre contre Klein qu\'il peut se remettre d\'un premier round difficile et conclure au deuxieme. Un round crucial d\'adaptation.' },
        { rounds: 'R3', danger_level: 7, danger_label: 'AVANTAGE BELGAROUI', color: 'green', title: 'Le Territoire du Striker', description: 'Si ce combat atteint le troisieme round, l\'avantage passe a Belgaroui. Ses deux dernieres victoires (Bekoev et Iwasaki) sont venues au troisieme round. Le cardio de kickboxeur et l\'experience dans les rounds tardifs favorisent le Neerlandais. Si Abdul-Malik n\'a pas reussi le takedown ou la finition dans les deux premiers rounds, il sera probablement fatigue et vulnerable au striking d\'elite de Belgaroui.' },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'Brain', title: 'Experience de Combat de Haut Niveau', fighter: 'Belgaroui', risk_level: 'ENORME POSITIF', risk_color: 'green', description: 'Belgaroui a affronte Alex Pereira trois fois et Israel Adesanya deux fois en kickboxing professionnel. Cette experience contre des combattants de calibre mondial lui donne un calme sous pression que peu de debutants UFC possedent. Il a tout vu en termes de strikes.' },
        { icon: 'Shield', title: 'Defense de Takedown Preoccupante', fighter: 'Belgaroui', risk_level: 'RISQUE ELEVE', risk_color: 'red', description: 'Belgaroui a subi 4 takedowns contre Azamat Bekoev, qui n\'est pas considere comme un lutteur de haut niveau. Contre Abdul-Malik, un vrai lutteur Division I, ce nombre pourrait etre bien pire. La defense de takedown est la plus grande vulnerabilite de Belgaroui dans ce combat.' },
        { icon: 'TrendingUp', title: 'Courbe d\'Evolution Rapide', fighter: 'Abdul-Malik', risk_level: 'POSITIF', risk_color: 'green', description: 'Abdul-Malik montre une progression a chaque combat. Il a mis KO a ses debuts, arrete son adversaire au deuxieme round dans son deuxieme combat, et montre des competences en soumission dans son quatrieme. La polyvalence croissante est le signe d\'un combattant qui absorbe tout a l\'entrainement et l\'applique dans l\'octogone.' },
        { icon: 'AlertTriangle', title: 'Defense de Strikes Vulnerable', fighter: 'Abdul-Malik', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'Avec seulement 49% de defense de strikes, Abdul-Malik absorbe beaucoup de coups. Contre un kickboxeur d\'elite comme Belgaroui, cela pourrait etre extremement dangereux. Le Neerlandais a la precision et la puissance pour capitaliser sur cette ouverture defensive.' },
        { icon: 'Zap', title: 'Avantage de Taille Extreme', fighter: 'Belgaroui', risk_level: 'POSITIF', risk_color: 'green', description: 'Avec 1,98m, Belgaroui est 10cm plus grand qu\'Abdul-Malik. Le jab long et les coups de pied a distance beneficient enormement de cette difference. Cependant, fait interessant, Abdul-Malik a une allonge plus grande (203cm vs 198cm), ce qui pourrait neutraliser une partie de cet avantage a moyenne distance.' },
        { icon: 'Clock', title: 'Experience UFC Limitee', fighter: 'Belgaroui', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'Ce sera seulement le deuxieme combat de Belgaroui a l\'UFC. Malgre sa vaste experience en kickboxing, le MMA de l\'UFC est un animal different. La pression, le rythme, les regles de l\'octogone: tout est different du ring du Glory.' },
        { icon: 'MapPin', title: 'Terrain Neutre a Seattle', fighter: 'Les deux', risk_level: 'NEUTRE', risk_color: 'neutral', description: 'Seattle est un terrain neutre pour les deux. Abdul-Malik s\'entraine a Las Vegas et vient du Maryland, Belgaroui s\'entraine au Connecticut et vient d\'Amsterdam. Aucun n\'aura d\'avantage significatif du public.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 55,
        scenarios: [
          { name: 'Domination par le Wrestling', probability: 25, method: 'Decision Unanime ou TKO par ground and pound', description: 'Abdul-Malik exerce la pression des le debut, coince Belgaroui contre la cage, complete des takedowns repetes et controle au sol. Avec un wrestling superieur, il peut accumuler des rounds de controle ou trouver un TKO par ground and pound.' },
          { name: 'Finition par Soumission', probability: 12, method: 'Sub R1-R2 (guillotine ou RNC)', description: 'Similaire a ce qu\'il a fait contre Trocoli. Si Belgaroui tente de se relever d\'un takedown sans precaution, Abdul-Malik peut enclencher une guillotine ou un etranglement. La transition du wrestling aux soumissions est un point d\'evolution clair.' },
          { name: 'KO dans le Clinch', probability: 10, method: 'TKO R1-R2 (coups de poing a courte distance)', description: 'Abdul-Malik a une vraie puissance dans les mains et peut utiliser le dirty boxing en clinch pour sortir Belgaroui de sa distance confortable. A courte distance, la taille de Belgaroui devient un desavantage et la puissance d\'Abdul-Malik prevaut.' },
          { name: 'Guerre d\'Usure', probability: 8, method: 'Decision Partagee', description: 'Scenario ou aucun n\'arrive a imposer clairement son jeu. Abdul-Malik melange takedowns et striking, Belgaroui en defend certains et connecte debout. Un combat serre decide dans les details.' },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 42,
        scenarios: [
          { name: 'Masterclass de Striking', probability: 18, method: 'Decision Unanime', description: 'Belgaroui utilise le jab long, les front kicks et les teeps pour garder Abdul-Malik a distance. Il sprawle les takedowns et marque avec des combinaisons propres. L\'experience de kickboxeur d\'elite lui permet de controler la distance pendant 15 minutes.' },
          { name: 'KO Technique Tardif', probability: 14, method: 'TKO R3 (coups de poing)', description: 'Schema des derniers combats de Belgaroui: patience dans les premiers rounds, finition tardive. Si Abdul-Malik depense son energie en takedowns sans reussir a controler, Belgaroui peut trouver le moment pour lacher les mains au troisieme round.' },
          { name: 'Contre Devastateur', probability: 7, method: 'KO R1-R2', description: 'Abdul-Malik avance pour le takedown la tete baissee et Belgaroui connecte un uppercut ou un genou au timing parfait. Risque reel pour quelqu\'un qui attaque avec autant de pression contre un contre-striker forme au Glory.' },
          { name: 'Victoire dans les Details', probability: 3, method: 'Decision Partagee', description: 'Combat equilibre ou Belgaroui defend suffisamment de takedowns et connecte les coups les plus significatifs, emportant une decision serree.' },
        ],
      },
    },
    previsao_final: {
      winner_name: 'Mansur Abdul-Malik',
      winner_side: 'fighter1',
      predicted_method: 'Decision Unanime ou TKO tardif',
      confidence_score: 5,
      confidence_label: 'MOYENNE',
      explanation: 'Abdul-Malik est le favori parce qu\'il possede l\'outil qui change le plus le cours des combats en MMA: le wrestling de haut niveau. La defense de takedown de Belgaroui etait preoccupante contre Bekoev (4 takedowns subis), et Abdul-Malik est un lutteur nettement meilleur. La strategie la plus probable est qu\'Abdul-Malik exerce la pression, cherche le clinch et les takedowns, et controle au sol. Cependant, Belgaroui a les outils pour creer des problemes serieux debout, et la confiance ici est MOYENNE car c\'est le saut de qualite le plus significatif pour les deux combattants. Tout resultat est possible.',
      x_factor: {
        title: 'Le Jab de 1,98m',
        description: 'Belgaroui possede l\'un des plus grands avantages de taille chez les poids moyens de l\'UFC. S\'il parvient a garder Abdul-Malik au bout de son jab et empecher les entrees de takedown, l\'avantage de wrestling devient sans objet. Le jab long contre un combattant qui avance tete baissee pour chercher des takedowns peut etre devastateur.',
      },
      upset_alert: {
        title: 'Belgaroui TKO R3',
        description: 'Si Abdul-Malik depense son energie dans les premiers rounds en tentant des takedowns sans succes, Belgaroui peut capitaliser au troisieme round avec son schema typique de finition tardive. Les deux dernieres victoires de Belgaroui ont ete par TKO au troisieme round, et la fatigue du wrestling pourrait ouvrir la garde d\'Abdul-Malik pour des coups propres.',
      },
      probabilities: sharedProbabilities,
      value_picks: {
        moneyline: { pick: 'Abdul-Malik (-120)', reasoning: 'Le prix de leger favori est juste. Le wrestling tend a prevaloir dans ce type de choc de styles.' },
        method: { pick: 'Ne va pas a la decision', reasoning: 'Les deux ont un taux de finition de 78% par KO/TKO. Forte probabilite de KO ou finition.' },
        over_under: { pick: 'Plus de 1.5 rounds', rounds: 1.5, reasoning: 'Abdul-Malik pourrait mettre du temps a trouver le takedown contre l\'allonge de Belgaroui. Probable que ca depasse le premier round.' },
        best_value: 'Plus de 1.5 rounds est le pari le plus sur. Les deux sont des finisseurs, mais Belgaroui a l\'experience pour survivre au premier round.',
      },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'Les 2 Premieres Minutes Definissent Tout', icon: 'Clock', description: 'Si Abdul-Malik obtient le premier takedown dans les 2 premieres minutes, cela dictera le rythme de tout le combat. Si Belgaroui sprawle et garde le combat debout, la confiance du Neerlandais grandira a chaque seconde. Faites attention a la premiere tentative de takedown: si elle reussit, attendez-vous a une domination. Si elle echoue, attendez-vous a des problemes pour Abdul-Malik.' },
        { num: 2, title: 'Le Jab de Belgaroui comme Arme Principale', icon: 'Target', description: 'Avec 1,98m et un parcours en kickboxing professionnel, Belgaroui possede l\'un des jabs les plus longs de la division. Observez s\'il parvient a garder Abdul-Malik au bout de ce jab. Si l\'Americain prend des jabs propres et ne peut pas fermer la distance, c\'est un signe que Belgaroui controle le combat.' },
        { num: 3, title: 'Reaction de Belgaroui au Premier Takedown', icon: 'Shield', description: 'Contre Bekoev, Belgaroui a subi 4 takedowns mais s\'est releve relativement vite. Contre un lutteur Division I comme Abdul-Malik, se relever sera beaucoup plus difficile. Observez COMMENT Belgaroui reagit au premier takedown: s\'il se releve en moins de 30 secondes, c\'est bon signe. S\'il reste bloque plus d\'une minute, le combat pourrait etre decide.' },
        { num: 4, title: 'Fatigue de Wrestling au R3', icon: 'Activity', description: 'Si le combat atteint le troisieme round, observez le niveau d\'energie d\'Abdul-Malik. Le wrestling offensif consomme beaucoup d\'energie, et s\'il a tente de multiples takedowns dans les deux premiers rounds, il pourrait etre vulnerable. Les deux dernieres victoires de Belgaroui sont venues au R3, donc le troisieme round est le moment de plus grand danger pour Abdul-Malik.' },
        { num: 5, title: 'Le Facteur Pereira/Teixeira dans le Corner', icon: 'Brain', description: 'Belgaroui s\'entraine quotidiennement avec Alex Pereira et Glover Teixeira. Cela signifie qu\'il a probablement pratique la defense de takedown contre des lutteurs de haut niveau au camp. Observez si les ajustements du corner entre les rounds refletent une preparation specifique contre le wrestling, avec des sprawls et du travail sur la cage.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LUTTEUR vs KICKBOXEUR', content: 'Abdul-Malik (9-0-1) vs Belgaroui (9-3)\n\nLe prospect invaincu du wrestling\ncontre l\'ancien rival de Pereira au Glory\n\nUFC Seattle | 28 mars', color: 'gold' },
        { slide_number: 2, title: 'ABDUL-MALIK', content: '7 KOs en 9 victoires (78%)\nLutteur Division I (Maryland)\n3 finitions en 4 combats UFC\nGuillotine debout en 69 secondes\n\nS\'entraine a Xtreme Couture', color: 'red' },
        { slide_number: 3, title: 'BELGAROUI', content: '27-7 en kickboxing professionnel (Glory)\nA BATTU Alex Pereira\nA affronte Israel Adesanya 2x\n1,98m de haut\n\nS\'entraine avec Pereira a Teixeira MMA', color: 'blue' },
        { slide_number: 4, title: 'LA CLE DU COMBAT', content: 'Si Abdul-Malik l\'amene au sol = domine\nSi Belgaroui reste debout = danger\n\nBelgaroui a subi 4 TDs a ses debuts\nContre un vrai lutteur...\n\nPrediction: Abdul-Malik (55%)', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Abdul-Malik vs Belgaroui est le choc de styles le plus pur de la carte de Seattle. Un lutteur invaincu contre le gars qui a BATTU Alex Pereira en kickboxing. Thread rapide:' },
        { num: '2/5', text: 'Abdul-Malik: 9-0-1, ZERO decisions. Ce gars FINIT TOUJOURS. 7 KOs + 2 subs. Lutteur Division I de Maryland qui met KO en MMA. Guillotine debout en 69 secondes a son dernier combat. Le battage est reel.' },
        { num: '3/5', text: 'Belgaroui: 1,98m, 27-7 au Glory, s\'entraine avec Pereira et Glover Teixeira. Mais... il a subi 4 takedowns contre Bekoev a ses debuts. Contre un lutteur Division I, ce nombre pourrait doubler.' },
        { num: '4/5', text: 'Le X-Factor: le jab de 1,98m. Si Belgaroui peut garder Abdul-Malik a distance avec ce jab de kickboxeur d\'elite, il peut frustrer tout le wrestling. Sinon, direction le sol et c\'est une longue soiree.' },
        { num: '5/5', text: 'Ma prediction: Abdul-Malik par decision ou TKO tardif (55/42). Le wrestling sera difficile a nier. Mais si ca arrive au R3 avec Belgaroui debout, attention. Les deux dernieres victoires du Neerlandais etaient des TKO au R3.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Vous connaissez le gars qui a BATTU Alex Pereira en kickboxing? Eh bien, il est maintenant a l\'UFC, et ce samedi il affronte un lutteur invaincu qui n\'a jamais eu besoin des juges pour gagner.' },
        { time: '10-25s', title: 'Contexte', text: 'Abdul-Malik est a 9-0-1 avec 7 KOs et 2 soumissions. Zero decisions. Lutteur Division I. De l\'autre cote, Belgaroui est un kickboxeur du Glory avec 27 victoires, qui a combattu Pereira ET Adesanya. Et aujourd\'hui il s\'entraine avec les deux.' },
        { time: '25-45s', title: 'Analyse', text: 'La cle est simple: si Abdul-Malik l\'amene au sol, il domine. Si Belgaroui reste debout, danger. Le probleme? Belgaroui a subi 4 takedowns a ses debuts contre Bekoev, qui n\'est pas un vrai lutteur. Contre Abdul-Malik, un lutteur Division I s\'entrainant a Xtreme Couture... les maths ne sont pas bonnes pour le Neerlandais.' },
        { time: '45-60s', title: 'Prediction & CTA', text: 'Ma prediction: Abdul-Malik par decision ou TKO tardif, 55 contre 42. Mais attention au R3, c\'est la ou Belgaroui se reveille. Qui avez-vous dans celui-ci? Commentez!' },
      ],
      tiktok: [
        { hook: 'Le gars qui a BATTU Pereira en kickboxing est maintenant a l\'UFC.', body: 'Belgaroui a battu Pereira en 2017 et affronte Adesanya deux fois. Maintenant il affronte un lutteur invaincu qui n\'est JAMAIS alle en decision. Abdul-Malik a 7 KOs en 9 combats et un wrestling Division I meurtrier.', cta: 'Qui gagne: le striker d\'elite ou le lutteur invaincu? Commentez!' },
        { hook: '69 secondes. C\'est la duree du dernier combat d\'Abdul-Malik.', body: 'Guillotine debout au premier round. Avant ca, TKO R1 a ses debuts, TKO R2 au deuxieme combat. Ce gars est une machine a finir. Maintenant il affronte un kickboxeur du Glory de 1,98m qui s\'entraine avec Pereira.', cta: 'Abdul-Malik garde son invincibilite ou Belgaroui surprend?' },
        { hook: '1,98m. C\'est la taille du gars qu\'Abdul-Malik va affronter.', body: 'Belgaroui est enorme pour les poids moyens, a l\'experience du Glory contre les meilleurs du monde, et s\'entraine avec Pereira et Glover. Mais il a subi 4 takedowns a ses debuts. Contre un lutteur Division I? Bonne chance.', cta: 'Taille ou wrestling? Lequel prevaut en MMA? Commentez!' },
      ],
      headlines: [
        'Abdul-Malik vs Belgaroui: L\'Invaincu Contre l\'Assassin du Kickboxing',
        'L\'ancien rival de Pereira affronte le plus grand test UFC contre un lutteur Division I',
        'Abdul-Malik cherche a rester invaincu contre le geant du Glory a Seattle',
        'L\'homme qui a battu Pereira en kickboxing peut-il survivre au wrestling d\'elite?',
        'Choc de styles pur: wrestling Division I vs kickboxing Glory a l\'UFC Seattle',
        'Belgaroui, partenaire d\'entrainement de Pereira, affronte l\'epreuve du feu contre un lutteur invaincu',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...sharedOdds, source: 'Moyenne des sites de paris (mars 2026)' },
      edges: [
        { icon: 'Target', titulo: 'Le Wrestling comme Differentiel', stat_headline: 'ABDUL-MALIK: LUTTEUR DIVISION I AVEC 82% DE DEFENSE DE TAKEDOWN', contexto: 'Abdul-Malik apporte un pedigree de wrestling Division I de l\'Universite du Maryland. Sa capacite a amener le combat au sol et y controler est vastement superieure a celle de tout adversaire que Belgaroui a affronte en MMA.', implicacao_aposta: 'Favorise Abdul-Malik par decision ou TKO par ground and pound.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defense de Takedown de Belgaroui', stat_headline: 'BELGAROUI A SUBI 4 TAKEDOWNS CONTRE BEKOEV A SES DEBUTS', contexto: 'Bekoev n\'est pas considere comme un lutteur de haut niveau. Si Belgaroui a subi 4 takedowns contre lui, les chiffres contre un lutteur Division I pourraient etre bien pires.', implicacao_aposta: 'Renforce la these d\'Abdul-Malik dominant au sol. Reduit la confiance en Belgaroui sur le moneyline.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Parcours de Kickboxing d\'Elite', stat_headline: '27-7 AU GLORY AVEC UNE VICTOIRE SUR ALEX PEREIRA', contexto: 'Belgaroui a une experience de haut niveau contre les meilleurs strikers du monde. Son calme et sa technique debout sont a un niveau incomparable pour cette etape de carriere UFC.', implicacao_aposta: 'Si le combat reste debout, Belgaroui a un avantage technique significatif. Les props de KO de Belgaroui peuvent avoir de la valeur.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Schema de Finition Tardive de Belgaroui', stat_headline: '2 DERNIERES VICTOIRES PAR TKO AU ROUND 3', contexto: 'Contre Bekoev et Iwasaki, Belgaroui a fini au troisieme round. Cela suggere qu\'il est un combattant a rythme lent qui s\'ameliore au fil du combat.', implicacao_aposta: 'Les props de Belgaroui par TKO R3 peuvent avoir de la valeur comme pari a risque.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Flame', titulo: 'Taux de Finition Combine', stat_headline: 'LES DEUX ONT 78% DE VICTOIRES PAR KO/TKO', contexto: 'Abdul-Malik n\'est jamais alle en decision. Belgaroui finit frequemment. Les deux sont des combattants qui cherchent a finir, pas a marquer des points.', implicacao_aposta: 'Combat avec de fortes chances de ne pas aller en decision. Le marche "ne va pas a la distance" peut avoir de la valeur.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Duree', pick: 'Le combat ne va pas en decision', odds: '-130 (estime)', confianca: 'alta', edge_vs_mercado: 'Les deux finissent dans 78% des combats. Abdul-Malik n\'est JAMAIS alle en decision.', raciocinio: 'Avec Abdul-Malik ayant zero decisions en 9 victoires et Belgaroui finissant la plupart de ses combats, la probabilite de finition est tres elevee. La combinaison de wrestling agressif avec du striking d\'elite produit presque toujours une finition.' },
        { tipo: 'Over/Under', pick: 'Plus de 1.5 Rounds', odds: '-160 (estime)', confianca: 'media', edge_vs_mercado: 'Belgaroui a survecu 3 rounds contre Bekoev. Abdul-Malik a eu besoin de 2 rounds pour arreter Klein.', raciocinio: 'Malgre que les deux soient des finisseurs, Belgaroui a assez d\'experience pour survivre au premier round. Son allonge et sa defense de base devraient le garder debout au moins jusqu\'au deuxieme round.' },
        { tipo: 'Moneyline', pick: 'Abdul-Malik (-120)', odds: '-120', confianca: 'media', edge_vs_mercado: 'Prix juste pour un favori avec un avantage significatif en wrestling.', raciocinio: 'Le wrestling d\'Abdul-Malik est l\'avantage le plus tangible du combat. La faible defense de takedown de Belgaroui combinee au wrestling Division I d\'Abdul-Malik rend le prix de -120 accessible et juste.' },
      ],
      armadilha: { titulo: 'Piege: Belgaroui par KO au R1', descricao: 'Malgre l\'impressionnant parcours en kickboxing, Belgaroui n\'a jamais mis KO personne au premier round en MMA de niveau UFC. Ses finitions sont tardives (R3). Parier sur un KO rapide du Neerlandais va a l\'encontre du schema de ses combats. Le plus probable est qu\'Abdul-Malik teste le takedown tot et que Belgaroui ait besoin de temps pour s\'adapter.' },
      disclaimer: 'Analyse statistique a des fins informatives et educatives. Pariez de maniere responsable et dans les limites de vos moyens financiers.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// ES — Spanish
// ═══════════════════════════════════════════════════════════════

const analiseES: FullSingleAnalise = {
  ...sharedMeta,
  titulo: 'Abdul-Malik vs Belgaroui: El Invicto Contra el Asesino del Kickboxing',
  subtitulo: 'El prospecto invicto del wrestling enfrenta al exrival de Pereira y Adesanya en kickboxing',
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de marzo, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 3,
  tactical_breakdown: sharedTacticalBreakdown,
  fight_prediction: {
    ...sharedFightPrediction,
    predictedMethod: 'TKO o Decision',
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Mansur Abdul-Malik',
    record: '9-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Antonio Trocoli', method: 'Sub R1 (guillotina)', event: 'UFC 323' },
      { result: 'D', opponent: 'Cody Brundage', method: 'Empate Mayoritario', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Nick Klein', method: 'TKO R2', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Dusko Todorovic', method: 'TKO R1', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Yousri Belgaroui',
    apelido: 'Baby Face Assassin',
    record: '9-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Azamat Bekoev', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Taiga Iwasaki', method: 'TKO R3', event: 'DWCS' },
      { result: 'W', opponent: 'Giorgi Kvelidze', method: 'TKO R1', event: 'LFL' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de marzo, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Wrestling vs Kickboxing: El Choque de Estilos',
      tagline_sub: 'El prospecto invicto enfrenta al exrival de Pereira y Adesanya en la mas pura guerra de estilos',
      fighter1: {
        ...sharedHeroFighters.fighter1,
        ranking: 'N/R Peso Medio',
        info_extra: 'Columbia, Maryland | 28 anos',
      },
      fighter2: {
        ...sharedHeroFighters.fighter2,
        ranking: 'N/R Peso Medio',
        info_extra: 'Amsterdam, Paises Bajos | 33 anos',
      },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">El Luchador Invicto vs El Striker de Elite</h3>
        <p>Esta pelea trata sobre una pregunta que nunca envejece en el MMA: que pasa cuando un luchador de alto nivel enfrenta a un striker de clase mundial? <strong class="text-ufc-red">Abdul-Malik</strong> trae credenciales legitimas de wrestling Division I de la Universidad de Maryland, donde compitio en peso pesado. Desde su debut en UFC en noviembre de 2024, noqueo a Dusko Todorovic en el primer round, paro a Nick Klein en el segundo, sobrevivio a una controversia contra Cody Brundage (empate mayoritario tras revision de la comision de Georgia), y sometio a Antonio Trocoli con una guillotina de pie en solo 69 segundos.</p>
        <p>Del otro lado, <strong class="text-blue-400">Belgaroui</strong> representa algo raro en el MMA moderno: un kickboxer de elite del circuito Glory que ya enfrento a los mejores del mundo. Hablamos de un hombre que VENCIO a Alex Pereira por decision unanime en 2017, perdio dos veces contra Pereira por el titulo, y enfrento a Israel Adesanya dos veces en kickboxing. A los 33 anos, con 1,98m de altura, Belgaroui finalmente llego al UFC en octubre de 2025 y detuvo a Azamat Bekoev en el tercer round con un TKO convincente.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Conexion con Pereira y el Timing Perfecto</h3>
        <p>Hoy, Belgaroui entrena junto a Alex Pereira en Teixeira MMA & Fitness en Connecticut, bajo la supervision de Glover Teixeira. La ironia? Esta pelea ocurre en la misma cartelera donde Adesanya, otro exadversario de Belgaroui en kickboxing, hace la pelea principal. El holandes ya enfrento tanto a Adesanya como a Pereira, y ahora busca construir su propio legado en MMA.</p>
        <p>Para <strong class="text-ufc-red">Abdul-Malik</strong>, esta es la prueba mas peligrosa de su carrera. Belgaroui es el oponente mas alto, mas experimentado en combate de alto nivel, y con el striking mas refinado que jamas ha enfrentado. Para <strong class="text-blue-400">Belgaroui</strong>, la cuestion es clara: puede el striking de elite sobrevivir al wrestling de elite? O el joven prospecto arrastrara al veterano al suelo y le quitara todas sus armas?</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Primer paso hacia el top 15', fighter2: 'Victoria sobre un invicto = credibilidad instantanea' },
        { dimensao: 'Objetivo', fighter1: 'Mantener el 0 en el record', fighter2: 'Demostrar que pertenece al UFC' },
        { dimensao: 'Narrativa', fighter1: 'Prospecto mas peligroso del peso medio', fighter2: 'Veterano del kickboxing conquista el MMA' },
        { dimensao: 'Riesgo', fighter1: 'Primera derrota contra un striker de elite', fighter2: 'Ser dominado en wrestling en su segunda pelea UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'EL PROSPECTO CONFIRMA EL HYPE',
          subtitulo: 'Abdul-Malik pasa la prueba del striking y demuestra que va en serio',
          consequencias: [
            { tag: 'RECORD', texto: 'Mantiene el invicto y sube a 10-0-1, consolidandose como uno de los nombres mas calientes del peso medio.' },
            { tag: 'RANKING', texto: 'Con 5 victorias consecutivas (4 en UFC), entra en la conversacion para un top 15 en 2026.' },
            { tag: 'NARRATIVA', texto: 'Demuestra versatilidad al vencer a un striker de clase mundial, silenciando dudas sobre su juego de pie.' },
          ],
          proxima_luta: 'Un adversario ranqueado en el top 15, posiblemente alguien como Brendan Allen o Nassourdine Imavov.',
        },
        fighter2_vence: {
          titulo: 'EL BABY FACE ASSASSIN LLEGO PARA QUEDARSE',
          subtitulo: 'Belgaroui demuestra que el kickboxing de elite se traduce al MMA',
          consequencias: [
            { tag: 'CREDIBILIDAD', texto: 'Vencer a un invicto con pedigree de wrestling en apenas su segunda pelea UFC es una declaracion enorme.' },
            { tag: 'RACHA', texto: 'Encadena la quinta victoria consecutiva y gana impulso para peleas mas grandes en peso medio.' },
            { tag: 'LEGADO', texto: 'Exrival de Pereira y Adesanya en kickboxing comienza a escribir su propio capitulo en MMA.' },
          ],
          proxima_luta: 'Un oponente de nivel medio ranqueado, posiblemente alguien como Michel Pereira o Roman Dolidze.',
        },
      },
    },
    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          { date: 'Dic 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1 (guillotina de pie, 1:09)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Trocoli era 0-2 en UFC. Abdul-Malik mostro versatilidad al finalizar con guillotina de pie tras intento de takedown.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Empate Mayoritario (revisado por la comision)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Originalmente gano por decision unanime, pero un choque de cabezas en R3 llevo a revision y empate mayoritario por la comision de Georgia.' },
          { date: 'Feb 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2 (golpes, 3:24)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Klein acepto la pelea como reemplazo de ultimo momento. Abdul-Malik tuvo un primer round complicado pero se recupero y finalizo en el segundo.' },
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (golpes, 2:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Debut en UFC con Performance of the Night. Domino a Todorovic con presion y poder, finalizando en el primer round.' },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Debut UFC. Performance of the Night.' },
          { date: 'Feb 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Klein era reemplazo de ultimo momento.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Empate Mayoritario', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Resultado controvertido tras revision.' },
          { date: 'Dic 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Guillotina de pie en 69 segundos.' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'En Ascenso',
        momentum_trend: 'ascending',
        momentum_note: 'Abdul-Malik esta en una trayectoria clara de ascenso. Tres finalizaciones en cuatro peleas UFC, incluyendo una sumision impresionante contra Trocoli. El empate contra Brundage es el unico signo de interrogacion, pero el contexto (choque de cabezas accidental) explica el resultado. La finalizacion rapida contra Trocoli en diciembre muestra que esta afilado y listo para un salto de calidad en la oposicion.',
      },
      fighter2: {
        nome: 'Yousri Belgaroui',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3 (golpes, 0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Debut UFC en Vancouver. Trabajo con jab largo, absorbio 4 takedowns pero nunca se quedo atrapado en el suelo, y detuvo a Bekoev en el tercer round.' },
          { date: 'Sep 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Contender Series. Victoria por TKO en el tercer round, obteniendo contrato con UFC.' },
          { date: 'Oct 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Levels Fight League. Nocaut rapido en el primer round contra adversario regional.' },
          { date: 'Ago 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Contender Series. Perdio por decision, no consiguio contrato con UFC en el primer intento.' },
        ],
        full_fight_history: [
          { date: '2021', opponent: 'Badreddine Diani', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Debut MMA. UAE Warriors.' },
          { date: '2021', opponent: 'Sallah-Eddine Dekhissi', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'UAE Warriors.' },
          { date: 'Mar 2022', opponent: 'Samir Zaidi', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'UAE Warriors.' },
          { date: 'Jul 2022', opponent: 'Mohamad Osseili', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Primera derrota en MMA. UAE Warriors.' },
          { date: 'Feb 2023', opponent: 'Bogdan Kotlovyanov', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Levels Fight League.' },
          { date: 'Feb 2023', opponent: 'Stefan Pretorius', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'UAE Warriors.' },
          { date: 'Ago 2023', opponent: 'Marco Tulio Silva', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'DWCS. No obtuvo contrato.' },
          { date: 'Oct 2023', opponent: 'Giorgi Kvelidze', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'LFL.' },
          { date: 'Sep 2024', opponent: 'Taiga Iwasaki', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'DWCS. Obtuvo contrato UFC.' },
          { date: 'Oct 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Debut UFC. TKO en el tercer round.' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'En Ascenso',
        momentum_trend: 'ascending',
        momentum_note: 'Belgaroui esta en una racha de cuatro victorias consecutivas, la mejor de su carrera MMA. Su experiencia en kickboxing profesional de alto nivel (27-7 en Glory, con peleas contra Pereira y Adesanya) le da una experiencia de combate que los numeros de MMA no capturan. Su debut en UFC fue solido, mostrando paciencia y tecnica de striker de elite. Lo que falta es experiencia contra luchadores de alto nivel en MMA.',
      },
    },
    nivel_competicao: {
      fighter1: {
        nome: 'Abdul-Malik',
        media_oponentes: 1.5,
        media_oponentes_label: 'Malo',
        aproveitamento: '3W-0L-1D (87%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Belgaroui',
        media_oponentes: 1,
        media_oponentes_label: 'Malo',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'No hay oponentes en comun entre los dos peleadores. Ambos estan al inicio de sus carreras en UFC con pocos datos comparativos directos. Abdul-Malik enfrento oponentes sin ranking en todas sus peleas, al igual que Belgaroui en su unica pelea UFC. La diferencia real esta en los antecedentes: Abdul-Malik viene del wrestling Division I, mientras que Belgaroui trae toda una carrera en kickboxing profesional de alto nivel contra nombres como Alex Pereira e Israel Adesanya.',
    },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { ...sharedStats[0], note: 'Abdul-Malik tiene un volumen altisimo. Belgaroui tiene solo 1 pelea UFC de referencia.' },
        { ...sharedStats[1], note: 'Ambos con precision moderada. Datos de Belgaroui limitados a una pelea.' },
        { ...sharedStats[2], note: 'Abdul-Malik absorbe bastante por el alto volumen que produce.' },
        { ...sharedStats[3], note: 'La defensa de strikes de Abdul-Malik es vulnerable. Belgaroui tiene experiencia de kickboxer.' },
        { ...sharedStats[4], note: 'Abdul-Malik es luchador de formacion. Belgaroui no intento takedowns en UFC.' },
        { ...sharedStats[5], note: 'Abdul-Malik tiene herramientas de wrestling. Belgaroui no es peleador de takedown.' },
        { ...sharedStats[6], note: 'Belgaroui sufrio 4 takedowns contra Bekoev. Numero preocupante contra un luchador real.' },
      ],
      tale_of_tape: [
        { label: 'Edad', fighter1: '28 anos', fighter2: '33 anos', note: 'Abdul-Malik 5 anos mas joven' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,98m (6\'6")', note: 'Belgaroui 10cm mas alto' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '198cm (78")', note: 'Abdul-Malik tiene envergadura MAYOR a pesar de ser mas bajo' },
        { label: 'Guardia', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Gimnasio', fighter1: 'Xtreme Couture (Las Vegas)', fighter2: 'Teixeira MMA & Fitness (Connecticut)', note: 'Ambos en campos de elite' },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 82, valueB: 25, labelA: 'Muy Bueno', labelB: 'Malo', advantage: 'fighter1', advantage_note: 'Abdul-Malik fue luchador Division I en la Universidad de Maryland. Belgaroui es puramente un striker.' },
        { label: 'Striking de Pie', valueA: 60, valueB: 88, labelA: 'Bueno', labelB: 'Muy Bueno', advantage: 'fighter2', advantage_note: 'Belgaroui tiene carrera profesional en Glory con 27 victorias. Nivel tecnico muy superior en el intercambio de golpes.' },
        { label: 'Defensa de Takedown', valueA: 75, valueB: 45, labelA: 'Muy Bueno', labelB: 'Regular', advantage: 'fighter1', advantage_note: 'Belgaroui sufrio 4 takedowns contra Bekoev. Contra un luchador de verdad, sera mucho peor.' },
        { label: 'Control en el Suelo', valueA: 72, valueB: 35, labelA: 'Bueno', labelB: 'Regular', advantage: 'fighter1', advantage_note: 'La base de wrestling le da a Abdul-Malik control superior. Belgaroui aun esta aprendiendo el juego de suelo.' },
        { label: 'Poder de Nocaut', valueA: 78, valueB: 75, labelA: 'Muy Bueno', labelB: 'Muy Bueno', advantage: 'even', advantage_note: 'Ambos tienen poder real. Abdul-Malik con 7 KOs en 9 victorias. Belgaroui con historial de KOs en kickboxing.' },
        { label: 'Cardio y Ritmo', valueA: 68, valueB: 72, labelA: 'Bueno', labelB: 'Bueno', advantage: 'even', advantage_note: 'Belgaroui tiene experiencia en peleas largas de kickboxing. Abdul-Malik tiende a finalizar temprano.' },
      ],
      insight: 'Este enfrentamiento esta definido por la dicotomia clasica wrestling vs striking. Abdul-Malik tiene una ventaja enorme en el suelo y en el clinch, mientras que Belgaroui domina ampliamente a distancia de pie. La pelea sera decidida por quien logre imponer su juego: si Abdul-Malik lo lleva al suelo, domina. Si Belgaroui lo mantiene de pie, tiene las herramientas para ganar.',
    },
    distribuicao_vitorias: {
      fighter1: { nome: 'Abdul-Malik', ...sharedDistribuicaoNumbers.fighter1 },
      fighter2: { nome: 'Belgaroui', ...sharedDistribuicaoNumbers.fighter2 },
      insight: 'Los numeros son casi identicos: ambos tienen 7 nocauts en 9 victorias (78%). La diferencia esta en el complemento: Abdul-Malik tiene 2 sumisiones y cero decisiones, demostrando que SIEMPRE finaliza. Belgaroui nunca ha sometido a nadie, con sus otras dos victorias por decision. Abdul-Malik literalmente nunca ha necesitado a los jueces para ganar. Esto sugiere una pelea con alto potencial de finalizacion, ya que ninguno de los dos es peleador de puntos.',
    },
    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 7, danger_label: 'VENTAJA ABDUL-MALIK', color: 'red', title: 'La Prueba del Takedown', description: 'El primer round va a definir toda la pelea. Abdul-Malik va a probar el takedown temprano y con fuerza. Si logra llevar a Belgaroui al suelo en los primeros dos minutos, puede dominar la pelea desde ahi. Belgaroui necesita sobrevivir los intentos iniciales, mantener distancia con el jab largo y establecer ritmo. La presion de Abdul-Malik en R1 es historicamente muy fuerte, con dos de sus victorias UFC siendo finalizaciones en el primer round.' },
        { rounds: 'R2', danger_level: 6, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Adaptacion y Ajustes', description: 'Si la pelea llega al segundo round, significa que ninguno de los dos logro imponer su juego de forma dominante. Belgaroui tiende a mejorar conforme avanza la pelea, como mostro contra Bekoev, deteniendo al oponente en R3. Abdul-Malik mostro contra Klein que puede recuperarse de un primer round complicado y cerrar en el segundo. Round crucial de adaptacion.' },
        { rounds: 'R3', danger_level: 7, danger_label: 'VENTAJA BELGAROUI', color: 'green', title: 'Territorio del Striker', description: 'Si esta pelea llega al tercer round, la ventaja cambia hacia Belgaroui. Sus dos ultimas victorias (Bekoev e Iwasaki) llegaron justamente en el tercer round. El cardio de kickboxer y la experiencia en rounds tardios favorecen al holandes. Si Abdul-Malik no logro el takedown o la finalizacion en los dos primeros rounds, probablemente estara cansado y vulnerable al striking de elite de Belgaroui.' },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'Brain', title: 'Experiencia en Combate de Alto Nivel', fighter: 'Belgaroui', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Belgaroui enfrento a Alex Pereira tres veces e Israel Adesanya dos veces en kickboxing profesional. Esa experiencia contra peleadores de calibre mundial le da una calma bajo presion que pocos debutantes del UFC poseen. Ya ha visto de todo en terminos de strikes.' },
        { icon: 'Shield', title: 'Defensa de Takedown Preocupante', fighter: 'Belgaroui', risk_level: 'RIESGO ALTO', risk_color: 'red', description: 'Belgaroui sufrio 4 takedowns contra Azamat Bekoev, que no es considerado un luchador de alto nivel. Contra Abdul-Malik, un luchador Division I de verdad, ese numero puede ser mucho peor. La defensa de takedown es la mayor vulnerabilidad de Belgaroui en esta pelea.' },
        { icon: 'TrendingUp', title: 'Curva de Evolucion Rapida', fighter: 'Abdul-Malik', risk_level: 'POSITIVO', risk_color: 'green', description: 'Abdul-Malik muestra evolucion en cada pelea. Noqueo en su debut, detuvo a su oponente en el segundo round en la segunda, y mostro sumision en la cuarta pelea. La versatilidad creciente es senal de un peleador que esta absorbiendo todo en el entrenamiento y aplicandolo en el octagono.' },
        { icon: 'AlertTriangle', title: 'Defensa de Strikes Vulnerable', fighter: 'Abdul-Malik', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'Con solo 49% de defensa de strikes, Abdul-Malik absorbe muchos golpes. Contra un kickboxer de elite como Belgaroui, esto puede ser extremadamente peligroso. El holandes tiene la precision y el poder para capitalizar esta apertura defensiva.' },
        { icon: 'Zap', title: 'Ventaja de Tamano Extrema', fighter: 'Belgaroui', risk_level: 'POSITIVO', risk_color: 'green', description: 'Con 1,98m de altura, Belgaroui es 10cm mas alto que Abdul-Malik. El jab largo y las patadas a distancia se benefician enormemente de esta diferencia. Sin embargo, curiosamente, Abdul-Malik tiene mayor envergadura (203cm vs 198cm), lo que podria neutralizar parte de esa ventaja a media distancia.' },
        { icon: 'Clock', title: 'Poca Experiencia en UFC', fighter: 'Belgaroui', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'Esta sera apenas la segunda pelea de Belgaroui en UFC. A pesar de la vasta experiencia en kickboxing, el MMA del UFC es un animal diferente. La presion, el ritmo, las reglas del octagono: todo es diferente del ring del Glory.' },
        { icon: 'MapPin', title: 'Terreno Neutral en Seattle', fighter: 'Ambos', risk_level: 'NEUTRAL', risk_color: 'neutral', description: 'Seattle es terreno neutral para ambos. Abdul-Malik entrena en Las Vegas y es de Maryland, Belgaroui entrena en Connecticut y es de Amsterdam. Ninguno tendra ventaja significativa de publico.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 55,
        scenarios: [
          { name: 'Dominacion por Wrestling', probability: 25, method: 'Decision Unanime o TKO por ground and pound', description: 'Abdul-Malik presiona desde el inicio, arrincona a Belgaroui contra la jaula, completa takedowns repetidos y controla en el suelo. Con el wrestling superior, puede acumular rounds de control o encontrar un TKO por ground and pound.' },
          { name: 'Finalizacion por Sumision', probability: 12, method: 'Sub R1-R2 (guillotina o RNC)', description: 'Similar a lo que hizo contra Trocoli. Si Belgaroui intenta levantarse de un takedown sin cuidado, Abdul-Malik puede enganchar una guillotina o estrangulamiento. La transicion del wrestling a las sumisiones ha sido un punto de evolucion claro.' },
          { name: 'Nocaut en el Clinch', probability: 10, method: 'TKO R1-R2 (golpes a corta distancia)', description: 'Abdul-Malik tiene poder real en las manos y puede usar el clinch dirty boxing para sacar a Belgaroui de su distancia comoda. A corta distancia, la altura de Belgaroui se convierte en desventaja y el poder de Abdul-Malik prevalece.' },
          { name: 'Guerra de Desgaste', probability: 8, method: 'Decision Dividida', description: 'Escenario donde ninguno logra imponer su juego claramente. Abdul-Malik mezcla takedowns con striking, Belgaroui defiende algunos y conecta de pie. Pelea cerrada decidida en los detalles.' },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 42,
        scenarios: [
          { name: 'Masterclass de Striking', probability: 18, method: 'Decision Unanime', description: 'Belgaroui usa el jab largo, front kicks y teeps para mantener a Abdul-Malik a distancia. Sprawla los takedowns y puntua con combinaciones limpias. La experiencia de kickboxer de elite le permite controlar la distancia durante 15 minutos.' },
          { name: 'Nocaut Tecnico Tardio', probability: 14, method: 'TKO R3 (golpes)', description: 'Patron de las ultimas peleas de Belgaroui: paciencia en los primeros rounds, finalizacion tardia. Si Abdul-Malik gasta energia en takedowns y no logra controlar, Belgaroui puede encontrar el momento para soltar las manos en el tercer round.' },
          { name: 'Contragolpe Devastador', probability: 7, method: 'KO R1-R2', description: 'Abdul-Malik avanza para el takedown con la cabeza baja y Belgaroui conecta un uppercut o rodillazo en el timing perfecto. Riesgo real para quien entra con tanta presion contra un contra-striker entrenado en Glory.' },
          { name: 'Victoria en los Detalles', probability: 3, method: 'Decision Dividida', description: 'Pelea equilibrada donde Belgaroui logra defender suficientes takedowns y conecta los golpes mas significativos, llevandose la decision ajustada.' },
        ],
      },
    },
    previsao_final: {
      winner_name: 'Mansur Abdul-Malik',
      winner_side: 'fighter1',
      predicted_method: 'Decision Unanime o TKO tardio',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Abdul-Malik es el favorito porque tiene la herramienta que mas cambia el rumbo de las peleas en MMA: wrestling de alto nivel. La defensa de takedown de Belgaroui fue preocupante contra Bekoev (sufrio 4 takedowns), y Abdul-Malik es un luchador significativamente mejor. La estrategia mas probable es que Abdul-Malik presione, busque el clinch y los takedowns, y controle en el suelo. Sin embargo, Belgaroui tiene las herramientas para crear problemas serios de pie, y la confianza aqui es MEDIA porque este es el salto de calidad mas significativo para ambos peleadores. Cualquier resultado es posible.',
      x_factor: {
        title: 'El Jab de 1,98m',
        description: 'Belgaroui tiene una de las mayores ventajas de altura del peso medio en UFC. Si logra mantener a Abdul-Malik en la punta del jab e impedir la entrada para el takedown, la ventaja de wrestling se vuelve irrelevante. El jab largo contra un peleador que avanza con la cabeza baja para buscar takedowns puede ser devastador.',
      },
      upset_alert: {
        title: 'Belgaroui TKO R3',
        description: 'Si Abdul-Malik gasta energia en los primeros rounds intentando takedowns sin exito, Belgaroui puede capitalizar en el tercer round con su patron tipico de finalizacion tardia. Las dos ultimas victorias de Belgaroui fueron por TKO en el tercer round, y la fatiga del wrestling puede abrir la guardia de Abdul-Malik para golpes limpios.',
      },
      probabilities: sharedProbabilities,
      value_picks: {
        moneyline: { pick: 'Abdul-Malik (-120)', reasoning: 'El precio de leve favorito es justo. El wrestling tiende a prevalecer en este tipo de choque de estilos.' },
        method: { pick: 'No va a decision', reasoning: 'Ambos tienen tasa de finalizacion de 78% por KO/TKO. Alta probabilidad de nocaut o finalizacion.' },
        over_under: { pick: 'Mas de 1.5 rounds', rounds: 1.5, reasoning: 'Abdul-Malik puede demorar en encontrar el takedown contra el alcance de Belgaroui. Probable que pase del primer round.' },
        best_value: 'Mas de 1.5 rounds es la apuesta mas segura. Ambos son finalizadores, pero Belgaroui tiene experiencia para sobrevivir al primer round.',
      },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'Los Primeros 2 Minutos Definen Todo', icon: 'Clock', description: 'Si Abdul-Malik consigue el primer takedown en los primeros 2 minutos, eso va a dictar el ritmo de toda la pelea. Si Belgaroui sprawla y mantiene de pie, la confianza del holandes va a crecer a cada segundo. Presta atencion al primer intento de takedown: si es exitoso, espera dominacion. Si falla, espera problemas para Abdul-Malik.' },
        { num: 2, title: 'El Jab de Belgaroui como Arma Principal', icon: 'Target', description: 'Con 1,98m y experiencia en kickboxing profesional, Belgaroui tiene uno de los jabs mas largos de la division. Observa si logra mantener a Abdul-Malik en la punta de ese jab. Si el americano esta recibiendo jabs limpios y no logra cerrar distancia, es senal de que Belgaroui esta controlando la pelea.' },
        { num: 3, title: 'Reaccion de Belgaroui al Primer Takedown', icon: 'Shield', description: 'Contra Bekoev, Belgaroui sufrio 4 takedowns pero se levanto relativamente rapido. Contra un luchador Division I como Abdul-Malik, levantarse va a ser mucho mas dificil. Observa COMO reacciona Belgaroui al primer takedown: si logra levantarse en menos de 30 segundos, es buena senal. Si queda atrapado por mas de un minuto, la pelea puede estar definida.' },
        { num: 4, title: 'Fatiga de Wrestling en R3', icon: 'Activity', description: 'Si la pelea llega al tercer round, observa el nivel de energia de Abdul-Malik. El wrestling ofensivo gasta mucha energia, y si intento multiples takedowns en los dos primeros rounds, puede estar vulnerable. Las dos ultimas victorias de Belgaroui llegaron justamente en R3, entonces el tercer round es el momento de mayor peligro para Abdul-Malik.' },
        { num: 5, title: 'El Factor Pereira/Teixeira en la Esquina', icon: 'Brain', description: 'Belgaroui entrena diariamente con Alex Pereira y Glover Teixeira. Esto significa que probablemente practico defensa de takedown contra luchadores de alto nivel en el campo de entrenamiento. Observa si los ajustes de esquina entre rounds reflejan una preparacion especifica contra wrestling, con sprawls y trabajo de jaula.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LUCHADOR vs KICKBOXER', content: 'Abdul-Malik (9-0-1) vs Belgaroui (9-3)\n\nEl prospecto invicto del wrestling\ncontra el exrival de Pereira en Glory\n\nUFC Seattle | 28 de marzo', color: 'gold' },
        { slide_number: 2, title: 'ABDUL-MALIK', content: '7 nocauts en 9 victorias (78%)\nLuchador Division I (Maryland)\n3 finalizaciones en 4 peleas UFC\nGuillotina de pie en 69 segundos\n\nEntrena en Xtreme Couture', color: 'red' },
        { slide_number: 3, title: 'BELGAROUI', content: '27-7 en kickboxing profesional (Glory)\nYa VENCIO a Alex Pereira\nYa enfrento a Israel Adesanya 2x\n1,98m de altura\n\nEntrena con Pereira en Teixeira MMA', color: 'blue' },
        { slide_number: 4, title: 'LA CLAVE DE LA PELEA', content: 'Si Abdul-Malik lo lleva al suelo = domina\nSi Belgaroui lo mantiene de pie = peligro\n\nBelgaroui sufrio 4 TDs en su debut\nContra un luchador de verdad...\n\nPrediccion: Abdul-Malik (55%)', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Abdul-Malik vs Belgaroui es el choque de estilos mas puro de la cartelera de Seattle. Un luchador invicto contra el tipo que YA VENCIO a Alex Pereira en kickboxing. Hilo rapido:' },
        { num: '2/5', text: 'Abdul-Malik: 9-0-1, CERO decisiones. Este tipo SIEMPRE finaliza. 7 KOs + 2 subs. Luchador Division I de Maryland que noquea en MMA. Guillotina de pie en 69 segundos en su ultima pelea. El hype es real.' },
        { num: '3/5', text: 'Belgaroui: 1,98m, 27-7 en Glory, entrena con Pereira y Glover Teixeira. Pero... sufrio 4 takedowns contra Bekoev en su debut. Contra un luchador Division I, ese numero puede duplicarse.' },
        { num: '4/5', text: 'El X-Factor: el jab de 1,98m. Si Belgaroui logra mantener a Abdul-Malik a distancia con ese jab de kickboxer de elite, puede frustrar todo el wrestling. Si no lo logra, va al suelo y es noche larga.' },
        { num: '5/5', text: 'Mi prediccion: Abdul-Malik por decision o TKO tardio (55/42). El wrestling va a ser dificil de negar. Pero si llega al R3 con Belgaroui de pie, cuidado. Las dos ultimas victorias del holandes fueron TKO en R3.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Conocen al tipo que VENCIO a Alex Pereira en kickboxing? Pues ahora pelea en UFC, y este sabado enfrenta a un luchador invicto que nunca necesito de los jueces para ganar.' },
        { time: '10-25s', title: 'Contexto', text: 'Abdul-Malik tiene 9-0-1 con 7 nocauts y 2 sumisiones. Cero decisiones. Luchador Division I. Del otro lado, Belgaroui es un kickboxer del Glory con 27 victorias, que ya peleo contra Pereira Y Adesanya. Y hoy entrena con los dos.' },
        { time: '25-45s', title: 'Analisis', text: 'La clave es simple: si Abdul-Malik lo lleva al suelo, domina. Si Belgaroui lo mantiene de pie, peligro. El problema? Belgaroui sufrio 4 takedowns en su debut contra Bekoev, que no es luchador de verdad. Contra Abdul-Malik, un luchador Division I entrenando en Xtreme Couture... la matematica no pinta bien para el holandes.' },
        { time: '45-60s', title: 'Prediccion & CTA', text: 'Mi prediccion: Abdul-Malik por decision o TKO tardio, 55 a 42. Pero cuidado con el R3, que es donde Belgaroui despierta. A quien le van en esta? Comenten!' },
      ],
      tiktok: [
        { hook: 'El tipo que VENCIO a Pereira en kickboxing esta en UFC ahora.', body: 'Belgaroui vencio a Pereira en 2017 y enfrento a Adesanya dos veces. Ahora enfrenta a un luchador invicto que NUNCA fue a decision. Abdul-Malik tiene 7 KOs en 9 peleas y un wrestling Division I asesino.', cta: 'Quien gana: el striker de elite o el luchador invicto? Comenta!' },
        { hook: '69 segundos. Ese fue el tiempo de la ultima pelea de Abdul-Malik.', body: 'Guillotina de pie en el primer round. Antes de eso, TKO R1 en su debut, TKO R2 en la segunda. Este tipo es una maquina de finalizacion. Ahora enfrenta a un kickboxer del Glory de 1,98m que entrena con Pereira.', cta: 'Abdul-Malik mantiene el invicto o Belgaroui sorprende?' },
        { hook: '1,98m. Ese es el tamano del tipo que Abdul-Malik va a enfrentar.', body: 'Belgaroui es gigante para el peso medio, tiene experiencia en Glory contra los mejores del mundo, y entrena con Pereira y Glover. Pero sufrio 4 takedowns en su debut. Contra un luchador Division I? Buena suerte.', cta: 'Tamano o wrestling? Cual prevalece en MMA? Comenta!' },
      ],
      headlines: [
        'Abdul-Malik vs Belgaroui: El Invicto Contra el Asesino del Kickboxing',
        'Exrival de Pereira enfrenta la mayor prueba en UFC contra luchador Division I',
        'Abdul-Malik busca mantener el invicto contra gigante del Glory en Seattle',
        'El tipo que vencio a Pereira en kickboxing puede sobrevivir al wrestling de elite?',
        'Choque de estilos puro: wrestling Division I vs kickboxing Glory en UFC Seattle',
        'Belgaroui, companero de entrenamiento de Pereira, enfrenta la prueba de fuego contra luchador invicto',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...sharedOdds, source: 'Promedio de casas de apuestas (marzo 2026)' },
      edges: [
        { icon: 'Target', titulo: 'Wrestling como Diferencial', stat_headline: 'ABDUL-MALIK: LUCHADOR DIVISION I CON 82% DE DEFENSA DE TAKEDOWN', contexto: 'Abdul-Malik trae pedigree de wrestling Division I de la Universidad de Maryland. Su capacidad de llevar la pelea al suelo y controlar ahi es vastamente superior a la de cualquier oponente que Belgaroui haya enfrentado en MMA.', implicacao_aposta: 'Favorece a Abdul-Malik por decision o TKO por ground and pound.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defensa de Takedown de Belgaroui', stat_headline: 'BELGAROUI SUFRIO 4 TAKEDOWNS CONTRA BEKOEV EN SU DEBUT', contexto: 'Bekoev no es considerado un luchador de alto nivel. Si Belgaroui sufrio 4 takedowns contra el, los numeros contra un luchador Division I pueden ser mucho peores.', implicacao_aposta: 'Refuerza la tesis de Abdul-Malik dominando en el suelo. Reduce la confianza en Belgaroui por moneyline.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Background de Kickboxing de Elite', stat_headline: '27-7 EN GLORY CON VICTORIA SOBRE ALEX PEREIRA', contexto: 'Belgaroui tiene experiencia de alto nivel contra los mejores strikers del mundo. La calma y la tecnica de pie son de nivel incomparable para esta etapa de carrera en UFC.', implicacao_aposta: 'Si la pelea se mantiene de pie, Belgaroui tiene ventaja tecnica significativa. Props de KO de Belgaroui pueden tener valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Patron de Finalizacion Tardia de Belgaroui', stat_headline: 'ULTIMAS 2 VICTORIAS POR TKO EN EL ROUND 3', contexto: 'Tanto contra Bekoev como contra Iwasaki, Belgaroui finalizo en el tercer round. Esto sugiere que es un peleador de ritmo lento que mejora conforme avanza la pelea.', implicacao_aposta: 'Props de Belgaroui por TKO R3 pueden tener valor como apuesta de riesgo.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Flame', titulo: 'Tasa de Finalizacion Combinada', stat_headline: 'AMBOS TIENEN 78% DE VICTORIAS POR KO/TKO', contexto: 'Abdul-Malik nunca fue a decision. Belgaroui finaliza con frecuencia. Ambos son peleadores que buscan finalizar, no puntuar.', implicacao_aposta: 'Pelea con gran chance de no ir a decision. El mercado de "no va a la distancia" puede tener valor.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Duracion', pick: 'La pelea no va a decision', odds: '-130 (estimado)', confianca: 'alta', edge_vs_mercado: 'Ambos finalizan en 78% de las peleas. Abdul-Malik NUNCA fue a decision.', raciocinio: 'Con Abdul-Malik teniendo cero decisiones en 9 victorias y Belgaroui finalizando la mayoria de sus peleas, la probabilidad de finalizacion es muy alta. La combinacion de wrestling agresivo con striking de elite casi siempre produce una finalizacion.' },
        { tipo: 'Over/Under', pick: 'Mas de 1.5 Rounds', odds: '-160 (estimado)', confianca: 'media', edge_vs_mercado: 'Belgaroui sobrevivio 3 rounds contra Bekoev. Abdul-Malik necesito 2 rounds para detener a Klein.', raciocinio: 'A pesar de que ambos son finalizadores, Belgaroui tiene experiencia suficiente para sobrevivir al primer round. El alcance y la defensa basica deberian mantenerlo de pie al menos hasta el segundo round.' },
        { tipo: 'Moneyline', pick: 'Abdul-Malik (-120)', odds: '-120', confianca: 'media', edge_vs_mercado: 'Precio justo para favorito con ventaja significativa de wrestling.', raciocinio: 'El wrestling de Abdul-Malik es la ventaja mas tangible de la pelea. La debil defensa de takedown de Belgaroui combinada con el wrestling Division I de Abdul-Malik hace que el precio de -120 sea accesible y justo.' },
      ],
      armadilha: { titulo: 'Trampa: Belgaroui por KO en R1', descricao: 'A pesar del impresionante background en kickboxing, Belgaroui nunca ha noqueado a nadie en el primer round en MMA a nivel UFC. Sus finalizaciones son tardias (R3). Apostar por un KO rapido del holandes va en contra del patron de sus peleas. Lo mas probable es que Abdul-Malik pruebe el takedown temprano y Belgaroui necesite tiempo para adaptarse.' },
      disclaimer: 'Analisis estadistico con fines informativos y educativos. Apueste con responsabilidad y dentro de sus limites financieros.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// LOCALE MAP + PAGE
// ═══════════════════════════════════════════════════════════════

const analises: Record<string, FullSingleAnalise> = {
  pt: analisePT,
  en: analiseEN,
  fr: analiseFR,
  es: analiseES,
};

function PageContent() {
  const locale = useLocale();
  return <FullAnalysisView analise={analises[locale] || analisePT} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
