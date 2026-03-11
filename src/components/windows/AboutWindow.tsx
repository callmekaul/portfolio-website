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
        <h2 className="text-xl font-semibold text-text sm:text-2xl">{about.name}</h2>
        <p className="mt-1 text-sm text-secondary sm:text-base">{getAge(about.birthdate)} · {about.title}</p>
      </div>

      <p className="text-sm leading-relaxed text-text sm:text-base">{about.bio}</p>

      <div className="flex flex-wrap gap-2.5">
        {[
          { text: `${yearsSince(2022)}+ Years of Global Enterprise Experience`, border: 'border-accent/25', bg: 'bg-accent/10', color: 'text-accent' },
          { text: `${yearsSince(2020)}+ Years of Working with AI`, border: 'border-secondary/25', bg: 'bg-secondary/10', color: 'text-secondary' },
          { text: `${yearsSince(2018)}+ Years Writing Clean Code`, border: 'border-emerald-400/25', bg: 'bg-emerald-400/10', color: 'text-emerald-400' },
        ].map((tag) => (
          <span
            key={tag.text}
            className={`rounded-lg border ${tag.border} ${tag.bg} px-2.5 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-xs ${tag.color}`}
          >
            {tag.text}
          </span>
        ))}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Education</p>
        <div className="space-y-3">
          {about.education.map((edu) => (
            <GlassCard key={edu.institution}>
              <p className="text-xs font-medium text-text sm:text-sm">{edu.institution}</p>
              <p className="mt-0.5 text-xs text-text sm:text-sm">{edu.degree}</p>
              <p className="mt-1 text-[11px] text-text sm:text-xs">{edu.location} · {edu.period}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Hobbies</p>
        <div className="flex flex-wrap gap-2.5">
          {about.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-lg border border-secondary/25 bg-secondary/10 px-3 py-1.5 text-xs text-secondary sm:px-3.5 sm:py-2 sm:text-sm"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
