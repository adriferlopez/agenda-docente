import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pdf } from '@react-pdf/renderer';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeCurriculumItems } from '@/firebase/curriculum';
import { getAllWeeklyPlansForYear, updatePlanCurriculumAndObjectives } from '@/firebase/annualPlan';
import { generateActivityObjectives, matchCurriculumItems } from '@/services/ai';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import AnnualPlanPdf from '@/components/annual/AnnualPlanPdf';
import { IconSparkles, IconDownload, IconImage } from '@/components/ui/icons';
import type { Subject, WeeklyPlan, CurriculumItem } from '@/types';

export default function AnnualPlanningPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[] | null>(null);
  const [curriculumBySubject, setCurriculumBySubject] = useState<Map<string, CurriculumItem[]>>(new Map());
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeSubjects(user.uid, activeYear.id, setSubjects);
  }, [user, activeYear]);

  useEffect(() => {
    if (!user || !activeYear) return;
    let cancelled = false;
    getAllWeeklyPlansForYear(user.uid, activeYear.id).then((data) => {
      if (cancelled) return;
      setPlans(data);
    });
    return () => {
      cancelled = true;
    };
  }, [user, activeYear]);

  useEffect(() => {
    if (!user || subjects.length === 0) return;
    const unsubs = subjects.map((subject) =>
      subscribeCurriculumItems(user.uid, subject.id, (items) => {
        setCurriculumBySubject((prev) => {
          const next = new Map(prev);
          next.set(subject.id, items);
          return next;
        });
      })
    );
    return () => unsubs.forEach((u) => u());
  }, [user, subjects]);

  const subjectById = useMemo(() => {
    const map = new Map<string, Subject>();
    subjects.forEach((s) => map.set(s.id, s));
    return map;
  }, [subjects]);

  const curriculumById = useMemo(() => {
    const map = new Map<string, CurriculumItem>();
    curriculumBySubject.forEach((items) => items.forEach((i) => map.set(i.id, i)));
    return map;
  }, [curriculumBySubject]);

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

  async function handleExportPdf() {
    if (!activeYear || !plans) return;
    setExporting(true);
    try {
      const blob = await pdf(
        <AnnualPlanPdf
          schoolYearName={activeYear.name}
          entries={plans}
          subjectById={subjectById}
          curriculumById={curriculumById}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `programacion_anual_${activeYear.name}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
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
          <h1 className="font-display text-2xl text-lav-600 mb-1">{t('annual.title')}</h1>
          <p className="text-sm text-ink-soft">{t('annual.subtitle')}</p>
        </div>
        <Button onClick={handleExportPdf} disabled={exporting || !plans?.length} icon={<IconDownload size={16} />}>
          {exporting ? t('common.loading') : t('annual.downloadPdf')}
        </Button>
      </div>

      {plans === null ? (
        <p className="text-sm text-ink-soft">{t('common.loading')}</p>
      ) : plans.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('annual.noEntries')}</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => {
            const subject = subjectById.get(plan.subjectId);
            const colors = subject ? subjectColorClasses[subject.color] : null;
            const curriculumItems = (plan.curriculumItemIds ?? [])
              .map((id) => curriculumById.get(id))
              .filter((i): i is CurriculumItem => Boolean(i));

            return (
              <Card key={plan.id} className={`border ${colors?.border ?? ''}`}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${colors?.bg ?? 'bg-lav-50'} ${colors?.text ?? 'text-lav-600'}`}>
                        {subject?.name}
                      </span>
                      <span className="text-xs text-ink-soft">
                        {t('annual.week')} {plan.weekStartDate}
                      </span>
                    </div>
                    <p className="font-semibold text-ink mb-2">{plan.title}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    </div>
                  </div>

                  <div className="w-full md:w-32 shrink-0">
                    <p className="text-xs font-semibold text-ink-soft mb-1">{t('annual.image')}</p>
                    {plan.referenceImageUrl ? (
                      <img src={plan.referenceImageUrl} alt={plan.title} className="w-full h-24 object-cover rounded-xl" />
                    ) : (
                      <div className="w-full h-24 rounded-xl bg-lav-50 flex items-center justify-center text-ink-soft">
                        <IconImage size={24} />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
