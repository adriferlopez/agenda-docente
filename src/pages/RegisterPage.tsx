import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { registerWithEmail, loginWithGoogle } from '@/firebase/auth';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { IconMail, IconLock, IconUser } from '@/components/ui/icons-extra';
import { IconGoogle } from '@/components/ui/IconGoogle';
import type { Language } from '@/types';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'ca', label: 'Català' },
  { value: 'en', label: 'English' },
  { value: 'eu', label: 'Euskara' },
  { value: 'gl', label: 'Galego' },
];

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState<Language>('es');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    if (password.length < 8) {
      setError(t('auth.weakPassword'));
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail(email, password, name, language);
      i18n.changeLanguage(language);
      navigate('/');
    } catch {
      setError(t('auth.registerError'));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    setGoogleLoading(true);
    try {
      const { isNewUser } = await loginWithGoogle();
      if (isNewUser) {
        // El idioma se detectó del navegador al crear el perfil; lo aplicamos también a i18n.
        const navLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
        const supported: Language[] = ['es', 'ca', 'en', 'eu', 'gl'];
        i18n.changeLanguage(supported.includes(navLang as Language) ? navLang : 'es');
      }
      navigate('/');
    } catch (err) {
      if (err instanceof FirebaseError && err.code !== 'auth/popup-closed-by-user') {
        setError(t('common.error'));
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cloud px-4 py-8">
      <div className="w-full max-w-md card-pastel p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-lav-600 mb-1">{t('app.name')}</h1>
          <p className="text-sm text-ink-soft">{t('auth.createAccount')}</p>
        </div>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          size="lg"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          icon={<IconGoogle size={18} />}
          className="mb-4"
        >
          {t('auth.continueWithGoogle')}
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <span className="h-px flex-1 bg-lav-100" />
          <span className="text-xs text-ink-soft">{t('auth.orContinueWith')}</span>
          <span className="h-px flex-1 bg-lav-100" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            label={t('auth.displayName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon={<IconUser size={16} />}
          />
          <Input
            type="email"
            label={t('auth.email')}
            placeholder="profe@centro.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            icon={<IconMail size={16} />}
          />
          <Input
            type="password"
            label={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            icon={<IconLock size={16} />}
          />
          <Input
            type="password"
            label={t('auth.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            icon={<IconLock size={16} />}
          />
          <Select
            label={t('settings.language')}
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </Select>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>
          )}

          <Button type="submit" disabled={loading} fullWidth size="lg">
            {t('auth.register')}
          </Button>
        </form>

        <p className="text-sm text-ink-soft text-center mt-6">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-lav-600 font-semibold hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
