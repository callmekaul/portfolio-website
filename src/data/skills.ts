export type SkillCategory = 'Tools' | 'Languages' | 'Libraries & Frameworks'

export interface Skill {
  name: string
  level: 1 | 2 | 3 | 4
}

export interface SkillGroup {
  category: SkillCategory
  skills: Skill[]
}

export const skillsData: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'Python', level: 3 },
      { name: 'C++', level: 2 },
      { name: 'SQL', level: 2 },
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
    ],
  },
  {
    category: 'Libraries & Frameworks',
    skills: [
      { name: 'React', level: 4 },
      { name: 'Next.js', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Node.js', level: 3 },
      { name: 'Express', level: 3 },
      { name: 'Framer Motion', level: 3 },
      { name: 'Redux', level: 2 },
      { name: 'Prisma', level: 2 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 4 },
      { name: 'VS Code', level: 4 },
      { name: 'Figma', level: 3 },
      { name: 'Vercel', level: 3 },
      { name: 'Linux', level: 2 },
      { name: 'Jira', level: 2 },
      { name: 'Postman', level: 2 },
    ],
  },
]