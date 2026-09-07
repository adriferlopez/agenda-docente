import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { getEffectiveTerms } from '@/utils/terms';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeGradeCommentTemplate, setGradeCommentTemplate, clearGradeCommentTemplate } from '@/firebase/gradeCommentTemplates';
import { getGradebookActivitiesForSubjectOnce } from '@/firebase/gradebookActivities';
import { getRubricsOnce, updateRubric } from '@/firebase/grades';
import { getCurriculumForSubject } from '@/data/curriculum';
import type { Etapa, Comunitat } from '@/data/curriculum/types';
import { getEffectiveEtapas } from '@/types';
import {
  generateGradeBandPhrases,
  matchCriteriaToCompetencies,
  type PriorityCe,
  type MatchCriteriaCriterion,
  type CommentLength,
} from '@/services/ai';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { IconPlus, IconTrash, IconSparkles, IconRefresh } from '@/components/ui/icons';
import { QUALITATIVE_LEVELS } from '@/types';
import type { Subject, GradeCommentTemplate, GradeCommentBand } from '@/types';

export default function CommentsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedTermId, setSelectedTermId] = useState<string>('');

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeSubjects(user.uid, activeYear.id, setSubjects);
  }, [user, activeYear]);

  // Si no hay asignatura seleccionada todavía, usa la primera disponible
  // (derivado durante el render, no en un efecto, para evitar un render extra).
  const effectiveSubjectId = selectedSubjectId || subjects[0]?.id || '';
  const selectedSubject = subjects.find((s) => s.id === effectiveSubjectId);

  // Cada trimestre puede tener una plantilla de comentario distinta (los
  // criterios que se evalúan, o cómo se redactan las frases, pueden cambiar
  // de un trimestre a otro).
  const terms = useMemo(() => (activeYear ? getEffectiveTerms(activeYear) : []), [activeYear]);
  const effectiveTermId = terms.some((term) => term.id === selectedTermId) ? selectedTermId : terms[0]?.id ?? '';

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-accent mb-1">{t('comments.title')}</h1>
        <p className="text-sm text-ink-soft">{t('comments.subtitle')}</p>
      </div>

      {subjects.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('comments.selectSubjectFirst')}</Card>
      ) : (
        <>
          <Select value={effectiveSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} className="max-w-xs">
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>

          {terms.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {terms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => setSelectedTermId(term.id)}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 transition ${
                    term.id === effectiveTermId ? 'bg-accent text-white' : 'bg-accent-light text-accent hover:opacity-80'
                  }`}
                >
                  {term.name}
                </button>
              ))}
            </div>
          )}

          {selectedSubject && user && effectiveTermId && (
            <GradeCommentTemplateSection
              key={`${selectedSubject.id}-${effectiveTermId}`}
              ownerId={user.uid}
              schoolYearId={activeYear.id}
              subject={selectedSubject}
              termId={effectiveTermId}
              etapas={getEffectiveEtapas(profile)}
              comunitat={profile?.comunitat ?? 'catalunya'}
              hasGeminiKey={profile?.hasGeminiKey ?? false}
            />
          )}
        </>
      )}
    </div>
  );
}

// Opciones de nota para los desplegables "desde"/"hasta" de una franja de
// rango: 0, 0.5, 1, 1.5 ... 10. Un desplegable evita el problema de escribir
// decimales a mano (comas, puntos...) y deja clarísimo entre qué notas se
// aplicará cada frase.
const GRADE_STEP_OPTIONS = Array.from({ length: 21 }, (_, i) => Math.round(i * 0.5 * 10) / 10);

function defaultRangeBands(): GradeCommentBand[] {
  return [
    { min: 0, max: 4.5, text: '' },
    { min: 5, max: 6.5, text: '' },
    { min: 7, max: 8.5, text: '' },
    { min: 9, max: 10, text: '' },
  ];
}

function defaultQualitativeBands(): GradeCommentBand[] {
  return QUALITATIVE_LEVELS.map((level) => ({ level, text: '' }));
}

// -----------------------------------------------------------------------
// Plantilla de frase según nota, por asignatura. A diferencia de las
// plantillas de arriba (texto libre con huecos), esta se usa automáticamente
// en Notas: según la nota final del alumno (numérica o NA/AS/AN/AE) elige la
// frase correspondiente. El docente elige el modo según su etapa: por rango
// numérico (habitual en secundaria) o por nivel de logro (habitual en
// primaria). Se muestra como una tarjeta-resumen de solo lectura con un
// botón para abrir el editor guiado en un modal aparte, en vez de un
// formulario siempre abierto (más claro sobre qué está guardado de verdad).
// -----------------------------------------------------------------------
function GradeCommentTemplateSection({
  ownerId, schoolYearId, subject, termId, etapas, comunitat, hasGeminiKey,
}: {
  ownerId: string;
  schoolYearId: string;
  subject: Subject;
  termId: string;
  etapas: Etapa[];
  comunitat: Comunitat;
  hasGeminiKey: boolean;
}) {
  const { t } = useTranslation();
  const subjectId = subject.id;
  const [template, setTemplate] = useState<GradeCommentTemplate | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoaded(false);
    return subscribeGradeCommentTemplate(ownerId, subjectId, termId, (tpl) => {
      setTemplate(tpl);
      setLoaded(true);
    });
  }, [ownerId, subjectId, termId]);

  if (!loaded) return null;

  const bands = template?.bands ?? [];
  const mode = template?.mode ?? 'range';
  const hasBands = bands.some((b) => b.text.trim() !== '');

  return (
    <Card className="flex flex-col gap-4">
      <p className="text-xs text-ink-soft">{t('comments.gradeTemplateHelp', { subject: subject.name })}</p>

      {!hasBands ? (
        <p className="text-sm text-ink-soft">{t('comments.noGradeBands')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {bands.map((band, i) => (
            <div key={i} className="rounded-2xl p-3 bg-accent-light">
              <span className="text-xs font-semibold text-accent">
                {mode === 'range' ? `${band.min ?? 0}–${band.max ?? 10}` : band.level}
              </span>
              <p className="text-xs text-ink mt-0.5 break-words">
                {band.text || <em className="text-ink-soft">{t('comments.gradeTemplateTextPlaceholder')}</em>}
              </p>
            </div>
          ))}
        </div>
      )}

      <Button size="sm" variant="secondary" onClick={() => setEditing(true)} className="self-start">
        {hasBands ? t('comments.editTemplate') : t('comments.setUpTemplate')}
      </Button>

      {editing && (
        <GradeTemplateEditorModal
          ownerId={ownerId}
          schoolYearId={schoolYearId}
          subject={subject}
          termId={termId}
          etapas={etapas}
          comunitat={comunitat}
          hasGeminiKey={hasGeminiKey}
          template={template}
          onClose={() => setEditing(false)}
        />
      )}
    </Card>
  );
}

// Un criterio de evaluación realmente usado en alguna actividad evaluable de
// la asignatura (con la información necesaria para que Profi lo use y para
// mostrarlo al docente en el selector de checkboxes). Cada criterio suele
// derivar de una Competència Específica del currículum, pero nos guiamos por
// el criterio en sí (lo que el docente ha evaluado de verdad en su rúbrica),
// no por el catálogo teórico de CE de la asignatura.
interface EvaluatedCriterion {
  key: string; // nombre normalizado del criterio, para deduplicar entre rúbricas/actividades
  id: string; // ceId si el criterio tiene una CE vinculada, si no un id genérico
  name: string;
  reference: string;
}

// Un criterio evaluado que todavía NO tiene una CE vinculada, con la
// referencia exacta a dónde vive (para poder guardar el emparejamiento que
// detecte Profi directamente en su rúbrica de origen).
interface UnlinkedCriterion {
  rubricId: string;
  criterionId: string;
  name: string;
  description: string;
}

// -----------------------------------------------------------------------
// Editor guiado: modo (rango/nivel) + una fila por frase, con desplegables
// para elegir "desde"/"hasta" en modo rango (nada de escribir decimales a
// mano) y hasta 5 frases por defecto en modo rango (4 de partida + botón
// para añadir una más). El modo nivel siempre tiene exactamente las 4
// franjas fijas NA/AS/AN/AE.
// -----------------------------------------------------------------------
function GradeTemplateEditorModal({
  ownerId, schoolYearId, subject, termId, etapas, comunitat, hasGeminiKey, template, onClose,
}: {
  ownerId: string;
  schoolYearId: string;
  subject: Subject;
  termId: string;
  etapas: Etapa[];
  comunitat: Comunitat;
  hasGeminiKey: boolean;
  template: GradeCommentTemplate | null;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const subjectId = subject.id;
  const [mode, setMode] = useState<GradeCommentTemplate['mode']>(template?.mode ?? 'range');
  const [bands, setBands] = useState<GradeCommentBand[]>(
    template?.bands && template.bands.length > 0
      ? template.bands
      : template?.mode === 'qualitative'
      ? defaultQualitativeBands()
      : defaultRangeBands()
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [profiLoading, setProfiLoading] = useState(false);
  const [profiError, setProfiError] = useState('');
  const [commentLength, setCommentLength] = useState<CommentLength>('medium');
  const [deleting, setDeleting] = useState(false);
  const hasSavedBands = (template?.bands ?? []).some((b) => b.text.trim() !== '');

  // Competències Específiques de la asignatura (según sus àrees de
  // currículum), usadas como catálogo de referencia para que Profi pueda
  // detectar de cuál viene cada criterio sin CE vinculada.
  // Currículum de la etapa real de esta asignatura (según su curso), no uno
  // combinado de todas las etapas del docente: evita mezclar CE de otra
  // etapa cuando un àrea se llama igual en las dos (p.ej. "Matemàtiques" en
  // ESO y Batxillerat).
  const curriculum = getCurriculumForSubject(comunitat, subject.courseLevel, etapas);
  const cePool = useMemo(() => {
    const list: { id: string; title: string; description: string; area: string }[] = [];
    for (const area of subject.curriculumAreas ?? []) {
      const areaData = curriculum?.competencies?.[area];
      if (!areaData) continue;
      for (const ce of areaData.competencies) {
        list.push({ id: ce.id, title: ce.title, description: ce.description, area });
      }
    }
    return list;
  }, [subject, curriculum]);

  // Criterios de evaluación que se usan de verdad en esta asignatura: se
  // sacan de TODOS los criterios de las rúbricas usadas en las actividades
  // evaluables de la asignatura (en cualquier trimestre), tengan o no una
  // Competència Específica vinculada — nos interesa lo que el docente evalúa
  // de verdad, no el catálogo teórico de CE de la asignatura.
  const [evaluatedCriteria, setEvaluatedCriteria] = useState<EvaluatedCriterion[]>([]);
  // Criterios evaluados que todavía no tienen CE vinculada, guardados con su
  // rúbrica de origen para poder detectar y guardar su CE con Profi.
  const [unlinkedCriteria, setUnlinkedCriteria] = useState<UnlinkedCriterion[]>([]);
  const [loadingCe, setLoadingCe] = useState(true);
  const [selectedCeKeys, setSelectedCeKeys] = useState<Set<string>>(new Set());
  // Distingue por qué no hay criterios para mostrar: sin actividades
  // todavía, actividades con rúbricas sin ningún criterio definido, o un
  // error real de carga (para no confundir "no hay datos" con "algo ha fallado").
  const [ceEmptyReason, setCeEmptyReason] = useState<'noActivities' | 'noCriteria' | null>(null);
  const [ceLoadError, setCeLoadError] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState('');
  const [detectNotice, setDetectNotice] = useState('');
  // Evita relanzar la detección automática varias veces mientras el modal
  // sigue abierto (por ejemplo, tras el refresco de criterios que la propia
  // detección dispara al terminar).
  const autoDetectRef = useRef(false);

  async function refreshEvaluatedCriteria() {
    setLoadingCe(true);
    setCeLoadError('');
    setCeEmptyReason(null);
    try {
      // Todas las actividades evaluables de la asignatura, en cualquier
      // trimestre, en un único query (no hace falta iterar término a
      // término: solo nos interesa qué criterios se evalúan alguna vez).
      const activities = await getGradebookActivitiesForSubjectOnce(ownerId, schoolYearId, subject.id);
      if (activities.length === 0) {
        setEvaluatedCriteria([]);
        setUnlinkedCriteria([]);
        setCeEmptyReason('noActivities');
        return;
      }
      const rubrics = await getRubricsOnce(ownerId, schoolYearId);
      const rubricsById = new Map(rubrics.map((r) => [r.id, r]));

      const map = new Map<string, EvaluatedCriterion>();
      const unlinked: UnlinkedCriterion[] = [];
      const seenUnlinked = new Set<string>();
      for (const activity of activities) {
        const rubric = rubricsById.get(activity.rubricId);
        if (!rubric) continue;
        // Las rúbricas sintéticas de "nota manual" (ver GradesPage.tsx,
        // manualMode) tienen un único criterio genérico llamado literalmente
        // "Nota", sin relación con ninguna competencia del currículum: si no
        // se excluyen aquí, aparecían como una casilla más para "mencionar"
        // en el comentario (y Profi intentaba, en vano, emparejarla con una
        // CE al detectar automáticamente).
        if (rubric.isManual) continue;
        const criteria = activity.criterionIds && activity.criterionIds.length > 0
          ? rubric.criteria.filter((c) => activity.criterionIds!.includes(c.id))
          : rubric.criteria;
        for (const c of criteria) {
          const name = (c.ceName ?? c.name ?? '').trim();
          if (!name) continue;
          // Si el criterio viene de una CE del currículum, agrupamos por
          // esa CE (mismo ceId) — así dos rúbricas/actividades distintas
          // que evalúan la misma competencia aparecen como una sola
          // casilla, aunque el criterio esté redactado con otras palabras
          // en cada una. Si no tiene CE vinculada, se queda como criterio
          // suelto (clave por nombre, como antes) y además lo apuntamos
          // para poder detectar su CE con Profi.
          const key = c.ceId ? `ce:${c.ceId}` : `crit:${name.toLowerCase()}`;
          if (!map.has(key)) {
            map.set(key, {
              key,
              id: c.ceId ?? c.id,
              name,
              reference: c.ceReference ?? c.description ?? '',
            });
          }
          const unlinkedKey = `${rubric.id}:${c.id}`;
          if (!c.ceId && !seenUnlinked.has(unlinkedKey)) {
            seenUnlinked.add(unlinkedKey);
            unlinked.push({ rubricId: rubric.id, criterionId: c.id, name: c.name, description: c.description ?? '' });
          }
        }
      }
      const list = Array.from(map.values());
      setEvaluatedCriteria(list);
      setUnlinkedCriteria(unlinked);
      setSelectedCeKeys((prev) => {
        // La primera vez marcamos todo; en un refresco tras detectar CE,
        // conservamos lo que el docente ya tuviera marcado/desmarcado y solo
        // añadimos las casillas nuevas (marcadas por defecto).
        const next = new Set(prev);
        for (const c of list) if (!prev.has(c.key)) next.add(c.key);
        return next;
      });
      if (list.length === 0) setCeEmptyReason('noCriteria');
    } catch (err) {
      setCeLoadError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingCe(false);
    }
  }

  useEffect(() => {
    refreshEvaluatedCriteria();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId, schoolYearId, subject.id]);

  // Detección automática de CE: en cuanto sabemos que hay criterios
  // evaluados sin CE vinculada y un catálogo de CE de dónde sacarla, Profi
  // los detecta solo (sin que el docente tenga que pulsar nada). Solo se
  // dispara una vez por apertura del modal.
  useEffect(() => {
    if (autoDetectRef.current) return;
    if (loadingCe || detecting) return;
    if (unlinkedCriteria.length === 0) return;
    if (cePool.length === 0) return;
    if (!hasGeminiKey) return;
    autoDetectRef.current = true;
    handleDetectCe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCe, detecting, unlinkedCriteria, cePool, hasGeminiKey]);

  async function handleDetectCe() {
    if (cePool.length === 0) {
      setDetectError(t('comments.noCurriculumAreas'));
      return;
    }
    setDetecting(true);
    setDetectError('');
    setDetectNotice('');
    try {
      const criteriaInput: MatchCriteriaCriterion[] = unlinkedCriteria.map((c, i) => ({
        index: i,
        name: c.name,
        description: c.description || undefined,
      }));
      const matches = await matchCriteriaToCompetencies({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        competencies: cePool.map(({ id, title, description }) => ({ id, title, description })),
        criteria: criteriaInput,
        language: i18n.language,
      });

      // Agrupamos los cambios por rúbrica para hacer un solo guardado por
      // cada rúbrica afectada, en vez de uno por criterio.
      const patchesByRubric = new Map<string, Map<string, string>>();
      for (const m of matches) {
        if (!m.ceId) continue;
        const src = unlinkedCriteria[m.index];
        if (!src) continue;
        if (!patchesByRubric.has(src.rubricId)) patchesByRubric.set(src.rubricId, new Map());
        patchesByRubric.get(src.rubricId)!.set(src.criterionId, m.ceId);
      }

      if (patchesByRubric.size === 0) {
        setDetectNotice(t('comments.noCeDetected'));
        return;
      }

      const rubrics = await getRubricsOnce(ownerId, schoolYearId);
      const rubricsById = new Map(rubrics.map((r) => [r.id, r]));
      for (const [rubricId, criterionMap] of patchesByRubric) {
        const rubric = rubricsById.get(rubricId);
        if (!rubric) continue;
        const newCriteria = rubric.criteria.map((c) => {
          const ceId = criterionMap.get(c.id);
          if (!ceId) return c;
          const ce = cePool.find((p) => p.id === ceId);
          if (!ce) return c;
          return {
            ...c,
            ceId: ce.id,
            ceName: ce.title,
            ceLabel: `${ce.area} · ${ce.id}`,
            ceReference: ce.description,
          };
        });
        await updateRubric(rubricId, { criteria: newCriteria });
      }
      await refreshEvaluatedCriteria();
    } catch (err) {
      setDetectError(err instanceof Error ? err.message : String(err));
    } finally {
      setDetecting(false);
    }
  }

  async function handleGenerateProfi() {
    setProfiLoading(true);
    setProfiError('');
    try {
      const priorityCe: PriorityCe[] = evaluatedCriteria
        .filter((c) => selectedCeKeys.has(c.key))
        .map((c) => ({ id: c.id, title: c.name, description: c.reference }));
      const texts = await generateGradeBandPhrases({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        mode,
        bands: bands.map((b) => ({ min: b.min, max: b.max, level: b.level })),
        priorityCe: priorityCe.length > 0 ? priorityCe : undefined,
        length: commentLength,
        language: i18n.language,
      });
      setBands((prev) => prev.map((b, i) => ({ ...b, text: texts[i] ?? b.text })));
    } catch (err) {
      setProfiError(err instanceof Error ? err.message : String(err));
    } finally {
      setProfiLoading(false);
    }
  }

  function switchMode(next: GradeCommentTemplate['mode']) {
    setMode(next);
    if (next === 'qualitative') {
      setBands((prev) => QUALITATIVE_LEVELS.map((level) => prev.find((b) => b.level === level) ?? { level, text: '' }));
    } else {
      const rangeBands = bands.filter((b) => b.min !== undefined || b.max !== undefined);
      setBands(rangeBands.length > 0 ? rangeBands : defaultRangeBands());
    }
  }

  function addRangeBand() {
    const highestMax = bands.reduce((mx, b) => Math.max(mx, b.max ?? 0), -1);
    const nextMin = highestMax >= 0 ? Math.min(10, highestMax) : 0;
    setBands((prev) => [...prev, { min: nextMin, max: 10, text: '' }]);
  }

  function updateBand(i: number, patch: Partial<GradeCommentBand>) {
    setBands((prev) => prev.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  }

  function removeBand(i: number) {
    setBands((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      await setGradeCommentTemplate(ownerId, subjectId, termId, { mode, bands });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteTemplate() {
    if (!window.confirm(t('comments.deleteTemplateConfirm'))) return;
    setDeleting(true);
    setError('');
    try {
      await clearGradeCommentTemplate(ownerId, subjectId, termId);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('comments.gradeTemplateTitle')} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => switchMode('range')}
            className={`text-xs font-semibold rounded-full px-3 py-1.5 ${mode === 'range' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
          >
            {t('comments.modeRange')}
          </button>
          <button
            type="button"
            onClick={() => switchMode('qualitative')}
            className={`text-xs font-semibold rounded-full px-3 py-1.5 ${mode === 'qualitative' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
          >
            {t('comments.modeQualitative')}
          </button>
        </div>

        <p className="text-xs text-ink-soft -mt-2">
          {mode === 'range' ? t('comments.rangeModeHelp') : t('comments.qualitativeModeHelp')}
        </p>

        {!hasGeminiKey && (
          <p className="text-xs text-butter-600 bg-butter-50 rounded-xl px-3 py-2">{t('grades.needsGeminiKey')}</p>
        )}

        {/* Mientras Profi detecta las competencias, ocultamos del todo la
            lista de criterios (todavía sin CE) para no confundir al docente
            mostrando primero los nombres "en crudo" de los criterios y luego
            sustituyéndolos por las competencias — mejor un solo estado de
            carga grande y claro. */}
        {!loadingCe && detecting && (
          <div className="flex flex-col items-center justify-center gap-2 py-10 rounded-2xl bg-accent-light">
            <IconRefresh size={28} className="animate-spin text-accent" />
            <p className="text-sm font-semibold text-accent">{t('comments.detectingCe')}</p>
          </div>
        )}

        {!loadingCe && !detecting && evaluatedCriteria.length > 0 && (
          <TagMultiSelect
            label={t('comments.evaluatedCeLabel')}
            options={evaluatedCriteria.map((c) => {
              // Si el ítem está vinculado a una CE (key con prefijo "ce:"),
              // anteponemos su código (p. ej. "CE2") al nombre, igual que en
              // el selector de rúbricas de Notas, para que se distinga
              // visualmente de un criterio suelto aún sin vincular.
              const label = c.key.startsWith('ce:') ? `${c.id} — ${c.name}` : c.name;
              return { key: c.key, label, chipLabel: label, hint: c.reference };
            })}
            selected={selectedCeKeys}
            onChange={setSelectedCeKeys}
            placeholder={t('comments.evaluatedCePlaceholder')}
          />
        )}

        {!loadingCe && !detecting && ceLoadError && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{t('comments.saveError')}: {ceLoadError}</p>
        )}

        {!loadingCe && !detecting && !ceLoadError && ceEmptyReason === 'noActivities' && (
          <p className="text-xs text-ink-soft">{t('comments.noEvaluatedActivities')}</p>
        )}

        {!loadingCe && !detecting && !ceLoadError && ceEmptyReason === 'noCriteria' && (
          <p className="text-xs text-ink-soft">{t('comments.noCeInRubrics')}</p>
        )}

        {!loadingCe && !detecting && unlinkedCriteria.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {cePool.length === 0 ? (
              <p className="text-xs text-ink-soft">{t('comments.noCurriculumAreas')}</p>
            ) : (
              <>
                {detectError && (
                  <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{t('comments.saveError')}: {detectError}</p>
                )}
                {detectNotice && <p className="text-xs text-ink-soft">{detectNotice}</p>}
              </>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-ink-soft">{t('comments.commentLengthLabel')}</p>
          <div className="flex gap-1.5">
            {(['short', 'medium', 'long'] as CommentLength[]).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => setCommentLength(len)}
                className={`text-xs font-semibold rounded-full px-3 py-1.5 ${commentLength === len ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
              >
                {t(`comments.commentLength.${len}`)}
              </button>
            ))}
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          icon={<IconSparkles size={14} />}
          onClick={handleGenerateProfi}
          disabled={profiLoading}
          className="self-start"
        >
          {profiLoading ? t('grades.profiGenerating') : t('comments.generateBandPhrases')}
        </Button>

        {profiError && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{t('comments.saveError')}: {profiError}</p>
        )}

        <div className="flex flex-col gap-3">
          {bands.map((band, i) => (
            <div key={i} className="rounded-2xl p-3 bg-accent-light">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                {mode === 'range' ? (
                  <div className="flex items-center gap-1.5 flex-wrap text-xs text-ink-soft">
                    <span>{t('comments.gradeFrom')}</span>
                    <select
                      value={band.min ?? 0}
                      onChange={(e) => updateBand(i, { min: parseFloat(e.target.value) })}
                      className="border border-lav-200 rounded-xl px-1.5 py-1 text-xs bg-theme-card focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {GRADE_STEP_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <span>{t('comments.gradeTo')}</span>
                    <select
                      value={band.max ?? 10}
                      onChange={(e) => updateBand(i, { max: parseFloat(e.target.value) })}
                      className="border border-lav-200 rounded-xl px-1.5 py-1 text-xs bg-theme-card focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {GRADE_STEP_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-accent">{band.level}</span>
                )}
                {mode === 'range' && (
                  <button onClick={() => removeBand(i)} className="text-ink-soft hover:text-rose-600 shrink-0" aria-label={t('common.delete')}>
                    <IconTrash size={14} />
                  </button>
                )}
              </div>
              <Textarea
                value={band.text}
                onChange={(e) => updateBand(i, { text: e.target.value })}
                rows={2}
                placeholder={t('comments.gradeTemplateTextPlaceholder')}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {mode === 'range' && (
          <Button size="sm" variant="secondary" icon={<IconPlus size={14} />} onClick={addRangeBand} className="self-start">
            {t('comments.addBand')}
          </Button>
        )}

        {error && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{t('comments.saveError')}: {error}</p>
        )}
      </div>

      {/* Fijo abajo (sticky) para que Guardar/Cancelar sean siempre
          alcanzables aunque haya varias frases y el modal necesite scroll. */}
      <div
        className="flex gap-2 sticky bottom-0 -mx-6 -mb-6 px-6 py-4 mt-4"
        style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderRadius: '0 0 16px 16px' }}
      >
        <Button onClick={handleSave} disabled={saving}>
          {t('common.save')}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        {hasSavedBands && (
          <Button
            variant="danger"
            onClick={handleDeleteTemplate}
            disabled={deleting}
            icon={<IconTrash size={14} />}
            className="ml-auto"
          >
            {deleting ? t('common.loading') : t('comments.deleteTemplate')}
          </Button>
        )}
      </div>
    </Modal>
  );
}
