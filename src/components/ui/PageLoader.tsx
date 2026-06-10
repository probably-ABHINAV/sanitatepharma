'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if it's the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisitedSanitatepharma');
    if (!hasVisited) {
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

          {/* Logo Text Fading In */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-8 bg-teal rounded-sm" />
            <span className="font-display font-extrabold text-3xl text-primary tracking-tight">
              Sanitatepharma
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
