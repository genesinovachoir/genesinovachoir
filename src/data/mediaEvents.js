/**
 * Media events data extracted from Media.jsx with SEO slugs.
 * Titles/descriptions use i18n keys — the slug is language-independent.
 */
export const MEDIA_EVENTS = [
    {
        id: 'holyween',
        slug: 'holyween',
        titleKey: 'media.events.holyween.title',
        categoryKey: 'media.events.holyween.category',
        dateKey: 'media.events.holyween.date',
        descriptionKey: 'media.events.holyween.description',
        linkKey: 'media.events.holyween.link',
        venue: 'En Passant, Beyoğlu',
        coverPosition: '75% center',
        images: [
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945198/4_tfchzd.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945200/10_zbkzcd.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945202/11_lbchr0.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945202/8_pbopqq.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945201/9_nwobjl.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945200/7_q8k0e5.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945199/6_o9a5tp.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945198/5_g4fqc3.jpg',
            'https://res.cloudinary.com/dfwioqqgc/video/upload/v1766945650/IMG_6199_hvib3p.mov',
            'https://res.cloudinary.com/dfwioqqgc/video/upload/v1766945639/IMG_6171_izcsrn.mov'
        ],
        links: [
            { labelKey: 'media.events.holyween.link', url: 'https://www.instagram.com/p/DQmlndDjIE9/', type: 'primary' }
        ],
        type: 'performance',
        dateISO: '2025-11-01',
        // SEO meta — static strings per language
        meta: {
            en: {
                title: 'Holyween Performance | Genesi Nova',
                description: 'Genesi Nova and Şalter transformed En Passant into a living soundscape. A performance shaped by ritual, presence, and shared listening.'
            },
            tr: {
                title: 'Holyween Performansı | Genesi Nova',
                description: 'Genesi Nova ve Şalter, En Passant\'ı yaşayan bir ses yuvasına dönüştürdü. Ritüel, mevcudiyet ve birlikte dinleme etrafında şekillenen bir performans.'
            }
        }
    },
    {
        id: 'vocal-painting-workshop',
        slug: 'vocal-painting-workshop',
        titleKey: 'media.events.workshop.title',
        categoryKey: 'media.events.workshop.category',
        dateKey: 'media.events.workshop.date',
        descriptionKey: 'media.events.workshop.description',
        linkKey: 'media.events.workshop.link',
        venue: 'Base Gastro Pub, Beyoğlu',
        images: [
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974490/WhatsApp_Image_2026-02-01_at_22.16.27_nv5w0y.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974489/WhatsApp_Image_2026-02-01_at_22.16.28_1_b8esqo.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974487/WhatsApp_Image_2026-02-01_at_22.16.27_2_ey0hm4.jpg',
            'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974487/WhatsApp_Image_2026-02-01_at_22.16.27_1_wg3bsw.jpg',
            'https://res.cloudinary.com/dfwioqqgc/video/upload/v1769974519/WhatsApp_Video_2026-02-01_at_22.17.02_k4hpsl.mp4',
            'https://res.cloudinary.com/dfwioqqgc/video/upload/v1769974515/WhatsApp_Video_2026-02-01_at_22.17.02_1_rrz0ur.mp4'
        ],
        links: [
            { labelKey: 'media.events.workshop.link', url: 'https://www.instagram.com/p/DKaHE-rsWWP/?img_index=1', type: 'primary' }
        ],
        type: 'workshop',
        dateISO: '2025-06-28',
        meta: {
            en: {
                title: 'Vocal Painting Workshop | Genesi Nova',
                description: 'An experimental vocal painting workshop by Genesi Nova blending improvisation, layered harmonics, and contemporary choral expression.'
            },
            tr: {
                title: 'Vocal Painting Atölyesi | Genesi Nova',
                description: 'Genesi Nova\'nın deneysel vocal painting atölyesi; doğaçlama, katmanlı armoni ve çağdaş koro ifadesini bir araya getiriyor.'
            }
        }
    }
];

/**
 * Get a media event by its slug
 */
export const getEventBySlug = (slug) => MEDIA_EVENTS.find((e) => e.slug === slug);
