'use client'

import Link from 'next/link'

export const Header = () => {
  return (
    <header className='w-full flex justify-center items-center bg-transparent'>
      <nav
        className='
          flex flex-wrap justify-center items-center gap-2 px-2 py-2
          border border-white/15
          bg-zinc-900/60 backdrop-blur-sm bg-clip-padding
          w-full mx-0
        '
        style={{
          background: 'rgba(24, 24, 27, 0.45)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'none',
        }}
      >
        <a
          href='#skills'
          className='nav-item px-3 py-2 font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base'
        >
          Skills
        </a>
        <a
          href='#roadmap'
          className='nav-item px-3 py-2 font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base'
        >
          Roadmap
        </a>
        <a
          href='#projects'
          className='nav-item px-3 py-2 font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base'
        >
          Projects
        </a>
        <a
          href='#contact'
          className='nav-item px-3 py-2 font-medium text-pink-400 hover:text-pink-300 transition text-sm sm:text-base'
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
