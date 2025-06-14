'use client'

import React, { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { portfolioProjects, Project } from '@/data/projects'

export const ProjectsSection = () => {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id='projects'
      className='flex flex-col w-full min-w-0 justify-center items-center px-0 py-12 snap-start'
    >
      <div className='section-inner flex flex-col items-center'>
        <h2 className='heading mb-10 w-full text-center'>Projects</h2>
        <div className='w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8'>
          {portfolioProjects.map((project, idx) => (
            <div
              key={project.title}
              onClick={() => setActive(idx)}
              className='cursor-pointer'
            >
              <ProjectCard project={project} onOpen={() => setActive(idx)} />
            </div>
          ))}
        </div>
        {active !== null && (
          <ProjectModal
            project={portfolioProjects[active]}
            onClose={() => setActive(null)}
          />
        )}
      </div>
    </section>
  )
}
