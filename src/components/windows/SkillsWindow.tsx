'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

const categoryColors = [
  'border-accent/25 bg-accent/10 text-accent/70',
  'border-secondary/25 bg-secondary/10 text-secondary/70',
  'border-accent/20 bg-accent/8 text-accent/60',
];

const labelColors = [
  'text-accent/60',
  'text-secondary/60',
  'text-accent/50',
];

export default function SkillsWindow() {
  return (
    <div className="space-y-6">
      {skills.map((category, i) => (
        <div key={category.name}>
          <p className={`mb-3 text-sm font-medium uppercase tracking-wider ${labelColors[i % labelColors.length]}`}>
            {category.name}
          </p>
          <motion.div
            className="flex flex-wrap gap-2.5"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {category.items.map((skill) => (
              <motion.span
                key={skill}
                variants={item}
                className={`rounded-lg border px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${categoryColors[i % categoryColors.length]}`}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
