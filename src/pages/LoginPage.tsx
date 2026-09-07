import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { loginWithEmail, loginWithGoogle } from '@/firebase/auth';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconMail, IconEye, IconEyeOff } from '@/components/ui/icons';
import { IconGoogle } from '@/components/ui/IconGoogle';
import AuthHeroPanel from '@/components/auth/AuthHeroPanel';

// Traduce los códigos de error de Firebase Auth más frecuentes a un mensaje
// concreto (en vez de un genérico "no se ha podido iniciar sesión" para
// todo), para que el docente sepa si es la contraseña, demasiados intentos
// fallidos seguidos, o un problema de conexión.
function mapAuthError(err: unknown, t: (key: string) => string): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return t('auth.loginError');
      case 'auth/too-many-requests':
        return t('auth.tooManyRequests');
      case 'auth/network-request-failed':
        return t('auth.networkError');
      case 'auth/user-disabled':
        return t('auth.userDisabled');
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return '';
    }
  }
  return t('auth.genericError');
}

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError(mapAuthError(err, t));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(mapAuthError(err, t));
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Panel izquierdo — hero / landing, solo desktop */}
      <AuthHeroPanel />

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm card-enter">
          <div className="lg:hidden text-center mb-8">
            <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('app.name')}
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('auth.welcomeBack')}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('auth.signInSubtitle')}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            fullWidth
            size="lg"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            icon={<IconGoogle size={18} />}
            className="mb-5"
          >
            {t('auth.continueWithGoogle')}
          </Button>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('auth.orContinueWith')}</span>
            <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label={t('auth.password')}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-9"
                style={{ color: 'var(--text-secondary)' }}
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-sm rounded-xl px-3 py-2" style={{ color: 'var(--danger-text)', background: 'rgba(248,113,113,0.1)' }}>
                {error}
              </p>
            )}

            <div className="flex justify-end -mt-1">
              <Link to="/recuperar" className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button type="submit" disabled={loading} fullWidth size="lg">
              {t('auth.login')}
            </Button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
            {t('auth.noAccount')}{' '}
            <Link to="/registro" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
              {t('auth.register')}
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
