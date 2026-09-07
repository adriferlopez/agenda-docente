import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuthStore } from '@/store/authStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import Button from '@/components/ui/Button';
import {
  IconHome2, IconCalendar, IconTable, IconNotebook, IconFileText,
  IconBooks, IconSettings, IconX, IconCheck, IconSparkles,
} from '@/components/ui/icons';
import { IconGrades, IconClipboard, IconChecklist, IconUsers, IconArrowRight } from '@/components/ui/icons-extra';

type IconType = ComponentType<{ size?: number; className?: string }>;

interface NavChip {
  to: string;
  icon: IconType;
  label: string;
}

interface Step {
  id: string;
  icon: IconType;
  essential: boolean;
  title: string;
  body: string;
  navChips: NavChip[];
}

/**
 * Tour de bienvenida en pasos, pensado para usuarios recién registrados
 * (ver profile.onboardingSeen en firebase/auth.ts). También se puede
 * reabrir manualmente desde Ajustes vía useOnboardingStore.openTour().
 *
 * No hace un spotlight real sobre el DOM del menú (frágil entre escritorio
 * y móvil, donde la navegación vive en componentes distintos); en su lugar,
 * cada paso muestra "chips" con el mismo icono+texto que verá en el menú
 * lateral, para que reconozca la sección al momento. Los chips son
 * clicables: llevan directamente a esa sección y cierran el tour.
 */
export default function OnboardingTour() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const open = useOnboardingStore((s) => s.open);
  const openTour = useOnboardingStore((s) => s.openTour);
  const closeTour = useOnboardingStore((s) => s.closeTour);

  const [step, setStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const autoOpenedRef = useRef(false);

  // Se abre solo una vez, automáticamente, si el perfil indica que es un
  // usuario recién registrado que todavía no lo ha visto ni saltado.
  useEffect(() => {
    if (!autoOpenedRef.current && profile?.onboardingSeen === false) {
      autoOpenedRef.current = true;
      openTour();
    }
  }, [profile, openTour]);

  useEffect(() => {
    if (open) {
      setStep(0);
      setDontShowAgain(false);
    }
  }, [open]);

  const steps: Step[] = useMemo(() => [
    {
      id: 'welcome',
      icon: IconHome2,
      essential: false,
      title: t('onboarding.steps.welcome.title'),
      body: t('onboarding.steps.welcome.body'),
      navChips: [],
    },
    {
      id: 'schedule',
      icon: IconCalendar,
      essential: true,
      title: t('onboarding.steps.schedule.title'),
      body: t('onboarding.steps.schedule.body'),
      navChips: [{ to: '/horario', icon: IconTable, label: t('nav.timetable') }],
    },
    {
      id: 'subjects',
      icon: IconBooks,
      essential: true,
      title: t('onboarding.steps.subjects.title'),
      body: t('onboarding.steps.subjects.body'),
      navChips: [
        { to: '/asignaturas', icon: IconBooks, label: t('nav.subjects') },
        { to: '/alumnat', icon: IconUsers, label: t('nav.students') },
      ],
    },
    {
      id: 'planning',
      icon: IconNotebook,
      essential: false,
      title: t('onboarding.steps.planning.title'),
      body: t('onboarding.steps.planning.body'),
      navChips: [
        { to: '/semanal', icon: IconNotebook, label: t('nav.weekly') },
        { to: '/anual', icon: IconFileText, label: t('nav.annual') },
      ],
    },
    {
      id: 'grades',
      icon: IconGrades,
      essential: true,
      title: t('onboarding.steps.grades.title'),
      body: t('onboarding.steps.grades.body'),
      navChips: [
        { to: '/notas', icon: IconGrades, label: t('nav.grades') },
        { to: '/comentarios', icon: IconClipboard, label: t('nav.comments') },
      ],
    },
    {
      id: 'organize',
      icon: IconChecklist,
      essential: false,
      title: t('onboarding.steps.organize.title'),
      body: t('onboarding.steps.organize.body'),
      navChips: [
        { to: '/tareas', icon: IconChecklist, label: t('nav.tasks') },
        { to: '/reuniones', icon: IconCalendar, label: t('nav.meetings') },
      ],
    },
    {
      id: 'profi',
      icon: IconSparkles,
      essential: false,
      title: t('onboarding.steps.profi.title'),
      body: t('onboarding.steps.profi.body'),
      navChips: [],
    },
  ], [t]);

  if (!open) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  async function persistSeen() {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), { onboardingSeen: true }).catch(() => null);
    if (profile) setProfile({ ...profile, onboardingSeen: true });
  }

  function handleDismiss() {
    closeTour();
    if (dontShowAgain) void persistSeen();
  }

  function handleChipClick(to: string) {
    closeTour();
    if (dontShowAgain) void persistSeen();
    navigate(to);
  }

  function handleGoSettings() {
    closeTour();
    if (dontShowAgain) void persistSeen();
    navigate('/ajustes');
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25)',
        }}
      >
        {/* Progreso + cerrar */}
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === step ? '22px' : '6px',
                  background: i <= step ? 'var(--accent)' : 'var(--border)',
                }}
              />
            ))}
          </div>
          <button
            onClick={handleDismiss}
            aria-label={t('common.close')}
            className="btn-base rounded-full p-1.5"
            style={{ color: 'var(--text-secondary)', background: 'var(--border)' }}
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Contenido del paso */}
        <div className="px-6 pt-5 pb-1 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 rounded-2xl p-3"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              <current.icon size={26} />
            </div>
            <div className="min-w-0">
              {current.essential && (
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1"
                  style={{ background: '#D1FAE5', color: '#047857' }}
                >
                  {t('onboarding.essentialBadge')}
                </span>
              )}
              <h2 className="font-display text-xl" style={{ color: 'var(--text-primary)' }}>
                {current.title}
              </h2>
            </div>
          </div>

          <p className="text-sm whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
            {current.body}
          </p>

          {current.navChips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {current.navChips.map((chip) => (
                <button
                  key={chip.to}
                  onClick={() => handleChipClick(chip.to)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent-text)' }}
                >
                  <chip.icon size={14} />
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {current.id === 'profi' && (
            <Button
              variant="secondary"
              size="sm"
              icon={<IconSettings size={16} />}
              onClick={handleGoSettings}
              className="self-start"
            >
              {t('onboarding.goToSettings')}
            </Button>
          )}
        </div>

        {/* Pie: no volver a mostrar + navegación */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 mt-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <label
            className="flex items-center gap-2 text-xs cursor-pointer select-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded"
            />
            {t('onboarding.dontShowAgain')}
          </label>
          <div className="flex items-center gap-3">
            {!isLast && (
              <button
                onClick={handleDismiss}
                className="text-xs font-semibold px-2 py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('onboarding.skip')}
              </button>
            )}
            <Button
              size="sm"
              icon={isLast ? <IconCheck size={16} /> : <IconArrowRight size={16} />}
              onClick={isLast ? handleDismiss : () => setStep((s) => s + 1)}
            >
              {isLast ? t('onboarding.finish') : t('onboarding.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
