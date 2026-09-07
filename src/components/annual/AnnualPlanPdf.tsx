import type { ReactElement } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { TFunction } from 'i18next';
import type { WeeklyPlan, Subject, LearningSituation, Term } from '@/types';
import { termForDate } from '@/utils/terms';

/** Referencia mínima a un "saber" del currículum (id/code/description),
 * calculada en el cliente a partir de data/curriculum — ver AnnualPlanningPage. */
interface CurriculumRefItem {
  id: string;
  code: string;
  description: string;
}

// Fuente cursiva de la maqueta que el docente diseñó en Canva (Dancing
// Script), ya autoalojada en public/fonts (los mismos archivos que usa la
// web para el logo/hero — ver src/index.css). react-pdf necesita registrarla
// aparte porque genera el PDF con su propio motor de fuentes (fontkit),
// independiente del CSS de la página. Usa la variante .ttf (no .woff2): el
// renderizador de PDF de react-pdf no consigue empotrar glifos desde este
// woff2 concreto (falla el subsetting), así que se generó un .ttf a partir
// del mismo archivo solo para este uso.
Font.register({
  family: 'DancingScript',
  fonts: [
    { src: '/fonts/DancingScript-700.ttf', fontWeight: 700 },
    { src: '/fonts/DancingScript-600.ttf', fontWeight: 600 },
  ],
});

const CURSIVE = 'DancingScript';

// Paleta calcada de la maqueta de Canva del docente: título y "SA pill" en
// azul, cuatro pastillas de metadatos (sesiones/fechas/curso/trimestre),
// pastilla de asignatura, y los 5 apartados (Objectius/Sabers/Criteris/
// Metodologia/Recursos) cada uno con su propio color de borde, a juego con
// la página de tabla de sesiones (cabeceras rellenas + celdas de trazo
// discontinuo del mismo color).
const COLORS = {
  title: '#6FA0E3',
  saPillBg: '#BFE1FB',
  saPillText: '#20344A',
  badgeSessions: '#FBE7B4',
  badgeDates: '#F8CDD3',
  badgeCurs: '#EAD9F6',
  badgeTrimestre: '#FCE0AE',
  subjectPillBg: '#D3ECFC',
  subjectPillText: '#1C3F5C',
  objectius: { border: '#E2BE68', label: '#8A6A16' },
  sabers: { border: '#D9AEEA', label: '#7A3E93' },
  criteris: { border: '#A9D9F5', label: '#1E6A96' },
  metodologia: { border: '#F0A79E', label: '#A23B29' },
  recursos: { border: '#BDBDBD', label: '#5A5A5A' },
  bodyText: '#3A3A3A',
  tableSetmanaHead: '#FBE29B',
  tableActivitatHead: '#FCCB86',
  tableObjectiusHead: '#F7B8C0',
  tableSabersHead: '#D6D6D6',
  tableSetmanaBorder: '#E9C567',
  tableActivitatBorder: '#EFB479',
  tableObjectiusBorder: '#EE9BA6',
  tableSabersBorder: '#BEBEBE',
};

// react-pdf calcula el layout de forma estática: no hay manera de medir el
// texto antes de dibujarlo ni de "encoger hasta que quepa" como con un
// transform CSS. Para acercarnos a ese efecto sin esa medición real,
// `computeCoverScale` estima cuántas líneas va a ocupar el contenido de los
// 5 apartados de la ficha (a partir de su longitud en caracteres) y elige
// una de 4 escalas predefinidas; `buildCoverStyles(scale)` genera entonces
// una hoja de estilos completa con todos los tamaños/márgenes reducidos en
// esa proporción. Es una aproximación (no un ajuste píxel a píxel), pero
// para una SA con mucho texto evita que las casillas se salgan de la página.
function buildCoverStyles(scale: number) {
  const s = (base: number, min: number) => Math.max(min, Math.round(base * scale * 10) / 10);
  return StyleSheet.create({
    page: { padding: s(40, 24), fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },
    title: { fontFamily: CURSIVE, fontWeight: 700, fontSize: s(28, 16), color: COLORS.title, textAlign: 'center' },
    subtitle: { fontSize: s(9, 6), color: '#8A8A8A', textAlign: 'center', marginBottom: s(16, 6) },
    saPill: {
      backgroundColor: COLORS.saPillBg,
      borderRadius: 16,
      paddingVertical: s(12, 6),
      paddingHorizontal: 16,
      marginBottom: s(12, 6),
    },
    saPillText: { fontFamily: CURSIVE, fontWeight: 700, fontSize: s(16, 11), color: COLORS.saPillText, textAlign: 'center' },
    badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: s(8, 4), justifyContent: 'center' },
    badge: { borderRadius: 12, paddingVertical: s(6, 3), paddingHorizontal: 12 },
    badgeText: { fontFamily: CURSIVE, fontWeight: 600, fontSize: s(10.5, 8), textAlign: 'center', color: '#3A3A3A' },
    subjectPill: { backgroundColor: COLORS.subjectPillBg, borderRadius: 12, paddingVertical: s(8, 4), marginBottom: s(18, 8) },
    subjectPillText: { fontFamily: CURSIVE, fontWeight: 600, fontSize: s(13, 9), textAlign: 'center', color: COLORS.subjectPillText },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    box: { width: '48%', borderWidth: 1.3, borderRadius: 14, padding: s(12, 7), marginBottom: s(16, 8), minHeight: s(150, 60) },
    boxLabel: { fontFamily: CURSIVE, fontWeight: 700, fontSize: s(14, 10), textAlign: 'center', marginBottom: s(8, 4) },
    boxText: { fontSize: s(9, 7), lineHeight: 1.45, color: COLORS.bodyText },
    recursosBox: { width: '100%', borderWidth: 1.3, borderRadius: 14, padding: s(12, 7), minHeight: s(90, 40) },
    footer: { position: 'absolute', bottom: 20, left: 40, right: 40, fontSize: 8, color: '#9C97AC', textAlign: 'center' },
  });
}

/** Convierte un texto libre en lista con puntos: una línea = un ítem. Se usa
 * en los 5 apartados de la ficha de SA (Objectius/Sabers/Criteris/
 * Metodologia/Recursos), tal y como pidió el docente. */
function bulletText(raw: string | undefined): string {
  const lines = (raw ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return '—';
  return lines.map((l) => `•  ${l}`).join('\n');
}

function estimateBoxRows(text: string, charsPerLine: number): number {
  return text
    .split('\n')
    .reduce((sum, line) => sum + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
}

function computeCoverScale(situation: LearningSituation): number {
  const HALF_BOX_CHARS_PER_LINE = 44; // casilla a media anchura (2 columnas), a tamaño base
  const FULL_BOX_CHARS_PER_LINE = 92; // casilla "Recursos" a ancho completo

  const objectiusRows = estimateBoxRows(bulletText(situation.objectives), HALF_BOX_CHARS_PER_LINE);
  const sabersRows = estimateBoxRows(bulletText(situation.sabers), HALF_BOX_CHARS_PER_LINE);
  const criterisRows = estimateBoxRows(bulletText(situation.evaluationCriteria), HALF_BOX_CHARS_PER_LINE);
  const metodologiaRows = estimateBoxRows(bulletText(situation.methodology), HALF_BOX_CHARS_PER_LINE);
  const recursosRows = estimateBoxRows(bulletText(situation.resources), FULL_BOX_CHARS_PER_LINE);

  // Objectius/Sabers van en la misma fila del grid (igual que Criteris/
  // Metodologia): la altura de esa fila la marca el más alto de los dos.
  const totalRows = Math.max(objectiusRows, sabersRows) + Math.max(criterisRows, metodologiaRows) + recursosRows;

  if (totalRows <= 30) return 1;
  if (totalRows <= 42) return 0.85;
  if (totalRows <= 56) return 0.72;
  return 0.6;
}

const WEEK_W = 90;
const COL_W = 220;

const tablePage = StyleSheet.create({
  page: { padding: 32, fontFamily: 'Helvetica' },
  title: { fontFamily: CURSIVE, fontWeight: 700, fontSize: 20, color: COLORS.title, textAlign: 'center' },
  subtitle: { fontSize: 8, color: '#8A8A8A', textAlign: 'center', marginBottom: 10 },
  saPill: { backgroundColor: COLORS.saPillBg, borderRadius: 14, paddingVertical: 9, marginBottom: 12 },
  saPillText: { fontFamily: CURSIVE, fontWeight: 700, fontSize: 13, color: COLORS.saPillText, textAlign: 'center' },
  headerRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  headerCell: { borderRadius: 12, paddingVertical: 8, alignItems: 'center', justifyContent: 'center' },
  headerCellText: { fontFamily: CURSIVE, fontWeight: 700, fontSize: 11, color: '#33302A', textAlign: 'center' },
  row: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  weekCell: {
    width: WEEK_W,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  weekCellText: { fontFamily: CURSIVE, fontSize: 9.5, color: '#3A3A3A', textAlign: 'center' },
  bodyCell: { width: COL_W, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', padding: 10, justifyContent: 'center' },
  bodyCellText: { fontSize: 8.5, color: COLORS.bodyText, lineHeight: 1.4 },
  bodyCellTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: COLORS.bodyText, marginBottom: 3 },
  footer: { position: 'absolute', bottom: 16, left: 32, right: 32, fontSize: 8, color: '#9C97AC', textAlign: 'center' },
});

function PdfFooter({ style }: { style: Style }) {
  return (
    <Text style={style} fixed render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
  );
}

function sabersTextForPlan(plan: WeeklyPlan, curriculumById: Map<string, CurriculumRefItem>): string {
  return (
    (plan.curriculumItemIds ?? [])
      .map((id) => {
        const item = curriculumById.get(id);
        return item ? `${item.code ? item.code + ': ' : ''}${item.description}` : null;
      })
      .filter(Boolean)
      .join('\n') || '—'
  );
}

/** Página 1 de una SA: la "ficha" con título, pastillas de metadatos y los
 * 5 apartados (Objectius/Sabers/Criteris/Metodologia/Recursos), calcada del
 * diseño de Canva del docente. */
function SaCoverPage({
  situation, plans, subject, effectiveTerms, schoolYearName, t,
}: {
  situation: LearningSituation;
  plans: WeeklyPlan[];
  subject?: Subject;
  effectiveTerms: Term[];
  schoolYearName: string;
  t: TFunction;
}) {
  const sessionCount = plans.length;
  const startDate = plans[0]?.weekStartDate;
  const endDate = plans[plans.length - 1]?.weekStartDate;
  const startTerm = startDate ? termForDate(effectiveTerms, startDate) : undefined;
  const endTerm = endDate ? termForDate(effectiveTerms, endDate) : undefined;
  const termLabel = startTerm && endTerm
    ? (startTerm.id === endTerm.id ? startTerm.name : `${startTerm.name} – ${endTerm.name}`)
    : undefined;

  // Ficha "encogida" a una sola página cuando el texto de los 5 apartados es
  // largo (ver comentario de computeCoverScale/buildCoverStyles más arriba).
  const scale = computeCoverScale(situation);
  const c = buildCoverStyles(scale);

  return (
    <Page size="A4" style={c.page}>
      <Text style={c.title}>{t('annual.pdfTitle')}</Text>
      <Text style={c.subtitle}>{t('annual.pdfSubtitle', { year: schoolYearName })}</Text>

      <View style={c.saPill}>
        <Text style={c.saPillText}>{situation.name}</Text>
      </View>

      <View style={c.badgeRow}>
        <View style={[c.badge, { backgroundColor: COLORS.badgeSessions }]}>
          <Text style={c.badgeText}>{t('annual.saSessions', { count: sessionCount })}</Text>
        </View>
        {startDate && endDate && (
          <View style={[c.badge, { backgroundColor: COLORS.badgeDates }]}>
            <Text style={c.badgeText}>{startDate === endDate ? startDate : `${startDate} – ${endDate}`}</Text>
          </View>
        )}
        {subject?.courseLevel && (
          <View style={[c.badge, { backgroundColor: COLORS.badgeCurs }]}>
            <Text style={c.badgeText}>{subject.courseLevel}</Text>
          </View>
        )}
        {termLabel && (
          <View style={[c.badge, { backgroundColor: COLORS.badgeTrimestre }]}>
            <Text style={c.badgeText}>{termLabel}</Text>
          </View>
        )}
      </View>

      {subject?.name && (
        <View style={c.subjectPill}>
          <Text style={c.subjectPillText}>{subject.name}</Text>
        </View>
      )}

      <View style={c.grid}>
        <View style={[c.box, { borderColor: COLORS.objectius.border }]}>
          <Text style={[c.boxLabel, { color: COLORS.objectius.label }]}>{t('annual.saObjectives')}</Text>
          <Text style={c.boxText}>{bulletText(situation.objectives)}</Text>
        </View>
        <View style={[c.box, { borderColor: COLORS.sabers.border }]}>
          <Text style={[c.boxLabel, { color: COLORS.sabers.label }]}>{t('annual.saSabers')}</Text>
          <Text style={c.boxText}>{bulletText(situation.sabers)}</Text>
        </View>
        <View style={[c.box, { borderColor: COLORS.criteris.border }]}>
          <Text style={[c.boxLabel, { color: COLORS.criteris.label }]}>{t('annual.saEvaluationCriteria')}</Text>
          <Text style={c.boxText}>{bulletText(situation.evaluationCriteria)}</Text>
        </View>
        <View style={[c.box, { borderColor: COLORS.metodologia.border }]}>
          <Text style={[c.boxLabel, { color: COLORS.metodologia.label }]}>{t('annual.saMethodology')}</Text>
          <Text style={c.boxText}>{bulletText(situation.methodology)}</Text>
        </View>
      </View>

      <View style={[c.recursosBox, { borderColor: COLORS.recursos.border }]}>
        <Text style={[c.boxLabel, { color: COLORS.recursos.label }]}>{t('annual.saResources')}</Text>
        <Text style={c.boxText}>{bulletText(situation.resources)}</Text>
      </View>

      <PdfFooter style={c.footer} />
    </Page>
  );
}

/** Página(s) de tabla de sesiones de una SA (o de las actividades sueltas sin
 * SA de una asignatura): cabeceras rellenas de color + filas con pastilla de
 * semana y casillas de trazo discontinuo, calcadas de la maqueta. Sin
 * wrap={false} en las filas de más: si una SA tiene muchas sesiones, la
 * tabla se reparte con normalidad en tantas páginas landscape como haga
 * falta (mismo criterio aplicado al corregir la página en blanco del PDF). */
function SessionsTablePage({
  saPillLabel, plans, curriculumById, schoolYearName, t,
}: {
  saPillLabel: string;
  plans: WeeklyPlan[];
  curriculumById: Map<string, CurriculumRefItem>;
  schoolYearName: string;
  t: TFunction;
}) {
  return (
    <Page size="A4" orientation="landscape" style={tablePage.page}>
      <Text style={tablePage.title} fixed>{t('annual.pdfTitle')}</Text>
      <Text style={tablePage.subtitle} fixed>{t('annual.pdfSubtitle', { year: schoolYearName })}</Text>
      <View style={tablePage.saPill} fixed>
        <Text style={tablePage.saPillText}>{saPillLabel}</Text>
      </View>

      <View style={tablePage.headerRow} fixed>
        <View style={[tablePage.headerCell, { width: WEEK_W, backgroundColor: COLORS.tableSetmanaHead }]}>
          <Text style={tablePage.headerCellText}>{t('annual.week')}</Text>
        </View>
        <View style={[tablePage.headerCell, { width: COL_W, backgroundColor: COLORS.tableActivitatHead }]}>
          <Text style={tablePage.headerCellText}>{t('annual.activity')}</Text>
        </View>
        <View style={[tablePage.headerCell, { width: COL_W, backgroundColor: COLORS.tableObjectiusHead }]}>
          <Text style={tablePage.headerCellText}>{t('annual.objectives')}</Text>
        </View>
        <View style={[tablePage.headerCell, { width: COL_W, backgroundColor: COLORS.tableSabersHead }]}>
          <Text style={tablePage.headerCellText}>{t('annual.curriculum')}</Text>
        </View>
      </View>

      {plans.map((plan) => (
        <View key={plan.id} style={tablePage.row} wrap={false}>
          <View style={[tablePage.weekCell, { borderColor: COLORS.tableSetmanaBorder }]}>
            <Text style={tablePage.weekCellText}>{plan.weekStartDate}</Text>
          </View>
          <View style={[tablePage.bodyCell, { borderColor: COLORS.tableActivitatBorder }]}>
            <Text style={tablePage.bodyCellTitle}>{plan.title}</Text>
            {plan.description?.trim() && (
              <Text style={tablePage.bodyCellText}>{plan.description.trim()}</Text>
            )}
          </View>
          <View style={[tablePage.bodyCell, { borderColor: COLORS.tableObjectiusBorder }]}>
            <Text style={tablePage.bodyCellText}>{plan.aiObjectives || '—'}</Text>
          </View>
          <View style={[tablePage.bodyCell, { borderColor: COLORS.tableSabersBorder }]}>
            <Text style={tablePage.bodyCellText}>{sabersTextForPlan(plan, curriculumById)}</Text>
          </View>
        </View>
      ))}

      <PdfFooter style={tablePage.footer} />
    </Page>
  );
}

interface Props {
  schoolYearName: string;
  entries: WeeklyPlan[];
  subjectById: Map<string, Subject>;
  curriculumById: Map<string, CurriculumRefItem>;
  situationsById: Map<string, LearningSituation>;
  effectiveTerms: Term[];
  t: TFunction;
}

export default function AnnualPlanPdf({
  schoolYearName, entries, subjectById, curriculumById, situationsById, effectiveTerms, t,
}: Props) {
  // Agrupar por asignatura
  const bySubject = new Map<string, WeeklyPlan[]>();
  entries.forEach((e) => {
    const arr = bySubject.get(e.subjectId) ?? [];
    arr.push(e);
    bySubject.set(e.subjectId, arr);
  });

  const pages: ReactElement[] = [];

  bySubject.forEach((plans, subjectId) => {
    const subject = subjectById.get(subjectId);

    // Agrupar en bloques consecutivos por saId, igual que en pantalla.
    const groups: { saId?: string; plans: WeeklyPlan[] }[] = [];
    let lastKey: string | undefined;
    for (const plan of plans) {
      const key = plan.saId || undefined;
      if (key !== lastKey || groups.length === 0) {
        groups.push({ saId: key, plans: [] });
        lastKey = key;
      }
      groups[groups.length - 1].plans.push(plan);
    }

    groups.forEach((group, i) => {
      const situation = group.saId ? situationsById.get(group.saId) : undefined;
      if (situation) {
        pages.push(
          <SaCoverPage
            key={`${subjectId}-${i}-cover`}
            situation={situation}
            plans={group.plans}
            subject={subject}
            effectiveTerms={effectiveTerms}
            schoolYearName={schoolYearName}
            t={t}
          />
        );
        pages.push(
          <SessionsTablePage
            key={`${subjectId}-${i}-table`}
            saPillLabel={situation.name}
            plans={group.plans}
            curriculumById={curriculumById}
            schoolYearName={schoolYearName}
            t={t}
          />
        );
      } else {
        // Actividades sin Situación de Aprendizaje: misma tabla, con el
        // nombre de la asignatura en la pastilla en vez del nombre de la SA.
        pages.push(
          <SessionsTablePage
            key={`${subjectId}-${i}-loose`}
            saPillLabel={subject?.name ?? t('subjects.title')}
            plans={group.plans}
            curriculumById={curriculumById}
            schoolYearName={schoolYearName}
            t={t}
          />
        );
      }
    });
  });

  return <Document>{pages}</Document>;
}
