import { HeroSection } from '@/sections/Hero'
import { SkillsSection } from '@/sections/Skills'
import { RoadMapSection } from '@/sections/RoadMap'
import { ProjectsSection } from '@/sections/Projects'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <RoadMapSection />
      <ProjectsSection />
    </>
  )
}
