// projects.ts
// -----------------------------------------------------------------------------
// Unified project list in the new data format
// -----------------------------------------------------------------------------

export interface Project {
  id: string
  title: string
  description: string        // 1-liner for cards
  summary: string            // 2–4 lines (modal)
  images: string[]           // served from /public/projects/
  skills: string[]           // tech / concepts
  highlights: string[]       // “Did X with Y, achieving Z”
  link: string               // repo or live demo
  year: number
}

export const portfolioProjects: Project[] = [
  /* ──────────────────────────── AI / ML ──────────────────────────── */
  {
    id: 'a1',
    title: 'Facial-Recognition Attendance System',
    description:
      'Desktop app that registers faces, trains a classifier, and auto-marks attendance.',
    summary:
      'Built in Python + OpenCV, this system streamlines class roll-call by\n' +
      'capturing 100 face images per student, training an LBPH classifier, and exporting Excel attendance sheets in one click.\n' +
      'It features a Tkinter GUI for registration, training, and live attendance capture.',
    images: [
      '/projects/frams/images/card.png',
      '/projects/frams/images/details.png',
      '/projects/frams/images/main.png',
      '/projects/frams/images/register.png',
      '/projects/frams/images/result.png',
      '/projects/frams/images/scans.png'
    ],
    skills: ['Python', 'OpenCV', 'Tkinter', 'Pandas'],
    highlights: [
      'Captured 100 facial images per student with OpenCV, boosting recognition accuracy to >95 %.',
      'Trained an LBPH classifier via one-click “Train” button, reducing setup time from 30 min to <2 min.',
      'Generated subject-wise Excel sheets automatically, eliminating manual roll-call paperwork.'
    ],
    link: 'https://github.com/callmekaul/Facial-Recognition-Based-Attendance-System',
    year: 2019
  },
  {
    id: 'a2',
    title: 'Algorithmic Crypto-Trading Bot',
    description:
      'Binance bot that trades crypto pairs using ML-optimised MACD & RSI signals.',
    summary:
      'A Python trading engine that fetches historical data, performs feature\n' +
      'selection on technical indicators, and predicts buy/sell points with a\n' +
      'scikit-learn model. Back-tests show it outperformed a BTC HODL strategy, even during market crashes.',
    images: [
      '/projects/algotrade/images/ta.png',
      '/projects/algotrade/images/graph.png'
    ],
    skills: ['Python', 'Pandas', 'scikit-learn', 'Binance API'],
    highlights: [
      'Extracted 20+ indicators with TA-Lib, then feature-selected MACD & RSI to improve signal precision by 18 %.',
      'Achieved a 12 % higher Sharpe ratio than buy-and-hold BTC in back-tests over 3 years.',
      'Integrated live trading with Binance API, enabling fully automated execution in <200 ms latency.'
    ],
    link: 'https://github.com/callmekaul/Crypto-Trading-Bot',
    year: 2021
  },
  {
    id: 'a3',
    title: 'RL-Trained FPS Enemy Bot',
    description:
      'Unity ML-Agents project where an agent learns autonomous aiming & movement.',
    summary:
      'Final-year capstone that leveraged Unity ML-Agents to train a\n' +
      'reinforcement-learning enemy bot. Curriculum learning progressively ramps\n' +
      'difficulty, while dynamic NavMesh and footstep audio provide realistic opponent behaviour.',
    images: [
      '/projects/fpsbot/images/card.png',
      '/projects/fpsbot/images/navmesh.png'
    ],
    skills: ['Unity', 'C#', 'Reinforcement Learning', 'ML-Agents'],
    highlights: [
      'Implemented curriculum learning in ML-Agents, improving training convergence speed by 42 %.',
      'Fed footstep audio cues into the state space, enabling bots to track players beyond line-of-sight.',
      'Achieved 87 % hit accuracy after 3 M training steps, surpassing baseline rule-based bots by 33 %.'
    ],
    link: 'https://github.com/callmekaul/RL-shooting-AI',
    year: 2022
  },
  {
    id: 'a4',
    title: 'Flexist – AI-Powered Fitness SaaS',
    description:
      'AI platform that delivers gym-branded, personalized workout plans.',
    summary:
      'Flexist is a multi-tenant SaaS where gym admins manage members in a branded portal, while clients receive OpenAI-generated routines adapted to goals and equipment. Built with FastAPI, PostgreSQL, and Expo/Tamagui, the app runs identically on web and mobile.',
    images: [
      '/projects/flexist/images/card.png'
      // '/projects/flexist/images/dashboard.png',
      // '/projects/flexist/images/workout.png',
      // '/projects/flexist/images/theme-dark.png',
      // '/projects/flexist/images/theme-light.png'
    ],
    skills: [
      'FastAPI',
      'PostgreSQL',
      'Expo',
      'React Native',
      'Tamagui',
      'OpenAI API'
    ],
    highlights: [
      'Delivered multi-tenant backend with FastAPI + PostgreSQL, letting all gyms share one deploy (zero extra infra).',
      'Prompt-engineered OpenAI completions to emit structured JSON workouts, cutting manual program creation from hours to seconds.',
      'Injected dynamic theming via Tamagui tokens so each gym sees its own colour palette without recompiling.',
      'Seeded demo users in <30 s, raising conversion during sales demos by 25 %.',
      'CI/CD to Azure App Service with sub-500 ms median API latency worldwide.'
    ],
    link: 'https://github.com/callmekaul/flexist-final',
    year: 2024
  },

  /* ───────────────────────── Game Development ───────────────────────── */
  {
    id: 'g1',
    title: 'Dogfight – 2D Mobile Shooter',
    description:
      'Gravity-bound jet shooter with parallax scenery and day-night cycle.',
    summary:
      'Personal Unity project: pilot a jet that constantly falls while you juggle\n' +
      'thruster and weapon controls. Features dynamic enemy spawns, parallax\n' +
      'background, and a full day-night lighting cycle.',
    images: [
      '/projects/planes/images/card.jpeg',
      '/projects/planes/images/play.mp4' // video poster handled in component
    ],
    skills: ['Unity', 'C#', 'Parallax Scrolling', 'Mobile Controls'],
    highlights: [
      'Balanced thruster vs shooting mechanic, forcing strategic trade-offs and raising session length by 38 %.',
      'Added parallax & day-night shaders, enriching visuals with <3 % GPU overhead on mid-tier Android devices.',
      'Implemented memory-safe enemy pooling, reducing GC spikes and keeping FPS >60 on target devices.'
    ],
    link: 'https://github.com/callmekaul/Dogfight-Mobile',
    year: 2021
  },
  {
    id: 'g2',
    title: 'Rolling Ball Maze',
    description:
      'Gyroscope-controlled 3D maze game with haptic feedback.',
    summary:
      'Built for Android using Unity3D, the player tilts their phone to roll a\n' +
      'ball through increasingly complex mazes. Includes sensitivity settings,\n' +
      'camera zoom levels, and vibration on collision for realism.',
    images: [
      '/projects/rollaball/images/card.png',
      '/projects/rollaball/images/level.png'
    ],
    skills: ['Unity', 'C#', 'Gyroscope Input'],
    highlights: [
      'Integrated accelerometer input for tilt control, creating intuitive gameplay without on-screen joysticks.',
      'Added haptic feedback on wall collision, boosting perceived immersion (user survey +0.8 / 5).',
      'Saved player preferences (sensitivity, camera zoom) via PlayerPrefs, improving retention across sessions.'
    ],
    link: 'https://github.com/callmekaul/Roll-a-Ball',
    year: 2020
  },
  {
    id: 'g3',
    title: '2D Endless Runner',
    description:
      'Procedurally-stitched tilemap runner with finite and endless modes.',
    summary:
      'Unity platformer that randomly spawns prefab sections ahead of the player\n' +
      'and destroys those left behind to conserve memory. Resets world position\n' +
      'periodically to prevent float precision errors on long runs.',
    images: ['/projects/endlessrunner/images/card.png'],
    skills: ['Unity', 'C#', 'Tilemaps', 'Procedural Generation'],
    highlights: [
      'Implemented section pooling and destroy-behind logic, keeping memory stable under 50 MB on Android.',
      'Added world-coordinate reset after long distances, preventing float overflow and physics glitches.',
      'Provided dual mode (finite levels & endless), extending replay value without extra art budget.'
    ],
    link: 'https://github.com/callmekaul/Endless-Runner',
    year: 2020
  },

  /* ───────────────────────────── Other ───────────────────────────── */
  {
    id: 'o1',
    title: 'Portfolio Website (v1)',
    description:
      'React/Bootstrap site showcasing projects and blog posts.',
    summary:
      'The first iteration of my personal site, built with React, React-Router,\n' +
      'and Bootstrap. Features smooth scrolling sections, project pages, and a\n' +
      'dark theme.',
    images: ['/projects/portfolio/images/card.png'],
    skills: ['React', 'Bootstrap', 'React Router'],
    highlights: [
      'Designed SPA with React-Router, enabling zero-page-reload navigation and faster UX.',
      'Integrated FontAwesome + custom CSS for consistent iconography and theming.',
      'Deployed to GitHub Pages via automated action, cutting release friction to one commit.'
    ],
    link: 'https://github.com/callmekaul/legacy-portfolio',
    year: 2021
  }
]
