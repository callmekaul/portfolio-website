'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { about } from '@/data/about';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS } from '@/lib/constants';

export default function DesktopGreeting() {
  const windows = useWindowStore((s) => s.windows);
  const hasOpenWindows = WINDOW_IDS.some((id) => windows[id].isOpen);

  return (
    <AnimatePresence>
      {!hasOpenWindows && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pl-16 pr-8 md:pl-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <p className="text-base font-medium uppercase tracking-widest text-cyan-400/30">
                Welcome
              </p>
            </motion.div>

            <motion.h1
              className="mt-4 text-6xl font-bold tracking-tight text-white/85 md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            >
              {about.name}
            </motion.h1>

            <motion.p
              className="mt-3 text-2xl text-purple-400/40 md:text-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            >
              {about.title}
            </motion.p>

            <motion.p
              className="mt-8 max-w-md text-base leading-relaxed text-white/20"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            >
              {about.bio}
            </motion.p>

            <motion.p
              className="mt-10 text-sm text-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Click an icon to get started →
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
