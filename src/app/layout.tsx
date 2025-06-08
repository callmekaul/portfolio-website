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
          <div className='absolute rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-40 blur-3xl w-[22vw] h-[22vw] left-[10vw] top-[15vh] animate-floatOrb1' />
          <div className='absolute rounded-full bg-gradient-to-br from-green-400 via-cyan-400 to-blue-400 opacity-30 blur-2xl w-[18vw] h-[18vw] left-[60vw] top-[10vh] animate-floatOrb2' />
          <div className='absolute rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 opacity-30 blur-2xl w-[25vw] h-[25vw] left-[30vw] top-[60vh] animate-floatOrb3' />
          <div className='absolute rounded-full bg-gradient-to-br from-teal-400 via-blue-400 to-purple-400 opacity-20 blur-2xl w-[15vw] h-[15vw] left-[75vw] top-[70vh] animate-floatOrb4' />
        </div>
        {/* Sticky Header */}
        <header className="sticky top-0 z-20">
          <Header />
        </header>
        {/* Main content with snap scroll */}
        <main className="flex-1 overflow-y-auto snap-y snap-mandatory h-[100dvh]">
          <AnimatePresence mode='wait'>
            <Transition routeKey={pathname}>{children}</Transition>
          </AnimatePresence>
        </main>
        {/* Sticky Footer */}
        <footer className="sticky bottom-0 z-20">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
