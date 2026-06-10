// ─── Database Types ───

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string | null;
  product_count: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  composition: string | null;
  indications: string | null;
  dosage: string | null;
  pack_size: string | null;
  storage: string | null;
  prescription_type: 'rx' | 'otc';
  images: string[];
  brochure_url: string | null;
  status: 'active' | 'draft';
  created_at: string;
  updated_at: string;
  // Joined
  category?: Category;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  enquiry_type:
    | 'general'
    | 'product'
    | 'franchise'
    | 'contract_manufacturing'
    | 'career'
    | 'media';
  subject: string | null;
  message: string | null;
  status: 'new' | 'read' | 'replied';
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string | null;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  is_leadership: boolean;
  sort_order: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
  status: 'published' | 'draft';
}

// ─── Form Types ───

export interface EnquiryFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  enquiry_type: Enquiry['enquiry_type'];
  subject?: string;
  message: string;
}

// ─── API Response Types ───

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Navigation Types ───

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
