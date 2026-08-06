import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuthStore } from '@/store/authStore';
import { saveGeminiApiKey, removeGeminiApiKey } from '@/services/ai';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { IconLock, IconCheck } from '@/components/ui/icons';
import type { Language } from '@/types';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'ca', label: 'Català' },
  { value: 'en', label: 'English' },
  { value: 'eu', label: 'Euskara' },
  { value: 'gl', label: 'Galego' },
];

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <h1 className="font-display text-2xl text-lav-600">{t('settings.title')}</h1>

      {/* Idioma y corrector */}
      <Card className="flex flex-col gap-4">
        <h2 className="font-display text-lg text-ink">{t('settings.language')}</h2>
        <Select
          value={profile?.language ?? 'es'}
          onChange={async (e) => {
            const lang = e.target.value as Language;
            i18n.changeLanguage(lang);
            if (user) {
              await updateDoc(doc(db, 'users', user.uid), { language: lang });
              if (profile) setProfile({ ...profile, language: lang });
            }
          }}
          className="max-w-xs"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </Select>
        <div className="flex items-start gap-2 text-sm text-ink-soft bg-lav-50 rounded-2xl p-3">
          <IconCheck size={16} className="mt-0.5 shrink-0 text-lav-600" />
          <div>
            <p className="font-medium text-ink">{t('settings.spellcheck')}</p>
            <p className="text-xs">{t('settings.spellcheckHelp')}</p>
          </div>
        </div>
      </Card>

      {/* IA / Gemini */}
      <GeminiKeyCard />

      {/* Seguridad */}
      <Card className="flex flex-col gap-3">
        <h2 className="font-display text-lg text-ink">{t('settings.security')}</h2>
        <p className="text-sm text-ink-soft">{profile?.email}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" icon={<IconLock size={16} />}>
            {t('settings.changePassword')}
          </Button>
          <Button variant="danger">{t('settings.deleteAccount')}</Button>
        </div>
        <p className="text-xs text-ink-soft">{t('settings.deleteAccountWarning')}</p>
      </Card>
    </div>
  );
}

function GeminiKeyCard() {
  const { t } = useTranslation();
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setSaving(true);
    try {
      await saveGeminiApiKey(apiKey.trim());
      setApiKey('');
      setSaved(true);
      if (profile) setProfile({ ...profile, hasGeminiKey: true });
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    setSaving(true);
    try {
      await removeGeminiApiKey();
      if (profile) setProfile({ ...profile, hasGeminiKey: false });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="font-display text-lg text-ink">{t('settings.ai')}</h2>
      <p className="text-sm text-ink-soft">{t('settings.geminiKeyHelp')}</p>

      {profile?.hasGeminiKey ? (
        <div className="flex items-center justify-between gap-3 bg-mint-50 rounded-2xl px-3 py-2.5">
          <span className="text-sm text-mint-600 flex items-center gap-2">
            <IconCheck size={16} />
            {t('settings.geminiKey')}: •••••••••••••••• (configurada)
          </span>
          <Button size="sm" variant="danger" onClick={handleRemove} disabled={saving}>
            {t('settings.removeKey')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="password"
            placeholder={t('settings.geminiKeyPlaceholder')}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" disabled={saving || !apiKey.trim()} icon={saved ? <IconCheck size={16} /> : <IconLock size={16} />}>
            {saved ? t('settings.geminiKeySaved') : t('settings.saveKey')}
          </Button>
        </form>
      )}
    </Card>
  );
}
