'use client';

import { motion } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

export default function MobileDock() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-xl">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-xl">
                {meta.icon}
              </div>
              <span className="text-[10px] font-medium text-white/40">{meta.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
