'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from '@/public/logo/logo3.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField, Button, Typography } from '@mui/material';

import { cn } from "@/lib/utils";

interface NavbarProps {
    enabled?: boolean;
}

const NAV_LINKS = [
    { text: "Home", href: "/" },
    { text: "Services", href: "/services" },
    { text: "About Us", href: "/about" },
    { text: "Blogs", href: "/blog" },
    { text: "Contact", href: "/contact" },
    { text: "Dashboard", href: "/dashboard" },
];

const Navbar = ({ enabled = true }: NavbarProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();

    const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);
    const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [drawerOpen]);

    // Optimized scroll tracking: sticky backdrop-filter blur when scroll offset > 50px
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY > 50;
                    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the drawer whenever the route changes
    useEffect(() => {
        setDrawerOpen(false);
    }, [pathname]);

    // Close the drawer with the Escape key
    useEffect(() => {
        if (!drawerOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDrawerOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [drawerOpen]);

    // Do not render frontend Navbar if disabled or on Dashboard/Login pages (After hooks to comply with React rules)
    if (!enabled || pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
        return null;
    }

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* ───────────── Top bar ───────────── */}
            <nav
                aria-label="Main navigation"
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-10",
                    isScrolled && !drawerOpen
                        ? "bg-transparent py-2 sm:py-2.5"
                        : "bg-transparent py-3 sm:py-3.5"
                )}
            >
                <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
                    {/* Compact & Clean Logo */}
                    <div className="flex items-center shrink-0">
                        <Link prefetch={true} href="/" aria-label="Digital Spyke home" onClick={handleCloseDrawer} className="flex items-center">
                            <Image
                                src={logo}
                                alt="Digital Spyke Logo"
                                width={190}
                                height={52}
                                priority
                                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-all duration-300"
                            />
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* CTA: hidden on very small phones (repeated inside drawer) */}
                        <Link
                            href="/book-meeting"
                            onClick={handleCloseDrawer}
                            className={cn(
                                "hidden min-[400px]:inline-flex items-center justify-center whitespace-nowrap rounded-full",
                                "px-3.5 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                drawerOpen
                                    ? "bg-gray-800 text-white hover:bg-gray-600"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                            )}
                        >
                            Start a Project
                        </Link>

                        {/* Hamburger / close button (compact 36px-40px touch button) */}
                        <button
                            type="button"
                            onClick={toggleDrawer}
                            aria-label={drawerOpen ? "Close menu" : "Open menu"}
                            aria-expanded={drawerOpen}
                            aria-controls="mobile-drawer"
                            className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors sm:h-10 sm:w-10",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                drawerOpen ? "bg-gray-800 hover:bg-gray-600" : "bg-[#1D4ED8] hover:bg-[#1e40af]"
                            )}
                        >
                            {drawerOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 rotate-90 transform transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transform transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 17h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ───────────── Full-screen drawer with Framer Motion Animation ───────────── */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        id="mobile-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{
                            duration: 0.28,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="fixed inset-0 z-40 h-full w-full overflow-hidden bg-[#091021] shadow-2xl"
                    >
                        {/* Aceternity UI Grid Background */}
                        <div
                            className={cn(
                                "pointer-events-none absolute inset-0",
                                "[background-size:30px_30px] sm:[background-size:40px_40px]",
                                "[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]",
                                "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
                            )}
                        />
                        {/* Aceternity UI Radial Gradient Mask for Faded Vignette Look */}
                        <div
                            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#091021] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                            style={{
                                WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black)',
                                maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)'
                            }}
                        />
                        {/* Subtle ambient accent glow */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-30"
                            style={{
                                background: 'radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(30, 64, 175, 0.15) 0%, transparent 50%)'
                            }}
                        />

                        {/* Pretty Dark Shadow Vignette & Soft Gradient Depth */}
                        <div
                            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] sm:shadow-[inset_0_0_150px_rgba(0,0,0,0.75)]"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45"
                        />

                        {/* Scroll container */}
                        <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 sm:px-10 md:px-12 lg:px-20">
                                {/* Navigation Links with Smooth Staggered Animation */}
                                <nav aria-label="Site menu" className="flex flex-col space-y-1 md:space-y-2">
                                    {NAV_LINKS.map(({ text, href }, index) => {
                                        const isActive = pathname === href;

                                        return (
                                            <motion.div
                                                key={text}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.08 + index * 0.04,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                <Link
                                                    href={href}
                                                    onClick={handleCloseDrawer}
                                                    aria-current={isActive ? "page" : undefined}
                                                    className="group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                                                >
                                                    <div
                                                        className={cn(
                                                            "flex cursor-pointer items-center justify-start gap-3 py-2 sm:py-2.5 transition-all duration-300",
                                                            isActive
                                                                ? "font-bold text-[#1D4ED8]"
                                                                : "text-white hover:text-[#1D4ED8] active:text-[#1D4ED8]"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "transition-opacity duration-300",
                                                                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                                            )}
                                                        >
                                                            <svg className="h-2.5 w-2.5 text-[#1D4ED8] md:h-3 md:w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                                                            </svg>
                                                        </span>
                                                        <span className="text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl lg:text-6xl">
                                                            {text}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </nav>

                                {/* CTA shown inside the drawer only on very small phones */}
                                <Link
                                    href="/book-meeting"
                                    onClick={handleCloseDrawer}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1D4ED8] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1e40af] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 min-[400px]:hidden"
                                >
                                    Start a Project
                                </Link>

                                <div className="mt-auto pt-8">
                                    {/* Newsletter & Contact */}
                                    <div className="flex flex-col items-start justify-between gap-8 pb-2 md:flex-row md:gap-10">
                                        {/* Left: Newsletter */}
                                        <div className="w-full md:w-1/2 lg:w-7/12">
                                            <Typography
                                                variant="h6"
                                                sx={{ color: '#fff', mb: 2, fontSize: { xs: '1.05rem', md: '1.3rem' }, fontWeight: 500, lineHeight: 1.35 }}
                                            >
                                                Stay Updated with Our Latest News and Offers
                                            </Typography>

                                            <form onSubmit={handleSubscribe} noValidate>
                                                <TextField
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    variant="standard"
                                                    size="small"
                                                    fullWidth
                                                    autoComplete="email"
                                                    slotProps={{
                                                        htmlInput: {
                                                            'aria-label': 'Email address',
                                                            inputMode: 'email',
                                                        },
                                                    }}
                                                    sx={{
                                                        input: { color: '#fff', fontSize: '16px' },
                                                        mb: 2,
                                                        width: '100%',
                                                        '& .MuiInput-underline:before': { borderBottomColor: '#1D4ED8' },
                                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#1D4ED8' },
                                                        '& .MuiInput-underline:after': { borderBottomColor: '#1D4ED8' },
                                                    }}
                                                />

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        disabled={isSubmitting}
                                                        className="group inline-flex items-center gap-2"
                                                        sx={{
                                                            backgroundColor: '#1D4ED8',
                                                            color: 'white',
                                                            padding: '8px 24px',
                                                            minHeight: '44px',
                                                            borderRadius: '50px',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '500',
                                                            textTransform: 'none',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': { backgroundColor: '#1e40af' },
                                                            '&.Mui-disabled': {
                                                                color: 'rgba(255,255,255,0.7)',
                                                                backgroundColor: 'rgba(29, 78, 216, 0.6)',
                                                            },
                                                        }}
                                                    >
                                                        <span>{isSubmitting ? 'Sending…' : 'Subscribe'}</span>
                                                        <ArrowForwardIcon sx={{ fontSize: '1.1rem', transition: 'transform 0.3s ease', '.group:hover &': { transform: 'translateX(4px)' } }} />
                                                    </Button>
                                                </div>
                                            </form>

                                            {message && (
                                                <Typography role="status" aria-live="polite" variant="body2" sx={{ color: "#1D4ED8", mt: 1.5 }}>
                                                    {message}
                                                </Typography>
                                            )}
                                        </div>

                                        {/* Right: Contact */}
                                        <div className="w-full md:w-1/2 md:text-right lg:w-fit">
                                            <Typography
                                                variant="h6"
                                                sx={{ color: '#fff', mb: 1.5, fontSize: { xs: '1.05rem', md: '1.3rem' }, fontWeight: 500 }}
                                            >
                                                Contact Us
                                            </Typography>
                                            <p className="text-sm font-bold text-white md:text-base">YVR - YYC - YYZ</p>
                                            <a
                                                href="mailto:contact@digitalspyke.ca"
                                                className="mt-2 block break-all py-1 text-sm text-gray-300 transition-colors hover:text-[#1D4ED8] md:text-base"
                                            >
                                                contact@digitalspyke.ca
                                            </a>
                                            <a
                                                href="tel:+16479311690"
                                                className="block py-1 text-sm text-gray-300 transition-colors hover:text-[#1D4ED8] md:text-base"
                                            >
                                                +1 (647) 931-1690
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;