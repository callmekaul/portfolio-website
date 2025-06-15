'use client'

import Link from 'next/link'

export const Footer = () => (
  <footer className="flex flex-col items-center justify-center w-full min-w-0 py-4 gap-2 glass-card mt-8">
    <div className="text-muted">
      © {new Date().getFullYear()} Aditya Kaul. All rights reserved.
    </div>
    <div className="flex gap-4">
      <Link
        href="mailto:theadityakaul@gmail.com"
        className="hover:text-[var(--color-primary)] transition"
      >
        Email
      </Link>
      <Link
        href="https://github.com/callmekaul"
        target="_blank"
        rel="noopener"
        className="hover:text-[var(--color-primary)] transition"
      >
        GitHub
      </Link>
      <Link
        href="https://linkedin.com/in/callmekaul"
        target="_blank"
        rel="noopener"
        className="hover:text-[var(--color-primary)] transition"
      >
        LinkedIn
      </Link>
    </div>
  </footer>
)
