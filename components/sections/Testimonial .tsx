"use client";

import React from 'react';
import { Card, Typography, Box, Container, CardContent, useTheme, useMediaQuery, Avatar } from '@mui/material';
import Marquee from 'react-fast-marquee';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const testimonials = [
    {
      company: 'NUTRIMERCHANT',
      feedback:
        'Digital Spyke\'s attention to detail and dedication to understanding our business needs helped us reach our target audience effectively. Our website is now fast, functional, and easy to manage!',
      author: 'Emily J',
      role: '@Agency Owner',
      rating: 5,
    },
    {
      company: 'ECOBUILD',
      feedback:
        'Partnering with Digital Spyke has been instrumental in scaling our operations. The new website has not only attracted more clients but has improved overall team efficiency and project visibility.',
      author: 'John D',
      role: '@Project Manager',
      rating: 5,
    },
    {
      company: 'LiquidWave',
      feedback:
        'Digital Spyke worked wonders for us. They took our ideas, gave them life, and created a website that truly represents our brand\'s values. The professional approach and seamless process were impressive.',
      author: 'Sarah L',
      role: '@Founder',
      rating: 5,
    },
    {
      company: 'GreenFields',
      feedback:
        'Choosing Digital Spyke was one of the best decisions we made. They designed a website that fits our eco-conscious brand perfectly, and their customer support is outstanding.',
      author: 'David T',
      role: '@Marketing Director',
      rating: 5,
    },
    {
      company: 'UrbanTech Solutions',
      feedback:
        'Digital Spyke brought our vision to life with their cutting-edge design and understanding of tech solutions. We now have a site that stands out in our industry.',
      author: 'Lisa M',
      role: '@CEO',
      rating: 5,
    },
  ];

  const testimonials2 = [
    {
      company: 'FreshWave Foods',
      feedback:
        'Digital Spyke understood our brand and created a seamless online ordering experience, boosting customer engagement significantly.',
      author: 'Michael S',
      role: '@Brand Manager',
      rating: 5,
    },
    {
      company: 'Bright Futures Education',
      feedback:
        'Digital Spyke transformed our complex needs into a streamlined, user-friendly website, making the whole process smooth and enjoyable.',
      author: 'Sophia R',
      role: '@Program Director',
      rating: 5,
    },
    {
      company: 'HealthFirst Clinic',
      feedback:
        'Digital Spyke delivered a secure, reliable healthcare platform that meets compliance standards and enhances patient trust.',
      author: 'Dr. Liam W',
      role: '@Clinic Head',
      rating: 5,
    },
    {
      company: 'EcoScape Landscapes',
      feedback:
        'Digital Spyke provided a beautifully designed website that perfectly showcases our landscape services, exceeding expectations.',
      author: 'Olivia H',
      role: '@Co-Founder',
      rating: 5,
    },
    {
      company: 'Peak Performance Fitness',
      feedback:
        'Digital Spyke built a modern, user-friendly website that integrates seamlessly with our scheduling tools, bringing in more clients.',
      author: 'Jake B',
      role: '@Operations Manager',
      rating: 5,
    },
  ];

  // Function to render star ratings
  interface RenderStarsProps {
    rating: number;
  }

  const renderStars = (rating: RenderStarsProps['rating']): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        sx={{
          fontSize: '14px',
          color: index < rating ? '#FFD700' : 'rgba(255,255,255,0.3)',
        }}
      />
    ));
  };

  // Glassmorphism card styles (same as FeaturesSection)
  const cardStyles = {
    width: isMobile ? 280 : 350,
    minWidth: isMobile ? 280 : 350,
    height: '100%',
    transition: 'transform 0.3s, box-shadow 0.3s',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.01)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    cursor: 'pointer',
    overflow: 'hidden',
    p: 2.5,
    m: 1.5,
    position: 'relative',
  };

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      py: 8,
      px: { xs: 0, md: 12 }
    }}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <Box sx={{ maxWidth: '3xl', mx: 'auto', textAlign: 'center', mb: 5 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.8rem', lg: '40px' },
                fontWeight: 500,
                color: 'white',
                mt: 0,
                mb: 0,
                lineHeight: '1.15em',
                letterSpacing: '-0.03em',
              }}
            >
              Making{' '}
              <span style={{
                background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}>hundreds of businesses</span> better, big or small.
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mt: 2,
                fontSize: '1rem',
              }}
            >
              Don't just take our word for it - hear from our satisfied clients.
            </Typography>
          </Box>
        </motion.div>
        <Box sx={{ mb: 0 }}>
          <Marquee
            gradient={true}
            speed={30}
            gradientColor="hsl(220, 65%, 3.52%)"
            gradientWidth={isMobile ? 50 : 200}
            style={{ width: '100%' }}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={index} sx={cardStyles}>
                {/* Blue gradient line at the top of the card */}
                <Box
                  sx={{
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)',
                    position: 'absolute',
                    top: '0px',
                    left: '10%',
                    right: '10%',
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 42,
                        height: 42,
                        bgcolor: 'rgba(107, 70, 255, 0.2)',
                      }}
                    >
                      {testimonial.author.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: '500', color: 'white' }}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
                        {testimonial.role}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 0.5 }}>{renderStars(testimonial.rating)}</Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 1.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontStyle: 'italic',
                        fontSize: '0.75rem',
                      }}
                    >
                      "{testimonial.company}"
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {testimonial.feedback}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </Box>

        <Box>
          <Marquee
            direction="right"
            gradient={true}
            speed={30}
            gradientColor="hsl(220, 65%, 3.52%)"
            gradientWidth={isMobile ? 50 : 200}
            style={{ width: '100%' }}
          >
            {testimonials2.map((testimonial, index) => (
              <Card key={index} sx={cardStyles}>
                {/* Blue gradient line at the top of the card */}
                <Box
                  sx={{
                    height: '0.5px',
                    background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)',
                    position: 'absolute',
                    top: '0px',
                    left: '10%',
                    right: '10%',
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 42,
                        height: 42,
                        bgcolor: 'rgba(107, 70, 255, 0.2)',
                      }}
                    >
                      {testimonial.author.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: '500', color: 'white' }}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
                        {testimonial.role}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 0.5 }}>{renderStars(testimonial.rating)}</Box>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontStyle: 'italic',
                        fontSize: '0.75rem',
                      }}
                    >
                      "{testimonial.company}"
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {testimonial.feedback}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </Box>
      </Container>
    </Box>
  );
}