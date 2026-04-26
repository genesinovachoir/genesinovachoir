import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import IntroOverlay from '../components/about/IntroOverlay';
import StarfieldBackground from '../components/about/StarfieldBackground';
import { MembersSection } from '../components/about/MembersSection';
import SEOHead from '../components/SEOHead';
import './About.css';

const ABOUT_SECTIONS = ['whoWeAre', 'philosophy', 'approach', 'collective'];

const About = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const currentLang = lang || 'tr';
    const altLang = currentLang === 'tr' ? 'en' : 'tr';
    const [phase, setPhase] = useState('content');
    /* 
    const [phase, setPhase] = useState(() => {
        return sessionStorage.getItem('aboutIntroSeen') === '1' ? 'content' : 'hero';
    });
    */

    // On mount: ensure we stay in sync if needed (though useState init handles it)

    const handlePlayClick = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setPhase('intro');
    };

    const handleIntroComplete = () => {
        setPhase('content');
    };

    const handleReplay = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        sessionStorage.removeItem('aboutIntroSeen');
        setPhase('intro');
    };

    return (
        <div className="about-page">
            <SEOHead
                title={currentLang === 'tr' ? 'Hakkımızda | Genesi Nova Korosu' : 'About Us | Genesi Nova Choir'}
                description={currentLang === 'tr' ? 'Genesi Nova, 2024 yılında İstanbul\'da kurulan bağımsız bir a cappella korosudur. Seslerden doğan bir topluluk.' : 'Genesi Nova is an independent a cappella choir founded in Istanbul in 2024. A collective born from voices.'}
                canonical={`/${currentLang}/about`}
                lang={currentLang}
                altLang={altLang}
                altPath={`/${altLang}/about`}
            />
            {/* =================== HERO STAGE (Temporarily Hidden) =================== */}
            {/* 
            <AnimatePresence>
                {phase === 'hero' && (
                    <motion.section
                        className="about-hero"
                        ...
                    </motion.section>
                )}
            </AnimatePresence>
            */}

            {/* =================== INTRO OVERLAY (Temporarily Hidden) =================== */}
            {/* 
            {phase === 'intro' && (
                <IntroOverlay onComplete={handleIntroComplete} />
            )}
            */}

            {/* =================== ABOUT CONTENT (Rendered Directly for SEO) =================== */}
            <div className="about-content">
                {ABOUT_SECTIONS.map((sectionKey, index) => (
                    <section
                        key={sectionKey}
                        className="about-section"
                    >
                        <span className="about-section-label">
                            {t(`about.${sectionKey}.label`)}
                        </span>
                        <h2 className="about-section-title">
                            {t(`about.${sectionKey}.title`)}
                        </h2>
                        <p className="about-section-body">
                            {t(`about.${sectionKey}.body`)}
                        </p>
                    </section>
                ))}

                {/* Members */}
                <MembersSection />

                {/* Replay (Temporarily Hidden) */}
                {/* 
                <div className="about-replay-wrapper">
                    ...
                </div>
                */}
            </div>
        </div>
    );
};

export default About;
