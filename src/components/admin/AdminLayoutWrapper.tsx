'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Toaster } from 'react-hot-toast';

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        {children}
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <AdminSidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <AdminTopBar />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
