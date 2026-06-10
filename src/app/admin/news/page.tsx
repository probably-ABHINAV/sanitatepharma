import { createClient } from '@/lib/supabase/server';
import { NewsClient } from '@/components/admin/NewsClient';

export const metadata = {
  title: 'News & Updates — Sanitate Pharma Admin',
};

export default async function AdminNewsPage() {
  const supabase = await createClient();

  const { data: news } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <NewsClient initialNews={news || []} />
  );
}
