import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import SEOHead from '../components/SEOHead';
import { MEDIA_EVENTS } from '../data/mediaEvents';
import './Media.css';

const Media = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const currentLang = lang || 'tr';
    const altLang = currentLang === 'tr' ? 'en' : 'tr';

    const seoTitle = currentLang === 'tr'
        ? 'Medya | Genesi Nova Korosu'
        : 'Media | Genesi Nova Choir';
    const seoDesc = currentLang === 'tr'
        ? 'Sesin, anda olmanın ve paylaşılan deneyimlerin yaşayan bir arşivi.'
        : 'A living archive of voice, presence, and shared moments.';

    return (
        <div className="media-page">
            <SEOHead
                title={seoTitle}
                description={seoDesc}
                canonical={`/${currentLang}/media`}
                lang={currentLang}
                altLang={altLang}
                altPath={`/${altLang}/media`}
            />

            <section className="media-hero">
                <div className="container">
                    <motion.div
                        className="media-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="media-eyebrow">{t('media.hero.eyebrow')}</span>
                        <h1 className="media-headline">{t('media.hero.headline')}</h1>
                        <p className="media-subtitle">{t('media.hero.subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            <section className="media-grid-section">
                <div className="container">
                    <div className="media-grid">
                        <AnimatePresence mode="popLayout">
                            {MEDIA_EVENTS.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Link
                                        to={`/${currentLang}/media/${event.slug}`}
                                        style={{ textDecoration: 'none', display: 'block' }}
                                    >
                                        <div className="media-card">
                                            <div className="media-thumb-wrapper">
                                                <OptimizedImage
                                                    src={event.images[0]}
                                                    alt={t(event.titleKey)}
                                                    className="media-thumb"
                                                    imgStyle={event.coverPosition ? { objectPosition: event.coverPosition } : {}}
                                                />
                                            </div>
                                            <div className="event-info-snippet">
                                                <span className="media-category">{t(event.categoryKey)}</span>
                                                <h3 className="media-item-title">{t(event.titleKey)}</h3>
                                                <div className="event-meta">
                                                    <span className="event-date">{t(event.dateKey)}</span>
                                                    <span className="media-cta-hint">{t('media.view_event')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Media;
