'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Divider, Container, Grid, CircularProgress } from '@mui/material';
import { LocationOn, Email, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import Image from 'next/image';
import map from '@/public/banner/world.svg';
import banner from '@/public/banner/new-banner.svg';

interface FormValues {
  name: string;
  email: string;
  message: string;
  company: string;
  phone: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.web3forms.com/submit', {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_CONTACT,
        subject: "New Contact Form Submission from Your Website Digital Spyke",
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company,
        to: "contact@digitalspyke.com",
        message: data.message,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: "Your message has been sent successfully! We'll get back to you shortly.",
          confirmButtonColor: '#FFD700',
        });
        reset();
      } else {
        throw new Error('Response not OK');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: "There was an error sending your message. Please check your connection and try again.",
        confirmButtonColor: '#1D4ED8',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <div
        className='pt-28 pb-10 relative'
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
          <Box sx={{ width: { xs: '100%', md: 1000 }, mx: 'auto', mb: { xs: 4, md: 5 } }}>
            <motion.p
              className="text-[2rem] md:text-[3rem] lg:!leading-snug font-normal lg:mt-3 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className='ms-2'>Let’s </span>
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
                Talk
              </span>

            </motion.p>
            <motion.p
              className="text-sm lg:text-[1.125rem] lg:!leading-snug lg:mt-3 text-[#BABABA] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              No pressure, no sales talk—just real people ready to help.
            </motion.p>
          </Box>
        </motion.div>
      </div>
      <Box id="contact" sx={{ pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start' }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <Box p={4} color="white">
                  <Typography
                    sx={{
                      background: 'linear-gradient(to bottom, #D1D5DB, #1F2937)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                      textTransform: 'uppercase',
                    }}
                  >
                    Get In Touch
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    <a
                      href="mailto:contact@digitalspyke.ca"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        flexWrap: 'wrap',  // Ensures the content wraps properly on 
                      }}

                    >
                      <Email sx={{
                        verticalAlign: 'middle',
                        my: 1,
                        mr: 1,
                        transition: 'transform 0.3s ease',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' }  // Adjusts icon size based on screen size
                      }} />
                      <span style={{ fontSize: '1rem', paddingRight: '10px' }}>
                        contact@digitalspyke.ca
                      </span>
                    </a>

                    {/* Phone Number Section */}
                    <a
                      href="tel:+16477956041"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        flexWrap: 'wrap',
                      }}
                      className="phone-link"
                    >
                      <Phone sx={{
                        verticalAlign: 'middle',
                        mr: 1,
                        transition: 'transform 0.3s ease',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' }  // Adjusts icon size based on screen size
                      }} />
                      <span style={{ fontSize: '1rem', paddingRight: '10px' }}>
                        +1(647)-931-1690
                      </span>
                    </a>
                  </Typography>

                  <Typography variant="body1">
                    <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Toronto, Canada
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Image
                      src={map}
                      alt="Map of the world"
                      width={400}
                      height={300}
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box bgcolor="#1E1E1E" p={4} color="white" sx={{ borderRadius: '8px', height: '100%' }}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    sx={inputStyles}
                  />

                  <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    sx={inputStyles}
                  />
                  <TextField
                    label="Phone Number"
                    fullWidth
                    variant="outlined"
                    {...register('phone', { required: 'Phone Number is required' })}
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    sx={inputStyles}
                  />
                  <TextField
                    label="Company"
                    fullWidth
                    variant="outlined"
                    {...register('company', { required: 'Company is required' })}
                    error={!!errors.company}
                    helperText={errors.company ? errors.company.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    sx={inputStyles}
                  />
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    {...register('message', { required: 'Message is required' })}
                    error={!!errors.message}
                    helperText={errors.message ? errors.message.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    sx={inputStyles}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
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
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <style jsx global>{`
                @keyframes shadow-pulse {
                    0% {
                        text-shadow: 0 0 5px rgba(255, 215, 0, 0.6);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(255, 215, 0, 1);
                    }
                    100% {
                        text-shadow: 0 0 5px rgba(255, 215, 0, 0.6);
                    }
                }
            `}</style>
      </Box>
    </Box>
  );
};

// Styles
const inputStyles = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#555' },
    '&:hover fieldset': { borderColor: 'rgba(225, 225, 225, 0.1)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(225, 225, 225, 0.1)' },
  },
  '& .MuiInputLabel-root': { color: '#999' },
  '&:hover .MuiInputLabel-root': { color: '' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'gray' },
};

const buttonStyles = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  textTransform: 'none',
  color: 'black',
};

export default Contact;
