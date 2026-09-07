// Competencias específicas de la Educación Secundaria Obligatoria (ESO) de
// Castilla-La Mancha, generadas a partir del Decreto 82/2022, de 12 de
// julio, por el que se establece la ordenación y el currículo de la
// Educación Secundaria Obligatoria en la comunidad autónoma de
// Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo II.
//
// Cubre las 11 materias troncales (ver sabersCLM_ESO.ts para el detalle del
// alcance y de las claves de curso usadas por cada una). El decreto formula
// cada competencia específica (CE) en un único enunciado (sin una versión
// corta y otra larga diferenciadas), por lo que, igual que en el resto de
// currículums de Castilla-La Mancha ya integrados, aquí title === description.
import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CLM_ESO: Record<string, AreaCompetencies> = {
  'Biología y Geología': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Interpretar y transmitir información y datos científicos, argumentando sobre ellos y utilizando diferentes formatos, para analizar conceptos y procesos de las ciencias biológicas, geológicas y ambientales.',
        description:
          'Interpretar y transmitir información y datos científicos, argumentando sobre ellos y utilizando diferentes formatos, para analizar conceptos y procesos de las ciencias biológicas, geológicas y ambientales.',
        criteris: {
          '1-3': [
            '1.1 Analizar conceptos y procesos biológicos, geológicos y medioambientales, interpretando información en diferentes formatos (modelos, gráficos, tablas, diagramas, fórmulas, esquemas, símbolos, páginas web, etc.), manteniendo una actitud crítica y obteniendo conclusiones fundamentadas.',
            '1.2 Facilitar la comprensión y análisis de información sobre procesos biológicos y geológicos o trabajos científicos transmitiéndola de forma clara y utilizando la terminología y los formatos adecuados (modelos, gráficos, tablas, vídeos, informes, diagramas, fórmulas, esquemas, símbolos, contenidos digitales, etc.).',
            '1.3 Analizar y explicar fenómenos biológicos, geológicos y ambientales, representándolos mediante modelos y diagramas, utilizando, cuando sea necesario, los pasos del diseño de ingeniería (identificación del problema, exploración, diseño, creación, evaluación y mejora).',
          ],
          '4': [
            '1.1 Analizar conceptos y procesos biológicos, geológicos y medioambientales, interpretando información en diferentes formatos (modelos, gráficos, tablas, diagramas, fórmulas, esquemas, símbolos, páginas web, etc.), manteniendo una actitud crítica, obteniendo conclusiones y formando opiniones propias fundamentadas.',
            '1.2 Transmitir opiniones propias fundamentadas e información sobre Biología y Geología de forma clara y rigurosa, facilitando su comprensión y análisis mediante el uso de la terminología y el formato adecuados (modelos, gráficos, tablas, vídeos, informes, diagramas, fórmulas, esquemas, símbolos, contenidos digitales, etc.).',
            '1.3 Analizar y explicar fenómenos biológicos, geológicos y medioambientales, representándolos mediante el diseño y la realización de modelos y diagramas y utilizando, cuando sea necesario, los pasos del diseño de ingeniería (identificación del problema, exploración, diseño, creación, evaluación y mejora).',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Identificar, localizar y seleccionar información, contrastando su veracidad, organizándola y evaluándola críticamente, para resolver preguntas relacionadas con las ciencias biológicas, geológicas y ambientales.',
        description:
          'Identificar, localizar y seleccionar información, contrastando su veracidad, organizándola y evaluándola críticamente, para resolver preguntas relacionadas con las ciencias biológicas, geológicas y ambientales.',
        criteris: {
          '1-3': [
            '2.1 Resolver cuestiones sobre Biología y Geología localizando, seleccionando y organizando información de distintas fuentes y citándolas correctamente.',
            '2.2 Reconocer la información sobre temas biológicos y geológicos con base científica, distinguiéndola de pseudociencias, bulos, teorías conspiratorias y creencias infundadas y manteniendo una actitud escéptica ante estos.',
            '2.3 Valorar la contribución de la ciencia a la sociedad y la labor de las personas dedicadas a ella, en especial en Castilla-La Mancha, con independencia de su etnia, sexo o cultura, destacando y reconociendo el papel de las mujeres científicas y entendiendo la investigación como una labor colectiva e interdisciplinar en constante evolución.',
          ],
          '4': [
            '2.1 Resolver cuestiones y profundizar en aspectos biológicos y geológicos localizando, seleccionando, organizando y analizando críticamente la información de distintas fuentes y citándolas con respeto por la propiedad intelectual.',
            '2.2 Contrastar la veracidad de la información sobre temas biológicos y geológicos o trabajos científicos, utilizando fuentes fiables y adoptando una actitud crítica y escéptica hacia informaciones sin una base científica como pseudociencias, teorías conspiratorias, creencias infundadas, bulos, etc.',
            '2.3 Valorar la contribución de la ciencia a la sociedad y la labor de las personas dedicadas a ella, destacando el papel de la mujer y de investigadores de Castilla-La Mancha, entendiendo la investigación como una labor colectiva e interdisciplinar en constante evolución influida por el contexto político y los recursos económicos.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Planificar y desarrollar proyectos de investigación, siguiendo los pasos de las metodologías científicas y cooperando cuando sea necesario, para indagar en aspectos relacionados con las ciencias geológicas, biológicas y ambientales.',
        description:
          'Planificar y desarrollar proyectos de investigación, siguiendo los pasos de las metodologías científicas y cooperando cuando sea necesario, para indagar en aspectos relacionados con las ciencias geológicas, biológicas y ambientales.',
        criteris: {
          '1-3': [
            '3.1 Plantear preguntas e hipótesis e intentar realizar predicciones sobre fenómenos biológicos o geológicos que puedan ser respondidas o contrastadas utilizando métodos científicos.',
            '3.2 Diseñar la experimentación, la toma de datos y el análisis de fenómenos biológicos y geológicos de modo que permitan responder a preguntas concretas y contrastar una hipótesis planteada.',
            '3.3 Realizar experimentos y tomar datos cuantitativos o cualitativos sobre fenómenos biológicos y geológicos utilizando los instrumentos, herramientas o técnicas adecuadas con corrección.',
            '3.4 Interpretar los resultados obtenidos en un proyecto de investigación utilizando, cuando sea necesario, herramientas matemáticas y tecnológicas.',
            '3.5 Cooperar dentro de un proyecto científico, fomentando la investigación científica, asumiendo responsablemente una función concreta, utilizando espacios virtuales cuando sea necesario, respetando la diversidad y la igualdad de género, y favoreciendo la inclusión.',
          ],
          '4': [
            '3.1 Plantear preguntas e hipótesis que puedan ser respondidas o contrastadas utilizando métodos científicos, en la explicación de fenómenos biológicos, geológicos y/o ambientales y la realización de predicciones sobre estos.',
            '3.2 Diseñar la experimentación, la toma de datos y el análisis de fenómenos biológicos, geológicos y/o ambientales de modo que permitan responder a preguntas concretas y contrastar una hipótesis planteada evitando sesgos.',
            '3.3 Realizar experimentos y tomar datos cuantitativos o cualitativos sobre fenómenos biológicos, geológicos y/o ambientales utilizando los instrumentos, herramientas o técnicas adecuadas con corrección y precisión.',
            '3.4 Interpretar y analizar los resultados obtenidos en un proyecto de investigación utilizando, cuando sea necesario, herramientas matemáticas y tecnológicas y obteniendo conclusiones razonadas y fundamentadas o valorar la imposibilidad de hacerlo.',
            '3.5 Cooperar y colaborar en las distintas fases de un proyecto científico para trabajar con mayor eficiencia, valorando la importancia de la cooperación en la investigación, respetando la diversidad y la igualdad de género, y favoreciendo la inclusión.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Utilizar el razonamiento y el pensamiento computacional, analizando críticamente las respuestas y soluciones y reformulando el procedimiento, si fuera necesario, para resolver problemas o dar explicación a procesos de la vida cotidiana relacionados con la biología, la geología y el medio ambiente.',
        description:
          'Utilizar el razonamiento y el pensamiento computacional, analizando críticamente las respuestas y soluciones y reformulando el procedimiento, si fuera necesario, para resolver problemas o dar explicación a procesos de la vida cotidiana relacionados con la biología, la geología y el medio ambiente.',
        criteris: {
          '1-3': [
            '4.1 Resolver problemas o dar explicación a procesos biológicos, geológicos o ambientales utilizando conocimientos, datos e información proporcionados por el docente, el razonamiento lógico, el pensamiento computacional o recursos digitales.',
            '4.2 Analizar críticamente la solución a un problema sobre fenómenos biológicos, geológicos y ambientales, haciendo especial énfasis en nuestro entorno de Castilla-La Mancha.',
          ],
          '4': [
            '4.1 Resolver problemas o dar explicación a procesos biológicos, geológicos y ambientales utilizando conocimientos, datos e información proporcionados por el docente, el razonamiento lógico, el pensamiento computacional o recursos digitales.',
            '4.2 Analizar críticamente la solución a un problema sobre fenómenos biológicos, geológicos y ambientales, haciendo especial énfasis en nuestro entorno de Castilla-La Mancha, cambiando los procedimientos utilizados o las conclusiones si dicha solución no fuese viable o ante nuevos datos aportados con posterioridad.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Analizar los efectos de determinadas acciones sobre el medio ambiente y la salud, basándose en los fundamentos de las ciencias biológicas y de la Tierra, para promover y adoptar hábitos que eviten o minimicen los impactos medioambientales negativos, sean compatibles con un desarrollo sostenible y permitan mantener y mejorar la salud individual y colectiva.',
        description:
          'Analizar los efectos de determinadas acciones sobre el medio ambiente y la salud, basándose en los fundamentos de las ciencias biológicas y de la Tierra, para promover y adoptar hábitos que eviten o minimicen los impactos medioambientales negativos, sean compatibles con un desarrollo sostenible y permitan mantener y mejorar la salud individual y colectiva.',
        criteris: {
          '1-3': [
            '5.1 Relacionar, con fundamentos científicos, la preservación de la biodiversidad, la conservación del medio ambiente, la protección de los seres vivos del entorno, el desarrollo sostenible y la calidad de vida, haciendo referencia a nuestro entorno de Castilla-La Mancha.',
            '5.2 Proponer y adoptar hábitos sostenibles, analizando de una manera crítica las actividades propias y ajenas a partir de los propios razonamientos, de los conocimientos adquiridos y de la información disponible.',
            '5.3 Proponer y adoptar hábitos saludables, analizando las acciones propias y ajenas con actitud crítica y a partir de fundamentos fisiológicos.',
          ],
          '4': [
            '5.1 Identificar los posibles riesgos naturales (pérdidas de biodiversidad, alteraciones del suelo y fenómenos meteorológicos extremos, entre otros) potenciados por determinadas acciones humanas sobre una zona geográfica, teniendo en cuenta sus características litológicas, relieve, vegetación y factores socioeconómicos.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Analizar los elementos de un paisaje concreto, priorizando el entorno de Castilla-La Mancha, valorándolo como patrimonio natural y utilizando conocimientos sobre geología y ciencias de la Tierra para explicar su historia geológica, proponer acciones encaminadas a su protección e identificar posibles riesgos naturales.',
        description:
          'Analizar los elementos de un paisaje concreto, priorizando el entorno de Castilla-La Mancha, valorándolo como patrimonio natural y utilizando conocimientos sobre geología y ciencias de la Tierra para explicar su historia geológica, proponer acciones encaminadas a su protección e identificar posibles riesgos naturales.',
        criteris: {
          '1-3': [
            '6.1 Valorar la importancia del paisaje, destacando el entorno de Castilla-La Mancha, como patrimonio natural analizando la fragilidad de los elementos que lo componen.',
            '6.2 Interpretar el paisaje analizando sus elementos y reflexionando sobre el impacto ambiental y los riesgos naturales derivados de determinadas acciones humanas.',
            '6.3 Reflexionar sobre los riesgos naturales mediante el análisis de los elementos de un paisaje.',
          ],
          '4': [
            '6.1 Deducir y explicar la historia geológica de un relieve identificando sus elementos más relevantes a partir de cortes, mapas u otros sistemas de información geológica y utilizando el razonamiento, los principios geológicos básicos (horizontalidad, superposición, actualismo y métodos de datación, entre otros) y las teorías geológicas más relevantes.',
          ],
        },
      },
    ],
  },

  'Educación Física': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Adoptar un estilo de vida activo y saludable, seleccionando e incorporando intencionalmente actividades físicas y deportivas en las rutinas diarias a partir de un análisis crítico de los modelos corporales y del rechazo de las prácticas que carezcan de base científica, para hacer un uso saludable y autónomo del tiempo libre y así mejorar la calidad de vida.',
        description:
          'Adoptar un estilo de vida activo y saludable, seleccionando e incorporando intencionalmente actividades físicas y deportivas en las rutinas diarias a partir de un análisis crítico de los modelos corporales y del rechazo de las prácticas que carezcan de base científica, para hacer un uso saludable y autónomo del tiempo libre y así mejorar la calidad de vida.',
        criteris: {
          '1-2': [
            '1.1 Establecer y organizar secuencias sencillas de actividad física orientada al concepto integral de salud y al estilo de vida activo, a partir de una valoración del nivel inicial y respetando la propia realidad e identidad corporal.',
            '1.2 Comenzar a incorporar con progresiva autonomía procesos de activación corporal, dosificación del esfuerzo, alimentación saludable, educación postural, relajación e higiene durante la práctica de actividades motrices, interiorizando las rutinas propias de una práctica motriz saludable y responsable.',
            '1.3 Adoptar de manera responsable y con progresiva autonomía medidas generales para la prevención de lesiones antes, durante y después de la práctica de actividad física, aprendiendo a reconocer situaciones de riesgo para actuar preventivamente.',
            '1.4 Actuar de acuerdo a los protocolos de intervención ante accidentes derivados de la práctica de actividad física, aplicando medidas básicas de primeros auxilios.',
            '1.5 Analizar y valorar la incidencia que ciertas prácticas y comportamientos tienen en nuestra salud y en la convivencia, valorando su impacto y evitando activamente su reproducción.',
            '1.6 Explorar diferentes recursos y aplicaciones digitales reconociendo su potencial, así como los riesgos para su uso en el ámbito de la actividad física y el deporte.',
          ],
          '3-4': [
            '1.1 Planificar y autorregular la práctica de actividad física orientada al concepto integral de salud y al estilo de vida activo, según las necesidades e intereses individuales y respetando la propia realidad e identidad corporal.',
            '1.2 Incorporar de forma autónoma los procesos de activación corporal, autorregulación y dosificación del esfuerzo, alimentación saludable, educación postural, relajación e higiene durante la práctica de actividades motrices, interiorizando las rutinas propias de una práctica motriz saludable y responsable.',
            '1.3 Adoptar de manera responsable y autónoma medidas específicas para la prevención de lesiones antes, durante y después de la práctica de actividad física, aprendiendo a reconocer situaciones de riesgo para actuar preventivamente.',
            '1.4 Actuar de acuerdo a los protocolos de intervención ante situaciones de emergencia o accidentes aplicando medidas específicas de primeros auxilios.',
            '1.5 Adoptar actitudes comprometidas y transformadoras que rechacen los estereotipos sociales asociados al ámbito de lo corporal, al género y a la diversidad sexual, y los comportamientos que pongan en riesgo la salud, contrastando con autonomía e independencia cualquier información en base a criterios científicos de validez, fiabilidad y objetividad.',
            '1.6 Planificar, desarrollar y compartir con seguridad la práctica física cotidiana manejando recursos y aplicaciones digitales vinculados al ámbito de la actividad física y el deporte.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Adaptar, con progresiva autonomía en su ejecución, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices, aplicando procesos de percepción, decisión y ejecución adecuados a la lógica interna y a los objetivos de diferentes situaciones con dificultad variable, para resolver situaciones de carácter motor vinculadas con distintas actividades físicas funcionales, deportivas, expresivas y recreativas, y para consolidar actitudes de superación, crecimiento y resiliencia al enfrentarse a desafíos físicos.',
        description:
          'Adaptar, con progresiva autonomía en su ejecución, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices, aplicando procesos de percepción, decisión y ejecución adecuados a la lógica interna y a los objetivos de diferentes situaciones con dificultad variable, para resolver situaciones de carácter motor vinculadas con distintas actividades físicas funcionales, deportivas, expresivas y recreativas, y para consolidar actitudes de superación, crecimiento y resiliencia al enfrentarse a desafíos físicos.',
        criteris: {
          '1-2': [
            '2.1 Desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, estableciendo mecanismos para reconducir los procesos de trabajo, incluyendo estrategias de autoevaluación y coevaluación tanto del proceso como del resultado.',
            '2.2 Interpretar y actuar correctamente en contextos motrices variados, aplicando principios básicos de toma de decisiones en situaciones lúdicas, juegos modificados y actividades deportivas a partir de la anticipación, adecuándose a las demandas motrices, a la actuación del compañero o de la compañera y de la persona oponente (si la hubiera) y a la lógica interna en contextos reales o simulados de actuación, reflexionando sobre las soluciones y los resultados obtenidos.',
            '2.3 Evidenciar control y dominio corporal al emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, haciendo frente a las demandas de resolución de problemas en situaciones motrices transferibles a su espacio vivencial con progresiva autonomía.',
          ],
          '3-4': [
            '2.1 Desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, estableciendo mecanismos para reconducir los procesos de trabajo y asegurar una participación equilibrada, incluyendo estrategias de autoevaluación y coevaluación tanto del proceso como del resultado.',
            '2.2 Mostrar habilidades para la adaptación y la actuación ante situaciones con una elevada incertidumbre, aprovechando eficientemente las propias capacidades y aplicando de manera automática procesos de percepción, decisión y ejecución en contextos reales o simulados de actuación, reflexionando sobre las soluciones y resultados obtenidos.',
            '2.3 Evidenciar control y dominio corporal al emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, resolviendo problemas en todo tipo de situaciones motrices transferibles a su espacio vivencial con autonomía.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Compartir espacios de práctica físico-deportiva con independencia de las diferencias culturales, sociales, de género y de habilidad, priorizando el respeto entre participantes y a las reglas sobre los resultados, adoptando una actitud crítica ante comportamientos antideportivos o contrarios a la convivencia y desarrollando procesos de autorregulación emocional que canalicen el fracaso y el éxito en estas situaciones, para contribuir con progresiva autonomía al entendimiento social y al compromiso ético en los diferentes espacios en los que se participa.',
        description:
          'Compartir espacios de práctica físico-deportiva con independencia de las diferencias culturales, sociales, de género y de habilidad, priorizando el respeto entre participantes y a las reglas sobre los resultados, adoptando una actitud crítica ante comportamientos antideportivos o contrarios a la convivencia y desarrollando procesos de autorregulación emocional que canalicen el fracaso y el éxito en estas situaciones, para contribuir con progresiva autonomía al entendimiento social y al compromiso ético en los diferentes espacios en los que se participa.',
        criteris: {
          '1-2': [
            '3.1 Practicar una gran variedad de actividades motrices, valorando las implicaciones éticas de las actitudes antideportivas, evitando la competitividad desmedida y actuando con deportividad al asumir los roles de público, participante u otros.',
            '3.2 Cooperar o colaborar en la práctica de diferentes producciones motrices para alcanzar el logro individual y grupal, participando en la toma de decisiones y asumiendo distintos roles asignados y responsabilidades.',
            '3.3 Hacer uso con progresiva autonomía de habilidades sociales, diálogo en la resolución de conflictos y respeto ante la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnica, socio-económica o de competencia motriz, mostrando una actitud crítica y un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia, haciendo respetar el propio cuerpo y el de los demás.',
          ],
          '3-4': [
            '3.1 Practicar y participar activamente asumiendo responsabilidades en la organización de una gran variedad de actividades motrices, valorando las implicaciones éticas de las prácticas antideportivas, evitando la competitividad desmedida y actuando con deportividad al asumir los roles de público, participante u otros.',
            '3.2 Cooperar o colaborar en la práctica de diferentes producciones motrices y proyectos para alcanzar el logro individual y grupal, participando con autonomía en la toma de decisiones vinculadas a la asignación de roles, la gestión del tiempo de práctica y la optimización del resultado final.',
            '3.3 Relacionarse y entenderse con el resto de participantes durante el desarrollo de diversas prácticas motrices con autonomía y haciendo uso efectivo de habilidades sociales de diálogo en la resolución de conflictos y respeto ante la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnica, socio-económica o de competencia motriz, y posicionándose activamente frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia, haciendo respetar el propio cuerpo y el de los demás.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Practicar, analizar y valorar distintas manifestaciones de la cultura motriz aprovechando las posibilidades y recursos expresivos que ofrecen el cuerpo y el movimiento y profundizando en las consecuencias del deporte como fenómeno social, analizando críticamente sus manifestaciones desde la perspectiva de género y desde los intereses económico-políticos que lo rodean, para alcanzar una visión más realista, contextualizada y justa de la motricidad en el marco de las sociedades actuales.',
        description:
          'Practicar, analizar y valorar distintas manifestaciones de la cultura motriz aprovechando las posibilidades y recursos expresivos que ofrecen el cuerpo y el movimiento y profundizando en las consecuencias del deporte como fenómeno social, analizando críticamente sus manifestaciones desde la perspectiva de género y desde los intereses económico-políticos que lo rodean, para alcanzar una visión más realista, contextualizada y justa de la motricidad en el marco de las sociedades actuales.',
        criteris: {
          '1-2': [
            '4.1 Gestionar la participación en juegos motores y otras manifestaciones artístico-expresivas vinculadas tanto con la cultura propia como con otras, favoreciendo su conservación y valorando sus orígenes, evolución e influencia en las sociedades contemporáneas.',
            '4.2 Analizar objetivamente las diferentes actividades y modalidades deportivas según sus características y requerimientos, evitando los posibles estereotipos de género o capacidad o los comportamientos sexistas vinculados a dichas manifestaciones.',
            '4.3 Participar activamente en la creación y representación de composiciones de expresión corporal individuales o colectivas con y sin base musical, utilizando intencionadamente y con progresiva autonomía el cuerpo como herramienta de expresión y comunicación a través de diversas técnicas expresivas.',
          ],
          '3-4': [
            '4.1 Comprender y practicar diversas modalidades relacionadas con la cultura propia, la tradicional o las procedentes de otros lugares del mundo, identificando y contextualizando la influencia social del deporte en las sociedades actuales y valorando sus orígenes, evolución, distintas manifestaciones e intereses económico-políticos.',
            '4.2 Adoptar actitudes comprometidas y conscientes acerca de los distintos estereotipos de género y comportamientos sexistas que se siguen produciendo en algunos contextos de la motricidad, identificando los factores que contribuyen a su mantenimiento y ayudando a difundir referentes de distintos géneros en el ámbito físico-deportivo.',
            '4.3 Crear y representar composiciones individuales o colectivas con y sin base musical y de manera coordinada, utilizando intencionadamente y con autonomía el cuerpo y el movimiento como herramienta de expresión y comunicación a través de técnicas expresivas específicas, y ayudando a difundir y compartir dichas prácticas culturales entre compañeros y compañeras u otros miembros de la comunidad.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Adoptar un estilo de vida sostenible y ecosocialmente responsable aplicando medidas de seguridad individuales y colectivas en la práctica físico-deportiva según el entorno y desarrollando colaborativa y cooperativamente acciones de servicio a la comunidad vinculadas a la actividad física y al deporte, para contribuir activamente a la conservación del medio natural y urbano.',
        description:
          'Adoptar un estilo de vida sostenible y ecosocialmente responsable aplicando medidas de seguridad individuales y colectivas en la práctica físico-deportiva según el entorno y desarrollando colaborativa y cooperativamente acciones de servicio a la comunidad vinculadas a la actividad física y al deporte, para contribuir activamente a la conservación del medio natural y urbano.',
        criteris: {
          '1-2': [
            '5.1 Participar en actividades físico-deportivas en entornos naturales, terrestres o acuáticos, disfrutando del entorno de manera sostenible, minimizando el impacto ambiental que estas puedan producir y siendo conscientes de su huella ecológica.',
            '5.2 Practicar actividades físico-deportivas en el medio natural y urbano, aplicando normas de seguridad individuales y colectivas.',
          ],
          '3-4': [
            '5.1 Participar en actividades físico-deportivas en entornos naturales terrestres o acuáticos, disfrutando del entorno de manera sostenible, minimizando el impacto ambiental que estas puedan producir, siendo conscientes de su huella ecológica, y desarrollando actuaciones intencionadas dirigidas a la conservación y mejora de las condiciones de los espacios en los que se desarrollen.',
            '5.2 Diseñar y organizar actividades físico-deportivas en el medio natural y urbano, asumiendo responsabilidades y aplicando normas de seguridad individuales y colectivas.',
          ],
        },
      },
    ],
  },

  'Educación en Valores Cívicos y Éticos': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Inquirir e investigar cuanto se refiere a la identidad humana y a cuestiones éticas relativas al propio proyecto vital, analizando críticamente información fiable y generando una actitud reflexiva al respecto, para promover el autoconocimiento y la elaboración de planteamientos y juicios morales de manera autónoma y razonada.',
        description:
          'Inquirir e investigar cuanto se refiere a la identidad humana y a cuestiones éticas relativas al propio proyecto vital, analizando críticamente información fiable y generando una actitud reflexiva al respecto, para promover el autoconocimiento y la elaboración de planteamientos y juicios morales de manera autónoma y razonada.',
        criteris: {
          eso: [
            '1.1 Construir y expresar un concepto ajustado de sí mismo reconociendo las múltiples dimensiones de su naturaleza y personalidad, así como de la dimensión cívica y moral de la misma, a partir de la investigación y el diálogo en torno a diversas concepciones sobre la naturaleza humana.',
            '1.2 Identificar, gestionar y comunicar ideas, emociones, afectos y deseos con comprensión y empatía hacia las demás personas, demostrando autoestima y compartiendo un concepto adecuado de lo que deben ser las relaciones con otras personas, incluyendo el ámbito afectivo-sexual.',
            '1.3 Identificar las características que debe tener la amistad y los factores que la favorecen, distinguiendo las amistades de las relaciones interesadas y analizando los mitos del amor romántico asociados con la violencia de género.',
            '1.4 Comprender las diversas relaciones afectivas y sexuales de manera sana y equilibrada, así como el significado de heterosexualidad, homosexualidad y bisexualidad, fomentando el respeto a la diversidad sexual.',
            '1.5 Desarrollar y demostrar autonomía moral a través de la práctica de la deliberación racional, el uso de conceptos éticos, y el diálogo respetuoso con los demás en torno a distintos valores y modos de vida, así como a problemas relacionados con el ejercicio de los derechos individuales, el uso responsable y seguro de las redes, las conductas adictivas, el acoso escolar y las conductas de riesgo referidas a ellos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Actuar e interactuar de acuerdo con normas y valores cívicos y éticos, a partir del reconocimiento fundado de su importancia para regular la vida comunitaria y su aplicación efectiva y justificada en distintos contextos, para promover una convivencia pacífica, respetuosa, democrática y comprometida con el bien común.',
        description:
          'Actuar e interactuar de acuerdo con normas y valores cívicos y éticos, a partir del reconocimiento fundado de su importancia para regular la vida comunitaria y su aplicación efectiva y justificada en distintos contextos, para promover una convivencia pacífica, respetuosa, democrática y comprometida con el bien común.',
        criteris: {
          eso: [
            '2.1 Promover y demostrar una convivencia pacífica, respetuosa, democrática y comprometida con el bien común, a partir de la investigación sobre la naturaleza social y política del ser humano y el uso y comprensión crítica de los conceptos de ley, poder, soberanía, justicia, Estado, democracia, memoria democrática, dignidad y derechos humanos.',
            '2.2 Fomentar el ejercicio de la ciudadanía activa y democrática a través del conocimiento del movimiento asociativo y la participación respetuosa, dialogante y constructiva en actividades de grupo que impliquen tomar decisiones colectivas, planificar acciones coordinadas y resolver problemas aplicando procedimientos y principios cívicos, éticos y democráticos explícitos.',
            '2.3 Contribuir a generar un compromiso activo con el bien común a través del análisis y la toma razonada y dialogante de posición en torno a cuestiones éticas de actualidad como la lucha contra la desigualdad y la pobreza, el derecho al trabajo, la salud, la educación y la justicia, así como sobre los fines y límites éticos de la investigación científica.',
            '2.4 Tomar consciencia de la necesidad de la lucha por una efectiva igualdad de género, y en contra de la violencia y explotación ejercidas sobre las mujeres, a través del análisis de políticas de igualdad y políticas salariales, de las diversas olas y corrientes del feminismo y de las medidas de prevención de la desigualdad, la violencia y la discriminación por razón de género y orientación sexual, mostrando igualmente conocimiento de los derechos LGTBIQ+ y reconociendo la necesidad de respetarlos.',
            '2.5 Contribuir activamente al bienestar social adoptando una posición propia, explícita, informada y éticamente fundamentada sobre el valor y pertinencia de los derechos humanos, el respeto por la diversidad etnocultural, la consideración de los bienes públicos globales y la percepción del valor social de los impuestos.',
            '2.6 Contribuir a la consecución de un mundo más justo y pacífico a través del análisis y reconocimiento de la historia democrática de nuestro país y de las funciones del Estado de derecho y sus instituciones, los organismos internacionales, las asociaciones civiles y los cuerpos y fuerzas de seguridad del Estado, en su empeño por lograr la paz y la seguridad integral, atender a las víctimas de la violencia y promover la solidaridad y cooperación entre las personas y los pueblos.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Entender la naturaleza interconectada e inter y ecodependiente de las actividades humanas, mediante la identificación y análisis de problemas ecosociales de relevancia, para promover hábitos y actitudes éticamente comprometidos con el logro de formas de vida sostenibles.',
        description:
          'Entender la naturaleza interconectada e inter y ecodependiente de las actividades humanas, mediante la identificación y análisis de problemas ecosociales de relevancia, para promover hábitos y actitudes éticamente comprometidos con el logro de formas de vida sostenibles.',
        criteris: {
          eso: [
            '3.1 Describir las relaciones históricas de interconexión, interdependencia y ecodependencia entre nuestras vidas y el entorno a partir del análisis de las causas y consecuencias de los más graves problemas ecosociales que nos afectan.',
            '3.2 Valorar distintos planteamientos científicos, políticos y éticos con los que afrontar la emergencia climática y la crisis medioambiental a través de la exposición y el debate argumental en torno a los mismos.',
            '3.3 Promover estilos de vida éticamente comprometidos con el logro de un desarrollo sostenible, contribuyendo por sí mismo y en su entorno a la prevención de los residuos, la gestión sostenible de los recursos, la movilidad segura, sostenible y saludable, el comercio justo, el consumo responsable, el cuidado del patrimonio natural, el respeto por la diversidad etnocultural, y el cuidado y protección de los animales.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Mostrar una adecuada estima de sí mismo y del entorno, reconociendo y valorando las emociones y los sentimientos propios y ajenos, para el logro de una actitud empática y cuidadosa con respecto a los demás y a la naturaleza.',
        description:
          'Mostrar una adecuada estima de sí mismo y del entorno, reconociendo y valorando las emociones y los sentimientos propios y ajenos, para el logro de una actitud empática y cuidadosa con respecto a los demás y a la naturaleza.',
        criteris: {
          eso: [
            '4.1 Desarrollar una actitud de gestión equilibrada de las emociones, de estima y cuidado de sí mismo y de los otros, identificando, analizando y expresando de manera asertiva las propias emociones y sentimientos, y reconociendo y valorando los de los demás en distintos contextos y en torno a actividades creativas y de reflexión individual o dialogada sobre cuestiones éticas y cívicas.',
          ],
        },
      },
    ],
  },

  'Educación Plástica, Visual y Audiovisual': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Comprender la importancia que algunos ejemplos seleccionados de las distintas manifestaciones culturales y artísticas han tenido en el desarrollo del ser humano, mostrando interés por el patrimonio como parte de la propia cultura, para entender cómo se convierten en el testimonio de los valores y convicciones de cada persona y de la sociedad en su conjunto, y para reconocer la necesidad de su protección y conservación.',
        description:
          'Comprender la importancia que algunos ejemplos seleccionados de las distintas manifestaciones culturales y artísticas han tenido en el desarrollo del ser humano, mostrando interés por el patrimonio como parte de la propia cultura, para entender cómo se convierten en el testimonio de los valores y convicciones de cada persona y de la sociedad en su conjunto, y para reconocer la necesidad de su protección y conservación.',
        criteris: {
          eso: [
            '1.1 Reconocer los factores históricos y sociales que rodean las producciones plásticas, visuales y audiovisuales más relevantes, así como su función y finalidad, describiendo sus particularidades y su papel como transmisoras de valores y convicciones, con interés y respeto, desde una perspectiva de género.',
            '1.2 Valorar la importancia de la conservación del patrimonio cultural y artístico a través del conocimiento y el análisis guiado de obras de arte.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Explicar las producciones plásticas, visuales y audiovisuales propias, comparándolas con las de sus iguales y con algunas de las que conforman el patrimonio cultural y artístico, justificando las opiniones y teniendo en cuenta el progreso desde la intención hasta la realización, para valorar el intercambio, las experiencias compartidas y el diálogo intercultural, así como para superar estereotipos.',
        description:
          'Explicar las producciones plásticas, visuales y audiovisuales propias, comparándolas con las de sus iguales y con algunas de las que conforman el patrimonio cultural y artístico, justificando las opiniones y teniendo en cuenta el progreso desde la intención hasta la realización, para valorar el intercambio, las experiencias compartidas y el diálogo intercultural, así como para superar estereotipos.',
        criteris: {
          eso: [
            '2.1 Explicar, de forma razonada, la importancia del proceso que media entre la realidad, el imaginario y la producción, superando estereotipos y mostrando un comportamiento respetuoso con la diversidad cultural.',
            '2.2 Analizar, de forma guiada, diversas producciones artísticas, incluidas las propias y las de sus iguales, desarrollando con interés una mirada estética hacia el mundo y respetando la diversidad de las expresiones culturales.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Analizar diferentes propuestas plásticas, visuales y audiovisuales, mostrando respeto y desarrollando la capacidad de observación e interiorización de la experiencia y del disfrute estético, para enriquecer la cultura artística individual y alimentar el imaginario.',
        description:
          'Analizar diferentes propuestas plásticas, visuales y audiovisuales, mostrando respeto y desarrollando la capacidad de observación e interiorización de la experiencia y del disfrute estético, para enriquecer la cultura artística individual y alimentar el imaginario.',
        criteris: {
          eso: [
            '3.1 Seleccionar y describir propuestas plásticas, visuales y audiovisuales de diversos tipos y épocas, analizándolas con curiosidad y respeto desde una perspectiva de género, e incorporándolas a su cultura personal y su imaginario propio.',
            '3.2 Argumentar el disfrute producido por la recepción del arte en todas sus formas y vertientes, compartiendo con respeto impresiones y emociones y expresando la opinión personal de forma abierta.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Explorar las técnicas, los lenguajes y las intenciones de diferentes producciones culturales y artísticas, analizando, de forma abierta y respetuosa, tanto el proceso como el producto final, su recepción y su contexto, para descubrir las diversas posibilidades que ofrecen como fuente generadora de ideas y respuestas.',
        description:
          'Explorar las técnicas, los lenguajes y las intenciones de diferentes producciones culturales y artísticas, analizando, de forma abierta y respetuosa, tanto el proceso como el producto final, su recepción y su contexto, para descubrir las diversas posibilidades que ofrecen como fuente generadora de ideas y respuestas.',
        criteris: {
          eso: [
            '4.1 Reconocer los rasgos particulares de diversas técnicas y lenguajes artísticos, así como sus distintos procesos y resultados en función de los contextos sociales, históricos, geográficos y tecnológicos, mostrando interés y eficacia en la investigación, la experimentación y la búsqueda de información.',
            '4.2 Analizar, de forma guiada, las especificidades de los lenguajes de diferentes producciones culturales y artísticas, estableciendo conexiones entre ellas e incorporándolas creativamente en las producciones propias.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Realizar producciones artísticas individuales o colectivas con creatividad e imaginación, seleccionando y aplicando herramientas, técnicas y soportes en función de la intencionalidad, para expresar la visión del mundo, las emociones y los sentimientos propios, así como para mejorar la capacidad de comunicación y desarrollar la reflexión crítica y la autoconfianza.',
        description:
          'Realizar producciones artísticas individuales o colectivas con creatividad e imaginación, seleccionando y aplicando herramientas, técnicas y soportes en función de la intencionalidad, para expresar la visión del mundo, las emociones y los sentimientos propios, así como para mejorar la capacidad de comunicación y desarrollar la reflexión crítica y la autoconfianza.',
        criteris: {
          eso: [
            '5.1 Expresar ideas y sentimientos en diferentes producciones plásticas, visuales y audiovisuales, a través de la experimentación con diversas herramientas, técnicas y soportes, desarrollando la capacidad de comunicación y la reflexión crítica.',
            '5.2 Realizar diferentes tipos de producciones artísticas visuales y audiovisuales individuales o colectivas, justificando y enriqueciendo su proceso y pensamiento creativo personal, mostrando iniciativa y autoconfianza, integrando racionalidad, empatía y sensibilidad, y seleccionando las técnicas y los soportes adecuados al propósito.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Apropiarse de las referencias culturales y artísticas del entorno, identificando sus singularidades, para enriquecer las creaciones propias y desarrollar la identidad personal, cultural y social.',
        description:
          'Apropiarse de las referencias culturales y artísticas del entorno, identificando sus singularidades, para enriquecer las creaciones propias y desarrollar la identidad personal, cultural y social.',
        criteris: {
          eso: [
            '6.1 Explicar su pertenencia a un contexto cultural concreto, a través del análisis de los aspectos formales y de los factores sociales que determinan diversas producciones culturales y artísticas actuales, mostrando empatía, actitud colaborativa, abierta y respetuosa.',
            '6.2 Utilizar creativamente referencias culturales y artísticas del entorno en la elaboración de producciones propias, mostrando una visión personal.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Aplicar las principales técnicas, recursos y convenciones de los lenguajes artísticos, incorporando, de forma creativa, las posibilidades que ofrecen las diversas tecnologías, para integrarlos y enriquecer el diseño y la realización de un proyecto artístico.',
        description:
          'Aplicar las principales técnicas, recursos y convenciones de los lenguajes artísticos, incorporando, de forma creativa, las posibilidades que ofrecen las diversas tecnologías, para integrarlos y enriquecer el diseño y la realización de un proyecto artístico.',
        criteris: {
          eso: [
            '7.1 Realizar un proyecto artístico, con creatividad y de forma consciente, ajustándose al objetivo propuesto, experimentando con distintas técnicas visuales o audiovisuales en la generación de mensajes propios, y mostrando iniciativa en el empleo de lenguajes, materiales, soportes y herramientas.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Compartir producciones y manifestaciones artísticas, adaptando el proyecto a la intención y a las características del público destinatario, para valorar distintas oportunidades de desarrollo personal.',
        description:
          'Compartir producciones y manifestaciones artísticas, adaptando el proyecto a la intención y a las características del público destinatario, para valorar distintas oportunidades de desarrollo personal.',
        criteris: {
          eso: [
            '8.1 Reconocer los diferentes usos y funciones de las producciones y manifestaciones artísticas, argumentando de forma individual o colectiva sus conclusiones acerca de las oportunidades que pueden generar, con una actitud abierta y con interés por conocer su importancia en la sociedad.',
            '8.2 Desarrollar proyectos, producciones y manifestaciones artísticas con una intención previa, de forma individual o colectiva, organizando y desarrollando, de manera lógica y colaborativa las diferentes etapas y considerando las características del público destinatario.',
            '8.3 Exponer los procesos de elaboración y el resultado final de proyectos, producciones y manifestaciones artísticas visuales y audiovisuales, realizadas de forma individual o colectiva, reconociendo los errores, buscando las soluciones y las estrategias más adecuadas para mejorarlas, y valorando las oportunidades de desarrollo personal que ofrecen.',
          ],
        },
      },
    ],
  },

  'Física y Química': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Comprender y relacionar los motivos por los que ocurren los principales fenómenos fisicoquímicos del entorno, explicándolos en términos de las leyes y teorías científicas adecuadas, para resolver problemas con el fin de aplicarlas para mejorar la realidad cercana y la calidad de vida humana.',
        description:
          'Comprender y relacionar los motivos por los que ocurren los principales fenómenos fisicoquímicos del entorno, explicándolos en términos de las leyes y teorías científicas adecuadas, para resolver problemas con el fin de aplicarlas para mejorar la realidad cercana y la calidad de vida humana.',
        criteris: {
          '1-3': [
            '1.1. Identificar, comprender y explicar los fenómenos fisicoquímicos cotidianos más relevantes a partir de los principios, teorías y leyes científicas adecuadas, expresándolos, de manera argumentada, utilizando diversidad de soportes y medios de comunicación.',
            '1.2. Resolver los problemas fisicoquímicos planteados utilizando las leyes y teorías científicas adecuadas, razonando los procedimientos utilizados para encontrar las soluciones y expresando adecuadamente los resultados.',
            '1.3. Reconocer y describir en el entorno inmediato situaciones problemáticas reales de índole científica y emprender iniciativas en las que la ciencia, y en particular la física y la química, pueden contribuir a su solución, analizando críticamente su impacto en la sociedad.',
          ],
          '4': [
            '1.1. Comprender y explicar con rigor los fenómenos fisicoquímicos cotidianos a partir de los principios, teorías y leyes científicas adecuadas, expresándolos de manera argumentada, utilizando diversidad de soportes y medios de comunicación.',
            '1.2. Resolver los problemas fisicoquímicos planteados mediante las leyes y teorías científicas adecuadas, razonando los procedimientos utilizados para encontrar las soluciones y expresando los resultados con corrección y precisión.',
            '1.3. Reconocer y describir situaciones problemáticas reales de índole científica y emprender iniciativas colaborativas en las que la ciencia, y en particular la física y la química, pueden contribuir a su solución, analizando críticamente su impacto en la sociedad y en el medio ambiente.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Expresar las observaciones realizadas por el alumnado en forma de preguntas, formulando hipótesis para explicarlas y demostrando dichas hipótesis a través de la experimentación científica, la indagación y la búsqueda de evidencias, para desarrollar los razonamientos propios del pensamiento científico y mejorar las destrezas en el uso de las metodologías científicas.',
        description:
          'Expresar las observaciones realizadas por el alumnado en forma de preguntas, formulando hipótesis para explicarlas y demostrando dichas hipótesis a través de la experimentación científica, la indagación y la búsqueda de evidencias, para desarrollar los razonamientos propios del pensamiento científico y mejorar las destrezas en el uso de las metodologías científicas.',
        criteris: {
          '1-3': [
            '2.1. Emplear las metodologías propias de la ciencia en la identificación y descripción de fenómenos a partir de cuestiones a las que se pueda dar respuesta a través de la indagación, la deducción, el trabajo experimental y el razonamiento lógico-matemático, diferenciándolas de aquellas pseudocientíficas que no admiten comprobación experimental.',
            '2.2. Seleccionar, de acuerdo con la naturaleza de las cuestiones que se traten, la mejor manera de comprobar o refutar las hipótesis formuladas, diseñando estrategias de indagación y búsqueda de evidencias que permitan obtener conclusiones y respuestas ajustadas a la naturaleza de la pregunta formulada.',
            '2.3. Aplicar las leyes y teorías científicas conocidas al formular cuestiones e hipótesis, siendo coherente con el conocimiento científico existente y diseñando los procedimientos experimentales o deductivos necesarios para resolverlas o comprobarlas.',
          ],
          '4': [
            '2.1. Emplear las metodologías propias de la ciencia en la identificación y descripción de fenómenos científicos a partir de situaciones tanto observadas en el mundo natural como planteadas a través de enunciados con información textual, gráfica o numérica.',
            '2.2. Predecir, para las cuestiones planteadas, respuestas que se puedan comprobar con las herramientas y conocimientos adquiridos, tanto de forma experimental como deductiva, aplicando el razonamiento lógico-matemático en su proceso de validación.',
            '2.3. Aplicar las leyes y teorías científicas más importantes para validar hipótesis de manera informada y coherente con el conocimiento científico existente, diseñando los procedimientos experimentales o deductivos necesarios para resolverlas y analizando los resultados críticamente.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Manejar con soltura las reglas y normas básicas de la física y la química en lo referente al lenguaje de la Iupac, al lenguaje matemático, al empleo de unidades de medida correctas, al uso seguro del laboratorio y a la interpretación y producción de datos e información en diferentes formatos y fuentes, para reconocer el carácter universal y transversal del lenguaje científico y la necesidad de una comunicación fiable en investigación y ciencia entre diferentes países y culturas.',
        description:
          'Manejar con soltura las reglas y normas básicas de la física y la química en lo referente al lenguaje de la Iupac, al lenguaje matemático, al empleo de unidades de medida correctas, al uso seguro del laboratorio y a la interpretación y producción de datos e información en diferentes formatos y fuentes, para reconocer el carácter universal y transversal del lenguaje científico y la necesidad de una comunicación fiable en investigación y ciencia entre diferentes países y culturas.',
        criteris: {
          '1-3': [
            '3.1. Emplear datos en diferentes formatos para interpretar y comunicar información relativa a un proceso fisicoquímico concreto, relacionando entre sí lo que cada uno de ellos contiene, y extrayendo en cada caso lo más relevante para la resolución de un problema.',
            '3.2. Utilizar adecuadamente las reglas básicas de la física y la química, incluyendo el uso de unidades de medida, las herramientas matemáticas y las reglas de nomenclatura, consiguiendo una comunicación efectiva con toda la comunidad científica.',
            '3.3. Poner en práctica las normas de uso de los espacios específicos de la ciencia, como el laboratorio de física y química, asegurando la salud propia y colectiva, la conservación sostenible del medio ambiente y el cuidado de las instalaciones.',
          ],
          '4': [
            '3.1. Emplear fuentes variadas fiables y seguras para seleccionar, interpretar, organizar y comunicar información relativa a un proceso fisicoquímico concreto, relacionando entre sí lo que cada una de ellas contiene, extrayendo en cada caso lo más relevante para la resolución de un problema y desechando todo lo que sea irrelevante.',
            '3.2. Utilizar adecuadamente las reglas básicas de la física y la química, incluyendo el uso correcto de varios sistemas de unidades, las herramientas matemáticas necesarias y las reglas de nomenclatura avanzadas, consiguiendo una comunicación efectiva con toda la comunidad científica.',
            '3.3. Aplicar con rigor las normas de uso de los espacios específicos de la ciencia, como el laboratorio de física y química, asegurando la salud propia y colectiva, la conservación sostenible del medio ambiente y el cuidado por las instalaciones.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Utilizar de forma crítica, eficiente y segura plataformas digitales y recursos variados, tanto para el trabajo individual como en equipo, para fomentar la creatividad, el desarrollo personal y el aprendizaje individual y social, mediante la consulta de información, la creación de materiales y la comunicación efectiva en los diferentes entornos de aprendizaje.',
        description:
          'Utilizar de forma crítica, eficiente y segura plataformas digitales y recursos variados, tanto para el trabajo individual como en equipo, para fomentar la creatividad, el desarrollo personal y el aprendizaje individual y social, mediante la consulta de información, la creación de materiales y la comunicación efectiva en los diferentes entornos de aprendizaje.',
        criteris: {
          '1-3': [
            '4.1. Utilizar recursos variados, tradicionales y digitales, mejorando el aprendizaje autónomo y la interacción con otros miembros de la comunidad educativa, con respeto hacia docentes y estudiantes y analizando críticamente las aportaciones de cada participante.',
            '4.2. Trabajar de forma adecuada con medios variados, tradicionales y digitales, en la consulta de información y la creación de contenidos, seleccionando con criterio las fuentes más fiables y desechando las menos adecuadas y mejorando el aprendizaje propio y colectivo.',
          ],
          '4': [
            '4.1. Utilizar de forma eficiente recursos variados, tradicionales y digitales, mejorando el aprendizaje autónomo y la interacción con otros miembros de la comunidad educativa, de forma rigurosa y respetuosa y analizando críticamente las aportaciones de cada participante.',
            '4.2. Trabajar de forma versátil con medios variados, tradicionales y digitales, en la consulta de información y la creación de contenidos, seleccionando y empleando con criterio las fuentes y herramientas más fiables, desechando las menos adecuadas y mejorando el aprendizaje propio y colectivo.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Utilizar las estrategias propias del trabajo colaborativo, potenciando el crecimiento entre iguales como base emprendedora de una comunidad científica crítica, ética y eficiente, para comprender la importancia de la ciencia en la mejora de la sociedad, las aplicaciones y repercusiones de los avances científicos, la preservación de la salud y la conservación sostenible del medio ambiente.',
        description:
          'Utilizar las estrategias propias del trabajo colaborativo, potenciando el crecimiento entre iguales como base emprendedora de una comunidad científica crítica, ética y eficiente, para comprender la importancia de la ciencia en la mejora de la sociedad, las aplicaciones y repercusiones de los avances científicos, la preservación de la salud y la conservación sostenible del medio ambiente.',
        criteris: {
          '1-3': [
            '5.1. Establecer interacciones constructivas y coeducativas, emprendiendo actividades de cooperación como forma de construir un medio de trabajo eficiente en la ciencia.',
            '5.2. Emprender, de forma guiada y de acuerdo a la metodología adecuada, proyectos científicos que involucren al alumnado en la mejora de la sociedad y que creen valor para el individuo y para la comunidad.',
          ],
          '4': [
            '5.1. Establecer interacciones constructivas y coeducativas, emprendiendo actividades de cooperación e iniciando el uso de las estrategias propias del trabajo colaborativo, como forma de construir un medio de trabajo eficiente en la ciencia.',
            '5.2. Emprender, de forma autónoma y de acuerdo a la metodología adecuada, proyectos científicos que involucren al alumnado en la mejora de la sociedad y que creen valor para el individuo y para la comunidad.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Comprender y valorar la ciencia como una construcción colectiva en continuo cambio y evolución, en la que no solo participan las personas dedicadas a ella, sino que también requiere de una interacción con el resto de la sociedad, para obtener resultados que repercutan en el avance tecnológico, económico, ambiental y social.',
        description:
          'Comprender y valorar la ciencia como una construcción colectiva en continuo cambio y evolución, en la que no solo participan las personas dedicadas a ella, sino que también requiere de una interacción con el resto de la sociedad, para obtener resultados que repercutan en el avance tecnológico, económico, ambiental y social.',
        criteris: {
          '1-3': [
            '6.1. Reconocer y valorar, a través del análisis histórico de los avances científicos logrados por hombres y mujeres de ciencia, que la ciencia es un proceso en permanente construcción y que existen repercusiones mutuas de la ciencia actual con la tecnología, la sociedad y el medio ambiente.',
            '6.2. Detectar en el entorno las necesidades tecnológicas, ambientales, económicas y sociales más importantes que demanda la sociedad, entendiendo la capacidad de la ciencia para darles solución sostenible a través de la implicación de todos los ciudadanos.',
          ],
          '4': [
            '6.1. Reconocer y valorar, a través del análisis histórico de los avances científicos logrados por mujeres y hombres, así como de situaciones y contextos actuales (líneas de investigación, instituciones científicas, etc.), que la ciencia es un proceso en permanente construcción y que esta tiene repercusiones e implicaciones importantes sobre la sociedad actual.',
            '6.2. Detectar las necesidades tecnológicas, ambientales, económicas y sociales más importantes que demanda la sociedad, entendiendo la capacidad de la ciencia para darles solución sostenible a través de la implicación de la ciudadanía.',
          ],
        },
      },
    ],
  },

  'Geografía e Historia': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Buscar, seleccionar, tratar y organizar información sobre temas relevantes del presente y del pasado, usando críticamente fuentes históricas y geográficas, para adquirir conocimientos, elaborar y expresar contenidos en varios formatos.',
        description:
          'Buscar, seleccionar, tratar y organizar información sobre temas relevantes del presente y del pasado, usando críticamente fuentes históricas y geográficas, para adquirir conocimientos, elaborar y expresar contenidos en varios formatos.',
        criteris: {
          '1-2': [
            '1.1 Elaborar, expresar y presentar contenidos propios en forma de esquemas, tablas informativas y otros formatos mediante el desarrollo de estrategias de búsqueda, selección y tratamiento de información relativas a procesos y acontecimientos relevantes del presente y del pasado.',
            '1.2 Contrastar y argumentar sobre temas y acontecimientos de la Prehistoria, la Edad Antigua, la Edad Media y la Edad Moderna, localizando y analizando de forma crítica fuentes primarias y secundarias como pruebas históricas.',
          ],
          '3-4': [
            '1.1 Elaborar contenidos propios en distintos formatos, mediante aplicaciones y estrategias de recogida y representación de datos más complejas, usando y contrastando críticamente fuentes fiables, tanto analógicas como digitales, del presente y de la historia contemporánea, identificando la desinformación y la manipulación.',
            '1.2 Establecer conexiones y relaciones entre los conocimientos e informaciones adquiridos, elaborando síntesis interpretativas y explicativas, mediante informes, estudios o dosieres informativos, que reflejen un dominio y consolidación de los contenidos tratados.',
            '1.3 Transferir adecuadamente la información y el conocimiento por medio de narraciones, pósteres, presentaciones, exposiciones orales, medios audiovisuales y otros productos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Indagar, argumentar y elaborar productos propios sobre problemas geográficos, históricos y sociales que resulten relevantes en la actualidad, desde lo local a lo global, para desarrollar un pensamiento crítico, respetuoso con las diferencias, que contribuya a la construcción de la propia identidad y a enriquecer el acervo común.',
        description:
          'Indagar, argumentar y elaborar productos propios sobre problemas geográficos, históricos y sociales que resulten relevantes en la actualidad, desde lo local a lo global, para desarrollar un pensamiento crítico, respetuoso con las diferencias, que contribuya a la construcción de la propia identidad y a enriquecer el acervo común.',
        criteris: {
          '1-2': [
            '2.1 Identificar, valorar y mostrar interés por los principales problemas que afectan a la sociedad, adoptando una posición crítica y proactiva hacia los mismos.',
            '2.2 Argumentar de forma crítica sobre problemas de actualidad a través de conocimientos geográficos e históricos, contrastando y valorando fuentes diversas.',
            '2.3 Incorporar y utilizar adecuadamente términos, conceptos y acontecimientos relacionados con la geografía, la historia y otras disciplinas de las ciencias sociales, a través de intervenciones orales, textos escritos y otros productos, mostrando planteamientos originales y propuestas creativas.',
            '2.4 Elaborar juicios argumentados, respetando las opiniones de los demás y enriqueciendo el acervo común en el contexto del mundo actual, sus retos y sus conflictos desde una perspectiva sistémica y global.',
          ],
          '3-4': [
            '2.1 Generar productos originales y creativos mediante la reelaboración de conocimientos previos a través de herramientas de investigación que permitan explicar problemas presentes y pasados de la humanidad a distintas escalas temporales y espaciales, de lo local a lo global, utilizando conceptos, situaciones y datos relevantes.',
            '2.2 Producir y expresar juicios y argumentos personales y críticos de forma abierta y respetuosa, haciendo patente la propia identidad y enriqueciendo el acervo común en el contexto del mundo actual, sus retos y sus conflictos desde una perspectiva sistémica y global.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Conocer los principales desafíos a los que se han enfrentado distintas sociedades a lo largo del tiempo, identificando las causas y consecuencias de los cambios producidos y los problemas a los que se enfrentan en la actualidad, mediante el desarrollo de proyectos de investigación y el uso de fuentes fiables, para realizar propuestas que contribuyan al desarrollo sostenible.',
        description:
          'Conocer los principales desafíos a los que se han enfrentado distintas sociedades a lo largo del tiempo, identificando las causas y consecuencias de los cambios producidos y los problemas a los que se enfrentan en la actualidad, mediante el desarrollo de proyectos de investigación y el uso de fuentes fiables, para realizar propuestas que contribuyan al desarrollo sostenible.',
        criteris: {
          '1-2': [
            '3.1 Adquirir y construir conocimiento relevante del mundo actual y de la historia, a través de procesos inductivos, de la investigación y del trabajo por proyectos, retos o problemas, mediante la elaboración de productos que reflejen la comprensión de los fenómenos y problemas abordados.',
            '3.2 Identificar los principales problemas, retos y desafíos a los que se ha enfrentado la humanidad a lo largo de la historia, los cambios producidos, sus causas y consecuencias, así como los que, en la actualidad, debemos plantear y resolver en torno a los Objetivos de Desarrollo Sostenible.',
            '3.3 Representar adecuadamente información geográfica e histórica a través de diversas formas de representación gráfica, cartográfica y visual.',
            '3.4 Utilizar una secuencia cronológica con objeto de examinar la relación entre hechos y procesos en diferentes períodos y lugares históricos (simultaneidad y duración), utilizando términos y conceptos apropiados.',
            '3.5 Analizar procesos de cambio histórico de relevancia a través del uso de diferentes fuentes de información, teniendo en cuenta las continuidades y permanencias en diferentes periodos y lugares.',
          ],
          '3-4': [
            '3.1 Conocer los Objetivos de Desarrollo Sostenible, realizando propuestas que contribuyan a su logro, aplicando métodos y proyectos de investigación e incidiendo en el uso de mapas y otras representaciones gráficas, así como de medios accesibles de interpretación de imágenes.',
            '3.2 Entender y afrontar, desde un enfoque ecosocial, problemas y desafíos pasados, actuales o futuros de las sociedades contemporáneas teniendo en cuenta sus relaciones de interdependencia y ecodependencia.',
            '3.3 Utilizar secuencias cronológicas complejas en las que identificar, comparar y relacionar hechos y procesos en diferentes períodos y lugares históricos (simultaneidad, duración, causalidad), utilizando términos y conceptos específicos del ámbito de la Historia y de la Geografía.',
            '3.4 Analizar procesos de cambio histórico y comparar casos de la historia y la geografía a través del uso de fuentes de información diversas, teniendo en cuenta las transformaciones de corta y larga duración (coyuntura y estructura), las continuidades y permanencias en diferentes períodos y lugares.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Identificar y analizar los elementos del paisaje y su articulación en sistemas complejos naturales, rurales y urbanos, así como su evolución en el tiempo, interpretando las causas de las transformaciones y valorando el grado de equilibrio existente en los distintos ecosistemas, para promover su conservación, mejora y uso sostenible.',
        description:
          'Identificar y analizar los elementos del paisaje y su articulación en sistemas complejos naturales, rurales y urbanos, así como su evolución en el tiempo, interpretando las causas de las transformaciones y valorando el grado de equilibrio existente en los distintos ecosistemas, para promover su conservación, mejora y uso sostenible.',
        criteris: {
          '1-2': [
            '4.1 Interpretar el entorno desde una perspectiva sistémica e integradora, a través del concepto de paisaje, identificando sus principales elementos y las interrelaciones existentes.',
            '4.2 Valorar el grado de sostenibilidad y de equilibrio de los diferentes espacios y desde distintas escalas, y analizar su transformación y degradación a través del tiempo por la acción humana en la explotación de los recursos, su relación con la evolución de la población y las estrategias desarrolladas para su control y dominio y los conflictos que ha provocado.',
            '4.3 Argumentar la necesidad de acciones de defensa, protección, conservación y mejora del entorno (natural, rural y urbano) a través de propuestas e iniciativas que reflejen compromisos y conductas en favor de la sostenibilidad y del reparto justo y solidario de los recursos.',
          ],
          '3-4': [
            '4.1 Identificar los elementos del entorno y comprender su funcionamiento como un sistema complejo por medio del análisis multicausal de sus relaciones naturales y humanas, presentes y pasadas, valorando el grado de conservación y de equilibrio dinámico.',
            '4.2 Idear y adoptar, cuando sea posible, comportamientos y acciones que contribuyan a la conservación y mejora del entorno natural, rural y urbano, a través del respeto a todos los seres vivos, mostrando comportamientos orientados al logro de un desarrollo sostenible de dichos entornos, y defendiendo el acceso universal, justo y equitativo a los recursos que nos ofrece el planeta.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Analizar de forma crítica planteamientos históricos y geográficos explicando la construcción de los sistemas democráticos y los principios constitucionales que rigen la vida en comunidad, así como asumiendo los deberes y derechos propios de nuestro marco de convivencia, para promover la participación ciudadana y la cohesión social.',
        description:
          'Analizar de forma crítica planteamientos históricos y geográficos explicando la construcción de los sistemas democráticos y los principios constitucionales que rigen la vida en comunidad, así como asumiendo los deberes y derechos propios de nuestro marco de convivencia, para promover la participación ciudadana y la cohesión social.',
        criteris: {
          '1-2': [
            '5.1 Identificar, interpretar y analizar los mecanismos que han regulado la convivencia y la vida en común a lo largo de la historia, desde el origen de la sociedad a las distintas civilizaciones que se han ido sucediendo, señalando los principales modelos de organización social, política, económica y religiosa que se han gestado.',
            '5.2 Señalar y explicar aquellas experiencias históricas más destacables, y anteriores a la época contemporánea, en las que se logró establecer sistemas políticos que favorecieron el ejercicio de derechos y libertades de los individuos y de la colectividad, considerándolas como antecedentes de las posteriores conquistas democráticas y referentes históricos de las libertades actuales.',
            '5.3 Mostrar actitudes pacíficas y respetuosas y asumir las normas como marco necesario para la convivencia, demostrando capacidad crítica e identificando y respondiendo de manera asertiva ante las situaciones de injusticia y desigualdad.',
          ],
          '3-4': [
            '5.1 Conocer, valorar y ejercitar responsabilidades, derechos y deberes y actuar en favor de su desarrollo y afirmación, a través del conocimiento de nuestro ordenamiento jurídico y constitucional, de la comprensión y puesta en valor de nuestra memoria democrática y de los aspectos fundamentales que la conforman, de la contribución de los hombres y mujeres a la misma y la defensa de nuestros valores constitucionales.',
            '5.2 Reconocer movimientos y causas que generen una conciencia solidaria, promuevan la cohesión social, y trabajen para la eliminación de la desigualdad, especialmente la motivada por cuestión de género, y para el pleno desarrollo de la ciudadanía, mediante la movilización de conocimientos y estrategias de participación, trabajo en equipo, mediación y resolución pacífica de conflictos.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Comprender los procesos geográficos, históricos y culturales que han conformado la realidad multicultural en la que vivimos, conociendo y difundiendo la historia y cultura de las minorías étnicas presentes en nuestro país y valorando la aportación de los movimientos en defensa de la igualdad y la inclusión, para reducir estereotipos, evitar cualquier tipo de discriminación y violencia, y reconocer la riqueza de la diversidad.',
        description:
          'Comprender los procesos geográficos, históricos y culturales que han conformado la realidad multicultural en la que vivimos, conociendo y difundiendo la historia y cultura de las minorías étnicas presentes en nuestro país y valorando la aportación de los movimientos en defensa de la igualdad y la inclusión, para reducir estereotipos, evitar cualquier tipo de discriminación y violencia, y reconocer la riqueza de la diversidad.',
        criteris: {
          '1-2': [
            '6.1 Situar el nacimiento y desarrollo de distintas civilizaciones y ubicarlas en el espacio y en el tiempo, integrando los elementos históricos, culturales, institucionales y religiosos que las han conformado, explicando la realidad multicultural generada a lo largo del tiempo e identificando sus aportaciones más relevantes a la cultura universal.',
            '6.2 Reconocer las desigualdades sociales existentes en épocas pasadas y los mecanismos de dominación y control que se han aplicado, identificando aquellos grupos que se han visto sometidos y silenciados, destacando la presencia de mujeres y de personajes pertenecientes a otros colectivos discriminados.',
            '6.3 Valorar la diversidad social y cultural, argumentando e interviniendo en favor de la inclusión, así como rechazando y actuando en contra de cualquier actitud o comportamiento discriminatorio o basado en estereotipos.',
            '6.4 Argumentar e intervenir acerca de la igualdad real de hombres y mujeres actuando en contra de cualquier actitud y comportamiento discriminatorio por razón de género.',
          ],
          '3-4': [
            '6.1 Rechazar actitudes discriminatorias y reconocer la riqueza de la diversidad, a partir del análisis de la relación entre los aspectos geográficos, históricos, ecosociales y culturales que han conformado la sociedad globalizada y multicultural actual, y del conocimiento de la aportación de los movimientos en defensa de los derechos de las minorías y en favor de la inclusión y la igualdad real, especialmente de las mujeres y de otros colectivos discriminados.',
            '6.2 Contribuir al bienestar individual y colectivo a través del diseño, exposición y puesta en práctica de iniciativas orientadas a promover un compromiso activo con los valores comunes, la mejora del entorno y el servicio a la comunidad.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Identificar los fundamentos que sostienen las diversas identidades propias y las ajenas, a través del conocimiento y puesta en valor del patrimonio material e inmaterial que compartimos para conservarlo y respetar los sentimientos de pertenencia, así como para favorecer procesos que contribuyan a la cohesión y solidaridad territorial en orden a los valores del europeísmo y de la Declaración Universal de los Derechos Humanos.',
        description:
          'Identificar los fundamentos que sostienen las diversas identidades propias y las ajenas, a través del conocimiento y puesta en valor del patrimonio material e inmaterial que compartimos para conservarlo y respetar los sentimientos de pertenencia, así como para favorecer procesos que contribuyan a la cohesión y solidaridad territorial en orden a los valores del europeísmo y de la Declaración Universal de los Derechos Humanos.',
        criteris: {
          '1-2': [
            '7.1 Relacionar las culturas y civilizaciones que se han desarrollado a lo largo de la historia antigua, medieval y moderna con las diversas identidades colectivas que se han ido construyendo hasta la actualidad, reflexionando sobre los múltiples significados que adoptan y sus aportaciones a la cultura humana universal.',
            '7.2 Identificar el origen histórico de distintas identidades colectivas que se han desarrollado en España, interpretando el uso que se ha hecho de las mismas y mostrando una actitud de respeto hacia los diferentes sentidos de pertenencia, promoviendo la solidaridad y la cohesión social.',
            '7.3 Señalar los fundamentos de la idea de Europa a través de las diferentes experiencias históricas del pasado e identificar el legado histórico, institucional, artístico y cultural como patrimonio común de la ciudadanía europea.',
            '7.4 Valorar, proteger y conservar el patrimonio artístico, histórico y cultural como fundamento de la identidad colectiva local, autonómica, nacional, europea y universal, considerándolo un bien para el disfrute recreativo y cultural y un recurso para el desarrollo de los pueblos.',
          ],
          '3-4': [
            '7.1 Reconocer los rasgos que van conformando la identidad propia y de los demás, la riqueza de las identidades múltiples en relación con distintas escalas espaciales, a través de la investigación y el análisis de sus fundamentos geográficos, históricos, artísticos, ideológicos y lingüísticos, y el reconocimiento de sus expresiones culturales.',
            '7.2 Conocer y contribuir a conservar el patrimonio material e inmaterial común, respetando los sentimientos de pertenencia y adoptando compromisos con principios y acciones orientadas a la cohesión y la solidaridad territorial de la comunidad política, los valores del europeísmo y de la Declaración Universal de los Derechos Humanos.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Tomar conciencia del papel de los ciclos demográficos, el ciclo vital, las formas de vida y las relaciones intergeneracionales y de dependencia en la sociedad actual y su evolución a lo largo del tiempo, analizándolas de forma crítica, para promover alternativas saludables, sostenibles, enriquecedoras y respetuosas con la dignidad humana y el compromiso con la sociedad y el entorno.',
        description:
          'Tomar conciencia del papel de los ciclos demográficos, el ciclo vital, las formas de vida y las relaciones intergeneracionales y de dependencia en la sociedad actual y su evolución a lo largo del tiempo, analizándolas de forma crítica, para promover alternativas saludables, sostenibles, enriquecedoras y respetuosas con la dignidad humana y el compromiso con la sociedad y el entorno.',
        criteris: {
          '1-2': [
            '8.1 Conocer e interpretar los comportamientos demográficos de la población, los cambios que ha experimentado y sus ciclos, identificando y analizando los principales problemas y retos a los que nos enfrentamos en el mundo y en España.',
            '8.2 Tomar conciencia del ciclo vital y analizar cómo han cambiado sus características, necesidades y obligaciones en distintos momentos históricos, así como las raíces de la distribución por motivos de género del trabajo doméstico, asumiendo las responsabilidades y compromisos propios de la edad en el ámbito familiar, en el entorno escolar y en la comunidad, y valorando la riqueza que aportan las relaciones intergeneracionales.',
            '8.3 Relacionar los cambios en los estilos de vida tradicional y contrastarlos con los que son saludables y sostenibles en el entorno, a través de comportamientos respetuosos con la salud propia, con la de los demás y con otros seres vivos, tomando conciencia de la importancia de promover el propio desarrollo personal.',
          ],
          '3-4': [
            '8.1 Adoptar un papel activo y comprometido con el entorno, de acuerdo con aptitudes, aspiraciones, intereses y valores propios, a partir del análisis crítico de la realidad económica, de la distribución y gestión del trabajo, y la adopción de hábitos responsables, saludables, sostenibles y respetuosos con la dignidad humana y la de otros seres vivos, así como de la reflexión ética ante los usos de la tecnología y la gestión del tiempo libre.',
            '8.2 Reconocer las iniciativas de la sociedad civil, reflejadas en asociaciones y entidades sociales, adoptando actitudes de participación y transformación en el ámbito local y comunitario, especialmente en el ámbito de las relaciones intergeneracionales.',
          ],
        },
      },
      {
        id: 'CE9',
        title:
          'Conocer y valorar la importancia de la seguridad integral ciudadana en la cultura de convivencia nacional e internacional, reconociendo la contribución del Estado, sus instituciones y otras entidades sociales a la ciudadanía global, a la paz, a la cooperación internacional y al desarrollo sostenible, para promover la consecución de un mundo más seguro, solidario, sostenible y justo.',
        description:
          'Conocer y valorar la importancia de la seguridad integral ciudadana en la cultura de convivencia nacional e internacional, reconociendo la contribución del Estado, sus instituciones y otras entidades sociales a la ciudadanía global, a la paz, a la cooperación internacional y al desarrollo sostenible, para promover la consecución de un mundo más seguro, solidario, sostenible y justo.',
        criteris: {
          '1-2': [
            '9.1 Identificar e interpretar la conexión de España con los grandes procesos históricos (de las épocas antigua, medieval y moderna), valorando lo que han supuesto para su evolución y señalando las aportaciones de sus habitantes a lo largo de la historia.',
            '9.2 Interpretar desde la perspectiva del desarrollo sostenible y la ciudadanía global los principales desafíos del mundo actual, expresando la importancia de implicarse en la búsqueda de soluciones y en el modo de concretarlos desde su capacidad de acción tanto local como global, valorando la contribución del Estado, sus instituciones y las asociaciones civiles en programas y misiones dirigidos por organismos nacionales e internacionales para el logro de la paz, la seguridad integral, la convivencia social y la cooperación entre los pueblos.',
          ],
          '3-4': [
            '9.1 Interpretar y explicar de forma argumentada la conexión de España con los grandes procesos históricos de la época contemporánea, valorando lo que han supuesto para su evolución y señalando las aportaciones de sus habitantes a lo largo de la historia, así como las aportaciones del Estado y sus instituciones a la cultura europea y mundial.',
            '9.2 Contribuir a la consecución de un mundo más seguro, justo, solidario y sostenible, a través del análisis de los principales conflictos del presente y el reconocimiento de las instituciones del Estado, y de las asociaciones civiles que garantizan la seguridad integral y la convivencia social, así como de los compromisos internacionales de nuestro país en favor de la paz, la seguridad, la cooperación, la sostenibilidad, los valores democráticos y los Objetivos de Desarrollo Sostenible.',
          ],
        },
      },
    ],
  },

  'Lengua Castellana y Literatura': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Describir y apreciar la diversidad lingüística del mundo a partir del reconocimiento de las lenguas del alumnado y la realidad plurilingüe y pluricultural de España, analizando el origen y desarrollo sociohistórico de sus lenguas y las características de las principales variedades dialectales del español, para favorecer la reflexión interlingüística, para combatir los estereotipos y prejuicios lingüísticos y para valorar dicha diversidad como fuente de riqueza cultural.',
        description:
          'Describir y apreciar la diversidad lingüística del mundo a partir del reconocimiento de las lenguas del alumnado y la realidad plurilingüe y pluricultural de España, analizando el origen y desarrollo sociohistórico de sus lenguas y las características de las principales variedades dialectales del español, para favorecer la reflexión interlingüística, para combatir los estereotipos y prejuicios lingüísticos y para valorar dicha diversidad como fuente de riqueza cultural.',
        criteris: {
          '1-2': [
            '1.1 Reconocer las lenguas de España y las variedades dialectales del español, con atención especial a las de Castilla-La Mancha, identificando algunas nociones básicas de las lenguas, tanto de España como las que forman los repertorios lingüísticos del alumnado, y contrastando algunos de sus rasgos en manifestaciones orales, escritas y multimodales.',
            '1.2 Identificar prejuicios y estereotipos lingüísticos adoptando una actitud de respeto y valoración de la riqueza cultural, lingüística y dialectal, a partir de la observación de la diversidad lingüística del entorno.',
          ],
          '3-4': [
            '1.1 Reconocer y valorar las lenguas de España y las variedades dialectales del español, con atención especial a las de Castilla-La Mancha, a partir de la explicación de su origen y su desarrollo histórico y sociolingüístico, contrastando aspectos lingüísticos y discursivos de las distintas lenguas, así como rasgos de los dialectos del español, diferenciándolos de los rasgos sociolectales y de registro, en manifestaciones orales, escritas y multimodales.',
            '1.2 Identificar y cuestionar prejuicios y estereotipos lingüísticos adoptando una actitud de respeto y valoración de la riqueza cultural, lingüística y dialectal, a partir del análisis de la diversidad lingüística en el entorno social próximo y de la exploración y reflexión en torno a los fenómenos del contacto entre lenguas y de la indagación de los derechos lingüísticos individuales y colectivos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Comprender e interpretar textos orales y multimodales, recogiendo el sentido general y la información más relevante, identificando el punto de vista y la intención del emisor y valorando su fiabilidad, su forma y su contenido, para construir conocimiento, para formarse opinión y para ensanchar las posibilidades de disfrute y ocio.',
        description:
          'Comprender e interpretar textos orales y multimodales, recogiendo el sentido general y la información más relevante, identificando el punto de vista y la intención del emisor y valorando su fiabilidad, su forma y su contenido, para construir conocimiento, para formarse opinión y para ensanchar las posibilidades de disfrute y ocio.',
        criteris: {
          '1-2': [
            '2.1 Comprender el sentido global, la estructura, la información más relevante en función de las necesidades comunicativas y la intención del emisor en textos orales y multimodales sencillos de diferentes ámbitos, analizando la interacción entre los diferentes códigos.',
            '2.2 Valorar la forma y el contenido de textos orales y multimodales sencillos, evaluando su calidad, su fiabilidad y la idoneidad del canal utilizado, así como la eficacia de los procedimientos comunicativos empleados.',
          ],
          '3-4': [
            '2.1 Comprender el sentido global, la estructura, la información más relevante en función de las necesidades comunicativas y la intención del emisor en textos orales y multimodales de cierta complejidad de diferentes ámbitos, analizando la interacción entre los diferentes códigos.',
            '2.2 Valorar la forma y el contenido de textos orales y multimodales de cierta complejidad, evaluando su calidad, su fiabilidad y la idoneidad del canal utilizado, así como la eficacia de los procedimientos comunicativos empleados.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Producir textos orales y multimodales con fluidez, coherencia, cohesión y registro adecuado, atendiendo a las convenciones propias de los diferentes géneros discursivos, y participar en interacciones orales con actitud cooperativa y respetuosa, tanto para construir conocimiento y establecer vínculos personales como para intervenir de manera activa e informada en diferentes contextos sociales.',
        description:
          'Producir textos orales y multimodales con fluidez, coherencia, cohesión y registro adecuado, atendiendo a las convenciones propias de los diferentes géneros discursivos, y participar en interacciones orales con actitud cooperativa y respetuosa, tanto para construir conocimiento y establecer vínculos personales como para intervenir de manera activa e informada en diferentes contextos sociales.',
        criteris: {
          '1-2': [
            '3.1 Realizar narraciones y exposiciones orales sencillas con diferente grado de planificación sobre temas de interés personal, social y educativo, ajustándose a las convenciones propias de los diversos géneros discursivos, con fluidez, coherencia, cohesión y el registro adecuado, en diferentes soportes y utilizando, de manera eficaz, recursos verbales y no verbales.',
            '3.2 Participar en interacciones orales informales, en el trabajo en equipo y en situaciones orales formales de carácter dialogado de manera activa y adecuada, con actitudes de escucha activa y haciendo uso de estrategias de cooperación conversacional y cortesía lingüística, utilizando un lenguaje no discriminatorio.',
            '3.3 Conseguir, de manera eficaz, los propósitos marcados en una situación comunicativa, interpretando, valorando y mejorando las producciones orales propias y ajenas, así como los aspectos prosódicos y los elementos no verbales (gestos, movimientos y mirada, entre otros).',
          ],
          '3-4': [
            '3.1 Realizar exposiciones y argumentaciones orales de cierta extensión y complejidad con diferente grado de planificación sobre temas de interés personal, social, educativo y profesional ajustándose a las convenciones propias de los diversos géneros discursivos, con fluidez, coherencia, cohesión y el registro adecuado en diferentes soportes, utilizando de manera eficaz recursos verbales y no verbales.',
            '3.2 Participar de manera activa y adecuada en interacciones orales informales, en el trabajo en equipo y en situaciones orales formales de carácter dialogado, con actitudes de escucha activa y estrategias de cooperación conversacional y cortesía lingüística, utilizando un lenguaje no discriminatorio.',
            '3.3 Conseguir, de manera eficaz, los propósitos marcados en una situación comunicativa, interpretando, valorando y mejorando las producciones orales propias y ajenas, así como los aspectos prosódicos y los elementos no verbales (gestos, movimientos y mirada, entre otros).',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Comprender, interpretar y valorar textos escritos, con sentido crítico y diferentes propósitos de lectura, reconociendo el sentido global y las ideas principales y secundarias, identificando la intención del emisor, reflexionando sobre el contenido y la forma y evaluando su calidad y fiabilidad, para dar respuesta a necesidades e intereses comunicativos diversos y para construir conocimiento.',
        description:
          'Comprender, interpretar y valorar textos escritos, con sentido crítico y diferentes propósitos de lectura, reconociendo el sentido global y las ideas principales y secundarias, identificando la intención del emisor, reflexionando sobre el contenido y la forma y evaluando su calidad y fiabilidad, para dar respuesta a necesidades e intereses comunicativos diversos y para construir conocimiento.',
        criteris: {
          '1-2': [
            '4.1 Comprender e interpretar el sentido global, la estructura, la información más relevante y la intención del emisor en textos escritos y multimodales sencillos, de diferentes ámbitos, que respondan a diferentes propósitos de lectura, realizando las inferencias necesarias.',
            '4.2 Valorar la forma y el contenido de textos sencillos evaluando su calidad, su fiabilidad y la idoneidad del canal utilizado, así como la eficacia de los procedimientos comunicativos empleados.',
            '4.3 Manifestar una actitud crítica ante cualquier tipo de texto, a través de una lectura reflexiva que permita identificar posturas de acuerdo o desacuerdo, respetando en todo momento a las personas que expresan su opinión en ellos.',
            '4.4 Reconocer el sentido de palabras, expresiones, enunciados o pequeños fragmentos extraídos de un texto, en función de su sentido global, incorporándolos a su uso personal de la lengua.',
          ],
          '3-4': [
            '4.1 Comprender e interpretar el sentido global, la estructura, la información más relevante y la intención del emisor de textos escritos y multimodales de cierta complejidad que respondan a diferentes propósitos de lectura, realizando las inferencias necesarias.',
            '4.2 Valorar críticamente el contenido y la forma de textos de cierta complejidad evaluando su calidad y fiabilidad, así como la eficacia de los procedimientos lingüísticos empleados.',
            '4.3 Manifestar una actitud crítica ante la lectura de cualquier tipo de textos, a través de una lectura reflexiva que permita identificar posturas de acuerdo o desacuerdo, respetando en todo momento a las personas que expresan su opinión en ellos.',
            '4.4 Reconocer el sentido de palabras, expresiones, enunciados o pequeños fragmentos extraídos de un texto, en función de su sentido global, incorporándolas a su conocimiento de la lengua.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Producir textos escritos y multimodales coherentes, cohesionados, adecuados y correctos, atendiendo a las convenciones propias del género discursivo elegido, para construir conocimiento y para dar respuesta de manera informada, eficaz y creativa a demandas comunicativas concretas.',
        description:
          'Producir textos escritos y multimodales coherentes, cohesionados, adecuados y correctos, atendiendo a las convenciones propias del género discursivo elegido, para construir conocimiento y para dar respuesta de manera informada, eficaz y creativa a demandas comunicativas concretas.',
        criteris: {
          '1-2': [
            '5.1 Planificar la redacción de textos escritos y multimodales sencillos, atendiendo a la situación comunicativa, al destinatario, al propósito y al canal; redactar borradores y revisarlos con ayuda del diálogo entre iguales e instrumentos de consulta, y presentar un texto final coherente, cohesionado y con el registro adecuado.',
            '5.2 Incorporar procedimientos básicos para enriquecer los textos, atendiendo a aspectos discursivos, lingüísticos y de estilo, con precisión léxica y corrección ortográfica y gramatical.',
          ],
          '3-4': [
            '5.1 Planificar la redacción de textos escritos y multimodales de cierta extensión atendiendo a la situación comunicativa, al destinatario, al propósito y canal; redactar borradores y revisarlos con ayuda del diálogo entre iguales e instrumentos de consulta; y presentar un texto final coherente, cohesionado y con el registro adecuado.',
            '5.2 Incorporar procedimientos para enriquecer los textos atendiendo a aspectos discursivos, pragmáticos, lingüísticos y de estilo, con precisión léxica y corrección ortográfica y gramatical.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Seleccionar y contrastar información procedente de diferentes fuentes de manera progresivamente autónoma, evaluando su fiabilidad y pertinencia en función de los objetivos de lectura y evitando los riesgos de manipulación y desinformación, e integrarla y transformarla en conocimiento, para comunicarla desde un punto de vista crítico y personal a la par que respetuoso con la propiedad intelectual.',
        description:
          'Seleccionar y contrastar información procedente de diferentes fuentes de manera progresivamente autónoma, evaluando su fiabilidad y pertinencia en función de los objetivos de lectura y evitando los riesgos de manipulación y desinformación, e integrarla y transformarla en conocimiento, para comunicarla desde un punto de vista crítico y personal a la par que respetuoso con la propiedad intelectual.',
        criteris: {
          '1-2': [
            '6.1 Localizar, seleccionar y contrastar información de manera guiada procedente de diferentes fuentes, calibrando su fiabilidad y pertinencia en función de los objetivos de lectura; organizarla e integrarla en esquemas propios, y reelaborarla y comunicarla de manera creativa adoptando un punto de vista crítico y respetando los principios de propiedad intelectual.',
            '6.2 Elaborar trabajos de investigación de manera guiada en diferentes soportes sobre diversos temas de interés académico, personal o social, a partir de la información seleccionada, aplicando las convenciones básicas establecidas para su presentación: organización en epígrafes, procedimientos de citas, bibliografía y webgrafía, entre otras.',
            '6.3 Emplear las tecnologías digitales en la búsqueda de información y en el proceso de comunicarla, adoptando hábitos de uso crítico, seguro, sostenible y saludable.',
          ],
          '3-4': [
            '6.1 Localizar, seleccionar y contrastar de manera progresivamente autónoma información procedente de diferentes fuentes, calibrando su fiabilidad y pertinencia en función de los objetivos de lectura; organizarla e integrarla en esquemas propios, y reelaborarla y comunicarla de manera creativa adoptando un punto de vista crítico respetando los principios de propiedad intelectual.',
            '6.2 Elaborar trabajos de investigación de manera progresivamente autónoma en diferentes soportes sobre diversos temas de interés académico, personal o social a partir de la información seleccionada, aplicando las convenciones establecidas para su presentación: organización en epígrafes, procedimientos de citas, bibliografía y webgrafía, etc.',
            '6.3 Adoptar hábitos de uso crítico, seguro, sostenible y saludable de las tecnologías digitales en relación con la búsqueda y la comunicación de la información.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Seleccionar y leer de manera progresivamente autónoma obras diversas como fuente de placer y conocimiento, configurando un itinerario lector que evolucione en cuanto a diversidad, complejidad y calidad de las obras, así como compartir experiencias de lectura, para construir la propia identidad lectora y para disfrutar de la dimensión social de la lectura.',
        description:
          'Seleccionar y leer de manera progresivamente autónoma obras diversas como fuente de placer y conocimiento, configurando un itinerario lector que evolucione en cuanto a diversidad, complejidad y calidad de las obras, así como compartir experiencias de lectura, para construir la propia identidad lectora y para disfrutar de la dimensión social de la lectura.',
        criteris: {
          '1-2': [
            '7.1 Elegir y leer textos a partir de preselecciones, guiándose por los propios gustos, intereses y necesidades y dejando constancia del propio itinerario lector y de la experiencia de lectura.',
            '7.2 Compartir la experiencia de lectura en soportes diversos, relacionando el sentido de la obra con la propia experiencia biográfica y lectora.',
          ],
          '3-4': [
            '7.1 Leer de manera autónoma textos seleccionados en función de los propios gustos, intereses y necesidades, y dejar constancia del progreso del propio itinerario lector y cultural explicando los criterios de selección de las lecturas, las formas de acceso a la cultura literaria y la experiencia de lectura.',
            '7.2 Compartir la experiencia de lectura en soportes diversos relacionando el sentido de la obra con la propia experiencia biográfica, lectora y cultural.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Leer, interpretar y valorar obras o fragmentos literarios del patrimonio nacional y universal, utilizando un metalenguaje específico y movilizando la experiencia biográfica y los conocimientos literarios y culturales que permiten establecer vínculos entre textos diversos y con otras manifestaciones artísticas, para conformar un mapa cultural, para ensanchar las posibilidades de disfrute de la literatura y para crear textos de intención literaria.',
        description:
          'Leer, interpretar y valorar obras o fragmentos literarios del patrimonio nacional y universal, utilizando un metalenguaje específico y movilizando la experiencia biográfica y los conocimientos literarios y culturales que permiten establecer vínculos entre textos diversos y con otras manifestaciones artísticas, para conformar un mapa cultural, para ensanchar las posibilidades de disfrute de la literatura y para crear textos de intención literaria.',
        criteris: {
          '1-2': [
            '8.1 Explicar y argumentar, con la ayuda de pautas y modelos, la interpretación de las obras leídas a partir del análisis de las relaciones internas de sus elementos constitutivos con el sentido de la obra, atendiendo a la configuración de los géneros y subgéneros literarios.',
            '8.2 Establecer, de manera guiada, vínculos argumentados entre los textos leídos y otros textos escritos, orales o multimodales, así como con otras manifestaciones artísticas y culturales, en función de temas, tópicos, estructuras, lenguaje y valores éticos y estéticos, mostrando la implicación y la respuesta personal del lector en la lectura.',
            '8.3 Crear textos personales o colectivos con intención literaria y conciencia de estilo, en distintos soportes y con ayuda de otros lenguajes artísticos y audiovisuales, a partir de la lectura de obras o fragmentos significativos en los que se empleen las convenciones formales de los diversos géneros y estilos literarios.',
          ],
          '3-4': [
            '8.1 Explicar y argumentar la interpretación de las obras leídas a partir del análisis de las relaciones internas de sus elementos constitutivos con el sentido de la obra y de las relaciones externas del texto con su contexto sociohistórico, atendiendo a la configuración y evolución de los géneros y subgéneros literarios.',
            '8.2 Establecer de manera progresivamente autónoma vínculos argumentados entre los textos leídos y otros textos escritos, orales o multimodales, así como con otras manifestaciones artísticas y culturales, en función de temas, tópicos, estructuras, lenguaje y valores éticos y estéticos, mostrando la implicación y la respuesta personal del lector en la lectura.',
            '8.3 Crear textos personales o colectivos con intención literaria y conciencia de estilo, en distintos soportes y con ayuda de otros lenguajes artísticos y audiovisuales, a partir de la lectura de obras o fragmentos significativos en los que se empleen las convenciones formales de los diversos géneros y estilos literarios.',
          ],
        },
      },
      {
        id: 'CE9',
        title:
          'Movilizar el conocimiento sobre la estructura de la lengua y sus usos y reflexionar de manera progresivamente autónoma sobre las elecciones lingüísticas y discursivas, con la terminología adecuada, para desarrollar la conciencia lingüística, para aumentar el repertorio comunicativo y para mejorar las destrezas tanto de producción oral y escrita como de comprensión e interpretación crítica.',
        description:
          'Movilizar el conocimiento sobre la estructura de la lengua y sus usos y reflexionar de manera progresivamente autónoma sobre las elecciones lingüísticas y discursivas, con la terminología adecuada, para desarrollar la conciencia lingüística, para aumentar el repertorio comunicativo y para mejorar las destrezas tanto de producción oral y escrita como de comprensión e interpretación crítica.',
        criteris: {
          '1-2': [
            '9.1 Revisar los textos propios de manera guiada y hacer propuestas de mejora argumentando los cambios a partir de la reflexión metalingüística e interlingüística y con un metalenguaje específico.',
            '9.2 Explicar y argumentar la interrelación entre el propósito comunicativo y las elecciones lingüísticas del emisor, así como sus efectos en el receptor, utilizando el conocimiento explícito de la lengua y un metalenguaje específico.',
            '9.3 Formular generalizaciones sobre aspectos básicos del funcionamiento de la lengua a partir de la observación, la comparación y la transformación de enunciados, así como de la formulación de hipótesis y la búsqueda de contraejemplos utilizando un metalenguaje específico y consultando de manera guiada diccionarios, manuales y gramáticas.',
          ],
          '3-4': [
            '9.1 Revisar los textos propios de manera progresivamente autónoma y hacer propuestas de mejora argumentando los cambios a partir de la reflexión metalingüística e interlingüística con el metalenguaje específico.',
            '9.2 Explicar y argumentar la interrelación entre el propósito comunicativo y las elecciones lingüísticas del emisor, así como sus efectos en el receptor, utilizando el conocimiento explícito de la lengua y el metalenguaje específico.',
            '9.3 Formular generalizaciones sobre algunos aspectos del funcionamiento de la lengua a partir de la observación, la comparación y la transformación de enunciados, así como de la formulación de hipótesis y la búsqueda de contraejemplos, utilizando el metalenguaje específico y consultando de manera progresivamente autónoma diccionarios, manuales y gramáticas.',
          ],
        },
      },
      {
        id: 'CE10',
        title:
          'Poner las propias prácticas comunicativas al servicio de la convivencia democrática, la resolución dialogada de los conflictos y la igualdad de derechos de todas las personas, utilizando un lenguaje no discriminatorio y desterrando los abusos de poder a través de la palabra, para favorecer un uso no solo eficaz sino también ético y democrático del lenguaje.',
        description:
          'Poner las propias prácticas comunicativas al servicio de la convivencia democrática, la resolución dialogada de los conflictos y la igualdad de derechos de todas las personas, utilizando un lenguaje no discriminatorio y desterrando los abusos de poder a través de la palabra, para favorecer un uso no solo eficaz sino también ético y democrático del lenguaje.',
        criteris: {
          '1-2': [
            '10.1 Identificar y desterrar los usos discriminatorios de la lengua, los abusos de poder a través de la palabra y los usos manipuladores del lenguaje a partir de la reflexión y el análisis de los elementos lingüísticos, textuales y discursivos utilizados, así como de los elementos no verbales que rigen la comunicación entre las personas.',
            '10.2 Utilizar estrategias para la resolución dialogada de los conflictos y la búsqueda de consensos tanto en el ámbito personal como educativo y social, desarrollando una postura abierta, tolerante y flexible.',
          ],
          '3-4': [
            '10.1 Identificar y desterrar los usos discriminatorios de la lengua, los abusos de poder a través de la palabra y los usos manipuladores del lenguaje a partir de la reflexión y el análisis de los elementos lingüísticos, textuales y discursivos utilizados, así como de los elementos no verbales de la comunicación.',
            '10.2 Utilizar estrategias para la resolución dialogada de los conflictos y la búsqueda de consensos, tanto en el ámbito personal como educativo y social, desarrollando una postura abierta, tolerante y flexible.',
          ],
        },
      },
    ],
  },

  'Lengua Extranjera': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Comprender e interpretar el sentido general y los detalles más relevantes de textos expresados de forma clara y en la lengua estándar, buscando fuentes fiables y haciendo uso de estrategias como la inferencia de significados, para responder a necesidades comunicativas concretas.',
        description:
          'Comprender e interpretar el sentido general y los detalles más relevantes de textos expresados de forma clara y en la lengua estándar, buscando fuentes fiables y haciendo uso de estrategias como la inferencia de significados, para responder a necesidades comunicativas concretas.',
        criteris: {
          '1-2': [
            '1.1. Comprender, interpretar, deducir y analizar el sentido global y localizar información específica y explícita de textos orales, escritos y multimodales breves y sencillos sobre temas frecuentes y cotidianos, de relevancia personal y próximos a su experiencia, propios de los ámbitos de las relaciones interpersonales, del aprendizaje, de los medios de comunicación y de la ficción expresados de forma clara y en la lengua estándar a través de diversos soportes.',
            '1.2 Seleccionar, organizar y aplicar de forma guiada las estrategias y conocimientos más adecuados en situaciones comunicativas cotidianas para comprender el sentido general, la información esencial y los detalles más relevantes de los textos; interpretar elementos no verbales; y buscar y seleccionar información.',
          ],
          '3-4': [
            '1.1 Extraer, analizar, identificar y relacionar el sentido global y las ideas principales, y seleccionar información pertinente y específica de textos orales, escritos y multimodales sobre temas cotidianos y predecibles, de relevancia personal o de interés público próximos a la experiencia del alumnado, expresados de forma clara y en la lengua estándar a través de diversos soportes.',
            '1.2 Comprender, interpretar y valorar el contenido y los rasgos discursivos de textos progresivamente más complejos propios de los ámbitos de las relaciones interpersonales, de los medios de comunicación social y del aprendizaje, así como de textos literarios adecuados al nivel de madurez del alumnado.',
            '1.3 Seleccionar, organizar y aplicar las estrategias y conocimientos más adecuados en cada situación comunicativa para comprender el sentido general, la información esencial y los detalles más relevantes de los textos; deducir e inferir significados e interpretar elementos no verbales; y buscar, seleccionar y gestionar información veraz.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Producir textos originales, de extensión media, sencillos y con una organización clara, usando estrategias tales como la planificación, la compensación o la autorreparación, para expresar mensajes relevantes de forma creativa, adecuada y coherente y responder a propósitos comunicativos concretos.',
        description:
          'Producir textos originales, de extensión media, sencillos y con una organización clara, usando estrategias tales como la planificación, la compensación o la autorreparación, para expresar mensajes relevantes de forma creativa, adecuada y coherente y responder a propósitos comunicativos concretos.',
        criteris: {
          '1-2': [
            '2.1 Expresar oralmente textos breves, sencillos, estructurados, comprensibles y adecuados a la situación comunicativa sobre asuntos cotidianos y frecuentes, de relevancia para el alumnado, con el fin de describir, narrar, comparar e informar sobre temas concretos, en diferentes soportes, utilizando de forma guiada recursos verbales y no verbales, así como estrategias de planificación y compensación en la producción.',
            '2.2 Organizar y redactar textos breves y comprensibles con aceptable claridad, coherencia, cohesión y adecuación a la situación comunicativa propuesta, siguiendo pautas establecidas, a través de herramientas analógicas y digitales, sobre asuntos cotidianos y frecuentes de relevancia para el alumnado y próximos a su experiencia.',
            '2.3 Seleccionar, organizar y aplicar de forma guiada conocimientos y estrategias para planificar, producir y revisar textos comprensibles, coherentes y adecuados a las intenciones comunicativas, a las características contextuales y a la tipología textual, usando con ayuda los recursos físicos o digitales más adecuados en función de la tarea y las necesidades de cada momento, teniendo en cuenta la personas a quienes va dirigido el texto.',
          ],
          '3-4': [
            '2.1 Expresar oralmente textos sencillos, estructurados, comprensibles, coherentes y adecuados a la situación comunicativa sobre asuntos cotidianos, de relevancia personal o de interés público próximo a la experiencia del alumnado, con el fin de describir, narrar, argumentar, comparar e informar, en diferentes soportes, utilizando recursos verbales y no verbales, así como estrategias de planificación (recordar y ensayar conjunto apropiado de frases de su repertorio), compensación (identificar lo solicitado mediante gestos o señalando) y cooperación.',
            '2.2 Redactar y difundir textos de extensión media con aceptable claridad, coherencia, cohesión, corrección y adecuación a la situación comunicativa propuesta, a la tipología textual y a las herramientas analógicas y digitales utilizadas sobre asuntos cotidianos, de relevancia personal o de interés público próximos a la experiencia del alumnado, respetando la propiedad intelectual y evitando el plagio.',
            '2.3 Seleccionar, organizar y aplicar conocimientos y estrategias para planificar, producir, revisar y cooperar en la elaboración de textos coherentes, cohesionados y adecuados a las intenciones comunicativas, las características contextuales, los aspectos socioculturales y la tipología textual, usando los recursos físicos o digitales más adecuados en función de la tarea y de las necesidades del interlocutor o interlocutora potencial a quien se dirige el texto.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Interactuar con otras personas con creciente autonomía, usando estrategias de cooperación y empleando recursos analógicos y digitales, para responder a propósitos comunicativos concretos en intercambios respetuosos con las normas de cortesía.',
        description:
          'Interactuar con otras personas con creciente autonomía, usando estrategias de cooperación y empleando recursos analógicos y digitales, para responder a propósitos comunicativos concretos en intercambios respetuosos con las normas de cortesía.',
        criteris: {
          '1-2': [
            '3.1 Preparar previamente y participar en situaciones interactivas breves y sencillas sobre temas cotidianos, de relevancia personal y próximos a la experiencia del alumnado, a través de diversos soportes, apoyándose en recursos tales como la repetición, el ritmo pausado o el lenguaje no verbal, y mostrando empatía y respeto por la cortesía lingüística y la etiqueta digital, así como por las diferentes necesidades, ideas, inquietudes, iniciativas y motivaciones de los interlocutores e interlocutoras.',
            '3.2 Seleccionar, organizar y utilizar, de forma guiada y en entornos próximos, estrategias adecuadas para iniciar, mantener y terminar la comunicación; tomar y ceder la palabra; y solicitar y formular aclaraciones y explicaciones.',
          ],
          '3-4': [
            '3.1 Planificar, participar y colaborar activamente, a través de diversos soportes, en situaciones interactivas en las que se desenvuelve con solvencia sobre temas cotidianos, de relevancia personal o de interés público cercanos a la experiencia del alumnado, mostrando iniciativa, empatía, discrepancias y coincidencias y respeto por la cortesía lingüística y la etiqueta digital, así como por las diferentes necesidades, ideas, inquietudes, iniciativas y motivaciones de los interlocutores e interlocutoras.',
            '3.2 Seleccionar, organizar y utilizar estrategias adecuadas para iniciar, mantener y terminar la comunicación, tomar y ceder la palabra, solicitar y formular aclaraciones y explicaciones, reformular, comparar y contrastar, resumir, colaborar, debatir, cooperar, resolver problemas y gestionar situaciones comprometidas.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Mediar en situaciones cotidianas entre distintas lenguas, usando estrategias y conocimientos sencillos orientados a explicar conceptos o simplificar mensajes, para transmitir información de manera eficaz, clara y responsable.',
        description:
          'Mediar en situaciones cotidianas entre distintas lenguas, usando estrategias y conocimientos sencillos orientados a explicar conceptos o simplificar mensajes, para transmitir información de manera eficaz, clara y responsable.',
        criteris: {
          '1-2': [
            '4.1 Inferir, explicar textos y transmitir conceptos y comunicaciones breves y sencillas en situaciones en las que se atienda a la diversidad, mostrando respeto y empatía por interlocutores e interlocutoras y por las lenguas empleadas, e interés por participar en la solución de problemas de intercomprensión y de entendimiento en el entorno próximo, apoyándose en diversos recursos y soportes.',
            '4.2 Aplicar, de forma guiada, estrategias que ayuden a crear puentes (parafraseo, equivalencia y síntesis) y faciliten la comprensión y producción de información y la comunicación, adecuadas a las intenciones comunicativas, usando recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
          ],
          '3-4': [
            '4.1 Inferir y explicar textos, transmitir conceptos y comunicaciones breves y sencillas en situaciones en las que se atienda a la diversidad, mostrando respeto y empatía por los interlocutores e interlocutoras y por las lenguas empleadas y participando en la solución de problemas de intercomprensión y de entendimiento en el entorno, apoyándose en diversos recursos y soportes.',
            '4.2 Aplicar estrategias que ayuden a crear puentes, faciliten la comunicación y sirvan para explicar y simplificar textos, conceptos y mensajes, y que sean adecuadas a las intenciones comunicativas, las características contextuales y la tipología textual, usando recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Ampliar y usar los repertorios lingüísticos personales entre distintas lenguas, reflexionando de forma crítica sobre su funcionamiento y tomando conciencia de las estrategias y conocimientos propios, para mejorar la respuesta a necesidades comunicativas concretas.',
        description:
          'Ampliar y usar los repertorios lingüísticos personales entre distintas lenguas, reflexionando de forma crítica sobre su funcionamiento y tomando conciencia de las estrategias y conocimientos propios, para mejorar la respuesta a necesidades comunicativas concretas.',
        criteris: {
          '1-2': [
            '5.1 Comparar y contrastar las semejanzas y diferencias entre distintas lenguas analizando y reflexionando de manera progresivamente autónoma sobre su funcionamiento.',
            '5.2 Utilizar y diferenciar los conocimientos y estrategias de mejora de la capacidad de comunicar y de aprender la lengua extranjera con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3 Identificar y registrar con regularidad, siguiendo modelos, los progresos y dificultades de aprendizaje de la lengua extranjera, seleccionando de forma guiada las estrategias más eficaces para superar esas dificultades y progresar en el aprendizaje, realizando actividades de autoevaluación y coevaluación, como las propuestas en el Portfolio Europeo de las Lenguas (PEL) o en un diario de aprendizaje, haciendo esos progresos y dificultades explícitos y compartiéndolos.',
          ],
          '3-4': [
            '5.1 Comparar y argumentar las semejanzas y diferencias entre distintas lenguas analizando y reflexionando de manera progresivamente autónoma sobre su funcionamiento.',
            '5.2 Utilizar de forma creativa estrategias y conocimientos de mejora de la capacidad de comunicar y de aprender la lengua extranjera con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3 Registrar y analizar con regularidad los progresos y dificultades de aprendizaje de la lengua extranjera seleccionando las estrategias más eficaces para superar esas dificultades y consolidar el aprendizaje, realizando actividades de planificación del propio aprendizaje, autoevaluación y coevaluación, como las propuestas en el Portfolio Europeo de las Lenguas (PEL) o en un diario de aprendizaje, haciendo esos progresos y dificultades explícitos y compartiéndolos.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Valorar críticamente y adecuarse a la diversidad lingüística, cultural y artística a partir de la lengua extranjera, identificando y compartiendo las semejanzas y las diferencias entre lenguas y culturas, para actuar de forma empática y respetuosa en situaciones interculturales.',
        description:
          'Valorar críticamente y adecuarse a la diversidad lingüística, cultural y artística a partir de la lengua extranjera, identificando y compartiendo las semejanzas y las diferencias entre lenguas y culturas, para actuar de forma empática y respetuosa en situaciones interculturales.',
        criteris: {
          '1-2': [
            '6.1 Actuar de forma empática y respetuosa en situaciones interculturales construyendo vínculos entre las diferentes lenguas y culturas y rechazando cualquier tipo de discriminación, prejuicio y estereotipo en diferentes contextos comunicativos cotidianos.',
            '6.2 Aceptar y adecuarse a la diversidad lingüística, cultural y artística propia de países donde se habla la lengua extranjera, reconociéndola como fuente de enriquecimiento personal y mostrando interés por compartir elementos culturales y lingüísticos que fomenten la sostenibilidad y la democracia.',
            '6.3 Aplicar, de forma guiada, estrategias para explicar y apreciar la diversidad lingüística, cultural y artística, atendiendo a valores ecosociales y democráticos y respetando los principios de justicia, equidad, igualdad y sostenibilidad.',
          ],
          '3-4': [
            '6.1 Actuar de forma adecuada, empática y respetuosa en situaciones interculturales construyendo vínculos entre las diferentes lenguas y culturas, rechazando cualquier tipo de discriminación, prejuicio y estereotipo en diferentes contextos comunicativos cotidianos y proponiendo vías de solución a aquellos factores socioculturales que dificulten la comunicación.',
            '6.2 Valorar críticamente en relación con los derechos humanos y adecuarse a la diversidad lingüística, cultural y artística propia de países donde se habla la lengua extranjera, favoreciendo el desarrollo de una cultura compartida y una ciudadanía comprometida con la sostenibilidad y los valores democráticos.',
            '6.3 Aplicar estrategias para defender y apreciar la diversidad lingüística, cultural y artística atendiendo a valores ecosociales y democráticos y respetando los principios de justicia, equidad e igualdad y sostenibilidad.',
          ],
        },
      },
    ],
  },

  Matemáticas: {
    competencies: [
      {
        id: 'CE1',
        title:
          'Interpretar, modelizar y resolver problemas de la vida cotidiana y propios de las matemáticas, aplicando diferentes estrategias y formas de razonamiento, para explorar distintas maneras de proceder y obtener posibles soluciones.',
        description:
          'Interpretar, modelizar y resolver problemas de la vida cotidiana y propios de las matemáticas, aplicando diferentes estrategias y formas de razonamiento, para explorar distintas maneras de proceder y obtener posibles soluciones.',
        criteris: {
          '1-2': [
            '1.1. Interpretar problemas matemáticos organizando los datos, estableciendo las relaciones entre ellos y comprendiendo las preguntas formuladas.',
            '1.2. Aplicar herramientas y estrategias apropiadas que contribuyan a la resolución de problemas.',
            '1.3. Obtener soluciones matemáticas de un problema, activando los conocimientos y utilizando las herramientas tecnológicas necesarias.',
          ],
          '3': [
            '1.1. Interpretar problemas matemáticos organizando los datos dados, estableciendo las relaciones entre ellos y comprendiendo las preguntas formuladas.',
            '1.2. Aplicar herramientas y estrategias apropiadas que contribuyan a la resolución de problemas.',
            '1.3. Obtener soluciones matemáticas de un problema, activando los conocimientos y utilizando las herramientas tecnológicas necesarias.',
          ],
          '4A': [
            '1.1. Reformular problemas matemáticos de forma verbal y gráfica, interpretando los datos, las relaciones entre ellos y las preguntas planteadas.',
            '1.2. Seleccionar herramientas y estrategias elaboradas valorando su eficacia e idoneidad en la resolución de problemas.',
            '1.3. Obtener todas las posibles soluciones matemáticas de un problema activando los conocimientos y utilizando las herramientas tecnológicas necesarias.',
          ],
          '4B': [
            '1.1. Reformular de forma verbal y gráfica problemas matemáticos, interpretando los datos, las relaciones entre ellos y las preguntas planteadas.',
            '1.2. Analizar y seleccionar diferentes herramientas y estrategias elaboradas en la resolución de un mismo problema, valorando su eficiencia.',
            '1.3. Obtener todas las posibles soluciones matemáticas de un problema movilizando los conocimientos y utilizando las herramientas tecnológicas necesarias.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Analizar las soluciones de un problema usando diferentes técnicas y herramientas, evaluando las respuestas obtenidas, para verificar su validez e idoneidad desde un punto de vista matemático y su repercusión global.',
        description:
          'Analizar las soluciones de un problema usando diferentes técnicas y herramientas, evaluando las respuestas obtenidas, para verificar su validez e idoneidad desde un punto de vista matemático y su repercusión global.',
        criteris: {
          '1-2': [
            '2.1. Comprobar la corrección matemática de las soluciones de un problema.',
            '2.2. Comprobar la validez de las soluciones de un problema y su coherencia en el contexto planteado.',
          ],
          '3': [
            '2.1. Comprobar la corrección matemática de las soluciones de un problema.',
            '2.2. Comprobar la validez de las soluciones de un problema y su coherencia en el contexto planteado, evaluando el alcance y repercusión de estas desde diferentes perspectivas (de género, de sostenibilidad, de consumo responsable, etc.).',
          ],
          '4A': [
            '2.1. Comprobar la corrección matemática de las soluciones de un problema.',
            '2.2. Seleccionar las soluciones óptimas de un problema valorando tanto la corrección matemática como sus implicaciones desde diferentes perspectivas (de género, de sostenibilidad y de consumo responsable, entre otras).',
          ],
          '4B': [
            '2.1. Comprobar la corrección matemática de las soluciones de un problema.',
            '2.2. Justificar las soluciones óptimas de un problema desde diferentes perspectivas (matemática, de género, de sostenibilidad y de consumo responsable, entre otras).',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Formular y comprobar conjeturas sencillas o plantear problemas de forma autónoma, reconociendo el valor del razonamiento y la argumentación, para generar nuevo conocimiento.',
        description:
          'Formular y comprobar conjeturas sencillas o plantear problemas de forma autónoma, reconociendo el valor del razonamiento y la argumentación, para generar nuevo conocimiento.',
        criteris: {
          '1-2': [
            '3.1. Formular y comprobar conjeturas sencillas de forma guiada analizando patrones, propiedades y relaciones.',
            '3.2. Emplear herramientas tecnológicas adecuadas en la investigación y comprobación de conjeturas o problemas.',
          ],
          '3': [
            '3.1. Formular y comprobar conjeturas de forma guiada analizando patrones, propiedades y relaciones.',
            '3.2. Plantear variantes de un problema dado modificando alguno de sus datos o alguna condición del problema.',
            '3.3. Emplear herramientas tecnológicas adecuadas en la investigación y comprobación de conjeturas o problemas.',
          ],
          '4A': [
            '3.1. Formular, comprobar e investigar conjeturas de forma guiada estudiando patrones, propiedades y relaciones.',
            '3.2. Crear variantes de un problema dado, modificando alguno de sus datos y observando la relación entre los diferentes resultados obtenidos.',
            '3.3. Emplear herramientas tecnológicas adecuadas en la investigación y comprobación de conjeturas o problemas.',
          ],
          '4B': [
            '3.1. Formular, comprobar e investigar conjeturas de forma guiada.',
            '3.2. Plantear variantes de un problema que lleven a una generalización.',
            '3.3. Emplear herramientas tecnológicas adecuadas en la investigación y comprobación de conjeturas o problemas.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Utilizar los principios del pensamiento computacional organizando datos, descomponiendo en partes, reconociendo patrones, interpretando, modificando y creando algoritmos, para modelizar situaciones y resolver problemas de forma eficaz.',
        description:
          'Utilizar los principios del pensamiento computacional organizando datos, descomponiendo en partes, reconociendo patrones, interpretando, modificando y creando algoritmos, para modelizar situaciones y resolver problemas de forma eficaz.',
        criteris: {
          '1-2': [
            '4.1. Reconocer patrones, organizar datos y descomponer un problema en partes más simples facilitando su interpretación computacional.',
            '4.2. Modelizar situaciones y resolver problemas de forma eficaz.',
          ],
          '3': [
            '4.1. Reconocer patrones, organizar datos y descomponer un problema en partes más simples facilitando su interpretación computacional.',
            '4.2. Modelizar situaciones y resolver problemas de forma eficaz interpretando y modificando algoritmos.',
          ],
          '4A': [
            '4.1. Reconocer e investigar patrones, organizar datos y descomponer un problema en partes más simples facilitando su interpretación y su tratamiento computacional.',
            '4.2. Modelizar situaciones y resolver problemas de forma eficaz interpretando, modificando y creando algoritmos sencillos.',
          ],
          '4B': [
            '4.1. Generalizar patrones y proporcionar una representación computacional de situaciones problematizadas.',
            '4.2. Modelizar situaciones y resolver problemas de forma eficaz interpretando, modificando, generalizando y creando algoritmos.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Reconocer y utilizar conexiones entre los diferentes elementos matemáticos, interconectando conceptos y procedimientos, para desarrollar una visión de las matemáticas como un todo integrado.',
        description:
          'Reconocer y utilizar conexiones entre los diferentes elementos matemáticos, interconectando conceptos y procedimientos, para desarrollar una visión de las matemáticas como un todo integrado.',
        criteris: {
          '1-2': [
            '5.1. Reconocer las relaciones entre los conocimientos y experiencias matemáticas, formando un todo coherente.',
            '5.2. Realizar conexiones sencillas entre diferentes procesos matemáticos aplicando conocimientos y experiencias previas.',
          ],
          '3': [
            '5.1. Reconocer las relaciones entre los conocimientos y experiencias matemáticas, formando un todo coherente.',
            '5.2. Realizar conexiones entre diferentes procesos matemáticos aplicando conocimientos y experiencias previas.',
          ],
          '4A': [
            '5.1. Deducir relaciones entre los conocimientos y experiencias matemáticas, formando un todo coherente.',
            '5.2. Analizar y poner en práctica conexiones entre diferentes procesos matemáticos aplicando conocimientos y experiencias previas.',
          ],
          '4B': [
            '5.1. Deducir relaciones entre los conocimientos y experiencias matemáticas, formando un todo coherente.',
            '5.2. Analizar y poner en práctica conexiones entre diferentes procesos matemáticos aplicando conocimientos y experiencias previas.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Identificar las matemáticas implicadas en otras materias y en situaciones reales susceptibles de ser abordadas en términos matemáticos, interrelacionando conceptos y procedimientos, para aplicarlos en situaciones diversas.',
        description:
          'Identificar las matemáticas implicadas en otras materias y en situaciones reales susceptibles de ser abordadas en términos matemáticos, interrelacionando conceptos y procedimientos, para aplicarlos en situaciones diversas.',
        criteris: {
          '1-2': [
            '6.1. Reconocer situaciones susceptibles de ser formuladas y resueltas mediante herramientas y estrategias matemáticas, estableciendo conexiones entre el mundo real y las matemáticas y usando procesos inherentes a la investigación.',
            '6.2. Identificar conexiones coherentes entre las matemáticas y otras materias resolviendo problemas contextualizados.',
            '6.3 Reconocer la aportación de las matemáticas al progreso de la humanidad y su contribución a la superación de los retos que demanda la sociedad actual.',
          ],
          '3': [
            '6.1. Reconocer situaciones susceptibles de ser formuladas y resueltas mediante herramientas y estrategias matemáticas, estableciendo conexiones entre el mundo real y las matemáticas y usando los procesos inherentes a la investigación: inferir, medir, comunicar, clasificar y predecir.',
            '6.2. Identificar conexiones coherentes entre las matemáticas y otras materias resolviendo problemas contextualizados.',
            '6.3. Reconocer la aportación de las matemáticas al progreso de la humanidad y su contribución a la superación de los retos que demanda la sociedad actual.',
          ],
          '4A': [
            '6.1. Proponer situaciones susceptibles de ser formuladas y resueltas mediante herramientas y estrategias matemáticas, estableciendo y aplicando conexiones entre el mundo real y las matemáticas, y usando los procesos inherentes a la investigación científica y matemática: inferir, medir, comunicar, clasificar y predecir.',
            '6.2. Identificar y aplicar conexiones coherentes entre las matemáticas y otras materias realizando un análisis crítico.',
            '6.3. Valorar la aportación de las matemáticas al progreso de la humanidad y su contribución en la superación de los retos que demanda la sociedad actual.',
          ],
          '4B': [
            '6.1. Proponer situaciones susceptibles de ser formuladas y resueltas mediante herramientas y estrategias matemáticas, estableciendo y aplicando conexiones entre el mundo real y las matemáticas, y usando los procesos inherentes a la investigación científica y matemática: inferir, medir, comunicar, clasificar y predecir.',
            '6.2. Analizar y aplicar conexiones coherentes entre las matemáticas y otras materias realizando un análisis crítico.',
            '6.3. Valorar la aportación de las matemáticas al progreso de la humanidad y su contribución a la superación de los retos que demanda la sociedad actual.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Representar, de forma individual y colectiva, conceptos, procedimientos, información y resultados matemáticos, usando diferentes tecnologías, para visualizar ideas y estructurar procesos matemáticos.',
        description:
          'Representar, de forma individual y colectiva, conceptos, procedimientos, información y resultados matemáticos, usando diferentes tecnologías, para visualizar ideas y estructurar procesos matemáticos.',
        criteris: {
          '1-2': [
            '7.1. Interpretar y representar conceptos, información y resultados matemáticos de modos distintos y con diferentes herramientas, incluidas las digitales, visualizando ideas y valorando su utilidad para compartir información.',
            '7.2. Elaborar representaciones matemáticas que ayuden en la búsqueda de estrategias de resolución de una situación problematizada.',
          ],
          '3': [
            '7.1. Interpretar y representar conceptos, procedimientos, información y resultados matemáticos de modos distintos y con diferentes herramientas, incluidas las digitales, visualizando ideas, estructurando procesos matemáticos y valorando su utilidad para compartir información.',
            '7.2. Elaborar representaciones matemáticas que ayuden en la búsqueda de estrategias de resolución de una situación problematizada.',
          ],
          '4A': [
            '7.1. Representar matemáticamente la información más relevante de un problema, conceptos, procedimientos y resultados matemáticos visualizando ideas y estructurando procesos matemáticos.',
            '7.2. Seleccionar entre diferentes herramientas, incluidas las digitales, y formas de representación (pictórica, gráfica, verbal o simbólica) valorando su utilidad para compartir información.',
          ],
          '4B': [
            '7.1. Representar matemáticamente la información más relevante de un problema, conceptos, procedimientos y resultados matemáticos visualizando ideas y estructurando procesos matemáticos.',
            '7.2. Seleccionar entre diferentes herramientas, incluidas las digitales, y formas de representación (pictórica, gráfica, verbal o simbólica) valorando su utilidad para compartir información.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Comunicar de forma individual y colectiva conceptos, procedimientos y argumentos matemáticos, usando lenguaje oral, escrito o gráfico, utilizando la terminología matemática apropiada, para dar significado y coherencia a las ideas matemáticas.',
        description:
          'Comunicar de forma individual y colectiva conceptos, procedimientos y argumentos matemáticos, usando lenguaje oral, escrito o gráfico, utilizando la terminología matemática apropiada, para dar significado y coherencia a las ideas matemáticas.',
        criteris: {
          '1-2': [
            '8.1. Comunicar información utilizando el lenguaje matemático apropiado, usando diferentes medios, incluidos los digitales, oralmente y por escrito, al describir, explicar y justificar razonamientos, procedimientos y conclusiones.',
            '8.2. Reconocer e interpretar el lenguaje matemático presente en la vida cotidiana.',
          ],
          '3': [
            '8.1. Comunicar información utilizando el lenguaje matemático apropiado, usando diferentes medios, incluidos los digitales, oralmente y por escrito, al describir, explicar y justificar razonamientos, procedimientos y conclusiones.',
            '8.2. Reconocer y emplear el lenguaje matemático presente en la vida cotidiana comunicando mensajes con contenido matemático con precisión y rigor.',
          ],
          '4A': [
            '8.1. Comunicar ideas, conclusiones, conjeturas y razonamientos matemáticos, utilizando diferentes medios, incluidos los digitales, con coherencia, claridad y terminología apropiada.',
            '8.2. Reconocer y emplear el lenguaje matemático presente en la vida cotidiana y en diversos contextos comunicando mensajes con contenido matemático con precisión y rigor.',
          ],
          '4B': [
            '8.1. Comunicar ideas, conclusiones, conjeturas y razonamientos matemáticos, utilizando diferentes medios, incluidos los digitales, con coherencia, claridad y terminología apropiada.',
            '8.2. Reconocer y emplear el lenguaje matemático presente en la vida cotidiana y en diversos contextos comunicando mensajes con contenido matemático con precisión y rigor.',
          ],
        },
      },
      {
        id: 'CE9',
        title:
          'Desarrollar destrezas personales, identificando y gestionando emociones, poniendo en práctica estrategias de aceptación del error como parte del proceso de aprendizaje y adaptándose ante situaciones de incertidumbre, para mejorar la perseverancia en la consecución de objetivos y el disfrute en el aprendizaje de las matemáticas.',
        description:
          'Desarrollar destrezas personales, identificando y gestionando emociones, poniendo en práctica estrategias de aceptación del error como parte del proceso de aprendizaje y adaptándose ante situaciones de incertidumbre, para mejorar la perseverancia en la consecución de objetivos y el disfrute en el aprendizaje de las matemáticas.',
        criteris: {
          '1-2': [
            '9.1. Gestionar las emociones propias y desarrollar el autoconcepto matemático (debilidades y fortalezas) al abordar nuevos retos matemáticos.',
            '9.2. Mostrar una actitud positiva, responsable, y perseverante, aceptando la crítica razonada y valorando el error como una oportunidad de aprendizaje.',
          ],
          '3': [
            '9.1. Gestionar las emociones propias, desarrollar el autoconcepto matemático como herramienta, generando expectativas positivas ante nuevos retos matemáticos.',
            '9.2. Mostrar una actitud positiva y perseverante, aceptando la crítica razonada al hacer frente a las diferentes situaciones de aprendizaje de las matemáticas.',
          ],
          '4A': [
            '9.1. Identificar y gestionar las emociones propias y desarrollar el autoconcepto matemático generando expectativas positivas ante nuevos retos matemáticos.',
            '9.2. Mostrar una actitud positiva y perseverante al hacer frente a las diferentes situaciones de aprendizaje de las matemáticas aceptando la crítica razonada.',
          ],
          '4B': [
            '9.1. Identificar y gestionar las emociones propias y desarrollar el autoconcepto matemático generando expectativas positivas ante nuevos retos matemáticos.',
            '9.2. Mostrar una actitud positiva y perseverante al hacer frente a las diferentes situaciones de aprendizaje de las matemáticas aceptando la crítica razonada.',
          ],
        },
      },
      {
        id: 'CE10',
        title:
          'Desarrollar destrezas sociales reconociendo y respetando las emociones y experiencias de los demás, participando activa y reflexivamente en proyectos en equipos heterogéneos con roles asignados, para construir una identidad positiva como estudiante de matemáticas, fomentar el bienestar personal y grupal y crear relaciones saludables.',
        description:
          'Desarrollar destrezas sociales reconociendo y respetando las emociones y experiencias de los demás, participando activa y reflexivamente en proyectos en equipos heterogéneos con roles asignados, para construir una identidad positiva como estudiante de matemáticas, fomentar el bienestar personal y grupal y crear relaciones saludables.',
        criteris: {
          '1-2': [
            '10.1. Colaborar activamente, demostrar iniciativa y construir relaciones, trabajando con las matemáticas en equipos heterogéneos, respetando diferentes opiniones y comunicándose de manera efectiva.',
            '10.2. Participar en el reparto de tareas que deban desarrollarse en equipo, aportando valor, favoreciendo la inclusión, la escucha activa, asumiendo el rol asignado y responsabilizándose de la propia contribución al equipo.',
          ],
          '3': [
            '10.1. Colaborar activamente y construir relaciones trabajando con las matemáticas en equipos heterogéneos, respetando diferentes opiniones, comunicándose de manera efectiva, pensando de forma crítica y creativa y tomando decisiones y realizando juicios informados.',
            '10.2. Participar en el reparto de tareas que deban desarrollarse en equipo, aportando valor, favoreciendo la inclusión, la escucha activa, asumiendo el rol asignado y responsabilizándose de la propia contribución al equipo.',
          ],
          '4A': [
            '10.1. Colaborar activamente y construir relaciones trabajando con las matemáticas en equipos heterogéneos, respetando diferentes opiniones, comunicándose de manera efectiva, pensando de forma crítica y creativa, tomando decisiones y realizando juicios informados.',
            '10.2. Gestionar el reparto de tareas en el trabajo en equipo, aportando valor, favoreciendo la inclusión, la escucha activa, responsabilizándose del rol asignado y de la propia contribución al equipo.',
          ],
          '4B': [
            '10.1. Colaborar activamente y construir relaciones trabajando con las matemáticas en equipos heterogéneos, respetando diferentes opiniones, comunicándose de manera efectiva, pensando de forma crítica y creativa, tomando decisiones y realizando juicios informados.',
            '10.2. Gestionar el reparto de tareas en el trabajo en equipo, aportando valor, favoreciendo la inclusión, la escucha activa, responsabilizándose del rol asignado y de la propia contribución al equipo.',
          ],
        },
      },
    ],
  },

  Música: {
    competencies: [
      {
        id: 'CE1',
        title:
          'Analizar obras de diferentes épocas y culturas, identificando sus principales rasgos estilísticos y estableciendo relaciones con su contexto, para valorar el patrimonio musical y dancístico como fuente de disfrute y enriquecimiento personal.',
        description:
          'Analizar obras de diferentes épocas y culturas, identificando sus principales rasgos estilísticos y estableciendo relaciones con su contexto, para valorar el patrimonio musical y dancístico como fuente de disfrute y enriquecimiento personal.',
        criteris: {
          '1-3': [
            '1.1 Identificar los principales rasgos estilísticos de obras musicales y dancísticas de diferentes épocas y culturas, evidenciando una actitud de apertura, interés y respeto en la escucha o el visionado de las mismas.',
            '1.2 Explicar, con actitud abierta y respetuosa, las funciones desempeñadas por determinadas producciones musicales y dancísticas, relacionándolas con las principales características de su contexto histórico, social y cultural.',
            '1.3 Establecer conexiones entre manifestaciones musicales y dancísticas de diferentes épocas y culturas, valorando su influencia sobre la música y la danza actuales.',
            '1.4 Desarrollar estrategias de búsqueda y selección de información sobre la música de diferentes épocas y culturas, utilizando fuentes fiables analógicas o digitales que respeten los derechos de autoría.',
          ],
          '4': [
            '1.1 Analizar obras musicales y dancísticas de diferentes épocas y culturas, identificando sus rasgos estilísticos, explicando su relación con el contexto y evidenciando una actitud de apertura, interés y respeto en la escucha o el visionado de las mismas.',
            '1.2 Valorar críticamente los hábitos, los gustos y los referentes musicales y dancísticos de diferentes épocas y culturas, reflexionando sobre su evolución y sobre su relación con los del presente.',
            '1.3. Seleccionar producciones musicales de calidad, a través del uso de herramientas digitales, utilizando un espíritu crítico y respetando los derechos de propiedad intelectual.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Explorar las posibilidades expresivas de diferentes técnicas musicales y dancísticas, a través de actividades de interpretación e improvisación, para incorporarlas al repertorio personal de recursos y desarrollar el criterio de selección de las técnicas más adecuadas a la intención expresiva.',
        description:
          'Explorar las posibilidades expresivas de diferentes técnicas musicales y dancísticas, a través de actividades de interpretación e improvisación, para incorporarlas al repertorio personal de recursos y desarrollar el criterio de selección de las técnicas más adecuadas a la intención expresiva.',
        criteris: {
          '1-3': [
            '2.1 Participar, con iniciativa, confianza y creatividad, en la exploración de técnicas musicales y dancísticas básicas, por medio de interpretaciones e improvisaciones pautadas, individuales o grupales, en las que se empleen la voz, el cuerpo, instrumentos musicales o herramientas tecnológicas.',
            '2.2 Expresar ideas, sentimientos y emociones en actividades pautadas de interpretación e improvisación, seleccionando las técnicas más adecuadas de entre las que conforman el repertorio personal de recursos.',
          ],
          '4': [
            '2.1 Participar, con iniciativa, confianza y creatividad, en la exploración de técnicas musicales y dancísticas de mayor complejidad, por medio de interpretaciones e improvisaciones libres y pautadas, individuales o grupales, en las que se empleen la voz, el cuerpo, instrumentos musicales o herramientas tecnológicas.',
            '2.2 Elaborar piezas musicales o dancísticas estructuradas, a partir de actividades de improvisación, seleccionando las técnicas del repertorio personal de recursos más adecuadas a la intención expresiva.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Interpretar piezas musicales y dancísticas, gestionando adecuadamente las emociones y empleando diversas estrategias y técnicas vocales, corporales o instrumentales, para ampliar las posibilidades de expresión personal o grupal.',
        description:
          'Interpretar piezas musicales y dancísticas, gestionando adecuadamente las emociones y empleando diversas estrategias y técnicas vocales, corporales o instrumentales, para ampliar las posibilidades de expresión personal o grupal.',
        criteris: {
          '1-3': [
            '3.1 Leer partituras sencillas, identificando de forma guiada los elementos básicos del lenguaje musical, con o sin apoyo de la audición.',
            '3.2 Emplear técnicas básicas de interpretación vocal, corporal o instrumental, aplicando estrategias de memorización y valorando los ensayos como espacios de escucha y aprendizaje.',
            '3.3 Interpretar con corrección piezas musicales y dancísticas sencillas, individuales y grupales, dentro y fuera del aula, gestionando de forma guiada la ansiedad y el miedo escénico, y manteniendo la concentración.',
          ],
          '4': [
            '3.1 Leer partituras sencillas, identificando los elementos básicos del lenguaje musical y analizando de forma guiada las estructuras de las piezas, con o sin apoyo de la audición.',
            '3.2 Emplear diferentes técnicas de interpretación vocal, corporal o instrumental, aplicando estrategias de memorización y valorando los ensayos como espacios de escucha y aprendizaje.',
            '3.3 Interpretar con corrección y expresividad piezas musicales y dancísticas, individuales y grupales, dentro y fuera del aula, gestionando la ansiedad y el miedo escénico, y manteniendo la concentración.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Crear propuestas artístico-musicales, de forma individual o grupal, empleando la voz, el cuerpo, instrumentos musicales y herramientas tecnológicas, para potenciar la creatividad e identificar oportunidades de desarrollo personal, social, académico y profesional.',
        description:
          'Crear propuestas artístico-musicales, de forma individual o grupal, empleando la voz, el cuerpo, instrumentos musicales y herramientas tecnológicas, para potenciar la creatividad e identificar oportunidades de desarrollo personal, social, académico y profesional.',
        criteris: {
          '1-3': [
            '4.1 Planificar y desarrollar, con creatividad, propuestas artístico-musicales, tanto individuales como colaborativas, empleando medios musicales y dancísticos, así como herramientas analógicas y digitales.',
            '4.2 Participar activamente en la planificación y en la ejecución de propuestas artístico-musicales colaborativas, valorando las aportaciones del resto de integrantes del grupo y descubriendo oportunidades de desarrollo personal, social, académico y profesional.',
          ],
          '4': [
            '4.1 Planificar y desarrollar, con creatividad, propuestas artístico-musicales, tanto individuales como colaborativas, seleccionando, de entre los disponibles, los medios musicales y dancísticos más oportunos, así como las herramientas analógicas o digitales más adecuadas.',
            '4.2 Participar activamente en la planificación y en la ejecución de propuestas artístico-musicales colaborativas, asumiendo diferentes funciones, valorando las aportaciones del resto de integrantes del grupo e identificando diversas oportunidades de desarrollo personal, social, académico y profesional.',
          ],
        },
      },
    ],
  },

  'Tecnología y Digitalización': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Buscar y seleccionar la información adecuada proveniente de diversas fuentes, de manera crítica y segura, aplicando procesos de investigación, métodos de análisis de productos y experimentando con herramientas de simulación, para definir problemas tecnológicos e iniciar procesos de creación de soluciones a partir de la información obtenida.',
        description:
          'Buscar y seleccionar la información adecuada proveniente de diversas fuentes, de manera crítica y segura, aplicando procesos de investigación, métodos de análisis de productos y experimentando con herramientas de simulación, para definir problemas tecnológicos e iniciar procesos de creación de soluciones a partir de la información obtenida.',
        criteris: {
          eso: [
            '1.1. Definir problemas o necesidades planteadas, buscando y contrastando información procedente de diferentes fuentes de manera crítica, evaluando su fiabilidad y pertinencia.',
            '1.2. Comprender y examinar productos tecnológicos de uso habitual a través del análisis de objetos y sistemas, empleando el método científico y utilizando herramientas de simulación en la construcción de conocimiento.',
            '1.3 Adoptar medidas preventivas para la protección de los dispositivos, los datos y la salud personal, identificando problemas y riesgos relacionados con el uso de la tecnología y analizándolos de manera ética y crítica.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Abordar problemas tecnológicos con autonomía y actitud creativa, aplicando conocimientos interdisciplinares y trabajando de forma cooperativa y colaborativa, para diseñar y planificar soluciones a un problema o necesidad de forma eficaz, innovadora y sostenible.',
        description:
          'Abordar problemas tecnológicos con autonomía y actitud creativa, aplicando conocimientos interdisciplinares y trabajando de forma cooperativa y colaborativa, para diseñar y planificar soluciones a un problema o necesidad de forma eficaz, innovadora y sostenible.',
        criteris: {
          eso: [
            '2.1. Idear y diseñar soluciones eficaces, innovadoras y sostenibles a problemas definidos, aplicando conceptos, técnicas y procedimientos interdisciplinares, así como criterios de sostenibilidad, con actitud emprendedora, perseverante y creativa.',
            '2.2. Seleccionar, planificar y organizar los materiales y herramientas, así como las tareas necesarias para la construcción de una solución a un problema planteado, trabajando individualmente o en grupo de manera cooperativa y colaborativa.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Aplicar de forma apropiada y segura distintas técnicas y conocimientos interdisciplinares utilizando operadores, sistemas tecnológicos y herramientas, teniendo en cuenta la planificación y el diseño previo, para construir o fabricar soluciones tecnológicas y sostenibles que den respuesta a necesidades en diferentes contextos.',
        description:
          'Aplicar de forma apropiada y segura distintas técnicas y conocimientos interdisciplinares utilizando operadores, sistemas tecnológicos y herramientas, teniendo en cuenta la planificación y el diseño previo, para construir o fabricar soluciones tecnológicas y sostenibles que den respuesta a necesidades en diferentes contextos.',
        criteris: {
          eso: [
            '3.1. Fabricar objetos o modelos mediante la manipulación y conformación de materiales, empleando herramientas y máquinas adecuadas, aplicando los fundamentos de estructuras, mecanismos, electricidad y electrónica y respetando las normas de seguridad y salud correspondientes.',
            '3.2 Construir o seleccionar operadores y componentes tecnológicos, analizando su funcionamiento y haciendo uso de estos en el diseño de soluciones tecnológicas, partiendo de los conocimientos adquiridos de estructuras, mecanismos, electricidad y electrónica.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Describir, representar e intercambiar ideas o soluciones a problemas tecnológicos o digitales, utilizando medios de representación, simbología y vocabulario adecuados, así como los instrumentos y recursos disponibles y valorando la utilidad de las herramientas digitales, para comunicar y difundir información y propuestas.',
        description:
          'Describir, representar e intercambiar ideas o soluciones a problemas tecnológicos o digitales, utilizando medios de representación, simbología y vocabulario adecuados, así como los instrumentos y recursos disponibles y valorando la utilidad de las herramientas digitales, para comunicar y difundir información y propuestas.',
        criteris: {
          eso: [
            '4.1. Representar y comunicar el proceso de creación de un producto desde su diseño hasta su difusión, elaborando documentación técnica y gráfica con la ayuda de herramientas digitales, empleando los formatos y el vocabulario técnico adecuados, de manera colaborativa, tanto presencialmente como en remoto.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Desarrollar algoritmos y aplicaciones informáticas en distintos entornos, aplicando los principios del pensamiento computacional e incorporando las tecnologías emergentes, para crear soluciones a problemas concretos, automatizar procesos y aplicarlos en sistemas de control o en robótica.',
        description:
          'Desarrollar algoritmos y aplicaciones informáticas en distintos entornos, aplicando los principios del pensamiento computacional e incorporando las tecnologías emergentes, para crear soluciones a problemas concretos, automatizar procesos y aplicarlos en sistemas de control o en robótica.',
        criteris: {
          eso: [
            '5.1. Describir, interpretar y diseñar soluciones a problemas informáticos a través de algoritmos y diagramas de flujo, aplicando los elementos y técnicas de programación de manera creativa.',
            '5.2. Programar aplicaciones sencillas para distintos dispositivos (ordenadores, dispositivos móviles y otros) empleando los elementos de programación de manera apropiada y aplicando herramientas de edición, así como módulos de inteligencia artificial que añadan funcionalidades a la solución.',
            '5.3. Automatizar procesos, máquinas y objetos de manera autónoma, con conexión a internet, mediante el análisis, construcción y programación de robots y sistemas de control.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Comprender los fundamentos del funcionamiento de los dispositivos y aplicaciones habituales de su entorno digital de aprendizaje, analizando sus componentes y funciones y ajustándolos a sus necesidades, para hacer un uso más eficiente y seguro de los mismos y para detectar y resolver problemas técnicos sencillos.',
        description:
          'Comprender los fundamentos del funcionamiento de los dispositivos y aplicaciones habituales de su entorno digital de aprendizaje, analizando sus componentes y funciones y ajustándolos a sus necesidades, para hacer un uso más eficiente y seguro de los mismos y para detectar y resolver problemas técnicos sencillos.',
        criteris: {
          eso: [
            '6.1. Usar de manera eficiente y segura los dispositivos digitales de uso cotidiano en la resolución de problemas sencillos que en ellos se pudieran producir, analizando los componentes y los sistemas de comunicación, conociendo los riesgos y adoptando medidas de seguridad para la protección de datos y equipos.',
            '6.2. Crear contenidos, elaborar materiales y difundirlos en distintas plataformas, configurando correctamente las herramientas digitales habituales del entorno de aprendizaje, ajustándolas a sus necesidades y respetando los derechos de autor y la etiqueta digital.',
            '6.3. Organizar la información de manera estructurada, aplicando técnicas de almacenamiento seguro.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Hacer un uso responsable y ético de la tecnología, mostrando interés por un desarrollo sostenible, identificando sus repercusiones y valorando la contribución de las tecnologías emergentes, para identificar las aportaciones y el impacto del desarrollo tecnológico en la sociedad y en el entorno.',
        description:
          'Hacer un uso responsable y ético de la tecnología, mostrando interés por un desarrollo sostenible, identificando sus repercusiones y valorando la contribución de las tecnologías emergentes, para identificar las aportaciones y el impacto del desarrollo tecnológico en la sociedad y en el entorno.',
        criteris: {
          eso: [
            '7.1. Reconocer la influencia de la actividad tecnológica en la sociedad y en la sostenibilidad ambiental a lo largo de su historia, identificando sus aportaciones y repercusiones y valorando su importancia para el desarrollo sostenible.',
            '7.2. Identificar las aportaciones de las tecnologías emergentes al bienestar, a la igualdad social y a la disminución del impacto ambiental, haciendo un uso responsable y ético de dichas tecnologías.',
          ],
        },
      },
    ],
  },
};
