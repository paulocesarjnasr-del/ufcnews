'use client';

import { useLocale } from 'next-intl';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';


const analisePT: FullSingleAnalise = {
  id: 'chiesa-vs-harris',
  evento_id: null,
  slug: 'chiesa-vs-harris',
  titulo: 'Chiesa vs Harris: A Ultima Caminhada do Maverick',
  subtitulo: 'O veterano de Washington busca aposentadoria perfeita contra o perigoso grapppler guianense',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,85m', envergadura: '192cm', idade: 38, academia: 'Sikjitsu / Rick Little MMA' },
      fighter2: { altura: '1,83m', envergadura: '193cm', idade: 38, academia: 'Renovacao Fight Team' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'Submissao R2-R3',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Michael Chiesa',
    record: '19-7-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Court McGee', method: 'Decisao Unanime', event: 'UFC on ESPN' },
      { result: 'W', opponent: 'Max Griffin', method: 'Submissao R3 (mata-leao)', event: 'UFC 310' },
      { result: 'W', opponent: 'Tony Ferguson', method: 'Submissao R1 (mata-leao)', event: 'UFC on ABC 7' },
    ],
  },
  fighter2_info: {
    nome: 'Carlston Harris',
    record: '19-7-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Santiago Ponzinibbio', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Khaos Williams', method: 'KO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Jeremiah Wells', method: 'Submissao R3 (anaconda choke)', event: 'UFC on ESPN' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Meio-Medio (170 lbs)',
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
      categoria_peso: 'Peso Meio-Medio (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'A Ultima Caminhada do Maverick',
      tagline_sub: 'Chiesa se despede do MMA em casa, contra o perigoso grappler da Guiana',
      fighter1: {
        nome_completo: 'Michael "Maverick" Chiesa',
        apelido: 'Maverick',
        sobrenome: 'Chiesa',
        record: '19-7-0',
        ranking: 'N/R Peso Meio-Medio',
        info_extra: 'Spokane, Washington | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Carlston "Mocambique" Harris',
        apelido: 'Mocambique',
        sobrenome: 'Harris',
        record: '19-7-0',
        ranking: 'N/R Peso Meio-Medio',
        info_extra: 'Skeldon, Guiana | 38 anos',
        imagem_fullbody_url: null,
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Despedida em Casa</h3>
        <p class="mb-4">
          Depois de 14 anos de carreira e mais de 20 lutas dentro do octogono, <strong class="text-ufc-red">Michael Chiesa</strong> anunciou que a noite de 28 de marco sera a ultima vez que ele caminha ate a jaula. E nao por coincidencia, faz isso em Seattle, a quatro horas de Spokane, a cidade que ele sempre representou. O cara que venceu a primeira temporada do The Ultimate Fighter: Live, que acumulou sete finalizacoes por mata-leao no UFC, e que nunca desistiu nem quando tudo deu errado, quer encerrar a historia com uma vitoria diante da sua gente.
        </p>
        <p class="mb-4">
          Do outro lado, <strong class="text-blue-400">Carlston Harris</strong> nao veio para participar de cerimonia de aposentadoria de ninguem. O guianense, primeiro atleta de seu pais a competir no UFC, carrega um estilo de grappling asfixiante, com submissoes criativas como anaconda chokes e brabo chokes que ja renderam bonus de Performance da Noite. Porem, Harris chega nessa luta vindo de duas derrotas consecutivas por nocaute, contra Khaos Williams e Santiago Ponzinibbio. A pressao e enorme para os dois, so que por razoes completamente diferentes.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Sequencia que Ressuscitou Chiesa</h3>
        <p class="mb-4">
          Em 2023, depois de perder para Kevin Holland por submissao no primeiro round, muitos acharam que Chiesa estava acabado. Duas derrotas consecutivas (Sean Brady antes de Holland), sem ranking, 36 anos. Mas o Maverick respondeu da melhor forma possivel: tres vitorias seguidas. Finalizou Tony Ferguson no primeiro round. Finalizou Max Griffin no terceiro. E venceu Court McGee por decisao unanime. Essa sequencia provou que o jiu-jitsu de Chiesa continua afiado e que ele ainda tem muito a oferecer.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Grappling vs Grappling</h3>
        <p class="mb-4">
          Essa luta tem tudo para ir ao chao. Chiesa tem 12 submissoes na carreira, com destaque para os mata-leoes que sao sua marca registrada. Harris tem seis submissoes, com um arsenal mais exotico: anaconda chokes e brabo chokes. Quando dois grapplers de elite se encontram, normalmente a luta acontece nas transicoes, nas reversoes, nos detalhes tecnicos que so quem treina jiu-jitsu entende. E exatamente esse tipo de batalha que podemos esperar.
        </p>
      `,
      stakes: [
        { dimensao: 'Sequencia', fighter1: '3 vitorias consecutivas', fighter2: '2 derrotas consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Aposentadoria com vitoria em casa', fighter2: 'Interromper sequencia negativa' },
        { dimensao: 'Narrativa', fighter1: 'O adeus perfeito para um veterano do UFC', fighter2: 'Provar que pertence ao UFC apos dois KOs sofridos' },
        { dimensao: 'Risco', fighter1: 'Perder a ultima luta da carreira', fighter2: 'Terceira derrota seguida pode significar corte do UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O ADEUS PERFEITO',
          subtitulo: 'Chiesa finaliza Harris e se aposenta com vitoria diante da torcida de Washington',
          consequencias: [
            { tag: 'LEGADO', texto: 'Chiesa encerra a carreira com 20 vitorias, consolidando seu legado como um dos melhores grapplers da historia do UFC peso meio-medio' },
            { tag: 'SUBMISSAO', texto: 'Se vencer por mata-leao, Chiesa empata ou ultrapassa recordes historicos de finalizacoes por rear-naked choke no UFC' },
            { tag: 'HARRIS', texto: 'Tres derrotas seguidas colocam Harris em situacao critica no roster do UFC' },
          ],
          proxima_luta: 'Aposentadoria. Chiesa encerra a carreira como veterano respeitado.',
        },
        fighter2_vence: {
          titulo: 'O ESTRAGA-FESTAS DA GUIANA',
          subtitulo: 'Harris surpreende e arruina a despedida de Chiesa em Seattle',
          consequencias: [
            { tag: 'SOBREVIVENCIA', texto: 'Harris interrompe sequencia de duas derrotas e ganha folego no roster do UFC' },
            { tag: 'AMARGO', texto: 'Chiesa se aposenta com derrota diante da torcida de casa, final doloroso para uma carreira historica' },
            { tag: 'CARREIRA', texto: 'Harris pode pedir um oponente ranqueado no proximo card para retomar a escalada' },
          ],
          proxima_luta: 'Harris vs um oponente ranqueado no top 15 do peso meio-medio',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Michael Chiesa',
        color: 'red',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida por decisao contra veterano. Controlou a luta com grappling e pressao.' },
          { date: 'Dez 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3 (mata-leao)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizou Griffin com mata-leao no terceiro round na noite do seu aniversario no UFC 310.' },
          { date: 'Ago 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1 (mata-leao)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizou Ferguson rapidamente no primeiro round. Mostra de dominio no grappling.' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (brabo choke)', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bom', note: 'Derrota rapida por submissao contra Holland. Surpreendido no chao por um adversario mais longo.' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'Decisao Unanime', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Bom', note: 'Derrota por decisao contra prospect em ascensao. Luta competitiva mas Brady foi superior.' },
        ],
        full_fight_history: [
          { date: 'Jun 2012', opponent: 'Al Iaquinta', result: 'W', method: 'Sub R1 (mata-leao)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Final do TUF Live, vitoria por submissao' },
          { date: 'Fev 2013', opponent: 'Anton Kuivanen', result: 'W', method: 'Sub R2 (mata-leao)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UFC 157' },
          { date: 'Ago 2013', opponent: 'Jorge Masvidal', result: 'L', method: 'Sub R2 (d\'arce choke)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Primeira derrota da carreira contra futuro estrela' },
          { date: 'Mar 2014', opponent: 'Colton Smith', result: 'W', method: 'Sub R1 (mata-leao)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao rapida' },
          { date: 'Set 2014', opponent: 'Joe Lauzon', result: 'L', method: 'TKO R1 (corte)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parada medica por corte' },
          { date: 'Dez 2015', opponent: 'Jim Miller', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria por submissao contra veterano' },
          { date: 'Abr 2016', opponent: 'Beneil Dariush', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Performance da Noite' },
          { date: 'Jul 2016', opponent: 'Joe Lauzon', result: 'W', method: 'Sub R2 (mata-leao)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Revanche, mata-leao no segundo' },
          { date: 'Jun 2017', opponent: 'Kevin Lee', result: 'L', method: 'Sub R1', opponent_rank: '#7 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota por submissao contra futuro desafiante ao titulo' },
          { date: 'Dez 2017', opponent: 'Anthony Pettis', result: 'L', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota contra ex-campeao peso-leve' },
          { date: 'Jul 2018', opponent: 'Carlos Condit', result: 'W', method: 'Sub R2 (kimura)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Primeira luta no peso meio-medio' },
          { date: 'Mai 2019', opponent: 'Diego Sanchez', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria por decisao unanime' },
          { date: 'Jan 2020', opponent: 'Rafael dos Anjos', result: 'W', method: 'UD', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Maior vitoria da carreira contra ex-campeao' },
          { date: 'Jan 2021', opponent: 'Neil Magny', result: 'W', method: 'UD', opponent_rank: '#9 WW', quality_score: 3, quality_label: 'Bom', note: 'Dominou 5 rounds com grappling' },
          { date: 'Jun 2021', opponent: 'Vicente Luque', result: 'L', method: 'Sub R1 (d\'arce choke)', opponent_rank: '#6 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota por submissao contra top contender' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Bom', note: 'Derrota por decisao' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bom', note: 'Derrota por submissao' },
          { date: 'Ago 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao rapida' },
          { date: 'Dez 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mata-leao no terceiro' },
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao unanime' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Chiesa vem de tres vitorias consecutivas, incluindo duas finalizacoes por mata-leao. Depois de parecer acabado com as derrotas para Brady e Holland, ele ressurgiu contra oponentes de nivel mais baixo mas com performances convincentes. O momento e bom, mas e importante notar que Ferguson, Griffin e McGee nao sao adversarios de elite. A confianca esta alta, especialmente com a motivacao extra de lutar em casa na ultima luta da carreira.',
      },
      fighter2: {
        nome: 'Carlston Harris',
        color: 'blue',
        recent_fights: [
          { date: 'Jan 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Harris estava lutando bem mas foi parado no terceiro round. Exposicao de vulnerabilidade no striking.' },
          { date: 'Mai 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado rapidamente por Williams no primeiro round. Queixo questionavel apos dois KOs consecutivos.' },
          { date: 'Ago 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao com anaconda choke no terceiro round. Performance da Noite. Harris no seu melhor.' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao contra oponente de nivel abaixo.' },
        ],
        full_fight_history: [
          { date: 'Mai 2021', opponent: 'Christian Aguilera', result: 'W', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC, Performance da Noite' },
          { date: 'Set 2021', opponent: 'Impa Kasanganay', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no primeiro round' },
          { date: 'Fev 2022', opponent: 'Shavkat Rakhmonov', result: 'L', method: 'KO R1', opponent_rank: '#15 WW', quality_score: 5, quality_label: 'Excelente', note: 'Nocauteado pelo futuro desafiante ao titulo' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Decisao unanime' },
          { date: 'Ago 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Anaconda choke, Performance da Noite' },
          { date: 'Mai 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no primeiro round' },
          { date: 'Jan 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO no terceiro round' },
        ],
        layoff_warning: null,
        momentum_score: 3,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Harris chega nessa luta no pior momento da carreira no UFC. Duas derrotas consecutivas por nocaute (Williams e Ponzinibbio) levantam questoes serias sobre a durabilidade do queixo dele. A unica derrota anterior no UFC tinha sido contra Shavkat Rakhmonov, que e desafiante ao titulo. Agora os nocautes vieram contra adversarios de nivel mediano, o que e mais preocupante. O grappling continua perigoso, mas se a luta ficar em pe, Harris esta vulneravel.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Chiesa',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '12W-7L (63%)',
        contra_top5: '1W-1L',
      },
      fighter2: {
        nome: 'Harris',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '4W-3L (57%)',
        contra_top5: '0W-1L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nao existem oponentes em comum entre Chiesa e Harris no UFC. Sao carreiras que seguiram trajetorias muito diferentes: Chiesa e veterano de longa data com 21 lutas na organizacao, enquanto Harris tem apenas 7 lutas no UFC, tendo entrado so em 2021.',
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
        { label: 'Sig. Strikes por Minuto', valueA: 1.87, valueB: 2.93, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 40, valueB: 49, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 1.70, valueB: 2.44, maxVal: 5, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 54, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 3.33, valueB: 2.05, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 50, valueB: 29, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 60, valueB: 55, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '38 anos', note: 'Mesma idade, ambos nascidos em 1987' },
        { label: 'Altura', fighter1: '1,85m (6\'1")', fighter2: '1,83m (6\'0")', note: 'Chiesa ligeiramente mais alto' },
        { label: 'Envergadura', fighter1: '192cm (75.5")', fighter2: '193cm (76")', note: 'Harris com meia polegada de vantagem' },
        { label: 'Stance', fighter1: 'Southpaw', fighter2: 'Ortodoxo', note: 'Confronto classico de stances opostas' },
        { label: 'Academia', fighter1: 'Sikjitsu, Spokane', fighter2: 'Renovacao Fight Team, Rio de Janeiro', note: null },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Grappling Ofensivo', valueA: 85, valueB: 72, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Chiesa tem 12 submissoes na carreira e 3.33 takedowns por 15 minutos. Harris tem submissoes criativas mas volume inferior (2.05 TD/15min).' },
        { label: 'Submissoes e Jiu-Jitsu', valueA: 88, valueB: 78, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Chiesa tem sete mata-leoes no UFC, segundo na historia da organizacao. Harris tem anaconda e brabo chokes. Ambos perigosos no chao.' },
        { label: 'Striking em Pe', valueA: 40, valueB: 55, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Harris tem mais volume (2.93 SLpM vs 1.87) e melhor precisao (49% vs 40%). Chiesa nunca teve nocaute na carreira.' },
        { label: 'Defesa de Takedown', valueA: 65, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Chiesa defende 60% dos takedowns contra 55% de Harris. Diferenca modesta mas relevante nesse matchup de grapplers.' },
        { label: 'Cardio e Resistencia', valueA: 75, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Chiesa mostrou cardio solido em lutas de 5 rounds contra Magny e dos Anjos. Harris tende a gastar energia buscando finalizacao cedo.' },
        { label: 'Durabilidade e Queixo', valueA: 70, valueB: 45, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Chiesa nunca foi nocauteado em 26 lutas profissionais. Harris foi nocauteado tres vezes no UFC (Rakhmonov, Williams, Ponzinibbio).' },
      ],
      insight: 'Luta de grappler contra grappler, com Chiesa levando vantagem na maioria das metricas. A grande diferenca esta na durabilidade: Chiesa nunca foi nocauteado enquanto Harris foi parado em pe tres vezes. No chao, ambos sao perigosos, mas Chiesa tem maior volume de takedowns e historico superior de submissoes. A unica area onde Harris tem vantagem clara e no striking, mas os numeros de ambos em pe sao modestos.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Chiesa',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 12, percent: 63 },
        decision: { count: 7, percent: 37 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Harris',
        ko_tko: { count: 5, percent: 26 },
        submission: { count: 6, percent: 32 },
        decision: { count: 8, percent: 42 },
        total_wins: 19,
      },
      insight: 'O contraste e revelador. Chiesa e um puro finalista: 63% das vitorias por submissao, zero nocautes na carreira inteira. Ele busca o chao e ponto final. Harris e mais equilibrado entre KO (26%), submissao (32%) e decisao (42%), mas isso tambem significa que ele nao e dominante em nenhuma area especifica. Para Chiesa, o caminho e claro: levar ao chao e buscar o mata-leao. Para Harris, a diversidade pode ser tanto uma forca quanto uma fraqueza.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Territorio de Reconhecimento',
          description: 'Ambos os lutadores tendem a usar o primeiro round para estudar o oponente. Chiesa vai buscar o clinch e o takedown, enquanto Harris pode tentar uma submissao de oportunidade se sentir abertura. Os dois ja mostraram capacidade de finalizar no R1 (Chiesa finalizou Ferguson e Iaquinta no primeiro; Harris finalizou Aguilera e Kasanganay). Se um dos dois encontrar as costas do oponente cedo, pode acabar rapido.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'VANTAGEM CHIESA',
          color: 'red',
          title: 'Pressao do Maverick',
          description: 'O segundo round historicamente e onde Chiesa comeca a impor sua vontade. Com melhor cardio e volume de takedowns superior (3.33 vs 2.05 por 15 min), a pressao comeca a acumular. Harris, que gastou energia tentando finalizar no R1, pode comecar a sentir o ritmo. A precisao de takedown de Chiesa (50% vs 29% de Harris) se torna mais relevante a medida que o cansaco chega.',
        },
        {
          rounds: 'R3',
          danger_level: 8,
          danger_label: 'VANTAGEM CHIESA',
          color: 'red',
          title: 'Round da Aposentadoria',
          description: 'Se a luta chegar ao terceiro round sem finalizacao, Chiesa e o grande favorito. O cardio dele e comprovado em lutas de 5 rounds contra Rafael dos Anjos e Neil Magny. Harris, com duas derrotas recentes por nocaute, pode estar fisicamente e mentalmente desgastado. A motivacao extra de Chiesa (ultima luta, em casa, diante da familia) pode ser o diferencial nos minutos finais.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Fator Casa: Seattle', fighter: 'Chiesa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Chiesa e de Spokane, a quatro horas de Seattle. Vai ter familia, amigos e uma torcida enorme no Climate Pledge Arena. Para a ultima luta da carreira, esse apoio e inestimavel.' },
        { icon: 'Brain', title: 'Motivacao: Luta de Aposentadoria', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Chiesa anunciou que essa sera sua ultima luta. Lutadores em despedida costumam ter performances superiores, com foco e determinacao extras. A motivacao emocional e um fator real.' },
        { icon: 'AlertTriangle', title: 'Queixo Questionavel', fighter: 'Harris', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Duas derrotas consecutivas por nocaute (Williams no R1, Ponzinibbio no R3) levantam bandeiras vermelhas sobre a durabilidade de Harris. Mesmo contra Chiesa, que nao tem poder de nocaute, o dano acumulado pode afetar a confianca.' },
        { icon: 'TrendingUp', title: 'Tres Vitorias Seguidas', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Apos as derrotas para Brady e Holland, Chiesa se reinventou com tres vitorias consecutivas. Duas por submissao, mostrando que o jiu-jitsu continua afiado. A confianca esta no ponto mais alto desde 2021.' },
        { icon: 'Clock', title: 'Inatividade Relativa de Harris', fighter: 'Harris', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'A ultima luta de Harris foi em janeiro de 2025, mais de 14 meses atras. Combinado com as derrotas recentes, a ferrugem pode ser um fator adicional.' },
        { icon: 'Shield', title: 'Nunca Nocauteado em 26 Lutas', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Chiesa nunca foi parado por strikes em toda a carreira profissional. A unica parada por strikes foi uma interrupcao medica por corte contra Joe Lauzon. A durabilidade e extraordinaria.' },
        { icon: 'Zap', title: 'Submissoes Exoticas', fighter: 'Harris', risk_level: 'POSITIVO', risk_color: 'green', description: 'Harris tem um arsenal de submissoes diferente da maioria: anaconda chokes e brabo chokes. Essas tecnicas podem surpreender ate grapplers experientes como Chiesa se o angulo for correto.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Chiesa',
        total_probability: 65,
        scenarios: [
          { name: 'O Mata-Leao de Despedida', probability: 30, method: 'Submissao R2-R3 (mata-leao)', description: 'Chiesa implementa seu gameplan classico: clinch contra a grade, takedown, busca as costas e encaixa o mata-leao. Harris, menos explosivo nos rounds finais, nao consegue escapar. E o final perfeito para a carreira.' },
          { name: 'Controle Total por 15 Minutos', probability: 25, method: 'Decisao Unanime', description: 'Chiesa nao encontra a finalizacao mas controla a luta inteira com takedowns e pressao posicional. Vence todos os tres rounds com grappling dominante e leva uma decisao unanime clara.' },
          { name: 'Submissao Rapida', probability: 10, method: 'Submissao R1', description: 'Chiesa encontra uma abertura cedo, encaixa o clinch e transiciona rapidamente para as costas. Harris, tentando uma submissao propria, deixa espaco e Chiesa capitaliza.' },
        ],
      },
      fighter2: {
        nome: 'Harris',
        total_probability: 32,
        scenarios: [
          { name: 'Anaconda Surpresa', probability: 15, method: 'Submissao R1-R2 (anaconda ou brabo choke)', description: 'Harris surpreende Chiesa com uma submissao de oportunidade durante uma tentativa de takedown. O anaconda choke e a arma mais perigosa de Harris, e pode pegar Chiesa na transicao.' },
          { name: 'Striking Superior', probability: 10, method: 'Decisao Dividida', description: 'Harris mantem a luta em pe, usa seu volume superior de strikes (2.93 vs 1.87 SLpM) e defende takedowns suficientes para levar uma decisao apertada. Cenario improvavel mas possivel.' },
          { name: 'TKO por Acumulo', probability: 7, method: 'TKO R2-R3', description: 'Harris machuca Chiesa no striking, acumula dano e forca uma parada. Cenario menos provavel dado que Chiesa nunca foi nocauteado, mas Harris ja mostrou poder em pe.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Michael Chiesa',
      winner_side: 'fighter1',
      predicted_method: 'Submissao R2 ou Decisao Unanime',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Chiesa chega nessa luta com vantagens claras em praticamente todas as areas que importam para esse matchup. O grappling dele e superior em volume e eficacia (3.33 takedowns por 15 min com 50% de precisao contra 2.05 e 29% de Harris). A durabilidade e incomparavel: Chiesa nunca foi nocauteado, enquanto Harris vem de duas derrotas por KO. O fator casa, a motivacao da aposentadoria e a sequencia de tres vitorias dao a Chiesa um edge psicologico significativo. A unica ameaca real sao as submissoes exoticas de Harris, que podem surpreender na transicao. Mas Chiesa e um faixa-preta de jiu-jitsu experiente o suficiente para navegar esse perigo.',
      x_factor: {
        title: 'A Energia da Ultima Luta',
        description: 'Lutadores em despedida frequentemente entregam performances acima do normal. O publico de Seattle, a familia presente, a emocao do momento. Chiesa pode canalizar tudo isso para uma atuacao memoravel que coroe uma carreira de 14 anos no UFC.',
      },
      upset_alert: {
        title: 'O Anaconda Choke de Harris',
        description: 'Harris ja rendeu dois bonus de Performance da Noite com submissoes surpresa. Se Chiesa for displicente numa tentativa de takedown, Harris pode encaixar um anaconda ou brabo choke. E o tipo de golpe que acontece rapido demais para reagir.',
      },
      probabilities: {
        fighter1: { nome: 'Chiesa', percent: 65 },
        fighter2: { nome: 'Harris', percent: 32 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Chiesa', reasoning: 'Favorito justificado. Melhor grappling, melhor durabilidade, fator casa, motivacao da aposentadoria. Linha confortavel.' },
        method: { pick: 'Chiesa por submissao', reasoning: 'Com 63% das vitorias por submissao e sete mata-leoes no UFC, a chance de Chiesa finalizar e alta. Harris foi finalizado anteriormente e suas derrotas recentes por KO sugerem fragilidade geral.' },
        over_under: { pick: 'Under 2.5 rounds', rounds: 2.5, reasoning: 'Dois grapplers ativos que buscam finalizacao. Chiesa finalizou Ferguson no R1 e Griffin no R3. Harris finalizou Wells no R3 e Aguilera no R1. Alta probabilidade de submissao antes do round final.' },
        best_value: 'Chiesa por submissao e a aposta com melhor valor. O estilo dele converge para essa finalizacao e Harris e vulneravel no chao contra grapplers superiores.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'A Primeira Tentativa de Takedown de Chiesa', icon: 'Target', description: 'Se Chiesa encaixar o primeiro takedown limpo nos primeiros dois minutos, a luta pode seguir o script dele rapidamente. Fique de olho na reacao de Harris ao ser derrubado: se ele aceitar a posicao de baixo, Chiesa vai buscar as costas e o mata-leao imediatamente.' },
        { num: 2, title: 'As Transicoes de Harris no Chao', icon: 'Activity', description: 'O perigo de Harris esta nos scrambles e transicoes. Anaconda chokes e brabo chokes sao encaixados durante tentativas de takedown e reversoes. Se Harris conseguir inverter posicao ou encaixar um overhook durante o clinch, a submissao pode vir do nada.' },
        { num: 3, title: 'O Volume de Strikes no Primeiro Round', icon: 'Crosshair', description: 'Harris tem volume superior de strikes (2.93 vs 1.87 SLpM). Se ele conseguir manter distancia e pontuar em pe no R1, pode acumular confianca e dificultar o plano de Chiesa. A precisao de Harris (49% vs 40%) tambem merece atencao.' },
        { num: 4, title: 'O Cardio de Harris no R3', icon: 'Shield', description: 'Harris foi finalizado no R3 contra Ponzinibbio e gastou energia tentando submissoes contra Wells. Se a luta chegar ao terceiro round, observe se Harris desacelera. Chiesa, com experiencia em lutas de 5 rounds, pode capitalizar qualquer queda de ritmo.' },
        { num: 5, title: 'A Emocao de Chiesa na Caminhada', icon: 'Brain', description: 'Essa sera a ultima caminhada de Chiesa ate o octogono. A emocao pode ser uma faca de dois gumes: motivacao extra ou distracao. Observe a linguagem corporal dele antes da luta. Se estiver focado e controlado, bom sinal. Se estiver excessivamente emotivo, Harris pode explorar.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'A ULTIMA LUTA', content: 'CHIESA vs HARRIS\nUFC Seattle | 28 de Marco\nClimate Pledge Arena\n\n19-7 vs 19-7\nMesmo record. Destinos opostos.\nChiesa se despede do MMA.', color: 'red' },
        { slide_number: 2, title: 'CHIESA: O MAVERICK', content: 'Campeao TUF Live\n19-7 na carreira (12 por submissao)\n7 mata-leoes no UFC\nNunca nocauteado em 26 lutas\n3 vitorias seguidas\n14 anos de UFC\nLuta de despedida em casa', color: 'red' },
        { slide_number: 3, title: 'HARRIS: MOCAMBIQUE', content: 'Primeiro guianense no UFC\n19-7 na carreira\n4-3 no UFC\n2 Performance da Noite\nAnaconda choke specialist\n2 derrotas por KO seguidas\nPrecisa vencer para sobreviver no roster', color: 'blue' },
        { slide_number: 4, title: 'GRAPPLING vs GRAPPLING', content: 'CHIESA:\n12 submissoes na carreira\n50% precisao de takedown\n3.33 TDs por 15 min\n\nHARRIS:\n6 submissoes na carreira\n29% precisao de takedown\n2.05 TDs por 15 min\n\nChiesa domina os numeros.', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'CHIESA por Submissao R2\n\nConfianca: MEDIA-ALTA\n65% Chiesa / 32% Harris\n\nO mata-leao de despedida.\nHarris e perigoso nas transicoes,\nmas Chiesa e o grappler superior.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Chiesa vs Harris no UFC Seattle. A ultima luta do Maverick. 14 anos de UFC. 7 mata-leoes. Nunca nocauteado. E ele quer se despedir com uma finalizacao em casa. Thread:' },
        { num: '2/6', text: 'Chiesa (19-7): 3 vitorias seguidas. Finalizou Ferguson no R1. Finalizou Griffin no R3. Venceu McGee por decisao. O jiu-jitsu dele esta mais afiado do que nunca aos 38 anos.' },
        { num: '3/6', text: 'Harris (19-7): 2 derrotas por KO seguidas. Ponzinibbio e Williams pararam ele. Mas nao se engane: Harris tem 2 Performance da Noite por submissao. Anaconda choke e perigosa. A questao e o queixo.' },
        { num: '4/6', text: 'Os numeros de grappling nao mentem: Chiesa tem 3.33 TDs por 15 min com 50% de precisao. Harris tem 2.05 com 29%. Num duelo de grapplers, o volume de Chiesa deve prevalecer.' },
        { num: '5/6', text: 'Fato que pouca gente sabe: Chiesa NUNCA foi nocauteado em 26 lutas profissionais. Zero KOs sofridos. Harris foi nocauteado 3x no UFC. A durabilidade aqui e extremamente desigual.' },
        { num: '6/6', text: 'Minha pick: Chiesa por submissao no segundo round. O mata-leao de despedida em casa, diante da familia. Se Harris sobreviver o grappling, Chiesa vence por decisao. RT se concorda.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Ele venceu o TUF. Tem 7 mata-leoes no UFC. Nunca foi nocauteado. E sabado sera a ULTIMA luta dele. Michael Chiesa se despede do MMA em casa, em Seattle.' },
        { time: '10-25s', title: 'Contexto', text: 'Chiesa vem de tres vitorias seguidas, incluindo finalizacoes sobre Tony Ferguson e Max Griffin. Do outro lado, Carlston Harris, o primeiro guianense do UFC, vem de duas derrotas por KO. Mas Harris tem submissoes exoticas que podem surpreender qualquer um.' },
        { time: '25-45s', title: 'Analise', text: 'Quando dois grapplers se enfrentam, a luta e decidida nos detalhes. Chiesa tem 3.33 takedowns por 15 minutos com 50% de precisao. Harris tem 2.05 com apenas 29%. No chao, Chiesa busca o mata-leao. Harris busca o anaconda choke. A diferenca? Chiesa nunca foi nocauteado em 26 lutas. Harris foi parado em pe tres vezes no UFC.' },
        { time: '45-55s', title: 'Previsao', text: 'Minha pick: Chiesa por submissao no segundo round. O grappling dele e superior, o cardio e melhor, e a motivacao de se aposentar com vitoria em casa e enorme. Mas cuidado com Harris nas transicoes. O anaconda choke dele ja rendeu dois bonus.' },
        { time: '55-65s', title: 'CTA', text: 'Chiesa consegue o adeus perfeito? Comenta embaixo sua previsao e segue pra analise completa de todo o card do UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'ULTIMA LUTA de um veterano de 14 anos do UFC, e ele quer se despedir COM ESTILO.', body: 'Michael Chiesa, 7 mata-leoes no UFC, nunca nocauteado em 26 lutas, vai se aposentar em casa em Seattle contra Carlston Harris. Chiesa vem de 3 vitorias seguidas. Harris vem de 2 nocautes sofridos. Parece facil, mas Harris tem submissoes exoticas que podem surpreender QUALQUER UM.', cta: 'Comenta CHIESA ou HARRIS!' },
        { hook: 'Esse cara NUNCA foi nocauteado em 26 lutas e sabado e a ultima.', body: 'Michael Chiesa. Campeao do TUF. 12 submissoes na carreira. 7 mata-leoes no UFC. E agora quer encerrar a carreira em casa, em Seattle, com mais uma finalizacao. O oponente? Carlston Harris, que tem anaconda chokes mortais mas vem de duas derrotas por KO.', cta: 'Vai ser submissao? Comenta como voce acha que acaba!' },
        { hook: 'O primeiro guianense do UFC pode estragar a festa de aposentadoria.', body: 'Carlston Harris. Veio da Guiana, trabalhou como mecanico no Brasil, entrou no UFC e ganhou 2 bonus de Performance da Noite com submissoes. Ele enfrenta Chiesa, que se aposenta em casa. Harris esta desesperado, vem de 2 derrotas por KO, e precisa vencer pra continuar no UFC.', cta: 'Harris consegue o upset? Comenta!' },
      ],
      headlines: [
        'Chiesa vs Harris: O Maverick Busca o Adeus Perfeito em Seattle',
        'Sete Mata-Leoes e Uma Despedida: Chiesa Quer Encerrar a Carreira com Finalizacao em Casa',
        'Harris e o Estraga-Festas? O Perigo do Anaconda Choke na Aposentadoria de Chiesa',
        'Nunca Nocauteado em 26 Lutas: A Durabilidade Extraordinaria de Michael Chiesa',
        'Grappler vs Grappler: Por Que Chiesa vs Harris Pode Ser uma Aula de Jiu-Jitsu no UFC Seattle',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-300',
        fighter2_odds: '+240',
        fighter1_name: 'Michael Chiesa',
        fighter2_name: 'Carlston Harris',
        source: 'Estimativa baseada em perfil de luta (marco 2026). Odds exatas nao disponiveis apos mudanca de card.',
      },
      edges: [
        { icon: 'Target', titulo: 'Volume de Takedowns', stat_headline: 'CHIESA: 3.33 TAKEDOWNS POR 15 MIN COM 50% DE PRECISAO', contexto: 'Chiesa e um dos melhores da divisao em levar a luta ao chao. Harris tem apenas 29% de precisao e 2.05 TDs por 15 min.', implicacao_aposta: 'Favorece Chiesa por decisao ou submissao. A luta vai ao chao.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Durabilidade Incomparavel', stat_headline: 'CHIESA: ZERO NOCAUTES SOFRIDOS EM 26 LUTAS PROFISSIONAIS', contexto: 'Em toda a carreira, Chiesa nunca foi parado por strikes. Harris foi nocauteado 3x no UFC.', implicacao_aposta: 'Reduz drasticamente chances de Harris vencer por KO/TKO.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Submissoes Exoticas de Harris', stat_headline: '2 PERFORMANCE DA NOITE POR SUBMISSAO NO UFC', contexto: 'Anaconda chokes e brabo chokes sao armas que podem surpreender ate grapplers experientes. Harris ja mostrou que pode finalizar no R1.', implicacao_aposta: 'Unico cenario realistico de upset. Harris por submissao merece atencao.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'TrendingUp', titulo: 'Momentum Oposto', stat_headline: 'CHIESA: 3 VITORIAS SEGUIDAS. HARRIS: 2 DERROTAS POR KO SEGUIDAS', contexto: 'O contraste de momento e gritante. Chiesa esta confiante e afiado. Harris pode estar abalado psicologicamente apos dois nocautes.', implicacao_aposta: 'Favorece Chiesa fortemente. Momentum psicologico importa.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Fator Casa em Seattle', stat_headline: 'CHIESA NASCEU E CRESCEU EM WASHINGTON, A 4 HORAS DE SEATTLE', contexto: 'Ultima luta da carreira, em casa, diante de familia e amigos. O Climate Pledge Arena vai estar gritando o nome dele.', implicacao_aposta: 'Motivacao e apoio da torcida adicionam vantagem intangivel.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Chiesa por Submissao', odds: 'Segundo dados disponiveis', confianca: 'alta', edge_vs_mercado: '63% das vitorias de Chiesa sao por submissao. Harris vulneravel no chao.', raciocinio: 'Chiesa finaliza por submissao em mais da metade das suas vitorias. No UFC, sao 7 mata-leoes. Harris, apesar de ser grappler, tem defesa de takedown inferior (55%) e ja foi submetido na carreira. E o resultado mais provavel dessa luta.' },
        { tipo: 'Duracao', pick: 'Luta nao vai a decisao', odds: 'Segundo dados disponiveis', confianca: 'media', edge_vs_mercado: 'Dois grapplers ativos que buscam finalizacao', raciocinio: 'Chiesa finalizou nas ultimas duas vitorias (Ferguson R1, Griffin R3). Harris tem 6 submissoes na carreira. Com dois grapplers agressivos, a chance de finalizacao antes do terceiro round e relevante.' },
        { tipo: 'Moneyline', pick: 'Chiesa', odds: 'Segundo dados disponiveis', confianca: 'alta', raciocinio: 'Favorito justificado por praticamente todas as metricas: grappling superior, durabilidade, momentum, fator casa e motivacao. Harris precisa de algo especial para vencer.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Harris por KO/TKO',
        descricao: 'Harris tem 5 nocautes na carreira, mas Chiesa NUNCA foi nocauteado em 26 lutas profissionais. Apostar em Harris por KO/TKO e jogar contra 14 anos de evidencia. Se Harris vai vencer, sera por submissao, nao por strikes.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

// ===============================================================
// ENGLISH VERSION
// ===============================================================
const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Chiesa vs Harris: The Maverick\'s Last Walk',
  subtitulo: 'Washington veteran seeks the perfect retirement against dangerous Guyanese grappler',
  evento_data: 'March 28, 2026',
  categoria_peso: 'Welterweight (170 lbs)',
  fight_prediction: {
    ...analisePT.fight_prediction,
    predictedMethod: 'Submission R2-R3',
    confidence: 'MEDIUM-HIGH',
  },
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Court McGee', method: 'Unanimous Decision', event: 'UFC on ESPN' },
      { result: 'W', opponent: 'Max Griffin', method: 'Submission R3 (rear-naked choke)', event: 'UFC 310' },
      { result: 'W', opponent: 'Tony Ferguson', method: 'Submission R1 (rear-naked choke)', event: 'UFC on ABC 7' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Santiago Ponzinibbio', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Khaos Williams', method: 'KO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Jeremiah Wells', method: 'Submission R3 (anaconda choke)', event: 'UFC on ESPN' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: 'March 28, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Welterweight (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'The Maverick\'s Last Walk',
      tagline_sub: 'Chiesa says goodbye to MMA at home against a dangerous Guyanese grappler',
      fighter1: {
        nome_completo: 'Michael "Maverick" Chiesa',
        apelido: 'Maverick',
        sobrenome: 'Chiesa',
        record: '19-7-0',
        ranking: 'N/R Welterweight',
        info_extra: 'Spokane, Washington | 38 years old',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Carlston "Mocambique" Harris',
        apelido: 'Mocambique',
        sobrenome: 'Harris',
        record: '19-7-0',
        ranking: 'N/R Welterweight',
        info_extra: 'Skeldon, Guyana | 38 years old',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Farewell at Home</h3>
        <p class="mb-4">
          After 14 years in the sport and over 20 fights inside the octagon, <strong class="text-ufc-red">Michael Chiesa</strong> announced that the night of March 28 will be the last time he walks to the cage. And it is no coincidence that he does it in Seattle, four hours from Spokane, the city he has always represented. The man who won the first season of The Ultimate Fighter: Live, who racked up seven rear-naked choke finishes in the UFC, and who never gave up even when everything went wrong, wants to close the chapter with a win in front of his people.
        </p>
        <p class="mb-4">
          On the other side, <strong class="text-blue-400">Carlston Harris</strong> did not come to participate in anyone's retirement ceremony. The Guyanese fighter, the first athlete from his country to compete in the UFC, brings a suffocating grappling style with creative submissions like anaconda chokes and brabo chokes that have already earned Performance of the Night bonuses. However, Harris enters this fight coming off two consecutive knockout losses to Khaos Williams and Santiago Ponzinibbio. The pressure is enormous for both, but for completely different reasons.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Streak That Resurrected Chiesa</h3>
        <p class="mb-4">
          In 2023, after losing to Kevin Holland by submission in the first round, many thought Chiesa was done. Two consecutive losses (Sean Brady before Holland), no ranking, 36 years old. But the Maverick answered in the best way possible: three straight wins. He submitted Tony Ferguson in the first round. He submitted Max Griffin in the third. And he beat Court McGee by unanimous decision. This streak proved that Chiesa's jiu-jitsu remains sharp and that he still has plenty to offer.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Grappling vs Grappling</h3>
        <p class="mb-4">
          This fight has everything to go to the ground. Chiesa has 12 submissions in his career, highlighted by the rear-naked chokes that are his signature move. Harris has six submissions with a more exotic arsenal: anaconda chokes and brabo chokes. When two elite grapplers meet, the fight usually happens in the transitions, the reversals, the technical details that only those who train jiu-jitsu understand. That is exactly the type of battle we can expect.
        </p>
      `,
      stakes: [
        { dimensao: 'Streak', fighter1: '3 consecutive wins', fighter2: '2 consecutive losses' },
        { dimensao: 'Goal', fighter1: 'Retirement with a win at home', fighter2: 'Snap losing streak' },
        { dimensao: 'Narrative', fighter1: 'The perfect farewell for a UFC veteran', fighter2: 'Prove he belongs in the UFC after two KO losses' },
        { dimensao: 'Risk', fighter1: 'Losing his last career fight', fighter2: 'Third straight loss could mean UFC release' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'THE PERFECT FAREWELL',
          subtitulo: 'Chiesa submits Harris and retires with a win in front of Washington fans',
          consequencias: [
            { tag: 'LEGACY', texto: 'Chiesa ends his career with 20 wins, cementing his legacy as one of the best grapplers in UFC welterweight history' },
            { tag: 'SUBMISSION', texto: 'If he wins by rear-naked choke, Chiesa ties or surpasses historic records for RNC finishes in the UFC' },
            { tag: 'HARRIS', texto: 'Three straight losses put Harris in a critical situation on the UFC roster' },
          ],
          proxima_luta: 'Retirement. Chiesa ends his career as a respected veteran.',
        },
        fighter2_vence: {
          titulo: 'THE PARTY CRASHER FROM GUYANA',
          subtitulo: 'Harris shocks and ruins Chiesa\'s farewell in Seattle',
          consequencias: [
            { tag: 'SURVIVAL', texto: 'Harris snaps his two-fight losing streak and buys time on the UFC roster' },
            { tag: 'BITTER', texto: 'Chiesa retires with a loss in front of the home crowd, a painful ending for a historic career' },
            { tag: 'CAREER', texto: 'Harris can request a ranked opponent on the next card to resume his climb' },
          ],
          proxima_luta: 'Harris vs a ranked top 15 welterweight opponent',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Chiesa',
        color: 'red',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Solid decision win over a veteran. Controlled the fight with grappling and pressure.' },
          { date: 'Dec 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted Griffin with a rear-naked choke in the third round on his UFC anniversary night at UFC 310.' },
          { date: 'Aug 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Quickly submitted Ferguson in the first round. Show of grappling dominance.' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (brabo choke)', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Good', note: 'Quick submission loss against Holland. Caught on the ground by a longer opponent.' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'Unanimous Decision', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Good', note: 'Decision loss against a rising prospect. Competitive fight but Brady was superior.' },
        ],
        full_fight_history: [
          { date: 'Jun 2012', opponent: 'Al Iaquinta', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'TUF Live finale, submission victory' },
          { date: 'Feb 2013', opponent: 'Anton Kuivanen', result: 'W', method: 'Sub R2 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC 157' },
          { date: 'Aug 2013', opponent: 'Jorge Masvidal', result: 'L', method: 'Sub R2 (d\'arce choke)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'First career loss against future star' },
          { date: 'Mar 2014', opponent: 'Colton Smith', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Quick submission' },
          { date: 'Sep 2014', opponent: 'Joe Lauzon', result: 'L', method: 'TKO R1 (cut)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Doctor stoppage due to cut' },
          { date: 'Dec 2015', opponent: 'Jim Miller', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submission win over veteran' },
          { date: 'Apr 2016', opponent: 'Beneil Dariush', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'Performance of the Night' },
          { date: 'Jul 2016', opponent: 'Joe Lauzon', result: 'W', method: 'Sub R2 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Rematch, rear-naked choke in the second' },
          { date: 'Jun 2017', opponent: 'Kevin Lee', result: 'L', method: 'Sub R1', opponent_rank: '#7 LW', quality_score: 4, quality_label: 'Very Good', note: 'Submission loss against future title challenger' },
          { date: 'Dec 2017', opponent: 'Anthony Pettis', result: 'L', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Very Good', note: 'Loss against former lightweight champion' },
          { date: 'Jul 2018', opponent: 'Carlos Condit', result: 'W', method: 'Sub R2 (kimura)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'First fight at welterweight' },
          { date: 'May 2019', opponent: 'Diego Sanchez', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Unanimous decision win' },
          { date: 'Jan 2020', opponent: 'Rafael dos Anjos', result: 'W', method: 'UD', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Very Good', note: 'Biggest career win against former champion' },
          { date: 'Jan 2021', opponent: 'Neil Magny', result: 'W', method: 'UD', opponent_rank: '#9 WW', quality_score: 3, quality_label: 'Good', note: 'Dominated 5 rounds with grappling' },
          { date: 'Jun 2021', opponent: 'Vicente Luque', result: 'L', method: 'Sub R1 (d\'arce choke)', opponent_rank: '#6 WW', quality_score: 4, quality_label: 'Very Good', note: 'Submission loss against top contender' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Good', note: 'Decision loss' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Good', note: 'Submission loss' },
          { date: 'Aug 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Quick submission' },
          { date: 'Dec 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Rear-naked choke in the third' },
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Unanimous decision' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'On the Rise',
        momentum_trend: 'ascending',
        momentum_note: 'Chiesa is on a three-fight winning streak, including two rear-naked choke submissions. After looking finished with losses to Brady and Holland, he resurged against lower-level opponents but with convincing performances. The momentum is good, but it is important to note that Ferguson, Griffin, and McGee are not elite opponents. Confidence is high, especially with the extra motivation of fighting at home in his last career fight.',
      },
      fighter2: {
        nome: 'Carlston Harris',
        color: 'blue',
        recent_fights: [
          { date: 'Jan 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Harris was fighting well but was stopped in the third round. Striking vulnerability exposed.' },
          { date: 'May 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out quickly by Williams in the first round. Chin questionable after two consecutive KOs.' },
          { date: 'Aug 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submission via anaconda choke in the third round. Performance of the Night. Harris at his best.' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Decision win against a lower-level opponent.' },
        ],
        full_fight_history: [
          { date: 'May 2021', opponent: 'Christian Aguilera', result: 'W', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut, Performance of the Night' },
          { date: 'Sep 2021', opponent: 'Impa Kasanganay', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First round knockout' },
          { date: 'Feb 2022', opponent: 'Shavkat Rakhmonov', result: 'L', method: 'KO R1', opponent_rank: '#15 WW', quality_score: 5, quality_label: 'Excellent', note: 'Knocked out by future title challenger' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Unanimous decision' },
          { date: 'Aug 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Anaconda choke, Performance of the Night' },
          { date: 'May 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out in the first round' },
          { date: 'Jan 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'TKO in the third round' },
        ],
        layoff_warning: null,
        momentum_score: 3,
        momentum_label: 'Declining',
        momentum_trend: 'descending',
        momentum_note: 'Harris enters this fight at the worst moment of his UFC career. Two consecutive knockout losses (Williams and Ponzinibbio) raise serious questions about his chin durability. His only previous UFC loss had been to Shavkat Rakhmonov, who is a title challenger. Now the knockouts came against mid-level opponents, which is more concerning. The grappling remains dangerous, but if the fight stays standing, Harris is vulnerable.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Chiesa',
        media_oponentes: 3,
        media_oponentes_label: 'Good',
        aproveitamento: '12W-7L (63%)',
        contra_top5: '1W-1L',
      },
      fighter2: {
        nome: 'Harris',
        media_oponentes: 2,
        media_oponentes_label: 'Average',
        aproveitamento: '4W-3L (57%)',
        contra_top5: '0W-1L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'There are no common opponents between Chiesa and Harris in the UFC. Their careers followed very different paths: Chiesa is a long-time veteran with 21 fights in the organization, while Harris has only 7 UFC fights, having joined in 2021.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes per Minute', valueA: 1.87, valueB: 2.93, maxVal: 5, format: 'decimal' },
        { label: 'Strike Accuracy (%)', valueA: 40, valueB: 49, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 1.70, valueB: 2.44, maxVal: 5, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 54, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Takedowns per 15 Min', valueA: 3.33, valueB: 2.05, maxVal: 5, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 50, valueB: 29, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 60, valueB: 55, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '38 years old', fighter2: '38 years old', note: 'Same age, both born in 1987' },
        { label: 'Height', fighter1: '6\'1" (1.85m)', fighter2: '6\'0" (1.83m)', note: 'Chiesa slightly taller' },
        { label: 'Reach', fighter1: '75.5" (192cm)', fighter2: '76" (193cm)', note: 'Harris with half-inch advantage' },
        { label: 'Stance', fighter1: 'Southpaw', fighter2: 'Orthodox', note: 'Classic opposite stance matchup' },
        { label: 'Gym', fighter1: 'Sikjitsu, Spokane', fighter2: 'Renovacao Fight Team, Rio de Janeiro', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Offensive Grappling', valueA: 85, valueB: 72, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Chiesa has 12 career submissions and 3.33 takedowns per 15 minutes. Harris has creative submissions but lower volume (2.05 TD/15min).' },
        { label: 'Submissions & Jiu-Jitsu', valueA: 88, valueB: 78, labelA: 'Very Good', labelB: 'Very Good', advantage: 'fighter1', advantage_note: 'Chiesa has seven rear-naked chokes in the UFC, second most in organization history. Harris has anaconda and brabo chokes. Both dangerous on the ground.' },
        { label: 'Standing Striking', valueA: 40, valueB: 55, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Harris has more volume (2.93 SLpM vs 1.87) and better accuracy (49% vs 40%). Chiesa has never had a knockout in his career.' },
        { label: 'Takedown Defense', valueA: 65, valueB: 55, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Chiesa defends 60% of takedowns vs 55% for Harris. Modest difference but relevant in this grappler matchup.' },
        { label: 'Cardio & Endurance', valueA: 75, valueB: 65, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Chiesa showed solid cardio in 5-round fights against Magny and dos Anjos. Harris tends to burn energy seeking early finishes.' },
        { label: 'Durability & Chin', valueA: 70, valueB: 45, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Chiesa has never been knocked out in 26 professional fights. Harris has been knocked out three times in the UFC (Rakhmonov, Williams, Ponzinibbio).' },
      ],
      insight: 'A grappler vs grappler matchup with Chiesa holding the advantage in most metrics. The biggest difference is durability: Chiesa has never been knocked out while Harris has been stopped on the feet three times. On the ground, both are dangerous, but Chiesa has higher takedown volume and a superior submission track record. The only area where Harris has a clear edge is striking, but both fighters\' standing numbers are modest.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Chiesa',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 12, percent: 63 },
        decision: { count: 7, percent: 37 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Harris',
        ko_tko: { count: 5, percent: 26 },
        submission: { count: 6, percent: 32 },
        decision: { count: 8, percent: 42 },
        total_wins: 19,
      },
      insight: 'The contrast is revealing. Chiesa is a pure finisher: 63% of wins by submission, zero knockouts in his entire career. He seeks the ground, period. Harris is more balanced between KO (26%), submission (32%), and decision (42%), but that also means he is not dominant in any specific area. For Chiesa, the path is clear: take it to the ground and hunt the rear-naked choke. For Harris, the diversity can be both a strength and a weakness.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'BALANCED',
          color: 'gold',
          title: 'Scouting Territory',
          description: 'Both fighters tend to use the first round to study their opponent. Chiesa will seek the clinch and takedown, while Harris may attempt an opportunistic submission if he senses an opening. Both have shown the ability to finish in R1 (Chiesa submitted Ferguson and Iaquinta in the first; Harris finished Aguilera and Kasanganay). If either finds the opponent\'s back early, it could end fast.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'CHIESA ADVANTAGE',
          color: 'red',
          title: 'Maverick Pressure',
          description: 'The second round is historically where Chiesa begins to impose his will. With better cardio and superior takedown volume (3.33 vs 2.05 per 15 min), the pressure starts to accumulate. Harris, who spent energy trying to finish in R1, may start feeling the pace. Chiesa\'s takedown accuracy (50% vs Harris\'s 29%) becomes more relevant as fatigue sets in.',
        },
        {
          rounds: 'R3',
          danger_level: 8,
          danger_label: 'CHIESA ADVANTAGE',
          color: 'red',
          title: 'The Retirement Round',
          description: 'If the fight reaches the third round without a finish, Chiesa is the heavy favorite. His cardio is proven in 5-round fights against Rafael dos Anjos and Neil Magny. Harris, with two recent knockout losses, may be physically and mentally drained. Chiesa\'s extra motivation (last fight, at home, in front of family) could be the difference-maker in the final minutes.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Home Advantage: Seattle', fighter: 'Chiesa', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Chiesa is from Spokane, four hours from Seattle. He will have family, friends, and a massive crowd at Climate Pledge Arena. For his last career fight, this support is invaluable.' },
        { icon: 'Brain', title: 'Motivation: Retirement Fight', fighter: 'Chiesa', risk_level: 'POSITIVE', risk_color: 'green', description: 'Chiesa announced this will be his last fight. Fighters in farewell bouts tend to deliver superior performances with extra focus and determination. The emotional motivation is a real factor.' },
        { icon: 'AlertTriangle', title: 'Questionable Chin', fighter: 'Harris', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Two consecutive knockout losses (Williams in R1, Ponzinibbio in R3) raise red flags about Harris\'s durability. Even against Chiesa, who lacks knockout power, the accumulated damage may affect confidence.' },
        { icon: 'TrendingUp', title: 'Three Straight Wins', fighter: 'Chiesa', risk_level: 'POSITIVE', risk_color: 'green', description: 'After losses to Brady and Holland, Chiesa reinvented himself with three consecutive wins. Two by submission, showing his jiu-jitsu remains sharp. Confidence is at its highest since 2021.' },
        { icon: 'Clock', title: 'Harris\'s Relative Inactivity', fighter: 'Harris', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Harris\'s last fight was in January 2025, over 14 months ago. Combined with recent losses, ring rust could be an additional factor.' },
        { icon: 'Shield', title: 'Never Knocked Out in 26 Fights', fighter: 'Chiesa', risk_level: 'POSITIVE', risk_color: 'green', description: 'Chiesa has never been stopped by strikes in his entire professional career. The only strike stoppage was a doctor stoppage due to a cut against Joe Lauzon. The durability is extraordinary.' },
        { icon: 'Zap', title: 'Exotic Submissions', fighter: 'Harris', risk_level: 'POSITIVE', risk_color: 'green', description: 'Harris has a submission arsenal different from most: anaconda chokes and brabo chokes. These techniques can surprise even experienced grapplers like Chiesa if the angle is right.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Chiesa',
        total_probability: 65,
        scenarios: [
          { name: 'The Farewell Rear-Naked Choke', probability: 30, method: 'Submission R2-R3 (rear-naked choke)', description: 'Chiesa implements his classic game plan: clinch against the fence, takedown, take the back and lock in the rear-naked choke. Harris, less explosive in later rounds, cannot escape. The perfect ending for his career.' },
          { name: 'Total Control for 15 Minutes', probability: 25, method: 'Unanimous Decision', description: 'Chiesa does not find the finish but controls the entire fight with takedowns and positional pressure. He wins all three rounds with dominant grappling and takes a clear unanimous decision.' },
          { name: 'Quick Submission', probability: 10, method: 'Submission R1', description: 'Chiesa finds an opening early, locks in the clinch and quickly transitions to the back. Harris, attempting a submission of his own, leaves space and Chiesa capitalizes.' },
        ],
      },
      fighter2: {
        nome: 'Harris',
        total_probability: 32,
        scenarios: [
          { name: 'Surprise Anaconda', probability: 15, method: 'Submission R1-R2 (anaconda or brabo choke)', description: 'Harris surprises Chiesa with an opportunistic submission during a takedown attempt. The anaconda choke is Harris\'s most dangerous weapon and can catch Chiesa in transition.' },
          { name: 'Superior Striking', probability: 10, method: 'Split Decision', description: 'Harris keeps the fight standing, uses his superior strike volume (2.93 vs 1.87 SLpM) and defends enough takedowns to take a close decision. Unlikely scenario but possible.' },
          { name: 'TKO by Accumulation', probability: 7, method: 'TKO R2-R3', description: 'Harris hurts Chiesa on the feet, accumulates damage and forces a stoppage. Less likely scenario given that Chiesa has never been knocked out, but Harris has shown power standing.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Michael Chiesa',
      winner_side: 'fighter1',
      predicted_method: 'Submission R2 or Unanimous Decision',
      confidence_score: 7,
      confidence_label: 'MEDIUM-HIGH',
      explanation: 'Chiesa enters this fight with clear advantages in virtually every area that matters for this matchup. His grappling is superior in volume and effectiveness (3.33 takedowns per 15 min with 50% accuracy vs 2.05 and 29% for Harris). The durability is incomparable: Chiesa has never been knocked out, while Harris comes off two KO losses. The home advantage, retirement motivation, and three-fight winning streak give Chiesa a significant psychological edge. The only real threat is Harris\'s exotic submissions, which can surprise in transition. But Chiesa is a jiu-jitsu black belt experienced enough to navigate that danger.',
      x_factor: {
        title: 'The Energy of the Last Fight',
        description: 'Fighters in farewell bouts frequently deliver above-normal performances. The Seattle crowd, family present, the emotion of the moment. Chiesa can channel all of that into a memorable performance to crown a 14-year UFC career.',
      },
      upset_alert: {
        title: 'Harris\'s Anaconda Choke',
        description: 'Harris has earned two Performance of the Night bonuses with surprise submissions. If Chiesa gets careless on a takedown attempt, Harris can lock in an anaconda or brabo choke. It is the kind of move that happens too fast to react.',
      },
      probabilities: {
        fighter1: { nome: 'Chiesa', percent: 65 },
        fighter2: { nome: 'Harris', percent: 32 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Chiesa', reasoning: 'Justified favorite. Better grappling, better durability, home advantage, retirement motivation. Comfortable line.' },
        method: { pick: 'Chiesa by submission', reasoning: 'With 63% of wins by submission and seven rear-naked chokes in the UFC, the chance of Chiesa finishing is high. Harris has been submitted before and his recent KO losses suggest overall fragility.' },
        over_under: { pick: 'Under 2.5 rounds', rounds: 2.5, reasoning: 'Two active grapplers who seek finishes. Chiesa submitted Ferguson in R1 and Griffin in R3. Harris submitted Wells in R3 and Aguilera in R1. High probability of submission before the final round.' },
        best_value: 'Chiesa by submission is the best value bet. His style converges toward that finish and Harris is vulnerable on the ground against superior grapplers.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Chiesa\'s First Takedown Attempt', icon: 'Target', description: 'If Chiesa lands the first clean takedown in the first two minutes, the fight can follow his script quickly. Watch Harris\'s reaction when taken down: if he accepts bottom position, Chiesa will immediately hunt the back and the rear-naked choke.' },
        { num: 2, title: 'Harris\'s Ground Transitions', icon: 'Activity', description: 'Harris\'s danger lies in scrambles and transitions. Anaconda chokes and brabo chokes are locked in during takedown attempts and reversals. If Harris can reverse position or lock in an overhook during the clinch, the submission can come out of nowhere.' },
        { num: 3, title: 'Strike Volume in the First Round', icon: 'Crosshair', description: 'Harris has superior strike volume (2.93 vs 1.87 SLpM). If he can maintain distance and score on the feet in R1, he can build confidence and make Chiesa\'s game plan harder. Harris\'s accuracy (49% vs 40%) also deserves attention.' },
        { num: 4, title: 'Harris\'s Cardio in R3', icon: 'Shield', description: 'Harris was finished in R3 against Ponzinibbio and spent energy chasing submissions against Wells. If the fight reaches the third round, watch if Harris slows down. Chiesa, with 5-round fight experience, can capitalize on any drop in pace.' },
        { num: 5, title: 'Chiesa\'s Emotion During the Walkout', icon: 'Brain', description: 'This will be Chiesa\'s last walk to the octagon. The emotion can be a double-edged sword: extra motivation or a distraction. Watch his body language before the fight. If he is focused and controlled, good sign. If he is overly emotional, Harris can exploit it.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'THE LAST FIGHT', content: 'CHIESA vs HARRIS\nUFC Seattle | March 28\nClimate Pledge Arena\n\n19-7 vs 19-7\nSame record. Opposite destinies.\nChiesa says goodbye to MMA.', color: 'red' },
        { slide_number: 2, title: 'CHIESA: THE MAVERICK', content: 'TUF Live Champion\n19-7 career (12 by submission)\n7 rear-naked chokes in the UFC\nNever knocked out in 26 fights\n3 straight wins\n14 years in the UFC\nFarewell fight at home', color: 'red' },
        { slide_number: 3, title: 'HARRIS: MOCAMBIQUE', content: 'First Guyanese in the UFC\n19-7 career\n4-3 in the UFC\n2 Performance of the Night\nAnaconda choke specialist\n2 consecutive KO losses\nMust win to survive on the roster', color: 'blue' },
        { slide_number: 4, title: 'GRAPPLING vs GRAPPLING', content: 'CHIESA:\n12 career submissions\n50% takedown accuracy\n3.33 TDs per 15 min\n\nHARRIS:\n6 career submissions\n29% takedown accuracy\n2.05 TDs per 15 min\n\nChiesa dominates the numbers.', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'CHIESA by Submission R2\n\nConfidence: MEDIUM-HIGH\n65% Chiesa / 32% Harris\n\nThe farewell rear-naked choke.\nHarris is dangerous in transitions,\nbut Chiesa is the superior grappler.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Chiesa vs Harris at UFC Seattle. The Maverick\'s last fight. 14 years in the UFC. 7 rear-naked chokes. Never knocked out. And he wants to retire with a finish at home. Thread:' },
        { num: '2/6', text: 'Chiesa (19-7): 3 straight wins. Submitted Ferguson in R1. Submitted Griffin in R3. Beat McGee by decision. His jiu-jitsu is sharper than ever at 38.' },
        { num: '3/6', text: 'Harris (19-7): 2 straight KO losses. Ponzinibbio and Williams stopped him. But make no mistake: Harris has 2 Performance of the Night bonuses by submission. The anaconda choke is dangerous. The question is his chin.' },
        { num: '4/6', text: 'The grappling numbers don\'t lie: Chiesa has 3.33 TDs per 15 min with 50% accuracy. Harris has 2.05 with 29%. In a grappler duel, Chiesa\'s volume should prevail.' },
        { num: '5/6', text: 'Fact few people know: Chiesa has NEVER been knocked out in 26 professional fights. Zero KOs suffered. Harris has been KO\'d 3x in the UFC. The durability gap here is extreme.' },
        { num: '6/6', text: 'My pick: Chiesa by submission in the second round. The farewell rear-naked choke at home, in front of family. If Harris survives the grappling, Chiesa wins by decision. RT if you agree.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'He won TUF. He has 7 rear-naked chokes in the UFC. Never been knocked out. And Saturday will be his LAST fight. Michael Chiesa says goodbye to MMA at home in Seattle.' },
        { time: '10-25s', title: 'Context', text: 'Chiesa is on a three-fight winning streak, including submissions over Tony Ferguson and Max Griffin. On the other side, Carlston Harris, the first Guyanese in the UFC, is coming off two KO losses. But Harris has exotic submissions that can surprise anyone.' },
        { time: '25-45s', title: 'Analysis', text: 'When two grapplers face off, the fight is decided in the details. Chiesa has 3.33 takedowns per 15 minutes with 50% accuracy. Harris has 2.05 with only 29%. On the ground, Chiesa hunts the rear-naked choke. Harris hunts the anaconda choke. The difference? Chiesa has never been knocked out in 26 fights. Harris has been stopped on the feet three times in the UFC.' },
        { time: '45-55s', title: 'Prediction', text: 'My pick: Chiesa by submission in the second round. His grappling is superior, his cardio is better, and the motivation to retire with a win at home is enormous. But watch out for Harris in transitions. His anaconda choke has earned two bonuses.' },
        { time: '55-65s', title: 'CTA', text: 'Does Chiesa get the perfect farewell? Comment below with your prediction and follow for the full UFC Seattle card analysis.' },
      ],
      tiktok: [
        { hook: 'LAST FIGHT for a 14-year UFC veteran, and he wants to go out IN STYLE.', body: 'Michael Chiesa, 7 rear-naked chokes in the UFC, never knocked out in 26 fights, is retiring at home in Seattle against Carlston Harris. Chiesa is on 3 straight wins. Harris is on 2 KO losses. Sounds easy, but Harris has exotic submissions that can surprise ANYONE.', cta: 'Comment CHIESA or HARRIS!' },
        { hook: 'This guy has NEVER been knocked out in 26 fights and Saturday is the last one.', body: 'Michael Chiesa. TUF champion. 12 career submissions. 7 rear-naked chokes in the UFC. And now he wants to end his career at home in Seattle with another finish. The opponent? Carlston Harris, who has deadly anaconda chokes but is coming off two KO losses.', cta: 'Will it be a submission? Comment how you think it ends!' },
        { hook: 'The first Guyanese in the UFC could ruin the retirement party.', body: 'Carlston Harris. Came from Guyana, worked as a mechanic in Brazil, joined the UFC and won 2 Performance of the Night bonuses with submissions. He faces Chiesa, who retires at home. Harris is desperate, coming off 2 KO losses, and needs a win to stay in the UFC.', cta: 'Can Harris pull the upset? Comment!' },
      ],
      headlines: [
        'Chiesa vs Harris: The Maverick Seeks the Perfect Farewell in Seattle',
        'Seven Rear-Naked Chokes and a Farewell: Chiesa Wants to End His Career with a Finish at Home',
        'Harris the Party Crasher? The Anaconda Choke Danger at Chiesa\'s Retirement',
        'Never Knocked Out in 26 Fights: Michael Chiesa\'s Extraordinary Durability',
        'Grappler vs Grappler: Why Chiesa vs Harris Could Be a Jiu-Jitsu Masterclass at UFC Seattle',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-300',
        fighter2_odds: '+240',
        fighter1_name: 'Michael Chiesa',
        fighter2_name: 'Carlston Harris',
        source: 'Estimate based on fight profile (March 2026). Exact odds not available after card change.',
      },
      edges: [
        { icon: 'Target', titulo: 'Takedown Volume', stat_headline: 'CHIESA: 3.33 TAKEDOWNS PER 15 MIN WITH 50% ACCURACY', contexto: 'Chiesa is one of the best in the division at taking the fight to the ground. Harris has only 29% accuracy and 2.05 TDs per 15 min.', implicacao_aposta: 'Favors Chiesa by decision or submission. The fight goes to the ground.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Unmatched Durability', stat_headline: 'CHIESA: ZERO KNOCKOUTS SUFFERED IN 26 PROFESSIONAL FIGHTS', contexto: 'In his entire career, Chiesa has never been stopped by strikes. Harris has been knocked out 3x in the UFC.', implicacao_aposta: 'Drastically reduces Harris\'s chances of winning by KO/TKO.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Harris\'s Exotic Submissions', stat_headline: '2 PERFORMANCE OF THE NIGHT BY SUBMISSION IN THE UFC', contexto: 'Anaconda chokes and brabo chokes are weapons that can surprise even experienced grapplers. Harris has shown he can finish in R1.', implicacao_aposta: 'Only realistic upset scenario. Harris by submission deserves attention.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'TrendingUp', titulo: 'Opposite Momentum', stat_headline: 'CHIESA: 3 STRAIGHT WINS. HARRIS: 2 CONSECUTIVE KO LOSSES', contexto: 'The momentum contrast is stark. Chiesa is confident and sharp. Harris may be psychologically shaken after two knockouts.', implicacao_aposta: 'Strongly favors Chiesa. Psychological momentum matters.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Home Advantage in Seattle', stat_headline: 'CHIESA WAS BORN AND RAISED IN WASHINGTON, 4 HOURS FROM SEATTLE', contexto: 'Last career fight, at home, in front of family and friends. Climate Pledge Arena will be chanting his name.', implicacao_aposta: 'Motivation and crowd support add intangible advantage.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Method', pick: 'Chiesa by Submission', odds: 'Based on available data', confianca: 'alta', edge_vs_mercado: '63% of Chiesa\'s wins are by submission. Harris vulnerable on the ground.', raciocinio: 'Chiesa finishes by submission in more than half his wins. In the UFC, that\'s 7 rear-naked chokes. Harris, despite being a grappler, has inferior takedown defense (55%) and has been submitted in his career. This is the most likely outcome of this fight.' },
        { tipo: 'Duration', pick: 'Fight does not go to decision', odds: 'Based on available data', confianca: 'media', edge_vs_mercado: 'Two active grapplers who seek finishes', raciocinio: 'Chiesa finished in his last two wins (Ferguson R1, Griffin R3). Harris has 6 career submissions. With two aggressive grapplers, the chance of a finish before the third round is significant.' },
        { tipo: 'Moneyline', pick: 'Chiesa', odds: 'Based on available data', confianca: 'alta', raciocinio: 'Justified favorite by virtually every metric: superior grappling, durability, momentum, home advantage, and motivation. Harris needs something special to win.' },
      ],
      armadilha: {
        titulo: 'Trap: Harris by KO/TKO',
        descricao: 'Harris has 5 career knockouts, but Chiesa has NEVER been knocked out in 26 professional fights. Betting on Harris by KO/TKO is betting against 14 years of evidence. If Harris wins, it will be by submission, not by strikes.',
      },
      disclaimer: 'Statistical analysis for informational purposes. Gamble responsibly.',
    },
  },
};

// ===============================================================
// FRENCH VERSION
// ===============================================================
const analiseFR: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Chiesa vs Harris: La Derniere Marche du Maverick',
  subtitulo: 'Le veteran de Washington cherche la retraite parfaite contre le dangereux grappeur guyanais',
  evento_data: '28 mars 2026',
  categoria_peso: 'Poids Mi-Moyen (170 lbs)',
  fight_prediction: {
    ...analisePT.fight_prediction,
    predictedMethod: 'Soumission R2-R3',
    confidence: 'MOYENNE-HAUTE',
  },
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Court McGee', method: 'Decision Unanime', event: 'UFC on ESPN' },
      { result: 'W', opponent: 'Max Griffin', method: 'Soumission R3 (rear-naked choke)', event: 'UFC 310' },
      { result: 'W', opponent: 'Tony Ferguson', method: 'Soumission R1 (rear-naked choke)', event: 'UFC on ABC 7' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Santiago Ponzinibbio', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Khaos Williams', method: 'KO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Jeremiah Wells', method: 'Soumission R3 (anaconda choke)', event: 'UFC on ESPN' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 mars 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Poids Mi-Moyen (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'La Derniere Marche du Maverick',
      tagline_sub: 'Chiesa fait ses adieux au MMA chez lui face au dangereux grappeur guyanais',
      fighter1: {
        nome_completo: 'Michael "Maverick" Chiesa',
        apelido: 'Maverick',
        sobrenome: 'Chiesa',
        record: '19-7-0',
        ranking: 'N/R Poids Mi-Moyen',
        info_extra: 'Spokane, Washington | 38 ans',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Carlston "Mocambique" Harris',
        apelido: 'Mocambique',
        sobrenome: 'Harris',
        record: '19-7-0',
        ranking: 'N/R Poids Mi-Moyen',
        info_extra: 'Skeldon, Guyana | 38 ans',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Adieux a la Maison</h3>
        <p class="mb-4">
          Apres 14 ans de carriere et plus de 20 combats dans l'octogone, <strong class="text-ufc-red">Michael Chiesa</strong> a annonce que la soiree du 28 mars sera la derniere fois qu'il marchera jusqu'a la cage. Et ce n'est pas une coincidence s'il le fait a Seattle, a quatre heures de Spokane, la ville qu'il a toujours representee. L'homme qui a remporte la premiere saison de The Ultimate Fighter: Live, qui a accumule sept finalisations par rear-naked choke a l'UFC, et qui n'a jamais abandonne meme quand tout allait mal, veut terminer son histoire avec une victoire devant son public.
        </p>
        <p class="mb-4">
          De l'autre cote, <strong class="text-blue-400">Carlston Harris</strong> n'est pas venu pour participer a la ceremonie de retraite de qui que ce soit. Le Guyanais, premier athlete de son pays a concourir a l'UFC, apporte un style de grappling etouffant avec des soumissions creatives comme les anaconda chokes et brabo chokes qui lui ont deja valu des bonus de Performance de la Soiree. Cependant, Harris arrive dans ce combat apres deux defaites consecutives par KO contre Khaos Williams et Santiago Ponzinibbio. La pression est enorme pour les deux, mais pour des raisons completement differentes.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Serie qui a Ressuscite Chiesa</h3>
        <p class="mb-4">
          En 2023, apres avoir perdu contre Kevin Holland par soumission au premier round, beaucoup pensaient que Chiesa etait fini. Deux defaites consecutives (Sean Brady avant Holland), sans classement, 36 ans. Mais le Maverick a repondu de la meilleure facon possible: trois victoires consecutives. Il a soumis Tony Ferguson au premier round. Il a soumis Max Griffin au troisieme. Et il a battu Court McGee par decision unanime. Cette serie a prouve que le jiu-jitsu de Chiesa reste affute et qu'il a encore beaucoup a offrir.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Grappling contre Grappling</h3>
        <p class="mb-4">
          Ce combat a tout pour aller au sol. Chiesa a 12 soumissions en carriere, avec en vedette les rear-naked chokes qui sont sa marque de fabrique. Harris a six soumissions avec un arsenal plus exotique: anaconda chokes et brabo chokes. Quand deux grapplers d'elite se rencontrent, le combat se joue generalement dans les transitions, les renversements, les details techniques que seuls ceux qui s'entrainent au jiu-jitsu comprennent. C'est exactement le type de bataille que nous pouvons attendre.
        </p>
      `,
      stakes: [
        { dimensao: 'Serie', fighter1: '3 victoires consecutives', fighter2: '2 defaites consecutives' },
        { dimensao: 'Objectif', fighter1: 'Retraite avec victoire a domicile', fighter2: 'Briser la serie negative' },
        { dimensao: 'Recit', fighter1: 'L\'adieu parfait pour un veteran de l\'UFC', fighter2: 'Prouver qu\'il appartient a l\'UFC apres deux KO subis' },
        { dimensao: 'Risque', fighter1: 'Perdre son dernier combat de carriere', fighter2: 'Troisieme defaite consecutive pourrait signifier le renvoi de l\'UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'L\'ADIEU PARFAIT',
          subtitulo: 'Chiesa soumet Harris et prend sa retraite avec une victoire devant les fans de Washington',
          consequencias: [
            { tag: 'HERITAGE', texto: 'Chiesa termine sa carriere avec 20 victoires, cimentant son heritage comme l\'un des meilleurs grapplers de l\'histoire des poids mi-moyens de l\'UFC' },
            { tag: 'SOUMISSION', texto: 'S\'il gagne par rear-naked choke, Chiesa egale ou depasse les records historiques de finalisations par RNC a l\'UFC' },
            { tag: 'HARRIS', texto: 'Trois defaites consecutives placent Harris dans une situation critique au sein du roster de l\'UFC' },
          ],
          proxima_luta: 'Retraite. Chiesa termine sa carriere en tant que veteran respecte.',
        },
        fighter2_vence: {
          titulo: 'LE TROUBLE-FETE DU GUYANA',
          subtitulo: 'Harris cree la surprise et gache les adieux de Chiesa a Seattle',
          consequencias: [
            { tag: 'SURVIE', texto: 'Harris met fin a sa serie de deux defaites et gagne du temps au sein du roster de l\'UFC' },
            { tag: 'AMER', texto: 'Chiesa prend sa retraite avec une defaite devant son public, fin douloureuse pour une carriere historique' },
            { tag: 'CARRIERE', texto: 'Harris peut demander un adversaire classe au prochain evenement pour reprendre son ascension' },
          ],
          proxima_luta: 'Harris vs un adversaire classe dans le top 15 des poids mi-moyens',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Chiesa',
        color: 'red',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire solide par decision contre un veteran. A controle le combat avec le grappling et la pression.' },
          { date: 'Dec 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'A soumis Griffin avec un rear-naked choke au troisieme round lors de son anniversaire UFC au UFC 310.' },
          { date: 'Aou 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'A soumis Ferguson rapidement au premier round. Demonstration de domination au grappling.' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (brabo choke)', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bon', note: 'Defaite rapide par soumission contre Holland. Surpris au sol par un adversaire plus long.' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'Decision Unanime', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Bon', note: 'Defaite par decision contre un prospect en ascension. Combat competitif mais Brady etait superieur.' },
        ],
        full_fight_history: [
          { date: 'Jun 2012', opponent: 'Al Iaquinta', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Finale du TUF Live, victoire par soumission' },
          { date: 'Fev 2013', opponent: 'Anton Kuivanen', result: 'W', method: 'Sub R2 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'UFC 157' },
          { date: 'Aou 2013', opponent: 'Jorge Masvidal', result: 'L', method: 'Sub R2 (d\'arce choke)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bon', note: 'Premiere defaite de carriere contre future star' },
          { date: 'Mar 2014', opponent: 'Colton Smith', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Soumission rapide' },
          { date: 'Sep 2014', opponent: 'Joe Lauzon', result: 'L', method: 'TKO R1 (coupure)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Arret medical par coupure' },
          { date: 'Dec 2015', opponent: 'Jim Miller', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire par soumission contre veteran' },
          { date: 'Avr 2016', opponent: 'Beneil Dariush', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bon', note: 'Performance de la Soiree' },
          { date: 'Jul 2016', opponent: 'Joe Lauzon', result: 'W', method: 'Sub R2 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Revanche, rear-naked choke au deuxieme' },
          { date: 'Jun 2017', opponent: 'Kevin Lee', result: 'L', method: 'Sub R1', opponent_rank: '#7 LW', quality_score: 4, quality_label: 'Tres Bon', note: 'Defaite par soumission contre futur pretendant au titre' },
          { date: 'Dec 2017', opponent: 'Anthony Pettis', result: 'L', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Tres Bon', note: 'Defaite contre ancien champion des poids legers' },
          { date: 'Jul 2018', opponent: 'Carlos Condit', result: 'W', method: 'Sub R2 (kimura)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bon', note: 'Premier combat en poids mi-moyen' },
          { date: 'Mai 2019', opponent: 'Diego Sanchez', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire par decision unanime' },
          { date: 'Jan 2020', opponent: 'Rafael dos Anjos', result: 'W', method: 'UD', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Tres Bon', note: 'Plus grande victoire de carriere contre ancien champion' },
          { date: 'Jan 2021', opponent: 'Neil Magny', result: 'W', method: 'UD', opponent_rank: '#9 WW', quality_score: 3, quality_label: 'Bon', note: 'A domine 5 rounds avec le grappling' },
          { date: 'Jun 2021', opponent: 'Vicente Luque', result: 'L', method: 'Sub R1 (d\'arce choke)', opponent_rank: '#6 WW', quality_score: 4, quality_label: 'Tres Bon', note: 'Defaite par soumission contre top contender' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Bon', note: 'Defaite par decision' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bon', note: 'Defaite par soumission' },
          { date: 'Aou 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Soumission rapide' },
          { date: 'Dec 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Rear-naked choke au troisieme' },
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Decision unanime' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'En Ascension',
        momentum_trend: 'ascending',
        momentum_note: 'Chiesa est sur une serie de trois victoires consecutives, dont deux soumissions par rear-naked choke. Apres avoir semble fini avec les defaites contre Brady et Holland, il a resurgi contre des adversaires de niveau inferieur mais avec des performances convaincantes. L\'elan est bon, mais il est important de noter que Ferguson, Griffin et McGee ne sont pas des adversaires d\'elite. La confiance est elevee, surtout avec la motivation supplementaire de combattre a domicile lors de son dernier combat de carriere.',
      },
      fighter2: {
        nome: 'Carlston Harris',
        color: 'blue',
        recent_fights: [
          { date: 'Jan 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Harris combattait bien mais a ete arrete au troisieme round. Vulnerabilite en striking exposee.' },
          { date: 'Mai 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO rapide par Williams au premier round. Menton questionnable apres deux KO consecutifs.' },
          { date: 'Aou 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Soumission par anaconda choke au troisieme round. Performance de la Soiree. Harris a son meilleur.' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire par decision contre un adversaire de niveau inferieur.' },
        ],
        full_fight_history: [
          { date: 'Mai 2021', opponent: 'Christian Aguilera', result: 'W', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Debut a l\'UFC, Performance de la Soiree' },
          { date: 'Sep 2021', opponent: 'Impa Kasanganay', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'KO au premier round' },
          { date: 'Fev 2022', opponent: 'Shavkat Rakhmonov', result: 'L', method: 'KO R1', opponent_rank: '#15 WW', quality_score: 5, quality_label: 'Excellent', note: 'KO par le futur pretendant au titre' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Decision unanime' },
          { date: 'Aou 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Anaconda choke, Performance de la Soiree' },
          { date: 'Mai 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO au premier round' },
          { date: 'Jan 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'TKO au troisieme round' },
        ],
        layoff_warning: null,
        momentum_score: 3,
        momentum_label: 'En Declin',
        momentum_trend: 'descending',
        momentum_note: 'Harris arrive dans ce combat au pire moment de sa carriere UFC. Deux defaites consecutives par KO (Williams et Ponzinibbio) soulevent des questions serieuses sur la solidite de son menton. Sa seule defaite precedente a l\'UFC avait ete contre Shavkat Rakhmonov, pretendant au titre. Maintenant les KO sont venus contre des adversaires de niveau moyen, ce qui est plus inquietant. Le grappling reste dangereux, mais si le combat reste debout, Harris est vulnerable.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Chiesa',
        media_oponentes: 3,
        media_oponentes_label: 'Bon',
        aproveitamento: '12W-7L (63%)',
        contra_top5: '1W-1L',
      },
      fighter2: {
        nome: 'Harris',
        media_oponentes: 2,
        media_oponentes_label: 'Moyen',
        aproveitamento: '4W-3L (57%)',
        contra_top5: '0W-1L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Il n\'y a pas d\'adversaires communs entre Chiesa et Harris a l\'UFC. Leurs carrieres ont suivi des trajectoires tres differentes: Chiesa est un veteran de longue date avec 21 combats dans l\'organisation, tandis que Harris n\'a que 7 combats UFC, etant entre seulement en 2021.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Coups Sig. par Minute', valueA: 1.87, valueB: 2.93, maxVal: 5, format: 'decimal' },
        { label: 'Precision des Coups (%)', valueA: 40, valueB: 49, maxVal: 100, format: 'percent' },
        { label: 'Coups Absorbes/Min', valueA: 1.70, valueB: 2.44, maxVal: 5, format: 'decimal', reverseWinner: true },
        { label: 'Defense des Coups (%)', valueA: 54, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Takedowns par 15 Min', valueA: 3.33, valueB: 2.05, maxVal: 5, format: 'decimal' },
        { label: 'Precision Takedown (%)', valueA: 50, valueB: 29, maxVal: 100, format: 'percent' },
        { label: 'Defense Takedown (%)', valueA: 60, valueB: 55, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '38 ans', fighter2: '38 ans', note: 'Meme age, tous deux nes en 1987' },
        { label: 'Taille', fighter1: '1,85m (6\'1")', fighter2: '1,83m (6\'0")', note: 'Chiesa legerement plus grand' },
        { label: 'Allonge', fighter1: '192cm (75.5")', fighter2: '193cm (76")', note: 'Harris avec un demi-pouce d\'avantage' },
        { label: 'Garde', fighter1: 'Gaucher', fighter2: 'Orthodoxe', note: 'Confrontation classique de gardes opposees' },
        { label: 'Gym', fighter1: 'Sikjitsu, Spokane', fighter2: 'Renovacao Fight Team, Rio de Janeiro', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Grappling Offensif', valueA: 85, valueB: 72, labelA: 'Tres Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'Chiesa a 12 soumissions en carriere et 3.33 takedowns par 15 minutes. Harris a des soumissions creatives mais un volume inferieur (2.05 TD/15min).' },
        { label: 'Soumissions & Jiu-Jitsu', valueA: 88, valueB: 78, labelA: 'Tres Bon', labelB: 'Tres Bon', advantage: 'fighter1', advantage_note: 'Chiesa a sept rear-naked chokes a l\'UFC, deuxieme dans l\'histoire de l\'organisation. Harris a des anaconda et brabo chokes. Les deux sont dangereux au sol.' },
        { label: 'Striking Debout', valueA: 40, valueB: 55, labelA: 'Moyen', labelB: 'Bon', advantage: 'fighter2', advantage_note: 'Harris a plus de volume (2.93 SLpM vs 1.87) et meilleure precision (49% vs 40%). Chiesa n\'a jamais eu de KO en carriere.' },
        { label: 'Defense de Takedown', valueA: 65, valueB: 55, labelA: 'Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'Chiesa defend 60% des takedowns contre 55% pour Harris. Difference modeste mais pertinente dans ce duel de grapplers.' },
        { label: 'Cardio & Endurance', valueA: 75, valueB: 65, labelA: 'Tres Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'Chiesa a montre un cardio solide dans des combats de 5 rounds contre Magny et dos Anjos. Harris a tendance a depenser de l\'energie en cherchant des finalisations tot.' },
        { label: 'Solidite & Menton', valueA: 70, valueB: 45, labelA: 'Bon', labelB: 'Moyen', advantage: 'fighter1', advantage_note: 'Chiesa n\'a jamais ete KO en 26 combats professionnels. Harris a ete KO trois fois a l\'UFC (Rakhmonov, Williams, Ponzinibbio).' },
      ],
      insight: 'Un duel de grapplers ou Chiesa a l\'avantage dans la plupart des metriques. La grande difference est la solidite: Chiesa n\'a jamais ete KO tandis que Harris a ete arrete debout trois fois. Au sol, les deux sont dangereux, mais Chiesa a un volume de takedowns superieur et un historique de soumissions superieur. Le seul domaine ou Harris a un avantage clair est le striking, mais les chiffres debout des deux combattants sont modestes.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Chiesa',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 12, percent: 63 },
        decision: { count: 7, percent: 37 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Harris',
        ko_tko: { count: 5, percent: 26 },
        submission: { count: 6, percent: 32 },
        decision: { count: 8, percent: 42 },
        total_wins: 19,
      },
      insight: 'Le contraste est revelateur. Chiesa est un pur finisseur: 63% de victoires par soumission, zero KO dans toute sa carriere. Il cherche le sol, point final. Harris est plus equilibre entre KO (26%), soumission (32%) et decision (42%), mais cela signifie aussi qu\'il n\'est dominant dans aucun domaine specifique. Pour Chiesa, le chemin est clair: amener au sol et chercher le rear-naked choke. Pour Harris, la diversite peut etre a la fois une force et une faiblesse.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'EQUILIBRE',
          color: 'gold',
          title: 'Territoire de Reconnaissance',
          description: 'Les deux combattants ont tendance a utiliser le premier round pour etudier l\'adversaire. Chiesa va chercher le clinch et le takedown, tandis que Harris peut tenter une soumission opportuniste s\'il sent une ouverture. Les deux ont montre la capacite de finir au R1 (Chiesa a soumis Ferguson et Iaquinta au premier; Harris a fini Aguilera et Kasanganay). Si l\'un des deux trouve le dos de l\'adversaire tot, cela peut se terminer vite.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'AVANTAGE CHIESA',
          color: 'red',
          title: 'Pression du Maverick',
          description: 'Le deuxieme round est historiquement l\'endroit ou Chiesa commence a imposer sa volonte. Avec un meilleur cardio et un volume de takedowns superieur (3.33 vs 2.05 par 15 min), la pression commence a s\'accumuler. Harris, qui a depense de l\'energie pour tenter de finir au R1, peut commencer a sentir le rythme. La precision de takedown de Chiesa (50% vs 29% pour Harris) devient plus pertinente a mesure que la fatigue s\'installe.',
        },
        {
          rounds: 'R3',
          danger_level: 8,
          danger_label: 'AVANTAGE CHIESA',
          color: 'red',
          title: 'Round de la Retraite',
          description: 'Si le combat atteint le troisieme round sans finalisation, Chiesa est le grand favori. Son cardio est prouve dans des combats de 5 rounds contre Rafael dos Anjos et Neil Magny. Harris, avec deux defaites recentes par KO, peut etre physiquement et mentalement epuise. La motivation supplementaire de Chiesa (dernier combat, a domicile, devant la famille) pourrait faire la difference dans les dernieres minutes.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Avantage a Domicile: Seattle', fighter: 'Chiesa', risk_level: 'ENORME POSITIF', risk_color: 'green', description: 'Chiesa vient de Spokane, a quatre heures de Seattle. Il aura famille, amis et un public enorme au Climate Pledge Arena. Pour son dernier combat de carriere, ce soutien est inestimable.' },
        { icon: 'Brain', title: 'Motivation: Combat de Retraite', fighter: 'Chiesa', risk_level: 'POSITIF', risk_color: 'green', description: 'Chiesa a annonce que ce sera son dernier combat. Les combattants en adieu ont tendance a livrer des performances superieures avec un focus et une determination supplementaires. La motivation emotionnelle est un facteur reel.' },
        { icon: 'AlertTriangle', title: 'Menton Questionnable', fighter: 'Harris', risk_level: 'RISQUE ELEVE', risk_color: 'red', description: 'Deux defaites consecutives par KO (Williams au R1, Ponzinibbio au R3) levent des drapeaux rouges sur la solidite de Harris. Meme contre Chiesa, qui n\'a pas de puissance de KO, les dommages accumules peuvent affecter la confiance.' },
        { icon: 'TrendingUp', title: 'Trois Victoires Consecutives', fighter: 'Chiesa', risk_level: 'POSITIF', risk_color: 'green', description: 'Apres les defaites contre Brady et Holland, Chiesa s\'est reinvente avec trois victoires consecutives. Deux par soumission, montrant que le jiu-jitsu reste affute. La confiance est a son plus haut depuis 2021.' },
        { icon: 'Clock', title: 'Inactivite Relative de Harris', fighter: 'Harris', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'Le dernier combat de Harris remonte a janvier 2025, il y a plus de 14 mois. Combine aux defaites recentes, la rouille peut etre un facteur supplementaire.' },
        { icon: 'Shield', title: 'Jamais KO en 26 Combats', fighter: 'Chiesa', risk_level: 'POSITIF', risk_color: 'green', description: 'Chiesa n\'a jamais ete arrete par des coups dans toute sa carriere professionnelle. Le seul arret par coups etait un arret medical pour coupure contre Joe Lauzon. La solidite est extraordinaire.' },
        { icon: 'Zap', title: 'Soumissions Exotiques', fighter: 'Harris', risk_level: 'POSITIF', risk_color: 'green', description: 'Harris possede un arsenal de soumissions different de la plupart: anaconda chokes et brabo chokes. Ces techniques peuvent surprendre meme des grapplers experimentes comme Chiesa si l\'angle est correct.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Chiesa',
        total_probability: 65,
        scenarios: [
          { name: 'Le Rear-Naked Choke d\'Adieu', probability: 30, method: 'Soumission R2-R3 (rear-naked choke)', description: 'Chiesa met en oeuvre son plan classique: clinch contre la grille, takedown, prend le dos et verrouille le rear-naked choke. Harris, moins explosif dans les rounds tardifs, ne peut pas s\'echapper. La fin parfaite pour sa carriere.' },
          { name: 'Controle Total pendant 15 Minutes', probability: 25, method: 'Decision Unanime', description: 'Chiesa ne trouve pas la finalisation mais controle tout le combat avec des takedowns et une pression positionnelle. Il remporte les trois rounds avec un grappling dominant et obtient une decision unanime claire.' },
          { name: 'Soumission Rapide', probability: 10, method: 'Soumission R1', description: 'Chiesa trouve une ouverture tot, verrouille le clinch et transite rapidement vers le dos. Harris, tentant sa propre soumission, laisse de l\'espace et Chiesa capitalise.' },
        ],
      },
      fighter2: {
        nome: 'Harris',
        total_probability: 32,
        scenarios: [
          { name: 'Anaconda Surprise', probability: 15, method: 'Soumission R1-R2 (anaconda ou brabo choke)', description: 'Harris surprend Chiesa avec une soumission opportuniste pendant une tentative de takedown. L\'anaconda choke est l\'arme la plus dangereuse de Harris et peut attraper Chiesa en transition.' },
          { name: 'Striking Superieur', probability: 10, method: 'Decision Partagee', description: 'Harris garde le combat debout, utilise son volume de coups superieur (2.93 vs 1.87 SLpM) et defend suffisamment de takedowns pour obtenir une decision serree. Scenario improbable mais possible.' },
          { name: 'TKO par Accumulation', probability: 7, method: 'TKO R2-R3', description: 'Harris blesse Chiesa debout, accumule les dommages et force un arret. Scenario moins probable etant donne que Chiesa n\'a jamais ete KO, mais Harris a demontre de la puissance debout.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Michael Chiesa',
      winner_side: 'fighter1',
      predicted_method: 'Soumission R2 ou Decision Unanime',
      confidence_score: 7,
      confidence_label: 'MOYENNE-HAUTE',
      explanation: 'Chiesa entre dans ce combat avec des avantages clairs dans pratiquement tous les domaines qui comptent pour ce duel. Son grappling est superieur en volume et en efficacite (3.33 takedowns par 15 min avec 50% de precision contre 2.05 et 29% pour Harris). La solidite est incomparable: Chiesa n\'a jamais ete KO, tandis que Harris sort de deux defaites par KO. L\'avantage a domicile, la motivation de la retraite et la serie de trois victoires donnent a Chiesa un avantage psychologique significatif. La seule menace reelle sont les soumissions exotiques de Harris, qui peuvent surprendre en transition. Mais Chiesa est une ceinture noire de jiu-jitsu suffisamment experimentee pour naviguer ce danger.',
      x_factor: {
        title: 'L\'Energie du Dernier Combat',
        description: 'Les combattants en adieu livrent frequemment des performances au-dessus de la normale. Le public de Seattle, la famille presente, l\'emotion du moment. Chiesa peut canaliser tout cela dans une performance memorable pour couronner une carriere de 14 ans a l\'UFC.',
      },
      upset_alert: {
        title: 'L\'Anaconda Choke de Harris',
        description: 'Harris a remporte deux bonus de Performance de la Soiree avec des soumissions surprises. Si Chiesa est negligent lors d\'une tentative de takedown, Harris peut verrouiller un anaconda ou brabo choke. C\'est le type de mouvement qui arrive trop vite pour reagir.',
      },
      probabilities: {
        fighter1: { nome: 'Chiesa', percent: 65 },
        fighter2: { nome: 'Harris', percent: 32 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Chiesa', reasoning: 'Favori justifie. Meilleur grappling, meilleure solidite, avantage a domicile, motivation de retraite. Ligne confortable.' },
        method: { pick: 'Chiesa par soumission', reasoning: 'Avec 63% de victoires par soumission et sept rear-naked chokes a l\'UFC, la chance de Chiesa de finaliser est elevee. Harris a ete soumis auparavant et ses defaites recentes par KO suggerent une fragilite generale.' },
        over_under: { pick: 'Moins de 2.5 rounds', rounds: 2.5, reasoning: 'Deux grapplers actifs qui cherchent la finalisation. Chiesa a soumis Ferguson au R1 et Griffin au R3. Harris a soumis Wells au R3 et Aguilera au R1. Forte probabilite de soumission avant le round final.' },
        best_value: 'Chiesa par soumission est le pari avec le meilleur rapport qualite-prix. Son style converge vers cette finalisation et Harris est vulnerable au sol contre des grapplers superieurs.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Premiere Tentative de Takedown de Chiesa', icon: 'Target', description: 'Si Chiesa place le premier takedown propre dans les deux premieres minutes, le combat peut suivre son script rapidement. Surveillez la reaction de Harris quand il est amene au sol: s\'il accepte la position basse, Chiesa va immediatement chercher le dos et le rear-naked choke.' },
        { num: 2, title: 'Les Transitions de Harris au Sol', icon: 'Activity', description: 'Le danger de Harris reside dans les scrambles et transitions. Les anaconda chokes et brabo chokes sont verrouilles pendant les tentatives de takedown et renversements. Si Harris peut inverser la position ou verrouiller un overhook pendant le clinch, la soumission peut venir de nulle part.' },
        { num: 3, title: 'Volume de Coups au Premier Round', icon: 'Crosshair', description: 'Harris a un volume de coups superieur (2.93 vs 1.87 SLpM). S\'il peut maintenir la distance et marquer debout au R1, il peut accumuler de la confiance et compliquer le plan de Chiesa. La precision de Harris (49% vs 40%) merite aussi attention.' },
        { num: 4, title: 'Le Cardio de Harris au R3', icon: 'Shield', description: 'Harris a ete fini au R3 contre Ponzinibbio et a depense de l\'energie pour les soumissions contre Wells. Si le combat atteint le troisieme round, observez si Harris ralentit. Chiesa, avec l\'experience de combats de 5 rounds, peut capitaliser sur toute baisse de rythme.' },
        { num: 5, title: 'L\'Emotion de Chiesa Pendant l\'Entree', icon: 'Brain', description: 'Ce sera la derniere marche de Chiesa vers l\'octogone. L\'emotion peut etre une arme a double tranchant: motivation supplementaire ou distraction. Observez son langage corporel avant le combat. S\'il est concentre et controle, bon signe. S\'il est excessivement emotif, Harris peut exploiter.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LE DERNIER COMBAT', content: 'CHIESA vs HARRIS\nUFC Seattle | 28 mars\nClimate Pledge Arena\n\n19-7 vs 19-7\nMeme palmare. Destins opposes.\nChiesa fait ses adieux au MMA.', color: 'red' },
        { slide_number: 2, title: 'CHIESA: LE MAVERICK', content: 'Champion TUF Live\n19-7 en carriere (12 par soumission)\n7 rear-naked chokes a l\'UFC\nJamais KO en 26 combats\n3 victoires consecutives\n14 ans a l\'UFC\nCombat d\'adieu a domicile', color: 'red' },
        { slide_number: 3, title: 'HARRIS: MOCAMBIQUE', content: 'Premier Guyanais a l\'UFC\n19-7 en carriere\n4-3 a l\'UFC\n2 Performance de la Soiree\nSpecialiste anaconda choke\n2 defaites par KO consecutives\nDoit gagner pour rester au roster', color: 'blue' },
        { slide_number: 4, title: 'GRAPPLING vs GRAPPLING', content: 'CHIESA:\n12 soumissions en carriere\n50% precision takedown\n3.33 TDs par 15 min\n\nHARRIS:\n6 soumissions en carriere\n29% precision takedown\n2.05 TDs par 15 min\n\nChiesa domine les chiffres.', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'CHIESA par Soumission R2\n\nConfiance: MOYENNE-HAUTE\n65% Chiesa / 32% Harris\n\nLe rear-naked choke d\'adieu.\nHarris est dangereux en transition,\nmais Chiesa est le grappeur superieur.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Chiesa vs Harris a l\'UFC Seattle. Le dernier combat du Maverick. 14 ans a l\'UFC. 7 rear-naked chokes. Jamais KO. Et il veut prendre sa retraite avec une finalisation a domicile. Thread:' },
        { num: '2/6', text: 'Chiesa (19-7): 3 victoires consecutives. A soumis Ferguson au R1. A soumis Griffin au R3. A battu McGee par decision. Son jiu-jitsu est plus affute que jamais a 38 ans.' },
        { num: '3/6', text: 'Harris (19-7): 2 defaites par KO consecutives. Ponzinibbio et Williams l\'ont arrete. Mais attention: Harris a 2 Performance de la Soiree par soumission. L\'anaconda choke est dangereuse. La question c\'est le menton.' },
        { num: '4/6', text: 'Les chiffres de grappling ne mentent pas: Chiesa a 3.33 TDs par 15 min avec 50% de precision. Harris a 2.05 avec 29%. Dans un duel de grapplers, le volume de Chiesa devrait prevaloir.' },
        { num: '5/6', text: 'Fait peu connu: Chiesa n\'a JAMAIS ete KO en 26 combats professionnels. Zero KO subis. Harris a ete KO 3x a l\'UFC. L\'ecart de solidite ici est extreme.' },
        { num: '6/6', text: 'Mon choix: Chiesa par soumission au deuxieme round. Le rear-naked choke d\'adieu a domicile, devant la famille. Si Harris survit au grappling, Chiesa gagne par decision. RT si vous etes d\'accord.' },
      ],
      video: [
        { time: '0-10s', title: 'Accroche', text: 'Il a gagne le TUF. Il a 7 rear-naked chokes a l\'UFC. Jamais ete KO. Et samedi sera son DERNIER combat. Michael Chiesa fait ses adieux au MMA chez lui a Seattle.' },
        { time: '10-25s', title: 'Contexte', text: 'Chiesa est sur une serie de trois victoires, incluant des soumissions sur Tony Ferguson et Max Griffin. De l\'autre cote, Carlston Harris, le premier Guyanais de l\'UFC, sort de deux defaites par KO. Mais Harris a des soumissions exotiques qui peuvent surprendre n\'importe qui.' },
        { time: '25-45s', title: 'Analyse', text: 'Quand deux grapplers s\'affrontent, le combat se decide dans les details. Chiesa a 3.33 takedowns par 15 minutes avec 50% de precision. Harris a 2.05 avec seulement 29%. Au sol, Chiesa cherche le rear-naked choke. Harris cherche l\'anaconda choke. La difference? Chiesa n\'a jamais ete KO en 26 combats. Harris a ete arrete debout trois fois a l\'UFC.' },
        { time: '45-55s', title: 'Prediction', text: 'Mon choix: Chiesa par soumission au deuxieme round. Son grappling est superieur, son cardio est meilleur, et la motivation de prendre sa retraite avec une victoire a domicile est enorme. Mais attention a Harris en transition. Son anaconda choke a rapporte deux bonus.' },
        { time: '55-65s', title: 'CTA', text: 'Chiesa reussit-il l\'adieu parfait? Commentez votre prediction et suivez pour l\'analyse complete du card UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'DERNIER COMBAT d\'un veteran de 14 ans de l\'UFC, et il veut partir EN BEAUTE.', body: 'Michael Chiesa, 7 rear-naked chokes a l\'UFC, jamais KO en 26 combats, prend sa retraite chez lui a Seattle contre Carlston Harris. Chiesa est sur 3 victoires consecutives. Harris sort de 2 KO. Ca semble facile, mais Harris a des soumissions exotiques qui peuvent surprendre N\'IMPORTE QUI.', cta: 'Commentez CHIESA ou HARRIS!' },
        { hook: 'Ce gars n\'a JAMAIS ete KO en 26 combats et samedi c\'est le dernier.', body: 'Michael Chiesa. Champion du TUF. 12 soumissions en carriere. 7 rear-naked chokes a l\'UFC. Et maintenant il veut terminer sa carriere chez lui a Seattle avec une autre finalisation. L\'adversaire? Carlston Harris, qui a des anaconda chokes mortels mais sort de deux defaites par KO.', cta: 'Ce sera une soumission? Commentez comment vous pensez que ca finit!' },
        { hook: 'Le premier Guyanais de l\'UFC pourrait gacher la fete de retraite.', body: 'Carlston Harris. Venu du Guyana, a travaille comme mecanicien au Bresil, est entre a l\'UFC et a gagne 2 bonus de Performance de la Soiree avec des soumissions. Il affronte Chiesa qui prend sa retraite a domicile. Harris est desespere, sort de 2 defaites par KO, et doit gagner pour rester a l\'UFC.', cta: 'Harris peut-il creer la surprise? Commentez!' },
      ],
      headlines: [
        'Chiesa vs Harris: Le Maverick Cherche l\'Adieu Parfait a Seattle',
        'Sept Rear-Naked Chokes et un Adieu: Chiesa Veut Terminer sa Carriere avec une Finalisation a Domicile',
        'Harris le Trouble-Fete? Le Danger de l\'Anaconda Choke a la Retraite de Chiesa',
        'Jamais KO en 26 Combats: La Solidite Extraordinaire de Michael Chiesa',
        'Grappeur vs Grappeur: Pourquoi Chiesa vs Harris Pourrait Etre un Cours de Jiu-Jitsu a l\'UFC Seattle',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-300',
        fighter2_odds: '+240',
        fighter1_name: 'Michael Chiesa',
        fighter2_name: 'Carlston Harris',
        source: 'Estimation basee sur le profil de combat (mars 2026). Cotes exactes non disponibles apres changement de carte.',
      },
      edges: [
        { icon: 'Target', titulo: 'Volume de Takedowns', stat_headline: 'CHIESA: 3.33 TAKEDOWNS PAR 15 MIN AVEC 50% DE PRECISION', contexto: 'Chiesa est l\'un des meilleurs de la division pour amener le combat au sol. Harris n\'a que 29% de precision et 2.05 TDs par 15 min.', implicacao_aposta: 'Favorise Chiesa par decision ou soumission. Le combat va au sol.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Solidite Inegalee', stat_headline: 'CHIESA: ZERO KO SUBIS EN 26 COMBATS PROFESSIONNELS', contexto: 'Dans toute sa carriere, Chiesa n\'a jamais ete arrete par des coups. Harris a ete KO 3x a l\'UFC.', implicacao_aposta: 'Reduit drastiquement les chances de Harris de gagner par KO/TKO.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Soumissions Exotiques de Harris', stat_headline: '2 PERFORMANCE DE LA SOIREE PAR SOUMISSION A L\'UFC', contexto: 'Les anaconda chokes et brabo chokes sont des armes qui peuvent surprendre meme des grapplers experimentes. Harris a montre qu\'il peut finir au R1.', implicacao_aposta: 'Seul scenario realiste de surprise. Harris par soumission merite attention.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'TrendingUp', titulo: 'Momentum Oppose', stat_headline: 'CHIESA: 3 VICTOIRES CONSECUTIVES. HARRIS: 2 DEFAITES PAR KO CONSECUTIVES', contexto: 'Le contraste de momentum est frappant. Chiesa est confiant et affute. Harris peut etre psychologiquement ebranle apres deux KO.', implicacao_aposta: 'Favorise fortement Chiesa. Le momentum psychologique compte.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Avantage a Domicile a Seattle', stat_headline: 'CHIESA EST NE ET A GRANDI A WASHINGTON, A 4 HEURES DE SEATTLE', contexto: 'Dernier combat de carriere, a domicile, devant famille et amis. Le Climate Pledge Arena va scander son nom.', implicacao_aposta: 'La motivation et le soutien du public ajoutent un avantage intangible.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Methode', pick: 'Chiesa par Soumission', odds: 'Selon donnees disponibles', confianca: 'alta', edge_vs_mercado: '63% des victoires de Chiesa sont par soumission. Harris vulnerable au sol.', raciocinio: 'Chiesa finalise par soumission dans plus de la moitie de ses victoires. A l\'UFC, ce sont 7 rear-naked chokes. Harris, malgre son statut de grappeur, a une defense de takedown inferieure (55%) et a deja ete soumis. C\'est le resultat le plus probable de ce combat.' },
        { tipo: 'Duree', pick: 'Combat ne va pas a la decision', odds: 'Selon donnees disponibles', confianca: 'media', edge_vs_mercado: 'Deux grapplers actifs qui cherchent la finalisation', raciocinio: 'Chiesa a finalise lors de ses deux dernieres victoires (Ferguson R1, Griffin R3). Harris a 6 soumissions en carriere. Avec deux grapplers agressifs, la chance de finalisation avant le troisieme round est significative.' },
        { tipo: 'Moneyline', pick: 'Chiesa', odds: 'Selon donnees disponibles', confianca: 'alta', raciocinio: 'Favori justifie par pratiquement toutes les metriques: grappling superieur, solidite, momentum, avantage a domicile et motivation. Harris a besoin de quelque chose de special pour gagner.' },
      ],
      armadilha: {
        titulo: 'Piege: Harris par KO/TKO',
        descricao: 'Harris a 5 KO en carriere, mais Chiesa n\'a JAMAIS ete KO en 26 combats professionnels. Parier sur Harris par KO/TKO c\'est parier contre 14 ans de preuves. Si Harris gagne, ce sera par soumission, pas par coups.',
      },
      disclaimer: 'Analyse statistique a titre informatif. Pariez de maniere responsable.',
    },
  },
};

// ===============================================================
// SPANISH VERSION
// ===============================================================
const analiseES: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Chiesa vs Harris: La Ultima Caminata del Maverick',
  subtitulo: 'El veterano de Washington busca el retiro perfecto contra el peligroso grappler guayanes',
  evento_data: '28 de marzo, 2026',
  categoria_peso: 'Peso Welter (170 lbs)',
  fight_prediction: {
    ...analisePT.fight_prediction,
    predictedMethod: 'Sumision R2-R3',
    confidence: 'MEDIA-ALTA',
  },
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Court McGee', method: 'Decision Unanime', event: 'UFC on ESPN' },
      { result: 'W', opponent: 'Max Griffin', method: 'Sumision R3 (rear-naked choke)', event: 'UFC 310' },
      { result: 'W', opponent: 'Tony Ferguson', method: 'Sumision R1 (rear-naked choke)', event: 'UFC on ABC 7' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Santiago Ponzinibbio', method: 'TKO R3', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Khaos Williams', method: 'KO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Jeremiah Wells', method: 'Sumision R3 (anaconda choke)', event: 'UFC on ESPN' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de marzo, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Welter (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'La Ultima Caminata del Maverick',
      tagline_sub: 'Chiesa se despide del MMA en casa contra el peligroso grappler de Guyana',
      fighter1: {
        nome_completo: 'Michael "Maverick" Chiesa',
        apelido: 'Maverick',
        sobrenome: 'Chiesa',
        record: '19-7-0',
        ranking: 'N/R Peso Welter',
        info_extra: 'Spokane, Washington | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Carlston "Mocambique" Harris',
        apelido: 'Mocambique',
        sobrenome: 'Harris',
        record: '19-7-0',
        ranking: 'N/R Peso Welter',
        info_extra: 'Skeldon, Guyana | 38 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Despedida en Casa</h3>
        <p class="mb-4">
          Despues de 14 anos de carrera y mas de 20 peleas dentro del octagono, <strong class="text-ufc-red">Michael Chiesa</strong> anuncio que la noche del 28 de marzo sera la ultima vez que camine hasta la jaula. Y no es coincidencia que lo haga en Seattle, a cuatro horas de Spokane, la ciudad que siempre represento. El tipo que gano la primera temporada de The Ultimate Fighter: Live, que acumulo siete finalizaciones por rear-naked choke en el UFC, y que nunca se rindio ni cuando todo salio mal, quiere cerrar su historia con una victoria frente a su gente.
        </p>
        <p class="mb-4">
          Del otro lado, <strong class="text-blue-400">Carlston Harris</strong> no vino para participar en la ceremonia de retiro de nadie. El guayanes, primer atleta de su pais en competir en el UFC, trae un estilo de grappling asfixiante con sumisiones creativas como anaconda chokes y brabo chokes que ya le han valido bonos de Performance de la Noche. Sin embargo, Harris llega a esta pelea viniendo de dos derrotas consecutivas por nocaut contra Khaos Williams y Santiago Ponzinibbio. La presion es enorme para los dos, pero por razones completamente diferentes.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Racha que Resucito a Chiesa</h3>
        <p class="mb-4">
          En 2023, despues de perder contra Kevin Holland por sumision en el primer round, muchos pensaron que Chiesa estaba acabado. Dos derrotas consecutivas (Sean Brady antes de Holland), sin ranking, 36 anos. Pero el Maverick respondio de la mejor forma posible: tres victorias seguidas. Sometio a Tony Ferguson en el primer round. Sometio a Max Griffin en el tercero. Y vencio a Court McGee por decision unanime. Esta racha probo que el jiu-jitsu de Chiesa sigue afilado y que todavia tiene mucho que ofrecer.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Grappling vs Grappling</h3>
        <p class="mb-4">
          Esta pelea tiene todo para ir al suelo. Chiesa tiene 12 sumisiones en su carrera, destacando los rear-naked chokes que son su marca registrada. Harris tiene seis sumisiones con un arsenal mas exotico: anaconda chokes y brabo chokes. Cuando dos grapplers de elite se encuentran, la pelea normalmente sucede en las transiciones, las reversiones, los detalles tecnicos que solo quienes entrenan jiu-jitsu entienden. Es exactamente ese tipo de batalla que podemos esperar.
        </p>
      `,
      stakes: [
        { dimensao: 'Racha', fighter1: '3 victorias consecutivas', fighter2: '2 derrotas consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Retiro con victoria en casa', fighter2: 'Romper racha negativa' },
        { dimensao: 'Narrativa', fighter1: 'La despedida perfecta para un veterano del UFC', fighter2: 'Demostrar que pertenece al UFC tras dos KOs sufridos' },
        { dimensao: 'Riesgo', fighter1: 'Perder la ultima pelea de su carrera', fighter2: 'Tercera derrota seguida podria significar corte del UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'LA DESPEDIDA PERFECTA',
          subtitulo: 'Chiesa somete a Harris y se retira con victoria frente a la hinchada de Washington',
          consequencias: [
            { tag: 'LEGADO', texto: 'Chiesa cierra su carrera con 20 victorias, consolidando su legado como uno de los mejores grapplers de la historia del peso welter del UFC' },
            { tag: 'SUMISION', texto: 'Si gana por rear-naked choke, Chiesa iguala o supera records historicos de finalizaciones por RNC en el UFC' },
            { tag: 'HARRIS', texto: 'Tres derrotas seguidas colocan a Harris en situacion critica en el roster del UFC' },
          ],
          proxima_luta: 'Retiro. Chiesa cierra su carrera como veterano respetado.',
        },
        fighter2_vence: {
          titulo: 'EL AGUAFIESTAS DE GUYANA',
          subtitulo: 'Harris sorprende y arruina la despedida de Chiesa en Seattle',
          consequencias: [
            { tag: 'SUPERVIVENCIA', texto: 'Harris rompe su racha de dos derrotas y gana respiro en el roster del UFC' },
            { tag: 'AMARGO', texto: 'Chiesa se retira con derrota frente a su publico, final doloroso para una carrera historica' },
            { tag: 'CARRERA', texto: 'Harris puede pedir un oponente ranqueado en el proximo evento para retomar el ascenso' },
          ],
          proxima_luta: 'Harris vs un oponente ranqueado en el top 15 del peso welter',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Chiesa',
        color: 'red',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Victoria solida por decision contra veterano. Controlo la pelea con grappling y presion.' },
          { date: 'Dic 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sometio a Griffin con rear-naked choke en el tercer round en su aniversario UFC en UFC 310.' },
          { date: 'Ago 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sometio a Ferguson rapidamente en el primer round. Muestra de dominio en grappling.' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (brabo choke)', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bueno', note: 'Derrota rapida por sumision contra Holland. Sorprendido en el suelo por un adversario mas largo.' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'Decision Unanime', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Bueno', note: 'Derrota por decision contra prospecto en ascenso. Pelea competitiva pero Brady fue superior.' },
        ],
        full_fight_history: [
          { date: 'Jun 2012', opponent: 'Al Iaquinta', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Final del TUF Live, victoria por sumision' },
          { date: 'Feb 2013', opponent: 'Anton Kuivanen', result: 'W', method: 'Sub R2 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'UFC 157' },
          { date: 'Ago 2013', opponent: 'Jorge Masvidal', result: 'L', method: 'Sub R2 (d\'arce choke)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bueno', note: 'Primera derrota de carrera contra futura estrella' },
          { date: 'Mar 2014', opponent: 'Colton Smith', result: 'W', method: 'Sub R1 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Sumision rapida' },
          { date: 'Sep 2014', opponent: 'Joe Lauzon', result: 'L', method: 'TKO R1 (corte)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parada medica por corte' },
          { date: 'Dic 2015', opponent: 'Jim Miller', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Victoria por sumision contra veterano' },
          { date: 'Abr 2016', opponent: 'Beneil Dariush', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bueno', note: 'Performance de la Noche' },
          { date: 'Jul 2016', opponent: 'Joe Lauzon', result: 'W', method: 'Sub R2 (rear-naked choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Revancha, rear-naked choke en el segundo' },
          { date: 'Jun 2017', opponent: 'Kevin Lee', result: 'L', method: 'Sub R1', opponent_rank: '#7 LW', quality_score: 4, quality_label: 'Muy Bueno', note: 'Derrota por sumision contra futuro retador al titulo' },
          { date: 'Dic 2017', opponent: 'Anthony Pettis', result: 'L', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Muy Bueno', note: 'Derrota contra ex campeon peso ligero' },
          { date: 'Jul 2018', opponent: 'Carlos Condit', result: 'W', method: 'Sub R2 (kimura)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bueno', note: 'Primera pelea en peso welter' },
          { date: 'May 2019', opponent: 'Diego Sanchez', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Victoria por decision unanime' },
          { date: 'Ene 2020', opponent: 'Rafael dos Anjos', result: 'W', method: 'UD', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Muy Bueno', note: 'Mayor victoria de carrera contra ex campeon' },
          { date: 'Ene 2021', opponent: 'Neil Magny', result: 'W', method: 'UD', opponent_rank: '#9 WW', quality_score: 3, quality_label: 'Bueno', note: 'Domino 5 rounds con grappling' },
          { date: 'Jun 2021', opponent: 'Vicente Luque', result: 'L', method: 'Sub R1 (d\'arce choke)', opponent_rank: '#6 WW', quality_score: 4, quality_label: 'Muy Bueno', note: 'Derrota por sumision contra top contender' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 3, quality_label: 'Bueno', note: 'Derrota por decision' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bueno', note: 'Derrota por sumision' },
          { date: 'Ago 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sumision rapida' },
          { date: 'Dic 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Rear-naked choke en el tercero' },
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decision unanime' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'En Ascenso',
        momentum_trend: 'ascending',
        momentum_note: 'Chiesa viene de tres victorias consecutivas, incluyendo dos sumisiones por rear-naked choke. Despues de parecer acabado con las derrotas contra Brady y Holland, resurgion contra oponentes de nivel mas bajo pero con actuaciones convincentes. El impulso es bueno, pero es importante notar que Ferguson, Griffin y McGee no son adversarios de elite. La confianza esta alta, especialmente con la motivacion extra de pelear en casa en su ultima pelea de carrera.',
      },
      fighter2: {
        nome: 'Carlston Harris',
        color: 'blue',
        recent_fights: [
          { date: 'Ene 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Harris estaba peleando bien pero fue detenido en el tercer round. Vulnerabilidad en striking expuesta.' },
          { date: 'May 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado rapidamente por Williams en el primer round. Menton cuestionable tras dos KOs consecutivos.' },
          { date: 'Ago 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sumision por anaconda choke en el tercer round. Performance de la Noche. Harris en su mejor momento.' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Victoria por decision contra oponente de nivel inferior.' },
        ],
        full_fight_history: [
          { date: 'May 2021', opponent: 'Christian Aguilera', result: 'W', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Debut en el UFC, Performance de la Noche' },
          { date: 'Sep 2021', opponent: 'Impa Kasanganay', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Nocaut en el primer round' },
          { date: 'Feb 2022', opponent: 'Shavkat Rakhmonov', result: 'L', method: 'KO R1', opponent_rank: '#15 WW', quality_score: 5, quality_label: 'Excelente', note: 'Noqueado por futuro retador al titulo' },
          { date: 'Mar 2023', opponent: 'Jared Gooden', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Decision unanime' },
          { date: 'Ago 2023', opponent: 'Jeremiah Wells', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Anaconda choke, Performance de la Noche' },
          { date: 'May 2024', opponent: 'Khaos Williams', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado en el primer round' },
          { date: 'Ene 2025', opponent: 'Santiago Ponzinibbio', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO en el tercer round' },
        ],
        layoff_warning: null,
        momentum_score: 3,
        momentum_label: 'En Caida',
        momentum_trend: 'descending',
        momentum_note: 'Harris llega a esta pelea en el peor momento de su carrera en el UFC. Dos derrotas consecutivas por nocaut (Williams y Ponzinibbio) levantan preguntas serias sobre la durabilidad de su menton. Su unica derrota anterior en el UFC habia sido contra Shavkat Rakhmonov, retador al titulo. Ahora los nocauts vinieron contra adversarios de nivel medio, lo cual es mas preocupante. El grappling sigue siendo peligroso, pero si la pelea se queda de pie, Harris esta vulnerable.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Chiesa',
        media_oponentes: 3,
        media_oponentes_label: 'Bueno',
        aproveitamento: '12W-7L (63%)',
        contra_top5: '1W-1L',
      },
      fighter2: {
        nome: 'Harris',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '4W-3L (57%)',
        contra_top5: '0W-1L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'No existen oponentes en comun entre Chiesa y Harris en el UFC. Son carreras que siguieron trayectorias muy diferentes: Chiesa es veterano de larga data con 21 peleas en la organizacion, mientras Harris tiene solo 7 peleas en el UFC, habiendo entrado en 2021.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Golpes Sig. por Minuto', valueA: 1.87, valueB: 2.93, maxVal: 5, format: 'decimal' },
        { label: 'Precision de Golpes (%)', valueA: 40, valueB: 49, maxVal: 100, format: 'percent' },
        { label: 'Golpes Absorbidos/Min', valueA: 1.70, valueB: 2.44, maxVal: 5, format: 'decimal', reverseWinner: true },
        { label: 'Defensa de Golpes (%)', valueA: 54, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 3.33, valueB: 2.05, maxVal: 5, format: 'decimal' },
        { label: 'Precision de Takedown (%)', valueA: 50, valueB: 29, maxVal: 100, format: 'percent' },
        { label: 'Defensa de Takedown (%)', valueA: 60, valueB: 55, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Edad', fighter1: '38 anos', fighter2: '38 anos', note: 'Misma edad, ambos nacidos en 1987' },
        { label: 'Altura', fighter1: '1,85m (6\'1")', fighter2: '1,83m (6\'0")', note: 'Chiesa ligeramente mas alto' },
        { label: 'Envergadura', fighter1: '192cm (75.5")', fighter2: '193cm (76")', note: 'Harris con media pulgada de ventaja' },
        { label: 'Guardia', fighter1: 'Zurdo', fighter2: 'Ortodoxo', note: 'Confrontacion clasica de guardias opuestas' },
        { label: 'Gimnasio', fighter1: 'Sikjitsu, Spokane', fighter2: 'Renovacao Fight Team, Rio de Janeiro', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Grappling Ofensivo', valueA: 85, valueB: 72, labelA: 'Muy Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'Chiesa tiene 12 sumisiones en su carrera y 3.33 takedowns por 15 minutos. Harris tiene sumisiones creativas pero volumen inferior (2.05 TD/15min).' },
        { label: 'Sumisiones y Jiu-Jitsu', valueA: 88, valueB: 78, labelA: 'Muy Bueno', labelB: 'Muy Bueno', advantage: 'fighter1', advantage_note: 'Chiesa tiene siete rear-naked chokes en el UFC, segundo en la historia de la organizacion. Harris tiene anaconda y brabo chokes. Ambos peligrosos en el suelo.' },
        { label: 'Striking de Pie', valueA: 40, valueB: 55, labelA: 'Medio', labelB: 'Bueno', advantage: 'fighter2', advantage_note: 'Harris tiene mas volumen (2.93 SLpM vs 1.87) y mejor precision (49% vs 40%). Chiesa nunca tuvo un nocaut en su carrera.' },
        { label: 'Defensa de Takedown', valueA: 65, valueB: 55, labelA: 'Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'Chiesa defiende 60% de los takedowns contra 55% de Harris. Diferencia modesta pero relevante en este duelo de grapplers.' },
        { label: 'Cardio y Resistencia', valueA: 75, valueB: 65, labelA: 'Muy Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'Chiesa mostro cardio solido en peleas de 5 rounds contra Magny y dos Anjos. Harris tiende a gastar energia buscando finalizacion temprana.' },
        { label: 'Durabilidad y Menton', valueA: 70, valueB: 45, labelA: 'Bueno', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Chiesa nunca fue noqueado en 26 peleas profesionales. Harris fue noqueado tres veces en el UFC (Rakhmonov, Williams, Ponzinibbio).' },
      ],
      insight: 'Pelea de grappler contra grappler, con Chiesa llevando ventaja en la mayoria de las metricas. La gran diferencia esta en la durabilidad: Chiesa nunca fue noqueado mientras Harris fue detenido de pie tres veces. En el suelo, ambos son peligrosos, pero Chiesa tiene mayor volumen de takedowns e historial superior de sumisiones. La unica area donde Harris tiene ventaja clara es el striking, pero los numeros de ambos de pie son modestos.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Chiesa',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 12, percent: 63 },
        decision: { count: 7, percent: 37 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Harris',
        ko_tko: { count: 5, percent: 26 },
        submission: { count: 6, percent: 32 },
        decision: { count: 8, percent: 42 },
        total_wins: 19,
      },
      insight: 'El contraste es revelador. Chiesa es un puro finalizador: 63% de victorias por sumision, cero nocauts en toda su carrera. Busca el suelo y punto. Harris es mas equilibrado entre KO (26%), sumision (32%) y decision (42%), pero eso tambien significa que no es dominante en ninguna area especifica. Para Chiesa, el camino es claro: llevar al suelo y buscar el rear-naked choke. Para Harris, la diversidad puede ser tanto una fortaleza como una debilidad.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Territorio de Reconocimiento',
          description: 'Ambos peleadores tienden a usar el primer round para estudiar al oponente. Chiesa buscara el clinch y el takedown, mientras Harris puede intentar una sumision de oportunidad si siente apertura. Los dos han mostrado capacidad de finalizar en R1 (Chiesa sometio a Ferguson e Iaquinta en el primero; Harris finalizo a Aguilera y Kasanganay). Si alguno encuentra la espalda del oponente temprano, puede terminar rapido.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'VENTAJA CHIESA',
          color: 'red',
          title: 'Presion del Maverick',
          description: 'El segundo round historicamente es donde Chiesa comienza a imponer su voluntad. Con mejor cardio y volumen de takedowns superior (3.33 vs 2.05 por 15 min), la presion comienza a acumularse. Harris, que gasto energia intentando finalizar en R1, puede empezar a sentir el ritmo. La precision de takedown de Chiesa (50% vs 29% de Harris) se vuelve mas relevante a medida que llega el cansancio.',
        },
        {
          rounds: 'R3',
          danger_level: 8,
          danger_label: 'VENTAJA CHIESA',
          color: 'red',
          title: 'Round del Retiro',
          description: 'Si la pelea llega al tercer round sin finalizacion, Chiesa es el gran favorito. Su cardio esta comprobado en peleas de 5 rounds contra Rafael dos Anjos y Neil Magny. Harris, con dos derrotas recientes por nocaut, puede estar fisica y mentalmente desgastado. La motivacion extra de Chiesa (ultima pelea, en casa, frente a la familia) puede ser el diferencial en los minutos finales.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Factor Local: Seattle', fighter: 'Chiesa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Chiesa es de Spokane, a cuatro horas de Seattle. Tendra familia, amigos y una hinchada enorme en el Climate Pledge Arena. Para la ultima pelea de su carrera, ese apoyo es invaluable.' },
        { icon: 'Brain', title: 'Motivacion: Pelea de Retiro', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Chiesa anuncio que esta sera su ultima pelea. Peleadores en despedida suelen tener actuaciones superiores, con enfoque y determinacion extras. La motivacion emocional es un factor real.' },
        { icon: 'AlertTriangle', title: 'Menton Cuestionable', fighter: 'Harris', risk_level: 'RIESGO ALTO', risk_color: 'red', description: 'Dos derrotas consecutivas por nocaut (Williams en R1, Ponzinibbio en R3) levantan banderas rojas sobre la durabilidad de Harris. Incluso contra Chiesa, que no tiene poder de nocaut, el dano acumulado puede afectar la confianza.' },
        { icon: 'TrendingUp', title: 'Tres Victorias Seguidas', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Tras las derrotas contra Brady y Holland, Chiesa se reinvento con tres victorias consecutivas. Dos por sumision, mostrando que el jiu-jitsu sigue afilado. La confianza esta en su punto mas alto desde 2021.' },
        { icon: 'Clock', title: 'Inactividad Relativa de Harris', fighter: 'Harris', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'La ultima pelea de Harris fue en enero de 2025, mas de 14 meses atras. Combinado con las derrotas recientes, la falta de ritmo puede ser un factor adicional.' },
        { icon: 'Shield', title: 'Nunca Noqueado en 26 Peleas', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Chiesa nunca fue detenido por golpes en toda su carrera profesional. La unica parada por golpes fue una interrupcion medica por corte contra Joe Lauzon. La durabilidad es extraordinaria.' },
        { icon: 'Zap', title: 'Sumisiones Exoticas', fighter: 'Harris', risk_level: 'POSITIVO', risk_color: 'green', description: 'Harris tiene un arsenal de sumisiones diferente a la mayoria: anaconda chokes y brabo chokes. Estas tecnicas pueden sorprender hasta a grapplers experimentados como Chiesa si el angulo es correcto.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Chiesa',
        total_probability: 65,
        scenarios: [
          { name: 'El Rear-Naked Choke de Despedida', probability: 30, method: 'Sumision R2-R3 (rear-naked choke)', description: 'Chiesa implementa su plan clasico: clinch contra la reja, takedown, busca la espalda y engancha el rear-naked choke. Harris, menos explosivo en los rounds finales, no logra escapar. El final perfecto para su carrera.' },
          { name: 'Control Total por 15 Minutos', probability: 25, method: 'Decision Unanime', description: 'Chiesa no encuentra la finalizacion pero controla toda la pelea con takedowns y presion posicional. Gana los tres rounds con grappling dominante y se lleva una decision unanime clara.' },
          { name: 'Sumision Rapida', probability: 10, method: 'Sumision R1', description: 'Chiesa encuentra una apertura temprana, engancha el clinch y transiciona rapidamente hacia la espalda. Harris, intentando una sumision propia, deja espacio y Chiesa capitaliza.' },
        ],
      },
      fighter2: {
        nome: 'Harris',
        total_probability: 32,
        scenarios: [
          { name: 'Anaconda Sorpresa', probability: 15, method: 'Sumision R1-R2 (anaconda o brabo choke)', description: 'Harris sorprende a Chiesa con una sumision de oportunidad durante un intento de takedown. El anaconda choke es el arma mas peligrosa de Harris y puede atrapar a Chiesa en la transicion.' },
          { name: 'Striking Superior', probability: 10, method: 'Decision Dividida', description: 'Harris mantiene la pelea de pie, usa su volumen superior de golpes (2.93 vs 1.87 SLpM) y defiende suficientes takedowns para llevarse una decision apretada. Escenario improbable pero posible.' },
          { name: 'TKO por Acumulacion', probability: 7, method: 'TKO R2-R3', description: 'Harris lastima a Chiesa en el striking, acumula dano y fuerza una parada. Escenario menos probable dado que Chiesa nunca fue noqueado, pero Harris ya mostro poder de pie.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Michael Chiesa',
      winner_side: 'fighter1',
      predicted_method: 'Sumision R2 o Decision Unanime',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Chiesa llega a esta pelea con ventajas claras en practicamente todas las areas que importan para este duelo. Su grappling es superior en volumen y eficacia (3.33 takedowns por 15 min con 50% de precision contra 2.05 y 29% de Harris). La durabilidad es incomparable: Chiesa nunca fue noqueado, mientras Harris viene de dos derrotas por KO. El factor local, la motivacion del retiro y la racha de tres victorias le dan a Chiesa una ventaja psicologica significativa. La unica amenaza real son las sumisiones exoticas de Harris, que pueden sorprender en la transicion. Pero Chiesa es un cinturon negro de jiu-jitsu lo suficientemente experimentado para navegar ese peligro.',
      x_factor: {
        title: 'La Energia de la Ultima Pelea',
        description: 'Peleadores en despedida frecuentemente entregan actuaciones por encima de lo normal. El publico de Seattle, la familia presente, la emocion del momento. Chiesa puede canalizar todo eso para una actuacion memorable que corone una carrera de 14 anos en el UFC.',
      },
      upset_alert: {
        title: 'El Anaconda Choke de Harris',
        description: 'Harris ya gano dos bonos de Performance de la Noche con sumisiones sorpresa. Si Chiesa es descuidado en un intento de takedown, Harris puede enganchar un anaconda o brabo choke. Es el tipo de movimiento que sucede demasiado rapido para reaccionar.',
      },
      probabilities: {
        fighter1: { nome: 'Chiesa', percent: 65 },
        fighter2: { nome: 'Harris', percent: 32 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Chiesa', reasoning: 'Favorito justificado. Mejor grappling, mejor durabilidad, factor local, motivacion del retiro. Linea comoda.' },
        method: { pick: 'Chiesa por sumision', reasoning: 'Con 63% de victorias por sumision y siete rear-naked chokes en el UFC, la chance de Chiesa de finalizar es alta. Harris fue sometido anteriormente y sus derrotas recientes por KO sugieren fragilidad general.' },
        over_under: { pick: 'Menos de 2.5 rounds', rounds: 2.5, reasoning: 'Dos grapplers activos que buscan finalizacion. Chiesa sometio a Ferguson en R1 y a Griffin en R3. Harris sometio a Wells en R3 y a Aguilera en R1. Alta probabilidad de sumision antes del round final.' },
        best_value: 'Chiesa por sumision es la apuesta con mejor valor. Su estilo converge hacia esa finalizacion y Harris es vulnerable en el suelo contra grapplers superiores.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'El Primer Intento de Takedown de Chiesa', icon: 'Target', description: 'Si Chiesa conecta el primer takedown limpio en los primeros dos minutos, la pelea puede seguir su guion rapidamente. Presta atencion a la reaccion de Harris al ser derribado: si acepta la posicion de abajo, Chiesa buscara la espalda y el rear-naked choke inmediatamente.' },
        { num: 2, title: 'Las Transiciones de Harris en el Suelo', icon: 'Activity', description: 'El peligro de Harris esta en los scrambles y transiciones. Los anaconda chokes y brabo chokes se enganchan durante intentos de takedown y reversiones. Si Harris logra invertir posicion o enganchar un overhook durante el clinch, la sumision puede venir de la nada.' },
        { num: 3, title: 'El Volumen de Golpes en el Primer Round', icon: 'Crosshair', description: 'Harris tiene volumen superior de golpes (2.93 vs 1.87 SLpM). Si logra mantener distancia y puntuar de pie en R1, puede acumular confianza y dificultar el plan de Chiesa. La precision de Harris (49% vs 40%) tambien merece atencion.' },
        { num: 4, title: 'El Cardio de Harris en R3', icon: 'Shield', description: 'Harris fue finalizado en R3 contra Ponzinibbio y gasto energia intentando sumisiones contra Wells. Si la pelea llega al tercer round, observa si Harris desacelera. Chiesa, con experiencia en peleas de 5 rounds, puede capitalizar cualquier caida de ritmo.' },
        { num: 5, title: 'La Emocion de Chiesa en la Caminata', icon: 'Brain', description: 'Esta sera la ultima caminata de Chiesa hasta el octagono. La emocion puede ser un arma de doble filo: motivacion extra o distraccion. Observa su lenguaje corporal antes de la pelea. Si esta enfocado y controlado, buena senal. Si esta excesivamente emotivo, Harris puede explotar.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LA ULTIMA PELEA', content: 'CHIESA vs HARRIS\nUFC Seattle | 28 de marzo\nClimate Pledge Arena\n\n19-7 vs 19-7\nMismo record. Destinos opuestos.\nChiesa se despide del MMA.', color: 'red' },
        { slide_number: 2, title: 'CHIESA: EL MAVERICK', content: 'Campeon TUF Live\n19-7 en carrera (12 por sumision)\n7 rear-naked chokes en el UFC\nNunca noqueado en 26 peleas\n3 victorias seguidas\n14 anos en el UFC\nPelea de despedida en casa', color: 'red' },
        { slide_number: 3, title: 'HARRIS: MOCAMBIQUE', content: 'Primer guayanes en el UFC\n19-7 en carrera\n4-3 en el UFC\n2 Performance de la Noche\nEspecialista anaconda choke\n2 derrotas por KO seguidas\nNecesita ganar para sobrevivir en el roster', color: 'blue' },
        { slide_number: 4, title: 'GRAPPLING vs GRAPPLING', content: 'CHIESA:\n12 sumisiones en carrera\n50% precision de takedown\n3.33 TDs por 15 min\n\nHARRIS:\n6 sumisiones en carrera\n29% precision de takedown\n2.05 TDs por 15 min\n\nChiesa domina los numeros.', color: 'gold' },
        { slide_number: 5, title: 'PREDICCION', content: 'CHIESA por Sumision R2\n\nConfianza: MEDIA-ALTA\n65% Chiesa / 32% Harris\n\nEl rear-naked choke de despedida.\nHarris es peligroso en transiciones,\npero Chiesa es el grappler superior.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Chiesa vs Harris en UFC Seattle. La ultima pelea del Maverick. 14 anos en el UFC. 7 rear-naked chokes. Nunca noqueado. Y quiere retirarse con una finalizacion en casa. Hilo:' },
        { num: '2/6', text: 'Chiesa (19-7): 3 victorias seguidas. Sometio a Ferguson en R1. Sometio a Griffin en R3. Vencio a McGee por decision. Su jiu-jitsu esta mas afilado que nunca a los 38.' },
        { num: '3/6', text: 'Harris (19-7): 2 derrotas por KO seguidas. Ponzinibbio y Williams lo detuvieron. Pero no se enganen: Harris tiene 2 Performance de la Noche por sumision. El anaconda choke es peligroso. La pregunta es el menton.' },
        { num: '4/6', text: 'Los numeros de grappling no mienten: Chiesa tiene 3.33 TDs por 15 min con 50% de precision. Harris tiene 2.05 con 29%. En un duelo de grapplers, el volumen de Chiesa deberia prevalecer.' },
        { num: '5/6', text: 'Dato que pocos saben: Chiesa NUNCA fue noqueado en 26 peleas profesionales. Cero KOs sufridos. Harris fue noqueado 3x en el UFC. La diferencia de durabilidad aqui es extrema.' },
        { num: '6/6', text: 'Mi pick: Chiesa por sumision en el segundo round. El rear-naked choke de despedida en casa, frente a la familia. Si Harris sobrevive el grappling, Chiesa gana por decision. RT si estas de acuerdo.' },
      ],
      video: [
        { time: '0-10s', title: 'Gancho', text: 'Gano el TUF. Tiene 7 rear-naked chokes en el UFC. Nunca fue noqueado. Y el sabado sera su ULTIMA pelea. Michael Chiesa se despide del MMA en casa en Seattle.' },
        { time: '10-25s', title: 'Contexto', text: 'Chiesa viene de tres victorias seguidas, incluyendo sumisiones sobre Tony Ferguson y Max Griffin. Del otro lado, Carlston Harris, el primer guayanes del UFC, viene de dos derrotas por KO. Pero Harris tiene sumisiones exoticas que pueden sorprender a cualquiera.' },
        { time: '25-45s', title: 'Analisis', text: 'Cuando dos grapplers se enfrentan, la pelea se decide en los detalles. Chiesa tiene 3.33 takedowns por 15 minutos con 50% de precision. Harris tiene 2.05 con solo 29%. En el suelo, Chiesa busca el rear-naked choke. Harris busca el anaconda choke. La diferencia? Chiesa nunca fue noqueado en 26 peleas. Harris fue detenido de pie tres veces en el UFC.' },
        { time: '45-55s', title: 'Prediccion', text: 'Mi pick: Chiesa por sumision en el segundo round. Su grappling es superior, su cardio es mejor, y la motivacion de retirarse con victoria en casa es enorme. Pero cuidado con Harris en las transiciones. Su anaconda choke ya le valio dos bonos.' },
        { time: '55-65s', title: 'CTA', text: 'Chiesa logra la despedida perfecta? Comenta abajo tu prediccion y sigue para el analisis completo del card de UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'ULTIMA PELEA de un veterano de 14 anos del UFC, y quiere irse CON ESTILO.', body: 'Michael Chiesa, 7 rear-naked chokes en el UFC, nunca noqueado en 26 peleas, se retira en casa en Seattle contra Carlston Harris. Chiesa viene de 3 victorias seguidas. Harris viene de 2 nocauts sufridos. Parece facil, pero Harris tiene sumisiones exoticas que pueden sorprender a CUALQUIERA.', cta: 'Comenta CHIESA o HARRIS!' },
        { hook: 'Este tipo NUNCA fue noqueado en 26 peleas y el sabado es la ultima.', body: 'Michael Chiesa. Campeon del TUF. 12 sumisiones en carrera. 7 rear-naked chokes en el UFC. Y ahora quiere cerrar su carrera en casa en Seattle con otra finalizacion. El oponente? Carlston Harris, que tiene anaconda chokes mortales pero viene de dos derrotas por KO.', cta: 'Sera sumision? Comenta como crees que termina!' },
        { hook: 'El primer guayanes del UFC podria arruinar la fiesta de retiro.', body: 'Carlston Harris. Vino de Guyana, trabajo como mecanico en Brasil, entro al UFC y gano 2 bonos de Performance de la Noche con sumisiones. Enfrenta a Chiesa que se retira en casa. Harris esta desesperado, viene de 2 derrotas por KO, y necesita ganar para quedarse en el UFC.', cta: 'Harris logra la sorpresa? Comenta!' },
      ],
      headlines: [
        'Chiesa vs Harris: El Maverick Busca la Despedida Perfecta en Seattle',
        'Siete Rear-Naked Chokes y una Despedida: Chiesa Quiere Cerrar su Carrera con Finalizacion en Casa',
        'Harris el Aguafiestas? El Peligro del Anaconda Choke en el Retiro de Chiesa',
        'Nunca Noqueado en 26 Peleas: La Durabilidad Extraordinaria de Michael Chiesa',
        'Grappler vs Grappler: Por Que Chiesa vs Harris Podria Ser una Clase de Jiu-Jitsu en UFC Seattle',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-300',
        fighter2_odds: '+240',
        fighter1_name: 'Michael Chiesa',
        fighter2_name: 'Carlston Harris',
        source: 'Estimacion basada en perfil de pelea (marzo 2026). Cuotas exactas no disponibles tras cambio de cartelera.',
      },
      edges: [
        { icon: 'Target', titulo: 'Volumen de Takedowns', stat_headline: 'CHIESA: 3.33 TAKEDOWNS POR 15 MIN CON 50% DE PRECISION', contexto: 'Chiesa es uno de los mejores de la division en llevar la pelea al suelo. Harris tiene solo 29% de precision y 2.05 TDs por 15 min.', implicacao_aposta: 'Favorece a Chiesa por decision o sumision. La pelea va al suelo.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Durabilidad Incomparable', stat_headline: 'CHIESA: CERO NOCAUTS SUFRIDOS EN 26 PELEAS PROFESIONALES', contexto: 'En toda su carrera, Chiesa nunca fue detenido por golpes. Harris fue noqueado 3x en el UFC.', implicacao_aposta: 'Reduce drasticamente las chances de Harris de ganar por KO/TKO.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Sumisiones Exoticas de Harris', stat_headline: '2 PERFORMANCE DE LA NOCHE POR SUMISION EN EL UFC', contexto: 'Anaconda chokes y brabo chokes son armas que pueden sorprender hasta a grapplers experimentados. Harris ya mostro que puede finalizar en R1.', implicacao_aposta: 'Unico escenario realista de sorpresa. Harris por sumision merece atencion.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'TrendingUp', titulo: 'Momentum Opuesto', stat_headline: 'CHIESA: 3 VICTORIAS SEGUIDAS. HARRIS: 2 DERROTAS POR KO SEGUIDAS', contexto: 'El contraste de momento es contundente. Chiesa esta confiado y afilado. Harris puede estar sacudido psicologicamente tras dos nocauts.', implicacao_aposta: 'Favorece fuertemente a Chiesa. El momentum psicologico importa.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Factor Local en Seattle', stat_headline: 'CHIESA NACIO Y CRECIO EN WASHINGTON, A 4 HORAS DE SEATTLE', contexto: 'Ultima pelea de carrera, en casa, frente a familia y amigos. El Climate Pledge Arena estara gritando su nombre.', implicacao_aposta: 'Motivacion y apoyo del publico agregan ventaja intangible.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Chiesa por Sumision', odds: 'Segun datos disponibles', confianca: 'alta', edge_vs_mercado: '63% de las victorias de Chiesa son por sumision. Harris vulnerable en el suelo.', raciocinio: 'Chiesa finaliza por sumision en mas de la mitad de sus victorias. En el UFC, son 7 rear-naked chokes. Harris, a pesar de ser grappler, tiene defensa de takedown inferior (55%) y ya fue sometido en su carrera. Es el resultado mas probable de esta pelea.' },
        { tipo: 'Duracion', pick: 'Pelea no va a decision', odds: 'Segun datos disponibles', confianca: 'media', edge_vs_mercado: 'Dos grapplers activos que buscan finalizacion', raciocinio: 'Chiesa finalizo en sus ultimas dos victorias (Ferguson R1, Griffin R3). Harris tiene 6 sumisiones en carrera. Con dos grapplers agresivos, la chance de finalizacion antes del tercer round es significativa.' },
        { tipo: 'Moneyline', pick: 'Chiesa', odds: 'Segun datos disponibles', confianca: 'alta', raciocinio: 'Favorito justificado por practicamente todas las metricas: grappling superior, durabilidad, momentum, factor local y motivacion. Harris necesita algo especial para ganar.' },
      ],
      armadilha: {
        titulo: 'Trampa: Harris por KO/TKO',
        descricao: 'Harris tiene 5 nocauts en carrera, pero Chiesa NUNCA fue noqueado en 26 peleas profesionales. Apostar a Harris por KO/TKO es apostar contra 14 anos de evidencia. Si Harris va a ganar, sera por sumision, no por golpes.',
      },
      disclaimer: 'Analisis estadistico con fines informativos. Apueste con responsabilidad.',
    },
  },
};

// ===============================================================
// PAGE COMPONENT
// ===============================================================
const analises: Record<string, FullSingleAnalise> = { pt: analisePT, en: analiseEN, fr: analiseFR, es: analiseES };

export default function Page() {
  const locale = useLocale();
  return <FullAnalysisView analise={analises[locale] || analisePT} />;
}
