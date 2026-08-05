import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconPlus, IconTrash } from '@/components/ui/icons';
import type { RubricCriterion } from '@/types';

interface Props {
  rubric: RubricCriterion[];
  onChange: (rubric: RubricCriterion[]) => void;
}

const DEFAULT_LEVELS = ['Excelente', 'Adecuado', 'En proceso', 'Inicial'];

export default function RubricEditor({ rubric, onChange }: Props) {
  const { t } = useTranslation();

  function addCriterion() {
    const criterion: RubricCriterion = {
      id: crypto.randomUUID(),
      description: '',
      levels: DEFAULT_LEVELS.map((label, i) => ({ label, description: '', points: 4 - i })),
    };
    onChange([...rubric, criterion]);
  }

  function updateCriterion(id: string, description: string) {
    onChange(rubric.map((c) => (c.id === id ? { ...c, description } : c)));
  }

  function updateLevel(criterionId: string, levelIndex: number, description: string) {
    onChange(
      rubric.map((c) =>
        c.id === criterionId
          ? {
              ...c,
              levels: c.levels.map((l, i) => (i === levelIndex ? { ...l, description } : l)),
            }
          : c
      )
    );
  }

  function removeCriterion(id: string) {
    onChange(rubric.filter((c) => c.id !== id));
  }

  return (
    <div className="flex flex-col gap-3">
      {rubric.map((criterion) => (
        <div key={criterion.id} className="border border-lav-100 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <Input
              value={criterion.description}
              onChange={(e) => updateCriterion(criterion.id, e.target.value)}
              placeholder="Criterio de evaluación (ej. Trabajo en equipo)"
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeCriterion(criterion.id)}
              className="text-ink-soft hover:text-rose-600 mt-2.5"
            >
              <IconTrash size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {criterion.levels.map((level, i) => (
              <div key={level.label} className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-ink-soft">{level.label}</span>
                <textarea
                  value={level.description}
                  onChange={(e) => updateLevel(criterion.id, i, e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-lav-100 bg-lav-50/40 px-2 py-1.5 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-lav-300"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button type="button" variant="secondary" size="sm" onClick={addCriterion} icon={<IconPlus size={16} />} className="self-start">
        {t('weekly.addCriterion')}
      </Button>
    </div>
  );
}
