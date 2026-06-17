'use client';

import { useEffect, useState } from 'react';
import { SITE_NAME } from '@/lib/constants';
import { AppLogo } from '@/components/ui/AppLogo';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if it's the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisitedSanitatepharma');
    if (!hasVisited) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      sessionStorage.setItem('hasVisitedSanitatepharma', 'true');
      
      // Prevent scrolling while loader is visible
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = '';
      }, 1400); // 1.4s total visible time
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Progress Bar at very top */}
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-teal w-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Logo Mark Fading In */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center justify-center mb-6 gap-3"
          >
            <AppLogo className="w-16 h-16" />
            <span className="font-display font-extrabold text-3xl text-primary tracking-tight">
              Sanitatepharma
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
