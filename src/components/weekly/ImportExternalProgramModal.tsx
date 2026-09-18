import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { IconUpload, IconTrash, IconSparkles } from '@/components/ui/icons';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import { extractExternalProgramming, classifyAiError, type ExtractedExternalSession } from '@/services/ai';
import { upsertWeeklyPlan } from '@/firebase/weeklyPlans';
import { getWeekStart, shiftWeek, dateForDayInWeek, isoDateForDayInWeek } from '@/utils/dates';
import type { Subject, TimetableSlot, WeekDay } from '@/types';

const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10 MB (margen bajo el límite del servidor, ~15 MB)

const DAYS: { value: WeekDay; key: string }[] = [
  { value: 0, key: 'timetable.monday' },
  { value: 1, key: 'timetable.tuesday' },
  { value: 2, key: 'timetable.wednesday' },
  { value: 3, key: 'timetable.thursday' },
  { value: 4, key: 'timetable.friday' },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function fileToBase64(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  return dataUrl.split(',')[1] ?? '';
}

type Occurrence = { timetableSlotId: string; weekStartDate: string; day: WeekDay; startTime: string; date: string };

function occKey(occ: Occurrence): string {
  return `${occ.timetableSlotId}|${occ.weekStartDate}`;
}

/**
 * Todas las ocurrencias futuras de la asignatura entre fromWeekStart y
 * schoolYearEndDate, con su fecha ISO real ya calculada. Réplica local de
 * buildSubjectOccurrences (WeeklyPlanningPage.tsx) — no se exporta desde
 * allí porque es un detalle interno de esa página, así que se duplica aquí
 * con el mismo guard de seguridad.
 */
function buildOccurrences(subjectId: string, allSlots: TimetableSlot[], fromWeekStart: string, schoolYearEndDate: string): Occurrence[] {
  const subjectSlots = allSlots
    .filter((s) => s.subjectId === subjectId)
    .sort((a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime));
  if (subjectSlots.length === 0) return [];
  const occurrences: Occurrence[] = [];
  let week = fromWeekStart;
  let guard = 0;
  while (week <= schoolYearEndDate && guard < 200) {
    subjectSlots.forEach((s) => {
      occurrences.push({
        timetableSlotId: s.id,
        weekStartDate: week,
        day: s.day,
        startTime: s.startTime,
        date: isoDateForDayInWeek(week, s.day),
      });
    });
    week = shiftWeek(week, 1);
    guard++;
  }
  return occurrences;
}

let uid = 0;
function nextLocalId(): string {
  uid += 1;
  return `ext-${uid}`;
}

type EditableSession = ExtractedExternalSession & { id: string };

interface ImportExternalProgramModalProps {
  subjects: Subject[];
  allSlots: TimetableSlot[];
  ownerId: string;
  schoolYearId: string;
  schoolYearStartDate: string;
  schoolYearEndDate: string;
  language: string;
  onClose: () => void;
}

export default function ImportExternalProgramModal({
  subjects,
  allSlots,
  ownerId,
  schoolYearId,
  schoolYearStartDate,
  schoolYearEndDate,
  language,
  onClose,
}: ImportExternalProgramModalProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<'upload' | 'review'>('upload');
  const [subjectId, setSubjectId] = useState('');
  const [file, setFile] = useState<{ name: string; base64: string } | null>(null);
  const [fileError, setFileError] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');
  const [sessions, setSessions] = useState<EditableSession[]>([]);
  const [dateMode, setDateMode] = useState<'keep' | 'start'>('keep');
  const [startDate, setStartDate] = useState(todayIso());
  const [manualAssignment, setManualAssignment] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState('');

  const subject = subjects.find((s) => s.id === subjectId);
  const hasAnyDate = sessions.some((s) => s.date);

  const yearStartWeek = useMemo(() => getWeekStart(new Date(`${schoolYearStartDate}T00:00:00`)), [schoolYearStartDate]);

  const occurrences = useMemo(
    () => (subjectId ? buildOccurrences(subjectId, allSlots, yearStartWeek, schoolYearEndDate) : []),
    [subjectId, allSlots, yearStartWeek, schoolYearEndDate]
  );

  const occurrenceByDate = useMemo(() => {
    const m = new Map<string, Occurrence>();
    occurrences.forEach((o) => { if (!m.has(o.date)) m.set(o.date, o); });
    return m;
  }, [occurrences]);

  // sessionId -> occurrenceKey elegido (automático o manual), para cada
  // sesión editable. En modo 'start' es puramente secuencial; en modo
  // 'keep' se intenta casar por fecha y, si no hay coincidencia, se usa la
  // elección manual del docente (nunca se ajusta sola al día más cercano).
  const assignment = useMemo(() => {
    const map: Record<string, string> = {};
    if (dateMode === 'start') {
      const pool = occurrences.filter((o) => o.date >= startDate);
      sessions.forEach((s, i) => {
        const occ = pool[i];
        if (occ) map[s.id] = occKey(occ);
      });
      return map;
    }
    const used = new Set<string>();
    sessions.forEach((s) => {
      if (s.date) {
        const occ = occurrenceByDate.get(s.date);
        if (occ && !used.has(occKey(occ))) {
          map[s.id] = occKey(occ);
          used.add(occKey(occ));
          return;
        }
      }
      const manual = manualAssignment[s.id];
      if (manual && !used.has(manual)) {
        map[s.id] = manual;
        used.add(manual);
      }
    });
    return map;
  }, [dateMode, sessions, occurrences, occurrenceByDate, startDate, manualAssignment]);

  const unresolvedSessions = sessions.filter((s) => !assignment[s.id]);
  const noSlotsForSubject = !!subjectId && occurrences.length === 0;

  function updateSession(id: string, patch: Partial<EditableSession>) {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function removeSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setManualAssignment((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setFileError('');
    if (f.type !== 'application/pdf') {
      setFileError(t('weekly.importExternal.pdfInvalidType'));
      return;
    }
    if (f.size > MAX_PDF_BYTES) {
      setFileError(t('weekly.importExternal.pdfTooBig'));
      return;
    }
    const base64 = await fileToBase64(f);
    setFile({ name: f.name, base64 });
  }

  async function handleExtract() {
    if (!subject || !file) return;
    setExtracting(true);
    setExtractError('');
    try {
      const res = await extractExternalProgramming({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        pdfBase64: file.base64,
        language,
      });
      const withIds: EditableSession[] = res.sessions.map((s) => ({ ...s, id: nextLocalId() }));
      setSessions(withIds);
      setDateMode(withIds.some((s) => s.date) ? 'keep' : 'start');
      setManualAssignment({});
      setStep('review');
    } catch (err) {
      const kind = classifyAiError(err);
      if (kind === 'quota' || kind === 'overloaded') {
        setExtractError(err instanceof Error ? err.message : String(err));
      } else {
        setExtractError(err instanceof Error ? err.message : t('weekly.importExternal.extractError'));
      }
    } finally {
      setExtracting(false);
    }
  }

  async function handleImport() {
    if (!subjectId || sessions.length === 0) return;
    setImporting(true);
    setImportError('');
    try {
      await Promise.all(
        sessions.map((s) => {
          const key = assignment[s.id];
          if (!key) return Promise.resolve();
          const [timetableSlotId, weekStartDate] = key.split('|');
          return upsertWeeklyPlan(ownerId, schoolYearId, timetableSlotId, subjectId, weekStartDate, {
            title: s.title,
            description: s.description,
            driveAttachments: [],
            rubric: [],
            status: 'planned',
          });
        })
      );
      onClose();
    } catch (err) {
      setImportError(err instanceof Error ? err.message : String(err));
    } finally {
      setImporting(false);
    }
  }

  function occurrenceLabel(occ: Occurrence): string {
    const dayDef = DAYS.find((d) => d.value === occ.day);
    return `${dayDef ? t(dayDef.key) : ''} ${dateForDayInWeek(occ.weekStartDate, occ.day, language)} · ${occ.startTime}`;
  }

  return (
    <Modal open onClose={onClose} title={t('weekly.importExternal.title')} widthClass="max-w-2xl">
      <div className="flex flex-col gap-4">
        {step === 'upload' && (
          <>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('weekly.importExternal.help')}</p>
            <Select label={t('weekly.importExternal.subject')} value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">{t('weekly.importExternal.subjectPlaceholder')}</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>
              ))}
            </Select>
            {noSlotsForSubject && (
              <p className="text-xs rounded-lg px-2.5 py-2" style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}>
                {t('weekly.importExternal.noSlotsForSubject')}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <label
                className="flex items-center gap-2 text-xs font-semibold cursor-pointer rounded-lg px-3 py-2.5 self-start"
                style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                <IconUpload size={16} />
                {file ? file.name : t('weekly.importExternal.pdfLabel')}
                <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
              </label>
              {file && (
                <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="self-start">
                  {t('weekly.importExternal.pdfRemove')}
                </Button>
              )}
              {fileError && <p className="text-xs text-rose-600">{fileError}</p>}
            </div>
            {extractError && <p className="text-xs text-rose-600">{extractError}</p>}
            <div className="flex gap-2">
              <Button
                icon={<IconSparkles size={16} />}
                onClick={handleExtract}
                disabled={!subjectId || !file || extracting || noSlotsForSubject}
              >
                {extracting ? t('weekly.importExternal.extracting') : t('weekly.importExternal.extract')}
              </Button>
              <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
            </div>
          </>
        )}

        {step === 'review' && (
          <>
            {sessions.length === 0 ? (
              <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{t('weekly.importExternal.noSessionsFound')}</p>
            ) : (
              <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
                {sessions.map((s) => (
                  <div key={s.id} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: 'var(--bg-input)' }}>
                    <div className="flex items-center gap-2">
                      <Input value={s.title} onChange={(e) => updateSession(s.id, { title: e.target.value })} className="flex-1" />
                      <button
                        onClick={() => removeSession(s.id)}
                        aria-label={t('common.delete')}
                        className="p-1.5 rounded-full shrink-0"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <IconTrash size={16} />
                      </button>
                    </div>
                    <Textarea value={s.description} onChange={(e) => updateSession(s.id, { description: e.target.value })} rows={2} />
                    {hasAnyDate && (
                      <Input
                        type="date"
                        label={t('weekly.importExternal.sessionDate')}
                        value={s.date ?? ''}
                        onChange={(e) => updateSession(s.id, { date: e.target.value || undefined })}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {sessions.length > 0 && (
              <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--bg-input)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t('weekly.importExternal.dateStrategyTitle')}</p>
                {hasAnyDate && (
                  <div className="flex flex-col gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={dateMode === 'keep'} onChange={() => setDateMode('keep')} />
                      {t('weekly.importExternal.dateModeKeep')}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={dateMode === 'start'} onChange={() => setDateMode('start')} />
                      {t('weekly.importExternal.dateModeStart')}
                    </label>
                  </div>
                )}
                {(!hasAnyDate || dateMode === 'start') && (
                  <Input
                    type="date"
                    label={t('weekly.importExternal.startDate')}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                )}
                {hasAnyDate && dateMode === 'keep' && unresolvedSessions.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {t('weekly.importExternal.unmatchedHelp')}
                    </p>
                    {unresolvedSessions.map((s) => {
                      const usedKeys = new Set(
                        Object.entries(assignment).filter(([sid]) => sid !== s.id).map(([, k]) => k)
                      );
                      const available = occurrences.filter((o) => !usedKeys.has(occKey(o)));
                      return (
                        <div key={s.id} className="flex items-center gap-2 text-xs">
                          <span className="flex-1 truncate" style={{ color: 'var(--text-primary)' }}>{s.title || t('weekly.importExternal.untitled')}</span>
                          <Select
                            className="flex-1"
                            value={manualAssignment[s.id] ?? ''}
                            onChange={(e) => setManualAssignment((prev) => ({ ...prev, [s.id]: e.target.value }))}
                          >
                            <option value="">{t('weekly.importExternal.chooseSession')}</option>
                            {available.map((o) => (
                              <option key={occKey(o)} value={occKey(o)}>{occurrenceLabel(o)}</option>
                            ))}
                          </Select>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {importError && <p className="text-xs text-rose-600">{importError}</p>}
            <div className="flex gap-2">
              <Button
                onClick={handleImport}
                disabled={sessions.length === 0 || importing || unresolvedSessions.length > 0}
              >
                {importing ? t('common.loading') : t('weekly.importExternal.confirm')}
              </Button>
              <Button variant="ghost" onClick={() => setStep('upload')}>{t('common.back')}</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
