'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

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

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  return <FullAnalysisView analise={analisePT} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
