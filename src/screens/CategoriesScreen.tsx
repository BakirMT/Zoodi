import React, { useState } from 'react';
import {
  Search,
  ChevronRight,
  Shirt,
  Sparkles,
  Footprints,
  ShoppingBag,
  Home as HomeIcon,
  Smartphone,
  HeartHandshake,
  LayoutGrid,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CategoriesScreen: React.FC = () => {
  const { navigate, setSelectedCategory, setSelectedSubcategory, products } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'All',
      name: 'All Products',
      desc: 'Explore complete catalogue',
      icon: LayoutGrid,
      color: 'bg-rose-50 dark:bg-rose-950/40 text-[#DF1951]',
      badge: 'All Items',
    },
    {
      id: 'Women',
      name: 'Women',
      desc: 'Clothing, Dresses & Ethnic',
      icon: Sparkles,
      color: 'bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400',
    },
    {
      id: 'Men',
      name: 'Men',
      desc: 'Fashion & Streetwear',
      icon: Shirt,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'Footwear',
      name: 'Footwear',
      desc: 'Shoes, Sneakers & Heels',
      icon: Footprints,
      color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'Bags',
      name: 'Bags',
      desc: 'Handbags, Totes & Backpacks',
      icon: ShoppingBag,
      color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'Home',
      name: 'Home',
      desc: 'Home Decor & Living',
      icon: HomeIcon,
      color: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
    },
    {
      id: 'Electronics',
      name: 'Electronics',
      desc: 'Smartwatches & Accessories',
      icon: Smartphone,
      color: 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400',
    },
    {
      id: 'Beauty',
      name: 'Beauty',
      desc: 'Skincare, Makeup & Fragrances',
      icon: HeartHandshake,
      color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
    },
  ];

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('All');
    navigate('category_listing', { category: categoryId });
  };

  return (
    <div className="pb-28 flex flex-col gap-3">
      {/* Search Categories input */}
      <div className="px-4 pt-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories or products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Featured "All Products" Hero Card */}
      {!searchTerm && (
        <div className="px-4">
          <div
            onClick={() => handleSelect('All')}
            className="relative rounded-3xl overflow-hidden p-4 sm:p-5 bg-gradient-to-r from-rose-600 to-[#DF1951] text-white shadow-md shadow-rose-900/15 cursor-pointer active:scale-[0.99] transition-all group flex items-center justify-between"
          >
            <div className="relative z-10 max-w-[70%] space-y-1">
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-black uppercase tracking-wider">
                Full Collection
              </span>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                View All Products ({products.length})
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                Browse our entire inventory with custom price filters & sorting
              </p>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shrink-0">
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      )}

      {/* Category List Items */}
      <div className="px-4 flex flex-col gap-2 mt-1">
        {filtered.map((cat) => {
          const Icon = cat.icon;
          const count =
            cat.id === 'All'
              ? products.length
              : products.filter((p) => p.category === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs hover:border-[#DF1951]/40 dark:hover:border-[#DF1951]/40 cursor-pointer active:scale-[0.99] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${cat.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cat.name}
                    </h3>
                    {cat.badge && (
                      <span className="px-1.5 py-0.2 rounded-md bg-[#DF1951] text-white text-[9px] font-black uppercase">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400">
                    {cat.desc} {count > 0 && `• ${count} items`}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#DF1951] group-hover:translate-x-0.5 transition-all" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
