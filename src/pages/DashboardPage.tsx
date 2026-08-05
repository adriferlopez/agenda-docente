import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeTimetable } from '@/firebase/timetable';
import { subscribeWeeklyPlans } from '@/firebase/weeklyPlans';
import { getWeekStart, formatWeekLabel } from '@/utils/dates';
import Card from '@/components/ui/Card';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import { IconTable, IconNotebook, IconFileText, IconBooks, IconCalendar } from '@/components/ui/icons';
import { IconUsers, IconClipboard } from '@/components/ui/icons-extra';
import { specialTypeLabel } from '@/utils/timetableDisplay';
import type { Subject, TimetableSlot, WeeklyPlan, WeekDay } from '@/types';

const DAY_KEYS = [
  'timetable.monday',
  'timetable.tuesday',
  'timetable.wednesday',
  'timetable.thursday',
  'timetable.friday',
  'timetable.saturday',
  'timetable.sunday',
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear, loading } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);

  const weekStart = useMemo(() => getWeekStart(new Date()), []);
  const today = new Date().getDay(); // 0 = domingo
  const todayIndex = today === 0 ? 6 : today - 1; // 0 = lunes

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsubSlots = subscribeTimetable(user.uid, activeYear.id, setSlots);
    const unsubPlans = subscribeWeeklyPlans(user.uid, activeYear.id, weekStart, setPlans);
    return () => {
      unsubSubjects();
      unsubSlots();
      unsubPlans();
    };
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

  const todaySlots = useMemo(
    () => slots.filter((s) => s.day === (todayIndex as WeekDay)).sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [slots, todayIndex]
  );

  const pendingEvaluations = useMemo(
    () => plans.filter((p) => p.status === 'done' && !p.postClassEvaluation?.trim()),
    [plans]
  );

  if (loading) {
    return <p className="text-sm text-ink-soft">{t('common.loading')}</p>;
  }

  if (!activeYear) {
    return (
      <Card className="max-w-md">
        <p className="text-sm text-ink-soft mb-3">{t('schoolYear.noYears')}</p>
        <Link to="/curso" className="text-lav-600 font-semibold text-sm hover:underline">
          {t('schoolYear.createFirst')}
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-lav-600 mb-1">
          {t('app.name')}
          {profile?.displayName ? `, ${profile.displayName.split(' ')[0]}` : ''}
        </h1>
        <p className="text-sm text-ink-soft">
          {activeYear.name} · {formatWeekLabel(weekStart)}
        </p>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickLink to="/horario" icon={<IconTable size={20} />} label={t('nav.timetable')} color="lav" />
        <QuickLink to="/semanal" icon={<IconNotebook size={20} />} label={t('nav.weekly')} color="mint" />
        <QuickLink to="/anual" icon={<IconFileText size={20} />} label={t('nav.annual')} color="peach" />
        <QuickLink to="/asignaturas" icon={<IconBooks size={20} />} label={t('nav.subjects')} color="rose" />
      </div>
      <div className="grid grid-cols-3 gap-3 md:hidden">
        <QuickLink to="/alumnos" icon={<IconUsers size={20} />} label={t('nav.students')} color="sky" />
        <QuickLink to="/comentarios" icon={<IconClipboard size={20} />} label={t('nav.comments')} color="butter" />
        <QuickLink to="/reuniones" icon={<IconCalendar size={20} />} label={t('nav.meetings')} color="lav" />
      </div>

      {/* Horario de hoy */}
      <Card>
        <h2 className="font-display text-lg text-ink mb-3">
          {t(DAY_KEYS[todayIndex] ?? 'timetable.monday')}
        </h2>
        {todaySlots.length === 0 ? (
          <p className="text-sm text-ink-soft">{t('timetable.noSlot')}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {todaySlots.map((slot) => {
              const subject = slot.subjectId ? subjectById.get(slot.subjectId) : undefined;
              const plan = planBySlot.get(slot.id);
              const colors = subject ? subjectColorClasses[subject.color] : null;
              const isSpecial = !slot.subjectId;
              return (
                <div
                  key={slot.id}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${
                    colors?.bg ?? (isSpecial ? 'bg-butter-50' : 'bg-lav-50')
                  }`}
                >
                  <span
                    className={`text-xs font-semibold w-12 shrink-0 ${
                      colors?.text ?? (isSpecial ? 'text-butter-600' : 'text-lav-600')
                    }`}
                  >
                    {slot.startTime}
                  </span>
                  <div className={colors?.text ?? (isSpecial ? 'text-butter-600' : 'text-ink')}>
                    {subject ? (
                      <p className="text-sm font-semibold">
                        {subject.name}
                        {subject.group ? ` · ${subject.group}` : ''}
                      </p>
                    ) : (
                      <p className="text-sm font-semibold">{specialTypeLabel(t, slot)}</p>
                    )}
                    {plan?.title && <p className="text-xs opacity-80">{plan.title}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Evaluaciones pendientes */}
      {pendingEvaluations.length > 0 && (
        <Card className="border border-butter-200 bg-butter-50/40">
          <h2 className="font-display text-lg text-ink mb-2">{t('weekly.postEvaluation')}</h2>
          <div className="flex flex-col gap-2">
            {pendingEvaluations.map((plan) => {
              const subject = subjectById.get(plan.subjectId);
              return (
                <Link
                  key={plan.id}
                  to="/semanal"
                  className="text-sm text-ink hover:text-lav-600 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-butter-400" />
                  {subject?.name} — {plan.title}
                </Link>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

function QuickLink({ to, icon, label, color }: { to: string; icon: ReactNode; label: string; color: keyof typeof subjectColorClasses }) {
  const colors = subjectColorClasses[color];
  return (
    <Link to={to} className={`card-pastel flex flex-col items-center gap-2 p-4 text-center hover:shadow-md transition ${colors.border} border`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.bg} ${colors.text}`}>{icon}</div>
      <span className="text-xs font-semibold text-ink">{label}</span>
    </Link>
  );
}
