'use client'

import { useEffect, useState } from 'react'

export const Header = () => {
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowName(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="w-full flex justify-center items-center py-2 sm:py-3 bg-transparent">
      <nav
        className={`flex gap-1 px-2 py-1 border border-white/15 rounded-full bg-zinc-900/70 backdrop-blur shadow-md items-center transition-all duration-400 max-w-full`}
        style={{
          paddingLeft: showName ? '2.5rem' : '0.75rem',
          transition:
            'padding-left 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: showName
            ? '0 4px 32px 0 rgba(37,99,235,0.12), 0 0px 0px 0 rgba(0,0,0,0.0)'
            : '0 2px 16px 0 rgba(0,0,0,0.10)',
        }}
      >
        {showName && (
          <a
            href="#hero"
            className="font-bold tracking-widest text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-600/80 transition mr-2 origin-left whitespace-nowrap text-base sm:text-lg"
            style={{ letterSpacing: '0.15em' }}
          >
            <span
              className="inline-block"
              style={{
                animation: 'grow-in 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              KAUL
            </span>
          </a>
        )}
        <a
          href="#skills"
          className="nav-item px-4 sm:px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition text-base sm:text-lg"
        >
          Skills
        </a>
        <a
          href="#roadmap"
          className="nav-item px-4 sm:px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition text-base sm:text-lg"
        >
          Roadmap
        </a>
        <a
          href="#projects"
          className="nav-item px-4 sm:px-5 py-2 rounded-full font-medium text-white hover:bg-blue-600/80 hover:text-white transition text-base sm:text-lg"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="nav-item px-4 sm:px-5 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow transition text-base sm:text-lg"
        >
          Contact
        </a>
      </nav>
      <style jsx global>{`
        @keyframes grow-in {
          0% {
            transform: scaleX(0.7) scaleY(0.7);
            opacity: 0;
          }
          70% {
            transform: scaleX(1.1) scaleY(1.1);
            opacity: 1;
          }
          100% {
            transform: scaleX(1) scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </header>
  )
}
