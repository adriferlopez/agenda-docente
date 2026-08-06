import * as XLSX from 'xlsx';
import type { GradingCriterion } from '@/types';

/**
 * Genera y descarga una plantilla Excel para que el docente defina su propia
 * rúbrica. Columnas: Criterio | Descripción | Peso(%) | Nivel1 | Nivel2 | Nivel3 | Nivel4
 */
export function downloadRubricTemplate(): void {
  const headers = [
    'Criterio (nombre)',
    'Descripción (opcional)',
    'Peso (%)',
    'Nivel 1 — Insuficiente',
    'Nivel 2 — Suficiente/Bien',
    'Nivel 3 — Notable',
    'Nivel 4 — Excelente',
  ];

  const example: string[][] = [
    [
      'Comprensión lectora',
      'Leer y comprender textos de distinta tipología',
      '25',
      'Comprende solo textos muy sencillos con ayuda',
      'Comprende textos sencillos con algunos errores',
      'Comprende textos variados con autonomía',
      'Interpreta y evalúa textos complejos críticamente',
    ],
    [
      'Expresión escrita',
      'Producir textos escritos correctos y adecuados',
      '25',
      'Produce textos muy breves con muchos errores',
      'Produce textos básicos con adecuación aceptable',
      'Produce textos bien estructurados y correctos',
      'Produce textos originales con voz propia',
    ],
    [
      'Comunicación oral',
      '',
      '25',
      'Participa muy poco con dificultades de fluidez',
      'Participa en intercambios básicos',
      'Participa con fluidez en contextos variados',
      'Participa con eficacia y creatividad',
    ],
    [
      'Reflexión lingüística',
      '',
      '25',
      'Aplica conocimientos lingüísticos muy limitados',
      'Aplica conocimientos básicos con errores',
      'Aplica conocimientos con acierto',
      'Reflexiona y aplica de forma autónoma y crítica',
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, ...example]);

  // Ajustar anchos de columna
  ws['!cols'] = [
    { wch: 28 },
    { wch: 35 },
    { wch: 10 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rúbrica');

  const notasSheet = XLSX.utils.aoa_to_sheet([
    ['INSTRUCCIONES'],
    [''],
    ['1. Rellena una fila por cada criterio de evaluación.'],
    ['2. El campo "Peso (%)" debe sumar 100 en total.'],
    ['3. Los 4 niveles corresponden a: Insuficiente, Suficiente/Bien, Notable, Excelente.'],
    ['4. Guarda el archivo y súbelo desde la app (Notas → Nueva rúbrica → Importar Excel).'],
  ]);
  XLSX.utils.book_append_sheet(wb, notasSheet, 'Instrucciones');

  XLSX.writeFile(wb, 'plantilla-rubrica.xlsx');
}

export interface ParsedRubric {
  criteria: GradingCriterion[];
  errors: string[];
}

/**
 * Parsea un archivo Excel con rúbrica propia del docente.
 * La primera fila se ignora (cabecera).
 */
export async function parseRubricFile(file: File): Promise<ParsedRubric> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: 'array' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

  const errors: string[] = [];
  const criteria: GradingCriterion[] = [];
  let totalWeight = 0;

  // Saltar cabecera
  const dataRows = rows.slice(1).filter((r) => r.some((c) => String(c).trim()));

  if (dataRows.length === 0) {
    errors.push('El archivo no contiene datos de criterios.');
    return { criteria, errors };
  }

  dataRows.forEach((row, i) => {
    const name = String(row[0] ?? '').trim();
    const description = String(row[1] ?? '').trim();
    const weightRaw = String(row[2] ?? '').trim();
    const ind1 = String(row[3] ?? '').trim();
    const ind2 = String(row[4] ?? '').trim();
    const ind3 = String(row[5] ?? '').trim();
    const ind4 = String(row[6] ?? '').trim();

    if (!name) {
      errors.push(`Fila ${i + 2}: el nombre del criterio está vacío.`);
      return;
    }

    const weight = parseFloat(weightRaw.replace(',', '.'));
    if (isNaN(weight) || weight <= 0) {
      errors.push(`Fila ${i + 2}: el peso "${weightRaw}" no es un número válido.`);
      return;
    }

    if (!ind1 || !ind2 || !ind3 || !ind4) {
      errors.push(`Fila ${i + 2}: faltan indicadores (necesitas los 4 niveles).`);
      return;
    }

    totalWeight += weight;
    criteria.push({
      id: `custom-${Date.now()}-${i}`,
      name,
      description: description || undefined,
      weight,
      indicators: [ind1, ind2, ind3, ind4],
    });
  });

  if (Math.abs(totalWeight - 100) > 1) {
    errors.push(`Los pesos suman ${totalWeight.toFixed(1)}% (deben sumar 100%).`);
  }

  return { criteria, errors };
}
