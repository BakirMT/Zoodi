import React, { useState } from 'react';
import { Search, Calendar, Eye, Filter, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';

export const AdminOrders: React.FC = () => {
  const { setSelectedOrderId, setAdminTab } = useAdmin();
  const { orders } = useApp();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filterTabs = [
    { label: 'All', count: 129 },
    { label: 'Pending', count: 24 },
    { label: 'Processing', count: 18 },
    { label: 'Shipped', count: 32 },
    { label: 'Delivered', count: 55 },
  ];

  // Mock list matching Screen 6
  const allAdminOrders = [
    {
      id: '#ZC10324',
      customer: 'Ayesha Khan',
      email: 'ayesha@gmail.com',
      total: 1299,
      status: 'Delivered' as const,
      date: '02 Oct 2026, 10:24 AM',
    },
    {
      id: '#ZC10323',
      customer: 'Muhammed Rizwan',
      email: 'rizwan@gmail.com',
      total: 2499,
      status: 'Processing' as const,
      date: '02 Oct 2026, 09:12 AM',
    },
    {
      id: '#ZC10322',
      customer: 'Fathima Noushad',
      email: 'fathima@gmail.com',
      total: 899,
      status: 'Shipped' as const,
      date: '01 Oct 2026, 04:45 PM',
    },
    {
      id: '#ZC10321',
      customer: 'Sadiya P',
      email: 'sadiya@gmail.com',
      total: 3499,
      status: 'Delivered' as const,
      date: '01 Oct 2026, 02:18 PM',
    },
    {
      id: '#ZC10320',
      customer: 'Amal K',
      email: 'amal@gmail.com',
      total: 1199,
      status: 'Pending' as const,
      date: '30 Sep 2026, 11:05 AM',
    },
    ...orders.map((o) => ({
      id: o.id,
      customer: 'Ayesha Khan',
      email: 'ayesha@gmail.com',
      total: o.total,
      status: o.status,
      date: o.date,
    })),
  ];

  const filtered = allAdminOrders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          View and manage customer orders and fulfillment
        </p>
      </div>

      {/* Filter Tabs matching Screen 6 in mockup: All (129), Pending (24), Processing (18) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterTabs.map((t) => {
          const isSelected = selectedStatus === t.label;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => setSelectedStatus(t.label)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-pink-500'
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Date Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order id, customer name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-xs"
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs hover:border-pink-500"
        >
          <Calendar className="w-3.5 h-3.5 text-pink-500" />
          <span>Date Range</span>
        </button>
      </div>

      {/* Orders Table (Matching Screen 6 in mockup) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/60 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setAdminTab('order_detail');
                  }}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {order.customer}
                    </div>
                    <div className="text-[10px] text-slate-400">{order.date}</div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-white">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : order.status === 'Processing'
                          ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      ● {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="p-1.5 rounded-lg text-slate-400 hover:text-pink-600 inline-block">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
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
