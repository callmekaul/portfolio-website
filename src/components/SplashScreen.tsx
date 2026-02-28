'use client';

import { motion } from 'framer-motion';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-sm font-medium uppercase tracking-[0.3em] text-accent/30"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Portfolio
      </motion.p>

      <motion.h1
        className="mt-4 text-5xl font-bold tracking-tight text-text/90 md:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        Aditya Kaul
      </motion.h1>

      <motion.p
        className="mt-3 text-lg text-secondary/40"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Software Developer
      </motion.p>

      <motion.button
        className="mt-12 rounded-xl border border-accent/20 bg-accent/[0.06] px-8 py-3 text-sm font-medium text-accent/80 transition-colors hover:border-accent/40 hover:bg-accent/[0.12]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={onEnter}
      >
        Enter Website
      </motion.button>
    </motion.div>
  );
}
