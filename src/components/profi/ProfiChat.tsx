import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { profiChat, classifyAiError, type ProfiMessage } from '@/services/ai';
import ProfiToolModal, { PROFI_TOOL_IDS, PROFI_TOOL_ICONS, type ProfiToolId } from '@/components/profi/ProfiTools';

// Escapa HTML antes de aplicar el markdown, para que un mensaje (propio o
// de la IA) que contenga "<script>", "<img onerror=...>", etc. se muestre
// como texto literal en vez de ejecutarse. Sin esto, dangerouslySetInnerHTML
// más abajo sería una vía de XSS si el texto llegase a incluir HTML/JS.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/^## (.+)$/gm, '<p style="font-weight:700;font-size:0.8rem;margin-top:0.5rem;margin-bottom:0.25rem">$1</p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:1rem;list-style:disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul style="margin:0.25rem 0">${m}</ul>`)
    .replace(/\n/g, '<br/>');
}

const QUICK_OPTION_IDS = ['clase', 'frases', 'examen'] as const;

export default function ProfiChat() {
  const { t } = useTranslation();
  const profile = useAuthStore((s) => s.profile);
  const language = profile?.language ?? 'es';

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ProfiMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [activeTool, setActiveTool] = useState<ProfiToolId | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const QUICK_OPTIONS = QUICK_OPTION_IDS.map((id) => ({
    id,
    label: t(`profi.quickOption.${id}.label`),
    prompt: t(`profi.quickOption.${id}.prompt`),
  }));

  const WELCOME: ProfiMessage = {
    role: 'assistant',
    content: t('profi.welcome'),
  };

  // Mensajes visibles: si no hay historial, mostramos el de bienvenida
  const visibleMessages = messages.length === 0 ? [WELCOME] : messages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setShowOptions(false);
    const userMsg: ProfiMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const reply = await profiChat(newMessages, language);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[Profi] error al llamar a profiChat:', err);
      // Mostramos el motivo real (código + mensaje del error de Firebase)
      // además del mensaje amigable, para poder diagnosticar sin depender
      // de la consola del navegador.
      const kind = classifyAiError(err);
      const friendly = kind === 'quota' ? t('common.aiQuotaError')
        : kind === 'overloaded' ? t('common.aiOverloadError')
        : t('profi.errorMessage');
      const detail = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: `${friendly}\n\n_(${detail})_`,
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const BOTTOM_OFFSET = 'calc(5rem + env(safe-area-inset-bottom))';

  return (
    <>
      {open && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: BOTTOM_OFFSET,
            right: '1rem',
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(560px, calc(100vh - 12rem))',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px -12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Header — separado del área de mensajes con sombra */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: 'var(--accent)',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 1,
            }}
          >
            <div className="flex items-center gap-2.5">
              <img
                src="/profi-avatar.png"
                alt="Profi"
                className="w-9 h-9 rounded-full object-cover bg-white/20"
                style={{ border: '2px solid rgba(255,255,255,0.4)' }}
              />
              <div>
                <p className="text-white font-bold text-sm leading-none">Profi</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('profi.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => { setMessages([]); setShowOptions(true); }}
                className="p-2 rounded-xl transition hover:bg-white/15"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                title={t('profi.newConversation')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                </svg>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl transition hover:bg-white/15"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                aria-label={t('profi.close')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Herramientas: acciones que van más allá del chat libre (crean o
              leen datos reales de la app), siempre accesibles con un solo
              toque, con independencia de si ya hay conversación empezada. */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto shrink-0"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            {PROFI_TOOL_IDS.map((id) => {
              const Icon = PROFI_TOOL_ICONS[id];
              return (
                <button
                  key={id}
                  onClick={() => setActiveTool(id)}
                  title={t(`profi.tools.${id}.button`)}
                  className="flex items-center gap-1.5 shrink-0 text-xs font-medium rounded-full px-2.5 py-1.5 transition hover:opacity-80"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <Icon size={13} />
                  {t(`profi.tools.${id}.button`)}
                </button>
              );
            })}
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
            {visibleMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <img src="/profi-avatar.png" alt="Profi"
                    className="w-6 h-6 rounded-full shrink-0 mr-2 mt-0.5 object-cover"
                    style={{ border: '1px solid var(--border)' }} />
                )}
                <div
                  className="max-w-[85%] px-3 py-2 text-sm leading-relaxed"
                  style={{
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-input)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                  }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <img src="/profi-avatar.png" alt="Profi"
                  className="w-6 h-6 rounded-full shrink-0 mr-2 mt-0.5 object-cover"
                  style={{ border: '1px solid var(--border)' }} />
                <div className="px-3 py-2 rounded-2xl text-sm"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderBottomLeftRadius: 4 }}>
                  <span className="animate-pulse">{t('profi.typing')}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Opciones rápidas */}
          {showOptions && visibleMessages.length > 0 && (
            <div className="px-3 pb-2 shrink-0">
              <p className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.quickAccess')}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_OPTIONS.map((opt) => (
                  <button key={opt.id} onClick={() => sendMessage(opt.prompt)}
                    className="text-xs text-left px-2.5 py-2 rounded-xl font-medium transition hover:opacity-80"
                    style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('profi.inputPlaceholder')}
                rows={1}
                className="flex-1 resize-none text-sm px-3 py-2 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-input)',
                  color: 'var(--text-primary)',
                  maxHeight: '80px',
                  lineHeight: '1.4',
                }}
                disabled={loading}
              />
              <button onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition disabled:opacity-40"
                style={{ background: 'var(--accent)', color: 'white' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Burbuja flotante: solo visible con el chat cerrado (con el chat
          abierto ya hay una "×" en la cabecera del panel; mostrar las dos a
          la vez hacía que la burbuja quedara encima del área de mensajes). */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 overflow-hidden"
          style={{ right: '1rem', bottom: BOTTOM_OFFSET, background: 'var(--accent)' }}
          aria-label={t('profi.open')}
        >
          <img src="/profi-avatar.png" alt="Profi" className="w-12 h-12 object-cover" />
        </button>
      )}

      {/* Los modales de herramientas se montan con un Portal (ver Modal.tsx),
          así que pueden vivir aquí fuera sin importar el z-index del chat. */}
      {activeTool && <ProfiToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}
    </>
  );
}
