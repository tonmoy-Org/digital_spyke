'use client';

import React, { useRef } from 'react';
import { Box, Typography, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GridViewIcon from '@mui/icons-material/GridView';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { motion } from 'framer-motion';

export default function ProcessSection() {
    const steps = [
        {
            title: 'Planning',
            description:
                'At the start of each project, we work with our clients to build a solid project plan. The initial scope document can come from the client or through a combined process of phone calls and in-person meetings.',
            step: '01',
            icon: EventNoteIcon,
            tags: ['Project Scope', 'Milestone Planning', 'Roadmap'],
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Wireframing',
            description:
                'Once the project plan and scope have been finalized, our wireframing team determines the placement of all objects on each page of the application. Whether it is a consumer mobile app or a backend business application, this stage ensures final agreement on what will be placed on each page for the user to access.',
            step: '02',
            icon: GridViewIcon,
            tags: ['UX Architecture', 'Interactive Wireframes', 'Layout'],
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Design',
            description:
                'After finalizing wireframes, our design team creates the final appearance and functionality of the application. This is an exciting stage where the entire application comes to life. We provide clickable versions to fully experience user interactions before development begins.',
            step: '03',
            icon: BrushIcon,
            tags: ['UI Design', 'Design Systems', 'Interactive Prototypes'],
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Development',
            description:
                'With finalized wireframes and designs, we begin coding the application. As an Agile development team, we break down the project into feature sets called Sprints. This approach allows customers to review progress regularly and provide feedback at the end of each Sprint, ensuring continuous involvement.',
            step: '04',
            icon: CodeIcon,
            tags: ['Full-Stack Code', 'Agile Sprints', 'Clean Architecture'],
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Testing',
            description:
                "The testing process ensures that the application is functional, reliable, and user-friendly. It involves multiple stages, using various techniques and tools to identify and fix defects, bugs, and usability issues before release. This step improves the user experience and guarantees the product's success.",
            step: '05',
            icon: BugReportIcon,
            tags: ['Quality Assurance', 'Security & Speed', 'Cross-Device QA'],
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Deployment',
            description:
                'After the application passes internal QA, project management, and client approval, it is ready for deployment. Hosting options vary from client-owned servers to web or cloud hosting. We guide clients through these options and handle the final deployment stages.',
            step: '06',
            icon: CloudUploadIcon,
            tags: ['Cloud Infrastructure', 'CI/CD Pipeline', 'Live Launch'],
            bgImage: 'https://framerusercontent.com/images/3fTl0jOeNCf5k69Fvi5Sj616o.svg',
        },
    ];

    const sectionRef = useRef<HTMLElement | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Bottom margin for every card (including the last one) so all cards
    // have the same sticky "runway". The button wrapper below cancels this
    // out with a negative top margin. Keep these two values in sync.
    const cardGap = { xs: '35vh', md: '50vh' };

    return (
        <Box
            ref={sectionRef}
            className="process"
            sx={{
                color: '#fff',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                pt: { xs: 6, md: 8 },
                pb: { xs: 10, md: 16 },
                px: { xs: 1.5, sm: 2, md: 3 },
            }}
        >
            {/* Background Ambient Glows */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    left: '-5%',
                    width: '450px',
                    height: '450px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 85, 255, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(90, 58, 228, 0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Sticky Header */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'sticky',
                    top: { xs: '30px', md: '40px' },
                    zIndex: 0,
                    pt: { xs: 1.5, md: 2 },
                    pb: { xs: 1.5, md: 2 },
                    mb: { xs: 1.5, md: 2 },
                    pointerEvents: 'none',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="top-section flex flex-col items-center text-center gap-3 w-full max-w-3xl"
                >
                    {/* Aceternity Badge */}
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-xl mb-2 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-indigo-500/20" />
                        <span className="relative text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 uppercase">
                            Our proven process
                        </span>
                    </div>

                    {/* Gradient Main Heading */}
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white m-0 mb-4">
                        We Simplify The{' '}
                        <span className="relative inline-block">
                            <span className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 blur-xl opacity-30"></span>
                            <span className="relative bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
                                Journey
                            </span>
                        </span>
                    </h2>

                    {/* Subtitle description */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto m-0 font-medium">
                        From initial ideation to live global deployment, we execute every phase with precision, transparent communication, and Agile velocity.
                    </p>
                </motion.div>
            </Box>

            {/* Cards Section */}
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 5,
                }}
            >
                {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    const isLast = index === steps.length - 1;

                    return (
                        <Box
                            key={index}
                            className={`process-card-wrapper stage-${step.step}`}
                            sx={{
                                position: 'sticky',
                                top: { xs: '80px', sm: '120px', md: '240px' },
                                zIndex: index + 1,
                                paddingTop: '4px',
                                paddingBottom: '4px',
                                // FIX: same bottom margin for ALL cards (including the last),
                                // so card 6 stays sticky and stacks over card 5 exactly
                                // like the other cards do.
                                mb: cardGap,
                            }}
                        >
                            <Box
                                className={`process-card ${isLast ? 'secondary' : ''}`}
                                sx={{
                                    position: 'relative',
                                    borderRadius: { xs: '18px', sm: '24px', md: '30px' },
                                    overflow: 'hidden',
                                    padding: { xs: '20px 16px', sm: '32px 24px', md: '48px 46px' },
                                    height: { xs: 'auto', sm: 'calc(100vh - 280px)', md: 'calc(100vh - 260px)' },
                                    minHeight: { xs: '420px', sm: '500px', md: '640px', lg: '680px' },
                                    maxHeight: { xs: 'none', md: '780px', lg: '840px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#0b0e1b',
                                    backgroundImage: 'linear-gradient(180deg, #0b0e1b 0%, #060811 100%)',
                                    border: '1px solid rgba(0, 85, 255, 0.3)',
                                    boxShadow: 'none',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(0, 153, 255, 0.55)',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                {/* Interactive Grid Pattern */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        zIndex: 0,
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <InteractiveGridPattern
                                        className={cn(
                                            "[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]",
                                            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-35",
                                            "stroke-white/20 fill-transparent"
                                        )}
                                        squaresClassName="hover:fill-blue-500/25 hover:stroke-blue-400/60 stroke-white/10"
                                    />
                                </Box>

                                {/* Subtle Blue Radial Glow */}
                                <Box
                                    className="card-glow"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(0, 85, 255, 0.16), transparent 75%)',
                                        pointerEvents: 'none',
                                        zIndex: 1,
                                    }}
                                />

                                {/* Big Decorative Watermark Stage Number */}
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        right: { xs: 14, sm: 20, md: 40 },
                                        top: { xs: 8, sm: 12, md: 20 },
                                        fontSize: { xs: '72px', sm: '110px', md: '160px' },
                                        fontWeight: 900,
                                        lineHeight: 1,
                                        letterSpacing: '-0.05em',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                        zIndex: 2,
                                        background: 'linear-gradient(160deg, rgba(0, 100, 255, 0.45) 0%, rgba(120, 80, 255, 0.18) 50%, rgba(255, 255, 255, 0.04) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontFamily: 'inherit',
                                        textShadow: 'none',
                                        filter: 'drop-shadow(0 0 18px rgba(0, 85, 255, 0.35))',
                                    }}
                                >
                                    {step.step}
                                </Typography>

                                {/* Top Section: Icon top-left + Step label */}
                                <Box
                                    className="card-top"
                                    sx={{
                                        position: 'relative',
                                        zIndex: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        gap: '6px',
                                        width: '100%',
                                    }}
                                >
                                    {/* Icon — top-left */}
                                    <Box
                                        className="icon"
                                        sx={{
                                            position: 'relative',
                                            width: { xs: '50px', sm: '56px', md: '62px' },
                                            height: { xs: '50px', sm: '56px', md: '62px' },
                                            border: '1px solid rgba(0, 85, 255, 0.4)',
                                            borderRadius: '14px',
                                            boxShadow: '0 8px 30px rgba(0, 85, 255, 0.38), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
                                            background: 'radial-gradient(circle at center, rgba(0, 153, 255, 0.25) 0%, rgba(8, 11, 24, 0.95) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconComponent sx={{ fontSize: { xs: 25, sm: 29, md: 31 }, color: '#ffffff' }} />
                                    </Box>

                                    {/* Step Label with gradient badge */}
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
                                        <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                            Step {step.step}
                                        </span>
                                    </div>
                                </Box>

                                {/* Center Title — positioned in the middle of the card */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                        py: { xs: 2, sm: 3, md: 5 },
                                    }}
                                >
                                    <motion.h3
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_0_25px_rgba(0,153,255,0.3)] group-hover:from-white group-hover:via-cyan-100 group-hover:to-cyan-300 transition-all duration-300 text-center m-0"
                                    >
                                        {step.title}
                                    </motion.h3>
                                </Box>

                                {/* Card Bottom: separator + description + tags */}
                                <Box
                                    className="card-bottom"
                                    sx={{
                                        position: 'relative',
                                        zIndex: 3,
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: '1px',
                                            width: '100%',
                                            mb: 2.5,
                                            background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgba(0, 85, 255, 0.45) 50%, rgba(0, 85, 255, 0) 100%)',
                                        }}
                                    />

                                    <p className="text-xs sm:text-sm md:text-base text-gray-300/90 leading-relaxed font-normal text-center mx-auto max-w-[720px] mb-4 sm:mb-5 m-0">
                                        {step.description}
                                    </p>

                                    {/* Centered Tags */}
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {step.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 hover:scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Box>

                                {isLast && (
                                    <Box
                                        className="star-line"
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            bottom: -10,
                                            zIndex: 1,
                                            pointerEvents: 'none',
                                            opacity: 0.75,
                                        }}
                                    >
                                        <Image
                                            width={130}
                                            height={130}
                                            src="https://framerusercontent.com/images/QMirkdl4WPEe5bmSFhvVcssWj4.svg"
                                            alt="Star decoration"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            {/* Action Button Below Cards */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    // FIX: cancel the extra bottom margin of the last card so there is
                    // no big empty gap. Must match `cardGap` above.
                    // Increase the "+ 32px / + 48px" part if the button overlaps card 6.
                    mt: { xs: 'calc(-35vh + 32px)', md: 'calc(-50vh + 48px)' },
                    zIndex: 10,
                    position: 'relative',
                }}
            >
                <Stack
                    direction="row"
                    spacing={0}
                    alignItems="center"
                    sx={{
                        '&:hover .animated-button': {
                            backgroundColor: '#5a3ae4',
                        },
                        '&:hover .animated-arrow': {
                            transform: 'translateX(5px)',
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        href="contact"
                        className="animated-button"
                        sx={{
                            backgroundColor: '#0055FE',
                            color: 'white',
                            padding: '10px 28px',
                            borderRadius: '50px',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            textTransform: 'none',
                            transition: 'background-color 0.3s ease',
                            boxShadow: '0 4px 20px rgba(0, 85, 255, 0.35)',
                        }}
                    >
                        Work With Us!
                    </Button>
                    <Button
                        variant="contained"
                        className="animated-button animated-arrow"
                        sx={{
                            backgroundColor: '#0055FE',
                            color: 'white',
                            minWidth: '44px',
                            padding: '0px',
                            height: '44px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                            boxShadow: '0 4px 20px rgba(0, 85, 255, 0.35)',
                        }}
                    >
                        <ArrowForwardIcon sx={{ padding: '0px !important', fontSize: '20px' }} />
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}