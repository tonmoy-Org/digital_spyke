'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Grid,
    Box,
    CircularProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

const BlogSection: React.FC = () => {
    const router = useRouter();

    const { data: cardData, error, isValidating } = useSWR<BlogCard[]>(
        'https://naturals-server.vercel.app/api/blogs',
        fetcher
    );

    const handleCardClick = (title_id: string) => {
        router.push(`/blog/${title_id}`);
    };

    if (error) return <div>Error loading blogs.</div>;
    if (!cardData || isValidating) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                <CircularProgress sx={{ color: '#7a58ff' }} />
            </Box>
        );
    }

    const latestBlog = [...cardData].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];
    const featuredBlogs = [...cardData].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <Box sx={{ pb: 10 }}>
            <Box sx={{ backgroundColor: '#0F0A2F' }}>
                <div className="max-w-7xl mx-auto py-10">
                    <Box>
                        <Grid container spacing={4} sx={{ pt: 6, pb: 6, px: 2 }}>
                            <Grid item xs={12} md={6}>
                                <Image
                                    src={latestBlog.imageUrl}
                                    alt={latestBlog.title}
                                    onClick={() => handleCardClick(latestBlog.title_id)}
                                    width={800}
                                    height={500}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 2,
                                        cursor: 'pointer'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center">
                                <Typography
                                    onClick={() => handleCardClick(latestBlog.title_id)}
                                    sx={{
                                        color: 'white',
                                        fontWeight: 500,
                                        mb: 2,
                                        lineHeight: 1.2,
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                                        cursor: 'pointer'
                                    }}
                                >
                                    {latestBlog.title}
                                </Typography>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        <CalendarMonthIcon sx={{ color: 'white', width: 20 }} />
                                        {new Date(latestBlog.updatedAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
                                    >
                                        {calculateReadingTime(latestBlog.content)} min read
                                        <BookmarkIcon sx={{ color: 'white', width: 20 }} />
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className="px-3 w-full mx-auto">
                        <Grid container spacing={4}>
                            {featuredBlogs.map((card) => {
                                const readingTime = calculateReadingTime(card.content);

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={card._id}>
                                        <Box
                                            onClick={() => handleCardClick(card.title_id)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Card
                                                sx={{
                                                    width: '100%',
                                                    height: { xs: 'auto', sm: 420 },
                                                    position: 'relative',
                                                    color: 'white',
                                                    backgroundColor: 'hsl(0, 0%, 3.9%)',
                                                    padding: 1,
                                                    border: '1px solid rgba(225, 225, 225, 0.1)',
                                                    borderRadius: 2,
                                                    margin: 'auto'
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    height="220"
                                                    image={card.imageUrl}
                                                    alt={card.title}
                                                    sx={{ padding: 1.5, width: '100%', borderRadius: 2, height: 220, objectFit: 'cover' }}
                                                />
                                                <CardActions
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
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
                                                    <Typography sx={{ color: 'white', fontSize: { xs: 14, sm: 16 }, fontWeight: 500 }}>
                                                        {card.title}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </div>
            </Box>
            <div className="pt-10">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-normal text-white mt-3 leading-snug text-center py-4">
                    All <span
                        style={{
                            background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>Blogs</span>
                </h2>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center',
                        px: { xs: 2, sm: 0 }
                    }}
                >
                    {cardData.map((card) => {
                        const readingTime = calculateReadingTime(card.content);

                        return (
                            <Box
                                key={card._id}
                                onClick={() => handleCardClick(card.title_id)}
                                sx={{ cursor: 'pointer', width: { xs: '100%', sm: 400 } }}
                            >
                                <Card
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        color: 'white',
                                        backgroundColor: 'hsl(0, 0%, 3.9%)',
                                        padding: 1,
                                        border: '1px solid rgba(225, 225, 225, 0.1)',
                                        borderRadius: 2
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={card.imageUrl}
                                        alt={card.title}
                                        sx={{ padding: 1.5, width: '100%', borderRadius: 2, height: 220, objectFit: 'cover' }}
                                    />
                                    <CardActions
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
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
                                        <Typography sx={{ color: 'white', fontSize: { xs: 14, sm: 16 }, fontWeight: 500 }}>
                                            {card.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        );
                    })}
                </Box>
            </div>
        </Box>
    );
};

export default BlogSection;
