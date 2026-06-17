import { MetadataRoute } from 'next';
import { createServiceClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define your website's main URL (fallback to localhost for development)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanitatepharma.com';

  // 2. Create the list of static pages
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/franchise',
    '/contract-manufacturing',
    '/careers',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 3. Fetch active products from your database to create dynamic pages
  // We use the service client to bypass row-level security for this public data
  const supabase = await createServiceClient();
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('status', 'active');

  // 4. Map the database products to sitemap URLs
  const productRoutes = (products || []).map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    // If the product doesn't have an updated_at field, we use today's date
    lastModified: product.updated_at ? new Date(product.updated_at).toISOString() : new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6, // Slightly lower priority than main pages
  }));

  // 5. Combine everything together!
  return [...staticRoutes, ...productRoutes];
}
