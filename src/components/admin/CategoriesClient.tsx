'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { CategoryDrawer } from './CategoryDrawer';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  
  const supabase = createClient();

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category? Products associated with this category will also be deleted or orphaned.')) return;
    
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Category deleted');
    } catch (err: any) {
      toast.error(`Failed to delete category: ${err.message}`);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Categories</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-tealLight transition-colors shadow-soft"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">{category.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 font-mono text-xs">
                        {category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMid max-w-md truncate">
                      {category.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="w-8 h-8 rounded bg-gray-50 text-textMid hover:bg-tealPale hover:text-teal flex items-center justify-center transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
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
                  <td colSpan={4} className="px-6 py-12 text-center text-textMid">
                    No categories found. Create your first therapeutic segment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        category={selectedCategory} 
      />
    </div>
  );
}
