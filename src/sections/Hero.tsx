'use client'

import Link from 'next/link'

export const HeroSection = () => (
  <section
    id='hero'
    className='flex flex-col min-h-screen w-full justify-center items-center px-4 py-12 snap-start'
  >
    <div className='flex flex-1 w-full max-w-6xl'>
      {/* Left Half: Name, Subtitle, Description */}
      <div className='flex flex-col justify-start items-start w-1/2 px-6 py-8'>
        <h1 className='heading'>Aditya Kaul</h1>
        <h2 className='subheading'>FullStack + AI Developer</h2>
        <p className='text-body max-w-md'>
          I build modern web experiences and technical solutions. Passionate
          about code, design, and sharing knowledge.
        </p>
      </div>
      {/* Right Half: Contact Me Button */}
      <div className='flex flex-col items-end justify-end w-1/2 px-6 py-8 h-full'>
        <Link
          href='/contact'
          className='btn btn-primary text-lg font-semibold shadow-lg'
        >
          Contact Me
        </Link>
      </div>
    </div>
  </section>
)
