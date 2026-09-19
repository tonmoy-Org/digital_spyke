'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { BlurIn } from '@/components/magicui/blur-in';
import SmokeBackground from '@/components/ui/SmokeBackground';
import { OrbitingCirclesDemo } from '@/components/sections/OrbitingCirclesDemo';

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[60vh] h-screen flex flex-col items-center justify-start pt-20 sm:pt-28 lg:pt-32 overflow-hidden bg-black">
      {/* Dynamic Animated Smoke Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SmokeBackground intensity={1.15} />
      </div>

      {/* Content */}
      <section className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <BlurIn
          word="DIGITAL SPYKE"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-6 sm:mb-8 tracking-tighter"
          duration={1.2}
        />
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
              'In  Web Design', 1200,
              'In  Search Engine Optimization', 1200,
              'In  Brand Design', 1200,
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
      </section>

      {/* Orbiting Circles at bottom of Hero Section (1/2 visible) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-10 pointer-events-none flex items-center justify-center ">
        <OrbitingCirclesDemo />
      </div>

      {/* Bottom subtle edge blend */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" />
    </div>
  );
}