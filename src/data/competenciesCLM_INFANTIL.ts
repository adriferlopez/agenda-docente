// Competencias específicas (CE) y criterios de evaluación de la Educación
// Infantil de Castilla-La Mancha, generados a partir del Decreto 80/2022, de
// 12 de julio, por el que se establece la ordenación y el currículo de la
// Educación Infantil en la comunidad autónoma de Castilla-La Mancha (DOCM
// núm. 134, 14/07/2022), Anexo II.
//
// El decreto reproduce, prácticamente de forma literal, las tres áreas, los
// enunciados de las competencias específicas y la numeración de criterios del
// Real Decreto 95/2022 (vegeu competenciesINFANTIL_RD95.ts), incorporando
// además algunos criterios y saberes propios (referencias a Castilla-La
// Mancha, iniciación a la lengua extranjera desde el segundo ciclo, iniciación
// a la robótica, etc.) — ver sabersCLM_INFANTIL.ts para el detalle completo.
//
// Como en el resto de fuentes basadas en el RD 95/2022, la fuente solo ofrece
// un único enunciado por CE (no una versión corta y una larga), así que aquí
// "title" y "description" son idénticos.
import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CLM_INFANTIL: Record<string, AreaCompetencies> = {
  'Crecimiento en Armonía': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Progresar en el conocimiento y control de su cuerpo y en la adquisición de distintas estrategias, adecuando sus acciones a la realidad del entorno de una manera segura, para construir una autoimagen ajustada y positiva.',
        description:
          'Progresar en el conocimiento y control de su cuerpo y en la adquisición de distintas estrategias, adecuando sus acciones a la realidad del entorno de una manera segura, para construir una autoimagen ajustada y positiva.',
        criteris: {
          '0-3': [
            'Adecuar sus acciones y reacciones a cada situación, en una interacción lúdica y espontánea con el entorno, explorando sus posibilidades motoras y perceptivas y progresando en precisión, seguridad, coordinación e intencionalidad.',
            'Mostrar aceptación y respeto por el cuerpo propio y por el cuerpo de las demás personas, mejorando progresivamente en su conocimiento.',
            'Manifestar aptitud emocional y sentimientos de seguridad y afecto en la realización de cada acción.',
            'Adquirir nociones temporales básicas para ubicarse en el tiempo, a través de las actividades y rutinas de la vida cotidiana, así como de otros acontecimientos.',
          ].map((t, i) => `1.${i + 1} ${t}`),
          '3-6': [
            'Progresar en el conocimiento y control de su cuerpo, y sus propias posibilidades, ajustando acciones y reacciones, y desarrollando el equilibrio, la percepción sensorial y la coordinación en el movimiento.',
            'Manifestar sentimientos de seguridad personal en la participación en juegos y en las diversas situaciones de la vida cotidiana, confiando en las propias posibilidades y mostrando progresiva iniciativa.',
            'Manipular diferentes objetos, útiles y herramientas en situaciones de juego y en la realización de tareas cotidianas, mostrando una progresiva coordinación óculo-manual en actividades de motricidad fina.',
            'Participar en contextos de juego dirigido y espontáneo, utilizando diferentes estrategias, ajustándose a sus posibilidades personales.',
          ].map((t, i) => `1.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE2',
        title:
          'Reconocer, manifestar y regular progresivamente sus emociones expresando necesidades y sentimientos para lograr bienestar emocional y seguridad afectiva.',
        description:
          'Reconocer, manifestar y regular progresivamente sus emociones expresando necesidades y sentimientos para lograr bienestar emocional y seguridad afectiva.',
        criteris: {
          '0-3': [
            'Expresar emociones y sentimientos, desarrollando de manera progresiva la conciencia emocional, así como herramientas y estrategias para la regulación emocional.',
            'Relacionarse con las otras personas de manera libre, segura, respetuosa y alejada de todo tipo de estereotipos.',
            'Afrontar pequeñas adversidades, manifestando actitudes de superación, así como solicitando y prestando ayuda.',
          ].map((t, i) => `2.${i + 1} ${t}`),
          '3-6': [
            'Identificar y expresar sus necesidades y sentimientos ajustando progresivamente el control de sus emociones, así como la tolerancia ante pequeñas frustraciones.',
            'Ofrecer y pedir ayuda en situaciones cotidianas, valorando los beneficios de la cooperación y la ayuda entre iguales.',
            'Expresar inquietudes, gustos y preferencias, mostrando satisfacción y seguridad sobre los logros conseguidos.',
            'Valorar el trabajo bien hecho, propio y ajeno, incorporando de manera progresiva actitudes de autoconfianza, esfuerzo y autonomía.',
          ].map((t, i) => `2.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE3',
        title:
          'Adoptar modelos, normas y hábitos, desarrollando la confianza en sus posibilidades y sentimientos de logro, para promover un estilo de vida saludable y ecosocialmente responsable.',
        description:
          'Adoptar modelos, normas y hábitos, desarrollando la confianza en sus posibilidades y sentimientos de logro, para promover un estilo de vida saludable y ecosocialmente responsable.',
        criteris: {
          '0-3': [
            'Incorporar estrategias y hábitos relacionados con el cuidado del entorno y el autocuidado, manifestando satisfacción por los beneficios que le aportan.',
            'Reconocer y anticipar la sucesión temporal de actividades, ritmos biológicos y pautas socioculturales que estructuran la dinámica cotidiana, asociándola a elementos, procedimientos y actitudes concretas.',
          ].map((t, i) => `3.${i + 1} ${t}`),
          '3-6': [
            'Realizar actividades relacionadas con el autocuidado y el cuidado del entorno con una actitud respetuosa, mostrando progresiva iniciativa, autonomía y autoconfianza.',
            'Valorar y respetar la secuencia temporal asociada a los acontecimientos y actividades de la vida cotidiana, adaptándose a las rutinas establecidas para el grupo, y desarrollando comportamientos respetuosos hacia las demás personas.',
          ].map((t, i) => `3.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE4',
        title:
          'Establecer interacciones sociales en condiciones de igualdad, valorando la importancia de la amistad, el respeto y la empatía, para construir su propia identidad basada en valores democráticos y de respeto a los derechos humanos.',
        description:
          'Establecer interacciones sociales en condiciones de igualdad, valorando la importancia de la amistad, el respeto y la empatía, para construir su propia identidad basada en valores democráticos y de respeto a los derechos humanos.',
        criteris: {
          '0-3': [
            'Establecer vínculos y relaciones de apego saludables, demostrando actitudes de afecto y empatía hacia las demás personas y respetando los distintos ritmos individuales.',
            'Reproducir conductas y situaciones previamente observadas en su entorno próximo, basadas en el respeto, la empatía, la igualdad de género, el trato no discriminatorio a las personas con discapacidad y el respeto a los derechos humanos, a través del juego de imitación.',
            'Iniciarse en la resolución de conflictos con sus iguales con la mediación de la persona adulta, experimentando los beneficios de llegar a acuerdos.',
          ].map((t, i) => `4.${i + 1} ${t}`),
          '3-6': [
            'Participar con progresiva iniciativa en juegos y actividades colectivas respetando el cumplimiento de normas, relacionándose con otras personas con actitudes de afecto y de empatía, respetando los distintos ritmos individuales y evitando todo tipo de discriminación.',
            'Reproducir conductas, acciones o situaciones adecuadas a través del juego simbólico en interacción con sus iguales, identificando y rechazando todo tipo de estereotipos.',
            'Participar activamente en actividades relacionadas con la reflexión sobre las normas sociales que regulan la convivencia y promueven valores como el respeto a la diversidad, el trato no discriminatorio hacia las personas con discapacidad y la igualdad de género.',
            'Desarrollar destrezas y habilidades para la gestión de conflictos de forma positiva, con actitud crítica, constructiva y empática.',
            'Participar, desde una actitud de respeto, en actividades relacionadas con costumbres y tradiciones étnicas y culturales presentes en su entorno, y propias de Castilla-La Mancha, mostrando interés por conocerlas y valorarlas.',
          ].map((t, i) => `4.${i + 1} ${t}`),
        },
      },
    ],
  },

  'Descubrimiento y Exploración del Entorno': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Identificar las características de materiales, objetos y colecciones y establecer relaciones entre ellos, mediante la exploración, la manipulación sensorial y el manejo de herramientas sencillas y el desarrollo de destrezas lógico-matemáticas para descubrir y crear una idea cada vez más compleja del mundo.',
        description:
          'Identificar las características de materiales, objetos y colecciones y establecer relaciones entre ellos, mediante la exploración, la manipulación sensorial y el manejo de herramientas sencillas y el desarrollo de destrezas lógico-matemáticas para descubrir y crear una idea cada vez más compleja del mundo.',
        criteris: {
          '0-3': [
            'Relacionar objetos a partir de sus cualidades o atributos básicos, mostrando curiosidad e interés.',
            'Emplear los cuantificadores básicos más significativos relacionados con su experiencia diaria, utilizándolos en el contexto del juego y la interacción con los demás.',
            'Aplicar sus conocimientos acerca de las nociones espaciales básicas para ubicarse en los espacios, tanto en reposo como en movimiento, jugando con el propio cuerpo y con los objetos.',
          ].map((t, i) => `1.${i + 1} ${t}`),
          '3-6': [
            'Establecer distintas relaciones entre los objetos a partir de sus cualidades o atributos, mostrando curiosidad e interés.',
            'Emplear los cuantificadores básicos más significativos en el contexto del juego e interacción social.',
            'Ubicarse adecuadamente en los espacios habituales, tanto en reposo como en movimiento, aplicando sus conocimientos acerca de las nociones espaciales básicas y jugando con el propio cuerpo y con objetos.',
            'Identificar las situaciones cotidianas en las que es preciso medir, utilizando el cuerpo u otros materiales y herramientas para efectuar las medidas.',
            'Estructurar, organizar visualmente y manifestar de forma oral su actividad, ordenando las secuencias y utilizando las nociones temporales básicas.',
          ].map((t, i) => `1.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE2',
        title:
          'Desarrollar, de manera progresiva, los procedimientos del método científico y las destrezas del pensamiento computacional, a través de procesos de observación y manipulación de objetos, para iniciarse en la interpretación del entorno y responder de forma creativa a las situaciones y retos que se plantean.',
        description:
          'Desarrollar, de manera progresiva, los procedimientos del método científico y las destrezas del pensamiento computacional, a través de procesos de observación y manipulación de objetos, para iniciarse en la interpretación del entorno y responder de forma creativa a las situaciones y retos que se plantean.',
        criteris: {
          '0-3': [
            'Gestionar las dificultades, retos y problemas, mediante su división en secuencias de actividades más sencillas.',
            'Proponer soluciones alternativas a través de distintas estrategias, escuchando y respetando las de los demás.',
            'Utilizar diferentes estrategias para la toma de decisiones con progresiva autonomía, afrontando el proceso de creación de soluciones en respuesta a los retos a los que se le planteen.',
          ].map((t, i) => `2.${i + 1} ${t}`),
          '3-6': [
            'Gestionar situaciones, dificultades, retos o problemas planificando secuencias de actividades, mostrando interés e iniciativa y la cooperación con sus iguales.',
            'Aplicar progresivamente estrategias para canalizar la frustración ante las dificultades o problemas.',
            'Plantear hipótesis acerca del comportamiento de ciertos elementos o materiales, verificándolas a través de la manipulación y la actuación sobre ellos.',
            'Utilizar diferentes estrategias para la toma de decisiones con progresiva autonomía, creando respuestas y soluciones originales a los retos que se le planteen.',
            'Programar secuencias de acciones o instrucciones para la resolución de tareas analógicas y digitales, favoreciendo y desarrollando las habilidades básicas de pensamiento computacional, adaptado a sus necesidades.',
            'Participar en proyectos utilizando dinámicas cooperativas, compartiendo y valorando opiniones propias y ajenas, y expresando conclusiones y reflexiones personales a partir de ellas.',
          ].map((t, i) => `2.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE3',
        title:
          'Reconocer elementos y fenómenos de la naturaleza, mostrando interés por los hábitos que inciden sobre ella, para apreciar la importancia del uso sostenible, el cuidado y la conservación del entorno en la vida de las personas.',
        description:
          'Reconocer elementos y fenómenos de la naturaleza, mostrando interés por los hábitos que inciden sobre ella, para apreciar la importancia del uso sostenible, el cuidado y la conservación del entorno en la vida de las personas.',
        criteris: {
          '0-3': [
            'Interesarse por las actividades en contacto con la naturaleza y las características de los elementos naturales del entorno, mostrando respeto hacia ellos y hacia los animales que lo habitan.',
            'Identificar, vivenciar y nombrar los fenómenos atmosféricos habituales en su entorno, experimentando sus consecuencias en la vida cotidiana.',
          ].map((t, i) => `3.${i + 1} ${t}`),
          '3-6': [
            'Mostrar una actitud de respeto y protección hacia el medio natural y los animales, identificando el impacto positivo o negativo que algunas acciones humanas ejercen sobre ellos.',
            'Identificar rasgos comunes y diferentes entre seres vivos e inertes.',
            'Reflexionar sobre las fortalezas y dificultades de la vida en zonas rurales y urbanas de Castilla-La Mancha, mostrando interés y motivación por descubrir los recursos naturales y sociales que ambas poseen.',
            'Identificar diferentes seres vivos y su hábitat natural, mostrando especial interés por descubrir Espacios Naturales Protegidos de Castilla-La Mancha.',
            'Establecer relaciones entre el medio natural y el social a partir de conocimiento y la observación de algunos fenómenos naturales y de los elementos patrimoniales presentes en el medio físico.',
          ].map((t, i) => `3.${i + 1} ${t}`),
        },
      },
    ],
  },

  'Comunicación y Representación de la Realidad': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Manifestar interés por interactuar en situaciones cotidianas a través de la exploración y el uso de su repertorio comunicativo, para expresar sus necesidades e intenciones y para responder a las exigencias del entorno.',
        description:
          'Manifestar interés por interactuar en situaciones cotidianas a través de la exploración y el uso de su repertorio comunicativo, para expresar sus necesidades e intenciones y para responder a las exigencias del entorno.',
        criteris: {
          '0-3': [
            'Participar con interés en interacciones cotidianas, utilizando los diferentes sistemas comunicativos.',
            'Participar de forma espontánea en situaciones comunicativas, adecuando la postura, los gestos y los movimientos a sus intenciones.',
            'Manifestar necesidades, sentimientos y vivencias utilizando diferentes herramientas y estrategias comunicativas, aprovechando las posibilidades que ofrecen los diferentes lenguajes con curiosidad y disfrute.',
            'Tomar la iniciativa en la interacción social disfrutando de las situaciones comunicativas con una actitud respetuosa.',
            'Participar en situaciones de uso de diferentes lenguas manifestando interés y curiosidad hacia la diversidad de perfiles lingüísticos.',
          ].map((t, i) => `1.${i + 1} ${t}`),
          '3-6': [
            'Participar de manera activa, espontánea y respetuosa con las diferencias individuales en situaciones comunicativas de progresiva complejidad, en función de su desarrollo individual.',
            'Ajustar su repertorio comunicativo a las propuestas, a los interlocutores y al contexto, indagando en las posibilidades expresivas de los diferentes lenguajes.',
            'Participar en situaciones de uso de diferentes lenguas, mostrando interés, curiosidad y respeto por la diversidad de perfiles lingüísticos.',
            'Interactuar con distintos recursos digitales familiarizándose con diferentes medios de comunicación y herramientas digitales.',
            'Respetar las normas básicas que rigen los diferentes intercambios comunicativos.',
          ].map((t, i) => `1.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE2',
        title:
          'Interpretar y comprender mensajes y representaciones apoyándose en conocimientos y recursos de su propia experiencia para responder a las demandas del entorno y construir nuevos aprendizajes.',
        description:
          'Interpretar y comprender mensajes y representaciones apoyándose en conocimientos y recursos de su propia experiencia para responder a las demandas del entorno y construir nuevos aprendizajes.',
        criteris: {
          '0-3': [
            'Interpretar los estímulos y mensajes del entorno reaccionando de manera adecuada.',
            'Expresar sensaciones, sentimientos y emociones a partir de distintas representaciones y manifestaciones artísticas y culturales.',
          ].map((t, i) => `2.${i + 1} ${t}`),
          '3-6': [
            'Interpretar de forma eficaz los mensajes e intenciones comunicativas de los demás.',
            'Interpretar los mensajes transmitidos mediante representaciones o manifestaciones artísticas, también en formato digital, reconociendo la intencionalidad del emisor y mostrando una actitud curiosa y responsable.',
            'Captar el sentido global de mensajes, expresiones e instrucciones formuladas en lengua extranjera.',
          ].map((t, i) => `2.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE3',
        title:
          'Producir mensajes de manera eficaz, personal y creativa utilizando diferentes lenguajes, descubriendo los códigos de cada uno de ellos y explorando sus posibilidades expresivas para responder a diferentes necesidades comunicativas.',
        description:
          'Producir mensajes de manera eficaz, personal y creativa utilizando diferentes lenguajes, descubriendo los códigos de cada uno de ellos y explorando sus posibilidades expresivas para responder a diferentes necesidades comunicativas.',
        criteris: {
          '0-3': [
            'Utilizar el lenguaje oral para expresar y compartir necesidades, sentimientos, deseos, emociones, vivencias; regulando las acciones e interactuando en diferentes situaciones y contextos.',
            'Explorar las posibilidades expresivas de los diferentes lenguajes, utilizando los medios materiales propios de los mismos.',
            'Producir mensajes ampliando y enriqueciendo su repertorio comunicativo con seguridad y confianza.',
          ].map((t, i) => `3.${i + 1} ${t}`),
          '3-6': [
            'Hacer un uso funcional del lenguaje oral aumentando su repertorio lingüístico y construyendo progresivamente un discurso más eficaz, organizado y coherente en diferentes contextos formales e informales.',
            'Valorar y utilizar el lenguaje oral como instrumento regulador de la acción en las interacciones con los demás con seguridad y confianza.',
            'Evocar y expresar espontáneamente ideas a través del relato oral, así como planes futuros.',
            'Elaborar creaciones plásticas explorando y utilizando diferentes materiales y técnicas, y participando activamente en el trabajo en grupo cuando se precise.',
            'Interpretar propuestas dramáticas y musicales utilizando y explorando diferentes instrumentos, recursos o técnicas.',
            'Ajustar armónicamente su movimiento al de los demás y al espacio como forma de expresión corporal libre, manifestando interés e iniciativa.',
            'Expresarse de manera creativa, utilizando diversas herramientas o aplicaciones digitales intuitivas y visuales.',
            'Iniciarse en la expresión oral en la lengua extranjera para responder a diferentes necesidades comunicativas de la vida cotidiana.',
          ].map((t, i) => `3.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE4',
        title:
          'Participar por iniciativa propia en actividades relacionadas con textos escritos, mostrando interés y curiosidad para comprender su funcionalidad y algunas de sus características.',
        description:
          'Participar por iniciativa propia en actividades relacionadas con textos escritos, mostrando interés y curiosidad para comprender su funcionalidad y algunas de sus características.',
        criteris: {
          '0-3': [
            'Participar en actividades lúdicas de aproximación al lenguaje escrito, mostrando una actitud activa.',
            'Recurrir a escrituras indeterminadas, espontáneas y no convencionales incorporándolas a sus producciones con intención comunicativa.',
          ].map((t, i) => `4.${i + 1} ${t}`),
          '3-6': [
            'Mostrar interés por comunicarse a través de códigos escritos, convencionales o no, valorando su función comunicativa.',
            'Utilizar diferentes elementos que complementan al lenguaje escrito en la interpretación de mensajes.',
            'Identificar de manera acompañada, alguna de las características textuales y paratextuales mediante la indagación en textos de uso social libres de prejuicios y estereotipos sexistas.',
            'Recurrir a la biblioteca como fuente de información y disfrute, respetando sus normas de uso.',
          ].map((t, i) => `4.${i + 1} ${t}`),
        },
      },
      {
        id: 'CE5',
        title:
          'Valorar la diversidad lingüística presente en su entorno, así como otras manifestaciones culturales, para enriquecer sus estrategias comunicativas y su bagaje cultural.',
        description:
          'Valorar la diversidad lingüística presente en su entorno, así como otras manifestaciones culturales, para enriquecer sus estrategias comunicativas y su bagaje cultural.',
        criteris: {
          '0-3': [
            'Relacionarse con naturalidad en la realidad lingüística y cultural del aula.',
            'Manifestar interés y disfrute hacia actividades individuales o colectivas relacionadas con la literatura infantil, las obras musicales, los audiovisuales, las danzas o las dramatizaciones, avanzando en una actitud participativa.',
          ].map((t, i) => `5.${i + 1} ${t}`),
          '3-6': [
            'Relacionarse con normalidad y de forma respetuosa en la pluralidad lingüística y cultural de su entorno y región, manifestando interés por otras lenguas, etnias y culturas.',
            'Participar con interés en interacciones comunicativas en lengua extranjera relacionadas con rutinas y situaciones cotidianas.',
            'Participar en actividades de aproximación a la literatura infantil, tanto de carácter individual como grupal, así como en contextos dialógicos y participativos, descubriendo, explorando y apreciando la belleza del lenguaje literario.',
            'Expresar emociones, ideas y pensamientos a través de manifestaciones musicales, artísticas y culturales, disfrutando del proceso creativo.',
            'Expresar gustos, preferencias y opiniones sobre distintas manifestaciones artísticas, en medios analógicos o digitales, de manera crítica y respetuosa, explicando las emociones que produce su disfrute.',
          ].map((t, i) => `5.${i + 1} ${t}`),
        },
      },
    ],
  },
};
