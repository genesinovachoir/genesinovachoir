import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GA_MEASUREMENT_ID = 'G-XZEK7JQKCM';
const CONSENT_KEY = 'genesi_nova_cookie_consent';

/**
 * CookieConsent — consent-gated analytics loader.
 * GA4 is NOT loaded until the user clicks "Accept".
 * Consent state persists in localStorage.
 */
const CookieConsent = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language || 'tr';
    const [consentState, setConsentState] = useState('pending'); // pending | accepted | dismissed

    useEffect(() => {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored === 'accepted') {
            setConsentState('accepted');
            loadGA();
        } else if (stored === 'dismissed') {
            setConsentState('dismissed');
        }
    }, []);

    const loadGA = () => {
        // Prevent double-loading
        if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) return;

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
        `;
        document.head.appendChild(inlineScript);
    };

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setConsentState('accepted');
        loadGA();
    };

    const handleDismiss = () => {
        localStorage.setItem(CONSENT_KEY, 'dismissed');
        setConsentState('dismissed');
    };

    // Don't show banner if already decided
    if (consentState !== 'pending') return null;

    const texts = {
        tr: {
            message: 'Deneyiminizi geliştirmek için çerezleri kullanıyoruz.',
            accept: 'Kabul Et',
            dismiss: 'Reddet',
        },
        en: {
            message: 'We use cookies to improve your experience.',
            accept: 'Accept',
            dismiss: 'Decline',
        },
    };

    const t = texts[lang] || texts.en;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9998,
                    background: 'rgba(10, 12, 20, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(186, 180, 162, 0.12)',
                    borderRadius: '12px',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    maxWidth: '520px',
                    width: 'calc(100% - 2rem)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
            >
                <p
                    style={{
                        color: 'rgba(186, 180, 162, 0.8)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        margin: 0,
                        flex: 1,
                    }}
                >
                    {t.message}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                        onClick={handleDismiss}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(186, 180, 162, 0.2)',
                            color: 'rgba(186, 180, 162, 0.6)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            transition: 'all 0.2s',
                        }}
                    >
                        {t.dismiss}
                    </button>
                    <button
                        onClick={handleAccept}
                        style={{
                            background: 'rgba(186, 180, 162, 0.15)',
                            border: '1px solid rgba(186, 180, 162, 0.3)',
                            color: '#bab4a2',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                        }}
                    >
                        {t.accept}
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CookieConsent;
