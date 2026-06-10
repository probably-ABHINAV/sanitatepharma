import { createClient } from '@/lib/supabase/server';
import { CategoriesClient } from '@/components/admin/CategoriesClient';

export const metadata = {
  title: 'Categories Management — Sanitate Pharma Admin',
};

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  return (
    <CategoriesClient initialCategories={categories || []} />
  );
}
