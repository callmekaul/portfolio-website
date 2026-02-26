'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);

  const openWindows = WINDOW_IDS.filter((id) => windows[id].isOpen);

  if (openWindows.length === 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-3">
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 backdrop-blur-xl">
        <AnimatePresence mode="popLayout">
          {openWindows.map((id) => {
            const meta = WINDOW_META[id];
            const isMinimized = windows[id].isMinimized;

            return (
              <motion.button
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors ${
                  isMinimized
                    ? 'text-white/30 hover:bg-white/[0.04]'
                    : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.08]'
                }`}
                onClick={() => {
                  if (isMinimized) {
                    restoreWindow(id);
                  } else {
                    focusWindow(id);
                  }
                }}
              >
                <span className="text-base">{meta.icon}</span>
                <span className="hidden sm:inline">{meta.title}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
