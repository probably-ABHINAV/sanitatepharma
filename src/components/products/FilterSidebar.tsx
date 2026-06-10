'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';
import type { Category } from '@/lib/types';
import Link from 'next/link';

interface FilterSidebarProps {
  categories: Category[];
  totalProducts: number;
}

export function FilterSidebar({ categories, totalProducts }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentType = searchParams.get('type') || '';
  const currentQuery = searchParams.get('q') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when filters change
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    updateFilters('q', q);
  };

  const hasFilters = currentCategory || currentType || currentQuery;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-primary text-xl">Filter Products</h2>
        {hasFilters && (
          <Link
            href={pathname}
            className="text-xs font-semibold text-teal hover:text-primary uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear All
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            name="q"
            defaultValue={currentQuery}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-card border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none text-sm transition-all"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <button type="submit" className="sr-only">Search</button>
        </form>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-textMid mb-4">
          Categories
        </h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <label className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="category"
                checked={!currentCategory}
                onChange={() => updateFilters('category', '')}
                className="w-4 h-4 text-teal border-gray-300 focus:ring-teal"
              />
              <span className={`text-sm ${!currentCategory ? 'text-primary font-semibold' : 'text-textMid group-hover:text-primary'}`}>
                All Categories
              </span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
              {totalProducts}
            </span>
          </label>
          
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="category"
                  checked={currentCategory === cat.slug}
                  onChange={() => updateFilters('category', cat.slug)}
                  className="w-4 h-4 text-teal border-gray-300 focus:ring-teal"
                />
                <span className={`text-sm ${currentCategory === cat.slug ? 'text-primary font-semibold' : 'text-textMid group-hover:text-primary'}`}>
                  {cat.name}
                </span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {cat.product_count || 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Prescription Type */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-textMid mb-4">
          Type
        </h3>
        <div className="space-y-3">
          {[
            { value: '', label: 'All Types' },
            { value: 'rx', label: 'Prescription (Rx)' },
            { value: 'otc', label: 'Over-The-Counter (OTC)' },
          ].map((type) => (
            <label key={type.value} className="flex items-center gap-3 group cursor-pointer">
              <input
                type="radio"
                name="type"
                checked={currentType === type.value}
                onChange={() => updateFilters('type', type.value)}
                className="w-4 h-4 text-teal border-gray-300 focus:ring-teal"
              />
              <span className={`text-sm ${currentType === type.value ? 'text-primary font-semibold' : 'text-textMid group-hover:text-primary'}`}>
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
