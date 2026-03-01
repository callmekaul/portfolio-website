'use client';

import { motion } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

export default function MobileDock() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 pb-5">
      <div className="grid grid-cols-4 gap-3 rounded-2xl border border-surface/[0.12] bg-panel/80 backdrop-blur-md p-3">
        {WINDOW_IDS.map((id) => {
          const meta = WINDOW_META[id];
          return (
            <motion.button
              key={id}
              className="flex flex-col items-center gap-1"
              onClick={() => openWindow(id)}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-surface/[0.08] bg-surface/[0.04] text-lg">
                {meta.icon}
              </div>
              <span className="text-[10px] font-medium text-text/35">{meta.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
