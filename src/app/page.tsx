import { HeroSection } from '@/sections/Hero'
import { SkillsSection } from '@/sections/Skills'
import { JourneySection } from '@/sections/Journey'
import { RoadmapSection } from '@/sections/Roadmap'
import { ProjectsSection } from '@/sections/Projects'
import { ContactSection } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className='px-2 sm:px-4 md:px-8 lg:px-16'>
        <JourneySection />
        <ProjectsSection />
      </div>
      <SkillsSection />
      <div className='px-2 sm:px-4 md:px-8 lg:px-16'>
        <RoadmapSection />
        <ContactSection />
      </div>
    </>
  )
}
