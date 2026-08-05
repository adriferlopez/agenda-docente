import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { loginWithEmail, loginWithGoogle } from '@/firebase/auth';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconMail, IconLock, IconEye, IconEyeOff } from '@/components/ui/icons';
import { IconGoogle } from '@/components/ui/IconGoogle';

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
      if (err instanceof FirebaseError) {
        setError(t('auth.loginError'));
      } else {
        setError(t('common.error'));
      }
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
      if (err instanceof FirebaseError && err.code !== 'auth/popup-closed-by-user') {
        setError(t('common.error'));
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cloud px-4">
      <div className="w-full max-w-md card-pastel p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-lav-600 mb-1">{t('app.name')}</h1>
          <p className="text-sm text-ink-soft">{t('auth.welcomeBack')}</p>
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
              className="absolute right-3 top-9 text-ink-soft"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>
          )}

          <div className="flex justify-end -mt-1">
            <Link to="/recuperar" className="text-xs text-lav-600 hover:underline">
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <Button type="submit" disabled={loading} fullWidth size="lg">
            <IconLock size={18} />
            {t('auth.login')}
          </Button>
        </form>

        <p className="text-sm text-ink-soft text-center mt-6">
          {t('auth.noAccount')}{' '}
          <Link to="/registro" className="text-lav-600 font-semibold hover:underline">
            {t('auth.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
