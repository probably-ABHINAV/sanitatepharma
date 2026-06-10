'use client';

import { useState, useMemo } from 'react';
import { Download, Eye } from 'lucide-react';
import { EnquiryDrawer } from '@/components/admin/EnquiryDrawer';
import { cn } from '@/lib/utils';

const TABS = ['all', 'general', 'franchise', 'contract_manufacturing', 'career'];

export function EnquiriesClient({ initialEnquiries }: { initialEnquiries: any[] }) {
  const [enquiries] = useState(initialEnquiries);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredEnquiries = useMemo(() => {
    if (activeTab === 'all') return enquiries;
    return enquiries.filter(e => e.enquiry_type === activeTab);
  }, [activeTab, enquiries]);

  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) return;

    // Build CSV header
    const headers = ['ID', 'Date', 'Type', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Status'];
    
    // Escape string logic for CSV
    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const cleanStr = String(str).replace(/"/g, '""');
      return `"${cleanStr}"`;
    };

    const csvRows = filteredEnquiries.map(e => [
      e.id,
      new Date(e.created_at).toISOString(),
      e.enquiry_type,
      e.name,
      e.email,
      e.phone,
      e.company,
      e.subject,
      e.message,
      e.status
    ].map(escapeCsv).join(','));

    const csvString = [headers.join(','), ...csvRows].join('\n');
    
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `enquiries_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDrawer = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Enquiries</h1>
        <button 
          onClick={handleExportCSV}
          disabled={filteredEnquiries.length === 0}
          className="flex items-center gap-2 bg-white border border-gray-200 text-textDark px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-gray-100 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-4 text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-colors relative",
                activeTab === tab ? "text-teal" : "text-textMid hover:text-textDark"
              )}
            >
              {tab.replace('_', ' ')}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openDrawer(enq)}>
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">{enq.name}</p>
                      <p className="text-xs text-textMid">{enq.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-gray-100 text-gray-700">
                        {enq.enquiry_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMid">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase ${
                        enq.status === 'new' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); openDrawer(enq); }}
                        className="w-8 h-8 inline-flex items-center justify-center rounded bg-tealPale text-teal hover:bg-teal hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-textMid">
                    No enquiries found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EnquiryDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        enquiry={selectedEnquiry} 
      />
    </div>
  );
}
