'use client'

import Link from 'next/link'

export const HeroSection = () => (
  <section
    id='hero'
    className='section snap-start min-h-screen relative min-w-0 overflow-hidden'
  >
    <div
      className='section-inner flex flex-1 flex-col justify-center items-start min-h-[70vh] py-8
        sm:py-32
        md:py-36
        lg:py-40
        xl:py-48'
    >
      <div
        className='
          w-full
          max-w-4xl
          px-4
          sm:px-8
          md:px-12
          lg:px-24
          xl:px-32
          flex flex-col items-start
        '
      >
        <h1 className='heading text-4xl sm:text-5xl md:text-6xl mb-4 drop-shadow-lg'>
          Aditya Kaul
        </h1>
        <h2 className='subheading text-xl sm:text-2xl md:text-3xl mb-4'>
          FullStack + AI Developer
        </h2>
        <p className='text-body mb-8 leading-relaxed max-w-2xl text-base sm:text-lg'>
          <span className='font-semibold text-sky-400'>
            Integrations Developer
          </span>{' '}
          with <span className='font-semibold text-blue-400'>2+ years</span> of
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
        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
          <a
            href='/AdityaKaul_CV.pdf'
            download
            className='btn btn-secondary text-base sm:text-lg font-semibold rounded-full border border-blue-400 text-blue-400 bg-transparent hover:bg-blue-950/40 hover:text-white transition px-6 py-2 sm:px-8 sm:py-3 w-full sm:w-auto text-center'
          >
            Download CV
          </a>
          <Link
            href='#contact'
            className='btn btn-gradient text-base sm:text-lg font-semibold rounded-full shadow-lg px-6 py-2 sm:px-8 sm:py-3 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 w-full sm:w-auto text-center'
          >
            <span className='inline-flex items-center gap-2 justify-center w-full'>
              Contact Me
            </span>
          </Link>
        </div>
      </div>
    </div>
  </section>
)
