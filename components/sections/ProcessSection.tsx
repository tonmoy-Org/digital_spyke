'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Stack, useTheme, useMediaQuery } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Importing specific icons for each topic
import EventNoteIcon from '@mui/icons-material/EventNote';
import GridViewIcon from '@mui/icons-material/GridView';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';

export default function ProcessSection() {
    const steps = [
        {
            title: 'Planning',
            description:
                'At the start of each project, we work with our clients to build a solid project plan. The initial scope document can come from the client or through a combined process of phone calls and in-person meetings.',
            step: '01',
            icon: EventNoteIcon,
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Wireframing',
            description:
                'Once the project plan and scope have been finalized, our wireframing team determines the placement of all objects on each page of the application. Whether it is a consumer mobile app or a backend business application, this stage ensures final agreement on what will be placed on each page for the user to access.',
            step: '02',
            icon: GridViewIcon,
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Design',
            description:
                'After finalizing wireframes, our design team creates the final appearance and functionality of the application. This is an exciting stage where the entire application comes to life. We provide clickable versions to fully experience user interactions before development begins.',
            step: '03',
            icon: BrushIcon,
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Development',
            description:
                'With finalized wireframes and designs, we begin coding the application. As an Agile development team, we break down the project into feature sets called Sprints. This approach allows customers to review progress regularly and provide feedback at the end of each Sprint, ensuring continuous involvement.',
            step: '04',
            icon: CodeIcon,
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Testing',
            description:
                "The testing process ensures that the application is functional, reliable, and user-friendly. It involves multiple stages, using various techniques and tools to identify and fix defects, bugs, and usability issues before release. This step improves the user experience and guarantees the product's success.",
            step: '05',
            icon: BugReportIcon,
            bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
        },
        {
            title: 'Deployment',
            description:
                'After the application passes internal QA, project management, and client approval, it is ready for deployment. Hosting options vary from client-owned servers to web or cloud hosting. We guide clients through these options and handle the final deployment stages.',
            step: '06',
            icon: CloudUploadIcon,
            bgImage: 'https://framerusercontent.com/images/3fTl0jOeNCf5k69Fvi5Sj616o.svg',
        },
    ];

    const sectionRef = useRef<HTMLElement | null>(null);
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate steps one by one
                        steps.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleSteps((prev) => [...prev, index]);
                            }, index * 200); // 200ms delay between each card
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <Box
            ref={sectionRef}
            className="process"
            sx={{
                color: '#fff',
                textAlign: 'left',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 4 : 2,
                py: { xs: 4, md: 10 },
                px: { xs: 2, md: 4 },
                backgroundColor: '#090912',
                minHeight: '100vh'
            }}
        >
            {/* Section Header */}
            <Box
                sx={{
                    width: isMobile ? '100%' : '35%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    position: isMobile ? 'static' : 'sticky',
                    top: isMobile ? '0' : '100px',
                    alignSelf: 'flex-start',
                    mb: isMobile ? 4 : 0,
                    mt: { xs: 5, md: 0 },
                }}
            >
                <Box
                    className="top-section"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start',
                        textAlign: isMobile ? 'center' : 'left',
                        gap: '30px',
                    }}
                >
                    <Box
                        className="top-inner"
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', gap: '20px' }}
                    >
                        <Box className="title-section" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box className="text-1">
                                <Typography
                                    sx={{
                                        margin: 0,
                                        fontSize: { xs: '28px', md: '40px' },
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Our proven process
                                </Typography>
                            </Box>
                            <Box className="text-2">
                                <Typography
                                    sx={{
                                        margin: 0,
                                        fontSize: { xs: '28px', md: '40px' },
                                        lineHeight: 1.1,
                                        color: 'rgba(255, 255, 255, 0.6)',
                                    }}
                                >
                                    We Simplify The Journey
                                </Typography>
                            </Box>
                        </Box>
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
                                    padding: '6.5px 24px',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    textTransform: 'none',
                                    transition: 'background-color 0.3s ease',
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
                                    minWidth: '39px',
                                    padding: '0px',
                                    height: '39px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                }}
                            >
                                <ArrowForwardIcon sx={{ padding: '0px !important' }} />
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>

            {/* Process Steps */}
            <Box
                sx={{
                    width: isMobile ? '100%' : '65%',
                    display: 'grid',
                    // gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: '20px',
                }}
            >
                {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    const isVisible = visibleSteps.includes(index);

                    return (
                        <Box
                            key={index}
                            className={`process-card ${index === steps.length - 1 ? 'secondary' : ''}`}
                            sx={{
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                padding: { xs: '20px', md: '30px' },
                                backdropFilter: 'blur(0px)',
                                background: index === steps.length - 1 ? 'linear-gradient(180deg, rgba(0, 85, 255, 0.05) 0%, rgba(0, 85, 255, 0.02) 100%)' : 'none',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'opacity 0.5s ease, transform 0.5s ease',
                                transitionDelay: `${index * 0.1}s`,
                                '&:hover': {
                                    '& .step-content': {
                                        color: '#fff',
                                    },
                                    '& .step-number': {
                                        color: '#fff',
                                    },
                                    '& .neon-circle::before': {
                                        boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)',
                                    },
                                },
                            }}
                        >
                            {/* Background Image */}
                            <Box className="card-bg" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                                <Image src={step.bgImage} alt="Process Background" layout="fill" objectFit="cover" />
                            </Box>

                            {/* Blur Effect */}
                            <Box
                                className="blur"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '20px',
                                    zIndex: 0,
                                    pointerEvents: 'none',
                                }}
                            />

                            <Box
                                className="card-top"
                                sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '30px' }}
                            >
                                {/* Icon */}
                                <Box
                                    className="icon"
                                    sx={{
                                        position: 'relative',
                                        width: '60px',
                                        height: '60px',
                                        border: '1px solid rgba(0, 85, 255, 0.15)',
                                        borderRadius: '10px',
                                        boxShadow: '0 5px 25px 0 rgba(0, 85, 255, 0.25), inset 0 10px 10px -1px rgba(255, 255, 255, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        className="shadow"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'radial-gradient(50% 50%, rgba(0, 153, 255, 0.15) 0%, rgb(9, 9, 18) 100%)',
                                            boxShadow: 'inset 0 10px 10px -1px rgba(0, 85, 255, 0.1)',
                                            borderRadius: '10px',
                                        }}
                                    />
                                    <Box className="icon-svg" sx={{ width: '24px', height: '24px', zIndex: 1 }}>
                                        <IconComponent style={{ width: '100%', height: '100%', fill: 'white' }} />
                                    </Box>
                                </Box>

                                {/* Step Number Tag */}
                                <Box
                                    className="dotless-highlight-tag"
                                    sx={{
                                        position: 'relative',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(5px)',
                                        background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.08) 0%, rgba(153, 153, 153, 0.1) 100%)',
                                        borderRadius: '10px',
                                        padding: '8px 15px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            backgroundImage: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(153, 153, 153, 0) 350%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            margin: 0,
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Stage {step.step}
                                    </Typography>
                                    <Box
                                        className="blue-line"
                                        sx={{
                                            height: '1px',
                                            background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)',
                                            position: 'absolute',
                                            bottom: '-5px',
                                            left: '10%',
                                            right: '10%',
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box className="card-bottom" sx={{ position: 'relative', zIndex: 1 }}>
                                <Box className="card-top-inner" sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                                    <Box className="card-title">
                                        <Typography variant="h4" sx={{ margin: 0, fontSize: '24px', fontWeight: 500 }}>
                                            {step.title}
                                        </Typography>
                                    </Box>
                                    <Box
                                        className="separator"
                                        sx={{
                                            height: '1px',
                                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%)',
                                        }}
                                    />
                                </Box>

                                <Box className="card-bottom-inner" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <Typography
                                        className="card-body-text"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            fontSize: '16px',
                                            lineHeight: 1.6,
                                            margin: 0,
                                        }}
                                    >
                                        {step.description}
                                    </Typography>

                                    <Box className="tags" sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        <Box
                                            className="grey-linear-tag"
                                            sx={{
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                backdropFilter: 'blur(2.5px)',
                                                background: 'linear-gradient(-0deg, rgba(255, 255, 255, 0.05) 0%, rgba(97, 97, 97, 0.09) 100%)',
                                                borderRadius: '10px',
                                                padding: '6px 12px',
                                            }}
                                        >
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '12px', fontWeight: '500' }}>
                                                {step.title.split(' ')[0]}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Star line for the last card */}
                            {index === steps.length - 1 && (
                                <Box className="star-line" sx={{ position: 'absolute', right: 0, bottom: -10, zIndex: 0 }}>
                                    <Image
                                        width={100}
                                        height={100}
                                        objectFit="cover"
                                        src="https://framerusercontent.com/images/QMirkdl4WPEe5bmSFhvVcssWj4.svg"
                                        alt="Star line"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}