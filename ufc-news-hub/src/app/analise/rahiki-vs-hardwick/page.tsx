import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const data: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'rahiki-vs-hardwick',
  evento_id: null,
  slug: 'rahiki-vs-hardwick',
  titulo: 'Rahiki vs Hardwick: O Estreante Invicto Contra o Campeao Europeu',
  subtitulo: 'Dois caminhos completamente diferentes ate o UFC colidem no APEX',
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
    predictedMethod: 'TKO R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Marwan Rahiki',
    record: '7-0-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Harry Hardwick',
    record: '13-4-1',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Pena (145 lbs)',
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
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Fenomeno Australiano Chega ao Octogono',
      tagline_sub: 'Invicto com 100% de finalizacoes contra o ex-campeao do Cage Warriors',
      fighter1: {
        nome_completo: 'Marwan "Freaky" Rahiki',
        apelido: 'Freaky',
        sobrenome: 'Rahiki',
        record: '7-0-0',
        ranking: 'N/R',
        info_extra: 'Rabat, Marrocos / Sydney, Australia | 23 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Harry "Houdini" Hardwick',
        apelido: 'Houdini',
        sobrenome: 'Hardwick',
        record: '13-4-1',
        ranking: 'N/R',
        info_extra: 'Middlesbrough, Inglaterra | 31 anos',
        imagem_fullbody_url: null,
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Marrocos, Australia, Las Vegas: A Jornada Improvavel</h3>
        <p class="text-gray-300 mb-4">
          <strong class="text-ufc-red">Marwan Rahiki</strong> nasceu em Rabat, no Marrocos, comecou no kickboxing aos 14 anos inspirado pelo pai que era fa de Badr Hari, e aos 19 decidiu que precisava sair do pais. Sem estrutura para MMA no Marrocos, mudou-se para a Australia em outubro de 2022 e comecou a treinar artes marciais mistas pela primeira vez. O que aconteceu depois e algo que ninguem previa: 6 lutas amadoras, depois pro em fevereiro de 2023, e nao parou mais. Sete vitorias, zero derrotas, seis por nocaute e uma por finalizacao. Nenhuma luta foi para os juizes. Ganhou o apelido "Freaky" dos proprios fas australianos porque finalizou suas primeiras quatro lutas no primeiro round.
        </p>
        <p class="text-gray-300 mb-4">
          Do outro lado, <strong class="text-blue-400">Harry Hardwick</strong> representa o caminho longo e classico do MMA europeu. Comecou no Muay Thai em Middlesbrough, migrou para o MMA, passou por Made4TheCage, acumulou experiencia (incluindo tres derrotas no inicio da carreira), e construiu um reinado impressionante no Cage Warriors. Conquistou o titulo peso-pena, defendeu duas vezes, e entrou no UFC com uma sequencia de 10 lutas invictas. Mas a estreia no Octogono foi cruel: aceitou lutar contra Kaue Fernandes com menos de uma semana de aviso em Paris, numa luta de peso-leve, e foi finalizado por leg kicks no primeiro round. Saiu da arena de cadeira de rodas.
        </p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Por Que Essa Luta Faz Sentido</h3>
        <p class="text-gray-300 mb-4">
          O UFC colocou dois lutadores em situacoes opostas um contra o outro. <strong class="text-ufc-red">Rahiki</strong> e o prospect hypeado que precisa confirmar que o potencial do Contender Series se traduz no nivel mais alto. <strong class="text-blue-400">Hardwick</strong> e o veterano que sabe que uma segunda derrota consecutiva no UFC pode significar o fim da linha. Para Rahiki, e a chance de comecar com o pe direito. Para Hardwick, e a chance de mostrar que aquela derrota em Paris foi um acidente de percurso, nao o padrao.
        </p>
        <p class="text-gray-300 mb-4">
          O contexto da divisao peso-pena importa aqui. Hardwick finalmente luta no peso correto (suas melhores performances foram a 145 lbs no Cage Warriors), e Rahiki traz aquela aura de perigo que estreantes invictos com poder de nocaute sempre carregam. E o tipo de luta que pode gerar um highlight reel memoravel ou uma performance tatica surpreendente.
        </p>
      `,
      stakes: [
        { dimensao: 'Objetivo', fighter1: 'Vitoria dominante na estreia UFC', fighter2: 'Redencao apos derrota brutal em Paris' },
        { dimensao: 'Narrativa', fighter1: 'Prospect invicto com 100% de finalizacoes', fighter2: 'Ex-campeao Cage Warriors provando valor no UFC' },
        { dimensao: 'Risco', fighter1: 'Primeira luta no UFC, salto de nivel enorme', fighter2: '0-2 no UFC se perder, futuro incerto' },
        { dimensao: 'Recompensa', fighter1: 'Hype confirmado, proximo passo na divisao', fighter2: 'Primeira vitoria no UFC, credibilidade restaurada' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O FENOMENO E REAL',
          subtitulo: 'Rahiki confirma o hype e se estabelece como prospect serio no peso-pena',
          consequencias: [
            { tag: 'HYPE', texto: 'Rahiki se torna um dos nomes mais comentados entre os prospects do peso-pena, especialmente se vencer por finalizacao.' },
            { tag: 'RANKING', texto: 'Mesmo sem entrar no ranking imediatamente, ganha visibilidade e um proximo oponente de calibre superior.' },
            { tag: 'PROXIMA LUTA', texto: 'UFC provavelmente escala contra outro lutador sem ranking mas com nome, para testar a evolucao.' },
          ],
          proxima_luta: 'Luta contra um gatekeeper do top 15, talvez Lucas Alexander ou outro veterano da divisao.',
        },
        fighter2_vence: {
          titulo: 'HOUDINI ESCAPA DE NOVO',
          subtitulo: 'Hardwick mostra que a derrota em Paris foi circunstancial e que seu nivel e real',
          consequencias: [
            { tag: 'REDENCAO', texto: 'Hardwick apaga a memoria da derrota devastadora em Paris e prova que pertence ao UFC.' },
            { tag: 'CONFIANCA', texto: 'Voltar a lutar no peso correto e vencer restaura a crenca no proprio game plan.' },
            { tag: 'PROXIMA LUTA', texto: 'Com uma vitoria, ganha um oponente mais estabelecido e chance de subir no ranking.' },
          ],
          proxima_luta: 'Luta contra um veterano ranqueado ou prospect mais testado na divisao peso-pena.',
        },
      },
    },

    // -------------------------------------------------
    // 3. MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Marwan Rahiki',
        color: 'red',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Ananias Mulumba',
            result: 'W',
            method: 'KO R2 (2:13)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Foi derrubado e sobreviveu a um estrangulamento profundo antes de voltar e nocautear o oponente no segundo round. Vitoria dramatica no DWCS que rendeu contrato com o UFC.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Gabriel Schlupp',
            result: 'W',
            method: 'TKO R1 (Ground & Pound)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Venceu pelo titulo peso-pena do Beatdown Promotions. Dominou no chao com ground and pound eficiente.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Semakadde Kakembo',
            result: 'W',
            method: 'Sub R4 (Guilhotina)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Venceu pelo titulo peso-pena do HEX Fight Series. Primeira luta que foi alem do segundo round, mostrou paciencia e capacidade de finalizar tarde.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Michael Barber',
            result: 'W',
            method: 'TKO R1 (3:02)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Mais um nocaute rapido no primeiro round no HEX Fight Series. Confirmou o padrao de finalizacoes explosivas.',
          },
          {
            date: 'Set 2024',
            opponent: 'Michael Mannu',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute no primeiro round no HEX Fight Series 32. Rahiki continuou acumulando finalizacoes rapidas.',
          },
        ],
        full_fight_history: [
          {
            date: 'Out 2025',
            opponent: 'Ananias Mulumba',
            result: 'W',
            method: 'KO R2 (2:13)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'DWCS Season 9, Week 10. Rendeu contrato UFC.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Gabriel Schlupp',
            result: 'W',
            method: 'TKO R1 (G&P)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Titulo Beatdown Promotions FW.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Semakadde Kakembo',
            result: 'W',
            method: 'Sub R4 (Guilhotina)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Titulo HEX Fight Series FW.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Michael Barber',
            result: 'W',
            method: 'TKO R1 (3:02)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'HEX Fight Series 34.',
          },
          {
            date: 'Set 2024',
            opponent: 'Michael Mannu',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'HEX Fight Series 32.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Ryan Dennis',
            result: 'W',
            method: 'KO R1 (4:31)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Superfight MMA 22. Nocaute com spinning back kick.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Julian Giustiniano',
            result: 'W',
            method: 'TKO R1 (0:28)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Eternal MMA 82. Nocaute com body shot em 28 segundos.',
          },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Rahiki esta em um momentum absurdo: 7 vitorias, nenhuma derrota, nenhuma luta para os juizes. Ganhou dois titulos regionais e um contrato do UFC via DWCS em 2025. O mais impressionante e que, quando foi testado pela primeira vez de verdade contra Mulumba (derrubado e quase finalizado), mostrou resiliencia e voltou para nocautear. A preocupacao? Todos os seus oponentes ate agora foram de nivel regional australiano, um salto gigantesco ate o UFC.',
      },
      fighter2: {
        nome: 'Harry Hardwick',
        color: 'blue',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Kaue Fernandes',
            result: 'L',
            method: 'TKO R1 (3:21)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC com menos de uma semana de aviso, em Paris, no peso-leve. Leg kicks brutais o destruiram. Saiu de cadeira de rodas. Circunstancias terriveis.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Javier Garcia',
            result: 'W',
            method: 'Decisao Tecnica',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Defendeu o titulo Cage Warriors FW pela segunda vez. Estava dominando quando uma cabecada acidental parou a luta. Venceu por decisao tecnica (40-37, 40-37, 40-37).',
          },
          {
            date: 'Nov 2024',
            opponent: 'Keweny Lopes',
            result: 'W',
            method: 'TKO R4 (1:02)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Primeira defesa do titulo Cage Warriors FW. Finalizou por socos no quarto round apos dominar a luta inteira.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Orlando Wilson Prins',
            result: 'W',
            method: 'TKO R2 (2:18)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Conquistou o titulo vago do Cage Warriors FW com nocaute por socos no segundo round. Newcastle.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Vitor Estevam',
            result: 'W',
            method: 'Sub R2 (0:33)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria por rear-naked choke rapida no segundo round no Cage Warriors 157.',
          },
        ],
        full_fight_history: [
          {
            date: 'Set 2025',
            opponent: 'Kaue Fernandes',
            result: 'L',
            method: 'TKO R1 (3:21)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'UFC Paris. Estreia com short notice no peso-leve.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Javier Garcia',
            result: 'W',
            method: 'TD (40-37 x3)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'CW 186. Segunda defesa titulo FW.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Keweny Lopes',
            result: 'W',
            method: 'TKO R4 (1:02)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'CW 181. Primeira defesa titulo FW.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Orlando Wilson Prins',
            result: 'W',
            method: 'TKO R2 (2:18)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'CW 172. Conquistou titulo vago FW.',
          },
          {
            date: 'Jul 2023',
            opponent: 'Vitor Estevam',
            result: 'W',
            method: 'Sub R2 (0:33)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'CW 157. RNC rapido.',
          },
          {
            date: 'Nov 2022',
            opponent: 'Steve Aimable',
            result: 'W',
            method: 'UD (30-26 x3)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'CW 145. Dominio total por 3 rounds.',
          },
          {
            date: 'Jun 2022',
            opponent: 'Federico Pasquali',
            result: 'D',
            method: 'Majority Draw',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'CW 140. Empate majoritario em Belfast.',
          },
          {
            date: 'Jun 2019',
            opponent: 'Nathan Rose',
            result: 'W',
            method: 'UD',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'M4TC. Vitoria por decisao.',
          },
          {
            date: 'Jun 2018',
            opponent: 'Cameron Hardy',
            result: 'W',
            method: 'Sub R2 (Guilhotina)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'M4TC 29. Finalizacao por guilhotina.',
          },
          {
            date: 'Dez 2017',
            opponent: 'Luke Ord',
            result: 'L',
            method: 'Decisao',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'M4TC. Derrota por decisao no inicio da carreira.',
          },
          {
            date: 'Nov 2014',
            opponent: 'Lewis Garside',
            result: 'W',
            method: 'UD',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'M4TC 15. Uma das primeiras vitorias profissionais.',
          },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Hardwick chegou ao UFC com um momentum incrivel: 10 lutas invictas, titulo do Cage Warriors e duas defesas. Mas a estreia no UFC foi um desastre. Aceitou a luta com menos de uma semana de aviso, subiu para o peso-leve (nao e sua categoria natural), e enfrentou um especialista em leg kicks que o destruiu em 3 minutos. A questao central agora e: aquela derrota foi resultado das circunstancias (short notice, peso errado, viagem) ou expos uma vulnerabilidade real? Nesta luta, finalmente no peso-pena, e a chance de responder.',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Rahiki',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '7W-0L (100%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Hardwick',
        media_oponentes: 1.8,
        media_oponentes_label: 'Medio',
        aproveitamento: '13W-4L (72%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nao ha oponentes em comum entre Rahiki e Hardwick. Os dois construiram suas carreiras em circuitos completamente separados: Rahiki no cenario regional australiano (HEX, Beatdown, Eternal MMA) e Hardwick no circuito europeu (Made4TheCage, Cage Warriors). Essa e a primeira vez que os dois mundos colidem diretamente. O nivel de oposicao que ambos enfrentaram ate aqui pode ser classificado como regional, mas Hardwick tem a vantagem de ter competido contra lutadores europeus mais experientes no Cage Warriors, incluindo titulos em jogo.',
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
          valueA: 0,
          valueB: 0,
          maxVal: 8,
          format: 'decimal',
          note: 'Nenhum dos dois tem estatisticas de UFC para comparar. Rahiki tem 1 luta no DWCS (nao contabilizada no UFCStats). Hardwick tem 1 luta UFC que durou 3:21.',
        },
        {
          label: 'Taxa de Finalizacao (%)',
          valueA: 100,
          valueB: 72,
          maxVal: 100,
          format: 'percent',
          note: 'Rahiki nunca foi para os juizes: 7 vitorias, todas por finalizacao (nocaute ou submissao). Hardwick tem 72% de aproveitamento com 13 vitorias em 18 lutas.',
        },
        {
          label: 'Vitorias por KO/TKO',
          valueA: 6,
          valueB: 3,
          maxVal: 10,
          format: 'integer',
          note: 'Rahiki tem 6 KO/TKOs em 7 lutas (86%). Hardwick tem 3 em 13 vitorias (23%). A diferenca no poder de finalizacao por strikes e enorme.',
        },
        {
          label: 'Vitorias por Submissao',
          valueA: 1,
          valueB: 4,
          maxVal: 6,
          format: 'integer',
          note: 'Hardwick tem 4 submissoes na carreira (incluindo 2 RNCs e 1 guilhotina). Rahiki tem 1 guilhotina contra Kakembo.',
        },
        {
          label: 'Vitorias por Decisao',
          valueA: 0,
          valueB: 6,
          maxVal: 10,
          format: 'integer',
          note: 'Rahiki nunca venceu por decisao. Hardwick tem 6 decisoes em 13 vitorias (46%), mostrando capacidade de vencer lutas longas e taticas.',
        },
        {
          label: 'Taxa de Finalizacao no R1 (%)',
          valueA: 71,
          valueB: 15,
          maxVal: 100,
          format: 'percent',
          note: 'Rahiki finalizou 5 de 7 lutas no primeiro round (71%). Hardwick tem apenas 2 finalizacoes no primeiro round em toda a carreira.',
        },
        {
          label: 'Derrotas na Carreira',
          valueA: 0,
          valueB: 4,
          maxVal: 5,
          format: 'integer',
          reverseWinner: true,
          note: 'Rahiki e invicto (7-0). Hardwick tem 4 derrotas, incluindo 3 no inicio da carreira e a estreia no UFC.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '23 anos',
          fighter2: '31 anos',
          note: '8 anos de diferenca. Rahiki tem a juventude e a explosividade. Hardwick tem a experiencia e maturidade.',
        },
        {
          label: 'Altura',
          fighter1: '1.78m (5\'10")',
          fighter2: '1.73m (5\'8")',
          note: 'Rahiki tem 5cm a mais de altura, uma vantagem leve para manter distancia e conectar golpes de fora.',
        },
        {
          label: 'Envergadura',
          fighter1: '178cm (70")',
          fighter2: '180cm (71")',
          note: 'Hardwick tem 1 polegada a mais de envergadura, compensando parcialmente a desvantagem de altura.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Switch (troca de base)',
          note: 'Hardwick usa switch stance, alternando entre ortodoxa e southpaw. Isso pode criar angulos confusos para Rahiki.',
        },
        {
          label: 'Academia',
          fighter1: 'Lions Den Academy, Sydney',
          fighter2: 'Middlesbrough Fight Academy',
          note: null,
        },
        {
          label: 'Experiencia Pro',
          fighter1: '7 lutas (desde Fev 2023)',
          fighter2: '18 lutas (desde Nov 2014)',
          note: 'Hardwick tem mais que o dobro de lutas profissionais e 9 anos a mais de experiencia.',
        },
      ],
    },

    // -------------------------------------------------
    // 7. PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        {
          label: 'Poder de Nocaute',
          valueA: 85,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Rahiki tem 86% de taxa de nocaute (6 KO/TKO em 7 lutas). Hardwick tem apenas 23% (3 KO/TKO em 13 vitorias). O poder de finalizacao por strikes de Rahiki e vastamente superior.',
        },
        {
          label: 'Boxing / Striking em Pe',
          valueA: 72,
          valueB: 75,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Hardwick e descrito como um lutador de pressao com boxing afiado, trocando combinacoes constantes e variando angulos e alvos. Rahiki vem do kickboxing e e mais explosivo, mas menos tecnico no boxing puro.',
        },
        {
          label: 'Grappling / Chao',
          valueA: 50,
          valueB: 68,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Hardwick tem 4 submissoes na carreira (RNC, guilhotina, triangulo) e ground control solido. Rahiki mostrou ground and pound eficiente mas tem apenas 1 submissao e pouca experiencia de lutas longas no chao.',
        },
        {
          label: 'Cardio / Resistencia',
          valueA: 55,
          valueB: 78,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Hardwick ja lutou multiplas lutas de 5 rounds no Cage Warriors e e conhecido pela pressao implacavel e ritmo que desgasta oponentes. Rahiki so teve uma luta que passou do segundo round (a guilhotina no R4 contra Kakembo).',
        },
        {
          label: 'Explosividade',
          valueA: 88,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'A marca registrada de Rahiki. Spinning back kick KO, body shot KO em 28 segundos, nocautes com cotoveladas e joelhadas. Quando conecta limpo, a luta tende a acabar. Hardwick e mais constante que explosivo.',
        },
        {
          label: 'QI de Luta / Experiencia',
          valueA: 40,
          valueB: 72,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Hardwick tem 18 lutas profissionais desde 2014, incluindo lutas de titulo no Cage Warriors com 5 rounds. Rahiki tem 7 lutas desde 2023, todas em cenario regional. A lacuna de experiencia e significativa.',
        },
      ],
      insight: 'Este confronto e o classico caso de explosividade vs. experiencia. Rahiki traz um poder de finalizacao assustador e atletismo absurdo para um lutador que comecou MMA ha menos de 4 anos. Hardwick contra-ataca com boxing tecnico, pressao constante, grappling funcional e a capacidade de vencer lutas longas. Se Rahiki conectar cedo, pode ser rapido. Se Hardwick sobreviver aos primeiros minutos e levar a luta para aguas profundas, sua experiencia pode ser decisiva.',
    },

    // -------------------------------------------------
    // 8. DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Rahiki',
        ko_tko: { count: 6, percent: 86 },
        submission: { count: 1, percent: 14 },
        decision: { count: 0, percent: 0 },
        total_wins: 7,
      },
      fighter2: {
        nome: 'Hardwick',
        ko_tko: { count: 3, percent: 23 },
        submission: { count: 4, percent: 31 },
        decision: { count: 6, percent: 46 },
        total_wins: 13,
      },
      insight: 'O contraste aqui nao poderia ser mais gritante. Rahiki e praticamente um finalizador puro por strikes: 86% das vitorias por KO/TKO, incluindo body shots, spinning back kicks, cotoveladas e socos. Nunca venceu por decisao. Hardwick e o oposto: 46% das vitorias por decisao, mostrando que e um lutador que sabe vencer rounds e controlar lutas longas. Seus 31% de submissoes indicam perigo real no chao. A grande questao e se Rahiki consegue encontrar o KO antes que Hardwick transforme a luta numa guerra de desgaste.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM RAHIKI',
          color: 'red',
          title: 'Zona de Perigo Maximo',
          description: 'O primeiro round e onde Rahiki e mais perigoso. Cinco de suas sete vitorias vieram no R1, incluindo um nocaute de 28 segundos. Ele tende a entrar explosivo, buscando o KO cedo com combinacoes poderosas e strikes nao convencionais (spinning back kicks, cotoveladas). Hardwick precisa sobreviver esses primeiros 5 minutos sem absorver um golpe limpo. O problema? Na estreia no UFC, Hardwick tomou dano pesado logo no inicio contra Fernandes. Se Rahiki conectar como conectou contra Mulumba, a luta pode acabar rapido.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Decisivo',
          description: 'Se a luta chegar ao segundo round, o cenario muda significativamente. Rahiki ainda tem poder, como demonstrou contra Mulumba (KO aos 2:13 do R2), mas Hardwick comeca a encontrar seu ritmo. O ingles e um lutador de pressao que melhora conforme a luta avanca, cortando o cage e forcando o oponente a lutar no pocket. Se Hardwick conseguir misturar takedowns com boxing de pressao, pode comecar a tomar controle. Rahiki precisa manter a distancia e buscar o golpe decisivo.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM HARDWICK',
          color: 'green',
          title: 'Territorio da Experiencia',
          description: 'O terceiro round favorece Hardwick por completo. Rahiki so teve uma luta que passou do R2 na carreira inteira (a guilhotina no R4 contra Kakembo). Nao sabemos como ele reage com fadiga real no nivel UFC. Hardwick, por outro lado, ja lutou diversos combates de 5 rounds no Cage Warriors e e conhecido por manter ritmo constante. Se a luta estiver competitiva no R3, a experiencia de Hardwick em vencer rounds por controle e volume pode ser o fator decisivo.',
        },
      ],
    },

    // -------------------------------------------------
    // 10. INTANGIVEIS
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'Zap',
          title: 'Estreia no UFC com hype do DWCS',
          fighter: 'Rahiki',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Rahiki vem com o momentum do Contender Series e a pressao de corresponder as expectativas. Estreantes invictos com hype podem brilhar (como aconteceu com Shara Magomedov) ou congelar sob as luzes do UFC. A questao e como ele vai lidar com o ambiente completamente diferente do APEX comparado ao cenario regional australiano.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Derrota traumatica na estreia UFC',
          fighter: 'Hardwick',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Hardwick foi destruido em 3 minutos e saiu de cadeira de rodas de Paris. Psicologicamente, uma derrota tao brutal pode deixar marcas. Ele vai entrar com medo de tomar leg kicks? Vai ser mais cauteloso do que deveria? Ou vai usar a experiencia como combustivel para uma performance de redencao? A resposta a essas perguntas pode definir a luta.',
        },
        {
          icon: 'Clock',
          title: 'Salto de nivel: regional para UFC',
          fighter: 'Rahiki',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Rahiki nunca enfrentou ninguem no nivel UFC. Todos os seus oponentes foram lutadores regionais australianos. O salto de HEX Fight Series e Beatdown Promotions para o Octogono e enorme. Mesmo o DWCS, onde foi derrubado e quase finalizado, e um nivel intermediario. A primeira vez que um prospect enfrenta um lutador com experiencia real de alto nivel europeu e frequentemente um momento revelador.',
        },
        {
          icon: 'Shield',
          title: 'Vulnerabilidade a leg kicks exposta',
          fighter: 'Hardwick',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'A derrota para Fernandes expos uma fraqueza clara: Hardwick e vulneravel a leg kicks. Rahiki vem do kickboxing e certamente vai estudar essa derrota. Se Rahiki incluir chutes baixos no game plan, pode explorar a mesma vulnerabilidade. Mas e importante notar que aquela luta foi no peso-leve, com short notice, e Hardwick pode ter trabalhado essa deficiencia no camp.',
        },
        {
          icon: 'TrendingUp',
          title: 'Finalmente no peso correto',
          fighter: 'Hardwick',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Hardwick estreou no UFC no peso-leve por necessidade (short notice), mas suas melhores performances foram a 145 lbs no Cage Warriors, onde conquistou e defendeu o titulo duas vezes. No peso-pena, ele deve se sentir mais forte, mais rapido e com melhor cardio. E um fator positivo real que nao deve ser ignorado.',
        },
        {
          icon: 'Brain',
          title: 'Resiliencia comprovada no DWCS',
          fighter: 'Rahiki',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Contra Mulumba, Rahiki foi derrubado duas vezes e sobreviveu a um rear-naked choke profundo. Em vez de desistir, voltou e nocauteou o oponente no segundo round. Isso mostrou algo que os numeros nao captam: mentalidade. Para um lutador de 23 anos, essa capacidade de se recuperar de adversidade e extremamente promissora.',
        },
        {
          icon: 'MapPin',
          title: 'Meta APEX em Las Vegas',
          fighter: 'Rahiki',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'O APEX e territorio neutro para ambos. Rahiki ja lutou la no DWCS, entao tem pelo menos alguma familiaridade com o local. Hardwick nunca lutou nos EUA. Nenhum dos dois tera torcida significativa. O ambiente menor do APEX comparado a arenas grandes pode beneficiar Rahiki, que esta mais acostumado a locais menores.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Rahiki',
        total_probability: 55,
        scenarios: [
          {
            name: 'Blitz Explosivo',
            probability: 30,
            method: 'KO/TKO R1',
            description: 'Rahiki entra com tudo no primeiro round, usando sua explosividade natural para pressionar Hardwick. Combinacoes de socos e cotoveladas, golpes nao convencionais como spinning back kicks, e a busca constante pelo golpe limpo. Se conectar nos primeiros minutos, como fez em 5 das suas 7 lutas, Hardwick pode nao aguentar. A chave e acertar antes que o ingles encontre seu ritmo de pressao.',
          },
          {
            name: 'Comeback do Segundo Round',
            probability: 15,
            method: 'KO/TKO R2',
            description: 'Mesmo se Rahiki nao finalizar no R1, ele ainda carrega poder devastador no segundo round, como demonstrou contra Mulumba no DWCS. Se Hardwick comecar a cansar ou a ficar previsivel na pressao, Rahiki pode encontrar uma abertura com um contra-ataque limpo. O cenario e similar ao DWCS: sobreviver momentos dificeis e encontrar o momento certo para o golpe decisivo.',
          },
          {
            name: 'Decisao por Volume Agressivo',
            probability: 10,
            method: 'Decisao Unanime',
            description: 'O cenario menos provavel para Rahiki, ja que nunca venceu por decisao. Mas se ele mantiver distancia, usar leg kicks (a fraqueza exposta de Hardwick) e counters, pode acumular pontos o suficiente para vencer nos cartoes. Exigiria uma evolucao tatica que ainda nao vimos dele.',
          },
        ],
      },
      fighter2: {
        nome: 'Hardwick',
        total_probability: 42,
        scenarios: [
          {
            name: 'Guerra de Desgaste',
            probability: 20,
            method: 'Decisao Unanime',
            description: 'Hardwick sobrevive o primeiro round explosivo de Rahiki e comeca a impor seu ritmo a partir do R2. Pressao constante, cortando o cage, boxing de volume no pocket, e takedowns oportunistas para controlar. No R3, com Rahiki em aguas desconhecidas de fadiga, Hardwick domina com experiencia e cardio. E o caminho mais provavel para Hardwick: tornar a luta feia e vencer rounds.',
          },
          {
            name: 'Submissao Oportunista',
            probability: 12,
            method: 'Sub R2-R3',
            description: 'Hardwick tem 4 submissoes na carreira, incluindo rear-naked chokes e guilhotinas. Se conseguir colocar a luta no chao, especialmente contra um Rahiki mais cansado nos rounds finais, pode encontrar o pescoço ou as costas. O grappling de Rahiki e a area menos testada do seu jogo, e Hardwick pode explorar isso.',
          },
          {
            name: 'Boxing de Pressao',
            probability: 10,
            method: 'TKO R2-R3',
            description: 'Hardwick corta o cage, forca Rahiki para o pocket (onde o ingles e perigoso), e acumula dano com combinacoes constantes. Se Rahiki comecar a recuar e parar de trocacao, Hardwick pode transformar pressao em finalizacao com ground and pound ou socos contra a grade.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // 12. PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Marwan Rahiki',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO nos dois primeiros rounds',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Rahiki e o favorito por razoes claras: poder de nocaute absurdo, invicto, juventude, explosividade atletica e uma aura de perigo que poucos estreantes trazem. Hardwick e tecnicamente solido, mas a derrota brutal para Fernandes levanta questoes sobre sua capacidade de absorver dano no nivel UFC. Dito isso, essa nao e uma previsao de alta confianca. Rahiki nunca enfrentou ninguem nem perto do nivel de Hardwick (ex-campeao Cage Warriors com 18 lutas). O salto de nivel e real, e Hardwick no peso correto e um lutador diferente do que vimos em Paris. Se a luta passar do segundo round, a vantagem comeca a migrar pesadamente para Hardwick. A previsao e que Rahiki encontra o golpe decisivo enquanto ainda tem sua explosividade maxima, provavelmente nos primeiros dois rounds.',
      x_factor: {
        title: 'A Resiliencia do DWCS',
        description: 'Rahiki mostrou contra Mulumba que pode ser derrubado, quase finalizado, e ainda voltar para nocautear. Se Hardwick conseguir machuca-lo ou derruba-lo cedo, isso nao significa que a luta acabou. Rahiki ja provou que tem mentalidade para voltar de situacoes adversas. Essa resiliencia, combinada com o poder de nocaute, e o que torna o jovem marroquino-australiano tao perigoso.',
      },
      upset_alert: {
        title: 'Upset Alert: Hardwick por Decisao',
        description: 'Se Hardwick sobreviver os dois primeiros rounds e impor sua pressao, a falta de experiencia de Rahiki em lutas longas pode ser exposta. Um Rahiki cansado no terceiro round contra um Hardwick com cardio e experiencia de titulo seria um cenario muito perigoso para o favorito. Nao subestime a experiencia de 18 lutas profissionais contra 7.',
      },
      probabilities: {
        fighter1: { nome: 'Rahiki', percent: 55 },
        fighter2: { nome: 'Hardwick', percent: 42 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Rahiki -275 (estimado)', reasoning: 'O favorito e favorito por boas razoes: poder de finalizacao, invicto, explosividade. Mas a -275 o valor ja e comprimido. Apostar na moneyline so faz sentido como parte de um parlay.' },
        method: { pick: 'Rahiki por KO/TKO', reasoning: '86% das vitorias de Rahiki sao por KO/TKO. Se ele vencer, esse e de longe o metodo mais provavel. A linha de Rahiki por nocaute deve oferecer melhor valor que a moneyline pura.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Rahiki finaliza 71% das suas lutas no R1, e 86% nos primeiros 2 rounds. Hardwick foi finalizado no R1 na ultima luta. As chances de uma finalizacao rapida sao significativas, tornando o Under atrativo.' },
        best_value: 'Melhor aposta de valor: Rahiki por KO/TKO a odds elevadas. O metodo especifico oferece pagamento melhor que a moneyline e se alinha perfeitamente com o perfil do lutador.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Os Primeiros 2 Minutos',
          icon: 'Clock',
          description: 'Rahiki normalmente e mais perigoso nos primeiros momentos da luta. Quatro de suas vitorias profissionais vieram em menos de 5 minutos. Observe se ele entra com a mesma agressividade que mostrou na Australia e no DWCS. Se Hardwick sobreviver os primeiros 2 minutos sem tomar um golpe limpo pesado, o cenario comeca a mudar a seu favor.',
        },
        {
          num: 2,
          title: 'Leg Kicks de Rahiki',
          icon: 'Target',
          description: 'Rahiki vem do kickboxing e certamente estudou a derrota de Hardwick para Fernandes. Se ele incluir leg kicks no game plan (algo que seria inteligente dado a vulnerabilidade exposta), pode recriar o mesmo cenario de Paris. Observe se nos primeiros trocacoes Rahiki mira as pernas de Hardwick.',
        },
        {
          num: 3,
          title: 'A Pressao de Hardwick no R2',
          icon: 'Shield',
          description: 'Se a luta chegar ao segundo round, observe se Hardwick consegue impor seu estilo de pressao. Cortar o cage, forcar o pocket, trocar combinacoes de volume. Isso e o que Hardwick faz de melhor, e se funcionar, pode sufocar a explosividade de Rahiki. O R2 e o round mais revelador desta luta.',
        },
        {
          num: 4,
          title: 'A Reacao de Rahiki Sob Pressao Real',
          icon: 'Brain',
          description: 'Rahiki foi testado no DWCS (derrubado, quase finalizado) e respondeu. Mas Hardwick e um nivel diferente de pressao. Observe como Rahiki reage quando Hardwick comeca a apertar: vai manter a compostura e procurar o contra-ataque, ou vai recuar e entrar em modo defensivo? A resposta pode definir sua carreira no UFC.',
        },
        {
          num: 5,
          title: 'Cardio de Rahiki no R3',
          icon: 'Activity',
          description: 'Se a luta chegar ao terceiro round, estamos em territorio desconhecido para Rahiki. So uma luta na carreira passou do R2 (a guilhotina no R4 contra Kakembo). Observe sinais de fadiga: maos caindo, movimentacao mais lenta, strikes sem potencia. Se esses sinais aparecerem, Hardwick com seu cardio comprovado de lutas de 5 rounds pode dominar.',
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
          title: 'RAHIKI vs HARDWICK',
          content: 'UFC Fight Night: Emmett vs Vallejos\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Pena (145 lbs) | 3 Rounds',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'MARWAN "FREAKY" RAHIKI',
          content: '7-0-0 (INVICTO)\n6 KO/TKO | 1 Submissao | 0 Decisoes\n100% de finalizacoes\n71% de nocautes no R1\n\nVem do DWCS com contrato UFC\nNascido no Marrocos, luta pela Australia\n23 anos de idade',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'HARRY "HOUDINI" HARDWICK',
          content: '13-4-1\n3 KO/TKO | 4 Submissoes | 6 Decisoes\nEx-campeao Cage Warriors FW\n2 defesas de titulo\n\nPerdeu estreia UFC por leg kicks (R1)\n31 anos | Middlesbrough, Inglaterra',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'CHAVE DA LUTA',
          content: 'Se Rahiki nocautear no R1: PROSPECT CONFIRMADO\nSe durar 3 rounds: VANTAGEM HARDWICK\n\nRahiki nunca venceu por decisao\nHardwick tem 6 vitorias por decisao\n\nExplosividade vs. Experiencia\nO classico confronto de estilos',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'RAHIKI por KO/TKO nos 2 primeiros rounds\nConfianca: MEDIA\n\n55% Rahiki | 42% Hardwick | 3% Empate\n\nO que pode mudar tudo:\nHardwick sobreviver o R1 explosivo de Rahiki',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/6',
          text: 'Rahiki vs Hardwick neste sabado no Meta APEX. O prospect mais perigoso da Australia contra o ex-campeao Cage Warriors. 7-0 com 100% de finalizacoes vs. 13-4-1 com experiencia de titulo. Vamos quebrar essa luta.',
        },
        {
          num: '2/6',
          text: 'Marwan Rahiki: 23 anos, nascido no Marrocos, mudou para a Australia aos 19, comecou MMA do zero. 7 lutas depois: invicto, 6 KO/TKOs, nocaute em 28 SEGUNDOS na estreia, spinning back kick KO. No DWCS, foi derrubado duas vezes e VOLTOU para nocautear. Esse mlk e diferente.',
        },
        {
          num: '3/6',
          text: 'Harry Hardwick: 31 anos, comecou com 5-3, virou campeao do Cage Warriors FW, 10 lutas invictas, 2 defesas de titulo. Estreou no UFC com short notice no peso-leve e tomou leg kicks brutais. Saiu de cadeira de rodas. Agora, finalmente no peso correto. Redencao ou repeticao?',
        },
        {
          num: '4/6',
          text: 'O dado que define tudo: Rahiki finalizou 71% das lutas no R1. Hardwick NUNCA perdeu uma luta que passou do R2 (exceto a estreia UFC com short notice). Se Rahiki nao finalizar cedo, Hardwick com cardio e experiencia de titulo pode sufocar.',
        },
        {
          num: '5/6',
          text: 'Red flag pro Hardwick: a vulnerabilidade a leg kicks exposta em Paris. Rahiki vem do kickboxing. Se ele estudou a fita do Fernandes (e estudou), pode explorar a mesma fraqueza. Mas short notice + peso errado + Paris podem ter amplificado o problema.',
        },
        {
          num: '6/6',
          text: 'Previsao: Rahiki por KO/TKO nos 2 primeiros rounds. Confianca MEDIA. O poder e real, a explosividade e absurda, mas nunca enfrentou ninguem nesse nivel. Se Hardwick sobreviver e impor pressao, pode virar no R3. Luta fascinante de assistir.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Esse cara saiu do Marrocos, foi pra Australia, comecou MMA do zero, e em menos de 3 anos ta invicto no UFC. 7 lutas, 7 finalizacoes, incluindo um nocaute em 28 segundos. Mas sera que o hype sobrevive contra um ex-campeao europeu?"',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Marwan Rahiki, 23 anos, 7-0, tudo por finalizacao. Contra Harry Hardwick, 31 anos, ex-campeao Cage Warriors com 2 defesas de titulo. O problema? Hardwick estreou no UFC e foi destruido por leg kicks em 3 minutos. Saiu de cadeira de rodas. Agora, finalmente no peso certo, precisa de redencao."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"A chave da luta e simples: tempo. Rahiki nocauteia 71% das lutas no primeiro round. Se conectar cedo, acabou. Mas Hardwick nunca perdeu uma luta completa antes do UFC. Se sobreviver e impor pressao, Rahiki vai entrar em aguas desconhecidas. Ele so teve uma luta que passou do segundo round na carreira inteira."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Duas coisas me preocupam. Pra Rahiki: ele nunca enfrentou ninguem nesse nivel, e o salto de cenario regional australiano pro UFC e gigantesco. Pra Hardwick: a vulnerabilidade a leg kicks e real, e Rahiki vem do kickboxing. Se ele mirar as pernas, pode ser Paris de novo."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Rahiki por nocaute nos 2 primeiros rounds, confianca media. O poder e real, mas o salto de nivel tambem e. Se voce acha que Hardwick sobrevive e vira no terceiro, comenta ai. Essa luta e sabado no APEX. Salva pra assistir."',
        },
      ],
      tiktok: [
        {
          hook: 'Esse cara comecou MMA ha menos de 4 anos e ja ta invicto no UFC com 100% de finalizacoes.',
          body: 'Marwan Rahiki saiu do Marrocos, foi pra Australia aos 19, comecou MMA do zero, e em 7 lutas: 6 nocautes e 1 submissao. Nenhuma decisao. Neste sabado enfrenta o ex-campeao Cage Warriors Harry Hardwick, que perdeu a estreia no UFC de forma brutal mas agora luta no peso correto.',
          cta: 'Rahiki confirma o hype ou Hardwick mostra que experiencia vence talento? Comenta sua previsao.',
        },
        {
          hook: 'Esse lutador saiu do UFC de cadeira de rodas na estreia e agora precisa vencer pra sobreviver.',
          body: 'Harry Hardwick era campeao do Cage Warriors, 10 lutas invictas, 2 defesas de titulo. Estreou no UFC com short notice no peso errado e tomou leg kicks que o destruiram em 3 minutos. Agora enfrenta um prospect invicto de 23 anos que nocauteia todo mundo no primeiro round. Pressao total.',
          cta: 'Redencao ou eliminacao? Comenta o que voce acha que vai acontecer.',
        },
        {
          hook: '28 segundos. Foi o tempo que esse cara precisou pra nocautear um oponente com um body shot.',
          body: 'Marwan Rahiki tem 7 lutas e zero decisoes. Spinning back kick KO, body shot KO em 28 segundos, cotoveladas, joelhadas. O UFC escalou ele contra Hardwick, que tem 18 lutas de experiencia. Explosividade vs. experiencia. Se durar 3 rounds, Hardwick vence. Se Rahiki conectar cedo, acabou.',
          cta: 'Salva esse video e volta sabado pra ver se acertei. Previsao nos comentarios.',
        },
      ],
      headlines: [
        'RAHIKI vs HARDWICK: O Prospect Invicto com 100% de Finalizacoes Contra o Ex-Campeao Europeu',
        'De Rabat a Las Vegas: A Jornada Improvavel de Marwan Rahiki Ate o UFC',
        'Hardwick Busca Redencao Apos Estreia Devastadora no UFC',
        '7-0 com Zero Decisoes: Por Que Rahiki e o Prospect Mais Perigoso do Peso-Pena',
        'Explosividade vs. Experiencia: A Luta que Define Dois Caminhos no UFC',
        'De Cadeira de Rodas em Paris a Chance de Redencao em Las Vegas',
      ],
    },

    // -------------------------------------------------
    // BETTING VALUE (always null)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // 15. RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '-275',
        fighter2_odds: '+210',
        fighter1_name: 'Marwan Rahiki',
        fighter2_name: 'Harry Hardwick',
        source: 'Media estimada de linhas de abertura (marco 2026)',
      },
      edges: [
        {
          icon: 'Flame',
          titulo: 'Taxa de Finalizacao Perfeita',
          stat_headline: '7 LUTAS, 7 FINALIZACOES, 0 DECISOES',
          contexto: 'Rahiki nunca foi para os juizes em sua carreira profissional. Das 7 vitorias, 6 foram por KO/TKO e 1 por submissao. Essa taxa de finalizacao de 100% e excepcionalmente rara, mesmo para prospects. Para contextualizar: entre os top 15 do peso-pena do UFC, ninguem tem taxa de finalizacao acima de 85%.',
          implicacao_aposta: 'Linhas de "luta nao vai para decisao" devem ter valor significativo. Se voce acredita em Rahiki, a aposta em KO/TKO especificamente oferece melhor pagamento que a moneyline pura e se alinha com o padrao historico do lutador.',
          edge_level: 'forte',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Clock',
          titulo: 'Dominancia no Primeiro Round',
          stat_headline: '5 DE 7 VITORIAS NO R1 (71%)',
          contexto: 'Rahiki tende a resolver as coisas cedo. Cinco de suas sete vitorias vieram no primeiro round, incluindo um nocaute de 28 segundos contra Giustiniano e um spinning back kick KO contra Dennis. O padrao e claro: ele entra explosivo e busca a finalizacao rapida.',
          implicacao_aposta: 'Under 1.5 rounds pode ter valor em odds especificas. Mas cuidado: Hardwick, antes da estreia no UFC, nunca tinha sido finalizado no R1 na sua carreira recente. A consistencia de Rahiki no R1 pode nao se manter contra um nivel superior de oposicao.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Target',
          titulo: 'Vulnerabilidade a Leg Kicks Exposta',
          stat_headline: 'HARDWICK FINALIZADO POR LEG KICKS EM 3:21 NA ESTREIA UFC',
          contexto: 'Na estreia contra Kaue Fernandes, Hardwick foi destruido por calf kicks que o imobilizaram em pouco mais de 3 minutos. Rahiki vem do kickboxing e tem a capacidade tecnica para explorar a mesma fraqueza. Se o camp de Rahiki estudou a fita (certamente estudou), leg kicks serao parte do game plan.',
          implicacao_aposta: 'Esse dado favorece uma finalizacao por TKO (socos/kicks) caso Rahiki explore essa vulnerabilidade. Porem, e importante considerar que aquela luta foi em circunstancias adversas para Hardwick (short notice, peso-leve, viagem). Ele pode ter trabalhado essa deficiencia no camp.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Shield',
          titulo: 'Experiencia de Hardwick em Lutas Longas',
          stat_headline: '6 VITORIAS POR DECISAO (46% DAS VITORIAS)',
          contexto: 'Hardwick venceu 6 das suas 13 vitorias por decisao, incluindo lutas de titulo no Cage Warriors que foram para 4-5 rounds. Ele e um lutador que sabe vencer rounds por controle, volume e pressao constante. Contra um oponente que nunca venceu por decisao e mal passou do R2, essa experiencia e valiosa.',
          implicacao_aposta: 'Se voce acredita que a luta vai para a distancia, Hardwick por decisao pode oferecer odds atrativas como underdog. A combinacao de experiencia em lutas longas + cardio comprovado + Rahiki em aguas desconhecidas cria valor real nessa linha.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Activity',
          titulo: 'Cardio Desconhecido de Rahiki',
          stat_headline: 'APENAS 1 LUTA QUE PASSOU DO R2 EM 7 PROFISSIONAIS',
          contexto: 'Rahiki so teve uma luta que ultrapassou o segundo round: a submissao no R4 contra Kakembo no HEX Fight Series. Em todas as outras, resolveu rapido. Nao sabemos como ele reage com fadiga real no nivel UFC. O ambiente e intensidade sao completamente diferentes do cenario regional.',
          implicacao_aposta: 'Over 2.5 rounds pode ter valor se voce acredita que Hardwick sobrevive a explosividade inicial de Rahiki. Uma luta que vai para o R3 favorece fortemente Hardwick. Essa e a tensao central para apostadores: Under 1.5 (Rahiki finaliza cedo) vs. Over 2.5 (luta longa favorece Hardwick).',
          edge_level: 'leve',
          fighter_side: 'neutral',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Rahiki por KO/TKO',
          odds: '+110 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Se Rahiki vencer, 86% de chance de ser por KO/TKO baseado no historico. A moneyline pura esta a -275, mas Rahiki por KO especificamente deve pagar mais.',
          raciocinio: 'O perfil de finalizacao de Rahiki e esmagadoramente voltado para nocautes. 6 de 7 vitorias por KO/TKO, nenhuma decisao. Se ele vai vencer esta luta, o metodo mais provavel e, de longe, o nocaute. As odds de metodo especifico devem oferecer melhor retorno que a moneyline comprimida a -275.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Under 2.5 Rounds',
          odds: '-115 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Rahiki finaliza 86% nos dois primeiros rounds. Hardwick foi finalizado no R1 na ultima luta. Ambos os dados apontam para finalizacao rapida.',
          raciocinio: 'A combinacao de Rahiki como finalizador predominante no R1 com a vulnerabilidade demonstrada por Hardwick na ultima luta sugere que as chances de finalizacao rapida sao altas. Dito isso, se Hardwick entrar com game plan defensivo e impor clinch/takedowns, pode frustrar Rahiki e arrastar a luta.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Hardwick +210',
          odds: '+210',
          confianca: 'baixa',
          edge_vs_mercado: 'Hardwick como underdog a +210 pode ter valor se voce acredita que o nivel de oposicao de Rahiki nao se traduz para o UFC.',
          raciocinio: 'Aposta de valor especulativa. Hardwick tem 18 lutas de experiencia, e ex-campeao Cage Warriors com 2 defesas de titulo, e finalmente luta no peso correto. A derrota em Paris foi em circunstancias adversas. Se ele sobreviver o R1 e impor seu jogo de pressao e volume, pode vencer por decisao ou late finish. A +210, as odds compensam o risco.',
        },
        {
          tipo: 'Duracao',
          pick: 'Luta nao vai para decisao',
          odds: '-140 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'Rahiki tem 0 decisoes em 7 lutas. Hardwick foi finalizado na ultima. Ambos os perfis apontam para finalizacao.',
          raciocinio: 'Esse e provavelmente a aposta com maior valor relativo. Rahiki nunca foi para decisao. Sua taxa de finalizacao e 100%. Mesmo Hardwick, quando perde, tende a ser finalizado (a derrota mais recente foi TKO R1). A probabilidade de essa luta ir para os cartoes e baixa. Se ambos os lutadores sao verdadeiros ao seu estilo, alguem vai ser finalizado.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Rahiki no R1 a Odds Curtas',
        descricao: 'Pode parecer obvio apostar em "Rahiki vence no R1" dada sua dominancia historica no primeiro round (71% das vitorias). Mas cuidado com dois fatores. Primeiro: todos esses nocautes no R1 foram contra oponentes de nivel regional australiano, nao contra um ex-campeao europeu com experiencia de titulo. Segundo: no DWCS, contra um oponente marginalmente melhor (Mulumba), Rahiki foi derrubado e quase finalizado no R1. A dominancia no R1 pode nao se traduzir para o nivel UFC. Apostar em Under 2.5 e mais seguro que apostar especificamente em "Rahiki R1".',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={data} />;
}
