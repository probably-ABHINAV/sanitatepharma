import { createClient } from '@/lib/supabase/server';
import { ProductsClient } from '@/components/admin/ProductsClient';

export const metadata = {
  title: 'Manage Products — Sanitate Pharma Admin',
};

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*, categories(*)').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
  ]);

  return (
    <ProductsClient 
      initialProducts={products || []} 
      categories={categories || []} 
    />
  );
}
