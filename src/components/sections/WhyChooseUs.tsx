'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Factory, Users, TrendingUp } from 'lucide-react';

const REASONS = [
  {
    icon: <Factory className="w-6 h-6" />,
    title: 'Modern Manufacturing',
    description:
      'State-of-the-art manufacturing facilities with modern equipment and rigorous testing protocols.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality Assurance',
    description:
      'Every batch undergoes strict quality control tests to ensure consistent, reliable, and effective products.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Expert R&D Team',
    description:
      'Dedicated research team developing innovative formulations and improving existing products for better patient outcomes.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Pan-India Reach',
    description:
      'Distribution network spanning all 28 states with 10,000+ healthcare partners ensuring last-mile delivery.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="why-choose-us">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left header */}
          <div className="lg:col-span-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
            >
              Why Sanitatepharma
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl lg:text-4xl font-bold text-primary leading-tight"
            >
              Trusted by{' '}
              <span className="text-teal">10,000+</span>{' '}
              Healthcare Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-textMid mt-4 leading-relaxed"
            >
              Our commitment to quality, affordability, and innovation makes us the preferred pharmaceutical partner across India.
            </motion.p>
          </div>

          {/* Right — Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-card border border-gray-100 hover:border-tealLight/30 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-tealPale text-teal flex items-center justify-center mb-4 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                  {reason.icon}
                </div>
                <h3 className="font-display text-base font-bold text-primary mb-2">
                  {reason.title}
                </h3>
                <p className="text-textMid text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
