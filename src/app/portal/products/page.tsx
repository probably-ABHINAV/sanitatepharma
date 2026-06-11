import { createClient } from '@/lib/supabase/server';
import { PackageSearch, FileDown, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PortalProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const qParam = typeof searchParams.q === 'string' ? searchParams.q : '';

  const supabase = await createClient();

  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('status', 'active')
    .order('name', { ascending: true });

  if (qParam) {
    query = query.or(`name.ilike.%${qParam}%,composition.ilike.%${qParam}%`);
  }

  const { data: productsData } = await query;
  const products = (productsData || []) as Product[];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Wholesale Catalog</h1>
          <p className="text-textMid text-sm">Browse products and wholesale rates.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/catalog/pdf"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-teal text-textMid hover:text-teal transition-colors"
          >
            <FileDown className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <form method="GET" action="/portal/products" className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={qParam}
            placeholder="Search by brand name or composition..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none text-sm"
          />
          <button type="submit" className="px-6 py-2.5 bg-teal text-white font-bold text-sm rounded-lg hover:bg-primary transition-colors">
            Search
          </button>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Composition</th>
                <th className="px-6 py-4">Category & Pack</th>
                <th className="px-6 py-4">Wholesale Rate</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length > 0 ? (
                products.map((product) => {
                  // Mock wholesale price for B2B portal based on name length just for display
                  const mockPrice = (product.name.length * 15) + 120;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/products/${product.slug}`} className="font-bold text-primary hover:text-teal block">
                          {product.name}
                        </Link>
                        {product.prescription_type === 'rx' ? (
                          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase">Rx</span>
                        ) : (
                          <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded uppercase">OTC</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-textMid max-w-[200px] truncate">
                        {product.composition || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-primary">{product.category?.name || '-'}</p>
                        <p className="text-xs text-textMid">{product.pack_size || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-teal">₹{mockPrice}</p>
                        <p className="text-[10px] text-textMid uppercase">Per Box</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-offWhite border border-gray-200 hover:border-teal hover:text-teal rounded-lg text-xs font-semibold text-textMid transition-colors">
                          <ShoppingCart className="w-3.5 h-3.5" /> Add
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-textMid">
                      <PackageSearch className="w-12 h-12 mb-4 text-gray-300" />
                      <p>No products found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
