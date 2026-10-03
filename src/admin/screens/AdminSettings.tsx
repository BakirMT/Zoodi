import React, { useState } from 'react';
import {
  Sliders,
  Bell,
  Globe,
  Sun,
  Moon,
  Shield,
  Trash2,
  LogOut,
  ChevronRight,
  Store,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';

export const AdminSettings: React.FC = () => {
  const { setIsStoreMode } = useAdmin();
  const { isDarkMode, toggleDarkMode, clearCache, cacheSizeMB, showToast } = useApp();

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Account & store administration preferences
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 text-xs">
        {/* Switch to Storefront */}
        <div
          onClick={() => setIsStoreMode(true)}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Customer Storefront</div>
              <div className="text-[11px] text-slate-400">Preview shopping view</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Notifications */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white">Admin Notifications</div>
          </div>
          <span className="text-[11px] font-bold text-emerald-500">Enabled</span>
        </div>

        {/* Language */}
        <div
          onClick={() => showToast('Language: English')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white">Language</div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>English</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Appearance (Light / Dark) */}
        <div
          onClick={() => toggleDarkMode()}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
              {isDarkMode ? <Moon className="w-4 h-4 text-pink-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div className="font-bold text-slate-900 dark:text-white">Appearance</div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Privacy & Security */}
        <div
          onClick={() => showToast('Admin Security: 2FA is active.')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white">Privacy & Security</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Clear Cache */}
        <div
          onClick={clearCache}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white">Clear Cache</div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{cacheSizeMB}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Log Out */}
        <div
          onClick={() => {
            setIsStoreMode(true);
            showToast('Logged out of Admin Portal.');
          }}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <div className="font-bold">Log Out</div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
