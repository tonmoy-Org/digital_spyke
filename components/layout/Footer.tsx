'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import logo from '@/public/logo/logo3.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import moment from "moment";
import DribbbleIcon from '@mui/icons-material/SportsBasketball';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Footer() {
    const pathname = usePathname();

    // Do not render frontend Footer on Dashboard or Login pages
    if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
        return null;
    }

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_NEWSLETTER,
                    subject: "Subscription Request Digital Spyke",
                    email: email,
                    from_name: email,
                    message: 'Subscription Request',
                }),
            });

            if (response.ok) {
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage('Error submitting your request. Please try again.');
        }
    };

    return (
        <Box component="footer" className="w-full bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div className="relative pt-12 sm:pt-16 md:pt-20 bg-[radial-gradient(45%_128px_at_50%_0%,theme(backgroundColor.white/6%),transparent)]">
                        {/* Top decorative pill */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-cyan-400/80 rounded-full shadow-[0_0_12px_#06b6d4]"></div>

                        {/* Main Grid: Responsive 1 col mobile, 12 cols desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12">
                            {/* Brand Column */}
                            <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
                                <div>
                                    <div className="mb-4">
                                        <Image
                                            src={logo}
                                            alt="Digital Spyke Logo"
                                            width={140}
                                            height={80}
                                            className="w-[120px] sm:w-[140px] h-auto object-contain"
                                        />
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm">
                                        With Digital Spyke <span className="text-white font-semibold">Design</span>,{' '}
                                        <span
                                            style={{
                                                background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                color: 'transparent',
                                                display: 'inline-block',
                                            }}
                                            className="font-semibold"
                                        >
                                            Optimize
                                        </span>
                                        , <span className="text-white font-semibold">Transform</span>.
                                    </p>

                                    <div className="mt-4 text-xs sm:text-sm text-gray-400">
                                        Made by{' '}
                                        <a
                                            className="font-semibold text-white hover:text-cyan-400 transition-colors duration-200 hover:underline"
                                            href="https://digitalspyke.ca"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Digital Spyke Agency
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Links Column */}
                            <div className="md:col-span-3 lg:col-span-3">
                                <FooterLinkSection
                                    title="Get Around"
                                    links={[
                                        { name: 'About Us', href: '/about' },
                                        { name: 'Blogs', href: '/blog' },
                                        { name: 'Contact', href: '/contact' },
                                    ]}
                                />
                            </div>

                            {/* Newsletter & Socials Column */}
                            <div className="md:col-span-4 lg:col-span-4 w-full">
                                {/* Social Icons */}
                                <div className="mb-5">
                                    <h3 className="text-sm sm:text-base font-semibold text-white mb-3 tracking-wide">
                                        Connect With Us
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href="https://ca.linkedin.com/company/digitalspyke-ca"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedInIcon fontSize="small" />
                                        </a>
                                        <a
                                            href="https://dribbble.com/DigitalSpyke"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                                            aria-label="Dribbble"
                                        >
                                            <DribbbleIcon fontSize="small" />
                                        </a>
                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                                            aria-label="Instagram"
                                        >
                                            <InstagramIcon fontSize="small" />
                                        </a>
                                        <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                                            aria-label="Twitter"
                                        >
                                            <TwitterIcon fontSize="small" />
                                        </a>
                                    </div>
                                </div>

                                {/* Newsletter Form */}
                                <div>
                                    <h3 className="text-sm sm:text-base font-semibold text-white mb-2 tracking-wide">
                                        Newsletter
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-400 mb-3">
                                        Get the latest digital trends, case studies, and insights.
                                    </p>
                                    <form onSubmit={handleSubscribe} className="w-full">
                                        <TextField
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            sx={{
                                                input: {
                                                    color: '#fff',
                                                    fontSize: { xs: '13px', sm: '14px' },
                                                    padding: '10px 14px',
                                                },
                                                mb: 2,
                                                width: '100%',
                                                maxWidth: { xs: '100%', sm: '360px' },
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.12)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(0, 85, 255, 0.5)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#0055FE',
                                                    },
                                                },
                                            }}
                                        />
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            sx={{
                                                '&:hover .animated-button': {
                                                    backgroundColor: '#0043cc',
                                                },
                                                '&:hover .animated-arrow': {
                                                    transform: 'translateX(4px)',
                                                },
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className="animated-button"
                                                sx={{
                                                    backgroundColor: '#0055FE',
                                                    color: 'white',
                                                    padding: { xs: '7px 20px', sm: '8px 24px' },
                                                    borderRadius: '50px',
                                                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                    fontWeight: '500',
                                                    textTransform: 'none',
                                                    boxShadow: '0 4px 14px rgba(0, 85, 255, 0.3)',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                            >
                                                Subscribe
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className="animated-button animated-arrow"
                                                sx={{
                                                    backgroundColor: '#0055FE',
                                                    color: 'white',
                                                    minWidth: { xs: '36px', sm: '38px' },
                                                    width: { xs: '36px', sm: '38px' },
                                                    height: { xs: '36px', sm: '38px' },
                                                    padding: 0,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 14px rgba(0, 85, 255, 0.3)',
                                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                                }}
                                            >
                                                <ArrowForwardIcon sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
                                            </Button>
                                        </Stack>
                                    </form>
                                    {message && (
                                        <Typography variant="body2" sx={{ color: "#00FFAB", mt: 1.5, fontSize: '13px' }}>
                                            {message}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Newsletter & Contact Section ends */}
                    </div>

                    {/* Bottom Legal & Copyright Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center py-6 border-t border-white/5 gap-4 text-center sm:text-left">
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: { xs: '12px', sm: '13px' } }}>
                            © {moment().format('YYYY')} Digital Spyke. All rights reserved.
                        </Typography>
                        <div className="flex items-center space-x-6">
                            <Link href="/privacy-and-policy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xs sm:text-sm">
                                Privacy &amp; Cookie
                            </Link>
                        </div>
                    </div>
                </Box>
            </div>
        </Box>
    );
}

interface FooterLinkSectionProps {
    title: string;
    links: { name: string; href: string }[];
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({ title, links }) => (
    <div>
        <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">{title}</h3>
        <ul className="mt-3 sm:mt-4 text-xs sm:text-sm space-y-2.5">
            {links.map((link) => (
                <li key={link.name}>
                    <Link
                        prefetch={true}
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Footer;