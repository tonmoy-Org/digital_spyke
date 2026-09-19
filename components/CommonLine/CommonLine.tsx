import { Typography } from '@mui/material';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function CommonLine() {
    return (
        <div className='lg:py-10 pt-7'>
            <Marquee direction='right' speed={40} gradient={false}>
                <Typography
                    sx={{
                        background: 'linear-gradient(to bottom, #D1D5DB, #1F2937)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >Collaborate with our team to create meaningful solutions.</Typography>
            </Marquee>
            <Marquee direction='left' speed={40} gradient={false}>
                <Typography sx={{
                    background: 'linear-gradient(to bottom, #D1D5DB, #1F2937)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                }}>Contact us to start your next project today!</Typography>
            </Marquee>
        </div>
    );
}
