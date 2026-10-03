import React from 'react';
import { Menu, Bell, Store, Calendar, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ZoodiLogo } from '../../components/ZoodiLogo';

export const AdminHeader: React.FC = () => {
  const { setSidebarOpen, setIsStoreMode, adminTab, setAdminTab } = useAdmin();

  const isDrillDown = [
    'order_detail',
    'customer_detail',
    'banner_detail',
    'add_product',
    'product_detail',
    'feedback',
  ].includes(adminTab);

  const getBackTab = () => {
    if (adminTab === 'order_detail') return 'orders';
    if (adminTab === 'customer_detail') return 'customers';
    if (adminTab === 'banner_detail') return 'banners';
    if (adminTab === 'add_product' || adminTab === 'product_detail') return 'products';
    return 'dashboard';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar or Back button */}
        {isDrillDown ? (
          <button
            type="button"
            onClick={() => setAdminTab(getBackTab())}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-pink-600 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="lg:hidden">
          <ZoodiLogo size="sm" showSubtitle={false} />
        </div>

        {/* Date Tag */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-pink-500" />
          <span>Oct 2, 2026</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Switch to Customer Storefront */}
        <button
          type="button"
          onClick={() => setIsStoreMode(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 hover:bg-pink-100 text-xs font-bold border border-pink-200 dark:border-pink-800/60 transition-all active:scale-95"
          title="Switch to customer storefront view"
        >
          <Store className="w-4 h-4" />
          <span className="hidden sm:inline">Storefront</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500" />
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500/20"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Afneel
            </span>
            <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
