import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Products — Sanitatepharma Admin',
};

export default function AdminProductsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">
          Products
        </h1>
        <button className="bg-teal text-white px-6 py-3 rounded-lg hover:bg-tealLight transition-colors font-medium">
          + Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-6 text-center text-textMid">
          <p>Product management table will be implemented here.</p>
          <p className="text-sm mt-2">Connect Supabase to load products.</p>
        </div>
      </div>
    </div>
  );
}
