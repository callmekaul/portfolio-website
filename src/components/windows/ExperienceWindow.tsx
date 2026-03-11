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
              <h3 className="text-sm font-semibold text-text sm:text-base">{exp.role}</h3>
              <p className="text-xs text-secondary sm:text-sm">{exp.company}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-accent sm:text-sm">{exp.period}</p>
              <p className="text-xs text-text sm:text-sm">{exp.location}</p>
            </div>
          </div>

          <ul className="mt-3 space-y-2">
            {exp.bullets.map((bullet, j) => (
              <li key={j} className="flex gap-2.5 text-xs leading-relaxed text-text sm:text-sm">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-3.5 flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
