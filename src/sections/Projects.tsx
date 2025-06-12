'use client'

import React, { useState } from 'react'
import { ProjectCard, Project } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { portfolioProjects } from '@/data/projects'

export const ProjectsSection = () => {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id='projects' className='section snap-start bg-transparent'>
      <div className='section-inner flex flex-col items-center'>
        <h2 className='heading mb-10 w-full px-2 sm:px-8 md:px-16 lg:px-32 xl:px-48 text-left'>
          Projects
        </h2>
        <div className='w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
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
