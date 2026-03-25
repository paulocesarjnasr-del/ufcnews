'use client';

import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';


// ═══════════════════════════════════════════════════════
// PT - PORTUGUESE (ORIGINAL)
// ═══════════════════════════════════════════════════════
const analisePT: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'erosa-vs-douglas',
  evento_id: null,
  slug: 'erosa-vs-douglas',
  titulo: 'Erosa vs Douglas: O Veterano Recepciona o Pistoleiro',
  subtitulo: 'Juicy J defende seu territorio em Seattle contra o estreante explosivo do Contender Series',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,80m', envergadura: '189cm', idade: 36, academia: 'Xtreme Couture' },
      fighter2: { altura: '1,75m', envergadura: '183cm', idade: 30, academia: 'Bloodline Combat Sports' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'TKO R1-R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Julian Erosa',
    record: '31-13-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Melquizael Costa', method: 'Decisao Unanime', event: 'UFC Fight Night 256' },
      { result: 'W', opponent: 'Darren Elkins', method: 'TKO R1', event: 'UFC 314' },
      { result: 'W', opponent: 'Christian Rodriguez', method: 'Submissao R1', event: 'UFC on ESPN 59' },
    ],
  },
  fighter2_info: {
    nome: 'Lerryan Douglas',
    record: '13-5-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Cam Teague', method: 'KO R1 (36 segundos)', event: 'DWCS 81' },
      { result: 'W', opponent: 'Elijah Johns', method: 'KO', event: 'LFA' },
      { result: 'W', opponent: 'Javier Reyes', method: 'TKO', event: 'LFA' },
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
    // ===========================
    // Section 1: HERO
    // ===========================
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Veterano Contra o Pistoleiro',
      tagline_sub: 'Juicy J luta em casa em Seattle contra o campeao do LFA que nocauteia todo mundo',
      fighter1: {
        nome_completo: 'Julian "Juicy J" Erosa',
        apelido: 'Juicy J',
        sobrenome: 'Erosa',
        record: '31-13-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Yakima, Washington | 36 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2024-07/EROSA_JULIAN_L_07-13.png?itok=lOpXxXfO',
      },
      fighter2: {
        nome_completo: 'Lerryan "Gunslinger" Douglas',
        apelido: 'Gunslinger',
        sobrenome: 'Douglas',
        record: '13-5-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Paranagua, Brasil | 30 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-09/DOUGLAS_LERRYAN_R_09-09.png?itok=oQ15ZOce',
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Seattle Recebe Juicy J de Volta</h3>
        <p class="mb-4">
          O UFC vai ao estado de Washington e traz junto um dos filhos mais queridos da regiao. <strong class="text-ufc-red">Julian Erosa</strong>, de Yakima, praticamente um vizinho de Seattle, entra no Climate Pledge Arena com a energia de quem luta no quintal de casa. Sao mais de 10 anos de carreira no MMA profissional, tres passagens pelo UFC, e uma coisa que nunca mudou: quando Juicy J entra no octogono, alguem vai para o hospital. Ele ou o oponente.
        </p>
        <p class="mb-4">
          Erosa e o tipo de lutador que o UFC precisa. Aceita qualquer luta, vai pra frente, e ja ganhou cinco bonus de performance/luta da noite na organizacao. O recorde de 31-13 nao mente: ele ganha muito, mas tambem perde, e muitas vezes de forma brutal. Sete das treze derrotas foram por nocaute. Mas os 26 finalizacoes em 31 vitorias (12 KOs e 14 submissoes) dizem tudo sobre o tipo de perigo que ele representa.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Pistoleiro Brasileiro</h3>
        <p class="mb-4">
          Do outro lado esta <strong class="text-blue-400">Lerryan Douglas</strong>, um brasileiro de Paranagua que reconstruiu sua carreira inteira nos Estados Unidos. Saiu de Curitiba aos 15 anos para treinar, acumulou derrotas no inicio, e agora chega ao UFC numa sequencia de cinco nocautes consecutivos. O ultimo foi no Contender Series, onde destruiu Cam Teague em 36 segundos com um soco de cinema que viralizou. Campeao do LFA, faixa preta de jiu-jitsu, faixa preta de muay thai, e campeao nacional de wrestling no Brasil. Douglas e o pacote completo, pelo menos no papel.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Significa Essa Luta</h3>
        <p class="mb-4">
          Para Erosa, e uma questao de sobrevivencia no roster. Vindo de derrota para Melquizael Costa, ele precisa de uma vitoria para se manter relevante. Lutar em casa e um bonus emocional enorme. Para Douglas, e o passo que define se o hype do Contender Series se traduz em realidade no octogono. O UFC nao perdoa estreantes que nao correspondem. Erosa e o tipo de veterano que o UFC escala para testar novatos: perigoso o suficiente para punir erros, acessivel o suficiente para dar espaco ao prospect brilhar.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'N/R (top 60 FW)', fighter2: 'N/R (estreante UFC)' },
        { dimensao: 'Objetivo', fighter1: 'Manter posicao no roster, vitoria em casa', fighter2: 'Impressionar na estreia UFC' },
        { dimensao: 'Narrativa', fighter1: 'Veterano lutando no quintal de casa', fighter2: 'Prospect explosivo em busca de validacao' },
        { dimensao: 'Risco', fighter1: 'Duas derrotas em tres lutas = corte provavel', fighter2: 'Derrota na estreia fria o hype completamente' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'JUICY J ESTRAGA A FESTA',
          subtitulo: 'Erosa usa a experiencia e o jiu-jitsu para submeter o estreante em casa',
          consequencias: [
            { tag: 'ROSTER', texto: 'Erosa garante mais pelo menos 2-3 lutas no UFC com vitoria em casa sobre prospect hypadissimo' },
            { tag: 'NARRATIVA', texto: 'O veterano mostra que hype de Contender Series nao substitui experiencia real no octogono' },
            { tag: 'DOUGLAS', texto: 'Douglas volta para lutas menores e precisa reconstruir momentum, mas nao e cortado imediatamente' },
          ],
          proxima_luta: 'Erosa vs outro veterano/prospect no peso-pena, possivelmente um top 30',
        },
        fighter2_vence: {
          titulo: 'O GUNSLINGER CHEGOU',
          subtitulo: 'Douglas confirma o hype com mais uma finalizacao devastadora',
          consequencias: [
            { tag: 'HYPE', texto: 'Douglas se estabelece como um dos prospects mais perigosos do peso-pena e entra no radar da divisao' },
            { tag: 'SEQUENCIA', texto: 'Seis nocautes consecutivos colocam Douglas na conversa de bonus de performance' },
            { tag: 'EROSA', texto: 'Erosa fica com 9-9 no UFC e enfrenta corte real da organizacao' },
          ],
          proxima_luta: 'Douglas vs um veterano ranqueado entre 25-40 no peso-pena',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Julian Erosa',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota em guerra que rendeu bonus de Luta da Noite. Ambos foram hospitalizados apos a luta.' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute devastador sobre veterano em declinio. Parada violenta no primeiro round.' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1 (guilhotina)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina no primeiro round contra oponente sem ranking. Finalizacao tecnica perfeita.' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1 (guilhotina)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mais uma guilhotina no primeiro round. Tres vitorias consecutivas todas por finalizacao.' },
          { date: 'Dez 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocauteado no primeiro round por head kick. Derrota brutal que quebrou sequencia de tres vitorias.' },
        ],
        full_fight_history: [
          { date: 'Jun 2020', opponent: 'Sean Woodson', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia na terceira passagem pelo UFC, comeback por submissao' },
          { date: 'Dez 2020', opponent: 'Nate Landwehr', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mais uma finalizacao dramatica' },
          { date: 'Mai 2021', opponent: 'Seungwoo Choi', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteado no terceiro round' },
          { date: 'Out 2021', opponent: 'Charles Jourdain', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado rapidamente' },
          { date: 'Fev 2022', opponent: 'Steven Peterson', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Luta da Noite, guerra de tres rounds' },
          { date: 'Set 2022', opponent: 'Hakeem Dawodu', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida por decisao' },
          { date: 'Dez 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocauteado por head kick' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Guilhotina no primeiro round' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina no primeiro round' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO devastador' },
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Luta da Noite, ambos hospitalizados' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Erosa vem de derrota para Melquizael Costa, mas antes disso emplacou tres vitorias consecutivas por finalizacao no primeiro round. O padrao e claro: Erosa oscila entre sequencias de vitorias empolgantes e derrotas devastadoras. No UFC, seu recorde e 9-8, o que ilustra essa montanha-russa. A boa noticia e que ele luta em casa, em Seattle, e a motivacao extra e real.',
      },
      fighter2: {
        nome: 'Lerryan Douglas',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute brutal em 36 segundos no Contender Series. Ganhou contrato do UFC.' },
          { date: 'Jan 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Medio', note: 'Unificou o titulo peso-pena do LFA com mais um nocaute.' },
          { date: 'Ago 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Medio', note: 'Conquistou o titulo interino do LFA por TKO.' },
          { date: 'Mai 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no segundo round no LFA.' },
          { date: 'Fev 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no primeiro round.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS, 36 segundos' },
          { date: 'Jan 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Titulo LFA unificado' },
          { date: 'Ago 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Titulo interino LFA' },
          { date: 'Mai 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'LFA' },
          { date: 'Fev 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'LFA' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Douglas chega ao UFC na melhor fase da carreira. Cinco nocautes consecutivos, titulo do LFA unificado, e um contrato do Contender Series que veio com um highlight reel de 36 segundos. O momentum e inegavel. A grande pergunta e se o nivel de oposicao no LFA e Contender Series se traduz para o octogono do UFC. Nenhum dos oponentes recentes estava perto do nivel de Erosa.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Erosa',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '9W-8L (53%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Douglas',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '0W-0L (estreante)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nao existem oponentes em comum entre Erosa e Douglas. Os dois operam em universos completamente diferentes ate agora: Erosa e veterano do UFC com 17 lutas na organizacao, enquanto Douglas vem exclusivamente do circuito LFA e Contender Series. Nao ha base direta de comparacao.',
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
        { label: 'Sig. Strikes por Minuto', valueA: 6.21, valueB: 11.67, maxVal: 14, format: 'decimal', note: 'Stats de Douglas baseados em apenas 1 luta (DWCS, 36 segundos)' },
        { label: 'Precisao de Strikes (%)', valueA: 49, valueB: 88, maxVal: 100, format: 'percent', note: 'Amostra minima para Douglas' },
        { label: 'Strikes Absorvidos/Min', valueA: 6.27, valueB: 5.00, maxVal: 8, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 49, valueB: 67, maxVal: 100, format: 'percent', note: 'Amostra minima para Douglas' },
        { label: 'Takedowns por 15 Min', valueA: 1.78, valueB: 0.00, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 44, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 62, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.73, valueB: 0.00, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '36 anos', fighter2: '30 anos', note: 'Douglas 6 anos mais jovem' },
        { label: 'Altura', fighter1: '5\'11" (1,80m)', fighter2: '5\'9" (1,75m)', note: 'Erosa 2 polegadas mais alto' },
        { label: 'Envergadura', fighter1: '74.5" (189cm)', fighter2: '72" (183cm)', note: 'Erosa com 2.5 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Southpaw', fighter2: 'Ortodoxo', note: 'Matchup de stances opostas' },
        { label: 'Academia', fighter1: 'Xtreme Couture, Las Vegas', fighter2: 'Bloodline Combat Sports, Costa Mesa', note: null },
        { label: 'Estreia UFC', fighter1: 'Dezembro 2015 (3a passagem desde 2020)', fighter2: 'Estreia (28 de Marco, 2026)', note: 'Erosa com 17 lutas no UFC' },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Striking em Pe', valueA: 65, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Douglas traz poder de nocaute superior com 7 KOs em 13 vitorias. Erosa e mais volume do que poder no striking.' },
        { label: 'Jiu-Jitsu e Submissoes', valueA: 85, valueB: 70, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Erosa tem 14 submissoes na carreira, incluindo guilhotinas devastadoras. Douglas e faixa preta mas tem apenas 3 subs.' },
        { label: 'Wrestling e Takedowns', valueA: 60, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Douglas foi campeao nacional de wrestling no Brasil. Erosa tem media de 1.78 TDs por 15 min no UFC. Area equilibrada.' },
        { label: 'Cardio e Resistencia', valueA: 70, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Erosa tem mais experiencia em lutas longas e rounds completos. Douglas finaliza cedo e nao tem muita amostra tardia.' },
        { label: 'Poder de Finalizacao', valueA: 72, valueB: 88, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Douglas vem de 5 KOs consecutivos. Erosa tem poder, mas absorve muito dano na troca.' },
        { label: 'Durabilidade e Queixo', valueA: 50, valueB: 60, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Erosa tem 7 derrotas por nocaute na carreira. E o maior ponto de vulnerabilidade dele contra um striker explosivo.' },
      ],
      insight: 'Erosa traz a vantagem no grappling, especialmente nas submissoes, com uma guilhotina letal que pode punir qualquer tentativa de clinch ou entrada descuidada. Douglas traz poder superior no striking e a explosividade de quem esta no auge fisico. A questao central e se Douglas consegue manter a distancia ou se Erosa arrasta a luta pro chao.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Erosa',
        ko_tko: { count: 12, percent: 39 },
        submission: { count: 14, percent: 45 },
        decision: { count: 5, percent: 16 },
        total_wins: 31,
      },
      fighter2: {
        nome: 'Douglas',
        ko_tko: { count: 7, percent: 54 },
        submission: { count: 3, percent: 23 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      insight: 'Dois finalizadores, estilos diferentes. Erosa e um dos lutadores mais versatis do peso-pena: quase metade das vitorias por submissao (14) e outra parcela significativa por nocaute (12). So 16% vao para decisao, o que significa que quando Erosa luta, algo acontece. Douglas e ainda mais direto: 54% por KO/TKO, com seis finalizacoes no primeiro round na carreira. Se essa luta vai para o terceiro round, algo deu errado para os dois.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VANTAGEM DOUGLAS',
          color: 'green',
          title: 'A Zona de Perigo Maxima',
          description: 'O primeiro round e o territorio de Douglas. Cinco nocautes consecutivos, seis finalizacoes no R1 na carreira. Ele chega fresco, explosivo, e com a confianca de quem nao viu o segundo round nas ultimas cinco lutas. Mas cuidado: Erosa tambem e perigoso cedo. Tres guilhotinas no R1 nas ultimas quatro vitorias. Quem errar primeiro, paga caro. E o round mais perigoso para os dois lados.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round da Verdade',
          description: 'Se a luta chegar ao segundo round, a dinamica muda. Douglas nunca mostrou como lida com resistencia real apos o primeiro round no nivel LFA/DWCS. Erosa, por outro lado, ja esteve em guerras de tres rounds. A experiencia de Erosa em lutas competitivas ganha valor aqui. Se Douglas nao conseguiu finalizar no R1, a confianca comeca a ser testada.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VANTAGEM EROSA',
          color: 'red',
          title: 'Territorio do Veterano',
          description: 'O terceiro round favorece Erosa. O veterano tem experiencia em lutas longas e sabe como impor o ritmo quando o adversario comeca a cansar. As submissoes de Erosa se tornam ainda mais perigosas contra um oponente que gastou energia tentando nocautes nos rounds anteriores. Se Douglas estiver cansado, a guilhotina pode aparecer.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Erosa Luta em Casa', fighter: 'Erosa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Erosa e de Yakima, Washington, a menos de 150km de Seattle. O Climate Pledge Arena vai ter uma torcida local forte para Juicy J. Lutar em casa no UFC sempre traz energia extra, e Erosa e o tipo de lutador que alimenta da energia da torcida.' },
        { icon: 'AlertTriangle', title: 'Queixo Vulneravel', fighter: 'Erosa', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Sete derrotas por nocaute na carreira. Contra um striker explosivo como Douglas, que vem de cinco KOs consecutivos, essa vulnerabilidade e o fator mais preocupante para Erosa. Se Douglas conectar limpo, a probabilidade de nocaute e altissima.' },
        { icon: 'Zap', title: 'Poder de Nocaute Assustador', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Cinco nocautes consecutivos, incluindo o de 36 segundos no Contender Series. Douglas tem poder real nas duas maos. Faixa preta de muay thai com tecnica refinada de striking. Contra um oponente que ja foi nocauteado sete vezes, o poder de Douglas e um fator decisivo.' },
        { icon: 'Brain', title: 'Estreia no UFC e Nervosismo', fighter: 'Douglas', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Douglas nunca lutou no UFC. O octogono e diferente: mais pressao, cameras, publico, e nivel de oposicao superior. Muitos prospects do Contender Series tropeçam na estreia. O nervosismo pode afetar o timing e a tomada de decisao.' },
        { icon: 'Shield', title: 'Guilhotina Letal', fighter: 'Erosa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Erosa tem uma das melhores guilhotinas do peso-pena. Finalizou Ricardo Ramos e Christian Rodriguez com guilhotinas no R1 em sequencia. Se Douglas tentar clinch ou entrar descuidado, pode cair numa armadilha mortal.' },
        { icon: 'Clock', title: 'Layoff de 10 Meses', fighter: 'Erosa', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Erosa nao luta desde maio de 2025, sao quase 10 meses de inatividade. Para um lutador de 36 anos, o tempo parado pode afetar reflexos e timing. Nao e um layoff extremo, mas e relevante.' },
        { icon: 'TrendingUp', title: 'Cub Swanson como Coach', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Douglas treina com Cub Swanson na Bloodline Combat Sports, alem de trabalhar boxe com Joel Diaz. Swanson e um ex-lutador de elite do peso-pena que entende exatamente o que funciona nessa divisao. A preparacao para a estreia esta em maos experientes.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Erosa',
        total_probability: 35,
        scenarios: [
          { name: 'A Guilhotina Assassina', probability: 15, method: 'Submissao R1-R2', description: 'Erosa convida a troca, Douglas entra agressivo, e Erosa encaixa a guilhotina numa transicao. O mesmo padrao que funcionou contra Ramos e Rodriguez. Douglas e faixa preta, mas a guilhotina de Erosa e de outro nivel.' },
          { name: 'Guerra de Atricao', probability: 12, method: 'Decisao Unanime', description: 'Erosa sobrevive o primeiro round, usa o clinch e takedowns para neutralizar o poder de Douglas, e vence nos pontos com controle e atividade. O cardio do veterano pesa nos rounds finais.' },
          { name: 'Nocaute de Contragolpe', probability: 8, method: 'KO/TKO R2-R3', description: 'Douglas entra confiante, Erosa contragolpeia com precisao southpaw. Erosa tem 12 KOs na carreira e sabe como contra-atacar. Se Douglas for reckless, pode pagar o preco.' },
        ],
      },
      fighter2: {
        nome: 'Douglas',
        total_probability: 62,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 30, method: 'KO/TKO R1', description: 'Douglas repete o padrao das ultimas cinco lutas. Entra explosivo, conecta uma combinacao pesada, e encerra antes do primeiro round acabar. Contra um oponente com 7 derrotas por nocaute, a probabilidade e alta.' },
          { name: 'TKO por Volume', probability: 18, method: 'TKO R2', description: 'Douglas nao consegue o nocaute no R1, mas acumula dano no striking. No segundo round, o volume de golpes pesados leva a uma parada do arbitro ou desistencia no corner.' },
          { name: 'Grappling Inesperado', probability: 14, method: 'Submissao ou TKO no chao R1-R2', description: 'Douglas usa suas credenciais de wrestling e jiu-jitsu para surpreender. Campeao nacional de wrestling no Brasil e faixa preta de jiu-jitsu, ele pode levar a luta ao chao se o striking nao funcionar.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Lerryan Douglas',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Douglas e o favorito por boas razoes. O poder de nocaute e real, a sequencia de finalizacoes e impressionante, e ele enfrenta um oponente com vulnerabilidade comprovada ao nocaute (7 KOs sofridos). Erosa absorve 6.27 strikes significativos por minuto, o que significa que ele VAI ser atingido, e contra o poder de Douglas, cada golpe limpo e potencialmente o fim. A confianca nao e ALTA porque Douglas e um estreante no UFC, o fator casa favorece Erosa, e a guilhotina de Juicy J e uma ameaca real. Se Douglas entrar descuidado tentando o nocaute, pode acabar estrangulado no chao. Mas o cenario mais provavel e Douglas conectando algo grande nos primeiros rounds.',
      x_factor: {
        title: 'A Guilhotina de Erosa',
        description: 'Erosa finalizou Ramos e Rodriguez com guilhotinas no R1 em 2024. Se Douglas entrar agressivo e baixar a cabeca para encurtar distancia contra o southpaw, pode cair direto numa guilhotina. E o unico caminho realista para o upset.',
      },
      upset_alert: {
        title: 'O Veterano em Casa Tem Truques',
        description: 'Erosa ja fez 17 lutas no UFC. Ele sabe como sobreviver contra power strikers, sabe encaixar submissoes em momentos de caos, e a torcida de Seattle vai empurrar. Nao subestime o fator experiencia contra um estreante nervoso.',
      },
      probabilities: {
        fighter1: { nome: 'Erosa', percent: 35 },
        fighter2: { nome: 'Douglas', percent: 62 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Erosa (+285)', reasoning: 'Como azarao a +285, Erosa oferece valor se voce acredita na experiencia, na guilhotina, e no fator casa. A linha esta generosa para um veterano perigoso.' },
        method: { pick: 'Douglas por KO/TKO', reasoning: '7 KOs na carreira de Douglas, 7 derrotas por nocaute na carreira de Erosa. A convergencia e brutal.' },
        over_under: { pick: 'Under 1.5 rounds', rounds: 1.5, reasoning: 'Douglas finaliza cedo (5 KOs consecutivos). Erosa tambem finaliza cedo (3 guilhotinas no R1). Alguem vai dormir rapido.' },
        best_value: 'Under 1.5 rounds e a aposta mais inteligente. Os dois sao finalizadores de primeiro round e esse estilo favorece uma conclusao rapida.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 60 Segundos de Douglas', icon: 'Zap', description: 'Se Douglas vier com a mesma intensidade do Contender Series, os primeiros 60 segundos serao os mais perigosos da luta inteira. Observe se ele entra com combinacoes pesadas ou se respeita o southpaw de Erosa. Se ele entrar reckless, pode cair na guilhotina. Se entrar calculado, pode nocautear.' },
        { num: 2, title: 'A Distancia do Southpaw de Erosa', icon: 'Target', description: 'Erosa e canhoto, e isso muda toda a dinamica do striking. Douglas treinou a vida toda contra ortodoxos. O jab de esquerda de Erosa e o angulo diferente podem confundir Douglas nos primeiros minutos. Observe como Douglas lida com a mudanca de angulo.' },
        { num: 3, title: 'Tentativas de Clinch e Guilhotina', icon: 'Shield', description: 'Sempre que houver clinch ou tentativa de takedown, observe o braco de Erosa ao redor do pescoco. A guilhotina dele e quase instintiva. Se Douglas abaixar a cabeca para entrar, Erosa pode pegar o pescoco em fracao de segundo.' },
        { num: 4, title: 'O Body Language de Douglas no R2', icon: 'Activity', description: 'Se a luta chegar ao segundo round, observe a linguagem corporal de Douglas. Ele ja mostrou que pode lutar alem do R1? O cardio foi testado em lutas do LFA que foram a decisao, mas o octogono e outro nivel de pressao. Sinais de fadiga ou frustração podem indicar que a luta esta virando.' },
        { num: 5, title: 'A Reacao da Torcida de Seattle', icon: 'MapPin', description: 'Erosa e o filho local. O Climate Pledge Arena vai ficar barulhento para Juicy J. Observe como a energia da torcida afeta os dois lutadores. Erosa pode se alimentar disso e ir pra frente com mais agressividade. Douglas precisa bloquear o barulho e manter o foco no gameplan.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'VETERANO vs ESTREANTE', content: 'EROSA vs DOUGLAS\nUFC Seattle | 28 de Marco\nClimate Pledge Arena\n\n31-13 vs 13-5\nO veterano de casa contra o pistoleiro do LFA.\n5 nocautes consecutivos de Douglas.', color: 'red' },
        { slide_number: 2, title: 'EROSA: JUICY J', content: 'Yakima, Washington (luta em casa!)\n31-13-0 na carreira\n9-8 no UFC\n14 submissoes (guilhotina mortal)\n12 KOs\n5 bonus de performance\nSouthpaw perigoso\nFinalizou 3 por guilhotina R1 em 2024', color: 'red' },
        { slide_number: 3, title: 'DOUGLAS: GUNSLINGER', content: 'Paranagua, Brasil\n13-5-0 na carreira\nESTREIA no UFC\n5 KOs consecutivos\nCampeao peso-pena LFA\nFaixa preta BJJ + Muay Thai\nCampeao nacional wrestling Brasil\nKO em 36 segundos no DWCS', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE DA LUTA', content: 'GUILHOTINA vs PODER\n\nErosa: 14 subs na carreira\n3 guilhotinas R1 em 2024\n\nDouglas: 7 KOs na carreira\n5 KOs consecutivos\n6 finalizacoes no R1\n\nSe vai ao chao = Erosa\nSe fica em pe = Douglas', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'DOUGLAS por KO/TKO R1-R2\n\nConfianca: MEDIA\n62% Douglas / 35% Erosa\n\nMas cuidado com a guilhotina.\nUm erro de Douglas pode\ncustar tudo no primeiro round.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Erosa vs Douglas no UFC Seattle e exatamente o tipo de luta que termina em 2 minutos. O veterano com 7 derrotas por KO contra o estreante com 5 KOs consecutivos. Algo vai explodir. Thread:' },
        { num: '2/6', text: 'Erosa (31-13): 26 finalizacoes em 31 vitorias. 14 submissoes. 3 guilhotinas no R1 so em 2024. Luta em CASA em Seattle, a 2 horas de Yakima. Southpaw. 17 lutas no UFC. 5 bonus. O cara e uma montanha-russa ambulante.' },
        { num: '3/6', text: 'Douglas (13-5): 5 KOs consecutivos. Campeao do LFA. Faixa preta de BJJ E muay thai. Campeao nacional de wrestling do Brasil. KO de 36 segundos no Contender Series que viralizou. Treina com Cub Swanson. O hype e real.' },
        { num: '4/6', text: 'O problema pra Erosa: 7 derrotas por KO na carreira. SETE. Contra um cara que nocauteia todo mundo que fica na frente dele. A matematica e cruel: se Douglas conectar limpo, acabou.' },
        { num: '5/6', text: 'Mas nao descarte Erosa. Aquela guilhotina e MORTAL. Ramos e Rodriguez foram estrangulados no R1 em 2024. Se Douglas baixar a cabeca pra encurtar distancia contra o southpaw, pode acordar no chao sem ar.' },
        { num: '6/6', text: 'Pick: Douglas por KO/TKO no R1-R2. Melhor aposta: Under 1.5 rounds. Os dois sao finalizadores de primeiro round, e o estilo favorece explosao rapida. Mas Erosa a +285 tem valor pra quem gosta de apostar em underdogs perigosos.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Um cara com 7 derrotas por nocaute contra um cara com 5 nocautes consecutivos. O que pode dar errado? Erosa vs Douglas no UFC Seattle e o tipo de luta que termina com alguem dormindo.' },
        { time: '10-25s', title: 'Os Lutadores', text: 'Erosa e de Washington, luta em casa, tem 31 vitorias incluindo 14 submissoes com uma guilhotina assassina. Douglas e brasileiro, vem do LFA com titulo e um nocaute viral de 36 segundos no Contender Series. Faixa preta de tudo: BJJ, muay thai, wrestling.' },
        { time: '25-40s', title: 'A Analise', text: 'Douglas e favorito a -350 por uma razao: o poder dele encontra a maior vulnerabilidade de Erosa, que sao os nocautes sofridos. Mas Erosa tem uma carta escondida: a guilhotina. Finalizou tres caras no R1 por guilhotina em 2024. Se Douglas entrar agressivo e baixar a cabeca, pode cair numa armadilha.' },
        { time: '40-55s', title: 'Previsao', text: 'Douglas por KO nos primeiros dois rounds e o cenario mais provavel. Mas essa e uma luta com potencial de upset real por submissao. Under 1.5 rounds e a aposta mais inteligente do card. Os dois sao finalizadores de primeiro round.' },
        { time: '55-65s', title: 'CTA', text: 'Quem voces acham? O veterano com a guilhotina em casa ou o pistoleiro brasileiro? Comenta embaixo e segue para mais analises do UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'Esse cara tem 7 DERROTAS por nocaute e vai enfrentar um cara com 5 NOCAUTES consecutivos.', body: 'Erosa contra Douglas no UFC Seattle. Erosa e de Washington, luta em CASA, e tem uma guilhotina que ja estrangulou 3 caras no primeiro round em 2024. Douglas veio do LFA com titulo e nocauteou o ultimo oponente em 36 SEGUNDOS. Alguem vai dormir RAPIDO.', cta: 'Comenta EROSA ou DOUGLAS!' },
        { hook: '36 SEGUNDOS. Foi o tempo que Douglas levou para ganhar o contrato do UFC.', body: 'Lerryan Douglas nocauteou Cam Teague no Contender Series com um soco de cinema. 5 nocautes consecutivos. Campeao do LFA. Faixa preta de BJJ e muay thai. Agora estreia no UFC contra um veterano com 17 lutas na organizacao que luta no QUINTAL de casa em Seattle.', cta: 'Sera que o hype e real? Comenta!' },
        { hook: 'A guilhotina MAIS perigosa do peso-pena contra o nocaute MAIS explosivo do LFA.', body: 'Erosa tem 14 submissoes na carreira, a maioria por guilhotina. Douglas tem 7 nocautes na carreira, 5 consecutivos. Se Douglas entrar baixo, Erosa pega o pescoco. Se Erosa ficar na frente, Douglas desliga a luz. Quem erra primeiro, perde.', cta: 'Qual e a sua pick? Comenta!' },
      ],
      headlines: [
        'Erosa vs Douglas: Por Que Essa Luta Nao Vai Passar do Segundo Round',
        'O Veterano de Seattle Contra o Pistoleiro Brasileiro: Analise UFC Fight Night',
        'Douglas Faz Estreia no UFC: 5 KOs Consecutivos Contra o Queixo Fragil de Erosa',
        'A Guilhotina de Erosa Pode Ser a Armadilha Perfeita Para Douglas no UFC Seattle',
        'Juicy J em Casa: Erosa Tenta Estragar a Festa do Prospect Mais Hypado do Card',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+285',
        fighter2_odds: '-350',
        fighter1_name: 'Julian Erosa',
        fighter2_name: 'Lerryan Douglas',
        source: 'Odds de abertura (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Vulnerabilidade ao Nocaute', stat_headline: 'EROSA TEM 7 DERROTAS POR KO/TKO EM 13 DERROTAS NA CARREIRA', contexto: '54% das derrotas de Erosa vieram por nocaute. Contra um striker explosivo como Douglas, esse historico e alarmante.', implicacao_aposta: 'Favorece Douglas por KO/TKO como metodo de vitoria especifico.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Guilhotina Letal de Erosa', stat_headline: '14 SUBMISSOES NA CARREIRA, 3 GUILHOTINAS NO R1 EM 2024', contexto: 'Erosa finalizou Ramos e Rodriguez por guilhotina no primeiro round. E uma arma que pode punir qualquer entrada descuidada de Douglas.', implicacao_aposta: 'Da valor a Erosa por submissao como prop. E o caminho mais realista para o upset.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Under 1.5 Rounds', stat_headline: 'DOUGLAS: 6 FINALIZACOES NO R1. EROSA: 9 FINALIZACOES NO R1', contexto: 'Os dois sao finalizadores de primeiro round. Combinados, 15 das vitorias deles vieram no R1. A probabilidade de luta curta e altissima.', implicacao_aposta: 'Under 1.5 rounds e a aposta com melhor edge estatistico nessa luta.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Brain', titulo: 'Estreia no UFC de Douglas', stat_headline: 'PRIMEIRA LUTA NO OCTOGONO, CONTRA VETERANO DE 17 LUTAS UFC', contexto: 'Douglas nunca lutou no UFC. O salto do LFA/DWCS para o octogono e significativo. Muitos prospects falham na estreia.', implicacao_aposta: 'Adiciona incerteza ao favoritismo pesado de Douglas. Erosa a +285 tem valor por esse fator.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Fator Casa para Erosa', stat_headline: 'EROSA DE YAKIMA, WA, LUTANDO EM SEATTLE', contexto: 'Erosa luta a menos de 2 horas de casa. O Climate Pledge Arena tera apoio local significativo para Juicy J.', implicacao_aposta: 'Pode influenciar a energia de Erosa e decisoes apertadas.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-110 (estimado)', confianca: 'alta', edge_vs_mercado: 'Dois finalizadores de primeiro round. 15 vitorias combinadas no R1.', raciocinio: 'Douglas termina lutas cedo (5 KOs consecutivos, 6 finalizacoes no R1). Erosa tambem termina cedo (3 guilhotinas no R1 em 2024, 9 finalizacoes no R1 na carreira). O estilo dos dois converge para uma luta curta e explosiva.' },
        { tipo: 'Metodo', pick: 'Douglas por KO/TKO', odds: '-200 (estimado)', confianca: 'media', raciocinio: 'Douglas tem 7 KOs em 13 vitorias. Erosa tem 7 derrotas por KO em 13 derrotas. A convergencia e o argumento. Mas a possibilidade de submissao de Erosa impede confianca alta.' },
        { tipo: 'Moneyline', pick: 'Erosa (+285)', odds: '+285', confianca: 'baixa', edge_vs_mercado: 'Estreante no UFC, veterano em casa, guilhotina mortal. A +285, precisa vencer apenas ~26% das vezes para ter valor. Estimativa real: 35%.', raciocinio: 'Erosa e um azarao perigoso. A guilhotina, a experiencia, o fator casa, e a incognita da estreia de Douglas combinam para criar valor real a +285.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Apostar Pesado em Douglas Moneyline a -350',
        descricao: 'A -350, voce precisa apostar 350 para ganhar 100. Isso so vale se Douglas vencer em 78% dos cenarios ou mais. A estimativa real e de 62%, incluindo o risco da guilhotina de Erosa e a incognita da estreia no UFC. A moneyline pura de Douglas esta cara. O melhor valor esta em Douglas por KO/TKO ou no Under 1.5 rounds, que pagam melhor com probabilidade similar.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};


// ═══════════════════════════════════════════════════════
// EN - ENGLISH
// ═══════════════════════════════════════════════════════
const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Erosa vs Douglas: The Veteran Welcomes the Gunslinger',
  subtitulo: 'Juicy J defends his turf in Seattle against the explosive Contender Series debutant',
  evento_data: 'March 28, 2026',
  categoria_peso: 'Featherweight (145 lbs)',
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Melquizael Costa', method: 'Unanimous Decision', event: 'UFC Fight Night 256' },
      { result: 'W', opponent: 'Darren Elkins', method: 'TKO R1', event: 'UFC 314' },
      { result: 'W', opponent: 'Christian Rodriguez', method: 'Submission R1', event: 'UFC on ESPN 59' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Cam Teague', method: 'KO R1 (36 seconds)', event: 'DWCS 81' },
      { result: 'W', opponent: 'Elijah Johns', method: 'KO', event: 'LFA' },
      { result: 'W', opponent: 'Javier Reyes', method: 'TKO', event: 'LFA' },
    ],
  },
  full_analysis: {
    hero: {
      ...analisePT.full_analysis!.hero,
      evento_data: 'March 28, 2026',
      categoria_peso: 'Featherweight (145 lbs)',
      tagline: 'The Veteran vs The Gunslinger',
      tagline_sub: 'Juicy J fights at home in Seattle against the LFA champion who knocks everyone out',
      fighter1: {
        ...analisePT.full_analysis!.hero.fighter1,
        ranking: 'N/R Featherweight',
        info_extra: 'Yakima, Washington | 36 years old',
      },
      fighter2: {
        ...analisePT.full_analysis!.hero.fighter2,
        ranking: 'N/R Featherweight',
        info_extra: 'Paranagua, Brazil | 30 years old',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Seattle Welcomes Juicy J Back</h3>
        <p class="mb-4">
          The UFC heads to Washington state and brings one of the region's favorite sons along. <strong class="text-ufc-red">Julian Erosa</strong>, from Yakima, practically a neighbor of Seattle, steps into the Climate Pledge Arena with the energy of someone fighting in their own backyard. Over 10 years of professional MMA career, three stints in the UFC, and one thing that never changed: when Juicy J enters the octagon, someone goes to the hospital. Him or his opponent.
        </p>
        <p class="mb-4">
          Erosa is the type of fighter the UFC needs. He accepts any fight, moves forward, and has already earned five performance/fight of the night bonuses in the organization. The 31-13 record doesn't lie: he wins a lot, but he also loses, often in brutal fashion. Seven of the thirteen losses came by knockout. But the 26 finishes in 31 wins (12 KOs and 14 submissions) say everything about the danger he represents.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Brazilian Gunslinger</h3>
        <p class="mb-4">
          On the other side stands <strong class="text-blue-400">Lerryan Douglas</strong>, a Brazilian from Paranagua who rebuilt his entire career in the United States. He left Curitiba at 15 to train, accumulated losses early on, and now arrives at the UFC on a streak of five consecutive knockouts. The last one was on the Contender Series, where he destroyed Cam Teague in 36 seconds with a cinematic punch that went viral. LFA champion, jiu-jitsu black belt, muay thai black belt, and national wrestling champion in Brazil. Douglas is the complete package, at least on paper.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">What This Fight Means</h3>
        <p class="mb-4">
          For Erosa, it's a matter of roster survival. Coming off a loss to Melquizael Costa, he needs a win to stay relevant. Fighting at home is a massive emotional bonus. For Douglas, it's the step that defines whether the Contender Series hype translates to reality in the octagon. The UFC doesn't forgive debutants who don't deliver. Erosa is the type of veteran the UFC books to test newcomers: dangerous enough to punish mistakes, accessible enough to give the prospect room to shine.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'N/R (top 60 FW)', fighter2: 'N/R (UFC debutant)' },
        { dimensao: 'Goal', fighter1: 'Keep roster spot, win at home', fighter2: 'Impress on UFC debut' },
        { dimensao: 'Narrative', fighter1: 'Veteran fighting in his backyard', fighter2: 'Explosive prospect seeking validation' },
        { dimensao: 'Risk', fighter1: 'Two losses in three fights = likely cut', fighter2: 'Loss on debut kills the hype completely' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'JUICY J SPOILS THE PARTY',
          subtitulo: 'Erosa uses experience and jiu-jitsu to submit the debutant at home',
          consequencias: [
            { tag: 'ROSTER', texto: 'Erosa secures at least 2-3 more UFC fights with a home win over a hyped prospect' },
            { tag: 'NARRATIVE', texto: 'The veteran proves that Contender Series hype doesn\'t replace real octagon experience' },
            { tag: 'DOUGLAS', texto: 'Douglas goes back to smaller fights and needs to rebuild momentum, but isn\'t cut immediately' },
          ],
          proxima_luta: 'Erosa vs another veteran/prospect at featherweight, possibly a top 30',
        },
        fighter2_vence: {
          titulo: 'THE GUNSLINGER HAS ARRIVED',
          subtitulo: 'Douglas confirms the hype with another devastating finish',
          consequencias: [
            { tag: 'HYPE', texto: 'Douglas establishes himself as one of the most dangerous featherweight prospects and gets on the division\'s radar' },
            { tag: 'STREAK', texto: 'Six consecutive knockouts put Douglas in the performance bonus conversation' },
            { tag: 'EROSA', texto: 'Erosa goes to 9-9 in the UFC and faces a real organizational cut' },
          ],
          proxima_luta: 'Douglas vs a veteran ranked between 25-40 at featherweight',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Julian Erosa',
        color: 'red',
        recent_fights: [
          { date: 'May 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Loss in a war that earned Fight of the Night bonus. Both were hospitalized after the fight.' },
          { date: 'Apr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Devastating knockout over declining veteran. Violent stoppage in the first round.' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Guillotine in the first round against unranked opponent. Perfect technical submission.' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Another guillotine in the first round. Three consecutive wins all by submission.' },
          { date: 'Dec 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Good', note: 'Knocked out in the first round by head kick. Brutal loss that broke a three-fight win streak.' },
        ],
        full_fight_history: [
          { date: 'Jun 2020', opponent: 'Sean Woodson', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Third UFC stint debut, comeback submission' },
          { date: 'Dec 2020', opponent: 'Nate Landwehr', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Another dramatic submission finish' },
          { date: 'May 2021', opponent: 'Seungwoo Choi', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Knocked out in the third round' },
          { date: 'Oct 2021', opponent: 'Charles Jourdain', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out quickly' },
          { date: 'Feb 2022', opponent: 'Steven Peterson', result: 'W', method: 'Split Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Fight of the Night, three-round war' },
          { date: 'Sep 2022', opponent: 'Hakeem Dawodu', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Solid decision win' },
          { date: 'Dec 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Good', note: 'Knocked out by head kick' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Guillotine in the first round' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Guillotine in the first round' },
          { date: 'Apr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Devastating TKO' },
          { date: 'May 2025', opponent: 'Melquizael Costa', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Fight of the Night, both hospitalized' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Stable (with caveats)',
        momentum_trend: 'stable',
        momentum_note: 'Erosa is coming off a loss to Melquizael Costa, but before that he strung together three consecutive first-round submission wins. The pattern is clear: Erosa oscillates between exciting win streaks and devastating losses. In the UFC, his record is 9-8, which illustrates this rollercoaster. The good news is he\'s fighting at home in Seattle, and the extra motivation is real.',
      },
      fighter2: {
        nome: 'Lerryan Douglas',
        color: 'blue',
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Brutal knockout in 36 seconds on the Contender Series. Earned UFC contract.' },
          { date: 'Jan 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Average', note: 'Unified the LFA featherweight title with another knockout.' },
          { date: 'Aug 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Average', note: 'Won the LFA interim title by TKO.' },
          { date: 'May 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Second-round knockout in LFA.' },
          { date: 'Feb 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round knockout.' },
        ],
        full_fight_history: [
          { date: 'Sep 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'DWCS, 36 seconds' },
          { date: 'Jan 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Unified LFA title' },
          { date: 'Aug 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'LFA interim title' },
          { date: 'May 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'LFA' },
          { date: 'Feb 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'LFA' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'On Fire',
        momentum_trend: 'ascending',
        momentum_note: 'Douglas arrives at the UFC in the best form of his career. Five consecutive knockouts, unified LFA title, and a Contender Series contract that came with a 36-second highlight reel. The momentum is undeniable. The big question is whether the level of opposition in the LFA and Contender Series translates to the UFC octagon. None of the recent opponents were close to Erosa\'s level.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Erosa',
        media_oponentes: 2,
        media_oponentes_label: 'Average',
        aproveitamento: '9W-8L (53%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Douglas',
        media_oponentes: 1,
        media_oponentes_label: 'Poor',
        aproveitamento: '0W-0L (debutant)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'There are no common opponents between Erosa and Douglas. The two operate in completely different universes so far: Erosa is a UFC veteran with 17 fights in the organization, while Douglas comes exclusively from the LFA and Contender Series circuit. There is no direct basis for comparison.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes per Minute', valueA: 6.21, valueB: 11.67, maxVal: 14, format: 'decimal', note: 'Douglas stats based on only 1 fight (DWCS, 36 seconds)' },
        { label: 'Strike Accuracy (%)', valueA: 49, valueB: 88, maxVal: 100, format: 'percent', note: 'Minimal sample for Douglas' },
        { label: 'Strikes Absorbed/Min', valueA: 6.27, valueB: 5.00, maxVal: 8, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 49, valueB: 67, maxVal: 100, format: 'percent', note: 'Minimal sample for Douglas' },
        { label: 'Takedowns per 15 Min', valueA: 1.78, valueB: 0.00, maxVal: 5, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 44, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 62, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Submissions per 15 Min', valueA: 0.73, valueB: 0.00, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '36 years old', fighter2: '30 years old', note: 'Douglas 6 years younger' },
        { label: 'Height', fighter1: '5\'11" (1.80m)', fighter2: '5\'9" (1.75m)', note: 'Erosa 2 inches taller' },
        { label: 'Reach', fighter1: '74.5" (189cm)', fighter2: '72" (183cm)', note: 'Erosa with 2.5 inch reach advantage' },
        { label: 'Stance', fighter1: 'Southpaw', fighter2: 'Orthodox', note: 'Opposite stance matchup' },
        { label: 'Gym', fighter1: 'Xtreme Couture, Las Vegas', fighter2: 'Bloodline Combat Sports, Costa Mesa', note: null },
        { label: 'UFC Debut', fighter1: 'December 2015 (3rd stint since 2020)', fighter2: 'Debut (March 28, 2026)', note: 'Erosa with 17 UFC fights' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Standing Striking', valueA: 65, valueB: 78, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Douglas brings superior knockout power with 7 KOs in 13 wins. Erosa is more volume than power in striking.' },
        { label: 'Jiu-Jitsu & Submissions', valueA: 85, valueB: 70, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Erosa has 14 career submissions, including devastating guillotines. Douglas is a black belt but has only 3 subs.' },
        { label: 'Wrestling & Takedowns', valueA: 60, valueB: 65, labelA: 'Good', labelB: 'Good', advantage: 'even', advantage_note: 'Douglas was a national wrestling champion in Brazil. Erosa averages 1.78 TDs per 15 min in the UFC. Even area.' },
        { label: 'Cardio & Endurance', valueA: 70, valueB: 65, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Erosa has more experience in long fights and full rounds. Douglas finishes early and doesn\'t have much late sample.' },
        { label: 'Finishing Power', valueA: 72, valueB: 88, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Douglas is on a 5-KO streak. Erosa has power but absorbs too much damage in exchanges.' },
        { label: 'Durability & Chin', valueA: 50, valueB: 60, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Erosa has 7 knockout losses in his career. This is his biggest vulnerability against an explosive striker.' },
      ],
      insight: 'Erosa brings the grappling advantage, especially in submissions, with a lethal guillotine that can punish any careless clinch attempt or entry. Douglas brings superior striking power and the explosiveness of someone at their physical peak. The central question is whether Douglas can maintain distance or if Erosa drags the fight to the ground.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Erosa',
        ko_tko: { count: 12, percent: 39 },
        submission: { count: 14, percent: 45 },
        decision: { count: 5, percent: 16 },
        total_wins: 31,
      },
      fighter2: {
        nome: 'Douglas',
        ko_tko: { count: 7, percent: 54 },
        submission: { count: 3, percent: 23 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      insight: 'Two finishers, different styles. Erosa is one of the most versatile featherweights: nearly half of his wins by submission (14) and another significant portion by knockout (12). Only 16% go to decision, meaning when Erosa fights, something happens. Douglas is even more direct: 54% by KO/TKO, with six first-round finishes in his career. If this fight goes to the third round, something went wrong for both of them.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'DOUGLAS ADVANTAGE',
          color: 'green',
          title: 'The Maximum Danger Zone',
          description: 'The first round is Douglas\'s territory. Five consecutive knockouts, six R1 finishes in his career. He arrives fresh, explosive, and with the confidence of someone who hasn\'t seen the second round in his last five fights. But beware: Erosa is also dangerous early. Three R1 guillotines in his last four wins. Whoever makes the first mistake pays dearly. The most dangerous round for both sides.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EVEN',
          color: 'gold',
          title: 'The Truth Round',
          description: 'If the fight reaches the second round, the dynamics shift. Douglas has never shown how he handles real resistance after the first round at the LFA/DWCS level. Erosa, on the other hand, has been in three-round wars. Erosa\'s experience in competitive fights gains value here. If Douglas couldn\'t finish in R1, his confidence starts being tested.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'EROSA ADVANTAGE',
          color: 'red',
          title: 'The Veteran\'s Territory',
          description: 'The third round favors Erosa. The veteran has experience in long fights and knows how to impose the pace when the opponent starts to tire. Erosa\'s submissions become even more dangerous against an opponent who spent energy attempting knockouts in previous rounds. If Douglas is tired, the guillotine can appear.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Erosa Fights at Home', fighter: 'Erosa', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Erosa is from Yakima, Washington, less than 150km from Seattle. The Climate Pledge Arena will have strong local support for Juicy J. Fighting at home in the UFC always brings extra energy, and Erosa is the type of fighter who feeds off the crowd\'s energy.' },
        { icon: 'AlertTriangle', title: 'Vulnerable Chin', fighter: 'Erosa', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Seven knockout losses in his career. Against an explosive striker like Douglas, who is on five consecutive KOs, this vulnerability is the most concerning factor for Erosa. If Douglas connects clean, the knockout probability is extremely high.' },
        { icon: 'Zap', title: 'Frightening KO Power', fighter: 'Douglas', risk_level: 'POSITIVE', risk_color: 'green', description: 'Five consecutive knockouts, including the 36-second one on the Contender Series. Douglas has real power in both hands. Muay thai black belt with refined striking technique. Against an opponent who has been knocked out seven times, Douglas\'s power is a decisive factor.' },
        { icon: 'Brain', title: 'UFC Debut Nerves', fighter: 'Douglas', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Douglas has never fought in the UFC. The octagon is different: more pressure, cameras, audience, and superior opposition level. Many Contender Series prospects stumble on debut. Nerves can affect timing and decision-making.' },
        { icon: 'Shield', title: 'Lethal Guillotine', fighter: 'Erosa', risk_level: 'POSITIVE', risk_color: 'green', description: 'Erosa has one of the best guillotines at featherweight. He submitted Ricardo Ramos and Christian Rodriguez with guillotines in R1 in sequence. If Douglas tries to clinch or enters carelessly, he can fall into a deadly trap.' },
        { icon: 'Clock', title: '10-Month Layoff', fighter: 'Erosa', risk_level: 'LOW RISK', risk_color: 'yellow', description: 'Erosa hasn\'t fought since May 2025, nearly 10 months of inactivity. For a 36-year-old fighter, time off can affect reflexes and timing. Not an extreme layoff, but it\'s relevant.' },
        { icon: 'TrendingUp', title: 'Cub Swanson as Coach', fighter: 'Douglas', risk_level: 'POSITIVE', risk_color: 'green', description: 'Douglas trains with Cub Swanson at Bloodline Combat Sports, plus works boxing with Joel Diaz. Swanson is a former elite featherweight who understands exactly what works in this division. The preparation for his debut is in experienced hands.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Erosa',
        total_probability: 35,
        scenarios: [
          { name: 'The Assassin Guillotine', probability: 15, method: 'Submission R1-R2', description: 'Erosa invites the exchange, Douglas comes in aggressive, and Erosa locks in the guillotine in transition. The same pattern that worked against Ramos and Rodriguez. Douglas is a black belt, but Erosa\'s guillotine is on another level.' },
          { name: 'War of Attrition', probability: 12, method: 'Unanimous Decision', description: 'Erosa survives the first round, uses the clinch and takedowns to neutralize Douglas\'s power, and wins on points with control and activity. The veteran\'s cardio weighs in during the final rounds.' },
          { name: 'Counter-Strike Knockout', probability: 8, method: 'KO/TKO R2-R3', description: 'Douglas comes in confident, Erosa counter-strikes with southpaw precision. Erosa has 12 career KOs and knows how to counter-attack. If Douglas is reckless, he can pay the price.' },
        ],
      },
      fighter2: {
        nome: 'Douglas',
        total_probability: 62,
        scenarios: [
          { name: 'Lightning Knockout', probability: 30, method: 'KO/TKO R1', description: 'Douglas repeats the pattern of his last five fights. Enters explosive, connects a heavy combination, and finishes before the first round ends. Against an opponent with 7 knockout losses, the probability is high.' },
          { name: 'TKO by Volume', probability: 18, method: 'TKO R2', description: 'Douglas doesn\'t get the knockout in R1 but accumulates striking damage. In the second round, the volume of heavy shots leads to a referee stoppage or corner stoppage.' },
          { name: 'Unexpected Grappling', probability: 14, method: 'Submission or Ground TKO R1-R2', description: 'Douglas uses his wrestling and jiu-jitsu credentials to surprise. National wrestling champion in Brazil and jiu-jitsu black belt, he can take the fight to the ground if striking doesn\'t work.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Lerryan Douglas',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 6,
      confidence_label: 'MEDIUM',
      explanation: 'Douglas is the favorite for good reasons. The knockout power is real, the finishing streak is impressive, and he faces an opponent with proven knockout vulnerability (7 KOs suffered). Erosa absorbs 6.27 significant strikes per minute, meaning he WILL get hit, and against Douglas\'s power, every clean shot is potentially the end. Confidence isn\'t HIGH because Douglas is a UFC debutant, the home factor favors Erosa, and Juicy J\'s guillotine is a real threat. If Douglas enters carelessly chasing the knockout, he might end up choked on the ground. But the most likely scenario is Douglas connecting something big in the first rounds.',
      x_factor: {
        title: 'Erosa\'s Guillotine',
        description: 'Erosa submitted Ramos and Rodriguez with guillotines in R1 in 2024. If Douglas enters aggressive and ducks his head to close distance against the southpaw, he can fall right into a guillotine. It\'s the only realistic path for the upset.',
      },
      upset_alert: {
        title: 'The Home Veteran Has Tricks',
        description: 'Erosa has 17 UFC fights. He knows how to survive against power strikers, knows how to lock in submissions in chaotic moments, and the Seattle crowd will push him. Don\'t underestimate the experience factor against a nervous debutant.',
      },
      probabilities: {
        fighter1: { nome: 'Erosa', percent: 35 },
        fighter2: { nome: 'Douglas', percent: 62 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Erosa (+285)', reasoning: 'As an underdog at +285, Erosa offers value if you believe in the experience, the guillotine, and the home factor. The line is generous for a dangerous veteran.' },
        method: { pick: 'Douglas by KO/TKO', reasoning: '7 career KOs for Douglas, 7 career knockout losses for Erosa. The convergence is brutal.' },
        over_under: { pick: 'Under 1.5 rounds', rounds: 1.5, reasoning: 'Douglas finishes early (5 consecutive KOs). Erosa also finishes early (3 R1 guillotines). Someone is going to sleep fast.' },
        best_value: 'Under 1.5 rounds is the smartest bet. Both are first-round finishers and this style favors a quick conclusion.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Douglas\'s First 60 Seconds', icon: 'Zap', description: 'If Douglas comes with the same intensity as the Contender Series, the first 60 seconds will be the most dangerous of the entire fight. Watch if he enters with heavy combinations or respects Erosa\'s southpaw. If he enters reckless, he can fall into the guillotine. If he enters calculated, he can get the knockout.' },
        { num: 2, title: 'Erosa\'s Southpaw Distance', icon: 'Target', description: 'Erosa is a lefty, and that changes the entire striking dynamic. Douglas trained his whole life against orthodox fighters. Erosa\'s left jab and different angle can confuse Douglas in the first minutes. Watch how Douglas handles the angle change.' },
        { num: 3, title: 'Clinch and Guillotine Attempts', icon: 'Shield', description: 'Whenever there\'s a clinch or takedown attempt, watch Erosa\'s arm around the neck. His guillotine is almost instinctive. If Douglas ducks his head to enter, Erosa can catch the neck in a split second.' },
        { num: 4, title: 'Douglas\'s Body Language in R2', icon: 'Activity', description: 'If the fight reaches the second round, watch Douglas\'s body language. Has he shown he can fight beyond R1? His cardio was tested in LFA fights that went to decision, but the octagon is another level of pressure. Signs of fatigue or frustration may indicate the fight is turning.' },
        { num: 5, title: 'The Seattle Crowd Reaction', icon: 'MapPin', description: 'Erosa is the local son. The Climate Pledge Arena will be loud for Juicy J. Watch how the crowd energy affects both fighters. Erosa can feed off it and push forward with more aggression. Douglas needs to block the noise and maintain focus on the gameplan.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'VETERAN vs DEBUTANT', content: 'EROSA vs DOUGLAS\nUFC Seattle | March 28\nClimate Pledge Arena\n\n31-13 vs 13-5\nThe hometown veteran vs the LFA gunslinger.\n5 consecutive KOs from Douglas.', color: 'red' },
        { slide_number: 2, title: 'EROSA: JUICY J', content: 'Yakima, Washington (fighting at home!)\n31-13-0 career\n9-8 in the UFC\n14 submissions (deadly guillotine)\n12 KOs\n5 performance bonuses\nDangerous southpaw\nFinished 3 by guillotine R1 in 2024', color: 'red' },
        { slide_number: 3, title: 'DOUGLAS: GUNSLINGER', content: 'Paranagua, Brazil\n13-5-0 career\nUFC DEBUT\n5 consecutive KOs\nLFA featherweight champion\nBlack belt BJJ + Muay Thai\nBrazilian national wrestling champ\nKO in 36 seconds on DWCS', color: 'blue' },
        { slide_number: 4, title: 'THE KEY TO THE FIGHT', content: 'GUILLOTINE vs POWER\n\nErosa: 14 career subs\n3 R1 guillotines in 2024\n\nDouglas: 7 career KOs\n5 consecutive KOs\n6 R1 finishes\n\nIf it goes to the ground = Erosa\nIf it stays standing = Douglas', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'DOUGLAS by KO/TKO R1-R2\n\nConfidence: MEDIUM\n62% Douglas / 35% Erosa\n\nBut watch out for the guillotine.\nOne mistake from Douglas could\ncost him everything in the first round.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Erosa vs Douglas at UFC Seattle is exactly the kind of fight that ends in 2 minutes. The veteran with 7 KO losses vs the debutant with 5 consecutive KOs. Something\'s gonna explode. Thread:' },
        { num: '2/6', text: 'Erosa (31-13): 26 finishes in 31 wins. 14 submissions. 3 R1 guillotines in 2024 alone. Fighting at HOME in Seattle, 2 hours from Yakima. Southpaw. 17 UFC fights. 5 bonuses. The guy is a walking rollercoaster.' },
        { num: '3/6', text: 'Douglas (13-5): 5 consecutive KOs. LFA champion. BJJ AND muay thai black belt. National wrestling champion of Brazil. 36-second KO on the Contender Series that went viral. Trains with Cub Swanson. The hype is real.' },
        { num: '4/6', text: 'The problem for Erosa: 7 KO losses in his career. SEVEN. Against a guy who knocks out everyone in front of him. The math is cruel: if Douglas connects clean, it\'s over.' },
        { num: '5/6', text: 'But don\'t count Erosa out. That guillotine is LETHAL. Ramos and Rodriguez were choked out in R1 in 2024. If Douglas ducks his head to close distance against the southpaw, he could wake up on the ground with no air.' },
        { num: '6/6', text: 'Pick: Douglas by KO/TKO in R1-R2. Best bet: Under 1.5 rounds. Both are first-round finishers, and the style favors quick action. But Erosa at +285 has value for those who like betting on dangerous underdogs.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'A guy with 7 knockout losses versus a guy with 5 consecutive knockouts. What could go wrong? Erosa vs Douglas at UFC Seattle is the kind of fight that ends with someone sleeping.' },
        { time: '10-25s', title: 'The Fighters', text: 'Erosa is from Washington, fighting at home, has 31 wins including 14 submissions with a killer guillotine. Douglas is Brazilian, comes from LFA with a title and a viral 36-second knockout on the Contender Series. Black belt in everything: BJJ, muay thai, wrestling.' },
        { time: '25-40s', title: 'The Analysis', text: 'Douglas is favored at -350 for a reason: his power meets Erosa\'s biggest vulnerability, which is the knockout losses. But Erosa has a hidden card: the guillotine. He submitted three guys in R1 by guillotine in 2024. If Douglas enters aggressive and ducks his head, he can fall into a trap.' },
        { time: '40-55s', title: 'Prediction', text: 'Douglas by KO in the first two rounds is the most likely scenario. But this is a fight with real upset potential via submission. Under 1.5 rounds is the smartest bet on the card. Both are first-round finishers.' },
        { time: '55-65s', title: 'CTA', text: 'Who do you think wins? The veteran with the guillotine at home or the Brazilian gunslinger? Comment below and follow for more UFC Seattle analysis.' },
      ],
      tiktok: [
        { hook: 'This guy has 7 KNOCKOUT LOSSES and he\'s about to fight a guy with 5 CONSECUTIVE KNOCKOUTS.', body: 'Erosa vs Douglas at UFC Seattle. Erosa is from Washington, fighting at HOME, and has a guillotine that already choked out 3 guys in the first round in 2024. Douglas came from LFA with a title and knocked out his last opponent in 36 SECONDS. Someone is going to sleep FAST.', cta: 'Comment EROSA or DOUGLAS!' },
        { hook: '36 SECONDS. That\'s how long it took Douglas to earn his UFC contract.', body: 'Lerryan Douglas knocked out Cam Teague on the Contender Series with a cinematic punch. 5 consecutive knockouts. LFA champion. BJJ and muay thai black belt. Now he debuts in the UFC against a veteran with 17 fights in the organization who\'s fighting in his own BACKYARD in Seattle.', cta: 'Is the hype real? Comment!' },
        { hook: 'The MOST dangerous guillotine at featherweight vs the MOST explosive knockout from the LFA.', body: 'Erosa has 14 career submissions, most by guillotine. Douglas has 7 career knockouts, 5 consecutive. If Douglas enters low, Erosa catches the neck. If Erosa stands in front, Douglas turns the lights off. Whoever makes the first mistake loses.', cta: 'What\'s your pick? Comment!' },
      ],
      headlines: [
        'Erosa vs Douglas: Why This Fight Won\'t Go Past the Second Round',
        'The Seattle Veteran vs The Brazilian Gunslinger: UFC Fight Night Analysis',
        'Douglas Makes UFC Debut: 5 Consecutive KOs Against Erosa\'s Fragile Chin',
        'Erosa\'s Guillotine Could Be the Perfect Trap for Douglas at UFC Seattle',
        'Juicy J at Home: Erosa Tries to Spoil the Party for the Card\'s Most Hyped Prospect',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+285',
        fighter2_odds: '-350',
        fighter1_name: 'Julian Erosa',
        fighter2_name: 'Lerryan Douglas',
        source: 'Opening odds (March 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Knockout Vulnerability', stat_headline: 'EROSA HAS 7 KO/TKO LOSSES IN 13 CAREER LOSSES', contexto: '54% of Erosa\'s losses came by knockout. Against an explosive striker like Douglas, this record is alarming.', implicacao_aposta: 'Favors Douglas by KO/TKO as a specific method of victory.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Erosa\'s Lethal Guillotine', stat_headline: '14 CAREER SUBMISSIONS, 3 R1 GUILLOTINES IN 2024', contexto: 'Erosa submitted Ramos and Rodriguez by guillotine in the first round. It\'s a weapon that can punish any careless entry by Douglas.', implicacao_aposta: 'Gives value to Erosa by submission as a prop. The most realistic path for the upset.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Under 1.5 Rounds', stat_headline: 'DOUGLAS: 6 R1 FINISHES. EROSA: 9 R1 FINISHES', contexto: 'Both are first-round finishers. Combined, 15 of their wins came in R1. The probability of a short fight is extremely high.', implicacao_aposta: 'Under 1.5 rounds is the bet with the best statistical edge in this fight.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Brain', titulo: 'Douglas\'s UFC Debut', stat_headline: 'FIRST FIGHT IN THE OCTAGON, AGAINST A 17-FIGHT UFC VETERAN', contexto: 'Douglas has never fought in the UFC. The jump from LFA/DWCS to the octagon is significant. Many prospects fail on debut.', implicacao_aposta: 'Adds uncertainty to Douglas\'s heavy favoritism. Erosa at +285 has value because of this factor.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Home Advantage for Erosa', stat_headline: 'EROSA FROM YAKIMA, WA, FIGHTING IN SEATTLE', contexto: 'Erosa fights less than 2 hours from home. The Climate Pledge Arena will have significant local support for Juicy J.', implicacao_aposta: 'Can influence Erosa\'s energy and close decisions.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-110 (estimated)', confianca: 'alta', edge_vs_mercado: 'Two first-round finishers. 15 combined R1 wins.', raciocinio: 'Douglas finishes fights early (5 consecutive KOs, 6 R1 finishes). Erosa also finishes early (3 R1 guillotines in 2024, 9 career R1 finishes). The style of both converges toward a short, explosive fight.' },
        { tipo: 'Method', pick: 'Douglas by KO/TKO', odds: '-200 (estimated)', confianca: 'media', raciocinio: 'Douglas has 7 KOs in 13 wins. Erosa has 7 KO losses in 13 losses. The convergence is the argument. But Erosa\'s submission possibility prevents high confidence.' },
        { tipo: 'Moneyline', pick: 'Erosa (+285)', odds: '+285', confianca: 'baixa', edge_vs_mercado: 'UFC debutant, veteran at home, lethal guillotine. At +285, only needs to win ~26% of the time for value. Real estimate: 35%.', raciocinio: 'Erosa is a dangerous underdog. The guillotine, experience, home factor, and the unknown of Douglas\'s debut combine to create real value at +285.' },
      ],
      armadilha: {
        titulo: 'Trap: Betting Heavy on Douglas Moneyline at -350',
        descricao: 'At -350, you need to bet 350 to win 100. This is only worth it if Douglas wins in 78% of scenarios or more. The real estimate is 62%, including the risk of Erosa\'s guillotine and the unknown of the UFC debut. The pure Douglas moneyline is overpriced. The best value is in Douglas by KO/TKO or Under 1.5 rounds, which pay better with similar probability.',
      },
      disclaimer: 'Statistical analysis for informational purposes. Bet responsibly.',
    },
  },
};


// ═══════════════════════════════════════════════════════
// FR - FRENCH
// ═══════════════════════════════════════════════════════
const analiseFR: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Erosa vs Douglas: Le Veteran Accueille le Pistolero',
  subtitulo: 'Juicy J defend son territoire a Seattle contre le debutant explosif du Contender Series',
  evento_data: '28 mars 2026',
  categoria_peso: 'Poids Plume (145 lbs)',
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Melquizael Costa', method: 'Decision Unanime', event: 'UFC Fight Night 256' },
      { result: 'W', opponent: 'Darren Elkins', method: 'TKO R1', event: 'UFC 314' },
      { result: 'W', opponent: 'Christian Rodriguez', method: 'Soumission R1', event: 'UFC on ESPN 59' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Cam Teague', method: 'KO R1 (36 secondes)', event: 'DWCS 81' },
      { result: 'W', opponent: 'Elijah Johns', method: 'KO', event: 'LFA' },
      { result: 'W', opponent: 'Javier Reyes', method: 'TKO', event: 'LFA' },
    ],
  },
  full_analysis: {
    hero: {
      ...analisePT.full_analysis!.hero,
      evento_data: '28 mars 2026',
      categoria_peso: 'Poids Plume (145 lbs)',
      tagline: 'Le Veteran Contre le Pistolero',
      tagline_sub: 'Juicy J combat a domicile a Seattle contre le champion LFA qui met tout le monde KO',
      fighter1: {
        ...analisePT.full_analysis!.hero.fighter1,
        ranking: 'N/R Poids Plume',
        info_extra: 'Yakima, Washington | 36 ans',
      },
      fighter2: {
        ...analisePT.full_analysis!.hero.fighter2,
        ranking: 'N/R Poids Plume',
        info_extra: 'Paranagua, Bresil | 30 ans',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Seattle Accueille le Retour de Juicy J</h3>
        <p class="mb-4">
          L'UFC se rend dans l'etat de Washington et amene l'un des fils les plus chers de la region. <strong class="text-ufc-red">Julian Erosa</strong>, de Yakima, pratiquement un voisin de Seattle, entre dans le Climate Pledge Arena avec l'energie de quelqu'un qui combat dans son jardin. Plus de 10 ans de carriere en MMA professionnel, trois passages a l'UFC, et une chose qui n'a jamais change: quand Juicy J entre dans l'octogone, quelqu'un finit a l'hopital. Lui ou son adversaire.
        </p>
        <p class="mb-4">
          Erosa est le type de combattant dont l'UFC a besoin. Il accepte n'importe quel combat, avance toujours, et a deja remporte cinq bonus de performance/combat de la soiree dans l'organisation. Le bilan de 31-13 ne ment pas: il gagne beaucoup, mais il perd aussi, souvent de maniere brutale. Sept des treize defaites ont ete par KO. Mais les 26 finitions en 31 victoires (12 KOs et 14 soumissions) disent tout sur le danger qu'il represente.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Le Pistolero Bresilien</h3>
        <p class="mb-4">
          De l'autre cote se tient <strong class="text-blue-400">Lerryan Douglas</strong>, un Bresilien de Paranagua qui a reconstruit toute sa carriere aux Etats-Unis. Il a quitte Curitiba a 15 ans pour s'entrainer, a accumule des defaites au debut, et arrive maintenant a l'UFC sur une serie de cinq KOs consecutifs. Le dernier etait au Contender Series, ou il a detruit Cam Teague en 36 secondes avec un coup de poing cinematographique devenu viral. Champion du LFA, ceinture noire de jiu-jitsu, ceinture noire de muay thai, et champion national de lutte au Bresil. Douglas est le package complet, du moins sur le papier.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Ce Que Ce Combat Signifie</h3>
        <p class="mb-4">
          Pour Erosa, c'est une question de survie dans le roster. Venant d'une defaite contre Melquizael Costa, il a besoin d'une victoire pour rester pertinent. Combattre a domicile est un bonus emotionnel enorme. Pour Douglas, c'est l'etape qui definit si le battage mediatique du Contender Series se traduit en realite dans l'octogone. L'UFC ne pardonne pas aux debutants qui ne livrent pas. Erosa est le type de veteran que l'UFC programme pour tester les nouveaux: assez dangereux pour punir les erreurs, assez accessible pour donner au prospect l'espace de briller.
        </p>
      `,
      stakes: [
        { dimensao: 'Classement', fighter1: 'N/R (top 60 FW)', fighter2: 'N/R (debutant UFC)' },
        { dimensao: 'Objectif', fighter1: 'Garder sa place, victoire a domicile', fighter2: 'Impressionner lors du debut UFC' },
        { dimensao: 'Narratif', fighter1: 'Veteran combattant dans son jardin', fighter2: 'Prospect explosif en quete de validation' },
        { dimensao: 'Risque', fighter1: 'Deux defaites en trois combats = coupure probable', fighter2: 'Defaite au debut tue le battage mediatique' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'JUICY J GACHE LA FETE',
          subtitulo: 'Erosa utilise l\'experience et le jiu-jitsu pour soumettre le debutant a domicile',
          consequencias: [
            { tag: 'ROSTER', texto: 'Erosa assure au moins 2-3 combats de plus a l\'UFC avec une victoire a domicile sur un prospect tres hyp' },
            { tag: 'NARRATIF', texto: 'Le veteran prouve que le battage du Contender Series ne remplace pas l\'experience reelle dans l\'octogone' },
            { tag: 'DOUGLAS', texto: 'Douglas retourne a des combats plus petits et doit reconstruire son elan, mais n\'est pas coupe immediatement' },
          ],
          proxima_luta: 'Erosa vs un autre veteran/prospect chez les poids plume, possiblement un top 30',
        },
        fighter2_vence: {
          titulo: 'LE GUNSLINGER EST ARRIVE',
          subtitulo: 'Douglas confirme le battage avec une autre finition devastatrice',
          consequencias: [
            { tag: 'HYPE', texto: 'Douglas s\'etablit comme l\'un des prospects les plus dangereux des poids plume et entre dans le radar de la division' },
            { tag: 'SERIE', texto: 'Six KOs consecutifs placent Douglas dans la conversation des bonus de performance' },
            { tag: 'EROSA', texto: 'Erosa passe a 9-9 a l\'UFC et fait face a une vraie coupure de l\'organisation' },
          ],
          proxima_luta: 'Douglas vs un veteran classe entre 25-40 chez les poids plume',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Julian Erosa',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Defaite dans une guerre qui a valu le bonus Combat de la Soiree. Les deux ont ete hospitalises apres le combat.' },
          { date: 'Avr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO devastateur sur un veteran en declin. Arret violent au premier round.' },
          { date: 'Juil 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Guillotine au premier round contre un adversaire non classe. Soumission technique parfaite.' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Encore une guillotine au premier round. Trois victoires consecutives toutes par soumission.' },
          { date: 'Dec 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bon', note: 'Mis KO au premier round par head kick. Defaite brutale qui a brise une serie de trois victoires.' },
        ],
        full_fight_history: [
          { date: 'Juin 2020', opponent: 'Sean Woodson', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Debut du troisieme passage UFC, soumission en comeback' },
          { date: 'Dec 2020', opponent: 'Nate Landwehr', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Encore une finition dramatique par soumission' },
          { date: 'Mai 2021', opponent: 'Seungwoo Choi', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Mis KO au troisieme round' },
          { date: 'Oct 2021', opponent: 'Charles Jourdain', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Mis KO rapidement' },
          { date: 'Fev 2022', opponent: 'Steven Peterson', result: 'W', method: 'Decision Partagee', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Combat de la Soiree, guerre de trois rounds' },
          { date: 'Sep 2022', opponent: 'Hakeem Dawodu', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire solide par decision' },
          { date: 'Dec 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bon', note: 'Mis KO par head kick' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Guillotine au premier round' },
          { date: 'Juil 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Guillotine au premier round' },
          { date: 'Avr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'TKO devastateur' },
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Combat de la Soiree, les deux hospitalises' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Stable (avec reserves)',
        momentum_trend: 'stable',
        momentum_note: 'Erosa vient d\'une defaite contre Melquizael Costa, mais avant cela il avait enchaine trois victoires consecutives par soumission au premier round. Le schema est clair: Erosa oscille entre des series de victoires excitantes et des defaites devastatrices. A l\'UFC, son bilan est de 9-8, ce qui illustre ces montagnes russes. La bonne nouvelle est qu\'il combat a domicile a Seattle, et la motivation supplementaire est reelle.',
      },
      fighter2: {
        nome: 'Lerryan Douglas',
        color: 'blue',
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'KO brutal en 36 secondes au Contender Series. A obtenu le contrat UFC.' },
          { date: 'Jan 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Moyen', note: 'A unifie le titre poids plume du LFA avec un autre KO.' },
          { date: 'Aou 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Moyen', note: 'A remporte le titre interimaire du LFA par TKO.' },
          { date: 'Mai 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'KO au deuxieme round au LFA.' },
          { date: 'Fev 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'KO au premier round.' },
        ],
        full_fight_history: [
          { date: 'Sep 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'DWCS, 36 secondes' },
          { date: 'Jan 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Titre LFA unifie' },
          { date: 'Aou 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Titre interimaire LFA' },
          { date: 'Mai 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'LFA' },
          { date: 'Fev 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'LFA' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'En Feu',
        momentum_trend: 'ascending',
        momentum_note: 'Douglas arrive a l\'UFC dans la meilleure forme de sa carriere. Cinq KOs consecutifs, titre LFA unifie, et un contrat du Contender Series obtenu avec un highlight reel de 36 secondes. L\'elan est indeniable. La grande question est de savoir si le niveau d\'opposition au LFA et au Contender Series se traduit dans l\'octogone de l\'UFC. Aucun des adversaires recents n\'etait proche du niveau d\'Erosa.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Erosa',
        media_oponentes: 2,
        media_oponentes_label: 'Moyen',
        aproveitamento: '9W-8L (53%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Douglas',
        media_oponentes: 1,
        media_oponentes_label: 'Faible',
        aproveitamento: '0W-0L (debutant)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Il n\'y a pas d\'adversaires communs entre Erosa et Douglas. Les deux evoluent dans des univers completement differents jusqu\'a present: Erosa est un veteran de l\'UFC avec 17 combats dans l\'organisation, tandis que Douglas vient exclusivement du circuit LFA et Contender Series. Il n\'y a pas de base directe de comparaison.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Frappes Sign. par Minute', valueA: 6.21, valueB: 11.67, maxVal: 14, format: 'decimal', note: 'Stats de Douglas basees sur 1 seul combat (DWCS, 36 secondes)' },
        { label: 'Precision des Frappes (%)', valueA: 49, valueB: 88, maxVal: 100, format: 'percent', note: 'Echantillon minimal pour Douglas' },
        { label: 'Frappes Encaissees/Min', valueA: 6.27, valueB: 5.00, maxVal: 8, format: 'decimal', reverseWinner: true },
        { label: 'Defense de Frappes (%)', valueA: 49, valueB: 67, maxVal: 100, format: 'percent', note: 'Echantillon minimal pour Douglas' },
        { label: 'Takedowns par 15 Min', valueA: 1.78, valueB: 0.00, maxVal: 5, format: 'decimal' },
        { label: 'Precision de Takedown (%)', valueA: 44, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Defense de Takedown (%)', valueA: 62, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Soumissions par 15 Min', valueA: 0.73, valueB: 0.00, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '36 ans', fighter2: '30 ans', note: 'Douglas 6 ans plus jeune' },
        { label: 'Taille', fighter1: '5\'11" (1,80m)', fighter2: '5\'9" (1,75m)', note: 'Erosa 2 pouces plus grand' },
        { label: 'Allonge', fighter1: '74.5" (189cm)', fighter2: '72" (183cm)', note: 'Erosa avec 2,5 pouces d\'avantage' },
        { label: 'Garde', fighter1: 'Gaucher', fighter2: 'Orthodoxe', note: 'Matchup de gardes opposees' },
        { label: 'Salle', fighter1: 'Xtreme Couture, Las Vegas', fighter2: 'Bloodline Combat Sports, Costa Mesa', note: null },
        { label: 'Debut UFC', fighter1: 'Decembre 2015 (3e passage depuis 2020)', fighter2: 'Debut (28 mars 2026)', note: 'Erosa avec 17 combats UFC' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Frappe Debout', valueA: 65, valueB: 78, labelA: 'Bon', labelB: 'Tres Bon', advantage: 'fighter2', advantage_note: 'Douglas apporte un pouvoir de KO superieur avec 7 KOs en 13 victoires. Erosa mise plus sur le volume que la puissance en frappe.' },
        { label: 'Jiu-Jitsu & Soumissions', valueA: 85, valueB: 70, labelA: 'Tres Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'Erosa a 14 soumissions en carriere, incluant des guillotines devastatrices. Douglas est ceinture noire mais n\'a que 3 soumissions.' },
        { label: 'Lutte & Takedowns', valueA: 60, valueB: 65, labelA: 'Bon', labelB: 'Bon', advantage: 'even', advantage_note: 'Douglas etait champion national de lutte au Bresil. Erosa a une moyenne de 1,78 TDs par 15 min a l\'UFC. Zone equilibree.' },
        { label: 'Cardio & Endurance', valueA: 70, valueB: 65, labelA: 'Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'Erosa a plus d\'experience dans les combats longs et les rounds complets. Douglas finit tot et n\'a pas beaucoup d\'echantillon tardif.' },
        { label: 'Pouvoir de Finition', valueA: 72, valueB: 88, labelA: 'Bon', labelB: 'Tres Bon', advantage: 'fighter2', advantage_note: 'Douglas est sur une serie de 5 KOs. Erosa a de la puissance mais absorbe trop de dommages dans les echanges.' },
        { label: 'Durabilite & Menton', valueA: 50, valueB: 60, labelA: 'Moyen', labelB: 'Bon', advantage: 'fighter2', advantage_note: 'Erosa a 7 defaites par KO dans sa carriere. C\'est le plus grand point de vulnerabilite contre un frappeur explosif.' },
      ],
      insight: 'Erosa apporte l\'avantage au sol, surtout en soumissions, avec une guillotine mortelle qui peut punir toute tentative de clinch ou entree imprudente. Douglas apporte une puissance de frappe superieure et l\'explosivite de quelqu\'un a son apogee physique. La question centrale est de savoir si Douglas peut maintenir la distance ou si Erosa ramene le combat au sol.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Erosa',
        ko_tko: { count: 12, percent: 39 },
        submission: { count: 14, percent: 45 },
        decision: { count: 5, percent: 16 },
        total_wins: 31,
      },
      fighter2: {
        nome: 'Douglas',
        ko_tko: { count: 7, percent: 54 },
        submission: { count: 3, percent: 23 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      insight: 'Deux finisseurs, des styles differents. Erosa est l\'un des poids plume les plus polyvalents: pres de la moitie de ses victoires par soumission (14) et une autre part significative par KO (12). Seulement 16% vont a la decision, ce qui signifie que quand Erosa combat, quelque chose se passe. Douglas est encore plus direct: 54% par KO/TKO, avec six finitions au premier round dans sa carriere. Si ce combat va au troisieme round, quelque chose a mal tourne pour les deux.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'AVANTAGE DOUGLAS',
          color: 'green',
          title: 'La Zone de Danger Maximum',
          description: 'Le premier round est le territoire de Douglas. Cinq KOs consecutifs, six finitions au R1 dans sa carriere. Il arrive frais, explosif, et avec la confiance de quelqu\'un qui n\'a pas vu le deuxieme round dans ses cinq derniers combats. Mais attention: Erosa est aussi dangereux tot. Trois guillotines au R1 dans ses quatre dernieres victoires. Celui qui fait la premiere erreur paie cher. Le round le plus dangereux pour les deux cotes.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRE',
          color: 'gold',
          title: 'Le Round de la Verite',
          description: 'Si le combat atteint le deuxieme round, la dynamique change. Douglas n\'a jamais montre comment il gere la resistance reelle apres le premier round au niveau LFA/DWCS. Erosa, en revanche, a vecu des guerres de trois rounds. L\'experience d\'Erosa dans les combats competitifs prend de la valeur ici. Si Douglas n\'a pas pu finir au R1, sa confiance commence a etre testee.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'AVANTAGE EROSA',
          color: 'red',
          title: 'Le Territoire du Veteran',
          description: 'Le troisieme round favorise Erosa. Le veteran a l\'experience des combats longs et sait comment imposer le rythme quand l\'adversaire commence a fatiguer. Les soumissions d\'Erosa deviennent encore plus dangereuses contre un adversaire qui a depense de l\'energie en tentatives de KO dans les rounds precedents. Si Douglas est fatigue, la guillotine peut apparaitre.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Erosa Combat a Domicile', fighter: 'Erosa', risk_level: 'ENORME POSITIF', risk_color: 'green', description: 'Erosa est de Yakima, Washington, a moins de 150km de Seattle. Le Climate Pledge Arena aura un fort soutien local pour Juicy J. Combattre a domicile a l\'UFC apporte toujours de l\'energie supplementaire, et Erosa est le type de combattant qui se nourrit de l\'energie du public.' },
        { icon: 'AlertTriangle', title: 'Menton Vulnerable', fighter: 'Erosa', risk_level: 'RISQUE ELEVE', risk_color: 'red', description: 'Sept defaites par KO dans sa carriere. Contre un frappeur explosif comme Douglas, qui est sur cinq KOs consecutifs, cette vulnerabilite est le facteur le plus preoccupant pour Erosa. Si Douglas connecte proprement, la probabilite de KO est tres elevee.' },
        { icon: 'Zap', title: 'Puissance de KO Effrayante', fighter: 'Douglas', risk_level: 'POSITIF', risk_color: 'green', description: 'Cinq KOs consecutifs, incluant celui de 36 secondes au Contender Series. Douglas a une vraie puissance dans les deux mains. Ceinture noire de muay thai avec une technique de frappe raffinee. Contre un adversaire qui a ete mis KO sept fois, la puissance de Douglas est un facteur decisif.' },
        { icon: 'Brain', title: 'Debut UFC et Nervosite', fighter: 'Douglas', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'Douglas n\'a jamais combattu a l\'UFC. L\'octogone est different: plus de pression, cameras, public, et niveau d\'opposition superieur. Beaucoup de prospects du Contender Series trebuchent lors du debut. La nervosite peut affecter le timing et la prise de decision.' },
        { icon: 'Shield', title: 'Guillotine Mortelle', fighter: 'Erosa', risk_level: 'POSITIF', risk_color: 'green', description: 'Erosa a l\'une des meilleures guillotines des poids plume. Il a soumis Ricardo Ramos et Christian Rodriguez par guillotine au R1 en sequence. Si Douglas tente le clinch ou entre imprudemment, il peut tomber dans un piege mortel.' },
        { icon: 'Clock', title: 'Inactivite de 10 Mois', fighter: 'Erosa', risk_level: 'RISQUE FAIBLE', risk_color: 'yellow', description: 'Erosa n\'a pas combattu depuis mai 2025, soit pres de 10 mois d\'inactivite. Pour un combattant de 36 ans, le temps d\'arret peut affecter les reflexes et le timing. Ce n\'est pas une inactivite extreme, mais c\'est pertinent.' },
        { icon: 'TrendingUp', title: 'Cub Swanson comme Coach', fighter: 'Douglas', risk_level: 'POSITIF', risk_color: 'green', description: 'Douglas s\'entraine avec Cub Swanson a Bloodline Combat Sports, en plus de travailler la boxe avec Joel Diaz. Swanson est un ancien combattant d\'elite des poids plume qui comprend exactement ce qui fonctionne dans cette division. La preparation pour le debut est entre des mains experimentees.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Erosa',
        total_probability: 35,
        scenarios: [
          { name: 'La Guillotine Assassine', probability: 15, method: 'Soumission R1-R2', description: 'Erosa invite l\'echange, Douglas entre agressif, et Erosa verrouille la guillotine en transition. Le meme schema qui a fonctionne contre Ramos et Rodriguez. Douglas est ceinture noire, mais la guillotine d\'Erosa est d\'un autre niveau.' },
          { name: 'Guerre d\'Usure', probability: 12, method: 'Decision Unanime', description: 'Erosa survit au premier round, utilise le clinch et les takedowns pour neutraliser la puissance de Douglas, et gagne aux points avec controle et activite. Le cardio du veteran pese dans les derniers rounds.' },
          { name: 'KO en Contre-Attaque', probability: 8, method: 'KO/TKO R2-R3', description: 'Douglas entre confiant, Erosa contre-attaque avec precision de gaucher. Erosa a 12 KOs en carriere et sait comment contre-attaquer. Si Douglas est imprudent, il peut en payer le prix.' },
        ],
      },
      fighter2: {
        nome: 'Douglas',
        total_probability: 62,
        scenarios: [
          { name: 'KO Eclair', probability: 30, method: 'KO/TKO R1', description: 'Douglas repete le schema de ses cinq derniers combats. Entre explosif, connecte une combinaison lourde, et termine avant la fin du premier round. Contre un adversaire avec 7 defaites par KO, la probabilite est elevee.' },
          { name: 'TKO par Volume', probability: 18, method: 'TKO R2', description: 'Douglas n\'obtient pas le KO au R1 mais accumule les dommages en frappe. Au deuxieme round, le volume de coups lourds mene a un arret de l\'arbitre ou un abandon du coin.' },
          { name: 'Grappling Inattendu', probability: 14, method: 'Soumission ou TKO au sol R1-R2', description: 'Douglas utilise ses credentials de lutte et jiu-jitsu pour surprendre. Champion national de lutte au Bresil et ceinture noire de jiu-jitsu, il peut amener le combat au sol si la frappe ne fonctionne pas.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Lerryan Douglas',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 6,
      confidence_label: 'MOYENNE',
      explanation: 'Douglas est le favori pour de bonnes raisons. La puissance de KO est reelle, la serie de finitions est impressionnante, et il affronte un adversaire avec une vulnerabilite prouvee au KO (7 KOs subis). Erosa absorbe 6,27 frappes significatives par minute, ce qui signifie qu\'il SERA touche, et contre la puissance de Douglas, chaque coup propre est potentiellement la fin. La confiance n\'est pas ELEVEE parce que Douglas est un debutant UFC, le facteur domicile favorise Erosa, et la guillotine de Juicy J est une menace reelle. Si Douglas entre imprudemment en cherchant le KO, il pourrait finir etrangle au sol. Mais le scenario le plus probable est Douglas qui connecte quelque chose de gros dans les premiers rounds.',
      x_factor: {
        title: 'La Guillotine d\'Erosa',
        description: 'Erosa a soumis Ramos et Rodriguez par guillotine au R1 en 2024. Si Douglas entre agressif et baisse la tete pour fermer la distance contre le gaucher, il peut tomber directement dans une guillotine. C\'est le seul chemin realiste pour le coup d\'eclat.',
      },
      upset_alert: {
        title: 'Le Veteran a Domicile a des Tours',
        description: 'Erosa a 17 combats UFC. Il sait comment survivre contre les power strikers, sait comment verrouiller des soumissions dans les moments chaotiques, et le public de Seattle va pousser. Ne sous-estimez pas le facteur experience contre un debutant nerveux.',
      },
      probabilities: {
        fighter1: { nome: 'Erosa', percent: 35 },
        fighter2: { nome: 'Douglas', percent: 62 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Erosa (+285)', reasoning: 'En tant qu\'outsider a +285, Erosa offre de la valeur si vous croyez en l\'experience, la guillotine et le facteur domicile. La ligne est genereuse pour un veteran dangereux.' },
        method: { pick: 'Douglas par KO/TKO', reasoning: '7 KOs en carriere pour Douglas, 7 defaites par KO en carriere pour Erosa. La convergence est brutale.' },
        over_under: { pick: 'Moins de 1,5 rounds', rounds: 1.5, reasoning: 'Douglas finit tot (5 KOs consecutifs). Erosa aussi finit tot (3 guillotines au R1). Quelqu\'un va dormir vite.' },
        best_value: 'Moins de 1,5 rounds est le pari le plus intelligent. Les deux sont des finisseurs de premier round et ce style favorise une conclusion rapide.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Les 60 Premieres Secondes de Douglas', icon: 'Zap', description: 'Si Douglas arrive avec la meme intensite que le Contender Series, les 60 premieres secondes seront les plus dangereuses du combat entier. Observez s\'il entre avec des combinaisons lourdes ou s\'il respecte le gaucher d\'Erosa. S\'il entre imprudemment, il peut tomber dans la guillotine. S\'il entre calcule, il peut obtenir le KO.' },
        { num: 2, title: 'La Distance du Gaucher d\'Erosa', icon: 'Target', description: 'Erosa est gaucher, et cela change toute la dynamique de la frappe. Douglas s\'est entraine toute sa vie contre des orthodoxes. Le jab gauche d\'Erosa et l\'angle different peuvent confondre Douglas dans les premieres minutes. Observez comment Douglas gere le changement d\'angle.' },
        { num: 3, title: 'Tentatives de Clinch et Guillotine', icon: 'Shield', description: 'A chaque clinch ou tentative de takedown, observez le bras d\'Erosa autour du cou. Sa guillotine est presque instinctive. Si Douglas baisse la tete pour entrer, Erosa peut attraper le cou en une fraction de seconde.' },
        { num: 4, title: 'Le Langage Corporel de Douglas au R2', icon: 'Activity', description: 'Si le combat atteint le deuxieme round, observez le langage corporel de Douglas. A-t-il montre qu\'il peut combattre au-dela du R1? Son cardio a ete teste dans des combats LFA qui sont alles a la decision, mais l\'octogone est un autre niveau de pression. Des signes de fatigue ou de frustration peuvent indiquer que le combat tourne.' },
        { num: 5, title: 'La Reaction du Public de Seattle', icon: 'MapPin', description: 'Erosa est le fils local. Le Climate Pledge Arena sera bruyant pour Juicy J. Observez comment l\'energie du public affecte les deux combattants. Erosa peut s\'en nourrir et avancer avec plus d\'agressivite. Douglas doit bloquer le bruit et garder le focus sur le gameplan.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'VETERAN vs DEBUTANT', content: 'EROSA vs DOUGLAS\nUFC Seattle | 28 mars\nClimate Pledge Arena\n\n31-13 vs 13-5\nLe veteran local contre le pistolero du LFA.\n5 KOs consecutifs de Douglas.', color: 'red' },
        { slide_number: 2, title: 'EROSA: JUICY J', content: 'Yakima, Washington (combat a domicile!)\n31-13-0 en carriere\n9-8 a l\'UFC\n14 soumissions (guillotine mortelle)\n12 KOs\n5 bonus de performance\nGaucher dangereux\nA fini 3 par guillotine R1 en 2024', color: 'red' },
        { slide_number: 3, title: 'DOUGLAS: GUNSLINGER', content: 'Paranagua, Bresil\n13-5-0 en carriere\nDEBUT a l\'UFC\n5 KOs consecutifs\nChampion poids plume LFA\nCeinture noire BJJ + Muay Thai\nChampion national de lutte Bresil\nKO en 36 secondes au DWCS', color: 'blue' },
        { slide_number: 4, title: 'LA CLE DU COMBAT', content: 'GUILLOTINE vs PUISSANCE\n\nErosa: 14 soumissions en carriere\n3 guillotines R1 en 2024\n\nDouglas: 7 KOs en carriere\n5 KOs consecutifs\n6 finitions au R1\n\nAu sol = Erosa\nDebout = Douglas', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'DOUGLAS par KO/TKO R1-R2\n\nConfiance: MOYENNE\n62% Douglas / 35% Erosa\n\nMais attention a la guillotine.\nUne erreur de Douglas pourrait\nlui couter tout au premier round.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Erosa vs Douglas a l\'UFC Seattle est exactement le genre de combat qui se termine en 2 minutes. Le veteran avec 7 defaites par KO contre le debutant avec 5 KOs consecutifs. Ca va exploser. Thread:' },
        { num: '2/6', text: 'Erosa (31-13): 26 finitions en 31 victoires. 14 soumissions. 3 guillotines au R1 rien qu\'en 2024. Combat a DOMICILE a Seattle, a 2h de Yakima. Gaucher. 17 combats UFC. 5 bonus. Le gars est des montagnes russes ambulantes.' },
        { num: '3/6', text: 'Douglas (13-5): 5 KOs consecutifs. Champion du LFA. Ceinture noire de BJJ ET muay thai. Champion national de lutte du Bresil. KO de 36 secondes au Contender Series devenu viral. S\'entraine avec Cub Swanson. Le hype est reel.' },
        { num: '4/6', text: 'Le probleme pour Erosa: 7 defaites par KO en carriere. SEPT. Contre un gars qui met KO tout le monde en face de lui. Les maths sont cruelles: si Douglas connecte proprement, c\'est fini.' },
        { num: '5/6', text: 'Mais n\'ecartez pas Erosa. Cette guillotine est MORTELLE. Ramos et Rodriguez ont ete etrangles au R1 en 2024. Si Douglas baisse la tete pour fermer la distance contre le gaucher, il pourrait se reveiller au sol sans air.' },
        { num: '6/6', text: 'Pick: Douglas par KO/TKO au R1-R2. Meilleur pari: Moins de 1,5 rounds. Les deux sont des finisseurs de premier round et le style favorise l\'action rapide. Mais Erosa a +285 a de la valeur pour ceux qui aiment parier sur des outsiders dangereux.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Un gars avec 7 defaites par KO contre un gars avec 5 KOs consecutifs. Qu\'est-ce qui pourrait mal tourner? Erosa vs Douglas a l\'UFC Seattle est le genre de combat qui finit avec quelqu\'un qui dort.' },
        { time: '10-25s', title: 'Les Combattants', text: 'Erosa est de Washington, combat a domicile, a 31 victoires dont 14 soumissions avec une guillotine tueuse. Douglas est bresilien, vient du LFA avec un titre et un KO viral de 36 secondes au Contender Series. Ceinture noire de tout: BJJ, muay thai, lutte.' },
        { time: '25-40s', title: 'L\'Analyse', text: 'Douglas est favori a -350 pour une raison: sa puissance rencontre la plus grande vulnerabilite d\'Erosa, les KOs subis. Mais Erosa a une carte cachee: la guillotine. Il a soumis trois gars au R1 par guillotine en 2024. Si Douglas entre agressif et baisse la tete, il peut tomber dans un piege.' },
        { time: '40-55s', title: 'Prediction', text: 'Douglas par KO dans les deux premiers rounds est le scenario le plus probable. Mais c\'est un combat avec un vrai potentiel de surprise par soumission. Moins de 1,5 rounds est le pari le plus intelligent du card. Les deux sont des finisseurs de premier round.' },
        { time: '55-65s', title: 'CTA', text: 'Qui gagne selon vous? Le veteran avec la guillotine a domicile ou le pistolero bresilien? Commentez ci-dessous et suivez pour plus d\'analyses UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'Ce gars a 7 DEFAITES par KO et il va affronter un gars avec 5 KOs CONSECUTIFS.', body: 'Erosa contre Douglas a l\'UFC Seattle. Erosa est de Washington, combat a DOMICILE, et a une guillotine qui a deja etrangle 3 gars au premier round en 2024. Douglas vient du LFA avec un titre et a mis KO son dernier adversaire en 36 SECONDES. Quelqu\'un va dormir VITE.', cta: 'Commentez EROSA ou DOUGLAS!' },
        { hook: '36 SECONDES. C\'est le temps qu\'il a fallu a Douglas pour obtenir son contrat UFC.', body: 'Lerryan Douglas a mis KO Cam Teague au Contender Series avec un coup de poing cinematographique. 5 KOs consecutifs. Champion du LFA. Ceinture noire de BJJ et muay thai. Maintenant il debute a l\'UFC contre un veteran avec 17 combats dans l\'organisation qui combat dans son propre JARDIN a Seattle.', cta: 'Le hype est-il reel? Commentez!' },
        { hook: 'La guillotine LA PLUS dangereuse des poids plume contre le KO LE PLUS explosif du LFA.', body: 'Erosa a 14 soumissions en carriere, la plupart par guillotine. Douglas a 7 KOs en carriere, 5 consecutifs. Si Douglas entre bas, Erosa attrape le cou. Si Erosa reste devant, Douglas eteint la lumiere. Celui qui fait la premiere erreur perd.', cta: 'Quel est votre pick? Commentez!' },
      ],
      headlines: [
        'Erosa vs Douglas: Pourquoi Ce Combat Ne Passera Pas le Deuxieme Round',
        'Le Veteran de Seattle Contre le Pistolero Bresilien: Analyse UFC Fight Night',
        'Douglas Fait ses Debuts UFC: 5 KOs Consecutifs Contre le Menton Fragile d\'Erosa',
        'La Guillotine d\'Erosa Pourrait Etre le Piege Parfait pour Douglas a l\'UFC Seattle',
        'Juicy J a Domicile: Erosa Tente de Gacher la Fete du Prospect le Plus Hyp du Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+285',
        fighter2_odds: '-350',
        fighter1_name: 'Julian Erosa',
        fighter2_name: 'Lerryan Douglas',
        source: 'Cotes d\'ouverture (mars 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Vulnerabilite au KO', stat_headline: 'EROSA A 7 DEFAITES PAR KO/TKO EN 13 DEFAITES EN CARRIERE', contexto: '54% des defaites d\'Erosa sont venues par KO. Contre un frappeur explosif comme Douglas, cet historique est alarmant.', implicacao_aposta: 'Favorise Douglas par KO/TKO comme methode de victoire specifique.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Guillotine Mortelle d\'Erosa', stat_headline: '14 SOUMISSIONS EN CARRIERE, 3 GUILLOTINES AU R1 EN 2024', contexto: 'Erosa a soumis Ramos et Rodriguez par guillotine au premier round. C\'est une arme qui peut punir toute entree imprudente de Douglas.', implicacao_aposta: 'Donne de la valeur a Erosa par soumission comme prop. Le chemin le plus realiste pour la surprise.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Moins de 1,5 Rounds', stat_headline: 'DOUGLAS: 6 FINITIONS AU R1. EROSA: 9 FINITIONS AU R1', contexto: 'Les deux sont des finisseurs de premier round. Combines, 15 de leurs victoires sont venues au R1. La probabilite d\'un combat court est extremement elevee.', implicacao_aposta: 'Moins de 1,5 rounds est le pari avec le meilleur edge statistique dans ce combat.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Brain', titulo: 'Debut UFC de Douglas', stat_headline: 'PREMIER COMBAT DANS L\'OCTOGONE, CONTRE UN VETERAN DE 17 COMBATS UFC', contexto: 'Douglas n\'a jamais combattu a l\'UFC. Le saut du LFA/DWCS a l\'octogone est significatif. Beaucoup de prospects echouent au debut.', implicacao_aposta: 'Ajoute de l\'incertitude au favoritisme prononce de Douglas. Erosa a +285 a de la valeur grace a ce facteur.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Avantage Domicile pour Erosa', stat_headline: 'EROSA DE YAKIMA, WA, COMBAT A SEATTLE', contexto: 'Erosa combat a moins de 2 heures de chez lui. Le Climate Pledge Arena aura un soutien local significatif pour Juicy J.', implicacao_aposta: 'Peut influencer l\'energie d\'Erosa et les decisions serrees.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Moins de 1,5 Rounds', odds: '-110 (estime)', confianca: 'alta', edge_vs_mercado: 'Deux finisseurs de premier round. 15 victoires combinees au R1.', raciocinio: 'Douglas finit les combats tot (5 KOs consecutifs, 6 finitions au R1). Erosa aussi finit tot (3 guillotines au R1 en 2024, 9 finitions au R1 en carriere). Le style des deux converge vers un combat court et explosif.' },
        { tipo: 'Methode', pick: 'Douglas par KO/TKO', odds: '-200 (estime)', confianca: 'media', raciocinio: 'Douglas a 7 KOs en 13 victoires. Erosa a 7 defaites par KO en 13 defaites. La convergence est l\'argument. Mais la possibilite de soumission d\'Erosa empeche une confiance elevee.' },
        { tipo: 'Moneyline', pick: 'Erosa (+285)', odds: '+285', confianca: 'baixa', edge_vs_mercado: 'Debutant UFC, veteran a domicile, guillotine mortelle. A +285, doit gagner seulement ~26% du temps pour avoir de la valeur. Estimation reelle: 35%.', raciocinio: 'Erosa est un outsider dangereux. La guillotine, l\'experience, le facteur domicile et l\'inconnue du debut de Douglas se combinent pour creer une vraie valeur a +285.' },
      ],
      armadilha: {
        titulo: 'Piege: Miser Lourd sur Douglas Moneyline a -350',
        descricao: 'A -350, vous devez miser 350 pour gagner 100. Cela ne vaut que si Douglas gagne dans 78% des scenarios ou plus. L\'estimation reelle est de 62%, incluant le risque de la guillotine d\'Erosa et l\'inconnue du debut UFC. La moneyline pure de Douglas est surpayee. La meilleure valeur est dans Douglas par KO/TKO ou le Moins de 1,5 rounds, qui paient mieux avec une probabilite similaire.',
      },
      disclaimer: 'Analyse statistique a titre informatif. Pariez responsablement.',
    },
  },
};


// ═══════════════════════════════════════════════════════
// ES - SPANISH
// ═══════════════════════════════════════════════════════
const analiseES: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Erosa vs Douglas: El Veterano Recibe al Pistolero',
  subtitulo: 'Juicy J defiende su territorio en Seattle contra el debutante explosivo del Contender Series',
  evento_data: '28 de marzo, 2026',
  categoria_peso: 'Peso Pluma (145 lbs)',
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Melquizael Costa', method: 'Decision Unanime', event: 'UFC Fight Night 256' },
      { result: 'W', opponent: 'Darren Elkins', method: 'TKO R1', event: 'UFC 314' },
      { result: 'W', opponent: 'Christian Rodriguez', method: 'Sumision R1', event: 'UFC on ESPN 59' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Cam Teague', method: 'KO R1 (36 segundos)', event: 'DWCS 81' },
      { result: 'W', opponent: 'Elijah Johns', method: 'KO', event: 'LFA' },
      { result: 'W', opponent: 'Javier Reyes', method: 'TKO', event: 'LFA' },
    ],
  },
  full_analysis: {
    hero: {
      ...analisePT.full_analysis!.hero,
      evento_data: '28 de marzo, 2026',
      categoria_peso: 'Peso Pluma (145 lbs)',
      tagline: 'El Veterano Contra el Pistolero',
      tagline_sub: 'Juicy J pelea en casa en Seattle contra el campeon del LFA que noquea a todos',
      fighter1: {
        ...analisePT.full_analysis!.hero.fighter1,
        ranking: 'N/R Peso Pluma',
        info_extra: 'Yakima, Washington | 36 anos',
      },
      fighter2: {
        ...analisePT.full_analysis!.hero.fighter2,
        ranking: 'N/R Peso Pluma',
        info_extra: 'Paranagua, Brasil | 30 anos',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Seattle Recibe de Vuelta a Juicy J</h3>
        <p class="mb-4">
          El UFC va al estado de Washington y trae consigo a uno de los hijos mas queridos de la region. <strong class="text-ufc-red">Julian Erosa</strong>, de Yakima, practicamente un vecino de Seattle, entra al Climate Pledge Arena con la energia de quien pelea en su propio patio. Mas de 10 anos de carrera en MMA profesional, tres pasos por el UFC, y una cosa que nunca cambio: cuando Juicy J entra al octagono, alguien termina en el hospital. El o su oponente.
        </p>
        <p class="mb-4">
          Erosa es el tipo de peleador que el UFC necesita. Acepta cualquier pelea, va hacia adelante, y ya gano cinco bonos de rendimiento/pelea de la noche en la organizacion. El record de 31-13 no miente: gana mucho, pero tambien pierde, y muchas veces de forma brutal. Siete de las trece derrotas fueron por nocaut. Pero las 26 finalizaciones en 31 victorias (12 KOs y 14 sumisiones) dicen todo sobre el peligro que representa.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">El Pistolero Brasileno</h3>
        <p class="mb-4">
          Del otro lado esta <strong class="text-blue-400">Lerryan Douglas</strong>, un brasileno de Paranagua que reconstruyo toda su carrera en Estados Unidos. Se fue de Curitiba a los 15 anos para entrenar, acumulo derrotas al principio, y ahora llega al UFC en una racha de cinco nocauts consecutivos. El ultimo fue en el Contender Series, donde destruyo a Cam Teague en 36 segundos con un golpe de pelicula que se hizo viral. Campeon del LFA, cinturon negro de jiu-jitsu, cinturon negro de muay thai, y campeon nacional de lucha en Brasil. Douglas es el paquete completo, al menos en el papel.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Lo Que Significa Esta Pelea</h3>
        <p class="mb-4">
          Para Erosa, es una cuestion de supervivencia en el roster. Viniendo de una derrota contra Melquizael Costa, necesita una victoria para mantenerse relevante. Pelear en casa es un bonus emocional enorme. Para Douglas, es el paso que define si el hype del Contender Series se traduce en realidad en el octagono. El UFC no perdona a debutantes que no cumplen. Erosa es el tipo de veterano que el UFC programa para probar novatos: lo suficientemente peligroso para castigar errores, lo suficientemente accesible para darle espacio al prospecto de brillar.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'N/R (top 60 FW)', fighter2: 'N/R (debutante UFC)' },
        { dimensao: 'Objetivo', fighter1: 'Mantener puesto en el roster, victoria en casa', fighter2: 'Impresionar en el debut UFC' },
        { dimensao: 'Narrativa', fighter1: 'Veterano peleando en su patio', fighter2: 'Prospecto explosivo buscando validacion' },
        { dimensao: 'Riesgo', fighter1: 'Dos derrotas en tres peleas = corte probable', fighter2: 'Derrota en el debut enfria el hype completamente' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'JUICY J ARRUINA LA FIESTA',
          subtitulo: 'Erosa usa la experiencia y el jiu-jitsu para someter al debutante en casa',
          consequencias: [
            { tag: 'ROSTER', texto: 'Erosa asegura al menos 2-3 peleas mas en el UFC con victoria en casa sobre prospecto muy hypado' },
            { tag: 'NARRATIVA', texto: 'El veterano demuestra que el hype del Contender Series no reemplaza la experiencia real en el octagono' },
            { tag: 'DOUGLAS', texto: 'Douglas vuelve a peleas menores y necesita reconstruir momentum, pero no es cortado inmediatamente' },
          ],
          proxima_luta: 'Erosa vs otro veterano/prospecto en peso pluma, posiblemente un top 30',
        },
        fighter2_vence: {
          titulo: 'EL GUNSLINGER LLEGO',
          subtitulo: 'Douglas confirma el hype con otra finalizacion devastadora',
          consequencias: [
            { tag: 'HYPE', texto: 'Douglas se establece como uno de los prospectos mas peligrosos del peso pluma y entra en el radar de la division' },
            { tag: 'RACHA', texto: 'Seis nocauts consecutivos ponen a Douglas en la conversacion de bonos de rendimiento' },
            { tag: 'EROSA', texto: 'Erosa queda con 9-9 en el UFC y enfrenta un corte real de la organizacion' },
          ],
          proxima_luta: 'Douglas vs un veterano ranqueado entre 25-40 en peso pluma',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Julian Erosa',
        color: 'red',
        recent_fights: [
          { date: 'May 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota en guerra que gano el bono de Pelea de la Noche. Ambos fueron hospitalizados despues de la pelea.' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaut devastador sobre veterano en declive. Parada violenta en el primer round.' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1 (guillotina)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Guillotina en el primer round contra oponente sin ranking. Sumision tecnica perfecta.' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1 (guillotina)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Otra guillotina en el primer round. Tres victorias consecutivas todas por sumision.' },
          { date: 'Dic 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bueno', note: 'Noqueado en el primer round por head kick. Derrota brutal que rompio racha de tres victorias.' },
        ],
        full_fight_history: [
          { date: 'Jun 2020', opponent: 'Sean Woodson', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut del tercer paso por UFC, comeback por sumision' },
          { date: 'Dic 2020', opponent: 'Nate Landwehr', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Otra finalizacion dramatica' },
          { date: 'May 2021', opponent: 'Seungwoo Choi', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Noqueado en el tercer round' },
          { date: 'Oct 2021', opponent: 'Charles Jourdain', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado rapidamente' },
          { date: 'Feb 2022', opponent: 'Steven Peterson', result: 'W', method: 'Decision Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Pelea de la Noche, guerra de tres rounds' },
          { date: 'Sep 2022', opponent: 'Hakeem Dawodu', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Victoria solida por decision' },
          { date: 'Dic 2022', opponent: 'Alex Caceres', result: 'L', method: 'KO R1', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bueno', note: 'Noqueado por head kick' },
          { date: 'Mar 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Guillotina en el primer round' },
          { date: 'Jul 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Guillotina en el primer round' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO devastador' },
          { date: 'May 2025', opponent: 'Melquizael Costa', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Pelea de la Noche, ambos hospitalizados' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estable (con reservas)',
        momentum_trend: 'stable',
        momentum_note: 'Erosa viene de derrota contra Melquizael Costa, pero antes de eso empalmo tres victorias consecutivas por sumision en el primer round. El patron es claro: Erosa oscila entre rachas de victorias emocionantes y derrotas devastadoras. En el UFC, su record es 9-8, lo que ilustra esta montana rusa. La buena noticia es que pelea en casa, en Seattle, y la motivacion extra es real.',
      },
      fighter2: {
        nome: 'Lerryan Douglas',
        color: 'blue',
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Nocaut brutal en 36 segundos en el Contender Series. Gano contrato del UFC.' },
          { date: 'Ene 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Medio', note: 'Unifico el titulo peso pluma del LFA con otro nocaut.' },
          { date: 'Ago 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R (LFA)', quality_score: 2, quality_label: 'Medio', note: 'Conquisto el titulo interino del LFA por TKO.' },
          { date: 'May 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Nocaut en el segundo round en LFA.' },
          { date: 'Feb 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Nocaut en el primer round.' },
        ],
        full_fight_history: [
          { date: 'Sep 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'DWCS, 36 segundos' },
          { date: 'Ene 2025', opponent: 'Elijah Johns', result: 'W', method: 'KO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Titulo LFA unificado' },
          { date: 'Ago 2024', opponent: 'Javier Reyes', result: 'W', method: 'TKO', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Titulo interino LFA' },
          { date: 'May 2024', opponent: 'Kody Steele', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'LFA' },
          { date: 'Feb 2024', opponent: 'Blake Bilder', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'LFA' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'En Racha',
        momentum_trend: 'ascending',
        momentum_note: 'Douglas llega al UFC en la mejor fase de su carrera. Cinco nocauts consecutivos, titulo del LFA unificado, y un contrato del Contender Series que vino con un highlight reel de 36 segundos. El momentum es innegable. La gran pregunta es si el nivel de oposicion en el LFA y Contender Series se traduce al octagono del UFC. Ninguno de los oponentes recientes estaba cerca del nivel de Erosa.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Erosa',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '9W-8L (53%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Douglas',
        media_oponentes: 1,
        media_oponentes_label: 'Malo',
        aproveitamento: '0W-0L (debutante)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'No existen oponentes en comun entre Erosa y Douglas. Los dos operan en universos completamente diferentes hasta ahora: Erosa es veterano del UFC con 17 peleas en la organizacion, mientras Douglas viene exclusivamente del circuito LFA y Contender Series. No hay base directa de comparacion.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Golpes Sign. por Minuto', valueA: 6.21, valueB: 11.67, maxVal: 14, format: 'decimal', note: 'Stats de Douglas basadas en solo 1 pelea (DWCS, 36 segundos)' },
        { label: 'Precision de Golpes (%)', valueA: 49, valueB: 88, maxVal: 100, format: 'percent', note: 'Muestra minima para Douglas' },
        { label: 'Golpes Absorbidos/Min', valueA: 6.27, valueB: 5.00, maxVal: 8, format: 'decimal', reverseWinner: true },
        { label: 'Defensa de Golpes (%)', valueA: 49, valueB: 67, maxVal: 100, format: 'percent', note: 'Muestra minima para Douglas' },
        { label: 'Takedowns por 15 Min', valueA: 1.78, valueB: 0.00, maxVal: 5, format: 'decimal' },
        { label: 'Precision de Takedown (%)', valueA: 44, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Defensa de Takedown (%)', valueA: 62, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Sumisiones por 15 Min', valueA: 0.73, valueB: 0.00, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Edad', fighter1: '36 anos', fighter2: '30 anos', note: 'Douglas 6 anos mas joven' },
        { label: 'Altura', fighter1: '5\'11" (1,80m)', fighter2: '5\'9" (1,75m)', note: 'Erosa 2 pulgadas mas alto' },
        { label: 'Envergadura', fighter1: '74.5" (189cm)', fighter2: '72" (183cm)', note: 'Erosa con 2,5 pulgadas de ventaja' },
        { label: 'Guardia', fighter1: 'Zurdo', fighter2: 'Ortodoxo', note: 'Matchup de guardias opuestas' },
        { label: 'Gimnasio', fighter1: 'Xtreme Couture, Las Vegas', fighter2: 'Bloodline Combat Sports, Costa Mesa', note: null },
        { label: 'Debut UFC', fighter1: 'Diciembre 2015 (3er paso desde 2020)', fighter2: 'Debut (28 de marzo, 2026)', note: 'Erosa con 17 peleas en UFC' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking de Pie', valueA: 65, valueB: 78, labelA: 'Bueno', labelB: 'Muy Bueno', advantage: 'fighter2', advantage_note: 'Douglas trae poder de nocaut superior con 7 KOs en 13 victorias. Erosa es mas volumen que poder en el striking.' },
        { label: 'Jiu-Jitsu y Sumisiones', valueA: 85, valueB: 70, labelA: 'Muy Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'Erosa tiene 14 sumisiones en su carrera, incluyendo guillotinas devastadoras. Douglas es cinturon negro pero solo tiene 3 subs.' },
        { label: 'Wrestling y Takedowns', valueA: 60, valueB: 65, labelA: 'Bueno', labelB: 'Bueno', advantage: 'even', advantage_note: 'Douglas fue campeon nacional de lucha en Brasil. Erosa tiene media de 1,78 TDs por 15 min en UFC. Area equilibrada.' },
        { label: 'Cardio y Resistencia', valueA: 70, valueB: 65, labelA: 'Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'Erosa tiene mas experiencia en peleas largas y rounds completos. Douglas finaliza temprano y no tiene mucha muestra tardia.' },
        { label: 'Poder de Finalizacion', valueA: 72, valueB: 88, labelA: 'Bueno', labelB: 'Muy Bueno', advantage: 'fighter2', advantage_note: 'Douglas viene de 5 KOs consecutivos. Erosa tiene poder, pero absorbe mucho dano en el intercambio.' },
        { label: 'Durabilidad y Menton', valueA: 50, valueB: 60, labelA: 'Medio', labelB: 'Bueno', advantage: 'fighter2', advantage_note: 'Erosa tiene 7 derrotas por nocaut en su carrera. Es el mayor punto de vulnerabilidad contra un striker explosivo.' },
      ],
      insight: 'Erosa trae la ventaja en el grappling, especialmente en sumisiones, con una guillotina letal que puede castigar cualquier intento de clinch o entrada descuidada. Douglas trae poder superior en el striking y la explosividad de quien esta en su pico fisico. La pregunta central es si Douglas logra mantener la distancia o si Erosa arrastra la pelea al suelo.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Erosa',
        ko_tko: { count: 12, percent: 39 },
        submission: { count: 14, percent: 45 },
        decision: { count: 5, percent: 16 },
        total_wins: 31,
      },
      fighter2: {
        nome: 'Douglas',
        ko_tko: { count: 7, percent: 54 },
        submission: { count: 3, percent: 23 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      insight: 'Dos finalizadores, estilos diferentes. Erosa es uno de los peleadores mas versatiles del peso pluma: casi la mitad de las victorias por sumision (14) y otra porcion significativa por nocaut (12). Solo 16% van a decision, lo que significa que cuando Erosa pelea, algo pasa. Douglas es aun mas directo: 54% por KO/TKO, con seis finalizaciones en el primer round en su carrera. Si esta pelea llega al tercer round, algo salio mal para los dos.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VENTAJA DOUGLAS',
          color: 'green',
          title: 'La Zona de Peligro Maximo',
          description: 'El primer round es el territorio de Douglas. Cinco nocauts consecutivos, seis finalizaciones en el R1 en su carrera. Llega fresco, explosivo, y con la confianza de quien no ha visto el segundo round en sus ultimas cinco peleas. Pero cuidado: Erosa tambien es peligroso temprano. Tres guillotinas en el R1 en sus ultimas cuatro victorias. Quien se equivoque primero, paga caro. El round mas peligroso para ambos lados.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'El Round de la Verdad',
          description: 'Si la pelea llega al segundo round, la dinamica cambia. Douglas nunca ha mostrado como maneja la resistencia real despues del primer round a nivel LFA/DWCS. Erosa, por otro lado, ya estuvo en guerras de tres rounds. La experiencia de Erosa en peleas competitivas gana valor aqui. Si Douglas no pudo finalizar en el R1, la confianza empieza a ser probada.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VENTAJA EROSA',
          color: 'red',
          title: 'Territorio del Veterano',
          description: 'El tercer round favorece a Erosa. El veterano tiene experiencia en peleas largas y sabe como imponer el ritmo cuando el adversario empieza a cansarse. Las sumisiones de Erosa se vuelven aun mas peligrosas contra un oponente que gasto energia intentando nocauts en los rounds anteriores. Si Douglas esta cansado, la guillotina puede aparecer.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Erosa Pelea en Casa', fighter: 'Erosa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Erosa es de Yakima, Washington, a menos de 150km de Seattle. El Climate Pledge Arena tendra una hinchada local fuerte para Juicy J. Pelear en casa en el UFC siempre trae energia extra, y Erosa es el tipo de peleador que se alimenta de la energia del publico.' },
        { icon: 'AlertTriangle', title: 'Menton Vulnerable', fighter: 'Erosa', risk_level: 'RIESGO ALTO', risk_color: 'red', description: 'Siete derrotas por nocaut en su carrera. Contra un striker explosivo como Douglas, que viene de cinco KOs consecutivos, esta vulnerabilidad es el factor mas preocupante para Erosa. Si Douglas conecta limpio, la probabilidad de nocaut es altisima.' },
        { icon: 'Zap', title: 'Poder de Nocaut Aterrador', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Cinco nocauts consecutivos, incluyendo el de 36 segundos en el Contender Series. Douglas tiene poder real en ambas manos. Cinturon negro de muay thai con tecnica refinada de striking. Contra un oponente que ya fue noqueado siete veces, el poder de Douglas es un factor decisivo.' },
        { icon: 'Brain', title: 'Debut UFC y Nerviosismo', fighter: 'Douglas', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'Douglas nunca peleo en el UFC. El octagono es diferente: mas presion, camaras, publico, y nivel de oposicion superior. Muchos prospectos del Contender Series tropiezan en el debut. El nerviosismo puede afectar el timing y la toma de decisiones.' },
        { icon: 'Shield', title: 'Guillotina Letal', fighter: 'Erosa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Erosa tiene una de las mejores guillotinas del peso pluma. Sometio a Ricardo Ramos y Christian Rodriguez con guillotinas en el R1 en secuencia. Si Douglas intenta clinch o entra descuidado, puede caer en una trampa mortal.' },
        { icon: 'Clock', title: 'Inactividad de 10 Meses', fighter: 'Erosa', risk_level: 'RIESGO BAJO', risk_color: 'yellow', description: 'Erosa no pelea desde mayo de 2025, son casi 10 meses de inactividad. Para un peleador de 36 anos, el tiempo parado puede afectar reflejos y timing. No es una inactividad extrema, pero es relevante.' },
        { icon: 'TrendingUp', title: 'Cub Swanson como Coach', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Douglas entrena con Cub Swanson en Bloodline Combat Sports, ademas de trabajar boxeo con Joel Diaz. Swanson es un ex peleador de elite del peso pluma que entiende exactamente lo que funciona en esta division. La preparacion para el debut esta en manos experimentadas.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Erosa',
        total_probability: 35,
        scenarios: [
          { name: 'La Guillotina Asesina', probability: 15, method: 'Sumision R1-R2', description: 'Erosa invita al intercambio, Douglas entra agresivo, y Erosa engancha la guillotina en una transicion. El mismo patron que funciono contra Ramos y Rodriguez. Douglas es cinturon negro, pero la guillotina de Erosa es de otro nivel.' },
          { name: 'Guerra de Desgaste', probability: 12, method: 'Decision Unanime', description: 'Erosa sobrevive el primer round, usa el clinch y takedowns para neutralizar el poder de Douglas, y gana por puntos con control y actividad. El cardio del veterano pesa en los rounds finales.' },
          { name: 'Nocaut de Contragolpe', probability: 8, method: 'KO/TKO R2-R3', description: 'Douglas entra confiado, Erosa contragolpea con precision de zurdo. Erosa tiene 12 KOs en su carrera y sabe como contraatacar. Si Douglas es imprudente, puede pagar el precio.' },
        ],
      },
      fighter2: {
        nome: 'Douglas',
        total_probability: 62,
        scenarios: [
          { name: 'Nocaut Relampago', probability: 30, method: 'KO/TKO R1', description: 'Douglas repite el patron de sus ultimas cinco peleas. Entra explosivo, conecta una combinacion pesada, y termina antes de que acabe el primer round. Contra un oponente con 7 derrotas por nocaut, la probabilidad es alta.' },
          { name: 'TKO por Volumen', probability: 18, method: 'TKO R2', description: 'Douglas no consigue el nocaut en el R1, pero acumula dano en el striking. En el segundo round, el volumen de golpes pesados lleva a una parada del arbitro o abandono del corner.' },
          { name: 'Grappling Inesperado', probability: 14, method: 'Sumision o TKO en el suelo R1-R2', description: 'Douglas usa sus credenciales de wrestling y jiu-jitsu para sorprender. Campeon nacional de lucha en Brasil y cinturon negro de jiu-jitsu, puede llevar la pelea al suelo si el striking no funciona.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Lerryan Douglas',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Douglas es el favorito por buenas razones. El poder de nocaut es real, la racha de finalizaciones es impresionante, y enfrenta a un oponente con vulnerabilidad comprobada al nocaut (7 KOs recibidos). Erosa absorbe 6,27 golpes significativos por minuto, lo que significa que VA a ser golpeado, y contra el poder de Douglas, cada golpe limpio es potencialmente el fin. La confianza no es ALTA porque Douglas es debutante en el UFC, el factor local favorece a Erosa, y la guillotina de Juicy J es una amenaza real. Si Douglas entra descuidado buscando el nocaut, puede terminar estrangulado en el suelo. Pero el escenario mas probable es Douglas conectando algo grande en los primeros rounds.',
      x_factor: {
        title: 'La Guillotina de Erosa',
        description: 'Erosa sometio a Ramos y Rodriguez con guillotinas en el R1 en 2024. Si Douglas entra agresivo y baja la cabeza para acortar distancia contra el zurdo, puede caer directo en una guillotina. Es el unico camino realista para la sorpresa.',
      },
      upset_alert: {
        title: 'El Veterano en Casa Tiene Trucos',
        description: 'Erosa ya hizo 17 peleas en el UFC. Sabe como sobrevivir contra power strikers, sabe enganchar sumisiones en momentos de caos, y la hinchada de Seattle va a empujar. No subestimen el factor experiencia contra un debutante nervioso.',
      },
      probabilities: {
        fighter1: { nome: 'Erosa', percent: 35 },
        fighter2: { nome: 'Douglas', percent: 62 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Erosa (+285)', reasoning: 'Como desvalido a +285, Erosa ofrece valor si crees en la experiencia, la guillotina y el factor local. La linea esta generosa para un veterano peligroso.' },
        method: { pick: 'Douglas por KO/TKO', reasoning: '7 KOs en la carrera de Douglas, 7 derrotas por nocaut en la carrera de Erosa. La convergencia es brutal.' },
        over_under: { pick: 'Menos de 1,5 rounds', rounds: 1.5, reasoning: 'Douglas finaliza temprano (5 KOs consecutivos). Erosa tambien finaliza temprano (3 guillotinas en el R1). Alguien va a dormir rapido.' },
        best_value: 'Menos de 1,5 rounds es la apuesta mas inteligente. Los dos son finalizadores de primer round y este estilo favorece una conclusion rapida.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Los Primeros 60 Segundos de Douglas', icon: 'Zap', description: 'Si Douglas viene con la misma intensidad del Contender Series, los primeros 60 segundos seran los mas peligrosos de toda la pelea. Observa si entra con combinaciones pesadas o si respeta el zurdo de Erosa. Si entra imprudente, puede caer en la guillotina. Si entra calculado, puede noquear.' },
        { num: 2, title: 'La Distancia del Zurdo de Erosa', icon: 'Target', description: 'Erosa es zurdo, y eso cambia toda la dinamica del striking. Douglas entreno toda su vida contra ortodoxos. El jab de izquierda de Erosa y el angulo diferente pueden confundir a Douglas en los primeros minutos. Observa como Douglas maneja el cambio de angulo.' },
        { num: 3, title: 'Intentos de Clinch y Guillotina', icon: 'Shield', description: 'Siempre que haya clinch o intento de takedown, observa el brazo de Erosa alrededor del cuello. Su guillotina es casi instintiva. Si Douglas baja la cabeza para entrar, Erosa puede agarrar el cuello en una fraccion de segundo.' },
        { num: 4, title: 'El Lenguaje Corporal de Douglas en el R2', icon: 'Activity', description: 'Si la pelea llega al segundo round, observa el lenguaje corporal de Douglas. Ya mostro que puede pelear mas alla del R1? El cardio fue probado en peleas del LFA que fueron a decision, pero el octagono es otro nivel de presion. Signos de fatiga o frustracion pueden indicar que la pelea esta cambiando.' },
        { num: 5, title: 'La Reaccion del Publico de Seattle', icon: 'MapPin', description: 'Erosa es el hijo local. El Climate Pledge Arena va a estar ruidoso para Juicy J. Observa como la energia del publico afecta a ambos peleadores. Erosa puede alimentarse de eso e ir hacia adelante con mas agresividad. Douglas necesita bloquear el ruido y mantener el foco en el gameplan.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'VETERANO vs DEBUTANTE', content: 'EROSA vs DOUGLAS\nUFC Seattle | 28 de marzo\nClimate Pledge Arena\n\n31-13 vs 13-5\nEl veterano local contra el pistolero del LFA.\n5 nocauts consecutivos de Douglas.', color: 'red' },
        { slide_number: 2, title: 'EROSA: JUICY J', content: 'Yakima, Washington (pelea en casa!)\n31-13-0 en carrera\n9-8 en UFC\n14 sumisiones (guillotina mortal)\n12 KOs\n5 bonos de rendimiento\nZurdo peligroso\nFinalizo 3 por guillotina R1 en 2024', color: 'red' },
        { slide_number: 3, title: 'DOUGLAS: GUNSLINGER', content: 'Paranagua, Brasil\n13-5-0 en carrera\nDEBUT en UFC\n5 KOs consecutivos\nCampeon peso pluma LFA\nCinturon negro BJJ + Muay Thai\nCampeon nacional lucha Brasil\nKO en 36 segundos en DWCS', color: 'blue' },
        { slide_number: 4, title: 'LA CLAVE DE LA PELEA', content: 'GUILLOTINA vs PODER\n\nErosa: 14 subs en carrera\n3 guillotinas R1 en 2024\n\nDouglas: 7 KOs en carrera\n5 KOs consecutivos\n6 finalizaciones en R1\n\nSi va al suelo = Erosa\nSi queda de pie = Douglas', color: 'gold' },
        { slide_number: 5, title: 'PREDICCION', content: 'DOUGLAS por KO/TKO R1-R2\n\nConfianza: MEDIA\n62% Douglas / 35% Erosa\n\nPero cuidado con la guillotina.\nUn error de Douglas puede\ncostarle todo en el primer round.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Erosa vs Douglas en UFC Seattle es exactamente el tipo de pelea que termina en 2 minutos. El veterano con 7 derrotas por KO contra el debutante con 5 KOs consecutivos. Algo va a explotar. Hilo:' },
        { num: '2/6', text: 'Erosa (31-13): 26 finalizaciones en 31 victorias. 14 sumisiones. 3 guillotinas en R1 solo en 2024. Pelea en CASA en Seattle, a 2 horas de Yakima. Zurdo. 17 peleas UFC. 5 bonos. El tipo es una montana rusa ambulante.' },
        { num: '3/6', text: 'Douglas (13-5): 5 KOs consecutivos. Campeon del LFA. Cinturon negro de BJJ Y muay thai. Campeon nacional de lucha de Brasil. KO de 36 segundos en el Contender Series que se hizo viral. Entrena con Cub Swanson. El hype es real.' },
        { num: '4/6', text: 'El problema para Erosa: 7 derrotas por KO en su carrera. SIETE. Contra un tipo que noquea a todos los que se ponen enfrente. La matematica es cruel: si Douglas conecta limpio, se acabo.' },
        { num: '5/6', text: 'Pero no descarten a Erosa. Esa guillotina es MORTAL. Ramos y Rodriguez fueron estrangulados en R1 en 2024. Si Douglas baja la cabeza para acortar distancia contra el zurdo, podria despertar en el suelo sin aire.' },
        { num: '6/6', text: 'Pick: Douglas por KO/TKO en R1-R2. Mejor apuesta: Menos de 1,5 rounds. Los dos son finalizadores de primer round y el estilo favorece la accion rapida. Pero Erosa a +285 tiene valor para quienes gustan de apostar en desvalidos peligrosos.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Un tipo con 7 derrotas por nocaut contra un tipo con 5 nocauts consecutivos. Que puede salir mal? Erosa vs Douglas en UFC Seattle es el tipo de pelea que termina con alguien durmiendo.' },
        { time: '10-25s', title: 'Los Peleadores', text: 'Erosa es de Washington, pelea en casa, tiene 31 victorias incluyendo 14 sumisiones con una guillotina asesina. Douglas es brasileno, viene del LFA con titulo y un nocaut viral de 36 segundos en el Contender Series. Cinturon negro de todo: BJJ, muay thai, lucha.' },
        { time: '25-40s', title: 'El Analisis', text: 'Douglas es favorito a -350 por una razon: su poder encuentra la mayor vulnerabilidad de Erosa, que son los nocauts recibidos. Pero Erosa tiene una carta escondida: la guillotina. Sometio a tres tipos en R1 por guillotina en 2024. Si Douglas entra agresivo y baja la cabeza, puede caer en una trampa.' },
        { time: '40-55s', title: 'Prediccion', text: 'Douglas por KO en los primeros dos rounds es el escenario mas probable. Pero esta es una pelea con potencial de sorpresa real por sumision. Menos de 1,5 rounds es la apuesta mas inteligente del card. Los dos son finalizadores de primer round.' },
        { time: '55-65s', title: 'CTA', text: 'Quien creen que gana? El veterano con la guillotina en casa o el pistolero brasileno? Comenta abajo y sigue para mas analisis del UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'Este tipo tiene 7 DERROTAS por nocaut y va a enfrentar a un tipo con 5 NOCAUTS consecutivos.', body: 'Erosa contra Douglas en UFC Seattle. Erosa es de Washington, pelea en CASA, y tiene una guillotina que ya estrangulo a 3 tipos en el primer round en 2024. Douglas vino del LFA con titulo y noqueo al ultimo oponente en 36 SEGUNDOS. Alguien va a dormir RAPIDO.', cta: 'Comenta EROSA o DOUGLAS!' },
        { hook: '36 SEGUNDOS. Fue el tiempo que Douglas tardo en ganar el contrato del UFC.', body: 'Lerryan Douglas noqueo a Cam Teague en el Contender Series con un golpe de pelicula. 5 nocauts consecutivos. Campeon del LFA. Cinturon negro de BJJ y muay thai. Ahora debuta en el UFC contra un veterano con 17 peleas en la organizacion que pelea en su propio PATIO en Seattle.', cta: 'Sera que el hype es real? Comenta!' },
        { hook: 'La guillotina MAS peligrosa del peso pluma contra el nocaut MAS explosivo del LFA.', body: 'Erosa tiene 14 sumisiones en su carrera, la mayoria por guillotina. Douglas tiene 7 nocauts en su carrera, 5 consecutivos. Si Douglas entra bajo, Erosa agarra el cuello. Si Erosa se queda al frente, Douglas apaga la luz. Quien se equivoca primero, pierde.', cta: 'Cual es tu pick? Comenta!' },
      ],
      headlines: [
        'Erosa vs Douglas: Por Que Esta Pelea No Pasara del Segundo Round',
        'El Veterano de Seattle Contra el Pistolero Brasileno: Analisis UFC Fight Night',
        'Douglas Debuta en UFC: 5 KOs Consecutivos Contra el Menton Fragil de Erosa',
        'La Guillotina de Erosa Puede Ser la Trampa Perfecta para Douglas en UFC Seattle',
        'Juicy J en Casa: Erosa Intenta Arruinar la Fiesta del Prospecto Mas Hypado del Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+285',
        fighter2_odds: '-350',
        fighter1_name: 'Julian Erosa',
        fighter2_name: 'Lerryan Douglas',
        source: 'Cuotas de apertura (marzo 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Vulnerabilidad al Nocaut', stat_headline: 'EROSA TIENE 7 DERROTAS POR KO/TKO EN 13 DERROTAS EN SU CARRERA', contexto: '54% de las derrotas de Erosa vinieron por nocaut. Contra un striker explosivo como Douglas, este historial es alarmante.', implicacao_aposta: 'Favorece a Douglas por KO/TKO como metodo de victoria especifico.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Guillotina Letal de Erosa', stat_headline: '14 SUMISIONES EN SU CARRERA, 3 GUILLOTINAS EN R1 EN 2024', contexto: 'Erosa sometio a Ramos y Rodriguez por guillotina en el primer round. Es un arma que puede castigar cualquier entrada descuidada de Douglas.', implicacao_aposta: 'Da valor a Erosa por sumision como prop. Es el camino mas realista para la sorpresa.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Menos de 1,5 Rounds', stat_headline: 'DOUGLAS: 6 FINALIZACIONES EN R1. EROSA: 9 FINALIZACIONES EN R1', contexto: 'Los dos son finalizadores de primer round. Combinados, 15 de sus victorias vinieron en R1. La probabilidad de pelea corta es altisima.', implicacao_aposta: 'Menos de 1,5 rounds es la apuesta con mejor edge estadistico en esta pelea.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Brain', titulo: 'Debut UFC de Douglas', stat_headline: 'PRIMERA PELEA EN EL OCTAGONO, CONTRA VETERANO DE 17 PELEAS UFC', contexto: 'Douglas nunca peleo en el UFC. El salto del LFA/DWCS al octagono es significativo. Muchos prospectos fallan en el debut.', implicacao_aposta: 'Agrega incertidumbre al favoritismo pesado de Douglas. Erosa a +285 tiene valor por este factor.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Factor Local para Erosa', stat_headline: 'EROSA DE YAKIMA, WA, PELEANDO EN SEATTLE', contexto: 'Erosa pelea a menos de 2 horas de casa. El Climate Pledge Arena tendra apoyo local significativo para Juicy J.', implicacao_aposta: 'Puede influenciar la energia de Erosa y decisiones apretadas.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Menos de 1,5 Rounds', odds: '-110 (estimado)', confianca: 'alta', edge_vs_mercado: 'Dos finalizadores de primer round. 15 victorias combinadas en R1.', raciocinio: 'Douglas termina peleas temprano (5 KOs consecutivos, 6 finalizaciones en R1). Erosa tambien termina temprano (3 guillotinas en R1 en 2024, 9 finalizaciones en R1 en su carrera). El estilo de los dos converge hacia una pelea corta y explosiva.' },
        { tipo: 'Metodo', pick: 'Douglas por KO/TKO', odds: '-200 (estimado)', confianca: 'media', raciocinio: 'Douglas tiene 7 KOs en 13 victorias. Erosa tiene 7 derrotas por KO en 13 derrotas. La convergencia es el argumento. Pero la posibilidad de sumision de Erosa impide confianza alta.' },
        { tipo: 'Moneyline', pick: 'Erosa (+285)', odds: '+285', confianca: 'baixa', edge_vs_mercado: 'Debutante en UFC, veterano en casa, guillotina mortal. A +285, necesita ganar solo ~26% de las veces para tener valor. Estimacion real: 35%.', raciocinio: 'Erosa es un desvalido peligroso. La guillotina, la experiencia, el factor local y la incognita del debut de Douglas se combinan para crear valor real a +285.' },
      ],
      armadilha: {
        titulo: 'Trampa: Apostar Fuerte en Douglas Moneyline a -350',
        descricao: 'A -350, necesitas apostar 350 para ganar 100. Esto solo vale si Douglas gana en 78% de los escenarios o mas. La estimacion real es de 62%, incluyendo el riesgo de la guillotina de Erosa y la incognita del debut en UFC. La moneyline pura de Douglas esta cara. El mejor valor esta en Douglas por KO/TKO o en el Menos de 1,5 rounds, que pagan mejor con probabilidad similar.',
      },
      disclaimer: 'Analisis estadistico con fines informativos. Apuesta con responsabilidad.',
    },
  },
};


// ═══════════════════════════════════════════════════════
// LOCALE MAP & PAGE COMPONENT
// ═══════════════════════════════════════════════════════
const analises: Record<string, FullSingleAnalise> = {
  pt: analisePT,
  en: analiseEN,
  fr: analiseFR,
  es: analiseES,
};

export default function Page() {
  const locale = useLocale();
  const analise = analises[locale] || analisePT;
  return <FullAnalysisView analise={analise} />;
}
