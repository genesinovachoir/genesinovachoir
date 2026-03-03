import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getEventBySlug, MEDIA_EVENTS } from '../data/mediaEvents';
import OptimizedImage from '../components/OptimizedImage';
import SEOHead, { DOMAIN } from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import './Media.css';

const MediaDetail = () => {
    const { slug, lang } = useParams();
    const { t } = useTranslation();
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const event = getEventBySlug(slug);

    if (!event) {
        return (
            <div className="media-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#bab4a2', fontSize: '2rem', marginBottom: '1rem' }}>
                        {lang === 'tr' ? 'Etkinlik bulunamadı' : 'Event not found'}
                    </h1>
                    <Link
                        to={`/${lang}/media`}
                        style={{ color: '#a89080', textDecoration: 'underline' }}
                    >
                        {lang === 'tr' ? '← Medya\'ya dön' : '← Back to Media'}
                    </Link>
                </div>
            </div>
        );
    }

    const altLang = lang === 'tr' ? 'en' : 'tr';
    const canonicalPath = `/${lang}/media/${event.slug}`;
    const altPath = `/${altLang}/media/${event.slug}`;
    const meta = event.meta[lang] || event.meta.en;

    const title = t(event.titleKey);
    const category = t(event.categoryKey);
    const date = t(event.dateKey);
    const description = t(event.descriptionKey);

    // Separate images and videos
    const imageFiles = event.images.filter(
        (src) => !src.match(/\.(mov|mp4|webm)$/i)
    );
    const videoFiles = event.images.filter((src) =>
        src.match(/\.(mov|mp4|webm)$/i)
    );

    // JSON-LD Event / CreativeWork structured data
    const eventJsonLd = {
        '@context': 'https://schema.org',
        '@type': event.type === 'performance' ? 'Event' : 'CreativeWork',
        name: title,
        description: meta.description,
        image: imageFiles[0] || '',
        ...(event.type === 'performance'
            ? {
                startDate: event.dateISO,
                location: {
                    '@type': 'Place',
                    name: event.venue,
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: 'İstanbul',
                        addressCountry: 'TR',
                    },
                },
                organizer: {
                    '@type': 'Organization',
                    name: 'Genesi Nova',
                },
                performer: {
                    '@type': 'Organization',
                    name: 'Genesi Nova',
                },
            }
            : {}),
        author: {
            '@type': 'Organization',
            name: 'Genesi Nova',
        },
        url: `${DOMAIN}${canonicalPath}`,
        inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    };

    // Related events (exclude current)
    const relatedEvents = MEDIA_EVENTS.filter((e) => e.id !== event.id);

    return (
        <div className="media-page">
            <SEOHead
                title={meta.title}
                description={meta.description}
                canonical={canonicalPath}
                lang={lang}
                altLang={altLang}
                altPath={altPath}
                image={imageFiles[0]}
                type="article"
            />
            <JsonLd data={eventJsonLd} />

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 24px 80px' }}>
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <Link
                        to={`/${lang}/media`}
                        style={{
                            color: '#bab4a2',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            opacity: 0.7,
                            transition: 'opacity 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = 1)}
                        onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
                    >
                        ← {lang === 'tr' ? 'Medya' : 'Media'}
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span
                        style={{
                            color: '#a89080',
                            fontSize: '0.8rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            display: 'block',
                            marginBottom: '0.75rem',
                        }}
                    >
                        {category}
                    </span>
                    <h1
                        style={{
                            color: '#bab4a2',
                            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                            fontWeight: 300,
                            lineHeight: 1.2,
                            marginBottom: '1rem',
                        }}
                    >
                        {title}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            color: 'rgba(186, 180, 162, 0.6)',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                        }}
                    >
                        <span>{date}</span>
                        <span>•</span>
                        <span>{event.venue}</span>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                        color: 'rgba(186, 180, 162, 0.85)',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        marginBottom: '3rem',
                        maxWidth: '720px',
                    }}
                >
                    {description}
                </motion.p>

                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem',
                        }}
                    >
                        {imageFiles.map((src, idx) => (
                            <div
                                key={idx}
                                style={{
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    aspectRatio: '4/3',
                                }}
                                onClick={() => setSelectedImageIndex(idx)}
                            >
                                <OptimizedImage
                                    src={src}
                                    alt={`${title} - ${idx + 1}`}
                                    className="media-thumb"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Videos */}
                {videoFiles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ marginBottom: '3rem' }}
                    >
                        <h2
                            style={{
                                color: '#bab4a2',
                                fontSize: '1.1rem',
                                fontWeight: 400,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {lang === 'tr' ? 'Videolar' : 'Videos'}
                        </h2>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '1rem',
                            }}
                        >
                            {videoFiles.map((src, idx) => (
                                <video
                                    key={idx}
                                    controls
                                    preload="metadata"
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        background: '#0a0b12',
                                    }}
                                >
                                    <source src={src} />
                                </video>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* External links */}
                {event.links.length > 0 && (
                    <div style={{ marginBottom: '3rem' }}>
                        {event.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#bab4a2',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.05em',
                                    padding: '0.75rem 1.5rem',
                                    border: '1px solid rgba(186, 180, 162, 0.25)',
                                    borderRadius: '6px',
                                    transition: 'all 0.3s ease',
                                    marginRight: '0.75rem',
                                }}
                            >
                                {t(link.labelKey)} →
                            </a>
                        ))}
                    </div>
                )}

                {/* Related events */}
                {relatedEvents.length > 0 && (
                    <section
                        style={{
                            marginTop: '3rem',
                            paddingTop: '3rem',
                            borderTop: '1px solid rgba(186, 180, 162, 0.15)',
                        }}
                    >
                        <h2
                            style={{
                                color: '#bab4a2',
                                fontSize: '1.1rem',
                                fontWeight: 400,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                marginBottom: '2rem',
                            }}
                        >
                            {lang === 'tr' ? 'Diğer Etkinlikler' : 'Other Events'}
                        </h2>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '1.5rem',
                            }}
                        >
                            {relatedEvents.map((relEvent) => (
                                <Link
                                    key={relEvent.id}
                                    to={`/${lang}/media/${relEvent.slug}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="media-card" style={{ cursor: 'pointer' }}>
                                        <div className="media-thumb-wrapper">
                                            <OptimizedImage
                                                src={relEvent.images[0]}
                                                alt={t(relEvent.titleKey)}
                                                className="media-thumb"
                                            />
                                            <div className="media-overlay">
                                                <span className="media-category">
                                                    {t(relEvent.categoryKey)}
                                                </span>
                                                <h3 className="media-item-title">
                                                    {t(relEvent.titleKey)}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImageIndex(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.92)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: '2rem',
                        }}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={imageFiles[selectedImageIndex]}
                            alt={`${title} - fullscreen`}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MediaDetail;
