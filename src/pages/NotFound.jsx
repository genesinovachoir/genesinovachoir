import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const NotFound = () => {
    const { lang } = useParams();
    const currentLang = lang === 'en' ? 'en' : 'tr';

    return (
        <div
            style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
        >
            <SEOHead
                title={currentLang === 'tr' ? 'Sayfa Bulunamadı | Genesi Nova' : 'Page Not Found | Genesi Nova'}
                description={currentLang === 'tr' ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.'}
                lang={currentLang}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center' }}
            >
                <div
                    style={{
                        fontSize: '6rem',
                        fontWeight: 200,
                        color: 'rgba(186, 180, 162, 0.15)',
                        lineHeight: 1,
                        marginBottom: '1rem',
                        letterSpacing: '0.1em',
                    }}
                >
                    404
                </div>
                <h1
                    style={{
                        color: '#bab4a2',
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        marginBottom: '1rem',
                    }}
                >
                    {currentLang === 'tr' ? 'Sayfa Bulunamadı' : 'Page Not Found'}
                </h1>
                <p
                    style={{
                        color: 'rgba(186, 180, 162, 0.6)',
                        fontSize: '1rem',
                        marginBottom: '2rem',
                        maxWidth: '400px',
                    }}
                >
                    {currentLang === 'tr'
                        ? 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'
                        : 'The page you are looking for does not exist or may have been moved.'}
                </p>
                <Link
                    to={`/${currentLang}/`}
                    style={{
                        color: '#bab4a2',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                        padding: '0.75rem 2rem',
                        border: '1px solid rgba(186, 180, 162, 0.25)',
                        borderRadius: '6px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {currentLang === 'tr' ? '← Anasayfaya Dön' : '← Back to Home'}
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
