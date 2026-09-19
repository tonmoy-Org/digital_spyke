'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const staggerContainer = {
    hidden: { opacity: 0, y: 100 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.3,
            duration: 0.5,
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const calculateReadingTime = (text: string) => {
    const words = text.split(' ').length;
    const readingSpeed = 200;
    return Math.ceil(words / readingSpeed);
};

interface BlogCard {
    _id: string;
    imageUrl: string;
    title: string;
    shortDescription: string;
    content: string;
    updatedAt: string;
    title_id: string;
}

const BlogCardComponent: React.FC<{ card: BlogCard; handleCardClick: (id: string) => void }> = ({
    card,
    handleCardClick,
}) => {
    const readingTime = calculateReadingTime(card.content);

    return (
        <motion.div onClick={() => handleCardClick(card.title_id)} style={{ cursor: 'pointer' }}>
            <Card
                sx={{
                    width: { xs: '100%', sm: 400 },
                    height: { xs: 'auto', sm: 410 },
                    position: 'relative',
                    color: 'white',
                    backgroundColor: 'hsl(0, 0%, 3.9%)',
                    padding: 1,
                    border: '1px solid rgba(225, 225, 225, 0.1)',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={card.imageUrl}
                    alt={card.title}
                    sx={{ padding: 2, height: { xs: 180, sm: 220 }, width: '100%', objectFit: 'cover' }}
                />
                <CardActions
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                        <CalendarMonthIcon sx={{ color: 'white', mr: 1, width: 20 }} />
                        {new Date(card.updatedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                        {readingTime} min read
                        <BookmarkIcon sx={{ color: 'white', ml: 1 }} />
                    </Typography>
                </CardActions>
                <CardContent>
                    <Typography sx={{ color: 'white', fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}>
                        {card.title}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const MoreBlog: React.FC = () => {
    const router = useRouter();

    const { data: cardData, error } = useSWR<BlogCard[]>('https://naturals-server.vercel.app/api/blogs', fetcher);

    const handleCardClick = (title_id: string) => {
        router.push(`/blog/${title_id}`);
    };

    if (error) return <div>Error loading blogs.</div>;
    if (!cardData) return <div>Loading...</div>;

    const suggestedBlogs = [...cardData].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <div className='max-w-7xl mx-auto'>
            <Box sx={{ pt: 0, pb: 10, }}>
                <h2 className="text-[2rem] md:text-[3rem] lg:!leading-snug font-normal lg:mt-3 text-white text-center">
                    Check Out Some  <span
                        style={{
                            background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                            display: 'inline-block',
                        }}
                    >More Blogs</span>
                </h2>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <Grid container spacing={4} justifyContent="center">
                        {suggestedBlogs.map((card) => (
                            <Grid item xs={12} sm={6} md={4} key={card._id}>
                                <motion.div variants={staggerItem}>
                                    <BlogCardComponent card={card} handleCardClick={handleCardClick} />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Box>
        </div>
    );
};

export default MoreBlog;
