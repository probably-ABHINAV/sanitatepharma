import { createClient } from '@/lib/supabase/server';
import { FilterSidebar } from '@/components/products/FilterSidebar';
import { ProductCard } from '@/components/products/ProductCard';
import { Pagination } from '@/components/ui/Pagination';
import { PackageSearch, X } from 'lucide-react';
import Link from 'next/link';
import type { Product, Category } from '@/lib/types';

// Let Next.js know this page has dynamic search params
export const dynamic = 'force-dynamic';

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : '';
  const typeParam = typeof searchParams.type === 'string' ? searchParams.type : '';
  const qParam = typeof searchParams.q === 'string' ? searchParams.q : '';
  const pageParam = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  
  const ITEMS_PER_PAGE = 12;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const supabase = await createClient();

  // 1. Fetch categories for sidebar
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  // 2. Build dynamic products query
  // We use inner join on categories to filter by category slug
  let query = supabase
    .from('products')
    .select('*, category:categories!inner(*)', { count: 'exact' })
    .eq('status', 'active');

  if (categoryParam) {
    query = query.eq('categories.slug', categoryParam);
  }
  
  if (typeParam) {
    query = query.eq('prescription_type', typeParam);
  }
  
  if (qParam) {
    query = query.ilike('name', `%${qParam}%`);
  }

  // Add sorting (A-Z by default)
  query = query.order('name', { ascending: true });

  // Add pagination
  query = query.range(offset, offset + ITEMS_PER_PAGE - 1);

  const { data: productsData, count, error } = await query;

  const products = (productsData || []) as Product[];
  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Total products across all categories for the "All Categories" count
  const { count: totalProductsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const hasFilters = categoryParam || typeParam || qParam;

  return (
    <div className="min-h-screen bg-offWhite pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
            Product Catalogue
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            Explore our comprehensive range of high-quality formulations designed to meet diverse medical requirements across India.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar (Filters) */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-24 bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
              <FilterSidebar 
                categories={(categories || []) as Category[]} 
                totalProducts={totalProductsCount || 0}
              />
            </div>
          </aside>

          {/* Right Content (Products Grid) */}
          <main className="flex-1 min-w-0">
            {/* Top Bar: Showing results & Sort */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-textMid font-medium">
                Showing <span className="text-primary font-bold">{products.length ? offset + 1 : 0}-{Math.min(offset + ITEMS_PER_PAGE, totalItems)}</span> of <span className="text-primary font-bold">{totalItems}</span> products
              </p>
              
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-semibold text-textMid">Sort by:</label>
                <select 
                  id="sort" 
                  className="text-sm border-none bg-offWhite rounded-lg px-3 py-1.5 font-medium text-primary focus:ring-1 focus:ring-teal outline-none cursor-pointer"
                  defaultValue="az"
                >
                  <option value="az">A-Z (Alphabetical)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-tealPale rounded-full flex items-center justify-center text-teal mb-6">
                  <PackageSearch className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">No products found</h3>
                <p className="text-textMid mb-8 max-w-md">
                  We couldn't find any products matching your current filters. Try adjusting your search or clearing some filters.
                </p>
                {hasFilters && (
                  <Link 
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </Link>
                )}
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}
