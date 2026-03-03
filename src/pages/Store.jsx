import React from 'react';
import { useParams } from 'react-router-dom';
import ShopSection from '../components/ShopSection';
import SEOHead from '../components/SEOHead';

const Store = () => {
    const { lang } = useParams();
    const currentLang = lang || 'tr';
    const altLang = currentLang === 'tr' ? 'en' : 'tr';

    return (
        <main className="store-page" style={{
            paddingTop: '200px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <SEOHead
                title={currentLang === 'tr' ? 'Mağaza | Genesi Nova Korosu' : 'Store | Genesi Nova Choir'}
                description={currentLang === 'tr' ? 'Genesi Nova orijinal aranjmanları ve notaları. Mahzen yakında açılıyor.' : 'Genesi Nova original arrangements and scores. The Vault opens soon.'}
                canonical={`/${currentLang}/store`}
                lang={currentLang}
                altLang={altLang}
                altPath={`/${altLang}/store`}
            />
            <ShopSection />
        </main>
    );
};

export default Store;
