'use client';

import { about } from '@/data/about';
import GlassCard from '../ui/GlassCard';

function getAge(birthdate: string) {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function yearsSince(year: number) {
  return new Date().getFullYear() - year;
}

export default function AboutWindow() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text/90">{about.name}</h2>
        <p className="mt-1 text-base text-secondary/50">{getAge(about.birthdate)} · {about.title}</p>
      </div>

      <p className="text-base leading-relaxed text-text/60">{about.bio}</p>

      <div className="flex flex-wrap gap-2.5">
        {[
          { text: `${yearsSince(2022)}+ Years of Global Enterprise Experience`, border: 'border-accent/10', bg: 'bg-accent/[0.05]', color: 'text-accent/50' },
          { text: `${yearsSince(2020)}+ Years of Working with AI`, border: 'border-secondary/10', bg: 'bg-secondary/[0.05]', color: 'text-secondary/50' },
          { text: `${yearsSince(2018)}+ Years Writing Clean Code`, border: 'border-emerald-400/10', bg: 'bg-emerald-400/[0.05]', color: 'text-emerald-400/50' },
        ].map((tag) => (
          <span
            key={tag.text}
            className={`rounded-lg border ${tag.border} ${tag.bg} px-3 py-1.5 text-xs ${tag.color}`}
          >
            {tag.text}
          </span>
        ))}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent/40">Education</p>
        <div className="space-y-3">
          {about.education.map((edu) => (
            <GlassCard key={edu.institution}>
              <p className="text-sm font-medium text-text/80">{edu.institution}</p>
              <p className="mt-0.5 text-sm text-text/50">{edu.degree}</p>
              <p className="mt-1 text-xs text-text/30">{edu.location} · {edu.period}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent/40">Hobbies</p>
        <div className="flex flex-wrap gap-2.5">
          {about.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-lg border border-secondary/10 bg-secondary/[0.05] px-3.5 py-2 text-sm text-secondary/50"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
