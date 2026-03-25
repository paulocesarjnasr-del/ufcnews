'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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

// ═══════════════════════════════════════════════════════════════
// ENGLISH VERSION
// ═══════════════════════════════════════════════════════════════
const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Chiesa vs Harris: The Maverick\'s Last Walk',
  subtitulo: 'Washington veteran seeks the perfect retirement against dangerous Guyanese grappler',
  evento_data: 'March 28, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Welterweight (170 lbs)',
  fight_prediction: {
    ...analisePT.fight_prediction,
    predictedMethod: 'Submission R2 or Unanimous Decision',
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
    narrativa: analisePT.full_analysis.narrativa,
    momento_atual: analisePT.full_analysis.momento_atual,
    nivel_competicao: analisePT.full_analysis.nivel_competicao,
    oponente_comum: null,
    comparacao_estatistica: analisePT.full_analysis.comparacao_estatistica,
    perfil_habilidades: analisePT.full_analysis.perfil_habilidades,
    distribuicao_vitorias: analisePT.full_analysis.distribuicao_vitorias,
    danger_zones: analisePT.full_analysis.danger_zones,
    intangiveis: analisePT.full_analysis.intangiveis,
    caminhos_vitoria: analisePT.full_analysis.caminhos_vitoria,
    previsao_final: analisePT.full_analysis.previsao_final,
    o_que_observar: analisePT.full_analysis.o_que_observar,
    creator_kit: analisePT.full_analysis.creator_kit,
    betting_value: null,
    radar_apostador: analisePT.full_analysis.radar_apostador,
  },
};

function ChiesaVsHarrisContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang')) || 'pt';
  const analise = lang === 'en' ? analiseEN : analisePT;
  return <FullAnalysisView analise={analise} />;
}

export default function ChiesaVsHarrisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg" />}>
      <ChiesaVsHarrisContent />
    </Suspense>
  );
}
