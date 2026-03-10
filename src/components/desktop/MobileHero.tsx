'use client';

import { motion } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { about } from '@/data/about';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

function yearsSince(year: number) {
  return new Date().getFullYear() - year;
}

const tags = [
  { text: () => `${yearsSince(2022)}+ Years Global Enterprise Experience`, border: 'border-accent/25', bg: 'bg-accent/10', color: 'text-accent/70' },
  { text: () => `${yearsSince(2020)}+ Years Working with AI`, border: 'border-secondary/25', bg: 'bg-secondary/10', color: 'text-secondary/70' },
  { text: () => `${yearsSince(2018)}+ Years Writing Clean Code`, border: 'border-emerald-400/25', bg: 'bg-emerald-400/10', color: 'text-emerald-400/70' },
];

export default function MobileHero() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center px-8 pb-56">
      <motion.h1
        className="text-center text-4xl font-bold tracking-tight text-text/90"
        {...fadeUp(0.1)}
      >
        {about.name}
      </motion.h1>

      <motion.p
        className="mt-1.5 text-sm font-medium uppercase tracking-widest text-accent/50"
        {...fadeUp(0.15)}
      >
        Problem Solver
      </motion.p>

      <motion.div className="mt-5 flex flex-wrap justify-center gap-2" {...fadeUp(0.25)}>
        {tags.map((tag) => (
          <span
            key={tag.text()}
            className={`rounded-lg border ${tag.border} ${tag.bg} px-2.5 py-1 text-xs ${tag.color}`}
          >
            {tag.text()}
          </span>
        ))}
      </motion.div>

      <motion.button
        onClick={() => openWindow('contact')}
        className="mt-7 rounded-lg border border-accent/30 bg-accent/15 px-10 py-3.5 text-base font-medium text-accent transition-colors active:bg-accent/25"
        whileTap={{ scale: 0.97 }}
        {...fadeUp(0.35)}
      >
        Contact Me
      </motion.button>
    </div>
  );
}
