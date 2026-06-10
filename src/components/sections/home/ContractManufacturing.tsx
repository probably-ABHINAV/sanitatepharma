'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, ShieldCheck, Microscope, PackageCheck } from 'lucide-react';

const stats = [
  { icon: <Settings className="w-6 h-6" />, label: 'State-of-the-art Machinery' },
  { icon: <ShieldCheck className="w-6 h-6" />, label: 'WHO-GMP Compliant' },
  { icon: <Microscope className="w-6 h-6" />, label: 'Advanced QA/QC Labs' },
  { icon: <PackageCheck className="w-6 h-6" />, label: 'Timely Delivery' },
];

export function ContractManufacturing() {
  return (
    <section className="py-24 bg-offWhite relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-50" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Capability Stats */}
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-card border border-gray-100 shadow-soft flex flex-col items-center justify-center text-center aspect-square"
              >
                <div className="w-14 h-14 bg-tealPale text-teal rounded-full flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="font-display font-bold text-primary text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="order-1 lg:order-2"
          >
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              Third-Party Manufacturing
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Excellence in Contract Manufacturing
            </h2>
            <p className="text-textMid text-base leading-relaxed mb-8">
              Sanitatepharma provides reliable, high-quality third-party manufacturing services. Our WHO-GMP certified facilities are equipped to handle large-scale production across various therapeutic categories with stringent quality control at every step.
            </p>
            
            <Link
              href="/contract-manufacturing"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-teal transition-colors duration-300"
            >
              Explore Contract Manufacturing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
