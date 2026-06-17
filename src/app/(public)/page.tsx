import { createServiceClient } from '@/lib/supabase/server';
import { Hero } from '@/components/sections/home/Hero';
import { TrustMarquee } from '@/components/sections/home/TrustMarquee';
import { AboutSnapshot } from '@/components/sections/home/AboutSnapshot';
import dynamic from 'next/dynamic';

const CategoryGrid = dynamic(() => import('@/components/sections/home/CategoryGrid').then(mod => mod.CategoryGrid));
const FeaturedProducts = dynamic(() => import('@/components/sections/home/FeaturedProducts').then(mod => mod.FeaturedProducts));
import type { Product, Category } from '@/lib/types';

// Force dynamic rendering if we want fresh DB content each request, 
// or let Next.js handle cache with ISR revalidation
export const revalidate = 3600; // revalidate every hour

export default async function HomePage() {
  const supabase = await createServiceClient();

  // Parallel data fetching for better performance
  const [productsRes, categoriesRes] = await Promise.all([
    supabase
      .from('products')
      .select('*, category:categories(name)')
      .eq('status', 'active')
      .limit(3),
    supabase
      .from('categories')
      .select('*')
      .limit(6),
  ]);

  const featuredProducts = (productsRes.data || []) as Product[];
  const categories = (categoriesRes.data || []) as Category[];

  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <Hero />
      <TrustMarquee />
      <AboutSnapshot />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
    </main>
  );
}
