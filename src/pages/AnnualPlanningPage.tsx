import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pdf } from '@react-pdf/renderer';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeRubrics } from '@/firebase/grades';
import { updatePlanCurriculumAndObjectives } from '@/firebase/annualPlan';
import { subscribeAllWeeklyPlans, deleteWeeklyPlan } from '@/firebase/weeklyPlans';
import {
  subscribeLearningSituations,
  migrateLegacySaLabels,
  updateLearningSituation,
} from '@/firebase/learningSituations';
import { generateActivityObjectives, matchCurriculumItems, generateSaObjectives, generateSaMethodologyResources } from '@/services/ai';
import { getCurriculumForSubject, COURSE_LEVELS_BY_ETAPA } from '@/data/curriculum';
import type { Etapa, Comunitat, EtapaCurriculum } from '@/data/curriculum/types';
import { getEffectiveTerms, termForDate } from '@/utils/terms';
import { driveImagePreviewUrl } from '@/utils/drive';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input, Textarea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import AnnualPlanPdf from '@/components/annual/AnnualPlanPdf';
import { IconSparkles, IconDownload, IconImage, IconTrash, IconEdit, IconRefresh } from '@/components/ui/icons';
import type { Subject, WeeklyPlan, Rubric, LearningSituation } from '@/types';
import { getEffectiveEtapas } from '@/types';

/** Un "saber" (contenido) del currículum, en el formato que necesita el
 * emparejamiento por IA (id/code/description). Se construye en el cliente a
 * partir de los blocs de sabers de las àrees vinculadas a cada asignatura
 * (data/curriculum), no de una colección de Firestore: así siempre refleja
 * el currículum oficial cargado en la app, sin depender de que el docente
 * haya importado nada manualmente.
 */
interface SaberItem {
  id: string;
  code: string;
  description: string;
}

function getSubjectSaberItems(subject: Subject, curriculum: EtapaCurriculum | null): SaberItem[] {
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

/** CE (id + nombre) derivadas de la rúbrica vinculada a una actividad, deduplicadas. */
interface ActivityCe {
  id: string;
  name: string;
}

function activityCeList(plan: WeeklyPlan, rubricsById: Map<string, Rubric>): ActivityCe[] {
  const rubric = plan.rubricId ? rubricsById.get(plan.rubricId) : undefined;
  if (!rubric) return [];
  const seen = new Map<string, ActivityCe>();
  for (const c of rubric.criteria) {
    if (!c.ceId || seen.has(c.ceId)) continue;
    seen.set(c.ceId, { id: c.ceId, name: c.ceName ?? c.ceId });
  }
  return [...seen.values()];
}

/** Ciclo de Primària (1r/2n/3r) a partir del primer curso de la asignatura. Solo aplica a Primària; en el resto de etapas no se muestra. */
function primariaCicleNumber(courseLevel?: string): number | undefined {
  if (!courseLevel) return undefined;
  const first = courseLevel.split(',')[0]?.trim();
  const idx = COURSE_LEVELS_BY_ETAPA.primaria.indexOf(first);
  if (idx === -1) return undefined;
  return Math.floor(idx / 2) + 1;
}

export default function AnnualPlanningPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[] | null>(null);
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [situations, setSituations] = useState<LearningSituation[]>([]);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [editingPlan, setEditingPlan] = useState<WeeklyPlan | null>(null);
  // Antes handleGenerateSaObjectives/handleGenerateSaFields solo tenían
  // try{...}finally{...}: si Gemini fallaba (cuota, red, API key inválida...)
  // el error se perdía en silencio y el botón "Generar con Profi" del panel
  // de SA parecía simplemente "no funcionar". Ahora se captura y se muestra.
  const [saActionError, setSaActionError] = useState<string | null>(null);
  const migratedRef = useRef(false);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeSubjects(user.uid, activeYear.id, setSubjects);
  }, [user, activeYear]);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeAllWeeklyPlans(user.uid, activeYear.id, (raw) => {
      const filtered = raw
        .filter((p) => p.title?.trim())
        .sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate));
      setPlans(filtered);
    });
  }, [user, activeYear]);

  // Migración automática (una sola vez por carga de página, idempotente): las
  // actividades antiguas agrupadas solo por texto libre (saLabel) se
  // convierten en Situaciones de Aprendizaje reales enlazadas por saId, sin
  // tocar ninguna actividad ya migrada ni borrar el texto legacy. Ver
  // firebase/learningSituations.ts.
  useEffect(() => {
    if (migratedRef.current) return;
    if (!user || !activeYear || subjects.length === 0 || plans === null) return;
    migratedRef.current = true;
    const bySubject = new Map<string, WeeklyPlan[]>();
    plans.forEach((p) => {
      const arr = bySubject.get(p.subjectId) ?? [];
      arr.push(p);
      bySubject.set(p.subjectId, arr);
    });
    migrateLegacySaLabels(user.uid, activeYear.id, bySubject).catch((err) => {
      console.error('Error migrando Situaciones de Aprendizaje legacy:', err);
    });
  }, [user, activeYear, subjects, plans]);

  const etapas: Etapa[] = getEffectiveEtapas(profile);
  const comunitat: Comunitat = profile?.comunitat ?? 'catalunya';

  // Saberes disponibles por asignatura, calculados a partir de las àrees de
  // currículum vinculadas a cada asignatura (Asignaturas > Área de
  // currículum) — no de una colección aparte, para que siempre estén
  // disponibles sin que el docente tenga que importar nada. El currículum se
  // resuelve por asignatura (según su propio curso, p.ej. "2n ESO") en vez
  // de uno combinado para toda la página: si el docente imparte más de una
  // etapa (p.ej. ESO y Batxillerat), un currículum combinado mezclaría por
  // error las àrees que se llaman igual en las dos etapas (p.ej.
  // "Matemàtiques"), mostrando saberes/criteris de la etapa equivocada.
  const curriculumBySubject = useMemo(() => {
    const map = new Map<string, SaberItem[]>();
    subjects.forEach((s) => {
      const curriculum = getCurriculumForSubject(comunitat, s.courseLevel, etapas);
      map.set(s.id, getSubjectSaberItems(s, curriculum));
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, comunitat, etapas.join(',')]);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeRubrics(user.uid, activeYear.id, setRubrics);
  }, [user, activeYear]);

  useEffect(() => {
    if (subjects.length === 0) return;
    if (!selectedSubjectId || !subjects.some((s) => s.id === selectedSubjectId)) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [subjects, selectedSubjectId]);

  useEffect(() => {
    if (!user || !activeYear || !selectedSubjectId) { setSituations([]); return; }
    return subscribeLearningSituations(user.uid, activeYear.id, selectedSubjectId, setSituations);
  }, [user, activeYear, selectedSubjectId]);

  const subjectById = useMemo(() => {
    const map = new Map<string, Subject>();
    subjects.forEach((s) => map.set(s.id, s));
    return map;
  }, [subjects]);

  const subjectPlans = useMemo(
    () => (plans ?? []).filter((p) => p.subjectId === selectedSubjectId),
    [plans, selectedSubjectId]
  );

  const situationsById = useMemo(() => {
    const map = new Map<string, LearningSituation>();
    situations.forEach((s) => map.set(s.id, s));
    return map;
  }, [situations]);

  // Agrupa las actividades (ya ordenadas cronológicamente) en bloques
  // consecutivos de la misma Situación de Aprendizaje (por saId, no por
  // texto), para mostrar cada bloque con su propia ficha de SA. Las
  // actividades sin SA quedan en grupos sin `saId`, mostradas sin ficha
  // (como una actividad suelta), igual que antes.
  const saGroups = useMemo(() => {
    const groups: { saId?: string; plans: WeeklyPlan[] }[] = [];
    let lastKey: string | undefined;
    for (const plan of subjectPlans) {
      const key = plan.saId || undefined;
      if (key !== lastKey || groups.length === 0) {
        groups.push({ saId: key, plans: [] });
        lastKey = key;
      }
      groups[groups.length - 1].plans.push(plan);
    }
    return groups;
  }, [subjectPlans]);

  const curriculumById = useMemo(() => {
    const map = new Map<string, SaberItem>();
    curriculumBySubject.forEach((items) => items.forEach((i) => map.set(i.id, i)));
    return map;
  }, [curriculumBySubject]);

  const rubricsById = useMemo(() => {
    const map = new Map<string, Rubric>();
    rubrics.forEach((r) => map.set(r.id, r));
    return map;
  }, [rubrics]);

  const effectiveTerms = useMemo(() => (activeYear ? getEffectiveTerms(activeYear) : []), [activeYear]);

  async function handleGenerateObjectives(plan: WeeklyPlan) {
    const subject = subjectById.get(plan.subjectId);
    if (!subject) return;
    setGeneratingId(plan.id + '-obj');
    try {
      const objectives = await generateActivityObjectives({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityTitle: plan.title,
        description: plan.description,
        language: profile?.language ?? 'es',
      });
      await updatePlanCurriculumAndObjectives(plan.id, { aiObjectives: objectives });
      setPlans((prev) => prev?.map((p) => (p.id === plan.id ? { ...p, aiObjectives: objectives } : p)) ?? null);
    } finally {
      setGeneratingId(null);
    }
  }

  async function handleMatchCurriculum(plan: WeeklyPlan) {
    const subject = subjectById.get(plan.subjectId);
    const items = curriculumBySubject.get(plan.subjectId) ?? [];
    if (!subject || items.length === 0) return;
    setGeneratingId(plan.id + '-curr');
    try {
      const ids = await matchCurriculumItems({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityTitle: plan.title,
        description: plan.description,
        curriculumItems: items.map((i) => ({ id: i.id, code: i.code, description: i.description })),
        language: profile?.language ?? 'es',
      });
      await updatePlanCurriculumAndObjectives(plan.id, { curriculumItemIds: ids });
      setPlans((prev) => prev?.map((p) => (p.id === plan.id ? { ...p, curriculumItemIds: ids } : p)) ?? null);
    } finally {
      setGeneratingId(null);
    }
  }

  async function handleDelete(plan: WeeklyPlan) {
    if (!window.confirm(t('weekly.deleteConfirm'))) return;
    setDeletingId(plan.id);
    try {
      await deleteWeeklyPlan(plan.id);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleGenerateSaObjectives(situation: LearningSituation, situationPlans: WeeklyPlan[]) {
    const subject = subjectById.get(situation.subjectId);
    if (!subject) return;
    setGeneratingId(situation.id + '-sa-obj');
    setSaActionError(null);
    try {
      const objectives = await generateSaObjectives({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        saName: situation.name,
        sessions: situationPlans.map((p) => ({ title: p.title, description: p.description })),
        pgaObjectives: subject.pgaObjectives,
        language: profile?.language ?? 'es',
      });
      await updateLearningSituation(situation.id, { objectives });
    } catch (err) {
      console.error('Error generando los objetivos de la SA con Profi:', err);
      setSaActionError(t('annual.saActionError'));
    } finally {
      setGeneratingId(null);
    }
  }

  async function handleGenerateSaFields(situation: LearningSituation, situationPlans: WeeklyPlan[]) {
    const subject = subjectById.get(situation.subjectId);
    if (!subject) return;
    setGeneratingId(situation.id + '-sa-fields');
    setSaActionError(null);
    try {
      const { methodology, resources } = await generateSaMethodologyResources({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        saName: situation.name,
        sessions: situationPlans.map((p) => ({ title: p.title, description: p.description })),
        language: profile?.language ?? 'es',
      });
      await updateLearningSituation(situation.id, { methodology, resources });
    } catch (err) {
      console.error('Error generando metodología/recursos de la SA con Profi:', err);
      setSaActionError(t('annual.saActionError'));
    } finally {
      setGeneratingId(null);
    }
  }

  async function handleToggleCe(situation: LearningSituation, activityId: string, ceId: string, autoSet: Set<string>) {
    const currentOverride = situation.ceMatrixOverrides?.[activityId];
    const baseSet = currentOverride ? new Set(currentOverride) : new Set(autoSet);
    if (baseSet.has(ceId)) baseSet.delete(ceId); else baseSet.add(ceId);
    const nextOverrides = { ...(situation.ceMatrixOverrides ?? {}), [activityId]: [...baseSet] };
    await updateLearningSituation(situation.id, { ceMatrixOverrides: nextOverrides });
  }

  async function handleExportPdf(scope: 'subject' | 'all') {
    if (!activeYear || !plans) return;
    setExporting(true);
    setExportError(null);
    try {
      const entries = scope === 'subject' ? subjectPlans : plans;
      const subjectName = scope === 'subject' ? subjectById.get(selectedSubjectId)?.name : undefined;
      const blob = await pdf(
        <AnnualPlanPdf
          schoolYearName={activeYear.name}
          entries={entries}
          subjectById={subjectById}
          curriculumById={curriculumById}
          situationsById={situationsById}
          effectiveTerms={effectiveTerms}
          t={t}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const suffix = subjectName ? `_${subjectName.replace(/\s+/g, '_')}` : '_todas';
      a.download = `programacion_anual_${activeYear.name}${suffix}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      // Antes fallaba en silencio (la promesa de pdf().toBlob() rechazaba
      // y el usuario solo veía que "no pasaba nada"). Se muestra el motivo
      // para poder diagnosticarlo si vuelve a romperse en el futuro.
      console.error('Error generando el PDF de programación anual:', err);
      setExportError(t('annual.exportError'));
    } finally {
      setExporting(false);
    }
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-accent mb-1">{t('annual.title')}</h1>
          <p className="text-sm text-ink-soft">{t('annual.subtitle')}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="secondary"
            onClick={() => handleExportPdf('subject')}
            disabled={exporting || !subjectPlans.length}
            icon={<IconDownload size={16} />}
          >
            {exporting ? t('common.loading') : t('annual.downloadSubject')}
          </Button>
          <Button onClick={() => handleExportPdf('all')} disabled={exporting || !plans?.length} icon={<IconDownload size={16} />}>
            {exporting ? t('common.loading') : t('annual.downloadAll')}
          </Button>
        </div>
      </div>

      {exportError && (
        <p className="text-sm text-rose-600 -mt-4">{exportError}</p>
      )}

      {subjects.length > 0 && (
        <Select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="max-w-xs"
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subjectDisplayName(subject)}
            </option>
          ))}
        </Select>
      )}

      {saActionError && (
        <p className="text-sm text-rose-600 -mt-2">{saActionError}</p>
      )}

      {plans === null ? (
        <p className="text-sm text-ink-soft">{t('common.loading')}</p>
      ) : plans.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('annual.noEntries')}</Card>
      ) : subjectPlans.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('annual.noSessionsForSubject')}</Card>
      ) : (
        <div className="flex flex-col gap-4">
          {saGroups.map((group, groupIndex) => {
            const subject = group.plans[0] ? subjectById.get(group.plans[0].subjectId) : undefined;
            const situation = group.saId ? situationsById.get(group.saId) : undefined;

            const activityCards = group.plans.map((plan) => {
              const subjectColors = subject ? subjectColorClasses[subject.color] : null;
              const curriculumItems = (plan.curriculumItemIds ?? [])
                .map((id) => curriculumById.get(id))
                .filter((i): i is SaberItem => Boolean(i));
              const rubric = plan.rubricId ? rubricsById.get(plan.rubricId) : undefined;
              const rubricCriteria = rubric?.criteria ?? [];

              return (
                <Card key={plan.id} className={`border ${subjectColors?.border ?? ''}`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${subjectColors?.bg ?? 'bg-accent-light'} ${subjectColors?.text ?? 'text-accent'}`}>
                          {subject ? subjectDisplayName(subject) : ''}
                        </span>
                        <span className="text-xs text-ink-soft">
                          {t('annual.week')} {plan.weekStartDate}
                        </span>
                        <div className="ml-auto flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingPlan(plan)}
                            icon={<IconEdit size={14} />}
                          >
                            {t('annual.editActivity')}
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(plan)}
                            disabled={deletingId === plan.id}
                            icon={<IconTrash size={14} />}
                          >
                            {deletingId === plan.id ? t('common.loading') : t('weekly.deleteActivity')}
                          </Button>
                        </div>
                      </div>
                      <p className="font-semibold text-ink mb-2">{plan.title}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs font-semibold text-ink-soft mb-1">{t('annual.objectives')}</p>
                          {plan.aiObjectives ? (
                            <p className="text-sm text-ink whitespace-pre-wrap">{plan.aiObjectives}</p>
                          ) : (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleGenerateObjectives(plan)}
                              disabled={generatingId === plan.id + '-obj'}
                              icon={<IconSparkles size={14} />}
                            >
                              {generatingId === plan.id + '-obj' ? t('common.loading') : t('annual.generateObjectives')}
                            </Button>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-ink-soft mb-1">{t('annual.curriculum')}</p>
                          {curriculumItems.length > 0 ? (
                            <ul className="text-sm text-ink list-disc list-inside">
                              {curriculumItems.map((item) => (
                                <li key={item.id}>
                                  {item.code && <span className="font-semibold">{item.code}: </span>}
                                  {item.description}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleMatchCurriculum(plan)}
                              disabled={
                                generatingId === plan.id + '-curr' ||
                                (curriculumBySubject.get(plan.subjectId) ?? []).length === 0
                              }
                              icon={<IconSparkles size={14} />}
                            >
                              {generatingId === plan.id + '-curr' ? t('common.loading') : t('annual.matchCurriculum')}
                            </Button>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-ink-soft mb-1">{t('annual.rubricCriteria')}</p>
                          {rubricCriteria.length > 0 ? (
                            <ul className="text-sm text-ink list-disc list-inside">
                              {rubricCriteria.map((c) => (
                                <li key={c.id}>
                                  {c.ceName && <span className="font-semibold">{c.ceName}: </span>}
                                  {c.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-ink-soft">{t('annual.noRubricLinked')}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-32 shrink-0">
                      <p className="text-xs font-semibold text-ink-soft mb-1">{t('annual.image')}</p>
                      {plan.referenceImageUrl ? (
                        <img
                          src={driveImagePreviewUrl(plan.referenceImageUrl)}
                          alt={plan.title}
                          className="w-full h-24 object-cover rounded-xl"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingPlan(plan)}
                          className="w-full h-24 rounded-xl bg-accent-light flex items-center justify-center text-ink-soft hover:opacity-80"
                        >
                          <IconImage size={24} />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            });

            if (!situation) {
              return <div key={groupIndex} className="flex flex-col gap-3">{activityCards}</div>;
            }

            return (
              <div key={groupIndex} className="flex flex-col gap-3">
                <SaPanel
                  situation={situation}
                  plans={group.plans}
                  subject={subject}
                  curriculumById={curriculumById}
                  rubricsById={rubricsById}
                  effectiveTerms={effectiveTerms}
                  generatingId={generatingId}
                  onGenerateObjectives={() => handleGenerateSaObjectives(situation, group.plans)}
                  onGenerateFields={() => handleGenerateSaFields(situation, group.plans)}
                  onToggleCe={(activityId, ceId, autoSet) => handleToggleCe(situation, activityId, ceId, autoSet)}
                />
                {activityCards}
              </div>
            );
          })}
        </div>
      )}

      {editingPlan && subjectById.get(editingPlan.subjectId) && (
        <EditPlanModal
          plan={editingPlan}
          subject={subjectById.get(editingPlan.subjectId)!}
          saberItems={curriculumBySubject.get(editingPlan.subjectId) ?? []}
          language={profile?.language ?? 'es'}
          onClose={() => setEditingPlan(null)}
          onSaved={(data) => {
            setPlans((prev) => prev?.map((p) => (p.id === editingPlan.id ? { ...p, ...data } : p)) ?? null);
          }}
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Ficha de Situación de Aprendizaje: info calculada (sesiones, fechas,
// curso, ciclo, trimestre, área), campos editables por el docente o
// generados por Profi (objetivos, metodología, recursos, atención a la
// diversidad) y la matriz de contribución a competencias específicas.
// -----------------------------------------------------------------------
function SaPanel({
  situation, plans, subject, curriculumById, rubricsById, effectiveTerms, generatingId, onGenerateObjectives, onGenerateFields, onToggleCe,
}: {
  situation: LearningSituation;
  plans: WeeklyPlan[];
  subject?: Subject;
  curriculumById: Map<string, SaberItem>;
  rubricsById: Map<string, Rubric>;
  effectiveTerms: ReturnType<typeof getEffectiveTerms>;
  generatingId: string | null;
  onGenerateObjectives: () => void;
  onGenerateFields: () => void;
  onToggleCe: (activityId: string, ceId: string, autoSet: Set<string>) => void;
}) {
  const { t } = useTranslation();

  const sessionCount = plans.length;
  const startDate = plans[0]?.weekStartDate;
  const endDate = plans[plans.length - 1]?.weekStartDate;
  const startTerm = startDate ? termForDate(effectiveTerms, startDate) : undefined;
  const endTerm = endDate ? termForDate(effectiveTerms, endDate) : undefined;
  const termLabel = startTerm && endTerm
    ? (startTerm.id === endTerm.id ? startTerm.name : `${startTerm.name} – ${endTerm.name}`)
    : undefined;
  const cicleNumber = primariaCicleNumber(subject?.courseLevel);

  const generatingObjectives = generatingId === situation.id + '-sa-obj';
  const generatingFields = generatingId === situation.id + '-sa-fields';

  // Matriz actividad × CE: columnas = unión de CE de las rúbricas de las
  // actividades de esta SA; cada celda usa el override guardado si existe,
  // si no la CE derivada automáticamente de la rúbrica de esa actividad.
  const ceByActivity = useMemo(() => {
    const map = new Map<string, ActivityCe[]>();
    plans.forEach((p) => map.set(p.id, activityCeList(p, rubricsById)));
    return map;
  }, [plans, rubricsById]);

  const allCe = useMemo(() => {
    const seen = new Map<string, ActivityCe>();
    ceByActivity.forEach((list) => list.forEach((ce) => seen.set(ce.id, ce)));
    return [...seen.values()];
  }, [ceByActivity]);

  const [collecting, setCollecting] = useState<'sabers' | 'criteria' | null>(null);

  // "Recoger de las sesiones": a diferencia de los botones "Generar con
  // Profi" (que llaman a la IA), estos dos son deterministas — recopilan y
  // deduplican lo que ya se ha ido marcando/generando sesión a sesión (saberes
  // enlazados a cada actividad, criterios de las rúbricas usadas), sin volver
  // a llamar a Gemini. Así el docente ve solo lo realmente trabajado en esta SA.
  async function handleCollectSabers() {
    setCollecting('sabers');
    try {
      const seen = new Map<string, string>();
      plans.forEach((p) => {
        (p.curriculumItemIds ?? []).forEach((id) => {
          if (seen.has(id)) return;
          const item = curriculumById.get(id);
          if (item) seen.set(id, item.code ? `${item.code}: ${item.description}` : item.description);
        });
      });
      const text = [...seen.values()].join('\n');
      await updateLearningSituation(situation.id, { sabers: text });
    } finally {
      setCollecting(null);
    }
  }

  async function handleCollectEvaluationCriteria() {
    setCollecting('criteria');
    try {
      const seen = new Map<string, string>();
      plans.forEach((p) => {
        const rubric = p.rubricId ? rubricsById.get(p.rubricId) : undefined;
        rubric?.criteria.forEach((c) => {
          if (seen.has(c.id)) return;
          seen.set(c.id, c.ceName ? `${c.ceName}: ${c.name}` : c.name);
        });
      });
      const text = [...seen.values()].join('\n');
      await updateLearningSituation(situation.id, { evaluationCriteria: text });
    } finally {
      setCollecting(null);
    }
  }

  return (
    <Card className="flex flex-col gap-3 border-2" style={{ borderColor: 'var(--border-accent, var(--border))' }}>
      <p className="font-display text-lg text-accent">{situation.name}</p>

      <div className="flex flex-wrap gap-1.5">
        <InfoPill label={t('annual.saSessions', { count: sessionCount })} />
        {startDate && endDate && <InfoPill label={startDate === endDate ? startDate : `${startDate} – ${endDate}`} />}
        {subject?.courseLevel && <InfoPill label={subject.courseLevel} />}
        {cicleNumber && <InfoPill label={t(`annual.cicle${cicleNumber}`)} />}
        {termLabel && <InfoPill label={termLabel} />}
        {subject?.curriculumAreas && subject.curriculumAreas.length > 0 && (
          <InfoPill label={subject.curriculumAreas.join(', ')} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SaTextField
          label={t('annual.saObjectives')}
          value={situation.objectives}
          onSave={(v) => updateLearningSituation(situation.id, { objectives: v })}
          onGenerate={onGenerateObjectives}
          generating={generatingObjectives}
        />
        <SaTextField
          label={t('annual.saDiversity')}
          value={situation.diversityAttention}
          onSave={(v) => updateLearningSituation(situation.id, { diversityAttention: v })}
        />
        <SaTextField
          label={t('annual.saMethodology')}
          value={situation.methodology}
          onSave={(v) => updateLearningSituation(situation.id, { methodology: v })}
          onGenerate={onGenerateFields}
          generating={generatingFields}
        />
        <SaTextField
          label={t('annual.saResources')}
          value={situation.resources}
          onSave={(v) => updateLearningSituation(situation.id, { resources: v })}
          onGenerate={onGenerateFields}
          generating={generatingFields}
        />
        <SaTextField
          label={t('annual.saSabers')}
          value={situation.sabers}
          onSave={(v) => updateLearningSituation(situation.id, { sabers: v })}
          onCollect={handleCollectSabers}
          collecting={collecting === 'sabers'}
        />
        <SaTextField
          label={t('annual.saEvaluationCriteria')}
          value={situation.evaluationCriteria}
          onSave={(v) => updateLearningSituation(situation.id, { evaluationCriteria: v })}
          onCollect={handleCollectEvaluationCriteria}
          collecting={collecting === 'criteria'}
        />
      </div>

      {allCe.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-ink-soft mb-1.5">{t('annual.saCeMatrix')}</p>
          <div className="overflow-x-auto">
            <table className="text-xs w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="text-left px-2 py-1 font-semibold text-ink-soft"></th>
                  {allCe.map((ce) => (
                    <th key={ce.id} className="px-2 py-1 font-semibold text-ink-soft text-center" title={ce.name}>
                      {ce.id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => {
                  const autoSet = new Set((ceByActivity.get(plan.id) ?? []).map((c) => c.id));
                  const override = situation.ceMatrixOverrides?.[plan.id];
                  return (
                    <tr key={plan.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td className="px-2 py-1 text-ink">{plan.title}</td>
                      {allCe.map((ce) => {
                        const checked = override ? override.includes(ce.id) : autoSet.has(ce.id);
                        return (
                          <td key={ce.id} className="px-2 py-1 text-center">
                            <button
                              type="button"
                              onClick={() => onToggleCe(plan.id, ce.id, autoSet)}
                              className={checked ? 'text-accent font-semibold' : 'text-ink-soft'}
                              aria-label={`${ce.id} · ${plan.title}`}
                            >
                              {checked ? '●' : '–'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}

function InfoPill({ label }: { label: string }) {
  return (
    <span className="text-[11px] rounded-full px-2 py-0.5 bg-accent-light text-accent">{label}</span>
  );
}

/** Campo de texto de una SA (objetivos/metodología/recursos/saberes/criterios/
 * atención a la diversidad): editable por el docente en cualquier momento,
 * con guardado al salir del campo (onBlur) solo si ha cambiado. Dos tipos de
 * botón opcionales, no siempre ambos a la vez: "Generar con Profi" (llama a
 * la IA) y "Recoger de las sesiones" (agrega, sin IA, lo ya trabajado en cada
 * sesión — pensado para saberes/criterios). El label usa `truncate min-w-0` y
 * el/los botón(es) `shrink-0` para que la cabecera mida siempre una sola
 * línea: así todas las casillas del grid arrancan a la misma altura,
 * tengan o no botón (antes, si el texto+botón no cabían, el label pasaba a
 * dos líneas y desalineaba esa fila respecto a la casilla vecina). */
function SaTextField({ label, value, onSave, onGenerate, generating, onCollect, collecting }: {
  label: string;
  value?: string;
  onSave: (v: string) => void;
  onGenerate?: () => void;
  generating?: boolean;
  onCollect?: () => void;
  collecting?: boolean;
}) {
  const { t } = useTranslation();
  const [text, setText] = useState(value ?? '');

  useEffect(() => {
    setText(value ?? '');
  }, [value]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1 gap-2">
        <p className="text-xs font-semibold text-ink-soft truncate min-w-0">{label}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          {onCollect && (
            <Button size="sm" variant="secondary" onClick={onCollect} disabled={collecting} icon={<IconRefresh size={13} />}>
              {collecting ? t('common.loading') : t('annual.saCollectFromSessions')}
            </Button>
          )}
          {onGenerate && (
            <Button size="sm" variant="secondary" onClick={onGenerate} disabled={generating} icon={<IconSparkles size={13} />}>
              {generating ? t('common.loading') : t('annual.saGenerateWithProfi')}
            </Button>
          )}
        </div>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => { if (text !== (value ?? '')) onSave(text); }}
        rows={3}
      />
    </div>
  );
}

// -----------------------------------------------------------------------
// Edición manual de una actividad: imagen de referencia (enlace de Drive
// con previsualización), objetivos y saberes del currículum. Permite ajustar
// a mano lo que la IA haya generado (o rellenarlo desde cero si el docente
// prefiere no usar IA), sin perder ninguna de las funciones de generación
// automática (siguen disponibles como botones dentro del propio modal).
// -----------------------------------------------------------------------
function EditPlanModal({
  plan, subject, saberItems, language, onClose, onSaved,
}: {
  plan: WeeklyPlan;
  subject: Subject;
  saberItems: SaberItem[];
  language: string;
  onClose: () => void;
  onSaved: (data: { aiObjectives?: string; curriculumItemIds?: string[]; referenceImageUrl?: string }) => void;
}) {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState(plan.referenceImageUrl ?? '');
  const [imgError, setImgError] = useState(false);
  const [objectives, setObjectives] = useState(plan.aiObjectives ?? '');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(plan.curriculumItemIds ?? []));
  const [generatingObjectives, setGeneratingObjectives] = useState(false);
  const [matchingSaberes, setMatchingSaberes] = useState(false);
  const [saving, setSaving] = useState(false);

  const previewUrl = imageUrl.trim() ? driveImagePreviewUrl(imageUrl.trim()) : '';

  async function handleGenerateObjectives() {
    setGeneratingObjectives(true);
    try {
      const result = await generateActivityObjectives({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityTitle: plan.title,
        description: plan.description,
        language,
      });
      setObjectives(result);
    } finally {
      setGeneratingObjectives(false);
    }
  }

  async function handleMatchSaberes() {
    if (saberItems.length === 0) return;
    setMatchingSaberes(true);
    try {
      const ids = await matchCurriculumItems({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityTitle: plan.title,
        description: plan.description,
        curriculumItems: saberItems.map((i) => ({ id: i.id, code: i.code, description: i.description })),
        language,
      });
      setSelectedIds(new Set(ids));
    } finally {
      setMatchingSaberes(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const data = {
        aiObjectives: objectives.trim(),
        curriculumItemIds: Array.from(selectedIds),
        referenceImageUrl: imageUrl.trim(),
      };
      await updatePlanCurriculumAndObjectives(plan.id, data);
      onSaved(data);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={`${t('annual.editActivity')} · ${plan.title}`} widthClass="max-w-2xl">
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-ink block mb-1.5">{t('annual.image')}</label>
          <Input
            value={imageUrl}
            onChange={(e) => { setImageUrl(e.target.value); setImgError(false); }}
            placeholder="https://drive.google.com/file/d/..."
          />
          <p className="text-[11px] text-ink-soft mt-1">{t('annual.referenceImageHelp')}</p>
          {previewUrl && (
            imgError ? (
              <p className="text-xs text-rose-600 mt-2">{t('annual.imagePreviewError')}</p>
            ) : (
              <img
                src={previewUrl}
                alt={plan.title}
                onError={() => setImgError(true)}
                className="mt-2 w-full max-h-48 object-contain rounded-xl"
                style={{ background: 'var(--bg-input)' }}
              />
            )
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
            <label className="text-sm font-medium text-ink">{t('annual.objectives')}</label>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleGenerateObjectives}
              disabled={generatingObjectives}
              icon={<IconSparkles size={14} />}
            >
              {generatingObjectives ? t('common.loading') : t('annual.generateObjectives')}
            </Button>
          </div>
          <Textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} rows={3} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
            <label className="text-sm font-medium text-ink">{t('annual.curriculum')}</label>
            {saberItems.length > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={handleMatchSaberes}
                disabled={matchingSaberes}
                icon={<IconSparkles size={14} />}
              >
                {matchingSaberes ? t('common.loading') : t('annual.matchCurriculum')}
              </Button>
            )}
          </div>
          {saberItems.length === 0 ? (
            <p className="text-xs text-ink-soft">{t('annual.saberesEmpty')}</p>
          ) : (
            <TagMultiSelect
              options={saberItems.map((i) => ({ key: i.id, label: `${i.code} — ${i.description}`, chipLabel: i.code, hint: i.description }))}
              selected={selectedIds}
              onChange={setSelectedIds}
              placeholder={t('grades.profiPriorityCePlaceholder')}
            />
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? t('common.loading') : t('common.save')}</Button>
        </div>
      </div>
    </Modal>
  );
}
