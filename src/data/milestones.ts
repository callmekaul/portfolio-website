import {
  FaGraduationCap,
  FaBriefcase,
  FaRocket,
} from 'react-icons/fa'

export const milestones = [
  {
    year: 2022,
    title: 'Software Engineer – Shell',
    description: 'Joined Shell as a data & integration engineer.',
    icon: FaRocket,
    expandedDetails:
      'Built Azure-based ETL pipelines, developed automation templates saving $80k annually, and integrated emissions data systems across global platforms.',
  },
  {
    year: 2022,
    title: 'Graduated – B.Tech CSE',
    description: 'Completed my Bachelor’s in Computer Science.',
    icon: FaGraduationCap,
    expandedDetails:
      'Graduated from Amity School of Engineering and Technology with a focus on AI/ML. Led technical projects and participated in research during undergrad.',
  },
  {
    year: 2020,
    title: 'Game Developer – Oneros Tech',
    description: 'Worked on mobile game logic and adaptive AI.',
    icon: FaBriefcase,
    expandedDetails:
      'Implemented in-game logic and dynamic difficulty based on player performance. Handled QA for Play Store releases and collaborated remotely with the dev team.',
  },
  {
    year: 2020,
    title: 'Research Intern – IIT (BHU)',
    description: 'Built NLP models for low-resource Indian languages.',
    icon: FaBriefcase,
    expandedDetails:
      'Developed neural machine translation models for Hindi, Marathi, Gujarati, and Nepali. Used byte-pair encoding, attention mechanisms, and transfer learning to boost BLEU scores by 41%.',
  },
]
