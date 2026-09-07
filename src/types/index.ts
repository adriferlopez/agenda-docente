import type { Etapa, Comunitat } from '@/data/curriculum/types';

export type Language = 'es' | 'ca' | 'en' | 'eu' | 'gl';

/** Etapes efectives d'un docent: les que ha triat, o ['primaria'] per defecte si encara no n'ha triat cap. */
export function getEffectiveEtapas(profile?: Pick<UserProfile, 'etapas'> | null): Etapa[] {
  return profile?.etapas && profile.etapas.length > 0 ? profile.etapas : ['primaria'];
}

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = lunes ... 6 = domingo (configurable)

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  language: Language;
  activeSchoolYearId?: string;
  googleCalendarConnected?: boolean;
  googleDriveConnected?: boolean;
  hasGeminiKey?: boolean;
  createdAt: number;
  dashboardWidgets?: Array<{ id: string; active: boolean; order: number }>;
  /** Etapes educatives que imparteix el docent (pot ser-ne més d'una, p.ex. Primària i Infantil). Per defecte ['primaria']. */
  etapas?: Etapa[];
  /** Comunitat autònoma del docent (per filtrar els saberes curriculars disponibles). Per defecte 'catalunya'. */
  comunitat?: Comunitat;
  /** Rutas (p.ej. "/notas") elegidas para el menú inferior en móvil, máximo MAX_MOBILE_NAV_ITEMS (ver navItems.ts). Si no está definido, se usa el valor por defecto. */
  mobileNavItems?: string[];
  /** Lado de la barra inferior móvil donde va el botón fijo que despliega el menú completo. Por defecto 'right'. */
  mobileMoreButtonSide?: 'left' | 'right';
  /** Preferencia de visualización del alumnado en la libreta de Notas (formato de nombre y orden). Si no está definido, se usa apellido-nombre + orden alfabético. */
  gradesStudentDisplay?: { nameFormat: StudentNameFormat; sortMode: StudentSortMode };
  /**
   * Estado del tour de bienvenida (ver OnboardingTour). Se fija explícitamente
   * a `false` al crear la cuenta (registro por email o primer login con
   * Google) para que solo se muestre a usuarios recién registrados: las
   * cuentas ya existentes nunca tienen este campo, por lo que quedan como
   * `undefined` y no lo ven. Pasa a `true` quien lo completa o lo salta
   * marcando "no volver a mostrar".
   */
  onboardingSeen?: boolean;
  /** Si es true, en la vista semanal de Programación semanal no se muestran las tarjetas de asignatura de los días marcados como festivo del centro (solo el aviso de festivo). Por defecto false (se siguen mostrando). */
  hideSubjectsOnHolidays?: boolean;
  /** Estilo visual de las tarjetas de asignatura en la vista semanal de Programación semanal. Por defecto 'colorBg' (el estilo original: fondo de color pastel). */
  weeklyCalendarStyle?: WeeklyCalendarStyle;
}

/**
 * Estilos disponibles para las tarjetas de asignatura en la vista semanal:
 * - colorBg: fondo de color pastel de la asignatura (estilo original).
 * - colorTitleWhite: fondo blanco, solo el título de color.
 * - colorTitleTheme: fondo del color de fondo del tema activo, título de color.
 * - stripe: fondo blanco, franja de color a la izquierda a modo de acento.
 */
export const WEEKLY_CALENDAR_STYLES = ['colorBg', 'colorTitleWhite', 'colorTitleTheme', 'stripe'] as const;
export type WeeklyCalendarStyle = typeof WEEKLY_CALENDAR_STYLES[number];

/** Formato de visualización del nombre de un alumno/a en listados. */
export type StudentNameFormat = 'lastFirst' | 'firstLast' | 'firstOnly';
/** Modo de orden del alumnado en un listado: alfabético o personalizado (arrastrar y soltar). */
export type StudentSortMode = 'alpha' | 'manual';

/** Periodo de evaluación (trimestre, semestre...) dentro de un curso escolar. Personalizable por centro. */
export interface Term {
  id: string;
  name: string; // "1r trimestre", "Semestre 1"...
  startDate: string; // ISO date
  endDate: string; // ISO date
}

export interface SchoolYear {
  id: string;
  ownerId: string;
  name: string; // "2025-2026"
  startDate: string; // ISO date
  endDate: string; // ISO date
  createdAt: number;
  /** Periodos de evaluación del curso. Si no está definido, se usan 3 trimestres por defecto repartidos entre startDate/endDate. */
  terms?: Term[];
}

// Veinte colores en total: los doce originales (seis tonos "pastel",
// emparejados con un tono "profundo" del mismo círculo cromático: lav↔plum,
// mint↔forest, peach↔terracotta, rose↔fuchsia, sky↔indigo, butter↔lime) más
// ocho colores nuevos (teal, cyan, blue, yellow, orange, crimson, stone,
// slate) que cubren tonalidades que no tenían representación (azules/verdes
// agua, amarillo puro, un rojo distinto de terracotta, y dos grises neutros
// para asignaturas "de apoyo" que no quieren un color llamativo).
export const SUBJECT_COLORS = [
  'lav', 'plum',
  'mint', 'forest',
  'peach', 'terracotta',
  'rose', 'fuchsia',
  'sky', 'indigo',
  'butter', 'lime',
  'teal', 'cyan',
  'blue', 'yellow',
  'orange', 'crimson',
  'stone', 'slate',
] as const;
export type SubjectColor = typeof SUBJECT_COLORS[number];

export interface Subject {
  id: string;
  ownerId: string;
  schoolYearId: string;
  name: string;
  courseLevel?: string; // "3º ESO", "1º Bach", etc. (opcional: el docente puede impartir varios cursos)
  group: string; // "A", "B"...
  color: SubjectColor;
  // Grupo de alumnos (StudentGroup) vinculado a esta asignatura. Varias
  // asignaturas pueden compartir el mismo studentGroupId y así comparten la
  // lista de alumnos.
  studentGroupId?: string;
  // Àrees del currículum (p.ej. "Matemàtiques") a las que corresponde esta
  // asignatura. Se usa para decidir en qué asignaturas aparece como columna
  // evaluable una actividad cuya rúbrica combina CE de varias àrees.
  curriculumAreas?: string[];
  // Orden manual elegido por el docente (arrastrar y soltar) en el listado
  // de asignaturas. Si no está definido, se usa createdAt como fallback.
  order?: number;
  // Oculta la asignatura del listado principal de Asignaturas (p.ej.
  // refuerzos o asignaturas que no requieren usar la app). Sigue existiendo
  // con normalidad en el resto de la app (Horario, Notas, etc.) — solo se
  // esconde visualmente en esta página, desde su pestaña "Ocultas".
  hidden?: boolean;
  // Objetivos didácticos generales de la PGA para esta asignatura (texto
  // libre, uno por línea), que Profi usa como base para extraer/adaptar los
  // objetivos concretos de cada Situación de Aprendizaje (ver
  // LearningSituation.objectives). Opcional: si no se rellena, Profi genera
  // los objetivos de la SA a partir únicamente de sus sesiones.
  pgaObjectives?: string;
  createdAt: number;
}

export const SPECIAL_SLOT_TYPES = ['patio', 'refuerzo', 'guardia', 'tutoria', 'otro'] as const;
export type SpecialSlotType = typeof SPECIAL_SLOT_TYPES[number];

export interface TimetableSlot {
  id: string;
  ownerId: string;
  schoolYearId: string;
  day: WeekDay;
  startTime: string; // "08:30"
  endTime: string;   // "09:30"
  room?: string;
  // Una franja es O BIEN una asignatura (subjectId definido) O BIEN una
  // franja especial (specialType definido), nunca ambas.
  subjectId?: string;
  specialType?: SpecialSlotType;
  specialLabel?: string; // etiqueta personalizada cuando specialType === 'otro'
  // Color de la franja especial (patio, guardia...). Solo se usa cuando
  // subjectId no está definido: si es una asignatura, el color viene de
  // Subject.color en su lugar.
  color?: SubjectColor;
}

/** Definición de una franja horaria del horario, configurable por día. */
export interface TimeSlotDef {
  id: string;
  ownerId: string;
  schoolYearId: string;
  day: WeekDay;
  startTime: string; // "08:30"
  endTime: string;   // "09:25"
  order: number; // orden de la franja dentro del día
}

export interface DriveAttachment {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
}

export interface RubricCriterion {
  id: string;
  description: string;
  levels: { label: string; description: string; points: number }[];
}

export const DAY_STATUS_TYPES = ['absence', 'outing', 'holiday', 'other'] as const;
export type DayStatusType = typeof DAY_STATUS_TYPES[number];

export interface WeeklyPlan {
  id: string;
  ownerId: string;
  schoolYearId: string;
  timetableSlotId: string;
  subjectId: string;
  weekStartDate: string; // ISO date (lunes de esa semana)
  title: string;
  description: string;
  driveAttachments: DriveAttachment[];
  rubric: RubricCriterion[];
  rubricId?: string; // ID de rúbrica del módulo de notas (opcional)
  // Si tiene rubricId, indica si esta actividad debe aparecer como columna
  // evaluable en la libreta de notas. Por defecto true en cuanto hay rubricId;
  // el docente puede desmarcarla (o "eliminar la columna") sin perder la
  // planificación de la sesión.
  evaluate?: boolean;
  postClassEvaluation?: string;
  aiSuggestions?: string;
  status: 'planned' | 'done' | 'evaluated';
  // Campos usados en la programación anual
  aiObjectives?: string;
  curriculumItemIds?: string[];
  referenceImageUrl?: string;
  // Situación de Aprendizaje a la que pertenece esta actividad. `saLabel` es
  // el campo legacy (texto libre, agrupado por coincidencia exacta entre
  // actividades consecutivas); se mantiene solo para poder migrar datos
  // antiguos. `saId` es el campo actual: referencia al id de un documento
  // LearningSituation real, asignado desde un desplegable en vez de escrito
  // a mano. Ver migrateLegacySaLabels en firebase/learningSituations.ts.
  saLabel?: string;
  saId?: string;
  // Cuando el docente marca este día como ausencia/salida/festivo: la sesión
  // se pinta en gris y no se puede escribir programación (title/description)
  // mientras esté marcada. `color` es opcional: si no se elige ninguno, la
  // vista mensual usa el color por defecto de ese tipo de evento.
  dayStatus?: { type: DayStatusType; note?: string; color?: PastelFolderColor };
  createdAt: number;
  updatedAt: number;
}

// ---------------------------------------------------------------------
// Tareas pendientes del docente (checklist propia o por asignatura)
// ---------------------------------------------------------------------

/**
 * Tarea pendiente del docente: puede estar vinculada a una asignatura o ser
 * una tarea propia (subjectId ausente). Funciona como un ítem marcable de
 * checklist, con fecha límite opcional. Al marcarla como hecha (done: true)
 * pasa al archivo de "tareas realizadas", desde donde se puede recuperar
 * individualmente, recuperar todas de golpe (con opción de deshacer esa
 * acción concreta) o eliminar permanentemente.
 */
export interface TeacherTask {
  id: string;
  ownerId: string;
  schoolYearId: string;
  title: string;
  subjectId?: string; // ausente = tarea propia del docente (sin asignatura)
  dueDate?: string; // ISO yyyy-MM-dd
  done: boolean;
  completedAt?: number;
  createdAt: number;
  updatedAt: number;
}

/**
 * Situación de Aprendizaje (SA): agrupa un conjunto de actividades
 * (WeeklyPlan.saId) de una asignatura. Nº de sesiones, fechas, curso, ciclo,
 * trimestre y área NO se guardan aquí: se calculan siempre a partir de las
 * actividades vinculadas (ver AnnualPlanningPage), para que nunca queden
 * desincronizados. Lo que sí se guarda es lo que el docente escribe o pide a
 * Profi que genere.
 */
export interface LearningSituation {
  id: string;
  ownerId: string;
  schoolYearId: string;
  subjectId: string;
  name: string;
  objectives?: string;
  methodology?: string;
  resources?: string;
  diversityAttention?: string;
  sabers?: string;
  evaluationCriteria?: string;
  // Overrides manuales de la matriz "actividad × CE": activityId (WeeklyPlan.id)
  // -> lista de ceId marcados para esa actividad. Si una actividad no aparece
  // aquí, se usan las CE derivadas automáticamente de su rúbrica vinculada.
  ceMatrixOverrides?: Record<string, string[]>;
  createdAt: number;
  updatedAt: number;
}

export interface CurriculumItem {
  id: string;
  ownerId: string;
  subjectId: string;
  courseLevel: string;
  code: string;
  block?: string;
  description: string;
}

export interface Meeting {
  id: string;
  ownerId: string;
  schoolYearId: string;
  title: string;
  date: string; // ISO date (yyyy-MM-dd)
  notes: string;
  driveAttachments: DriveAttachment[];
  // Texto pegado por el docente (transcripción, contenido de un documento...)
  // que, junto con `notes`, se usa para generar el resumen con IA.
  summarySourceText: string;
  aiSummary?: string;
  time?: string; // HH:MM opcional
  // Carpeta personalizada (MeetingFolder) en la que el docente ha clasificado
  // esta reunión. Si no está definida, la reunión aparece como "sin carpeta".
  folderId?: string;
  createdAt: number;
  updatedAt: number;
}

// Colores pastel disponibles para las carpetas de reuniones: subconjunto
// "pastel" de SUBJECT_COLORS (sin sus parejas "profundas").
export const PASTEL_FOLDER_COLORS = ['lav', 'mint', 'peach', 'rose', 'sky', 'butter'] as const;
export type PastelFolderColor = typeof PASTEL_FOLDER_COLORS[number];

/** Carpeta personalizada para organizar las reuniones por gusto del docente. */
export interface MeetingFolder {
  id: string;
  ownerId: string;
  schoolYearId: string;
  name: string;
  color: PastelFolderColor;
  // Orden manual elegido por el docente (arrastrar y soltar). Si no está
  // definido, se usa createdAt como fallback.
  order?: number;
  createdAt: number;
}

/** Carpeta personalizada para organizar el Mural (notas y enlaces), mismo patrón que MeetingFolder. */
export interface MuralFolder {
  id: string;
  ownerId: string;
  schoolYearId: string;
  name: string;
  color: PastelFolderColor;
  order?: number;
  createdAt: number;
}

/**
 * Un "item" del Mural: una nota de texto y/o un enlace (a un documento de
 * Google Drive o a cualquier web) que el docente quiere tener siempre a
 * mano. Ambos campos son opcionales e independientes para dar flexibilidad
 * (solo nota, solo enlace, o los dos a la vez).
 */
export interface MuralItem {
  id: string;
  ownerId: string;
  schoolYearId: string;
  title: string;
  note?: string;
  linkUrl?: string;
  folderId?: string;
  // Marcado como favorito: aparece en el widget de Inicio.
  favorite?: boolean;
  // Orden manual entre los favoritos, para el widget de Inicio (arrastrar o
  // flechas). Los items no favoritos no necesitan orden.
  favoriteOrder?: number;
  createdAt: number;
  updatedAt: number;
}

// ---------------------------------------------------------------------
// Alumnos
// ---------------------------------------------------------------------

/**
 * Un grupo de alumnos (p.ej. "3º ESO A"). Es independiente de las
 * asignaturas: una asignatura se vincula a uno o varios grupos, y todas las
 * asignaturas de ese grupo comparten la misma lista de alumnos.
 */
export interface StudentGroup {
  id: string;
  ownerId: string;
  schoolYearId: string;
  name: string; // "3º ESO A"
  createdAt: number;
}

export interface Student {
  id: string;
  ownerId: string;
  schoolYearId: string;
  groupId: string;
  firstName: string;
  lastName: string;
  // Orden manual elegido por el docente (arrastrar y soltar) en la libreta de
  // notas. Si no está definido, se usa createdAt como fallback.
  order?: number;
  createdAt: number;
}

// ---------------------------------------------------------------------
// Banco de comentarios de notas
// ---------------------------------------------------------------------

/**
 * Plantilla de comentario reutilizable, con huecos que se autocompletan.
 * Los huecos se escriben como {nombre}, y opcionalmente huecos de elección
 * como {actitud:positiva/negativa/mejorable} que se muestran como un
 * desplegable al usar la plantilla.
 */
export interface CommentTemplate {
  id: string;
  ownerId: string;
  subjectId: string;
  title: string; // breve, para identificarla en la lista ("Actitud en clase")
  text: string; // "{nombre} ha mostrado una actitud {actitud:positiva/negativa/mejorable} hacia..."
  createdAt: number;
}

// ---------------------------------------------------------------------
// Rúbricas y notas
// ---------------------------------------------------------------------

// Valor por defecto legacy: 3 trimestres fijos, usado solo cuando el
// SchoolYear activo no tiene `terms` personalizados definidos.
export const EVALUATIONS = ['1', '2', '3'] as const;
// Antes era una unión fija "1"|"2"|"3"; ahora es el id de un Term (periodo de
// evaluación personalizable por centro). Se mantiene como string genérico
// para admitir tanto los Term.id reales como los valores legacy de EVALUATIONS.
export type Evaluation = string;

export const GRADE_LABELS: Record<string, string> = {
  '0-4.9': 'Insuficiente',
  '5-5.9': 'Suficiente',
  '6-6.9': 'Bien',
  '7-8.9': 'Notable',
  '9-10': 'Excelente',
};

/** Un criterio de evaluación dentro de una rúbrica de notas. */
export interface GradingCriterion {
  id: string;
  name: string; // "Comprensión lectora"
  description?: string;
  weight: number; // peso porcentual (0-100), la suma de todos debe ser 100
  // Indicadores por nivel descriptivo (4 niveles: 1=Insuficiente...4=Excelente)
  indicators: [string, string, string, string];
  // Competència Específica (CE) de la qual deriva aquest criteri, si escau (p.ex. "CE3").
  ceId?: string;
  // Nombre de la CE (para mostrarlo sin tener que volver a buscarla en el currículum).
  ceName?: string;
  // Texto oficial de referencia (descripción de la CE + criteris d'avaluació) usado como base,
  // independiente de la descripción editable del criterio.
  ceReference?: string;
  // Cita corta y siempre visible: "Àrea · CE2 · 2.1, 2.2" — para justificar de dónde sale el criterio.
  ceLabel?: string;
}

/**
 * Una rúbrica de evaluación, reutilizable entre alumnos y evaluaciones.
 * Puede ser prediseñada (LOMLOE) o propia del docente.
 */
export interface Rubric {
  id: string;
  ownerId: string; // vacío "" si es prediseñada (global, solo lectura)
  schoolYearId?: string; // vacío si es prediseñada
  subjectId?: string; // si está vinculada a una asignatura concreta
  name: string; // "Rúbrica LOMLOE Lengua Castellana - Cataluña"
  community?: string; // "Cataluña", "Madrid", etc. (solo rúbricas LOMLOE)
  isLomloe: boolean;
  criteria: GradingCriterion[];
  // Rúbrica sintética de un solo criterio (peso 100), creada automáticamente
  // cuando el docente añade una actividad "de nota manual" (sin rúbrica real
  // asociada, p.ej. un examen puntuado a mano). Se usa para poder reutilizar
  // sin cambios todo el motor de cálculo/edición de notas (que siempre
  // trabaja sobre una rúbrica), pero se oculta de los selectores de rúbrica
  // que ve el docente.
  isManual?: boolean;
  createdAt: number;
}

// ---------------------------------------------------------------------
// Tipo de nota: numérica (0-10) o cualitativa por nivel de logro
// ---------------------------------------------------------------------
export type ScoreType = 'numeric' | 'qualitative';

// Estado especial de una nota cuando el alumno no tiene puntuación normal en
// una actividad: falta justificada/no justificada (no cuenta en la media del
// trimestre, solo queda anotado) o "no hizo la actividad" (sí cuenta, y
// puntúa como el mínimo: 0 en notas numéricas, NA en cualitativas).
export const GRADE_ENTRY_STATUSES = ['justifiedAbsence', 'unjustifiedAbsence', 'notDone'] as const;
export type GradeEntryStatus = typeof GRADE_ENTRY_STATUSES[number];
export const QUALITATIVE_LEVELS = ['NA', 'AS', 'AN', 'AE'] as const;
export type QualitativeLevel = typeof QUALITATIVE_LEVELS[number];
export const QUALITATIVE_LEVEL_LABELS: Record<QualitativeLevel, string> = {
  NA: 'No assolit',
  AS: 'Assoliment satisfactori',
  AN: 'Assoliment notable',
  AE: 'Assoliment excel·lent',
};

/**
 * Nota de un alumno en una evaluación, aplicando una rúbrica concreta.
 * Cada criterio tiene una puntuación numérica (0-10, también usada como
 * valor representativo cuando el tipo de nota de la actividad es cualitativo).
 */
export interface GradeEntry {
  id: string;
  ownerId: string;
  schoolYearId: string;
  studentId: string;
  subjectId: string;
  rubricId: string;
  evaluation: Evaluation; // id del Term (o "1"|"2"|"3" legacy)
  // Actividad concreta (GradebookActivity) de la libreta a la que pertenece
  // esta nota. Si no está definido, es una nota "suelta" del trimestre
  // (comportamiento legacy).
  activityId?: string;
  // Puntuación por criterio: { [criterionId]: puntuación 0-10 }
  scores: Record<string, number>;
  // Nota final calculada (media ponderada de los criterios)
  finalScore: number;
  // Si la actividad es de tipo cualitativo, nivel resultante (moda ponderada
  // de los niveles de cada criterio, no la media numérica).
  qualitativeLevel?: QualitativeLevel;
  // Si está definido, esta entrada no representa una puntuación normal sino
  // una falta (justificada/no justificada, excluida de la media del
  // trimestre) o que el alumno no hizo la actividad (sí cuenta, como mínimo).
  status?: GradeEntryStatus;
  notes?: string; // observaciones del docente
  updatedAt: number;
}

/**
 * Actividad evaluable dentro de la libreta de notas de una asignatura y
 * trimestre. El docente la crea manualmente a partir de una rúbrica ya
 * existente (o generada con IA/competencias), eligiendo qué peso tiene sobre
 * la nota final y qué tipo de nota se usará para puntuarla.
 */
export interface GradebookActivity {
  id: string;
  ownerId: string;
  schoolYearId: string;
  subjectId: string;
  termId: string;
  name: string;
  rubricId: string;
  // Si está definido, solo se evalúan estos criterios de la rúbrica (útil
  // cuando la rúbrica combina criterios de varias àrees y esta actividad
  // solo debe evaluar los de una). Si no está definido, se usan todos.
  criterionIds?: string[];
  // Peso (%) de esta actividad sobre la nota final del trimestre. No hace
  // falta que la suma de todas las actividades sea exactamente 100: se
  // normaliza al calcular la nota final.
  weight: number;
  scoreType: ScoreType;
  createdAt: number;
}

/**
 * Nota final de un alumno en una asignatura y trimestre, cuando el docente
 * decide sobrescribir el cálculo automático (media/moda ponderada de las
 * actividades). Si no existe override, se usa el cálculo automático.
 */
export interface TermFinalGradeOverride {
  id: string; // `${subjectId}_${studentId}_${termId}`
  ownerId: string;
  schoolYearId: string;
  subjectId: string;
  studentId: string;
  termId: string;
  overrideValue?: number; // 0-10, si la nota final de esa asignatura/trimestre es numérica
  overrideLevel?: QualitativeLevel; // si es cualitativa
  comment?: string; // comentario guardado (generado con el banco de frases o Profi), visible en la libreta
  updatedAt: number;
}

// ---------------------------------------------------------------------
// Plantillas de comentario ligadas a la nota (una por asignatura, con
// varias bandas/frases según rango numérico o nivel de logro)
// ---------------------------------------------------------------------
export interface GradeCommentBand {
  min?: number; // modo 'range'
  max?: number; // modo 'range'
  level?: QualitativeLevel; // modo 'qualitative'
  text: string; // puede incluir {nombre}
}

export interface GradeCommentTemplate {
  id: string; // = `${subjectId}__${termId}` (una plantilla por asignatura y trimestre)
  ownerId: string;
  subjectId: string;
  // Ausente en documentos antiguos, de antes de separar por trimestre (se
  // tratan como plantilla "general" de partida). Siempre presente en
  // documentos nuevos.
  termId?: string;
  mode: 'range' | 'qualitative';
  bands: GradeCommentBand[];
  // Competències Específiques que el docente quiere que Profi priorice al
  // generar comentarios personalizados para esta asignatura (ajuste general,
  // aplicable a todo el alumnado; independiente de los detalles adicionales
  // que se puedan añadir por alumno al generar un comentario concreto).
  profiCeIds?: string[];
  updatedAt: number;
}

/**
 * Adaptación curricular de un alumno/a dentro de una asignatura. Si
 * hasAdaptation es true, se evalúa con adaptedRubricId (una rúbrica
 * alternativa completa) en vez de la rúbrica general del grupo/actividad.
 */
export interface StudentAdaptation {
  id: string; // `${subjectId}_${studentId}`
  ownerId: string;
  subjectId: string;
  studentId: string;
  hasAdaptation: boolean;
  adaptedRubricId?: string;
  updatedAt: number;
}

// ---------------------------------------------------------------------
// Anotaciones libres sobre un alumno/a (apartado Alumnat / seguimiento de
// tutoría), independientes de cualquier asignatura: observaciones,
// incidencias, actitud, comportamiento, etc.
// ---------------------------------------------------------------------
export interface StudentNote {
  id: string;
  ownerId: string;
  schoolYearId: string;
  studentId: string;
  text: string;
  // Categoría libre elegida/escrita por el docente (p.ej. "Actitud",
  // "Comportamiento", "Familia"...). Vacía/ausente = "General". Sirve para
  // que el docente pueda elegir qué bloque de anotaciones usar como
  // contexto al generar un comentario con Profi (ver CommentModal).
  category?: string;
  createdAt: number;
}

// ---------------------------------------------------------------------
// Listas de verificación por grupo de alumnos (apartado Alumnat /
// seguimiento de tutoría). Cada "board" es una lista con varias columnas
// (items) que el docente marca sí/no por alumno, p.ej. "Trae el material",
// "Ha entregado la autorización", etc. Se guarda como un único documento
// por lista para poder marcar cada casilla con una escritura atómica de un
// solo campo anidado (checks.{studentId}.{itemId}).
// ---------------------------------------------------------------------
export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ChecklistBoard {
  id: string;
  ownerId: string;
  schoolYearId: string;
  groupId: string;
  name: string;
  items: ChecklistItem[];
  // checks[studentId][itemId] = true/false. Si un alumno o item no tiene
  // entrada todavía, se trata como "no marcado".
  checks: Record<string, Record<string, boolean>>;
  createdAt: number;
  updatedAt: number;
}

// ---------------------------------------------------------------------
// Festivos del centro: fechas concretas marcadas como festivo, con
// independencia de si ese día de la semana tiene clases programadas o no
// (a diferencia de WeeklyPlan.dayStatus, que va ligado a una franja
// horaria concreta). Se muestran destacados tanto en la vista semanal como
// en la mensual de Programación semanal.
// ---------------------------------------------------------------------
export interface SchoolHoliday {
  id: string;
  ownerId: string;
  schoolYearId: string;
  date: string; // ISO yyyy-MM-dd
  label?: string;
  color?: PastelFolderColor;
  createdAt: number;
}
