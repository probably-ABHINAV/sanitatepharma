'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function FranchiseBanner() {
  const points = [
    'Monopoly rights for your designated territory',
    'Comprehensive marketing and promotional support',
    'High-margin, quality-assured product range',
  ];

  return (
    <section className="bg-primary relative overflow-hidden py-24">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tealLight/10 rounded-full blur-3xl" />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="text-tealLight text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              PCD Pharma Franchise
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-[1.1]">
              Grow Your Business with<br />India&apos;s Most Trusted Brand
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Join our network of 10,000+ successful franchise partners. We offer a highly profitable PCD Pharma Franchise opportunity with complete monopoly rights and end-to-end support.
            </p>
            
            <div className="space-y-4">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-tealLight shrink-0" />
                  <span className="text-white/90 text-sm font-medium">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-white rounded-[24px] p-8 lg:p-12 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-tealPale rounded-bl-[100px] rounded-tr-[24px] -z-10" />
            <div className="text-center">
               <h3 className="font-display text-2xl font-bold text-primary mb-4">
                 Ready to partner with us?
               </h3>
               <p className="text-textMid text-sm mb-8">
                 Apply for a franchise today and secure monopoly rights in your district.
               </p>
               <Link
                 href="/franchise"
                 className="group flex items-center justify-center gap-2 w-full py-4 bg-teal text-white font-bold uppercase tracking-wider rounded-lg hover:bg-primary transition-colors duration-300"
               >
                 Apply for Franchise
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
               <p className="text-[11px] text-textMid mt-4 uppercase tracking-widest font-semibold">
                 Fast Approval Process
               </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
