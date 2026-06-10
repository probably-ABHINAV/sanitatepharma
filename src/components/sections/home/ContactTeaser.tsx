'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export function ContactTeaser() {
  return (
    <section className="py-24 bg-offWhite relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-tealPale/30" />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
            Have a Question? Reach Out.
          </h2>
          <p className="text-textMid max-w-xl mx-auto">
            Our team is here to assist you with product inquiries, franchise opportunities, and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {/* Email Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-card border border-gray-100 shadow-soft text-center"
          >
            <div className="w-12 h-12 mx-auto bg-tealPale text-teal rounded-full flex items-center justify-center mb-6">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-primary text-lg mb-2">Email Us</h3>
            <p className="text-textMid text-sm mb-4">Drop us an email anytime</p>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-teal font-semibold hover:text-primary transition-colors">
              {CONTACT_INFO.email}
            </a>
          </motion.div>

          {/* Phone Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-card border border-gray-100 shadow-soft text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-teal" />
            <div className="w-12 h-12 mx-auto bg-teal text-white rounded-full flex items-center justify-center mb-6">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-primary text-lg mb-2">Call Us</h3>
            <p className="text-textMid text-sm mb-4">Mon-Sat from 9am to 6pm</p>
            <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="text-primary font-bold text-lg hover:text-teal transition-colors">
              {CONTACT_INFO.phone}
            </a>
          </motion.div>

          {/* Address Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-card border border-gray-100 shadow-soft text-center"
          >
            <div className="w-12 h-12 mx-auto bg-tealPale text-teal rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-primary text-lg mb-2">Visit Us</h3>
            <p className="text-textMid text-sm mb-4">Corporate Office</p>
            <p className="text-textMid text-sm font-medium">
              {CONTACT_INFO.address.split(',').map((line, i) => (
                <span key={i} className="block">{line.trim()}</span>
              ))}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-teal transition-colors duration-300 shadow-card"
          >
            Send Us a Message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
