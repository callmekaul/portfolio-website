'use client'

import Link from 'next/link'

export const Header = () => {
  return (
    <header className='w-full flex justify-center items-center py-3 bg-transparent'>
      <nav
        className='flex gap-1 px-2 py-1 border border-white/15 rounded-full bg-zinc-900/60 backdrop-blur-md shadow-lg bg-clip-padding'
        style={{
          background: 'rgba(24, 24, 27, 0.45)', // more transparent glassy dark
          boxShadow:
            '0 4px 32px 0 rgba(236,72,153,0.10), 0 2px 8px 0 rgba(0,0,0,0.10)', // subtle pink shadow
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <a
          href='#skills'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/20 hover:text-blue-300 transition'
        >
          Skills
        </a>
        <a
          href='#roadmap'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/20 hover:text-blue-300 transition'
        >
          Roadmap
        </a>
        <a
          href='#projects'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/20 hover:text-blue-300 transition'
        >
          Projects
        </a>
        <a
          href='#contact'
          className='nav-item px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-400/70 via-pink-400/60 to-fuchsia-600/80 shadow-lg border border-pink-200/30 hover:brightness-110 hover:shadow-pink-400/30 transition backdrop-blur-md'
          style={{
            boxShadow: '0 2px 16px 0 rgba(236,72,153,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)',
            border: '1.5px solid rgba(244,114,182,0.25)',
            backgroundBlendMode: 'screen, lighten',
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
