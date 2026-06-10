'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { AppLogo } from '@/components/ui/AppLogo';
import {
  SITE_NAME,
  SITE_TAGLINE,
  FOOTER_COMPANY_LINKS,
  FOOTER_PRODUCT_LINKS,
  CONTACT_INFO,
  SOCIAL_LINKS,
} from '@/lib/constants';

/* Inline SVG social icons — lucide-react no longer ships brand icons */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
};

/* ─── Stagger Animation Variants ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ═══ FOOTER COMPONENT ═══ */
export function Footer() {
  return (
    <footer className="bg-primary text-white" id="site-footer">
      {/* ─── Main Content ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* ─── Column 1: Brand ─── */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group inline-flex mb-6">
              <AppLogo className="w-8 h-8" />
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                {SITE_NAME}
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-white/60 text-sm leading-relaxed max-w-[260px]">
              {SITE_TAGLINE}. Committed to making quality healthcare accessible and affordable for every Indian.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:bg-teal hover:border-teal hover:text-white transition-all duration-300"
                >
                  {SOCIAL_ICONS[social.icon]}
                </a>
              ))}
            </div>

            {/* Certification Badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 w-fit">
              <ShieldCheck className="w-4 h-4 text-tealLight flex-shrink-0" />
              <span className="text-[11px] font-medium text-white/70 uppercase tracking-wider">
                ISO 9001:2015 Certified
              </span>
            </div>
          </motion.div>

          {/* ─── Column 2: Company ─── */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-tealLight transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-tealLight transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─── Column 3: Products & Services ─── */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              Products & Services
            </h3>
            <ul className="space-y-3">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-tealLight transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-tealLight transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─── Column 4: Connect ─── */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              Connect
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-tealLight flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-tealLight transition-colors"
                >
                  <Phone className="w-4 h-4 text-tealLight flex-shrink-0" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-tealLight transition-colors"
                >
                  <Mail className="w-4 h-4 text-tealLight flex-shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            {/* CTA Button */}
            <Link
              href="/contact"
              id="footer-enquire-cta"
              className="group inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-teal text-teal text-xs font-semibold uppercase tracking-wider rounded-btn hover:bg-teal hover:text-white transition-all duration-300"
            >
              Enquire Now
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Separator ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {SITE_NAME} Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Disclaimer', href: '/disclaimer' },
            ].map((link, i) => (
              <span key={link.href} className="flex items-center gap-4 sm:gap-6">
                <Link
                  href={link.href}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
                {i < 2 && <span className="text-white/15 text-xs">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
