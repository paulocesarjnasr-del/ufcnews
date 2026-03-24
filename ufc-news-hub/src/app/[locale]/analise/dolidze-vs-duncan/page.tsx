'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: FullSingleAnalise = {
  id: 'dolidze-vs-duncan',
  evento_id: null,
  slug: 'dolidze-vs-duncan',
  titulo: 'Dolidze vs Duncan: O Georgiano Veterano Contra o Britanico em Ascensao',
  subtitulo: 'O ex-top 10 do peso-medio busca voltar ao topo enquanto CLD quer confirmar sua sequencia de nocautes',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,88m', envergadura: '193cm', idade: 37, academia: 'Georgia' },
      fighter2: { altura: '1,88m', envergadura: '201cm', idade: 30, academia: 'Team KF, Inglaterra' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'KO/TKO R1-R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Roman Dolidze',
    record: '15-4-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Anthony Hernandez', method: 'Submissao R4', event: 'UFC on ESPN 72' },
      { result: 'W', opponent: 'Marvin Vettori', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Kevin Holland', method: 'TKO R1 (lesao)', event: 'UFC 307' },
    ],
  },
  fighter2_info: {
    nome: 'Christian Leroy Duncan',
    record: '13-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Marco Tulio Silva', method: 'KO R2', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Eryk Anders', method: 'KO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Andrey Pulyaev', method: 'Decisao Unanime', event: 'UFC London' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: '21 de Marco, 2026',
      evento_local: 'The O2 Arena, Londres, Reino Unido',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Caucasiano Contra o Britanico em Ascensao',
      tagline_sub: 'Teste de fogo no peso-medio com dois finalizadores perigosos buscando resultados opostos',
      fighter1: {
        nome_completo: 'Roman "The Caucasian" Dolidze',
        apelido: 'The Caucasian',
        sobrenome: 'Dolidze',
        record: '15-4-0',
        ranking: '#11 Peso-Medio',
        info_extra: 'Tbilisi, Georgia | 37 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Christian Leroy Duncan',
        apelido: 'CLD',
        sobrenome: 'Duncan',
        record: '13-2-0',
        ranking: 'N/R Peso-Medio',
        info_extra: 'Gloucester, Inglaterra | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Veterano Buscando Redencao</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Roman Dolidze</strong> e um caso interessante no peso-medio. O georgiano de 37 anos ja provou que pode competir com a elite: venceu Kevin Holland por TKO (lesao costela), derrotou Marvin Vettori por decisao unanime em 5 rounds, e bateu Anthony Smith em short notice no UFC 303. Mas a inconsistencia e sua marca: entre essas vitorias, perdeu para Nassourdine Imavov e foi finalizado por Anthony Hernandez no quarto round. Com 15-4, Dolidze e perigoso mas irregular.
        </p>
        <p class="mb-4">
          A derrota para Hernandez em agosto de 2025 foi particularmente dolorosa: Dolidze estava na luta principal e foi submetido no quarto round, mostrando que quando a luta vai para o cardio tardio, ele pode ter problemas. Agora, aos 37 anos, a pressao para voltar aos trilhos e imensa.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">CLD: O Britanico Que Ninguem Quer Enfrentar</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Christian Leroy Duncan</strong> esta vivendo o melhor momento da carreira. Tres vitorias consecutivas, duas por nocaute no primeiro e segundo round, provam que CLD encontrou seu ritmo no UFC. Com 30 anos, 1,88m e envergadura de 2,01m, ele tem as ferramentas fisicas para dominar no peso-medio. As duas derrotas no UFC vieram para Armen Petrosyan em junho de 2023 e Gregory Rodrigues em julho de 2024, e desde a ultima ele nao parou de evoluir.
        </p>
        <p class="mb-4">
          Lutando em casa em Londres, Duncan quer usar essa plataforma para se lancar ao ranking do peso-medio. Vencer Dolidze, um veterano que ja derrotou nomes como Vettori e Holland, seria a declaracao perfeita. E a torcida britanica vai estar totalmente do lado dele.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#11 Peso-Medio', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: 'Vem de derrota', fighter2: '3 vitorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Voltar ao ranking do peso-medio', fighter2: 'Entrar no ranking pela primeira vez' },
        { dimensao: 'Risco', fighter1: '2 derrotas nas ultimas 3 lutas', fighter2: 'Perder momentum contra veterano' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O CAUCASIANO RESISTE',
          subtitulo: 'Dolidze usa a experiencia e o wrestling para neutralizar Duncan',
          consequencias: [
            { tag: 'RANKING', texto: 'Dolidze volta ao radar do ranking com vitoria sobre prospect em ascensao' },
            { tag: 'PROXIMA', texto: 'Luta contra oponente ranqueado do top 10-15 do peso-medio' },
          ],
          proxima_luta: 'Dolidze vs oponente ranqueado do peso-medio',
        },
        fighter2_vence: {
          titulo: 'CLD CONQUISTA LONDRES',
          subtitulo: 'Duncan nocauteia Dolidze em casa e se lanca ao ranking',
          consequencias: [
            { tag: 'RANKING', texto: 'Duncan entra no top 15 do peso-medio com quatro vitorias consecutivas' },
            { tag: 'PROXIMA', texto: 'Luta contra nome estabelecido do top 10 no proximo card britanico' },
          ],
          proxima_luta: 'Duncan vs oponente ranqueado do top 10',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Roman Dolidze',
        color: 'red',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Anthony Hernandez', result: 'L', method: 'Submissao R4 (RNC)', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado no quarto round por rear-naked choke. Perdeu na luta principal apos estar competitivo.' },
          { date: 'Mar 2025', opponent: 'Marvin Vettori', result: 'W', method: 'Decisao Unanime', opponent_rank: '#10 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Vitoria por decisao unanime sobre Vettori em 5 rounds na luta principal. Performance de maturidade.' },
          { date: 'Out 2024', opponent: 'Kevin Holland', result: 'W', method: 'TKO R1 (lesao costela)', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Bom', note: 'Holland sofreu lesao na costela durante troca no chao e nao continuou apos o R1. TKO por lesao.' },
          { date: 'Jun 2024', opponent: 'Anthony Smith', result: 'W', method: 'Decisao Unanime', opponent_rank: '#12 LHW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria por decisao sobre o veterano Smith em luta de 3 rounds no UFC 303 (peso meio-pesado, short notice).' },
          { date: 'Fev 2024', opponent: 'Nassourdine Imavov', result: 'L', method: 'Decisao Majoritaria', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota apertada para Imavov na luta principal. Luta competitiva ate o final.' },
        ],
        full_fight_history: [
          { date: 'Fev 2024', opponent: 'Nassourdine Imavov', result: 'L', method: 'MD', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota apertada' },
          { date: 'Jun 2024', opponent: 'Anthony Smith', result: 'W', method: 'UD', opponent_rank: '#12 LHW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria por decisao, UFC 303 (LHW, short notice)' },
          { date: 'Out 2024', opponent: 'Kevin Holland', result: 'W', method: 'TKO R1 (lesao)', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Bom', note: 'TKO por lesao na costela de Holland' },
          { date: 'Mar 2025', opponent: 'Marvin Vettori', result: 'W', method: 'UD', opponent_rank: '#10 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Decisao em 5 rounds' },
          { date: 'Ago 2025', opponent: 'Anthony Hernandez', result: 'L', method: 'Sub R4', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado no R4' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'resilient',
        momentum_note: 'Dolidze e irregular por natureza. Vem de derrota para Hernandez, mas antes disso teve tres vitorias consecutivas impressionantes (Smith, Holland, Vettori). Ele e o tipo de lutador que pode finalizar qualquer um no primeiro round ou ser submetido no quarto. A inconsistencia e sua marca.',
      },
      fighter2: {
        nome: 'Christian Leroy Duncan',
        color: 'blue',
        recent_fights: [
          { date: 'Nov 2025', opponent: 'Marco Tulio Silva', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no segundo round. Terceira vitoria consecutiva e segundo KO seguido.' },
          { date: 'Ago 2025', opponent: 'Eryk Anders', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute no primeiro round sobre o veterano Anders. Performance explosiva.' },
          { date: 'Mar 2025', opponent: 'Andrey Pulyaev', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao no UFC Londres. Solida mas sem highlight.' },
          { date: 'Jul 2024', opponent: 'Gregory Rodrigues', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota no UFC. Perdeu por decisao no UFC 304 em Manchester.' },
        ],
        full_fight_history: [
          { date: 'Mar 2023', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (lesao)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC, TKO por lesao' },
          { date: 'Jun 2023', opponent: 'Armen Petrosyan', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira derrota UFC' },
          { date: 'Nov 2023', opponent: 'Denis Tiuliulin', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO no R2' },
          { date: 'Mar 2024', opponent: 'Claudio Ribeiro', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO no R2' },
          { date: 'Jul 2024', opponent: 'Gregory Rodrigues', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda derrota UFC, UFC 304' },
          { date: 'Mar 2025', opponent: 'Andrey Pulyaev', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UFC Londres, decisao' },
          { date: 'Ago 2025', opponent: 'Eryk Anders', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO R1' },
          { date: 'Nov 2025', opponent: 'Marco Tulio Silva', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO R2, Performance da Noite' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Duncan esta no melhor momento. Tres vitorias consecutivas, duas por nocaute, e evolucao visivel a cada luta. A sequencia de nocautes sobre Anders e Marco Tulio mostrou que CLD encontrou seu poder. Lutando em casa em Londres, a confianca esta no maximo.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Dolidze',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '9W-4L (69%)',
        contra_top5: '0W-1L',
      },
      fighter2: {
        nome: 'Duncan',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '6W-2L (75%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Dolidze (9-4 UFC) enfrentou nivel muito superior (Vettori, Holland, Imavov, Hernandez) enquanto Duncan (6-2 UFC) so enfrentou oponentes sem ranking. Essa luta e o grande teste de nivel para Duncan.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.45, valueB: 4.12, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 47, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.12, valueB: 3.55, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 54, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 2.10, valueB: 0.50, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 42, valueB: 33, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 58, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.4, valueB: 0.3, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '37 anos', fighter2: '30 anos', note: 'Dolidze 7 anos mais velho' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,88m (6\'2")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '193cm (76")', fighter2: '201cm (79")', note: 'Duncan com 3 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Background', fighter1: 'Sambo/Wrestling', fighter2: 'Kickboxing/MMA', note: 'Grappler vs Striker' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 75, valueB: 45, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Dolidze media 2.10 takedowns por 15 min. Background de sambo e wrestling e significativo.' },
        { label: 'Striking em Pe', valueA: 62, valueB: 76, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Duncan tem mais volume (4.12 vs 3.45 por minuto) e 3 polegadas de envergadura a mais.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'even', advantage_note: 'Ambos finalizaram oponentes no R1 recentemente. Dolidze: Holland (TKO por lesao). Duncan: Anders (KO spinning back elbow). Poder equilibrado, mas Duncan com 77% KO rate e mais impressionante.' },
        { label: 'Defesa de Takedown', valueA: 72, valueB: 58, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Dolidze tem 72% de TDD, Duncan apenas 58%. Se Dolidze buscar o wrestling, Duncan pode ter dificuldade.' },
        { label: 'Cardio e Resistencia', valueA: 55, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Dolidze foi finalizado no R4 por Hernandez. Duncan e 7 anos mais jovem e mais fresco.' },
        { label: 'Experiencia em Alto Nivel', valueA: 82, valueB: 42, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Dolidze ja enfrentou Vettori, Holland, Imavov, Hernandez. Duncan so enfrentou oponentes sem ranking.' },
      ],
      insight: 'Dolidze traz experiencia e wrestling que Duncan ainda nao enfrentou. Duncan traz juventude, envergadura e momentum. A chave sera se Duncan consegue manter em pe e usar a envergadura, ou se Dolidze leva ao chao e controla.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Dolidze',
        ko_tko: { count: 8, percent: 53 },
        submission: { count: 3, percent: 20 },
        decision: { count: 4, percent: 27 },
        total_wins: 15,
      },
      fighter2: {
        nome: 'Duncan',
        ko_tko: { count: 10, percent: 77 },
        submission: { count: 1, percent: 8 },
        decision: { count: 2, percent: 15 },
        total_wins: 13,
      },
      insight: 'Ambos sao finalizadores, mas com perfis diferentes. Dolidze e mais diversificado: 53% KO, 20% submissao, 27% decisao. Duncan e um nocauteador nato: 77% KO. A versatilidade de Dolidze (pode nocautear ou submeter) e uma vantagem, mas o volume de nocautes de Duncan (10 em 13 vitorias) e impressionante.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM DUNCAN',
          color: 'green',
          title: 'A Explosao Inicial',
          description: 'Duncan vem de dois nocautes nos primeiros rounds (Anders no R1, Marco Tulio no R2). A explosividade e confianca dele estao no pico. Se ele conectar cedo com a vantagem de envergadura, pode encerrar a luta. Dolidze tambem finalizou Holland no R1 (TKO por lesao), entao ambos sao perigosos aqui.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Wrestling Entra em Jogo',
          description: 'Se a luta chegar ao R2, Dolidze provavelmente vai intensificar o wrestling. O R2 sera o teste de defesa de takedown de Duncan (58%). Se Dolidze conseguir controlar no chao, pode virar a dinamica. Se Duncan defender, continua em vantagem no striking.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VANTAGEM DUNCAN',
          color: 'green',
          title: 'Juventude e Gas',
          description: 'Dolidze mostrou problemas de cardio contra Hernandez no R4. Mesmo em 3 rounds, a fadiga do wrestling pode pesar no terceiro round. Duncan, 7 anos mais jovem, tende a ter mais gas para pressionar e buscar a finalizacao tardia.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Torcida em Casa', fighter: 'Duncan', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Duncan luta em casa no O2 Arena. O publico britanico vai apoiar intensamente. Para um lutador em ascensao, essa energia pode ser o combustivel para a melhor performance da carreira.' },
        { icon: 'TrendingUp', title: 'Momentum de Nocautes', fighter: 'Duncan', risk_level: 'POSITIVO', risk_color: 'green', description: 'Duncan vem de dois nocautes consecutivos. A confianca no poder esta no teto. Quando um lutador esta nesse estado, os golpes sao mais comprometidos e perigosos.' },
        { icon: 'Brain', title: 'Experiencia em Alto Nivel', fighter: 'Dolidze', risk_level: 'POSITIVO', risk_color: 'green', description: 'Dolidze ja enfrentou Vettori, Holland, Imavov, Hernandez, Smith. A experiencia contra elite e um ativo valioso. Duncan nunca enfrentou ninguem desse calibre.' },
        { icon: 'Clock', title: 'Idade: 37 vs 30', fighter: 'Duncan', risk_level: 'POSITIVO', risk_color: 'green', description: 'A diferenca de 7 anos e significativa. Dolidze esta no final da carreira enquanto Duncan esta no prime atletico. Reflexos, recuperacao e explosividade favorecem o mais jovem.' },
        { icon: 'AlertTriangle', title: 'Cardio de Dolidze', fighter: 'Dolidze', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Dolidze foi finalizado no R4 por Hernandez, mostrando problemas de resistencia em lutas longas. Se nao conseguir o takedown cedo, o gas pode faltar no R3.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Dolidze',
        total_probability: 40,
        scenarios: [
          { name: 'Wrestling e Controle', probability: 18, method: 'Decisao Unanime', description: 'Dolidze usa o wrestling para controlar Duncan no chao, acumula tempo de controle e vence nos pontos. A defesa de takedown de Duncan (58%) pode nao ser suficiente.' },
          { name: 'Nocaute de Poder', probability: 12, method: 'KO/TKO R1-R2', description: 'Dolidze encontra uma abertura no striking de Duncan e conecta algo pesado. Ele tem 8 KOs na carreira (53%) e poder real nas maos.' },
          { name: 'Submissao do Grappler', probability: 10, method: 'Submissao R2-R3', description: 'Dolidze leva ao chao e encontra uma submissao. Com 3 submissoes na carreira e background de sambo, o chao e territorio favoravel.' },
        ],
      },
      fighter2: {
        nome: 'Duncan',
        total_probability: 58,
        scenarios: [
          { name: 'Nocaute Explosivo', probability: 28, method: 'KO/TKO R1-R2', description: 'Duncan usa a envergadura de 201cm para conectar de longa distancia. Com dois nocautes consecutivos (spinning back elbow em Anders, KO em Marco Tulio), a confianca e a precisao estao no pico. Dolidze, vindo de uma derrota devastadora, pode hesitar e pagar caro.' },
          { name: 'TKO por Acumulo', probability: 17, method: 'TKO R2-R3', description: 'Duncan machuca Dolidze no striking e acumula dano ao longo dos rounds. O cardio de Dolidze, que falhou no R4 contra Hernandez, pode ceder mais cedo contra a pressao e a torcida de Londres.' },
          { name: 'Volume e Distancia', probability: 13, method: 'Decisao Unanime', description: 'Duncan usa a envergadura para manter distancia, defende takedowns suficientes e vence nos pontos com volume de strikes e movimentacao. Cenario menos provavel dado o historico recente de finalizacoes.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Christian Leroy Duncan',
      winner_side: 'fighter2',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Duncan esta no melhor momento da carreira: 3 vitorias seguidas com 2 KOs consecutivos que renderam bonus de Performance of the Night (spinning back elbow em Anders R1, KO brutal em Marco Tulio R2). Do outro lado, Dolidze vem da pior derrota da carreira, completamente dominado por Hernandez no UFC Vegas 109 antes de ser finalizado no R4. Aos 37 anos, voltando 7 meses depois de uma surra, Dolidze enfrenta um adversario explosivo com envergadura de 201cm e a torcida de Londres empurrando. Sim, Dolidze tem wrestling de elite e poderia explorar a defesa de takedown de Duncan (58%), como Rodrigues fez no UFC 304. Mas a velocidade explosiva de Duncan nos primeiros minutos, combinada com a confianca de quem vem nocauteando todo mundo, e demais para um Dolidze desgastado.',
      x_factor: {
        title: 'A Confianca de Quem Nocauteia',
        description: 'Duncan vem de dois nocautes espetaculares seguidos com bonus. Esse tipo de confianca muda a forma como um lutador entra no octogono. Ele vai entrar agressivo, buscando o finish cedo, e contra um Dolidze que foi dominado na ultima luta, a pressao psicologica e enorme.',
      },
      upset_alert: {
        title: 'O Wrestling do Georgiano',
        description: 'Dolidze media 2.10 takedowns por 15 min e Duncan tem apenas 58% de defesa. Rodrigues provou no UFC 304 que o caminho pra vencer Duncan e o wrestling. Se Dolidze implementar o plano desde o R1 e sobreviver o striking inicial, pode controlar a luta no chao.',
      },
      probabilities: {
        fighter1: { nome: 'Dolidze', percent: 40 },
        fighter2: { nome: 'Duncan', percent: 58 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Envergadura de Duncan', icon: 'Target', description: 'Duncan tem 201cm de envergadura contra 193cm de Dolidze. Essa diferenca de 3 polegadas pode ser decisiva se Duncan usar jab e diretos de longa distancia para manter Dolidze longe do clinch e do takedown.' },
        { num: 2, title: 'Os Takedowns de Dolidze', icon: 'Shield', description: 'Dolidze media 2.10 takedowns por 15 min e vai buscar levar a luta ao chao. A defesa de takedown de Duncan (58%) sera testada de forma seria pela primeira vez. Observe as primeiras tentativas.' },
        { num: 3, title: 'O Poder de Duncan nos Primeiros Minutos', icon: 'Zap', description: 'Duncan vem de dois nocautes consecutivos. Se ele conectar cedo, a confianca e o momentum podem tornar a luta unilateral. Observe se ele entra agressivo ou cauteloso.' },
        { num: 4, title: 'O Cardio de Dolidze no R3', icon: 'Activity', description: 'Dolidze foi finalizado no R4 contra Hernandez. Se a luta chegar ao terceiro round, observe se Dolidze comeca a desacelerar. A fadiga pode transformar o R3 em territorio de Duncan.' },
        { num: 5, title: 'Reacao de Duncan ao Salto de Qualidade', icon: 'Brain', description: 'Esse e o maior teste da carreira UFC de Duncan. Observe como ele reage nos primeiros minutos contra um oponente de nivel muito superior aos anteriores. Nervosismo ou respeito excessivo podem abrir portas para Dolidze.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'TESTE DE FOGO NO PESO-MEDIO', content: 'DOLIDZE vs DUNCAN\nUFC Londres | Peso Medio\n\n15-4 vs 13-2\nO veterano georgiano #11\nvs o britanico em ascensao\nO primeiro teste real de CLD.', color: 'red' },
        { slide_number: 2, title: 'DOLIDZE: O VETERANO', content: '15-4 na carreira | #11 MW\nVenceu Holland (TKO R1)\nVenceu Vettori (UD 5 rounds)\nSambo + ADCC champion\n37 anos | 2.10 TDs por 15 min\nMas: destruido por Hernandez (sub R4)\nA pior derrota da carreira.', color: 'red' },
        { slide_number: 3, title: 'DUNCAN: CLD EM ASCENSAO', content: '13-2 na carreira\n77% das vitorias por KO (10 em 13)\n3 vitorias consecutivas\n2 KOs seguidos + bonus POTN\nAnders: spinning back elbow R1\nMarco Tulio: KO brutal R2\n201cm envergadura | Luta em casa', color: 'blue' },
        { slide_number: 4, title: 'O BLUEPRINT PRA VENCER CLD', content: 'As 2 derrotas de Duncan:\n\nPetrosyan: volume + leg kicks\nRodrigues: TAKEDOWNS + ground control\n\nDolidze tem o wrestling pra\nreplicar Rodrigues.\nMas tem o gas e a motivacao\ndepois de ser destruido?', color: 'gold' },
        { slide_number: 5, title: 'MOMENTUM vs EXPERIENCIA', content: 'DUNCAN:\n3W seguidas | 2 KOs + bonus\nConfianca no pico\nTorcida em casa\n\nDOLIDZE:\nDestruido por Hernandez (sub R4)\n37 anos | 7 meses parado\nVem da pior noite da carreira\n\nO momentum decide.', color: 'gold' },
        { slide_number: 6, title: 'APOSTAS DE VALOR', content: 'MELHOR APOSTA:\nDuncan KO/TKO (+110)\n2 KOs seguidos com bonus\nDolidze vulneravel\n\nVALOR AZARAO:\nDolidze ML (+340)\nWrestling de elite, ja venceu melhor\n\nARMADILHA:\nOver 2.5 rounds\nDuncan esta finalizando rapido', color: 'gold' },
        { slide_number: 7, title: 'PREVISAO', content: 'DUNCAN por KO/TKO R1-R2\n\nConfianca: MEDIA\n58% Duncan / 40% Dolidze\n\nA explosividade de CLD\ne demais pra um Dolidze\ndesgastado e envelhecido.', color: 'gold' },
      ],
      twitter: [
        { num: '1/8', text: 'Dolidze vs Duncan e o maior teste da carreira de CLD. Dolidze venceu Holland (TKO R1) e Vettori (UD 5 rounds). Duncan vem de 2 KOs seguidos com bonus. Thread completa:' },
        { num: '2/8', text: 'Duncan (13-2): 77% das vitorias por KO. Spinning back elbow em Anders no R1. KO brutal em Marco Tulio no R2. Dois bonus de Performance consecutivos. A confianca esta no teto.' },
        { num: '3/8', text: 'Dolidze (15-4): ADCC champion, sambo background, 2.10 TDs por 15 min. JA venceu Holland e Vettori. Mas a ultima luta foi DESTRUIDOR. Hernandez dominou do R1 ao R4 ate finalizar.' },
        { num: '4/8', text: 'O blueprint pra vencer Duncan existe: Rodrigues usou takedowns e ground control no UFC 304. Duncan tem 58% de TDD. Dolidze tem wrestling SUPERIOR ao Rodrigues. MAS tem motivacao depois daquela surra?' },
        { num: '5/8', text: 'O fator idade e inatividade: Dolidze tem 37 anos e 7 meses sem lutar desde a derrota devastadora. Duncan tem 30 e esta no pico. A diferenca de energia e momentum nao pode ser subestimada.' },
        { num: '6/8', text: 'Odds atualizadas: Duncan -450, Dolidze +340. O mercado fala claro. Duncan favorito massivo. MAS Dolidze como azarao pesado a +340 tem valor se voce acredita no wrestling.' },
        { num: '7/8', text: 'Apostas: Duncan KO/TKO a +110 e a melhor. Under 2.5 a +100 tem valor. Dolidze ML a +340 e alta recompensa se o wrestling funcionar. ARMADILHA: Duncan por decisao (ele ta nocauteando todo mundo).' },
        { num: '8/8', text: 'Minha pick: Duncan por KO/TKO no R1 ou R2. A explosividade, a confianca e a torcida vao ser demais pra Dolidze. Mas o wrestling e real. Nao e 70-30. E 58-40. RT Duncan, Like Dolidze!' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'CLD nunca enfrentou ninguem que venceu Kevin Holland e Marvin Vettori. Mas Dolidze vem da PIOR derrota da carreira. Quem prevalece: o momentum ou a experiencia?' },
        { time: '10-25s', title: 'Contexto', text: 'Duncan, 30 anos, 3 vitorias seguidas, 2 KOs com bonus, 201cm de envergadura, luta em casa. Dolidze, 37 anos, #11 do ranking, ADCC champion, destruido por Hernandez no R4 ha 7 meses.' },
        { time: '25-40s', title: 'Analise Tecnica', text: 'O blueprint existe: Rodrigues venceu Duncan no UFC 304 com takedowns e ground control. Dolidze tem wrestling superior a Rodrigues. Mas Duncan tem 58% de TDD e e explosivo nos primeiros minutos. O timing dos primeiros takedowns decide tudo.' },
        { time: '40-55s', title: 'Previsao', text: 'Duncan por KO/TKO nos primeiros 2 rounds. A explosividade, a confianca de 2 KOs com bonus, e um Dolidze desgastado. Mas o wrestling e um risco real. 58% Duncan, 40% Dolidze.' },
        { time: '55-65s', title: 'B-Roll', text: 'Sugestoes: spinning back elbow de Duncan em Anders, replay do KO de Marco Tulio, Hernandez dominando Dolidze no R4, tale of tape com envergadura, graficos de KO rate de Duncan, timeline de 7 meses de inatividade.' },
        { time: '65-75s', title: 'CTA', text: 'O momentum de CLD e forte o suficiente pra superar um wrestler de elite? Comenta embaixo e segue pra cobertura completa do card de Londres.' },
      ],
      tiktok: [
        { hook: 'Esse cara NUNCA enfrentou ninguem do nivel do oponente de sabado.', body: 'CLD tem 3 vitorias seguidas, 2 nocautes com bonus. Mas Roman Dolidze venceu Kevin Holland por TKO e Marvin Vettori por decisao em 5 rounds. O #11 do ranking. ADCC champion. O primeiro teste de verdade. Sera que CLD aguenta?', cta: 'Duncan ou Dolidze? Comenta!' },
        { hook: '201cm de envergadura contra o melhor wrestling que CLD ja enfrentou.', body: 'Duncan tem 3 polegadas a mais de envergadura que Dolidze. Mas Dolidze media 2.10 takedowns por 15 min e tem background de sambo e ADCC. O blueprint existe: Rodrigues venceu Duncan com takedowns no UFC 304. Dolidze tem wrestling MELHOR que Rodrigues.', cta: 'Em pe ou no chao? Onde vai ser decidido? Comenta!' },
        { hook: 'A PIOR derrota da carreira de Dolidze pode ser a melhor coisa pra Duncan.', body: 'Dolidze foi DESTRUIDO por Hernandez. Submissao no R4 depois de ser dominado do R1 ao R3. Aos 37 anos. 7 meses sem lutar. Agora enfrenta um striker explosivo de 30 anos com 2 KOs seguidos e a torcida inteira de Londres. A motivacao importa. E Dolidze pode nao ter mais.', cta: 'Dolidze ainda tem gas? Comenta!' },
      ],
      headlines: [
        'Dolidze vs Duncan: O Primeiro Teste Real Para CLD no UFC',
        'Christian Leroy Duncan Pode Vencer Quem Derrotou Holland e Vettori?',
        'O Wrestler Georgiano Contra o Striker Britanico: Preview do Peso-Medio',
        'Duncan em Casa, Dolidze com Experiencia: Quem Leva o Duelo de Estilos?',
        'UFC Londres: A Envergadura de Duncan e Suficiente Para Neutralizar Dolidze?',
        'Depois da Surra de Hernandez: Dolidze Tem Motivacao Para Mais Uma?',
        'CLD e Favorito -450 Mas o Blueprint Pra Vence-lo Existe',
      ],
      podcast: [
        {
          timestamp: '0:00-2:00',
          title: 'O Teste Que CLD Precisava',
          talking_points: [
            'Duncan vem de 2 KOs com bonus (spinning back elbow em Anders R1, KO em Marco Tulio R2). O momentum e real. Mas todos os oponentes eram sem ranking.',
            'Dolidze e o primeiro adversario de elite: #11 do ranking, venceu Holland por TKO e Vettori em 5 rounds. Experiencia contra o top 15 e real.',
            'O contexto da derrota de Dolidze: destruido por Hernandez no UFC Vegas 109, submissao no R4 apos dominio total. A pior noite da carreira aos 37 anos.',
          ],
          discussion_questions: [
            'Uma derrota devastadora como a de Dolidze muda permanentemente um lutador ou ele pode voltar?',
          ],
        },
        {
          timestamp: '2:00-4:00',
          title: 'O Blueprint: Wrestling vs Striking',
          talking_points: [
            'Rodrigues provou no UFC 304 que takedowns e ground control vencem Duncan. Dolidze tem wrestling SUPERIOR com background de sambo e ADCC.',
            'Duncan tem 58% de defesa de takedown e 77% das vitorias por KO. Se manter em pe, e letal. A envergadura de 201cm permite conectar de longa distancia.',
            'A chave e o R1: se Duncan conectar cedo (como fez nas ultimas 2), acabou. Se Dolidze sobreviver e levar ao chao, controla.',
          ],
          discussion_questions: [
            'O wrestling de Dolidze e melhor que o de Rodrigues. Mas ele esta em condicao de implementar?',
          ],
        },
        {
          timestamp: '4:00-6:00',
          title: 'Fatores Invisiveis',
          talking_points: [
            'Idade e inatividade: Dolidze tem 37 anos, 7 meses parado, vindo da pior derrota. Duncan tem 30, 3 lutas em 12 meses, no pico.',
            'O O2 Arena: Duncan luta em casa com 20 mil britanicos. A energia extra em rounds apertados e real.',
            'A confianca de quem nocauteia: Duncan nao esta tentando vencer por pontos. Ele esta buscando o finish. Essa mentalidade muda tudo.',
          ],
          discussion_questions: [
            'Se Duncan nao conseguir o KO nos 2 primeiros rounds, a luta muda completamente pro lado de Dolidze?',
          ],
        },
        {
          timestamp: '6:00-8:00',
          title: 'Previsao e Apostas',
          talking_points: [
            'Previsao: Duncan por KO/TKO R1-R2 (58% Duncan, 40% Dolidze). A explosividade e demais pra um Dolidze desgastado.',
            'Melhor aposta: Duncan KO/TKO a +110. Under 2.5 rounds a +100. Ambos com valor forte dado o historico recente.',
            'Valor azarao: Dolidze ML a +340. Se voce acredita no wrestling, a recompensa e enorme. Ele ja provou que pode vencer nomes superiores a Duncan.',
          ],
          discussion_questions: [
            'Dolidze a +340 e a melhor aposta de azarao do card ou e armadilha?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+340',
        fighter2_odds: '-450',
        fighter1_name: 'Roman Dolidze',
        fighter2_name: 'Christian Leroy Duncan',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Envergadura Superior de Duncan', stat_headline: '201CM DE ENVERGADURA VS 193CM DE DOLIDZE', contexto: 'Duncan tem 3 polegadas a mais de alcance. Pode usar jab e diretos de distancia para manter Dolidze longe.', implicacao_aposta: 'Favorece Duncan em pe. Se a luta ficar no striking, Duncan tem vantagem estrutural.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Wrestling de Dolidze vs TDD de Duncan', stat_headline: 'DOLIDZE: 2.10 TDS/15MIN. DUNCAN: 58% TDD', contexto: 'Dolidze e wrestler ativo e Duncan nunca enfrentou esse nivel de pressao no chao.', implicacao_aposta: 'Se voce acha que Dolidze vai levar ao chao, ele pode controlar e vencer.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'TrendingUp', titulo: 'Momentum de Duncan', stat_headline: '3 VITORIAS CONSECUTIVAS, 2 NOCAUTES SEGUIDOS', contexto: 'Duncan esta em ascensao com nocautes sobre Anders e Marco Tulio. Confianca e ritmo no pico.', implicacao_aposta: 'Favorece Duncan por finalizacao. O momentum recente e real.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Experiencia de Dolidze', stat_headline: '#11 MW, JA DERROTOU VETTORI, HOLLAND E SMITH', contexto: 'Dolidze tem experiencia contra elite que Duncan nao tem. Sabe lutar sob pressao.', implicacao_aposta: 'Nao descarte Dolidze. Ele ja venceu nomes melhores que Duncan.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Fator Casa de Duncan', stat_headline: 'CLD LUTA EM LONDRES COM TORCIDA BRITANICA', contexto: 'Duncan lutando em casa com apoio total da torcida. Energia extra em momentos decisivos.', implicacao_aposta: 'Pode influenciar rounds apertados. Juizes sentem a pressao da arena.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Duncan por KO/TKO', odds: '+110', confianca: 'alta', raciocinio: 'Duncan vem de 2 KOs consecutivos com bonus. Dolidze vem destruido da derrota pra Hernandez, aos 37 anos. A explosividade de CLD nos primeiros minutos e a aposta mais solida do card.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '+100', confianca: 'media', raciocinio: 'Se Duncan conectar cedo como fez contra Anders (R1) e Marco Tulio (R2), a luta nao vai longe. Dolidze tambem ja mostrou que pode ser parado (Hernandez R4).' },
        { tipo: 'Moneyline', pick: 'Dolidze (+340)', odds: '+340', confianca: 'baixa', edge_vs_mercado: 'Dolidze como azarao pesado. O valor e ENORME se voce acredita que o wrestling dele pode neutralizar Duncan como Rodrigues fez. Ja venceu Vettori e Holland.', raciocinio: 'Dolidze tem wrestling de elite e pode expor a fraqueza de Duncan no chao. Mas a derrota devastadora pra Hernandez e a idade pesam muito.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Superestimar o Momentum de Duncan',
        descricao: 'Duncan vem de nocautes impressionantes, mas contra oponentes sem ranking. Dolidze e um salto de qualidade enorme. Nao aposte pesado em Duncan baseado apenas no momentum recente sem considerar o nivel de oposicao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Dolidze vs Duncan: The Georgian Veteran vs the Rising Brit',
  subtitulo: 'The former top 10 middleweight seeks a return to form while CLD looks to confirm his knockout streak',
  evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Middleweight (185 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, predictedMethod: 'Unanimous Decision', confidence: 'MEDIUM' },
  fighter1_info: { ...analisePT.fighter1_info, ultimasLutas: [{ result: 'L', opponent: 'Anthony Hernandez', method: 'Submission R4', event: 'UFC on ESPN 72' }, { result: 'W', opponent: 'Marvin Vettori', method: 'Unanimous Decision', event: 'UFC Fight Night' }, { result: 'W', opponent: 'Kevin Holland', method: 'TKO R1 (injury)', event: 'UFC 307' }] },
  fighter2_info: { ...analisePT.fighter2_info, ultimasLutas: [{ result: 'W', opponent: 'Marco Tulio Silva', method: 'KO R2', event: 'UFC Fight Night' }, { result: 'W', opponent: 'Eryk Anders', method: 'KO R1', event: 'UFC Fight Night' }, { result: 'W', opponent: 'Andrey Pulyaev', method: 'Unanimous Decision', event: 'UFC London' }] },
  full_analysis: {
    hero: { ...analisePT.full_analysis.hero, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Middleweight (185 lbs)', tagline: 'The Caucasian vs the Rising Brit', tagline_sub: 'A middleweight fire test with two dangerous finishers seeking opposite outcomes', fighter1: { ...analisePT.full_analysis.hero.fighter1, ranking: '#11 Middleweight', info_extra: 'Tbilisi, Georgia | 37 years old' }, fighter2: { ...analisePT.full_analysis.hero.fighter2, ranking: 'N/R Middleweight', info_extra: 'Gloucester, England | 30 years old' } },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">The Veteran Seeking Redemption</h3>
        <p class="mb-4"><strong class="text-ufc-red">Roman Dolidze</strong> is an interesting case at middleweight. The 37-year-old Georgian has proven he can compete with the elite: beat Kevin Holland by TKO (rib injury), defeated Marvin Vettori by unanimous decision over 5 rounds, and beat Anthony Smith on short notice at UFC 303. But inconsistency is his trademark: between those wins, he lost to Nassourdine Imavov and was submitted by Anthony Hernandez in the fourth round. At 15-4, Dolidze is dangerous but erratic.</p>
        <p class="mb-4">The loss to Hernandez in August 2025 was particularly painful: Dolidze was in the main event and got submitted in the fourth round, showing that when fights go into late cardio territory, he can have problems. Now, at 37, the pressure to get back on track is immense.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">CLD: The Brit Nobody Wants to Face</h3>
        <p class="mb-4"><strong class="text-blue-400">Christian Leroy Duncan</strong> is living the best moment of his career. Three consecutive wins, two by knockout in the first and second rounds, prove CLD has found his rhythm in the UFC. At 30, 6'2" with a 79-inch reach, he has the physical tools to dominate at middleweight. His two UFC losses came against Armen Petrosyan in June 2023 and Gregory Rodrigues in July 2024, and since the last one he hasn't stopped evolving.</p>
        <p class="mb-4">Fighting at home in London, Duncan wants to use this platform to launch himself into the middleweight rankings. Beating Dolidze, a veteran who has defeated names like Vettori and Holland, would be the perfect statement. And the British crowd will be fully behind him.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#11 Middleweight', fighter2: 'Unranked' },
        { dimensao: 'Streak', fighter1: 'Coming off a loss', fighter2: '3-fight win streak' },
        { dimensao: 'Goal', fighter1: 'Return to the middleweight rankings', fighter2: 'Enter the rankings for the first time' },
        { dimensao: 'Risk', fighter1: '2 losses in the last 3 fights', fighter2: 'Lose momentum against a veteran' },
      ],
      prognostico: {
        fighter1_vence: { titulo: 'THE CAUCASIAN HOLDS', subtitulo: 'Dolidze uses experience and wrestling to neutralize Duncan', consequencias: [{ tag: 'RANKING', texto: 'Dolidze gets back on the ranking radar with a win over a rising prospect' }, { tag: 'NEXT', texto: 'Fight against a ranked top 10-15 middleweight' }], proxima_luta: 'Dolidze vs ranked middleweight opponent' },
        fighter2_vence: { titulo: 'CLD CONQUERS LONDON', subtitulo: 'Duncan knocks out Dolidze at home and launches himself into the rankings', consequencias: [{ tag: 'RANKING', texto: 'Duncan enters the middleweight top 15 with four consecutive wins' }, { tag: 'NEXT', texto: 'Fight against an established top 10 name on the next British card' }], proxima_luta: 'Duncan vs ranked top 10 opponent' },
      },
    },
    momento_atual: {
      fighter1: { ...analisePT.full_analysis.momento_atual.fighter1, recent_fights: [{ date: 'Aug 2025', opponent: 'Anthony Hernandez', result: 'L', method: 'Submission R4 (RNC)', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Good', note: 'Submitted in the fourth round by rear-naked choke. Lost in the main event after being competitive.' }, { date: 'Mar 2025', opponent: 'Marvin Vettori', result: 'W', method: 'Unanimous Decision', opponent_rank: '#10 MW', quality_score: 4, quality_label: 'Very Good', note: 'Unanimous decision win over Vettori in a 5-round main event. Mature performance.' }, { date: 'Oct 2024', opponent: 'Kevin Holland', result: 'W', method: 'TKO R1 (rib injury)', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Good', note: 'Holland suffered a rib injury during a ground exchange and couldn\'t continue after R1.' }, { date: 'Jun 2024', opponent: 'Anthony Smith', result: 'W', method: 'Unanimous Decision', opponent_rank: '#12 LHW', quality_score: 3, quality_label: 'Good', note: 'Decision win over veteran Smith in a 3-round fight at UFC 303 (light heavyweight, short notice).' }, { date: 'Feb 2024', opponent: 'Nassourdine Imavov', result: 'L', method: 'Majority Decision', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Very Good', note: 'Close loss to Imavov in the main event. Competitive fight throughout.' }], full_fight_history: [{ date: 'Feb 2024', opponent: 'Nassourdine Imavov', result: 'L', method: 'MD', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Very Good', note: 'Close loss' }, { date: 'Jun 2024', opponent: 'Anthony Smith', result: 'W', method: 'UD', opponent_rank: '#12 LHW', quality_score: 3, quality_label: 'Good', note: 'Decision win, UFC 303' }, { date: 'Oct 2024', opponent: 'Kevin Holland', result: 'W', method: 'TKO R1 (injury)', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Good', note: 'TKO by rib injury' }, { date: 'Mar 2025', opponent: 'Marvin Vettori', result: 'W', method: 'UD', opponent_rank: '#10 MW', quality_score: 4, quality_label: 'Very Good', note: '5-round decision' }, { date: 'Aug 2025', opponent: 'Anthony Hernandez', result: 'L', method: 'Sub R4', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Good', note: 'Submitted in R4' }], momentum_label: 'Steady (with caveats)', momentum_note: 'Dolidze is inconsistent by nature. Coming off a loss to Hernandez, but before that had three impressive consecutive wins (Smith, Holland, Vettori). He\'s the type of fighter who can finish anyone in the first round or get submitted in the fourth. Inconsistency is his trademark.' },
      fighter2: { ...analisePT.full_analysis.momento_atual.fighter2, recent_fights: [{ date: 'Nov 2025', opponent: 'Marco Tulio Silva', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Second-round knockout. Third consecutive win and second straight KO.' }, { date: 'Aug 2025', opponent: 'Eryk Anders', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First-round knockout over the veteran Anders. Explosive performance.' }, { date: 'Mar 2025', opponent: 'Andrey Pulyaev', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Decision win at UFC London. Solid but no highlight.' }, { date: 'Jul 2024', opponent: 'Gregory Rodrigues', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Only recent UFC loss. Lost by decision at UFC 304 in Manchester.' }], full_fight_history: [{ date: 'Mar 2023', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (injury)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut' }, { date: 'Jun 2023', opponent: 'Armen Petrosyan', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First UFC loss' }, { date: 'Nov 2023', opponent: 'Denis Tiuliulin', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'TKO R2' }, { date: 'Mar 2024', opponent: 'Claudio Ribeiro', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'TKO R2' }, { date: 'Jul 2024', opponent: 'Gregory Rodrigues', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Second UFC loss' }, { date: 'Mar 2025', opponent: 'Andrey Pulyaev', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC London decision' }, { date: 'Aug 2025', opponent: 'Eryk Anders', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'KO R1' }, { date: 'Nov 2025', opponent: 'Marco Tulio Silva', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'KO R2, Performance of the Night' }], momentum_label: 'On Fire', momentum_note: 'Duncan is at his best. Three consecutive wins, two by knockout, and visible improvement with each fight. The knockout streak over Anders and Marco Tulio showed CLD has found his power. Fighting at home in London, confidence is at its peak.' },
    },
    nivel_competicao: { fighter1: { nome: 'Dolidze', media_oponentes: 3, media_oponentes_label: 'Good', aproveitamento: '9W-4L (69%)', contra_top5: '0W-1L' }, fighter2: { nome: 'Duncan', media_oponentes: 1, media_oponentes_label: 'Poor', aproveitamento: '6W-2L (75%)', contra_top5: '0W-0L' }, oponentes_em_comum_count: { fighter1: 0, fighter2: 0 }, oponentes_em_comum_note: 'No common opponents. Dolidze (9-4 UFC) has faced far superior competition (Vettori, Holland, Imavov, Hernandez) while Duncan (6-2 UFC) has only faced unranked opponents. This fight is Duncan\'s ultimate level test.' },
    oponente_comum: null,
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 3.45, valueB: 4.12, maxVal: 6, format: 'decimal' },
      { label: 'Striking Accuracy (%)', valueA: 47, valueB: 48, maxVal: 100, format: 'percent' },
      { label: 'Strikes Absorbed/Min', valueA: 3.12, valueB: 3.55, maxVal: 6, format: 'decimal', reverseWinner: true },
      { label: 'Strike Defense (%)', valueA: 54, valueB: 50, maxVal: 100, format: 'percent' },
      { label: 'Takedowns Per 15 Min', valueA: 2.10, valueB: 0.50, maxVal: 4, format: 'decimal' },
      { label: 'Takedown Accuracy (%)', valueA: 42, valueB: 33, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 72, valueB: 58, maxVal: 100, format: 'percent' },
      { label: 'Submissions Per 15 Min', valueA: 0.4, valueB: 0.3, maxVal: 3, format: 'decimal' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '37 years old', fighter2: '30 years old', note: 'Dolidze 7 years older' },
      { label: 'Height', fighter1: '6\'2" (1.88m)', fighter2: '6\'2" (1.88m)', note: 'Same height' },
      { label: 'Reach', fighter1: '76" (193cm)', fighter2: '79" (201cm)', note: 'Duncan with 3-inch advantage' },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Background', fighter1: 'Sambo/Wrestling', fighter2: 'Kickboxing/MMA', note: 'Grappler vs Striker' },
    ] },
    perfil_habilidades: { skills: [
      { label: 'Offensive Wrestling', valueA: 75, valueB: 45, labelA: 'Very Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Dolidze averages 2.10 takedowns per 15 min. Sambo and wrestling background is significant.' },
      { label: 'Stand-up Striking', valueA: 62, valueB: 76, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Duncan has more volume (4.12 vs 3.45 per minute) and 3 inches more reach.' },
      { label: 'Knockout Power', valueA: 72, valueB: 75, labelA: 'Good', labelB: 'Very Good', advantage: 'even', advantage_note: 'Both finished opponents in R1 recently. Dolidze: Holland (TKO by injury). Duncan: Anders (KO). Even power, but Duncan\'s 77% KO rate is more impressive.' },
      { label: 'Takedown Defense', valueA: 72, valueB: 58, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Dolidze has 72% TDD, Duncan just 58%. If Dolidze goes for wrestling, Duncan could struggle.' },
      { label: 'Cardio & Endurance', valueA: 55, valueB: 72, labelA: 'Good', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Dolidze was submitted in R4 by Hernandez. Duncan is 7 years younger and fresher.' },
      { label: 'High-Level Experience', valueA: 82, valueB: 42, labelA: 'Very Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Dolidze has faced Vettori, Holland, Imavov, Hernandez. Duncan has only fought unranked opponents.' },
    ], insight: 'Dolidze brings experience and wrestling that Duncan hasn\'t faced yet. Duncan brings youth, reach, and momentum. The key is whether Duncan can stay standing and use his reach, or if Dolidze takes it to the ground and controls.' },
    distribuicao_vitorias: { ...analisePT.full_analysis.distribuicao_vitorias, insight: 'Both are finishers with different profiles. Dolidze is more versatile: 53% KO, 20% submission, 27% decision. Duncan is a natural knockout artist: 77% KO. Dolidze\'s versatility (can knock out or submit) is an advantage, but Duncan\'s KO volume (10 in 13 wins) is impressive.' },
    danger_zones: { zones: [
      { rounds: 'R1', danger_level: 7, danger_label: 'DUNCAN ADVANTAGE', color: 'green', title: 'The Initial Explosion', description: 'Duncan comes off two knockouts in the early rounds (Anders in R1, Marco Tulio in R2). His explosiveness and confidence are at their peak. If he connects early with his reach advantage, the fight could be over. Dolidze also finished Holland in R1 (TKO by injury), so both are dangerous here.' },
      { rounds: 'R2', danger_level: 6, danger_label: 'EVEN', color: 'gold', title: 'Wrestling Enters the Chat', description: 'If the fight reaches R2, Dolidze will likely intensify the wrestling. R2 will be the test of Duncan\'s takedown defense (58%). If Dolidze can control on the ground, the dynamic shifts. If Duncan defends, he stays ahead in the striking.' },
      { rounds: 'R3', danger_level: 5, danger_label: 'DUNCAN ADVANTAGE', color: 'green', title: 'Youth & Gas', description: 'Dolidze showed cardio problems against Hernandez in R4. Even in 3 rounds, wrestling fatigue could weigh in the third. Duncan, 7 years younger, tends to have more gas to push and look for a late finish.' },
    ] },
    intangiveis: { items: [
      { icon: 'MapPin', title: 'Home Crowd', fighter: 'Duncan', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Duncan fights at home in the O2 Arena. The British crowd will support him intensely. For a rising fighter, that energy could fuel the best performance of his career.' },
      { icon: 'TrendingUp', title: 'Knockout Momentum', fighter: 'Duncan', risk_level: 'POSITIVE', risk_color: 'green', description: 'Duncan is coming off two consecutive knockouts. Confidence in his power is through the roof. When a fighter is in that zone, the shots are more committed and dangerous.' },
      { icon: 'Brain', title: 'High-Level Experience', fighter: 'Dolidze', risk_level: 'POSITIVE', risk_color: 'green', description: 'Dolidze has faced Vettori, Holland, Imavov, Hernandez, Smith. Experience against elite is a valuable asset. Duncan has never faced anyone of this caliber.' },
      { icon: 'Clock', title: 'Age: 37 vs 30', fighter: 'Duncan', risk_level: 'POSITIVE', risk_color: 'green', description: 'The 7-year gap is significant. Dolidze is at the end of his career while Duncan is in his athletic prime. Reflexes, recovery, and explosiveness favor the younger man.' },
      { icon: 'AlertTriangle', title: 'Dolidze\'s Cardio', fighter: 'Dolidze', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Dolidze was submitted in R4 by Hernandez, showing endurance issues in long fights. If he can\'t get the takedown early, his gas could fail in R3.' },
    ] },
    caminhos_vitoria: {
      fighter1: { nome: 'Dolidze', total_probability: 40, scenarios: [
        { name: 'Wrestling & Control', probability: 18, method: 'Unanimous Decision', description: 'Dolidze uses wrestling to control Duncan on the ground, accumulates control time and wins on points. Duncan\'s 58% takedown defense may not be enough.' },
        { name: 'Power Knockout', probability: 12, method: 'KO/TKO R1-R2', description: 'Dolidze finds an opening in Duncan\'s striking and lands something heavy. He has 8 career KOs (53%) and real power.' },
        { name: 'Grappler\'s Submission', probability: 10, method: 'Submission R2-R3', description: 'Dolidze takes it to the ground and finds a submission. With 3 career submissions and a sambo background, the ground is favorable territory.' },
      ] },
      fighter2: { nome: 'Duncan', total_probability: 58, scenarios: [
        { name: 'Explosive Knockout', probability: 25, method: 'KO/TKO R1-R2', description: 'Duncan uses his 79-inch reach to connect from long range. With two consecutive knockouts and peak confidence, he could end the fight early.' },
        { name: 'Volume & Distance', probability: 20, method: 'Unanimous Decision', description: 'Duncan uses reach to maintain distance, defends enough takedowns and wins on points with strike volume and movement.' },
        { name: 'TKO by Accumulation', probability: 13, method: 'TKO R2-R3', description: 'Duncan hurts Dolidze on the feet and accumulates damage throughout the rounds. Dolidze\'s cardio fails and the referee stops it.' },
      ] },
    },
    previsao_final: {
      ...analisePT.full_analysis.previsao_final, predicted_method: 'Unanimous Decision', confidence_label: 'MEDIUM',
      explanation: 'This is a balanced fight with contrasting styles. Duncan has the advantage of youth (7 years younger), reach (3 inches more), momentum (3 straight wins), and home crowd. Dolidze brings elite experience and superior wrestling. The key is Duncan\'s takedown defense: if he stays standing, reach and volume will dominate. If Dolidze takes it down, he can control. I see Duncan maintaining enough distance to win on points, but this fight could go either way.',
      x_factor: { title: 'Duncan\'s First Real Test', description: 'Duncan has never faced anyone of Dolidze\'s caliber. The Georgian, #11 in the rankings, has beaten Vettori, Holland, and Smith. If Duncan feels the step-up pressure, he could hesitate in exchanges and open space for Dolidze\'s wrestling.' },
      upset_alert: { title: 'The Georgian\'s Wrestling', description: 'Dolidze averages 2.10 takedowns per 15 min and Duncan has just 58% defense. If the Georgian implements his wrestling gameplan from the start, he could control the entire fight on the ground.' },
    },
    o_que_observar: { points: [
      { num: 1, title: 'Duncan\'s Reach', icon: 'Target', description: 'Duncan has a 79-inch reach versus Dolidze\'s 76 inches. Those 3 extra inches could be decisive if Duncan uses the jab and straight rights from distance to keep Dolidze away from the clinch and takedown.' },
      { num: 2, title: 'Dolidze\'s Takedowns', icon: 'Shield', description: 'Dolidze averages 2.10 takedowns per 15 min and will look to take the fight to the ground. Duncan\'s takedown defense (58%) will be seriously tested for the first time. Watch the early attempts.' },
      { num: 3, title: 'Duncan\'s Power in the Opening Minutes', icon: 'Zap', description: 'Duncan comes off two consecutive knockouts. If he connects early with the reach advantage, confidence and momentum could make the fight one-sided. Watch if he enters aggressive or cautious.' },
      { num: 4, title: 'Dolidze\'s Cardio in R3', icon: 'Activity', description: 'Dolidze was submitted in R4 against Hernandez. If the fight reaches the third round, watch if Dolidze starts to slow down. Fatigue could turn R3 into Duncan territory.' },
      { num: 5, title: 'Duncan\'s Reaction to the Step-Up', icon: 'Brain', description: 'This is the biggest test of Duncan\'s UFC career. Watch how he reacts in the opening minutes against an opponent of a much higher level than his previous ones. Nerves or excessive respect could open doors for Dolidze.' },
    ] },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'MIDDLEWEIGHT FIRE TEST', content: 'DOLIDZE vs DUNCAN\nUFC London | Middleweight\n\n15-4 vs 13-2\nThe Georgian veteran\nvs the rising Brit', color: 'red' },
        { slide_number: 2, title: 'DOLIDZE: THE WILDCARD', content: '15-4 career record\n#11 Middleweight\nBeat Holland (TKO R1) and Vettori (UD)\n37 years old, Sambo/Wrestling\nElite-level experience', color: 'red' },
        { slide_number: 3, title: 'DUNCAN: CLD ON THE RISE', content: '13-2 career record\n3 consecutive wins\n2 straight knockouts (Anders, Silva)\n79-inch reach\n30 years old, fighting at home', color: 'blue' },
        { slide_number: 4, title: 'PREDICTION', content: 'DUNCAN by Unanimous Decision\n\nConfidence: MEDIUM\n58% Duncan / 40% Dolidze\n\nReach and momentum\nfavor CLD.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Dolidze vs Duncan is the test CLD needs. Dolidze beat Holland (TKO) and Vettori (decision). Duncan is on a 2-fight KO streak and fighting at home. Who takes it?' },
        { num: '2/4', text: 'The key: Duncan has 79-inch reach and 58% takedown defense. Dolidze averages 2.10 TDs per 15 min. If Duncan stays standing, he dominates. If Dolidze takes it down, he controls.' },
        { num: '3/4', text: 'The detail nobody mentions: Duncan has NEVER faced anyone of Dolidze\'s level. All his UFC opponents were unranked. This is the first real test.' },
        { num: '4/4', text: 'Prediction: Duncan by decision. Reach, youth, and momentum favor CLD. But Dolidze is too dangerous to ignore.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Christian Leroy Duncan has never faced someone who beat Kevin Holland and Marvin Vettori. This test is different.' },
        { time: '10-25s', title: 'Context', text: 'Dolidze, 37, former top 10, sambo and wrestling. Duncan, 30, 3 straight wins, 2 knockouts, 79-inch reach. Veteran vs youth in London.' },
        { time: '25-40s', title: 'Analysis', text: 'If it stays standing, Duncan dominates with reach. If Dolidze takes it down, he controls. Duncan\'s takedown defense (58%) is the key variable.' },
        { time: '40-55s', title: 'Prediction', text: 'Duncan by decision. The momentum, the crowd, and the reach favor CLD. But Dolidze could surprise with wrestling.' },
      ],
      tiktok: [
        { hook: 'This guy has NEVER faced anyone on the level of Saturday\'s opponent.', body: 'CLD has 3 straight wins, 2 knockouts, and fights at home in London. But Roman Dolidze beat Kevin Holland and Marvin Vettori. Duncan\'s first real test. Can he handle it?', cta: 'Duncan or Dolidze? Comment!' },
        { hook: '79 inches of reach against the best wrestling CLD has ever faced.', body: 'Duncan has 3 inches more reach than Dolidze. But Dolidze averages 2.10 takedowns per 15 min. If it goes to the ground, Duncan is in trouble. If it stays standing, Duncan dominates. Simple as that.', cta: 'Standing or on the ground? Where does it get decided? Comment!' },
      ],
      headlines: ['Dolidze vs Duncan: The First Real Test for CLD in the UFC', 'Can Christian Leroy Duncan Beat the Man Who Defeated Holland and Vettori?', 'The Georgian Wrestler vs the British Striker: Middleweight Preview', 'Duncan at Home, Dolidze with Experience: Who Wins the Style Clash?', 'UFC London: Is Duncan\'s Reach Enough to Neutralize Dolidze?'],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...analisePT.full_analysis.radar_apostador!.odds, source: 'Average across sportsbooks (March 2026)' },
      edges: [
        { icon: 'Target', titulo: 'Duncan\'s Superior Reach', stat_headline: '79-INCH REACH VS DOLIDZE\'S 76 INCHES', contexto: 'Duncan has 3 extra inches of range. Can use jab and straights from distance to keep Dolidze away.', implicacao_aposta: 'Favors Duncan on the feet. If the fight stays in the striking, Duncan has a structural advantage.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Dolidze\'s Wrestling vs Duncan\'s TDD', stat_headline: 'DOLIDZE: 2.10 TDS/15MIN. DUNCAN: 58% TDD', contexto: 'Dolidze is an active wrestler and Duncan has never faced this level of ground pressure.', implicacao_aposta: 'If you think Dolidze takes it down, he can control and win.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'TrendingUp', titulo: 'Duncan\'s Momentum', stat_headline: '3 CONSECUTIVE WINS, 2 STRAIGHT KNOCKOUTS', contexto: 'Duncan is on the rise with knockouts over Anders and Marco Tulio. Confidence and rhythm at their peak.', implicacao_aposta: 'Favors Duncan by finish. The recent momentum is real.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Dolidze\'s Experience', stat_headline: '#11 MW, HAS BEATEN VETTORI, HOLLAND, AND SMITH', contexto: 'Dolidze has elite experience Duncan doesn\'t have. Knows how to fight under pressure.', implicacao_aposta: 'Don\'t rule out Dolidze. He has beaten better fighters than Duncan.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Duncan\'s Home Factor', stat_headline: 'CLD FIGHTS IN LONDON WITH BRITISH CROWD', contexto: 'Duncan fighting at home with full crowd support. Extra energy in decisive moments.', implicacao_aposta: 'Could influence close rounds. Judges feel the arena pressure.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Dolidze (+120)', odds: '+120', confianca: 'baixa', edge_vs_mercado: 'Dolidze as a slight underdog has value. He has beaten names superior to Duncan.', raciocinio: 'Dolidze\'s wrestling and experience could be too much for Duncan. As an underdog at +120, the value is reasonable.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-180', confianca: 'media', raciocinio: 'Dolidze tends to longer fights when using wrestling. Duncan has quick knockouts but against inferior opponents.' },
        { tipo: 'Method', pick: 'Duncan by KO/TKO', odds: '+150', confianca: 'baixa', raciocinio: 'If Duncan stays standing and uses his reach, a knockout is possible. But it\'s the riskiest scenario given Dolidze\'s wrestling.' },
      ],
      armadilha: { titulo: 'Trap: Overrating Duncan\'s Momentum', descricao: 'Duncan comes off impressive knockouts, but against unranked opponents. Dolidze is an enormous step up in quality. Don\'t bet heavily on Duncan based solely on recent momentum without considering the opposition level.' },
      disclaimer: 'Statistical analysis for informational purposes. Gamble responsibly.',
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  const analise = lang === 'en' ? analiseEN : analisePT;
  return <FullAnalysisView analise={analise} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
