import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { WeeklyPlan, Subject, CurriculumItem } from '@/types';

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: 'Helvetica' },
  title: { fontSize: 18, marginBottom: 4, fontFamily: 'Helvetica-Bold' },
  subtitle: { fontSize: 11, color: '#5B5670', marginBottom: 16 },
  sectionHeader: {
    flexDirection: 'row',
    backgroundColor: '#EDE9FE',
    padding: 6,
    marginTop: 14,
    marginBottom: 6,
    borderRadius: 4,
  },
  sectionHeaderText: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#3C3489' },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E1F5',
    paddingVertical: 6,
  },
  colWeek: { width: '10%', fontSize: 9, color: '#5B5670' },
  colActivity: { width: '28%', fontSize: 9, paddingRight: 4 },
  colObjectives: { width: '27%', fontSize: 9, paddingRight: 4 },
  colCurriculum: { width: '23%', fontSize: 9, paddingRight: 4 },
  colImage: { width: '12%' },
  image: { width: 50, height: 50, objectFit: 'cover', borderRadius: 4 },
  footer: { position: 'absolute', bottom: 20, left: 32, right: 32, fontSize: 8, color: '#9C97AC', textAlign: 'center' },
});

interface Props {
  schoolYearName: string;
  entries: WeeklyPlan[];
  subjectById: Map<string, Subject>;
  curriculumById: Map<string, CurriculumItem>;
}

export default function AnnualPlanPdf({ schoolYearName, entries, subjectById, curriculumById }: Props) {
  // Agrupar por asignatura
  const bySubject = new Map<string, WeeklyPlan[]>();
  entries.forEach((e) => {
    const arr = bySubject.get(e.subjectId) ?? [];
    arr.push(e);
    bySubject.set(e.subjectId, arr);
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <Text style={styles.title}>Programación didáctica anual</Text>
        <Text style={styles.subtitle}>Curso {schoolYearName}</Text>

        {Array.from(bySubject.entries()).map(([subjectId, plans]) => {
          const subject = subjectById.get(subjectId);
          const subjectDetails = subject
            ? [subject.courseLevel, subject.group].filter(Boolean).join(' ')
            : '';
          return (
            <View key={subjectId}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                  {subject ? `${subject.name}${subjectDetails ? ' — ' + subjectDetails : ''}` : 'Asignatura'}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: '#C4B5FD' }}>
                <Text style={[styles.colWeek, { fontFamily: 'Helvetica-Bold' }]}>Semana</Text>
                <Text style={[styles.colActivity, { fontFamily: 'Helvetica-Bold' }]}>Actividad</Text>
                <Text style={[styles.colObjectives, { fontFamily: 'Helvetica-Bold' }]}>Objetivos</Text>
                <Text style={[styles.colCurriculum, { fontFamily: 'Helvetica-Bold' }]}>Saberes</Text>
                <Text style={[styles.colImage, { fontFamily: 'Helvetica-Bold' }]}>Imagen</Text>
              </View>

              {plans.map((plan) => (
                <View key={plan.id} style={styles.row}>
                  <Text style={styles.colWeek}>{plan.weekStartDate}</Text>
                  <Text style={styles.colActivity}>{plan.title}</Text>
                  <Text style={styles.colObjectives}>{plan.aiObjectives || '—'}</Text>
                  <Text style={styles.colCurriculum}>
                    {(plan.curriculumItemIds ?? [])
                      .map((id) => {
                        const item = curriculumById.get(id);
                        return item ? `${item.code ? item.code + ': ' : ''}${item.description}` : null;
                      })
                      .filter(Boolean)
                      .join('\n') || '—'}
                  </Text>
                  <View style={styles.colImage}>
                    {plan.referenceImageUrl ? (
                      <Image style={styles.image} src={plan.referenceImageUrl} />
                    ) : (
                      <Text>—</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          );
        })}

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
}
