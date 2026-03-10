import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'Shell',
    role: 'Automation Integration Engineer',
    period: 'Aug 2022 — Present',
    location: 'Bangalore, India - Hybrid',
    bullets: [
      'Spearheaded the automation of critical business processes with AI Agents and MCP servers, eliminating mailbox triage and reducing business workflow effort by 95%%',
      'Leveraged RAG pipelines integrated with rule based execution layers to take grounded and context-aware actions, ensuring reliability and consistency in automated workflows',
      'Built ETL pipelines with Azure Data Factory, delivering production-ready integrations on tight deadlines, enabling seamless data flow for over 10000 assets across 70+ countries',
      'Designed config-driven templates to standardize file transfers, reducing dev time by 90% and saving ~$80K/year',
      'Optimized complex transformations with Azure Functions and advanced SQL beyond native ADF capabilities',
    ],
    technologies: ['Azure Data Factory', 'Azure Functions', 'Microsoft Copilot Studio', 'AI Agents', 'MCP'],
  },
  {
    company: 'Indian Institute of Technology (BHU)',
    role: 'ML Researcher - Intern',
    period: 'Jun 2020 — Aug 2020',
    location: 'Varanasi, India - Remote',
    bullets: [
      'Developed seq2seq Neural Machine Translation models for low resource Indian Languages like Hindi, Marathi, Gujarati and Nepali',
      'Improved BLEU scores by 41% through byte-pair encoding and attention mechanisms despite data scarcity.',
      'Applied transfer learning to boost translation quality across multiple language pairs',
    ],
    technologies: ['Machine Learning', 'NLP', 'Byte Pair Encoding'],
  },
  {
    company: 'Oneros Tech Pvt Ltd',
    role: 'Game Developer - Intern',
    period: 'May 2020 — Aug 2020',
    location: 'Pune, India - Remote',
    bullets: [
      'Developed dynamic difficulty algorithms, adapting in real-time to player performance data, boosting player retention by 40%',
      'Translated user feedback into structured QA processes, enabling iterative enhancements to gameplay mechanics and UX.',
      'Contributed across the full game lifecycle, from prototypeing to production, shipping multiple releases in a fast paced environment',
    ],
    technologies: ['Game Development', 'Test Driven Development', 'QA'],
  },
];
