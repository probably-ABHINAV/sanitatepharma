import type { NavItem } from './types';

// ─── Site Constants ───

export const SITE_NAME = 'Sanitate Pharma';
export const SITE_TAGLINE = '(Spreading Wellness) Healing Through Trust. Driven By Quality.';
export const SITE_DESCRIPTION =
  'Sanitate Pharma is a rapidly growing pharmaceutical company committed to delivering high-quality, affordable, and innovative healthcare solutions.';

// ─── Navigation ───

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Company',
    href: '/about',
    children: [
      { label: 'About Sanitatepharma', href: '/about' },
      { label: 'Vision & Mission', href: '/about#vision' },
      { label: 'Leadership Team', href: '/about#leadership' },
      { label: 'Manufacturing', href: '/about#manufacturing' },
      { label: 'Quality Standards', href: '/about#quality' },
      { label: 'Awards & Milestones', href: '/about#awards' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Gastroenterology', href: '/products?category=gastroenterology' },
      { label: 'Respiratory Care', href: '/products?category=respiratory-care' },
      { label: 'Anti-Infectives', href: '/products?category=anti-infectives' },
      { label: 'Pain Management', href: '/products?category=pain-management' },
      { label: 'Nutritional Supplements', href: '/products?category=nutritional-supplements' },
      { label: 'Diabetes Care', href: '/products?category=diabetes-care' },
      { label: 'General Medicine', href: '/products?category=general-medicine' },
    ],
  },
  { label: 'Therapeutic Areas', href: '/products' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Contract Manufacturing', href: '/contract-manufacturing' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

// ─── Footer Links ───

export const FOOTER_COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Leadership', href: '/about#leadership' },
  { label: 'Manufacturing', href: '/about#manufacturing' },
  { label: 'Quality Standards', href: '/about#quality' },
  { label: 'Awards', href: '/about#awards' },
  { label: 'News & Media', href: '/about#news' },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: 'Product Catalogue', href: '/products' },
  { label: 'Therapeutic Areas', href: '/products' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Contract Manufacturing', href: '/contract-manufacturing' },
] as const;

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

// ─── Company Contact Info ───

export const CONTACT_INFO = {
  address: '713, Devika Tower, Chander Nagar, Ghaziabad, Uttar Pradesh – 201011, India',
  phone: '+91 83770 72807',
  email: 'sanitate.pharma@gmail.com',
} as const;

// ─── Social Links ───

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/sanitatepharma', icon: 'linkedin' },
  { label: 'Twitter', href: 'https://twitter.com/sanitatepharma', icon: 'twitter' },
  { label: 'Facebook', href: 'https://facebook.com/sanitatepharma', icon: 'facebook' },
] as const;

// ─── Supabase Storage Buckets ───

export const STORAGE_BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  BROCHURES: 'brochures',
  TEAM_PHOTOS: 'team-photos',
} as const;
