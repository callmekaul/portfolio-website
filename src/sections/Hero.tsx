'use client'

import Link from 'next/link'

export const HeroSection = () => (
  <section
    id='hero'
    className='section snap-start min-h-screen relative min-w-0 overflow-hidden'
  >
    <div className='section-inner flex flex-1 flex-col justify-center items-start min-h-[70vh] py-16 md:py-24 lg:py-32'>
      <div
        className='
          w-full
          max-w-4xl
          px-2
          sm:px-8
          md:px-16
          lg:px-32
          xl:px-48
          flex flex-col items-start
        '
      >
        <h1 className='heading text-5xl md:text-6xl mb-4 drop-shadow-lg'>
          Aditya Kaul
        </h1>
        <h2 className='subheading text-2xl md:text-3xl mb-4'>
          FullStack + AI Developer
        </h2>
        <p className='text-body mb-8 leading-relaxed max-w-2xl'>
          <span className='font-semibold text-sky-400'>
            Integrations Developer
          </span>{' '}
          with <span className='font-semibold text-blue-400'>2+ years</span>{' '}
          experience building robust data pipelines and automation at a global
          scale.
          <br />
          <span className='font-semibold text-purple-400'>7+ years</span>{' '}
          hands-on programming,{' '}
          <span className='font-semibold text-purple-400'>4+ years</span> in
          AI/ML.
          <br />
          <span className='text-blue-300 font-semibold'>
            Passionate about solving real-world problems at scale with
            intelligent systems.
          </span>
        </p>
        <div className='flex gap-4'>
          <a
            href='/AdityaKaul_CV.pdf'
            download
            className='btn btn-secondary text-lg font-semibold rounded-full border border-blue-400 text-blue-400 bg-transparent hover:bg-blue-950/40 hover:text-white transition'
          >
            Download CV
          </a>
          <Link
            href='#contact'
            className='btn btn-gradient text-lg font-semibold rounded-full shadow-lg px-8 py-3 transition-all duration-200 hover:scale-105 hover:shadow-blue-500/30 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
          >
            <span className='inline-flex items-center gap-2'>Contact Me</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
)
