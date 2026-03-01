import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    category: 'Agentic AI and LLM Systems',
    title: 'HireWise — Automated Hiring Agent',
    tagline: 'Multi-Agent Recruitment Assistant',
    tools: ['LangGraph', 'LangChain', 'FastAPI', 'Next.js', 'Anthropic API', 'OpenAI API', 'WebSockets'],
    challenge: [
      'Different companies have varying requirements for the same role, based on their unique context, culture, and needs',
      'Manually creating an Ideal Candidate Profile and screening candidates against it is time-consuming and subjective',
      'Applications can come in various formats (resumes, LinkedIn profiles, video responses)',
    ],
    solution: [
      'A multi-agent LangGraph pipeline that creates Ideal Candidate Profiles for a Role and screens candidates against it.',
      'Researcher Agent that generates evidence-based ICPs from company intel and market research running in parallel',
      'Screening Agent that gathers Job Applications from various sources and screens them against the ICP via Resume Parser, LinkedIn Scraper, and Video Analyzer sub-agents',
      'A multi-model tiering (Haiku for parsing, Sonnet for research, Opus for synthesis) to optimize cost and quality',
    ],
    impact: [
      'Ranks hundreds of candidates in minutes with transparent, weighted composite scoring',
      'Each candidate receives per-skill breakdowns, red flags, and explainable rejection reasoning',
      'Confidence-gated ICP generation auto-iterates research when quality falls below threshold',
    ],
  },
  {
    id: 'project-2',
    category: 'Agentic AI and LLM Systems',
    title: 'UPSC Essay Grader',
    tagline: 'Hollistic Multi-Criterion UPSC Essay Evaluator',
    tools: ['LangGraph', 'LangChain', 'FastAPI', 'Pydantic'],
    challenge: [
      'Manual essay grading is time-consuming and subjective, especially at UPSC scale',
      'Students receive generic feedback without actionable, criterion-specific suggestions',
      'Current Essay Grading Tools not suited for UPSC\'s unique requirements for scoring across multiple criteria, like historical examples, current affairs etc.',
    ],
    solution: [
      'A multi-node LangGraph pipeline with parallel criterion evaluators for content depth, topic relevance, grammar, and coherence',
      'Provideds inline annotations in the essay, highlighting exact quotes as evidence.',
      'Prompts engineered to replicate strict UPSC senior examiner standards with holistic 0-100 scoring',
    ],
    impact: [
      'Generates 120-180 word examiner-style assessments with 3-5 strengths and weaknesses per essay, per criterion',
      'Produces actionable annotations with exact quotes and suggested rewrites, not vague advice',
      'Deployed to production on Railway with monetization via AdSense and UPI donations',
    ],
    liveUrl: 'https://essaykaise.streamlit.app/',
    githubUrl: 'https://github.com/callmekaul/EssayGrader',
  },
  {
    id: 'project-3',
    category: 'Agentic AI and LLM Systems',
    title: 'Flexist - AI Powered Fitness SaaS',
    tagline: 'Personal Trainer in Your Pocket',
    tools: ['React Native', 'TypeScript', 'Expo', 'PostgreSQL', 'Flask', 'OpenAI API'],
    challenge: [
      'Conventional Personal Training is Expensive, and majority gymmers only need fitness plans and diet advice, not hand-holding through every workout',
      'Huge Gap between gym membership and personal training - users want guidance but don\'t need full-time trainers',
      'Gym owners looking for AI Enabled Value Adds under their own brand, but users not keen on installing additional apps'
    ],
    solution: [
      'An AI-powered fitness app that generates personalized workout and diet plans based on user goals, preferences, and progress.',
      'Primarily Gym Owner Facing SaaS with white-labeling, custom app themes and workouts tailored to the equipment available.',
      'Feedback loops where users can log workouts and meals, and the AI adjusts plans accordingly.',
      'Launched both as a webapp and a mobile app to maximize accessibility, with a focus on consistent design across all builds using Expo',
    ],
    impact: [
      'Gyms able to offer affordable, personalized fitness guidance to all members, under their own brand.',
      'Users get affordable, personalized fitness plans that adapt to their progress, without the high cost of personal training.',
      'No need to install multiple apps for each gym. Users can be associated to multiple gyms within the same app - Flexist.',
  ],
  },
  {
    id: 'project-4',
    category: 'Machine Learning',
    title: 'Facial Recognition Attendance System',
    tagline: 'Automated Attendance Tracking',
    tools: ['Python', 'OpenCV', 'tkinter'],
    challenge: ['Manual attendance time consuming and prone to errors'],
    solution: ['An automated attendance system that uses OpenCV for facial recognition and tkinter for GUI.'],
    impact: ['Automated subject-wise attendance tracking, reducing manual effort and errors.'],
    githubUrl: 'https://github.com/callmekaul/Facial-Recognition-Based-Attendance-System',
  },
    {
    id: 'project-5',
    category: 'Machine Learning',
    title: 'Cryptocurrency Trading Bot',
    tagline: 'ML Trained Cryptocurrency Trading Bot',
    tools: ['Python', 'BinanceAPI', 'scikit-learn', 'pandas', 'numpy'],
    challenge: ['Manual cryptocurrency trading requires constant monitoring and quick decision-making'],
    solution: [
      'An AI-powered cryptocurrency trading bot that automatically executes trades based on historical data and market trends.',
      'Trained on indicators like moving averages, RSI, and MACD to give buy/sell signals.',
    ],
    impact: ['Automated trading decisions, reducing manual effort, removing emotional bias and succesful beating benchmark returns.'],
  },
  {
    id: 'project-6',
    category: 'Machine Learning',
    title: 'RL-Trained FPS Enemy Bot',
    tagline: 'Autonomous Enemy AI for Shooting Games',
    tools: ['Unity', 'C#', 'ML-Agents', 'Reinforcement Learning'],
    challenge: [
      'Hard-coded FPS bots follow predictable patterns, making gameplay repetitive and easy to exploit',
      'Manually scripting realistic aiming, movement, and combat behavior is complex and brittle',
    ],
    solution: [
      'Trained an RL agent using Unity ML-Agents to autonomously learn targeting and movement in an FPS environment',
      'Reward-shaped the agent to develop independent combat capabilities without explicit behavior scripting',
    ],
    impact: [
      'Bot learns human-like aiming and movement strategies purely through self-play and environment interaction',
      'Eliminates need for hand-crafted behavior trees, producing more adaptive and unpredictable enemy AI',
      'Wrote a research paper explaining the training process and results, which opened up new avenues for using RL in game AI development beyond traditional NPC behavior scripting',
    ],
  },
];
