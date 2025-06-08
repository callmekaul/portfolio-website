import { HeroSection } from '@/sections/Hero'
import { SkillsSection } from '@/sections/Skills'
import { RoadMapSection } from '@/sections/RoadMap'
import { ProjectsSection } from '@/sections/Projects'
import { ContactSection } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <RoadMapSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
