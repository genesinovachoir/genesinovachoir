import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import tr from './locales/tr.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en.translation,
            },
            tr: {
                translation: tr.translation,
            },
        },
        fallbackLng: 'tr', // Turkish is default
        interpolation: {
            escapeValue: false,
        },
        // Language is now determined by URL, not browser detection.
        // LanguageSync component handles syncing URL → i18n.
        detection: false,
    });

export default i18n;
