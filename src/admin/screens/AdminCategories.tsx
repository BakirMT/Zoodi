import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  count: number;
  image: string;
  type: 'Men' | 'Women' | 'Footwear' | 'Bags' | 'Home' | 'Electronics';
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat_1',
    name: 'Men',
    subtitle: 'Fashion • 4 products',
    count: 4,
    type: 'Men',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cat_2',
    name: 'Women',
    subtitle: 'Clothing • 4 products',
    count: 4,
    type: 'Women',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cat_3',
    name: 'Footwear',
    subtitle: 'Shoes • 2 products',
    count: 2,
    type: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cat_4',
    name: 'Bags',
    subtitle: 'Handbags • 2 products',
    count: 2,
    type: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cat_5',
    name: 'Home',
    subtitle: 'Home & Living • 2 products',
    count: 2,
    type: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cat_6',
    name: 'Electronics',
    subtitle: 'Gadgets & Accessories • 1 product',
    count: 1,
    type: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80',
  },
];

export const AdminCategories: React.FC = () => {
  const { showToast } = useApp();
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSub, setNewCatSub] = useState('');

  const filterTabs = [
    { label: 'All', count: 12 },
    { label: 'Men', count: 4 },
    { label: 'Women', count: 4 },
    { label: 'Footwear', count: 2 },
  ];

  const filtered = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' || c.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showToast(`Category "${name}" deleted.`);
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: CategoryItem = {
      id: `cat_${Date.now()}`,
      name: newCatName.trim(),
      subtitle: newCatSub.trim() || 'General • 0 products',
      count: 0,
      type: 'Women',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80',
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCatName}" created.`);
    setShowAddModal(false);
    setNewCatName('');
    setNewCatSub('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage product categories and department classification
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs shadow-md shadow-rose-900/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-xs"
        />
      </div>

      {/* Filter Tabs matching Screen 4/5: All (12), Men (4), Women (4), Footwear (2) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterTabs.map((t) => {
          const isSelected = selectedFilter === t.label;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => setSelectedFilter(t.label)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#DF1951] text-white shadow-xs'
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

      {/* Category List Cards (Matching Screen 4 & 5 in mockup) */}
      <div className="space-y-2.5">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between hover:border-pink-500/40 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{cat.subtitle}</p>
              </div>
            </div>

            {/* Edit & Delete Action Icons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => showToast(`Edit category "${cat.name}"`)}
                className="p-2 rounded-xl text-slate-400 hover:text-pink-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit Category"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Category
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="py-4 space-y-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Activewear, Winterwear"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Subtitle Description
                </label>
                <input
                  type="text"
                  value={newCatSub}
                  onChange={(e) => setNewCatSub(e.target.value)}
                  placeholder="e.g. Sports & gym clothing • 0 products"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#DF1951] text-white font-bold shadow-md hover:bg-[#BE123C] transition-colors mt-2"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
