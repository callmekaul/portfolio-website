import flexistImage from '@/assets/images/flexist.png'
import rlEnemyAIImage from '@/assets/images/rl-enemy-ai.png'
import tradingBotImage from '@/assets/images/trading-bot.png'
import attendanceSystemImage from '@/assets/images/face-attendance.png'

export interface Project {
  company: string
  year: string
  title: string
  tools: { title: string }[]
  results: { title: string }[]
  link: string
  image: any
  description: string
}

export const portfolioProjects: Project[] = [
  {
    company: 'Personal Project',
    year: '2024',
    title: 'Flexist - AI Powered Fitness SaaS',
    results: [
      { title: 'Built full-stack SaaS with FastAPI, PostgreSQL, Expo' },
      { title: 'Implemented dynamic theming & role-based auth' },
      { title: 'Integrated AI module generating structured workouts' },
    ],
    tools: [
      { title: 'FastAPI' },
      { title: 'PostgreSQL' },
      { title: 'Expo' },
      { title: 'Tamagui' },
      { title: 'OpenAI API' },],
    link: 'https://github.com/callmekaul/flexist-final',
    image: flexistImage,
    description:
      'Cross-platform fitness SaaS that generates personalized workout plans using AI and adapts to gym-specific branding and roles.',
  },
  {
    company: 'College Major Project',
    year: '2020',
    title: 'RL Trained Enemy AI for Shooting Games',
    results: [
      { title: 'Trained agents for autonomous aiming & movement' },
      { title: 'Implemented curriculum learning & sound-based AI' },
      { title: 'Built realistic human-like enemy bots in Unity' },
    ],
    tools: [
      { title: 'Unity ML-Agents' },
      { title: 'Python' },
      { title: 'TensorFlow' },
      { title: 'Keras' },
      { title: 'NumPy' },
      { title: 'Pandas' },
    ],
    link: 'https://github.com/callmekaul/RL-shooting-AI',
    image: rlEnemyAIImage,
    description:
      'Used Unity ML-Agents to build intelligent bots that adapt to player behavior, creating a challenging and immersive game environment.',
  },
  {
    company: 'Personal Project',
    year: '2021',
    title: 'Algorithmic Trading Bot for Cryptocurrencies',
    results: [
      { title: 'Used MACD, RSI & ML to tune strategy parameters' },
      { title: 'Implemented momentum & pair-trading strategies' },
      { title: 'Achieved strong win-rate through backtesting' },
    ],
    tools: [
      { title: 'Python' },
      { title: 'Binance API' },
      { title: 'NumPy' },
      { title: 'Pandas' },
      { title: 'scikit-learn' },
    ],
    link: 'https://github.com/callmekaul/Crypto-Trading-Bot',
    image: tradingBotImage,
    description:
      'Python-based trading bot that runs algorithmic strategies on Binance with optimized signals and real-time data ingestion.',
  },
  {
    company: 'College Minor Project',
    year: '2020',
    title: 'Facial Recognition Based Attendance System',
    results: [
      { title: 'Automated attendance logging via facial match' },
      { title: 'Created GUI with OpenCV, Pandas & Tkinter' },
      { title: 'Logged subject-wise timestamps from live feed' },
    ],
    tools: [
      { title: 'Python' },
      { title: 'OpenCV' },
      { title: 'Pandas' },
      { title: 'Tkinter' },
      { title: 'Face Recognition' },
    ],
    link: 'https://github.com/callmekaul/Facial-Recognition-Based-Attendance-System',
    image: attendanceSystemImage,
    description:
      'Desktop application that uses facial recognition to automate class attendance logging with real-time video feed analysis.',
  },
]
