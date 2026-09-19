'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import something_lost from '@/public/lost-page/something-lost.png';

const NotFound = () => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: 3,
            }}
        >
            {/* Display Image */}
            <Box sx={{ width: '100%', maxWidth: 400, marginBottom: 4 }}>
                <Image
                    src={something_lost}
                    alt="Lost page illustration"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </Box>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 500,
                    color: '#9333ea', // Loader bar color
                    marginBottom: 2,
                }}
            >
                Oops! Page Not Found
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontSize: '1rem',
                    color: '#888',
                    marginBottom: 4,
                    maxWidth: 600,
                }}
            >
                The page you’re looking for doesn’t exist or has been moved. Please check the URL or navigate back to the homepage.
            </Typography>

            {/* Button to Redirect */}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#9333ea', // Loader inner circle color
                    },
                    padding: '10px 20px',
                    borderRadius: 50,
                    textTransform: 'none',
                    fontSize: '1rem',
                }}
                onClick={() => router.push('/')}
            >
                Go Back to Home
            </Button>
        </Box>
    );
};

export default NotFound;
