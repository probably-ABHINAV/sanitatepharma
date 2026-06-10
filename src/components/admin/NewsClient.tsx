'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import { NewsDrawer } from './NewsDrawer';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function NewsClient({ initialNews }: { initialNews: any[] }) {
  const [news, setNews] = useState(initialNews);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  
  const supabase = createClient();

  const handleAdd = () => {
    setSelectedArticle(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (article: any) => {
    setSelectedArticle(article);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string, image_url: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
      
      setNews(news.filter(n => n.id !== id));
      toast.success('Article deleted');

      if (image_url) {
        const fileName = image_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('news-images').remove([fileName]);
        }
      }
    } catch (err: any) {
      toast.error(`Failed to delete article: ${err.message}`);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">News & Updates</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-tealLight transition-colors shadow-soft"
        >
          <Plus className="w-5 h-5" />
          Create Article
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-16">Cover</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.length > 0 ? (
                news.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {article.image_url ? (
                        <img src={article.image_url} alt={article.title} className="w-12 h-10 rounded object-cover border border-gray-100" />
                      ) : (
                        <div className="w-12 h-10 rounded bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <span className="text-[10px] font-medium text-gray-400">No Img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">{article.title}</p>
                      <p className="text-xs text-textMid font-mono mt-0.5">/{article.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase ${
                        article.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMid">
                      {article.published_at ? (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.published_at).toLocaleDateString()}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(article)}
                          className="w-8 h-8 rounded bg-gray-50 text-textMid hover:bg-tealPale hover:text-teal flex items-center justify-center transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(article.id, article.image_url)}
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
                  <td colSpan={5} className="px-6 py-12 text-center text-textMid">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewsDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        article={selectedArticle} 
      />
    </div>
  );
}
