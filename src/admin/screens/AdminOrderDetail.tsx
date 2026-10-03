import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Truck,
  Package,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';

export const AdminOrderDetail: React.FC = () => {
  const { selectedOrderId, setAdminTab } = useAdmin();
  const { showToast } = useApp();

  const [status, setStatus] = useState<'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'>('Delivered');

  const items = [
    {
      name: 'Floral Dress',
      category: 'Women',
      qty: 1,
      price: 1299,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'HandBag',
      category: 'Bags',
      qty: 1,
      price: 2499,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Sneakers',
      category: 'Shoes',
      qty: 1,
      price: 1299,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5">
      {/* Top back & title */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setAdminTab('orders')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-pink-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </button>

        {/* Status updater */}
        <select
          value={status}
          onChange={(e) => {
            const next = e.target.value as any;
            setStatus(next);
            showToast(`Order status updated to ${next}.`);
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Main Order Card (Matching Screen 12 in mockup) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs p-5 sm:p-6 space-y-4">
        {/* Order ID & Status Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-lg font-mono font-black text-slate-900 dark:text-white">
              {selectedOrderId}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-pink-500" />
              <span>02 Oct 2026, 10:24 AM</span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === 'Delivered'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                : 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400'
            }`}
          >
            ● {status}
          </span>
        </div>

        {/* Customer & Delivery Grid (Matching Screen 12) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Customer Details */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px]">
              Customer Details
            </span>
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Ayesha Khan"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Ayesha Khan</div>
                <div className="text-[11px] text-slate-400">ayesha@gmail.com</div>
                <div className="text-[11px] text-slate-400">+91 98765 43210</div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px]">
              Delivery Details
            </span>
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Delivery Partner</div>
              <div className="text-slate-600 dark:text-slate-300">Ramesh Kumar (⭐ 4.8)</div>
              <div className="text-[11px] text-slate-400">Tracking ID: #DL24567891</div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="pt-2">
          <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px] mb-2">
            Order Items
          </span>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((it, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{it.name}</div>
                    <div className="text-[11px] text-slate-400">{it.category}</div>
                  </div>
                </div>

                <div className="font-mono font-bold text-slate-900 dark:text-white">
                  {it.qty} × ₹{it.price.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="font-mono">₹5,097</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Shipping Charge</span>
            <span className="font-mono">₹70</span>
          </div>
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Discount</span>
            <span className="font-mono">-₹1,200</span>
          </div>
          <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Total</span>
            <span className="text-pink-600 font-black">₹4,897</span>
          </div>
        </div>

        {/* View Tracking Action */}
        <button
          type="button"
          onClick={() => showToast('Courier partner is en route. Live tracking confirmed.')}
          className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors mt-2"
        >
          View Live Tracking
        </button>
      </div>
    </div>
  );
};
