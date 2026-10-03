import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ZoodiLogo } from '../components/ZoodiLogo';
import { ArrowRight, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[580px] h-full flex flex-col justify-between items-center px-6 py-12 bg-white dark:bg-slate-950 text-slate-900 dark:text-white select-none transition-colors">
      {/* Top subtle decorative element */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
        <span>buffering...</span>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="mb-6 p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/80 shadow-xs border border-slate-100 dark:border-slate-800">
          <ZoodiLogo size="xl" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
          Style for Every You
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-3 leading-relaxed">
          Discover fashion, lifestyle and more all in one place.
        </p>

        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-yellow-400 via-orange-500 to-pink-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => navigate('login')}
          className="w-full py-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
};
