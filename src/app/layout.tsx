'use client'

import { Montserrat } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import { Header } from '@/sections/Header'
import { Footer } from '@/sections/Footer'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Transition from '@/components/Transition'
import './globals.css'

const monster = Montserrat({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <html lang='en'>
      <body
        className={twMerge(
          monster.variable,
          'bg-zinc-950 text-white antialiased font-sans flex flex-col min-h-screen'
        )}
      >
        {/* Floating Orbs Background using theme variables */}
        <div className='fixed inset-0 w-screen h-screen overflow-hidden -z-10 pointer-events-none'>
          {/* Gold orb, top left */}
          <div className="absolute left-[-8vw] top-[-8vw] w-[28vw] h-[28vw] rounded-full blur-3xl animate-floatOrb1"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary-rgb),0.25) 60%, transparent 100%)'
            }}
          />
          {/* Muted gold orb, top right */}
          <div className="absolute right-[-6vw] top-[10vh] w-[20vw] h-[20vw] rounded-full blur-2xl animate-floatOrb2"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-secondary-rgb),0.18) 60%, transparent 100%)'
            }}
          />
          {/* Gold orb, bottom right */}
          <div className="absolute right-[-10vw] bottom-[-8vw] w-[32vw] h-[32vw] rounded-full blur-3xl animate-floatOrb3"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary-rgb),0.15) 60%, transparent 100%)'
            }}
          />
          {/* Muted gold orb, bottom left */}
          <div className="absolute left-[-6vw] bottom-[8vh] w-[18vw] h-[18vw] rounded-full blur-2xl animate-floatOrb4"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-secondary-rgb),0.12) 60%, transparent 100%)'
            }}
          />
          {/* Faint gold orb, center-ish */}
          <div className="absolute left-[40vw] top-[40vh] w-[14vw] h-[14vw] rounded-full blur-2xl animate-floatOrb3"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary-rgb),0.10) 60%, transparent 100%)'
            }}
          />
        </div>
        {/* Subtle gradient accent background */}
        <div className='fixed inset-0 -z-10 pointer-events-none'>
          {/* Top left gold blob */}
          <div className="absolute left-[-15vw] top-[-10vw] w-[50vw] h-[50vw] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary-rgb),0.12) 60%, transparent 100%)'
            }}
          />
          {/* Bottom right muted gold blob */}
          <div className="absolute right-[-10vw] bottom-[-10vw] w-[60vw] h-[60vw] rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-secondary-rgb),0.10) 60%, transparent 100%)'
            }}
          />
          {/* Bottom left muted gold blob */}
          <div className="absolute left-[-10vw] bottom-[-5vw] w-[40vw] h-[40vw] rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-secondary-rgb),0.08) 60%, transparent 100%)'
            }}
          />
          {/* Top right gold blob */}
          <div className="absolute right-[-12vw] top-[-8vw] w-[35vw] h-[35vw] rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary-rgb),0.08) 60%, transparent 100%)'
            }}
          />
        </div>
        <header className='fixed top-0 left-0 w-full z-50'>
          <Header />
        </header>
        <main className='flex-1 snap-y snap-mandatory'>
          <AnimatePresence mode='wait'>
            <Transition routeKey={pathname}>{children}</Transition>
          </AnimatePresence>
        </main>
        <Footer />
      </body>
    </html>
  )
}
