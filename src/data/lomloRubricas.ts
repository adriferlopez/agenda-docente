import type { Rubric } from '@/types';

/**
 * Rúbricas LOMLOE prediseñadas. Las competencias clave son comunes a toda
 * España (RD 157/2022), pero los criterios de evaluación específicos varían
 * por decreto autonómico. Estas rúbricas reflejan los criterios generales
 * de las áreas más comunes.
 *
 * id="" y ownerId="" indica que son globales (solo lectura, no del docente).
 */

const now = 0; // timestamp fijo para datos prediseñados

export const LOMLOE_RUBRICAS: Rubric[] = [
  // -----------------------------------------------------------------------
  // CATALUÑA - Currículum competencial (Decret 175/2022)
  // -----------------------------------------------------------------------
  {
    id: 'lomloe-cat-llengua',
    ownerId: '',
    name: 'Llengua Catalana i Literatura — Competències bàsiques',
    community: 'Cataluña',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'cat-ll-1',
        name: 'Comprensió lectora',
        description: 'Llegir i comprendre textos de tipologies diverses',
        weight: 25,
        indicators: [
          'Comprèn informació explícita de textos senzills amb ajuda',
          'Comprèn la informació explícita i alguna d\'implícita de textos variats',
          'Comprèn informació explícita i implícita i fa inferències bàsiques',
          'Comprèn, interpreta i avalua críticament textos complexos de tipologies diverses',
        ],
      },
      {
        id: 'cat-ll-2',
        name: 'Expressió escrita',
        description: 'Produir textos escrits adequats, coherents i correctes',
        weight: 25,
        indicators: [
          'Produeix textos molt breus amb errors freqüents d\'adequació i coherència',
          'Produeix textos breus amb adequació acceptable i alguns errors de coherència',
          'Produeix textos ben estructurats, adequats i majoritàriament correctes',
          'Produeix textos complexos, originals, adequats, coherents i correctes',
        ],
      },
      {
        id: 'cat-ll-3',
        name: 'Comunicació oral',
        description: 'Participar en interaccions orals amb adequació i fluïdesa',
        weight: 25,
        indicators: [
          'Participa molt poc en interaccions orals i amb dificultats de fluïdesa',
          'Participa en interaccions orals senzilles amb fluïdesa limitada',
          'Participa activament amb fluïdesa i adequació en la major part de contextos',
          'Participa amb fluïdesa, creativitat i eficàcia en qualsevol context comunicatiu',
        ],
      },
      {
        id: 'cat-ll-4',
        name: 'Reflexió lingüística',
        description: 'Aplicar coneixements lingüístics per millorar la producció',
        weight: 25,
        indicators: [
          'Aplica de manera molt limitada els coneixements gramaticals i lèxics',
          'Aplica coneixements bàsics gramaticals i lèxics amb errors freqüents',
          'Aplica coneixements lingüístics amb encert en la majoria de situacions',
          'Aplica i reflexiona sobre els coneixements lingüístics de manera autònoma i crítica',
        ],
      },
    ],
  },
  {
    id: 'lomloe-cat-matematiques',
    ownerId: '',
    name: 'Matemàtiques — Competències bàsiques',
    community: 'Cataluña',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'cat-mat-1',
        name: 'Raonament i prova',
        description: 'Formular conjectures i construir arguments matemàtics',
        weight: 30,
        indicators: [
          'Identifica patrons senzills amb ajuda i té dificultats per justificar-los',
          'Identifica patrons i fa justificacions bàsiques amb alguns errors',
          'Formula conjectures i les justifica amb arguments matemàtics clars',
          'Elabora demostracions rigoroses i avalua la validesa d\'arguments complexos',
        ],
      },
      {
        id: 'cat-mat-2',
        name: 'Resolució de problemes',
        description: 'Plantejar i resoldre problemes en contextos diversos',
        weight: 35,
        indicators: [
          'Resol problemes molt senzills amb ajuda constant i estratègies poc eficients',
          'Resol problemes rutinaris amb alguna estratègia adequada però amb errors',
          'Resol problemes variats de manera autònoma aplicant estratègies adequades',
          'Resol problemes complexos amb creativitat, eficiència i reflexió crítica',
        ],
      },
      {
        id: 'cat-mat-3',
        name: 'Connexions matemàtiques',
        description: 'Relacionar conceptes matemàtics entre si i amb altres àrees',
        weight: 20,
        indicators: [
          'Reconeix connexions molt bàsiques entre conceptes amb ajuda',
          'Estableix algunes connexions entre conceptes propers',
          'Relaciona conceptes matemàtics i els connecta amb situacions reals',
          'Integra coneixements matemàtics de manera transversal i interdisciplinària',
        ],
      },
      {
        id: 'cat-mat-4',
        name: 'Comunicació matemàtica',
        description: 'Expressar idees matemàtiques de forma oral i escrita',
        weight: 15,
        indicators: [
          'Expressa idees matemàtiques amb terminologia molt bàsica i imprecisa',
          'Utilitza vocabulari matemàtic bàsic amb algunes imprecisions',
          'S\'expressa amb precisió usant terminologia i representacions adequades',
          'Comunica idees matemàtiques complexes amb precisió, claredat i creativitat',
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // MADRID - Currículo (Decreto 64/2022 y 65/2022)
  // -----------------------------------------------------------------------
  {
    id: 'lomloe-mad-lengua',
    ownerId: '',
    name: 'Lengua Castellana y Literatura — Madrid',
    community: 'Madrid',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'mad-len-1',
        name: 'Comprensión lectora',
        description: 'Leer, comprender e interpretar textos de distinta naturaleza',
        weight: 25,
        indicators: [
          'Comprende información explícita de textos sencillos con apoyo',
          'Comprende textos sencillos y extrae información relevante con errores',
          'Comprende e interpreta textos variados realizando inferencias',
          'Interpreta y evalúa críticamente textos complejos con autonomía',
        ],
      },
      {
        id: 'mad-len-2',
        name: 'Producción escrita',
        description: 'Escribir textos de distintos géneros respetando las convenciones',
        weight: 25,
        indicators: [
          'Produce textos muy breves con numerosos errores de adecuación y cohesión',
          'Produce textos breves con adecuación aceptable y errores frecuentes',
          'Produce textos bien estructurados, adecuados y mayoritariamente correctos',
          'Produce textos complejos, originales, correctos y con voz propia',
        ],
      },
      {
        id: 'mad-len-3',
        name: 'Comunicación oral',
        description: 'Participar en situaciones comunicativas orales con fluidez',
        weight: 25,
        indicators: [
          'Participa de forma muy limitada con dificultades de fluidez y adecuación',
          'Participa en intercambios básicos con fluidez limitada',
          'Participa activamente con fluidez y adecuación en distintos contextos',
          'Participa con eficacia, creatividad y espíritu crítico en cualquier contexto',
        ],
      },
      {
        id: 'mad-len-4',
        name: 'Educación literaria',
        description: 'Leer obras literarias y desarrollar criterio lector',
        weight: 25,
        indicators: [
          'Lee obras con dificultad y no relaciona sus lecturas con el contexto',
          'Lee obras y hace valoraciones básicas con poca profundidad',
          'Lee obras literarias y las contextualiza con criterio propio emergente',
          'Lee, interpreta y valora críticamente obras con criterio lector consolidado',
        ],
      },
    ],
  },
  {
    id: 'lomloe-mad-matematicas',
    ownerId: '',
    name: 'Matemáticas — Madrid',
    community: 'Madrid',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'mad-mat-1',
        name: 'Sentido numérico',
        description: 'Comprender y usar números en distintos contextos',
        weight: 30,
        indicators: [
          'Reconoce números y realiza operaciones básicas con errores frecuentes',
          'Opera con números en situaciones rutinarias con algunos errores',
          'Usa el sentido numérico para resolver situaciones variadas con autonomía',
          'Aplica el sentido numérico de forma flexible y creativa en contextos complejos',
        ],
      },
      {
        id: 'mad-mat-2',
        name: 'Resolución de problemas',
        description: 'Plantear y resolver problemas matemáticos',
        weight: 35,
        indicators: [
          'Resuelve problemas muy sencillos con ayuda y estrategias poco eficientes',
          'Resuelve problemas rutinarios con alguna estrategia adecuada',
          'Resuelve problemas variados de forma autónoma con estrategias adecuadas',
          'Resuelve problemas complejos con creatividad, eficiencia y reflexión',
        ],
      },
      {
        id: 'mad-mat-3',
        name: 'Razonamiento y prueba',
        description: 'Argumentar y justificar matemáticamente',
        weight: 20,
        indicators: [
          'Identifica patrones muy simples con ayuda',
          'Hace justificaciones básicas con errores',
          'Formula conjeturas y las justifica con argumentos claros',
          'Elabora argumentaciones rigurosas y evalúa la validez de razonamientos',
        ],
      },
      {
        id: 'mad-mat-4',
        name: 'Conexiones y modelización',
        description: 'Conectar las matemáticas con otros ámbitos',
        weight: 15,
        indicators: [
          'Reconoce conexiones muy básicas con ayuda',
          'Establece alguna conexión entre conceptos próximos',
          'Relaciona conceptos y los conecta con situaciones reales',
          'Integra matemáticas de forma transversal con autonomía y creatividad',
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // ANDALUCÍA - Instrucciones de ordenación (Orden de 30 de mayo de 2023)
  // -----------------------------------------------------------------------
  {
    id: 'lomloe-and-lengua',
    ownerId: '',
    name: 'Lengua Castellana y Literatura — Andalucía',
    community: 'Andalucía',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'and-len-1',
        name: 'Comprensión e interpretación lectora',
        description: 'Comprender, interpretar y valorar textos orales y escritos',
        weight: 30,
        indicators: [
          'Comprende textos muy sencillos con ayuda, con dificultades de interpretación',
          'Comprende textos sencillos y extrae ideas principales con errores',
          'Comprende e interpreta textos variados haciendo inferencias con autonomía',
          'Interpreta y valora críticamente textos complejos con autonomía plena',
        ],
      },
      {
        id: 'and-len-2',
        name: 'Producción de textos escritos',
        description: 'Producir textos escritos con corrección y adecuación',
        weight: 25,
        indicators: [
          'Produce textos muy breves con errores frecuentes en todos los niveles',
          'Produce textos sencillos con adecuación básica y errores de cohesión',
          'Produce textos correctos y bien estructurados en la mayoría de situaciones',
          'Produce textos complejos, creativos, correctos y con estilo propio',
        ],
      },
      {
        id: 'and-len-3',
        name: 'Interacción oral',
        description: 'Participar en intercambios comunicativos orales',
        weight: 25,
        indicators: [
          'Participa de forma muy limitada con muchas dificultades de expresión',
          'Participa en intercambios básicos con fluidez y adecuación limitadas',
          'Participa con fluidez y adecuación en contextos variados',
          'Participa con eficacia, creatividad y sentido crítico en cualquier contexto',
        ],
      },
      {
        id: 'and-len-4',
        name: 'Conocimiento de la lengua',
        description: 'Aplicar conocimientos lingüísticos a la comprensión y producción',
        weight: 20,
        indicators: [
          'Aplica conocimientos lingüísticos de forma muy limitada',
          'Aplica conocimientos básicos con errores frecuentes',
          'Aplica conocimientos lingüísticos con acierto en la mayoría de casos',
          'Reflexiona y aplica conocimientos lingüísticos de forma autónoma y crítica',
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // PAÍS VASCO - Heziberri 2020 / LOMLOE (Decreto 126/2023)
  // -----------------------------------------------------------------------
  {
    id: 'lomloe-eus-hizkuntza',
    ownerId: '',
    name: 'Euskara eta Literatura — Oinarrizko konpetentziak',
    community: 'País Vasco',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'eus-hiz-1',
        name: 'Irakurmena / Comprensión lectora',
        description: 'Testuen ulermena eta interpretazioa',
        weight: 25,
        indicators: [
          'Laguntzarekin testu errazak ulertzen ditu, interpretazioarekin zailtasunak ditu',
          'Testu errazak ulertzen ditu eta ideia nagusiak zenbait errorekin ateratzen ditu',
          'Testu desberdinak ulertzen eta interpretatzen ditu inferentziak eginez',
          'Testu konplexuak kritikoki interpretatzen eta baloratzen ditu autonomiaz',
        ],
      },
      {
        id: 'eus-hiz-2',
        name: 'Idazketa / Producción escrita',
        description: 'Testu idatzien ekoizpena',
        weight: 25,
        indicators: [
          'Testu oso laburrak ekoizten ditu maiz egokitasun eta kohesio erroreekin',
          'Testu laburrak egokitasun onargarriarekin eta kohesio erroreekin ekoizten ditu',
          'Egituratutako testuak zuzen ekoizten ditu gehienetan',
          'Testu konplexuak, originalak eta zuzenak ekoizten ditu estilo propioarekin',
        ],
      },
      {
        id: 'eus-hiz-3',
        name: 'Ahozko komunikazioa / Comunicación oral',
        description: 'Ahozko komunikazio egoeretan parte hartzea',
        weight: 25,
        indicators: [
          'Ahozko elkarrekintzetan oso modu mugatuan parte hartzen du',
          'Elkarrekintza basicoetan parte hartzen du fluentzia mugatuarekin',
          'Hainbat testuingurutan fluentziaz eta egokitasunez parte hartzen du',
          'Edozein testuingurutan eraginkortasunez eta sormenez parte hartzen du',
        ],
      },
      {
        id: 'eus-hiz-4',
        name: 'Hizkuntza ezagutza / Conocimiento de la lengua',
        description: 'Ezagutza linguistikoak aplikatzea',
        weight: 25,
        indicators: [
          'Ezagutza linguistikoak oso modu mugatuan aplikatzen ditu',
          'Oinarrizko ezagutza linguistikoak maiz errorekin aplikatzen ditu',
          'Ezagutza linguistikoak gehienetan zuzen aplikatzen ditu',
          'Ezagutza linguistikoak modu autonomo eta kritikoan aplikatzen eta hausnartzen ditu',
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // GALICIA - Decreto 156/2022 y 157/2022
  // -----------------------------------------------------------------------
  {
    id: 'lomloe-gal-lingua',
    ownerId: '',
    name: 'Lingua Galega e Literatura — Competencias básicas',
    community: 'Galicia',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'gal-lin-1',
        name: 'Comprensión lectora',
        description: 'Ler e comprender textos de distinta tipoloxía',
        weight: 25,
        indicators: [
          'Comprende textos moi sinxelos con apoio e con dificultades de interpretación',
          'Comprende textos sinxelos e extrae información relevante con erros',
          'Comprende e interpreta textos variados realizando inferencias',
          'Interpreta e avalía criticamente textos complexos con autonomía',
        ],
      },
      {
        id: 'gal-lin-2',
        name: 'Produción escrita',
        description: 'Producir textos escritos axeitados e correctos',
        weight: 25,
        indicators: [
          'Produce textos moi breves con erros frecuentes de adecuación e cohesión',
          'Produce textos sinxelos con adecuación aceptable e erros de cohesión',
          'Produce textos ben estruturados e maioritariamente correctos',
          'Produce textos complexos, orixinais, correctos e con voz propia',
        ],
      },
      {
        id: 'gal-lin-3',
        name: 'Comunicación oral',
        description: 'Participar en situacións comunicativas orais',
        weight: 25,
        indicators: [
          'Participa de xeito moi limitado con dificultades de fluidez e adecuación',
          'Participa en intercambios básicos con fluidez limitada',
          'Participa activamente con fluidez e adecuación en distintos contextos',
          'Participa con eficacia, creatividade e espírito crítico en calquera contexto',
        ],
      },
      {
        id: 'gal-lin-4',
        name: 'Coñecemento da lingua',
        description: 'Aplicar coñecementos lingüísticos á comprensión e produción',
        weight: 25,
        indicators: [
          'Aplica coñecementos lingüísticos de xeito moi limitado',
          'Aplica coñecementos básicos con erros frecuentes',
          'Aplica coñecementos lingüísticos con acerto na maioría de casos',
          'Reflexiona e aplica coñecementos lingüísticos de xeito autónomo e crítico',
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // COMPETENCIAS CLAVE LOMLOE — Rúbrica transversal (todas las CC.AA.)
  // -----------------------------------------------------------------------
  {
    id: 'lomloe-cclave-general',
    ownerId: '',
    name: 'Competencias Clave LOMLOE — Rúbrica general transversal',
    community: 'General (todas las CC.AA.)',
    isLomloe: true,
    createdAt: now,
    criteria: [
      {
        id: 'cc-ccl',
        name: 'CCL — Comunicación lingüística',
        weight: 20,
        indicators: [
          'Se expresa con dificultad y comprende solo textos muy sencillos',
          'Se expresa básicamente y comprende textos sencillos con errores',
          'Se expresa con claridad y comprende textos variados con autonomía',
          'Se expresa con precisión y creatividad y comprende textos complejos críticamente',
        ],
      },
      {
        id: 'cc-stem',
        name: 'STEM — Competencia matemática y en ciencia/tecnología',
        weight: 20,
        indicators: [
          'Aplica pensamiento matemático y científico de forma muy limitada',
          'Aplica pensamiento básico matemático y científico con errores frecuentes',
          'Aplica pensamiento matemático y científico con autonomía en situaciones variadas',
          'Integra pensamiento matemático y científico de forma creativa y crítica',
        ],
      },
      {
        id: 'cc-cd',
        name: 'CD — Competencia digital',
        weight: 15,
        indicators: [
          'Usa herramientas digitales básicas con mucha ayuda',
          'Usa herramientas digitales básicas con algunas dificultades',
          'Usa herramientas digitales con autonomía y sentido crítico básico',
          'Usa y crea contenidos digitales de forma autónoma, creativa y responsable',
        ],
      },
      {
        id: 'cc-cpsaa',
        name: 'CPSAA — Aprender a aprender',
        weight: 15,
        indicators: [
          'Tiene poca conciencia de su propio proceso de aprendizaje',
          'Reflexiona sobre su aprendizaje con ayuda y poca autonomía',
          'Regula su aprendizaje con autonomía y aplica estrategias adecuadas',
          'Gestiona su aprendizaje de forma autónoma, reflexiva y orientada al logro',
        ],
      },
      {
        id: 'cc-cc',
        name: 'CC — Competencia ciudadana',
        weight: 15,
        indicators: [
          'Participa muy poco en actividades colectivas y con dificultades',
          'Participa en actividades colectivas con algunas dificultades de convivencia',
          'Participa activamente y demuestra valores democráticos y de convivencia',
          'Ejerce una ciudadanía activa, crítica y comprometida con los valores democráticos',
        ],
      },
      {
        id: 'cc-ce',
        name: 'CE — Competencia emprendedora',
        weight: 15,
        indicators: [
          'Muestra poca iniciativa ante retos y dificultades',
          'Muestra iniciativa básica con ayuda ante situaciones conocidas',
          'Muestra iniciativa y creatividad ante retos con autonomía',
          'Muestra iniciativa, creatividad y liderazgo ante cualquier reto',
        ],
      },
    ],
  },
];

/** Devuelve las rúbricas LOMLOE filtradas por comunidad (o todas si no se especifica). */
export function getLomloRubricas(community?: string): Rubric[] {
  if (!community) return LOMLOE_RUBRICAS;
  return LOMLOE_RUBRICAS.filter((r) => r.community === community);
}

/** Comunidades disponibles en las rúbricas prediseñadas. */
export const LOMLOE_COMMUNITIES = [
  'General (todas las CC.AA.)',
  'Cataluña',
  'Madrid',
  'Andalucía',
  'País Vasco',
  'Galicia',
];
