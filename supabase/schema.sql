-- ============================================================
-- SANITATEPHARMA — Supabase Database Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ─── Categories (must be created first — referenced by products) ───
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon_name text,
  product_count int DEFAULT 0
);

-- ─── Products ───
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  composition text,
  indications text,
  dosage text,
  pack_size text,
  storage text,
  prescription_type text CHECK (prescription_type IN ('rx', 'otc')) DEFAULT 'rx',
  images jsonb DEFAULT '[]',
  brochure_url text,
  status text CHECK (status IN ('active', 'draft')) DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── Enquiries ───
CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  enquiry_type text CHECK (enquiry_type IN (
    'general', 'product', 'franchise', 'contract_manufacturing', 'career', 'media'
  )),
  subject text,
  message text,
  status text CHECK (status IN ('new', 'read', 'replied')) DEFAULT 'new',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- ─── Team Members ───
CREATE TABLE team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text,
  bio text,
  image_url text,
  linkedin_url text,
  is_leadership boolean DEFAULT false,
  sort_order int DEFAULT 0
);

-- ─── News / Media ───
CREATE TABLE news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  image_url text,
  published_at timestamptz,
  status text CHECK (status IN ('published', 'draft')) DEFAULT 'draft'
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- ─── Public READ policies ───
CREATE POLICY "public_read_products"
  ON products FOR SELECT
  USING (status = 'active');

CREATE POLICY "public_read_categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "public_read_team"
  ON team_members FOR SELECT
  USING (true);

CREATE POLICY "public_read_news"
  ON news FOR SELECT
  USING (status = 'published');

-- ─── Service role (admin) full access ───
CREATE POLICY "service_role_products"
  ON products FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "service_role_categories"
  ON categories FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "service_role_team"
  ON team_members FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "service_role_news"
  ON news FOR ALL
  USING (auth.role() = 'service_role');

-- ─── Enquiries: anyone can INSERT, only service role manages ───
CREATE POLICY "public_insert_enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "service_role_enquiries"
  ON enquiries FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- INDEXES for performance
-- ============================================================

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_type ON enquiries(enquiry_type);

-- ============================================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- STORAGE BUCKETS (run separately or via Dashboard)
-- ============================================================
-- Create these buckets in Supabase Dashboard → Storage:
--   1. "product-images" (public)
--   2. "brochures" (public)
--   3. "team-photos" (public)
-- Set CORS: allow * for GET
