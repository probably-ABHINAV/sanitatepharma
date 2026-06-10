'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Pill } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { name: 'Anti-Infectives', count: 85, color: 'from-teal to-tealLight' },
  { name: 'Cardiovascular', count: 62, color: 'from-primary to-primary/80' },
  { name: 'Gastrointestinal', count: 48, color: 'from-teal to-primary' },
  { name: 'Dermatology', count: 55, color: 'from-tealLight to-teal' },
  { name: 'Nutraceuticals', count: 42, color: 'from-gold/80 to-gold' },
  { name: 'Pain Management', count: 38, color: 'from-primary/80 to-teal' },
];

export function ProductsPreview() {
  return (
    <section className="py-20 lg:py-28 bg-offWhite" id="products-preview">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
          >
            Our Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4"
          >
            Therapeutic Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-textMid max-w-lg mx-auto"
          >
            500+ formulations across critical therapeutic areas, manufactured with the highest quality standards.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/products?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block bg-white rounded-card p-6 border border-gray-100 hover:shadow-card hover:border-tealLight/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-textMid opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-1 group-hover:text-teal transition-colors">
                  {cat.name}
                </h3>
                <p className="text-textMid text-sm">{cat.count}+ products</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-primary transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
