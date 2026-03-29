import React, { useRef, useState, useEffect } from 'react';
import './StarfieldBackground.css';

const StarfieldBackground = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`starfield${!isVisible ? ' starfield--paused' : ''}`}
            ref={ref}
        >
            <div className="starfield-nebula" />
            <div className="starfield-layer starfield-layer--1" />
            <div className="starfield-layer starfield-layer--2" />
            <div className="starfield-layer starfield-layer--3" />
            <div className="starfield-layer starfield-layer--glow-ab" />
            <div className="starfield-layer starfield-layer--glow-c" />
            <div className="starfield-comet starfield-comet--1" />
            <div className="starfield-comet starfield-comet--2" />
            <div className="starfield-comet starfield-comet--3" />
            <div className="starfield-comet starfield-comet--4" />
            <div className="starfield-comet starfield-comet--5" />
            <div className="starfield-comet starfield-comet--7" />
            <div className="starfield-grain" />
            <div className="starfield-vignette" />
        </div>
    );
};

export default StarfieldBackground;
