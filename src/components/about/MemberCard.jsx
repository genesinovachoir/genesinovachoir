import React from 'react';
import { motion } from 'framer-motion';
import instaIcon from '../../assets/icons/instagram.svg';
import linkedinIcon from '../../assets/icons/linkedin.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import spotifyIcon from '../../assets/icons/spotify.svg';
import tiktokIcon from '../../assets/icons/tiktok.svg';
import twitterIcon from '../../assets/icons/twitter.svg';

const VOICE_COLORS = {
    Soprano: { bg: 'rgba(251, 113, 133, 0.15)', border: 'rgba(251, 113, 133, 0.35)', text: '#fb7185' },
    Alto:    { bg: 'rgba(251, 191, 36, 0.15)',  border: 'rgba(251, 191, 36, 0.35)',  text: '#fbbf24' },
    Tenor:   { bg: 'rgba(56, 189, 248, 0.15)',  border: 'rgba(56, 189, 248, 0.35)',  text: '#38bdf8' },
    Bass:    { bg: 'rgba(167, 139, 250, 0.15)', border: 'rgba(167, 139, 250, 0.35)', text: '#a78bfa' },
};

const SOCIAL_LINKS = [
    { key: 'instagram_url', icon: instaIcon, label: 'Instagram' },
    { key: 'linkedin_url',  icon: linkedinIcon, label: 'LinkedIn' },
    { key: 'youtube_url',   icon: youtubeIcon, label: 'YouTube' },
    { key: 'spotify_url',   icon: spotifyIcon, label: 'Spotify' },
    { key: 'tiktok_url',    icon: tiktokIcon, label: 'TikTok' },
    { key: 'x_url',         icon: twitterIcon, label: 'X' },
];

function Avatar({ name, voiceGroup, size = 'standard' }) {
    const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '♪';
    const color = VOICE_COLORS[voiceGroup];
    const fontSize = size === 'featured' ? '2.5rem' : '1.5rem';
    return (
        <div
            className="member-avatar"
            style={{
                background: color
                    ? `linear-gradient(135deg, ${color.bg.replace('0.15', '0.4')}, rgba(5,6,10,0.8))`
                    : 'linear-gradient(135deg, rgba(186,180,162,0.3), rgba(5,6,10,0.8))',
                fontSize,
            }}
        >
            {initials}
        </div>
    );
}

function SocialLinks({ member, size }) {
    const links = SOCIAL_LINKS.filter(s => member[s.key]);
    if (links.length === 0) return null;
    return (
        <div className={`member-social-links member-social-links--${size}`}>
            {links.map(({ key, icon, label }) => (
                <a
                    key={key}
                    href={member[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-social-icon"
                    aria-label={label}
                    onClick={e => e.stopPropagation()}
                >
                    <img src={icon} alt={label} />
                </a>
            ))}
        </div>
    );
}

export function ConductorCard({ member, conductorLabel }) {
    const fullName = `${member.first_name} ${member.last_name}`;
    const color = VOICE_COLORS[member.voice_group];

    return (
        <motion.div
            className="conductor-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="conductor-photo-wrap">
                {member.photo_url ? (
                    <img
                        src={member.photo_url}
                        alt={fullName}
                        className="conductor-photo"
                        loading="eager"
                    />
                ) : (
                    <Avatar name={fullName} voiceGroup={member.voice_group} size="featured" />
                )}
            </div>
            <div className="conductor-info">
                <span className="conductor-badge">{conductorLabel}</span>
                <h2 className="conductor-name">{fullName}</h2>
                {member.voice_group && (
                    <span
                        className="voice-badge"
                        style={color
                            ? { background: color.bg, border: `1px solid ${color.border}`, color: color.text }
                            : undefined
                        }
                    >
                        {member.voice_group}
                    </span>
                )}
                <SocialLinks member={member} size="featured" />
            </div>
        </motion.div>
    );
}

export function MemberCard({ member }) {
    const fullName = `${member.first_name} ${member.last_name}`;
    const color = VOICE_COLORS[member.voice_group];

    return (
        <motion.div
            className="member-card"
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
            <div className="member-card-photo">
                {member.photo_url ? (
                    <img
                        src={member.photo_url}
                        alt={fullName}
                        className="member-photo-img"
                        loading="lazy"
                    />
                ) : (
                    <Avatar name={fullName} voiceGroup={member.voice_group} />
                )}
                {member.voice_group && (
                    <span
                        className="voice-badge voice-badge--overlay"
                        style={color
                            ? { background: color.bg, border: `1px solid ${color.border}`, color: color.text }
                            : undefined
                        }
                    >
                        {member.voice_group}
                    </span>
                )}
            </div>
            <div className="member-card-body">
                <p className="member-name">{fullName}</p>
                <SocialLinks member={member} size="standard" />
            </div>
        </motion.div>
    );
}
