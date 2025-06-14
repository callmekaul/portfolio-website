'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#projects', label: 'Projects' },
]

const contactLinks = [
  {
    href: '#contact',
    label: 'Email',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/callmekaul/',
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/callmekaul',
    label: 'GitHub',
    external: true,
  },
]

export const Header = () => {
  const [showContact, setShowContact] = useState(false)

  // Animation variants for morphing
  const variants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } },
  }

  return (
    <header className='w-full flex justify-center items-center bg-transparent'>
      <nav
        className='
          flex flex-wrap justify-center items-center gap-2 px-2 py-2 sm:py-3 md:py-4
          bg-zinc-900/60 backdrop-blur-sm bg-clip-padding
          w-full mx-0
        '
        style={{
          background: 'rgba(24, 24, 27, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'none',
        }}
      >
        <AnimatePresence mode='wait'>
          {!showContact ? (
            <motion.div
              key='main-nav'
              className='flex flex-wrap justify-center items-center gap-2 w-full'
              initial='initial'
              animate='animate'
              exit='exit'
              variants={variants}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='nav-item px-3 py-2 font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base'
                >
                  {link.label}
                </a>
              ))}
              <button
                type='button'
                className='nav-item px-3 py-2 font-medium text-pink-400 hover:text-pink-300 transition text-sm sm:text-base'
                onClick={() => setShowContact(true)}
                aria-label='Show contact links'
              >
                Links
              </button>
            </motion.div>
          ) : (
            <motion.div
              key='contact-nav'
              className='flex flex-wrap justify-center items-center gap-2 w-full'
              initial='initial'
              animate='animate'
              exit='exit'
              variants={variants}
            >
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className='nav-item px-3 py-2 font-medium text-blue-300 hover:text-blue-400 transition text-sm sm:text-base'
                >
                  {link.label}
                </a>
              ))}
              <button
                type='button'
                className='nav-item px-3 py-2 font-medium text-pink-400 hover:text-pink-300 transition text-sm sm:text-base'
                onClick={() => setShowContact(false)}
                aria-label='Back to main navigation'
              >
                Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
