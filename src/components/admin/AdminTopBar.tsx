'use client';

import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

export function AdminTopBar() {
  const pathname = usePathname();
  
  // Basic title extraction from path
  const pathParts = pathname.split('/').filter(Boolean);
  const currentResource = pathParts.length > 1 ? pathParts[1] : 'Dashboard';
  const title = currentResource.charAt(0).toUpperCase() + currentResource.slice(1);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="font-display text-xl font-bold text-primary">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-textMid hover:text-teal transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
          <div className="w-8 h-8 rounded-full bg-tealPale text-teal flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-primary leading-tight">Admin User</p>
            <p className="text-[11px] font-semibold text-textMid uppercase tracking-wider">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
