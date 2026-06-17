'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Handshake, Factory } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-offWhite" id="cta-section">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Franchise CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-gradient-to-br from-primary to-primary/90 rounded-card p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Handshake className="w-10 h-10 text-tealLight mb-5" />
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
              Franchise Opportunities
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Partner with us through our PCD Pharma Franchise model. Low investment, high returns, and end-to-end business support.
            </p>
            <Link
              href="/franchise"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-teal text-white text-xs font-semibold uppercase tracking-wider rounded-btn hover:bg-tealLight transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Contract Manufacturing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-gradient-to-br from-teal to-teal/90 rounded-card p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Factory className="w-10 h-10 text-white/80 mb-5" />
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
              Contract Manufacturing
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Leverage our modern manufacturing facilities for third-party manufacturing with end-to-end quality assurance.
            </p>
            <Link
              href="/contract-manufacturing"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-white text-teal text-xs font-semibold uppercase tracking-wider rounded-btn hover:bg-offWhite transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
