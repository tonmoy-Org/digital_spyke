'use client';
import { useState, useCallback, useRef, useEffect } from "react";

export default function HighlightSection() {
    const [glowPosition, setGlowPosition] = useState({ x: "50%", y: "100%" });
    const sectionRef = useRef<HTMLElement>(null);
    const rafRef = useRef<number>();

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (rafRef.current) return;

        rafRef.current = requestAnimationFrame(() => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                setGlowPosition({
                    x: `${x}%`,
                    y: `${y}%`,
                });
            }
            rafRef.current = undefined;
        });
    }, []);

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="highlight-section relative pt-12 lg:pt-28 pb-6 lg:pb-8 px-4 md:px-8"
            onMouseMove={handleMouseMove}
            style={{
                background: `radial-gradient(circle at ${glowPosition.x} ${glowPosition.y}, rgba(0, 55, 255, 0.2), transparent 60%), linear-gradient(180deg, hsl(220, 65%, 3.52%) 0%, hsl(220, 65%, 3.52%) 35.54%, hsl(220, 65%, 3.52%) 100%)`,
            }}
        >
            <div className="rte text-center relative z-10 text-white max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-normal text-white leading-tight md:leading-normal">
                    The results speak for themselves
                </h2>
                <p
                    className="text-base sm:text-lg mt-3 sm:mt-4 max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
                    style={{ color: 'hsl(220 10% 54.4%)' }}
                >
                    We help the world's most successful brands make great things happen.
                </p>
            </div>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x} ${glowPosition.y}, rgba(255, 255, 255, 0.5), transparent 60%)`,
                    mixBlendMode: "overlay",
                    transition: "background-position 0.15s ease-out",
                }}
            />
        </section>
    );
}