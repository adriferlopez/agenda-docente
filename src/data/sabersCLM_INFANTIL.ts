// Saberes básicos de la Educación Infantil de Castilla-La Mancha, generados a
// partir del Decreto 80/2022, de 12 de julio, por el que se establece la
// ordenación y el currículo de la Educación Infantil en la comunidad autónoma
// de Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo II.
//
// Vegeu la nota a competenciesCLM_INFANTIL.ts: el decreto reproduce
// prácticamente de forma literal la estructura del Real Decreto 95/2022
// (mateixos tres àrees, mateixos blocs de sabers), incorporant alguns sabers
// propis de la comunitat (referències a Castilla-La Mancha, iniciació a la
// llengua estrangera des del segon cicle, iniciació a la robòtica, el canvi
// climàtic, etc.).
import type { SaberAreaGeneric } from './curriculum/types';

export const INFANTIL_CLM_CICLES = ['0-3', '3-6'] as const;
export type InfantilClmCicle = typeof INFANTIL_CLM_CICLES[number];

export const INFANTIL_CLM_CICLE_LABELS: Record<string, string> = {
  '0-3': 'Primer ciclo (0-3 años)',
  '3-6': 'Segundo ciclo (3-6 años)',
};

export const SABERS_AREAS_INFANTIL_CLM = [
  'Crecimiento en Armonía',
  'Descubrimiento y Exploración del Entorno',
  'Comunicación y Representación de la Realidad',
];

export const SABERS_CLM_INFANTIL: Record<string, SaberAreaGeneric> = {
  'Crecimiento en Armonía': {
    name: 'Crecimiento en Armonía',
    courseKeys: [...INFANTIL_CLM_CICLES],
    courseLabels: INFANTIL_CLM_CICLE_LABELS,
    blocs: {
      'A. El cuerpo y el control progresivo del mismo': {
        '0-3': [
          'Descubrimiento y reconocimiento de la propia imagen y la de las personas de su entorno. Identificación y respeto de las diferencias.',
          'Curiosidad e interés por la exploración sensomotriz. Integración sensorial del mundo a través de las posibilidades perceptivas.',
          'Exploración y experiencias activas. El movimiento libre como fuente de aprendizaje y desarrollo.',
          'El contacto con las otras personas y con los objetos. Iniciativa y curiosidad por aprender nuevas habilidades.',
          'Experimentación manipulativa y dominio progresivo de coordinación visomotriz en el contacto con objetos y materiales.',
          'Adaptación y progresivo control del movimiento y de la postura en las diferentes situaciones de la vida cotidiana.',
          'Herramientas y estrategias para identificar y evitar situaciones de riesgo o peligro.',
          'El juego como actividad propia para el aprendizaje, el bienestar y disfrute. El juego libre, juego exploratorio, sensorial y motor.',
        ],
        '3-6': [
          'Imagen global y segmentaria del cuerpo: características individuales y percepción de los cambios físicos.',
          'Imagen positiva y ajustada de uno mismo y de los demás.',
          'Identificación y respeto de las diferencias.',
          'Los sentidos y sus funciones. El cuerpo y el entorno.',
          'El movimiento: control progresivo de la coordinación, tono, equilibrio y desplazamientos.',
          'Implicaciones de la discapacidad sensorial o física en la vida cotidiana.',
          'Dominio activo del tono y la postura en función de las características de los objetos, acciones y situaciones.',
          'El juego como actividad placentera y fuente de aprendizaje, creatividad y socialización. Normas de juego: aceptación y propuestas.',
          'Progresiva autonomía en la realización de tareas y rutinas.',
        ],
      },
      'B. Desarrollo y equilibrio afectivos': {
        '0-3': [
          'Identificación y adecuación de estados emocionales a las diferentes situaciones: tiempos de espera, pequeñas frustraciones asociadas a la satisfacción de necesidades básicas y cuidados.',
          'Identificación progresiva de las emociones básicas.',
          'Conocimiento, aceptación y progresivo control de las emociones y manifestaciones propias más llamativas.',
          'Aproximación a algunas herramientas y estrategias para lograr seguridad afectiva: búsqueda de ayuda, demanda de contacto afectivo.',
        ],
        '3-6': [
          'Herramientas para la identificación, expresión, aceptación y control progresivo de las propias emociones, sentimientos, vivencias, preferencias e intereses.',
          'Estrategias de ayuda y cooperación en contextos de juego y rutinas.',
          'Estrategias para desarrollar la seguridad en sí mismo, el reconocimiento de sus posibilidades y la asertividad respetuosa hacia los demás.',
          'Aceptación constructiva de los errores y las correcciones: manifestaciones de superación y logro.',
          'Valoración del trabajo bien hecho: desarrollo inicial de hábitos y actitudes de esfuerzo, constancia, organización, atención e iniciativa.',
        ],
      },
      'C. Hábitos de vida saludable para el autocuidado y el cuidado del entorno': {
        '0-3': [
          'Regulación progresiva de los ritmos biológicos propios a las rutinas del grupo.',
          'Cuidados y necesidades básicas.',
          'Rutinas relacionadas con el compromiso y la autonomía: anticipación de acciones; normas de comportamiento social en la comida, el descanso, la higiene o los desplazamientos, etc.',
          'Hábitos sostenibles y ecosocialmente responsables relacionados con la alimentación, la higiene y el aseo personal, el descanso o limpieza del espacio.',
          'Acciones que favorecen la salud y generan bienestar. Interés por tener un aspecto saludable y aseado. Actividad física estructurada.',
        ],
        '3-6': [
          'Necesidades básicas: manifestación, regulación y control en relación con el bienestar personal.',
          'Hábitos y prácticas sostenibles y ecosocialmente responsables relacionados con la alimentación, la higiene, el descanso, el autocuidado y el cuidado del entorno.',
          'Actividad física estructurada con diferentes grados de intensidad.',
          'Rutinas: planificación secuenciada de las acciones para resolver una tarea; normas de comportamiento social en la comida, el descanso, la higiene y los desplazamientos, etc.',
          'Identificación de situaciones peligrosas y prevención de accidentes.',
        ],
      },
      'D. Interacción socioemocional en el entorno. La vida junto a los demás': {
        '0-3': [
          'La diversidad familiar.',
          'La transición del grupo familiar al grupo social de la escuela.',
          'Los primeros vínculos afectivos. Apertura e interés hacia otras personas. Sentimientos de pertenencia y vinculación afectiva con las personas de referencia.',
          'El aula y el centro como grupos sociales de pertenencia.',
          'Relaciones afectuosas y respetuosas.',
          'Acercamiento a la diversidad derivada de distintas formas de discapacidad y sus implicaciones en la vida cotidiana.',
          'Hábitos y regulación progresiva del comportamiento en función de las necesidades de los demás: escucha, paciencia y ayuda.',
          'Herramientas y estrategias elementales para la gestión de conflictos.',
          'Desarrollo de actitudes de espera y de participación activa. Asunción de pequeñas responsabilidades en actividades y juegos.',
          'Celebraciones, costumbres y tradiciones étnico-culturales presentes en nuestra comunidad autónoma.',
        ],
        '3-6': [
          'La diversidad familiar.',
          'La familia y la incorporación a la escuela.',
          'Habilidades socioafectivas y de convivencia: comunicación de sentimientos y emociones y pautas básicas de convivencia, que incluyan el respeto a la igualdad de género y el rechazo a cualquier tipo de discriminación.',
          'Estrategias de autorregulación de la conducta. Empatía y respeto.',
          'Resolución de conflictos surgidos en interacciones con los otros.',
          'La amistad como elemento protector, de prevención de la violencia y de desarrollo de la cultura de la paz.',
          'Fórmulas de cortesía e interacción social positiva. Actitud de ayuda y cooperación.',
          'La respuesta empática a la diversidad debida a distintas formas de discapacidad y a sus implicaciones en la vida cotidiana.',
          'Juego simbólico. Observación, imitación y representación de personas, personajes y situaciones. Estereotipos y prejuicios.',
          'Otros grupos sociales de pertenencia: características, funciones y servicios.',
          'Actividades del entorno próximo.',
          'Celebraciones, costumbres y tradiciones de Castilla-La Mancha. Herramientas para el aprecio de las señas de identidad étnico-cultural presentes en su entorno.',
        ],
      },
    },
  },

  'Descubrimiento y Exploración del Entorno': {
    name: 'Descubrimiento y Exploración del Entorno',
    courseKeys: [...INFANTIL_CLM_CICLES],
    courseLabels: INFANTIL_CLM_CICLE_LABELS,
    blocs: {
      'A. Diálogo corporal con el entorno. Exploración creativa de objetos, materiales y espacios': {
        '0-3': [
          'Curiosidad e interés por la exploración del entorno y sus elementos.',
          'Exploración de objetos y materiales a través de los sentidos.',
          'Identificación de las cualidades o atributos de los objetos y materiales. Efectos que producen diferentes acciones sobre ellos.',
          'Relaciones de orden, correspondencia, clasificación y comparación.',
          'Cuantificadores básicos.',
          'Nociones espaciales básicas en relación con el propio cuerpo y los objetos.',
          'Nociones temporales básicas en su vida cotidiana: cambio y permanencia, continuidad; sucesión y simultaneidad; pasado, presente y futuro.',
        ],
        '3-6': [
          'Objetos y materiales. Materiales ecológicos, reciclables y sostenibles respetuosos con el medio ambiente. Interés, curiosidad y actitud de respeto durante su exploración.',
          'Cualidades o atributos de objetos y materiales. Relaciones de orden, correspondencia, clasificación, seriación y comparación.',
          'Cuantificadores básicos contextualizados.',
          'Funcionalidad de los números en la vida cotidiana y en la ciencia.',
          'Situaciones en las que se hace necesario medir.',
          'Unidades de medida tomando como referencia segmentos del propio cuerpo: palmo, pies, pasos...',
          'Nociones espaciales básicas en relación con el propio cuerpo, los objetos y las acciones, tanto en reposo como en movimiento.',
          'El tiempo y su organización: día-noche, estaciones, ciclos, calendario, el tiempo atmosférico y la secuenciación del tiempo cronológico.',
        ],
      },
      'B. Experimentación en el entorno. Curiosidad, pensamiento científico, razonamiento lógico y creatividad': {
        '0-3': [
          'Indagación en el entorno manifestando diversas actitudes: interés, curiosidad, imaginación, creatividad y sorpresa.',
          'Proceso de construcción de nuevos conocimientos: relaciones y conexiones entre lo conocido y lo novedoso, y entre experiencias previas y nuevas; andamiaje e interacciones de calidad con las personas adultas, con iguales y con el entorno, etc.',
          'Modelo de control de variables. Estrategias y técnicas de investigación: ensayo-error, observación, comprobación y realización de preguntas.',
        ],
        '3-6': [
          'Pautas para la indagación en el entorno: interés, respeto, curiosidad, asombro, cuestionamiento y deseos de conocimiento.',
          'Protección del medio natural: gestión circular (reciclaje, reducción y reutilización) y utilización sostenible de los recursos naturales.',
          'Estrategias de construcción de nuevos conocimientos: relaciones y conexiones entre lo conocido y lo novedoso, y entre experiencias previas y nuevas; andamiaje e interacciones de calidad con las personas adultas, con iguales y con el entorno.',
          'Modelo de control de variables. Estrategias y técnicas de investigación: ensayo-error, observación, experimentación, formulación y comprobación de hipótesis, realización de preguntas, manejo y búsqueda en distintas fuentes de información.',
          'Iniciación a la robótica.',
          'Estrategias de planificación, organización o autorregulación de tareas. Iniciativa en la búsqueda de acuerdos o consensos en la toma de decisiones.',
          'Estrategias para proponer soluciones: creatividad, diálogo, imaginación y descubrimiento.',
          'Procesos y resultados. Hallazgos, verificación y conclusiones.',
        ],
      },
      'C. Indagación en el medio físico y natural: cuidado, valoración y respeto': {
        '0-3': [
          'Efectos de las propias acciones en el medio físico y en el patrimonio natural y cultural.',
          'Experimentación con los elementos naturales (agua, tierra, aire). Características y comportamiento (peso, capacidad, volumen, mezclas o trasvases).',
          'Fenómenos naturales habituales: repercusión en su vida cotidiana.',
          'Respeto hacia la naturaleza, los seres vivos y los derechos de los animales.',
          'Respeto por el patrimonio cultural presente en el medio físico.',
        ],
        '3-6': [
          'Elementos naturales (agua, tierra, aire). Características y comportamiento (peso, capacidad, volumen, mezclas o transvases).',
          'Espacios protegidos de Castilla-La Mancha: parques nacionales, parques naturales y otros espacios y hábitats protegidos.',
          'Influencia de las acciones de las personas en el medio físico y en el patrimonio natural y cultural.',
          'El cambio climático.',
          'Turismo sostenible: respeto y cuidado de los diferentes ecosistemas.',
          'La vida en zonas rurales y urbanas.',
          'Recursos naturales. Sostenibilidad, energías limpias y naturales.',
          'Fenómenos naturales: identificación y repercusión en la vida de las personas.',
          'Respeto y protección del medio natural.',
          'Empatía, cuidado y protección de los animales. Respeto de sus derechos.',
          'Respeto por el patrimonio cultural presente en el medio físico.',
        ],
      },
    },
  },

  'Comunicación y Representación de la Realidad': {
    name: 'Comunicación y Representación de la Realidad',
    courseKeys: [...INFANTIL_CLM_CICLES],
    courseLabels: INFANTIL_CLM_CICLE_LABELS,
    blocs: {
      'A. Intención y elementos de la interacción comunicativa': {
        '0-3': [
          'El deseo de comunicarse. La emoción y la proximidad como base del intercambio comunicativo.',
          'La expresión facial y corporal: gestos de intención, necesidad, estado de ánimo, así como las sensaciones que los acompañan.',
          'El contacto e intercambio visual.',
          'Las primeras interacciones tónico-emocionales y posturales. Expresiones faciales y gestuales. El diálogo corporal.',
          'Nanas, canciones de arrullo y juegos de regazo.',
          'Actitudes comunicativas significativas: atención conjunta, mirada referencial y comprensión de las expresiones emocionales de la persona adulta y reacción ante ellas.',
          'Los objetos de uso compartido como mediadores en los primeros contextos de interacción.',
          'Estrategias que facilitan los intercambios en situaciones comunicativas que potencian el respeto y la igualdad: el contacto visual con el interlocutor, la escucha activa y espera para intervenir, el turno de diálogo y la alternancia.',
        ],
        '3-6': [
          'Repertorio comunicativo y elementos de comunicación no verbal.',
          'Comunicación interpersonal: empatía y asertividad.',
          'Convenciones sociales del intercambio lingüístico en situaciones comunicativas que potencien el respeto y la igualdad: atención, escucha activa, turnos de diálogo y alternancia.',
          'Interés y respeto ante la diversidad de lenguas y niveles de competencia lingüística.',
        ],
      },
      'B. Las lenguas y sus hablantes': {
        '0-3': ['Repertorio lingüístico individual.', 'Realidad lingüística del aula y el entorno. Palabras o expresiones que responden a sus necesidades o intereses.'],
        '3-6': [
          'Repertorio lingüístico individual.',
          'La realidad lingüística del entorno. Fórmulas o expresiones que responden a sus necesidades o intereses.',
          'Mensajes en diferentes representaciones o manifestaciones artísticas y digitales.',
          'Aproximación a la lengua extranjera: elementos para una comunicación funcional básica.',
        ],
      },
      'C. Comunicación verbal oral: expresión, comprensión, diálogo': {
        '0-3': [
          'El lenguaje oral en situaciones cotidianas: primeras conversaciones con sonidos, vocalizaciones y juegos de interacción.',
          'Expresión de necesidades, vivencias y emociones.',
          'Lenguaje oral como regulador de la propia conducta.',
          'Repertorio lingüístico: situaciones comunicativas, conversaciones colectivas, léxico y discurso.',
          'La expresión sonora y la articulación de las palabras. Juegos de imitación, lingüísticos y de percepción auditiva.',
          'Comprensión del mundo y de mensajes a través de la escucha activa.',
          'Vocabulario. Denominación de la realidad.',
        ],
        '3-6': [
          'El lenguaje oral en situaciones cotidianas: conversaciones, juegos de interacción social y expresión de vivencias.',
          'Textos orales formales e informales en diferentes contextos.',
          'Intención comunicativa de los mensajes.',
          'Verbalización de la secuencia de acciones en una acción planificada.',
          'Discriminación auditiva y conciencia fonológica.',
          'Saludos, fórmulas de cortesía y respuestas cortas en intercambios comunicativos de la vida cotidiana en lengua extranjera.',
        ],
      },
      'D. Aproximación al lenguaje escrito': {
        '0-3': ['Formas escritas y otros símbolos presentes en el entorno.', 'Acercamiento a los usos del lenguaje escrito.', 'Lectura a través de modelos lectores de referencia.'],
        '3-6': [
          'Los usos sociales de la lectura y la escritura. Funcionalidad y significatividad en situaciones comunicativas.',
          'Textos escritos en diferentes soportes.',
          'Intención comunicativa y acercamiento a las principales características textuales y paratextuales.',
          'Primeras hipótesis para la interpretación y compresión.',
          'Las propiedades del sistema de escritura: hipótesis cuantitativas y cualitativas.',
          'Aproximación al código escrito, evolucionando desde las escrituras indeterminadas, respetando el proceso evolutivo.',
          'Otros códigos de representación gráfica: pictogramas, imágenes, símbolos, números…',
          'Iniciación a estrategias de búsqueda de información, reelaboración y comunicación.',
          'Situaciones de lectura individual o a través de modelos lectores de referencia.',
        ],
      },
      'E. Aproximación a la educación literaria': {
        '0-3': [
          'Textos literarios infantiles orales y escritos con contenido adecuado al desarrollo infantil, que desarrollen valores sobre la cultura de paz, los derechos de la infancia, la igualdad de género y la diversidad funcional y étnico-cultural.',
          'Situaciones de lectura. Vínculos afectivos y lúdicos a través de modelos lectores de referencia.',
        ],
        '3-6': [
          'Textos literarios infantiles orales y escritos adecuados al desarrollo infantil, que preferiblemente desarrollen valores sobre cultura de paz, derechos de la infancia, igualdad de género y diversidad funcional y étnico-cultural.',
          'Vínculos afectivos y lúdicos con los textos literarios.',
          'Conversaciones y diálogos en torno a textos literarios libres de prejuicios y estereotipos sexistas.',
          'Referentes literarios de Castilla-La Mancha.',
          'Formas literarias en lengua extranjera: cuentos, relatos, rimas, retahílas y canciones.',
        ],
      },
      'F. El lenguaje y la expresión musicales': {
        '0-3': [
          'Reconocimiento, evocación y reproducción de canciones y otras manifestaciones musicales. Sentimientos y emociones que transmiten.',
          'Posibilidades sonoras y expresivas de la voz, el cuerpo, los objetos y los instrumentos.',
          'La escucha como descubrimiento y disfrute del entorno.',
          'Sonidos, entonación y ritmo.',
        ],
        '3-6': [
          'Posibilidades sonoras, expresivas y creativas de la voz, el cuerpo, los objetos cotidianos de su entorno y los instrumentos.',
          'Propuestas musicales en distintos formatos.',
          'El sonido, el silencio y sus cualidades. El código musical.',
          'Intención expresiva en las producciones musicales.',
          'La escucha musical como disfrute.',
        ],
      },
      'G. El lenguaje y la expresión plásticos y visuales': {
        '0-3': ['Materiales, colores, volúmenes, texturas, técnicas y procedimientos plásticos.', 'Expresiones plásticas y visuales. Otras expresiones artísticas.'],
        '3-6': [
          'Materiales específicos e inespecíficos, elementos, técnicas y procedimientos plásticos.',
          'Intención expresiva de producciones plásticas y pictóricas.',
          'Manifestaciones plásticas variadas.',
          'Otras manifestaciones artísticas.',
        ],
      },
      'H. El lenguaje y la expresión corporales': {
        '0-3': [
          'Expresión libre a través del gesto y el movimiento.',
          'Desplazamientos por el espacio.',
          'Juegos de imitación a través de marionetas, muñecos u otros objetos de representación espontánea.',
        ],
        '3-6': [
          'Posibilidades expresivas y comunicativas del propio cuerpo en actividades individuales y grupales libres de prejuicios y estereotipos sexistas.',
          'Juegos de expresión corporal y dramática.',
        ],
      },
      'I. Alfabetización digital': {
        '0-3': [],
        '3-6': [
          'Aplicaciones y herramientas digitales con distintos fines: creación, comunicación, aprendizaje y disfrute.',
          'Uso saludable y responsable de las tecnologías digitales.',
          'Lectura e interpretación crítica de imágenes e información recibida a través de medios digitales.',
          'Función educativa de los dispositivos y elementos tecnológicos de su entorno.',
        ],
      },
    },
  },
};
