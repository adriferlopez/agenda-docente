import type { Student, StudentNameFormat, StudentSortMode } from '@/types';

/** Formatea el nombre de un alumno/a según la preferencia elegida por el
 * docente en Notas (apellido-nombre, nombre-apellido o solo nombre). */
export function formatStudentName(
  student: Pick<Student, 'firstName' | 'lastName'>,
  format: StudentNameFormat = 'lastFirst'
): string {
  const { firstName, lastName } = student;
  if (format === 'firstOnly' || !lastName) return firstName;
  if (format === 'firstLast') return `${firstName} ${lastName}`;
  return `${lastName}, ${firstName}`;
}

/** Ordena una lista de alumnos alfabéticamente (apellido, nombre) o según el
 * orden manual guardado (Student.order), con createdAt como fallback. */
export function sortStudents(students: Student[], mode: StudentSortMode): Student[] {
  if (mode === 'manual') {
    return [...students].sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.createdAt - b.createdAt;
    });
  }
  return [...students].sort(
    (a, b) => a.lastName.localeCompare(b.lastName, 'es') || a.firstName.localeCompare(b.firstName, 'es')
  );
}
