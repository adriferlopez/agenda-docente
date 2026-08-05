import * as XLSX from 'xlsx';

export interface CurriculumRow {
  courseLevel: string;
  code: string;
  block?: string;
  description: string;
}

const HEADERS = ['curso', 'codigo', 'bloque', 'descripcion'];

/**
 * Genera y descarga una plantilla Excel vacía con las columnas esperadas
 * para que el docente la rellene con los saberes de su asignatura.
 */
export function downloadCurriculumTemplate(subjectName: string) {
  const wsData = [
    ['curso', 'codigo', 'bloque', 'descripcion'],
    ['3º ESO', 'B1.1', 'Sentido numérico', 'Ejemplo: Operaciones con números racionales en contextos cotidianos'],
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 60 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Saberes');
  XLSX.writeFile(wb, `plantilla_saberes_${subjectName.replace(/\s+/g, '_')}.xlsx`);
}

/**
 * Parsea un archivo Excel subido por el usuario y devuelve las filas de saberes.
 * Acepta cabeceras en español, catalán, euskera, gallego e inglés de forma flexible.
 */
export async function parseCurriculumFile(file: File): Promise<CurriculumRow[]> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: 'array' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

  return rows
    .map((row) => {
      const normalized: Record<string, unknown> = {};
      for (const key of Object.keys(row)) {
        normalized[key.toLowerCase().trim()] = row[key];
      }
      const courseLevel = String(
        normalized['curso'] ?? normalized['course'] ?? normalized['maila'] ?? ''
      ).trim();
      const code = String(
        normalized['codigo'] ?? normalized['código'] ?? normalized['code'] ?? ''
      ).trim();
      const block = String(
        normalized['bloque'] ?? normalized['block'] ?? normalized['bloc'] ?? ''
      ).trim();
      const description = String(
        normalized['descripcion'] ?? normalized['descripción'] ?? normalized['description'] ?? ''
      ).trim();

      return { courseLevel, code, block, description };
    })
    .filter((r) => r.description !== '' || r.code !== '');
}

export { HEADERS as CURRICULUM_HEADERS };
