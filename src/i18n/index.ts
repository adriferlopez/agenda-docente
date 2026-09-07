import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import ca from './locales/ca.json';
import en from './locales/en.json';
import eu from './locales/eu.json';
import gl from './locales/gl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      ca: { translation: ca },
      en: { translation: en },
      eu: { translation: eu },
      gl: { translation: gl },
    },
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

// El navegador solo revisa la ortografía con el diccionario del idioma
// declarado en <html lang="...">. El HTML lo trae fijo en "es"; si no lo
// sincronizamos aquí, un docente que use la app en catalán/euskera/gallego/
// inglés tendría el corrector nativo del navegador revisando con el
// diccionario equivocado (o sin diccionario), aunque los textarea tengan
// spellCheck activado.
function syncHtmlLang(lang: string) {
  document.documentElement.lang = lang;
}
syncHtmlLang(i18n.resolvedLanguage ?? 'es');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
