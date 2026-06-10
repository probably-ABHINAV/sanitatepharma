'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Pill,
  Heart,
  Stethoscope,
  Droplets,
  Sparkles,
  ShieldPlus,
} from 'lucide-react';
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AppLogo } from '@/components/ui/AppLogo';

/* ─── Category Icons Map ─── */
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Anti-Infectives': <ShieldPlus className="w-5 h-5" />,
  'Cardiovascular': <Heart className="w-5 h-5" />,
  'Gastrointestinal': <Stethoscope className="w-5 h-5" />,
  'Dermatology': <Droplets className="w-5 h-5" />,
  'Nutraceuticals': <Sparkles className="w-5 h-5" />,
  'Pain Management': <Pill className="w-5 h-5" />,
};

/* ─── Featured Products (placeholder) ─── */
const FEATURED_PRODUCTS = [
  { name: 'Sanitab-D', category: 'Anti-Infective', slug: '#' },
  { name: 'CardioSafe Plus', category: 'Cardiovascular', slug: '#' },
  { name: 'GastroEase', category: 'Gastrointestinal', slug: '#' },
];

/* ═══ NAVBAR COMPONENT ═══ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* ─── Scroll detection ─── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─── Lock body when mobile menu open ─── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ─── Close mobile on route change ─── */
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  /* ─── Dropdown hover handlers with delay ─── */
  const openDropdown = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-nav' : 'bg-white shadow-sm'
        )}
      >
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* ─── Logo ─── */}
            <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
              <AppLogo className="w-9 h-9" />
              <span className="font-display text-xl font-extrabold tracking-tight transition-colors duration-300 text-primary">
                {SITE_NAME}
              </span>
            </Link>

            {/* ─── Desktop Navigation ─── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && openDropdown(item.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={item.href}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn(
                      'relative px-3 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 flex items-center gap-1',
                      isActive(item.href) ? 'text-teal' : 'text-textDark hover:text-teal'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180'
                        )}
                      />
                    )}
                    {/* Underline indicator */}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-teal rounded-full"
                      />
                    )}
                    {/* Hover underline */}
                    {!isActive(item.href) && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 origin-left transition-transform duration-300 bg-teal group-hover:scale-x-100"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />
                    )}
                  </Link>

                  {/* ─── Mega Dropdown ─── */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={closeDropdown}
                      >
                        {item.label === 'Company' ? (
                          <CompanyDropdown links={item.children} />
                        ) : item.label === 'Products' ? (
                          <ProductsDropdown categories={item.children} />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* ─── CTA Button ─── */}
              <Link
                href="/contact"
                id="nav-enquire-cta"
                className="ml-4 inline-flex items-center px-5 py-2.5 bg-teal text-white text-xs font-semibold uppercase tracking-wider rounded-btn hover:bg-primary transition-colors duration-300"
              >
                Enquire Now
              </Link>
            </div>

            {/* ─── Mobile Hamburger ─── */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              id="nav-mobile-toggle"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="absolute top-0 right-0 w-full max-w-sm h-full bg-primary flex flex-col"
            >
              {/* Close */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="font-display text-lg font-bold text-white">{SITE_NAME}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-4">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="border-b border-white/5">
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileAccordion(
                              mobileAccordion === item.label ? null : item.label
                            )
                          }
                          className="w-full flex items-center justify-between px-6 py-4 text-white/90 text-sm font-medium uppercase tracking-wider"
                        >
                          {item.label}
                          <motion.div
                            animate={{ rotate: mobileAccordion === item.label ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileAccordion === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pl-6">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="block px-4 py-2.5 text-white/70 text-sm hover:text-tealLight transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-6 py-4 text-sm font-medium uppercase tracking-wider transition-colors',
                          isActive(item.href) ? 'text-tealLight' : 'text-white/90 hover:text-white'
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="p-5 border-t border-white/10">
                <Link
                  href="/contact"
                  className="block w-full text-center py-3.5 bg-teal text-white text-sm font-semibold uppercase tracking-wider rounded-btn hover:bg-tealLight transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Enquire Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══ COMPANY MEGA DROPDOWN ═══ */
function CompanyDropdown({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="w-[620px] bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-5 min-h-[280px]">
        {/* Left — Links */}
        <div className="col-span-3 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-textMid mb-4">
            About Us
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 py-2 text-sm text-textDark hover:text-teal transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-tealLight opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — Visual panel */}
        <div className="col-span-2 bg-gradient-to-br from-tealPale to-tealPale/50 p-6 flex flex-col justify-end">
          <AppLogo className="w-14 h-14 mb-4 text-teal opacity-80" />
          <p className="font-display text-base font-bold text-primary leading-tight">
            Making Quality Healthcare
          </p>
          <p className="font-display text-base font-bold text-teal leading-tight">
            Accessible to All
          </p>
          <p className="text-xs text-textMid mt-2 leading-relaxed">
            WHO-GMP certified manufacturing with 25+ years of pharma excellence.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══ PRODUCTS MEGA DROPDOWN ═══ */
function ProductsDropdown({ categories }: { categories: { label: string; href: string }[] }) {
  return (
    <div className="w-[720px] bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-5 min-h-[300px]">
        {/* Left — Categories */}
        <div className="col-span-3 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-textMid mb-4">
            Therapeutic Categories
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex items-center gap-3 py-2.5 px-2 rounded-lg text-sm text-textDark hover:bg-tealPale hover:text-teal transition-all"
              >
                <span className="w-8 h-8 rounded-lg bg-tealPale text-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors">
                  {CATEGORY_ICONS[cat.label] || <Pill className="w-4 h-4" />}
                </span>
                {cat.label}
              </Link>
            ))}
          </div>
          <Link
            href="/products"
            className="inline-flex items-center mt-4 text-xs font-semibold text-teal uppercase tracking-wider hover:text-primary transition-colors"
          >
            View All Products →
          </Link>
        </div>

        {/* Right — Featured products */}
        <div className="col-span-2 bg-offWhite border-l border-gray-100 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-textMid mb-4">
            Featured Products
          </p>
          <div className="space-y-3">
            {FEATURED_PRODUCTS.map((product) => (
              <Link
                key={product.name}
                href={product.slug}
                className="group block p-3 bg-white rounded-lg border border-gray-50 hover:border-tealLight hover:shadow-soft transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-tealPale rounded-lg flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-textDark group-hover:text-teal transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-textMid">{product.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
