'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Upload, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function TeamDrawer({ 
  open, 
  onOpenChange, 
  member 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  member?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: member?.name || '',
    designation: member?.designation || '',
    bio: member?.bio || '',
    sort_order: member?.sort_order || 0,
    is_leadership: member?.is_leadership ?? true,
  });
  
  const [photo, setPhoto] = useState<File | null>(null);

  const supabase = createClient();

  const uploadPhoto = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('team-photos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('team-photos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = member?.photo_url || null;

      if (photo) {
        photoUrl = await uploadPhoto(photo);
      }

      const payload = {
        ...formData,
        photo_url: photoUrl,
        ...(member?.id ? { id: member.id } : {}) // include ID if updating
      };

      const { error } = await supabase
        .from('team_members')
        .upsert(payload);

      if (error) throw error;

      toast.success(member ? 'Team member updated successfully' : 'Team member added successfully');
      onOpenChange(false);
      window.location.reload(); 
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col focus:outline-none animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Dialog.Title className="font-display text-xl font-bold text-primary">
              {member ? 'Edit Team Member' : 'Add Team Member'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Full Name *</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Designation *</label>
              <input 
                required
                type="text" 
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                placeholder="e.g. Managing Director"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Bio</label>
              <textarea 
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Sort Order</label>
                <input 
                  type="number" 
                  value={formData.sort_order}
                  onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Leadership Team?</label>
                <select 
                  value={formData.is_leadership ? 'yes' : 'no'}
                  onChange={(e) => setFormData({...formData, is_leadership: e.target.value === 'yes'})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <label className="text-sm font-semibold text-textDark block">Profile Photo</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">{photo ? photo.name : 'Click to upload photo'}</p>
                    <p className="text-xs text-gray-400">Square PNG/JPG recommended</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => e.target.files && setPhoto(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button type="button" className="px-5 py-2.5 rounded-lg font-semibold text-textDark bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <button 
              type="submit" 
              disabled={loading}
              onClick={onSubmit}
              className="px-5 py-2.5 rounded-lg font-semibold text-white bg-teal hover:bg-tealLight transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {member ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
