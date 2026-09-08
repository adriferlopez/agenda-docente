import type { Subject } from '@/types';
import type { EtapaCurriculum } from '@/data/curriculum/types';

/** Un "saber" (contenido) del currículum, en el formato que necesita el
 * emparejamiento por IA (id/code/description). Se construye en el cliente a
 * partir de los blocs de sabers de las àrees vinculadas a cada asignatura
 * (data/curriculum), no de una colección de Firestore: así siempre refleja
 * el currículum oficial cargado en la app, sin depender de que el docente
 * haya importado nada manualmente.
 *
 * Vive en utils (no en AnnualPlanningPage.tsx, de donde salió originalmente)
 * para que otros sitios que necesiten el mismo catálogo con ids reales (como
 * el planificador de unidad de Profi, en ProfiTools.tsx) puedan importarlo
 * sin arrastrar la página entera a su chunk de JS.
 */
export interface SaberItem {
  id: string;
  code: string;
  description: string;
}

export function getSubjectSaberItems(subject: Subject, curriculum: EtapaCurriculum | null): SaberItem[] {
  if (!curriculum) return [];
  const items: SaberItem[] = [];
  for (const areaName of subject.curriculumAreas ?? []) {
    const area = curriculum.areas[areaName];
    if (!area) continue;
    for (const [bloc, byCourse] of Object.entries(area.blocs)) {
      for (const [courseKey, sabers] of Object.entries(byCourse)) {
        const courseLabel = area.courseLabels[courseKey] ?? courseKey;
        sabers.forEach((text, idx) => {
          items.push({
            id: `${areaName}::${bloc}::${courseKey}::${idx}`,
            code: `${bloc} · ${courseLabel}`,
            description: text,
          });
        });
      }
    }
  }
  return items;
}
