import type { FullSingleAnalise } from '@/types/analise';

export const curtisOrolbaiAnalise: FullSingleAnalise = {
  id: 'curtis-orolbai-ufn-mar-14',
  evento_id: null,
  slug: 'curtis-orolbai-ufn-mar-14',
  titulo: 'Curtis vs Orolbai: Experiencia Contra Juventude Explosiva',
  subtitulo: 'O Action Man enfrenta o prospecto quirguiz numa luta de estilos opostos',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'TKO ou Decision', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Chris Curtis', record: '32-12-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Myktybek Orolbai', record: '15-2-1', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Meio-Medio',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas',
      categoria_peso: 'Peso Meio-Medio (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O VETERANO DE ACAO CONTRA A TEMPESTADE DO QUIRGUISTAO',
      tagline_sub: '38 anos e 44 lutas profissionais contra 27 anos e fome de subir no ranking.',
      fighter1: {
        nome_completo: 'Chris "The Action Man" Curtis',
        apelido: 'The Action Man',
        sobrenome: 'Curtis',
        record: '32-12-0',
        ranking: 'Sem ranking WW',
        info_extra: 'West Linn, Oregon | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Myktybek Orolbai',
        apelido: '',
        sobrenome: 'Orolbai',
        record: '15-2-1',
        ranking: 'Sem ranking WW',
        info_extra: 'Osh, Quirguistao | 27 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Action Man Busca Redemacao</h3>
        <p><strong class="text-ufc-red">Chris Curtis</strong> e um dos lutadores mais entretidos do UFC — e um dos mais frustrantes de assistir. Com 32 vitorias e 17 nocautes na carreira, o "Action Man" SEMPRE entrega acao. Mas apos uma carreira inteira no peso medio onde chegou a enfrentar Brendan Allen e Kelvin Gastelum, Curtis desceu para os meio-medios em 2025. A vitoria apertada por decisao dividida sobre Max Griffin mostrou que a mudanca de peso pode funcionar, mas tambem revelou que Curtis nao dominou como esperado. Aos 38 anos, cada luta e uma prova de que ainda pertence ao UFC.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Ascensao do Quirguiz</h3>
        <p><strong class="text-blue-400">Myktybek Orolbai</strong> e tudo o que Curtis nao e: jovem, em ascensao e com um teto ainda desconhecido. Aos 27 anos, o quirguiz treina com Urijah Faber no Team Alpha Male e tem mostrado uma evolucao impressionante. O KO sobre Jack Hermansson — um veterano de 18 lutas no UFC — em novembro foi uma declaracao de intencoes. Antes disso, a submissao de Tofiq Musayev por kimura mostrou versatilidade. A unica derrota no UFC foi uma decisao dividida para Rebecki no UFC 308 — uma luta apertada que muitos acharam que Orolbai venceu.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Geracoes em Colisao</h3>
        <p>Essa luta e um classico de MMA: o veterano que ja viu tudo contra o prospecto que nao tem medo de nada. <strong class="text-ufc-red">Curtis</strong> traz experiencia de 44 lutas profissionais e poder nas maos. <strong class="text-blue-400">Orolbai</strong> traz juventude, versatilidade e momentum de duas finalizacoes seguidas contra oponentes de qualidade. O APEX menor pode favorecer Curtis, que gosta de pressionar e trocar, mas o wrestling e o grappling de Orolbai podem neutralizar isso.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking — buscando se estabelecer nos 170', fighter2: 'Sem ranking — em ascensao rapida' },
        { dimensao: 'Objetivo', fighter1: 'Provar que a mudanca para 170 funciona', fighter2: 'Continuar subindo e entrar no top 15' },
        { dimensao: 'Narrativa', fighter1: 'Veterano de 38 anos lutando pela relevancia', fighter2: 'Prospecto de 27 anos com momentum imparavel' },
        { dimensao: 'Risco', fighter1: 'Perder pode significar o fim no UFC', fighter2: 'Perder freia a ascensao e volta a estaca zero' },
        { dimensao: 'Recompensa', fighter1: 'Vitoria contra prospect valida a mudanca de peso', fighter2: 'Vitoria contra veterano abre portas para ranqueados' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O ACTION MAN AINDA VIVE',
          subtitulo: 'Curtis prova que experiencia e poder superam juventude nos meio-medios.',
          consequencias: [
            { tag: 'VALIDACAO', texto: 'Confirma que a mudanca de peso medio para meio-medio era a decisao certa.' },
            { tag: 'ROSTER', texto: 'Garante permanencia confortavel no UFC e possivelmente um oponente ranqueado.' },
            { tag: 'CONFIANCA', texto: 'Vitoria sobre prospecto em ascensao mostra que a experiencia ainda e arma poderosa.' },
          ],
          proxima_luta: 'Oponente na faixa #12-15 dos meio-medios',
        },
        fighter2_vence: {
          titulo: 'A TEMPESTADE QUIRGUIZ CONTINUA',
          subtitulo: 'Orolbai derrota mais um veterano e se aproxima do top 15.',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Tres finalizacoes seguidas contra oponentes cada vez melhores. Momentum imparavel.' },
            { tag: 'RANKING', texto: 'Se aproxima do top 15 dos meio-medios e comeca a ser visto como ameaca real.' },
            { tag: 'VERSATILIDADE', texto: 'KO sobre Hermansson, kimura sobre Musayev, e agora vitoria sobre Curtis. Arsenal completo.' },
          ],
          proxima_luta: 'Oponente ranqueado #12-15 ou veterano estabelecido nos 170',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Chris Curtis',
        color: 'red',
        recent_fights: [
          { date: 'Jul 2025', opponent: 'Max Griffin', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia nos meio-medios. Vitoria apertada por SD. Mostrou que pode competir nos 170 mas nao dominou.' },
          { date: 'Jan 2025', opponent: 'Roman Kopylov', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no terceiro round. Ultima luta no peso medio antes de descer para 170.' },
          { date: 'Jan 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mais uma decisao dividida. Curtis consistentemente em lutas apertadas.' },
          { date: 'Abr 2024', opponent: 'Brendan Allen', result: 'L', method: 'Decisao Dividida', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Perdeu decisao dividida para top 10 em luta de 5 rounds. Competitivo contra elite.' },
          { date: 'Abr 2023', opponent: 'Kelvin Gastelum', result: 'L', method: 'Decisao Unanime', opponent_rank: '#11 MW', quality_score: 3, quality_label: 'Bom', note: 'Perdeu para ex-desafiante ao titulo. Luta menos competitiva do que as decisoes divididas.' },
        ],
        momentum_score: 4,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'stable',
        momentum_note: 'Curtis esta em fase de transicao. Apos construir uma carreira no peso medio com lutas contra a elite (Allen, Gastelum), desceu para os meio-medios onde venceu Griffin por decisao dividida. O volume absurdo de 5.98 SLpM e impressionante mas a defesa de 54% e preocupante. Aos 38 anos, a questao e se o corpo aguenta o ritmo que Curtis impoe.',
      },
      fighter2: {
        nome: 'Myktybek Orolbai',
        color: 'blue',
        recent_fights: [
          { date: 'Nov 2025', opponent: 'Jack Hermansson', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'KO devastador no primeiro round contra veterano de 18 lutas no UFC. Declaracao de intencoes.' },
          { date: 'Jun 2025', opponent: 'Tofiq Musayev', result: 'W', method: 'Sub R1 (kimura)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizou com kimura no primeiro round. Versatilidade impressionante: KO e submissao.' },
          { date: 'Out 2024', opponent: 'Mateusz Rebecki', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota no UFC. Decisao dividida controversa que muitos acharam que Orolbai venceu.' },
          { date: 'Mai 2024', opponent: 'Elves Brener', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao apesar de ponto descontado. Mostrou disciplina e capacidade de adaptacao.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Orolbai vem de duas finalizacoes consecutivas no primeiro round — KO sobre Hermansson e kimura sobre Musayev. Aos 27 anos, treinando com Urijah Faber no Team Alpha Male, o quirguiz esta em clara ascensao. A versatilidade e o fator mais impressionante: pode vencer por KO, submissao ou decisao. A unica preocupacao e a falta de experiencia em lutas longas de 3 rounds contra veteranos resistentes.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Curtis',
        media_oponentes: 2.6,
        media_oponentes_label: 'Bom',
        aproveitamento: '2W-3L (40%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Orolbai',
        media_oponentes: 2.0,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-1L (75%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Curtis e Orolbai nao tem oponentes em comum no UFC. Curtis lutou toda sua carreira no peso medio antes de descer para 170, enquanto Orolbai transitou entre lightweight e welterweight. A falta de comparacao direta torna a analise dependente de estatisticas e perfis de estilo.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.98, valueB: 3.50, maxVal: 8, format: 'decimal', note: 'Curtis com volume ABSURDO. Quase 6 strikes por minuto. Um dos maiores volumes do roster.' },
        { label: 'Precisao de Strikes (%)', valueA: 50, valueB: 52, maxVal: 100, format: 'percent', note: 'Valores muito proximos. Ambos acertam cerca de metade dos golpes.' },
        { label: 'Strikes Absorvidos/Min', valueA: 6.19, valueB: 3.20, maxVal: 8, format: 'decimal', reverseWinner: true, note: 'Curtis absorve MUITO dano. 6.19 SApM e uma taxa extremamente alta. Orolbai absorve metade disso.' },
        { label: 'Defesa de Strikes (%)', valueA: 54, valueB: 58, maxVal: 100, format: 'percent', note: 'Orolbai levemente mais eficiente na defesa. Ambos na faixa media.' },
        { label: 'Takedowns por 15 Min', valueA: 0.00, valueB: 2.85, maxVal: 5, format: 'decimal', note: 'Curtis NUNCA tentou um takedown no UFC. Orolbai e ativo com quase 3 por 15 min.' },
        { label: 'Precisao de Takedown (%)', valueA: 0, valueB: 40, maxVal: 100, format: 'percent', note: 'Curtis e zero em takedowns. Orolbai converte 40% das tentativas.' },
        { label: 'Defesa de Takedown (%)', valueA: 70, valueB: 65, maxVal: 100, format: 'percent', note: 'Ambos com defesa similar. Curtis levemente melhor.' },
        { label: 'Submissoes por 15 Min', valueA: 0.00, valueB: 0.30, maxVal: 2, format: 'decimal', note: 'Orolbai tem finalizacoes (kimura sobre Musayev). Curtis nunca busca submissoes.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '27 anos', note: '11 ANOS de diferenca — gap geracional significativo' },
        { label: 'Altura', fighter1: '1.78m (5\'10")', fighter2: '1.78m (5\'10")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '192cm (75.5")', fighter2: '188cm (74")', note: 'Curtis com 1.5 polegadas a mais — diferenca minima' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Ambos ortodoxos' },
        { label: 'Academia', fighter1: 'Gracie Barra, Oregon', fighter2: 'Team Alpha Male, Sacramento', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Volume de Striking', valueA: 85, valueB: 58, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Curtis tem um dos maiores volumes do UFC com 5.98 SLpM. Orolbai e mais conservador com 3.50. O ritmo de Curtis e asfixiante e pode sobrecarregar oponentes.' },
        { label: 'Poder de Nocaute', valueA: 68, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Orolbai mostrou poder devastador no KO sobre Hermansson. Curtis tem 17 KOs na carreira mas muitos foram fora do UFC. No nivel do UFC, o poder de Orolbai e mais demonstrado recentemente.' },
        { label: 'Grappling / Wrestling', valueA: 30, valueB: 75, labelA: 'Ruim', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Orolbai tem wrestling sólido (2.85 TD/15min) e submissoes perigosas (kimura sobre Musayev). Curtis NUNCA tentou um takedown no UFC e tem zero jogo de chao ofensivo.' },
        { label: 'Defesa / Durabilidade', valueA: 42, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Curtis absorve 6.19 strikes por minuto — uma taxa absurdamente alta. Orolbai absorve metade disso. Curtis depende da durabilidade do queixo, que pode falhar a qualquer momento.' },
        { label: 'Cardio / Resistencia', valueA: 62, valueB: 68, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Orolbai tem 11 anos a menos e treina em altitude no Team Alpha Male. Curtis mantem ritmo alto mas absorve dano demais, o que drena energia. A juventude favorece Orolbai.' },
        { label: 'Versatilidade Tatica', valueA: 40, valueB: 78, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Curtis e unidimensional: fica em pe e troca. Orolbai pode vencer por KO, submissao, decisao, takedowns. A versatilidade e talvez sua maior arma.' },
      ],
      insight: 'O perfil e claro: <strong class="text-ufc-red">Curtis</strong> tem uma unica arma excepcional — o volume absurdo de striking. Mas <strong class="text-blue-400">Orolbai</strong> e superior em quase todas as outras categorias: grappling, versatilidade, defesa e poder recente. A questao e se o volume implacavel de Curtis pode compensar todas essas desvantagens. Historicamente, lutadores unidimensionais como Curtis encontram dificuldade contra oponentes versateis como Orolbai.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Curtis',
        ko_tko: { count: 17, percent: 53 },
        submission: { count: 1, percent: 3 },
        decision: { count: 14, percent: 44 },
        total_wins: 32,
      },
      fighter2: {
        nome: 'Orolbai',
        ko_tko: { count: 7, percent: 47 },
        submission: { count: 5, percent: 33 },
        decision: { count: 3, percent: 20 },
        total_wins: 15,
      },
      insight: 'Curtis e dividido entre KOs (53%) e decisoes (44%), com apenas 1 submissao na carreira inteira. Orolbai tem uma distribuicao mais versátil: 47% KO, 33% finalizacao, 20% decisao. A falta de jogo de chao de Curtis (3% sub) e preocupante contra um Orolbai que tem 5 submissoes e wrestling ativo.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Choque de Estilos',
          description: 'O primeiro round sera caótico. Curtis vai pressionar com volume implacavel — 6 strikes por minuto — tentando sobrecarregar Orolbai. Orolbai vai buscar timing para contra-ataques e takedowns. Ambos tem poder para resolver no R1: Curtis com as maos e Orolbai com KO ou takedown para submissao. Quem encontrar o timing primeiro leva vantagem.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'VANTAGEM OROLBAI',
          color: 'green',
          title: 'O Dano Acumulado',
          description: 'No segundo round, o dano que Curtis absorve (6.19 SApM) comeca a aparecer. Orolbai, mais fresco e com menos dano acumulado, pode comecar a encontrar aberturas tanto em pe quanto para takedowns. A versatilidade de Orolbai se torna mais perigosa conforme Curtis desacelera microscopicamente.',
        },
        {
          rounds: 'R3',
          danger_level: 8,
          danger_label: 'VANTAGEM OROLBAI',
          color: 'green',
          title: 'Juventude Prevalece',
          description: 'O terceiro round e onde a diferenca de 11 anos de idade pode ser fatal. Curtis perdeu para Kopylov no R3 e para Allen no R5. Orolbai e 11 anos mais jovem e treina no Team Alpha Male. Se a luta chegar aqui com Orolbai na luta, a vantagem atletica e de frescor e decisiva.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: 'Volume absurdo de 5.98 SLpM', fighter: 'Curtis', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Curtis lanca quase 6 strikes significativos por minuto — um dos maiores volumes de TODA a organizacao. Esse ritmo pode sobrecarregar oponentes que nao estao preparados para a pressao constante. E a principal arma de Curtis e o que o torna tao entretido de assistir.' },
        { icon: 'AlertTriangle', title: 'Absorve 6.19 strikes por minuto', fighter: 'Curtis', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'O outro lado do volume: Curtis ABSORVE dano a uma taxa alarmante. 6.19 SApM e uma das taxas mais altas do roster. Isso significa que ele esta constantemente em perigo de ser nocauteado, especialmente contra um Orolbai que tem poder demonstrado.' },
        { icon: 'TrendingUp', title: 'Momentum de duas finalizacoes consecutivas no R1', fighter: 'Orolbai', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Orolbai vem de KO sobre Hermansson e kimura sobre Musayev — ambos no primeiro round. O quirguiz esta em estado de flow, com confianca maxima. O momentum e um fator psicologico poderoso em MMA.' },
        { icon: 'Clock', title: 'Diferenca de 11 anos de idade', fighter: 'Orolbai', risk_level: 'POSITIVO', risk_color: 'green', description: '27 anos contra 38. A diferenca de idade e significativa em termos de atletismo, recuperacao e velocidade de reacao. Curtis esta na fase final da carreira enquanto Orolbai esta no auge atletico.' },
        { icon: 'Shield', title: 'Nenhum takedown tentado no UFC', fighter: 'Curtis', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Curtis tem ZERO tentativas de takedown no UFC. Isso significa que se Orolbai levar a luta para o chao, Curtis nao tem armas ofensivas para reverter. E uma dimensao completamente ausente do jogo de Curtis.' },
        { icon: 'Brain', title: 'Experiencia de 44 lutas profissionais', fighter: 'Curtis', risk_level: 'POSITIVO', risk_color: 'green', description: 'Curtis tem quase o triplo de lutas profissionais que Orolbai (44 vs 18). Essa experiencia se manifesta em calma sob pressao, adaptacao tatica e conhecimento do que funciona em diferentes situacoes.' },
        { icon: 'Target', title: 'Treinamento no Team Alpha Male', fighter: 'Orolbai', risk_level: 'POSITIVO', risk_color: 'green', description: 'Orolbai treina com Urijah Faber no Team Alpha Male em Sacramento, um dos melhores campos de treino do mundo. O nivel dos parceiros de treino e a qualidade do coaching contribuem para sua evolucao rapida.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Curtis',
        total_probability: 38,
        scenarios: [
          { name: 'A Torrente de Golpes', probability: 18, method: 'Decisao Dividida', description: 'Curtis pressiona com volume implacavel de 6 SLpM, nao dando tempo para Orolbai pensar ou buscar takedowns. A pressao constante acumula pontos nos cartoes e Curtis vence numa decisao apertada, como fez contra Griffin e Barriault.' },
          { name: 'O Nocaute do Action Man', probability: 12, method: 'KO/TKO R1-R2', description: 'Curtis encontra o timing no meio da troca e conecta um golpe de poder que surpreende Orolbai. O volume alto de Curtis cria oportunidades para golpes limpos, e seus 17 KOs na carreira mostram que tem poder real quando conecta limpo.' },
          { name: 'Veterano Tatico', probability: 8, method: 'Decisao Unanime', description: 'Curtis usa a experiencia de 44 lutas para controlar o ritmo, defender takedowns (70% TD def) e pontuar consistentemente. Mantem Orolbai reagindo em vez de agindo.' },
        ],
      },
      fighter2: {
        nome: 'Orolbai',
        total_probability: 59,
        scenarios: [
          { name: 'Takedown e Destruicao', probability: 22, method: 'TKO R2-R3 ou Sub', description: 'Orolbai usa o wrestling (2.85 TD/15min) para derrubar Curtis, que nunca tentou um takedown no UFC. No chao, busca posicao dominante para ground and pound ou submissao. O mesmo padrao que funcionou contra Musayev.' },
          { name: 'O Contra-Ataque Preciso', probability: 18, method: 'KO/TKO R1-R2', description: 'Curtis absorve 6.19 SApM. Orolbai e paciente e espera as aberturas que o volume alto de Curtis inevitavelmente cria. Um contra-ataque limpo com poder pode terminar a luta, como fez com Hermansson.' },
          { name: 'Dominio Atletico', probability: 12, method: 'Decisao Unanime', description: 'Orolbai usa a vantagem atletica dos 27 anos para controlar o ritmo com uma combinacao de striking e wrestling. A versatilidade sobrecarrega Curtis, que nao tem respostas para todas as dimensoes do jogo de Orolbai.' },
          { name: 'Kimura ou Estrangulamento', probability: 7, method: 'Sub R2-R3', description: 'Orolbai leva a luta para o chao nos rounds finais quando Curtis esta cansado e busca uma submissao. A kimura que usou contra Musayev e uma arma real contra um Curtis sem jogo de chao.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Myktybek Orolbai',
      winner_side: 'fighter2',
      predicted_method: 'TKO R2 ou Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Orolbai tem vantagens em quase todas as areas alem de volume de striking: grappling, versatilidade, defesa, juventude e momentum. Curtis absorve dano a uma taxa alarmante (6.19 SApM), o que cria oportunidades constantes para Orolbai conectar algo limpo ou derrubar. A falta de jogo de chao de Curtis (zero takedowns no UFC) e uma vulnerabilidade critica contra um Orolbai com wrestling e submissoes ativas. A diferenca de 11 anos de idade e o fator final: se a luta for longa, a juventude prevalece.',
      x_factor: {
        title: 'A Ausencia Total de Ground Game de Curtis',
        description: 'Curtis tem ZERO takedowns tentados em todo o UFC. Em uma era onde versatilidade e essencial, ser puramente um striker e uma limitacao fatal contra oponentes completos. Orolbai tem wrestling, submissoes e striking — se decidir levar a luta para o chao, Curtis nao tem armas para reverter. Esse e o fator que pode transformar uma luta competitiva em dominio unilateral.',
      },
      upset_alert: {
        title: 'Upset Alert: Curtis por KO de Volume',
        description: 'O volume de 5.98 SLpM de Curtis e REAL e pode sobrecarregar Orolbai. Se Curtis pressionar implacavelmente e nao deixar Orolbai respirar para buscar takedowns, a torrente de golpes pode acumular dano suficiente para uma parada. Curtis nao deve ser subestimado — o apelido "Action Man" existe por um motivo.',
      },
      probabilities: {
        fighter1: { nome: 'Curtis', percent: 38 },
        fighter2: { nome: 'Orolbai', percent: 59 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Orolbai ML', reasoning: 'Vantagens em grappling, versatilidade, juventude e momentum. O preco como favorito moderado e justo dadas as diferencas de habilidade.' },
        method: { pick: 'Orolbai por TKO/KO', reasoning: 'Curtis absorve 6.19 SApM. Orolbai mostrou poder contra Hermansson. A combinacao de alto dano absorvido e poder do oponente e receita para TKO.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Orolbai finalizou as ultimas duas lutas no R1. Curtis foi nocauteado por Kopylov no R3. Alta probabilidade de finalizacao antes do round final.' },
        best_value: 'Orolbai por TKO/KO — Curtis absorve dano demais contra um Orolbai com poder comprovado.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Volume de Curtis nos Primeiros 2 Minutos', icon: 'Zap', description: 'Curtis vai tentar estabelecer seu ritmo implacavel desde o primeiro segundo. Se ele conseguir manter 6+ SLpM e nao deixar Orolbai respirar, e sinal de que o gameplan esta funcionando. Se Orolbai conseguir cortar o ritmo com takedowns ou clinch, Curtis perde sua maior arma.' },
        { num: 2, title: 'Tentativas de Takedown de Orolbai', icon: 'Shield', description: 'Orolbai tenta quase 3 takedowns por 15 minutos. Curtis defende 70%. Se Orolbai conseguir derrubar Curtis nos primeiros 5 minutos, a dinamica muda completamente porque Curtis tem zero jogo ofensivo no chao. Se Curtis defender tudo, Orolbai precisa vencer em pe.' },
        { num: 3, title: 'O Dano Absorvido por Curtis', icon: 'AlertTriangle', description: 'Preste atencao se Curtis esta absorvendo golpes limpos. Com 6.19 SApM, ele esta constantemente em perigo. Se Orolbai comecar a conectar contra-ataques precisos no meio do volume de Curtis, o nocaute pode vir a qualquer momento.' },
        { num: 4, title: 'A Versatilidade de Orolbai', icon: 'Target', description: 'Observe se Orolbai esta misturando striking, takedowns e clinch ou se esta sendo unidimensional. Quando Orolbai usa todas as armas, e praticamente impossivel de parar. Se ele ficar apenas em pe trocando, Curtis tem mais chances.' },
        { num: 5, title: 'O Ritmo no Segundo Round', icon: 'Activity', description: 'O segundo round e o round decisivo. Se Curtis mantem o volume alto e Orolbai ainda esta reagindo, o Action Man esta no controle. Se Orolbai comecar a impor takedowns e controle, a juventude e versatilidade estao prevalecendo. O R2 e o termometro da luta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'CURTIS VS OROLBAI', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Meio-Medio (170 lbs)\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'CHRIS CURTIS', content: '32-12-0 | The Action Man\n\n5.98 strikes por minuto (!)\nMas absorve 6.19 SApM\n17 KOs na carreira\n0 takedowns no UFC\n38 anos', color: 'red' },
        { slide_number: 3, title: 'MYKTYBEK OROLBAI', content: '15-2-1 | Team Alpha Male\n\nKO sobre Hermansson\nKimura sobre Musayev\n2.85 takedowns por 15 min\n27 anos — 11 anos mais jovem', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Orolbai por TKO ou Decisao\nConfianca: MEDIA\n\n59% Orolbai | 38% Curtis | 3% Empate\n\nX-Factor: Curtis tem ZERO ground game', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Curtis vs Orolbai sabado. O cara que lanca QUASE 6 STRIKES POR MINUTO contra o quirguiz que vem de 2 finalizacoes no R1. Volume vs Versatilidade.' },
        { num: '2/5', text: 'Chris Curtis: 5.98 SLpM. Um dos maiores volumes do UFC. Mas tambem absorve 6.19 SApM — constantemente em perigo de ser nocauteado. O Action Man e tao entretido quanto arriscado.' },
        { num: '3/5', text: 'Myktybek Orolbai: KO sobre Hermansson + Kimura sobre Musayev. 27 anos, Team Alpha Male. O cara pode vencer de QUALQUER forma. E Curtis nunca tentou um takedown no UFC. ZERO.' },
        { num: '4/5', text: 'O numero mais preocupante pra Curtis: 0. Zero takedowns tentados no UFC. Contra um Orolbai com 2.85 TD/15min e submissoes ativas, nao ter ground game e uma sentenca.' },
        { num: '5/5', text: 'Previsao: Orolbai vence. 59-38. TKO ou decisao. A versatilidade e juventude (11 anos mais novo) sao demais. Mas NAO subestime o volume de Curtis. 6 strikes por minuto afogam qualquer um.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O lutador que lanca QUASE 6 STRIKES POR MINUTO contra o cara que acabou Hermansson e Musayev no primeiro round. Curtis vs Orolbai, sabado, acao GARANTIDA."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Curtis: 32 vitorias, 17 KOs, 5.98 strikes por minuto. Parece incrivel, certo? Mas ele ABSORVE 6.19. E nunca tentou um takedown no UFC. ZERO. Orolbai: 15-2-1, KO e kimura nas ultimas duas, treina no Team Alpha Male aos 27 anos."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Curtis e um Caminhao desgovernado: vai pra frente, lanca tudo, mas absorve dano igual. Orolbai e cirurgico: encontra o momento certo e finaliza. Volume insano contra versatilidade total. Quem impoe o estilo vence."' },
        { time: '40-50s', title: 'A Chave', text: '"Se Orolbai levar pro chao, Curtis nao tem NADA. Zero takedowns, zero submissoes, zero jogo ofensivo no chao. E o calcanhar de Aquiles mais claro do card inteiro."' },
        { time: '50-60s', title: 'CTA', text: '"Previsao: Orolbai por TKO ou decisao. Mas o primeiro round vai ser CAOS puro. Comenta: volume de Curtis ou versatilidade de Orolbai?"' },
      ],
      tiktok: [
        { hook: 'O cara que NUNCA tentou um takedown no UFC. Em 10 LUTAS.', body: 'Chris Curtis tem ZERO takedowns no UFC inteiro. Contra Orolbai, que tem wrestling, kimura e KO power, isso e um problema ENORME. Se a luta for pro chao, Curtis nao tem ferramentas. Nenhuma.', cta: 'Quem vence? Comenta VOLUME ou VERSATILIDADE.' },
        { hook: '6 STRIKES POR MINUTO. Mas tambem ABSORVE 6 strikes por minuto.', body: 'Curtis lanca 5.98 SLpM. E absorve 6.19. Ele vive no fogo cruzado. Contra Orolbai que tem poder de KO e wrestling, absorver tanto dano e receita pra desastre. Mas o volume pode sobrecarregar qualquer um.', cta: 'Segue pra analise completa do card de sabado.' },
        { hook: 'Duas finalizacoes no PRIMEIRO ROUND consecutivas. O quirguiz ta ASSUSTANDO.', body: 'Myktybek Orolbai: KO sobre Hermansson + kimura sobre Musayev. Ambas no R1. 27 anos, Team Alpha Male. Agora enfrenta Curtis de 38 anos que so sabe trocar em pe. A versatilidade contra a unidimensionalidade.', cta: 'Salva e assiste sabado depois da luta.' },
      ],
      headlines: [
        'Curtis vs Orolbai: Volume Insano Contra Versatilidade Total',
        'Zero Takedowns: A Vulnerabilidade que Pode Custar Caro a Curtis',
        'O Quirguiz do Team Alpha Male Contra o Action Man de 38 Anos',
        'Orolbai Vem de Duas Finalizacoes no R1 — Curtis Consegue Resistir?',
        '11 Anos de Diferenca: Juventude ou Experiencia no APEX?',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+160',
        fighter2_odds: '-190',
        fighter1_name: 'Curtis',
        fighter2_name: 'Orolbai',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Shield', titulo: 'Ausencia Total de Ground Game', stat_headline: 'CURTIS COM ZERO TAKEDOWNS EM 10 LUTAS NO UFC', contexto: 'Curtis nunca tentou derrubar um oponente no UFC. Contra um Orolbai com wrestling ativo (2.85 TD/15min) e submissoes perigosas, essa limitacao e critica. Se a luta for para o chao, Curtis nao tem ferramentas ofensivas.', implicacao_aposta: 'Favorece Orolbai em qualquer mercado. A unidimensionalidade de Curtis e uma vulnerabilidade exploravel. Cria valor em Orolbai por finalizacao.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Taxa Absurda de Dano Absorvido', stat_headline: 'CURTIS ABSORVE 6.19 STRIKES SIGNIFICATIVOS POR MINUTO', contexto: 'Essa e uma das taxas mais altas de todo o roster do UFC. Curtis vive absorvendo dano, o que significa que esta constantemente em perigo de ser nocauteado. Contra Orolbai, que tem poder demonstrado, cada troca e arriscada.', implicacao_aposta: 'Cria valor em Orolbai por KO/TKO. A matematica e simples: quem absorve muito dano eventualmente e parado. Under 2.5 rounds tambem ganha valor.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'TrendingUp', titulo: 'Momentum de Orolbai', stat_headline: 'DUAS FINALIZACOES NO R1 CONSECUTIVAS (KO + KIMURA)', contexto: 'Orolbai esta em estado de flow. KO sobre Hermansson e kimura sobre Musayev mostram versatilidade e confianca maxima. O momentum psicologico e real em MMA.', implicacao_aposta: 'Reforça narrativa de Orolbai como favorito. Pode criar valor em Orolbai por finalizacao no R1 se as odds forem atrativas.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Volume de Strikes de Curtis', stat_headline: '5.98 SLPM — UM DOS MAIORES VOLUMES DE TODO O UFC', contexto: 'O volume de Curtis e sua principal arma e nao deve ser subestimado. Esse ritmo asfixiante pode sobrecarregar oponentes e acumular pontos rapidamente. Se Curtis impor o ritmo, pode vencer por decisao.', implicacao_aposta: 'Cria valor em Curtis como underdog se as odds forem generosas (+160 ou mais). O volume e uma arma real que pode surpreender.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Clock', titulo: 'Gap Geracional de 11 Anos', stat_headline: '38 ANOS VS 27 ANOS — DIFERENCA DE MAIS DE UMA DECADA', contexto: 'A diferenca de idade se manifesta em velocidade, recuperacao e atletismo. Curtis esta na fase final da carreira enquanto Orolbai esta no auge fisico. Em rounds tardios, a juventude e uma vantagem enorme.', implicacao_aposta: 'Favorece Orolbai em lutas que vao alem do primeiro round. Se a luta se estender, a juventude de Orolbai se torna cada vez mais vantajosa.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Orolbai ML', odds: '-190 (estimado)', confianca: 'media', edge_vs_mercado: 'O preco reflete as vantagens reais de Orolbai. A versatilidade e juventude sao superiores.', raciocinio: 'Orolbai tem vantagens em grappling, versatilidade, defesa e juventude. O unico ponto forte de Curtis (volume) pode ser neutralizado com takedowns e clinch.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '+110 (estimado)', confianca: 'media', edge_vs_mercado: 'Orolbai finalizou as 2 ultimas no R1. Curtis absorve dano demais. Alta probabilidade de finalizacao antes do R3.', raciocinio: 'A combinacao de Curtis absorvendo 6.19 SApM e Orolbai com poder de KO e submissoes sugere que a luta termina antes do terceiro round.' },
        { tipo: 'Metodo', pick: 'Orolbai por KO/TKO', odds: '+130 (estimado)', confianca: 'media', raciocinio: 'Curtis absorve muito dano e Orolbai tem poder demonstrado. O KO sobre Hermansson mostrou que Orolbai pode parar qualquer um no primeiro ou segundo round.' },
        { tipo: 'Metodo', pick: 'Curtis por Decisao', odds: '+350 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Aposta de risco. Se Curtis conseguir defender takedowns e manter a luta em pe por 3 rounds, o volume pode levar a decisao.', raciocinio: 'Curtis venceu Griffin por decisao dividida. Se reproduzir esse gameplan e defender takedowns, pode surpreender nos cartoes.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Curtis por KO/TKO',
        descricao: 'Apostar em Curtis por KO pode parecer tentador dado os 17 KOs na carreira, mas a maioria veio fora do UFC. No nivel do UFC, Curtis perdeu por KO mais vezes do que nocauteou recentemente. Contra Orolbai, que tem boa defesa de strikes e pode levar a luta para o chao, Curtis dificilmente vai conseguir o nocaute.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
