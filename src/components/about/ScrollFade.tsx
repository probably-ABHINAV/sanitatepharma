'use client';

import { motion } from 'framer-motion';

interface ScrollFadeProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export function ScrollFade({ children, delay = 0, direction = 'up', className = '' }: ScrollFadeProps) {
  const yOffset = direction === 'up' ? 30 : 0;
  const xOffset = direction === 'left' ? -30 : direction === 'right' ? 30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
