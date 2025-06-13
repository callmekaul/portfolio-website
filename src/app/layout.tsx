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
        {/* Floating Orbs Background */}
        <div className='fixed inset-0 w-screen h-screen overflow-hidden -z-10 pointer-events-none'>
          {/* Blue orb, top left */}
          <div className='absolute left-[-8vw] top-[-8vw] w-[28vw] h-[28vw] bg-gradient-to-br from-blue-400/40 via-blue-500/20 to-transparent opacity-40 blur-3xl rounded-full animate-floatOrb1' />
          {/* Purple orb, top right */}
          <div className='absolute right-[-6vw] top-[10vh] w-[20vw] h-[20vw] bg-gradient-to-br from-purple-400/40 via-purple-600/20 to-transparent opacity-30 blur-2xl rounded-full animate-floatOrb2' />
          {/* Pink orb, bottom right */}
          <div className='absolute right-[-10vw] bottom-[-8vw] w-[32vw] h-[32vw] bg-gradient-to-tr from-pink-400/30 via-pink-500/10 to-transparent opacity-30 blur-3xl rounded-full animate-floatOrb3' />
          {/* Teal orb, bottom left */}
          <div className='absolute left-[-6vw] bottom-[8vh] w-[18vw] h-[18vw] bg-gradient-to-br from-teal-400/30 via-cyan-400/20 to-transparent opacity-25 blur-2xl rounded-full animate-floatOrb4' />
          {/* Yellow orb, center-ish */}
          <div className='absolute left-[40vw] top-[40vh] w-[14vw] h-[14vw] bg-gradient-to-br from-yellow-300/30 via-yellow-400/10 to-transparent opacity-20 blur-2xl rounded-full animate-floatOrb3' />
        </div>
        {/* Sticky Header */}
        {/* Subtle gradient accent background */}
        <div className='fixed inset-0 -z-10 pointer-events-none'>
          {/* Top left blue blob */}
          <div className='absolute left-[-15vw] top-[-10vw] w-[50vw] h-[50vw] bg-gradient-to-br from-blue-500/30 via-blue-400/10 to-transparent rounded-full blur-3xl' />
          {/* Bottom right purple-pink blob */}
          <div className='absolute right-[-10vw] bottom-[-10vw] w-[60vw] h-[60vw] bg-gradient-to-tr from-purple-600/20 via-pink-400/10 to-transparent rounded-full blur-2xl' />
          {/* Bottom left teal blob */}
          <div className='absolute left-[-10vw] bottom-[-5vw] w-[40vw] h-[40vw] bg-gradient-to-tr from-teal-400/20 via-blue-400/10 to-transparent rounded-full blur-2xl' />
          {/* Top right yellow blob */}
          <div className='absolute right-[-12vw] top-[-8vw] w-[35vw] h-[35vw] bg-gradient-to-br from-yellow-300/20 via-orange-400/10 to-transparent rounded-full blur-2xl' />
        </div>
        <header className='fixed top-0 left-0 w-full z-50'>
          <Header />
        </header>
        {/* Main content with snap scroll */}
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
