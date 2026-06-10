'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, ShieldPlus, Heart, Stethoscope, Droplets, Sparkles } from 'lucide-react';
import type { Category } from '@/lib/types';

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
  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Tablets & Capsules', slug: 'tablets-capsules', description: 'High-quality solid dosages', product_count: 120, icon_name: '' },
    { id: '2', name: 'Syrups', slug: 'syrups', description: 'Liquid formulations', product_count: 85, icon_name: '' },
    { id: '3', name: 'Injectables', slug: 'injectables', description: 'Sterile preparations', product_count: 45, icon_name: '' },
    { id: '4', name: 'Topicals', slug: 'topicals', description: 'Creams and ointments', product_count: 32, icon_name: '' },
    { id: '5', name: 'Diagnostics', slug: 'diagnostics', description: 'Accurate testing kits', product_count: 18, icon_name: '' },
    { id: '6', name: 'Nutraceuticals', slug: 'nutraceuticals', description: 'Health supplements', product_count: 42, icon_name: '' },
  ] as Category[];

  return (
    <section className="py-16 sm:py-24 bg-tealPale">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
            A Product for Every Therapeutic Need
          </h2>
          <p className="text-textMid text-sm sm:text-base max-w-2xl mx-auto">
            Explore our comprehensive range of high-quality formulations designed to meet diverse medical requirements.
          </p>
        </motion.div>

        {/* 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {displayCategories.slice(0, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col bg-white rounded-card p-4 sm:p-8 border border-transparent hover:border-teal hover:-translate-y-1.5 hover:shadow-card transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-tealPale text-teal rounded-xl flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                    {getCategoryIcon(cat.name)}
                  </div>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-offWhite border border-gray-100 text-[10px] font-bold text-primary tracking-wider uppercase">
                    {cat.product_count || 0} Products
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-xl font-bold text-primary mb-1 sm:mb-2 group-hover:text-teal transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-textMid text-xs sm:text-sm leading-relaxed hidden sm:block">
                  {cat.description || `Explore our high-quality ${cat.name.toLowerCase()} for better healthcare outcomes.`}
                </p>
                <span className="sm:hidden text-teal text-[10px] font-bold uppercase tracking-wider mt-2">
                  {cat.product_count || 0} Products
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
