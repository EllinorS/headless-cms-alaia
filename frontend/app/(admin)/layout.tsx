'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  LogOut,
  Loader2,
  Waves,
  Users,
  MenuIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import type { User } from '@/lib/types';
import { ThemeToggle } from '@/components/web/common/ThemeToggle';
import { toast } from 'sonner';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/sessions', label: 'Sessions', icon: CalendarDays },
  { href: '/admin/surf-trip-request', label: 'Surf trip requests', icon: Waves },
  { href: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await apiClient.get('/auth/me');
        setUser(data);
        setLoading(false);
      } catch {
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await apiClient.post('/auth/logout');
      router.push('/login');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background border-b z-40 flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(true)}>
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
        fixed h-full z-50 bg-background border-r border-border flex flex-col transition-all duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64
        md:translate-x-0
      `}
      >
        <div className="flex flex-col p-4 gap-1">
          <h1 className="text-2xl font-bold text-primary">ALAIA Admin</h1>
          <Link href="/" target="_blank" className="text-xs text-muted-foreground hover:underline">
            Go to website →
          </Link>
        </div>
        <nav className="px-3 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{user?.firstName || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <ThemeToggle />
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 pt-14 md:pt-8 p-8 md:ml-64">{children}</main>
    </div>
  );
}
