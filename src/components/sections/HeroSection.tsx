'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-teal/30" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal/10 to-transparent" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-tealLight text-xs font-medium uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-tealLight animate-pulse" />
              India&apos;s Leading Pharmaceutical Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6"
          >
            Making Quality
            <br />
            Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tealLight to-teal">
              Accessible
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-white/60 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Committed to affordable, high-quality pharmaceutical products
            across 500+ formulations serving healthcare partners in every
            corner of India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-tealLight transition-colors duration-300"
            >
              Explore Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/franchise"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-white/10 transition-colors duration-300"
            >
              Franchise Partner
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
