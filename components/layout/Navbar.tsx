'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import logo from '@/public/logo/logo3.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField, Button, Typography, Stack } from '@mui/material';

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

const NAV_LINKS = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    // { text: "Portfolio", href: "/projects" },
    { text: "Blogs", href: "/blog" },
    { text: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();

    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const handleCloseDrawer = () => setDrawerOpen(false);

    // Track scroll position (passive listener = smoother scrolling on mobile)
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the drawer whenever the route changes
    useEffect(() => {
        setDrawerOpen(false);
    }, [pathname]);

    // Lock page scroll while the drawer is open (prevents background scrolling on mobile)
    useEffect(() => {
        if (!drawerOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [drawerOpen]);

    // Close the drawer with the Escape key
    useEffect(() => {
        if (!drawerOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDrawerOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [drawerOpen]);

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
                className="shadow-none fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 md:px-10"
            >
                <div className="flex items-center justify-between gap-3">
                    {/* Logo */}
                    <div className="w-32 shrink-0 sm:w-40 md:w-48">
                        <Link prefetch={true} href="/" aria-label="Digital Spyke home" onClick={handleCloseDrawer}>
                            {isScrolled && !drawerOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-9 w-9 text-white md:h-10 md:w-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                    />
                                </svg>
                            ) : (
                                <Image
                                    src={logo}
                                    alt="Digital Spyke Logo"
                                    width={276}
                                    height={200}
                                    priority
                                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                />
                            )}
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* CTA: hidden on very small phones (it's repeated inside the drawer) */}
                        <Link
                            href="/book-meeting"
                            onClick={handleCloseDrawer}
                            className={cn(
                                "hidden min-[400px]:inline-flex items-center justify-center whitespace-nowrap rounded-full",
                                "px-3.5 py-2 text-xs font-medium sm:px-4 sm:text-sm transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                drawerOpen
                                    ? "bg-gray-800 text-white hover:bg-gray-600"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                            )}
                        >
                            Start a Project
                        </Link>

                        {/* Hamburger / close button (44px touch target on mobile) */}
                        <button
                            type="button"
                            onClick={toggleDrawer}
                            aria-label={drawerOpen ? "Close menu" : "Open menu"}
                            aria-expanded={drawerOpen}
                            aria-controls="mobile-drawer"
                            className={cn(
                                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors md:h-10 md:w-10",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                drawerOpen ? "bg-gray-800 hover:bg-gray-600" : "bg-[#1D4ED8] hover:bg-[#1e40af]"
                            )}
                        >
                            {drawerOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 rotate-90 transform transition-transform duration-300"
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
                                    className="h-6 w-6 transform transition-transform duration-300"
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

            {/* ───────────── Full-screen drawer ───────────── */}
            <div
                id="mobile-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                aria-hidden={!drawerOpen}
                className={cn(
                    // 100dvh = real visible height on mobile browsers (handles the collapsing address bar)
                    "fixed inset-x-0 top-0 z-40 h-[100dvh] overflow-hidden bg-[#091021]",
                    "transform transition-[transform,visibility] duration-500 ease-in-out",
                    drawerOpen ? "visible translate-y-0 shadow-2xl" : "invisible -translate-y-full"
                )}
            >
                {/* Interactive Grid Pattern Background */}
                <InteractiveGridPattern
                    className={cn(
                        "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-70"
                    )}
                />

                {/* Scroll container: lets short screens / landscape phones scroll the menu */}
                <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain">
                    <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 sm:px-10 md:px-12 lg:px-20">
                        {/* Navigation Links */}
                        <nav aria-label="Site menu" className="flex flex-col space-y-1 md:space-y-2">
                            {NAV_LINKS.map(({ text, href }) => {
                                const isActive = pathname === href;

                                return (
                                    <Link
                                        key={text}
                                        href={href}
                                        onClick={handleCloseDrawer}
                                        aria-current={isActive ? "page" : undefined}
                                        className="group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                                    >
                                        <div
                                            className={cn(
                                                "flex cursor-pointer items-center justify-start gap-3 py-2.5 transition-all duration-300 md:py-2",
                                                isActive
                                                    ? "font-bold text-[#1D4ED8]"
                                                    : "text-white hover:text-[#1D4ED8] active:text-[#1D4ED8]"
                                            )}
                                        >
                                            {/* Dot: always visible for the active page, on hover for the rest */}
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
                                            <span className="text-4xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-5xl lg:text-6xl">
                                                {text}
                                            </span>
                                        </div>
                                    </Link>
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

                        <div className="mt-auto pt-10">
                            {/* Divider Line */}
                            <div className="my-4 border-t border-gray-800"></div>

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
                                                // 16px prevents iOS Safari from zooming the page on focus
                                                input: { color: '#fff', fontSize: '16px' },
                                                mb: 2,
                                                width: '100%',
                                                '& .MuiInput-underline:before': {
                                                    borderBottomColor: '#1D4ED8',
                                                },
                                                '& .MuiInput-underline:hover:before': {
                                                    borderBottomColor: '#1D4ED8',
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottomColor: '#1D4ED8',
                                                },
                                            }}
                                        />

                                        <Stack
                                            direction="row"
                                            spacing={0}
                                            alignItems="center"
                                            sx={{
                                                '&:hover .animated-button': {
                                                    backgroundColor: '#1D4ED8',
                                                },
                                                '&:hover .animated-arrow': {
                                                    transform: 'translateX(5px)',
                                                },
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={isSubmitting}
                                                className="animated-button"
                                                sx={{
                                                    backgroundColor: '#1D4ED8',
                                                    color: 'white',
                                                    padding: '8px 24px',
                                                    minHeight: '44px',
                                                    borderRadius: '50px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500',
                                                    textTransform: 'none',
                                                    transition: 'background-color 0.3s ease',
                                                    '&.Mui-disabled': {
                                                        color: 'rgba(255,255,255,0.7)',
                                                        backgroundColor: 'rgba(29, 78, 216, 0.6)',
                                                    },
                                                }}
                                            >
                                                {isSubmitting ? 'Sending…' : 'Subscribe'}
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={isSubmitting}
                                                aria-label="Subscribe"
                                                className="animated-button animated-arrow"
                                                sx={{
                                                    backgroundColor: '#1D4ED8',
                                                    color: 'white',
                                                    minWidth: '44px',
                                                    padding: '0px',
                                                    height: '44px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                                    '&.Mui-disabled': {
                                                        color: 'rgba(255,255,255,0.7)',
                                                        backgroundColor: 'rgba(29, 78, 216, 0.6)',
                                                    },
                                                }}
                                            >
                                                <ArrowForwardIcon sx={{ padding: '0px !important' }} />
                                            </Button>
                                        </Stack>
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
            </div>
        </>
    );
};

export default Navbar;