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
      className='cursor-pointer rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 shadow-xl border border-white/10 transition-transform w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto flex flex-col hover:border-pink-400/20'
    >
      {/* Image */}
      <div className='relative w-full h-48 sm:h-52 md:h-56 lg:h-48'>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 320px'
          priority
        />
      </div>

      {/* Content */}
      <div className='px-4 py-3 flex flex-col gap-2'>
        <h3 className='min-h-20 text-white font-semibold text-base sm:text-lg md:text-xl'>
          {project.title}
        </h3>

        <div className='flex flex-wrap gap-2 text-xs sm:text-sm text-zinc-300'>
          {project.tools.map((tool, index) => (
            <span
              key={index}
              className='bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md whitespace-nowrap'
            >
              {tool.title}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
