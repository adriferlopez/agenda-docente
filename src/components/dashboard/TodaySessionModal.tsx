import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getRubricsOnce } from '@/firebase/grades';
import { subscribeLearningSituations } from '@/firebase/learningSituations';
import { dateForDayInWeek } from '@/utils/dates';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import Button from '@/components/ui/Button';
import { IconX, IconEdit, IconSparkles } from '@/components/ui/icons';
import { IconLink } from '@/components/ui/icons-extra';
import type { Subject, TimetableSlot, WeeklyPlan, Rubric, LearningSituation } from '@/types';

export interface TodaySessionData {
  slot: TimetableSlot;
  subject?: Subject;
  plan?: WeeklyPlan;
}

const STATUS_STYLES: Record<WeeklyPlan['status'], string> = {
  planned:   'bg-sky-100 text-sky-600',
  done:      'bg-butter-100 text-butter-600',
  evaluated: 'bg-mint-100 text-mint-600',
};

/**
 * Modal de solo lectura para el widget "Horario de hoy" del Dashboard,
 * pensado para echar un vistazo rápido a la sesión sin salir de Inicio. Es
 * una versión ligera de PlanViewModal (WeeklyPlanningPage.tsx): no incluye
 * mover de día, desplazar cadena ni eliminar (esas acciones se quedan en
 * Programación semanal, a la que este modal enlaza con el botón "Editar").
 *
 * Se mantiene SIEMPRE montado (aunque `open` sea false) mientras `data` no
 * sea null, igual que el panel "todo el menú" del móvil
 * (AppLayout.tsx), para poder animar tanto la entrada como la salida con
 * una transición de opacity+scale en vez de desaparecer de golpe. El
 * padre (TodayWidget) es quien retrasa el vaciado de `data` hasta que la
 * transición de salida termina.
 */
export default function TodaySessionModal({
  data, open, weekStart, ownerId, schoolYearId, onClose,
}: {
  data: TodaySessionData | null;
  open: boolean;
  weekStart: string;
  ownerId: string;
  schoolYearId: string;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [situations, setSituations] = useState<LearningSituation[]>([]);

  const subjectId = data?.slot.subjectId;

  useEffect(() => {
    if (!open || !subjectId) return;
    return subscribeLearningSituations(ownerId, schoolYearId, subjectId, setSituations);
  }, [open, subjectId, ownerId, schoolYearId]);

  useEffect(() => {
    if (!open || !data?.plan?.rubricId) return;
    let cancelled = false;
    getRubricsOnce(ownerId, schoolYearId).then((r) => { if (!cancelled) setRubrics(r); });
    return () => { cancelled = true; };
  }, [open, data?.plan?.rubricId, ownerId, schoolYearId]);

  if (!data) return null;

  const { slot, subject, plan } = data;
  const rubric = plan?.rubricId ? rubrics.find((r) => r.id === plan.rubricId) : undefined;
  const saName = (plan?.saId && situations.find((s) => s.id === plan.saId)?.name) || plan?.saLabel;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`w-full min-w-0 max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-out ${
          open ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 pt-6 pb-5 sticky top-0 z-10"
          style={{ background: 'var(--bg-card)', borderRadius: '16px 16px 0 0' }}
        >
          <h2 className="font-display text-2xl" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
            {subject ? `${subjectDisplayName(subject)} · ${slot.startTime}` : t('weekly.addPlan')}
          </h2>
          <button
            onClick={onClose}
            aria-label={t('common.close')}
            className="btn-base rounded-full p-1.5"
            style={{ color: 'var(--text-secondary)', background: 'var(--border)' }}
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {dateForDayInWeek(weekStart, slot.day, i18n.language)} · {slot.startTime}–{slot.endTime}
            </span>
            {plan?.status && (
              <span className={`inline-block text-[9px] font-semibold rounded-full px-1.5 py-0.5 ${STATUS_STYLES[plan.status]}`}>
                {t(`weekly.status.${plan.status}`)}
              </span>
            )}
          </div>

          {!plan?.title ? (
            <p className="text-sm text-ink-soft italic">
              {plan?.isContinuation ? t('weekly.continuationOfPrevious') : t('weekly.noPlanForSession')}
            </p>
          ) : (
            <>
              <div>
                {saName && (
                  <span className="inline-block text-[10px] font-semibold rounded-full px-2 py-0.5 mb-1.5 bg-accent-light text-accent">
                    {saName}
                  </span>
                )}
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {t('weekly.activityTitle')}
                </p>
                <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {plan.title}
                </p>
              </div>

              {plan.description && (
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.description')}
                  </p>
                  <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                    {plan.description}
                  </p>
                </div>
              )}

              {plan.driveAttachments?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.attachments')}
                  </p>
                  <div className="flex flex-col gap-1">
                    {plan.driveAttachments.map((a) => (
                      <a key={a.id} href={a.url} target="_blank" rel="noreferrer"
                        className="text-sm text-accent hover:underline flex items-center gap-1.5">
                        <IconLink size={13} className="shrink-0" />
                        {a.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {rubric && (
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.rubric')}
                  </p>
                  <div className="rounded-xl px-3 py-2" style={{ background: 'var(--accent-light)' }}>
                    <p className="text-sm font-medium text-accent">{rubric.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {t('weekly.criteriaCount', { count: rubric.criteria.length })} · {rubric.community ?? t('weekly.ownRubric')}
                    </p>
                  </div>
                </div>
              )}

              {plan.postClassEvaluation && (
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.postEvaluation')}
                  </p>
                  <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                    {plan.postClassEvaluation}
                  </p>
                </div>
              )}

              {plan.aiSuggestions && (
                <div className="rounded-xl p-3" style={{ background: 'var(--accent-light)' }}>
                  <p className="text-xs font-semibold text-accent mb-1 flex items-center gap-1">
                    <IconSparkles size={12} />
                    {t('weekly.aiSuggestions')}
                  </p>
                  <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                    {plan.aiSuggestions}
                  </p>
                </div>
              )}
            </>
          )}

          <div className="flex gap-2 pt-2 flex-wrap">
            <Button onClick={() => navigate('/semanal')} icon={<IconEdit size={16} />}>
              {plan?.title ? t('common.edit') : t('weekly.planSession')}
            </Button>
            <Button variant="ghost" onClick={onClose}>{t('common.close')}</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
