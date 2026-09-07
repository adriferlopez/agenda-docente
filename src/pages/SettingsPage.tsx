import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuthStore } from '@/store/authStore';
import { sendPasswordReset, deleteAccountRequest, updateDisplayName, changeEmailRequest } from '@/firebase/auth';
import { saveGeminiApiKey, removeGeminiApiKey, reportIssue, spellcheckText, type ReportIssueType } from '@/services/ai';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { IconLock, IconCheck, IconAlertTriangle, IconSparkles } from '@/components/ui/icons';
import { useOnboardingStore } from '@/store/onboardingStore';
import type { Language, UserProfile } from '@/types';
import { getEffectiveEtapas } from '@/types';
import { ETAPES, COMUNITATS, type Etapa, type Comunitat } from '@/data/curriculum/types';

const ETAPA_OPTIONS = ETAPES.map((e) => ({ key: e.value, label: e.label }));
import { ALL_NAV_ITEMS, DEFAULT_MOBILE_NAV, MAX_MOBILE_NAV_ITEMS } from '@/components/layout/navItems';

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
  const [saveError, setSaveError] = useState(false);

  // Guarda un campo del perfil de forma optimista: actualiza el estado
  // local YA (antes de esperar a Firestore) para que el control nunca
  // "vuelva atrás" visualmente si la escritura tarda o falla — algo muy
  // habitual en móvil con conexión inestable. Si la escritura remota
  // falla, se avisa con un aviso breve en vez de fallar en silencio (antes
  // no había ningún try/catch aquí: un fallo de red simplemente abortaba
  // antes de llegar a setProfile, y el docente veía el cambio "no
  // guardarse" sin ninguna explicación).
  async function saveProfileField(patch: Partial<UserProfile>) {
    if (!user || !profile) return;
    setProfile({ ...profile, ...patch });
    try {
      await updateDoc(doc(db, 'users', user.uid), patch);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-accent">{t('settings.title')}</h1>
        {saveError && (
          <p className="text-xs mt-1 text-rose-600">{t('settings.saveError')}</p>
        )}
      </div>

      {/* Idioma y corrector */}
      <Card className="flex flex-col gap-4">
        <h2 className="font-display text-lg text-ink">{t('settings.language')}</h2>
        <Select
          value={profile?.language ?? 'es'}
          onChange={(e) => {
            const lang = e.target.value as Language;
            i18n.changeLanguage(lang);
            saveProfileField({ language: lang });
          }}
          className="max-w-xs"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </Select>
        <div className="flex items-start gap-2 text-sm rounded-2xl p-3" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
          <IconCheck size={16} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('settings.spellcheck')}</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.spellcheckHelp')}</p>
          </div>
        </div>
      </Card>

      {/* Etapa i comunitat (per filtrar els saberes curriculars) */}
      <Card className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-lg text-ink">{t('settings.etapaComunitatTitle')}</h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {t('settings.etapaComunitatHelp')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TagMultiSelect
            label={t('settings.etapa')}
            options={ETAPA_OPTIONS}
            selected={new Set(getEffectiveEtapas(profile))}
            onChange={(next) => {
              const etapas = (next.size > 0 ? Array.from(next) : ['primaria']) as Etapa[];
              saveProfileField({ etapas });
            }}
          />
          <Select
            label={t('settings.comunitat')}
            value={profile?.comunitat ?? 'catalunya'}
            onChange={(e) => {
              const comunitat = e.target.value as Comunitat;
              saveProfileField({ comunitat });
            }}
          >
            {COMUNITATS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.etapaHelp')}</p>
      </Card>

      {/* Menú inferior móvil */}
      <MobileNavCard />

      {/* IA / Gemini */}
      <GeminiKeyCard />

      {/* Seguridad */}
      <SecurityCard />

      {/* Reporte de incidencias/sugerencias */}
      <ReportIssueCard />

      {/* Ayuda */}
      <HelpCard />

      {/* Aviso legal */}
      <Card className="flex flex-col gap-2">
        <h2 className="font-display text-lg text-ink">{t('settings.legalTitle')}</h2>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.legalText')}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--accent)' }}>
          <Link to="/legal/aviso-legal" className="hover:underline">{t('footer.legalNotice')}</Link>
          <Link to="/legal/privacidad" className="hover:underline">{t('footer.privacy')}</Link>
          <Link to="/legal/cookies" className="hover:underline">{t('footer.cookies')}</Link>
          <Link to="/legal/terminos" className="hover:underline">{t('footer.terms')}</Link>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </Card>
    </div>
  );
}

function MobileNavCard() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [selected, setSelected] = useState<string[]>(profile?.mobileNavItems?.length ? profile.mobileNavItems : DEFAULT_MOBILE_NAV);
  const [moreSide, setMoreSide] = useState<'left' | 'right'>(profile?.mobileMoreButtonSide ?? 'right');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  // Sincroniza cuando el perfil termina de cargar (llega después del primer render).
  useEffect(() => {
    if (profile?.mobileNavItems?.length) setSelected(profile.mobileNavItems);
    if (profile?.mobileMoreButtonSide) setMoreSide(profile.mobileMoreButtonSide);
  }, [profile?.mobileNavItems, profile?.mobileMoreButtonSide]);

  // Guarda al momento con cada cambio, sin botón "Guardar" aparte: en móvil
  // era fácil tocar los iconos y cerrar la app desde el multitarea sin
  // acordarse de pulsar guardar, con lo que el cambio se perdía sin más.
  async function persist(nextSelected: string[], nextSide: 'left' | 'right') {
    if (!user || nextSelected.length === 0) return;
    setError(false);
    if (profile) setProfile({ ...profile, mobileNavItems: nextSelected, mobileMoreButtonSide: nextSide });
    try {
      await updateDoc(doc(db, 'users', user.uid), { mobileNavItems: nextSelected, mobileMoreButtonSide: nextSide });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      setError(true);
    }
  }

  function toggle(to: string) {
    setSelected((prev) => {
      let next: string[];
      if (prev.includes(to)) {
        if (prev.length <= 1) return prev; // no dejar el menú vacío
        next = prev.filter((x) => x !== to);
      } else {
        if (prev.length >= MAX_MOBILE_NAV_ITEMS) return prev;
        next = [...prev, to];
      }
      persist(next, moreSide);
      return next;
    });
  }

  function changeSide(side: 'left' | 'right') {
    setMoreSide(side);
    persist(selected, side);
  }

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg text-ink">{t('settings.mobileNavTitle')}</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
          {t('settings.mobileNavHelp', { count: MAX_MOBILE_NAV_ITEMS })}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ALL_NAV_ITEMS.map(({ to, icon: Icon, key }) => {
          const checked = selected.includes(to);
          const disabled = !checked && selected.length >= MAX_MOBILE_NAV_ITEMS;
          return (
            <label
              key={to}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm cursor-pointer border ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
              style={{
                borderColor: checked ? 'var(--accent)' : 'var(--border)',
                background: checked ? 'var(--accent-light)' : 'transparent',
                color: checked ? 'var(--accent)' : 'var(--text-primary)',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(to)}
                className="hidden"
              />
              <Icon size={16} />
              {t(key)}
            </label>
          );
        })}
      </div>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        {t('settings.mobileNavSelected', { count: selected.length, max: MAX_MOBILE_NAV_ITEMS })}
      </p>
      <div>
        <p className="text-sm font-medium text-ink mb-1.5">{t('settings.mobileMoreSide')}</p>
        <div className="flex rounded-full p-0.5 w-fit" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
          {(['left', 'right'] as const).map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => changeSide(side)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition ${moreSide === side ? 'bg-accent text-white' : ''}`}
              style={moreSide === side ? undefined : { color: 'var(--text-secondary)' }}
            >
              {t(`settings.mobileMoreSide${side === 'left' ? 'Left' : 'Right'}`)}
            </button>
          ))}
        </div>
      </div>
      {(saved || error) && (
        <p className={`text-xs flex items-center gap-1 ${error ? 'text-rose-600' : 'text-mint-600'}`}>
          {error ? t('settings.saveError') : (<><IconCheck size={12} /> {t('common.saved')}</>)}
        </p>
      )}
    </Card>
  );
}

function GeminiKeyCard() {
  const { t } = useTranslation();
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setSaving(true);
    setError(false);
    try {
      await saveGeminiApiKey(apiKey.trim());
      setApiKey('');
      setSaved(true);
      if (profile) setProfile({ ...profile, hasGeminiKey: true });
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    setSaving(true);
    setError(false);
    try {
      await removeGeminiApiKey();
      if (profile) setProfile({ ...profile, hasGeminiKey: false });
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="font-display text-lg text-ink">{t('settings.ai')}</h2>
      <p className="text-sm text-ink-soft">{t('settings.geminiKeyHelp')}</p>

      <div className="rounded-2xl px-3 py-2.5 bg-accent-light/40 flex flex-col gap-1">
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-accent hover:underline self-start"
        >
          {t('settings.geminiKeyGetLink')}
        </a>
        <p className="text-xs text-ink-soft whitespace-pre-line">{t('settings.geminiKeyGetSteps')}</p>
      </div>

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
        <div className="flex flex-col gap-1.5">
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
          {error && <p className="text-xs text-rose-600">{t('settings.saveError')}</p>}
        </div>
      )}
    </Card>
  );
}

function SecurityCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [sendingReset, setSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(profile?.displayName ?? '');
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  const [changingEmail, setChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailRequestSent, setEmailRequestSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setName(profile?.displayName ?? '');
  }, [profile?.displayName]);

  const isGoogleAccount = user?.providerData?.[0]?.providerId === 'google.com';

  async function handleSaveName() {
    setError('');
    if (!user || !name.trim()) return;
    setSavingName(true);
    try {
      await updateDisplayName(user, name);
      if (profile) setProfile({ ...profile, displayName: name.trim() });
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 3000);
    } catch {
      setError(t('common.error'));
    } finally {
      setSavingName(false);
    }
  }

  async function handleChangePassword() {
    setError('');
    if (isGoogleAccount) {
      setError(t('settings.changePasswordGoogleError'));
      return;
    }
    if (!profile?.email) return;
    setSendingReset(true);
    try {
      await sendPasswordReset(profile.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch {
      setError(t('common.error'));
    } finally {
      setSendingReset(false);
    }
  }

  async function handleChangeEmail(e: FormEvent) {
    e.preventDefault();
    setEmailError('');
    if (!user || !newEmail.trim() || !currentPassword) return;
    setSavingEmail(true);
    try {
      await changeEmailRequest(user, currentPassword, newEmail.trim());
      setEmailRequestSent(true);
      setNewEmail('');
      setCurrentPassword('');
    } catch (err) {
      const code = (err as { code?: string })?.code ?? '';
      // "auth/email-already-in-use" deliberadamente NO tiene su propio mensaje:
      // decir explícitamente "ese correo ya está en uso" permitiría a
      // cualquier cuenta ya registrada comprobar si un email concreto tiene
      // cuenta en la app, probando a "cambiarse" a él (enumeración de
      // cuentas). Con el mensaje genérico de abajo, el resultado se ve igual
      // exista o no esa cuenta.
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setEmailError(t('settings.changeEmailWrongPassword'));
      } else if (code === 'auth/invalid-email') {
        setEmailError(t('settings.changeEmailInvalid'));
      } else {
        setEmailError(t('common.error'));
      }
    } finally {
      setSavingEmail(false);
    }
  }

  async function handleDeleteAccount() {
    setError('');
    if (!window.confirm(t('settings.deleteAccountConfirm'))) return;
    setDeleting(true);
    try {
      await deleteAccountRequest();
      navigate('/login');
    } catch {
      setError(t('settings.deleteAccountError'));
      setDeleting(false);
    }
  }

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="font-display text-lg text-ink">{t('settings.security')}</h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink">{t('settings.name')}</label>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('settings.namePlaceholder')}
            className="max-w-xs"
          />
          <Button
            variant="secondary"
            onClick={handleSaveName}
            disabled={savingName || !name.trim() || name.trim() === (profile?.displayName ?? '')}
          >
            {nameSaved ? <IconCheck size={16} /> : savingName ? t('common.loading') : t('common.save')}
          </Button>
        </div>
      </div>

      <p className="text-sm text-ink-soft">{profile?.email}</p>

      {isGoogleAccount ? (
        <p className="text-xs text-ink-soft">{t('settings.changeEmailGoogleError')}</p>
      ) : emailRequestSent ? (
        <p className="text-xs flex items-center gap-1.5 text-mint-600">
          <IconCheck size={14} className="shrink-0" />
          {t('settings.changeEmailSent')}
        </p>
      ) : changingEmail ? (
        <form onSubmit={handleChangeEmail} className="flex flex-col gap-2 rounded-2xl px-3 py-3" style={{ background: 'var(--bg-input)' }}>
          <p className="text-xs text-ink-soft">{t('settings.changeEmailHelp')}</p>
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={t('settings.changeEmailNewPlaceholder')}
            autoComplete="email"
            required
          />
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder={t('settings.changeEmailPasswordPlaceholder')}
            autoComplete="current-password"
            required
          />
          {emailError && (
            <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--danger-text)' }}>
              <IconAlertTriangle size={14} className="shrink-0" />
              {emailError}
            </p>
          )}
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={savingEmail || !newEmail.trim() || !currentPassword}>
              {savingEmail ? t('common.loading') : t('settings.changeEmailSubmit')}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => { setChangingEmail(false); setEmailError(''); }}>
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" size="sm" onClick={() => setChangingEmail(true)} className="self-start">
          {t('settings.changeEmail')}
        </Button>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          icon={<IconLock size={16} />}
          onClick={handleChangePassword}
          disabled={sendingReset}
        >
          {resetSent ? t('settings.changePasswordSent') : t('settings.changePassword')}
        </Button>
        <Button variant="danger" onClick={handleDeleteAccount} disabled={deleting}>
          {deleting ? t('common.loading') : t('settings.deleteAccount')}
        </Button>
      </div>
      {error && (
        <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--danger-text)' }}>
          <IconAlertTriangle size={14} className="shrink-0" />
          {error}
        </p>
      )}
      <p className="text-xs text-ink-soft">{t('settings.deleteAccountWarning')}</p>
    </Card>
  );
}

function HelpCard() {
  const { t } = useTranslation();
  const openTour = useOnboardingStore((s) => s.openTour);

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="font-display text-lg text-ink">{t('settings.help')}</h2>
      <p className="text-sm text-ink-soft">{t('settings.helpText')}</p>
      <Button variant="secondary" size="sm" onClick={openTour} className="self-start">
        {t('onboarding.reopen')}
      </Button>
    </Card>
  );
}

function ReportIssueCard() {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState<ReportIssueType>('bug');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'clean' | 'fixed' | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setError('');
    try {
      await reportIssue({ type, message: message.trim() });
      setMessage('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setSending(false);
    }
  }

  // Corrector ortográfico y gramatical con IA (Gemini, vía Cloud Function
  // 'spellcheckText'): revisa el texto entero y lo sustituye por la versión
  // corregida. Es un corrector de "todo el texto de una vez", no un
  // subrayado interactivo palabra por palabra como el de Word — esto
  // último exigiría una interfaz mucho más grande (resaltado en vivo,
  // menú de sugerencias por palabra, sinónimos). Se puede valorar como
  // siguiente paso si hace falta.
  async function handleSpellcheck() {
    if (!message.trim() || checking) return;
    setChecking(true);
    setCheckResult(null);
    setError('');
    try {
      const { corrected, hasErrors } = await spellcheckText({ text: message, language: i18n.language });
      if (hasErrors && corrected.trim()) {
        setMessage(corrected);
        setCheckResult('fixed');
      } else {
        setCheckResult('clean');
      }
      setTimeout(() => setCheckResult(null), 4000);
    } catch {
      setError(t('common.error'));
    } finally {
      setChecking(false);
    }
  }

  return (
    <Card className="flex flex-col gap-3">
      <div>
        <h2 className="font-display text-lg text-ink">{t('settings.reportTitle')}</h2>
        <p className="text-sm text-ink-soft mt-0.5">{t('settings.reportHelp')}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Select
          label={t('settings.reportType')}
          value={type}
          onChange={(e) => setType(e.target.value as ReportIssueType)}
          className="max-w-xs"
        >
          <option value="suggestion">{t('settings.reportTypeSuggestion')}</option>
          <option value="malfunction">{t('settings.reportTypeMalfunction')}</option>
          <option value="bug">{t('settings.reportTypeBug')}</option>
        </Select>
        <Textarea
          label={t('settings.reportMessage')}
          placeholder={t('settings.reportMessagePlaceholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
        <div className="flex items-center gap-2 -mt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSpellcheck}
            disabled={checking || !message.trim()}
            icon={<IconSparkles size={13} />}
          >
            {checking ? t('common.loading') : t('settings.spellcheckAction')}
          </Button>
          {checkResult === 'clean' && (
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.spellcheckClean')}</span>
          )}
          {checkResult === 'fixed' && (
            <span className="text-xs text-accent">{t('settings.spellcheckFixed')}</span>
          )}
        </div>
        {error && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>
        )}
        <Button
          type="submit"
          disabled={sending || !message.trim()}
          icon={sent ? <IconCheck size={16} /> : undefined}
          className="self-start"
        >
          {sent ? t('settings.reportSent') : sending ? t('common.loading') : t('settings.reportSubmit')}
        </Button>
      </form>
    </Card>
  );
}
