export type WindowId = 'about' | 'experience' | 'projects' | 'skills' | 'resume' | 'contact';

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface WindowStore {
  windows: Record<WindowId, WindowState>;
  topZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, pos: { x: number; y: number }) => void;
}

export interface WindowMeta {
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
}

export interface WindowDefault {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  tools: string[];
  challenge: string;
  solution: string;
  impact: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}
