import type { ComponentType } from 'react';
import {
  IconHome2, IconTable, IconNotebook, IconFileText,
  IconBooks, IconCalendar, IconLayoutBoard,
} from '@/components/ui/icons';
import { IconClipboard, IconGrades, IconChecklist, IconUsers } from '@/components/ui/icons-extra';

export interface NavItem {
  to: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  key: string; // clave de i18n
}

/** Todas las secciones que se pueden mostrar en el menú (sidebar de escritorio y menú inferior móvil). */
export const ALL_NAV_ITEMS: NavItem[] = [
  { to: '/', icon: IconHome2, key: 'nav.dashboard' },
  { to: '/horario', icon: IconTable, key: 'nav.timetable' },
  { to: '/semanal', icon: IconNotebook, key: 'nav.weekly' },
  { to: '/tareas', icon: IconChecklist, key: 'nav.tasks' },
  { to: '/anual', icon: IconFileText, key: 'nav.annual' },
  { to: '/asignaturas', icon: IconBooks, key: 'nav.subjects' },
  { to: '/notas', icon: IconGrades, key: 'nav.grades' },
  { to: '/alumnat', icon: IconUsers, key: 'nav.students' },
  { to: '/comentarios', icon: IconClipboard, key: 'nav.comments' },
  { to: '/reuniones', icon: IconCalendar, key: 'nav.meetings' },
  { to: '/mural', icon: IconLayoutBoard, key: 'nav.mural' },
];

/** Selección por defecto del menú inferior móvil (4 accesos rápidos; el resto de secciones queda en el botón "todo el menú"). */
export const DEFAULT_MOBILE_NAV = ['/', '/horario', '/semanal', '/asignaturas'];

// 4 en vez de 5: el quinto hueco de la barra inferior lo ocupa siempre el
// botón fijo que despliega el menú completo (ver MobileMoreMenu en
// AppLayout.tsx), así el docente elige 4 accesos rápidos + acceso a todo.
export const MAX_MOBILE_NAV_ITEMS = 4;
