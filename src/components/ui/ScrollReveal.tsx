'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  once?: boolean;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up', 
  once = true,
  className = '' 
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getHiddenTransform = () => {
    if (shouldReduceMotion) return { opacity: 0, x: 0, y: 0 };
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'left': return { opacity: 0, x: -40 };
      case 'right': return { opacity: 0, x: 40 };
      case 'none': return { opacity: 0, x: 0, y: 0 };
      default: return { opacity: 0, y: 30 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getHiddenTransform()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut',
        delay: delay / 1000 // convert ms to seconds for Framer
      }}
    >
      {children}
    </motion.div>
  );
}
