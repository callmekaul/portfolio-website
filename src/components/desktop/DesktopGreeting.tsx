'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { about } from '@/data/about';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS } from '@/lib/constants';

export default function DesktopGreeting() {
  const windows = useWindowStore((s) => s.windows);
  const hasVisibleWindows = WINDOW_IDS.some((id) => windows[id].isOpen && !windows[id].isMinimized);

  return (
    <AnimatePresence>
      {!hasVisibleWindows && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-start pt-[20vh] md:items-center md:pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pl-8 pr-8 md:pl-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <p className="text-base font-medium uppercase tracking-widest text-accent/30">
                Welcome
              </p>
            </motion.div>

            <motion.h1
              className="mt-4 text-6xl font-bold tracking-tight text-text/85 md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            >
              {about.name}
            </motion.h1>

            <motion.p
              className="mt-3 text-2xl text-secondary/40 md:text-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            >
              {about.title}
            </motion.p>

            <motion.p
              className="mt-8 max-w-md text-base leading-relaxed text-text/20"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            >
              {about.bio}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
