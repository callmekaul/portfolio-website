import { HeroSection } from '@/sections/Hero'
import { SkillsSection } from '@/sections/Skills'
import { JourneySection } from '@/sections/Journey'
// import { RoadmapSection } from '@/sections/Roadmap'
import { ProjectsSection } from '@/sections/Projects'
import { ContactSection } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <HeroSection />
      <JourneySection />
      <ProjectsSection />
      <SkillsSection />
      {/* <RoadmapSection /> */}
      <ContactSection />
    </>
  )
}
