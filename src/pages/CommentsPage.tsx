import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeStudents } from '@/firebase/students';
import {
  subscribeCommentTemplates,
  createCommentTemplate,
  deleteCommentTemplate,
} from '@/firebase/commentTemplates';
import { parseCommentTemplate, renderCommentTemplate } from '@/utils/commentTemplate';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconCheck } from '@/components/ui/icons';
import { IconCopy } from '@/components/ui/icons-extra';
import type { Subject, Student, CommentTemplate } from '@/types';

export default function CommentsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [templates, setTemplates] = useState<CommentTemplate[]>([]);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [usingTemplate, setUsingTemplate] = useState<CommentTemplate | null>(null);

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsubStudents = subscribeStudents(user.uid, activeYear.id, setStudents);
    return () => {
      unsubSubjects();
      unsubStudents();
    };
  }, [user, activeYear]);

  // Si no hay asignatura seleccionada todavía, usa la primera disponible
  // (derivado durante el render, no en un efecto, para evitar un render extra).
  const effectiveSubjectId = selectedSubjectId || subjects[0]?.id || '';

  useEffect(() => {
    if (!user || !effectiveSubjectId) return;
    return subscribeCommentTemplates(user.uid, effectiveSubjectId, setTemplates);
  }, [user, effectiveSubjectId]);

  // Si no hay asignatura efectiva, no mostramos plantillas de una asignatura
  // anterior (evita parpadeo al cambiar de asignatura sin tocar el estado en un efecto).
  const visibleTemplates = effectiveSubjectId ? templates : [];

  const selectedSubject = subjects.find((s) => s.id === effectiveSubjectId);
  const subjectStudents = useMemo(() => {
    if (!selectedSubject?.studentGroupId) return [];
    return students.filter((s) => s.groupId === selectedSubject.studentGroupId);
  }, [students, selectedSubject]);

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-lav-600 mb-1">{t('comments.title')}</h1>
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

          <div className="flex justify-end">
            <Button icon={<IconPlus size={16} />} onClick={() => setShowNewTemplate(true)}>
              {t('comments.newTemplate')}
            </Button>
          </div>

          {visibleTemplates.length === 0 ? (
            <Card className="text-sm text-ink-soft">{t('comments.noTemplates')}</Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleTemplates.map((tpl) => (
                <Card key={tpl.id} className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-ink">{tpl.title}</p>
                    <button
                      onClick={() => deleteCommentTemplate(tpl.id)}
                      className="text-ink-soft hover:text-rose-600 shrink-0"
                      aria-label={t('comments.deleteTemplate')}
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-ink-soft line-clamp-3 flex-1">{tpl.text}</p>
                  <Button size="sm" variant="secondary" onClick={() => setUsingTemplate(tpl)}>
                    {t('comments.useTemplate')}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {showNewTemplate && effectiveSubjectId && (
        <NewTemplateModal
          ownerId={user!.uid}
          subjectId={effectiveSubjectId}
          onClose={() => setShowNewTemplate(false)}
        />
      )}

      {usingTemplate && (
        <UseTemplateModal template={usingTemplate} students={subjectStudents} onClose={() => setUsingTemplate(null)} />
      )}
    </div>
  );
}

function NewTemplateModal({
  ownerId,
  subjectId,
  onClose,
}: {
  ownerId: string;
  subjectId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    setSaving(true);
    try {
      await createCommentTemplate(ownerId, subjectId, { title: title.trim(), text: text.trim() });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('comments.newTemplate')} widthClass="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label={t('comments.templateTitle')}
          placeholder={t('comments.templateTitlePlaceholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
        <div>
          <Textarea
            label={t('comments.templateText')}
            placeholder={t('comments.templateTextPlaceholder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            required
          />
          <p className="text-[11px] text-ink-soft mt-1">{t('comments.templateHelp')}</p>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>
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

function UseTemplateModal({
  template,
  students,
  onClose,
}: {
  template: CommentTemplate;
  students: Student[];
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const tokens = useMemo(() => parseCommentTemplate(template.text), [template.text]);
  const [studentId, setStudentId] = useState(students[0]?.id ?? '');
  const [values, setValues] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);

  const student = students.find((s) => s.id === studentId);
  const studentName = student ? `${student.firstName} ${student.lastName}`.trim() : '';

  const rendered = renderCommentTemplate(tokens, studentName || '___', values);

  async function handleCopy() {
    await navigator.clipboard.writeText(rendered);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Modal open onClose={onClose} title={template.title} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        {students.length > 0 ? (
          <Select
            label={t('comments.selectStudent')}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.lastName ? `${s.lastName}, ${s.firstName}` : s.firstName}
              </option>
            ))}
          </Select>
        ) : (
          <p className="text-xs text-ink-soft">{t('students.noStudents')}</p>
        )}

        {tokens.map((token, i) =>
          token.type === 'choice' ? (
            <Select
              key={i}
              label={token.label}
              value={values[i] ?? token.options[0]}
              onChange={(e) => setValues((v) => ({ ...v, [i]: e.target.value }))}
            >
              {token.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          ) : token.type === 'freeText' ? (
            <Input
              key={i}
              label={token.label}
              value={values[i] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [i]: e.target.value }))}
            />
          ) : null
        )}

        <div className="bg-lav-50 rounded-2xl p-3.5">
          <p className="text-xs font-semibold text-lav-600 mb-1">{t('comments.preview')}</p>
          <p className="text-sm text-ink whitespace-pre-wrap">{rendered}</p>
        </div>

        <Button onClick={handleCopy} icon={copied ? <IconCheck size={16} /> : <IconCopy size={16} />} className="self-start">
          {copied ? t('comments.copied') : t('comments.copyComment')}
        </Button>
      </div>
    </Modal>
  );
}
