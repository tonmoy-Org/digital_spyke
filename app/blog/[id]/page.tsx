'use client';

import AnimatedCustomLoader from '@/app/loading';
import MoreBlog from '@/components/blog/MoreBlog';
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Box,
} from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

interface BlogPost {
    title: string;
    date: string;
    imageUrl: string;
    shortDescription: string;
    content: string;
    updatedAt: string;
    createdAt: string;
}

const BlogDetails: React.FC = () => {
    const params = useParams();
    const id = params?.id;
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await fetch(`https://naturals-server.vercel.app/api/blogs/${id}`);
                if (!response.ok) throw new Error('Failed to fetch blog data');
                const data = await response.json();
                setBlogPost(data);
            } catch (error: any) {
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [id]);

    if (loading) {
        return (
            <Box>
                <AnimatedCustomLoader />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!blogPost) {
        return (
            <Box sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                    Blog post not found.
                </Typography>
            </Box>
        );
    }

    return (
        <div>
            <div className='lg:max-w-6xl mx-auto'>
                <Box sx={{ pt: { xs: 10, md: 10 }, pb: 5 }}>
                    <Box
                        sx={{
                            maxWidth: '7xl',
                            mx: 'auto',
                            px: { xs: 1, md: 3 },
                        }}
                    >
                        <Card
                            sx={{
                                backgroundColor: 'hsl(220, 65%, 3.52%)',
                                color: 'white',
                                p: { xs: 2, md: 4 },
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        >
                            <Typography
                                gutterBottom
                                sx={{
                                    textTransform: 'uppercase',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    animation: 'shadow-pulse 1.5s infinite',
                                }}
                            >
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
                                    Blog
                                </span>
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'hsl(220 10% 54.4%)',
                                    fontSize: '0.8rem',
                                }}
                            >
                                Last Updated: {new Date(blogPost.updatedAt).toLocaleString()}
                            </Typography>

                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    mt: 2,
                                    mb: 3,
                                }}
                            >
                                {blogPost.title}
                            </Typography>

                            <CardMedia
                                component="img"
                                image={blogPost.imageUrl}
                                alt={blogPost.title}
                                sx={{
                                    height: { xs: 250, md: 450 },
                                    width: '100%',
                                    borderRadius: 1,
                                    objectFit: 'cover',
                                }}
                            />

                            <CardContent sx={{ p: 0, my: 3 }}>
                                <Typography
                                    sx={{
                                        color: 'hsl(220 10% 90%)',
                                    }}
                                >
                                    <Box sx={{
                                        '& .ql-editor': {
                                            fontSize: '1rem',
                                            lineHeight: 1.4,
                                            color: 'hsl(220 10% 90%)',
                                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                            '& h2': {
                                                fontSize: '2rem',
                                                fontWeight: 700,
                                                color: 'hsl(220 10% 90%)',
                                                letterSpacing: '-0.01em',
                                            },
                                            '& h3': {
                                                fontSize: '1.5rem',
                                                fontWeight: 700,
                                                color: 'hsl(220 10% 90%)',
                                            },
                                            '& p': {
                                                color: 'hsl(220 10% 90%)',
                                            },
                                            '& iframe': {
                                                width: '100%',
                                                minHeight: '400px',
                                                my: 4,
                                                border: 'none',
                                                borderRadius: 2,
                                            },
                                            '& blockquote': {
                                                borderLeft: '4px solid',
                                                borderColor: 'primary.main',
                                                fontStyle: 'italic',
                                                color: 'hsl(220 10% 90%)',
                                            },
                                        },
                                    }}>
                                        <ReactQuill
                                            value={blogPost.content}
                                            readOnly={true}
                                            theme="bubble"
                                        />
                                    </Box>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <MoreBlog />
            </Box>
        </div>
    );
};

export default BlogDetails;
