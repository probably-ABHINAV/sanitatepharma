import type { NavItem } from './types';

// ─── Site Constants ───

export const SITE_NAME = 'Sanitatepharma';
export const SITE_TAGLINE = "India's Leading Pharmaceutical Company";
export const SITE_DESCRIPTION =
  'Sanitatepharma is a leading Indian pharmaceutical company committed to making quality healthcare accessible and affordable for all.';

// ─── Navigation ───

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
  },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Contract Manufacturing', href: '/contract-manufacturing' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

// ─── Enquiry Types ───

export const ENQUIRY_TYPES = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'product', label: 'Product Enquiry' },
  { value: 'franchise', label: 'Franchise Opportunity' },
  { value: 'contract_manufacturing', label: 'Contract Manufacturing' },
  { value: 'career', label: 'Career Enquiry' },
  { value: 'media', label: 'Media / Press' },
] as const;

// ─── Company Stats ───

export const COMPANY_STATS = [
  { value: '500+', label: 'Products' },
  { value: '25+', label: 'Years Experience' },
  { value: '10,000+', label: 'Healthcare Partners' },
  { value: '28', label: 'States Covered' },
] as const;

// ─── Supabase Storage Buckets ───

export const STORAGE_BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  BROCHURES: 'brochures',
  TEAM_PHOTOS: 'team-photos',
} as const;
