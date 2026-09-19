'use client';

import React from 'react';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import banner from '@/public/banner/new-banner.svg';

export default function BlogCard() {
    return (
        <div
            className='pt-28 pb-10 relative'
            style={{
                backgroundImage: `url(${banner.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
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
                <Box sx={{ width: { xs: '100%', md: 1000 }, mx: 'auto', mb: { xs: 4, md: 5 } }}>
                    <motion.p
                        className="text-[2rem] md:text-[3rem] lg:!leading-snug font-bold lg:mt-3 text-white text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span
                            style={{
                                background: 'linear-gradient(45deg, #7a58ff 40%, #9d86ff 60%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                display: 'inline-block',
                            }}
                        >
                            Latest News
                        </span>
                        <span className='ms-2'>From Digital Spyke</span>
                    </motion.p>
                </Box>
            </motion.div>
        </div>
    );
}
