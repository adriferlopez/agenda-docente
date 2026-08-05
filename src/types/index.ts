export type Language = 'es' | 'ca' | 'en' | 'eu' | 'gl';

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
}

export interface SchoolYear {
  id: string;
  ownerId: string;
  name: string; // "2025-2026"
  startDate: string; // ISO date
  endDate: string; // ISO date
  createdAt: number;
}

export const SUBJECT_COLORS = [
  'lav', 'mint', 'peach', 'rose', 'sky', 'butter',
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
  postClassEvaluation?: string;
  aiSuggestions?: string;
  status: 'planned' | 'done' | 'evaluated';
  // Campos usados en la programación anual
  aiObjectives?: string;
  curriculumItemIds?: string[];
  referenceImageUrl?: string;
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
