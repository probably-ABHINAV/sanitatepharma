import { createClient } from '@/lib/supabase/server';
import { TeamClient } from '@/components/admin/TeamClient';

export const metadata = {
  title: 'Team Management — Sanitate Pharma Admin',
};

export default async function AdminTeamPage() {
  const supabase = await createClient();

  const { data: team } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <TeamClient initialTeam={team || []} />
  );
}
