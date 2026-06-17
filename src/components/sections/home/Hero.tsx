'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { value: '50', label: 'Products' },
  { value: '28', label: 'States Covered' },
  { value: '50,000+', label: 'Stockists' },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 pt-4 lg:pt-0 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-tealPale text-teal text-xs font-semibold uppercase tracking-wider rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                India&apos;s Trusted Pharma Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="font-display text-[38px] sm:text-5xl lg:text-[60px] font-extrabold text-primary leading-[1.05] tracking-tight mb-5"
            >
              Quality Medicine,<br />
              <span className="text-teal">Every Life, Every Day</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-textMid text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Sanitate Pharma delivers affordable, high-quality pharmaceuticals across India through 50,000+ stockists.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10"
            >
              <Link
                href="/products"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-primary transition-colors duration-300"
              >
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/franchise"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-teal text-teal text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-tealPale transition-colors duration-300"
              >
                Partner With Us
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="text-center lg:text-left"
                >
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-textMid text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image — hidden on small screens */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-radial from-teal/20 to-transparent opacity-70 scale-150" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative aspect-square max-w-[500px] mx-auto ml-auto"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 rounded-full border-[8px] border-white shadow-2xl overflow-hidden flex items-center justify-center bg-white relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=90&w=900" 
                    alt="Premium Pharmaceutical Products" 
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover scale-110"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile-only Image Strip */}
          <div className="lg:hidden w-full mt-2">
            <div className="rounded-2xl overflow-hidden h-52 w-full relative">
              <Image 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=90&w=800" 
                alt="Premium Pharmaceutical Products Mobile" 
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
