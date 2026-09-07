import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconPlus, IconTrash } from '@/components/ui/icons';

/**
 * Forma mínima que necesita un criterio para poder mostrarse/editarse aquí.
 * `GradingCriterion` (rúbricas guardadas) y `GeneratedCriterion` (rúbricas
 * recién generadas por Profi, que todavía no tienen "id") encajan ambas.
 */
export interface RubricCriterionLike {
  name: string;
  description?: string;
  weight: number;
  indicators: [string, string, string, string];
  ceId?: string;
  ceName?: string;
  ceReference?: string;
  ceLabel?: string;
}

interface Props<T extends RubricCriterionLike> {
  criteria: T[];
  onChange: (criteria: T[]) => void;
  /** Crea un criterio nuevo vacío al pulsar "Añadir criterio" (cada consumidor decide su forma exacta, p.ej. si necesita "id"). */
  newCriterion: () => T;
  /** Vista de solo lectura (rúbricas LOMLOE predefinidas). Por defecto, editable. */
  readOnly?: boolean;
}

/**
 * Editor visual de criterios de rúbrica: cabecera con nombre/descripción/peso
 * y una rejilla de 4 niveles de color (Insuficiente → Excelente). Este es el
 * mismo diseño que ya usaba Notas → Rúbricas (RubricDetailModal); se extrajo
 * aquí para reutilizarlo también en las rúbricas generadas desde Profi, así
 * ambos sitios se ven y se editan igual.
 */
export default function RubricCriteriaEditor<T extends RubricCriterionLike>({
  criteria,
  onChange,
  newCriterion,
  readOnly = false,
}: Props<T>) {
  const { t } = useTranslation();
  const [expandedRef, setExpandedRef] = useState<Set<number>>(new Set());

  const LEVEL_LABELS = [t('grades.level1'), t('grades.level2'), t('grades.level3'), t('grades.level4')];
  const totalWeight = criteria.reduce((s, c) => s + (c.weight || 0), 0);

  function toggleRef(i: number) {
    setExpandedRef((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function updateCriterion(i: number, patch: Partial<T>) {
    onChange(criteria.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  function updateIndicator(i: number, level: number, value: string) {
    onChange(
      criteria.map((c, idx) => {
        if (idx !== i) return c;
        const indicators = [...c.indicators] as [string, string, string, string];
        indicators[level] = value;
        return { ...c, indicators };
      })
    );
  }

  function removeCriterion(i: number) {
    onChange(criteria.filter((_, idx) => idx !== i));
  }

  function addCriterion() {
    onChange([...criteria, newCriterion()]);
  }

  return (
    <div className="flex flex-col gap-4">
      {!readOnly && criteria.length > 0 && (
        <p className={`text-xs ${Math.abs(totalWeight - 100) > 0.01 ? 'text-rose-500' : 'text-ink-soft'}`}>
          {t('grades.totalWeight')}: {totalWeight}% {Math.abs(totalWeight - 100) > 0.01 ? t('grades.totalWeightWarning') : ''}
        </p>
      )}

      {criteria.map((c, i) => (
        <div key={i} className="border border-lav-100 rounded-2xl overflow-hidden">
          <div className="bg-accent-light px-4 py-2.5 flex flex-col gap-2">
            {c.ceLabel && (
              <span className="inline-flex items-center gap-1 self-start text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 bg-theme-card text-accent">
                {c.ceLabel}
              </span>
            )}
            {!readOnly ? (
              <div className="flex items-start gap-2">
                <div className="flex-1 flex flex-col gap-1.5">
                  <Input
                    value={c.name}
                    onChange={(e) => updateCriterion(i, { name: e.target.value } as Partial<T>)}
                    placeholder={t('grades.criterionName')}
                  />
                  <textarea
                    value={c.description ?? ''}
                    onChange={(e) => updateCriterion(i, { description: e.target.value } as Partial<T>)}
                    placeholder={t('grades.criterionDescriptionWithRef')}
                    rows={2}
                    className="w-full rounded-xl border border-lav-100 bg-theme-card px-2 py-1.5 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {c.ceReference && (
                    <button
                      type="button"
                      onClick={() => toggleRef(i)}
                      className="text-[10px] font-medium text-accent self-start hover:underline"
                    >
                      {expandedRef.has(i) ? 'ocultar texto oficial completo' : 'ver texto oficial completo'}
                    </button>
                  )}
                  {c.ceReference && expandedRef.has(i) && (
                    <p className="text-xs whitespace-pre-wrap rounded-xl px-2.5 py-2" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--text-secondary)' }}>
                      {c.ceName && <span className="font-semibold block mb-0.5">{c.ceId ? `${c.ceId}. ` : ''}{c.ceName}</span>}
                      {c.ceReference}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={c.weight}
                      onChange={(e) => updateCriterion(i, { weight: Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)) } as Partial<T>)}
                      className="w-16 text-center border border-lav-200 rounded-xl px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-xs text-ink-soft">%</span>
                  </div>
                  <button onClick={() => removeCriterion(i)} className="text-ink-soft hover:text-rose-600">
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-ink">{c.name}</span>
                    {c.description && <span className="text-xs text-ink-soft ml-2">— {c.description}</span>}
                  </div>
                  <span className="text-xs font-semibold text-accent bg-theme-card rounded-full px-2 py-0.5">
                    {c.weight}%
                  </span>
                </div>
                {c.ceReference && (
                  <button
                    type="button"
                    onClick={() => toggleRef(i)}
                    className="text-[10px] font-medium text-accent self-start hover:underline"
                  >
                    {expandedRef.has(i) ? 'ocultar texto oficial completo' : 'ver texto oficial completo'}
                  </button>
                )}
                {c.ceReference && expandedRef.has(i) && (
                  <p className="text-xs whitespace-pre-wrap rounded-xl px-2.5 py-2" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--text-secondary)' }}>
                    {c.ceName && <span className="font-semibold block mb-0.5">{c.ceId ? `${c.ceId}. ` : ''}{c.ceName}</span>}
                    {c.ceReference}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-lav-100">
            {c.indicators.map((indicator, level) => (
              <div key={level} className={`p-3 ${level === 0 ? 'bg-rose-50' : level === 1 ? 'bg-butter-50' : level === 2 ? 'bg-accent-light' : 'bg-mint-50'}`}>
                <p className={`text-[10px] font-semibold mb-1 ${level === 0 ? 'text-rose-500' : level === 1 ? 'text-butter-600' : level === 2 ? 'text-accent' : 'text-mint-600'}`}>
                  {LEVEL_LABELS[level]}
                </p>
                {!readOnly ? (
                  <textarea
                    value={indicator}
                    onChange={(e) => updateIndicator(i, level, e.target.value)}
                    rows={3}
                    placeholder={t('grades.describeLevel')}
                    className="w-full rounded-lg border border-lav-100 bg-theme-card px-1.5 py-1 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                ) : (
                  <p className="text-xs text-ink leading-relaxed">{indicator}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {criteria.length === 0 && (
        <p className="text-sm text-ink-soft">{t('grades.noCriteriaYet')}</p>
      )}

      {!readOnly && (
        <Button size="sm" variant="secondary" icon={<IconPlus size={14} />} onClick={addCriterion} className="self-start">
          {t('grades.addCriterion')}
        </Button>
      )}
    </div>
  );
}
