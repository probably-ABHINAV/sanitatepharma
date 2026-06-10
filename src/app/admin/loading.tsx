import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex-1 w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-card flex items-center justify-center mb-4">
        <Loader2 className="w-8 h-8 text-teal animate-spin" />
      </div>
      <h2 className="font-display text-xl font-bold text-primary">Loading Data...</h2>
      <p className="text-textMid mt-2">Fetching the latest information securely.</p>
    </div>
  );
}
