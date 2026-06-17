'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { ProductDrawer } from '@/components/admin/ProductDrawer';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import Image from 'next/image';

export function ProductsClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const supabase = createClient();

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string, images: string[]) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');

      // Best effort to clean up images
      if (images && images.length > 0) {
        const fileNames = images.map(url => url.split('/').pop()!).filter(Boolean);
        if (fileNames.length > 0) {
          await supabase.storage.from('product-images').remove(fileNames);
        }
      }
    } catch (err: any) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Products</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-tealLight transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-16">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {product.images?.[0] ? (
                        <div className="w-10 h-10 relative">
                          <Image 
                            src={product.images[0]} 
                            alt={product.name} 
                            fill
                            sizes="40px"
                            className="rounded-lg object-cover border border-gray-100" 
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">{product.name}</p>
                      <p className="text-xs text-textMid truncate max-w-[200px]">{product.composition}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-textDark">
                      {product.categories?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase ${
                        product.prescription_type === 'rx' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {product.prescription_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold capitalize ${
                        product.status === 'active' ? 'bg-tealPale text-teal' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="w-8 h-8 rounded bg-gray-50 text-textMid hover:bg-tealPale hover:text-teal flex items-center justify-center transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id, product.images)}
                          className="w-8 h-8 rounded bg-gray-50 text-textMid hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-textMid">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        product={selectedProduct}
        categories={categories}
      />
    </div>
  );
}
