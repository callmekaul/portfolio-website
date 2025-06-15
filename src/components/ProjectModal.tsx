'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Project } from '@/data/projects'

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [current, setCurrent] = useState(0)
  const total = project.images.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key='modal'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto'
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='min-h-screen w-full flex flex-col text-white px-4 sm:px-8 pt-6 pb-20'
        >
          <button
            onClick={onClose}
            className='fixed top-4 right-4 text-3xl text-zinc-400 hover:text-pink-400'
            aria-label="Close modal"
          >
            &times;
          </button>

          <div className='w-full max-w-5xl mx-auto flex flex-col gap-8'>
            {/* Slideshow */}
            <div className='relative w-full aspect-video max-h-[28rem] flex items-center justify-center bg-zinc-900 rounded-xl overflow-hidden'>
              <Image
                src={project.images[current]}
                alt={project.title}
                fill
                className='object-contain'
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10'
                    aria-label="Previous image"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={next}
                    className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10'
                    aria-label="Next image"
                  >
                    &#8594;
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.images.map((_, i) => (
                      <span
                        key={i}
                        className={`inline-block w-2 h-2 rounded-full ${i === current ? 'bg-pink-400' : 'bg-zinc-500/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className='flex flex-col gap-4'>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className='text-3xl font-bold'>{project.title}</h3>
                <span className="text-base text-zinc-400 font-mono">{project.year}</span>
              </div>
              <p className='text-zinc-300'>{project.summary}</p>

              {/* Skills */}
              <div className='flex flex-wrap gap-2 mt-2'>
                {project.skills.map((s, i) => (
                  <span
                    key={i}
                    className='bg-zinc-800 px-3 py-1 rounded-md text-sm'
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className='font-semibold mt-4 mb-1'>Highlights</h4>
                  <ul className='list-disc list-inside text-sm text-zinc-300 space-y-1'>
                    {project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-6 inline-block bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-full font-semibold text-white'
              >
                View Project
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
