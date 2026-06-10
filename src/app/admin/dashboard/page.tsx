import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — Sanitatepharma Admin',
};

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-primary mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Products', value: '—', color: 'bg-teal' },
          { label: 'Active Enquiries', value: '—', color: 'bg-gold' },
          { label: 'Team Members', value: '—', color: 'bg-primary' },
          { label: 'Published News', value: '—', color: 'bg-tealLight' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-card p-6"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-xl font-bold">#</span>
            </div>
            <p className="text-textMid text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-textDark mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
