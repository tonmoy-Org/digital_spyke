'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import logo from '@/public/logo/acecloud.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField, Button, Typography, Stack } from '@mui/material';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const pathname = usePathname();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen); // Toggle the drawer state
    };
    const handleCloseDrawer = () => {
        setDrawerOpen(false); // Toggle the drawer state
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <>
            <nav className="shadow-none p-3 fixed w-full z-50 px-4 md:px-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-32 md:w-40 me-4 md:me-10">
                            <Link prefetch={true} href="/" passHref>
                                {isScrolled ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                        />
                                    </svg>
                                ) : (
                                    <Image src={logo} alt="Digital Spyke Logo" width={160} height={50} style={{ width: '100%', height: 'auto' }} />
                                )}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href="/book-meeting" passHref>
                            <button
                                onClick={handleCloseDrawer} // Toggle the drawer when clicked
                                className={`bg-gray-200 text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-300 transition-colors ${drawerOpen ? 'bg-gray-800 text-white hover:bg-gray-600' : ''}`}
                            >
                                Start a Project
                            </button>
                        </Link>
                        <button
                            onClick={toggleDrawer}
                            className={`bg-[#1D4ED8] text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors ${drawerOpen ? 'bg-gray-800 text-white hover:bg-gray-600' : ''}`}
                        >
                            {drawerOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 transform transition-transform duration-300 rotate-90"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
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
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 17h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={toggleDrawer}
                />
            )}

            <div
                className={`fixed inset-y-0 right-0 w-full md:w-1/2 bg-white transform transition-transform duration-500 ease-in-out z-40 ${drawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="w-full mt-16 px-4 md:px-10 overflow-y-auto h-[calc(100vh-64px)]">
                    {[
                        { text: "Home", href: "/" },
                        { text: "About Us", href: "/about" },
                        // { text: "Portfolio", href: "/projects" },
                        { text: "Blogs", href: "/blog" },
                        { text: "Contact", href: "/contact" },
                    ].map(({ text, href }) => {
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={text}
                                href={href}
                                passHref
                                onClick={toggleDrawer}
                            >
                                <div
                                    className={`py-4 cursor-pointer p-2 group flex items-center gap-2 justify-end ${isActive ? "text-[#1D4ED8] font-bold" : "text-black"
                                        }`}
                                >
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                                        </svg>
                                    </span>
                                    <span className="text-xl md:text-3xl">{text}</span>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Contact Info and Newsletter Section */}
                    <div className="m-4 md:m-2 border-t border-black py-6">
                        <div className="flex flex-col md:flex-row justify-between lg:gap-8 gap-8">
                            <div className="w-full md:w-1/2">
                                <Typography variant="h6" sx={{ color: '#000', mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                    Stay Updated with Our Latest News and Offers
                                </Typography>
                                <form onSubmit={handleSubscribe}>
                                    <TextField
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Enter your email"
                                        variant="standard"
                                        size="small"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#aaa' },
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
                                    <br />
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
                            </div>

                            {/* Contact Info Section */}
                            <div className="w-full md:w-1/4 mt-3 md:mt-0">
                                <Typography variant="h6" sx={{ color: '#000', mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                    Contact Us
                                </Typography>
                                <p className="font-bold">YVR - YYC - YYZ</p>
                                <a href="mailto:contact@digitalspyke.ca" className="block mt-2 text-sm md:text-base">contact@digitalspyke.ca</a>
                                <a href="tel:+16479311690" className="block mt-2 text-sm md:text-base">+1 (647) 931-1690</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;