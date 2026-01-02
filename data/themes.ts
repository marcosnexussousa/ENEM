
import { Theme } from '../types';

const currentYear = new Date().getFullYear();

export const FREE_THEME: Theme = {
  id: 'tema-livre',
  year: `${currentYear}`,
  axis: 'Geral',
  difficulty: 'Médio',
  title: 'Tema Livre (Escolha seu próprio tema)',
  motivationTexts: [
    "Neste modo, você pode praticar sobre qualquer assunto.",
    "A IA avaliará sua estrutura dissertativa, coesão, gramática e proposta de intervenção de forma genérica.",
    "Lembre-se de manter a estrutura de introdução, desenvolvimento e conclusão."
  ]
};

export const ENEM_THEMES: Theme[] = [
  FREE_THEME,
  {
    id: 'enem-2023',
    year: '2023',
    axis: 'Social',
    difficulty: 'Difícil',
    title: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
    motivationTexts: [
      "O trabalho de cuidado não remunerado é essencial para a manutenção da sociedade, mas permanece invisível.",
      "Dados do IBGE mostram que mulheres dedicam quase o dobro de tempo que homens a afazeres domésticos.",
      "A divisão sexual do trabalho sobrecarrega a saúde mental feminina."
    ]
  },
  {
    id: 'enem-2022',
    year: '2022',
    axis: 'Ambiental / Social',
    difficulty: 'Médio',
    title: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    motivationTexts: [
      "O Brasil possui vasta diversidade cultural com povos indígenas, quilombolas e ribeirinhos.",
      "O direito à terra é o pilar fundamental para a sobrevivência dessas culturas.",
      "A exploração econômica predatória ameaça o modo de vida tradicional."
    ]
  },
  {
    id: 'inedito-1',
    year: `${currentYear} (Inédito)`,
    axis: 'Saúde / Tecnologia',
    difficulty: 'Médio',
    title: 'Impactos da inteligência artificial na preservação da privacidade do cidadão brasileiro',
    motivationTexts: [
      "O avanço das IAs permite o processamento massivo de dados pessoais sem consentimento claro.",
      "A LGPD (Lei Geral de Proteção de Dados) é um avanço, mas a tecnologia corre mais rápido que a lei.",
      "Reconhecimento facial em espaços públicos gera debates sobre vigilância e liberdade."
    ]
  },
  {
    id: 'inedito-2',
    year: `${currentYear} (Inédito)`,
    axis: 'Social / Urbanismo',
    difficulty: 'Médio',
    title: 'Caminhos para combater a crise habitacional e o aumento da população de rua no Brasil',
    motivationTexts: [
      "O déficit habitacional no Brasil atinge milhões de famílias em áreas urbanas.",
      "A gentrificação expulsa moradores de baixa renda para as periferias ou para as ruas.",
      "O direito à moradia é um preceito constitucional que carece de políticas públicas efetivas."
    ]
  },
  {
    id: 'inedito-3',
    year: `${currentYear} (Inédito)`,
    axis: 'Ambiental',
    difficulty: 'Médio',
    title: 'Desafios do descarte de lixo eletrônico e a logística reversa no cenário nacional',
    motivationTexts: [
      "O Brasil é um dos maiores produtores de lixo eletrônico das Américas.",
      "Metais pesados presentes em dispositivos descartados incorretamente contaminam o solo e a água.",
      "A logística reversa ainda é um conceito pouco aplicado por grandes fabricantes no país."
    ]
  },
  {
    id: 'inedito-4',
    year: `${currentYear} (Inédito)`,
    axis: 'Educação',
    difficulty: 'Fácil',
    title: 'A importância da educação financeira na formação básica do cidadão brasileiro',
    motivationTexts: [
      "O endividamento das famílias brasileiras atinge níveis recordes históricos.",
      "A falta de planejamento financeiro compromete a qualidade de vida a longo prazo.",
      "Escolas que implementam educação financeira preparam jovens mais conscientes sobre consumo."
    ]
  },
  {
    id: 'inedito-5',
    year: `${currentYear} (Inédito)`,
    axis: 'Saúde Mental',
    difficulty: 'Difícil',
    title: 'Os limites entre a liberdade de expressão e o cyberbullying nas redes sociais',
    motivationTexts: [
      "O anonimato na internet facilita a propagação de discursos de ódio e perseguições virtuais.",
      "Casos de depression e ansiedade entre jovens estão diretamente ligados à pressão estética digital.",
      "A legislação brasileira busca tipificar crimes virtuais, mas a fiscalização é complexa."
    ]
  },
  {
    id: 'inedito-6',
    year: `${currentYear} (Inédito)`,
    axis: 'Cultura',
    difficulty: 'Médio',
    title: 'Desafios para a preservação do patrimônio histórico e cultural brasileiro no século XXI',
    motivationTexts: [
      "Incêndios e falta de manutenção ameaçam museus e bibliotecas nacionais.",
      "A memória de um povo é fundamental para a construção de sua identidade soberana.",
      "Investimento em cultura é frequentemente visto como gasto e não como investimento social."
    ]
  },
  {
    id: 'inedito-7',
    year: `${currentYear} (Inédito)`,
    axis: 'Trabalho',
    difficulty: 'Difícil',
    title: 'A "uberização" do trabalho e a precarização dos direitos trabalhistas na economy gig',
    motivationTexts: [
      "Trabalhadores por aplicativo não possuem vínculo empregatício formal ou seguridade social.",
      "A flexibilidade de horários esconde jornadas exaustivas e baixas remunerações.",
      "O modelo de 'parceria' transfere todos os riscos do negócio para o trabalhador."
    ]
  },
  {
    id: 'inedito-8',
    year: `${currentYear} (Inédito)`,
    axis: 'Saúde Pública',
    difficulty: 'Fácil',
    title: 'Estratégias para aumentar a taxa de doação de órgãos e tecidos no Brasil',
    motivationTexts: [
      "A fila de transplantes no Brasil depende exclusivamente da autorização familiar após a morte.",
      "Mitos e falta de informação impedem que muitas pessoas se declarem doadoras.",
      "O sistema de transplantes brasileiro é referência mundial, mas opera abaixo da capacidade necessária."
    ]
  },
  {
    id: 'inedito-9',
    year: `${currentYear} (Inédito)`,
    axis: 'Tecnologia / Política',
    difficulty: 'Difícil',
    title: 'O impacto das fake news na integridade do processo democrático e eleitoral',
    motivationTexts: [
      "Desinformação em massa altera a percepção pública sobre candidatos e instituições.",
      "Algoritmos de redes sociais criam bolhas que reforçam crenças sem verificação de fatos.",
      "A justiça eleitoral enfrenta o desafio de combater mentiras em tempo real durante campanhas."
    ]
  },
  {
    id: 'inedito-10',
    year: `${currentYear} (Inédito)`,
    axis: 'Social / Segurança',
    difficulty: 'Difícil',
    title: 'Caminhos para a ressocialização efetiva de ex-detentos no mercado de trabalho brasileiro',
    motivationTexts: [
      "O preconceito das empresas impede que egressos do sistema prisional consigam empregos dignos.",
      "A reincidência criminal está diretamente ligada à falta de oportunidades após o cumprimento da pena.",
      "Projetos de capacitação técnica dentro dos presídios são raros e pouco abrangentes."
    ]
  },
  {
    id: 'inedito-11',
    year: `${currentYear} (Inédito)`,
    axis: 'Ambiental / Energia',
    difficulty: 'Médio',
    title: 'A transição para matrizes energéticas limpas como solução para a crise climática',
    motivationTexts: [
      "A dependência de combustíveis fósseis é a principal causa do aquecimento global.",
      "O Brasil possui grande potencial para energia solar, eólica e biomassa ainda subutilizado.",
      "Acordos internacionais pressionam países em desenvolvimento a descarbonizar suas economias."
    ]
  },
  {
    id: 'inedito-12',
    year: `${currentYear} (Inédito)`,
    axis: 'Saúde / Alimentação',
    difficulty: 'Fácil',
    title: 'Combate à insegurança alimentar e ao desperdício de alimentos no Brasil',
    motivationTexts: [
      "Enquanto milhões passam fome, toneladas de alimentos são desperdiçadas na cadeia logística.",
      "A inflação dos alimentos básicos impacta diretamente a nutrição das classes mais baixas.",
      "Bancos de alimentos e hortas comunitárias surgem como soluções locais de baixo custo."
    ]
  },
  {
    id: 'inedito-13',
    year: `${currentYear} (Inédito)`,
    axis: 'Educação / Social',
    difficulty: 'Médio',
    title: 'Desafios da alfabetização na idade certa após os impactos da pandemia de COVID-19',
    motivationTexts: [
      "O fechamento das escolas gerou um gap de aprendizado que pode afetar uma geração inteira.",
      "A desigualdade de acesso à internet aprofundou o abismo entre ensino público e privado.",
      "Métodos lúdicos de ensino são essenciais para recuperar o tempo perdido no ensino fundamental."
    ]
  },
  {
    id: 'inedito-14',
    year: `${currentYear} (Inédito)`,
    axis: 'Direitos Humanos',
    difficulty: 'Médio',
    title: 'O combate à exploração do trabalho infantil nas cadeias produtivas globais',
    motivationTexts: [
      "Crianças ainda são utilizadas em colheitas e manufaturas em diversas regiões do país.",
      "A pobreza extrema força famílias a utilizarem a mão de obra infantil para sobrevivência.",
      "O selo de 'empresa livre de trabalho infantil' é uma demanda crescente do consumidor consciente."
    ]
  },
  {
    id: 'inedito-15',
    year: `${currentYear} (Inédito)`,
    axis: 'Ciência / Saúde',
    difficulty: 'Médio',
    title: 'Desafios para a superação do movimento antivacina e a volta de doenças erradicadas',
    motivationTexts: [
      "O Brasil, antes referência em vacinação, vê as coberturas vacinais caírem ano após ano.",
      "Doenças como o sarampo voltaram a circular devido à baixa imunização da população.",
      "Campanhas de desinformação científica geram medo e hesitação entre pais e responsáveis."
    ]
  },
  {
    id: 'inedito-16',
    year: `${currentYear} (Inédito)`,
    axis: 'Social / Demografia',
    difficulty: 'Médio',
    title: 'Impactos do envelhecimento populacional na estrutura previdenciária e de saúde do Brasil',
    motivationTexts: [
      "A pirâmide etária brasileira está se invertendo rapidamente, com menos jovens e mais idosos.",
      "O sistema de saúde precisa se adaptar para tratar doenças crônicas e degenerativas.",
      "A solidão na terceira idade é um problema de saúde pública negligenciado pelo Estado."
    ]
  },
  {
    id: 'inedito-17',
    year: `${currentYear} (Inédito)`,
    axis: 'Cultura / Sociedade',
    difficulty: 'Fácil',
    title: 'A democratização do acesso ao cinema e ao teatro nas periferias brasileiras',
    motivationTexts: [
      "Equipamentos culturais estão concentrados nos grandes centros e áreas de elite.",
      "O preço dos ingressos é a principal barreira para o consumo de arte pelas massas.",
      "Cines comunitários e editais de fomento local são vitais para a descentralização cultural."
    ]
  },
  {
    id: 'estilo-papel-antigo',
    year: '2024 (Inédito)',
    axis: 'Cultural / Histórico',
    difficulty: 'Médio',
    title: 'Desafios para a preservação da escrita manual na era digital',
    variant: 'ancient',
    motivationTexts: [
      'O avanço das tecnologias digitais impacta diretamente os hábitos de escrita e leitura.',
      'A caligrafia e a escrita à mão são formas de expressão artística e cultural que correm o risco de desaparecer.',
      'Iniciativas para o ensino de escrita manual nas escolas buscam resgatar essa habilidade fundamental.'
    ]
  },
  {
    id: 'enem-2021',
    year: '2021',
    axis: 'Cidadania',
    difficulty: 'Fácil',
    title: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    motivationTexts: [
      "Milhares de brasileiros não possuem certidão de nascimento, tornando-os 'invisíveis' ao Estado.",
      "Sem documentos, é impossível acessar vacinação, escola ou programas sociais.",
      "O registro civil é a porta de entrada para todos os outros direitos fundamentais."
    ]
  }
];
