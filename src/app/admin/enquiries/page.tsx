import { createClient } from '@/lib/supabase/server';
import { EnquiriesClient } from '@/components/admin/EnquiriesClient';

export const metadata = {
  title: 'Enquiries — Sanitate Pharma Admin',
};

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();

  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <EnquiriesClient initialEnquiries={enquiries || []} />
  );
}
