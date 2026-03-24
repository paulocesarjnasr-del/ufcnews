'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analise: FullSingleAnalise = {
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

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  return <FullAnalysisView analise={analise} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
