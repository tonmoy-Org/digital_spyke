"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface HeroParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax = ({
  products,
  header,
}: {
  products: HeroParallaxProduct[];
  header?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-24 sm:py-32 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {header ?? <Header />}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-12 md:space-x-20 mb-12 sm:mb-16 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 sm:mb-16 md:mb-20 space-x-8 sm:space-x-12 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-12 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-16 sm:py-24 md:py-36 px-4 w-full left-0 top-0 z-20">
      <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
        <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase">
          PORTFOLIO
        </span>
      </div>
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
        Our journey of <br />
        <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
          success stories
        </span>
      </h2>
      <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-6 text-gray-400 leading-relaxed">
        We build beautiful products with the latest technologies and frameworks.
        Explore how we help ambitious brands transform their digital presence and drive tangible growth.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-64 sm:h-80 md:h-96 w-[18rem] sm:w-[24rem] md:w-[30rem] relative shrink-0 rounded-2xl overflow-hidden border border-white/10"
    >
      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-between">
        <h3 className="text-white text-base sm:text-xl font-bold tracking-tight drop-shadow-md">
          {product.title}
        </h3>
        <span className="text-xs text-cyan-400 font-medium px-2.5 py-1 rounded-full bg-black/70 border border-cyan-500/40 backdrop-blur-sm">
          Visit &rarr;
        </span>
      </div>
    </motion.div>
  );
};

export default HeroParallax;
