import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'curtis-vs-orolbai',
  evento_id: null,
  slug: 'curtis-vs-orolbai',
  titulo: 'Curtis vs Orolbai',
  subtitulo: null,
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
    predictedWinner: 'fighter2',
    predictedMethod: 'TKO R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Chris Curtis',
    record: '32-12-0, 1 NC',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Myktybek Orolbai',
    record: '15-2-1',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Meio-Medio',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'prelims',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // PrelimsAnalysisData (6 Sections)
  // ===========================
  prelims_analysis: {
    // ── Section 1: Hero ──
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      categoria_peso: 'Peso Meio-Medio',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Curtis',
        record: '32-12-0, 1 NC',
        ranking: 'N/R WW',
      },
      fighter2: {
        nome: 'Orolbai',
        record: '15-2-1',
        ranking: 'N/R WW',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 5.98,
          valueB: 3.11,
          maxVal: 8,
          format: 'decimal',
          note: 'Curtis dispara quase o dobro do volume de strikes significativos. Sua media de 5.98 SLpM e elite e deve ditar o ritmo da trocacao em pe.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 50,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao muito similar entre os dois. Curtis conecta ligeiramente mais, mas a diferenca e marginal.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.56,
          valueB: 3.25,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Curtis absorve mais strikes por minuto, reflexo do seu estilo de pressao constante e trocacao franca. Aos 38 anos, absorver tanto dano e preocupante.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 52,
          valueB: 55,
          maxVal: 100,
          format: 'percent',
          note: 'Orolbai tem uma leve vantagem defensiva. Curtis troca defesa por volume ofensivo, abordagem arriscada contra um finalizador explosivo.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.42,
          valueB: 1.90,
          maxVal: 4,
          format: 'decimal',
          note: 'Orolbai busca o takedown com muito mais frequencia, reflexo da sua base de sambo de combate. Curtis quase nao tenta quedas.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 33,
          valueB: 46,
          maxVal: 100,
          format: 'percent',
          note: 'Orolbai converte quase metade das suas tentativas de queda. Se levar Curtis ao chao, a luta muda completamente de dinamica.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 78,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
          note: 'Curtis tem defesa de queda de elite, historicamente top 3 no peso medio. Orolbai com apenas 40% e extremamente vulneravel a quedas.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '38 anos',
          fighter2: '28 anos',
          note: 'Diferenca de 10 anos. Curtis traz experiencia massiva com 44 lutas profissionais, mas Orolbai tem juventude e explosividade a seu favor.',
        },
        {
          label: 'Altura',
          fighter1: '1,78m (5\'10")',
          fighter2: '1,78m (5\'10")',
          note: 'Mesma altura, sem vantagem fisica para nenhum dos dois neste quesito.',
        },
        {
          label: 'Envergadura',
          fighter1: '190cm (75")',
          fighter2: '188cm (74")',
          note: 'Curtis com leve vantagem de 2cm de envergadura, marginal mas util no jab e na distancia.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: 'Ambos ortodoxos. Luta espelhada sem vantagem angular para nenhum dos dois.',
        },
        {
          label: 'Academia',
          fighter1: 'Xtreme Couture',
          fighter2: 'Team Alpha Male',
          note: 'Duas academias de elite, em Las Vegas e Sacramento respectivamente. Ambos com preparacao de alto nivel.',
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Curtis',
        recent_fights: [
          {
            date: 'Jan 2026',
            opponent: 'Max Griffin',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R WW',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no meio-medio com vitoria apertada por decisao dividida. Mostrou que o cardio e o volume funcionam bem nas 170 libras.',
          },
          {
            date: 'Out 2025',
            opponent: 'Roman Kopylov',
            result: 'L',
            method: 'KO R3',
            opponent_rank: 'N/R MW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Estava vencendo nos scorecards mas foi nocauteado nos segundos finais do terceiro round. Momento devastador que acelerou a mudanca de peso.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Brendan Allen',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: '#7 MW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Luta de cinco rounds contra um dos melhores do peso medio. Perdeu por decisao dividida em confronto extremamente competitivo.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Marc-Andre Barriault',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R MW',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Mais uma vitoria apertada por decisao dividida. Padrao claro de lutas que vao para os juizes.',
          },
          {
            date: 'Set 2024',
            opponent: 'Nassourdine Imavov',
            result: 'NC',
            method: 'NC R2 (choque de cabecas)',
            opponent_rank: '#9 MW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Luta contra top 10 interrompida no segundo round por choque de cabecas acidental. Resultado inconclusivo.',
          },
        ],
      },
      fighter2: {
        nome: 'Orolbai',
        recent_fights: [
          {
            date: 'Dez 2025',
            opponent: 'Jack Hermansson',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R MW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Nocaute devastador no primeiro round contra veterano que ja foi top 5 do peso medio. Performance impressionante que chamou atencao.',
          },
          {
            date: 'Jul 2025',
            opponent: 'Abubakar Musayev',
            result: 'W',
            method: 'Sub (Kimura) R1',
            opponent_rank: 'N/R WW',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizou com kimura no primeiro round, mostrando versatilidade letal no chao alem do poder de nocaute.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Rafal Rebecki',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R LW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Derrota apertada premiada com Luta da Noite. Mostrou coracao e capacidade de engajar em lutas de alto ritmo.',
          },
          {
            date: 'Out 2024',
            opponent: 'Natan Brener',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria clara por decisao unanime. Mostrou capacidade de vencer por pontos quando nao consegue a finalizacao.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Damon Medic',
            result: 'W',
            method: 'Sub (neck crank) R2',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao por neck crank no segundo round em sua estreia no UFC. Mostrou criatividade e agressividade no grappling.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 80,
          valueB: 62,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Curtis e um dos melhores strikers de volume do UFC. Com 5.98 SLpM e 50% de precisao, ele domina a trocacao em pe com combinacoes constantes. Orolbai prefere golpes explosivos mas com volume muito menor.',
        },
        {
          label: 'Grappling Ofensivo',
          valueA: 35,
          valueB: 78,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Orolbai com base de sambo de combate e letal no chao. Seis finalizacoes na carreira incluindo kimura e neck crank. Curtis quase nao busca takedowns ou submissoes.',
        },
        {
          label: 'Defesa de Takedown',
          valueA: 80,
          valueB: 40,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Curtis tem defesa de takedown de elite (78%), historicamente top 3 no peso medio. Orolbai com apenas 40% e um dos mais vulneraveis nesse quesito.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 75,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Curtis e um monstro de cardio que mantem 5.98 SLpM ao longo de tres rounds. Orolbai tende a buscar finalizacoes rapidas e pode perder gas se a luta se estender.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 55,
          valueB: 85,
          labelA: 'Bom',
          labelB: 'Excelente',
          advantage: 'fighter2',
          advantage_note: 'Orolbai tem 87% de taxa de finalizacao com 7 KOs e 6 submissoes. Pode encerrar a luta por qualquer via. Curtis vence mais por decisao e seus KOs vem do acumulo de volume.',
        },
        {
          label: 'Experiencia em Alto Nivel',
          valueA: 82,
          valueB: 50,
          labelA: 'Excelente',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Curtis tem 44 lutas profissionais e enfrentou a elite do peso medio como Allen, Imavov e Vettori. Orolbai ainda esta construindo seu curriculo com apenas 18 lutas totais.',
        },
      ],
      insight: 'Uma luta classica de estilos opostos. Curtis domina no volume de strikes, cardio e experiencia, enquanto Orolbai tem vantagens claras no grappling ofensivo e poder de finalizacao. A chave e se Orolbai consegue fechar a distancia e aplicar seu jogo de chao antes que o volume de Curtis acumule pontos nos scorecards.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
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
        submission: { count: 6, percent: 40 },
        decision: { count: 2, percent: 13 },
        total_wins: 15,
      },
      insight: 'Os numeros revelam duas filosofias completamente diferentes. Curtis tem 53% das vitorias por KO/TKO mas tambem e eficiente em decisoes (44%), mostrando versatilidade para vencer de mais de uma forma. Orolbai e quase exclusivamente um finalizador: 87% das suas vitorias terminam antes dos juizes, com equilibrio impressionante entre nocautes (47%) e submissoes (40%). Apenas 13% das vitorias de Orolbai foram por decisao, sinal claro de que ele busca encerrar a luta o mais cedo possivel.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Orolbai',
      winner_side: 'fighter2',
      predicted_method: 'TKO R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Orolbai entra como favorito nas casas de apostas (-250) e com razao. Aos 28 anos, ele esta no auge fisico enquanto Curtis, aos 38, vem sendo nocauteado com mais frequencia. A versatilidade de Orolbai para finalizar tanto em pe quanto no chao coloca Curtis em perigo constante. Embora Curtis tenha a vantagem no volume e na experiencia, o poder explosivo de Orolbai combinado com o queixo cada vez mais questionavel de Curtis deve fazer a diferenca. O cenario mais provavel: Curtis comeca bem no primeiro round com seu volume, mas Orolbai encontra a abertura no segundo round com um golpe preciso que machuca Curtis, levando ao TKO via ground and pound.',
      x_factor: {
        title: 'A mudanca de peso de Curtis',
        description: 'Curtis acabou de fazer a transicao do peso medio (185 lbs) para o meio-medio (170 lbs). Isso pode cortar parte do seu poder mas tambem torna-lo mais rapido e resistente. Se o corte de peso nao afetar seu cardio legendario, Curtis pode frustrar Orolbai e transformar a luta em uma guerra de desgaste que favorece sua experiencia de 44 lutas profissionais.',
      },
      upset_alert: {
        title: 'O veterano persistente e os scorecards',
        description: 'Curtis tem uma habilidade rara de se manter competitivo contra qualquer oponente. Se ele sobreviver aos dois primeiros rounds sem ser machucado, seu volume de quase 6 strikes por minuto pode acumular pontos suficientes para uma decisao. Orolbai nunca foi testado em uma luta de tres rounds de alto ritmo contra um striker de volume elite.',
      },
      probabilities: {
        fighter1: { nome: 'Curtis', percent: 35 },
        fighter2: { nome: 'Orolbai', percent: 63 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
