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
      { name: 'Python', level: 4 },
      { name: 'SQL', level: 4 },
      { name: 'C/C++', level: 4 },
      { name: 'C#', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
    ],
  },
  {
    category: 'Libraries & Frameworks',
    skills: [
      { name: '.NET', level: 4 },
      { name: 'FastAPI', level: 4 },
      { name: 'React', level: 4 },
      { name: 'React Native', level: 4 },
      { name: 'Expo', level: 4 },
      { name: 'Tamagui', level: 4 },
      { name: 'TensorFlow', level: 4 },
      { name: 'Keras', level: 4 },
      { name: 'scikit-learn', level: 4 },
      { name: 'NumPy', level: 4 },
      { name: 'Pandas', level: 4 },
      { name: 'OpenCV', level: 4 },
      { name: 'Tkinter', level: 4 },
      { name: 'Unity ML-Agents', level: 4 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Azure Data Factory', level: 4 },
      { name: 'Azure Functions', level: 4 },
      { name: 'Azure SQL Database', level: 4 },
      { name: 'Azure Logic Apps', level: 4 },
      { name: 'Git', level: 4 },
      { name: 'Docker', level: 4 },
      { name: 'Postman', level: 4 },
      { name: 'Azure DevOps', level: 4 },
    ],
  },
]
