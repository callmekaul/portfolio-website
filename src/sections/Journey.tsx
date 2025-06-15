'use client'

import { useState } from 'react'
import { milestones } from '@/data/work'
import { learningItems } from '@/data/education'
import { AnimatePresence, motion } from 'framer-motion'

export const JourneySection = () => {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [view, setView] = useState<'milestone' | 'learning'>('milestone')
  const getKey = (item: any) => item.title + item.year

  return (
    <section
      id="journey"
      className="flex flex-col w-full min-w-0 justify-center items-center px-2 py-12 snap-start"
    >
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="heading mb-10 text-center">Journey</h2>
        {/* Toggle for mobile/tablet */}
        <div className="md:hidden flex justify-center mb-6 gap-2">
          <button
            className={`btn ${view === 'milestone' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('milestone')}
          >
            Roles
          </button>
          <button
            className={`btn ${view === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('learning')}
          >
            Learning
          </button>
        </div>
        {/* Desktop: two columns, Mobile: one column */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Learning List */}
          <div className={`flex-1 ${view === 'learning' ? '' : 'hidden'} md:block`}>
            <h3 className="subheading text-[var(--color-secondary)]">Learning</h3>
            <ul className="flex flex-col gap-6">
              {learningItems
                .sort((a, b) => b.year - a.year)
                .map((item) => {
                  const isExpanded = expanded === getKey(item)
                  const Icon = item.icon
                  return (
                    <li
                      key={getKey(item)}
                      className={`glass-card p-4 flex items-start gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg ${
                        isExpanded ? 'ring-2 ring-[var(--color-primary)]' : ''
                      }`}
                      onMouseEnter={() => setExpanded(getKey(item))}
                      onMouseLeave={() => setExpanded(null)}
                      onClick={() => setExpanded(isExpanded ? null : getKey(item))}
                    >
                      <span className="mt-1">{Icon && <Icon />}</span>
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{item.title}</span>
                          <span className="text-xs text-muted">{item.year}</span>
                        </div>
                        <div className="text-body">{item.description}</div>
                        <AnimatePresence>
                          {isExpanded && item.expandedDetails && (
                            <motion.div
                              key="expanded"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden mt-3 text-[var(--color-primary)]/90 text-sm"
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
          <div className={`flex-1 ${view === 'milestone' ? '' : 'hidden'} md:block`}>
            <h3 className="subheading text-[var(--color-primary)]">Roles</h3>
            <ul className="flex flex-col gap-6">
              {milestones
                .sort((a, b) => b.year - a.year)
                .map((item) => {
                  const isExpanded = expanded === getKey(item)
                  const Icon = item.icon
                  return (
                    <li
                      key={getKey(item)}
                      className={`glass-card p-4 flex items-start gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg ${
                        isExpanded ? 'ring-2 ring-[var(--color-secondary)]' : ''
                      }`}
                      onMouseEnter={() => setExpanded(getKey(item))}
                      onMouseLeave={() => setExpanded(null)}
                      onClick={() => setExpanded(isExpanded ? null : getKey(item))}
                    >
                      <span className="mt-1">{Icon && <Icon />}</span>
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{item.title}</span>
                          <span className="text-xs text-muted">{item.year}</span>
                        </div>
                        <div className="text-body">{item.description}</div>
                        <AnimatePresence>
                          {isExpanded && item.expandedDetails && (
                            <motion.div
                              key="expanded"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden mt-3 text-[var(--color-secondary)]/90 text-sm"
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
