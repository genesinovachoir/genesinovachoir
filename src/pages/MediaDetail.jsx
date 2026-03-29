import React, { useState, useEffect, useMemo } from 'react';
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
    const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
    const [visibleImageIndex, setVisibleImageIndex] = useState(0);

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

    const allMedia = useMemo(() => {
        return [
            ...imageFiles.map(src => ({ type: 'image', src })),
            ...videoFiles.map(src => ({ type: 'video', src }))
        ];
    }, [imageFiles, videoFiles]);

    useEffect(() => {
        if (currentMediaIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [currentMediaIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (currentMediaIndex === null) return;
            if (e.key === 'Escape') {
                setCurrentMediaIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setCurrentMediaIndex(prev => (prev > 0 ? prev - 1 : allMedia.length - 1));
            } else if (e.key === 'ArrowRight') {
                setCurrentMediaIndex(prev => (prev < allMedia.length - 1 ? prev + 1 : 0));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentMediaIndex, allMedia]);

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
                    <div style={{ position: 'relative' }}>
                        <div 
                            className="media-detail-gallery"
                            onScroll={(e) => {
                                const scrollLeft = e.target.scrollLeft;
                                const width = e.target.clientWidth;
                                const index = Math.round(scrollLeft / width);
                                if (index !== visibleImageIndex) {
                                    setVisibleImageIndex(index);
                                }
                            }}
                        >
                            {imageFiles.map((src, idx) => (
                                <div
                                    key={idx}
                                    className="media-detail-gallery-item"
                                    onClick={() => setCurrentMediaIndex(idx)}
                                >
                                    <OptimizedImage
                                        src={src}
                                        alt={`${title} - ${idx + 1}`}
                                        className="media-thumb"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Dots Indicator (Mobile Only) */}
                        {imageFiles.length > 1 && (
                            <div className="media-detail-gallery-dots">
                                {imageFiles.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        style={{
                                            width: '6px', 
                                            height: '6px', 
                                            borderRadius: '50%',
                                            background: idx === visibleImageIndex ? '#bab4a2' : 'rgba(186,180,162,0.3)',
                                            transition: 'background 0.3s ease'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
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
                        <div style={{ position: 'relative' }}>
                            <div className="media-detail-gallery">
                                {videoFiles.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="media-detail-gallery-item"
                                        style={{
                                            position: 'relative',
                                            background: '#0a0b12',
                                            aspectRatio: '16/9',
                                        }}
                                        onClick={() => setCurrentMediaIndex(imageFiles.length + idx)}
                                    >
                                        <video
                                            src={src}
                                            preload="metadata"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                            muted
                                            playsInline
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'rgba(0,0,0,0.2)',
                                            transition: 'background 0.3s ease'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                background: 'rgba(0,0,0,0.5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(4px)'
                                            }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}>
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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

            {/* Unified Lightbox Overlay */}
            <AnimatePresence>
                {currentMediaIndex !== null && allMedia[currentMediaIndex] && (
                    <motion.div
                        className="fullscreen-gallery-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentMediaIndex(null);
                        }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.95)',
                            zIndex: 9999,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            touchAction: 'none'
                        }}
                    >
                        {/* Close button */}
                        <button
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                color: 'white',
                                cursor: 'pointer',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                padding: '0.75rem',
                                borderRadius: '50%',
                                display: 'flex',
                                transition: 'background 0.2s ease',
                                zIndex: 10001
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentMediaIndex(null);
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentMediaIndex}
                                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    drag
                                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                    dragElastic={0.8}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipeConfidenceThreshold = 10000;
                                        const swipePowerX = Math.abs(offset.x) * velocity.x;

                                        // Vertical swipe -> Close
                                        if (Math.abs(offset.y) > 100 && Math.abs(offset.y) > Math.abs(offset.x)) {
                                            setCurrentMediaIndex(null);
                                        } 
                                        // Horizontal swipe -> Prev/Next
                                        else if (swipePowerX < -swipeConfidenceThreshold) {
                                            setCurrentMediaIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
                                        } else if (swipePowerX > swipeConfidenceThreshold) {
                                            setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
                                        }
                                    }}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        cursor: 'grab'
                                    }}
                                    whileTap={{ cursor: 'grabbing' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {allMedia[currentMediaIndex].type === 'video' ? (
                                        <video
                                            src={allMedia[currentMediaIndex].src}
                                            controls
                                            autoPlay
                                            playsInline
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '85vh',
                                                outline: 'none',
                                                pointerEvents: 'auto',
                                                background: 'black'
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={allMedia[currentMediaIndex].src}
                                            alt="Fullscreen View"
                                            draggable="false"
                                            style={{
                                                maxWidth: '90vw',
                                                maxHeight: '85vh',
                                                objectFit: 'contain',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav buttons Desktop */}
                            {allMedia.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: '2vw',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            color: 'white',
                                            padding: '1rem',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            zIndex: 10001,
                                            display: 'flex',
                                            backdropFilter: 'blur(4px)',
                                            transition: 'background 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentMediaIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
                                        }}
                                        style={{
                                            position: 'absolute',
                                            right: '2vw',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            color: 'white',
                                            padding: '1rem',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            zIndex: 10001,
                                            display: 'flex',
                                            backdropFilter: 'blur(4px)',
                                            transition: 'background 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        <div style={{ position: 'absolute', bottom: '2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                            {currentMediaIndex + 1} / {allMedia.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MediaDetail;
