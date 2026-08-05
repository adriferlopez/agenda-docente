import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects, createSubject, deleteSubject } from '@/firebase/subjects';
import { subscribeStudentGroups } from '@/firebase/students';
import { subscribeCurriculumItems, replaceCurriculumItems, deleteCurriculumItem } from '@/firebase/curriculum';
import { downloadCurriculumTemplate, parseCurriculumFile } from '@/utils/curriculumExcel';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconDownload, IconUpload, IconCheck } from '@/components/ui/icons';
import type { Subject, SubjectColor, CurriculumItem, StudentGroup } from '@/types';
import { SUBJECT_COLORS } from '@/types';

export default function SubjectsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [group, setGroup] = useState('');
  const [studentGroupId, setStudentGroupId] = useState('');
  const [color, setColor] = useState<SubjectColor>('lav');
  const [saving, setSaving] = useState(false);
  const [curriculumSubject, setCurriculumSubject] = useState<Subject | null>(null);

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsubGroups = subscribeStudentGroups(user.uid, activeYear.id, setStudentGroups);
    return () => {
      unsubSubjects();
      unsubGroups();
    };
  }, [user, activeYear]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!user || !activeYear) return;
    setSaving(true);
    try {
      await createSubject(user.uid, activeYear.id, {
        name,
        courseLevel: courseLevel.trim() || undefined,
        group,
        studentGroupId: studentGroupId || undefined,
        color,
      });
      setName('');
      setCourseLevel('');
      setGroup('');
      setStudentGroupId('');
      setColor('lav');
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
        <h1 className="font-display text-2xl text-lav-600 mb-1">{t('subjects.title')}</h1>
        <p className="text-sm text-ink-soft">{activeYear.name}</p>
      </div>

      {subjects.length === 0 && !showForm && (
        <p className="text-sm text-ink-soft">{t('subjects.noSubjects')}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const colors = subjectColorClasses[subject.color];
          return (
            <Card key={subject.id} className={`flex flex-col gap-3 border ${colors.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                  <p className="font-semibold text-ink">{subject.name}</p>
                </div>
                <button
                  onClick={() => deleteSubject(subject.id)}
                  className="text-ink-soft hover:text-rose-600"
                  aria-label={t('common.delete')}
                >
                  <IconTrash size={16} />
                </button>
              </div>
              {(subject.courseLevel || subject.group) && (
                <p className="text-xs text-ink-soft">
                  {subject.courseLevel}
                  {subject.courseLevel && subject.group ? ' · ' : ''}
                  {subject.group}
                </p>
              )}
              <Button size="sm" variant="secondary" onClick={() => setCurriculumSubject(subject)}>
                {t('subjects.uploadCurriculum')}
              </Button>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  label={t('subjects.courseLevelOptional')}
                  placeholder="3º ESO"
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                />
                <p className="text-[11px] text-ink-soft mt-1">{t('subjects.multiCourseHelp')}</p>
              </div>
              <Input
                label={t('subjects.group')}
                placeholder="A"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
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

      {curriculumSubject && (
        <CurriculumModal subject={curriculumSubject} onClose={() => setCurriculumSubject(null)} />
      )}
    </div>
  );
}

function CurriculumModal({ subject, onClose }: { subject: Subject; onClose: () => void }) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<CurriculumItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    return subscribeCurriculumItems(user.uid, subject.id, setItems);
  }, [user, subject.id]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setSuccess(false);
    try {
      const rows = await parseCurriculumFile(file);
      await replaceCurriculumItems(user.uid, subject.id, rows);
      setSuccess(true);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <Modal open onClose={onClose} title={`${t('subjects.uploadCurriculum')} · ${subject.name}`} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <Button
          variant="secondary"
          onClick={() => downloadCurriculumTemplate(subject.name)}
          icon={<IconDownload size={16} />}
        >
          {t('subjects.downloadTemplate')}
        </Button>

        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFile}
            className="hidden"
            id="curriculum-file"
          />
          <label htmlFor="curriculum-file">
            <span className="btn-pill inline-flex items-center justify-center font-semibold px-5 py-2.5 text-sm gap-2 bg-lav-400 text-white hover:bg-lav-500 cursor-pointer">
              <IconUpload size={16} />
              {uploading ? t('common.loading') : t('subjects.uploadCurriculum')}
            </span>
          </label>
        </div>

        {success && (
          <div className="flex items-center gap-2 bg-mint-50 text-mint-600 rounded-2xl px-3 py-2 text-sm">
            <IconCheck size={16} />
            {t('subjects.curriculumUploaded')}
          </div>
        )}

        {items.length > 0 && (
          <div className="border border-lav-100 rounded-2xl max-h-64 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-lav-50 text-ink-soft">
                <tr>
                  <th className="text-left px-3 py-2">Curso</th>
                  <th className="text-left px-3 py-2">Código</th>
                  <th className="text-left px-3 py-2">Descripción</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-lav-50">
                    <td className="px-3 py-2 whitespace-nowrap">{item.courseLevel}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{item.code}</td>
                    <td className="px-3 py-2">{item.description}</td>
                    <td className="px-3 py-2">
                      <button onClick={() => deleteCurriculumItem(item.id)} className="text-ink-soft hover:text-rose-600">
                        <IconTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
}
