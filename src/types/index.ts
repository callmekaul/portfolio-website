export type WindowId = 'about' | 'experience' | 'projects' | 'skills' | 'resume' | 'contact' | 'display' | 'music';

export type ThemePreset = 'cyber' | 'ocean' | 'ember' | 'sunset';
export type WallpaperType = 'matrix' | 'clouds' | 'stars' | 'aurora' | 'grid' | 'none';

export interface ThemeColors {
  bg: string;
  panel: string;
  surface: string;
  accent: string;
  secondary: string;
  text: string;
}

export interface ThemeStore {
  theme: ThemePreset;
  wallpaper: WallpaperType;
  setTheme: (theme: ThemePreset) => void;
  setWallpaper: (wallpaper: WallpaperType) => void;
}

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface WindowStore {
  windows: Record<WindowId, WindowState>;
  topZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  updatePosition: (id: WindowId, pos: { x: number; y: number }) => void;
  updateSize: (id: WindowId, size: { width: number; height: number }) => void;
  batchUpdate: (updates: Partial<Record<WindowId, Partial<Pick<WindowState, 'position' | 'size'>>>>) => void;
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

export type ProjectCategory = 'Agentic AI and LLM Systems' | 'Machine Learning';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  tagline: string;
  tools: string[];
  challenge: string[];
  solution: string[];
  impact: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Track {
  title: string;
  artist: string;
  videoId: string;
}
