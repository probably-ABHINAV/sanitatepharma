'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, ShieldPlus, Heart, Stethoscope, Droplets, Sparkles } from 'lucide-react';
import type { Category } from '@/lib/types';

// Map specific category names to icons, fallback to Pill
const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('infective')) return <ShieldPlus className="w-6 h-6" />;
  if (n.includes('cardio')) return <Heart className="w-6 h-6" />;
  if (n.includes('gastro')) return <Stethoscope className="w-6 h-6" />;
  if (n.includes('derma')) return <Droplets className="w-6 h-6" />;
  if (n.includes('nutra')) return <Sparkles className="w-6 h-6" />;
  return <Pill className="w-6 h-6" />;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  // Use DB categories or fallback to defaults if empty
  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Tablets & Capsules', slug: 'tablets-capsules', description: 'High-quality solid dosages', product_count: 120, icon_name: '' },
    { id: '2', name: 'Syrups', slug: 'syrups', description: 'Liquid formulations', product_count: 85, icon_name: '' },
    { id: '3', name: 'Injectables', slug: 'injectables', description: 'Sterile preparations', product_count: 45, icon_name: '' },
    { id: '4', name: 'Topicals', slug: 'topicals', description: 'Creams and ointments', product_count: 32, icon_name: '' },
    { id: '5', name: 'Diagnostics', slug: 'diagnostics', description: 'Accurate testing kits', product_count: 18, icon_name: '' },
    { id: '6', name: 'Nutraceuticals', slug: 'nutraceuticals', description: 'Health supplements', product_count: 42, icon_name: '' },
  ] as Category[];

  return (
    <section className="py-24 bg-tealPale">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
            A Product for Every Therapeutic Need
          </h2>
          <p className="text-textMid max-w-2xl mx-auto">
            Explore our comprehensive range of high-quality formulations designed to meet diverse medical requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.slice(0, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block bg-white rounded-card p-8 border border-transparent hover:border-teal hover:-translate-y-1.5 hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-tealPale text-teal rounded-xl flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                    {getCategoryIcon(cat.name)}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-offWhite border border-gray-100 text-[10px] font-bold text-primary tracking-wider uppercase">
                    {cat.product_count || 0} Products
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-teal transition-colors">
                  {cat.name}
                </h3>
                <p className="text-textMid text-sm leading-relaxed">
                  {cat.description || `Explore our high-quality ${cat.name.toLowerCase()} for better healthcare outcomes.`}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
