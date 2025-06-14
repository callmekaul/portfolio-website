import { FaCheckCircle, FaHourglassHalf, FaRegCircle } from 'react-icons/fa'

export const learningItems = [
  {
    year: 2022,
    title: 'Rust Programming',
    description: 'Learning Rust for systems programming and performance.',
    status: 'in-progress',
    icon: FaHourglassHalf,
    expandedDetails: 'Diving into Rust\'s ownership model, memory safety, and concurrency. Building CLI tools and experimenting with WebAssembly.',
  },
  {
    year: 2022,
    title: 'Next.js 15',
    description: 'Exploring the latest features in Next.js for modern web apps.',
    status: 'planned',
    icon: FaRegCircle,
    expandedDetails: 'Studying the new app directory, server components, and edge rendering. Planning to migrate an existing project to Next.js 15.',
  },
  {
    year: 2024,
    title: 'LangChain',
    description: 'Building advanced LLM-powered apps with LangChain.',
    status: 'planned',
    icon: FaRegCircle,
    expandedDetails: 'Learning how to chain LLMs for complex workflows, integrating with vector databases, and building conversational agents.',
  },
  {
    year: 2025,
    title: 'Kubernetes',
    description: 'Mastering container orchestration and deployment.',
    status: 'complete',
    icon: FaCheckCircle,
    expandedDetails: 'Completed a Kubernetes certification, set up CI/CD pipelines, and deployed scalable microservices in production environments.',
  },
]