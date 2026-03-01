export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
}

export const about = {
  name: 'Aditya Kaul',
  birthdate: '2000-09-18',
  title: 'Software Developer',
  bio: `I build scalable AI systems that automate real business workflows.
        Currently engineering enterprise level automations and data pipelines at a global scale.
        Focused on agentic AI, MCP servers, and production-ready RAG architectures.`,
  mission: `My mission is to leverage technology to build products that make a meaningful impact — one line of code at a time.`,
  education: [
    {
      institution: 'Amity School of Engineering and Technology',
      degree: 'B.Tech in Computer Science and Engineering',
      location: 'Delhi, India',
      period: 'Aug 2018 – May 2022',
    },
    {
      institution: 'Springdales School, Pusa Road',
      degree: 'AISSCE – Physics, Chemistry, Mathematics, Computer Science',
      location: 'Delhi, India',
      period: 'Apr 2004 – May 2018',
    },
  ] as Education[],
  hobbies: [
    'Swimming',
    'Chess',
    'Music',
    'Game Development',
  ],
  socials: {
    github: 'https://github.com/adityakaul',
    linkedin: 'https://linkedin.com/in/adityakaul',
    email: 'theadityakaul@gmail.com',
  },
};
