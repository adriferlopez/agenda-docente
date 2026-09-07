import { useEffect, useMemo, useState, type DragEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects, createSubject, updateSubject, deleteSubject, updateSubjectsOrder, setSubjectHidden } from '@/firebase/subjects';
import { subscribeStudentGroups } from '@/firebase/students';
import { getCurriculum, getCurriculumForEtapas, etapaForCourseLevels, COURSE_LEVELS_BY_ETAPA } from '@/data/curriculum';
import type { Etapa, Comunitat } from '@/data/curriculum/types';
import { getEffectiveEtapas } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconEdit, IconEyeOff, IconEye } from '@/components/ui/icons';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import type { Subject, SubjectColor, StudentGroup } from '@/types';
import { SUBJECT_COLORS } from '@/types';

// Catálogo de cursos concretos por etapa educativa (COURSE_LEVELS_BY_ETAPA,
// importado de data/curriculum), para que el docente elija de una lista
// cerrada en vez de escribir texto libre (evita variantes tipo "3º ESO" /
// "3r ESO" / "ESO 3" que luego no se pueden comparar entre sí). Máximo 3
// cursos por asignatura (MAX_COURSE_LEVELS). Este mismo catálogo permite
// deducir de forma fiable a qué etapa pertenece una asignatura concreta
// (ver etapaForCourseLevels), para no mezclar áreas de currículum de
// distintas etapas cuando el docente imparte más de una (p.ej. ESO y
// Batxillerat comparten nombres de área como "Matemàtiques").
const MAX_COURSE_LEVELS = 3;

// Orden global de todos los cursos posibles (para el modo "ciclo/curso"),
// concatenando las etapas en su orden natural.
const ALL_COURSE_LEVELS_ORDER = Object.values(COURSE_LEVELS_BY_ETAPA).flat();

type SortMode = 'manual' | 'course' | 'alpha';

export default function SubjectsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [courseLevels, setCourseLevels] = useState<Set<string>>(new Set());
  const [group, setGroup] = useState('');
  const [studentGroupId, setStudentGroupId] = useState('');
  const [color, setColor] = useState<SubjectColor>('lav');
  const [curriculumAreas, setCurriculumAreas] = useState<Set<string>>(new Set());
  const [pgaObjectives, setPgaObjectives] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('manual');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [manualOrder, setManualOrder] = useState<Subject[]>([]);
  const [activeTab, setActiveTab] = useState<'visible' | 'hidden'>('visible');

  const etapas: Etapa[] = getEffectiveEtapas(profile);
  const comunitat: Comunitat = profile?.comunitat ?? 'catalunya';
  // Las opciones de área se limitan a la etapa real de la asignatura (deducida
  // de los cursos ya marcados en el formulario, p.ej. "2n ESO" -> ESO) en vez
  // de mezclar las áreas de TODAS las etapas del docente: así, un docente que
  // imparte ESO y Batxillerat no puede vincular por error una asignatura de
  // ESO a los saberes/CE de Batxillerat (o viceversa), aunque el área se
  // llame igual en las dos etapas (p.ej. "Matemàtiques"). Si el docente aún
  // no ha elegido curso, se muestran las áreas de todas sus etapas (como
  // antes) hasta que elija uno.
  const formEtapa = etapaForCourseLevels(courseLevels);
  const curriculumAreaOptions = (
    (formEtapa ? getCurriculum(comunitat, formEtapa) : getCurriculumForEtapas(comunitat, etapas))?.areaNames ?? []
  ).map((a) => ({
    key: a,
    label: a,
  }));
  const courseLevelOptions = [...new Set(etapas.flatMap((e) => COURSE_LEVELS_BY_ETAPA[e]))].map((c) => ({
    key: c,
    label: c,
  }));
  function handleCourseLevelsChange(next: Set<string>) {
    if (next.size <= MAX_COURSE_LEVELS) setCourseLevels(next);
  }

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsubGroups = subscribeStudentGroups(user.uid, activeYear.id, setStudentGroups);
    return () => {
      unsubSubjects();
      unsubGroups();
    };
  }, [user, activeYear]);

  // Asignaturas ocultas por el docente (p.ej. refuerzos que no usan la app):
  // se apartan del listado principal pero siguen existiendo con normalidad
  // en el resto de la app. Solo afecta a esta página.
  const visibleSubjects = useMemo(() => subjects.filter((s) => !s.hidden), [subjects]);
  const hiddenSubjects = useMemo(() => subjects.filter((s) => s.hidden), [subjects]);

  // Orden manual: por defecto, order guardado (o createdAt si aún no tiene).
  // Se mantiene una copia local para poder arrastrar con feedback inmediato
  // antes de que llegue la confirmación de Firestore.
  useEffect(() => {
    const byManualOrder = [...visibleSubjects].sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.createdAt - b.createdAt;
    });
    setManualOrder(byManualOrder);
  }, [visibleSubjects]);

  const sortedSubjects = useMemo(() => {
    if (sortMode === 'alpha') {
      return [...visibleSubjects].sort((a, b) => a.name.localeCompare(b.name, 'es'));
    }
    if (sortMode === 'course') {
      return [...visibleSubjects].sort((a, b) => {
        const firstCourseA = (a.courseLevel ?? '').split(',')[0].trim();
        const firstCourseB = (b.courseLevel ?? '').split(',')[0].trim();
        const indexA = ALL_COURSE_LEVELS_ORDER.indexOf(firstCourseA);
        const indexB = ALL_COURSE_LEVELS_ORDER.indexOf(firstCourseB);
        const orderA = indexA === -1 ? ALL_COURSE_LEVELS_ORDER.length : indexA;
        const orderB = indexB === -1 ? ALL_COURSE_LEVELS_ORDER.length : indexB;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name, 'es');
      });
    }
    return manualOrder;
  }, [sortMode, visibleSubjects, manualOrder]);

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>, overIndex: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;
    setManualOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(overIndex, 0, moved);
      return next;
    });
    setDragIndex(overIndex);
  }

  function handleDragEnd() {
    setDragIndex(null);
    updateSubjectsOrder(manualOrder.map((s) => s.id));
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!user || !activeYear) return;
    setFormError('');
    // El curso (courseLevels) es opcional, igual que el grupo o el área de
    // currículum: hay asignaturas (p.ej. Tutoria, Reforç) que no encajan en
    // un curso concreto o que el docente prefiere dejar sin especificar.
    setSaving(true);
    try {
      await createSubject(user.uid, activeYear.id, {
        name,
        courseLevel: Array.from(courseLevels).join(', '),
        group,
        studentGroupId: studentGroupId || undefined,
        color,
        curriculumAreas: curriculumAreas.size > 0 ? Array.from(curriculumAreas) : undefined,
        pgaObjectives: pgaObjectives.trim() || undefined,
      });
      setName('');
      setCourseLevels(new Set());
      setGroup('');
      setStudentGroupId('');
      setColor('lav');
      setCurriculumAreas(new Set());
      setPgaObjectives('');
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-accent mb-1">{t('subjects.title')}</h1>
        <p className="text-sm text-ink-soft">{activeYear.name}</p>
      </div>

      {subjects.length === 0 && !showForm && (
        <p className="text-sm text-ink-soft">{t('subjects.noSubjects')}</p>
      )}

      {subjects.length > 0 && (
        <div className="flex gap-2 border-b" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setActiveTab('visible')}
            className={`text-sm font-semibold px-3 py-2 -mb-px border-b-2 transition ${
              activeTab === 'visible' ? 'border-accent text-accent' : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {t('subjects.tabVisible')} ({visibleSubjects.length})
          </button>
          {hiddenSubjects.length > 0 && (
            <button
              onClick={() => setActiveTab('hidden')}
              className={`text-sm font-semibold px-3 py-2 -mb-px border-b-2 transition ${
                activeTab === 'hidden' ? 'border-accent text-accent' : 'border-transparent text-ink-soft hover:text-ink'
              }`}
            >
              {t('subjects.tabHidden')} ({hiddenSubjects.length})
            </button>
          )}
        </div>
      )}

      {activeTab === 'hidden' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-ink-soft">{t('subjects.hiddenHelp')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenSubjects.map((subject) => {
              const colors = subjectColorClasses[subject.color];
              return (
                <Card key={subject.id} className={`flex items-center justify-between gap-3 border ${colors.border} opacity-70`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-3 h-3 rounded-full ${colors.dot} shrink-0`} />
                    <p className="font-medium text-ink truncate">{subjectDisplayName(subject)}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => setSubjectHidden(subject.id, false)}
                      className="text-ink-soft hover:text-accent p-1"
                      aria-label={t('subjects.unhide')}
                      title={t('subjects.unhide')}
                    >
                      <IconEye size={15} />
                    </button>
                    <button
                      onClick={() => setEditingSubject(subject)}
                      className="text-ink-soft hover:text-accent p-1"
                      aria-label={t('common.edit')}
                      title={t('common.edit')}
                    >
                      <IconEdit size={15} />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'visible' && (
      <>
      {visibleSubjects.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-sm text-ink-soft" htmlFor="subjects-sort">
            {t('subjects.sortBy')}
          </label>
          <Select
            id="subjects-sort"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="max-w-[220px]"
          >
            <option value="manual">{t('subjects.sortManual')}</option>
            <option value="course">{t('subjects.sortCourse')}</option>
            <option value="alpha">{t('subjects.sortAlpha')}</option>
          </Select>
          {sortMode === 'manual' && (
            <span className="text-[11px] text-ink-soft">{t('subjects.sortManualHelp')}</span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSubjects.map((subject, index) => {
          const colors = subjectColorClasses[subject.color];
          const draggable = sortMode === 'manual';
          return (
            <Card
              key={subject.id}
              className={`flex flex-col gap-3 border ${colors.border} ${
                draggable ? 'cursor-grab active:cursor-grabbing' : ''
              } ${dragIndex === index ? 'opacity-60' : ''}`}
              draggable={draggable}
              onDragStart={() => draggable && handleDragStart(index)}
              onDragOver={(e) => draggable && handleDragOver(e, index)}
              onDragEnd={() => draggable && handleDragEnd()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                  <p className="font-semibold text-ink">{subjectDisplayName(subject)}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSubjectHidden(subject.id, true)}
                    className="text-ink-soft hover:text-accent p-1"
                    aria-label={t('subjects.hide')}
                    title={t('subjects.hide')}
                  >
                    <IconEyeOff size={15} />
                  </button>
                  <button
                    onClick={() => setEditingSubject(subject)}
                    className="text-ink-soft hover:text-accent p-1"
                    aria-label={t('common.edit')}
                  >
                    <IconEdit size={15} />
                  </button>
                  <button
                    onClick={() => {
                      if (!activeYear || !user) return;
                      if (!window.confirm(t('subjects.deleteConfirm'))) return;
                      deleteSubject(subject.id, user.uid, activeYear.id);
                    }}
                    className="text-ink-soft hover:text-rose-600 p-1"
                    aria-label={t('common.delete')}
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              </div>
              {subject.curriculumAreas && subject.curriculumAreas.length > 0 && (
                <p className="text-[11px] text-ink-soft">
                  {t('subjects.curriculumAreas')}: {subject.curriculumAreas.join(', ')}
                </p>
              )}
            </Card>
          );
        })}
      </div>

      {showForm ? (
        <Card className="max-w-md">
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <Input
              label={t('subjects.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div>
              <TagMultiSelect
                label={t('subjects.courseLevel')}
                options={courseLevelOptions}
                selected={courseLevels}
                onChange={handleCourseLevelsChange}
                placeholder={t('subjects.courseLevelPlaceholder')}
              />
              <p className="text-[11px] text-ink-soft mt-1">{t('subjects.courseLevelHelp')}</p>
            </div>
            <Input
              label={t('subjects.group')}
              placeholder={t('subjects.groupPlaceholder')}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            {studentGroups.length > 0 && (
              <Select
                label={t('subjects.selectGroupOptional')}
                value={studentGroupId}
                onChange={(e) => setStudentGroupId(e.target.value)}
              >
                <option value="">{t('subjects.noGroup')}</option>
                {studentGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </Select>
            )}
            {curriculumAreaOptions.length > 0 && (
              <div>
                <TagMultiSelect
                  label={t('subjects.curriculumAreas')}
                  options={curriculumAreaOptions}
                  selected={curriculumAreas}
                  onChange={setCurriculumAreas}
                  placeholder={t('subjects.curriculumAreasPlaceholder')}
                />
                <p className="text-[11px] text-ink-soft mt-1">{t('subjects.curriculumAreasHelp')}</p>
              </div>
            )}
            <div>
              <Textarea
                label={t('subjects.pgaObjectives')}
                value={pgaObjectives}
                onChange={(e) => setPgaObjectives(e.target.value)}
                rows={3}
              />
              <p className="text-[11px] text-ink-soft mt-1">{t('subjects.pgaObjectivesHelp')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('subjects.color')}</label>
              <div className="flex gap-2 flex-wrap">
                {SUBJECT_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${subjectColorClasses[c].dot} ${
                      color === c ? 'ring-2 ring-offset-2 ring-ink' : ''
                    }`}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
            {formError && (
              <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{formError}</p>
            )}
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {t('subjects.create')}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)} icon={<IconPlus size={18} />} className="self-start">
          {t('subjects.create')}
        </Button>
      )}
      </>
      )}

      {editingSubject && (
        <EditSubjectModal
          subject={editingSubject}
          studentGroups={studentGroups}
          comunitat={comunitat}
          fallbackEtapas={etapas}
          courseLevelOptions={courseLevelOptions}
          onClose={() => setEditingSubject(null)}
        />
      )}
    </div>
  );
}

// ── Modal de edición de asignatura ───────────────────────────────────
function EditSubjectModal({ subject, studentGroups, comunitat, fallbackEtapas, courseLevelOptions, onClose }: {
  subject: Subject;
  studentGroups: StudentGroup[];
  comunitat: Comunitat;
  fallbackEtapas: Etapa[];
  courseLevelOptions: { key: string; label: string }[];
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState(subject.name);
  // Los cursos ya guardados con texto libre (de antes de este cambio) que no
  // coincidan exactamente con el catálogo actual no se pueden preseleccionar
  // — el docente tendrá que volver a elegirlos de la lista.
  const [courseLevels, setCourseLevels] = useState<Set<string>>(() => {
    const existing = (subject.courseLevel ?? '').split(',').map((c) => c.trim()).filter(Boolean);
    const valid = new Set(courseLevelOptions.map((o) => o.key));
    return new Set(existing.filter((c) => valid.has(c)));
  });
  const [group, setGroup] = useState(subject.group ?? '');
  const [studentGroupId, setStudentGroupId] = useState(subject.studentGroupId ?? '');
  const [color, setColor] = useState<SubjectColor>(subject.color);
  const [curriculumAreas, setCurriculumAreas] = useState<Set<string>>(new Set(subject.curriculumAreas ?? []));
  const [pgaObjectives, setPgaObjectives] = useState(subject.pgaObjectives ?? '');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  function handleCourseLevelsChange(next: Set<string>) {
    if (next.size <= MAX_COURSE_LEVELS) setCourseLevels(next);
  }

  // Igual que en el formulario de alta: las áreas disponibles se limitan a
  // la etapa real de la asignatura (deducida de sus cursos) para no mezclar
  // áreas con el mismo nombre de otra etapa que imparta el docente.
  const formEtapa = etapaForCourseLevels(courseLevels);
  const curriculumAreaOptions = (
    (formEtapa ? getCurriculum(comunitat, formEtapa) : getCurriculumForEtapas(comunitat, fallbackEtapas))?.areaNames ?? []
  ).map((a) => ({ key: a, label: a }));

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      await updateSubject(subject.id, {
        name: name.trim(),
        courseLevel: Array.from(courseLevels).join(', '),
        group: group.trim(),
        studentGroupId: studentGroupId || undefined,
        color,
        curriculumAreas: curriculumAreas.size > 0 ? Array.from(curriculumAreas) : [],
        pgaObjectives: pgaObjectives.trim(),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={`${t('common.edit')} · ${subjectDisplayName(subject)}`} widthClass="max-w-md">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <Input
          label={t('subjects.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <div>
          <TagMultiSelect
            label={t('subjects.courseLevel')}
            options={courseLevelOptions}
            selected={courseLevels}
            onChange={handleCourseLevelsChange}
            placeholder={t('subjects.courseLevelPlaceholder')}
          />
          <p className="text-[11px] text-ink-soft mt-1">{t('subjects.courseLevelHelp')}</p>
        </div>
        <Input
          label={t('subjects.group')}
          placeholder="A"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        {studentGroups.length > 0 && (
          <Select
            label={t('subjects.selectGroupOptional')}
            value={studentGroupId}
            onChange={(e) => setStudentGroupId(e.target.value)}
          >
            <option value="">{t('subjects.noGroup')}</option>
            {studentGroups.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Select>
        )}
        {curriculumAreaOptions.length > 0 && (
          <div>
            <TagMultiSelect
              label={t('subjects.curriculumAreas')}
              options={curriculumAreaOptions}
              selected={curriculumAreas}
              onChange={setCurriculumAreas}
              placeholder={t('subjects.curriculumAreasPlaceholder')}
            />
            <p className="text-[11px] text-ink-soft mt-1">{t('subjects.curriculumAreasHelp')}</p>
          </div>
        )}
        <div>
          <Textarea
            label={t('subjects.pgaObjectives')}
            value={pgaObjectives}
            onChange={(e) => setPgaObjectives(e.target.value)}
            rows={3}
          />
          <p className="text-[11px] text-ink-soft mt-1">{t('subjects.pgaObjectivesHelp')}</p>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            {t('subjects.color')}
          </label>
          <div className="flex gap-2 flex-wrap">
            {SUBJECT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${subjectColorClasses[c].dot} ${
                  color === c ? 'ring-2 ring-offset-2 ring-ink' : ''
                }`}
                aria-label={c}
              />
            ))}
          </div>
        </div>
        {formError && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{formError}</p>
        )}
        <div className="flex gap-2">
          <Button type="submit" disabled={saving || !name.trim()}>
            {t('common.save')}
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

