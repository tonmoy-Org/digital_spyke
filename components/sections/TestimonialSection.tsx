"use client";

import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Container, CardContent, useTheme, useMediaQuery, Avatar } from '@mui/material';
import Marquee from 'react-fast-marquee';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import {
  User,
  UserCheck,
  Building2,
  Briefcase,
  Quote,
  Star,
  Award,
  Crown,
  Sparkles,
  Heart,
  Shield,
  ThumbsUp,
  Zap,
  CheckCircle2,
  Smile,
  Compass,
  Layers,
} from 'lucide-react';
import {
  TestimonialItem,
  TestimonialsSectionData,
  DEFAULT_TESTIMONIALS_DATA,
} from '@/types/testimonials';

const LUCIDE_ICON_MAP: Record<string, React.ElementType> = {
  User,
  UserCheck,
  Building2,
  Briefcase,
  Quote,
  Star,
  Award,
  Crown,
  Sparkles,
  Heart,
  Shield,
  ThumbsUp,
  Zap,
  CheckCircle2,
  Smile,
  Compass,
  Layers,
};

export default function TestimonialSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [data, setData] = useState<TestimonialsSectionData>(DEFAULT_TESTIMONIALS_DATA);

  useEffect(() => {
    // 1. Instant local storage cache check for zero-latency paint
    try {
      const cached = localStorage.getItem('digital_spyke_testimonials');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0) {
          setData(parsed);
        }
      }
    } catch (e) {}

    // 2. Fetch fresh data from API
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          try {
            localStorage.setItem('digital_spyke_testimonials', JSON.stringify(json.data));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      }
    }
    fetchTestimonials();
  }, []);

  const renderStars = (rating: number): JSX.Element[] => {
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

  const row1Testimonials = data.testimonials.filter((t) => t.row === 'row1');
  const row2Testimonials = data.testimonials.filter((t) => t.row === 'row2');

  // Fallback in case one of the rows is empty
  const activeRow1 = row1Testimonials.length > 0 ? row1Testimonials : data.testimonials.slice(0, 5);
  const activeRow2 = row2Testimonials.length > 0 ? row2Testimonials : data.testimonials.slice(5);

  const renderAvatar = (testimonial: TestimonialItem) => {
    if (testimonial.avatarType === 'image' && testimonial.avatarImage) {
      return (
        <Avatar
          src={testimonial.avatarImage}
          alt={testimonial.author}
          sx={{
            width: 42,
            height: 42,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
      );
    }

    if (testimonial.avatarType === 'icon' && testimonial.avatarIcon) {
      const IconComponent = LUCIDE_ICON_MAP[testimonial.avatarIcon] || User;
      return (
        <Avatar
          sx={{
            width: 42,
            height: 42,
            bgcolor: testimonial.avatarBgColor || 'rgba(107, 70, 255, 0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <IconComponent style={{ width: 22, height: 22, color: '#ffffff' }} />
        </Avatar>
      );
    }

    // Default Initials Avatar
    return (
      <Avatar
        sx={{
          width: 42,
          height: 42,
          bgcolor: testimonial.avatarBgColor || 'rgba(107, 70, 255, 0.2)',
          color: '#ffffff',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {testimonial.author ? testimonial.author.charAt(0) : 'A'}
      </Avatar>
    );
  };

  return (
    <Box
      sx={{
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
            {data.badgeText && (
              <Box sx={{ mb: 1.5 }}>
                <span
                  style={{
                    fontSize: data.badgeFontSize || '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#00FFAB',
                    background: 'rgba(0, 255, 171, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    display: 'inline-block',
                  }}
                >
                  {data.badgeText}
                </span>
              </Box>
            )}

            {data.headingHtml ? (
              <Typography
                component="div"
                sx={{
                  fontSize: { xs: '1.8rem', lg: data.headingFontSize || '40px' },
                  fontWeight: 500,
                  color: 'white',
                  mt: 0,
                  mb: 0,
                  lineHeight: '1.15em',
                  letterSpacing: '-0.03em',
                  '& p': { m: 0, display: 'inline' },
                }}
                dangerouslySetInnerHTML={{ __html: data.headingHtml }}
              />
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: '1.8rem', lg: data.headingFontSize || '40px' },
                  fontWeight: 500,
                  color: 'white',
                  mt: 0,
                  mb: 0,
                  lineHeight: '1.15em',
                  letterSpacing: '-0.03em',
                }}
              >
                {data.headingPrefix}
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
                  {data.headingHighlight}
                </span>
                {data.headingSuffix}
              </Typography>
            )}

            {data.descriptionHtml ? (
              <Typography
                component="div"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  mt: 2,
                  fontSize: data.descriptionFontSize || '1rem',
                  '& p': { m: 0 },
                }}
                dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
              />
            ) : (
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  mt: 2,
                  fontSize: data.descriptionFontSize || '1rem',
                }}
              >
                {data.description}
              </Typography>
            )}
          </Box>
        </motion.div>

        {/* Top Marquee (Row 1 - Scrolling Left) */}
        <Box sx={{ mb: 0 }}>
          <Marquee
            gradient={true}
            speed={data.row1Speed || 30}
            pauseOnHover={data.pauseOnHover !== false}
            gradientColor="hsl(220, 65%, 3.52%)"
            gradientWidth={isMobile ? 50 : 200}
            style={{ width: '100%' }}
          >
            {activeRow1.map((testimonial, index) => (
              <Card key={testimonial.id || index} sx={cardStyles}>
                <Box
                  sx={{
                    height: '1px',
                    background:
                      'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)',
                    position: 'absolute',
                    top: '0px',
                    left: '10%',
                    right: '10%',
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    {renderAvatar(testimonial)}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        component="div"
                        variant="subtitle2"
                        sx={{
                          fontWeight: '500',
                          color: 'white',
                          fontSize: testimonial.authorFontSize || undefined,
                          '& p': { m: 0, display: 'inline' },
                        }}
                        dangerouslySetInnerHTML={{ __html: testimonial.author }}
                      />
                      <Typography
                        component="div"
                        variant="caption"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          display: 'block',
                          fontSize: testimonial.roleFontSize || undefined,
                          '& p': { m: 0, display: 'inline' },
                        }}
                        dangerouslySetInnerHTML={{ __html: testimonial.role }}
                      />
                      <Box sx={{ display: 'flex', mt: 0.5 }}>{renderStars(testimonial.rating)}</Box>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography
                      component="div"
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontStyle: 'italic',
                        fontSize: testimonial.companyFontSize || '0.75rem',
                        '& p': { m: 0, display: 'inline' },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: testimonial.company?.startsWith('"')
                          ? testimonial.company
                          : `"${testimonial.company}"`,
                      }}
                    />
                  </Box>

                  <Typography
                    component="div"
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: testimonial.feedbackFontSize || (isMobile ? '0.8rem' : '0.9rem'),
                      lineHeight: 1.6,
                      '& p': { m: 0 },
                    }}
                    dangerouslySetInnerHTML={{ __html: testimonial.feedback }}
                  />
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </Box>

        {/* Bottom Marquee (Row 2 - Scrolling Right) */}
        <Box>
          <Marquee
            direction="right"
            gradient={true}
            speed={data.row2Speed || 30}
            pauseOnHover={data.pauseOnHover !== false}
            gradientColor="hsl(220, 65%, 3.52%)"
            gradientWidth={isMobile ? 50 : 200}
            style={{ width: '100%' }}
          >
            {activeRow2.map((testimonial, index) => (
              <Card key={testimonial.id || index} sx={cardStyles}>
                <Box
                  sx={{
                    height: '0.5px',
                    background:
                      'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)',
                    position: 'absolute',
                    top: '0px',
                    left: '10%',
                    right: '10%',
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    {renderAvatar(testimonial)}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        component="div"
                        variant="subtitle2"
                        sx={{
                          fontWeight: '500',
                          color: 'white',
                          fontSize: testimonial.authorFontSize || undefined,
                          '& p': { m: 0, display: 'inline' },
                        }}
                        dangerouslySetInnerHTML={{ __html: testimonial.author }}
                      />
                      <Typography
                        component="div"
                        variant="caption"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          display: 'block',
                          fontSize: testimonial.roleFontSize || undefined,
                          '& p': { m: 0, display: 'inline' },
                        }}
                        dangerouslySetInnerHTML={{ __html: testimonial.role }}
                      />
                      <Box sx={{ display: 'flex', mt: 0.5 }}>{renderStars(testimonial.rating)}</Box>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography
                      component="div"
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontStyle: 'italic',
                        fontSize: testimonial.companyFontSize || '0.75rem',
                        '& p': { m: 0, display: 'inline' },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: testimonial.company?.startsWith('"')
                          ? testimonial.company
                          : `"${testimonial.company}"`,
                      }}
                    />
                  </Box>

                  <Typography
                    component="div"
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: testimonial.feedbackFontSize || (isMobile ? '0.8rem' : '0.9rem'),
                      lineHeight: 1.6,
                      '& p': { m: 0 },
                    }}
                    dangerouslySetInnerHTML={{ __html: testimonial.feedback }}
                  />
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </Box>
      </Container>
    </Box>
  );
}
