'use client';

import { about } from '@/data/about';
import GlassCard from '../ui/GlassCard';

export default function AboutWindow() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white/90">{about.name}</h2>
        <p className="mt-1 text-base text-purple-400/50">{about.title}</p>
      </div>

      <p className="text-base leading-relaxed text-white/60">{about.bio}</p>

      <GlassCard>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400/40">Mission</p>
        <p className="mt-2 text-base leading-relaxed text-white/60">{about.mission}</p>
      </GlassCard>

      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-cyan-400/40">Hobbies</p>
        <div className="flex flex-wrap gap-2.5">
          {about.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-lg border border-purple-400/10 bg-purple-400/[0.05] px-3.5 py-2 text-sm text-purple-300/50"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
