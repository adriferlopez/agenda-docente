import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { registerWithEmail, loginWithGoogle } from '@/firebase/auth';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { IconMail, IconLock, IconUser } from '@/components/ui/icons-extra';
import { IconGoogle } from '@/components/ui/IconGoogle';
import AuthHeroPanel from '@/components/auth/AuthHeroPanel';
import type { Language } from '@/types';
import { ETAPES, COMUNITATS, type Etapa, type Comunitat } from '@/data/curriculum/types';

const ETAPA_OPTIONS = ETAPES.map((e) => ({ key: e.value, label: e.label }));

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
  const [comunitat, setComunitat] = useState<Comunitat>('catalunya');
  const [etapas, setEtapas] = useState<Set<string>>(new Set(['primaria']));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!acceptedTerms) {
      setError(t('auth.mustAcceptTerms'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    if (password.length < 8) {
      setError(t('auth.weakPassword'));
      return;
    }
    if (etapas.size === 0) {
      setError(t('auth.etapaRequired'));
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail(email, password, name, language, Array.from(etapas) as Etapa[], comunitat);
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
    if (!acceptedTerms) {
      setError(t('auth.mustAcceptTerms'));
      return;
    }
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
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Panel izquierdo — hero / landing, solo desktop (mismo que LoginPage) */}
      <AuthHeroPanel />

      {/* Panel derecho — formulario de registro */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md card-enter">
        <div className="lg:hidden text-center mb-8">
          <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('app.name')}
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="font-display text-3xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {t('auth.createAccount')}
          </h2>
        </div>

        <label className="flex items-start gap-2 mb-5 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 shrink-0"
          />
          <span>
            {t('auth.acceptTermsPrefix')}{' '}
            <Link to="/legal/terminos" target="_blank" rel="noreferrer" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
              {t('footer.terms')}
            </Link>{' '}
            {t('auth.acceptTermsAnd')}{' '}
            <Link to="/legal/privacidad" target="_blank" rel="noreferrer" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
              {t('footer.privacy')}
            </Link>.
          </span>
        </label>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          size="lg"
          onClick={handleGoogleLogin}
          disabled={googleLoading || !acceptedTerms}
          icon={<IconGoogle size={18} />}
          className="mb-4"
        >
          {t('auth.continueWithGoogle')}
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <span className="h-px flex-1 bg-accent-light" />
          <span className="text-xs text-ink-soft">{t('auth.orContinueWith')}</span>
          <span className="h-px flex-1 bg-accent-light" />
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
          <Select
            label={t('settings.comunitat')}
            value={comunitat}
            onChange={(e) => setComunitat(e.target.value as Comunitat)}
          >
            {COMUNITATS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
          <TagMultiSelect
            label={`${t('settings.etapa')} *`}
            options={ETAPA_OPTIONS}
            selected={etapas}
            onChange={setEtapas}
            placeholder={t('auth.etapaPlaceholder')}
          />
          <p className="text-xs text-ink-soft -mt-2">{t('auth.etapaHelp')}</p>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>
          )}

          <Button type="submit" disabled={loading || !acceptedTerms} fullWidth size="lg">
            {t('auth.register')}
          </Button>
        </form>

        <p className="text-sm text-ink-soft text-center mt-6">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            {t('auth.login')}
          </Link>
        </p>

        <p className="lg:hidden text-[11px] text-center mt-8" style={{ color: 'var(--text-secondary)' }}>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <p className="lg:hidden flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] mt-1.5" style={{ color: 'var(--text-secondary)' }}>
          <Link to="/legal/aviso-legal" className="hover:underline">{t('footer.legalNotice')}</Link>
          <Link to="/legal/privacidad" className="hover:underline">{t('footer.privacy')}</Link>
          <Link to="/legal/cookies" className="hover:underline">{t('footer.cookies')}</Link>
          <Link to="/legal/terminos" className="hover:underline">{t('footer.terms')}</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
