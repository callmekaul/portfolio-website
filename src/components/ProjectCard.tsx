'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className='cursor-pointer rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 shadow-xl border border-white/10 transition-transform w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto flex flex-col hover:border-pink-400/20
        min-h-[420px] sm:min-h-[440px] md:min-h-[460px]'
    >
      {/* Image */}
      <div className='relative w-full h-48 sm:h-52 md:h-56 lg:h-48 p-3'>
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className='object-cover rounded-xl'
          sizes='(max-width: 768px) 100vw, 320px'
          priority
        />
      </div>

      {/* Content */}
      <div className='px-4 py-3 flex flex-col flex-1 relative min-h-[180px]'>
        {/* Year at top right, fixed */}
        <span className="absolute top-4 right-4 text-xs text-zinc-400 font-mono pointer-events-none select-none">
          {project.year}
        </span>
        {/* Title and description */}
        <div className="pr-12"> {/* Add right padding to avoid overlap with year */}
          <h3 className='text-white font-semibold text-base sm:text-lg md:text-xl'>
            {project.title}
          </h3>
          <p className='text-zinc-300 text-xs sm:text-sm line-clamp-3'>
            {project.description}
          </p>
        </div>
        <div className='flex-1' />
        {/* Skills at bottom */}
        <div className='flex flex-wrap gap-2 text-xs sm:text-sm text-zinc-300 mt-2'>
          {project.skills.map((tool, index) => (
            <span
              key={index}
              className='bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md whitespace-nowrap'
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
