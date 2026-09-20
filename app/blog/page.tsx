"use client";

import React from 'react';
import { Box, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import banner from '@/public/banner/new-banner.svg';
import BlogSection from '@/components/Blog/BlogSection';


export default function Blog() {
  return (
    <div>
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
                Latest News
              </span>
              <span className='ms-2'>From Digital Spyke</span>
            </motion.p>
            {/* <motion.p
                        className="text-[0.8rem] lg:text-[1.125rem] lg:!leading-snug lg:mt-3 text-[#BABABA] text-center lg:w-[550px] py-2 mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        We work with clients in all sectors and of all sizes, from bootstrapped startups to Fortune 500 companies.
                    </motion.p> */}
          </Box>
        </motion.div>
      </div>
      <BlogSection />
    </div>
  );
}
