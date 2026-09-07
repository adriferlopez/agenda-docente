import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconHome2, IconTable, IconNotebook, IconFileText, IconBooks, IconCalendar, IconSettings, IconLogout, IconX,
} from '@/components/ui/icons';
import { IconClipboard, IconGrades, IconChecklist, IconMessage } from '@/components/ui/icons-extra';

// ═══════════════════════════════════════════════════════════════════
// AppShowcase — mini-maqueta animada de la app (navegador + mòbil) per
// al panell hero de LoginPage. Reprodueix en bucle una navegació
// simulada (cursor que "clica" al menú, obre Profi, escriu i envia un
// missatge) perquè un visitant no registrat vegi la interfície real
// sense necessitat d'un vídeo.
//
// Mida fixa, SENSE escalat dinàmic (transform:scale + ResizeObserver):
// després de tres rondes fent-lo "més gran" amb diferents trucs d'escala
// (que van acabar desproporcionant el mòbil i el panell de Profi), es
// torna a les proporcions originals que ja funcionaven bé — estables i
// sempre iguals, independentment de l'amplada del panell hero.
// ═══════════════════════════════════════════════════════════════════

type PageId = 'dashboard' | 'horario' | 'notes';

export default function AppShowcase() {
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLDivElement>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const clickRingRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const navRefs = useRef<Record<PageId, HTMLDivElement | null>>({ dashboard: null, horario: null, notes: null });
  const pnRefs = useRef<Record<PageId, HTMLDivElement | null>>({ dashboard: null, horario: null, notes: null });
  const bPageRefs = useRef<Record<PageId, HTMLDivElement | null>>({ dashboard: null, horario: null, notes: null });
  const pPageRefs = useRef<Record<PageId, HTMLDivElement | null>>({ dashboard: null, horario: null, notes: null });

  const bBubbleRef = useRef<HTMLDivElement>(null);
  const bPanelRef = useRef<HTMLDivElement>(null);
  const pPanelRef = useRef<HTMLDivElement>(null);
  const bInputRef = useRef<HTMLDivElement>(null);
  const bInputTextRef = useRef<HTMLSpanElement>(null);
  const bSendRef = useRef<HTMLDivElement>(null);
  const bCloseRef = useRef<HTMLDivElement>(null);
  const bMsgUserRef = useRef<HTMLDivElement>(null);
  const bMsgTypingRef = useRef<HTMLDivElement>(null);
  const bMsgReplyRef = useRef<HTMLDivElement>(null);
  const bQuickRef = useRef<HTMLDivElement>(null);
  const bToolCardRef = useRef<HTMLDivElement>(null);
  const bChipRef = useRef<HTMLDivElement>(null);
  const pMsgUserRef = useRef<HTMLDivElement>(null);
  const pMsgReplyRef = useRef<HTMLDivElement>(null);

  // ── Timeline de la demo ──
  useEffect(() => {
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    function at(ms: number, fn: () => void) {
      timers.push(setTimeout(() => { if (alive) fn(); }, ms));
    }

    function setPage(id: PageId) {
      (Object.keys(bPageRefs.current) as PageId[]).forEach((k) => {
        bPageRefs.current[k]?.classList.toggle('active', k === id);
        pPageRefs.current[k]?.classList.toggle('active', k === id);
        navRefs.current[k]?.classList.toggle('adshow-active', k === id);
        pnRefs.current[k]?.classList.toggle('adshow-active', k === id);
      });
    }

    function moveCursorTo(el: HTMLElement | null) {
      const canvas = canvasRef.current;
      const cur = cursorRef.current;
      if (!el || !canvas || !cur) return;
      const cRect = canvas.getBoundingClientRect();
      const tRect = el.getBoundingClientRect();
      const x = tRect.left + tRect.width / 2 - cRect.left;
      const y = tRect.top + tRect.height / 2 - cRect.top;
      cur.classList.add('adshow-show');
      cur.style.transform = `translate(${x}px,${y}px)`;
    }

    function click() {
      const ring = clickRingRef.current;
      if (!ring) return;
      ring.classList.remove('adshow-go');
      void ring.offsetWidth;
      ring.classList.add('adshow-go');
    }

    function tapRipple(el: HTMLElement | null) {
      if (!el || !el.parentElement) return;
      const rp = document.createElement('div');
      rp.className = 'adshow-ripple adshow-go';
      const pr = el.parentElement.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      rp.style.left = `${r.left - pr.left + r.width / 2 - 14}px`;
      rp.style.top = `${r.top - pr.top + r.height / 2 - 14}px`;
      el.parentElement.appendChild(rp);
      setTimeout(() => rp.remove(), 600);
    }

    function showCaption(text: string) {
      const c = captionRef.current;
      if (!c) return;
      c.textContent = text;
      c.classList.add('adshow-show');
    }
    function hideCaption() {
      captionRef.current?.classList.remove('adshow-show');
    }

    function typeInto(el: HTMLElement | null, text: string, duration: number, cb?: () => void) {
      if (!el) return;
      let i = 0;
      el.textContent = '';
      const step = Math.max(20, duration / text.length);
      const timer = setInterval(() => {
        if (!alive) { clearInterval(timer); return; }
        el.textContent += text[i];
        i += 1;
        if (i >= text.length) { clearInterval(timer); cb?.(); }
      }, step);
      intervals.push(timer);
    }

    function resetVisualState() {
      canvasRef.current?.classList.add('adshow-noanim');
      setPage('dashboard');
      bPanelRef.current?.classList.remove('adshow-open');
      pPanelRef.current?.classList.remove('adshow-open');
      bToolCardRef.current?.classList.remove('adshow-show');
      bMsgUserRef.current?.classList.remove('adshow-show');
      bMsgTypingRef.current?.classList.remove('adshow-show');
      bMsgReplyRef.current?.classList.remove('adshow-show');
      if (bQuickRef.current) bQuickRef.current.style.opacity = '1';
      if (bInputTextRef.current) bInputTextRef.current.textContent = '';
      bInputRef.current?.classList.remove('adshow-focus');
      pMsgUserRef.current?.classList.remove('adshow-show');
      pMsgReplyRef.current?.classList.remove('adshow-show');
      hideCaption();
      cursorRef.current?.classList.remove('adshow-show');
      moveCursorTo(navRefs.current.dashboard);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { canvasRef.current?.classList.remove('adshow-noanim'); });
      });
    }

    const LOOP = 21000;

    function run() {
      if (!alive) return;
      resetVisualState();

      at(900, () => { moveCursorTo(navRefs.current.horario); });
      at(1500, () => {
        click(); setPage('horario'); tapRipple(pnRefs.current.horario);
        showCaption(t('auth.showcase.captionSchedule'));
      });
      at(5100, hideCaption);

      at(5300, () => { moveCursorTo(navRefs.current.notes); });
      at(5900, () => {
        click(); setPage('notes'); tapRipple(pnRefs.current.notes);
        showCaption(t('auth.showcase.captionGrades'));
      });
      at(9300, hideCaption);

      at(9500, () => { moveCursorTo(bBubbleRef.current); });
      at(10100, () => {
        click();
        bPanelRef.current?.classList.add('adshow-open');
        tapRipple(bBubbleRef.current);
        pPanelRef.current?.classList.add('adshow-open');
        showCaption(t('auth.showcase.captionProfi'));
      });

      at(11300, () => { moveCursorTo(bInputRef.current); });
      at(11700, () => { bInputRef.current?.classList.add('adshow-focus'); });
      at(11800, () => { typeInto(bInputTextRef.current, t('auth.showcase.chatPrompt'), 1500); });

      at(13500, () => { moveCursorTo(bSendRef.current); });
      at(13950, () => {
        click();
        bInputRef.current?.classList.remove('adshow-focus');
        if (bInputTextRef.current) bInputTextRef.current.textContent = '';
        bMsgUserRef.current?.classList.add('adshow-show');
        if (bQuickRef.current) bQuickRef.current.style.opacity = '0';
        pMsgUserRef.current?.classList.add('adshow-show');
      });
      at(14200, () => { bMsgTypingRef.current?.classList.add('adshow-show'); });
      at(15300, () => {
        bMsgTypingRef.current?.classList.remove('adshow-show');
        bMsgReplyRef.current?.classList.add('adshow-show');
        pMsgReplyRef.current?.classList.add('adshow-show');
      });

      at(15800, () => { moveCursorTo(bChipRef.current); });
      at(16300, () => { click(); bToolCardRef.current?.classList.add('adshow-show'); hideCaption(); });

      at(18600, () => { moveCursorTo(bCloseRef.current); });
      at(19050, () => {
        click();
        bPanelRef.current?.classList.remove('adshow-open');
        pPanelRef.current?.classList.remove('adshow-open');
        bToolCardRef.current?.classList.remove('adshow-show');
      });

      at(19400, () => { moveCursorTo(navRefs.current.dashboard); });
      at(19900, () => { click(); setPage('dashboard'); tapRipple(pnRefs.current.dashboard); });

      at(LOOP, run);
    }

    run();

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <div className="adshow-viewport">
      <style>{CSS}</style>
      <div ref={canvasRef} className="adshow-canvas">
        <div className="adshow-glow" />
        <div className="adshow-devices">

          {/* ═══ Navegador ═══ */}
          <div className="adshow-browser">
            <div className="adshow-browser-bar"><i /><i /><i /><div className="adshow-url">agenda-docent.app</div></div>
            <div className="adshow-browser-body">
              <div className="adshow-sidebar">
                <div className="adshow-brand">
                  <div className="adshow-logo">{t('app.name')}</div>
                </div>
                <div ref={(el) => { navRefs.current.dashboard = el; }} className="adshow-nav-item adshow-active">
                  <IconHome2 size={11} /><span className="adshow-nav-label">{t('nav.dashboard')}</span>
                </div>
                <div ref={(el) => { navRefs.current.horario = el; }} className="adshow-nav-item">
                  <IconTable size={11} /><span className="adshow-nav-label">{t('nav.timetable')}</span>
                </div>
                <div className="adshow-nav-item"><IconNotebook size={11} /><span className="adshow-nav-label">{t('nav.weekly')}</span></div>
                <div className="adshow-nav-item"><IconChecklist size={11} /><span className="adshow-nav-label">{t('nav.tasks')}</span></div>
                <div className="adshow-nav-item"><IconFileText size={11} /><span className="adshow-nav-label">{t('nav.annual')}</span></div>
                <div className="adshow-nav-item"><IconBooks size={11} /><span className="adshow-nav-label">{t('nav.subjects')}</span></div>
                <div className="adshow-sep" />
                <div ref={(el) => { navRefs.current.notes = el; }} className="adshow-nav-item">
                  <IconGrades size={11} /><span className="adshow-nav-label">{t('nav.grades')}</span>
                </div>
                <div className="adshow-nav-item"><IconClipboard size={11} /><span className="adshow-nav-label">{t('nav.comments')}</span></div>
                <div className="adshow-nav-item"><IconCalendar size={11} /><span className="adshow-nav-label">{t('nav.meetings')}</span></div>
                <div style={{ flex: 1 }} />
                <div className="adshow-sep" />
                <div className="adshow-nav-item adshow-foot"><IconSettings size={11} /><span className="adshow-nav-label">{t('nav.settings')}</span></div>
                <div className="adshow-nav-item adshow-foot"><IconLogout size={11} /><span className="adshow-nav-label">{t('nav.logout')}</span></div>
              </div>

              <div className="adshow-main">
                <div className="adshow-flip-stack">
                  <div ref={(el) => { bPageRefs.current.dashboard = el; }} className="adshow-page adshow-active">
                    <div className="adshow-greet">{t('dashboard.greeting', { name: 'Marta' })}</div>
                    <div className="adshow-sub">2026-2027 · {t('timetable.wednesday')}</div>
                    <div className="adshow-card">
                      <h3><IconCalendarSmall />{t('dashboard.widgetToday')}</h3>
                      <div className="adshow-row" style={{ background: 'var(--sub-sky-50, #F0F9FF)', color: 'var(--sub-sky-600, #0284C7)' }}>
                        <span>08:30</span>{t('nav.subjects')} A
                      </div>
                      <div className="adshow-row" style={{ background: 'var(--sub-lav-50, #F5F3FF)', color: 'var(--sub-lav-600, #7C6AE8)' }}>
                        <span>10:00</span>{t('nav.subjects')} B
                      </div>
                    </div>
                    <div className="adshow-grid2">
                      <div className="adshow-card">
                        <h3><IconChecklist size={12} />{t('dashboard.widgetTasks')}</h3>
                        <div className="adshow-task"><span className="adshow-box" /><span>{t('tasks.ownTasks')}</span></div>
                      </div>
                      <div className="adshow-card">
                        <h3><IconCalendarSmall />{t('dashboard.upcomingMeetings')}</h3>
                        <div className="adshow-meet"><b>01</b><span>{t('nav.meetings')}</span></div>
                      </div>
                    </div>
                  </div>

                  <div ref={(el) => { bPageRefs.current.horario = el; }} className="adshow-page">
                    <div className="adshow-greet" style={{ fontSize: 18 }}>{t('nav.timetable')}</div>
                    <div className="adshow-h-grid">
                      {['sky', 'mint', 'peach', 'lav', 'rose', 'peach', 'sky', 'mint', 'lav', 'butter', 'rose', 'sky', 'butter', 'peach', 'mint'].map((c, i) => (
                        <div key={i} className="adshow-pill" style={{ background: `var(--sub-${c}-50, #eee)`, color: `var(--sub-${c}-600, #333)` }} />
                      ))}
                    </div>
                  </div>

                  <div ref={(el) => { bPageRefs.current.notes = el; }} className="adshow-page">
                    <div className="adshow-greet" style={{ fontSize: 18 }}>{t('nav.grades')}</div>
                    <table className="adshow-table">
                      <tbody>
                        <tr>
                          <th />
                          <th style={{ background: 'var(--sub-mint-50, #ECFDF5)', color: 'var(--sub-mint-600, #0F9D72)' }}>CE1</th>
                          <th style={{ background: 'var(--sub-sky-50, #F0F9FF)', color: 'var(--sub-sky-600, #0284C7)' }}>CE2</th>
                          <th style={{ color: 'var(--accent-text)' }}>{t('dashboard.customize') ? '⌀' : ''}</th>
                        </tr>
                        {[['Marc R.', '8.2', '7.5', '7.9'], ['Laia P.', '6.1', '8.0', '7.1'], ['Nil V.', '9.0', '8.6', '8.8']].map((row) => (
                          <tr key={row[0]}>
                            <td>{row[0]}</td>
                            <td><span className="adshow-badge" style={{ background: 'var(--sub-mint-50, #ECFDF5)', color: 'var(--sub-mint-600, #0F9D72)' }}>{row[1]}</span></td>
                            <td><span className="adshow-badge" style={{ background: 'var(--sub-sky-50, #F0F9FF)', color: 'var(--sub-sky-600, #0284C7)' }}>{row[2]}</span></td>
                            <td><b style={{ color: 'var(--accent)' }}>{row[3]}</b></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Profi (overlay flotant, igual que a l'app) */}
                <div ref={bBubbleRef} className="adshow-profi-bubble"><img src="/profi-avatar.png" alt="Profi" /></div>
                <div ref={bPanelRef} className="adshow-profi-panel">
                  <div className="adshow-p-head">
                    <div className="adshow-who"><img src="/profi-avatar.png" alt="Profi" /><div><div className="adshow-nm">Profi</div><div className="adshow-sb">{t('profi.subtitle')}</div></div></div>
                    <div ref={bCloseRef} className="adshow-x"><IconX size={11} /></div>
                  </div>
                  <div className="adshow-p-tools">
                    <div ref={bChipRef} className="adshow-chip">{t('profi.tools.exam.button')}</div>
                    <div className="adshow-chip">{t('profi.tools.unit.button')}</div>
                    <div className="adshow-chip">{t('profi.tools.analyze.button')}</div>
                  </div>
                  <div className="adshow-p-body">
                    <div className="adshow-msg adshow-bot adshow-welcome">{t('auth.showcase.chatWelcome')}</div>
                    <div ref={bMsgUserRef} className="adshow-msg adshow-user">{t('auth.showcase.chatPrompt')}</div>
                    <div ref={bMsgTypingRef} className="adshow-msg adshow-bot">{t('profi.typing')}</div>
                    <div ref={bMsgReplyRef} className="adshow-msg adshow-bot">{t('auth.showcase.chatReply')}</div>
                    <div ref={bQuickRef} className="adshow-quick">
                      <div>{t('profi.quickOption.examen.label')}</div><div>{t('profi.quickOption.clase.label')}</div>
                    </div>
                  </div>
                  <div className="adshow-p-input">
                    <div ref={bInputRef} className="adshow-fake"><span ref={bInputTextRef} /><span className="adshow-caret" /></div>
                    <div ref={bSendRef} className="adshow-send"><IconMessage size={11} /></div>
                  </div>
                  <div ref={bToolCardRef} className="adshow-tool-card">
                    <div className="adshow-tt">{t('profi.tools.exam.button')}</div>
                    <div className="adshow-btns">
                      <button className="adshow-btn-ghost">{t('profi.tools.exam.downloadWord')}</button>
                      <button className="adshow-btn-acc">{t('profi.tools.exam.save')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Mòbil ═══ */}
          <div className="adshow-phone">
            <div className="adshow-phone-notch" />
            <div className="adshow-phone-screen">
              <div className="adshow-phone-top">{t('app.name')}</div>
              <div className="adshow-phone-body">
                <div ref={(el) => { pPageRefs.current.dashboard = el; }} className="adshow-p-page adshow-active">
                  <div className="adshow-greet" style={{ fontSize: 12 }}>{t('dashboard.greeting', { name: 'Marta' })}</div>
                  <div className="adshow-card adshow-ph-card">
                    <div className="adshow-row adshow-ph-row" style={{ background: 'var(--sub-sky-50, #F0F9FF)', color: 'var(--sub-sky-600, #0284C7)' }}><span>08:30</span>{t('nav.timetable')}</div>
                  </div>
                </div>
                <div ref={(el) => { pPageRefs.current.horario = el; }} className="adshow-p-page">
                  <div className="adshow-greet" style={{ fontSize: 11 }}>{t('nav.timetable')}</div>
                  <div className="adshow-h-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                    {['sky', 'mint', 'peach', 'lav', 'rose', 'butter'].map((c, i) => (
                      <div key={i} className="adshow-pill adshow-ph-pill" style={{ background: `var(--sub-${c}-50, #eee)`, color: `var(--sub-${c}-600, #333)` }} />
                    ))}
                  </div>
                </div>
                <div ref={(el) => { pPageRefs.current.notes = el; }} className="adshow-p-page">
                  <div className="adshow-greet" style={{ fontSize: 11 }}>{t('nav.grades')}</div>
                  <table className="adshow-table adshow-ph-table">
                    <tbody>
                      <tr><td>Marc R.</td><td><span className="adshow-badge" style={{ background: 'var(--sub-mint-50, #ECFDF5)', color: 'var(--sub-mint-600, #0F9D72)' }}>7.9</span></td></tr>
                      <tr><td>Laia P.</td><td><span className="adshow-badge" style={{ background: '#FAEEDA', color: '#854F0B' }}>7.1</span></td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="adshow-profi-bubble adshow-ph-bubble"><img src="/profi-avatar.png" alt="Profi" /></div>
                <div ref={pPanelRef} className="adshow-profi-panel adshow-ph-panel">
                  <div className="adshow-p-head">
                    <div className="adshow-who"><img src="/profi-avatar.png" alt="Profi" /><div><div className="adshow-nm">Profi</div><div className="adshow-sb">{t('profi.subtitle')}</div></div></div>
                  </div>
                  <div className="adshow-p-body">
                    <div className="adshow-msg adshow-bot adshow-welcome">{t('auth.showcase.chatWelcome')}</div>
                    <div ref={pMsgUserRef} className="adshow-msg adshow-user">{t('auth.showcase.chatPrompt')}</div>
                    <div ref={pMsgReplyRef} className="adshow-msg adshow-bot">{t('auth.showcase.chatReply')}</div>
                  </div>
                </div>
              </div>
              <div className="adshow-phone-nav">
                <div ref={(el) => { pnRefs.current.dashboard = el; }} className="adshow-pn adshow-active"><IconHome2 size={13} /></div>
                <div ref={(el) => { pnRefs.current.horario = el; }} className="adshow-pn"><IconTable size={13} /></div>
                <div ref={(el) => { pnRefs.current.notes = el; }} className="adshow-pn"><IconGrades size={13} /></div>
                <div className="adshow-pn"><IconChecklist size={13} /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="adshow-caption-wrap"><div ref={captionRef} className="adshow-caption" /></div>

        <div ref={cursorRef} className="adshow-cursor">
          <svg viewBox="0 0 24 24" fill="white" stroke="var(--text-primary)" strokeWidth="1.3">
            <path d="M4 2l14 12-6 1 3 6-3 1.4-3-6.2L4 21z" />
          </svg>
          <div ref={clickRingRef} className="adshow-click-ring" />
        </div>
      </div>
    </div>
  );
}

function IconCalendarSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

const CSS = `
.adshow-viewport{ display:flex; justify-content:center; }
.adshow-canvas{ position:relative; padding-bottom:56px; }
.adshow-noanim, .adshow-noanim *{ transition:none !important; animation:none !important; }
.adshow-devices{ display:flex; align-items:flex-end; justify-content:center; gap:18px; padding-top:8px; position:relative; z-index:1; }

.adshow-glow{ position:absolute; left:50%; bottom:26px; width:520px; height:200px; transform:translateX(-50%);
  background:radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%); opacity:.22; filter:blur(36px);
  pointer-events:none; z-index:0; transition:background-color .9s ease; }

.adshow-browser{ width:420px; height:300px; background:var(--bg); border-radius:16px; overflow:hidden;
  box-shadow:0 28px 64px -16px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.04); display:flex; flex-direction:column;
  transform:rotateY(6deg); transform-style:preserve-3d; transition:background-color .9s ease; }
.adshow-browser-bar{ height:26px; background:var(--bg-sidebar); display:flex; align-items:center; gap:6px; padding:0 12px; flex-shrink:0; transition:background-color .9s ease; }
.adshow-browser-bar i{ width:7px;height:7px;border-radius:50%; background:var(--bg-sidebar-hover); display:inline-block; }
.adshow-url{ margin-left:8px; background:#fff; border-radius:20px; padding:3px 14px; font-size:10px; color:var(--text-secondary); flex:1; max-width:170px; }
.adshow-browser-body{ flex:1; display:flex; overflow:hidden; position:relative; }

.adshow-sidebar{ width:116px; background:var(--bg-sidebar); flex-shrink:0; padding:10px 8px; display:flex; flex-direction:column; gap:2px; transition:background-color .9s ease; }
.adshow-brand{ padding:0 3px; margin-bottom:8px; }
.adshow-logo{ font-family:var(--font-display); font-weight:700; font-size:15px; color:var(--text-sidebar); line-height:1; transition:color .9s ease; }
.adshow-nav-item{ display:flex; align-items:center; gap:6px; font-size:8px; font-weight:600; line-height:1.2; color:var(--text-sidebar); border-radius:6px; padding:3px 8px; transition:background-color .9s ease, color .9s ease; }
.adshow-nav-item.adshow-active{ background:var(--accent-light); color:var(--accent); }
.adshow-nav-item svg{ flex-shrink:0; }
.adshow-nav-label{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0; }
.adshow-sep{ height:1px; background:var(--bg-sidebar-hover); margin:4px 8px; }
.adshow-nav-item.adshow-foot{ opacity:.85; }

.adshow-main{ flex:1; position:relative; background:var(--bg-card); overflow:hidden; transition:background-color .9s ease; }
.adshow-flip-stack{ position:absolute; inset:0; perspective:900px; }
.adshow-page{ position:absolute; inset:0; padding:13px 15px; overflow:hidden; opacity:0; transform:rotateY(30deg); transform-origin:left center;
  transition:opacity .45s ease, transform .5s cubic-bezier(.22,.85,.32,1.05); pointer-events:none; }
.adshow-page.adshow-active{ opacity:1; transform:rotateY(0deg); pointer-events:auto; }

.adshow-greet{ font-family:var(--font-display); font-size:21px; color:var(--accent-text); font-weight:700; transition:color .9s ease; }
.adshow-sub{ font-size:9.5px; color:var(--text-secondary); margin-top:2px; }
.adshow-card{ background:#fff; border:1px solid var(--border); border-radius:11px; padding:8px 9px; margin-top:8px; box-shadow:var(--shadow-card); transition:border-color .9s ease; }
.adshow-card h3{ font-size:10.5px; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:5px; margin-bottom:5px; }
.adshow-row{ display:flex; align-items:center; gap:7px; border-radius:9px; padding:4px 7px; font-size:9.5px; font-weight:600; margin-top:3px; }
.adshow-row span{ font-size:8.5px; font-weight:700; width:30px; flex-shrink:0; opacity:.85; }
.adshow-grid2{ display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px; }
.adshow-task{ display:flex; align-items:center; gap:6px; background:var(--bg-input); border-radius:8px; padding:4px 7px; margin-top:4px; font-size:9px; color:var(--text-primary); }
.adshow-box{ width:9px;height:9px;border-radius:3px; border:1.6px solid var(--accent); flex-shrink:0; display:inline-block; }
.adshow-meet{ display:flex; align-items:center; gap:7px; background:var(--accent-light); border-radius:9px; padding:4px 7px; margin-top:4px; font-size:9px; color:var(--text-primary); }
.adshow-meet b{ color:var(--accent); font-size:10px; }

.adshow-h-grid{ display:grid; grid-template-columns:repeat(5,1fr); gap:6px; margin-top:10px; }
.adshow-pill{ height:19px; border-radius:6px; }

table.adshow-table{ width:100%; border-collapse:collapse; margin-top:8px; font-size:8.5px; }
table.adshow-table th{ font-weight:700; padding:4px 5px; text-align:center; }
table.adshow-table th:first-child{ text-align:left; }
table.adshow-table td{ padding:4px 5px; border-bottom:1px solid var(--border); color:var(--text-primary); text-align:center; }
table.adshow-table td:first-child{ text-align:left; font-weight:600; }
.adshow-badge{ display:inline-block; padding:2px 7px; border-radius:6px; font-weight:700; }

.adshow-profi-bubble{ position:absolute; right:10px; bottom:10px; width:30px; height:30px; border-radius:50%; overflow:hidden;
  background:var(--accent); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 18px -4px rgba(0,0,0,0.35); z-index:5; transition:background-color .9s ease; }
.adshow-profi-bubble img{ width:26px; height:26px; object-fit:cover; }

.adshow-profi-panel{ position:absolute; right:6px; bottom:6px; width:216px; height:208px; background:var(--bg-card);
  border:1px solid var(--border); border-radius:14px; box-shadow:0 22px 52px -10px rgba(0,0,0,0.32);
  display:flex; flex-direction:column; overflow:hidden; z-index:6;
  opacity:0; transform:translateY(10px) scale(.96); transition:opacity .3s ease, transform .35s cubic-bezier(.22,.85,.32,1.05); pointer-events:none; }
.adshow-profi-panel.adshow-open{ opacity:1; transform:translateY(0) scale(1); pointer-events:auto; }
.adshow-p-head{ background:var(--accent); padding:8px 9px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; transition:background-color .9s ease; }
.adshow-who{ display:flex; align-items:center; gap:7px; }
.adshow-who img{ width:22px;height:22px; border-radius:50%; object-fit:cover; border:1px solid rgba(255,255,255,.4); }
.adshow-nm{ color:#fff; font-weight:700; font-size:10px; line-height:1; }
.adshow-sb{ color:rgba(255,255,255,.75); font-size:8px; }
.adshow-x{ width:16px;height:16px; border-radius:6px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,.85); }
.adshow-p-tools{ display:flex; gap:4px; padding:6px 7px; overflow:hidden; border-bottom:1px solid var(--border); flex-shrink:0; }
.adshow-chip{ font-size:7.5px; font-weight:600; border-radius:999px; padding:3.5px 7px; background:var(--bg-input); color:var(--text-primary); border:1px solid var(--border); white-space:nowrap; }
.adshow-p-body{ flex:1; padding:7px 7px; display:flex; flex-direction:column; gap:5px; overflow:hidden; }
.adshow-msg{ max-width:82%; padding:5px 8px; font-size:8.5px; line-height:1.35; opacity:0; transform:translateY(4px); transition:opacity .3s ease, transform .3s ease; }
.adshow-msg.adshow-bot{ background:var(--bg-input); color:var(--text-primary); border:1px solid var(--border); border-radius:10px 10px 10px 2px; align-self:flex-start; }
.adshow-msg.adshow-user{ background:var(--accent); color:#fff; border-radius:10px 10px 2px 10px; align-self:flex-end; transition:background-color .9s ease, opacity .3s ease, transform .3s ease; }
.adshow-msg.adshow-show{ opacity:1; transform:translateY(0); }
.adshow-msg.adshow-welcome{ opacity:1; transform:none; }
.adshow-quick{ display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-top:auto; }
.adshow-quick div{ font-size:7px; font-weight:600; text-align:left; padding:4px 6px; border-radius:7px; background:var(--bg-input); border:1px solid var(--border); color:var(--text-primary); }
.adshow-p-input{ display:flex; align-items:center; gap:6px; padding:7px 7px; border-top:1px solid var(--border); flex-shrink:0; }
.adshow-fake{ flex:1; font-size:8.5px; color:var(--text-primary); background:var(--bg-input); border:1px solid var(--border-input); border-radius:8px; padding:5px 7px; min-height:12px; transition:box-shadow .2s; }
.adshow-fake.adshow-focus{ box-shadow:0 0 0 2px var(--focus-ring, rgba(163,105,67,0.28)); }
.adshow-caret{ display:inline-block; width:1px; height:8px; background:var(--text-primary); margin-left:1px; animation:adshow-blink .9s step-end infinite; vertical-align:middle; }
@keyframes adshow-blink{ 50%{ opacity:0; } }
.adshow-send{ width:20px; height:20px; border-radius:7px; background:var(--accent); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#fff; transition:background-color .9s ease; }

.adshow-tool-card{ position:absolute; left:6px; right:6px; bottom:6px; top:64px; background:var(--bg-card); border:1px solid var(--border);
  border-radius:11px; padding:8px 9px; box-shadow:0 -8px 20px -8px rgba(0,0,0,.18); transform:translateY(100%); transition:transform .4s cubic-bezier(.22,.85,.32,1.05); z-index:2; display:flex; flex-direction:column; }
.adshow-tool-card.adshow-show{ transform:translateY(0); }
.adshow-tt{ font-family:var(--font-display); font-size:16px; color:var(--accent-text); font-weight:700; }
.adshow-btns{ display:flex; gap:6px; margin-top:auto; }
.adshow-btns button{ font-size:7.5px; font-weight:700; border-radius:7px; padding:4.5px 7px; }
.adshow-btn-ghost{ background:transparent; border:1px solid var(--border); color:var(--text-secondary); }
.adshow-btn-acc{ background:var(--accent); color:#fff; }

.adshow-phone{ width:118px; height:246px; background:#0e0b08; border-radius:26px; padding:6px; box-shadow:0 24px 56px -16px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.06); transform:rotateY(-10deg); transform-style:preserve-3d; }
.adshow-phone-screen{ width:100%; height:100%; background:var(--bg-card); border-radius:20px; overflow:hidden; position:relative; display:flex; flex-direction:column; }
.adshow-phone-notch{ position:absolute; top:13px; left:50%; transform:translateX(-50%); width:34px; height:8px; background:#0e0b08; border-radius:999px; z-index:8; box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08); }
.adshow-phone-top{ height:26px; flex-shrink:0; background:var(--bg-sidebar); display:flex; align-items:flex-end; justify-content:center; padding-bottom:4px; font-family:var(--font-display); font-weight:700; font-size:11px; color:var(--text-sidebar); transition:background-color .9s ease, color .9s ease; }
.adshow-phone-body{ flex:1; position:relative; overflow:hidden; }
.adshow-p-page{ position:absolute; inset:0; padding:9px 10px; overflow:hidden; opacity:0; transform:rotateY(30deg); transform-origin:left center;
  transition:opacity .45s ease, transform .5s cubic-bezier(.22,.85,.32,1.05); pointer-events:none; }
.adshow-p-page.adshow-active{ opacity:1; transform:rotateY(0deg); pointer-events:auto; }
.adshow-phone-nav{ height:30px; flex-shrink:0; background:#fff; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-around; padding:0 6px; position:relative; }
.adshow-pn{ width:20px;height:20px; border-radius:6px; display:flex; align-items:center; justify-content:center; color:var(--text-secondary); transition:background-color .9s ease, color .9s ease; }
.adshow-pn.adshow-active{ background:var(--accent-light); color:var(--accent); }
.adshow-ph-bubble{ width:18px;height:18px; }
.adshow-ph-bubble img{ width:15px;height:15px; }
.adshow-ph-card{ padding:6px 7px; border-radius:9px; }
.adshow-ph-row{ padding:3px 6px; font-size:7.5px; }
.adshow-ph-row span{ font-size:7px; width:24px; }
.adshow-ph-pill{ height:14px; border-radius:5px; }
.adshow-ph-table{ font-size:7px; }
.adshow-ph-panel{ inset:0; right:auto; bottom:auto; width:100%; height:100%; border-radius:0; transform:translateY(100%) scale(1); }
.adshow-ph-panel.adshow-open{ transform:translateY(0) scale(1); }

.adshow-ripple{ position:absolute; width:34px; height:34px; border-radius:50%; background:var(--accent); opacity:0; transform:scale(0.3); pointer-events:none; }
.adshow-ripple.adshow-go{ animation:adshow-rippleAnim .55s ease-out forwards; }
@keyframes adshow-rippleAnim{ 0%{ opacity:.5; transform:scale(.3);} 100%{ opacity:0; transform:scale(2);} }

.adshow-caption-wrap{ position:absolute; left:0; right:0; bottom:0; display:flex; align-items:center; justify-content:center; pointer-events:none; height:40px; }
.adshow-caption{ font-size:15px; font-weight:600; letter-spacing:.01em; color:var(--text-sidebar); text-align:center; opacity:0; transform:translateY(4px); transition:opacity .4s ease, transform .4s ease, color .9s ease; }
.adshow-caption.adshow-show{ opacity:1; transform:translateY(0); }

.adshow-cursor{ position:absolute; top:0; left:0; width:0; height:0; z-index:20; opacity:0; transition:opacity .25s ease, transform .55s cubic-bezier(.4,0,.2,1); pointer-events:none; }
.adshow-cursor.adshow-show{ opacity:1; }
.adshow-cursor svg{ width:19px; height:19px; filter:drop-shadow(0 1px 3px rgba(0,0,0,.4)); transform:translate(-2px,-1px); }
.adshow-click-ring{ position:absolute; top:0; left:0; width:22px; height:22px; margin:-11px 0 0 -11px; border-radius:50%; border:2px solid var(--accent); opacity:0; }
.adshow-click-ring.adshow-go{ animation:adshow-clickRing .5s ease-out forwards; }
@keyframes adshow-clickRing{ 0%{ opacity:.9; transform:scale(.3);} 100%{ opacity:0; transform:scale(1.9);} }

@media (prefers-reduced-motion: reduce){
  .adshow-canvas *{ transition-duration:.01ms !important; animation-duration:.01ms !important; }
}
`;
