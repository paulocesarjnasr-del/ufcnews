import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'borralho-vs-de-ridder',
  evento_id: null,
  slug: 'borralho-vs-de-ridder',
  titulo: 'Borralho vs De Ridder: Redencao no Peso Medio',
  subtitulo: 'Dois grapplers de elite, ambos vindo de derrotas, se enfrentam no co-main event',
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
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Caio Borralho',
    record: '17-2-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Reinier de Ridder',
    record: '21-3-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC 326',
  evento_data: '7 de Marco, 2026',
  evento_local: 'T-Mobile Arena, Las Vegas',
  categoria_peso: 'Peso Medio',
  num_rounds: 5,
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
      evento_nome: 'UFC 326',
      evento_data: '7 de Marco, 2026',
      evento_local: 'T-Mobile Arena, Las Vegas',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'A Volta Por Cima',
      tagline_sub: 'Dois grapplers de elite, ambos vindo de derrotas, buscam redencao em Las Vegas',
      fighter1: {
        nome_completo: 'Caio "The Natural" Borralho',
        apelido: 'The Natural',
        sobrenome: 'Borralho',
        record: '17-2-0',
        ranking: '#7 MW',
        info_extra: 'Sao Luis, MA, Brasil | 33 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Reinier "The Dutch Knight" de Ridder',
        apelido: 'The Dutch Knight',
        sobrenome: 'De Ridder',
        record: '21-3-0',
        ranking: '#8 MW',
        info_extra: 'Breda, Holanda | 35 anos',
        imagem_fullbody_url: null,
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Dois Caminhos, Uma Encruzilhada</h3>
        <p class="text-gray-300 mb-4">
          Na divisao mais perigosa do UFC, nao existe espaco para hesitacao. <strong class="text-ufc-red">Borralho</strong> e <strong class="text-blue-400">De Ridder</strong> sabem disso melhor do que ninguem. Ambos chegam ao UFC 326 com a mesma missao: provar que a derrota mais recente foi um acidente de percurso, nao o inicio do declinio.
        </p>
        <p class="text-gray-300 mb-4">
          <strong class="text-ufc-red">Borralho</strong> construiu uma sequencia de sete vitorias consecutivas no UFC antes de esbarrar em Nassourdine Imavov em Paris, em setembro de 2025. A derrota por decisao unanime nao foi um nocaute moral, mas expôs limitacoes no striking que o brasileiro precisa resolver. O jiu-jitsu de elite e o controle de distancia que o levaram ao top 7 continuam intactos, mas a pergunta agora e: ele aprendeu com os erros?
        </p>
        <p class="text-gray-300 mb-4">
          <strong class="text-blue-400">De Ridder</strong> viveu uma montanha-russa em 2025. O holandes de 1,93m acumulou tres vitorias impressionantes (Holland por finalizacao, Nickal por nocaute e Whittaker por decisao dividida) antes de ser parado por Brendan Allen no quarto round. A derrota veio de uma forma que levanta questoes sobre seu queixo e recuperacao: desistiu no banco entre os rounds.
        </p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p class="text-gray-300 mb-4">
          Essa luta e um filtro brutal na divisao dos medios. O vencedor se posiciona como desafiante legitimo ao titulo. O perdedor pode cair para fora do top 10 e enfrentar um caminho muito mais longo de volta. Com Du Plessis defendendo o cinturao e nomes como Strickland e Imavov disputando as primeiras posicoes, ninguem pode se dar ao luxo de perder duas seguidas.
        </p>
        <p class="text-gray-300 mb-4">
          Existe um subtexto fascinante aqui: <strong class="text-ufc-red">Borralho</strong> e um faixa-preta de jiu-jitsu que prefere controlar de cima. <strong class="text-blue-400">De Ridder</strong> tambem e faixa-preta, mas prefere finalizar de baixo ou nas costas. Quando dois grapplers de elite se encontram, a luta geralmente acontece em pe, porque nenhum dos dois quer arriscar ir ao chao contra o outro. Esse paradoxo e o que torna esse confronto tao imprevisivel.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#7 Peso Medio', fighter2: '#8 Peso Medio' },
        { dimensao: 'Objetivo', fighter1: 'Voltar a sequencia de vitorias e se manter no top 5', fighter2: 'Manter o momentum e buscar titulo' },
        { dimensao: 'Risco', fighter1: 'Duas derrotas seguidas = fora do top 10', fighter2: 'Duas derrotas seguidas = questionamentos serios' },
        { dimensao: 'Recompensa', fighter1: 'Vitoria sobre ex-campeao duplo da ONE = credibilidade', fighter2: 'Vitoria sobre rival top 7 = luta por titulo' },
        { dimensao: 'Narrativa', fighter1: 'Brasileiro quer provar que derrota em Paris foi um desvio', fighter2: 'Holandes busca redencao apos desistir contra Allen' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O NATURAL VOLTA A CACA',
          subtitulo: 'Borralho prova que Paris foi um acidente e volta a trilha do titulo',
          consequencias: [
            { tag: 'RANKING', texto: 'Borralho sobe para o top 5 da divisao dos medios e se posiciona como desafiante direto' },
            { tag: 'TITULO', texto: 'Uma vitoria sobre De Ridder, que venceu Whittaker, valida Borralho como pretendente ao cinturao' },
            { tag: 'LEGADO', texto: 'Consolida a Fighting Nerds como uma das melhores academias do Brasil no UFC' },
          ],
          proxima_luta: 'Borralho vs Strickland ou Imavov (revanche) pelo #1 contender',
        },
        fighter2_vence: {
          titulo: 'O CAVALEIRO HOLANDES RESSURGE',
          subtitulo: 'De Ridder apaga a mancha da derrota para Allen e retoma o caminho ao titulo',
          consequencias: [
            { tag: 'RANKING', texto: 'De Ridder entra no top 5 e se torna o desafiante mais perigoso da divisao' },
            { tag: 'LEGADO', texto: 'Prova que a transicao da ONE para o UFC e completa: venceu Nickal, Whittaker e agora Borralho' },
            { tag: 'TITULO', texto: 'Fila do titulo fica mais curta: Du Plessis vs De Ridder e uma realidade' },
          ],
          proxima_luta: 'De Ridder vs Du Plessis pelo titulo ou vs Strickland pelo #1 contender',
        },
      },
    },

    // -------------------------------------------------
    // 3. MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Caio Borralho',
        color: 'red',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Nassourdine Imavov',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: '#5 MW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Primeira derrota no UFC. Imavov controlou a distancia com jab e leg kicks. Borralho nao conseguiu impor o grappling.',
          },
          {
            date: 'Ago 2024',
            opponent: 'Jared Cannonier',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#6 MW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Dominou Cannonier no chao e com clinch. Main event de 5 rounds onde mostrou cardio superior.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Paul Craig',
            result: 'W',
            method: 'KO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocauteou Craig com um cruzado de esquerda no segundo round. Vitoria rapida e dominante.',
          },
          {
            date: 'Nov 2023',
            opponent: 'Abusupiyan Magomedov',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Venceu substituto de ultima hora com controle no chao. Luta pouco memoravel mas eficiente.',
          },
          {
            date: 'Abr 2023',
            opponent: 'Michal Oleksiejczuk',
            result: 'W',
            method: 'Sub R2 (mata-leao)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizou com mata-leao no segundo round. Mostrou transicoes rapidas no chao.',
          },
        ],
        full_fight_history: [
          { date: 'Abr 2022', opponent: 'Gadzhi Omargadzhiev', result: 'W', method: 'TD (decisao tecnica)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC. Venceu por decisao tecnica apos joelhada ilegal.' },
          { date: 'Set 2022', opponent: 'Armen Petrosyan', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou com grappling e controle.' },
          { date: 'Out 2022', opponent: 'Makhmud Muradov', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mais uma vitoria por decisao solida.' },
          { date: 'Abr 2023', opponent: 'Michal Oleksiejczuk', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao com mata-leao.' },
          { date: 'Nov 2023', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Controle dominante no chao.' },
          { date: 'Mai 2024', opponent: 'Paul Craig', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO com cruzado de esquerda.' },
          { date: 'Ago 2024', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: '#6 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Dominou em 5 rounds no main event.' },
          { date: 'Set 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'UD', opponent_rank: '#5 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Primeira derrota no UFC em Paris.' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Borralho construiu uma impressionante sequencia de 7 vitorias consecutivas no UFC antes de perder para Imavov. A derrota por decisao nao foi devastadora, mas expos fragilidades no striking em pe. Aos 33 anos, ele ainda esta no auge fisico e tem tempo para se recuperar. O descanso de 6 meses desde a derrota pode ter sido positivo para ajustar o gameplan.',
      },
      fighter2: {
        nome: 'Reinier de Ridder',
        color: 'blue',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Brendan Allen',
            result: 'L',
            method: 'TKO R4 (parada do corner)',
            opponent_rank: '#4 MW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Derrota preocupante. De Ridder nao conseguiu sair do quarto round e seu corner parou a luta. Levantou questoes sobre durabilidade.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Robert Whittaker',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: '#4 MW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Vitoria sobre ex-campeao em 5 rounds. Decisao dividida, luta apertada, mas De Ridder mostrou resiliencia e grappling superior.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Bo Nickal',
            result: 'W',
            method: 'TKO R2 (joelhada no corpo)',
            opponent_rank: '#10 MW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Primeira derrota de Nickal no MMA. De Ridder parou o prospect com joelhada no corpo. Performance of the Night.',
          },
          {
            date: 'Jan 2025',
            opponent: 'Kevin Holland',
            result: 'W',
            method: 'Sub R1 (mata-leao)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizacao rapida no primeiro round. Holland e perigoso mas vulneravel no chao.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Gerald Meerschaert',
            result: 'W',
            method: 'Sub R3 (triângulo de braco)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizou veterano com triangulo de braco. Mostrou paciencia e habilidade no chao.',
          },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Gerald Meerschaert', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC. Finalizacao com triangulo de braco.' },
          { date: 'Jan 2025', opponent: 'Kevin Holland', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mata-leao rapido no UFC 311.' },
          { date: 'Mai 2025', opponent: 'Bo Nickal', result: 'W', method: 'TKO R2', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Bom', note: 'Joelhada no corpo parou Nickal.' },
          { date: 'Jul 2025', opponent: 'Robert Whittaker', result: 'W', method: 'SD', opponent_rank: '#4 MW', quality_score: 5, quality_label: 'Excelente', note: 'Decisao dividida sobre ex-campeao.' },
          { date: 'Out 2025', opponent: 'Brendan Allen', result: 'L', method: 'TKO R4', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Corner parou a luta. Primeira derrota no UFC.' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'De Ridder teve um 2025 brilhante com tres vitorias de destaque (Holland, Nickal, Whittaker) antes de ser parado por Allen em outubro. A forma como perdeu (corner interrompeu a luta no 4o round) e preocupante porque sugere que ele nao estava resistindo bem ao castigo fisico. Ainda assim, o curriculo que construiu em menos de um ano no UFC e impressionante. A questao principal e se ele se recuperou mentalmente e fisicamente da derrota.',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Borralho',
        media_oponentes: 2.5,
        media_oponentes_label: 'Medio',
        aproveitamento: '7W-1L (87%)',
        contra_top5: '0W-1L',
      },
      fighter2: {
        nome: 'De Ridder',
        media_oponentes: 3.2,
        media_oponentes_label: 'Bom',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '1W-1L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Borralho e De Ridder nao compartilham oponentes diretos no UFC. Porem, Borralho venceu Brendan Allen em uma luta de grappling na Karate Combat, enquanto Allen derrotou De Ridder por TKO no UFC. Esse fato indireto sugere que Borralho pode ter vantagem no chao, mas lutas de grappling e MMA sao contextos completamente diferentes.',
    },

    // -------------------------------------------------
    // 5. OPONENTE COMUM
    // -------------------------------------------------
    oponente_comum: null,

    // -------------------------------------------------
    // 6. COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 2.73,
          valueB: 3.25,
          maxVal: 6,
          format: 'decimal',
          note: 'De Ridder tem volume levemente superior no striking',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 58,
          valueB: 61,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 1.98,
          valueB: 2.21,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Borralho absorve menos golpes, indicando melhor defesa ou controle de distancia',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 60,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Diferenca significativa: Borralho defende 12% mais strikes',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 2.16,
          valueB: 4.74,
          maxVal: 8,
          format: 'decimal',
          note: 'De Ridder tenta muito mais takedowns, embora com menos precisao',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 63,
          valueB: 30,
          maxVal: 100,
          format: 'percent',
          note: 'Borralho converte mais do dobro das tentativas de takedown',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 57,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Submissoes por 15 Min',
          valueA: 0.68,
          valueB: 1.36,
          maxVal: 3,
          format: 'decimal',
          note: 'De Ridder tenta o dobro de finalizacoes, refletindo seu estilo mais agressivo no chao',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '33 anos',
          fighter2: '35 anos',
          note: 'Borralho e 2 anos mais jovem',
        },
        {
          label: 'Altura',
          fighter1: '1.77m (5\'10")',
          fighter2: '1.93m (6\'4")',
          note: 'De Ridder tem 16cm de vantagem em altura',
        },
        {
          label: 'Envergadura',
          fighter1: '190cm (75")',
          fighter2: '198cm (78")',
          note: 'De Ridder tem 8cm de envergadura a mais',
        },
        {
          label: 'Stance',
          fighter1: 'Southpaw',
          fighter2: 'Southpaw',
          note: 'Ambos canhotosx: dinâmica de luta southpaw vs southpaw',
        },
        {
          label: 'Academia',
          fighter1: 'Fighting Nerds',
          fighter2: 'Combat Brothers',
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
          label: 'Striking em Pe',
          valueA: 62,
          valueB: 55,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Borralho tem melhor defesa de strikes (60% vs 48%) e absorve menos golpes. De Ridder e mais vulneravel no striking puro.',
        },
        {
          label: 'Grappling / Jiu-Jitsu',
          valueA: 82,
          valueB: 88,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Ambos sao faixa-preta, mas De Ridder tem 13 finalizacoes na carreira contra 4 de Borralho. O holandes e mais letal quando a luta vai ao chao.',
        },
        {
          label: 'Wrestling / Controle',
          valueA: 75,
          valueB: 68,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Borralho tem 63% de precisao em takedowns contra 30% de De Ridder. O brasileiro e mais eficiente em colocar a luta no chao quando quer.',
        },
        {
          label: 'Cardio / Resistencia',
          valueA: 78,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Borralho mostrou cardio consistente em lutas de 5 rounds. De Ridder foi parado no 4o round contra Allen, levantando duvidas sobre sua resistencia.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 55,
          valueB: 85,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'De Ridder tem 13 finalizacoes na carreira. E perigoso com mata-leao, triangulo de braco e armbars. Borralho finaliza com menos frequencia.',
        },
        {
          label: 'QI de Luta / Adaptacao',
          valueA: 76,
          valueB: 72,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Borralho mostrou capacidade de adaptar gameplans ao longo das lutas. De Ridder tende a forcar o grappling mesmo quando nao funciona.',
        },
      ],
      insight: 'Essa e uma luta entre dois grapplers de alto nivel, mas com perfis diferentes. Borralho e mais completo no MMA, com melhor defesa em pe, wrestling mais eficiente e cardio superior. De Ridder e o lutador mais perigoso no chao com suas finalizacoes, e compensa com tamanho fisico impressionante. A chave sera quem dita onde a luta acontece.',
    },

    // -------------------------------------------------
    // 8. DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Borralho',
        ko_tko: { count: 3, percent: 18 },
        submission: { count: 4, percent: 24 },
        decision: { count: 10, percent: 58 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'De Ridder',
        ko_tko: { count: 5, percent: 24 },
        submission: { count: 13, percent: 62 },
        decision: { count: 3, percent: 14 },
        total_wins: 21,
      },
      insight: 'A diferenca nos estilos e gritante. Borralho e um lutador de decisao: 58% das suas vitorias sao por pontos, refletindo seu estilo de controle e pressao constante. De Ridder e o oposto: 62% das suas vitorias sao por finalizacao e ele raramente precisa dos juizes (apenas 14% por decisao). Isso significa que De Ridder precisa levar a luta ao chao e buscar a finalizacao, enquanto Borralho pode vencer acumulando rounds com controle e volume.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM: DE RIDDER',
          color: 'green',
          title: 'O Round da Emboscada',
          description: 'De Ridder e mais perigoso nos rounds iniciais. Finalizou Holland no R1 e parou Nickal no R2. Se ele conseguir um takedown limpo e cair nas costas de Borralho, a ameaca de finalizacao e real. Borralho precisa sobreviver a explosao inicial do holandes e manter a luta em pe.',
        },
        {
          rounds: 'R2-R3',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Zona de Transicao',
          description: 'Se a luta chegar ao segundo e terceiro rounds sem finalizacao, o cenario comeca a favorecer Borralho. O brasileiro tem wrestling mais eficiente (63% vs 30% de precisao) e pode comecar a impor ritmo. Porem, De Ridder ainda tem gas para tentar levar ao chao. Estes sao os rounds que decidem a luta.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 7,
          danger_label: 'VANTAGEM: BORRALHO',
          color: 'red',
          title: 'Territorio do Brasileiro',
          description: 'Se chegarmos aos rounds finais, a vantagem de cardio de Borralho se torna decisiva. De Ridder foi parado no R4 contra Allen, e lutas de 5 rounds contra Whittaker mostraram que ele desacelera visivelmente. Borralho, por outro lado, dominou Cannonier em 5 rounds sem sinais de fadiga. Rounds tardios = territorio do Borralho.',
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
          title: 'Derrota por desistencia no corner',
          fighter: 'De Ridder',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'A forma como De Ridder perdeu para Allen e preocupante. O corner parou a luta no final do R4, indicando que ele nao estava em condicoes de continuar. Em uma luta de 5 rounds, se Borralho acumular dano, De Ridder pode novamente nao conseguir responder nos rounds finais.',
        },
        {
          icon: 'Shield',
          title: 'Defesa de strikes inferior',
          fighter: 'De Ridder',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'De Ridder defende apenas 48% dos strikes significativos, enquanto Borralho defende 60%. Em uma luta de 5 rounds, essa diferenca se acumula. O holandes absorve mais golpes e depende de levar a luta ao chao para compensar.',
        },
        {
          icon: 'TrendingUp',
          title: 'Vantagem de tamanho',
          fighter: 'De Ridder',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Com 1,93m contra 1,77m de Borralho, De Ridder tem uma vantagem de 16cm em altura e 8cm em envergadura. Esse tamanho ajuda no clinch, nas trocas de distancia e nos takedowns defensivos. E a maior diferenca fisica entre dois lutadores ranqueados no peso medio.',
        },
        {
          icon: 'Brain',
          title: 'Pressao mental de duas derrotas consecutivas',
          fighter: 'De Ridder',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Se De Ridder perder essa luta, serao duas derrotas consecutivas e o holandes caira para fora do top 10. A pressao de "precisar vencer" pode afetar sua tomada de decisao, especialmente se a luta nao estiver indo como planejado.',
        },
        {
          icon: 'Zap',
          title: 'Finalizacoes de elite',
          fighter: 'De Ridder',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'De Ridder tem 13 finalizacoes na carreira, incluindo varias por mata-leao e triangulo de braco. Mesmo em desvantagem nos rounds, ele pode encerrar a luta a qualquer momento se conseguir posicao no chao. Borralho nunca foi finalizado no UFC, mas nunca enfrentou alguem com esse nivel de jiu-jitsu ofensivo.',
        },
        {
          icon: 'Activity',
          title: 'Cardio comprovado em 5 rounds',
          fighter: 'Borralho',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Borralho mostrou excelente cardio na vitoria sobre Cannonier em 5 rounds e manteve ritmo alto ao longo da derrota para Imavov. Sua capacidade de manter o volume nos rounds finais e uma vantagem clara contra De Ridder, que demonstrou fadiga tardia.',
        },
        {
          icon: 'MapPin',
          title: 'Las Vegas como terreno neutro',
          fighter: 'Borralho',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'Nenhum dos dois luta em casa. Borralho perdeu sua ultima luta em Paris (territorio hostil para um brasileiro contra um favorito local). Las Vegas e terreno neutro onde o fator torcida nao pesara para nenhum lado.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Borralho',
        total_probability: 57,
        scenarios: [
          {
            name: 'Desgaste e Controle',
            probability: 30,
            method: 'Decisao Unanime',
            description: 'Borralho usa seu wrestling (63% de precisao) para controlar o ritmo, neutraliza as tentativas de takedown de De Ridder e acumula pontos com ground and pound e controle de posicao. Nos rounds finais, o cardio superior faz a diferenca e os juizes dao a vitoria clara para o brasileiro.',
          },
          {
            name: 'Striking e Movimento',
            probability: 15,
            method: 'Decisao Unanime ou TKO tardio',
            description: 'Borralho mantem a luta em pe explorando a defesa de strikes inferior de De Ridder (48%). Com leg kicks e movimentacao lateral, impede os avances do holandes e acumula dano. Se De Ridder desacelerar nos rounds finais como fez contra Allen, um TKO tardio e possivel.',
          },
          {
            name: 'O Nocaute Surpresa',
            probability: 12,
            method: 'KO R2-R3',
            description: 'Borralho ja mostrou poder de nocaute (KO sobre Craig). Se De Ridder entrar tentando forcar clinch e abrir espacos, um contra-ataque com cruzado de esquerda (Borralho e southpaw) pode encerrar a luta. E o cenario menos provavel, mas real.',
          },
        ],
      },
      fighter2: {
        nome: 'De Ridder',
        total_probability: 40,
        scenarios: [
          {
            name: 'A Anaconda Hollandesa',
            probability: 20,
            method: 'Finalizacao R1-R3',
            description: 'De Ridder usa sua vantagem de tamanho (16cm mais alto) para forcar clinch contra a grade, consegue um takedown e trabalha para as costas. Com 13 finalizacoes na carreira, se ele chegar em posicao dominante, o mata-leao ou triangulo de braco sao ameacas reais. Borralho nunca foi finalizado no UFC, mas nunca enfrentou um finalizador desse calibre.',
          },
          {
            name: 'Decisao Apertada',
            probability: 12,
            method: 'Decisao Dividida',
            description: 'De Ridder repete o que fez contra Whittaker: usa o tamanho para controlar no clinch, rouba rounds com atividade no chao e convence dois dos tres juizes. E uma luta suja, apertada, onde a vantagem fisica compensa a desvantagem tecnica.',
          },
          {
            name: 'O TKO por Acumulacao',
            probability: 8,
            method: 'TKO R2-R3 (socos no ground and pound)',
            description: 'De Ridder consegue um takedown e, ao inves de buscar finalizacao, trabalha com ground and pound pesado usando seu peso e tamanho. Ja mostrou poder com a joelhada que parou Nickal. Se Borralho ficar preso embaixo, o acumulo de dano pode forcar uma parada.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // 12. PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Caio Borralho',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Borralho e o lutador mais completo nessa luta. Seu wrestling mais eficiente (63% vs 30% de precisao em takedowns), defesa de strikes superior (60% vs 48%) e cardio comprovado em 5 rounds sao vantagens decisivas. De Ridder e perigoso com finalizacoes e tem vantagem de tamanho, mas suas lacunas defensivas e a questao da fadiga nos rounds tardios pesam contra ele. Borralho provavelmente controla o ritmo da luta, evita posicoes perigosas no chao e acumula rounds suficientes para uma decisao. A unica forma realista de De Ridder vencer e por finalizacao, e Borralho tem as ferramentas para evitar isso.',
      x_factor: {
        title: 'A Dinamica Southpaw vs Southpaw',
        description: 'Ambos sao canhotosx, o que cria uma dinâmica diferente no striking. A mao forte de ambos (esquerda) fica alinhada, aumentando a chance de trocas explosivas. Borralho tem melhor defesa de strikes, mas De Ridder tem alcance. Se nenhum dos dois conseguir impor o grappling, a luta em pe entre dois southpaws pode ser mais competitiva do que as odds sugerem.',
      },
      upset_alert: {
        title: 'Upset Alert: De Ridder por Finalizacao',
        description: 'De Ridder tem 13 finalizacoes na carreira. Se ele conseguir levar Borralho ao chao e chegar nas costas, o jogo muda completamente. Borralho nunca foi finalizado no UFC, mas tambem nunca enfrentou um especialista desse nivel. Uma unica scramble mal calculada pode resultar em uma finalizacao rapida.',
      },
      probabilities: {
        fighter1: { nome: 'Borralho', percent: 57 },
        fighter2: { nome: 'De Ridder', percent: 40 },
        draw: 3,
      },
      value_picks: {
        moneyline: {
          pick: 'Borralho a -265',
          reasoning: 'Favorito justo considerando suas vantagens tecnicas e de cardio. O preco e salgado, mas o risco de upset por finalizacao justifica a linha.',
        },
        method: {
          pick: 'Borralho por Decisao (+140)',
          reasoning: '58% das vitorias de Borralho sao por decisao. Contra um grappler perigoso como De Ridder, ele provavelmente vai evitar o chao e acumular rounds. A linha de +140 para vitoria por pontos tem valor.',
        },
        over_under: {
          pick: 'Over 3.5 Rounds',
          rounds: 3.5,
          reasoning: 'Borralho tem perfil de lutador de decisao e deve evitar o chao onde De Ridder e mais perigoso. Mesmo que De Ridder busque finalizacao, Borralho tem defesa para sobreviver. Alta probabilidade de ir alem de 3 rounds.',
        },
        best_value: 'Melhor aposta de valor: Borralho por Decisao (+140). O brasileiro e um lutador de controle com 58% de vitorias por decisao e vai evitar o jogo perigoso de De Ridder no chao.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Os Primeiros 3 Minutos',
          icon: 'Clock',
          description: 'De Ridder e mais perigoso no inicio das lutas. Ele finalizou Holland em 3:31 do R1 e parou Nickal no R2. Se ele conseguir um takedown nos primeiros minutos e chegar nas costas de Borralho, a luta pode acabar rapido. Observe como Borralho gerencia os primeiros avances.',
        },
        {
          num: 2,
          title: 'A Defesa de Takedown de Borralho',
          icon: 'Shield',
          description: 'Borralho defende 57% dos takedowns, o que nao e excepcional. Contra um lutador do tamanho de De Ridder (1,93m, 78" de envergadura), manter a luta em pe sera ainda mais dificil. Se De Ridder comecar a completar takedowns consistentes, o gameplan de Borralho desmorona.',
        },
        {
          num: 3,
          title: 'O Gas do De Ridder no R4-R5',
          icon: 'Activity',
          description: 'A derrota para Allen aconteceu no R4, quando o corner de De Ridder parou a luta. Contra Whittaker em 5 rounds, ele visivelmente desacelerou. Se essa luta chegar aos rounds finais, preste atencao no volume e na postura de De Ridder. Sinais de fadiga significam que Borralho vai controlar ate o final.',
        },
        {
          num: 4,
          title: 'A Dinâmica Southpaw vs Southpaw',
          icon: 'Target',
          description: 'Ambos sao canhotosx. Isso significa que a mao de potencia (esquerda) fica alinhada, criando angulos diferentes do normal. Observe quem consegue impor seu jab e quem controla a distancia. Em lutas southpaw vs southpaw, o lutador que encontra o angulo da esquerda primeiro geralmente domina.',
        },
        {
          num: 5,
          title: 'As Tentativas de Finalizacao',
          icon: 'Flame',
          description: 'De Ridder tenta 1.36 finalizacoes a cada 15 minutos, o dobro de Borralho (0.68). Quando a luta vai ao chao, observe se De Ridder busca posicao para finalizar ou se Borralho consegue neutralizar com controle por cima. Cada scramble no chao e um momento de perigo real.',
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
          title: 'BORRALHO vs DE RIDDER',
          content: 'UFC 326 | Co-Main Event\n7 de Marco, 2026\nT-Mobile Arena, Las Vegas\n\nPeso Medio | 5 Rounds\n#7 vs #8 no ranking',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'CAIO BORRALHO',
          content: '17-2-0 | #7 Peso Medio\nFighting Nerds | 33 anos\n\n7-1 no UFC\n58% das vitorias por decisao\nWrestling: 63% de precisao\nVem de derrota para Imavov',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'REINIER DE RIDDER',
          content: '21-3-0 | #8 Peso Medio\nCombat Brothers | 35 anos\n\n4-1 no UFC\n13 finalizacoes na carreira\nVenceu Whittaker e Nickal em 2025\nVem de TKO loss para Allen',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'NUMEROS QUE IMPORTAM',
          content: 'Defesa de Strikes:\nBorralho 60% vs De Ridder 48%\n\nPrecisao de TD:\nBorralho 63% vs De Ridder 30%\n\nFinalizacoes/15min:\nBorralho 0.68 vs De Ridder 1.36\n\nVantagem de altura:\nDe Ridder +16cm',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'Borralho por Decisao Unanime\nConfianca: MEDIA\n\nBorralho 57% | De Ridder 40%\n\nChave: cardio + wrestling eficiente\nvs poder de finalizacao + tamanho',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/6',
          text: 'Borralho vs De Ridder no UFC 326 e o tipo de luta que separa pretendentes de fato. Ambos vindo de derrotas, ambos grapplers de elite. Quem errar primeiro, paga caro. Thread com a analise completa:',
        },
        {
          num: '2/6',
          text: 'BORRALHO: 7-1 UFC, 63% de precisao em takedowns, 60% de defesa de strikes. O brasileiro e um moedor que acumula rounds. 58% das vitorias por decisao. Problema: primeira derrota para Imavov expôs fragilidades no striking.',
        },
        {
          num: '3/6',
          text: 'DE RIDDER: 4-1 UFC, venceu Whittaker e Nickal, mas foi parado por Allen no R4. 13 finalizacoes na carreira, mas apenas 48% de defesa de strikes. O holandes e letal no chao, vulneravel em pe.',
        },
        {
          num: '4/6',
          text: 'O numero que define tudo: De Ridder tem 30% de precisao em takedowns vs 63% de Borralho. Se o holandes nao conseguir levar ao chao, perde. Se conseguir, pode finalizar qualquer um. E uma questao de quem impoe as regras.',
        },
        {
          num: '5/6',
          text: 'DANGER ZONE: R1 e De Ridder (finalizou Holland em 3:31 do R1). R4-R5 e Borralho (De Ridder foi parado no R4 contra Allen). O meio da luta decide. Se chegar ao R4 empatado, Borralho leva.',
        },
        {
          num: '6/6',
          text: 'PREVISAO: Borralho por Decisao Unanime. O brasileiro tem cardio, wrestling e defesa superiores. De Ridder precisa de finalizacao e provavelmente nao vai conseguir. Melhor aposta: Borralho por Decisao (+140).',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Borralho vs De Ridder no UFC 326. Dois grapplers de elite, ambos vindo de derrotas, ambos com TUDO em jogo. Mas tem um numero que muda tudo nessa luta..."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Borralho: 7-1 no UFC, 63% de precisao em takedowns, cardio monstro em 5 rounds. De Ridder: 4-1, 13 finalizacoes na carreira, mas apenas 48% de defesa de strikes. E 30% de precisao em takedowns. Essa e a chave."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"Se De Ridder nao conseguir levar ao chao, ele perde. Simples assim. Mas com 30% de precisao, as chances sao baixas contra um cara com 57% de defesa de takedown. Agora, se ele CONSEGUIR, sao 13 finalizacoes na carreira. Uma unica scramble pode mudar tudo."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Red flag enorme pro De Ridder: o corner parou a luta no R4 contra Allen. Cardio e questionavel em 5 rounds. Borralho dominou Cannonier em 5 rounds sem sinal de cansaco. Se chegar ao R4, acabou."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Borralho por decisao unanime. O brasileiro tem todas as ferramentas para neutralizar De Ridder e acumular rounds. Melhor aposta: Borralho por Decisao a +140. Comenta aqui quem voce acha que leva!"',
        },
      ],
      tiktok: [
        {
          hook: 'O cara que VENCEU Whittaker e Nickal em 2025 pode perder duas seguidas?',
          body: 'Reinier de Ridder subiu como foguete no UFC: finalizou Holland, nocauteou Nickal, venceu Whittaker por dividida. Mas Allen parou ele no R4. Agora enfrenta Borralho, que tem 63% de precisao em takedowns e cardio de 5 rounds. O holandes tem 13 finalizacoes, mas so 30% de precisao em takedowns e 48% de defesa de strikes.',
          cta: 'De Ridder finaliza ou Borralho moi ele por 5 rounds? Comenta tua previsao!',
        },
        {
          hook: 'Esse brasileiro tem 7-1 no UFC e NINGUEM fala dele.',
          body: 'Caio Borralho. Fighting Nerds. 63% de precisao em takedowns, 60% de defesa de strikes, cardio absurdo. Nocauteou Craig, dominou Cannonier em 5 rounds. A unica derrota foi pra Imavov em Paris. Agora enfrenta De Ridder, que e 16cm mais alto e tem 13 finalizacoes na carreira.',
          cta: 'Borralho e top 5 real ou foi inflado por oponentes fracos? Comenta!',
        },
        {
          hook: 'O numero que DEFINE Borralho vs De Ridder no UFC 326.',
          body: 'De Ridder: 30% de precisao em takedowns. Borralho: 57% de defesa de takedowns. Se o holandes nao conseguir levar ao chao, perde por decisao. Se conseguir, sao 13 finalizacoes na carreira. E tudo ou nada pro De Ridder.',
          cta: 'Qual cenario voce acha mais provavel? Comenta!',
        },
      ],
      headlines: [
        'Borralho vs De Ridder: O Duelo de Grapplers Que Decide o Top 5 do Peso Medio',
        'UFC 326: Por Que o Cardio de Borralho e a Arma Secreta Contra De Ridder',
        'De Ridder Pode Superar a Sombra de Allen? A Analise Completa do Co-Main',
        '30% de Precisao em Takedowns: O Problema Que De Ridder Precisa Resolver',
        'Redencao em Las Vegas: Borralho e De Ridder Lutam Pela Sobrevivencia no Ranking',
        'O Paradoxo do Grappler: Quando Dois Faixas-Preta Se Encontram no Peso Medio',
      ],
    },

    // -------------------------------------------------
    // 15. BETTING VALUE (always null)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // 16. RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '-265',
        fighter2_odds: '+210',
        fighter1_name: 'Borralho',
        fighter2_name: 'De Ridder',
        source: 'Media de DraftKings, FanDuel e BetMGM (marco 2026)',
      },
      edges: [
        {
          icon: 'Shield',
          titulo: 'Disparidade Defensiva no Striking',
          stat_headline: 'BORRALHO DEFENDE 60% DOS STRIKES vs 48% DE DE RIDDER',
          contexto: 'Borralho absorve 1.98 strikes significativos por minuto enquanto De Ridder absorve 2.21. Em uma luta de 5 rounds (25 minutos), essa diferenca pode significar 5-6 golpes significativos a mais absorvidos por De Ridder. Combinado com a defesa 12% inferior, o holandes acumula mais dano ao longo da luta.',
          implicacao_aposta: 'Essa disparidade favorece apostas em Borralho por decisao. Se De Ridder nao conseguir a finalizacao, ele vai absorver mais dano e perder nos cartoes.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Target',
          titulo: 'Precisao de Takedown Dramaticamente Diferente',
          stat_headline: 'BORRALHO 63% DE PRECISAO EM TD vs DE RIDDER 30%',
          contexto: 'Apesar de De Ridder tentar mais takedowns (4.74/15min vs 2.16/15min), sua taxa de sucesso e apenas 30%. Borralho converte mais do dobro com 63%. Isso significa que mesmo tentando menos, Borralho e mais eficiente em colocar a luta onde quer.',
          implicacao_aposta: 'A incapacidade de De Ridder de completar takedowns consistentemente e a maior fraqueza do holandes. Se ele nao conseguir levar ao chao, perde. E os numeros dizem que ele provavelmente nao vai conseguir com consistencia.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Flame',
          titulo: 'Poder de Finalizacao do De Ridder',
          stat_headline: '13 FINALIZACOES EM 21 VITORIAS (62%)',
          contexto: 'De Ridder e um dos finalizadores mais produtivos do peso medio. Mata-leao, triangulo de braco, armbars. Se a luta vai ao chao e ele consegue posicao dominante, o perigo e real. Borralho nunca foi finalizado no UFC.',
          implicacao_aposta: 'O mercado de metodo de vitoria para De Ridder por finalizacao provavelmente oferece odds atrativas. Se voce acredita que ele vai conseguir o takedown, e uma aposta de valor.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Clock',
          titulo: 'Historico de Fadiga nos Rounds Tardios',
          stat_headline: 'DE RIDDER FOI PARADO NO R4 CONTRA ALLEN',
          contexto: 'Na derrota para Allen, o corner de De Ridder parou a luta ao final do R4. Contra Whittaker em 5 rounds, ele visivelmente desacelerou. Em contraste, Borralho dominou Cannonier em 5 rounds sem sinais de fadiga e manteve ritmo alto mesmo na derrota para Imavov.',
          implicacao_aposta: 'Fortemente favorece apostas em Borralho por decisao e Over 3.5 rounds. Se a luta chegar ao R4, Borralho provavelmente esta na frente e De Ridder nao tem gas para virar.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Activity',
          titulo: 'Perfil de Decisao vs Perfil de Finalizacao',
          stat_headline: 'BORRALHO: 58% POR DECISAO | DE RIDDER: 62% POR FINALIZACAO',
          contexto: 'Borralho e um lutador que vence acumulando rounds. De Ridder e um lutador que vence finalizando. Quando um lutador de decisao enfrenta um finalizador, a luta tende a ir a distancia porque o lutador de decisao evita posicoes de risco.',
          implicacao_aposta: 'Over 3.5 rounds e a aposta mais logica nessa luta. Borralho vai jogar seguro e evitar o chao. Mesmo que De Ridder consiga alguns takedowns, Borralho provavelmente se levanta antes de ser finalizado.',
          edge_level: 'moderado',
          fighter_side: 'neutral',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Borralho por Decisao',
          odds: '+140',
          confianca: 'alta',
          edge_vs_mercado: 'Borralho tem 58% de vitorias por decisao na carreira e vai evitar o jogo no chao contra De Ridder. O mercado paga +140 para uma vitoria por pontos que e o cenario mais provavel.',
          raciocinio: 'Borralho e um moedor que acumula rounds com wrestling eficiente e controle. Contra um oponente perigoso no chao como De Ridder, ele vai jogar ainda mais seguro. Seu cardio superior garante que ele mantem o ritmo nos 5 rounds. A combinacao de perfil de lutador + matchup torna a vitoria por decisao o cenario mais provavel.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Over 3.5 Rounds',
          odds: '-144',
          confianca: 'alta',
          edge_vs_mercado: 'O mercado ja precifica o over como favorito, mas com boa razao. Dois grapplers de elite tendem a neutralizar o jogo de chao um do outro, levando a luta para os rounds finais.',
          raciocinio: 'Borralho tem perfil de decisao (58% das vitorias). De Ridder precisa de takedown e finalizacao, mas tem apenas 30% de precisao em takedowns. A probabilidade de finalizacao nos primeiros 3 rounds e baixa o suficiente para justificar o over.',
        },
        {
          tipo: 'Moneyline',
          pick: 'De Ridder ML (+210)',
          odds: '+210',
          confianca: 'baixa',
          edge_vs_mercado: 'De Ridder e mais perigoso do que as odds sugerem. Venceu Whittaker e Nickal em 2025. Se conseguir levar ao chao, suas 13 finalizacoes sao uma ameaca real.',
          raciocinio: 'Aposta especulativa. De Ridder precisa de tudo certo para vencer: completar takedowns contra um wrestler eficiente e finalizar um cara que nunca foi finalizado no UFC. Mas o premio de +210 compensa o risco para quem gosta de underdogs.',
        },
        {
          tipo: 'Metodo',
          pick: 'De Ridder por Finalizacao',
          odds: '+380',
          confianca: 'baixa',
          edge_vs_mercado: '62% das vitorias de De Ridder sao por finalizacao. Se ele vencer, muito provavelmente sera assim. Odds de +380 para o cenario mais provavel de vitoria do underdog tem algum valor.',
          raciocinio: 'De Ridder nao vai vencer por decisao contra Borralho (cardio inferior, striking inferior). Se ele vencer, sera por finalizacao. O preco de +380 reflete o risco, mas o cenario e plausivel se ele conseguir levar a luta ao chao nos rounds iniciais.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: De Ridder por Decisao',
        descricao: 'Nao aposte em De Ridder por decisao. O holandes tem apenas 14% das vitorias por pontos na carreira e seu cardio e inferior ao de Borralho. Em uma luta de 5 rounds, se nao finalizar, De Ridder provavelmente perde nos cartoes. O unico cenario de vitoria realista para De Ridder e por finalizacao. Apostar em De Ridder por decisao e jogar dinheiro fora.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
