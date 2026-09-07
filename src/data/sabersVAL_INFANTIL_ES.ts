// Sabers bàsics (continguts) de l'Educació Infantil, Comunitat Valenciana —
// generat a partir del DECRET 100/2022, de 29 de juliol, del Consell, pel
// qual s'estableix l'ordenació i el currículum d'Educació Infantil (DOGV
// núm. 9384, 10/08/2022), Annex II. Font: dogv.gva.es.
//
// Aquesta és la versió en castellà (el decret es publica
// íntegrament en els dos idiomes). Vegeu curriculum/index.ts per veure com
// se selecciona en funció de l'idioma configurat (mateix criteri que
// sabersVAL_ES.ts / sabersVAL_VAL.ts per a Primària).
import type { SaberAreaGeneric } from './curriculum/types';

export const INFANTIL_VALENCIA_CICLES = ['0-3', '3-6'] as const;

export const SABERS_AREAS_INFANTIL_VALENCIA_ES = [
  "Crecimiento en Armonía",
  "Descubrimiento y Exploración del Entorno",
  "Comunicación y Representación de la Realidad",
];

export const SABERS_INFANTIL_VALENCIA_ES: Record<string, SaberAreaGeneric> = {
  "Crecimiento en Armonía": {
    name: "Crecimiento en Armonía",
    courseKeys: [...INFANTIL_VALENCIA_CICLES],
    courseLabels: {},
    blocs: {
      "A. Construcción de la identidad y la autonomía en relación consigo mismo": {
        '0-3': [
          "Partes del cuerpo: características individuales y percepción de los cambios físicos.",
          "Juego exploratorio, sensorial, simbólico y motor.",
          "El movimiento libre en las diversas situaciones de la vida cotidiana.",
          "Control dinámico: desplazamientos en el espacio y coordinación visomotriz a través del contacto con objetos y materiales.",
          "Iniciación en el control estático: respiración, relajación, tonicidad y autocontrol.",
          "Acciones relacionadas con las necesidades básicas cotidianas de alimentación, descanso e higiene personal en espacios no habituales.",
          "Estrategias para identificar y evitar situaciones de riesgo y peligro.",
          "Identificación y adecuación de estados emocionales a las diversas situaciones: tiempo de espera, pequeñas frustraciones asociadas a la satisfacción de necesidades básicas y cuidados.",
          "Satisfacción por los progresos logrados que generen seguridad y confianza.",
          "Acciones básicas en la resolución de tareas sencillas y retos con demanda de ayuda.",
          "Pequeñas responsabilidades en juegos, situaciones y actividades.",
        ],
        '3-6': [
          "Imagen global y segmentaria del cuerpo: características individuales y percepción de los cambios físicos.",
          "Autoimagen positiva y ajustada ante los otros. Identificación y respeto a las diferencias.",
          "Juego exploratorio, sensorial, simbólico, motor y de reglas.",
          "El movimiento como fuente de aprendizaje y desarrollo.",
          "Control dinámico: coordinación general, equilibrio, coordinación visomotriz. Desplazamientos en diferentes espacios.",
          "Control estático: respiración, tonicidad, relajación y autocontrol.",
          "Estrategias para desarrollar la seguridad en sí mismo, el reconocimiento de sus necesidades, posibilidades y limitaciones.",
          "Estrategias para manifestar y regular las necesidades básicas en relación con el bienestar personal.",
          "Participación en los hábitos y las prácticas sostenibles y responsables relacionadas con la alimentación, la higiene, el descanso, el autocuidado y el cuidado del entorno.",
          "Actitudes de prudencia ante situaciones de riesgo o peligro.",
          "Estrategias para compartir pensamientos y planificar acciones que ayuden a resolver un problema o una tarea de manera creativa en situaciones de la vida cotidiana.",
          "Seguridad y confianza en las propias posibilidades de aprendizaje y satisfacción por los progresos conseguidos.",
          "Compromiso en juegos, situaciones y actividades.",
        ],
      },
      "B. Construcción de la identidad y la autonomía en relación con los otros": {
        '0-3': [
          "La transición del grupo familiar al grupo social de la escuela.",
          "Interés a conocer otras personas.",
          "Vinculación afectiva con las personas de referencia.",
          "Las primeras organizaciones sociales y grupos de pertenencia: la familia, la casa y la escuela.",
          "Estrategias para proponer, comunicar experiencias y participar activamente en situaciones de la vida cotidiana y gestionar posibles conflictos.",
        ],
        '3-6': [
          "La transición del grupo familiar al grupo social de la escuela.",
          "La amistad como elemento de protección, de prevención de la violencia y de desarrollo de la cultura de la paz.",
          "Fórmulas de cortesía e interacción social positiva.",
          "Sentido de pertenencia al grupo y relaciones con las personas de su entorno.",
          "Las primeras organizaciones sociales: la familia, la casa, la escuela y otros grupos sociales. Características, funciones y relaciones.",
          "Estrategias para la resolución pacífica y dialogada de conflictos surgidos en las interacciones con los otros.",
          "Pautas básicas de convivencia que incluyan el respeto a las diferencias y la igualdad de género.",
          "Estrategias para proponer, comunicar y participar activamente en la toma de decisiones de situaciones de la vida cotidiana.",
        ],
      },
    },
  },

  "Descubrimiento y Exploración del Entorno": {
    name: "Descubrimiento y Exploración del Entorno",
    courseKeys: [...INFANTIL_VALENCIA_CICLES],
    courseLabels: {},
    blocs: {
      "A. Observación y experimentación del entorno inmediato físico y natural": {
        '0-3': [
          "Exploración sensorial.",
          "Interés y curiosidad durante la exploración.",
          "Características elementales de los objetos y materiales con los cuales se relacionan.",
          "Iniciación al establecimiento de relaciones de orden, correspondencia, clasificación y comparación.",
          "Sensaciones de los elementos que forman parte de su entorno próximo a través de las posibilidades perceptivas.",
          "Nociones espaciales básicas en relación con el propio cuerpo y con los objetos que lo rodean.",
          "Cuantificadores básicos contextualizados.",
          "Necesidades de los seres vivos.",
          "Procesos y cambios perceptibles en aquello que nos rodea.",
          "Elementos naturales, observación y experimentación.",
        ],
        '3-6': [
          "Sensaciones, el sentido socioemocional de los descubrimientos mediante la experiencia en el mundo que los rodea.",
          "Interés, curiosidad y actitud de respeto durante la exploración.",
          "Calidades o atributos de los objetos, desde la integración sensorial del mundo.",
          "Relaciones de orden, clasificación, agrupación, comparación y correspondencia.",
          "Características, propiedades y comportamientos de objetos y materiales.",
          "Exploración de la capacidad, el peso, el tamaño, el volumen, las mezclas y los trasvases.",
          "Los objetos, las herramientas y la relación que tienen con el ser humano en varios contextos experimentales próximos a la niña o el niño.",
          "Nociones espaciales básicas en relación con el propio cuerpo, los objetos y las acciones, tanto en reposo como en movimiento.",
          "Cuantificadores básicos contextualizados: funcionalidad de los números en la vida cotidiana, situaciones de medida. El tiempo y la organización de este.",
          "Las necesidades de los seres vivos y las diferencias con los objetos inertes desde las experiencias más próximas a la infancia.",
          "Los cambios en los seres vivos, objetos, materiales y elementos del entorno próximo: crecimiento, transformaciones, procesos y reacciones elementales y perceptibles.",
          "Elementos naturales. Las relaciones básicas entre los seres humanos, los animales y las plantas. Repercusión en la vida cotidiana.",
        ],
      },
      "B. Curiosidad, iniciación al pensamiento científico y al razonamiento lógico desde la creatividad": {
        '0-3': [
          "Interacción con los otros y con el entorno. Conexiones entre lo que se conoce y lo que es nuevo.",
          "Observación y experimentación sobre el entorno próximo. La intencionalidad.",
          "Iniciación en la planificación y la toma de decisiones.",
          "Iniciación al sentido espacial y numérico.",
          "Observación y curiosidad ante aquello que nos rodea.",
        ],
        '3-6': [
          "Las relaciones entre lo que se conoce y lo que es nuevo.",
          "La interacción en el entorno social, físico y natural.",
          "Estrategias de investigación elementales: observación, experimentación, formulación y comprobación de hipótesis.",
          "Iniciativa en la planificación siguiendo procedimientos científicos en el entorno próximo.",
          "Procesos y herramientas para proponer, anticipar y comunicar soluciones a problemas sencillos de su entorno desde el descubrimiento, la creatividad y la imaginación.",
          "Autoevaluación y coevaluación de los planteamientos y de los resultados encontrados.",
          "Satisfacción propia y compartida en los procesos y los descubrimientos.",
          "Sentido numérico, sentido de la medida y sentido espacial.",
        ],
      },
      "C. Valoración, respeto, cura y acción sobre el entorno": {
        '0-3': [
          "Los elementos y los fenómenos naturales de su entorno.",
          "Efecto de las acciones propias en el medio físico y natural.",
          "El cuidado del entorno y de los seres vivos.",
        ],
        '3-6': [
          "Repercusión de los elementos y fenómenos naturales en la vida de las personas en su entorno próximo.",
          "La influencia de las acciones de las personas en el medio físico y natural. Ejemplos sencillos sobre efectos del cambio climático.",
          "La indagación sobre el entorno: observación, curiosidad y descubrimiento.",
          "Introducción básica a las energías en general y a las energías limpias y naturales, así como al concepto de sostenibilidad desde actitudes respetuosas en su entorno próximo.",
          "Las acciones del ser humano y la repercusión que tienen en el medio.",
          "Cuidado y respeto hacia los seres vivos y los entornos que habitan.",
        ],
      },
    },
  },

  "Comunicación y Representación de la Realidad": {
    name: "Comunicación y Representación de la Realidad",
    courseKeys: [...INFANTIL_VALENCIA_CICLES],
    courseLabels: {},
    blocs: {
      "A. Descubrimiento de los lenguajes": {
        '0-3': [
          "Los objetos de uso compartido como mediadores simbólicos en los primeros contextos de interacción.",
          "Posibilidades sonoras y expresivas de la voz, del cuerpo, de los objetos y de los instrumentos.",
          "La imagen y el sonido en el entorno físico.",
          "La escucha como descubrimiento y goce del entorno.",
          "Canciones y otras manifestaciones musicales. Canciones de cuna, non-non y juegos de regazo. Sensaciones que las acompañan, reconocimiento, evocación y reproducción.",
          "Exploración y expresión a través del gesto y del movimiento libre. Los desplazamientos por el espacio.",
          "Materiales, colores, texturas, técnicas y procedimientos plásticos.",
          "El juego simbólico como medio de expresión.",
          "Deseo de comunicarse e interés en participar en diferentes propuestas artísticas.",
          "Aproximación a los códigos de representación gráfica (dibujo, imágenes, símbolos, etc.) en varios soportes. Primeras representaciones indeterminadas.",
        ],
        '3-6': [
          "Calidades expresivas y creativas de los diferentes materiales y objetos cotidianos: naturales, artificiales y de desecho.",
          "Posibilidades creativas y comunicativas de aplicaciones y herramientas digitales.",
          "La imagen y el sonido en el entorno físico y virtual.",
          "Aproximación al lenguaje sonoro y a las posibilidades expresivas y creativas de la voz, el cuerpo, los objetos cotidianos del entorno y los instrumentos.",
          "Identificación y discriminación visual y auditiva.",
          "Canciones y otras manifestaciones musicales y artísticas. Sentimientos, emociones y acciones que sugieren.",
          "Cuidado de la voz. Relajación e intensidad vocal.",
          "El gesto, el movimiento, la mímica, la danza y el teatro. Interés y participación.",
          "Materiales específicos e inespecíficos, herramientas, técnicas y elementos en las representaciones plásticas.",
          "Juegos de expresión corporal y dramática.",
          "Intención expresiva y el deseo de comunicarse a partir de las producciones artísticas.",
          "Aproximación a los códigos de representación gráfica: dibujo, imágenes, símbolos, signos y números en diferentes apoyos. Usos sociales de la comunicación.",
        ],
      },
      "B. Posibilidades comunicativas y expresivas del lenguaje verbal": {
        '0-3': [
          "Escucha activa y comprensión de palabras y mensajes orales sencillos en las dos lenguas oficiales.",
          "Sonidos, expresión sonora y articulación de las palabras. Juegos de imitación, lingüísticos y de percepción auditiva.",
          "Interés por participar en interacciones orales y situaciones habituales de comunicación desde la realidad lingüística.",
          "El lenguaje oral en situaciones cotidianas: expresión de necesidades, emociones y vivencias, primeras conversaciones con sonidos, vocalizaciones y juegos de interacción.",
          "Estrategias que facilitan los intercambios: contacto visual con el interlocutor, escucha atenta y espera para intervenir en situaciones cotidianas que favorezcan el respeto y la igualdad.",
          "Interés y atención por escuchar textos leídos por otras personas.",
          "Observación y manipulación de textos e imágenes en varios formatos: libros, revistas, carteles, etiquetas.",
          "Repertorio lingüístico individual. Léxico de las lenguas oficiales relacionado con situaciones cotidianas.",
        ],
        '3-6': [
          "Comprensión de mensajes orales en las dos lenguas oficiales.",
          "Articulación de palabras y estructuras sencillas. Juegos de imitación lingüísticos, de percepción auditiva y conciencia fonológica.",
          "Interés por participar en interacciones orales y diferentes situaciones de comunicación.",
          "Expresión de mensajes que respondan a sus necesidades e intereses y sobre situaciones diferentes: cotidianas, vividas o imaginadas.",
          "Estrategias y convenciones sociales del intercambio lingüístico en situaciones comunicativas que potencian el respeto y la igualdad: atención, escucha activa, turnos de diálogo y alternancia.",
          "Usos sociales de la lectura y la escritura. Modelos lectores de referencia.",
          "Textos orales formales e informales en las dos lenguas oficiales con apoyos de otros lenguajes.",
          "Repertorio lingüístico: situaciones y funciones comunicativas y representativas. Conversaciones colectivas, léxico en las lenguas oficiales y discurso.",
          "Aproximación a la lengua extranjera. Elementos para una comunicación funcional básica.",
          "Relatos orales en lengua extranjera.",
        ],
      },
      "C. Patrimonio y cultura": {
        '0-3': [
          "Celebraciones, costumbres y tradiciones etnoculturales presentes en el entorno.",
          "Los espacios letrados y culturales como fuente de goce.",
          "Participación e interés en los diversos géneros literarios infantiles de nuestra cultura popular: cuentos, relatos, adivinanzas, teatro, trabalenguas, poesía, patrañas, fábulas, leyendas, canciones de cuna... sin estereotipos sexistas, como fuente de placer y aprendizaje.",
          "Convivencia con la diversidad lingüística y cultural del aula y del entorno.",
        ],
        '3-6': [
          "Las manifestaciones artísticas musicales, plásticas, visuales, audiovisuales y gastronómicas de su entorno como parte del patrimonio.",
          "Celebraciones, costumbres y juegos tradicionales de la cultura propia de la Comunidad. Aprecio por las señas de identidad etno-culturales presentes en su entorno.",
          "Los espacios letrados y culturales, como fuentes de información y goce.",
          "Características y posibilidades representativas de varios géneros literarios infantiles de diferentes culturas (cuentos, relatos, adivinanzas, teatro, trabalenguas, poesía, patrañas, fábulas, leyendas, canciones de cuna...).",
          "Actitud positiva hacia la diversidad lingüística y cultural del entorno social y escolar.",
          "Interés por el uso del valenciano en cualquier situación, especialmente cuando no es la lengua habitual.",
          "Curiosidad e interés por los aspectos diferenciales de las lenguas extranjeras, en comparación con las lenguas oficiales.",
        ],
      },
    },
  },

};
