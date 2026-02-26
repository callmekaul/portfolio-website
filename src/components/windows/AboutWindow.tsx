'use client';

import { about } from '@/data/about';
import GlassCard from '../ui/GlassCard';

export default function AboutWindow() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white/90">{about.name}</h2>
        <p className="mt-0.5 text-sm text-white/40">{about.title}</p>
      </div>

      <p className="text-sm leading-relaxed text-white/60">{about.bio}</p>

      <GlassCard>
        <p className="text-xs font-medium uppercase tracking-wider text-white/30">Mission</p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{about.mission}</p>
      </GlassCard>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">Hobbies</p>
        <div className="flex flex-wrap gap-2">
          {about.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-white/50"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
