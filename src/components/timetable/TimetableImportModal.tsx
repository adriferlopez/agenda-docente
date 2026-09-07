import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { IconUpload, IconCheck, IconAlertTriangle, IconDownload } from '@/components/ui/icons';
import { parseTimetableFile, classifyAiError, type TimetableSlotParsed } from '@/services/ai';
import {
  createTimetableSlot,
  addTimeSlotDef,
  deleteTimetableSlot,
  deleteTimeSlotDef,
} from '@/firebase/timetable';
import { createSubject, deleteSubject } from '@/firebase/subjects';
import { specialTypeLabel } from '@/utils/timetableDisplay';
import type { Subject, TimetableSlot, TimeSlotDef } from '@/types';

const DAY_KEYS = ['timetable.monday', 'timetable.tuesday', 'timetable.wednesday', 'timetable.thursday', 'timetable.friday'];

// Clave única de una asignatura importada: mismo nombre PERO distinto grupo
// (ej. "Lectura" 2n ESO A vs 2n ESO C) debe dar lugar a dos Subjects
// distintas, igual que si el docente las hubiera creado a mano.
function subjectKey(name: string, group: string): string {
  return `${name.toLowerCase().trim()}|${group.toLowerCase().trim()}`;
}

interface Props {
  ownerId: string;
  schoolYearId: string;
  language: string;
  existingSubjects: Subject[];
  existingSlots: TimetableSlot[];
  existingDefs: TimeSlotDef[];
  onClose: () => void;
  onDone: () => void;
}

export default function TimetableImportModal({
  ownerId, schoolYearId, existingSubjects, existingSlots, existingDefs, onClose, onDone,
}: Props) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'applying' | 'done'>('upload');
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');
  const [parsedSlots, setParsedSlots] = useState<TimetableSlotParsed[]>([]);
  const [newSubjectSlots, setNewSubjectSlots] = useState<TimetableSlotParsed[]>([]);
  const [orphanedSubjects, setOrphanedSubjects] = useState<Subject[]>([]);
  const [subjectsToDelete, setSubjectsToDelete] = useState<Set<string>>(new Set());

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setParsing(true);
    try {
      const slots = await parseTimetableFile(file);
      if (!slots || slots.length === 0) {
        setError(t('timetable.importNoClassesDetected'));
        return;
      }
      // Las franjas "especiales" (patio, guardia, reunión...) no cuentan
      // como asignaturas: no deben crear ni emparejar ninguna Subject.
      const subjectSlots = slots.filter((s) => !s.specialType);

      const existingKeys = new Set(existingSubjects.map((s) => subjectKey(s.name, s.group ?? '')));
      const newKeys = [...new Map(
        subjectSlots
          .filter((s) => s.subjectName.trim() && !existingKeys.has(subjectKey(s.subjectName, s.group)))
          .map((s) => [subjectKey(s.subjectName, s.group), s])
      ).values()];
      // Asignaturas que ya no aparecen en el nuevo horario (para poder limpiarlas al aplicar).
      const keysInNewFile = new Set(subjectSlots.map((s) => subjectKey(s.subjectName, s.group)));
      const orphaned = existingSubjects.filter((s) => !keysInNewFile.has(subjectKey(s.name, s.group ?? '')));
      setParsedSlots(slots);
      setNewSubjectSlots(newKeys);
      setOrphanedSubjects(orphaned);
      setSubjectsToDelete(new Set(orphaned.map((s) => s.id)));
      setStep('preview');
    } catch (err) {
      const kind = classifyAiError(err);
      setError(
        kind === 'quota' ? t('common.aiQuotaError')
          : kind === 'overloaded' ? t('common.aiOverloadError')
          : err instanceof Error ? err.message : t('timetable.importErrorProcessing')
      );
    } finally {
      setParsing(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  function toggleSubjectDelete(id: string) {
    setSubjectsToDelete((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleApply() {
    setStep('applying');
    try {
      await Promise.all([
        ...existingSlots.map((s) => deleteTimetableSlot(s.id)),
        ...existingDefs.map((d) => deleteTimeSlotDef(d.id)),
      ]);

      const subjectMap = new Map<string, string>();
      existingSubjects.forEach((s) => subjectMap.set(subjectKey(s.name, s.group ?? ''), s.id));

      for (const slot of newSubjectSlots) {
        const id = await createSubject(ownerId, schoolYearId, {
          name: slot.subjectName, group: slot.group, color: pickColor(subjectMap.size),
        });
        subjectMap.set(subjectKey(slot.subjectName, slot.group), id);
      }

      const defsMap = new Map<string, string>();
      const uniqueDefs = [...new Map(
        parsedSlots.map((s) => [`${s.day}-${s.startTime}-${s.endTime}`, s])
      ).values()].sort((a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime));

      const orderByDay = new Map<number, number>();
      for (const def of uniqueDefs) {
        const order = orderByDay.get(def.day) ?? 0;
        const id = await addTimeSlotDef(ownerId, schoolYearId, {
          day: def.day as 0|1|2|3|4, startTime: def.startTime, endTime: def.endTime, order,
        });
        defsMap.set(`${def.day}-${def.startTime}-${def.endTime}`, id);
        orderByDay.set(def.day, order + 1);
      }

      for (const slot of parsedSlots) {
        if (slot.specialType) {
          // Evento sin asignatura (patio, guardia, reunión...): se crea como
          // franja especial, igual que si el docente la marcara a mano en
          // Horario, para no ensuciar Asignaturas con una Subject falsa.
          await createTimetableSlot(ownerId, schoolYearId, {
            day: slot.day as 0|1|2|3|4,
            startTime: slot.startTime,
            endTime: slot.endTime,
            specialType: slot.specialType,
            ...(slot.specialType === 'otro' && slot.specialLabel ? { specialLabel: slot.specialLabel } : {}),
          });
          continue;
        }
        const subjectId = subjectMap.get(subjectKey(slot.subjectName, slot.group));
        if (!subjectId) continue;
        await createTimetableSlot(ownerId, schoolYearId, {
          day: slot.day as 0|1|2|3|4,
          startTime: slot.startTime,
          endTime: slot.endTime,
          subjectId,
          ...(slot.room ? { room: slot.room } : {}),
        });
      }

      // Limpiar asignaturas antiguas que ya no aparecen en el nuevo horario
      // (solo las que el docente ha dejado marcadas en el paso anterior).
      await Promise.all(
        orphanedSubjects.filter((s) => subjectsToDelete.has(s.id)).map((s) => deleteSubject(s.id, ownerId, schoolYearId))
      );

      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('timetable.importErrorApplying'));
      setStep('preview');
    }
  }

  const doneSummary = newSubjectSlots.length > 0
    ? t('timetable.importDoneClassesWithSubjects', { count: parsedSlots.length, subjects: newSubjectSlots.length })
    : t('timetable.importDoneClasses', { count: parsedSlots.length });
  const doneDeleted = subjectsToDelete.size > 0
    ? ` ${t('timetable.importDoneDeleted', { count: subjectsToDelete.size })}`
    : '';

  return (
    <Modal open onClose={onClose} title={t('timetable.importTitle')} widthClass="max-w-2xl">
      {step === 'upload' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('timetable.importIntro')}
          </p>

          {/* Opción recomendada: plantilla Excel */}
          <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'var(--accent-light)', border: '1px solid var(--border)' }}>
            <p className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent-text)' }}>
              <IconCheck size={14} />
              {t('timetable.importRecommended')}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {t('timetable.importRecommendedHelp')}
            </p>
            <a
              href="/plantilla-horario.xlsx"
              download="plantilla-horario.xlsx"
              className="btn-base btn-pill self-start text-xs font-semibold px-3 py-1.5 flex items-center gap-1.5"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              <IconDownload size={13} />
              {t('timetable.importDownloadTemplate')}
            </a>
          </div>

          {error && <div className="rounded-2xl p-3 text-sm" style={{ background: 'rgba(248,113,113,0.1)', color: 'var(--danger-text)' }}>{error}</div>}

          <input ref={fileRef} type="file" accept=".docx,.xlsx,.xls,.csv" className="hidden" onChange={handleFile} />
          <Button onClick={() => fileRef.current?.click()} disabled={parsing} icon={<IconUpload size={16} />} variant="secondary" className="self-start">
            {parsing ? t('timetable.importReadingFile') : t('timetable.importSelectFile')}
          </Button>
          {parsing && <p className="text-xs animate-pulse" style={{ color: 'var(--text-secondary)' }}>{t('timetable.importProcessing')}</p>}
        </div>
      )}

      {step === 'preview' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('timetable.importDetectedClasses', { count: parsedSlots.length })}
          </p>
          {newSubjectSlots.length > 0 && (
            <div className="rounded-2xl p-3" style={{ background: 'var(--gold-light)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--gold)' }}>
                {t('timetable.importNewSubjects', { count: newSubjectSlots.length })}
              </p>
              <div className="flex flex-wrap gap-2">
                {newSubjectSlots.map((s) => (
                  <span key={subjectKey(s.subjectName, s.group)} className="text-xs rounded-full px-2 py-1" style={{ background: 'var(--gold)', color: 'white' }}>
                    {[s.subjectName, s.group].filter(Boolean).join(' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
          {orphanedSubjects.length > 0 && (
            <div className="rounded-2xl p-3" style={{ background: 'rgba(248,113,113,0.08)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--danger-text)' }}>
                {t('timetable.importOrphanedSubjects', { count: orphanedSubjects.length })}
              </p>
              <div className="flex flex-col gap-1 mt-2">
                {orphanedSubjects.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subjectsToDelete.has(s.id)}
                      onChange={() => toggleSubjectDelete(s.id)}
                    />
                    <span style={{ color: 'var(--text-primary)' }}>{s.name}</span>
                    {s.courseLevel && <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({s.courseLevel})</span>}
                  </label>
                ))}
              </div>
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                {t('timetable.importOrphanedHelp')}
              </p>
            </div>
          )}
          {error && <div className="rounded-2xl p-3 text-sm" style={{ background: 'rgba(248,113,113,0.1)', color: 'var(--danger-text)' }}>{error}</div>}
          <div className="max-h-72 overflow-y-auto flex flex-col gap-1">
            {[0,1,2,3,4].map((day) => {
              const daySlots = parsedSlots.filter((s) => s.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime));
              if (!daySlots.length) return null;
              return (
                <div key={day}>
                  <p className="text-xs font-semibold mt-2 mb-1 text-accent">{t(DAY_KEYS[day])}</p>
                  {daySlots.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-1.5 mb-1" style={{ background: 'var(--accent-light)' }}>
                      <span className="text-xs w-24 shrink-0" style={{ color: 'var(--text-secondary)' }}>{s.startTime} – {s.endTime}</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {s.specialType ? specialTypeLabel(t, s) : s.subjectName}
                      </span>
                      {s.specialType && (
                        <span className="text-[10px] uppercase tracking-wide rounded-full px-1.5 py-0.5" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                          {t('timetable.importNotASubject')}
                        </span>
                      )}
                      {s.group && <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.group}</span>}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl p-3 text-sm flex items-center gap-2" style={{ background: 'rgba(248,113,113,0.08)', color: 'var(--danger-text)' }}>
            <IconAlertTriangle size={16} className="shrink-0" />
            {t('timetable.importWillReplace')}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleApply} icon={<IconCheck size={16} />}>{t('timetable.importApply')}</Button>
            <Button variant="ghost" onClick={() => { setStep('upload'); setError(''); }}>{t('common.back')}</Button>
          </div>
        </div>
      )}

      {step === 'applying' && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('timetable.importApplying')}</p>
        </div>
      )}

      {step === 'done' && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
            <IconCheck size={24} className="text-accent" />
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('timetable.importDone')}</p>
          <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
            {doneSummary}{doneDeleted}
          </p>
          <Button onClick={onDone}>{t('timetable.importViewTimetable')}</Button>
        </div>
      )}
    </Modal>
  );
}

const COLORS = ['lav','mint','peach','rose','sky','butter'] as const;
function pickColor(index: number) { return COLORS[index % COLORS.length]; }
