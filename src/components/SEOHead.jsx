import { useEffect } from 'react';

const DOMAIN = 'https://genesinovachoir.com';

/**
 * SEOHead — manages document head tags via direct DOM manipulation.
 * Zero external dependencies.
 *
 * Props:
 *   title        – page <title>
 *   description  – meta description
 *   canonical    – canonical URL (full or path; domain auto-prepended if relative)
 *   lang         – 'tr' | 'en'
 *   altLang      – the other language code
 *   altPath      – path for the alternate language version
 *   image        – OG/Twitter image URL
 *   type         – OG type (default: 'website')
 *   article      – { publishedTime, author } for og:article tags
 */
const SEOHead = ({
    title,
    description,
    canonical,
    lang = 'tr',
    altLang,
    altPath,
    image,
    type = 'website',
    article,
}) => {
    useEffect(() => {
        // ── helpers ────────────────────────────────────────────
        const fullUrl = (path) =>
            path?.startsWith('http') ? path : `${DOMAIN}${path}`;

        const setMeta = (attr, key, content) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const setLink = (rel, attrs) => {
            // Build a selector to find existing link
            const selector = Object.entries(attrs)
                .map(([k, v]) => `[${k}="${v}"]`)
                .join('');
            let el = document.querySelector(`link[rel="${rel}"]${selector}`);
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        };

        const removeLink = (rel, attrs) => {
            const selector = Object.entries(attrs)
                .map(([k, v]) => `[${k}="${v}"]`)
                .join('');
            const el = document.querySelector(`link[rel="${rel}"]${selector}`);
            if (el) el.remove();
        };

        // ── title ──────────────────────────────────────────────
        if (title) document.title = title;

        // ── html lang ──────────────────────────────────────────
        document.documentElement.lang = lang;

        // ── basic meta ─────────────────────────────────────────
        if (description) setMeta('name', 'description', description);

        // ── canonical ──────────────────────────────────────────
        if (canonical) {
            const canonicalUrl = fullUrl(canonical);
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', canonicalUrl);
        }

        // ── hreflang alternates ────────────────────────────────
        if (altLang && altPath) {
            const canonicalUrl = fullUrl(canonical);
            const altUrl = fullUrl(altPath);

            // Current language
            setLink('alternate', { hreflang: lang, href: canonicalUrl });
            // Alternate language
            setLink('alternate', { hreflang: altLang, href: altUrl });
            // x-default → Turkish (default language)
            const xDefaultUrl = lang === 'tr' ? canonicalUrl : altUrl;
            setLink('alternate', { hreflang: 'x-default', href: xDefaultUrl });
        }

        // ── Open Graph ─────────────────────────────────────────
        if (title) setMeta('property', 'og:title', title);
        if (description) setMeta('property', 'og:description', description);
        if (canonical) setMeta('property', 'og:url', fullUrl(canonical));
        setMeta('property', 'og:type', type);
        setMeta('property', 'og:site_name', 'Genesi Nova');
        setMeta('property', 'og:locale', lang === 'tr' ? 'tr_TR' : 'en_US');
        if (altLang) {
            setMeta(
                'property',
                'og:locale:alternate',
                altLang === 'tr' ? 'tr_TR' : 'en_US'
            );
        }
        if (image) setMeta('property', 'og:image', image);

        // ── Article meta (if blog post) ────────────────────────
        if (article) {
            if (article.publishedTime) {
                setMeta('property', 'article:published_time', article.publishedTime);
            }
            if (article.author) {
                setMeta('property', 'article:author', article.author);
            }
        }

        // ── Twitter Card ───────────────────────────────────────
        setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
        if (title) setMeta('name', 'twitter:title', title);
        if (description) setMeta('name', 'twitter:description', description);
        if (image) setMeta('name', 'twitter:image', image);

        // ── Cleanup on unmount ─────────────────────────────────
        return () => {
            // Remove hreflang links to prevent stale data on navigation
            ['tr', 'en', 'x-default'].forEach((hl) => {
                removeLink('alternate', { hreflang: hl });
            });
        };
    }, [title, description, canonical, lang, altLang, altPath, image, type, article]);

    return null; // renders nothing — only side-effects
};

export { DOMAIN };
export default SEOHead;
