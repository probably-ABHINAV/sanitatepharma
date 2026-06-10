import { createClient } from '@/lib/supabase/server';
import { Package, Inbox, Briefcase, Factory, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard — Sanitate Pharma Admin',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Parallel data fetching for dashboard stats and recent enquiries
  const [
    { count: productsCount },
    { count: newEnquiriesCount },
    { count: franchiseCount },
    { count: contractCount },
    { data: recentEnquiries },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('enquiry_type', 'franchise').eq('status', 'new'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('enquiry_type', 'contract_manufacturing'),
    supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: 'Active Products', value: productsCount || 0, icon: Package, color: 'text-teal', bg: 'bg-teal/10' },
    { label: 'New Enquiries', value: newEnquiriesCount || 0, icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New Franchise Apps', value: franchiseCount || 0, icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Contract Mfg Leads', value: contractCount || 0, icon: Factory, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-card p-6 border border-gray-100 flex items-center gap-5">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-textMid text-sm font-medium">{stat.label}</p>
                <p className="font-display text-3xl font-extrabold text-primary mt-1 leading-none">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-primary">Recent Enquiries</h2>
          <Link 
            href="/admin/enquiries" 
            className="text-sm font-semibold text-teal hover:text-primary transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentEnquiries && recentEnquiries.length > 0 ? (
                recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-primary">{enq.name}</p>
                      <p className="text-xs text-textMid">{enq.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 capitalize">
                        {enq.enquiry_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMid">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        enq.status === 'new' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {enq.status.charAt(0).toUpperCase() + enq.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-textMid">
                    No recent enquiries found.
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
