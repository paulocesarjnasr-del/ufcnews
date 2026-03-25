'use client';

import { useLocale } from 'next-intl';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';


const analisePT: FullSingleAnalise = {
  id: 'grasso-vs-barber',
  evento_id: null,
  slug: 'grasso-vs-barber',
  titulo: 'Grasso vs Barber: A Revanche da Redenção',
  subtitulo: 'Ex-campea em queda livre reencontra a mulher que venceu em 2021, mas que agora traz 7 vitorias seguidas',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,65m', envergadura: '168cm', idade: 32, academia: 'Lobo Gym' },
      fighter2: { altura: '1,65m', envergadura: '165cm', idade: 27, academia: 'High Altitude Martial Arts' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Alexa Grasso',
    record: '16-5-1',
    ultimasLutas: [
      { result: 'L', opponent: 'Natalia Silva', method: 'Decisao Unanime', event: 'UFC 315' },
      { result: 'L', opponent: 'Valentina Shevchenko', method: 'Decisao Unanime', event: 'UFC 306' },
      { result: 'D', opponent: 'Valentina Shevchenko', method: 'Empate Dividido', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Maycee Barber',
    record: '15-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Karine Silva', method: 'Decisao Unanime', event: 'UFC 323' },
      { result: 'W', opponent: 'Katlyn Cerminara', method: 'Decisao Unanime', event: 'UFC 299' },
      { result: 'W', opponent: 'Amanda Ribas', method: 'KO R2', event: 'UFC on ABC 5' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Mosca Feminino (125 lbs)',
  num_rounds: 5,
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
      categoria_peso: 'Peso Mosca Feminino (125 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'A Revanche da Redencao',
      tagline_sub: '5 anos depois, papeis invertidos e tudo em jogo na divisao',
      fighter1: {
        nome_completo: 'Alexa Grasso',
        apelido: '',
        sobrenome: 'Grasso',
        record: '16-5-1',
        ranking: '#3 Peso Mosca',
        info_extra: 'Guadalajara, Mexico | 32 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-05/GRASSO_ALEXA_L_05-10.png?itok=I3pDf9FG',
      },
      fighter2: {
        nome_completo: 'Maycee "The Future" Barber',
        apelido: 'The Future',
        sobrenome: 'Barber',
        record: '15-2-0',
        ranking: '#5 Peso Mosca',
        info_extra: 'Greeley, Colorado | 27 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/BARBER_MAYCEE_L_12-06.png?itok=PsAi5oK3',
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">De Campea a Encruzilhada</h3>
        <p class="mb-4">
          Em marco de 2023, <strong class="text-ufc-red">Alexa Grasso</strong> chocou o mundo ao finalizar Valentina Shevchenko no quarto round do UFC 285, conquistando o cinturao peso mosca feminino. Era o auge de uma jornada que comecou na categoria palha, passou por derrotas duras e finalmente encontrou seu ritmo nos 125 lbs. A mexicana de Guadalajara parecia destinada a dominar a divisao por anos.
        </p>
        <p class="mb-4">
          Menos de tres anos depois, o cenario e completamente diferente. Grasso empatou na revanche com Shevchenko, perdeu o cinturao de forma clara no UFC 306, e depois caiu para Natalia Silva no UFC 315. Duas derrotas consecutivas. O primeiro momento de queda real na carreira dela. Aos 32 anos, a pergunta e inevitavel: a melhor versao de Grasso ja ficou para tras?
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Transformacao de "The Future"</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Maycee Barber</strong> nao e mais aquela garota de 22 anos que perdeu para Grasso em 2021. Naquela epoca, Barber voltava de uma lesao grave no joelho (ruptura de LCA), estava fora de ritmo e claramente nao era a mesma lutadora. Grasso venceu com facilidade por decisao unanime. Cinco anos depois, Barber acumulou sete vitorias consecutivas, sobreviveu a uma hospitalizacao por pneumonia e infeccao que quase tirou sua vida, superou um episodio de pseudo-convulsao minutos antes de um main event, e emergiu como uma das lutadoras mais resilientes da divisao.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Revanche Que Faz Sentido</h3>
        <p class="mb-4">
          Os papeis se inverteram completamente. Em 2021, Grasso era a favorita tecnica e Barber a jovem precipitada. Agora, Barber e a favorita nas casas de apostas, com momentum, confianca e uma sequencia impressionante. Grasso precisa dessa vitoria para se manter relevante na conversa pelo titulo. Uma terceira derrota seguida, contra alguem que ela ja venceu, seria devastadora para a narrativa de retorno.
        </p>
        <p class="mb-4">
          Para Barber, essa luta e sobre provar evolucao. Vencer Grasso fecha o circulo, apaga a derrota de 2021 e coloca "The Future" a poucos passos de uma disputa de titulo. O co-main event de Seattle carrega o peso de duas carreiras em direcoes opostas.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#3 Peso Mosca', fighter2: '#5 Peso Mosca' },
        { dimensao: 'Sequencia', fighter1: '2 derrotas consecutivas', fighter2: '7 vitorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Parar a queda e voltar a conversa pelo titulo', fighter2: 'Vingar a derrota de 2021 e subir no ranking' },
        { dimensao: 'Narrativa', fighter1: 'Ex-campea em busca de redencao', fighter2: 'Evolucao e vinganca' },
        { dimensao: 'Risco', fighter1: '3a derrota seguida seria catastrofica', fighter2: 'Perder para Grasso duas vezes freia o hype' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A EXPERIENCIA PREVALECE',
          subtitulo: 'Grasso mostra que a tecnica de ex-campea ainda e superior',
          consequencias: [
            { tag: 'RANKING', texto: 'Grasso se mantem no top 3 e volta a fila pelo titulo peso mosca' },
            { tag: 'LEGADO', texto: 'Prova que as duas derrotas foram contra oponentes de elite, nao sinal de declinio' },
            { tag: 'BARBER', texto: 'Barber perde pela terceira vez na carreira e a sequencia de 7 vitorias e interrompida' },
          ],
          proxima_luta: 'Grasso vs vencedora de luta por titulo ou contra outra top 5',
        },
        fighter2_vence: {
          titulo: 'THE FUTURE FINALMENTE CHEGA',
          subtitulo: 'Barber vinga a derrota de 2021 e prova que evoluiu alem de qualquer duvida',
          consequencias: [
            { tag: 'TITULO', texto: 'Barber entra oficialmente na conversa pelo titulo peso mosca com 8 vitorias seguidas' },
            { tag: 'LEGADO', texto: 'A narrativa de superacao (LCA, pneumonia, pseudo-convulsao) ganha mais um capitulo epico' },
            { tag: 'GRASSO', texto: 'Terceira derrota seguida praticamente elimina Grasso da corrida pelo titulo a curto prazo' },
          ],
          proxima_luta: 'Barber vs desafiante ao titulo ou luta eliminatoria contra top 3',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Alexa Grasso',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Natalia Silva', result: 'L', method: 'Decisao Unanime', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Perdeu de forma clara para a brasileira em ascensao. Nao conseguiu impor seu jogo' },
          { date: 'Set 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'Decisao Unanime', opponent_rank: 'Ex-Campea WFLW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu o cinturao na trilogia. Shevchenko dominou e recuperou o titulo' },
          { date: 'Set 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'Empate Dividido', opponent_rank: 'Campea WFLW', quality_score: 5, quality_label: 'Excelente', note: 'Reteve o titulo no empate controverso. Muitos viram vitoria de Shevchenko' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Submissao R4', opponent_rank: 'Campea WFLW', quality_score: 5, quality_label: 'Excelente', note: 'O momento mais alto da carreira. Finalizou a dominante Shevchenko para conquistar o titulo' },
          { date: 'Out 2022', opponent: 'Viviane Araujo', result: 'W', method: 'Decisao Unanime', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida que garantiu a disputa de titulo' },
        ],
        full_fight_history: [
          { date: 'Nov 2016', opponent: 'Heather Jo Clark', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC na categoria palha' },
          { date: 'Fev 2017', opponent: 'Felice Herrig', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira derrota profissional' },
          { date: 'Ago 2017', opponent: 'Randa Markos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria apertada por decisao dividida' },
          { date: 'Fev 2018', opponent: 'Tatiana Suarez', result: 'L', method: 'UD', opponent_rank: '#9 WSW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrotada pela wrestler dominante Suarez' },
          { date: 'Jun 2019', opponent: 'Karolina Kowalkiewicz', result: 'W', method: 'UD', opponent_rank: '#9 WSW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria clara contra ex-desafiante ao titulo' },
          { date: 'Set 2019', opponent: 'Carla Esparza', result: 'L', method: 'MD', opponent_rank: '#7 WSW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota por maioria. Rendeu Luta da Noite' },
          { date: 'Ago 2020', opponent: 'Ji Yeon Kim', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira vitoria nos peso mosca' },
          { date: 'Fev 2021', opponent: 'Maycee Barber', result: 'W', method: 'UD', opponent_rank: '#12 WFLW', quality_score: 2, quality_label: 'Medio', note: 'Dominou Barber com boxe tecnico e ground game' },
          { date: 'Out 2022', opponent: 'Viviane Araujo', result: 'W', method: 'UD', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Garantiu a disputa de titulo' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Sub R4', opponent_rank: 'Campea', quality_score: 5, quality_label: 'Excelente', note: 'Conquistou o titulo por finalizacao' },
          { date: 'Set 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'SD (empate)', opponent_rank: 'Campea', quality_score: 5, quality_label: 'Excelente', note: 'Empate dividido controverso' },
          { date: 'Set 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'UD', opponent_rank: 'Ex-Campea', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu o cinturao na trilogia' },
          { date: 'Mai 2025', opponent: 'Natalia Silva', result: 'L', method: 'UD', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Segunda derrota consecutiva' },
        ],
        layoff_warning: 'Cerca de 10 meses sem lutar desde maio de 2025. Periodo moderado de inatividade.',
        momentum_score: 3,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Grasso vive o pior momento da carreira no UFC. Duas derrotas seguidas, incluindo a perda do titulo para Shevchenko e uma derrota para Natalia Silva. A unica vitoria nos ultimos tres anos foi a finalizacao historica de Shevchenko em marco de 2023, seguida por um empate e duas derrotas. Aos 32 anos, a janela de oportunidade esta se fechando. Precisa urgentemente de uma vitoria para reconquistar confianca.',
      },
      fighter2: {
        nome: 'Maycee Barber',
        color: 'blue',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Karine Silva', result: 'W', method: 'Decisao Unanime', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida contra brasileira ranqueada. Mostrou maturidade e controle' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria dominante antes da hospitalizacao por pneumonia' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Nocaute devastador com cotoveladas no ground and pound. Performance da Noite' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'Decisao Dividida', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria apertada e controversa por decisao dividida' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria clara contra veterana da divisao' },
        ],
        full_fight_history: [
          { date: 'Nov 2018', opponent: 'Hannah Cifers', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC com finalizacao' },
          { date: 'Mar 2019', opponent: 'JJ Aldrich', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segundo TKO consecutivo' },
          { date: 'Out 2019', opponent: 'Gillian Robertson', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Tres finalizacoes seguidas para abrir a carreira' },
          { date: 'Jan 2020', opponent: 'Roxanne Modafferi', result: 'L', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Primeira derrota. Modafferi usou experiencia para frustrar Barber' },
          { date: 'Fev 2021', opponent: 'Alexa Grasso', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Voltava de lesao no LCA. Grasso dominou com boxe tecnico' },
          { date: 'Jul 2021', opponent: 'Miranda Maverick', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida controversa' },
          { date: 'Abr 2022', opponent: 'Montana De La Rosa', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria tranquila' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria dominante contra veterana' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'SD', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Decisao dividida apertada' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Performance da Noite' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Antes da hospitalizacao' },
          { date: 'Dez 2025', opponent: 'Karine Silva', result: 'W', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bom', note: 'Voltou apos quase dois anos fora' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Barber acumula sete vitorias consecutivas e esta no melhor momento da carreira. O que impressiona nao sao apenas os resultados, mas o contexto: ela superou uma hospitalizacao de nove dias por pneumonia e infeccao em 2024, um episodio de pseudo-convulsao antes de um main event em 2025, e mesmo assim voltou para vencer Karine Silva de forma convincente. A resiliencia mental dela e tao impressionante quanto a evolucao tecnica.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Grasso',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '8W-5L-1D (57%)',
        contra_top5: '1W-2L',
      },
      fighter2: {
        nome: 'Barber',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '12W-2L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'O confronto direto em 2021 e a referencia principal. Grasso venceu Barber por decisao unanime no UFC 258, mas Barber voltava de uma cirurgia no joelho (LCA) e claramente nao era a mesma lutadora. Cinco anos de evolucao depois, a comparacao daquela luta tem valor limitado.',
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
        { label: 'Sig. Strikes por Minuto', valueA: 4.67, valueB: 4.60, maxVal: 7, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 43, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.95, valueB: 2.72, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 58, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.41, valueB: 1.14, maxVal: 3, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 45, valueB: 35, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 59, valueB: 45, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '27 anos', note: 'Barber 5 anos mais jovem' },
        { label: 'Altura', fighter1: '1,65m (5\'5")', fighter2: '1,65m (5\'5")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '168cm (66")', fighter2: '165cm (65")', note: 'Grasso com 1 polegada de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Switch', note: 'Barber alterna bases' },
        { label: 'Academia', fighter1: 'Lobo Gym, Guadalajara', fighter2: 'High Altitude MA, Denver', note: null },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Boxe Tecnico', valueA: 80, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Grasso tem o boxe mais tecnico e refinado. Contragolpes precisos e combinacoes fluidas.' },
        { label: 'Pressao e Volume', valueA: 55, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Barber pressiona mais, trabalha com volume alto e forca o ritmo constantemente.' },
        { label: 'Jiu-Jitsu e Submissao', valueA: 75, valueB: 45, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Grasso finalizou Shevchenko. Ameaca real no chao. Barber evoluiu mas nao e referencia.' },
        { label: 'Wrestling e Controle', valueA: 50, valueB: 60, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Barber tem mais atividade de takedown e usa wrestling para impor o jogo.' },
        { label: 'Cardio e Resistencia', valueA: 72, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'even', advantage_note: 'Ambas ja lutaram 5 rounds. Barber ligeiramente melhor em manter volume nos rounds finais.' },
        { label: 'Poder de Finalizacao', valueA: 40, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Barber tem 6 KO/TKOs em 15 vitorias (40%). Grasso tem 4 em 16 (25%). Barber machuca mais.' },
      ],
      insight: 'Uma luta de contrastes claros. Grasso e a tecnica, a contragolpeadora, a faixa preta de jiu-jitsu que pode encerrar a luta se for ao chao. Barber e a pressao, o volume, a agressividade que nao para. A chave e se Grasso consegue manter distancia e usar o timing, ou se Barber consegue sufocar o espaco.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Grasso',
        ko_tko: { count: 4, percent: 25 },
        submission: { count: 2, percent: 13 },
        decision: { count: 10, percent: 62 },
        total_wins: 16,
      },
      fighter2: {
        nome: 'Barber',
        ko_tko: { count: 6, percent: 40 },
        submission: { count: 2, percent: 13 },
        decision: { count: 7, percent: 47 },
        total_wins: 15,
      },
      insight: 'Os numeros revelam estilos opostos. Grasso e primariamente uma lutadora de decisao (62%), com o boxe tecnico acumulando pontos ao longo dos rounds. A finalizacao de Shevchenko por submissao foi a excecao brilhante, nao a regra. Barber traz mais poder de finalizacao, com 40% das vitorias por KO/TKO. Quando Barber machuca alguem, ela nao para ate encerrar. A cotovelada que nocauteou Ribas em 2023 prova isso.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 6,
          danger_label: 'VANTAGEM GRASSO',
          color: 'red',
          title: 'O Territorio da Tecnica',
          description: 'Os primeiros rounds sao onde Grasso historicamente se sai melhor. Fresca e focada, o boxe tecnico dela funciona melhor quando tem energia para manter distancia e contragolpear. Se Grasso vai vencer essa luta, precisa construir vantagem cedo, antes que a pressao de Barber comece a pesar. O jab e os contragolpes serao a chave.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'ROUND DECISIVO',
          color: 'gold',
          title: 'O Ponto de Inflexao',
          description: 'O terceiro round e historicamente o momento em que lutadoras de pressao comecam a assumir o controle. Se Barber conseguiu fechar distancia nos dois primeiros rounds sem sofrer dano significativo, o R3 e onde o volume e o wrestling dela podem comecar a mudar a luta. Para Grasso, manter a defesa e o contragolpe aqui e fundamental.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM BARBER',
          color: 'green',
          title: 'A Pressao Nao Para',
          description: 'Nos championship rounds, a juventude de Barber (27 vs 32) e a atividade recente podem ser fatores decisivos. Grasso mostrou sinais de fadiga nos rounds finais contra Shevchenko na trilogia. Se Barber esta a frente ou equilibrada neste ponto, o ritmo e a pressao devem definir a luta. Grasso precisa de algo especial, como uma submissao, se estiver atras nos pontos.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Sequencia de Derrotas', fighter: 'Grasso', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Grasso vem de duas derrotas consecutivas pela primeira vez na carreira. Perder o cinturao e depois cair para Natalia Silva pode ter abalado a confianca. O fator psicologico de uma possivel terceira derrota seguida e real.' },
        { icon: 'Shield', title: 'Resiliencia Sobre-Humana', fighter: 'Barber', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Barber sobreviveu a uma hospitalizacao de 9 dias por pneumonia e infeccao (febre de 41C, pressao arterial perigosamente baixa), um episodio de pseudo-convulsao minutos antes de um main event, e voltou para vencer. A fortaleza mental dessa garota e incomparavel.' },
        { icon: 'Clock', title: 'Inatividade de Grasso', fighter: 'Grasso', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Grasso nao luta desde maio de 2025, cerca de 10 meses de inatividade. Barber lutou em dezembro de 2025. A diferenca de ritmo pode ser relevante nos primeiros minutos.' },
        { icon: 'Brain', title: 'Fator Psicologico da Revanche', fighter: 'Barber', risk_level: 'POSITIVO', risk_color: 'green', description: 'Barber perdeu a primeira luta. Lutadoras frequentemente lutam melhor na revanche quando sabem o que esperar. Barber tem 5 anos de evolucao e a motivacao da vinganca.' },
        { icon: 'AlertTriangle', title: 'Historico de Saude de Barber', fighter: 'Barber', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'A pseudo-convulsao de 2025 e a pneumonia de 2024 levantam questoes sobre saude a longo prazo. Porem, Barber venceu Karine Silva de forma convincente em dezembro, sugerindo recuperacao completa.' },
        { icon: 'Zap', title: 'Jiu-Jitsu de Grasso', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Se a luta for ao chao, Grasso tem a ameaca de submissao. Finalizou Shevchenko, a lutadora mais dominante da historia do peso mosca. Um erro de Barber no ground game pode custar a luta.' },
        { icon: 'Activity', title: 'Evolucao Tecnica de Barber', fighter: 'Barber', risk_level: 'POSITIVO', risk_color: 'green', description: 'A Barber de 2026 e uma lutadora completamente diferente da versao de 2021. Melhor wrestling, mais madura, mais paciente. Sete vitorias consecutivas provam a evolucao. Grasso precisa adaptar o gameplan.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Grasso',
        total_probability: 40,
        scenarios: [
          { name: 'Boxe Tecnico e Contragolpes', probability: 22, method: 'Decisao Unanime/Dividida', description: 'Grasso mantem distancia, usa o jab e contragolpes precisos para frustrar a pressao de Barber. Vence nos pontos com rounds claros de superioridade tecnica, como fez na primeira luta em 2021.' },
          { name: 'Submissao Oportunista', probability: 10, method: 'Submissao R2-R4', description: 'Se a luta for ao chao, Grasso pode encontrar uma submissao. A defesa de takedown de Barber (45%) pode leva-la ao solo, e la Grasso tem vantagem clara em jiu-jitsu.' },
          { name: 'Ataque ao Corpo e Desgaste', probability: 8, method: 'TKO R4-R5 ou Decisao', description: 'Grasso trabalha o corpo de Barber nos primeiros rounds, acumulando dano e tirando o gas nos rounds finais. Cenario menos provavel mas possivel se Grasso encontrar o timing.' },
        ],
      },
      fighter2: {
        nome: 'Barber',
        total_probability: 57,
        scenarios: [
          { name: 'Pressao e Volume Implacavel', probability: 30, method: 'Decisao Unanime', description: 'Barber faz o que faz de melhor: pressiona, fecha distancia, mistura striking com wrestling e nao deixa Grasso respirar. Vence uma decisao clara com volume e controle.' },
          { name: 'Nocaute por Acumulo', probability: 15, method: 'TKO R3-R4', description: 'A pressao constante machuca Grasso. Cotoveladas, ganchos e ground and pound acumulam dano ate o arbitro ou corner parar. Grasso absorve 3.95 strikes por minuto, taxa alta.' },
          { name: 'Dominio no Wrestling', probability: 12, method: 'Decisao Unanime', description: 'Barber usa o wrestling para levar Grasso ao chao repetidamente. Mesmo que Grasso tenha jiu-jitsu superior, se Barber controlar de cima sem dar espaco, os juizes premiam o controle.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Maycee Barber',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Barber tem o momentum, a juventude e a evolucao a seu favor. Em 2021, Grasso venceu uma versao muito inferior de Barber, recem-operada do joelho e sem ritmo. A Barber de 2026 e outra lutadora: mais madura, com sete vitorias consecutivas, wrestling melhorado e a resiliencia mental de quem sobreviveu a situacoes extremas fora do octogono. Grasso, por outro lado, vem de duas derrotas seguidas e nao vence desde marco de 2023 (se considerarmos que o empate nao e vitoria). A taxa de absorcao de strikes de Grasso (3.95 por minuto) e preocupante contra alguem que pressiona como Barber. Mesmo assim, a confianca e MEDIA porque Grasso tem a tecnica de ex-campea, o jiu-jitsu perigoso e a experiencia de 5 rounds ao mais alto nivel. Uma submissao pode mudar tudo.',
      x_factor: {
        title: 'A Ameaca Invisivel do Jiu-Jitsu',
        description: 'Grasso finalizou Valentina Shevchenko, algo que parecia impossivel. Se a luta for ao chao e Barber cometer um erro, Grasso pode encontrar um estrangulamento ou chave que encerre tudo em segundos. Barber precisa respeitar o ground game de Grasso a cada momento.',
      },
      upset_alert: {
        title: 'Grasso Nao Esqueceu Como Lutar',
        description: 'Grasso perdeu para Shevchenko (uma das maiores de todos os tempos) e Natalia Silva (que esta em ascensao). Nao perdeu para lutadoras medianas. Se ela chegar focada e com o gameplan certo, a tecnica pode prevalecer sobre a pressao. Nao subestime uma ex-campea encurralada.',
      },
      probabilities: {
        fighter1: { nome: 'Grasso', percent: 40 },
        fighter2: { nome: 'Barber', percent: 57 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Grasso (+135)', reasoning: 'Como azarona, Grasso oferece valor decente. Ex-campea com jiu-jitsu perigoso e ja venceu Barber antes. A linha poderia estar mais justa.' },
        method: { pick: 'Luta vai para decisao', reasoning: 'Barber tem 47% de decisoes. Grasso tem 62%. As duas sao duraveis e a probabilidade de ir aos pontos e alta.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Grasso nunca foi finalizada por KO/TKO. Barber nunca foi finalizada. Ambas sao duraveis e provavelmente completam pelo menos 4 rounds.' },
        best_value: 'Over 3.5 rounds e a aposta mais segura. Duas lutadoras duraveis com historico de lutas longas.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'A Distancia nos Primeiros 5 Minutos', icon: 'Target', description: 'Se Grasso conseguir manter Barber na ponta do jab e contragolpear com precisao no R1, a dinamica da luta muda completamente. Fique de olho na distancia que Grasso tenta manter e se Barber consegue cortar o octogono para fechar.' },
        { num: 2, title: 'O Wrestling de Barber no R2', icon: 'Shield', description: 'Barber provavelmente vai testar o takedown cedo. Se os takedowns chegarem e Barber conseguir controlar de cima, Grasso tera problemas. Mas se Grasso defender e ameacar por baixo com submissoes, Barber pode hesitar em ir ao chao.' },
        { num: 3, title: 'A Taxa de Absorcao de Grasso', icon: 'Activity', description: 'Grasso absorve 3.95 strikes por minuto, um numero alto. Se Barber estiver conectando com frequencia nos rounds iniciais, o acumulo de dano pode ser decisivo nos championship rounds. Observe se Grasso comeca a recuar demais.' },
        { num: 4, title: 'O Cardio nos Championship Rounds', icon: 'Flame', description: 'Ambas ja lutaram 5 rounds, mas Grasso vem de inatividade e tem 5 anos a mais. Se a luta estiver equilibrada no R4, o cardio vai decidir. Observe quem mantem o volume e quem comeca a desacelerar.' },
        { num: 5, title: 'Transicoes ao Chao e Jiu-Jitsu', icon: 'Zap', description: 'Cada vez que a luta for ao chao, preste atencao nas transicoes de Grasso. Ela e perigosa por baixo e pode surpreender com triangulos ou guilhotinas. Barber precisa manter posicao de cima sem dar espaco para ataques.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'A REVANCHE', content: 'GRASSO vs BARBER II\nUFC Seattle | 28 de Marco\nClimate Pledge Arena\n\n5 anos depois da primeira luta\nPapeis completamente invertidos\nCo-Main Event de 5 rounds', color: 'gold' },
        { slide_number: 2, title: 'GRASSO: A EX-CAMPEA', content: '#3 Peso Mosca | 16-5-1\nEx-Campea UFC (finalizou Shevchenko)\n2 derrotas consecutivas\n62% das vitorias por decisao\nBoxe tecnico de elite\nJiu-jitsu perigoso\nPrecisa vencer para se manter relevante', color: 'red' },
        { slide_number: 3, title: 'BARBER: THE FUTURE', content: '#5 Peso Mosca | 15-2-0\n7 vitorias consecutivas\nSobreviveu pneumonia quase fatal\nSuperou pseudo-convulsao\n40% das vitorias por KO/TKO\nFavorita nas casas de apostas\nVem para vingar derrota de 2021', color: 'blue' },
        { slide_number: 4, title: 'PRIMEIRA LUTA (2021)', content: 'UFC 258 | Fevereiro 2021\n\nGrasso venceu por UD (29-28 x3)\nBarber voltava de cirurgia no LCA\nEstava fora de ritmo e sem confianca\n\n5 anos depois:\nBarber evoluiu MUITO\nGrasso perdeu o titulo e vem caindo', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'BARBER por Decisao Unanime\n\nConfianca: MEDIA\n57% Barber / 40% Grasso\n\nA pressao e o volume definem.\nMas o jiu-jitsu de Grasso\npode mudar TUDO a qualquer segundo.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Grasso vs Barber II no co-main de Seattle. Em 2021, Grasso dominou. Em 2026, os papeis se inverteram completamente. Thread:' },
        { num: '2/6', text: 'Grasso (16-5-1): Ex-campea, finalizou Shevchenko em 2023. Mas vem de 2 derrotas seguidas, perdeu o titulo e caiu para Natalia Silva. 32 anos. Nao vence uma luta desde marco de 2023.' },
        { num: '3/6', text: 'Barber (15-2-0): 7 vitorias consecutivas. Sobreviveu a pneumonia quase fatal e pseudo-convulsao. 27 anos. 40% das vitorias por KO. A transformacao desde 2021 e impressionante.' },
        { num: '4/6', text: 'O detalhe que muda tudo: Grasso absorve 3.95 strikes por minuto. Barber pressiona e tem volume alto. Essa combinacao pode ser muito perigosa pra Grasso nos championship rounds.' },
        { num: '5/6', text: 'Mas nao esquecam: Grasso FINALIZOU Shevchenko. Se a luta for ao chao, o jiu-jitsu dela e uma ameaca constante. Barber tem 45% de defesa de takedown, mas pode ser ela que leva ao chao e se complica.' },
        { num: '6/6', text: 'Minha pick: Barber por decisao unanime. Mas Grasso +135 tem valor como azarona. Over 3.5 rounds e a aposta mais segura do co-main. Duas lutadoras duraveis que nunca foram finalizadas por nocaute.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'A ex-campea que finalizou Shevchenko agora vem de DUAS derrotas seguidas. E reencontra a mulher que venceu em 2021, que agora tem SETE vitorias consecutivas. Grasso vs Barber 2 e o co-main de Seattle.' },
        { time: '10-25s', title: 'Contexto', text: 'Em 2021 no UFC 258, Grasso dominou Barber por decisao. Mas Barber voltava de cirurgia no joelho. Cinco anos depois, Barber quase morreu de pneumonia, sobreviveu a uma convulsao antes de uma luta, e MESMO ASSIM acumulou 7 vitorias seguidas. Grasso perdeu o titulo e caiu duas vezes.' },
        { time: '25-40s', title: 'Analise', text: 'A chave e distancia. Grasso precisa manter Barber longe e contragolpear. Barber precisa fechar, pressionar e nao dar espaco. Grasso absorve quase 4 strikes por minuto, e contra a pressao de Barber, esse numero pode explodir. Mas no chao, Grasso e perigosa. Finalizou a MELHOR do mundo.' },
        { time: '40-55s', title: 'Previsao', text: 'Barber por decisao unanime e a minha call. Pressao, volume e wrestling. Mas Grasso a +135 tem valor, porque ex-campeas nao perdem a tecnica da noite pro dia. O over 3.5 rounds e quase garantido.' },
        { time: '55-65s', title: 'CTA', text: 'Quem leva? Comenta Grasso ou Barber. Se curtiu a analise, segue pro breakdown completo de todo o card de Seattle.' },
      ],
      tiktok: [
        { hook: 'Essa lutadora QUASE MORREU e agora e favorita contra uma ex-campea do UFC.', body: 'Maycee Barber ficou 9 dias no hospital com pneumonia e infeccao em 2024. Febre de 41 graus. Nao conseguia respirar. Quase morreu. Voltou e ganhou. Depois teve uma CONVULSAO antes de uma luta. Voltou e ganhou de novo. Agora enfrenta Alexa Grasso, que era campea e ja venceu ela em 2021. Mas os papeis se inverteram.', cta: 'Comenta quem leva: GRASSO ou BARBER!' },
        { hook: 'A ex-campea do UFC nao vence UMA LUTA desde 2023.', body: 'Alexa Grasso finalizou Shevchenko e virou campea em marco de 2023. Desde entao? Empate, derrota, derrota. Perdeu o titulo. Agora enfrenta Barber, que ela ja venceu, mas que vem com SETE vitorias seguidas. Os papeis se inverteram completamente.', cta: 'Segue pra mais analises do UFC Seattle!' },
        { hook: 'Essa ESTATISTICA mostra por que Grasso esta em perigo.', body: 'Grasso absorve 3.95 strikes significativos por MINUTO. Barber pressiona e tem volume altissimo. Em 5 rounds de co-main event, Grasso pode absorver mais de 100 strikes significativos. E ela vem de inatividade. MAS, Grasso finalizou Shevchenko, a lutadora mais dominante da historia. Uma submissao muda tudo.', cta: 'Quem voce aposta? Comenta!' },
      ],
      headlines: [
        'Grasso vs Barber II: De Campea a Azarona em Apenas 3 Anos',
        'A Transformacao de Maycee Barber: De Derrota Humilhante a Favorita na Revanche',
        'Grasso Busca Redencao em Seattle Contra a Mulher Que Quase Morreu e Voltou Mais Forte',
        'Por Que o Jiu-Jitsu de Grasso Pode Ser a Chave Para Evitar a Terceira Derrota Seguida',
        'Barber +135 ou Grasso? A Revanche Que Divide Opinoes no Co-Main de Seattle',
        'UFC Seattle: O Co-Main Event Que Pode Definir Duas Carreiras em Direcoes Opostas',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+135',
        fighter2_odds: '-160',
        fighter1_name: 'Alexa Grasso',
        fighter2_name: 'Maycee Barber',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Momentum Oposto', stat_headline: 'GRASSO: 0W NAS ULTIMAS 2. BARBER: 7 VITORIAS SEGUIDAS', contexto: 'A diferenca de momentum e dramatica. Grasso nao vence desde marco de 2023 (finalizacao de Shevchenko). Barber esta na melhor sequencia da carreira.', implicacao_aposta: 'Favorece Barber fortemente. O momentum e um fator real em lutas de alto nivel.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Taxa de Absorcao de Grasso', stat_headline: '3.95 STRIKES ABSORVIDOS POR MINUTO', contexto: 'Grasso absorve quase 4 strikes significativos por minuto, taxa alta para o peso mosca feminino. Contra a pressao e volume de Barber, esse numero pode ser explorado.', implicacao_aposta: 'Barber por decisao ou TKO tardio ganha valor com esse dado.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Ameaca de Submissao de Grasso', stat_headline: 'FINALIZOU SHEVCHENKO POR SUBMISSAO NO R4', contexto: 'Grasso tem jiu-jitsu de altissimo nivel. Finalizou a lutadora mais dominante da historia do peso mosca. Se a luta for ao chao, Barber esta em perigo.', implicacao_aposta: 'Grasso por submissao pode ter valor nas odds de metodo.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Durabilidade de Ambas', stat_headline: 'NENHUMA FOI FINALIZADA POR KO/TKO NA CARREIRA', contexto: 'Grasso perdeu 5 lutas, todas por decisao ou submissao. Barber perdeu 2, ambas por decisao. Nenhuma foi nocauteada.', implicacao_aposta: 'Over nos rounds e favorecido. Finalizacao por nocaute tem baixa probabilidade.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Clock', titulo: 'Juventude e Atividade', stat_headline: 'BARBER: 27 ANOS, LUTOU EM DEZ/2025. GRASSO: 32 ANOS, LUTOU EM MAI/2025', contexto: 'Barber e 5 anos mais jovem e lutou mais recentemente. A diferenca de idade e atividade pode ser relevante nos championship rounds.', implicacao_aposta: 'Se a luta chegar ao R4-R5 equilibrada, favorece Barber.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-180', confianca: 'alta', edge_vs_mercado: 'Nenhuma das duas foi finalizada por KO/TKO. Ambas sao duraveis.', raciocinio: 'Com Grasso tendo 62% de decisoes e Barber com queixo intacto, a probabilidade de ir alem do R3 e altissima. Pode ser a aposta mais segura do co-main.' },
        { tipo: 'Metodo', pick: 'Vai para Decisao', odds: '-110', confianca: 'media', raciocinio: 'Historicamente, ambas favorecem decisoes. 62% de Grasso e 47% de Barber. A combinacao sugere forte tendencia para os juizes decidirem.' },
        { tipo: 'Moneyline', pick: 'Grasso (+135)', odds: '+135', confianca: 'baixa', edge_vs_mercado: 'Ex-campea com jiu-jitsu perigoso e experiencia de titulo. Linha pode estar descontando demais as derrotas recentes.', raciocinio: 'Grasso ja venceu Barber, tem jiu-jitsu superior e experiencia em 5 rounds de titulo. +135 pode ter valor leve se voce acredita que a tecnica supera o momentum.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Barber por Nocaute',
        descricao: 'Barber tem poder, mas Grasso NUNCA foi nocauteada em 22 lutas profissionais. Todas as derrotas de Grasso foram por decisao ou submissao. Apostar em Barber por KO/TKO e apostar contra o historico de durabilidade de Grasso.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ENGLISH TRANSLATION
// ═══════════════════════════════════════════════════════════════════════

const analiseEN: FullSingleAnalise = {
  id: 'grasso-vs-barber',
  evento_id: null,
  slug: 'grasso-vs-barber',
  titulo: 'Grasso vs Barber: The Rematch of Redemption',
  subtitulo: 'Former champion in freefall meets the woman she beat in 2021, who now brings 7 straight wins',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,65m', envergadura: '168cm', idade: 32, academia: 'Lobo Gym' },
      fighter2: { altura: '1,65m', envergadura: '165cm', idade: 27, academia: 'High Altitude Martial Arts' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Unanimous Decision',
    confidence: 'MEDIUM',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Alexa Grasso',
    record: '16-5-1',
    ultimasLutas: [
      { result: 'L', opponent: 'Natalia Silva', method: 'Unanimous Decision', event: 'UFC 315' },
      { result: 'L', opponent: 'Valentina Shevchenko', method: 'Unanimous Decision', event: 'UFC 306' },
      { result: 'D', opponent: 'Valentina Shevchenko', method: 'Split Draw', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Maycee Barber',
    record: '15-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Karine Silva', method: 'Unanimous Decision', event: 'UFC 323' },
      { result: 'W', opponent: 'Katlyn Cerminara', method: 'Unanimous Decision', event: 'UFC 299' },
      { result: 'W', opponent: 'Amanda Ribas', method: 'KO R2', event: 'UFC on ABC 5' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: 'March 28, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: "Women's Flyweight (125 lbs)",
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: 'March 28, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: "Women's Flyweight (125 lbs)",
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'The Rematch of Redemption',
      tagline_sub: '5 years later, roles reversed and everything on the line in the division',
      fighter1: {
        nome_completo: 'Alexa Grasso',
        apelido: '',
        sobrenome: 'Grasso',
        record: '16-5-1',
        ranking: '#3 Flyweight',
        info_extra: 'Guadalajara, Mexico | 32 years old',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-05/GRASSO_ALEXA_L_05-10.png?itok=I3pDf9FG',
      },
      fighter2: {
        nome_completo: 'Maycee "The Future" Barber',
        apelido: 'The Future',
        sobrenome: 'Barber',
        record: '15-2-0',
        ranking: '#5 Flyweight',
        info_extra: 'Greeley, Colorado | 27 years old',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/BARBER_MAYCEE_L_12-06.png?itok=PsAi5oK3',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">From Champion to Crossroads</h3>
        <p class="mb-4">
          In March 2023, <strong class="text-ufc-red">Alexa Grasso</strong> shocked the world by submitting Valentina Shevchenko in the fourth round at UFC 285, capturing the women's flyweight title. It was the peak of a journey that started at strawweight, went through tough losses, and finally found its rhythm at 125 lbs. The Mexican from Guadalajara seemed destined to dominate the division for years.
        </p>
        <p class="mb-4">
          Less than three years later, the landscape is completely different. Grasso drew the rematch with Shevchenko, lost the belt decisively at UFC 306, and then fell to Natalia Silva at UFC 315. Two consecutive losses. The first real downturn of her career. At 32 years old, the question is inevitable: has the best version of Grasso already come and gone?
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Transformation of "The Future"</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Maycee Barber</strong> is no longer the 22-year-old who lost to Grasso in 2021. Back then, Barber was returning from a serious knee injury (ACL tear), was out of rhythm, and clearly wasn't the same fighter. Grasso won easily by unanimous decision. Five years later, Barber has stacked seven consecutive wins, survived a hospitalization for pneumonia and infection that nearly took her life, overcome a pseudo-seizure episode minutes before a main event, and emerged as one of the most resilient fighters in the division.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Rematch That Makes Sense</h3>
        <p class="mb-4">
          The roles have completely reversed. In 2021, Grasso was the technical favorite and Barber the reckless youngster. Now, Barber is the betting favorite, with momentum, confidence, and an impressive streak. Grasso needs this win to stay relevant in the title conversation. A third straight loss, against someone she already beat, would be devastating for her comeback narrative.
        </p>
        <p class="mb-4">
          For Barber, this fight is about proving evolution. Beating Grasso closes the circle, erases the 2021 loss, and puts "The Future" just steps away from a title shot. The co-main event in Seattle carries the weight of two careers heading in opposite directions.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#3 Flyweight', fighter2: '#5 Flyweight' },
        { dimensao: 'Streak', fighter1: '2 consecutive losses', fighter2: '7 consecutive wins' },
        { dimensao: 'Goal', fighter1: 'Stop the slide and return to the title conversation', fighter2: 'Avenge the 2021 loss and climb the rankings' },
        { dimensao: 'Narrative', fighter1: 'Former champion seeking redemption', fighter2: 'Evolution and revenge' },
        { dimensao: 'Risk', fighter1: '3rd straight loss would be catastrophic', fighter2: 'Losing to Grasso twice halts the hype' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'EXPERIENCE PREVAILS',
          subtitulo: 'Grasso shows that former champion technique is still superior',
          consequencias: [
            { tag: 'RANKING', texto: 'Grasso stays in the top 3 and returns to the flyweight title queue' },
            { tag: 'LEGACY', texto: 'Proves the two losses were against elite opponents, not a sign of decline' },
            { tag: 'BARBER', texto: 'Barber loses for the third time in her career and the 7-win streak is broken' },
          ],
          proxima_luta: 'Grasso vs title fight winner or another top 5 contender',
        },
        fighter2_vence: {
          titulo: 'THE FUTURE FINALLY ARRIVES',
          subtitulo: 'Barber avenges the 2021 loss and proves she evolved beyond any doubt',
          consequencias: [
            { tag: 'TITLE', texto: 'Barber officially enters the flyweight title conversation with 8 straight wins' },
            { tag: 'LEGACY', texto: 'The comeback narrative (ACL, pneumonia, pseudo-seizure) gains another epic chapter' },
            { tag: 'GRASSO', texto: 'Third straight loss virtually eliminates Grasso from the title race in the short term' },
          ],
          proxima_luta: 'Barber vs title challenger or eliminator fight against top 3',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Alexa Grasso',
        color: 'red',
        recent_fights: [
          { date: 'May 2025', opponent: 'Natalia Silva', result: 'L', method: 'Unanimous Decision', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Good', note: 'Lost clearly to the rising Brazilian. Could not impose her game' },
          { date: 'Sep 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'Unanimous Decision', opponent_rank: 'Former Champ WFLW', quality_score: 5, quality_label: 'Excellent', note: 'Lost the belt in the trilogy. Shevchenko dominated and reclaimed the title' },
          { date: 'Sep 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'Split Draw', opponent_rank: 'Champ WFLW', quality_score: 5, quality_label: 'Excellent', note: 'Retained the title in a controversial draw. Many saw a Shevchenko win' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Submission R4', opponent_rank: 'Champ WFLW', quality_score: 5, quality_label: 'Excellent', note: 'Career-high moment. Submitted the dominant Shevchenko to capture the title' },
          { date: 'Oct 2022', opponent: 'Viviane Araujo', result: 'W', method: 'Unanimous Decision', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Good', note: 'Solid win that earned her the title shot' },
        ],
        full_fight_history: [
          { date: 'Nov 2016', opponent: 'Heather Jo Clark', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut at strawweight' },
          { date: 'Feb 2017', opponent: 'Felice Herrig', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First professional loss' },
          { date: 'Aug 2017', opponent: 'Randa Markos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Close win by split decision' },
          { date: 'Feb 2018', opponent: 'Tatiana Suarez', result: 'L', method: 'UD', opponent_rank: '#9 WSW', quality_score: 4, quality_label: 'Very Good', note: 'Defeated by dominant wrestler Suarez' },
          { date: 'Jun 2019', opponent: 'Karolina Kowalkiewicz', result: 'W', method: 'UD', opponent_rank: '#9 WSW', quality_score: 3, quality_label: 'Good', note: 'Clear win over former title challenger' },
          { date: 'Sep 2019', opponent: 'Carla Esparza', result: 'L', method: 'MD', opponent_rank: '#7 WSW', quality_score: 4, quality_label: 'Very Good', note: 'Majority decision loss. Earned Fight of the Night' },
          { date: 'Aug 2020', opponent: 'Ji Yeon Kim', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First win at flyweight' },
          { date: 'Feb 2021', opponent: 'Maycee Barber', result: 'W', method: 'UD', opponent_rank: '#12 WFLW', quality_score: 2, quality_label: 'Average', note: 'Dominated Barber with technical boxing and ground game' },
          { date: 'Oct 2022', opponent: 'Viviane Araujo', result: 'W', method: 'UD', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Good', note: 'Earned the title shot' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Sub R4', opponent_rank: 'Champ', quality_score: 5, quality_label: 'Excellent', note: 'Captured the title by submission' },
          { date: 'Sep 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'SD (draw)', opponent_rank: 'Champ', quality_score: 5, quality_label: 'Excellent', note: 'Controversial split draw' },
          { date: 'Sep 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'UD', opponent_rank: 'Former Champ', quality_score: 5, quality_label: 'Excellent', note: 'Lost the belt in the trilogy' },
          { date: 'May 2025', opponent: 'Natalia Silva', result: 'L', method: 'UD', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Good', note: 'Second consecutive loss' },
        ],
        layoff_warning: 'Approximately 10 months without fighting since May 2025. Moderate period of inactivity.',
        momentum_score: 3,
        momentum_label: 'Declining',
        momentum_trend: 'descending',
        momentum_note: 'Grasso is experiencing the worst stretch of her UFC career. Two consecutive losses, including losing the title to Shevchenko and a loss to Natalia Silva. The only win in the last three years was the historic submission of Shevchenko in March 2023, followed by a draw and two losses. At 32, the window of opportunity is closing. She urgently needs a win to rebuild confidence.',
      },
      fighter2: {
        nome: 'Maycee Barber',
        color: 'blue',
        recent_fights: [
          { date: 'Dec 2025', opponent: 'Karine Silva', result: 'W', method: 'Unanimous Decision', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Good', note: 'Solid win over ranked Brazilian. Showed maturity and control' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Dominant win before the pneumonia hospitalization' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Good', note: 'Devastating knockout with elbows in ground and pound. Performance of the Night' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'Split Decision', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Good', note: 'Close and controversial split decision win' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Clear win over division veteran' },
        ],
        full_fight_history: [
          { date: 'Nov 2018', opponent: 'Hannah Cifers', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut with a finish' },
          { date: 'Mar 2019', opponent: 'JJ Aldrich', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Second consecutive TKO' },
          { date: 'Oct 2019', opponent: 'Gillian Robertson', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Three straight finishes to open her career' },
          { date: 'Jan 2020', opponent: 'Roxanne Modafferi', result: 'L', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Good', note: 'First loss. Modafferi used experience to frustrate Barber' },
          { date: 'Feb 2021', opponent: 'Alexa Grasso', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Returning from ACL injury. Grasso dominated with technical boxing' },
          { date: 'Jul 2021', opponent: 'Miranda Maverick', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Controversial split decision' },
          { date: 'Apr 2022', opponent: 'Montana De La Rosa', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Comfortable win' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Dominant win over veteran' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'SD', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Good', note: 'Close split decision' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Good', note: 'Performance of the Night' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Before the hospitalization' },
          { date: 'Dec 2025', opponent: 'Karine Silva', result: 'W', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Good', note: 'Returned after nearly two years away' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'On the Rise',
        momentum_trend: 'ascending',
        momentum_note: 'Barber has stacked seven consecutive wins and is in the best form of her career. What impresses is not just the results, but the context: she overcame a nine-day hospitalization for pneumonia and infection in 2024, a pseudo-seizure episode before a main event in 2025, and still came back to beat Karine Silva convincingly. Her mental fortitude is as impressive as her technical evolution.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Grasso',
        media_oponentes: 4,
        media_oponentes_label: 'Very Good',
        aproveitamento: '8W-5L-1D (57%)',
        contra_top5: '1W-2L',
      },
      fighter2: {
        nome: 'Barber',
        media_oponentes: 2,
        media_oponentes_label: 'Average',
        aproveitamento: '12W-2L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'The direct matchup in 2021 is the main reference. Grasso beat Barber by unanimous decision at UFC 258, but Barber was returning from knee surgery (ACL) and clearly was not the same fighter. Five years of evolution later, the comparison from that fight has limited value.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes per Minute', valueA: 4.67, valueB: 4.60, maxVal: 7, format: 'decimal' },
        { label: 'Strike Accuracy (%)', valueA: 43, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 3.95, valueB: 2.72, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 58, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Takedowns per 15 Min', valueA: 0.41, valueB: 1.14, maxVal: 3, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 45, valueB: 35, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 59, valueB: 45, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '32 years old', fighter2: '27 years old', note: 'Barber 5 years younger' },
        { label: 'Height', fighter1: '5\'5" (1.65m)', fighter2: '5\'5" (1.65m)', note: 'Same height' },
        { label: 'Reach', fighter1: '66" (168cm)', fighter2: '65" (165cm)', note: 'Grasso with 1 inch advantage' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Switch', note: 'Barber switches stances' },
        { label: 'Gym', fighter1: 'Lobo Gym, Guadalajara', fighter2: 'High Altitude MA, Denver', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Technical Boxing', valueA: 80, valueB: 65, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Grasso has the more technical and refined boxing. Precise counters and fluid combinations.' },
        { label: 'Pressure & Volume', valueA: 55, valueB: 78, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Barber pushes the pace more, works with high volume and forces the tempo constantly.' },
        { label: 'Jiu-Jitsu & Submission', valueA: 75, valueB: 45, labelA: 'Very Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Grasso submitted Shevchenko. Real threat on the ground. Barber has improved but is not a reference.' },
        { label: 'Wrestling & Control', valueA: 50, valueB: 60, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Barber has more takedown activity and uses wrestling to impose her game.' },
        { label: 'Cardio & Endurance', valueA: 72, valueB: 75, labelA: 'Good', labelB: 'Very Good', advantage: 'even', advantage_note: 'Both have fought 5 rounds. Barber slightly better at maintaining volume in late rounds.' },
        { label: 'Finishing Power', valueA: 40, valueB: 65, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Barber has 6 KO/TKOs in 15 wins (40%). Grasso has 4 in 16 (25%). Barber hits harder.' },
      ],
      insight: 'A fight of clear contrasts. Grasso is the technician, the counter-striker, the jiu-jitsu black belt who can end the fight if it hits the ground. Barber is the pressure, the volume, the relentless aggression. The key is whether Grasso can maintain distance and use timing, or whether Barber can smother the space.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Grasso',
        ko_tko: { count: 4, percent: 25 },
        submission: { count: 2, percent: 13 },
        decision: { count: 10, percent: 62 },
        total_wins: 16,
      },
      fighter2: {
        nome: 'Barber',
        ko_tko: { count: 6, percent: 40 },
        submission: { count: 2, percent: 13 },
        decision: { count: 7, percent: 47 },
        total_wins: 15,
      },
      insight: 'The numbers reveal opposite styles. Grasso is primarily a decision fighter (62%), with her technical boxing accumulating points over the rounds. The Shevchenko submission finish was the brilliant exception, not the rule. Barber brings more finishing power, with 40% of wins by KO/TKO. When Barber hurts someone, she does not stop until it is over. The elbow that knocked out Ribas in 2023 proves it.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 6,
          danger_label: 'GRASSO ADVANTAGE',
          color: 'red',
          title: 'The Technical Territory',
          description: 'The early rounds are where Grasso historically performs best. Fresh and focused, her technical boxing works best when she has the energy to maintain distance and counter-strike. If Grasso is going to win this fight, she needs to build an advantage early, before Barber\'s pressure starts to weigh. The jab and counters will be key.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'DECISIVE ROUND',
          color: 'gold',
          title: 'The Tipping Point',
          description: 'The third round is historically the moment when pressure fighters start to take control. If Barber managed to close distance in the first two rounds without taking significant damage, R3 is where her volume and wrestling can start to shift the fight. For Grasso, maintaining her defense and counters here is fundamental.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'BARBER ADVANTAGE',
          color: 'green',
          title: 'The Pressure Never Stops',
          description: 'In the championship rounds, Barber\'s youth (27 vs 32) and recent activity could be decisive factors. Grasso showed signs of fatigue in the later rounds against Shevchenko in the trilogy. If Barber is ahead or level at this point, the pace and pressure should define the fight. Grasso needs something special, like a submission, if she is behind on points.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Losing Streak', fighter: 'Grasso', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Grasso is coming off two consecutive losses for the first time in her career. Losing the belt and then falling to Natalia Silva may have shaken her confidence. The psychological factor of a possible third straight loss is real.' },
        { icon: 'Shield', title: 'Superhuman Resilience', fighter: 'Barber', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Barber survived a 9-day hospitalization for pneumonia and infection (104F fever, dangerously low blood pressure), a pseudo-seizure episode minutes before a main event, and came back to win. This girl\'s mental fortitude is unmatched.' },
        { icon: 'Clock', title: 'Grasso\'s Inactivity', fighter: 'Grasso', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Grasso has not fought since May 2025, roughly 10 months of inactivity. Barber fought in December 2025. The difference in rhythm could be relevant in the opening minutes.' },
        { icon: 'Brain', title: 'Rematch Psychological Factor', fighter: 'Barber', risk_level: 'POSITIVE', risk_color: 'green', description: 'Barber lost the first fight. Fighters frequently perform better in rematches when they know what to expect. Barber has 5 years of evolution and the motivation of revenge.' },
        { icon: 'AlertTriangle', title: 'Barber\'s Health History', fighter: 'Barber', risk_level: 'LOW RISK', risk_color: 'yellow', description: 'The 2025 pseudo-seizure and 2024 pneumonia raise questions about long-term health. However, Barber beat Karine Silva convincingly in December, suggesting full recovery.' },
        { icon: 'Zap', title: 'Grasso\'s Jiu-Jitsu', fighter: 'Grasso', risk_level: 'POSITIVE', risk_color: 'green', description: 'If the fight hits the ground, Grasso has the submission threat. She submitted Shevchenko, the most dominant fighter in flyweight history. One mistake from Barber on the ground could cost her the fight.' },
        { icon: 'Activity', title: 'Barber\'s Technical Evolution', fighter: 'Barber', risk_level: 'POSITIVE', risk_color: 'green', description: 'The 2026 Barber is a completely different fighter from the 2021 version. Better wrestling, more mature, more patient. Seven consecutive wins prove the evolution. Grasso needs to adapt her gameplan.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Grasso',
        total_probability: 40,
        scenarios: [
          { name: 'Technical Boxing & Counters', probability: 22, method: 'Unanimous/Split Decision', description: 'Grasso maintains distance, uses the jab and precise counters to frustrate Barber\'s pressure. Wins on points with clear rounds of technical superiority, as she did in the first fight in 2021.' },
          { name: 'Opportunistic Submission', probability: 10, method: 'Submission R2-R4', description: 'If the fight hits the ground, Grasso can find a submission. Barber\'s takedown defense (45%) could take her to the mat, and there Grasso has a clear jiu-jitsu advantage.' },
          { name: 'Body Attack & Attrition', probability: 8, method: 'TKO R4-R5 or Decision', description: 'Grasso works Barber\'s body in the early rounds, accumulating damage and draining the gas tank in the later rounds. Less likely scenario but possible if Grasso finds the timing.' },
        ],
      },
      fighter2: {
        nome: 'Barber',
        total_probability: 57,
        scenarios: [
          { name: 'Relentless Pressure & Volume', probability: 30, method: 'Unanimous Decision', description: 'Barber does what she does best: pressures, closes distance, mixes striking with wrestling and does not let Grasso breathe. Wins a clear decision with volume and control.' },
          { name: 'Knockout by Accumulation', probability: 15, method: 'TKO R3-R4', description: 'Constant pressure hurts Grasso. Elbows, hooks, and ground and pound accumulate damage until the referee or corner stops it. Grasso absorbs 3.95 strikes per minute, a high rate.' },
          { name: 'Wrestling Domination', probability: 12, method: 'Unanimous Decision', description: 'Barber uses wrestling to take Grasso down repeatedly. Even if Grasso has superior jiu-jitsu, if Barber controls from the top without giving space, judges reward the control.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Maycee Barber',
      winner_side: 'fighter2',
      predicted_method: 'Unanimous Decision',
      confidence_score: 6,
      confidence_label: 'MEDIUM',
      explanation: 'Barber has momentum, youth, and evolution on her side. In 2021, Grasso beat a far inferior version of Barber, fresh off knee surgery and out of rhythm. The 2026 Barber is a different fighter: more mature, with seven consecutive wins, improved wrestling, and the mental resilience of someone who survived extreme situations outside the octagon. Grasso, on the other hand, is coming off two straight losses and has not won since March 2023 (if we consider the draw is not a win). Grasso\'s strike absorption rate (3.95 per minute) is concerning against someone who pressures like Barber. Still, the confidence is MEDIUM because Grasso has the technique of a former champion, dangerous jiu-jitsu, and the experience of 5 rounds at the highest level. A submission can change everything.',
      x_factor: {
        title: 'The Invisible Jiu-Jitsu Threat',
        description: 'Grasso submitted Valentina Shevchenko, something that seemed impossible. If the fight goes to the ground and Barber makes a mistake, Grasso can find a choke or lock that ends everything in seconds. Barber needs to respect Grasso\'s ground game at every moment.',
      },
      upset_alert: {
        title: 'Grasso Has Not Forgotten How to Fight',
        description: 'Grasso lost to Shevchenko (one of the greatest ever) and Natalia Silva (who is on the rise). She did not lose to mediocre fighters. If she arrives focused and with the right gameplan, technique can prevail over pressure. Do not underestimate a cornered former champion.',
      },
      probabilities: {
        fighter1: { nome: 'Grasso', percent: 40 },
        fighter2: { nome: 'Barber', percent: 57 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Grasso (+135)', reasoning: 'As the underdog, Grasso offers decent value. Former champion with dangerous jiu-jitsu who already beat Barber. The line could be tighter.' },
        method: { pick: 'Fight goes to decision', reasoning: 'Barber has 47% decisions. Grasso has 62%. Both are durable and the probability of going to the scorecards is high.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Grasso has never been finished by KO/TKO. Barber has never been finished. Both are durable and will likely complete at least 4 rounds.' },
        best_value: 'Over 3.5 rounds is the safest bet. Two durable fighters with a history of long fights.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Distance in the First 5 Minutes', icon: 'Target', description: 'If Grasso can keep Barber at the end of her jab and counter with precision in R1, the fight dynamic changes completely. Watch for the distance Grasso tries to maintain and whether Barber can cut the octagon to close.' },
        { num: 2, title: 'Barber\'s Wrestling in R2', icon: 'Shield', description: 'Barber will likely test the takedown early. If the takedowns land and Barber can control from the top, Grasso will be in trouble. But if Grasso defends and threatens from the bottom with submissions, Barber may hesitate to go to the ground.' },
        { num: 3, title: 'Grasso\'s Absorption Rate', icon: 'Activity', description: 'Grasso absorbs 3.95 strikes per minute, a high number. If Barber is connecting frequently in the early rounds, the accumulated damage could be decisive in the championship rounds. Watch if Grasso starts backing up too much.' },
        { num: 4, title: 'Cardio in the Championship Rounds', icon: 'Flame', description: 'Both have fought 5 rounds, but Grasso comes from inactivity and is 5 years older. If the fight is level in R4, cardio will decide. Watch who maintains volume and who starts to slow down.' },
        { num: 5, title: 'Ground Transitions & Jiu-Jitsu', icon: 'Zap', description: 'Every time the fight goes to the ground, pay attention to Grasso\'s transitions. She is dangerous off her back and can surprise with triangles or guillotines. Barber needs to hold top position without giving space for attacks.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'THE REMATCH', content: 'GRASSO vs BARBER II\nUFC Seattle | March 28\nClimate Pledge Arena\n\n5 years after the first fight\nRoles completely reversed\nCo-Main Event, 5 rounds', color: 'gold' },
        { slide_number: 2, title: 'GRASSO: THE EX-CHAMP', content: '#3 Flyweight | 16-5-1\nFormer UFC Champion (submitted Shevchenko)\n2 consecutive losses\n62% of wins by decision\nElite technical boxing\nDangerous jiu-jitsu\nMust win to stay relevant', color: 'red' },
        { slide_number: 3, title: 'BARBER: THE FUTURE', content: '#5 Flyweight | 15-2-0\n7 consecutive wins\nSurvived near-fatal pneumonia\nOvercame pseudo-seizure\n40% of wins by KO/TKO\nBetting favorite\nComing to avenge the 2021 loss', color: 'blue' },
        { slide_number: 4, title: 'FIRST FIGHT (2021)', content: 'UFC 258 | February 2021\n\nGrasso won by UD (29-28 x3)\nBarber returning from ACL surgery\nOut of rhythm and low confidence\n\n5 years later:\nBarber evolved MASSIVELY\nGrasso lost the title and is sliding', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'BARBER by Unanimous Decision\n\nConfidence: MEDIUM\n57% Barber / 40% Grasso\n\nPressure and volume define it.\nBut Grasso\'s jiu-jitsu\ncan change EVERYTHING at any second.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Grasso vs Barber II in the co-main of Seattle. In 2021, Grasso dominated. In 2026, the roles have completely reversed. Thread:' },
        { num: '2/6', text: 'Grasso (16-5-1): Former champ, submitted Shevchenko in 2023. But coming off 2 straight losses, lost the title, fell to Natalia Silva. 32 years old. Has not won a fight since March 2023.' },
        { num: '3/6', text: 'Barber (15-2-0): 7 consecutive wins. Survived near-fatal pneumonia and pseudo-seizure. 27 years old. 40% of wins by KO. The transformation since 2021 is remarkable.' },
        { num: '4/6', text: 'The detail that changes everything: Grasso absorbs 3.95 strikes per minute. Barber pressures with high volume. That combination can be very dangerous for Grasso in the championship rounds.' },
        { num: '5/6', text: 'But do not forget: Grasso SUBMITTED Shevchenko. If the fight hits the ground, her jiu-jitsu is a constant threat. Barber has 45% takedown defense, but she might be the one taking it down and getting caught.' },
        { num: '6/6', text: 'My pick: Barber by unanimous decision. But Grasso +135 has value as an underdog. Over 3.5 rounds is the safest bet on the co-main. Two durable fighters who have never been finished by knockout.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'The former champion who submitted Shevchenko now comes off TWO straight losses. And she meets the woman she beat in 2021, who now has SEVEN consecutive wins. Grasso vs Barber 2 is the co-main in Seattle.' },
        { time: '10-25s', title: 'Context', text: 'In 2021 at UFC 258, Grasso dominated Barber by decision. But Barber was returning from knee surgery. Five years later, Barber nearly died from pneumonia, survived a seizure before a fight, and STILL stacked 7 straight wins. Grasso lost the title and fell twice.' },
        { time: '25-40s', title: 'Analysis', text: 'The key is distance. Grasso needs to keep Barber away and counter. Barber needs to close, pressure, and take away space. Grasso absorbs nearly 4 strikes per minute, and against Barber\'s pressure, that number could explode. But on the ground, Grasso is dangerous. She submitted the BEST in the world.' },
        { time: '40-55s', title: 'Prediction', text: 'Barber by unanimous decision is my call. Pressure, volume, and wrestling. But Grasso at +135 has value, because former champions do not lose their technique overnight. Over 3.5 rounds is nearly guaranteed.' },
        { time: '55-65s', title: 'CTA', text: 'Who takes it? Comment Grasso or Barber. If you liked the analysis, follow for the full breakdown of the entire Seattle card.' },
      ],
      tiktok: [
        { hook: 'This fighter NEARLY DIED and is now the favorite against a former UFC champion.', body: 'Maycee Barber spent 9 days in the hospital with pneumonia and infection in 2024. 104-degree fever. Could not breathe. Nearly died. Came back and won. Then had a SEIZURE before a fight. Came back and won again. Now she faces Alexa Grasso, who was champion and already beat her in 2021. But the roles have reversed.', cta: 'Comment who wins: GRASSO or BARBER!' },
        { hook: 'The former UFC champion has not won A SINGLE FIGHT since 2023.', body: 'Alexa Grasso submitted Shevchenko and became champion in March 2023. Since then? Draw, loss, loss. Lost the title. Now she faces Barber, who she already beat, but who comes with SEVEN straight wins. The roles have completely reversed.', cta: 'Follow for more UFC Seattle analysis!' },
        { hook: 'This STAT shows why Grasso is in danger.', body: 'Grasso absorbs 3.95 significant strikes per MINUTE. Barber pressures with extremely high volume. In 5 rounds of a co-main event, Grasso could absorb over 100 significant strikes. And she comes from inactivity. BUT, Grasso submitted Shevchenko, the most dominant fighter in history. A submission changes everything.', cta: 'Who are you betting on? Comment!' },
      ],
      headlines: [
        'Grasso vs Barber II: From Champion to Underdog in Just 3 Years',
        'The Transformation of Maycee Barber: From Humiliating Loss to Rematch Favorite',
        'Grasso Seeks Redemption in Seattle Against the Woman Who Nearly Died and Came Back Stronger',
        'Why Grasso\'s Jiu-Jitsu Could Be the Key to Avoiding a Third Straight Loss',
        'Barber -160 or Grasso? The Rematch That Divides Opinions at Seattle\'s Co-Main',
        'UFC Seattle: The Co-Main Event That Could Define Two Careers in Opposite Directions',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+135',
        fighter2_odds: '-160',
        fighter1_name: 'Alexa Grasso',
        fighter2_name: 'Maycee Barber',
        source: 'Average across sportsbooks (March 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Opposite Momentum', stat_headline: 'GRASSO: 0W IN LAST 2. BARBER: 7 STRAIGHT WINS', contexto: 'The momentum gap is dramatic. Grasso has not won since March 2023 (Shevchenko submission). Barber is on the best streak of her career.', implicacao_aposta: 'Strongly favors Barber. Momentum is a real factor in high-level fights.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Grasso\'s Absorption Rate', stat_headline: '3.95 STRIKES ABSORBED PER MINUTE', contexto: 'Grasso absorbs nearly 4 significant strikes per minute, a high rate for women\'s flyweight. Against Barber\'s pressure and volume, this number could be exploited.', implicacao_aposta: 'Barber by decision or late TKO gains value with this data.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Grasso\'s Submission Threat', stat_headline: 'SUBMITTED SHEVCHENKO BY SUBMISSION IN R4', contexto: 'Grasso has elite-level jiu-jitsu. She submitted the most dominant fighter in flyweight history. If the fight goes to the ground, Barber is in danger.', implicacao_aposta: 'Grasso by submission could have value in method odds.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Durability of Both', stat_headline: 'NEITHER HAS BEEN FINISHED BY KO/TKO IN THEIR CAREER', contexto: 'Grasso lost 5 fights, all by decision or submission. Barber lost 2, both by decision. Neither has been knocked out.', implicacao_aposta: 'Rounds over is favored. Knockout finish has low probability.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Clock', titulo: 'Youth & Activity', stat_headline: 'BARBER: 27 YRS, FOUGHT DEC/2025. GRASSO: 32 YRS, FOUGHT MAY/2025', contexto: 'Barber is 5 years younger and fought more recently. The age and activity difference could be relevant in the championship rounds.', implicacao_aposta: 'If the fight reaches R4-R5 level, favors Barber.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-180', confianca: 'alta', edge_vs_mercado: 'Neither has been finished by KO/TKO. Both are durable.', raciocinio: 'With Grasso having 62% decisions and Barber with an iron chin, the probability of going past R3 is very high. Could be the safest bet on the co-main.' },
        { tipo: 'Method', pick: 'Goes to Decision', odds: '-110', confianca: 'media', raciocinio: 'Historically, both favor decisions. 62% for Grasso and 47% for Barber. The combination suggests a strong tendency for the judges to decide.' },
        { tipo: 'Moneyline', pick: 'Grasso (+135)', odds: '+135', confianca: 'baixa', edge_vs_mercado: 'Former champion with dangerous jiu-jitsu and title experience. Line may be discounting the recent losses too much.', raciocinio: 'Grasso already beat Barber, has superior jiu-jitsu and experience in 5-round title fights. +135 could have slight value if you believe technique trumps momentum.' },
      ],
      armadilha: {
        titulo: 'Trap: Barber by Knockout',
        descricao: 'Barber has power, but Grasso has NEVER been knocked out in 22 professional fights. All of Grasso\'s losses were by decision or submission. Betting on Barber by KO/TKO is betting against Grasso\'s durability track record.',
      },
      disclaimer: 'Statistical analysis for informational purposes. Bet responsibly.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// FRENCH TRANSLATION
// ═══════════════════════════════════════════════════════════════════════

const analiseFR: FullSingleAnalise = {
  id: 'grasso-vs-barber',
  evento_id: null,
  slug: 'grasso-vs-barber',
  titulo: 'Grasso vs Barber : La Revanche de la Redemption',
  subtitulo: 'Ancienne championne en chute libre retrouve la femme qu\'elle a battue en 2021, qui affiche desormais 7 victoires consecutives',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,65m', envergadura: '168cm', idade: 32, academia: 'Lobo Gym' },
      fighter2: { altura: '1,65m', envergadura: '165cm', idade: 27, academia: 'High Altitude Martial Arts' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Decision Unanime',
    confidence: 'MOYENNE',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Alexa Grasso',
    record: '16-5-1',
    ultimasLutas: [
      { result: 'L', opponent: 'Natalia Silva', method: 'Decision Unanime', event: 'UFC 315' },
      { result: 'L', opponent: 'Valentina Shevchenko', method: 'Decision Unanime', event: 'UFC 306' },
      { result: 'D', opponent: 'Valentina Shevchenko', method: 'Match Nul Partage', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Maycee Barber',
    record: '15-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Karine Silva', method: 'Decision Unanime', event: 'UFC 323' },
      { result: 'W', opponent: 'Katlyn Cerminara', method: 'Decision Unanime', event: 'UFC 299' },
      { result: 'W', opponent: 'Amanda Ribas', method: 'KO R2', event: 'UFC on ABC 5' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 Mars, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Poids Mouche Feminin (125 lbs)',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 Mars, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Poids Mouche Feminin (125 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'La Revanche de la Redemption',
      tagline_sub: '5 ans plus tard, les roles sont inverses et tout est en jeu dans la division',
      fighter1: {
        nome_completo: 'Alexa Grasso',
        apelido: '',
        sobrenome: 'Grasso',
        record: '16-5-1',
        ranking: '#3 Poids Mouche',
        info_extra: 'Guadalajara, Mexique | 32 ans',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-05/GRASSO_ALEXA_L_05-10.png?itok=I3pDf9FG',
      },
      fighter2: {
        nome_completo: 'Maycee "The Future" Barber',
        apelido: 'The Future',
        sobrenome: 'Barber',
        record: '15-2-0',
        ranking: '#5 Poids Mouche',
        info_extra: 'Greeley, Colorado | 27 ans',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/BARBER_MAYCEE_L_12-06.png?itok=PsAi5oK3',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">De Championne a la Croisee des Chemins</h3>
        <p class="mb-4">
          En mars 2023, <strong class="text-ufc-red">Alexa Grasso</strong> a choque le monde en soumettant Valentina Shevchenko au quatrieme round de l'UFC 285, remportant la ceinture poids mouche feminin. C'etait l'apogee d'un parcours commence chez les poids paille, marque par des defaites difficiles avant de trouver son rythme a 125 lbs. La Mexicaine de Guadalajara semblait destinee a dominer la division pendant des annees.
        </p>
        <p class="mb-4">
          Moins de trois ans plus tard, le paysage est completement different. Grasso a fait match nul lors de la revanche contre Shevchenko, a perdu la ceinture de maniere nette a l'UFC 306, puis a cede face a Natalia Silva a l'UFC 315. Deux defaites consecutives. Le premier vrai passage a vide de sa carriere. A 32 ans, la question est inevitable : la meilleure version de Grasso est-elle deja derriere elle ?
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Transformation de "The Future"</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Maycee Barber</strong> n'est plus cette fille de 22 ans qui a perdu contre Grasso en 2021. A l'epoque, Barber revenait d'une blessure grave au genou (rupture du LCA), etait hors rythme et n'etait clairement plus la meme combattante. Grasso a gagne facilement par decision unanime. Cinq ans plus tard, Barber a enchaine sept victoires consecutives, survecu a une hospitalisation pour pneumonie et infection qui a failli lui couter la vie, surmonte un episode de pseudo-crise convulsive minutes avant un main event, et a emerge comme l'une des combattantes les plus resilientes de la division.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Revanche Qui A Du Sens</h3>
        <p class="mb-4">
          Les roles se sont completement inverses. En 2021, Grasso etait la favorite technique et Barber la jeune impulsive. Maintenant, Barber est la favorite des parieurs, avec l'elan, la confiance et une serie impressionnante. Grasso a besoin de cette victoire pour rester dans la conversation pour le titre. Une troisieme defaite consecutive, contre quelqu'un qu'elle a deja battue, serait devastatrice pour son recit de retour.
        </p>
        <p class="mb-4">
          Pour Barber, ce combat prouve l'evolution. Battre Grasso ferme la boucle, efface la defaite de 2021 et place "The Future" a quelques pas d'un combat pour le titre. Le co-main event de Seattle porte le poids de deux carrieres allant dans des directions opposees.
        </p>
      `,
      stakes: [
        { dimensao: 'Classement', fighter1: '#3 Poids Mouche', fighter2: '#5 Poids Mouche' },
        { dimensao: 'Serie', fighter1: '2 defaites consecutives', fighter2: '7 victoires consecutives' },
        { dimensao: 'Objectif', fighter1: 'Stopper la chute et revenir dans la course au titre', fighter2: 'Venger la defaite de 2021 et monter au classement' },
        { dimensao: 'Recit', fighter1: 'Ancienne championne en quete de redemption', fighter2: 'Evolution et revanche' },
        { dimensao: 'Risque', fighter1: '3e defaite consecutive serait catastrophique', fighter2: 'Perdre contre Grasso deux fois freine l\'elan' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'L\'EXPERIENCE PREVAUT',
          subtitulo: 'Grasso montre que la technique d\'ancienne championne reste superieure',
          consequencias: [
            { tag: 'CLASSEMENT', texto: 'Grasso reste dans le top 3 et revient dans la file pour le titre poids mouche' },
            { tag: 'HERITAGE', texto: 'Prouve que les deux defaites etaient contre des adversaires d\'elite, pas un signe de declin' },
            { tag: 'BARBER', texto: 'Barber perd pour la troisieme fois et la serie de 7 victoires est interrompue' },
          ],
          proxima_luta: 'Grasso vs gagnante d\'un combat pour le titre ou autre top 5',
        },
        fighter2_vence: {
          titulo: 'THE FUTURE ARRIVE ENFIN',
          subtitulo: 'Barber venge la defaite de 2021 et prouve qu\'elle a evolue au-dela de tout doute',
          consequencias: [
            { tag: 'TITRE', texto: 'Barber entre officiellement dans la conversation pour le titre poids mouche avec 8 victoires consecutives' },
            { tag: 'HERITAGE', texto: 'Le recit de resilience (LCA, pneumonie, pseudo-crise) gagne un nouveau chapitre epique' },
            { tag: 'GRASSO', texto: 'Troisieme defaite consecutive elimine pratiquement Grasso de la course au titre a court terme' },
          ],
          proxima_luta: 'Barber vs aspirante au titre ou combat eliminatoire contre top 3',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Alexa Grasso',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Natalia Silva', result: 'L', method: 'Decision Unanime', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Defaite nette contre la Bresilienne en pleine ascension. N\'a pas pu imposer son jeu' },
          { date: 'Sep 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'Decision Unanime', opponent_rank: 'Ex-Championne WFLW', quality_score: 5, quality_label: 'Excellent', note: 'A perdu la ceinture dans la trilogie. Shevchenko a domine et repris le titre' },
          { date: 'Sep 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'Match Nul Partage', opponent_rank: 'Championne WFLW', quality_score: 5, quality_label: 'Excellent', note: 'A conserve le titre lors d\'un match nul controverse. Beaucoup ont vu une victoire de Shevchenko' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Soumission R4', opponent_rank: 'Championne WFLW', quality_score: 5, quality_label: 'Excellent', note: 'Le sommet de sa carriere. A soumis la dominante Shevchenko pour remporter le titre' },
          { date: 'Oct 2022', opponent: 'Viviane Araujo', result: 'W', method: 'Decision Unanime', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Victoire solide qui a garanti le combat pour le titre' },
        ],
        full_fight_history: [
          { date: 'Nov 2016', opponent: 'Heather Jo Clark', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Debut a l\'UFC chez les poids paille' },
          { date: 'Fev 2017', opponent: 'Felice Herrig', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Premiere defaite professionnelle' },
          { date: 'Aou 2017', opponent: 'Randa Markos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire serree par decision partagee' },
          { date: 'Fev 2018', opponent: 'Tatiana Suarez', result: 'L', method: 'UD', opponent_rank: '#9 WSW', quality_score: 4, quality_label: 'Tres Bon', note: 'Battue par la dominante lutteuse Suarez' },
          { date: 'Jun 2019', opponent: 'Karolina Kowalkiewicz', result: 'W', method: 'UD', opponent_rank: '#9 WSW', quality_score: 3, quality_label: 'Bon', note: 'Victoire nette contre l\'ancienne aspirante au titre' },
          { date: 'Sep 2019', opponent: 'Carla Esparza', result: 'L', method: 'MD', opponent_rank: '#7 WSW', quality_score: 4, quality_label: 'Tres Bon', note: 'Defaite par decision majoritaire. A remporte le Combat de la Soiree' },
          { date: 'Aou 2020', opponent: 'Ji Yeon Kim', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Premiere victoire chez les poids mouche' },
          { date: 'Fev 2021', opponent: 'Maycee Barber', result: 'W', method: 'UD', opponent_rank: '#12 WFLW', quality_score: 2, quality_label: 'Moyen', note: 'A domine Barber avec sa boxe technique et son jeu au sol' },
          { date: 'Oct 2022', opponent: 'Viviane Araujo', result: 'W', method: 'UD', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Bon', note: 'A obtenu le combat pour le titre' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Sub R4', opponent_rank: 'Championne', quality_score: 5, quality_label: 'Excellent', note: 'A remporte le titre par soumission' },
          { date: 'Sep 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'SD (nul)', opponent_rank: 'Championne', quality_score: 5, quality_label: 'Excellent', note: 'Match nul partage controverse' },
          { date: 'Sep 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'UD', opponent_rank: 'Ex-Championne', quality_score: 5, quality_label: 'Excellent', note: 'A perdu la ceinture dans la trilogie' },
          { date: 'Mai 2025', opponent: 'Natalia Silva', result: 'L', method: 'UD', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Deuxieme defaite consecutive' },
        ],
        layoff_warning: 'Environ 10 mois sans combattre depuis mai 2025. Periode moderee d\'inactivite.',
        momentum_score: 3,
        momentum_label: 'En Baisse',
        momentum_trend: 'descending',
        momentum_note: 'Grasso traverse le pire moment de sa carriere a l\'UFC. Deux defaites consecutives, dont la perte du titre face a Shevchenko et une defaite contre Natalia Silva. La seule victoire des trois dernieres annees a ete la soumission historique de Shevchenko en mars 2023, suivie d\'un nul et deux defaites. A 32 ans, la fenetre d\'opportunite se ferme. Elle a un besoin urgent de victoire pour retrouver confiance.',
      },
      fighter2: {
        nome: 'Maycee Barber',
        color: 'blue',
        recent_fights: [
          { date: 'Dec 2025', opponent: 'Karine Silva', result: 'W', method: 'Decision Unanime', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Victoire solide contre une Bresilienne classee. A montre maturite et controle' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire dominante avant l\'hospitalisation pour pneumonie' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Bon', note: 'KO devastateur avec des coudes au sol. Performance de la Soiree' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'Decision Partagee', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Victoire serree et controversee par decision partagee' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire nette contre une veterane de la division' },
        ],
        full_fight_history: [
          { date: 'Nov 2018', opponent: 'Hannah Cifers', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Debut a l\'UFC avec un finish' },
          { date: 'Mar 2019', opponent: 'JJ Aldrich', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Deuxieme TKO consecutif' },
          { date: 'Oct 2019', opponent: 'Gillian Robertson', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Trois finitions consecutives pour ouvrir sa carriere' },
          { date: 'Jan 2020', opponent: 'Roxanne Modafferi', result: 'L', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Premiere defaite. Modafferi a utilise l\'experience pour frustrer Barber' },
          { date: 'Fev 2021', opponent: 'Alexa Grasso', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Revenait d\'une blessure au LCA. Grasso a domine avec sa boxe technique' },
          { date: 'Jul 2021', opponent: 'Miranda Maverick', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Decision partagee controversee' },
          { date: 'Avr 2022', opponent: 'Montana De La Rosa', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire confortable' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Victoire dominante contre veterane' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'SD', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Decision partagee serree' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Performance de la Soiree' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Avant l\'hospitalisation' },
          { date: 'Dec 2025', opponent: 'Karine Silva', result: 'W', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bon', note: 'Retour apres presque deux ans d\'absence' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'En Pleine Forme',
        momentum_trend: 'ascending',
        momentum_note: 'Barber accumule sept victoires consecutives et vit le meilleur moment de sa carriere. Ce qui impressionne, ce ne sont pas seulement les resultats, mais le contexte : elle a surmonte une hospitalisation de neuf jours pour pneumonie et infection en 2024, un episode de pseudo-crise convulsive avant un main event en 2025, et est quand meme revenue pour battre Karine Silva de maniere convaincante. Sa force mentale est aussi impressionnante que son evolution technique.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Grasso',
        media_oponentes: 4,
        media_oponentes_label: 'Tres Bon',
        aproveitamento: '8W-5L-1D (57%)',
        contra_top5: '1W-2L',
      },
      fighter2: {
        nome: 'Barber',
        media_oponentes: 2,
        media_oponentes_label: 'Moyen',
        aproveitamento: '12W-2L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'L\'affrontement direct en 2021 est la reference principale. Grasso a battu Barber par decision unanime a l\'UFC 258, mais Barber revenait d\'une chirurgie du genou (LCA) et n\'etait clairement plus la meme combattante. Cinq ans d\'evolution plus tard, la comparaison de ce combat a une valeur limitee.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Frappes Sign. par Minute', valueA: 4.67, valueB: 4.60, maxVal: 7, format: 'decimal' },
        { label: 'Precision des Frappes (%)', valueA: 43, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Frappes Encaissees/Min', valueA: 3.95, valueB: 2.72, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defense de Frappes (%)', valueA: 58, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Takedowns par 15 Min', valueA: 0.41, valueB: 1.14, maxVal: 3, format: 'decimal' },
        { label: 'Precision Takedown (%)', valueA: 45, valueB: 35, maxVal: 100, format: 'percent' },
        { label: 'Defense Takedown (%)', valueA: 59, valueB: 45, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '32 ans', fighter2: '27 ans', note: 'Barber 5 ans plus jeune' },
        { label: 'Taille', fighter1: '1,65m (5\'5")', fighter2: '1,65m (5\'5")', note: 'Meme taille' },
        { label: 'Allonge', fighter1: '168cm (66")', fighter2: '165cm (65")', note: 'Grasso avec 1 pouce d\'avantage' },
        { label: 'Garde', fighter1: 'Orthodoxe', fighter2: 'Switch', note: 'Barber alterne les gardes' },
        { label: 'Salle', fighter1: 'Lobo Gym, Guadalajara', fighter2: 'High Altitude MA, Denver', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Boxe Technique', valueA: 80, valueB: 65, labelA: 'Tres Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'Grasso possede la boxe la plus technique et raffinee. Contre-attaques precises et combinaisons fluides.' },
        { label: 'Pression et Volume', valueA: 55, valueB: 78, labelA: 'Bon', labelB: 'Tres Bon', advantage: 'fighter2', advantage_note: 'Barber pousse le rythme, travaille a haut volume et impose le tempo constamment.' },
        { label: 'Jiu-Jitsu et Soumission', valueA: 75, valueB: 45, labelA: 'Tres Bon', labelB: 'Moyen', advantage: 'fighter1', advantage_note: 'Grasso a soumis Shevchenko. Menace reelle au sol. Barber a progresse mais n\'est pas une reference.' },
        { label: 'Lutte et Controle', valueA: 50, valueB: 60, labelA: 'Moyen', labelB: 'Bon', advantage: 'fighter2', advantage_note: 'Barber a plus d\'activite en takedown et utilise la lutte pour imposer son jeu.' },
        { label: 'Cardio et Endurance', valueA: 72, valueB: 75, labelA: 'Bon', labelB: 'Tres Bon', advantage: 'even', advantage_note: 'Les deux ont combattu 5 rounds. Barber legerement meilleure pour maintenir le volume dans les rounds tardifs.' },
        { label: 'Puissance de Finition', valueA: 40, valueB: 65, labelA: 'Moyen', labelB: 'Bon', advantage: 'fighter2', advantage_note: 'Barber a 6 KO/TKO en 15 victoires (40%). Grasso en a 4 sur 16 (25%). Barber frappe plus fort.' },
      ],
      insight: 'Un combat de contrastes nets. Grasso est la technicienne, la contre-attaquante, la ceinture noire de jiu-jitsu qui peut terminer le combat au sol. Barber est la pression, le volume, l\'agressivite implacable. La cle est de savoir si Grasso peut garder la distance et utiliser le timing, ou si Barber peut etouffer l\'espace.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Grasso',
        ko_tko: { count: 4, percent: 25 },
        submission: { count: 2, percent: 13 },
        decision: { count: 10, percent: 62 },
        total_wins: 16,
      },
      fighter2: {
        nome: 'Barber',
        ko_tko: { count: 6, percent: 40 },
        submission: { count: 2, percent: 13 },
        decision: { count: 7, percent: 47 },
        total_wins: 15,
      },
      insight: 'Les chiffres revelent des styles opposes. Grasso est avant tout une combattante de decision (62%), sa boxe technique accumulant les points au fil des rounds. La soumission de Shevchenko fut l\'exception brillante, pas la regle. Barber apporte plus de puissance de finition, avec 40% de victoires par KO/TKO. Quand Barber blesse quelqu\'un, elle ne s\'arrete pas jusqu\'a la fin. Le coude qui a mis KO Ribas en 2023 le prouve.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 6,
          danger_label: 'AVANTAGE GRASSO',
          color: 'red',
          title: 'Le Territoire de la Technique',
          description: 'Les premiers rounds sont ceux ou Grasso performe historiquement le mieux. Fraiche et concentree, sa boxe technique fonctionne au mieux quand elle a l\'energie pour garder la distance et contre-attaquer. Si Grasso veut gagner ce combat, elle doit construire un avantage tot, avant que la pression de Barber ne commence a peser. Le jab et les contre-attaques seront la cle.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'ROUND DECISIF',
          color: 'gold',
          title: 'Le Point de Bascule',
          description: 'Le troisieme round est historiquement le moment ou les combattantes de pression commencent a prendre le controle. Si Barber a reussi a fermer la distance dans les deux premiers rounds sans subir de dommages significatifs, le R3 est ou son volume et sa lutte peuvent commencer a changer le combat. Pour Grasso, maintenir sa defense et ses contre-attaques ici est fondamental.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'AVANTAGE BARBER',
          color: 'green',
          title: 'La Pression Ne S\'Arrete Pas',
          description: 'Dans les championship rounds, la jeunesse de Barber (27 vs 32) et son activite recente peuvent etre des facteurs decisifs. Grasso a montre des signes de fatigue dans les derniers rounds contre Shevchenko dans la trilogie. Si Barber mene ou est a egalite a ce stade, le rythme et la pression devraient definir le combat. Grasso a besoin de quelque chose de special, comme une soumission, si elle est en retard aux points.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Serie de Defaites', fighter: 'Grasso', risk_level: 'RISQUE ELEVE', risk_color: 'red', description: 'Grasso sort de deux defaites consecutives pour la premiere fois de sa carriere. Perdre la ceinture puis tomber face a Natalia Silva a pu ebranler sa confiance. Le facteur psychologique d\'une possible troisieme defaite consecutive est reel.' },
        { icon: 'Shield', title: 'Resilience Surhumaine', fighter: 'Barber', risk_level: 'ENORME POSITIF', risk_color: 'green', description: 'Barber a survecu a une hospitalisation de 9 jours pour pneumonie et infection (fievre a 41C, tension arterielle dangereusement basse), un episode de pseudo-crise convulsive minutes avant un main event, et est revenue pour gagner. La force mentale de cette fille est inegalee.' },
        { icon: 'Clock', title: 'Inactivite de Grasso', fighter: 'Grasso', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'Grasso n\'a pas combattu depuis mai 2025, environ 10 mois d\'inactivite. Barber a combattu en decembre 2025. La difference de rythme peut etre pertinente dans les premieres minutes.' },
        { icon: 'Brain', title: 'Facteur Psychologique de la Revanche', fighter: 'Barber', risk_level: 'POSITIF', risk_color: 'green', description: 'Barber a perdu le premier combat. Les combattantes performent souvent mieux en revanche quand elles savent a quoi s\'attendre. Barber a 5 ans d\'evolution et la motivation de la revanche.' },
        { icon: 'AlertTriangle', title: 'Historique de Sante de Barber', fighter: 'Barber', risk_level: 'RISQUE FAIBLE', risk_color: 'yellow', description: 'La pseudo-crise de 2025 et la pneumonie de 2024 soulevent des questions sur la sante a long terme. Cependant, Barber a battu Karine Silva de maniere convaincante en decembre, suggerant une recuperation complete.' },
        { icon: 'Zap', title: 'Jiu-Jitsu de Grasso', fighter: 'Grasso', risk_level: 'POSITIF', risk_color: 'green', description: 'Si le combat va au sol, Grasso a la menace de la soumission. Elle a soumis Shevchenko, la combattante la plus dominante de l\'histoire des poids mouche. Une erreur de Barber au sol peut lui couter le combat.' },
        { icon: 'Activity', title: 'Evolution Technique de Barber', fighter: 'Barber', risk_level: 'POSITIF', risk_color: 'green', description: 'La Barber de 2026 est une combattante completement differente de la version 2021. Meilleure lutte, plus mature, plus patiente. Sept victoires consecutives prouvent l\'evolution. Grasso doit adapter son plan de jeu.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Grasso',
        total_probability: 40,
        scenarios: [
          { name: 'Boxe Technique et Contre-Attaques', probability: 22, method: 'Decision Unanime/Partagee', description: 'Grasso maintient la distance, utilise le jab et des contre-attaques precises pour frustrer la pression de Barber. Gagne aux points avec des rounds clairs de superiorite technique, comme lors du premier combat en 2021.' },
          { name: 'Soumission Opportuniste', probability: 10, method: 'Soumission R2-R4', description: 'Si le combat va au sol, Grasso peut trouver une soumission. La defense de takedown de Barber (45%) peut l\'amener au sol, et la Grasso a un avantage clair en jiu-jitsu.' },
          { name: 'Attaque au Corps et Usure', probability: 8, method: 'TKO R4-R5 ou Decision', description: 'Grasso travaille le corps de Barber dans les premiers rounds, accumulant des dommages et vidant le reservoir dans les derniers rounds. Scenario moins probable mais possible si Grasso trouve le timing.' },
        ],
      },
      fighter2: {
        nome: 'Barber',
        total_probability: 57,
        scenarios: [
          { name: 'Pression et Volume Implacables', probability: 30, method: 'Decision Unanime', description: 'Barber fait ce qu\'elle fait de mieux : pression, ferme la distance, melange frappes et lutte et ne laisse pas Grasso respirer. Gagne une decision nette avec volume et controle.' },
          { name: 'KO par Accumulation', probability: 15, method: 'TKO R3-R4', description: 'La pression constante blesse Grasso. Coudes, crochets et ground and pound accumulent les dommages jusqu\'a ce que l\'arbitre ou le coin arrete. Grasso encaisse 3.95 frappes par minute, un taux eleve.' },
          { name: 'Domination en Lutte', probability: 12, method: 'Decision Unanime', description: 'Barber utilise la lutte pour amener Grasso au sol a repetition. Meme si Grasso a un jiu-jitsu superieur, si Barber controle par-dessus sans donner d\'espace, les juges recompensent le controle.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Maycee Barber',
      winner_side: 'fighter2',
      predicted_method: 'Decision Unanime',
      confidence_score: 6,
      confidence_label: 'MOYENNE',
      explanation: 'Barber a l\'elan, la jeunesse et l\'evolution de son cote. En 2021, Grasso a battu une version bien inferieure de Barber, tout juste operee du genou et sans rythme. La Barber de 2026 est une autre combattante : plus mature, avec sept victoires consecutives, une lutte amelioree et la resilience mentale de quelqu\'un qui a survecu a des situations extremes hors de l\'octogone. Grasso, de son cote, sort de deux defaites consecutives et n\'a pas gagne depuis mars 2023 (si on considere que le nul n\'est pas une victoire). Le taux d\'absorption de frappes de Grasso (3.95 par minute) est preoccupant contre quelqu\'un qui pousse le rythme comme Barber. Neanmoins, la confiance est MOYENNE car Grasso a la technique d\'une ancienne championne, un jiu-jitsu dangereux et l\'experience de 5 rounds au plus haut niveau. Une soumission peut tout changer.',
      x_factor: {
        title: 'La Menace Invisible du Jiu-Jitsu',
        description: 'Grasso a soumis Valentina Shevchenko, quelque chose qui semblait impossible. Si le combat va au sol et que Barber commet une erreur, Grasso peut trouver un etranglement ou une cle qui termine tout en quelques secondes. Barber doit respecter le jeu au sol de Grasso a chaque instant.',
      },
      upset_alert: {
        title: 'Grasso N\'a Pas Oublie Comment Combattre',
        description: 'Grasso a perdu contre Shevchenko (l\'une des plus grandes de tous les temps) et Natalia Silva (qui est en pleine ascension). Elle n\'a pas perdu contre des combattantes mediocres. Si elle arrive concentree et avec le bon plan de jeu, la technique peut l\'emporter sur la pression. Ne sous-estimez pas une ancienne championne acculee.',
      },
      probabilities: {
        fighter1: { nome: 'Grasso', percent: 40 },
        fighter2: { nome: 'Barber', percent: 57 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Grasso (+135)', reasoning: 'En tant qu\'outsider, Grasso offre une valeur correcte. Ancienne championne avec un jiu-jitsu dangereux qui a deja battu Barber. La ligne pourrait etre plus serree.' },
        method: { pick: 'Le combat va a la decision', reasoning: 'Barber a 47% de decisions. Grasso a 62%. Les deux sont durables et la probabilite d\'aller aux juges est elevee.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Grasso n\'a jamais ete arretee par KO/TKO. Barber non plus. Les deux sont durables et completeront probablement au moins 4 rounds.' },
        best_value: 'Over 3.5 rounds est le pari le plus sur. Deux combattantes durables avec un historique de combats longs.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'La Distance dans les 5 Premieres Minutes', icon: 'Target', description: 'Si Grasso arrive a garder Barber au bout de son jab et a contre-attaquer avec precision au R1, la dynamique du combat change completement. Surveillez la distance que Grasso essaie de maintenir et si Barber arrive a couper l\'octogone pour fermer.' },
        { num: 2, title: 'La Lutte de Barber au R2', icon: 'Shield', description: 'Barber va probablement tester le takedown tot. Si les takedowns passent et que Barber controle par-dessus, Grasso sera en difficulte. Mais si Grasso defend et menace par-dessous avec des soumissions, Barber peut hesiter a aller au sol.' },
        { num: 3, title: 'Le Taux d\'Absorption de Grasso', icon: 'Activity', description: 'Grasso encaisse 3.95 frappes par minute, un chiffre eleve. Si Barber connecte frequemment dans les premiers rounds, l\'accumulation de dommages peut etre decisive dans les championship rounds. Surveillez si Grasso commence a trop reculer.' },
        { num: 4, title: 'Le Cardio dans les Championship Rounds', icon: 'Flame', description: 'Les deux ont deja combattu 5 rounds, mais Grasso sort d\'inactivite et a 5 ans de plus. Si le combat est equilibre au R4, le cardio va trancher. Observez qui maintient le volume et qui commence a ralentir.' },
        { num: 5, title: 'Transitions au Sol et Jiu-Jitsu', icon: 'Zap', description: 'Chaque fois que le combat va au sol, regardez les transitions de Grasso. Elle est dangereuse sur le dos et peut surprendre avec des triangles ou guillotines. Barber doit maintenir la position superieure sans donner d\'espace pour les attaques.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LA REVANCHE', content: 'GRASSO vs BARBER II\nUFC Seattle | 28 Mars\nClimate Pledge Arena\n\n5 ans apres le premier combat\nRoles completement inverses\nCo-Main Event de 5 rounds', color: 'gold' },
        { slide_number: 2, title: 'GRASSO : L\'EX-CHAMPIONNE', content: '#3 Poids Mouche | 16-5-1\nEx-Championne UFC (a soumis Shevchenko)\n2 defaites consecutives\n62% des victoires par decision\nBoxe technique d\'elite\nJiu-jitsu dangereux\nDoit gagner pour rester pertinente', color: 'red' },
        { slide_number: 3, title: 'BARBER : THE FUTURE', content: '#5 Poids Mouche | 15-2-0\n7 victoires consecutives\nA survecu a une pneumonie quasi-fatale\nA surmonte une pseudo-crise\n40% des victoires par KO/TKO\nFavorite des parieurs\nVient pour venger la defaite de 2021', color: 'blue' },
        { slide_number: 4, title: 'PREMIER COMBAT (2021)', content: 'UFC 258 | Fevrier 2021\n\nGrasso a gagne par UD (29-28 x3)\nBarber revenait de chirurgie du LCA\nHors rythme et sans confiance\n\n5 ans plus tard :\nBarber a ENORMEMENT evolue\nGrasso a perdu le titre et glisse', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'BARBER par Decision Unanime\n\nConfiance : MOYENNE\n57% Barber / 40% Grasso\n\nLa pression et le volume definissent.\nMais le jiu-jitsu de Grasso\npeut TOUT changer a chaque seconde.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Grasso vs Barber II en co-main de Seattle. En 2021, Grasso a domine. En 2026, les roles se sont completement inverses. Thread :' },
        { num: '2/6', text: 'Grasso (16-5-1) : Ex-championne, a soumis Shevchenko en 2023. Mais sort de 2 defaites consecutives, a perdu le titre. 32 ans. N\'a pas gagne depuis mars 2023.' },
        { num: '3/6', text: 'Barber (15-2-0) : 7 victoires consecutives. A survecu a une pneumonie quasi-fatale et une pseudo-crise. 27 ans. 40% des victoires par KO. La transformation depuis 2021 est remarquable.' },
        { num: '4/6', text: 'Le detail qui change tout : Grasso encaisse 3.95 frappes par minute. Barber pousse le rythme avec un volume eleve. Cette combinaison peut etre tres dangereuse pour Grasso dans les championship rounds.' },
        { num: '5/6', text: 'Mais n\'oubliez pas : Grasso a SOUMIS Shevchenko. Si le combat va au sol, son jiu-jitsu est une menace constante. Barber a 45% de defense de takedown, mais c\'est peut-etre elle qui amene au sol et se fait prendre.' },
        { num: '6/6', text: 'Mon choix : Barber par decision unanime. Mais Grasso +135 a de la valeur en outsider. Over 3.5 rounds est le pari le plus sur du co-main. Deux combattantes durables jamais arretees par KO.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'L\'ancienne championne qui a soumis Shevchenko sort de DEUX defaites consecutives. Et elle retrouve la femme qu\'elle a battue en 2021, qui a maintenant SEPT victoires consecutives. Grasso vs Barber 2, co-main de Seattle.' },
        { time: '10-25s', title: 'Contexte', text: 'En 2021 a l\'UFC 258, Grasso a domine Barber par decision. Mais Barber revenait d\'une chirurgie du genou. Cinq ans plus tard, Barber a failli mourir de pneumonie, a survecu a une crise avant un combat, et A QUAND MEME enchaine 7 victoires. Grasso a perdu le titre et a chute deux fois.' },
        { time: '25-40s', title: 'Analyse', text: 'La cle est la distance. Grasso doit garder Barber loin et contre-attaquer. Barber doit fermer, pousser et supprimer l\'espace. Grasso encaisse pres de 4 frappes par minute, et face a la pression de Barber, ce nombre peut exploser. Mais au sol, Grasso est dangereuse. Elle a soumis la MEILLEURE du monde.' },
        { time: '40-55s', title: 'Prediction', text: 'Barber par decision unanime, c\'est mon choix. Pression, volume et lutte. Mais Grasso a +135 a de la valeur, car les anciennes championnes ne perdent pas leur technique du jour au lendemain. L\'over 3.5 rounds est presque garanti.' },
        { time: '55-65s', title: 'CTA', text: 'Qui l\'emporte ? Commentez Grasso ou Barber. Si l\'analyse vous a plu, suivez pour le breakdown complet de toute la carte de Seattle.' },
      ],
      tiktok: [
        { hook: 'Cette combattante a FAILLI MOURIR et est maintenant favorite contre une ex-championne UFC.', body: 'Maycee Barber a passe 9 jours a l\'hopital avec une pneumonie et une infection en 2024. 41 degres de fievre. Ne pouvait plus respirer. A failli mourir. Est revenue et a gagne. Puis a eu une CRISE CONVULSIVE avant un combat. Est revenue et a gagne encore. Maintenant elle affronte Alexa Grasso, qui etait championne et l\'a deja battue en 2021. Mais les roles se sont inverses.', cta: 'Commentez qui gagne : GRASSO ou BARBER !' },
        { hook: 'L\'ancienne championne UFC n\'a pas gagne UN SEUL COMBAT depuis 2023.', body: 'Alexa Grasso a soumis Shevchenko et est devenue championne en mars 2023. Depuis ? Nul, defaite, defaite. A perdu le titre. Maintenant elle affronte Barber, qu\'elle a deja battue, mais qui enchaine SEPT victoires consecutives. Les roles se sont completement inverses.', cta: 'Suivez pour plus d\'analyses UFC Seattle !' },
        { hook: 'Cette STATISTIQUE montre pourquoi Grasso est en danger.', body: 'Grasso encaisse 3.95 frappes significatives par MINUTE. Barber pousse avec un volume extremement eleve. En 5 rounds de co-main event, Grasso pourrait encaisser plus de 100 frappes significatives. Et elle sort d\'inactivite. MAIS, Grasso a soumis Shevchenko, la combattante la plus dominante de l\'histoire. Une soumission change tout.', cta: 'Sur qui vous pariez ? Commentez !' },
      ],
      headlines: [
        'Grasso vs Barber II : De Championne a Outsider en Seulement 3 Ans',
        'La Transformation de Maycee Barber : De Defaite Humiliante a Favorite de la Revanche',
        'Grasso Cherche la Redemption a Seattle Contre la Femme Qui a Failli Mourir et Est Revenue Plus Forte',
        'Pourquoi le Jiu-Jitsu de Grasso Pourrait Etre la Cle Pour Eviter une Troisieme Defaite Consecutive',
        'Barber -160 ou Grasso ? La Revanche Qui Divise les Opinions au Co-Main de Seattle',
        'UFC Seattle : Le Co-Main Event Qui Pourrait Definir Deux Carrieres dans des Directions Opposees',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+135',
        fighter2_odds: '-160',
        fighter1_name: 'Alexa Grasso',
        fighter2_name: 'Maycee Barber',
        source: 'Moyenne des sites de paris (mars 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Elan Oppose', stat_headline: 'GRASSO : 0V SUR LES 2 DERNIERS. BARBER : 7 VICTOIRES CONSECUTIVES', contexto: 'L\'ecart d\'elan est dramatique. Grasso n\'a pas gagne depuis mars 2023 (soumission de Shevchenko). Barber est sur la meilleure serie de sa carriere.', implicacao_aposta: 'Favorise fortement Barber. L\'elan est un facteur reel dans les combats de haut niveau.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Taux d\'Absorption de Grasso', stat_headline: '3.95 FRAPPES ENCAISSEES PAR MINUTE', contexto: 'Grasso encaisse pres de 4 frappes significatives par minute, un taux eleve pour les poids mouche feminins. Face a la pression et au volume de Barber, ce chiffre peut etre exploite.', implicacao_aposta: 'Barber par decision ou TKO tardif gagne en valeur avec cette donnee.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Menace de Soumission de Grasso', stat_headline: 'A SOUMIS SHEVCHENKO PAR SOUMISSION AU R4', contexto: 'Grasso a un jiu-jitsu de tres haut niveau. Elle a soumis la combattante la plus dominante de l\'histoire des poids mouche. Si le combat va au sol, Barber est en danger.', implicacao_aposta: 'Grasso par soumission peut avoir de la valeur dans les cotes de methode.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Durabilite des Deux', stat_headline: 'AUCUNE N\'A ETE ARRETEE PAR KO/TKO EN CARRIERE', contexto: 'Grasso a perdu 5 combats, tous par decision ou soumission. Barber en a perdu 2, tous par decision. Aucune n\'a ete mise KO.', implicacao_aposta: 'L\'over sur les rounds est favorise. Un finish par KO a une faible probabilite.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Clock', titulo: 'Jeunesse et Activite', stat_headline: 'BARBER : 27 ANS, A COMBATTU EN DEC/2025. GRASSO : 32 ANS, A COMBATTU EN MAI/2025', contexto: 'Barber a 5 ans de moins et a combattu plus recemment. La difference d\'age et d\'activite peut etre pertinente dans les championship rounds.', implicacao_aposta: 'Si le combat atteint les R4-R5 a egalite, favorise Barber.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-180', confianca: 'alta', edge_vs_mercado: 'Aucune des deux n\'a ete arretee par KO/TKO. Les deux sont durables.', raciocinio: 'Avec Grasso a 62% de decisions et Barber au menton solide, la probabilite d\'aller au-dela du R3 est tres elevee. Peut etre le pari le plus sur du co-main.' },
        { tipo: 'Methode', pick: 'Va en Decision', odds: '-110', confianca: 'media', raciocinio: 'Historiquement, les deux favorisent les decisions. 62% pour Grasso et 47% pour Barber. La combinaison suggere une forte tendance pour les juges a decider.' },
        { tipo: 'Moneyline', pick: 'Grasso (+135)', odds: '+135', confianca: 'baixa', edge_vs_mercado: 'Ancienne championne avec jiu-jitsu dangereux et experience de titre. La ligne sous-estime peut-etre les defaites recentes.', raciocinio: 'Grasso a deja battu Barber, a un jiu-jitsu superieur et une experience en 5 rounds de titre. +135 peut avoir une legere valeur si vous croyez que la technique surpasse l\'elan.' },
      ],
      armadilha: {
        titulo: 'Piege : Barber par Knockout',
        descricao: 'Barber a de la puissance, mais Grasso n\'a JAMAIS ete mise KO en 22 combats professionnels. Toutes les defaites de Grasso ont ete par decision ou soumission. Parier sur Barber par KO/TKO, c\'est parier contre le palmares de durabilite de Grasso.',
      },
      disclaimer: 'Analyse statistique a titre informatif. Pariez de maniere responsable.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// SPANISH TRANSLATION
// ═══════════════════════════════════════════════════════════════════════

const analiseES: FullSingleAnalise = {
  id: 'grasso-vs-barber',
  evento_id: null,
  slug: 'grasso-vs-barber',
  titulo: 'Grasso vs Barber: La Revancha de la Redencion',
  subtitulo: 'Excampeona en caida libre reencuentra a la mujer que vencio en 2021, que ahora trae 7 victorias consecutivas',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,65m', envergadura: '168cm', idade: 32, academia: 'Lobo Gym' },
      fighter2: { altura: '1,65m', envergadura: '165cm', idade: 27, academia: 'High Altitude Martial Arts' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Decision Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Alexa Grasso',
    record: '16-5-1',
    ultimasLutas: [
      { result: 'L', opponent: 'Natalia Silva', method: 'Decision Unanime', event: 'UFC 315' },
      { result: 'L', opponent: 'Valentina Shevchenko', method: 'Decision Unanime', event: 'UFC 306' },
      { result: 'D', opponent: 'Valentina Shevchenko', method: 'Empate Dividido', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Maycee Barber',
    record: '15-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Karine Silva', method: 'Decision Unanime', event: 'UFC 323' },
      { result: 'W', opponent: 'Katlyn Cerminara', method: 'Decision Unanime', event: 'UFC 299' },
      { result: 'W', opponent: 'Amanda Ribas', method: 'KO R2', event: 'UFC on ABC 5' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marzo, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Mosca Femenino (125 lbs)',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marzo, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Mosca Femenino (125 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'La Revancha de la Redencion',
      tagline_sub: '5 anos despues, roles invertidos y todo en juego en la division',
      fighter1: {
        nome_completo: 'Alexa Grasso',
        apelido: '',
        sobrenome: 'Grasso',
        record: '16-5-1',
        ranking: '#3 Peso Mosca',
        info_extra: 'Guadalajara, Mexico | 32 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-05/GRASSO_ALEXA_L_05-10.png?itok=I3pDf9FG',
      },
      fighter2: {
        nome_completo: 'Maycee "The Future" Barber',
        apelido: 'The Future',
        sobrenome: 'Barber',
        record: '15-2-0',
        ranking: '#5 Peso Mosca',
        info_extra: 'Greeley, Colorado | 27 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/BARBER_MAYCEE_L_12-06.png?itok=PsAi5oK3',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">De Campeona a la Encrucijada</h3>
        <p class="mb-4">
          En marzo de 2023, <strong class="text-ufc-red">Alexa Grasso</strong> sacudio al mundo al someter a Valentina Shevchenko en el cuarto round del UFC 285, conquistando el cinturon peso mosca femenino. Era la cima de un camino que comenzo en peso paja, paso por derrotas duras y finalmente encontro su ritmo en las 125 lbs. La mexicana de Guadalajara parecia destinada a dominar la division por anos.
        </p>
        <p class="mb-4">
          Menos de tres anos despues, el panorama es completamente diferente. Grasso empato en la revancha con Shevchenko, perdio el cinturon de forma clara en el UFC 306, y luego cayo ante Natalia Silva en el UFC 315. Dos derrotas consecutivas. El primer momento de caida real en su carrera. A los 32 anos, la pregunta es inevitable: la mejor version de Grasso ya quedo atras?
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Transformacion de "The Future"</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Maycee Barber</strong> ya no es aquella chica de 22 anos que perdio ante Grasso en 2021. En aquella epoca, Barber volvia de una lesion grave en la rodilla (ruptura de LCA), estaba fuera de ritmo y claramente no era la misma peleadora. Grasso gano con facilidad por decision unanime. Cinco anos despues, Barber acumulo siete victorias consecutivas, sobrevivio a una hospitalizacion por neumonia e infeccion que casi le costo la vida, supero un episodio de pseudo-convulsion minutos antes de un main event, y emergio como una de las peleadoras mas resilientes de la division.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">La Revancha Que Tiene Sentido</h3>
        <p class="mb-4">
          Los roles se invirtieron completamente. En 2021, Grasso era la favorita tecnica y Barber la joven precipitada. Ahora, Barber es la favorita en las casas de apuestas, con momentum, confianza y una racha impresionante. Grasso necesita esta victoria para mantenerse relevante en la conversacion por el titulo. Una tercera derrota seguida, contra alguien que ya vencio, seria devastadora para su narrativa de regreso.
        </p>
        <p class="mb-4">
          Para Barber, esta pelea se trata de probar evolucion. Vencer a Grasso cierra el circulo, borra la derrota de 2021 y coloca a "The Future" a pocos pasos de una disputa por el titulo. El co-main event de Seattle carga el peso de dos carreras en direcciones opuestas.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#3 Peso Mosca', fighter2: '#5 Peso Mosca' },
        { dimensao: 'Racha', fighter1: '2 derrotas consecutivas', fighter2: '7 victorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Frenar la caida y volver a la conversacion por el titulo', fighter2: 'Vengar la derrota de 2021 y subir en el ranking' },
        { dimensao: 'Narrativa', fighter1: 'Excampeona en busca de redencion', fighter2: 'Evolucion y venganza' },
        { dimensao: 'Riesgo', fighter1: '3a derrota seguida seria catastrofica', fighter2: 'Perder ante Grasso dos veces frena el impulso' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'LA EXPERIENCIA PREVALECE',
          subtitulo: 'Grasso demuestra que la tecnica de excampeona sigue siendo superior',
          consequencias: [
            { tag: 'RANKING', texto: 'Grasso se mantiene en el top 3 y vuelve a la fila por el titulo peso mosca' },
            { tag: 'LEGADO', texto: 'Demuestra que las dos derrotas fueron contra oponentes de elite, no senal de declive' },
            { tag: 'BARBER', texto: 'Barber pierde por tercera vez en su carrera y la racha de 7 victorias se interrumpe' },
          ],
          proxima_luta: 'Grasso vs ganadora de pelea por titulo u otra top 5',
        },
        fighter2_vence: {
          titulo: 'THE FUTURE FINALMENTE LLEGA',
          subtitulo: 'Barber venga la derrota de 2021 y demuestra que evoluciono mas alla de toda duda',
          consequencias: [
            { tag: 'TITULO', texto: 'Barber entra oficialmente en la conversacion por el titulo peso mosca con 8 victorias seguidas' },
            { tag: 'LEGADO', texto: 'La narrativa de superacion (LCA, neumonia, pseudo-convulsion) gana otro capitulo epico' },
            { tag: 'GRASSO', texto: 'Tercera derrota seguida practicamente elimina a Grasso de la carrera por el titulo a corto plazo' },
          ],
          proxima_luta: 'Barber vs aspirante al titulo o pelea eliminatoria contra top 3',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Alexa Grasso',
        color: 'red',
        recent_fights: [
          { date: 'May 2025', opponent: 'Natalia Silva', result: 'L', method: 'Decision Unanime', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Perdio de forma clara ante la brasilena en ascenso. No logro imponer su juego' },
          { date: 'Sep 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'Decision Unanime', opponent_rank: 'Excampeona WFLW', quality_score: 5, quality_label: 'Excelente', note: 'Perdio el cinturon en la trilogia. Shevchenko domino y recupero el titulo' },
          { date: 'Sep 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'Empate Dividido', opponent_rank: 'Campeona WFLW', quality_score: 5, quality_label: 'Excelente', note: 'Retuvo el titulo en empate controvertido. Muchos vieron victoria de Shevchenko' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Sumision R4', opponent_rank: 'Campeona WFLW', quality_score: 5, quality_label: 'Excelente', note: 'El momento mas alto de su carrera. Sometio a la dominante Shevchenko para conquistar el titulo' },
          { date: 'Oct 2022', opponent: 'Viviane Araujo', result: 'W', method: 'Decision Unanime', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Victoria solida que le garantizo la disputa por el titulo' },
        ],
        full_fight_history: [
          { date: 'Nov 2016', opponent: 'Heather Jo Clark', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Debut en el UFC en peso paja' },
          { date: 'Feb 2017', opponent: 'Felice Herrig', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Primera derrota profesional' },
          { date: 'Ago 2017', opponent: 'Randa Markos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Victoria apretada por decision dividida' },
          { date: 'Feb 2018', opponent: 'Tatiana Suarez', result: 'L', method: 'UD', opponent_rank: '#9 WSW', quality_score: 4, quality_label: 'Muy Bueno', note: 'Derrotada por la dominante luchadora Suarez' },
          { date: 'Jun 2019', opponent: 'Karolina Kowalkiewicz', result: 'W', method: 'UD', opponent_rank: '#9 WSW', quality_score: 3, quality_label: 'Bueno', note: 'Victoria clara contra exaspirante al titulo' },
          { date: 'Sep 2019', opponent: 'Carla Esparza', result: 'L', method: 'MD', opponent_rank: '#7 WSW', quality_score: 4, quality_label: 'Muy Bueno', note: 'Derrota por decision mayoritaria. Gano Pelea de la Noche' },
          { date: 'Ago 2020', opponent: 'Ji Yeon Kim', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Primera victoria en peso mosca' },
          { date: 'Feb 2021', opponent: 'Maycee Barber', result: 'W', method: 'UD', opponent_rank: '#12 WFLW', quality_score: 2, quality_label: 'Regular', note: 'Domino a Barber con boxeo tecnico y juego de piso' },
          { date: 'Oct 2022', opponent: 'Viviane Araujo', result: 'W', method: 'UD', opponent_rank: '#6 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Aseguro la disputa por el titulo' },
          { date: 'Mar 2023', opponent: 'Valentina Shevchenko', result: 'W', method: 'Sub R4', opponent_rank: 'Campeona', quality_score: 5, quality_label: 'Excelente', note: 'Conquisto el titulo por sumision' },
          { date: 'Sep 2023', opponent: 'Valentina Shevchenko', result: 'D', method: 'SD (empate)', opponent_rank: 'Campeona', quality_score: 5, quality_label: 'Excelente', note: 'Empate dividido controvertido' },
          { date: 'Sep 2024', opponent: 'Valentina Shevchenko', result: 'L', method: 'UD', opponent_rank: 'Excampeona', quality_score: 5, quality_label: 'Excelente', note: 'Perdio el cinturon en la trilogia' },
          { date: 'May 2025', opponent: 'Natalia Silva', result: 'L', method: 'UD', opponent_rank: '#7 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Segunda derrota consecutiva' },
        ],
        layoff_warning: 'Aproximadamente 10 meses sin pelear desde mayo de 2025. Periodo moderado de inactividad.',
        momentum_score: 3,
        momentum_label: 'En Caida',
        momentum_trend: 'descending',
        momentum_note: 'Grasso vive el peor momento de su carrera en el UFC. Dos derrotas consecutivas, incluyendo la perdida del titulo ante Shevchenko y una derrota contra Natalia Silva. La unica victoria en los ultimos tres anos fue la sumision historica de Shevchenko en marzo de 2023, seguida de un empate y dos derrotas. A los 32 anos, la ventana de oportunidad se esta cerrando. Necesita urgentemente una victoria para recuperar la confianza.',
      },
      fighter2: {
        nome: 'Maycee Barber',
        color: 'blue',
        recent_fights: [
          { date: 'Dic 2025', opponent: 'Karine Silva', result: 'W', method: 'Decision Unanime', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Victoria solida contra brasilena ranqueada. Mostro madurez y control' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Victoria dominante antes de la hospitalizacion por neumonia' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Nocaut devastador con codazos en ground and pound. Actuacion de la Noche' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'Decision Dividida', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Victoria apretada y controvertida por decision dividida' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Victoria clara contra veterana de la division' },
        ],
        full_fight_history: [
          { date: 'Nov 2018', opponent: 'Hannah Cifers', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Debut en el UFC con finalizacion' },
          { date: 'Mar 2019', opponent: 'JJ Aldrich', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Segundo TKO consecutivo' },
          { date: 'Oct 2019', opponent: 'Gillian Robertson', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Tres finalizaciones seguidas para abrir su carrera' },
          { date: 'Ene 2020', opponent: 'Roxanne Modafferi', result: 'L', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Primera derrota. Modafferi uso la experiencia para frustrar a Barber' },
          { date: 'Feb 2021', opponent: 'Alexa Grasso', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Volvia de lesion en el LCA. Grasso domino con boxeo tecnico' },
          { date: 'Jul 2021', opponent: 'Miranda Maverick', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Decision dividida controvertida' },
          { date: 'Abr 2022', opponent: 'Montana De La Rosa', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Victoria comoda' },
          { date: 'Jul 2022', opponent: 'Jessica Eye', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Regular', note: 'Victoria dominante contra veterana' },
          { date: 'Mar 2023', opponent: 'Andrea Lee', result: 'W', method: 'SD', opponent_rank: '#9 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Decision dividida apretada' },
          { date: 'Jun 2023', opponent: 'Amanda Ribas', result: 'W', method: 'KO R2', opponent_rank: '#11 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Actuacion de la Noche' },
          { date: 'Mar 2024', opponent: 'Katlyn Cerminara', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Malo', note: 'Antes de la hospitalizacion' },
          { date: 'Dic 2025', opponent: 'Karine Silva', result: 'W', method: 'UD', opponent_rank: '#8 WFLW', quality_score: 3, quality_label: 'Bueno', note: 'Volvio tras casi dos anos fuera' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'En Alza',
        momentum_trend: 'ascending',
        momentum_note: 'Barber acumula siete victorias consecutivas y esta en el mejor momento de su carrera. Lo que impresiona no son solo los resultados, sino el contexto: supero una hospitalizacion de nueve dias por neumonia e infeccion en 2024, un episodio de pseudo-convulsion antes de un main event en 2025, y aun asi volvio para vencer a Karine Silva de manera convincente. Su fortaleza mental es tan impresionante como su evolucion tecnica.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Grasso',
        media_oponentes: 4,
        media_oponentes_label: 'Muy Bueno',
        aproveitamento: '8W-5L-1D (57%)',
        contra_top5: '1W-2L',
      },
      fighter2: {
        nome: 'Barber',
        media_oponentes: 2,
        media_oponentes_label: 'Regular',
        aproveitamento: '12W-2L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'El enfrentamiento directo en 2021 es la referencia principal. Grasso vencio a Barber por decision unanime en el UFC 258, pero Barber volvia de una cirugia de rodilla (LCA) y claramente no era la misma peleadora. Cinco anos de evolucion despues, la comparacion de aquella pelea tiene valor limitado.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Golpes Sign. por Minuto', valueA: 4.67, valueB: 4.60, maxVal: 7, format: 'decimal' },
        { label: 'Precision de Golpes (%)', valueA: 43, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Golpes Absorbidos/Min', valueA: 3.95, valueB: 2.72, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defensa de Golpes (%)', valueA: 58, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.41, valueB: 1.14, maxVal: 3, format: 'decimal' },
        { label: 'Precision de Takedown (%)', valueA: 45, valueB: 35, maxVal: 100, format: 'percent' },
        { label: 'Defensa de Takedown (%)', valueA: 59, valueB: 45, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Edad', fighter1: '32 anos', fighter2: '27 anos', note: 'Barber 5 anos mas joven' },
        { label: 'Altura', fighter1: '1,65m (5\'5")', fighter2: '1,65m (5\'5")', note: 'Misma altura' },
        { label: 'Envergadura', fighter1: '168cm (66")', fighter2: '165cm (65")', note: 'Grasso con 1 pulgada de ventaja' },
        { label: 'Guardia', fighter1: 'Ortodoxa', fighter2: 'Switch', note: 'Barber alterna guardias' },
        { label: 'Gimnasio', fighter1: 'Lobo Gym, Guadalajara', fighter2: 'High Altitude MA, Denver', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Boxeo Tecnico', valueA: 80, valueB: 65, labelA: 'Muy Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'Grasso tiene el boxeo mas tecnico y refinado. Contragolpes precisos y combinaciones fluidas.' },
        { label: 'Presion y Volumen', valueA: 55, valueB: 78, labelA: 'Bueno', labelB: 'Muy Bueno', advantage: 'fighter2', advantage_note: 'Barber presiona mas, trabaja con alto volumen y fuerza el ritmo constantemente.' },
        { label: 'Jiu-Jitsu y Sumision', valueA: 75, valueB: 45, labelA: 'Muy Bueno', labelB: 'Regular', advantage: 'fighter1', advantage_note: 'Grasso sometio a Shevchenko. Amenaza real en el piso. Barber evoluciono pero no es referencia.' },
        { label: 'Lucha y Control', valueA: 50, valueB: 60, labelA: 'Regular', labelB: 'Bueno', advantage: 'fighter2', advantage_note: 'Barber tiene mas actividad de takedown y usa la lucha para imponer su juego.' },
        { label: 'Cardio y Resistencia', valueA: 72, valueB: 75, labelA: 'Bueno', labelB: 'Muy Bueno', advantage: 'even', advantage_note: 'Ambas ya pelearon 5 rounds. Barber ligeramente mejor manteniendo volumen en rounds finales.' },
        { label: 'Poder de Finalizacion', valueA: 40, valueB: 65, labelA: 'Regular', labelB: 'Bueno', advantage: 'fighter2', advantage_note: 'Barber tiene 6 KO/TKOs en 15 victorias (40%). Grasso tiene 4 en 16 (25%). Barber golpea mas fuerte.' },
      ],
      insight: 'Una pelea de contrastes claros. Grasso es la tecnica, la contragolpeadora, la cinturon negro de jiu-jitsu que puede terminar la pelea si va al piso. Barber es la presion, el volumen, la agresividad imparable. La clave es si Grasso logra mantener distancia y usar el timing, o si Barber logra asfixiar el espacio.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Grasso',
        ko_tko: { count: 4, percent: 25 },
        submission: { count: 2, percent: 13 },
        decision: { count: 10, percent: 62 },
        total_wins: 16,
      },
      fighter2: {
        nome: 'Barber',
        ko_tko: { count: 6, percent: 40 },
        submission: { count: 2, percent: 13 },
        decision: { count: 7, percent: 47 },
        total_wins: 15,
      },
      insight: 'Los numeros revelan estilos opuestos. Grasso es primordialmente una peleadora de decision (62%), con su boxeo tecnico acumulando puntos a lo largo de los rounds. La sumision de Shevchenko fue la excepcion brillante, no la regla. Barber trae mas poder de finalizacion, con 40% de victorias por KO/TKO. Cuando Barber lastima a alguien, no para hasta terminar. El codazo que noqueo a Ribas en 2023 lo demuestra.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 6,
          danger_label: 'VENTAJA GRASSO',
          color: 'red',
          title: 'El Territorio de la Tecnica',
          description: 'Los primeros rounds son donde Grasso historicamente rinde mejor. Fresca y enfocada, su boxeo tecnico funciona mejor cuando tiene energia para mantener distancia y contragolpear. Si Grasso va a ganar esta pelea, necesita construir ventaja temprano, antes de que la presion de Barber comience a pesar. El jab y los contragolpes seran la clave.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'ROUND DECISIVO',
          color: 'gold',
          title: 'El Punto de Inflexion',
          description: 'El tercer round es historicamente el momento en que las peleadoras de presion comienzan a tomar el control. Si Barber logro cerrar distancia en los dos primeros rounds sin sufrir dano significativo, el R3 es donde su volumen y lucha pueden empezar a cambiar la pelea. Para Grasso, mantener la defensa y el contragolpe aqui es fundamental.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VENTAJA BARBER',
          color: 'green',
          title: 'La Presion No Para',
          description: 'En los championship rounds, la juventud de Barber (27 vs 32) y la actividad reciente pueden ser factores decisivos. Grasso mostro senales de fatiga en los rounds finales contra Shevchenko en la trilogia. Si Barber va adelante o esta igualada en este punto, el ritmo y la presion deben definir la pelea. Grasso necesita algo especial, como una sumision, si esta detras en los puntos.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Racha de Derrotas', fighter: 'Grasso', risk_level: 'RIESGO ALTO', risk_color: 'red', description: 'Grasso viene de dos derrotas consecutivas por primera vez en su carrera. Perder el cinturon y luego caer ante Natalia Silva puede haber sacudido su confianza. El factor psicologico de una posible tercera derrota seguida es real.' },
        { icon: 'Shield', title: 'Resiliencia Sobrehumana', fighter: 'Barber', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Barber sobrevivio a una hospitalizacion de 9 dias por neumonia e infeccion (fiebre de 41C, presion arterial peligrosamente baja), un episodio de pseudo-convulsion minutos antes de un main event, y volvio para ganar. La fortaleza mental de esta chica es incomparable.' },
        { icon: 'Clock', title: 'Inactividad de Grasso', fighter: 'Grasso', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'Grasso no pelea desde mayo de 2025, cerca de 10 meses de inactividad. Barber peleo en diciembre de 2025. La diferencia de ritmo puede ser relevante en los primeros minutos.' },
        { icon: 'Brain', title: 'Factor Psicologico de la Revancha', fighter: 'Barber', risk_level: 'POSITIVO', risk_color: 'green', description: 'Barber perdio la primera pelea. Las peleadoras frecuentemente rinden mejor en la revancha cuando saben que esperar. Barber tiene 5 anos de evolucion y la motivacion de la venganza.' },
        { icon: 'AlertTriangle', title: 'Historial de Salud de Barber', fighter: 'Barber', risk_level: 'RIESGO BAJO', risk_color: 'yellow', description: 'La pseudo-convulsion de 2025 y la neumonia de 2024 levantan preguntas sobre la salud a largo plazo. Sin embargo, Barber vencio a Karine Silva de forma convincente en diciembre, sugiriendo recuperacion completa.' },
        { icon: 'Zap', title: 'Jiu-Jitsu de Grasso', fighter: 'Grasso', risk_level: 'POSITIVO', risk_color: 'green', description: 'Si la pelea va al piso, Grasso tiene la amenaza de sumision. Sometio a Shevchenko, la peleadora mas dominante de la historia del peso mosca. Un error de Barber en el piso puede costarle la pelea.' },
        { icon: 'Activity', title: 'Evolucion Tecnica de Barber', fighter: 'Barber', risk_level: 'POSITIVO', risk_color: 'green', description: 'La Barber de 2026 es una peleadora completamente diferente de la version de 2021. Mejor lucha, mas madura, mas paciente. Siete victorias consecutivas prueban la evolucion. Grasso necesita adaptar el plan de juego.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Grasso',
        total_probability: 40,
        scenarios: [
          { name: 'Boxeo Tecnico y Contragolpes', probability: 22, method: 'Decision Unanime/Dividida', description: 'Grasso mantiene distancia, usa el jab y contragolpes precisos para frustrar la presion de Barber. Gana en los puntos con rounds claros de superioridad tecnica, como hizo en la primera pelea en 2021.' },
          { name: 'Sumision Oportunista', probability: 10, method: 'Sumision R2-R4', description: 'Si la pelea va al piso, Grasso puede encontrar una sumision. La defensa de takedown de Barber (45%) puede llevarla al suelo, y ahi Grasso tiene ventaja clara en jiu-jitsu.' },
          { name: 'Ataque al Cuerpo y Desgaste', probability: 8, method: 'TKO R4-R5 o Decision', description: 'Grasso trabaja el cuerpo de Barber en los primeros rounds, acumulando dano y quitando el aire en los rounds finales. Escenario menos probable pero posible si Grasso encuentra el timing.' },
        ],
      },
      fighter2: {
        nome: 'Barber',
        total_probability: 57,
        scenarios: [
          { name: 'Presion y Volumen Implacable', probability: 30, method: 'Decision Unanime', description: 'Barber hace lo que mejor sabe: presiona, cierra distancia, mezcla striking con lucha y no deja respirar a Grasso. Gana una decision clara con volumen y control.' },
          { name: 'Nocaut por Acumulacion', probability: 15, method: 'TKO R3-R4', description: 'La presion constante lastima a Grasso. Codazos, ganchos y ground and pound acumulan dano hasta que el arbitro o esquina paren. Grasso absorbe 3.95 golpes por minuto, tasa alta.' },
          { name: 'Dominio en la Lucha', probability: 12, method: 'Decision Unanime', description: 'Barber usa la lucha para llevar a Grasso al piso repetidamente. Aunque Grasso tenga jiu-jitsu superior, si Barber controla desde arriba sin dar espacio, los jueces premian el control.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Maycee Barber',
      winner_side: 'fighter2',
      predicted_method: 'Decision Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Barber tiene el momentum, la juventud y la evolucion a su favor. En 2021, Grasso vencio a una version muy inferior de Barber, recien operada de la rodilla y sin ritmo. La Barber de 2026 es otra peleadora: mas madura, con siete victorias consecutivas, lucha mejorada y la resiliencia mental de quien sobrevivio situaciones extremas fuera del octagono. Grasso, por otro lado, viene de dos derrotas seguidas y no gana desde marzo de 2023 (si consideramos que el empate no es victoria). La tasa de absorcion de golpes de Grasso (3.95 por minuto) es preocupante contra alguien que presiona como Barber. Aun asi, la confianza es MEDIA porque Grasso tiene la tecnica de excampeona, el jiu-jitsu peligroso y la experiencia de 5 rounds al mas alto nivel. Una sumision puede cambiarlo todo.',
      x_factor: {
        title: 'La Amenaza Invisible del Jiu-Jitsu',
        description: 'Grasso sometio a Valentina Shevchenko, algo que parecia imposible. Si la pelea va al piso y Barber comete un error, Grasso puede encontrar un estrangulamiento o llave que termine todo en segundos. Barber necesita respetar el juego de piso de Grasso en cada momento.',
      },
      upset_alert: {
        title: 'Grasso No Olvido Como Pelear',
        description: 'Grasso perdio ante Shevchenko (una de las mas grandes de todos los tiempos) y Natalia Silva (que esta en ascenso). No perdio ante peleadoras mediocres. Si llega enfocada y con el plan de juego correcto, la tecnica puede prevalecer sobre la presion. No subestimen a una excampeona acorralada.',
      },
      probabilities: {
        fighter1: { nome: 'Grasso', percent: 40 },
        fighter2: { nome: 'Barber', percent: 57 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Grasso (+135)', reasoning: 'Como no favorita, Grasso ofrece valor decente. Excampeona con jiu-jitsu peligroso y ya vencio a Barber. La linea podria estar mas ajustada.' },
        method: { pick: 'Pelea va a decision', reasoning: 'Barber tiene 47% de decisiones. Grasso tiene 62%. Las dos son durables y la probabilidad de ir a los puntos es alta.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Grasso nunca fue finalizada por KO/TKO. Barber nunca fue finalizada. Ambas son durables y probablemente completen al menos 4 rounds.' },
        best_value: 'Over 3.5 rounds es la apuesta mas segura. Dos peleadoras durables con historial de peleas largas.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'La Distancia en los Primeros 5 Minutos', icon: 'Target', description: 'Si Grasso logra mantener a Barber en la punta del jab y contragolpear con precision en el R1, la dinamica de la pelea cambia completamente. Observen la distancia que Grasso intenta mantener y si Barber logra cortar el octagono para cerrar.' },
        { num: 2, title: 'La Lucha de Barber en el R2', icon: 'Shield', description: 'Barber probablemente va a probar el takedown temprano. Si los takedowns llegan y Barber logra controlar desde arriba, Grasso tendra problemas. Pero si Grasso defiende y amenaza desde abajo con sumisiones, Barber puede dudar en ir al piso.' },
        { num: 3, title: 'La Tasa de Absorcion de Grasso', icon: 'Activity', description: 'Grasso absorbe 3.95 golpes por minuto, un numero alto. Si Barber conecta con frecuencia en los rounds iniciales, la acumulacion de dano puede ser decisiva en los championship rounds. Observen si Grasso comienza a retroceder demasiado.' },
        { num: 4, title: 'El Cardio en los Championship Rounds', icon: 'Flame', description: 'Ambas ya pelearon 5 rounds, pero Grasso viene de inactividad y tiene 5 anos mas. Si la pelea esta igualada en el R4, el cardio decidira. Observen quien mantiene el volumen y quien comienza a desacelerar.' },
        { num: 5, title: 'Transiciones al Piso y Jiu-Jitsu', icon: 'Zap', description: 'Cada vez que la pelea vaya al piso, presten atencion a las transiciones de Grasso. Es peligrosa desde abajo y puede sorprender con triangulos o guillotinas. Barber necesita mantener posicion superior sin dar espacio para ataques.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LA REVANCHA', content: 'GRASSO vs BARBER II\nUFC Seattle | 28 de Marzo\nClimate Pledge Arena\n\n5 anos despues de la primera pelea\nRoles completamente invertidos\nCo-Main Event de 5 rounds', color: 'gold' },
        { slide_number: 2, title: 'GRASSO: LA EXCAMPEONA', content: '#3 Peso Mosca | 16-5-1\nExcampeona UFC (sometio a Shevchenko)\n2 derrotas consecutivas\n62% de victorias por decision\nBoxeo tecnico de elite\nJiu-jitsu peligroso\nNecesita ganar para mantenerse relevante', color: 'red' },
        { slide_number: 3, title: 'BARBER: THE FUTURE', content: '#5 Peso Mosca | 15-2-0\n7 victorias consecutivas\nSobrevivio neumonia casi fatal\nSupero pseudo-convulsion\n40% de victorias por KO/TKO\nFavorita en casas de apuestas\nViene a vengar derrota de 2021', color: 'blue' },
        { slide_number: 4, title: 'PRIMERA PELEA (2021)', content: 'UFC 258 | Febrero 2021\n\nGrasso gano por UD (29-28 x3)\nBarber volvia de cirugia de LCA\nFuera de ritmo y sin confianza\n\n5 anos despues:\nBarber evoluciono ENORMEMENTE\nGrasso perdio el titulo y viene cayendo', color: 'gold' },
        { slide_number: 5, title: 'PREDICCION', content: 'BARBER por Decision Unanime\n\nConfianza: MEDIA\n57% Barber / 40% Grasso\n\nLa presion y el volumen definen.\nPero el jiu-jitsu de Grasso\npuede cambiarlo TODO en cualquier segundo.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Grasso vs Barber II en el co-main de Seattle. En 2021, Grasso domino. En 2026, los roles se invirtieron completamente. Hilo:' },
        { num: '2/6', text: 'Grasso (16-5-1): Excampeona, sometio a Shevchenko en 2023. Pero viene de 2 derrotas seguidas, perdio el titulo y cayo ante Natalia Silva. 32 anos. No gana una pelea desde marzo de 2023.' },
        { num: '3/6', text: 'Barber (15-2-0): 7 victorias consecutivas. Sobrevivio a neumonia casi fatal y pseudo-convulsion. 27 anos. 40% de victorias por KO. La transformacion desde 2021 es impresionante.' },
        { num: '4/6', text: 'El detalle que cambia todo: Grasso absorbe 3.95 golpes por minuto. Barber presiona y tiene volumen alto. Esa combinacion puede ser muy peligrosa para Grasso en los championship rounds.' },
        { num: '5/6', text: 'Pero no olviden: Grasso SOMETIO a Shevchenko. Si la pelea va al piso, su jiu-jitsu es una amenaza constante. Barber tiene 45% de defensa de takedown, pero puede ser ella quien lleve al piso y se complique.' },
        { num: '6/6', text: 'Mi pick: Barber por decision unanime. Pero Grasso +135 tiene valor como no favorita. Over 3.5 rounds es la apuesta mas segura del co-main. Dos peleadoras durables que nunca fueron finalizadas por nocaut.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'La excampeona que sometio a Shevchenko ahora viene de DOS derrotas seguidas. Y reencuentra a la mujer que vencio en 2021, que ahora tiene SIETE victorias consecutivas. Grasso vs Barber 2 es el co-main de Seattle.' },
        { time: '10-25s', title: 'Contexto', text: 'En 2021 en el UFC 258, Grasso domino a Barber por decision. Pero Barber volvia de cirugia de rodilla. Cinco anos despues, Barber casi muere de neumonia, sobrevivio a una convulsion antes de una pelea, y AUN ASI acumulo 7 victorias seguidas. Grasso perdio el titulo y cayo dos veces.' },
        { time: '25-40s', title: 'Analisis', text: 'La clave es la distancia. Grasso necesita mantener a Barber lejos y contragolpear. Barber necesita cerrar, presionar y no dar espacio. Grasso absorbe casi 4 golpes por minuto, y contra la presion de Barber, ese numero puede explotar. Pero en el piso, Grasso es peligrosa. Sometio a la MEJOR del mundo.' },
        { time: '40-55s', title: 'Prediccion', text: 'Barber por decision unanime es mi eleccion. Presion, volumen y lucha. Pero Grasso a +135 tiene valor, porque las excampeonas no pierden la tecnica de la noche a la manana. El over 3.5 rounds esta casi garantizado.' },
        { time: '55-65s', title: 'CTA', text: 'Quien gana? Comenten Grasso o Barber. Si les gusto el analisis, siganme para el breakdown completo de toda la cartelera de Seattle.' },
      ],
      tiktok: [
        { hook: 'Esta peleadora CASI MUERE y ahora es favorita contra una excampeona del UFC.', body: 'Maycee Barber paso 9 dias en el hospital con neumonia e infeccion en 2024. Fiebre de 41 grados. No podia respirar. Casi muere. Volvio y gano. Despues tuvo una CONVULSION antes de una pelea. Volvio y gano de nuevo. Ahora enfrenta a Alexa Grasso, que era campeona y ya la vencio en 2021. Pero los roles se invirtieron.', cta: 'Comenten quien gana: GRASSO o BARBER!' },
        { hook: 'La excampeona del UFC no gana UNA SOLA PELEA desde 2023.', body: 'Alexa Grasso sometio a Shevchenko y se convirtio en campeona en marzo de 2023. Desde entonces? Empate, derrota, derrota. Perdio el titulo. Ahora enfrenta a Barber, a quien ya vencio, pero que viene con SIETE victorias seguidas. Los roles se invirtieron completamente.', cta: 'Siganme para mas analisis del UFC Seattle!' },
        { hook: 'Esta ESTADISTICA muestra por que Grasso esta en peligro.', body: 'Grasso absorbe 3.95 golpes significativos por MINUTO. Barber presiona y tiene volumen altisimo. En 5 rounds de co-main event, Grasso puede absorber mas de 100 golpes significativos. Y viene de inactividad. PERO, Grasso sometio a Shevchenko, la peleadora mas dominante de la historia. Una sumision lo cambia todo.', cta: 'A quien le apuestan? Comenten!' },
      ],
      headlines: [
        'Grasso vs Barber II: De Campeona a No Favorita en Solo 3 Anos',
        'La Transformacion de Maycee Barber: De Derrota Humillante a Favorita en la Revancha',
        'Grasso Busca Redencion en Seattle Contra la Mujer Que Casi Muere y Volvio Mas Fuerte',
        'Por Que el Jiu-Jitsu de Grasso Puede Ser la Clave Para Evitar la Tercera Derrota Seguida',
        'Barber -160 o Grasso? La Revancha Que Divide Opiniones en el Co-Main de Seattle',
        'UFC Seattle: El Co-Main Event Que Puede Definir Dos Carreras en Direcciones Opuestas',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+135',
        fighter2_odds: '-160',
        fighter1_name: 'Alexa Grasso',
        fighter2_name: 'Maycee Barber',
        source: 'Promedio de casas de apuestas (marzo 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Momentum Opuesto', stat_headline: 'GRASSO: 0V EN LAS ULTIMAS 2. BARBER: 7 VICTORIAS SEGUIDAS', contexto: 'La diferencia de momentum es dramatica. Grasso no gana desde marzo de 2023 (sumision de Shevchenko). Barber esta en la mejor racha de su carrera.', implicacao_aposta: 'Favorece fuertemente a Barber. El momentum es un factor real en peleas de alto nivel.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Tasa de Absorcion de Grasso', stat_headline: '3.95 GOLPES ABSORBIDOS POR MINUTO', contexto: 'Grasso absorbe casi 4 golpes significativos por minuto, tasa alta para el peso mosca femenino. Contra la presion y volumen de Barber, ese numero puede ser explotado.', implicacao_aposta: 'Barber por decision o TKO tardio gana valor con este dato.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Amenaza de Sumision de Grasso', stat_headline: 'SOMETIO A SHEVCHENKO POR SUMISION EN EL R4', contexto: 'Grasso tiene jiu-jitsu de altisimo nivel. Sometio a la peleadora mas dominante de la historia del peso mosca. Si la pelea va al piso, Barber esta en peligro.', implicacao_aposta: 'Grasso por sumision puede tener valor en las cuotas de metodo.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Durabilidad de Ambas', stat_headline: 'NINGUNA FUE FINALIZADA POR KO/TKO EN SU CARRERA', contexto: 'Grasso perdio 5 peleas, todas por decision o sumision. Barber perdio 2, ambas por decision. Ninguna fue noqueada.', implicacao_aposta: 'Over en los rounds esta favorecido. Finalizacion por nocaut tiene baja probabilidad.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Clock', titulo: 'Juventud y Actividad', stat_headline: 'BARBER: 27 ANOS, PELEO EN DIC/2025. GRASSO: 32 ANOS, PELEO EN MAY/2025', contexto: 'Barber es 5 anos mas joven y peleo mas recientemente. La diferencia de edad y actividad puede ser relevante en los championship rounds.', implicacao_aposta: 'Si la pelea llega al R4-R5 igualada, favorece a Barber.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-180', confianca: 'alta', edge_vs_mercado: 'Ninguna de las dos fue finalizada por KO/TKO. Ambas son durables.', raciocinio: 'Con Grasso teniendo 62% de decisiones y Barber con menton intacto, la probabilidad de ir mas alla del R3 es altisima. Puede ser la apuesta mas segura del co-main.' },
        { tipo: 'Metodo', pick: 'Va a Decision', odds: '-110', confianca: 'media', raciocinio: 'Historicamente, ambas favorecen decisiones. 62% de Grasso y 47% de Barber. La combinacion sugiere fuerte tendencia a que los jueces decidan.' },
        { tipo: 'Moneyline', pick: 'Grasso (+135)', odds: '+135', confianca: 'baixa', edge_vs_mercado: 'Excampeona con jiu-jitsu peligroso y experiencia de titulo. La linea puede estar descontando demasiado las derrotas recientes.', raciocinio: 'Grasso ya vencio a Barber, tiene jiu-jitsu superior y experiencia en 5 rounds de titulo. +135 puede tener valor leve si crees que la tecnica supera el momentum.' },
      ],
      armadilha: {
        titulo: 'Trampa: Barber por Nocaut',
        descricao: 'Barber tiene poder, pero Grasso NUNCA fue noqueada en 22 peleas profesionales. Todas las derrotas de Grasso fueron por decision o sumision. Apostar a Barber por KO/TKO es apostar contra el historial de durabilidad de Grasso.',
      },
      disclaimer: 'Analisis estadistico con fines informativos. Apueste con responsabilidad.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

const analises: Record<string, FullSingleAnalise> = {
  pt: analisePT,
  en: analiseEN,
  fr: analiseFR,
  es: analiseES,
};

export default function Page() {
  const locale = useLocale();
  return <FullAnalysisView analise={analises[locale] || analisePT} />;
}
