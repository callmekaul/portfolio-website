import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'Company Name',
    role: 'Senior Software Engineer',
    period: 'Jan 2024 — Present',
    location: 'Remote',
    bullets: [
      'Led development of a customer-facing dashboard serving 10k+ users',
      'Reduced API response times by 40% through query optimization',
      'Mentored a team of 3 junior developers',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    company: 'Previous Company',
    role: 'Software Engineer',
    period: 'Jun 2022 — Dec 2023',
    location: 'Hybrid',
    bullets: [
      'Built and maintained microservices handling 1M+ requests/day',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Designed and shipped a real-time notification system',
    ],
    technologies: ['Python', 'Django', 'AWS', 'Docker'],
  },
  {
    company: 'Startup Inc.',
    role: 'Full Stack Developer',
    period: 'Jan 2021 — May 2022',
    location: 'On-site',
    bullets: [
      'Developed the core product from 0 to 1 as the first engineering hire',
      'Integrated third-party APIs for payments and authentication',
      'Built responsive UI components used across 5+ product pages',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Firebase', 'Stripe'],
  },
];
