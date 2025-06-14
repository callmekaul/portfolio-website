'use client'

import { motion } from 'framer-motion'

export interface MilestoneProps {
  year: number
  title: string
  description: string
  icon?: React.ReactNode
}

export const Milestone: React.FC<MilestoneProps> = ({
  year,
  title,
  description,
  icon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
    viewport={{ once: true, amount: 0.6 }}
    className='relative flex items-start group'
  >
    {/* Content */}
    <div className='flex-1 pb-10'>
      <div className='flex items-center gap-2 mb-1'>
        <span className='text-sm font-bold text-blue-400'>{year}</span>
        <span className='font-semibold text-lg text-white'>{title}</span>
      </div>
      <div className='text-body text-white/80'>{description}</div>
    </div>
  </motion.div>
)
