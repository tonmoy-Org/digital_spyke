"use client"; // Ensure it's client-side for scroll effects
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function OurApproach() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                const scrollTop = window.scrollY;
                const containerTop = container.offsetTop;
                const containerHeight = container.offsetHeight;
                const windowHeight = window.innerHeight;

                // Calculate scroll progress within the container
                const progress = Math.max(
                    0,
                    Math.min((scrollTop - containerTop) / (containerHeight - windowHeight), 1)
                );

                setScrollProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full font-sans md:px-10" ref={containerRef}>
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-500 dark:text-white mb-4 max-w-4xl">
                    How We Started
                </h2>
                <p className="text-neutral-500 text-base md:text-lg max-w-sm">
                    Digital Spyke was founded to transform the digital landscape and help businesses thrive online. Seeing many struggle with their online presence, we set out to bridge the gap and drive digital success.
                </p>
            </div>

            <div className="relative lg:max-w-7xl mx-auto pb-20 px-10">
                {/* Vertical Progress Bar */}
                <div className="absolute left-[60px] top-0 h-full overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
                    <div
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                        style={{ height: `${scrollProgress * 100}%` }}
                    />
                </div>

                {/* Timeline Sections */}
                <div className="flex flex-col lg:space-y-20 space-y-16">
                    {[
                        {
                            year: "2023",
                            description:
                                "In 2023, Digital Spyke was founded to transform the digital landscape and help businesses thrive online. Seeing many struggle with their online presence, we set out to bridge the gap and drive digital success.",
                            images: ["https://assets.aceternity.com/pro/hero-sections.png", "https://assets.aceternity.com/features-section.png", "https://assets.aceternity.com/pro/bento-grids.png", "https://assets.aceternity.com/cards.png"],
                        },
                        {
                            year: "2024",
                            description:
                                "In 2024, we introduced brand design covering logos, branded websites, and marketing strategies for startups. It was a big hit, so we made it a core service.",
                            images: ["https://assets.aceternity.com/templates/startup-1.webp", "https://assets.aceternity.com/templates/startup-2.webp", "https://assets.aceternity.com/templates/startup-3.webp", "https://assets.aceternity.com/templates/startup-4.webp"],
                        },
                        {
                            year: "2025",
                            description:
                                "We improved our designs, fine-tuned the user experience, and expanded our reach, helping businesses not just get online, but truly succeed.",
                            bulletPoints: [
                                "🚀 Enhanced UI/UX designs for seamless functionality.",
                                "🚀 Expanded our services to cater to businesses of all sizes.",
                                "🚀 Focused on scalability and customization for client success.",
                                "🚀 Built a reputation for delivering results-driven solutions.",
                            ],
                        },
                    ].map((section, index) => (
                        <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
                            {/* Sticky Circular Indicator */}
                            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
                                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                                </div>
                                {/* Year Label for Desktop */}
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                                    {section.year}
                                </h3>
                            </div>

                            {/* Content Section */}
                            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                                {/* Year Label for Mobile */}
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                                    {section.year}
                                </h3>

                                {/* Description */}
                                <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
                                    {section.description}
                                </p>

                                {/* Bullet Points (if any) */}
                                {section.bulletPoints && (
                                    <div className="mb-8">
                                        {section.bulletPoints.map((point, i) => (
                                            <div key={i} className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
                                                {point}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Image Grid (if any) */}
                                {section.images && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {section.images.map((img, i) => (
                                            <Image
                                                key={i}
                                                alt="Project showcase"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                                decoding="async"
                                                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                                                src={img}
                                                style={{ color: "transparent" }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}