'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { Project } from '@/types';
import Tag from '../ui/Tag';

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/60"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 1L3 6L8 11" />
        </svg>
        Back to Projects
      </button>

      <h2 className="text-lg font-semibold text-white/90">{project.title}</h2>
      <p className="mt-1 text-sm text-white/50">{project.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tools.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <Section title="Challenge" text={project.challenge} />
        <Section title="Solution" text={project.solution} />
        <Section title="Impact" text={project.impact} />
      </div>

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-5 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-white/60 transition-colors hover:bg-white/[0.08]"
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-white/60 transition-colors hover:bg-white/[0.08]"
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-white/30">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{text}</p>
    </div>
  );
}

export default function ProjectsWindow() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <ProjectDetail
          key="detail"
          project={selected}
          onBack={() => setSelected(null)}
        />
      ) : (
        <motion.div
          key="grid"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-colors hover:border-white/[0.1] hover:bg-white/[0.04]"
            >
              <h3 className="text-sm font-medium text-white/70 group-hover:text-white/85">
                {p.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/35">
                {p.tagline}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className="text-[10px] text-white/25">
                    {tool}
                  </span>
                ))}
                {p.tools.length > 3 && (
                  <span className="text-[10px] text-white/20">
                    +{p.tools.length - 3}
                  </span>
                )}
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
