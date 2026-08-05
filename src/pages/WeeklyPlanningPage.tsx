import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeTimetable } from '@/firebase/timetable';
import { subscribeWeeklyPlans, upsertWeeklyPlan, updateWeeklyPlanField, weeklyPlanId } from '@/firebase/weeklyPlans';
import { generateWeeklySuggestions } from '@/services/ai';
import { getWeekStart, shiftWeek, formatWeekLabel, dateForDayInWeek } from '@/utils/dates';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import Modal from '@/components/ui/Modal';
import DriveAttachmentPicker from '@/components/weekly/DriveAttachmentPicker';
import RubricEditor from '@/components/weekly/RubricEditor';
import { IconChevronLeft, IconChevronRight, IconSparkles, IconCheck } from '@/components/ui/icons';
import type { Subject, TimetableSlot, WeeklyPlan, WeekDay } from '@/types';

/** Una franja del horario que tiene asignatura asignada (no es patio/refuerzo/etc.). */
type SubjectSlot = TimetableSlot & { subjectId: string };

const DAYS: { value: WeekDay; key: string }[] = [
  { value: 0, key: 'timetable.monday' },
  { value: 1, key: 'timetable.tuesday' },
  { value: 2, key: 'timetable.wednesday' },
  { value: 3, key: 'timetable.thursday' },
  { value: 4, key: 'timetable.friday' },
];

export default function WeeklyPlanningPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [editingSlot, setEditingSlot] = useState<SubjectSlot | null>(null);

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsubSlots = subscribeTimetable(user.uid, activeYear.id, setSlots);
    return () => {
      unsubSubjects();
      unsubSlots();
    };
  }, [user, activeYear]);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeWeeklyPlans(user.uid, activeYear.id, weekStart, setPlans);
  }, [user, activeYear, weekStart]);

  const subjectById = useMemo(() => {
    const map = new Map<string, Subject>();
    subjects.forEach((s) => map.set(s.id, s));
    return map;
  }, [subjects]);

  const planBySlot = useMemo(() => {
    const map = new Map<string, WeeklyPlan>();
    plans.forEach((p) => map.set(p.timetableSlotId, p));
    return map;
  }, [plans]);

  const sortedSlots = useMemo(
    () =>
      slots
        .filter((s): s is TimetableSlot & { subjectId: string } => !!s.subjectId)
        .sort((a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime)),
    [slots]
  );

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-lav-600 mb-1">{t('weekly.title')}</h1>
          <p className="text-sm text-ink-soft">{t('weekly.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full border border-lav-100 px-2 py-1">
          <button onClick={() => setWeekStart((w) => shiftWeek(w, -1))} className="p-1.5 rounded-full hover:bg-lav-50 text-ink-soft">
            <IconChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium px-1">
            {t('weekly.week')} {formatWeekLabel(weekStart)}
          </span>
          <button onClick={() => setWeekStart((w) => shiftWeek(w, 1))} className="p-1.5 rounded-full hover:bg-lav-50 text-ink-soft">
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>

      {sortedSlots.length === 0 && (
        <Card className="text-sm text-ink-soft">
          {t('timetable.noSlot')} —{' '}
          <a href="/horario" className="text-lav-600 font-semibold hover:underline">
            {t('timetable.title')}
          </a>
        </Card>
      )}

      <div className="flex flex-col gap-5">
        {DAYS.map((day) => {
          const daySlots = sortedSlots.filter((s) => s.day === day.value);
          if (daySlots.length === 0) return null;
          return (
            <div key={day.value}>
              <h2 className="text-sm font-semibold text-ink-soft mb-2">
                {t(day.key)} · {dateForDayInWeek(weekStart, day.value)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {daySlots.map((slot) => {
                  const subject = subjectById.get(slot.subjectId);
                  const plan = planBySlot.get(slot.id);
                  const colors = subject ? subjectColorClasses[subject.color] : null;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setEditingSlot(slot)}
                      className={`text-left rounded-2xl border p-3.5 transition hover:shadow-sm ${
                        colors ? `${colors.bg} ${colors.border}` : 'bg-white border-lav-100'
                      }`}
                    >
                      <p className="text-xs text-ink-soft mb-1">
                        {slot.startTime} · {subject?.name}
                      </p>
                      {plan?.title ? (
                        <>
                          <p className="text-sm font-semibold text-ink mb-1">{plan.title}</p>
                          <StatusBadge status={plan.status} />
                        </>
                      ) : (
                        <p className="text-sm text-ink-soft">{t('weekly.emptySlot')}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {editingSlot && (
        <PlanEditorModal
          slot={editingSlot}
          subject={subjectById.get(editingSlot.subjectId)}
          plan={planBySlot.get(editingSlot.id)}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          weekStart={weekStart}
          language={profile?.language ?? 'es'}
          onClose={() => setEditingSlot(null)}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: WeeklyPlan['status'] }) {
  const { t } = useTranslation();
  const styles: Record<WeeklyPlan['status'], string> = {
    planned: 'bg-sky-100 text-sky-600',
    done: 'bg-butter-100 text-butter-600',
    evaluated: 'bg-mint-100 text-mint-600',
  };
  return (
    <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${styles[status]}`}>
      {t(`weekly.status.${status}`)}
    </span>
  );
}

function PlanEditorModal({
  slot,
  subject,
  plan,
  ownerId,
  schoolYearId,
  weekStart,
  language,
  onClose,
}: {
  slot: SubjectSlot;
  subject?: Subject;
  plan?: WeeklyPlan;
  ownerId: string;
  schoolYearId: string;
  weekStart: string;
  language: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(plan?.title ?? '');
  const [description, setDescription] = useState(plan?.description ?? '');
  const [attachments, setAttachments] = useState(plan?.driveAttachments ?? []);
  const [rubric, setRubric] = useState(plan?.rubric ?? []);
  const [postEval, setPostEval] = useState(plan?.postClassEvaluation ?? '');
  const [aiSuggestions, setAiSuggestions] = useState(plan?.aiSuggestions ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);

  async function handleSave(status?: WeeklyPlan['status']) {
    setSaving(true);
    try {
      await upsertWeeklyPlan(ownerId, schoolYearId, slot.id, slot.subjectId, weekStart, {
        title,
        description,
        driveAttachments: attachments,
        rubric,
        postClassEvaluation: postEval,
        aiSuggestions,
        status: status ?? plan?.status ?? 'planned',
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerateSuggestions() {
    if (!subject) return;
    setGenerating(true);
    try {
      const suggestions = await generateWeeklySuggestions({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityTitle: title,
        description,
        postClassEvaluation: postEval,
        language,
      });
      setAiSuggestions(suggestions);
      await updateWeeklyPlanField(weeklyPlanId(slot.id, weekStart), { aiSuggestions: suggestions, status: 'evaluated' });
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={subject ? `${subject.name} · ${slot.startTime}` : t('weekly.addPlan')} widthClass="max-w-2xl">
      <div className="flex flex-col gap-4">
        <Input
          label={t('weekly.activityTitle')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          lang={language}
          spellCheck
        />
        <Textarea
          label={t('weekly.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          lang={language}
          spellCheck
        />

        <div>
          <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('weekly.attachments')}</label>
          <DriveAttachmentPicker attachments={attachments} onChange={setAttachments} />
        </div>

        <div>
          <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('weekly.rubric')}</label>
          <RubricEditor rubric={rubric} onChange={setRubric} />
        </div>

        <Textarea
          label={t('weekly.postEvaluation')}
          placeholder={t('weekly.postEvaluationPlaceholder')}
          value={postEval}
          onChange={(e) => setPostEval(e.target.value)}
          rows={3}
          lang={language}
          spellCheck
        />

        {aiSuggestions && (
          <div className="bg-lav-50 rounded-2xl p-3.5 flex flex-col gap-2">
            <span className="text-xs font-semibold text-lav-600 flex items-center gap-1.5">
              <IconSparkles size={14} /> {t('weekly.aiSuggestions')}
            </span>
            <p className="text-sm text-ink whitespace-pre-wrap">{aiSuggestions}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={() => handleSave()} disabled={saving} icon={saved ? <IconCheck size={16} /> : undefined}>
            {saved ? t('settings.geminiKeySaved') : t('weekly.save')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSave('done')}
            disabled={saving}
          >
            {t('weekly.status.done')}
          </Button>
          <Button
            variant="secondary"
            onClick={handleGenerateSuggestions}
            disabled={generating || !postEval.trim()}
            icon={<IconSparkles size={16} />}
          >
            {generating ? t('common.loading') : t('weekly.generateSuggestions')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
