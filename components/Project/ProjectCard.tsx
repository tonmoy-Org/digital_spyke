'use client';

import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import dynamic from 'next/dynamic';

import p1 from '@/public/projects/p1/f1.png';
import p2 from '@/public/projects/p2/p2.png';
import p3 from '@/public/projects/p3/p3.png';
import p4 from '@/public/projects/p4/p4.png';

import Image from 'next/image';
import Link from 'next/link';

const MotionCard = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
    ssr: false,
});

const cardData = [
    {
        id: 'nova-ukraine',
        title: "Results-Driven Marketing,Tailored for You",
        description: "Merca Media offers a results-driven marketing solution that combines a range of services to help businesses effectively promote their products and services to their target audience.",
        problem: "Businesses often struggle to find the right marketing solution that meets their specific needs and goals.",
        image: p1,
    },
    {
        id: 'skintonia',
        title: "Elegant Durable Effortless.",
        description: "The EternitiTeaTM Magic Pot is a versatile teapot that can be used for a variety of tea-related tasks, from brewing tea to serving tea to hosting tea parties. Its unique design and functionality make it a one-stop solution for all your tea needs.",
        image: p2,
    },
    {
        id: 'nutrimerchant',
        title: "Unlock Radiance: Hair and Skin Magic Await!",
        description: "Caring for your skin and hair just became a joyful experience! Dive into a world where beauty meets fun, with products designed to nurture, uplift, and bring out your natural glow—because self-care should be as exciting as it is effective!",
        image: p3,
    },
    {
        id: 'milanostore',
        title: "NeuCura - Beauty and Wellness",
        description: "NeuCura is a modern decor platform with an interactive gallery, virtual room designer, and curated furniture store for an inspiring shopping experience.",
        image: p4,
    },
];

const ProjectCard: React.FC = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#0F0A2F' }}>
            <Grid container spacing={5} justifyContent="center" sx={{ px: { xs: 2, sm: 4 } }}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={5} key={index}>
                        <Link href={`/projects/${card.id}`} passHref legacyBehavior>
                            <MotionCard style={{ textDecoration: 'none', display: 'block' }}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        height: { xs: 'auto', md: 510 },
                                        position: 'relative',
                                        color: 'white',
                                        backgroundColor: 'hsl(0, 0%, 3.9%)',
                                        border: '1px solid rgba(225, 225, 225, 0.1)',
                                        overflow: 'hidden',
                                        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 300 }}>
                                        <Image
                                            alt={card.title}
                                            src={card.image}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Box>
                                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                                        <Typography sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.2rem', md: '1.8rem' } }}>
                                            {card.title}
                                        </Typography>
                                        <Typography sx={{ color: 'hsl(220, 10%, 60%)', mb: 3, fontSize: '.875rem' }}>
                                            <span className="line-clamp-2">{card.description}</span>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </MotionCard>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProjectCard;
