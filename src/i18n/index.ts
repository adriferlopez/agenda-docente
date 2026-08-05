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

export default i18n;
