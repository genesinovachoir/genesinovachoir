import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useChoirMembers } from '../../hooks/useChoirMembers';
import { ConductorCard, MemberCard } from './MemberCard';

const VOICE_GROUP_ORDER = ['Soprano', 'Alto', 'Tenor', 'Bass'];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

function SkeletonCard() {
    return <div className="member-card member-card--skeleton" aria-hidden="true" />;
}

export function MembersSection() {
    const { t } = useTranslation();
    const { conductor, membersByVoice, loading } = useChoirMembers();

    const hasAnyMembers = conductor || Object.values(membersByVoice).some(g => g.length > 0);

    if (!loading && !hasAnyMembers) return null;

    return (
        <section className="members-section">
            <motion.div
                className="members-section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="section-label">{t('about.members.label')}</span>
                <h2 className="members-title">{t('about.members.title')}</h2>
            </motion.div>

            {/* Conductor */}
            {loading ? (
                <div className="conductor-skeleton" aria-hidden="true" />
            ) : conductor && (
                <div className="conductor-featured">
                    <ConductorCard
                        member={conductor}
                        conductorLabel={t('about.members.conductor_badge')}
                    />
                </div>
            )}

            {/* Voice groups */}
            {loading ? (
                <div className="members-grid">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : (
                VOICE_GROUP_ORDER.map(group => {
                    const members = membersByVoice[group];
                    if (!members?.length) return null;
                    return (
                        <div key={group} className="voice-group-section">
                            <motion.h3
                                className="voice-group-title"
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {t(`about.members.voice_groups.${group}`)}
                            </motion.h3>
                            <motion.div
                                className="members-grid"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                            >
                                {members.map(member => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </motion.div>
                        </div>
                    );
                })
            )}
        </section>
    );
}
