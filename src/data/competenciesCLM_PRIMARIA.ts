// Competencias específicas de la Educación Primaria de Castilla-La Mancha,
// generadas a partir del Decreto 81/2022, de 12 de julio, por el que se
// establece la ordenación y el currículo de la Educación Primaria en la
// comunidad autónoma de Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo
// II. El decreto formula cada competencia específica (CE) en un único
// enunciado (sin una versión corta y otra larga diferenciadas), por lo que,
// igual que en competenciesCLM_INFANTIL.ts, aquí title === description.
//
// Educación en Valores Cívicos y Éticos es la única área que el decreto
// imparte exclusivamente en el tercer ciclo (5º-6º); por ello sus CE solo
// tienen criterios para la clave de ciclo '5-6'.
import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CLM_PRIMARIA: Record<string, AreaCompetencies> = {
  'Conocimiento del Medio Natural, Social y Cultural': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Utilizar dispositivos y recursos digitales de forma segura, responsable y eficiente, para buscar información, comunicarse y trabajar de manera individual, en equipo y en red, y para reelaborar y crear contenido digital de acuerdo con las necesidades digitales del contexto educativo.',
        description:
          'Utilizar dispositivos y recursos digitales de forma segura, responsable y eficiente, para buscar información, comunicarse y trabajar de manera individual, en equipo y en red, y para reelaborar y crear contenido digital de acuerdo con las necesidades digitales del contexto educativo.',
        criteris: {
          '1-2': [
            '1.1 Utilizar dispositivos y recursos digitales de forma segura y de acuerdo con las necesidades del contexto educativo.',
          ],
          '3-4': [
            '1.1 Utilizar dispositivos y recursos digitales, de acuerdo con las necesidades del contexto educativo de forma segura, buscando información, comunicándose y trabajando de forma individual y en equipo, reelaborando y creando contenidos digitales sencillos.',
          ],
          '5-6': [
            '1.1 Utilizar recursos digitales de acuerdo con las necesidades del contexto educativo de forma segura y eficiente, buscando información, comunicándose y trabajando de forma individual, en equipo y en red, reelaborando y creando contenidos digitales sencillos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Plantear y dar respuesta a cuestiones científicas sencillas, utilizando diferentes técnicas, instrumentos y modelos propios del pensamiento científico, para interpretar y explicar hechos y fenómenos que ocurren en el medio natural, social y cultural.',
        description:
          'Plantear y dar respuesta a cuestiones científicas sencillas, utilizando diferentes técnicas, instrumentos y modelos propios del pensamiento científico, para interpretar y explicar hechos y fenómenos que ocurren en el medio natural, social y cultural.',
        criteris: {
          '1-2': [
            '2.1 Mostrar curiosidad por objetos, hechos y fenómenos cercanos, formulando preguntas y realizando predicciones.',
            '2.2 Buscar información sencilla de diferentes fuentes seguras y fiables de forma guiada, utilizándola en investigaciones relacionadas con el medio natural, social y cultural.',
            '2.3 Participar en experimentos pautados o guiados, cuando la investigación lo requiera, utilizando técnicas sencillas de indagación, empleando de forma segura los instrumentos y registrando las observaciones de forma clara.',
            '2.4 Proponer respuestas a las preguntas planteadas, comparando la información y los resultados obtenidos con las predicciones realizadas.',
            '2.5 Comunicar de forma oral o gráfica el resultado de las investigaciones, explicando los pasos seguidos con ayuda de un guion.',
          ],
          '3-4': [
            '2.1 Formular preguntas y realizar predicciones razonadas, demostrando curiosidad por el medio natural, social y cultural cercano.',
            '2.2 Buscar y seleccionar información de diferentes fuentes seguras y fiables, utilizándola en investigaciones relacionadas con el medio natural, social y cultural y adquiriendo léxico científico básico.',
            '2.3 Realizar experimentos guiados, cuando la investigación lo requiera, utilizando diferentes técnicas de indagación y modelos, empleando de forma segura instrumentos y dispositivos, realizando observaciones y mediciones precisas y registrándolas correctamente.',
            '2.4 Proponer posibles respuestas a las preguntas planteadas, a través de la interpretación de la información y los resultados obtenidos, comparándolos con las predicciones realizadas.',
            '2.5 Presentar los resultados de las investigaciones en diferentes formatos, utilizando lenguaje científico básico y explicando los pasos seguidos.',
          ],
          '5-6': [
            '2.1 Formular preguntas y realizar predicciones razonadas sobre el medio natural, social o cultural mostrando y manteniendo la curiosidad.',
            '2.2 Buscar, seleccionar y contrastar información, de diferentes fuentes seguras y fiables, usando los criterios de fiabilidad de fuentes, adquiriendo léxico científico básico, y utilizándola en investigaciones relacionadas con el medio natural, social y cultural.',
            '2.3 Diseñar y realizar experimentos guiados, cuando la investigación lo requiera, utilizando diferentes técnicas de indagación y modelos, empleando de forma segura los instrumentos y dispositivos apropiados, realizando observaciones y mediciones precisas y registrándolas correctamente.',
            '2.4 Proponer posibles respuestas a las preguntas planteadas, a través del análisis y la interpretación de la información y los resultados obtenidos, valorando la coherencia de las posibles soluciones y comparándolas con las predicciones realizadas.',
            '2.5 Presentar y comunicar los resultados de las investigaciones adaptando el mensaje y el formato a la audiencia a la que va dirigido, utilizando el lenguaje científico y explicando los pasos seguidos.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Resolver problemas a través de proyectos de diseño y de la aplicación del pensamiento y/o computacional, para generar cooperativamente un producto creativo e innovador que responda a necesidades concretas.',
        description:
          'Resolver problemas a través de proyectos de diseño y de la aplicación del pensamiento y/o computacional, para generar cooperativamente un producto creativo e innovador que responda a necesidades concretas.',
        criteris: {
          '1-2': [
            '3.1 Realizar, de forma guiada, un producto final sencillo que dé solución a un problema de diseño, probando en equipo diferentes prototipos y utilizando de forma segura los materiales adecuados.',
            '3.2 Presentar de forma oral o gráfica el producto final de los proyectos de diseño, explicando los pasos seguidos con ayuda de un guion.',
            '3.3 Mostrar interés por el pensamiento computacional, participando en la resolución guiada de problemas sencillos de programación.',
          ],
          '3-4': [
            '3.1 Construir en equipo un producto final sencillo que dé solución a un problema de diseño, proponiendo posibles soluciones, probando diferentes prototipos y utilizando de forma segura las herramientas, técnicas y materiales adecuados.',
            '3.2 Presentar el producto final de los proyectos de diseño en diferentes formatos y explicando los pasos seguidos.',
            '3.3 Resolver, de forma guiada, problemas sencillos de programación, modificando algoritmos de acuerdo con los principios básicos del pensamiento computacional.',
          ],
          '5-6': [
            '3.1 Plantear problemas de diseño que se resuelvan con la creación de un prototipo o solución digital, evaluando necesidades del entorno y estableciendo objetivos concretos.',
            '3.2 Diseñar posibles soluciones a los problemas planteados de acuerdo con técnicas sencillas de los proyectos de diseño y pensamiento computacional, mediante estrategias básicas de gestión de proyectos cooperativos, teniendo en cuenta los recursos necesarios y estableciendo criterios concretos para evaluar el proyecto.',
            '3.3 Desarrollar un producto final que dé solución a un problema de diseño, probando en equipo diferentes prototipos o soluciones digitales y utilizando de forma segura las herramientas, dispositivos, técnicas y materiales adecuados.',
            '3.4 Comunicar el diseño de un producto final, adaptando el mensaje y el formato a la audiencia, explicando los pasos seguidos, justificando por qué ese prototipo o solución digital cumple con los requisitos del proyecto y proponiendo posibles retos para futuros proyectos.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Conocer y tomar conciencia del propio cuerpo, así como de las emociones y sentimientos propios y ajenos, aplicando el conocimiento científico, para desarrollar hábitos saludables y para conseguir el bienestar físico, emocional y social.',
        description:
          'Conocer y tomar conciencia del propio cuerpo, así como de las emociones y sentimientos propios y ajenos, aplicando el conocimiento científico, para desarrollar hábitos saludables y para conseguir el bienestar físico, emocional y social.',
        criteris: {
          '1-2': [
            '4.1 Identificar las emociones propias y las de los demás, entendiendo las relaciones familiares y escolares a las que pertenecen y reconociendo las acciones que favorezcan el bienestar emocional y social.',
            '4.2 Reconocer estilos de vida saludables valorando la importancia de una alimentación variada, equilibrada y sostenible, la higiene, el ejercicio físico, el contacto con la naturaleza, el descanso y el uso adecuado de las tecnologías.',
          ],
          '3-4': [
            '4.1 Mostrar actitudes que fomenten el bienestar emocional y social, identificando las emociones propias y las de los demás, mostrando empatía y estableciendo relaciones afectivas saludables.',
            '4.2 Adoptar hábitos de vida saludable, valorando la importancia de una alimentación variada y equilibrada, el ejercicio físico, el descanso, la higiene y la prevención de enfermedades.',
          ],
          '5-6': [
            '4.1 Promover actitudes que fomenten el bienestar emocional y social, gestionando las emociones propias y respetando las de los demás, fomentando relaciones afectivas saludables y reflexionando ante los usos de la tecnología y la gestión del tiempo libre.',
            '4.2 Adoptar estilos de vida saludables valorando la importancia de una alimentación variada, equilibrada y sostenible, el ejercicio físico, el contacto con la naturaleza, el descanso, la higiene, la prevención de enfermedades y el uso adecuado de nuevas tecnologías.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Identificar las características de los diferentes elementos o sistemas del medio natural, social y cultural, analizando su organización y propiedades y estableciendo relaciones entre los mismos, para reconocer el valor del patrimonio cultural y natural, conservarlo, mejorarlo y emprender acciones para su uso responsable, especialmente el de nuestra comunidad autónoma.',
        description:
          'Identificar las características de los diferentes elementos o sistemas del medio natural, social y cultural, analizando su organización y propiedades y estableciendo relaciones entre los mismos, para reconocer el valor del patrimonio cultural y natural, conservarlo, mejorarlo y emprender acciones para su uso responsable, especialmente el de nuestra comunidad autónoma.',
        criteris: {
          '1-2': [
            '5.1 Reconocer las características, la organización y las propiedades de los elementos del medio natural, social y cultural a través de la indagación, utilizando las herramientas y procesos adecuados de forma pautada.',
            '5.2 Reconocer conexiones sencillas y directas entre diferentes elementos del medio natural, social y cultural por medio de la observación, la manipulación y la experimentación.',
            '5.3 Mostrar actitudes de respeto ante el patrimonio natural y cultural, reconociéndolo como un bien común.',
            '5.4 Conocer y respetar el patrimonio natural y cultural de Castilla-La Mancha.',
          ],
          '3-4': [
            '5.1 Identificar las características, la organización y las propiedades de los elementos del medio natural, social y cultural a través de la indagación y utilizando las herramientas y procesos adecuados.',
            '5.2 Identificar conexiones sencillas entre diferentes elementos del medio natural social y cultural mostrando comprensión de las relaciones que se establecen.',
            '5.3 Proteger el patrimonio natural y cultural y valorarlo como un bien común, adoptando conductas respetuosas para su disfrute y proponiendo acciones para su conservación y mejora.',
            '5.4 Conocer y valorar el patrimonio natural y cultural de Castilla-La Mancha, identificando parte de los bienes declarados como patrimonio por la UNESCO.',
          ],
          '5-6': [
            '5.1 Identificar y analizar las características, la organización y las propiedades de los elementos del medio natural, social y cultural a través de la indagación utilizando las herramientas y procesos adecuados.',
            '5.2 Establecer conexiones sencillas entre diferentes elementos del medio natural, social y cultural mostrando comprensión de las relaciones que se establecen.',
            '5.3 Valorar, proteger y mostrar actitudes de conservación y mejora del patrimonio natural y cultural a través de propuestas y acciones que reflejen compromisos y conductas en favor de la sostenibilidad.',
            '5.4 Conocer, valorar y respetar el patrimonio cultural y natural de Castilla-La Mancha, identificando parte de los bienes declarados como patrimonio por la UNESCO.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Identificar las causas y consecuencias de la intervención humana en el entorno, desde los puntos de vista social, económico, cultural, tecnológico y ambiental, para mejorar la capacidad de afrontar problemas, buscar soluciones y actuar de manera individual y cooperativa en su resolución, y para poner en práctica estilos de vida sostenibles y consecuentes con el respeto, el cuidado y la protección de las personas y del planeta.',
        description:
          'Identificar las causas y consecuencias de la intervención humana en el entorno, desde los puntos de vista social, económico, cultural, tecnológico y ambiental, para mejorar la capacidad de afrontar problemas, buscar soluciones y actuar de manera individual y cooperativa en su resolución, y para poner en práctica estilos de vida sostenibles y consecuentes con el respeto, el cuidado y la protección de las personas y del planeta.',
        criteris: {
          '1-2': [
            '6.1 Mostrar estilos de vida sostenible y valorar la importancia del respeto, los cuidados, la corresponsabilidad y la protección de los elementos y seres del planeta, identificando la relación de la vida de las personas con sus acciones sobre los elementos y recursos del medio como el suelo y el agua.',
          ],
          '3-4': [
            '6.1 Identificar problemas ecosociales, proponer posibles soluciones y poner en práctica estilos de vida sostenible, reconociendo comportamientos respetuosos de cuidado, corresponsabilidad y protección del entorno y uso sostenible de los recursos naturales, y expresando los cambios positivos y negativos causados en el medio por la acción humana.',
          ],
          '5-6': [
            '6.1 Promover estilos de vida sostenible y consecuentes con el respeto, los cuidados, la corresponsabilidad y la protección de las personas y del planeta, a partir del análisis de la intervención humana en el entorno.',
            '6.2 Participar con actitud emprendedora en la búsqueda, contraste y evaluación de propuestas para afrontar problemas ecosociales, buscar soluciones y actuar para su resolución, a partir del análisis de las causas y consecuencias de la intervención humana en el entorno.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Observar, comprender e interpretar continuidades y cambios del medio social y cultural, analizando relaciones de causalidad, simultaneidad y sucesión, para explicar y valorar las relaciones entre diferentes elementos y acontecimientos.',
        description:
          'Observar, comprender e interpretar continuidades y cambios del medio social y cultural, analizando relaciones de causalidad, simultaneidad y sucesión, para explicar y valorar las relaciones entre diferentes elementos y acontecimientos.',
        criteris: {
          '1-2': [
            '7.1 Ordenar temporalmente hechos del entorno social y cultural cercano, empleando nociones básicas de medida y sucesión.',
            '7.2 Conocer personas y grupos sociales relevantes de la historia, así como formas de vida del pasado, incorporando la perspectiva de género, dando especial relevancia a los propios de nuestra comunidad autónoma de Castilla-La Mancha.',
          ],
          '3-4': [
            '7.1 Identificar hechos del entorno social y cultural desde la Prehistoria hasta la Edad Antigua, empleando las nociones de causalidad, simultaneidad y sucesión.',
            '7.2 Conocer personas, grupos sociales relevantes y formas de vida de las sociedades desde la Prehistoria hasta la Edad Antigua, incorporando la perspectiva de género, dando especial relevancia a los propios de nuestra Comunidad Autónoma de Castilla-La Mancha.',
          ],
          '5-6': [
            '7.1 Analizar relaciones de causalidad, simultaneidad y sucesión entre diferentes elementos del medio social y cultural desde la Edad Media hasta la actualidad, situando cronológicamente los hechos.',
            '7.2 Conocer personas, grupos sociales relevantes y formas de vida de las sociedades desde la Edad Media hasta la actualidad, incorporando la perspectiva de género, dando especial relevancia a los propios de nuestra comunidad autónoma de Castilla-La Mancha, situándolas cronológicamente e identificando rasgos significativos sociales en distintas épocas de la historia.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Reconocer y valorar la diversidad y la igualdad de género, mostrando empatía y respeto por otras culturas y reflexionando sobre cuestiones éticas, para contribuir al bienestar individual y colectivo de una sociedad en continua transformación y al logro de los valores de integración europea.',
        description:
          'Reconocer y valorar la diversidad y la igualdad de género, mostrando empatía y respeto por otras culturas y reflexionando sobre cuestiones éticas, para contribuir al bienestar individual y colectivo de una sociedad en continua transformación y al logro de los valores de integración europea.',
        criteris: {
          '1-2': [
            '8.1 Recoger información acerca de manifestaciones culturales del propio entorno, mostrando respeto, valorando su diversidad y riqueza, y apreciándolas como fuente de aprendizaje.',
            '8.2 Mostrar actitudes que fomenten la igualdad de género y las conductas no sexistas reconociendo modelos positivos en el entorno cercano.',
          ],
          '3-4': [
            '8.1 Analizar la importancia demográfica, cultural y económica de las migraciones en la actualidad, valorando con respeto y empatía el aporte de la diversidad cultural al bienestar individual y colectivo.',
            '8.2 Valorar positivamente las acciones que fomentan la igualdad de género y las conductas no sexistas reconociendo modelos positivos a lo largo de la historia.',
          ],
          '5-6': [
            '8.1 Analizar los procesos geográficos, históricos y culturales que han conformado la sociedad actual, valorando la diversidad etnocultural o afectivo-sexual y la cohesión social y mostrando empatía y respeto por otras culturas y la igualdad de género.',
            '8.2 Promover la práctica de actitudes de igualdad de género y conductas no sexistas, analizando y contrastando diferentes modelos en nuestra sociedad, teniendo como referencia a las mujeres de nuestra región.',
          ],
        },
      },
      {
        id: 'CE9',
        title:
          'Participar en el entorno y la vida social de forma eficaz y constructiva desde el respeto a los valores democráticos, los derechos humanos y de la infancia y los principios y valores de la Constitución española y la Unión Europea, valorando la función del Estado y sus instituciones en el mantenimiento de la paz y la seguridad integral ciudadana, para generar interacciones respetuosas y equitativas y promover la resolución pacífica y dialogada de los conflictos.',
        description:
          'Participar en el entorno y la vida social de forma eficaz y constructiva desde el respeto a los valores democráticos, los derechos humanos y de la infancia y los principios y valores de la Constitución española y la Unión Europea, valorando la función del Estado y sus instituciones en el mantenimiento de la paz y la seguridad integral ciudadana, para generar interacciones respetuosas y equitativas y promover la resolución pacífica y dialogada de los conflictos.',
        criteris: {
          '1-2': [
            '9.1 Establecer acuerdos de forma dialógica y democrática como parte de grupos próximos a su entorno, identificando las responsabilidades individuales y empleando un lenguaje inclusivo y no violento.',
            '9.2 Identificar instituciones cercanas, señalando y valorando las funciones que realizan en pro de una buena convivencia.',
            '9.3 Conocer e interiorizar normas básicas para la convivencia en el uso de los espacios públicos, especialmente como peatones o como usuarios de los medios de locomoción, tomando conciencia de la importancia de la movilidad segura, saludable y sostenible tanto para las personas como para el planeta.',
          ],
          '3-4': [
            '9.1 Realizar actividades en el contexto de la comunidad escolar, asumiendo responsabilidades y estableciendo acuerdos de forma dialogada y democrática y empleando un lenguaje inclusivo y no violento.',
            '9.2 Conocer los principales órganos de gobierno y funciones de diversas administraciones y servicios públicos, valorando la importancia de su gestión para la seguridad integral ciudadana y la participación democrática.',
            '9.3 Interiorizar normas básicas para la convivencia en el uso de los espacios públicos como peatones o como usuarios de los medios de locomoción, identificando las señales de tráfico y tomando conciencia de la importancia de una movilidad segura, saludable y sostenible tanto para las personas como para el planeta.',
          ],
          '5-6': [
            '9.1 Resolver de forma pacífica y dialogada los conflictos, promoviendo una interacción respetuosa y equitativa a partir del lenguaje inclusivo y no violento, explicando y ejercitando las principales normas, derechos, deberes y libertades que forman parte de la Constitución española, y de la de Unión Europea, y conociendo la función que el Estado y sus instituciones desempeñan en el mantenimiento de la paz, la seguridad integral ciudadana y el reconocimiento de las víctimas de violencia.',
            '9.2 Explicar el funcionamiento general de los órganos de gobierno del municipio, de las comunidades autónomas, del Estado español y de la Unión Europea, valorando sus funciones y la gestión de los servicios públicos para la ciudadanía.',
          ],
        },
      },
    ],
  },

  'Educación Artística': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Descubrir propuestas artísticas de diferentes géneros, estilos, épocas y culturas, a través de la recepción activa, para desarrollar la curiosidad y el respeto por la diversidad.',
        description:
          'Descubrir propuestas artísticas de diferentes géneros, estilos, épocas y culturas, a través de la recepción activa, para desarrollar la curiosidad y el respeto por la diversidad.',
        criteris: {
          '1-2': [
            '1.1 Descubrir propuestas artísticas de diferentes géneros, estilos, épocas y culturas, a través de la recepción activa y mostrando curiosidad y respeto por las mismas.',
            '1.2 Describir manifestaciones culturales, artísticas y propias del folclore de Castilla-La Mancha, incluyendo tanto las tradicionales como las contemporáneas, explorando sus características con actitud abierta e interés.',
          ],
          '3-4': [
            '1.1 Reconocer propuestas artísticas de diferentes géneros, estilos, épocas y culturas, a través de la recepción activa y mostrando curiosidad y respeto por las mismas.',
            '1.2 Describir manifestaciones culturales, artísticas y propias del folclore de Castilla-La Mancha, incluyendo tanto las tradicionales como las contemporáneas, explorando sus características con actitud abierta e interés y estableciendo relaciones básicas entre ellas.',
          ],
          '5-6': [
            '1.1 Distinguir propuestas artísticas de diferentes géneros, estilos, épocas y culturas, a través de la recepción activa y mostrando curiosidad y respeto por las mismas.',
            '1.2 Describir manifestaciones culturales, artísticas y propias del folclore de Castilla-La Mancha incluyendo tanto las tradicionales como las contemporáneas, explorando sus características con actitud abierta e interés, estableciendo relaciones entre ellas y valorando la diversidad que las genera.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Investigar sobre manifestaciones culturales y artísticas y sus contextos, empleando diversos canales, medios y técnicas, para disfrutar de ellas, entender su valor y empezar a desarrollar una sensibilidad artística propia.',
        description:
          'Investigar sobre manifestaciones culturales y artísticas y sus contextos, empleando diversos canales, medios y técnicas, para disfrutar de ellas, entender su valor y empezar a desarrollar una sensibilidad artística propia.',
        criteris: {
          '1-2': [
            '2.1 Seleccionar y aplicar estrategias elementales para la búsqueda guiada de información sobre manifestaciones culturales y artísticas, a través de canales y medios de acceso sencillos, tanto de forma individual como cooperativa.',
            '2.2 Reconocer elementos característicos básicos de distintas manifestaciones culturales y artísticas que forman parte del patrimonio, indicando los canales, medios y técnicas empleados e identificando diferencias y similitudes.',
          ],
          '3-4': [
            '2.1 Seleccionar y aplicar estrategias para la búsqueda guiada de información sobre manifestaciones culturales y artísticas, a través de canales y medios de acceso sencillos, tanto de forma individual como colectiva.',
            '2.2 Distinguir elementos característicos básicos de manifestaciones culturales y artísticas que forman parte del patrimonio, indicando los canales, medios y técnicas utilizados, analizando sus diferencias y similitudes y reflexionando sobre las sensaciones producidas, con actitud de interés y respeto.',
          ],
          '5-6': [
            '2.1 Seleccionar y aplicar estrategias para la búsqueda de información sobre manifestaciones culturales y artísticas, a través de diversos canales y medios de acceso, tanto de forma individual como cooperativa.',
            '2.2 Comparar el significado y los elementos característicos de distintas manifestaciones culturales y artísticas que forman parte del patrimonio, analizando los canales, medios y técnicas vinculados a ellas, así como sus diferencias y similitudes, y desarrollando criterios de valoración propios, con actitud abierta y respetuosa.',
            '2.3 Valorar las sensaciones y emociones producidas por diferentes manifestaciones culturales y artísticas, a partir del análisis y la comprensión de dichas manifestaciones.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Expresar y comunicar de manera creativa ideas, sentimientos y emociones, experimentando con las posibilidades del sonido y el silencio, la imagen, el cuerpo y los medios digitales, para producir obras propias.',
        description:
          'Expresar y comunicar de manera creativa ideas, sentimientos y emociones, experimentando con las posibilidades del sonido y el silencio, la imagen, el cuerpo y los medios digitales, para producir obras propias.',
        criteris: {
          '1-2': [
            '3.1 Producir obras propias de manera guiada, utilizando algunas de las posibilidades expresivas del cuerpo, el sonido y el silencio, la imagen y los medios digitales básicos, y mostrando confianza en las capacidades propias.',
            '3.2 Expresar de forma guiada ideas, sentimientos y emociones a través de manifestaciones artísticas sencillas, experimentando con los diferentes lenguajes e instrumentos a su alcance.',
          ],
          '3-4': [
            '3.1 Producir obras propias básicas, utilizando las posibilidades expresivas del cuerpo, el sonido y el silencio, la imagen y los medios digitales básicos, y mostrando confianza en las capacidades propias.',
            '3.2 Expresar con creatividad ideas, sentimientos y emociones a través de manifestaciones artísticas básicas, experimentando con los diferentes lenguajes e instrumentos a su alcance.',
          ],
          '5-6': [
            '3.1 Producir obras propias básicas, utilizando las posibilidades expresivas del cuerpo, el sonido y el silencio, la imagen y los medios digitales básicos y mostrando confianza en las capacidades propias.',
            '3.2 Expresar con creatividad ideas, sentimientos y emociones a través de diversas manifestaciones artísticas, utilizando los diferentes lenguajes e instrumentos a su alcance, mostrando confianza en las propias capacidades y perfeccionando la ejecución.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Participar del diseño, la elaboración y la difusión de producciones culturales y artísticas individuales o colectivas, poniendo en valor el proceso y asumiendo diferentes funciones en la consecución de un resultado final, para desarrollar la creatividad, la noción de autoría y el sentido de pertenencia.',
        description:
          'Participar del diseño, la elaboración y la difusión de producciones culturales y artísticas individuales o colectivas, poniendo en valor el proceso y asumiendo diferentes funciones en la consecución de un resultado final, para desarrollar la creatividad, la noción de autoría y el sentido de pertenencia.',
        criteris: {
          '1-2': [
            '4.1 Participar de manera guiada en el diseño de producciones culturales y artísticas elementales, trabajando de forma cooperativa a partir de la igualdad, inclusión y el respeto a la diversidad.',
            '4.2 Tomar parte en el proceso cooperativo de producciones culturales y artísticas de forma respetuosa y utilizando elementos básicos de diferentes lenguajes y técnicas artísticas.',
            '4.3 Compartir los proyectos creativos, explicando el proceso y el resultado final obtenido, y valorando las experiencias propias y las de los demás.',
          ],
          '3-4': [
            '4.1 Participar de manera guiada en el diseño de producciones culturales y artísticas, trabajando de forma cooperativa en la consecución de un resultado final planificado y asumiendo diferentes funciones, desde la igualdad, inclusión y el respeto a la diversidad.',
            '4.2 Participar en el proceso cooperativo de producciones culturales y artísticas, de forma creativa y respetuosa, utilizando elementos básicos de diferentes lenguajes y técnicas artísticas.',
            '4.3 Compartir los proyectos creativos, empleando estrategias comunicativas básicas, explicando el proceso y el resultado final obtenido, y respetando y valorando las experiencias propias y las de los demás.',
          ],
          '5-6': [
            '4.1 Planificar y diseñar producciones culturales y artísticas colectivas, trabajando de forma cooperativa en la consecución de un resultado final y asumiendo diferentes funciones, desde la igualdad, inclusión y el respeto a la diversidad.',
            '4.2 Participar activamente en el proceso cooperativo de producciones culturales y artísticas, de forma creativa y respetuosa y utilizando elementos de diferentes lenguajes y técnicas artísticas.',
            '4.3 Compartir los proyectos creativos, empleando diferentes estrategias comunicativas y a través de diversos medios, explicando el proceso y el resultado final obtenido, y respetando y valorando las experiencias propias y de los demás.',
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
          'Adoptar un estilo de vida activo y saludable, practicando regularmente actividades físicas, lúdicas y deportivas, adoptando comportamientos que potencien la salud física, mental y social, así como medidas de responsabilidad individual y colectiva durante la práctica motriz, para interiorizar e integrar hábitos de actividad física sistemática que contribuyan al bienestar.',
        description:
          'Adoptar un estilo de vida activo y saludable, practicando regularmente actividades físicas, lúdicas y deportivas, adoptando comportamientos que potencien la salud física, mental y social, así como medidas de responsabilidad individual y colectiva durante la práctica motriz, para interiorizar e integrar hábitos de actividad física sistemática que contribuyan al bienestar.',
        criteris: {
          '1-2': [
            '1.1 Identificar los desplazamientos activos como práctica saludable, conociendo sus beneficios físicos para el establecimiento de un estilo de vida activo.',
            '1.2 Explorar las posibilidades de la propia motricidad a través del juego y la actividad física, actuando de acuerdo con sus características personales, aplicando en distintas situaciones cotidianas medidas básicas de cuidado de la salud personal a través de la alimentación saludable, la higiene corporal, la educación postural y la seguridad en la práctica.',
            '1.3 Participar activamente en juegos de activación y vuelta a la calma, reconociendo su utilidad para adaptar el cuerpo a la actividad física y evitar lesiones, manteniendo la calma y sabiendo cómo actuar en caso de que se produzca algún accidente en contextos de práctica motriz.',
            '1.4 Conocer los valores positivos que fomenta la práctica motriz compartida, reconociendo, vivenciando y disfrutando sus beneficios en contextos variados e inclusivos y respetando a todos los participantes con independencia de sus diferencias individuales.',
          ],
          '3-4': [
            '1.1 Reconocer la actividad física como alternativa de ocio saludable, identificando propuestas diversas en desplazamientos activos y sostenibles y conociendo los efectos beneficiosos a nivel físico y mental que posee adoptar un estilo de vida activo.',
            '1.2 Aprovechar las posibilidades motrices a través del juego y la actividad físico-deportiva aplicando medidas de educación postural, alimentación saludable, higiene corporal y preparación de la práctica motriz, desde la seguridad, asumiendo responsabilidades y generando hábitos y rutinas en situaciones cotidianas.',
            '1.3 Tomar medidas de precaución y prevención de lesiones en relación con la conservación y el mantenimiento del material en el marco de distintas prácticas físico-deportivas, conociendo protocolos básicos de actuación ante accidentes que se puedan producir en este contexto.',
            '1.4 Reconocer la propia imagen corporal y la de los demás, aceptando y respetando las diferencias individuales que puedan existir, superando y rechazando las conductas discriminatorias que se puedan producir en contextos de práctica motriz.',
          ],
          '5-6': [
            '1.1 Reconocer y valorar los efectos beneficiosos a nivel físico y mental de la actividad física como paso previo para su integración en la vida diaria.',
            '1.2 Integrar los procesos de activación corporal, dosificación del esfuerzo, relajación e higiene en la práctica de actividades motrices desarrolladas de acuerdo con las posibilidades personales de actuación e, interiorizando las rutinas propias de una práctica motriz saludable y responsable y de otras acciones vinculadas al correcto mantenimiento del estado de salud.',
            '1.3 Adoptar medidas de seguridad antes, durante y después de la práctica de actividad físico-deportiva, reconociendo los contextos de riesgo y actuando con precaución ante ellos.',
            '1.4 Identificar y abordar conductas vinculadas al ámbito corporal, la actividad física y el deporte que resultan perjudiciales para la salud o afectan negativamente a la convivencia, adoptando posturas de rechazo a la violencia, a la discriminación y a los estereotipos de género, y evitando activamente su reproducción.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Adaptar los elementos propios del esquema corporal, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices, aplicando procesos de percepción, decisión y ejecución adecuados a la lógica interna y a los objetivos de diferentes situaciones, para dar respuesta a las demandas de proyectos motores y de prácticas motrices con distintas finalidades en contextos de la vida diaria.',
        description:
          'Adaptar los elementos propios del esquema corporal, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices, aplicando procesos de percepción, decisión y ejecución adecuados a la lógica interna y a los objetivos de diferentes situaciones, para dar respuesta a las demandas de proyectos motores y de prácticas motrices con distintas finalidades en contextos de la vida diaria.',
        criteris: {
          '1-2': [
            '2.1 Reconocer la importancia de establecer metas claras a la hora de desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, valorando su consecución a partir de un análisis de los resultados obtenidos.',
            '2.2 Adoptar decisiones en contextos básicos de práctica motriz de carácter lúdico, de manera ajustada, a las situaciones planteadas.',
            '2.3 Descubrir, reconocer y emplear los componentes cualitativos y cuantitativos de las capacidades motrices de manera lúdica e integrada en diferentes situaciones y contextos, mejorando progresivamente su control, su dominio y aceptación corporal como determinante del autoconcepto físico.',
          ],
          '3-4': [
            '2.1 Llevar a cabo proyectos motores de carácter individual, cooperativo o colaborativo, empleando estrategias de monitorización y seguimiento que permitan analizar los resultados obtenidos.',
            '2.2 Adoptar decisiones adecuadas a la lógica interna de variedad de en situaciones lúdicas, juegos motores y actividades físico-deportivas, ajustándose a las demandas derivadas de los objetivos motores, de las características del grupo y de la lógica interna de situaciones individuales, de cooperación, de oposición y de colaboración-oposición, en contextos simulados de actuación.',
            '2.3 Emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa en distintos contextos y situaciones motrices, adquiriendo un progresivo conocimiento, control, dominio y aceptación corporal sobre ellos, como determinante del auto concepto físico.',
          ],
          '5-6': [
            '2.1 Desarrollar proyectos motores de carácter más complejo: individual, cooperativo o colaborativo, definiendo metas, secuenciando acciones, introduciendo cambios, si es preciso, durante el proceso, y generando producciones motrices de calidad, analizando y valorando el grado de ajuste al proceso seguido y al resultado obtenido.',
            '2.2 Aplicar principios básicos de toma de decisiones en situaciones lúdicas, juegos modificados y actividades físico-deportivas a partir de la anticipación, ajustándolos a las demandas derivadas de los objetivos motores y a la lógica interna de situaciones individuales, de cooperación, de oposición y de colaboración-oposición, en contextos reales o simulados de actuación, reflexionando sobre las soluciones obtenidas.',
            '2.3 Adquirir un progresivo conocimiento, control, dominio y aceptación corporal, empleando los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa y haciendo frente a las demandas de resolución de problemas en situaciones motrices transferibles a su espacio vivencial.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Desarrollar procesos de autorregulación e interacción en el marco de la práctica motriz, con actitud empática e inclusiva, haciendo uso de habilidades sociales y actitudes de cooperación, respeto, trabajo en equipo y deportividad, con independencia de las diferencias etnoculturales, sociales, de género, de habilidad o cualquier otra que pudiera existir entre los participantes para contribuir a la convivencia y al compromiso ético en los diferentes espacios en los que se participa.',
        description:
          'Desarrollar procesos de autorregulación e interacción en el marco de la práctica motriz, con actitud empática e inclusiva, haciendo uso de habilidades sociales y actitudes de cooperación, respeto, trabajo en equipo y deportividad, con independencia de las diferencias etnoculturales, sociales, de género, de habilidad o cualquier otra que pudiera existir entre los participantes para contribuir a la convivencia y al compromiso ético en los diferentes espacios en los que se participa.',
        criteris: {
          '1-2': [
            '3.1 Identificar las emociones que se producen durante el juego, iniciándose en su gestión para disfrutar de la actividad física.',
            '3.2 Respetar las normas consensuadas, así como las reglas de juego, y actuar desde los parámetros de la deportividad y el juego limpio, aceptando las características y niveles de los participantes.',
            '3.3 Participar en actividades físico-deportivas, comenzando a desarrollar habilidades sociales de acogida, inclusión, ayuda y cooperación, iniciándose en la resolución de conflictos personales de forma dialógica y justa, y mostrando un compromiso activo frente a las actuaciones contrarias a la convivencia.',
          ],
          '3-4': [
            '3.1 Mostrar una disposición positiva hacia la práctica física y hacia el esfuerzo, fruto de la adecuada gestión emocional, controlando la impulsividad y las emociones negativas que surjan en contextos de actividad motriz.',
            '3.2 Respetar las normas consensuadas en clase, así como las reglas de juego, y actuar desde los parámetros de la deportividad y el juego limpio, valorando la aportación de los participantes.',
            '3.3 Desarrollar habilidades sociales de acogida, inclusión, ayuda y cooperación al participar en diversidad de prácticas físico-deportivas, resolviendo los conflictos individuales y colectivos de forma dialógica y justa, mostrando un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia.',
          ],
          '5-6': [
            '3.1 Participar en actividades físico-deportivas, desde la autorregulación de su actuación, con predisposición, esfuerzo, perseverancia y mentalidad de crecimiento, controlando la impulsividad, gestionando las emociones y expresándolas de forma asertiva.',
            '3.2 Respetar las normas consensuadas, así como las reglas de juego, y actuar desde los parámetros de la deportividad y el juego limpio, reconociendo las actuaciones de compañeros y rivales.',
            '3.3 Convivir mostrando en el contexto de las prácticas motrices habilidades sociales, diálogo en la resolución de conflictos y respeto a la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnica, socio-económica o de competencia motriz, así como una actitud crítica y un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y la violencia, haciendo especial hincapié en el fomento de la igualdad de género.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Reconocer y practicar diferentes manifestaciones lúdicas, físico-deportivas y artístico-expresivas propias de la cultura motriz, valorando su influencia y sus aportaciones estéticas y creativas a la cultura tradicional y contemporánea, para integrarlas, desde un enfoque lúdico, en las situaciones motrices que se desarrollan regularmente en la vida cotidiana.',
        description:
          'Reconocer y practicar diferentes manifestaciones lúdicas, físico-deportivas y artístico-expresivas propias de la cultura motriz, valorando su influencia y sus aportaciones estéticas y creativas a la cultura tradicional y contemporánea, para integrarlas, desde un enfoque lúdico, en las situaciones motrices que se desarrollan regularmente en la vida cotidiana.',
        criteris: {
          '1-2': [
            '4.1 Participar activamente en juegos y otras manifestaciones artístico-expresivas de carácter motor y cultural propias del entorno de Castilla-La Mancha, valorando su componente lúdico-festivo y disfrutando de su puesta en práctica.',
            '4.2 Conocer, vivenciar y valorar los logros de distintos referentes del deporte de ambos géneros, reconociendo el esfuerzo, la dedicación y los sacrificios requeridos para alcanzar dichos éxitos.',
            '4.3 Participar activamente en la adaptación de diferentes manifestaciones expresivas y los distintos usos comunicativos de la corporalidad y sus manifestaciones a diferentes ritmos y contextos expresivos.',
          ],
          '3-4': [
            '4.1 Participar activa y adecuadamente en juegos motores y otras manifestaciones artístico-expresivas con arraigo en la cultura propia, tradicional o actual, así como otros procedentes de diversas culturas, contextualizando su origen, su aparición y su transmisión a lo largo del tiempo y valorando su importancia, repercusión e influencia en las sociedades pasadas y presentes.',
            '4.2 Asumir una visión abierta del deporte a partir del conocimiento de distintas ligas femeninas, masculinas o mixtas, acercándose al deporte federado e identificando comportamientos contrarios a la convivencia independientemente del contexto en el que tengan lugar.',
            '4.3 Participar activamente en la reproducción de distintas combinaciones de movimientos o coreografías individuales y grupales que incorporen prácticas comunicativas que transmitan sentimientos, emociones o ideas a través del cuerpo, empleando los distintos recursos expresivos y rítmicos de la corporalidad.',
          ],
          '5-6': [
            '4.1 Participar activamente de manera autónoma en juegos motores y otras manifestaciones artístico-expresivas con arraigo en la cultura propia y ajena, tradicional o actual, así como otros procedentes de diversas culturas, reconociendo y transmitiendo su valor cultural y su potencial como espacio generador de interacciones constructivas entre personas con orígenes diferentes y entendiendo las ventajas de su conservación.',
            '4.2 Valorar el deporte como fenómeno cultural, analizando los estereotipos de género o capacidad y los comportamientos sexistas que a veces suceden en su contexto, rechazándolos y adoptando actitudes que eviten su reproducción en el futuro.',
            '4.3 Reproducir y crear composiciones con o sin soporte musical, y comunicar diferentes sensaciones, emociones e ideas, de forma estética y creativa, desde el uso de los recursos rítmicos y expresivos de la motricidad.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Valorar positivamente diferentes medios naturales y urbanos como contextos de práctica motriz, interactuando constructivamente con ellos y comprendiendo la importancia de su conservación desde un enfoque sostenible, adoptando medidas de responsabilidad individual durante la práctica de juegos y actividades físico-deportivas, para realizar una práctica eficiente y respetuosa con el entorno y participar en su cuidado y mejora.',
        description:
          'Valorar positivamente diferentes medios naturales y urbanos como contextos de práctica motriz, interactuando constructivamente con ellos y comprendiendo la importancia de su conservación desde un enfoque sostenible, adoptando medidas de responsabilidad individual durante la práctica de juegos y actividades físico-deportivas, para realizar una práctica eficiente y respetuosa con el entorno y participar en su cuidado y mejora.',
        criteris: {
          '1-2': [
            '5.1 Participar en actividades lúdico-recreativas de forma segura en los entornos natural y urbano y en contextos terrestres o acuáticos, conociendo otros usos desde la motricidad y adoptando actitudes de respeto, cuidado y conservación de dichos entornos.',
          ],
          '3-4': [
            '5.1 Desarrollar y valorar la importancia de las medidas de seguridad básicas dentro de la práctica motriz segura en contextos naturales y urbanos de carácter terrestre o acuático, adecuando las acciones al análisis de cada situación y aplicando medidas de cuidado y conservación ambiental.',
          ],
          '5-6': [
            '5.1 Adaptar las acciones motrices a la incertidumbre propia del medio natural y/o urbano en contextos terrestres o acuáticos de forma eficiente y segura, valorando sus posibilidades para la práctica de actividad física y actuando desde una perspectiva ecosostenible del entorno y comunitaria.',
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
          'Deliberar y argumentar sobre problemas de carácter ético referidos a sí mismo y su entorno, buscando y analizando información fiable y generando una actitud reflexiva al respecto, para promover el autoconocimiento y la autonomía moral.',
        description:
          'Deliberar y argumentar sobre problemas de carácter ético referidos a sí mismo y su entorno, buscando y analizando información fiable y generando una actitud reflexiva al respecto, para promover el autoconocimiento y la autonomía moral.',
        criteris: {
          '5-6': [
            '1.1 Construir un adecuado concepto de sí mismo o sí misma en relación con los demás y la naturaleza, organizando y generando, de forma segura y crítica, información analógica y digital acerca de los rasgos relativos a la identidad, diferencia y dignidad de las personas.',
            '1.2 Identificar y expresar emociones, afectos y deseos, mostrando confianza en las propias capacidades al servicio de la consecución motivada de fines personales y colectivos.',
            '1.3 Generar una posición moral autónoma mediante el ejercicio de la deliberación racional, el uso de conceptos éticos y el diálogo respetuoso con otros, en torno a distintos valores y modos de vida, así como a problemas relacionados con el uso responsable, seguro y crítico de las redes y medios de comunicación, las conductas adictivas, la prevención del abuso y el acoso escolar, y el respeto a la intimidad personal.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Actuar e interactuar de acuerdo con normas y valores cívicos y éticos, reconociendo su importancia para la vida individual y colectiva y aplicándolos de manera efectiva y argumentada en distintos contextos, para promover una convivencia democrática, justa, inclusiva, respetuosa y pacífica.',
        description:
          'Actuar e interactuar de acuerdo con normas y valores cívicos y éticos, reconociendo su importancia para la vida individual y colectiva y aplicándolos de manera efectiva y argumentada en distintos contextos, para promover una convivencia democrática, justa, inclusiva, respetuosa y pacífica.',
        criteris: {
          '5-6': [
            '2.1 Promover y demostrar un modo de convivencia democrática, justa, inclusiva, respetuosa y pacífica a partir de la investigación y comprensión de la naturaleza social y política del ser humano y mediante el uso crítico de los conceptos de ley, ética, civismo, democracia, justicia y paz.',
            '2.2 Gestionar e interactuar con otros adoptando, de forma motivada y autónoma, conductas cívicas y éticas orientadas por valores comunes, a partir del conocimiento de los derechos humanos y los principios constitucionales fundamentales, en relación con contextos y problemas concretos, así como por una consideración crítica y dialogada acerca de cómo debemos relacionarnos con los demás.',
            '2.3 Reflexionar y asumir un compromiso activo y crítico con valores relativos a la solidaridad y el respeto a las minorías y las identidades etnoculturales y de género, analizando desde un punto de vista ético cuestiones relacionadas con la desigualdad y la pobreza, el hecho multicultural, la diversidad humana y los fenómenos migratorios.',
            '2.4 Contribuir a generar una convivencia respetuosa, no sexista y comprometida con el logro de la igualdad y la corresponsabilidad efectivas, y con la erradicación de la violencia de género, a partir del conocimiento y análisis crítico de la situación secular de desigualdad entre mujeres y hombres.',
            '2.5 Comprender y valorar los principios de justicia, solidaridad, seguridad y paz, a la vez que el respeto a las libertades básicas, a partir del análisis y la ponderación de las políticas y acciones de ayuda y cooperación internacional, de defensa para la paz y de seguridad integral ciudadana, ejercidas por el Estado y sus instituciones, los organismos internaciones, las ONG y ONGD y la propia ciudadanía.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Comprender las relaciones sistémicas entre el individuo, la sociedad y la naturaleza, a través del conocimiento y la reflexión sobre los problemas ecosociales, para comprometerse activamente con valores y prácticas consecuentes con el respeto, cuidado y protección de las personas y el planeta.',
        description:
          'Comprender las relaciones sistémicas entre el individuo, la sociedad y la naturaleza, a través del conocimiento y la reflexión sobre los problemas ecosociales, para comprometerse activamente con valores y prácticas consecuentes con el respeto, cuidado y protección de las personas y el planeta.',
        criteris: {
          '5-6': [
            '3.1 Evaluar diferentes alternativas con que frenar el cambio climático y lograr los Objetivos de Desarrollo Sostenible, identificando causas y problemas ecosociales, y justificando argumentalmente y de modo crítico el deber ético de proteger y cuidar la naturaleza.',
            '3.2 Comprometerse activamente con valores, prácticas y actitudes afectivas consecuentes con el respeto, cuidado y protección de las personas, los animales y el planeta, a través de la participación en actividades que promuevan un consumo responsable y un uso sostenible del suelo, el aire, el agua, la energía, la movilidad segura, saludable y sostenible, y la prevención y gestión de residuos, reconociendo el papel de las personas, colectivos y entidades comprometidas con la protección del entorno.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Desarrollar la autoestima y la empatía con el entorno, identificando, gestionando y expresando emociones y sentimientos propios, y reconociendo y valorando los de los otros, para adoptar una actitud fundada en el cuidado y aprecio de sí mismo, de los demás y del resto de la naturaleza.',
        description:
          'Desarrollar la autoestima y la empatía con el entorno, identificando, gestionando y expresando emociones y sentimientos propios, y reconociendo y valorando los de los otros, para adoptar una actitud fundada en el cuidado y aprecio de sí mismo, de los demás y del resto de la naturaleza.',
        criteris: {
          '5-6': [
            '4.1 Gestionar equilibradamente pensamientos, sentimientos y emociones, y desarrollar una actitud de estima y cuidado de sí mismo o sí misma, de los demás y del entorno, identificando, analizando y expresando de manera asertiva las propias emociones y afectos, y reconociendo y valorando los de otras personas, en distintos contextos y en relación con actividades creativas y de reflexión individual o dialogada sobre cuestiones éticas y cívicas.',
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
          'Reconocer la diversidad lingüística del mundo a partir de la identificación de las lenguas del alumnado y de la realidad plurilingüe y multicultural de España, para favorecer la reflexión interlingüística, para identificar y rechazar estereotipos y prejuicios lingüísticos y para valorar dicha diversidad como fuente de riqueza cultural.',
        description:
          'Reconocer la diversidad lingüística del mundo a partir de la identificación de las lenguas del alumnado y de la realidad plurilingüe y multicultural de España, para favorecer la reflexión interlingüística, para identificar y rechazar estereotipos y prejuicios lingüísticos y para valorar dicha diversidad como fuente de riqueza cultural.',
        criteris: {
          '1-2': [
            '1.1 Mostrar interés y respeto a las distintas lenguas y variedades dialectales de su entorno, valorando la igualdad en las diferencias.',
            '1.2 Reconocer, de manera acompañada y en contextos próximos, algunos prejuicios y estereotipos lingüísticos y culturales muy frecuentes.',
          ],
          '3-4': [
            '1.1 Mostrar interés y respeto a las distintas lenguas y variedades dialectales de su entorno, identificando algunas expresiones de uso cotidiano.',
            '1.2 Identificar, con cierta autonomía y en contextos próximos, prejuicios y estereotipos lingüísticos frecuentes, evitando su utilización, aportando alternativas y reconociendo la diversidad lingüística de su entorno como una fuente de riqueza cultural.',
          ],
          '5-6': [
            '1.1 Mostrar interés y respeto a las distintas lenguas y variedades dialectales, identificando las características fundamentales de las de su entorno geográfico, así como algunos rasgos de los dialectos y lenguas familiares del alumnado.',
            '1.2 Detectar, con autonomía creciente y en contextos próximos, prejuicios y estereotipos lingüísticos frecuentes, evitando y rechazando su utilización, aportando alternativas y valorando la diversidad lingüística del mundo como una fuente de riqueza cultural.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Comprender e interpretar textos orales y multimodales, identificando el sentido general y la información más relevante y valorando con ayuda aspectos formales y de contenido básicos, para construir conocimiento y responder a diferentes necesidades comunicativas.',
        description:
          'Comprender e interpretar textos orales y multimodales, identificando el sentido general y la información más relevante y valorando con ayuda aspectos formales y de contenido básicos, para construir conocimiento y responder a diferentes necesidades comunicativas.',
        criteris: {
          '1-2': [
            '2.1 Comprender el sentido de textos orales y multimodales sencillos, reconociendo las ideas principales y los mensajes explícitos y los mensajes implícitos más sencillos, e iniciando, de manera acompañada, la valoración del contenido y de los elementos no verbales más elementales.',
          ],
          '3-4': [
            '2.1 Comprender el sentido de textos orales y multimodales sencillos, reconociendo las ideas principales, los mensajes explícitos y los mensajes implícitos más sencillos, y progresando, de manera acompañada, en la valoración crítica del contenido y de los elementos no verbales elementales.',
          ],
          '5-6': [
            '2.1 Comprender el sentido de textos orales y multimodales sencillos, reconociendo las ideas principales y los mensajes explícitos e implícitos, valorando su contenido y los elementos no verbales elementales y, de manera acompañada, algunos elementos formales elementales.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Producir textos orales y multimodales, con coherencia, claridad y registro adecuados, para expresar ideas, sentimientos y conceptos; construir conocimiento; establecer vínculos personales; y participar con autonomía y una actitud cooperativa y empática en interacciones orales variadas.',
        description:
          'Producir textos orales y multimodales, con coherencia, claridad y registro adecuados, para expresar ideas, sentimientos y conceptos; construir conocimiento; establecer vínculos personales; y participar con autonomía y una actitud cooperativa y empática en interacciones orales variadas.',
        criteris: {
          '1-2': [
            '3.1 Producir textos orales y multimodales coherentes, con planificación acompañada y utilizando recursos no verbales elementales.',
            '3.2 Participar en interacciones orales espontáneas, incorporando estrategias elementales de escucha activa y de cortesía lingüística.',
          ],
          '3-4': [
            '3.1 Producir con la entonación y el registro adecuado, textos orales y multimodales coherentes, con planificación acompañada, ajustando el discurso a la situación comunicativa y utilizando recursos no verbales básicos.',
            '3.2 Participar en interacciones orales espontáneas o regladas, incorporando estrategias básicas de escucha activa y cortesía lingüística, utilizando técnicas conversacionales básicas.',
          ],
          '5-6': [
            '3.1 Producir textos orales y multimodales, de manera autónoma, coherente y fluida, en contextos formales sencillos y utilizando correctamente recursos verbales y no verbales básicos.',
            '3.2 Participar en interacciones orales espontáneas o regladas, incorporando estrategias sencillas de escucha activa, de cortesía lingüística y de cooperación conversacional.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Comprender e interpretar textos escritos y multimodales, reconociendo el sentido global, las ideas principales y la información explícita e implícita, y realizando con ayuda reflexiones elementales sobre aspectos formales y de contenido, para adquirir y construir conocimiento y para responder a necesidades e intereses comunicativos diversos.',
        description:
          'Comprender e interpretar textos escritos y multimodales, reconociendo el sentido global, las ideas principales y la información explícita e implícita, y realizando con ayuda reflexiones elementales sobre aspectos formales y de contenido, para adquirir y construir conocimiento y para responder a necesidades e intereses comunicativos diversos.',
        criteris: {
          '1-2': [
            '4.1 Comprender el sentido global y la información relevante de textos cercanos, escritos y multimodales, a partir de estrategias básicas de comprensión antes, durante y después de la lectura.',
            '4.2 Analizar, de manera acompañada, el contenido y aspectos formales y no formales elementales de textos escritos y multimodales sencillos valorando su contenido y estructura.',
          ],
          '3-4': [
            '4.1 Comprender el sentido global y la información relevante de textos sencillos, escritos y multimodales, realizando inferencias a partir de estrategias básicas de comprensión antes, durante y después de la lectura.',
            '4.2 Analizar, de manera acompañada, el contenido y aspectos formales y no formales elementales de textos escritos y multimodales, valorando su contenido y estructura e iniciándose en la evaluación de su fiabilidad.',
          ],
          '5-6': [
            '4.1 Comprender el sentido global y la información relevante de textos escritos y multimodales, realizando inferencias y a partir de estrategias básicas de comprensión antes, durante y después de la lectura.',
            '4.2 Analizar, de manera acompañada, el contenido y aspectos formales y no formales elementales de textos escritos y multimodales, valorando su contenido y estructura y evaluando su calidad, fiabilidad e idoneidad en función del propósito de lectura.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Producir textos escritos y multimodales, con corrección gramatical y ortográfica básicas, secuenciando correctamente los contenidos y aplicando estrategias elementales de planificación, textualización, revisión y edición, para construir conocimiento y para dar respuesta a demandas comunicativas concretas.',
        description:
          'Producir textos escritos y multimodales, con corrección gramatical y ortográfica básicas, secuenciando correctamente los contenidos y aplicando estrategias elementales de planificación, textualización, revisión y edición, para construir conocimiento y para dar respuesta a demandas comunicativas concretas.',
        criteris: {
          '1-2': [
            '5.1 Producir textos escritos y multimodales sencillos y coherentes en distintos soportes, desde las diferentes etapas del proceso evolutivo de la escritura, ajustándose a modelos dados y movilizando, de manera acompañada, estrategias elementales, individuales o grupales, de planificación, textualización y revisión.',
          ],
          '3-4': [
            '5.1 Producir textos escritos y multimodales sencillos, con coherencia y adecuación, en distintos soportes, iniciándose en el uso de las normas gramaticales y ortográficas más sencillas al servicio de la cohesión y progresando, de manera acompañada, en la movilización de estrategias sencillas, individuales o grupales, de planificación, textualización y revisión.',
          ],
          '5-6': [
            '5.1 Producir textos escritos y multimodales de relativa complejidad, con coherencia y adecuación, en distintos soportes, progresando en el uso de las normas gramaticales y ortográficas básicas al servicio de la cohesión textual y movilizando estrategias sencillas, individuales o grupales, de planificación, textualización, revisión y edición.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Buscar, seleccionar y contrastar información procedente de dos o más fuentes, de forma planificada y con el debido acompañamiento, evaluando su fiabilidad y reconociendo algunos riesgos de manipulación y desinformación, para transformarla en conocimiento y para comunicarla de manera creativa, adoptando un punto de vista personal y respetuoso con la propiedad intelectual.',
        description:
          'Buscar, seleccionar y contrastar información procedente de dos o más fuentes, de forma planificada y con el debido acompañamiento, evaluando su fiabilidad y reconociendo algunos riesgos de manipulación y desinformación, para transformarla en conocimiento y para comunicarla de manera creativa, adoptando un punto de vista personal y respetuoso con la propiedad intelectual.',
        criteris: {
          '1-2': [
            '6.1 Localizar, seleccionar y contrastar información de distintas fuentes, incluidas las digitales, citándolas y recreándolas mediante la adaptación creativa de modelos dados.',
            '6.2 Compartir los resultados de un proceso de investigación sencillo, individual o grupal, sobre algún tema de interés personal, realizado de manera acompañada.',
            '6.3 Adoptar hábitos de uso crítico, seguro, sostenible y saludable de las tecnologías digitales en relación con la búsqueda y la comunicación de la información.',
          ],
          '3-4': [
            '6.1 Localizar, seleccionar y contrastar información de distintas fuentes, incluidas las digitales, citándolas y recreándolas mediante la adaptación creativa de modelos dados.',
            '6.2 Compartir los resultados de un proceso de investigación sencillo, individual o grupal, sobre algún tema de interés personal o ecosocial, realizado de manera acompañada.',
            '6.3 Adoptar hábitos de uso crítico, seguro, sostenible y saludable de las tecnologías digitales en relación con la búsqueda y la comunicación de la información.',
          ],
          '5-6': [
            '6.1 Localizar, seleccionar y contrastar información de distintas fuentes, incluidas las digitales, citándolas y recreándolas mediante la adaptación creativa de modelos dados.',
            '6.2 Compartir los resultados de un proceso de investigación sencillo, individual y/o grupal, sobre algún tema de interés personal o ecosocial, realizado de manera acompañada.',
            '6.3 Adoptar hábitos de uso crítico, seguro, sostenible y saludable de las tecnologías digitales en relación con la búsqueda y la comunicación de la información.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Leer de manera autónoma obras diversas seleccionadas, destacando obras del patrimonio literario de Castilla-La Mancha, atendiendo a sus gustos e intereses, compartiendo las experiencias de lectura, para iniciar la construcción de la identidad lectora, para fomentar el gusto por la lectura como fuente de placer y para disfrutar de su dimensión social.',
        description:
          'Leer de manera autónoma obras diversas seleccionadas, destacando obras del patrimonio literario de Castilla-La Mancha, atendiendo a sus gustos e intereses, compartiendo las experiencias de lectura, para iniciar la construcción de la identidad lectora, para fomentar el gusto por la lectura como fuente de placer y para disfrutar de su dimensión social.',
        criteris: {
          '1-2': [
            '7.1 Leer con progresiva autonomía textos de distintos autores y autoras acordes con sus gustos e intereses, seleccionados de manera acompañada, desde las diferentes etapas del proceso evolutivo de la lectura, incorporando obras del patrimonio literario de Castilla-La Mancha.',
            '7.2 Compartir oralmente la experiencia y disfrute por la lectura participando en comunidades lectoras de ámbito escolar.',
          ],
          '3-4': [
            '7.1 Leer con progresiva autonomía o de forma acompañada textos de diversos autores y autoras, ajustados a sus gustos e intereses y seleccionados con creciente autonomía, avanzando en la construcción de su identidad lectora, incorporando obras del patrimonio literario castellano manchego.',
            '7.2 Compartir la experiencia de lectura, en soportes diversos, participando en comunidades lectoras en el ámbito escolar.',
          ],
          '5-6': [
            '7.1 Leer de manera autónoma textos de diversos autores y autoras ajustados a sus gustos e intereses, progresando en la construcción de su identidad lectora, incorporando obras del patrimonio literario castellano manchego.',
            '7.2 Compartir la experiencia de lectura, en soportes diversos, participando en comunidades lectoras en el ámbito escolar o social.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Leer, interpretar y analizar, de manera acompañada, obras o fragmentos literarios adecuados a su desarrollo incorporando, entre otros, textos propios del patrimonio literario de Castilla-La Mancha, incluyendo su folclore y su riqueza cultural, estableciendo relaciones entre ellos e identificando el género literario y sus convenciones fundamentales, para iniciarse en el reconocimiento de la literatura como manifestación artística y fuente de placer, conocimiento e inspiración para crear textos de intención literaria.',
        description:
          'Leer, interpretar y analizar, de manera acompañada, obras o fragmentos literarios adecuados a su desarrollo incorporando, entre otros, textos propios del patrimonio literario de Castilla-La Mancha, incluyendo su folclore y su riqueza cultural, estableciendo relaciones entre ellos e identificando el género literario y sus convenciones fundamentales, para iniciarse en el reconocimiento de la literatura como manifestación artística y fuente de placer, conocimiento e inspiración para crear textos de intención literaria.',
        criteris: {
          '1-2': [
            '8.1 Escuchar y leer textos orales y escritos de la literatura infantil, que recojan diversidad de autores y autoras, incluyendo obras de tradición oral y del folclore de Castilla-La Mancha, estableciendo de manera acompañada relaciones elementales entre ellos y con otras manifestaciones artísticas o culturales.',
            '8.2 Producir, de manera acompañada, textos sencillos individuales y/o colectivos con intención literaria, adaptados a las diferentes etapas del proceso evolutivo de la escritura, ajustándose a modelos dados, en distintos soportes y complementándolos con otros lenguajes artísticos.',
          ],
          '3-4': [
            '8.1 Escuchar y leer textos variados de la literatura infantil universal, que recojan diversidad de autores y autoras, relacionándolos en función de temas y aspectos elementales del género literario, e interpretándolos y relacionándolos con otras manifestaciones artísticas o culturales de manera acompañada.',
            '8.2 Producir, de manera acompañada, textos sencillos individuales y/o colectivos con intención literaria, recreando de manera personal los modelos dados, en distintos soportes y complementándolos con otros lenguajes artísticos.',
          ],
          '5-6': [
            '8.1 Escuchar y leer de manera acompañada textos literarios adecuados a su edad, que recojan diversidad de autores y autoras, relacionándolos en función de los temas y de aspectos elementales de cada género literario, e interpretándolos, valorándolos y relacionándolos con otras manifestaciones artísticas o culturales de manera progresivamente autónoma.',
            '8.2 Producir, de manera progresivamente autónoma, textos sencillos individuales y/o colectivos con intención literaria, reelaborando con creatividad los modelos dados, en distintos soportes y complementándolos con otros lenguajes artísticos.',
          ],
        },
      },
      {
        id: 'CE9',
        title:
          'Reflexionar de forma guiada sobre el lenguaje a partir de procesos de producción y comprensión de textos en contextos significativos, utilizando la terminología elemental adecuada, para iniciarse en el desarrollo de la conciencia lingüística y para mejorar las destrezas de producción y comprensión oral y escrita.',
        description:
          'Reflexionar de forma guiada sobre el lenguaje a partir de procesos de producción y comprensión de textos en contextos significativos, utilizando la terminología elemental adecuada, para iniciarse en el desarrollo de la conciencia lingüística y para mejorar las destrezas de producción y comprensión oral y escrita.',
        criteris: {
          '1-2': [
            '9.1 Formular conclusiones elementales sobre el funcionamiento de la lengua, prestando especial atención a la concordancia y a las relaciones de significado entre las palabras, a partir de la observación, comparación y transformación de palabras y enunciados, en un proceso acompañado de producción o comprensión de textos en contextos significativos.',
            '9.2 Revisar y mejorar los textos propios y subsanar algunos problemas de comprensión lectora, de manera acompañada, a partir de la reflexión metalingüística e interlingüística y usando la terminología lingüística básica adecuada.',
          ],
          '3-4': [
            '9.1 Formular conclusiones elementales sobre el funcionamiento de la lengua, prestando especial atención a la relación entre sustantivos, adjetivos y verbos, a partir de la observación, comparación y transformación de palabras, enunciados y textos, en un proceso acompañado de producción o comprensión de textos en contextos significativos.',
            '9.2 Revisar y mejorar los textos propios y ajenos y subsanar algunos problemas de comprensión lectora, de manera acompañada, a partir de la reflexión metalingüística e interlingüística y usando la terminología básica adecuada.',
          ],
          '5-6': [
            '9.1 Establecer generalizaciones sobre aspectos básicos del funcionamiento de la lengua de manera acompañada, formulando hipótesis y buscando contraejemplos, a partir de la observación, comparación y transformación de palabras, enunciados y textos, en un proceso acompañado de producción o comprensión de textos en contextos significativos.',
            '9.2 Revisar y mejorar los textos propios y ajenos y subsanar algunos problemas de comprensión lectora, de manera progresivamente autónoma, a partir de la reflexión metalingüística e interlingüística y usando la terminología básica adecuada.',
          ],
        },
      },
      {
        id: 'CE10',
        title:
          'Poner las propias prácticas comunicativas al servicio de la convivencia democrática utilizando un lenguaje no discriminatorio y detectando y rechazando los abusos de poder a través de la palabra, para favorecer un uso no solo eficaz sino también ético del lenguaje.',
        description:
          'Poner las propias prácticas comunicativas al servicio de la convivencia democrática utilizando un lenguaje no discriminatorio y detectando y rechazando los abusos de poder a través de la palabra, para favorecer un uso no solo eficaz sino también ético del lenguaje.',
        criteris: {
          '1-2': [
            '10.1 Rechazar los usos lingüísticos discriminatorios identificados a partir de la reflexión grupal acompañada sobre los aspectos elementales, verbales y no verbales, de la comunicación, teniendo en cuenta una perspectiva de género.',
            '10.2 Movilizar, con la planificación y el acompañamiento necesarios, estrategias elementales para la escucha activa, la comunicación asertiva y el consenso, iniciándose en la gestión dialogada de conflictos.',
          ],
          '3-4': [
            '10.1 Rechazar los usos lingüísticos discriminatorios e identificar los abusos de poder a través de la palabra a partir de la reflexión grupal acompañada sobre los aspectos básicos, verbales y no verbales, de la comunicación, teniendo en cuenta una perspectiva de género.',
            '10.2 Movilizar, con la planificación y el acompañamiento necesarios, estrategias básicas para la escucha activa, la comunicación asertiva y el consenso, potenciando el lenguaje positivo, que favorezca la crítica constructiva, progresando en la gestión dialogada de conflictos.',
          ],
          '5-6': [
            '10.1 Rechazar los usos lingüísticos discriminatorios y los abusos de poder a través de la palabra identificados mediante la reflexión grupal acompañada sobre distintos aspectos, verbales y no verbales, de la comunicación, teniendo en cuenta una perspectiva de género.',
            '10.2 Movilizar, con la planificación y el acompañamiento necesarios, estrategias básicas para la escucha activa, la comunicación asertiva y la deliberación argumentada, potenciando el lenguaje positivo, que favorezca la crítica constructiva, y progresando en la gestión dialogada de conflictos.',
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
          'Comprender el sentido general e información específica y predecible de textos breves y sencillos, expresados de forma clara y en la lengua estándar, haciendo uso de diversas estrategias y recurriendo, cuando sea necesario, al uso de distintos tipos de apoyo, para desarrollar el repertorio lingüístico y para responder a necesidades comunicativas cotidianas.',
        description:
          'Comprender el sentido general e información específica y predecible de textos breves y sencillos, expresados de forma clara y en la lengua estándar, haciendo uso de diversas estrategias y recurriendo, cuando sea necesario, al uso de distintos tipos de apoyo, para desarrollar el repertorio lingüístico y para responder a necesidades comunicativas cotidianas.',
        criteris: {
          '1-2': [
            '1.1 Reconocer e interpretar palabras y expresiones habituales en textos orales, escritos y multimodales breves y sencillos sobre temas frecuentes y cotidianos de relevancia personal y próximos a su experiencia, expresados de forma comprensible, clara, sencilla y directa, y en lengua estándar.',
            '1.2 Seleccionar y aplicar de forma guiada estrategias elementales en situaciones comunicativas cotidianas y de relevancia para el alumnado con el fin de captar la idea global e identificar elementos específicos con ayuda de elementos lingüísticos y no lingüísticos del contexto y el cotexto.',
          ],
          '3-4': [
            '1.1 Reconocer e interpretar el sentido global, así como palabras y frases previamente indicadas, en textos orales, escritos y multimodales, breves y sencillos, sobre temas frecuentes y cotidianos de relevancia personal y próximos a su experiencia, así como de textos de ficción adecuados al nivel de desarrollo del alumnado, expresados de forma comprensible, clara y en lengua estándar a través de distintos soportes.',
            '1.2 Seleccionar y aplicar, de forma guiada, estrategias adecuadas en situaciones comunicativas cotidianas y de relevancia para el alumnado, para captar el sentido global y procesar informaciones explícitas en textos breves y sencillos sobre temas familiares.',
          ],
          '5-6': [
            '1.1 Reconocer, interpretar, deducir y analizar el sentido global, así como palabras y frases específicas de textos orales, escritos y multimodales breves y sencillos sobre temas frecuentes y cotidianos de relevancia personal y ámbitos próximos a su experiencia, así como de textos literarios adecuados al nivel de desarrollo del alumnado, expresados de forma comprensible, clara y en lengua estándar a través de distintos soportes.',
            '1.2 Seleccionar, organizar y aplicar, de forma guiada, estrategias y conocimientos adecuados en situaciones comunicativas cotidianas y de relevancia para el alumnado para captar el sentido global y procesar informaciones explícitas en textos diversos.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Producir textos sencillos de manera comprensible y estructurada, mediante el empleo de estrategias como la planificación o la compensación, para expresar mensajes breves relacionados con necesidades inmediatas y responder a propósitos comunicativos cotidianos.',
        description:
          'Producir textos sencillos de manera comprensible y estructurada, mediante el empleo de estrategias como la planificación o la compensación, para expresar mensajes breves relacionados con necesidades inmediatas y responder a propósitos comunicativos cotidianos.',
        criteris: {
          '1-2': [
            '2.1 Expresar oralmente frases cortas y sencillas con información básica sobre asuntos cotidianos y de relevancia para el alumnado, utilizando de forma guiada recursos verbales y no verbales, recurriendo a modelos y estructuras previamente presentados y prestando atención al ritmo, la acentuación y la entonación.',
            '2.2 Escribir palabras, expresiones conocidas y frases a partir de modelos y con una finalidad específica, a través de herramientas analógicas y digitales, usando léxico y estructuras elementales sobre asuntos cotidianos y de relevancia personal para el alumnado.',
            '2.3 Seleccionar y aplicar, de forma guiada, estrategias básicas para producir mensajes breves y sencillos adecuados a las intenciones comunicativas usando, con ayuda, recursos y apoyos físicos o digitales en función de las necesidades de cada momento, incluyendo la posibilidad de señalar o hacer gestos.',
          ],
          '3-4': [
            '2.1 Expresar oralmente frases cortas, sencillas y textos breves con información básica sobre asuntos cotidianos y de relevancia para el alumnado delante del auditoria (grupo-aula), utilizando, de forma guiada, recursos verbales y no verbales, prestando atención al ritmo, la acentuación y la entonación.',
            '2.2 Escribir palabras, expresiones y frases conocidas y redactar textos muy breves y sencillos, a partir de modelos, con adecuación a la situación comunicativa propuesta, y a través de herramientas analógicas y digitales, usando estructuras y léxico elemental sobre asuntos cotidianos y de relevancia personal para el alumnado.',
            '2.3 Seleccionar y aplicar, de forma guiada, estrategias para producir mensajes breves y sencillos adecuados a las intenciones comunicativas, usando, con ayuda, recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
          ],
          '5-6': [
            '2.1 Expresar oralmente textos breves y sencillos, previamente preparados, sobre asuntos cotidianos, así como impresiones, gustos y opiniones de temas de interés y de relevancia para el alumnado, utilizando, de forma guiada, recursos verbales y no verbales, y usando formas y estructuras básicas y de uso frecuente propias de la lengua extranjera.',
            '2.2 Organizar y redactar textos breves y sencillos, previamente preparados, con adecuación a la situación comunicativa propuesta, a través de herramientas analógicas y digitales, y usando estructuras y léxico básico de uso común sobre asuntos cotidianos y frecuentes, de relevancia personal para el alumnado y próximos a su experiencia.',
            '2.3 Seleccionar, organizar y aplicar, de forma guiada, conocimientos y estrategias para preparar y producir textos adecuados a las intenciones comunicativas, las características contextuales y la tipología textual, usando, con ayuda, recursos físicos o digitales en función de la tarea y las necesidades de cada momento.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Interactuar con otras personas usando expresiones cotidianas, recurriendo a estrategias de cooperación y empleando recursos analógicos y digitales, para responder a necesidades inmediatas de su interés en intercambios comunicativos respetuosos con las normas de cortesía.',
        description:
          'Interactuar con otras personas usando expresiones cotidianas, recurriendo a estrategias de cooperación y empleando recursos analógicos y digitales, para responder a necesidades inmediatas de su interés en intercambios comunicativos respetuosos con las normas de cortesía.',
        criteris: {
          '1-2': [
            '3.1 Participar, de forma guiada, en situaciones interactivas elementales sobre temas cotidianos, preparadas previamente, a través de diversos soportes, apoyándose en recursos tales como la repetición, el ritmo pausado o el lenguaje no verbal, y mostrando empatía.',
            '3.2 Seleccionar y utilizar, de forma guiada y en entornos próximos, estrategias elementales para saludar, despedirse y presentarse; expresar mensajes sencillos y breves; y formular y contestar preguntas básicas para la comunicación.',
          ],
          '3-4': [
            '3.1 Participar de forma guiada en situaciones interactivas breves y sencillas sobre temas cercanos y significativos al entorno del alumno, de relevancia personal, y próximos a su experiencia, preparadas previamente, a través de diversos soportes, apoyándose en recursos tales como la repetición, el ritmo pausado o el lenguaje visual, verbal o no verbal, y mostrando empatía y respeto por la cortesía lingüística y la etiqueta digital.',
            '3.2 Seleccionar y utilizar, de forma guiada y en situaciones cotidianas, estrategias y expresiones elementales para saludar, despedirse, presentarse y agradecer; expresar mensajes breves; y formular y contestar preguntas sencillas para la interacción comunicativa.',
          ],
          '5-6': [
            '3.1 Preparar previamente y participar en situaciones interactivas breves y sencillas que comprende y en las que plantea preguntas sobre temas cotidianos, de relevancia personal y próximos a su experiencia, a través de diversos soportes, apoyándose en recursos tales como la repetición, el ritmo pausado o el lenguaje visual, verbal y no verbal, y mostrando empatía y respeto por la cortesía lingüística y la etiqueta digital, así como por las diferentes necesidades, ideas y motivaciones de los interlocutores e interlocutoras.',
            '3.2 Seleccionar, organizar y utilizar, de forma guiada y en situaciones cotidianas y cercanas a su entorno, diferentes técnicas y estrategias elementales para saludar, despedirse, presentarse y agradecer; formular y contestar preguntas sencillas; expresar mensajes orales y escritos, e iniciar y terminar la comunicación e indicar que no entiende.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Mediar en situaciones predecibles, usando estrategias y conocimientos para procesar y transmitir información básica y sencilla, con el fin de facilitar la comunicación.',
        description:
          'Mediar en situaciones predecibles, usando estrategias y conocimientos para procesar y transmitir información básica y sencilla, con el fin de facilitar la comunicación.',
        criteris: {
          '1-2': [
            '4.1 Interpretar y explicar, de forma guiada, información básica de conceptos, comunicaciones y textos breves y sencillos en situaciones en las que se atienda a la diversidad, mostrando empatía e interés por los interlocutores e interlocutoras y por los problemas de entendimiento en su entorno inmediato, apoyándose en diversos recursos y soportes.',
          ],
          '3-4': [
            '4.1 Interpretar, explica o transmitir textos, conceptos y comunicaciones breves y sencillas, de forma guiada, en situaciones en las que se atienda a la diversidad, mostrando empatía e interés por los interlocutores e interlocutoras y por los problemas de entendimiento en su entorno más próximo, apoyándose en diversos recursos y soportes.',
            '4.2 Seleccionar y aplicar, de forma guiada, estrategias elementales que se basen en los conocimientos precios y que ayuden a crear puentes y faciliten la comprensión y producción de información y la comunicación, usando, con ayuda, recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
          ],
          '5-6': [
            '4.1 Inferir y explicar textos, transmitir conceptos y comunicaciones breves y sencillas, de forma guiada, en situaciones en las que se atienda a la diversidad, mostrando respeto y empatía por los interlocutores e interlocutoras y por las lenguas empleadas, e interés por participar en la solución de problemas de intercomprensión y de entendimiento en su entorno próximo, apoyándose en diversos recursos y soportes.',
            '4.2 Seleccionar y aplicar, de forma guiada, estrategias básicas (parafraseo, equivalencia y síntesis) que ayuden a crear puentes y faciliten la comprensión y producción de información y la comunicación, adecuadas a las intenciones comunicativas, usando, con ayuda, recursos y apoyos físicos o digitales en función de las necesidades de cada momento.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Reconocer y usar los repertorios lingüísticos personales entre distintas lenguas, reflexionando sobre su funcionamiento e identificando las estrategias y conocimientos propios, para mejorar la respuesta a necesidades comunicativas concretas en situaciones conocidas.',
        description:
          'Reconocer y usar los repertorios lingüísticos personales entre distintas lenguas, reflexionando sobre su funcionamiento e identificando las estrategias y conocimientos propios, para mejorar la respuesta a necesidades comunicativas concretas en situaciones conocidas.',
        criteris: {
          '1-2': [
            '5.1 Comparar y contrastar similitudes y diferencias evidentes entre distintas lenguas, reflexionando, de forma guiada, sobre aspectos elementales de su funcionamiento.',
            '5.2 Identificar y aplicar, de forma guiada, conocimientos y estrategias de mejora de su capacidad de comunicar y de aprender la lengua extranjera, con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3 Identificar y explicar, de manera guiada, progresos y dificultades elementales en el proceso de aprendizaje de la lengua extranjera.',
          ],
          '3-4': [
            '5.1 Comparar y contrastar las similitudes y diferencias entre distintas lenguas reflexionando, de forma guiada, sobre aspectos básicos de su funcionamiento.',
            '5.2 Utilizar y diferenciar, de forma guiada, los conocimientos y estrategias de mejora de su capacidad de comunicar y de aprender la lengua extranjera, con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3 Registrar y aplicar, de manera guiada, los progresos y dificultades elementales en el proceso de aprendizaje de la lengua extranjera, reconociendo los aspectos que ayudan a mejorar y participando en actividades de autoevaluación y coevaluación, como las propuestas en el Portfolio Europeo de las Lenguas (PEL), normalizando el error y valorándolo como una fuente de aprendizaje.',
          ],
          '5-6': [
            '5.1 Comparar y contrastar las similitudes y diferencias entre distintas lenguas analizando y reflexionando de manera progresivamente autónoma sobre aspectos básicos de su funcionamiento y aplicarlas para la mejora de la competencia comunicativa.',
            '5.2 Utilizar y diferenciar de forma progresivamente autónoma los conocimientos y estrategias de mejora de su capacidad de comunicar y de aprender la lengua extranjera, con apoyo de otros participantes y de soportes analógicos y digitales.',
            '5.3 Registrar y utilizar, de manera guiada, los progresos y dificultades en el proceso de aprendizaje de la lengua extranjera, reconociendo los aspectos que ayudan a mejorar y realizando actividades de autoevaluación y coevaluación, como las propuestas en el Portfolio Europeo de las Lenguas (PEL) o en un diario de aprendizaje, normalizando el error y valorándolo como una fuente de aprendizaje.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Apreciar y respetar la diversidad lingüística, cultural y artística a partir de la lengua extranjera, identificando y valorando las diferencias y semejanzas entre lenguas y culturas, para aprender a gestionar situaciones interculturales.',
        description:
          'Apreciar y respetar la diversidad lingüística, cultural y artística a partir de la lengua extranjera, identificando y valorando las diferencias y semejanzas entre lenguas y culturas, para aprender a gestionar situaciones interculturales.',
        criteris: {
          '1-2': [
            '6.1 Mostrar interés por la comunicación intercultural, identificando y analizando, de forma guiada, las discriminaciones, los prejuicios y los estereotipos más comunes, en situaciones cotidianas y habituales.',
            '6.2 Reconocer y apreciar la diversidad lingüística y cultural relacionada con la lengua extranjera, mostrando interés por conocer sus elementos culturales y lingüísticos elementales.',
          ],
          '3-4': [
            '6.1 Actuar con respeto en situaciones interculturales, identificando y comparando semejanzas y diferencias elementales entre lenguas y culturas, y mostrando rechazo frente a discriminaciones, prejuicios y estereotipos de cualquier tipo en contextos comunicativos cotidianos y habituales.',
            '6.2 Reconocer y apreciar la diversidad lingüística, cultural y artística propia de países donde se habla la lengua extranjera como fuente de enriquecimiento personal, mostrando interés por comprender elementos culturales y lingüísticos elementales y habituales que fomenten la convivencia pacífica y el respeto por los demás.',
            '6.3 Seleccionar y aplicar, de forma guiada, estrategias básicas para entender y apreciar los aspectos más relevantes de la diversidad lingüística, cultural y artística.',
          ],
          '5-6': [
            '6.1 Actuar con aprecio y respeto en situaciones interculturales, construyendo vínculos entre las diferentes lenguas y culturas, y mostrando rechazo ante cualquier tipo de discriminación, prejuicio y estereotipo en diferentes contextos comunicativos cotidianos y habituales.',
            '6.2 Aceptar y respetar la diversidad lingüística, cultural y artística propia de países donde se habla la lengua extranjera como fuente de enriquecimiento personal, mostrando interés por comprender elementos culturales y lingüísticos básicos que fomenten la sostenibilidad y la democracia.',
            '6.3 Seleccionar y aplicar, de forma guiada, estrategias básicas para entender y apreciar la diversidad lingüística, cultural y artística.',
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
          'Interpretar situaciones de la vida cotidiana, proporcionando una representación matemática de las mismas mediante conceptos, herramientas y estrategias, para analizar la información más relevante.',
        description:
          'Interpretar situaciones de la vida cotidiana, proporcionando una representación matemática de las mismas mediante conceptos, herramientas y estrategias, para analizar la información más relevante.',
        criteris: {
          '1-2': [
            '1.1 Comprender las preguntas planteadas a través de diferentes estrategias o herramientas, reconociendo la información contenida en problemas de la vida cotidiana.',
            '1.2 Proporcionar ejemplos de representaciones de situaciones problematizadas sencillas, con recursos manipulativos y gráficos que ayuden en la resolución de un problema de la vida cotidiana.',
          ],
          '3-4': [
            '1.1 Interpretar, de forma verbal o gráfica, problemas de la vida cotidiana, comprendiendo las preguntas planteadas a través de diferentes estrategias o herramientas, incluidas las tecnológicas.',
            '1.2 Producir representaciones matemáticas a través de esquemas o diagramas que ayuden en la resolución de una situación problematizada.',
          ],
          '5-6': [
            '1.1 Comprender problemas de la vida cotidiana a través de la reformulación de la pregunta, de forma verbal y gráfica.',
            '1.2 Elaborar representaciones matemáticas que ayuden en la búsqueda y elección de estrategias y herramientas, incluidas las tecnológicas, para la resolución de una situación problematizada.',
          ],
        },
      },
      {
        id: 'CE2',
        title:
          'Resolver situaciones problematizadas, aplicando diferentes técnicas, estrategias y formas de razonamiento, para explorar distintas maneras de proceder, obtener soluciones y asegurar su validez desde un punto de vista formal y en relación con el contexto planteado.',
        description:
          'Resolver situaciones problematizadas, aplicando diferentes técnicas, estrategias y formas de razonamiento, para explorar distintas maneras de proceder, obtener soluciones y asegurar su validez desde un punto de vista formal y en relación con el contexto planteado.',
        criteris: {
          '1-2': [
            '2.1 Emplear algunas estrategias adecuadas en la resolución de problemas.',
            '2.2 Obtener posibles soluciones a problemas, de forma guiada, aplicando estrategias básicas de resolución.',
            '2.3 Describir verbalmente la idoneidad de las soluciones de un problema a partir de las preguntas previamente planteadas.',
          ],
          '3-4': [
            '2.1 Comparar entre diferentes estrategias para resolver un problema de forma pautada.',
            '2.2 Obtener posibles soluciones de un problema siguiendo alguna estrategia conocida.',
            '2.3 Demostrar la corrección matemática de las soluciones de un problema y su coherencia en el contexto planteado.',
          ],
          '5-6': [
            '2.1 Seleccionar entre diferentes estrategias para resolver un problema, justificando la elección.',
            '2.2 Obtener posibles soluciones de un problema, seleccionando entre varias estrategias conocidas de forma autónoma.',
            '2.3 Comprobar la corrección matemática de las soluciones de un problema y su coherencia en el contexto planteado.',
          ],
        },
      },
      {
        id: 'CE3',
        title:
          'Explorar, formular y comprobar conjeturas sencillas o plantear problemas de tipo matemático en situaciones basadas en la vida cotidiana, de forma guiada, reconociendo el valor del razonamiento y la argumentación, para contrastar su validez, adquirir e integrar nuevo conocimiento.',
        description:
          'Explorar, formular y comprobar conjeturas sencillas o plantear problemas de tipo matemático en situaciones basadas en la vida cotidiana, de forma guiada, reconociendo el valor del razonamiento y la argumentación, para contrastar su validez, adquirir e integrar nuevo conocimiento.',
        criteris: {
          '1-2': [
            '3.1 Realizar conjeturas matemáticas sencillas, investigando patrones, propiedades y relaciones de forma guiada.',
            '3.2 Dar ejemplos de problemas a partir de situaciones cotidianas que se resuelven matemáticamente.',
          ],
          '3-4': [
            '3.1 Analizar conjeturas matemáticas sencillas investigando patrones, propiedades y relaciones de forma pautada.',
            '3.2 Dar ejemplos de problemas sobre situaciones cotidianas que se resuelven matemáticamente.',
          ],
          '5-6': [
            '3.1 Formular conjeturas matemáticas sencillas investigando patrones, propiedades y relaciones de forma guiada.',
            '3.2 Plantear nuevos problemas sobre situaciones cotidianas que se resuelvan matemáticamente.',
          ],
        },
      },
      {
        id: 'CE4',
        title:
          'Utilizar el pensamiento computacional, organizando datos, descomponiendo en partes, reconociendo patrones, generalizando e interpretando, modificando y creando algoritmos de forma guiada, para modelizar y automatizar situaciones de la vida cotidiana.',
        description:
          'Utilizar el pensamiento computacional, organizando datos, descomponiendo en partes, reconociendo patrones, generalizando e interpretando, modificando y creando algoritmos de forma guiada, para modelizar y automatizar situaciones de la vida cotidiana.',
        criteris: {
          '1-2': [
            '4.1 Describir rutinas y actividades sencillas de la vida cotidiana que se realicen paso a paso, utilizando principios básicos del pensamiento computacional de forma guiada.',
            '4.2 Emplear herramientas tecnológicas adecuadas, de forma guiada, en el proceso de resolución de problemas.',
          ],
          '3-4': [
            '4.1 Automatizar situaciones sencillas de la vida cotidiana que se realicen paso a paso o sigan una rutina, utilizando de forma pautada principios básicos del pensamiento computacional.',
            '4.2 Emplear herramientas tecnológicas adecuadas en el proceso de resolución de problemas.',
          ],
          '5-6': [
            '4.1 Modelizar situaciones de la vida cotidiana utilizando, de forma pautada, principios básicos del pensamiento computacional.',
            '4.2 Emplear herramientas tecnológicas adecuadas en la investigación y resolución de problemas.',
          ],
        },
      },
      {
        id: 'CE5',
        title:
          'Reconocer y utilizar conexiones entre las diferentes ideas matemáticas, así como identificar las matemáticas implicadas en otras áreas o en la vida cotidiana, interrelacionando conceptos y procedimientos, para interpretar situaciones y contextos diversos.',
        description:
          'Reconocer y utilizar conexiones entre las diferentes ideas matemáticas, así como identificar las matemáticas implicadas en otras áreas o en la vida cotidiana, interrelacionando conceptos y procedimientos, para interpretar situaciones y contextos diversos.',
        criteris: {
          '1-2': [
            '5.1 Reconocer conexiones entre los diferentes elementos matemáticos, aplicando conocimientos y experiencias propios.',
            '5.2 Reconocer las situaciones matemáticas presentes en la vida cotidiana y en otras áreas, estableciendo conexiones sencillas entre ellas.',
          ],
          '3-4': [
            '5.1 Realizar conexiones entre los diferentes elementos matemáticos, aplicando conocimientos y experiencias propios.',
            '5.2 Interpretar situaciones en contextos diversos, reconociendo las conexiones entre las matemáticas y la vida cotidiana.',
          ],
          '5-6': [
            '5.1 Utilizar conexiones entre diferentes elementos matemáticos movilizando conocimientos y experiencias propios.',
            '5.2 Utilizar las conexiones entre las matemáticas, otras áreas y la vida cotidiana para resolver problemas en contextos no matemáticos.',
          ],
        },
      },
      {
        id: 'CE6',
        title:
          'Comunicar y representar, de forma individual y colectiva, conceptos, procedimientos y resultados matemáticos, utilizando el lenguaje oral, escrito, gráfico, multimodal y la terminología apropiados, para dar significado y permanencia a las ideas matemáticas.',
        description:
          'Comunicar y representar, de forma individual y colectiva, conceptos, procedimientos y resultados matemáticos, utilizando el lenguaje oral, escrito, gráfico, multimodal y la terminología apropiados, para dar significado y permanencia a las ideas matemáticas.',
        criteris: {
          '1-2': [
            '6.1 Reconocer lenguaje matemático sencillo presente en la vida cotidiana, adquiriendo vocabulario específico básico.',
            '6.2 Explicar ideas y procesos matemáticos sencillos, los pasos seguidos en la resolución de un problema o los resultados matemáticos, de forma verbal o gráfica.',
          ],
          '3-4': [
            '6.1 Reconocer el lenguaje matemático sencillo presente en la vida cotidiana en diferentes formatos, adquiriendo vocabulario específico básico y mostrando la comprensión del mensaje.',
            '6.2 Explicar los procesos e ideas matemáticas, los pasos seguidos en la resolución de un problema o los resultados obtenidos, utilizando un lenguaje matemático sencillo en diferentes formatos.',
          ],
          '5-6': [
            '6.1 Interpretar el lenguaje matemático sencillo presente en la vida cotidiana en diferentes formatos, adquiriendo vocabulario apropiado y mostrando la comprensión del mensaje.',
            '6.2 Comunicar en diferentes formatos las conjeturas y procesos matemáticos, utilizando lenguaje matemático adecuado.',
          ],
        },
      },
      {
        id: 'CE7',
        title:
          'Desarrollar destrezas personales que ayuden a identificar y gestionar emociones al enfrentarse a retos matemáticos, fomentando la confianza en las propias posibilidades, aceptando el error como parte del proceso de aprendizaje y adaptándose a las situaciones de incertidumbre, para mejorar la perseverancia y disfrutar en el aprendizaje de las matemáticas.',
        description:
          'Desarrollar destrezas personales que ayuden a identificar y gestionar emociones al enfrentarse a retos matemáticos, fomentando la confianza en las propias posibilidades, aceptando el error como parte del proceso de aprendizaje y adaptándose a las situaciones de incertidumbre, para mejorar la perseverancia y disfrutar en el aprendizaje de las matemáticas.',
        criteris: {
          '1-2': [
            '7.1 Reconocer las emociones básicas propias al abordar retos matemáticos, pidiendo ayuda solo cuando sea necesario.',
            '7.2 Expresar actitudes positivas ante retos matemáticos, identificando y valorando el error como una oportunidad de aprendizaje.',
          ],
          '3-4': [
            '7.1 Identificar las emociones propias al abordar retos matemáticos, pidiendo ayuda solo cuando sea necesario y desarrollando la autoconfianza.',
            '7.2 Mostrar actitudes positivas ante retos matemáticos tales como el esfuerzo y la flexibilidad, identificando y valorando el error como una oportunidad de aprendizaje.',
          ],
          '5-6': [
            '7.1 Autorregular las emociones propias y reconocer algunas fortalezas y debilidades, desarrollando así la autoconfianza al abordar retos matemáticos.',
            '7.2 Elegir actitudes positivas ante retos matemáticos, tales como la perseverancia y la responsabilidad, identificando y valorando el error como una oportunidad de aprendizaje.',
          ],
        },
      },
      {
        id: 'CE8',
        title:
          'Desarrollar destrezas sociales, reconociendo y respetando las emociones, las experiencias de los demás y el valor de la diversidad y participando activamente en equipos de trabajo heterogéneos con roles asignados, para construir una identidad positiva como estudiante de matemáticas, fomentar el bienestar personal y crear relaciones saludables.',
        description:
          'Desarrollar destrezas sociales, reconociendo y respetando las emociones, las experiencias de los demás y el valor de la diversidad y participando activamente en equipos de trabajo heterogéneos con roles asignados, para construir una identidad positiva como estudiante de matemáticas, fomentar el bienestar personal y crear relaciones saludables.',
        criteris: {
          '1-2': [
            '8.1 Participar respetuosamente en el trabajo en equipo, estableciendo relaciones saludables basadas en el respeto, la igualdad y la resolución pacífica de conflictos.',
            '8.2 Aceptar la tarea y rol asignado en el trabajo en equipo, cumpliendo con las responsabilidades individuales y contribuyendo a la consecución de los objetivos del grupo.',
            '8.3 Conocer y desarrollar de manera guiada el lenguaje interpersonal positivo, para favorecer la gestión de emociones y el control de impulsos.',
          ],
          '3-4': [
            '8.1 Trabajar en equipo activa y respetuosamente, comunicándose adecuadamente, respetando la diversidad del grupo y estableciendo relaciones saludables basadas en la igualdad y la resolución pacífica de conflictos.',
            '8.2 Participar en el reparto de tareas, asumiendo y respetando las responsabilidades individuales asignadas y empleando estrategias sencillas de trabajo en equipo dirigidas a la consecución de objetivos compartidos.',
            '8.3 Desarrollar y analizar de manera guiada el lenguaje interpersonal positivo para favorecer la gestión de las emociones, el control de impulsos, el ajuste de comportamientos, la planificación del trabajo y la motivación interna.',
          ],
          '5-6': [
            '8.1 Trabajar en equipo activa, respetuosa y responsablemente, mostrando iniciativa, comunicándose de forma efectiva, valorando la diversidad, mostrando empatía y estableciendo relaciones saludables basadas en el respeto, la igualdad y la resolución pacífica de conflictos.',
            '8.2 Colaborar en el reparto de tareas, asumiendo y respetando las responsabilidades individuales asignadas y empleando estrategias de trabajo en equipo sencillas dirigidas a la consecución de objetivos compartidos.',
            '8.3 Desarrollar y analizar el lenguaje interpersonal positivo, para favorecer la gestión de emociones, el control de impulsos, el ajuste del comportamiento, la planificación del trabajo, la motivación interna, la toma de decisiones y la metacognición.',
          ],
        },
      },
    ],
  },
};
