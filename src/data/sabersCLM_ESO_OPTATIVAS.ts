// Saberes básicos de las materias OPTATIVAS de la Educación Secundaria
// Obligatoria (ESO) de Castilla-La Mancha, generados a partir del Decreto
// 82/2022, de 12 de julio, por el que se establece la ordenación y el
// currículo de la Educación Secundaria Obligatoria en la comunidad autónoma
// de Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo II.
//
// El decreto regula 28 materias (11 troncales/comunes + 17 optativas). Este
// fichero cubre las 17 materias optativas: Artes Escénicas, Danza y
// Folclore; Cultura Científica; Cultura Clásica; Desarrollo Digital;
// Digitalización; Economía y Emprendimiento; Emprendimiento, Sostenibilidad
// y Consumo Responsable; Expresión Artística; Filosofía; Formación y
// Orientación Personal y Profesional; Latín; Música Activa, Movimiento y
// Folclore; Proyectos de Robótica; Proyectos de Artes Plásticas y Visuales;
// Segunda Lengua Extranjera; Taller de Emprendimiento y Finanzas
// Personales; y Tecnología. (Ver sabersCLM_ESO.ts para las 11 troncales.)
//
// Distribución de cursos según el propio decreto:
//   - Cultura Clásica: '2' (2º de ESO) y '4' (4º de ESO), únicas dos secciones
//     de "Criterios de evaluación"/"Saberes básicos" que distingue el texto.
//   - Segunda Lengua Extranjera: '1-2' y '3-4', igual que Lengua Extranjera
//     entre las troncales (reutiliza CLM_ESO_LABELS_12_34).
//   - Las 15 materias restantes no distinguen cursos en el decreto (una
//     única sección de "Criterios de evaluación" y "Saberes básicos" para
//     toda la materia), por lo que usan la clave única 'eso' (reutiliza
//     CLM_ESO_LABELS_SINGLE).
import type { SaberAreaGeneric } from './curriculum/types';
import { CLM_ESO_LABELS_SINGLE, CLM_ESO_LABELS_12_34 } from './sabersCLM_ESO';

export const CLM_ESO_LABELS_2_4: Record<string, string> = {
  '2': '2º de ESO',
  '4': '4º de ESO',
};

export const SABERS_AREAS_ESO_CLM_OPTATIVAS = [
  'Artes Escénicas, Danza y Folclore',
  'Cultura Científica',
  'Cultura Clásica',
  'Desarrollo Digital',
  'Digitalización',
  'Economía y Emprendimiento',
  'Emprendimiento, Sostenibilidad y Consumo Responsable',
  'Expresión Artística',
  'Filosofía',
  'Formación y Orientación Personal y Profesional',
  'Latín',
  'Música Activa, Movimiento y Folclore',
  'Proyectos de Robótica',
  'Proyectos de Artes Plásticas y Visuales',
  'Segunda Lengua Extranjera',
  'Taller de Emprendimiento y Finanzas Personales',
  'Tecnología',
];

export const SABERS_CLM_ESO_OPTATIVAS: Record<string, SaberAreaGeneric> = {
  'Artes Escénicas, Danza y Folclore': {
    name: 'Artes Escénicas, Danza y Folclore',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Expresión, interpretación, escenificación y representación': {
        eso: [
          'Técnicas básicas de expresión vocal, corporal y gestual aplicadas a la interpretación.',
          'Técnicas básicas del lenguaje rítmico-musical y de la danza aplicadas a la interpretación y la escenificación.',
          'Técnicas de dramatización e improvisación.',
          'Repertorios de canciones, danzas, obras teatrales y otras manifestaciones escénicas, adecuados al nivel del alumnado.',
          'Recursos expresivos del cuerpo, la voz, el espacio y el movimiento.',
          'Herramientas digitales aplicadas a la creación, ensayo y difusión de producciones escénicas y de danza.',
          'Reparto de roles y funciones en el trabajo colectivo de una producción escénica.',
          'El proceso de ensayo: planificación, organización y evaluación.',
          'El espectáculo como producto final: preparación, realización y valoración.',
        ],
      },
      'B. Patrimonio escénico, de danza y folclore': {
        eso: [
          'Las artes escénicas: características y funciones a lo largo de la historia.',
          'Tipologías del espectáculo escénico y dancístico.',
          'Manifestaciones del folclore de Castilla-La Mancha: canciones, danzas, indumentaria y tradiciones.',
          'Elementos constitutivos del hecho escénico: espacio, tiempo, personaje, acción.',
          'Géneros escénicos a lo largo de la historia.',
          'Evolución de la danza a lo largo de la historia y en las diferentes culturas.',
        ],
      },
    },
  },

  'Cultura Científica': {
    name: 'Cultura Científica',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Procedimientos de trabajo': {
        eso: [
          'Métodos de trabajo. Método científico.',
          'Búsqueda, tratamiento y transmisión de la información científica, mediante el uso de diferentes fuentes.',
          'Reflexión científica y toma de decisiones con contenido científico y tecnológico ante situaciones personales, sociales y globales.',
        ],
      },
      'B. El Universo': {
        eso: [
          'Evolución de las ideas sobre el universo.',
          'Origen, composición y estructura del universo.',
          'Origen, estructura del sistema solar y evolución de las estrellas.',
          'Condiciones para el origen de la vida.',
        ],
      },
      'C. La biosfera': {
        eso: [
          'Ecosistema: definición, componentes.',
          'Relaciones interespecíficas e intraespecíficas.',
          'Cadenas, redes y pirámides tróficas.',
          'Sucesiones ecológicas.',
        ],
      },
      'D. Medio ambiente y sostenibilidad': {
        eso: [
          'Principales problemas medioambientales: causas, consecuencias y soluciones.',
          'Cambio climático actual: análisis crítico de los datos que lo evidencian.',
          'Fuentes de energías convencionales y alternativas. La pila de hidrógeno.',
          'El desarrollo sostenible como principio rector de los tratados internacionales sobre protección del medio ambiente.',
          'Campañas de sensibilización medioambiental en el entorno próximo.',
        ],
      },
      'E. Calidad de vida': {
        eso: [
          'Salud y enfermedad: evolución histórica.',
          'Enfermedades infecciosas y no infecciosas más importantes: desarrollo, tratamientos y prevención.',
          'Sistema inmunológico humano: elementos y funcionamiento.',
          'Consumo de drogas: prevención y consecuencias.',
          'Estilos de vida y la salud.',
        ],
      },
    },
  },

  'Cultura Clásica': {
    name: 'Cultura Clásica',
    courseKeys: ['2', '4'],
    courseLabels: CLM_ESO_LABELS_2_4,
    blocs: {
      'A. Geografía e historia': {
        '2': [
          'El marco geográfico de las civilizaciones griega y romana.',
          'Etapas de las civilizaciones griega y romana.',
          'Esparta y Atenas: dos polis contrapuestas. La urbs: Roma.',
          'La familia griega y romana. Evolución del concepto de familia.',
          'La casa griega y romana.',
          'Gastronomía griega y romana.',
          'Los modelos educativos en Grecia y Roma y su comparación con el modelo actual.',
          'El trabajo y el ocio. Las competiciones atléticas y su pervivencia en la actualidad.',
        ],
        '4': [
          'El marco geográfico de la civilización griega: Grecia en el siglo de Pericles. El mundo helenístico.',
          'El marco geográfico de la civilización romana en su apogeo cultural: épocas de Augusto y de Trajano.',
          'La civilización griega: origen, principales acontecimientos y protagonistas.',
          'La civilización romana: origen mítico e histórico, principales acontecimientos y protagonistas.',
          'La romanización de Hispania y Europa: su importancia en la configuración de los territorios actuales.',
          'Sistemas políticos: las poleis griegas: aristocracia, tiranía y democracia. La República romana y el Imperio. Pervivencia de las instituciones políticas clásicas en la actualidad.',
          'La organización social de Grecia y Roma. La situación jurídica y social de los esclavos y de la mujer. Mujeres destacadas.',
          'El ejército: los hoplitas, las falanges y la legión. El campamento romano.',
          'Las representaciones y festivales teatrales, su evolución y pervivencia en la actualidad. Ludi Romani. Circo y anfiteatro.',
        ],
      },
      'B. Léxico': {
        '2': [
          'El alfabeto latino y griego.',
          'Localización de las lenguas romances de la península ibérica.',
          'Iniciación al significado etimológico de las palabras.',
          'Técnicas básicas de reconocimiento, organización e incorporación a la producción escrita, oral o multimodal de léxico de raíz común entre las distintas lenguas del repertorio lingüístico individual.',
        ],
        '4': [
          'El alfabeto latino y griego y su permanencia e influencia en las lenguas del repertorio lingüístico del alumnado.',
          'Comparación entre lenguas a partir de su origen y parentescos. Lenguas itálicas y dialectos griegos.',
          'Identificación de palabras con lexemas, sufijos y prefijos de origen latino y griego, en textos escritos de las lenguas de enseñanza.',
          'Estrategias básicas para inferir significados en el léxico especializado y de nueva aparición, a partir de la identificación de formantes latinos y griegos.',
          'Técnicas avanzadas de reconocimiento, organización e incorporación a la producción escrita, oral o multimodal de léxico de raíz común entre las distintas lenguas del repertorio lingüístico individual.',
        ],
      },
      'C. Mitología': {
        '2': [
          'El origen mítico del mundo, de los dioses, de las diosas y del ser humano.',
          'Dioses y diosas, héroes y heroínas de la mitología grecolatina. Atributos, rasgos y ámbito de influencia. Pervivencia de la mitología en la actualidad.',
        ],
        '4': [
          'Dioses, diosas, héroes y heroínas de la mitología grecolatina. Pervivencia de los arquetipos míticos, referentes de la cultura universal.',
          'Creencias, superstición y magia. Religión oficial, religión doméstica. El mundo de los muertos. Las religiones mistéricas. Los oráculos.',
        ],
      },
      'D. Manifestaciones artísticas': {
        '2': [
          'Características esenciales del arte griego y romano.',
          'Principales monumentos y obras de arte clásicos de Castilla-La Mancha: cronología y localización. Parques arqueológicos de Castilla-La Mancha.',
          'La mitología en la literatura juvenil, en el cine, en la música actual y en los videojuegos.',
        ],
        '4': [
          'Características esenciales del arte griego y romano y su funcionalidad. Conservación, preservación y restauración.',
          'Principales monumentos clásicos del patrimonio español y europeo: cronología y localización.',
          'Características de los géneros literarios, mediante la lectura de fragmentos. Pervivencia de temas, motivos y personajes de la tradición grecolatina en la literatura universal.',
        ],
      },
      'E. La herencia clásica en la construcción de la ciencia y la tecnología': {
        '2': [
          'El cómputo del tiempo.',
          'La construcción de ciudades. Vías de comunicación.',
          'Física: Arquímedes.',
        ],
        '4': [
          'La representación del universo en el mundo clásico.',
          'La medicina en Grecia y Roma.',
          'Matemáticas: Tales y Pitágoras. El sistema de numeración.',
          'La transmisión de la cultura clásica a través de los siglos. La universidad de Alcalá de Henares y la Escuela de Traductores de Toledo.',
        ],
      },
    },
  },

  'Desarrollo Digital': {
    name: 'Desarrollo Digital',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Uso de entornos virtuales en el aula': {
        eso: [
          'Presentación del entorno. Seguridad de las contraseñas.',
          'Acceso a los contenidos de las aulas virtuales.',
          'Actividades, tareas y otros recursos.',
          'Comunicaciones y mensajería.',
        ],
      },
      'B. Búsquedas en Internet': {
        eso: [
          'Motores de búsqueda.',
          'Configuraciones avanzadas.',
          'Credibilidad y contraste de la información.',
          'Propiedad intelectual en el ámbito digital.',
        ],
      },
      'C. Diseño y producción digital': {
        eso: [
          'Procesadores de textos.',
          'Elaboración de presentaciones.',
          'Programas de edición de imagen, sonido y vídeo.',
        ],
      },
      'D. Programación creativa': {
        eso: [
          'Introducción a la programación. Entornos y herramientas de programación.',
          'Tipos de instrucciones en un programa. Secuencia de ejecución.',
          'Cambio en la ejecución de un programa: sentencias condicionales y repetitivas.',
          'Sentencias para el manejo de imágenes, sonidos y animación de objetos.',
          'Colaboración en el desarrollo de proyectos de programación.',
        ],
      },
    },
  },

  Digitalización: {
    name: 'Digitalización',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Dispositivos digitales, sistemas operativos y de comunicación': {
        eso: [
          'Arquitectura de ordenadores: elementos, montaje, configuración y resolución de problemas.',
          'Sistemas operativos: instalación y configuración de usuario.',
          'Instalación de software de propósito general. Privilegios del sistema operativo.',
          'Sistemas de comunicación e internet: dispositivos de red y funcionamiento. Procedimiento de configuración de una red doméstica y conexión de dispositivos.',
          'Dispositivos conectados (IoT + Wearables): configuración y conexión de dispositivos.',
        ],
      },
      'B. Digitalización del entorno personal de aprendizaje': {
        eso: [
          'Búsqueda, selección y archivo de información.',
          'Edición y creación de contenidos: aplicaciones de productividad, desarrollo de aplicaciones sencillas para dispositivos móviles y web, realidad virtual, aumentada y mixta.',
          'Comunicación y colaboración en red.',
          'Publicación y difusión responsable en redes.',
        ],
      },
      'C. Seguridad y bienestar digital': {
        eso: [
          'Seguridad de dispositivos: medidas preventivas y correctivas para hacer frente a riesgos, amenazas y ataques a dispositivos.',
          'Seguridad y protección de datos: identidad, reputación digital, privacidad y huella digital. Medidas preventivas en la configuración de redes sociales y la gestión de identidades virtuales.',
          'Seguridad en la salud física y mental. Riesgos y amenazas al bienestar personal. Opciones de respuesta y prácticas de uso saludable. Situaciones de violencia y de riesgo en la red (ciberacoso, sextorsión, acceso a contenidos inadecuados, dependencia tecnológica, etc.).',
        ],
      },
      'D. Ciudadanía digital crítica': {
        eso: [
          'Interactividad en la red: libertad de expresión, etiqueta digital, propiedad intelectual y licencias de uso.',
          'Educación mediática: periodismo digital, blogosfera, estrategias comunicativas y uso crítico de la red. Herramientas para detectar noticias falsas y fraudes.',
          'Gestiones administrativas: servicios públicos en línea, registros digitales y certificados oficiales.',
          'Comercio electrónico: facturas digitales, formas de pago y criptomonedas.',
          'Ética en el uso de datos y herramientas digitales: inteligencia artificial, sesgos algorítmicos e ideológicos, obsolescencia programada, soberanía tecnológica y digitalización sostenible.',
          'Activismo en línea: plataformas de iniciativa ciudadana, cibervoluntariado y comunidades de hardware y software libres. Tipos de licencias de código libre.',
        ],
      },
    },
  },

  'Economía y Emprendimiento': {
    name: 'Economía y Emprendimiento',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. El perfil de la persona emprendedora, iniciativa y creatividad': {
        eso: [
          'El perfil de la persona emprendedora. Autoconfianza, autoconocimiento, empatía, perseverancia, iniciativa y resiliencia. Técnicas de diagnóstico de debilidades y fortalezas.',
          'Creatividad, ideas y soluciones. Pensamiento de diseño o Design thinking y otras metodologías de innovación ágil.',
          'Comunicación, motivación, negociación y liderazgo. Habilidades sociales.',
          'Gestión de emociones. Estrategias de gestión de la incertidumbre y toma de decisiones en contextos cambiantes. El error y la validación como oportunidades para aprender.',
        ],
      },
      'B. El entorno como fuente de ideas y oportunidades': {
        eso: [
          'La perspectiva económica del entorno. El problema económico: la escasez de recursos y la necesidad de elegir. La elección en economía: costes, análisis marginal, incentivos. El comportamiento de las personas en las decisiones. Comercio, bienestar y desigualdades. Singularidad económica y empresarial de Castilla-La Mancha.',
          'El entorno económico-empresarial. Los agentes económicos y el flujo circular de la renta. El funcionamiento de los mercados. El mercado y las oportunidades de negocio: análisis del entorno general o macroentorno; análisis del entorno específico o microentorno. El sistema financiero. La empresa y su responsabilidad social. La decisión empresarial y la innovación como fuente de transformación social. Políticas públicas de fomento empresarial en Castilla-La Mancha.',
          'El entorno social, cultural y ambiental desde una perspectiva económica. La economía colaborativa. La huella ecológica y la economía circular. La economía social y solidaria. Los Objetivos de Desarrollo Sostenible (ODS) y el desarrollo local. Sectores productivos y géneros del entorno cultural y artístico. Agentes que apoyan la creación de proyectos culturales emprendedores.',
          'Estrategias de exploración del entorno. Búsqueda y gestión de la información. Métodos de análisis de la competencia.',
          'La visión emprendedora.',
        ],
      },
      'C. Recursos para llevar a cabo un proyecto emprendedor': {
        eso: [
          'Misión, visión y valores de la empresa o entidad. La organización y gestión de las entidades emprendedoras. Funciones de la empresa.',
          'Los equipos en las empresas y organizaciones. Estrategias ágiles de trabajo en equipo. Formación y funcionamiento de equipos de trabajo.',
          'Las finanzas personales: el plan de ahorro personal. Las finanzas del proyecto emprendedor: control y gestión del dinero. Fuentes y control de ingresos y gastos. Recursos financieros a corto y largo plazo y su relación con el bienestar financiero. El endeudamiento. Fuentes de financiación y captación de recursos financieros. Fuentes de financiación públicas en Castilla-La Mancha. La gestión del riesgo financiero, la inflación y los seguros.',
        ],
      },
      'D. La realización del proyecto emprendedor': {
        eso: [
          'Casos de éxito en Castilla-La Mancha.',
          'El reto o desafío como objetivo.',
          'Planificación, gestión y ejecución de un proyecto emprendedor. Del reto al prototipo.',
          'Desarrollo ágil de producto.',
          'Técnicas y herramientas de prototipado rápido.',
          'Presentación e introducción del prototipo en el entorno. Estrategias de difusión.',
          'Validación y testado de prototipos. Valoración del proceso de trabajo. Innovación ágil.',
          'El usuario como destinatario final del prototipo. La toma de decisiones de los usuarios. El usuario como consumidor. Derechos y obligaciones de los consumidores.',
          'Derechos sobre el prototipo: la propiedad intelectual e industrial.',
        ],
      },
    },
  },

  'Emprendimiento, Sostenibilidad y Consumo Responsable': {
    name: 'Emprendimiento, Sostenibilidad y Consumo Responsable',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Emprendimiento': {
        eso: [
          'El conocimiento de uno mismo.',
          'El perfil de la persona emprendedora y creadora.',
          'El trabajo en equipo y la inteligencia emocional.',
          'El enfoque proactivo y la búsqueda de oportunidades.',
          'La dimensión del emprendimiento: personal, social y productiva.',
          'El valor social del emprendimiento. Experiencias en Castilla-La Mancha.',
          'La creatividad y la innovación al servicio de la sociedad.',
          'La gamificación y el desarrollo de iniciativas emprendedoras.',
        ],
      },
      'B. Sostenibilidad': {
        eso: [
          'Los ODS y la Agenda 2030.',
          'Finanzas sostenibles: longevidad y ahorro responsable. Mi proyecto de ahorro.',
          'Trabajo sostenible: hacia una economía justa. Nuevas relaciones de trabajo. Igualdad y brecha salarial.',
          'Economía circular. Las 7R. Mi proyecto de economía circular.',
          'Políticas públicas y transición verde: la solidaridad intergeneracional. Previsión social. El papel de la fiscalidad. Retos e hitos de Castilla-La Mancha.',
        ],
      },
      'C. Consumo responsable': {
        eso: [
          'Consumo responsable y sus beneficios individuales y sociales. Racionalidad limitada en la toma de decisiones.',
          '¿Qué no es consumo responsable? Las compras por impulso. Consumismo vs felicidad. La economía conductual.',
          'La influencia de la publicidad. Obsolescencia programada.',
          'Derechos de la población consumidora.',
          'Leer y entender documentos: mi contrato de trabajo, mi nómina, mis facturas y recibos.',
          'Mi presupuesto personal.',
          'Trámites cotidianos con las administraciones públicas.',
        ],
      },
    },
  },

  'Expresión Artística': {
    name: 'Expresión Artística',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Técnicas gráfico-plásticas': {
        eso: [
          'Los efectos del gesto y del instrumento: herramientas, medios y soportes. Cualidades plásticas y efectos visuales.',
          'Técnicas de dibujo y pintura: técnicas secas y húmedas.',
          'Técnicas mixtas y alternativas de las vanguardias artísticas. Posibilidades expresivas y contexto histórico.',
          'Técnicas de estampación. Procedimientos directos, aditivos, sustractivos y mixtos.',
          'Grafiti y pintura mural.',
          'Técnicas básicas de creación de volúmenes.',
          'El arte del reciclaje. Consumo responsable. Productos ecológicos, sostenibles e innovadores en la práctica artística. Arte y naturaleza.',
          'Seguridad, toxicidad e impacto medioambiental de los diferentes materiales artísticos. Prevención y gestión responsable de los residuos.',
          'Ejemplos de aplicación de técnicas gráfico-plásticas en diferentes manifestaciones artísticas y en el ámbito del diseño.',
        ],
      },
      'B. Fotografía, lenguaje visual, audiovisual y multimedia': {
        eso: [
          'Elementos y principios básicos del lenguaje visual y de la percepción. Color y composición.',
          'Narrativa de la imagen fija: encuadre y planificación, puntos de vista y angulación. La imagen secuenciada.',
          'Fotografía analógica: cámara oscura. Fotografía sin cámara (fotogramas). Técnicas fotográficas experimentales: cianotipia o antotipia.',
          'Fotografía digital. El fotomontaje digital y tradicional.',
          'Seguridad, toxicidad e impacto medioambiental de los diferentes materiales artísticos. Prevención y gestión responsable de los residuos.',
          'Narrativa audiovisual: fotograma, secuencia, escena, toma, plano y montaje. El guion y el storyboard.',
          'El proceso de creación. Realización y seguimiento: guion o proyecto, presentación final y evaluación (autorreflexión, autoevaluación y evaluación colectiva).',
          'Publicidad: recursos formales, lingüísticos y persuasivos. Estereotipos y sociedad de consumo. El sexismo y los cánones corporales y sexuales en los medios de comunicación.',
          'Campos y ramas del diseño: gráfico, de producto, de moda, de interiores, escenografía.',
          'Técnicas básicas de animación.',
          'Recursos digitales para la creación de proyectos de videoarte.',
        ],
      },
    },
  },

  Filosofía: {
    name: 'Filosofía',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. El nacimiento de la filosofía: el paso del mito al logos': {
        eso: [
          'Qué es la filosofía.',
          'Disciplinas filosóficas.',
          'El diálogo argumentativo y sus amenazas: falacias y negacionismos, entre otras.',
        ],
      },
      'B. El ser humano: antropología, psicología y sociología': {
        eso: [
          'Monismos versus dualismos.',
          'Naturaleza y cultura.',
          'Individuo y sociedad.',
          'Determinismo y libertad.',
          'Genética y ambiente.',
          'Bioconservadurismo versus transhumanismo.',
        ],
      },
      'C. Ética y problemas éticos de nuestro tiempo': {
        eso: [
          'Qué es la ética.',
          'Principales corrientes éticas.',
          'El principio de responsabilidad.',
          'La bioética.',
          'La ética ambiental.',
          'Éticas profesionales: ética médica, ética de los negocios, ética periodística, ética jurídica, entre otras.',
          'La tolerancia y sus amenazas: machismo, homofobia, racismo, xenofobia, aporofobia, entre otras.',
        ],
      },
      'D. Política y problemas políticos de nuestro tiempo': {
        eso: [
          'Qué es la política.',
          'Animal político versus contractualismo.',
          'Las diferentes formas de gobierno.',
          'Justicia y derecho.',
          'Los derechos humanos y su actualización.',
          'Problemas políticos internacionales: globalización, migraciones, narcotráfico, prostitución, cambio climático, armamentismo, guerras, trata de personas, entre otros.',
          'El feminismo y la brecha de género.',
          'La democracia y sus amenazas: demagogia, corrupción, autoritarismo, totalitarismo, entre otras.',
        ],
      },
    },
  },

  'Formación y Orientación Personal y Profesional': {
    name: 'Formación y Orientación Personal y Profesional',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. El ser humano y el conocimiento de uno mismo': {
        eso: [
          'Visión y conocimiento del ser humano desde las perspectivas psicológica, antropológica y sociológica.',
          'Psicología. Neurociencia, conducta y cognición. Sistema nervioso central y sistema nervioso periférico. Neuronas y estructura funcional del cerebro. Fundamentos biológicos de la conducta. Circuitos de recompensa y su relación con las adicciones. Bienestar y hábitos saludables. La adolescencia desde el punto de vista psicológico. Desarrollo cognitivo y desarrollo de la personalidad durante la adolescencia. Reconocimiento y control de las emociones. Desarrollo personal dentro del grupo. Influencia del grupo en el individuo.',
          'Antropología. El ser humano como ser cultural. Concepto antropológico de cultura. El ser humano como construcción cultural. Humanización y cultura. Diversidad cultural.',
          'Sociología. El ser humano como ser social. Concepto de sociedad. Estrategias de inclusión y cohesión social para mejorar la calidad de vida de las personas. El adolescente y sus relaciones. Búsqueda de la autonomía y asunción progresiva de responsabilidades. Conductas prosociales y antisociales. Normas, roles y estereotipos. Igualdad de género. Diversidad y convivencia positiva dentro de los grupos. Procesos de transición a la vida adulta en perspectiva comparada.',
        ],
      },
      'B. Formación y orientación personal y profesional hacia la vida adulta': {
        eso: [
          '1. Aprendizaje y ser humano. Procesos implicados en el aprendizaje: atención, motivación y memoria. Estrategias de aprendizaje y estudio. Inteligencia emocional e inteligencia ejecutiva. Lo heredado y lo aprendido: biología y cultura. Proceso de socialización. Agentes de socialización. Aprendizaje formal e informal.',
          '2. Construcción del sentido de competencia y logro. Autoconocimiento. Autonomía personal y autopercepción. Estilo atribucional. Capacidad autocrítica. Iniciativa personal. Pensamiento creativo. Confianza y seguridad en uno mismo. Perseverancia. Estrategias para enfrentarse al fracaso y a la frustración.',
          '3. Relaciones e interacciones con los demás. Habilidades sociales. Habilidades comunicativas. Barreras en la comunicación y estrategias para superarlas. Habilidades de organización y gestión. Herramientas digitales para la interacción con los demás. Huella y reputación digital. Gestión de identidades digitales: personal y profesional.',
          '4. Orientación hacia la formación académica y profesional. Exploración del entorno profesional. Programas, oportunidades y ayudas para la formación. Servicios de orientación académica y profesional. Formación permanente a lo largo de la vida. Exploración y descubrimiento del entorno de trabajo: las relaciones laborales. Tendencias laborales y demandas del mercado. Retos de la revolución digital. Emprendimiento e intraemprendimiento. Participación social activa. El ser humano como homo oeconomicus. Teorías críticas. Colaboración y voluntariado.',
        ],
      },
      'C. Proyecto e itinerario personal, académico y profesional. Aproximación a la búsqueda activa de empleo': {
        eso: [
          'Planes de autoconocimiento y de formación académica y profesional. Cualidades personales. Fortalezas y debilidades. La diversidad como elemento enriquecedor. Aspiraciones y metas. Fases del plan: exploración, diagnóstico, perfiles académicos y profesionales, toma de decisiones. Ayudas y recursos para superar carencias y afrontar retos personales y profesionales.',
          'Aproximación a un plan de búsqueda activa de empleo con proyección hacia el futuro. Estrategias de búsqueda de empleo. Fuentes e instrumentos de búsqueda de empleo.',
        ],
      },
    },
  },

  Latín: {
    name: 'Latín',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. El presente de la civilización latina': {
        eso: [
          'Aspectos geográficos, históricos, culturales, políticos y lingüísticos de la civilización latina presentes en la noción actual de Europa y de su cultura.',
          'Estrategias y herramientas para relacionar el pasado y el presente a partir de los conocimientos adquiridos.',
          'Obras fundamentales de la literatura latina en su contexto y su pervivencia a través de la tradición clásica.',
          'Importancia de la civilización latina en la configuración, reconocimiento y análisis crítico de nuestra identidad como sociedad.',
          'Estrategias para comprender, comentar e interpretar textos latinos a partir de los conocimientos adquiridos y de la experiencia propia.',
          'Léxico latino: evolución de los conceptos fundamentales de la civilización latina hasta la actualidad (civis, populus, sacer, homo, entre otros).',
          'Importancia de los textos clásicos latinos como testimonio de aquellos aspectos constitutivos de nuestra condición humana.',
          'El papel del humanismo y su presencia en la sociedad actual.',
        ],
      },
      'B. Latín y plurilingüismo': {
        eso: [
          'El abecedario y la pronunciación del latín, así como su permanencia e influencia en las lenguas del repertorio lingüístico individual del alumnado. Explicación de los cambios fonéticos más frecuentes desde el latín culto y el latín vulgar.',
          'Identificación de palabras con lexemas, sufijos y prefijos de origen latino en textos escritos en las lenguas de enseñanza.',
          'Procedimientos de composición y derivación latinos en la elaboración de familias de palabras.',
          'Iniciación al significado etimológico de las palabras.',
          'Estrategias básicas para inferir significados en léxico especializado y de nueva aparición a partir de la identificación de formantes latinos.',
          'Latinismos y locuciones latinas más frecuentes.',
          'Técnicas de reconocimiento, organización e incorporación a la producción escrita, oral o multimodal de léxico de raíz común entre las distintas lenguas del repertorio lingüístico individual.',
          'Comparación entre lenguas a partir de su origen y parentescos.',
          'Importancia del latín como herramienta de mejora de la expresión escrita, oral y multimodal en las distintas lenguas del repertorio lingüístico individual.',
          'Herramientas analógicas y digitales para el aprendizaje y reflexión de la lengua latina como vínculo e impulso para el aprendizaje de otras lenguas.',
        ],
      },
      'C. El texto latino y la traducción': {
        eso: [
          'Los casos y sus principales valores sintácticos.',
          'La flexión nominal, pronominal y verbal.',
          'Estructuras oracionales básicas. La concordancia y el orden de palabras.',
          'Estrategias básicas para identificar, analizar y traducir unidades lingüísticas (léxico, morfosintaxis) a partir de la comparación de las lenguas y variedades que conforman el repertorio lingüístico personal.',
          'Recursos para el aprendizaje y estrategias básicas de adquisición de lenguas tales como Portfolio Europeo de las Lenguas, glosarios o diccionarios.',
          'Reflexión y justificación de la traducción ofrecida.',
          'Retroversión de oraciones sencillas.',
          'Autoconfianza, autonomía e iniciativa. El error como parte integrante del proceso de aprendizaje.',
        ],
      },
      'D. Legado y patrimonio': {
        eso: [
          'Pervivencia del legado material (sitios arqueológicos, inscripciones, construcciones monumentales y artísticas, etc.) e inmaterial (mitología clásica, instituciones políticas, oratoria, derecho, rituales y celebraciones, etc.) de la cultura y la civilización latinas.',
          'La transmisión textual y los soportes de escritura.',
          'Características del patrimonio cultural romano y del proceso de romanización.',
          'Interés e iniciativa en participar en procesos destinados a conservar, preservar y difundir el patrimonio arqueológico de su entorno, por ejemplo, los yacimientos y parques arqueológicos de Castilla-La Mancha.',
          'Herramientas analógicas y digitales para la comprensión, producción y coproducción oral, escrita y multimodal.',
          'Respeto de la propiedad intelectual y derechos de autor sobre las fuentes consultadas y los contenidos utilizados.',
          'Estrategias y herramientas, analógicas y digitales, individuales y cooperativas, para la autoevaluación, la coevaluación y la autorreparación.',
        ],
      },
    },
  },

  'Música Activa, Movimiento y Folclore': {
    name: 'Música Activa, Movimiento y Folclore',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Escucha, visionado y percepción': {
        eso: [
          'Elementos básicos de la música, del movimiento y del folclore.',
          'Propuestas musicales y de movimiento de diferentes géneros, estilos, épocas y culturas.',
          'La música tradicional de España. El folclore de Castilla-La Mancha: canciones, instrumentos, bailes y danzas. Intérpretes, agrupaciones y principales manifestaciones.',
          'Normas de comportamiento básicas en la recepción de la música, del movimiento y del folclore: silencio, respeto y valoración.',
          'Herramientas y plataformas digitales de música.',
        ],
      },
      'B. Interpretación, improvisación y creación': {
        eso: [
          'La partitura. Grafías convencionales y no convencionales: conocimiento, identificación y aplicación en la lectura y escritura musical.',
          'Técnicas elementales para la interpretación: técnicas vocales, instrumentales, corporales y gestuales.',
          'Técnicas de estudio y de control de emociones.',
          'Técnicas de improvisación y/o creación guiada y libre.',
          'Técnicas de ejecución y creación de danzas y coreografías.',
          'Posibilidades sonoras y musicales de distintas fuentes y objetos sonoros.',
          'Paisajes sonoros con objetos, medios vocales, instrumentales, corporales y nuevas tecnologías.',
          'El cuidado de la voz, del cuerpo y de los instrumentos.',
          'Repertorio de distintos tipos de música vocal, instrumental o corporal individual y/o grupal.',
          'Repertorio de manifestaciones expresivas de la música, del movimiento y del folclore de España y, en particular, de Castilla-La Mancha.',
          'Normas de comportamiento básicas en la interpretación y creación musical.',
        ],
      },
    },
  },

  'Proyectos de Robótica': {
    name: 'Proyectos de Robótica',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Proceso de resolución de problemas': {
        eso: [
          'Técnicas o estrategias de generación de ideas para la resolución de problemas cotidianos, mediante la programación y su aplicación en sistemas automáticos y robots.',
          'Proyectos colaborativos y cooperativos que resuelvan necesidades del centro y el entorno.',
          'Motivación e interés en la resolución de problemas.',
          'Herramientas digitales de programación y simulación que faciliten la comprensión de sistemas robóticos y ayuden a la resolución de problemas.',
        ],
      },
      'B. Diseño 3D y fabricación digital': {
        eso: [
          'Uso de programas CAD en 3D para el diseño y fabricación de piezas aplicadas a proyectos.',
          'Técnicas de fabricación digital: impresión 3D y corte.',
        ],
      },
      'C. Electrónica analógica y digital aplicadas a la robótica': {
        eso: [
          'Señales analógica y digital en robótica.',
          'Electrónica analógica y digital: componentes aplicados a la robótica y su funcionamiento. Simbología.',
          'Análisis, montaje y simulación de circuitos sencillos con componentes analógicos y digitales aplicados a la robótica.',
        ],
      },
      'D. Pensamiento computacional: programación de sistemas técnicos': {
        eso: [
          'Programación por bloques y con código.',
          'Algoritmos, diagramas de flujo.',
          'Elementos básicos de programación. Variables: tipos. Operadores aritméticos y lógicos. Estructuras de decisión: bucles y condicionales. Funciones.',
          'Aplicación de plataformas de control en la experimentación con prototipos diseñados.',
          'Programación de aplicaciones en dispositivos móviles.',
        ],
      },
      'E. Automatización y robótica': {
        eso: [
          'Sensores y actuadores básicos. Características técnicas y funcionamiento. Aplicaciones prácticas.',
          'Componentes de un robot. Grados de libertad (articulaciones), movimientos y sistemas de posicionamiento para robot.',
          'Diseño, construcción y control de robots y/o sistemas automáticos sencillos, de manera física.',
          'Iniciación a la inteligencia artificial y big data: aplicaciones.',
          'Sistemas de comunicación en plataformas de control: alámbrica e inalámbricas. Internet de las cosas. Aplicaciones prácticas.',
        ],
      },
      'F. Desarrollo sostenible en la robótica': {
        eso: [
          'Sostenibilidad en la selección de materiales y en el diseño de procesos y sistemas automáticos y robóticos.',
          'Fabricación sostenible mediante robots: reducción tanto de los materiales empleados como del consumo energético.',
          'Contribución de la inteligencia artificial al desarrollo sostenible.',
        ],
      },
    },
  },

  'Proyectos de Artes Plásticas y Visuales': {
    name: 'Proyectos de Artes Plásticas y Visuales',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. El proceso creativo': {
        eso: [
          'Fases del proceso creativo.',
          'Planteamiento de un proyecto artístico: necesidades y objetivos.',
          'Estrategias creativas para la resolución de problemas. Técnicas de pensamiento divergente. Visual thinking.',
        ],
      },
      'B. El arte para entender el mundo': {
        eso: [
          'El arte como medio de expresión a lo largo de la historia.',
          'Reconocimiento de valores comunicativos, artísticos y expresivos en las imágenes fijas y en movimiento.',
          'El arte en el entorno más cercano: movimientos culturales y museos.',
        ],
      },
      'C. Experimentación con técnicas artísticas': {
        eso: [
          'Técnicas y medios gráfico-plásticas.',
          'Técnicas y medios audiovisuales.',
          'Experimentación y aplicación de técnicas en proyectos.',
        ],
      },
      'D. La actividad artística interdisciplinar relacionada con el entorno educativo': {
        eso: [
          'Arte y ciencia.',
          'Arte y naturaleza. Reciclaje, ecología y sostenibilidad.',
          'Trabajos artísticos para modificar espacios escolares. La instalación en la escuela.',
          'El proyecto artístico interdisciplinar.',
        ],
      },
    },
  },

  'Segunda Lengua Extranjera': {
    name: 'Segunda Lengua Extranjera',
    courseKeys: ['1-2', '3-4'],
    courseLabels: CLM_ESO_LABELS_12_34,
    blocs: {
      'A. Comunicación': {
        '1-2': [
          'Autoconfianza. El error como instrumento de mejora y propuesta de reparación.',
          'Estrategias básicas para la comprensión, la planificación y la producción de textos orales, escritos y multimodales breves, sencillos y contextualizados.',
          'Conocimientos, destrezas y actitudes que permiten iniciarse en actividades de mediación en situaciones cotidianas básicas tales como parafraseo, equivalencia y síntesis.',
          'Funciones comunicativas básicas adecuadas al ámbito y al contexto: saludar, despedirse, presentar y presentarse, dar las gracias; describir personas, objetos y lugares; situar eventos en el tiempo; situar objetos, personas y lugares en el espacio; pedir e intercambiar información sobre cuestiones cotidianas; describir rutinas; dar indicaciones e instrucciones; expresar la pertenencia, la cantidad y el espacio.',
          'Modelos contextuales y géneros discursivos básicos en la comprensión, producción y coproducción de textos orales, escritos y multimodales, breves y sencillos, literarios y no literarios (folletos, instrucciones, normas, avisos o conversaciones reguladoras de la convivencia): características y reconocimiento del contexto, organización y estructuración según la estructura interna.',
          'Unidades lingüísticas básicas y significados asociados a dichas unidades, tales como expresión de la entidad y sus propiedades, cantidad y número, el espacio y las relaciones espaciales, el tiempo, la afirmación, la negación, la interrogación y la exclamación, relaciones lógicas elementales.',
          'Léxico básico y de interés para el alumnado relativo a identificación personal, relaciones interpersonales próximas, lugares y entornos cercanos, ocio y tiempo libre, vida cotidiana.',
          'Patrones sonoros, acentuales, rítmicos y de entonación básicos, y funciones comunicativas generales asociadas a dichos patrones.',
          'Convenciones ortográficas básicas y significados asociados a los formatos y elementos gráficos.',
          'Convenciones y estrategias conversacionales básicas, en formato síncrono o asíncrono, para iniciar, mantener y terminar la comunicación, tomar y ceder la palabra, pedir y dar aclaraciones y explicaciones, comparar y contrastar, colaborar, etc.',
          'Recursos para el aprendizaje y estrategias para la búsqueda guiada de información en medios analógicos y digitales.',
          'Propiedad intelectual de las fuentes consultadas y contenidos utilizados.',
          'Herramientas analógicas y digitales básicas para la comprensión, producción y coproducción oral, escrita y multimodal, y plataformas virtuales de interacción, cooperación y colaboración educativa (aulas virtuales, videoconferencias, herramientas digitales colaborativas...) para el aprendizaje, la comunicación y el desarrollo de proyectos con hablantes o estudiantes de la lengua extranjera.',
          'Recursos para realizar actividades de contraste, verificación y análisis críticos, de textos informativos (visuales, auditivos y escritos) provenientes especialmente de redes sociales para el desarrollo del pensamiento crítico frente a la desinformación.',
        ],
        '3-4': [
          'Autoconfianza e iniciativa. Aceptación del error como parte integrante del proceso de aprendizaje.',
          'Estrategias de uso común para la planificación, ejecución, control y reparación de la comprensión, la producción y la coproducción de textos orales, escritos y multimodales.',
          'Conocimientos, destrezas y actitudes que permiten llevar a cabo actividades de mediación en situaciones cotidianas (parafraseo, equivalencia y síntesis).',
          'Funciones comunicativas de uso común adecuadas al ámbito y al contexto comunicativo: saludar y despedirse, presentar y presentarse; describir personas, objetos, lugares, fenómenos y acontecimientos; situar eventos en el tiempo; situar objetos, personas y lugares en el espacio; pedir e intercambiar información sobre cuestiones cotidianas; dar y pedir instrucciones, consejos y órdenes; ofrecer, aceptar y rechazar ayuda, proposiciones o sugerencias; expresar parcialmente el gusto o el interés y las emociones, incluidas las discrepancias; narrar acontecimientos pasados, describir situaciones presentes, y enunciar sucesos futuros y establecer comparaciones; expresar la opinión, la posibilidad, la capacidad, la obligación y la prohibición; expresar argumentaciones sencillas; realizar hipótesis y suposiciones; expresar la incertidumbre y la duda; reformular y resumir.',
          'Modelos contextuales y géneros discursivos de uso común en la comprensión, producción y coproducción de textos orales, escritos y multimodales, breves y sencillos, literarios y no literarios: características y reconocimiento del contexto participantes y situación, expectativas generadas por el contexto; organización y estructuración según el género, la función textual y la estructura.',
          'Unidades lingüísticas de uso común y significados asociados a dichas unidades tales como expresión de la entidad y sus propiedades, cantidad y cualidad, el espacio y las relaciones espaciales, el tiempo y las relaciones temporales, la afirmación, la negación, la interrogación y la exclamación, relaciones lógicas habituales.',
          'Léxico de uso común y de interés para el alumnado relativo a identificación personal, relaciones interpersonales, lugares y entornos, ocio y tiempo libre, salud y actividad física, vida cotidiana, vivienda y hogar, clima y entorno natural, tecnologías de la información y la comunicación, sistema escolar y formación.',
          'Patrones sonoros, acentuales, rítmicos y de entonación de uso común, y significados e intenciones comunicativas generales asociadas a dichos patrones.',
          'Convenciones ortográficas de uso común y significados e intenciones comunicativas asociados a los formatos, patrones y elementos gráficos.',
          'Convenciones y estrategias conversacionales de uso común, en formato síncrono o asíncrono, para iniciar, mantener y terminar la comunicación, tomar y ceder la palabra, pedir y dar aclaraciones y explicaciones, reformular, comparar y contrastar, resumir, colaborar, debatir, indicar que sigue el hilo de una conversación, etc.',
          'Recursos para el aprendizaje y estrategias de uso común de búsqueda y selección de información: diccionarios, libros de consulta, bibliotecas, recursos digitales e informáticos, etc. Distinción de fuentes fidedignas.',
          'Respeto de la propiedad intelectual y derechos de autor sobre las fuentes consultadas y contenidos utilizados.',
          'Herramientas analógicas y digitales de uso común para la comprensión, producción y coproducción oral, escrita y multimodal; y plataformas virtuales de interacción, cooperación y colaboración educativa (aulas virtuales, videoconferencias, herramientas digitales colaborativas...) para el aprendizaje, la comunicación y el desarrollo de proyectos con hablantes o estudiantes de la lengua extranjera.',
          'Recursos para profundizar en actividades de contraste, verificación y análisis críticos, de textos informativos (visuales, auditivos y escritos) provenientes especialmente de redes sociales para el desarrollo del pensamiento crítico frente a la desinformación.',
        ],
      },
      'B. Plurilingüismo': {
        '1-2': [
          'Estrategias y técnicas de compensación de las carencias comunicativas para responder eficazmente a una necesidad concreta, a pesar de las limitaciones derivadas del nivel de competencia en la lengua extranjera y en las demás lenguas del repertorio lingüístico propio.',
          'Estrategias básicas para identificar, organizar, retener, recuperar y utilizar unidades lingüísticas (léxico, morfosintaxis, patrones sonoros, etc.) a partir de la comparación de las lenguas y variedades que conforman el repertorio lingüístico personal.',
          'Estrategias y herramientas básicas de autoevaluación y coevaluación, analógicas y digitales, individuales y cooperativas.',
          'Léxico y expresiones básicos para comprender enunciados sobre la comunicación, la lengua, el aprendizaje y las herramientas de comunicación y aprendizaje (metalenguaje).',
          'Comparación elemental entre lenguas a partir de elementos de la lengua extranjera y otras lenguas: origen y parentescos, estableciendo semejanzas y diferencias que favorezcan y desarrollen la interlengua.',
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
          'La lengua extranjera como medio de comunicación y relación con personas de otros países, como forma de acceder a nueva información y como medio para conocer culturas y modos de vida diferentes.',
          'Valoración positiva e interés por establecer contactos y comunicarse a través de diferentes medios con hablantes o estudiantes de la lengua extranjera.',
          'Aspectos socioculturales y sociolingüísticos básicos relativos a las costumbres, la vida cotidiana y las relaciones interpersonales, las convenciones sociales básicas de uso común, el lenguaje no verbal, la cortesía lingüística y la etiqueta digital propias de países donde se habla la lengua extranjera.',
          'Personajes relevantes del ámbito histórico, cultural y científico, destacando los femeninos, pertenecientes a países hablantes de la lengua extranjera.',
          'Estrategias básicas para entender y apreciar la diversidad lingüística, cultural y artística, a partir de valores ecosociales y democráticos.',
          'El legado artístico, literario, patrimonial y natural propio de países de la lengua extranjera.',
          'Estrategias de detección de usos discriminatorios del lenguaje verbal y no verbal.',
          'Estrategias básicas para el desarrollo de una modalidad lingüística respetuosa e inclusiva.',
          'Estrategias básicas para el reconocimiento de las diferencias existentes entre las distintas sociedades y culturas, incluyendo la castellano-manchega.',
          'Estrategias básicas para interpretar los comportamientos que son reflejo de aspectos socioculturales, como las relaciones sociales, los saludos, la distancia física, los gestos, la edad, la familia, las fiestas, el ocio, la casa, la cortesía, los rituales, etc.',
        ],
        '3-4': [
          'La lengua extranjera como medio de comunicación interpersonal e internacional, fuente de información y como herramienta de participación social y de enriquecimiento personal.',
          'Interés e iniciativa en la realización de intercambios comunicativos a través de diferentes medios con hablantes o estudiantes de la lengua extranjera, respetando sus derechos.',
          'Patrones culturales de uso común propios de la lengua extranjera.',
          'Aspectos socioculturales y sociolingüísticos de uso común relativos a la vida cotidiana, las condiciones de vida y las relaciones interpersonales; convenciones sociales de uso común; lenguaje no verbal, cortesía lingüística y etiqueta digital; cultura, normas, actitudes, costumbres y valores propios de países donde se habla la lengua extranjera.',
          'Personajes relevantes del ámbito histórico, cultural y científico, destacando los femeninos, pertenecientes a países hablantes de la lengua extranjera.',
          'Estrategias de uso común para entender y apreciar la diversidad lingüística, cultural y artística, atendiendo a valores ecosociales y democráticos y de desarrollo sostenible.',
          'El legado artístico, literario, patrimonial y natural de países de habla de la lengua extranjera.',
          'Estrategias de uso común de detección y actuación ante usos discriminatorios del lenguaje verbal y no verbal.',
          'Reflexión y toma de conciencia sobre la posibilidad de transmitir un mensaje diferente al que se pretende y el intento de explicarlo de forma sencilla.',
          'Toma de conciencia de la dificultad que se da en la interacción con miembros de otras culturas.',
          'Estrategias básicas para el desarrollo de una modalidad lingüística respetuosa e inclusiva.',
          'Estrategias básicas para el reconocimiento de las diferencias existentes entre las distintas sociedades y culturas, incluyendo la castellano-manchega.',
          'Estrategias básicas para interpretar los comportamientos que son reflejo de aspectos socioculturales, como las relaciones sociales, los saludos, la distancia física, los gestos, la edad, la familia, las fiestas, el ocio, la casa, la cortesía, los rituales, etc.',
        ],
      },
    },
  },

  'Taller de Emprendimiento y Finanzas Personales': {
    name: 'Taller de Emprendimiento y Finanzas Personales',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Introducción a la economía y a las finanzas personales': {
        eso: [
          'Definición de economía. Factores productivos. Sectores económicos.',
          'Indicadores económicos básicos: el interés, la inflación y la tasa de desempleo.',
          'Economía pública. Déficit y deuda pública. Fraude y economía sumergida.',
          'El dinero. El sistema financiero.',
          'Instrumentos de pago. Tarjetas de débito y de crédito. Préstamos y créditos.',
          'El riesgo de los productos financieros.',
          'La gestión de ingresos y gastos en las finanzas personales. Importancia del ahorro.',
          'Consumo responsable. Derechos del consumidor.',
          'Publicidad y promociones.',
          'El peligro del juego y las apuestas.',
          'Documentos de economía familiar.',
        ],
      },
      'B. Autoconocimiento, responsabilidad, creatividad y trabajo en equipo': {
        eso: [
          'Autonomía e iniciativa personal.',
          'Autoconocimiento: fortalezas y debilidades personales.',
          'Inteligencia emocional.',
          'Dinámicas para el fomento de la creatividad y el espíritu innovador.',
          'Habilidades de comunicación.',
          'Trabajo cooperativo: asunción de funciones.',
        ],
      },
      'C. Emprendimiento y proyecto empresarial': {
        eso: [
          'El emprendedor y sus cualidades. Tipos de emprendedor.',
          'El valor social del emprendimiento.',
          'Técnicas de estímulo para el desarrollo de ideas emprendedoras.',
          'El empresario y la empresa como fuente de creación de riqueza.',
          'Tipos de empresas. Entorno empresarial. La investigación de mercado.',
          'La responsabilidad social corporativa y la cultura empresarial.',
          'El proyecto de empresa: concepto, estructura y planificación.',
          'El plan de marketing.',
        ],
      },
    },
  },

  Tecnología: {
    name: 'Tecnología',
    courseKeys: ['eso'],
    courseLabels: CLM_ESO_LABELS_SINGLE,
    blocs: {
      'A. Proceso de resolución de problemas': {
        eso: [
          'Estrategias de gestión de proyectos colaborativos y técnicas iterativas de resolución de problemas. Método de proyectos.',
          'Estudio de necesidades del centro, locales, regionales, etc. Planteamiento de proyectos colaborativos o cooperativos.',
          'Técnicas de ideación.',
          'Emprendimiento, perseverancia y creatividad en la resolución de problemas desde una perspectiva interdisciplinar de la actividad tecnológica y satisfacción e interés por el trabajo realizado y la calidad del mismo.',
          'Ciclo de vida de un producto y sus fases. Análisis sencillos.',
          'Estrategias de selección de materiales en base a sus propiedades o requisitos.',
          'Herramientas de diseño asistido por ordenador en tres dimensiones en la representación o fabricación de piezas aplicadas a proyectos.',
          'Técnicas de fabricación manual y mecánica. Aplicaciones prácticas.',
          'Técnicas de fabricación digital. Impresión en tres dimensiones y corte. Aplicaciones prácticas.',
          'Presentación y difusión del proyecto. Elementos, técnicas y herramientas. Comunicación efectiva: entonación, expresión, gestión del tiempo, adaptación del discurso y uso de un lenguaje inclusivo, libre de estereotipos sexistas.',
        ],
      },
      'B. Operadores tecnológicos': {
        eso: [
          'Electrónica analógica. Componentes básicos, simbología, análisis y montaje físico y simulado de circuitos elementales.',
          'Electrónica digital básica.',
          'Neumática básica. Circuitos.',
          'Elementos mecánicos, electrónicos y neumáticos aplicados a la robótica. Montaje físico o simulado.',
        ],
      },
      'C. Pensamiento computacional, automatización y robótica': {
        eso: [
          'Componentes de sistemas de control programado: controladores, sensores y actuadores.',
          'El ordenador y los dispositivos móviles como elementos de programación y control. Trabajo con simuladores informáticos en la verificación y comprobación del funcionamiento de los sistemas diseñados. Iniciación a la inteligencia artificial y el big data: aplicaciones. Espacios compartidos y discos virtuales.',
          'Telecomunicaciones en sistemas de control digital: internet de las cosas; elementos, comunicaciones y control. Aplicaciones prácticas.',
          'Robótica. Diseño, construcción y control de robots o sistemas automáticos sencillos de manera física o simulada.',
        ],
      },
      'D. Tecnología sostenible': {
        eso: [
          'Sostenibilidad y accesibilidad en la selección de materiales y diseño de procesos, de productos y sistemas tecnológicos.',
          'Arquitectura bioclimática y sostenible. Ahorro energético en edificios.',
          'Transporte y sostenibilidad.',
          'Comunidades de aprendizaje abiertas, voluntariado tecnológico y proyectos de servicio a la comunidad.',
        ],
      },
    },
  },
};
