import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthListener } from '@/hooks/useAuthListener';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import DashboardPage from '@/pages/DashboardPage';
import SchoolYearPage from '@/pages/SchoolYearPage';
import TimetablePage from '@/pages/TimetablePage';
import WeeklyPlanningPage from '@/pages/WeeklyPlanningPage';
import MeetingsPage from '@/pages/MeetingsPage';
import SettingsPage from '@/pages/SettingsPage';

// Páginas con dependencias pesadas (xlsx, react-pdf) se cargan de forma diferida
const AnnualPlanningPage = lazy(() => import('@/pages/AnnualPlanningPage'));
const SubjectsPage = lazy(() => import('@/pages/SubjectsPage'));
const StudentsPage = lazy(() => import('@/pages/StudentsPage'));
const CommentsPage = lazy(() => import('@/pages/CommentsPage'));
const GradesPage = lazy(() => import('@/pages/GradesPage'));

function PageFallback() {
  return <div className="text-sm text-ink-soft p-4">Cargando...</div>;
}

function AppRoutes() {
  useAuthListener();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/recuperar" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/curso" element={<SchoolYearPage />} />
          <Route path="/horario" element={<TimetablePage />} />
          <Route path="/semanal" element={<WeeklyPlanningPage />} />
          <Route path="/reuniones" element={<MeetingsPage />} />
          <Route
            path="/anual"
            element={
              <Suspense fallback={<PageFallback />}>
                <AnnualPlanningPage />
              </Suspense>
            }
          />
          <Route
            path="/asignaturas"
            element={
              <Suspense fallback={<PageFallback />}>
                <SubjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/alumnos"
            element={
              <Suspense fallback={<PageFallback />}>
                <StudentsPage />
              </Suspense>
            }
          />
          <Route
            path="/comentarios"
            element={
              <Suspense fallback={<PageFallback />}>
                <CommentsPage />
              </Suspense>
            }
          />
          <Route
            path="/notas"
            element={
              <Suspense fallback={<PageFallback />}>
                <GradesPage />
              </Suspense>
            }
          />
          <Route path="/ajustes" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
