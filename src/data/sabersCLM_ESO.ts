// Saberes básicos de la Educación Secundaria Obligatoria (ESO) de
// Castilla-La Mancha, generados a partir del Decreto 82/2022, de 12 de
// julio, por el que se establece la ordenación y el currículo de la
// Educación Secundaria Obligatoria en la comunidad autónoma de
// Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo II.
//
// El decreto regula 28 materias (11 troncales/comunes + 17 optativas). Por
// petición del usuario, esta primera integración cubre únicamente las 11
// materias troncales: Biología y Geología, Educación Física, Educación en
// Valores Cívicos y Éticos, Educación Plástica Visual y Audiovisual, Física
// y Química, Geografía e Historia, Lengua Castellana y Literatura, Lengua
// Extranjera, Matemáticas, Música y Tecnología y Digitalización.
//
// A diferencia de Primaria (que usa un único conjunto de ciclos para todas
// las áreas), en ESO cada materia tiene su propia distribución de cursos
// según el propio decreto:
//   - Biología y Geología, Física y Química, Música: '1-3' (1º a 3º) y '4'.
//   - Educación Física, Geografía e Historia, Lengua Castellana y
//     Literatura, Lengua Extranjera: '1-2' y '3-4'.
//   - Educación en Valores Cívicos y Éticos, Educación Plástica Visual y
//     Audiovisual, Tecnología y Digitalización: el decreto no distingue
//     cursos (una única sección de "Criterios de evaluación" y "Saberes
//     básicos" para toda la materia), por lo que se usa una clave única
//     'eso'.
//   - Matemáticas: '1-2', '3', '4A' (Matemáticas A de 4º) y '4B'
//     (Matemáticas B de 4º), ya que el decreto configura el último curso en
//     dos opciones con saberes y criterios diferenciados.
import type { SaberAreaGeneric } from './curriculum/types';

export const CLM_ESO_LABELS_13_4: Record<string, string> = {
  '1-3': '1º a 3º de ESO',
  '4': '4º de ESO',
};

export const CLM_ESO_LABELS_12_34: Record<string, string> = {
  '1-2': '1º y 2º de ESO',
  '3-4': '3º y 4º de ESO',
};

export const CLM_ESO_LABELS_SINGLE: Record<string, string> = {
  eso: 'Educación Secundaria Obligatoria (1º a 4º)',
};

export const CLM_ESO_LABELS_MAT: Record<string, string> = {
  '1-2': '1º y 2º de ESO',
  '3': '3º de ESO',
  '4A': '4º de ESO (Matemáticas A)',
  '4B': '4º de ESO (Matemáticas B)',
};

export const SABERS_AREAS_ESO_CLM = [
  'Biología y Geología',
  'Educación Física',
  'Educación en Valores Cívicos y Éticos',
  'Educación Plástica, Visual y Audiovisual',
  'Física y Química',
  'Geografía e Historia',
  'Lengua Castellana y Literatura',
  'Lengua Extranjera',
  'Matemáticas',
  'Música',
  'Tecnología y Digitalización',
];

export const SABERS_CLM_ESO: Record<string, SaberAreaGeneric> = {
  'Biología y Geología': {
    name: 'Biología y Geología',
    courseKeys: ['1-3', '4'],
    courseLabels: CLM_ESO_LABELS_13_4,
    blocs: {
      'A. Proyecto científico': {
        '1-3': [
          'Hipótesis, preguntas y conjeturas: planteamiento con perspectiva científica.',
          'Estrategias para la búsqueda de información, la colaboración y la comunicación de procesos, resultados o ideas científicas: herramientas digitales y formatos de uso frecuente en ciencia (presentación, gráfica, vídeo, póster, informe, etc.).',
          'Fuentes fidedignas de información científica: reconocimiento y utilización.',
          'La respuesta a cuestiones científicas mediante la experimentación y el trabajo de campo: utilización de los instrumentos y espacios necesarios (laboratorio, aulas, entorno, etc.) de forma adecuada.',
          'Modelado como método de representación y comprensión de procesos o elementos de la naturaleza.',
          'Métodos de observación y de toma de datos de fenómenos naturales.',
          'Métodos de análisis de resultados. Diferenciación entre correlación y causalidad.',
          'La labor científica y las personas dedicadas a la ciencia destacando las aportaciones desde Castilla-La Mancha: contribución a las ciencias biológicas, geológicas y ambientales e importancia social. El papel de la mujer en la ciencia.',
        ],
        '4': [
          'Hipótesis, preguntas y conjeturas: planteamiento con perspectiva científica.',
          'Estrategias para la búsqueda de información, la colaboración y la comunicación de procesos, resultados o ideas científicas: herramientas digitales y formatos de uso frecuente en ciencia (presentación, gráfica, vídeo, póster, informe, etc.).',
          'Fuentes fidedignas de información científica: reconocimiento y utilización.',
          'Controles experimentales (positivos y negativos): diseño e importancia para la obtención de resultados científicos objetivos y fiables.',
          'Respuesta a cuestiones científicas mediante la experimentación y el trabajo de campo: utilización de los instrumentos y espacios necesarios (laboratorio, aulas, entorno, etc.) de forma adecuada y precisa.',
          'Modelado para la representación y comprensión de procesos o elementos de la naturaleza.',
          'Métodos de observación y de toma de datos de fenómenos naturales.',
          'Métodos de análisis de resultados. Diferenciación entre correlación y causalidad.',
          'La labor científica y las personas dedicadas a la ciencia: contribución a las ciencias biológicas y geológicas e importancia social. El papel de la mujer en la ciencia.',
          'La evolución histórica del saber científico: la ciencia como labor colectiva, interdisciplinar y en continua construcción.',
        ],
      },
      'B. Geología': {
        '1-3': [
          'Conceptos de roca y mineral: características y propiedades. Concepto de fósil.',
          'Estrategias de clasificación de las rocas: sedimentarias, metamórficas e ígneas. El ciclo de las rocas.',
          'Rocas y minerales relevantes o del entorno: observación e identificación en el laboratorio y/o del entorno, destacando yacimientos mineralógicos de Castilla-La Mancha.',
          'Usos de los minerales y las rocas: su utilización en la fabricación de materiales y objetos cotidianos.',
          'La estructura básica de la geosfera.',
        ],
        '4': [
          'Relieve y paisaje: diferencias, su importancia como recursos y factores que intervienen en su formación y modelado.',
          'Estructura y dinámica de la geosfera. Métodos de estudio.',
          'Los efectos globales de la dinámica de la geosfera desde la perspectiva de la tectónica de placas.',
          'Procesos geológicos externos e internos: diferencias y relación con los riesgos naturales. Medidas de prevención y mapas de riesgos.',
          'Los cortes geológicos: interpretación y trazado de la historia geológica que reflejan mediante la aplicación de los principios de estudio de la historia de la Tierra (horizontalidad, superposición, intersección, sucesión faunística, etc.). Fósiles.',
        ],
      },
      'C. La célula': {
        '1-3': [
          'La célula como unidad estructural y funcional de los seres vivos.',
          'La célula procariota, la célula eucariota animal y la célula eucariota vegetal, y sus partes.',
          'Principales diferencias entre los tipos de células existentes.',
          'Preparación, observación y comparación de muestras microscópicas.',
        ],
        '4': [
          'Las fases del ciclo celular.',
          'La función biológica de la mitosis, la meiosis y sus fases.',
          'Destrezas de observación de las distintas fases de la mitosis al microscopio.',
        ],
      },
      'D. Seres vivos': {
        '1-3': [
          'Los seres vivos: diferenciación y clasificación en los principales reinos.',
          'Los principales grupos taxonómicos: observación de especies del entorno y clasificación a partir de sus características distintivas.',
          'Las especies del entorno: estrategias de identificación (guías, claves dicotómicas, herramientas digitales, visu, etc.). Principales especies autóctonas y endémicas de Castilla-La Mancha.',
          'Los animales como seres sintientes: semejanzas y diferencias con los seres vivos no sintientes.',
        ],
      },
      'E. Ecología y sostenibilidad': {
        '1-3': [
          'Principales ecosistemas: sus componentes bióticos y abióticos y los tipos de relaciones intraespecíficas e interespecíficas. Análisis del entorno de Castilla-La Mancha.',
          'La importancia de la conservación de los ecosistemas, la biodiversidad, la problemática de las especies en peligro de extinción y la implantación de un modelo de desarrollo sostenible.',
          'Las funciones de la atmósfera y la hidrosfera y su papel esencial para la vida en la Tierra.',
          'Las interacciones entre atmósfera, hidrosfera, geosfera y biosfera, su papel en la edafogénesis y en el modelado del relieve y su importancia para la vida. Las funciones del suelo.',
          'Las causas, naturales y antrópicas, del cambio climático y sus consecuencias sobre los ecosistemas.',
          'La importancia de los hábitos sostenibles (consumo responsable, prevención y gestión de residuos, respeto al medio ambiente, etc.).',
          'La relación entre la salud medioambiental, humana y de otros seres vivos: one health (una sola salud).',
        ],
      },
      'F. Cuerpo humano': {
        '1-3': [
          'Importancia de la función de nutrición. Los aparatos que participan en ella.',
          'Anatomía y fisiología básicas de los aparatos digestivo, respiratorio, circulatorio, excretor y reproductor.',
          'Visión general de la función de relación: receptores sensoriales, centros de coordinación y órganos efectores.',
          'Relación entre los principales sistemas y aparatos del organismo implicados en las funciones de nutrición, relación y reproducción mediante la aplicación de conocimientos de fisiología y anatomía.',
        ],
      },
      'G. Hábitos saludables': {
        '1-3': [
          'Características y elementos propios de una dieta saludable y su importancia.',
          'Conceptos de sexo y sexualidad: importancia del respeto hacia la libertad y la diversidad sexual y hacia la igualdad de género, dentro de una educación sexual integral como parte de un desarrollo armónico.',
          'Educación afectivo-sexual desde la perspectiva de la igualdad entre personas y el respeto a la diversidad sexual. La importancia de las prácticas sexuales responsables. La asertividad y el autocuidado. La prevención de infecciones de transmisión sexual (ITS) y de embarazos no deseados. El uso adecuado de métodos anticonceptivos y de métodos de prevención de ITS.',
          'Las drogas legales e ilegales: sus efectos perjudiciales sobre la salud de los consumidores y de quienes están en su entorno próximo.',
          'Los hábitos saludables: su importancia en la conservación de la salud física, mental y social (higiene del sueño, hábitos posturales, uso responsable de las nuevas tecnologías, actividad física, autorregulación emocional, cuidado y corresponsabilidad, etc.).',
        ],
      },
      'H. Salud y enfermedad': {
        '1-3': [
          'Concepto de enfermedades infecciosas y no infecciosas: diferenciación según su etiología.',
          'Medidas de prevención y tratamientos de las enfermedades infecciosas en función de su agente causal y la importancia del uso adecuado de los antibióticos.',
          'Las barreras del organismo frente a los patógenos (mecánicas, estructurales, bioquímicas y biológicas).',
          'Mecanismos de defensa del organismo frente a agentes patógenos (barreras externas y sistema inmunitario): su papel en la prevención y superación de enfermedades infecciosas.',
          'La importancia de la vacunación en la prevención de enfermedades y en la mejora de la calidad de vida humana.',
          'Los trasplantes y la importancia de la donación de órganos.',
        ],
      },
      'I. Genética y evolución': {
        '4': [
          'Modelo simplificado de la estructura del ADN y del ARN y relación con su función y síntesis.',
          'Estrategias de extracción de ADN de una célula eucariota.',
          'Etapas de la expresión génica, características del código genético y resolución de problemas relacionados con estas.',
          'Relación entre las mutaciones, la replicación del ADN, el cáncer, la evolución y la biodiversidad.',
          'El proceso evolutivo de las características de una especie determinada a la luz de la teoría neodarwinista y de otras teorías con relevancia histórica (lamarckismo y darwinismo).',
          'Fenotipo y genotipo: definición y diferencias.',
          'Estrategias de resolución de problemas sencillos de herencia genética de caracteres con relación de dominancia y recesividad con uno o dos genes.',
          'Estrategias de resolución de problemas sencillos de herencia del sexo y de herencia genética de caracteres con relación de codominancia, dominancia incompleta, alelismo múltiple y ligada al sexo con uno o dos genes.',
        ],
      },
      'J. La Tierra en el universo': {
        '4': [
          'El origen del universo y del sistema solar.',
          'Componentes del sistema solar: estructura y características.',
          'Hipótesis sobre el origen de la vida en la Tierra.',
          'Principales investigaciones en el campo de la astrobiología.',
        ],
      },
    },
  },

  'Educación Física': {
    name: 'Educación Física',
    courseKeys: ['1-2', '3-4'],
    courseLabels: CLM_ESO_LABELS_12_34,
    blocs: {
      'A. Vida activa y saludable': {
        '1-2': [
          'Salud física: tasa mínima de actividad física diaria y semanal. Adecuación del volumen y la intensidad de la tarea a las características personales. Alimentación saludable y valor nutricional de los alimentos. Educación postural: técnicas básicas de descarga postural y relajación. Musculatura del core (zona media o lumbo-pélvica) y su relación con el mantenimiento de la postura. Cuidado del cuerpo: calentamiento general autónomo. Pautas para tratar el dolor muscular de origen retardado.',
          'Salud social: efectos sobre la salud de malos hábitos vinculados a comportamientos sociales. Análisis crítico de los estereotipos corporales, de género y competencia motriz, así como de los comportamientos violentos e incitación al odio en el deporte.',
          'Salud mental: aceptación de limitaciones y posibilidades de mejora ante las situaciones motrices. La actividad física como fuente de disfrute, liberación de tensiones, cohesión social y superación personal. Reflexión sobre actitudes negativas hacia la actividad física derivadas de ideas preconcebidas, prejuicios, estereotipos o experiencias negativas. Trastornos alimenticios asociados a la práctica de la actividad física y deporte.',
        ],
        '3-4': [
          'Salud física: control de resultados y variables fisiológicas básicas como consecuencia del ejercicio físico. Autorregulación y planificación del entrenamiento. Alimentación saludable y análisis crítico de la publicidad (dietas no saludables, fraudulentas o sin base científica. Alimentos no saludables y similares). Educación postural: movimientos, posturas y estiramientos ante dolores musculares. Pautas para tratar el dolor muscular de origen retardado. Ergonomía en actividades cotidianas (frente a pantallas, ordenador, mesa de trabajo y similares. Nueva pirámide alimentaria). Cuidado del cuerpo: calentamiento específico autónomo. Prácticas peligrosas, mitos y falsas creencias en torno al cuerpo y a la actividad física.',
          'Salud social: Suplementación y dopaje en el deporte. Riesgos y condicionantes éticos.',
          'Salud mental: exigencias y presiones de la competición. Tipologías corporales predominantes en la sociedad y análisis crítico de su presencia en los medios de comunicación. Efectos negativos de los modelos estéticos predominantes y trastornos vinculados al culto insano al cuerpo (vigorexia, anorexia, bulimia y otros). Creación de una identidad corporal definida y consolidada alejada de estereotipos sexistas.',
        ],
      },
      'B. Organización y gestión de la actividad física': {
        '1-2': [
          'Elección de la práctica física: gestión de las situaciones de competición en base a criterios de lógica, respeto al rival y motivación. Deportes individuales. Conocimiento y práctica de modalidades clásicas y nuevas tendencias en la práctica deportiva individual, tales como: el atletismo, running, marcha nórdica u otros. Juegos de estrategia, como pueden ser el castillo, atrapa la bandera y otros, para el aprendizaje de los principios de ataque y defensa y su transferencia a los deportes colectivos. Práctica de situaciones deportivas cooperativas. Deportes de adversario en los que se apliquen, de forma integrada, los elementos técnicos, tácticos y reglamentarios. Los juegos y deportes alternativos, como el kickbol, ringo, datchball u otros, que propicien el desarrollo de experiencias grupales mediante situaciones de aprendizaje ajustadas a nuestras potencialidades.',
          'Preparación de la práctica motriz: autoconstrucción de materiales como complemento y alternativa en la práctica de actividad física y deporte.',
          'La higiene como elemento imprescindible en la práctica de actividad física y deportiva.',
          'Planificación y autorregulación de proyectos motores: establecimiento de mecanismos de autoevaluación para reconducir los procesos de trabajo. Herramientas digitales para la gestión de la actividad física.',
          'Prevención de accidentes en las prácticas motrices: calzado deportivo y ergonomía. Medidas de seguridad en actividades físicas dentro y fuera del centro escolar.',
          'Actuaciones ante accidentes durante la práctica de actividades físicas. Conducta PAS (proteger, avisar, socorrer). Protocolo 112. Soporte vital básico (SVB). Normas RICE (rest, ice, compression, elevation).',
        ],
        '3-4': [
          'Elección de la práctica física: gestión y enfoque de los diferentes usos y finalidades de la actividad física y del deporte en función del contexto, actividad y compañeros y compañeras de realización. Deportes individuales. Conocimiento y práctica de modalidades clásicas y nuevas tendencias en la práctica deportiva individual, tales como: trail, triatlón, marcha nórdica u otros. Juegos de estrategia y su transferencia al aprendizaje de los principios de los deportes colectivos. Deportes colectivos. Deportes de adversario. Propuestas en las que se profundice, de forma integrada, en los elementos técnicos, tácticos y reglamentarios. Los juegos y deportes alternativos, como el colpbol, goubak, y otros, que permitan el desarrollo de destrezas y habilidades variadas, junto con la adquisición de valores cooperativos.',
          'Preparación de la práctica motriz: mantenimiento y reparación de material deportivo.',
          'Reflexión crítica sobre la importancia de las medidas y pautas de higiene en contextos de práctica de actividad física.',
          'Planificación y autorregulación de proyectos motores: establecimiento de mecanismos para registrar y controlar las aportaciones realizadas por los integrantes del grupo a lo largo de un proyecto. Herramientas digitales para la gestión de la actividad física.',
          'Prevención de accidentes en las prácticas motrices. Gestión del riesgo propio y del riesgo de los demás. Medidas colectivas de seguridad.',
          'Actuaciones ante accidentes. Reanimación mediante desfibrilador automático (DEA) o semiautomático (DESA). Protocolo RCP (reanimación cardiopulmonar). Técnicas específicas e indicios de accidentes cardiovasculares (maniobra de Heimlich, señales de ictus y similares).',
        ],
      },
      'C. Resolución de problemas en situaciones motrices': {
        '1-2': [
          'Toma de decisiones: utilización consciente del cuerpo en función de las características de la actividad, contexto y parámetros espaciales en las que se desarrolla en situaciones motrices individuales. Pautas grupales para optimizar los recursos motrices del grupo de cara a la resolución de la acción/tarea en situaciones cooperativas. Análisis de movimientos y patrones motores del adversario para actuar en consecuencia en situaciones motrices de persecución y de interacción con un móvil. Adecuación de los movimientos propios a las acciones del contrario en situaciones de oposición. Delimitación de estrategias previas de ataque y defensa en función de las características de los integrantes del equipo en situaciones motrices de colaboración-oposición de persecución y de interacción con un móvil.',
          'Capacidades perceptivo-motrices en contexto de práctica: integración del esquema corporal; integración de los diferentes aspectos coordinativos, espaciales y temporales en determinadas secuencias motrices o deportivas.',
          'Capacidades condicionales: desarrollo de las capacidades físicas básicas. Propuestas lúdicas como recurso didáctico.',
          'Habilidades motrices específicas asociadas a la técnica en actividades físico-deportivas.',
          'Creatividad motriz: resolución de retos y situaciones-problema de forma original, tanto individualmente como en grupo.',
          'Actitud crítica ante elementos del entorno que supongan obstáculos a la accesibilidad universal y la movilidad activa, autónoma, saludable y segura.',
        ],
        '3-4': [
          'Toma de decisiones: búsqueda de adaptaciones motrices para resolver eficientemente tareas de cierta complejidad en situaciones motrices individuales. Coordinación de las acciones motrices para la resolución de la acción/tarea en situaciones cooperativas. Búsqueda de la acción más óptima en función de la acción y ubicación del rival, así como del lugar en el que se encuentre el móvil o resultado en situaciones motrices de persecución y de interacción con un móvil. Organización anticipada de los movimientos y acciones individuales en función de las características del contrario en situaciones de oposición de contacto. Delimitación de estrategias previas de ataque y defensa en función de las características de los integrantes del equipo y del equipo rival en situaciones motrices de colaboración-oposición de persecución y de interacción con un móvil.',
          'Capacidades perceptivo-motrices en contexto de práctica: integración del esquema corporal; toma de decisiones previas a la realización de una actividad motriz acerca de los mecanismos coordinativos, espaciales y temporales para resolverla adecuadamente.',
          'Capacidades condicionales: desarrollo de las capacidades físicas básicas. Planificación para el desarrollo de las capacidades físicas básicas: fuerza y resistencia.',
          'Sistemas de entrenamiento.',
          'Habilidades motrices específicas asociadas a la técnica en actividades físico-deportivas: profundización, identificación y corrección de errores comunes.',
          'Creatividad motriz: creación de retos y situaciones-problema con resolución posible a través de los recursos disponibles.',
          'Barreras arquitectónicas y obstáculos del entorno que impidan o dificulten la actividad física autónoma y saludable en el espacio público y vial.',
        ],
      },
      'D. Autorregulación emocional e interacción social en situaciones motrices': {
        '1-2': [
          'Gestión emocional: el estrés en situaciones motrices. Sensaciones, indicios y manifestaciones. Estrategias de autorregulación colectiva del esfuerzo y la capacidad de superación para afrontar desafíos en situaciones motrices. Perseverancia y tolerancia a la frustración en contextos físico-deportivos.',
          'Habilidades sociales: conductas prosociales en situaciones motrices colectivas.',
          'Respeto a las reglas: las reglas de juego como elemento de integración social. Funciones de arbitraje deportivo.',
          'Identificación y rechazo de conductas contrarias a la convivencia en situaciones motrices (comportamientos violentos, discriminación por cuestiones de género, competencia motriz, actitudes xenófobas, racistas, LGTBIfóbicas o sexistas). Asertividad y autocuidado.',
        ],
        '3-4': [
          'Autorregulación emocional: control de estados de ánimo y estrategias de gestión del fracaso en situaciones motrices. Habilidades volitivas y capacidad de superación.',
          'Habilidades sociales: estrategias de negociación y mediación en contextos motrices.',
          'Respeto a las reglas: juego limpio en los distintos niveles de deporte y actividad física.',
          'Identificación y rechazo de conductas contrarias a la convivencia en situaciones motrices (comportamientos violentos, discriminación por cuestiones de género, competencia motriz, actitudes xenófobas, racistas, LGTBIfóbicas o sexistas). Asertividad y autocuidado.',
        ],
      },
      'E. Manifestaciones de la cultura motriz': {
        '1-2': [
          'Aportaciones de la cultura motriz a la herencia cultural. Los juegos y las danzas como manifestación de la interculturalidad en Castilla-La Mancha, tales como: billa, calva, seguidilla manchega u otros.',
          'Usos comunicativos de la corporalidad: expresión de sentimientos y emociones en diferentes contextos. Técnicas de interpretación.',
          'Práctica de actividades rítmico-musicales con carácter artístico-expresivo, tales como: coreografías con combas y montajes de acrogimnasia.',
          'Deporte y perspectiva de género: medios de comunicación y promoción del deporte en igualdad. Presencia y relevancia de figuras del deporte. Análisis crítico. Igualdad de género en las profesiones asociadas al deporte (comentaristas, periodistas, deportistas, técnicos y técnicas, etc.).',
          'Influencia del deporte en la cultura actual: el deporte como fenómeno de masas. Impacto social, aspectos positivos y negativos.',
        ],
        '3-4': [
          'Aportaciones de la cultura motriz a la herencia cultural. Los deportes como seña de identidad cultural.',
          'Usos comunicativos de la corporalidad: técnicas específicas de expresión corporal.',
          'Práctica de actividades rítmico-musicales con carácter artístico-expresivo. Organización de espectáculos y eventos artístico-expresivos.',
          'Deporte y perspectiva de género: historia del deporte desde la perspectiva de género. Igualdad en el acceso al deporte (diferencias según género, país, cultura y otros). Estereotipos de competencia motriz percibida según el género, la edad o cualquier otra característica. Ejemplos de referentes que muestren la diversidad en el deporte.',
          'Influencia del deporte en la cultura actual: deporte e intereses políticos y económicos.',
        ],
      },
      'F. Interacción eficiente y sostenible con el entorno': {
        '1-2': [
          'Normas de uso: respeto a las normas viales en desplazamientos activos cotidianos para una movilidad segura, saludable y sostenible: urbanos y naturales (rutas, grandes rutas, senderos y otras).',
          'La práctica de la bicicleta como medio de transporte habitual.',
          'Nuevos espacios y prácticas deportivas. Utilización de espacios urbanos y naturales desde la motricidad (parkour, skate orientación urbana, circuitos de calistenia naturales y otras).',
          'Aproximación al patrimonio histórico y cultural de Castilla-La Mancha mediante pruebas de orientación, geolocalización y descubrimiento: Rally fotográfico u otras.',
          'Iniciación en diversas actividades físico-deportivas de bajo impacto como rastreo, senderismo, marcha nórdica, escalada u otras, que le permitan al alumnado conocer su entorno natural, disfrutar del mismo y ayudar a su cuidado, conservación y mejora.',
          'Aproximación a las herramientas digitales, como medio de adquisición de información y análisis, en la práctica de nuestras actividades.',
          'Análisis del riesgo en las prácticas físico-deportivas en el medio natural y urbano: medidas de seguridad en actividades de los distintos entornos y posibles consecuencias graves de los mismos.',
          'Consumo responsable: autoconstrucción de materiales para la práctica motriz.',
          'Diseño de actividades físicas en el medio natural y urbano.',
          'Cuidado del entorno próximo, como servicio a la comunidad, durante la práctica de actividad física en entornos naturales y urbanos.',
        ],
        '3-4': [
          'Normas de uso: respeto a las normas viales en los desplazamientos activos cotidianos para una movilidad segura, saludable y sostenible.',
          'La práctica de la bicicleta como medio de transporte habitual.',
          'Nuevos espacios y prácticas deportivas urbanas (crossfit, gimnasios urbanos, circuitos de calistenia o similares).',
          'Aproximación al patrimonio histórico y cultural de Castilla-La Mancha, mediante pruebas de orientación, geolocalización y descubrimiento, como por ejemplo: adventure lab.',
          'Análisis y gestión del riesgo propio y de los demás en las prácticas físico-deportivas en el medio natural y urbano. Medidas colectivas de seguridad.',
          'Aplicación de actividades físico-deportivas en el medio natural tales como: la orientación, el geocaching, carreras de Trail, la bicicleta de montaña o el raid de multiaventura.',
          'Utilidades de las herramientas digitales para facilitar la geolocalización, el registro y seguimiento de actividades, la navegación en entornos naturales no conocidos y la interpretación del entorno.',
          'Consumo responsable: uso sostenible y mantenimiento de recursos urbanos y naturales para la práctica de actividad física.',
          'Diseño y organización de actividades físicas en el medio natural y urbano.',
          'Cuidado del entorno, como servicio a la comunidad, durante la práctica de actividad física en entornos naturales y urbanos.',
        ],
      },
    },
  },

  'Educación en Valores Cívicos y Éticos': {
    name: 'Educación en Valores Cívicos y Éticos',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Autoconocimiento y autonomía moral': {
        eso: [
          'La investigación ética y la resolución de problemas complejos. El pensamiento crítico y filosófico.',
          'La naturaleza humana y la identidad personal. Dignidad, libertad y moralidad.',
          'La educación de las emociones y los sentimientos. La autoestima personal. La igualdad y el respeto mutuo en las relaciones con otras personas. Las relaciones de amistad.',
          'La educación afectivo-sexual. Género y relaciones afectivas y sexuales: heterosexualidad, homosexualidad y bisexualidad, entre otras.',
          'Deseos y razones. La voluntad y el juicio moral. Autonomía y responsabilidad.',
          'La ética como guía de nuestras acciones. La reflexión en torno a lo valioso y los valores: universalismo y pluralismo moral. Normas, virtudes y sentimientos morales. Éticas de la felicidad, éticas del deber y éticas de la virtud.',
          'El conflicto entre legitimidad y legalidad. La objeción de conciencia. Los derechos individuales y el debate en torno a la libertad de expresión.',
          'El problema de la desinformación. La protección de datos y el derecho a la intimidad. El ciberacoso y las situaciones de violencia en las redes. Las conductas adictivas. El impacto de las redes sociales en el equilibrio personal y en las relaciones afectivas.',
        ],
      },
      'B. Sociedad, justicia y democracia': {
        eso: [
          'Las virtudes del diálogo y las normas de argumentación. La resolución pacífica de conflictos. La empatía con los demás.',
          'La naturaleza y origen de la sociedad: competencia y cooperación, egoísmo y altruismo. Las estructuras sociales y los grupos de pertenencia.',
          'La política: ley, poder, soberanía y justicia. Formas de Estado y tipos de gobierno. El Estado de derecho y los valores constitucionales. La democracia: principios, procedimientos e instituciones. La memoria democrática. La guerra, el terrorismo y otras formas de violencia política.',
          'Las distintas generaciones de derechos humanos. Su constitución histórica y relevancia ética. Los derechos de la infancia.',
          'Asociacionismo y voluntariado. La ciudadanía y la participación democrática. Los códigos deontológicos. Las éticas aplicadas.',
          'La desigualdad económica, la lucha contra la pobreza y la feminización de la pobreza. Globalización económica y bienes públicos globales. El comercio justo. El derecho al trabajo, la salud, la educación y la justicia. El valor social de los impuestos.',
          'La igualdad de género y las diversas olas y corrientes del feminismo. El sistema patriarcal como sistema que perpetúa las desigualdades entre mujeres y hombres. Sistema sexo-género, estereotipos, roles y prejuicios sociales. Igualdad de oportunidades, de derechos, salarial, igualdad en la empresa y techo de cristal. El lenguaje inclusivo versus no inclusivo.',
          'La prevención de la explotación y la violencia contra niñas y mujeres. La corresponsabilidad en las tareas domésticas y de cuidados. Violencia de género versus violencia doméstica.',
          'El interculturalismo. La inclusión social y el respeto por la diversidad y las identidades etnocultural y de género. Los derechos LGTBIQ+.',
          'Fines y límites éticos de la investigación científica. El principio de responsabilidad. La bioética. El desafío de la inteligencia artificial. Las propuestas transhumanistas.',
          'Acciones individuales y colectivas en favor de la paz. La contribución del Estado y los organismos internacionales a la paz, la seguridad integral y la cooperación. La atención a las víctimas de la violencia. El derecho internacional y la ciudadanía global. Las fuerzas armadas y la defensa al servicio de la paz. El papel de las ONG y de las ONGD.',
        ],
      },
      'C. Sostenibilidad y ética ambiental': {
        eso: [
          'Interdependencia, interconexión y ecodependencia entre nuestras formas de vida y el entorno. Lo local y lo global. Consideración crítica de las diversas cosmovisiones sobre la relación humana con la naturaleza.',
          'Los límites del planeta y el agotamiento de los recursos. La huella ecológica de las acciones humanas. La emergencia climática.',
          'Diversos planteamientos éticos, científicos y políticos en torno a los problemas ecosociales. La ética ambiental. La ética de los cuidados y el ecofeminismo. Los Objetivos de Desarrollo Sostenible. El decrecimiento. La economía circular.',
          'El compromiso activo con la protección de los animales y el medio ambiente. Los derechos de los animales y de la naturaleza. La perspectiva biocéntrica.',
          'Estilos de vida sostenible: la prevención de los residuos y la gestión sostenible de los recursos. La movilidad segura, saludable y sostenible. El consumo responsable. Alimentación y soberanía alimentaria. Comunidades resilientes y en transición.',
        ],
      },
    },
  },

  'Educación Plástica, Visual y Audiovisual': {
    name: 'Educación Plástica, Visual y Audiovisual',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Patrimonio artístico y cultural': {
        eso: [
          'Los géneros artísticos.',
          'Manifestaciones culturales y artísticas más importantes, incluidas las contemporáneas y las pertenecientes al patrimonio local: sus aspectos formales y su relación con el contexto histórico.',
          'Las formas geométricas en el arte y en el entorno. Patrimonio arquitectónico.',
        ],
      },
      'B. Elementos formales de la imagen y del lenguaje visual. La expresión gráfica': {
        eso: [
          'El lenguaje visual como forma de comunicación y medio de expresión. Pensamiento visual.',
          'Elementos básicos del lenguaje visual: el punto, la línea y el plano. Posibilidades expresivas y comunicativas.',
          'Elementos visuales, conceptos y posibilidades expresivas: forma, color y textura.',
          'La percepción visual. Introducción a los principios perceptivos, elementos y factores.',
          'La composición. Conceptos de equilibrio, proporción y ritmo aplicados a la organización de formas en el plano y en el espacio.',
          'Espacio y volumen. La luz como elemento formal y expresivo.',
        ],
      },
      'C. Expresión artística y gráfico-plástica: técnicas y procedimientos': {
        eso: [
          'El proceso creativo a través de operaciones plásticas: reproducir, aislar, transformar y asociar.',
          'Factores y etapas del proceso creativo: elección de materiales y técnicas, realización de bocetos.',
          'Introducción a la geometría plana y trazados geométricos básicos. Formas poligonales. Curvas técnicas y enlaces. Aplicación en el diseño.',
          'Técnicas básicas de expresión gráfico-plástica en dos dimensiones. Técnicas secas y húmedas. Su uso en el arte y sus características expresivas.',
          'Técnicas básicas de expresión gráfico-plástica en tres dimensiones. Su uso tanto en el arte como en el diseño; sus características funcionales y expresivas.',
          'Representación de las tres dimensiones en el plano. Introducción a los sistemas de representación.',
          'El módulo como elemento constructivo. Tipos de módulo en diseño.',
        ],
      },
      'D. Imagen y comunicación visual y audiovisual': {
        eso: [
          'El lenguaje y la comunicación visual. Finalidades: informativa, comunicativa, expresiva y estética. Contextos y funciones.',
          'Imágenes visuales y audiovisuales: lectura y análisis.',
          'La imagen a través de los medios de comunicación y las redes sociales.',
          'Imagen fija y en movimiento, origen y evolución. Introducción a las diferentes características del cómic, la fotografía, el cine, la animación y los formatos digitales.',
          'Edición digital de la imagen fija y en movimiento.',
          'Técnicas básicas para la realización de producciones audiovisuales sencillas, de forma individual o en grupo. Experimentación en entornos virtuales de aprendizaje.',
        ],
      },
    },
  },

  'Física y Química': {
    name: 'Física y Química',
    courseKeys: ['1-3', '4'],
    courseLabels: CLM_ESO_LABELS_13_4,
    blocs: {
      'A. Las destrezas científicas básicas': {
        '1-3': [
          'Metodologías de la investigación científica: identificación y formulación de cuestiones, elaboración de hipótesis y comprobación experimental de las mismas.',
          'Trabajo experimental y proyectos de investigación: estrategias en la resolución de problemas y en el desarrollo de investigaciones mediante la indagación, la deducción, la búsqueda de evidencias y el razonamiento lógico-matemático, haciendo inferencias válidas de las observaciones y obteniendo conclusiones.',
          'Diversos entornos y recursos de aprendizaje científico como el laboratorio o los entornos virtuales: materiales, sustancias y herramientas tecnológicas.',
          'Normas de uso de cada espacio, asegurando y protegiendo así la salud propia y comunitaria, la seguridad en las redes y el respeto hacia el medio ambiente.',
          'El lenguaje científico: unidades del Sistema Internacional y sus símbolos. Herramientas matemáticas básicas en diferentes escenarios científicos y de aprendizaje.',
          'Estrategias de interpretación y producción de información científica utilizando diferentes formatos y diferentes medios: desarrollo del criterio propio basado en lo que el pensamiento científico aporta a la mejora de la sociedad para hacerla más justa, equitativa e igualitaria.',
          'Valoración de la cultura científica y del papel de científicos y científicas en los principales hitos históricos y actuales de la física y la química en el avance y la mejora de la sociedad.',
        ],
        '4': [
          'Trabajo experimental y proyectos de investigación: estrategias en la resolución de problemas y el tratamiento del error mediante la indagación, la deducción, la búsqueda de evidencias y el razonamiento lógico-matemático, haciendo inferencias válidas de las observaciones y obteniendo conclusiones que vayan más allá de las condiciones experimentales para aplicarlas a nuevos escenarios.',
          'Diversos entornos y recursos de aprendizaje científico como el laboratorio o los entornos virtuales: materiales, sustancias y herramientas tecnológicas.',
          'Normas de uso de cada espacio, asegurando y protegiendo así la salud propia y comunitaria, la seguridad en las redes y el respeto hacia el medio ambiente.',
          'El lenguaje científico: manejo adecuado de distintos sistemas de unidades y sus símbolos. Herramientas matemáticas adecuadas en diferentes escenarios científicos y de aprendizaje.',
          'Estrategias de interpretación y producción de información científica en diferentes formatos y a partir de diferentes medios: desarrollo del criterio propio basado en lo que el pensamiento científico aporta a la mejora de la sociedad para hacerla más justa, equitativa e igualitaria.',
          'Valoración de la cultura científica y del papel de científicos y científicas en los principales hitos históricos y actuales de la física y la química para el avance y la mejora de la sociedad.',
        ],
      },
      'B. La materia': {
        '1-3': [
          'Teoría cinético-molecular: aplicación a observaciones sobre la materia explicando sus propiedades, los estados de agregación, los cambios de estado y la formación de mezclas y disoluciones.',
          'Experimentos relacionados con los sistemas materiales: conocimiento y descripción de sus propiedades, su composición y su clasificación. Técnicas de separación de mezclas.',
          'Estructura atómica: desarrollo histórico de los modelos atómicos, existencia, formación y propiedades de los isótopos y ordenación de los elementos en la tabla periódica.',
          'Principales compuestos químicos: su formación y sus propiedades físicas y químicas, valoración de sus aplicaciones. Masa atómica y masa molecular.',
          'Nomenclatura: participación de un lenguaje científico común y universal formulando y nombrando sustancias simples, iones monoatómicos y compuestos binarios mediante las reglas de nomenclatura de la Iupac.',
        ],
        '4': [
          'Sistemas materiales: resolución de problemas y situaciones de aprendizaje diversas sobre las disoluciones y los gases, entre otros sistemas materiales significativos.',
          'Modelos atómicos: desarrollo histórico de los principales modelos atómicos clásicos y cuánticos y descripción de las partículas subatómicas, estableciendo su relación con los avances de la física y la química.',
          'Estructura electrónica de los átomos: configuración electrónica de un átomo y su relación con la posición del mismo en la tabla periódica y con sus propiedades fisicoquímicas.',
          'Compuestos químicos: su formación, propiedades físicas y químicas y valoración de su utilidad e importancia en otros campos como la ingeniería o el deporte.',
          'Cuantificación de la cantidad de materia: cálculo del número de moles de sistemas materiales de diferente naturaleza, manejando con soltura las diferentes formas de medida y expresión de la misma en el entorno científico.',
          'Nomenclatura inorgánica: denominación de sustancias simples, iones y compuestos químicos binarios y ternarios mediante las normas de la Iupac.',
          'Introducción a la nomenclatura orgánica: denominación de compuestos orgánicos monofuncionales a partir de las normas de la Iupac como base para entender la gran variedad de compuestos del entorno basados en el carbono.',
        ],
      },
      'C. La energía': {
        '1-3': [
          'La energía: formulación de cuestiones e hipótesis sobre la energía, propiedades y manifestaciones que la describan como la causa de todos los procesos de cambio.',
          'Diseño y comprobación experimental de hipótesis relacionadas con el uso doméstico e industrial de la energía en sus distintas formas y las transformaciones entre ellas.',
          'Elaboración fundamentada de hipótesis sobre el medio ambiente y la sostenibilidad a partir de las diferencias entre fuentes de energía renovables y no renovables. Valoración de la producción de energía eólica en Castilla-La Mancha.',
          'Efectos del calor sobre la materia: análisis de los efectos y aplicación en situaciones cotidianas.',
          'Naturaleza eléctrica de la materia: electrización de los cuerpos, circuitos eléctricos y la obtención de energía eléctrica. Concienciación sobre la necesidad del ahorro energético y la conservación sostenible del medio ambiente.',
        ],
        '4': [
          'La energía: formulación y comprobación de hipótesis sobre las distintas formas y aplicaciones de la energía, a partir de sus propiedades y del principio de conservación, como base para la experimentación y la resolución de problemas relacionados con la energía mecánica en situaciones cotidianas.',
          'Transferencias de energía: el trabajo y el calor como formas de transferencia de energía entre sistemas relacionados con las fuerzas o la diferencia de temperatura. La luz y el sonido como ondas que transfieren energía.',
          'La energía en nuestro mundo: estimación de la energía consumida en la vida cotidiana mediante la búsqueda de información contrastada, la experimentación y el razonamiento científico, comprendiendo la importancia de la energía en la sociedad, su producción y su uso responsable.',
        ],
      },
      'D. La interacción': {
        '1-3': [
          'Predicción de movimientos sencillos a partir de los conceptos de la cinemática, formulando hipótesis comprobables sobre valores futuros de estas magnitudes, validándolas a través del cálculo numérico, la interpretación de gráficas o el trabajo experimental.',
          'Las fuerzas como agentes de cambio: relación de los efectos de las fuerzas, tanto en el estado de movimiento o de reposo de un cuerpo como produciendo deformaciones en los sistemas sobre los que actúan.',
          'Aplicación de las leyes de Newton: observación de situaciones cotidianas o de laboratorio que permiten entender cómo se comportan los sistemas materiales ante la acción de las fuerzas y predecir los efectos de estas en situaciones cotidianas y de seguridad vial.',
          'Fenómenos gravitatorios, eléctricos y magnéticos: experimentos sencillos que evidencian la relación con las fuerzas de la naturaleza.',
        ],
        '4': [
          'Predicción y comprobación, utilizando la experimentación y el razonamiento matemático, de las principales magnitudes, ecuaciones y gráficas que describen el movimiento de un cuerpo, relacionándolo con situaciones cotidianas y con la mejora de la calidad de vida.',
          'La fuerza como agente de cambios en los cuerpos: principio fundamental de la Física que se aplica a otros campos como el diseño, el deporte o la ingeniería.',
          'Carácter vectorial de las fuerzas: uso del álgebra vectorial básica para la realización gráfica y numérica de operaciones con fuerzas y su aplicación a la resolución de problemas relacionados con sistemas sometidos a conjuntos de fuerzas, valorando su importancia en situaciones cotidianas.',
          'Principales fuerzas del entorno cotidiano: reconocimiento del peso, la normal, el rozamiento, la tensión o el empuje, y su uso en la explicación de fenómenos físicos en distintos escenarios.',
          'Ley de la gravitación universal: atracción entre los cuerpos que componen el universo. Concepto de peso.',
          'Fuerzas y presión en los fluidos: efectos de las fuerzas y la presión sobre los líquidos y los gases, estudiando los principios fundamentales que las describen.',
        ],
      },
      'E. El cambio': {
        '1-3': [
          'Los sistemas materiales: análisis de los diferentes tipos de cambios que experimentan, relacionando las causas que los producen con las consecuencias que tienen.',
          'Interpretación macroscópica y microscópica de las reacciones químicas: explicación de las relaciones de la química con el medio ambiente, la tecnología y la sociedad.',
          'Ley de conservación de la masa y de la Iey de las proporciones definidas: aplicación de estas leyes como evidencias experimentales que permiten validar el modelo atómico-molecular de la materia.',
          'Factores que afectan a las reacciones químicas: predicción cualitativa de la evolución de las reacciones, entendiendo su importancia en la resolución de problemas actuales por parte de la ciencia.',
        ],
        '4': [
          'Ecuaciones químicas: ajuste de reacciones químicas y realización de predicciones cualitativas y cuantitativas basadas en la estequiometría, relacionándolas con procesos fisicoquímicos de la industria, el medioambiente y la sociedad.',
          'Descripción cualitativa de reacciones químicas de interés: reacciones de combustión, neutralización y procesos electroquímicos sencillos, valorando las implicaciones que tienen en la tecnología, la sociedad o el medioambiente.',
          'Factores que influyen en la velocidad de las reacciones químicas: comprensión de cómo ocurre la reordenación de los átomos aplicando modelos como la teoría de colisiones y realización de predicciones en los procesos químicos cotidianos más importantes.',
        ],
      },
    },
  },

  'Geografía e Historia': {
    name: 'Geografía e Historia',
    courseKeys: ['1-2', '3-4'],
    courseLabels: CLM_ESO_LABELS_12_34,
    blocs: {
      'A. Retos del mundo actual': {
        '1-2': [
          'Sociedad del conocimiento. Introducción a los objetivos y estrategias de las Ciencias Sociales y al uso de sus procedimientos, términos y conceptos. Uso de plataformas digitales.',
          'Tecnologías de la información. Manejo y utilización de dispositivos, aplicaciones informáticas y plataformas digitales. Búsqueda, tratamiento de la información y elaboración de conocimiento. Uso seguro de las redes de comunicación. Lectura crítica de la información.',
          'Objetivos de Desarrollo Sostenible. La visión de los dilemas del mundo actual, punto de partida para el pensamiento crítico y el desarrollo de juicios propios.',
          'Ubicación espacial: representación del espacio, orientación y escalas. Utilización de recursos digitales e interpretación y elaboración de mapas, esquemas, imágenes y representaciones gráficas. Tecnologías de la Información Geográfica (TIG).',
          'Emergencia climática: elementos y factores que condicionan el clima y el impacto de las actividades humanas. Principales medios naturales y su distribución geográfica. Métodos de recogida de datos meteorológicos e interpretación de gráficos. Riesgos y catástrofes climáticas en el presente, en el pasado y en el futuro. Vulnerabilidad, prevención y resiliencia de la población ante las catástrofes naturales y los efectos del cambio climático.',
          'Biodiversidad. Dinámicas y amenazas de los ecosistemas planetarios. Formas y procesos de modificación de la superficie terrestre: el relieve.',
          'Las relaciones entre naturaleza y sociedad: paisajes naturales y humanizados. Riqueza y valor del patrimonio natural. La influencia humana en la alteración de los ecosistemas en el pasado y la actualidad. Conservación y mejora del entorno local y global. Parques Nacionales y espacios protegidos en España y Castilla-La Mancha.',
          'Desafíos demográficos en el mundo actual. Movimientos naturales y espaciales de la población. Causalidad y comparación en el estudio de la diversidad social y cultural y de las estructuras demográficas a distintas escalas (local, regional, nacional, europea y planetaria). Tendencias y problemas demográficos.',
          'Aglomeraciones urbanas y ruralidad. El fenómeno urbano: evolución, funciones, estructura y redes. La despoblación y el sostenimiento del mundo rural. El problema de la España vaciada y su repercusión en Castilla-La Mancha. El desarrollo urbano sostenible: la ciudad, espacio de convivencia. Modos y estilos de vida en el contexto de la globalización.',
          'Igualdad. Situaciones discriminatorias de las niñas y de las mujeres en el mundo. Roles de género y su manifestación en todos los ámbitos de la sociedad y la cultura.',
          'Estudio geográfico de la organización política actual de los continentes.',
          'Geopolítica. Competencia y conflicto por los recursos y el territorio. Mercados regionales, políticas comerciales y movimientos migratorios. Tensiones internacionales, choques y alianzas entre civilizaciones.',
          'Geografía de la desigualdad. Concentración y distribución de la riqueza. Formas y modos de percibir y representar la desigualdad. Líneas de acción para un reparto justo. La cuestión del mínimo vital.',
        ],
        '3-4': [
          'Sociedad de la información. Búsqueda, tratamiento de la información, uso de datos en entornos digitales y evaluación y contraste de la fiabilidad de las fuentes. El problema de la desinformación. Uso específico del léxico relativo a los ámbitos histórico, artístico y geográfico.',
          'Cultura mediática. Técnicas y métodos de las Ciencias Sociales: análisis de textos, interpretación y elaboración de mapas, análisis e interpretación de obras de arte, esquemas y síntesis, representación de gráficos e interpretación de imágenes a través de medios digitales accesibles. Tecnologías de la información geográfica.',
          'Lo global y lo local. La investigación en Ciencias Sociales, el estudio multicausal y el análisis comparado del espacio natural, rural y urbano, su evolución y los retos del futuro. Análisis e interpretación de conceptos espaciales: localización, escala, conexión y proximidad espacial.',
          'Objetivos de Desarrollo Sostenible. Emergencia climática y sostenibilidad. Relación entre factores naturales y antrópicos en la Tierra. Globalización, movimientos migratorios e interculturalidad. Los avances tecnológicos y la conciencia ecosocial. Conflictos ideológicos y etnoculturales.',
          'Diversidad social, etnocultural y de género. Migraciones, multiculturalidad y mestizaje en sociedades abiertas. Historia y reconocimiento del pueblo gitano y otras minorías étnicas de nuestro país. Nuevas formas de identificación cultural.',
          'El espacio geográfico español. Modelos de poblamiento. La modernización de las estructuras económicas y la organización político-administrativa del territorio español. Principales desequilibrios regionales en España.',
          'El espacio geográfico europeo. Organización política y administrativa de la Unión europea. Funcionamiento de las instituciones.',
          'Análisis espacial de la igualdad de género y formas de violencia contra las mujeres. Actitudes y comportamientos sexistas.',
          'Geografía económica. Estructuras económicas en el mundo actual, cambios en los sectores productivos y funcionamiento de los mercados. Interdependencia y globalización. Dilemas e incertidumbres ante el crecimiento, la empleabilidad y la sustentabilidad.',
          'El espacio mundo y sus problemas. Desigualdad e injusticia en el contexto local y global. Solidaridad, cohesión social y cooperación para el desarrollo.',
          'Espacio y poder político. Geopolítica y principales conflictos en el presente. Genocidios y crímenes contra la humanidad. Guerras, terrorismo y otras formas de violencia política. Alianzas e instituciones internacionales, mediación y misiones de paz. Injerencia humanitaria y Justicia Universal. Políticas de cooperación.',
        ],
      },
      'B. Sociedades y territorios': {
        '1-2': [
          'Métodos básicos de investigación para la construcción del conocimiento de la Geografía y la Historia. Metodologías del pensamiento geográfico y del pensamiento histórico.',
          'Las fuentes históricas y arqueológicas como base para la construcción del conocimiento histórico. Objetos y artefactos como fuente para la historia y el legado inmaterial. El significado de los archivos, bibliotecas y museos y del legado histórico y cultural como patrimonio colectivo. Las fuentes primarias en el entorno local y regional.',
          'Tiempo histórico: construcción e interpretación de líneas de tiempo a través de la linealidad, cronología, simultaneidad y duración.',
          'Análisis interdisciplinar del origen del ser humano y del nacimiento de la sociedad. Grandes migraciones humanas y nacimiento de las primeras culturas. Del proceso de hominización a las grandes civilizaciones fluviales. La Prehistoria en los territorios de la actual Castilla-La Mancha.',
          'Complejidad social y nacimiento de la autoridad: familia, clan, tribu, casta, linaje y estamento. Desigualdad social y disputa por el poder desde la Prehistoria y la Antigüedad hasta la Edad Moderna. Formación de oligarquías, la imagen del poder y la evolución de la aristocracia. Del clan a la sociedad estamental.',
          'Las personas invisibilizadas de la historia: mujeres, esclavos y extranjeros desde la Prehistoria a la Edad Moderna. Marginación, segregación, control y sumisión en la historia de la humanidad. Personajes femeninos en el relato de la historia. La resistencia a la opresión.',
          'Condicionantes geográficos e interpretaciones históricas del surgimiento de las civilizaciones. Las grandes rutas comerciales y las estrategias por el control de los recursos: talasocracias e imperios, conquista y colonización. Grecia y Roma.',
          'Violencia y conflictos armados en la Antigüedad, en el Medievo y en la Modernidad. El crecimiento de los ejércitos y la evolución del armamento desde los hoplitas a los tercios. Los civiles durante las guerras.',
          'La organización política del ser humano y las formulaciones estatales en el mundo antiguo, medieval y moderno: democracias, repúblicas, imperios y reinos. El Estado Moderno y el Absolutismo. Evolución de la teoría del poder.',
          'España en el tiempo y su conexión con los grandes procesos de la historia de la humanidad. El legado histórico y el acervo cultural en la formación de las identidades colectivas. Pueblos prerromanos, Hispania y el reino visigodo de Toledo. La evolución de los reinos cristianos medievales de la península ibérica. Al-Ándalus. El Estado Moderno de los Reyes Católicos y de los Austrias.',
          'Las raíces clásicas de la cultura occidental. La construcción de las identidades culturales, de la idea de Europa y del eurocentrismo, a través del pensamiento, la mitología y del arte grecolatino, islámico y andalusí. La influencia de las civilizaciones judía e islámica en la cultura europea.',
          'La obra de arte: interpretación y análisis. Significado y función de las expresiones artísticas y culturales en las distintas civilizaciones. Diversidad y riqueza cultural. Respeto y conservación del patrimonio material e inmaterial. Arte prehistórico y en la Antigüedad. Arte andalusí, Románico, Gótico. Renacimiento y Barroco. Principales manifestaciones locales, en Castilla-La Mancha, España y Europa. El arte Íbero.',
          'El papel de la religión en la organización social, la legitimización del poder y la formación de identidades: politeísmo, monoteísmo y el surgimiento de las grandes religiones. Herejías, persecuciones y guerras de religión en la Antigüedad, en el Medievo y en la Modernidad.',
          'La transformación humana del territorio y la distribución desigual de los recursos y del trabajo. Evolución de los sistemas económicos, de los ciclos demográficos, de los modos de vida y de los modelos de organización social. La lucha por la supervivencia y el estatus social desde la Prehistoria y la Antigüedad hasta la Edad Moderna.',
          'Interpretación del territorio y del paisaje. La ciudad y el mundo rural a lo largo de la historia: polis, urbes, ciudades, villas y aldeas. La huella humana y la protección del patrimonio ambiental, histórico, artístico y cultural, tanto local como regional, nacional y mundial.',
          'Viajes, descubrimientos y sistemas de intercambio en la formación de una economía mundial. La disputa por la hegemonía y la geopolítica en el nacimiento y evolución de la Modernidad.',
          'Ciencia, medicina y avances tecnológicos. La lucha contra epidemias y pandemias. Racionalismo y empirismo en la explicación de la realidad frente a las supersticiones. De la astronomía, medicina e ingeniería en la Antigüedad al método científico.',
        ],
        '3-4': [
          'Métodos de investigación en el ámbito de la Geografía y de la Historia. Metodologías del pensamiento histórico y del pensamiento geográfico.',
          'Las fuentes históricas como base para la construcción del conocimiento sobre el pasado contemporáneo: textos, mapas, gráficos y estadísticas, prensa, medios audiovisuales y TIC. El entorno más cercano como fuente histórica. Contraste entre interpretaciones de historiadores.',
          'Tiempo histórico: construcción e interpretación de líneas de tiempo a través de la linealidad, cronología, simultaneidad y duración.',
          'Conciencia histórica. Elaboración de juicios propios y argumentados ante problemas de actualidad contextualizados históricamente. Defensa y exposición crítica de los mismos a través de presentaciones y debates.',
          'La transformación política de los seres humanos: de la servidumbre a la ciudadanía. El siglo de las Luces. La Ilustración. Pensamiento político. La crisis del Antiguo Régimen y las revoluciones liberales burguesas. Los modelos estadounidense y francés. De la llegada de los Borbones al trono a la crisis del Antiguo Régimen en España. Reformismo, Ilustración y primer liberalismo. Las gentes y territorios de la actual Castilla-La Mancha en el siglo XVIII. Transiciones, revoluciones y resistencias: permanencias y cambios en la época contemporánea. La conquista de los derechos individuales y colectivos en la época contemporánea. Origen, evolución y adaptación de los sistemas liberales en España y en el mundo a través de las fuentes.',
          'Interpretación del sistema capitalista desde sus orígenes hasta la actualidad. Causas y consecuencias de las revoluciones industriales de los siglos XVIII y XIX. El auge de la burguesía. Colonialismo, imperialismo y nuevas subordinaciones económicas y culturales. Nacionalismos y tensiones entre potencias.',
          'La transformación humana del territorio y la distribución desigual de los recursos y del trabajo. Causas, desarrollo y consecuencias de la organización del movimiento obrero. Sindicalismo e ideologías obreras. Evolución de los sistemas económicos, de los ciclos demográficos, de los modos de vida y de los modelos de organización social. La lucha por los derechos laborales y sociales: el estado del bienestar. Transformaciones económicas y movimientos sociales en la España contemporánea. Causas y consecuencias de las transformaciones agrarias del siglo XIX en España y en los territorios de la actual Castilla-La Mancha.',
          'Cambios políticos en la España contemporánea. La ley como contrato social. Procesos y culturas políticas. De la Constitución de 1812 a la Constitución de 1978. La construcción del Estado liberal del XIX. Transformaciones en la España del XIX: crisis del Estado Liberal; II República; Guerra Civil y Franquismo. La España democrática. Ordenamiento normativo autonómico, constitucional y supranacional como garante del desarrollo de derechos y libertades para el ejercicio de la ciudadanía. El Estatuto de Autonomía de Castilla-La Mancha y sus orígenes y formación como comunidad autónoma.',
          'Conflictos en la primera mitad del siglo XX. Las relaciones internacionales y estudio crítico y comparativo de conflictos y violencias de la primera mitad del siglo XX en España, Europa y el mundo. El Holocausto judío como paradigma y la justicia reparadora.',
          'La memoria democrática. Experiencias históricas dolorosas del pasado reciente y reconocimiento y reparación a las víctimas de la violencia. El principio de Justicia Universal.',
          'Democracia, revolución y reacción en el siglo XX. Relaciones multicausales en la construcción de la democracia y los orígenes del totalitarismo: los movimientos por la libertad, la igualdad y los derechos humanos. La acción de los movimientos sociales en el mundo contemporáneo. Procesos de evolución e involución: la perspectiva emancipadora de la interpretación del pasado. La defensa del sistema democrático y sus valores en la actualidad.',
          'La acción de los movimientos feministas y sufragistas en la lucha por la igualdad de género. Mujeres relevantes de la historia contemporánea de España, Europa y el mundo. La lucha por la igualdad y el relato histórico. El protagonismo de las mujeres en las acciones colectivas y los movimientos sociales. La conquista del espacio público y del voto femenino.',
          'Los fundamentos geoestratégicos desde la segunda mitad del siglo XX hasta la actualidad, la política de bloques, los conflictos de la descolonización y el nuevo orden mundial: la Guerra Fría, el Sistema Bipolar y el Tercer Mundo. El papel de los organismos internacionales. La ONU y sus funciones en las relaciones interestatales.',
          'Nuevos focos de tensión y agentes histórico: terrorismo y conflictos del siglo XXI.',
          'El proceso de construcción europea. Integración económica, monetaria y ciudadana. Las instituciones europeas. De la CECA al Brexit. El futuro de Europa. Castilla-La Mancha y España en la UE.',
          'Las formaciones identitarias: ideologías, nacionalismos y movimientos supranacionales. Ciudadanía europea y cosmopolita.',
          'España ante la modernidad. Estrategias para la identificación de los fundamentos del proceso de transformación de la España contemporánea y contextualización y explicación de los aspectos políticos, económicos, sociales y culturales en la formación de una identidad multicultural compartida. El enfoque generacional, los nuevos movimientos sociales y formas de activismo político. La pluralidad de lo castellano. Aportación de Castilla-La Mancha al futuro común.',
          'Interpretación del territorio y del paisaje. Del éxodo rural a la concentración urbana. El reto demográfico en España. El problema de la despoblación rural y sus posibles soluciones. Castilla-La Mancha ante la cuestión la España vaciada. Ordenación del territorio y transformación del espacio. La ciudad y el pueblo como espacio de convivencia. Importancia y cuidado del espacio público. La huella humana y la protección del medio natural.',
          'El nacimiento de las nuevas expresiones artísticas y culturales contemporáneas y su relación con las artes clásicas. La diversidad cultural en el mundo actual. Respeto y conservación del patrimonio material e inmaterial (local, castellanomanchego, español y universal); del Rococó a los movimientos artísticos actuales.',
          'Las transformaciones científicas y tecnológicas. Dimensión ética de la ciencia y la tecnología. Cambios culturales y movimientos sociales. Los medios de comunicación y las redes sociales. El problema de la desinformación.',
        ],
      },
      'C. Compromiso cívico local y global': {
        '1-2': [
          'Dignidad humana y derechos universales. Convención sobre los Derechos del Niño.',
          'Alteridad: respeto y aceptación del otro. Comportamientos no discriminatorios y contrarios a cualquier actitud segregadora.',
          'Igualdad de género. Manifestaciones y conductas no sexistas.',
          'Interés ante los retos y problemas de actualidad en el entorno local y global.',
          'Las redes sociales. Seguridad y prevención ante los riegos y peligros del uso de las tecnologías de la información y de la comunicación.',
          'Convivencia cívica y cultura democrática. Incorporación e implicación de la sociedad civil en procesos democráticos. Participación en proyectos comunitarios.',
          'Conciencia ambiental. Respeto, protección y cuidado de los seres vivos y del planeta.',
          'Conservación y defensa del patrimonio histórico, artístico y cultural.',
          'Solidaridad, empatía y acciones de apoyo a colectivos en situaciones de pobreza, vulnerabilidad y exclusión social.',
          'Identificación y gestión de las emociones y su repercusión en comportamientos individuales y colectivos.',
          'Ciclos vitales, uso del tiempo libre y hábitos de consumo. Diferencias y cambios en las formas de vida en las sociedades actuales y en las del pasado.',
          'La contribución del Estado y sus instituciones a la paz, a la seguridad integral ciudadana y a la convivencia social.',
          'Ciudadanía europea. Ideas y actitudes en el proyecto de construcción de una identidad común. La seguridad y la cooperación internacional.',
          'Seguridad vial y movilidad segura, saludable y sostenible. El espacio público.',
        ],
        '3-4': [
          'Dignidad humana y derechos universales. Declaración Universal de los Derechos Humanos.',
          'Diversidad social y multiculturalidad. Integración y cohesión social.',
          'Responsabilidad ecosocial. Compromiso y acción ante los Objetivos del Desarrollo Sostenible. La juventud como agente de cambio para el desarrollo sostenible.',
          'Implicación en la defensa y protección del medio ambiente. Acción y posición ante la emergencia climática.',
          'Ciudadanía ética digital. Nuevos comportamientos en la sociedad de la información.',
          'Compromiso cívico y participación ciudadana. Mediación y gestión pacífica de conflictos y apoyo a las víctimas de la violencia y del terrorismo.',
          'Servicio a la comunidad. La corresponsabilidad en los cuidados. Las relaciones intergeneracionales. La responsabilidad colectiva e individual. El asociacionismo y el voluntariado. Entornos y redes sociales.',
          'El patrimonio como bien y como recurso. Puesta en valor, difusión y gestión de la riqueza patrimonial desde lo local a lo global. La conservación y valoración del patrimonio.',
          'Cohesión social e integración. Medidas y acciones en favor de la igualdad y de la plena inclusión.',
          'La igualdad real de mujeres y hombres. La discriminación por motivo de diversidad sexual y de género. La conquista de derechos en las sociedades democráticas contemporáneas.',
          'Instituciones del Estado que garantizan la seguridad integral y la convivencia social. Los compromisos internacionales de nuestro país en favor de la paz, la seguridad y la cooperación internacional.',
          'Las emociones y el contexto cultural. La perspectiva histórica del componente emocional.',
          'Empleo y trabajo en la sociedad de la información, aprendizaje permanente y a lo largo de toda la vida.',
          'Los valores del europeísmo. Fórmulas de participación en programas educativos europeos.',
        ],
      },
    },
  },

  'Lengua Castellana y Literatura': {
    name: 'Lengua Castellana y Literatura',
    courseKeys: ['1-2', '3-4'],
    courseLabels: CLM_ESO_LABELS_12_34,
    blocs: {
      'A. Las lenguas y sus hablantes': {
        '1-2': [
          'Observación de la propia biografía lingüística y de la diversidad lingüística del centro. Las familias lingüísticas y las lenguas del mundo.',
          'Las lenguas de España: origen, distribución geográfica y nociones básicas. Diferencias entre plurilingüismo y diversidad dialectal. Aproximación a las lenguas de signos.',
          'Comparación de rasgos de las principales variedades dialectales del español, con especial atención a las de Castilla-La Mancha.',
          'Iniciación a la reflexión interlingüística.',
          'Estrategias de identificación de prejuicios y estereotipos lingüísticos y exploración de formas de evitarlos.',
        ],
        '3-4': [
          'Análisis de la biografía lingüística propia y de la diversidad lingüística del centro y de la localidad.',
          'Desarrollo sociohistórico de las lenguas de España.',
          'Comparación de rasgos de las principales variedades dialectales del español, con especial atención a la del propio territorio.',
          'Desarrollo de la reflexión interlingüística.',
          'Diferencias entre los rasgos propios de las variedades dialectales (fónicos, gramaticales y léxicos) y los relativos a los sociolectos y los registros.',
          'Exploración y cuestionamiento de prejuicios y estereotipos lingüísticos. Los fenómenos del contacto entre lenguas: bilingüismo, préstamos, interferencias. Diglosia lingüística y diglosia dialectal.',
          'Indagación en torno a los derechos lingüísticos y su expresión en leyes y declaraciones institucionales.',
        ],
      },
      'B. Comunicación — Contexto': {
        '1-2': [
          'Componentes del hecho comunicativo: grado de formalidad de la situación y carácter público o privado; distancia social entre los interlocutores; propósitos comunicativos e interpretación de intenciones; canal de comunicación y elementos no verbales de la comunicación.',
        ],
        '3-4': [
          'Componentes del hecho comunicativo: grado de formalidad de la situación y carácter público o privado; distancia social entre los interlocutores; propósitos comunicativos e interpretación de intenciones; canal de comunicación y elementos no verbales de la comunicación.',
        ],
      },
      'B. Comunicación — Géneros discursivos': {
        '1-2': [
          'Secuencias textuales básicas, con especial atención a las narrativas, descriptivas, dialogadas, argumentativas y expositivas.',
          'Propiedades textuales: coherencia, cohesión y adecuación.',
          'Géneros discursivos propios del ámbito personal: la conversación.',
          'Géneros discursivos propios del ámbito educativo.',
          'Géneros discursivos propios del ámbito social. Redes sociales y medios de comunicación. Etiqueta digital. Riesgos de desinformación, manipulación y vulneración de la privacidad en la red. Análisis de la imagen y elementos paratextuales de los textos icónico-verbales y multimodales.',
        ],
        '3-4': [
          'Secuencias textuales básicas, como, por ejemplo: narrativa, descriptiva, instruccional, dialogal, con especial atención a las expositivas y argumentativas.',
          'Propiedades textuales: coherencia, cohesión y adecuación.',
          'Géneros discursivos propios del ámbito personal: la conversación, con especial atención a los actos de habla que amenazan la imagen del interlocutor (la discrepancia, la queja, la orden, la reprobación).',
          'Géneros discursivos propios del ámbito educativo.',
          'Géneros discursivos propios del ámbito social. Redes sociales y medios de comunicación. Etiqueta digital y riesgos de desinformación, manipulación y vulneración de la privacidad en la red. Análisis de la imagen y de los elementos paratextuales de los textos icónico-verbales y multimodales.',
          'Géneros discursivos propios del ámbito profesional: el currículum vitae, la carta de motivación y la entrevista de trabajo.',
        ],
      },
      'B. Comunicación — Procesos': {
        '1-2': [
          'Interacción oral y escrita de carácter informal: tomar y dejar la palabra. Cooperación conversacional y cortesía lingüística. Escucha activa, asertividad y resolución dialogada de los conflictos.',
          'Comprensión oral: sentido global del texto y relación entre sus partes, selección y retención de la información relevante. Detección de usos discriminatorios del lenguaje verbal y no verbal.',
          'Producción oral formal: planificación y búsqueda de información, textualización y revisión. Adecuación a la audiencia y al tiempo de exposición. Elementos no verbales. Rasgos discursivos y lingüísticos de la oralidad formal.',
          'Comprensión lectora: sentido global del texto y relación entre sus partes. La intención del emisor. Detección de usos discriminatorios del lenguaje verbal e icónico.',
          'Producción escrita: planificación, textualización, revisión y edición en diferentes soportes. Usos de la escritura para la organización del pensamiento: toma de notas, esquemas, mapas conceptuales, definiciones, resúmenes, etc.',
          'Alfabetización mediática e informacional: búsqueda y selección de la información con criterios de fiabilidad, calidad y pertinencia; análisis, valoración, reorganización y síntesis de la información en esquemas propios y transformación en conocimiento; comunicación y difusión creativa y respetuosa con la propiedad intelectual. Utilización de plataformas virtuales para la realización de proyectos escolares.',
        ],
        '3-4': [
          'Interacción oral y escrita de carácter informal y formal: cooperación conversacional y cortesía lingüística. Escucha activa, asertividad y resolución dialogada de los conflictos.',
          'Comprensión oral: sentido global del texto y relación entre sus partes, selección y retención de la información relevante. La intención del emisor. Detección de usos discriminatorios del lenguaje verbal y no verbal. Valoración de la forma y el contenido del texto.',
          'Producción oral formal: planificación y búsqueda de información, textualización y revisión. Adecuación a la audiencia y al tiempo de exposición. Elementos no verbales. Rasgos discursivos y lingüísticos de la oralidad formal. La deliberación oral argumentada.',
          'Comprensión lectora: sentido global del texto y relación entre sus partes. La intención del emisor. Detección de usos discriminatorios del lenguaje verbal e icónico. Valoración de la forma y el contenido del texto.',
          'Producción escrita: planificación, textualización, revisión y edición en diferentes soportes. Usos de la escritura para la organización del pensamiento: toma de notas, esquemas, mapas conceptuales, definiciones, resúmenes, etc.',
          'Alfabetización mediática e informacional: búsqueda y selección de la información con criterios de fiabilidad, calidad y pertinencia; análisis, valoración, reorganización y síntesis de la información en esquemas propios y transformación en conocimiento; comunicación y difusión de manera creativa y respetuosa con la propiedad intelectual. Utilización de plataformas virtuales para la realización de proyectos escolares.',
        ],
      },
      'B. Comunicación — Reconocimiento y uso discursivo de los elementos lingüísticos': {
        '1-2': [
          'Recursos lingüísticos para mostrar la implicación del emisor en los textos: formas de deixis (personal, temporal y espacial) y procedimientos de modalización.',
          'Recursos lingüísticos para adecuar el registro a la situación de comunicación.',
          'Mecanismos de cohesión. Conectores textuales temporales, explicativos, de orden y de contraste. Mecanismos de referencia interna gramaticales (sustituciones pronominales y adverbiales) y léxicos (repeticiones, sinónimos, hiperónimos y elipsis).',
          'Uso coherente de las formas verbales en los textos. Los tiempos del pretérito en la narración. Correlación temporal en el discurso relatado.',
          'Corrección lingüística y revisión ortográfica y gramatical de los textos. Uso de diccionarios, manuales de consulta y de correctores ortográficos en soporte analógico o digital.',
          'Los signos básicos de puntuación como mecanismo organizador del texto escrito. Su relación con el significado.',
        ],
        '3-4': [
          'La expresión de la subjetividad en textos de carácter expositivo y argumentativo. Identificación y uso de las variaciones de las formas deícticas (fórmulas de confianza y cortesía) en relación con las situaciones de comunicación.',
          'Recursos lingüísticos para adecuar el registro a la situación de comunicación.',
          'Procedimientos explicativos básicos: la aposición y las oraciones de relativo.',
          'Mecanismos de cohesión. Conectores textuales distributivos, de orden, contraste, explicación, causa, consecuencia, condición e hipótesis. Mecanismos de referencia interna, gramaticales y léxicos (nominalizaciones e hiperónimos de significado abstracto).',
          'Uso coherente de las formas verbales en los textos. Correlación temporal en la coordinación y subordinación de oraciones, y en el discurso relatado.',
          'Corrección lingüística y revisión ortográfica y gramatical de los textos. Uso de diccionarios, manuales de consulta y de correctores ortográficos en soporte analógico o digital.',
          'Los signos de puntuación como mecanismo organizador del texto escrito. Su relación con el significado.',
        ],
      },
      'C. Educación literaria — Lectura autónoma': {
        '1-2': [
          'Criterios y estrategias para la selección de obras variadas de manera orientada, a partir de la exploración guiada de la biblioteca escolar y pública disponible.',
          'Toma de conciencia progresiva de los propios gustos e identidad lectora.',
          'Participación activa en actos culturales vinculados con el circuito literario y lector.',
          'Expresión de la experiencia lectora, con apoyo de ejemplos y utilizando progresivamente un metalenguaje específico. Apropiación de los textos leídos a través de distintas formas de recreación.',
          'Movilización de la experiencia personal y lectora como forma de establecer vínculos entre la obra leída y aspectos de la actualidad, así como con otros textos y manifestaciones artísticas y culturales.',
          'Estrategias para la recomendación de las lecturas, en soportes variados o bien oralmente entre iguales.',
        ],
        '3-4': [
          'Criterios y estrategias para la selección de obras variadas, a partir de la utilización autónoma de la biblioteca escolar y pública disponible.',
          'Participación activa en actos culturales vinculados con el circuito literario y lector.',
          'Toma de conciencia y verbalización de los propios gustos e identidad lectora.',
          'Expresión de la experiencia lectora, utilizando progresivamente metalenguaje específico. Apropiación de los textos leídos a través de distintas formas de recreación.',
          'Movilización de la experiencia personal, lectora y cultural para establecer vínculos de manera argumentada entre la obra leída y aspectos de la actualidad, así como con otros textos y manifestaciones artísticas y culturales.',
          'Estrategias para la recomendación de las lecturas en soportes variados o bien oralmente entre iguales, enmarcando de manera básica las obras en los géneros y subgéneros literarios.',
        ],
      },
      'C. Educación literaria — Lectura guiada': {
        '1-2': [
          'Lectura de obras y fragmentos relevantes de la literatura juvenil contemporánea y del patrimonio literario universal, inscritas en itinerarios temáticos o de género que atraviesan épocas, contextos culturales y movimientos artísticos.',
          'Estrategias para la construcción compartida de la interpretación de las obras a través de conversaciones literarias, con la incorporación progresiva de metalenguaje específico.',
          'Relación entre los elementos constitutivos del género literario y la construcción del sentido de la obra. Análisis básico del valor de los recursos expresivos y de sus efectos en la recepción.',
          'Relación y comparación de los textos leídos con otros textos, con otras manifestaciones artísticas y culturales y con las nuevas formas de ficción en función de temas, tópicos, estructuras y lenguajes.',
          'Expresión pautada, a través de procesos y soportes diversificados, de la interpretación y valoración personal de obras y fragmentos literarios.',
          'Acercamiento al patrimonio literario de Castilla-La Mancha, a través de las obras de autoras y autores más significativos de las distintas épocas y contextos culturales.',
          'Lectura con perspectiva de género.',
          'Lectura expresiva, dramatización y recitación de los textos atendiendo a los procesos de comprensión, apropiación y oralización implicados.',
          'Creación de textos a partir de la apropiación de las convenciones del lenguaje literario y en referencia a modelos dados (imitación, transformación, continuación, etc.).',
        ],
        '3-4': [
          'Lectura de obras y fragmentos relevantes de la literatura del patrimonio literario nacional y universal y de la literatura actual, inscritas en itinerarios temáticos o de género que atraviesan épocas, contextos culturales y movimientos artísticos.',
          'Estrategias de construcción compartida de la interpretación de las obras a través de conversaciones literarias, con la incorporación progresiva de metalenguaje específico.',
          'Relación entre los elementos constitutivos del género literario y la construcción del sentido de la obra. Efectos de sus recursos expresivos en la recepción.',
          'Estrategias de utilización de información sociohistórica, cultural y artística básica para construir la interpretación de las obras literarias desde la Edad Media hasta la actualidad.',
          'Relación y comparación de los textos leídos con otros textos orales, escritos o multimodales, con otras manifestaciones artísticas y culturales y con las nuevas formas de ficción en función de temas, tópicos, estructuras y lenguajes. Elementos de continuidad y ruptura.',
          'Estrategias para interpretar obras y fragmentos literarios a partir de la integración de los diferentes aspectos analizados y atendiendo a los valores culturales, éticos y estéticos presentes en los textos. Lectura con perspectiva de género.',
          'Procesos de indagación en torno a las obras leídas que promuevan el interés por construir la interpretación de las obras y establecer conexiones entre textos.',
          'Lectura expresiva, dramatización y recitación de los textos atendiendo a los procesos de comprensión, apropiación y oralización implicados.',
          'Creación de textos a partir de la apropiación de las convenciones del lenguaje literario y en referencia a modelos dados (imitación, transformación, continuación, etc.).',
        ],
      },
      'D. Reflexión sobre la lengua': {
        '1-2': [
          'Diferencias relevantes e intersecciones entre lengua oral y lengua escrita atendiendo a aspectos sintácticos, léxicos y pragmáticos.',
          'Aproximación a la lengua como sistema y a sus unidades básicas teniendo en cuenta los diferentes niveles: el sonido y sistema de escritura, las palabras (forma y significado), su organización en el discurso (orden de las palabras, componentes de las oraciones o conexión entre los significados).',
          'Distinción entre la forma (categoría gramatical) y la función de las palabras (funciones sintácticas), y conocimiento de los procedimientos léxicos (afijos) y sintácticos para el cambio de categoría.',
          'Relación entre los esquemas semántico y sintáctico de la oración simple. Observación y transformación de enunciados de acuerdo con estos esquemas y uso de la terminología sintáctica necesaria. Orden de las palabras y concordancia.',
          'Procedimientos de adquisición y formación de palabras. Reflexión sobre los cambios en su significado, las relaciones semánticas entre palabras y sus valores denotativos y connotativos en función del contexto y el propósito comunicativo.',
          'Estrategias de uso progresivamente autónomo de diccionarios y manuales de gramática para obtener información gramatical básica.',
        ],
        '3-4': [
          'Diferencias relevantes e intersecciones entre lengua oral y lengua escrita atendiendo a aspectos sintácticos, léxicos y pragmáticos.',
          'Reconocimiento de la lengua como sistema y de sus unidades básicas teniendo en cuenta los diferentes niveles: el sonido y sistema de escritura, las palabras (forma y significado), su organización en el discurso (orden de las palabras, componentes de las oraciones o conexión entre los significados).',
          'Distinción entre la forma (categoría gramatical) y la función de las palabras (funciones sintácticas de la oración simple y compuesta) y consolidación de los procedimientos léxicos (afijos) y sintácticos para el cambio de categoría.',
          'Relación entre los esquemas semántico y sintáctico de la oración simple y compuesta. Observación y transformación de enunciados de acuerdo con estos esquemas y uso de la terminología sintáctica necesaria.',
          'Procedimientos de adquisición y formación de palabras. Reflexión sobre los cambios en su significado, las relaciones semánticas entre palabras y sus valores denotativos y connotativos en función del contexto y el propósito comunicativo.',
          'Estrategias de uso progresivamente autónomo de diccionarios y manuales de gramática para obtener información gramatical básica.',
        ],
      },
    },
  },

  'Lengua Extranjera': {
    name: 'Lengua Extranjera',
    courseKeys: ['1-2', '3-4'],
    courseLabels: CLM_ESO_LABELS_12_34,
    blocs: {
      'A. Comunicación': {
        '1-2': [
          'Autoconfianza y reflexión. Aceptación del error como instrumento de mejora y propuesta de reparación.',
          'Estrategias básicas para la planificación, ejecución, control y reparación de la comprensión, la producción y la coproducción de textos orales, escritos y multimodales.',
          'Conocimientos, destrezas y actitudes que permitan detectar y colaborar en actividades de mediación en situaciones cotidianas sencillas (parafraseo, equivalencia y síntesis).',
          'Funciones comunicativas básicas adecuadas al ámbito y al contexto comunicativo: saludar, despedirse, agradecer, presentar y presentarse; describir personas, objetos y lugares; situar eventos en el tiempo; situar objetos, personas y lugares en el espacio; pedir e intercambiar información sobre cuestiones cotidianas; dar y pedir instrucciones y órdenes; ofrecer, aceptar y rechazar ayuda, proposiciones o sugerencias; expresar parcialmente el gusto o el interés y emociones básicas; establecer comparaciones y discrepancias; narrar acontecimientos pasados, describir situaciones presentes y enunciar sucesos futuros; expresar la opinión, la posibilidad, la capacidad, la obligación y la prohibición.',
          'Modelos contextuales y géneros discursivos básicos en la comprensión, producción y coproducción de textos orales, escritos y multimodales, breves y sencillos, literarios y no literarios (folletos, instrucciones, normas, avisos o conversaciones reguladoras de la convivencia): características y reconocimiento del contexto (participantes y situación), expectativas generadas por el contexto; organización y estructuración según el género y la función textual.',
          'Unidades lingüísticas básicas y significados asociados a dichas unidades tales como la expresión de la entidad y sus propiedades, cantidad y cualidad, el espacio y las relaciones espaciales, el tiempo y las relaciones temporales, la afirmación, la negación, la interrogación y la exclamación, relaciones lógicas básicas.',
          'Léxico de uso común y de interés para el alumnado relativo a identificación personal, relaciones interpersonales, lugares y entornos cercanos, ocio y tiempo libre, vida cotidiana, salud y actividad física, vivienda y hogar, clima y entorno natural, tecnologías de la información y la comunicación.',
          'Patrones sonoros, acentuales, rítmicos y de entonación básicos, y significados e intenciones comunicativas generales asociadas a dichos patrones.',
          'Convenciones ortográficas básicas y significados e intenciones comunicativas asociados a los formatos, patrones y elementos gráficos.',
          'Convenciones y estrategias conversacionales básicas, en formato síncrono o asíncrono, para iniciar, mantener y terminar la comunicación, tomar y ceder la palabra, pedir y dar aclaraciones y explicaciones, reformular, comparar y contrastar, resumir, colaborar, debatir, etc.',
          'Recursos para el aprendizaje y estrategias básicas de búsqueda de información: diccionarios, libros de consulta, bibliotecas, recursos digitales e informáticos, etc. Distinción de fuentes fidedignas.',
          'Identificación y reconocimiento de la autoría y sus derechos de las fuentes consultadas y los contenidos utilizados.',
          'Herramientas analógicas y digitales básicas para la comprensión, producción y coproducción oral, escrita y multimodal; y plataformas virtuales de interacción, cooperación y colaboración educativa (aulas virtuales, videoconferencias, herramientas digitales colaborativas, etc.) para el aprendizaje, la comunicación y el desarrollo de proyectos con hablantes o estudiantes de la lengua extranjera.',
          'Recursos para realizar actividades de contraste, verificación y análisis críticos, de textos informativos (visuales, auditivos y escritos) provenientes especialmente de redes sociales para el desarrollo del pensamiento crítico frente a la desinformación.',
        ],
        '3-4': [
          'Autoconfianza, reflexión e iniciativa. Aceptación del error como parte integrante del proceso de aprendizaje.',
          'Estrategias de uso común para la planificación, ejecución, control y reparación de la comprensión, la producción y la coproducción de textos orales, escritos y multimodales.',
          'Conocimientos, destrezas y actitudes que permiten llevar a cabo actividades de mediación en situaciones cotidianas (parafraseo, equivalencia y síntesis).',
          'Funciones comunicativas de uso común adecuadas al ámbito y al contexto comunicativo: saludar y despedirse, agradecer, presentar y presentarse; describir personas, objetos, lugares, fenómenos y acontecimientos; situar eventos en el tiempo; situar objetos, personas y lugares en el espacio; pedir e intercambiar información sobre cuestiones cotidianas; dar y pedir instrucciones, consejos y órdenes; ofrecer, aceptar y rechazar ayuda, proposiciones o sugerencias; expresar parcialmente el gusto o el interés y las emociones, incluidas las discrepancias; narrar acontecimientos pasados, describir situaciones presentes, enunciar sucesos futuros y establecer comparaciones; expresar la opinión, impresión o discrepancia, la posibilidad, la capacidad, la obligación y la prohibición; expresar argumentaciones sencillas; realizar hipótesis y suposiciones; expresar la incertidumbre y la duda; reformular y resumir.',
          'Modelos contextuales y géneros discursivos de uso común en la comprensión, producción y coproducción de textos orales, escritos y multimodales, breves y sencillos, literarios y no literarios (instrucciones, normas, avisos o conversaciones reguladoras de la convivencia): características y reconocimiento del contexto (participantes y situación), expectativas generadas por el contexto; organización y estructuración según el género y la función textual.',
          'Unidades lingüísticas de uso común y significados asociados a dichas unidades tales como la expresión de la entidad y sus propiedades, cantidad y cualidad, el espacio y las relaciones espaciales, el tiempo y las relaciones temporales, la afirmación, la negación, la interrogación y la exclamación, relaciones lógicas habituales.',
          'Léxico de uso común y de interés para el alumnado relativo a identificación personal, relaciones interpersonales, lugares diversos y entornos, ocio y tiempo libre, salud y actividad física, hábitos y situaciones de la vida cotidiana, vivienda y hogar, clima y entorno natural, tecnologías de la información y la comunicación, la telecomunicación, medios de comunicación, sistema escolar y formación.',
          'Patrones sonoros, acentuales, rítmicos y de entonación de uso común, y significados e intenciones comunicativas generales asociadas a dichos patrones.',
          'Convenciones ortográficas de uso común y significados e intenciones comunicativas asociados a los formatos, patrones y elementos gráficos.',
          'Convenciones y estrategias conversacionales de uso común, en formato síncrono o asíncrono, para iniciar, mantener y terminar la comunicación, tomar y ceder la palabra, pedir y dar aclaraciones y explicaciones, reformular, comparar y contrastar, resumir, colaborar, debatir, indicar que sigue el hilo de una conversación, etc.',
          'Recursos para el aprendizaje y estrategias de uso común de búsqueda y selección de información: diccionarios, libros de consulta, bibliotecas, recursos digitales e informáticos, etc. Distinción de fuentes fidedignas.',
          'Respeto de la propiedad intelectual y derechos de autor sobre las fuentes consultadas y contenidos utilizados.',
          'Herramientas analógicas y digitales de uso común para la comprensión, producción y coproducción oral, escrita y multimodal; y plataformas virtuales de interacción, cooperación y colaboración educativa (aulas virtuales, videoconferencias, herramientas digitales colaborativas, etc.) para el aprendizaje, la comunicación y el desarrollo de proyectos con hablantes o estudiantes de la lengua extranjera.',
          'Recursos para profundizar en actividades de contraste, verificación y análisis críticos, de textos informativos (visuales, auditivos y escritos) provenientes especialmente de redes sociales para el desarrollo del pensamiento crítico frente a la desinformación.',
        ],
      },
      'B. Plurilingüismo': {
        '1-2': [
          'Estrategias y técnicas para responder eficazmente a una necesidad comunicativa básica y concreta de forma comprensible y con un aceptable nivel de corrección, a pesar de las limitaciones derivadas del nivel de competencia en la lengua extranjera y en las demás lenguas del repertorio lingüístico propio.',
          'Estrategias básicas para identificar, organizar, retener, recuperar y utilizar creativamente unidades lingüísticas (léxico, morfosintaxis, patrones sonoros, etc.) a partir de la comparación de las lenguas y variedades que conforman el repertorio lingüístico personal.',
          'Estrategias y herramientas básicas de autoevaluación y coevaluación, analógicas y digitales, individuales y cooperativas.',
          'Léxico y expresiones de uso común para comprender enunciados sobre la comunicación, la lengua, el aprendizaje y las herramientas de comunicación y aprendizaje (metalenguaje).',
          'Activación del repertorio lingüístico en diferentes lenguas para hacerse entender en situaciones rutinarias de la vida diaria o llevar a cabo transacciones o intercambios de información sencillos.',
          'Comparación básica entre lenguas a partir de elementos de la lengua extranjera y otras lenguas: origen y parentescos.',
        ],
        '3-4': [
          'Estrategias y técnicas para responder eficazmente y con niveles crecientes de fluidez, adecuación y corrección a una necesidad comunicativa concreta a pesar de las limitaciones derivadas del nivel de competencia en la lengua extranjera y en las demás lenguas del repertorio lingüístico propio.',
          'Estrategias de uso común para identificar, organizar, retener, recuperar y utilizar creativamente unidades lingüísticas (léxico, morfosintaxis, patrones sonoros, etc.) a partir de la comparación de las lenguas y variedades que conforman el repertorio lingüístico personal.',
          'Estrategias y herramientas de uso común para la autoevaluación, la coevaluación y la autorreparación, analógicas y digitales, individuales y cooperativas.',
          'Expresiones y léxico específico de uso común para intercambiar ideas sobre la comunicación, la lengua, el aprendizaje y las herramientas de comunicación y aprendizaje (metalenguaje).',
          'Activación del repertorio lingüístico en diferentes lenguas para hacerse entender en situaciones rutinarias de la vida diaria o llevar a cabo transacciones o intercambios de información sencillos.',
          'Comparación entre lenguas a partir de elementos de la lengua extranjera y otras lenguas: origen y parentescos, mensajes e instrucciones breves, anuncios breves y articulados, combinando lo que entiende de las versiones disponibles de las diferentes lenguas.',
          'Activación del repertorio lingüístico en diferentes lenguas para explicar un problema, pedir ayuda, solicitar aclaraciones, realizar transacciones o hacer entender en una situación rutinaria ante la falta de expresión adecuada en la lengua que se esté utilizando.',
        ],
      },
      'C. Interculturalidad': {
        '1-2': [
          'La lengua extranjera como medio de comunicación interpersonal e internacional, como fuente de información y como herramienta para el enriquecimiento personal.',
          'Interés e iniciativa en la realización de intercambios comunicativos a través de diferentes medios con hablantes o estudiantes de la lengua extranjera, respetando sus derechos.',
          'Aspectos socioculturales y sociolingüísticos básicos relativos a la vida cotidiana, las condiciones de vida y las relaciones interpersonales; convenciones sociales básicas; lenguaje no verbal, cortesía lingüística y etiqueta digital; cultura, costumbres y valores propios de países donde se habla la lengua extranjera.',
          'Personajes relevantes del ámbito histórico, cultural y científico, destacando los femeninos, pertenecientes a países hablantes de la lengua extranjera.',
          'Estrategias básicas para entender y apreciar la diversidad lingüística, cultural y artística, atendiendo a valores ecosociales y democráticos y de desarrollo sostenible.',
          'El legado artístico, literario, patrimonial y natural de países de habla de la lengua extranjera.',
          'Estrategias básicas de detección y actuación ante usos discriminatorios del lenguaje verbal y no verbal.',
          'Estrategias básicas para el desarrollo de una modalidad lingüística respetuosa e inclusiva.',
          'Estrategias básicas para el reconocimiento de las diferencias existentes entre las distintas sociedades y culturas, incluyendo la castellanomanchega.',
          'Estrategias básicas para gestionar las emociones negativas, como la ansiedad o el bloqueo, que dificultan el aprendizaje de la lengua en las situaciones comunicativas habituales como, por ejemplo, al hablar en público.',
          'Estrategias básicas para interpretar los comportamientos que son reflejo de aspectos socioculturales, como las relaciones sociales, los saludos, la distancia física, los gestos, la edad, la familia, las fiestas, el ocio, la casa, la cortesía, los rituales, etc.',
        ],
        '3-4': [
          'La lengua extranjera como medio de comunicación interpersonal e internacional, como fuente de información y como herramienta de participación social y de enriquecimiento personal.',
          'Interés e iniciativa en la realización de intercambios comunicativos a través de diferentes medios con hablantes o estudiantes de la lengua extranjera, respetando sus derechos.',
          'Aspectos socioculturales y sociolingüísticos de uso común relativos a la vida cotidiana, las condiciones de vida y las relaciones interpersonales; convenciones sociales de uso común; lenguaje no verbal, cortesía lingüística y etiqueta digital; cultura, normas, actitudes, costumbres y valores propios de países donde se habla la lengua extranjera.',
          'Personajes relevantes del ámbito histórico, cultural y científico, destacando los femeninos, pertenecientes a países hablantes de la lengua extranjera.',
          'Estrategias de uso común para entender y apreciar la diversidad lingüística, cultural y artística, atendiendo a valores ecosociales y democráticos y de desarrollo sostenible.',
          'El legado artístico, literario, patrimonial y natural de países de habla de la lengua extranjera.',
          'Estrategias de uso común de detección y actuación ante usos discriminatorios del lenguaje verbal y no verbal.',
          'Reflexión y toma de conciencia sobre la posibilidad de transmitir un mensaje diferente al que se pretende y el intento de explicarlo de forma sencilla.',
          'Toma de conciencia de la dificultad que se da en la interacción con miembros de otras culturas.',
          'Estrategias básicas para el desarrollo de una modalidad lingüística respetuosa e inclusiva.',
          'Estrategias básicas para el reconocimiento de las diferencias existentes entre las distintas sociedades y culturas, incluyendo la castellano-manchega.',
          'Estrategias básicas para gestionar las emociones negativas, como la ansiedad o el bloqueo, que dificultan el aprendizaje de la lengua en las situaciones comunicativas habituales, como, por ejemplo, al hablar en público.',
          'Estrategias básicas para interpretar los comportamientos que son reflejo de aspectos socioculturales, como las relaciones sociales, los saludos, la distancia física, los gestos, la edad, la familia, las fiestas, el ocio, la casa, la cortesía, los rituales, etc.',
        ],
      },
    },
  },

  Matemáticas: {
    name: 'Matemáticas',
    courseKeys: ['1-2', '3', '4A', '4B'],
    courseLabels: CLM_ESO_LABELS_MAT,
    blocs: {
      'A. Sentido numérico': {
        '1-2': [
          'Conteo: adaptación del conteo al tamaño de los números en problemas de la vida cotidiana.',
          'Cantidad: números grandes y pequeños (notación exponencial y científica y uso de la calculadora); realización de estimaciones con la precisión requerida; números enteros, fraccionarios, decimales y raíces en la expresión de cantidades en contextos de la vida cotidiana; diferentes formas de representación de números enteros, fraccionarios y decimales, incluida la recta numérica; porcentajes mayores que 100 y menores que 1: interpretación.',
          'Sentido de las operaciones: estrategias de cálculo mental con números naturales, fracciones y decimales; operaciones con números enteros, fraccionarios o decimales en situaciones contextualizadas; relaciones inversas entre las operaciones (adición y sustracción; multiplicación y división; elevar al cuadrado y extraer la raíz cuadrada); efecto de las operaciones aritméticas con números enteros, fracciones y expresiones decimales; propiedades de las operaciones (suma, resta, multiplicación, división y potenciación), calculando de manera eficiente con números naturales, enteros, fraccionarios y decimales tanto mentalmente como de forma manual, con calculadora u hoja de cálculo.',
          'Relaciones: factores, múltiplos y divisores, factorización en números primos para resolver problemas; comparación y ordenación de fracciones, decimales y porcentajes; selección de la representación adecuada para una misma cantidad en cada situación o problema.',
          'Razonamiento proporcional: razones y proporciones; porcentajes: comprensión y resolución de problemas; situaciones de proporcionalidad en diferentes contextos (aumentos y disminuciones porcentuales, rebajas y subidas de precios, impuestos, etc.).',
          'Educación financiera: información numérica en contextos financieros sencillos: interpretación; resolución de problemas relacionados con el consumo responsable: relaciones calidad-precio y valor-precio en contextos cotidianos.',
        ],
        '3': [
          'Conteo: estrategias variadas de recuento sistemático en situaciones de la vida cotidiana (diagramas de árbol y técnicas de combinatoria, entre otras).',
          'Cantidad: números grandes y pequeños (notación exponencial y científica y uso de la calculadora); realización de estimaciones con la precisión requerida; números enteros, fraccionarios, decimales y raíces en la expresión de cantidades en contextos de la vida cotidiana.',
          'Sentido de las operaciones: operaciones con cualquier tipo de número real en situaciones contextualizadas; propiedades de las operaciones aritméticas para realizar cálculos, de manera eficiente, con números reales, con calculadora u hoja de cálculo.',
          'Relaciones: patrones y regularidades numéricas.',
          'Razonamiento proporcional: situaciones de proporcionalidad en diferentes contextos (escalas, cambio de divisas, velocidad y tiempo, entre otras).',
          'Educación financiera: métodos para la toma de decisiones de consumo responsable: relaciones calidad-precio y valor-precio en contextos cotidianos.',
        ],
        '4A': [
          'Conteo: resolución de situaciones y problemas de la vida cotidiana mediante estrategias para el recuento sistemático (diagramas de árbol, técnicas de combinatoria, etc.).',
          'Cantidad: realización de estimaciones en diversos contextos analizando y acotando el error cometido; expresión de cantidades mediante números reales con la precisión requerida; los conjuntos numéricos como forma de responder a diferentes necesidades: contar, medir, comparar, etc.',
          'Sentido de las operaciones: operaciones con números reales en la resolución de situaciones contextualizadas; propiedades de las operaciones aritméticas: cálculos con números reales, incluyendo con herramientas digitales; algunos números irracionales en situaciones de la vida cotidiana.',
          'Relaciones: patrones y regularidades numéricas en las que intervengan números reales; orden en la recta numérica; intervalos.',
          'Razonamiento proporcional: situaciones de proporcionalidad directa e inversa en diferentes contextos: desarrollo y análisis de métodos para la resolución de problemas.',
          'Educación financiera: métodos de resolución de problemas relacionados con aumentos y disminuciones porcentuales, intereses y tasas en contextos financieros.',
        ],
        '4B': [
          'Cantidad: realización de estimaciones en diversos contextos analizando y acotando el error cometido; expresión de cantidades mediante números reales con la precisión requerida; diferentes representaciones de una misma cantidad.',
          'Sentido de las operaciones: operaciones con números reales en la resolución de situaciones contextualizadas; potencias, raíces y logaritmos; propiedades y relaciones inversas de las operaciones: cálculos con números reales, incluyendo con herramientas digitales.',
          'Relaciones: los conjuntos numéricos (naturales, enteros, racionales y reales): relaciones entre ellos y propiedades; orden en la recta numérica; intervalos.',
          'Razonamiento proporcional: situaciones de proporcionalidad directa e inversa en diferentes contextos: desarrollo y análisis de métodos para la resolución de problemas.',
        ],
      },
      'B. Sentido de la medida': {
        '1-2': [
          'Magnitud: atributos mensurables de los objetos físicos y matemáticos; estrategias de elección de las unidades y operaciones adecuadas en problemas que impliquen medida.',
          'Medición: longitudes, áreas y volúmenes en formas planas y tridimensionales; representación de objetos geométricos con propiedades fijadas, como las longitudes de los lados o las medidas de los ángulos.',
          'Estimación y relaciones: estrategias para la toma de decisión justificada del grado de precisión requerida en situaciones de medida.',
        ],
        '3': [
          'Medición: longitudes, áreas y volúmenes en formas tridimensionales; representaciones planas de objetos tridimensionales en la visualización y resolución de problemas de áreas; la probabilidad como medida asociada a la incertidumbre de experimentos aleatorios.',
          'Estimación y relaciones: formulación de conjeturas sobre medidas o relaciones entre las mismas basadas en estimaciones.',
        ],
        '4A': [
          'Medición: la pendiente y su relación con un ángulo en situaciones sencillas: deducción y aplicación.',
          'Cambio: estudio gráfico del crecimiento y decrecimiento de funciones en contextos de la vida cotidiana con el apoyo de herramientas tecnológicas: tasas de variación absoluta, relativa y media.',
        ],
        '4B': [
          'Medición: razones trigonométricas de un ángulo agudo y sus relaciones: aplicación a la resolución de problemas.',
          'Cambio: estudio gráfico del crecimiento y decrecimiento de funciones en contextos de la vida cotidiana con el apoyo de herramientas tecnológicas: tasas de variación absoluta, relativa y media.',
        ],
      },
      'C. Sentido espacial': {
        '1-2': [
          'Figuras geométricas de dos y tres dimensiones: descripción y clasificación en función de sus propiedades o características; la relación pitagórica en figuras planas; construcción de figuras geométricas con herramientas manipulativas y digitales (programas de geometría dinámica y realidad aumentada, entre otros).',
          'Localización y sistemas de representación: relaciones espaciales, localización y descripción mediante coordenadas cartesianas.',
          'Movimientos y transformaciones: transformaciones elementales como giros, traslaciones y simetrías en situaciones diversas utilizando herramientas tecnológicas o manipulativas.',
          'Visualización, razonamiento y modelización geométrica: resolución de problemas relacionados con el resto de sentidos matemáticos.',
        ],
        '3': [
          'Figuras geométricas de dos y tres dimensiones: relaciones geométricas como la congruencia, la semejanza y la relación pitagórica en figuras planas y tridimensionales; construcción de figuras geométricas con herramientas manipulativas y digitales.',
          'Localización y sistemas de representación: relaciones espaciales, localización y descripción mediante coordenadas geométricas y otros sistemas de representación.',
          'Visualización, razonamiento y modelización geométrica: modelización geométrica en relaciones numéricas y algebraicas en la resolución de problemas; relaciones geométricas en contextos matemáticos y no matemáticos (arte, ciencia o vida diaria, entre otros).',
        ],
        '4A': [
          'Figuras geométricas de dos y tres dimensiones: propiedades geométricas de objetos de la vida cotidiana: investigación con programas de geometría dinámica.',
          'Movimientos y transformaciones: transformaciones elementales en la vida cotidiana: investigación con herramientas tecnológicas como programas de geometría dinámica, realidad aumentada, etc.',
          'Visualización, razonamiento y modelización geométrica: modelos geométricos (representación y explicación de relaciones numéricas y algebraicas en situaciones diversas); modelización de elementos geométricos de la vida cotidiana con herramientas tecnológicas; elaboración y comprobación de conjeturas sobre propiedades geométricas mediante programas de geometría dinámica u otras herramientas.',
        ],
        '4B': [
          'Figuras geométricas de dos y tres dimensiones: propiedades geométricas de objetos matemáticos y de la vida cotidiana: investigación con programas de geometría dinámica.',
          'Localización y sistemas de representación: figuras y objetos geométricos de dos dimensiones (representación y análisis de sus propiedades utilizando la geometría analítica); expresiones algebraicas de una recta: selección de la más adecuada en función de la situación a resolver.',
          'Movimientos y transformaciones: transformaciones elementales en la vida cotidiana: investigación con herramientas tecnológicas como programas de geometría dinámica, realidad aumentada, etc.',
          'Visualización, razonamiento y modelización geométrica: modelos geométricos (representación y explicación de relaciones numéricas y algebraicas en situaciones diversas); modelización de elementos geométricos con herramientas tecnológicas; elaboración y comprobación de conjeturas sobre propiedades geométricas mediante programas de geometría dinámica u otras herramientas.',
        ],
      },
      'D. Sentido algebraico': {
        '1-2': [
          'Patrones: obtención, mediante observación, de pautas y regularidades sencillas.',
          'Modelo matemático: modelización de situaciones sencillas de la vida cotidiana usando representaciones matemáticas y el lenguaje algebraico; estrategias de deducción de conclusiones razonables a partir de un modelo matemático sencillo.',
          'Variable: comprensión del concepto.',
          'Igualdad y desigualdad: relaciones lineales en situaciones de la vida cotidiana o matemáticamente relevantes (expresión mediante álgebra simbólica); equivalencia de expresiones algebraicas; estrategias de búsqueda de soluciones en ecuaciones y sistemas lineales y ecuaciones cuadráticas; ecuaciones: búsqueda de soluciones mediante el uso de la tecnología.',
          'Relaciones y funciones: relaciones lineales (identificación y comparación de diferentes modos de representación, tablas, gráficas o expresiones algebraicas, y sus propiedades a partir de ellas); estrategias de deducción de la información relevante de una función lineal mediante el uso de diferentes representaciones simbólicas.',
          'Pensamiento computacional: estrategias útiles en la interpretación de algoritmos.',
        ],
        '3': [
          'Patrones: patrones, pautas y regularidades: observación y determinación de la regla de formación en casos sencillos.',
          'Modelo matemático: modelización de situaciones de la vida cotidiana usando representaciones matemáticas y el lenguaje algebraico; estrategias de deducción de conclusiones razonables a partir de un modelo matemático.',
          'Variable: comprensión del concepto en sus diferentes naturalezas.',
          'Igualdad y desigualdad: relaciones lineales y cuadráticas en situaciones de la vida cotidiana o matemáticamente relevantes; equivalencia de expresiones algebraicas en la resolución de problemas basados en relaciones lineales y cuadráticas; estrategias de búsqueda de soluciones en ecuaciones y sistemas lineales y ecuaciones cuadráticas; ecuaciones y sistemas de ecuaciones lineales: resolución mediante el uso de la tecnología.',
          'Relaciones y funciones: relaciones cuantitativas en situaciones de la vida cotidiana y clases de funciones que las modelizan; relaciones lineales y cuadráticas (identificación y comparación de diferentes modos de representación); estrategias de deducción de la información relevante de una función mediante el uso de diferentes representaciones simbólicas.',
          'Pensamiento computacional: generalización y transferencia de procesos de resolución de problemas a otras situaciones; estrategias útiles en la interpretación y modificación de algoritmos; estrategias de formulación de cuestiones susceptibles de ser analizadas mediante programas y otras herramientas.',
        ],
        '4A': [
          'Patrones: patrones, pautas y regularidades: observación, generalización y término general en casos sencillos.',
          'Modelo matemático: modelización y resolución de problemas de la vida cotidiana mediante representaciones matemáticas y lenguaje algebraico, haciendo uso de distintos tipos de funciones; estrategias de deducción y análisis de conclusiones razonables de una situación de la vida cotidiana a partir de un modelo.',
          'Variable: variables (asociación de expresiones simbólicas al contexto del problema y diferentes usos); características del cambio en la representación gráfica de relaciones lineales y cuadráticas.',
          'Igualdad y desigualdad: relaciones lineales, cuadráticas y de proporcionalidad inversa en situaciones de la vida cotidiana o matemáticamente relevantes; formas equivalentes de expresiones algebraicas en la resolución de ecuaciones lineales y cuadráticas, y sistemas de ecuaciones e inecuaciones lineales; estrategias de discusión y búsqueda de soluciones en ecuaciones lineales y cuadráticas; ecuaciones, sistemas de ecuaciones e inecuaciones: resolución mediante el uso de la tecnología.',
          'Relaciones y funciones: relaciones cuantitativas en situaciones de la vida cotidiana y clases de funciones que las modelizan; relaciones lineales y no lineales (identificación y comparación de diferentes modos de representación); representación de funciones: interpretación de sus propiedades en situaciones de la vida cotidiana.',
          'Pensamiento computacional: resolución de problemas mediante la descomposición en partes, la automatización y el pensamiento algorítmico; estrategias en la interpretación, modificación y creación de algoritmos; formulación y análisis de problemas de la vida cotidiana mediante programas y otras herramientas.',
        ],
        '4B': [
          'Patrones: patrones, pautas y regularidades: observación, generalización y término general en casos sencillos.',
          'Modelo matemático: modelización y resolución de problemas de la vida cotidiana mediante representaciones matemáticas y lenguaje algebraico, haciendo uso de distintos tipos de funciones; estrategias de deducción y análisis de conclusiones razonables de una situación de la vida cotidiana a partir de un modelo.',
          'Variable: variables (asociación de expresiones simbólicas al contexto del problema y diferentes usos); relaciones entre cantidades y sus tasas de cambio.',
          'Igualdad y desigualdad: álgebra simbólica (representación de relaciones funcionales en contextos diversos); formas equivalentes de expresiones algebraicas en la resolución de ecuaciones, sistemas de ecuaciones e inecuaciones lineales y no lineales sencillas; estrategias de discusión y búsqueda de soluciones en ecuaciones lineales y no lineales sencillas; ecuaciones, sistemas e inecuaciones: resolución mediante el uso de la tecnología.',
          'Relaciones y funciones: relaciones cuantitativas en situaciones de la vida cotidiana y las clases de funciones que las modelizan; relaciones lineales y no lineales (identificación y comparación de diferentes modos de representación); representación de funciones: interpretación de sus propiedades en situaciones de la vida cotidiana y otros contextos.',
          'Pensamiento computacional: resolución de problemas mediante la descomposición en partes, la automatización y el pensamiento algorítmico; estrategias en la interpretación, modificación y creación de algoritmos; formulación y análisis de problemas de la vida cotidiana mediante programas y otras herramientas.',
        ],
      },
      'E. Sentido estocástico': {
        '1-2': [
          'Organización y análisis de datos: estrategias de recogida y organización de una pequeña cantidad de datos de situaciones de la vida cotidiana que involucran una sola variable; diferencia entre variable y valores individuales; análisis e interpretación de tablas y gráficos estadísticos de variables cualitativas, cuantitativas discretas y cuantitativas continuas; gráficos estadísticos: representación y elección del más adecuado, interpretación y obtención de conclusiones razonadas; medidas de localización: interpretación y cálculo con apoyo tecnológico; variabilidad: interpretación y cálculo, con apoyo tecnológico, de medidas de dispersión.',
          'Incertidumbre: fenómenos deterministas y aleatorios: identificación; experimentos simples: planificación, realización y análisis de la incertidumbre asociada; asignación de probabilidades mediante experimentación, el concepto de frecuencia relativa y la regla de Laplace.',
          'Inferencia: formulación de preguntas adecuadas que permitan conocer las características de interés de una población.',
        ],
        '3': [
          'Organización y análisis de datos: estrategias de recogida y organización de datos de situaciones de la vida cotidiana que involucran una sola variable; gráficos estadísticos: representación mediante diferentes tecnologías y elección del más adecuado para interpretarlo y obtener conclusiones razonadas; medidas de localización: interpretación y cálculo con apoyo tecnológico; variabilidad: interpretación y cálculo, con apoyo tecnológico, de medidas de dispersión; comparación de dos conjuntos de datos atendiendo a las medidas de localización y dispersión.',
          'Incertidumbre: asignación de probabilidades mediante experimentación, el concepto de frecuencia relativa y la regla de Laplace.',
          'Inferencia: datos relevantes para dar respuesta a cuestiones planteadas en investigaciones estadísticas: presentación de la información procedente de una muestra mediante herramientas digitales; estrategias de deducción de conclusiones a partir de una muestra con el fin de emitir juicios y tomar decisiones adecuadas.',
        ],
        '4A': [
          'Organización y análisis de datos: estrategias de recogida y organización de datos de situaciones de la vida cotidiana que involucren una variable bidimensional (tablas de contingencia); análisis e interpretación de tablas y gráficos estadísticos de una y dos variables; medidas de localización y dispersión: interpretación y análisis de la variabilidad; gráficos estadísticos de una y dos variables: representación mediante diferentes tecnologías, análisis, interpretación y obtención de conclusiones razonadas; interpretación de la relación entre dos variables, valorando gráficamente con herramientas tecnológicas la pertinencia de realizar una regresión lineal; ajuste lineal con herramientas tecnológicas.',
          'Incertidumbre: experimentos compuestos (planificación, realización y análisis de la incertidumbre asociada); probabilidad: cálculo aplicando la regla de Laplace y técnicas de recuento en experimentos simples y compuestos y aplicación a la toma de decisiones fundamentadas.',
          'Inferencia: diferentes etapas del diseño de estudios estadísticos; estrategias y herramientas de presentación e interpretación de datos relevantes en investigaciones estadísticas mediante herramientas digitales adecuadas; análisis del alcance de las conclusiones de un estudio estadístico valorando la representatividad de la muestra.',
        ],
        '4B': [
          'Organización y análisis de datos: estrategias de recogida y organización de datos de situaciones de la vida cotidiana que involucren una variable estadística bidimensional (tablas de contingencia); análisis e interpretación de tablas y gráficos estadísticos de una y dos variables; medidas de localización y dispersión: interpretación y análisis de la variabilidad; gráficos estadísticos de una y dos variables: representación mediante diferentes tecnologías, análisis, interpretación y obtención de conclusiones razonadas; interpretación de la relación entre dos variables, valorando gráficamente con herramientas tecnológicas la pertinencia de realizar una regresión lineal; ajuste lineal con herramientas tecnológicas.',
          'Incertidumbre: experimentos compuestos (planificación, realización y análisis de la incertidumbre asociada); probabilidad: cálculo aplicando la regla de Laplace y técnicas de recuento en experimentos simples y compuestos y aplicación a la toma de decisiones fundamentadas.',
          'Inferencia: diferentes etapas del diseño de estudios estadísticos; estrategias y herramientas de presentación e interpretación de datos relevantes en investigaciones estadísticas mediante herramientas digitales adecuadas; análisis del alcance de las conclusiones de un estudio estadístico valorando la representatividad de la muestra.',
        ],
      },
      'F. Sentido socioafectivo': {
        '1-2': [
          'Creencias, actitudes y emociones: gestión emocional (emociones que intervienen en el aprendizaje de las matemáticas, autoconciencia y autorregulación); estrategias de fomento de la curiosidad, la iniciativa, la perseverancia y la resiliencia; estrategias de fomento de la flexibilidad cognitiva (apertura a cambios de estrategia y transformación del error en oportunidad de aprendizaje).',
          'Trabajo en equipo y toma de decisiones: técnicas cooperativas para optimizar el trabajo en equipo y compartir y construir conocimiento matemático; conductas empáticas y estrategias de gestión de conflictos.',
          'Inclusión, respeto y diversidad: actitudes inclusivas y aceptación de la diversidad presente en el aula y en la sociedad; la contribución de las matemáticas al desarrollo de los distintos ámbitos del conocimiento humano desde una perspectiva de género.',
        ],
        '3': [
          'Creencias, actitudes y emociones: gestión emocional (emociones que intervienen en el aprendizaje de las matemáticas, autoconciencia y autorregulación); estrategias de fomento de la curiosidad, la iniciativa, la perseverancia y la resiliencia; estrategias de fomento de la flexibilidad cognitiva.',
          'Trabajo en equipo y toma de decisiones: técnicas cooperativas para optimizar el trabajo en equipo y compartir y construir conocimiento matemático; conductas empáticas y estrategias de gestión de conflictos.',
          'Inclusión, respeto y diversidad: actitudes inclusivas y aceptación de la diversidad presente en el aula y en la sociedad; la contribución de las matemáticas al desarrollo de los distintos ámbitos del conocimiento humano desde una perspectiva de género.',
        ],
        '4A': [
          'Creencias, actitudes y emociones: gestión emocional (emociones que intervienen en el aprendizaje de las matemáticas, autoconciencia y autorregulación, superación de bloqueos emocionales); estrategias de fomento de la curiosidad, la iniciativa, la perseverancia y la resiliencia; estrategias de fomento de la flexibilidad cognitiva.',
          'Trabajo en equipo y toma de decisiones: asunción de responsabilidades y participación activa, optimizando el trabajo en equipo; estrategias de gestión de conflictos (pedir, dar y gestionar ayuda); métodos para la gestión y la toma de decisiones adecuadas en el trabajo en equipo.',
          'Inclusión, respeto y diversidad: actitudes inclusivas y aceptación de la diversidad presente en el aula y en la sociedad; la contribución de las matemáticas al desarrollo de los distintos ámbitos del conocimiento humano desde una perspectiva de género.',
        ],
        '4B': [
          'Creencias, actitudes y emociones: gestión emocional (emociones que intervienen en el aprendizaje de las matemáticas, autoconciencia y autorregulación); estrategias de fomento de la curiosidad, la iniciativa, la perseverancia y la resiliencia; estrategias de fomento de la flexibilidad cognitiva.',
          'Trabajo en equipo y toma de decisiones: asunción de responsabilidades y participación activa, optimizando el trabajo en equipo; estrategias de gestión de conflictos (pedir, dar y gestionar ayuda); métodos para la gestión y la toma de decisiones adecuadas en el trabajo en equipo.',
          'Inclusión, respeto y diversidad: actitudes inclusivas y aceptación de la diversidad presente en el aula y en la sociedad; la contribución de las matemáticas al desarrollo de los distintos ámbitos del conocimiento humano desde una perspectiva de género.',
        ],
      },
    },
  },

  Música: {
    name: 'Música',
    courseKeys: ['1-3', '4'],
    courseLabels: CLM_ESO_LABELS_13_4,
    blocs: {
      'A. Escucha y percepción': {
        '1-3': [
          'El silencio, el sonido, el ruido y la escucha activa. Sensibilidad ante la polución sonora y la creación de ambientes saludables de escucha.',
          'Obras musicales y dancísticas: análisis, descripción y valoración de sus características básicas. Géneros de la música y la danza.',
          'Voces e instrumentos. Clasificación general de los instrumentos por familias y características. Clasificación de los tipos de voz. Agrupaciones.',
          'Compositores y compositoras, artistas e intérpretes internacionales, nacionales, regionales y locales.',
          'Conciertos, actuaciones musicales y otras manifestaciones artístico-musicales en vivo y registradas.',
          'Mitos, estereotipos y roles de género trasmitidos a través de la música y la danza.',
          'Herramientas digitales para la recepción musical.',
          'Estrategias de búsqueda, selección y reelaboración de información fiable, pertinente y de calidad.',
          'Normas de comportamiento básicas en la recepción musical: respeto y valoración.',
        ],
        '4': [
          'El silencio, el sonido, el ruido y la escucha activa. Sensibilización y actitud crítica ante la polución sonora y el consumo indiscriminado de música.',
          'Obras musicales y dancísticas: análisis descriptivo de sus características más relevantes. Géneros musicales y dancísticos.',
          'Voces e instrumentos. Evolución y agrupaciones. Relevancia en las distintas etapas.',
          'Compositores y compositoras, artistas e intérpretes internacionales, nacionales, regionales y locales.',
          'Conciertos, actuaciones musicales y manifestaciones artístico-musicales en vivo y registradas.',
          'Mitos, estereotipos y roles de género trasmitidos a través de la música y la danza.',
          'Herramientas digitales para la recepción musical.',
          'Estrategias de búsqueda, selección y reelaboración de información fiable, pertinente y de calidad.',
          'Actitud de respeto y valoración en la recepción musical.',
        ],
      },
      'B. Interpretación, improvisación y creación escénica': {
        '1-3': [
          'La partitura: identificación y aplicación de grafías, lectura y escritura musical.',
          'Elementos básicos del lenguaje musical: parámetros del sonido, intervalos. Tonalidad: escalas musicales, la armadura y acordes básicos. Texturas. Formas musicales a lo largo de los periodos históricos y en la actualidad.',
          'Principales géneros musicales y escénicos del patrimonio cultural.',
          'Repertorio vocal, instrumental o corporal individual o grupal de distintos tipos de música del patrimonio musical propio y de otras culturas, particularmente del de Castilla-La Mancha.',
          'Técnicas básicas para la interpretación: técnicas vocales, instrumentales y corporales, técnicas de estudio y de control de emociones.',
          'Técnicas de improvisación y/o creación guiada y libre.',
          'Proyectos musicales y audiovisuales: empleo de la voz, el cuerpo, los instrumentos musicales, los medios y las aplicaciones tecnológicas.',
          'La propiedad intelectual y cultural: planteamientos éticos y responsables. Hábitos de consumo musical responsable.',
          'Herramientas digitales para la creación musical. Secuenciadores y editores de partituras.',
          'Normas de comportamiento y participación en actividades musicales.',
        ],
        '4': [
          'La partitura: lectura y escritura musical.',
          'Elementos del lenguaje musical. Tonalidad: modulación, funciones armónicas, progresiones armónicas. Formas musicales complejas.',
          'Repertorio vocal, instrumental o corporal individual o grupal de distintos tipos de música del patrimonio musical histórico, actual y de otras culturas, particularmente de Castilla-La Mancha.',
          'Técnicas para la interpretación: técnicas vocales, instrumentales y corporales, técnicas de estudio y de control de emociones.',
          'Técnicas de improvisación guiada y libre: melódicas y ritmos vocales, instrumentales o corporales.',
          'Planificación y ejecución de proyectos musicales y audiovisuales: empleo de la voz, el cuerpo, los instrumentos musicales, los medios y las aplicaciones tecnológicas.',
          'Valores y hábitos de consumo responsable en las plataformas digitales y las redes sociales musicales.',
          'Recursos para la creación de productos musicales y audiovisuales. Herramientas digitales para la creación musical. Secuenciadores, editores de partituras y aplicaciones informáticas.',
          'Actitudes de respeto y colaboración en la participación activa en actividades musicales.',
        ],
      },
      'C. Contextos y culturas': {
        '1-3': [
          'Historia de la música y de la danza occidental: periodos, características, texturas, formas, géneros, voces, instrumentos y agrupaciones.',
          'Compositoras y compositores de cada periodo de la historia de la música occidental desde una perspectiva igualitaria y abierta.',
          'Las músicas tradicionales en España y su diversidad cultural: instrumentos, canciones, danzas y bailes. Folclore de Castilla-La Mancha.',
          'Tradiciones musicales y dancísticas de otras culturas del mundo.',
          'Músicas populares, urbanas y contemporáneas.',
          'El sonido y la música en los medios audiovisuales y las tecnologías digitales.',
        ],
        '4': [
          'Historia de la música y la danza en España: periodos, características, géneros, voces, instrumentos y agrupaciones.',
          'Tradiciones musicales y dancísticas de otras culturas del mundo: funciones, pervivencia e influencias en otros estilos musicales.',
          'Sistemas de grabación y reproducción del sonido.',
          'Músicas populares, urbanas y contemporáneas.',
          'El sonido y la música en los medios audiovisuales y las tecnologías digitales. La música al servicio de otras artes y lenguajes.',
        ],
      },
    },
  },

  'Tecnología y Digitalización': {
    name: 'Tecnología y Digitalización',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Proceso de resolución de problemas': {
        eso: [
          'Estrategias, técnicas y marcos de resolución de problemas en diferentes contextos y sus fases.',
          'Estrategias de búsqueda crítica de información durante la investigación y definición de problemas planteados.',
          'Análisis de productos y de sistemas tecnológicos: construcción de conocimiento desde distintos enfoques y ámbitos.',
          'Estructuras para la construcción de modelos.',
          'Sistemas mecánicos básicos: montajes físicos o uso de simuladores.',
          'Electricidad y electrónica básica: montaje de esquemas y circuitos físicos o simulados. Interpretación, cálculo, diseño y aplicación en proyectos.',
          'Materiales tecnológicos y su impacto ambiental.',
          'Herramientas y técnicas de manipulación y mecanizado de materiales en la construcción de objetos y prototipos. Introducción a la fabricación digital. Respeto de las normas de seguridad e higiene.',
          'Emprendimiento, resiliencia, perseverancia y creatividad para abordar problemas desde una perspectiva interdisciplinar.',
        ],
      },
      'B. Comunicación y difusión de ideas': {
        eso: [
          'Habilidades básicas de comunicación interpersonal: vocabulario técnico apropiado y pautas de conducta propias del entorno virtual (etiqueta digital).',
          'Expresión gráfica: boceto y croquis. Acotación y escalas.',
          'Aplicaciones CAD en dos dimensiones y en tres dimensiones para la representación de esquemas, circuitos, planos y objetos.',
          'Herramientas digitales para la elaboración, publicación y difusión de documentación técnica e información multimedia relativa a proyectos.',
        ],
      },
      'C. Pensamiento computacional, programación y robótica': {
        eso: [
          'Algoritmia y diagramas de flujo.',
          'Aplicaciones informáticas sencillas, para ordenador y dispositivos móviles, e introducción a la inteligencia artificial.',
          'Sistemas de control programado: montaje físico y uso de simuladores y programación sencilla de dispositivos. Internet de las cosas.',
          'Fundamentos de robótica: montaje y control programado de robots de manera física o por medio de simuladores.',
          'Autoconfianza e iniciativa: el error, la reevaluación y la depuración de errores como parte del proceso de aprendizaje.',
        ],
      },
      'D. Digitalización del entorno personal de aprendizaje': {
        eso: [
          'Dispositivos digitales. Elementos del hardware y del software. Identificación y resolución de problemas técnicos sencillos.',
          'Sistemas de comunicación digital de uso común. Transmisión de datos. Tecnologías inalámbricas para la comunicación.',
          'Herramientas y plataformas de aprendizaje: configuración, mantenimiento y uso crítico.',
          'Herramientas de edición y creación de contenidos: instalación, configuración y uso responsable. Propiedad intelectual.',
          'Técnicas de tratamiento, organización y almacenamiento seguro de la información. Copias de seguridad.',
          'Seguridad en la red: amenazas y ataques. Medidas de protección de datos y de información. Bienestar digital: prácticas seguras y riesgos (ciberacoso, sextorsión, vulneración de la propia imagen y de la intimidad, acceso a contenidos inadecuados, adicciones, etc.).',
        ],
      },
      'E. Tecnología sostenible': {
        eso: [
          'Desarrollo tecnológico: creatividad, innovación, investigación, obsolescencia e impacto social y ambiental. Ética y aplicaciones de las tecnologías emergentes.',
          'Tecnología sostenible. Valoración crítica de la contribución a la consecución de los Objetivos de Desarrollo Sostenible.',
        ],
      },
    },
  },
};
