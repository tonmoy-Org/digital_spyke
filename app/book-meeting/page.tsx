"use client";

import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Button, Stack } from "@mui/material";
import banner from '@/public/banner/new-banner.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BookMeeting: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Box>
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
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), hsl(220, 65%, 3.52%)',
                    }}
                ></div>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="text-center relative z-10"
                >
                    <Box sx={{ width: { xs: '100%', md: 800 }, mx: 'auto', mb: { xs: 4, md: 5 } }}>
                        <motion.p
                            className="text-[2rem] md:text-[3rem] lg:!leading-snug font-normal lg:mt-3 text-white text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                Book Your Meeting
                            </span>
                            {''}  with Digital Spyke
                        </motion.p>
                        <motion.p
                            className="text-[0.8rem] lg:text-[1.125rem] lg:!leading-snug lg:mt-3 text-[#BABABA] text-center lg:w-[550px] py-2 mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Schedule a meeting with our expert team to discuss how we can help elevate your agency’s digital journey.
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
                                            backgroundColor: '#5a3ae4', // Darker background on hover
                                        },
                                        '&:hover .animated-arrow': {
                                            transform: 'translateX(5px)', // Move the arrow button to the right
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
            <div className='flex justify-center max-w-7xl mx-auto pb-20 lg:pb-0 px-3 lg:px-0'>
                <Box
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/socials-Digital Spyke/30min?background_color=1E1E1E&text_color=ffffff"
                    sx={{
                        width: '100%',
                        height: { xs: '1000px', md: '750px' },
                        borderRadius: '8px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                        overflow: 'hidden',
                    }}
                ></Box>
            </div>
        </Box>
    );
};

export default BookMeeting;
