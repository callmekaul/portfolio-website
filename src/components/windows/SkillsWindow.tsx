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

export default function SkillsWindow() {
  return (
    <div className="space-y-5">
      {skills.map((category) => (
        <div key={category.name}>
          <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-white/30">
            {category.name}
          </p>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {category.items.map((skill) => (
              <motion.span
                key={skill}
                variants={item}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/55"
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
