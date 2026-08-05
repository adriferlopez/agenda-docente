/**
 * Las plantillas de comentarios usan dos tipos de huecos:
 *  - {nombre}: se sustituye automáticamente por el nombre del alumno elegido.
 *  - {etiqueta:opciónA/opciónB/opciónC}: se muestra como un desplegable con
 *    esas opciones; el docente elige una al usar la plantilla.
 *
 * Cualquier otro {hueco} sin "/" se trata como un campo de texto libre que
 * el docente puede rellenar (por si quiere añadir variantes propias).
 */

export type TemplateToken =
  | { type: 'text'; value: string }
  | { type: 'name' }
  | { type: 'choice'; label: string; options: string[] }
  | { type: 'freeText'; label: string };

const TOKEN_RE = /\{([^}]+)\}/g;

export function parseCommentTemplate(text: string): TemplateToken[] {
  const tokens: TemplateToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    const raw = match[1].trim();
    if (raw.toLowerCase() === 'nombre') {
      tokens.push({ type: 'name' });
    } else if (raw.includes(':') && raw.split(':')[1]?.includes('/')) {
      const [label, optionsRaw] = raw.split(':');
      const options = optionsRaw.split('/').map((o) => o.trim()).filter(Boolean);
      tokens.push({ type: 'choice', label: label.trim(), options });
    } else {
      tokens.push({ type: 'freeText', label: raw });
    }
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return tokens;
}

/** Renderiza el texto final sustituyendo cada hueco por el valor elegido. */
export function renderCommentTemplate(
  tokens: TemplateToken[],
  studentName: string,
  values: Record<number, string>
): string {
  return tokens
    .map((token, i) => {
      if (token.type === 'text') return token.value;
      if (token.type === 'name') return studentName;
      return values[i] ?? '';
    })
    .join('');
}
