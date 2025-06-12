'use client'

import React, { useRef, useEffect, useState } from 'react'
import { skillsData } from '@/data/skills'
import { SkillBadge } from '@/components/SkillBadge'

function useAutoScroll({
  direction,
  pause,
  speed = 20,
}: {
  direction: 'left' | 'right'
  pause: boolean
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    let frame: number
    let last = performance.now()

    function animate(now: number) {
      if (!ref.current) return
      if (!pause) {
        const delta = now - last
        last = now
        const scrollAmount = (speed * delta) / 1000
        if (direction === 'left') {
          ref.current.scrollLeft += scrollAmount
          // Loop
          if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
            ref.current.scrollLeft = 0
          }
        } else {
          ref.current.scrollLeft -= scrollAmount
          if (ref.current.scrollLeft <= 0) {
            ref.current.scrollLeft = ref.current.scrollWidth / 2
          }
        }
      } else {
        last = now
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [direction, pause, speed])

  return ref
}

const SkillRow: React.FC<{
  skills: { name: string; level: 1 | 2 | 3 | 4 }[]
  direction: 'left' | 'right'
}> = ({ skills, direction }) => {
  const [paused, setPaused] = useState(false)
  const rowRef = useAutoScroll({ direction, pause: paused, speed: 20 })

  // Duplicate skills for seamless looping
  const loopSkills = [...skills, ...skills]

  // Pause on hover or touch
  return (
    <div
      className='relative w-full select-none'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      style={{ minHeight: 56 }}
    >
      <div
        ref={rowRef}
        className='flex gap-4 w-full overflow-x-scroll scrollbar-hide py-2'
        style={{
          scrollBehavior: 'auto',
          minWidth: '100%',
        }}
      >
        {loopSkills.map((skill, idx) => (
          <SkillBadge
            key={skill.name + idx}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </div>
  )
}

export const SkillsSection = () => (
  <section
    id='skills'
    className='flex flex-col min-h-screen w-full min-w-0 justify-center items-center px-0 py-12 snap-start'
  >
    <div className='w-full bg-black/20 backdrop-blur-md'>
      <h2 className='heading mb-10 text-center w-full py-4'>Skills</h2>
      <h3 className='subheading text-center'>Languages, Libraries & Tools</h3>
      <div className='flex flex-col gap-4 py-4 w-full min-w-0 overflow-x-auto'>
        {skillsData.map((group, i) => (
          <div key={group.category} className='w-full'>
            {/* <h3 className='subheading mb-2 px-4'>{group.category}</h3> */}
            <SkillRow
              skills={group.skills}
              direction={i % 2 === 0 ? 'right' : 'left'}
            />
          </div>
        ))}
      </div>
    </div>
    <style jsx global>{`
      .scrollbar-hide {
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </section>
)
