import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const data: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'petrino-vs-asplund',
  evento_id: null,
  slug: 'petrino-vs-asplund',
  titulo: 'Petrino vs Asplund: O Prospect Brasileiro Contra a Maior Transformacao do MMA',
  subtitulo: 'Ranking contra narrativa no peso-pesado',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '', envergadura: '', idade: 0, academia: '' },
      fighter2: { altura: '', envergadura: '', idade: 0, academia: '' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'TKO ou Submissao',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Vitor Petrino',
    record: '13-2-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Steven Asplund',
    record: '7-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Pesado (265 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 sections)
  // ===========================
  full_analysis: {
    // -------------------------------------------------
    // 1. HERO SECTION
    // -------------------------------------------------
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
      categoria_peso: 'Peso Pesado (265 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Ranking vs. Redencion',
      tagline_sub: 'O prospect brasileiro ranqueado contra o homem que perdeu 300 libras para chegar ao UFC',
      fighter1: {
        nome_completo: 'Vitor "Icao" Petrino',
        apelido: 'Icao',
        sobrenome: 'Petrino',
        record: '13-2-0',
        ranking: '#15 HW',
        info_extra: 'Curitiba, PR, Brasil | 28 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Steven "Concrete" Asplund',
        apelido: 'Concrete',
        sobrenome: 'Asplund',
        record: '7-1-0',
        ranking: 'Sem Ranking',
        info_extra: 'Minneapolis, Minnesota, EUA | 27 anos',
        imagem_fullbody_url: null,
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Salto de Divisao Contra a Estreia Explosiva</h3>
        <p>Essa luta representa dois caminhos completamente diferentes para o peso-pesado do UFC. <strong class="text-ufc-red">Petrino</strong> chegou ao UFC como um dos prospectos mais perigosos dos medio-pesados, emplacou quatro vitorias consecutivas incluindo nocautes brutais, mas sofreu duas derrotas seguidas que o forcaram a subir de divisao. Nos pesados, ele ja venceu duas seguidas, incluindo um KO viral sobre Thomas Petersen no UFC Rio, e agora e o #15 do ranking.</p>
        <p><strong class="text-blue-400">Asplund</strong> e uma historia que parece roteiro de filme. Ele pesava mais de 525 libras (238 kg) ha menos de cinco anos. Perdeu mais de 260 libras, comecou a treinar MMA do zero, e em dezembro de 2025 fez sua estreia no UFC destruindo Sean Sharaf com 170 golpes significativos em menos de 9 minutos, batendo o recorde historico de striking para peso-pesado em tres rounds.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Por Que Essa Luta Existe</h3>
        <p><strong class="text-ufc-red">Petrino</strong> originalmente enfrentaria Kennedy Nzechukwu, mas Nzechukwu se lesionou e <strong class="text-blue-400">Asplund</strong> aceitou como substituto. Para Petrino, e a chance de emplacar tres vitorias seguidas nos pesados e subir no ranking. Para Asplund, e o maior teste de carreira: seu primeiro oponente ranqueado, um lutador com grappling de elite e poder de nocaute em ambas as maos.</p>
        <p>Existe um fator crucial que pode mudar tudo: <strong class="text-ufc-red">Petrino</strong> revelou publicamente que esta com uma lesao significativa na mao direita. Em entrevista, ele declarou: "Nao consigo usar minha mao direita." Para um lutador que depende tanto do striking e do ground-and-pound, isso pode limitar seu arsenal ofensivo de maneira seria.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p>Para <strong class="text-ufc-red">Petrino</strong>, uma vitoria consolida sua posicao no ranking e prova que a mudanca para peso-pesado foi a decisao certa. Tres vitorias seguidas nos pesados o colocam na conversa por lutas maiores no segundo semestre de 2026. Para <strong class="text-blue-400">Asplund</strong>, derrotar um oponente ranqueado em apenas sua segunda luta no UFC seria historico. Significaria que a transformacao fisica mais impressionante do MMA moderno ja produziu um legítimo peso-pesado competitivo.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#15 HW, pode subir com vitoria', fighter2: 'Sem ranking, quer entrar no top 15' },
        { dimensao: 'Objetivo', fighter1: 'Consolidar-se nos pesados', fighter2: 'Provar que pertence ao topo' },
        { dimensao: 'Sequencia', fighter1: '2 vitorias seguidas nos HW', fighter2: '1-0 no UFC (4 vitorias seguidas total)' },
        { dimensao: 'Risco', fighter1: 'Lesao na mao direita, oponente substituto', fighter2: 'Salto de qualidade enorme, pouca experiencia' },
        { dimensao: 'Narrativa', fighter1: 'Ex-LHW buscando se estabelecer no HW', fighter2: 'De 525 lbs ao UFC, historia inspiradora' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O DOMINIO DO GRAPPLER BRASILEIRO',
          subtitulo: 'Petrino usa seu wrestling e ground game superior para controlar Asplund e finalizar ou dominar por decisao.',
          consequencias: [
            {
              tag: 'RANKING',
              texto: 'Sobe de #15 para a faixa de #12-13, se aproximando de lutas contra nomes mais conhecidos na divisao de peso-pesado.',
            },
            {
              tag: 'NARRATIVA',
              texto: 'Tres vitorias seguidas nos pesados confirmam que a mudanca de divisao foi a decisao correta. A fase dificil nos medio-pesados ficou para tras.',
            },
            {
              tag: 'PROXIMA LUTA',
              texto: 'Com tres vitorias consecutivas, pode buscar um oponente no top 10 dos pesados no segundo semestre de 2026.',
            },
          ],
          proxima_luta: 'Possivel luta contra um peso-pesado ranqueado no top 10 no segundo semestre de 2026',
        },
        fighter2_vence: {
          titulo: 'A HISTORIA MAIS IMPROVAVEL DO UFC',
          subtitulo: 'Asplund derrota um oponente ranqueado em apenas sua segunda luta no UFC, provando que a transformacao vai alem da balanca.',
          consequencias: [
            {
              tag: 'HISTORICO',
              texto: 'Se torna um dos poucos lutadores a derrotar um oponente ranqueado em apenas sua segunda luta no UFC. A historia de perda de peso ganha um capitulo competitivo real.',
            },
            {
              tag: 'RANKING',
              texto: 'Pode entrar diretamente no top 15 dos pesados, algo raro para alguem com apenas duas lutas na organizacao.',
            },
            {
              tag: 'HYPE',
              texto: 'O volume de striking combinado com a narrativa pessoal transformaria Asplund em um dos nomes mais populares da divisao. O UFC teria um novo personagem para promover.',
            },
          ],
          proxima_luta: 'Outro oponente ranqueado nos pesados para confirmar que a vitoria nao foi acidente',
        },
      },
    },

    // -------------------------------------------------
    // 3. MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Vitor Petrino',
        color: 'red',
        recent_fights: [
          {
            date: 'Mar 2024',
            opponent: 'Tyson Pedro',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria por pontos dominante, Pedro se aposentou apos a luta.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Anthony Smith',
            result: 'L',
            method: 'Sub R1 (Guilhotina)',
            opponent_rank: 'Veterano Top 15',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Caiu em uma guilhotina apos tentativa de takedown descuidada. Primeira derrota da carreira.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Dustin Jacoby',
            result: 'L',
            method: 'KO R3 (Direto de Direita)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Luta equilibrada ate um direto nuclear de Jacoby no terceiro round. Segunda derrota seguida.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Austen Lane',
            result: 'W',
            method: 'Sub R1 (Mata-Leao)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia nos pesados dominante. Derrubou, controlou e finalizou em 4:16 do primeiro round.',
          },
          {
            date: 'Out 2025',
            opponent: 'Thomas Petersen',
            result: 'W',
            method: 'KO R3 (Uppercut)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute devastador com uppercut no inicio do terceiro round no UFC Rio. Performance of the Night.',
          },
        ],
        full_fight_history: [
          {
            date: 'Mar 2023',
            opponent: 'Anton Turkalj',
            result: 'W',
            method: 'UD',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC. Vitoria dominante, Fight of the Night.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Marcin Prachnio',
            result: 'W',
            method: 'Sub R3',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Primeiro finish por submissao da carreira. Arm-triangle no terceiro round.',
          },
          {
            date: 'Nov 2023',
            opponent: 'Modestas Bukauskas',
            result: 'W',
            method: 'KO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute com um soco de esquerda no segundo round. Em Sao Paulo.',
          },
          {
            date: 'Mar 2024',
            opponent: 'Tyson Pedro',
            result: 'W',
            method: 'UD',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria por pontos dominante.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Anthony Smith',
            result: 'L',
            method: 'Sub R1',
            opponent_rank: 'Veterano Top 15',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Primeira derrota. Guilhotina apos takedown ruim.',
          },
          {
            date: 'Dez 2024',
            opponent: 'Dustin Jacoby',
            result: 'L',
            method: 'KO R3',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocauteado por direto de direita. Candidato a KO do Ano.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Austen Lane',
            result: 'W',
            method: 'Sub R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia nos pesados. Mata-leao dominante.',
          },
          {
            date: 'Out 2025',
            opponent: 'Thomas Petersen',
            result: 'W',
            method: 'KO R3',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Uppercut devastador no UFC Rio.',
          },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'resilient',
        momentum_note: 'Petrino sofreu duas derrotas duras nos medio-pesados contra Smith e Jacoby, mas se reinventou subindo para peso-pesado. Nos pesados, ja sao duas finalizacoes/nocautes em sequencia, incluindo um Performance of the Night. A mudanca de divisao trouxe nova energia, embora os oponentes ate agora tenham sido de nivel baixo. A lesao na mao direita e uma preocupacao real para esta luta.',
      },
      fighter2: {
        nome: 'Steven Asplund',
        color: 'blue',
        recent_fights: [
          {
            date: 'Set 2024',
            opponent: 'Denzel Freeman',
            result: 'L',
            method: 'Sub R2 (Mata-Leao)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Unica derrota profissional. Finalizado no segundo round no LFA.',
          },
          {
            date: 'Jan 2025',
            opponent: 'Hammer Morton',
            result: 'W',
            method: 'TKO R3 (Socos)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Voltou a vencer no LFA apos a derrota.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Raiden Kovacs',
            result: 'W',
            method: 'TKO R2 (Socos e Cotoveladas)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Segundo TKO seguido no LFA. Chamou atencao dos scouts.',
          },
          {
            date: 'Set 2025',
            opponent: 'Anthony Guarascio',
            result: 'W',
            method: 'TKO R1 (0:16)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute em 16 segundos no Contender Series. Terceiro mais rapido da historia do programa. Ganhou contrato do UFC.',
          },
          {
            date: 'Dez 2025',
            opponent: 'Sean Sharaf',
            result: 'W',
            method: 'TKO R2 (Socos)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia no UFC. 170 golpes significativos em menos de 9 minutos, recorde historico para HW em 3 rounds. Fight of the Night.',
          },
        ],
        full_fight_history: [
          {
            date: 'Jan 2024',
            opponent: 'Jose Valdez',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute rapido no LFA. Inicio da sequencia de vitorias.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Taylor Gonzales',
            result: 'W',
            method: 'Decisao',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Unica vitoria por decisao na carreira. Luta completa no LFA.',
          },
          {
            date: 'Set 2024',
            opponent: 'Denzel Freeman',
            result: 'L',
            method: 'Sub R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Unica derrota. Finalizado por mata-leao.',
          },
          {
            date: 'Jan 2025',
            opponent: 'Hammer Morton',
            result: 'W',
            method: 'TKO R3',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Voltou com vitoria no LFA.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Raiden Kovacs',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'TKO por socos e cotoveladas no LFA.',
          },
          {
            date: 'Set 2025',
            opponent: 'Anthony Guarascio',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Contender Series. 16 segundos.',
          },
          {
            date: 'Dez 2025',
            opponent: 'Sean Sharaf',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia UFC. Recorde de strikes para HW.',
          },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Asplund vem de quatro vitorias consecutivas, todas por finalizacao de strikes, incluindo o nocaute em 16 segundos no Contender Series e uma estreia no UFC onde bateu o recorde de golpes significativos para peso-pesado. O volume de strikes e impressionante, mas a qualidade dos oponentes ate agora foi muito baixa. Esta luta contra Petrino e um salto enorme de nivel.',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Petrino',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '6W-2L (75%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Asplund',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Petrino e Asplund nao possuem oponentes em comum. Petrino tem oito lutas no UFC contra oponentes variados nos medio-pesados e pesados, enquanto Asplund tem apenas uma luta na organizacao. O salto de qualidade para Asplund e significativo: ele nunca enfrentou ninguem do calibre de Petrino.',
    },

    // -------------------------------------------------
    // 5. OPONENTE COMUM (null - sem oponentes em comum)
    // -------------------------------------------------
    oponente_comum: null,

    // -------------------------------------------------
    // 6. COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 2.72,
          valueB: 19.31,
          maxVal: 22,
          format: 'decimal',
          note: 'Numero de Asplund e inflado por ter apenas uma luta no UFC, mas o volume e real: 170 golpes em menos de 9 minutos.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 45,
          valueB: 64,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 2.6,
          valueB: 8.88,
          maxVal: 12,
          format: 'decimal',
          reverseWinner: true,
          note: 'Asplund absorveu muitos golpes contra Sharaf, uma preocupacao contra o poder de Petrino.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 47,
          valueB: 71,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 3.25,
          valueB: 0.0,
          maxVal: 5,
          format: 'decimal',
          note: 'Petrino e ativo no takedown. Asplund nunca tentou um takedown no UFC.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 58,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 57,
          valueB: 15,
          maxVal: 100,
          format: 'percent',
          note: 'Asplund defendeu apenas 15% dos takedowns. Ponto critico contra o wrestling de Petrino.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '28 anos',
          fighter2: '27 anos',
          note: null,
        },
        {
          label: 'Altura',
          fighter1: '1.88m (6\'2")',
          fighter2: '1.96m (6\'5")',
          note: 'Asplund tem 8 cm de vantagem em altura.',
        },
        {
          label: 'Envergadura',
          fighter1: '197 cm (77.5")',
          fighter2: '198 cm (78")',
          note: 'Envergadura praticamente identica apesar da diferenca de altura.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: null,
        },
        {
          label: 'Academia',
          fighter1: 'CM System (Cristiano Marcello)',
          fighter2: 'Minnesota Top Team',
          note: null,
        },
        {
          label: 'Peso (ultimo pesagem)',
          fighter1: '249 lbs (113 kg)',
          fighter2: '261 lbs (118 kg)',
          note: null,
        },
      ],
    },

    // -------------------------------------------------
    // 7. PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        {
          label: 'Wrestling Ofensivo',
          valueA: 82,
          valueB: 25,
          labelA: 'Muito Bom',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Petrino media 3.25 takedowns por 15 minutos com 58% de precisao. Asplund nunca tentou um takedown no UFC e tem apenas 15% de defesa. Essa e a maior diferenca tecnica da luta.',
        },
        {
          label: 'Volume de Striking',
          valueA: 50,
          valueB: 92,
          labelA: 'Medio',
          labelB: 'Excelente',
          advantage: 'fighter2',
          advantage_note: 'Asplund disparou 292 tentativas de golpes significativos em menos de 9 minutos contra Sharaf. Petrino tem volume mais moderado com 2.72 SLpM.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 78,
          valueB: 30,
          labelA: 'Muito Bom',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Petrino tem 3 submissoes na carreira, incluindo mata-leao e arm-triangle. Sua unica derrota por submission veio de guilhotina contra Anthony Smith, mas ele e o atacante no chao. Asplund foi finalizado por mata-leao no LFA e nao demonstrou defesa de submissao consistente.',
        },
        {
          label: 'Defesa / QI de Luta',
          valueA: 55,
          valueB: 40,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Petrino tem mais experiencia e leitura de luta com 15 lutas profissionais e 8 no UFC. Asplund tem apenas 8 lutas profissionais e uma no UFC. A diferenca de experiencia e significativa.',
        },
        {
          label: 'Cardio / Gas',
          valueA: 58,
          valueB: 65,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Asplund manteve ritmo altíssimo por quase 9 minutos contra Sharaf, disparando golpes sem parar. Petrino mostrou sinais de cansaco contra Petersen e Jacoby nas lutas que chegaram ao terceiro round.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 80,
          valueB: 75,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter1',
          advantage_note: 'Ambos tem poder real. Petrino nocauteou Bukauskas com um soco e Petersen com um uppercut devastador. Asplund finalizou 6 dos 7 oponentes por strikes. Leve vantagem Petrino pela precisao e timing.',
        },
      ],
      insight: 'A luta se resume a onde ela acontece. Se Petrino levar para o chao, ele tem vantagem esmagadora no grappling e pode finalizar ou dominar por controle. Em pe, Asplund tem volume superior e cardio para manter pressao, mas Petrino tem mais poder concentrado e timing. A defesa de takedown de Asplund (15%) e o numero mais preocupante de toda a analise.',
    },

    // -------------------------------------------------
    // 8. DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Petrino',
        ko_tko: { count: 7, percent: 54 },
        submission: { count: 3, percent: 23 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      fighter2: {
        nome: 'Asplund',
        ko_tko: { count: 6, percent: 86 },
        submission: { count: 0, percent: 0 },
        decision: { count: 1, percent: 14 },
        total_wins: 7,
      },
      insight: 'Petrino e o lutador mais completo em termos de metodos de vitoria: ele pode nocautear, finalizar no chao ou vencer por pontos. Sete dos seus 13 triunfos vieram por KO/TKO, mas ele tambem tem 3 submissoes e 3 decisoes. Asplund e quase exclusivamente um finalizador por strikes, com 6 dos 7 triunfos por KO/TKO. Ele nunca venceu por submissao e tem apenas uma vitoria por decisao. Essa dependencia de um unico caminho pode ser um problema contra um lutador que pode mudar a dinamica levando a luta para o chao.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM PETRINO',
          color: 'red',
          title: 'O Territorio do Grappler',
          description: 'O primeiro round e onde Petrino e mais perigoso. Ele pode buscar o takedown logo nos primeiros minutos, quando ainda tem energia total. Contra Austen Lane, levou a luta para o chao cedo e finalizou em 4:16. A defesa de takedown de Asplund (15%) sugere que Petrino pode encontrar o chao rapidamente. Se derrubar, Petrino tem ground-and-pound pesado e submissoes perigosas. Asplund precisa sobreviver este round em pe.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Decisivo',
          description: 'Se a luta chegar ao segundo round em pe, as coisas ficam mais equilibradas. E aqui que o volume de Asplund pode comecar a fazer diferenca, especialmente se Petrino estiver com a mao direita limitada. Contra Sharaf, foi no segundo round que Asplund finalizou. Mas se Petrino controlar o primeiro round no chao e Asplund estiver cansado dos scrambles, Petrino pode buscar outra queda ou finish por ground-and-pound.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM ASPLUND',
          color: 'green',
          title: 'O Gas Decide',
          description: 'Se a luta chegar ao terceiro round com ambos em pe, Asplund tem a vantagem. Petrino mostrou sinais de cansaco em rounds finais contra Jacoby e Petersen. Asplund, apesar de pesar mais de 250 libras, manteve ritmo alto por quase 9 minutos na estreia. Se Petrino nao conseguiu finalizar antes, o volume de Asplund pode supera-lo aqui. Porem, Petrino tambem tem nocautes no terceiro round contra Bukauskas e Petersen.',
        },
      ],
    },

    // -------------------------------------------------
    // 10. INTANGIVEIS
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'AlertTriangle',
          title: 'Lesao na Mao Direita',
          fighter: 'Petrino',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Petrino declarou publicamente que nao consegue usar a mao direita. Em um esporte onde cada soco importa, isso limita significativamente seu arsenal de striking e ground-and-pound. Se a luta ficar em pe, ele tera que depender mais da esquerda e dos takedowns.',
        },
        {
          icon: 'Target',
          title: 'Vulnerabilidade a Submissoes',
          fighter: 'Asplund',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Asplund foi finalizado por mata-leao por Denzel Freeman no LFA. Contra um especialista em grappling como Petrino, que tem 3 submissoes na carreira, qualquer momento no chao pode ser terminal. Asplund precisa manter a luta em pe a todo custo.',
        },
        {
          icon: 'TrendingUp',
          title: 'Momentum nos Pesados',
          fighter: 'Petrino',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Petrino esta 2-0 desde que subiu para peso-pesado, com um finish por submissao e um nocaute viral. A mudanca de divisao parece ter rejuvenescido sua carreira apos duas derrotas nos medio-pesados.',
        },
        {
          icon: 'Zap',
          title: 'Volume Historico de Strikes',
          fighter: 'Asplund',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Asplund bateu o recorde de golpes significativos para peso-pesado em tres rounds com 170 acertados em sua estreia no UFC. Esse volume e praticamente inedito para a divisao e pode sobrecarregar qualquer oponente que nao consiga quebrar o ritmo.',
        },
        {
          icon: 'Brain',
          title: 'Salto de Qualidade de Oponente',
          fighter: 'Asplund',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Esta e de longe a luta mais dificil da carreira de Asplund. Ele nunca enfrentou alguem com wrestling ofensivo, submissoes perigosas e experiencia no UFC como Petrino. O salto de nivel pode expor lacunas no jogo de Asplund que nao apareceram contra oponentes inferiores.',
        },
        {
          icon: 'Shield',
          title: 'Queixo Questionavel',
          fighter: 'Petrino',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Petrino foi nocauteado por Dustin Jacoby com um unico direto de direita. Nos pesados, onde o poder e ainda maior, qualquer golpe limpo de Asplund pode apagar as luzes. A questao e se Asplund consegue encontrar a abertura.',
        },
        {
          icon: 'Clock',
          title: 'Oponente Substituto',
          fighter: 'Asplund',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'Asplund aceitou essa luta como substituto apos Kennedy Nzechukwu se lesionar. Isso significa preparacao mais curta e menos tempo para estudar Petrino, mas Asplund e jovem e mostrou adaptabilidade em sua estreia.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Petrino',
        total_probability: 62,
        scenarios: [
          {
            name: 'Dominio no Chao',
            probability: 28,
            method: 'Sub R1-R2 ou Decisao',
            description: 'Petrino entra com takedowns logo no inicio e leva Asplund para o chao, onde a defesa de takedown de 15% praticamente garante que ele vai conseguir. No solo, usa ground-and-pound com a mao esquerda e busca submissoes. Asplund, que ja foi finalizado por mata-leao, pode cair em uma submissao cedo.',
          },
          {
            name: 'Pressao e TKO por Ground-and-Pound',
            probability: 20,
            method: 'TKO R1-R2 (Ground-and-Pound)',
            description: 'Similar ao cenario anterior, mas ao inves de buscar a submissao, Petrino derruba e usa ground-and-pound pesado para forcar a parada do arbitro. Contra Lane, ele dominou no chao antes de finalizar. Contra Petersen, o ground-and-pound foi devastador antes do KO no terceiro.',
          },
          {
            name: 'Nocaute em Pe',
            probability: 14,
            method: 'KO R1-R3',
            description: 'Mesmo com a mao direita lesionada, Petrino ainda pode encontrar um golpe limpo. Ele nocauteou Bukauskas com a esquerda e tem poder real em ambas as maos. Se Asplund trocar abertamente como fez contra Sharaf, Petrino pode punir com um counter preciso.',
          },
        ],
      },
      fighter2: {
        nome: 'Asplund',
        total_probability: 35,
        scenarios: [
          {
            name: 'Tsunami de Volume',
            probability: 15,
            method: 'TKO R2-R3 (Socos)',
            description: 'Asplund mantem a luta em pe, defende os takedowns de Petrino (ou se levanta rapidamente quando cai), e comeca a sobrecarregar com volume. Se disparar 170+ golpes significativos como fez contra Sharaf, o acumulo de dano pode levar a uma parada no segundo ou terceiro round.',
          },
          {
            name: 'Nocaute Precoce',
            probability: 10,
            method: 'KO R1-R2',
            description: 'Asplund encontra um golpe limpo cedo, aproveitando a agressividade de Petrino ao buscar o takedown. Petrino foi nocauteado por Jacoby com um unico direto de direita. Se Asplund acertar com precisao, pode acabar rapido.',
          },
          {
            name: 'Vitoria por Pontos Pelo Volume',
            probability: 10,
            method: 'Decisao Unanime',
            description: 'Cenario menos provavel, mas possivel. Asplund defende takedowns suficientes e usa o volume superior para vencer rounds em pe. Precisaria de uma performance defensiva muito acima do que ja mostrou na carreira.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // 12. PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Vitor Petrino',
      winner_side: 'fighter1',
      predicted_method: 'Submissao ou TKO por Ground-and-Pound',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'A vantagem de Petrino no grappling e a estatistica mais gritante dessa luta. Asplund tem apenas 15% de defesa de takedown e ja foi finalizado por submissao. Petrino media 3.25 takedowns por 15 minutos com 58% de precisao, e nos pesados ja mostrou dominio completo no chao contra Lane. Mesmo com a mao direita lesionada, Petrino pode direcionar a luta para o takedown e controlar no solo, onde a diferenca tecnica e enorme. A grande incognita e se Asplund consegue manter distancia e usar o volume em pe antes de Petrino achar o clinch ou o takedown. Se a luta ficar exclusivamente em pe, Asplund tem chance real com seu volume historico. Mas e improvavel que Petrino deixe isso acontecer.',
      x_factor: {
        title: 'A Mao Direita de Petrino',
        description: 'Petrino admitiu publicamente que nao consegue usar a mao direita. Isso muda completamente o calculo da luta. Se ele nao conseguir socar com a direita, seu striking fica limitado e o ground-and-pound perde metade da eficacia. Isso pode forcar Petrino a depender quase exclusivamente de takedowns e submissoes, o que e viavel dado o gap de grappling, mas remove a ameaca de nocaute que normalmente abre espaco para os takedowns.',
      },
      upset_alert: {
        title: 'Upset Alert: Asplund por TKO',
        description: 'Se Asplund conseguir manter a luta em pe nos primeiros dois minutos e comecar a soltar o volume, Petrino pode ficar sobrecarregado. O brasileiro ja mostrou vulnerabilidade no striking contra Jacoby, e a lesao na mao limita suas opcoes ofensivas. Um Asplund agressivo com o jab e combinacoes pode criar problemas serios se os takedowns nao funcionarem.',
      },
      probabilities: {
        fighter1: { nome: 'Petrino', percent: 62 },
        fighter2: { nome: 'Asplund', percent: 35 },
        draw: 3,
      },
      value_picks: {
        moneyline: {
          pick: 'Petrino (-225)',
          reasoning: 'A vantagem no grappling e significativa e Asplund tem falhas estruturais claras (15% TD Def, ja finalizado). Petrino -225 nao e um preco absurdo considerando a diferenca de nivel.',
        },
        method: {
          pick: 'Petrino por Submissao (+400 estimado)',
          reasoning: 'Com a mao direita lesionada, Petrino pode ir direto para o takedown e buscar a submissao no chao. Asplund ja foi finalizado por mata-leao e Petrino tem 3 submissoes na carreira. O preco provavelmente sera atrativo.',
        },
        over_under: {
          pick: 'Under 2.5 Rounds',
          rounds: 2.5,
          reasoning: 'Ambos os lutadores tendem a encerrar lutas cedo. Petrino finalizou Lane no R1 e nocauteou Petersen no inicio do R3. Asplund tem 6 vitorias por KO/TKO. Alta probabilidade de finish antes dos 15 minutos.',
        },
        best_value: 'Petrino por Submissao. A lesao na mao direita empurra ele para o grappling, e Asplund tem a maior vulnerabilidade da luta no chao.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'A Defesa de Takedown de Asplund',
          icon: 'Target',
          description: 'O numero mais critico da luta: 15% de defesa de takedown. Observe se Asplund conseguiu melhorar esse fundamento desde a luta contra Sharaf. Se Petrino conectar o primeiro takedown com facilidade, pode ser sinal de que a luta vai ser unilateral no chao. Se Asplund defender, tudo muda.',
        },
        {
          num: 2,
          title: 'Como Petrino Lida Com a Mao Direita',
          icon: 'AlertTriangle',
          description: 'Petrino revelou que nao consegue usar a mao direita. Fique atento se ele evita socos com a direita, se faz caretas ao usar a mao, ou se vai direto para clinch e takedowns sem tentar trocar. Se ele nao usar a direita de jeito nenhum, Asplund pode explorar o lado esquerdo da guarda.',
        },
        {
          num: 3,
          title: 'O Volume de Asplund nos Dois Primeiros Minutos',
          icon: 'Activity',
          description: 'Asplund precisa estabelecer volume cedo para manter Petrino honesto em pe. Se ele sair disparando jabs e combinacoes desde o inicio, pode dificultar a entrada de Petrino para o clinch. Se ficar passivo esperando, Petrino vai achar o takedown.',
        },
        {
          num: 4,
          title: 'O Chao Como Zona de Perigo Total',
          icon: 'Shield',
          description: 'Se a luta for para o chao, observe a capacidade de Asplund de se levantar ou criar distancia. Ele foi finalizado por mata-leao no LFA e Petrino e extremamente perigoso no ground-and-pound e nas submissoes. Qualquer segundo no chao e territorio de Petrino.',
        },
        {
          num: 5,
          title: 'A Pressao no Terceiro Round',
          icon: 'Clock',
          description: 'Se a luta chegar ao terceiro round, observe o cardio de ambos. Petrino mostrou sinais de cansaco em lutas longas nos medio-pesados, enquanto Asplund manteve ritmo alto por 9 minutos na estreia. Se Petrino nao finalizar antes, o terceiro round pode ser o momento de Asplund.',
        },
      ],
    },

    // -------------------------------------------------
    // 14. CREATOR KIT
    // -------------------------------------------------
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'PETRINO vs ASPLUND',
          content: 'UFC Fight Night: Emmett vs Vallejos\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Pesado\n3 Rounds',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'VITOR PETRINO',
          content: '13-2-0 | #15 HW\n28 anos | Curitiba, PR\n\n2-0 nos pesados\n7 KO/TKO | 3 Sub\n3.25 TD por 15 min\n\nALERTA: Mao direita lesionada',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'STEVEN ASPLUND',
          content: '7-1-0 | Sem Ranking\n27 anos | Minneapolis, MN\n\nDe 525 lbs ao UFC\n170 golpes na estreia (recorde HW)\n6 vitorias por KO/TKO\n\nALERTA: 15% de defesa de takedown',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'CHAVE DA LUTA',
          content: 'PETRINO: Wrestling + Submissoes\nMedia 3.25 TD/15min com 58% de precisao\n3 submissoes na carreira\n\nASPLUND: Volume em Pe\n170 sig strikes em 9 min vs Sharaf\n64% de precisao\n\nONDE ACONTECE? = QUEM VENCE',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'PETRINO vence\nSubmissao ou TKO (Ground-and-Pound)\nConfianca: MEDIA-ALTA\n\nPerigo: lesao na mao pode limitar\no striking e o ground-and-pound\n\nUpset: Asplund por TKO se\nmanter a luta em pe',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/6',
          text: 'Petrino vs Asplund no UFC Fight Night de sabado e a luta do ranking contra a narrativa. Petrino e #15 HW com 3.25 TD/15min. Asplund e o cara que pesava 525 lbs e bateu o recorde de strikes na estreia. Mas tem um detalhe que muda tudo...',
        },
        {
          num: '2/6',
          text: 'Petrino revelou que NAO CONSEGUE USAR A MAO DIREITA. Isso e enorme. Ele depende do striking e ground-and-pound, e perdeu metade do arsenal. Vai ter que ir pro takedown mais cedo do que gostaria.',
        },
        {
          num: '3/6',
          text: 'O numero que define essa luta: 15%. E a defesa de takedown de Asplund. Contra um cara que media 3.25 takedowns por 15 minutos com 58% de precisao. Se Petrino decidir levar pro chao, provavelmente vai conseguir.',
        },
        {
          num: '4/6',
          text: 'Mas se ficar em pe? Asplund disparou 170 golpes significativos em menos de 9 minutos contra Sharaf. Recorde historico para HW em 3 rounds. Esse volume e absurdo e pode sobrecarregar qualquer um.',
        },
        {
          num: '5/6',
          text: 'A historia de Asplund e de outro mundo: de mais de 525 lbs para o UFC em menos de 5 anos. Perdeu 300 libras, comecou a treinar do zero, e ja bateu recordes. Mas Petrino e o teste real. Nunca enfrentou alguem com esse grappling.',
        },
        {
          num: '6/6',
          text: 'Minha previsao: Petrino por submissao ou TKO por ground-and-pound. A diferenca no chao e grande demais. Mas se a mao estiver pior do que ele deixou transparecer, Asplund tem chance real de upset pelo volume. Luta perigosa.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Petrino esta lutando com a MAO DIREITA QUEBRADA contra um cara que pesava 525 libras e bateu o recorde de strikes do peso-pesado na estreia. Esse card de sabado tem TUDO."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Petrino e #15 dos pesados, tem 3.25 takedowns por 15 minutos e 3 submissoes na carreira. Asplund tem 15% de defesa de takedown e ja foi finalizado por mata-leao no LFA. No chao, e noite e dia."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"Mas em pe? Asplund disparou 170 golpes significativos em menos de 9 minutos na estreia. Recorde da historia do UFC para peso-pesado. E Petrino ja foi nocauteado por UM soco contra Jacoby. Se ficar em pe, e perigoso."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"A red flag gigante: Petrino disse que nao consegue usar a mao direita. Isso limita o striking E o ground-and-pound. Ele vai ter que ir pro takedown mais cedo e buscar submissao. A boa noticia: Asplund tem 15% de defesa."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Petrino por submissao no primeiro ou segundo round. A mao empurra ele pro chao, e no chao Asplund nao tem resposta. Mas o upset ta ali se ficar em pe. Comenta ai: ranking ou narrativa?"',
        },
      ],
      tiktok: [
        {
          hook: 'Um lutador do UFC revelou que vai lutar com a MAO QUEBRADA contra um cara que pesava 525 libras.',
          body: 'Petrino, o numero 15 dos pesados, disse que nao consegue usar a mao direita. Ele enfrenta Asplund, que perdeu 300 libras, chegou no UFC e bateu o recorde de strikes na estreia com 170 golpes em 9 minutos.',
          cta: 'Quem leva? Ranking vs Narrativa. Comenta sua previsao!',
        },
        {
          hook: '15 por cento. Esse numero vai definir a luta de sabado.',
          body: 'E a defesa de takedown de Asplund. Petrino media 3.25 takedowns por 15 minutos. Faz a conta. Se derrubar, Asplund ja foi finalizado por mata-leao antes. Mas se ficar em pe? Asplund disparou 170 golpes significativos em 9 minutos na estreia.',
          cta: 'Chao ou pe? Me fala nos comentarios quem vence essa.',
        },
        {
          hook: 'De 525 libras para o UFC. A historia mais maluca do MMA.',
          body: 'Steven Asplund pesava mais de 238 quilos ha menos de 5 anos. Perdeu 136 quilos, comecou a treinar MMA, nocauteou um cara em 16 segundos no Contender Series, e na estreia do UFC bateu o recorde de strikes para peso-pesado. Agora enfrenta o numero 15 do ranking.',
          cta: 'Ele consegue? Segue pra acompanhar a analise completa!',
        },
      ],
      headlines: [
        'Petrino vs Asplund: O Prospect com Mao Quebrada Contra o Ex-525 Libras',
        'A Defesa de 15%: Por Que Asplund Pode Ter Problemas Serios no Chao',
        '170 Golpes em 9 Minutos: O Volume de Asplund Basta Contra o Grappling de Petrino?',
        'De 525 Libras ao UFC: Asplund Enfrenta Seu Maior Teste Contra o #15 do Ranking',
        'Mao Direita Lesionada: Como a Lesao de Petrino Muda Todo o Calculo da Luta',
        'Ranking vs. Narrativa: A Analise Completa de Petrino vs Asplund',
      ],
    },

    // -------------------------------------------------
    // 15. BETTING VALUE (null as per protocol)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // 16. RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '-225',
        fighter2_odds: '+185',
        fighter1_name: 'Petrino',
        fighter2_name: 'Asplund',
        source: 'Media de Oddschecker e BestFightOdds (marco 2026)',
      },
      edges: [
        {
          icon: 'Target',
          titulo: 'Defesa de Takedown Catastrofica',
          stat_headline: '15% DE DEFESA DE TAKEDOWN PARA ASPLUND',
          contexto: 'Asplund defendeu apenas 15% dos takedowns tentados contra ele. Em contraste, Petrino media 3.25 takedowns por 15 minutos com 58% de precisao. Em lutas de peso-pesado, onde o poder de queda e amplificado, essa disparidade e ainda mais pronunciada.',
          implicacao_aposta: 'O mercado provavelmente ja precifica a vantagem de grappling, mas talvez nao o suficiente. A combinacao de 15% de TD Def com o historico de Asplund sendo finalizado no LFA torna submissao ou TKO por ground-and-pound cenarios muito provaveis.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Flame',
          titulo: 'Volume Historico de Strikes',
          stat_headline: '170 GOLPES SIGNIFICATIVOS EM 8:49 NA ESTREIA',
          contexto: 'Asplund bateu o recorde de golpes significativos para peso-pesado em tres rounds. Foram 170 de 292 tentativas (58% de precisao ajustada) em menos de 9 minutos. Para referencia, o recorde anterior pertencia a Andrei Arlovski.',
          implicacao_aposta: 'Se a luta ficar em pe por mais de dois rounds, Over em total de strikes e uma aposta com valor. Porem, e uma amostra de apenas uma luta no UFC, entao a confianca deve ser moderada.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'AlertTriangle',
          titulo: 'Lesao Declarada na Mao Direita',
          stat_headline: 'PETRINO: "NAO CONSIGO USAR MINHA MAO DIREITA"',
          contexto: 'Petrino revelou publicamente que nao consegue usar a mao direita. Historicamente, lutadores que revelam lesoes antes de lutas tendem a perder com mais frequencia. Isso limita o striking e o ground-and-pound, forcando dependencia do grappling.',
          implicacao_aposta: 'A lesao pode nao estar totalmente precificada nas odds. Se o mercado ainda estiver em -225 para Petrino, a linha pode ter valor em Asplund. Mas se Petrino simplesmente levar pro chao, a mao importa menos.',
          edge_level: 'forte',
          fighter_side: 'neutral',
        },
        {
          icon: 'Shield',
          titulo: 'Vulnerabilidade a Submissoes',
          stat_headline: 'ASPLUND FINALIZADO POR MATA-LEAO NO LFA 193',
          contexto: 'A unica derrota de Asplund veio por rear-naked choke no segundo round contra Denzel Freeman. Petrino tem 3 submissoes na carreira, incluindo mata-leao e arm-triangle. O pattern e claro: quando Asplund vai pro chao contra alguem com grappling, ele e finalizado.',
          implicacao_aposta: 'Petrino por submissao pode pagar odds atrativas (estimado +350 a +450). Com a lesao na mao empurrando Petrino para o grappling, esse cenario ganha probabilidade extra.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Zap',
          titulo: 'Petrino ja Foi Nocauteado por Um Soco',
          stat_headline: 'KO POR DIRETO DE DIREITA DE JACOBY NO R3',
          contexto: 'Em dezembro de 2024, Dustin Jacoby nocauteou Petrino com um unico direto de direita no terceiro round. Nos pesados, onde o poder e amplificado, Petrino pode ser mais vulneravel a um golpe limpo. Sua defesa de strikes e de apenas 47%.',
          implicacao_aposta: 'Asplund por KO/TKO provavelmente paga bem como underdog. Se voce acredita que a luta fica em pe, essa e a aposta de valor. Combinada com a lesao na mao de Petrino, faz sentido como um prop especulativo.',
          edge_level: 'leve',
          fighter_side: 'fighter2',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Petrino por Submissao',
          odds: '+400 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Com a mao direita lesionada, Petrino provavelmente vai direto pro takedown e submissao. Asplund tem historico de ser finalizado. O mercado pode nao refletir o quanto a lesao empurra Petrino pro chao.',
          raciocinio: 'A combinacao de tres fatores cria valor: (1) mao direita lesionada forca Petrino pro grappling, (2) Asplund tem 15% de defesa de takedown, (3) Asplund ja foi finalizado por mata-leao. Petrino tem 3 submissoes na carreira. O cenario tem probabilidade real de 20-25%.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Under 2.5 Rounds',
          odds: '-150 (estimado)',
          confianca: 'media',
          raciocinio: 'Petrino finalizou Lane no R1 e nocauteou Petersen no inicio do R3. Asplund tem 6 vitorias por KO/TKO e finalizou Guarascio em 16 segundos. Ambos tendem a encerrar lutas cedo. Se Petrino derrubar e dominar como fez contra Lane, pode acabar no primeiro ou segundo round.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Asplund ML (+185)',
          odds: '+185',
          confianca: 'baixa',
          edge_vs_mercado: 'A lesao na mao direita de Petrino pode nao estar totalmente precificada. Se Petrino nao conseguir usar a direita para ground-and-pound efetivo, o caminho pro chao se torna menos dominante.',
          raciocinio: 'Aposta especulativa baseada na lesao. Se Petrino realmente nao puder usar a mao direita, seu striking perde potencia e seu ground-and-pound fica limitado. Asplund tem volume para explorar isso em pe. Risco alto, mas o preco reflete o potencial.',
        },
        {
          tipo: 'Duracao',
          pick: 'Nao Vai a Distancia',
          odds: '-250 (estimado)',
          confianca: 'alta',
          raciocinio: 'Combinando os perfis de ambos: Petrino tem 10 finalizacoes em 13 vitorias, Asplund tem 6 de 7 por KO/TKO. A probabilidade de decision e baixissima. Nos pesados, com dois lutadores que buscam o finish, a chance de ir aos 15 minutos e minima.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Apostar Pesado em Petrino ML pela Odds',
        descricao: 'Petrino e o favorito claro no papel, mas a lesao na mao direita e um fator que pode nao estar totalmente refletido nas odds. Apostar pesado em -225 sem considerar que ele revelou publicamente que "nao consegue usar a mao direita" e negligenciar um risco real. Alem disso, nos pesados, qualquer golpe pode acabar a luta. A melhor estrategia e buscar props especificos (submissao, under) ao inves de moneyline puro.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={data} />;
}
