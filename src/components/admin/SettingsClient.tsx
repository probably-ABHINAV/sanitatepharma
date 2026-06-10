'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { Loader2, Lock, Globe } from 'lucide-react';

export function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [loadingSettings, setLoadingSettings] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [loadingPassword, setLoadingPassword] = useState(false);

  const supabase = createClient();

  const handleSettingsChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSettings(true);

    try {
      // Upsert all settings sequentially or bulk
      const updates = Object.keys(settings).map(key => ({
        key,
        value: settings[key],
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('site_settings').upsert(updates);
      if (error) throw error;
      
      toast.success('Site configurations saved');
    } catch (err: any) {
      toast.error(`Error saving settings: ${err.message}`);
    } finally {
      setLoadingSettings(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (passwordForm.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoadingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(`Error updating password: ${err.message}`);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Settings</h1>
        <p className="text-textMid mt-2">Manage your account security and global website configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Global Configuration Pane */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Globe className="w-5 h-5 text-teal" />
            <h2 className="font-display font-bold text-primary text-lg">Site Configuration</h2>
          </div>
          
          <form onSubmit={saveSettings} className="p-6 flex-1 flex flex-col">
            <div className="space-y-5 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Contact Email</label>
                <input 
                  type="email" 
                  value={settings.contact_email || ''}
                  onChange={(e) => handleSettingsChange('contact_email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all"
                  placeholder="info@sanitatepharma.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Contact Phone</label>
                <input 
                  type="text" 
                  value={settings.contact_phone || ''}
                  onChange={(e) => handleSettingsChange('contact_phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all"
                  placeholder="+91 12345 67890"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Registered Address</label>
                <textarea 
                  rows={3}
                  value={settings.address || ''}
                  onChange={(e) => handleSettingsChange('address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all resize-none"
                  placeholder="Full office address..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-textDark">Facebook URL</label>
                  <input 
                    type="url" 
                    value={settings.facebook_url || ''}
                    onChange={(e) => handleSettingsChange('facebook_url', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-textDark">LinkedIn URL</label>
                  <input 
                    type="url" 
                    value={settings.linkedin_url || ''}
                    onChange={(e) => handleSettingsChange('linkedin_url', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loadingSettings}
              className="w-full mt-8 bg-teal text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-tealLight transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loadingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Configurations'}
            </button>
          </form>
        </div>

        {/* Security Pane */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden h-fit">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Lock className="w-5 h-5 text-teal" />
            <h2 className="font-display font-bold text-primary text-lg">Account Security</h2>
          </div>
          
          <form onSubmit={updatePassword} className="p-6">
            <div className="space-y-5">
              <div className="p-4 bg-tealPale rounded-lg border border-teal/10">
                <p className="text-sm text-teal font-medium">You are logged in as admin@sanitatepharma.com.</p>
                <p className="text-xs text-teal/70 mt-1">Changing your password will immediately apply to your next login.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">New Password</label>
                <input 
                  required
                  type="password" 
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Confirm New Password</label>
                <input 
                  required
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loadingPassword}
              className="w-full mt-8 bg-primary text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-primaryLight transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loadingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
