'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analise: FullSingleAnalise = {
  id: 'abdul-malik-vs-belgaroui',
  evento_id: null,
  slug: 'abdul-malik-vs-belgaroui',
  titulo: 'Abdul-Malik vs Belgaroui: O Invicto Contra o Assassino de Kickboxers',
  subtitulo: 'Prospect invicto do wrestling enfrenta ex-rival de Pereira e Adesanya no kickboxing',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,88m', envergadura: '203cm', idade: 28, academia: 'Xtreme Couture' },
      fighter2: { altura: '1,98m', envergadura: '198cm', idade: 33, academia: 'Teixeira MMA & Fitness' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'TKO ou Decisao',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
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
    // ===========================
    // Section 1: HERO
    // ===========================
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
        nome_completo: 'Mansur Abdul-Malik',
        apelido: '',
        sobrenome: 'Abdul-Malik',
        record: '9-0-1',
        ranking: 'N/R Peso Medio',
        info_extra: 'Columbia, Maryland | 28 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/ABDUL-MALIK_MANSUR_L_12-06.png?itok=r58rf4-K',
      },
      fighter2: {
        nome_completo: 'Yousri "Baby Face Assassin" Belgaroui',
        apelido: 'Baby Face Assassin',
        sobrenome: 'Belgaroui',
        record: '9-3-0',
        ranking: 'N/R Peso Medio',
        info_extra: 'Amsterdam, Holanda | 33 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/BELGAROUI_YOUSRI_R_10-18.png?itok=g7i7Fdzt',
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
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

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          {
            date: 'Dez 2025',
            opponent: 'Antonio Trocoli',
            result: 'W',
            method: 'Sub R1 (guilhotina em pe, 1:09)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Trocoli era 0-2 no UFC. Abdul-Malik mostrou versatilidade ao finalizar com guilhotina em pe apos tentativa de takedown.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Cody Brundage',
            result: 'D',
            method: 'Draw Majoritario (revisado pela comissao)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Originalmente venceu por decisao unanime, mas choque de cabecas no R3 levou a revisao e empate majoritario pela comissao da Georgia.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Nick Klein',
            result: 'W',
            method: 'TKO R2 (socos, 3:24)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Klein aceitou a luta como substituto de curto prazo. Abdul-Malik teve um primeiro round complicado, mas se recuperou e finalizou no segundo.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Dusko Todorovic',
            result: 'W',
            method: 'TKO R1 (socos, 2:44)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC com Performance of the Night. Dominou Todorovic com pressao e poder, finalizando no primeiro round.',
          },
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
          {
            date: 'Out 2025',
            opponent: 'Azamat Bekoev',
            result: 'W',
            method: 'TKO R3 (socos, 0:55)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia no UFC em Vancouver. Trabalhou com jab longo, absorveu 4 takedowns mas nunca ficou preso no chao, e parou Bekoev no terceiro round.',
          },
          {
            date: 'Set 2024',
            opponent: 'Taiga Iwasaki',
            result: 'W',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Contender Series. Vitoria por TKO no terceiro round, garantindo contrato com o UFC.',
          },
          {
            date: 'Out 2023',
            opponent: 'Giorgi Kvelidze',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Levels Fight League. Nocaute rapido no primeiro round contra adversario regional.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Marco Tulio Silva',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Contender Series. Perdeu por decisao, nao conseguiu contrato com o UFC na primeira tentativa.',
          },
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

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
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

    // ===========================
    // Section 5: OPONENTE COMUM
    // ===========================
    oponente_comum: null,

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.29, valueB: 3.50, maxVal: 7, format: 'decimal', note: 'Abdul-Malik tem volume altissimo. Belgaroui tem apenas 1 luta no UFC para referencia.' },
        { label: 'Precisao de Strikes (%)', valueA: 54, valueB: 50, maxVal: 100, format: 'percent', note: 'Ambos com precisao moderada. Dados de Belgaroui limitados a uma luta.' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.50, valueB: 3.00, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Abdul-Malik absorve bastante pelo volume alto que produz.' },
        { label: 'Defesa de Strikes (%)', valueA: 49, valueB: 55, maxVal: 100, format: 'percent', note: 'Defesa de strikes de Abdul-Malik e vulneravel. Belgaroui tem background de kickboxer.' },
        { label: 'Takedowns por 15 Min', valueA: 2.50, valueB: 0.00, maxVal: 5, format: 'decimal', note: 'Abdul-Malik e wrestler por formacao. Belgaroui nao tentou takedowns no UFC.' },
        { label: 'Precisao de Takedown (%)', valueA: 50, valueB: 0, maxVal: 100, format: 'percent', note: 'Abdul-Malik tem ferramentas de wrestling. Belgaroui nao e lutador de takedown.' },
        { label: 'Defesa de Takedown (%)', valueA: 82, valueB: 50, maxVal: 100, format: 'percent', note: 'Belgaroui sofreu 4 takedowns contra Bekoev. Numero preocupante contra um wrestler real.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '28 anos', fighter2: '33 anos', note: 'Abdul-Malik 5 anos mais novo' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,98m (6\'6")', note: 'Belgaroui 10cm mais alto' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '198cm (78")', note: 'Abdul-Malik tem envergadura MAIOR apesar de ser mais baixo' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Xtreme Couture (Las Vegas)', fighter2: 'Teixeira MMA & Fitness (Connecticut)', note: 'Ambos em camps de elite' },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
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

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Abdul-Malik',
        ko_tko: { count: 7, percent: 78 },
        submission: { count: 2, percent: 22 },
        decision: { count: 0, percent: 0 },
        total_wins: 9,
      },
      fighter2: {
        nome: 'Belgaroui',
        ko_tko: { count: 7, percent: 78 },
        submission: { count: 0, percent: 0 },
        decision: { count: 2, percent: 22 },
        total_wins: 9,
      },
      insight: 'Os numeros sao quase espelhados: ambos tem 7 nocautes em 9 vitorias (78%). A diferenca esta no complemento: Abdul-Malik tem 2 submissoes e zero decisoes, provando que SEMPRE finaliza. Belgaroui nunca finalizou por submissao, com suas duas outras vitorias por decisao. Abdul-Malik literalmente nunca precisou dos juizes para vencer. Isso sugere uma luta com alto potencial de finalizacao, ja que nenhum dos dois e lutador de pontos.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM ABDUL-MALIK',
          color: 'red',
          title: 'O Teste do Takedown',
          description: 'O primeiro round vai definir a luta inteira. Abdul-Malik vai testar o takedown cedo e com forca. Se conseguir levar Belgaroui ao chao nos primeiros dois minutos, pode dominar a luta dali em diante. Belgaroui precisa sobreviver as tentativas iniciais, manter distancia com o jab longo e estabelecer ritmo. A pressao de Abdul-Malik no R1 e historicamente muito forte, com duas de suas vitorias no UFC sendo finalizacoes no primeiro round.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Adaptacao e Ajustes',
          description: 'Se a luta chegar ao segundo round, significa que nenhum dos dois conseguiu impor seu jogo de forma dominante. Belgaroui tende a melhorar conforme a luta avanca, como mostrou contra Bekoev, parando o oponente no R3. Abdul-Malik mostrou contra Klein que pode se recuperar de um primeiro round complicado e fechar no segundo. Round crucial de adaptacao.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM BELGAROUI',
          color: 'green',
          title: 'Territorio do Striker',
          description: 'Se essa luta chegar ao terceiro round, a vantagem muda para Belgaroui. Suas duas ultimas vitorias (Bekoev e Iwasaki) vieram justamente no terceiro round. O cardio de kickboxer e a experiencia em rounds tardios favorecem o holandes. Se Abdul-Malik nao conseguiu o takedown ou a finalizacao nos dois primeiros rounds, provavelmente estara cansado e vulneravel ao striking de elite de Belgaroui.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        {
          icon: 'Brain',
          title: 'Experiencia em Combate de Alto Nivel',
          fighter: 'Belgaroui',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Belgaroui enfrentou Alex Pereira tres vezes e Israel Adesanya duas vezes no kickboxing profissional. Essa experiencia contra lutadores de calibre mundial da a ele uma calma sob pressao que poucos estreantes do UFC possuem. Ele ja viu de tudo em termos de strikes.',
        },
        {
          icon: 'Shield',
          title: 'Defesa de Takedown Preocupante',
          fighter: 'Belgaroui',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Belgaroui sofreu 4 takedowns contra Azamat Bekoev, que nao e considerado um wrestler de alto nivel. Contra Abdul-Malik, um wrestler Division I de verdade, esse numero pode ser muito pior. A defesa de takedown e a maior vulnerabilidade de Belgaroui nessa luta.',
        },
        {
          icon: 'TrendingUp',
          title: 'Curva de Evolucao Rapida',
          fighter: 'Abdul-Malik',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Abdul-Malik mostra evolucao a cada luta. Nocauteou na estreia, parou no segundo round na segunda, e mostrou submissao na quarta luta. A versatilidade crescente e um sinal de um lutador que esta absorvendo tudo no treino e aplicando no octogono.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Defesa de Strikes Vulneravel',
          fighter: 'Abdul-Malik',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Com apenas 49% de defesa de strikes, Abdul-Malik absorve muitos golpes. Contra um kickboxer de elite como Belgaroui, isso pode ser extremamente perigoso. O holandes tem precisao e poder para capitalizar essa abertura defensiva.',
        },
        {
          icon: 'Zap',
          title: 'Vantagem de Tamanho Extrema',
          fighter: 'Belgaroui',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Com 1,98m de altura, Belgaroui e 10cm mais alto que Abdul-Malik. O jab longo e os chutes de distancia se beneficiam enormemente dessa diferenca. Porem, curiosamente, Abdul-Malik tem envergadura maior (203cm vs 198cm), o que pode neutralizar parte dessa vantagem em distancias medias.',
        },
        {
          icon: 'Clock',
          title: 'Pouca Experiencia no UFC',
          fighter: 'Belgaroui',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Essa sera apenas a segunda luta de Belgaroui no UFC. Apesar da vasta experiencia no kickboxing, o MMA do UFC e um animal diferente. A pressao, o ritmo, as regras do octogono: tudo e diferente do ringue do Glory.',
        },
        {
          icon: 'MapPin',
          title: 'Terreno Neutro em Seattle',
          fighter: 'Ambos',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'Seattle e terreno neutro para ambos. Abdul-Malik treina em Las Vegas e e de Maryland, Belgaroui treina em Connecticut e e de Amsterdam. Nenhum tera vantagem de torcida significativa.',
        },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 55,
        scenarios: [
          {
            name: 'Dominacao por Wrestling',
            probability: 25,
            method: 'Decisao Unanime ou TKO por ground and pound',
            description: 'Abdul-Malik pressiona desde o inicio, encosta Belgaroui na grade, completa takedowns repetidos e controla no chao. Com o wrestling superior, pode acumular rounds de controle ou encontrar um TKO por ground and pound.',
          },
          {
            name: 'Finalizacao por Submissao',
            probability: 12,
            method: 'Sub R1-R2 (guilhotina ou RNC)',
            description: 'Similar ao que fez contra Trocoli. Se Belgaroui tentar se levantar de um takedown sem cuidado, Abdul-Malik pode encaixar uma guilhotina ou estrangulamento. A transicao do wrestling para submissoes tem sido um ponto de evolucao claro.',
          },
          {
            name: 'Nocaute no Clinch',
            probability: 10,
            method: 'TKO R1-R2 (socos na curta distancia)',
            description: 'Abdul-Malik tem poder real nas maos e pode usar o clinch dirty boxing para tirar Belgaroui da distancia confortavel. Na distancia curta, a altura de Belgaroui se torna desvantagem e o poder de Abdul-Malik prevalece.',
          },
          {
            name: 'Guerra de Atrito',
            probability: 8,
            method: 'Decisao Dividida',
            description: 'Cenario onde nenhum consegue impor seu jogo claramente. Abdul-Malik mistura takedowns com striking, Belgaroui defende alguns e conecta em pe. Luta apertada decidida nos detalhes.',
          },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 42,
        scenarios: [
          {
            name: 'Masterclass de Striking',
            probability: 18,
            method: 'Decisao Unanime',
            description: 'Belgaroui usa o jab longo, front kicks e teeps para manter Abdul-Malik na distancia. Sprawla os takedowns e pontua com combinacoes limpas. Experiencia de kickboxer de elite permite que ele controle a distancia por 15 minutos.',
          },
          {
            name: 'Nocaute Tecnico Tardio',
            probability: 14,
            method: 'TKO R3 (socos)',
            description: 'Padrao das ultimas lutas de Belgaroui: paciencia nos primeiros rounds, finalizacao tardia. Se Abdul-Malik gastar energia em takedowns e nao conseguir controlar, Belgaroui pode encontrar o momento para soltar as maos no terceiro round.',
          },
          {
            name: 'Counter Devastador',
            probability: 7,
            method: 'KO R1-R2',
            description: 'Abdul-Malik avanca para o takedown com a cabeca baixa e Belgaroui conecta um uppercut ou joelhada no timing perfeito. Risco real para quem entra com tanta pressao contra um counter-striker treinado no Glory.',
          },
          {
            name: 'Vitoria nos Detalhes',
            probability: 3,
            method: 'Decisao Dividida',
            description: 'Luta equilibrada onde Belgaroui consegue defender takedowns suficientes e conecta os golpes mais significativos, levando a decisao apertada.',
          },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
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
      probabilities: {
        fighter1: { nome: 'Abdul-Malik', percent: 55 },
        fighter2: { nome: 'Belgaroui', percent: 42 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Abdul-Malik (-120)', reasoning: 'O preco de favorito leve e justo. Wrestling tende a prevalecer nesse tipo de confronto de estilos.' },
        method: { pick: 'Nao vai a decisao', reasoning: 'Ambos tem taxa de finalizacao de 78% por KO/TKO. Alta probabilidade de nocaute ou finalizacao.' },
        over_under: { pick: 'Over 1.5 rounds', rounds: 1.5, reasoning: 'Abdul-Malik pode demorar para encontrar o takedown contra o alcance de Belgaroui. Provavel que passe do primeiro round.' },
        best_value: 'Over 1.5 rounds e a aposta mais segura. Ambos sao finalizadores, mas Belgaroui tem experiencia para sobreviver ao primeiro round.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Os Primeiros 2 Minutos Definem Tudo',
          icon: 'Clock',
          description: 'Se Abdul-Malik conseguir o primeiro takedown nos primeiros 2 minutos, isso vai ditar o ritmo da luta inteira. Se Belgaroui sprawlar e manter em pe, a confianca do holandes vai crescer a cada segundo. Preste atencao na primeira tentativa de takedown: se for bem sucedida, espere dominacao. Se falhar, espere problemas para Abdul-Malik.',
        },
        {
          num: 2,
          title: 'O Jab de Belgaroui como Arma Principal',
          icon: 'Target',
          description: 'Com 1,98m e background de kickboxing profissional, Belgaroui tem um dos jabs mais longos da divisao. Observe se ele consegue manter Abdul-Malik na ponta desse jab. Se o americano estiver tomando jabs limpos e nao conseguindo fechar distancia, e sinal de que Belgaroui esta controlando a luta.',
        },
        {
          num: 3,
          title: 'Reacao de Belgaroui ao Primeiro Takedown',
          icon: 'Shield',
          description: 'Contra Bekoev, Belgaroui sofreu 4 takedowns mas se levantou relativamente rapido. Contra um wrestler Division I como Abdul-Malik, levantar vai ser muito mais dificil. Observe COMO Belgaroui reage ao primeiro takedown: se conseguir se levantar em menos de 30 segundos, e um boa sinal. Se ficar preso por mais de um minuto, a luta pode estar definida.',
        },
        {
          num: 4,
          title: 'Fadiga de Wrestling no R3',
          icon: 'Activity',
          description: 'Se a luta chegar ao terceiro round, observe o nivel de energia de Abdul-Malik. Wrestlling ofensivo gasta muita energia, e se ele tentou multiplos takedowns nos dois primeiros rounds, pode estar vulneravel. As duas ultimas vitorias de Belgaroui vieram justamente no R3, entao o terceiro round e o momento de maior perigo para Abdul-Malik.',
        },
        {
          num: 5,
          title: 'O Fator Pereira/Teixeira no Corner',
          icon: 'Brain',
          description: 'Belgaroui treina diariamente com Alex Pereira e Glover Teixeira. Isso significa que ele provavelmente praticou defesa de takedown contra wrestlers de alto nivel no camp. Observe se os ajustes de corner entre rounds refletem uma preparacao especifica contra wrestling, com sprawls e trabalho de grade.',
        },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'WRESTLER vs KICKBOXER',
          content: 'Abdul-Malik (9-0-1) vs Belgaroui (9-3)\n\nO prospect invicto do wrestling\ncontra o ex-rival de Pereira no Glory\n\nUFC Seattle | 28 de Marco',
          color: 'gold',
        },
        {
          slide_number: 2,
          title: 'ABDUL-MALIK',
          content: '7 nocautes em 9 vitorias (78%)\nWrestler Division I (Maryland)\n3 finalizacoes em 4 lutas no UFC\nGuilhotina em pe em 69 segundos\n\nTreina na Xtreme Couture',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'BELGAROUI',
          content: '27-7 no kickboxing profissional (Glory)\nJa VENCEU Alex Pereira\nJa enfrentou Israel Adesanya 2x\n1,98m de altura\n\nTreina com Pereira na Teixeira MMA',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'A CHAVE DA LUTA',
          content: 'Se Abdul-Malik levar ao chao = domina\nSe Belgaroui mantiver em pe = perigo\n\nBelgaroui sofreu 4 TDs na estreia\nContra um wrestler de verdade...\n\nPrevisao: Abdul-Malik (55%)',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/5',
          text: 'Abdul-Malik vs Belgaroui e o choque de estilos mais puro do card de Seattle. Um wrestler invicto contra o cara que JA VENCEU Alex Pereira no kickboxing. Thread rapida:',
        },
        {
          num: '2/5',
          text: 'Abdul-Malik: 9-0-1, ZERO decisoes. Esse cara SEMPRE finaliza. 7 KOs + 2 subs. Wrestler Division I pela Maryland que nocauteia no MMA. Guilhotina em pe de 69 segundos na ultima luta. O hype e real.',
        },
        {
          num: '3/5',
          text: 'Belgaroui: 1,98m, 27-7 no Glory, treina com Pereira e Glover Teixeira. Mas... sofreu 4 takedowns contra Bekoev na estreia. Contra um wrestler Division I, esse numero pode ser o dobro.',
        },
        {
          num: '4/5',
          text: 'O X-Factor: o jab de 1,98m. Se Belgaroui conseguir manter Abdul-Malik na distancia com aquele jab de kickboxer de elite, pode frustrar o wrestling inteiro. Se nao conseguir, vai pro chao e e noite longa.',
        },
        {
          num: '5/5',
          text: 'Minha previsao: Abdul-Malik por decisao ou TKO tardio (55/42). O wrestling vai ser dificil de negar. Mas se chegar ao R3 com Belgaroui em pe, cuidado. As duas ultimas vitorias do holandes foram TKO no R3.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: 'Voces conhecem o cara que VENCEU Alex Pereira no kickboxing? Pois e, ele agora luta no UFC, e nesse sabado enfrenta um wrestler invicto que nunca precisou dos juizes pra vencer.',
        },
        {
          time: '10-25s',
          title: 'Contexto',
          text: 'Abdul-Malik tem 9-0-1 com 7 nocautes e 2 finalizacoes. Zero decisoes. E wrestler Division I. Do outro lado, Belgaroui e um kickboxer do Glory com 27 vitorias, que ja lutou contra Pereira E Adesanya. E hoje treina com os dois.',
        },
        {
          time: '25-45s',
          title: 'Analise',
          text: 'A chave e simples: se Abdul-Malik levar ao chao, domina. Se Belgaroui manter em pe, perigo. O problema? Belgaroui sofreu 4 takedowns na estreia contra Bekoev, que nao e wrestler de verdade. Contra Abdul-Malik, um wrestler Division I treinando na Xtreme Couture... a matematica nao e boa pro holandes.',
        },
        {
          time: '45-60s',
          title: 'Previsao e CTA',
          text: 'Minha previsao: Abdul-Malik por decisao ou TKO tardio, 55 a 42. Mas cuidado com o R3, que e onde Belgaroui acorda. Quem voces tem nessa? Comenta ai!',
        },
      ],
      tiktok: [
        {
          hook: 'O cara que VENCEU Pereira no kickboxing ta no UFC agora.',
          body: 'Belgaroui venceu Pereira em 2017 e enfrentou Adesanya duas vezes. Agora enfrenta um wrestler invicto que NUNCA foi pra decisao. Abdul-Malik tem 7 KOs em 9 lutas e um wrestling Division I assassino.',
          cta: 'Quem vence: o striker de elite ou o wrestler invicto? Comenta!',
        },
        {
          hook: '69 segundos. Esse foi o tempo da ultima luta de Abdul-Malik.',
          body: 'Guilhotina em pe no primeiro round. Antes disso, TKO R1 na estreia, TKO R2 na segunda. Esse cara e uma maquina de finalizacao. Agora enfrenta um kickboxer do Glory de 1,98m que treina com Pereira.',
          cta: 'Abdul-Malik mantem o invicto ou Belgaroui surpreende?',
        },
        {
          hook: '1,98m. Esse e o tamanho do cara que Abdul-Malik vai enfrentar.',
          body: 'Belgaroui e gigante pro peso medio, tem experiencia no Glory contra os melhores do mundo, e treina com Pereira e Glover. Mas sofreu 4 takedowns na estreia. Contra um wrestler Division I? Boa sorte.',
          cta: 'Tamanho ou wrestling? Qual prevalece no MMA? Comenta!',
        },
      ],
      headlines: [
        'Abdul-Malik vs Belgaroui: O Wrestler Invicto Contra o Assassino de Kickboxers',
        'Ex-rival de Pereira enfrenta maior teste no UFC contra wrestler Division I',
        'Abdul-Malik busca manter invicto contra gigante do Glory em Seattle',
        'O cara que venceu Pereira no kickboxing pode sobreviver ao wrestling de elite?',
        'Choque de estilos puro: wrestling Division I vs kickboxing Glory no UFC Seattle',
        'Belgaroui, o parceiro de treino de Pereira, enfrenta a prova de fogo contra wrestler invicto',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE (null) + RADAR DO APOSTADOR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-120',
        fighter2_odds: '+105',
        fighter1_name: 'Mansur Abdul-Malik',
        fighter2_name: 'Yousri Belgaroui',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        {
          icon: 'Target',
          titulo: 'Wrestling como Diferencial',
          stat_headline: 'ABDUL-MALIK: WRESTLER DIVISION I COM 82% DE DEFESA DE TAKEDOWN',
          contexto: 'Abdul-Malik traz pedigree de wrestling Division I pela University of Maryland. Sua capacidade de levar a luta ao chao e controlar ali e vastamente superior a qualquer oponente que Belgaroui ja enfrentou no MMA.',
          implicacao_aposta: 'Favorece Abdul-Malik por decisao ou TKO por ground and pound.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Shield',
          titulo: 'Defesa de Takedown de Belgaroui',
          stat_headline: 'BELGAROUI SOFREU 4 TAKEDOWNS CONTRA BEKOEV NA ESTREIA',
          contexto: 'Bekoev nao e considerado um wrestler de alto nivel. Se Belgaroui sofreu 4 takedowns contra ele, os numeros contra um wrestler Division I podem ser muito piores.',
          implicacao_aposta: 'Reforco para a tese de Abdul-Malik dominando no chao. Reduz a confianca em Belgaroui por moneyline.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Zap',
          titulo: 'Background de Kickboxing de Elite',
          stat_headline: '27-7 NO GLORY COM VITORIA SOBRE ALEX PEREIRA',
          contexto: 'Belgaroui tem experiencia de alto nivel contra os melhores strikers do mundo. A calma e a tecnica em pe sao de nivel incomparavel para essa etapa de carreira no UFC.',
          implicacao_aposta: 'Se a luta ficar em pe, Belgaroui tem vantagem tecnica significativa. Props de KO do Belgaroui podem ter valor.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Activity',
          titulo: 'Padrao de Finalizacao Tardia de Belgaroui',
          stat_headline: 'ULTIMAS 2 VITORIAS POR TKO NO ROUND 3',
          contexto: 'Tanto contra Bekoev quanto contra Iwasaki, Belgaroui finalizou no terceiro round. Isso sugere que ele e um lutador de ritmo lento que melhora conforme a luta avanca.',
          implicacao_aposta: 'Props de Belgaroui por TKO R3 podem ter valor como aposta de risco.',
          edge_level: 'leve',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Flame',
          titulo: 'Taxa de Finalizacao Combinada',
          stat_headline: 'AMBOS TEM 78% DE VITORIAS POR KO/TKO',
          contexto: 'Abdul-Malik nunca foi a decisao. Belgaroui finaliza com frequencia. Ambos sao lutadores que buscam finalizar, nao pontuar.',
          implicacao_aposta: 'Luta com grande chance de nao ir a decisao. O mercado de "nao vai a distancia" pode ter valor.',
          edge_level: 'moderado',
          fighter_side: 'neutral',
        },
      ],
      value_picks: [
        {
          tipo: 'Duracao',
          pick: 'Luta nao vai a decisao',
          odds: '-130 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'Ambos finalizam em 78% das lutas. Abdul-Malik NUNCA foi a decisao.',
          raciocinio: 'Com Abdul-Malik tendo zero decisoes em 9 vitorias e Belgaroui finalizando na maioria das lutas, a probabilidade de finalizacao e muito alta. A combinacao de wrestling agressivo com striking de elite quase sempre produz uma finalizacao.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Over 1.5 Rounds',
          odds: '-160 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Belgaroui sobreviveu 3 rounds contra Bekoev. Abdul-Malik levou 2 rounds para parar Klein.',
          raciocinio: 'Apesar de ambos serem finalizadores, Belgaroui tem experiencia suficiente para sobreviver ao primeiro round. O alcance e a defesa basica devem mante-lo em pe pelo menos ate o segundo round.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Abdul-Malik (-120)',
          odds: '-120',
          confianca: 'media',
          edge_vs_mercado: 'Preco justo para favorito com vantagem de wrestling significativa.',
          raciocinio: 'O wrestling de Abdul-Malik e a vantagem mais tangivel da luta. A defesa de takedown fraca de Belgaroui combinada com o wrestling Division I do americano torna o preco de -120 acessivel e justo.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Belgaroui por KO no R1',
        descricao: 'Apesar do background impressionante de kickboxing, Belgaroui nunca nocauteou ninguem no primeiro round no MMA em nivel UFC. Suas finalizacoes sao tardias (R3). Apostar em um KO rapido do holandes e ir contra o padrao das suas lutas. O mais provavel e que Abdul-Malik teste o takedown cedo e Belgaroui precise de tempo para se adaptar.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade e dentro dos seus limites financeiros.',
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  return <FullAnalysisView analise={analise} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
