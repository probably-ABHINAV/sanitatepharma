'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';
import Image from 'next/image';

export function NewsGrid({ news }: { news: NewsArticle[] }) {
  // Use DB news or fallback
  const displayNews = news.length > 0 ? news : [
    {
      id: '1', title: 'Sanitatepharma Expands Manufacturing Capacity',
      slug: 'manufacturing-expansion',
      excerpt: 'New state-of-the-art facility launched to meet growing demand for essential medicines.',
      published_at: new Date().toISOString(),
      status: 'published', content: '', image_url: null
    },
    {
      id: '2', title: 'Launch of 50 New Formulations',
      slug: 'launch-50-new-formulations',
      excerpt: 'Sanitatepharma announces the successful rollout of its initial portfolio of 50 high-quality medicines.',
      published_at: '2026-06-10T10:00:00.000Z',
      status: 'published', content: '', image_url: null
    },
    {
      id: '3', title: 'Launch of New Cardiovascular Range',
      slug: 'new-cardiovascular-range',
      excerpt: 'Introducing advanced formulations for the management of hypertension and heart diseases.',
      published_at: '2026-06-05T10:00:00.000Z',
      status: 'published', content: '', image_url: null
    },
  ] as NewsArticle[];

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              News & Media
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Latest Updates
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Link
              href="/about#news"
              className="group inline-flex items-center gap-2 text-teal font-semibold uppercase tracking-wider text-sm hover:text-primary transition-colors"
            >
              Visit Media Centre
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayNews.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-offWhite rounded-card border border-gray-100 overflow-hidden hover:shadow-nav transition-all duration-300 flex flex-col"
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                {article.image_url ? (
                  <Image 
                    src={article.image_url} 
                    alt={article.title || 'News image'} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-teal/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="font-display font-bold text-primary/20 text-2xl">News</span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.published_at ? new Date(article.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-3 group-hover:text-teal transition-colors">
                  {article.title}
                </h3>
                <p className="text-textMid text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="mt-auto text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:text-teal transition-colors"
                >
                  Read Story
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
