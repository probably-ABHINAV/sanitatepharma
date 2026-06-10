'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Products' },
  { value: '15+', label: 'Years' },
  { value: '50,000+', label: 'Stockists' },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 55% -> col-span-7 */}
          <div className="lg:col-span-7 pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-tealPale text-teal text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                India&apos;s Trusted Pharma Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-primary leading-[1.05] tracking-tight mb-6"
            >
              Quality Medicine,<br />
              <span className="text-teal">Every Life, Every Day</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-textMid text-lg max-w-xl mb-10 leading-relaxed"
            >
              Sanitate Pharma delivers affordable, high-quality pharmaceuticals across India through 50,000+ stockists.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-primary transition-colors duration-300"
              >
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/franchise"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-teal text-teal text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-tealPale transition-colors duration-300"
              >
                Partner With Us
              </Link>
            </motion.div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="font-display text-2xl lg:text-3xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-textMid text-xs font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 45% -> col-span-5 */}
          <div className="lg:col-span-5 relative hidden lg:block">
            {/* Radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-teal/20 to-transparent opacity-70 scale-150" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative aspect-square max-w-[500px] mx-auto ml-auto"
            >
              {/* Floating animation */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 rounded-full border-[8px] border-white shadow-2xl overflow-hidden flex items-center justify-center bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800" 
                    alt="Premium Pharmaceutical Products" 
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
