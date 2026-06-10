'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import type { Product } from '@/lib/types';

export function FeaturedProducts({ products }: { products: Product[] }) {
  // Use DB products or fallback
  const displayProducts = products.length > 0 ? products : [
    {
      id: '1', name: 'Sanitab-D', category: { name: 'Gastrointestinal' },
      composition: 'Pantoprazole 40mg + Domperidone 30mg SR',
      pack_size: '10x10 Alu-Alu', slug: 'sanitab-d', images: []
    },
    {
      id: '2', name: 'CardioSafe Plus', category: { name: 'Cardiovascular' },
      composition: 'Telmisartan 40mg + Amlodipine 5mg',
      pack_size: '10x10 Blister', slug: 'cardiosafe-plus', images: []
    },
    {
      id: '3', name: 'NerveGrow Forte', category: { name: 'Nutraceuticals' },
      composition: 'Methylcobalamin 1500mcg + ALA + Vitamins',
      pack_size: '10x10 Alu-Alu', slug: 'nervegrow-forte', images: []
    },
  ] as unknown as Product[];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Featured Products
            </h2>
            <p className="text-textMid max-w-xl">
              Discover our most prescribed and highly trusted pharmaceutical formulations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-teal font-semibold uppercase tracking-wider text-sm hover:text-primary transition-colors"
            >
              View Full Catalogue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-card border border-gray-100 overflow-hidden hover:shadow-nav transition-shadow duration-300 flex flex-col"
            >
              {/* Image area */}
              <div className="aspect-[4/3] bg-offWhite relative border-b border-gray-100 flex items-center justify-center overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  /* Note: standard img tag used for placeholder flexibility, update to next/image for production */
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Product Image</span>
                  </div>
                )}
                {/* Category badge */}
                {product.category?.name && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-teal uppercase tracking-wider shadow-sm border border-gray-100">
                    {product.category.name}
                  </div>
                )}
              </div>

              {/* Content area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  {product.name}
                </h3>
                {product.composition && (
                  <p className="text-textMid text-xs mb-4 line-clamp-2 leading-relaxed">
                    <span className="font-semibold text-primary">Rx:</span> {product.composition}
                  </p>
                )}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-medium text-textMid bg-offWhite px-2.py-1 rounded">
                    Pack: {product.pack_size || 'Standard'}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-teal text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
