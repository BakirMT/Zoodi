import React, { useState } from 'react';
import { Calendar, TrendingUp, Sparkles, Shirt } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Sales' | 'Orders' | 'Customers'>('Sales');

  const barData = [
    { label: '1 Oct', height: '40%', val: '₹32k' },
    { label: '4 Oct', height: '25%', val: '₹20k' },
    { label: '8 Oct', height: '55%', val: '₹45k' },
    { label: '12 Oct', height: '35%', val: '₹28k' },
    { label: '15 Oct', height: '70%', val: '₹58k' },
    { label: '18 Oct', height: '45%', val: '₹36k' },
    { label: '22 Oct', height: '85%', val: '₹68k' },
    { label: '26 Oct', height: '60%', val: '₹49k' },
    { label: '31 Oct', height: '95%', val: '₹78k' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Track your store performance, revenue, and customer conversions
        </p>
      </div>

      {/* Date Range Selector (Matching Screen 9: Oct 2, 2026 - Oct 31, 2026) */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-pink-500" />
          <span>Oct 2, 2026 - Oct 31, 2026</span>
        </div>
        <span className="text-[10px] text-pink-500 font-bold">Live Synced</span>
      </div>

      {/* Tabs (Sales | Orders | Customers) */}
      <div className="flex items-center gap-2">
        {(['Sales', 'Orders', 'Customers'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-[#E11D48] text-white shadow-md shadow-rose-900/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Total Sales Card with Graphical Bar Chart (Matching Screen 9 in mockup) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-5">
        <div>
          <span className="text-xs font-semibold text-slate-400">
            {activeTab === 'Sales' ? 'Total Sales' : activeTab === 'Orders' ? 'Total Orders' : 'Total Customers'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {activeTab === 'Sales' ? '₹ 4,28,750' : activeTab === 'Orders' ? '1,248' : '892'}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 18%</span>
            <span className="text-slate-400 font-normal">than last month</span>
          </div>
        </div>

        {/* Graphical Bar Chart */}
        <div className="pt-4">
          <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-3 px-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            {barData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold text-pink-600 dark:text-pink-400 mb-1">
                  {bar.val}
                </span>
                <div
                  style={{ height: bar.height }}
                  className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-pink-600 to-rose-400 hover:from-pink-500 hover:to-rose-300 transition-all cursor-pointer shadow-xs"
                />
              </div>
            ))}
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-1">
            <span>1 Oct</span>
            <span>8 Oct</span>
            <span>15 Oct</span>
            <span>22 Oct</span>
            <span>31 Oct</span>
          </div>
        </div>
      </div>

      {/* Top Product & Top Category Cards (Matching Screen 9 in mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Top Product */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Top Product
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Floral Dress
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="font-extrabold text-slate-900 dark:text-white">₹ 1,299</span>
              <span className="ml-1 text-[11px] text-pink-500 font-semibold">(245 sold)</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=200&q=80"
              alt="Floral Dress"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Top Category */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Top Category
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Women
            </h3>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              42% of total store sales
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
            <Shirt className="w-6 h-6 stroke-[1.8]" />
          </div>
        </div>
      </div>
    </div>
  );
};
