import * as XLSX from 'xlsx';

export interface StudentRow {
  firstName: string;
  lastName: string;
}

/**
 * Parsea un Excel de alumnos. Acepta dos formatos:
 *  - Columnas separadas "Nombre" / "Apellidos" (en varios idiomas).
 *  - Una sola columna "Nombre completo" (se intenta separar por la última
 *    palabra como apellido si no hay coma; si hay coma, se asume
 *    "Apellidos, Nombre").
 */
export async function parseStudentsFile(file: File): Promise<StudentRow[]> {
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

      const firstNameCol = String(
        normalized['nombre'] ?? normalized['izena'] ?? normalized['first name'] ?? normalized['firstname'] ?? ''
      ).trim();
      const lastNameCol = String(
        normalized['apellidos'] ??
          normalized['apellido'] ??
          normalized['cognoms'] ??
          normalized['abizenak'] ??
          normalized['last name'] ??
          normalized['lastname'] ??
          ''
      ).trim();
      const fullNameCol = String(
        normalized['nombre completo'] ??
          normalized['nom complet'] ??
          normalized['full name'] ??
          normalized['fullname'] ??
          ''
      ).trim();

      if (firstNameCol || lastNameCol) {
        return { firstName: firstNameCol, lastName: lastNameCol };
      }

      if (fullNameCol) {
        return splitFullName(fullNameCol);
      }

      // Si solo hay una columna sin cabecera reconocida, intenta usar el
      // primer valor de la fila como nombre completo.
      const firstValue = String(Object.values(row)[0] ?? '').trim();
      if (firstValue) {
        return splitFullName(firstValue);
      }

      return { firstName: '', lastName: '' };
    })
    .filter((r) => r.firstName !== '' || r.lastName !== '');
}

/**
 * Parsea una lista de alumnos pegada con Ctrl+V desde Excel/Word (una fila
 * por alumno). Acepta tanto una lista de nombres completos en una sola
 * "columna" pegada (una línea por alumno) como dos columnas (nombre y
 * apellidos separados por tabulador, tal com los pega Excel al copiar un
 * rango de dos columnas).
 */
export function parseStudentsText(text: string): StudentRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => {
      if (line.includes('\t')) {
        const [firstName = '', lastName = ''] = line.split('\t').map((p) => p.trim());
        return { firstName, lastName };
      }
      return splitFullName(line);
    })
    .filter((r) => r.firstName !== '' || r.lastName !== '');
}

function splitFullName(fullName: string): StudentRow {
  if (fullName.includes(',')) {
    // "Apellidos, Nombre"
    const [lastName, firstName] = fullName.split(',').map((p) => p.trim());
    return { firstName: firstName ?? '', lastName: lastName ?? '' };
  }
  const parts = fullName.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  // Asume que la primera palabra es el nombre y el resto los apellidos.
  const [firstName, ...rest] = parts;
  return { firstName, lastName: rest.join(' ') };
}
