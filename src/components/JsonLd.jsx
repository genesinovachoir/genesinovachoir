import { useEffect, useRef } from 'react';

/**
 * JsonLd — injects a <script type="application/ld+json"> into <head>.
 * Cleans up on unmount to prevent duplicate structured data.
 *
 * Props:
 *   data – a plain JS object conforming to Schema.org
 */
const JsonLd = ({ data }) => {
    const scriptRef = useRef(null);

    useEffect(() => {
        if (!data) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
        scriptRef.current = script;

        return () => {
            if (scriptRef.current && document.head.contains(scriptRef.current)) {
                document.head.removeChild(scriptRef.current);
            }
        };
    }, [data]);

    return null;
};

export default JsonLd;
