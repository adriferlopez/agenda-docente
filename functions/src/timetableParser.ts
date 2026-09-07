import { HttpsError } from 'firebase-functions/v2/https';

// Palabras que indican que la celda no representa ninguna actividad (ni
// asignatura ni evento con entidad propia): se ignoran, no se crea nada.
const PURE_IGNORE_WORDS = [
  'no lectiva', 'no lectivo', 'estona migdia', 'període entre rondes',
];

function shouldIgnore(text: string): boolean {
  const lower = text.toLowerCase().trim();
  if (!lower) return true;
  return PURE_IGNORE_WORDS.some((w) => lower.includes(w));
}

export type ParsedSpecialType = 'patio' | 'refuerzo' | 'guardia' | 'tutoria' | 'otro';

// Palabras que sí representan un evento real del horario (patio, guardia,
// reunión...) pero que NO son una asignatura del docente. Se importan como
// franja "especial" (con su propio tipo/color, igual que si el docente la
// hubiera marcado a mano en Horario) en vez de crear una Subject falsa.
const SPECIAL_TYPE_KEYWORDS: Record<Exclude<ParsedSpecialType, 'otro'>, string[]> = {
  patio: ['patio', 'pati', 'esbarjo', 'recreo', 'recreio', 'atsedenaldia'],
  guardia: ['guardia', 'guàrdia', 'garda'],
  refuerzo: ['refuerzo', 'reforç', 'reforzo'],
  tutoria: ['tutoria', 'tutoría'],
};

// Otras palabras que tampoco son asignaturas pero no encajan en ninguno de
// los tipos anteriores (se importan como tipo "otro", conservando el texto
// original como etiqueta).
const OTHER_SPECIAL_WORDS = [
  'reunión', 'reunion', 'reunió', 'coordinación', 'coordinacion', 'coordinació',
  'claustro', 'claustre', 'exclusiva',
];

function detectSpecialType(text: string): { type: ParsedSpecialType; label?: string } | null {
  const lower = text.toLowerCase().trim();
  if (!lower) return null;
  for (const type of Object.keys(SPECIAL_TYPE_KEYWORDS) as (keyof typeof SPECIAL_TYPE_KEYWORDS)[]) {
    if (SPECIAL_TYPE_KEYWORDS[type].some((w) => lower.includes(w))) return { type };
  }
  if (OTHER_SPECIAL_WORDS.some((w) => lower.includes(w))) {
    return { type: 'otro', label: text.trim() };
  }
  return null;
}

function parseTimeRange(raw: string): [string, string] | null {
  const matches = [...raw.matchAll(/(\d{1,2})[.:h](\d{2})/g)];
  if (matches.length >= 2) {
    const fmt = (h: string, m: string) => `${String(parseInt(h)).padStart(2,'0')}:${m.padStart(2,'0')}`;
    return [fmt(matches[0][1], matches[0][2]), fmt(matches[1][1], matches[1][2])];
  }
  return null;
}

function detectDay(text: string): number {
  const lower = text.toLowerCase();
  const days = [
    ['dilluns','lunes','monday'],
    ['dimarts','martes','tuesday'],
    ['dimecres','miércoles','miercoles','wednesday'],
    ['dijous','jueves','thursday'],
    ['divendres','viernes','friday'],
  ];
  for (let i = 0; i < days.length; i++) {
    if (days[i].some((d) => lower.includes(d))) return i;
  }
  return -1;
}

function extractSubjectGroup(text: string): { subject: string; group: string } {
  // Eliminar "a les XX.XXh"
  const cleaned = text.replace(/\ba les \d+[.,]\d+h?\b/gi, '').trim();

  // Patrón estricto: número+ordinal seguido directamente de la letra de
  // grupo (ej. "1r A", "2n B"). Se prueba primero para no cambiar el
  // comportamiento de los casos que ya funcionaban.
  const strictMatch = cleaned.match(/\b(\d+[rntºª]\s*[A-Z])\b/i);
  if (strictMatch) {
    const group = strictMatch[1].trim();
    const subject = cleaned.replace(strictMatch[0], '').trim().replace(/\s+/g, ' ');
    return { subject: subject || cleaned, group };
  }

  // Patrón amplio: cuando entre el curso y la letra de grupo hay palabras
  // de etapa (ej. "Lectura 2n ESO C", "Anglès 1r Primària A"), el patrón
  // estricto no matchea porque "ESO"/"Primària" rompe el límite de palabra
  // justo después de la primera letra. Aquí se captura TODO desde el primer
  // número (curso) hasta el final del texto, siempre que acabe en una
  // palabra de una sola letra en mayúscula (la letra de grupo).
  const wideMatch = cleaned.match(/\b(\d{1,2}[rntñºª]?\.?\s+\S.*\b[A-Z])$/);
  if (wideMatch && wideMatch.index !== undefined) {
    const group = wideMatch[1].trim();
    const subject = cleaned.slice(0, wideMatch.index).trim().replace(/\s+/g, ' ');
    if (subject) return { subject, group };
  }

  return { subject: cleaned, group: '' };
}

export interface ParsedSlot {
  day: number;
  startTime: string;
  endTime: string;
  subjectName: string;
  group: string;
  room: string;
  // Presente cuando la celda es un evento (patio, guardia, reunión...) y no
  // una asignatura real: el cliente debe crear una franja "especial" en vez
  // de crear/emparejar una Subject con `subjectName`.
  specialType?: ParsedSpecialType;
  specialLabel?: string;
}

function buildGridFromXml(xml: string): string[][] {
  const MAX_COLS = 20;
  const rowMatches = [...xml.matchAll(/<w:tr[ >]([\s\S]*?)<\/w:tr>/g)];
  const numRows = rowMatches.length;
  const grid: (string | null)[][] = Array.from({length: numRows}, () => new Array(MAX_COLS).fill(null));

  for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
    const rowXml = rowMatches[rowIdx][1];
    const cellMatches = [...rowXml.matchAll(/<w:tc[ >]([\s\S]*?)<\/w:tc>/g)];
    let colCursor = 0;

    for (const cellMatch of cellMatches) {
      const cellXml = cellMatch[1];
      // Saltar columnas ya ocupadas por rowspan
      while (colCursor < MAX_COLS && grid[rowIdx][colCursor] !== null) colCursor++;
      if (colCursor >= MAX_COLS) break;

      const gsMatch = cellXml.match(/<w:gridSpan w:val="(\d+)"/);
      const colspan = gsMatch ? parseInt(gsMatch[1]) : 1;
      const vmMatch = cellXml.match(/<w:vMerge( w:val="restart")?/);
      const isCont = vmMatch && !vmMatch[1];
      const isRestart = vmMatch && vmMatch[1];

      let text = '';
      if (!isCont) {
        const paraMatches = [...cellXml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)];
        const paraTexts = paraMatches.map((pm) => {
          const t = [...pm[0].matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1]).join('');
          return t.trim();
        }).filter(Boolean);
        text = paraTexts.join('\n');
      }

      for (let c = 0; c < colspan; c++) {
        const col = colCursor + c;
        if (col >= MAX_COLS) break;
        if (isCont) {
          grid[rowIdx][col] = rowIdx > 0 ? (grid[rowIdx-1][col] ?? '') : '';
        } else {
          grid[rowIdx][col] = text;
          if (isRestart) {
            for (let r = rowIdx + 1; r < numRows; r++) {
              if (grid[r][col] === null) grid[r][col] = '\0ROWSPAN\0' + text;
            }
          }
        }
      }
      colCursor += colspan;
    }
  }

  // Resolver rowspan y null restantes
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < MAX_COLS; c++) {
      const v = grid[r][c];
      if (v === null) grid[r][c] = '';
      else if (typeof v === 'string' && v.startsWith('\0ROWSPAN\0')) {
        grid[r][c] = v.slice(9);
      }
    }
  }

  return grid as string[][];
}

function parseTimetableGrid(grid: string[][]): ParsedSlot[] {
  const slots: ParsedSlot[] = [];
  if (grid.length < 2) return slots;

  // Detectar mapa columna→día desde la cabecera (máx 3 primeras filas)
  const colToDay = new Map<number, number>();
  const seenDays = new Set<number>();

  for (let rowIdx = 0; rowIdx < Math.min(3, grid.length); rowIdx++) {
    const row = grid[rowIdx];
    for (let c = 0; c < row.length; c++) {
      const day = detectDay(row[c] ?? '');
      if (day >= 0) {
        colToDay.set(c, day);
        seenDays.add(day);
      }
    }
  }

  if (colToDay.size === 0) return slots;

  // Deduplicar: si un día aparece en varias columnas (colspan), usar solo la primera
  const dayFirstCol = new Map<number, number>();
  colToDay.forEach((day, col) => {
    if (!dayFirstCol.has(day) || col < dayFirstCol.get(day)!) {
      dayFirstCol.set(day, col);
    }
  });

  // Construir set de columnas únicas por día
  const uniqueColToDay = new Map<number, number>();
  dayFirstCol.forEach((col, day) => uniqueColToDay.set(col, day));
  // También incluir columnas adicionales (ej. Dimarts col 2 y col 3 son distintas, queremos col 3 también)
  colToDay.forEach((day, col) => {
    if (!uniqueColToDay.has(col)) {
      // Columna extra del mismo día — incluirla solo si es una columna diferente con contenido distinto
      uniqueColToDay.set(col, day);
    }
  });

  // Parsear filas de datos
  const seenSlots = new Set<string>();

  for (let r = 1; r < grid.length; r++) {
    const row = grid[r];
    const timeRange = parseTimeRange(row[0] ?? '');
    if (!timeRange) continue;
    const [start, end] = timeRange;

    uniqueColToDay.forEach((day, col) => {
      const cellText = (row[col] ?? '').trim();
      if (!cellText || shouldIgnore(cellText)) return;

      const parts = cellText.split('\n').filter((p) => p.trim());
      // Unir líneas que son continuación de la misma asignatura (ej. "Ambients M\n(període entre rondes)")
      const merged: string[] = [];
      for (const part of parts) {
        const trimmed = part.trim();
        if (!trimmed) continue;
        // Si empieza por '(' es probablemente una aclaración de la anterior
        if (trimmed.startsWith('(') && merged.length > 0) {
          merged[merged.length - 1] += ' ' + trimmed;
        } else {
          merged.push(trimmed);
        }
      }

      for (const part of merged) {
        if (shouldIgnore(part)) continue;

        const special = detectSpecialType(part);
        if (special) {
          const key = `${day}-${start}-${end}-special-${special.type}-${(special.label ?? '').toLowerCase()}`;
          if (seenSlots.has(key)) continue;
          seenSlots.add(key);
          slots.push({
            day, startTime: start, endTime: end,
            subjectName: part.trim(), group: '', room: '',
            specialType: special.type, specialLabel: special.label,
          });
          continue;
        }

        const { subject, group } = extractSubjectGroup(part);
        if (!subject || subject.length < 2) continue;

        // Deduplicar slots idénticos (colspan genera duplicados)
        const key = `${day}-${start}-${end}-${subject.toLowerCase()}-${group.toLowerCase()}`;
        if (seenSlots.has(key)) continue;
        seenSlots.add(key);

        slots.push({ day, startTime: start, endTime: end, subjectName: subject, group, room: '' });
      }
    });
  }

  return slots;
}

export async function parseWordTimetable(buffer: Buffer): Promise<ParsedSlot[]> {
  try {
    // @ts-ignore
    const PizZip = (await import('pizzip')).default;
    const zip = new PizZip(buffer);
    const xmlContent = zip.file('word/document.xml')?.asText();
    if (!xmlContent) throw new HttpsError('invalid-argument', 'No se pudo leer el documento Word.');
    const grid = buildGridFromXml(xmlContent);
    return parseTimetableGrid(grid);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    throw new HttpsError('internal', `Error parseando Word: ${message}`);
  }
}

export async function parseExcelTimetable(buffer: Buffer): Promise<ParsedSlot[]> {
  try {
    // @ts-ignore
    const XLSX = await import('xlsx');
    // OJO: NO se usa `cellDates: true` a propósito. SheetJS construye el
    // objeto Date interpretando el número de serie con la zona horaria del
    // *servidor* en el instante de la conversión; para fechas de 1899-1900
    // eso puede introducir un desfase de varios minutos si el TZ local
    // tenía un offset histórico no redondo (p.ej. Europe/Madrid usaba
    // UTC+00:14 antes de 1901). Leyendo el número de serie crudo (más
    // abajo, en excelCellToText) y haciendo la conversión a "HH:MM"
    // nosotros mismos evitamos ese problema por completo.
    const wb = XLSX.read(buffer, { type: 'buffer' });
    // Preferir una hoja cuyo nombre contenga "horari"/"horario" (la
    // plantilla la llama "Horario", junto a una segunda hoja
    // "Instrucciones"); si no se encuentra ninguna, usar la primera hoja
    // del libro como hasta ahora.
    const sheetName =
      wb.SheetNames.find((n: string) => /horari/i.test(n)) ?? wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];

    // Obtener rangos de celdas combinadas
    const merges: Array<{s:{r:number,c:number}, e:{r:number,c:number}}> = ws['!merges'] ?? [];

    // Leer todas las filas con valores crudos. SheetJS puede devolver
    // objetos Date (o números de serie) en celdas de hora en vez de
    // strings — se normalizan aquí mismo con excelCellToText() para que
    // todo el resto del parser (detectIsTemplate, parseHHMM,
    // parseTimetableGrid...) trabaje siempre con "HH:MM" en texto plano.
    const rawCells: unknown[][] = XLSX.utils.sheet_to_json(ws, {
      header: 1, defval: null, blankrows: true,
    });
    const raw: (string|null)[][] = rawCells.map((row) =>
      (row ?? []).map((c) => excelCellToText(c) || null)
    );

    // Detectar si es plantilla (col A=inicio, col B=fin, col C-G=días)
    const isTemplate = detectIsTemplate(raw);
    if (!isTemplate) {
      const grid = raw.map((row) =>
        (row ?? []).map((c) => c !== null ? String(c).trim() : '')
      );
      return parseTimetableGrid(grid);
    }

    // Construir mapa de horas por fila (índice base 0)
    // Fila 0=cabecera título, 1=instrucciones, 2=cabecera días, 3+=datos
    const rowStartTime: Map<number, string> = new Map();
    const rowEndTime: Map<number, string> = new Map();

    for (let r = 3; r < raw.length; r++) {
      const row = raw[r] ?? [];
      const s = parseHHMM(String(row[0] ?? ''));
      const e = parseHHMM(String(row[1] ?? ''));
      if (s) rowStartTime.set(r, s);
      if (e) rowEndTime.set(r, e);
    }

    // Para cada columna de día (cols 2-6 = días 0-4),
    // construir mapa celda→valor resolviendo merged cells
    // merged cells: la celda fusionada solo tiene valor en la celda superior-izquierda
    // Necesitamos: para cada (fila, col), qué valor tiene y qué rango de filas abarca

    // Primero, expandir merged cells en una matriz
    const MAX_ROW = raw.length;
    const MAX_COL = 7;
    const cellValue: (string|null)[][] = Array.from({length: MAX_ROW}, (_, r) =>
      Array.from({length: MAX_COL}, (_, c) => {
        const cell = raw[r]?.[c];
        return cell !== null && cell !== undefined ? String(cell).trim() : null;
      })
    );

    // Resolver merged cells: propagar el valor de la celda ancla a todas las celdas del rango
    for (const merge of merges) {
      const anchorVal = cellValue[merge.s.r]?.[merge.s.c] ?? null;
      for (let r = merge.s.r; r <= merge.e.r; r++) {
        for (let c = merge.s.c; c <= merge.e.c; c++) {
          if (!cellValue[r]) cellValue[r] = [];
          cellValue[r][c] = anchorVal;
        }
      }
    }

    // Para cada celda de asignatura, determinar su rango de filas real
    // Una celda combinada ocupa desde su fila inicio hasta su fila fin
    // → startTime = hora inicio de la primera fila, endTime = hora fin de la última fila

    // Construir mapa de merged cell ranges por (fila, col)
    const mergeRange = new Map<string, {sr:number, er:number, sc:number, ec:number}>();
    for (const merge of merges) {
      for (let r = merge.s.r; r <= merge.e.r; r++) {
        for (let c = merge.s.c; c <= merge.e.c; c++) {
          mergeRange.set(`${r},${c}`, {sr: merge.s.r, er: merge.e.r, sc: merge.s.c, ec: merge.e.c});
        }
      }
    }

    const slots: ParsedSlot[] = [];
    const seenSlots = new Set<string>();

    for (let r = 3; r < MAX_ROW; r++) {
      for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
        const col = 2 + dayIdx;
        const text = (cellValue[r]?.[col] ?? '').trim();
        if (!text) continue;

        // Determinar rango de filas de esta celda
        const rangeKey = `${r},${col}`;
        const range = mergeRange.get(rangeKey);
        const firstRow = range ? range.sr : r;
        const lastRow = range ? range.er : r;

        // Solo procesar en la primera fila del rango (evitar duplicados)
        if (firstRow !== r) continue;

        // Calcular startTime y endTime del rango
        let startTime = rowStartTime.get(firstRow) ?? '';
        let endTime = rowEndTime.get(lastRow) ?? '';

        // Si no tenemos la hora de fin de la última fila, buscar hacia adelante
        if (!endTime) {
          for (let fr = lastRow; fr < MAX_ROW; fr++) {
            const t = rowEndTime.get(fr);
            if (t) { endTime = t; break; }
          }
        }

        if (!startTime || !endTime) continue;

        // Separar por // si hay varias asignaturas
        const parts = text.split('//').map(p => p.trim()).filter(Boolean);
        for (const part of parts) {
          if (!part || part.length < 1) continue;
          if (shouldIgnore(part)) continue;

          const special = detectSpecialType(part);
          if (special) {
            const key = `${dayIdx}-${startTime}-${endTime}-special-${special.type}-${(special.label ?? '').toLowerCase()}`;
            if (seenSlots.has(key)) continue;
            seenSlots.add(key);
            slots.push({
              day: dayIdx, startTime, endTime,
              subjectName: part.trim(), group: '', room: '',
              specialType: special.type, specialLabel: special.label,
            });
            continue;
          }

          const { subject, group } = extractSubjectGroup(part);
          if (!subject) continue;
          const key = `${dayIdx}-${startTime}-${endTime}-${subject.toLowerCase()}-${group.toLowerCase()}`;
          if (seenSlots.has(key)) continue;
          seenSlots.add(key);
          slots.push({ day: dayIdx, startTime, endTime, subjectName: subject, group, room: '' });
        }
      }
    }

    return slots;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    throw new HttpsError('internal', `Error parseando Excel: ${message}`);
  }
}

function parseHHMM(raw: string): string | null {
  const m = raw.match(/(\d{1,2})[.:h](\d{2})/);
  if (!m) return null;
  return `${String(parseInt(m[1])).padStart(2,'0')}:${m[2]}`;
}

/**
 * Convierte una celda cruda de SheetJS a texto, tratando con cuidado las
 * celdas de hora. Excel convierte automáticamente cualquier valor tecleado
 * con pinta de hora (ej. "8:30") a un valor de hora/fecha nativo en cuanto
 * el usuario edita o añade filas en la plantilla (algo que la propia hoja
 * de instrucciones invita a hacer). Con `cellDates: true`, SheetJS entrega
 * esas celdas como objetos `Date` (o, más raramente, como número de serie),
 * no como el string "HH:MM" que el resto del parser espera. Sin esta
 * conversión, `String(cellDate)` produce algo como
 * "Sat Dec 30 1899 07:45:16 GMT..." (con el desfase de huso horario local
 * incluido), que no matchea ningún regex de hora y hace que TODA la fila se
 * descarte silenciosamente — la causa real de "no se detectaron clases".
 */
function excelCellToText(cell: unknown): string {
  if (cell === null || cell === undefined) return '';
  if (cell instanceof Date) {
    // Los libros de Excel no llevan huso horario: SheetJS construye el Date
    // interpretando el número de serie como UTC, así que hay que leer la
    // hora también en UTC (usar getHours()/getMinutes() locales desplaza el
    // resultado según la zona horaria del servidor).
    const h = cell.getUTCHours();
    const m = cell.getUTCMinutes();
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  if (typeof cell === 'number') {
    // Número de serie de Excel para una hora "pura" (sin parte de fecha):
    // fracción de día. Cubre el caso, más raro, de que la celda llegue como
    // número en vez de Date (p.ej. si el formato de celda no se reconoce
    // como fecha/hora).
    const fraction = cell - Math.floor(cell);
    if (cell < 1 && fraction > 0) {
      const totalMinutes = Math.round(fraction * 24 * 60);
      const h = Math.floor(totalMinutes / 60) % 24;
      const m = totalMinutes % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    return String(cell);
  }
  return String(cell).trim();
}

/** Detecta si el Excel sigue el formato de nuestra plantilla */
function detectIsTemplate(raw: (string|null)[][]): boolean {
  let timeRows = 0;
  for (const row of raw) {
    const col0 = String(row?.[0] ?? '').trim();
    const col1 = String(row?.[1] ?? '').trim();
    if (/^\d{1,2}[.:h]\d{2}$/.test(col0) && /^\d{1,2}[.:h]\d{2}$/.test(col1)) {
      timeRows++;
    }
  }
  return timeRows >= 2;
}
