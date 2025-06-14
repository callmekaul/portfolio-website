'use client'

import { motion } from 'framer-motion'
import { FaCheckCircle, FaHourglassHalf, FaRegCircle } from 'react-icons/fa'

export interface LearningItem {
  title: string
  description: string
  status: 'planned' | 'in-progress' | 'complete'
  year?: number
}

export const Learning: React.FC<{ items: LearningItem[] }> = ({ items }) => (
  <div className='relative pl-4 sm:pl-8 h-full overflow-y-auto scrollbar-hide'>
    {/* Vertical timeline line */}
    <div className='absolute left-2 sm:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400/40 via-blue-400/20 to-transparent rounded-full pointer-events-none' />
    <div className='flex flex-col gap-2'>
      {items.map((item, i) => (
        <motion.div
          key={item.title + i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 80,
            delay: i * 0.07,
          }}
          viewport={{ once: true, amount: 0.6 }}
          className='relative flex items-start group'
        >
          {/* Content */}
          <div className='flex-1 pb-10'>
            <div className='flex items-center gap-2 mb-1'>
              {item.year && (
                <span className='text-xs font-bold text-blue-400'>
                  {item.year}
                </span>
              )}
              <span className='font-semibold text-base text-white'>
                {item.title}
              </span>
            </div>
            <div className='text-body text-white/80'>{item.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)
