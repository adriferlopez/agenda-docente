import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, TabStopType, TabStopPosition,
} from 'docx';

export type ExamLetterStyle = 'normal' | 'uppercase' | 'cursive' | 'print';

// Fuentes elegidas para cada estilo. "cursive" e "print" son nombres de
// fuentes reales usadas habitualmente en centros educativos para primeros
// cursos de primaria y adaptaciones (letra ligada/imprenta), pero Word solo
// las mostrará así si esa fuente está instalada en el ordenador donde se
// abra el documento; si no lo está, Word la sustituye automáticamente por
// una fuente por defecto sin avisar.
const FONT_BY_STYLE: Record<ExamLetterStyle, { font: string; size: number }> = {
  normal: { font: 'Calibri', size: 22 }, // 11pt
  uppercase: { font: 'Calibri', size: 22 },
  cursive: { font: 'Escolar 1', size: 30 }, // 15pt, letra ligada infantil
  print: { font: 'Verdana', size: 28 }, // 14pt, letra de imprenta clara y grande
};

const LIGHT_BORDER = { style: BorderStyle.SINGLE, size: 4, color: 'C9C2B8' };
const CELL_BORDERS = { top: LIGHT_BORDER, bottom: LIGHT_BORDER, left: LIGHT_BORDER, right: LIGHT_BORDER };

function textParagraph(text: string, style: { font: string; size: number }): Paragraph {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, font: style.font, size: style.size })],
  });
}

/** Una pregunta numerada, encuadrada en una tabla de una celda con borde
 * suave — visualmente separa cada pregunta y dija espacio de respuesta
 * debajo, en vez de un bloque de texto corrido difícil de puntuar a mano. */
function questionBox(lines: string[], style: { font: string; size: number }): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: CELL_BORDERS,
            margins: { top: 160, bottom: 160, left: 160, right: 160 },
            children: lines.map((line) => textParagraph(line, style)),
          }),
        ],
      }),
    ],
  });
}

/** Convierte el markdown ligero devuelto por Profi (## títulos, "[Imagen: ...]"
 * y preguntas numeradas "1. ...") en bloques de Word: cabeceras normales,
 * y cada pregunta numerada en su propia caja con borde. */
function statementToBlocks(statement: string, style: { font: string; size: number }): (Paragraph | Table)[] {
  const lines = statement.split('\n').map((l) => l.trim());
  const blocks: (Paragraph | Table)[] = [];
  let currentQuestion: string[] = [];

  function flushQuestion() {
    if (currentQuestion.length > 0) {
      blocks.push(questionBox(currentQuestion, style));
      blocks.push(new Paragraph({ spacing: { after: 160 }, children: [] }));
      currentQuestion = [];
    }
  }

  for (const line of lines) {
    if (!line) continue;
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      flushQuestion();
      blocks.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 160 },
          children: [new TextRun({ text: heading[1], font: style.font, bold: true, size: style.size + 4 })],
        })
      );
      continue;
    }
    const isNewQuestion = /^\d+[.)]\s/.test(line);
    if (isNewQuestion) {
      flushQuestion();
      currentQuestion.push(line);
    } else if (currentQuestion.length > 0) {
      // Continuación de la pregunta actual (p.ej. una línea "[Imagen: ...]"
      // o una segunda línea del enunciado).
      currentQuestion.push(line);
    } else {
      // Texto suelto antes de la primera pregunta (instrucciones generales).
      blocks.push(textParagraph(line, style));
    }
  }
  flushQuestion();
  return blocks;
}

/** Cabecera con hueco para que el alumno rellene su nombre, grupo y la
 * fecha, alineada con tabulaciones para que quede en una sola línea. */
function studentHeaderParagraph(style: { font: string; size: number }): Paragraph {
  return new Paragraph({
    spacing: { after: 120 },
    tabStops: [
      { type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 },
    ],
    children: [
      new TextRun({ text: 'Nom i cognoms: ______________________________', font: style.font, size: style.size - 2 }),
      new TextRun({ text: '\tData: __________', font: style.font, size: style.size - 2 }),
    ],
  });
}

function dividerParagraph(): Paragraph {
  return new Paragraph({
    spacing: { after: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'C9C2B8', space: 4 } },
    children: [],
  });
}

export async function buildExamDocx(input: {
  title: string;
  statement: string;
  letterStyle: ExamLetterStyle;
}): Promise<Blob> {
  const style = FONT_BY_STYLE[input.letterStyle];
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({ text: input.title, font: style.font, bold: true, size: style.size + 10 })],
          }),
          studentHeaderParagraph(style),
          dividerParagraph(),
          ...statementToBlocks(input.statement, style),
        ],
      },
    ],
  });
  return Packer.toBlob(doc);
}

/** Descarga un Blob con el nombre de archivo dado, sin dependencias extra. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
