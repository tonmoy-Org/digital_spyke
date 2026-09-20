'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurInProps {
  word: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

export function BlurIn({ word, className, style, variant, duration = 1 }: BlurInProps) {
  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  const isHtml = /<[a-z][\s\S]*>/i.test(word);

  if (isHtml) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration }}
        variants={combinedVariants}
        style={style}
        className={cn(
          'font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 inline-block',
          className,
        )}
        dangerouslySetInnerHTML={{ __html: word }}
      />
    );
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      style={style}
      className={cn(
        'font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm',
        className,
      )}
    >
      {word}
    </motion.h1>
  );
}
