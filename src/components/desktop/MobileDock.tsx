'use client';

import { motion } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

export default function MobileDock() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-surface/[0.12] bg-panel p-4">
        {WINDOW_IDS.map((id) => {
          const meta = WINDOW_META[id];
          return (
            <motion.button
              key={id}
              className="flex flex-col items-center gap-1.5"
              onClick={() => openWindow(id)}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-surface/[0.08] bg-surface/[0.04] text-2xl">
                {meta.icon}
              </div>
              <span className="text-xs font-medium text-text/40">{meta.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
