import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { createSchoolYear, setActiveSchoolYear } from '@/firebase/schoolYears';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconCalendar, IconPlus } from '@/components/ui/icons';

export default function SchoolYearPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { years, loading } = useSchoolYears();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const id = await createSchoolYear(user.uid, { name, startDate, endDate });
      await setActiveSchoolYear(user.uid, id);
      setShowForm(false);
      setName('');
      setStartDate('');
      setEndDate('');
    } finally {
      setSaving(false);
    }
  }

  async function handleSelect(id: string) {
    if (!user) return;
    await setActiveSchoolYear(user.uid, id);
  }

  if (loading) {
    return <p className="text-ink-soft text-sm">{t('common.loading')}</p>;
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-lav-600 mb-1">{t('schoolYear.select')}</h1>
        {years.length === 0 && <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {years.map((year) => (
          <Card
            key={year.id}
            onClick={() => handleSelect(year.id)}
            className={`flex items-center gap-3 cursor-pointer transition ${
              profile?.activeSchoolYearId === year.id ? 'ring-2 ring-lav-300' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-lav-100 flex items-center justify-center text-lav-600">
              <IconCalendar size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink">{year.name}</p>
              <p className="text-xs text-ink-soft">
                {year.startDate} — {year.endDate}
              </p>
            </div>
            {profile?.activeSchoolYearId === year.id && (
              <span className="text-xs font-semibold text-lav-600 bg-lav-50 rounded-full px-3 py-1">
                Activo
              </span>
            )}
          </Card>
        ))}
      </div>

      {showForm ? (
        <Card>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <Input
              label={t('schoolYear.name')}
              placeholder={t('schoolYear.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label={t('schoolYear.startDate')}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <Input
                type="date"
                label={t('schoolYear.endDate')}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {t('common.save')}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)} icon={<IconPlus size={18} />}>
          {years.length === 0 ? t('schoolYear.createFirst') : t('schoolYear.create')}
        </Button>
      )}
    </div>
  );
}
