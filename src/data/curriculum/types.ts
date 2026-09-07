/**
 * Tipos generales del currículum, independientes de comunitat/etapa.
 * Permiten que cada etapa tenga su propia agrupación de cursos (cicles en
 * Primària, cursos individuales o agrupados en Secundària/Batxillerat) sin
 * acoplar el modelo de datos a los cicles fijos de Primària.
 */

export type Etapa = 'infantil' | 'primaria' | 'secundaria' | 'batxillerat';

/**
 * Comunitats i ciutats autònomes d'Espanya. El currículum detallat encara
 * només està carregat per a Catalunya (vegeu `CURRICULUM` a `index.ts`), però
 * el docent pot triar qualsevol comunitat des del registre/ajustos: quan
 * s'afegeixin dades d'altres comunitats, ja hi haurà usuaris configurats.
 */
export type Comunitat =
  | 'andalucia'
  | 'aragon'
  | 'asturias'
  | 'illesBalears'
  | 'canarias'
  | 'cantabria'
  | 'castillaLaMancha'
  | 'castillaYLeon'
  | 'catalunya'
  | 'extremadura'
  | 'galicia'
  | 'laRioja'
  | 'madrid'
  | 'murcia'
  | 'navarra'
  | 'paisVasco'
  | 'valencia'
  | 'ceuta'
  | 'melilla';

export interface SaberAreaGeneric {
  name: string;
  /** Claus de curs/cicle vàlides per a aquesta àrea, en ordre. */
  courseKeys: string[];
  /** Etiqueta llegible per a cada clau de curs. */
  courseLabels: Record<string, string>;
  /** bloc (o "Bloc - Subbloc") -> clau de curs -> llista de sabers */
  blocs: Record<string, Record<string, string[]>>;
}

/**
 * Una Competència Específica (CE) d'una àrea, amb els seus Criteris
 * d'Avaluació associats. Els criteris poden estar diferenciats per curs/cicle
 * (Record<courseKey, string[]>) o ser una llista plana quan el currículum no
 * els diferencia per curs dins l'etapa.
 */
export interface CompetenciaEspecifica {
  id: string; // "CE1"
  title: string;
  description: string;
  criteris: Record<string, string[]> | string[];
}

export interface AreaCompetencies {
  competencies: CompetenciaEspecifica[];
}

/** Devuelve los criteris d'avaluació d'una CE per a un curs/cicle concret (o tots si és una llista plana). */
export function criterisForCourse(ce: CompetenciaEspecifica, courseKey: string): string[] {
  if (Array.isArray(ce.criteris)) return ce.criteris;
  return ce.criteris[courseKey] ?? Object.values(ce.criteris).flat();
}

/** Devuelve tots els criteris d'avaluació d'una CE (de tots els cicles), sense duplicats. */
export function allCriteris(ce: CompetenciaEspecifica): string[] {
  const list = Array.isArray(ce.criteris) ? ce.criteris : Object.values(ce.criteris).flat();
  return [...new Set(list)];
}

/** Extrae los códigos (p.ej. "2.1", "2.2") con los que empiezan los criteris d'avaluació oficiales. */
export function extractCriteriCodes(criteris: string[]): string {
  const codes = criteris
    .map((c) => c.trim().match(/^(\d+\.\d+)/)?.[1])
    .filter((c): c is string => Boolean(c));
  return [...new Set(codes)].join(', ');
}

function normalizeAreaText(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Intenta adivinar a qué àrea del currículum (p.ex. "Matemàtiques") corresponde
 * el nombre libre de una asignatura del docente (p.ex. "Matemáticas 3r"). Solo
 * hace match exacto (ignorando mayúsculas/tildes/texto extra tipo curso o
 * grupo): varias àrees del currículum comparten la primera palabra ("Llengua
 * Catalana..." / "Llengua Castellana..."), así que adivinar por coincidencia
 * parcial es más peligroso que útil — mejor dejar que el docente elija a mano
 * cuando no hay match exacto.
 */
export function guessAreaName(subjectName: string, areaNames: string[]): string {
  const ns = normalizeAreaText(subjectName);
  if (!ns) return '';
  return areaNames.find((a) => normalizeAreaText(a) === ns) ?? '';
}

export interface EtapaCurriculum {
  areaNames: string[];
  areas: Record<string, SaberAreaGeneric>;
  /** Competències Específiques i Criteris d'Avaluació per àrea (pot no estar disponible per a totes). */
  competencies?: Record<string, AreaCompetencies>;
}

export const ETAPES: { value: Etapa; label: string }[] = [
  { value: 'infantil', label: 'Educació Infantil' },
  { value: 'primaria', label: 'Educació Primària' },
  { value: 'secundaria', label: 'ESO' },
  { value: 'batxillerat', label: 'Batxillerat' },
];

export const COMUNITATS: { value: Comunitat; label: string }[] = [
  { value: 'andalucia', label: 'Andalucía' },
  { value: 'aragon', label: 'Aragón' },
  { value: 'asturias', label: 'Asturias' },
  { value: 'illesBalears', label: 'Illes Balears' },
  { value: 'canarias', label: 'Canarias' },
  { value: 'cantabria', label: 'Cantabria' },
  { value: 'castillaLaMancha', label: 'Castilla-La Mancha' },
  { value: 'castillaYLeon', label: 'Castilla y León' },
  { value: 'catalunya', label: 'Catalunya' },
  { value: 'extremadura', label: 'Extremadura' },
  { value: 'galicia', label: 'Galicia' },
  { value: 'laRioja', label: 'La Rioja' },
  { value: 'madrid', label: 'Madrid' },
  { value: 'murcia', label: 'Murcia' },
  { value: 'navarra', label: 'Navarra' },
  { value: 'paisVasco', label: 'País Vasco' },
  { value: 'valencia', label: 'Comunitat Valenciana' },
  { value: 'ceuta', label: 'Ceuta' },
  { value: 'melilla', label: 'Melilla' },
];

export const ETAPA_LABELS: Record<Etapa, string> = Object.fromEntries(
  ETAPES.map((e) => [e.value, e.label])
) as Record<Etapa, string>;

export const COMUNITAT_LABELS: Record<Comunitat, string> = Object.fromEntries(
  COMUNITATS.map((c) => [c.value, c.label])
) as Record<Comunitat, string>;
