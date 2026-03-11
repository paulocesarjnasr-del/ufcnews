import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'lacerda-vs-sosa',
  evento_id: null,
  slug: 'lacerda-vs-sosa',
  titulo: 'Lacerda vs Sosa',
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
    nome: 'Luan Lacerda',
    record: '13-3-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Hecher Sosa',
    record: '14-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Galo',
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
      categoria_peso: 'Peso Galo',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Lacerda',
        record: '13-3-0',
      },
      fighter2: {
        nome: 'Sosa',
        record: '14-1-0',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.02,
          valueB: 0,
          maxVal: 7,
          format: 'decimal',
          note: 'Lacerda produz volume alto de strikes para um especialista em grappling. Sosa faz sua estreia no UFC e nao possui dados oficiais do UFC Stats.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 46,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Lacerda acerta 46% dos golpes significativos, taxa moderada. Sem dados UFC de Sosa para comparacao direta.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 5.79,
          valueB: 0,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Lacerda absorve volume preocupante de golpes (5.79/min). Numero muito elevado para qualquer divisao, e seu principal ponto de vulnerabilidade.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 46,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Apenas 46% de defesa de strikes para Lacerda. Combinado com o alto volume absorvido, indica que ele aceita trocacao aberta para criar scrambles.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 41,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Lacerda converte 41% dos takedowns, taxa decente que reflete seu background de grappling e a necessidade de levar a luta ao chao.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 66,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Lacerda defende 66% das tentativas de queda. Valor razoavel, mas pode ser testado se Sosa decidir trabalhar no clinch.',
        },
        {
          label: 'Tentativas de Sub/15 Min',
          valueA: 0.9,
          valueB: 0,
          maxVal: 3,
          format: 'decimal',
          note: 'Lacerda busca finalizacoes ativamente, coerente com seu perfil de 85% de vitorias por submissao. Cada ida ao chao e perigosa.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '33 anos',
          fighter2: '30 anos',
          note: 'Sosa tres anos mais jovem, ambos em fase produtiva da carreira',
        },
        {
          label: 'Altura',
          fighter1: '1,70m (5\'7")',
          fighter2: '1,75m (5\'9")',
          note: 'Sosa com duas polegadas a mais de altura, pode usar o jab para manter distancia',
        },
        {
          label: 'Envergadura',
          fighter1: '180cm (71")',
          fighter2: '178cm (70")',
          note: 'Lacerda com uma polegada a mais de envergadura apesar de ser mais baixo, diferencial util no clinch',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: 'Ambos ortodoxos, sem vantagem angular de stance',
        },
        {
          label: 'Academia',
          fighter1: 'Nova Uniao (Rio de Janeiro)',
          fighter2: 'King Sanchez MMA (Lanzarote)',
          note: 'Nova Uniao e uma das academias mais tradicionais do Brasil, fabrica de faixas pretas e ex-campeoes do UFC',
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Lacerda',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Thiago Oliveira',
            result: 'W',
            method: 'Sub Armbar R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Armbar classico do fundo da guarda no segundo round. Vitoria que interrompeu sequencia de duas derrotas consecutivas no UFC.',
          },
          {
            date: 'Mai 2025',
            opponent: "Da'Mon Blackshear",
            result: 'L',
            method: 'TKO R2',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Parado no segundo round por socos. Blackshear explorou exatamente a defesa fragil de strikes de Lacerda com ground-and-pound devastador.',
          },
          {
            date: 'Jan 2025',
            opponent: 'Cody Stamann',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Veterano Stamann neutralizou o grappling com wrestling superior por tres rounds. Stamann controlou o ritmo e impediu Lacerda de implementar seu jogo.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Oponente regional',
            result: 'W',
            method: 'Sub R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizacao rapida no primeiro round antes de chegar ao UFC, mostrando a velocidade de transicao da escola Nova Uniao.',
          },
        ],
      },
      fighter2: {
        nome: 'Sosa',
        recent_fights: [
          {
            date: 'Ago 2025',
            opponent: 'Ricky Lee',
            result: 'W',
            method: 'Decisao Unanime (DWCS)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Venceu por decisao no Contender Series e garantiu contrato UFC. Mostrou jogo completo e capacidade de dominar tres rounds.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Mohamed Mjahed',
            result: 'W',
            method: 'KO R1 (0:52)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute relampago em menos de um minuto. Explosividade e poder evidentes desde os primeiros segundos.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Victor Gronvall',
            result: 'W',
            method: 'Decisao (titulo FCR)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Conquistou titulo regional por decisao, demonstrando cardio e capacidade de manter ritmo em lutas longas.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Lucas Felipe',
            result: 'W',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Mais um nocaute no primeiro round. O padrao de explosividade inicial e a marca registrada de Sosa.',
          },
          {
            date: 'Mar 2024',
            opponent: 'Antonio Silva',
            result: 'W',
            method: "Sub D'Arce R2",
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: "Finalizou com D'Arce choke no segundo round, mostrando versatilidade alem do striking puro.",
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Jiu-Jitsu e Submissoes',
          valueA: 92,
          valueB: 55,
          labelA: 'Excelente',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Lacerda e faixa preta da Nova Uniao com 85% de vitorias por submissao (11 de 13). Perigoso de qualquer posicao, inclusive da guarda. Sosa tem 3 subs na carreira mas nao e especialista.',
        },
        {
          label: 'Striking e Trocacao',
          valueA: 48,
          valueB: 72,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Sosa tem poder de nocaute comprovado (6 KO/TKOs, 43% das vitorias) e velocidade explosiva. Lacerda tem zero vitorias por nocaute; seus golpes servem para criar aberturas pro grappling.',
        },
        {
          label: 'Wrestling e Controle',
          valueA: 55,
          valueB: 62,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Sosa demonstrou wrestling funcional no Contender Series contra Lee. Background amador extenso (28-4-2) indica base solida. Lacerda busca mais a guarda do que o controle em cima.',
        },
        {
          label: 'Defesa de Strikes',
          valueA: 35,
          valueB: 62,
          labelA: 'Ruim',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'O ponto mais fraco de Lacerda. Com 5.79 strikes absorvidos por minuto e 46% de defesa, ele aceita dano para criar scrambles e oportunidades no chao.',
        },
        {
          label: 'Explosividade e Atleticismo',
          valueA: 55,
          valueB: 78,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sosa e um atleta explosivo com background amador de 28-4-2. Nocautes em menos de um minuto demonstram velocidade de fecho e timing superior.',
        },
        {
          label: 'Experiencia no UFC',
          valueA: 60,
          valueB: 28,
          labelA: 'Bom',
          labelB: 'Ruim',
          advantage: 'fighter1',
          advantage_note: 'Lacerda tem 4 lutas no UFC (2-2) e conhece a pressao do octogono. Sosa faz sua estreia absoluta, tendo apenas a experiencia do Contender Series.',
        },
      ],
      insight: 'Confronto classico de estilos: o grappler de elite contra o striker explosivo. Lacerda domina no chao com jiu-jitsu de nivel excepcional, mas Sosa leva vantagem em quase todos os outros aspectos. A luta sera decidida por quem conseguir ditar onde ela acontece: em pe favorece Sosa, no chao favorece Lacerda.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Lacerda',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 11, percent: 85 },
        decision: { count: 2, percent: 15 },
        total_wins: 13,
      },
      fighter2: {
        nome: 'Sosa',
        ko_tko: { count: 6, percent: 43 },
        submission: { count: 3, percent: 21 },
        decision: { count: 5, percent: 36 },
        total_wins: 14,
      },
      insight: 'Perfis de finalizacao completamente opostos. Lacerda e um especialista puro em submissao com 85% das vitorias no chao e zero nocautes na carreira profissional. Sosa e muito mais diversificado: nocautes (43%), decisoes (36%) e submissoes (21%). Essa versatilidade da ao espanhol multiplos caminhos para vencer, enquanto Lacerda depende de levar a luta ao chao para aplicar seu jogo.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Sosa',
      winner_side: 'fighter2',
      predicted_method: 'TKO R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Sosa entra como favorito justificado (-200) nesta estreia no UFC. Sua explosividade, poder de nocaute e versatilidade devem ser demais para Lacerda na trocacao. O brasileiro tem jiu-jitsu de elite, mas precisa sobreviver em pe para chegar ao chao, e seus numeros defensivos sao preocupantes: 5.79 strikes absorvidos por minuto com apenas 46% de defesa. Contra um striker explosivo em sequencia de 11 vitorias, isso pode ser decisivo. A expectativa e que Sosa use sua vantagem atletica e o alcance superior para manter distancia, castigue Lacerda com golpes limpos, e finalize no segundo round quando o brasileiro tender a se expor mais buscando desesperadamente o clinch.',
      x_factor: {
        title: 'O jiu-jitsu de emboscada da Nova Uniao',
        description: 'Lacerda pode aceitar dano propositalmente para atrair Sosa ao chao. Com 85% de vitorias por submissao, qualquer momento no ground game pode virar armadilha. O armbar que finalizou Oliveira veio de uma posicao aparentemente desfavoravel. Se Sosa seguir Lacerda ao chao para tentar ground-and-pound, pode encontrar um triangulo ou armbar esperando.',
      },
      upset_alert: {
        title: 'A armadilha do estreante no octogono',
        description: 'Sosa nunca lutou no UFC e a pressao do octogono e real. Se os nervos da estreia afetarem seu timing e ele cometer o erro de ir ao chao com Lacerda, pode se ver em posicao sem saida. A sequencia de 11 vitorias veio contra nivel de competicao inferior ao UFC, e o salto de qualidade pode revelar limitacoes escondidas.',
      },
      probabilities: {
        fighter1: { nome: 'Lacerda', percent: 35 },
        fighter2: { nome: 'Sosa', percent: 63 },
        draw: 2,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
