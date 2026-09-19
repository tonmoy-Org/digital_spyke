'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Container, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

interface FormValues {
    email: string;
}

export default function Unsubscribe() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.web3forms.com/submit',
                JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_NEWSLETTER,
                    subject: 'Unsubscription Request Digital Spyke',
                    email: data.email,
                    from_name: data.email,
                    message: 'Unsubscription Request',
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Unsubscribed',
                    text: 'You have successfully been removed from our mailing list.',
                    confirmButtonColor: '#0DCCD7',
                });
                reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue with your unsubscription request. Please try again later.',
                    confirmButtonColor: '#0DCCD7',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred while processing your request. Please try again.',
                confirmButtonColor: '#0DCCD7',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ pt: 10, pb: 10 }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.4 }}
                >

                    <Box textAlign="center" sx={{ my: 2 }}>
                        <div className="relative inline-flex h-8 overflow-hidden rounded-full p-[1.5px] focus:outline-none select-none">
                            <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#6d28d9_0%,#d8b4fe_50%,#6d28d9_100%)]"></span>
                            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                <Link href='/contact-us' className="text-white">Start Building Now</Link>
                            </span>
                        </div>
                    </Box>
                    <Box sx={{ px: 2, mx: 'auto', mb: { xs: 4, md: 6 }, maxWidth: { xs: 330, sm: 500, md: 700 } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '2.5rem' },
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white',
                                lineHeight: { xs: '1.5', md: '1.8' },
                            }}
                        >
                            Unsubscribe from Our Newsletter
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: { xs: '0.9rem', md: '1.125rem' },
                                textAlign: 'center',
                                color: '#BABABA',
                                mt: 2,
                            }}
                        >
                            We understand that preferences change. If you'd no longer like to receive updates, please enter your email address below to be removed from our mailing list. We hope to stay in touch in the future!
                        </Typography>
                    </Box>


                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >

                    <Box
                        bgcolor="rgba(30, 30, 30, 0.9)"
                        p={4}
                        sx={{
                            borderRadius: '12px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(6px)',
                            maxWidth: { xs: '100%', md: '550px' },
                            mx: 'auto',
                        }}
                    >

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <TextField
                                    label="Email Address"
                                    fullWidth
                                    variant="outlined"
                                    {...register('email', {
                                        required: 'Please enter your email address.',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Please enter a valid email address.',
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                    InputProps={{
                                        style: { color: 'white' },
                                    }}
                                    sx={{
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#555' },
                                            '&:hover fieldset': { borderColor: 'rgba(225, 225, 225, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: 'rgba(225, 225, 225, 0.1)' },
                                        },
                                        '& .MuiInputLabel-root': { color: '#999' },
                                        '&:hover .MuiInputLabel-root': { color: '' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'gray' },
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        color: 'black',
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} sx={{ color: '#FFF' }} /> : 'Unsubscribe'}
                                </Button>
                            </motion.div>
                        </form>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
