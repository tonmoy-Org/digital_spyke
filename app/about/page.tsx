"use client";

import React from 'react';
import { Box, Button, Stack } from "@mui/material";
import { motion, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import banner from '@/public/banner/new-banner.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OurApproach from '@/components/About/OurApproach';

// Animation variants for Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// AnimatedNumber Component for Counting Animation
interface AnimatedNumberProps {
    value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const animatedValue = useTransform(spring, (v) => Math.round(v));

    React.useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <motion.span>{animatedValue}</motion.span>;
};

// StatItem Component for Reusability
interface StatItemProps {
    value: number;
    description: string;
    suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, description, suffix }) => {
    return (
        <motion.div
            className="flex-1 min-w-[200px] text-center"
            variants={itemVariants}
        >
            <h3 className="text-3xl md:text-4xl font-bold">
                <span
                    style={{
                        background: 'linear-gradient(45deg, #7a58ff 40%, #9d86ff 60%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block',
                    }}
                >
                    <AnimatedNumber value={value} />
                    {suffix}
                </span>
            </h3>
            <p className="text-white mt-2 text-sm md:text-base">{description}</p>
        </motion.div>
    );
};

const StatsSection = () => {
    return (
        <motion.div
            className="flex flex-wrap items-center p-5 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Left Column */}
            <motion.div className="w-full md:w-1/4 p-4" variants={itemVariants}>
                <p className="text-lg leading-relaxed text-left text-white flex items-center gap-2">
                    <span>Our clients see</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                </p>
            </motion.div>

            {/* Right Column */}
            <motion.div
                className="w-full md:w-3/4 p-4 flex flex-wrap gap-6 justify-center md:justify-start"
                variants={containerVariants}
            >
                <StatItem value={3} description="Increase Conversions" suffix="X" />
                <StatItem value={37} description="Reduce Bounce" suffix="%" />
                <StatItem value={60} description="Increase Engagement time" suffix="%" />
                <StatItem value={50} description="Increase Loading speed" suffix="%" />
            </motion.div>
        </motion.div>
    );
};

const AboutUs: React.FC = () => {
    return (
        <div>
            {/* Banner Section */}
            <div
                className='pt-28 pb-2 relative'
                style={{
                    backgroundImage: `url(${banner.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Gradient overlay for better text readability */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), hsl(220, 65%, 3.52%))',
                    }}
                ></div>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="text-center relative z-10"
                >
                    <Box sx={{ width: { xs: '100%', md: 500 }, mx: 'auto', mb: { xs: 4, md: 5 } }}>
                        <motion.p
                            className="text-[2rem] md:text-[3rem] lg:!leading-snug font-normal lg:mt-3 text-white text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            The story behind <br />
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'inline-block',
                                }}
                            >
                                Digital Spyke
                            </span>
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <Stack sx={{ my: 3 }} direction="row" spacing={2} justifyContent="center">
                                {/* <Button
                                    variant="contained"
                                    href='projects'
                                    className="animated-button"
                                    sx={{
                                        backgroundColor: '#e6e6e6',
                                        color: 'black',
                                        padding: '6.5px 24px',
                                        borderRadius: '50px',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        textTransform: 'none',
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#d4d4d4',
                                        }
                                    }}
                                >
                                    See Our Work
                                </Button> */}
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
                                        href='contact'
                                        className="animated-button"
                                        sx={{
                                            backgroundColor: '#1D4ED8',
                                            color: 'white',
                                            padding: '6.5px 24px',
                                            borderRadius: '50px',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            textTransform: 'none',
                                            transition: 'background-color 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#1e40af',
                                            }
                                        }}
                                    >
                                        Contact Us!
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="animated-button animated-arrow"
                                        sx={{
                                            backgroundColor: '#1D4ED8',
                                            color: 'white',
                                            minWidth: '39px',
                                            padding: '0px',
                                            height: '39px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#1e40af',
                                            }
                                        }}
                                    >
                                        <ArrowForwardIcon sx={{ padding: '0px !important' }} />
                                    </Button>
                                </Stack>
                            </Stack>
                        </motion.div>
                    </Box>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div
                className="py-12 md:py-16"
                style={{
                    backgroundColor: 'hsl(220, 65%, 3.52%)',
                }}
            >
                <StatsSection />
            </div>
            <div>
                <OurApproach />
            </div>
        </div>
    );
};

export default AboutUs;