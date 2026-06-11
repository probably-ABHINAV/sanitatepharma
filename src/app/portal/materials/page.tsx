import { FileText, Image as ImageIcon, Download, Presentation } from 'lucide-react';

export const metadata = {
  title: 'Marketing Materials | Sanitatepharma B2B Portal',
};

const materials = [
  {
    category: 'Visual Aids',
    icon: Presentation,
    items: [
      { name: 'Cardiology Division 2026', size: '12.4 MB', type: 'PDF' },
      { name: 'Pediatrics Complete Range', size: '8.2 MB', type: 'PDF' },
      { name: 'Dermatology Visual Aid', size: '15.1 MB', type: 'PDF' },
    ]
  },
  {
    category: 'LBLs (Leave Behind Literatures)',
    icon: FileText,
    items: [
      { name: 'Azithromycin 500mg LBL', size: '2.1 MB', type: 'PDF' },
      { name: 'Multivitamin Syrup Promos', size: '1.8 MB', type: 'PDF' },
      { name: 'Pain Management Guide', size: '3.4 MB', type: 'PDF' },
    ]
  },
  {
    category: 'High-Res Product Assets',
    icon: ImageIcon,
    items: [
      { name: 'Product Packshots (All)', size: '245 MB', type: 'ZIP' },
      { name: 'Brand Logos (Vector)', size: '4.5 MB', type: 'ZIP' },
      { name: 'Social Media Banners', size: '42 MB', type: 'ZIP' },
    ]
  }
];

export default function PortalMaterialsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary mb-2">Marketing Materials</h1>
        <p className="text-textMid text-sm">Download official brand assets, visual aids, and promotional materials for your territory.</p>
      </div>

      <div className="space-y-8">
        {materials.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-offWhite/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-tealPale text-teal flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-primary">{section.category}</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <div key={item.name} className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-textMid">
                        {item.type}
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-sm">{item.name}</p>
                        <p className="text-xs text-textMid mt-0.5">{item.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-teal hover:text-teal transition-colors text-textMid">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
