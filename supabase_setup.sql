-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    composition TEXT,
    indications TEXT,
    dosage_admin TEXT,
    pack_size TEXT,
    storage TEXT,
    prescription_type TEXT DEFAULT 'rx',
    status TEXT DEFAULT 'active',
    images TEXT[],
    brochure_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    enquiry_type TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    resume_path TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    is_leadership BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert dummy Categories
INSERT INTO public.categories (name, slug) VALUES 
('General Medicine', 'general-medicine'),
('Cardiac & Diabetic', 'cardiac-diabetic'),
('Neuropsychiatry', 'neuropsychiatry'),
('Pediatrics', 'pediatrics'),
('Dermatology', 'dermatology')
ON CONFLICT (slug) DO NOTHING;

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('brochures', 'brochures', true),
  ('team-photos', 'team-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop the old combined policies if they exist
DROP POLICY IF EXISTS "Public Access to Buckets" ON storage.objects;
DROP POLICY IF EXISTS "Allow Inserts" ON storage.objects;
DROP POLICY IF EXISTS "Allow Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow Deletes" ON storage.objects;

-- Product Images Policies
CREATE POLICY "product_images_select" ON storage.objects FOR SELECT TO public USING (bucket_id = 'product-images');
CREATE POLICY "product_images_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "product_images_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');
CREATE POLICY "product_images_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- Brochures Policies
CREATE POLICY "brochures_select" ON storage.objects FOR SELECT TO public USING (bucket_id = 'brochures');
CREATE POLICY "brochures_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'brochures');
CREATE POLICY "brochures_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'brochures');
CREATE POLICY "brochures_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'brochures');

-- Team Photos Policies
CREATE POLICY "team_photos_select" ON storage.objects FOR SELECT TO public USING (bucket_id = 'team-photos');
CREATE POLICY "team_photos_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'team-photos');
CREATE POLICY "team_photos_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'team-photos');
CREATE POLICY "team_photos_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'team-photos');

-- ==========================================
-- PHASE 2: NEWS & SETTINGS MODULES
-- ==========================================

-- News Table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings Table (Key-Value Store)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Settings
INSERT INTO public.site_settings (key, value) VALUES 
('contact_email', 'info@sanitatepharma.com'),
('contact_phone', '+91 XXXXX XXXXX'),
('address', 'Registered Address Placeholder'),
('facebook_url', '#'),
('linkedin_url', '#')
ON CONFLICT (key) DO NOTHING;

-- Create News Images Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- News Images Policies
DROP POLICY IF EXISTS "news_images_select" ON storage.objects;
DROP POLICY IF EXISTS "news_images_insert" ON storage.objects;
DROP POLICY IF EXISTS "news_images_update" ON storage.objects;
DROP POLICY IF EXISTS "news_images_delete" ON storage.objects;

CREATE POLICY "news_images_select" ON storage.objects FOR SELECT TO public USING (bucket_id = 'news-images');
CREATE POLICY "news_images_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'news-images');
CREATE POLICY "news_images_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'news-images');
CREATE POLICY "news_images_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'news-images');

