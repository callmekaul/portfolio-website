'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import type { Project } from '@/data/projects'

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    // Lock background scroll and hide scrollbar
    const originalStyle = window.getComputedStyle(document.body).overflow
    const originalPaddingRight = window.getComputedStyle(
      document.body
    ).paddingRight

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key='modal'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto scrollbar-hide'
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='min-h-screen w-full flex flex-col text-white px-4 sm:px-8 pt-6 pb-20'
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className='fixed top-4 right-4 z-50 text-zinc-400 hover:text-pink-400 text-3xl font-bold'
            aria-label='Close'
          >
            &times;
          </button>

          {/* Content */}
          <div className='w-full max-w-5xl mx-auto flex flex-col gap-8'>
            {/* Image */}
            <div className='relative w-full h-64 sm:h-80 md:h-[28rem] rounded-xl overflow-hidden'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className='object-cover'
                sizes='100vw'
                priority
              />
            </div>

            {/* Text */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-3xl font-bold'>{project.title}</h3>
              <p className='text-sm text-pink-400'>
                {project.company} &middot; {project.year}
              </p>
              <p className='text-zinc-300'>{project.description}</p>

              <div>
                <h4 className='text-sm font-semibold uppercase tracking-wide mb-2 text-white'>
                  Tools Used
                </h4>
                <div className='flex flex-wrap gap-2 text-sm'>
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className='bg-zinc-800 border border-white/10 px-3 py-1 rounded-md text-zinc-300'
                    >
                      {tool.title}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className='text-sm font-semibold uppercase tracking-wide mb-2 text-white'>
                  Highlights
                </h4>
                <ul className='list-disc list-inside text-zinc-300 text-sm space-y-1'>
                  {project.results.map((r, i) => (
                    <li key={i}>{r.title}</li>
                  ))}
                </ul>
              </div>

              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-6 inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition text-white font-semibold py-3 px-6 rounded-xl text-center w-full sm:w-fit'
              >
                View Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
