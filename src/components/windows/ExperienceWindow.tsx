'use client';

import { experiences } from '@/data/experience';
import Tag from '../ui/Tag';
import GlassCard from '../ui/GlassCard';

export default function ExperienceWindow() {
  return (
    <div className="space-y-4">
      {experiences.map((exp, i) => (
        <GlassCard key={i}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white/80">{exp.role}</h3>
              <p className="text-xs text-white/40">{exp.company}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-white/40">{exp.period}</p>
              <p className="text-xs text-white/25">{exp.location}</p>
            </div>
          </div>

          <ul className="mt-3 space-y-1.5">
            {exp.bullets.map((bullet, j) => (
              <li key={j} className="flex gap-2 text-xs leading-relaxed text-white/50">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
