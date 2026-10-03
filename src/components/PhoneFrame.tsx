import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex justify-center bg-slate-100 dark:bg-slate-900/50 transition-colors">
      <main className="w-full max-w-md min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col shadow-xl border-x border-slate-200/80 dark:border-slate-800 relative transition-colors">
        {children}
      </main>
    </div>
  );
};
