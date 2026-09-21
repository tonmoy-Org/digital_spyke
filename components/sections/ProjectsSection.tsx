'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, useTheme, useMediaQuery } from '@mui/material';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectPoint {
    number: string;
    icon: React.ReactNode;
    text: string;
}

interface ProjectImage {
    src: string;
    alt: string;
}

const ProjectsSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const projectPoints: ProjectPoint[] = [
        {
            number: '01',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
            ),
            text: "We don't just build, we research, strategize, and write.",
        },
        {
            number: '02',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
            ),
            text: "Our clients lead their fields in design sophistication.",
        },
    ];

    const firstRowImages: ProjectImage[] = [
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a8113c902ed9be24cb3_Website%20Hero%20-%206.jpg",
            alt: "Portfolio project 1",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1aa734161be9e87e9635_Website%20Hero%20-%2011.jpg",
            alt: "Portfolio project 2",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a9d6a929aa988b03f0c_Website%20Hero%20-%209.jpg",
            alt: "Portfolio project 3",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1547c258695b6bd21dab_Website%20Hero%20-%201.jpg",
            alt: "Portfolio project 4",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a713d1b552dcd0f9f04_Website%20Hero%20-%205.jpg",
            alt: "Portfolio project 5",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8c61d46fba51230bfa4c_Website%20Hero%20-%2013.jpg",
            alt: "Portfolio project 6",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8c6d48f910d5ccb7e5f4_Website%20Hero%20-%2014.jpg",
            alt: "Portfolio project 7",
        },
    ];

    const secondRowImages: ProjectImage[] = [
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8c9f36eea2366ebb18d2_Website%20Hero%20-%2015.jpg",
            alt: "Portfolio project 8",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8ca84778afa4ffa5d957_Website%20Hero%20-%2016.jpg",
            alt: "Portfolio project 9",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8cb1461adcdb7b19e595_Website%20Hero%20-%2017.jpg",
            alt: "Portfolio project 10",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8cb9aef259f32c2c1817_Website%20Hero%20-%2018.jpg",
            alt: "Portfolio project 11",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8cc232871b19eb0dcad4_Website%20Hero%20-%2019.jpg",
            alt: "Portfolio project 12",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a5358db9538fc8a22f6_Website%20Hero%20-%202.jpg",
            alt: "Portfolio project 13",
        },
        {
            src: "https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a938f84c5a9fd7966e1_Website%20Hero%20-%208.jpg",
            alt: "Portfolio project 14",
        },
    ];

    // Glassmorphism card styles (aligned with Testimonials)
    const cardStyles = {
        width: isMobile ? 240 : 300,
        minWidth: isMobile ? 240 : 300,
        height: isMobile ? 150 : 180,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        m: 1.5,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    };

    const ImageCard = ({ src, alt }: ProjectImage) => (
        <Box sx={cardStyles}>
            <Box sx={{ p: 0, height: '100%' }}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 280px, 350px"
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0)',
                            transition: 'background 0.3s',
                            '&:hover': {
                                background: 'rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                mt: 0,
                mb: 0,
                position: 'relative',
                overflow: 'hidden',
                py: 8,
                px: { xs: 0, md: 12 },
            }}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative' }}>
                {/* Header Section */}

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <Box sx={{ maxWidth: '3xl', mx: 'auto', textAlign: 'center', mb: 2 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1.8rem', lg: '40px' },
                                fontWeight: 500,
                                color: 'white',
                                mt: 0,
                                mb: 0,
                                lineHeight: '1.15em',
                                letterSpacing: '-0.03em',
                            }}
                        >
                            Experience in{' '}
                            <span style={{
                                background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block',
                            }}>dozens of industries</span>
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgba(255,255,255,0.7)',
                                mt: 2,
                                fontSize: '1rem',
                                width: { xs: '100%', md: '40%' },
                                margin: 'auto',
                            }}
                        >
                            We’re relentlessly curious, fast learners with leading work samples in everything from sport to SaaS.
                        </Typography>
                    </Box>
                </motion.div>
                {/* Project Points Section */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                        gap: 4,
                        mb: 5,
                    }}
                >
                    {projectPoints.map((point, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                                borderRadius: '5px',
                                background: 'rgba(255, 255, 255, 0.01)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Box
                                sx={{
                                    display: { xs: 'none', sm: 'flex' }, // Hide on 'xs' (mobile), show on 'sm' and above
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontWeight: '600' }}>
                                    {point.number}
                                </Typography>
                            </Box>
                            <Box sx={{ color: '#6B46FF' }}>{point.icon}</Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '1rem', lg: '1rem' },
                                    fontWeight: '500',
                                    color: 'white',
                                }}
                            >
                                {point.text.split(' ').map((word, wordIndex, array) => {
                                    const isHighlighted = wordIndex === array.length - 1 && index === 0;
                                    return (
                                        <span
                                            key={wordIndex}
                                            style={
                                                isHighlighted
                                                    ? {
                                                        background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                                        WebkitBackgroundClip: 'text',
                                                        color: 'transparent',
                                                    }
                                                    : {}
                                            }
                                        >
                                            {word}{' '}
                                        </span>
                                    );
                                })}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Scrolling Images Section */}
                <Box sx={{ mb: 0 }}>
                    <Marquee
                        gradient={true}
                        speed={30}
                        gradientColor="hsl(220, 65%, 3.52%)"
                        gradientWidth={isMobile ? 50 : 200}
                        style={{ width: '100%' }}
                    >
                        {firstRowImages.map((image, index) => (
                            <ImageCard key={`first-${index}`} {...image} />
                        ))}
                    </Marquee>
                </Box>
                <Box>
                    <Marquee
                        direction="right"
                        gradient={true}
                        speed={30}
                        gradientColor="hsl(220, 65%, 3.52%)"
                        gradientWidth={isMobile ? 50 : 200}
                        style={{ width: '100%' }}
                    >
                        {secondRowImages.map((image, index) => (
                            <ImageCard key={`second-${index}`} {...image} />
                        ))}
                    </Marquee>
                </Box>
            </Container>
        </Box>
    );
};

export default ProjectsSection;