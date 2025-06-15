'use client'

import Link from 'next/link'

export const HeroSection = () => (
  <section
    id='hero'
    className='min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-8 lg:px-16 bg-transparent'
  >
    <div className='glass-card w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-20 md:py-28'>
      <h1 className='heading text-4xl sm:text-5xl md:text-6xl mb-4 drop-shadow-lg text-center w-full'>
        Aditya Kaul
      </h1>
      <h2 className='subheading text-xl sm:text-2xl md:text-3xl mb-4 text-center w-full'>
        FullStack + AI Developer
      </h2>
      <p className='text-body mb-8 leading-relaxed max-w-2xl text-center'>
        <span className='font-semibold text-[var(--color-accent)]'>
          Integrations Developer
        </span>{' '}
        with{' '}
        <span className='font-semibold text-[var(--color-primary)]'>
          2+ years
        </span>{' '}
        of experience building robust data pipelines and automation at a global
        scale.
        <br />
        <span className='font-semibold text-[var(--color-secondary)]'>
          7+ years
        </span>{' '}
        hands-on programming,{' '}
        <span className='font-semibold text-[var(--color-secondary)]'>
          4+ years
        </span>{' '}
        in AI/ML.
        <br />
        <span className='text-[var(--color-primary)] font-semibold'>
          Passionate about solving real-world problems at scale with intelligent
          systems.
        </span>
      </p>
      <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
        <a
          href='/AdityaKaul_CV.pdf'
          download
          className='btn btn-primary w-full sm:w-auto'
        >
          Download CV
        </a>
        <Link href='#contact' className='btn btn-secondary w-full sm:w-auto'>
          Contact Me
        </Link>
      </div>
    </div>
  </section>
)
