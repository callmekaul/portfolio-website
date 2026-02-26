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
  'border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300/60',
  'border-purple-400/10 bg-purple-400/[0.05] text-purple-300/60',
  'border-blue-400/10 bg-blue-400/[0.05] text-blue-300/60',
];

const labelColors = [
  'text-cyan-400/40',
  'text-purple-400/40',
  'text-blue-400/40',
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
                className={`rounded-lg border px-4 py-2 text-sm ${categoryColors[i % categoryColors.length]}`}
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
