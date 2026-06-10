import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enquiries — Sanitatepharma Admin',
};

export default function AdminEnquiriesPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-primary mb-8">
        Enquiries
      </h1>
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-6 text-center text-textMid">
          <p>Enquiry management dashboard will be implemented here.</p>
          <p className="text-sm mt-2">Connect Supabase to load enquiries.</p>
        </div>
      </div>
    </div>
  );
}
