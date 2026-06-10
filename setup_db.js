const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Pharma234%40432@db.qkcigtdyszyigrmcjfgn.supabase.co:5432/postgres'
});

async function setup() {
  try {
    await client.connect();
    console.log('Connected to Supabase DB');

    // 1. Create Tables
    const ddl = `
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

      -- Create Storage Buckets (if they don't exist)
      INSERT INTO storage.buckets (id, name, public) 
      VALUES 
        ('product-images', 'product-images', true),
        ('brochures', 'brochures', true),
        ('team-photos', 'team-photos', true)
      ON CONFLICT (id) DO UPDATE SET public = true;

      -- Create Storage Policies (drop if exists to avoid errors, or just ignore errors)
      -- Allow public reads
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Buckets'
          ) THEN
              CREATE POLICY "Public Access to Buckets" ON storage.objects FOR SELECT USING ( bucket_id IN ('product-images', 'brochures', 'team-photos') );
          END IF;
      END
      $$;

      -- Allow inserts for anyone (since auth might be tricky from client right now)
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Allow Inserts'
          ) THEN
              CREATE POLICY "Allow Inserts" ON storage.objects FOR INSERT WITH CHECK ( bucket_id IN ('product-images', 'brochures', 'team-photos') );
          END IF;
      END
      $$;
      
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Allow Updates'
          ) THEN
              CREATE POLICY "Allow Updates" ON storage.objects FOR UPDATE USING ( bucket_id IN ('product-images', 'brochures', 'team-photos') );
          END IF;
      END
      $$;

      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Allow Deletes'
          ) THEN
              CREATE POLICY "Allow Deletes" ON storage.objects FOR DELETE USING ( bucket_id IN ('product-images', 'brochures', 'team-photos') );
          END IF;
      END
      $$;
    `;

    await client.query(ddl);
    console.log('Tables and buckets created.');

    // 2. Insert dummy Categories
    const categoriesSQL = `
      INSERT INTO public.categories (name, slug) VALUES 
      ('General Medicine', 'general-medicine'),
      ('Cardiac & Diabetic', 'cardiac-diabetic'),
      ('Neuropsychiatry', 'neuropsychiatry'),
      ('Pediatrics', 'pediatrics'),
      ('Dermatology', 'dermatology')
      ON CONFLICT (slug) DO NOTHING;
    `;
    await client.query(categoriesSQL);
    console.log('Categories inserted.');

  } catch (err) {
    console.error('Error setting up DB:', err);
  } finally {
    await client.end();
  }
}

setup();
