'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import banner from '@/public/banner/HOMENEW.jpg';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[60vh] h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banner}
          alt="Hero Background"
          fill
          className="object-cover w-full h-full"
          quality={100}
          priority
        />
      </div>

      {/* Content */}
      <section className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xs sm:text-sm md:text-lg lg:text-2xl text-white tracking-widest font-light mb-4 sm:mb-6">
            FULL-STACK AGENCY
          </h3>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-white mb-3 sm:mb-4 leading-tight tracking-wider sm:tracking-widest"
        >
          <TypeAnimation
            sequence={[
              'In  Web Design', 1200,
              'In  Search Engine Optimization', 1200,
              'In  Brand Design', 1200,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={70}
            className="text-accent inline-block ml-1 sm:ml-2"
            repeat={Infinity}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 text-sm sm:text-md md:text-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto tracking-wide sm:tracking-wider mt-4 sm:mt-5"
        >
          Toronto, Canada
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 sm:mt-8"
        >
        </motion.div>
      </section>
    </div>
  );
}