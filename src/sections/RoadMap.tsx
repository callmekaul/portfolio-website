'use client'

import { useState } from 'react'
import { milestones } from '@/data/milestones'
import { learningItems } from '@/data/learnings'
import { AnimatePresence, motion } from 'framer-motion'

export const RoadMapSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [view, setView] = useState<'milestone' | 'learning'>('milestone')

  // Helper to get a unique key for each item
  const getKey = (item: any) => item.title + item.year

  return (
    <section
      id='journey'
      className='flex flex-col w-full min-w-0 justify-center items-center px-2 py-12 snap-start'
    >
      <div className='w-full max-w-4xl mx-auto'>
        <h2 className='heading mb-10 text-center'>Journey</h2>
        {/* Toggle for mobile/tablet */}
        <div className='md:hidden flex justify-center mb-6 gap-2'>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition ${
              view === 'milestone'
                ? 'bg-blue-500 text-white shadow'
                : 'bg-zinc-800 text-blue-300 hover:bg-blue-900/40'
            }`}
            onClick={() => setView('milestone')}
          >
            Milestones
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition ${
              view === 'learning'
                ? 'bg-green-500 text-white shadow'
                : 'bg-zinc-800 text-green-300 hover:bg-green-900/40'
            }`}
            onClick={() => setView('learning')}
          >
            Learning
          </button>
        </div>
        {/* Desktop: two columns, Mobile: one column */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Learning List */}
          <div
            className={`flex-1 ${view === 'learning' ? '' : 'hidden'} md:block`}
          >
            <h3 className='text-xl font-bold mb-4 text-green-400 text-center md:text-center'>
              Learning
            </h3>
            <ul className='flex flex-col gap-6'>
              {learningItems
                .sort((a, b) => a.year - b.year)
                .map((item, idx) => {
                  const isExpanded = expanded === getKey(item)
                  const Icon = item.icon
                  return (
                    <li
                      key={getKey(item)}
                      className={`bg-zinc-800/60 rounded-lg p-4 flex items-start gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg ${
                        isExpanded ? 'ring-2 ring-green-400' : ''
                      }`}
                      onMouseEnter={() => setExpanded(getKey(item))}
                      onMouseLeave={() => setExpanded(null)}
                      onClick={() =>
                        setExpanded(isExpanded ? null : getKey(item))
                      }
                    >
                      <span className='mt-1'>{Icon && <Icon />}</span>
                      <div className='w-full'>
                        <div className='flex items-center gap-2 mb-1'>
                          <span className='font-semibold text-white'>
                            {item.title}
                          </span>
                          <span className='text-xs text-zinc-400'>
                            {item.year}
                          </span>
                          <span
                            className={`ml-2 text-xs px-2 py-0.5 rounded-full border ${
                              item.status === 'complete'
                                ? 'bg-green-900/60 border-green-400 text-green-300'
                                : item.status === 'in-progress'
                                ? 'bg-yellow-900/60 border-yellow-400 text-yellow-300'
                                : 'bg-blue-900/60 border-blue-400 text-blue-300'
                            }`}
                          >
                            {item.status === 'complete'
                              ? 'Complete'
                              : item.status === 'in-progress'
                              ? 'In Progress'
                              : 'Planned'}
                          </span>
                        </div>
                        <div className='text-white/80'>{item.description}</div>
                        {/* Expanded details with animation */}
                        <AnimatePresence>
                          {isExpanded && item.expandedDetails && (
                            <motion.div
                              key='expanded'
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className='overflow-hidden mt-3 text-green-300/90 text-sm'
                            >
                              {item.expandedDetails}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
          {/* Milestones List */}
          <div
            className={`flex-1 ${
              view === 'milestone' ? '' : 'hidden'
            } md:block`}
          >
            <h3 className='text-xl font-bold mb-4 text-blue-400 text-center md:text-center'>
              Milestones
            </h3>
            <ul className='flex flex-col gap-6'>
              {milestones
                .sort((a, b) => a.year - b.year)
                .map((item, idx) => {
                  const isExpanded = expanded === getKey(item)
                  const Icon = item.icon
                  return (
                    <li
                      key={getKey(item)}
                      className={`bg-zinc-800/60 rounded-lg p-4 flex items-start gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg ${
                        isExpanded ? 'ring-2 ring-blue-400' : ''
                      }`}
                      onMouseEnter={() => setExpanded(getKey(item))}
                      onMouseLeave={() => setExpanded(null)}
                      onClick={() =>
                        setExpanded(isExpanded ? null : getKey(item))
                      }
                    >
                      <span className='mt-1'>{Icon && <Icon />}</span>
                      <div className='w-full'>
                        <div className='flex items-center gap-2 mb-1'>
                          <span className='font-semibold text-white'>
                            {item.title}
                          </span>
                          <span className='text-xs text-zinc-400'>
                            {item.year}
                          </span>
                        </div>
                        <div className='text-white/80'>{item.description}</div>
                        {/* Expanded details with animation */}
                        <AnimatePresence>
                          {isExpanded && item.expandedDetails && (
                            <motion.div
                              key='expanded'
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className='overflow-hidden mt-3 text-blue-300/90 text-sm'
                            >
                              {item.expandedDetails}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
