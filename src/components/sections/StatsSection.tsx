'use client';

import { motion } from 'framer-motion';
import { COMPANY_STATS } from '@/lib/constants';

export function StatsSection() {
  return (
    <section className="relative -mt-1 bg-white py-16 lg:py-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative lg:-mt-16 bg-white rounded-card shadow-card border border-gray-50 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {COMPANY_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="px-6 py-8 lg:py-10 text-center"
              >
                <p className="font-display text-3xl lg:text-4xl font-extrabold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-textMid text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
