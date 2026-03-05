import React from 'react';
import { useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import HeroSection from '../components/HeroSection';
import ImpactCTA from '../components/ImpactCTA';
import FeaturedPerformance from '../components/FeaturedPerformance';
import EventCalendar from '../components/EventCalendar';
import BlogUpdates from '../components/BlogUpdates';

const Home = () => {
    const { lang } = useParams();
    const currentLang = lang || 'tr';
    const altLang = currentLang === 'tr' ? 'en' : 'tr';

    const seoTitle = currentLang === 'tr'
        ? 'Genesi Nova Korosu | Çok Sesli Koro Topluluğu'
        : 'Genesi Nova Choir | Polyphonic Choir Society';
    const seoDesc = currentLang === 'tr'
        ? 'Genesi Nova — İstanbul merkezli bağımsız çağdaş a cappella korosu. Hikâyelerimizin ve müzikal yolculuğumuzun bir parçası olun.'
        : 'Genesi Nova — Independent contemporary a cappella choir based in Istanbul. Read our stories, and join our musical journey.';

    const orgJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Genesi Nova',
        url: 'https://genesinovachoir.com',
        logo: 'https://genesinovachoir.com/genesi_nova.svg',
        sameAs: [
            'https://www.instagram.com/genesi_nova/',
            'http://youtube.com/@GenesiNovaChoir',
            'https://www.linkedin.com/company/genesi-nova-choir/'
        ],
        description: seoDesc,
    };

    return (
        <main>
            <SEOHead
                title={seoTitle}
                description={seoDesc}
                canonical={`/${currentLang}/`}
                lang={currentLang}
                altLang={altLang}
                altPath={`/${altLang}/`}
            />
            <JsonLd data={orgJsonLd} />
            <HeroSection />

            {/* Unified Gradient Wrapper for CTA */}
            <div style={{
                background: 'linear-gradient(to bottom, rgba(5, 6, 10, 0.8) 0%, rgba(20, 25, 45, 0.2) 100%)',
                width: '100%'
            }}>
                <ImpactCTA />
            </div>

            <FeaturedPerformance />
            <EventCalendar />
            <BlogUpdates />
        </main>
    );
};

export default Home;

