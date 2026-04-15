/**
 * generate-sitemap.js — Build-time sitemap generator.
 *
 * Produces a sitemap.xml with:
 *   - All static pages in TR and EN
 *   - All blog post slugs in TR and EN
 *   - All media event slugs in TR and EN
 *   - hreflang xhtml:link alternates for every URL
 *
 * Run: node scripts/generate-sitemap.js
 * Output: dist/sitemap.xml (or public/sitemap.xml if --public flag)
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOMAIN = 'https://genesinovachoir.com';
const LANGS = ['tr', 'en'];

// ── Static routes ──────────────────────────────────────────────
const STATIC_ROUTES = [
    '/',
    '/about',
    '/collab',
    '/store',
    '/blog',
    '/media',
    '/podcast',
    '/contact',
];

// ── Dynamic routes (slugs) ─────────────────────────────────────
// Import blog posts and media events data
// Since this runs at build time with Node, we parse the data statically.
const BLOG_SLUGS = [
    'echoes-from-the-past-the-making-of-our-new-album',
    'the-science-of-harmony-why-we-love-chords',
    'vocal-health-101-for-touring-choirs',
    'interview-the-future-of-choral-music',
];

const MEDIA_SLUGS = [
    'holyween',
    'vocal-painting-workshop',
];

// ── Build URL entries ──────────────────────────────────────────
function buildUrlEntry(path) {
    const urls = LANGS.map(lang => `${DOMAIN}/${lang}${path}`);

    const alternateLinks = LANGS.map(lang =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${DOMAIN}/${lang}${path}" />`
    ).join('\n');

    // x-default points to Turkish (default language)
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/tr${path}" />`;

    return urls.map(url => {
        const lang = url.includes(`${DOMAIN}/tr`) ? 'tr' : 'en';
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.includes('/blog/') || path.includes('/media/') ? '0.7' : '0.8'}</priority>
${alternateLinks}
${xDefault}
  </url>`;
    }).join('\n');
}

// ── Generate sitemap XML ───────────────────────────────────────
function generateSitemap() {
    const entries = [];

    // Static pages
    for (const route of STATIC_ROUTES) {
        entries.push(buildUrlEntry(route));
    }

    // Blog posts
    for (const slug of BLOG_SLUGS) {
        entries.push(buildUrlEntry(`/blog/${slug}`));
    }

    // Media events
    for (const slug of MEDIA_SLUGS) {
        entries.push(buildUrlEntry(`/media/${slug}`));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

    return xml;
}

// ── Write to file ──────────────────────────────────────────────
const isPublic = process.argv.includes('--public');
const outputDir = isPublic
    ? resolve(__dirname, '..', 'public')
    : resolve(__dirname, '..', 'dist');

if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

const outputPath = resolve(outputDir, 'sitemap.xml');
const xml = generateSitemap();
writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(`   ${LANGS.length * (STATIC_ROUTES.length + BLOG_SLUGS.length + MEDIA_SLUGS.length)} URLs`);
