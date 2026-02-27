'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);

  const openWindows = WINDOW_IDS.filter((id) => windows[id].isOpen);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[9999] flex h-12 items-center border-t border-white/[0.06] bg-white/[0.03] px-4 backdrop-blur-xl">
      {/* Left: open window tabs */}
      <div className="flex items-center gap-1">
        <AnimatePresence mode="popLayout">
          {openWindows.map((id) => {
            const meta = WINDOW_META[id];
            const isMinimized = windows[id].isMinimized;

            return (
              <motion.button
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isMinimized
                    ? 'text-white/30 hover:bg-white/[0.04]'
                    : 'bg-cyan-400/[0.06] text-cyan-300/60 hover:bg-cyan-400/[0.1]'
                }`}
                onClick={() => {
                  if (isMinimized) {
                    restoreWindow(id);
                  } else {
                    focusWindow(id);
                  }
                }}
              >
                <span className="text-sm">{meta.icon}</span>
                <span className="hidden whitespace-nowrap sm:inline">{meta.title}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Right: clock */}
      <div className="ml-auto text-xs text-white/25">
        <Clock />
      </div>
    </div>
  );
}
