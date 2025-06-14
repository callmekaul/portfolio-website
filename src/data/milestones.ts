import { FaGraduationCap, FaBriefcase, FaRocket, FaCode } from 'react-icons/fa'

export const milestones = [
  {
    year: 2015,
    title: 'Started Coding',
    description: 'Wrote my first lines of code and fell in love with programming.',
    icon: FaCode,
    expandedDetails: 'Began with Python and JavaScript, building small scripts and games. This was the foundation for my passion in software development.',
  },
  {
    year: 2019,
    title: 'First Internship',
    description: 'Worked as a software intern, building real-world applications.',
    icon: FaBriefcase,
    expandedDetails: 'Interned at a local tech startup, contributed to a team project using React and Node.js, and learned about agile workflows and code reviews.',
  },
  {
    year: 2022,
    title: 'Graduated',
    description: 'Completed my degree in Computer Science.',
    icon: FaGraduationCap,
    expandedDetails: 'Graduated with honors, specialized in AI and ML, led the coding club, and completed a thesis on neural networks.',
  },
  {
    year: 2022,
    title: 'Job',
    description: 'Built and deployed AI/ML solutions at scale.',
    icon: FaRocket,
    expandedDetails: 'Joined a leading tech company, worked on deploying machine learning models to production, and collaborated with cross-functional teams.',
  },
]