'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Zap,
  Navigation,
  Sparkles,
  Rocket,
  Target,
  Shield,
  Code2,
  Cpu,
  Layers,
  Globe,
  Award,
  TrendingUp,
  CheckCircle2,
  Compass,
  Palette,
  Briefcase,
  Building2,
  ShoppingBag,
} from 'lucide-react';
import {
  DEFAULT_PROJECTS_DATA,
  ProjectsSectionData,
  ProjectPoint,
  ProjectImageItem,
} from '@/types/projects-industries';

const POINT_ICONS: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Zap,
  Navigation,
  Sparkles,
  Rocket,
  Target,
  Shield,
  Code2,
  Cpu,
  Layers,
  Globe,
  Award,
  TrendingUp,
  CheckCircle2,
  Compass,
  Palette,
  Briefcase,
  Building2,
  ShoppingBag,
};

function renderPointIcon(point: ProjectPoint) {
  const { iconType, iconValue } = point;

  if (iconType === 'lucide') {
    const IconComponent = POINT_ICONS[iconValue] || Zap;
    return <IconComponent className="w-6 h-6" />;
  }

  if (iconType === 'upload' || (iconType as any) === 'image') {
    if (iconValue) {
      return (
        <img
          src={iconValue}
          alt="Icon"
          className="w-6 h-6 object-contain"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      );
    }
  }

  if (iconType === 'svg') {
    if (iconValue && iconValue.trim().startsWith('<svg')) {
      return (
        <div
          className="w-6 h-6 flex items-center justify-center fill-current"
          dangerouslySetInnerHTML={{ __html: iconValue }}
        />
      );
    }
  }

  return <Zap className="w-6 h-6" />;
}

const ProjectsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [data, setData] = useState<ProjectsSectionData>(DEFAULT_PROJECTS_DATA);

  useEffect(() => {
    // 1. Try local storage cache for immediate paint
    try {
      const cached = localStorage.getItem('digital_spyke_projects_industries');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.images) && parsed.images.length > 0) {
          setData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // Ignore storage errors
    }

    // 2. Fetch fresh data from API
    async function loadData() {
      try {
        const res = await fetch('/api/projects-industries', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          try {
            localStorage.setItem('digital_spyke_projects_industries', JSON.stringify(json.data));
          } catch {
            // Ignore storage write error
          }
        }
      } catch (err) {
        console.warn('Failed to load projects data from API:', err);
      }
    }

    loadData();
  }, []);

  const firstRowImages = (data.images || []).filter((img) => img.row === 1);
  const secondRowImages = (data.images || []).filter((img) => img.row === 2);

  const finalRow1 = firstRowImages.length > 0 ? firstRowImages : data.images || [];
  const finalRow2 = secondRowImages.length > 0 ? secondRowImages : data.images || [];

  // Glassmorphism card styles
  const cardStyles = {
    width: isMobile ? 240 : 300,
    minWidth: isMobile ? 240 : 300,
    height: isMobile ? 150 : 180,
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    position: 'relative',
    m: 1.5,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const ImageCard = ({ src, alt, url }: ProjectImageItem) => {
    const cardContent = (
      <Box sx={cardStyles}>
        <Box sx={{ p: 0, height: '100%' }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={src}
              alt={alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 280px, 350px"
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0)',
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    );

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          {cardContent}
        </a>
      );
    }

    return cardContent;
  };

  return (
    <Box
      sx={{
        mt: 0,
        mb: 0,
        position: 'relative',
        overflow: 'hidden',
        py: 8,
        px: { xs: 0, md: 12 },
      }}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <Box sx={{ maxWidth: '3xl', mx: 'auto', textAlign: 'center', mb: 2 }}>
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
              }}
              dangerouslySetInnerHTML={{ __html: data.headingHtml }}
            />
            <Typography
              component="div"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mt: 2,
                fontSize: data.descriptionFontSize || '1rem',
                width: { xs: '100%', md: '50%' },
                margin: 'auto',
              }}
              dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
            />
          </Box>
        </motion.div>

        {/* Project Points Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: (data.points || []).length > 2 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr 1fr',
            },
            gap: 4,
            mb: 5,
          }}
        >
          {(data.points || []).map((point, index) => (
            <Box
              key={point.id || index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  shrink: 0,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: '600' }}>
                  {point.number}
                </Typography>
              </Box>

              <Box sx={{ color: '#6B46FF', shrink: 0, display: 'flex', alignItems: 'center' }}>
                {renderPointIcon(point)}
              </Box>

              <Typography
                component="div"
                sx={{
                  fontSize: { xs: '0.95rem', lg: point.fontSize || '1rem' },
                  fontWeight: '500',
                  color: 'white',
                }}
                dangerouslySetInnerHTML={{ __html: point.text }}
              />
            </Box>
          ))}
        </Box>

        {/* Scrolling Images Section */}
        {finalRow1.length > 0 && (
          <Box sx={{ mb: 0 }}>
            <Marquee
              gradient={true}
              speed={data.speedRow1 || 30}
              pauseOnHover={data.pauseOnHover !== false}
              gradientColor="hsl(220, 65%, 3.52%)"
              gradientWidth={isMobile ? 50 : 200}
              style={{ width: '100%' }}
            >
              {finalRow1.map((image, index) => (
                <ImageCard key={`row1-${image.id || index}`} {...image} />
              ))}
            </Marquee>
          </Box>
        )}

        {finalRow2.length > 0 && (
          <Box>
            <Marquee
              direction="right"
              gradient={true}
              speed={data.speedRow2 || 30}
              pauseOnHover={data.pauseOnHover !== false}
              gradientColor="hsl(220, 65%, 3.52%)"
              gradientWidth={isMobile ? 50 : 200}
              style={{ width: '100%' }}
            >
              {finalRow2.map((image, index) => (
                <ImageCard key={`row2-${image.id || index}`} {...image} />
              ))}
            </Marquee>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectsSection;