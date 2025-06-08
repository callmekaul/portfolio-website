'use client'

import Link from 'next/link'

export const HeroSection = () => (
  <section
    id='hero'
    className='relative flex flex-col min-h-screen w-full justify-center items-center px-4 py-12 snap-start overflow-hidden'
  >
    <div className='relative z-10 flex flex-1 w-full max-w-6xl flex-col md:flex-row items-center md:items-stretch'>
      {/* Left: Text */}
      <div className='flex flex-col justify-center items-start w-full md:w-1/2 px-6 py-12 md:py-8'>
        <h1 className='heading text-5xl md:text-6xl mb-4 drop-shadow-lg'>
          Aditya Kaul
        </h1>
        <h2 className='subheading text-2xl md:text-3xl mb-4'>
          FullStack + AI Developer
        </h2>
        <p className='text-body max-w-md mb-8'>
          I build modern web experiences and technical solutions.
          <br />
          Passionate about code, design, and sharing knowledge.
        </p>
        <Link
          href='#contact'
          className='btn btn-gradient text-lg font-semibold shadow-xl px-8 py-4 rounded-full'
        >
          Contact Me
        </Link>
      </div>
      {/* Right: Avatar/Illustration (optional) */}
      <div className='hidden md:flex flex-col justify-end items-end w-1/2 px-6 py-8 h-full'>
        {/* <img src="/avatar.png" alt="Aditya Kaul" className="w-40 h-40 rounded-full shadow-lg" /> */}
      </div>
    </div>
  </section>
)
