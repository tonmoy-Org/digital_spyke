'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import logo from '@/public/logo/acecloud.png'
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

    const [glowPosition, setGlowPosition] = useState({ x: "50%", y: "50%" });
    const [opacity, setOpacity] = useState(0);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const xPos = `${(e.clientX / window.innerWidth) * 100}%`;
        const yPos = `${(e.clientY / window.innerHeight) * 100}%`;
        setGlowPosition({ x: xPos, y: yPos });
        setOpacity(1);
    }, []);

    const handleMouseLeave = () => {
        setOpacity(0);
    };

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
        <Box>
            <div className='max-w-7xl mx-auto px-6 lg:px-0'>
                <Box sx={{ borderTop: '1.5px solid rgba(225, 225, 225, 0.1)' }}>
                    <footer className="relative pt-20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-white rounded-full"></div>

                        <div className="text-gray-200 lg:flex items-start gap-20">
                            <div className="lg:w-[500px]">
                                <div>
                                    <div className="mb-4">
                                        <Image src={logo} alt="Digital Spyke Logo" width={140} height={80} />
                                    </div>
                                    <p className="text-sm">
                                        With Digital Spyke <span className="text-white font-semibold">Design</span>, <span style={{
                                            background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            color: 'transparent',
                                            display: 'inline-block',
                                        }}>Optimize </span>,
                                        <span className="text-white font-semibold"> Transform</span>.
                                    </p>

                                    <span className="mt-4 text-gray-400 text-sm">
                                        Made by <a className="font-semibold text-white hover:underline" href="https://digitalspyke.ca">Digital Spyke Agency</a>
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:mt-0 mt-10 md:grid-cols-2 gap-5 mx-auto">
                                <FooterLinkSection
                                    title="Get Around"
                                    links={[
                                        { name: 'About Us', href: '/about' },
                                        // { name: 'Portfolio', href: '/projects' },
                                        { name: 'Blogs', href: '/blog' },
                                        { name: 'Contact', href: '/contact' },

                                    ]}
                                />
                                <Box>
                                    <div className="flex space-x-4 mb-4">
                                        <a href="https://ca.linkedin.com/company/digitalspyke-ca" target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon className="text-gray-400 hover:text-[#1D4ED8] transition-colors duration-300" />
                                        </a>
                                        <a href="https://dribbble.com/DigitalSpyke" target="_blank" rel="noopener noreferrer">
                                            <DribbbleIcon className="text-gray-400 hover:text-[#1D4ED8] transition-colors duration-300" />
                                        </a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                            <InstagramIcon className="text-gray-400 hover:text-[#1D4ED8] transition-colors duration-300" />
                                        </a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                            <TwitterIcon className="text-gray-400 hover:text-[#1D4ED8] transition-colors duration-300" />
                                        </a>
                                    </div>
                                    <FooterLinkSection title="Newsletter" links={[{ name: '', href: '' }]} />
                                    <form onSubmit={handleSubscribe}>
                                        <TextField
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            label="Enter your email"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                input: { color: '#fff' },
                                                label: { color: '#aaa' },
                                                fieldset: { borderColor: '#1D4ED8' },
                                                mb: 2,
                                                width: { xs: 300, lg: '100%' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'default',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1D4ED8',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1D4ED8',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'default',
                                                },
                                                '&:hover .MuiInputLabel-root': {
                                                    color: '#1D4ED8',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#1D4ED8',
                                                },
                                            }}
                                        />
                                        <Stack
                                            direction="row"
                                            spacing={0}
                                            alignItems="center"
                                            sx={{
                                                '&:hover .animated-button': {
                                                    backgroundColor: '#5a3ae4',
                                                },
                                                '&:hover .animated-arrow': {
                                                    transform: 'translateX(5px)',
                                                },
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className="animated-button"
                                                sx={{
                                                    backgroundColor: '#1D4ED8',
                                                    color: 'white',
                                                    padding: '6.5px 24px',
                                                    borderRadius: '50px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500',
                                                    textTransform: 'none',
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
                                                    backgroundColor: '#1D4ED8',
                                                    color: 'white',
                                                    minWidth: '39px',
                                                    padding: '0px',
                                                    height: '39px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                                }}
                                            >
                                                <ArrowForwardIcon sx={{ padding: '0px !important' }} />
                                            </Button>
                                        </Stack>
                                    </form>
                                    {message && (
                                        <Typography variant="body2" sx={{ color: "#1D4ED8", mt: 1 }}>{message}</Typography>
                                    )}
                                </Box>
                            </div>
                        </div>

                        {/* Glowing Gradient Text */}
                        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="lg:h-[18rem] h-[10rem]">
                            <svg width="100%" height="100%" viewBox="0 0 400 30" xmlns="http://www.w3.org/2000/svg" className="select-none">
                                <defs>
                                    <radialGradient id="radialGlow" cx={glowPosition.x} cy={glowPosition.y} x1={glowPosition.x} x2={glowPosition.x} y1={glowPosition.y} y2={glowPosition.y} r="35%" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" style={{ stopColor: "#ff00ff", stopOpacity: opacity }} />
                                        <stop offset="50%" style={{ stopColor: "#00ffff", stopOpacity: opacity }} />
                                        <stop offset="100%" style={{ stopColor: "transparent", stopOpacity: 0 }} />
                                    </radialGradient>
                                </defs>
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    stroke="url(#radialGlow)"
                                    strokeWidth="0.3"
                                    className="font-bold fill-transparent text-7xl transition-opacity duration-500 ease-in-out"
                                    style={{ opacity }}
                                >
                                    Digital Spyke
                                </text>
                                <text
                                    x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3" className="font-bold fill-transparent text-7xl stroke-neutral-800" strokeDashoffset="0" strokeDasharray="1000">Digital Spyke</text>
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" stroke="url(#textGradient)" strokeWidth="0.3" mask="url(#textMask)" className="font-bold fill-transparent text-7xl">Digital Spyke</text>
                            </svg>
                        </div>
                    </footer>
                    <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-gray-800">
                        <Typography variant="body2" sx={{ color: 'white' }}>
                            © {moment().format('YYYY')} Digital Spyke. All rights reserved.
                        </Typography>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy-and-policy" className="text-white hover:text-[#1D4ED8] transition-colors duration-300">
                                <Typography variant="body2">Privacy & Cookie</Typography>
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
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <ul className="mt-4 text-sm space-y-2">
            {links.map((link) => (
                <li key={link.name}>
                    <Link prefetch={true} href={link.href} className="hover:text-[#1D4ED8] transition duration-300">{link.name}</Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Footer;