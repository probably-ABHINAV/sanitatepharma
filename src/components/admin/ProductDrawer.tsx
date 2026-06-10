'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Upload, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function ProductDrawer({ 
  open, 
  onOpenChange, 
  product,
  categories 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  product?: any;
  categories: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    category_id: product?.category_id || '',
    composition: product?.composition || '',
    indications: product?.indications || '',
    dosage_admin: product?.dosage_admin || '',
    pack_size: product?.pack_size || '',
    storage: product?.storage || '',
    prescription_type: product?.prescription_type || 'rx',
    status: product?.status || 'active',
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [brochure, setBrochure] = useState<File | null>(null);

  const supabase = createClient();

  const handleNameChange = (name: string) => {
    // Auto generate slug if creating a new product or if slug matches the old generated slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, name, slug });
  };

  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = product?.images || [];
      let brochureUrl = product?.brochure_url || null;

      // Upload new images
      if (images.length > 0) {
        const uploads = images.map(file => uploadFile(file, 'product-images'));
        const urls = await Promise.all(uploads);
        imageUrls = [...imageUrls, ...urls];
      }

      // Upload brochure
      if (brochure) {
        brochureUrl = await uploadFile(brochure, 'brochures');
      }

      const payload = {
        ...formData,
        images: imageUrls,
        brochure_url: brochureUrl,
        ...(product?.id ? { id: product.id } : {}) // include ID if updating
      };

      const { error } = await supabase
        .from('products')
        .upsert(payload);

      if (error) throw error;

      toast.success(product ? 'Product updated successfully' : 'Product created successfully');
      onOpenChange(false);
      // Let the parent know to refresh or use router.refresh()
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
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Dialog.Title className="font-display text-xl font-bold text-primary">
              {product ? 'Edit Product' : 'Add New Product'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Product Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Slug *</label>
                <input 
                  required
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Category *</label>
                <select 
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-textDark">Type</label>
                  <select 
                    value={formData.prescription_type}
                    onChange={(e) => setFormData({...formData, prescription_type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                  >
                    <option value="rx">Rx</option>
                    <option value="otc">OTC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-textDark">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Composition *</label>
              <textarea 
                required
                rows={2}
                value={formData.composition}
                onChange={(e) => setFormData({...formData, composition: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Indications</label>
              <textarea 
                rows={3}
                value={formData.indications}
                onChange={(e) => setFormData({...formData, indications: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Dosage & Admin</label>
                <input 
                  type="text" 
                  value={formData.dosage_admin}
                  onChange={(e) => setFormData({...formData, dosage_admin: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textDark">Pack Size</label>
                <input 
                  type="text" 
                  value={formData.pack_size}
                  onChange={(e) => setFormData({...formData, pack_size: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                  placeholder="e.g. 10x10 Tablets"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-textDark">Storage Conditions</label>
              <input 
                type="text" 
                value={formData.storage}
                onChange={(e) => setFormData({...formData, storage: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal outline-none"
                placeholder="Store in a cool, dry place"
              />
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-textDark block">Product Images</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 font-medium">Click to upload images</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*"
                      onChange={(e) => e.target.files && setImages(Array.from(e.target.files))}
                    />
                  </label>
                </div>
                {images.length > 0 && (
                  <p className="text-sm text-teal font-medium">{images.length} file(s) selected</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-textDark block">Product Brochure (PDF)</label>
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={(e) => e.target.files && setBrochure(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-tealPale file:text-teal hover:file:bg-teal/20"
                />
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
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
