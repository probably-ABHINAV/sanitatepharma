'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Upload, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function NewsDrawer({ 
  open, 
  onOpenChange, 
  article 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  article?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    content: article?.content || '',
    status: article?.status || 'draft',
  });
  
  const [image, setImage] = useState<File | null>(null);

  const supabase = createClient();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('news-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = article?.image_url || null;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const payload = {
        ...formData,
        image_url: imageUrl,
        ...(formData.status === 'published' && !article?.published_at ? { published_at: new Date().toISOString() } : {}),
        ...(article?.id ? { id: article.id, updated_at: new Date().toISOString() } : {})
      };

      const { error } = await supabase
        .from('news')
        .upsert(payload);

      if (error) throw error;

      toast.success(article ? 'Article updated successfully' : 'Article created successfully');
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
        <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col focus:outline-none animate-slide-in-right">
          
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Dialog.Title className="font-display text-xl font-bold text-primary">
              {article ? 'Edit Article' : 'Create Article'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-semibold text-textDark">Title *</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={handleTitleChange}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark block">Cover Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative">
                  {image || article?.image_url ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={image ? URL.createObjectURL(image) : article.image_url} 
                        className="w-full h-full object-cover opacity-50"
                        alt="Cover preview"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                        <Upload className="w-6 h-6 text-white mb-2 drop-shadow-md" />
                        <p className="text-sm text-white font-medium drop-shadow-md">Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 font-medium">Click to upload cover image</p>
                      <p className="text-xs text-gray-400">16:9 ratio recommended</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => e.target.files && setImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2 flex-1 flex flex-col h-64">
              <label className="text-sm font-semibold text-textDark block">Article Content</label>
              <textarea 
                required
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="flex-1 w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none resize-none"
                placeholder="Write your article here..."
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
              {article ? 'Save Changes' : 'Create Article'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
