import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { POSTS, getPostBySlug, getLocalizedPost } from '../data/blogPosts';
import OptimizedImage from '../components/OptimizedImage';
import SEOHead, { DOMAIN } from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import './Blog.css';

import instagramIcon from '../assets/icons/instagram.svg';
import twitterIcon from '../assets/icons/twitter.svg';

const BlogPost = () => {
    const { slug, lang } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const post = getPostBySlug(slug);
    const localized = getLocalizedPost(post, lang);

    if (!post || !localized) {
        return (
            <div className="blog-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#bab4a2', fontSize: '2rem', marginBottom: '1rem' }}>
                        {lang === 'tr' ? 'Yazı bulunamadı' : 'Post not found'}
                    </h1>
                    <Link
                        to={`/${lang}/blog`}
                        style={{ color: '#a89080', textDecoration: 'underline' }}
                    >
                        {lang === 'tr' ? '← Blog\'a dön' : '← Back to Blog'}
                    </Link>
                </div>
            </div>
        );
    }

    const altLang = lang === 'tr' ? 'en' : 'tr';
    const canonicalPath = `/${lang}/blog/${post.slug}`;
    const altPath = `/${altLang}/blog/${post.slug}`;

    // Get related posts (exclude current, take up to 2)
    const relatedPosts = POSTS.filter((p) => p.id !== post.id).slice(0, 2);

    // JSON-LD Article structured data
    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: localized.localTitle,
        description: localized.localMetaDescription,
        image: typeof post.image === 'string' ? post.image : post.image?.src || '',
        author: {
            '@type': 'Organization',
            name: 'Genesi Nova',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Genesi Nova',
        },
        datePublished: post.date,
        url: `${DOMAIN}${canonicalPath}`,
        inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    };

    return (
        <div className="blog-page">
            <SEOHead
                title={`${localized.localTitle} | Genesi Nova`}
                description={localized.localMetaDescription}
                canonical={canonicalPath}
                lang={lang}
                altLang={altLang}
                altPath={altPath}
                image={typeof post.image === 'string' ? post.image : post.image?.src}
                type="article"
                article={{
                    publishedTime: post.date,
                    author: post.author.name,
                }}
            />
            <JsonLd data={articleJsonLd} />

            <main>
                <article className="blog-post-detail" style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <Link
                            to={`/${lang}/blog`}
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
                            ← {lang === 'tr' ? 'Blog' : 'Blog'}
                        </Link>
                    </motion.div>

                    {/* Category & meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '1.5rem' }}
                    >
                        <div className="blog-card-meta" style={{ marginBottom: '0.75rem' }}>
                            <span className="category-tag">{localized.localCategory}</span>
                            <span className="divider">•</span>
                            <span className="read-time">{localized.localReadTime}</span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        style={{
                            color: '#bab4a2',
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontWeight: 300,
                            lineHeight: 1.3,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {localized.localTitle}
                    </motion.h1>

                    {/* Author & date */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="author-metadata"
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <div className="author-info">
                            <div
                                className="author-avatar"
                                style={{ backgroundColor: post.author.avatarColor }}
                            >
                                {post.author.initials}
                            </div>
                            <div className="author-details">
                                <div className="author-name">{post.author.name}</div>
                                <time className="post-date">{localized.localDate}</time>
                            </div>
                        </div>
                        <div className="author-social">
                            <a
                                href={post.author.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <img src={instagramIcon} alt="Instagram" />
                            </a>
                            <a
                                href={post.author.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <img src={twitterIcon} alt="Twitter" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Featured image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            marginBottom: '2.5rem',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        }}
                    >
                        <OptimizedImage
                            src={post.image}
                            alt={localized.localTitle}
                            className="blog-card-img"
                            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Article content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="blog-post-content"
                        style={{
                            color: 'rgba(186, 180, 162, 0.85)',
                            fontSize: '1.1rem',
                            lineHeight: 1.85,
                            letterSpacing: '0.01em',
                        }}
                        dangerouslySetInnerHTML={{ __html: localized.localContent }}
                    />

                    {/* Related posts */}
                    {relatedPosts.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{
                                marginTop: '4rem',
                                paddingTop: '3rem',
                                borderTop: '1px solid rgba(186, 180, 162, 0.15)',
                            }}
                        >
                            <h2
                                style={{
                                    color: '#bab4a2',
                                    fontSize: '1.2rem',
                                    fontWeight: 400,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginBottom: '2rem',
                                }}
                            >
                                {lang === 'tr' ? 'İlgili Yazılar' : 'Related Posts'}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {relatedPosts.map((relPost) => {
                                    const relLocalized = getLocalizedPost(relPost, lang);
                                    return (
                                        <Link
                                            key={relPost.id}
                                            to={`/${lang}/blog/${relPost.slug}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="blog-card" style={{ cursor: 'pointer' }}>
                                                <div className="blog-card-image-wrapper">
                                                    <OptimizedImage
                                                        src={relPost.image}
                                                        alt={relLocalized.localTitle}
                                                        className="blog-card-img"
                                                    />
                                                </div>
                                                <div className="blog-card-content">
                                                    <div className="blog-card-meta">
                                                        <span className="category-tag">{relLocalized.localCategory}</span>
                                                    </div>
                                                    <h3 className="blog-card-title">{relLocalized.localTitle}</h3>
                                                    <p className="blog-card-excerpt">{relLocalized.localExcerpt}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.section>
                    )}
                </article>
            </main>
        </div>
    );
};

export default BlogPost;
