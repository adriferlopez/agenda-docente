// Competencias específicas de las materias OPTATIVAS de la Educación
// Secundaria Obligatoria (ESO) de Castilla-La Mancha, generadas a partir del
// Decreto 82/2022, de 12 de julio, por el que se establece la ordenación y
// el currículo de la Educación Secundaria Obligatoria en la comunidad
// autónoma de Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo II.
//
// Cubre las 17 materias optativas (ver sabersCLM_ESO_OPTATIVAS.ts para el
// detalle del alcance y de las claves de curso usadas por cada una; ver
// competenciesCLM_ESO.ts para las 11 troncales). Igual que en el resto de
// currículums de Castilla-La Mancha ya integrados, el decreto formula cada
// competencia específica (CE) en un único enunciado (sin una versión corta
// y otra larga diferenciadas), por lo que title === description.
import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CLM_ESO_OPTATIVAS: Record<string, AreaCompetencies> = {
  'Artes Escénicas, Danza y Folclore': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Interpretar, mediante técnicas de expresión vocal, corporal y gestual, propuestas artísticas escénicas, dancísticas y de folclore, para desarrollar su formación personal y creativa.',
        description:
          'Interpretar, mediante técnicas de expresión vocal, corporal y gestual, propuestas artísticas escénicas, dancísticas y de folclore, para desarrollar su formación personal y creativa.',
        criteris: {
          eso: [
            '1.1. Utilizar técnicas básicas de expresión vocal, corporal y gestual en la interpretación de propuestas escénicas, dancísticas y de folclore.',
            '1.2. Participar en la interpretación de repertorios adecuados a su nivel, mostrando una actitud abierta y respetuosa.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Crear e improvisar propuestas de expresión escénica, dancística y de folclore, empleando el lenguaje rítmico-musical y corporal, para desarrollar la imaginación y la autoexpresión.',
        description:
          'Crear e improvisar propuestas de expresión escénica, dancística y de folclore, empleando el lenguaje rítmico-musical y corporal, para desarrollar la imaginación y la autoexpresión.',
        criteris: {
          eso: [
            '2.1. Improvisar y crear pequeñas propuestas escénicas o dancísticas de forma individual o colectiva, aplicando técnicas de dramatización y de danza.',
            '2.2. Utilizar herramientas digitales para el ensayo, la creación y la difusión de producciones escénicas.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Escenificar y representar producciones artísticas, asumiendo distintos roles y funciones dentro del trabajo colectivo, para participar activamente en la puesta en escena de un espectáculo.',
        description:
          'Escenificar y representar producciones artísticas, asumiendo distintos roles y funciones dentro del trabajo colectivo, para participar activamente en la puesta en escena de un espectáculo.',
        criteris: {
          eso: [
            '3.1. Asumir roles y funciones dentro de un trabajo colectivo de escenificación, participando activamente en el proceso de ensayo.',
            '3.2. Planificar y evaluar el proceso de ensayo y la puesta en escena final de una producción artística.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Analizar y valorar manifestaciones de las artes escénicas, la danza y el folclore, en especial el propio de Castilla-La Mancha, para reconocer su función social e identitaria.',
        description:
          'Analizar y valorar manifestaciones de las artes escénicas, la danza y el folclore, en especial el propio de Castilla-La Mancha, para reconocer su función social e identitaria.',
        criteris: {
          eso: [
            '4.1. Identificar las características, funciones y tipologías de las artes escénicas y de la danza a lo largo de la historia.',
            '4.2. Reconocer y valorar las manifestaciones del folclore de Castilla-La Mancha, apreciando su valor como seña de identidad cultural.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Compartir y difundir producciones artísticas propias y ajenas, valorando el trabajo en equipo y el resultado del proceso creativo, para desarrollar el respeto y la autoestima.',
        description:
          'Compartir y difundir producciones artísticas propias y ajenas, valorando el trabajo en equipo y el resultado del proceso creativo, para desarrollar el respeto y la autoestima.',
        criteris: {
          eso: [
            '5.1. Presentar y compartir el espectáculo final ante un público, valorando el proceso creativo y el resultado obtenido.',
            '5.2. Valorar el trabajo propio y el de los compañeros y compañeras, mostrando respeto y actitud constructiva.',
          ],
        },
      },
    ],
  },

  'Cultura Científica': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Trasmitir información y datos científicos, interpretándolos y argumentando sobre ellos, mediante diferentes formatos, analizando los conceptos y procesos de las ciencias, para forjar una opinión fundamentada sobre el proceso científico.',
        description:
          'Trasmitir información y datos científicos, interpretándolos y argumentando sobre ellos, mediante diferentes formatos, analizando los conceptos y procesos de las ciencias, para forjar una opinión fundamentada sobre el proceso científico.',
        criteris: {
          eso: [
            '1.1. Analizar conceptos y procesos de las ciencias, interpretando información en diferentes formatos (modelos, gráficos, tablas, diagramas, fórmulas, esquemas, símbolos o páginas web, entre otros) manteniendo una actitud crítica, obteniendo conclusiones y formando opiniones propias fundamentadas.',
            '1.2. Facilitar la comprensión y el análisis, tanto de opiniones propias fundamentadas como de informaciones científicas, transmitiéndolas de forma clara y rigurosa, mediante la terminología y el formato adecuados (modelos, gráficos, tablas, vídeos, informes, diagramas, fórmulas, esquemas, símbolos y contenidos digitales, entre otros).',
            '1.3. Analizar y explicar fenómenos científicos, representándolos mediante el diseño y la realización de modelos y diagramas, utilizando, cuando sea necesario, los pasos del diseño de ingeniería: identificación del problema, exploración, diseño, creación, evaluación y mejora.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Identificar y seleccionar información que proceda de distintas fuentes, contrastando su veracidad, organizándola y evaluándola críticamente, para descubrir la importancia de la precisión y la veracidad de la información científica, su alcance y sus limitaciones.',
        description:
          'Identificar y seleccionar información que proceda de distintas fuentes, contrastando su veracidad, organizándola y evaluándola críticamente, para descubrir la importancia de la precisión y la veracidad de la información científica, su alcance y sus limitaciones.',
        criteris: {
          eso: [
            '2.1. Resolver cuestiones y profundizar en aspectos científicos, localizando, seleccionando, organizando y analizando críticamente la información de distintas fuentes, citándolas con el debido respeto por la propiedad intelectual.',
            '2.2. Contrastar la veracidad de la información disponible, utilizando fuentes fiables, adoptando una actitud crítica y escéptica hacia informaciones sin una base científica, como pseudociencias, teorías conspiratorias, creencias infundadas y bulos, entre otras.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Planificar y desarrollar proyectos de investigación, siguiendo metodologías propias de la ciencia, incluidas, cuando se considere necesario, aquellas basadas en la cooperación, para indagar en aspectos relacionados con las ciencias.',
        description:
          'Planificar y desarrollar proyectos de investigación, siguiendo metodologías propias de la ciencia, incluidas, cuando se considere necesario, aquellas basadas en la cooperación, para indagar en aspectos relacionados con las ciencias.',
        criteris: {
          eso: [
            '3.1. Plantear preguntas e hipótesis sobre fenómenos científicos que puedan ser respondidas o contrastadas y realizar predicciones sobre ellos, utilizando métodos científicos.',
            '3.2. Diseñar, realizar experimentos e interpretar los resultados obtenidos en un proyecto de investigación, utilizando herramientas matemáticas y tecnológicas cuando sea necesario.',
            '3.3. Establecer colaboraciones, que se consideren necesarias y eficaces, en las distintas fases del proyecto científico, valorando la importancia del trabajo cooperativo en la investigación, respetando la diversidad, la igualdad de género y favoreciendo la inclusión.',
            '3.4. Presentar, de forma clara y rigurosa, la información y las conclusiones obtenidas mediante la experimentación y observación de campo, utilizando el formato adecuado (tablas, gráficos, informes, entre otros) y herramientas digitales.',
            '3.5. Valorar tanto la contribución que realiza la ciencia a la sociedad, como la labor de las personas dedicadas a ella, especialmente en Castilla-La Mancha, destacando, además, el papel de la mujer, y entendiendo la investigación científica como una labor colectiva e interdisciplinar en constante evolución, que se ve condicionada por el contexto político y por los recursos económicos que se le dedican.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Utilizar el razonamiento y el pensamiento computacional, analizando críticamente las respuestas y soluciones, incluyendo, si fuera necesario, la reformulación del procedimiento, para resolver problemas o explicar procesos de la vida cotidiana.',
        description:
          'Utilizar el razonamiento y el pensamiento computacional, analizando críticamente las respuestas y soluciones, incluyendo, si fuera necesario, la reformulación del procedimiento, para resolver problemas o explicar procesos de la vida cotidiana.',
        criteris: {
          eso: [
            '4.1. Resolver problemas o explicar procesos científicos, utilizando conocimientos, datos e informaciones aportados, junto con el razonamiento lógico, el pensamiento computacional o recursos digitales.',
            '4.2. Analizar críticamente la solución de problemas sobre fenómenos científicos, prestando especial atención a los que afectan a nuestro entorno de Castilla-La Mancha, cambiando los procedimientos utilizados o las conclusiones extraídas, si dicha solución no fuese viable o se considerase necesario modificarla ante nuevos datos aportados con posterioridad.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Analizar los efectos de determinadas acciones sobre el medio ambiente y la salud, basándose en los fundamentos de las ciencias biológicas y de la tierra, para promover y adoptar hábitos que eviten o minimicen los impactos medioambientales negativos, sean compatibles con un desarrollo sostenible y permitan mantener y mejorar la salud individual y colectiva.',
        description:
          'Analizar los efectos de determinadas acciones sobre el medio ambiente y la salud, basándose en los fundamentos de las ciencias biológicas y de la tierra, para promover y adoptar hábitos que eviten o minimicen los impactos medioambientales negativos, sean compatibles con un desarrollo sostenible y permitan mantener y mejorar la salud individual y colectiva.',
        criteris: {
          eso: [
            '5.1. Identificar los posibles riesgos naturales (pérdidas de biodiversidad, alteraciones del suelo, y fenómenos meteorológicos extremos, entre otros) potenciados por determinadas acciones humanas sobre una zona geográfica, especialmente los que puedan afectar a Castilla-La Mancha, teniendo en cuenta sus características litológicas, relieve y vegetación.',
            '5.2. Conocer los elementos y el funcionamiento básico del sistema inmunitario humano y su aplicación en la prevención y el tratamiento de las enfermedades infecciosas y no infecciosas más frecuentes, identificando algunos de sus indicadores, causas y tratamientos más comunes.',
            '5.3. Proponer y adoptar, hábitos saludables, analizando las acciones propias y ajenas, como pueden ser: la alimentación, la inclusión no discriminatoria, el descanso, la exposición a las pantallas, entre otras, con actitud crítica, desterrando ideas preconcebidas, estereotipos sexistas y basándose en fundamentos de la fisiología.',
          ],
        },
      },
    ],
  },

  'Cultura Clásica': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Valorar el papel de la civilización grecolatina en el origen de la identidad europea, comparando y reconociendo las semejanzas y diferencias entre las culturas, para analizar críticamente el presente.',
        description:
          'Valorar el papel de la civilización grecolatina en el origen de la identidad europea, comparando y reconociendo las semejanzas y diferencias entre las culturas, para analizar críticamente el presente.',
        criteris: {
          '2': [
            '1.1. Conocer las características fundamentales de la cultura grecolatina, relacionando los datos con los referentes actuales.',
            '1.2. Reconocer los aspectos más relevantes de las civilizaciones griega y romana, analizando la importancia del legado clásico en la construcción del mundo moderno.',
            '1.3. Comprender la información más relevante de la civilización clásica, expresada a través de mapas y fuentes escritas, haciendo uso de los medios analógicos y digitales.',
          ],
          '4': [
            '1.1. Conocer las características fundamentales de la cultura grecolatina, relacionando los datos con los referentes actuales.',
            '1.2. Reconocer los aspectos más relevantes de las civilizaciones griega y romana, analizando la importancia del legado clásico en la construcción del mundo moderno.',
            '1.3. Comprender la información más relevante de la civilización clásica, expresada a través de mapas y fuentes escritas, haciendo uso de los medios analógicos y digitales.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Conocer aspectos básicos de etimología y léxico de las lenguas clásicas, comparándolos con las lenguas de enseñanza y con otras lenguas del repertorio individual del alumnado, para apreciar los rasgos comunes de la diversidad lingüística como muestra de riqueza cultural.',
        description:
          'Conocer aspectos básicos de etimología y léxico de las lenguas clásicas, comparándolos con las lenguas de enseñanza y con otras lenguas del repertorio individual del alumnado, para apreciar los rasgos comunes de la diversidad lingüística como muestra de riqueza cultural.',
        criteris: {
          '2': [
            '2.1. Explicar, de manera guiada, la relación de las lenguas clásicas con las lenguas modernas, analizando los elementos lingüísticos comunes de origen grecolatino y utilizando estrategias y conocimientos de las lenguas y lenguajes que conforman el repertorio del alumnado.',
            '2.2. Inferir significados de términos grecolatinos, aplicando los conocimientos léxicos y fonéticos de otras lenguas de su repertorio individual.',
            '2.3. Producir definiciones etimológicas de términos cotidianos, científicos y técnicos, reconociendo los elementos grecolatinos en diferentes contextos lingüísticos.',
          ],
          '4': [
            '2.1. Explicar, de manera guiada, la relación de las lenguas clásicas con las lenguas modernas, analizando los elementos lingüísticos comunes de origen grecolatino y utilizando estrategias y conocimientos tanto de las lenguas como de los lenguajes que conforman el repertorio del alumnado.',
            '2.2. Inferir significados de términos grecolatinos, aplicando los conocimientos léxicos y fonéticos de otras lenguas de su repertorio individual.',
            '2.3. Producir definiciones etimológicas de términos cotidianos, científicos y técnicos, reconociendo los elementos grecolatinos en diferentes contextos lingüísticos y estableciendo relaciones semánticas.',
            '2.4 Ampliar el caudal léxico y mejorar la expresión oral y escrita, incorporando términos de origen griego y latino, de manera coherente.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Conocer las características de los principales mitos grecolatinos, descubriendo su valor simbólico en la interpretación del mundo, para reconocer y valorar su influjo, además de su pervivencia, en los campos artístico, cultural y científico actuales.',
        description:
          'Conocer las características de los principales mitos grecolatinos, descubriendo su valor simbólico en la interpretación del mundo, para reconocer y valorar su influjo, además de su pervivencia, en los campos artístico, cultural y científico actuales.',
        criteris: {
          '2': [
            '3.1. Explicar los elementos de la civilización grecolatina relacionados con la mitología clásica, identificándolos como fuente de inspiración de manifestaciones artísticas.',
            '3.2. Valorar el influjo de los principales mitos grecolatinos y su pervivencia en los campos artístico, cultural y científico actuales.',
          ],
          '4': [
            '3.1. Explicar los elementos de la civilización grecolatina relacionados con la mitología clásica, identificándolos como fuente de inspiración de manifestaciones artísticas.',
            '3.2. Reconocer la pervivencia de la mitología en diversos aspectos de las artes y las ciencias, conociendo a la vez los principales mitos asociados a los dioses, diosas, héroes y heroínas.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Descubrir, conocer y valorar el patrimonio arqueológico, artístico y literario grecorromano, apreciándolo y reconociéndolo como producto de la creación humana y como testimonio de la historia, para identificar sus fuentes de inspiración y conocer los procesos de construcción, preservación, conservación y restauración, así como garantizar su sostenibilidad.',
        description:
          'Descubrir, conocer y valorar el patrimonio arqueológico, artístico y literario grecorromano, apreciándolo y reconociéndolo como producto de la creación humana y como testimonio de la historia, para identificar sus fuentes de inspiración y conocer los procesos de construcción, preservación, conservación y restauración, así como garantizar su sostenibilidad.',
        criteris: {
          '2': [
            '4.1. Reconocer y valorar las huellas del mundo clásico en el patrimonio artístico, cultural y arqueológico del entorno, identificando los procesos de preservación, conservación y restauración como un aspecto fundamental de una ciudadanía comprometida con la sostenibilidad ambiental y el cuidado de su legado.',
          ],
          '4': [
            '4.1. Reconocer las huellas del mundo clásico en el patrimonio artístico, cultural y arqueológico del entorno, identificando los procesos de preservación, conservación y restauración como un aspecto fundamental de una ciudadanía comprometida con la sostenibilidad ambiental y el cuidado de su legado.',
            '4.2. Conocer los yacimientos arqueológicos más importantes de Castilla-La Mancha, reflexionando sobre la importancia de su conservación y participando en procesos encaminados a ello.',
            '4.3. Reflexionar sobre la pervivencia de tópicos y temas de la mitología grecolatina en la literatura, comparando entre géneros y corrientes literarias de diferentes épocas.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Descubrir, conocer y valorar la aportación del mundo grecorromano a la construcción del pensamiento científico y tecnológico, apreciando y reconociendo el papel fundamental de estas civilizaciones para la construcción de las ciencias.',
        description:
          'Descubrir, conocer y valorar la aportación del mundo grecorromano a la construcción del pensamiento científico y tecnológico, apreciando y reconociendo el papel fundamental de estas civilizaciones para la construcción de las ciencias.',
        criteris: {
          '2': [
            '5.1. Seleccionar información proveniente del pensamiento científico y tecnológico grecorromano, contrastándola y organizándola a partir de criterios de validez, calidad y fiabilidad.',
            '5.2. Exponer de forma oral, escrita o multimodal las conclusiones obtenidas a partir de la investigación, individual o colectiva, del legado material e inmaterial de la civilización clásica y su pervivencia en el presente, a través de soportes analógicos y digitales, valorando las aportaciones de dicho legado a nuestra propia civilización.',
          ],
          '4': [
            '5.1. Exponer, de forma oral, escrita o multimodal, las conclusiones obtenidas a partir de la investigación, individual o colectiva, del legado material e inmaterial de la civilización clásica y su pervivencia en el presente, a través de soportes analógicos y digitales, seleccionando información, contrastándola y organizándola, a partir de criterios de validez, calidad y fiabilidad.',
            '5.2. Conocer la aportación de Grecia y Roma, valorando su importancia para el desarrollo tecnológico en la actividad cotidiana.',
          ],
        },
      },
    ],
  },

  'Desarrollo Digital': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Realizar una configuración avanzada del entorno personal digital de aprendizaje, a través de plataformas digitales y entornos virtuales, interactuando con los demás y aprovechando los recursos del ámbito digital, para construir conocimiento de forma colaborativa.',
        description:
          'Realizar una configuración avanzada del entorno personal digital de aprendizaje, a través de plataformas digitales y entornos virtuales, interactuando con los demás y aprovechando los recursos del ámbito digital, para construir conocimiento de forma colaborativa.',
        criteris: {
          eso: [
            '1.1 Identificar los métodos de acceso a un entorno virtual de aprendizaje, utilizando contraseñas seguras y realizando su recuperación, en caso de ser necesario.',
            '1.2 Reconocer las opciones básicas y avanzadas en la configuración del entorno personal digital de aprendizaje, haciendo uso de ellas para acceder a los contenidos y a las tareas, entre otras finalidades.',
            '1.3 Interactuar en el entorno virtual, comunicándose con el resto de usuarios de una forma activa, eficaz y respetuosa.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Seleccionar información y contenidos digitales reutilizables, de forma crítica e informada, atendiendo a criterios de validez, calidad, actualidad y fiabilidad, además de respetando la propiedad intelectual, para desarrollar una ciudadanía digital activa y responsable.',
        description:
          'Seleccionar información y contenidos digitales reutilizables, de forma crítica e informada, atendiendo a criterios de validez, calidad, actualidad y fiabilidad, además de respetando la propiedad intelectual, para desarrollar una ciudadanía digital activa y responsable.',
        criteris: {
          eso: [
            '2.1 Conocer las herramientas que permiten realizar búsquedas en Internet y sus parámetros de configuración, identificando las más adecuadas para obtener diferentes tipos de información y comparando los resultados obtenidos.',
            '2.2 Identificar las diferentes fuentes de información disponibles en Internet, diferenciando las más fiables y seleccionando las que son más útiles.',
            '2.3 Valorar la autenticidad de la información obtenida en Internet, contrastándola con otras fuentes y ofreciendo herramientas que permitan corroborar su veracidad.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Utilizar, con destreza y solvencia, el entorno personal digital de aprendizaje, seleccionando y configurando las herramientas informáticas más adecuadas, en función de las tareas y necesidades de aprendizaje, para crear contenidos digitales y compartirlos.',
        description:
          'Utilizar, con destreza y solvencia, el entorno personal digital de aprendizaje, seleccionando y configurando las herramientas informáticas más adecuadas, en función de las tareas y necesidades de aprendizaje, para crear contenidos digitales y compartirlos.',
        criteris: {
          eso: [
            '3.1 Conocer el uso de las herramientas digitales óptimas que permitan crear contenidos y presentaciones que incluyan, entre otros, textos, imágenes y sonidos, reconociendo los formatos más utilizados.',
            '3.2 Utilizar herramientas que permitan la edición de imágenes, retocando sus parámetros básicos para ajustar su tamaño, calidad y otros defectos.',
            '3.3 Realizar edición básica de vídeos, conociendo y aplicando distintas herramientas y los formatos más utilizados.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Crear aplicaciones informáticas sencillas y soluciones tecnológicas originales y sostenibles, desarrollando algoritmos mediante herramientas digitales, para resolver problemas concretos o responder a retos propuestos.',
        description:
          'Crear aplicaciones informáticas sencillas y soluciones tecnológicas originales y sostenibles, desarrollando algoritmos mediante herramientas digitales, para resolver problemas concretos o responder a retos propuestos.',
        criteris: {
          eso: [
            '4.1 Conocer el entorno de programación y las herramientas visuales disponibles, ofreciendo las opciones necesarias para crear un programa y ejecutarlo.',
            '4.2 Identificar el orden en el que se ejecuta un programa, comprendiendo las instrucciones condicionales y repetitivas que permiten cambiar dicho orden.',
            '4.3 Diseñar programas sencillos que resuelvan tareas simples, desarrollando estrategias de colaboración para el trabajo en equipo y comparando diferentes soluciones para un mismo problema.',
          ],
        },
      },
    ],
  },

  Digitalización: {
    competencies: [
      {
        id: 'CE1',
        title:
          'Identificar y resolver problemas técnicos sencillos, conectar y configurar dispositivos a redes domésticas, aplicando los conocimientos de hardware y sistemas operativos para gestionar las herramientas e instalaciones informáticas y de comunicación de uso cotidiano.',
        description:
          'Identificar y resolver problemas técnicos sencillos, conectar y configurar dispositivos a redes domésticas, aplicando los conocimientos de hardware y sistemas operativos para gestionar las herramientas e instalaciones informáticas y de comunicación de uso cotidiano.',
        criteris: {
          eso: [
            '1.1. Conectar dispositivos y gestionar redes locales aplicando los conocimientos y procesos asociados a sistemas de comunicación alámbrica e inalámbrica con una actitud proactiva.',
            '1.2. Instalar y mantener sistemas operativos configurando sus características en función de sus necesidades personales.',
            '1.3. Identificar y resolver problemas técnicos sencillos analizando componentes y funciones de los dispositivos digitales, evaluando las soluciones de manera crítica y reformulando el procedimiento, en caso necesario.',
            '1.4. Instalar y eliminar software de propósito general, conociendo los diferentes niveles de privilegios que ofrece el sistema operativo a los usuarios y valorando la idoneidad del mismo.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Configurar el entorno personal de aprendizaje interactuando y aprovechando los recursos del ámbito digital para optimizar y gestionar el aprendizaje permanente.',
        description:
          'Configurar el entorno personal de aprendizaje interactuando y aprovechando los recursos del ámbito digital para optimizar y gestionar el aprendizaje permanente.',
        criteris: {
          eso: [
            '2.1. Gestionar el aprendizaje en el ámbito digital, configurando el entorno personal de aprendizaje mediante la integración de recursos digitales de manera autónoma.',
            '2.2. Buscar, seleccionar y archivar información en función de sus necesidades haciendo uso de las herramientas del entorno personal de aprendizaje con sentido crítico y siguiendo normas básicas de seguridad en la red.',
            '2.3. Crear, programar, integrar y reelaborar contenidos digitales de forma individual o colectiva, seleccionando las herramientas más apropiadas para generar nuevo conocimiento y contenidos digitales de manera creativa, respetando los derechos de autor y licencias de uso.',
            '2.4. Interactuar en espacios virtuales de comunicación y plataformas de aprendizaje colaborativo, compartiendo y publicando información y datos, adaptándose a diferentes audiencias con una actitud participativa y respetuosa.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Desarrollar hábitos que fomenten el bienestar digital, aplicando medidas preventivas y correctivas, para proteger dispositivos, datos personales y la propia salud.',
        description:
          'Desarrollar hábitos que fomenten el bienestar digital, aplicando medidas preventivas y correctivas, para proteger dispositivos, datos personales y la propia salud.',
        criteris: {
          eso: [
            '3.1. Proteger los datos personales y la huella digital generada en internet, configurando las condiciones de privacidad de las redes sociales y espacios virtuales de trabajo.',
            '3.2. Configurar y actualizar contraseñas, sistemas operativos y antivirus de forma periódica en los distintos dispositivos digitales de uso habitual.',
            '3.3. Identificar y saber reaccionar ante situaciones que representan una amenaza en la red, escogiendo la mejor solución entre diversas opciones, desarrollando prácticas saludables y seguras, y valorando el bienestar físico y mental, tanto personal como colectivo.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Ejercer una ciudadanía digital crítica, conociendo las posibles acciones que realizar en la red, e identificando sus repercusiones, para hacer un uso activo, responsable y ético de la tecnología.',
        description:
          'Ejercer una ciudadanía digital crítica, conociendo las posibles acciones que realizar en la red, e identificando sus repercusiones, para hacer un uso activo, responsable y ético de la tecnología.',
        criteris: {
          eso: [
            '4.1. Hacer un uso ético de los datos y las herramientas digitales, aplicando las normas de etiqueta digital y respetando la privacidad y las licencias de uso y propiedad intelectual en la comunicación, colaboración y participación activa en la red.',
            '4.2. Reconocer las aportaciones de las tecnologías digitales en las gestiones administrativas y el comercio electrónico, siendo consciente de la brecha social de acceso, uso y aprovechamiento de dichas tecnologías para diversos colectivos.',
            '4.3. Valorar la importancia de la oportunidad, facilidad y libertad de expresión que suponen los medios digitales conectados, analizando de forma crítica los mensajes que se reciben y transmiten teniendo en cuenta su objetividad, ideología, intencionalidad, sesgos y caducidad.',
            '4.4. Analizar la necesidad y los beneficios globales de un uso y desarrollo ecosocialmente responsable de las tecnologías digitales, teniendo en cuenta criterios de accesibilidad, sostenibilidad e impacto.',
            '4.5. Utilizar estrategias de colaboración para la resolución de problemas sencillos, fomentando el trabajo en equipo y promoviendo el respeto y las buenas prácticas en el desarrollo de proyectos.',
            '4.6. Conocer los principios del software libre y sus implicaciones éticas en el desarrollo de programas informáticos, analizando distintos tipos de licencias libres.',
          ],
        },
      },
    ],
  },

  'Economía y Emprendimiento': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Analizar y valorar las fortalezas y debilidades propias y de los demás, reflexionando sobre las aptitudes y gestionando de forma eficaz las emociones y las destrezas necesarias, para adaptarse a entornos cambiantes y diseñar un proyecto personal que genere valor para los demás.',
        description:
          'Analizar y valorar las fortalezas y debilidades propias y de los demás, reflexionando sobre las aptitudes y gestionando de forma eficaz las emociones y las destrezas necesarias, para adaptarse a entornos cambiantes y diseñar un proyecto personal que genere valor para los demás.',
        criteris: {
          eso: [
            '1.1. Adaptarse a entornos complejos y crear un proyecto personal original y generador de valor, partiendo de la valoración crítica sobre las propias aptitudes y las posibilidades creativas, haciendo hincapié en las fortalezas y debilidades y logrando progresivamente el control consciente de las emociones.',
            '1.2. Utilizar estrategias de análisis razonado de las fortalezas y debilidades personales y de la iniciativa y creatividad propia y de los demás.',
            '1.3. Gestionar de forma eficaz las emociones y destrezas personales, promoviendo y desarrollando actitudes creativas.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Utilizar estrategias de conformación de equipos, así como habilidades sociales, de comunicación e innovación ágil, aplicándolas con autonomía y motivación a las dinámicas de trabajo en distintos contextos, para constituir equipos eficaces y descubrir el valor de cooperar con otras personas durante el proceso de ideación y desarrollo de soluciones emprendedoras.',
        description:
          'Utilizar estrategias de conformación de equipos, así como habilidades sociales, de comunicación e innovación ágil, aplicándolas con autonomía y motivación a las dinámicas de trabajo en distintos contextos, para constituir equipos eficaces y descubrir el valor de cooperar con otras personas durante el proceso de ideación y desarrollo de soluciones emprendedoras.',
        criteris: {
          eso: [
            '2.1. Constituir equipos de trabajo basados en principios de equidad, coeducación e igualdad entre hombres y mujeres, actitud participativa y visualización de metas comunes, utilizando estrategias que faciliten la identificación y optimización de los recursos humanos necesarios que conduzcan a la consecución del reto propuesto.',
            '2.2. Poner en práctica habilidades sociales, de comunicación abierta, de motivación, de liderazgo y de cooperación e innovación ágil tanto de manera presencial como a distancia en distintos contextos de trabajo en equipo.',
            '2.3. Valorar y respetar las aportaciones de los demás en las distintas dinámicas de trabajo y fases del proceso llevado a cabo, respetando las decisiones tomadas de forma colectiva.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Elaborar, con sentido ético y solidario, ideas y soluciones innovadoras y sostenibles que den respuesta a las necesidades locales y globales detectadas, utilizando metodologías ágiles de ideación y analizando tanto sus puntos fuertes y débiles como el impacto que puedan generar esas ideas en el entorno, para lograr la superación de retos relacionados con la preservación y cuidado del medio natural, social, cultural y artístico.',
        description:
          'Elaborar, con sentido ético y solidario, ideas y soluciones innovadoras y sostenibles que den respuesta a las necesidades locales y globales detectadas, utilizando metodologías ágiles de ideación y analizando tanto sus puntos fuertes y débiles como el impacto que puedan generar esas ideas en el entorno, para lograr la superación de retos relacionados con la preservación y cuidado del medio natural, social, cultural y artístico.',
        criteris: {
          eso: [
            '3.1. Preservar y cuidar el medio natural, social, cultural y artístico a partir de propuestas y actuaciones locales y globales que promuevan el desarrollo sostenible con visión creativa, emprendedora y comprometida.',
            '3.2. Superar los retos propuestos a partir de ideas y soluciones innovadoras y sostenibles, evaluando sus ventajas e inconvenientes, así como el impacto que pudieran generar a nivel personal y en el contexto al que van dirigidas.',
            '3.3. Aplicar metodologías ágiles siguiendo los criterios y pautas establecidos en el proceso de construcción de ideas creativas y sostenibles que faciliten la superación de los retos planteados y la obtención de soluciones a las necesidades detectadas con sentido ético y solidario.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Seleccionar y reunir los recursos disponibles en el proceso de desarrollo de la idea o solución creativa propuesta, conociendo los medios de producción y las fuentes financieras que proporcionan dichos recursos y aplicando estrategias de captación de los mismos, incluida la financiación pública regional y local, para poner en marcha el proyecto que lleve a la realidad la solución emprendedora.',
        description:
          'Seleccionar y reunir los recursos disponibles en el proceso de desarrollo de la idea o solución creativa propuesta, conociendo los medios de producción y las fuentes financieras que proporcionan dichos recursos y aplicando estrategias de captación de los mismos, incluida la financiación pública regional y local, para poner en marcha el proyecto que lleve a la realidad la solución emprendedora.',
        criteris: {
          eso: [
            '4.1. Poner en marcha un proyecto que lleve a la realidad una solución emprendedora, seleccionando y reuniendo los recursos materiales, inmateriales y digitales disponibles en el proceso de ideación creativa.',
            '4.2. Utilizar con autonomía estrategias de captación y gestión de recursos conociendo sus características y aplicándolas al proceso de conversión de las ideas y soluciones en acciones.',
            '4.3. Reunir, analizar y seleccionar con criterios propios los recursos disponibles, planificando con coherencia su organización, distribución, uso y optimización.',
            '4.4. Conocer los programas públicos, regionales y locales, de fomento de la figura emprendedora, tomando contacto con las entidades responsables.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Presentar y exponer ideas y soluciones creativas, utilizando estrategias comunicativas ágiles y valorando la importancia de una comunicación efectiva y respetuosa, para transmitir mensajes convincentes adecuados al contexto y a los objetivos concretos de cada situación y validar las ideas y soluciones presentadas.',
        description:
          'Presentar y exponer ideas y soluciones creativas, utilizando estrategias comunicativas ágiles y valorando la importancia de una comunicación efectiva y respetuosa, para transmitir mensajes convincentes adecuados al contexto y a los objetivos concretos de cada situación y validar las ideas y soluciones presentadas.',
        criteris: {
          eso: [
            '5.1. Validar las ideas y soluciones presentadas mediante mensajes convincentes y adecuados al contexto y a objetivos concretos, utilizando estrategias comunicativas ágiles adecuadas a cada situación comunicativa.',
            '5.2. Presentar y exponer con claridad y coherencia las ideas y soluciones creativas, valorando la importancia de mantener una comunicación eficaz y respetuosa a lo largo de todo el proceso.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Comprender aspectos básicos de la economía y las finanzas, valorando críticamente el problema de la escasez de recursos y la necesidad de elegir, así como los principios de interacción social desde el punto de vista económico, para relacionar dichos aspectos con la búsqueda y planificación de los recursos necesarios en el desarrollo de la idea o solución emprendedora que afronte el reto planteado de manera eficiente, equitativa y sostenible.',
        description:
          'Comprender aspectos básicos de la economía y las finanzas, valorando críticamente el problema de la escasez de recursos y la necesidad de elegir, así como los principios de interacción social desde el punto de vista económico, para relacionar dichos aspectos con la búsqueda y planificación de los recursos necesarios en el desarrollo de la idea o solución emprendedora que afronte el reto planteado de manera eficiente, equitativa y sostenible.',
        criteris: {
          eso: [
            '6.1. Desarrollar una idea o solución emprendedora a partir de los conocimientos, destrezas y actitudes adquiridos desde el ámbito de la economía y las finanzas, viendo la relación entre estos y los recursos necesarios y disponibles que permiten su desarrollo.',
            '6.2. Conocer de manera amplia y comprender con precisión los conocimientos, destrezas y actitudes necesarios del ámbito económico y financiero, teniendo en cuenta la singularidad de nuestra comunidad autónoma, aplicándolos con coherencia a situaciones, actividades o proyectos concretos.',
            '6.3. Afrontar los retos de manera eficaz, equitativa y sostenible, en distintos contextos y situaciones, reales o simuladas, transfiriendo los saberes económicos y financieros necesarios.',
            '6.4. Valorar críticamente el problema económico de la escasez de recursos y la necesidad de elegir, así como los principios de interacción social desde el punto de vista económico, aprovechando este conocimiento en el afrontamiento eficaz de retos.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Construir y analizar de manera cooperativa, autónoma y ágil prototipos innovadores y sostenibles, aplicando estrategias eficaces de diseño y ejecución, evaluando todas las fases del proceso de manera crítica y ética y validando los resultados obtenidos, para mejorar y perfeccionar los prototipos creados y para contribuir al aprendizaje y el desarrollo personal y colectivo, teniendo como referencia las experiencias habidas en el entorno regional y local.',
        description:
          'Construir y analizar de manera cooperativa, autónoma y ágil prototipos innovadores y sostenibles, aplicando estrategias eficaces de diseño y ejecución, evaluando todas las fases del proceso de manera crítica y ética y validando los resultados obtenidos, para mejorar y perfeccionar los prototipos creados y para contribuir al aprendizaje y el desarrollo personal y colectivo, teniendo como referencia las experiencias habidas en el entorno regional y local.',
        criteris: {
          eso: [
            '7.1. Valorar la contribución del prototipo final tanto al aprendizaje como al desarrollo personal y colectivo evaluando de manera crítica y ética todas las fases del proceso llevado a cabo, así como la adecuación de las estrategias empleadas en la construcción del mismo.',
            '7.2. Analizar de manera crítica el proceso de diseño y ejecución llevado a cabo en la realización de los prototipos creados, estableciendo comparaciones entre la efectividad, la viabilidad y la adecuación lograda en los procesos y los resultados obtenidos.',
            '7.3. Utilizar estrategias eficaces de diseño y ejecución seleccionando aquellas que faciliten la construcción del prototipo final de manera ágil, cooperativa y autónoma, así como aprender de las experiencias de éxito, habidas en el entorno local y regional.',
          ],
        },
      },
    ],
  },

  'Emprendimiento, Sostenibilidad y Consumo Responsable': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Analizar y desarrollar las cualidades individuales y sociales del alumnado que impulsan la iniciativa emprendedora, favoreciendo el trabajo cooperativo y la toma de decisiones, para desarrollar aptitudes y habilidades esenciales, que les permitan encontrar nuevas oportunidades, en el entorno social y económico más próximo.',
        description:
          'Analizar y desarrollar las cualidades individuales y sociales del alumnado que impulsan la iniciativa emprendedora, favoreciendo el trabajo cooperativo y la toma de decisiones, para desarrollar aptitudes y habilidades esenciales, que les permitan encontrar nuevas oportunidades, en el entorno social y económico más próximo.',
        criteris: {
          eso: [
            '1.1. Entender y reconocer las cualidades personales y sociales del emprendedor, desarrollando, a partir de su identificación, las propias capacidades emprendedoras.',
            '1.2. Desarrollar aptitudes de trabajo en equipo, así como las habilidades sociales y emocionales necesarias para la realización de proyectos de emprendimiento y búsqueda de oportunidades.',
            '1.3. Aprender a trabajar, en la realidad económica y social de Castilla-La Mancha, de forma proactiva, anticipándose a los riesgos y buscando las oportunidades.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Desarrollar la creatividad del alumnado y valorar el papel del emprendimiento como elemento que favorece el desarrollo social y económico, utilizando instrumentos innovadores en entornos de aprendizaje, para promover iniciativas emprendedoras sociales y económicas.',
        description:
          'Desarrollar la creatividad del alumnado y valorar el papel del emprendimiento como elemento que favorece el desarrollo social y económico, utilizando instrumentos innovadores en entornos de aprendizaje, para promover iniciativas emprendedoras sociales y económicas.',
        criteris: {
          eso: [
            '2.1. Comprender la dimensión social del emprendimiento, analizando su repercusión en el desarrollo de nuestro entorno, a través del estudio de las experiencias que existen en nuestra región.',
            '2.2. Trabajar la creatividad y la innovación como valores fundamentales del emprendimiento, conociendo formas de emprender a partir de técnicas variadas, como la gamificación.',
            '2.3. Valorar la utilidad social y económica de proyectos de emprendimiento, teniendo en cuenta las necesidades sociales, a partir de la experimentación dentro del aula.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Utilizar las estrategias y acciones, tanto individuales como grupales y sociales, necesarias para alcanzar los denominados Objetivos de Desarrollo Sostenible, fomentando la toma de decisiones de ahorro responsable en una sociedad en que las relaciones laborales se encuentran en proceso de cambio, para construir un modelo social basado en la sostenibilidad y la igualdad laboral y salarial.',
        description:
          'Utilizar las estrategias y acciones, tanto individuales como grupales y sociales, necesarias para alcanzar los denominados Objetivos de Desarrollo Sostenible, fomentando la toma de decisiones de ahorro responsable en una sociedad en que las relaciones laborales se encuentran en proceso de cambio, para construir un modelo social basado en la sostenibilidad y la igualdad laboral y salarial.',
        criteris: {
          eso: [
            '3.1. Valorar la importancia de los Objetivos de Desarrollo Sostenible para el conjunto de la sociedad, analizando, entre otras, las actuaciones que se llevan a cabo desde nuestra comunidad autónoma.',
            '3.2. Desarrollar estrategias y acciones que fomenten el avance hacia modelos sostenibles e igualitarios, que eliminen, por ejemplo, brechas salariales, analizando los derechos de las personas trabajadoras, especialmente dentro de nuestra comunidad autónoma.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Reconocer el impacto social y medioambiental de la actividad económica, valorando la necesidad de establecer nuevas relaciones de trabajo y producción, dentro del marco de las políticas públicas, para tomar conciencia del proceso de transición ecológica.',
        description:
          'Reconocer el impacto social y medioambiental de la actividad económica, valorando la necesidad de establecer nuevas relaciones de trabajo y producción, dentro del marco de las políticas públicas, para tomar conciencia del proceso de transición ecológica.',
        criteris: {
          eso: [
            '4.1. Reflexionar sobre las desigualdades que aparecen en las actividades económicas, empleando un espíritu crítico y constructivo.',
            '4.2. Aplicar técnicas de emprendimiento y creatividad, proponiendo la puesta en marcha de un proyecto local de economía circular, haciendo uso de técnicas innovadoras en el aula.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Valorar la necesidad de un consumo responsable que desencadene el correspondiente cambio en las formas de producción, desarrollando, simultáneamente, un pensamiento crítico y analítico sobre la repercusión de nuestras actividades cotidianas, para reforzar la conciencia de ciudadanía global.',
        description:
          'Valorar la necesidad de un consumo responsable que desencadene el correspondiente cambio en las formas de producción, desarrollando, simultáneamente, un pensamiento crítico y analítico sobre la repercusión de nuestras actividades cotidianas, para reforzar la conciencia de ciudadanía global.',
        criteris: {
          eso: [
            '5.1. Valorar positivamente el consumo responsable como una herramienta para atajar el cambio climático y la desigualdad social, promoviendo actitudes socialmente responsables, mediante su implementación, tanto en entornos cercanos, como en otros simulados.',
            '5.2. Reconocer la importancia del desarrollo de políticas públicas para la mejora de nuestra sociedad de consumo, analizando su repercusión nacional, regional y local.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Producir e interpretar documentos cotidianos, relacionados con actos de consumo, trabajo y negocios, comprendiéndolos y empleándolos adecuadamente, para poder considerarlos en la toma de decisiones racionales, necesarias en nuestra sociedad, así como para dirigirse adecuadamente a las administraciones públicas y a las que velan por los derechos de los consumidores.',
        description:
          'Producir e interpretar documentos cotidianos, relacionados con actos de consumo, trabajo y negocios, comprendiéndolos y empleándolos adecuadamente, para poder considerarlos en la toma de decisiones racionales, necesarias en nuestra sociedad, así como para dirigirse adecuadamente a las administraciones públicas y a las que velan por los derechos de los consumidores.',
        criteris: {
          eso: [
            '6.1. Comprender la importancia del respeto a los derechos de los consumidores, identificando las distintas posibilidades de preservarlos y conociendo la posibilidad de recurrir a las organizaciones que, en los distintos ámbitos, desde el local al internacional, velan por la preservación de dichos derechos y pueden prestar asistencia ante una vulneración de los mismos.',
            '6.2. Conocer y manejar documentos relacionados con operaciones habituales de consumo, trabajo y negocios, así como comprender los trámites habituales en las relaciones con las administraciones públicas, cumplimentándolos y tramitándolos, tanto de forma manual como telemática.',
          ],
        },
      },
    ],
  },

  'Expresión Artística': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Analizar manifestaciones artísticas, contextualizándolas, describiendo sus aspectos esenciales y valorando el proceso de creación y el resultado final, para educar la mirada, alimentar el imaginario, reforzar la confianza y ampliar las posibilidades de disfrute del patrimonio cultural y artístico.',
        description:
          'Analizar manifestaciones artísticas, contextualizándolas, describiendo sus aspectos esenciales y valorando el proceso de creación y el resultado final, para educar la mirada, alimentar el imaginario, reforzar la confianza y ampliar las posibilidades de disfrute del patrimonio cultural y artístico.',
        criteris: {
          eso: [
            '1.1. Analizar manifestaciones artísticas de diferentes épocas y culturas, contextualizándolas, describiendo sus aspectos esenciales, valorando el proceso de creación y el resultado final, y evidenciando una actitud de apertura, interés y respeto en su recepción.',
            '1.2 Valorar críticamente los hábitos, los gustos y los referentes artísticos de diferentes épocas y culturas, reflexionando sobre su evolución y sobre su relación con los del presente.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Explorar las posibilidades expresivas de diferentes técnicas gráfico-plásticas, empleando distintos medios, soportes, herramientas y lenguajes, para incorporarlas al repertorio personal de recursos y desarrollar el criterio de selección de las más adecuadas a cada necesidad o intención.',
        description:
          'Explorar las posibilidades expresivas de diferentes técnicas gráfico-plásticas, empleando distintos medios, soportes, herramientas y lenguajes, para incorporarlas al repertorio personal de recursos y desarrollar el criterio de selección de las más adecuadas a cada necesidad o intención.',
        criteris: {
          eso: [
            '2.1 Participar, con iniciativa, confianza y creatividad, en la exploración de diferentes técnicas gráfico-plásticas, empleando herramientas, medios, soportes y lenguajes.',
            '2.2 Elaborar producciones gráfico-plásticas de forma creativa, determinando las intenciones expresivas y seleccionando con corrección las herramientas, medios, soportes y lenguajes más adecuados de entre los que conforman el repertorio personal de recursos.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Explorar las posibilidades expresivas de diferentes medios, técnicas y formatos audiovisuales, decodificando sus lenguajes, identificando las herramientas y distinguiendo sus fines, para incorporarlos al repertorio personal de recursos y desarrollar el criterio de selección de los más adecuados a cada necesidad o intención.',
        description:
          'Explorar las posibilidades expresivas de diferentes medios, técnicas y formatos audiovisuales, decodificando sus lenguajes, identificando las herramientas y distinguiendo sus fines, para incorporarlos al repertorio personal de recursos y desarrollar el criterio de selección de los más adecuados a cada necesidad o intención.',
        criteris: {
          eso: [
            '3.1 Participar, con iniciativa, confianza y creatividad, en la exploración de diferentes medios, técnicas y formatos audiovisuales, decodificando sus lenguajes, identificando las herramientas y distinguiendo sus fines.',
            '3.2 Realizar producciones audiovisuales, individuales o colaborativas, asumiendo diferentes funciones; incorporando el uso de las tecnologías digitales con una intención expresiva; buscando un resultado final ajustado al proyecto preparado previamente; y seleccionando y empleando, con corrección y de forma creativa, las herramientas y medios disponibles más adecuados.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Crear producciones artísticas, individuales o grupales, realizadas con diferentes técnicas y herramientas, incluido el propio cuerpo, a partir de un motivo o intención previos, adaptando el diseño y el proceso a las necesidades e indicaciones de realización y teniendo en cuenta las características del público destinatario, para compartirlas y valorar las oportunidades de desarrollo personal, social, académico o profesional que pueden derivarse de esta actividad.',
        description:
          'Crear producciones artísticas, individuales o grupales, realizadas con diferentes técnicas y herramientas, incluido el propio cuerpo, a partir de un motivo o intención previos, adaptando el diseño y el proceso a las necesidades e indicaciones de realización y teniendo en cuenta las características del público destinatario, para compartirlas y valorar las oportunidades de desarrollo personal, social, académico o profesional que pueden derivarse de esta actividad.',
        criteris: {
          eso: [
            '4.1 Crear un producto artístico individual o grupal, de forma colaborativa y abierta, diseñando las fases del proceso y seleccionando las técnicas y herramientas más adecuadas para conseguir un resultado adaptado a una intención y a un público determinados.',
            '4.2 Exponer el resultado final de la creación de un producto artístico, individual o grupal, poniendo en común y valorando críticamente el desarrollo de su elaboración, las dificultades encontradas, los progresos realizados y los logros alcanzados.',
            '4.3 Identificar oportunidades de desarrollo personal, social, académico o profesional relacionadas con el ámbito artístico, comprendiendo su valor añadido y expresando la opinión personal de forma razonada y respetuosa.',
          ],
        },
      },
    ],
  },

  Filosofía: {
    competencies: [
      {
        id: 'CE1',
        title:
          'Buscar, analizar, producir y transmitir información relativa a cuestiones filosóficas, a partir del empleo contrastado y seguro de fuentes y de procedimientos elementales de investigación y comunicación, para desarrollar una actitud indagadora, autónoma y creativa en el ámbito de la reflexión filosófica.',
        description:
          'Buscar, analizar, producir y transmitir información relativa a cuestiones filosóficas, a partir del empleo contrastado y seguro de fuentes y de procedimientos elementales de investigación y comunicación, para desarrollar una actitud indagadora, autónoma y creativa en el ámbito de la reflexión filosófica.',
        criteris: {
          eso: [
            '1.1. Demostrar un conocimiento práctico de los procedimientos elementales de la investigación filosófica, a través de la identificación de fuentes fiables, la búsqueda eficiente y segura de información, tanto digitalmente como a través de medios más tradicionales.',
            '1.2. Desarrollar una actitud indagadora, autónoma y activa en el ámbito de la reflexión filosófica, mediante el diseño y elaboración de trabajos de investigación, disertaciones, dilemas morales, comentarios de texto u otros.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Identificar problemas y formular preguntas acerca de la naturaleza humana, del sentido de la realidad y de la existencia, a partir del análisis e interpretación de textos y otras formas de expresión filosófica y cultural, así como la necesidad de afrontarlas, para desarrollar una vida reflexiva y consciente.',
        description:
          'Identificar problemas y formular preguntas acerca de la naturaleza humana, del sentido de la realidad y de la existencia, a partir del análisis e interpretación de textos y otras formas de expresión filosófica y cultural, así como la necesidad de afrontarlas, para desarrollar una vida reflexiva y consciente.',
        criteris: {
          eso: [
            '2.1. Reconocer la radicalidad y trascendencia de los problemas filosóficos, mediante la formulación, reconocimiento y análisis de los mismos, a través del trabajo con textos y otros medios de expresión, tanto filosófica como literaria, histórica, científica, artística o de cualquier otro ámbito cultural.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Reconocer, usar y valorar las normas y pautas de la argumentación y del diálogo filosóficos, mediante la identificación, análisis y aplicación de las mismas, con rigor y en distintos soportes, tanto en la construcción y exposición de argumentos como en el ejercicio del diálogo con los demás, para evitar dogmatismos, falacias y sesgos cognitivos.',
        description:
          'Reconocer, usar y valorar las normas y pautas de la argumentación y del diálogo filosóficos, mediante la identificación, análisis y aplicación de las mismas, con rigor y en distintos soportes, tanto en la construcción y exposición de argumentos como en el ejercicio del diálogo con los demás, para evitar dogmatismos, falacias y sesgos cognitivos.',
        criteris: {
          eso: [
            '3.1. Construir argumentos, orales y escritos, acerca de problemas filosóficos de nuestro tiempo, mediante el uso de normas lógicas y argumentativas.',
            '3.2. Reconocer y evitar dogmatismos, falacias y sesgos como contenidos de opiniones, ideas y creencias, comprendiendo la naturaleza de los mismos.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Practicar el ejercicio del diálogo filosófico de manera crítica, tolerante y empática, interiorizando las pautas éticas y formales que este requiere, mediante la participación en actividades grupales y a través del planteamiento dialógico de las cuestiones filosóficas, para promover el contraste e intercambio de ideas y el ejercicio de una ciudadanía activa y democrática.',
        description:
          'Practicar el ejercicio del diálogo filosófico de manera crítica, tolerante y empática, interiorizando las pautas éticas y formales que este requiere, mediante la participación en actividades grupales y a través del planteamiento dialógico de las cuestiones filosóficas, para promover el contraste e intercambio de ideas y el ejercicio de una ciudadanía activa y democrática.',
        criteris: {
          eso: [
            '4.1. Reconocer la importancia de la cooperación, el compromiso con la verdad, el respeto a la pluralidad, la diversidad y el rechazo de toda actitud discriminatoria o arbitraria, en la práctica argumentativa y el diálogo con los demás, analizando conflictos actuales que afectan a la realidad de nuestro tiempo y discriminando las falacias y errores argumentativos en las informaciones de los medios de comunicación.',
            '4.2. Promover el contraste e intercambio de ideas y el ejercicio de una ciudadanía activa y democrática, participando en actividades grupales y del diálogo racional, respetuoso, abierto y constructivo, acerca de cuestiones y problemas filosóficos actuales.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Adquirir una perspectiva interdisciplinar y global, más allá de la cosmovisión occidental, en el planteamiento de problemas éticos y políticos de actualidad, analizando sus múltiples aspectos, desde la perspectiva fundamental de la filosofía, para poder tratar cuestiones complejas, de modo crítico, creativo y transformador, y desarrollar la autonomía de juicio, además de promover actitudes y acciones, cívica y éticamente, consecuentes.',
        description:
          'Adquirir una perspectiva interdisciplinar y global, más allá de la cosmovisión occidental, en el planteamiento de problemas éticos y políticos de actualidad, analizando sus múltiples aspectos, desde la perspectiva fundamental de la filosofía, para poder tratar cuestiones complejas, de modo crítico, creativo y transformador, y desarrollar la autonomía de juicio, además de promover actitudes y acciones, cívica y éticamente, consecuentes.',
        criteris: {
          eso: [
            '5.1. Afrontar temas complejos de carácter fundamental y de actualidad ética y política, de modo interdisciplinar y transformador, utilizando conceptos e ideas desde una perspectiva filosófica crítica.',
            '5.2. Desarrollar el propio juicio y la autonomía moral mediante el análisis filosófico de problemas éticos y políticos fundamentales y de actualidad, argumentando, exponiendo y sometiendo al diálogo con los demás las propias tesis al respecto.',
          ],
        },
      },
    ],
  },

  'Formación y Orientación Personal y Profesional': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Comprender los procesos físicos y psicológicos implicados en la cognición, la motivación y el aprendizaje, analizando sus implicaciones en la conducta y desarrollando estrategias de gestión emocional y del propio proceso de aprendizaje, para mejorar el desempeño en el ámbito personal, social y académico y lograr mayor control sobre las acciones y sus consecuencias.',
        description:
          'Comprender los procesos físicos y psicológicos implicados en la cognición, la motivación y el aprendizaje, analizando sus implicaciones en la conducta y desarrollando estrategias de gestión emocional y del propio proceso de aprendizaje, para mejorar el desempeño en el ámbito personal, social y académico y lograr mayor control sobre las acciones y sus consecuencias.',
        criteris: {
          eso: [
            '1.1 Mejorar el desempeño personal, social y académico aplicando estrategias de aprendizaje y gestión emocional que permitan mayor control sobre las acciones y sus consecuencias.',
            '1.2 Identificar y aplicar los procesos que intervienen en el aprendizaje, analizando sus implicaciones y desarrollando estrategias que favorezcan la adquisición de conocimientos, destrezas y actitudes.',
            '1.3 Analizar la importancia del componente emocional, tomando conciencia de su repercusión en el aprendizaje y desarrollando estrategias que lo mejoren.',
            '1.4 Analizar la relación de la cognición, la motivación, el aprendizaje y la gestión emocional con la conducta, tanto propia como de los demás, a partir de las bases teóricas fundamentales de los procesos físicos y psicológicos que intervienen en ellos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Comprender las principales características del desarrollo evolutivo de la persona, analizando aquellos elementos de la madurez que condicionan los comportamientos e identificando las cualidades personales y de relación social propias y de los demás, para potenciar las que favorecen la autonomía y permiten afrontar de forma eficaz los nuevos retos.',
        description:
          'Comprender las principales características del desarrollo evolutivo de la persona, analizando aquellos elementos de la madurez que condicionan los comportamientos e identificando las cualidades personales y de relación social propias y de los demás, para potenciar las que favorecen la autonomía y permiten afrontar de forma eficaz los nuevos retos.',
        criteris: {
          eso: [
            '2.1 Afrontar nuevos retos, de forma eficaz y con progresiva autonomía, identificando las cualidades personales y sociales propias y de los demás y analizando los elementos que condicionan los comportamientos y actuaciones en el proceso de desarrollo evolutivo.',
            '2.2 Conocer el desarrollo evolutivo de las personas, analizando y comprendiendo las principales características de la madurez que van conformando a la persona en distintos planos: físico, cognitivo, social, emocional y sexual.',
            '2.3 Identificar cualidades personales y de los demás, reflexionando sobre la importancia de potenciar aquellas que permitan afrontar eficazmente los retos y faciliten el proceso de transición de la adolescencia a la edad adulta.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Conocer y comprender al ser humano, sus sociedades y culturas, analizando con empatía su diversidad y complejidad desde diferentes perspectivas, para fomentar el espíritu crítico sobre aspectos que dirigen el funcionamiento humano, social y cultural.',
        description:
          'Conocer y comprender al ser humano, sus sociedades y culturas, analizando con empatía su diversidad y complejidad desde diferentes perspectivas, para fomentar el espíritu crítico sobre aspectos que dirigen el funcionamiento humano, social y cultural.',
        criteris: {
          eso: [
            '3.1 Reflexionar de manera crítica sobre la condición humana, la sociedad y la cultura a partir del conocimiento que proporcionan las ciencias humanas y sociales.',
            '3.2 Analizar la diversidad personal, social y cultural desde distintas perspectivas a partir de los conocimientos que proporcionan las ciencias humanas y sociales, mostrando actitudes de respeto y empatía por lo diferente y valorando la equidad y la no discriminación.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Conocer la dimensión social y antropológica del ser humano y desarrollar estrategias y habilidades sociales adecuadas a contextos cambiantes y a grupos diferentes, considerando los factores personales y socioculturales que intervienen en la configuración psicológica de la persona, para comprenderse a sí misma e interactuar con los demás desde el respeto a la diversidad personal, social y cultural.',
        description:
          'Conocer la dimensión social y antropológica del ser humano y desarrollar estrategias y habilidades sociales adecuadas a contextos cambiantes y a grupos diferentes, considerando los factores personales y socioculturales que intervienen en la configuración psicológica de la persona, para comprenderse a sí misma e interactuar con los demás desde el respeto a la diversidad personal, social y cultural.',
        criteris: {
          eso: [
            '4.1 Desarrollar estrategias y habilidades que faciliten la adaptación a nuevos grupos y contextos a partir del conocimiento social y antropológico del ser humano.',
            '4.2 Analizar los factores personales y socioculturales que intervienen en la configuración psicológica de la persona a partir del conocimiento comparado de la dimensión social y antropológica del ser humano.',
            '4.3 Valorar la diversidad desde el respeto, la inclusión y la igualdad real y efectiva entre hombres y mujeres, considerándola un elemento enriquecedor a nivel personal, social y cultural.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Explorar las oportunidades académicas y profesionales que ofrece el entorno, descubriendo y priorizando las necesidades e intereses personales y vocacionales y desarrollando el espíritu de iniciativa y de superación, así como las destrezas necesarias en la toma de decisiones, para llevar a cabo un proyecto personal, académico y profesional propio y realizar una primera aproximación al diseño de un plan sobre su inserción laboral y la correspondiente búsqueda activa de empleo.',
        description:
          'Explorar las oportunidades académicas y profesionales que ofrece el entorno, descubriendo y priorizando las necesidades e intereses personales y vocacionales y desarrollando el espíritu de iniciativa y de superación, así como las destrezas necesarias en la toma de decisiones, para llevar a cabo un proyecto personal, académico y profesional propio y realizar una primera aproximación al diseño de un plan sobre su inserción laboral y la correspondiente búsqueda activa de empleo.',
        criteris: {
          eso: [
            '5.1 Realizar un proyecto y un itinerario personal, académico y profesional propio y aproximarse al proceso de búsqueda activa de empleo, priorizando las necesidades y descubriendo los intereses personales y vocacionales mediante la exploración de las oportunidades académicas y profesionales que ofrece el entorno presencial y virtual, y desarrollando las destrezas necesarias en el proceso de toma de decisiones.',
            '5.2 Explorar el entorno próximo identificando las oportunidades académicas y profesionales que ofrece, valorando aquellas que mejor se adaptan a las cualidades, capacidades, destrezas e intereses personales, potenciando el espíritu de iniciativa y superación.',
          ],
        },
      },
    ],
  },

  Latín: {
    competencies: [
      {
        id: 'CE1',
        title:
          'Valorar el papel de la civilización latina en el origen de la identidad europea, comparando y reconociendo las semejanzas y diferencias entre lenguas y culturas, para analizar críticamente el presente.',
        description:
          'Valorar el papel de la civilización latina en el origen de la identidad europea, comparando y reconociendo las semejanzas y diferencias entre lenguas y culturas, para analizar críticamente el presente.',
        criteris: {
          eso: [
            '1.1. Describir el significado de productos culturales del presente, en el contexto de los desarrollos culturales en Europa, comparando las semejanzas y diferencias con la Antigüedad latina.',
            '1.2. Valorar de manera crítica los modos de vida, costumbres y actitudes de la sociedad romana en comparación con los de nuestras sociedades a partir del contenido de fuentes latinas en diferentes soportes.',
            '1.3. Identificar los periodos de la historia de Roma, los acontecimientos y personajes, así como los aspectos de la civilización romana en su contexto histórico, relacionando los datos con referentes actuales y aplicando los conocimientos adquiridos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Conocer los aspectos básicos de la lengua latina, comparándola con las lenguas de enseñanza y con otras lenguas del repertorio individual del alumnado, para valorar los rasgos comunes y apreciar la diversidad lingüística como muestra de riqueza cultural.',
        description:
          'Conocer los aspectos básicos de la lengua latina, comparándola con las lenguas de enseñanza y con otras lenguas del repertorio individual del alumnado, para valorar los rasgos comunes y apreciar la diversidad lingüística como muestra de riqueza cultural.',
        criteris: {
          eso: [
            '2.1. Valorar críticamente y adecuarse a la diversidad lingüística y cultural a la que da origen el latín, identificando y explicando semejanzas y diferencias entre los elementos lingüísticos del entorno, relacionándolos con los de su propia cultura y desarrollando una cultura compartida y una ciudadanía comprometida con los valores democráticos.',
            '2.2. Inferir significados de términos latinos aplicando los conocimientos léxicos y fonéticos de otras lenguas de su repertorio individual propio.',
            '2.3. Ampliar el caudal léxico y mejorar la expresión oral y escrita, incorporando latinismos y locuciones usuales de origen latino de manera coherente.',
            '2.4. Producir definiciones etimológicas de términos cotidianos, científicos y técnicos, reconociendo los elementos latinos en diferentes contextos lingüísticos y estableciendo, si procede, la relación semántica entre un término patrimonial y un cultismo.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Leer e interpretar textos latinos, asumiendo la aproximación a los textos como un proceso dinámico y tomando conciencia de los conocimientos y experiencias propias, para identificar su carácter clásico y fundamental.',
        description:
          'Leer e interpretar textos latinos, asumiendo la aproximación a los textos como un proceso dinámico y tomando conciencia de los conocimientos y experiencias propias, para identificar su carácter clásico y fundamental.',
        criteris: {
          eso: [
            '3.1. Explicar de forma oral, escrita o multimodal el carácter clásico y humanista de las diversas manifestaciones literarias y artísticas de la civilización latina utilizando un vocabulario correcto y una expresión adecuada.',
            '3.2. Reconocer el sentido global y las ideas principales y secundarias de un texto, contextualizándolo e identificando las referencias históricas, sociales, políticas o religiosas que aparecen en él, y sirviéndose de conocimientos sobre personajes y acontecimientos históricos ya estudiados.',
            '3.3. Interpretar de manera crítica el contenido de textos latinos de dificultad adecuada, atendiendo al contexto en el que se produjeron, conectándolos con la experiencia propia y valorando cómo contribuyen a entender los modos de vida, costumbres y actitudes de nuestra sociedad.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Comprender textos originales latinos, traduciendo del latín a la lengua de enseñanza y desarrollando estrategias de acceso al significado de un enunciado sencillo en lengua latina, para alcanzar y justificar la traducción propia de un pasaje.',
        description:
          'Comprender textos originales latinos, traduciendo del latín a la lengua de enseñanza y desarrollando estrategias de acceso al significado de un enunciado sencillo en lengua latina, para alcanzar y justificar la traducción propia de un pasaje.',
        criteris: {
          eso: [
            '4.1. Analizar los aspectos morfológicos, sintácticos y léxicos elementales de la lengua latina, identificándolos y comparándolos con los de la lengua familiar.',
            '4.2. Traducir textos breves y sencillos con términos adecuados y expresión correcta en la lengua de enseñanza, justificando la traducción y manifestando la correspondencia entre el análisis y la versión realizada.',
            '4.3. Producir mediante retroversión oraciones simples utilizando las estructuras propias de la lengua latina.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Descubrir, conocer y valorar el patrimonio cultural, arqueológico y artístico romano, apreciándolo y reconociéndolo como producto de la creación humana y como testimonio de la historia, para identificar las fuentes de inspiración y distinguir los procesos de construcción, preservación, conservación y restauración, así como para garantizar su sostenibilidad.',
        description:
          'Descubrir, conocer y valorar el patrimonio cultural, arqueológico y artístico romano, apreciándolo y reconociéndolo como producto de la creación humana y como testimonio de la historia, para identificar las fuentes de inspiración y distinguir los procesos de construcción, preservación, conservación y restauración, así como para garantizar su sostenibilidad.',
        criteris: {
          eso: [
            '5.1. Explicar los elementos de la civilización latina, especialmente los relacionados con la mitología clásica, identificándolos como fuente de inspiración de manifestaciones literarias y artísticas.',
            '5.2. Reconocer las huellas de la romanización en el patrimonio cultural y arqueológico del entorno, identificando los procesos de preservación, conservación y restauración como un aspecto fundamental de una ciudadanía comprometida con la sostenibilidad ambiental y el cuidado de su legado.',
            '5.3. Exponer de forma oral, escrita o multimodal las conclusiones obtenidas a partir de la investigación, individual o colectiva, del legado material e inmaterial de la civilización romana y su pervivencia en el presente a través de soportes analógicos y digitales, seleccionando información, contrastándola y organizándola a partir de criterios de validez, calidad y fiabilidad.',
          ],
        },
      },
    ],
  },

  'Música Activa, Movimiento y Folclore': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Analizar diversas propuestas musicales, de movimiento y de folclore, identificando sus principales rasgos estilísticos y estableciendo relaciones con su contexto, para valorar el patrimonio musical, dancístico y folclórico como fuente de disfrute y enriquecimiento musical.',
        description:
          'Analizar diversas propuestas musicales, de movimiento y de folclore, identificando sus principales rasgos estilísticos y estableciendo relaciones con su contexto, para valorar el patrimonio musical, dancístico y folclórico como fuente de disfrute y enriquecimiento musical.',
        criteris: {
          eso: [
            '1.1. Explicar, con actitud abierta y respetuosa, las funciones desempeñadas por determinadas propuestas musicales, dancísticas y folclóricas, relacionándolas con las principales características de su contexto.',
            '1.2. Identificar los principales rasgos estilísticos de distintas propuestas musicales, dancísticas y folclóricas, evidenciando una actitud de apertura, interés y respeto en la escucha o el visionado de las mismas.',
            '1.3. Apreciar los rasgos que hacen que las manifestaciones del folclore se vinculen con las tradiciones y costumbres de un pueblo, potenciando la búsqueda de la propia identidad cultural.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Identificar los elementos constitutivos de la música, del movimiento y del folclore, en diferentes propuestas artísticas, argumentando sobre ellos de forma adecuada, autónoma y crítica, para comprender y valorar el hecho artístico.',
        description:
          'Identificar los elementos constitutivos de la música, del movimiento y del folclore, en diferentes propuestas artísticas, argumentando sobre ellos de forma adecuada, autónoma y crítica, para comprender y valorar el hecho artístico.',
        criteris: {
          eso: [
            '2.1. Identificar los elementos de la música, del movimiento y del folclore, mediante la lectura, audición o visionado de ejemplos, aplicando la terminología adecuada en el momento de describirlos y valorar su función.',
            '2.2. Elaborar opiniones originales e informadas acerca de manifestaciones de música, movimiento y folclore, de forma oral y/o escrita, utilizando y seleccionando los recursos a su alcance con autonomía y espíritu crítico.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Interpretar y crear, de manera individual o colectiva, fragmentos musicales, movimientos y manifestaciones de folclore, utilizando los elementos básicos del lenguaje de la música y la danza, para favorecer la imaginación, autoexpresión y socialización.',
        description:
          'Interpretar y crear, de manera individual o colectiva, fragmentos musicales, movimientos y manifestaciones de folclore, utilizando los elementos básicos del lenguaje de la música y la danza, para favorecer la imaginación, autoexpresión y socialización.',
        criteris: {
          eso: [
            '3.1. Utilizar el lenguaje musical, del movimiento y del folclore, convencional y no convencional, en las actividades de interpretación individual o colectiva, favoreciendo su uso como vehículo para la autoexpresión.',
            '3.2. Participar en las actividades de música, danza y de folclore propuestas, con actitud abierta, asumiendo el papel asignado y contribuyendo a la socialización del grupo.',
            '3.3. Crear esquemas rítmicos y melódicos sencillos, de forma individual o en grupo, desarrollando la autoestima y la imaginación.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Aplicar habilidades y técnicas propias de la interpretación e improvisación en la ejecución de diversas propuestas artísticas, mediante la utilización adecuada de las herramientas tecnológicas y audiovisuales, de la voz, del cuerpo y de los instrumentos, para descubrir nuevas posibilidades de expresión de ideas y sentimientos, que potencien la seguridad, la autoestima y la confianza en uno mismo.',
        description:
          'Aplicar habilidades y técnicas propias de la interpretación e improvisación en la ejecución de diversas propuestas artísticas, mediante la utilización adecuada de las herramientas tecnológicas y audiovisuales, de la voz, del cuerpo y de los instrumentos, para descubrir nuevas posibilidades de expresión de ideas y sentimientos, que potencien la seguridad, la autoestima y la confianza en uno mismo.',
        criteris: {
          eso: [
            '4.1. Usar las técnicas propias del uso de la voz, de los recursos tecnológicos y audiovisuales, del cuerpo, de los objetos y de los instrumentos requeridos en las tareas de interpretación e improvisación artística, potenciando la seguridad en uno mismo y el control de emociones.',
            '4.2. Utilizar la interpretación e improvisación musical y corporal como medio de expresión de ideas y sentimientos, favoreciendo la autoexpresión y la autoestima.',
            '4.3. Comprender la importancia del cuidado de la voz, del cuerpo y de los instrumentos, en las tareas de interpretación e improvisación de música, de movimiento y de folclore, favoreciendo hábitos de bienestar y seguridad.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Participar activamente en la propuesta, organización y realización de proyectos musicales, de movimiento y de folclore, a través de cualquier manifestación expresiva y el uso de las nuevas tecnologías, para fomentar la responsabilidad y el espíritu colaborativo.',
        description:
          'Participar activamente en la propuesta, organización y realización de proyectos musicales, de movimiento y de folclore, a través de cualquier manifestación expresiva y el uso de las nuevas tecnologías, para fomentar la responsabilidad y el espíritu colaborativo.',
        criteris: {
          eso: [
            '5.1. Colaborar en el proceso del desarrollo de proyectos vinculados a cualquier tipo de manifestación expresiva musical, de movimiento y de folclore, aportando el conocimiento y habilidades técnicas personales al trabajo de equipo, con responsabilidad y actitud de disfrute.',
            '5.2. Utilizar y seleccionar de forma autónoma los diferentes recursos personales y materiales del entorno, para aportar riqueza y originalidad al proyecto de música, de movimiento y de folclore del conjunto de clase, potenciando el espíritu colaborativo.',
          ],
        },
      },
    ],
  },

  'Proyectos de Robótica': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Identificar, plantear y resolver problemas tecnológicos, mediante la realización de proyectos, adecuados a las necesidades del entorno, haciendo uso de sistemas de control automáticos, con creatividad, interés y de forma colaborativa, para idear soluciones funcionales, sostenibles e innovadoras.',
        description:
          'Identificar, plantear y resolver problemas tecnológicos, mediante la realización de proyectos, adecuados a las necesidades del entorno, haciendo uso de sistemas de control automáticos, con creatividad, interés y de forma colaborativa, para idear soluciones funcionales, sostenibles e innovadoras.',
        criteris: {
          eso: [
            '1.1. Trabajar activamente, de forma colaborativa, con motivación e interés, en la ideación, planificación y realización de proyectos, mostrando actitudes de respeto y tolerancia hacia los demás y sus opiniones e ideas.',
            '1.2. Diseñar y planificar soluciones para problemas surgidos a partir de las necesidades y posibilidades del centro y del entorno, ideando sistemas de control automáticos funcionales, sostenibles e innovadores, aplicando los conocimientos de programación y robótica adquiridos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Obtener soluciones automatizadas, destinadas a la construcción de sistemas automáticos y robots, aplicando conocimientos de estructuras, mecanismos, electricidad y electrónica, haciendo uso del pensamiento computacional, el diseño 3D y la fabricación digital, para generar productos que solucionen una necesidad o problema, de forma creativa.',
        description:
          'Obtener soluciones automatizadas, destinadas a la construcción de sistemas automáticos y robots, aplicando conocimientos de estructuras, mecanismos, electricidad y electrónica, haciendo uso del pensamiento computacional, el diseño 3D y la fabricación digital, para generar productos que solucionen una necesidad o problema, de forma creativa.',
        criteris: {
          eso: [
            '2.1. Obtener soluciones técnicas y constructivas en el desarrollo de sistemas automáticos y robots, aplicando los fundamentos de estructuras, mecanismos, electricidad y electrónica, así como otros conocimientos interdisciplinares.',
            '2.2. Diseñar y construir piezas u objetos que formen parte de la solución a un problema, aplicando herramientas de diseño asistido por ordenador, fabricándolos con ayuda de una impresora 3D e incorporándolos al sistema final.',
            '2.3. Construir, controlar y simular sistemas automáticos y robots que sean capaces de realizar tareas de forma autónoma, buscando la solución más adecuada, haciendo una selección de los materiales y componentes necesarios, además de respetando las normas de seguridad y salud en su construcción.',
            '2.4. Aplicar el pensamiento computacional en la robótica, como herramienta de solución y mejora a problemas planteados, valorando su repercusión en el entorno.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Conocer y utilizar lenguajes de programación en diferentes entornos, aplicando los principios del pensamiento computacional y realizando algoritmos que posibiliten diseñar sistemas de control, para solucionar problemas concretos o responder a retos propuestos con interés y creatividad.',
        description:
          'Conocer y utilizar lenguajes de programación en diferentes entornos, aplicando los principios del pensamiento computacional y realizando algoritmos que posibiliten diseñar sistemas de control, para solucionar problemas concretos o responder a retos propuestos con interés y creatividad.',
        criteris: {
          eso: [
            '3.1. Conocer y usar, de forma correcta, el entorno o entornos de programación en el control de los sistemas automáticos programados, conociendo sus normas de funcionamiento y su aplicación en prototipos diseñados o sistemas físicos construidos.',
            '3.2. Resolver problemas mediante sistemas de control programado de forma adecuada y eficiente, entendiendo y aplicando los principios del pensamiento computacional y usando los elementos básicos de programación aprendidos.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Emplear herramientas digitales de simulación de circuitos, procesos y sistemas, analizando su funcionamiento, además de las diferentes posibilidades y soluciones que puedan plantear, para comprender diferentes situaciones y resolverlas de forma práctica y eficiente.',
        description:
          'Emplear herramientas digitales de simulación de circuitos, procesos y sistemas, analizando su funcionamiento, además de las diferentes posibilidades y soluciones que puedan plantear, para comprender diferentes situaciones y resolverlas de forma práctica y eficiente.',
        criteris: {
          eso: [
            '4.1. Utilizar adecuadamente herramientas digitales de simulación de circuitos y sistemas, investigando en fuentes de información adecuadas, aprendiendo su funcionamiento y valorando la necesidad de su uso.',
            '4.2. Diseñar y comprender las simulaciones realizadas con herramientas digitales, afianzando los conocimientos adquiridos y posibilitando el desarrollo de otros nuevos, buscando soluciones prácticas y eficientes.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Investigar y descubrir las posibilidades que nos brindan las diferentes tecnologías emergentes en relación con el desarrollo sostenible, utilizando distintas fuentes de información, preferiblemente digitales y aplicando dichas tecnologías en el desarrollo de soluciones de automatización de procesos, más eficientes, sociales y ecológicas para fomentar un espíritu crítico y ético.',
        description:
          'Investigar y descubrir las posibilidades que nos brindan las diferentes tecnologías emergentes en relación con el desarrollo sostenible, utilizando distintas fuentes de información, preferiblemente digitales y aplicando dichas tecnologías en el desarrollo de soluciones de automatización de procesos, más eficientes, sociales y ecológicas para fomentar un espíritu crítico y ético.',
        criteris: {
          eso: [
            '5.1. Buscar y localizar documentación sobre las nuevas tecnologías emergentes utilizando diversas fuentes, seleccionándola adecuadamente y obteniendo información fiable y contrastada.',
            '5.2. Investigar e identificar, con sentido crítico y ético, las alternativas que ofrece el uso de las tecnologías emergentes en el desarrollo de soluciones de automatización de procesos, analizando las repercusiones en el entorno que nos rodea.',
          ],
        },
      },
    ],
  },

  'Proyectos de Artes Plásticas y Visuales': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Comprender las fases del proceso creativo en la elaboración de proyectos artísticos, tanto grupales como individuales, analizando y poniendo en práctica diferentes propuestas y alternativas, para desarrollar la creatividad y la actitud colaborativa.',
        description:
          'Comprender las fases del proceso creativo en la elaboración de proyectos artísticos, tanto grupales como individuales, analizando y poniendo en práctica diferentes propuestas y alternativas, para desarrollar la creatividad y la actitud colaborativa.',
        criteris: {
          eso: [
            '1.1 Entender el proceso de creación artística en sus distintas fases y aplicarlo a la producción de proyectos personales y de grupo, comprendiendo la necesidad de secuenciar dichas fases y adaptarlas a la actividad.',
            '1.2 Planear y desarrollar un método de trabajo con una finalidad concreta, mostrando iniciativa en la búsqueda de información y seleccionando la adecuada, junto con los diferentes materiales, instrumentos y recursos necesarios para su realización.',
            '1.3. Elaborar, de forma responsable, trabajos en equipo, demostrando una actitud de tolerancia y flexibilidad con todos los compañeros, valorando, además, el trabajo cooperativo como método eficaz para desarrollarlos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Valorar y analizar manifestaciones artísticas de diferentes períodos de la historia del arte, entendiendo sus valores comunicativos, además de mostrando interés por las propuestas culturales y creativas más cercanas, para comprender, de una forma más profunda e integral, la necesidad expresiva del ser humano desde sus orígenes.',
        description:
          'Valorar y analizar manifestaciones artísticas de diferentes períodos de la historia del arte, entendiendo sus valores comunicativos, además de mostrando interés por las propuestas culturales y creativas más cercanas, para comprender, de una forma más profunda e integral, la necesidad expresiva del ser humano desde sus orígenes.',
        criteris: {
          eso: [
            '2.1. Reconocer los principales elementos que configuran los lenguajes visuales, así como la expresividad de los mismos, en obras de arte, utilizando un proceso de análisis de creaciones representativas.',
            '2.2. Interpretar críticamente imágenes y obras artísticas dentro de los contextos en los que se han producido, considerando la repercusión que tienen sobre las personas y las sociedades.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Desarrollar la capacidad creativa, imaginativa y expresiva, a través de la experimentación, usando los diferentes medios y técnicas del lenguaje gráfico-plástico y audiovisual, para aplicarlas en proyectos artísticos de cualquier tipo.',
        description:
          'Desarrollar la capacidad creativa, imaginativa y expresiva, a través de la experimentación, usando los diferentes medios y técnicas del lenguaje gráfico-plástico y audiovisual, para aplicarlas en proyectos artísticos de cualquier tipo.',
        criteris: {
          eso: [
            '3.1. Experimentar con diferentes técnicas artísticas y reconocer sus cualidades estéticas y expresivas, usando, no solo materiales y herramientas innovadoras, sino también materiales biodegradables, que respeten la normativa actual relativa al respeto y preservación del medio ambiente.',
            '3.2. Elaborar producciones y proyectos artísticos, utilizando diferentes técnicas plásticas y audiovisuales adaptadas a un objetivo concreto.',
            '3.3. Seleccionar los materiales y recursos más adecuados, teniendo en cuenta, al aplicarlos en distintos ejercicios creativos, sus valores expresivos y estéticos.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Expresar ideas, sentimientos y emociones, por medio del diseño y construcción, tanto de forma individual como colectiva, de distintas propuestas artísticas y culturales, de carácter interdisciplinar, inspirándose en las características del entorno, para desarrollar la autoestima, la empatía hacia necesidades sociales y estéticas cercanas y la pertenencia a una comunidad.',
        description:
          'Expresar ideas, sentimientos y emociones, por medio del diseño y construcción, tanto de forma individual como colectiva, de distintas propuestas artísticas y culturales, de carácter interdisciplinar, inspirándose en las características del entorno, para desarrollar la autoestima, la empatía hacia necesidades sociales y estéticas cercanas y la pertenencia a una comunidad.',
        criteris: {
          eso: [
            '4.1. Analizar el entorno físico y conceptual de un espacio concreto y desarrollar en él una intervención artística que exprese sus ideas, sentimientos y emociones, prestando atención a sus características y siguiendo las fases del proceso creativo.',
            '4.2. Aportar ideas y propuestas creativas en el desarrollo de un proyecto grupal, que modifique o complemente el entorno más cercano, planteando respuestas razonadas y acordes con el medio circundante.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Comprender la importancia de la coordinación interdisciplinar en la creación de un proyecto conjunto de centro, colaborando activamente en su planteamiento, desarrollo y exhibición, así como aportando, de forma abierta, ideas y planteamientos de resolución, para obtener una visión global e integral de los aprendizajes, y ser conscientes de su incidencia tanto en el entorno más cercano como en su desarrollo personal.',
        description:
          'Comprender la importancia de la coordinación interdisciplinar en la creación de un proyecto conjunto de centro, colaborando activamente en su planteamiento, desarrollo y exhibición, así como aportando, de forma abierta, ideas y planteamientos de resolución, para obtener una visión global e integral de los aprendizajes, y ser conscientes de su incidencia tanto en el entorno más cercano como en su desarrollo personal.',
        criteris: {
          eso: [
            '5.1. Reconocer la importancia de la coordinación interdisciplinar en la creación de proyectos de centro, participando en actividades propuestas por los distintos departamentos, de forma flexible y activa, planteando además propuestas creativas.',
            '5.2. Colaborar activamente en el planteamiento, desarrollo y exhibición de proyectos de centro, evaluando no solo las propuestas, propias y ajenas, con propiedad y respeto, sino también su idoneidad dentro del proceso creativo.',
          ],
        },
      },
    ],
  },

  'Segunda Lengua Extranjera': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Comprender e interpretar el sentido general y los detalles más relevantes de textos expresados de forma clara y en la lengua estándar, buscando fuentes fiables y haciendo uso de estrategias como la inferencia de significados, para responder a necesidades comunicativas concretas.',
        description:
          'Comprender e interpretar el sentido general y los detalles más relevantes de textos expresados de forma clara y en la lengua estándar, buscando fuentes fiables y haciendo uso de estrategias como la inferencia de significados, para responder a necesidades comunicativas concretas.',
        criteris: {
          '1-2': [
            '1.1 Reconocer, interpretar, deducir y analizar el sentido global, así como palabras y frases específicas de textos orales, escritos y multimodales breves y sencillos sobre temas frecuentes y cotidianos de relevancia personal y ámbitos próximos a su experiencia, así como de textos literarios adecuados al nivel de desarrollo del alumnado, expresados de forma comprensible, clara y en lengua estándar a través de distintos soportes.',
            '1.2 Seleccionar, organizar y aplicar, de forma guiada, estrategias y conocimientos adecuados en situaciones comunicativas cotidianas y de relevancia para el alumnado para captar el sentido global y procesar informaciones explícitas en textos diversos.',
          ],
          '3-4': [
            '1.1. Extraer, comprender, analizar y relacionar el sentido global y las ideas principales, y seleccionar información pertinente de textos orales, escritos y multimodales sobre temas cotidianos, de relevancia personal o de interés público próximos a su experiencia expresados de forma clara y en la lengua estándar a través de diversos soportes.',
            '1.2. Interpretar y valorar el contenido y los rasgos discursivos de textos progresivamente más complejos propios de los ámbitos de las relaciones interpersonales, de los medios de comunicación social y del aprendizaje, así como de textos literarios adecuados al nivel de madurez del alumnado.',
            '1.3. Seleccionar, organizar y aplicar las estrategias y conocimientos más adecuados en cada situación comunicativa para comprender el sentido general, la información esencial y los detalles más relevantes de los textos; deducir e inferir significados e interpretar elementos no verbales; y buscar, seleccionar y gestionar información veraz.',
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
            '2.1 Expresar oralmente textos breves y sencillos, previamente preparados, sobre asuntos cotidianos, así como impresiones, gustos y opiniones de temas de interés y de relevancia para el alumnado, utilizando, de forma guiada, recursos verbales y no verbales, y usando formas y estructuras básicas y de uso frecuente propias de la lengua extranjera.',
            '2.2 Organizar y redactar textos breves y sencillos, previamente preparados, con adecuación a la situación comunicativa propuesta, a través de herramientas analógicas y digitales, y usando estructuras y léxico básico de uso común sobre asuntos cotidianos y frecuentes, de relevancia personal para el alumnado y próximos a su experiencia.',
            '2.3 Seleccionar, organizar y aplicar, de forma guiada, conocimientos y estrategias para preparar y producir textos adecuados a las intenciones comunicativas, las características contextuales y la tipología textual, usando, con ayuda, recursos físicos o digitales en función de la tarea y las necesidades de cada momento.',
          ],
          '3-4': [
            '2.1. Expresar oralmente textos sencillos, estructurados, comprensibles, coherentes y adecuados a la situación comunicativa sobre asuntos cotidianos, de relevancia personal o de interés público próximo a su experiencia, con el fin de describir, narrar, argumentar, comparar e informar, en diferentes soportes, utilizando recursos verbales y no verbales, así como estrategias de planificación, control, compensación y cooperación.',
            '2.2. Redactar y difundir textos de extensión media con aceptable claridad, coherencia, cohesión, corrección y adecuación a la situación comunicativa propuesta, a la tipología textual y a las herramientas analógicas y digitales utilizadas sobre asuntos cotidianos, de relevancia personal o de interés público próximos a su experiencia, respetando la propiedad intelectual y evitando el plagio.',
            '2.3. Seleccionar, organizar y aplicar conocimientos y estrategias para planificar, producir, revisar y cooperar en la elaboración de textos coherentes, cohesionados y adecuados a las intenciones comunicativas, las características contextuales, los aspectos socioculturales y la tipología textual, usando los recursos físicos o digitales más adecuados en función de la tarea y de las necesidades de la audiencia o del lector potencial a quien se dirige el texto.',
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
            '3.1 Preparar previamente y participar en situaciones interactivas breves y sencillas que comprende y en las que plantea preguntas sobre temas cotidianos, de relevancia personal y próximos a su experiencia, a través de diversos soportes, apoyándose en recursos tales como la repetición, el ritmo pausado o el lenguaje visual, verbal y no verbal, y mostrando empatía y respeto por la cortesía lingüística y la etiqueta digital, así como por las diferentes necesidades, ideas y motivaciones de los interlocutores e interlocutoras.',
            '3.2 Seleccionar, organizar y utilizar, de forma guiada y en situaciones cotidianas y cercanas a su entorno, diferentes técnicas y estrategias elementales para saludar, despedirse, presentarse y agradecer; formular y contestar preguntas sencillas; expresar mensajes orales y escritos, e iniciar y terminar la comunicación e indicar que no entiende.',
          ],
          '3-4': [
            '3.1. Planificar, participar y colaborar activamente, a través de diversos soportes, en situaciones interactivas sobre temas cotidianos, de relevancia personal o de interés público cercanos a su experiencia, mostrando iniciativa, empatía y respeto por la cortesía lingüística y la etiqueta digital, así como por las diferentes necesidades, ideas, inquietudes, iniciativas y motivaciones de las y los interlocutores.',
            '3.2. Seleccionar, organizar y utilizar estrategias adecuadas para iniciar, mantener y terminar la comunicación, tomar y ceder la palabra, solicitar y formular aclaraciones y explicaciones, reformular, comparar y contrastar, resumir, colaborar, debatir, resolver problemas y gestionar situaciones comprometidas.',
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
            '4.1 Inferir y explicar textos, transmitir conceptos y comunicaciones breves y sencillas, de forma guiada, en situaciones en las que se atienda a la diversidad, mostrando respeto y empatía por los interlocutores e interlocutoras y por las lenguas empleadas, e interés por participar en la solución de problemas de intercomprensión y de entendimiento en su entorno próximo, apoyándose en diversos recursos y soportes.',
            '4.2 Seleccionar y aplicar, de forma guiada, estrategias básicas (parafraseo, equivalencia y síntesis) que ayuden a crear puentes y faciliten la comprensión y producción de información y la comunicación, adecuadas a las intenciones comunicativas, usando, con ayuda, recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
          ],
          '3-4': [
            '4.1. Inferir y explicar textos, conceptos y comunicaciones breves y sencillas en situaciones en las que se atienda a la diversidad, mostrando respeto y empatía por las y los interlocutores y por las lenguas empleadas, y participando en la solución de problemas de intercomprensión y de entendimiento en su entorno, apoyándose en diversos recursos y soportes.',
            '4.2. Aplicar estrategias que ayuden a crear puentes, faciliten la comunicación y sirvan para explicar y simplificar textos, conceptos y mensajes, y que sean adecuadas a las intenciones comunicativas, las características contextuales y la tipología textual, usando recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
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
            '5.1 Comparar y contrastar las similitudes y diferencias entre distintas lenguas analizando y reflexionando de manera progresivamente autónoma sobre aspectos básicos de su funcionamiento y aplicarlas para la mejora de la competencia comunicativa.',
            '5.2 Utilizar y diferenciar de forma progresivamente autónoma los conocimientos y estrategias de mejora de su capacidad de comunicar y de aprender la lengua extranjera, con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3 Registrar y utilizar, de manera guiada, los progresos y dificultades en el proceso de aprendizaje de la lengua extranjera, reconociendo los aspectos que ayudan a mejorar y realizando actividades de autoevaluación y coevaluación, como las propuestas en el Portfolio Europeo de las Lenguas (PEL) o en un diario de aprendizaje, normalizando el error y valorándolo como una fuente de aprendizaje.',
          ],
          '3-4': [
            '5.1. Comparar y argumentar las similitudes y diferencias entre distintas lenguas analizando y reflexionando de manera progresivamente autónoma sobre su funcionamiento.',
            '5.2. Utilizar de forma creativa estrategias y conocimientos de mejora de su capacidad de comunicar y de aprender la lengua extranjera con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3. Registrar y analizar los progresos y dificultades de aprendizaje de la lengua extranjera, seleccionando las estrategias más eficaces para superar esas dificultades y consolidar su aprendizaje, realizando actividades de planificación del propio aprendizaje, autoevaluación y coevaluación, como las propuestas en el Portfolio Europeo de las Lenguas (PEL) o en un diario de aprendizaje, haciendo esos progresos y dificultades explícitos y compartiéndolos.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Valorar críticamente y adecuarse a la diversidad lingüística, cultural y artística a partir de la lengua extranjera identificando y compartiendo las semejanzas y las diferencias entre lenguas y culturas, para actuar de forma empática y respetuosa en situaciones interculturales.',
        description:
          'Valorar críticamente y adecuarse a la diversidad lingüística, cultural y artística a partir de la lengua extranjera identificando y compartiendo las semejanzas y las diferencias entre lenguas y culturas, para actuar de forma empática y respetuosa en situaciones interculturales.',
        criteris: {
          '1-2': [
            '6.1 Actuar con aprecio y respeto en situaciones interculturales, construyendo vínculos entre las diferentes lenguas y culturas, y mostrando rechazo ante cualquier tipo de discriminación, prejuicio y estereotipo en diferentes contextos comunicativos cotidianos y habituales.',
            '6.2 Aceptar y respetar la diversidad lingüística, cultural y artística propia de países donde se habla la lengua extranjera como fuente de enriquecimiento personal, mostrando interés por comprender elementos culturales y lingüísticos básicos que fomenten la sostenibilidad y la democracia.',
            '6.3 Seleccionar y aplicar, de forma guiada, estrategias básicas para entender y apreciar la diversidad lingüística, cultural y artística.',
          ],
          '3-4': [
            '6.1. Actuar de forma adecuada, empática y respetuosa en situaciones interculturales construyendo vínculos entre las diferentes lenguas y culturas, rechazando cualquier tipo de discriminación, prejuicio y estereotipo en contextos comunicativos cotidianos y proponiendo vías de solución a aquellos factores socioculturales que dificulten la comunicación.',
            '6.2. Valorar críticamente en relación con los derechos humanos y adecuarse a la diversidad lingüística, cultural y artística propia de países donde se habla la lengua extranjera, favoreciendo el desarrollo de una cultura compartida y una ciudadanía comprometida con la sostenibilidad, igualdad y los valores democráticos.',
            '6.3. Aplicar estrategias para defender y apreciar la diversidad lingüística, cultural y artística atendiendo a valores ecosociales y democráticos y respetando los principios de justicia, equidad e igualdad y sostenibilidad.',
          ],
        },
      },
    ],
  },

  'Taller de Emprendimiento y Finanzas Personales': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Identificar algunos conceptos económicos y financieros básicos, además de planificar las finanzas personales, diferenciando entre inversión, préstamo y gasto de dinero, razonando por qué se pagan o reciben intereses y quiénes son los agentes financieros principales de nuestro sistema, comprendiendo el diferente nivel de riesgo aparejado a cada una de las alternativas, para así poder tomar decisiones racionales respecto al ahorro y la inversión.',
        description:
          'Identificar algunos conceptos económicos y financieros básicos, además de planificar las finanzas personales, diferenciando entre inversión, préstamo y gasto de dinero, razonando por qué se pagan o reciben intereses y quiénes son los agentes financieros principales de nuestro sistema, comprendiendo el diferente nivel de riesgo aparejado a cada una de las alternativas, para así poder tomar decisiones racionales respecto al ahorro y la inversión.',
        criteris: {
          eso: [
            '1.1. Comprender conceptos económicos básicos, interpretando la problemática económica de su entorno y valorando la importancia de la intervención del sector público, fundamentalmente en la corrección de desigualdades.',
            '1.2. Conocer y valorar la importancia del dinero en la sociedad y en la vida de cada persona, identificando los distintos intermediarios financieros y sus principales servicios, razonando su utilidad y generando una actitud crítica, siendo conscientes del problema de la información asimétrica.',
            '1.3. Valorar el impacto de la planificación y la importancia del ahorro, sabiendo elaborar y gestionar, de forma adecuada, un presupuesto de ingresos y gastos personales a corto, medio y largo plazo.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Producir e interpretar documentos cotidianos, relacionados con actos de consumo, trabajo y negocios, comprendiéndolos y empleándolos adecuadamente, para poder considerarlos en la toma de decisiones racionales, necesarias en nuestra sociedad, así como para dirigirse adecuadamente a las administraciones públicas y a las que velan por los derechos de los consumidores.',
        description:
          'Producir e interpretar documentos cotidianos, relacionados con actos de consumo, trabajo y negocios, comprendiéndolos y empleándolos adecuadamente, para poder considerarlos en la toma de decisiones racionales, necesarias en nuestra sociedad, así como para dirigirse adecuadamente a las administraciones públicas y a las que velan por los derechos de los consumidores.',
        criteris: {
          eso: [
            '2.1. Entender la importancia del respeto a los derechos de los consumidores, identificando las distintas posibilidades de preservarlos y conociendo la posibilidad de recurrir a las organizaciones que, en los distintos ámbitos, desde el local al internacional, velan por la preservación de dichos derechos y pueden prestar asistencia ante una vulneración de los mismos.',
            '2.2. Identificar documentos relacionados con operaciones habituales de consumo, trabajo y negocios, así como conocer los trámites habituales en las relaciones con las administraciones públicas, cumplimentándolos y tramitándolos, tanto de forma manual como telemática.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Analizar y desarrollar las cualidades individuales y sociales del alumnado que impulsan la iniciativa emprendedora, favoreciendo el trabajo cooperativo y la toma de decisiones, para desarrollar aptitudes y habilidades esenciales, que les permitan encontrar nuevas oportunidades, en el entorno social y económico más próximo.',
        description:
          'Analizar y desarrollar las cualidades individuales y sociales del alumnado que impulsan la iniciativa emprendedora, favoreciendo el trabajo cooperativo y la toma de decisiones, para desarrollar aptitudes y habilidades esenciales, que les permitan encontrar nuevas oportunidades, en el entorno social y económico más próximo.',
        criteris: {
          eso: [
            '3.1. Identificar las fortalezas y debilidades personales, relacionándolas con los diferentes ámbitos del desarrollo personal y la vida diaria.',
            '3.2. Afrontar y resolver, de forma adecuada, los problemas planteados, empleando, sus propios recursos personales y seleccionando otros, tanto materiales como humanos, idóneos para su correcta resolución.',
            '3.3. Analizar los resultados alcanzados, desarrollando una actitud de superación, mejora y perfeccionamiento.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Desarrollar la capacidad de comunicarse y negociar con los demás, resolviendo, de manera adecuada, los conflictos que puedan surgir, valorando el planteamiento de propuestas personales y de grupo, ejerciendo el liderazgo de una manera positiva y organizando el trabajo común para llevar a cabo, de manera eficaz, los trabajos colaborativos.',
        description:
          'Desarrollar la capacidad de comunicarse y negociar con los demás, resolviendo, de manera adecuada, los conflictos que puedan surgir, valorando el planteamiento de propuestas personales y de grupo, ejerciendo el liderazgo de una manera positiva y organizando el trabajo común para llevar a cabo, de manera eficaz, los trabajos colaborativos.',
        criteris: {
          eso: [
            '4.1 Comprender la importancia del trabajo en equipo, desarrollando las habilidades sociales, personales, comunicativas y de inteligencia personal necesarias, para poder realizar actividades de trabajo cooperativo.',
            '4.2. Desarrollar una actitud flexible en la resolución de conflictos, proponiendo diferentes alternativas e intentando alcanzar acuerdos, mediante la negociación.',
            '4.3. Ejercer el liderazgo de una manera positiva, demostrando iniciativa y respeto, expresando con claridad no solo sus ideas, sino también recogiendo y argumentando las de los otros miembros del equipo.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Proponer proyectos de negocio adecuados al entorno externo de la empresa, aplicando técnicas empresariales innovadoras, desarrollando la creatividad y valorando el papel del emprendimiento como elemento que favorece el desarrollo social y económico, para promover iniciativas emprendedoras tanto sociales como económicas.',
        description:
          'Proponer proyectos de negocio adecuados al entorno externo de la empresa, aplicando técnicas empresariales innovadoras, desarrollando la creatividad y valorando el papel del emprendimiento como elemento que favorece el desarrollo social y económico, para promover iniciativas emprendedoras tanto sociales como económicas.',
        criteris: {
          eso: [
            '5.1. Entender y reconocer las cualidades personales y sociales de la persona emprendedora, relacionando el papel del emprendimiento con la innovación y el bienestar social.',
            '5.2 Reconocer la función social que desempeñan las empresas y valorar la importancia de su comportamiento ético, proponiendo iniciativas emprendedoras que reduzcan el impacto social y medioambiental.',
            '5.3. Elaborar proyectos de emprendimiento sencillos que partan de la investigación del entorno e incluyan un plan de comercialización, valorando la utilidad de las iniciativas empresariales para la sociedad.',
            '5.4 Seleccionar fuentes de información fiables, contrastando y justificando su veracidad y adoptando una actitud crítica.',
          ],
        },
      },
    ],
  },

  Tecnología: {
    competencies: [
      {
        id: 'CE1',
        title:
          'Identificar y plantear problemas tecnológicos con iniciativa y creatividad, estudiando las necesidades de su entorno próximo y aplicando estrategias y procesos colaborativos e iterativos relativos a proyectos, para idear y planificar soluciones de manera eficiente, accesible, sostenible e innovadora.',
        description:
          'Identificar y plantear problemas tecnológicos con iniciativa y creatividad, estudiando las necesidades de su entorno próximo y aplicando estrategias y procesos colaborativos e iterativos relativos a proyectos, para idear y planificar soluciones de manera eficiente, accesible, sostenible e innovadora.',
        criteris: {
          eso: [
            '1.1 Idear y planificar soluciones tecnológicas emprendedoras que generen un valor para la comunidad a partir de la observación y el análisis del entorno más cercano, estudiando sus necesidades, requisitos y posibilidades de mejora.',
            '1.2 Aplicar con iniciativa estrategias colaborativas de gestión de proyectos con una perspectiva interdisciplinar y siguiendo un proceso iterativo de validación, desde la fase de ideación hasta la difusión de la solución.',
            '1.3 Abordar la gestión del proyecto de forma creativa a la vez que funcional, aplicando estrategias y técnicas colaborativas adecuadas, así como métodos de investigación para la búsqueda en la ideación de soluciones lo más eficientes, accesibles e innovadoras posibles.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Aplicar de forma apropiada y segura distintas técnicas y conocimientos interdisciplinares, utilizando procedimientos y recursos tecnológicos y analizando el ciclo de vida de productos, para fabricar objetos o sistemas y obtener soluciones tecnológicas accesibles y sostenibles que den respuesta a necesidades planteadas.',
        description:
          'Aplicar de forma apropiada y segura distintas técnicas y conocimientos interdisciplinares, utilizando procedimientos y recursos tecnológicos y analizando el ciclo de vida de productos, para fabricar objetos o sistemas y obtener soluciones tecnológicas accesibles y sostenibles que den respuesta a necesidades planteadas.',
        criteris: {
          eso: [
            '2.1 Analizar el diseño de un producto que dé respuesta a una necesidad planteada, evaluando su demanda, evolución y previsión de fin de ciclo de vida con un criterio ético, responsable e inclusivo.',
            '2.2 Fabricar productos y obtener soluciones tecnológicas, aplicando herramientas de diseño asistido, técnicas de elaboración manual, mecánica y digital y utilizando los materiales y recursos mecánicos, eléctricos, electrónicos y digitales adecuados.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Expresar, comunicar y difundir ideas, propuestas o soluciones tecnológicas en diferentes foros de manera efectiva, usando un lenguaje inclusivo y no sexista, empleando los recursos disponibles y aplicando los elementos y técnicas necesarias, para intercambiar la información de manera responsable y fomentar el trabajo en equipo.',
        description:
          'Expresar, comunicar y difundir ideas, propuestas o soluciones tecnológicas en diferentes foros de manera efectiva, usando un lenguaje inclusivo y no sexista, empleando los recursos disponibles y aplicando los elementos y técnicas necesarias, para intercambiar la información de manera responsable y fomentar el trabajo en equipo.',
        criteris: {
          eso: [
            '3.1 Intercambiar información y fomentar el trabajo en equipo de manera asertiva, empleando las herramientas digitales adecuadas junto con el vocabulario técnico, símbolos y esquemas de sistemas tecnológicos apropiados.',
            '3.2 Presentar y difundir las propuestas o soluciones tecnológicas de manera efectiva, empleando la entonación, expresión, gestión del tiempo y adaptación adecuada del discurso, así como un lenguaje inclusivo y no sexista.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Desarrollar soluciones automatizadas a problemas planteados, aplicando los conocimientos necesarios e incorporando tecnologías emergentes, para diseñar y construir sistemas de control programables y robóticos.',
        description:
          'Desarrollar soluciones automatizadas a problemas planteados, aplicando los conocimientos necesarios e incorporando tecnologías emergentes, para diseñar y construir sistemas de control programables y robóticos.',
        criteris: {
          eso: [
            '4.1 Diseñar, construir, controlar o simular sistemas automáticos programables y robots que sean capaces de realizar tareas de forma autónoma, aplicando conocimientos de mecánica, electrónica, neumática y componentes de los sistemas de control, así como otros conocimientos interdisciplinares.',
            '4.2 Integrar en las máquinas y sistemas tecnológicos aplicaciones informáticas y tecnologías digitales emergentes de control y simulación como el internet de las cosas, el big data y la inteligencia artificial con sentido crítico y ético.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Aprovechar y emplear de manera responsable las posibilidades de las herramientas digitales, adaptándolas a sus necesidades, configurándolas y aplicando conocimientos interdisciplinares, para la resolución de tareas de una manera más eficiente.',
        description:
          'Aprovechar y emplear de manera responsable las posibilidades de las herramientas digitales, adaptándolas a sus necesidades, configurándolas y aplicando conocimientos interdisciplinares, para la resolución de tareas de una manera más eficiente.',
        criteris: {
          eso: [
            '5.1 Resolver tareas propuestas de manera eficiente, mediante el uso y configuración de diferentes aplicaciones y herramientas digitales, aplicando conocimientos interdisciplinares con autonomía.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Analizar procesos tecnológicos, teniendo en cuenta su impacto en la sociedad y el entorno y aplicando criterios de sostenibilidad y accesibilidad, para hacer un uso ético y ecosocialmente responsable de la tecnología.',
        description:
          'Analizar procesos tecnológicos, teniendo en cuenta su impacto en la sociedad y el entorno y aplicando criterios de sostenibilidad y accesibilidad, para hacer un uso ético y ecosocialmente responsable de la tecnología.',
        criteris: {
          eso: [
            '6.1 Hacer un uso responsable de la tecnología, mediante el análisis y aplicación de criterios de sostenibilidad y accesibilidad en la selección de materiales y en el diseño de estos, así como en los procesos de fabricación de productos tecnológicos, minimizando el impacto negativo en la sociedad y en el planeta.',
            '6.2 Analizar los beneficios que, en el cuidado del entorno, aportan la arquitectura bioclimática y el ecotransporte, valorando la contribución de las tecnologías al desarrollo sostenible.',
            '6.3 Identificar y valorar la repercusión y los beneficios del desarrollo de proyectos tecnológicos de carácter social realizados por medio de comunidades abiertas, acciones de voluntariado o proyectos de servicio a la comunidad.',
          ],
        },
      },
    ],
  },
};
