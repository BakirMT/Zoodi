import React from 'react';
import {
  ShoppingBag,
  IndianRupee,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  Eye,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { setAdminTab, setSelectedOrderId } = useAdmin();
  const { orders } = useApp();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Welcome back, Admin! Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-pink-500" />
            <span>Oct 2, 2026</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards (Matching Screen 2 in mockup) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Orders */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Orders
            </span>
            <div className="w-9 h-9 rounded-2xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              1,248
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 12%</span>
              <span className="text-slate-400 font-normal">than last week</span>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              ₹4,28,750
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 18%</span>
              <span className="text-slate-400 font-normal">than last week</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Products
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              236
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 5%</span>
              <span className="text-slate-400 font-normal">than last week</span>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Customers
            </span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              892
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 10%</span>
              <span className="text-slate-400 font-normal">than last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Overview Chart Section (Matching Screen 2 in mockup) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              Sales Overview
            </h2>
            <p className="text-xs text-slate-400">Monthly revenue trends and target performance</p>
          </div>

          {/* Chart Legends */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span>This Month</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-300 dark:bg-indigo-700" />
              <span>Last Month</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Line / Curve Chart */}
        <div className="relative pt-6 pb-2 w-full overflow-hidden">
          {/* Active Tooltip Badge matching mockup ₹68,420 at 20 Oct */}
          <div className="absolute top-2 right-[28%] sm:right-[32%] z-10 px-2.5 py-1 rounded-xl bg-pink-600 text-white font-extrabold text-[11px] shadow-lg animate-bounce">
            ₹68,420
          </div>

          <div className="h-52 w-full">
            <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E11D48" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4 4" />

              {/* Last Month Line (Purple / muted) */}
              <path
                d="M 20 160 C 100 150, 180 140, 240 120 C 300 100, 360 110, 420 90 C 480 70, 560 85, 680 60"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2"
                strokeDasharray="5 5"
                opacity="0.6"
              />

              {/* This Month Area Fill */}
              <path
                d="M 20 170 C 90 160, 150 140, 220 130 C 280 120, 340 70, 420 50 C 490 35, 580 80, 680 40 L 680 190 L 20 190 Z"
                fill="url(#pinkGradient)"
              />

              {/* This Month Curve Line */}
              <path
                d="M 20 170 C 90 160, 150 140, 220 130 C 280 120, 340 70, 420 50 C 490 35, 580 80, 680 40"
                fill="none"
                stroke="#E11D48"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Highlight Dot on Peak */}
              <circle cx="420" cy="50" r="5" fill="#E11D48" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-2">
            <span>1 Oct</span>
            <span>5 Oct</span>
            <span>10 Oct</span>
            <span>15 Oct</span>
            <span>20 Oct</span>
            <span>25 Oct</span>
            <span>31 Oct</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            Recent Orders
          </h2>
          <button
            type="button"
            onClick={() => setAdminTab('orders')}
            className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 active:scale-95 transition-transform"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile View (< sm): Responsive touch-friendly card list */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 sm:hidden">
          {orders.slice(0, 4).map((o) => (
            <div
              key={o.id}
              onClick={() => {
                setSelectedOrderId(o.id);
                setAdminTab('order_detail');
              }}
              className="py-3 flex items-center justify-between gap-3 active:bg-slate-50 dark:active:bg-slate-800/60 rounded-xl px-1.5 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white truncate">
                    {o.id}
                  </span>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                      o.status === 'Delivered'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                        : o.status === 'Shipped'
                        ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400'
                        : o.status === 'Processing'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                        : o.status === 'Out for Delivery'
                        ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate font-medium">Ayesha Khan</span>
                  <span className="font-extrabold text-slate-900 dark:text-white shrink-0 ml-2">
                    ₹{o.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Tablet / Desktop View (>= sm): Full table with proper spacing */}
        <div className="hidden sm:block overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold whitespace-nowrap">
                <th className="pb-2.5 pr-4">Order ID</th>
                <th className="pb-2.5 px-4">Customer</th>
                <th className="pb-2.5 px-4">Total</th>
                <th className="pb-2.5 px-4">Status</th>
                <th className="pb-2.5 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 whitespace-nowrap">
              {orders.slice(0, 4).map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 pr-4 font-mono font-bold text-slate-900 dark:text-white">
                    {o.id}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    Ayesha Khan
                  </td>
                  <td className="py-3 px-4 font-extrabold text-slate-900 dark:text-white">
                    ₹{o.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                          : o.status === 'Shipped'
                          ? 'bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400'
                          : o.status === 'Processing'
                          ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400'
                          : o.status === 'Out for Delivery'
                          ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400'
                          : 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrderId(o.id);
                        setAdminTab('order_detail');
                      }}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-pink-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
