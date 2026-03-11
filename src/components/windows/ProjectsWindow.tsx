'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { Project, ProjectCategory } from '@/types';
import Tag from '../ui/Tag';
import BentoImageGrid from '../ui/BentoImageGrid';
import ImageLightbox from '../ui/ImageLightbox';

const CATEGORIES: ProjectCategory[] = ['Agentic AI and LLM Systems', 'Machine Learning'];
const projectsByCategory = CATEGORIES.map((cat) => ({
  category: cat,
  items: projects.filter((p) => p.category === cat),
}));

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: expanded ? 90 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <path d="M6 3L11 8L6 13" />
    </motion.svg>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        className="mb-4 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-accent/60 transition-colors hover:bg-accent/15 hover:text-accent"
      >
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 1L3 6L8 11" />
        </svg>
        Back to Projects
      </button>

      {project.images && project.images.length > 0 && (
        <div className="mb-5">
          <BentoImageGrid
            images={project.images}
            alt={project.title}
            onImageClick={(i) => setLightboxIndex(i)}
          />
        </div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && project.images && (
          <ImageLightbox
            images={project.images}
            alt={project.title}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      <h2 className="text-xl font-semibold text-text/90">{project.title}</h2>
      <p className="mt-1 text-base text-text/50">{project.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        <Section title="Challenge" items={project.challenge} />
        <Section title="Solution" items={project.solution} />
        <Section title="Impact" items={project.impact} />
      </div>

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-6 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-accent/30 bg-accent/15 px-5 py-2.5 text-sm text-accent transition-colors hover:bg-accent/25"
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-secondary/30 bg-secondary/15 px-5 py-2.5 text-sm text-secondary transition-colors hover:bg-secondary/25"
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-wider text-accent/60">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-base leading-relaxed text-text/70">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectsWindow() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) =>
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));

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
          className="space-y-5"
        >
          {projectsByCategory.map(({ category, items }) => {
            const isCollapsed = !!collapsed[category];
            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="mb-3 flex w-full items-center gap-2.5 text-left transition-colors hover:text-accent/90"
                >
                  <ChevronIcon expanded={!isCollapsed} />
                  <span className="text-base font-semibold text-text/70">
                    {category}
                  </span>
                  <span className="text-xs text-text/40">
                    {items.length}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {items.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelected(p)}
                            className="group rounded-xl border border-surface/50 bg-surface/20 p-5 text-left transition-colors hover:border-accent/30 hover:bg-accent/10"
                          >
                            <h3 className="text-base font-medium text-text/80 group-hover:text-accent">
                              {p.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-text/50">
                              {p.tagline}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {p.tools.slice(0, 3).map((tool) => (
                                <span key={tool} className="text-xs text-secondary/50">
                                  {tool}
                                </span>
                              ))}
                              {p.tools.length > 3 && (
                                <span className="text-xs text-text/35">
                                  +{p.tools.length - 3}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
