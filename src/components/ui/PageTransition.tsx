'use client';

import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, disable transitions
  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -10,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className="flex flex-col min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
