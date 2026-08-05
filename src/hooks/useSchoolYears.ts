import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { subscribeSchoolYears } from '@/firebase/schoolYears';
import type { SchoolYear } from '@/types';

export function useSchoolYears() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const [years, setYears] = useState<SchoolYear[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeSchoolYears(user.uid, (data) => {
      setYears(data);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const activeYear =
    years.find((y) => y.id === profile?.activeSchoolYearId) ?? years[0] ?? null;

  return { years, activeYear, loading };
}
