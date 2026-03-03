import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['tr', 'en'];

/**
 * LanguageSync — wrapper component that reads :lang from URL and syncs i18next.
 * If the lang param is invalid, redirects to /tr/.
 */
const LanguageSync = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!SUPPORTED_LANGS.includes(lang)) {
            // Invalid language → redirect to Turkish version
            const restOfPath = location.pathname.replace(/^\/[^/]*/, '');
            navigate(`/tr${restOfPath || '/'}`, { replace: true });
            return;
        }

        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n, navigate, location.pathname]);

    if (!SUPPORTED_LANGS.includes(lang)) {
        return null; // will redirect
    }

    return <Outlet />;
};

export { SUPPORTED_LANGS };
export default LanguageSync;
