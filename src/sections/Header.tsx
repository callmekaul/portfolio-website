'use client'

import Link from 'next/link'

export const Header = () => {
  return (
    <header className='w-full flex justify-center items-center py-3 bg-transparent'>
      <nav className='flex gap-1 px-2 py-1 border border-white/15 rounded-full bg-zinc-900/70 backdrop-blur shadow-md'>
        <a
          href='#hero'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition'
        >
          Home
        </a>
        <a
          href='#skills'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition'
        >
          Skills
        </a>
        <a
          href='#roadmap'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition'
        >
          Roadmap
        </a>
        <a
          href='#projects'
          className='nav-item px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition'
        >
          Projects
        </a>
        <a
          href='#contact'
          className='nav-item px-5 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow transition'
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
