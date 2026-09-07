import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import nodemailer from 'nodemailer';
import { encryptApiKey } from './crypto.js';
import { generateText, generateTextWithPdf, languageName, subjectLabel } from './gemini.js';

initializeApp();

const REGION = 'europe-west1';

// Secreto de Cloud Functions: clave maestra para cifrar/descifrar las claves
// de Gemini de cada usuario. Se configura una vez con:
//   firebase functions:secrets:set GEMINI_ENCRYPTION_KEY
const geminiEncryptionKey = defineSecret('GEMINI_ENCRYPTION_KEY');

// Secretos para el envío de incidencias/sugerencias por correo. Ninguno de
// los tres valores vive en el código ni en el repositorio: se configuran una
// única vez desde la terminal con `firebase functions:secrets:set NOMBRE` y
// quedan guardados de forma cifrada en Google Secret Manager. El código solo
// referencia el NOMBRE del secreto, nunca la dirección de correo real.
const reportEmailUser = defineSecret('REPORT_EMAIL_USER');
const reportEmailPass = defineSecret('REPORT_EMAIL_PASS');
const reportEmailTo = defineSecret('REPORT_EMAIL_TO');

function requireAuth(uid: string | undefined): string {
  if (!uid) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  }
  return uid;
}

// ---------------------------------------------------------------------
// Gestión de la clave de Gemini del usuario
// ---------------------------------------------------------------------

export const saveGeminiApiKey = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const apiKey = String(request.data?.apiKey ?? '').trim();

    if (!apiKey) {
      throw new HttpsError('invalid-argument', 'La clave de la API no puede estar vacía.');
    }

    const encrypted = encryptApiKey(apiKey);
    const db = getFirestore();
    await db.collection('users').doc(uid).set(
      {
        geminiApiKeyEncrypted: encrypted,
        hasGeminiKey: true,
      },
      { merge: true }
    );

    return { ok: true };
  }
);

export const removeGeminiApiKey = onCall({ region: REGION, enforceAppCheck: false }, async (request) => {
  const uid = requireAuth(request.auth?.uid);
  const db = getFirestore();
  await db.collection('users').doc(uid).set(
    {
      geminiApiKeyEncrypted: null,
      hasGeminiKey: false,
    },
    { merge: true }
  );
  return { ok: true };
});

// ---------------------------------------------------------------------
// Sugerencias de mejora para la programación semanal
// ---------------------------------------------------------------------

interface GenerateWeeklySuggestionsInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  postClassEvaluation: string;
  language: string;
}

export const generateWeeklySuggestions = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateWeeklySuggestionsInput;

    const prompt = `Eres un asesor pedagógico experto que ayuda a un docente a reflexionar sobre una sesión de clase ya impartida.

Asignatura: ${subjectLabel(input.subjectName, input.courseLevel)}
Actividad: ${input.activityTitle}
Descripción de la actividad: ${input.description}
Evaluación posterior del docente: ${input.postClassEvaluation}

Responde en ${languageName(input.language)}, en un tono cercano y profesional.
Da entre 2 y 4 sugerencias concretas y breves (en formato de lista, sin numerar) para mejorar esta actividad de cara al próximo curso, teniendo en cuenta la evaluación del docente. No repitas la información ya dada, céntrate en propuestas de mejora accionables.`;

    const suggestions = await generateText(uid, prompt);
    return { suggestions };
  }
);

// ---------------------------------------------------------------------
// Generación de objetivos de aprendizaje para la programación anual
// ---------------------------------------------------------------------

interface GenerateObjectivesInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  language: string;
}

export const generateActivityObjectives = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateObjectivesInput;

    const prompt = `Eres un experto en diseño curricular educativo.

Asignatura: ${subjectLabel(input.subjectName, input.courseLevel)}
Actividad: ${input.activityTitle}
Descripción: ${input.description}

Responde en ${languageName(input.language)}.
Redacta entre 2 y 3 objetivos de aprendizaje claros y concisos para esta actividad, adecuados al nivel educativo indicado. Sepáralos con saltos de línea, sin numerar ni usar viñetas, usando un lenguaje propio de una programación didáctica.`;

    const objectives = await generateText(uid, prompt);
    return { objectives };
  }
);

// ---------------------------------------------------------------------
// Asignación de saberes del currículum a una actividad
// ---------------------------------------------------------------------

interface MatchCurriculumInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  curriculumItems: { id: string; code: string; description: string }[];
  language: string;
}

export const matchCurriculumItems = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as MatchCurriculumInput;

    if (!input.curriculumItems?.length) {
      return { curriculumItemIds: [] };
    }

    const itemsList = input.curriculumItems
      .map((item, i) => `${i + 1}. [id=${item.id}] ${item.code ? item.code + ' — ' : ''}${item.description}`)
      .join('\n');

    const prompt = `Eres un experto en diseño curricular educativo.

Asignatura: ${subjectLabel(input.subjectName, input.courseLevel)}
Actividad: ${input.activityTitle}
Descripción de la actividad: ${input.description}

Lista de saberes/contenidos del currículum disponibles:
${itemsList}

Identifica cuáles de estos saberes (entre 1 y 4 como máximo) están más relacionados con la actividad descrita.
Responde ÚNICAMENTE con un JSON válido de la forma {"ids": ["id1", "id2"]}, usando exactamente los valores "id" indicados entre corchetes en la lista. No incluyas explicaciones ni texto adicional, ni bloques de código markdown.`;

    const raw = await generateText(uid, prompt);

    let ids: string[] = [];
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed.ids)) {
        const validIds = new Set(input.curriculumItems.map((i) => i.id));
        ids = parsed.ids.filter((id: unknown): id is string => typeof id === 'string' && validIds.has(id));
      }
    } catch {
      ids = [];
    }

    return { curriculumItemIds: ids };
  }
);

// ---------------------------------------------------------------------
// Situaciones de Aprendizaje (programación anual): objetivos generales
// adaptados de la PGA, y metodología/recursos a partir de las sesiones.
// ---------------------------------------------------------------------

interface SaSessionInput {
  title: string;
  description: string;
}

interface GenerateSaObjectivesInput {
  subjectName: string;
  courseLevel?: string;
  saName: string;
  sessions: SaSessionInput[];
  pgaObjectives?: string;
  language: string;
}

export const generateSaObjectives = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateSaObjectivesInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const sessionsList = (input.sessions ?? [])
      .map((s, i) => `${i + 1}. ${s.title}${s.description ? ' — ' + s.description : ''}`)
      .join('\n') || '(sin sesiones descritas)';

    const prompt = input.pgaObjectives?.trim()
      ? `Eres un experto en diseño curricular educativo. Un docente de ${subject} tiene esta lista de objetivos didácticos generales de su Programación General Anual (PGA):

${input.pgaObjectives.trim()}

Ahora quiere los objetivos didácticos concretos de la Situación de Aprendizaje "${input.saName}", que incluye estas sesiones:
${sessionsList}

Elige y adapta (reformulando si hace falta, sin inventar objetivos ajenos a la lista) los objetivos de la PGA que de verdad encajan con estas sesiones. Responde en ${lang}. Devuelve entre 2 y 5 objetivos, uno por línea, sin numerar ni usar viñetas.`
      : `Eres un experto en diseño curricular educativo. Redacta los objetivos didácticos de la Situación de Aprendizaje "${input.saName}" de ${subject}, que incluye estas sesiones:
${sessionsList}

Responde en ${lang}. Redacta entre 2 y 5 objetivos de aprendizaje claros y concisos, uno por línea, sin numerar ni usar viñetas, con el lenguaje propio de una programación didáctica.`;

    const objectives = await generateText(uid, prompt);
    return { objectives };
  }
);

interface GenerateSaMethodologyResourcesInput {
  subjectName: string;
  courseLevel?: string;
  saName: string;
  sessions: SaSessionInput[];
  language: string;
}

export const generateSaMethodologyResources = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateSaMethodologyResourcesInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const sessionsList = (input.sessions ?? [])
      .map((s, i) => `${i + 1}. ${s.title}${s.description ? ' — ' + s.description : ''}`)
      .join('\n') || '(sin sesiones descritas)';

    const prompt = `Eres un experto en diseño curricular educativo. A partir de las sesiones de la Situación de Aprendizaje "${input.saName}" de ${subject}:
${sessionsList}

Redacta:
1. "methodology": un párrafo breve (3-5 frases) describiendo la metodología didáctica empleada en esta SA (tipo de agrupamientos, dinámicas, enfoque), deducida de las sesiones descritas.
2. "resources": una lista de los recursos/materiales necesarios para esta SA, deducidos de las sesiones descritas (uno por línea, sin numerar ni viñetas).

Responde en ${lang}. Responde ÚNICAMENTE con un JSON válido de la forma {"methodology": "...", "resources": "..."}, sin texto adicional ni bloques de código markdown.`;

    const raw = await generateText(uid, prompt);
    try {
      const parsed = parseJsonResponse<{ methodology?: string; resources?: string }>(raw);
      return {
        methodology: typeof parsed.methodology === 'string' ? parsed.methodology : '',
        resources: typeof parsed.resources === 'string' ? parsed.resources : '',
      };
    } catch {
      throw new HttpsError('internal', `No se pudo interpretar la respuesta generada: ${raw.slice(0, 200)}`);
    }
  }
);

// Saberes/contenidos y criteris d'avaluació de una SA, a partir de las
// sesiones ya planificadas (con los ajustes que haya hecho el docente) y de
// las Competències Específiques trabajadas. Se le pasa siempre el catálogo
// oficial de saberes de la asignatura cuando está disponible, para que la IA
// elija y adapte de ahí en vez de inventar contenidos.

interface SaCompetencyInput {
  id: string;
  title: string;
  description: string;
  criteris: string[];
}

interface SaberCatalogItem {
  code: string;
  description: string;
}

interface GenerateSaSabersCriteriaInput {
  subjectName: string;
  courseLevel?: string;
  saName: string;
  sessions: SaSessionInput[];
  competencies: SaCompetencyInput[];
  sabersCatalog?: SaberCatalogItem[];
  language: string;
}

export const generateSaSabersCriteria = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateSaSabersCriteriaInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const sessionsList = (input.sessions ?? [])
      .map((s, i) => `${i + 1}. ${s.title}${s.description ? ' — ' + s.description : ''}`)
      .join('\n') || '(sin sesiones descritas)';

    const competencies = Array.isArray(input.competencies) ? input.competencies : [];
    const ceList = competencies.length > 0
      ? competencies
          .map((ce) => {
            const criteris = ce.criteris.length > 0 ? ce.criteris.map((c) => `   - ${c}`).join('\n') : '   (sin criterios diferenciados)';
            return `${ce.id}. ${ce.title}\n   ${ce.description}\nCriteris d'avaluació oficials:\n${criteris}`;
          })
          .join('\n\n')
      : '(sin CE seleccionadas)';

    const sabersCatalog = Array.isArray(input.sabersCatalog) ? input.sabersCatalog : [];
    const sabersCatalogList = sabersCatalog.length > 0
      ? sabersCatalog.map((s) => `- [${s.code}] ${s.description}`).join('\n')
      : '';

    const prompt = `Eres un experto en diseño curricular educativo. A partir de la Situación de Aprendizaje "${input.saName}" de ${subject}, con estas sesiones ya planificadas (incluyendo los ajustes que haya hecho el docente):
${sessionsList}

Y estas Competències Específiques (CE) trabajadas, con sus criteris d'avaluació oficials:
${ceList}
${sabersCatalogList ? `\nCATÁLOGO OFICIAL DE SABERES/CONTENIDOS DE ESTA ASIGNATURA Y CURSO (no inventes contenidos fuera de esta lista; elige y adapta solo los que encajen de verdad con las sesiones descritas):\n${sabersCatalogList}\n` : ''}
Redacta:
1. "sabers": los saberes/contenidos curriculares que se trabajan de verdad en esta SA según las sesiones descritas${sabersCatalogList ? ', seleccionados y adaptados ÚNICAMENTE del catálogo oficial de arriba (no inventes otros)' : ''} (uno por línea, sin numerar ni usar viñetas).
2. "criteria": los criteris d'avaluació que se aplican en esta SA, adaptando (sin copiar literalmente) los criteris oficiales de las CE de arriba al contexto concreto de estas sesiones (uno por línea, sin numerar ni usar viñetas, indicando entre paréntesis a qué CE corresponde cada uno).

Responde en ${lang}. Responde ÚNICAMENTE con un JSON válido de la forma {"sabers": "...", "criteria": "..."}, sin texto adicional ni bloques de código markdown.`;

    const raw = await generateText(uid, prompt);
    try {
      const parsed = parseJsonResponse<{ sabers?: string; criteria?: string }>(raw);
      return {
        sabers: typeof parsed.sabers === 'string' ? parsed.sabers : '',
        criteria: typeof parsed.criteria === 'string' ? parsed.criteria : '',
      };
    } catch {
      throw new HttpsError('internal', `No se pudo interpretar la respuesta generada: ${raw.slice(0, 200)}`);
    }
  }
);

// ---------------------------------------------------------------------
// Corrector ortográfico
// ---------------------------------------------------------------------

interface SpellcheckInput {
  text: string;
  language: string;
}

export const spellcheckText = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as SpellcheckInput;

    if (!input.text?.trim()) {
      return { corrected: input.text ?? '', hasErrors: false };
    }

    const prompt = `Corrige únicamente la ortografía y la gramática del siguiente texto en ${languageName(input.language)}, sin cambiar el estilo, el tono ni el significado, y sin añadir comentarios.

Texto:
"""
${input.text}
"""

Responde ÚNICAMENTE con un JSON válido de la forma {"corrected": "...", "hasErrors": true|false}, sin bloques de código markdown ni texto adicional.`;

    const raw = await generateText(uid, prompt);

    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        corrected: typeof parsed.corrected === 'string' ? parsed.corrected : input.text,
        hasErrors: Boolean(parsed.hasErrors),
      };
    } catch {
      return { corrected: input.text, hasErrors: false };
    }
  }
);

// ---------------------------------------------------------------------
// Resumen de reuniones con IA
// ---------------------------------------------------------------------

interface SummarizeMeetingInput {
  title: string;
  notes: string;
  // Texto pegado por el docente (transcripción, contenido de un documento...)
  summarySourceText: string;
  language: string;
}

export const summarizeMeeting = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as SummarizeMeetingInput;

    const prompt = `Eres un asistente que ayuda a un docente a organizar las notas de una reunión de centro educativo.

Título de la reunión: ${input.title}

Notas del docente:
"""
${input.notes || '(sin notas escritas)'}
"""

Texto adicional proporcionado por el docente (transcripción, documento, etc.):
"""
${input.summarySourceText || '(sin texto adicional)'}
"""

Responde en ${languageName(input.language)}.
Redacta un resumen claro y conciso de los puntos más importantes tratados en la reunión, organizado en una lista breve (sin numerar, usando saltos de línea). Si hay tareas o acuerdos pendientes, destácalos al final bajo un apartado corto. No inventes información que no esté en las notas o el texto proporcionado.`;

    const summary = await generateText(uid, prompt);
    return { summary };
  }
);

// ---------------------------------------------------------------------
// Parseo de horario desde texto (extraído de un .docx)
// ---------------------------------------------------------------------

interface ParseTimetableInput {
  text: string; // texto extraído del Word
  language: string;
}

interface TimetableSlotParsed {
  day: number; // 0=Lunes, 1=Martes, 2=Miércoles, 3=Jueves, 4=Viernes
  startTime: string; // "08:30"
  endTime: string; // "09:25"
  subjectName: string; // "Matemáticas"
  group: string; // "3ºA" o "" si no se detecta
  room?: string;
}

interface ParseTimetableOutput {
  slots: TimetableSlotParsed[];
}

// Nueva función que parsea Word/Excel directamente sin Gemini
interface ParseTimetableFileInput {
  fileBase64: string;
  fileType: 'docx' | 'xlsx' | 'xls' | 'csv';
}

export const parseTimetableFile = onCall(
  { region: REGION, enforceAppCheck: false, timeoutSeconds: 120 },
  async (request) => {
    requireAuth(request.auth?.uid);
    const input = request.data as ParseTimetableFileInput;

    const ALLOWED_FILE_TYPES = ['docx', 'xlsx', 'xls', 'csv'];
    if (!ALLOWED_FILE_TYPES.includes(input.fileType)) {
      throw new HttpsError('invalid-argument', 'Tipo de archivo no soportado.');
    }
    // Límite defensivo: un horario real ocupa pocos KB. Sin esto, un
    // cliente podría mandar un archivo enorme (o pensado para explotar el
    // parser de Excel/Word) y agotar la memoria de la función.
    if (!input.fileBase64 || input.fileBase64.length > 15 * 1024 * 1024) {
      throw new HttpsError('invalid-argument', 'El archivo es demasiado grande (máximo ~10 MB).');
    }

    const buffer = Buffer.from(input.fileBase64, 'base64');
    const { parseWordTimetable, parseExcelTimetable } = await import('./timetableParser.js');

    let slots;
    if (input.fileType === 'docx') {
      slots = await parseWordTimetable(buffer);
    } else {
      slots = await parseExcelTimetable(buffer);
    }

    return { slots };
  }
);

export const parseTimetableFromText = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 300 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as ParseTimetableInput;

    const prompt = `Interpreta este horario escolar. Es una tabla donde las columnas están separadas por |.
La primera columna es la HORA. Las siguientes columnas son los días en orden: Lunes(0), Martes(1), Miércoles(2), Jueves(3), Viernes(4).
La primera fila suele ser la cabecera con los nombres de los días.

Convenciones del formato:
- "---" = celda vacía (no hay clase ese día en esa franja)
- "=" = esa columna es continuación de la celda anterior (colspan), usa el mismo contenido
- Ignora filas donde la hora sea "---" o no tenga formato de hora

TABLA:
${input.text}

Reglas:
- Crea una entrada por cada celda con asignatura real (no "---", no "=", no vacíos, no recreos/Esbarjo/Patio, no "No lectiva")
- La posición de la columna determina el día, NO el contenido de la celda
- Horas: cualquier formato ("8.30 a 9.15", "08:30-09:25", "8h30") → HH:MM
- Extrae grupo si viene junto al nombre (ej "Castellà 1r B" → subjectName:"Castellà", group:"1r B")
- Si una celda tiene varias asignaturas, crea una entrada por cada una

Devuelve SOLO este JSON sin texto extra:
{"slots":[{"day":0,"startTime":"08:30","endTime":"09:15","subjectName":"Castellà","group":"1r B","room":""}]}`;

    const raw = await generateText(uid, prompt);

    try {
      const clean = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean) as ParseTimetableOutput;
      return parsed;
    } catch {
      throw new Error(`No se pudo parsear la respuesta de Gemini: ${raw.slice(0, 200)}`);
    }
  }
);

// ---------------------------------------------------------------------
// Profi — Asistente docente con IA
// ---------------------------------------------------------------------

interface ProfiMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ProfiInput {
  messages: ProfiMessage[]; // historial completo de la conversación
  language: string;
}

export const profiChat = onCall(
  // El cliente (ver src/services/ai.ts, profiChat) espera como máximo 110s
  // antes de darlo por fallido: se deja el límite del servidor un poco por
  // debajo (100s) para que sea la propia función la que responda con un
  // error claro si Gemini tarda demasiado, en vez de que el cliente corte
  // la conexión primero y el docente vea "ha ocurrido un error" sin más
  // explicación mientras el cálculo sigue (y se tira) en el servidor.
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 100 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as ProfiInput;

    // Limitamos el historial que aceptamos del cliente: sin esto, un
    // cliente podría mandar cientos de mensajes larguísimos en cada
    // llamada y disparar el coste/tiempo de cada petición a Gemini.
    if (!Array.isArray(input.messages) || input.messages.length === 0) {
      throw new HttpsError('invalid-argument', 'Falta el mensaje.');
    }
    if (input.messages.length > 40) {
      throw new HttpsError('invalid-argument', 'La conversación es demasiado larga. Empieza una nueva.');
    }
    for (const m of input.messages) {
      if (typeof m.content !== 'string' || m.content.length > 8000) {
        throw new HttpsError('invalid-argument', 'Uno de los mensajes es demasiado largo.');
      }
    }

    const lang = languageName(input.language);

    // Sistema de prompt: personalidad de Profi
    const systemPrompt = `Eres Profi, el asistente de inteligencia artificial de Agenda Docente, una app para docentes de habla hispana (y también catalana, vasca y gallega).

Tu personalidad:
- Eres un colega docente experimentado, cercano y práctico. No eres un robot formal.
- Hablas de tú, con naturalidad y buen humor cuando toca, pero siempre siendo útil.
- Eres concreto: das ejemplos reales, duraciones exactas, actividades detalladas.
- Nunca inventas información curricular; si no sabes algo, lo reconoces y ofreces alternativas.
- Respondes siempre en ${lang}, independientemente del idioma en que te escriban.

Tus especialidades:
1. **Ideas de clase**: cuando te pidan una idea de clase, preguntas por el curso, asignatura y tema si no te lo han dado, y luego generas una propuesta completa con: duración total, objetivos, materiales, secuencia de actividades (inicio, desarrollo, cierre) con tiempos, y sugerencias de evaluación.
2. **Frases para alumnos**: generás frases motivadoras, de feedback, de instrucción o de cierre adaptadas a la asignatura y nivel indicados. Las presentas en una lista clara y lista para copiar.
3. **Planificador de unidad didáctica**: cuando te lo pidan, estructuras una unidad completa con temporalización, sesiones, competencias y criterios de evaluación orientativos.
4. **Generador de exámenes/actividades de evaluación**: creas pruebas, rúbricas simples o actividades de evaluación adaptadas al nivel y tema indicados.
5. **Consulta docente general**: respondes cualquier pregunta relacionada con la práctica docente, gestión de aula, metodologías, normativa educativa general, etc.

Límite de tema muy importante: SOLO respondes preguntas relacionadas con la docencia, la educación o el trabajo de un profesor (clases, alumnado, currículum, evaluación, organización del aula, normativa educativa, herramientas de la propia app, etc.). Si te preguntan algo que no tiene relación con esto (por ejemplo noticias, deportes, precios, cultura general, programación, temas personales...), NO respondas la pregunta: responde únicamente, en ${lang}, que solo puedes ayudar con temas relacionados con la docencia y que reformulen su consulta si tiene que ver con su trabajo como docente. No hagas ninguna excepción aunque insistan o lo pidan de otra manera.

Formato de respuesta: usa markdown ligero (negritas, listas, títulos con ##). Sé conciso pero completo.`;

    // Construir el prompt completo con historial
    const historyText = input.messages
      .slice(0, -1) // todos menos el último (que es el mensaje actual)
      .map((m) => `${m.role === 'user' ? 'Docente' : 'Profi'}: ${m.content}`)
      .join('\n\n');

    const lastMessage = input.messages[input.messages.length - 1];
    const fullPrompt = `${systemPrompt}

${historyText ? `\n--- Conversación hasta ahora ---\n${historyText}\n\n---` : ''}

Docente: ${lastMessage?.content ?? ''}

Profi:`;

    // Chat conversacional: se desactiva el "thinking" del modelo (no hace
    // falta razonamiento profundo para responder o redactar una propuesta
    // de clase) y se acota la longitud de salida, para responder más rápido
    // y evitar acercarse al límite de tiempo de la llamada.
    const reply = await generateText(uid, fullPrompt, {
      thinkingConfig: { thinkingBudget: 0 },
      maxOutputTokens: 4096,
    });
    return { reply };
  }
);

// ─── Generar rúbrica personalizada desde saberes curriculares ──────────

interface CompetencyInput {
  id: string; // "CE1"
  title: string;
  description: string;
  criteris: string[]; // criteris d'avaluació d'aquesta CE per al curs de l'activitat
}

interface GenerateRubricInput {
  subjectName: string;
  courseLevel?: string;
  activityDescription: string; // qué tipo de actividad va a realizar
  curriculumItems: string[];   // saberes/contenidos de la asignatura (legado)
  competencies?: CompetencyInput[]; // Competències Específiques + Criteris d'Avaluació disponibles
  language: string;
}

interface GeneratedCriterion {
  name: string;
  description: string;
  weight: number;
  indicators: [string, string, string, string];
  ceId?: string; // CE de la qual deriva aquest criteri; el asigna el servidor por posición, no la IA (ver generateRubricFromCompetencies).
  ref?: number; // legado, ya no se usa para el matching pero se mantiene por compatibilidad de tipos con el cliente.
}

interface GenerateRubricOutput {
  rubricName: string;
  criteria: GeneratedCriterion[];
}

function normalizeWeights(criteria: GeneratedCriterion[]) {
  const totalWeight = criteria.reduce((s, c) => s + (c.weight || 0), 0);
  if (Math.abs(totalWeight - 100) > 5) {
    const equal = Math.floor(100 / criteria.length);
    criteria.forEach((c, i) => {
      c.weight = i === 0 ? 100 - equal * (criteria.length - 1) : equal;
    });
  }
}

function parseJsonResponse<T>(raw: string): T {
  const clean = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(clean) as T;
}

/**
 * Genera la rúbrica a partir de Competències Específiques en DOS pasos, en vez
 * de pedirle a la IA en una sola llamada que elija las CE Y que además
 * "recuerde" repetir su identificador en cada criterio (poco fiable: los
 * modelos tienden a omitir ese campo "extra" en respuestas JSON largas).
 * Paso 1: la IA solo decide QUÉ competencias (por número de posición) encajan.
 * Paso 2: generamos el criterio de cada competencia elegida, en el mismo
 * orden — así el servidor asigna el "ceId" de cada criterio él mismo, sin
 * depender de que la IA lo repita correctamente.
 */
async function generateRubricFromCompetencies(
  uid: string,
  input: GenerateRubricInput,
  subject: string,
  lang: string
): Promise<GenerateRubricOutput> {
  const competencies = input.competencies!;

  // Paso 1: elegir qué CE encajan con la actividad.
  const selectionList = competencies
    .map((ce, idx) => `[${idx + 1}] ${ce.id}. ${ce.title}\n   ${ce.description}`)
    .join('\n\n');

  const selectPrompt = `Eres Profi, asistente docente experto en evaluación educativa basada en el currículum competencial (Decret 175/2022, Catalunya).

ASIGNATURA: ${subject}
ACTIVIDAD: ${input.activityDescription}

COMPETÈNCIES ESPECÍFIQUES (CE) DISPONIBLES:
${selectionList}

Identifica cuáles de estas competencias (normalmente entre 1 y 3, no todas salvo que la actividad sea muy transversal) encajan mejor con la actividad descrita.
Responde ÚNICAMENTE con un JSON válido de la forma {"refs": [n, n]}, usando los números entre corchetes de la lista de arriba. Sin texto adicional ni bloques de código markdown.`;

  const rawSelect = await generateText(uid, selectPrompt);
  let refs: number[] = [];
  try {
    const parsed = parseJsonResponse<{ refs?: unknown }>(rawSelect);
    if (Array.isArray(parsed.refs)) {
      refs = parsed.refs.filter(
        (n): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= competencies.length
      );
    }
  } catch {
    refs = [];
  }
  if (refs.length === 0) {
    // Si la IA no devolvió nada aprovechable, usamos las primeras (hasta 3) como fallback razonable.
    refs = competencies.slice(0, Math.min(3, competencies.length)).map((_, i) => i + 1);
  }
  const selected = [...new Set(refs)].map((r) => competencies[r - 1]);

  // Paso 2: generar un criterio por cada CE seleccionada, EN ESTE MISMO ORDEN.
  const buildList = selected
    .map((ce, idx) => {
      const criterisText = ce.criteris.length > 0
        ? ce.criteris.map((c) => `   - ${c}`).join('\n')
        : '   (sin criterios diferenciados)';
      return `${idx + 1}) ${ce.id}. ${ce.title}\n   ${ce.description}\nCriteris d'avaluació:\n${criterisText}`;
    })
    .join('\n\n');

  const buildPrompt = `Eres Profi, asistente docente experto en evaluación educativa basada en el currículum competencial (Decret 175/2022, Catalunya).

El docente quiere crear una rúbrica personalizada para evaluar la siguiente actividad:

ASIGNATURA: ${subject}
ACTIVIDAD: ${input.activityDescription}

Ya se han seleccionado estas Competències Específiques como las más relevantes para la actividad. Crea EXACTAMENTE un criterio de evaluación por cada una, EN ESTE MISMO ORDEN:

${buildList}

Para cada criterio:
- Adapta los "criteris d'avaluació" oficiales de esa CE al contexto específico de esta actividad (no los copies literalmente: concrétalos para lo que el alumnado hará).
- Incluye 4 indicadores (niveles 1 a 4): Insuficiente, Suficiente/Bien, Notable, Excelente.
- Los pesos de todos los criterios deben sumar exactamente 100.

Responde ÚNICAMENTE con este JSON (sin texto adicional, sin markdown). El array "criteria" debe tener EXACTAMENTE ${selected.length} elementos, en el mismo orden que la lista de arriba:
{
  "rubricName": "Nombre descriptivo de la rúbrica",
  "criteria": [
    {
      "name": "Nombre del criterio",
      "description": "Descripción breve adaptada a la actividad",
      "weight": 25,
      "indicators": [
        "Nivel 1 — Insuficiente: descripción",
        "Nivel 2 — Suficiente/Bien: descripción",
        "Nivel 3 — Notable: descripción",
        "Nivel 4 — Excelente: descripción"
      ]
    }
  ]
}

Responde en ${lang}.`;

  const rawBuild = await generateText(uid, buildPrompt);
  const parsedBuild = parseJsonResponse<GenerateRubricOutput>(rawBuild);

  // El "ceId" lo asigna el servidor por posición (garantizado correcto), no la IA.
  const criteria: GeneratedCriterion[] = selected.map((ce, i) => {
    const c = parsedBuild.criteria[i];
    return {
      name: c?.name ?? ce.title,
      description: c?.description ?? ce.description,
      weight: c?.weight ?? 0,
      indicators: c?.indicators ?? ['', '', '', ''],
      ceId: ce.id,
    };
  });
  normalizeWeights(criteria);

  return {
    rubricName: parsedBuild.rubricName || `Rúbrica — ${subject}`,
    criteria,
  };
}

async function generateRubricFromSabers(
  uid: string,
  input: GenerateRubricInput,
  subject: string,
  lang: string
): Promise<GenerateRubricOutput> {
  const curriculumText = input.curriculumItems?.length > 0
    ? input.curriculumItems.map((item, i) => `${i + 1}. ${item}`).join('\n')
    : '(Sin saberes/contenidos cargados)';

  const prompt = `Eres Profi, asistente docente experto en evaluación educativa basada en la LOMLOE.

El docente quiere crear una rúbrica personalizada para evaluar la siguiente actividad:

ASIGNATURA: ${subject}
ACTIVIDAD: ${input.activityDescription}

SABERES/CRITERIOS CURRICULARES DE LA ASIGNATURA:
${curriculumText}

Tu tarea:
1. Selecciona los saberes más relevantes para esta actividad concreta.
2. Crea una rúbrica con 3-5 criterios de evaluación derivados de esos saberes.
3. Cada criterio debe tener 4 indicadores (niveles 1 a 4): Insuficiente, Suficiente/Bien, Notable, Excelente.
4. Los pesos deben sumar exactamente 100.
5. Sé concreto y práctico — el docente usará esta rúbrica directamente en clase.

Responde SOLO con este JSON (sin texto adicional, sin markdown):
{
  "rubricName": "Nombre descriptivo de la rúbrica",
  "criteria": [
    {
      "name": "Nombre del criterio",
      "description": "Descripción breve",
      "weight": 25,
      "indicators": [
        "Nivel 1 — Insuficiente: descripción",
        "Nivel 2 — Suficiente/Bien: descripción",
        "Nivel 3 — Notable: descripción",
        "Nivel 4 — Excelente: descripción"
      ]
    }
  ]
}

Responde en ${lang}.`;

  const raw = await generateText(uid, prompt);
  const parsed = parseJsonResponse<GenerateRubricOutput>(raw);
  normalizeWeights(parsed.criteria);
  return parsed;
}

export const generateRubricFromCurriculum = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 120 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateRubricInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const hasCompetencies = Array.isArray(input.competencies) && input.competencies.length > 0;

    try {
      return hasCompetencies
        ? await generateRubricFromCompetencies(uid, input, subject, lang)
        : await generateRubricFromSabers(uid, input, subject, lang);
    } catch (err) {
      // Importante: los errores lanzados como `new Error(...)` normal (sin
      // HttpsError) llegan al cliente como un "internal" genérico y sin
      // mensaje — Cloud Functions oculta el mensaje real por seguridad salvo
      // que se use HttpsError explícitamente. Con HttpsError sí llega el
      // motivo real (p.ej. que Gemini no devolvió un JSON válido).
      if (err instanceof HttpsError) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      throw new HttpsError('internal', `No se pudo generar la rúbrica: ${msg.slice(0, 200)}`);
    }
  }
);

// ---------------------------------------------------------------------
// Comentario de nota personalizado con Profi (informe escolar)
// ---------------------------------------------------------------------

interface PriorityCeInput {
  id: string;
  title: string;
  description: string;
}

interface GenerateGradeCommentInput {
  studentName: string;
  subjectName: string;
  courseLevel?: string;
  gradeDescription: string; // p.ej. "7,5 sobre 10" o "Assoliment notable (AN)"
  priorityCe?: PriorityCeInput[];
  extraDetails?: string;
  language: string;
}

export const generateGradeComment = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 60 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateGradeCommentInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);

    const ceText = input.priorityCe && input.priorityCe.length > 0
      ? `\n\nCompetències Específiques que el docente quiere que priorices especialmente en el comentario:\n${input.priorityCe
          .map((ce) => `- ${ce.id}. ${ce.title}: ${ce.description}`)
          .join('\n')}`
      : '';
    const extraText = input.extraDetails?.trim()
      ? `\n\nDetalles adicionales aportados por el docente para personalizar el comentario:\n${input.extraDetails.trim()}`
      : '';

    const prompt = `Eres Profi, el asistente de un docente, redactando un comentario de evaluación para el informe escolar de un alumno.

Alumno/a: ${input.studentName}
Asignatura: ${subject}
Nota obtenida: ${input.gradeDescription}${ceText}${extraText}

Redacta un comentario breve (máximo 2-3 líneas) en ${lang}, que:
- Empiece mencionando el nombre del alumno/a.
- Mencione 2-3 aspectos clave y concretos de su desarrollo competencial en la asignatura, coherentes con la nota obtenida${input.priorityCe && input.priorityCe.length > 0 ? ' y con las competencias específicas indicadas arriba' : ''}.
- Tenga un tono constructivo y profesional, propio de un informe escolar dirigido a las familias.
- No repita literalmente la nota numérica, ni uses corchetes, comillas ni marcadores.

Responde ÚNICAMENTE con el texto del comentario, sin explicaciones adicionales.`;

    const comment = await generateText(uid, prompt);
    return { comment: comment.trim() };
  }
);

// ---------------------------------------------------------------------
// Banco de frases por rango/nivel de nota, generado con Profi (Comentarios)
// ---------------------------------------------------------------------

interface GradeBandInput {
  min?: number;
  max?: number;
  level?: string;
}

type CommentLength = 'short' | 'medium' | 'long';

interface GenerateGradeBandPhrasesInput {
  subjectName: string;
  courseLevel?: string;
  mode: 'range' | 'qualitative';
  bands: GradeBandInput[];
  priorityCe?: PriorityCeInput[];
  length?: CommentLength;
  language: string;
}

// Descripción de longitud para el prompt, según lo que elija el docente
// (por defecto "media" si no se especifica, para no romper llamadas viejas).
function lengthInstruction(length: CommentLength | undefined): string {
  switch (length) {
    case 'short':
      return 'de 2 líneas aproximadamente (una sola frase breve y concreta)';
    case 'long':
      return 'de 4 líneas aproximadamente (varias frases con detalle suficiente)';
    case 'medium':
    default:
      return 'de 3 líneas aproximadamente (una o dos frases con algo de detalle)';
  }
}

export const generateGradeBandPhrases = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 60 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateGradeBandPhrasesInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);

    if (!input.bands || input.bands.length === 0) {
      return { texts: [] };
    }

    const bandsList = input.bands
      .map((b, i) => {
        const label = input.mode === 'qualitative' ? `Nivel ${b.level}` : `De ${b.min ?? 0} a ${b.max ?? 10}`;
        return `${i + 1}) ${label}`;
      })
      .join('\n');

    const hasCe = input.priorityCe && input.priorityCe.length > 0;
    const ceText = hasCe
      ? `\n\nEstos son los criterios de evaluación que se aplican de verdad en esta asignatura (los usa el docente en sus rúbricas) y que quiere que tengas en cuenta al redactar las frases. Cada criterio suele derivar de una Competència Específica del currículum, pero céntrate en el criterio en sí, no en la competencia teórica de la que procede:\n${input.priorityCe!
          .map((ce) => `- ${ce.title}${ce.description ? `: ${ce.description}` : ''}`)
          .join('\n')}`
      : '';

    const prompt = `Eres Profi, el asistente de un docente. Vas a redactar un banco de frases de comentario para el informe escolar de la asignatura de ${subject}.

Estas frases se usarán automáticamente en el informe de cada alumno/a según su nota final: cada franja de nota tiene su propia frase genérica, que luego el docente copiará (y podrá personalizar antes de enviarla).${ceText}

Franjas de nota para las que necesitas una frase:
${bandsList}

Para cada franja, redacta una frase ${lengthInstruction(input.length)} en ${lang}, que:
- Empiece con el marcador literal "{nombre}" (tal cual, sin traducir ni adaptar), que luego se sustituirá automáticamente por el nombre de cada alumno/a.
- Describa el nivel de desarrollo correspondiente a esa franja, coherente con su posición relativa entre el resto de franjas (las más bajas reflejan más dificultades y aspectos a mejorar; las más altas, mayor dominio y logros).
- Tenga un tono constructivo y profesional, propio de un informe escolar dirigido a las familias.
- Sea genérica (sin mencionar actividades ni notas concretas), porque se aplicará a cualquier alumno/a que caiga en esa franja.${hasCe ? `
- Haga referencia de forma natural a alguno de los criterios de evaluación listados arriba, traduciéndolo SIEMPRE a una habilidad u observación concreta y cotidiana, propia del lenguaje de un informe escolar — NUNCA menciones la palabra "competencia", "criterio de evaluación", ni ningún código o nombre técnico. Por ejemplo, en vez de "ha trabajado bien el criterio de comprensión lectora y escritora" escribe algo como "ha mejorado su nivel lectoescritor"; en vez de "domina el criterio de resolución de problemas" escribe "resuelve los problemas planteados con soltura". No hace falta mencionar todos los criterios en cada frase: elige los que mejor encajen con el nivel de esa franja concreta.` : ''}

Responde ÚNICAMENTE con un JSON válido de la forma {"texts": ["frase 1", "frase 2", ...]}, con EXACTAMENTE ${input.bands.length} elementos, en el mismo orden que la lista de franjas de arriba. Sin texto adicional ni bloques de código markdown.`;

    const raw = await generateText(uid, prompt);

    let texts: string[] = [];
    try {
      const parsed = parseJsonResponse<{ texts?: unknown }>(raw);
      if (Array.isArray(parsed.texts)) {
        texts = parsed.texts.map((t) => (typeof t === 'string' ? t : ''));
      }
    } catch {
      texts = [];
    }
    // Garantizamos exactamente una frase por franja aunque la IA se equivoque
    // en el conteo (mejor una franja vacía que romper la UI del cliente).
    while (texts.length < input.bands.length) texts.push('');
    texts = texts.slice(0, input.bands.length);

    return { texts };
  }
);

// ---------------------------------------------------------------------
// Detectar automáticamente de qué Competència Específica viene cada
// criterio de rúbrica que todavía no tiene una CE vinculada (rúbricas
// escritas a mano, de un proyecto concreto, importadas de Excel...). Así el
// banco de frases y la agrupación de columnas en Notas pueden tratarlas
// igual que las rúbricas creadas ya "desde competències".
// ---------------------------------------------------------------------

interface MatchCriteriaCompetencyInput {
  id: string;
  title: string;
  description: string;
}

interface MatchCriteriaCriterionInput {
  index: number;
  name: string;
  description?: string;
}

interface MatchCriteriaToCompetenciesInput {
  subjectName: string;
  courseLevel?: string;
  competencies: MatchCriteriaCompetencyInput[];
  criteria: MatchCriteriaCriterionInput[];
  language: string;
}

export const matchCriteriaToCompetencies = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 60 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as MatchCriteriaToCompetenciesInput;

    const emptyMatches = (input.criteria ?? []).map((c) => ({ index: c.index, ceId: null as string | null }));
    if (!input.criteria?.length || !input.competencies?.length) {
      return { matches: emptyMatches };
    }

    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const ceList = input.competencies
      .map((ce, i) => `[${i + 1}] ${ce.id}. ${ce.title}: ${ce.description}`)
      .join('\n');
    const criteriaList = input.criteria
      .map((c) => `${c.index}) ${c.name}${c.description ? ` — ${c.description}` : ''}`)
      .join('\n');

    const prompt = `Eres un experto en diseño curricular educativo (Decret 175/2022, Catalunya).

ASIGNATURA: ${subject}

COMPETÈNCIES ESPECÍFIQUES (CE) DISPONIBLES:
${ceList}

Estos son los criterios de evaluación de una o varias rúbricas de esta asignatura, que un docente ha escrito para un proyecto o actividad concretos:
${criteriaList}

Para cada criterio, identifica a cuál de las CE de arriba pertenece con más probabilidad, si es que encaja de verdad con alguna (algunos criterios pueden no corresponder a ninguna CE de la lista).

Responde ÚNICAMENTE con un JSON válido de la forma {"matches": [{"index": n, "ref": n|null}, ...]}, con un elemento por cada criterio (usa el mismo número "index" del criterio), usando el número entre corchetes [n] de la CE que le corresponda, o null si ninguna encaja de verdad. No incluyas explicaciones ni bloques de código markdown.`;

    const raw = await generateText(uid, prompt);

    const matches = emptyMatches;
    try {
      const parsed = parseJsonResponse<{ matches?: unknown }>(raw);
      if (Array.isArray(parsed.matches)) {
        const byIndex = new Map(matches.map((m) => [m.index, m]));
        for (const m of parsed.matches) {
          if (!m || typeof m !== 'object') continue;
          const idx = (m as Record<string, unknown>).index;
          const ref = (m as Record<string, unknown>).ref;
          if (typeof idx !== 'number' || !byIndex.has(idx)) continue;
          if (typeof ref === 'number' && Number.isInteger(ref) && ref >= 1 && ref <= input.competencies.length) {
            byIndex.get(idx)!.ceId = input.competencies[ref - 1].id;
          }
        }
      }
    } catch {
      // Si la IA no devuelve JSON válido, dejamos todo sin emparejar
      // (ceId: null) — no rompe nada, simplemente no se detecta nada esta vez.
    }

    return { matches };
  }
);

// ---------------------------------------------------------------------
// Reporte de incidencias/sugerencias del docente, enviado por correo. La
// dirección de destino y las credenciales de envío se leen únicamente de
// secretos de Cloud Functions (nunca hardcodeadas ni visibles en el
// cliente): se configuran una sola vez con:
//   firebase functions:secrets:set REPORT_EMAIL_USER
//   firebase functions:secrets:set REPORT_EMAIL_PASS
//   firebase functions:secrets:set REPORT_EMAIL_TO
// ---------------------------------------------------------------------

type ReportIssueType = 'suggestion' | 'malfunction' | 'bug';
const REPORT_TYPES: ReportIssueType[] = ['suggestion', 'malfunction', 'bug'];
const REPORT_TYPE_LABELS: Record<ReportIssueType, string> = {
  suggestion: 'Sugerencia',
  malfunction: 'Fallo de funcionamiento',
  bug: 'Bug',
};

interface ReportIssueInput {
  type: ReportIssueType;
  message: string;
}

export const reportIssue = onCall(
  { region: REGION, secrets: [reportEmailUser, reportEmailPass, reportEmailTo], enforceAppCheck: false },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as Partial<ReportIssueInput>;
    const message = String(input?.message ?? '').trim();
    if (!message) {
      throw new HttpsError('invalid-argument', 'El mensaje no puede estar vacío.');
    }
    if (message.length > 4000) {
      throw new HttpsError('invalid-argument', 'El mensaje es demasiado largo.');
    }
    const type: ReportIssueType = REPORT_TYPES.includes(input?.type as ReportIssueType)
      ? (input!.type as ReportIssueType)
      : 'bug';
    const reporterEmail = (request.auth?.token?.email as string | undefined) ?? undefined;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: reportEmailUser.value(), pass: reportEmailPass.value() },
    });

    await transporter.sendMail({
      from: `"Agenda Docente" <${reportEmailUser.value()}>`,
      to: reportEmailTo.value(),
      replyTo: reporterEmail,
      subject: `[Agenda Docente] ${REPORT_TYPE_LABELS[type]}`,
      text: [
        `Tipo: ${REPORT_TYPE_LABELS[type]}`,
        `Usuario: ${reporterEmail ?? uid}`,
        `Fecha: ${new Date().toISOString()}`,
        '',
        message,
      ].join('\n'),
    });

    return { ok: true };
  }
);

// ---------------------------------------------------------------------
// Eliminar cuenta: borra todos los datos del docente en Firestore y la
// cuenta de Auth. Se hace en el servidor (con privilegios de admin) en
// vez de en el cliente porque: 1) las reglas de Firestore prohíben
// borrar el documento de perfil (users/{uid}) desde el cliente a
// propósito, y 2) borrar el usuario de Auth desde el cliente exige un
// login "reciente" (si no, Firebase lo rechaza), lo que obligaría a
// pedir la contraseña de nuevo o reautenticar con Google antes de
// poder borrar. Con una función admin no hace falta nada de eso: basta
// con que la persona esté conectada ahora mismo.
// Debe cubrir TODAS las colecciones con campo ownerId de firestore.rules (se
// añadieron aquí a posteriori: originalmente faltaban meetingFolders,
// muralFolders, muralItems, learningSituations, profiUnitDrafts,
// studentNotes, checklistBoards y schoolHolidays, lo que dejaba esos datos
// -incluidas observaciones sensibles de alumnos en studentNotes- huérfanos
// en Firestore tras eliminar la cuenta).
const OWNED_COLLECTIONS = [
  'subjects', 'teacherTasks', 'meetings', 'meetingFolders', 'schoolYears',
  'timetableSlots', 'timeSlotDefs', 'weeklyPlans', 'learningSituations',
  'profiUnitDrafts', 'curriculumItems', 'rubrics', 'gradeEntries',
  'commentTemplates', 'gradeCommentTemplates', 'termFinalGrades',
  'gradebookActivities', 'studentGroups', 'students', 'studentNotes',
  'studentAdaptations', 'checklistBoards', 'schoolHolidays', 'muralFolders',
  'muralItems',
];

export const deleteAccount = onCall({ region: REGION, enforceAppCheck: false }, async (request) => {
  const uid = requireAuth(request.auth?.uid);
  const db = getFirestore();

  for (const col of OWNED_COLLECTIONS) {
    const snap = await db.collection(col).where('ownerId', '==', uid).get();
    if (snap.empty) continue;
    // Los batches de Firestore admiten hasta 500 operaciones.
    for (let i = 0; i < snap.docs.length; i += 400) {
      const batch = db.batch();
      snap.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  }

  await db.collection('users').doc(uid).delete().catch(() => null);

  try {
    await getAuth().deleteUser(uid);
  } catch (err) {
    // El documento y los datos ya se han borrado; si la cuenta de Auth
    // ya no existiera por algún motivo, no lo tratamos como error fatal.
    if ((err as { code?: string })?.code !== 'auth/user-not-found') {
      throw new HttpsError('internal', 'No se ha podido eliminar la cuenta de acceso.');
    }
  }

  return { ok: true };
});

// ---------------------------------------------------------------------
// Herramientas de Profi: acciones concretas que van más allá del chat
// libre, cada una con su propia función (siguiendo el mismo patrón que
// el resto del archivo: un prompt centrado, JSON cuando hace falta
// estructura, texto plano cuando no).
// ---------------------------------------------------------------------

// --- 1) Generar el enunciado de un examen (la rúbrica de corrección se
// genera aparte con generateRubricFromCurriculum, ya existente; esta
// función solo redacta las preguntas, alineadas con los criterios ya
// elegidos, para no duplicar la lógica de selección de CE). ---

interface ExamQuestionSpecInput {
  label: string; // "Opción múltiple", "Verdadero/falso"... (ya traducido por el cliente)
  count: number;
  pointsEach: number;
}

interface GenerateExamStatementInput {
  subjectName: string;
  courseLevel?: string;
  topic: string;
  criteria: { name: string; description?: string }[];
  questionSpec?: ExamQuestionSpecInput[];
  includeImages?: boolean;
  // PDF con el temario/apuntes de la unidad, en base64 (sin el prefijo
  // data:...;base64,). Gemini 2.5 Flash acepta PDFs directamente como
  // entrada multimodal: no hace falta extraer el texto nosotros mismos.
  contextPdfBase64?: string;
  language: string;
}

export const generateExamStatement = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 120 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateExamStatementInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);

    const criteriaList = (input.criteria ?? [])
      .map((c) => `- ${c.name}${c.description ? `: ${c.description}` : ''}`)
      .join('\n');

    const spec = (input.questionSpec ?? []).filter((s) => s.count > 0);
    const hasSpec = spec.length > 0;
    const specList = hasSpec
      ? spec.map((s) => `- ${s.count} pregunta(s) de tipo "${s.label}", ${s.pointsEach} punto(s) cada una`).join('\n')
      : '';
    const totalPoints = hasSpec ? spec.reduce((sum, s) => sum + s.count * s.pointsEach, 0) : 10;
    const questionsInstruction = hasSpec
      ? `Redacta EXACTAMENTE estas preguntas, respetando el tipo, la cantidad y la puntuación de cada una indicados a continuación (la puntuación total del examen debe sumar ${totalPoints} puntos):\n${specList}`
      : 'Redacta entre 4 y 8 preguntas o ejercicios variados (teoría, aplicación práctica, algún ejercicio de desarrollo si encaja con la asignatura), con la puntuación de cada uno indicada entre paréntesis (deben sumar 10 puntos en total).';

    const imagesInstruction = input.includeImages
      ? '\nEn las preguntas donde tenga sentido apoyarse en una imagen (por ejemplo interpretar un dibujo, un mapa, una gráfica o una escena), incluye una línea "[Imagen: descripción breve de lo que debería mostrar la imagen]" justo antes de esa pregunta, para que el docente sepa qué imagen buscar o dibujar. No inventes imágenes en preguntas que no las necesiten.'
      : '';

    const hasPdf = !!input.contextPdfBase64;
    const pdfInstruction = hasPdf
      ? '\nSe adjunta un PDF con el temario/apuntes de esta unidad: básate en su contenido real (conceptos, ejemplos, vocabulario que usa) para redactar las preguntas, en vez de usar conocimiento genérico sobre el tema. No preguntes por contenido que no aparezca en el PDF.'
      : '';

    const prompt = `Eres Profi, asistente de un docente de ${subject}. Redacta el enunciado completo de un examen sobre "${input.topic}".

La corrección se hará con una rúbrica que evalúa estos criterios (para que las preguntas los cubran de verdad, aunque no menciones los criterios explícitamente en el enunciado):
${criteriaList || '(sin criterios específicos, usa tu criterio pedagógico)'}

${questionsInstruction}${imagesInstruction}${pdfInstruction}

Numera las preguntas. Usa un formato limpio en markdown ligero (## para el título, texto plano para las preguntas, sin viñetas ni tablas), listo para copiar y entregar al alumnado.

Responde en ${lang}. Responde ÚNICAMENTE con un JSON válido de la forma {"examTitle": "...", "statement": "..."}, sin bloques de código markdown envolviendo el JSON (el campo "statement" sí puede contener markdown ligero dentro de su texto).`;

    const raw = hasPdf
      ? await generateTextWithPdf(uid, prompt, input.contextPdfBase64!)
      : await generateText(uid, prompt);
    try {
      const parsed = parseJsonResponse<{ examTitle?: string; statement?: string }>(raw);
      return {
        examTitle: typeof parsed.examTitle === 'string' ? parsed.examTitle : input.topic,
        statement: typeof parsed.statement === 'string' ? parsed.statement : raw,
      };
    } catch {
      return { examTitle: input.topic, statement: raw };
    }
  }
);

// --- 2) Planificar una unidad didáctica completa (Situación de Aprendizaje)
// en N sesiones, estructuradas en 3 fases (inicio/desarrollo/síntesis) ---

type UnitSessionPhase = 'inicio' | 'desarrollo' | 'sintesis';

interface PlanUnitCompetencyInput {
  id: string; // "CE1"
  title: string;
  description: string;
  howToWork?: string; // cómo le gustaría al docente trabajar esta CE en la SA
}

interface PlanLearningUnitInput {
  subjectName: string;
  courseLevel?: string;
  sessionCount: number;
  competencies: PlanUnitCompetencyInput[];
  contentsToWorkOn?: string; // contenidos concretos que quiere trabajar el docente (evita que la IA se los invente)
  threadIdea?: string; // hilo conductor / gamificación
  methodologies: string[]; // máximo 3
  materialTypes: string[]; // tipos de materiales prioritarios (fichas, recursos interactivos...)
  finalProduct: string;
  hasExam: boolean;
  groupNotes?: string; // particularidades del grupo (p.ej. nivel lector, ritmo, diversidad) para ajustar el diseño de las sesiones
  language: string;
}

interface PlanLearningUnitSession {
  phase: UnitSessionPhase;
  title: string;
  description: string;
  ceIds: string[]; // subconjunto de los ids de PlanLearningUnitInput.competencies
  isEvaluated: boolean;
  evaluationName?: string;
}

export const planLearningUnit = onCall(
  // Es la generación más pesada de Profi (hasta 20 sesiones detalladas +
  // rúbrica en texto completo): 90s se quedaba corto y Cloud Run cortaba la
  // conexión a medio generar, lo que el navegador del docente mostraba como
  // un falso error de CORS (sin cabecera Access-Control-Allow-Origin) en vez
  // de un error legible. 240s da margen de sobra incluso con sessionCount alto.
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 240 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as PlanLearningUnitInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const sessionCount = Math.min(20, Math.max(1, Math.round(input.sessionCount || 1)));
    const competencies = Array.isArray(input.competencies) ? input.competencies : [];
    const validCeIds = new Set(competencies.map((ce) => ce.id));

    const ceList = competencies.length > 0
      ? competencies
          .map((ce) => `${ce.id}. ${ce.title}\n   ${ce.description}${ce.howToWork?.trim() ? `\n   Cómo le gustaría trabajarla al docente: ${ce.howToWork.trim()}` : ''}`)
          .join('\n\n')
      : '(el docente no ha seleccionado ninguna CE concreta; usa tu criterio pedagógico para el contenido)';

    const methodologiesList = (input.methodologies ?? []).filter((m) => m && m.trim()).slice(0, 3);
    const methodologiesText = methodologiesList.length > 0
      ? methodologiesList.join(', ')
      : '(sin preferencia específica, elige las que mejor encajen)';

    const threadText = input.threadIdea?.trim()
      ? input.threadIdea.trim()
      : '(sin hilo conductor ni gamificación específicos; puedes proponer uno breve si aporta valor pedagógico, o prescindir de él)';

    const examText = input.hasExam
      ? 'La asignatura SÍ tendrá examen además de esta unidad: no hace falta que todas las sesiones evaluables carguen con todo el peso de la nota; con un par de sesiones evaluadas (incluyendo la del producto final) es suficiente.'
      : 'La asignatura NO tendrá examen: la evaluación de esta unidad depende ÚNICAMENTE de los proyectos/trabajos del día a día, así que marca como evaluables ("isEvaluated": true) más sesiones de lo habitual —varias a lo largo del desarrollo, no solo la última— para tener suficientes evidencias de evaluación.';

    const contentsText = input.contentsToWorkOn?.trim()
      ? `El docente ha especificado ESTOS contenidos concretos a trabajar en la unidad: "${input.contentsToWorkOn.trim()}". Basa el contenido de las sesiones ÚNICAMENTE en estos contenidos y en las CE de arriba: no introduzcas temas, conceptos o contenidos que no estén relacionados con lo que el docente ha indicado.`
      : 'El docente no ha especificado contenidos concretos: basa el contenido de las sesiones ESTRICTAMENTE en las CE y sus criteris d\'avaluació indicados arriba, sin inventar contenidos ajenos a esta asignatura y curso.';

    const materialTypesList = (input.materialTypes ?? []).filter((m) => m && m.trim());
    const materialsText = materialTypesList.length > 0
      ? `El docente prioriza estos tipos de materiales: ${materialTypesList.join(', ')}. Utilízalos en las sesiones donde tenga sentido pedagógico (no hace falta forzarlos en todas), y menciónalos explícitamente en la descripción de la sesión cuando se usen.`
      : '';

    const groupNotesText = input.groupNotes?.trim()
      ? `PARTICULARIDADES DE ESTE GRUPO CONCRETO (además de la etapa/curso): ${input.groupNotes.trim()}. Ten esto MUY en cuenta al diseñar cada sesión: adapta el lenguaje, la dificultad, el formato de las actividades y las instrucciones a esta realidad concreta del grupo (por ejemplo, si se indica que no saben leer con soltura, prioriza dinámicas orales/visuales y evita depender de textos largos o instrucciones escritas complejas).`
      : '';

    const prompt = `Eres Profi, asistente de un docente de ${subject}. El docente quiere planificar una Situación de Aprendizaje (SA) completa, repartida en EXACTAMENTE ${sessionCount} sesiones de clase, con esta estructura obligatoria en TRES FASES:
- FASE "inicio": activación de conocimientos previos / motivación inicial (normalmente 1 sesión, 2 si ${sessionCount} es alto).
- FASE "desarrollo": el grueso de las sesiones, donde se trabaja el contenido y se avanza hacia el producto final.
- FASE "sintesis": cierre, síntesis y entrega/presentación del producto final (normalmente 1 sesión, 2 si ${sessionCount} es alto).
Reparte las ${sessionCount} sesiones entre las tres fases de forma coherente y en este orden (inicio → desarrollo → síntesis); si ${sessionCount} es muy bajo, agrupa fases si hace falta pero respeta el orden.
${groupNotesText ? `\n${groupNotesText}\n` : ''}
COMPETÈNCIES ESPECÍFIQUES (CE) A TRABAJAR EN ESTA SA:
${ceList}

CONTENIDOS: ${contentsText}

PRODUCTO FINAL de la SA: ${input.finalProduct}

METODOLOGÍAS que el docente quiere aplicar (máximo 3): ${methodologiesText}
${materialsText ? `\nMATERIALES PRIORITARIOS: ${materialsText}\n` : ''}
HILO CONDUCTOR / GAMIFICACIÓN: ${threadText}

EVALUACIÓN: ${examText}

Para cada sesión, indica:
- "phase": "inicio", "desarrollo" o "sintesis".
- "title": título corto y concreto.
- "description": qué se hace en esa sesión (dinámica, metodología aplicada, relación con el hilo conductor si existe), de 2 a 4 frases, lista para usar directamente como planificación.
- "ceIds": array con los identificadores EXACTOS (tal cual aparecen arriba, p.ej. "CE1") de las CE que se trabajan principalmente en esa sesión; puede estar vacío si la sesión es puramente introductoria u organizativa.
- "isEvaluated": true si esa sesión concreta genera una evidencia que el docente calificará (un trabajo, una entrega, la presentación del producto final...), false si es una sesión de trabajo no evaluada por sí misma.
- "evaluationName": SOLO si "isEvaluated" es true, un nombre corto para esa evidencia evaluable (p.ej. "Entrega del guion" o "Presentación final").

También propón:
- Un nombre corto para la SA completa ("unitLabel").
- Un texto "rubricCopyText": una rúbrica completa en texto plano/markdown ligero (lista para copiar y pegar tal cual, siempre editable por el docente) que evalúe el conjunto del producto final de la SA, con entre 3 y 5 criterios derivados de las CE trabajadas, cada uno con 4 niveles de logro (Insuficiente/Suficiente/Notable/Excelente) y su peso en %, sumando 100%. Este texto es independiente de las rúbricas estructuradas que el docente pueda generar sesión a sesión más adelante: es solo para copiar y pegar directamente.

Responde en ${lang}. Responde ÚNICAMENTE con un JSON válido de la forma {"unitLabel": "...", "sessions": [{"phase": "...", "title": "...", "description": "...", "ceIds": ["..."], "isEvaluated": true, "evaluationName": "..."}], "rubricCopyText": "..."}, con el array "sessions" con EXACTAMENTE ${sessionCount} elementos en orden (inicio primero, síntesis al final). Sin texto adicional ni bloques de código markdown envolviendo el JSON.`;

    // Sin acotar thinkingBudget/maxOutputTokens (a diferencia del chat, ver
    // línea ~633), este modelo "piensa" con presupuesto dinámico/sin límite
    // explícito antes de responder. Con un JSON tan grande (hasta 20
    // sesiones detalladas + una rúbrica completa), eso disparaba la
    // latencia real ("tarda mucho") y, si el pensamiento se comía casi todo
    // el presupuesto de salida por defecto, el JSON final llegaba cortado a
    // medias — parseJsonResponse fallaba y el docente veía un error
    // "Internal" genérico sin que hubiera ningún problema con su clave ni
    // con la petición en sí. Acotar ambos valores explícitamente (bastante
    // margen para razonar bien, pero con techo) hace la respuesta más
    // rápida y fiable, sin arriesgarse a truncar el JSON.
    const raw = await generateText(uid, prompt, {
      thinkingConfig: { thinkingBudget: 4096 },
      maxOutputTokens: 16384,
    });
    try {
      const parsed = parseJsonResponse<{ unitLabel?: string; sessions?: unknown; rubricCopyText?: string }>(raw);
      const rawSessions = Array.isArray(parsed.sessions) ? parsed.sessions : [];
      let sessions: PlanLearningUnitSession[] = rawSessions
        .filter((s): s is Record<string, unknown> => !!s && typeof s === 'object')
        .map((s, i): PlanLearningUnitSession => {
          const phase: UnitSessionPhase =
            s.phase === 'inicio' || s.phase === 'desarrollo' || s.phase === 'sintesis'
              ? s.phase
              : i === 0
                ? 'inicio'
                : i === rawSessions.length - 1
                  ? 'sintesis'
                  : 'desarrollo';
          const ceIds = Array.isArray(s.ceIds)
            ? s.ceIds.filter((id): id is string => typeof id === 'string' && validCeIds.has(id))
            : [];
          const isEvaluated = s.isEvaluated === true;
          return {
            phase,
            title: typeof s.title === 'string' ? s.title : '',
            description: typeof s.description === 'string' ? s.description : '',
            ceIds,
            isEvaluated,
            ...(isEvaluated && typeof s.evaluationName === 'string' && s.evaluationName.trim()
              ? { evaluationName: s.evaluationName.trim() }
              : {}),
          };
        });
      // Garantizamos exactamente sessionCount sesiones aunque la IA se
      // equivoque en el conteo, igual que en el resto de herramientas.
      while (sessions.length < sessionCount) {
        const i = sessions.length;
        sessions.push({
          phase: i === 0 ? 'inicio' : i === sessionCount - 1 ? 'sintesis' : 'desarrollo',
          title: '',
          description: '',
          ceIds: [],
          isEvaluated: false,
        });
      }
      sessions = sessions.slice(0, sessionCount);
      // Nos aseguramos de que al menos una sesión (la de síntesis/producto
      // final) quede marcada como evaluable, para no dejar la SA sin ninguna
      // evidencia de evaluación por un fallo puntual de la IA.
      if (!sessions.some((s) => s.isEvaluated)) {
        const last = sessions[sessions.length - 1];
        last.isEvaluated = true;
        last.evaluationName = last.evaluationName ?? input.finalProduct.slice(0, 80);
      }
      return {
        unitLabel: typeof parsed.unitLabel === 'string' && parsed.unitLabel.trim() ? parsed.unitLabel : subject,
        sessions,
        rubricCopyText: typeof parsed.rubricCopyText === 'string' ? parsed.rubricCopyText : '',
      };
    } catch (err) {
      if (err instanceof HttpsError) throw err;
      throw new HttpsError('internal', `No se pudo interpretar la planificación generada: ${raw.slice(0, 200)}`);
    }
  }
);

// --- 3) Resumir en texto natural los resultados reales de una clase (las
// medias y alumnos rezagados se calculan en el cliente a partir de las
// notas guardadas; esta función solo redacta el resumen, sin inventar
// datos que no se le hayan pasado). ---

interface ClassCeStatInput {
  ceName: string;
  average: number;
  strugglingCount: number;
  totalCount: number;
}

interface StrugglingStudentInput {
  name: string;
  weakCe: string[];
}

interface SummarizeClassResultsInput {
  subjectName: string;
  courseLevel?: string;
  groupName?: string;
  overallAverage?: number;
  ceStats: ClassCeStatInput[];
  strugglingStudents: StrugglingStudentInput[];
  language: string;
}

export const summarizeClassResults = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 60 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as SummarizeClassResultsInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);
    const group = input.groupName ? ` (grupo ${input.groupName})` : '';

    const ceLines = (input.ceStats ?? [])
      .map((c) => `- ${c.ceName}: media ${c.average.toFixed(1)}/10, ${c.strugglingCount} de ${c.totalCount} alumnos por debajo de 5`)
      .join('\n') || '(sin datos por competencia)';

    const studentLines = (input.strugglingStudents ?? [])
      .map((s) => `- ${s.name}: flojea en ${s.weakCe.join(', ') || 'varias competencias'}`)
      .join('\n') || '(ningún alumno destaca especialmente por debajo de la media)';

    const overall = typeof input.overallAverage === 'number' ? `Media general de la clase: ${input.overallAverage.toFixed(1)}/10.` : '';

    const prompt = `Eres Profi, asistente de un docente de ${subject}${group}. Vas a redactar un resumen breve y útil de los resultados REALES de esta clase, a partir de los datos calculados que te doy (no inventes ni añadas datos que no estén aquí).

${overall}

Media por competencia específica (CE):
${ceLines}

Alumnado con dificultades detectadas:
${studentLines}

Responde en ${lang}. Redacta un resumen en 2-3 párrafos cortos (o una lista breve si lo ves más claro), en un tono cercano y constructivo dirigido al propio docente: qué va bien, qué competencias conviene reforzar, y si hay alumnado que merece atención individual. No des consejos genéricos vacíos, básate en los datos concretos de arriba.`;

    const summary = await generateText(uid, prompt);
    return { summary };
  }
);

// --- 4) Sugerir cómo adaptar una actividad/rúbrica a un alumno con
// adaptación curricular registrada ---

interface AdaptationCriterionInput {
  name: string;
  description?: string;
  indicators?: string[];
}

interface SuggestAdaptationInput {
  subjectName: string;
  courseLevel?: string;
  studentFirstName: string;
  activityName: string;
  generalCriteria: AdaptationCriterionInput[];
  adaptedCriteria?: AdaptationCriterionInput[];
  language: string;
}

function formatCriteriaForPrompt(criteria: AdaptationCriterionInput[]): string {
  return criteria
    .map((c) => {
      const ind = c.indicators?.length ? `\n   Niveles: ${c.indicators.join(' | ')}` : '';
      return `- ${c.name}${c.description ? `: ${c.description}` : ''}${ind}`;
    })
    .join('\n');
}

export const suggestAdaptation = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 60 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as SuggestAdaptationInput;
    const lang = languageName(input.language);
    const subject = subjectLabel(input.subjectName, input.courseLevel);

    const hasAdapted = (input.adaptedCriteria?.length ?? 0) > 0;
    const adaptedBlock = hasAdapted
      ? `\n\nEste alumno YA tiene una rúbrica adaptada registrada para esta asignatura, con estos criterios (úsala como referencia del tipo de ajuste que ya se le aplica, y sé coherente con ella):\n${formatCriteriaForPrompt(input.adaptedCriteria!)}`
      : '\n\nEste alumno tiene una adaptación curricular marcada en esta asignatura, pero todavía no tiene una rúbrica adaptada específica: propón tú los ajustes desde cero.';

    const prompt = `Eres Profi, asistente de un docente de ${subject}. Necesitas ayudar a adaptar la actividad "${input.activityName}" para ${input.studentFirstName}, un alumno/a con adaptación curricular.

Rúbrica general de la actividad (la que se usa con el resto de la clase):
${formatCriteriaForPrompt(input.generalCriteria)}${adaptedBlock}

Responde en ${lang}. Propón entre 3 y 5 sugerencias concretas y accionables para adaptar esta actividad a ${input.studentFirstName} (por ejemplo: simplificar el enunciado, dar más tiempo, cambiar el formato de respuesta, reducir el número de ítems, apoyos visuales, etc.), manteniendo en la medida de lo posible los mismos objetivos de aprendizaje. Sé específico a esta actividad, no genérico. Formato: lista breve sin numerar.`;

    const suggestions = await generateText(uid, prompt);
    return { suggestions };
  }
);

// --- 5) Redactar comunicados a las familias ---

type FamilyMessageType = 'meeting' | 'circular' | 'notice';

interface DraftFamilyMessageInput {
  messageType: FamilyMessageType;
  subjectName?: string;
  groupName?: string;
  keyPoints: string;
  language: string;
}

const FAMILY_MESSAGE_LABELS: Record<FamilyMessageType, string> = {
  meeting: 'una convocatoria de reunión con las familias',
  circular: 'una circular informativa para las familias',
  notice: 'un aviso puntual para las familias (por ejemplo de una salida, un cambio de horario o una incidencia)',
};

export const draftFamilyMessage = onCall(
  { region: REGION, secrets: [geminiEncryptionKey], enforceAppCheck: false, timeoutSeconds: 60 },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as DraftFamilyMessageInput;
    const lang = languageName(input.language);
    const context = [input.subjectName, input.groupName].filter(Boolean).join(' · ');

    const prompt = `Eres Profi, asistente de un docente. Redacta ${FAMILY_MESSAGE_LABELS[input.messageType] ?? FAMILY_MESSAGE_LABELS.notice}${context ? ` (contexto: ${context})` : ''}.

Puntos clave que el docente quiere comunicar:
"""
${input.keyPoints}
"""

Responde en ${lang}. Redacta el mensaje completo, listo para copiar y enviar (por email o agenda escolar): con un saludo inicial, el cuerpo del mensaje bien organizado, y una despedida cordial. Tono cercano pero profesional, propio de la comunicación de un centro educativo. No inventes datos (fechas, horas, lugares) que no estén en los puntos clave; si falta algo imprescindible, déjalo entre corchetes como [FECHA] para que el docente lo complete.`;

    const draft = await generateText(uid, prompt);
    return { draft };
  }
);
