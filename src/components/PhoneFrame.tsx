import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex justify-center bg-gradient-to-br from-[#bfe8e6] via-[#ceeeed] to-[#c7eae8] dark:bg-slate-900/50 transition-colors">
      <main className="w-full max-w-md min-h-screen bg-gradient-to-b from-[#daf1f0] via-[#e4f5f4] to-[#edf7f7] dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col shadow-2xl border-x border-[#bce4e2] dark:border-slate-800 relative transition-colors">
        {children}
      </main>
    </div>
  );
};
