import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { sendPasswordReset } from '@/firebase/auth';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconMail } from '@/components/ui/icons-extra';
import { IconCheck, IconChevronLeft } from '@/components/ui/icons';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cloud px-4">
      <div className="w-full max-w-md card-pastel p-8">
        <Link to="/login" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-accent mb-6">
          <IconChevronLeft size={16} />
          {t('common.back')}
        </Link>

        <h1 className="font-display text-2xl text-accent mb-1">{t('auth.resetPassword')}</h1>
        <p className="text-sm text-ink-soft mb-6">{t('auth.resetPasswordHelp')}</p>

        {sent ? (
          <div className="flex items-start gap-3 bg-mint-50 text-mint-600 rounded-2xl px-4 py-3 text-sm">
            <IconCheck size={18} />
            <span>{t('auth.resetLinkSent')}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              label={t('auth.email')}
              placeholder="profe@centro.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<IconMail size={16} />}
            />
            {error && (
              <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>
            )}
            <Button type="submit" disabled={loading} fullWidth size="lg">
              {t('auth.sendResetLink')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
