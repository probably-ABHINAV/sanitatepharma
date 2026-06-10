import { createClient } from '@/lib/supabase/server';
import { SettingsClient } from '@/components/admin/SettingsClient';

export const metadata = {
  title: 'Settings — Sanitate Pharma Admin',
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data: rawSettings } = await supabase
    .from('site_settings')
    .select('*');

  // Convert array of {key, value} to a single object Record<string, string>
  const settingsObj: Record<string, string> = {};
  if (rawSettings) {
    rawSettings.forEach((row) => {
      settingsObj[row.key] = row.value;
    });
  }

  return (
    <SettingsClient initialSettings={settingsObj} />
  );
}
