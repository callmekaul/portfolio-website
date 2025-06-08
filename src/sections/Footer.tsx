'use client'

import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center w-full py-3 gap-2'>
      <div className='text-muted'>
        © {new Date().getFullYear()} Aditya Kaul. All rights reserved.
      </div>
      <div className='flex gap-4'>
        <Link
          href='mailto:your@email.com'
          className='hover:text-blue-400 transition'
        >
          Email
        </Link>
        <Link
          href='https://github.com/yourusername'
          target='_blank'
          rel='noopener'
          className='hover:text-blue-400 transition'
        >
          GitHub
        </Link>
        <Link
          href='https://linkedin.com/in/yourusername'
          target='_blank'
          rel='noopener'
          className='hover:text-blue-400 transition'
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  )
}
