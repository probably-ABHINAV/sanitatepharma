'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="about-preview">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              Who We Are
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Pioneering Affordable
              <br />
              <span className="text-teal">Healthcare in India</span>
            </h2>
            <p className="text-textMid text-base leading-relaxed mb-6">
              For over 25 years, Sanitatepharma has been at the forefront of India&apos;s pharmaceutical industry. 
              With WHO-GMP certified manufacturing facilities and a portfolio of 500+ products, we are 
              dedicated to making quality healthcare accessible to every Indian.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-tealPale/50 rounded-card">
                <Target className="w-5 h-5 text-teal mb-2" />
                <h4 className="font-display text-sm font-bold text-primary mb-1">Our Mission</h4>
                <p className="text-textMid text-xs leading-relaxed">
                  Deliver affordable, high-quality medicines to improve lives across India.
                </p>
              </div>
              <div className="p-4 bg-tealPale/50 rounded-card">
                <Eye className="w-5 h-5 text-teal mb-2" />
                <h4 className="font-display text-sm font-bold text-primary mb-1">Our Vision</h4>
                <p className="text-textMid text-xs leading-relaxed">
                  Become India&apos;s most trusted pharmaceutical partner for healthcare excellence.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-teal text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-tealPale to-tealPale/30 rounded-card overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-teal/10 rounded-2xl flex items-center justify-center">
                    <div className="w-12 h-8 bg-teal rounded-[4px] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center gap-1">
                        <div className="w-1 h-4 bg-white/40 rounded-full" />
                        <div className="w-1 h-4 bg-white/60 rounded-full" />
                        <div className="w-1 h-4 bg-white/40 rounded-full" />
                        <div className="w-1 h-4 bg-white/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <p className="font-display text-lg font-bold text-primary">WHO-GMP Certified</p>
                  <p className="text-textMid text-sm">Manufacturing Excellence</p>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal/10 rounded-full" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold/10 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
