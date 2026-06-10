'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Inbox, 
  Users, 
  Newspaper, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AppLogo } from '@/components/ui/AppLogo';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error logging out');
    } else {
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <aside className="w-[240px] fixed top-0 left-0 bottom-0 bg-white border-r border-gray-100 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <AppLogo className="w-7 h-7 mr-3 shrink-0" />
        <span className="font-display font-extrabold text-primary tracking-tight">Sanitate Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200',
                isActive 
                  ? 'bg-teal text-white shadow-soft' 
                  : 'text-textMid hover:bg-tealPale hover:text-teal'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-[13px] font-semibold text-textMid hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
