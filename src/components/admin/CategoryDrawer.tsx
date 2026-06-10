'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function CategoryDrawer({ 
  open, 
  onOpenChange, 
  category 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  category?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
  });
  
  const supabase = createClient();

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ...(category?.id ? { id: category.id } : {})
      };

      const { error } = await supabase
        .from('categories')
        .upsert(payload);

      if (error) throw error;

      toast.success(category ? 'Category updated successfully' : 'Category added successfully');
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
          
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Dialog.Title className="font-display text-xl font-bold text-primary">
              {category ? 'Edit Category' : 'Add Category'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Category Name *</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">URL Slug *</label>
              <input 
                required
                type="text" 
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '')})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none font-mono text-sm"
              />
              <p className="text-xs text-textMid">This will be used in the URL (e.g. /products/general-medicine)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
              />
            </div>
          </form>

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
              {category ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
