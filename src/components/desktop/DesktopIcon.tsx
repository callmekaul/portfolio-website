'use client';

import { motion } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { WindowId } from '@/types';

interface DesktopIconProps {
  id: WindowId;
  icon: string;
  label: string;
}

export default function DesktopIcon({ id, icon, label }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <motion.button
      className="flex flex-col items-center gap-2 rounded-xl px-2 py-1.5 outline-none"
      onClick={() => openWindow(id)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-surface/50 bg-surface/30 text-3xl transition-colors hover:border-accent/40 hover:bg-accent/15">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-text/60">{label}</span>
    </motion.button>
  );
}
