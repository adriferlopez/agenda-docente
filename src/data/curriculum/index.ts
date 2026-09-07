/**
 * Registre central del currículum, organitzat per comunitat autònoma i
 * etapa educativa. De moment només hi ha dades de Catalunya (Primària i
 * Secundària/ESO), però l'estructura està preparada per afegir més
 * comunitats i etapes sense tocar el codi que ja les consumeix.
 */
import { SABERS_CATALUNYA, SABERS_AREAS, CICLES, CICLE_LABELS } from '@/data/sabersCAT';
import { SABERS_CATALUNYA_ESO, SABERS_AREAS_ESO } from '@/data/sabersCAT_ESO';
import { SABERS_CATALUNYA_BATX, SABERS_AREAS_BATX } from '@/data/sabersCAT_BATX';
import { SABERS_CATALUNYA_INFANTIL, SABERS_AREAS_INFANTIL, INFANTIL_CICLES, INFANTIL_CICLE_LABELS } from '@/data/sabersCAT_INFANTIL';
import { COMPETENCIES_CATALUNYA_PRIMARIA, COMPETENCIES_CATALUNYA_SECUNDARIA } from '@/data/competenciesCAT';
import { COMPETENCIES_CATALUNYA_BATX } from '@/data/competenciesCAT_BATX';
import { COMPETENCIES_CATALUNYA_INFANTIL } from '@/data/competenciesCAT_INFANTIL';
import { COMPETENCIES_VALENCIA_ES } from '@/data/competenciesVAL_ES';
import { COMPETENCIES_VALENCIA_VAL } from '@/data/competenciesVAL_VAL';
import { SABERS_VALENCIA_ES } from '@/data/sabersVAL_ES';
import { SABERS_VALENCIA_VAL } from '@/data/sabersVAL_VAL';
import { COMPETENCIES_ESO_VALENCIA_ES } from '@/data/competenciesVAL_ESO_ES';
import { COMPETENCIES_ESO_VALENCIA_VAL } from '@/data/competenciesVAL_ESO_VAL';
import { SABERS_ESO_VALENCIA_ES } from '@/data/sabersVAL_ESO_ES';
import { SABERS_ESO_VALENCIA_VAL } from '@/data/sabersVAL_ESO_VAL';
import { COMPETENCIES_BATX_VALENCIA_ES } from '@/data/competenciesVAL_BATX_ES';
import { COMPETENCIES_BATX_VALENCIA_VAL } from '@/data/competenciesVAL_BATX_VAL';
import { SABERS_BATX_VALENCIA_ES } from '@/data/sabersVAL_BATX_ES';
import { SABERS_BATX_VALENCIA_VAL } from '@/data/sabersVAL_BATX_VAL';
import { SABERS_INFANTIL_VALENCIA_VAL, SABERS_AREAS_INFANTIL_VALENCIA_VAL, INFANTIL_VALENCIA_CICLES } from '@/data/sabersVAL_INFANTIL_VAL';
import { SABERS_INFANTIL_VALENCIA_ES, SABERS_AREAS_INFANTIL_VALENCIA_ES } from '@/data/sabersVAL_INFANTIL_ES';
import { COMPETENCIES_INFANTIL_VALENCIA_VAL } from '@/data/competenciesVAL_INFANTIL_VAL';
import { COMPETENCIES_INFANTIL_VALENCIA_ES } from '@/data/competenciesVAL_INFANTIL_ES';
import { SABERS_CLM_INFANTIL, SABERS_AREAS_INFANTIL_CLM, INFANTIL_CLM_CICLES, INFANTIL_CLM_CICLE_LABELS } from '@/data/sabersCLM_INFANTIL';
import { COMPETENCIES_CLM_INFANTIL } from '@/data/competenciesCLM_INFANTIL';
import { SABERS_CLM_PRIMARIA, SABERS_AREAS_PRIMARIA_CLM, PRIMARIA_CLM_CICLE_LABELS } from '@/data/sabersCLM_PRIMARIA';
import { COMPETENCIES_CLM_PRIMARIA } from '@/data/competenciesCLM_PRIMARIA';
import { SABERS_CLM_ESO, SABERS_AREAS_ESO_CLM } from '@/data/sabersCLM_ESO';
import { COMPETENCIES_CLM_ESO } from '@/data/competenciesCLM_ESO';
import { SABERS_CLM_ESO_OPTATIVAS, SABERS_AREAS_ESO_CLM_OPTATIVAS } from '@/data/sabersCLM_ESO_OPTATIVAS';
import { COMPETENCIES_CLM_ESO_OPTATIVAS } from '@/data/competenciesCLM_ESO_OPTATIVAS';
import i18n from '@/i18n';
import type { AreaCompetencies, Comunitat, Etapa, EtapaCurriculum, SaberAreaGeneric } from './types';

export * from './types';

function adaptPrimariaCatalunya(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of SABERS_AREAS) {
    const a = SABERS_CATALUNYA[name];
    if (!a) continue;
    areas[name] = {
      name: a.name,
      courseKeys: [...CICLES],
      courseLabels: CICLE_LABELS,
      blocs: a.blocs as unknown as Record<string, Record<string, string[]>>,
    };
  }
  // Àrees que només tenen CE/criteris (encara sense sabers carregats), p.ex.
  // Llengua Castellana i Aranès: es mostren igualment al selector d'àrees.
  const areaNames = new Set(SABERS_AREAS);
  for (const name of Object.keys(COMPETENCIES_CATALUNYA_PRIMARIA)) {
    if (!areaNames.has(name)) {
      areaNames.add(name);
      areas[name] = {
        name,
        courseKeys: [...CICLES],
        courseLabels: CICLE_LABELS,
        blocs: {},
      };
    }
  }
  return {
    areaNames: [...areaNames],
    areas,
    competencies: COMPETENCIES_CATALUNYA_PRIMARIA as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Infantil de Catalunya: DECRET 21/2023, de 7 de febrer, d'ordenació dels
 * ensenyaments de l'educació infantil (decret propi de la Generalitat, en
 * català). Vegeu la nota a sabersCAT_INFANTIL.ts sobre les diferències
 * estructurals amb el Real Decreto 95/2022 (4 eixos en lloc de 3 àrees, CE
 * comunes als dos cicles, criteris de final d'etapa sense diferenciar per
 * cicle).
 */
function adaptInfantilCatalunya(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of SABERS_AREAS_INFANTIL) {
    const a = SABERS_CATALUNYA_INFANTIL[name];
    if (!a) continue;
    areas[name] = {
      name: a.name,
      courseKeys: [...INFANTIL_CICLES],
      courseLabels: INFANTIL_CICLE_LABELS,
      blocs: a.blocs,
    };
  }
  return {
    areaNames: [...SABERS_AREAS_INFANTIL],
    areas,
    competencies: COMPETENCIES_CATALUNYA_INFANTIL as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Infantil de la Comunitat Valenciana: DECRET 100/2022, de 29 de juliol, del
 * Consell, pel qual s'estableix l'ordenació i el currículum d'Educació
 * Infantil (DOGV núm. 9384, 10/08/2022), Annex II. Mateix criteri bilingüe
 * que adaptPrimariaValencia() / adaptSecundariaValencia().
 *
 * Nota sobre criteris d'avaluació: a diferència del Real Decreto 95/2022 i
 * del Decret 21/2023 de Catalunya, el Decret 100/2022 no vincula els
 * criteris d'avaluació a cada CE individualment — els presenta com una
 * única llista plana per àrea i cicle. Seguint la decisió de l'usuari,
 * sabersVAL_INFANTIL_*.ts / competenciesVAL_INFANTIL_*.ts dupliquen aquesta
 * llista completa a totes les CE de la mateixa àrea (vegeu la nota al
 * capçal de competenciesVAL_INFANTIL_VAL.ts).
 */
function adaptInfantilValencia(): EtapaCurriculum {
  const isValencia = i18n.language?.toLowerCase().startsWith('ca');
  const sabersAreas = isValencia ? SABERS_AREAS_INFANTIL_VALENCIA_VAL : SABERS_AREAS_INFANTIL_VALENCIA_ES;
  const sabers = isValencia ? SABERS_INFANTIL_VALENCIA_VAL : SABERS_INFANTIL_VALENCIA_ES;
  const competencies = isValencia ? COMPETENCIES_INFANTIL_VALENCIA_VAL : COMPETENCIES_INFANTIL_VALENCIA_ES;
  const courseLabels: Record<string, string> = isValencia
    ? { '0-3': 'Primer cicle (0-3 anys)', '3-6': 'Segon cicle (3-6 anys)' }
    : { '0-3': 'Primer ciclo (0-3 años)', '3-6': 'Segundo ciclo (3-6 años)' };
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of sabersAreas) {
    const a = sabers[name];
    if (!a) continue;
    areas[name] = {
      name: a.name,
      courseKeys: [...INFANTIL_VALENCIA_CICLES],
      courseLabels,
      blocs: a.blocs,
    };
  }
  return {
    areaNames: [...sabersAreas],
    areas,
    competencies: competencies as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Infantil de Castilla-La Mancha: Decreto 80/2022, de 12 de julio, por el que
 * se establece la ordenación y el currículo de la Educación Infantil en la
 * comunidad autónoma de Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo
 * II. A diferencia de Catalunya i la Comunitat Valenciana (decrets propis
 * amb estructura pròpia diferenciada), aquest decret reprodueix pràcticament
 * de forma literal les tres àrees, els enunciats de les CE i la numeració de
 * criteris del Real Decreto 95/2022, afegint-hi alguns criteris i sabers
 * propis de la comunitat (vegeu sabersCLM_INFANTIL.ts).
 */
function adaptInfantilCastillaLaMancha(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of SABERS_AREAS_INFANTIL_CLM) {
    const a = SABERS_CLM_INFANTIL[name];
    if (!a) continue;
    areas[name] = {
      name: a.name,
      courseKeys: [...INFANTIL_CLM_CICLES],
      courseLabels: INFANTIL_CLM_CICLE_LABELS,
      blocs: a.blocs,
    };
  }
  return {
    areaNames: [...SABERS_AREAS_INFANTIL_CLM],
    areas,
    competencies: COMPETENCIES_CLM_INFANTIL as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Primària de Castilla-La Mancha: Decreto 81/2022, de 12 de julio, por el que
 * se establece la ordenación y el currículo de la Educación Primaria en la
 * comunidad autónoma de Castilla-La Mancha (DOCM núm. 134, 14/07/2022), Anexo
 * II. A diferència d'Infantil (que reprodueix gairebé literalment el RD
 * 95/2022), a Primària no hi ha cap fitxer base "RD157/2022" reutilitzable al
 * projecte, així que aquest currículum és una extracció pròpia i
 * independent, amb les 7 àrees oficials. L'àrea "Educación en Valores
 * Cívicos y Éticos" només s'imparteix al tercer cicle (5è-6è) segons el propi
 * decret, per la qual cosa és l'única àrea amb courseKeys: ['5-6'] (vegeu
 * sabersCLM_PRIMARIA.ts i competenciesCLM_PRIMARIA.ts).
 */
function adaptPrimariaCastillaLaMancha(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of SABERS_AREAS_PRIMARIA_CLM) {
    const a = SABERS_CLM_PRIMARIA[name];
    if (!a) continue;
    areas[name] = {
      name: a.name,
      courseKeys: a.courseKeys,
      courseLabels: PRIMARIA_CLM_CICLE_LABELS,
      blocs: a.blocs,
    };
  }
  return {
    areaNames: [...SABERS_AREAS_PRIMARIA_CLM],
    areas,
    competencies: COMPETENCIES_CLM_PRIMARIA as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * ESO de Castilla-La Mancha: Decreto 82/2022, de 12 de julio, por el que se
 * establece la ordenación y el currículo de la Educación Secundaria
 * Obligatoria en la comunidad autónoma de Castilla-La Mancha (DOCM núm. 134,
 * 14/07/2022), Anexo II. El decreto regula 28 materias: 11 troncales/comunes
 * (sabersCLM_ESO.ts / competenciesCLM_ESO.ts) y 17 optativas
 * (sabersCLM_ESO_OPTATIVAS.ts / competenciesCLM_ESO_OPTATIVAS.ts), ambos
 * grupos integrados aquí conjuntamente. A diferencia de Primària (un únic
 * conjunt de cicles per a totes les àrees), a ESO cada matèria té la seua
 * pròpia distribució de cursos (vegeu les capçaleres dels fitxers de sabers
 * per al detall), per la qual cosa courseKeys/courseLabels es calculen per
 * matèria a partir de les dades reals extretes del decret (mateix criteri
 * que adaptSecundariaValencia()).
 */
function adaptSecundariaCastillaLaMancha(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = {};
  const allAreaNames = [...SABERS_AREAS_ESO_CLM, ...SABERS_AREAS_ESO_CLM_OPTATIVAS];
  const allSabers: Record<string, SaberAreaGeneric> = {
    ...SABERS_CLM_ESO,
    ...SABERS_CLM_ESO_OPTATIVAS,
  };
  for (const name of allAreaNames) {
    const a = allSabers[name];
    if (!a) continue;
    areas[name] = {
      name: a.name,
      courseKeys: a.courseKeys,
      courseLabels: a.courseLabels,
      blocs: a.blocs,
    };
  }
  return {
    areaNames: allAreaNames,
    areas,
    competencies: {
      ...COMPETENCIES_CLM_ESO,
      ...COMPETENCIES_CLM_ESO_OPTATIVAS,
    } as unknown as Record<string, AreaCompetencies>,
  };
}

function adaptSecundariaCatalunya(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = { ...SABERS_CATALUNYA_ESO };
  // Àrees que ja tenen CE/criteris carregats però encara no tenen sabers
  // (blocs) a sabersCAT_ESO.ts, p.ex. Educació Física: es mostren igualment
  // al selector d'àrees, amb blocs buits fins que s'afegeixin els sabers.
  const areaNames = new Set(SABERS_AREAS_ESO);
  for (const name of Object.keys(COMPETENCIES_CATALUNYA_SECUNDARIA)) {
    if (!areaNames.has(name)) {
      areaNames.add(name);
      areas[name] = { name, courseKeys: ['1r-2n-3r', '4t'], courseLabels: { '1r-2n-3r': '1r, 2n i 3r ESO', '4t': '4t ESO' }, blocs: {} };
    }
  }
  return {
    areaNames: [...areaNames],
    areas,
    competencies: COMPETENCIES_CATALUNYA_SECUNDARIA as unknown as Record<string, AreaCompetencies>,
  };
}

function adaptBatxilleratCatalunya(): EtapaCurriculum {
  const areas: Record<string, SaberAreaGeneric> = { ...SABERS_CATALUNYA_BATX };
  // Àrees que ja tenen CE/criteris carregats però encara no tenen sabers a
  // sabersCAT_BATX.ts: es mostren igualment al selector d'àrees, amb blocs
  // buits fins que s'afegeixin els sabers.
  const areaNames = new Set(SABERS_AREAS_BATX);
  for (const name of Object.keys(COMPETENCIES_CATALUNYA_BATX)) {
    if (!areaNames.has(name)) {
      areaNames.add(name);
      areas[name] = { name, courseKeys: ['1r', '2n'], courseLabels: { '1r': '1r Batxillerat', '2n': '2n Batxillerat' }, blocs: {} };
    }
  }
  return {
    areaNames: [...areaNames],
    areas,
    competencies: COMPETENCIES_CATALUNYA_BATX as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Primària de la Comunitat Valenciana: el decret (106/2022) es publica
 * íntegrament en valencià i en castellà, i el docent ha de veure el
 * currículum en l'idioma que tingui configurat a l'Agenda (no una traducció
 * automàtica, sinó el text oficial de cada versió). Com que l'app encara no
 * té un locale "val" propi, s'utilitza el català ('ca') com a senyal —és
 * l'idioma que trien els docents valencianoparlants— per mostrar la versió
 * en valencià; qualsevol altre idioma mostra la versió en castellà.
 * De moment només hi ha CE + criteris d'avaluació (encara no els sabers
 * bàsics), igual que passava amb algunes àrees de Catalunya abans d'afegir-los.
 */
function adaptPrimariaValencia(): EtapaCurriculum {
  const isValencia = i18n.language?.toLowerCase().startsWith('ca');
  const competencies = isValencia ? COMPETENCIES_VALENCIA_VAL : COMPETENCIES_VALENCIA_ES;
  const sabers = isValencia ? SABERS_VALENCIA_VAL : SABERS_VALENCIA_ES;
  const courseLabels: Record<string, string> = isValencia
    ? { '1-2': '1r i 2n (6-8 anys)', '3-4': '3r i 4t (8-10 anys)', '5-6': '5è i 6è (10-12 anys)' }
    : { '1-2': '1º y 2º (6-8 años)', '3-4': '3º y 4º (8-10 años)', '5-6': '5º y 6º (10-12 años)' };
  const areaNames = Object.keys(competencies);
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of areaNames) {
    areas[name] = { name, courseKeys: [...CICLES], courseLabels, blocs: sabers[name] ?? {} };
  }
  return {
    areaNames,
    areas,
    competencies: competencies as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Secundària (ESO) de la Comunitat Valenciana: DECRET 107/2022 (DOGV 9403),
 * Annex III (matèries comunes/opció) + Annex IV (matèries optatives). Mateix
 * criteri bilingüe que adaptPrimariaValencia(). A diferència de Primària (amb
 * cicles fixos) i de Secundària Catalunya (amb cursos fixos '1r-2n-3r'/'4t'),
 * cada matèria d'ESO Valencia té la seua pròpia distribució de cursos (p.ex.
 * Biologia i Geologia només s'imparteix 1r i 3r; Matemàtiques diferencia 3r,
 * 4t A i 4t B; moltes matèries optatives no diferencien per curs), així que
 * courseKeys/courseLabels es calculen per àrea a partir de les dades reals
 * extretes (vegeu sabersVAL_ESO_*.ts) en lloc d'un conjunt fix per etapa.
 */
function adaptSecundariaValencia(): EtapaCurriculum {
  const isValencia = i18n.language?.toLowerCase().startsWith('ca');
  const competencies = isValencia ? COMPETENCIES_ESO_VALENCIA_VAL : COMPETENCIES_ESO_VALENCIA_ES;
  const sabers = isValencia ? SABERS_ESO_VALENCIA_VAL : SABERS_ESO_VALENCIA_ES;
  const areaNames = Object.keys(competencies);
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of areaNames) {
    const s = sabers[name];
    areas[name] = s ?? { name, courseKeys: [], courseLabels: {}, blocs: {} };
  }
  return {
    areaNames,
    areas,
    competencies: competencies as unknown as Record<string, AreaCompetencies>,
  };
}

/**
 * Batxillerat de la Comunitat Valenciana: DECRET 108/2022, de 27 de juliol,
 * del Consell, d'ordenació dels ensenyaments de Batxillerat, Annex II
 * (matèries comunes i de modalitat) + Annex III (matèries optatives). Mateix
 * criteri bilingüe que adaptSecundariaValencia(); com allà, cada matèria té
 * la seua pròpia distribució de cursos, però en Batxillerat els criteris
 * d'avaluació de la font no diferencien per curs (només una clau
 * "batxillerat"), a diferència d'ESO.
 */
function adaptBatxilleratValencia(): EtapaCurriculum {
  const isValencia = i18n.language?.toLowerCase().startsWith('ca');
  const competencies = isValencia ? COMPETENCIES_BATX_VALENCIA_VAL : COMPETENCIES_BATX_VALENCIA_ES;
  const sabers = isValencia ? SABERS_BATX_VALENCIA_VAL : SABERS_BATX_VALENCIA_ES;
  const areaNames = Object.keys(competencies);
  const areas: Record<string, SaberAreaGeneric> = {};
  for (const name of areaNames) {
    const s = sabers[name];
    areas[name] = s ?? { name, courseKeys: ['batxillerat'], courseLabels: { batxillerat: 'Batxillerat' }, blocs: {} };
  }
  return {
    areaNames,
    areas,
    competencies: competencies as unknown as Record<string, AreaCompetencies>,
  };
}

export const CURRICULUM: Partial<Record<Comunitat, Partial<Record<Etapa, EtapaCurriculum>>>> = {
  catalunya: {
    infantil: adaptInfantilCatalunya(),
    primaria: adaptPrimariaCatalunya(),
    secundaria: adaptSecundariaCatalunya(),
    batxillerat: adaptBatxilleratCatalunya(),
  },
};

/** Retorna el currículum disponible per a una comunitat + etapa, o null si encara no n'hi ha. */
export function getCurriculum(comunitat: Comunitat, etapa: Etapa): EtapaCurriculum | null {
  if (comunitat === 'valencia' && etapa === 'infantil') return adaptInfantilValencia();
  if (comunitat === 'valencia' && etapa === 'primaria') return adaptPrimariaValencia();
  if (comunitat === 'valencia' && etapa === 'secundaria') return adaptSecundariaValencia();
  if (comunitat === 'valencia' && etapa === 'batxillerat') return adaptBatxilleratValencia();
  if (comunitat === 'castillaLaMancha' && etapa === 'infantil') return adaptInfantilCastillaLaMancha();
  if (comunitat === 'castillaLaMancha' && etapa === 'primaria') return adaptPrimariaCastillaLaMancha();
  if (comunitat === 'castillaLaMancha' && etapa === 'secundaria') return adaptSecundariaCastillaLaMancha();
  return CURRICULUM[comunitat]?.[etapa] ?? null;
}

/**
 * Retorna el currículum combinat de totes les etapes indicades (un docent pot
 * impartir més d'una etapa, p.ex. Primària i Infantil, o ESO i Batxillerat).
 * Uneix `areaNames`/`areas`/`competencies` de cada etapa amb dades; si cap
 * etapa en té, retorna null.
 */
export function getCurriculumForEtapas(comunitat: Comunitat, etapes: Etapa[]): EtapaCurriculum | null {
  const parts = etapes
    .map((etapa) => getCurriculum(comunitat, etapa))
    .filter((c): c is EtapaCurriculum => Boolean(c));
  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0];
  const areaNames = [...new Set(parts.flatMap((p) => p.areaNames))];
  const areas: Record<string, SaberAreaGeneric> = {};
  const competencies: Record<string, AreaCompetencies> = {};
  for (const p of parts) {
    Object.assign(areas, p.areas);
    if (p.competencies) Object.assign(competencies, p.competencies);
  }
  return { areaNames, areas, competencies: Object.keys(competencies).length ? competencies : undefined };
}

/** Retorna les Competències Específiques i Criteris d'Avaluació d'una àrea, o null si no n'hi ha. */
export function getAreaCompetencies(comunitat: Comunitat, etapa: Etapa, areaName: string): AreaCompetencies | null {
  const curriculum = getCurriculum(comunitat, etapa);
  return curriculum?.competencies?.[areaName] ?? null;
}

/**
 * Catàleg tancat de cursos concrets per etapa educativa (el mateix que es fa
 * servir al selector de curs d'Asignatures): permet saber de manera fiable a
 * quina etapa pertany un curs concret (p.ex. "2n ESO" -> 'secundaria'), sense
 * dependre de coincidències de text lliure.
 */
export const COURSE_LEVELS_BY_ETAPA: Record<Etapa, string[]> = {
  infantil: ['P3', 'P4', 'P5'],
  primaria: ['1r Primària', '2n Primària', '3r Primària', '4t Primària', '5è Primària', '6è Primària'],
  secundaria: ['1r ESO', '2n ESO', '3r ESO', '4t ESO'],
  batxillerat: ['1r Batxillerat', '2n Batxillerat'],
};

const COURSE_LEVEL_TO_ETAPA: Record<string, Etapa> = Object.fromEntries(
  Object.entries(COURSE_LEVELS_BY_ETAPA).flatMap(([etapa, levels]) => levels.map((l) => [l, etapa as Etapa]))
);

/** Donada una llista de cursos (p.ex. els triats a Asignatures), retorna l'etapa a què pertanyen, o undefined si cap coincideix amb el catàleg tancat. */
export function etapaForCourseLevels(courseLevels: Iterable<string>): Etapa | undefined {
  for (const raw of courseLevels) {
    const etapa = COURSE_LEVEL_TO_ETAPA[raw.trim()];
    if (etapa) return etapa;
  }
  return undefined;
}

/** Igual que `etapaForCourseLevels`, però a partir del camp `Subject.courseLevel` (cursos separats per comes). */
export function etapaForCourseLevel(courseLevel?: string): Etapa | undefined {
  if (!courseLevel) return undefined;
  return etapaForCourseLevels(courseLevel.split(',').map((c) => c.trim()).filter(Boolean));
}

/**
 * Retorna el currículum de l'etapa a què pertany REALMENT una assignatura
 * concreta (a partir del seu curs, p.ex. "2n ESO" -> secundària), en lloc del
 * currículum combinat de totes les etapes del docent (`getCurriculumForEtapas`).
 *
 * Això evita un bug importat: si el docent imparteix més d'una etapa (p.ex.
 * ESO i Batxillerat), `getCurriculumForEtapas` uneix les àrees de totes les
 * etapes per NOM, i com que hi ha noms d'àrea que existeixen a totes dues
 * etapes amb sabers/CE diferents (p.ex. "Matemàtiques", "Educació Física",
 * "Llengua Catalana i Literatura"...), l'etapa que es processa última
 * "guanya" i tapa silenciosament les dades de l'altra — un docent amb un
 * grup de 2n ESO podia acabar veient saberes/criteris de Batxillerat.
 *
 * Si l'assignatura no té un curs reconegut al catàleg tancat (text lliure
 * antic, o sense curs assignat), es fa un fallback: si el docent només
 * imparteix una etapa no hi ha ambigüitat possible i s'usa aquesta; si en
 * imparteix diverses, es manté el comportament anterior (combinat) com a
 * últim recurs, ja que no hi ha prou informació per triar.
 */
export function getCurriculumForSubject(
  comunitat: Comunitat,
  courseLevel: string | undefined,
  fallbackEtapas: Etapa[]
): EtapaCurriculum | null {
  const etapa = etapaForCourseLevel(courseLevel);
  if (etapa) return getCurriculum(comunitat, etapa);
  if (fallbackEtapas.length <= 1) return getCurriculum(comunitat, fallbackEtapas[0] ?? 'primaria');
  return getCurriculumForEtapas(comunitat, fallbackEtapas);
}
