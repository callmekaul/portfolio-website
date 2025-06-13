'use client'

import Link from 'next/link'

export const Header = () => {
  return (
    <header className="w-full flex justify-center items-center py-3 bg-transparent">
      <nav
        className="
          flex flex-wrap justify-center items-center gap-1 px-2 py-1
          border border-white/15 rounded-full
          bg-zinc-900/60 backdrop-blur-md bg-clip-padding
          max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg w-full mx-2 sm:mx-0
        "
        style={{
          background: 'rgba(24, 24, 27, 0.45)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'none',
        }}
      >
        <a
          href="#skills"
          className="nav-item px-3 py-2 rounded-full font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base"
        >
          Skills
        </a>
        <a
          href="#roadmap"
          className="nav-item px-3 py-2 rounded-full font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base"
        >
          Roadmap
        </a>
        <a
          href="#projects"
          className="nav-item px-3 py-2 rounded-full font-medium text-white/90 hover:bg-blue-600/20 hover:text-blue-300 transition text-sm sm:text-base"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="nav-item px-3 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-400/70 via-pink-400/60 to-fuchsia-600/80 border border-pink-200/30 hover:brightness-110 hover:shadow-pink-400/30 transition backdrop-blur-md text-sm sm:text-base"
          style={{
            border: '1.5px solid rgba(244,114,182,0.25)',
            backgroundBlendMode: 'screen, lighten',
            boxShadow: 'none',
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
