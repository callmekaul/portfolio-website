'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { WindowId } from '@/types';

interface MobileSheetProps {
  id: WindowId;
  title: string;
  icon: string;
  children: ReactNode;
}

export default function MobileSheet({ id, title, icon, children }: MobileSheetProps) {
  const closeWindow = useWindowStore((s) => s.closeWindow);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0f]/95 backdrop-blur-xl"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    >
      <header className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="text-base font-medium text-white/80">{title}</span>
        </div>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/70"
          onClick={() => closeWindow(id)}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </header>
      <div className="window-scroll flex-1 overflow-y-auto p-5">
        {children}
      </div>
    </motion.div>
  );
}
