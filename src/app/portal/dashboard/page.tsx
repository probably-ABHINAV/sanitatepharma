import { Package, Download, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Distributor Dashboard | Sanitatepharma B2B Portal',
};

export default function PortalDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-teal rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-white/10">
            <ShieldCheck className="w-4 h-4" />
            Verified Distributor
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Welcome to your Portal</h1>
          <p className="text-white/80 max-w-xl text-sm sm:text-base leading-relaxed">
            Access your wholesale catalog, download marketing materials, and connect directly with your dedicated account manager.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/portal/products" className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-teal/30 transition-all">
          <div className="w-12 h-12 bg-tealPale text-teal rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-primary mb-1">Wholesale Catalog</h3>
          <p className="text-sm text-textMid">Browse 500+ products with B2B pricing and place bulk orders.</p>
        </Link>
        
        <Link href="/portal/materials" className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-teal/30 transition-all">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-primary mb-1">Marketing Materials</h3>
          <p className="text-sm text-textMid">Download Visual Aids, LBLs, and high-res product images.</p>
        </Link>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-primary mb-1">Account Manager</h3>
          <p className="text-sm text-textMid mb-4">Need assistance with an order?</p>
          <a href={`tel:${CONTACT_INFO.phone}`} className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>

      {/* Recent Activity Mock */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-primary">Recent Orders</h2>
        </div>
        <div className="p-12 text-center text-textMid">
          No recent orders found. Browse the <Link href="/portal/products" className="text-teal font-semibold">catalog</Link> to start your first bulk order.
        </div>
      </div>
    </div>
  );
}
