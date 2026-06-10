'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutSnapshot() {
  const points = [
    { title: 'High-Quality', text: 'Pharmaceutical formulations.' },
    { title: 'Affordable', text: 'Healthcare solutions.' },
    { title: 'Ethical', text: 'Marketing practices.' },
    { title: 'Reliable', text: 'Supply chain management.' },
    { title: 'Customer-centric', text: 'Approach.' },
    { title: 'Strong Network', text: 'Healthcare professional network.' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative aspect-[4/3] rounded-card overflow-hidden bg-gray-100 border border-gray-200"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 mix-blend-multiply" />
            <img 
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=90&w=1200" 
              alt="Advanced pharmaceutical manufacturing facility" 
              className="w-full h-full object-cover relative z-0"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Who We Are
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
                Built on Trust,<br />
                Driven by Science
              </h2>
              
              <div className="space-y-3 text-textMid text-sm sm:text-base leading-relaxed mb-8">
                <p>
                  Sanitate Pharma is a rapidly growing pharmaceutical company committed to delivering high-quality, affordable, and innovative healthcare solutions.
                </p>
                <p>
                  With a vision to make quality healthcare accessible to every individual, we work closely with healthcare professionals, distributors, and institutions across multiple therapeutic segments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                {points.map((point) => (
                  <div key={point.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <p className="text-sm">
                      <strong className="text-primary font-bold">{point.title}</strong>{' '}
                      <span className="text-textMid">{point.text}</span>
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-teal font-semibold uppercase tracking-wider text-sm hover:text-primary transition-colors duration-300"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
