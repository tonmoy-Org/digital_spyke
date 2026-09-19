'use client';

import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logo from '@/public/logo/acecloud.png';


export default function AnimatedCustomLoader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1300,
                flexDirection: 'column',
            }}
        >
            {/* Loader Animation */}
            <CirclesWithBar
                height={80}
                width={80}
                color="#2563eb"
                outerCircleColor="#2563eb"
                innerCircleColor="#9333ea"
                barColor="#9333ea"
                ariaLabel="Loading content"
                visible={true}
            />

            {/* Logo and Loader Branding */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 3,
                }}
            >
                {/* Logo */}
                <Image
                    src={logo}
                    alt="Digital Spyke Logo"
                    style={{
                        width: 150,
                        marginBottom: 16,
                        animation: 'pulse 1.5s infinite ease-in-out',
                    }}
                />
            </Box>

            {/* Tagline */}
            <Typography
                sx={{
                    color: 'white',
                    mt: 3,
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    letterSpacing: '0.05rem',
                    textAlign: 'center',
                    opacity: 0,
                    animation: 'fadeIn 1.5s 1s forwards',
                }}
            >
                Bringing Your Vision to Life
            </Typography>
        </Box>
    );
}
