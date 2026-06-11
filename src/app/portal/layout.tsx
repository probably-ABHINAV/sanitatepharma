import Link from 'next/link';
import { AppLogo } from '@/components/ui/AppLogo';
import { Package, Download, LayoutDashboard, LogOut } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-offWhite flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/portal/dashboard" className="flex items-center gap-2">
            <AppLogo className="w-8 h-8" />
            <span className="font-display font-bold text-lg">B2B Portal</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/portal/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/portal/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            <Package className="w-5 h-5" /> Wholesale Catalog
          </Link>
          <Link href="/portal/materials" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            <Download className="w-5 h-5" /> Marketing Materials
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-white/10 transition-colors">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
