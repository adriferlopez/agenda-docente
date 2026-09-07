import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { createSchoolYear, setActiveSchoolYear, updateSchoolYearTerms } from '@/firebase/schoolYears';
import { getEffectiveTerms } from '@/utils/terms';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { IconCalendar, IconPlus, IconTrash, IconEdit } from '@/components/ui/icons';
import type { SchoolYear, Term } from '@/types';

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
  const [editingTermsYear, setEditingTermsYear] = useState<SchoolYear | null>(null);

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
        <h1 className="font-display text-2xl text-accent mb-1">{t('schoolYear.select')}</h1>
        {years.length === 0 && <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {years.map((year) => (
          <Card
            key={year.id}
            onClick={() => handleSelect(year.id)}
            className={`flex items-center gap-3 cursor-pointer transition ${
              profile?.activeSchoolYearId === year.id ? 'ring-2 ring-accent' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-accent">
              <IconCalendar size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink">{year.name}</p>
              <p className="text-xs text-ink-soft">
                {year.startDate} — {year.endDate}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingTermsYear(year);
              }}
              className="text-ink-soft hover:text-accent p-1.5"
              aria-label={t('schoolYear.editTerms')}
              title={t('schoolYear.editTerms')}
            >
              <IconEdit size={16} />
            </button>
            {profile?.activeSchoolYearId === year.id && (
              <span className="text-xs font-semibold text-accent bg-accent-light rounded-full px-3 py-1">
                Activo
              </span>
            )}
          </Card>
        ))}
      </div>

      {editingTermsYear && (
        <TermsEditorModal year={editingTermsYear} onClose={() => setEditingTermsYear(null)} />
      )}

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

// ── Editor de trimestres/periodos de evaluación personalizables ───────
function TermsEditorModal({ year, onClose }: { year: SchoolYear; onClose: () => void }) {
  const { t } = useTranslation();
  const [terms, setTerms] = useState<Term[]>(getEffectiveTerms(year));
  const [saving, setSaving] = useState(false);

  function updateTerm(i: number, patch: Partial<Term>) {
    setTerms((prev) => prev.map((term, idx) => (idx === i ? { ...term, ...patch } : term)));
  }

  function addTerm() {
    setTerms((prev) => [...prev, { id: `t${Date.now()}`, name: '', startDate: '', endDate: '' }]);
  }

  function removeTerm(i: number) {
    setTerms((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateSchoolYearTerms(year.id, terms);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={`${t('schoolYear.terms')} · ${year.name}`} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-xs text-ink-soft">{t('schoolYear.termsHelp')}</p>
        <div className="flex flex-col gap-3">
          {terms.map((term, i) => (
            <div key={term.id} className="flex items-end gap-2 flex-wrap">
              <Input
                label={t('schoolYear.termName')}
                value={term.name}
                onChange={(e) => updateTerm(i, { name: e.target.value })}
                className="flex-1 min-w-[120px]"
              />
              <Input
                type="date"
                label={t('schoolYear.startDate')}
                value={term.startDate}
                onChange={(e) => updateTerm(i, { startDate: e.target.value })}
              />
              <Input
                type="date"
                label={t('schoolYear.endDate')}
                value={term.endDate}
                onChange={(e) => updateTerm(i, { endDate: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeTerm(i)}
                className="text-ink-soft hover:text-rose-600 p-2"
                aria-label={t('common.delete')}
              >
                <IconTrash size={16} />
              </button>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" icon={<IconPlus size={16} />} onClick={addTerm} className="self-start">
          {t('schoolYear.addTerm')}
        </Button>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving || terms.length === 0}>
            {t('common.save')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
