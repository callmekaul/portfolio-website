'use client'

import { motion } from 'framer-motion'

export default function Transition({
  children,
  routeKey,
}: {
  children: React.ReactNode
  routeKey: string
}) {
  return (
    <motion.div
      key={routeKey}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  )
}
