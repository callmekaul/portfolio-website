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
      className="flex flex-col items-center gap-1.5 outline-none"
      onClick={() => openWindow(id)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-2xl backdrop-blur-md transition-colors hover:border-white/[0.14] hover:bg-white/[0.07]">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-white/50">{label}</span>
    </motion.button>
  );
}
